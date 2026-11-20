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
- Độ dài: bài gốc ~2:45 (bản trống / piano / violin đều gần 3p vì là CẢ BÀI); sax + guitar chỉ ~1 phút (đoạn đầu bài).
- Grim Cat: chơi tay, tempo tự do 124–137 → chỉ dùng làm INTRO (piano lẻ loi + mưa), không chồng lên lưới.

## Số đo (đã kiểm chéo)
- Cả 5 bản cùng tông, cùng vòng 4 hợp âm (D C B B♭, mỗi ô 2s), tempo THẬT 119.717 BPM (không phải 120: lệch +18.9ms/vòng nếu tính 120) → vòng 8.0189s.
- Gốc vòng (giây đầu vòng đầu tiên): trống 0.644 · sax 0.323 · piano 5.722 · guitar 0.286 · violin 4.367. Khớp lưới mọi vòng ±10ms.
- Cấu trúc bản trống (vòng #): 0 intro · 1–4 riff · 5–8 đoạn B · 9–12 đoạn C · 13–16 đoạn D · 17 nghỉ · 18–19 riff kết · sau 19 = nốt kết.
- Bảng vòng nào của bản nào khớp vòng nào của trống: chạy lại `tools/x/music-match.html` (lệnh trong đầu file).

## Bản phối v3 (2:58, anh 20/11 "ngắn thế": thêm đoạn D có thật của bài; anh dặn KHÔNG thêm đoạn tự nghĩ ra) — `tools/x/mega-arrange.js` → `tools/x/music-mix.html` → `D:/meme-anime-lab-videos/megalovania/Megalovania mix v3.wav`
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
| 1:48.7 | SOLO guitar |
| 2:04.8–2:36.8 | TUTTI (đoạn D → đoạn D cuối) |
| 2:36.8 | KẾT riff → 2:52.9 nốt kết + sấm → hết 2:57.4 |
- ⏸️ CHỜ ANH NGHE v2. Em không nghe được: đã soát bằng số (độ to từng giây không hụt, khớp lưới ±10ms) — giai điệu có chỏi nhau không thì anh phải nghe.

## Công cụ mới (tools/x, chạy qua serve.js + cdp.js, Windows không cần ffmpeg)
`music-analyze.html` (tempo, phách, bass, chroma) · `music-xcorr.html` (độ lệch chính xác 2 bản theo vòng) · `music-match.html` (vòng nào khớp vòng nào) ·
`music-mix.html` (trộn theo plan → WAV, khớp lưới 1ms) · `music-tempo.html` (thử, KHÔNG chính xác — đừng tin) · `music-align.js` / `music-bars.js` / `music-sections.js` (thử, kém với nhạc lặp vòng).
Bài học: đo tempo thật bằng plan thử (snapRange 0.25, xem độ lệch tăng đều theo vòng) — beat tracker + Fourier sai ±0.3 BPM.

## Kịch bản + ảnh (20/11)
- Kịch bản: prompts/kich-ban/megaband.md (anh bảo "làm đi"; còn chờ anh trả lời: dùng chung khung trăng đỏ cho cầu thang + đỉnh tháp?).
- 9 ảnh GPT CHỈ KIẾN TRÚC (trời xanh lá #00FF00 để tách), đã soát đạt — bản gốc ở D:/meme-anime-lab-videos/megalovania/nen-gpt/ (chưa đưa vào assets):
  n1 lâu đài vách đá · n2 ban công + kính màu (Sans) · n3 hầm mộ (Bongo, trong nhà) · n4 đại sảnh organ (Piano, trong nhà) · n5 đỉnh tháp (Guitar)
  n6 cầu thang đổ nát (2 violin; kính đèn đường bị tô xanh → thủng khi tách, thắp đèn bằng code che) · n7 sân khấu sân trong + cổng vòm (tutti)
  n8 đỉnh tháp cao nhất (solo violin) · n9 2 cánh cổng (mỗi cánh 1 vòm riêng → code cắt theo 2 nửa vòm cổng n7).
  n10 SÂN KHẤU NHÀ THỜ ĐỔ NÁT (bố cục theo ảnh mẫu anh gửi 20/11, gọn hơn: vòm hở trời 2 bên, kính màu lớn giữa + bệ cao, sân khấu tròn có bậc, 2 bệ vuông) — THAY n7 cho đoạn tutti
  n11 đạo cụ rời: 2 gargoyle há miệng (phun lửa bằng code ở cú nhấn) + 2 loa. n7 / n9 (sân trong + cổng) bỏ — chuyển cảnh 0:52 = 6 ô vỡ như kính.
  Lệnh vẽ: file .prompt.txt cạnh ảnh. Vẽ thêm: tools/x/gpt-image.sh (luật: chỉ kiến trúc, không trăng / mây / mưa / sét / đèn / lửa — anh nhắc 20/11).
- Việc dựng tiếp: gkey.js tách trời (n1 n2 n5–n9) → webp / jpg 0.86 vào assets/img/cine/MB_*; film js/film-megaband.js (16:9, CineKit, panels cho các ô);
  trời / trăng / mây / mưa / sét / lửa / nến / đám đông 61 meme bằng code; nhạc = mix v3 (cần mã hoá mp3/webm để đưa vào assets/audio — Windows không ffmpeg).

## Phim bản 1 (20/11) — js/film-megaband.js, Meme Cinema → ANIME LAB → 'Megalovania · Meme Band in the Castle'
- Dựng 2D theo lớp (như fin1f1): trời / trăng / mây / mưa / sương / sét / nến / lửa / dơi / tàn lửa / vòng ký tự / kính màu / nốt / khuông nhạc / dây / ong = CODE; nền = assets/img/cine/megaband/MB_*.
- Nhạc: assets/audio/mb_mix.webm (Opus 160k, nén trong trình duyệt: tools/x/audio-encode.html + tools/x/webm-duration.js chèn độ dài — thiếu thì trình duyệt báo 7.7s).
- Nhân vật hoà cảnh: sprBlend (luật mới CLAUDE.md). Bỏ VFX vòng tròn (anh chê) → Bongo vạch nhấn + nốt, Guitar khuông nhạc 5 dòng, Sans nốt từ loa kèn.
- Đã soát bảng khung ~30 mốc + sfx-lint sạch. CHƯA: js/shots/megaband.json (film-lint), Blender (kính vỡ 0:52 + nổ cuối — đang làm bằng code), đổi khung theo onset thật
  (đang theo lưới 1/8), xuất video (Mac, khi anh bảo: render-cine megaband, 16:9 4K 50fps).

## Sửa sau khi anh xem (20/11, Ver 683–685)
- Muỗi đứng riêng: lơ lửng GIỮA khung trên lòng cầu thang; VFX muỗi = nốt nhạc đơn giản (bỏ tia dây — anh chê xấu).
- Tutti cháy hơn: cắt [4,2,2,2,2,2,1,1] phách / vòng + góc nghiêng, zoom giật phách đầu ô, loé đèn theo phách, đèn rọi mảnh đỏ / xanh, hàng cột lửa mép sân khấu cách 1 ô, đám đông nhảy đồng loạt, impact 2 màu + RGB đầu vòng.
- Người diễn nổi bật: đèn ngược sau lưng + vũng sáng chân, nền tối + mờ ở cảnh cận, ánh môi trường phủ nhẹ hơn.
- Guitar: quạt dây theo 1/8 (cặp O3/CALM ↔ O1/O2), solo: headbang lúc sét, ngả người cuối câu, ô cuối quỳ → giơ tay. Mọi bộ khung neo chung tỉ lệ + điểm chân (sprBlend o.ref).

- (Ver 686) Anh: lửa vẽ tay (cột lửa + gargoyle phun lửa) "không cần thiết" → đài phun TIA LỬA LẠNH (hạt có trọng lực) ở mép sân khấu, gargoyle mắt loé đỏ + khói lạnh bốc lên.
  Bỏ khung impact (cảnh tối → cả khung 1 mảng màu, như lỗi) → loé sáng ấm 0.12s đầu vòng.

- (Ver 687) Nến đại sảnh (30 ngọn) + hầm mộ (24 ngọn) + mắt / miệng gargoyle ĐO bằng tools/x/plate-grid.html. Mọi meme đám đông cầm 2 lightstick lắc ĐÚNG NHỊP
  (1 lần / phách; solo: qua lại theo ô nhịp). Solo guitar chuyển lên SÂN KHẤU: tắt đèn, 1 đèn rọi xuống Guitar giữa phía trước, zoom, khán giả lightstick bên dưới; solo violin xen 2 cảnh khán giả.

## ✅ Bản phối v4 (20/11 tối, Mac) — sửa "nhạc lộn xộn" + "piano như không chơi" + anh: con nào vào thì các con khác nhỏ lại
- Lỗi v1–v3: mỗi bản tự chọn số vòng (music-match so cả dải → vòng nào cũng 4 hợp âm D C B B♭ ⇒ không phân biệt đoạn) → 2–3 đoạn bài chồng nhau;
  và không cân độ to (piano v3 nhỏ hơn guitar ~14 dB, bản trống = bản master đầy còn to lên đúng lúc piano vào).
- Giờ: mỗi hàng = 1 NHÃN đoạn, bảng LAB trong `tools/x/mega-arrange.js` (nhãn → vòng của từng bản). Soát: `python3 tools/x/music-check.py tools/x/_ref/mega/plan.json`
  (độ giống giai điệu từng cặp bản / hàng; dò cấu trúc 1 bản: `--map`). Trộn (Mac): `python3 tools/x/music-mix.py tools/x/_ref/mega/plan.json ra.wav --levels`
  (cân RMS từng đoạn nguồn về cùng mức `lvl`, in bảng dB từng bản / hàng) → `ffmpeg -i ra.wav -c:a libopus -b:a 160k -ar 48000 assets/audio/mb_mix.webm`.
  ⚠️ music-mix.html (Windows) CHƯA hiểu `lvl` / `lvlRef` (chỉ Mac trộn được v4).
- Nguồn tải lại (Mac: `~/.local/bin/yt-dlp --js-runtimes node -f bestaudio -x --audio-format mp3` — yt-dlp của python 3.9 quá cũ, YouTube chặn):
  drum USYOr_NqqsU · violin nQc5pMBwzF0 (Taylor Davis) · piano J1-ltspBXNU (Sheet Music Boss tutorial) · guitar vp1Rq_gtTSM (Kfir Ochaion, ĐỦ BÀI — anh gửi 20/11, thay bản metal 56s)
  · Grim Cat xplnuJ16SWk (intro) · sax = `~/Desktop/0. meme/UNDERTALE Megalovania 🎷 Saxophone Cover.mp3` (bản đủ 1:46; assets chỉ là bản cắt 60s). Để ở tools/x/_ref/mega/.
- Gốc riff (giây, file tải trên): trống 7.651 (vòng k = −0.368 + k·C; k1–2 chỉ có nhạc gốc, trống vào k3) · sax 0.425 · piano 5.702 · guitar 0.308 · violin 4.337. Lệch theo thời gian < 10ms.
  (File trống trên Windows lệch file tải này +1.012s → số vòng cũ của note = k ở đây.)
- Cấu trúc (piano): riff×4 · B1 B2 B3 B4 B3 B4 · C1 C2 C1' C3 · D×4 · đoạn kết E. Trống k = piano + 1, guitar = violin = piano (tới C), sax: riff, B1–B4 (không lặp), C (8–11), hết.
  Violin sau ~132s nhỏ / lệch lưới, không có D; sax không có D / E → v4 KHÔNG dùng D / E: P2 tutti = B1–B4 lại, kết = riff cả ban + phách 1 của B1 mọi bản (hợp âm chung) + sấm.
- Nổi bật khi vào (P1): con vào +4 dB, con khác −7 dB (hàng Bongo+Piano: trống giữ mức thường); hàng 'dồn lên' mỗi ô nhịp 1 con (sax, trống, piano, guitar — đúng thứ tự phim quay).
  Solo P2: con solo +2, trống nền −8. Đổi mức: LEAD / DUCK / SOLO_BG trong mega-arrange.js.
- Bảng giờ không đổi (20 hàng × 8.019s từ 12.5s, dài 177.9s) → phim film-megaband.js không phải sửa giờ. ⏸️ CHỜ ANH NGHE (em không nghe được: soát bằng số).

## Tiếp theo
1. Anh nghe v2 → sửa phối. 2. Viết kịch bản + bảng phân cảnh (skill viet-kich-ban) cho anh duyệt. 3. Dựng (dung-phim, Blender cho sét / lửa / lâu đài). 4. Xuất khi anh bảo (Mac).
