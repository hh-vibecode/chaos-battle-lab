// 🎼 BẢN ĐỒ Ô NHỊP của 1 bản nhạc (từ JSON của music-analyze.html): nốt bass mỗi phách → tìm PHÁCH ĐẦU Ô (4/4) → nốt gốc từng ô nhịp
//    + độ to mỗi ô. In dạng dòng 4 ô / hàng (1 vòng hợp âm) để so các bản cover: cùng vòng D C B A# = xếp chồng được.
//   node tools/x/music-bars.js <a.json> [b.json …] [--bpb 4]
const fs = require('fs'), args = process.argv.slice(2).filter(a => !a.startsWith('--')), BPB = 4, PC = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
for (const f of args) {
  const r = JSON.parse(fs.readFileSync(f)), B = r.bassBeats, nb = B.length;
  // phách đầu ô = pha (0..3) mà nốt bass ĐỔI nhiều nhất ngay tại phách đó (hợp âm đổi đầu ô)
  const chg = B.map((c, i) => i ? c.reduce((s, v, k) => s + Math.abs(v - B[i - 1][k]), 0) : 0);
  const ph = [0, 1, 2, 3].map(p => { let s = 0; for (let i = p; i < nb; i += BPB) s += chg[i]; return s; }), p0 = ph.indexOf(Math.max(...ph));
  const bars = []; for (let i = p0; i + BPB <= nb; i += BPB) { const c = new Array(12).fill(0); for (let k = 0; k < BPB; k++) B[i + k].forEach((v, j) => c[j] += v);
    const root = c.indexOf(Math.max(...c)), conf = c[root] / (c.reduce((a, b) => a + b, 0) || 1); bars.push({ t: r.bt[i], root: PC[root] + (conf < 0.2 ? '?' : '') }); }
  console.log(`== ${f.split(/[\\/]/).pop()}  ${r.dur}s  phách đầu ô = phách ${p0} (${r.bt[p0]}s)  [điểm pha ${ph.map(v => v.toFixed(0)).join('/')}]`);
  for (let i = 0; i < bars.length; i += 4) { const row = bars.slice(i, i + 4);
    const dB = row.map(b => r.loud[Math.floor(b.t)] ?? '').join(','); console.log(`  ${row[0].t.toFixed(1).padStart(6)}s  ${row.map(b => b.root.padEnd(3)).join(' ')}   dB ${dB}`); }
}
