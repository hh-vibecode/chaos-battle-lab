// 🏆 Kết quả trận cho leaderboard — 2 sổ (anh dặn 20/11: "m lưu lại lịch sử làm thôi, nào thấy trên youtube đăng mới được đẩy vào leaderboard"):
//   history.json — LỊCH SỬ mọi lần quay (render-match / render-duo tự ghi mỗi lần quay xong, cả bản quay thử / quay lại). KHÔNG tính vào bảng.
//   results.json — CHỈ các Short ĐÃ ĐĂNG. make.js thấy tiêu đề trên kênh → lấy lần quay MỚI NHẤT cùng tên trong history đưa vào đây và khoá
//                  bằng mã video (pub) — khoá rồi thì lần quay sau cùng tên không đè lên nữa.
//   Khoá = tên video (= tiêu đề Short). win = mảng key meme thắng (đội 2vs2 = cả đội) · [] = hoà.
//   Trận quay ngoài 2 công cụ trên: node -e "require('./tools/leaderboard/record.js').record({title:'A vs B - Meme Battle', win:['a']})"
const fs = require('fs'), path = require('path');
const FILE = path.join(__dirname, 'results.json'), HFILE = path.join(__dirname, 'history.json');
const norm = t => String(t).toLowerCase().replace(/\.mp4$/, '').replace(/[^a-z0-9]+/g, ' ').trim();
function load() { try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch (e) { return { matches: {} }; } }
function loadHistory() { try { return JSON.parse(fs.readFileSync(HFILE, 'utf8')); } catch (e) { return { renders: [] }; } }
// 📝 ghi 1 lần quay vào LỊCH SỬ (không đụng leaderboard)
function record({ title, win, seed, t, src }) {
  const h = loadHistory(), e = { title: String(title).replace(/\.mp4$/, ''), k: norm(title), win: win || [], seed: seed ?? null, t: t == null ? null : +(+t).toFixed(1), src: src || 'render', at: new Date().toISOString() };
  h.renders.push(e); fs.writeFileSync(HFILE, JSON.stringify(h, null, 1) + '\n'); return e; }
const latest = k => { const L = loadHistory().renders.filter(e => e.k === k); return L.length ? L[L.length - 1] : null; };
// ✅ Short đã đăng (mã video id) → đưa lần quay mới nhất vào leaderboard. Đã khoá (pub) thì giữ nguyên.
//    LUẬT ANH (23/11): ① anh BẢO trận nào con nào thắng → ghi đúng thế (src 'anh', ưu tiên nhất) · ② trận quay random → kết quả lần quay CUỐI
//    · ③ trận nào KHÔNG CHẮC thì HỎI anh: cùng tên mà các lần quay ra người thắng khác nhau (anh chưa nói) → trả {conflict:n}, chưa tính,
//    make.js ghi vào "Thieu ket qua.txt" mục CẦN HỎI ANH (vd Ninja Cat vs Sans: quay 3 lần, lần cuối Ninja thắng nhưng anh bảo Sans thắng).
//    ⚠️ KHÔNG khớp lần quay theo độ dài video: anh luôn rút gọn video trước khi đăng (`dur` trong history.json chỉ là độ dài video trên kênh, để tham khảo).
function publish(k, id) {
  const db = load(), cur = db.matches[k]; if (cur && cur.pub) return cur;
  const L = loadHistory().renders.filter(e => e.k === k), wins = new Set(L.map(e => [...(e.win || [])].sort().join(',')));
  if (wins.size > 1 && !(cur && cur.src === 'anh')) return { conflict: L.length };
  const h = latest(k); let r = cur;
  if (h && (!cur || !cur.at || h.at.slice(0, 10) >= cur.at)) r = { title: h.title, win: h.win, seed: h.seed, t: h.t, src: h.src, at: h.at.slice(0, 10) };
  if (!r) return null;
  r.pub = id; db.matches[k] = r; fs.writeFileSync(FILE, JSON.stringify(db, null, 1) + '\n'); return r; }
module.exports = { record, publish, load, loadHistory, latest, norm, FILE, HFILE };
