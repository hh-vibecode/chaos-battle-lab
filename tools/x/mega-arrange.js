// Bản phối Megalovania v2 (20/11) → tools/x/_ref/mega/plan.json cho tools/x/music-mix.html  (node tools/x/mega-arrange.js)
// Nhạc nguồn KHÔNG có trong repo: xem docs/notes/viec-do-megalovania.md mục Nguồn.
// Mỗi hàng = 1 vòng 8s (4 ô × 2s, 120 BPM) trên lưới ra. Số = chỉ số VÒNG trong bản gốc (gốc vòng O + 8·i), null = nghỉ.
// Chọn vòng theo music-match (giống giai điệu với xương sống trống) + ưu tiên vòng LIỀN NHAU cho mượt.
const fs = require('fs'), path = require('path');
// gốc vòng: music-xcorr (độ lệch giữa các bản) + khớp lưới (plan-test, độ lệch +18.9ms/vòng ⇒ tempo thật 119.717, vòng 8.0189s).
//   Piano lấy theo xcorr (khớp lưới bắt nhầm sang nốt 1/8 của tay trái, lệch nửa phách).
const BPM = 119.717, C = 8 * 120 / BPM;
const O = { drum: 0.644, sax: 0.323, piano: 5.722, guitar: 0.286, violin: 4.367 };
const G = { drum: 0.6, sax: 0.85, piano: 0.6, guitar: 0.5, violin: 0.75 }, PAN = { drum: 0, sax: 0, piano: 0.35, guitar: -0.35, violin: 0.12 };
//        tên đoạn          trống sax piano guitar violin   hệ số to riêng
const A = [
  ['P1 Sans mở đầu',        0,   1,  null, null, null,  { drum: 0.75 }],
  ['P1 + Bongo + Piano',    1,   2,  1,    null, null],
  ['P1 + Guitar',           2,   3,  2,    3,    null],
  ['P1 dồn lên',            3,   4,  3,    4,    null],
  ['P1 + 2 Violin (đỉnh)',  4,   5,  4,    5,    5],
  ['P1 TUTTI sân khấu',     5,   5,  6,    4,    6],
  ['P1 TUTTI',              6,   6,  7,    5,    7],
  ['P1 TUTTI',              7,   5,  8,    4,    8],
  ['P1 TUTTI',              8,   6,  9,    5,    9],
  ['P2 nghỉ — Sans',        17,  0,  null, null, null,  { drum: 0.8 }],
  ['P2 SOLO violin',        9,   null, null, null, 10,  { drum: 0.45, violin: 1.25 }],
  ['P2 SOLO violin',        10,  null, null, null, 11,  { drum: 0.45, violin: 1.25 }],
  ['P2 SOLO guitar',        3,   null, null, 4,    null, { drum: 0.45, guitar: 1.3 }],
  ['P2 SOLO guitar',        4,   null, null, 5,    null, { drum: 0.45, guitar: 1.3 }],
  ['P2 TUTTI',              15,  5,  11,   3,    14],
  ['P2 TUTTI',              16,  6,  17,   4,    15],
  ['P2 KẾT riff',           18,  2,  1,    2,    3],
  ['P2 KẾT riff',           19,  3,  2,    3,    4],
];
const T0 = 12.5, CB = 16, TR = ['drum', 'sax', 'piano', 'guitar', 'violin'];
const plan = { dur: T0 + A.length * C + 5, bpm: BPM, t0: T0, snapRange: 0.025, snapRate: 0,
  tracks: { drum: 'tools/x/_ref/mega/drum.mp3', sax: 'tools/x/_ref/mega/sax.mp3', piano: 'tools/x/_ref/mega/piano.mp3', guitar: 'tools/x/_ref/mega/guitar.mp3', violin: 'tools/x/_ref/mega/violin.mp3',
    grim: 'tools/x/_ref/mega/piano2.m4a', rain: 'assets/audio/dp_rain.mp3', thunder: 'assets/audio/thunder_big.mp3' },
  clips: [], free: [], master: { gain: 1, comp: true } };
// gộp các vòng liền nhau của cùng 1 bản (cùng hệ số to) thành 1 khúc dài → không có mối nối giữa chừng
for (const trk of TR) { let cur = null;
  A.forEach((row, k) => { const ci = row[1 + TR.indexOf(trk)], mul = (row[6] && row[6][trk]) || 1;
    if (ci == null) { cur = null; return; }
    if (cur && cur.next === ci && cur.mul === mul && cur.k + cur.n === k) { cur.n++; cur.next++; cur.clip.beats += CB; return; }
    const clip = { trk, src: +(O[trk] + C * ci).toFixed(3), beat: k * CB, beats: CB, gain: +(G[trk] * mul).toFixed(3), pan: PAN[trk], fi: 0.006, fo: 0.02 };
    plan.clips.push(clip); cur = { clip, next: ci + 1, mul, k, n: 1 }; }); }
// intro tự do: mưa + piano Grim Cat (nhịp tự do) + sấm đúng phách 0; đuôi: nốt kết của bản trống (sau vòng 19)
plan.free.push({ trk: 'rain', src: 0, at: 0, dur: T0 + 6, gain: 0.5, fi: 1.5, fo: 4 });
plan.free.push({ trk: 'grim', src: 3.0, at: 0.6, dur: T0 - 0.6, gain: 1.6, fi: 0.4, fo: 2.2 });
plan.free.push({ trk: 'thunder', src: 0, at: T0 - 0.05, dur: 4, gain: 0.8, fi: 0.004, fo: 1.5 });
const endAt = T0 + A.length * C;
plan.free.push({ trk: 'drum', src: O.drum + C * 20, at: endAt, dur: 4.5, gain: G.drum, fi: 0.006, fo: 1.2 });
plan.free.push({ trk: 'thunder', src: 0, at: endAt - 0.02, dur: 4.5, gain: 0.7, fi: 0.004, fo: 2 });
fs.mkdirSync(path.join(__dirname, '_ref/mega'), { recursive: true }); fs.writeFileSync(path.join(__dirname, '_ref/mega/plan.json'), JSON.stringify(plan, null, 1));
console.log('dài', plan.dur.toFixed(1) + 's', plan.clips.length, 'khúc');
for (const c of plan.clips) console.log(' ', c.trk.padEnd(7), 'phách', String(c.beat).padStart(3), '(' + (T0 + c.beat * 60 / BPM).toFixed(1) + 's)', 'dài', (c.beats * 60 / BPM).toFixed(1) + 's', 'từ', c.src + 's', 'to', c.gain);
