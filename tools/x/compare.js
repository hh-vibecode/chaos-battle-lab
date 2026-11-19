// 🪞 SO SÁNH SONG SONG phim với MẪU (anh dặn 19/11: làm xong phải đặt song song so với ảnh mẫu) — Mac + Windows, Node thuần.
//   node tools/x/compare.js <idPhim> --t 19.1,19.5 --ref tools/x/_ref/gon-angry.gif --rt 0,0.5 [--lab "A1,A2"] [--w 480] [--out <thư mục>]
//   Ra: <out>/<id>-compare.png (mỗi hàng: khung mình | khung mẫu). Mẫu: GIF / mp4 / png-jpg (để trong tools/x/_ref/ — gitignore). Tự bật / tắt trình duyệt + máy chủ.
const fs = require('fs'), path = require('path'), os = require('os'), { spawn, spawnSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..', '..'), args = process.argv.slice(2), opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; }, has = k => args.includes(k);
const ID = args[0]; if (!ID || ID.startsWith('--')) { console.error('cách dùng: compare.js <idPhim> --t … --ref … [--rt …] [--out …]'); process.exit(2); }
const OUT = path.resolve(opt('--out', path.join(os.tmpdir(), 'film-check'))), MAX = +opt('--max', 240), PORT = +opt('--port', 8794), CDPP = +opt('--cdp-port', 9494);
fs.mkdirSync(OUT, { recursive: true });
// file phim: id có file riêng thật (> 2KB) thì dùng; cảnh cắt từ file chung (fin1c2 → film-fin1.js) thì bỏ đuôi cN
let FILE = opt('--file', null);
if (!FILE) { const own = path.join(ROOT, 'js', 'film-' + ID + '.js'); FILE = fs.existsSync(own) && fs.statSync(own).size > 2048 ? ID : ID.replace(/c\d+$/, ''); }
const q = new URLSearchParams({ id: ID, file: FILE, w: opt('--w', '480') }); for (const k of ['t', 'ref', 'rt', 'lab']) if (opt('--' + k)) q.set(k, opt('--' + k));
const NODE = process.execPath, ENV = Object.assign({}, process.env, { ELECTRON_RUN_AS_NODE: '1' });
const PROFILE = path.join(os.tmpdir(), 'compare-profile-' + PORT), steps = path.join(OUT, '.steps.txt'), png = path.join(OUT, ID + '-compare.png'), log = path.join(OUT, '.cdp.log'), txt = path.join(OUT, ID + '-compare.txt');
fs.writeFileSync(steps, `goto tools/x/compare.html?${q}
waitfor window.__done
waitfor window.__done
waitfor window.__done
eval window.__done
evalsave ${ID}-compare window.__png
`);
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
  for (let i = 0; i < 40; i++) { try { const r = await fetch(`http://127.0.0.1:${PORT}/tools/x/compare.html`, { signal: AbortSignal.timeout(800) }); if (r.ok) break; } catch (e) {} await sleep(250); }
  run('tools/x/cdp.js', ['--launch', '--port', String(CDPP), '--url', `http://127.0.0.1:${PORT}/`, '--profile', PROFILE, '--steps', steps, '--out', OUT], log);
  let ok = false; while ((Date.now() - t0) / 1000 < MAX) { if (fs.existsSync(png) && fs.statSync(png).size > 1000) { await sleep(400); ok = true; break; } await sleep(1000); }
  const lg = fs.existsSync(log) ? fs.readFileSync(log, 'utf8') : '', done = (lg.match(/(OK|LỖI)[^\n]*/g) || []).pop() || '';
  stopAll();
  console.log(ok ? '🪞 ' + png : '❌ KHÔNG CHỤP ĐƯỢC (' + (done || 'hết ' + MAX + 's') + ')'); process.exit(ok ? 0 : 2);
})().catch(e => { console.error('lỗi: ' + e.message); process.exit(2); });
