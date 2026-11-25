// 🎞️ XUẤT PHIM MEME CINEMA → VIDEO MP4 CHO APP PHÁT (Windows + Mac, Node thuần, KHÔNG cần ffmpeg / playwright).
// Vì sao (anh 23/11): xem "Story · Chill Guy" tới giây ~7 là máy anh treo cứng — app đang VẼ PHIM TRỰC TIẾP, cảnh đó tốn 0.2–4 giây / khung
//   (đo bằng tools/x/film-bench.html). Anh chốt: "không để máy tự vẽ cảnh phim nữa, phim phải xử lý từ trước, ở app chỉ là bản video".
// → Phim vẽ trước 1 lần ở trình duyệt ngầm (Edge / Chrome headless), nén H.264 + AAC ngay trong trình duyệt (WebCodecs + tools/x/vendor/mp4-muxer.js),
//   lưu vào video/<id>.mp4 + ghi video/films.json. App (js/game.js playCineKit) CHỈ phát file này, không vẽ gì.
//   ⚠️ video/ nằm NGOÀI assets/ có chủ đích: bộ nạp game (js/boot.js) tải về máy MỌI file trong assets/ lúc mở game — để video ở đó là bắt máy tải cả trăm MB.
// Cách dùng (chạy ở thư mục repo):
//   Windows: ELECTRON_RUN_AS_NODE=1 "D:/Microsoft VS Code/Code.exe" tools/x/film-video.js fin1c6 [fin1c7 …]   ·   Mac: node tools/x/film-video.js fin1c6
//   --all            = mọi phim đang có trong rạp (danh sách FILMS bên dưới; fin1full = phát nối các phần, không xuất riêng)
//   --long 1280      = cạnh dài video (mặc định 1280 → 1280×720 / 720×1280) · --fps 30 · --kbps 2500 (hình) · --akbps 128 (tiếng)
//   --port 8796 --cdp-port 9496 (đổi nếu bận)
//   (23/11, anh chọn hướng 2) xuất xong TỰ ĐẨY lên GitHub Releases "films" (tools/x/film-release.js: cần token, xem đầu file đó) + xoá bản cũ trên release
//   + xoá file trong máy · --no-upload = chỉ xuất (thử) · --keep = giữ file trong máy. video/*.mp4 bị .gitignore — KHÔNG commit video vào repo.
// Sửa phim xong → chạy lại lệnh này cho đúng phim đó rồi phát hành CHỈ video/films.json (release.js --files video/films.json,…). Phim nào chưa có video thì app báo
//   "chưa có bản video" chứ KHÔNG vẽ trực tiếp nữa.
const fs = require('fs'), path = require('path'), os = require('os'), http = require('http'), crypto = require('crypto'), { spawn, execSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..', '..'), args = process.argv.slice(2), opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; }, has = k => args.includes(k);
const FILMS = ['fin1', 'fin1c5', 'fin1c6', 'fin1f2', 'fin1f3', 'fin1f1', 'fin1c4', 'fin1c7', 'fin1tr'];   // phải khớp rạp phim trong js/game.js (openCinema) — fin1full = nối các phần này
const VALS = new Set(['--long', '--fps', '--kbps', '--akbps', '--port', '--cdp-port']);
const IDS = has('--all') ? FILMS : args.filter((a, i) => !a.startsWith('--') && !VALS.has(args[i - 1]));
if (!IDS.length) { console.error('cách dùng: film-video.js <idPhim…> | --all  [--long 1280 --fps 30 --kbps 2500]'); process.exit(2); }
const LONG = +opt('--long', 1280), FPS = +opt('--fps', 30), KBPS = +opt('--kbps', 2500), AKBPS = +opt('--akbps', 128), PORT = +opt('--port', 8796), CDPP = +opt('--cdp-port', 9496);
const VDIR = path.join(ROOT, 'video'), INDEX = path.join(VDIR, 'films.json'); fs.mkdirSync(VDIR, { recursive: true });
const PROFILE = path.join((process.platform === 'win32' && require('fs').existsSync('D:/tools') ? 'D:/tools/tmp' : os.tmpdir()), 'film-video-profile-' + CDPP);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.gif': 'image/gif', '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.ogg': 'audio/ogg', '.svg': 'image/svg+xml', '.glb': 'model/gltf-binary', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.mp4': 'video/mp4', '.webm': 'video/webm' };
// máy chủ tĩnh + nhận file: POST /__save/<id> → video/<id>.mp4.part (driver đổi tên khi kiểm xong)
let gotFile = null;
const srv = http.createServer((req, res) => {
  const u = new URL(req.url, 'http://x');
  if (req.method === 'POST' && u.pathname.startsWith('/__save/')) { const id = u.pathname.slice(8); if (!/^[a-z0-9_-]+$/i.test(id)) { res.writeHead(400); return res.end(); }
    const f = path.join(VDIR, id + '.mp4.part'), ws = fs.createWriteStream(f); req.pipe(ws); ws.on('finish', () => { gotFile = f; res.writeHead(200); res.end('ok'); }); ws.on('error', () => { res.writeHead(500); res.end(); }); return; }
  let p = decodeURIComponent(u.pathname); if (p === '/') p = '/index.html';
  const f = path.join(ROOT, path.normalize(p).replace(/^([\\/])+/, '')); if (!f.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  fs.stat(f, (e, s) => { if (e || !s.isFile()) { res.writeHead(404); return res.end(); } res.writeHead(200, { 'Content-Type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream', 'Content-Length': s.size }); fs.createReadStream(f).pipe(res); });
});
function browserPath() {
  const c = process.platform === 'win32'
    ? ['C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe', 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe']
    : ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge', '/Applications/Chromium.app/Contents/MacOS/Chromium'];
  const p = c.find(x => fs.existsSync(x)); if (!p) throw new Error('không thấy Edge / Chrome'); return p; }
let browser = null;
function killBrowser() {   // chỉ giết trình duyệt của CHÍNH công cụ này (theo hồ sơ riêng), không đụng trình duyệt khác
  try { if (browser) { if (process.platform === 'win32') execSync(`taskkill /PID ${browser.pid} /T /F`, { stdio: 'ignore' }); else process.kill(-browser.pid, 'SIGTERM'); } } catch (e) {}
  try { if (process.platform === 'win32') { const pf = PROFILE.replace(/'/g, "''"); execSync(`powershell -NoProfile -Command "Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -and $_.CommandLine.Contains('${pf}') } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }"`, { stdio: 'ignore' }); }
    else execSync(`pkill -f -- ${JSON.stringify('--user-data-dir=' + PROFILE)}`, { stdio: 'ignore' }); } catch (e) {}
  browser = null; }
async function cdpUp() { try { return (await fetch(`http://127.0.0.1:${CDPP}/json/version`, { signal: AbortSignal.timeout(1500) })).ok; } catch (e) { return false; } }
async function openPage() {
  if (await cdpUp()) throw new Error(`cổng ${CDPP} đang bị trình duyệt khác dùng — thêm --cdp-port <cổng khác>`);
  fs.mkdirSync(PROFILE, { recursive: true });
  browser = spawn(browserPath(), ['--headless=new', `--remote-debugging-port=${CDPP}`, `--user-data-dir=${PROFILE}`, '--window-size=1280,800', '--autoplay-policy=no-user-gesture-required', '--no-first-run', '--mute-audio', '--disable-audio-output',
    '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows', '--ignore-gpu-blocklist', 'about:blank'], { detached: process.platform !== 'win32', stdio: 'ignore' });
  for (let i = 0; i < 60 && !(await cdpUp()); i++) await sleep(250);
  const tab = (await (await fetch(`http://127.0.0.1:${CDPP}/json`)).json()).find(t => t.type === 'page'); if (!tab) throw new Error('không mở được trang');
  const ws = new WebSocket(tab.webSocketDebuggerUrl); await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let n = 0; const pend = new Map(), logs = [];
  ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); }
    else if (m.method === 'Runtime.exceptionThrown') logs.push('JS: ' + JSON.stringify(m.params.exceptionDetails).slice(0, 300));
    else if (m.method === 'Page.javascriptDialogOpening') ws.send(JSON.stringify({ id: ++n, method: 'Page.handleJavaScriptDialog', params: { accept: true } })); };
  const send = (method, params = {}) => new Promise(r => { const i = ++n; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async js => { const r = await send('Runtime.evaluate', { expression: js, awaitPromise: true, returnByValue: true, timeout: 600000 });
    if (r.result && r.result.exceptionDetails) throw new Error('JS lỗi: ' + JSON.stringify(r.result.exceptionDetails).slice(0, 500)); return r.result && r.result.result ? r.result.result.value : undefined; };
  await send('Page.enable'); await send('Runtime.enable');
  return { ws, send, ev, logs }; }
function readIndex() { try { return JSON.parse(fs.readFileSync(INDEX, 'utf8')); } catch (e) { return {}; } }
const fmt = s => s >= 60 ? Math.floor(s / 60) + 'p' + String(Math.round(s % 60)).padStart(2, '0') : Math.round(s) + 's';
(async () => {
  await new Promise(r => srv.listen(PORT, '127.0.0.1', r));
  process.on('exit', killBrowser); process.on('SIGINT', () => process.exit(130));
  let bad = 0;
  for (const id of IDS) {
    const T0 = Date.now(); gotFile = null; console.log(`🎬 ${id} · cạnh dài ${LONG} · ${FPS} hình/giây · ${KBPS} kbps`);
    let P = null;
    try {
      P = await openPage();   // mỗi phim 1 trình duyệt mới → không dồn RAM
      await P.send('Page.navigate', { url: `http://127.0.0.1:${PORT}/` });
      let ok = false; for (let k = 0; k < 600 && !ok; k++) { await sleep(1000); try { ok = await P.ev("typeof playCineKit==='function' && !document.getElementById('bootScreen')"); } catch (e) {} }
      if (!ok) throw new Error('game không nạp xong sau 10 phút');
      await P.ev(`new Promise((r,j)=>{ const s=document.createElement('script'); s.src='tools/x/film-video-page.js?'+Date.now(); s.onload=r; s.onerror=()=>j('không tải được film-video-page.js'); document.body.appendChild(s); })`);
      await P.ev(`(__fvRun(${JSON.stringify({ id, long: LONG, fps: FPS, vkbps: KBPS, akbps: AKBPS, up: '/__save/' + id })}), true)`);   // chạy nền trong trang, không chờ (evaluate có hạn giờ sẽ CẮT việc dài)
      let last = -1, lastT = Date.now(), st = null;
      for (;;) { await sleep(3000); st = await P.ev('window.__fv && JSON.stringify(window.__fv)').then(s => s && JSON.parse(s)).catch(() => null);
        if (!st) continue; if (st.done) break;
        if (st.i !== last) { last = st.i; lastT = Date.now(); if (st.n) { const el = (Date.now() - T0) / 1000, k = st.i / st.n; process.stdout.write(`\r  ${st.phase} ${st.i}/${st.n} khung · ${fmt(el)}${k > 0.02 ? ' · còn ~' + fmt(el / k * (1 - k)) : ''}      `); } }
        else if (Date.now() - lastT > 15 * 60e3) throw new Error(`đứng ở "${st.phase}" khung ${st.i} quá 15 phút`); }
      process.stdout.write('\n');
      if (st.err) throw new Error(st.err);
      for (let k = 0; k < 100 && !gotFile; k++) await sleep(100); if (!gotFile) throw new Error('không nhận được file');
      const dst = path.join(VDIR, id + '.mp4'), buf = fs.readFileSync(gotFile); if (buf.length !== st.info.bytes) throw new Error(`file nhận ${buf.length} byte ≠ ${st.info.bytes}`);
      fs.renameSync(gotFile, dst);
      const I = readIndex(), vn = new Date(Date.now() + 7 * 3600e3);
      // ⚠️ (23/11 lỗi đã gây: ghi đè file = đường dẫn trong máy TRƯỚC khi đẩy → film-release tưởng không có bản trước, xoá mất bản trước của fin1c4 / fin1c7)
      //    → có đẩy lên release thì GIỮ NGUYÊN file / h / bytes / prev cũ, để film-release.js đọc đúng link bản đang phát và dời nó sang prev.
      const meta = { w: st.info.w, hgt: st.info.h, dur: st.info.dur, fps: st.info.fps };
      //    --no-upload (chỉ xuất thử) → KHÔNG đụng films.json (app vẫn phát bản trên release).
      if (!has('--no-upload')) I[id] = Object.assign({}, I[id] || {}, meta);
      const sorted = {}; for (const k of Object.keys(I).sort((a, b) => FILMS.indexOf(a) - FILMS.indexOf(b))) sorted[k] = I[k];
      fs.writeFileSync(INDEX, JSON.stringify(sorted, null, 1) + '\n');
      const i = st.info; console.log(`  ✅ video/${id}.mp4 · ${i.w}×${i.h} · ${i.dur}s · ${(i.bytes / 1048576).toFixed(1)} MB · ${i.vcodec} + ${i.acodec} · ${i.sfx} tiếng + ${i.mus} nhạc${i.miss.length ? ' · ⚠️ THIẾU tiếng: ' + i.miss.join(', ') : ''} · vẽ ${i.msPerFrame} ms/khung · tổng ${fmt((Date.now() - T0) / 1000)}`);
      if (!has('--no-upload')) { try { console.log(`  ☁️ đã đẩy lên release: ${await require('./film-release.js').publish(id, dst, { keep: has('--keep') })}`); }
        catch (e) { bad++; console.log(`  ❌ CHƯA đẩy lên release (${e.message}) — file vẫn ở video/${id}.mp4, chạy lại: tools/x/film-release.js ${id}`); } }
    } catch (e) { bad++; console.log(`\n  ❌ ${id}: ${String(e.message || e).slice(0, 800)}`); if (P && P.logs.length) console.log('  ' + P.logs.slice(-5).join('\n  ')); try { if (gotFile) fs.rmSync(gotFile, { force: true }); } catch (e2) {} }
    try { if (P) P.ws.close(); } catch (e) {} killBrowser(); await sleep(1500);
  }
  srv.close(); process.exit(bad ? 1 : 0);
})().catch(e => { console.error('LỖI ' + e.message); killBrowser(); process.exit(1); });
