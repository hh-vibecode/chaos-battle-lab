# Việc dở 26/11/2026 (phiên Windows → anh làm tiếp trên Mac)

## 😼 Gigachad Cat (`gigachadcat`, Ver 757) — ĐÃ CÓ trong game, CHƯA DUYỆT XONG
- Code: khối `GK_*` / `_gk*` trong js/game.js (ngay trước khối Commander Cat). Ảnh: `assets/avatars/gigachadcat/` (mèo meme gốc vẽ lại phông xanh),
  `assets/img/gigachadcat/GK_STAND|LIFT|THROW|CARRY|SUPLEX.webp` (thân Gigachad KHỔNG LỒ do GPT vẽ dáng, nhuộm màu lông + ĐẦU MÈO MEME GỐC ghép bằng code — mặt không bị AI vẽ lại).
  Công cụ ghép: `tools/x/_ref/gk/pose.js` (gitignore — chỉ có trên máy Windows; muốn sửa ảnh trên Mac thì làm lại từ ảnh trong assets).
- Cơ chế (anh 26/11): dạng mèo bị đánh → meow trầm + sóng âm đẩy lùi, dame = 50% dame vừa nhận · ≤40% máu → hồi 25%, hoá Gigachad khổng lồ (meow dài, phát chậm 0.82) ·
  hồi chiêu 3s: địch sát bên → BÊ NGANG qua đầu → đổ người ra sau SUPLEX, địch DỐC ĐẦU cắm sàn (200, choáng 1s, nứt mặt sàn) · không ai sát → cúi cắm tay, nhổ 1 mảnh LỚP MẶT sàn (để hố lõi đá) ném đón đầu (150 vùng).
- ❗ CẦN LÀM NỐT:
  1. ✅ (Mac 26/11, Ver 761) **Cân bằng**: máu 3000→2400, bê quật 200→280, ném mảnh sàn 150→210 → trận 22–46s (như meme cũ, máu 3000 thì 40–60s),
     thắng Doge 6/10 · Ricardo 4/10 · Cheems 9/10 (`sim.js gigachadcat --vs doge,ricardo,cheems --n 10`).
  2. ✅ (Mac 26/11 đã chụp kiểm: bê ngang qua đầu → ngả ra sau → địch cắm đầu xuống sàn → choáng — đúng) **Soát hình lúc BÊ NGANG + dốc đầu cắm sàn** — `rotation` của địch trong draw khi `_gkHeld` (xoay 90° → 180° theo `_gkSpin`).
  4. 🔊 (Ver 761) THÊM: `gk_theme` = Can You Feel My Heart (Gigachad theme, myinstants, 5.2s) vang lên khi to xong hẳn · `gk_bell` = chuông WWE ding ding ding lúc suplex cắm sàn ·
     `gk_meow_long` nâng +21 dB (cũ -41.6 LUFS, game chỉ bù ×8 nên vẫn nhỏ). Cú quật giờ đi CUNG TRÒN quanh hông + 30% đầu giữ dáng bê → địch luôn bám tay.
     ❗ Anh nghe lại 5 tiếng `gk_*` (em không nghe được, chọn theo tên + phổ).
  5. ✅ Câu info: "Jawline first. Sigma second." (anh chọn 26/11).

## ⚖️ Chuẩn cân bằng mới (anh 26/11): dame gây ra trong 22–25s ≈ 1000–1200
- Công cụ: `tools/x/sim.js <meme> --dps --n 4` (bù nhìn bất tử, đi lại như meme thường, đánh lại 40/0.8s để kích chiêu phản).
- ⚠️ Bù nhìn hiện cho số THẤP hơn chuẩn: Doge 791 · Ricardo 733 · Gigachad 576 · Battle Cat 471 · Cheems 423. Cần chỉnh bù nhìn cho sát trận thật
  (vd đi chậm hơn / to hơn / đứng gần hơn) HOẶC chốt lại mốc theo bảng này với anh — chưa chốt.
- Battle Cat 471 → theo chuẩn mới là YẾU (thắng Doge ~55% nhờ triệu hồi + Cat God) — bàn với anh.

## 🤸 Luật mới: meme tương tác thì thân phải chuyển động tương ứng (anh 26/11, CLAUDE.md)
- ✅ ĐÃ RÀ (Mac 26/11): đọc mô tả skill 71 meme → 11 con nghi, chụp 16 khung / 0.3s mỗi con khi đấu Doge để xem tận mắt.
  ❗ THÂN ĐỨNG IM lúc tương tác → CẦN LÀM chuyển động (chờ anh chọn thứ tự):
    · **Stalin Cat**: quăng búa / nhặt búa: ảnh y nguyên, chỉ cái búa đổi góc → cần vung tay ném + cúi nhặt.
    · **LeSunshine**: chài bóng qua 2 tay + bật nhảy đập: ảnh y nguyên (bóng tự nảy) → cần nhún theo nhịp chài, bật người lên lúc đập.
    · **Cornelius**: phi chảo mỗi 1.5s: ảnh chạy y nguyên → cần giật người ném.
    · **Slap Cat**: đứng khựng lại vả (tay thò qua cổng): ảnh mèo ngồi y nguyên → cần ngả người vung tay.
  ✅ Đã có chuyển động: Crunchy Cat (nhai), Cough Cat (khung ho), Kermit (nhiều dáng), Mechanic Cat (khung lắp), Dam Dam Didi (lắc đầu), Bread Cat (xoay),
     Gigachad Cat, Cat.exe, Battle Cat, Doorbell Chud, Capybara, Alotta Dame Guy, Samurai Cheems.
  ❔ Chưa thấy được: Angry Cat (trong 5s chụp không phóng xích lần nào) — soát lại khi ép chiêu.
  Ghi chú: mọi đòn có đặt `attackAvatarTimer` đều tự có cú lao người chung (`_atkPop` trong updateJelly) — làm cho 4 con trên có thể bắt đầu bằng cách đặt cờ này lúc ném / vả.

## 🐱 Battle Cat + 💻 Cat.exe — ✅ Ver 759–760 (Mac): RƠI MẤT (lỗ Cat God / Cat.exe rơi vào vũ trụ) = teo CẢ CỤM (thân + vũ khí + thanh máu)
  về gần 0, cuối pha mờ hẳn, chết thì BIẾN MẤT không vỡ mảnh (anh 26/11) — `draw()` bọc `_drawBody()`, cờ `_fellAway` chặn `_fighterDeathFx`.

## 🏟️ Sân (Ver 755–756) — xong; chờ anh xem sân Biển có làm sóng trắng khó thấy không (sàn sáng hơn sân khác).
