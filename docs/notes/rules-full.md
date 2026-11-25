# Luật làm việc — bản ĐẦY ĐỦ nguyên văn (CLAUDE.md trước khi rút gọn, 16/11/2026)

CLAUDE.md giữ bản gọn. Cần ví dụ, ngày, lời anh dặn gốc của 1 luật → tra ở đây.

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

## ⚠️ GHÉP NỐI PHẢI KHÉO — không bao giờ để lộ mối ghép (anh dặn 2/11/2026, áp cho MỌI phim + VFX game)
- Mọi chỗ 2 thứ gặp nhau (cánh tay ↔ bàn tay, vật ↔ bóng tối nó chui ra, ảnh cắt ↔ nền, hiệu ứng ↔ nhân vật, cảnh ↔ cảnh) phải có
  PHƯƠNG ÁN xử lý trước khi vẽ, không ghép đại: cùng nét/chất liệu ở chỗ nối (đúng bề ngang, đúng hướng, cùng kiểu vệt sáng),
  gốc chìm dần vào bóng tối / khói phủ lên mép (KHÔNG có mép cắt thẳng), ảnh bị cắt mép thì mờ dần mép, vật không vắt ngang vật khác vô lý.
- Ví dụ đã sửa: tay bóng tối trong Prologue lúc đầu là ống trơn viền tím + ảnh bàn tay dán vào đầu → anh chê "như gắn vào";
  giờ cánh tay vẽ CÙNG NÉT ảnh tay (chép `_hmArmSprite`), cổ tay khớp bề ngang ảnh, gốc tay khói bão phủ dày → mỏng dần (`shadowArm(...,{root})` trong docs/mau-phim/film-l2pro.js).
- Bớt chi tiết thừa khi cảnh rối (anh bỏ hết xúc tu phụ ở cảnh bão: "lộn xộn quá"). Xong cảnh nào phải chụp khung soi kỹ CHỖ NỐI trước khi báo xong.

## ⛔ NGUYÊN TẮC CAO NHẤT KHI VẼ ẢNH: GIỮ ĐÚNG NGUYÊN TÁC MEME (anh dặn 12/11/2026)
- ⛔⛔ (13/11, anh nhấn) ƯU TIÊN DÙNG NGUYÊN ẢNH MEME GỐC: "xài được nguyên bản meme mà vẫn mô tả được hành động là hay nhất… vì meme nó mới có cái hồn · vẽ thêm nó vỡ nguyên tác".
  TRỪ cảnh giao tranh tay chân (đỡ / chém / đấm cần tư thế), còn lại dùng ảnh gốc + chuyển động code (nghiêng, nảy, giật lùi, lật) + VFX + cắt góc.
  Cần đổi 1 chi tiết thì SỬA ảnh gốc đúng 1 chỗ (vd Gojo kéo băng bịt mắt lộ 1 mắt — FIN_G6_EYE), KHÔNG vẽ lại cả con mèo 4 chân. Pop / Huh / Doge thường: giữ avatar gốc.
- Mọi ảnh / sprite sheet vẽ thêm bằng GPT chỉ được đổi GÓC NHÌN + TƯ THẾ. Chất ảnh phải Y MEME GỐC: kết cấu lông / da, màu, độ mờ ảnh chụp, ánh sáng.
  KHÔNG thành mô hình 3D bóng loáng, KHÔNG thêm cơ bắp / chi tiết cho "đẹp" (12/11 em vẽ Buff Doge thành cơ bắp nhựa kiểu 3D → anh: "làm nó giống meme gốc, chỉ là upscale lên thôi").
- Quy trình: (1) UPSCALE trung thành ảnh meme gốc trước (chỉ khử mờ / nhiễu, giữ nguyên mọi thứ) → (2) lấy chính ảnh upscale đó làm --ref cho mọi tư thế / góc,
  câu lệnh luôn ghi rõ "same photographic meme texture, NOT a 3D render, NOT plastic, NOT glossy" → (3) soát cạnh ảnh gốc, lệch chất ảnh là vẽ lại.

## ⏱️ PHIM KHÔNG CÒN GIỚI HẠN THỜI LƯỢNG (anh dặn 12/11/2026 — "note vào")
- Từ giờ KHÔNG ép phim / cảnh vào thời gian bắt buộc. Anh có nói con số thì đó chỉ là thời lượng XẤP XỈ đề xuất — làm ra DÀI HƠN vẫn được.
  Cảnh nào cần dài thì làm cho ĐỦ CẢNH, hợp lý nhất là được; KHÔNG nén nhịp tới mức vội (bản trận phụ 22s bị chê "rush, đau mắt").

## ✍️ KỊCH BẢN TRƯỚC, DỰNG SAU (anh dặn 13/11/2026 — chê nặng: "ngoài fight của gojo tự t viết, các fight khác k ổn tí nào… làm cẩu thả kinh khủng")
- Mọi cảnh / trận mới hoặc làm lại → skill `viet-kich-ban` (mẫu nguyên văn anh viết: `.claude/skills/viet-kich-ban/mau-cua-anh.md`) → đưa anh DUYỆT → mới dựng (skill dung-phim).
- Đòn nào cũng có PHẢN ỨNG (giơ vũ khí đỡ đúng hướng / né / trúng + bật lùi) — Ninja vs Berserk bị chê "chém nhau mà không có động tác giơ kiếm ra đỡ".
- NHẠC (anh chốt 13/11): mỗi trận / cảnh 1 bản EPIC / anime CHẠY DÀI (cả bài, KHÔNG lặp đoạn ngắn — file 8s lặp nghe ra ngay), em tự tìm (yt-dlp `D:	oolsyt-dlp`).
  `dp_akatsuki` (nhạc Pain 2, dính bản quyền) CHỈ 5s đúng lúc Depressed Cat. Pain's Theme chạy dài được. Trước đây dp_akatsuki 8.3s bị lặp nền cả 3 trận phụ + nóc nhà → bị chê. Giọng hô chiêu = GIỌNG THẬT (Gojo: Yuichi Nakamura), KHÔNG VOICEVOX ("rất đần").
- Kịch bản 3 trận phụ + sửa tiếng Gojo vs Pain: `prompts/kich-ban/fin1-tran-phu.md` (13/11, ANH ĐÃ DUYỆT → ĐÃ DỰNG LẠI Ver 597–601, CHỜ ANH XEM).
- ✅ (13/11, Ver 597–601) Đã dựng lại theo kịch bản duyệt: fin1f2 Bat v2 36s (minigun vòng khói, đường nấp vạch ở chế độ thám tử, chữ HUH khổng lồ, nắm phi tiêu → bom) · fin1f3 Ninja vs Berserk 42.7s
  (32 tư thế `FIN_F3_N_*` / `FIN_F3_B_*`, chiều cao tương đối `FIN_F3_POSES.json`) · fin1f1: XÍCH = ô mắt xích GPT `FIN_F1_CHAIN_TILE` lặp dọc đường (`linkScreen`), Doge bị trói / nhấc = ảnh có xích quấn sẵn
  (`FIN_F1_DOGE_CHAINPULL/CHAINLIFT`, HAND = chỗ đầu xích thò ra) · anh chê 13/11: Doge nằm đất xích KHÔNG được nối vào bụng → nối 2 cổ tay, nhấc bổng cao rồi mới quật. Tập full 4:52.
  Nhạc mới (m4a từ YouTube, cả bài, không lặp): mus_batman · mus_kokuten / mus_forces / mus_senya · mus_kusari / mus_overtaken · mus_girei (nóc nhà → cảnh 5 + Pain bay lên) · mus_jjk_toji / mus_honored (Gojo vs Pain).
  Giọng Gojo thật: vo_gojo_domain (0.4–3.0s Ryōiki Tenkai · 8.8s→ Muryōkūsho) · vo_gojo_murasaki — em KHÔNG nghe được, cắt theo đường độ to → CHỜ ANH NGHE CHỐT. Bat = bản 2 anh tả (Pop minigun, Bat lăn lộn trốn, phi tiêu chặn chữ HUH khổng lồ, bom dơi);
  Ninja = nhiều tư thế, Kamui ra SAU LƯNG chém xuống → Berserk quay lại chém đỡ; XÍCH = vẽ GPT (Doge có xích quấn sẵn trong ảnh + mắt xích lặp nối đúng đầu xích), bỏ xích vẽ code.

## 🎞️ CẢNH VFX NẶNG = NỀN VẼ GPT THEO LỚP + NHÂN VẬT ẢNH GỐC GẮN BẰNG CODE (anh chốt 16/11/2026: "ghi nhớ cách này")
- Cảnh chấn động / tụ lực / nổ / sét / đá vỡ kiểu anime (vd ảnh edit đỏ – đen anh gửi 16/11, video Zenitsu 0:43–0:48) → KHÔNG dựng full 3D, KHÔNG vẽ VFX bằng code nét mảnh.
- Cách làm:
  1. Có video mẫu → chụp khung (`tools/x/video-frames.html`, skill edit-video mục 5) → mỗi nhịp lấy 1 khung làm KHUÔN bố cục (`--ref`).
  2. GPT vẽ NỀN không nhân vật, không hiệu ứng (đất nứt, cây, phố…) + VẬT RỜI vẽ riêng trên phông xanh (tấm đá, khối băng…) → code cho vật rời chuyển động (đá nổi so le, xoay, nhấp nhô, tảng gần bay trước nhân vật) — mượt hơn ghép khung vẽ sẵn (anh 16/11: "vẽ đá phông xanh xong cho vào nền, vẽ theo layer"). Sét / tia / cột sáng = code.
     ⛔ Nét vẽ phải như anime VẼ TAY (tô phẳng, 2–3 tông, viền mực) — KHÔNG kiểu tranh AI nhiều chi tiết / bóng loáng (anh chê "thừa mứa chi tiết kiểu AI vẽ"). Câu lệnh luôn ghi rõ "hand-drawn TV anime, flat cel, NOT AI art".
     ⛔⛔ (anh nhắc 16/11 "nhớ quy tắc ấy giùm") NỀN = CHỈ KHUNG CẢNH. Mọi VẬT THỂ CÓ TƯƠNG TÁC (toà nhà bị húc đổ, cột bị đấm vỡ, đá bay, băng vỡ…) vẽ RIÊNG trên phông xanh
        rồi code gắn vào + cho gãy / đổ / nổ. Meme + effect cũng code bổ sung. Nền mà có sẵn toà nhà thì không phá được (bản đầu cảnh húc xuyên 3 toà nhà bị chê vì vậy).
     🔥 Cảnh anh dặn "làm cẩn thận" → VFX MẠNH: sóng chấn bóp méo (post shocks), tách RGB, zoom blur, impact frame 2 màu, cháy trắng, đổi tông, bóng đen mắt sáng (kiểu god) khi gồng / giậm.
     ⛔ KHÔNG BAO GIỜ cho GPT vẽ lại meme trong khung (bản 16/11 GPT vẽ cả Doge + Chud → anh bắt bỏ hết: "t cần m vẽ xong thêm meme vào, chứ k bảo m vẽ cả meme").
  3. Lớp TIỀN CẢNH (mảnh vỡ bay sát máy, tia sét vắt ngang) GPT vẽ trên NỀN ĐEN → vẽ `lighter` đè lên nhân vật → có chiều sâu.
  4. Nhân vật = ẢNH MEME GỐC (giữ hồn meme, không lệch mặt giữa các khung) gắn bằng code: viền sáng + nhuộm theo màu nền, bóng đổ + bụi phủ chân (không lộ mép ghép), rung, đẩy máy chậm.
  5. Edit code đè lên: impact frame, cháy trắng, tách RGB, chớp (`K.edit`). Lớp ảnh vẽ trong `world` (F.list d:-1e9) để vẫn ăn rung / grade / impact frame — mẫu `zenPlate` / `ZSEQ` trong js/film-fin1f1.js.
- Nền 1 bộ dùng lại được cho nhiều cảnh; đổi tư thế chỉ thay ảnh nhân vật. Mỗi cảnh 3–5 tấm GPT, không phải 10–15.
- Ảnh GPT ra PNG ~2.5MB → nén JPG 0.86 (~350KB) qua trình duyệt ngầm trước khi đưa vào `assets/img/cine/`.
- Trận Chud vs Doge (js/film-fin1f1.js, 16/11) đã dựng lại HOÀN TOÀN 2D theo lớp (bảng `SHOTS` = [giây đầu, giây cuối, hàm vẽ], mỗi shot 1 góc tĩnh) — mẫu cho các trận sau.
- 🐕 BUFF DOGE: to GẤP 3 meme thường (anh dặn 16/11). Chỉ dùng ẢNH GỐC (rageAvatarUrl) + Haki của game; ảnh Buff Doge vẽ lại tư thế (đỡ / đấm / quỳ / chạy / bị xích trói / đa góc) anh chê "không giống nguyên tác tí nào" → đã bỏ, KHÔNG vẽ lại. Động tác = chuyển động code + vệt sáng.

## 🔎 SOÁT PHIM TRƯỚC KHI BÁO XONG (anh chê 13/11: "m có check thật không", "làm cẩu thả")
- Bảng khung thu nhỏ 320px KHÔNG đủ: soát MỖI GIÂY 1 khung (`film-check.js <id> --t $(seq -s, 0.5 1 DUR) --w 360+`) rồi soát lại CẬN (--w 640) mọi chỗ nối / chỗ nghi.
- Bảng lỗi phải dò từng khung: VẬT CHE NHÂN VẬT (gạch / xe / trụ / dầm giữa máy và nhân vật) · VẬT SÁT MÁY phình to (vòng khói, xích, cáp cầu) · máy ĐI XUYÊN nhân vật khi trượt (tz đổi giữa shot) ·
  nhân vật LƠ LỬNG / CHÌM (chân không chạm đất / nóc xe) · ĐI LÙI (look nhìn đối thủ trong khi đi ngược hướng) · CỠ không đồng nhất giữa các tư thế / tấm GPT khác nhau · chỗ NỐI xích / vũ khí vào tay ·
  khoá [giây,x,ảnh,ease,nhoè,z,y] bỏ trống z / y thì GIỮ z / y của khoá trước (Fin1Fight.track) → muốn về 0 phải ghi rõ.
- 🎬 CẮT CẢNH, KHÔNG CHO MÁY BÁM / TRƯỢT trong khung 3D (anh dặn 13/11: "cứ cắt cảnh cắt góc, hạn chế dùng góc máy trên khung 3D, nhiều vấn đề, trông xấu"):
  mỗi pha 1 góc TĨNH, đổi pha = CẮT. Trận Fin1 bọc `W.cutify(C.seq([...]),{keep})` (js/fin1-fight.js) tự tách shot trượt thành góc tĩnh; chỉ giữ đẩy máy ≤5%.
- 🔊 Mỗi cú 1 tiếng ĐÚNG CHẤT, không dùng lại cho cú khác loại (13/11 anh chê "sound xài lại không hợp lý"): bom ≠ xe nổ, tiếng đấm ≠ nhát kiếm, mỗi lần đỡ kiếm xen 2–3 tiếng va khác nhau.
- Xích / vật quấn người: GPT vẽ phần QUẤN vào ảnh nhân vật, xoá đoạn thẳng (`tools/x/png-erase.js`), code chỉ nối mắt xích lặp từ mép vòng quấn. KHÔNG vẽ vòng quấn bằng code.

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
- ⚡ PHA NHANH KHÔNG CẦN VẼ NHÂN VẬT (anh dặn 12/11): húc / lướt / tràng đòn / va chạm tốc độ cao → dùng KỸ THUẬT ANIME thay cho sprite: cả 2 hoá VỆT TỐC ĐỘ CAO (mảnh, đầu sáng trắng, quầng màu riêng từng nhân vật),
  BÓNG MỜ (afterimage), LƯỚT nhoè (smear), VFX va chạm. Nhân vật chỉ hiện ở khung chạm + lúc tiếp đất / bật lùi. Vừa đúng chất anime vừa CHE lỗi tư thế, đỡ phải vẽ thêm.
  Mẫu: `streak()` / `ramStreaks()` trong js/film-fin1f1.js (cú húc One-Punch Shiba → 2 vệt vàng / đỏ xé qua ngọn cây). Anh: "nên học thật nhiều vào" — xem anime để học thêm kiểu này.

## Phim (Meme Cinema) — TỈ LỆ là quan trọng nhất
- Giữ tỉ lệ nhất quán giữa vật thể khổng lồ và meme nhỏ ở MỌI góc máy: meme thường ~100–170, Gigachad khổng lồ ~1000, quỷ khổng lồ rộng ~2000, bom vĩ thú đường kính ~860 (đơn vị thế giới trong docs/mau-phim/cine-war.js).
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

## Skill của repo (`.claude/skills/`, thêm 28/10/2026)
- `them-meme` (danh sách việc thêm meme mới) · `tach-nen-anh` (ảnh ChatGPT nền xanh → khung game) · `chay-thu` (chạy thử trận bằng Edge headless) · `phat-hanh` (đẩy bản mới không cần python)
  · `xuat-video` (CHỈ Mac: phim + trận đấu giả lập; chỉ quay lại đoạn bị sửa) · `dung-phim` (dựng phim anime bằng cine-kit) · `xem-video` (CHỈ Mac: video mẫu → bảng cảnh) · `tao-vfx` (VFX shader cho game + phim) · `ve-anh-gpt` (em tự vẽ ảnh GPT qua Codex: meme gốc → phông xanh nét + tư thế mới) · **`viet-kich-ban`** (13/11: VIẾT KỊCH BẢN theo mẫu anh viết → ANH DUYỆT rồi mới dựng). · **`edit-video`** (16/11: edit kiểu CapCut / AMV — `K.edit` impact frame 2 màu, duotone, cháy trắng, đổi màu, tách RGB, zoom blur · `W.powerUp` vận lực đất nứt đá nổi · tiếng `ed_hit1…10` · công cụ học video mẫu 30 khung/giây).
- 🎞️ **MỌI video xuất ra mặc định 50fps — dọc hay ngang, phim hay trận** (anh chốt 3/11, note kỹ). Đã đặt sẵn: render-match / render-duo `--ofps 50` (game chạy 1 tick/khung theo luật 60 tick/s → VẪN giả lập 60, chỉ chụp khung sang ô 1/50s mới, bỏ đều 1/6 — KHÔNG hạ `--fps` giả lập, sẽ làm trận chậm 17% + lệch nhạc), render-cine `--fps` mặc định 50.
- **🎬 PHIM luôn xuất 4K, ngang lẫn dọc (anh chốt 3/11): 16:9 → 3840×2160 · 9:16 → 2160×3840 — render-cine mặc định đã là 4K, KHÔNG thêm `--scale 1.5`. TRẬN ĐẤU giả lập: 9:16 DỌC 3K 1620×2880 (anh chốt 30/10, render-match `--w 1620`).** Anh không nói khung → mặc định DỌC 3K.
- ⛔ **Trận đấu giả lập phải TỰ NHIÊN — KHÔNG can thiệp diễn biến/kết quả** (anh dặn 10/11: em từng dùng `--inject` chặn Bread Cat bị huỷ lần 3 cho đúng ý → anh bắt xoá).
  Chỉ được LỌC chọn seed (`--win`, `--dirok`…). Chạy thử nhiều seed mà không ra đúng ý anh → BÁO ANH (kèm tỉ lệ thắng / diễn biến thật), để anh đổi cặp đấu.
- 🏆 **Trận đấu giả lập LUÔN ưu tiên THẮNG SÁT; video 1vs1 dài tới 30s, trận đông (2vs2, Last One Standing) tới 35s vẫn được** (anh nới 13/11, trước 20–25s): chạy thử nhiều seed, gom ≥3 trận đúng bên thắng VÀ đúng độ dài (`--want 3 --pdur 20-30` / `20-35`) rồi lấy trận con thắng còn ÍT máu nhất (`tools/render-queue.sh`).
- 🏷️ Tên video: **"Meme A vs Meme B"** (2vs2: "A & B vs C & D") — anh dặn 25/11 bỏ đuôi " - Meme Battle" (bản 13/11 có đuôi đó). Video đã quay rồi thì KHÔNG đổi tên lại (anh tự đổi trên YouTube).
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
