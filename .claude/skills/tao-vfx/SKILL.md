---
name: tao-vfx
description: Tạo / sửa VFX + phần NHÌN của skill (hào quang, lửa, sét, khói/hơi nước, sóng xung kích, chém, impact, TÔ LẠI 1 BỘ PHẬN như tay haki / giáp / đổi màu…) cho meme trong GAME lẫn PHIM — ưu tiên CÔNG CỤ sinh hiệu ứng (shader js/vfx-gl.js, sét/khói VfxGL, tools/part-paint.py) thay vì vẽ tay khối hình hay ảnh VFX có sẵn; xem trước bằng tools/vfx-preview.js trước khi gắn. Dùng mỗi khi anh yêu cầu VFX/biến hình mới, gửi ảnh mẫu anime/manga, hoặc chê VFX "cứng/xấu/basic/vỡ".
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

## 5. Thư viện 2D dùng chung (VfxGL, không cần WebGL) — thêm 29/10
- **Sét manga/anime** `VfxGL.boltSet(ctx, x, y, góc, dài, dày, seed, {core, rim, glow, branches})` (1 tia chính + 2–4 tia nhỏ bám khớp gãy) / `VfxGL.bolt(...)` (1 tia).
  Mặc định haki: lõi đen + viền đỏ + quầng đỏ. Sét xanh: `{core:'#e8f6ff', rim:'#3aa0ff', glow:'rgba(80,170,255,0.3)'}`. Đổi `seed` mỗi 3–4 khung → giật hình kiểu anime.
  Anh duyệt (Doge haki): **2 tia chính CHÉO** từ chỗ trúng (1 chéo lên, 1 chéo xuống, ngược về phía người đấm) + tia nhỏ bám, sống ~0.2s. Ít khúc, gãy dứt khoát, KHÔNG xoăn.
- **Khói / hơi nước / bụi** `VfxGL.puff(ctx, x, y, r, alpha, 'r,g,b')`. Hơi nước Gear 2 (trắng hồng) bốc từ khắp người khi bật dạng mới; khói đen cho tà khí.

## 5b. Đồ kéo về từ GitHub (MIT — dùng thương mại được), nạp sẵn trong game + phim
- **pixi-filters v6** (`js/vendor/pixi-filters/glsl.js` + LICENSE): 37 bộ lọc GLSL chạy qua `VfxGL.filter(canvas,'tên',{uniform},{define})` (WebGL2, toạ độ px gốc trên-trái).
  Lệnh gọn `VfxGL.fx.*` (đã thử cả 17 trên khung trận thật): `glow` (hào quang quanh ảnh nhân vật) · `outline` (viền mượt) · `godray` (tia sáng) · `shockwave` (sóng bóp méo)
  · `zoomBlur` · `radialBlur` · `motionBlur` · `rgbSplit` · `bulge` · `twist` · `crt` · `oldFilm` · `bloom` · `glitch` · `adjust` (độ bão hoà/tương phản) · `pixelate`.
  Mỗi lệnh trả canvas → `ctx.drawImage`. Dùng cho cả khung (chụp canvas trận) lẫn 1 ảnh nhân vật. Shader cũ GLSL1 / biến tên `sample` tự được vá.
- **Proton v7** (`js/vendor/proton/proton.min.js` + LICENSE): engine hạt — `VfxGL.parts.spawn('fire'|'smoke'|'sparks'|'dust'|'steam'|'embers'|'magic'|'snow', x, y, {dur, scale, color, angle, spread})`,
  `VfxGL.parts.step(dt)` gọi theo NHỊP GAME (đứng hình → hạt đứng), `VfxGL.parts.draw(ctx)`.
- Muốn thêm thư viện khác: ưu tiên MIT/BSD/Apache, KHÔNG dùng giấy phép phi thương mại (vd LYGIA dạng Prosperity) vì kênh anh có kiếm tiền; tải vào `js/vendor/<tên>/` kèm LICENSE.

## 6. Tô lại 1 bộ phận nhân vật (tay haki, giáp thép, tay vàng, đổi màu…) — `tools/part-paint.py` (Mac)
Không tự VẼ bộ phận mới (anh vẽ ChatGPT) — nhưng ĐỔI CHẤT LIỆU/MÀU bộ phận có sẵn trong ảnh thì làm bằng công cụ này:
1. Soi nếp cơ: `python3 tools/part-paint.py --img <ảnh> --crease <scratchpad>/c.png --box x0,y0,x1,y1` → Read, chép toạ độ ranh giới
   (nếp vai/ngực rất mờ trên ảnh gốc — ĐỪNG đoán: lần đầu khoanh tay Doge lấn cả ngực, anh chê "tay thôi sao lên cả ngực").
2. Tô: `--part '[[[x,y],...],...]' --style haki|steel|gold|tint:#hex:0.7 [--body-tint '#ff7a3a:0.3'] --out <file> --check <scratchpad>/k.png` → Read ảnh check.
   haki = kiểu tay Luffy (anh gửi mẫu): đen tuyền + mảng bóng xám xanh PHẲNG viền sắc + vệt sáng dọc mép — "đen BÓNG", không đen nhám, không gradient mềm.
   Mặc định phóng ×2 (mép mịn). Ảnh nguồn nhỏ (<500px) thì báo anh xin bản nét hơn.
3. Muốn hiệu ứng "lan dần" (haki chạy từ tay lên vai): xuất thêm bản `--no-part` (chỉ ửng thân) rồi trong game ghép: ảnh gốc → bản no-part (alpha tăng dần)
   → lớp bộ phận (ảnh tô trừ bản no-part) cắt từ dưới lên theo tiến độ + vệt sáng ở mép lan. Mẫu: `_dgHakiWipe` trong js/game.js.
4. Ảnh mới gắn vào game: `im.onload=()=>{ im._crop=computeCropBox(im); }` (như avatar) để khung khớp ảnh gốc; ảnh đấm/tư thế phải để mặt + nắm đấm HƯỚNG VỀ ĐỊCH
   — thử trong trận cả 2 phía (địch trái / phải) rồi mới chốt danh sách lật ảnh, đừng đoán.

## 7. Bài học anh đã góp ý (giữ cho mọi VFX)
- Anh gửi ẢNH MẪU (anime/manga) → bám đúng hình dáng, GÓC, số lượng, màu của mẫu; không tự chế thêm.
- "Làm đơn giản" = 1–2 lớp hiệu ứng, trọng tâm vào thứ anh nói (vd haki buff tay), bỏ vòng/aura/hạt thừa.
- Biến hình lần 2 ≠ lần 1: đổi chữ bay ra theo chủ đề (wow haki, such buff, too hard…), đổi hiệu ứng (khói/hơi nước thay hào quang), nhân vật TO SẴN không phồng lại từ nhỏ.
- Chữ / sét / vòng: `globalAlpha` ÂM bị canvas BỎ QUA (giữ giá trị cũ) → luôn `Math.max(0,…)` (đã từng làm cả màn hình đen kịt).
- Viền / mặt nạ / sprite dựng sẵn phải dựng ở ĐỘ PHÂN GIẢI THẬT (nhân hệ số phóng của ctx), không thì vỡ răng cưa khi xuất 2K (xem `_drawStickerOutline`).

## 4. Thêm loại hiệu ứng mới vào vfx-gl.js
Viết fragment shader mới theo mẫu `AURA_FS` / `POST_FS` (dùng chung `NOISE`: `vn`, `fbm`, hash12 không vỡ ô trên GPU thật),
`prog(tên, fs)` + `run(prog,w,h)` → trả canvas để drawImage. Màu dạng premultiplied (`vec4(col*a,a)`).
Gợi ý chưa làm: tia năng lượng (beam) dọc 1 trục, quả cầu năng lượng, sét nhánh, khói volumetric, vết chém có nhiễu.
Thêm xong → thêm `--preset`/ví dụ vào vfx-preview và ghi vào skill này.
