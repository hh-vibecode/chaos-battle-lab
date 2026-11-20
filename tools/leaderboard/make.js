// 🏆 Leaderboard "Memes in the Multiverse" (anh dặn 18/11/2026) — tổng hợp Thắng / Thua / Hoà của từng meme từ các SHORT ĐÃ ĐĂNG trên kênh
//   node tools/leaderboard/make.js [--out <thư mục>] [--offline <shorts.json>]
// Cách tính:
//   - Chỉ đọc TIÊU ĐỀ Short trên kênh (yt-dlp --flat-playlist, không tải video) → chỉ video đã công khai (video đang lên lịch không hiện ra).
//   - Tính từ 01/11/2026 (Short đầu tiên: START_ID) tới mới nhất, BỎ tiêu đề có "lore". Mỗi lần chạy tính lại TỪ ĐẦU theo danh sách
//     → không cộng trùng, không sót tuần nào (1 video đếm 1 lần theo mã video, cùng tiêu đề đăng 2 lần cũng chỉ đếm 1).
//   - Ai thắng: render-match / render-duo chỉ ghi LỊCH SỬ (history.json). Thấy Short trên kênh → lần quay mới nhất cùng tên được đưa vào
//     results.json (khoá theo mã video, anh dặn 20/11). Short chưa có kết quả → KHÔNG tính,
//     ghi ra "Thieu ket qua.txt" cạnh ảnh để bổ sung.
//   - 2vs2: cả đội thắng đều +1 thắng. Last One Standing: con sống sót +1 thắng, các con khác +1 thua. Hoà (win rỗng): mọi con +1 hoà.
//   - Xếp hạng: nhiều trận thắng hơn đứng trên → bằng thì ít thua hơn → bằng hết thì cùng hạng.
const fs = require('fs'), path = require('path'), os = require('os'), { execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '../..'), args = process.argv.slice(2), opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const CHANNEL = 'https://www.youtube.com/@meme-autobattler/shorts';
const START_ID = 'mijHGZlNGV0';   // "Gigachad vs Infinity Doge" — Short đầu tiên của 01/11/2026 (anh chỉ mốc)
const OUT_DIR = opt('--out', path.join(os.homedir(), 'Desktop/Meme Battles/0. Leaderboard'));
const { load, norm, publish } = require('./record.js');

// tên trong tiêu đề → key meme: lấy defaultName trong CHAR_DEFS (phần trước " - ") + vài tên gọi tắt anh hay dùng
const G = fs.readFileSync(path.join(ROOT, 'js/game.js'), 'utf8'), DEFS = {};
for (const m of G.matchAll(/(\w+):\s*\{\s*key:'(\w+)',\s*defaultName:'([^']*)'/g)) DEFS[m[2]] = m[3];
const short = n => n.split(' - ')[0].trim();
const BY_NAME = {}; for (const k in DEFS) BY_NAME[short(DEFS[k]).toLowerCase()] = k;
Object.assign(BY_NAME, { 'stalin': 'stalincat', 'drooling cat': 'droolingcat', 'jonin cheems': 'samuraicheems', 'joninn cheems': 'samuraicheems',
  'fine dog': 'finedog', 'friend': 'friendeldritch', 'giant friend': 'friendeldritch', 'friend eldritch': 'friendeldritch', 'mosquito violin': 'mosquitoviolin' });
const NAME = { friendeldritch: 'Giant Friend', finedog: 'Fine Dog', samuraicheems: 'Jonin Cheems', droolingcat: 'Drooling Cats' };   // tên hiện trên bảng
const HIDE = new Set(['trainingdummy', 'fanchar']);   // không phải meme đấu thật
// avatar: đúng ảnh game dùng (_mcDefaultAvatars), không có thì assets/avatars/<key>/avatarUrl.*
const AVM = {}; for (const m of ((G.match(/const _mcDefaultAvatars=\{([^\n]*)/) || [])[1] || '').matchAll(/(\w+):\s*'([^']+)'/g)) AVM[m[1]] = m[2];
AVM.arabiccat = AVM.arabiccat || (G.match(/const AR_FR=\[\s*'([^']+)'/) || [])[1];
const avatar = k => { if (AVM[k]) return AVM[k]; for (const f of ['avatarUrl.webp', 'avatarUrl.png', 'thumb.webp']) if (fs.existsSync(path.join(ROOT, 'assets/avatars', k, f))) return `assets/avatars/${k}/${f}`; return ''; };

function shorts() {
  const off = opt('--offline', null);
  const raw = off ? fs.readFileSync(off, 'utf8') : execFileSync('python3', ['-m', 'yt_dlp', '--flat-playlist', '-J', CHANNEL], { encoding: 'utf8', maxBuffer: 64 << 20, stdio: ['ignore', 'pipe', 'ignore'] });
  return (JSON.parse(raw).entries || []).map(e => ({ id: e.id, title: e.title || '' }));
}
// "A & B vs C - Meme Battle" → [['a','b'],['c']] (null = tên lạ)
const teamsOf = title => title.replace(/^\(rematch\)\s*/i, '').replace(/\s+-\s+(Meme Battle|Last One Standing Mode).*$/i, '')
  .split(/\s+vs\.?\s+/i).map(s => s.split(/\s*&\s*/).map(n => BY_NAME[n.trim().toLowerCase()] || null));

(async () => {
  const all = shorts(), cut = all.findIndex(e => e.id === START_ID);
  if (cut < 0) throw new Error('không thấy Short mốc 01/11 (' + START_ID + ') trong danh sách kênh');
  const db = load().matches, st = {}, missing = [], seenId = new Set(), seenTitle = new Set(); let counted = 0;
  for (const e of all.slice(0, cut + 1)) {
    if (/lore/i.test(e.title) || seenId.has(e.id)) continue; seenId.add(e.id);
    const nt = norm(e.title); if (seenTitle.has(nt)) { missing.push(`TRÙNG TIÊU ĐỀ (đếm 1 lần): ${e.title}  [${e.id}]`); continue; } seenTitle.add(nt);
    const teams = teamsOf(e.title), r = publish(nt, e.id) || db[nt];   // ✅ Short đã lên kênh → lấy lần quay mới nhất trong history.json vào leaderboard (khoá theo mã video)
    if (teams.length < 2 || teams.flat().some(k => !k)) { missing.push(`TÊN MEME LẠ: ${e.title}  [${e.id}]`); continue; }
    if (!r) { missing.push(`CHƯA CÓ KẾT QUẢ: ${e.title}  [${e.id}]`); continue; }
    const W = new Set(r.win || []);
    if (W.size && !teams.some(t => t.every(k => W.has(k)))) { missing.push(`KẾT QUẢ KHÔNG KHỚP TIÊU ĐỀ (thắng: ${[...W].join(',')}): ${e.title}  [${e.id}]`); continue; }
    counted++;
    for (const t of teams) for (const k of t) { const s = st[k] || (st[k] = { w: 0, l: 0, d: 0 }); if (!W.size) s.d++; else if (W.has(k)) s.w++; else s.l++; }
  }
  // MỌI meme trong game (anh 18/11: "t có nhiều hơn 43 meme") — con chưa đấu trận nào đứng cuối, không xếp hạng
  for (const k in DEFS) if (!HIDE.has(k) && !st[k]) st[k] = { w: 0, l: 0, d: 0 };
  const played = s => s.w + s.l + s.d > 0;
  const rows = Object.entries(st).map(([k, s]) => ({ key: k, name: NAME[k] || short(DEFS[k] || k), img: '../../' + avatar(k), ...s }))
    .sort((a, b) => played(b) - played(a) || b.w - a.w || a.l - b.l || b.d - a.d || a.name.localeCompare(b.name));
  let rk = 0; rows.forEach((x, i) => { const p = rows[i - 1]; if (!played(x)) { x.rk = null; return; } if (!p || p.w !== x.w || p.l !== x.l || p.d !== x.d) rk = i + 1; x.rk = rk; });
  const d = new Date(), dd = String(d.getDate()).padStart(2, '0'), mm = String(d.getMonth() + 1).padStart(2, '0'), stamp = `${dd}-${mm}-${d.getFullYear()}`;
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const { chromium } = require('playwright');
  const br = await chromium.launch(); const pg = await br.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 2 });
  // 2 ảnh 9:16 (anh 18/11: dài quá → chia 2 bảng, không dồn nhỏ): ảnh 1 = bục top 3 + CUT-3 hạng kế · ảnh 2 = phần còn lại
  const CUT = Math.min(rows.length, 43), pngs = [];
  for (const page of [1, 2]) {
    await pg.goto('file://' + path.join(__dirname, 'board.html')); await pg.evaluate(() => document.fonts.ready);
    await pg.evaluate(LB => window.renderLB(LB), { period: 'SINCE 01/11/2026', updated: `${dd}/${mm}/${d.getFullYear()}`, matches: counted, rows, page, pages: 2, cut: CUT });
    await pg.waitForTimeout(400);
    const png = path.join(OUT_DIR, `Leaderboard ${stamp} (${page}-2).png`); await pg.screenshot({ path: png }); pngs.push(png); }
  await br.close(); const png = pngs.join('\n   ');
  const miss = path.join(OUT_DIR, 'Thieu ket qua.txt');
  if (missing.length) fs.writeFileSync(miss, `Leaderboard ${stamp} — ${missing.length} Short CHƯA được tính (bổ sung kết quả vào tools/leaderboard/results.json rồi chạy lại):\n\n` + missing.join('\n') + '\n');
  else if (fs.existsSync(miss)) fs.unlinkSync(miss);
  console.log(`🏆 ${png}\n   ${counted} trận · ${rows.length} meme${missing.length ? ` · ⚠️ ${missing.length} Short chưa tính → ${miss}` : ''}`);
})().catch(e => { console.error('❌ leaderboard:', e.message); process.exit(1); });
