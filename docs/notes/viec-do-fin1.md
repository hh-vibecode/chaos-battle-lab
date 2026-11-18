# VIỆC DỞ — Final Part 1

## 🆕 YÊU CẦU 18/11 (anh gửi — làm THEO THỨ TỰ)
**① ✅ XONG 18/11 (Ver 659: js/vfx-boom.js + skill hoat-hoa-vfx + mẫu Anime Lab "Sample · Explosion + impact") — CHỜ ANH XEM mẫu rồi mới sang ② ③.** Gốc: LÀM SKILL / TOOL TRƯỚC hỗ trợ dựng animation như các video đã học, rồi **làm MẪU 1 VỤ NỔ + IMPACT 5s cho anh xem** (anh dặn "xử lý phần skill trước, xong làm mẫu vụ nổ impact 5s t xem thử"). Học từ:
- https://www.youtube.com/watch?v=aVvT_--q7Ow giây **21–26**: animation vụ nổ lớn rất tốt, bắt đầu từ TÂM lan ra xung quanh.
- https://youtube.com/shorts/-nOC-UgaLLw : thêm kiến thức về IMPACT.
- https://m.youtube.com/shorts/MYMWRdhF0l4 : cách làm animation MƯỢT hơn.
- Ảnh mẫu thiên thạch (Naruto Tengai Shinsei, khối đá khổng lồ xé mây rơi xuống) = cách Friend phải xuất hiện ở cảnh kết.
**② SỬA CẢNH CHILL GUY `fin1c6`** (anh chê "làm cẩn thận tí đi"):
- BỎ HẾT NHẠC NỀN (anh tự thêm). Sound phải KHỚP HÌNH: hết VFX / hành động là NGẮT tiếng (vd Bread Cat xoay xong chuyển cảnh mà tiếng còn kéo dài — sai). Nhiều sound bị CHẬM so với hình (Bat Cat cũng chậm) → kiểm khoảng LẶNG ĐẦU FILE tiếng, cắt cho đúng onset.
- Không dùng tiếng phi tiêu (shuriken) cho Chill Guy → dùng tiếng CĂNG THẲNG.
- Khung nộ: vẽ GIỐNG HẲN GIF Gon anh gửi (`D:/meme-anime-lab-videos/ref-gon/gon-angry.gif`), bản hiện tại "sơ sài".
- Gojo vs Pain lần đầu gặp mắt: meme bị XUYÊN THẤU (mờ), KHÔNG BÁM ĐẤT → phải đặc, chân chạm đất.
- Gojo xuất hiện phải NÓI ("Leave it to me" hay tương tự — phụ đề + giọng).
- Chill Guy NÉ: KHÔNG dùng tư thế đá / đấm (skill1) — né bình thường (ảnh đứng + chuyển động).
**③ LÀM LẠI CẢNH KẾT `fin1c7`** ("như đấm vào mồm, quá lộn xộn, hiệu ứng xấu"):
- Bánh mì xoay → NỔ là TẤT CẢ meme đã phải xuất hiện (không rơi lắt nhắt). Gigachad + Chonky đứng ĐẰNG XA, chỉ to hơn ~10 lần meme thường.
- Sau đó mới triệu hồi (Ninja) — làm cho RA HỒN.
- Friend ĐÁP TỪ TRÊN TRỜI, XÉ MÂY bước ra như quả thiên thạch trong ảnh mẫu.
- Xử lý KỸ toàn cảnh, đẹp, không lộn xộn.

## ⏸️ TRẠNG THÁI 17/11 tối (anh dừng vì hết token — LÀM TIẾP từ đây)
✅ ĐÃ LÀM LẠI cả 2 cảnh, đã đẩy main:
- Ver 654–655 `js/film-fin1c6.js` Chill Guy (27.6s): thành phố 3D Fin1City nối tiếp (đổ nát, khói, lửa) · máy tĩnh, trục Chill Guy/Gojo TRÁI – Pain PHẢI · meme form gốc (MEW_GOJO_IMG, DP_PAIN_IMG mờ mép dưới, avatar Chill Guy / Banana) ·
  vật rơi nằm lại · tràng chớp impact (học 3 video) · NỘ KIỂU GON (GIF `D:/meme-anime-lab-videos/ref-gon/gon-angry.gif`: bóng đen, 2 mắt trắng tròn — mắt avatar ở (0.54,0.18) (0.673,0.18), tia trắng bám viền) → bùng + chữ đỏ → NGẮT sang Gojo đã đứng chắn → gật đầu → rời đi → Gojo – Pain thủ thế → Bat Cat.
- Ver 656 `js/film-fin1c7.js` cảnh kết (39.5s): bãi đổ nát mênh mông (Fin1City rows:1 near:13000 + đá vụn) · Bread Cat BC_SPIN trên trời → sao 4 cánh → cổng · biển meme ~900 con (hàng đầu meme quan trọng) · Gigachad + Chonky khổng lồ ·
  ấn triệu hồi mặt đất + binh đoàn hồn quỷ + Evil Gary + Catvader · Pain giơ mảnh vỡ · Friend pixel to cỡ thiên thạch · chia đôi (panels) · TBC Christmas 2026 · nhạc Portals canh chỗ bùng lúc cổng mở.
👉 VIỆC TIẾP: CHỜ ANH XEM 2 cảnh rồi góp ý. Chưa làm: áp "tràng chớp impact" vào các trận đã duyệt (anh bảo "chưa cần").
Điểm yếu đã biết (đã báo anh): Chill Guy chỉ 2 ảnh gốc → né / nhảy / gật là chuyển động code · Friend avatar 135px → phóng to thành khối pixel (có ảnh nét hơn thì thay) · tiếng chưa nghe thật.
Công cụ: film-check.js tự bật / tắt trình duyệt (dùng nó để chụp). Tự bật serve.js / cdp --launch thì ghi output ra FILE (không pipe grep — treo), xong `--stop` ngay.

---
(Lịch sử bên dưới — lời anh chê 16/11 và ghi chú cũ, giữ để tham khảo. Kịch bản đã duyệt: `prompts/kich-ban/fin1-chillguy-ending.md` mục "ANH CHỐT".)

## 0. ✅ (17/11 XONG) HỌC 3 VIDEO NGẮN về IMPACT EFFECT + NHỊP GIAO TRANH — kết quả đếm khung ở skill `edit-video` mục 8 ("ĐẾM KHUNG 3 VIDEO MẪU"). Còn: ÁP vào code (tràng chớp thay impact3) khi làm lại các cảnh.
| link | tiêu đề | dài |
|---|---|---|
| https://www.youtube.com/watch?v=CtO_XE2Nrho | [ IMPACT FRAMES ] — ian zhang | 20s |
| https://www.youtube.com/watch?v=ian6Ui6YQW4 | Energy Blast Animation Test — Golden Gecko | 28s |
| https://www.youtube.com/watch?v=XWLX25o650c | IMPACT FRAME X EXPLOSION PRACTICE (Flipaclip) — Animaniac | 16s |
- Video ngắn (16–28s) → xem TRỌN, không cần hỏi mốc. Cách làm: tải `D:\tools\yt-dlp\yt-dlp.exe -f "18/b[ext=mp4][height<=720]" -o "D:\meme-anime-lab-videos\yt-<id>.%(ext)s" <link>` → chép vào `tools/x/_ref/` →
  chụp 30 khung/giây đúng đoạn có impact bằng `tools/x/video-frames.html?src=tools/x/_ref/<file>&a=..&b=..&fps=30&w=200&cols=15&rate=0.3` (cdp, cổng 9455; serve.js 8765 đã tua được) → ĐẾM KHUNG từng pha.
- Ghi lại: số khung mỗi pha (tích tụ → loé → impact → nổ → hạ sáng), màu impact (trắng–đen / màu), kiểu nét toả, cách nổ (khối cầu / vòng / khói), độ dài nhịp nhanh – chậm, chỗ khựng.
- Kết quả → bổ sung skill `edit-video` mục 8 (thêm hàm vào `K.edit` / `fin1-plate.js` nếu cần) rồi ÁP vào các cảnh làm lại (Chill Guy, kết Part 1).

## ⚠️ Anh chê cách làm (16/11): "m cứ làm nhanh xong toàn làm sai" → XỬ LÝ KỸ
- Đừng dựng vội cả cảnh rồi báo. Làm từng shot, chụp soát kỹ từng shot (hướng mặt, cỡ, đè nhau, nối cảnh) rồi mới sang shot sau.
- Đọc kỹ lời anh, đối chiếu từng ý trước khi báo xong.

## 1. Cảnh Chill Guy `fin1c6` — anh chê 16/11, làm lại
- ❌ Hướng mặt quay ngược xuôi tùm lum, không theo thứ tự. → Giữ TRỤC: Chill Guy TRÁI, Pain PHẢI (Gojo chen giữa).
  Dùng `Fin1Fight.actor(F,{key,dir,look,...})` để tự lật mặt theo đối thủ so với hướng ngang máy (dir: ảnh vốn quay mặt bên nào: −1 trái · 1 phải · 0 chính diện).
  Chill Guy avatar + skill1 quay mặt TRÁI (dir −1). Banana, Gojo, Pain chính diện (dir 0).
- ❌ "ai mượn m vẽ nền": PHẢI NỐI TIẾP THÀNH PHỐ BỊ PHÁ của các cảnh trước → dùng `Fin1City({seed:3})` + `CITY.TH_NIGHT` (đúng đại lộ của fin1f3 Ninja vs Berserk), máy TĨNH mỗi shot (kiểu shot trong js/film-fin1f3.js dòng ~82–97: tx/ty/tz/dist/yaw/pitch).
  Bỏ nền GPT `FIN_C6_BG_STREET.jpg`. Vật tương tác (toà nhà nghiêng, xe, cột đèn, mảng tường, nửa toà nhà — `FIN_C6_OBJS.png`, toạ độ trong `OB` của film-fin1c6.js) đặt vào THẾ GIỚI 3D (chiếu điểm thế giới → vẽ vùng atlas theo P.s, xếp lớp theo độ sâu), không dán màn hình.
  Toà nhà sập thật: `Fin1City({collapse:[{x,z,t,r}]})`. Khói / bụi / mảnh: `K.smoke` / `K.debris` / `K.sparks` (thế giới).
- ❌ "các meme dùng form nguyên bản": Gojo = `assets/img/mewingcat/MEW_GOJO_IMG.webp` (bán thân), Pain = `assets/img/depressedcat/DP_PAIN_IMG.webp` (bán thân, lơ lửng — mép dưới chìm vào khói / hào quang, không lộ mép cắt).
  KHÔNG dùng ảnh GPT vẽ lại (FIN_G6/G9/P6/P9/MVD_PAIN_PUSH) trong cảnh này. Chill Guy: `avatars/chillguy/avatarUrl` + `skill1AvatarUrl`. Banana: avatar + attackAvatarUrl (khóc).
- ❌ Chill Guy nổi nộ xong → Gojo ra CHẮN LUÔN, KHÔNG có pha lao vào nữa.
- ❌ Cuối cảnh: Gojo và Pain THỦ THẾ CHUẨN BỊ GIAO TRANH rồi mới cắt sang trận Bat Cat (fin1f2).
- Giữ: mạch kịch bản A1–A14 (cứu Banana, linh cảm, né xe, Pain bắn đồ, nửa toà nhà đập trúng, nộ đỏ "I'M NOT CHILL ANYMORE").

## 2. Cảnh kết `fin1c7` — anh chê 16/11: "k chịu được, k đc 1 cái gì"
- ❌ Khung cảnh BÉ (máy quá xa, meme tí hon) · nhân vật QUAY NGƯỢC XUÔI, ĐÈ LÊN NHAU · trông HỖN LOẠN, chán kinh khủng.
- Anh sẽ gửi LINK cảnh giao tranh đông (2 phe tụ quân) để tham khảo → CHỜ LINK, hỏi anh mốc phút, học bố cục / góc máy / cách xếp quân trước khi dựng lại.
- 🖼️ (16/11 tối) ANH GỬI 2 ẢNH MẪU (Naruto Shippuden — Madara vs Liên minh Ninja, video 16:46; ảnh lưu ở `D:\meme-anime-lab-videos\ref-fin1-ending\`):
  · `madara-vs-lien-minh-0m54.png` (0:54): 2 thủ lĩnh đứng QUAY LƯNG về máy ở tiền cảnh 2 bên (to, rõ), nhìn xuống 1 BIỂN QUÂN hàng nghìn người phủ kín cả thung lũng tới tận chân trời, giữa các cột đá — đó là cỡ đông quân anh muốn.
  · `thien-thach-11m19.png` (11:19): góc giun nhìn lên 1 THIÊN THẠCH khổng lồ choán nửa khung trời trên thung lũng → FRIEND ÍT NHẤT PHẢI TO CỠ ĐÓ (che trời thật, không phải con mèo đứng sau lưng quân).
  · Anh: "bối cảnh nó phải TO HƠN, TO HƠN…" → cảnh kết phải ở QUY MÔ CHIẾN TRANH: thành phố đổ nát rất rộng tới chân trời, mỗi phe là BIỂN meme (lặp nhiều lần các meme, nhỏ dần theo độ sâu, xếp thành khối dày), thủ lĩnh to ở tiền cảnh (qua vai / sau lưng nhìn ra biển quân).
  · Còn thiếu: link video gốc (để chụp thêm các mốc giao tranh đông) — hỏi anh link + mốc phút nếu cần thêm.
- Hướng sửa (chưa làm): xếp quân theo HÀNG / KHỐI rõ ràng (không rải ngẫu nhiên chồng nhau), mọi meme 1 phe cùng quay về phía phe kia; nhiều góc gần (cận thủ lĩnh, trung cảnh hàng quân, góc giun quân khổng lồ) thay vì 1 khung toàn tí hon;
  cũng nối tiếp THÀNH PHỐ BỊ PHÁ của tập (Fin1City / thành phố fin1c4 sau Shinra), bỏ nền GPT `FIN_C7_BG_CITYWIDE.jpg`.
- Giữ ý đã duyệt: Bread Cat trên trời xoay như game → cổng đa vũ trụ · đổ bộ (hàng đầu = meme đang giao tranh, hàng sau = Adolf, Stalin, Duolingo, Violin Bee…; không Catvader / Grumpy / godly / phe ác; không Evil Larry) ·
  Chonky + Gigachad khổng lồ, Buff Doge ×3 · Ninja ấn triệu hồi → Evil Gary + Catvader + binh đoàn ác quỷ · Pain giơ mảnh vỡ → Friend quay lại che trời · chia đôi màn hình → BÙM → To be continued / Christmas 2026 · nhạc "Portals" (`assets/audio/mus_portals.m4a`, đã canh chỗ bùng).
- Friend: ảnh avatar chỉ 135px (pixel) → cần ảnh Friend nét hơn (hỏi anh) hoặc vẽ bằng `pixel:true` cỡ vừa phải.

## Ghi chú kỹ thuật đã có
- `js/fin1-plate.js` = bộ vẽ 2D dùng chung (bg, spr, obj, streak, zap, star4, impact3, runner) — vẫn dùng được cho lớp hiệu ứng màn hình, nhưng nhân vật / vật nên vào thế giới 3D thành phố để nối cảnh.
- `tools/x/serve.js` đã hỗ trợ tua video (Range) → chụp khung video mẫu tham khảo nhanh (`tools/x/video-frames.html`).
- Tải video mẫu: `D:\tools\yt-dlp\yt-dlp.exe -f "18/b[ext=mp4][height<=720]"` (không cắt đoạn được vì máy không có ffmpeg) → chép vào `tools/x/_ref/`.
