// 👂 "NGHE" PHIM 1 LỆNH (Mac + Windows, Node thuần): trộn tiếng + nhạc của phim cine-kit trong trình duyệt ngầm → ẢNH (lịch tiếng, dạng sóng tiếng/nhạc,
//   độ to, 3 dải tần, phổ) + BẢNG SOÁT từng cú (nổi lên bao nhiêu dB, bị nhạc che không, lặng trước cú lớn, rè). Claude đọc ảnh + bảng thay cho tai.
//   node tools/x/film-listen.js <idPhim> [--file <film-*.js>] [--a 30 --b 60] [--w 1800] [--out <thư mục>] [--max 240]
//   Windows: powershell -NoProfile -ExecutionPolicy Bypass -File tools/node.ps1 tools/x/film-listen.js fin1f1 --a 40 --b 60 --out <scratchpad>/nghe
// Ra: <out>/<id>-listen.png + <out>/<id>-listen.md. Cách đọc: skill dung-phim mục "🔊 TIẾNG CẢNH ĐÁNH".
const fs = require('fs'), path = require('path'), os = require('os'), { spawn, spawnSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..', '..'), args = process.argv.slice(2), opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const ID = args[0]; if (!ID || ID.startsWith('--')) { console.error('cách dùng: film-listen.js <idPhim> [--a … --b …] [--out …]'); process.exit(2); }
const OUT = path.resolve(opt('--out', path.join(os.tmpdir(), 'film-listen'))), MAX = +opt('--max', 240), PORT = +opt('--port', 8796), CDPP = +opt('--cdp-port', 9496);
fs.mkdirSync(OUT, { recursive: true });
let FILE = opt('--file', null);
if (!FILE) { const own = path.join(ROOT, 'js', 'film-' + ID + '.js'); FILE = fs.existsSync(own) && fs.statSync(own).size > 2048 ? ID : ID.replace(/c\d+$/, ''); }
const q = new URLSearchParams({ id: ID, file: FILE, w: opt('--w', '1800') }); if (opt('--a')) q.set('a', opt('--a')); if (opt('--b')) q.set('b', opt('--b'));
const NODE = process.execPath, ENV = Object.assign({}, process.env, { ELECTRON_RUN_AS_NODE: '1' });
const PROFILE = path.join(os.tmpdir(), 'film-listen-profile-' + PORT), steps = path.join(OUT, '.steps.txt'), name = ID + '-listen', png = path.join(OUT, name + '.png'), log = path.join(OUT, '.cdp.log');
fs.writeFileSync(steps, `goto tools/x/film-listen.html?${q}\nwaitfor window.__done\nwaitfor window.__done\nwaitfor window.__done\neval window.__done\nevalsave ${name} window.__png\neval '@@REPORT@@'+window.__report+'@@END@@'\n`);
try { fs.rmSync(png, { force: true }); } catch (e) {}
const kids = [];
const run = (file, a, outFile) => { const fd = fs.openSync(outFile || os.devNull, 'w'); const p = spawn(NODE, [path.join(ROOT, file), ...a], { cwd: ROOT, env: ENV, stdio: ['ignore', fd, fd], windowsHide: true }); kids.push(p); return p; };
const stopAll = () => { spawnSync(NODE, [path.join(ROOT, 'tools/x/cdp.js'), '--stop', '--profile', PROFILE], { cwd: ROOT, env: ENV, stdio: 'ignore', timeout: 20000 });
  spawnSync(NODE, [path.join(ROOT, 'tools/x/serve.js'), '--stop', '--port', String(PORT)], { cwd: ROOT, env: ENV, stdio: 'ignore', timeout: 20000 });
  for (const k of kids) { try { k.kill(); } catch (e) {} } };
process.on('exit', stopAll); process.on('SIGINT', () => process.exit(130));
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const t0 = Date.now(); stopAll();
  run('tools/x/serve.js', ['--port', String(PORT)]);
  for (let i = 0; i < 40; i++) { try { const r = await fetch(`http://127.0.0.1:${PORT}/tools/x/film-listen.html`, { signal: AbortSignal.timeout(800) }); if (r.ok) break; } catch (e) {} await sleep(250); }
  run('tools/x/cdp.js', ['--launch', '--port', String(CDPP), '--url', `http://127.0.0.1:${PORT}/`, '--profile', PROFILE, '--steps', steps, '--out', OUT], log);
  let ok = false, rep = '';
  while ((Date.now() - t0) / 1000 < MAX) { const lg = fs.existsSync(log) ? fs.readFileSync(log, 'utf8') : ''; const all = [...lg.matchAll(/@@REPORT@@([\s\S]*?)@@END@@/g)].filter(x => !/window\.__report/.test(x[1])), m = all.pop();   // bỏ dòng log in lại câu lệnh
    if (m && fs.existsSync(png)) { rep = m[1].replace(/\\n/g, '\n').replace(/\\\|/g, '|'); ok = true; break; } if (/LỖI/.test(lg) && /evalsave fail/.test(lg)) break; await sleep(1000); }
  const lg = fs.existsSync(log) ? fs.readFileSync(log, 'utf8') : '', done = (lg.match(/(OK|LỖI)[^\n"]*/g) || []).pop() || '';
  stopAll();
  if (ok) fs.writeFileSync(path.join(OUT, name + '.md'), rep + '\n');
  const warn = (rep.match(/⚠️/g) || []).length;
  console.log(ok ? `👂 ${png}\n📋 ${path.join(OUT, name + '.md')} · ${warn} cảnh báo\ntrang: ${done}\n⏱️ ${((Date.now() - t0) / 1000).toFixed(0)}s` : `❌ không nghe được (${done || 'hết ' + MAX + 's'}) — xem ${log}`);
  process.exit(ok ? (warn ? 1 : 0) : 2);
})().catch(e => { console.error('lỗi: ' + e.message); process.exit(2); });
