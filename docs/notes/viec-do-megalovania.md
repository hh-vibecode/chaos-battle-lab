# Việc dở: Megalovania — ban nhạc 6 meme (video 16:9, 20/11/2026)

## Anh dặn (20/11)
- Video 16:9 dài 2:30–3:00, cover Megalovania: mix 5 bản (sax, guitar có sẵn + piano, violin, trống anh gửi), CHUẨN NHỊP, con nào cũng được chơi.
- Thứ tự vào do em tự chọn, ĐỪNG vào chậm. Nhạc nền vào → Sans mở đầu → các con vào dần, mỗi con 1 khung cảnh (unlock dần trong màn 16:9);
  2 violin (Violin Mosquito + Violin Bumblebee) vào cuối, ở đoạn căng nhất → cả nhóm cùng chơi, sân khấu mở ra, các meme mèo nhảy nhót bên dưới.
- Phần 2 lặp lại bài: solo 2 violin + solo guitar thật cháy → lại cả nhóm tới hết.
- Phong cách: CHÁY, sấm sét, lâu đài gothic, huyền ảo ma mị (Castlevania + Undertale). Ảnh mẫu anh gửi: trăng lưỡi liềm cam đỏ, mây tím, cầu thang đá
  có vệt đỏ chảy, cây nến · trăng tròn xanh ngọc, tháp nhọn, gargoyle, vệt sáng trăng, tàn lửa. (Chỉ lấy không khí, không chép tranh / game.)
- VFX đặt đúng chỗ cần, KHÔNG spam. Blender giúp được gì thì dùng (sét, lửa, khói, lâu đài 3D).
- Chưa duyệt kịch bản / phân cảnh → chưa dựng (luật). Chưa bảo xuất → chưa xuất.

## Nguồn nhạc (KHÔNG trong repo — bản quyền + nặng)
- Máy Windows: `tools/x/_ref/mega/` = sax.mp3 (= assets/audio/sx_megalovania.mp3), guitar.mp3 (= piano_megalovania.mp3), drum.mp3 / piano.mp3 / violin.mp3
  (anh để trên Desktop: "Undertale Megalovania Drum Cover", "UNDERTALE MEGALOVANIA Piano Tutorial", "… Violin Cover Taylor Davis"), piano2.m4a (YouTube xplnuJ16SWk, Grim Cat Piano).
- Bản trống = trống chơi ĐÈ lên nguyên bản Undertale (có cả giai điệu) → dùng làm XƯƠNG SỐNG / nhạc nền.
- Grim Cat: chơi tay, tempo tự do 124–137 → chỉ dùng làm INTRO (piano lẻ loi + mưa), không chồng lên lưới.

## Số đo (đã kiểm chéo)
- Cả 5 bản cùng tông, cùng vòng 4 hợp âm (D C B B♭, mỗi ô 2s), tempo THẬT 119.717 BPM (không phải 120: lệch +18.9ms/vòng nếu tính 120) → vòng 8.0189s.
- Gốc vòng (giây đầu vòng đầu tiên): trống 0.644 · sax 0.323 · piano 5.722 · guitar 0.286 · violin 4.367. Khớp lưới mọi vòng ±10ms.
- Cấu trúc bản trống (vòng #): 0 intro · 1–4 riff · 5–8 đoạn B · 9–12 đoạn C · 13–16 đoạn D · 17 nghỉ · 18–19 riff kết · sau 19 = nốt kết.
- Bảng vòng nào của bản nào khớp vòng nào của trống: chạy lại `tools/x/music-match.html` (lệnh trong đầu file).

## Bản phối v3 (3:06, anh 20/11 "ngắn thế" / "k đc 3p hả") — `tools/x/mega-arrange.js` → `tools/x/music-mix.html` → `D:/meme-anime-lab-videos/megalovania/Megalovania mix v3.wav`
Lưới 119.717 BPM, mỗi hàng 1 vòng 8.02s. 0:00–0:12.5 mưa + piano Grim Cat → SẤM.
| giờ | đoạn |
|---|---|
| 0:12.5 | Sans (sax) mở đầu trên intro nguyên bản |
| 0:20.5 | + Bongo (trống vào) + Piano Cat |
| 0:28.5 | + Guitar Cat |
| 0:44.6 | + 2 Violin (đỉnh riff) |
| 0:52.6–1:24.7 | TUTTI, sân khấu mở (đoạn B) |
| 1:24.7 | Phần 2: nghỉ — Sans một mình |
| 1:32.7 | SOLO 2 violin (đoạn C) |
| 1:48.7 | Piano Cat + Bongo Cat tỏa sáng |
| 1:56.7 | SOLO guitar |
| 2:12.8–2:44.9 | TUTTI (đoạn D) |
| 2:44.9 | KẾT riff → 3:00.9 nốt kết + sấm → hết 3:05.4 |
- ⏸️ CHỜ ANH NGHE v2. Em không nghe được: đã soát bằng số (độ to từng giây không hụt, khớp lưới ±10ms) — giai điệu có chỏi nhau không thì anh phải nghe.

## Công cụ mới (tools/x, chạy qua serve.js + cdp.js, Windows không cần ffmpeg)
`music-analyze.html` (tempo, phách, bass, chroma) · `music-xcorr.html` (độ lệch chính xác 2 bản theo vòng) · `music-match.html` (vòng nào khớp vòng nào) ·
`music-mix.html` (trộn theo plan → WAV, khớp lưới 1ms) · `music-tempo.html` (thử, KHÔNG chính xác — đừng tin) · `music-align.js` / `music-bars.js` / `music-sections.js` (thử, kém với nhạc lặp vòng).
Bài học: đo tempo thật bằng plan thử (snapRange 0.25, xem độ lệch tăng đều theo vòng) — beat tracker + Fourier sai ±0.3 BPM.

## Tiếp theo
1. Anh nghe v2 → sửa phối. 2. Viết kịch bản + bảng phân cảnh (skill viet-kich-ban) cho anh duyệt. 3. Dựng (dung-phim, Blender cho sét / lửa / lâu đài). 4. Xuất khi anh bảo (Mac).
