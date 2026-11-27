// ⚡ TEST NHANH: giả lập nhiều trận 1vs1 bằng đồng hồ ảo (Windows + Mac, chỉ cần Node + Edge/Chrome — không playwright / ffmpeg).
//   node tools/x/sim.js <meme> --vs a,b,c [--n 3] [--seed 1] [--max 90] [--slow] [--force "<js>"] [--extra "<js>"]
//   Windows: powershell -NoProfile -ExecutionPolicy Bypass -File tools/node.ps1 tools/x/sim.js battlecat --vs cheems,doge --n 3
//   --vs all     : đấu với MỌI meme trong roster (trừ trainingdummy / fanchar)
//   --n          : số seed mỗi cặp (seed, seed+1, …) — cùng seed ra cùng trận
//   --slow       : vẫn VẼ (mặc định tắt vẽ cho nhanh, logic trận giữ nguyên)
//   --force/--extra : js chạy ngay sau START / js trả thêm số liệu lúc hết trận (vd "btcCats.length")
//   --dps        : ĐO DAME (anh 26/11): đấu BÙ NHÌN bất tử đi lại như meme thường, đánh lại 40/0.8s, chạy đủ --max (mặc định 25s ảo).
//                  Chuẩn: ~1000–1200 dame trong 22–25s là meme ổn. Thân bù nhìn mượn meme --vs (mặc định cheems), skill bị tắt.
// Tự bật serve.js (8765) + trình duyệt ngầm (9455) nếu chưa có; xong KHÔNG tắt (chạy tiếp lần sau nhanh) → dọn: cdp.js --stop + serve.js --stop.
const fs = require('fs'), path = require('path'), os = require('os'), { spawn, execFileSync } = require('child_process');
const args = process.argv.slice(2), opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; }, has = k => args.includes(k);
const ME = args[0]; if (!ME || ME.startsWith('--')) { console.log('usage: sim.js <meme> --vs a,b|all [--n 3] [--seed 1] [--max 90] [--slow]'); process.exit(2); }
const IMM = has('--immortal'), DPS = has('--dps') || IMM, N = +opt('--n', 3), SEED = +opt('--seed', 1), MAX = +opt('--max', DPS ? 25 : 90), PORT = 9455, ROOT = path.resolve(__dirname, '..', '..');
const TMP = (process.platform === 'win32' && fs.existsSync('D:/tools')) ? 'D:/tools/tmp' : os.tmpdir(); fs.mkdirSync(TMP, { recursive: true });
const NODE = process.execPath, sleep = ms => new Promise(r => setTimeout(r, ms));
const up = async (u) => { try { const r = await fetch(u, { signal: AbortSignal.timeout(1500) }); return r.ok; } catch (e) { return false; } };
(async () => {
  if (!(await up('http://127.0.0.1:8765/index.html'))) { spawn(NODE, [path.join(__dirname, 'serve.js')], { cwd: ROOT, detached: true, stdio: 'ignore', env: process.env }).unref(); for (let i = 0; i < 40 && !(await up('http://127.0.0.1:8765/index.html')); i++) await sleep(250); }
  const launch = !(await up(`http://127.0.0.1:${PORT}/json/version`));
  const vsArg = opt('--vs', DPS ? 'cheems' : '');
  const cfg = { dummy: DPS && !IMM, immortal: IMM, me: ME, vs: vsArg, n: N, seed: SEED, max: MAX, fast: !has('--slow'), force: opt('--force', ''), extra: opt('--extra', '') };
  const steps = [
    'goto index.html', 'reload',
    "eval (async()=>{ (0,eval)(await (await fetch('/tools/x/sim-inject.js?'+Date.now())).text()); return 'sim ok'; })()",
    // cả loạt chạy trong 1 eval / trận (eval của cdp tối đa 2 phút)
    `eval window.__cfg=${JSON.stringify(cfg)}; window.__list=(__cfg.vs==='all'?roster.map(c=>c.charKey).filter(k=>k&&k!==__cfg.me&&k!=='trainingdummy'&&k!=='fanchar'):__cfg.vs.split(',').filter(Boolean)); window.__jobs=[]; for(const o of __list) for(let i=0;i<__cfg.n;i++) __jobs.push([o,__cfg.seed+i]); window.__res=[]; __jobs.length+' trận'`,
  ];
  const jobs = vsArg === 'all' ? 400 : vsArg.split(',').filter(Boolean).length * N;
  for (let k = 0; k < jobs; k++) steps.push(`eval (async()=>{ const j=__jobs[${k}]; if(!j) return 'END'; const r=await __sim.run(__cfg.me,j[0],{seed:j[1],max:__cfg.max,fast:__cfg.fast,dummy:__cfg.dummy,immortal:__cfg.immortal,force:__cfg.force||null,extra:__cfg.extra||null}); __res.push(r); return 'R '+JSON.stringify(r); })()`);
  const sf = path.join(TMP, 'cbl-sim-steps.txt'); fs.writeFileSync(sf, steps.join('\n'));
  const t0 = Date.now();
  const ch = spawn(NODE, [path.join(__dirname, 'cdp.js'), '--steps', sf, '--out', TMP, '--port', String(PORT), ...(launch ? ['--launch'] : [])], { cwd: ROOT, env: process.env });
  const res = []; let buf = '';
  ch.stdout.on('data', d => { buf += d; let i; while ((i = buf.indexOf('\n')) >= 0) { const line = buf.slice(0, i).trim(); buf = buf.slice(i + 1);
    if (line === 'END') { ch.kill(); }
    if (line.startsWith('R ')) { const r = JSON.parse(line.slice(2)); res.push(r);
      const hp = r.hp.map(h => `${h[0]} ${h[1]}/${h[2]}${h[3] ? '✝' : ''}`).join(' · ');
      if (DPS) { console.log(`dame ${String(r.dealt).padStart(5)} trong ${String(r.t).padStart(4)}s  seed ${r.seed}  (${r.realSec}s thật)${r.extra !== undefined ? '  ' + JSON.stringify(r.extra) : ''}${r.errs && r.errs.length ? '  ⚠️ ' + r.errs.join(' | ') : ''}`); continue; }
      console.log(`${(r.win || 'hoà').padEnd(18)} ${String(r.t).padStart(5)}s  seed ${r.seed}  ${hp}  (${r.realSec}s thật)${r.extra !== undefined ? '  ' + JSON.stringify(r.extra) : ''}${r.errs && r.errs.length ? '  ⚠️ ' + r.errs.join(' | ') : ''}`); }
    else if (/EXC|Error|no page/.test(line)) console.log(line.slice(0, 300)); } });
  ch.stderr.on('data', d => process.stderr.write(d));
  await new Promise(r => ch.on('close', r));
  if (DPS) { const v = res.map(r => r.dealt), avg = v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length) : 0; console.log(`
${ME}: dame trung bình ${avg} trong ${MAX}s ảo (thấp ${Math.min(...v)} · cao ${Math.max(...v)}) · chuẩn 1000–1200 → ${avg < 1000 ? 'YẾU' : avg > 1200 ? 'MẠNH' : 'ỔN'}`); return; }
  const mine = res.filter(r => r.win && r.win.replace('?', '') === ME).length;
  const by = {}; for (const r of res) { const o = by[r.B] || (by[r.B] = { w: 0, n: 0 }); o.n++; if (r.win && r.win.replace('?', '') === ME) o.w++; }
  console.log(`\n${ME}: thắng ${mine}/${res.length}  (${res.length ? Math.round(mine / res.length * 100) : 0}%)  · ${((Date.now() - t0) / 1000).toFixed(0)}s thật`);
  console.log(Object.entries(by).map(([k, o]) => `${k} ${o.w}/${o.n}`).join(' · '));
})();
