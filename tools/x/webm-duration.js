// 🩹 CHÈN ĐỘ DÀI vào file WEBM do MediaRecorder ghi (tools/x/audio-encode.html) — file đó KHÔNG có Duration → trình duyệt báo sai độ dài (vd 7.7s), tua hỏng.
//   node tools/x/webm-duration.js <file.webm> <giây>      (ghi đè tại chỗ; chạy lại lần 2 = không làm gì nếu đã có Duration)
// Cách làm: tìm Segment → Info, thêm phần tử Duration (0x4489, float64, đơn vị = TimecodeScale, mặc định 1ms), viết lại cỡ của Info (vint 8 byte).
const fs = require('fs'), [file, secArg] = process.argv.slice(2), buf = fs.readFileSync(file);
function vint(p, keep) { const f = buf[p]; let len = 1, m = 0x80; while (len <= 8 && !(f & m)) { m >>= 1; len++; } let v = keep ? f : f & (m - 1); for (let i = 1; i < len; i++) v = v * 256 + buf[p + i]; return { v, len }; }
const UNKNOWN = n => n.len === 8 && n.v === 0xFFFFFFFFFFFFFF || (n.len === 1 && n.v === 0x7F);
function elem(p) { const id = vint(p, true), sz = vint(p + id.len); return { id: id.v, p, hdr: id.len + sz.len, size: sz.v, unk: UNKNOWN(sz), szLen: sz.len }; }
let p = 0; const ebml = elem(p); p += ebml.hdr + ebml.size; const seg = elem(p); if (seg.id !== 0x18538067) throw new Error('không thấy Segment');
let q = p + seg.hdr, info = null; while (q < buf.length) { const e = elem(q); if (e.id === 0x1549A966) { info = e; break; } q += e.hdr + e.size; }
if (!info) throw new Error('không thấy Info');
let scale = 1e6, c = info.p + info.hdr, end = info.p + info.hdr + info.size; while (c < end) { const e = elem(c); if (e.id === 0x4489) { console.log('đã có Duration — bỏ qua'); process.exit(0); }
  if (e.id === 0x2AD7B1) { scale = 0; for (let i = 0; i < e.size; i++) scale = scale * 256 + buf[c + e.hdr + i]; } c += e.hdr + e.size; }
const dur = Buffer.alloc(11); dur[0] = 0x44; dur[1] = 0x89; dur[2] = 0x88; dur.writeDoubleBE(+secArg * 1e9 / scale, 3);
const body = Buffer.concat([buf.subarray(info.p + info.hdr, end), dur]), sz = Buffer.alloc(8); sz[0] = 0x01; let n = body.length; for (let i = 7; i >= 1; i--) { sz[i] = n & 255; n = Math.floor(n / 256); }
const idLen = vint(info.p, true).len, newInfo = Buffer.concat([buf.subarray(info.p, info.p + idLen), sz, body]);
let out = Buffer.concat([buf.subarray(0, info.p), newInfo, buf.subarray(end)]);
if (!seg.unk) { const delta = newInfo.length - (end - info.p), ns = seg.size + delta, sb = Buffer.alloc(seg.szLen); let v = ns; for (let i = seg.szLen - 1; i >= 0; i--) { sb[i] = v & 255; v = Math.floor(v / 256); } sb[0] |= (0x80 >> (seg.szLen - 1)); const sid = vint(seg.p, true).len; sb.copy(out, seg.p + sid); }
fs.writeFileSync(file, out); console.log('đã chèn Duration', secArg + 's', '(TimecodeScale', scale + ')', file);
