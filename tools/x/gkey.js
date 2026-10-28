// Green-screen key for character frames drawn by ChatGPT (Mac + Windows, pure Node, no npm deps). PNG in -> PNG out.
// Cuts columns [x0,x1) of the source (a sheet may hold several poses side by side), removes the green, de-spills
// green fringes, crops tight to the character and scales to height H (feet touch the bottom edge).
//   node tools/x/gkey.js --src in.png --out assets/img/<key>/NAME.png [--x0 0 --x1 887] [--h 420] [--grid] [--key-hi 90 --key-lo 25]
//   --grid : red y-ruler every 20px (preview only, never ship it).
// Alpha rule: d = G - max(R,B);  d >= keyHi -> transparent,  d <= keyLo -> opaque, linear in between.
const fs = require('fs'), zlib = require('zlib');
const args = process.argv.slice(2), opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; }, has = k => args.includes(k);

function decodePNG(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error('not a PNG (convert to PNG first)');
  let p = 8, w, h, bd, ct, il, pal = null, trns = null; const idat = [];
  while (p < buf.length) { const len = buf.readUInt32BE(p), type = buf.toString('ascii', p + 4, p + 8), d = buf.subarray(p + 8, p + 8 + len);
    if (type === 'IHDR') { w = d.readUInt32BE(0); h = d.readUInt32BE(4); bd = d[8]; ct = d[9]; il = d[12]; }
    else if (type === 'PLTE') pal = d; else if (type === 'tRNS') trns = d; else if (type === 'IDAT') idat.push(d); else if (type === 'IEND') break;
    p += 12 + len; }
  if (bd !== 8 || il !== 0) throw new Error(`unsupported PNG (bit depth ${bd}, interlace ${il})`);
  const ch = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[ct], bpp = ch, stride = w * bpp, raw = zlib.inflateSync(Buffer.concat(idat));
  const px = Buffer.alloc(h * stride); let prev = Buffer.alloc(stride);
  for (let y = 0; y < h; y++) { const f = raw[y * (stride + 1)], src = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1)), row = px.subarray(y * stride, (y + 1) * stride);
    for (let i = 0; i < stride; i++) { const a = i >= bpp ? row[i - bpp] : 0, b = prev[i], c = i >= bpp ? prev[i - bpp] : 0; let v = src[i];
      if (f === 1) v += a; else if (f === 2) v += b; else if (f === 3) v += (a + b) >> 1;
      else if (f === 4) { const pp = a + b - c, pa = Math.abs(pp - a), pb = Math.abs(pp - b), pc = Math.abs(pp - c); v += (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c); }
      row[i] = v & 255; }
    prev = row; }
  const out = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) { const o = i * 4, s = i * bpp;
    if (ct === 6) { out[o] = px[s]; out[o + 1] = px[s + 1]; out[o + 2] = px[s + 2]; out[o + 3] = px[s + 3]; }
    else if (ct === 2) { out[o] = px[s]; out[o + 1] = px[s + 1]; out[o + 2] = px[s + 2]; out[o + 3] = 255; }
    else if (ct === 0) { out[o] = out[o + 1] = out[o + 2] = px[s]; out[o + 3] = 255; }
    else if (ct === 4) { out[o] = out[o + 1] = out[o + 2] = px[s]; out[o + 3] = px[s + 1]; }
    else { const k = px[s]; out[o] = pal[k * 3]; out[o + 1] = pal[k * 3 + 1]; out[o + 2] = pal[k * 3 + 2]; out[o + 3] = trns && k < trns.length ? trns[k] : 255; } }
  return { w, h, data: out };
}
const CRC = new Int32Array(256).map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c; });
const crc32 = b => { let c = -1; for (const x of b) c = CRC[(c ^ x) & 255] ^ (c >>> 8); return (c ^ -1) >>> 0; };
function encodePNG(w, h, rgba) {
  const raw = Buffer.alloc(h * (w * 4 + 1)); for (let y = 0; y < h; y++) { raw[y * (w * 4 + 1)] = 0; rgba.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4); }
  const chunk = (t, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(t, 'ascii'), d]), c = Buffer.alloc(4); c.writeUInt32BE(crc32(td)); return Buffer.concat([l, td, c]); };
  const ih = Buffer.alloc(13); ih.writeUInt32BE(w, 0); ih.writeUInt32BE(h, 4); ih[8] = 8; ih[9] = 6;
  return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), chunk('IHDR', ih), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}

const img = decodePNG(fs.readFileSync(opt('--src'))), H = +opt('--h', 420), hi = +opt('--key-hi', 90), lo = +opt('--key-lo', 25);
const x0 = +opt('--x0', 0), x1 = Math.min(img.w, +opt('--x1', img.w)), W0 = x1 - x0;
const k = Buffer.alloc(W0 * img.h * 4); let mnx = W0, mny = img.h, mxx = -1, mxy = -1;
for (let y = 0; y < img.h; y++) for (let x = 0; x < W0; x++) { const s = (y * img.w + x0 + x) * 4, o = (y * W0 + x) * 4, R = img.data[s], G = img.data[s + 1], B = img.data[s + 2], m = Math.max(R, B), d = G - m;
  const a = d >= hi ? 0 : d <= lo ? 1 : 1 - (d - lo) / (hi - lo), al = Math.round(a * img.data[s + 3]);
  k[o] = R; k[o + 1] = d > 0 ? Math.min(255, m + Math.floor(d * 0.15)) : G; k[o + 2] = B; k[o + 3] = al;   // de-spill green fringe
  if (al > 40) { if (x < mnx) mnx = x; if (x > mxx) mxx = x; if (y < mny) mny = y; if (y > mxy) mxy = y; } }
if (mxx < 0) throw new Error('nothing left after keying');
const bw = mxx - mnx + 1, bh = mxy - mny + 1, sc = H / bh, W = Math.round(bw * sc), out = Buffer.alloc(W * H * 4), inv = 1 / sc, S = Math.min(6, Math.max(1, Math.ceil(inv)));
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { let r = 0, g = 0, b = 0, a = 0;   // supersampled box filter, premultiplied alpha
  for (let j = 0; j < S; j++) for (let i = 0; i < S; i++) { const sx = Math.min(bw - 1, Math.floor((x + (i + 0.5) / S) * inv)), sy = Math.min(bh - 1, Math.floor((y + (j + 0.5) / S) * inv)), q = ((mny + sy) * W0 + mnx + sx) * 4, al = k[q + 3];
    r += k[q] * al; g += k[q + 1] * al; b += k[q + 2] * al; a += al; }
  const o = (y * W + x) * 4; if (a > 0) { out[o] = Math.round(r / a); out[o + 1] = Math.round(g / a); out[o + 2] = Math.round(b / a); } out[o + 3] = Math.round(a / (S * S)); }
if (has('--grid')) for (let y = 0; y < H; y += 20) for (let x = 0; x < Math.min(10, W); x++) { const o = (y * W + x) * 4; out[o] = 255; out[o + 1] = 0; out[o + 2] = 0; out[o + 3] = 255; }
fs.writeFileSync(opt('--out'), encodePNG(W, H, out));
console.log(`bbox=${x0 + mnx},${mny},${bw}x${bh} -> ${W}x${H}  ${opt('--out')}`);
