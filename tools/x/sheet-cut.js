// ✂️ CẮT SPRITE SHEET (Mac + Windows, Node thuần): tấm GPT vẽ nhiều góc / nhiều khung trên nền xanh, xếp 1 hàng ngang → từng khung PNG trong suốt.
//   node tools/x/sheet-cut.js --src sheet.png --out assets/img/cine/FIN_X_ --names front,q3l,side,q3b,back [--n 5] [--h 640]
//   → FIN_X_front.png, FIN_X_q3l.png … (thiếu --names thì đánh số 1..n)
// Cách cắt: tìm các CỘT trống (không còn điểm ảnh đặc sau khi tách nền) chia tấm thành từng hình; nhiều hình hơn n thì gộp khe hẹp nhất,
//   ít hơn thì báo lỗi (vẽ lại / cắt tay bằng gkey --x0 --x1). Mọi khung dùng CHUNG tỉ lệ (hình cao nhất = --h) → các góc của 1 nhân vật cao bằng nhau,
//   khung thấp hơn (ngồi, cúi) giữ đúng tỉ lệ thật. Tách nền từng khung bằng tools/x/gkey.js (cùng luật alpha / khử viền xanh).
// Ra kèm <out>sheet.json: [{name, file, x0, x1, h}] để phim đọc chiều cao tương đối (HT) cho đúng.
const fs = require('fs'), path = require('path'), zlib = require('zlib'), { spawnSync } = require('child_process');
const args = process.argv.slice(2), opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const SRC = opt('--src'), OUT = opt('--out'), H = +opt('--h', 640), names = (opt('--names', '') || '').split(',').filter(Boolean), N = +opt('--n', names.length || 0);
if (!SRC || !OUT || !N) { console.error('cách dùng: sheet-cut.js --src sheet.png --out prefix_ --names a,b,c  (hoặc --n 3)'); process.exit(2); }
function decodePNG(buf) {   // (chép từ gkey.js)
  let p = 8, w, h, bd, ct, il, pal = null, trns = null; const idat = [];
  while (p < buf.length) { const len = buf.readUInt32BE(p), type = buf.toString('ascii', p + 4, p + 8), d = buf.subarray(p + 8, p + 8 + len);
    if (type === 'IHDR') { w = d.readUInt32BE(0); h = d.readUInt32BE(4); bd = d[8]; ct = d[9]; il = d[12]; } else if (type === 'PLTE') pal = d; else if (type === 'tRNS') trns = d; else if (type === 'IDAT') idat.push(d); else if (type === 'IEND') break; p += 12 + len; }
  if (bd !== 8 || il !== 0) throw new Error('PNG không hỗ trợ'); const bpp = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[ct], stride = w * bpp, raw = zlib.inflateSync(Buffer.concat(idat)), px = Buffer.alloc(h * stride); let prev = Buffer.alloc(stride);
  for (let y = 0; y < h; y++) { const f = raw[y * (stride + 1)], src = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1)), row = px.subarray(y * stride, (y + 1) * stride);
    for (let i = 0; i < stride; i++) { const a = i >= bpp ? row[i - bpp] : 0, b = prev[i], c = i >= bpp ? prev[i - bpp] : 0; let v = src[i]; if (f === 1) v += a; else if (f === 2) v += b; else if (f === 3) v += (a + b) >> 1; else if (f === 4) { const pp = a + b - c, pa = Math.abs(pp - a), pb = Math.abs(pp - b), pc = Math.abs(pp - c); v += (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c); } row[i] = v & 255; } prev = row; }
  const rgb = (i) => { const s = i * bpp; if (ct === 6 || ct === 2) return [px[s], px[s + 1], px[s + 2]]; if (ct === 0 || ct === 4) return [px[s], px[s], px[s]]; const k = px[s]; return [pal[k * 3], pal[k * 3 + 1], pal[k * 3 + 2]]; };
  return { w, h, rgb };
}
const img = decodePNG(fs.readFileSync(SRC)), solid = (x, y) => { const [r, g, b] = img.rgb(y * img.w + x); return g - Math.max(r, b) < 25; };   // còn lại sau khi tách nền (luật gkey: d ≤ keyLo)
// cột có điểm đặc + chiều cao điểm đặc mỗi cột
const colOn = new Array(img.w).fill(false), top = new Array(img.w).fill(img.h), bot = new Array(img.w).fill(-1);
for (let x = 0; x < img.w; x++) { let c = 0; for (let y = 0; y < img.h; y += 2) if (solid(x, y)) { c++; if (y < top[x]) top[x] = y; if (y > bot[x]) bot[x] = y; } colOn[x] = c > 3; }
let segs = []; for (let x = 0; x < img.w; x++) if (colOn[x]) { const s = x; while (x < img.w && colOn[x]) x++; segs.push([s, x]); }
segs = segs.filter(([a, b]) => b - a > 6);   // bỏ vụn (viền nhiễu)
while (segs.length > N) { let bi = 0, bg = Infinity; for (let i = 0; i < segs.length - 1; i++) { const g = segs[i + 1][0] - segs[i][1]; if (g < bg) { bg = g; bi = i; } } segs.splice(bi, 2, [segs[bi][0], segs[bi + 1][1]]); }
if (segs.length < N) { console.error(`chỉ tìm được ${segs.length}/${N} hình (các hình dính nhau?) → cắt tay bằng gkey.js --x0 --x1`); process.exit(3); }
const hts = segs.map(([a, b]) => { let t = img.h, bo = -1; for (let x = a; x < b; x++) { t = Math.min(t, top[x]); bo = Math.max(bo, bot[x]); } return bo - t + 1; }), mx = Math.max(...hts);
const GK = path.join(__dirname, 'gkey.js'), meta = [];
segs.forEach(([a, b], i) => { const nm = names[i] || String(i + 1), file = OUT + nm + '.png', gl = Math.floor((i ? a - segs[i - 1][1] : a) / 2), gr = Math.floor((i < segs.length - 1 ? segs[i + 1][0] - b : img.w - b) / 2), x0 = Math.max(0, a - Math.min(gl, 20)), x1 = Math.min(img.w, b + Math.min(gr, 20)), hh = Math.round(H * hts[i] / mx);
  const r = spawnSync(process.execPath, [GK, '--src', SRC, '--out', file, '--x0', String(x0), '--x1', String(x1), '--h', String(hh)], { encoding: 'utf8', env: process.env });
  if (r.status !== 0) { console.error(r.stderr || r.stdout); process.exit(4); } meta.push({ name: nm, file: path.basename(file), x0, x1, h: +(hts[i] / mx).toFixed(3) }); console.log(`${nm}: cột ${x0}–${x1}, cao ${(hts[i] / mx * 100).toFixed(0)}% → ${file}`); });
fs.writeFileSync(OUT + 'sheet.json', JSON.stringify(meta, null, 1)); console.log('xong ' + segs.length + ' khung → ' + OUT + 'sheet.json');
