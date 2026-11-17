// 🔊 KHO TIẾNG SONNISS (GDC Game Audio Bundle, royalty-free — giấy phép: D:\tools\sonniss\LICENSE-*.html|txt)
// Kho nằm NGOÀI repo (nặng ~7.5GB): D:\tools\sonniss (Windows) — đổi bằng --root <thư mục> hoặc biến SONNISS_ROOT (Mac).
//   node tools/x/sonniss-index.js                       → quét kho → <root>/index.json (đường dẫn, tên, gói, nhóm, độ dài, kênh, sr, bit)
//   node tools/x/sonniss-index.js --stats               → số gói / file, số file theo NHÓM (đánh giá độ đa dạng)
//   node tools/x/sonniss-index.js --find "explosion big" [--nhom nổ] [--min 1 --max 8] [--n 40]
//                                                       → tìm (mọi từ phải khớp tên / đường dẫn / mô tả bext); --nhom lọc theo nhóm
//   node tools/x/sonniss-index.js --mp3 <file.wav> <key> [--from 0.0] [--dur 6] [--thr -45] [--out assets/audio]
//                                                       → cắt lặng đầu + cắt ≤ dur giây + fade-out, chuẩn đỉnh -1 dBFS, mono 44.1k, mp3 128k (lamejs)
//                                                         → <out>/<key>.mp3, in dòng SND_LUFS <key>:[LUFS, đỉnh] (BS.1770 như voicevox.js)
// Windows: ELECTRON_RUN_AS_NODE=1 "D:/Microsoft VS Code/Code.exe" tools/x/sonniss-index.js ...  (hoặc tools/node.ps1)
// lamejs: D:\tools\voicevox\lib\lame.min.js (Mac: đặt LAMEJS=<đường dẫn lame.min.js>).
// File trong kho là DỮ LIỆU tải về: chỉ đọc header / mẫu âm, không chạy gì trong đó.
const fs = require('fs'), path = require('path'), vm = require('vm');
const args = process.argv.slice(2), opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; }, has = k => args.includes(k);
const ROOT = path.resolve(opt('--root', process.env.SONNISS_ROOT || 'D:/tools/sonniss')), IDX = path.join(ROOT, 'index.json');
const AUD = /\.(wav|wave|flac|ogg|mp3|aif|aiff)$/i;

// ---- NHÓM: UCS CatID ở đầu tên file (vd EXPLReal_…, WHSHSwish_…) trước, rồi từ khoá trên đường dẫn + tên ----
const UCS = { EXPL: 'nổ', FIREWORKS: 'nổ', IMPT: 'va chạm', HIT: 'va chạm', PUNCH: 'va chạm', DEST: 'phá huỷ', GLAS: 'phá huỷ', ROCK: 'phá huỷ', DEBRIS: 'phá huỷ',
  GUNS: 'vũ khí', WEAP: 'vũ khí', BULT: 'vũ khí', ARRW: 'vũ khí', BLDE: 'vũ khí', SWRD: 'vũ khí', MAGC: 'phép thuật', SCFI: 'khoa học viễn tưởng', LASR: 'khoa học viễn tưởng', ROBO: 'khoa học viễn tưởng',
  WHSH: 'vút', SWSH: 'vút', DSGN: 'thiết kế (riser/hit/drone)', DRON: 'thiết kế (riser/hit/drone)', AMB: 'môi trường', ROOM: 'môi trường', WIND: 'gió / thời tiết', WTHR: 'gió / thời tiết', RAIN: 'gió / thời tiết',
  THUN: 'gió / thời tiết', SNOW: 'gió / thời tiết', WATR: 'nước', LIQ: 'nước', FIRE: 'lửa', UI: 'giao diện', GAME: 'giao diện', USER: 'giao diện', ANML: 'sinh vật', BIRD: 'sinh vật', CREA: 'sinh vật', MNST: 'sinh vật', INSC: 'sinh vật',
  VOX: 'giọng người', HUMN: 'giọng người', CRWD: 'giọng người', FOOT: 'bước chân', FOLY: 'foley / đồ vật', CLOTH: 'foley / đồ vật', OBJ: 'foley / đồ vật', PAPR: 'foley / đồ vật', WOOD: 'foley / đồ vật', METL: 'foley / đồ vật',
  PLAS: 'foley / đồ vật', DOOR: 'foley / đồ vật', TOOL: 'foley / đồ vật', CHAIN: 'foley / đồ vật', VEH: 'xe / máy móc', AIRC: 'xe / máy móc', BOAT: 'xe / máy móc', TRN: 'xe / máy móc', MOTR: 'xe / máy móc', MACH: 'xe / máy móc',
  MECH: 'xe / máy móc', INDS: 'xe / máy móc', ELEC: 'xe / máy móc', ALRM: 'xe / máy móc', MUSC: 'nhạc / stinger', MUSI: 'nhạc / stinger', CART: 'hoạt hình', TOY: 'hoạt hình', GORE: 'máu me', NATDIS: 'phá huỷ', EARTH: 'phá huỷ' };
const KW = [['nổ', /explo|blast|bomb|detonat|grenade|nuke|firework|kaboom/i], ['phá huỷ', /destruct|debris|collapse|crumble|shatter|glass|crack|rubble|demolish|break|smash|quake|tremor|earthquake|rock ?slide/i],
  ['vũ khí', /gun|rifle|pistol|shotgun|bullet|weapon|sword|blade|katana|arrow|bow |reload|cannon|artillery|shell/i], ['va chạm', /impact|hit|punch|kick|slam|thud|body ?fall|strike|smack|bash|clash/i],
  ['phép thuật', /magic|spell|mana|enchant|fantasy|cast|curse|holy|arcane|portal/i], ['khoa học viễn tưởng', /sci-?fi|laser|plasma|robot|cyber|futur|space ?ship|hologram|teleport|energy|force ?field/i],
  ['vút', /whoosh|swoosh|swish|swipe|pass ?by|fly ?by|woosh/i], ['thiết kế (riser/hit/drone)', /riser|trailer|cinematic|braam|drone|stinger|sweeten|designed|tension|transition|boom|sub ?drop/i],
  ['gió / thời tiết', /wind|storm|thunder|rain|weather|blizzard|tornado|hurricane|hail|snow/i], ['nước', /water|splash|liquid|drip|ocean|wave|river|underwater|bubble/i], ['lửa', /fire|flame|burn|torch|lava|ember/i],
  ['môi trường', /ambien|ambience|atmos|room ?tone|forest|city|street|jungle|cave|desert|night|nature|amb[_ ]/i], ['giao diện', /\bui\b|interface|menu|button|click|notification|beep|blip|select|coin|pickup|power ?up|game ?over/i],
  ['sinh vật', /creature|monster|animal|dog|cat|bird|insect|roar|growl|dragon|beast|alien|zombie|horse|wolf|lion/i], ['giọng người', /voice|vocal|scream|shout|grunt|breath|laugh|crowd|male|female|effort|cry/i],
  ['bước chân', /footstep|foot ?step|walk|run|steps/i], ['xe / máy móc', /car|vehicle|engine|motor|truck|train|plane|aircraft|helicopter|machine|mechan|servo|hydraulic|industrial|electric|alarm/i],
  ['foley / đồ vật', /foley|cloth|paper|wood|metal|door|chain|plastic|tool|object|drawer|bag|zipper|ceramic/i], ['nhạc / stinger', /music|melod|loop ?music|piano|guitar|orchestra|choir|drum|percussion/i], ['hoạt hình', /cartoon|toon|comic|funny/i]];
function nhomOf(rel, name) {
  const m = name.match(/^([A-Z]{2,}?)(?=[A-Z][a-z])/) || name.match(/^([A-Z]{2,})_/); if (m && UCS[m[1]]) return UCS[m[1]];
  const hay = (rel + ' ' + name).replace(/[_\-.]+/g, ' '); const n = KW.find(([, re]) => re.test(name.replace(/[_\-.]+/g, ' '))) || KW.find(([, re]) => re.test(hay)); return n ? n[0] : 'khác';
}

// ---- header WAV: đọc từng chunk bằng seek (không đọc cả file) ----
function wavInfo(p) {
  let fd; try { fd = fs.openSync(p, 'r'); const st = fs.fstatSync(fd), h = Buffer.alloc(12); fs.readSync(fd, h, 0, 12, 0);
    if (h.toString('ascii', 0, 4) !== 'RIFF' && h.toString('ascii', 0, 4) !== 'RF64' || h.toString('ascii', 8, 12) !== 'WAVE') return null;
    let pos = 12, fmt = null, dataLen = null, desc = '', ds64 = null; const c = Buffer.alloc(8);
    while (pos + 8 <= st.size) { fs.readSync(fd, c, 0, 8, pos); const id = c.toString('ascii', 0, 4); let n = c.readUInt32LE(4);
      if (id === 'ds64') { const b = Buffer.alloc(Math.min(n, 28)); fs.readSync(fd, b, 0, b.length, pos + 8); ds64 = Number(b.readBigUInt64LE(8)); }
      if (id === 'fmt ') { const b = Buffer.alloc(Math.min(n, 40)); fs.readSync(fd, b, 0, b.length, pos + 8); fmt = { tag: b.readUInt16LE(0), ch: b.readUInt16LE(2), sr: b.readUInt32LE(4), align: b.readUInt16LE(12), bits: b.readUInt16LE(14) };
        if (fmt.tag === 0xFFFE && b.length >= 26) fmt.tag = b.readUInt16LE(24); }
      if (id === 'bext' && n >= 256) { const b = Buffer.alloc(256); fs.readSync(fd, b, 0, 256, pos + 8); desc = b.toString('latin1').replace(/\0[\s\S]*$/, '').trim(); }
      if (id === 'data') { dataLen = n === 0xFFFFFFFF && ds64 != null ? ds64 : Math.min(n, st.size - pos - 8); if (fmt) break; n = dataLen; }
      pos += 8 + n + (n & 1); }
    if (!fmt || dataLen == null) return null;
    return { dai: Math.round(dataLen / (fmt.align || fmt.ch * fmt.bits / 8) / fmt.sr * 100) / 100, ch: fmt.ch, sr: fmt.sr, bit: fmt.bits, ...(desc ? { moTa: desc.slice(0, 200) } : {}) };
  } catch (e) { return null; } finally { if (fd != null) fs.closeSync(fd); }
}

function walk(d, out = []) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p, out); else if (AUD.test(e.name)) out.push(p); } return out; }
const WRAP = /sonniss|gdc.*bundle|bundle.*\d+ ?of ?\d+|^_?zips?$|^raw$/i;   // thư mục vỏ của bundle — bỏ qua khi lấy tên gói

function index() {
  if (!fs.existsSync(ROOT)) throw new Error('chưa có kho ' + ROOT);
  const files = walk(ROOT), rows = [];
  for (const p of files) { const rel = path.relative(ROOT, p).split(path.sep), name = rel[rel.length - 1], dirs = rel.slice(0, -1);
    const k = dirs.findIndex(s => !WRAP.test(s)), goi = k >= 0 ? dirs[k] : (dirs[0] || '(gốc)'), w = /\.wave?$/i.test(name) ? wavInfo(p) : null;
    rows.push({ p: rel.join('/'), ten: name.replace(AUD, ''), goi, nhom: nhomOf(dirs.slice(k >= 0 ? k : 0).join('/'), name), ...(w || {}), mb: Math.round(fs.statSync(p).size / 1048576 * 10) / 10 }); }
  fs.writeFileSync(IDX, JSON.stringify({ ghiChu: 'Sinh bởi chaos-battle-lab/tools/x/sonniss-index.js — p là đường dẫn tương đối từ gốc kho', goc: ROOT, ngay: new Date(Date.now() + 7 * 3600e3).toISOString().slice(0, 16).replace('T', ' '), soFile: rows.length, file: rows }));
  console.log(`${rows.length} file → ${IDX}`); stats(rows);
}
function load() { if (!fs.existsSync(IDX)) throw new Error('chưa có ' + IDX + ' — chạy không tham số để quét trước'); return JSON.parse(fs.readFileSync(IDX, 'utf8')).file; }
function stats(rows) {
  const goi = {}, nh = {}; let gb = 0, sec = 0; for (const r of rows) { goi[r.goi] = (goi[r.goi] || 0) + 1; nh[r.nhom] = (nh[r.nhom] || 0) + 1; gb += r.mb / 1024; sec += r.dai || 0; }
  console.log(`${Object.keys(goi).length} gói · ${rows.length} file · ${gb.toFixed(2)} GB · ${(sec / 3600).toFixed(1)} giờ âm thanh`);
  console.log('Theo nhóm: ' + Object.entries(nh).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k} ${n}`).join(' · '));
  if (has('--goi')) for (const [k, n] of Object.entries(goi).sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(4)}  ${k}`);
}
function find(q) {
  const ws = q.toLowerCase().split(/\s+/).filter(Boolean), nh = opt('--nhom'), mi = +opt('--min', 0), ma = +opt('--max', 1e9), N = +opt('--n', 40);
  const hit = load().filter(r => (!nh || r.nhom.toLowerCase().includes(nh.toLowerCase())) && (r.dai == null || (r.dai >= mi && r.dai <= ma)) && ws.every(w => (r.p + ' ' + (r.moTa || '')).toLowerCase().replace(/[_\-]+/g, ' ').includes(w)));
  for (const r of hit.slice(0, N)) console.log(`${String(r.dai ?? '?').padStart(6)}s ${(r.ch || '?') + 'ch'} ${String(r.sr || '').padStart(6)} ${r.nhom.padEnd(12).slice(0, 12)} ${r.p}${r.moTa ? '  — ' + r.moTa.slice(0, 80) : ''}`);
  console.log(`${hit.length} kết quả${hit.length > N ? ` (in ${N}, thêm --n)` : ''}`);
}

// ---- đổi sang mp3 (giống voicevox.js: cắt lặng, chuẩn đỉnh -1 dBFS, lamejs, LUFS BS.1770) ----
function readPcm(p) {
  const b = fs.readFileSync(p); let i = 12, fmt, data; while (i + 8 <= b.length) { const id = b.toString('ascii', i, i + 4); let n = b.readUInt32LE(i + 4);
    if (id === 'fmt ') { fmt = { tag: b.readUInt16LE(i + 8), ch: b.readUInt16LE(i + 10), sr: b.readUInt32LE(i + 12), bits: b.readUInt16LE(i + 22) }; if (fmt.tag === 0xFFFE) fmt.tag = b.readUInt16LE(i + 32); }
    if (id === 'data') { if (n === 0xFFFFFFFF || i + 8 + n > b.length) n = b.length - i - 8; data = b.subarray(i + 8, i + 8 + n); break; } i += 8 + n + (n & 1); }
  if (!fmt || !data) throw new Error('không đọc được WAV ' + p);
  const by = fmt.bits / 8, fr = by * fmt.ch, N = Math.floor(data.length / fr), x = new Float32Array(N), fl = fmt.tag === 3;
  const rd = o => fl ? (by === 4 ? data.readFloatLE(o) : data.readDoubleLE(o)) : by === 2 ? data.readInt16LE(o) / 32768 : by === 3 ? data.readIntLE(o, 3) / 8388608 : by === 4 ? data.readInt32LE(o) / 2147483648 : (data[o] - 128) / 128;
  for (let k = 0; k < N; k++) { let s = 0; for (let c = 0; c < fmt.ch; c++) s += rd(k * fr + c * by); x[k] = s / fmt.ch; }
  return { x, sr: fmt.sr };
}
function resample(x, sr, to) { if (sr === to) return x; const r = sr / to, N = Math.floor(x.length / r), y = new Float32Array(N), a = 8, fc = Math.min(1, 1 / r);   // sinc cửa sổ Hann (8 nhịp mỗi bên)
  for (let n = 0; n < N; n++) { const t = n * r, c = Math.floor(t); let s = 0, w0 = 0; for (let k = c - a * Math.ceil(r) + 1; k <= c + a * Math.ceil(r); k++) { if (k < 0 || k >= x.length) continue; const d = (t - k) * fc;
      const w = (d === 0 ? 1 : Math.sin(Math.PI * d) / (Math.PI * d)) * (Math.abs(d) < a ? 0.5 + 0.5 * Math.cos(Math.PI * d / a) : 0); s += x[k] * w; w0 += w; } y[n] = w0 ? s / w0 : 0; } return y; }
function biquad(x, b, a_) { const y = new Float64Array(x.length); let x1 = 0, x2 = 0, y1 = 0, y2 = 0; for (let n = 0; n < x.length; n++) { const v = b[0] * x[n] + b[1] * x1 + b[2] * x2 - a_[1] * y1 - a_[2] * y2; x2 = x1; x1 = x[n]; y2 = y1; y1 = v; y[n] = v; } return y; }
function lufs(x, fs_) {
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
  const lib = fs.readFileSync(process.env.LAMEJS || 'D:/tools/voicevox/lib/lame.min.js', 'utf8'), ctx = { console, Int8Array, Int16Array, Int32Array, Float32Array, Float64Array, Uint8Array, Math, Array };
  vm.createContext(ctx); vm.runInContext(lib + ';this.L=lamejs;', ctx); const enc = new ctx.L.Mp3Encoder(1, sr, kbps), out = [];
  const i16 = new Int16Array(x.length); for (let k = 0; k < x.length; k++) i16[k] = Math.max(-32768, Math.min(32767, Math.round(x[k] * 32767)));
  for (let k = 0; k < i16.length; k += 1152) { const b = enc.encodeBuffer(i16.subarray(k, k + 1152)); if (b.length) out.push(Buffer.from(b)); }
  const f = enc.flush(); if (f.length) out.push(Buffer.from(f)); return Buffer.concat(out);
}
function toMp3(src, key) {
  const SR = 44100, from = +opt('--from', 0), dur = +opt('--dur', 6), thr = Math.pow(10, +opt('--thr', -45) / 20), outDir = path.resolve(opt('--out', 'assets/audio'));
  let { x, sr } = readPcm(path.isAbsolute(src) || fs.existsSync(src) ? src : path.join(ROOT, src)); x = x.subarray(Math.floor(from * sr));
  let s = 0; while (s < x.length && Math.abs(x[s]) < thr) s++; s = Math.max(0, s - Math.round(0.005 * sr));             // cắt lặng đầu (giữ 5ms)
  let y = Float32Array.from(x.subarray(s, s + Math.round(dur * sr))); let e = y.length; while (e > 0 && Math.abs(y[e - 1]) < thr / 2) e--; y = y.subarray(0, Math.min(y.length, e + Math.round(0.05 * sr)));
  y = resample(y, sr, SR); const fi = Math.round(0.003 * SR), fo = Math.min(y.length, Math.round((x.length - s > dur * sr ? 0.35 : 0.05) * SR));   // bị cắt giữa chừng → fade-out 0.35s
  for (let k = 0; k < fi && k < y.length; k++) y[k] *= k / fi; for (let k = 0; k < fo; k++) y[y.length - 1 - k] *= k / fo;
  let pk = 0; for (const v of y) pk = Math.max(pk, Math.abs(v)); const g = Math.pow(10, -1 / 20) / (pk || 1); for (let k = 0; k < y.length; k++) y[k] *= g;
  fs.mkdirSync(outDir, { recursive: true }); const m = mp3(y, SR), out = path.join(outDir, key + '.mp3'); fs.writeFileSync(out, m);
  let pk2 = 0; for (const v of y) pk2 = Math.max(pk2, Math.abs(v));
  console.log(`${key} ← ${path.basename(src)} · lặng đầu bỏ ${(s / sr).toFixed(2)}s · dài ${(y.length / SR).toFixed(2)}s · ${m.length} byte · gốc ${sr}Hz → SND_LUFS ${key}:[${lufs(y, SR).toFixed(1)},${(20 * Math.log10(pk2)).toFixed(1)}]`);
}

try {
  if (has('--find')) find(opt('--find', ''));
  else if (has('--stats')) stats(load());
  else if (has('--mp3')) { const i = args.indexOf('--mp3'); toMp3(args[i + 1], args[i + 2]); }
  else index();
} catch (e) { console.error('LỖI ' + e.message); process.exit(1); }
