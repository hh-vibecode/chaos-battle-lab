// 🎼 BẢN ĐỒ GHÉP NHẠC: so đặc trưng theo phách (chroma + bass từ music-analyze.html, đã TRỪ TRUNG BÌNH để bài lặp vòng hợp âm vẫn phân biệt được)
//    của 1 bản với bản tham chiếu → mỗi khúc WIN phách của bản kia ứng với phách nào của bản tham chiếu, độ giống, độ NỔI (khớp tốt nhất − khớp TB).
//   node tools/x/music-align.js <ref.json> <other.json> [--win 16] [--step 8] [--bass 1]
//   Nổi < 0.15 = không chắc (đoạn đó khác hẳn, hoặc nhạc lặp đều nên đâu cũng giống).
const fs = require('fs'), args = process.argv.slice(2), opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? +args[i + 1] : d; };
const R = JSON.parse(fs.readFileSync(args[0])), X = JSON.parse(fs.readFileSync(args[1])), WIN = opt('--win', 16), STEP = opt('--step', 8), WB = opt('--bass', 1);
const feat = r => r.chromaBeats.map((c, i) => { const b = (r.bassBeats || [])[i] || new Array(12).fill(0), v = [...c, ...b.map(x => x * WB)];
  const m = v.reduce((a, x) => a + x, 0) / v.length, d = v.map(x => x - m), n = Math.hypot(...d) || 1; return d.map(x => x / n); });
const rf = feat(R), xf = feat(X), dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
// --cycle 16: PHA VÒNG HỢP ÂM — bài lặp vòng (Megalovania: 4 ô = 16 phách) → độ lệch tính theo mod 16, cộng trung bình trên CẢ BÀI (bền hơn so từng khúc).
//   In điểm từng pha: pha p nghĩa là phách i của bản kia ≙ phách j của ref khi (j − i) ≡ p (mod 16).
const CYC = opt('--cycle', 0);
if (CYC) { const sc = new Array(CYC).fill(0), cn = new Array(CYC).fill(0);
  for (let i = 0; i < xf.length; i++) for (let j = 0; j < rf.length; j++) { const p = (((j - i) % CYC) + CYC) % CYC; sc[p] += dot(xf[i], rf[j]); cn[p]++; }
  const v = sc.map((s, p) => s / cn[p]), m = v.reduce((a, b) => a + b, 0) / CYC, sd = Math.sqrt(v.reduce((a, b) => a + (b - m) ** 2, 0) / CYC) || 1, ord = v.map((x, p) => [p, x]).sort((a, b) => b[1] - a[1]);
  console.log(`${args[1].split(/[\\/]/).pop()} vs ${args[0].split(/[\\/]/).pop()}  pha tốt nhất: ${ord.slice(0, 4).map(([p, x]) => `${p} (${((x - m) / sd).toFixed(1)}σ)`).join(' · ')}`); process.exit(0); }
const runs = [];
for (let i = 0; i + WIN <= xf.length; i += STEP) {
  let best = -9, bj = 0, sum = 0, cnt = 0;
  for (let j = 0; j + WIN <= rf.length; j++) { let s = 0; for (let k = 0; k < WIN; k++) s += dot(xf[i + k], rf[j + k]); s /= WIN; sum += s; cnt++; if (s > best) { best = s; bj = j; } }
  const off = bj - i, L = runs[runs.length - 1], pop = best - sum / cnt;
  if (L && L.off === off) { L.b = i + WIN; L.s.push(best); L.p.push(pop); } else runs.push({ off, a: i, b: i + WIN, s: [best], p: [pop] });
}
const t = (bt, k) => (bt[Math.max(0, Math.min(k, bt.length - 1))] || 0).toFixed(1), avg = a => a.reduce((x, y) => x + y, 0) / a.length;
console.log(`${args[1].split(/[\\/]/).pop()} vs ${args[0].split(/[\\/]/).pop()}  (${xf.length} / ${rf.length} phách)`);
for (const r of runs) console.log(`  ${t(X.bt, r.a).padStart(6)}-${t(X.bt, r.b).padEnd(6)}s ↔ ref ${t(R.bt, r.a + r.off).padStart(6)}-${t(R.bt, r.b + r.off).padEnd(6)}s  lệch ${String(r.off).padStart(4)} phách  giống ${avg(r.s).toFixed(2)}  nổi ${avg(r.p).toFixed(2)}`);
