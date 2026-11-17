// 📐 SOÁT NHỊP PHIM THEO BẢNG PHÂN CẢNH (Mac + Windows, Node thuần). Chạy cùng sfx-lint TRƯỚC khi báo anh mọi phim cine-kit (film-check.js tự gọi).
//   node tools/x/film-lint.js <idPhim> [--file <tên file film-*.js nếu khác id>] [--out bao-cao.md]
//   Windows: powershell -NoProfile -ExecutionPolicy Bypass -File tools/node.ps1 tools/x/film-lint.js fin1c4 --out <scratchpad>/fin1c4-shots.md
// Nạp shotlist js/shots/<id>.json + nạp phim thật trong máy ảo Node (cách của sfx-lint.js) → lấy DUR, máy quay (def.shots), lịch tiếng có nhãn, def.impact.
// SHOTLIST (Bước 6 KE-HOACH-NANG-CAP.md, meme-anime-lab): mảng [{t0,t1,co,goc,hanhDong,loai,anh:[key ảnh trong imgs],sfx:[key tiếng],ghiChu}]
//   co   : toàn | trung | cận | cực cận | đặc tả            goc : ngang | giun | chim | chéo | qua vai
//   loai : đánh | combo | đối mặt | ra chiêu | nổ lớn | thở | chuyển cảnh | lãnh địa | giới thiệu   (combo = 1 góc trong chuỗi đổi góc nhanh 0.08–0.25s)
//   1 dòng = 1 shot NHÌN THẤY (máy quay 1 shot mà lớp vẽ đổi hẳn hình — vd chuỗi lãnh địa — thì tách nhiều dòng).
// Luật (12/11/2026 ĐỔI — anh chê trận phụ "rush, quá nhanh, đau mắt, không rõ cách đánh". Luật cũ học từ AMV fight-1 (cắt 0.6s/shot) → SAI cho
//   trận đánh thật. Số mới đo từ bản GỐC còn tiếng gốc: jjk-todo-hanami TB 1.34s, 84% thời gian ở shot ≥1s · jjk-gojo-toji TB 1.83s, 72% ở shot >2s,
//   chỉ 3% ở shot <0.6s — meme-anime-lab/playbook/nhip.md mục "Trận đánh thật"):
//   ❌ PHỦ        shotlist phủ kín 0 → DUR, không hở / chồng             ❌ GIÁ TRỊ   co / goc / loai ngoài danh sách trên
//   ❌ ĐÁNH       shot 'đánh' 0.6–4.5s: 1 shot chứa TRỌN 1 pha (lấy đà → ra đòn → trúng/đỡ → phản ứng), máy bám theo — không cắt mỗi động tác 1 shot
//   ❌ VỤN        tổng thời gian shot < 0.5s ≤ 12% phim (anime gốc 3–7%) · ❌ NHỊP  shot TB ≥ 1.1s và ≥ 60% thời gian nằm ở shot ≥ 1s
//   ❌ DÀI        không shot nào > 7s (jjk-todo-hanami có shot bám đuổi 6.2–6.5s)
//   ❌ CỠ         mỗi 15s có ≥ 3 cỡ cảnh khác nhau                         ❌ THỞ       sau 'nổ lớn' phải có 'thở' 1.2–4s bắt đầu trong 2s (gojo-toji: giữ hậu quả 2.5–4s)
//   ❌ ÂM BẢN     khung impact ('inv'|'bw'|'red') CHỈ dùng cho đòn lớn: ≤ 1 lần / 8s và mỗi lần phải trùng (±0.12s) một tiếng có nhãn đấm/trúng/va/đập/đâm/chém
//                 (luật cũ bắt MỌI va chạm phải chớp âm bản → chớp liên tục, đau mắt)
//   ❌ ẢNH        key ảnh khai trong shotlist phải có trong imgs của phim
//   ℹ️ lưu ý     máy quay cắt ở giây không có ranh giới shot · máy đứng yên > 3s · tiếng khai trong shot mà lịch sfx không có ở khoảng đó
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..', '..'), args = process.argv.slice(2), opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const ID = args[0], FILE = opt('--file', null), OUT = opt('--out', null);
if (!ID || ID.startsWith('--')) { console.error('cách dùng: film-lint.js <idPhim> [--file tên] [--out bao-cao.md]'); process.exit(2); }
const SL = path.join(ROOT, 'js', 'shots', ID + '.json');
if (!fs.existsSync(SL)) { console.error('không có ' + path.relative(ROOT, SL)); process.exit(2); }
let list; try { list = JSON.parse(fs.readFileSync(SL, 'utf8')); } catch (e) { console.error('shotlist hỏng JSON: ' + e.message); process.exit(3); }
if (!Array.isArray(list)) { console.error('shotlist phải là mảng'); process.exit(3); }

// ───────── máy ảo (chép từ sfx-lint.js): đủ để chạy phần khai báo của cine-kit + film (không vẽ) ─────────
const noop = () => {}, ctxProxy = new Proxy(function () {}, { get: (t, k) => k === 'canvas' ? { width: 1, height: 1 } : k === 'measureText' ? () => ({ width: 10 }) : k === 'getImageData' ? () => ({ data: new Uint8ClampedArray(4) }) : k === 'createLinearGradient' || k === 'createRadialGradient' || k === 'createPattern' ? () => ({ addColorStop: noop, setTransform: noop }) : noop, set: () => true });
const fakeCanvas = () => ({ width: 1, height: 1, style: {}, getContext: () => ctxProxy, toDataURL: () => '', appendChild: noop, remove: noop });
function FakeImage() { this.complete = false; this.naturalWidth = 0; }
const sandbox = { console: { log: noop, warn: noop, error: noop }, performance: { now: () => 0 }, requestAnimationFrame: noop, cancelAnimationFrame: noop, setTimeout, clearTimeout,
  document: { createElement: fakeCanvas, body: { appendChild: noop }, fonts: { add: noop }, currentScript: { src: 'js/film-x.js' }, addEventListener: noop },
  Image: FakeImage, FontFace: function () { this.load = () => Promise.resolve(this); }, DOMMatrix: function () { this.scale = () => this; this.rotate = () => this; },
  XMLHttpRequest: function () { let u = ''; this.open = (m, url) => { u = url; }; this.send = () => { const rel = u.split('?')[0].replace(/^.*?js\//, 'js/'), p = path.join(ROOT, rel); try { this.responseText = fs.readFileSync(p, 'utf8'); this.status = 200; } catch (e) { this.status = 404; } }; },
  navigator: { userAgent: 'node' }, location: { href: 'http://x/' }, Math, Date, JSON, Promise, Float32Array, Uint8Array, Uint8ClampedArray, Array, Object, Set, Map, Proxy, Symbol, isFinite, parseFloat, parseInt, String, Number, Boolean, Error, RegExp };
sandbox.window = sandbox; sandbox.globalThis = sandbox; sandbox.self = sandbox; sandbox.eval = code => vm.runInContext(code, sandbox);
vm.createContext(sandbox);
const run = rel => { const p = path.join(ROOT, rel); if (!fs.existsSync(p)) return false; sandbox.document.currentScript.src = rel; vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: rel }); return true; };
for (const f of ['js/cine-kit.js', 'js/cine-cam.js', 'js/vfx-manga.js']) { try { run(f); } catch (e) { console.error('không nạp được ' + f + ': ' + e.message); if (f === 'js/cine-kit.js') process.exit(3); } }
const K = sandbox.CineKit; if (!K) { console.error('CineKit không gắn'); process.exit(3); }
const loadFilm = base => { try { run('js/film-' + base + '.js'); } catch (e) { console.error('lỗi khi nạp js/film-' + base + '.js: ' + e.message); process.exit(3); } };
loadFilm(FILE || ID); if (!K.films[ID] && !FILE) { const m = ID.match(/^(.*?)(c\d+)$/); if (m) loadFilm(m[1]); }
const film = K.films[ID]; if (!film) { console.error('không có phim ' + ID + ' (đã nạp: ' + Object.keys(K.films).join(', ') + ')'); process.exit(3); }

// ───────── gom dữ liệu phim (phim đơn hoặc tập nhiều cảnh — giây của cả tập) ─────────
const def = film.def || {}, cams = [], sfx = [], imps = [], imgs = new Set();
let DUR = 0;
const take = (d, off) => { for (const s of (d.shots || [])) cams.push({ t0: s.t0 + off, t1: s.t1 + off, still: JSON.stringify(s.a) === JSON.stringify(s.b || s.a) });
  for (const s of (d.sfx || [])) sfx.push({ t: s[0] + off, key: s[1], label: typeof s[4] === 'string' ? s[4] : '' });
  if (typeof d.impact === 'function') imps.push({ a: off, b: off + (d.DUR || 0), fn: d.impact });
  Object.keys(d.imgs || {}).forEach(k => imgs.add(k)); };
if (def.parts) { for (const pid of def.parts) { const d = K.films[pid] && K.films[pid].def; if (!d) continue; take(d, DUR); DUR += d.DUR || 0; } }
else { DUR = def.DUR || (film.info ? film.info().dur : 0); take(def, 0); }
cams.sort((a, b) => a.t0 - b.t0); sfx.sort((a, b) => a.t - b.t);
const impactAt = t => { for (const m of imps) if (t >= m.a && t < m.b) { try { return m.fn(t - m.a); } catch (e) { return 0; } } return 0; };

// ───────── soát ─────────
const CO = ['toàn', 'trung', 'cận', 'cực cận', 'đặc tả'], GOC = ['ngang', 'giun', 'chim', 'chéo', 'qua vai'];
const LOAI = ['đánh', 'combo', 'đối mặt', 'ra chiêu', 'nổ lớn', 'thở', 'chuyển cảnh', 'lãnh địa', 'giới thiệu'];
const flags = [], F = (lv, t, msg) => flags.push({ lv, t, msg }), EPS = 0.005;
const fmt = t => { const m = Math.floor(t / 60), s = t - m * 60; return (m ? m + ':' : '') + (m && s < 10 ? '0' : '') + s.toFixed(2); };
const rng = s => `${fmt(s.t0)}–${fmt(s.t1)}`, len = s => s.t1 - s.t0;
const S = list.map((s, i) => Object.assign({ i: i + 1, fl: [] }, s, { t0: +s.t0, t1: +s.t1 })).sort((a, b) => a.t0 - b.t0);
const mark = (s, tag) => { if (!s.fl.includes(tag)) s.fl.push(tag); };
// giá trị + phủ kín
for (const s of S) {
  if (!(s.t1 > s.t0)) { F('❌', s.t0, `shot #${s.i} ${rng(s)}: t1 phải > t0`); mark(s, '❌ GIỜ'); }
  if (!CO.includes(s.co)) { F('❌', s.t0, `shot #${s.i} ${rng(s)}: co "${s.co}" không thuộc [${CO.join(' | ')}]`); mark(s, '❌ co'); }
  if (!GOC.includes(s.goc)) { F('❌', s.t0, `shot #${s.i} ${rng(s)}: goc "${s.goc}" không thuộc [${GOC.join(' | ')}]`); mark(s, '❌ goc'); }
  if (!LOAI.includes(s.loai)) { F('❌', s.t0, `shot #${s.i} ${rng(s)}: loai "${s.loai}" không thuộc [${LOAI.join(' | ')}]`); mark(s, '❌ loai'); } }
if (!S.length) F('❌', 0, 'shotlist rỗng');
else { if (S[0].t0 > EPS) F('❌', 0, `shotlist bắt đầu ở ${fmt(S[0].t0)}, hở 0→${fmt(S[0].t0)}`);
  for (let i = 1; i < S.length; i++) { const g = S[i].t0 - S[i - 1].t1;
    if (g > EPS) F('❌', S[i - 1].t1, `HỞ ${fmt(S[i - 1].t1)}→${fmt(S[i].t0)} (${g.toFixed(2)}s) giữa shot #${S[i - 1].i} và #${S[i].i}`);
    else if (g < -EPS) { F('❌', S[i].t0, `CHỒNG ${fmt(S[i].t0)}→${fmt(S[i - 1].t1)} (${(-g).toFixed(2)}s) giữa shot #${S[i - 1].i} và #${S[i].i}`); mark(S[i], '❌ CHỒNG'); } }
  const end = S[S.length - 1].t1; if (Math.abs(end - DUR) > EPS) F('❌', end, `shotlist kết thúc ở ${fmt(end)} nhưng phim dài ${fmt(DUR)}`); }
// độ dài
for (const s of S) { const d = len(s);
  if (s.loai === 'đánh' && (d < 0.6 - EPS || d > 4.5 + EPS)) { F('❌', s.t0, `shot đánh #${s.i} ${rng(s)} dài ${d.toFixed(2)}s — cần 0.6–4.5s (1 shot = trọn 1 pha, máy bám theo)${d > 4.5 ? ': tách pha' : ': gộp với shot kề — đừng cắt mỗi động tác 1 shot'}`); mark(s, '❌ ĐÁNH ' + d.toFixed(2) + 's'); }
  if (s.loai === 'combo' && (d < 0.08 - EPS || d > 0.4 + EPS)) { F('❌', s.t0, `shot combo #${s.i} ${rng(s)} dài ${d.toFixed(2)}s — cần 0.08–0.4s/góc (chỉ làm điểm nhấn)`); mark(s, '❌ COMBO ' + d.toFixed(2) + 's'); }
  if (d > 7 + EPS) { const mv = cams.some(c => c.t0 < s.t1 - EPS && c.t1 > s.t0 + EPS && !c.still); F('❌', s.t0, `shot #${s.i} ${rng(s)} (${s.loai}) dài ${d.toFixed(2)}s > 7s${mv ? '' : ', máy đứng yên'} — cắt thêm góc`); mark(s, '❌ DÀI'); } }
// nhịp tổng (chỉ phim có đánh nhau): shot vụn < 0.5s ≤ 12% · TB ≥ 1.1s · ≥ 60% thời gian ở shot ≥ 1s
if (S.length && S.some(s => s.loai === 'đánh' || s.loai === 'combo')) { const tot = S.reduce((a, s) => a + len(s), 0), vun = S.filter(s => len(s) < 0.5 - EPS).reduce((a, s) => a + len(s), 0), dai = S.filter(s => len(s) >= 1 - EPS).reduce((a, s) => a + len(s), 0), tb = tot / S.length;
  if (vun / tot > 0.12) F('❌', 0, `shot vụn (< 0.5s) chiếm ${Math.round(100 * vun / tot)}% thời gian — tối đa 12% (anime gốc 3–7%): cắt nhanh liên tục làm đau mắt, gộp lại thành shot bám theo pha`);
  if (tb < 1.1) F('❌', 0, `shot trung bình ${tb.toFixed(2)}s — cần ≥ 1.1s (jjk-todo-hanami 1.34s, jjk-gojo-toji 1.83s)`);
  if (dai / tot < 0.6) F('❌', 0, `chỉ ${Math.round(100 * dai / tot)}% thời gian ở shot ≥ 1s — cần ≥ 60% (anime gốc 84–91%)`); }
// cỡ cảnh mỗi 10s (cửa sổ 0–10, 10–20 …, cửa sổ cuối dóng vào DUR)
const WIN = 15, wins = []; for (let a = 0; a + WIN <= DUR + EPS; a += WIN) wins.push(a); if (DUR > WIN && DUR - (wins[wins.length - 1] + WIN) > 1) wins.push(DUR - WIN); if (DUR <= WIN) wins.splice(0, wins.length, 0);
for (const a of wins) { const b = Math.min(DUR, a + WIN), cs = new Set(S.filter(s => s.t0 < b - 0.1 && s.t1 > a + 0.1).map(s => s.co));
  if (cs.size < 3) F('❌', a, `${fmt(a)}–${fmt(b)} chỉ có ${cs.size} cỡ cảnh [${[...cs].join(', ')}] — cần ≥ 3 / 15s (xen toàn ↔ cận)`); }
// khoảng thở sau nổ lớn (chuỗi 'nổ lớn' liền nhau tính là 1)
for (let i = 0; i < S.length; i++) { if (S[i].loai !== 'nổ lớn' || (S[i + 1] && S[i + 1].loai === 'nổ lớn')) continue;
  const e = S[i].t1, br = S.find(s => s.loai === 'thở' && s.t0 >= e - EPS && s.t0 <= e + 2 + EPS);
  if (!br) { F('❌', e, `sau nổ lớn #${S[i].i} (hết ${fmt(e)}) không có shot 'thở' trong 2s — cần 1.2–4s giữ yên nhìn hậu quả`); mark(S[i], '❌ THIẾU THỞ'); }
  else if (len(br) < 1.2 - EPS || len(br) > 4 + EPS) { F('❌', br.t0, `thở #${br.i} ${rng(br)} sau nổ lớn #${S[i].i} dài ${len(br).toFixed(2)}s — cần 1.2–4s`); mark(br, '❌ THỞ ' + len(br).toFixed(2) + 's'); } }
// khung âm bản ở mỗi va chạm
const HIT = /(^|[^\p{L}])(đấm|trúng|va|đập|đâm|chém)(?![\p{L}])/iu, NEG = ['inv', 'bw', 'red'];
const hits = sfx.filter(r => HIT.test(r.label));
for (const r of hits) { let got = null; for (let t = r.t - 0.1; t <= r.t + 0.1 + 1e-9; t += 0.005) { const v = impactAt(Math.max(0, t)); if (NEG.includes(v)) { got = { v, t }; break; } } r.neg = got; }
// các LẦN chớp âm bản (đoạn liền nhau tính 1 lần): ≤ 1 lần / 8s, mỗi lần phải trùng 1 tiếng va chạm
const negs = []; { let on = false; for (let t = 0; t < DUR; t += 1 / 60) { const v = NEG.includes(impactAt(t)); if (v && !on) negs.push(t); on = v; } }
const NEGMAX = Math.max(1, Math.floor(DUR / 8));
if (negs.length > NEGMAX) F('❌', negs[0] || 0, `chớp âm bản ${negs.length} lần / ${DUR.toFixed(0)}s — tối đa ${NEGMAX} (1 lần / 8s, chỉ đòn lớn): chớp nhiều làm đau mắt`);
for (const t of negs) if (!hits.some(r => Math.abs(r.t - t) <= 0.12)) F('❌', t, `chớp âm bản ở ${fmt(t)} không trùng tiếng va chạm nào (nhãn có đấm/trúng/va/đập/đâm/chém) trong ±0.12s`);
// ảnh
for (const s of S) for (const k of (s.anh || [])) if (!imgs.has(k)) { F('❌', s.t0, `shot #${s.i} ${rng(s)}: ảnh "${k}" không có trong imgs của phim`); mark(s, '❌ ẢNH ' + k); }
// lưu ý: máy quay ↔ shotlist, máy đứng yên lâu, tiếng khai mà lịch không có
const bounds = S.map(s => s.t0).concat(S.length ? [S[S.length - 1].t1] : []);
for (const c of cams) { if (!bounds.some(b => Math.abs(b - c.t0) < 0.02)) F('ℹ️', c.t0, `máy quay cắt ở ${fmt(c.t0)} nhưng shotlist không có ranh giới ở đó`);
  if (c.still && c.t1 - c.t0 > 3 + EPS) F('ℹ️', c.t0, `máy quay đứng yên ${fmt(c.t0)}–${fmt(c.t1)} (${(c.t1 - c.t0).toFixed(1)}s) — chỉ ổn nếu lớp vẽ đổi hình (soát bằng mắt)`); }
for (const s of S) for (const k of (s.sfx || [])) if (!sfx.some(r => r.key === k && r.t >= s.t0 - 0.15 && r.t < s.t1 + 0.15)) F('ℹ️', s.t0, `shot #${s.i} ${rng(s)} khai tiếng ${k} nhưng lịch sfx của phim không có ${k} ở khoảng này`);
if (!cams.length) F('ℹ️', 0, 'phim không khai def.shots (máy quay) → bỏ qua so khớp máy quay');

// ───────── báo cáo ─────────
const L = [], cnt = {}; S.forEach(s => cnt[s.loai] = (cnt[s.loai] || 0) + 1);
L.push(`# Soát nhịp: ${ID} — dài ${DUR.toFixed(1)}s · ${S.length} shot (${Object.entries(cnt).map(([k, n]) => k + ' ' + n).join(', ')}) · ${cams.length} shot máy quay · ${hits.length} va chạm`, '');
flags.sort((a, b) => (a.lv === 'ℹ️') - (b.lv === 'ℹ️') || a.t - b.t);
const bad = flags.filter(f => f.lv === '❌').length;
L.push(`## Lỗi (${bad} phải sửa · ${flags.length - bad} lưu ý)`); for (const f of flags) L.push(`- ${f.lv} ${fmt(f.t)} ${f.msg}`); if (!flags.length) L.push('- sạch');
L.push('', '## Bảng phân cảnh', '| # | giây | dài | cỡ | góc | loại | hành động | ảnh | tiếng | cờ |', '|---|---|---|---|---|---|---|---|---|---|');
for (const s of S) L.push(`| ${s.i} | ${rng(s)} | ${len(s).toFixed(2)} | ${s.co} | ${s.goc} | ${s.loai} | ${String(s.hanhDong || '').replace(/\|/g, '/')}${s.ghiChu ? ' · ' + String(s.ghiChu).replace(/\|/g, '/') : ''} | ${(s.anh || []).join(' ')} | ${(s.sfx || []).join(' ')} | ${s.fl.join(' ')} |`);
L.push('', `## Va chạm ↔ khung âm bản (chớp ${negs.length} lần: ${negs.map(fmt).join(', ')})`, '| giây | tiếng | nhãn | khung |', '|---|---|---|---|');
for (const r of hits) L.push(`| ${fmt(r.t)} | ${r.key} | ${r.label.replace(/\|/g, '/')} | ${r.neg ? r.neg.v + ' @' + fmt(r.neg.t) : '—'} |`);
const text = L.join('\n'); if (OUT) fs.writeFileSync(path.resolve(OUT), text); else process.stdout.write(text + '\n');
console.error(`${ID}: ${bad} lỗi nhịp phải sửa, ${flags.length - bad} lưu ý${OUT ? ' → ' + OUT : ''}`); process.exit(bad ? 1 : 0);
