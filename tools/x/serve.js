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
  fs.readFile(f, (err, buf) => { if (err) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream' }); res.end(buf); });
}).listen(PORT, '127.0.0.1', () => console.log(`listening http://127.0.0.1:${PORT}/ root=${ROOT}`));
