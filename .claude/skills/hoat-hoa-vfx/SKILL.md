---
name: hoat-hoa-vfx
description: Dựng HOẠT HOẠ VFX kiểu anime bằng code cho phim Meme Cinema (cine-kit) — vụ nổ lớn lan từ tâm (vòm → vòng bụi → đá nhấc → nứt đất → tường bụi nuốt máy → trắng xoá), tràng IMPACT FRAME (bóng đen / trắng, vạch tốc độ toả, sao 4 cánh), vẽ "trên 2" cho nét tay, nguyên tắc spacing cho chuyển động MƯỢT. Dùng module js/vfx-boom.js. Dùng khi anh bảo làm nổ / impact / chiêu lớn / "mượt hơn", hoặc khi dựng cú quyết định của 1 trận / cảnh.
---

# Hoạt hoạ VFX (18/11/2026 — học từ video anh gửi, đã đếm khung 30 khung/giây)
Module: `js/vfx-boom.js` → `window.VfxBoom`. Phim mẫu: `js/film-vfxboom.js` (Meme Cinema → Anime Lab → "Sample · Explosion + impact"). Phim nạp module bằng XHR như film-vfxboom.js dòng đầu.

## 1. Vụ nổ lớn — `VfxBoom.explosion(F,t,o)` (gọi trong `world`)
Mẫu: youtube aVvT_--q7Ow giây 21–26. Trình tự (giây kể từ `o.t0`):
1. TRƯỚC nổ: cắt sang toàn cảnh chân trời TRỐNG, giữ ~0.3–0.5s, màu hơi nhạt (lặng).
2. 0 → 1.1: CHẤM VÒM nhỏ ở tâm (lõi trắng → xanh → viền hồng, màu PHẲNG nhiều tầng mép sắc) lớn CHẬM.
3. 1.1: vòng bụi DẸT toé trên mặt đất + đá bị nhấc lên lơ lửng rồi văng.
4. 1.3→: NỨT ĐẤT toả từ tâm ra mọi hướng (cả về phía máy).
5. 1.6 → 3.2: BỨC TƯỜNG BỤI (2 lớp cụm mây cel, đỉnh hắt màu lõi) lan ra, cao dần, QUA MÁY → `VfxBoom.wallAtCam(F,t,o)` (0–1) để phim phủ kín màn → TRẮNG XOÁ giữ ~0.5s.
- `o = {t0, x, z, R (bán kính vòm, đv thế giới; meme ~120), wall (bán kính tường bụi đi tới), pal:'cyan'|'fire'|'purple'|'gold', fps:12}`.
- Tâm nổ đặt XA máy (z ~3000+) để thấy tường bụi lan TỚI máy. Rung máy tăng dần khi tường bụi tới; sóng bóp méo (post shocks) ngay lúc vòm nổ.

## 2. Tràng IMPACT FRAME — `strobe / impactOf / gradeOf / impactOverlay`
Mẫu: youtube -nOC-UgaLLw (One Piece) + 3 video 17/11 (skill edit-video mục 8). Impact = chuỗi khung KHÁC HẲN xung quanh, ở đúng khung chạm:
- nhân vật tô ĐEN ĐẶC, nền TRẮNG (tương phản tối đa) → khung sau thêm VẠCH TỐC ĐỘ toả từ điểm chạm → đảo màu / bản màu (hồng–đen) → trắng tinh.
- Mỗi hình 1 khung (1/30s), 8–12 khung: `const ST=[[tChạm,'bw wb bw k w wb bw w c w',px,py]]` (px,py = điểm chạm 0–1 trên màn).
- Phim: `impact:t=>VfxBoom.impactOf(VfxBoom.strobe(t,ST), cảnhTối)` · `grade:t=>VfxBoom.gradeOf(VfxBoom.strobe(t,ST))` · trong `screen`: `VfxBoom.impactOverlay(F,VfxBoom.strobe(t,ST))`, và TẮT vignette / letterbox lúc chớp (trắng / đen phải tuyệt đối).
- ⚠️ Cảnh ĐÊM / tối: truyền `cảnhTối=true` (đảo ánh xạ) — không thì nhân vật ra trắng trên đen.

## 3. Mượt (youtube MYMWRdhF0l4) + nét vẽ tay
- Mượt KHÔNG do nhiều khung mà do SPACING: khoảng cách giữa các tư thế phải đổi tốc ĐỀU (dùng ease, không nhảy tốc đột ngột), tư thế chính chọn đúng; giữ nhịp thời gian đều đặn.
- VFX dạng vẽ tay: `VfxBoom.step(t,12)` = "vẽ trên 2" (hình giữ 2 khung) — nét rung như anime; còn máy / chuyển động lớn vẫn mượt theo khung.
- Pha cực nhanh (lao, húc) = vệt sáng (`Fin1Fight.dash`), không vẽ người.

## 4. Âm thanh khớp hình (anh chê 18/11)
- Mỗi tiếng đặt ĐÚNG khung hình bắt đầu, có tham số giây thứ 4 = NGẮT khi hết hình (`[t,key,vol,dài,'nhãn']`). Hết VFX / chuyển cảnh là tiếng phải dừng.
- File tiếng có khoảng LẶNG ĐẦU → tiếng chậm hơn hình: đo bằng `tools/x/audio-hits.html` / sfx-audit, trừ khoảng lặng hoặc cắt lại file.

## 5. Soát
`film-check.js <id> --t …` chụp DÀY quanh cú chạm (mỗi 1/30s) + quanh vụ nổ (mỗi 0.2–0.3s). Kiểm: impact đúng bóng ĐEN trên TRẮNG · vòm đủ to · tường bụi có tới máy · không viền tối đè khung trắng.
