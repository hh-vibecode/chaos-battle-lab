# VIỆC DỞ — Final Part 1 (ghi 16/11/2026 tối, làm tiếp phiên sau)

Đọc file này TRƯỚC khi làm tiếp. Kịch bản đã duyệt: `prompts/kich-ban/fin1-chillguy-ending.md` (mục "ANH CHỐT").
Bản đang lên: Ver 643 (c44887d). 2 cảnh mới `js/film-fin1c6.js` (Chill Guy) + `js/film-fin1c7.js` (kết) ĐỀU BỊ ANH CHÊ → phải làm lại.

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
