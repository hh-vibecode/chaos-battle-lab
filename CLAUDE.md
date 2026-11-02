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

## ⚠️ GHÉP NỐI PHẢI KHÉO — không bao giờ để lộ mối ghép (anh dặn 2/11/2026, áp cho MỌI phim + VFX game)
- Mọi chỗ 2 thứ gặp nhau (cánh tay ↔ bàn tay, vật ↔ bóng tối nó chui ra, ảnh cắt ↔ nền, hiệu ứng ↔ nhân vật, cảnh ↔ cảnh) phải có
  PHƯƠNG ÁN xử lý trước khi vẽ, không ghép đại: cùng nét/chất liệu ở chỗ nối (đúng bề ngang, đúng hướng, cùng kiểu vệt sáng),
  gốc chìm dần vào bóng tối / khói phủ lên mép (KHÔNG có mép cắt thẳng), ảnh bị cắt mép thì mờ dần mép, vật không vắt ngang vật khác vô lý.
- Ví dụ đã sửa: tay bóng tối trong Prologue lúc đầu là ống trơn viền tím + ảnh bàn tay dán vào đầu → anh chê "như gắn vào";
  giờ cánh tay vẽ CÙNG NÉT ảnh tay (chép `_hmArmSprite`), cổ tay khớp bề ngang ảnh, gốc tay khói bão phủ dày → mỏng dần (`shadowArm(...,{root})` trong js/film-l2pro.js).
- Bớt chi tiết thừa khi cảnh rối (anh bỏ hết xúc tu phụ ở cảnh bão: "lộn xộn quá"). Xong cảnh nào phải chụp khung soi kỹ CHỖ NỐI trước khi báo xong.

## Phim (Meme Cinema) — TỈ LỆ là quan trọng nhất
- Giữ tỉ lệ nhất quán giữa vật thể khổng lồ và meme nhỏ ở MỌI góc máy: meme thường ~100–170, Gigachad khổng lồ ~1000, quỷ khổng lồ rộng ~2000, bom vĩ thú đường kính ~860 (đơn vị thế giới trong js/cine-war.js).
- Muốn vật khổng lồ trông to thì đưa máy quay lại gần / đổi góc, KHÔNG phóng to meme nhỏ lên cho vừa khung (làm vật khổng lồ trông bé đi). Chỉ phóng to khi kịch bản bảo nhân vật hoá to (vd Chonky to gấp 3 con quỷ).
- Chịu khó đổi góc máy (cận, góc thấp/ngước, qua vai, toàn cảnh) — đừng để cả cảnh chỉ là 1 khung rộng nhìn toàn canvas.

## Phân việc ảnh / hiệu ứng (anh dặn 27/10/2026)
- Ảnh NHÂN VẬT (thân, tóc, tư thế) do anh tự vẽ bằng ChatGPT rồi gửi. Claude CHỈ làm hiệu ứng / VFX / skill bằng code (hào quang, tia điện, nứt tường...).
  KHÔNG tự vẽ bộ phận nhân vật bằng code (đã làm tóc Goku cho Saiyan Marmot → anh bắt gỡ).

## Nhật ký gần đây (cho phiên sau nắm) — Ver 394, 27/10/2026
- 🦫 **Scream Marmot - The Last Saiyan** (`saiyanmarmot`; đổi tên 31/10, trước là Saiyan Marmot): code khối `MM_*` / `_mm*` trong js/game.js.
  Thường: chạm là xô 45 + đẩy văng; đi đủ 2s → đứng gồng 1.5s (`marmot_scream`); lần 3 hét 3s = 4 nhịp to dần, nhịp cuối ngắn nhất, lấy hơi ngắn giữa nhịp (`marmot_scream_ssj`, anh dặn 31/10) → biến hình kêu `marmot_ssj` → Super Saiyan vĩnh viễn (hào quang vàng + tia điện vẽ code).
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
  · `xuat-video` (CHỈ Mac: phim + trận đấu giả lập; chỉ quay lại đoạn bị sửa) · `dung-phim` (dựng phim anime bằng cine-kit) · `xem-video` (CHỈ Mac: video mẫu → bảng cảnh) · `tao-vfx` (VFX shader cho game + phim).
- **Chuẩn video, áp cho cả phim lẫn trận đấu giả lập: 16:9 → 4K 3840×2160 · 9:16 DỌC → 3K 1620×2880 (anh chốt 30/10: dọc là 3K, phim dọc `--scale 1.5`).** Anh không nói khung → mặc định DỌC 3K.
- 🏆 **Trận đấu giả lập LUÔN ưu tiên THẮNG SÁT, video dài 20–25s** (anh dặn 30–31/10): chạy thử nhiều seed, gom ≥3 trận đúng bên thắng VÀ video ~20–25s (`--want 3 --dur 20-25`) rồi lấy trận con thắng còn ÍT máu nhất (`tools/render-queue.sh`).
- **Xuất video trên MacBook: KHÔNG chạy nhiều tiến trình song song** — anh dặn chạy nhiều nhân làm máy vừa LAG vừa LÂU hơn.
  Nguyên nhân (anh xác nhận): TRÀN RAM — mỗi tiến trình là 1 trình duyệt giữ canvas 4K (~1–2GB), 6 cái → hết RAM, máy phải swap ra ổ đĩa.
  render-cine mặc định `--jobs 3` (đừng tăng), render-match không dùng `--par` > 2. Ghi nhớ quan trọng → ghi vào FILE TRONG REPO này
  (bộ nhớ Claude của từng máy không sang máy khác — ghi chú cũ về chuyện này nằm ở máy Mac nên phiên Windows không thấy).
- Công cụ chung Mac + Windows ở `tools/x/*.js` (Node thuần, không npm): Mac `node tools/x/X.js`, Windows `powershell -NoProfile -File tools/node.ps1 tools/x/X.js`
  (máy Windows không có node → `tools/node.ps1` mượn Node của VS Code). `tools/release.py` / `tools/render-match.js` cũ vẫn giữ cho Mac.
- Làm ra công cụ / quy trình dùng lại được → TỰ đề xuất (hoặc tạo) skill mới, đừng để anh phải hỏi.

## 🎬 Bộ dựng phim anime (bắt đầu 28/10, dựng xong khung 29/10/2026)
Mục tiêu anh đặt: Claude dựng được ~70–75% cảnh bất kỳ anh yêu cầu, đặc biệt cảnh COMBAT NHANH kiểu anime, góc máy liên tục, góc khó
(ảnh mẫu: góc cao chéo từ trên xuống, 2 nhân vật xoay người, khói + vệt chém + năng lượng — kiểu Jujutsu Kaisen).
- **Đã có (29/10):** `js/cine-kit.js` = bộ khung chung (máy quay 2.5D: bay vòng / góc cao chéo / ngước / qua vai / nghiêng; sân đá phối cảnh + trời + núi;
  khói toon, sóng xung kích, vệt chém, hào quang theo bóng nhân vật, tia lửa, đá văng, speed lines, khung impact, chữ tượng thanh; khung chạy + bảng điều khiển + xuất offline).
  Phim mới chỉ cần `js/film-<id>.js` gọi `CineKit.film({...})`; `playCineKit(id)` trong game.js tải khi bấm; `tools/render-cine.js <id>` tự nhận phim cine-kit.
  Bài thử: `js/film-dvc.js` — Buff Doge vs Samurai Cheems ~7.6s (Meme Cinema → 🧪 Anime Lab). Dùng ảnh có sẵn (Buff Doge P1–P5/haki, Samurai Cheems đứng/quay lưng/chém).
  Skill: `dung-phim` (quy trình + API + mẫu câu lệnh ChatGPT vẽ khung chính), `xem-video` (`tools/xem-video.py`: file hoặc link YouTube + mốc giây → bảng cảnh theo chỗ cắt máy, 3 khung/cảnh, nhịp, nét phác).
- **VFX sinh bằng shader (29/10):** `js/vfx-gl.js` (aura lửa bám dáng người 7 preset + chỉnh tự do, hậu kỳ sóng bóp méo / zoom blur / tách màu / khí nóng), nạp sẵn trong game + phim;
  xem trước bằng `tools/vfx-preview.js` (bảng khung + mp4). Sét manga `VfxGL.boltSet`, khói/hơi `VfxGL.puff`, tô lại bộ phận (tay haki/giáp/đổi màu) `tools/part-paint.py`. Skill `tao-vfx`. Anh dặn: VFX dùng rất nhiều từ game tới phim → ưu tiên CÔNG CỤ sinh hiệu ứng, không vẽ khối tay, không ảnh VFX có sẵn.
- **Chờ anh:** xem bài thử trong Anime Lab rồi quyết hướng; nếu chốt "anime vẽ tay kiểu tiết kiệm" → anh vẽ khung chính bằng ChatGPT theo mẫu lệnh trong skill `dung-phim`.
- **Chưa làm / để sau:** ToonCrafter (nội suy khung chèn giữa), Wan 2.x image→video trên Hugging Face (miễn phí), Kling (~10$/tháng, có API).
  Chuyển phim cũ (js/cine-*.js) sang cine-kit — chưa cần, chỉ dùng cho phim mới.
- **3D: TẠM DỪNG** (anh: "khó nhằn thì bỏ qua, anime ngày xưa vẽ tay"). Giữ lại để dùng sau nếu cần, chỉ cho vài cảnh chính, không lạm dụng:
  `tools/x/img23d.js` — ảnh → mô hình .glb MIỄN PHÍ qua demo Hunyuan3D-2 trên Hugging Face (không cần tài khoản; bước tô màu của demo đang hỏng → dùng `--shape-only`);
  ra `assets/3d/doge.glb` (Buff Doge), `assets/3d/cheems.glb` — đúng dáng mọi góc, CHƯA có mặt meme và CHƯA có xương/động tác.
  `tools/x/view3d.html?src=assets/3d/doge.glb` = xem 4 góc kiểu toon + viền đen. Three.js r160 ở `js/vendor/three/`.
  TRELLIS demo hỏng (lỗi null); Tripo/Meshy/Mixamo cần đăng nhập → anh NGẠI đăng nhập nhiều tool, chỉ chịu chi ≤10$ và phải gọi API được từ Claude.
- Công cụ: `tools/x/cdp.js` có `goto <path>` và `waitfor <js>` (xem đầu file).

## 🪨 Sân đấu mới (30/10/2026) — sân đá tím lơ lửng kiểu TFT + nền trời vũ trụ
- Nền ngoài sân: `_skyDraw` (trời tím than + tinh vân bake sẵn; sao lấp lánh + sao băng tính theo `tick`). Sân: `_floorBuild/_floorDraw` (mặt sân + gờ + khối đá đảo bay + pha lê góc), viền nạm: `_buildArenaEdge` (vạch line + hạt đá quý).
- ⚠️ **KHÔNG BAO GIỜ tô 1 màu phẳng `PAPER_BG` để "xoá"/"khoét" sàn** (sàn có hoạ tiết → lộ mảng). Dùng:
  - `_bgRepaint(pathFn)` = vẽ lại NỀN SẠCH (trời + mặt sân) vào vùng — xoá dấu vết trên sàn (vd Shinra Tensei).
  - `_skyRepaint(pathFn)` / `_skyFillClipped()` = khoét XUYÊN sàn/tường, lộ vũ trụ bên dưới (Hollow Purple, tường thủng).
  - `_floorShatter(x,y,R,{n,hold,crack,ripple})` = mặt sân NỨT thành mảnh Voronoi (d3-delaunay, `js/vendor/d3-delaunay`) → rơi xuống vũ trụ → tự liền sau `hold` tick. Chỉ là hình. Chưa gắn skill nào — chỉ gắn khi anh chọn. ⚠️ Gigachad KHÔNG làm vỡ sàn (chỉ hiệu ứng đấm nứt kiểu Râu Trắng của Boxing Cat — anh dặn 30/10).
- 🟪 Mặt sân = Ô ĐÁ RẤT MỜ (lưới 60px trong `_paintFloorTop`). 30/10 đã thử cỏ tím (Ver 436–438) → anh bỏ: "rối mắt, canvas đã rối sẵn rồi" — mặt sân phải TĨNH, ÍT CHI TIẾT.
  Sau này có thể thêm SKIN sân (anh định, chưa làm) — vẫn giữ nguyên tắc nền mờ, không lấn meme/VFX.
- 🗿 Gigachad trong game: ảnh ĐẤM THẲNG (`GC_PUNCH`) CHỈ dùng ở dạng KHỔNG LỒ; dạng thường đấm bằng avatar. Ảnh đấm móc anh chê sai → đã xoá (30/10), đừng thêm lại.
- 🗿 Gigachad KHỔNG LỒ (30/10): KHÔNG bó thân trong sân (tường trái/phải/trên chỉ chặn theo cỡ lúc vừa hoá to, tường dưới chặn theo mép ảnh → chân luôn đứng trên sân);
  máy quay lùi ra ôm trọn người + cả sân (`_gcCamBox`); thân đè lên đoạn viền nào thì đoạn đó vỡ tới hết trận, viền trên thủng rồi thì chữ tiêu đề vỡ (`_gcBreakTick`).
  VFX cú đấm của Gigachad chỉ to ~2× nắm đấm (`GC_FIST_R`), đặt đúng nắm đấm trong ảnh; bậc thấp chỉ quả cầu tròn, không tối cả sân. Anh nói nếu cách này không ổn sẽ khoá size tối đa.
- 😿 Depressed Cat — Shinra Tensei (31/10): sóng quét tới đâu SÀN TAN tới đó (`_skyRepaint`, không còn hố đất), tảng vỡ rơi xuống vũ trụ; hết cảnh nó lơ lửng 1s
  (`psAfter`) rồi cổng KAMUI (`_njKamuiAt`) xoáy nó đi mất (`_dpSuck` → `_dpGone`).
- 🦟 Mosquito Violin (1/11): VFX bám NHẠC THẬT. Đọc phổ qua `_musicLv` / `_musicK` (dùng `f._pianoBuf` đã lấy sẵn, đừng gọi analyser lần 2; bản dựng video tính phổ từ file nhạc nên vẫn đúng).
  Muỗi: `_mvDrawString` (dây rung, gảy theo nhịp, là ống máu, giọt máu trôi theo dây), `_mvDrawBow` (vệt vĩ), mvFx 'big' (nhịp mạnh: không gian gợn + tách màu). Guitar: VFX sét/phổ/hào quang lửa (Ver 457) anh chê đau mắt → đã gỡ, sóng về như cũ, 15 dame (Ver 462).
- 🎸 Guitar Cat tư thế (Ver 464, anh chốt): 1 LOOP CỐ ĐỊNH 11 ảnh `EG_LOOP` (4 ảnh cũ đan xen 7 ảnh mới), mỗi nốt sang 1 ảnh, nhịp phải ĐỀU. Đã thử chọn ngẫu nhiên / theo cao trào / chèn giữa loop → anh bỏ hết. Ảnh mới ở assets/img/electricguitarcat: nền navy nên tách bằng độ dư xanh B−R, không dùng gkey; cả 11 ảnh (kể cả 4 ảnh cũ dựng lại thành EG_O1–4) cùng ô vuông 980px, cùng chiều dài cây đàn (đầu cần → mép xa thân đàn), cùng mức chân: anh đòi size các tư thế ngang nhau.
- 🎧 Azel (31/10): đạn nâng cấp kiểu "dope" — dải đuôi neon (`_azRibbon`), tách màu RGB, thanh equalizer, sét lách tách, WUB/bass drop BÓP MÉO không gian (`_azWarp`).
  Anh: "giờ chỉ quay video, không dùng game trực tiếp → không sợ nặng, nâng cấp VFX thoải mái".
- ⚠️ Hiệu ứng động của nền/sân KHÔNG dùng `Math.random` (băm theo `tick`/toạ độ — `_skH`) → không xáo chuỗi random có seed của trận (quay video phải khớp lúc chạy thử).

## 🎬 Meme Lore 2 · Ep 0 "The Truth" (31/10) — `js/cine-lore2ep0.js`
- Sự thật đằng sau cảnh cửa sổ Ep 1, KHÔNG thoại: hẻm tối (Hamster bị 2 tay bóng tối đuổi, vả vào góc) → Chill Guy đá gãy 1 tay, ôm Hamster chạy, bị cào lưng
  → thềm nhà Ep 1 (mèo trắng đi làm về) → trong phòng băng bó, cúi ngó Hamster → bóng chồng trên cửa sổ → Depressed Cat hiểu lầm → nụ cười Friend trong khe hẻm tối.
- Dựng trên engine Ep 1 (phố/nhà/cửa sổ/bó hoa/mặt bầm CHÉP sang để khớp từng nét) + xuất offline: `node tools/render-cine.js l2e0 out.mp4 --scale 1.5`.
- Ảnh anh vẽ: `assets/img/cine/EP0_*` (KICK, RUN, DOWN, BANDAGE, WIFE_WALK, WIFE_HOLD). Chuột phải NHỎ (cao ~56 cạnh Chill Guy ~175).

## 🍞 Bread Cat - The Infinity Cosmic Power (`breadcat`, 2/11/2026) — khối `BC_*` / `_bc*` trong js/game.js
- Anh thiết kế: KHÔNG đánh thường. Cơ chế chốt 2/11 (thay bản bánh trôi nảy + đập trúng lưng): mỗi 3s (`BC_DROP_T`, kể cả lúc đang xoay) 1 lát bánh mì bơ (vẽ bằng code)
  RƠI TỪ THIÊN ĐƯỜNG rất chậm (4s, `BC_FALL_T`) xuống 1 điểm bất kì: cột sáng mềm từ đỉnh khung, bóng to dần trên sàn, bụi vàng, đung đưa như lá. Tối đa 4 lát nằm trên sàn (lát cũ tan).
  Mèo đi tới lát gần nhất ĐÃ CHẠM SÀN (không đuổi lát đang rơi); nhặt được → +100 máu (giữ từ bản cũ, em tự giữ) rồi MỚI xoay → BREAD PARADOX (nghịch lý mèo bơ):
  mèo cõng bánh mì xoay 3D quanh TRỤC NGANG (trục X) như GÀ QUAY XIÊN QUE (anh chốt 2/11, em từng hiểu nhầm thành con quay trục đứng): 90° thấy nóc bánh mì,
  180° lộn ngược, 270° thấy bụng/chân. Hiệu ứng theo GIF mẫu `cat-toast.gif` (đèn chớp, cột sáng, mưa tia lửa, vòng sáng 2 bên, hắt xanh), TĂNG DẦN trong 4s (`_bcI`, `_bcStage`):
  0–1s chỉ xoay chậm → 1–2s vòng sáng → 2–3s cột sáng + tia lửa + đèn chớp lác đác → 3–4s chớp dồn dập, sân tối, rung mạnh, hắt xanh.
  3D thật: `tools/x/inflate3d.html` thổi phồng ảnh 2D thành khối (viền ảnh → vòm phồng, mặt sau = ảnh lật, không cần mạng/tài khoản) rồi chụp sẵn 48 góc →
  `assets/img/breadcat/BC_SPIN.png` (lưới 8 cột, ô 256px, `_bcCyl` chọn khung theo góc). Đã thử + bỏ: lật thẻ phẳng (90° thành vạch), xếp lớp dày (sọc/bóng đen dày), quấn hình trụ (hình nơ).
  Cần 1 meme/đồ vật xoay 3D khác → dùng lại tool này (`?src=...&axis=x|y&n=48&fw=256&depth=0.6`). Phải xoay đủ 4s (216 + 24 tick co lại) mới nổ; đang xoay mà dính 3 đòn (DOT/cháy không tính)
  → `_bcBreak` gãy nghịch lý (3 chấm đỏ đếm đòn trên đầu). Không còn bất tử, không đứng hình cả sân (anh dặn 2/11).
  BIG BANG: xoá sổ mọi địch kiểu Hollow Purple (`_mwErased`, không xác) + `_summonFoes` → loé TRẮNG TINH (`_bcWhiteDraw`, không sàn/viền/chữ), chỉ còn
  ổ bánh mì BC_LOAF lơ lửng, thanh máu ghi ∞ → hết trận. Tiếng: `bc_spin` (myinstants jet-engine-startup, rít to dần), `bc_zap` (điện chập lúc đèn nháy).
- Ảnh anh gửi (Desktop): dạng thường mèo Xiêm nằm (BC_IDLE, quay mặt TRÁI), BC_BUTTER + BC_LOAF tách từ tấm 2 ảnh. Con số (100 máu, 3s, 200 tick xoay) em tự đặt.
- Anh gửi TikTok mẫu effect (@ai.disruptor/video/7593888307130649859) — trình duyệt chạy ngầm trên Windows KHÔNG mở được video TikTok; Mac dùng skill `xem-video` để xem và chỉnh lại effect cho giống.

## 🌌 Meme Lore 2 · Prologue "The Dark Age" (2/11/2026) — `js/film-l2pro.js` (cine-kit, id `l2pro`, 16:9, 170s)
- Anh yêu cầu: phim dài 2:30–3:00, NGANG, kiểu visual novel (chữ dẫn truyện tiếng Anh ở dải đen dưới, hiện từng từ, tên có màu: Friend tím, Supreme vàng, The Void trắng)
  + hình minh hoạ vũ trụ. Anh dặn "phải hoành tráng, không là trông ngáo" → bóng to, máy trôi chậm, sao/tinh vân nhiều lớp, gợi tả hơn là đánh nhau lộ liễu.
- Mạch: Dark Age (sao → thế giới → Friend mở mắt sau hành tinh → xúc tu đâm lõi, hành tinh vỡ → nuốt từng thế giới) → tàn lửa cơn giận → 3 ngôi sao →
  Supreme Cat · Bread Cat · Flower Cat (bảng tên bên TRÁI, nhân vật lệch PHẢI) → chiến tranh (vũ trụ bong bóng vỡ) → The Void mở mắt sau lưng Friend → hố đen phản bội
  → phong ấn (4 điểm: 3 Supreme + mắt Void) → Friend vỡ 5 mảnh bay vào 5 vũ trụ → kỷ nguyên ánh sáng → "Until now……" → mảnh vỡ mở mắt + tên phim.
- Không dùng máy quay 2.5D: `shots` giả, mỗi cảnh vẽ 2D toạ độ 960×540 với `cam()` riêng. Mốc giờ ở object `T`; chữ ở `LINES` / `PLATES`.
- **Bread Cat**: anh gửi 1 tấm 2 ảnh (Desktop) — ảnh 1 mèo kẹp bánh mì bơ, ảnh 2 mèo ổ bánh mì. Anh: "nó xoay infinity rồi thành dạng 2, dùng ảnh 2".
  → `L2P_BUTTER.png` (ảnh 1) chỉ dùng lúc xoay theo vệt ∞ rồi loé sáng; `L2P_BREAD.png` (ảnh 2) là dạng chính ở mọi cảnh sau.
- Ảnh The Void có quầng trắng dưới đáy, Flower Cat là ảnh bán thân cắt mép trái + đáy → `pic(...,{fadeB})` làm mờ mép (cả viền sáng / tô màu đi theo ảnh đã mờ).
- **cine-kit có nhạc nền** từ bản này: `def.mus=[{src,ra,rb,vol,off,fi,fo,loop}]` — xem trong game phát theo đồng hồ phim (tua / dừng đúng chỗ), xuất video render-cine trộn từ `info().mus`.
  Nhạc phim này là TẠM (ghép cine_ambient_war / cine_horns / cine_epic / cine_heart). Cần 1 bản nhạc vũ trụ không bản quyền ~2:50 → tìm trên Mac (skill `tim-sound`), thay mảng `mus`.
- Xuất: `node tools/render-cine.js l2pro out.mp4 --wide --4k --cache --webcodecs --hw` (Mac, jobs mặc định 3 — đừng tăng).
- 🎙️ **LỒNG TIẾNG** (2/11): MiniMax Audio (minimax.io/audio, anh đã đăng nhập, gói free 10.000 credit) qua tiện ích Claude in Chrome,
  giọng **"Dota Voice"** (My Voices của anh), model speech-2.8-hd. Cách nhanh: dán CẢ kịch bản 1 lần, giữa các câu `<#2#>` (lặng 2s) → 1 file
  → tải MP3 (nút tải → MP3; Chrome có thể để tên `.tmp` trong Downloads — file vẫn đủ, kiểm đầu file `ID3`) → `assets/audio/vo/l2pro_narration.mp3`
  → dò quãng lặng ≥1s bằng WebAudio trong trình duyệt chạy thử → mảng `SEG`; mỗi câu là 1 mục `mus` có `off` = chỗ bắt đầu trong file (`VO`, `VO_AT` trong film-l2pro.js).
  Tiện ích Chrome chỉ nối khi đăng nhập claude.ai CÙNG tài khoản với Claude Code. Làm xong ĐÓNG tab đã mở (anh dặn).
  Giọng TTS hay lỗi đọc → anh nhắc "nghe chuẩn ngữ pháp": Claude không tự nghe được, phải nhờ anh nghe lại bản đọc.

## 🔊 Luật sound (anh dặn)
- (30/10/2026) **KHÔNG mượn sound SIGNATURE của meme khác** (tiếng gầm, nhạc theme, giọng, câu cửa miệng) cho meme / nhân vật khác — vd Friend gầm KHÔNG được dùng tiếng gầm của Gigachad (`titan_roar`/`gigachad_roar`).
  Tiếng hit, vút, va chạm, nổ, vỡ kính, phép chung thì dùng chung được. Thiếu tiếng riêng → tìm mới (myinstants trước).
- Phim: chạy `node tools/sfx-audit.js <phim> <scratchpad>/audit` để soát (tiếng chưa khai, khoảng lặng đầu file, chồng tiếng, nghi có giọng).
- Tìm / cắt / đo tiếng mới: skill **`tim-sound`** (`tools/sfx-find.py search|cut|measure` — myinstants → bảng phân tích → cắt đúng đỉnh → dòng SND_LUFS dán sẵn).

## 💡 Ý tưởng chờ làm (anh dặn lưu lại)
- (30/10/2026) ⚠️ **TWIST = hiệu ứng ĐỘC QUYỀN của Kamui** (cổng xoắn không gian) — KHÔNG dùng cho rung/áp lực/rút năng lượng hay cảnh nào khác.
- (29/10/2026) **Thêm 1 meme dùng hiệu ứng TWIST** (`VfxGL.fx.twist` — xoáy ảnh quanh 1 điểm, bộ lọc pixi-filters). Anh xem bảng thử VFX và thích, bảo "lưu lại sau t dùng".
  Khi anh nhờ nghĩ / thêm meme mới (nhất là chủ đề xoáy, lốc, hố đen, thôi miên) → đề xuất meme này.

## Phát hành
- **Làm xong là TỰ ĐẨY LÊN `main` luôn** (người dùng đã dặn, không cần hỏi lại): commit trên nhánh làm việc rồi `git push origin HEAD:main` (fast-forward).
- Đừng tự thêm tính năng/hiệu ứng người dùng không yêu cầu; muốn thêm thì hỏi trước.
`python3 tools/release.py "mô tả"` — tăng số bản (GAME_VERSION), gắn `?v=` cho css/js, cập nhật assets-manifest.json, commit + push.
