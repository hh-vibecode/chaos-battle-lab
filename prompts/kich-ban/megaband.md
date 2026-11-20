# MEGALOVANIA — Meme Band in the Castle · kịch bản (chờ anh duyệt, 20/11/2026)

Video 16:9 · 2:58 · nhạc = `Megalovania mix v3.wav` (lưới 119.717 BPM, 1 vòng = 4 ô = 8.02s, 1 ô = 2.0s).
Phong cách: lâu đài gothic dưới trời giông, CHÁY + SẤM SÉT + MA MỊ (2 ảnh mẫu anh gửi: trăng lưỡi liềm cam đỏ + mây tím · trăng tròn xanh ngọc + tháp nhọn + gargoyle).
2 bảng màu đan nhau: XANH NGỌC lạnh (trăng, sương, ma mị — lúc vắng / chậm) ↔ TÍM ĐỎ cháy (trăng máu, lửa — lúc cả nhóm chơi).
Meme LUÔN là ảnh gốc (anh dặn): chuyển động bằng code (nhún theo phách, lắc, đổi khung có sẵn), VFX + cắt cảnh lo phần "cháy". GPT chỉ vẽ NỀN khung cảnh (không nhân vật).

## Tóm tắt
Đêm giông, mưa quất vào một toà lâu đài trên vách đá, trong đại sảnh tối om có tiếng piano lẻ loi vọng ra. Sét đánh thẳng xuống tháp — trong ánh chớp,
một bóng đen với con mắt xanh rực hiện ra trên ban công: Sans nâng kèn lên thổi những nốt đầu tiên của Megalovania. Tiếng kèn đánh thức cả lâu đài:
dưới hầm mộ Bongo Cat đập xuống trống, ngọn nến trong đại sảnh bùng lên và Piano Cat bắt đầu đánh đàn; sét đánh trúng đỉnh tháp, Electric Guitar Cat
đứng giữa mưa quẹt hợp âm đầu tiên. Khi đoạn riff lên tới căng nhất, mây tím rách ra để lộ vầng trăng máu — Violin Mosquito và Violin Bumblebee kéo
những nốt cuối từ cầu thang đá đổ nát. Cổng lâu đài nổ tung, sân trong biến thành sân khấu lửa, cả 6 con cùng chơi trong khi đám mèo meme bên dưới nhảy nhót.
Đèn tắt, mưa rơi lại, chỉ còn Sans trong vệt sáng trăng — rồi 2 violin solo trên đỉnh tháp giữa sét, Guitar Cat solo gọi sét xuống theo từng hợp âm.
Cả ban nhạc trở lại, lửa và tia Gaster Blaster bắn lên trời theo nhịp; nốt cuối cùng, một tia sét khổng lồ đánh xuống cả lâu đài, trắng xoá —
rồi chỉ còn mưa và lâu đài lặng im dưới trăng.

## Chuyển động lúc chơi nhạc mà KHÔNG phá nguyên tác (anh dặn 20/11)
- CHỈ luân phiên các khung GỐC có sẵn, đúng phách / đúng nốt: Guitar 11 khung `EG_LOOP` (mỗi nốt 1 khung, nhịp đều) · Bee 6 khung `VB_FR` · Bongo 4 ảnh (tay trái / phải
  xuống đúng phách lẻ / chẵn) · Sans 3 khung `SX_PLAY` (kéo / đẩy ống trượt theo nốt) · Piano 2 ảnh (avatar ↔ attack = 2 vị trí tay) · Mosquito 4 ảnh.
- Code chỉ thêm chuyển động CẢ KHỐI trên ảnh gốc: nhún / dẹt nhẹ theo phách (≤4%), gật / lắc 2–4°, nghiêng người vào cú nhấn, thở khi nghỉ, đung đưa theo câu nhạc.
  Không bóp méo mặt, không vẽ lại tay chân, không ghép bộ phận. Đám mèo dưới sân khấu cũng vậy (Pop Cat đổi 2 ảnh gốc há / ngậm, U I A / Maxwell xoay đúng kiểu meme).
- ÍT LỖI + TỰ NHIÊN NHẤT (anh dặn 20/11):
  · Đổi khung chỉ giữa các khung CÙNG khổ / cùng tâm thân (VB_FR, EG_LOOP đã chuẩn); khung lệch thì neo theo chân + thân, soát từng cặp khung không nhảy vị trí.
  · Đổi khung ĐÚNG lúc nốt đánh (theo onset thật của bản nhạc đó), không đổi giữa nốt; nhún dùng đường cong mềm (lên nhanh, về chậm), không giật cứng.
  · Biên độ nhỏ: thà ít mà thật. Mỗi con 1 kiểu chuyển động đúng chất meme (Keyboard Cat lắc lư áo xanh, Bongo gõ dứt khoát, Guitar headbang, ong bay lơ lửng).
  · Hoà vào cảnh: nhuộm theo ánh môi trường (xanh ngọc / đỏ lửa), viền sáng từ trăng / lửa, bóng đổ + sương / khói phủ chân, không mép cắt thẳng.
    Ảnh thật (Keyboard Cat, Guitar, Mosquito, Bee) + ảnh hoạt hình (Sans, Bongo) đứng chung → cùng 1 lớp màu + viền sáng để không lệch tông.
  · Piano Cat: ảnh gốc có cả bàn phím + nền xanh dưới chân → tách nền giữ nguyên bàn phím, đặt bàn phím lên bệ đá (khói che mép).
  · Soát cận mọi chỗ ghép trước khi báo (luật soát phim).
- Muốn chuyển động thật hơn cho con nào có VIDEO gốc (Keyboard Cat, Bongo Cat…) → anh gửi video → `video-sang-sprite` (Mac) tách khung thật, không vẽ.

## Mỗi con 1 "chữ ký" (bám skill trong game + nguồn gốc meme)
- **Sans** (ảnh `SX_PLAY_0..2` thổi kèn + `SX_PIXEL`): mắt trái loé XANH lúc ra mắt; Gaster Blaster bắn tia trắng lên trời ở các cú nhấn tutti (1 lần / cao trào, không spam).
- **Bongo Cat** (4 ảnh gốc gõ tay trái / phải): mỗi phách 1 VÒNG SÓNG ÂM xám đen toả ra (đúng game), nến hầm mộ rung rinh theo trống.
- **Piano Cat** (Keyboard Cat, ảnh thật áo xanh + bàn phím): NỐT NHẠC màu theo cao độ bay ra từ phím (đúng game).
- **Electric Guitar Cat** (11 ảnh loop `EG_LOOP`, mỗi nốt sang 1 ảnh, nhịp ĐỀU — anh chốt Ver 464): SÓNG ÂM màu theo nốt; solo = sét đánh xuống đàn.
- **Violin Mosquito** (ảnh thật): sợi DÂY sáng mảnh nối từ vĩ cầm ra (dây của skill game) rung theo nốt.
- **Violin Bumblebee** (6 khung kéo đàn `VB_FR`): đàn ONG CON bay vòng quanh trăng, mỗi phách thêm 1 con (đúng game).
- ĐÁM ĐÔNG dưới sân khấu = MỌI meme mèo + chó trong game (anh 20/11: "con nào là mèo chó meme cho hết vô") — 61 con, trừ 3 con trong ban nhạc
  (danh sách: CHAR_DEFS có Cat / Dog / Doge / Cheems / Maxwell / Yuki…; loadingcat dùng avatar_v2, arabiccat chưa có ảnh → bỏ tới khi có).
  Ảnh gốc, nhún / xoay đúng kiểu meme theo phách (Pop Cat há mồm, U I A / Maxwell xoay, Damdam Didi lắc đầu, Clapping vỗ tay, Nyan bay ngang 1 lần…).
  · Đứng LẪN LỘN mèo + chó (xen kẽ), các hàng sâu dần, KHÔNG con nào đè lên con nào (xếp theo khung bao, chừa khe).
  · KHÔNG LỘ PNG (anh dặn): làm mịn mép alpha 1–2px; hàng sau NGƯỢC SÁNG lửa sân khấu → gần như bóng đen viền sáng đỏ cam; xa dần nhạt màu (phối cảnh không khí);
    sương / khói mỏng xen giữa các hàng; khói phủ chân; tàn lửa bay ở tiền cảnh; cả đám nhuộm chung ánh lửa với sân khấu.

## Nhịp (mốc = giây trong bài; mỗi khối ghi shot chính — cắt theo ô nhịp 2s, nhanh hơn ở tutti)
| # | giờ | chuyện gì xảy ra | máy / khung | VFX / môi trường | tiếng (ngoài nhạc) |
|---|---|---|---|---|---|
| 1 | 0:00–0:12.5 | Đêm giông. Lâu đài trên vách đá dưới trăng tròn XANH NGỌC, mưa xiên. Ánh nến 1 ô cửa sổ trong đại sảnh, tiếng piano lẻ loi vọng ra. Máy trôi chậm lại gần → qua cửa sổ thấy sảnh tối, nến lay. | toàn cảnh xa góc thấp (6s) → trung cảnh cửa sổ (4s) → cận ngọn nến (2.5s) | mưa xiên, sương, chớp xa không tiếng ở 0:05, tàn mưa đập bậu cửa | mưa nền (có sẵn trong mix) |
| 2 | 0:12.5 | SÉT đánh thẳng xuống tháp — trắng xoá 2 khung → bóng đen trên ban công, 1 mắt XANH loé → Sans hiện màu, nâng kèn thổi nốt đầu. | cận bóng đen góc ngước → trung cảnh Sans lệch 1/3 trái, máy đẩy chậm | sét (có tia nhánh), impact trắng 2 khung, mắt xanh loé + vệt sáng | sấm (trong mix, đúng phách 0) |
| 3 | 0:12.5–0:20.5 | Sans thổi kèn trên ban công, kính màu sau lưng, gió hất mưa. Cuối vòng Sans nhìn xuống — tiếng kèn vọng vào lâu đài. | 4 shot / ô: trung → cận kèn → toàn ban công → cận mặt Sans | sương bay, mưa, kính màu hắt ánh | — |
| 4 | 0:20.5 | MÀN HÌNH CHIA 3 Ô: Sans trượt sang ô trái; ô giữa mở = HẦM MỘ (Bongo đập trống, nến bùng); ô phải mở = ĐẠI SẢNH (nến bùng sáng lần lượt, Piano Cat đánh đàn). | khung chia chéo (cine-kit `panels`), mỗi ô 1 máy riêng trôi nhẹ; viền ô = vệt sáng mảnh | vòng sóng âm Bongo mỗi phách, nốt nhạc màu bay từ phím Piano, nến bùng dần | — |
| 5 | 0:28.5 | Ô thứ 4 rạch ra theo 1 tia SÉT đánh trúng đỉnh tháp: Guitar Cat giữa mưa quẹt hợp âm, sét bám thân đàn. | 4 ô (sét = đường chia ô mới) | sét bám đàn 1 lần lúc vào, sóng âm màu theo nốt | — |
| 6 | 0:36.6–0:44.6 | Dồn lên: cắt nhanh lần lượt từng ô phóng to (mỗi con 1 ô nhịp, 2s), mây tím cuộn nhanh, gió mạnh, trăng bị mây che dần. | mỗi ô nhịp 1 con toàn khung, cận dần | mây cuộn tăng tốc, chớp xa nhiều hơn | — |
| 7 | 0:44.6 | Đỉnh riff: mây TÍM RÁCH, lộ TRĂNG LƯỠI LIỀM ĐỎ (ảnh mẫu 1). Cầu thang đá đổ nát có vệt đỏ chảy: Violin Mosquito + Violin Bumblebee kéo nốt cuối. Thêm 2 ô → 6 ô (lưới 3×2). | toàn cảnh cầu thang góc thấp → 6 ô | trăng đổi xanh → đỏ, dây sáng Mosquito, ong con quanh trăng | — |
| 8 | 0:52.6 | 6 Ô VỠ NHƯ KÍNH → SÂN KHẤU trong NHÀ THỜ ĐỔ NÁT của lâu đài (bố cục theo ảnh mẫu anh gửi 20/11, làm GỌN hơn): cửa kính màu lớn giữa (viền neon xanh / đỏ), trăng máu + dơi qua vòm hở, sân khấu tròn nhiều bậc, 2 gargoyle trên bệ 2 bên, 2 loa. 6 con đứng cao thấp khác nhau (Sans bệ cao giữa, kính màu làm hào quang sau đầu). Đám mèo chó dưới sàn trước. | toàn cảnh đối xứng góc thấp → cẩu máy lên | vòng ký tự sáng dưới sàn, gargoyle phun lửa ở cú nhấn, cột lửa hàng trước, sương thấp, tàn lửa | kính vỡ (1 lớp) |
| 9 | 0:52.6–1:24.7 | TUTTI 4 vòng: mỗi ô nhịp cắt 1 góc (toàn sân khấu / cận từng con theo câu nhạc nó đang nổi / đám đông nhảy / qua vai Sans nhìn đám đông). Cuối mỗi vòng 1 cú nhấn: Gaster Blaster bắn tia lên trời (vòng 2), Nyan Cat bay ngang (vòng 3), cột lửa đôi (vòng 4). | ≥3 cỡ cảnh / 10s, nghiêng máy, lệch 1/3 | lửa, khói, tàn lửa; chỉ 1 cú VFX lớn / vòng | — |
| 10 | 1:24.7 | PHẦN 2 — đèn + lửa tắt phụt, mưa rơi lại, trăng về XANH. Chỉ Sans trong vệt sáng trăng, mắt xanh nhấp nháy. | cận Sans góc ngước, đẩy rất chậm | khói lửa tàn bay, mưa, vệt sáng trăng xuyên sương | — |
| 11 | 1:32.7 | SOLO 2 VIOLIN trên đỉnh tháp cao nhất, mây tím + trăng đỏ: 2 con đối nhau (Mosquito trái, Bee phải) kéo đàn đối đáp; sét nhánh đánh quanh ở các nốt nhấn. | xoay quanh 2 con (cắt góc mỗi ô), cận vĩ, toàn tháp | sét nhánh ≤1 / ô nhịp, dây sáng, đàn ong xoáy quanh trăng | — |
| 12 | 1:48.7 | SOLO GUITAR trên mép tháp: mỗi hợp âm mạnh 1 tia sét đánh xuống đàn (chỉ các cú nhấn, ~4 lần / 16s), sóng âm màu quét mưa bạt ra. | góc ngước cực thấp, cận tay đàn, toàn tháp giữa sét | sét đánh xuống đàn + impact trắng 1 khung, mưa bị sóng âm thổi bạt | — |
| 13 | 2:04.8 | Cả ban nhạc trở lại sân khấu — lửa bùng lại mạnh hơn, trăng máu to hơn. TUTTI 4 vòng như #9 nhưng cắt nhanh hơn; cú nhấn mỗi vòng: tia Blaster, nốt piano bùng thành pháo hoa nốt, vòng sóng Bongo lớn thổi bay khói, dây Mosquito + ong cùng loé. | cắt dày hơn, máy lia theo nhịp | như #9 | — |
| 14 | 2:36.8 | KẾT riff: mỗi ô nhịp 1 con cận mặt (6 con) rồi toàn cảnh. | cận lần lượt → toàn | lửa cao dần | — |
| 15 | 2:52.9 | Nốt kết: cả 6 con cùng nhấn — TIA SÉT KHỔNG LỒ đánh xuống cả lâu đài, trắng xoá. | toàn cảnh rộng | sét + trắng xoá + sóng méo | sấm (trong mix) |
| 16 | 2:53–2:57.4 | Trắng tan → lâu đài lặng dưới trăng xanh, mưa nhẹ, khói lửa tàn bay; chữ MEGALOVANIA mờ dần. | toàn cảnh xa (như #1), lùi máy | mưa, sương | — |

## Tiếng
- Nhạc = bản mix (đã có mưa intro + sấm ở 0:12.5 và nốt kết). Không lồng giọng, không thoại. Chữ trên màn hình chỉ: tên từng con khi vào (1 dòng nhỏ, tiếng Anh) + tiêu đề cuối.
- Tiếng thêm (ít): cổng nổ 0:52.6 (trầm + đá đổ) · sét đánh đàn ở solo guitar (1 lớp giòn ngắn, NGẮT ngay, nhỏ dưới nhạc) — tiếng chung có sẵn, không mượn tiếng signature của meme khác.

## Ảnh cần vẽ — GPT CHỈ VẼ KIẾN TRÚC / ĐÁ (luật repo + anh nhắc 20/11: "ảnh nền thôi, mây mưa sét, ánh đèn, trăng, vfx m xử lý")
Nét anime vẽ tay phẳng 2–3 tông, "NOT AI art", không nhân vật. TRỜI = nền xanh lá phẳng #00FF00 (tách ra); không trăng, mây, mưa, sương, sét; cửa sổ TỐI, nến KHÔNG cháy.
1. Lâu đài trên vách đá (toàn cảnh) · 2. Ban công lâu đài + kính màu tối (Sans) · 3. Hầm mộ, giá nến chưa thắp + xích (Bongo) · 4. Đại sảnh, giá nến + ống đàn organ (Piano)
5. Đỉnh tháp có lỗ châu mai (Guitar) · 6. Cầu thang đá đổ nát (2 violin) · 7. Sân trong = sân khấu đá nhiều tầng + cổng lớn (tutti) · 8. Đỉnh tháp cao nhất (solo violin)
Vật rời (phông xanh): 2 cánh cổng lâu đài (để nổ tung), mảnh đá vỡ.
CODE lo hết: trời (dải màu đêm), TRĂNG (xanh ngọc tròn ↔ đỏ lưỡi liềm, quầng sáng), MÂY cuộn, MƯA xiên, SƯƠNG, SÉT, ÁNH ĐÈN cửa sổ, LỬA NẾN, cột lửa, khói,
tàn lửa, sóng âm, nốt nhạc, dây sáng, ong con, tia Blaster. Blender chỉ khi cổng nổ cần mảnh vỡ vật lý.

## Em còn phân vân
- Cầu thang của 2 violin + đỉnh tháp solo: em định dùng chung 1 khung trăng đỏ (đổi góc) cho đỡ ảnh — được không?
- Đám mèo nhảy: 8 con em liệt kê ở trên — anh muốn thêm / bớt con nào?
