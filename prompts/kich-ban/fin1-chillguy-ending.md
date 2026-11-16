# Final Part 1 — 2 cảnh mới (16/11/2026, CHỜ ANH DUYỆT)
Dựng theo luật mới: cắt cảnh tĩnh, nền vẽ tay chỉ khung cảnh, vật tương tác (xe, nửa toà nhà, đá, mảng tường) vẽ riêng phông xanh, meme = ẢNH GỐC, effect code.

Vị trí trong tập (`js/film-fin1full.js` PARTS):
fin1c1–c3 → fin1c5 (Meowkatsuki tách ra) → **[A] fin1c6 Chill Guy** → fin1f2 Bat → fin1f3 Ninja → fin1f1 Doge → fin1c4 Gojo vs Pain → **[B] fin1c7 Kết Part 1**

---
## [A] fin1c6 — Chill Guy giữa thành phố đổ nát (~30s)
**Tóm tắt.** Giữa lúc Meowkatsuki vừa toả đi khắp thành phố, dân meme hò hét chạy loạn dưới mưa gạch đá. Chill Guy vẫn chill, đi ngược dòng người, đỡ từng con chạy qua. Một toà nhà nghiêng đổ xuống đúng chỗ Banana Cat đang ngồi khóc → Chill Guy lao tới ôm Banana Cat lăn ra, mảng tường đập xuống ngay sau lưng. Đặt Banana Cat xuống, Chill Guy khựng lại: một linh cảm. Quay lại — một chiếc xe đang bay thẳng về phía mình → nhảy sang bên né, xe đâm nát mặt đường. Trong khói, Depressed Cat (dạng Pain) lơ lửng bước ra, giơ tay: đá, cột đèn, mảng tường bị hút lên rồi bắn liên tục về phía Chill Guy (chiêu hút / đẩy thường — KHÔNG hiện tên chiêu). Chill Guy bỏ chạy, né từng món, mỗi lần né sát hơn… tới khi một NỬA TOÀ NHÀ đập trúng người. Im lặng. Khói bụi tan dần — Chill Guy bước ra, áo rách, hào quang NỘ đỏ bốc lên, chữ đỏ "I'M NOT CHILL ANYMORE" (đúng game: ăn đủ 1000 dame là thức tỉnh). Lao thẳng về phía Depressed — thì một bóng người đứng chắn giữa: Mewing Cat (Gojo), băng mắt, giơ tay ngăn lại. Chill Guy khựng, tắt nộ, nhìn Gojo, gật đầu — rồi quay người chạy vào làn khói (đi cứu tiếp). Gojo và Depressed đối mặt. Cắt sang trận Bat Cat.

| # | chuyện gì xảy ra → phản ứng | máy (tĩnh) | VFX / môi trường | tiếng | ảnh |
|---|---|---|---|---|---|
| A1 | Phố đổ nát, mưa gạch, dân meme (Pop, Huh, Cornelius, Kermit…) chạy loạn qua khung | toàn | khói, lửa, gạch rơi | đám đông la hét `fin_crowd`, nhà sập xa | nền phố đổ nát (VẼ) · meme gốc |
| A2 | Chill Guy đi NGƯỢC dòng người, đỡ 1 con vấp ngã đứng dậy | trung | bụi | bước chân | Chill Guy gốc |
| A3 | Toà nhà cạnh Banana Cat nghiêng đổ, Banana Cat ngồi khóc ngước lên | ngước | bóng toà nhà phủ xuống | rắc rắc, khóc `cry_banana_cat` | toà nhà nghiêng (VẼ riêng) |
| A4 | Chill Guy lao tới ôm Banana Cat lăn ra — mảng tường đập xuống ngay sau lưng | trung → cận | vệt lao, bụi nổ | ầm + vút | Chill Guy + Banana gốc |
| A5 | Đặt Banana xuống, khựng: linh cảm (mắt liếc, nhạc tắt) | cận mặt | gợn không khí | LẶNG 0.5s | Chill Guy gốc |
| A6 | Quay lại: chiếc XE bay thẳng về phía máy → Chill Guy nhảy sang bên né, xe cày nát mặt đường, lật | qua vai → toàn | vệt xe, tia lửa, mảnh nhựa | rít + đâm sầm | xe (VẼ riêng) |
| A7 | Trong khói: Depressed (Pain) lơ lửng bước ra, Rinnegan loé | ngước | khói tách 2 bên | trầm `l2p_sub` | Depressed / Pain gốc |
| A8 | Pain giơ tay: đá, cột đèn, mảng tường bị hút lên lơ lửng quanh người | toàn | vật bay lên (VẼ riêng) | rung, hút | tấm đá + mảng tường (VẼ) |
| A9 | Bắn liên tục: Chill Guy chạy, né trái, né phải, lăn — mỗi món sát hơn | tràng 3–4 góc ngắn | vệt vật bay, nổ bụi | mỗi cú 1 tiếng khác | Chill Guy gốc + chuyển động |
| A10 | NỬA TOÀ NHÀ đập trúng người → im lặng | toàn | nổ bụi khổng lồ, impact frame | cú nện + lặng hẳn | nửa toà nhà (VẼ riêng) |
| A11 | Khói tan: Chill Guy bước ra, hào quang NỘ đỏ, chữ "I'M NOT CHILL ANYMORE" | ngước | hào quang đỏ, khói bị thổi bạt | gầm nộ / giọng game | Chill Guy dạng nộ (ảnh game) |
| A12 | Lao thẳng về Depressed (vệt đỏ) → một bóng đứng chắn giữa: Gojo giơ tay ngăn | ngang, 3 con trong khung | vệt khựng, gió | khựng `se_impact_stop` | Mewing Cat (Gojo) gốc |
| A13 | Chill Guy tắt nộ, nhìn Gojo, GẬT ĐẦU, quay người chạy vào làn khói | cận 2 mặt → toàn | hào quang tắt | — | Chill Guy gốc |
| A14 | Gojo và Depressed đối mặt giữa khói (ngang tài) → cắt sang Bat Cat | ngang | gió, tro bay | nhạc vào | 2 ảnh gốc |

---
## [B] fin1c7 — Kết Part 1: hai phe tụ quân (~40s)
**Tóm tắt.** Sau cú đối đầu ngang tài, Gojo và Pain đứng 2 đầu thành phố tàn lụi. Từ khói bụi, quân 2 phe lần lượt bước ra đứng sau thủ lĩnh: bên Gojo là Buff Doge, Clapping, Berserk, Pop, Huh; bên Pain là Doorbell Chud, Mlem, Ninja, Bat. Bread Cat bước lên trước phe Gojo, bắt đầu XOAY nghịch lý bơ (đúng game) — xoay mạnh hơn bao giờ hết, không gian xung quanh nứt, thời không sụp vào 1 điểm → xé ra thành CỔNG thông đạo, phía sau là muôn vàn vũ trụ bong bóng. Từ cổng, meme đổ bộ xuống đông nghịt (đầy đủ trừ Catvader, Grumpy, Godly Memes và phe ác). Mặt đất rung: Chonky Dog và Gigachad bước ra KHỔNG LỒ, cao ngang nhà chọc trời; Doge to hơn meme thường. Phe Pain không vừa: Ninja Cat kết ấn → dấu ẤN TRIỆU HỒI khổng lồ cháy loang trên nền đổ nát → khói nổ tung, Evil Gary và Catvader bước ra cùng binh đoàn ác quỷ, đông không kém. Depressed giơ lên 1 MẢNH VỠ (mảnh linh hồn Friend) — mảnh loé tím — từ đường chân trời Friend quay lại, mỗi bước rung cả thành phố, tới đứng sau lưng Pain, to che kín một vùng trời. Màn hình chia đôi 2 phe — 2 thủ lĩnh cùng ngẩng lên — BÙM, trắng xoá. "TO BE CONTINUED…" → "FINAL · PART 2 — CHRISTMAS 2026".

| # | chuyện gì xảy ra → phản ứng | máy (tĩnh) | VFX / môi trường | tiếng | ảnh |
|---|---|---|---|---|---|
| B1 | Thành phố tàn lụi, Gojo trái – Pain phải, đứng 2 đầu | toàn rộng | tro bay, lửa âm ỉ | gió, nhạc lặng | nền thành phố tàn lụi (VẼ) |
| B2 | Quân 2 phe bước ra từ khói đứng sau thủ lĩnh (Doge, Clapping, Berserk, Pop, Huh · Chud, Mlem, Ninja, Bat) | 2 góc trung | khói tách | bước chân | ảnh gốc |
| B3 | Bread Cat bước lên, bắt đầu xoay nghịch lý bơ | trung | hiệu ứng xoay của game (đèn chớp, cột sáng) | `bc_spin` | ảnh xoay BC_SPIN (game) |
| B4 | Xoay mạnh hơn bao giờ hết → không gian nứt, thời không sụp vào 1 điểm (lặng) | cận → toàn | không gian nứt mảng, hút về điểm | rít to dần → LẶNG | — |
| B5 | Xé ra CỔNG thông đạo, phía sau muôn vàn vũ trụ bong bóng | ngước | cổng sáng, vũ trụ bong bóng | nổ sáng + nhạc BÙNG | — |
| B6 | Meme đổ bộ đông nghịt từ cổng xuống đường | toàn → vài góc nhanh | vệt rơi, bụi đáp | đáp đất nhiều lớp | ~40 avatar gốc |
| B7 | Đất rung: Chonky Dog + Gigachad bước ra KHỔNG LỒ (cao ngang nhà chọc trời) | giun ngước | bóng phủ, nhà rung | bước khổng lồ | ảnh gốc phóng to |
| B8 | Ninja kết ấn → dấu ẤN TRIỆU HỒI khổng lồ cháy loang trên nền | chim → cận tay | ấn chữ cháy, khói | kết ấn + "Kuchiyose" giọng thật? | Ninja gốc |
| B9 | Khói nổ: Evil Gary + Catvader + binh đoàn ác quỷ bước ra | toàn | khói đen, lửa đỏ | gầm ác quỷ | Evil Gary, Catvader gốc + quỷ (có sẵn ở phim cũ) |
| B10 | Depressed giơ MẢNH VỠ, mảnh loé tím | cận tay | ánh tím | ngân | Depressed gốc |
| B11 | Friend từ chân trời quay lại, mỗi bước rung thành phố, tới đứng sau lưng Pain che kín trời | toàn rộng → ngước | bóng che trời, trăng máu | bước khổng lồ, gầm `fr_titan_roar` | Friend (ảnh có sẵn) |
| B12 | CHIA ĐÔI MÀN HÌNH 2 phe, 2 thủ lĩnh ngẩng lên | chia đôi chéo | — | nhạc cao trào | — |
| B13 | BÙM — trắng xoá → "TO BE CONTINUED…" → "FINAL · PART 2 — CHRISTMAS 2026" | — | loé trắng, chữ | nổ + im | — |

---
## Tiếng / nhạc (anh chốt)
- [A] không nhạc nền tới A11; tiếng thành phố + đám đông. A11 bùng nhạc nộ ngắn; A14 nhạc dẫn sang Bat Cat.
- [B] đề xuất "Portals" (Avengers: Endgame, Alan Silvestri) cho cổng + đổ bộ — bản nhạc đúng nghĩa "quân tiếp viện từ cổng", lặng → bùng; phe ác chuyển tông tối ở B8.
- Giọng hô "Kuchiyose no Jutsu" — giọng thật (Itachi / Naruto gốc), em tìm link cho anh nghe chốt.

## Ảnh cần vẽ (GPT, chỉ nền + vật tương tác — meme dùng ảnh gốc)
- Nền: phố đổ nát có người chạy (không nhân vật) · thành phố tàn lụi toàn cảnh (2 đầu phố) · nền trời cho cổng.
- Vật riêng phông xanh: toà nhà nghiêng · chiếc xe · cột đèn · mảng tường · NỬA TOÀ NHÀ.

## ✅ ANH CHỐT (16/11)
1. Bread Cat HIỆN TRÊN TRỜI như các phần đầu (vị thần khổng lồ giữa trời), hiệu ứng xoay GIỐNG GAME hơn (nghịch lý bơ: xoay trục ngang, đèn chớp, cột sáng, mưa tia lửa) → thời không sụp → cổng.
2. KHÔNG có Evil Larry.
3. Adolf Catler, Stalin Cat → vào PHE GOJO.
4. Người chặn Chill Guy = Gojo.
5. Hàng đầu = các meme đang giao tranh (Doge, Clapping, Berserk, Pop, Huh); hàng sau = meme quan trọng (Adolf Catler, Stalin Cat, Duolingo, Violin Bee, …) rồi tới các meme còn lại.

## Em còn phân vân (anh chốt giúp để không sai cốt truyện) — ĐÃ CHỐT ở trên
1. **Godly Memes** theo Prologue là Supreme Cat · Bread Cat · Flower Cat (+ The Void). Bread Cat mở cổng ở đây → Bread Cat XUẤT HIỆN (dù là godly) đúng không anh? Holy Cat, Infinity Doge, Maxwell có tính là godly không?
2. **Phe ác** ngoài Friend / Evil Gary / Catvader / Meowkatsuki: Evil Larry có vào binh đoàn ác quỷ không? Hay để dành?
3. **Adolf Catler, Stalin Cat** (meme chính trị): em đề xuất KHÔNG cho vào cả 2 phe, anh đồng ý không?
4. Người đứng chắn Chill Guy ở A12 là **Gojo** (vì sau đó Gojo đối đầu Pain) — đúng ý anh không?
5. Meme đổ bộ: em lấy ~40 meme còn lại trong game (Nyan, Sus Cat, Cheems, Kermit, Saiyan Marmot, Boxing, Scared Hamster, Rick Roll, Trollface…) — anh muốn ai đứng hàng đầu?
