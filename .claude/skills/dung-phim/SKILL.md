---
name: dung-phim
description: Quy trình DỰNG PHIM anime / cảnh combat cho Meme Cinema bằng bộ khung chung CINE-KIT (js/cine-kit.js, góc máy 2.5D bay vòng, góc cao chéo, khói, vệt chém, hào quang, impact frame) — kịch bản → bảng phân cảnh anh duyệt → câu lệnh ChatGPT vẽ khung chính → dựng từng shot → xem thử → xuất. Dùng khi anh yêu cầu phim / cảnh đánh mới.
---

# Dựng phim bằng CINE-KIT

Đọc trước: `CLAUDE.md` (tỉ lệ cỡ nhân vật, phân việc ảnh — ảnh nhân vật do ANH vẽ ChatGPT, Claude chỉ làm chuyển động + VFX bằng code),
bộ nhớ: mỗi nhịp 1 hành động có lý do, không VFX nứt đất, mỗi nhịp 1 tiếng, skill của meme phải giống trong game.
Mẫu đầy đủ: `js/film-dvc.js` (Buff Doge vs Samurai Cheems, ~7.6s) — copy file này rồi sửa.

## Quy trình
1. **Kịch bản → bảng phân cảnh** (gửi anh duyệt TRƯỚC khi code): mỗi shot 1 dòng — giây, cỡ cảnh + góc máy, hành động (có lý do), hiệu ứng, tiếng.
   Anh gửi video mẫu → chạy skill `xem-video` trước, bám nhịp cắt + góc máy của mẫu.
2. **Danh sách ảnh cần vẽ**: tận dụng ảnh có sẵn (`assets/img/cine/`, `assets/avatars/<meme>/`). Thiếu tư thế → viết CÂU LỆNH ChatGPT cho anh (mẫu dưới),
   anh gửi ảnh về → skill `tach-nen-anh` (nền xanh → webp cắt sát) → để ở `assets/img/cine/`.
3. **Dựng**: `js/film-<id>.js` gọi `CineKit.film({...})`; thêm 1 mục vào thư mục `__lab` (Anime Lab) hoặc thư mục phim trong `openCinema()` (js/game.js) với `id:'ck:<id>'`.
4. **Xem thử**: chụp khung bằng playwright (gọi `playCineKit('<id>',{offline:true,scale:0.5})`, `CineKit.films.<id>.step(t)`, `canvas().toDataURL()`),
   ghép bảng khung → Read. Hoặc anh mở Meme Cinema → 🧪 Anime Lab.
5. **Xuất** (chỉ khi anh bảo): `node tools/render-cine.js <id> out.mp4 --scale 1.3333` (9:16 2K) — phim cine-kit tự nhận, không cần thêm vào `FILMS`. Xem skill `xuat-video`.

## CINE-KIT — cái gì ở đâu (js/cine-kit.js)
- Thế giới 2.5D: x phải, y lên, z sâu; đất y=0; 1 meme cao 100 (Buff Doge 200). Nhân vật = ảnh phẳng quay về máy, chân chạm đất, có bóng.
- **Máy quay** `shots:[{t0,t1,a:{…},b:{…},ease}]`: `tx,ty,tz` điểm nhìn · `dist` · `yaw` (0 = đứng phía −z; −90 = đứng bên TRÁI nhìn sang phải; 180 = sau lưng)
  · `pitch` (+ nhìn từ trên xuống: 45–75 = góc cao chéo / gần thẳng đứng; âm = góc ngước) · `roll` (nghiêng máy kiểu dutch) · `fov` · `ox,oy` (lệch khung).
  Giữa 2 shot = cắt cứng; bay vòng = đổi `yaw` trong 1 shot (vd −20 → 190).
- `K.sprite(F,{img,x,z,y,h,flip,lean,a,white,smear:{dx,dy,dz,n} (dx = VẬN TỐC, vệt kéo ra phía sau),aura:{col:'r,g,b',k}})`
- Hiệu ứng thế giới: `K.smoke` (khói toon, `swirl` xoáy, `tint`, `a`), `K.ring` (sóng xung kích trên đất), `K.slash` (vệt chém trăng khuyết, `k` tiến độ vung),
  `K.sparks`, `K.debris`. Hiệu ứng màn hình: `K.speedLines`, `K.panLines`, `K.sfxText` (chữ tượng thanh), `K.flash`, `K.letterbox`, `K.vignette`.
- Hào quang: `aura:{preset:'ssj'|'ki'|'haki'|…, k, seed}` → lửa shader (skill `tao-vfx`); hậu kỳ `post(F,t)` → sóng bóp méo / zoom blur / tách màu / khí nóng.
- `impact(t)` trả `'inv'` / `'bw'` / `'red'` = khung impact (2–4 khung là đủ); `shake(t)` = biên độ rung.
- Chuyển động nhân vật dùng `K.twos(t)` (giật 12 hình/giây như anime vẽ tay); máy quay + hiệu ứng để mượt.
- Ảnh gốc nhìn sang trái/phải → hàm `faceFlip` trong film-dvc.js tự lật theo vị trí đối thủ TRÊN MÀN HÌNH (máy bay vòng ra sau thì tự đổi).
- Muốn có góc nhìn sau lưng → cần ảnh "quay lưng" riêng (vd `CINE_SM_BACK`); không có thì tránh shot đó.

## Mẫu câu lệnh ChatGPT cho 1 khung chính (anh dán vào ChatGPT)
```
Draw <nhân vật: tả đúng meme gốc, vd "the Buff Doge meme (muscular shiba inu with the doge face)">, full body, <tư thế/hành động cụ thể>,
seen from <góc máy: high angle looking down diagonally / low angle from below / from behind / side view>, anime fight scene style
(Jujutsu Kaisen / Mappa look: bold clean lineart, cel shading, strong rim light), keep the original meme face exactly.
Plain solid green background (#00FF00), no shadow on the background, no text, character not cut off at the edges.
```
- 1 tư thế / 1 ảnh (hoặc nhiều tư thế cách xa nhau trên 1 tấm nền xanh — `tach-nen-anh` tự tách).
- Cùng 1 phim: nhắc lại đúng câu tả phong cách ở mọi lệnh để nét vẽ đồng nhất; gửi kèm ảnh khung trước cho ChatGPT làm mẫu.
