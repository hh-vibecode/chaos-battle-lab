// 🎥 Quay 1 tập COMMENTER BATTLE (Commenter vs 3 Random Memes) ra MP4 16:9 có tiếng — CẢ phần máy loto + 3 bánh quay
//   LẪN trận, y như anh tự quay màn hình, nhưng vẽ TỪNG KHUNG theo đồng hồ ảo (không giật). Tự bấm nút theo nhịp người thật.
//   node tools/render-fan.js out.mp4 --fan tanphamnhat969 [--seed N] [--sim 12] [--w 1920] [--fps 60] [--ofps 50]
//   --sim N : chỉ CHẠY THỬ N seed (không quay) — in kết quả máy loto, bánh quay, ai thắng, máu còn → chọn seed rồi quay bằng --seed
//   Không --seed, không --sim: chạy thử --best (mặc định 10) seed, lấy trận SÁT nhất (đội thắng còn ít máu nhất, trận 15–45s) rồi quay.
//   Ra kèm <out>.marks.json: mốc giây (theo video) của từng bước — bốc đối thủ, từng lượt quay + kết quả, vào trận, bảng kết quả —
//   để edit chèn meme đúng lúc (skill tap-commenter).
// Bánh quay chạy bằng CSS transition → mỗi khung tua mọi Animation của trang theo đồng hồ ảo (document.getAnimations()).
// Tiếng: như render-match (ghi lần phát/dừng Audio → tools/mix-plan.py theo SND_LUFS → cân −14 LUFS, chặn đỉnh −1 dB).
// ⚠️ Trình duyệt ngầm có --disable-audio-output (luật CLAUDE.md, tránh kẹt coreaudiod).
const { chromium } = require('playwright');
const { spawn, execFileSync, spawnSync } = require('child_process');
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2), OUT = path.resolve(args[0] || 'fan.mp4');
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const FAN = opt('--fan', 'tanphamnhat969'), FPS = +opt('--fps', 60), OFPS = +opt('--ofps', 50), VW = +opt('--w', 1920), VH = Math.round(VW * 9 / 16);
const SIM = +opt('--sim', 0), BEST = +opt('--best', 10), MAXSEC = +opt('--max', 200), HOLD = +opt('--hold', 5);
const BL = opt('--blen', '15-45').split('-').map(Number);   // độ dài trận ưu tiên khi tự chọn seed
let SEED = opt('--seed', null) == null ? null : +opt('--seed');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.gif': 'image/gif', '.mp3': 'audio/mpeg', '.ogg': 'audio/ogg', '.wav': 'audio/wav', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.ttf': 'font/ttf' };
const GPU = args.includes('--cpu') ? ['--autoplay-policy=no-user-gesture-required', '--disable-audio-output']
  : ['--autoplay-policy=no-user-gesture-required', '--disable-audio-output', '--enable-gpu', '--use-angle=metal', '--ignore-gpu-blocklist'];
const CSSW = 1920, CSSH = 1080;   // khung trang = màn 1920×1080 (dpr đổi theo --w)

function audioDurations() {
  const cf = path.join(__dirname, '.audio-dur.json'); let c = {}; try { c = JSON.parse(fs.readFileSync(cf, 'utf8')); } catch (e) {}
  const dir = path.join(ROOT, 'assets/audio'), out = {}; let dirty = false;
  for (const f of fs.readdirSync(dir)) { if (!/\.(mp3|ogg|wav)$/.test(f)) continue; const fp = path.join(dir, f), m = fs.statSync(fp).mtimeMs, k = 'assets/audio/' + f;
    if (!c[k] || c[k].m !== m) { let d = 0; try { d = +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', fp]).toString().trim(); } catch (e) {} c[k] = { m, d }; dirty = true; }
    out['/' + k] = c[k].d; }
  if (dirty) fs.writeFileSync(cf, JSON.stringify(c)); return out;
}
let DURS = null;

async function openFan(br, PORT, seed, cw) {
  if (!DURS) DURS = audioDurations();
  const pg = await br.newPage({ viewport: { width: CSSW, height: CSSH }, deviceScaleFactor: cw / CSSW });
  pg.on('pageerror', e => console.log('⚠️', e.message.slice(0, 160)));
  await pg.goto(`http://127.0.0.1:${PORT}/`);
  await pg.waitForFunction(() => !document.getElementById('bootScreen'), null, { timeout: 300000 });
  await pg.waitForTimeout(800);
  await pg.waitForLoadState('networkidle').catch(() => {});
  await pg.evaluate(() => document.fonts.ready);
  // 🖼️ tải sẵn ảnh MỌI meme có thể bị bốc (ảnh về muộn giữa chừng làm lúc thử ≠ lúc quay)
  await pg.evaluate(async FAN => { if (!FAN_SKILLS[FAN]) throw new Error('không có commenter ' + FAN);
    const urls = new Set(); for (const c of roster) { if (!c) continue; for (const k of ['avatarUrl', 'rageAvatarUrl']) if (c[k]) urls.add(c[k]); if (c.avatarUrl && window.ASSETS) urls.add(ASSETS.thumb(c.avatarUrl)); }
    await Promise.all([...urls].map(u => new Promise(r => { const i = new Image(); i.onload = i.onerror = r; i.src = u; }))); }, FAN);
  await pg.evaluate(async ({ DURS }) => {   // 🎼 phổ nhạc cho 4 con nhạc (như render-match) — giải mã sẵn hết vì đối thủ chưa biết trước
    window.__DURS = DURS; window.__pcm = {};
    const keys = [...MOSQUITO_SONGS, ...PIANO_SONGS, ...GUITAR_SONGS, ...BONGO_SONGS];
    for (const k of keys) { const a = AUDIO_SAMPLES[k]; if (!a) continue; const u = new URL(a.src, location.href).pathname; try { const buf = await (await fetch(u)).arrayBuffer(); const ab = await AC.decodeAudioData(buf); const d = new Float32Array(ab.length); for (let c = 0; c < ab.numberOfChannels; c++) { const x = ab.getChannelData(c); for (let i = 0; i < d.length; i++) d[i] += x[i] / ab.numberOfChannels; } __pcm[u] = { d, sr: ab.sampleRate }; } catch (e) {} }
  }, { DURS });
  await pg.evaluate(({ seed, FAN }) => {
    let s = seed >>> 0; Math.random = () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    window.__vt = 0; const p0 = performance.now(), d0 = Date.now(); performance.now = () => p0 + __vt * 1000; Date.now = () => d0 + Math.round(__vt * 1000);
    window.__raf = new Map(); let rid = 0; window.requestAnimationFrame = cb => { __raf.set(++rid, cb); return rid; }; window.cancelAnimationFrame = i => { __raf.delete(i); };
    window.__tm = []; let tid = 1e6;
    window.setTimeout = (fn, ms, ...a) => { const id = ++tid; __tm.push({ id, at: __vt + (+ms || 0) / 1000, fn, a }); return id; };
    window.setInterval = (fn, ms, ...a) => { const id = ++tid; __tm.push({ id, at: __vt + Math.max(16, +ms || 0) / 1000, fn, a, rep: Math.max(16, +ms || 0) / 1000 }); return id; };
    window.clearTimeout = window.clearInterval = id => { const i = __tm.findIndex(t => t.id === id); if (i >= 0) __tm.splice(i, 1); };
    const rev = {}; for (const k in AUDIO_SAMPLES) { try { rev[new URL(AUDIO_SAMPLES[k].src, location.href).pathname] = k; } catch (e) {} }
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
    const oCM = AudioContext.prototype.createMediaElementSource; AudioContext.prototype.createMediaElementSource = function (el) { const n = oCM.call(this, el); n.__el = el; return n; };
    const oCo = AudioNode.prototype.connect; AudioNode.prototype.connect = function (d, ...r) { if (this.__el && d instanceof AnalyserNode) d.__el = this.__el; return oCo.call(this, d, ...r); };
    function fft(re, im) { const n = re.length; for (let i = 1, j = 0; i < n; i++) { let b = n >> 1; for (; j & b; b >>= 1) j ^= b; j ^= b; if (i < j) { [re[i], re[j]] = [re[j], re[i]]; [im[i], im[j]] = [im[j], im[i]]; } }
      for (let len = 2; len <= n; len <<= 1) { const a = -2 * Math.PI / len, wr = Math.cos(a), wi = Math.sin(a); for (let i = 0; i < n; i += len) { let cr = 1, ci = 0; for (let k = 0; k < len / 2; k++) { const ur = re[i + k], ui = im[i + k], xr = re[i + k + len / 2] * cr - im[i + k + len / 2] * ci, xi = re[i + k + len / 2] * ci + im[i + k + len / 2] * cr; re[i + k] = ur + xr; im[i + k] = ui + xi; re[i + k + len / 2] = ur - xr; im[i + k + len / 2] = ui - xi; const t = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = t; } } } }
    AnalyserNode.prototype.getByteFrequencyData = function (arr) { const el = this.__el, pcm = el && __pcm[pathOf(el)]; if (!pcm || !el.__v || !el.__v.on) { arr.fill(0); return; }
      const N = this.fftSize, sr = pcm.sr, end = Math.floor(__vpos(el) * sr); const f = this.__f || (this.__f = { re: new Float64Array(N), im: new Float64Array(N) }); const { re, im } = f; const sm = this.__sm || (this.__sm = new Float64Array(N / 2)), g = el.volume;
      for (let i = 0; i < N; i++) { const k = end - N + i, w = 0.42 - 0.5 * Math.cos(2 * Math.PI * i / N) + 0.08 * Math.cos(4 * Math.PI * i / N); re[i] = (k >= 0 && k < pcm.d.length ? pcm.d[k] * g : 0) * w; im[i] = 0; }
      fft(re, im); const tau = this.smoothingTimeConstant, mn = this.minDecibels, mx = this.maxDecibels;
      for (let i = 0; i < arr.length && i < N / 2; i++) { const mag = Math.hypot(re[i], im[i]) / N; sm[i] = tau * sm[i] + (1 - tau) * mag; const db = 20 * Math.log10(sm[i] || 1e-12); arr[i] = Math.max(0, Math.min(255, Math.round(255 * (db - mn) / (mx - mn)))); } };
    // 🎬 ĐẠO DIỄN: bấm nút như người thật (theo đồng hồ ảo). Ghi mốc vào __marks.
    window.__marks = []; const M = (ev, x) => __marks.push({ t: +__vt.toFixed(3), ev, ...(x || {}) });
    const D = window.__D = { st: 'init', at: 0.9, nRes: 0 };
    window.__dir = () => {
      const t = __vt, btn = id => document.getElementById(id);
      if (D.st === 'init' && t >= D.at) { M('roll'); fanSpin(); D.st = 'slot'; }
      else if (D.st === 'slot') { if (_fwSlotDone && !_fwBusy) { M('foes', { foes: _fanIdxs.slice(1).map(i => roster[i].charKey) }); D.st = 'slotwait'; D.at = t + 2.0; } }
      else if (D.st === 'slotwait' && t >= D.at) { fanSpin(); M('wheels'); D.st = 'wheel'; D.at = t + 1.3; }
      else if (D.st === 'wheel') {
        if (_fwRes.length > D.nRes) { const r = _fwRes[_fwRes.length - 1]; D.nRes = _fwRes.length; M('result', { kind: D.kind, txt: r.txt, ic: r.ic }); D.at = t + 1.25; }
        if (!_fwBusy && t >= D.at) {
          if (!btn('fwGoBtn').disabled) { M('fightbtn'); D.st = 'go'; D.at = t + 0.4; }
          else if (!btn('fwSpinBtn').disabled) { D.kind = _fwKind; M('spin', { kind: _fwKind }); fanSpin(); }
        } }
      else if (D.st === 'go' && t >= D.at) { fanWheelDone(); D.st = 'enter'; }
      else if (D.st === 'enter') { if (document.getElementById('battleScreen').classList.contains('active') && !fighters.length && fanCtx) { M('waitscreen'); D.st = 'press'; D.at = t + 1.3; } }
      else if (D.st === 'press' && t >= D.at) { _battleStartCornerClick(); M('fight'); D.st = 'fight'; }
      else if (D.st === 'fight') { if (document.getElementById('fanResultOverlay').classList.contains('open')) { M('result_screen', { win: koWinnerTeam() }); D.st = 'hold'; D.at = t; } }
    };
    const koWinnerTeam = () => { const a0 = fighters.some(f => f.team === 0 && !f.dead), a1 = fighters.some(f => f.team === 1 && !f.dead); return a0 && !a1 ? 'fan' : a1 && !a0 ? 'memes' : 'draw'; };
    _pickMode = 'fan'; _fanPickKey = FAN; fanStart();   // = chọn commenter + bấm ▶ 1 VS 3 → màn "Who are you up against, bro?"
  }, { seed, FAN });
  return pg;
}
// 1 bước = 1 tick game (60/s): đạo diễn → timer → rAF → tua CSS animation → đồng hồ +1/FPS
const STEP = ({ n, FPS, HOLD }) => {
  for (let k = 0; k < n; k++) {
    __vEnded(); __dir();
    __tm.sort((a, b) => a.at - b.at || a.id - b.id);
    while (__tm.length && __tm[0].at <= __vt) { const t = __tm.shift(); if (t.rep) __tm.push({ ...t, at: t.at + t.rep }); try { t.fn(...t.a); } catch (e) {} }
    const q = [...__raf.values()]; __raf.clear(); for (const cb of q) cb(performance.now());
    for (const a of document.getAnimations()) { if (a.__v0 == null) { a.__v0 = __vt; try { a.pause(); } catch (e) {} } try { a.currentTime = (__vt - a.__v0) * 1000; } catch (e) {} }
    __vt += 1 / FPS;
    if (__D.st === 'hold' && __vt - __D.at >= HOLD) return true;
  }
  return false;
};
const RESULT = () => { const m = __marks, f0 = m.find(x => x.ev === 'fight'), rs = m.find(x => x.ev === 'result_screen');
  const T = t => fighters.filter(f => f.team === t), sum = (a, k) => a.reduce((s, f) => s + Math.max(0, f.dead ? 0 : f[k]), 0);
  const win = rs ? rs.win : null, wt = win === 'fan' ? 0 : win === 'memes' ? 1 : null;
  return { t: __vt, foes: (m.find(x => x.ev === 'foes') || {}).foes, res: m.filter(x => x.ev === 'result').map(x => x.txt), win,
    blen: f0 && rs ? rs.t - f0.t : null, wk: wt == null ? null : sum(T(wt), 'hp') / T(wt).reduce((s, f) => s + f.maxHp, 0),
    hp: fighters.map(f => [f.type, f.team, Math.max(0, Math.round(f.hp)), f.maxHp, f._fanLives || 0]) }; };
const fmt = r => `${(r.foes || []).join(' x ')} · ${r.res.join(' | ')} · ${r.win ? (r.win === 'fan' ? 'COMMENTER thắng' : r.win === 'memes' ? '3 meme thắng' : 'hoà') : 'chưa xong'}${r.blen != null ? ' · trận ' + r.blen.toFixed(1) + 's' : ''}${r.wk != null ? ' · đội thắng còn ' + Math.round(r.wk * 100) + '% máu' : ''}`;

(async () => {
  const srv = http.createServer((q, r) => { const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0])).replace(/\/$/, '/index.html');
    fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); r.end(d); }); });
  await new Promise(r => srv.listen(0, '127.0.0.1', r)); const PORT = srv.address().port;
  const br = await chromium.launch({ args: GPU });
  const T0 = Date.now(), base = Date.now();
  const simulate = async sd => { const pg = await openFan(br, PORT, sd, 480);
    while (!(await pg.evaluate(STEP, { n: 240, FPS, HOLD: 0.5 })) && (await pg.evaluate(() => __vt)) < MAXSEC) {}
    const r = await pg.evaluate(RESULT); await pg.close(); return r; };
  if (SIM || (SEED == null && BEST > 0)) {
    const N = SIM || BEST, rows = [];
    for (let k = 0; k < N; k++) { const sd = SEED != null ? SEED + k : ((base + k * 7919) >>> 0); const r = await simulate(sd); rows.push({ sd, r }); console.log(`  #${k + 1} seed ${sd}: ${fmt(r)}`); }
    fs.writeFileSync(OUT + '.sim.json', JSON.stringify(rows, null, 1));
    if (SIM) { console.log(`✅ chạy thử xong ${N} seed · ${((Date.now() - T0) / 1000).toFixed(0)}s`); await br.close(); srv.close(); return; }
    const ok = rows.filter(x => x.r.win && x.r.win !== 'draw' && x.r.wk > 0);
    ok.sort((a, b) => (inB(b.r) - inB(a.r)) || (a.r.wk - b.r.wk));
    function inB(r) { return r.blen >= BL[0] && r.blen <= BL[1] ? 1 : 0; }
    if (!ok.length) { console.log('❌ không seed nào ra người thắng'); await br.close(); srv.close(); process.exit(1); }
    SEED = ok[0].sd; console.log(`🏆 chọn seed ${SEED} · ${fmt(ok[0].r)}`);
  }
  console.log(`🎬 quay seed ${SEED} · ${VW}x${VH} @${OFPS}fps`);
  const pg = await openFan(br, PORT, SEED, VW);
  const cdp = await pg.context().newCDPSession(pg);
  const tmpV = OUT + '.video.mp4';
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(OFPS), '-c:v', 'mjpeg', '-i', '-', '-vf', `scale=${VW}:${VH}:flags=lanczos`, '-threads', '2', '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', '-r', String(OFPS), tmpV], { stdio: ['pipe', 'inherit', 'inherit'] });
  let i = 0;
  for (;;) {
    const fin = await pg.evaluate(STEP, { n: 1, FPS, HOLD }); i++;
    if (Math.floor(i * OFPS / FPS) > Math.floor((i - 1) * OFPS / FPS)) { const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 93, optimizeForSpeed: true });
      if (!ff.stdin.write(Buffer.from(data, 'base64'))) await new Promise(r => ff.stdin.once('drain', r)); }
    if (i % 600 === 0) console.log(`  ${(i / FPS).toFixed(0)}s video · ${((Date.now() - T0) / 1000).toFixed(0)}s`);
    if (fin || i > MAXSEC * FPS) break;
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
  const res = await pg.evaluate(RESULT), info = await pg.evaluate(() => ({ aud: __aud, lufs: SND_LUFS, music: [...SND_MUSIC], marks: __marks }));
  await br.close(); srv.close();
  console.log(`  kết quả: ${fmt(res)}`);
  fs.writeFileSync(OUT + '.marks.json', JSON.stringify({ seed: SEED, fan: FAN, dur: i / FPS, marks: info.marks, res }, null, 1));
  // 🔊 trộn tiếng (y render-match)
  const END = i / FPS, ev = new Map();
  for (const a of info.aud) { if (a.ev === 'play') ev.set(a.id + ':' + a.t, { ...a, end: END }); else for (const [, v] of ev) if (v.id === a.id && v.end === END && a.t >= v.t) v.end = a.t; }
  const music = new Set(info.music), plan = [];
  for (const a of ev.values()) { const m = a.key && info.lufs[a.key]; let g = m ? Math.max(0.05, Math.min(8, Math.pow(10, (-14 - m[0]) / 20))) : 1;
    g *= music.has(a.key) ? 1 : a.vol * a.loud * a.duck;
    const f = path.join(ROOT, a.path); if (!fs.existsSync(f) || a.end - a.t <= 0.02) continue;
    plan.push({ f, t: a.t, end: a.end, ct: a.ct, loop: a.loop, rate: a.rate, keep: music.has(a.key), duck: false, g: g * 0.8 }); }
  const planF = OUT + '.plan.json', wav = OUT + '.mix.wav'; fs.writeFileSync(planF, JSON.stringify({ dur: END, plan }));
  execFileSync('python3', [path.join(__dirname, 'mix-plan.py'), planF, wav], { stdio: 'inherit' });
  let LG = 0; try { const r = spawnSync('ffmpeg', ['-nostats', '-i', wav, '-af', 'alimiter=limit=0.95,ebur128', '-f', 'null', '-'], { encoding: 'utf8' });
    const m = [...(r.stderr || '').matchAll(/I:\s+(-?[\d.]+) LUFS/g)].pop(); if (m) LG = Math.max(-20, Math.min(10, -14 - parseFloat(m[1]))); } catch (e) {}
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', tmpV, '-i', wav, '-filter_complex', `[1:a]alimiter=limit=0.95,volume=${LG.toFixed(2)}dB,alimiter=limit=0.89[a]`, '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', OUT], { stdio: 'inherit' });
  fs.unlinkSync(planF); fs.unlinkSync(wav); fs.unlinkSync(tmpV);
  console.log(`✅ ${OUT}  (seed ${SEED} · ${END.toFixed(1)}s · ${plan.length} tiếng · mất ${((Date.now() - T0) / 1000).toFixed(0)}s) · mốc: ${path.basename(OUT)}.marks.json`);
})();
