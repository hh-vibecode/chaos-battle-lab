// ☁️ ĐƯA VIDEO PHIM LÊN GITHUB RELEASES (anh 23/11 chọn hướng 2): video KHÔNG nằm trong lịch sử git → xuất lại bao nhiêu lần repo cũng không phình,
//   bản cũ XOÁ HẲN được. App đọc video/films.json (nằm trong repo, nhỏ) → link tải video trên release "films".
// Dùng: (thường tự gọi từ tools/x/film-video.js sau khi xuất) · tay: node tools/x/film-release.js <id…> | --all  (đẩy video/<id>.mp4 đang có trong máy)
//   --keep = giữ file video/<id>.mp4 trong máy sau khi đẩy (mặc định XOÁ cho đỡ tốn ổ — bản gốc đã nằm trên release)
// TOKEN (không bao giờ in / commit): biến môi trường GH_RELEASE_TOKEN, hoặc file ngoài repo:
//   Windows D:\tools\gh-release-token.txt · Mac ~/.config/chaos-battle-lab/gh-release-token.txt
//   Token "fine-grained" CHỈ repo hh-vibecode/chaos-battle-lab, quyền Contents: Read and write (đủ tạo release + tải / xoá file đính kèm).
// Tên file trên release: <id>-<mã băm 10 ký tự>.mp4 → đẩy bản mới XONG mới xoá (app đang xem không bị đứt), trình duyệt không dùng nhầm bản cũ trong bộ nhớ đệm.
// Mỗi phim giữ 2 BẢN trên release (anh 23/11): mới nhất (films.json → file) + bản ngay trước (films.json → prev). Bản thứ 3 trở về trước xoá hẳn.
//   Quay lại bản trước: đổi chỗ file ↔ prev của phim đó trong video/films.json rồi phát hành.
const fs = require('fs'), path = require('path'), os = require('os'), crypto = require('crypto'), { execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..', '..'), VDIR = path.join(ROOT, 'video'), INDEX = path.join(VDIR, 'films.json'), TAG = 'films';
function token() {
  if (process.env.GH_RELEASE_TOKEN) return process.env.GH_RELEASE_TOKEN.trim();
  for (const f of [process.platform === 'win32' ? 'D:\\tools\\gh-release-token.txt' : path.join(os.homedir(), '.config', 'chaos-battle-lab', 'gh-release-token.txt')])
    try { const t = fs.readFileSync(f, 'utf8').trim(); if (t) return t; } catch (e) {}
  throw new Error('chưa có token: đặt GH_RELEASE_TOKEN hoặc file ' + (process.platform === 'win32' ? 'D:\\tools\\gh-release-token.txt' : '~/.config/chaos-battle-lab/gh-release-token.txt'));
}
function repo() { const u = execFileSync('git', ['remote', 'get-url', 'origin'], { cwd: ROOT }).toString().trim(), m = u.match(/github\.com[:/]([^/]+)\/([^/.]+)/); if (!m) throw new Error('remote không phải GitHub: ' + u); return m[1] + '/' + m[2]; }
async function gh(method, url, body, type) {
  const r = await fetch(url.startsWith('http') ? url : 'https://api.github.com' + url, { method, headers: { Authorization: 'Bearer ' + token(), Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'chaos-battle-lab-film-release', ...(type ? { 'Content-Type': type } : {}) }, body });
  if (r.status === 204) return null; const txt = await r.text(); let j = null; try { j = JSON.parse(txt); } catch (e) {}
  if (!r.ok) { const e = new Error(`GitHub ${method} ${url.split('?')[0]} → ${r.status} ${(j && j.message) || txt.slice(0, 200)}`); e.status = r.status; throw e; } return j; }
async function release(R) {
  try { return await gh('GET', `/repos/${R}/releases/tags/${TAG}`); } catch (e) { if (e.status !== 404) throw e; }
  return gh('POST', `/repos/${R}/releases`, JSON.stringify({ tag_name: TAG, target_commitish: 'main', name: 'Meme Cinema videos', make_latest: 'false',
    body: 'Video phim cho rạp Meme Cinema trong app (tools/x/film-video.js xuất, tools/x/film-release.js đẩy lên). App đọc video/films.json. Đừng xoá release này.' }), 'application/json'); }
function readIndex() { try { return JSON.parse(fs.readFileSync(INDEX, 'utf8')); } catch (e) { return {}; } }
// đẩy 1 video: trả link tải; cập nhật video/films.json (file = link release)
async function publish(id, file, o) { o = o || {};
  const R = repo(), rel = await release(R), buf = fs.readFileSync(file), h = crypto.createHash('md5').update(buf).digest('hex').slice(0, 10), name = `${id}-${h}.mp4`;
  let asset = (rel.assets || []).find(a => a.name === name);
  if (!asset) asset = await gh('POST', rel.upload_url.replace(/\{.*\}$/, '') + '?name=' + encodeURIComponent(name), buf, 'video/mp4');
  if (asset.size !== buf.length) throw new Error(`đẩy ${name} lệch cỡ ${asset.size} ≠ ${buf.length}`);
  const url = asset.browser_download_url;
  // 🔁 (anh 23/11) GIỮ 2 BẢN / phim: bản MỚI NHẤT (app phát) + bản NGAY TRƯỚC (prev, để quay lại nếu bản mới hỏng). Có bản mới → bản cũ nhất bị đẩy ra, xoá hẳn.
  const I = readIndex(), old = I[id] || {}, oldUrl = /^https?:/.test(old.file || '') ? old.file : null;
  const prev = oldUrl && oldUrl !== url ? { file: oldUrl, h: old.h, bytes: old.bytes, at: old.at, dur: old.dur } : (old.prev || null);   // xuất lại y hệt (cùng mã băm) → giữ nguyên bản trước cũ
  I[id] = Object.assign({}, old, { file: url, h, bytes: buf.length, at: new Date(Date.now() + 7 * 3600e3).toISOString().slice(0, 16).replace('T', ' ') + ' (giờ VN)', prev });
  if (!prev) delete I[id].prev; fs.writeFileSync(INDEX, JSON.stringify(I, null, 1) + '\n');
  const keepNames = new Set([name, prev && decodeURIComponent(prev.file.split('/').pop())]);
  for (const a of rel.assets || []) if (!keepNames.has(a.name) && a.name.startsWith(id + '-') && /^[0-9a-f]{10}\.mp4$/.test(a.name.slice(id.length + 1))) { await gh('DELETE', `/repos/${R}/releases/assets/${a.id}`); console.log(`  🗑️ xoá bản cũ nhất ${a.name}`); }
  if (!o.keep) fs.rmSync(file, { force: true });
  return url; }
// --as-prev: đưa 1 file lên làm BẢN TRƯỚC (không đụng bản đang phát) — dùng để khôi phục bản trước bị mất (vd dựng lại từ code cũ trong git)
async function publishPrev(id, file, o) { o = o || {};
  const R = repo(), rel = await release(R), buf = fs.readFileSync(file), h = crypto.createHash('md5').update(buf).digest('hex').slice(0, 10), name = `${id}-${h}.mp4`;
  const I = readIndex(); if (!I[id] || !/^https?:/.test(I[id].file || '')) throw new Error(id + ' chưa có bản đang phát trên release');
  if (I[id].h === h) throw new Error('file trùng bản đang phát');
  let asset = (rel.assets || []).find(a => a.name === name);
  if (!asset) asset = await gh('POST', rel.upload_url.replace(/\{.*\}$/, '') + '?name=' + encodeURIComponent(name), buf, 'video/mp4');
  if (asset.size !== buf.length) throw new Error(`đẩy ${name} lệch cỡ ${asset.size} ≠ ${buf.length}`);
  const curName = decodeURIComponent(I[id].file.split('/').pop());
  I[id].prev = { file: asset.browser_download_url, h, bytes: buf.length }; fs.writeFileSync(INDEX, JSON.stringify(I, null, 1) + '\n');
  for (const a of rel.assets || []) if (a.name !== name && a.name !== curName && a.name.startsWith(id + '-') && /^[0-9a-f]{10}\.mp4$/.test(a.name.slice(id.length + 1))) { await gh('DELETE', `/repos/${R}/releases/assets/${a.id}`); console.log(`  🗑️ xoá ${a.name}`); }
  if (!o.keep) fs.rmSync(file, { force: true });
  return asset.browser_download_url; }
module.exports = { publish, publishPrev };
if (require.main === module) (async () => {
  const args = process.argv.slice(2), keep = args.includes('--keep');
  const ids = args.includes('--all') ? fs.readdirSync(VDIR).filter(f => /\.mp4$/.test(f)).map(f => f.slice(0, -4)) : args.filter(a => !a.startsWith('--'));
  if (!ids.length) { console.error('cách dùng: film-release.js <id…> | --all [--keep]'); process.exit(2); }
  let bad = 0; for (const id of ids) { const f = path.join(VDIR, id + '.mp4'); if (!fs.existsSync(f)) { console.log(`❌ ${id}: không có ${path.relative(ROOT, f)}`); bad++; continue; }
    try { const u = await (args.includes("--as-prev") ? publishPrev : publish)(id, f, { keep }); console.log(`✅ ${id}${args.includes("--as-prev") ? " (bản trước)" : ""} → ${u}`); } catch (e) { bad++; console.log(`❌ ${id}: ${e.message}`); } }
  process.exit(bad ? 1 : 0);
})();
