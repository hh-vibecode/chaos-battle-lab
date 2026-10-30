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
const WANT = +opt('--want', 5), MIN = +opt('--min', 0);   // --min: chạy thử ÍT NHẤT bấy nhiêu trận rồi mới chọn   // --win/--close: gom đủ bấy nhiêu trận đúng ý rồi chọn trận sát nhất
const FAR = +opt('--far', 0);   // --far N: trận phải có ≥N lần hố đen (The Void) nuốt đạn đã bay XA (thấy rõ đường đạn bị nuốt — anh dặn 30/10)
const WIN = opt('--win', null), CLOSE = opt('--close', null) == null ? null : +opt('--close'), TRIES = +opt('--tries', 12), MAXSEC = +opt('--max', 240);
const SIM = +opt('--sim', 0), SIMW = +opt('--simw', 360), BEST = +opt('--best', 10), RANDOM = args.includes('--random');
let SEED = opt('--seed', null) == null ? null : +opt('--seed');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.gif': 'image/gif', '.mp3': 'audio/mpeg', '.ogg': 'audio/ogg', '.wav': 'audio/wav', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.ttf': 'font/ttf' };
const GPU = ['--autoplay-policy=no-user-gesture-required', '--enable-gpu', '--use-angle=metal', '--ignore-gpu-blocklist'];

// mở trang, dựng màn trận như bấm tay (chọn 2 meme → vào màn chờ → START), cài đồng hồ ảo + random có seed
// ⏱️ độ dài THẬT của mọi file tiếng (ffprobe, lưu cache) — để tiếng trong trang chạy theo đồng hồ ảo, hết bài đúng lúc
function audioDurations() {
  const cf = path.join(__dirname, '.audio-dur.json'); let c = {}; try { c = JSON.parse(fs.readFileSync(cf, 'utf8')); } catch (e) {}
  const dir = path.join(ROOT, 'assets/audio'), out = {}; let dirty = false;
  for (const f of fs.readdirSync(dir)) { if (!/\.(mp3|ogg|wav)$/.test(f)) continue; const fp = path.join(dir, f), m = fs.statSync(fp).mtimeMs, k = 'assets/audio/' + f;
    if (!c[k] || c[k].m !== m) { let d = 0; try { d = +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', fp]).toString().trim(); } catch (e) {} c[k] = { m, d }; dirty = true; }
    out['/' + k] = c[k].d; }
  if (dirty) fs.writeFileSync(cf, JSON.stringify(c)); return out;
}
let DURS = null;
async function openMatch(br, PORT, seed, cw) {
  if (!DURS) DURS = audioDurations();
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
  await pg.waitForLoadState('networkidle').catch(() => {});   // ảnh/tiếng tải lười của 2 meme phải về HẾT trước khi bấm START (tải muộn giữa trận làm trận chạy lệch so với lúc thử)
  await pg.waitForTimeout(500);
  await pg.evaluate(() => document.fonts.ready);
  await pg.waitForFunction(() => [...document.images].every(i => i.complete), null, { timeout: 60000 }).catch(() => {});
  await pg.evaluate(async ({ DURS }) => {   // 🎼 giải mã sẵn nhạc của 4 con nhạc (Mosquito/Piano/Guitar/Bongo) để máy dò nhịp đọc được phổ theo đồng hồ ảo
    window.__DURS = DURS; window.__pcm = {};
    const MUS = new Set(['mosquitoviolin', 'pianocat', 'electricguitarcat', 'bongocat']);
    if (picks.some(i => MUS.has(roster[i] && roster[i].charKey))) { const keys = [...MOSQUITO_SONGS, ...PIANO_SONGS, ...GUITAR_SONGS, ...BONGO_SONGS];
      for (const k of keys) { const a = AUDIO_SAMPLES[k]; if (!a) continue; const u = new URL(a.src, location.href).pathname; try { const buf = await (await fetch(u)).arrayBuffer(); const ab = await AC.decodeAudioData(buf); const d = new Float32Array(ab.length); for (let c = 0; c < ab.numberOfChannels; c++) { const x = ab.getChannelData(c); for (let i = 0; i < d.length; i++) d[i] += x[i] / ab.numberOfChannels; } __pcm[u] = { d, sr: ab.sampleRate }; } catch (e) {} } }
  }, { DURS });
  await pg.evaluate(seed => {
    let s = seed >>> 0; Math.random = () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    window.__vt = 0; const p0 = performance.now(), d0 = Date.now(); performance.now = () => p0 + __vt * 1000; Date.now = () => d0 + Math.round(__vt * 1000);
    window.__raf = new Map(); let rid = 0; window.requestAnimationFrame = cb => { __raf.set(++rid, cb); return rid; }; window.cancelAnimationFrame = i => { __raf.delete(i); };
    window.__tm = []; let tid = 1e6;
    window.setTimeout = (fn, ms, ...a) => { const id = ++tid; __tm.push({ id, at: __vt + (+ms || 0) / 1000, fn, a }); return id; };
    window.setInterval = (fn, ms, ...a) => { const id = ++tid; __tm.push({ id, at: __vt + Math.max(16, +ms || 0) / 1000, fn, a, rep: Math.max(16, +ms || 0) / 1000 }); return id; };
    window.clearTimeout = window.clearInterval = id => { const i = __tm.findIndex(t => t.id === id); if (i >= 0) __tm.splice(i, 1); };
    const rev = {}; for (const k in AUDIO_SAMPLES) { try { rev[new URL(AUDIO_SAMPLES[k].src, location.href).pathname] = k; } catch (e) {} }
    // 🎵 TIẾNG CHẠY THEO ĐỒNG HỒ ẢO: không phát thật (giờ thật chạy nhanh hơn hình ~4× → bài hết sớm, bài sau chồng lên).
    //    Vị trí phát / paused / ended / currentTime đều tính theo __vt; hết bài thì tự bắn sự kiện 'ended' đúng lúc (xem STEP).
    window.__aud = []; window.__vplay = new Set(); let aid = 0, nextLoud = 1; const P = HTMLMediaElement.prototype;
    const pathOf = el => { try { return new URL(el.currentSrc || el.src, location.href).pathname; } catch (e) { return ''; } };
    const durOf = el => { const d = __DURS[pathOf(el)]; return d > 0 ? d : (isFinite(el.duration) ? el.duration : 0); };
    const CT = Object.getOwnPropertyDescriptor(P, 'currentTime'), PA = Object.getOwnPropertyDescriptor(P, 'paused'), EN = Object.getOwnPropertyDescriptor(P, 'ended');
    window.__vpos = el => { const v = el.__v; if (!v) return CT.get.call(el); if (!v.on) return v.p0; let p = v.p0 + (__vt - v.t0) * (el.playbackRate || 1); const d = durOf(el); if (el.loop && d > 0) p %= d; else if (d > 0) p = Math.min(p, d); return p; };
    Object.defineProperty(P, 'currentTime', { configurable: true, get() { return __vpos(this); }, set(x) { if (this.__v) { this.__v.p0 = +x || 0; this.__v.t0 = __vt; this.__v.end = false; } else { try { CT.set.call(this, x); } catch (e) {} } } });
    Object.defineProperty(P, 'paused', { configurable: true, get() { return this.__v ? !this.__v.on : PA.get.call(this); } });
    Object.defineProperty(P, 'ended', { configurable: true, get() { return this.__v ? !!this.__v.end : EN.get.call(this); } });
    const _ps = playSample; playSample = function (key, volume = 1) { nextLoud = volume > 1 ? volume : ((typeof _LOUD !== 'undefined' && _LOUD[key]) || 1); try { return _ps.apply(this, arguments); } finally { nextLoud = 1; } };
    P.play = function () { try { if (!this.__id) this.__id = ++aid; const p = pathOf(this), k = rev[p] || null;
      const p0 = this.__v ? (this.__v.end ? 0 : __vpos(this)) : (CT.get.call(this) || 0);
      this.__v = { on: true, p0, t0: __vt, end: false }; __vplay.add(this);
      let mus = false; try { mus = _sndMusicPlaying(); } catch (e) {}
      __aud.push({ id: this.__id, ev: 'play', t: __vt, path: p, key: k, vol: this.volume, rate: this.playbackRate || 1, loop: !!this.loop, ct: p0, loud: nextLoud, duck: mus ? SND_SFX_DUCK : 1 }); } catch (e) {}
      return Promise.resolve(); };
    P.pause = function () { try { if (this.__v && this.__v.on) { this.__v.p0 = __vpos(this); this.__v.on = false; __vplay.delete(this); __aud.push({ id: this.__id, ev: 'pause', t: __vt }); } } catch (e) {} };
    window.__vEnded = () => { for (const el of [...__vplay]) { const v = el.__v; if (!v || !v.on || el.loop) continue; const d = durOf(el); if (d > 0 && __vpos(el) >= d - 1e-6) { v.p0 = d; v.on = false; v.end = true; __vplay.delete(el); __aud.push({ id: el.__id, ev: 'pause', t: __vt }); try { el.dispatchEvent(new Event('ended')); } catch (e) {} } } };
    // 🎼 máy dò nhịp (AnalyserNode) của 4 con nhạc: tính phổ THẲNG từ file nhạc đã giải mã, đúng vị trí ảo đang phát
    const oCM = AudioContext.prototype.createMediaElementSource; AudioContext.prototype.createMediaElementSource = function (el) { const n = oCM.call(this, el); n.__el = el; return n; };
    const oCo = AudioNode.prototype.connect; AudioNode.prototype.connect = function (d, ...r) { if (this.__el && d instanceof AnalyserNode) d.__el = this.__el; return oCo.call(this, d, ...r); };
    const fftRe = n => { const re = new Float64Array(n), im = new Float64Array(n); return { re, im }; };
    function fft(re, im) { const n = re.length; for (let i = 1, j = 0; i < n; i++) { let b = n >> 1; for (; j & b; b >>= 1) j ^= b; j ^= b; if (i < j) { [re[i], re[j]] = [re[j], re[i]]; [im[i], im[j]] = [im[j], im[i]]; } }
      for (let len = 2; len <= n; len <<= 1) { const a = -2 * Math.PI / len, wr = Math.cos(a), wi = Math.sin(a); for (let i = 0; i < n; i += len) { let cr = 1, ci = 0; for (let k = 0; k < len / 2; k++) { const ur = re[i + k], ui = im[i + k], xr = re[i + k + len / 2] * cr - im[i + k + len / 2] * ci, xi = re[i + k + len / 2] * ci + im[i + k + len / 2] * cr; re[i + k] = ur + xr; im[i + k] = ui + xi; re[i + k + len / 2] = ur - xr; im[i + k + len / 2] = ui - xi; const t = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = t; } } } }
    AnalyserNode.prototype.getByteFrequencyData = function (arr) { const el = this.__el, pcm = el && __pcm[pathOf(el)]; if (!pcm || !el.__v || !el.__v.on) { arr.fill(0); return; }
      const N = this.fftSize, sr = pcm.sr, end = Math.floor(__vpos(el) * sr), { re, im } = this.__f || (this.__f = fftRe(N)), sm = this.__sm || (this.__sm = new Float64Array(N / 2)), g = el.volume;
      for (let i = 0; i < N; i++) { const k = end - N + i, w = 0.42 - 0.5 * Math.cos(2 * Math.PI * i / N) + 0.08 * Math.cos(4 * Math.PI * i / N); re[i] = (k >= 0 && k < pcm.d.length ? pcm.d[k] * g : 0) * w; im[i] = 0; }
      fft(re, im); const tau = this.smoothingTimeConstant, mn = this.minDecibels, mx = this.maxDecibels;
      for (let i = 0; i < arr.length && i < N / 2; i++) { const mag = Math.hypot(re[i], im[i]) / N; sm[i] = tau * sm[i] + (1 - tau) * mag; const db = 20 * Math.log10(sm[i] || 1e-12); arr[i] = Math.max(0, Math.min(255, Math.round(255 * (db - mn) / (mx - mn)))); } };
    startGame('instant');   // = bấm ▶ START
  }, seed);
  await pg.waitForFunction(() => fighters.length >= 2 && __raf.size > 0, null, { timeout: 60000 });
  return pg;
}
const TAIL = +opt('--tail', 10);   // quay thêm tối đa bao nhiêu giây sau khi hạ địch (cảnh thắng của Friend/Evil Gary... chạy mãi không tự dừng)
// ⚡ TĂNG TỐC (thêm 28/10/2026):
//   --par N : chạy thử N trận CÙNG LÚC (mỗi trận 1 tab riêng, seed + đồng hồ ảo riêng → kết quả y hệt chạy lần lượt). Mặc định 1 = như cũ.
//   --hw    : (chỉ macOS) nén video bằng chip phần cứng VideoToolbox thay libx264 — nhanh hơn nhiều, file to hơn chút.
//   --preset: preset libx264 khi không dùng --hw (mặc định medium; 'fast'/'veryfast' nhanh hơn, chất lượng giảm nhẹ).
const PAR = Math.max(1, +opt('--par', 1)), HW = args.includes('--hw') && process.platform === 'darwin', PRESET = opt('--preset', 'medium');
const VENC = HW ? ['-c:v', 'h264_videotoolbox', '-b:v', '25M', '-maxrate', '35M', '-bufsize', '50M', '-allow_sw', '1'] : ['-c:v', 'libx264', '-preset', PRESET, '-crf', '17'];
const STEP = ({ n, FPS, stopAt }) => {
  for (let k = 0; k < n; k++) {
    __vEnded();
    __tm.sort((a, b) => a.at - b.at || a.id - b.id);
    while (__tm.length && __tm[0].at <= __vt) { const t = __tm.shift(); if (t.rep) __tm.push({ ...t, at: t.at + t.rep }); try { t.fn(...t.a); } catch (e) {} }
    const q = [...__raf.values()]; __raf.clear(); for (const cb of q) cb(performance.now());
    __vt += 1 / FPS;
    if (!__raf.size || (loop._koTimer || 0) >= stopAt) return true;
  }
  return false;
};
const RESULT = () => ({ t: __vt, win: koWinner ? (koWinner.slotIdx === 0 ? 'a' : 'b') : null, over: !!loop._koTimer,
  hp: fighters.map(f => [f.type, Math.max(0, Math.round(f.hp)), f.maxHp]), far: typeof bhFarEat !== 'undefined' ? bhFarEat : 0 });
const fmt = r => `${r.win ? (r.win === 'a' ? A : B) + ' thắng' : 'hoà/chưa xong'} lúc ${r.t.toFixed(1)}s · ${r.hp.map(h => h[0] + ' ' + h[1] + '/' + h[2]).join(' · ')}${FAR ? ' · nuốt đạn xa ' + (r.far || 0) : ''}`;
const ok = r => (!WIN || r.win === WIN) && (r.far || 0) >= FAR && (CLOSE == null || (r.win && (() => { const h = r.hp[r.win === 'a' ? 0 : 1]; return h[1] > 0 && h[1] / h[2] <= CLOSE; })()));

(async () => {
  const srv = http.createServer((q, r) => { const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0])).replace(/\/$/, '/index.html');
    fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); r.end(d); }); });
  await new Promise(r => srv.listen(0, '127.0.0.1', r)); const PORT = srv.address().port;
  const br = await chromium.launch({ args: GPU });
  const T0 = Date.now(), base = Date.now();
  // 1 trận chạy thử (không quay) · pool chạy nhiều trận song song (--par), mỗi trận 1 tab riêng
  const simulate = async (sd, w) => { const pg = await openMatch(br, PORT, sd, w);
    while (!(await pg.evaluate(STEP, { n: 240, FPS, stopAt: 14 })) && (await pg.evaluate(() => __vt)) < MAXSEC) {}
    const r = await pg.evaluate(RESULT); await pg.close(); return r; };
  const pool = async (seeds, w, onDone) => { let i = 0;
    await Promise.all(Array.from({ length: Math.min(PAR, seeds.length) }, async () => { while (i < seeds.length) { const k = i++; onDone(k, seeds[k], await simulate(seeds[k], w)); } })); };
  // 🧪 chỉ chạy thử N trận, in kết quả (không quay)
  if (SIM) { const rows = [];
    await pool(Array.from({ length: SIM }, (_, k) => SEED != null ? SEED + k : ((base + k * 7919) >>> 0)), SIMW, (k, sd, r) => { rows.push({ sd, r }); console.log(`  #${k + 1} seed ${sd}: ${fmt(r)}`); });
    fs.writeFileSync(OUT + '.sim.json', JSON.stringify(rows));
    console.log(`✅ chạy thử xong ${SIM} trận · ${((Date.now() - T0) / 1000).toFixed(0)}s`); await br.close(); srv.close(); return; }
  // 🔎 dò trước kết quả (chỉ khi có yêu cầu thắng/thua) — chạy nhanh ở độ phân giải thấp, KHÔNG quay
  if (SEED == null && (WIN || CLOSE != null || FAR)) {
    const hits = [];   // gom các trận đúng ý, đủ WANT trận (hoặc hết TRIES) thì lấy trận SÁT SAO NHẤT (con thắng còn ít máu nhất)
    for (let k = 0; k < TRIES && (k < MIN || hits.length < WANT); k += PAR) {   // mỗi đợt PAR trận song song, xong đợt mới xét đủ chưa
      await pool(Array.from({ length: Math.min(PAR, TRIES - k) }, (_, j) => (base + (k + j) * 7919) >>> 0), 360, (j, sd, r) => {
        console.log(`  thử #${k + j + 1} seed ${sd}: ${fmt(r)}${ok(r) ? '  ✔' : ''}`);
        if (ok(r)) { const h = r.hp[r.win === 'a' ? 0 : 1]; hits.push({ sd, k: h[1] / h[2], r }); } });
    }
    if (hits.length) { hits.sort((x, y) => x.k - y.k); SEED = hits[0].sd; console.log(`🏆 ${hits.length} trận đúng ý · chọn trận sát sao nhất: seed ${SEED} · ${fmt(hits[0].r)}`); }
    if (SEED == null) { console.log(`❌ ${TRIES} lần thử chưa ra trận đúng ý`); await br.close(); srv.close(); process.exit(1); }
  }
  // 🏆 mặc định: chạy thử BEST trận, lấy trận sát sao nhất (con thắng còn ÍT máu nhất, phải có người thắng)
  if (SEED == null && !RANDOM && BEST > 0) { let best = null;
    await pool(Array.from({ length: BEST }, (_, k) => (base + k * 7919) >>> 0), SIMW, (k, sd, r) => {
      const h = r.win ? r.hp[r.win === 'a' ? 0 : 1] : null, k2 = h && h[1] > 0 ? h[1] / h[2] : null;
      console.log(`  thử #${k + 1} seed ${sd}: ${fmt(r)}`);
      if (k2 != null && (!best || k2 < best.k || (k2 === best.k && sd < best.sd))) best = { sd, k: k2, r }; });
    if (best) { SEED = best.sd; console.log(`🏆 trận sát sao nhất: seed ${SEED} · ${fmt(best.r)}`); } }
  if (SEED == null) SEED = (Date.now() ^ (Math.random() * 1e9)) >>> 0;
  console.log(`⏱️ chạy thử mất ${((Date.now() - T0) / 1000).toFixed(0)}s${PAR > 1 ? ` (song song ${PAR})` : ''}`);
  // 🎥 quay thật ở 2K
  console.log(`🎬 quay seed ${SEED} · ${VW}x${VH} @${FPS}fps · nén ${HW ? 'VideoToolbox (phần cứng)' : 'libx264 ' + PRESET}`);
  const pg = await openMatch(br, PORT, SEED, VW);
  const cdp = await pg.context().newCDPSession(pg);
  const rc = await pg.evaluate(() => { const r = document.getElementById('arena').getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
  const tmpV = OUT + '.video.mp4';
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-vf', `scale=${VW}:${VH}:flags=lanczos`, ...VENC, '-pix_fmt', 'yuv420p', '-r', String(FPS), tmpV], { stdio: ['pipe', 'inherit', 'inherit'] });
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
