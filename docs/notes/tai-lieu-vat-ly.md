# Tài liệu VẬT LÝ cho phim / VFX (anh hỏi 19/11: "trang có công thức vật lý về các cảnh phim, giống trang dao động quả bóng làm Ball meme")

Đọc KHI làm một hiệu ứng có vật lý (nổ, va chạm, đổ vỡ, bay, nảy, vải, khói, nước). Nguyên tắc: tra công thức THẬT → làm theo (hoặc mô phỏng Blender) → so song song với video mẫu (`tools/x/compare.js`).

| Nguồn | Dùng cho |
|---|---|
| Ten Minute Physics — matthias-research.github.io/pages/tenMinutePhysics | vật rắn va chạm, vải, khối mềm, chất lỏng, vỡ vụn — bài ngắn + code JS chạy được (tác giả engine PhysX) |
| The Nature of Code — natureofcode.com | lực, trọng lực, ma sát, dao động, lò xo, hệ hạt (khói, tia lửa) — code JS |
| HyperPhysics — hyperphysics.phy-astr.gsu.edu | tra công thức gốc: ném xiên, va chạm, dao động tắt dần, sóng âm, sóng xung kích |
| Gaffer On Games — gafferongames.com | tích phân từng khung cho ổn định (lò xo, vật rơi) |
| Wikipedia "Blast wave", "Taylor–von Neumann–Sedov blast wave" | bán kính sóng nổ r = K·t^0.4 (nhanh rồi chậm) — đang dùng ở `VfxBoom.shockAt` |
| Glasstone & Dolan "The Effects of Nuclear Weapons" (miễn phí, bản điện tử) | trình tự vụ nổ lớn: chớp → cầu lửa → sóng chấn → nấm khói, tốc độ từng pha |
| Yngve, O'Brien, Hodgins — "Animating Explosions" (SIGGRAPH 2000) | sóng chấn đập vào vật, vật vỡ / bay theo áp suất |
| Bridson — "Fluid Simulation for Computer Graphics" | nền của Mantaflow (khói / lửa Blender) |
| easings.net | bảng hàm nhanh – chậm |

## Công thức hay dùng
- Ném xiên / văng: x = x0 + vx·t, y = y0 + vy·t − ½·g·t² (g ≈ 9.8 m/s² ≈ 2940 đv/s² nếu 300 đv = 1 m).
- Nảy: vận tốc sau chạm = −e·v (e 0.3–0.6 đá / bê tông, 0.7–0.9 bóng cao su); mỗi lần nảy cao còn e² lần.
- Dao động tắt dần (lò xo, rung máy, vật lắc): x = A·e^(−ζωt)·cos(ωt).
- Sóng nổ: r = K·t^0.4 → tốc độ mặt sóng v = 0.4·r/t (giảm dần). Thời gian tới khoảng cách d: t = (d/K)^2.5.
- Cầu lửa: phồng rất nhanh (~0.1–0.3s) rồi chậm, sau đó nổi lên vì nóng (bốc thành nấm), màu nguội trắng → vàng → cam → khói.
