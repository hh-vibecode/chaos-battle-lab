// 🎚️ SOÁT CHUYỂN ĐỘNG phim cine-kit (Mac + Windows, Node thuần): dựng phim mỗi 1/fps giây, đo chuyển động từng khung → báo CẮT / CHỚP / GIẬT / ĐỨNG (skill hoat-hoa-vfx).
//   node tools/x/anim-check.js <idPhim> [--a 0 --b 5] [--fps 30] [--out <thư mục>] [--max 300]
//   Ra: <out>/<id>-motion.png (biểu đồ) + <out>/<id>-motion.txt (bảng nhãn). Tự bật / tắt trình duyệt + máy chủ (không treo, không để chạy ngầm).
const fs = require('fs'), path = require('path'), os = require('os'), { spawn, spawnSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..', '..'), args = process.argv.slice(2), opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; }, has = k => args.includes(k);
const ID = args[0]; if (!ID || ID.startsWith('--')) { console.error('cách dùng: film-check.js <idPhim> [--t …] [--out …]'); process.exit(2); }
const OUT = path.resolve(opt('--out', path.join((process.platform === 'win32' && require('fs').existsSync('D:/tools') ? 'D:/tools/tmp' : os.tmpdir()), 'film-check'))), MAX = +opt('--max', 240), PORT = +opt('--port', 8796), CDPP = +opt('--cdp-port', 9496);
fs.mkdirSync(OUT, { recursive: true });
// file phim: id có file riêng thật (> 2KB) thì dùng; cảnh cắt từ file chung (fin1c2 → film-fin1.js) thì bỏ đuôi cN
let FILE = opt('--file', null);
if (!FILE) { const own = path.join(ROOT, 'js', 'film-' + ID + '.js'); FILE = fs.existsSync(own) && fs.statSync(own).size > 2048 ? ID : ID.replace(/c\d+$/, ''); }
const q = new URLSearchParams({ id: ID, file: FILE, fps: opt('--fps', '30') }); if (opt('--a')) q.set('a', opt('--a')); if (opt('--b')) q.set('b', opt('--b'));
const NODE = process.execPath, ENV = Object.assign({}, process.env, { ELECTRON_RUN_AS_NODE: '1' });
const PROFILE = path.join((process.platform === 'win32' && require('fs').existsSync('D:/tools') ? 'D:/tools/tmp' : os.tmpdir()), 'film-check-profile-' + PORT), steps = path.join(OUT, '.steps.txt'), png = path.join(OUT, ID + '-motion.png'), log = path.join(OUT, '.cdp.log'), txt = path.join(OUT, ID + '-motion.txt');
fs.writeFileSync(steps, `goto tools/x/anim-check.html?${q}\nwaitfor window.__done\nwaitfor window.__done\nwaitfor window.__done\neval window.__done\neval window.__sum\nevalsave ${ID}-motion window.__png\n`);
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
  for (let i = 0; i < 40; i++) { try { const r = await fetch(`http://127.0.0.1:${PORT}/tools/x/anim-check.html`, { signal: AbortSignal.timeout(800) }); if (r.ok) break; } catch (e) {} await sleep(250); }
  run('tools/x/cdp.js', ['--launch', '--port', String(CDPP), '--url', `http://127.0.0.1:${PORT}/`, '--profile', PROFILE, '--steps', steps, '--out', OUT], log);
  let ok = false; while ((Date.now() - t0) / 1000 < MAX) { if (fs.existsSync(png) && fs.statSync(png).size > 1000) { await sleep(400); ok = true; break; } await sleep(1000); }
  const lg = fs.existsSync(log) ? fs.readFileSync(log, 'utf8') : '', done = (lg.match(/(OK|LỖI)[^\n]*/g) || []).pop() || '';
  stopAll();
  const NLc = String.fromCharCode(10), sum = (lg.split(NLc + '> window.__sum')[1] || '').split(NLc + 'evalsave')[0].trim(); fs.writeFileSync(txt, sum || done);
  console.log((ok ? '📈 ' + png : '❌ KHÔNG CHỤP ĐƯỢC (' + (done || 'hết ' + MAX + 's') + ')') + NLc + (sum || done));
  process.exit(ok ? (/khung GIẬT/.test(sum) ? 1 : 0) : 2);
})().catch(e => { console.error('lỗi: ' + e.message); process.exit(2); });
