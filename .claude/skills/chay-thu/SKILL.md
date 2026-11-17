---
name: chay-thu
description: Chạy thử Chaos Battle Lab THẬT (Mac hoặc Windows) — mở Edge/Chrome headless, vào trận meme A đấu B, ép trạng thái skill, chụp màn hình, bắt lỗi JS. Dùng sau mọi lần sửa skill/VFX/meme, trước khi phát hành, hoặc khi cần nhìn tận mắt một hiệu ứng.
---

# Chạy thử trận (Mac + Windows)

Công cụ là JavaScript thuần trong `tools/x/` (không cần npm). Cách chạy 1 script `X.js`:
- **Mac**: `node tools/x/X.js ...`
- **Windows** (máy anh không có node, dùng Node của VS Code): `powershell -NoProfile -File tools/node.ps1 tools/x/X.js ...`
Dưới đây viết `NODE` = 1 trong 2 cách trên. Ảnh chụp / file tạm để ở scratchpad, không để trong repo.

## 0. Kiểm cú pháp (vài giây)
`NODE --check js/game.js`  (exit 0 = OK; Windows: `powershell -NoProfile -File tools/node.ps1 --check js/game.js`)

## 1. Bật máy chủ file — chạy NỀN (run_in_background)
`NODE tools/x/serve.js`  → http://127.0.0.1:8765/   · tắt: `NODE tools/x/serve.js --stop`

## 2. File steps (mỗi lệnh JS đúng 1 dòng)
Copy `tools/x/steps-example.txt` ra scratchpad rồi sửa. Lệnh: `reload` · `eval <js>` · `evalsave <tên> <js trả dataURL>` · `shot <tên>` · `wait <giây>`.
- Dòng đầu luôn `reload` (bỏ cache + service worker → chạy đúng code vừa sửa). Dòng 2 định nghĩa `__go(A,B)`, `__probe()`, `__errs`.
- Vào trận: `eval __go('<keyA>','<keyB>')` → `wait 3` → `eval startGame('instant'); 'ok'`.
- Ép trạng thái cho nhanh: `eval (()=>{ const m=fighters.find(f=>f.type==='saiyanmarmot'); m._mm.ssj=true; return 'ok'; })()`.
- Chụp ĐÚNG khoảnh khắc: `setInterval` chờ điều kiện → `togglePause()` → `shot` → bỏ pause (mẫu cuối file).
- Vẽ riêng 1 thứ phóng to: vẽ lên canvas bằng chính hàm game rồi `evalsave` `toDataURL()` (`ctx` là const).

## 3. Chạy
`NODE tools/x/cdp.js --steps <file> --out <scratchpad>/t --port 9455 --launch`   (lần sau bỏ `--launch` để dùng lại trình duyệt đang mở)
- Tự chọn trình duyệt: Windows Edge/Chrome, Mac Chrome/Edge/Chromium. Profile ở thư mục tạm `cbl-browser-profile` → boot lần đầu 1–2 phút, lần sau nhanh.
- Read ảnh `<out>/<tên>.png`; đọc `__probe()` / `__errs` — có lỗi JS là sửa trước khi phát hành.

## 4. Dọn
`NODE tools/x/cdp.js --stop` (chỉ tắt trình duyệt chính script này mở) + `NODE tools/x/serve.js --stop`.
Trên Windows TaskStop chỉ tắt PowerShell bọc ngoài — vẫn phải chạy 2 lệnh `--stop` này.

## ⚠️ Bẫy đã gặp
- **Cổng 9333 hay bị trình duyệt của PHIÊN KHÁC chiếm.** Không bao giờ điều khiển trình duyệt mình không mở (đã từng chạy nhầm JS vào trang phiên khác). `--launch` tự từ chối cổng bận.
- Không tắt msedge/chrome bừa bãi — chỉ dùng `--stop`.
- Lệnh JS nhiều dòng trong steps không chạy → gói `(()=>{ ... })()` 1 dòng.
- Trên Mac cũng có sẵn `tools/render-match.js` (playwright, quay video trận) — dùng khi cần quay MP4.
