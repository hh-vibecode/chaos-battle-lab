# Việc dở 26/11/2026 (phiên Windows → anh làm tiếp trên Mac)

## 😼 Gigachad Cat (`gigachadcat`, Ver 757) — ĐÃ CÓ trong game, CHƯA DUYỆT XONG
- Code: khối `GK_*` / `_gk*` trong js/game.js (ngay trước khối Commander Cat). Ảnh: `assets/avatars/gigachadcat/` (mèo meme gốc vẽ lại phông xanh),
  `assets/img/gigachadcat/GK_STAND|LIFT|THROW|CARRY|SUPLEX.webp` (thân Gigachad KHỔNG LỒ do GPT vẽ dáng, nhuộm màu lông + ĐẦU MÈO MEME GỐC ghép bằng code — mặt không bị AI vẽ lại).
  Công cụ ghép: `tools/x/_ref/gk/pose.js` (gitignore — chỉ có trên máy Windows; muốn sửa ảnh trên Mac thì làm lại từ ảnh trong assets).
- Cơ chế (anh 26/11): dạng mèo bị đánh → meow trầm + sóng âm đẩy lùi, dame = 50% dame vừa nhận · ≤40% máu → hồi 25%, hoá Gigachad khổng lồ (meow dài, phát chậm 0.82) ·
  hồi chiêu 3s: địch sát bên → BÊ NGANG qua đầu → đổ người ra sau SUPLEX, địch DỐC ĐẦU cắm sàn (200, choáng 1s, nứt mặt sàn) · không ai sát → cúi cắm tay, nhổ 1 mảnh LỚP MẶT sàn (để hố lõi đá) ném đón đầu (150 vùng).
- ❗ CẦN LÀM NỐT:
  1. **Cân bằng**: máu đang 3000 (anh đặt 1000; em nâng để bớt thua). Thắng Doge 3/10 ở 2600 máu, chưa đo lại ở 3000. Đo bù nhìn 25s: 761 dame (Doge 791).
     → chốt theo chuẩn mới của anh (1000–1200 dame / 25s, xem dưới) rồi hạ máu về cho hợp.
  2. **Soát hình lúc BÊ NGANG + dốc đầu cắm sàn** (sửa cuối phiên, CHƯA chụp kiểm) — `rotation` của địch trong draw khi `_gkHeld` (xoay 90° → 180° theo `_gkSpin`).
  3. Ảnh duyệt cũ trong `out/review/gigachadcat/` (máy Windows) — trên Mac chụp lại bằng skill chay-thu.
  4. Nghe lại 3 tiếng (`gk_meow` / `gk_meow_big` / `gk_meow_long`, myinstants) — em không nghe được, chọn theo tên + độ dài.
  5. Câu info ngắn đang là "Meows in bass. Lifts the floor." — đưa anh chọn thêm.

## ⚖️ Chuẩn cân bằng mới (anh 26/11): dame gây ra trong 22–25s ≈ 1000–1200
- Công cụ: `tools/x/sim.js <meme> --dps --n 4` (bù nhìn bất tử, đi lại như meme thường, đánh lại 40/0.8s để kích chiêu phản).
- ⚠️ Bù nhìn hiện cho số THẤP hơn chuẩn: Doge 791 · Ricardo 733 · Gigachad 576 · Battle Cat 471 · Cheems 423. Cần chỉnh bù nhìn cho sát trận thật
  (vd đi chậm hơn / to hơn / đứng gần hơn) HOẶC chốt lại mốc theo bảng này với anh — chưa chốt.
- Battle Cat 471 → theo chuẩn mới là YẾU (thắng Doge ~55% nhờ triệu hồi + Cat God) — bàn với anh.

## 🤸 Luật mới: meme tương tác thì thân phải chuyển động tương ứng (anh 26/11, CLAUDE.md)
- Cần rà TẤT CẢ meme cũ: con nào ném / nhổ / tóm / đập mà ảnh đứng im → ghi tên vào đây rồi làm dần. CHƯA rà.

## 🐱 Battle Cat — còn 1 lỗi nhỏ
- Cat God chưởng lỗ: meme rơi xuống lỗ thì teo nhỏ nhưng VŨ KHÍ (gậy Cheems…) + THANH MÁU không teo theo.

## 🏟️ Sân (Ver 755–756) — xong; chờ anh xem sân Biển có làm sóng trắng khó thấy không (sàn sáng hơn sân khác).
