---
name: xem-video
description: Xem video mẫu anh gửi (file mp4 hoặc LINK YouTube kèm mốc giây) — tách theo chỗ CẮT MÁY thành bảng ảnh 3 khung/cảnh có giây, nhịp nhạc, nét phác đen trắng để phân tích góc máy / bố cục / nhịp dựng trước khi dựng phim. Dùng khi anh gửi clip tham khảo ("làm giống đoạn này", "góc máy như video này"). CHỈ Mac (cần ffmpeg, python3 + numpy + Pillow, yt-dlp).
---

# Xem video mẫu → bảng phân cảnh

Công cụ: `tools/xem-video.py`. Ảnh ra để ở scratchpad (KHÔNG để trong repo), rồi Read từng tấm `sheet_*.jpg`.

## Lệnh
- File: `python3 tools/xem-video.py <file.mp4> --from 12 --to 30 --out <scratchpad>/xv --sketch`
- Link YouTube: `python3 tools/xem-video.py "<link>" --from 62 --to 75 --out <scratchpad>/xv --sketch`
  → chỉ tải ĐÚNG đoạn anh ghi (yt-dlp `--download-sections`, client `android_vr` — client mặc định hay lỗi). Chưa có yt-dlp: `python3 -m pip install --user yt-dlp`.
- `--cut 0.32` ngưỡng nhận chỗ cắt máy (anime cắt nhanh / nhiều chớp sáng → tăng lên 0.4–0.5 để khỏi nhận nhầm khung impact là cắt cảnh; cảnh lia mượt bị gộp → giảm 0.2).
- `--per 8` số cảnh mỗi tấm.

## Ra gì
- `sheet_01.jpg…`: mỗi hàng 1 cảnh — `SHOT n  đầu -> cuối (thời lượng)  beats: …` + 3 khung đầu/giữa/cuối có giây (+ cột nét phác nếu `--sketch`).
  Giây ghi theo MỐC CỦA VIDEO GỐC (đã cộng `--from` khi tải link) → nói với anh bằng đúng mốc anh thấy trên YouTube.
- `shots.json`: `{shots:[[đầu,cuối]…], beats:[…]}` — dùng thẳng làm khung thời gian `T={…}` / `shots` của phim cine-kit.

## Đọc bảng thế nào (ghi ra cho anh trước khi dựng)
Mỗi cảnh: cỡ cảnh (toàn / trung / cận / đặc tả), góc máy (cao chéo, ngước, ngang, qua vai, từ trên xuống), máy chuyển động (đứng, lia, đẩy, bay vòng, rung),
hành động chính (1 câu), hiệu ứng (khói, vệt chém, năng lượng, impact frame, speed lines), cắt trên nhịp nào. Rồi map sang shot của cine-kit
(`yaw/pitch/dist/roll`, xem skill `dung-phim`).
