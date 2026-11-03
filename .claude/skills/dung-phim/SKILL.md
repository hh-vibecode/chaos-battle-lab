---
name: dung-phim
description: Quy trình DỰNG PHIM anime / cảnh combat cho Meme Cinema bằng bộ khung chung CINE-KIT (js/cine-kit.js, góc máy 2.5D bay vòng, góc cao chéo, khói, vệt chém, hào quang, impact frame) — kịch bản → bảng phân cảnh anh duyệt → câu lệnh ChatGPT vẽ khung chính → dựng từng shot → xem thử → xuất. Dùng khi anh yêu cầu phim / cảnh đánh mới.
---

# Dựng phim bằng CINE-KIT

Đọc trước: `CLAUDE.md` (tỉ lệ cỡ nhân vật, phân việc ảnh — ảnh nhân vật do ANH vẽ ChatGPT, Claude chỉ làm chuyển động + VFX bằng code),
bộ nhớ: mỗi nhịp 1 hành động có lý do, không VFX nứt đất, mỗi nhịp 1 tiếng, skill của meme phải giống trong game.
Mẫu đầy đủ: `js/film-dvc.js` (Buff Doge vs Samurai Cheems, ~7.6s) — copy file này rồi sửa.

## ⚔️ MẸO CẢNH COMBAT (học từ phim người que đánh nhau — Animator vs Animation, Xiao Xiao; anh dặn 3/11/2026 ÁP CHO MỌI CẢNH ĐÁNH)
Cảnh đánh nào cũng phải có đủ các mẹo dưới đây — đây là thứ làm đòn "có lực", thiếu là trông đều đều, nhạt:
1. **Lấy đà (anticipation)**: trước mỗi cú lao/đấm, LÙI ngược hướng 2–4 khung (~0.1–0.15s) rồi mới bung ra. Mẫu: hàm `dash()` trong `js/film-mvd.js`
   (35% đầu lùi 18 đơn vị, 65% sau `ein` lao tới).
2. **Khung nhoè (smear)**: chỉ bật `smear` ở đoạn NHANH NHẤT của cú lao (1–3 khung), không nhoè suốt.
3. **Khựng khi trúng đòn (hit-stop)** — quan trọng nhất: đúng khung chạm, NHÂN VẬT + vật thể ĐỨNG HÌNH 0.1–0.16s, còn hiệu ứng / máy quay / rung vẫn chạy;
   kèm khung impact (`impact()` 'inv'/'bw'/'red'), loé trắng, rung, sóng méo. Mẫu: mảng `HSTOP` + hàm `hs(t)` trong film-mvd.js, gọi `mew(hs(t))`.
4. **Đà sau đòn (follow-through)**: đánh xong / bị đẩy lùi thì VƯỢT quá điểm dừng rồi mới về (`backOut`), không dừng phắt.
5. **Nhịp không đều**: chậm → chậm → cực nhanh → khựng. Không để mọi động tác cùng tốc độ.
6. **Biên đạo rõ**: mỗi pha có tấn công → đỡ/né → phản đòn; 2 bên luân phiên chiếm ưu thế (trận ngang sức thì cuối cùng hoà).
7. **Hiệu ứng ít mà đúng chỗ**: vệt, bụi, tia lửa, chữ tượng thanh ĐÚNG khung chạm; máy lia theo đòn, zoom nhẹ lúc trúng.
8. **Tiếng khớp từng khung**: vút lúc vung (đầu đoạn nhanh), bốp đúng khung chạm, không lệch.
9. **Tư thế = ảnh riêng (cách 1, anh chốt)**: mỗi nhân vật cần bộ ảnh THỦ THẾ / LẤY ĐÀ / RA ĐÒN / TRÚNG ĐÒN / NÉ (anh vẽ ChatGPT), đổi ảnh theo nhịp đòn
   — mẫu lệnh 10 tư thế ở cuối file này. Lệnh vẽ LUÔN ghi "real cat anatomy, round cat paws with paw pads, no human hands/fingers" + hướng mặt cố định (con trái nhìn PHẢI, con phải nhìn TRÁI).
10. **Khung dọc 9:16 hẹp**: 2 nhân vật cách nhau ~400 đơn vị thì máy cần dist ≳ 900 mới lọt cả 2 — soi khung trước khi báo xong.
11. **KHÔNG bó vào khung giữa** (anh chê 3/11): đặt nhân vật lệch 1/3 khung (`ox` ±0.08–0.14), nghiêng máy (`roll`), đổi phía máy theo từng đòn, máy bám theo vật đang bay.
12. **Cắt dày, chiêu ra NHANH**: mỗi shot 0.25–1s ở đoạn cao trào; gồng chiêu ≤0.5s, cắt xen 2 bên (gồng A → gồng B → bắn A → bắn B → toàn cảnh va nhau); tránh vật bay chậm 2–3s.
13. **CHIA KHUNG CHÉO** (`def.panels(t)` trong cine-kit: mỗi ô 1 máy riêng, `clip` đa giác tỉ lệ khung) cho 2 việc xảy ra cùng lúc:
    2 con biến hình đồng thời, 2 con bị hất văng mỗi con nửa khung (máy bám theo con đó) → rồi MỞ RA toàn cảnh rộng. Kẻ đường chéo trắng-đen ở `screen()`. Mẫu: `panels()` + `splitLine()` trong js/film-mvd.js.
14. **Chưởng phải có lực + MÔI TRƯỜNG CHỊU ẢNH HƯỞNG** (anh dặn 3/11): ánh chưởng hắt màu xuống nền (`glow`), vết cháy xém tối tồn tại lâu (`scorch` — KHÔNG vẽ vết nứt đất),
    tảng đá sàn bật tung (`slabs`), mưa bị sóng xung kích thổi bạt / bị đẩy ra (Shinra) (`BLASTS` trong screen), bụi + hạt sáng bị HÚT vào lúc gồng (`suck`),
    mây bị vụ nổ cuối thổi tung, trời quang ra; chưởng to + có vệt đuôi; rung + sóng méo + loé ở cả lúc BẮN chứ không chỉ lúc trúng. Mẫu: js/film-mvd.js.

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

## Mẫu lệnh ChatGPT bộ 5 tư thế đánh tay đôi (mỗi nhân vật)
Gửi kèm ảnh toàn thân sẵn có của nhân vật làm mẫu; ảnh đầu ổn thì gửi kèm ảnh đó ở các lệnh sau.
Đoạn chung dán CUỐI mọi lệnh: "IMPORTANT: it is a real cat with real CAT ANATOMY: four cat legs, round cat paws with paw pads, no human hands, no fingers, no human arms or legs, no human body. Keep exactly the same character, the same realistic photo look and the same dramatic anime-style rim lighting as the reference image. No energy effects, no smoke, no motion lines, no particles. Plain solid green background (#00FF00), no shadow on the background, no text, the whole cat fully visible, not cut off at the edges."
- THỦ THẾ: "full body, side view facing RIGHT/LEFT, in a calm fighting guard stance: low and balanced, both front paws raised loosely in front of its chest, ready."
- LẤY ĐÀ: "winding up for a strike: body coiled and twisted backward, weight on the back leg, one front paw pulled far back, the other paw forward to aim."
- RA ĐÒN: "in the middle of a powerful lunging paw strike: body stretched forward, back leg fully extended pushing off, one front paw thrust straight forward with claws out."
- TRÚNG ĐÒN: "just after being hit hard in the face: head snapped back, body bending backward, front paws flung up, one hind leg lifted off the ground."
- NÉ: "dodging an attack: ducking very low and leaning sideways, body almost flat to the ground, front paws touching the floor."
