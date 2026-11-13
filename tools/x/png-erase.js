// 🧽 XOÁ VÙNG trong PNG trong suốt (Mac + Windows, Node thuần): làm trong suốt các hình chữ nhật (toạ độ ẢNH VÀO) rồi cắt sát lại.
//   Dùng khi ảnh GPT vẽ kèm vật thừa không tách được bằng cột (vd đoạn xích thẳng chạy ra mép ảnh — giữ phần quấn quanh tay, đoạn thẳng để code nối bằng mắt xích lặp).
//   node tools/x/png-erase.js <vào.png> <ra.png> --rect x0,y0,x1,y1 [--rect …] [--pad 4]
//   In ra: bbox sau khi cắt (x,y,w,h theo toạ độ ảnh vào) để tính lại toạ độ điểm nối.
const fs = require('fs'), zlib = require('zlib');
const a = process.argv.slice(2), IN = a[0], OUT = a[1], rects = [], pad = +(a.includes('--pad') ? a[a.indexOf('--pad') + 1] : 4);
for (let i = 2; i < a.length; i++) if (a[i] === '--rect') rects.push(a[++i].split(',').map(Number));
if (!IN || !OUT) { console.error('cách dùng: png-erase.js vào.png ra.png --rect x0,y0,x1,y1'); process.exit(2); }
const buf = fs.readFileSync(IN); let p = 8, w, h, bd, ct; const idat = [];
while (p < buf.length) { const len = buf.readUInt32BE(p), type = buf.toString('ascii', p + 4, p + 8), d = buf.subarray(p + 8, p + 8 + len);
  if (type === 'IHDR') { w = d.readUInt32BE(0); h = d.readUInt32BE(4); bd = d[8]; ct = d[9]; } else if (type === 'IDAT') idat.push(d); else if (type === 'IEND') break; p += 12 + len; }
if (bd !== 8 || ct !== 6) { console.error('chỉ nhận PNG RGBA 8-bit (ra từ gkey.js)'); process.exit(2); }
const raw = zlib.inflateSync(Buffer.concat(idat)), bpp = 4, st = w * bpp, px = Buffer.alloc(h * st);
for (let y = 0; y < h; y++) { const f = raw[y * (st + 1)], s = raw.subarray(y * (st + 1) + 1, (y + 1) * (st + 1)), o = y * st;
  for (let x = 0; x < st; x++) { const A = x >= bpp ? px[o + x - bpp] : 0, B = y ? px[o - st + x] : 0, C = y && x >= bpp ? px[o - st + x - bpp] : 0; let v = s[x];
    if (f === 1) v += A; else if (f === 2) v += B; else if (f === 3) v += (A + B) >> 1; else if (f === 4) { const pp = A + B - C, pa = Math.abs(pp - A), pb = Math.abs(pp - B), pc = Math.abs(pp - C); v += pa <= pb && pa <= pc ? A : pb <= pc ? B : C; }
    px[o + x] = v & 255; } }
for (const [x0, y0, x1, y1] of rects) for (let y = Math.max(0, y0); y < Math.min(h, y1); y++) for (let x = Math.max(0, x0); x < Math.min(w, x1); x++) px.fill(0, y * st + x * 4, y * st + x * 4 + 4);
let X0 = w, Y0 = h, X1 = -1, Y1 = -1; for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (px[y * st + x * 4 + 3] > 8) { if (x < X0) X0 = x; if (x > X1) X1 = x; if (y < Y0) Y0 = y; if (y > Y1) Y1 = y; }
X0 = Math.max(0, X0 - pad); Y0 = Math.max(0, Y0 - pad); X1 = Math.min(w - 1, X1 + pad); Y1 = Math.min(h - 1, Y1 + pad);
const W = X1 - X0 + 1, Hh = Y1 - Y0 + 1, out = Buffer.alloc(Hh * (W * 4 + 1));
for (let y = 0; y < Hh; y++) { out[y * (W * 4 + 1)] = 0; px.copy(out, y * (W * 4 + 1) + 1, (Y0 + y) * st + X0 * 4, (Y0 + y) * st + (X0 + W) * 4); }
const crcT = new Int32Array(256).map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c; });
const crc = b => { let c = -1; for (const v of b) c = crcT[(c ^ v) & 255] ^ (c >>> 8); return (c ^ -1) >>> 0; };
const chunk = (t, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(t, 'ascii'), d]), c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([l, td, c]); };
const ih = Buffer.alloc(13); ih.writeUInt32BE(W, 0); ih.writeUInt32BE(Hh, 4); ih[8] = 8; ih[9] = 6;
fs.writeFileSync(OUT, Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), chunk('IHDR', ih), chunk('IDAT', zlib.deflateSync(out, { level: 9 })), chunk('IEND', Buffer.alloc(0))]));
console.log(`bbox=${X0},${Y0},${W}x${Hh}  ${OUT}`);
