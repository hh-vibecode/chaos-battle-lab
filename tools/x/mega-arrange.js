// Bản phối Megalovania v4 (20/11 tối) → tools/x/_ref/mega/plan.json → trộn: Mac `python3 tools/x/music-mix.py tools/x/_ref/mega/plan.json <ra.wav>`
//   (Windows: tools/x/music-mix.html?plan=… — cùng định dạng plan).  Chạy: node tools/x/mega-arrange.js
// Nhạc nguồn KHÔNG có trong repo: xem docs/notes/viec-do-megalovania.md mục Nguồn (link YouTube để tải lại).
//
// ⛔ LUẬT (anh 20/11 "nhạc lộn xộn, không theo đúng bài"): MỌI BẢN TRONG 1 HÀNG PHẢI CHƠI CÙNG 1 ĐOẠN CỦA BÀI.
//   Mỗi hàng ghi 1 NHÃN đoạn (riff / B1… / C1…), bảng LAB cho biết nhãn đó là vòng số mấy trong từng bản (đo bằng chroma giai điệu
//   400–2200 Hz: tools/x/music-check.py --map). Bản nào không có đoạn đó → nghỉ, KHÔNG lấy vòng khác bù vào.
//   v1–v3 chọn số vòng riêng từng bản (music-match so cả dải → vòng nào cũng ra 4 hợp âm D C B B♭ giống nhau) ⇒ 2–3 đoạn chồng nhau.
// Anh 20/11: phần đầu đến lượt con nào vào / được giới thiệu thì các con khác NHỎ LẠI cho nhạc cụ con đó rõ lên.
const fs = require('fs'), path = require('path');
const BPM = 119.717, C = 8 * 120 / BPM;            // tempo THẬT các bản (vòng 8.0189s)
// gốc vòng = giây đầu riff của từng bản (đo 20/11 trên file tải từ YouTube, xem note). Trống: vòng k = ORG.drum + k·C (k1–2 chỉ có nhạc gốc, trống vào từ k3).
const ORG = { drum: -0.368, sax: 0.425, piano: 5.702, guitar: 0.308, violin: 4.337 };
// nhãn đoạn → vòng của từng bản. Cấu trúc bài (theo piano): riff×4 · B1 B2 B3 B4 B3 B4 · C1 C2 C1' C3 · D×4 (sax / violin không có) · riff kết.
const LAB = {
  R1a: { drum: 1, sax: 0, piano: 0, guitar: 0, violin: 0 },
  R1b: { drum: 2, sax: 1, piano: 1, guitar: 1, violin: 1 },
  R2a: { drum: 3, sax: 2, piano: 2, guitar: 2, violin: 2 },
  R2b: { drum: 4, sax: 3, piano: 3, guitar: 3, violin: 3 },
  B1:  { drum: 5, sax: 4, piano: 4, guitar: 4, violin: 4 },
  B2:  { drum: 6, sax: 5, piano: 5, guitar: 5, violin: 5 },
  B3:  { drum: 7, sax: 6, piano: 6, guitar: 6, violin: 6 },
  B4:  { drum: 8, sax: 7, piano: 7, guitar: 7, violin: 7 },
  B3r: { drum: 9, sax: 6, piano: 8, guitar: 8, violin: 8 },   // B3 B4 lặp lại trong bài (sax bỏ đoạn lặp → dùng lại vòng B3 / B4 của nó)
  B4r: { drum: 10, sax: 7, piano: 9, guitar: 9, violin: 9 },
  C1:  { drum: 11, sax: 8, piano: 10, guitar: 10, violin: 10 },
  C2:  { drum: 12, sax: 9, piano: 11, guitar: 11, violin: 11 },
  C3:  { drum: 13, sax: 10, piano: 12, guitar: 12, violin: 12 },
  C4:  { drum: 14, sax: 11, piano: 13, guitar: 13, violin: 13 },
};
// ⚠️ đoạn kết thật của bài (trống k19–21, piano 18–19, guitar 18) sax + violin KHÔNG có → kết bằng riff cả ban + 1 phách hợp âm chung (phách 1 của B1, mọi bản) + sấm.
const TR = ['drum', 'sax', 'piano', 'guitar', 'violin'];
// độ to (dB) so với mức chuẩn sau khi CÂN (music-mix.py đo RMS từng đoạn nguồn rồi đưa về cùng mức `lvl`)
const BASE = { drum: -1, sax: 0, piano: 0, guitar: -1, violin: -1 }, PAN = { drum: 0, sax: 0, piano: 0.3, guitar: -0.3, violin: 0.12 };
const LEAD = 4, DUCK = -7, SOLO_BG = -8;          // dB: con được giới thiệu to lên · các con khác nhỏ lại · nền dưới solo
// hàng: [tên, nhãn, bản chơi, con nổi bật (vào / giới thiệu), kiểu]
//   nổi bật = 1 tên hoặc mảng (cùng lúc) · {bars:[…]} = mỗi ô nhịp (2s) 1 con (hàng 'dồn lên', phim quay từng con 1 ô)
const A = [
  ['P1 Sans mở đầu',       'R1a', ['sax'],                                   null],
  ['P1 + Bongo + Piano',   'R2a', ['drum', 'sax', 'piano'],                  ['piano', '=drum']],   // '=x' = giữ mức thường (trống vào cùng lúc nhưng bản trống có cả nhạc gốc → không đẩy lên kẻo lấn piano)
  ['P1 + Guitar',          'R2b', ['drum', 'sax', 'piano', 'guitar'],        'guitar'],
  ['P1 dồn lên',           'R2a', ['drum', 'sax', 'piano', 'guitar'],        { bars: ['sax', 'drum', 'piano', 'guitar'] }],
  ['P1 + 2 Violin (đỉnh)', 'B1',  TR,                                        'violin'],
  ['P1 TUTTI sân khấu',    'B2',  TR, null],
  ['P1 TUTTI',             'B3',  TR, null],
  ['P1 TUTTI',             'B4',  TR, null],
  ['P1 TUTTI',             'B3r', TR, null],
  ['P2 nghỉ — Sans',       'B4r', ['drum', 'sax'],                           'sax', 'solo'],
  ['P2 SOLO violin',       'C1',  ['drum', 'violin'],                        'violin', 'solo'],
  ['P2 SOLO violin',       'C2',  ['drum', 'violin'],                        'violin', 'solo'],
  ['P2 SOLO guitar',       'C3',  ['drum', 'guitar'],                        'guitar', 'solo'],
  ['P2 SOLO guitar',       'C4',  ['drum', 'guitar'],                        'guitar', 'solo'],
  ['P2 TUTTI',             'B1',  TR, null],
  ['P2 TUTTI',             'B2',  TR, null],
  ['P2 TUTTI',             'B3',  TR, null],
  ['P2 TUTTI',             'B4',  TR, null],
  ['P2 KẾT riff',          'R2a', TR, null],
  ['P2 KẾT riff',          'R2b', TR, null],
];
const T0 = 12.5, CB = 16, LVL = -20, RAMP = 0.25;
const plan = { dur: T0 + A.length * C + 5, bpm: BPM, t0: T0, snapRange: 0.03, snapRate: 0,
  tracks: { drum: 'tools/x/_ref/mega/drum.mp3', sax: 'tools/x/_ref/mega/sax.mp3', piano: 'tools/x/_ref/mega/piano.mp3', guitar: 'tools/x/_ref/mega/guitarfull.mp3', violin: 'tools/x/_ref/mega/violin.mp3',
    grim: 'tools/x/_ref/mega/piano2.mp3', rain: 'assets/audio/dp_rain.mp3', thunder: 'assets/audio/thunder_big.mp3' },
  clips: [], free: [], master: { gain: 1, comp: true }, rows: [] };
// dB của 1 bản ở hàng k (hoặc ở ô nhịp b của hàng k)
function dbAt(trk, k, b) { const row = A[k], hi = row[3], solo = row[4] === 'solo';
  let who = hi && hi.bars ? [hi.bars[b]] : hi == null ? [] : [].concat(hi);
  if (!who.length) return BASE[trk];
  if (who.includes('=' + trk)) return BASE[trk];
  if (who.includes(trk)) return BASE[trk] + (solo ? 2 : LEAD);
  return BASE[trk] + (solo ? SOLO_BG : DUCK); }
for (const trk of TR) { let cur = null;
  A.forEach((row, k) => { const ci = row[2].includes(trk) ? LAB[row[1]][trk] : null;
    if (ci == null) { cur = null; return; }
    if (cur && cur.next === ci && cur.k + cur.n === k) { cur.n++; cur.next++; cur.clip.beats += CB; }
    else { const clip = { trk, src: +(ORG[trk] + C * ci).toFixed(3), beat: k * CB, beats: CB, lvl: LVL, gain: 1, pan: PAN[trk], fi: 0.006, fo: 0.02, env: [] };
      plan.clips.push(clip); cur = { clip, next: ci + 1, k, n: 1 }; }
    // đường âm lượng: mỗi ô nhịp (2s) 1 mức, đổi mức trong RAMP giây ở đầu ô
    const t0 = (k - cur.k) * C;
    for (let b = 0; b < 4; b++) { const g = Math.pow(10, dbAt(trk, k, b) / 20), a = t0 + b * C / 4;
      cur.clip.env.push([+(a).toFixed(3), g], [+(a + RAMP).toFixed(3), g]); } }); }
// tránh RAMP ngược: điểm đầu mỗi ô = mức của ô TRƯỚC (đổi mức trơn trong RAMP giây)
for (const cl of plan.clips) { const e = cl.env; for (let i = 2; i < e.length; i += 2) e[i][1] = e[i - 1][1]; }
plan.rows = A.map((r, k) => ({ k, name: r[0], lab: r[1], at: +(T0 + k * C).toFixed(3), play: r[2], src: Object.fromEntries(r[2].map(t => [t, +(ORG[t] + C * LAB[r[1]][t]).toFixed(3)])) }));
// intro tự do: mưa + piano Grim Cat (nhịp tự do) + sấm đúng phách 0; đuôi: phách 1 của B1 ở MỌI bản cùng lúc (hợp âm kết chung) rồi tắt dần
plan.free.push({ trk: 'rain', src: 0, at: 0, dur: T0 + 6, gain: 0.5, fi: 1.5, fo: 4 });
plan.free.push({ trk: 'grim', src: 3.0, at: 0.6, dur: T0 - 0.6, lvl: LVL - 2, gain: 1, fi: 0.4, fo: 2.2 });
plan.free.push({ trk: 'thunder', src: 0, at: T0 - 0.05, dur: 4, gain: 0.8, fi: 0.004, fo: 1.5 });
const endAt = T0 + A.length * C;
for (const trk of TR) { const src = +(ORG[trk] + C * LAB.B1[trk]).toFixed(3);
  plan.free.push({ trk, src, at: endAt, dur: 3.2, lvlRef: { src, dur: C }, lvl: LVL + BASE[trk], gain: 1, pan: PAN[trk], fi: 0.004, fo: 2.9 }); }
plan.free.push({ trk: 'thunder', src: 0, at: endAt - 0.02, dur: 4.5, gain: 0.7, fi: 0.004, fo: 2 });
fs.mkdirSync(path.join(__dirname, '_ref/mega'), { recursive: true }); fs.writeFileSync(path.join(__dirname, '_ref/mega/plan.json'), JSON.stringify(plan, null, 1));
console.log('dài', plan.dur.toFixed(1) + 's', plan.clips.length, 'khúc');
for (const r of plan.rows) console.log(' ', r.at.toFixed(1).padStart(6) + 's', r.lab.padEnd(4), r.name.padEnd(22), r.play.map(t => t + ':' + LAB[r.lab][t]).join(' '));
