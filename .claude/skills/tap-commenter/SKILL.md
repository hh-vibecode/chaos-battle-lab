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
3. **Phần bánh quay + trận** (anh 25/11: Claude quay LUÔN cả bánh quay, không chờ anh): `tools/render-fan.js` (Mac, cần
   `NODE_PATH=$(dirname $(find ~/.npm/_npx -maxdepth 3 -type d -name playwright | head -1))`) quay TRỌN từ màn "Who are you up against, bro?"
   → máy loto → 3 bánh → PRESS TO START → trận → bảng kết quả (giữ 5s), 1920×1080 50fps, tự bấm nút nhịp người thật (dừng ~1.25s sau mỗi kết quả),
   tiếng game trộn + −14 LUFS. Bánh quay = CSS transition → công cụ tua mọi `document.getAnimations()` theo đồng hồ ảo.
   - `--sim 16 --max 150` chạy thử 16 seed (~40s/seed) in đối thủ + kết quả bánh + ai thắng + máu còn → `--seed N` quay (~4–5 phút).
   - Ra kèm `<out>.marks.json`: mốc giây (theo bản quay) của foes / từng spin / từng result / fight / result_screen → làm bảng chèn meme.
   - ⚠️ (25/11) Lúc THỬ (dpr thấp, bước 240 tick) và lúc QUAY có thể ra trận KHÁC (seed 311614088: thử = commenter thắng sát, quay = 3 meme thắng).
     Bánh quay khớp, chỉ trận lệch — nghi ảnh tải không đồng bộ / loadAvatars lúc vào trận. CHƯA sửa → quay xong phải xem lại kết quả thật.
   - Muốn ép kết quả bánh (anh đã quay sẵn) thì dùng 🎛️ SETUP ROLL (`_fwRig`) — chưa có cờ dòng lệnh, thêm khi cần.
4. (bỏ — gộp vào bước 3)
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
- **Kho meme + sound của anh (Mac)**: `~/Desktop/#memesource/` (anh gọi "meme source"; thư mục con `happy/`). Trong đó:
  `let the game begin.mp4` = Anchorman (có tiếng) · `nnerrvous dog.gif` = chó nâu hoảng · `scared dog.mp4` = chó trắng · `i mean alright.mp4` = anh ăn burger trong xe (có tiếng)
  · `willem-dafoe.gif` · `berserk-skeletons.gif` + `berserk-skeleton-meme.mp3` · `cat-cat-turning-head.gif` = mèo cam nhếch mép · `sus-cat-2…gif` = mèo cam ăn
  · `shocked-surprised.gif` = mèo sốc · `speed.gif` · `images.jpeg` = sói cô đơn (ảnh có viền trắng → crop `387:315:0:100`)
  · PHÔNG XANH 2334×1166 có tiếng (dưới đáy dính nhãn "Tạm dừng" → crop `iw:ih*0.9:0:0`): `crying black guy.mov`, `uuuuuuu.mov` = Moistcr1tikal, `hâhhahaa.mov` = anh mũ xanh cười, `WTF.mov`
  · tiếng lẻ: `vine-boom.mp3`, `annnouce.mp3`, `annouce dota.mp3`, `tf_nemesis.mp3`, `fahhhhhh.mp3`, `canon-event.mp3`, `dexter-meme.mp3`, `among-us-role-reveal-sound.mp3`, `what-bottom-text…mp3`, `discord ping.mp3`, `happy/*.mp3`.
- **Tiếng đi với meme** (dò 25/11 bằng tương quan chéo tiếng 3 tập với kho): mở đầu P1 `vine-boom` (lúc hiện comment) + `annnouce` (lúc hiện nhãn) · P3 `annouce dota` ·
  Anchorman = tiếng của chính clip ("let the game begin") · burger = tiếng clip `i mean alright` (P1 + P2) · sói lone wolf = `tf_nemesis.mp3` (P2) ·
  Moist = tiếng clip `uuuuuuu` · mặt người khóc = tiếng clip `crying black guy` · skeleton = `berserk-skeleton-meme.mp3`.
- **Edit bằng ffmpeg (anh 25/11: CapCut hay ffmpeg tuỳ, cái nào tiện)**: `python3 tools/x/fan-edit.py <spec.json>` (mẫu: `docs/mau-edit/commenter-tanphamnhat969.edit.json`, giải thích
  đầu file) — mở đầu màn đen + dải comment trắng + nhãn đỏ nghiêng, meme `full` = CẮT CHEN (bản quay dừng, meme full màn viền đen + thẻ chữ, rồi quay tiếp → không che
  kết quả bánh), `sticker` = dán đè góc (phông xanh tự tách nền + khử ám xanh), cân −14 LUFS. Font Montserrat ExtraBold `tools/x/fonts/`, emoji màu Apple.
- **Dựng dự án CapCut tự động**: mở rộng `tools/x/capcut-draft.py` (đang dựng track video + mỗi tiếng 1 clip) thêm track meme chèn (ảnh / video
  + thời điểm + kiểu a/b/c + chữ), để anh mở ra chỉnh tay. CapCut PHẢI TẮT khi chạy.
- Soạn bảng chèn (giây · kết quả bánh · meme · chữ · sound) đưa anh duyệt TRƯỚC khi dựng.
