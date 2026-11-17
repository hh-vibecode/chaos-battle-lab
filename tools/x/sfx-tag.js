// 👂 Gắn nhãn "tai máy" cho kho tiếng (Mac + Windows, Node thuần + trình duyệt ngầm) → ghi vào tools/x/sfx-catalog.json (trường tai / giong / loai).
//   node tools/x/sfx-tag.js [--keys a,b] [--max 2400]      (Windows: powershell -NoProfile -ExecutionPolicy Bypass -File tools/node.ps1 tools/x/sfx-tag.js)
// Lần đầu tải model AST (~90MB) từ Hugging Face vào hồ sơ trình duyệt riêng (PC: D:/tools/sfx-tag-profile — ổ C gần đầy; Mac: thư mục tạm) → các lần sau dùng lại.
// Sau khi gắn: loai '?' được điền theo nhãn AudioSet; tiếng KHÔNG phải loại giọng mà speech ≥ 0.35 → giong:true (sfx-lint báo 🗣️ CÓ GIỌNG).
const fs = require('fs'), path = require('path'), os = require('os'), { spawn, spawnSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..', '..'), args = process.argv.slice(2), opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const CATF = path.join(__dirname, 'sfx-catalog.json'), MAX = +opt('--max', 2400), PORT = +opt('--port', 8794), CDPP = +opt('--cdp-port', 9494);   // --port / --cdp-port riêng khi có phiên khác chạy cùng lúc
const PROFILE = (process.platform === 'win32' && fs.existsSync('D:/tools') ? 'D:/tools/sfx-tag-profile' : path.join(os.tmpdir(), 'sfx-tag-profile')) + (opt('--port') ? '-' + PORT : '');
const OUT = path.join(os.tmpdir(), 'sfx-tag-' + PORT); fs.mkdirSync(OUT, { recursive: true });
const NODE = process.execPath, ENV = Object.assign({}, process.env, { ELECTRON_RUN_AS_NODE: '1' }), log = path.join(OUT, 'cdp.log'), steps = path.join(OUT, 'steps.txt');
const url = 'tools/x/sfx-tag.html' + (opt('--keys') ? '?keys=' + opt('--keys') : '');
fs.writeFileSync(steps, `goto ${url}\n` + 'waitfor window.__done\n'.repeat(Math.ceil(MAX / 120)) + 'eval window.__done\neval window.__out\n');
const kids = [], run = (f, a, o) => { const fd = fs.openSync(o || os.devNull, 'w'); const p = spawn(NODE, [path.join(ROOT, f), ...a], { cwd: ROOT, env: ENV, stdio: ['ignore', fd, fd], windowsHide: true }); kids.push(p); return p; };
const stopAll = () => { spawnSync(NODE, [path.join(ROOT, 'tools/x/cdp.js'), '--stop', '--profile', PROFILE], { cwd: ROOT, env: ENV, stdio: 'ignore', timeout: 20000 }); spawnSync(NODE, [path.join(ROOT, 'tools/x/serve.js'), '--stop', '--port', String(PORT)], { cwd: ROOT, env: ENV, stdio: 'ignore', timeout: 20000 }); for (const k of kids) { try { k.kill(); } catch (e) {} } };
process.on('exit', stopAll);
// nhãn AudioSet → loại của danh mục
const MAP = [['nhạc', /^Music|Singing|Song|Musical instrument|Piano|Guitar|Violin|Drum|Orchestra|Electronic music|Hip hop|Techno|Theme music/],
  ['giọng', /speech|Shout|Yell|Scream|Laughter|Crying|Baby cry|Whispering|Battle cry|Groan|Grunt|Sigh|Gasp|Cough|Meow|Purr|Hiss|Roar|Growling|Howl|Bark/i],
  ['nổ', /Explosion|Boom|Gunshot|Burst|Eruption|Fireworks/], ['vỡ', /Glass|Shatter|Breaking|Smash|Crack|Crumpling/], ['vút', /Whoosh|Swoosh|Swish|Wind noise|Whip/],
  ['va chạm', /Thump|Thud|Slap|Smack|Whack|Bang|Knock|Punch|Slam|Clang|Clatter|Hammer/], ['rung', /Rumble|Earthquake|Thunder/], ['rơi', /Falling|Whistle/],
  ['năng lượng', /Zing|Sine wave|Electronic tuner|Buzz|Hum|Synthesizer|Sound effect|Beep|Chirp tone/], ['nền', /Wind|Rain|Crowd|Traffic|Vehicle|Fire|Water|Applause|Chatter|Inside/]];
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const t0 = Date.now(); stopAll();
  run('tools/x/serve.js', ['--port', String(PORT)]);
  for (let i = 0; i < 40; i++) { try { if ((await fetch(`http://127.0.0.1:${PORT}/tools/x/sfx-tag.html`, { signal: AbortSignal.timeout(800) })).ok) break; } catch (e) {} await sleep(250); }
  const cdp = run('tools/x/cdp.js', ['--launch', '--port', String(CDPP), '--url', `http://127.0.0.1:${PORT}/`, '--profile', PROFILE, '--steps', steps, '--out', OUT], log);
  await new Promise(r => { const iv = setInterval(() => { if (cdp.exitCode != null || (Date.now() - t0) / 1000 > MAX + 60) { clearInterval(iv); r(); } }, 2000); });
  stopAll();
  const lines = fs.readFileSync(log, 'utf8').split(/\r?\n/), jl = lines.filter(l => l.startsWith('{')).pop(), done = lines.filter(l => /^(OK|LỖI)/.test(l)).pop() || '(không có kết quả)';
  if (!jl) { console.error('không gắn được nhãn: ' + done + ' — xem ' + log); process.exit(2); }
  const R = JSON.parse(jl), C = JSON.parse(fs.readFileSync(CATF, 'utf8')); let filled = 0, voice = 0, err = 0;
  for (const [k, r] of Object.entries(R)) { const it = C.tieng[k]; if (!it) continue; if (r.err) { err++; continue; }
    it.tai = r.top.map(([l, s]) => l + ' ' + Math.round(s * 100) + '%'); it.speech = r.speech; it.musicScore = r.music;
    if (it.loai === '?' && !it.tay) { const hit = r.top.filter(([, s]) => s >= 0.1).map(([l]) => (MAP.find(([, re]) => re.test(l)) || [])[0]).find(Boolean); if (hit) { it.loai = hit; it.loaiTuTai = true; filled++; } }
    it.giong = it.loai !== 'giọng' && it.loai !== 'nhạc' && r.speech >= 0.35; if (it.giong) voice++; }
  fs.writeFileSync(CATF, JSON.stringify(C, null, 1));
  const left = Object.values(C.tieng).filter(v => v.loai === '?').length;
  console.log(`${done} · điền loại ${filled} · nghi lẫn giọng người ${voice} · lỗi ${err} · còn chưa rõ loại ${left} · ${((Date.now() - t0) / 1000).toFixed(0)}s`);
})().catch(e => { console.error('lỗi: ' + e.message); process.exit(2); });
