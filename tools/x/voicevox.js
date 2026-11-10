// VOICEVOX → cắt lặng → mp3 (lamejs) → đo LUFS (BS.1770 gần đúng) + đỉnh
// node vv.js speakers                       → liệt kê giọng
// node vv.js query <speakerId> <text>       → in mora + pitch
// node vv.js make <outDir> <jobs.json>      → tạo file
const fs = require('fs'), path = require('path'), vm = require('vm');
const H = 'http://127.0.0.1:50021', SR = 44100;
const a = process.argv.slice(2);
async function j(u, o) { const r = await fetch(H + u, o); if (!r.ok) throw new Error(u + ' ' + r.status + ' ' + await r.text()); return r; }
async function query(sp, text) { return (await j(`/audio_query?speaker=${sp}&text=${encodeURIComponent(text)}`, { method: 'POST' })).json(); }
function wavPcm(buf) { // 16-bit mono
  let i = 12, fmt, data; while (i < buf.length) { const id = buf.toString('ascii', i, i + 4), n = buf.readUInt32LE(i + 4); if (id === 'fmt ') fmt = buf.slice(i + 8, i + 8 + n); if (id === 'data') data = buf.slice(i + 8, i + 8 + n); i += 8 + n + (n & 1); }
  const ch = fmt.readUInt16LE(2), sr = fmt.readUInt32LE(4), N = data.length / 2 / ch, x = new Float32Array(N);
  for (let k = 0; k < N; k++) x[k] = data.readInt16LE(k * 2 * ch) / 32768; return { x, sr };
}
function trim(x, sr, thrDb = -42, pad = 0.03) {
  const w = Math.round(sr * 0.01), thr = Math.pow(10, thrDb / 20); let s = 0, e = x.length;
  const loud = k => { let m = 0; for (let t = k; t < Math.min(k + w, x.length); t++) m = Math.max(m, Math.abs(x[t])); return m > thr; };
  while (s < x.length && !loud(s)) s += w; while (e > 0 && !loud(Math.max(0, e - w))) e -= w;
  s = Math.max(0, s - Math.round(pad * sr)); e = Math.min(x.length, e + Math.round(pad * 2 * sr));
  const y = x.slice(s, e), fi = Math.round(0.008 * sr), fo = Math.round(0.06 * sr);
  for (let k = 0; k < fi && k < y.length; k++) y[k] *= k / fi; for (let k = 0; k < fo && k < y.length; k++) y[y.length - 1 - k] *= k / fo;
  return y;
}
function biquad(x, b, a_) { const y = new Float64Array(x.length); let x1 = 0, x2 = 0, y1 = 0, y2 = 0; for (let n = 0; n < x.length; n++) { const v = b[0] * x[n] + b[1] * x1 + b[2] * x2 - a_[1] * y1 - a_[2] * y2; x2 = x1; x1 = x[n]; y2 = y1; y1 = v; y[n] = v; } return y; }
function lufs(x, fs_) { // BS.1770-4 (pyloudnorm-style coefficients)
  let G = 3.999843853973347, Q = 0.7071752369554196, fc = 1681.974450955533, K = Math.tan(Math.PI * fc / fs_), Vh = Math.pow(10, G / 20), Vb = Math.pow(Vh, 0.4996667741545416);
  let a0 = 1 + K / Q + K * K; const b1 = [(Vh + Vb * K / Q + K * K) / a0, 2 * (K * K - Vh) / a0, (Vh - Vb * K / Q + K * K) / a0], a1 = [1, 2 * (K * K - 1) / a0, (1 - K / Q + K * K) / a0];
  Q = 0.5003270373238773; fc = 38.13547087602444; K = Math.tan(Math.PI * fc / fs_);
  const b2 = [1, -2, 1], a2 = [1, 2 * (K * K - 1) / (1 + K / Q + K * K), (1 - K / Q + K * K) / (1 + K / Q + K * K)];
  const y = biquad(biquad(x, b1, a1), b2, a2), bl = Math.round(0.4 * fs_), hop = Math.round(0.1 * fs_), z = [];
  for (let s = 0; s + bl <= y.length; s += hop) { let m = 0; for (let k = s; k < s + bl; k++) m += y[k] * y[k]; z.push(m / bl); }
  if (!z.length) { let m = 0; for (const v of y) m += v * v; z.push(m / y.length); }
  const L = v => -0.691 + 10 * Math.log10(v); let g = z.filter(v => L(v) > -70); const rel = L(g.reduce((p, v) => p + v, 0) / g.length) - 10; g = g.filter(v => L(v) > rel);
  return L(g.reduce((p, v) => p + v, 0) / g.length);
}
function mp3(x, sr, kbps = 128) {
  const lib = fs.readFileSync('D:/tools/voicevox/lib/lame.min.js', 'utf8'), ctx = { console, Int8Array, Int16Array, Int32Array, Float32Array, Float64Array, Uint8Array, Math, Array };
  vm.createContext(ctx); vm.runInContext(lib + ';this.L=lamejs;', ctx); const enc = new ctx.L.Mp3Encoder(1, sr, kbps), out = [];
  const i16 = new Int16Array(x.length); for (let k = 0; k < x.length; k++) i16[k] = Math.max(-32768, Math.min(32767, Math.round(x[k] * 32767)));
  for (let k = 0; k < i16.length; k += 1152) { const b = enc.encodeBuffer(i16.subarray(k, k + 1152)); if (b.length) out.push(Buffer.from(b)); }
  const f = enc.flush(); if (f.length) out.push(Buffer.from(f)); return Buffer.concat(out);
}
(async () => {
  if (a[0] === 'speakers') { for (const s of await (await j('/speakers')).json()) console.log(s.name, s.styles.map(t => t.name + ':' + t.id).join(' ')); return; }
  if (a[0] === 'policy') { const s = (await (await j('/speakers')).json()).find(s => s.name === a[1]); const i = await (await j('/speaker_info?speaker_uuid=' + s.speaker_uuid)).json(); console.log(i.policy); return; }
  if (a[0] === 'query') { const q = await query(+a[1], a[2]); for (const p of q.accent_phrases) console.log('acc', p.accent, p.moras.map(m => m.text + ':' + m.pitch.toFixed(2)).join(' '), p.pause_mora ? '| pause ' + p.pause_mora.vowel_length : ''); return; }
  if (a[0] === 'make') {
    const out = a[1], jobs = JSON.parse(fs.readFileSync(a[2], 'utf8'));
    for (const jb of jobs) {
      const q = await query(jb.sp, jb.text); Object.assign(q, { prePhonemeLength: 0.05, postPhonemeLength: 0.15, outputSamplingRate: SR, outputStereo: false }, jb.q || {});
      if (jb.kana) q.accent_phrases = await (await j(`/accent_phrases?speaker=${jb.sp}&is_kana=true&text=${encodeURIComponent(jb.kana)}`, { method: 'POST' })).json();
      if (jb.pause != null) for (const p of q.accent_phrases) if (p.pause_mora) p.pause_mora.vowel_length = jb.pause;
      if (jb.accent) jb.accent.forEach((v, i) => { if (q.accent_phrases[i] && v) q.accent_phrases[i].accent = v; });
      if (jb.accent) { const r = await j(`/mora_pitch?speaker=${jb.sp}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(q.accent_phrases) }); q.accent_phrases = await r.json(); }
      if (jb.pitchMul) for (const p of q.accent_phrases) for (const m of p.moras) if (m.pitch > 0) m.pitch += jb.pitchMul; // dời cao độ tuyệt đối (ln Hz)
      const wav = Buffer.from(await (await j(`/synthesis?speaker=${jb.sp}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(q) })).arrayBuffer());
      const { x, sr } = wavPcm(wav); let y = trim(x, sr);
      let pk = 0; for (const v of y) pk = Math.max(pk, Math.abs(v)); const gain = Math.pow(10, -1 / 20) / pk; for (let k = 0; k < y.length; k++) y[k] *= gain; // chuẩn đỉnh -1 dBFS
      const m = mp3(y, sr); fs.writeFileSync(path.join(out, jb.key + '.mp3'), m); fs.writeFileSync(path.join(out, jb.key + '.wav'), wav);
      let pk2 = 0; for (const v of y) pk2 = Math.max(pk2, Math.abs(v));
      console.log(`${jb.key} dài ${(y.length / sr).toFixed(2)}s · ${m.length} byte · SND_LUFS ${jb.key}:[${lufs(y, sr).toFixed(1)},${(20 * Math.log10(pk2)).toFixed(1)}] · sr ${sr}`);
      console.log('   ' + q.accent_phrases.map(p => p.moras.map(mm => mm.text + ':' + mm.pitch.toFixed(2)).join(' ')).join(' | '));
    }
  }
})().catch(e => { console.error('LỖI', e.message); process.exit(1); });
