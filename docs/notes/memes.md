# Ghi chú chi tiết từng MEME / sân đấu / Friend Raid (tách từ CLAUDE.md 16/11/2026)

Đọc khi làm việc với đúng meme đó. Nguyên văn từ CLAUDE.md, không tóm.

## Nhật ký gần đây (cho phiên sau nắm) — Ver 394, 27/10/2026
- 🦫 **Scream Marmot - The Last Saiyan** (`saiyanmarmot`; đổi tên 31/10, trước là Saiyan Marmot): code khối `MM_*` / `_mm*` trong js/game.js. Tiếng ầm lúc quăng (`cine_impact` 2.9s) cắt còn 0.8s (anh 17/11: bị vang).
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

## 🌈 Nyan Cat làm lại (15/11/2026) — `NY_*`, khối rainbowTrails trong js/game.js
- Dải cầu vồng ĐANG KÉO chạm địch: 150 (dải tan). Dải ĐÃ NỐI = vật cản THẠCH co giãn: địch chạm bị nảy bật ngược theo quán tính (phản xạ vận tốc, tối thiểu 1.2× tốc chạy), mất 50; lần chạm thứ 3 dải đứt (mất 100, tiếng se_glass, mảnh cầu vồng văng).
  Dải lún + rung nảy lại chỗ bị đè (`_drawPixelRainbow(path,alpha,J)`). Tiếng nảy `ny_boing`. Không còn +3% tốc khi chạm tường. Long Cat chạm dải thì không bị nảy.

## 🥊 Boxing Cat làm lại hình + VFX (15/11/2026) — khối `BX_*` / `_bx*` trong js/game.js
- Giữ cơ chế tích dame cũ. VFX cũ (quả cầu chấn động + nứt kính Râu Trắng, `_bxFxAt`) nay CHỈ của Gigachad; Boxing Cat dùng `_bxAuraDraw` (hào quang shader cam → đỏ → thêm lửa đen),
  vòng cảnh báo đập nhịp tim + tàn lửa + mốc ≥250 chữ ゴゴゴ & viền màn đỏ; cú đấm `_bxPunchFx` (vệt nắm đấm, `BX_IMPACT` ảnh GPT nền đen cộng sáng, vạch tốc độ mảnh, ≥180 sóng bóp méo `_bxShockPost`, ≥250 khung đảo màu 2 khung).
  Bản đầu VFX đấm to che kín sân → đã thu nhỏ (anh không thích đau mắt).
- Anh thêm: mỗi lượt tích có 2 lần NÉ (`_bxBlink`: dịch chuyển tới điểm xa địch nhất, lưới 7×7) → hết 2 lần né thì chuông `bx_bell` (ting ting ting) → lần 3 địch vào tầm mới ăn đấm. Dame tích đủ KẾT LIỄU con trong tầm (dame ≥ máu còn) → bỏ qua né, đấm luôn.
  Tiếng đấm nặng dần theo dame (se_punch_high → se_punch_heavy → se_super_hit+se_impact_stop → cine_strongpunch+se_super_hit+se_big_explode), KHÔNG dùng bx_whitebeard nữa.
  Mốc ≥500 (`_bxTierB`=4, anh dặn 15/11): ĐẤM CHẤN ĐỘNG — loé trắng, 3 vòng sóng âm lan cả sân (`bxQuake`), sóng chạm đoạn rào nào thì vỡ đoạn đó (`_gcEdgeBreak`, vỡ tới hết trận), sàn quanh điểm đấm nứt vỡ (`_floorShatter`), lúc đang tích ≥500 sàn rung nhẹ + ゴゴゴ to hơn.
  Dame (anh đổi 15/11): khởi điểm 50, mỗi nhịp ~0.42s +INC; INC = 10 + 5 × (số lần 3s trận đã trôi qua — anh hạ từ 4s) — bỏ kiểu +5 sau mỗi cú đấm.
  Nhạc `bx_nostalgia` (liljan2k1 "nostalgia.mp3", tải SoundCloud — CÓ bản quyền, video dễ dính Content ID) chạy liền từ lần đấm gió đầu tới khi chết / hết trận. Bị choáng → ảnh động đứng hình.
- Khung hình: 25 khung `BX_V_01..25` (bỏ 9 khung AI tách mất tay vung nhoè — LUÔN soi từng khung cạnh khung video gốc, đừng chỉ soi bảng nhỏ) tách từ video TikTok anh gửi bằng `tools/vid2sprite.py --warm-gray` (tay vung khuất bóng bị xám → nhuộm lại màu lông, không còn trông như khuyết) (skill `video-sang-sprite`): khung 1 = dáng đứng (cũng là avatar), 2–25 = tràng đấm 15 khung/giây; `_byH=1.08` giữ thân cỡ cũ.
- ⚠️ iCloud trên Mac: Desktop đồng bộ iCloud + "Optimize Mac Storage" → iCloud DỌN file của repo (cả .git) thành file rỗng tải-khi-cần → trang game mở treo, git/release treo.
  Kiểm: `find . -type f -flags +dataless | wc -l`; tải lại: `brctl download <file>` từng file. Đã khuyên anh tắt Optimize Mac Storage / chuyển repo ra khỏi Desktop.

## 🐱 Loooong Cat làm lại (`loooongcat`, 13/11/2026) — khối `LC_*` / `_lc*` trong js/game.js (cạnh `_findClosestEnemy`)
- Anh chốt (nhiều vòng trong ngày): vào trận là CON MÈO AVATAR đi bộ tới CỔNG LCD kiểu Nokia ở góc DƯỚI phía mình (`_lcPad`, `_lcPadsDraw`: nền #c7f0d8 + mực #43523d, khung + chấm mồi pixel nhấp nháy, tới gần sáng dần)
  → chui vào cổng 1s (`LC_DIVE_T`, ảnh đứng thu nhỏ trượt vào giữa màn + ô pixel hút vào) → trồi ra (`_lcInit`, tiếng 8-bit `lc_link`): ĐẦU ra trước, thân ra được 1 đoạn = con mèo trong ảnh (2×size) thì đuôi mới ra rồi CẮM ở cổng (đuôi ảo `st` âm = còn trong cổng, chỗ sát cổng mờ dần)
  → bò DỌC LÊN theo tường, hết cột quay đầu chữ U sang cột kế bên (góc trái lấp sang phải, góc phải ngược lại; cột cách nhau đúng bề dày thân, cột đầu/cuối + vòng U sát tường). KHÔNG đuổi địch (bản bò cong săn địch anh chê "loạn").
- (13/11 tối) KHÔNG đẩy địch xuyên qua thân: địch luôn bị giữ ở phía sân CÒN TRỐNG (bên kia cột đang bò, `_lcCols`/`_lcPC`), đầu húc thì đẩy tới trước / lách sang khoảng trống; hết chỗ đứng → NỔ TUNG (`_lcPop`). Tốc gốc 3 (anh: chậm hơn 40%).
- (15/11 tối, anh: "đẩy địch vào trong các kiểu, check lại rất kĩ") — 3 lỗi gốc đã sửa:
  ① vệt thân + cắn + dồn ép chạy trong đoạn code chỉ chạy khi CÓ MỤC TIÊU → địch chết / tàng hình là vệt ngừng ghi, thân nối CHÉO tới đầu. Giờ `_lcTick` + `_lcSqueeze` chạy ở tầng THẾ GIỚI mỗi nhịp sau `_bounceFighters` (và cả lúc đóng băng màn hình).
  ② địch tự đi vào thân chỉ bị đẩy ra 9px/nhịp → giờ đặt thẳng ra mép trống; làn trước đầu không cho lấn sang cột cũ; thêm lớp "cả thân là khối đặc" (đẩy ra vuông góc khúc thân, kể cả khúc quay chữ U), kẹt giữa các khúc → nổ.
  ③ Doge biến hình phình to trong lúc đóng băng màn → lấn vào thân. Kiểm tự động: đo mỗi nhịp khoảng cách địch ↔ thân (đấu Doge / Catvader / Sus Dog / Pop Cat / 2vs2) → 0 lần lấn.
- (15/11 tối) Đầu húc KHÔNG gây dame, KHÔNG hồi máu nữa (anh bỏ) — chỉ đẩy + tốc ×1.05; địch chết khi bị ép hết chỗ (nổ) / bò kín sân. Trước đó có cắn 60 + hồi 20; MIỄN NHIỄM mọi khống chế (`_lcCCFree` xoá sạch choáng/chậm/đóng băng/trượt/rối/hất bay mỗi tick, đầu update); không bị dải thạch Nyan nảy.
- (cũ) Đầu chạm địch: cắn 60 + tốc ×1.05 (trần ×3; 60 / hồi 0.5s / trần em tự đặt). Thân = tường chặn người + đạn (`_lcBlockShot`), không dame; chỉ đầu ăn dame (`_lcRayBlock`). Kín sân → ép tan địch còn sống (giữ từ bản cũ). Góc cổng chọn theo bên đứng, KHÔNG Math.random.
- Ảnh: avatar = bản GPT PHÓNG NÉT trung thành ảnh meme gốc (đúng dáng 1 tay duỗi, 1 tay giơ cạnh mặt). Ảnh có tay CHỈ dùng cho con mèo đi bộ trước khi vào cổng (anh dặn). ĐẦU rắn `LC_HEAD` (ảnh nhìn từ trên xuống, 2 chân trước gập) XOAY THEO HƯỚNG BÒ, tai chĩa về trước — đã thử mặt cố định nhìn ra màn hình và đầu có tay cắt từ avatar, anh đều bỏ ("đầu cố định trông không hợp lý").
  Đuôi `LC_TAIL` (ngắn, chỉ nhỉnh hơn chân sau) + khúc thân lặp `LC_BODY` cắt từ 1 ảnh GPT nhìn từ trên xuống; thân gầy 15% (`LC_BODY_K=0.85`); lát ở khúc cua nới rộng theo độ gắt (hết răng lược). Tiếng cắn `lc_chomp`. Info: "Nokia 1280 called. It wants its snake back."

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

## 😾⛓️ Angry Cat (`angrycat`, 17/11/2026) — khối `AC_*` / `_ac*` trong js/game.js (cạnh `_findClosestEnemy`)
- Ảnh: GPT phóng nét trung thành đúng con mèo xám trắng tai cụp anh gửi (bỏ tay người + cột đen), GIỮ NGUYÊN mặt gốc cả trận (anh: "không cần thêm biểu cảm") — `AC_CALM`.
  Dáng ảnh gốc = 1 tay bám cột (phía tường) + 1 tay giơ (`AC_PAW`, phóng móc + nắm địch). Mũi lao kiểu Scorpion `AC_KUNAI` + đoạn xích lặp `AC_CHAIN` (GPT nền xanh).
  Sát tường / đang ra chiêu → `AC_GRIP` (tay phía tường vươn ra bám hẳn vào mép sân, ảnh bám bên PHẢI; bám tường TRÁI thì lật). Không vẽ cột / đổi mép sân (anh: "để sân nguyên bản").
- KHÔNG dính tường cả trận (anh 17/11 bắt lỗi): trong 4s hồi chiêu (cả trúng lẫn trượt) đi lại như meme thường; hồi xong thì chạy ra tường trái/phải GẦN NHẤT (`_acMove`). Chạm tường lúc hết hồi chiêu → `_acTryGrab` (gọi đầu `bounceWalls`) bám vào (`A.grab`, tâm = `_acHalfW` cho tay chạm mép), nhịp sau phóng móc → phóng móc + "GET OVER HERE" (`ag_getoverhere`, giọng Mortal Kombat có bản quyền)
  → trúng: kéo về (`_acHeld` = nạn nhân bị khoá như `_mmHeld`, không tham gia `_bounceFighters`), quật qua đầu nện vào tường PHÍA TRÊN mèo 3 lần × 50 × (1 + tức/100), rồi hất văng.
  Con miễn hất bay (`_mmCanLaunch` false: Long Cat, Larry, Chonky…) → chỉ ăn 1 cú, không kéo.
- Tức: bị đánh +5 (không tính DOT), mỗi giây −1, tối đa 100 = +100% dame. Hào quang shader (lửa cam → đỏ → thêm lửa đen từ 70). Cú nện: bụi + đá vụn + vòng xung kích to dần theo dame, ≥80 sóng bóp méo, ≥90 vỡ đoạn rào tường. Tiếng nện đã giảm nhỏ (anh: "đau đầu") và cắt sau 0.45s (anh: hết va tường là ngắt, không để vang). Giọng GET OVER HERE nâng tông ×2.3 + nói nhanh hơn cho non nớt như mèo con (anh chê bản kéo chậm "giống phụ nữ lớn tuổi" — đừng atempo chậm).
- Bộ skill cũ của Angry Cat (thanh tức + hòm đồ 10 vũ khí + bom nguyên tử) anh bảo để cho 1 con khác → nằm trong `git stash` trên Mac ("WIP Angry Cat 17/11"), dùng tiền tố `AG_` (không đụng `AC_`).
