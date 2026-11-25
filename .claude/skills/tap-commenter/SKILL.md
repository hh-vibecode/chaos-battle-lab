---
name: tap-commenter
description: Làm 1 TẬP "Commenter vs 3 Random Memes" (video dài 16:9 ~1 phút trên kênh) từ đầu tới bản edit — chọn commenter theo hàng chờ, cùng anh chọn 3 meme đối thủ, anh tự quay phần bánh quay trong game, Claude quay phần trận ngẫu nhiên nhiều seed rồi cùng anh nhặt trận căng nhất, sau đó Claude tự edit kiểu của anh (chèn meme reaction + sound theo POV 3 con meme). Học từ Part 1–3 (xem 25/11/2026). Dùng khi anh nói "làm tập commenter", "commenter vs meme part N", "làm trận cho <tên commenter>".
---

# Tập "Commenter vs 3 Random Memes"

Kênh: @meme-autobattler, mục video dài. Tên video: `Commenter vs 3 Random Memes - Part N (Meme A x Meme B x Meme C)`.
Hàng chờ + yêu cầu từng người: bảng anh đã duyệt 25/11 (ảnh thông báo `out/commenter-queue.html`). Khi bắt đầu tập mới: kéo lại comment 6+ tập
(`D:/tools/yt-dlp/yt-dlp.exe --skip-download --write-comments` / Mac `python3 -m yt_dlp …`) xem có ai mới / ai sửa skill, rồi cập nhật hàng chờ.

## 0. Ảnh comment + số thứ tự (anh dặn 25/11)
- Mỗi commenter trong `FAN_SKILLS` có `q` (số hàng chờ #1, #2…) hoặc `part` (đã lên tập P1…P6) — màn chọn commenter hiện badge số + 💬
  và **ẢNH CHỤP COMMENT THẬT** của người đang chọn ngay dưới lưới.
- Ảnh comment nằm trong repo: **`assets/fan-comments/<key>.png`** (avatar + tên + nội dung, chụp từ YouTube ×2 cho nét). Mac pull về là có —
  **đầu video lấy thẳng file này** (Finder: `~/Projects/chaos-battle-lab/assets/fan-comments/`). Ảnh đại diện: `assets/avatars/fan/<key>.jpg`.
- Chụp comment mới (Windows / Mac): `tools/x/cdp.js --launch --size 1280x1000 --url https://www.youtube.com/ --steps …` với link
  `watch?v=<video>&lc=<mã comment>` (YouTube đưa comment đó lên đầu) → ẩn `#masthead-container`, bấm "Read more" → `shotclip <key> <js>`
  lấy khung gộp `#author-thumbnail` + `#header-author` + `#content-text` với `scale:2`. Mã comment lấy từ `yt-dlp --write-comments` (trường `id`).
- Chưa có ảnh comment (comment xin skill không nằm ở 6 tập dài, chắc ở Shorts): Train_Kidd, Firdhan_snowboarder (bản snowball cũ).

## 1. Quy trình (anh chốt 25/11)
1. **Chọn commenter**: người kế tiếp trong hàng chờ (hoặc anh chỉ định). Skill của họ chưa có trong `FAN_SKILLS` (js/game.js) → code trước
   (giữ đúng mô tả, chỉnh số cho cân như kênh từng làm; skill quá phức tạp / OP thì rút gọn và báo anh). Chạy thử bằng nút 🎯 TRAINING.
   ⛔ (anh 25/11) Con nào PHỨC TẠP, thấy sẽ MẤT RẤT NHIỀU THỜI GIAN (nhiều cơ chế, cần vẽ / tìm nhiều thứ, đụng luật game chung, vd InaudibleDisc
   bản đủ, Z4CK Stick War, triệu hồi nhiều loại) → BÀN VỚI ANH TRƯỚC (đề xuất bản rút gọn + ước lượng công), anh gật mới làm. Con đơn giản thì cứ làm, không cần hỏi.
   Mỗi đợt làm ÍT con và làm cho XONG hẳn (anh 25/11: "hoàn thiện 1 2 3 thôi, làm 5 con luôn sợ k nổi"); #4–#6 đã code sẵn nằm ở `docs/notes/commenter-4-6-cho.js`.
2. **Chọn 3 meme đối thủ**: anh với Claude bàn, chốt 3 con → đặt vào 🎛️ SETUP ROLL (ô Đối thủ 1–3), các bánh buff / recruit / lives để Random.
3. **Phần bánh quay**: ANH TỰ QUAY trong game (quay màn hình), Claude không làm. Ghi lại kết quả anh quay được (buff nào, mấy đồng minh, mấy mạng).
4. **Phần trận**: chạy NGẪU NHIÊN như các trận meme đang quay (không can thiệp diễn biến, chỉ lọc seed) với ĐÚNG kết quả bánh quay của anh
   (nạp vào `_fwRig` để buff / recruit / lives khớp video bánh quay). Quay nhiều seed → **anh với Claude nhặt trận căng nhất** (sát nút, lật kèo).
   ⚠️ CHƯA có công cụ quay tự động cho chế độ này (render-match / render-duo không nhận fanCtx) → lần đầu trên Mac phải viết `tools/render-fan.js`
   theo mẫu render-match.js: vào trận qua `fanTraining()`-kiểu nhưng nạp `fanBuff` từ kết quả anh quay, khung 16:9, `--seeds N --want K` lọc trận
   căng, cân tiếng −14 LUFS như render-match. Sàn Giáng sinh (js/xmas-bg.js) là lớp DOM ngoài canvas → công cụ phải chụp CẢ trang, không chỉ canvas.
5. **Edit** (mục 3) → xuất 16:9 → để vào `~/Desktop/Meme Battles/`.

## 2. Bố cục 1 tập (đo từ Part 1–3, mỗi tập ~67s)
| Đoạn | Giây (xấp xỉ) | Nội dung | Edit chèn |
|---|---|---|---|
| Mở | 0–3 | Nền đen + ảnh chụp COMMENT của người chơi (thẻ trắng giữa màn) | Chữ khiêu khích trên thẻ trắng: "bro think he can solo my 3 random memes" (P1, chữ đỏ, nghiêng) · "Can bro solo my 3 random memes" (P2, chữ đỏ) · "can bro solo my 3 random memes" (P3, chữ đen) |
| Bốc đối thủ | 3–8 | Màn game "Who are you up against, bro?" (máy bốc chạy) → "Bro is up against these three." | — |
| Phản ứng đối thủ | 8–10 | | Meme video full màn 1–2s: P1 Anchorman cười · P2 chó hoảng "that will be tough bro" |
| Bánh BUFF | 10–22 | Quay nhiều lượt | Sau buff to: P1 anh đeo kính ăn burger trong xe (không chữ), mèo cam nhếch mép sau +1000 HP, skeleton tím → thẻ trắng "bro have no mercy" sau 5s IMMORTAL · P2 burger "okay good bro got all buff" sau ALL BUFFS · P3 Moistcr1tikal giơ tay "bro reaction:" sau ALL BUFFS |
| Bánh RECRUIT | ~23–27 | "Anybody switching sides for you?" | NOBODY → P2 sói cô đơn "bro is a lone wolf 😂😂😂" (full màn) · 1 JOINS → P1 mặt người khóc (dán cạnh bánh quay, bánh vẫn thấy) |
| Bánh LIVES | ~27–32 | "How many lives bro have?" | P1 2 LIVES → Willem Dafoe nhìn lên "How my 2 remain memes look at bro:" · P3 mặt người khóc dán góc phải dưới (chưa chắc ứng với kết quả nào — hỏi anh) |
| Vào trận | ~33 | | P2: chớp skeleton tím làm chuyển cảnh |
| Trận | ~30–60 | Trận giữ nguyên, KHÔNG chèn gì | — |
| Kết | ~60–67 | Màn kết quả (YOU LOSE / WIN) | P1 kết thúc ngay trong trận |

## 3. Cách edit (anh dặn 25/11)
- **Edit ĐƠN GIẢN trong CapCut**: chỉ thêm meme (ảnh / video) + sound lên trên bản quay. Không hiệu ứng cầu kỳ.
- **Góc nhìn (POV) = 3 con meme của kênh**: người chơi được buff mạnh / đông đồng minh / nhiều mạng → meme HOẢNG LOẠN, sợ, khóc, "no mercy";
  người chơi xui (NOTHING, NOBODY, 1 LIFE) → meme VUI, chế giễu ("lone wolf 😂", "okay good bro got all buff" mỉa).
- **3 kiểu chèn**: (a) cắt full màn 1–2s (thay hình game) · (b) dán sticker cạnh / góc bánh quay (bánh vẫn thấy kết quả) · (c) thẻ chữ trắng ở cạnh
  dưới meme. Chữ: tiếng lóng ngắn, mở bằng "bro …", chữ đen (hoặc đỏ) trên thẻ trắng.
- Chèn NGAY SAU khi bánh dừng ở kết quả đáng phản ứng; mỗi lượt quay tối đa 1 meme, không chèn liên tục mọi lượt.
- Phần trận để nguyên.
- **Sound**: lúc soạn skill (Windows) Claude KHÔNG nghe được 3 tập nên chưa biết anh dùng tiếng gì cho từng meme. Lần đầu trên Mac: tách tiếng
  3 tập (ffmpeg) quanh các mốc chèn meme, so với kho sound của anh, ghi lại vào mục này (meme nào đi với tiếng nào).
- **Kho meme + sound của anh ở MÁY MAC** (chưa biết đường dẫn): lần đầu hỏi anh 1 câu rồi GHI ĐƯỜNG DẪN vào đây.
- **Dựng dự án CapCut tự động**: mở rộng `tools/x/capcut-draft.py` (đang dựng track video + mỗi tiếng 1 clip) thêm track meme chèn (ảnh / video
  + thời điểm + kiểu a/b/c + chữ), để anh mở ra chỉnh tay. CapCut PHẢI TẮT khi chạy.
- Soạn bảng chèn (giây · kết quả bánh · meme · chữ · sound) đưa anh duyệt TRƯỚC khi dựng.
