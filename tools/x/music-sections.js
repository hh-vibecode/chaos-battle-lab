// 🎼 NHÃN ĐOẠN NHẠC cho nhiều bản cover cùng 1 bài (sau music-analyze.html + music-align.js --cycle):
//    cắt mỗi bản thành từng VÒNG (cycle phách, đặt đầu vòng theo pha đã đo) → vector chroma giai điệu (trừ TB từng phách) → gom vòng giống nhau
//    của MỌI bản vào chung 1 nhãn (A, B, C…) → in bản đồ đoạn của từng bản (giây đầu vòng + nhãn + độ to). Cùng nhãn = cùng đoạn giai điệu = chồng unison được.
//   node tools/x/music-sections.js --cycle 16 --thr 0.6 name=file.json:pha0 [name=file.json:pha0 …]
//     pha0 = chỉ số phách ĐẦU VÒNG đầu tiên trong bản đó (vd sax 1; bản khác = (pha0_sax − pha_lệch) mod 16).
const fs = require('fs'), args = process.argv.slice(2), opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? +args[i + 1] : d; };
const CYC = opt('--cycle', 16), THR = opt('--thr', 0.6), specs = args.filter(a => a.includes('='));
const cen = c => { const m = c.reduce((a, b) => a + b, 0) / c.length, d = c.map(x => x - m), n = Math.hypot(...d) || 1; return d.map(x => x / n); };
const items = [];
for (const s of specs) { const [name, rest] = s.split('='), ci = rest.lastIndexOf(':'), file = rest.slice(0, ci), p0 = rest.slice(ci + 1), r = JSON.parse(fs.readFileSync(file)), cb = r.chromaBeats.map(cen);
  for (let i = +p0; i + CYC <= cb.length; i += CYC) { const v = []; for (let k = 0; k < CYC; k++) v.push(...cb[i + k]); const n = Math.hypot(...v) || 1;
    const loud = r.loud[Math.floor(r.bt[i])] ?? -99; items.push({ name, t: r.bt[i], v: v.map(x => x / n), loud }); } }
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0), cl = [];
for (const it of items) { if (it.loud < -40) { it.lab = '·'; continue; } let best = -1, bc = null; for (const c of cl) { const s = dot(it.v, c.v); if (s > best) { best = s; bc = c; } }
  if (bc && best >= THR) { bc.n++; bc.v = bc.v.map((x, i) => x + (it.v[i] - x) / bc.n); it.lab = bc.lab; it.s = best; } else { const lab = String.fromCharCode(65 + cl.length % 26) + (cl.length >= 26 ? Math.floor(cl.length / 26) : ''); cl.push({ lab, v: it.v.slice(), n: 1 }); it.lab = lab; it.s = 1; } }
for (const s of specs) { const name = s.split('=')[0], row = items.filter(x => x.name === name);
  console.log(`${name.padEnd(8)} ${row.map(x => `${x.t.toFixed(0)}:${x.lab}`).join(' ')}`); }
console.log(`${cl.length} nhãn: ` + cl.map(c => `${c.lab}×${c.n}`).join(' '));
