// 🎥 Quay 1 trận Solo 1vs1 ra MP4 dọc 9:16 có tiếng — y như tự quay màn hình (khung 9:16 + dòng info trong khung),
//   nhưng vẽ TỪNG KHUNG theo đồng hồ ảo nên không bao giờ giật/lag. 1 luồng duy nhất (không chạy song song), có GPU.
//   node tools/render-match.js out.mp4 --a friend --b evilgary [--fps 60] [--w 1440] [--seed N]
//        [--win a|b] [--close 0.25] [--tries 12]
//   --sim 10: chỉ CHẠY THỬ 10 trận (không quay), in kết quả từng seed để chọn → quay lại bằng --seed N
//   MẶC ĐỊNH (chỉ --a --b): chạy thử 10 trận, lấy trận SÁT SAO NHẤT (con thắng còn ít máu nhất) rồi quay ở 2K 9:16 60fps.
//   --best N: đổi số trận chạy thử · --random: bỏ chạy thử, quay luôn 1 trận ngẫu nhiên.
//   Có --win / --close: chạy THỬ nhanh (độ phân giải thấp, không quay) từng seed tới khi ra trận đúng ý
//   (--win a = bên trái thắng · --close 0.25 = con thắng còn ≤25% máu, thắng sát nút) rồi mới quay đúng trận đó ở 2K.
// Tiếng: ghi lại mọi lần game phát/dừng Audio rồi trộn bằng tools/mix-plan.py theo SND_LUFS (tiếng tổng hợp WebAudio nhỏ thì không ghi được).
const { chromium } = require('playwright');
const { spawn, execFileSync } = require('child_process');
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2), OUT = path.resolve(args[0] || 'match.mp4');
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const A = opt('--a'), B = opt('--b'), FPS = +opt('--fps', 60), VW = +opt('--w', 1440), VH = Math.round(VW * 16 / 9);
const WIN = opt('--win', null), CLOSE = opt('--close', null) == null ? null : +opt('--close'), TRIES = +opt('--tries', 12), MAXSEC = +opt('--max', 240);
const SIM = +opt('--sim', 0), SIMW = +opt('--simw', 360), BEST = +opt('--best', 10), RANDOM = args.includes('--random');
let SEED = opt('--seed', null) == null ? null : +opt('--seed');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.gif': 'image/gif', '.mp3': 'audio/mpeg', '.ogg': 'audio/ogg', '.wav': 'audio/wav', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.ttf': 'font/ttf' };
const GPU = ['--autoplay-policy=no-user-gesture-required', '--enable-gpu', '--use-angle=metal', '--ignore-gpu-blocklist'];

// mở trang, dựng màn trận như bấm tay (chọn 2 meme → vào màn chờ → START), cài đồng hồ ảo + random có seed
async function openMatch(br, PORT, seed, cw) {
  const css = 559, dpr = cw / css;   // khung 9:16 trên màn 1920×1080 rộng ~559px CSS → dpr cho ra đúng cw pixel
  const pg = await br.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: dpr });
  pg.on('pageerror', e => console.log('⚠️', e.message.slice(0, 160)));
  await pg.goto(`http://127.0.0.1:${PORT}/`);
  await pg.waitForFunction(() => !document.getElementById('bootScreen'), null, { timeout: 300000 });
  await pg.evaluate(({ A, B, cw }) => { const n = k => roster.findIndex(c => c.charKey === k);
    if (n(A) < 0 || n(B) < 0) throw new Error('không thấy nhân vật ' + A + ' / ' + B);
    ARENA_NORMAL.ss = (cw + 0.4) / (ARENA_NORMAL.w * (1 + 30 / 480));   // canvas cam-mode Solo rộng đúng cw pixel
    picks = [n(A), n(B)];
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active')); document.getElementById('selectScreen').classList.add('active');
    goToBattle(); }, { A, B, cw });
  await pg.waitForTimeout(1500);
  await pg.evaluate(() => document.fonts.ready);
  await pg.waitForFunction(() => [...document.images].every(i => i.complete), null, { timeout: 60000 }).catch(() => {});
  await pg.evaluate(seed => {
    let s = seed >>> 0; Math.random = () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    window.__vt = 0; const p0 = performance.now(), d0 = Date.now(); performance.now = () => p0 + __vt * 1000; Date.now = () => d0 + Math.round(__vt * 1000);
    window.__raf = new Map(); let rid = 0; window.requestAnimationFrame = cb => { __raf.set(++rid, cb); return rid; }; window.cancelAnimationFrame = i => { __raf.delete(i); };
    window.__tm = []; let tid = 1e6;
    window.setTimeout = (fn, ms, ...a) => { const id = ++tid; __tm.push({ id, at: __vt + (+ms || 0) / 1000, fn, a }); return id; };
    window.setInterval = (fn, ms, ...a) => { const id = ++tid; __tm.push({ id, at: __vt + Math.max(16, +ms || 0) / 1000, fn, a, rep: Math.max(16, +ms || 0) / 1000 }); return id; };
    window.clearTimeout = window.clearInterval = id => { const i = __tm.findIndex(t => t.id === id); if (i >= 0) __tm.splice(i, 1); };
    const rev = {}; for (const k in AUDIO_SAMPLES) { try { rev[new URL(AUDIO_SAMPLES[k].src, location.href).pathname] = k; } catch (e) {} }
    window.__aud = []; let aid = 0, nextLoud = 1; const P = HTMLMediaElement.prototype, op = P.play, opa = P.pause;
    const _ps = playSample; playSample = function (key, volume = 1) { nextLoud = volume > 1 ? volume : ((typeof _LOUD !== 'undefined' && _LOUD[key]) || 1); try { return _ps.apply(this, arguments); } finally { nextLoud = 1; } };
    P.play = function () { try { if (!this.__id) this.__id = ++aid; const p = new URL(this.currentSrc || this.src, location.href).pathname, k = rev[p] || null;
      let mus = false; try { mus = _sndMusicPlaying(); } catch (e) {}
      __aud.push({ id: this.__id, ev: 'play', t: __vt, path: p, key: k, vol: this.volume, rate: this.playbackRate || 1, loop: !!this.loop, ct: this.currentTime || 0, loud: nextLoud, duck: mus ? SND_SFX_DUCK : 1 }); } catch (e) {}
      this.muted = true; return op.call(this); };
    P.pause = function () { try { if (this.__id) __aud.push({ id: this.__id, ev: 'pause', t: __vt }); } catch (e) {} return opa.call(this); };
    startGame('instant');   // = bấm ▶ START
  }, seed);
  await pg.waitForFunction(() => fighters.length >= 2 && __raf.size > 0, null, { timeout: 60000 });
  return pg;
}
const TAIL = +opt('--tail', 10);   // quay thêm tối đa bao nhiêu giây sau khi hạ địch (cảnh thắng của Friend/Evil Gary... chạy mãi không tự dừng)
const STEP = ({ n, FPS, stopAt }) => {
  for (let k = 0; k < n; k++) {
    __tm.sort((a, b) => a.at - b.at || a.id - b.id);
    while (__tm.length && __tm[0].at <= __vt) { const t = __tm.shift(); if (t.rep) __tm.push({ ...t, at: t.at + t.rep }); try { t.fn(...t.a); } catch (e) {} }
    const q = [...__raf.values()]; __raf.clear(); for (const cb of q) cb(performance.now());
    __vt += 1 / FPS;
    if (!__raf.size || (loop._koTimer || 0) >= stopAt) return true;
  }
  return false;
};
const RESULT = () => ({ t: __vt, win: koWinner ? (koWinner.slotIdx === 0 ? 'a' : 'b') : null, over: !!loop._koTimer,
  hp: fighters.map(f => [f.type, Math.max(0, Math.round(f.hp)), f.maxHp]) });
const fmt = r => `${r.win ? (r.win === 'a' ? A : B) + ' thắng' : 'hoà/chưa xong'} lúc ${r.t.toFixed(1)}s · ${r.hp.map(h => h[0] + ' ' + h[1] + '/' + h[2]).join(' · ')}`;
const ok = r => (!WIN || r.win === WIN) && (CLOSE == null || (r.win && (() => { const h = r.hp[r.win === 'a' ? 0 : 1]; return h[1] > 0 && h[1] / h[2] <= CLOSE; })()));

(async () => {
  const srv = http.createServer((q, r) => { const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0])).replace(/\/$/, '/index.html');
    fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); r.end(d); }); });
  await new Promise(r => srv.listen(0, '127.0.0.1', r)); const PORT = srv.address().port;
  const br = await chromium.launch({ args: GPU });
  const T0 = Date.now();
  // 🧪 chỉ chạy thử N trận, in kết quả (không quay)
  if (SIM) { const rows = [];
    for (let k = 0; k < SIM; k++) { const sd = SEED != null ? SEED + k : ((Date.now() + k * 7919) >>> 0), pg = await openMatch(br, PORT, sd, SIMW);
      while (!(await pg.evaluate(STEP, { n: 240, FPS, stopAt: 14 })) && (await pg.evaluate(() => __vt)) < MAXSEC) {}
      const r = await pg.evaluate(RESULT); await pg.close(); rows.push({ sd, r });
      console.log(`  #${k + 1} seed ${sd}: ${fmt(r)}`); }
    fs.writeFileSync(OUT + '.sim.json', JSON.stringify(rows));
    console.log(`✅ chạy thử xong ${SIM} trận · ${((Date.now() - T0) / 1000).toFixed(0)}s`); await br.close(); srv.close(); return; }
  // 🔎 dò trước kết quả (chỉ khi có yêu cầu thắng/thua) — chạy nhanh ở độ phân giải thấp, KHÔNG quay
  if (SEED == null && (WIN || CLOSE != null)) {
    for (let k = 0; k < TRIES && SEED == null; k++) {
      const sd = (Date.now() + k * 7919) >>> 0, pg = await openMatch(br, PORT, sd, 360);
      while (!(await pg.evaluate(STEP, { n: 240, FPS, stopAt: 14 })) && (await pg.evaluate(() => __vt)) < MAXSEC) {}
      const r = await pg.evaluate(RESULT); await pg.close();
      console.log(`  thử seed ${sd}: ${fmt(r)}${ok(r) ? '  ✔' : ''}`);
      if (ok(r)) SEED = sd;
    }
    if (SEED == null) { console.log(`❌ ${TRIES} lần thử chưa ra trận đúng ý`); await br.close(); srv.close(); process.exit(1); }
  }
  // 🏆 mặc định: chạy thử BEST trận, lấy trận sát sao nhất (con thắng còn ÍT máu nhất, phải có người thắng)
  if (SEED == null && !RANDOM && BEST > 0) { let best = null;
    for (let k = 0; k < BEST; k++) { const sd = (Date.now() + k * 7919) >>> 0, pg = await openMatch(br, PORT, sd, SIMW);
      while (!(await pg.evaluate(STEP, { n: 240, FPS, stopAt: 14 })) && (await pg.evaluate(() => __vt)) < MAXSEC) {}
      const r = await pg.evaluate(RESULT); await pg.close();
      const h = r.win ? r.hp[r.win === 'a' ? 0 : 1] : null, k2 = h && h[1] > 0 ? h[1] / h[2] : null;
      console.log(`  thử #${k + 1} seed ${sd}: ${fmt(r)}`);
      if (k2 != null && (!best || k2 < best.k)) best = { sd, k: k2, r }; }
    if (best) { SEED = best.sd; console.log(`🏆 trận sát sao nhất: seed ${SEED} · ${fmt(best.r)}`); } }
  if (SEED == null) SEED = (Date.now() ^ (Math.random() * 1e9)) >>> 0;
  // 🎥 quay thật ở 2K
  console.log(`🎬 quay seed ${SEED} · ${VW}x${VH} @${FPS}fps`);
  const pg = await openMatch(br, PORT, SEED, VW);
  const cdp = await pg.context().newCDPSession(pg);
  const rc = await pg.evaluate(() => { const r = document.getElementById('arena').getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
  const tmpV = OUT + '.video.mp4';
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-vf', `scale=${VW}:${VH}:flags=lanczos`, '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', '-r', String(FPS), tmpV], { stdio: ['pipe', 'inherit', 'inherit'] });
  let i = 0, hold = 0;
  for (;;) {
    const fin = await pg.evaluate(STEP, { n: 1, FPS, stopAt: Math.round(TAIL * FPS) });
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 93, clip: { ...rc, scale: 1 }, optimizeForSpeed: true });
    if (!ff.stdin.write(Buffer.from(data, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    if (++i % 600 === 0) console.log(`  ${(i / FPS).toFixed(0)}s video · ${((Date.now() - T0) / 1000).toFixed(0)}s`);
    if (fin && ++hold > FPS * 0.6) break;   // trận dừng hẳn (zoom con thắng xong) → giữ khung cuối 0.6s
    if (i > MAXSEC * FPS) break;
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
  const res = await pg.evaluate(RESULT), info = await pg.evaluate(() => ({ aud: __aud, lufs: SND_LUFS, music: [...SND_MUSIC] }));
  await br.close(); srv.close();
  console.log(`  kết quả: ${fmt(res)}`); if ((WIN || CLOSE != null) && !ok(res)) console.log('⚠️ trận quay ra KHÁC lúc chạy thử!');
  // 🔊 trộn tiếng
  const END = i / FPS, ev = new Map();
  for (const a of info.aud) { if (a.ev === 'play') ev.set(a.id + ':' + a.t, { ...a, end: END }); else for (const [, v] of ev) if (v.id === a.id && v.end === END && a.t >= v.t) v.end = a.t; }
  const music = new Set(info.music), plan = [];
  for (const a of ev.values()) { const m = a.key && info.lufs[a.key]; let g = m ? Math.max(0.05, Math.min(8, Math.pow(10, (-14 - m[0]) / 20))) : 1;
    g *= music.has(a.key) ? 1 : a.vol * a.loud * a.duck;
    const f = path.join(ROOT, a.path); if (!fs.existsSync(f) || a.end - a.t <= 0.02) continue;
    plan.push({ f, t: a.t, end: a.end, ct: a.ct, loop: a.loop, rate: music.has(a.key) ? 1 : a.rate, g: g * 0.8 }); }
  const planF = OUT + '.plan.json', wav = OUT + '.mix.wav'; fs.writeFileSync(planF, JSON.stringify({ dur: END, plan }));
  execFileSync('python3', [path.join(__dirname, 'mix-plan.py'), planF, wav], { stdio: 'inherit' });
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', tmpV, '-i', wav, '-filter_complex', '[1:a]alimiter=limit=0.95[a]', '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', OUT], { stdio: 'inherit' });
  fs.unlinkSync(planF); fs.unlinkSync(wav); fs.unlinkSync(tmpV);
  console.log(`✅ ${OUT}  (seed ${SEED} · ${END.toFixed(1)}s · ${plan.length} tiếng · mất ${((Date.now() - T0) / 1000).toFixed(0)}s)`);
})();
