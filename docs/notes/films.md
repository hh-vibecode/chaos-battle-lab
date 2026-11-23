# Ghi chú chi tiết từng PHIM + bộ dựng phim cine-kit (tách từ CLAUDE.md 16/11/2026)

Đọc khi sửa / dựng đúng phim đó. Nguyên văn từ CLAUDE.md, không tóm.

## 🎬 Bộ dựng phim anime (bắt đầu 28/10, dựng xong khung 29/10/2026)
Mục tiêu anh đặt: Claude dựng được ~70–75% cảnh bất kỳ anh yêu cầu, đặc biệt cảnh COMBAT NHANH kiểu anime, góc máy liên tục, góc khó
(ảnh mẫu: góc cao chéo từ trên xuống, 2 nhân vật xoay người, khói + vệt chém + năng lượng — kiểu Jujutsu Kaisen).
- **Đã có (29/10):** `js/cine-kit.js` = bộ khung chung (máy quay 2.5D: bay vòng / góc cao chéo / ngước / qua vai / nghiêng; sân đá phối cảnh + trời + núi;
  khói toon, sóng xung kích, vệt chém, hào quang theo bóng nhân vật, tia lửa, đá văng, speed lines, khung impact, chữ tượng thanh; khung chạy + bảng điều khiển + xuất offline).
  Phim mới chỉ cần `js/film-<id>.js` gọi `CineKit.film({...})`; ⚠️ (23/11) app KHÔNG vẽ phim trực tiếp nữa: rạp phát video (GitHub Releases, link trong `video/films.json`) xuất bằng `tools/x/film-video.js <id>` (xem CLAUDE.md mục Xuất video); `playCineKit(id,{live:true})` chỉ để dò lỗi lúc dựng; `tools/render-cine.js <id>` tự nhận phim cine-kit.
  Bài thử: `docs/mau-phim/film-dvc.js` — Buff Doge vs Samurai Cheems ~7.6s (Meme Cinema → 🧪 Anime Lab). Dùng ảnh có sẵn (Buff Doge P1–P5/haki, Samurai Cheems đứng/quay lưng/chém).
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

## 🎬 Meme Lore 2 · Ep 0 "The Truth" (31/10) — `docs/mau-phim/cine-lore2ep0.js`
- Sự thật đằng sau cảnh cửa sổ Ep 1, KHÔNG thoại: hẻm tối (Hamster bị 2 tay bóng tối đuổi, vả vào góc) → Chill Guy đá gãy 1 tay, ôm Hamster chạy, bị cào lưng
  → thềm nhà Ep 1 (mèo trắng đi làm về) → trong phòng băng bó, cúi ngó Hamster → bóng chồng trên cửa sổ → Depressed Cat hiểu lầm → nụ cười Friend trong khe hẻm tối.
- Dựng trên engine Ep 1 (phố/nhà/cửa sổ/bó hoa/mặt bầm CHÉP sang để khớp từng nét) + xuất offline: `node tools/render-cine.js l2e0 out.mp4` (mặc định 4K).
- Ảnh anh vẽ: `assets/img/cine/EP0_*` (KICK, RUN, DOWN, BANDAGE, WIFE_WALK, WIFE_HOLD). Chuột phải NHỎ (cao ~56 cạnh Chill Guy ~175).

## 🎬 Meme Lore · FINAL — Part 1 (5/11/2026) — `js/film-fin1.js` (cine-kit, id `fin1`, 16:9, 51s; Meme Cinema → MEME LORE 2 → "Final · Part 1")
- ⏱️ (11/11 anh dặn) Tập Final 1 nhắm dài **ÍT NHẤT 8–9 PHÚT** → cảnh nào cần thì MỞ RỘNG thoải mái (thêm shot, kéo dài nhịp, thêm chi tiết), KHÔNG nén thời lượng tới mức mất chi tiết / bị vội.
  (12/11) Không còn giới hạn thời lượng bắt buộc — số anh nói chỉ là xấp xỉ, dài hơn vẫn được (mục "PHIM KHÔNG CÒN GIỚI HẠN THỜI LƯỢNG" ở trên).
- ☁️ (11/11) Khói chung của cine-kit (`K.smoke`) làm lại: 6 kiểu cụm mây mềm mép lởm chởm, xoay ngẫu nhiên, nhuộm màu chỉ trên phần khói (anh chê khói cũ như bóng bay xám).
- 🧩 (9/11, anh chốt) Trận **Mewing/Gojo Cat vs Depressed/Pain Cat** là 1–2 CẢNH NẰM TRONG Final Part 1 (không phải phim riêng). Bản cũ `docs/mau-phim/film-mvd.js` (9:16, 23s, Anime Lab) chỉ để tham khảo.
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
   🔀 (12/11 khuya, anh dặn) THỨ TỰ MỚI: fin1c5 → **fin1f2 Bat vs Pop+Huh (trận ĐẦU)** → fin1f3 Ninja vs Berserk → fin1f1 → fin1c4. Nối: f2 kết = PHA HÀI (2 con rón rén → Huh dẫm bom CẠCH → đứng hình im lặng →
     Huh ngả đầu sang Pop "huh?" → Pop "pop" → NỔ) → vòng khói vụ nổ, lỗ khói lộ ĐẠI LỘ fin1f3 · f3 kết = mảnh kính lộ CÔNG VIÊN fin1f1.
   ⚔️ (12/11 khuya) fin1f3 nhát chém cuối (anh dặn): 2 con LAO VƯỢT QUA NHAU (2 vệt) → khựng quay lưng → mũi kiếm Ninja GÃY văng (cắt vùng mũi kiếm ảnh NS x0–125,y196–252) → đứt ngang người →
     vạch chém xẻ ngang CẢ DÃY NHÀ (`BLD_CUT`) đổ sập. Đoạn này không nén nhịp (k=1). Đa góc: Ninja `FIN_F3_NV_*`, Berserk `FIN_F3_BV_*` (cắt bằng gkey + `tools/x/keep-largest.js` vì kiếm chồng sang hình bên), Bat `FIN_F2_BV_*`.
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
      ✅ (12/11 khuya, Ver 585–587) ① đã làm: `W.retime(bảng, def)` chung (js/fin1-fight.js) nén theo LOẠI shot (đối mặt ×0.75 · thở/giới thiệu ×0.85 · đánh ×0.92 · ra chiêu ×0.95; thở sau nổ ≥1.25s);
      fin1c4 bảng riêng (tràng đòn ×0.85–0.95, mỗi hiệp 1 nhịp thở, chỉ chậm ở lãnh địa / đỡ Hollow Purple / đối mặt cuối). Tập full 5:44 → 5:11. ⑥ 5 thành viên cùng bật đi: XONG (5 vệt màu).
   ② SPRITE SHEET ĐA GÓC cho mọi nhân vật trong trận (Ninja, Berserk, Bat, Pop, Huh, Chud Kratos, Buff Doge, Mlem, Clapping, Gojo, Pain/Depressed): nhiều góc + nhiều động tác,
      vẽ bằng GPT theo lưới đều → dùng thay vì 4–5 ảnh tĩnh trượt qua lại. Đây là điểm yếu nhất anh chỉ ra.
   ③ VŨ KHÍ PHẢI VA CHẠM THẬT + HƯỚNG HỢP LOGIC: kiếm chạm kiếm đúng chỗ, xích quất / quấn đúng vào người, đòn đi đúng hướng đối thủ (không vung vào khoảng không).
   ④ XÍCH trận Chud vs Doge "lỗi tùm lum, không có lực" → soát từng khung, sửa chỗ gắn tay / quấn / căng / đứt; thêm lực (quật mạnh, căng rung, tia lửa).
      ✅ (12/11 tối, Ver 579–580) fin1f1 đã làm: bộ ĐA GÓC Doge + Chud vẽ lại đúng chất meme (`VIEWS` + `act()` chọn ảnh theo góc máy, `tools/x/sheet-cut.js` cắt tấm), xích tay xa xếp SAU thân (bộ khung xếp theo độ sâu → `chain(...,{d:+70})`), trần 7px bề ngang xích,
      ảnh đấm nện đất `FIN_F1_DOGE_GPUNCH`, One-Punch Shiba quay mặt PHẢI (`face:{side:1}`), máy cú lao VUÔNG GÓC đường lao → cắt thẳng sang Chud bị húc bay (máy cao trên ngọn cây, anh khen 12/11). Còn: các trận khác chưa có đa góc.
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

## 🌌 Meme Lore 2 · Prologue "The Dark Age" (2/11/2026) — `docs/mau-phim/film-l2pro.js` (cine-kit, id `l2pro`, 16:9, 170s)
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

## 🧪 Anime Lab · Mewing Cat vs Depressed Cat (3/11/2026) — `docs/mau-phim/film-mvd.js` (cine-kit, id `mvd`, 9:16, 23s)
- DỰNG LẠI (anh chê bó khung giữa + chậm): mốc ở object `T`, cắt dày, khung lệch, chiêu cuối cắt xen nhanh, CHIA KHUNG CHÉO lúc biến hình đồng thời (8.2–10s) và lúc 2 con trượt lùi (15.4–16.6s, trượt ±330) rồi mở toàn cảnh rộng.
- Anh: fight 25–30s cực cháy, chuyển cảnh anime, tung chiêu liên tục, kết bằng 2 chiêu cuối hất 2 con lùi — NGANG TÀI NGANG SỨC. Chiêu bám game:
  Mewing (tư thế mewing → tượng Moai, dạng Gojo, HOLLOW PURPLE) vs Depressed (mây/mưa/sét, dạng Pain, SHINRA TENSEI, mưa đứng hình khi hoá Pain).
- Ảnh: bán thân có sẵn cho 0–20s; 4 ảnh toàn thân anh vẽ ChatGPT (3/11, chân mèo thật) `assets/img/cine/MVD_*`: GOJO_BLAST (đệm chân 95.1%/40%), PAIN_PUSH (2 chân đẩy, đệm chân trước 3.9%/33.9%; ảnh 1 chân bị lỗi tư thế → anh vẽ lại), GOJO_KB, PAIN_KB
  → Hollow Purple sinh ở đệm chân Gojo, tường Shinra từ đệm chân Pain, hất văng dùng ảnh KB; đứng dậy cuối phim dùng ảnh thường (anh bỏ ảnh thở dốc: "vẫn nhẹ nhàng"). Lệnh vẽ luôn ghi rõ chân mèo thật, không tay người.
- Khung dọc hẹp: hất văng chỉ tới ±170 (máy dist 740), cảnh kết 2 con tiến lại ±128 rồi quay chính diện.
- Đã áp MẸO COMBAT (skill `dung-phim`): hit-stop `HSTOP`/`hs()`, lấy đà `dash()`, đà sau đòn `backOut`. Đoạn tay đôi 17–20s dùng 10 tư thế anh vẽ (`MVD_G1–G5` Gojo, `MVD_P1–P5` Pain: thủ thế / lấy đà / ra đòn / trúng đòn / né; G3 là bản vẽ lại vì bản trên tấm lỗi tay), biên đạo bằng keyframe `TRK` + `track()`: va ngang → Pain lao, Gojo cúi né → Gojo phản đòn → Pain trả đòn → tách ra. Tấm nhiều tư thế đứng sát nhau → tách theo VÙNG LIỀN KHỐI (không cắt cột được).
