// 🖥️ STUDIO — trang theo dõi + sửa việc đang chạy, chạy LOCAL trên máy anh: http://localhost:8790
//   node tools/x/studio.js            → bật (chạy nền được: nohup node tools/x/studio.js >/dev/null 2>&1 &)
//   node tools/x/studio.js --stop     → tắt (luật CLAUDE.md: tiến trình nền không dùng nữa thì tắt)
// 3 tab đúng 3 mảng việc của anh (25/11): 🎬 Phim · ⚔️ Trận đấu · 💬 Commenter vs meme.
// Đọc out/status/<kind>.json do các công cụ ghi (tools/x/job-status.js) — trang chỉ đọc file nhỏ mỗi giây nên KHÔNG làm chậm việc quay.
// Tab Commenter sửa được bảng chèn meme (spec của tools/x/fan-edit.py), xem khung hình tại mốc chèn, bấm dựng lại / quay mới.
const http = require('http'), fs = require('fs'), path = require('path'), os = require('os'), { spawn, execFileSync } = require('child_process');
const WIN = process.platform === 'win32';   // 🪟 Windows: node mượn VS Code (ELECTRON_RUN_AS_NODE=1 "D:/Microsoft VS Code/Code.exe" tools/x/studio.js) — không có ps / nice
const ROOT = path.resolve(__dirname, '..', '..'), PORT = 8790, SDIR = path.join(ROOT, 'out', 'status'), PIDF = path.join(SDIR, 'studio.pid');
const HOME = os.homedir(), MB = path.join(HOME, 'Desktop', 'Meme Battles'), MEMES = path.join(HOME, 'Desktop', '#memesource');
const ALLOW = [ROOT, MB, MEMES, '/private/tmp', os.tmpdir(), 'D:\\meme-anime-lab-videos'];
fs.mkdirSync(SDIR, { recursive: true });
if (process.argv.includes('--stop')) {
  try { const p = +fs.readFileSync(PIDF, 'utf8'); process.kill(p); fs.unlinkSync(PIDF); console.log('đã tắt Studio (pid ' + p + ')'); } catch (e) { console.log('Studio không chạy'); }
  process.exit(0);
}
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.json': 'application/json', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.gif': 'image/gif', '.webp': 'image/webp', '.mp4': 'video/mp4', '.mov': 'video/quicktime', '.webm': 'video/webm', '.mp3': 'audio/mpeg', '.wav': 'audio/wav' };
const alive = pid => { try { process.kill(pid, 0); return true; } catch (e) { return false; } };
const readJ = f => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return null; } };
const okPath = p => { const r = path.resolve(p); return ALLOW.some(a => r === a || r.startsWith(a + path.sep)); };
const send = (res, code, body, type) => { res.writeHead(code, { 'Content-Type': type || 'application/json', 'Cache-Control': 'no-store' }); res.end(typeof body === 'string' || Buffer.isBuffer(body) ? body : JSON.stringify(body)); };
const body = req => new Promise(r => { let d = ''; req.on('data', c => d += c); req.on('end', () => r(d)); });
const NODE_PATH = WIN ? '' : (() => { try { const r = execFileSync('/bin/sh', ['-c', `find ${HOME}/.npm/_npx -maxdepth 3 -type d -name playwright | head -1`]).toString().trim(); return r ? path.dirname(r) : ''; } catch (e) { return ''; } })();

function procs() {   // việc nặng đang chạy (để thấy cả việc không ghi trạng thái) — chỉ Mac
  if (WIN) return [];
  try { return execFileSync('/bin/ps', ['-Ao', 'pid,pcpu,etime,command']).toString().split('\n').slice(1)
      .filter(l => /render-(cine|match|duo|fan)\.js|film-video\.js|fan-edit\.py|ffmpeg/.test(l) && !/ps -Ao/.test(l))
      .map(l => { const m = l.trim().match(/^(\d+)\s+([\d.]+)\s+(\S+)\s+(.*)$/); return m && { pid: +m[1], cpu: +m[2], etime: m[3], cmd: m[4].replace(ROOT + '/', '').slice(0, 220) }; }).filter(Boolean); }
  catch (e) { return []; }
}
function videos() {
  const out = [];
  const walk = (d, depth) => { let ls = []; try { ls = fs.readdirSync(d, { withFileTypes: true }); } catch (e) { return; }
    for (const e of ls) { const p = path.join(d, e.name); if (e.isDirectory() && depth < 1 && !e.name.endsWith('.chunks')) walk(p, depth + 1); else if (/\.(mp4|mov)$/i.test(e.name)) { const s = fs.statSync(p); out.push({ p, name: e.name, mt: s.mtimeMs, size: s.size }); } } };
  walk(MB, 0); walk(path.join(ROOT, 'out', 'fan'), 1);
  return out.sort((a, b) => b.mt - a.mt).slice(0, 40);
}
function memes() {
  const out = []; const walk = (d, rel) => { let ls = []; try { ls = fs.readdirSync(d, { withFileTypes: true }); } catch (e) { return; }
    for (const e of ls) { if (e.name.startsWith('.')) continue; const p = path.join(d, e.name); if (e.isDirectory()) walk(p, rel + e.name + '/'); else out.push({ p, name: rel + e.name, kind: /\.(mp3|wav|m4a)$/i.test(e.name) ? 'sound' : 'media' }); } };
  walk(MEMES, ''); return out;
}
function specs() {
  const out = []; for (const d of [path.join(ROOT, 'out', 'fan'), path.join(ROOT, 'docs', 'mau-edit')]) { try { for (const f of fs.readdirSync(d)) if (f.endsWith('.edit.json')) out.push(path.join(d, f)); } catch (e) {} }
  const pri = p => p.includes(path.join('out', 'fan')) ? 0 : 1;   // spec của tập đang làm (out/fan) lên trước mẫu (docs/mau-edit)
  return out.sort((a, b) => pri(a) - pri(b) || fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
}
function serveFile(req, res, p) {
  if (!okPath(p) || !fs.existsSync(p)) return send(res, 404, 'không có file', 'text/plain');
  const st = fs.statSync(p), type = MIME[path.extname(p).toLowerCase()] || 'application/octet-stream', rg = req.headers.range;
  if (rg) { const m = rg.match(/bytes=(\d*)-(\d*)/); const a = m[1] ? +m[1] : 0, b = m[2] ? +m[2] : st.size - 1;
    res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${a}-${b}/${st.size}`, 'Accept-Ranges': 'bytes', 'Content-Length': b - a + 1 }); fs.createReadStream(p, { start: a, end: b }).pipe(res); return; }
  res.writeHead(200, { 'Content-Type': type, 'Content-Length': st.size, 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-store' }); fs.createReadStream(p).pipe(res);
}
const X = p => p && p.startsWith('~') ? path.join(HOME, p.slice(1)) : (p && !path.isAbsolute(p) ? path.join(ROOT, p) : p);
function run(kind, cmd, argv, env) {
  const log = path.join(SDIR, kind + '-run.log'), fd = fs.openSync(log, 'w');
  const ch = spawn(WIN ? (cmd === 'node' ? process.execPath : cmd) : 'nice', WIN ? argv : ['-n', '10', cmd, ...argv], { cwd: ROOT, detached: true, stdio: ['ignore', fd, fd], env: { ...process.env, ...(env || {}) }, windowsHide: true });
  ch.unref(); return ch.pid;
}

const srv = http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://x'), q = Object.fromEntries(u.searchParams);
  try {
    if (u.pathname === '/') return serveFile(req, res, path.join(__dirname, 'studio.html'));
    if (u.pathname === '/api/status') {
      const o = {}; for (const k of ['film', 'match', 'commenter']) { const j = readJ(path.join(SDIR, k + '.json')); if (j) { j.alive = j.pid ? alive(j.pid) : false; j.hasLive = fs.existsSync(path.join(SDIR, k + '-live.jpg')); } o[k] = j; }
      return send(res, 200, { ...o, procs: procs(), now: Date.now() });
    }
    if (u.pathname === '/api/live') return serveFile(req, res, path.join(SDIR, (q.kind || 'commenter') + '-live.jpg'));
    if (u.pathname === '/api/videos') return send(res, 200, videos());
    if (u.pathname === '/api/memes') return send(res, 200, memes());
    if (u.pathname === '/api/specs') return send(res, 200, specs());
    if (u.pathname === '/file') return serveFile(req, res, X(q.p));
    if (u.pathname === '/api/spec' && req.method === 'GET') return send(res, 200, readJ(X(q.p)) || {});
    if (u.pathname === '/api/spec' && req.method === 'POST') {
      const p = X(q.p); if (!okPath(p) || !p.endsWith('.edit.json')) return send(res, 400, { err: 'đường dẫn spec không hợp lệ' });
      const j = JSON.parse(await body(req)); fs.writeFileSync(p, JSON.stringify(j, null, 1)); return send(res, 200, { ok: true });
    }
    if (u.pathname === '/api/marks') return send(res, 200, readJ(X(q.rec) + '.marks.json') || {});
    if (u.pathname === '/api/frame') {   // 1 khung của bản quay tại giây t (xem trước chỗ chèn) — ffmpeg 1 khung, rất nhẹ
      const p = X(q.p); if (!okPath(p)) return send(res, 400, 'x', 'text/plain');
      const ch = spawn(WIN ? 'ffmpeg' : 'nice', [...(WIN ? [] : ['-n', '10', 'ffmpeg']), '-v', 'error', '-ss', String(+q.t || 0), '-i', p, '-frames:v', '1', '-vf', 'scale=480:-2', '-f', 'image2', '-c:v', 'mjpeg', '-q:v', '5', '-']);
      const bufs = []; ch.stdout.on('data', b => bufs.push(b)); ch.on('close', () => send(res, 200, Buffer.concat(bufs), 'image/jpeg')); return;
    }
    if (u.pathname === '/api/run' && req.method === 'POST') {
      const j = JSON.parse(await body(req));
      const cur = readJ(path.join(SDIR, 'commenter.json')); if (cur && cur.pid && alive(cur.pid) && !/xong|lỗi/.test(cur.phase || '')) return send(res, 409, { err: 'đang có việc commenter chạy (pid ' + cur.pid + ') — dừng trước đã' });
      if (j.job === 'edit') { const sp = X(j.spec); if (!fs.existsSync(sp)) return send(res, 400, { err: 'không thấy spec' }); return send(res, 200, { pid: run('commenter', 'python3', ['tools/x/fan-edit.py', sp]) }); }
      if (j.job === 'render') {
        const a = ['tools/render-fan.js', j.out || 'out/fan/new.mp4', '--fan', j.fan || 'tanphamnhat969', '--max', String(j.max || 200)];
        if (j.foes) a.push('--foes', j.foes); if (j.buff) a.push('--buff', j.buff); if (j.seed) a.push('--seed', String(j.seed)); if (j.bseed) a.push('--bseed', String(j.bseed)); if (j.bsim) a.push('--bsim', String(j.bsim));
        return send(res, 200, { pid: run('commenter', 'node', a, { NODE_PATH }) });
      }
      return send(res, 400, { err: 'job lạ' });
    }
    if (u.pathname === '/api/stop' && req.method === 'POST') {   // chỉ dừng đúng việc do công cụ của mình ghi trong status (không giết tiến trình khác)
      const j = JSON.parse(await body(req)), s = readJ(path.join(SDIR, (j.kind || 'commenter') + '.json'));
      if (!s || !s.pid || !alive(s.pid)) return send(res, 200, { ok: false, msg: 'không có việc đang chạy' });
      try { process.kill(s.pid, 'SIGTERM'); } catch (e) {}
      return send(res, 200, { ok: true });
    }
    send(res, 404, 'không có', 'text/plain');
  } catch (e) { send(res, 500, { err: String(e.message || e) }); }
});
srv.listen(PORT, '127.0.0.1', () => { fs.writeFileSync(PIDF, String(process.pid)); console.log(`🖥️ Studio: http://localhost:${PORT}  (tắt: node tools/x/studio.js --stop)`); });
