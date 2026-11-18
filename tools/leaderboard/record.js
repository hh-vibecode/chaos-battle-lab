// 🏆 Ghi kết quả 1 trận vào tools/leaderboard/results.json (anh dặn 18/11: quay xong là ghi luôn, khỏi phải lục lại).
//   Khoá = tên video (= tiêu đề Short). Quay lại cùng tên → ghi đè bằng lần quay MỚI NHẤT (bản anh đăng).
//   win = mảng key meme thắng (đội 2vs2 = cả đội) · [] = hoà.
const fs = require('fs'), path = require('path');
const FILE = path.join(__dirname, 'results.json');
const norm = t => String(t).toLowerCase().replace(/\.mp4$/, '').replace(/[^a-z0-9]+/g, ' ').trim();
function load() { try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch (e) { return { matches: {} }; } }
function record({ title, win, seed, t, src }) {
  const db = load(); const k = norm(title);
  db.matches[k] = { title: String(title).replace(/\.mp4$/, ''), win: win || [], seed: seed ?? null, t: t == null ? null : +(+t).toFixed(1), src: src || 'render', at: new Date().toISOString().slice(0, 10) };
  fs.writeFileSync(FILE, JSON.stringify(db, null, 1) + '\n');
  return db.matches[k];
}
module.exports = { record, load, norm, FILE };
