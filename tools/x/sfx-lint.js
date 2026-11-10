// 🔊 SOÁT TIẾNG KHÔNG CẦN NGHE (Mac + Windows, Node thuần — không Python / ffmpeg / playwright). Chạy TRƯỚC khi báo anh mọi phim cine-kit.
//   node tools/x/sfx-lint.js <idPhim hoặc idTập> [--file <tên file film-*.js nếu khác id>] [--out bao-cao.md]
//   Windows: powershell -NoProfile -ExecutionPolicy Bypass -File tools/node.ps1 tools/x/sfx-lint.js fin1 --out <scratchpad>/fin1-sfx.md
// Nạp phim thật (cine-kit + film-*.js) trong máy ảo Node → lấy lịch tiếng đã tính ra giây → soát theo luật anh dặn (skill tim-sound + 10/11/2026):
//   ❌ CHƯA KHAI     key không có trong AUDIO_SAMPLES (phim câm ở nhịp đó)        ❌ THIẾU FILE   file mp3 không tồn tại
//   👤 CỦA MEME KHÁC key có tiền tố của meme không thuộc `cast` của phim (mượn tiếng nhân vật không liên quan)
//   🔁 LẶP           tiếng riêng của nhân vật / giọng đọc tên chiêu dùng > 1 lần (chiêu ra 1 lần thì tiếng 1 lần)
//   👥 CHỒNG         2 tiếng bắt đầu cách nhau < 0.15s        🏷️ THIẾU NHÃN   chưa ghi tiếng này kêu cho SỰ KIỆN gì trên hình
//   ⏹️ NHẠC TẮT SỚM  file nhạc ngắn hơn khoảng phát mà không lặp        🔇 KHOẢNG KHÔNG NHẠC   (chỉ báo, quãng lặng cố ý thì bỏ qua)
//   🈲 CHỮ           chữ Hán / Nhật trong mã vẽ (chữ trên màn hình chỉ tiếng Anh; dòng cố ý thì ghi chú `lint-ok: cjk`)
// Phim khai thêm (không bắt buộc với phim cũ, BẮT BUỘC với phim mới):
//   cast:['mw','dp','ps']            tiền tố tiếng của các nhân vật có mặt trong phim
//   sfxOk:{fr_dash:'lý do'}          tiếng mượn có chủ ý (anh đã duyệt)
//   sfx:[[giây,'key',to,dài,'NHÃN: việc gì đang xảy ra trên hình'], …]   phần tử thứ 5 = nhãn (cine-kit bỏ qua, chỉ để soát)
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..', '..'), args = process.argv.slice(2), opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const ID = args[0], FILE = opt('--file', null), OUT = opt('--out', null);
if (!ID || ID.startsWith('--')) { console.error('cách dùng: sfx-lint.js <idPhim> [--file tên] [--out bao-cao.md]'); process.exit(2); }
const GENERIC = ['cine', 'ep3', 'l2p', 'fin', 'vine', 'duo', 'ui', 'sfx', 'hit', 'boom', 'whoosh'];   // tiền tố tiếng DÙNG CHUNG cho phim

// ───────── máy ảo: đủ để chạy phần khai báo của cine-kit + film (không vẽ) ─────────
const noop = () => {}, ctxProxy = new Proxy(function () {}, { get: (t, k) => k === 'canvas' ? { width: 1, height: 1 } : k === 'measureText' ? () => ({ width: 10 }) : k === 'getImageData' ? () => ({ data: new Uint8ClampedArray(4) }) : k === 'createLinearGradient' || k === 'createRadialGradient' || k === 'createPattern' ? () => ({ addColorStop: noop, setTransform: noop }) : noop, set: () => true });
const fakeCanvas = () => ({ width: 1, height: 1, style: {}, getContext: () => ctxProxy, toDataURL: () => '', appendChild: noop, remove: noop });
function FakeImage() { this.complete = false; this.naturalWidth = 0; }
const sandbox = { console: { log: noop, warn: noop, error: noop }, performance: { now: () => 0 }, requestAnimationFrame: noop, cancelAnimationFrame: noop, setTimeout, clearTimeout,
  document: { createElement: fakeCanvas, body: { appendChild: noop }, fonts: { add: noop }, currentScript: { src: 'js/film-x.js' }, addEventListener: noop },
  Image: FakeImage, FontFace: function () { this.load = () => Promise.resolve(this); }, DOMMatrix: function () { this.scale = () => this; this.rotate = () => this; },
  XMLHttpRequest: function () { let u = ''; this.open = (m, url) => { u = url; }; this.send = () => { const rel = u.split('?')[0].replace(/^.*?js\//, 'js/'), p = path.join(ROOT, rel); if (/film-/.test(rel) && !filmFiles.includes(rel)) filmFiles.push(rel); try { this.responseText = fs.readFileSync(p, 'utf8'); this.status = 200; } catch (e) { this.status = 404; } }; },
  navigator: { userAgent: 'node' }, location: { href: 'http://x/' }, Math, Date, JSON, Promise, Float32Array, Uint8Array, Uint8ClampedArray, Array, Object, Set, Map, Proxy, Symbol, isFinite, parseFloat, parseInt, String, Number, Boolean, Error, RegExp };
const filmFiles = [];
sandbox.window = sandbox; sandbox.globalThis = sandbox; sandbox.self = sandbox; sandbox.eval = code => vm.runInContext(code, sandbox);
vm.createContext(sandbox);
const run = rel => { const p = path.join(ROOT, rel); if (!fs.existsSync(p)) return false; sandbox.document.currentScript.src = rel; vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: rel }); return true; };
for (const f of ['js/cine-kit.js', 'js/cine-cam.js', 'js/vfx-manga.js']) { try { run(f); } catch (e) { console.error('không nạp được ' + f + ': ' + e.message); if (f === 'js/cine-kit.js') process.exit(3); } }
const K = sandbox.CineKit; if (!K) { console.error('CineKit không gắn'); process.exit(3); }
const loadFilm = base => { const rel = 'js/film-' + base + '.js'; try { if (run(rel)) filmFiles.push(rel); } catch (e) { console.error('lỗi khi nạp ' + rel + ': ' + e.message); process.exit(3); } };
loadFilm(FILE || ID); if (!K.films[ID] && !FILE) { const m = ID.match(/^(.*?)(c\d+)$/); if (m) loadFilm(m[1]); }
const film = K.films[ID]; if (!film) { console.error('không có phim ' + ID + ' (đã nạp: ' + Object.keys(K.films).join(', ') + ')'); process.exit(3); }

// ───────── lịch tiếng (giây của cả phim / tập) ─────────
const defOf = id => K.films[id] && K.films[id].def;
const def = film.def || {}, parts = def.parts || null, rows = [], casts = new Set(), sfxOk = {};
const addCast = d => { (d.cast || []).forEach(c => casts.add(c)); Object.assign(sfxOk, d.sfxOk || {}); };
let DUR = 0, anyCast = false;
if (parts) { for (const pid of parts) { const d = defOf(pid); if (!d) continue; if (d.cast) anyCast = true; addCast(d); for (const s of (d.sfx || [])) rows.push({ t: s[0] + DUR, key: s[1], vol: s[2], d: s[3], label: typeof s[4] === 'string' ? s[4] : '', part: pid }); DUR += d.DUR || 0; } }
else { if (def.cast) anyCast = true; addCast(def); for (const s of (def.sfx || [])) rows.push({ t: s[0], key: s[1], vol: s[2], d: s[3], label: typeof s[4] === 'string' ? s[4] : '', part: ID }); DUR = def.DUR || (film.info ? film.info().dur : 0); }
rows.sort((a, b) => a.t - b.t);
const mus = (parts ? (def.mus || []) : (def.mus || [])).map(m => ({ src: m.src, ra: m.ra, rb: m.rb, off: m.off || 0, loop: !!m.loop, vol: m.vol == null ? 1 : m.vol }));

// ───────── danh mục tiếng của game (AUDIO_SAMPLES + chú thích) ─────────
const game = fs.readFileSync(path.join(ROOT, 'js/game.js'), 'utf8'), CAT = {};
for (const ln of game.split('\n')) { const ms = [...ln.matchAll(/([a-zA-Z0-9_]+)\s*:\s*'(assets\/audio\/[^']+)'/g)]; if (!ms.length) continue;   // 1 dòng có thể khai nhiều tiếng
  const cm = ln.match(/\/\/\s*(.*)$/), note = cm ? cm[1].trim() : ''; for (const m of ms) CAT[m[1]] = { file: m[2], note: ms.length === 1 ? note : (note ? '(dòng chung) ' + note : '') }; }
// ───────── độ dài mp3: cộng từng khung (đúng cả VBR) ─────────
const BR1 = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320], BR2 = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160], SR = { 3: [44100, 48000, 32000], 2: [22050, 24000, 16000], 0: [11025, 12000, 8000] };
const durCache = {};
function mp3dur(rel) { if (rel in durCache) return durCache[rel]; const p = path.join(ROOT, rel); if (!fs.existsSync(p)) return durCache[rel] = null; const b = fs.readFileSync(p); let i = 0, t = 0;
  if (b.toString('latin1', 0, 3) === 'ID3') i = 10 + ((b[6] & 127) << 21 | (b[7] & 127) << 14 | (b[8] & 127) << 7 | (b[9] & 127));
  while (i < b.length - 4) { if (b[i] !== 0xFF || (b[i + 1] & 0xE0) !== 0xE0) { i++; continue; } const ver = (b[i + 1] >> 3) & 3, lay = (b[i + 1] >> 1) & 3, bi = (b[i + 2] >> 4) & 15, si = (b[i + 2] >> 2) & 3, pad = (b[i + 2] >> 1) & 1;
    if (ver === 1 || lay !== 1 || bi === 0 || bi === 15 || si === 3) { i++; continue; } const br = (ver === 3 ? BR1 : BR2)[bi] * 1000, sr = SR[ver][si], spf = ver === 3 ? 1152 : 576, len = Math.floor(spf / 8 * br / sr) + pad; if (len < 24) { i++; continue; } t += spf / sr; i += len; }
  return durCache[rel] = t; }

// ───────── soát ─────────
const flags = [], F = (lv, t, msg) => flags.push({ lv, t, msg }), fmt = t => { const m = Math.floor(t / 60), s = t - m * 60; return (m ? m + ':' : '') + (m && s < 10 ? '0' : '') + s.toFixed(2); };
const pre = k => k.includes('_') ? k.split('_')[0] : null, count = {};
for (const r of rows) { count[r.key] = (count[r.key] || 0) + 1; const c = CAT[r.key]; r.note = c ? c.note : ''; r.dur = c ? mp3dur(c.file) : null;
  if (!c) { r.fl = ['❌ CHƯA KHAI']; F('❌', r.t, `${r.key}: chưa khai trong AUDIO_SAMPLES → câm`); continue; } r.fl = [];
  if (r.dur == null) { r.fl.push('❌ THIẾU FILE'); F('❌', r.t, `${r.key}: thiếu file ${c.file}`); }
  const p = pre(r.key), owned = p && !GENERIC.includes(p);
  if (owned && !casts.has(p) && !(r.key in sfxOk)) { r.fl.push('👤 CỦA MEME KHÁC'); F('👤', r.t, `${r.key} (${r.note.slice(0, 70) || 'không có chú thích'}) — tiền tố "${p}_" không thuộc cast [${[...casts].join(', ') || 'chưa khai cast'}]`); }
  if (!r.label) r.fl.push('🏷️'); }
for (const [k, n] of Object.entries(count)) { const p = pre(k), owned = p && !GENERIC.includes(p); if (n > 1 && owned && !(k in sfxOk)) { const ts = rows.filter(r => r.key === k).map(r => fmt(r.t)).join(', '); F('🔁', rows.find(r => r.key === k).t, `${k} dùng ${n} lần (${ts}) — ${(CAT[k] && CAT[k].note.slice(0, 80)) || ''}`); rows.filter(r => r.key === k).forEach(r => r.fl && r.fl.push('🔁 LẶP ×' + n)); }
  else if (n > 3) F('ℹ️', rows.find(r => r.key === k).t, `${k} dùng ${n} lần — nghe lặp, cân nhắc đổi tiếng khác cho vài chỗ`); }
for (let i = 1; i < rows.length; i++) if (rows[i].t - rows[i - 1].t < 0.15 && rows[i].key !== rows[i - 1].key) { rows[i].fl && rows[i].fl.push('👥 CHỒNG'); F('👥', rows[i].t, `${rows[i - 1].key} + ${rows[i].key} bắt đầu cách nhau ${(rows[i].t - rows[i - 1].t).toFixed(2)}s`); }
// 🎯 LỆCH NGHĨA: tiếng có loại RÕ NGHĨA trong tools/x/sfx-catalog.json (rơi / giọng / vỡ / nổ) mà NHÃN không nói tới việc đó (10/11: anh chê tiếng rơi gắn chỗ không có gì rơi)
const CATF = path.join(__dirname, 'sfx-catalog.json'), CATJ = fs.existsSync(CATF) ? JSON.parse(fs.readFileSync(CATF, 'utf8')).tieng || {} : null;
const NEED = { 'rơi': /rơi|rớt|ngã|đáp|lao xuống|sụp xuống|fall/i, 'giọng': /hô|gầm|khóc|hét|nói|giọng|cười|thét|kêu|rên|thở/i, 'vỡ': /vỡ|gãy|nứt|kính|đá|gạch|sập|đổ/i, 'nổ': /nổ|lửa|bùng|cháy|explo|blast/i };
if (CATJ) for (const r of rows) { const c = CATJ[r.key]; if (!c || !r.label || !(c.loai in NEED)) continue; if (!NEED[c.loai].test(r.label)) { r.fl && r.fl.push('🎯 LỆCH NGHĨA'); F('🎯', r.t, `${r.key} là tiếng loại "${c.loai}" nhưng nhãn là "${r.label}" — đổi tiếng hoặc sửa nhãn cho đúng hình`); } }
else F('ℹ️', 0, 'chưa có tools/x/sfx-catalog.json → bỏ qua soát nghĩa (chạy tools/x/sfx-catalog.js)');
// 🗣️ CÓ GIỌNG: "tai máy" (tools/x/sfx-tag.js) nghe thấy giọng người trong tiếng hiệu ứng (speech ≥ 0.35) — anh ghét giọng lạ lẫn trong SE; giọng của chính nhân vật có mặt thì được
if (CATJ) for (const r of rows) { const c = CATJ[r.key]; if (!c || !c.giong) continue; const p = r.key.includes('_') ? r.key.split('_')[0] : null; if (p && casts.has(p)) continue; r.fl && r.fl.push('🗣️ CÓ GIỌNG'); F('🗣️', r.t, `${r.key}: tai máy nghe thấy giọng người (${Math.round(c.speech * 100)}%) — nghe lại / đổi tiếng`); }
const noLabel = rows.filter(r => !r.label).length; if (noLabel) F('🏷️', 0, `${noLabel}/${rows.length} tiếng chưa có NHÃN sự kiện (phần tử thứ 5 của mỗi dòng sfx)`);
if (!anyCast) F('🏷️', 0, 'phim chưa khai `cast` (tiền tố tiếng của nhân vật có mặt) → mọi tiếng có tiền tố meme đều bị coi là mượn');
// nhạc
const cover = [];
for (const m of mus) { const d = mp3dur(m.src), win = m.rb - m.ra; m.dur = d; m.fl = [];
  if (d == null) { m.fl.push('❌ THIẾU FILE'); F('❌', m.ra, `nhạc ${m.src}: thiếu file`); continue; }
  const play = m.loop ? win : Math.min(win, d - m.off); cover.push([m.ra, m.ra + play]);
  if (!m.loop && d - m.off < win - 0.5) { m.fl.push('⏹️ TẮT SỚM'); F('⏹️', m.ra + d - m.off, `nhạc ${path.basename(m.src)} dài ${d.toFixed(1)}s nhưng xếp phát ${win.toFixed(1)}s (${fmt(m.ra)}→${fmt(m.rb)}), không lặp → IM từ ${fmt(m.ra + d - m.off)} (thiếu ${(win - d + m.off).toFixed(1)}s)`); } }
cover.sort((a, b) => a[0] - b[0]); let end = 0; for (const [a, b] of cover) { if (a - end > 3) F('🔇', end, `không có nhạc / nền ${fmt(end)}→${fmt(a)} (${(a - end).toFixed(1)}s)`); end = Math.max(end, b); } if (DUR - end > 3) F('🔇', end, `không có nhạc / nền ${fmt(end)}→${fmt(DUR)} (${(DUR - end).toFixed(1)}s)`);
// chữ Hán / Nhật trong mã vẽ
for (const rel of [...new Set(filmFiles)]) { fs.readFileSync(path.join(ROOT, rel), 'utf8').split('\n').forEach((ln, i) => { if (/lint-ok:\s*cjk/.test(ln)) return; const code = ln.replace(/\/\/.*$/, '').replace(/\/\*.*?\*\//g, ''); const m = code.match(/[぀-ヿ㐀-鿿]+/g); if (m) F('🈲', 0, `${rel}:${i + 1} có chữ ${m.join(' ')} trong mã vẽ`); }); }

// ───────── báo cáo ─────────
const L = [];
L.push(`# Soát tiếng: ${ID} — dài ${DUR.toFixed(1)}s · ${rows.length} tiếng · ${mus.length} nhạc · cast [${[...casts].join(', ') || 'CHƯA KHAI'}]`, '');
const ORD = ['❌', '⏹️', '🎯', '🗣️', '👤', '🔁', '👥', '🈲', '🏷️', '🔇', 'ℹ️']; flags.sort((a, b) => ORD.indexOf(a.lv) - ORD.indexOf(b.lv) || a.t - b.t);
const bad = flags.filter(f => !['ℹ️', '🔇', '🏷️'].includes(f.lv)).length;
L.push(`## Lỗi (${bad} phải sửa · ${flags.length - bad} lưu ý)`); for (const f of flags) L.push(`- ${f.lv} ${f.t ? fmt(f.t) + ' ' : ''}${f.msg}`); if (!flags.length) L.push('- sạch');
L.push('', '## Nhạc / nền', '| phát | file | dài file | lặp | cờ |', '|---|---|---|---|---|');
for (const m of mus) L.push(`| ${fmt(m.ra)}→${fmt(m.rb)} | ${path.basename(m.src)} | ${m.dur == null ? '?' : m.dur.toFixed(1) + 's'} | ${m.loop ? 'có' : 'không'} | ${m.fl.join(' ')} |`);
L.push('', '## Bảng tiếng (đọc từng dòng: NHÃN sự kiện có khớp với "tiếng này thật ra là gì" không?)', '| giây | key | dài | to | NHÃN (việc trên hình) | tiếng này thật ra là gì (chú thích AUDIO_SAMPLES) | cờ |', '|---|---|---|---|---|---|---|');
for (const r of rows) L.push(`| ${fmt(r.t)} | ${r.key} | ${r.dur == null ? '?' : r.dur.toFixed(1) + 's'} | ${r.vol == null ? 1 : r.vol} | ${r.label || '—'} | ${(r.note || '').replace(/\|/g, '/').slice(0, 110)} | ${(r.fl || []).filter(x => x !== '🏷️').join(' ')} |`);
const text = L.join('\n'); if (OUT) fs.writeFileSync(path.resolve(OUT), text); else process.stdout.write(text + '\n');
console.error(`${ID}: ${bad} lỗi phải sửa, ${flags.length - bad} lưu ý${OUT ? ' → ' + OUT : ''}`); process.exit(bad ? 1 : 0);
