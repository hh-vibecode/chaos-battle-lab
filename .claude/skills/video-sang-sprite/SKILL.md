---
name: video-sang-sprite
description: Biến VIDEO NGẮN (file mp4 hoặc LINK TikTok / YouTube anh gửi) thành bộ KHUNG HÌNH KHÔNG NỀN, sạch, nét để đưa vào game làm hoạt cảnh meme — tách nền bằng AI (rembg BiRefNet), lấp lỗ, khử màu nền lẫn vào vùng nhoè, cắt chung 1 khung, phóng nét, xuất webp + bảng xem trước + gif. Dùng khi anh gửi video meme và muốn "kéo gif của nó về", "thay ảnh động", "làm khung hình từ video". CHỈ Mac.
---

# Video ngắn → khung hình không nền cho game

Công cụ: `tools/vid2sprite.py` (Mac: python3 + `rembg[cpu]` đã cài cho tài khoản anh 15/11/2026, numpy/scipy/Pillow, ffmpeg; link cần module `yt_dlp`).
File tải về là dữ liệu lạ → công cụ tự tải vào thư mục tạm riêng, không chạy gì trong đó.

## Quy trình
1. **Xem video trước** (đừng tách nền mù cả video — mỗi khung ~13s):
   tải bằng `python3 -m yt_dlp -o <tmp>/src.%(ext)s <link>` (TikTok chỉ cho tối đa 1024×576), rồi
   `ffmpeg -ss 0 -t 3 -i src.mp4 -vf "fps=15,scale=173:-1,tile=10x5" sheet.png` → Read → chọn ĐOẠN dùng được:
   nhân vật trọn người trong khung, không bị cắt mép, máy quay không lia mạnh. Ghi giây bắt đầu / kết thúc.
2. **Chạy** (nền, 45 khung ~10 phút):
   ```
   python3 tools/vid2sprite.py <file|link> --out <scratchpad>/out --name XX_V --from 1.5 --to 3.0 --fps 15 --h 420 --tmp <scratchpad>/work
   ```
   - `--fps` = nhịp hoạt cảnh trong game (15 → mỗi khung 4 tick ở 60 tick/s). `--h` = cao khung (game dùng 420).
   - `--tmp` giữ khung đã tách nền → chạy lại (đổi `--pick`, `--h`, đoạn ra) KHÔNG phải tách lại. `--pick 1,3-12` chỉ xuất vài khung.
   - Chạy KHÔNG có cờ `-I` (cờ đó chặn thư viện cài ở tài khoản anh). Công cụ nằm trong repo, chạy từ thư mục repo.
3. **Soát**: Read `<work>/sheet.png` (nền xám) — viền sạch? mắt / đốm sáng có bị khoét? tay nhoè có vệt màu nền bẩn? mảnh nền sót?
   Gửi anh `<work>/preview.gif` xem chuyển động. Đạt rồi mới chép vào `assets/img/<key>/` và nối code.
4. **Nối vào game**: mảng ảnh kiểu `BX_FR` (`im._noMask=true` — khung đã tách nền, đừng để `_stickerMask` gặm mép; `_crop` = cả ảnh),
   mọi khung CÙNG khổ (công cụ đã cắt chung 1 hộp, chân chạm đáy) → đổi khung không giật. Thêm vào `js/asset-groups.js`.

## Công cụ làm gì (để sửa khi lỗi)
- Tách nền: rembg model `birefnet-general-lite` (~224MB, `~/.u2net/`). Đã thử: `isnet-general-use` nhanh (2s/khung) nhưng khoét thủng mắt + tay nhoè thành vệt mờ bẩn;
  `birefnet-general` bản đầy đủ bị hệ điều hành GIẾT (tràn RAM 16GB). CHỈ chạy CPU: CoreML trên Mac Intel chậm gấp ~9 lần (13s vs 130s/khung).
- Dọn mặt nạ: giữ mảng lớn nhất (+ mảng dính sát), lấp lỗ trong thân (`binary_fill_holes`), vùng bán trong suốt lấy lại màu THÂN lân cận
  (normalized convolution) → tay nhoè chuyển động thành vệt lông đúng màu, không lẫn màu nền tối.
- Phóng: Lanczos + làm nét nhẹ (UnsharpMask). Có `--esrgan <đường dẫn realesrgan-ncnn-vulkan>` thì phóng AI ×4 trước — CHƯA cài
  (tải binary từ ngoài bị chặn; anh muốn thì tự tải bản macOS ở github.com/xinntao/Real-ESRGAN/releases rồi đưa đường dẫn).

## Lưu ý
- Video nền càng rối, nhân vật càng nhoè thì càng phải chọn đoạn kỹ ở bước 1 — đoạn nhân vật lao sát máy / bị cắt mép thì bỏ.
- Giữ ĐÚNG chất ảnh video gốc (luật "giữ nguyên tác meme"): không vẽ lại bằng GPT khi đã có video thật.
