---
name: xuat-video
description: Xuất video MP4 của Chaos Battle Lab trên MacBook — phim Meme Cinema (render-cine.js), trận đấu giả lập 1vs1 (render-match.js), 2vs2 (render-duo.js), Boss Raid (render-boss.js). Chuẩn định dạng của anh, lệnh chạy nền, cách quay lại CHỈ đoạn bị sửa thay vì cả phim. Dùng khi anh bảo xuất / quay / render video. CHỈ chạy trên Mac (cần node + playwright + ffmpeg); máy Windows không xuất video.
---

# Xuất video (macOS)

Bài học: có lần phim 4 phút mất 4–5 TIẾNG vì mỗi lần sửa 1 cảnh lại quay lại CẢ phim ở độ phân giải cao.
Nguyên tắc: **xem thử rẻ → sửa → chỉ quay lại đoạn bị sửa → bản cuối 1 lần.** Luôn chạy NỀN (run_in_background) và báo anh tiến độ.

## Chuẩn định dạng (anh dặn 28/10/2026) — áp cho CẢ phim lẫn trận đấu giả lập
| Khung | Độ phân giải | Phim (render-cine) | Trận đấu |
|---|---|---|---|
| 16:9 ngang | **4K 3840×2160** | `--wide --4k` | (Boss Raid — xem "Cần làm") |
| 9:16 dọc | **3K 1620×2880** (anh chốt 30/10) | `--scale 1.5` | `render-match --w 1620` (render-queue.sh đã đặt sẵn) |
Anh không nói khung nào → mặc định DỌC 3K (anh: "dọc 3k chứ").

## Phim Meme Cinema — `tools/render-cine.js <film> <out.mp4> ...`
Phim có sẵn: `war`, `l2e2`, `l2e3` (bảng `FILMS` đầu file). Phim dựng bằng CINE-KIT (`js/film-<id>.js`, vd `dvc`) thì gõ thẳng `<id>` — tự nhận, không cần thêm vào `FILMS`. Mặc định 30fps, 6 tiến trình song song.
1. **Xem thử nhanh** (soát cảnh, thời lượng, tiếng): `--scale 0.5` (+ `--from A --to B` nếu chỉ cần 1 cảnh). Rẻ gấp ~10–16 lần bản 4K.
2. **Bản thật — công thức NHANH NHẤT**:
   - 16:9: `node tools/render-cine.js l2e3 out/l2e3-16x9-4k.mp4 --wide --4k --cache --webcodecs --hw`
   - 9:16: `node tools/render-cine.js l2e3 out/l2e3-9x16-3k.mp4 --scale 1.5 --cache --webcodecs --hw`
   - `--cache`: cắt phim thành đoạn 20s (`--chunk`) lưu ở `<out>.chunks/` và GIỮ LẠI.
   - `--webcodecs`: trình duyệt tự nén H.264 (phần cứng VideoToolbox, không có thì nén phần mềm của trình duyệt) → bỏ khâu JPEG 4K +
     chuyển ~10MB/khung + ffmpeg nén lại (mỗi khung chỉ còn ~55KB). Trình duyệt không hỗ trợ thì tự in `↩` và quay về JPEG.
   - `--hw`: khi rơi về JPEG thì ffmpeg nén bằng VideoToolbox thay libx264 (CPU dành cho việc vẽ).
   - **Số tiến trình: mặc định 3. KHÔNG tăng** — từng chạy nhiều tiến trình bị TRÀN RAM (mỗi trình duyệt giữ canvas 4K ~1–2GB) → MacBook swap, vừa lag vừa lâu.
     Trước khi chạy bản 4K: đóng bớt app nặng; Activity Monitor báo "Memory Pressure" vàng/đỏ → dừng, chạy lại `--jobs 2` (đoạn đã xong được giữ nhờ `--cache`).
   - Mỗi đoạn in `⏱️ … boot Xs · vẽ Y ms/khung · đẩy Z ms/khung` → biết còn chậm ở khâu nào.
3. **Anh góp ý sửa 1 cảnh** → sửa code, rồi chạy LẠI ĐÚNG lệnh bước 2 + `--redo <giây đầu>-<giây cuối>` của cảnh đó (nhiều cảnh: `--redo 10-25,80-95`).
   Chỉ các đoạn 20s chạm khoảng đó bị quay lại; phần còn lại dùng lại, tiếng trộn lại toàn bộ (nhanh).
   Sửa thứ dùng CHUNG cả phim (hàm vẽ chung, nhạc, cỡ chữ…) → `--redo all`.
   Không biết cảnh nằm giây nào: tra mốc thời gian trong hàm phim (js/cine-*.js) hoặc xem bản thử bước 1.
4. Bị đứt giữa chừng (tràn RAM…) → chạy lại y lệnh: đoạn đã xong được giữ. Máy lag / tràn RAM → `--jobs 2`.
5. Ghép mở đầu: `--intro boss.mp4`.

## Trận đấu giả lập 1vs1 — `tools/render-match.js out.mp4 --a <key> --b <key>`
- Mặc định: chạy thử 10 trận (`--best`), chọn trận SÁT NÚT nhất (con thắng còn ít máu nhất), quay 2K 9:16 60fps.
- Nhanh hơn: `--hw`. `--par 2` (chạy thử 2 trận cùng lúc, kết quả y hệt) CHỈ khi máy đang rảnh — KHÔNG dùng `--par` lớn hơn (MacBook lag, chậm hơn).
- Ý muốn của anh: `--win a|b` (bên trái/phải thắng), `--close 0.25` (thắng còn ≤25% máu). Đã có seed ưng → `--seed N` (bỏ qua chạy thử).
- Chỉ xem kết quả, không quay: `--sim 10`.
- Ví dụ: `node tools/render-match.js out/marmot-vs-ninja.mp4 --a saiyanmarmot --b ninjacat --hw`
2vs2: `tools/render-duo.js out.mp4 --a k1,k2 --b k3,k4 [--win 0|1] [--seed N]` (xem đầu file). Boss Raid: `tools/render-boss.js out.mp4 [--sec 13]`.

## Theo dõi + báo anh
- Chạy nền, đọc log định kỳ: render-cine in `khung i/N` mỗi 10 khung; render-match in `thử #k`, `⏱️ chạy thử mất…`, rồi `Ns video`.
- Ước thời gian từ tốc độ vài phút đầu rồi báo anh; xong gửi đường dẫn file + thời lượng + seed (trận đấu).
- Video ra để ngoài repo hoặc thư mục bị .gitignore — KHÔNG commit mp4.

## ⚠️ Cần làm / chưa kiểm (28/10/2026)
- `--par`, `--hw` (render-match) và `--cache`, `--redo`, `--hw`, `--webcodecs`, số tiến trình tự động (render-cine) viết trên máy Windows, CHƯA chạy trên Mac.
  Phần nén WebCodecs đã thử trong Edge trên Windows: ra H.264 chuẩn (SPS/PPS/IDR), 4K ~55KB/khung, nén phần mềm ~85ms/khung.
  **Lần đầu trên Mac — chạy bài đo này rồi ghi kết quả vào đây:**
  1. `node tools/render-cine.js l2e3 /tmp/a.mp4 --wide --4k --from 0 --to 20 --jobs 1` → ghi dòng `⏱️` (cách JPEG cũ).
  2. Y lệnh + `--webcodecs` → so `vẽ ms/khung` + `tổng`; mở file xem hình/tiếng đúng chưa. Hỏng/chậm hơn → bỏ `--webcodecs` khỏi công thức.
  3. `--cache` 2 lần (lần 2 thêm `--redo 0-10`) → chỉ đoạn đầu được quay lại.
  4. `render-match ... --best 4 --par 2 --hw` → so thời gian `⏱️ chạy thử` với `--par 1`; máy lag thì bỏ hẳn `--par`.
  5. render-cine: so `--jobs 2` với `--jobs 3` trên cùng đoạn 20s → chọn số nhanh hơn MÀ máy không lag, ghi vào đây.
  Lỗi `h264_videotoolbox` → bỏ `--hw`. Kiểm xong thì sửa mục này thành kết quả thật.
- `render-boss.js` đang CỨNG 1920×1080 (16:9 Full HD) — chưa đúng chuẩn 16:9 = 4K. Ghép vào phim 4K bằng `--intro` thì bị phóng lên mờ. Cần sửa cho vẽ 3840×2160.
