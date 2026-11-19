---
name: hoat-hoa-vfx
description: Dựng HOẠT HOẠ VFX kiểu anime bằng code cho phim Meme Cinema (cine-kit) — vụ nổ lớn lan từ tâm (vòm → vòng bụi → đá nhấc → nứt đất → tường bụi nuốt máy → trắng xoá), tràng IMPACT FRAME (bóng đen / trắng, vạch tốc độ toả, sao 4 cánh), vẽ "trên 2" cho nét tay, nguyên tắc spacing cho chuyển động MƯỢT. Dùng module js/vfx-boom.js. Dùng khi anh bảo làm nổ / impact / chiêu lớn / "mượt hơn", hoặc khi dựng cú quyết định của 1 trận / cảnh.
---

# Hoạt hoạ VFX (18/11/2026 — học từ video anh gửi, đã đếm khung 30 khung/giây)
Module: `js/vfx-boom.js` → `window.VfxBoom`. Phim mẫu: `js/film-vfxboom.js` (Meme Cinema → Anime Lab → "Sample · Explosion + impact"). Phim nạp module bằng XHR như film-vfxboom.js dòng đầu.

## 1. Vụ nổ lớn — DÙNG MÔ PHỎNG BLENDER (18/11, anh chê bản vẽ tay "nhiều sạn, chưa hiểu vật lý")
- Lửa / khói: `tools/blender/boom_sim.py` (Mantaflow, đọc lưới 3D → tô cel) → sheet `assets/img/cine/VFX_*.png` → `VfxBoom.simSprite(F,t,o)`. Cách chạy, tham số: `docs/notes/luong-phim-blender.md` mục 4. ~2 phút / loại, làm 1 lần dùng mãi (đổi màu `--skip-bake` vài giây).
- Chấn động MẶT ĐẤT (anh: "phần quan trọng nhất"): `VfxBoom.groundShock(F,t,o)` — mặt sóng r=K·u^0.4 (nhanh rồi chậm), nứt đất chạy theo mép sóng, hố cháy, đá hất ĐÚNG LÚC sóng qua → parabol trọng lực → nảy 1 lần → nằm yên. `VfxBoom.shockAt(o,d)` = lúc sóng tới khoảng cách d → đặt RUNG MÁY + tiếng ầm đúng lúc sóng tới máy (không phải lúc chớp).
- 🧱 SÀN bật theo sóng = MÔ PHỎNG chung với vụ nổ (`boom_sim.py --tiles` → `VfxBoom.simTiles`), KHÔNG vẽ ô bằng code (anh 19/11: vẽ ra không chuẩn). Tích tụ: `VfxBoom.charge`.
- NHỊP anh chốt 19/11: TÍCH TỤ (~1s, trời tối dần, lõi sáng lớn + co giật, tia / bụi bị hút vào) → LẶNG 0.2s → NỔ = chớp → SÓNG ÂM đi trước (vòng sáng + bóp méo) → SÀN BẬT lần lượt từ tâm ra hết màn ngay sau sóng → NỔ TO (cầu lửa, trễ ~0.33s).
- Trình tự vật lý: CHỚP tức thì (tắt ~0.2s) → cầu lửa phồng nhanh rồi chậm → sóng chấn quét đất + bụi cuộn sát đất → lửa nguội trắng→vàng→cam→khói → khí nóng bốc thành nấm → khói vẫn bốc chậm khi hết mô phỏng.
- Mẫu: `js/film-vfxboom.js`. Soát: `tools/x/anim-check.js <id>` (chỉ được còn GIẬT ở khung chớp nổ).

### (cũ) `VfxBoom.explosion(F,t,o)` — vẽ tay bằng code, KHÔNG dùng cho cảnh mới (vật lý sai: vòm lớn chậm, tường bụi tăng tốc, đá lơ lửng)
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

## 📥 MẪU CẦN ANH GỬI THÊM (anh nói 18/11 "mẫu t bổ sung sau, nào rảnh t update") — mỗi loại 3–5 cảnh anime THẬT, kèm link + mốc giây
Hiện mỗi loại mới học 1 video → số liệu thiên lệch. Cần:
1. **Vụ nổ lớn từ tâm lan ra** (cỡ Shinra Tensei / Hollow Purple / bom): 3–5 cảnh, mỗi cảnh 3–8s.
2. **Impact frame lúc 2 đòn chạm nhau** (đấm vs đấm, kiếm vs kiếm): 3–5 cảnh, ~1–2s quanh khung chạm.
3. **Tụ lực / gồng / bộc phát hào quang** (kiểu Gon, Goku, Zenitsu): 3 cảnh, 2–5s.
4. **Vật khổng lồ xuất hiện** (thiên thạch Tengai Shinsei, Titan, quái vật xé mây): 3 cảnh — cho Friend.
5. **Quân đông 2 phe đối mặt / đổ bộ** (Madara vs Liên minh, chiến tranh Marineford…): 3 cảnh — cho cảnh kết.
6. **Né đòn mượt / lướt** (né nhanh, đổi vị trí): 3 cảnh, 1–3s — đo spacing.
7. **Triệu hồi** (Kuchiyose, ấn triệu hồi trên đất): 2–3 cảnh.
Gửi tới đâu → ghi link + mốc vào đây, đo bằng `tools/x/video-motion.html` (mục 6), cập nhật số liệu các mục trên.

## 6. Đo khung TỰ ĐỘNG — `tools/x/video-motion.html` (thay đếm bằng mắt)
`tools/x/video-motion.html?src=tools/x/_ref/x.mp4&a=21&b=26&fps=30&rate=0.3` (cdp: `waitfor window.__done` → `eval window.__sum` → `evalsave chart window.__png`).
Mỗi khung đo: độ sáng TB, mức chuyển động (chênh khung trước), tâm sáng. Tự tìm: CẮT CẢNH (chênh lớn), khung CHỚP (trắng / đen gần tuyệt đối — impact), đoạn GIỮ HÌNH (gần như không động), đỉnh chuyển động.
`window.__sum` = bảng pha (giây đầu–cuối, loại, số khung) → chép thẳng vào mục 1–2. `window.__json` = số liệu từng khung.

## 7. Thư viện ease / spacing — `VfxBoom.ease` (theo 12 nguyên tắc hoạt hoạ; cine-kit đã có lin / eio / eout / ein / eout3 / ein3 / holdSnap / overshoot / brake)
- `anticip(u)` LẤY ĐÀ: lùi ngược ~12% rồi lao tới (trước mọi cú đấm / lao / ném).
- `settle(u)` THEO ĐÀ: vượt đích rồi dao động tắt dần (tóc, áo, vật nặng dừng lại, máy khựng sau cú).
- `slowInOut(u,k)` CHẬM VÀO – CHẬM RA với độ gắt k (k lớn = giữ lâu ở 2 đầu, lao nhanh ở giữa).
- `hitStop(u,at,hold)` KHỰNG ĐÒN: tới khung chạm `at` thì đứng yên `hold` rồi đi tiếp.
- `keys(t,[[giây,giá trị,ease],…])` nội suy qua các TƯ THẾ CHÍNH, mỗi đoạn 1 ease (biểu đồ spacing).
- `spacingCheck(fn,t0,t1,fps)` SOÁT SPACING: trả {maxRatio, jumps:[giây…]} — tốc độ khung này / khung trước > 3 (không phải cú chạm cố ý) = GIẬT → sửa ease. Chạy trên quỹ đạo nhân vật / máy trước khi báo xong.
Đều đăng ký vào `CineKit.EASE` (anticip, settle) để dùng `ease:'anticip'` trong shot / track.

## 5. Soát
`film-check.js <id> --t …` chụp DÀY quanh cú chạm (mỗi 1/30s) + quanh vụ nổ (mỗi 0.2–0.3s). Kiểm: impact đúng bóng ĐEN trên TRẮNG · vòm đủ to · tường bụi có tới máy · không viền tối đè khung trắng.
