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
| T3 1/12 | Giant Friend vs Depressed Cat (Depressed thắng 200 máu, Shinra Tensei) | Loooong Cat vs Yuki (Loooong thắng 200) |
| T4 2/12 | LeSunshine vs Smart Guy (thắng ở dạng Mặt Trời, 41s) | Azel vs Scared Hamster (Hamster thắng 150) |
| T5 3/12 | Crunchy Cat vs Chill Guy (Chill Guy thắng còn 1 máu) | Friend vs Clapping Cat (Friend thắng 140) |
| T6 4/12 | Snooze Cat vs Fine Dog (Snooze thắng 113) | Adolf Catler vs Evil Larry (Adolf còn 1 máu đúng lúc nghi lễ xong) |
Chọn cặp bằng `render-match --sim 4` (đọc skill trước, bỏ cặp một chiều). Cặp đã thử mà BỎ: Sans vs Azel (Azel thắng 11s nguyên máu), Scream Cat vs Friend (Scream thắng y hệt mọi seed), LeSunshine vs Scared Dog (LeSunshine không mất máu), Azel vs Evil Larry (luôn hoà — nghi lễ giết cả 2), Azel vs Poor Dog / Adolf vs Poor Dog (Poor Dog thắng còn 300–600), Yuki vs Evil Larry (Yuki không gây dame khi Larry không đánh).
