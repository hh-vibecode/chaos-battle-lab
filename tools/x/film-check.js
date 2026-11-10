// 🎬 SOÁT PHIM 1 LỆNH (Mac + Windows, Node thuần): bảng khung + soát tiếng, KHÔNG BAO GIỜ treo (giới hạn cứng, luôn tắt trình duyệt + máy chủ).
//   node tools/x/film-check.js <idPhim> [--file <film-*.js>] [--t 1.2,3.4 | --a 0 --b 20 --step 0.5] [--w 320] [--cols 6] [--out <thư mục>] [--no-sfx] [--max 240]
//   Windows: powershell -NoProfile -ExecutionPolicy Bypass -File tools/node.ps1 tools/x/film-check.js fin1c4 --t 21.6,23.5 --out <scratchpad>/chk
// Ra: <out>/<id>.png (bảng khung — Read để soát) + <out>/<id>-sfx.md (báo cáo sfx-lint) + <out>/<id>-shots.md (film-lint, nếu có js/shots/<id>.json) + dòng tóm tắt.
//   Mã thoát 0 = sạch, 1 = có lỗi tiếng / lỗi nhịp, 2 = không chụp được.
// Vì sao có file này: 9/11 lệnh `cdp.js --launch … | grep` không thoát (trình duyệt con giữ ống stdout) → treo 3 tiếng. Ở đây mọi tiến trình con chạy
//   với stdout ra FILE, chờ ảnh xuất hiện rồi tự tắt; quá --max giây thì giết hết và báo lỗi.
const fs = require('fs'), path = require('path'), os = require('os'), { spawn, spawnSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..', '..'), args = process.argv.slice(2), opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; }, has = k => args.includes(k);
const ID = args[0]; if (!ID || ID.startsWith('--')) { console.error('cách dùng: film-check.js <idPhim> [--t …] [--out …]'); process.exit(2); }
const OUT = path.resolve(opt('--out', path.join(os.tmpdir(), 'film-check'))), MAX = +opt('--max', 240), PORT = +opt('--port', 8795), CDPP = +opt('--cdp-port', 9495);
fs.mkdirSync(OUT, { recursive: true });
// file phim: id có file riêng thật (> 2KB) thì dùng; cảnh cắt từ file chung (fin1c2 → film-fin1.js) thì bỏ đuôi cN
let FILE = opt('--file', null);
if (!FILE) { const own = path.join(ROOT, 'js', 'film-' + ID + '.js'); FILE = fs.existsSync(own) && fs.statSync(own).size > 2048 ? ID : ID.replace(/c\d+$/, ''); }
const q = new URLSearchParams({ id: ID, file: FILE, w: opt('--w', '320'), cols: opt('--cols', '6') });
if (opt('--t')) q.set('t', opt('--t')); else { q.set('step', opt('--step', '0.5')); if (opt('--a')) q.set('a', opt('--a')); if (opt('--b')) q.set('b', opt('--b')); }
const NODE = process.execPath, ENV = Object.assign({}, process.env, { ELECTRON_RUN_AS_NODE: '1' });
const PROFILE = path.join(os.tmpdir(), 'film-check-profile-' + PORT), steps = path.join(OUT, '.steps.txt'), png = path.join(OUT, ID + '.png'), log = path.join(OUT, '.cdp.log');
fs.writeFileSync(steps, `goto tools/x/film-sheet.html?${q}\nwaitfor window.__done\nwaitfor window.__done\nwaitfor window.__done\neval window.__done\nevalsave ${ID} window.__png\n`);
try { fs.rmSync(png, { force: true }); } catch (e) {}
const kids = [];
const run = (file, a, outFile) => { const fd = fs.openSync(outFile || os.devNull, 'w'); const p = spawn(NODE, [path.join(ROOT, file), ...a], { cwd: ROOT, env: ENV, stdio: ['ignore', fd, fd], windowsHide: true }); kids.push(p); return p; };
const stopAll = () => { spawnSync(NODE, [path.join(ROOT, 'tools/x/cdp.js'), '--stop', '--profile', PROFILE], { cwd: ROOT, env: ENV, stdio: 'ignore', timeout: 20000 });
  spawnSync(NODE, [path.join(ROOT, 'tools/x/serve.js'), '--stop', '--port', String(PORT)], { cwd: ROOT, env: ENV, stdio: 'ignore', timeout: 20000 });
  for (const k of kids) { try { k.kill(); } catch (e) {} } };
process.on('exit', stopAll); process.on('SIGINT', () => process.exit(130));
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const t0 = Date.now();
  stopAll();   // dọn sót từ lần trước
  run('tools/x/serve.js', ['--port', String(PORT)]);
  for (let i = 0; i < 40; i++) { try { const r = await fetch(`http://127.0.0.1:${PORT}/tools/x/film-sheet.html`, { signal: AbortSignal.timeout(800) }); if (r.ok) break; } catch (e) {} await sleep(250); }
  run('tools/x/cdp.js', ['--launch', '--port', String(CDPP), '--url', `http://127.0.0.1:${PORT}/`, '--profile', PROFILE, '--steps', steps, '--out', OUT], log);
  let ok = false; while ((Date.now() - t0) / 1000 < MAX) { if (fs.existsSync(png) && fs.statSync(png).size > 1000) { await sleep(400); ok = true; break; } await sleep(1000); }
  const lg = fs.existsSync(log) ? fs.readFileSync(log, 'utf8') : '', done = (lg.match(/(OK|LỖI)[^\n]*/g) || []).pop() || '';
  stopAll();
  let sfx = { code: 0, line: 'bỏ qua' };
  if (!has('--no-sfx')) { const target = opt('--sfx-id', ID), rep = path.join(OUT, ID + '-sfx.md');
    const r = spawnSync(NODE, [path.join(ROOT, 'tools/x/sfx-lint.js'), target, '--out', rep], { cwd: ROOT, env: ENV, encoding: 'utf8', timeout: 60000 });
    sfx = { code: r.status, line: (r.stderr || '').trim().split('\n').pop() || 'không chạy được sfx-lint' }; }
  // 📐 soát nhịp theo bảng phân cảnh js/shots/<id>.json (Bước 6) — có file thì chạy, báo cáo <out>/<id>-shots.md
  let shot = { code: 0, line: 'chưa có js/shots/' + ID + '.json' };
  if (fs.existsSync(path.join(ROOT, 'js', 'shots', ID + '.json'))) { const rep = path.join(OUT, ID + '-shots.md');
    const r = spawnSync(NODE, [path.join(ROOT, 'tools/x/film-lint.js'), ID, '--file', FILE, '--out', rep], { cwd: ROOT, env: ENV, encoding: 'utf8', timeout: 60000 });
    shot = { code: r.status, line: (r.stderr || '').trim().split('\n').pop() || 'không chạy được film-lint' }; }
  const secs = ((Date.now() - t0) / 1000).toFixed(0);
  console.log(`${ok ? '🖼️ ' + png : '❌ KHÔNG CHỤP ĐƯỢC (' + (done || 'hết ' + MAX + 's') + ') — xem ' + log}\n🔊 ${sfx.line}\n📐 ${shot.line}\n${done ? 'trang: ' + done + '\n' : ''}⏱️ ${secs}s`);
  process.exit(!ok ? 2 : (sfx.code || shot.code) ? 1 : 0);
})().catch(e => { console.error('lỗi: ' + e.message); process.exit(2); });
