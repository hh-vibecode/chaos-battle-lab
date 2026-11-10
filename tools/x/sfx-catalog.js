// 📚 DANH MỤC TIẾNG (Mac + Windows, Node thuần) → tools/x/sfx-catalog.json — đọc trước khi chọn tiếng cho phim, đừng đoán theo tên file.
//   node tools/x/sfx-catalog.js            (Windows: powershell -NoProfile -ExecutionPolicy Bypass -File tools/node.ps1 tools/x/sfx-catalog.js)
//   node tools/x/sfx-catalog.js --find rơi  → in các tiếng thuộc loại / mô tả có chữ đó
// Mỗi key: file, dài (giây), mô tả (chú thích AUDIO_SAMPLES), loai (đoán từ tên + mô tả — sửa tay trong FIX bên dưới khi sai),
//   chu (tiền tố meme sở hữu, null = dùng chung), nhac (SND_MUSIC), dung (phim / file đang dùng), tai (nhãn "tai máy" — Bước 3b, chưa có thì null).
// Giữ lại `loai` / `tai` / `moTa` đã sửa tay ở lần chạy trước (khoá `tay:true`).
const fs = require('fs'), path = require('path'), ROOT = path.resolve(__dirname, '..', '..'), OUT = path.join(__dirname, 'sfx-catalog.json');
const args = process.argv.slice(2), FIND = args.includes('--find') ? args[args.indexOf('--find') + 1] : null;
const GENERIC = ['cine', 'ep3', 'l2p', 'fin', 'vine', 'duo', 'ui', 'sfx', 'hit', 'boom', 'whoosh'];
// loại tiếng: [tên loại, regex trên key + mô tả]
const TYPES = [['nhạc', /music|theme|song|anthem|bgm|piano|guitar|violin|remix|beat|nhạc/i], ['giọng', /voice|giọng|scream|cry|khóc|laugh|cười|shout|hét|roar|gầm|talk|nói|say|meow|moan|sigh|breath|thở|choke|cough/i],
  ['rơi', /drop|fall|rơi|whistle/i], ['vỡ', /glass|kính|crack|nứt|shatter|vỡ|break|rock|đá|rubble/i], ['nổ', /explode|explosion|nổ|boom|blast|bomb/i],
  ['rung', /quake|rumble|rung|động đất|sub|tremor/i], ['va chạm', /hit|punch|impact|đấm|đập|slam|smash|kick|strike|clash|thud|klunk/i],
  ['vút', /whoosh|swish|swing|dash|lướt|vút|schwing|slash|chém|wind|gió/i], ['năng lượng', /charge|riser|shimmer|shine|chime|aura|energy|power|haki|force|lực|kamui|portal|xoáy|glow|zap|thunder|sét|laser|beam/i],
  ['nền', /ambient|city|crowd|đám đông|nền|rain|mưa|fire|lửa|lava|room|traffic/i], ['máy móc', /hydraulic|ratchet|chain|xích|gear|click|blip|beep|ui|duo_/i]];
const FIX = { cine_drop: 'rơi', cine_deep_impact: 'va chạm', cine_haki_hit: 'va chạm', ep3_force: 'năng lượng', ps_shinra: 'giọng', mw_gojo: 'năng lượng', mw_gojo_travel: 'năng lượng', vine_boom: 'va chạm', dp_cloak: 'vút' };
const game = fs.readFileSync(path.join(ROOT, 'js/game.js'), 'utf8');
const MUS = new Set(((game.match(/const SND_MUSIC=new Set\(\[([^\]]*)\]/) || [, ''])[1].match(/"([^"]+)"/g) || []).map(s => s.slice(1, -1)));
const BR1 = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320], BR2 = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160], SR = { 3: [44100, 48000, 32000], 2: [22050, 24000, 16000], 0: [11025, 12000, 8000] };
function mp3dur(p) { if (!fs.existsSync(p)) return null; const b = fs.readFileSync(p); let i = 0, t = 0; if (b.toString('latin1', 0, 3) === 'ID3') i = 10 + ((b[6] & 127) << 21 | (b[7] & 127) << 14 | (b[8] & 127) << 7 | (b[9] & 127));
  while (i < b.length - 4) { if (b[i] !== 0xFF || (b[i + 1] & 0xE0) !== 0xE0) { i++; continue; } const v = (b[i + 1] >> 3) & 3, l = (b[i + 1] >> 1) & 3, bi = (b[i + 2] >> 4) & 15, si = (b[i + 2] >> 2) & 3, pd = (b[i + 2] >> 1) & 1;
    if (v === 1 || l !== 1 || bi === 0 || bi === 15 || si === 3) { i++; continue; } const br = (v === 3 ? BR1 : BR2)[bi] * 1000, sr = SR[v][si], spf = v === 3 ? 1152 : 576, len = Math.floor(spf / 8 * br / sr) + pd; if (len < 24) { i++; continue; } t += spf / sr; i += len; }
  return Math.round(t * 100) / 100; }
if (FIND) { const C = JSON.parse(fs.readFileSync(OUT, 'utf8')), re = new RegExp(FIND, 'i'); for (const [k, v] of Object.entries(C.tieng)) if (re.test(v.loai) || re.test(v.moTa) || re.test(k) || re.test((v.tai || []).join(' '))) console.log(`${k.padEnd(24)} ${String(v.dai).padStart(5)}s  ${v.loai.padEnd(10)} ${v.chu ? '[' + v.chu + '] ' : ''}${v.moTa.slice(0, 90)}`); process.exit(0); }
const old = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')).tieng || {} : {};
// nơi đang dùng: phim cine-kit + phim cũ (js/*.js) — tìm 'key' trong ngoặc
const used = {}; for (const f of fs.readdirSync(path.join(ROOT, 'js')).filter(f => f.endsWith('.js'))) { const s = fs.readFileSync(path.join(ROOT, 'js', f), 'utf8'); for (const m of s.matchAll(/['"]([a-z0-9]+_[a-z0-9_]+)['"]/g)) (used[m[1]] = used[m[1]] || new Set()).add(f.replace(/\.js$/, '')); }
const T = {};
for (const ln of game.split('\n')) { const ms = [...ln.matchAll(/([a-zA-Z0-9_]+)\s*:\s*'(assets\/audio\/[^']+)'/g)]; if (!ms.length) continue; const cm = ln.match(/\/\/\s*(.*)$/), note = cm ? cm[1].trim() : '';
  for (const m of ms) { const k = m[1], o = old[k] || {}, desc = o.tay ? o.moTa : (ms.length === 1 ? note : ''), hay = k.replace(/_/g, ' ') + ' ' + desc;
    const p = k.includes('_') ? k.split('_')[0] : null, loai = o.tay ? o.loai : MUS.has(k) ? 'nhạc' : FIX[k] || (TYPES.find(([, re]) => re.test(hay)) || ['?'])[0];
    T[k] = { file: m[2], dai: mp3dur(path.join(ROOT, m[2])), moTa: desc, loai, chu: p && !GENERIC.includes(p) ? p : null, nhac: MUS.has(k), dung: [...(used[k] || [])].filter(f => f !== 'game').sort(), tai: o.tai || null, ...(o.tay ? { tay: true } : {}) }; } }
const thieu = Object.entries(T).filter(([, v]) => v.dai == null).map(([k]) => k), chuaLoai = Object.entries(T).filter(([, v]) => v.loai === '?').map(([k]) => k);
fs.writeFileSync(OUT, JSON.stringify({ ghiChu: 'Sinh bởi tools/x/sfx-catalog.js — sửa tay loai/moTa thì thêm "tay":true để lần chạy sau giữ nguyên', ngay: new Date(Date.now() + 7 * 3600e3).toISOString().slice(0, 10), tieng: T }, null, 1));
const byType = {}; for (const v of Object.values(T)) byType[v.loai] = (byType[v.loai] || 0) + 1;
console.log(`${Object.keys(T).length} tiếng → ${path.relative(ROOT, OUT)} · theo loại: ${Object.entries(byType).sort((a, b) => b[1] - a[1]).map(([k, n]) => k + ' ' + n).join(', ')}`);
if (thieu.length) console.log('thiếu file: ' + thieu.join(', ')); if (chuaLoai.length) console.log(`chưa đoán được loại (${chuaLoai.length}): ` + chuaLoai.slice(0, 40).join(', ') + (chuaLoai.length > 40 ? '…' : ''));
