# Mẫu phim cũ — CHỈ ĐỂ ĐỌC HỌC (gỡ khỏi app 21/11/2026)

Anh dặn 21/11: Rạp phim trong app chỉ giữ **Final Part 1** cho nhẹ; phim cũ gỡ khỏi app nhưng **giữ cách làm** để học.
- Code các phim cũ nằm ở đây (app KHÔNG tải thư mục này). Ảnh / nhạc riêng của chúng đã xoá khỏi `assets/` (game tải hết `assets/` lúc khởi động) → đọc code để học cách dựng, không chạy lại được trực tiếp.
- Cần chạy lại 1 phim cũ: lấy lại file + ảnh từ lịch sử git, vd `git log --diff-filter=D --name-only -- assets/img/cine` rồi `git checkout <mã>^ -- <đường dẫn>`.
- Bộ khung dùng chung vẫn ở `js/` (cine-kit, cine-cam, vfx-gl, vfx-manga, vfx-boom) vì Final 1 dùng.

| File | Phim | Học gì |
|---|---|---|
| film-megaband.js | Megalovania · Meme Band in the Castle | `sprBlend` (hoà nhân vật vào cảnh), nốt nhạc bám beat, chia khung vỡ kính |
| film-mvd.js | Mewing Cat vs Depressed Cat | `dash()` lấy đà, hit-stop `HSTOP` / `hs(t)` |
| film-dvc.js | Buff Doge vs Samurai Cheems | mẫu phim CINE-KIT đầu tiên, `faceFlip` |
| film-vfxboom.js | Sample · Explosion + impact | dùng `VfxBoom` (skill hoat-hoa-vfx) |
| film-l2pro.js | Prologue · The Dark Age | dựng 2D theo cảnh, tay bóng tối `shadowArm`, lồng lời đọc |
| cine-lore2ep0/2/3.js, cine-dpwindow.js | Meme Lore 2 Ep 0–4 | phim dọc 9:16 kiểu cũ |
| cine-war.js, cine-endgame.js, cine-bg.js | Memes Assemble I & II | phim dài đời đầu, nền chi tiết |
