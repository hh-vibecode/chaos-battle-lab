// 👥 Quay 1 trận 2vs2 ra MP4 dọc 9:16 có tiếng — vẽ TỪNG KHUNG theo đồng hồ ảo (không lag), random có seed (tái lập được).
//   node tools/render-duo.js out.mp4 --a evilgary,evillarry --b feuerkatze,stalincat [--win 1] [--domain 3] [--seeds 40] [--seed N] [--fps 60] [--w 1440]
//   --a/--b: đội trái / đội phải (charKey) · --win: đội phải thắng (0 trái, 1 phải) — thử lần lượt từng seed (chạy nhanh, không quay)
//   tới khi ra trận đúng ý rồi mới quay thật · --domain: giây Stalin mở domain (liềm được lái dần về phía búa cho chạm đúng lúc)
//   --seed: bỏ qua bước tìm, quay luôn seed này · --w: bề ngang video (1440 = 2K, cao 2560)
// Tiếng: ghi lại mọi lần game phát/dừng Audio (sample, lúc phát, âm lượng, tốc phát, lặp) rồi tự trộn bằng numpy theo SND_LUFS.
const { chromium } = require('playwright');
const { spawn, execFileSync } = require('child_process');
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2), OUT = path.resolve(args[0] || 'duo.mp4');
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const TEAM_A = opt('--a', 'evilgary,evillarry').split(','), TEAM_B = opt('--b', 'feuerkatze,stalincat').split(',');
const WIN = +opt('--win', 1), DOMAIN = +opt('--domain', 3), SEEDS = +opt('--seeds', 40), FPS = +opt('--fps', 60), VW = +opt('--w', 1440);
const VH = Math.round(VW * 16 / 9), FIXED = opt('--seed', null), PAR = +opt('--par', 4), MAXSEC = +opt('--max', 150);
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.gif': 'image/gif', '.mp3': 'audio/mpeg', '.ogg': 'audio/ogg', '.wav': 'audio/wav', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.ttf': 'font/ttf' };

async function openMatch(br, PORT, seed) {
  const pg = await br.newPage({ viewport: { width: 720, height: 1280 } });
  pg.on('pageerror', e => console.log('⚠️', e.message.slice(0, 160)));
  await pg.goto(`http://127.0.0.1:${PORT}/`);
  await pg.waitForFunction(() => !document.getElementById('bootScreen'), null, { timeout: 300000 });
  // nạp trước ảnh/tiếng của 4 meme (asset theo nhân vật tải lười) rồi mới bắt đầu thật — 2 lần chạy cùng seed phải y hệt nhau
  await pg.evaluate(({ A, B, VW }) => { const n = k => roster.findIndex(c => c.charKey === k); window.__idx = [...A, ...B].map(n);
    if (window.__idx.some(i => i < 0)) throw new Error('không thấy nhân vật: ' + [...A, ...B].join(','));
    ARENA_NORMAL.ss = (VW + 0.4) / (ARENA_NORMAL.w * 1.12 / 1.05);   // 🖥️ canvas cam-mode 2vs2 = đúng VW×VH
    _duoPickedIdxs = __idx.slice(); duoStart(); }, { A: TEAM_A, B: TEAM_B, VW });
  await pg.waitForTimeout(2500);
  await pg.waitForFunction(() => [...document.images].every(i => i.complete), null, { timeout: 60000 }).catch(() => {});
  await pg.evaluate(seed => {
    // 🎲 random có seed · ⏱️ đồng hồ ảo cho performance.now / Date.now / rAF / setTimeout / setInterval
    let s = seed >>> 0; Math.random = () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    window.__vt = 0; const p0 = performance.now(), d0 = Date.now(); performance.now = () => p0 + __vt * 1000; Date.now = () => d0 + Math.round(__vt * 1000);
    window.__raf = new Map(); let rid = 0; window.requestAnimationFrame = cb => { __raf.set(++rid, cb); return rid; }; window.cancelAnimationFrame = i => { __raf.delete(i); };
    window.__tm = []; let tid = 1e6;
    window.setTimeout = (fn, ms, ...a) => { const id = ++tid; __tm.push({ id, at: __vt + (+ms || 0) / 1000, fn, a }); return id; };
    window.setInterval = (fn, ms, ...a) => { const id = ++tid; __tm.push({ id, at: __vt + Math.max(16, +ms || 0) / 1000, fn, a, rep: Math.max(16, +ms || 0) / 1000 }); return id; };
    window.clearTimeout = window.clearInterval = id => { const i = __tm.findIndex(t => t.id === id); if (i >= 0) __tm.splice(i, 1); };
    // 🔊 sổ ghi tiếng (tắt tiếng thật)
    const rev = {}; for (const k in AUDIO_SAMPLES) { try { rev[new URL(AUDIO_SAMPLES[k].src, location.href).pathname] = k; } catch (e) {} }
    window.__aud = []; let aid = 0, nextLoud = 1; const P = HTMLMediaElement.prototype, op = P.play, opa = P.pause;
    const _ps = playSample; playSample = function (key, volume = 1) { nextLoud = volume > 1 ? volume : ((typeof _LOUD !== 'undefined' && _LOUD[key]) || 1); try { return _ps.apply(this, arguments); } finally { nextLoud = 1; } };
    P.play = function () { try { if (!this.__id) this.__id = ++aid; const p = new URL(this.currentSrc || this.src, location.href).pathname, k = rev[p] || null;
      let mus = false; try { mus = _sndMusicPlaying(); } catch (e) {}
      __aud.push({ id: this.__id, ev: 'play', t: __vt, path: p, key: k, vol: this.volume, rate: this.playbackRate || 1, loop: !!this.loop, ct: this.currentTime || 0, loud: nextLoud, duck: mus ? SND_SFX_DUCK : 1 }); } catch (e) {}
      this.muted = true; return op.call(this); };
    P.pause = function () { try { if (this.__id) __aud.push({ id: this.__id, ev: 'pause', t: __vt }); } catch (e) {} return opa.call(this); };
    duoActuallyStart();
    window.__dom = null;
  }, seed);
  return pg;
}

// 1 khung = lái liềm (nếu cần) → chạy hẹn giờ tới hạn → gọi rAF → đồng hồ +1/FPS. Trả về true khi trận đã dừng hẳn.
const STEP = ({ n, FPS, DOMAIN }) => {
  for (let k = 0; k < n; k++) {
    const st = fighters.find(f => f.type === 'stalincat');
    if (st && !st._slDomainUsed && __vt >= DOMAIN - 1.3 && __vt < DOMAIN + 2) {   // ☭ liềm lượn dần về phía búa đang bay/nằm đất
      const ap = apples.find(a => a._stalinSickle && a.owner === st);
      if (ap && st._slHammerState !== 'held') { const dx = st._slHammerX - ap.x, dy = st._slHammerY - ap.y, d = Math.hypot(dx, dy) || 1;
        const sp = Math.hypot(ap.vx, ap.vy) || 4, left = Math.max(0.08, DOMAIN - __vt) * 60 * GAME_SPEED * TIME_SCALE;
        const v = Math.min(9, Math.max(sp, d / left)), turn = __vt >= DOMAIN - 0.35 ? 1 : 0.18;
        const tx = dx / d * v, ty = dy / d * v; ap.vx += (tx - ap.vx) * turn; ap.vy += (ty - ap.vy) * turn; }
    }
    if (st && st._slDomainUsed && __dom == null) __dom = __vt;
    __tm.sort((a, b) => a.at - b.at || a.id - b.id);
    while (__tm.length && __tm[0].at <= __vt) { const t = __tm.shift(); if (t.rep) __tm.push({ ...t, at: t.at + t.rep }); try { t.fn(...t.a); } catch (e) {} }
    const q = [...__raf.values()]; __raf.clear(); for (const cb of q) cb(performance.now());
    __vt += 1 / FPS;
    if (!__raf.size) return true;
  }
  return false;
};
const RESULT = () => { const dead = t => fighters.filter(f => f.team === t).every(f => f.dead);
  return { t: __vt, dom: __dom, win: koWinner ? koWinner.team : (dead(0) && !dead(1) ? 1 : dead(1) && !dead(0) ? 0 : null), over: !!loop._koTimer, alive: fighters.filter(f => koWinner && f.team === koWinner.team && !f.dead).reduce((m, f) => m + f.hp, 0), hp: fighters.map(f => f.type + ':' + Math.round(f.hp)) }; };

(async () => {
  const srv = http.createServer((q, r) => { const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0])).replace(/\/$/, '/index.html');
    fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); r.end(d); }); });
  await new Promise(r => srv.listen(0, '127.0.0.1', r)); const PORT = srv.address().port;
  const br = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
  const ok = r => r.win === WIN && r.dom != null && Math.abs(r.dom - DOMAIN) <= 0.25 && r.alive > 0;   // con thắng phải còn sống tới hết đoạn zoom
  if (opt('--probe', null) != null) { const pg = await openMatch(br, PORT, +opt('--probe'));
    for (let k = 0; k < 40; k++) { const fin = await pg.evaluate(STEP, { n: 150, FPS, DOMAIN });
      console.log(JSON.stringify(await pg.evaluate(() => ({ t: +__vt.toFixed(1), tick, ko: loop._koTimer || 0, raf: __raf.size, f: fighters.map(f => [f.type, Math.round(f.hp), f.maxHp, f.dead ? 'D' : '']) })))); if (fin) break; }
    await br.close(); srv.close(); return; }
  // 🔎 tìm seed: chạy nhanh không quay
  let seed = FIXED != null ? +FIXED : null;
  if (seed == null) {
    let next = 1; const found = [];
    const worker = async () => { while (next <= SEEDS) { const sd = next++;
      const pg = await openMatch(br, PORT, sd); let done = false;
      while (!done && (await pg.evaluate(() => __vt)) < MAXSEC) { done = await pg.evaluate(STEP, { n: 300, FPS, DOMAIN }); const r = await pg.evaluate(RESULT); if (r.dom == null && r.t > DOMAIN + 1) break; }
      const r = await pg.evaluate(RESULT); await pg.close();
      console.log(`  seed ${sd}: domain ${r.dom == null ? '—' : r.dom.toFixed(2) + 's'} · ${r.win == null ? 'chưa xong/hoà' : 'đội ' + r.win + ' thắng'} lúc ${r.t.toFixed(1)}s · ${r.hp.join(' ')}`);
      if (ok(r)) found.push({ sd, r }); } };
    await Promise.all([...Array(PAR)].map(worker));
    found.sort((a, b) => b.r.alive - a.r.alive); if (found.length) { seed = found[0].sd; console.log(`🏆 chọn seed ${seed} (phe thắng còn ${Math.round(found[0].r.alive)} HP)`); }
    if (seed == null) { console.log('❌ không seed nào ra đúng ý'); await br.close(); srv.close(); process.exit(1); }
  }
  // 🎥 quay thật
  console.log(`🎬 quay seed ${seed} · ${VW}x${VH} @${FPS}fps`);
  const pg = await openMatch(br, PORT, seed);
  const tmpV = OUT + '.video.mp4';
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', '-s', `${VW}x${VH}`, '-r', String(FPS), tmpV], { stdio: ['pipe', 'inherit', 'inherit'] });
  const t0 = Date.now(); let i = 0, hold = 0;
  for (;;) {
    const fin = await pg.evaluate(STEP, { n: 1, FPS, DOMAIN });
    const b64 = await pg.evaluate(() => document.getElementById('arena').toDataURL('image/jpeg', 0.94).split(',')[1]);
    if (!ff.stdin.write(Buffer.from(b64, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    if (++i % 300 === 0) console.log(`  khung ${i} · ${(i / FPS).toFixed(1)}s video · ${((Date.now() - t0) / 1000).toFixed(0)}s`);
    if (fin && ++hold > FPS * 0.6) break;   // trận dừng hẳn (zoom xong) → giữ khung cuối thêm 0.6s
    if (i > MAXSEC * FPS) break;
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
  const res = await pg.evaluate(RESULT), info = await pg.evaluate(() => ({ aud: __aud, lufs: SND_LUFS, music: [...SND_MUSIC] }));
  await br.close(); srv.close();
  console.log(`  kết quả: domain ${res.dom == null ? '—' : res.dom.toFixed(2) + 's'} · đội ${res.win} thắng · ${res.hp.join(' ')}`);
  if (!ok(res)) console.log('⚠️ lần quay KHÁC lúc tìm seed — kiểm tra lại!');
  // 🔊 trộn tiếng bằng numpy (không giới hạn số lần phát)
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
  console.log(`✅ ${OUT}  (${plan.length} tiếng · ${END.toFixed(1)}s · ${((Date.now() - t0) / 1000).toFixed(0)}s)`);
})();
