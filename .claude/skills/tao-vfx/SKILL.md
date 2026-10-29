---
name: tao-vfx
description: Tạo / sửa VFX (hào quang, lửa, năng lượng, sóng xung kích, chém, impact…) cho meme trong GAME lẫn PHIM — ưu tiên hiệu ứng SINH BẰNG SHADER (js/vfx-gl.js) thay vì vẽ tay khối hình hay ảnh VFX có sẵn; xem trước bằng tools/vfx-preview.js (bảng khung + mp4) trước khi gắn. Dùng mỗi khi anh yêu cầu VFX mới, chê VFX "cứng/xấu/basic", hoặc dựng skill/cảnh phim cần hiệu ứng.
---

# Tạo VFX (game + phim)

Anh dặn 29/10/2026: VFX dùng RẤT nhiều từ game tới phim; aura vẽ tay bằng khối hình bị CỨNG; ảnh VFX có sẵn không đa dạng → dùng CÔNG CỤ sinh hiệu ứng.
Luật cũ vẫn giữ (bộ nhớ): không VFX nứt đất · VFX trúng đòn bám tâm mục tiêu (`follow`) · không tự đổi cỡ/hình VFX khi không được bảo ·
mỗi nhịp 1 tiếng · hiệu ứng skill trong phim phải giống trong game · anh gọi đúng tên VFX trong kho thì xem `getLibVfxImg()` trước.

## 1. Công cụ: `js/vfx-gl.js` (WebGL, nạp sẵn trong game qua index.html; phim cine-kit tự nạp)
- **Aura lửa bám dáng nhân vật** — `VfxGL.drawAura(ctx, img, {preset, x, y, w, h, t, flip, k, sx,sy,sw,sh, ...chỉnh})`
  (x,y = điểm giữa CHÂN, w,h = cỡ vẽ ảnh, t = giây, k = độ đậm 0–1; ảnh sprite-sheet / đã crop thì truyền sx,sy,sw,sh). Vẽ TRƯỚC nhân vật.
  Cách hoạt động: bóng người làm mờ = "trường khoảng cách" → nhiễu fbm kéo dọc, cuộn lên, ngưỡng theo nhiễu khoét thành lưỡi lửa → không lặp, không cứng.
  Preset: `ssj` vàng · `ki` xanh trắng · `haki` đen viền đỏ · `cursed` tím đen · `fire` cam · `holy` trắng vàng · `toxic` xanh lá.
  Chỉnh tự do (→ vô số biến thể): `c0` lõi, `c1` giữa, `c2` viền (màu #hex) · `speed` tốc cuộn · `scale` độ mịn · `warp` độ quằn · `rise` lưỡi vươn cao
  · `tongues` độ dài lưỡi · `gain` · `dark` (1 = lửa TỐI vẽ đè, 0 = lửa SÁNG cộng sáng) · `seed` (2 nhân vật cùng preset khác seed cho khỏi giống nhau) · `res` (độ nét mặt nạ, mặc định 400).
- **Hậu kỳ cả khung** — `VfxGL.post(canvas, {shocks:[{x,y,r,w,str}], zoom:{x,y,k}, chroma, heat:{k,t}})` → canvas: sóng xung kích BÓP MÉO không gian,
  zoom blur toả tâm, tách màu RGB, không khí nóng gợn sóng (toạ độ = px của canvas nguồn). Trong cine-kit: khai `post(F,t)` của phim (toạ độ thế giới / màn hình, tự quy đổi).
- Không có WebGL → hàm trả false/null: luôn giữ đường lui (cine-kit tự quay về kiểu vẽ cũ).

## 2. Quy trình
1. Hỏi rõ / tự đề xuất: hiệu ứng gì, lúc nào, màu, cường độ — map sang preset + tham số (hoặc viết shader mới, mục 4).
2. **Xem trước TRƯỚC khi gắn** (Mac): `node tools/vfx-preview.js --img <ảnh meme> --compare ssj,fire --frames 8 --dt 0.08 --out <scratchpad>/v.jpg`
   → Read bảng khung (mỗi hàng 1 preset, mỗi cột 1 thời điểm) soát hình + chuyển động. Chỉnh tham số: `--set '{"speed":2,"rise":0.3,"c2":"#ff2a2a"}'`.
   Hiệu ứng tự viết: `--code fx.js` (file định nghĩa `window.FX=(g,t,S)=>{...}`, S = {img,x,y,w,h,W,H,drawChar()}).
   Gửi anh xem chuyển động thật: thêm `--mp4 <scratchpad>/v.mp4 --sec 3`.
3. Gắn vào game (trong hàm vẽ meme, trước khi vẽ ảnh nhân vật) hoặc phim (`aura:{preset,...}` của `K.sprite`, `post` của phim).
4. Chạy thử thật: game → skill `chay-thu` (chụp đúng lúc hiệu ứng bật); phim → chụp khung (skill `dung-phim`). Đo FPS nếu là hiệu ứng trong trận
   (canvas fill-rate là nút thắt — bộ nhớ perf): aura shader vẽ trên canvas nhỏ (~400px) nên rẻ; hậu kỳ cả khung chỉ dùng thoáng chốc lúc va chạm.
5. Phát hành (skill `phat-hanh`).

## 3. Mẹo cho đẹp
- Aura 2 lớp: 1 preset sáng (`ki`) + 1 preset tối (`haki`) cùng lúc, khác `seed` → hào quang dày, có chiều sâu.
- Bùng lên: tăng `k` 0→1 trong 0.3s + `rise` cao lúc đầu rồi hạ → hiệu ứng "gồng".
- Va chạm: `post` shock (str ~24–34 px logic, w ~26) + chroma 2–3 giảm dần trong 0.5s + khung impact 2–4 khung — mạnh hơn hẳn vòng tròn vẽ tay.
- Lao tới: zoom blur k 0.06–0.14 tâm ở mục tiêu.

## 4. Thêm loại hiệu ứng mới vào vfx-gl.js
Viết fragment shader mới theo mẫu `AURA_FS` / `POST_FS` (dùng chung `NOISE`: `vn`, `fbm`, hash12 không vỡ ô trên GPU thật),
`prog(tên, fs)` + `run(prog,w,h)` → trả canvas để drawImage. Màu dạng premultiplied (`vec4(col*a,a)`).
Gợi ý chưa làm: tia năng lượng (beam) dọc 1 trục, quả cầu năng lượng, sét nhánh, khói volumetric, vết chém có nhiễu.
Thêm xong → thêm `--preset`/ví dụ vào vfx-preview và ghi vào skill này.
