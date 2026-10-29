// 🔬 XEM TRƯỚC VFX — vẽ 1 hiệu ứng lên ảnh nhân vật theo thời gian → BẢNG KHUNG (để Claude soi chuyển động) + MP4 (để anh xem).
// Mac: cần node + playwright (+ ffmpeg nếu xuất mp4). Ảnh ra để ở scratchpad, KHÔNG để trong repo.
//   node tools/vfx-preview.js --img assets/img/cine/CINE_DOGE_BUFF.webp --preset ssj --out /tmp/a.jpg
//   node tools/vfx-preview.js --img ... --preset haki --set '{"speed":2,"rise":0.3}' --frames 12 --dt 0.06 --out a.jpg --mp4 a.mp4 --sec 3
//   node tools/vfx-preview.js --img ... --code my-fx.js --out a.jpg     (hiệu ứng tự viết: file JS định nghĩa window.FX=(g,t,S)=>{...}
//        g = ctx 2D, t = giây, S = {img (ảnh đã cắt sát: src,sx,sy,sw,sh), x,y (giữa CHÂN), w,h (cỡ vẽ), W,H (khung)} — vẽ hiệu ứng + tự gọi S.drawChar() khi muốn nhân vật nằm đè)
//   --compare ssj,ki,haki   → mỗi preset 1 hàng (so nhanh nhiều kiểu)
//   --bg '#3a3046' màu nền · --size 300 chiều cao nhân vật (px)
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..');
const A = process.argv.slice(2), opt = (k, d) => { const i = A.indexOf(k); return i >= 0 ? A[i + 1] : d; };
const IMG = opt('--img', 'assets/img/cine/CINE_DOGE_BUFF.webp'), OUT = path.resolve(opt('--out', 'vfx-preview.jpg')), MP4 = opt('--mp4', null);
const FR = +opt('--frames', 8), DT = +opt('--dt', 0.08), SEC = +opt('--sec', 3), SIZE = +opt('--size', 300), BG = opt('--bg', '#3a3046');
const PRESETS = (opt('--compare', null) || opt('--preset', 'ssj')).split(','), SET = JSON.parse(opt('--set', '{}')), CODE = opt('--code', null);
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg' };
(async () => {
  const srv = http.createServer((q, r) => { const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0]));
    if (q.url === '/' ) { r.writeHead(200, { 'Content-Type': 'text/html' }); r.end('<!doctype html><body style="margin:0"></body>'); return; }
    fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); r.end(d); }); });
  await new Promise(r => srv.listen(0, '127.0.0.1', r)); const PORT = srv.address().port;
  const b = await chromium.launch({ args: ['--enable-gpu', '--use-angle=metal', '--ignore-gpu-blocklist'] }); const p = await b.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto(`http://127.0.0.1:${PORT}/`);
  for (const s of ['js/vfx-gl.js', 'js/cine-kit.js']) await p.addScriptTag({ url: '/' + s + '?v=' + Date.now() });
  if (CODE) await p.addScriptTag({ content: fs.readFileSync(path.resolve(CODE), 'utf8') });
  await p.evaluate(async ({ IMG, SIZE, BG, SET }) => { const im = new Image(); im.src = '/' + IMG; await im.decode(); const c = CineKit.prep(im);
    window.__S = (pad) => { const h = SIZE, w = h * c.sw / c.sh, W = Math.round(Math.max(w * 1.9, h * 1.1)), H = Math.round(h * 1.75);
      return { img: c, x: W / 2, y: H - 12, w, h, W, H }; };
    window.__frame = (pre, t) => { const S = __S(), cv = document.createElement('canvas'); cv.width = S.W; cv.height = S.H; const g = cv.getContext('2d');
      g.fillStyle = BG; g.fillRect(0, 0, S.W, S.H);
      S.drawChar = () => g.drawImage(c.src, c.sx, c.sy, c.sw, c.sh, S.x - S.w / 2, S.y - S.h, S.w, S.h);
      if (window.FX) window.FX(g, t, S); else { VfxGL.drawAura(g, c.src, Object.assign({ preset: pre, sx: c.sx, sy: c.sy, sw: c.sw, sh: c.sh, x: S.x, y: S.y, w: S.w, h: S.h, t }, SET)); S.drawChar(); }
      g.fillStyle = '#ff0'; g.font = 'bold 14px sans-serif'; g.fillText((window.FX ? 'custom' : pre) + '  t=' + t.toFixed(2), 6, 18); return cv; }; }, { IMG, SIZE, BG, SET });
  // bảng khung
  const rows = CODE ? ['custom'] : PRESETS;
  const sheet = await p.evaluate(({ rows, FR, DT }) => { const f0 = __frame(rows[0], 1), W = f0.width, H = f0.height, cv = document.createElement('canvas');
    cv.width = W * FR; cv.height = H * rows.length; const g = cv.getContext('2d');
    rows.forEach((pre, j) => { for (let i = 0; i < FR; i++) g.drawImage(__frame(pre, 1 + i * DT), i * W, j * H); });
    return cv.toDataURL('image/jpeg', 0.88).split(',')[1]; }, { rows, FR, DT });
  fs.writeFileSync(OUT, Buffer.from(sheet, 'base64')); console.log('✅ bảng khung:', OUT);
  // mp4 (hàng đầu tiên)
  if (MP4) { const dir = OUT + '.frames'; fs.mkdirSync(dir, { recursive: true }); const N = Math.round(SEC * 30);
    for (let i = 0; i < N; i++) { const d = await p.evaluate(({ pre, t }) => __frame(pre, t).toDataURL('image/jpeg', 0.92).split(',')[1], { pre: rows[0], t: 1 + i / 30 });
      fs.writeFileSync(path.join(dir, String(i).padStart(4, '0') + '.jpg'), Buffer.from(d, 'base64')); }
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', '30', '-i', path.join(dir, '%04d.jpg'), '-vf', 'pad=ceil(iw/2)*2:ceil(ih/2)*2', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', path.resolve(MP4)]);
    fs.rmSync(dir, { recursive: true, force: true }); console.log('🎞️ mp4:', path.resolve(MP4)); }
  if (errs.length) console.log('⚠️ lỗi trang:', errs.slice(0, 5));
  await b.close(); srv.close();
})();
