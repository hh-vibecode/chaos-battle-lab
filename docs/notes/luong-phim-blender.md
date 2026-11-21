# Luồng làm phim (PC ↔ Mac) + VFX mô phỏng Blender — 18/11/2026

> Anh dặn 18/11: "note lại toàn bộ luồng này và hướng dẫn cho Mac để nó cài luồng làm phim". Từ khi chuyển làm phim trên PC (Windows), Mac chủ yếu chỉ update game + nhân vật → **Mac chưa từng kéo / soát phần làm phim**. Phiên Mac đọc file này TRƯỚC khi làm phim.

## 1. Phân việc 2 máy
| Việc | PC Windows | Mac |
|---|---|---|
| Viết kịch bản, dựng phim (js/film-*.js), soát hình (film-check, anim-check, lint) | ✅ chính | ✅ được |
| Mô phỏng VFX Blender (tools/blender/) | ✅ (Blender 5.2.4 ở `D:\tools\blender-5.2.4-windows-x64`) | ✅ sau khi cài (mục 2) |
| Xuất video MP4 (render-cine, render-match), tìm sound, xem video mẫu | ❌ (không node / ffmpeg / python) | ✅ CHỈ Mac |
| Video mẫu anh gửi | `D:\meme-anime-lab-videos\` (KHÔNG có trong repo) | tải lại bằng yt-dlp nếu cần |

Mọi thứ làm phim đều NẰM TRONG REPO: Mac chỉ cần `git pull` là có. Ảnh mô phỏng đã tô sẵn (sheet PNG) cũng được commit vào `assets/` → **Mac xuất phim KHÔNG cần chạy lại Blender**. Chỉ cần Blender khi làm hiệu ứng MỚI.

## 2. Mac — cài luồng làm phim (làm 1 lần, theo thứ tự)
1. **Kéo bản mới nhất** (Luật số 0): `cd ~/Projects/chaos-battle-lab && git fetch origin && git rev-list --left-right --count HEAD...origin/main` → thua thì `git pull --ff-only`. Còn `git stash` "WIP Angry Cat 17/11" — ĐỪNG pop (anh để giao con khác).
   - Gặp `.git/index 2` (iCloud) → `git read-tree HEAD` (xem CLAUDE.md mục Máy).
2. **Soát công cụ sẵn có**: `node -v` (≥18), `ffmpeg -version`, `python3 -c "import numpy, PIL"`, `npx playwright --version` (render-cine). Thiếu cái nào → cài bằng Homebrew (`brew install node ffmpeg`, `pip3 install numpy pillow`, `npx playwright install chromium`).
3. **Cài Blender 5.2.4 LTS** (CÙNG bản với PC — mô phỏng khác bản có thể ra khác):
   ```bash
   cd ~/Downloads
   ARCH=$(uname -m); [ "$ARCH" = arm64 ] && F=blender-5.2.4-macos-arm64.dmg || F=blender-5.2.4-macos-x64.dmg
   curl -LO https://download.blender.org/release/Blender5.2/$F
   hdiutil attach $F -nobrowse -mountpoint /Volumes/BlenderDMG
   cp -R /Volumes/BlenderDMG/Blender.app /Applications/ && hdiutil detach /Volumes/BlenderDMG && rm $F
   node tools/blender/blender.js --where      # phải in /Applications/Blender.app/Contents/MacOS/Blender
   ```
   (Tên file dmg đúng thì kiểm ở https://download.blender.org/release/Blender5.2/ ; Gatekeeper chặn thì `xattr -dr com.apple.quarantine /Applications/Blender.app`.)
4. **Chạy thử Blender** (~10s): `node tools/blender/blender.js boom_sim -- --out /tmp/boomtest --frames 30 --res 48 --px 192` → phải in `XONG …/boom_sim.png`. Mở ảnh xem: 30 ô, cầu lửa trắng → vàng → cam → khói nâu, có viền mực.
5. **Chạy thử soát phim**: `node tools/x/film-check.js vfxboom --t 0.8,1.6,2.5,3.5` và `node tools/x/anim-check.js vfxboom` (tự bật / tắt Chrome headless + máy chủ; dùng xong tự tắt).
6. **Chạy thử xuất** (chỉ khi anh bảo xuất): skill `xuat-video`.
7. Xong → báo anh "Mac đã cài luồng phim" + ghi 1 dòng vào cuối file này (ngày, bản Blender, chip).

## 3. Luồng dựng 1 cảnh (cả 2 máy)
1. Kịch bản (skill `viet-kich-ban`) → anh duyệt.
2. Dựng (skill `dung-phim`): file `js/film-<id>.js`, bảng SHOTS 2D, mỗi shot 1 góc tĩnh; nền GPT (chỉ lớp dưới cùng) + vật tương tác vẽ riêng phông xanh + meme ảnh gốc + VFX bằng code (CLAUDE.md mục Ảnh / VFX, "dựng theo lớp").
3. VFX: impact / strobe / spacing / ease → skill `hoat-hoa-vfx` (`js/vfx-boom.js`). Vụ nổ / khói / lửa lớn → **mô phỏng Blender** (mục 4).
4. Soát: `film-check.js` (mỗi giây 1 khung + cận chỗ nối), `anim-check.js` (giật / chớp / đứng hình), `film-lint.js` + `sfx-lint.js` phải SẠCH.
5. Phát hành: Windows `tools/x/release.js --msg … --files …` · Mac `python3 tools/release.py "…"`.
6. Xuất video: CHỈ Mac, CHỈ khi anh bảo.

## 4. VFX mô phỏng Blender (vì sao + cách dùng)
**Vì sao** (anh chê 18/11 "vụ nổ nhiều sạn", "chưa hiểu logic vật lý"): vẽ tay bằng code thì vật lý sai (vòm lớn chậm, tường bụi tăng tốc, đá lơ lửng). Blender (miễn phí, mã nguồn mở) có bộ giải chất lỏng / khí **Mantaflow** tự tính đúng: cầu lửa phồng nhanh rồi chậm dần, khí nóng nổi lên cuộn thành nấm, lửa nguội thành khói, khói tan. Anh hỏi After Effects + MCP (bài cộng đồng Claude VN): AE tốn phí + anh phải tự cài / mở → chọn Blender (em tự cài, tự chạy ngầm, anh không phải làm gì).

**Luồng** (`tools/blender/boom_sim.py`, gọi qua `tools/blender/blender.js`):
1. Dựng cảnh trong Blender bằng script: miền khí 16×16×16 m (đáy = mặt đất), nguồn nổ = quả cầu sát đất PHỒNG nhanh 0.2s đầu rồi tắt (lửa + khói + phụt ra ngoài).
2. Bake Mantaflow (lưới 128 ≈ 3–5 phút trên i5-14400F; lưới 48 ≈ 5s để thử nhanh).
3. **Không render Cycles** (khói bị lốm đốm nhiễu) → đọc thẳng lưới 3D trong cache OpenVDB (`import openvdb` có sẵn trong Blender) → chiếu chính diện + đổ bóng 3D (ánh sáng trên-trái) bằng numpy.
4. Tô CEL: khói 4 tông phẳng, lửa 4 tông (đỏ → cam → vàng → lõi trắng), viền mực ở mép ngoài + ranh tông tối. Bảng màu `--pal fire|cyan|purple`.
5. Ra 1 tấm sheet PNG (10 cột, ô 384 px vuông, đáy ô = mặt đất, tâm nổ giữa ngang) + json. Nén / chép vào `assets/img/cine/VFX_<TÊN>.png`.
6. Trong phim: `VfxBoom.simSprite(F,t,{t0, key:'SIM', meta:{frames:90,cols:10,px:384,fps:30,ground:[0.5,1]}, x, z, size, twos:true, hold:true})` trong `world` — tấm đứng trong thế giới, tự co theo khoảng cách. `twos:true` = vẽ trên 2 (chất anime). Mẫu: `js/film-vfxboom.js`.
7. Đi kèm bằng code (không mô phỏng) — `VfxBoom.groundShock(F,t,o)`: vòng sóng chấn trên đất, nứt đất theo mép sóng, hố cháy, đá văng parabol nảy 1 lần rồi nằm yên; và chớp sáng TỨC THÌ tắt trong ~0.2s · sóng chấn bóp méo r ∝ t^0.4 (nhanh rồi chậm, Sedov–Taylor) · rung máy khi sóng chấn TỚI máy (trễ sau chớp, không phải lúc chớp).

**Tham số** (`-- --frames 90 --res 128 --px 384 --name boom_sim --blast 3.2 --beta 3.2 --pal fire --skip-bake`): `--blast` bán kính cầu lửa (m), `--beta` độ nổi (cao = bốc lên nhanh, nấm rõ), `--skip-bake` chỉ tô lại khi đã bake (đổi màu / ngưỡng không phải chạy lại mô phỏng).
**Cache** (vài trăm MB) để ở thư mục tạm / scratchpad, KHÔNG để trong repo. Chỉ commit sheet PNG cuối.

**🧱 Sàn bật theo sóng — CÙNG môi trường vật lý với vụ nổ (19/11, anh: "nền vs vụ nổ phải liên kết, thực sự cùng môi trường vật lý")** — `boom_sim.py --tiles 17 --fire-delay 10`:
- Mỗi ô sàn 1.4 m = khối bê tông (rigid body) nằm trên 1 TẤM NỀN ĐẤT riêng (vật bị động hoạt hoạ). Đúng khung mặt sóng chấn r = K·t^0.4 tới (K = 25.67 m = 7700 đv phim, CÙNG K với code vòng sóng / rung máy) tấm nền đội lên nhanh 2 khung (∝ r^−0.8, mép ngoài cao hơn) rồi lún → ô bị đẩy văng qua VA CHẠM thật → Blender tự giải bay / va nhau / rơi / nảy / nằm lại. Đo 19/11: gần tâm bật 1.3 m, 14–17 m bật 0.26 m, bật trễ sóng 0.02–0.05 s.
- Xuất `<name>_tiles.json` (vị trí + quaternion mỗi ô mỗi 2 khung) → nén (làm tròn, bỏ khung lặp khi nằm yên: 1.15 MB → 260 KB) → `assets/img/cine/VFX_BOOM_SIM_TILES.json` → phim dựng lại từng ô bằng `VfxBoom.simTiles` (hộp 3D, mặt trên hắt ánh lửa, hố tối ở chỗ cũ; ô chưa động không vẽ → không lộ đường nối với sàn thành phố).
- Cầu lửa bùng TRỄ sóng 10 khung (`--fire-delay 10`) đúng trình tự anh chốt: TÍCH TỤ → NỔ (chớp) → SÓNG ÂM đi trước → SÀN BẬT lần lượt từ tâm ra hết màn → NỔ TO.
- ⚠️ BẪY đã gặp: (1) `transform_apply(scale=True)` của Blender MẶC ĐỊNH áp cả VỊ TRÍ → mọi vật dồn về gốc, rigid body nổ tung → luôn ghi `location=False, rotation=False`. (2) Gán vận tốc bằng cách cho vật "animated" dịch 1 khung rồi nhả → Bullet ra vận tốc sai hàng chục lần → dùng VẬT BỊ ĐỘNG ĐẨY qua va chạm. (3) `--skip-bake` KHÔNG giữ được cache (Blender xoá khi dựng lại miền khí) → muốn tô lại phải chạy lại cả mô phỏng.

**Đề xuất nâng cấp gửi anh 19/11 (chờ anh chọn):** ① nhà sập vỡ THẬT (Cell Fracture + rigid body: mảng tường gãy, rơi, nảy đúng trọng lực) cho cảnh Doge húc nhà / Shinra Tensei · ② đá + mảnh vụn văng bằng rigid body (thay đá vẽ code) · ③ sóng chấn mặt đất bằng mô phỏng (mặt đất lưới bị đẩy phồng / vỡ) · ④ thư viện VFX dựng sẵn 1 lần: nổ nhỏ / vừa / cực lớn, khói phép màu (tím Gojo, đỏ Pain), bụi đổ nhà, cột lửa · ⑤ vải bay (áo choàng Pain, cờ) · ⑥ Grease Pencil: VFX nét vẽ tay 2D (chém, sét, vệt tốc độ) · ⑦ góc máy 3D thật cho vật khổng lồ (Friend xé mây như thiên thạch: mây mô phỏng bị xé toạc) · ⑧ mây / khí quyển mô phỏng (biển mây cảnh kết).
**Hướng mở rộng** (chưa làm, làm khi cần): đá văng = rigid body Blender (rơi đúng trọng lực, nảy, nằm yên) · bụi chân nổ cuộn ra (nguồn khói dẹt sát đất) · khói phép thuật nhiều màu · Grease Pencil (nét vẽ tay 2D trong Blender) cho VFX dạng nét · nhiều góc máy (xoay miền khí).

## 5. Trạng thái 18/11
- Blender 5.2.4 LTS: PC ✅ (`D:\tools\blender-5.2.4-windows-x64`) · Mac ⏳ chưa cài.
- `boom_sim.py` xong trên PC (lưới 128, 90 khung ≈ 2 phút): cầu lửa → sóng chấn quét bụi sát đất (vỏ trụ nở r∝t^0.45, miền 28×28×20 m) → nấm khói. Sheet: `assets/img/cine/VFX_BOOM_SIM_FIRE.png` (ô 384×274). Chấn động mặt đất bằng code: `VfxBoom.groundShock`. Mẫu 5s `vfxboom` đã thay sang bản này.
- `tools/x/anim-check.js` (soát giật / chớp / đứng hình) chạy được.
- Việc phim còn dở: `docs/notes/viec-do-fin1.md` (② sửa cảnh Chill Guy, ③ làm lại cảnh kết).

## Nhật ký cài đặt
- 18/11/2026 · PC Windows · Blender 5.2.4 LTS (zip không cài, ổ D) · i5-14400F, 16GB, RX 560.

- 21/11/2026 · MacBook này chip **Intel (x86_64)** → Blender 5.2.x chỉ có bản `macos-arm64` (download.blender.org/release/Blender5.2/) → KHÔNG cài được cùng bản với PC. Mô phỏng Blender làm trên PC; Mac dựng VFX nổ bằng code (js/vfx-boom.js) + dùng sheet mô phỏng đã commit (VFX_BOOM_SIM_FIRE). Playwright: repo không có node_modules → chạy kèm `NODE_PATH=<thư mục node_modules của playwright trong ~/.npm/_npx>`.
