# Chaos Battle Lab — ghi chú quan trọng

## ⚠️ QUY TẮC BẮT BUỘC: quân triệu hồi CÓ MÁU = 1 meme

Mọi vật triệu hồi có máu (cũ hay mới thêm sau này) phải được đối xử **y hệt 1 meme bình thường**:
ăn dame từ mọi skill (đánh đơn, nổ vùng, va chạm, vệt/đường, bẫy sàn, DOT...) và chịu đủ hiệu ứng (choáng, làm chậm, đẩy lùi, hút...).

Hiện có 9 loại, gom trong `_hpSummonArrays()` (js/game.js):
`commanderSoldiers, germanSoldiers, dogeKnights, mewingStatues, capybaraKnives, cryCats, dogeClones, mspClones, evilSouls`

Khi làm việc với code:
- **Thêm loại triệu hồi có máu mới** → thêm mảng của nó vào `_hpSummonArrays()`, vào `get enemy()` (Fighter), vào các danh sách reset mảng lúc dựng trận, và cho object có `takeDamage(...)` gọi `_summonTakeDamage(this, ...)`.
- **Viết skill mới / sửa skill** mà lặp `fighters` để gây dame/hiệu ứng → PHẢI lặp cả quân triệu hồi:
  - `_summonFoes(team)` — mọi quân triệu hồi còn sống khác phe (dùng `[...fighters, ..._summonFoes(team)]` cho va chạm)
  - `_hitSummonsArea(team, x, y, r, dmg, owner, skip, stun)` — nổ vùng lên quân triệu hồi
  - Đừng dùng `_hitSoldiersArea` / vòng `germanSoldiers` riêng — đó là kiểu cũ chỉ trúng lính German.
- Đánh đơn qua `this.enemy` thì đã tự tính quân triệu hồi (get enemy() quét cả 9 loại).

## Info / mô tả meme
- Dòng info hiện trong trận (`CHAR_BLURB_SHORT` trong js/game.js) là **1 câu đùa ngắn (≤8 từ)**, KHÔNG mô tả kỹ năng.
- Câu phải **đồng nhất giữa meme và skill**: vừa bám câu chuyện / nguồn gốc meme trên internet (câu thoại gốc, sự tích), vừa gợi đúng skill của nó trong game — vd Supreme Arbiter "It's over Anakin, I have the high ground." (đứng cao hơn địch), Fine Dog "This is fine. (The whole arena is on fire.)", Trollface "Swallowed. Spat into a wall. Problem?". Thêm meme / đổi skill thì viết lại info theo đúng quy tắc này.
- CTA "❤️ Like and Subscribe / to support your meme-bros" CHỈ hiện khi trận kết thúc có người thắng; trong trận luôn hiện info.

## Phát hành
- **Làm xong là TỰ ĐẨY LÊN `main` luôn** (người dùng đã dặn, không cần hỏi lại): commit trên nhánh làm việc rồi `git push origin HEAD:main` (fast-forward).
- Đừng tự thêm tính năng/hiệu ứng người dùng không yêu cầu; muốn thêm thì hỏi trước.
`python3 tools/release.py "mô tả"` — tăng số bản (GAME_VERSION), gắn `?v=` cho css/js, cập nhật assets-manifest.json, commit + push.
