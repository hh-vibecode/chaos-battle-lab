---
name: them-meme
description: Danh sách việc khi THÊM MEME MỚI (hoặc đổi hẳn skill một meme) trong Chaos Battle Lab — mọi bảng/chỗ nối trong js/game.js, ảnh, tiếng, câu chat Beluga, info, luật quân triệu hồi, hệ đạn cho Catvader. Dùng ngay khi anh đưa mô tả meme mới, trước khi viết code.
---

# Thêm meme mới — làm đủ, không sót

Đọc `CLAUDE.md` của repo trước (luật triệu hồi, Beluga, info, phân việc ảnh). `<key>` = tên khoá viết liền chữ thường (vd `saiyanmarmot`).

## 0. Hiểu meme + chốt số
- Tự tìm hiểu nguồn gốc meme (WebSearch / Know Your Meme / Giphy) để info + hiệu ứng bám đúng meme.
- Anh không cho con số (dame, hồi chiêu, thời gian) → tự đặt hợp lý, BÁO lại anh là mình tự đặt.
- Ảnh nhân vật: anh vẽ bằng ChatGPT. Chưa có thì dùng ảnh tạm + báo anh cần ảnh gì (nền xanh lá, cùng tỉ lệ, chân chạm đáy, hướng mặt, liệt kê từng tư thế).
  Có ảnh → skill **tach-nen-anh**. KHÔNG vẽ bộ phận nhân vật bằng code.

## 1. Khai báo (js/game.js)
- [ ] `CHAR_DEFS.<key>` = `{key, defaultName, emoji, color, hp:1000, speed:5, size:~45, skill:'<mô tả tiếng Việt đầy đủ>'}` → tự vào roster + menu chọn.
- [ ] `FIRST_ATTACK_CD.<key>` (số tick chờ đòn đầu).
- [ ] `_mcDefaultAvatars.<key>` = `'assets/avatars/<key>/avatarUrl.png'` (ảnh đại diện).
- [ ] `POSE_SLOT_DEFS.<key>` = `[]` nếu khung ảnh dựng sẵn trong code (không cho upload).
- [ ] Ảnh quay mặt TRÁI → thêm `<key>` vào `facingDefault` (constructor Fighter) + `facesLeft` trong `_selSideRender`.
- [ ] Khung ảnh dựng sẵn: mảng kiểu `MM_FR`/`DC_FR` + nhánh chọn ảnh cạnh `this.type==='doorbellchud' && DC_FR[0]...` trong draw; ảnh gầy/cao → hệ số trong `_avMul`.

## 2. Chữ (luật trong CLAUDE.md)
- [ ] `BL_VS["<key>"]`: 6 câu Beluga — viết thường, ngơ ngác, hỏi ngu / trêu nhẹ, bám meme + skill.
- [ ] `CHAR_BLURB_SHORT.<key>`: 1 câu đùa ≤8 từ, bám câu thoại/sự tích meme + gợi skill, KHÔNG mô tả kỹ năng.
- [ ] `CHAR_BLURB.<key>`: mô tả skill tiếng Anh (bảng bên màn chọn).
- [ ] `CHAR_FACTS.<key>`: 4–5 fun fact tiếng Anh.

## 3. Cơ chế
- [ ] Logic theo khuôn có sẵn: hàm tick riêng gọi trong `_updateCore` (sau `_slHammerTick(this)`), đòn đánh trong `doAbility` (cạnh khối Ninja Cat),
      khoá di chuyển trong `moveLogic` (cạnh dòng `this.type==='ninjacat' && this._njGen`), vẽ dưới meme (danh sách `_njDrawUnder(); _cvForceDraw(); ...`),
      vẽ trên meme (cạnh `_scEchoDrawOver()`), tick thế giới trong vòng `while(_gameTickAccum >= 1)` (sau `_bounceFighters()`).
- [ ] Mảng thế giới mới (hiệu ứng, vật thể) → khai báo `let` + reset ở CẢ 3 dòng reset (tìm `njSmoke=[]; mmFly=[]` — dùng Edit replace_all).
- [ ] **Quân triệu hồi có máu = 1 meme**: skill gây dame/hiệu ứng phải trúng cả `_summonFoes(team)` / `_hitSummonsArea(...)`.
      Meme mới CÓ quân triệu hồi có máu → thêm vào `_hpSummonArrays()`, `get enemy()`, reset mảng, `takeDamage` gọi `_summonTakeDamage`.
- [ ] Meme mới BẮN ĐẠN bằng hệ riêng (không dùng mảng `projectiles`) → thêm 1 dòng vào `CV_SYS` để vùng Force của Catvader bắt được
      (`arr`, `ok`, `dmg`, `pos` nếu vị trí vẽ khác x,y). Dùng `projectiles` chung thì không cần.
- [ ] Giết kiểu "văng khỏi sàn / thua thẳng" → `_susEject(u, src)`; kết liễu nội bộ → `_forceKill`.

## 4. Âm thanh
- [ ] File vào `assets/audio/`, khai báo trong `AUDIO_SAMPLES`; meme có tiếng đánh riêng → thêm vào `CHARS_OWN_SOUND` (tắt tiếng hit mặc định);
      có VFX trúng đòn riêng → `CHARS_OWN_HIT_VFX`. Tải tiếng từ myinstants được (Invoke-WebRequest).
- [ ] Ảnh/tiếng mới → `js/asset-groups.js` nhóm `<key>`.

## 5. Kiểm + phát hành + ghi chú
- [ ] Soát nhanh: mọi key `CHAR_DEFS` (trừ `trainingdummy`, `fanchar`) có trong `BL_VS`.
- [ ] Skill **chay-thu**: vào trận `<key>` đấu 1–2 meme, ép từng trạng thái skill, chụp màn hình, `__errs` rỗng.
- [ ] Skill **phat-hanh** (`-files` liệt kê đủ ảnh/tiếng mới).
- [ ] Ghi vào "Nhật ký gần đây" trong `CLAUDE.md`: khối code (`XX_*`), ảnh nào tạm / đang chờ anh, quyết định tự đặt.
