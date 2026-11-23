# Chaos Battle Lab — luật làm việc (bản gọn 16/11/2026)
Chi tiết từng meme: `docs/notes/memes.md` · từng phim + cine-kit: `docs/notes/films.md` · mẫu comment YouTube: `docs/notes/youtube-comment.md` · luật gốc đầy đủ (ví dụ, lời anh dặn): `docs/notes/rules-full.md`.
🍎 **Mac chưa cài luồng làm phim** (từ khi làm phim trên PC, Mac chỉ update game + nhân vật): phiên Mac đọc `docs/notes/luong-phim-blender.md` mục 2 rồi cài TRƯỚC khi làm phim. VFX nổ / khói / lửa lớn = mô phỏng Blender (`tools/blender/`, cùng file đó mục 4).
Đọc file đó KHI làm đúng phần đó (không cần đọc hết mỗi phiên).
🎬 (anh 21/11) Rạp phim trong app CHỈ còn Final Part 1; phim cũ gỡ khỏi app, code để học ở `docs/mau-phim/` (README ở đó).
⏸️ Final Part 1: cảnh kết `fin1c7` anh ĐỔI CỐT TRUYỆN 21/11 (Catvader đánh lén chém đôi Gojo; phe thiện chỉ 20–30 meme, phe Evil đông) → kịch bản bản 3 `prompts/kich-ban/fin1c7-v3.md` (anh duyệt) ĐÃ DỰNG 21/11 (58.8s, thay bản 2), CHỜ ANH XEM; còn áp "hoà vào cảnh" cho các cảnh Final khác — chi tiết `docs/notes/viec-do-fin1.md`.
⏸️ **Angry Cat (17/11, CHƯA phát hành)**: bộ skill thanh tức giận + hòm đồ 10 vũ khí + bom nguyên tử nằm trong `git stash` trên MAC ("WIP Angry Cat 17/11") — anh bảo để giao cho 1 con khác, chờ anh nói con nào. Ảnh vũ khí GPT dùng lại được; ảnh mèo + 3 ảnh VFX GPT phải làm lại.
⚠️ Anh chê 16/11 "làm nhanh xong toàn làm sai" → làm KỸ từng shot, soát từng shot rồi mới sang shot sau. Cách làm phim / VFX / edit nằm trong skill (`dung-phim`, `edit-video`, `viet-kich-ban`, `ve-anh-gpt`…).

⛔ (anh dặn 18/11) Khi còn ~20% usage: CHỦ ĐỘNG viết note việc dở (docs/notes/…) + đẩy lên main → DỪNG, hỏi anh có làm tiếp được không.

## ⛔ Luật số 0 — luôn làm trên bản mới nhất (anh làm nhiều máy Mac + Windows)
- Đầu phiên, trước mỗi lần sửa code / xuất video / chạy thử: `git fetch origin` → `git rev-list --left-right --count HEAD...origin/main` → thua thì `git pull --ff-only` (đang sửa dở: stash → pull → pop).
- Đang render thì không pull giữa chừng.
- 💾 Máy Mac ổ chật (~20GB trống): tính trước khi chạy việc nặng, không tốn ổ / RAM vô ích, mỗi lúc chỉ 1 việc nặng (rembg CHỈ CPU — CoreML ghi file tạm hàng chục GB, 18/11 làm đầy ổ). Xong việc là XOÁ file tạm / khung nháp / video tải về không dùng nữa (anh dặn 18/11).
- Tin nhắn không liên quan game / phim (vd công nợ, KiotViet = app Kế toán) → hỏi lại 1 câu, không làm.

## Game — luật code
- Quân triệu hồi CÓ MÁU = 1 meme: ăn mọi dame + hiệu ứng. Gom trong `_hpSummonArrays()`; loại mới → thêm vào đó + `get enemy()` + danh sách reset + `takeDamage → _summonTakeDamage`. Skill lặp `fighters` phải lặp cả `_summonFoes(team)` / `_hitSummonsArea(...)` (không dùng `_hitSoldiersArea` kiểu cũ).
- Meme mới → 6 câu chat Beluga trong `BL_VS` (viết thường, ngơ ngác, bám meme + skill). Mọi key `CHAR_DEFS` (trừ trainingdummy, fanchar) phải có trong `BL_VS`.
- Info trong trận (`CHAR_BLURB_SHORT`) = 1 câu ĐÙA ≤8 từ có MIẾNG CHỐT (twist / phóng đại / nói ngược), bám nguồn gốc meme + gợi skill. Không tả skill. Nháp ≥5 câu, đưa anh 3–4 câu mạnh nhất. CTA Like & Subscribe chỉ hiện khi trận kết thúc.
- Hiệu ứng động của nền / sân không dùng `Math.random` (băm theo tick) để không xáo seed trận. Sàn có hoạ tiết → không tô `PAPER_BG` để xoá, dùng `_bgRepaint` / `_skyRepaint` / `_floorShatter`.
- Sound: không mượn tiếng SIGNATURE của meme khác (gầm, theme, giọng). Tiếng chung (hit, nổ, vỡ) dùng chung được. Tìm tiếng: skill `tim-sound`.
- Sound KHÔNG quá đà (anh 17/11): tiếng va chạm / đập tường hết cú va là NGẮT (`playSample(key,vol,giây)`), không để vang đuôi dài; đòn lặp liên tục thì nhỏ lại.
- TWIST (`VfxGL.fx.twist`) là hiệu ứng độc quyền của Kamui. Ý tưởng chờ: 1 meme mới dùng twist (xoáy, hố đen, thôi miên).
- Đừng tự thêm tính năng / hiệu ứng anh không yêu cầu.

## Ảnh / VFX
- ⛔ MEME LUÔN LÀ ẢNH GỐC. Ưu tiên ảnh gốc + chuyển động code + VFX + cắt góc; chỉ vẽ tư thế mới cho cảnh giao tranh tay chân. Cần đổi 1 chi tiết thì sửa đúng 1 chỗ trên ảnh gốc.
- Vẽ GPT (skill `ve-anh-gpt`): chỉ đổi góc nhìn / tư thế, giữ chất ảnh gốc (upscale trung thành trước, rồi lấy ảnh đó làm --ref; "same photographic meme texture, NOT 3D, NOT plastic"). KHÔNG cho GPT vẽ lại meme trong khung cảnh.
- 🐕 Buff Doge to GẤP 3 meme thường; chỉ dùng ảnh gốc (rageAvatarUrl) + Haki của game. Ảnh Buff Doge vẽ lại tư thế đã bị anh chê "không giống nguyên tác" → không vẽ lại.
- ⛔ PHIM / VIDEO (mọi phiên làm phim, video — KHÔNG áp cho game; anh nhắc 20/11, đã lỡ vi phạm: để GPT vẽ dính trăng / mưa / sét vào nền) MỌI THỨ CHUYỂN ĐỘNG — VFX + môi trường (mây, mưa, sương, sét, lửa, ánh đèn, nến, khói, dơi, trăng đổi màu…)
  — Claude TỰ LÀM bằng code. GPT chỉ vẽ LỚP SAU / vật CỐ ĐỊNH (kiến trúc, trời để xanh lá tách ra, đạo cụ đứng yên).
- ⛔ (anh 17/11) ChatGPT CHỈ dùng để: (1) vẽ khung LAYER DƯỚI CÙNG (nền khung cảnh), hoặc (2) vẽ hộ ASSET ĐƠN LẺ (1 vật / 1 tấm đồ vật). KHÔNG lạm dụng cho cả cảnh / hiệu ứng.
  Có dùng thì câu lệnh phải hạn chế TỐI ĐA nét vẽ AI + chi tiết dư thừa + quá đà: "simple, flat, minimal detail, clean shapes, hand-drawn anime cel, NOT AI art, no extra details, no glow, no texture noise, no clutter".
- VŨ KHÍ / đồ vật rắn: GPT vẽ nền xanh + `gkey.js`, code lo chuyển động / gắn vào tay. ⚠️ VFX (chém, cột sáng, nổ, hào quang…): HẠN CHẾ ảnh GPT (anh 17/11: "xấu, cứng, AI lắm") → làm bằng CODE / shader / hạt / bóp méo có chuyển động thật; chỉ dùng ảnh GPT cho VFX khi anh bảo. Không tự vẽ bộ phận nhân vật bằng code.
- Ghép nối phải khéo: mọi chỗ 2 thứ gặp nhau (tay ↔ bàn tay, nhân vật ↔ nền, cảnh ↔ cảnh) phải có phương án (cùng nét, mép mờ, khói / bụi phủ chân, không mép cắt thẳng). Xong phải chụp soát kỹ chỗ nối.
- 🎨 PHIM: NHÂN VẬT PHẢI HOÀ VÀO CẢNH, không nổi như PNG dán lên nền (anh chốt 20/11, áp MỌI phim). Dựng ảnh trên LỚP RIÊNG rồi mới dán: bớt rực ảnh thật (~0.25–0.3)
  · multiply ánh môi trường · TỐI DẦN VỀ CHÂN · ánh hắt MỎNG từ phía nguồn sáng (dải màu phía trên — KHÔNG viền lệch nhiều hướng, thành đường viền bao) · mép mềm (lớp mờ dưới + lớp nét trên)
  · bóng tiếp đất + sương chân hình BẦU DỤC mềm (không hộp chữ nhật) · đám đông / vật xa: ngược sáng gần đen + nhạt dần theo xa. Mẫu: `sprBlend` trong docs/mau-phim/film-megaband.js.
- 📏 PHIM: hiệu ứng gắn vào CHI TIẾT của ảnh (lửa nến, mắt, miệng, tay cầm…) phải ĐO toạ độ bằng `tools/x/plate-grid.html` (phóng vùng + lưới số), KHÔNG ước lượng
  (anh 20/11: mắt gargoyle + nến đặt lệch — "phải rất để ý vị trí"). Bộ khung cùng khổ thì neo chung 1 tỉ lệ + điểm chân (không cắt sát từng khung → nhảy cỡ).
- PHIM: VFX vòng tròn toả (sóng âm hình vòng) anh chê "xấu lắm" (20/11) → không dùng; hiệu ứng nhạc = nốt, khuông nhạc, vạch nhấn, dây rung.

## 🎞️ Cảnh VFX nặng = dựng THEO LỚP (anh chốt 16/11)
- NỀN = chỉ khung cảnh (GPT, nét anime VẼ TAY: tô phẳng, 2–3 tông, viền mực — "NOT AI art"). Không nhân vật, không hiệu ứng.
- VẬT CÓ TƯƠNG TÁC (toà nhà bị húc đổ, đá bay, băng vỡ…) vẽ RIÊNG trên phông xanh → code gắn vào, cho gãy / đổ / nổ / bay. Meme (ảnh gốc) + effect cũng gắn bằng code.
- Có video mẫu → chụp khung làm khuôn bố cục. Cảnh anh dặn "làm cẩn thận" → VFX mạnh (sóng chấn bóp méo, tách RGB, impact frame, cháy trắng, bóng đen mắt sáng khi gồng).
- Mẫu: js/film-fin1f1.js (bảng `SHOTS` 2D, mỗi shot 1 góc tĩnh). Ảnh GPT PNG ~2.5MB → nén JPG 0.86 trước khi đưa vào `assets/`.

## 🎬 Phim — dựng
- Kịch bản trước (skill `viet-kich-ban`, mẫu `.claude/skills/viet-kich-ban/mau-cua-anh.md`) → anh duyệt → mới dựng (skill `dung-phim`). Đòn nào cũng có phản ứng (đỡ / né / trúng + bật lùi).
- Không giới hạn thời lượng: số anh nói là xấp xỉ, cần dài cho đủ cảnh thì cứ dài, không nén tới mức vội.
- CẮT CẢNH, không cho máy bám / trượt trong khung 3D. Mỗi pha 1 góc tĩnh.
- Nhịp: shot TB 1.3–1.8s nhưng NHANH – CHẬM ĐAN XEN (bùng nổ cực nhanh → khựng / thở → căng chậm). Không giãn đều. Không theo AMV. Mỗi trận 1 cấu trúc riêng.
- Pha nhanh (húc, lướt, tràng đòn) = vệt tốc độ / bóng mờ / smear + VFX va chạm, không cần vẽ người.
- Tỉ lệ nhất quán giữa vật khổng lồ và meme ở mọi góc (meme ~100–170 đơn vị thế giới). Vật khổng lồ trông to = đưa máy lại gần, không phóng to meme.
- Tiếng: mỗi cú 1 tiếng đúng chất, không dùng lại cho cú khác loại; cú nặng 2–3 lớp ('+'); ≤9 tiếng / 10s; nhạc lặng 0.3–0.7s trước cú quyết định. Nhạc: mỗi trận 1 bản epic chạy dài (không lặp đoạn ngắn), KHÔNG lồng giọng (anh 19/11): thoại + tên chiêu CHỈ bằng CHỮ trên màn hình — CHỈ TÊN CHIÊU, KHÔNG dòng mô tả (anh 23/11, vd chỉ "HOLLOW PURPLE").
- Sakuga / impact frame / Yutapon / explosion FX / sao 4 cánh: checklist ở skill `edit-video` mục 8.
- Video mẫu dài: không tự dò cả video → hỏi anh mốc phút, hoặc đọc phụ đề (rẻ) rồi chỉ chụp đúng đoạn cần.

## 🔎 Soát phim trước khi báo xong
- Chụp mỗi giây 1 khung (`film-check.js <id> --t …`, ≥360px) + soát cận mọi chỗ nối / nghi. Dò: vật che nhân vật, vật sát máy phình to, nhân vật lơ lửng / chìm, đi lùi, cỡ không đồng nhất, chỗ nối vũ khí / xích, khoá track bỏ trống z/y.
- 🪞 (anh 19/11 "so sánh là kĩ năng rất cần thiết") Có MẪU (GIF / video / ảnh anh gửi) → làm xong phải ĐẶT SONG SONG so: `tools/x/compare.js <id> --t … --ref tools/x/_ref/<mẫu> --rt …` (mỗi hàng: khung mình | khung mẫu), liệt kê từng điểm lệch, sửa, so lại rồi mới báo. GIF → bảng khung: `tools/x/gif-frames.html`.
- 🔊 Tiếng mới: đo lặng đầu (`tools/x/sfx-measure.html` → `__leadJson`) thêm vào `K.SND_LEAD` (js/cine-kit.js) — phim tự phát sớm cho tiếng khớp hình.
- `tools/x/film-lint.js` + `sfx-lint.js` phải SẠCH. Shotlist `js/shots/<id>.json` phải khớp giờ sau RETIME.

## 🎥 Xuất video
- 🎞️ (anh 23/11 — lỗi NGUY HIỂM NHẤT: xem phim Chill Guy tới giây 7 là treo cả máy) APP KHÔNG VẼ PHIM TRỰC TIẾP NỮA: rạp phim CHỈ phát video xuất sẵn.
  Xuất bằng `tools/x/film-video.js <id…> | --all` (Windows + Mac, không cần ffmpeg, 1280×720 30fps, ~1 phút / phim) → TỰ ĐẨY lên GitHub Releases "films"
  (`tools/x/film-release.js`, token ở `D:\tools\gh-release-token.txt` / Mac `~/.config/chaos-battle-lab/gh-release-token.txt` — không in, không commit) → ghi link vào `video/films.json`.
  ⛔ Video KHÔNG commit vào repo (`video/*.mp4` bị gitignore; repo không phình). Mỗi phim giữ 2 BẢN trên release (anh chốt): mới nhất + bản ngay trước (`prev` trong films.json); bản cũ hơn tự xoá.
  Sửa / thêm phim xong → chạy lại cho ĐÚNG phim đó rồi phát hành `video/films.json`. Video cho app KHÁC video YouTube (luật "chỉ xuất khi anh bảo" bên dưới là cho video YouTube 4K).
  Phim mới → thêm id vào `FILMS` (film-video.js) + rạp `openCinema` (game.js); tập nối nhiều phần = `FILM_PLAYLIST`.
- CHỈ xuất khi anh bảo rõ. Xuất xong không tự đổi tên video đã quay.
- 📂 (anh 21/11) Video xuất xong (phim lẫn trận) + thumbnail → để vào `~/Desktop/Meme Battles/` (thumbnail: thư mục con `<Tên> thumbnail/`). Quay ở `out/` trong repo (gitignore, không phải iCloud), xong mới chuyển file cuối sang; đoạn quay `*.chunks` giữ ở `out/` tới khi anh duyệt rồi xoá.
- Mọi video 50fps. Phim 4K (16:9 3840×2160, 9:16 2160×3840). Trận đấu giả lập: 9:16 dọc 3K 1620×2880.
- Phim chạy `render-cine … --cache --chunk 5` (chia đợt, tắt máy chạy lại đúng lệnh là tiếp). Mac: không chạy song song nhiều tiến trình (tràn RAM): render-cine `--jobs 3`, render-match `--par` ≤2.
- Trận giả lập phải TỰ NHIÊN, không can thiệp diễn biến (chỉ lọc seed). Ưu tiên thắng sát, 1vs1 ≤30s, trận đông ≤35s (`--want 3 --pdur 20-30`). Tên: "A vs B - Meme Battle".
- Skill `xuat-video` / `xem-video` / `video-sang-sprite` chỉ chạy trên Mac.

## 🏆 Leaderboard "Memes in the Multiverse" (anh chốt 18/11)
- ⛔ (anh 20/11) Quay xong KHÔNG ghi vào leaderboard — `render-match` / `render-duo` chỉ ghi LỊCH SỬ `tools/leaderboard/history.json`. `make.js` thấy Short đã lên kênh mới đưa lần quay mới nhất cùng tên vào `results.json` (khoá theo mã video). Trận quay ngoài 2 công cụ đó → `record.js` `record()` (cũng chỉ vào lịch sử).
- `node tools/leaderboard/make.js` → 2 ảnh 9:16 vào `~/Desktop/Meme Battles/0. Leaderboard/`: chỉ Short ĐÃ ĐĂNG (đọc tiêu đề kênh), từ 01/11/2026, bỏ tiêu đề "lore", mọi meme (chưa đấu = mờ cuối bảng), 2vs2 cả đội +1. Short chưa có kết quả → "Thieu ket qua.txt".
- Mac tự chạy 6h30 sáng thứ 2 (launchd `com.memeautobattler.leaderboard`, log `~/Library/Logs/meme-leaderboard.log`).

## Máy / công cụ
- Windows không có node / python / ffmpeg: Node mượn của VS Code (`ELECTRON_RUN_AS_NODE=1 "D:/Microsoft VS Code/Code.exe" file.js` hoặc `powershell -NoProfile -ExecutionPolicy Bypass -File tools/node.ps1 tools/x/X.js`). Công cụ chung ở `tools/x/*.js`.
- Ổ C gần đầy → mọi thứ để ổ D (`D:\0.van-phong-ao`, công cụ ở `D:\tools\`: codex-cli, codex-home, yt-dlp + deno). Video mẫu ở `D:\meme-anime-lab-videos\`, chép vào `tools/x/_ref/` (gitignore) để trình duyệt ngầm đọc.
- Trình duyệt ngầm: cổng 9455 (9333 hay bị phiên khác chiếm). `tools/x/serve.js` cổng 8765 (hỗ trợ tua video).
- ⚠️ (anh 17/11, máy báo tốn bộ nhớ) Tiến trình chạy ngầm (serve.js, Edge headless, cdp…): CẦN mới bật, dùng xong TẮT NGAY (`cdp.js --stop`, `serve.js --stop --port …`). Đang dùng liên tục lâu thì để; không dùng nữa thì tắt. Chỉ tắt tiến trình của mình (đừng giết server / trình duyệt của phiên khác, vd cổng 8798).
- Mac: repo ở `~/Projects/chaos-battle-lab` (18/11 chuyển khỏi Desktop vì iCloud "Optimize Mac Storage" dọn file repo thành file rỗng, kể cả .git). `~/Desktop/1. chaos-battle-lab` chỉ còn là lối tắt (symlink). Đừng đưa repo lại vào Desktop / Documents.
- Mac: iCloud còn có thể đổi tên `.git/index` thành `.git/index 2` → git thấy index RỖNG, commit chỉ còn vài file (Ver 651/652 ngày 17/11 làm hỏng site, đã khôi phục). `release.js` giờ tự chặn; gặp thì `git read-tree HEAD` rồi chạy lại.
- Làm ra công cụ / quy trình dùng lại được → tự đề xuất hoặc tạo skill mới.
- Ghi nhớ quan trọng → ghi vào FILE TRONG REPO (bộ nhớ Claude của từng máy không sang máy khác).

## Skill của repo (`.claude/skills/`)
`hoat-hoa-vfx` (18/11: vụ nổ lan từ tâm, tràng impact, mượt — js/vfx-boom.js) · `them-meme` · `tach-nen-anh` · `chay-thu` · `phat-hanh` · `xuat-video` (Mac) · `dung-phim` · `xem-video` (Mac) · `tao-vfx` · `ve-anh-gpt` · `viet-kich-ban` · `edit-video` · `tim-sound` (Mac) · `video-sang-sprite` (Mac).

## Phát hành
- Làm xong là TỰ ĐẨY lên `main` (anh đã dặn, không cần hỏi): Windows `tools/x/release.js --msg "…" --files a,b,c` (tăng số bản, gắn `?v=`, cập nhật assets-manifest.json, commit "Ver N: …", push). Mac `python3 tools/release.py "…"`.
