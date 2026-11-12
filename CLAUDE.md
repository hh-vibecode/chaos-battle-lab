# Chaos Battle Lab — ghi chú quan trọng

## ⛔⛔ QUY TẮC SỐ 0 — ƯU TIÊN CAO NHẤT (anh dặn 5/11/2026): LUÔN LÀM TRÊN BẢN MỚI NHẤT
Anh làm trên NHIỀU MÁY (Mac + Windows) đẩy cùng lên `main` → bản trên máy này rất hay bị cũ.
- **ĐẦU MỖI PHIÊN, trước khi làm bất cứ việc gì:** `git fetch origin` → `git status` / `git rev-list --left-right --count HEAD...origin/main` → thua thì `git pull --ff-only origin main` (đang có file sửa dở: `git stash` → pull → `git stash pop`).
- **TRƯỚC MỖI LẦN XUẤT VIDEO / PHIM / CHẠY THỬ TRẬN và trước mỗi lần sửa code:** kiểm tra lại y như trên — phiên dài thì máy khác có thể đã đẩy bản mới giữa chừng (5/11 đã quay 3 video trên code cũ, thiếu 10 bản mới → phải quay lại).
- Đang chạy render thì KHÔNG pull/stash giữa chừng (mỗi trận thử mở lại game.js) — dừng render trước, kéo bản mới, rồi chạy lại.

## ⚠️ Tin nhắn KHÔNG liên quan game / phim → HỎI LẠI, KHÔNG LÀM (anh dặn 3/11/2026)
- Anh hay gõ nhầm câu của app khác vào phiên này (vd hỏi "công nợ NCC nội địa / KiotViet" = app Kế toán). Gặp câu không thuộc Chaos Battle Lab →
  chỉ hỏi lại 1 câu ngắn ("câu này của app nào, anh muốn em xử lý ở đây không?"), KHÔNG tự đọc repo khác, KHÔNG làm gì thêm.

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
- ⚠️ **Anh chê info của Claude HAY BỊ NHẠT** (4/11/2026, Violin Bee "Every note calls a bee. Wait for the Bumblebee." bị chê). Câu tả lại skill cho gọn KHÔNG phải câu đùa.
  Câu đùa phải có MIẾNG CHỐT bất ngờ (twist / phóng đại / nói ngược / gọi thẳng nỗi sợ của người xem), vd "Bring an EpiPen. Bring twenty-two.".
  Luôn nháp ≥5 câu, tự loại câu chỉ mô tả, đưa anh 3–4 câu mạnh nhất để chọn.
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

## ⏱️ PHIM KHÔNG CÒN GIỚI HẠN THỜI LƯỢNG (anh dặn 12/11/2026 — "note vào")
- Từ giờ KHÔNG ép phim / cảnh vào thời gian bắt buộc. Anh có nói con số thì đó chỉ là thời lượng XẤP XỈ đề xuất — làm ra DÀI HƠN vẫn được.
  Cảnh nào cần dài thì làm cho ĐỦ CẢNH, hợp lý nhất là được; KHÔNG nén nhịp tới mức vội (bản trận phụ 22s bị chê "rush, đau mắt").

## ⚔️ CẢNH ĐÁNH NHAU — NHỊP THEO ANIME GỐC, KHÔNG THEO AMV (anh chê 12/11: "rush, quá nhanh liên tục, đau mắt, không rõ cách đánh; sound không lực, lộn xộn")
- Số đo từ 4 trận GỐC còn tiếng gốc (JJK Todo vs Hanami, Gojo vs Toji, Rengoku vs Akaza, Naruto vs Sasuke — `meme-anime-lab/playbook/nhip.md`): shot TB 1.3–1.8s,
  55–72% thời gian ở shot > 2s, shot < 0.6s chỉ 3–7%. 1 shot = TRỌN 1 PHA (lấy đà → ra đòn → khựng → phản ứng), máy bám theo; giữ trục (phe A trái / B phải);
  shot THỞ 1.5–4s giữa các hiệp; âm bản / chớp chỉ 2–4 cú quyết định cả trận. Bản cũ học từ AMV (0.6s/shot) là SAI.
- TIẾNG: mỗi vũ khí 1 giọng cố định; cú nặng = 2–3 lớp (nhãn '+'); ≤ 9 tiếng / 10s; nhạc LẶNG 0.3–0.7s trước cú quyết định. Bộ tiếng anime: `se_*` (効果音ラボ).
- `tools/x/film-lint.js` + `sfx-lint.js` đã soát đúng các luật này (đổi 12/11) → phải SẠCH trước khi báo anh. Đo LUFS tiếng mới trên Windows: `tools/x/sfx-measure.html`.
- ĐỪNG DÙNG MÃI 1 CÔNG THỨC: mỗi trận 1 cấu trúc + chữ ký riêng theo kiểu nhân vật (đấu kiếm · bẫy / trí tuệ · sức mạnh thô · tầm xa · xích vs tay bo…).
- Video mẫu dài: KHÔNG tự dò cả video tốn token → hỏi anh mốc phút trước.
- ⚠️ (12/11 tối, anh xem bản giãn nhịp): "giờ lại LÊ THÊ quá" — giãn ĐỀU cả trận cũng sai. Phải có NHANH – CHẬM ĐAN XEN tuỳ lúc:
  pha bùng nổ thì cực nhanh (đòn 2–3 khung, lướt nhoè, vài góc 0.15–0.4s nối nhau trong 1 tràng ngắn), ngay sau đó KHỰNG / giữ / thở; đoạn căng thì chậm.
  Số TB của bản gốc (1.3–1.8s/shot) là kết quả của sự đan xen đó, KHÔNG phải mọi shot đều dài. Đừng giãn đồng đều bằng hệ số.
- ⚠️ ĐIỂM YẾU NHẤT (anh chỉ ra 12/11): THIẾU ĐA GÓC NHÂN VẬT. Cảnh dài muốn đa dạng, hợp lý thì phải VẼ RẤT NHIỀU SPRITE SHEET mỗi nhân vật
  (nhiều góc: chính diện / nghiêng / 3/4 / sau lưng / từ trên / từ dưới; nhiều động tác: chạy, lao, đỡ, trúng đòn, ngã, bật dậy, ra chiêu…) bằng GPT (skill ve-anh-gpt,
  sprite sheet lưới đều cùng cỡ, cùng đường chân). Đừng dựng cả trận chỉ với 4–5 ảnh tĩnh trượt qua lại.
- ⚠️ XÍCH (trận Chud vs Doge) "lỗi tùm lum, trông không có lực": soát từng khung chỗ xích gắn tay / quấn người / căng / đứt trước khi báo xong.

## Phim (Meme Cinema) — TỈ LỆ là quan trọng nhất
- Giữ tỉ lệ nhất quán giữa vật thể khổng lồ và meme nhỏ ở MỌI góc máy: meme thường ~100–170, Gigachad khổng lồ ~1000, quỷ khổng lồ rộng ~2000, bom vĩ thú đường kính ~860 (đơn vị thế giới trong js/cine-war.js).
- Muốn vật khổng lồ trông to thì đưa máy quay lại gần / đổi góc, KHÔNG phóng to meme nhỏ lên cho vừa khung (làm vật khổng lồ trông bé đi). Chỉ phóng to khi kịch bản bảo nhân vật hoá to (vd Chonky to gấp 3 con quỷ).
- Chịu khó đổi góc máy (cận, góc thấp/ngước, qua vai, toàn cảnh) — đừng để cả cảnh chỉ là 1 khung rộng nhìn toàn canvas.

## Phân việc ảnh / hiệu ứng (anh dặn 27/10/2026)
- Ảnh NHÂN VẬT (thân, tóc, tư thế) do anh tự vẽ bằng ChatGPT rồi gửi. Claude CHỈ làm hiệu ứng / VFX / skill bằng code (hào quang, tia điện, nứt tường...).
  KHÔNG tự vẽ bộ phận nhân vật bằng code (đã làm tóc Goku cho Saiyan Marmot → anh bắt gỡ).
- 🎨 **CẬP NHẬT 9/11/2026 — Claude tự vẽ ảnh bằng GPT** (skill `ve-anh-gpt`, `tools/x/gpt-image.sh`, Codex CLI dùng gói ChatGPT anh đã đăng nhập, cài trên Windows ở `~/.codex-cli/pkg/`):
  MEME MỚI: anh vẫn đưa **ảnh meme gốc** → em **vẽ lại đúng con đó trên phông xanh + tăng chất lượng** → tách nền → gửi anh duyệt.
  ⭐ VIỆC CHÍNH (anh nhấn 9/11): **XOÁ PHÔNG + TĂNG CHẤT LƯỢNG ẢNH**. Thêm tư thế / khung khác là TUỲ TỪNG MEME: dựa theo CƠ CHẾ skill của con đó
  + làm theo HƯỚNG DẪN của anh (anh mô tả tư thế nào thì vẽ tư thế đó) — KHÔNG tự vẽ thêm tư thế ngoài ý anh / ngoài cơ chế cần.
  Thử 9/11 với Grumpy Cat: giữ đúng mặt, tư thế toàn thân chân mèo thật, 45s–3 phút/ảnh. Vẫn KHÔNG vẽ bộ phận nhân vật bằng code. Nền / đồ vật / logo / texture phim cũng vẽ được bằng GPT.
- 🎨⚔️ **(11/11) VFX + VŨ KHÍ: ƯU TIÊN NHỜ CHATGPT VẼ** (anh: "vfx với vũ khí tốt nhất cứ chatgpt mà vẽ") — code vẽ đa giác/quầng sáng ra nét mảnh, xấu (anh chê kiếm năng lượng Gundam).
  Hiệu ứng phát sáng (lưỡi plasma, cầu năng lượng, lửa…): xin GPT vẽ trên NỀN ĐEN TUYỀN rồi vẽ trong game bằng `globalCompositeOperation='lighter'` → nền đen tự mất, không cần tách nền (mẫu: `GD_ESWORD`). Vũ khí rắn: nền xanh + `gkey.js`. Code chỉ lo chuyển động / gắn vào tay / nhấp nháy.

## Nhật ký gần đây (cho phiên sau nắm) — Ver 394, 27/10/2026
- 🦫 **Scream Marmot - The Last Saiyan** (`saiyanmarmot`; đổi tên 31/10, trước là Saiyan Marmot): code khối `MM_*` / `_mm*` trong js/game.js.
  Thường: chạm là xô 45 + đẩy văng; đi đủ 2s → đứng gồng 1.5s (`marmot_scream`); lần 3 hét 3s = 4 nhịp to dần, nhịp cuối ngắn nhất, lấy hơi ngắn giữa nhịp (`marmot_scream_ssj`, anh dặn 31/10) → biến hình kêu `marmot_ssj` → Super Saiyan vĩnh viễn (hào quang vàng + tia điện vẽ code).
  SSJ: chạm → khựng 0.5s → bắn địch thẳng vào tường (34px/tick) → ghim 1s, 160 dame → tường vỡ (`mmWall`, mép mẻ giữ tới hết trận), địch rời đi thì vụn rơi (`mmFx` 'chunk', 2s sau biến mất).
  Lỗ cũ trùm ±0.8×size quanh điểm đập → địch bay ra ngoài sàn → `_susEject` (thua thẳng). Quân triệu hồi bị xử y hệt (ra ngoài thì `_forceKill`).
  Nạn nhân đang bị giữ/bay/ghim mang cờ `_mmHeld` (return sớm trong `_updateCore`, vị trí do `_mmWorldTick` cầm). Miễn bay: loooongcat, evillarry, chonkydog, berserk <30% (ăn 160 tại chỗ).
  Ảnh (anh gửi, đã đủ): dạng thường `MM_IDLE / MM_OPEN1 / MM_OPEN2 / MM_SCREAM / MM_PUSH` (Ver 402); Super Saiyan tóc vàng `MM_SSJ_IDLE / MM_SSJ_PUSH` (Ver 406,
  tách nền xanh, cao 420, chân chạm đáy, mặt quay TRÁI; vẽ to thêm 15% vì tóc chiếm phần trên → thân bằng cỡ dạng thường). `MM_SSJ_SCREAM` không dùng.
  Ảnh mới quay mặt PHẢI thì bỏ `saiyanmarmot` khỏi 2 danh sách quay-mặt-trái (facingDefault + `_selSideRender`).
- ⚔️ **Catvader — vùng Force** (Ver 395): `_cvForce*`, `CV_FORCE_*`, `CV_SYS`. 5s/lượt, có đạn địch trong vùng → mở vùng 1s (Ver 481, trước 0.75s), rộng đúng 1/4 diện tích sân (`_cvR`),
  Catvader ĐỨNG YÊN; không gian trong vùng bị bóp méo (`_cvWarp`: vành khuyên vẽ lại canvas phóng/thu theo sóng) + gợn Matrix quanh từng viên (`_cvMatrixRipple`);
  MỌI đạn địch trong vùng ĐỨNG YÊN (anh dặn 3/11, trước chậm còn 5%), đổi sang phe Catvader; hết 1s đẩy hết về phía địch (nhanh hơn 35%, đúng dame gốc), rồi đi lại bình thường.
  Anh mô tả "giống Zilean" chỉ để hiểu ý vùng làm chậm — KHÔNG thêm khiên/tăng tốc như skill Zilean.
  Bắt mọi hệ đạn: `projectiles` giữ nguyên hình gốc; búa Stalin dùng chế độ `_slHammerRefl` sẵn có; hệ riêng trong `CV_SYS` (chảo, táo, hoa, mũi tên Loading,
  batarang, dao boomerang, cầu code Hecker, chữ Duolingo, đờm/mầm Cough Cat, lọ độc Sus Dog) → cuối khung `_cvForceSnapFrame` CHỤP hình vật thể trên canvas
  (tách nền = màu trung bình viền mảng), gỡ khỏi hệ cũ, thay bằng đạn Catvader `isCvSnap` mang đúng hình đó. Thêm hệ đạn mới → thêm 1 dòng vào `CV_SYS`.
  Không bắt: quả đất Gary, liềm Stalin (vật nảy cả trận, gỡ là hỏng skill), tia laze tức thời (Gundam, Duolingo, King Cheems...).
- 🥷 **Ninja Cat**: Sharingan không bao giờ đâm vào mặt nữa — lưng địch sát tường thì NHỊN (`_njWait`, giữ lượt), địch có chỗ sau lưng là cast ngay; đã tan khói mà địch lùi sát tường thì ẩn chờ thêm ≤1.5s rồi hiện lại, trả lượt.
  Lúc đâm khoá hướng nhìn địch (`_njFaceBy` / `_njFaceL` ở chỗ tính `shouldFaceLeft`) để nó không quay lại nhìn Ninja.
- 🧪 Máy Windows của anh không có node/python: chạy thử trận + phát hành bằng skill `chay-thu` / `phat-hanh` (công cụ `tools/x/`). Cổng 9333 thường bị trình duyệt của PHIÊN KHÁC chiếm → dùng 9455.
- 💾 PC (9/11/2026): ổ C GẦN ĐẦY → mọi thứ để Ổ D. Dữ liệu thật của `0.van-phong-ao` ở `D:\0.van-phong-ao`; trên Desktop là LỐI TẮT (junction) trỏ sang D
  (anh chạy `D:\tools\hoan-tat-chuyen-o-D.cmd` sau khi đóng VS Code — chép nốt, xoá bản ổ C, tạo lối tắt) → mở VS Code / lịch sử chat Claude theo đường dẫn Desktop như cũ.
  Công cụ cài thêm ở `D:\tools\` (codex-cli, codex-home, yt-dlp + deno). File lớn (video, ảnh nháp) KHÔNG để ổ C.

## Skill của repo (`.claude/skills/`, thêm 28/10/2026)
- `them-meme` (danh sách việc thêm meme mới) · `tach-nen-anh` (ảnh ChatGPT nền xanh → khung game) · `chay-thu` (chạy thử trận bằng Edge headless) · `phat-hanh` (đẩy bản mới không cần python)
  · `xuat-video` (CHỈ Mac: phim + trận đấu giả lập; chỉ quay lại đoạn bị sửa) · `dung-phim` (dựng phim anime bằng cine-kit) · `xem-video` (CHỈ Mac: video mẫu → bảng cảnh) · `tao-vfx` (VFX shader cho game + phim) · `ve-anh-gpt` (em tự vẽ ảnh GPT qua Codex: meme gốc → phông xanh nét + tư thế mới).
- 🎞️ **MỌI video xuất ra mặc định 50fps — dọc hay ngang, phim hay trận** (anh chốt 3/11, note kỹ). Đã đặt sẵn: render-match / render-duo `--ofps 50` (game chạy 1 tick/khung theo luật 60 tick/s → VẪN giả lập 60, chỉ chụp khung sang ô 1/50s mới, bỏ đều 1/6 — KHÔNG hạ `--fps` giả lập, sẽ làm trận chậm 17% + lệch nhạc), render-cine `--fps` mặc định 50.
- **🎬 PHIM luôn xuất 4K, ngang lẫn dọc (anh chốt 3/11): 16:9 → 3840×2160 · 9:16 → 2160×3840 — render-cine mặc định đã là 4K, KHÔNG thêm `--scale 1.5`. TRẬN ĐẤU giả lập: 9:16 DỌC 3K 1620×2880 (anh chốt 30/10, render-match `--w 1620`).** Anh không nói khung → mặc định DỌC 3K.
- ⛔ **Trận đấu giả lập phải TỰ NHIÊN — KHÔNG can thiệp diễn biến/kết quả** (anh dặn 10/11: em từng dùng `--inject` chặn Bread Cat bị huỷ lần 3 cho đúng ý → anh bắt xoá).
  Chỉ được LỌC chọn seed (`--win`, `--dirok`…). Chạy thử nhiều seed mà không ra đúng ý anh → BÁO ANH (kèm tỉ lệ thắng / diễn biến thật), để anh đổi cặp đấu.
- 🏆 **Trận đấu giả lập LUÔN ưu tiên THẮNG SÁT, video dài 20–25s** (anh dặn 30–31/10): chạy thử nhiều seed, gom ≥3 trận đúng bên thắng VÀ video ~20–25s (`--want 3 --dur 20-25`) rồi lấy trận con thắng còn ÍT máu nhất (`tools/render-queue.sh`).
- ⛔ **CHỈ XUẤT video / phim khi anh BẢO RÕ** (anh dặn 3/11: "t bảo m xuất đâu, ai cho m tự ý làm"). Sửa xong phim thì báo + để anh tự quyết có xuất không; đừng tự chạy render-cine / render-match.
- ⏯️ **Xuất lâu (>30 phút) phải CHIA ĐỢT được, anh cần tắt máy giữa chừng** (anh dặn 4/11): PHIM luôn chạy `render-cine … --cache --chunk 5` → mỗi đoạn 5s phim lưu riêng ở `<out>.chunks/`; tắt máy / dừng rồi chạy LẠI ĐÚNG lệnh cũ là tự bỏ qua đoạn đã xong, chỉ mất đoạn đang làm dở. Đừng xoá `<out>.chunks/` khi chưa xong. TRẬN ĐẤU (render-match) chưa chia đợt được (quay 1 mạch, thường 3–5 phút) — cần thì làm: giả lập nhanh tới giây A không chụp (cùng seed ra y hệt) → chụp đoạn A–B → ghép, tiếng trộn 1 lần cuối.
- ⚡ render-cine giờ bật GPU thật (Ver 503): Prologue 4K từ 2.670ms còn 478ms/khung (nhanh ~5.6×). Trước đó trình duyệt headless chạy WebGL bằng CPU. `--cpu` để thử lại kiểu cũ.
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
- **Góc máy + hiệu ứng LÀM SẴN (9/11):** `js/cine-cam.js` → `CineKit.cam.*` (slideAlong, orbit, wormHold, birdToWorm, pushIn, whip, dollyZoom, chargeFollow, scaleJump, mirror;
  ease holdSnap/overshoot/brake; implode, wipeBlob, wipeLeaves, speedTunnel, restBeat, negFrames, splitFace) — số lấy từ clip anime đã học ở repo meme-anime-lab (`playbook/`).
  playCineKit tự tải. Cách dùng: skill `dung-phim` mục "CineKit.cam". Tự kiểm: `tools/x/cine-cam-test.html`.
- **Hiệu ứng MANGA làm sẵn (9/11, Ver 526):** `js/vfx-manga.js` → `CineKitFx` (smear, swirl, halftone, mangaBW, blast, rimLight; canvas 2D). playCineKit tự tải.
  Cách dùng: skill `dung-phim` mục "CineKitFx". Tự kiểm: `tools/x/vfx-manga-test.html`.
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
- 🍞 Bread Cat (Ver 487, anh dặn 3/11): xoay đủ 5s THẬT (`BC_SPIN_T=300`, game chạy 60 tick/s — trước 216 tick = 3.6s), chỉ đánh gãy được trong 5s đó; rồi `BC_RIFT_T` ≈4.4s XÉ SÂN: sét → sân nứt 5 tảng lớn (chụp mặt sân, Voronoi d3) → vỡ ~6 mảnh/tảng → mảnh + meme địch + đồ vật trên sân (vỏ chuối…) bị cuốn vào tâm xoáy → co 1 điểm → Big Bang trắng xoá NGAY toàn khung. Vòng xoáy vẽ bằng code (KHÔNG twist — của Kamui). Mèo đi lang thang ngẫu nhiên, không đi thẳng tới lát bánh.
- 🎵 Nhạc nền Catvader (`flyingcat_theme`, Ver 487): anh sợ bản quyền → trong game volume 0.35, video còn −7dB (`BG_LEVEL`) + tự nén theo tiếng đánh nhau (`BG_DUCK`, mix-plan.py). Hạ nhỏ KHÔNG chắc tránh được Content ID — chắc nhất là thay nhạc tự viết.
- 🎧 Azel (31/10): đạn nâng cấp kiểu "dope" — dải đuôi neon (`_azRibbon`), tách màu RGB, thanh equalizer, sét lách tách, WUB/bass drop BÓP MÉO không gian (`_azWarp`).
  Anh: "giờ chỉ quay video, không dùng game trực tiếp → không sợ nặng, nâng cấp VFX thoải mái".
- ⚠️ Hiệu ứng động của nền/sân KHÔNG dùng `Math.random` (băm theo `tick`/toạ độ — `_skH`) → không xáo chuỗi random có seed của trận (quay video phải khớp lúc chạy thử).

## 🎬 Meme Lore 2 · Ep 0 "The Truth" (31/10) — `js/cine-lore2ep0.js`
- Sự thật đằng sau cảnh cửa sổ Ep 1, KHÔNG thoại: hẻm tối (Hamster bị 2 tay bóng tối đuổi, vả vào góc) → Chill Guy đá gãy 1 tay, ôm Hamster chạy, bị cào lưng
  → thềm nhà Ep 1 (mèo trắng đi làm về) → trong phòng băng bó, cúi ngó Hamster → bóng chồng trên cửa sổ → Depressed Cat hiểu lầm → nụ cười Friend trong khe hẻm tối.
- Dựng trên engine Ep 1 (phố/nhà/cửa sổ/bó hoa/mặt bầm CHÉP sang để khớp từng nét) + xuất offline: `node tools/render-cine.js l2e0 out.mp4` (mặc định 4K).
- Ảnh anh vẽ: `assets/img/cine/EP0_*` (KICK, RUN, DOWN, BANDAGE, WIFE_WALK, WIFE_HOLD). Chuột phải NHỎ (cao ~56 cạnh Chill Guy ~175).

## 🐝 Violin Bumblebee (`violinbee`, 4/11/2026; lúc đầu tên Violin Bee) — khối `VB_*` / `_vb*` trong js/game.js (cạnh `_stopPiano`)
- Tên hiển thị (anh dặn 4/11): 2 meme violin để chữ Violin ĐỨNG ĐẦU — **Violin Bumblebee** + **Violin Mosquito** (trước là Mosquito Violin; key `mosquitoviolin` giữ nguyên). Roster đã lưu tên cũ tự đổi (dòng `roster.forEach` cạnh Saiyan Marmot).
- Meme NHẠC, chạy chung engine `_playPianoSong` (FFT bắt nhịp). Không đánh thường. 2 pha (`f._vbPhase`): khởi động `vb_warmup` (~10s, anh gửi) →
  mỗi nốt `_vbBeat` → `_vbStaff` (AURA KHUÔNG NHẠC: 5 dòng kẻ vàng rực uốn lượn + nốt nhạc to rõ, toả ra mọi hướng theo góc vàng, bay XUYÊN hết canvas
  rồi mờ — vẽ `_vbDrawStaff`; CHỈ lúc khởi động để gọi ong, anh dặn — Bumblebee dùng VFX cũ: vòng sóng âm + nốt quanh cây đàn mỗi nhịp, `ring`) + `_vbCall` (1 ong con BAY TỪ NGOÀI KHUNG HÌNH vào, `st:'arrive'`, xuất phát cách ô `VB_IN_FROM`).
  ⚠️ Anh chê bản đầu "mỗi tia sáng": VFX nhạc phải RÕ HẲN khuông nhạc + nốt nhạc, vàng phát sáng đậm như ảnh mẫu (khuông nhạc lửa vàng); ong không được hiện ra tại chỗ.
  `VB_N=22` ô chia đều chu vi (`_vbSlot`), điền xen kẽ `(k*7)%22` (anh muốn 20–25 con dàn đều). Khởi động phát nhanh `rate:10.05/9` cho trọn 9s (anh dặn; đo: 0.5s → 9.5s).
  → `vb_bumblebee` (Flight of the Bumblebee, Katica Illényi — anh gửi): vòng sáng ra hiệu + `vb_rush`, mỗi nhịp thả 1 con chờ lâu nhất (ùa vào từ mọi phía),
  ong tốc 1.5 (anh hạ 4/11 từ 2; meme thường 5; tốc là TỔNG quãng bay/tick kể cả giật ngang + tách đàn), phải CHẠM thân mới CHÍCH THEO NHỊP (`_vbBeat`), chích xong khựng 0.3s (`VB_HOLD_T`=18 tick; anh đổi từ 0.5s). Hết bài → khởi động lại, gọi ong bù ô trống (vòng 'ended' trong `_playPianoSong`).
- ⚠️ Ong con `vbBees` = ĐÒN TẤN CÔNG, KHÔNG phải quân triệu hồi có máu (ANH CHỐT 4/11; bản 504–505 em từng cho 30 máu → sai): không máu, không bị nhắm /
  đánh trúng, bay xuyên mọi thứ → KHÔNG đưa vào `_hpSummonArrays` / `get enemy()`. Khởi động lại chỉ gọi bù khi chưa đủ 22. Chủ chết → cả đàn tan.
  Ong = ĐẠN (anh chốt 4/11): Samurai Cheems chém bật (`_smCanParry` lúc chích → `st:'back'` lao về chích Violin Bee, dame tính cho Cheems),
  Catvader bắt (1 dòng `vbBees` trong `CV_SYS`), The Void hút + nuốt (`_vbSuck` gọi trong khối nuốt đạn của hố đen). Mất con nào thì lần khởi động sau gọi bù.
  (Lúc làm đã đổi 9 chỗ liệt kê cứng 9 loại triệu hồi sang `_hpSummonArrays()` — giữ.)
- Dame chích = 15 (anh tăng 10/11, trước 10) · khởi động CÒN 6s: vào trận 1s là kéo, file cắt `vb_warmup6.mp3` (6.45s, ×1.075) → xong ở giây 7 (anh dặn 10/11), chỉ chích đúng nhịp, mỗi con ≥1s/phát (`VB_STING_CD`). Em tự đặt: Violin Bee 1000 máu tốc 4.5. Size 37.8 (anh giảm 10% từ 42, 4/11); ong con = size ong chúa × 0.3 nên nhỏ theo.
- Ảnh: `assets/img/violinbee/VB_1..6` (6 khung kéo đàn, lật theo nhịp; avatar = khung 1 theo lời anh), `VB_BEE1..4` bay + `VB_BEE5` chích (quay mặt PHẢI).
  Anh muốn ong con "giống ong nhất có thể", sợ lật sprite trông giả → KHÔNG lật 4 khung bay nữa: 1 ảnh thân (`VB_BEE_BASE`) + `_vbSplit` tách CÁNH ra
  (màng cánh bán trong suốt → đóng hình lấp gân → giữ mảng lớn nhất) rồi vỗ bằng code: cánh rõ đổi pha mỗi khung + 2 bóng cánh mờ = vệt nhoè.
  Thêm rung thân tần số cao, bay giật đổi hướng (`dartT`), chúi đầu theo đà, bóng dưới sàn.
  Cả 2 bộ đã căn CÙNG KHỔ + tâm thân trùng nhau (tâm = điểm trung bình pixel đặc) → lật khung không giật; ong vẽ ở `_vbDraw` (tâm 0.52/0.59).
- Tiếng: `vb_buzz` (ong hiện), `vb_rush` (ra hiệu), `vb_swarm` (vo ve LẶP khi có ong đang đánh, to theo số con), `vb_sting` — cắt từ myinstants trong trình duyệt ra WAV.
  SND_LUFS của 6 tiếng là ƯỚC LƯỢNG từ RMS (Windows không chạy được tim-sound) → lên Mac đo lại bằng `tools/sfx-find.py measure`.
- ⚠️ Bản thu Katica Illényi có bản quyền biểu diễn → video YouTube có thể dính Content ID (bản nhạc gốc Rimsky-Korsakov thì đã hết bản quyền).

## 🎬 Meme Lore · FINAL — Part 1 (5/11/2026) — `js/film-fin1.js` (cine-kit, id `fin1`, 16:9, 51s; Meme Cinema → MEME LORE 2 → "Final · Part 1")
- ⏱️ (11/11 anh dặn) Tập Final 1 nhắm dài **ÍT NHẤT 8–9 PHÚT** → cảnh nào cần thì MỞ RỘNG thoải mái (thêm shot, kéo dài nhịp, thêm chi tiết), KHÔNG nén thời lượng tới mức mất chi tiết / bị vội.
  (12/11) Không còn giới hạn thời lượng bắt buộc — số anh nói chỉ là xấp xỉ, dài hơn vẫn được (mục "PHIM KHÔNG CÒN GIỚI HẠN THỜI LƯỢNG" ở trên).
- ☁️ (11/11) Khói chung của cine-kit (`K.smoke`) làm lại: 6 kiểu cụm mây mềm mép lởm chởm, xoay ngẫu nhiên, nhuộm màu chỉ trên phần khói (anh chê khói cũ như bóng bay xám).
- 🧩 (9/11, anh chốt) Trận **Mewing/Gojo Cat vs Depressed/Pain Cat** là 1–2 CẢNH NẰM TRONG Final Part 1 (không phải phim riêng). Bản cũ `js/film-mvd.js` (9:16, 23s, Anime Lab) chỉ để tham khảo.
  Kịch bản anh viết: cận chiến đa dạng, nhịp không đều → Pain dùng Almighty Push hất Gojo văng xa → Pain bay thẳng lên trời cast SHINRA TENSEI, nổ xoá nửa thành phố;
  lúc Pain cast, Gojo kịp mở LÃNH ĐỊA (infinity domain) bọc mình, tránh vụ nổ → Pain đáp đất xem kết quả → HOLLOW PURPLE bất ngờ lao ra từ khói bụi, Pain đỡ khó khăn bằng trường lực
  → dồn hết sức Almighty Push hất quả cầu lên trời, nổ tím trên không → 2 bên đối diện, ngang tài ngang sức. Anh muốn "wow", sát nguyên tác, nền thành phố phong phú, chiêu thể hiện huỷ diệt diện rộng.
  ĐÃ CHIA CẢNH (9/11, `CineKit.seq`, xem skill dung-phim mục "TẬP DÀI = NHIỀU CẢNH"): `fin1` = fin1c1 phố 0–16.5s · fin1c2 Friend phá 16.5–37s · fin1c3 nóc nhà 37–69.2s;
  Gojo vs Pain = cảnh 4–5 (file riêng, thêm id vào `FIN1_PARTS`). Xuất lại riêng cảnh bị sửa: `render-cine fin1c2 …` (cách ghép các cảnh đã xuất CHƯA làm — làm trên Mac).
  Anh chốt (9/11): đặt SAU cảnh nóc nhà · tách fin1 thành cảnh ngay (anh sẽ thêm cảnh trước vào sau) · thành phố của Final, bối cảnh ĐA DẠNG theo mạch: bình yên trời sáng (nền riêng)
  → Friend xuất hiện kéo theo trăng máu, trời tối dần… · Gojo mở lãnh địa: GIƠ TAY (chân trước) ra phía trước, BĂNG MẮT nhếch chéo lên lộ 1 mắt giống mắt Gojo ·
  tên chiêu: CHỮ TIẾNG ANH trên màn hình + TIẾNG NHẬT đọc tên chiêu (sound) · trận ~60–70s · nhạc: nhạc anime đánh nhau EPIC, không ngại bản quyền (dính thì anh tự thay).
  Chờ: anh gửi link YouTube mẫu sau.
  ✂️ (10/11 anh dặn) TÁCH các trận lớn khỏi tập vì chưa có cảnh nối: tập fin1 = 3 cảnh (fin1c1–c3) + trailer dọc fin1tr; Gojo vs Pain = phim riêng fin1c4. Menu: MEME LORE 2 → thư mục __fin1 'Final · Part 1' chứa tập chính, Gojo vs Pain, trailer (+ trận phụ sau).
  🔊 (11/11 anh dặn) Friend gầm → SÓNG ÂM vỡ hết kính: vòng sóng ở shot góc giun (`roarRings`) + cảnh mới `scGlass` (T.glass 21.0–22.5, thay chỗ tiêu đề FRIEND đã bỏ): ô kính vỡ đúng lúc vòng sóng chạm (`shops(...,{out,broke})`, `brokenPane`).
  Trailer fin1tr (11/11): Chuối cầm kem NGƯỚC LÊN → hoảng → khóc, kem rơi trong 1 shot (anh chê bản cũ bị lặp đoạn khóc); tiếng gầm vào đúng lúc mắt Friend bật sáng; trailer nạp HẾT ảnh MAIN (thiếu ảnh = dân phố/đuôi biến mất).
  ⚔️ TRẬN PHỤ (11/11/2026) — module chung `js/fin1-city.js` (thành phố tách từ fin1c4, `Fin1City({seed,collapse})`) + `js/fin1-fight.js` (`Fin1Fight`: track keyframe, hstop, actor tự lật mặt theo HƯỚNG NGANG máy, smearFrame,
  line/taper/text3/beam/ice, `kamui` CHÉP ĐÚNG game `_njKamuiTickDraw`: twist thật + dải mực + lõi đen; mode 'phase' = xuyên thấu). Ảnh tư thế vẽ GPT: `assets/img/cine/FIN_F1_* / FIN_F2_* / FIN_F3_*`.
  LUẬT ANH DẶN 11/11: ① melee trao đổi kiểu melee, ranger kiểu ranger · ② chiêu phải ĐÚNG game / nguyên tác, không tự chế (Kamui: xuyên thấu + hút người khi chạm) ·
  ③ Meowkatsuki đánh MẶC ÁO AKATSUKI · ④ MỌI TRẬN KẾT DANG DỞ, chuyển sang trận khác bằng 1 pha có câu chuyện · ⑤ logic xếp cảnh: nguyên nhân trước hệ quả (mắt kích hoạt TRƯỚC đòn xuyên thấu; ảo thuật phải có lúc chạm mắt) ·
  ⑥ Bat Cat = Batman: thông minh, CÀI BẪY / GÀI BOM, có thời gian chuẩn bị là xử lý hết · ⑨ đồ vật phải HỢP BỐI CẢNH (thành phố không có bóng chông — anh chê) ·
  ⑩ Clapping = HỖ TRỢ kiểu TODO (Boogie Woogie): đứng hàng sau, vỗ tay đổi chỗ bất kỳ 2 thứ (đồng đội, địch, tảng bê tông / mảnh vỡ), chủ yếu yểm trợ Doge · ⑦ giữ đồng nhất nhân vật giữa các tư thế · ⑧ tập Final 1 dài ≥ 8–9 phút → mở rộng thoải mái.
  THỨ TỰ (em đề xuất, chờ anh duyệt): fin1f3 Ninja vs Berserk → fin1f2 Bat vs Pop+Huh → fin1f1 Chud+Mlem vs Doge+Clapping → fin1c4 Gojo vs Pain.
  fin1f2 XONG bản đầu (Ver 564, 18.6s, Batman: chế độ thám tử, bom mồi 'ném hụt', bom gài sẵn trên tường dụ chữ HUH, bom khói, vòng 6 bom; kết = vòng khói khổng lồ, máy chui qua lỗ O sang fin1f1).
  fin1f3 XONG bản đầu (Ver 563, 21.9s): kết = Berserk chém đôi Ninja + toà nhà → quạ bay lên trời → thế giới ẢO THUẬT (trời đỏ, 2 mắt Sharingan theo ảnh mẫu anh gửi, chỉ hiện khi máy ngước thấy trời)
  → Berserk hú (`bk_howl`) → chém vỡ ảo cảnh = MẢNH KÍNH (`def.panels`: mỗi mảnh vẽ lại thế giới đông cứng, nền là cảnh mở đầu fin1f2).
  fin1f1 XONG bản đầu (Ver 565, 20.6s, 2 vs 2 PHỐI HỢP: chuông làm choáng → Mlem liếm · Clapping đổi chỗ đẩy Chud vào bóng chông → Doge xả chữ · lưỡi kéo Doge vào chuông ·
  Mlem đóng băng Clapping giữa lúc vỗ tay · Buff Doge + Haki · Clapping đổi chỗ để Chud lãnh đấm · chuông vỡ, xích nung đỏ TRÓI Doge → Clapping đổi chỗ Doge ↔ Mlem (anh gợi ý) ·
  combo TỐC ĐỘ CAO: mỗi tiếng vỗ dịch chuyển Doge sang 1 phía Chud; kết = cuối đại lộ loé tím (trận Gojo vs Pain), cả 4 quay đầu, máy lao theo).
  ✅ (12/11) TẬP ĐẦY ĐỦ `fin1full` (js/film-fin1full.js, mục ĐẦU thư mục __fin1, 5:53): fin1c1–c3 → fin1c5 (cảnh nối) → fin1f3 (kính vỡ) → fin1f2 (lỗ vòng khói) → fin1f1 (đường hầm) → fin1c4.
   Nhạc: seq gom def.mus từng cảnh dời theo giây bắt đầu. film-sheet / film-check / sfx-lint đều chạy được với tập ghép (`film-check.js fin1full --t …`).
  ✅ (12/11) 4 TRẬN DỰNG LẠI NHỊP theo anime gốc (anh chê rush / đau mắt / tiếng lộn xộn) — mỗi trận 1 chữ ký riêng:
   · fin1f3 Ninja vs Berserk 55s: đấu kiếm, đối mặt lâu, mỗi pha 1 shot ngang, Berserk trái / Ninja phải (đổi bên chỉ sau Kamui).
   · fin1f2 Bat vs Pop+Huh 53s — CẦU TREO (`Fin1City({kind:'bridge', towers:[-900,900], towerH:1400, beams:[520,1050]})`, tháp + dầm là KHỐI HỘP `CITY.box`): Batman săn mồi —
     ngồi trên dầm tháp nhìn xuống → thám tử từ trên cao → lượn xuống → dụ HUH vào bom trên thân tháp → khói (im lặng, gài bom không tiếng) → lộ 6 bom → bấm kích nổ từ dầm (ngòi 3s đúng game).
   · fin1f1 Chud vs Buff Doge 77s — CÔNG VIÊN, kịch bản anh 12/11: 2 con TRUYỀN TỐNG xuống bằng cột BIFROST (vàng Doge, trắng Clapping; lõi trắng, viền cầu vồng, vệt xoáy, vòng ký tự cháy trên cỏ)
     → nhìn quanh → bị TẬP KÍCH: xích nung đỏ của Chud (dạng KRATOS sẵn, KHÔNG chuông) quấn Doge + Mlem liếm đóng băng → vây Clapping (cười vỗ tay) → băng nứt → Buff Doge phá băng,
     lao tới bằng meme ONE-PUNCH SHIBA (ảnh FIN_F1_DOGE_ONEPUNCH = vẽ lại đúng ảnh gốc anh gửi) húc Chud xuyên 3 dãy nhà → Clapping che mồm → giơ tay với Mlem (2 con CHỈ ĐỨNG NHÌN, chưa đánh)
     → TRẬN CHÍNH xích vs tay bo trong đống đổ nát (mẫu Kurapika vs Uvogin anh chọn, HxH 4:07–8:00): Doge THẤT THẾ trước (quất lùi, đấm hụt nện đất vì Chud đu xích vào cột, bị trói, nhấc lên quật)
     → giao tranh căng nhất mới BẬT HAKI (đứng hình 1s) → GIẬT TAN XÍCH → 2 con lao vào nhau → chân trời loé tím → sang fin1c4.
     Ảnh mới: FIN_F1_CHUD_K0–K4 (5 tư thế Kratos mặc áo Akatsuki, chuôi xích HAND đo bằng lưới; xích vẽ code chép `_dcCord`) · FIN_F1_DOGE_BLOCK/RUN/DUCK/PUNCH/PULL/HPULL.
   · fin1c4 Gojo vs Pain 70s: lớp GIÃN NHỊP `RETIME` (hiệu ứng vẫn theo giây cũ T; đòn ×1, quãng thủ thế ×2–3, đối mặt / giằng co / lãnh địa giãn) + cận chiến gộp 21 shot vụn → 11 shot.
   CÒN CHỜ ANH: xem cả tập rồi góp ý; chưa nghe thử tiếng mới (se_*) bằng tai. Tập hiện ~5:44 (anh nói 8–9 phút chỉ là xấp xỉ, không bắt buộc).
  ⏸️ VIỆC DỞ (anh góp ý 12/11 tối sau khi xem bản Ver 573–575 — làm tiếp phiên sau):
   ① NHỊP: bản giãn bị "lê thê" → làm lại NHANH–CHẬM ĐAN XEN (tràng đòn cực nhanh vài góc ngắn → khựng / thở → căng chậm). Bỏ kiểu giãn đều hệ số (RETIME fin1c4 cần chỉnh lại theo từng pha).
   ② SPRITE SHEET ĐA GÓC cho mọi nhân vật trong trận (Ninja, Berserk, Bat, Pop, Huh, Chud Kratos, Buff Doge, Mlem, Clapping, Gojo, Pain/Depressed): nhiều góc + nhiều động tác,
      vẽ bằng GPT theo lưới đều → dùng thay vì 4–5 ảnh tĩnh trượt qua lại. Đây là điểm yếu nhất anh chỉ ra.
   ③ VŨ KHÍ PHẢI VA CHẠM THẬT + HƯỚNG HỢP LOGIC: kiếm chạm kiếm đúng chỗ, xích quất / quấn đúng vào người, đòn đi đúng hướng đối thủ (không vung vào khoảng không).
   ④ XÍCH trận Chud vs Doge "lỗi tùm lum, không có lực" → soát từng khung, sửa chỗ gắn tay / quấn / căng / đứt; thêm lực (quật mạnh, căng rung, tia lửa).
   ⑤ BAT đu dây KHÔNG CÓ MÓC → vẽ móc (grapnel) ở đầu dây, bắn ra từ súng móc, cắm vào dầm / cáp rồi mới kéo người lên.
   ⑥ CẢNH LAO ĐI (fin1c5): CẢ 5 thành viên Meowkatsuki cùng tách ra các hướng (mỗi con lao về cột sáng của trận mình), không chỉ Depressed. Cần tư thế lấy đà / bay cho cả 5.
   Nhiều lỗi khác anh thấy khi xem cả tập → soát lại toàn bộ bằng bảng khung dày trước khi báo.
  Trận phụ (fin1f1 Chud+Mlem vs Doge+Clapping · fin1f2 Bat vs Pop+Huh · fin1f3 Ninja vs Berserk): yêu cầu chi tiết ở prompts/fin1-fight-phu.md.
  🔧 NÂNG CẤP 9/11 (theo meme-anime-lab/playbook): thành phố dựng lại đúng TỈ LỆ (MEME_H=32, tầng 84–100, nhà phố 3–5 tầng, cao tầng 15–40) · Friend lộ diện = bộ ba
  (cực cận răng→mắt bật sáng · góc giun trời đỏ ngược sáng · cận Banana Cat) · ĐUÔI quật thay nắm tay (kiểu Cửu Vĩ, clip kaiju-b) · tĩnh trước phá · hậu quả ·
  nóc nhà: bỏ thở / nghiêng TỪNG Ô (làm vỡ kính Chud) → cả ảnh thở đồng nhất · Rinnegan vẽ rõ (vòng đồng tâm) trong bóng đen.
  CẢNH 4 Gojo vs Pain = `js/film-fin1c4.js` (2.5D, 50s — Ver 529 thêm chuỗi BÀNH TRƯỚNG LÃNH ĐỊA 5s: kết ấn → cực cận mắt lộ dưới băng → co lại → hư không bung + DOMAIN EXPANSION → bên trong INFINITE VOID (chữ CHỈ tiếng Anh, không chữ Hán — anh dặn) → vòm trồi lên giữa đổ nát; nạp vào tập sau fin1c3) — Ver 528 đã sửa: Pain bay lên trời đỏ ngược sáng, Shinra góc chim thấy nhà đổ rạp (giảm sương). CÒN: nhiều shot ẢNH TẠM. (cũ:
  Shinra góc chim (23.5–25.5s) mới là vòng tròn chưa ra cảnh xoá nửa thành phố, nhiều shot ẢNH TẠM. Soát khung: `tools/x/film-sheet.html?id=<id>&file=<file>`.
  ✨ (11/11, anh chê Hollow Purple + lãnh địa xấu, đỡ cầu/hất lên quá đơn giản) VFX fin1c4 làm lại: `hpOrb` (cầu tím đặc, plasma xoáy, sét, đuôi lửa; cận cảnh vẽ đè thường để không trắng xoá) ·
  `elemOrb` Xanh hút / Đỏ đẩy sáng XUYÊN khói + sét nối khi dồn vào nhau · `hpTrench` rãnh xoá sổ · `pField` trường lực Pain (gợn, nứt theo sức ép, toé tím, loé điểm chạm) ·
  hất lên: cột sóng nén + vòng âm thanh dọc đường bay (`hring`) · `purpleBlast` nổ tím trên không · `dome` khối cầu 3D có thiên hà bên trong · `sixEye` vẽ lại · Shinra thêm tường sóng nén.
  THỨ TỰ lãnh địa (anh chốt 11/11): MẮT Lục Nhãn trước (T.dom→dEye) rồi mới ảnh giơ tay kết ấn (dEye→dImp).
  ⚠️ Chiêu hút/đẩy của Pain trong phim là chiêu THƯỜNG, KHÔNG phải Almighty Push → KHÔNG hiện chữ tên chiêu (anh dặn 11/11). Chỉ SHINRA TENSEI / DOMAIN EXPANSION / HOLLOW PURPLE có chữ.
  🖼️ ĐÃ CÓ ẢNH Gojo vs Pain (9/11, Claude tự vẽ bằng ve-anh-gpt, Ver 531: FIN_G6/G7/G9/P6/P7/P8/P9.png — lệnh gốc `prompts/fin1-gojo-pain.txt`): G6 mở lãnh địa (giơ chân trước, băng mắt nhếch lộ 1 mắt) · G7 bị hất văng ·
  G9 đối diện cuối (xước) · P6 bay lên trời cast Shinra Tensei · P7 đáp đất · P8 đỡ Hollow Purple bằng trường lực · P9 đối diện cuối. Có sẵn dùng lại: MVD_G1–5 / MVD_P1–5 (5 tư thế tay đôi), MVD_GOJO_BLAST, MVD_PAIN_PUSH, MVD_*_KB.
- Anh kể (Final làm 2 tập, ngang 16:9): phố bình yên + meme quen trên phố → em bé mua kem, bóng đen trùm cả khu, ngẩng lên khóc thét rơi kem → FRIEND che kín trời
  giữa các toà cao tầng → tay bóng tối đâm xuyên nhà, phá huỷ (10–15s, nhiều khung cắt) → nóc nhà: 5 bóng Akatsuki (Depressed · Doorbell Chud · Ninja Cat · Bat Cat · Mlem Cat).
- Dựng kiểu Prologue (2D 960×540, mỗi cảnh 1 hàm `sc*` + `cam()`), mốc ở `T`. Thành phố / xe / quầy kem / khói lửa vẽ bằng code (seed cố định); tay bóng tối = `shadowArm` chép từ film-l2pro.
- ⚠️ Anh dặn (5/11): BỎ HẾT NGƯỜI — dân phố toàn MEME. `CROWD` = ~30 meme trong game (avatar), đi kiểu nhún nhảy (`person`), chạy loạn có giọt mồ hôi.
  Em bé mua kem = BANANA CAT (avatarUrl thường → attackAvatarUrl khóc tuôn nước mắt, tiếng `cry_banana_cat`), bán kem = CORNELIUS nằm trên quầy.
  Ảnh meme từ mạng thường dính nền, Windows không tách được → dùng meme có sẵn trong game; cần meme mới cụ thể thì xin anh ảnh nền xanh.
- MEOWKATSUKI (tên nhóm, anh đặt): ảnh nhóm `assets/img/cine/FIN_AKA_GROUP.png` = ghép từ 2 ảnh anh vẽ — Chud · Bat · Depressed lấy từ ảnh 5 con,
  Ninja + Mlem thay bằng 2 con ở ảnh 4 (Mlem ảnh 5 sai dáng). Đoạn nóc nhà (anh biên đạo): 5 bóng đen nói chuyện (bong bóng "…") → Depressed Cat nói
  "Let's go. Let this world… and this universe… know pain." (mắt Rinnegan loé tím, phụ đề hiện dần) → 5 tiếng `vine_boom` + 5 KHUNG CHÉO trượt vào cận mặt từng con
  (`akaStrips`, tâm mặt `AKA_FACE`) → loé trắng ra ảnh cả nhóm, chữ MEOWKATSUKI đập vào SAU LƯNG (lớp dưới cùng, cả nhóm đè lên chân chữ — anh dặn) + mây Akatsuki 2 bên, giữ ~6s.
  THOẠI (anh viết, `DIALOG`, phụ đề tiếng Anh em dịch): Mlem hỏi 3 câu (thả nó ra lúc này? Godly Memes biến mất hàng ngàn năm, hút đủ sức mạnh thì không ai cản nổi) →
  Depressed đáp (giữ 1 mảnh linh hồn, chưa hoàn thiện thì luôn bị ta chi phối) → "know pain". Lúc thoại CẢ 5 LÀ BÓNG ĐEN, chỉ Depressed loé mắt Rinnegan (anh dặn bỏ mắt Mlem); HẾT THOẠI mới hiện màu từng khung.
  Tên người nói lúc thoại = "UNKNOWN MEME" (anh dặn, chưa lộ danh tính).
  ⚠️ DỰNG LẠI (5/11, anh chê "đứng 1 hàng chán, tư duy đơn giản", gửi ảnh mẫu Akatsuki góc ngước): nóc nhà = ẢNH POSE anh vẽ `FIN_AKA_POSE.png`
  (5 con trên bệ đá, góc ngước, khung 16:9) — tách lớp từng con (`PL`) để thở / nghiêng / người nói gật đầu, dải băng đầu Ninja bay (`RIB`), bệ đá đứng yên;
  viền đỏ bóng hình vẽ từ NGUYÊN ảnh (vẽ theo lớp cắt sẽ lộ vạch thẳng). Mỗi câu thoại 1 góc máy (`ROOF_SHOTS`: cẩu lên → trung cảnh Mlem → Bat tiền cảnh
  → góc ngước Ninja → thủ lĩnh + trăng máu → cận Rinnegan → kéo lùi). Nền ĐEN là chính (anh dặn): sương máu thấp sau lưng nhóm (để bóng đen nổi), trăng máu,
  MÂY MÁU (`bloodCloud`), bóng toà nhà đen viền đỏ 2 bên. 5 khung vine boom = ẢNH RIÊNG từng con (`FIN_AKA_CHUD/BAT/NINJA/MLEM` tách từ ảnh 4, Depressed = DP_PAIN_IMG).
  POSE CUỐI: logo MEOWKATSUKI theo mẫu logo Akatsuki anh gửi (`emblem`: chữ cong font anime Shojumaru `assets/fonts/Shojumaru.ttf` OFL, vòng 10 nhẫn chữ Hán, mây đỏ chữ 猫, EST. 2026)
  ở lớp dưới cùng, nhóm thu 0.72 đứng đè lên, mép ảnh pose LÀM MỜ THẬT vào nền (`drawPoseFaded`), bỏ dải đen trên/dưới.
- Tiếng mới (myinstants): `fin_city` (xe cộ), `fin_crowd` (đám đông la hét), `fin_collapse` (nhà sập), `fin_icecream` (nhạc xe kem) — phát qua `mus` (đường dẫn thẳng, không khai AUDIO_SAMPLES).
- 🗣️ Giọng Nhật tên chiêu cảnh 4 (10/11, VOICEVOX Engine 0.26.1 directml ở `D:\tools\voicevox`, giọng **玄野武宏 ノーマル**): `mw_ryoiki_tenkai` 領域展開 · `mw_muryokusho` 無量空処 · `mw_murasaki` 虚式「茈」 — dùng phim nào có 3 tiếng này thì BẮT BUỘC ghi vào mô tả video: **`VOICEVOX:玄野武宏`** (điều khoản VirVox: thương mại OK nếu có credit, ghi trong video hoặc mô tả; cấm dùng làm hại hình ảnh nhân vật / huấn luyện model giọng).
- 💡 (5/11) ChatGPT giờ vẽ được SPRITE SHEET / GIF nhiều khung theo lưới đều → khi cần nhân vật CHUYỂN ĐỘNG (đi, chạy, khóc, vỗ cánh…) xin anh sprite sheet
  (cùng cỡ, cùng đường chân, cách đều, nền xanh) thay vì 1–2 ảnh tĩnh; mẫu lệnh ở cuối PROMPT.txt trên.

## 👁️ Friend Raid (5/11/2026, event Friend) — `js/raid-friend.js` (khối `RF` / `_rf*`), nạp bằng thẻ script trong index.html
- Menu chính → thẻ "Friend Raid" → mượn picker 2vs2 chọn 4 meme → khung DỌC 9:16 của 2vs2 (`duoCtx` gắn cờ `.raid`, `_rfOn()`); Friend = Fighter slot 4 team 1,
  `type='frraid'`, do `_rfWorldTick` điều khiển hết (game.js chỉ có các móc `if(_rfOn())…` / `frraid` / `_rfEaten`). Meme raid 2000 máu (em đặt, giống 2vs2).
- Bối cảnh (anh chốt): nền nửa trên trời đỏ + TRĂNG MÁU, nửa dưới thung lũng khói lửa + vực sâu (`_rfSky`); sân = TẢNG ĐÁ XÁM TRÒN lơ lửng (`_rfFloor`),
  tường tròn (`_rfCircleWall`). Friend phase 1 BÁM GÓC trên-phải (`_rfPerch`). Camera đứng yên (nhánh `_rfOn()` trong `_camUpdate`).
- Phase 1 (anh thiết kế): Friend bất tử; 2 tay bóng tối 2000 máu (`rfHands`, nằm trong `_hpSummonArrays`): tích lực 2s (vòng cảnh báo bám con mồi, 0.6s cuối khoá)
  → nện 200 dame vùng cỡ nắm tay; nện 2 lần → nằm sàn 5s, CHỈ lúc nằm mới đánh được (`_untarget` lúc bay — get enemy/_findClosestEnemy/_summonFoes bỏ qua).
  Tay + cánh tay vẽ bằng đúng bộ tay Scared Hamster (`_hmArmSprite` + `HAND_*`, hàm `_rfArm`).
- Phase 2: gầm (`fr_titan_roar`) → ra giữa sân → 10 tay sau lưng đâm lên trời; 5000 máu. Skill 1 mỗi 3s: 3 vùng cảnh báo 2s → tay từ trời nện 100.
  Skill 2 (em đặt: lần đầu sau 7s, rồi mỗi 10s): há mồm hút chậm 1.5s → meme sát miệng bị nuốt (`_rfEaten`), nhai 5s × 50 dame/s rồi nhổ ra.
- Chiêu giết ngay / khống chế lên Friend + tay → đổi thành dame 10% máu tối đa (anh dặn: "đổi thẳng ra dame trực tiếp"): `_forceKill` chặn sẵn,
  còn mọi đường khác (gán hp=0/dead, `_mwErased`, `_tfSwallowed`, `_mmHeld`, `_bcGone`…) do `_rfGuard` mỗi tick phát hiện qua máu "thật" `_rfHp` rồi hoàn lại. Phase 1 Friend bất tử → chỉ hoàn lại.
- HUD (anh: kiểu rogue-lite / Deltarune): thanh boss trên cùng (phase 1 hiện 2 thanh tay, phase 2 1 thanh), 4 ô đồng đội dưới đáy, thanh máu có vệt trắng tụt trễ (`_rfHud`).
- Tiếng: phase 1 `rf_world_revolving` (The World Revolving — Deltarune, myinstants bản full 101s, CÓ BẢN QUYỀN Toby Fox → video dễ dính Content ID), phase 2 `fr_song`.
  Trong raid tiếng meme khác ×0.45, nhạc theme meme khác tắt (`_rfSndVol` trong playSample; meme nhạc vẫn bắt nhịp nhưng câm — `_playPianoSong`).
- Ảnh CHỜ ANH (prompt ở Desktop `FriendRaid_anh_can_ve/PROMPT.txt`): `assets/img/friend/RF_MOUTH.png` (há mồm to: hút + gầm), `RF_CHEW1/2.png` (nhai). Chưa có thì dùng tạm khung cười.

## ☀️ LeSunshine (`lebronsunshine`, 12/11/2026) — khối `LB_*` / `_lb*` trong js/game.js
- Thường: nửa người cầu thủ ném bóng (ảnh GPT `LB_THROW`, hoạt cảnh lấy đà/bật tới bằng code) · bóng trúng 3 lần → mặt meme (`LB_FACE`) gom sáng 0.9s → loé trắng (`LB_FLARE` nền đen, cộng sáng) → địch loá 2.5s, CHỈ có tiếng hiệu ứng
  · về 0 máu (`_lbDamage` ở đầu _takeDamageCore) → lướt ra giữa sân thành mặt trời (`LB_SUN`), phát `lb_song` (cả bài, lặp), thiêu 100/s, còn 3 vạch (mỗi đòn 1 vạch, cháy/độc không tính).
- ⚠️ GPT CHẶN vẽ tư thế mới của NGƯỜI NỔI TIẾNG (nhận ra từ ảnh mẫu, kể cả ảnh GPT tự vẽ) — vẽ được 1 ảnh ném bóng rồi bị chặn hết. Cần thêm tư thế → anh tự vẽ ChatGPT, hoặc làm chuyển động bằng code từ ảnh có sẵn.
- `lb_sing` / `lb_ult` (bản đầu) không còn dùng.

## 👁️ FRIEND - Eldritch Apocalypse (`friendeldritch`, 11/11/2026) — khối `FE_*` / `_fe*` trong js/game.js
- To gấp 2 Friend (size 88; anh hạ từ gấp 3), dùng CHUNG bộ chiêu + ảnh Friend: mọi chỗ kiểm tra Friend giờ là `_FR_TYPES.has(type)`; roster mặc định trỏ ảnh `assets/avatars/friend/*` (`_FE_SLOTS`).
- GẦM mỗi 5s (`_feTick`): 10 đợt sóng âm / 1.5s, mỗi đợt 20 dame lên mọi địch + quân triệu hồi, đẩy lùi nhẹ (rung ≤5 — rung >5 bật chớp trắng cỡ sàn).
- Địch sát người → Friend LAO NHẸ người tới húc 50 + đẩy lùi nhẹ (`_feTenTick`/`_feLungeOff`, chỉ dịch hình). Đã thử đuôi xúc tu → anh bỏ ("không ổn").
- 4 GÓC: địch vào vùng nhỏ (`_feCornerR` ~62) → tay bóng tối (`_rfArm`, đúng bộ tay Hamster) cào 100, mỗi góc hồi 1s.
- 🌑 `_voidOn()`: trận có Friend Eldritch HOẶC Scared Hamster → nền canvas NGOÀI sàn đen tuyền chỉ còn sao (`_voidSky`); SÀN GIỮ NGUYÊN MÀU (anh sửa: "canvas đen thôi, sàn giữ nguyên").
- Số em tự đặt: tốc 3.5, 1000 máu, gầm đầu tiên sau 3s. Info (theo lore phong ấn): "Sealed by four gods. Didn't take."

## 🤖 Mechanic Cat — Gundam (làm lại 11/11/2026) — khối `GD_*` / `_gd*` / `GD2_*` / `_gd2*` trong js/game.js
- Ảnh Gundam (cả 2 mẫu) quay mặt TRÁI → `g.flip = e.x > f.x`. 500 máu (`GD_HP`) + SHIELD = máu còn lại của mèo (đỡ trước, máu mèo giữ ≥1); vỡ → `_gdExplode` NỔ TUNG (không vỡ mảnh, cờ `_gdBoom`), mèo chết theo, KHÔNG lắp lại.
- Mỗi trận ngẫu nhiên `g.model`: 1 = Gundam beam (rig 6 bộ phận cũ; tia bắn đúng trục nòng `_gdBarrelA`; mỗi phát thứ 3 tích 2s → luồng to +50% + cháy);
  luồng to = chiếu LIÊN TỤC 2s vào chỗ khai hoả, mỗi 0.5s 50 + cháy; vòng va chạm Gundam 0.95× mèo; MỌI dame (kể cả chuẩn / giết ngay) đi qua Gundam, chết lúc đang lái → nổ (`_gdBoomFx`); thanh shield + máu có số; tiếng lắp `mc_gd_fly` / `mc_gd_lock` (cắt ngắn từ mc_sfx_craft vì đỉnh ở 2.17s → nghe chậm).
  2 = Gundam ĐỎ (ảnh anh gửi + 2 tư thế GPT vẽ `GD2_wind/GD2_slash`, cỡ/neo trong `GD2_META`): chỉ chém, kiếm khí `gdQi` bay TẦM XA tới hết sân (85, xuyên); tốc chém ban đầu 1 nhát/s, mỗi nhát +2% (tối đa ×4). Lắp dần từ chân lên (`GD2_BANDS`).
- 🎨 Mac đã cài Codex (`brew install codex`, đăng nhập bằng mã thiết bị: `codex login --device-auth` — anh đã bật tuỳ chọn này trong Cài đặt bảo mật ChatGPT).

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
  → `_bcBreak` gãy nghịch lý (3 chấm đỏ đếm đòn trên đầu). Gãy thì về ảnh gốc BC_IDLE, khựng 0.5s giật + bốc khói + tia lửa như máy hỏng (`B.jam`), rồi di chuyển lại bình thường. Không còn bất tử, không đứng hình cả sân (anh dặn 2/11).
  🌟 (3/11) Hút xong (`BC_BANG_AT`) → 2.8s TỐI ĐEN chỉ còn 1 VÌ SAO xanh-trắng (lõi + vệt loé ngang dài + tia toả + bụi sao) lớn dần, theo GIF mẫu `KwxeRW.gif` anh gửi (`_bcStarDraw`, `bcStarT`, `BC_STAR_T`)
  → 0.33s bùng trắng từ vì sao ra (`BC_FLASH_T`) → TRẮNG TINH (không quầng vàng), mèo ổ bánh mì ĐI QUA ĐI LẠI giữa khung, thanh máu ∞; máy quay KHÔNG zoom (giữ khung toàn sân, `_camUpdate` nhánh `bcStarT`) — anh muốn cảm giác trống trải; loop chạy thêm ~12s để thấy mèo đi.
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
  Tốc độ (3/11): giọng Dota Voice kéo dài TỪNG CHỮ → file đang dùng `l2pro_narration_fast.wav` = file gốc cắt ngắt giữa câu + nén từng câu (WSOLA, giữ cao độ, làm trong trình duyệt)
  về 130–150 từ/phút, mỗi câu 1 tốc độ (anh: "không đều trong khoảng 130–150 là hợp lý"). Lần sau tạo giọng mới: chỉnh Speed ~1.3 ngay trên MiniMax cho tự nhiên hơn.
  Giọng TTS hay lỗi đọc → anh nhắc "nghe chuẩn ngữ pháp": Claude không tự nghe được, phải nhờ anh nghe lại bản đọc.

## 🧪 Anime Lab · Mewing Cat vs Depressed Cat (3/11/2026) — `js/film-mvd.js` (cine-kit, id `mvd`, 9:16, 23s)
- DỰNG LẠI (anh chê bó khung giữa + chậm): mốc ở object `T`, cắt dày, khung lệch, chiêu cuối cắt xen nhanh, CHIA KHUNG CHÉO lúc biến hình đồng thời (8.2–10s) và lúc 2 con trượt lùi (15.4–16.6s, trượt ±330) rồi mở toàn cảnh rộng.
- Anh: fight 25–30s cực cháy, chuyển cảnh anime, tung chiêu liên tục, kết bằng 2 chiêu cuối hất 2 con lùi — NGANG TÀI NGANG SỨC. Chiêu bám game:
  Mewing (tư thế mewing → tượng Moai, dạng Gojo, HOLLOW PURPLE) vs Depressed (mây/mưa/sét, dạng Pain, SHINRA TENSEI, mưa đứng hình khi hoá Pain).
- Ảnh: bán thân có sẵn cho 0–20s; 4 ảnh toàn thân anh vẽ ChatGPT (3/11, chân mèo thật) `assets/img/cine/MVD_*`: GOJO_BLAST (đệm chân 95.1%/40%), PAIN_PUSH (2 chân đẩy, đệm chân trước 3.9%/33.9%; ảnh 1 chân bị lỗi tư thế → anh vẽ lại), GOJO_KB, PAIN_KB
  → Hollow Purple sinh ở đệm chân Gojo, tường Shinra từ đệm chân Pain, hất văng dùng ảnh KB; đứng dậy cuối phim dùng ảnh thường (anh bỏ ảnh thở dốc: "vẫn nhẹ nhàng"). Lệnh vẽ luôn ghi rõ chân mèo thật, không tay người.
- Khung dọc hẹp: hất văng chỉ tới ±170 (máy dist 740), cảnh kết 2 con tiến lại ±128 rồi quay chính diện.
- Đã áp MẸO COMBAT (skill `dung-phim`): hit-stop `HSTOP`/`hs()`, lấy đà `dash()`, đà sau đòn `backOut`. Đoạn tay đôi 17–20s dùng 10 tư thế anh vẽ (`MVD_G1–G5` Gojo, `MVD_P1–P5` Pain: thủ thế / lấy đà / ra đòn / trúng đòn / né; G3 là bản vẽ lại vì bản trên tấm lỗi tay), biên đạo bằng keyframe `TRK` + `track()`: va ngang → Pain lao, Gojo cúi né → Gojo phản đòn → Pain trả đòn → tách ra. Tấm nhiều tư thế đứng sát nhau → tách theo VÙNG LIỀN KHỐI (không cắt cột được).

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
