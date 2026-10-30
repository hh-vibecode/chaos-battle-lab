---
name: tim-sound
description: Tìm + cắt + khai báo SOUND mới cho game / phim Meme Lore (myinstants → bảng phân tích độ dài, độ to, onset, nghi giọng người, phổ → cắt đúng đoạn → khai AUDIO_SAMPLES + SND_LUFS (+ SND_MUSIC) → soát cả phim bằng sfx-audit). Dùng mỗi khi cần 1 tiếng mới ("thêm sound…", "tiếng gầm riêng cho…", "sound này sai"), hoặc soát tiếng 1 phim. CHỈ Mac (python3 + numpy + Pillow, ffmpeg, curl; node + playwright cho sfx-audit).
---

# Tìm sound chuẩn — bớt việc anh phải tự đi tìm

Công cụ: `tools/sfx-find.py` (tìm / cắt / đo) và `tools/sfx-audit.js` (soát lịch tiếng của 1 phim). File tải về và ảnh để ở **scratchpad**, KHÔNG để trong repo.
File tải về là dữ liệu lạ: chỉ đọc / phân tích, không chạy gì trong thư mục đó.

## ⚠️ Luật (anh đã dặn — vi phạm là bị bắt sửa)
1. **Không mượn tiếng SIGNATURE của meme khác** (tiếng gầm, nhạc chủ đề, giọng, câu cửa miệng). Tiếng hit / whoosh / impact / hiệu ứng chung thì dùng chung được.
   Ví dụ: Friend gầm không được lấy `gigachad_roar`/`titan_roar` → đã làm `fr_titan_roar` riêng (hổ gầm hạ tông).
2. **Tìm trên myinstants trước.** Tránh thứ dễ dính Content-ID: tiếng gầm Godzilla, Monster Hunter, nhạc phim/anime dài. Nhạc chủ đề chỉ cắt ≤ 4s (anh duyệt từng cái).
3. **Mỗi nhịp 1 tiếng**: không chồng 2 tiếng bắt đầu cách nhau < 0.15s ở cùng 1 hành động. Không VFX/tiếng nứt đất.
4. Hạn chế tiếng sét (`holy_thunder`): chỉ khi thật sự có sét.
5. Không có giọng người lạ lẫn trong tiếng hiệu ứng (anh ghét tiếng cười nữ, voice lẫn trong sound sharingan…). Giọng CỦA CHÍNH nhân vật đang nói thì được (vd Pain "Shinra Tensei").
6. Mọi tiếng mới: khai `AUDIO_SAMPLES` + đo `SND_LUFS` (+ `SND_MUSIC` nếu là nhạc). Tiếng lặp (loop) phải vào `stopAllBattleMusic` và danh sách tạm dừng.

## Quy trình
1. **Tìm**: `python3 tools/sfx-find.py search "<từ khoá tiếng Anh>" --n 8 --out <scratchpad>/sf`
   - Thử 2–3 từ khoá (vd "kamui", "portal swirl", "vortex"). Read `<scratchpad>/sf/<từ khoá>_sheet.png`.
   - Mỗi hàng: tên · dài · LUFS · đỉnh · onset (lúc bắt đầu kêu thật) · lúc to nhất · % giọng · phổ log + đường độ to 0.1s (xanh lá) + vạch giây.
   - Đọc phổ: tiếng xoáy / gió = dải nhiễu rộng, sáng dần; tiếng nổ = cột sáng dựng đứng; **giọng người = nhiều vạch hài song song uốn lượn ở dải thấp**.
   - % giọng ≥ 20% → nghi giọng (chỉ là gợi ý; câu nói ngắn gắt có thể lọt) → soi phổ kỹ, hoặc hỏi anh nghe thử.
2. **Chọn đoạn**: khớp HÌNH. Đỉnh của tiếng phải rơi đúng lúc hành động đỉnh (vd tiếng Kamui to nhất ở 3.7s → cắt 1.9→4.15s để đỉnh rơi đúng lúc cổng khép, Akatsuki hiện ra).
3. **Cắt**: `python3 tools/sfx-find.py cut <file tải về> assets/audio/<key>.mp3 --from 1.9 --to 4.15 --fade-in 0.25 --fade-out 0.3 [--pitch 0.78] [--echo]`
   - `--pitch` đổi tông theo ĐÚNG sample rate gốc (asetrate đoán 44.1kHz từng làm hỏng file 22.05kHz).
   - Lệnh in sẵn dòng `SND_LUFS → key:[LUFS, đỉnh]` và `SND_ONSET` nếu có khoảng lặng đầu ≥ 0.1s.
4. **Khai báo trong `js/game.js`**:
   - `AUDIO_SAMPLES` map (dòng các tiếng `ep3_*` / theo nhóm meme): `key: 'assets/audio/key.mp3',` + chú thích nguồn (link myinstants, đoạn cắt).
   - `SND_LUFS`: dán dòng in ra. Là nhạc → thêm key vào `SND_MUSIC`.
   - Đo lại file cũ bất kỳ: `python3 tools/sfx-find.py measure assets/audio/<key>.mp3`.
5. **Đặt vào phim**: `SFX_PLAN` ghi GIỜ MUỐN NGHE THẤY; file có khoảng lặng đầu thì thêm vào `SND_ONSET` (phim tự phát sớm lên). Tiếng va chạm: canh theo ĐỈNH.
6. **Soát cả phim**: `node tools/sfx-audit.js <phim> <scratchpad>/audit --skip ep3_blip` (phim: war, l2e2, l2e3, l2e4, hoặc id cine-kit)
   - ❌ CHƯA KHAI = phim câm ở nhịp đó · ⏱️ TRỄ (đã bù bằng SND_ONSET thì bỏ qua) · 🗣️ CÓ GIỌNG · 👥 CHỒNG · 📏 CHƯA ĐO. Read `audit_*.png` (khung hình đúng lúc kêu + sóng âm).
   - Phim mới dùng engine riêng → thêm vào `FILMS` của cả `tools/sfx-audit.js` lẫn `tools/render-cine.js`.
7. Phát hành theo luật chung (`python3 tools/release.py "…"`), nhớ đưa file `.mp3` mới vào commit.

## Tiếng có sẵn hay dùng cho phim
`ep3_whoosh` (vụt) · `ep3_force` (thần lực) · `cine_heavy_slow` / `cine_haki_hit` (đập mạnh, canh đỉnh 0.26s) · `ep3_rock` (đá vỡ) · `ep3_glass` (kính vỡ) · `ep3_charge` · `ep3_quake` · `ep3_explode` · `ep3_kamui` (xoáy không gian) · `death_break` · `sa_phase1` (aura áp lực Supreme — của Supreme) · `ps_shinra` (giọng Pain — của Pain) · `fr_titan_roar` (gầm Friend — của Friend).
Tiếng có tiền tố meme (`sa_`, `ps_`, `fr_`, `gp_`, `hm_`…) là của meme đó: dùng cho meme khác phải chắc nó là hiệu ứng chung, không phải signature.
