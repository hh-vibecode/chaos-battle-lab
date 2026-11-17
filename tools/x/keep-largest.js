// ✂️ GIỮ KHỐI LỚN NHẤT của 1 PNG trong suốt (Mac + Windows, Node thuần): bỏ các mẩu rời (vd mũi kiếm của hình bên cạnh lọt vào khi cắt tấm sprite
//   có vũ khí chồng sang nhau), rồi cắt sát khung. Dùng sau gkey.js --x0 --x1 khi sheet-cut.js báo các hình dính nhau theo cột.
//   node tools/x/keep-largest.js <vào.png> [<ra.png>] [--pad 6]
const fs = require('fs'), zlib = require('zlib'); const args = process.argv.slice(2), IN = args[0], OUT = args[1] && !args[1].startsWith('--') ? args[1] : IN;
const pad = +(args.includes('--pad') ? args[args.indexOf('--pad') + 1] : 6);
const buf = fs.readFileSync(IN); let p = 8, w, h, bd, ct; const idat = [];
while (p < buf.length) { const len = buf.readUInt32BE(p), type = buf.toString('ascii', p + 4, p + 8), d = buf.subarray(p + 8, p + 8 + len);
  if (type === 'IHDR') { w = d.readUInt32BE(0); h = d.readUInt32BE(4); bd = d[8]; ct = d[9]; } else if (type === 'IDAT') idat.push(d); else if (type === 'IEND') break; p += 12 + len; }
if (bd !== 8 || ct !== 6) throw new Error('cần PNG RGBA 8-bit');
const st = w * 4, raw = zlib.inflateSync(Buffer.concat(idat)), px = Buffer.alloc(h * st); let prev = Buffer.alloc(st);
for (let y = 0; y < h; y++) { const f = raw[y * (st + 1)], src = raw.subarray(y * (st + 1) + 1, (y + 1) * (st + 1)), row = px.subarray(y * st, (y + 1) * st);
  for (let i = 0; i < st; i++) { const a = i >= 4 ? row[i - 4] : 0, b = prev[i], c = i >= 4 ? prev[i - 4] : 0; let v = src[i];
    if (f === 1) v += a; else if (f === 2) v += b; else if (f === 3) v += (a + b) >> 1; else if (f === 4) { const q = a + b - c, pa = Math.abs(q - a), pb = Math.abs(q - b), pc = Math.abs(q - c); v += (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c); } row[i] = v & 255; } prev = row; }
// gắn nhãn khối liền (alpha > 24, 8 hướng)
const lab = new Int32Array(w * h).fill(-1), sizes = []; const stack = [];
for (let i = 0; i < w * h; i++) { if (lab[i] >= 0 || px[i * 4 + 3] <= 24) continue; const id = sizes.length; let n = 0; stack.push(i); lab[i] = id;
  while (stack.length) { const j = stack.pop(); n++; const x = j % w, y = (j / w) | 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue; const k = yy * w + xx; if (lab[k] < 0 && px[k * 4 + 3] > 24) { lab[k] = id; stack.push(k); } } }
  sizes.push(n); }
const best = sizes.indexOf(Math.max(...sizes)); let x0 = w, y0 = h, x1 = -1, y1 = -1;
for (let i = 0; i < w * h; i++) { const keep = lab[i] === best || (lab[i] < 0 && px[i * 4 + 3] > 0 && near(i)); if (!keep) { px[i * 4 + 3] = 0; continue; } const x = i % w, y = (i / w) | 0; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
function near(i) { const x = i % w, y = (i / w) | 0; for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) { const xx = x + dx, yy = y + dy; if (xx >= 0 && yy >= 0 && xx < w && yy < h && lab[yy * w + xx] === best) return true; } return false; }   // giữ viền mờ quanh khối chính
x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad); x1 = Math.min(w - 1, x1 + pad); y1 = Math.min(h - 1, y1 + pad);
const W2 = x1 - x0 + 1, H2 = y1 - y0 + 1, rows = [];
for (let y = y0; y <= y1; y++) rows.push(Buffer.concat([Buffer.from([0]), px.subarray(y * st + x0 * 4, y * st + (x1 + 1) * 4)]));
const T = new Int32Array(256); for (let i = 0; i < 256; i++) { let c = i; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; T[i] = c; }
const crc = b => { let c = -1; for (const x of b) c = T[(c ^ x) & 255] ^ (c >>> 8); return (c ^ -1) >>> 0; };
const chunk = (t, d) => { const L = Buffer.alloc(4); L.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(t), d]); const C = Buffer.alloc(4); C.writeUInt32BE(crc(td)); return Buffer.concat([L, td, C]); };
const ih = Buffer.alloc(13); ih.writeUInt32BE(W2, 0); ih.writeUInt32BE(H2, 4); ih[8] = 8; ih[9] = 6;
fs.writeFileSync(OUT, Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ih), chunk('IDAT', zlib.deflateSync(Buffer.concat(rows), { level: 9 })), chunk('IEND', Buffer.alloc(0))]));
console.log(`giữ khối ${sizes[best]} điểm / ${sizes.length} khối → ${W2}×${H2} ${OUT}`);
