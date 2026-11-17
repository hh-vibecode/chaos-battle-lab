---
name: viet-kich-ban
description: VIẾT KỊCH BẢN cảnh phim / trận đánh cho Meme Cinema theo đúng cách anh Hải viết (mẫu trong mau-cua-anh.md) — chuỗi nhân quả, mỗi đòn có phản ứng (đỡ / né / trúng), chiêu đúng game + đúng nguyên tác anime, phá huỷ đúng tầm, có nhịp câu chuyện / hài, tiếng + nhạc + giọng thật lên kế hoạch từ đầu. Viết xong ĐƯA ANH DUYỆT, chưa duyệt KHÔNG dựng. Dùng TRƯỚC skill dung-phim mỗi khi có cảnh / trận mới, hoặc khi anh chê một cảnh cần làm lại.
---

# Viết kịch bản (trước khi dựng — anh dặn 13/11/2026)

Anh: "Ngoài fight của gojo tự t viết và sửa từng tí ra, các fight khác k ổn tí nào… M cần dựng lại 1 skill viết kịch bản, dựa trên những cái t làm mẫu. Viết xong đưa kịch bản t duyệt trước."
→ ĐỌC `mau-cua-anh.md` (nguyên văn các kịch bản anh viết + lời chê) TRƯỚC mỗi lần viết. Học giọng, đừng học công thức.

## Anh viết thế nào (rút từ mẫu)
1. **Chuỗi NHÂN QUẢ liền mạch**: "sau khi… thì… nhưng trong lúc… đã kịp… khiến… nhưng sau cũng vẫn…". Mỗi nhịp sinh ra từ nhịp trước — không có pha đánh "cho có".
2. **Đòn nào cũng có PHẢN ỨNG của đối thủ**: đỡ (vũ khí giơ lên đúng hướng, trượt lùi, tia lửa), né, đỡ "1 cách khó khăn", bất ngờ, bị đẩy văng. Không ai đứng im ăn đòn.
3. **Chiêu ĐÚNG game + ĐÚNG nguyên tác** (Almighty Push, Shinra Tensei, Infinity Domain, Hollow Purple; Kamui xuyên thấu; Haki; Bifrost của Thor) — tra trong game, tra anime gốc.
4. **Quy mô phá huỷ nói rõ**: "xoá sổ 1 nửa thành phố", "đứt hết nhà bên cạnh", "húc xuyên 3 dãy nhà".
5. **Chi tiết hình cụ thể, ĐÚNG nhân vật**: "giơ tay lên phía trước, băng mắt nhếch chéo lộ 1 mắt"; meme mẫu cho pha đặc biệt (One-Punch Shiba).
6. **Thế trận ĐỔI CHIỀU**: lép vế trước → bật chiêu ở lúc căng nhất → lật ngược; hoặc ngang tài ngang sức khi kết.
7. **Bối cảnh có lý do**: vừa truyền tống xuống, đang nhìn quanh thì bị tập kích; trận nào cũng nằm trong mạch tập (cảnh trước → trận → cảnh sau).
8. **Có nhịp HÀI / bất ngờ** đúng tính meme (Huh quay sang Pop "huh?" → nổ). Kết trận = 1 nhịp câu chuyện để chuyển cảnh, không cắt cụt.
9. **Lấy 1 trận anime THẬT làm khung** cho kiểu giao tranh (xích vs tay bo = Kurapika vs Uvogin). Hỏi anh mốc phút, không tự dò video dài.

## Quy trình
1. **Nắm mạch tập**: cảnh ngay trước / ngay sau (CLAUDE.md mục phim đó + `js/film-fin1full.js` PARTS), trận này chuyển vào / ra bằng gì.
2. **Tra nhân vật** (KHÔNG bịa):
   - Chiêu trong game: `CHAR_DEFS.<key>.skill` + `CHAR_BLURB.<key>` (Grep đúng dòng, không đọc cả game.js) — signature move, ngưỡng, hiệu ứng.
   - Nguồn gốc meme + nhân vật anime nó nhại (Ninja Cat = Itachi: Sharingan, quạ, ảo thuật, Kamui · Berserk = Guts: đại kiếm Dragonslayer, càng đau càng điên · Bat = Batman: chuẩn bị, bẫy, đồ nghề · Kratos …).
   - Ảnh đang có: `assets/img/cine/` (bộ đa góc, tư thế) — kịch bản cần tư thế nào chưa có thì ghi vào danh sách ảnh cần vẽ.
3. **Chọn trận anime mẫu** cho kiểu giao tranh (đấu kiếm / tầm xa vs cận chiến / xích vs tay bo / mưu trí săn mồi) → hỏi anh mốc phút nếu cần xem.
4. **Viết ĐOẠN VĂN trước** (5–10 câu, giọng anh, nhân quả liền mạch) — đây là phần anh đọc để duyệt ý.
5. **Rồi BẢNG NHỊP** (mỗi nhịp 1 dòng): `# · chuyện gì xảy ra (nguyên nhân → hành động → PHẢN ỨNG) · máy (cỡ + góc + chuyển động) · VFX / môi trường · tiếng · ảnh dùng (có / cần vẽ)`.
6. **Kế hoạch TIẾNG** riêng (xem dưới) + **danh sách ảnh cần vẽ** (theo bộ đa góc / tư thế).
7. **TỰ SOÁT** bằng bảng kiểm dưới → rồi đưa anh. Ghi file `prompts/kich-ban/<id>.md` + dán vào chat. CHỜ ANH DUYỆT. Anh sửa chỗ nào sửa đúng chỗ đó.
8. Duyệt xong mới sang skill `dung-phim` để dựng, dựng ĐÚNG từng nhịp đã duyệt.

## Bảng kiểm TRƯỚC khi đưa anh (thiếu 1 dòng = chưa xong)
- [ ] Mỗi đòn: lấy đà → ra đòn → PHẢN ỨNG rõ (vũ khí giơ đỡ đúng hướng / né / trúng + bật lùi). Kiếm chạm kiếm ở đâu, xích quấn vào đâu, đòn bay về phía nào.
- [ ] Nguyên nhân trước hệ quả (mắt kích hoạt → mới xuyên thấu; chạm mắt → mới trúng ảo thuật; gài bom → mới nổ).
- [ ] Chiêu signature của từng con đúng game, ra ở cao trào, mỗi chiêu 1 lần (không lặp vô nghĩa).
- [ ] Thế trận đổi chiều ≥ 2 lần; kết ngang ngửa hoặc dang dở → chuyển cảnh bằng 1 nhịp câu chuyện (hài / bất ngờ / có lý).
- [ ] Môi trường phản ứng (kính vỡ, xe lật, nhà đổ, mặt đường nứt) — đồ vật HỢP BỐI CẢNH (thành phố không có bóng chông).
- [ ] Mỗi nhân vật có ít nhất 1 khoảnh khắc "chữ ký" đúng tính cách (Batman tính trước mọi thứ; Huh ngơ ngác; Berserk không bao giờ lùi…).
- [ ] Nhịp: pha nhanh (vệt / bóng mờ, không vẽ người) xen nhịp khựng / thở; không có đoạn đứng nhìn nhau dài vô cớ.
- [ ] Trục máy: phe A trái / B phải, chỉ đổi khi có lý do (Kamui, lướt qua nhau).
- [ ] Ảnh cần cho từng nhịp có sẵn hay phải vẽ — liệt kê đủ (đỡ, né, trúng đòn, ngã, đứng dậy, ra chiêu, góc sau lưng…).

## Kế hoạch TIẾNG (anh chê 13/11 — ghi ngay trong kịch bản)
- **Nhạc theme của nhân vật CHỈ 1 LẦN, đúng khoảnh khắc của nó** (Pain theme lúc Pain bộc lộ sức mạnh — KHÔNG lặp nền cả trận, KHÔNG dùng làm nhạc nền trận khác).
- Mỗi trận 1 bản nhạc nền RIÊNG hợp kiểu trận (đấu kiếm Nhật / săn mồi hồi hộp / đấu sức). Anh: "nhạc anime cảnh đánh nhau epic, không sợ bản quyền". Ghi tên bản + nguồn (YouTube) cho anh chốt.
- **Giọng hô tên chiêu = GIỌNG THẬT của nhân vật** (tiếng Nhật gốc, vd Gojo — Yuichi Nakamura "Ryōiki Tenkai… Muryōkūsho", "Kyoshiki Murasaki"), KHÔNG dùng giọng tổng hợp (VOICEVOX bị chê "đần").
  Nguồn: myinstants (bỏ bản "Dub" tiếng Anh) → ghi link ứng viên cho anh nghe chốt (Claude không nghe được).
- Mỗi vũ khí 1 giọng tiếng cố định; cú nặng 2–3 lớp; lặng 0.3–0.7s trước cú quyết định; nhạc lùi khi đánh (cine-kit `duckAuto`).
- Sau khi dựng: `tools/x/film-listen.js` để "nghe bằng mắt" (độ nổi từng cú, nhạc có che không).

## Mẫu trình bày gửi anh
```
## <Trận> — kịch bản (chờ anh duyệt)
Vị trí trong tập: <cảnh trước> → [trận này] → <cảnh sau>. Trận mẫu: <anime, mốc>.
**Tóm tắt** (đoạn văn 5–10 câu, nhân quả liền mạch)
**Nhịp** | # | chuyện gì xảy ra → phản ứng | máy | VFX / môi trường | tiếng | ảnh |
**Tiếng**: nhạc nền · theme dùng 1 lần ở nhịp # · giọng thật (link ứng viên) · tiếng vũ khí
**Ảnh cần vẽ**: …
**Em còn phân vân**: (câu hỏi ngắn cho anh chốt)
```
