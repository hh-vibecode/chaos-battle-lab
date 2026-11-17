# YÊU CẦU: dựng 3 TRẬN PHỤ cho Meme Lore · Final (viết 10/11/2026 — để phiên Claude mới làm, đọc ÍT mà đủ)

## Bối cảnh 5 dòng
- Final Part 1 (`js/film-fin1.js`, KHÔNG cần đọc — 96KB): phố bình yên → Friend (quái pixel khổng lồ) phá thành phố đêm trăng máu → nóc nhà: nhóm phản diện
  **Meowkatsuki** (Doorbell Chud, Bat Cat, Ninja Cat, Mlem Cat, thủ lĩnh Depressed/Pain Cat) lộ diện. Ver 541 trở đi.
- Mọi phim của Final Part 1 nằm trong THƯ MỤC menu `__fin1` (MEME LORE 2 → Final · Part 1): tập chính `fin1`, trailer `fin1tr`. Trận CHÍNH Gojo Cat vs Pain Cat = phim riêng `fin1c4` (`js/film-fin1c4.js`, 2.5D 960×540, 50s) — đã tách khỏi tập (anh chưa thêm cảnh nối). ĐÂY LÀ MẪU để chép cách làm.
- Việc này: 3 trận PHỤ, mỗi trận **10–20s**, ngắn hơn trận chính nhưng vẫn phải có **SIGNATURE MOVE đúng như trong game** của từng meme + giao tranh chất lượng.
  Mỗi trận 1 phim riêng (chưa ghép vào tập). Thành phố của Final, đêm, đổ nát (cùng bộ nền với fin1c4).

## 3 trận (key thư mục ảnh: `assets/avatars/<key>/`, ảnh thêm ở `assets/img/<key>/`)
| id phim | trận | key |
|---|---|---|
| `fin1f1` | Doorbell Chud + Mlem Cat **vs** Doge + Clapping Cat (2 vs 2) | doorbellchud, mlemcat · doge, clappingcat |
| `fin1f2` | Bat Cat **vs** Pop Cat + Huh Cat (1 vs 2) | batcat · popcat, huhcat |
| `fin1f3` | Ninja Cat **vs** Berserk Cat (1 vs 1) | ninjacat · berserkcat |
Signature move: TRA trong game, đừng tự bịa — `Grep "<key>" js/game.js` (chỉ đọc đoạn skill / effect của meme đó, KHÔNG đọc cả file), xem tên skill, VFX, tiếng (tiền tố tiếng của meme),
ảnh skill có sẵn (`skill1AvatarUrl`, `rageAvatarUrl`…). Phim phải ra đúng chiêu đó (hình dạng, màu, tiếng), phóng to cho điện ảnh.

## Đọc TRƯỚC (chỉ những thứ này)
1. `.claude/skills/dung-phim/SKILL.md` — mục "MẸO CẢNH COMBAT" (14 mẹo), "TỰ SOÁT", "CineKit.cam", "CineKitFx", Quy trình bước 2 (TỰ VẼ ẢNH) + bước 4 (film-check).
2. `../meme-anime-lab/playbook/luat.md` (mục Cận chiến, Ra chiêu lớn, Nhịp cắt, Màu) + `nhip.md`.
3. `js/film-fin1c4.js` — chỉ xem CẤU TRÚC: `T`, `TRK`/`HSTOP` (tư thế + khựng), `shots`, `sfx` (có `cast` + nhãn), `impact` (negFrames), thành phố 2.5D (`BL`, `drawBuilding`, `pano`), `world/post/screen`.
4. `js/shots/fin1c4.json` — mẫu bảng phân cảnh dữ liệu.

## Cách làm (theo thứ tự)
1. **Bảng phân cảnh dạng dữ liệu trước**: `js/shots/<id>.json` cho cả 3 trận (mỗi shot: giây, cỡ, góc, hành động, loại, ảnh, tiếng). Mỗi trận: mở thế (≤2s) → 2–3 pha
   đánh luân phiên ưu thế (shot 0.2–0.9s, lấy đà, khựng 0.1–0.16s + khung âm bản mỗi cú trúng) → SIGNATURE MOVE làm cao trào (gồng ≤0.5s, co lại rồi bùng, môi trường
   phản ứng) → kết (ai thắng / ngang ngửa — hỏi anh nếu chưa rõ, mặc định Meowkatsuki thắng áp đảo vì là phản diện mạnh) → 1 shot thở 1.4–1.6s.
2. **Ảnh: TỰ VẼ NGAY, CHẠY NỀN song song** (skill `ve-anh-gpt`: `bash tools/x/gpt-image.sh "<lệnh>" <ra.png> --ref assets/avatars/<key>/avatarUrl.webp --green`,
   `timeout 420`, 2–3 ảnh / lượt): mỗi meme 4–6 tư thế (thủ thế, lấy đà, ra đòn, trúng đòn, tư thế signature). Nháp 1 ảnh soát đạt rồi mới vẽ loạt. Tách nền `tools/x/gkey.js`
   → `assets/img/cine/FIN_F<n>_<KEY>_<TƯ THẾ>.png`. Ảnh Meowkatsuki mặc áo Akatsuki: dùng `assets/img/cine/FIN_AKA_*.png` làm --ref.
3. **Dựng** `js/film-fin1f1.js` / `f2` / `f3` (CineKit.film, 960×540, `cast:[tiền tố tiếng]`). Thành phố 2.5D: nên TÁCH phần thành phố của fin1c4 (BL, drawBuilding có dán mặt tiền,
   pano, theme) ra `js/fin1-city.js` dùng chung cho fin1c4 + 3 trận, thay vì chép 4 lần (sửa xong phải chạy lại film-check fin1c4 cho chắc không vỡ).
4. **Tiếng**: chọn từ danh mục, KHÔNG đoán theo tên — `tools/x/sfx-catalog.js --find "<loại / mô tả>"`. Tiếng signature của meme lấy đúng tiền tố của nó. Mỗi nhịp 1 tiếng,
   mỗi dòng sfx có NHÃN thứ 5. Giọng Nhật hô tên chiêu (nếu hợp): `tools/x/voicevox.js` (VOICEVOX ở `D:\tools\voicevox`, mô tả video ghi `VOICEVOX:<tên giọng>`).
5. **Soát 1 lệnh**: `powershell -NoProfile -ExecutionPolicy Bypass -File tools/node.ps1 tools/x/film-check.js <id> --t <mốc> --w 320 --out <tạm> --port <riêng>`
   → phải **0 lỗi tiếng (sfx-lint) + 0 lỗi nhịp (film-lint)**, rồi Read bảng khung soát từng dòng mục TỰ SOÁT.
6. **Menu**: thêm 3 mục vào THƯ MỤC `__fin1` (Final · Part 1) trong `LORE` của `js/game.js` (sau mục `ck:fin1c4`, tên dạng 'Fight · Chud + Mlem vs Doge + Clapping Cat'), Edit nhỏ. Mỗi id cần file `js/film-<id>.js` (playCineKit tải theo tên).
7. **Lên bản**: `tools/x/release.js --msg "…" --files <đúng các file đã sửa>`. KHÔNG xuất video khi anh chưa bảo.

## Luật anh đã dặn (vi phạm là bị chê lại)
- Giữ NGUYÊN form meme gốc: mèo ĐỨNG THẲNG như ảnh gốc, KHÔNG tư thế 4 chân; chân mèo thật, không tay người.
- Chữ trên màn hình CHỈ tiếng Anh (tên chiêu), KHÔNG chữ Hán / Nhật; KHÔNG tiêu đề phim / thẻ cuối / "TO BE CONTINUED" nếu anh không yêu cầu.
- Meme NHỎ so với nhà ở cảnh toàn; đòn có lực + môi trường phản ứng (bụi, kính vỡ, nhà nứt) — không VFX nứt đất kiểu rẻ tiền.
- Không mượn tiếng signature của meme khác; chiêu ra 1 lần thì tiếng / giọng chiêu 1 lần; nhạc phủ hết phim (`loop:true` nếu file ngắn).
- Không cắt ảnh thành ô chữ nhật cho cử động riêng (vỡ mặt). Cử động nhân vật: `K.sprite({life:{breath,sway,wind,squash}})`, `K.squash()`.

## Cách làm việc để nhanh + đỡ tốn
- Mỗi phim là file riêng → được chia agent song song (mỗi agent 1 trận, cổng `--port` riêng cho film-check / cdp). Kiểm tiến độ agent ~5 phút / lần (file đổi, trình duyệt
  ngầm kẹt); lệnh nền luôn có `timeout`.
- Không đọc nguyên `js/game.js` / `js/film-fin1.js`; Grep rồi Read đúng đoạn. Bảng khung chụp nhỏ, chỉ mốc vừa sửa.
- Cập nhật `../meme-anime-lab/KE-HOACH-NANG-CAP.md` + CLAUDE.md repo game (mục Final) khi xong. Báo anh: link mục menu, độ dài, signature move từng meme, điểm chưa đạt.
