---
name: edit-video
description: EDIT kiểu CapCut / AMV hiệu ứng nặng cho phim Meme Cinema (cine-kit) — impact frame 2 màu đặc, duotone, cháy trắng, đổi màu liên tục, tách RGB, zoom blur, chớp âm bản, vận lực đất nứt đá nổi, tiếng ra chiêu. Học sẵn từ 2 short anh gửi (16/11/2026) → dùng ngay K.edit.* không cần xem lại video. Cũng có công cụ HỌC VIDEO MẪU MỚI (chụp 30 khung/giây, cắt tiếng ra chiêu). Dùng khi anh bảo "edit cho chất / cháy / như capcut / như video này", hoặc làm cú quyết định của 1 trận.
---

# Edit video kiểu CapCut / AMV (học 16/11/2026)

Nguồn học: 2 short anh gửi — "When you win in UNO" (giây 30→60) và "When you win in UNO No Mercy" (giây 34→60), file gốc ở `D:\meme-anime-lab-videos\YTSave.to_Shorts_Media_*`.
Đã xem đủ 30 khung/giây đoạn edit. KHÔNG cần xem lại — mọi thủ thuật đã tóm ở dưới + đã có hàm dựng sẵn.

## 1. Ngữ pháp edit (rút từ 2 video)
- **CHẬM → BÙNG**: giữ 1–1.5s chậm (slow-mo lơ lửng, đẩy máy chậm, máy xoay nghiêng 90°/180°), rồi 0.3–0.6s bùng dồn dập (đổi mỗi 1–2 khung). Không bùng liên tục — mắt cần đoạn thở.
- **IMPACT FRAME 2 màu đặc**: bóng nhân vật 1 màu, nền 1 màu, đổi cặp mỗi 1–2 khung, cả tràng 6–12 khung. Cặp hay dùng: nền đỏ + bóng xanh · nền trắng + bóng đen · nền đen + bóng trắng · nền cam + bóng đen · xanh lơ / đỏ / đen 3 màu.
- **DUOTONE đơn sắc** (đỏ – đen là chủ đạo) cho cả 1 đoạn "thức tỉnh / dồn lực", 1–3s.
- **CHÁY TRẮNG dần** (exposure ramp ~0.5–1s, tia sáng toả) → giữ trắng tinh 3–4 khung → cắt sang cảnh mới.
- **TÁCH RGB mạnh rồi nhạt dần** ngay sau cú va (0.5–1.2s), thường kèm màu từ đỏ về trung tính.
- **ĐỔI MÀU LIÊN TỤC** quầng sáng / cột sáng / cả khung: mỗi màu ~3 khung (hồng → cam → xanh lá → xanh dương…).
- **ZOOM BLUR hướng tâm** 3–5 khung = chuyển cảnh "đường hầm"; **WHIP BLUR** ngang 3 khung = chuyển cảnh nhanh.
- **CHỚP ÂM BẢN** 1–2 khung đúng điểm chạm.
- **Mắt / vật loé + bloom**, **lens flare** trên vật quan trọng, **bóng đen giữa khói đỏ** với 1 điểm sáng.
- **Ngưỡng đen trắng (posterize)** mặt người 2–3 khung xen giữa đoạn màu.

## 2. Dùng trong phim (cine-kit) — `K.edit` (js/cine-kit.js)
`def.impact(t)` trả `{fg,bg}` → impact frame 2 màu. `def.grade(t)` trả object grade → áp lên cả khung (sau shader, trước screen). Retime (`W.retime`, c4 retime) tự chuyển giờ.
```js
impact:t=>{ const E=K.edit; return E.first(E.impacts(t,T.push,10,'red',2), E.impacts(t,T.fire,10,'purple',2)) || 0; },
grade:t=>{ const E=K.edit; return E.mix(
  E.duotone(t,T.cast,T.sh,'#300504','#ff4a30',0.3,0.85),   // dồn lực: đỏ – đen (str 0.6–0.85: còn thấy chi tiết; 1 = phủ kín)
  E.burn(t,T.sh+0.38,T.sh+0.9,0.13),                       // cháy trắng dần → giữ trắng 0.13s
  E.rgb(t,T.sh+1.03,1.0,18),                               // tách RGB 18px → 0
  E.cycle(t,T.dVoid,T.dIn,3,60),                           // đổi màu mỗi 3 khung, bước 60°
  E.zoom(t,T.fire+0.33,0.16,0.4),                          // đường hầm 0.16s
  E.invert(t,T.dVoid,2)); },                               // âm bản 2 khung
```
- Bảng màu impact: `K.edit.PAL.red / purple / blue` (hoặc truyền mảng `[[fg,bg],…]` riêng).
- 1 khung edit = 1/30s (`impacts(t,t0,n,…)`: n khung).
- Quy tắc: impact frame CHỈ ở 3–8 cú quyết định / trận; duotone ≤ 2 đoạn / trận; cháy trắng chỉ ở vụ nổ lớn nhất.

## 3. Vận lực trước khi lao (anh dặn 16/11: "vận lực vỡ đất đá như movie")
`W.powerUp(F,t,t0,t1,x,z,'r,g,b',seed,{r})` (js/fin1-fight.js): vết nứt toả từ chân (khe phát sáng màu riêng), đá vụn nổi lên lơ lửng xoay rồi bốc cao, bụi cuộn, tia khí. Sau t1 (lao đi) đá văng tung.
Đi kèm: góc THẤP RỘNG chếch xuống (pitch 12–16) thấy cả 2 con + mặt đất · duotone màu chiêu str 0.65–0.75 · tiếng `se_tremor` · rồi zoom blur 0.2s + impact frame lúc va.
Đã dùng: fin1f3 (Ninja vs Berserk trước nhát lướt qua nhau), fin1f1 (Doge vs Chud trước cú va cuối).

## 4. Tiếng ra chiêu (đã cắt sẵn, KHÔNG giọng người)
`ed_hit1…10` (assets/audio/*.wav, đã khai AUDIO_SAMPLES + SND_LUFS, tiền tố `ed` là tiếng dùng chung):
1 tụ lực → bùng cuối (đỉnh 1.29s) · 2 impact trầm (0.6s) · 3 tụ lực → nổ (1.3s) · 4 đập trầm ngay đầu · 5 impact bùng (0.24s) · 6 bùng sáng cháy trắng (0.36s) · 7 đập nặng (0.24s) · 8 va trầm (0.27s) · 9 tụ lực → nổ (1.0s) · 10 nổ trầm to (0.35s).
Tiếng "tụ lực" (1, 3, 9): đặt SỚM = mốc nổ − giây đỉnh. Dùng làm lớp '+' của cú chính (đỡ luật ≤ 9 tiếng / 10s).
⚠️ Cắt từ video có nhạc nền của người edit → có lẫn nhạc (bản quyền có thể dính). Thay được thì thay bằng tiếng sạch.

## 5. Học 1 video mẫu MỚI (Windows, không ffmpeg)
1. Anh tải video về `D:\meme-anime-lab-videos\` (yt-dlp hay lấy nhầm bản / chất lượng thấp — để anh tải). Chép vào `tools/x/_ref/` (gitignore).
2. Chụp 30 khung/giây: `tools/x/video-frames.html?src=tools/x/_ref/x.mp4&a=30&b=34&fps=30&w=80&rate=0.35` qua cdp (`evalsave <tên> window.__png`).
   ⚠️ Đừng TUA (`currentTime=`) trong trình duyệt ngầm để chụp — nó trả khung cũ (16/11 em tưởng video đứng yên → tải lại oan). Trang này PHÁT chậm và chụp từng khung trình chiếu.
   Mỗi lần chạy 1 đoạn 4s (1 trình duyệt / đoạn), chạy nền; đoạn lỗi thì chạy lại riêng.
3. Cắt tiếng: `tools/x/audio-hits.html?src=…&a=…&b=…&max=14&len=1.4` → `window.__list` (giây, độ bật, `voiceR` = tỉ lệ dải giọng) + `evalsave a_i window.__wav[i]` → WAV. Giữ cú `voiceR ≤ 0.25`.
4. Đo độ to: `tools/x/sfx-measure.html?keys=x.wav` → dòng SND_LUFS.
5. Ghi thủ thuật mới vào mục 1 + thêm hàm vào `K.edit` nếu cần — để lần sau không phải xem lại.

## 6. Soát
`film-check.js <id> --t <các giây của cú edit>` (tính giây mới qua bảng retime nếu phim có RETIME) — xem: impact frame có đọc ra hình nhân vật không, duotone có che mất chi tiết không (giảm str), cháy trắng có quá lâu không.

## 7. Gồng + slow-mo → lao (16/11, anh duyệt hướng) — MỖI TRẬN 1 KIỂU, không dùng chung 1 công thức
- Nhịp: ZOOM CHẬM vào nhân vật (shot giữ chuyển động: `W.cutify(...,{keep:[[a,b]]})`) → CÚ GIẬM / bùng lực (impact frame 4 khung + sóng chấn `K.ring` + đá văng + rung) → góc rộng vận lực → `K.shatter` không gian NỨT MẢNG → cận mắt / vũ khí → mảnh vỡ tung + zoom blur + 2 vệt lao → impact lúc va.
- Slow-mo bằng bảng `RETIME` (đoạn gồng ×2–3, cú lao ×0.55). Shotlist json phải dời theo bảng mới.
- `K.shatter(F,t,t0,t1,{cx,cy,col,mode:'out'|'in',out})` gọi trong def.screen — 'in' = mảnh bị HÚT vào (trọng lực), 'out' = toả ra. Bắt đầu SAU cú giậm, đừng chồng lên impact frame.
- Kiểu riêng đã làm: Berserk = giậm đất đỏ, lửa giận · Ninja = lông quạ đen xoáy · Doge / Chud = giậm vòng bụi vàng / đỏ + đất nứt đá nổi · Gojo = vòng gợn VÔ HẠN xanh · Pain = mảnh vụn bị HÚT xoáy về (trọng lực), không gian nứt mảng bị hút vào giữa. KHÔNG cho Gojo / Pain đất nứt đá nổi như kiếm sĩ.
- ⚠️ Trong cine-kit phải có TAU (16/11 thiếu TAU → K.shatter lỗi IM LẶNG, không hiện gì). Viết hàm mới xong phải chụp khung xem có hiện thật không.

## 8. THUẬT NGỮ SAKUGA + CÁCH DỰNG (anh giao học 16/11 — tóm từ video Howard Wimshurst "How to add IMPACT frames" + tra cứu; dùng làm checklist mỗi cảnh đánh)
- **Sakuga (作画)**: đoạn hoạt hoạ đột phá, mượt, chi tiết — dồn vào CAO TRÀO / chiêu quyết định, không rải đều. Trận 40s chỉ cần 2–3 khoảnh khắc sakuga, còn lại giữ nhịp gọn.
- **Action cut / fight choreography**: cả đoạn cắt cảnh = vũ đạo + góc máy + nhịp. Mỗi pha: lấy đà → ra đòn → chạm → phản ứng; giữ trục trái / phải; nhanh ở pha bùng, chậm ở tích tụ, giữ lại sau cú lớn.
- **Impact frame** (Howard Wimshurst):
  - HIẾM — chỉ cho cú nổ / đòn mạnh nhất. 1–3 khung, nhanh quá để mắt đọc → khán giả CẢM thấy chứ không thấy.
  - Tương phản TỐI ĐA: trắng – đen (ánh sáng chói quá mức máy quay ghi được). Màu chỉ thêm ở MÉP bằng 1 lớp ảnh màu nhoè phủ lên, vẫn giữ trắng / đen tuyệt đối.
  - Có 1 ĐIỂM VA CHẠM: mọi nét là đường THẲNG toả từ điểm đó, mô tả khối (vùng tối = bóng của khối + bóng đổ do nguồn sáng chói). Nét càng thẳng càng nhiều lực; gom nét thành mảng lớn; quầng (halo) quanh tâm; mảng nhấn khác nhau mỗi khung → nhấp nháy.
  - Trình tự chuẩn: nền TỐI DẦN lúc gồng → LOÉ chữ thập + glow dẫn vào → 3 khung impact: viền nét tối ở rìa CO DẦN = ánh sáng nở từ tâm → thoát ra bằng ĐỘ SÁNG đẩy cao rồi hạ dần (không cắt cụt từ trắng về thường).
  - ĐẾM KHUNG THẬT trong cảnh mẫu của tác giả (chụp 30 khung/giây, 16/11): phép tụ ở tay 5 khung → LOÉ sao 4 cánh 2 khung → impact 3 khung (a: nền trắng + nét đen thẳng toả từ điểm, dày ở rìa · b: nét co ra rìa · c: gần trắng tinh) → CHÁY SÁNG quá mức 4 khung hạ dần → cắt sang bên trúng đòn: ĐẢO MÀU 2 khung → sáng gắt 1 khung → vệt chém trắng lưỡi liềm + mảnh vụn văng. Mẫu nét toả: `zoneScreen` trong js/film-fin1c4.js.
  - LOÉ "chữ thập" = SAO 4 CÁNH NHỌN (anh sửa 16/11): mỗi cánh là tam giác dày ở tâm, thon nhọn ra mũi, cánh ngang dài hơn dọc, thêm 4 cánh chéo ngắn mảnh + quầng tâm. KHÔNG vẽ 2 thanh thẳng cắt ngang cả màn. Mẫu `star4()` trong js/film-fin1c4.js.
  - Cách nhanh: ĐẢO MÀU 1 khung tại điểm chạm + độ sáng ~144% rồi hạ dần (`K.edit.invert` + `burn` ngắn).
  - Tham khảo ánh sáng: hàn TIG / MIG, pháo hoa, light leak — vật phản xạ gần nguồn cũng cháy trắng bằng nguồn.
  - Cine-kit: `K.edit.impacts(t,t0,n,[[fg,bg]...],3)` (3–6 khung) đặt ĐÚNG khung chạm; trước đó làm tối nền; sau đó `burn` ngắn hạ dần. Đừng rải impact cho mọi cú (lint ÂM BẢN ≤ 1 lần / 8s).
- **Yutapon cubes** (Yutaka Nakamura, Sword of the Stranger): mảnh vỡ là KHỐI VUÔNG góc cạnh bay tứ tung. Mặt đất NỨT trước → lực đẩy các khối BẬT lên theo nón ~45° (sóng xung kích dội từ mặt đất); khối to bay chậm, khối nhỏ nhanh, xoay. Làm: tấm khối vẽ tay phông xanh (như `FIN_F1_ROCKS`) + code bắn theo nón.
- **Explosion FX**: nổ kiểu Anno: lửa phồng NHIỀU KHỐI CẦU rồi hoá khói · Kanada: khói TỐI trên nền sáng, quỹ đạo tròn + thẳng · Hashimoto: LỰC – ĐIỂM KỲ DỊ (mọi thứ dồn / toả từ 1 điểm) – CHẤT LIỆU · vài tia lửa nhỏ TRƯỚC vụ nổ lớn · bụi do sóng xung kích quét rất nhanh, bám sát đất.
- **Finisher / Hissatsu-waza (必殺技)**: chiêu tất sát — LẶNG + tích tụ → hô tên chiêu (giọng thật, chữ trên màn) → nổ có impact frame → giữ hậu quả 2–4s.
- Nguồn: Howard Wimshurst Animation (YouTube 6UaUi5fBmJc) · fullfrontal.moe (Kanada, Hashimoto) · animetudes.com (Masuo / Anno) · Wikipedia Yutaka Nakamura · realtimevfx.com (sóng xung kích 45°).
