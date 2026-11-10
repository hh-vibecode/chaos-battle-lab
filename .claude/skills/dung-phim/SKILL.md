---
name: dung-phim
description: Quy trình DỰNG PHIM anime / cảnh combat cho Meme Cinema bằng bộ khung chung CINE-KIT (js/cine-kit.js, góc máy 2.5D bay vòng, góc cao chéo, khói, vệt chém, hào quang, impact frame) — kịch bản → bảng phân cảnh anh duyệt → câu lệnh ChatGPT vẽ khung chính → dựng từng shot → xem thử → xuất. Dùng khi anh yêu cầu phim / cảnh đánh mới.
---

# Dựng phim bằng CINE-KIT

📚 **THƯ VIỆN CẢNH MẪU** (9/11/2026): repo riêng `hh-vibecode/meme-anime-lab`, thư mục `../meme-anime-lab` (cạnh chaos-battle-lab trong `0.van-phong-ao`).
Anh nạp clip anime → bảng cảnh + luật đạo diễn + công thức code ở `meme-anime-lab/playbook/`. TRƯỚC KHI lên bảng phân cảnh phim mới: `git pull` repo đó rồi đọc `playbook/`.
🔧 Công cụ ngoài anh gửi (Blender / Unity add-on…) = THAM KHẢO rồi TỰ DỰNG LẠI trong cine-kit, không cài vào quy trình (anh chốt 9/11). Đang chờ: bộ góc máy làm sẵn `CineKit.cam.*`.

Đọc trước: `CLAUDE.md` (tỉ lệ cỡ nhân vật, phân việc ảnh — ảnh nhân vật do ANH vẽ ChatGPT, Claude chỉ làm chuyển động + VFX bằng code),
bộ nhớ: mỗi nhịp 1 hành động có lý do, không VFX nứt đất, mỗi nhịp 1 tiếng, skill của meme phải giống trong game.
Mẫu đầy đủ: `js/film-dvc.js` (Buff Doge vs Samurai Cheems, ~7.6s) — copy file này rồi sửa.

## ⚔️ MẸO CẢNH COMBAT (học từ phim người que đánh nhau — Animator vs Animation, Xiao Xiao; anh dặn 3/11/2026 ÁP CHO MỌI CẢNH ĐÁNH)
Cảnh đánh nào cũng phải có đủ các mẹo dưới đây — đây là thứ làm đòn "có lực", thiếu là trông đều đều, nhạt:
1. **Lấy đà (anticipation)**: trước mỗi cú lao/đấm, LÙI ngược hướng 2–4 khung (~0.1–0.15s) rồi mới bung ra. Mẫu: hàm `dash()` trong `js/film-mvd.js`
   (35% đầu lùi 18 đơn vị, 65% sau `ein` lao tới).
2. **Khung nhoè (smear)**: chỉ bật `smear` ở đoạn NHANH NHẤT của cú lao (1–3 khung), không nhoè suốt.
3. **Khựng khi trúng đòn (hit-stop)** — quan trọng nhất: đúng khung chạm, NHÂN VẬT + vật thể ĐỨNG HÌNH 0.1–0.16s, còn hiệu ứng / máy quay / rung vẫn chạy;
   kèm khung impact (`impact()` 'inv'/'bw'/'red'), loé trắng, rung, sóng méo. Mẫu: mảng `HSTOP` + hàm `hs(t)` trong film-mvd.js, gọi `mew(hs(t))`.
4. **Đà sau đòn (follow-through)**: đánh xong / bị đẩy lùi thì VƯỢT quá điểm dừng rồi mới về (`backOut`), không dừng phắt.
5. **Nhịp không đều**: chậm → chậm → cực nhanh → khựng. Không để mọi động tác cùng tốc độ.
6. **Biên đạo rõ**: mỗi pha có tấn công → đỡ/né → phản đòn; 2 bên luân phiên chiếm ưu thế (trận ngang sức thì cuối cùng hoà).
7. **Hiệu ứng ít mà đúng chỗ**: vệt, bụi, tia lửa, chữ tượng thanh ĐÚNG khung chạm; máy lia theo đòn, zoom nhẹ lúc trúng.
8. **Tiếng khớp từng khung**: vút lúc vung (đầu đoạn nhanh), bốp đúng khung chạm, không lệch.
9. **Tư thế = ảnh riêng (cách 1, anh chốt)**: mỗi nhân vật cần bộ ảnh THỦ THẾ / LẤY ĐÀ / RA ĐÒN / TRÚNG ĐÒN / NÉ (anh vẽ ChatGPT), đổi ảnh theo nhịp đòn
   — mẫu lệnh 10 tư thế ở cuối file này. Lệnh vẽ LUÔN ghi "real cat anatomy, round cat paws with paw pads, no human hands/fingers" + hướng mặt cố định (con trái nhìn PHẢI, con phải nhìn TRÁI).
10. **Khung dọc 9:16 hẹp**: 2 nhân vật cách nhau ~400 đơn vị thì máy cần dist ≳ 900 mới lọt cả 2 — soi khung trước khi báo xong.
11. **KHÔNG bó vào khung giữa** (anh chê 3/11): đặt nhân vật lệch 1/3 khung (`ox` ±0.08–0.14), nghiêng máy (`roll`), đổi phía máy theo từng đòn, máy bám theo vật đang bay.
12. **Cắt dày, chiêu ra NHANH**: mỗi shot 0.25–1s ở đoạn cao trào; gồng chiêu ≤0.5s, cắt xen 2 bên (gồng A → gồng B → bắn A → bắn B → toàn cảnh va nhau); tránh vật bay chậm 2–3s.
13. **CHIA KHUNG CHÉO** (`def.panels(t)` trong cine-kit: mỗi ô 1 máy riêng, `clip` đa giác tỉ lệ khung) cho 2 việc xảy ra cùng lúc:
    2 con biến hình đồng thời, 2 con bị hất văng mỗi con nửa khung (máy bám theo con đó) → rồi MỞ RA toàn cảnh rộng. Kẻ đường chéo trắng-đen ở `screen()`. Mẫu: `panels()` + `splitLine()` trong js/film-mvd.js.
14. **Chưởng phải có lực + MÔI TRƯỜNG CHỊU ẢNH HƯỞNG** (anh dặn 3/11): ánh chưởng hắt màu xuống nền (`glow`), vết cháy xém tối tồn tại lâu (`scorch` — KHÔNG vẽ vết nứt đất),
    tảng đá sàn bật tung (`slabs`), mưa bị sóng xung kích thổi bạt / bị đẩy ra (Shinra) (`BLASTS` trong screen), bụi + hạt sáng bị HÚT vào lúc gồng (`suck`),
    mây bị vụ nổ cuối thổi tung, trời quang ra; chưởng to + có vệt đuôi; rung + sóng méo + loé ở cả lúc BẮN chứ không chỉ lúc trúng. Mẫu: js/film-mvd.js.

## 🎥 TƯ DUY ĐẠO DIỄN cho cảnh ĐỨNG / HỘI THOẠI / RA MẮT NHÓM (anh chê 5/11: "đứng 1 hàng chán, tư duy đơn giản" — gửi ảnh mẫu Akatsuki)
Cảnh không đánh nhau vẫn phải có ý đồ máy quay. Trước khi code, viết ra cho từng shot: GÓC (thấp / cao / ngang), CỠ (toàn / trung / cận / đặc tả), AI Ở TIỀN CẢNH.
1. **Không bao giờ xếp nhân vật thành 1 hàng ngang cùng độ cao.** Mỗi người 1 độ cao + 1 tư thế: đứng trên bệ/cột, ngồi trên gờ, ngồi xổm,
   tựa cột; thủ lĩnh ở chỗ CAO NHẤT, giữa khung.
2. **3 lớp cảnh**: tiền cảnh (1 nhân vật / gờ tường sát máy, to, tối), trung cảnh (nhóm chính), hậu cảnh (trăng, thành phố). Lớp sau trôi chậm hơn → chiều sâu.
3. **Góc thấp ngước lên** cho nhóm phản diện / ra mắt: đường chân trời thấp, trăng to làm hào quang SAU ĐẦU thủ lĩnh, viền sáng (rim light) đỏ.
4. **Mỗi câu thoại = 1 góc máy riêng**: thiết lập toàn cảnh (cẩu máy lên) → trung cảnh người nói → qua vai người nghe → góc ngước người khác phản ứng
   → cận / đặc tả mắt ở câu then chốt → kéo lùi toàn cảnh ở câu chốt. Cắt cứng giữa các shot, trong shot máy luôn trôi nhẹ (đẩy vào / lia).
5. **Không để ảnh tĩnh nguyên tấm** (anh dặn): nhân vật lúc nói chuyện phải có chuyển động — thở, áo / băng đầu bay trong gió, cựa đầu.
   Cách: tách lớp từng nhân vật để nhún / nghiêng riêng, hoặc xin anh sprite sheet ChatGPT (ảnh động loop nhiều khung).
6. **Giấu danh tính đúng lúc**: bóng đen viền đỏ, tên "UNKNOWN …" khi chưa ra mắt; lộ màu đúng nhịp nhạc / tiếng (vine boom).
7. Mỗi nhân vật 1 khung riêng khi giới thiệu (ảnh tách riêng từng con), ảnh nhóm chỉ để khung chốt cuối.
Anh gửi ảnh / clip mẫu → phân tích bố cục (góc, lớp, độ cao, nguồn sáng) rồi GHI THÊM luật vào mục này.

## ✅ TỰ SOÁT TRƯỚC KHI BÁO XONG — BẮT BUỘC (anh dặn 5/11: "làm nhiều phim rồi, phải tự rút ra, không cần anh sửa")
Dựng xong 1 cảnh / 1 bản: chụp BẢNG KHUNG (≥1 khung / 1.5s, mỗi shot ≥2 khung) → đọc kỹ → chấm TỪNG dòng dưới đây → sửa hết → chụp lại → mới báo.
Mỗi dòng là 1 lần anh đã phải chê. Báo anh thì ghi rõ dòng nào chưa đạt và vì sao (vd chờ ảnh).
**Bố cục / máy quay**
- [ ] Không shot nào bó giữa khung đều đều; có lệch 1/3, nghiêng máy, đổi phía (mvd 3/11).
- [ ] Không nhân vật nào đứng thành 1 hàng cùng độ cao; có tiền – trung – hậu cảnh (fin1 5/11).
- [ ] Mỗi ~10s có ≥3 cỡ cảnh khác nhau (toàn / trung / cận / đặc tả); không shot tĩnh > 3s.
- [ ] Đối thoại: mỗi câu 1 góc máy; người nói rõ là ai (fin1 5/11).
- [ ] Mặt / đầu nhân vật chính KHÔNG bị cắt khỏi khung, không bị letterbox / phụ đề che (fin1: Friend lọt khung trên, Banana Cat lọt mép dưới).
- [ ] Khung dọc / ngang: nhân vật 2 bên mép không bị cắt nửa người.
**Chuyển động**
- [ ] Không ảnh tĩnh nguyên tấm đứng im: luôn có thở / nhún / gió / máy trôi (fin1 5/11).
- [ ] Combat đủ 14 mẹo ở trên (lấy đà, hit-stop, follow-through, nhịp không đều…); chiêu ra NHANH, gồng ≤0.5s (mvd 3/11).
- [ ] Đòn có lực VÀ môi trường phản ứng (bụi, cháy xém, mưa bị thổi…) (mvd 3/11).
**Hình / ghép nối**
- [ ] Soi CHỖ NỐI: cánh tay ↔ bàn tay, vật ↔ bóng tối, ảnh cắt ↔ nền — không mép cắt thẳng, không "dán vào" (Prologue 2/11).
- [ ] Tỉ lệ to / nhỏ đúng (vật khổng lồ vs meme) ở mọi góc máy.
- [ ] Ảnh pixel (Friend) giữ nét điểm ảnh, không nhoè; ảnh nhỏ phóng to phải làm sắc (Prologue).
- [ ] Không rối mắt: bớt chi tiết thừa khi cảnh đã nhiều thứ (Prologue: bỏ xúc tu phụ).
**Chữ / tiếng**
- [ ] Chữ trên màn hình CHỈ tiếng Anh — KHÔNG chữ Hán / Nhật (tiếng Nhật chỉ là GIỌNG đọc tên chiêu) (fin1c4 9/11: lỡ để 領域展開 / 無量空処, anh chê).
- [ ] Chữ không tràn khung, không bị vật khác che sai chỗ; font hợp thể loại (fin1: MEOWKATSUKI tràn, anh đòi font anime).
- [ ] Mỗi nhịp chính 1 tiếng, không chồng tiếng; nhạc nền không lấn giọng (Prologue 4/11).
- [ ] 🔊 **`tools/x/sfx-lint.js <idTập>` ra 0 lỗi** (chạy được cả PC lẫn Mac, không cần nghe) — BẮT BUỘC trước khi báo (anh chê fin1 10/11: giọng "Shinra Tensei" dùng 3 lần
      cho 1 chiêu, tiếng rơi gắn chỗ không có gì rơi, mượn tiếng Friend / Samurai cho Gojo–Pain, nhạc Akatsuki 8s xếp cho cảnh 32s nên tắt giữa chừng).
      Phim mới phải khai `cast:[tiền tố tiếng của nhân vật có mặt]` và mỗi dòng sfx có NHÃN thứ 5 = việc đang xảy ra trên hình; đọc bảng tiếng, so NHÃN với
      chú thích "tiếng này thật ra là gì". Giọng đọc tên chiêu / tiếng riêng của chiêu: chiêu ra 1 lần → kêu 1 lần. Nhạc: file ngắn hơn đoạn phát thì `loop:true` hoặc đổi bản dài.
- [ ] Thoại: tiếng Anh chuẩn ngữ pháp; không tự lộ thông tin anh muốn giấu (tên "UNKNOWN" khi chưa ra mắt).
**Rút từ lịch sử sửa Meme Lore 1 + 2 (git log Ver 56–521)**
- [ ] Nhân vật HOÀ vào cảnh, không "dán lên": ánh môi trường (đỏ cháy / xanh đêm), viền sáng từ nguồn sáng, tối dần về chân (MA2 Ver 298).
- [ ] Bóng đen giấu danh tính phải ĐEN THẬT (không lộ lông / màu loang), chỉ chừa thứ cố ý (mây đỏ áo, mắt) (Ep2 Ver 355–356).
- [ ] Mắt / chi tiết đặc trưng đúng chuẩn meme gốc (Rinnegan có vòng tròn đồng tâm, mắt đặt đúng vòng mắt tượng) (Ver 356, 450).
- [ ] Tên trên hộp thoại đúng tên meme (DEPRESSED CAT, không phải PAIN) (Ver 450).
- [ ] Không lộ phần thừa / lỗi che khuất: chân khổng lồ thò dưới núi, máy vượt mép nền lộ vùng trống (Ver 454, 193).
- [ ] Nền có không khí: khói / sương thấp, tàn lửa, cột khói, trăng thấp — mỗi phần phim 1 bảng màu riêng rõ ràng (MA2 Ver 249–251, 263).
- [ ] Có QUÃNG LẶNG sau nhịp lớn, chuyển cảnh mờ về đen rồi hiện dần ở chỗ đổi không khí; đánh đọc được, không rối (Ep3/4 Ver 428, MA2 Ver 263).
- [ ] Cảnh ra mắt / khổng lồ phải HOÀNH TRÁNG: khung rộng, vật to gấp nhiều lần, góc thấp (Ep2 Ver 355, MA2 Ver 217).
- [ ] Bám video / phác thảo mẫu anh gửi đúng từng nhịp (lấy đà như clip mẫu, dàn cảnh như sketch) (MA2 Ver 216, 295).
- [ ] Tiếng: va chạm đúng khung chạm đất (không kêu lúc còn trên không), 1 tiếng / 1 cú (không 2 tiếng chồng), cắt khoảng lặng đầu file,
      KHÔNG để giọng người / câu thoại lạ trong tiếng hiệu ứng (Ep2 Ver 372, 379; MA2 Ver 233; Ver 161).
- [ ] Mạch truyện khớp các tập trước (phong ấn 1 lần, thứ tự sự kiện) (MA2 Ver 228).
- [ ] Nền tối chuyển màu không bị sọc (thêm hạt nhiễu) (Prologue Ver 470).
**Nội dung**
- [ ] Đúng ý anh từng câu (đọc lại tin nhắn của anh, đánh dấu từng yêu cầu đã làm).
- [ ] Hình tạm / chờ ảnh: ghi rõ khi báo, không để anh tưởng là bản chốt.
- [ ] Không tự xuất video khi anh chưa bảo.
Anh chê điều gì MỚI → thêm 1 dòng vào bảng này ngay trong phiên (ghi phim + ngày).

## Quy trình
1. **Kịch bản → bảng phân cảnh** (gửi anh duyệt TRƯỚC khi code): mỗi shot 1 dòng — giây, cỡ cảnh + góc máy, hành động (có lý do), hiệu ứng, tiếng.
   Anh gửi video mẫu → chạy skill `xem-video` trước, bám nhịp cắt + góc máy của mẫu.
2. 🖼️ **TỰ VẼ ẢNH NGAY, SONG SONG** (anh dặn 9/11/2026, nhắc nhiều lần: "trong lúc sửa đã phải tạo ảnh sẵn, đến đoạn ấy thay vào luôn"; "ảnh tạo không phải 1 phát là ưng"):
   có kịch bản / bảng phân cảnh là liệt kê MỌI ảnh cần → TỰ VẼ bằng skill `ve-anh-gpt` (`tools/x/gpt-image.sh --ref <ảnh gốc nhân vật> --green`) CHẠY NỀN
   ngay lúc bắt đầu dựng — KHÔNG hỏi anh, KHÔNG chờ, KHÔNG viết lệnh bắt anh tự vẽ. Nháp 1 ảnh soát đạt rồi vẽ loạt (2–3 ảnh song song, `timeout 420`).
   Vẽ xong: Read soát (đúng mặt, chân mèo, đúng hướng) → skill `tach-nen-anh` (`tools/x/gkey.js`) → thay ẢNH TẠM trong phim. Ảnh anh tự gửi thì dùng ảnh anh.
   Ảnh còn chờ / chưa đạt ghi CLAUDE.md mục phim ("CHỜ ẢNH") cho máy kia biết.
   **Danh sách ảnh cần vẽ**: tận dụng ảnh có sẵn (`assets/img/cine/`, `assets/avatars/<meme>/`). Thiếu tư thế → viết CÂU LỆNH ChatGPT cho anh (mẫu dưới),
   anh gửi ảnh về → skill `tach-nen-anh` (nền xanh → webp cắt sát) → để ở `assets/img/cine/`.
3. **Dựng**: `js/film-<id>.js` gọi `CineKit.film({...})`; thêm 1 mục vào thư mục `__lab` (Anime Lab) hoặc thư mục phim trong `openCinema()` (js/game.js) với `id:'ck:<id>'`.
4. **Xem thử**: chụp khung bằng playwright (gọi `playCineKit('<id>',{offline:true,scale:0.5})`, `CineKit.films.<id>.step(t)`, `canvas().toDataURL()`),
   ghép bảng khung → Read. Hoặc anh mở Meme Cinema → 🧪 Anime Lab.
5. **Xuất** (chỉ khi anh bảo): `node tools/render-cine.js <id> out.mp4 --scale 1.3333` (9:16 2K) — phim cine-kit tự nhận, không cần thêm vào `FILMS`. Xem skill `xuat-video`.

## 🧩 TẬP DÀI = NHIỀU CẢNH (anh chốt 9/11/2026) — `CineKit.seq`
- Mỗi CẢNH là 1 `CineKit.film({id, DUR, imgs CHỈ ảnh cảnh đó, sfx, fadeIn:false/fadeOut:false nếu nằm giữa tập …})`.
  TẬP = `CineKit.seq({id, title, VW, VH, parts:[id cảnh…], mus:[nhạc nền theo giây CẢ TẬP]})` → trong game xem liền 1 mạch, 1 thanh tua.
- Xuất (Mac): `render-cine <idTập>` = cả tập · `render-cine <idCảnh>` = RIÊNG cảnh đó (chỉ nạp ảnh cảnh đó) → sửa cảnh nào xuất lại cảnh đó, rồi ghép.
  Mỗi cảnh cần tệp `js/film-<idCảnh>.js` (playCineKit tải theo tên); cảnh nằm chung code thì tệp đó chỉ cần tải file chung (mẫu `js/film-fin1c1.js`).
- Ảnh chỉ TẢI khi phim phát. Dò cảnh dùng ảnh nào: đặt `window.__ckImgLog=new Set()` rồi step cả tập (mẫu: danh sách ảnh trong `CUTS` ở film-fin1.js).
- Final Part 1: `fin1` = fin1c1 (phố, 0–16.5s) + fin1c2 (Friend phá, 16.5–37s) + fin1c3 (nóc nhà, 37–69.2s), cắt từ bản vẽ chung `MAIN` trong film-fin1.js.
  Thêm cảnh mới (Gojo vs Pain…): file riêng `js/film-<id>.js` + thêm id vào `FIN1_PARTS` (sau fin1c3).

## CINE-KIT — cái gì ở đâu (js/cine-kit.js)
- Thế giới 2.5D: x phải, y lên, z sâu; đất y=0; 1 meme cao 100 (Buff Doge 200). Nhân vật = ảnh phẳng quay về máy, chân chạm đất, có bóng.
- **Máy quay** `shots:[{t0,t1,a:{…},b:{…},ease}]`: `tx,ty,tz` điểm nhìn · `dist` · `yaw` (0 = đứng phía −z; −90 = đứng bên TRÁI nhìn sang phải; 180 = sau lưng)
  · `pitch` (+ nhìn từ trên xuống: 45–75 = góc cao chéo / gần thẳng đứng; âm = góc ngước) · `roll` (nghiêng máy kiểu dutch) · `fov` · `ox,oy` (lệch khung).
  Giữa 2 shot = cắt cứng; bay vòng = đổi `yaw` trong 1 shot (vd −20 → 190).
- `K.sprite(F,{img,x,z,y,h,flip,lean,a,white,smear:{dx,dy,dz,n} (dx = VẬN TỐC, vệt kéo ra phía sau),aura:{col:'r,g,b',k}})`
- Hiệu ứng thế giới: `K.smoke` (khói toon, `swirl` xoáy, `tint`, `a`), `K.ring` (sóng xung kích trên đất), `K.slash` (vệt chém trăng khuyết, `k` tiến độ vung),
  `K.sparks`, `K.debris`. Hiệu ứng màn hình: `K.speedLines`, `K.panLines`, `K.sfxText` (chữ tượng thanh), `K.flash`, `K.letterbox`, `K.vignette`.
- Hào quang: `aura:{preset:'ssj'|'ki'|'haki'|…, k, seed}` → lửa shader (skill `tao-vfx`); hậu kỳ `post(F,t)` → sóng bóp méo / zoom blur / tách màu / khí nóng.
- `impact(t)` trả `'inv'` / `'bw'` / `'red'` = khung impact (2–4 khung là đủ); `shake(t)` = biên độ rung.
- Chuyển động nhân vật dùng `K.twos(t)` (giật 12 hình/giây như anime vẽ tay); máy quay + hiệu ứng để mượt.
- Ảnh gốc nhìn sang trái/phải → hàm `faceFlip` trong film-dvc.js tự lật theo vị trí đối thủ TRÊN MÀN HÌNH (máy bay vòng ra sau thì tự đổi).
- Muốn có góc nhìn sau lưng → cần ảnh "quay lưng" riêng (vd `CINE_SM_BACK`); không có thì tránh shot đó.

## 🎥 CineKit.cam — góc máy + nhịp + hiệu ứng LÀM SẴN (js/cine-cam.js, 9/11/2026, số lấy từ meme-anime-lab/playbook)
`playCineKit` tự tải sau cine-kit. Trong film: `const C=CineKit.cam;`. Tự kiểm: trang `tools/x/cine-cam-test.html` (`window.__done` = "OK …").
- **Góc máy** (trả MẢNG shot, ghép bằng `C.seq(...)`; `C.check(shots)` soát): `slideAlong` (lướt dọc thân quái 2.75s) · `orbit` (xoay quanh combo, `cut:0.15` = đổi góc kiểu cắt)
  · `wormHold` (góc giun đứng yên 2s đọc tỉ lệ) · `birdToWorm` (nổ: góc chim → góc giun, 0.9s/shot) · `pushIn` (đẩy rất chậm vào mặt) · `whip` (lia giật, kèm `C.whipFx` trong screen)
  · `dollyZoom` (giữ cỡ nhân vật, nền giãn) · `chargeFollow` (lao theo đòn nhịp brake + khựng) · `scaleJump` (combo rất xa ↔ nắm đấm che khung ↔ xoay) · `mirror` (2 phe cùng bố cục, `flip`).
- **Nhịp** (đã đăng ký vào `K.EASE` → `ease:'holdSnap'`): `holdSnap` (giữ rồi bật) · `overshoot` (vượt rồi bật lại) · `brake` (hãm gấp); hàm tự chỉnh: `C.ease.holdSnapK(h)` …
- **Hiệu ứng** (gọi trong `screen(F,t)`, trả true khi đang chạy): `implode` (nền đen + chấm co lại 0.3s trước nổ) · `wipeBlob` (màu loang che kín ở giữa) · `wipeLeaves` (bóng lá quét, che kín ở giữa)
  · `speedTunnel` (đường hầm tốc độ trắng dần 0.8s) · `restBeat` (khoảng thở nền nâu + bóng lá 1.5s) · `whipFx` · `splitTint` (phủ màu 2 nửa) · `splitFace` (cho `def.panels`).
  `impact: C.negFrames([giây…], 0.07, 'inv', [đòn mạnh…])` = khung âm bản đúng 1 khung vẽ.
```js
const C=CineKit.cam, T={hit:2.0, boom:4.0};
shots: C.seq(C.chargeFollow(0,{d:0.5,hold:0.3}), C.scaleJump(0.8), C.birdToWorm(T.boom+0.3)),
impact: C.negFrames([T.hit], 0.07, 'inv', [T.boom+0.3]),
screen(F,t){ C.implode(F,t,T.boom); C.wipeLeaves(F,t,T.boom+2.0,0.2); C.restBeat(F,t,T.boom+2.1,1.5); },
```
## 🖌️ CineKitFx — hiệu ứng MANGA làm sẵn (js/vfx-manga.js, Ver 526, 9/11/2026, canvas 2D — chạy cả PC / Mac / xuất video offline)
`playCineKit` tự tải. Trong film dùng `const FX=window.CineKitFx;` (`CineKit.fx` gắn chậm ~20ms). Gọi trong `screen(F,t)`, toạ độ = đơn vị logic phim.
Tự kiểm + xem ảnh: `tools/x/vfx-manga-test.html`. Nguồn + khi nào dùng: `../meme-anime-lab/playbook/cong-thuc.md`.
- `FX.smear(F,img,x,y,w,h,{dx,dy,n,streak,lines})` — ảnh kéo thành VỆT SỌC khi đập / lao ((x,y,w,h) = vị trí đầu, (dx,dy) = đuôi vệt). ~10ms
- `FX.swirl(F,t,{cx,cy,r,colA,colB,colC,arms,speed})` — xoáy màu sau lưng lúc kết ấn / mở lãnh địa; vẽ TRƯỚC nhân vật. ~12ms
- `FX.halftone(F,{mode:'flat' hoặc 'luma',dot,col,paper})` — chấm manga phủ khung / vùng. 10–14ms
- `FX.mangaBW(F,{keep:'#2878ff',tol,scale})` — cả khung thành đen trắng, CHỈ GIỮ 1 màu nhấn của phe đang ra đòn; gọi CUỐI `screen`. ~22ms (nặng nhất, chỉ bật trong shot cần)
- `FX.blast(F,{x,y,z,t0,life,size})` — lửa nổ khối đặc viền đen → khói nâu (có `z` = điểm thế giới, xếp sâu cùng sprite). <1ms
- `FX.rimLight(F,img,x,y,w,h,{col,dir,dark})` — quái NGƯỢC SÁNG: khối tối + viền sáng (bỏ `dir` = sáng bao quanh, `dir:-90` = từ trên). ~11ms
(ms đo trên CPU trình duyệt chạy ngầm 1280×720 — chưa đo GPU thật.) Còn chờ: lưới biến dạng ảnh 2D thật (dẹt / thở / nghiêng) trong `vfx-gl`.

## Mẫu câu lệnh ChatGPT cho 1 khung chính (anh dán vào ChatGPT)
```
Draw <nhân vật: tả đúng meme gốc, vd "the Buff Doge meme (muscular shiba inu with the doge face)">, full body, <tư thế/hành động cụ thể>,
seen from <góc máy: high angle looking down diagonally / low angle from below / from behind / side view>, anime fight scene style
(Jujutsu Kaisen / Mappa look: bold clean lineart, cel shading, strong rim light), keep the original meme face exactly.
Plain solid green background (#00FF00), no shadow on the background, no text, character not cut off at the edges.
```
- 1 tư thế / 1 ảnh (hoặc nhiều tư thế cách xa nhau trên 1 tấm nền xanh — `tach-nen-anh` tự tách).
- Cùng 1 phim: nhắc lại đúng câu tả phong cách ở mọi lệnh để nét vẽ đồng nhất; gửi kèm ảnh khung trước cho ChatGPT làm mẫu.

## Mẫu lệnh ChatGPT bộ 5 tư thế đánh tay đôi (mỗi nhân vật)
Gửi kèm ảnh toàn thân sẵn có của nhân vật làm mẫu; ảnh đầu ổn thì gửi kèm ảnh đó ở các lệnh sau.
Đoạn chung dán CUỐI mọi lệnh: "IMPORTANT: it is a real cat with real CAT ANATOMY: four cat legs, round cat paws with paw pads, no human hands, no fingers, no human arms or legs, no human body. Keep exactly the same character, the same realistic photo look and the same dramatic anime-style rim lighting as the reference image. No energy effects, no smoke, no motion lines, no particles. Plain solid green background (#00FF00), no shadow on the background, no text, the whole cat fully visible, not cut off at the edges."
- THỦ THẾ: "full body, side view facing RIGHT/LEFT, in a calm fighting guard stance: low and balanced, both front paws raised loosely in front of its chest, ready."
- LẤY ĐÀ: "winding up for a strike: body coiled and twisted backward, weight on the back leg, one front paw pulled far back, the other paw forward to aim."
- RA ĐÒN: "in the middle of a powerful lunging paw strike: body stretched forward, back leg fully extended pushing off, one front paw thrust straight forward with claws out."
- TRÚNG ĐÒN: "just after being hit hard in the face: head snapped back, body bending backward, front paws flung up, one hind leg lifted off the ground."
- NÉ: "dodging an attack: ducking very low and leaning sideways, body almost flat to the ground, front paws touching the floor."
