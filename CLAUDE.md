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

## Câu chat Beluga cho meme mới
- Thêm meme mới → **PHẢI thêm câu chat Beluga riêng** cho nó vào `BL_VS` (js/game.js): 6 câu kiểu Beluga — viết thường, ngơ ngác, hỏi ngu / trêu nhẹ, bám đúng meme + skill (vd Duolingo: "pls dont delete my streak").
- Kiểm tra nhanh: mọi key trong `CHAR_DEFS` (trừ `trainingdummy`, `fanchar`) đều phải có mặt trong `BL_VS`.

## Info / mô tả meme
- Dòng info hiện trong trận (`CHAR_BLURB_SHORT` trong js/game.js) là **1 câu đùa ngắn (≤8 từ)**, KHÔNG mô tả kỹ năng.
- Câu phải **đồng nhất giữa meme và skill**: vừa bám câu chuyện / nguồn gốc meme trên internet (câu thoại gốc, sự tích), vừa gợi đúng skill của nó trong game — vd Supreme Arbiter "It's over Anakin, I have the high ground." (đứng cao hơn địch), Fine Dog "This is fine. (The whole arena is on fire.)", Trollface "Swallowed. Spat into a wall. Problem?". Thêm meme / đổi skill thì viết lại info theo đúng quy tắc này.
- CTA "❤️ Like and Subscribe / to support your meme-bros" CHỈ hiện khi trận kết thúc có người thắng; trong trận luôn hiện info.

## Comment YouTube giới thiệu nhân vật
Khi người dùng nhờ viết info nhân vật "dưới dạng cmt youtube" (vd cho video "Joninn Cheems vs Electric Guitar Cat - Meme Battle"):
- **Tiếng Anh.** Mỗi nhân vật 1 đoạn: emoji + **tên in đậm**, rồi 1–2 câu.
- Nói ngắn nó làm gì, rồi tới **skill đặc biệt**: mốc kích hoạt bằng con số cụ thể (ngưỡng máu, số lần, tỉ lệ) → chuyện gì xảy ra.
- KHÔNG liệt kê chỉ số, từng loại triệu hồi hay dame chi tiết — chỉ con số chính của skill đặc biệt.
- KHÔNG đùa, không fun fact (khác với dòng info trong trận).
- Lấy cơ chế từ code (`CHAR_DEFS[..].skill`, `CHAR_BLURB`, hằng số) cho đúng số liệu.
- Người dùng góp ý sửa → CHỈ sửa đúng chỗ được chỉ, giữ nguyên phần còn lại (đừng tự thêm chi tiết).

Mẫu đã duyệt:

> 📮 **SUS Cat**: keeps summoning imposters to attack you. Once per match, when you drop below **200 HP**, it calls an **EMERGENCY MEETING**: a 50/50 vote, and if it hits you get ejected into space, instant death.
>
> 🦟 **Mosquito Violin**: touch it once and it strings you for the whole match. Then it plays violin, and **every beat of the song** damages you and drains your HP to heal itself.
>
> ⚔️ **Joninn Cheems**: slashes with Water Breathing and deflects bullets right back at the shooter. When you drop below **150 HP**, his next approach is a silent dash straight through you, and you die instantly.
>
> 🎸 **Electric Guitar Cat**: fires sound waves on every beat of the song. Below **30% HP** the guitar catches fire, and every wave sets you on fire.

## Phim (Meme Cinema) — TỈ LỆ là quan trọng nhất
- Giữ tỉ lệ nhất quán giữa vật thể khổng lồ và meme nhỏ ở MỌI góc máy: meme thường ~100–170, Gigachad khổng lồ ~1000, quỷ khổng lồ rộng ~2000, bom vĩ thú đường kính ~860 (đơn vị thế giới trong js/cine-war.js).
- Muốn vật khổng lồ trông to thì đưa máy quay lại gần / đổi góc, KHÔNG phóng to meme nhỏ lên cho vừa khung (làm vật khổng lồ trông bé đi). Chỉ phóng to khi kịch bản bảo nhân vật hoá to (vd Chonky to gấp 3 con quỷ).
- Chịu khó đổi góc máy (cận, góc thấp/ngước, qua vai, toàn cảnh) — đừng để cả cảnh chỉ là 1 khung rộng nhìn toàn canvas.

## Phân việc ảnh / hiệu ứng (anh dặn 27/10/2026)
- Ảnh NHÂN VẬT (thân, tóc, tư thế) do anh tự vẽ bằng ChatGPT rồi gửi. Claude CHỈ làm hiệu ứng / VFX / skill bằng code (hào quang, tia điện, nứt tường...).
  KHÔNG tự vẽ bộ phận nhân vật bằng code (đã làm tóc Goku cho Saiyan Marmot → anh bắt gỡ).

## Nhật ký gần đây (cho phiên sau nắm) — Ver 394, 27/10/2026
- 🦫 **Saiyan Marmot** (`saiyanmarmot`, meme mới): code khối `MM_*` / `_mm*` trong js/game.js.
  Thường: chạm là xô 45 + đẩy văng; đi đủ 2s → đứng gồng 1.5s (`marmot_scream`); lần 3 hét 3s (`marmot_ssj`) → Super Saiyan vĩnh viễn (hào quang vàng + tia điện vẽ code).
  SSJ: chạm → khựng 0.5s → bắn địch thẳng vào tường (34px/tick) → ghim 1s, 160 dame → tường vỡ (`mmWall`, mép mẻ giữ tới hết trận), địch rời đi thì vụn rơi (`mmFx` 'chunk', 2s sau biến mất).
  Lỗ cũ trùm ±0.8×size quanh điểm đập → địch bay ra ngoài sàn → `_susEject` (thua thẳng). Quân triệu hồi bị xử y hệt (ra ngoài thì `_forceKill`).
  Nạn nhân đang bị giữ/bay/ghim mang cờ `_mmHeld` (return sớm trong `_updateCore`, vị trí do `_mmWorldTick` cầm). Miễn bay: loooongcat, evillarry, chonkydog, berserk <30% (ăn 160 tại chỗ).
  Ảnh (anh gửi, đã đủ): dạng thường `MM_IDLE / MM_OPEN1 / MM_OPEN2 / MM_SCREAM / MM_PUSH` (Ver 402); Super Saiyan tóc vàng `MM_SSJ_IDLE / MM_SSJ_PUSH` (Ver 406,
  tách nền xanh, cao 420, chân chạm đáy, mặt quay TRÁI; vẽ to thêm 15% vì tóc chiếm phần trên → thân bằng cỡ dạng thường). `MM_SSJ_SCREAM` không dùng.
  Ảnh mới quay mặt PHẢI thì bỏ `saiyanmarmot` khỏi 2 danh sách quay-mặt-trái (facingDefault + `_selSideRender`).
- ⚔️ **Catvader — vùng Force** (Ver 395): `_cvForce*`, `CV_FORCE_*`, `CV_SYS`. 5s/lượt, có đạn địch trong vùng → mở vùng 0.75s, rộng đúng 1/4 diện tích sân (`_cvR`),
  Catvader ĐỨNG YÊN; không gian trong vùng bị bóp méo (`_cvWarp`: vành khuyên vẽ lại canvas phóng/thu theo sóng) + gợn Matrix quanh từng viên (`_cvMatrixRipple`);
  MỌI đạn địch trong vùng chậm còn 5% tốc, đổi sang phe Catvader; hết 0.75s đẩy hết về phía địch (nhanh hơn 35%, đúng dame gốc), rồi đi lại bình thường.
  Anh mô tả "giống Zilean" chỉ để hiểu ý vùng làm chậm — KHÔNG thêm khiên/tăng tốc như skill Zilean.
  Bắt mọi hệ đạn: `projectiles` giữ nguyên hình gốc; búa Stalin dùng chế độ `_slHammerRefl` sẵn có; hệ riêng trong `CV_SYS` (chảo, táo, hoa, mũi tên Loading,
  batarang, dao boomerang, cầu code Hecker, chữ Duolingo, đờm/mầm Cough Cat, lọ độc Sus Dog) → cuối khung `_cvForceSnapFrame` CHỤP hình vật thể trên canvas
  (tách nền = màu trung bình viền mảng), gỡ khỏi hệ cũ, thay bằng đạn Catvader `isCvSnap` mang đúng hình đó. Thêm hệ đạn mới → thêm 1 dòng vào `CV_SYS`.
  Không bắt: quả đất Gary, liềm Stalin (vật nảy cả trận, gỡ là hỏng skill), tia laze tức thời (Gundam, Duolingo, King Cheems...).
- 🥷 **Ninja Cat**: Sharingan không bao giờ đâm vào mặt nữa — lưng địch sát tường thì NHỊN (`_njWait`, giữ lượt), địch có chỗ sau lưng là cast ngay; đã tan khói mà địch lùi sát tường thì ẩn chờ thêm ≤1.5s rồi hiện lại, trả lượt.
  Lúc đâm khoá hướng nhìn địch (`_njFaceBy` / `_njFaceL` ở chỗ tính `shouldFaceLeft`) để nó không quay lại nhìn Ninja.
- 🧪 Máy Windows của anh không có node/python: chạy thử trận + phát hành bằng skill `chay-thu` / `phat-hanh` (công cụ `tools/x/`). Cổng 9333 thường bị trình duyệt của PHIÊN KHÁC chiếm → dùng 9455.

## Skill của repo (`.claude/skills/`, thêm 28/10/2026)
- `them-meme` (danh sách việc thêm meme mới) · `tach-nen-anh` (ảnh ChatGPT nền xanh → khung game) · `chay-thu` (chạy thử trận bằng Edge headless) · `phat-hanh` (đẩy bản mới không cần python)
  · `xuat-video` (CHỈ Mac: phim + trận đấu giả lập; chỉ quay lại đoạn bị sửa).
- **Chuẩn video (anh dặn 28/10/2026), áp cho cả phim lẫn trận đấu giả lập: 16:9 → 4K 3840×2160 · 9:16 → 2K 1440×2560.**
- **Xuất video trên MacBook: KHÔNG chạy nhiều tiến trình song song** — anh dặn chạy nhiều nhân làm máy vừa LAG vừa LÂU hơn.
  Nguyên nhân (anh xác nhận): TRÀN RAM — mỗi tiến trình là 1 trình duyệt giữ canvas 4K (~1–2GB), 6 cái → hết RAM, máy phải swap ra ổ đĩa.
  render-cine mặc định `--jobs 3` (đừng tăng), render-match không dùng `--par` > 2. Ghi nhớ quan trọng → ghi vào FILE TRONG REPO này
  (bộ nhớ Claude của từng máy không sang máy khác — ghi chú cũ về chuyện này nằm ở máy Mac nên phiên Windows không thấy).
- Công cụ chung Mac + Windows ở `tools/x/*.js` (Node thuần, không npm): Mac `node tools/x/X.js`, Windows `powershell -NoProfile -File tools/node.ps1 tools/x/X.js`
  (máy Windows không có node → `tools/node.ps1` mượn Node của VS Code). `tools/release.py` / `tools/render-match.js` cũ vẫn giữ cho Mac.
- Làm ra công cụ / quy trình dùng lại được → TỰ đề xuất (hoặc tạo) skill mới, đừng để anh phải hỏi.

## 🚧 ĐANG LÀM DỞ (28/10/2026, hết token) — bộ dựng phim anime. Đọc mục này trước khi làm tiếp
Mục tiêu anh đặt: Claude dựng được ~70–75% cảnh bất kỳ anh yêu cầu, đặc biệt cảnh COMBAT NHANH kiểu anime, góc máy liên tục, góc khó
(ảnh mẫu: góc cao chéo từ trên xuống, 2 nhân vật xoay người, khói + vệt chém + năng lượng — kiểu Jujutsu Kaisen). Anh đã "chốt hết", nhưng:
- **3D: TẠM DỪNG** (anh: "khó nhằn thì bỏ qua, anime ngày xưa vẽ tay"). Đã thử được (giữ lại để dùng sau nếu cần, chỉ cho vài cảnh chính, không lạm dụng):
  `tools/x/img23d.js` — ảnh → mô hình .glb MIỄN PHÍ qua demo Hunyuan3D-2 trên Hugging Face (không cần tài khoản; bước tô màu của demo đang hỏng → dùng `--shape-only`);
  ra `assets/3d/doge.glb` (Buff Doge), `assets/3d/cheems.glb` — đúng dáng mọi góc, CHƯA có mặt meme (định chiếu ảnh gốc lên mặt trước) và CHƯA có xương/động tác.
  `tools/x/view3d.html?src=assets/3d/doge.glb` = xem 4 góc kiểu toon + viền đen. Three.js r160 ở `js/vendor/three/` (đã sửa import tương đối).
  TRELLIS demo hỏng (lỗi null); Tripo/Meshy/Mixamo cần đăng nhập → anh NGẠI đăng nhập nhiều tool, chỉ chịu chi ≤10$ và phải gọi API được từ Claude.
- **Hướng anh đang chờ duyệt (đề xuất cuối):** "anime vẽ tay kiểu tiết kiệm":
  1) Claude viết bảng phân cảnh + CÂU LỆNH ChatGPT cho từng KHUNG CHÍNH (góc máy như ảnh mẫu, phong cách anime nhất quán) → anh dán vào ChatGPT, gửi ảnh lại;
  2) Claude làm chuyển động bằng code: giữ khung, lia/đẩy máy trên ảnh, rung, smear, impact frame, khói, vệt chém, năng lượng, cắt nhịp nhạc;
  3) thử thêm (miễn phí trước): ToonCrafter (nội suy khung chèn giữa cho hoạt hình), Wan 2.x image→video trên Hugging Face; trả phí thì Kling (~10$/tháng, có API).
  Bài thử đầu: cảnh đánh ~5s **Doge vs Cheems** như ảnh mẫu → anh xem rồi quyết.
- **Chưa làm:** skill `xem-video` (ffmpeg tách cảnh theo chỗ cắt máy → bảng ảnh 3 khung/cảnh có giây, nhịp nhạc, bản phác nét đen trắng; yt-dlp tải link YouTube
  ĐÚNG đoạn anh ghi; anh sẽ gửi LINK kèm mốc giây), `cine-kit` (bộ dựng phim dùng chung: máy quay theo tên shot, hiệu ứng anime, khung chạy phim/xuất video
  chung để mỗi phim chỉ khai báo shot — phim cũ js/cine-*.js mỗi file tự viết lại hết), skill `dung-phim` (quy trình: kịch bản → bảng phân cảnh anh duyệt →
  danh sách ảnh cần vẽ → dựng từng cảnh → xem thử thấp → `xuat-video`). Ghi luật: 3D chỉ cho vài cảnh chính.
- Công cụ mới đã có: `tools/x/cdp.js` thêm `goto <path>` và `waitfor <js>` (xem đầu file).

## Phát hành
- **Làm xong là TỰ ĐẨY LÊN `main` luôn** (người dùng đã dặn, không cần hỏi lại): commit trên nhánh làm việc rồi `git push origin HEAD:main` (fast-forward).
- Đừng tự thêm tính năng/hiệu ứng người dùng không yêu cầu; muốn thêm thì hỏi trước.
`python3 tools/release.py "mô tả"` — tăng số bản (GAME_VERSION), gắn `?v=` cho css/js, cập nhật assets-manifest.json, commit + push.
