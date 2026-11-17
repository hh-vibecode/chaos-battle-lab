// Static file server for local testing (Mac + Windows, no npm deps).
// Run in background:  node tools/x/serve.js [--port 8765]   (Windows: powershell -NoProfile -File tools/node.ps1 tools/x/serve.js)
const http = require('http'), fs = require('fs'), path = require('path');
const args = process.argv.slice(2), opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const ROOT = path.resolve(__dirname, '..', '..'), PORT = +opt('--port', 8765), PIDF = path.join(require('os').tmpdir(), `cbl-serve-${PORT}.pid`);
// node tools/x/serve.js --stop [--port 8765]  -> stop the server started earlier (pid file in the temp dir)
if (args.includes('--stop')) { try { process.kill(+fs.readFileSync(PIDF, 'utf8')); console.log('server stopped'); } catch (e) { console.log('no server running'); } fs.rmSync(PIDF, { force: true }); process.exit(0); }
fs.writeFileSync(PIDF, String(process.pid));
const MIME = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.webp':'image/webp', '.png':'image/png', '.jpg':'image/jpeg', '.gif':'image/gif', '.mp3':'audio/mpeg', '.wav':'audio/wav', '.ogg':'audio/ogg', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.ttf':'font/ttf', '.mp4':'video/mp4' };
http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname); if (p === '/') p = '/index.html';
  const f = path.join(ROOT, path.normalize(p).replace(/^([\\/])+/, ''));
  if (!f.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  fs.stat(f, (err, st) => { if (err || !st.isFile()) { res.writeHead(404); return res.end(); }
    const type = MIME[path.extname(f).toLowerCase()] || 'application/octet-stream', m = /bytes=(\d*)-(\d*)/.exec(req.headers.range || '');
    // (16/11) hỗ trợ Range → trình duyệt TUA được video lớn (video-frames.html nhảy thẳng tới giây cần chụp, không phải phát từ đầu)
    if (m) { const a = m[1] ? +m[1] : Math.max(0, st.size - +m[2]), b = m[1] && m[2] ? Math.min(+m[2], st.size - 1) : st.size - 1;
      if (a >= st.size || a > b) { res.writeHead(416, { 'Content-Range': `bytes */${st.size}` }); return res.end(); }
      res.writeHead(206, { 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Content-Range': `bytes ${a}-${b}/${st.size}`, 'Content-Length': b - a + 1 }); return fs.createReadStream(f, { start: a, end: b }).pipe(res); }
    res.writeHead(200, { 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Content-Length': st.size }); fs.createReadStream(f).pipe(res); });
}).listen(PORT, '127.0.0.1', () => console.log(`listening http://127.0.0.1:${PORT}/ root=${ROOT}`));
