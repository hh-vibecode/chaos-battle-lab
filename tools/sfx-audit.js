// 🔊 SOÁT TIẾNG CỦA PHIM — mỗi tiếng trong lịch tiếng 1 dòng: khung hình ĐÚNG lúc kêu + sóng âm (vạch "kêu thật" = onset) + cờ lỗi.
// Mac: node + playwright + ffmpeg. Chạy trong repo:  node tools/sfx-audit.js l2e3 <scratchpad>/audit  [--from 0 --to 20] [--skip ep3_blip]
// Cờ lỗi:
//   ❌ CHƯA KHAI   key không có trong AUDIO_SAMPLES → phim/video bị CÂM ở nhịp đó (từng dính: 7 tiếng ep3_* có file mà quên khai)
//   ⏱️ TRỄ x s     file có khoảng lặng đầu → tiếng kêu muộn hơn hình x giây → dời lịch sớm lên đúng x
//   🗣️ CÓ GIỌNG    nghi có giọng người (anh rất ghét giọng lạ: tiếng cười nữ, voice trong sound sharingan…) → nghe lại / đổi
//   👥 CHỒNG       có tiếng khác bắt đầu trong vòng 0.15s → vi phạm "mỗi nhịp 1 tiếng"
//   📏 CHƯA ĐO     chưa có trong SND_LUFS → độ to lệch các tiếng khác
// Ra: <out>/audit_01.png… (Read từng tấm) + audit.json. Phim hỗ trợ: war, l2e2, l2e3 (thêm vào FILMS) + mọi phim cine-kit (gõ id).
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..');
const A = process.argv.slice(2), film = A[0] || 'l2e3', OUT = path.resolve(A[1] || 'sfx-audit');
const opt = (k, d) => { const i = A.indexOf(k); return i >= 0 ? A[i + 1] : d; };
const T0 = +opt('--from', 0), T1 = +opt('--to', 1e9), SKIP = new Set((opt('--skip', '') || '').split(',').filter(Boolean));
const FILMS = { war: { play: 'playCineWar', step: '_cineWarStep', canvas: '_cineWarCanvas', info: '_cineWarInfo' },
  l2e2: { play: 'playCineL2E2', step: '_cineL2E2Step', canvas: '_cineL2E2Canvas', info: '_cineL2E2Info', ready: '_cineL2E2Ready' },
  l2e3: { play: 'playCineL2E3', step: '_cineL2E3Step', canvas: '_cineL2E3Canvas', info: '_cineL2E3Info', ready: '_cineL2E3Ready' },
  l2e4: { play: 'playCineL2E4', step: '_cineL2E3Step', canvas: '_cineL2E3Canvas', info: '_cineL2E3Info', ready: '_cineL2E3Ready' } };
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.ogg': 'audio/ogg', '.woff2': 'font/woff2', '.ttf': 'font/ttf' };
// phân tích 1 file tiếng: độ dài, onset (vượt mức -12dB so với đỉnh), đỉnh, tỉ lệ khung "có cao độ giọng người"
function analyze(file) {
  const raw = execFileSync('ffmpeg', ['-v', 'error', '-i', file, '-ac', '1', '-ar', '16000', '-f', 's16le', '-'], { maxBuffer: 1 << 28 });
  const x = new Float32Array(raw.length / 2); for (let i = 0; i < x.length; i++) x[i] = raw.readInt16LE(i * 2) / 32768;
  const n = 320, env = []; for (let i = 0; i + n <= x.length; i += n) { let s = 0; for (let k = 0; k < n; k++) s += x[i + k] * x[i + k]; env.push(Math.sqrt(s / n)); }
  const mx = Math.max(...env, 1e-9), on = env.findIndex(v => 20 * Math.log10(v / mx) > -12), pk = env.indexOf(mx);
  let voiced = 0, loud = 0; const W = 640;   // giọng người: tự tương quan mạnh ở chu kỳ 85–400 Hz trên khung đủ to
  for (let i = 0; i + W <= x.length; i += W) { let e = 0; for (let k = 0; k < W; k++) e += x[i + k] * x[i + k]; if (Math.sqrt(e / W) < mx * 0.25) continue; loud++;
    let best = 0; for (let lag = 40; lag <= 188; lag += 2) { let c = 0; for (let k = 0; k < W - lag; k++) c += x[i + k] * x[i + k + lag]; best = Math.max(best, c / e); } if (best > 0.55) voiced++; }
  return { dur: x.length / 16000, onset: Math.max(0, on) * 0.02, peak: pk * 0.02, env: env.map(v => +(v / mx).toFixed(3)), voice: loud ? voiced / loud : 0 };
}
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const srv = http.createServer((q, r) => { const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0])).replace(/\/$/, '/index.html');
    fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); r.end(d); }); });
  await new Promise(r => srv.listen(0, '127.0.0.1', r));
  const b = await chromium.launch({ args: ['--enable-gpu', '--use-angle=metal', '--ignore-gpu-blocklist'] }); const p = await b.newPage({ viewport: { width: 720, height: 1280 } });
  await p.goto(`http://127.0.0.1:${srv.address().port}/?v=${Date.now()}`); await p.waitForFunction(() => !document.getElementById('bootScreen'), null, { timeout: 180000 });
  let FM = FILMS[film];
  if (!FM) { await p.evaluate(async id => { await playCineKit(id, { offline: true, scale: 0.4 }); const f = CineKit.films[id]; window.__s = f.step; window.__c = f.canvas; window.__i = f.info; window.__r = f.ready; }, film); FM = { step: '__s', canvas: '__c', info: '__i', ready: '__r' }; }
  else await p.evaluate(FM => window[FM.play]({ offline: true, scale: 0.4 }), FM);
  await p.waitForFunction(FM => window[FM.step] && window[FM.canvas] && window[FM.canvas]() && (!FM.ready || window[FM.ready]()), FM, { timeout: 120000 }); await p.waitForTimeout(800);
  const meta = await p.evaluate(FM => { const I = window[FM.info](); const src = {}, lufs = {};
    for (const s of I.sfx) { const a = (typeof AUDIO_SAMPLES !== 'undefined') && AUDIO_SAMPLES[s[1]];   /* const ở top-level → không nằm trên window */ src[s[1]] = a ? new URL(a.src).pathname : null; lufs[s[1]] = !!(typeof SND_LUFS !== 'undefined' && SND_LUFS[s[1]]); }
    return { sfx: I.sfx, src, lufs }; }, FM);
  const rows = meta.sfx.filter(s => s[0] >= T0 && s[0] <= T1 && !SKIP.has(s[1])).sort((a, b) => a[0] - b[0]);
  const AN = {}; for (const k of new Set(rows.map(r => r[1]))) { const pth = meta.src[k]; AN[k] = pth && fs.existsSync(path.join(ROOT, pth)) ? analyze(path.join(ROOT, pth)) : null; }
  const report = rows.map((r, i) => { const [t, k, v, d] = r, a = AN[k], fl = [];
    if (!meta.src[k]) fl.push('❌ CHƯA KHAI'); if (!meta.lufs[k] && meta.src[k]) fl.push('📏 CHƯA ĐO');
    if (a && a.onset > 0.12) fl.push(`⏱️ TRỄ ${a.onset.toFixed(2)}s`); if (a && a.voice > 0.35) fl.push(`🗣️ CÓ GIỌNG? ${(a.voice * 100) | 0}%`);
    const near = rows.filter((q, j) => j !== i && Math.abs(q[0] - t) < 0.15).map(q => q[1]); if (near.length) fl.push('👥 CHỒNG: ' + near.join(','));
    return { t: +t.toFixed(2), key: k, vol: v, dur: d || null, flags: fl, an: a ? { dur: +a.dur.toFixed(2), onset: +a.onset.toFixed(2), peak: +a.peak.toFixed(2), voice: +a.voice.toFixed(2) } : null }; });
  fs.writeFileSync(path.join(OUT, 'audit.json'), JSON.stringify(report, null, 1));
  // khung hình đúng lúc kêu (lùi 0.02s để thấy hình ngay trước/đúng nhịp)
  const thumbs = []; for (const r of rows) { thumbs.push(await p.evaluate(({ FM, t }) => { for (let s = Math.max(0, t - 0.4); s < t; s += 1 / 30) window[FM.step](s); window[FM.step](t);
      const c = window[FM.canvas](), k = document.createElement('canvas'); k.width = 135; k.height = Math.round(135 * c.height / c.width); k.getContext('2d').drawImage(c, 0, 0, k.width, k.height); return k.toDataURL('image/jpeg', 0.8); }, { FM, t: r[0] })); }
  const PER = 10; let page = 0;
  for (let i0 = 0; i0 < rows.length; i0 += PER) { page++;
    const png = await p.evaluate(({ part, thumbs, AN }) => new Promise(async res => {
      const RH = 250, Wd = 1500, c = document.createElement('canvas'); c.width = Wd; c.height = RH * part.length; const g = c.getContext('2d'); g.fillStyle = '#111'; g.fillRect(0, 0, Wd, c.height);
      for (let j = 0; j < part.length; j++) { const r = part[j], y = j * RH, a = AN[r.key];
        const im = new Image(); im.src = thumbs[j]; await im.decode(); g.drawImage(im, 8, y + 6, im.width, Math.min(im.height, RH - 12));
        g.fillStyle = r.flags.length ? '#ffcc33' : '#7CFC00'; g.font = 'bold 20px sans-serif'; g.fillText(`${r.t.toFixed(2)}s  ${r.key}  vol ${r.vol}${r.dur ? '  cắt ' + (+r.dur).toFixed(2) + 's' : ''}`, 160, y + 28);
        g.font = '17px sans-serif'; g.fillStyle = '#ff6b6b'; g.fillText(r.flags.join('   ') || '✅ ổn', 160, y + 54);
        if (a) { g.fillStyle = '#9ad'; g.fillText(`dài ${a.dur.toFixed(2)}s · kêu thật ở ${a.onset.toFixed(2)}s · đỉnh ${a.peak.toFixed(2)}s · giọng ${(a.voice * 100) | 0}%`, 160, y + 78);
          const X0 = 160, X1 = Wd - 20, Y0 = y + 92, H = RH - 104, secs = Math.min(6, Math.max(1.5, a.dur)), px = (X1 - X0) / secs;
          g.strokeStyle = '#333'; for (let s = 0; s <= secs; s += 0.5) { g.beginPath(); g.moveTo(X0 + s * px, Y0); g.lineTo(X0 + s * px, Y0 + H); g.stroke(); if (s % 1 === 0) { g.fillStyle = '#666'; g.fillText(s + 's', X0 + s * px + 2, Y0 + H - 2); } }
          g.fillStyle = '#4fc3f7'; a.env.forEach((v, k) => { const x = X0 + k * 0.02 * px; if (x > X1) return; g.fillRect(x, Y0 + H / 2 - v * H / 2, Math.max(1, 0.02 * px), v * H); });
          g.fillStyle = '#ff4081'; g.fillRect(X0 + a.onset * px - 1, Y0, 3, H);   // vạch đỏ = lúc kêu thật
          if (r.dur) { g.fillStyle = 'rgba(255,255,255,0.25)'; g.fillRect(X0 + r.dur * px, Y0, 3, H); } }
        g.fillStyle = '#222'; g.fillRect(0, y + RH - 2, Wd, 2); }
      res(c.toDataURL('image/png').split(',')[1]); }), { part: report.slice(i0, i0 + PER), thumbs: thumbs.slice(i0, i0 + PER), AN: Object.fromEntries(Object.entries(AN).map(([k, v]) => [k, v && { ...v }])) });
    fs.writeFileSync(path.join(OUT, `audit_${String(page).padStart(2, '0')}.png`), Buffer.from(png, 'base64')); }
  for (const r of report) console.log(`${r.t.toFixed(2).padStart(6)}s ${r.key.padEnd(18)} ${r.flags.join(' | ') || '✅'}`);
  console.log(`\n🖼️ ${page} tấm: ${OUT}/audit_*.png · chi tiết: audit.json`);
  await b.close(); srv.close();
})();
