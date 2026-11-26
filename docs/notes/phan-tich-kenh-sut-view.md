# Phân tích kênh @meme-autobattler sụt view (26/11/2026, vidIQ)

Kênh: Memes In The Multiverse (UCAALwa1JAm5MtT-PVXvSOfA), 24,6K sub. Số lấy qua vidIQ (Studio API + tiện ích vidIQ trên Chrome Mac).
So bằng **engaged view** (từ 27/08 YouTube đếm view từ khung đầu → view thường bị phồng).

## Sụt từ ngày nào
| Giai đoạn | Engaged view / ngày |
|---|---|
| 20–23/09 (trước khi lên) | 90–120K |
| đầu tháng 10 | 250–400K |
| **23–24/10 (đỉnh)** | ~930–940K |
| 25–27/10 | 620K → 440K (vẫn = mức giữa tháng 10) |
| 1–12/11 | trượt dần 285K → 117K |
| 13–18/11 | nhích 205–265K (Scared Hamster Lore 2 P0, Drooling vs Spider) |
| 19–23/11 | ~123K (≈ mức cuối tháng 9) |

Không rơi 1 bậc mà trượt dần 3 tuần. **Bật kiếm tiền 24/10** (doanh thu ghi từ ngày đó, $97 → ~$17/ngày) trùng đỉnh nhưng KHÔNG phải nguyên nhân — xem phần Viewed vs swiped.

## 14 ngày đỉnh (12–25/10) vs 14 ngày gần nhất (10–23/11)
- Feed Shorts 12,0M → 3,94M view (**−67%**) · trang kênh −50% · tìm kiếm −52% · người đăng ký chỉ −26%.
- Tỉ lệ xem trung bình 98% → 99,7%; engaged / view ~0,52 → 0,51 → ai xem vẫn xem hết.
- Mọi nước giảm đều ~60–65% (VN, US, ID, BR, PH, TH…) → feed đẩy ít đi chung, không thị trường nào bị cắt riêng.
- Trần video mới: đăng tháng 10 lên 0,7–2,3M (FRIEND vs Depressed Cat, Adolf Catler vs Mosquito, A Lotta Dame Guy vs Troll Face…); đăng tháng 11 cao nhất 469K.

## Viewed vs swiped away (Shorts feed, mỗi kỳ 28 ngày)
| | 28/09–26/10 | 27/10–24/11 |
|---|---|---|
| Ở lại xem | **71,2%** | **70,6%** |
| Lần hiện trong feed | 16,3M | 8,8M (**−46%**) |

Hit cũ giữ nguyên tỉ lệ (FRIEND vs Depressed Cat 78→74%, Adolf Catler vs Mosquito 72→72%, A Lotta Dame Guy 78→77%), chỉ hết đà tự nhiên.

**Video mới tháng 11 — tỉ lệ ở lại quyết định số lần hiện:**
| Ở lại xem | Video | Lần hiện |
|---|---|---|
| **≥72%** | Scared Hamster Lore 2 P0 **81%**, Poor Dog vs Clapping 77%, Scream vs Ricardo 76%, Azel vs Fine Dog 75%, Drooling vs Spider 74%, Loooong vs Scream 74%, Friend vs Evil Gary Lore 73%, Supreme vs Friend 73% | 160–300K |
| 64–68% | Violin Mosquito/Bumblebee ×5–6 trận (65–67%), Beluga vs Stalin 66%, Duolingo vs Beluga 66%, Snooze vs Beluga 64%, Crunchy vs Bat 64%, Gigachad vs Infinity Doge 65% | 35–80K |
| <60% | **Rise of Catvader (Lore 2 P3) 52%**, Ninja vs Jonin Cheems 57% | ~40K |

Adolf Catler & Stalin vs Evil Gary & Larry chỉ 64% dù toàn meme mạnh (đoán: 2vs2 dài 36s, mở chậm — chưa xem lại video).

## Kết luận
1. Đợt viral cuối tháng 10 hết đà tự nhiên; video mới tháng 11 giữ người xem kém hơn (meme yếu, lặp Violin, Lore mở chậm) nên không con nào được đẩy thay chỗ → tổng lần hiện trên feed giảm một nửa.
2. Bật kiếm tiền KHÔNG phải nguyên nhân: hit cũ giữ tỉ lệ ở lại, video mới ≥72% vẫn được hiện 200–300K lần sau 24/10. Không tắt kiếm tiền.
3. "Studio báo chỉ số tăng mà view giảm": người xem giờ chủ yếu là fan → like / xem hết trên mỗi view tăng, còn người lạ qua feed giảm.

## Việc nên làm
- **Chuẩn 72%**: 48 giờ sau khi đăng xem Viewed vs swiped away (Studio → video → Analytics → Tiếp cận). Ghép nào <68% thì không đăng lại kiểu đó.
- Mỗi ngày ≥1 video có meme mạnh (Scared Hamster, Depressed Cat, Friend, Adolf Catler, Azel, Evil Larry, A Lotta Dame Guy); ghép mạnh + mới thay vì yếu đấu yếu (Supreme vs Friend 250K, Supreme/Bread vs The Void 50K).
- Ngưng Violin Mosquito / Bumblebee vài tuần.
- Lore vào trận ngay giây đầu: so mở đầu Scared Hamster Lore 2 P0 (81%) với Rise of Catvader (52%).
- Đo lại sau 2 tuần (28 ngày vs 28 ngày, cùng cách đo).

## Cách đo lại (vidIQ trong Claude)
- `vidiq_channel_analytics` (day / traffic_sources / audience_geography / top_videos / revenue_report).
- `vidiq_channel_analytics_extended` report `shorts_stayed_to_watch` (startDate + endDate, `pageOffset` 50 cho trang 2) — cần Chrome đang mở, tiện ích vidIQ đăng nhập đúng tài khoản.
- Cả lần phân tích này tốn ~60 credit vidIQ.

## Ở lại xem trung bình theo meme (27/09–24/11, tính theo lần hiện)
Cao: A Lotta Dame Guy 79 · Troll Face 78 · Scared Hamster 77 · Poor Dog 76 · Friend 76 · Depressed Cat 74 · Yuki 74 · Ricardo 74 · Scared Dog 74 · Fine Dog 74 · Clapping Cat 73 · Chill Guy 73 · Evil Larry 73.
Giữa (70–72): Azel, Violin Mosquito, Gigachad, Evil Gary, Stalin, Adolf Catler (70 — kéo lần hiện nhiều nhưng tỉ lệ ở lại chỉ trung bình), Mewing, Duolingo.
Thấp (<68): Violin Bumblebee 68 · Doge 68 · Wet Cat 67 · Arabic 66 · Beluga 65 · Berserk 65 · Grumpy 63 · Ninja 63 · Catvader 60 · Jonin Cheems 60 · Bat Cat 59.
Chỉ là gợi ý: mỗi video có 2 meme, nhiều meme mới có 1–2 video.

## Lịch đăng (chốt 26/11, đã quay xong 10 trận → ~/Desktop/Meme Battles/)
Anh đã lên lịch sẵn tới 30/11; đổi 2 trận yếu: 27/11 Doge vs Angry Cat → **Angry Cat vs Troll Face** (anh chọn seed 2, Troll Face thắng) · 30/11 Snooze Cat vs Nyan Cat → **Cat.exe vs A Lotta Dame Guy** (Doge 3 video gần nhất 54–58%; Snooze + Nyan đều <66% và Nyan đã đăng 29/11).
| Ngày | 8:00 | 19:00 |
|---|---|---|
| T3 1/12 | Giant Friend vs Evil Gary (Giant Friend thắng còn 76 máu — anh muốn Giant Friend thắng, đổi đối thủ) | Loooong Cat vs Yuki (Loooong thắng 200) |
| T4 2/12 | LeSunshine vs Smart Guy (Ver 750: chỉ còn đập bóng HUSS, loé 8s/lần · lọc seed: crit IQ 200 (400) của Smart Guy ép LeSunshine hoá Mặt Trời → thắng ngược còn 2/3 mặt trời; `--inject` quan sát `_lbDamage` + `--dirok 'sun=dmg4..'`, ~1/13 trận) | Azel vs Scared Hamster (Hamster thắng 150) |
| T5 3/12 | Crunchy Cat vs Chill Guy (Chill Guy SONG PHI kết liễu, còn 1 máu — lọc seed bằng `--inject` quan sát + `--dirok 'cg=kick'`) | Friend vs Clapping Cat (Friend thắng 140) |
| T6 4/12 | ~~Snooze Cat vs Fine Dog~~ (anh BỎ 26/11) → Depressed Cat vs Troll Face (chưa quay) | Adolf Catler vs Evil Larry (Adolf còn 1 máu đúng lúc nghi lễ xong) |
Chọn cặp bằng `render-match --sim 4` (đọc skill trước, bỏ cặp một chiều). Cặp đã thử mà BỎ: Sans vs Azel (Azel thắng 11s nguyên máu), Scream Cat vs Friend (Scream thắng y hệt mọi seed), LeSunshine vs Scared Dog (LeSunshine không mất máu), Azel vs Evil Larry (luôn hoà — nghi lễ giết cả 2), Azel vs Poor Dog / Adolf vs Poor Dog (Poor Dog thắng còn 300–600), Giant Friend vs Gigachad / Spider Cat (Giant Friend thua cả 4), Yuki vs Evil Larry (Yuki không gây dame khi Larry không đánh).

### 📝 KẾ HOẠCH QUAY 10 TRẬN (lên 26/11 tối, CHƯA quay) — anh BỎ Snooze Cat vs Fine Dog (4/12 8:00)
Luật: trận tự nhiên (CHỈ lọc seed `render-match --win a|b`), ≤30s, thắng sát · sân ĐỐI MÀU cả 2 meme · luân phiên sân · vào thẳng lúc sắp chạm · `--sim 4` trước, một chiều thì đổi đối thủ.
⚖️ CÂN LEADERBOARD (anh 26/11): bảng 41 Short đã đăng + trận chờ đăng tới 4/12 → thua liền: Evil Larry 0-3 (4/12 thua tiếp Adolf → 0-4), Evil Gary 0-3, Yuki 0-1,
   Fine Dog / Morse / Infinity Doge 0-2 · trên cùng: Azel 3-3, Violin Bee 3-2, nhiều con 2-0. → cột THẮNG dưới đây chọn để kéo con thua nhiều lên.
| # | Ngày | Trận | THẮNG (lọc seed) | Sân | Ghi chú |
|---|---|---|---|---|---|
| 1 | 1/12 19:00 | Loooong Cat vs Yuki (QUAY LẠI) | **Yuki** (0-1 → 1-1) | Volcano | quay trước Ver 753 (cổng 4 góc, đầu rắn 50, ảnh toàn thân) · không ra seed Yuki thắng sát thì để Loooong |
| 2 | 2/12 8:00 | LeSunshine vs Smart Guy (QUAY LẠI) | **LeSunshine** (ngược dòng bằng Mặt Trời) | Space | Ver 750 → giờ có SLAM DUNK (766) · phải có crit IQ 200 + ≥1 cú slam dunk |
| 3 | 4/12 8:00 | Depressed Cat vs Troll Face (thay Snooze vs Fine Dog) | **Troll Face** (→ 2-1, Depressed 1-1) | Grass | 74% + 78% |
| 4 | 5/12 8:00 | Cat.exe vs Ricardo | **Ricardo** — Cat.exe gần thắng thì LAG RƠI XUỐNG VỰC (ý anh) | Volcano | lọc `_cx.fall` lúc Ricardo ≤ ~150 máu · Cat.exe xanh ✗ Space |
| 5 | 5/12 19:00 | Gigacat vs Friend | **Gigacat** (meme mới ra mắt, Friend 1-1 → 1-2) | Grass | phải thấy hoá khổng lồ + nhạc · Gigacat kem ✗ Beach, Friend đen ✗ Space/Volcano |
| 6 | 6/12 8:00 | Battle Cat vs A Lotta Dame Guy | Cat God 2% PHẢI xuất hiện; ưu tiên **A Lotta** sống sót ngoài lỗ (twist, A Lotta 0-1 → 1-1), không có thì Battle Cat | Space | ≈6% trận có Cat God → chạy nhiều seed · tiêu đề "2% chance" |
| 7 | 6/12 19:00 | Scared Hamster vs Duolingo | **Scared Hamster** (1-1 → 2-1; Duolingo 2-1 → 2-2) | Christmas | 77% + 71% · sân chưa dùng |
| 8 | 7/12 8:00 | **Evil Gary vs Scared Dog** | **Evil Gary** (0-3 → 1-3) | Grass | thay Adolf vs Scared Dog (Adolf đã thắng 4/12) |
| 9 | 7/12 19:00 | Evil Larry vs Poor Dog | **Evil Larry** (0-4 → 1-4) | Beach | Poor Dog hay thắng đậm → sim kỹ; không ra thì Evil Larry vs Ricardo |
| 10 | 8/12 8:00 | Azel vs Gigacat | **Azel** (Gigacat 1-0 → 1-1, không để meme mới toàn thắng) | Volcano | Gigacat kem nổi trên nền tối |
Dự phòng (kéo con 0-2 lên): Fine Dog vs Mewing Cat (Fine Dog thắng) · Infinity Doge vs Troll Face (Infinity thắng) · Morse Cat vs Duolingo (Morse thắng).

## VPN · đăng 1 hay 2 video/ngày · từ khoá (trả lời anh chiều 26/11, phiên Mac)
- **VPN: đừng tắt.** YouTube không chọn người xem theo IP người đăng; video hẹn giờ do máy chủ YouTube tự công bố. Tỉ lệ nước gần như giữ nguyên (VN ~14% → ~13%, US ~10% → ~9%).
  Anh nghi bật kiếm tiền (24/10) + VPN bị "để ý" → chưa xác nhận cũng chưa loại được. Bật thì dùng 1 nước CỐ ĐỊNH (vd luôn US).
  Cách thử (CHƯA chốt với anh): tuần 1/12–4/12 xen kẽ BẬT / TẮT VPN lúc TẢI LÊN (1/12: sáng bật, tối tắt · 2/12: sáng tắt, tối bật · 3/12 như 1/12 · 4/12 như 2/12),
  6/12 đo sau 48h: lượt hiện feed · ở lại xem · tỉ lệ view Mỹ (~10–15 credit vidIQ). Mỗi nhóm 4 video → phải chênh rõ mới kết luận.
- **Số video/ngày: giữ 2** khi đủ 2 trận tốt (sáng 8h vs tối 19h ngang nhau: từ 24/10 trung vị 89K vs 92K; tối có 8/30 video ≥200K, sáng 4/31). Thiếu trận tốt → đăng 1 video lúc 19h, đừng đăng trận yếu cho đủ.
  Đang thử VPN thì KHÔNG đổi số video / giờ đăng cùng lúc.
- **Từ khoá: chỉ ~1,3% view từ tìm kiếm** (10–23/11: 67K / ~5,1 triệu) → phần phụ. Người ta gõ TÊN MEME (evil larry 5.8K, gigachad 4.8K, ricardo milos 4.0K, sus 3.4K, azel 2.6K, "meme battle" 2.5K…).
  → Gọi meme đúng tên người ta gõ: **Mosquito Violin** (không "Violin Mosquito"), **UIA Cat** (không "U I A Cat"), **Commander Cat** (không "Commeowder").
  → Mô tả 1 dòng có tên 2 meme + hashtag riêng từng con (vd `#evillarry #adolfcatler #memes #memebattle #shorts`), bỏ `#autobattler`.
  → Từ khoá đang lên (ý tưởng meme mới): huss huss huss (~750K/tháng, đã gắn LeSunshine Ver 749) · crab rave ~350K · gta 6 meme ~306K · jensen huang meme ~211K · ahh almost almost ~188K · while they're out partying ~189K.
