// 👹 Quay trận BOSS RAID (16 meme vs Evil Gary khổng lồ) ra MP4 16:9 có tiếng — vẽ TỪNG KHUNG theo đồng hồ ảo nên không lag.
//   node tools/render-boss.js out.mp4 [--sec 13] [--tr 1.1]
//   --sec: số giây đánh nhau · --tr: số giây chuyển cảnh cuối (máy zoom vào Evil Gary, nhuốm đỏ rồi tối đen → nối vào phim)
// Tiếng: ghi lại mọi lần game phát/dừng 1 phần tử Audio (tên sample, lúc phát, âm lượng, có lặp không) rồi trộn lại bằng ffmpeg,
// chuẩn hoá -14 LUFS theo SND_LUFS y như trong game. (Tiếng tổng hợp WebAudio của playSound() không ghi được — bỏ qua.)
const { chromium } = require('playwright');
const { spawn, execFileSync } = require('child_process');
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2), OUT = path.resolve(args[0] || 'boss-raid.mp4');
const opt = k => { const i = args.indexOf(k); return i >= 0 ? parseFloat(args[i + 1]) : null; };
const FPS = 30, SUB = 2, SEC = opt('--sec') || 13, TR = opt('--tr') == null ? 1.1 : opt('--tr');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.gif': 'image/gif', '.mp3': 'audio/mpeg', '.ogg': 'audio/ogg', '.wav': 'audio/wav', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.ttf': 'font/ttf' };

(async () => {
  const srv = http.createServer((q, r) => { const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0])).replace(/\/$/, '/index.html');
    fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); r.end(d); }); });
  await new Promise(r => srv.listen(0, '127.0.0.1', r)); const PORT = srv.address().port;
  const br = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
  const pg = await br.newPage({ viewport: { width: 1920, height: 1080 } });
  pg.on('pageerror', e => console.log('⚠️', e.message.slice(0, 160)));
  await pg.goto(`http://127.0.0.1:${PORT}/`);
  await pg.waitForFunction(() => !document.getElementById('bootScreen'), null, { timeout: 300000 });
  // ⏱️ đồng hồ ảo: requestAnimationFrame do mình gọi từng nhịp, performance.now chạy theo giờ ảo · 🔊 ghi sổ mọi lần phát/dừng Audio (tắt tiếng thật)
  await pg.evaluate(() => {
    const rev = {}; for (const k in AUDIO_SAMPLES) { try { rev[new URL(AUDIO_SAMPLES[k].src, location.href).pathname] = k; } catch (e) {} }
    window.__aud = []; window.__vt = 0; let id = 0;
    const P = HTMLMediaElement.prototype, op = P.play, opa = P.pause;
    P.play = function () { try { if (!this.__id) this.__id = ++id; const p = new URL(this.currentSrc || this.src, location.href).pathname; __aud.push({ id: this.__id, ev: 'play', t: __vt, path: p, key: rev[p] || null, vol: this.volume, loop: !!this.loop, ct: this.currentTime || 0 }); } catch (e) {} this.muted = true; return op.call(this); };
    P.pause = function () { try { if (this.__id) __aud.push({ id: this.__id, ev: 'pause', t: __vt }); } catch (e) {} return opa.call(this); };
    const t0 = performance.now(); performance.now = () => t0 + __vt * 1000;
    window.__raf = new Map(); let rid = 0;
    window.requestAnimationFrame = cb => { __raf.set(++rid, cb); return rid; };
    window.cancelAnimationFrame = i => { __raf.delete(i); };
  });
  await pg.evaluate(() => playBossWar({ offline: true }));
  await pg.waitForFunction(() => fighters.length >= 17, null, { timeout: 120000 });
  await pg.evaluate(() => { __vt = 0; __aud.length = 0; });
  await pg.waitForFunction(() => [...document.images].every(i => i.complete), null, { timeout: 60000 }).catch(() => {});
  const N = Math.round((SEC + TR) * FPS), NT = Math.round(TR * FPS), tmpV = OUT + '.video.mp4';
  console.log(`👹 Boss Raid · ${SEC}s đánh + ${TR}s chuyển cảnh · ${N} khung`);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-s', '1920x1080', tmpV], { stdio: ['pipe', 'inherit', 'inherit'] });
  const t0 = Date.now();
  for (let i = 0; i < N; i++) {
    const tr = i >= N - NT ? (i - (N - NT) + 1) / NT : 0;   // 0..1 trong đoạn chuyển cảnh
    const b64 = await pg.evaluate(({ SUB, FPS, tr }) => {
      if (tr <= 0) for (let s = 0; s < SUB; s++) { const q = [...__raf.values()]; __raf.clear(); __vt += 1 / (FPS * SUB); for (const cb of q) cb(performance.now()); }   // chuyển cảnh: đóng băng trận
      const c = document.getElementById('arena'), o = window.__oc || (window.__oc = document.createElement('canvas')); o.width = 1920; o.height = 1080; const x = o.getContext('2d');
      if (tr <= 0) { x.drawImage(c, 0, 0, 1920, 1080); }
      else {   // 🎬 máy zoom thẳng vào Evil Gary, khung nhuốm đỏ rồi tối đen → nối sang cảnh mở đầu phim
        if (!window.__fr) { window.__fr = document.createElement('canvas'); __fr.width = 1920; __fr.height = 1080; __fr.getContext('2d').drawImage(c, 0, 0, 1920, 1080); const b = fighters.find(f => f._isBoss); window.__bp = b ? [b.x / W * 1920, b.y / H * 1080] : [960, 540]; }
        const e = tr * tr * (3 - 2 * tr), z = 1 + 2.6 * e, [bx, by] = __bp;
        x.fillStyle = '#000'; x.fillRect(0, 0, 1920, 1080); x.save(); x.translate(960, 540); x.scale(z, z); x.translate(-(960 + (bx - 960) * e), -(540 + (by - 540) * e)); x.drawImage(__fr, 0, 0); x.restore();
        x.fillStyle = `rgba(150,0,10,${0.55 * Math.min(1, tr * 1.6)})`; x.fillRect(0, 0, 1920, 1080);
        x.fillStyle = `rgba(0,0,0,${Math.max(0, (tr - 0.45) / 0.55)})`; x.fillRect(0, 0, 1920, 1080); }
      return o.toDataURL('image/jpeg', 0.93).split(',')[1]; }, { SUB, FPS, tr });
    if (!ff.stdin.write(Buffer.from(b64, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 60 === 0) console.log(`  khung ${i}/${N} · ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
  const info = await pg.evaluate(() => ({ aud: __aud, lufs: SND_LUFS }));
  await br.close(); srv.close();
  // 🔊 trộn tiếng: mỗi lần phát = 1 đầu vào, cắt tới lúc bị dừng (hoặc hết đoạn đánh), chuẩn hoá LUFS, tắt dần lúc chuyển cảnh
  const END = SEC, ev = new Map();
  for (const a of info.aud) { if (a.ev === 'play') ev.set(a.id + ':' + a.t, { ...a, end: END }); else for (const [k, v] of ev) if (v.id === a.id && v.end === END && a.t >= v.t) { v.end = a.t; } }
  const lufsGain = k => { const m = k && info.lufs[k]; if (!m) return 1; return Math.max(0.05, Math.min(8, Math.pow(10, (-14 - m[0]) / 20))); };
  const inputs = [], filters = []; let n = 0;
  for (const a of ev.values()) { const len = Math.min(a.end, END) - a.t; if (len <= 0.02 || a.t >= END) continue; const f = path.join(ROOT, a.path); if (!fs.existsSync(f)) continue;
    inputs.push(...(a.loop ? ['-stream_loop', '-1'] : []), '-i', f);
    filters.push(`[${n + 1}:a]atrim=${a.ct.toFixed(3)}:${(a.ct + len).toFixed(3)},asetpts=PTS-STARTPTS,volume=${(a.vol * lufsGain(a.key) * 0.8).toFixed(3)},adelay=${Math.round(a.t * 1000)}|${Math.round(a.t * 1000)},aformat=channel_layouts=stereo[a${n}]`); n++;
    if (n >= 220) break; }
  if (n) { const mix = filters.join(';') + ';' + [...Array(n).keys()].map(i => `[a${i}]`).join('') + `amix=inputs=${n}:normalize=0:dropout_transition=0,alimiter=limit=0.95,afade=t=out:st=${(SEC - 0.2).toFixed(2)}:d=${(TR * 0.8).toFixed(2)},apad,atrim=0:${(SEC + TR).toFixed(3)}[out]`;
    const tmpF = OUT + '.filter.txt'; fs.writeFileSync(tmpF, mix);
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', tmpV, ...inputs, '-filter_complex_script', tmpF, '-map', '0:v', '-map', '[out]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', OUT], { stdio: 'inherit' });
    fs.unlinkSync(tmpF); fs.unlinkSync(tmpV); }
  else fs.renameSync(tmpV, OUT);
  console.log(`✅ ${OUT}  (${n} tiếng · ${((Date.now() - t0) / 1000).toFixed(0)}s)`);
})();
