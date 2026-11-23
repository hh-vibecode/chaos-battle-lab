// 🎞️ Phần chạy TRONG TRÌNH DUYỆT của tools/x/film-video.js (xuất phim Meme Cinema → video MP4 cho app phát, anh dặn 23/11:
//   "không để máy tự vẽ cảnh phim nữa, phim phải xử lý từ trước, ở app chỉ là bản video").
// Trang game (index.html) đã nạp xong → driver chèn file này rồi gọi window.__fvRun({id, long, fps, vkbps, akbps, up}).
//   ① tiếng: trộn offline (OfflineAudioContext) đúng cách render-cine.js trộn bằng ffmpeg (chuẩn hoá LUFS, cắt độ dài, nhạc mờ vào / ra, nhường tiếng, slow-mo, giới hạn đỉnh)
//   ② hình: vẽ từng khung offline (CineKit offline: step(t)) → VideoEncoder H.264 → mp4-muxer (tools/x/vendor) → POST về driver (up = đường dẫn nhận file)
// Tiến độ ở window.__fv = {phase, i, n, err, done, info}.
(function(){
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const load = src => new Promise((r, j) => { const s = document.createElement('script'); s.src = src; s.onload = r; s.onerror = () => j(new Error('không tải được ' + src)); document.body.appendChild(s); });
  async function pickVideo(W, H, fps, bps) {
    for (const codec of ['avc1.640028', 'avc1.4d0028', 'avc1.42e028']) for (const hw of ['prefer-hardware', 'prefer-software', 'no-preference']) {
      const c = { codec, width: W, height: H, bitrate: bps, framerate: fps, latencyMode: 'quality', hardwareAcceleration: hw, avc: { format: 'avc' } };
      try { if ((await VideoEncoder.isConfigSupported(c)).supported) return c; } catch (e) {} }
    return null; }
  async function pickAudio(bps) {
    for (const [codec, mux] of [['mp4a.40.2', 'aac'], ['opus', 'opus']]) { const c = { codec, sampleRate: 48000, numberOfChannels: 2, bitrate: bps };
      try { if ((await AudioEncoder.isConfigSupported(c)).supported) return [c, mux]; } catch (e) {} }
    return [null, null]; }
  // ① trộn tiếng — chép đúng luật của tools/render-cine.js (mục "4) tiếng")
  async function mixAudio(I, dur) {
    const SR = 48000, ac = new OfflineAudioContext(2, Math.ceil(dur * SR), SR), cache = {};
    const buf = async url => { if (!cache[url]) cache[url] = fetch(url).then(r => { if (!r.ok) throw new Error(url + ' ' + r.status); return r.arrayBuffer(); }).then(b => ac.decodeAudioData(b)).catch(e => { console.warn('fv: thiếu tiếng', url, e); return null; }); return cache[url]; };
    // các bảng tiếng là `const` toàn cục của game.js (không nằm trên window) → đọc theo tên
    const LUFS = typeof SND_LUFS !== 'undefined' ? SND_LUFS : {}, MUSK = new Set(typeof SND_MUSIC !== 'undefined' ? [...SND_MUSIC] : []), SAMP = typeof AUDIO_SAMPLES !== 'undefined' ? AUDIO_SAMPLES : {};
    const lufsGain = k => { const m = LUFS[k]; if (!m) return 1; return Math.max(0.05, Math.min(8, Math.pow(10, (-14 - m[0]) / 20))); };
    const musOn = R => I.mus.some(m => R >= m.ra && R < m.rb);
    const lim = ac.createDynamicsCompressor(); lim.threshold.value = -1; lim.knee.value = 0; lim.ratio.value = 20; lim.attack.value = 0.002; lim.release.value = 0.12; lim.connect(ac.destination);   // ≈ alimiter 0.95
    const voR = I.mus.filter(m => m.vo).map(m => [m.ra, m.rb]);   // lồng tiếng: nhạc + tiếng khác lùi ×0.4 (y như xem trong game)
    const bg = ac.createGain(); bg.connect(lim);
    if (voR.length) for (const [a, b] of voR) { bg.gain.setValueAtTime(0.4, Math.max(0, a)); bg.gain.setValueAtTime(1, Math.min(dur, b)); }
    let nS = 0, nM = 0, miss = [];
    for (const [R, k, v, d] of I.sfx) { if (R < 0 || R >= dur) continue; const a = SAMP[k]; if (!a) { miss.push(k); continue; }
      const b = await buf(new URL(a.src, location.href).href); if (!b) { miss.push(k); continue; }
      let gn = (v == null ? 1 : v) * lufsGain(k); if (!MUSK.has(k) && musOn(R)) gn *= 0.75;
      const s = ac.createBufferSource(), g = ac.createGain(); s.buffer = b; g.gain.value = gn; s.connect(g); g.connect(bg);
      d ? s.start(R, 0, d) : s.start(R); nS++; }
    for (const m of I.mus) { const a = Math.max(0, m.ra), b2 = Math.min(m.rb, dur); if (b2 <= a) continue;
      const b = await buf(new URL(m.src, location.href).href); if (!b) { miss.push(m.src); continue; }
      const off = a - m.ra + (m.off || 0), len = b2 - a, s = ac.createBufferSource(), g = ac.createGain(), env = ac.createGain(); s.buffer = b;
      if (m.loop) { s.loop = true; s.loopStart = 0; s.loopEnd = b.duration; }
      g.gain.value = m.vol == null ? 1 : m.vol;
      // mờ vào / ra
      if (m.fi && a - m.ra < m.fi) { env.gain.setValueAtTime(0, a); env.gain.linearRampToValueAtTime(1, a + (m.fi - (a - m.ra))); } else env.gain.setValueAtTime(1, a);
      if (m.fo && m.rb <= dur) { env.gain.setValueAtTime(1, Math.max(a, b2 - m.fo)); env.gain.linearRampToValueAtTime(0, b2); }
      // nhường tiếng (duck) + slow-mo: nhân dồn các khoảng (ffmpeg volume=enable nối tiếp) — bậc thang như render-cine
      const segs = []; if (!m.vo) for (const [da, db, dg] of (I.duck || [])) if (db > a && da < b2) segs.push([Math.max(da, a), Math.min(db, b2), dg]);
      for (const sl of (I.slow || [])) { const sa = sl[0], sb = sl[1]; if (sb > a && sa < b2) segs.push([Math.max(sa, a), Math.min(sb, b2), 0.55]); }
      const dk = ac.createGain();
      if (segs.length) { const pts = [...new Set(segs.flatMap(x => [x[0], x[1]]).concat([a]))].sort((x, y) => x - y);
        for (const p of pts) { let gg = 1; for (const [x, y, q] of segs) if (p >= x && p < y) gg *= q; dk.gain.setValueAtTime(gg, p); } }
      s.connect(g); g.connect(env); env.connect(dk); dk.connect(m.vo ? lim : bg);
      s.start(a, m.loop ? off % b.duration : off, m.loop ? undefined : len); if (m.loop) s.stop(b2); nM++; }
    const out = await ac.startRendering();
    return { out, nS, nM, miss }; }

  window.__fvRun = async (o) => {
    const st = window.__fv = { phase: 'nạp phim', i: 0, n: 0, err: null, done: false, info: null };
    try {
      const id = o.id, fps = o.fps || 30, LONG = o.long || 1280;
      if (!window.Mp4Muxer) await load('tools/x/vendor/mp4-muxer.js');
      if (!window.VideoEncoder || !window.AudioEncoder) throw new Error('trình duyệt không có WebCodecs');
      // cạnh dài canvas xem trước luôn = 960 × scale (CineKit.PREVIEW_K) → scale = cạnh dài muốn / 960
      await playCineKit(id, { offline: true, scale: LONG / 960 });
      const f = CineKit.films[id]; if (!f) throw new Error('không có phim ' + id);
      for (let k = 0; k < 1200 && !f.ready(); k++) await sleep(100); if (!f.ready()) throw new Error('phim không sẵn sàng (ảnh chưa tải xong)');
      await sleep(500);
      const cv = f.canvas(), W = cv.width & ~1, H = cv.height & ~1, I = f.info(), dur = I.dur, N = Math.ceil(dur * fps);
      // ① tiếng
      st.phase = 'trộn tiếng'; const [acfg, amux] = await pickAudio((o.akbps || 128) * 1000); if (!acfg) throw new Error('không nén được tiếng (AAC / Opus)');
      const vcfg = await pickVideo(W, H, fps, (o.vkbps || 2500) * 1000); if (!vcfg) throw new Error('không nén được H.264 ' + W + 'x' + H);
      const mx = await mixAudio(I, dur);
      const target = new Mp4Muxer.ArrayBufferTarget();
      const muxer = new Mp4Muxer.Muxer({ target, video: { codec: 'avc', width: W, height: H, frameRate: fps }, audio: { codec: amux, numberOfChannels: 2, sampleRate: 48000 }, fastStart: 'in-memory', firstTimestampBehavior: 'offset' });
      let encErr = null;
      const aenc = new AudioEncoder({ output: (c, m) => muxer.addAudioChunk(c, m), error: e => { encErr = String(e); } }); aenc.configure(acfg);
      { const ab = mx.out, L = ab.length, CH = 4800, c0 = ab.getChannelData(0), c1 = ab.getChannelData(1);
        for (let p = 0; p < L; p += CH) { const n = Math.min(CH, L - p), d = new Float32Array(n * 2); d.set(c0.subarray(p, p + n), 0); d.set(c1.subarray(p, p + n), n);
          const ad = new AudioData({ format: 'f32-planar', sampleRate: 48000, numberOfFrames: n, numberOfChannels: 2, timestamp: Math.round(p * 1e6 / 48000), data: d }); aenc.encode(ad); ad.close();
          if (aenc.encodeQueueSize > 20) await sleep(1); } }
      await aenc.flush(); aenc.close(); if (encErr) throw new Error(encErr);
      // ② hình
      st.phase = 'vẽ hình'; st.n = N; const t0 = performance.now();
      const venc = new VideoEncoder({ output: (c, m) => muxer.addVideoChunk(c, m), error: e => { encErr = String(e); } }); venc.configure(vcfg);
      for (let i = 0; i < N; i++) { f.step(Math.min(i / fps, dur - 1e-4));
        const vf = new VideoFrame(cv, { timestamp: Math.round(i * 1e6 / fps), duration: Math.round(1e6 / fps), visibleRect: { x: 0, y: 0, width: W, height: H } });
        venc.encode(vf, { keyFrame: i % (fps * 2) === 0 }); vf.close(); st.i = i + 1;   // khung khoá mỗi 2s → tua nhanh
        while (venc.encodeQueueSize > 6) await sleep(2);
        if (encErr) throw new Error(encErr);
        if (i % 4 === 3) await sleep(0); }   // nhả luồng cho CDP hỏi tiến độ
      await venc.flush(); venc.close(); if (encErr) throw new Error(encErr);
      muxer.finalize();
      const bytes = target.buffer, drawS = (performance.now() - t0) / 1000;
      st.phase = 'gửi file';
      const r = await fetch(o.up, { method: 'POST', body: bytes }); if (!r.ok) throw new Error('gửi file lỗi ' + r.status);
      st.info = { id, w: W, h: H, fps, dur: +dur.toFixed(3), frames: N, bytes: bytes.byteLength, vcodec: vcfg.codec + ' ' + vcfg.hardwareAcceleration, acodec: acfg.codec, sfx: mx.nS, mus: mx.nM, miss: mx.miss, msPerFrame: Math.round(drawS * 1000 / N) };
      st.phase = 'xong'; st.done = true;
    } catch (e) { st.err = String(e && e.stack || e); st.done = true; }
    return true; };
})();
