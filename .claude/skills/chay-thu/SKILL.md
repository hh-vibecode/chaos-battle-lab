---
name: chay-thu
description: Chạy thử Chaos Battle Lab THẬT trên máy Windows của anh Hải (không có node/python/playwright) — mở Edge headless, vào trận meme A đấu B, ép trạng thái skill, chụp màn hình, bắt lỗi JS. Dùng sau mọi lần sửa skill/VFX/meme, trước khi phát hành, hoặc khi cần nhìn tận mắt một hiệu ứng.
---

# Chạy thử trận trên máy Windows

> Đang ở **MacBook** (có node + playwright) → dùng `node tools/render-match.js --sim 3 --a <key> --b <key>` (xem đầu file đó) thay cho skill này.

Công cụ ở `tools/win/` (PowerShell 5.1, chỉ ký tự ASCII). Ảnh chụp / file tạm để ở **scratchpad**, không để trong repo.

## 0. Kiểm cú pháp trước (5 giây)
```
powershell -File tools/win/syntax.ps1          # exit 0 = OK; mặc định kiểm js/game.js
```

## 1. Bật máy chủ file (chạy NỀN, run_in_background)
```
powershell -File tools/win/serve.ps1           # http://127.0.0.1:8765/
```
Xong việc nhớ TaskStop nó.

## 2. Viết file steps (mỗi lệnh JS phải nằm trên ĐÚNG 1 dòng)
Mẫu: `tools/win/steps-example.txt` (copy ra scratchpad rồi sửa). Lệnh: `reload`, `eval <js>`, `evalsave <tên> <js trả dataURL>`, `shot <tên>`, `wait <giây>`.
- Dòng đầu luôn là `reload` (bỏ cache + service worker → chắc chắn chạy code mới vừa sửa).
- Dòng helper trong mẫu định nghĩa `__go(A,B)` (vào màn trận), `__probe()` (máu/vị trí/lỗi JS), `__errs` (gom lỗi).
- Vào trận: `eval __go('saiyanmarmot','ninjacat')` → `wait 3` → `eval startGame('instant'); 'ok'`.
- Ép trạng thái để xem nhanh, vd `eval (()=>{ const m=fighters.find(f=>f.type==='saiyanmarmot'); m._mm.ssj=true; return 'ok'; })()`
- Muốn chụp ĐÚNG khoảnh khắc: đặt `setInterval` chờ điều kiện rồi `togglePause()`, sau đó `shot` (xem mẫu cuối file steps-example).
- Vẽ riêng 1 thứ phóng to: dừng vòng lặp, vẽ lên canvas bằng chính hàm của game, `evalsave` lấy `toDataURL()` (canvas `ctx` là const, không đổi được).

## 3. Chạy
```
powershell -File tools/win/cdp.ps1 -steps <file> -outDir <scratchpad\t> -port 9455 -launch   # lần đầu: mở Edge
powershell -File tools/win/cdp.ps1 -steps <file> -outDir <scratchpad\t> -port 9455           # các lần sau: dùng lại Edge đang mở
```
- Lần đầu boot tải ~1000 file nên mất 1–2 phút; profile Edge giữ ở `%TEMP%\cbl-edge-profile` nên lần sau nhanh.
- Xem ảnh bằng Read (`<outDir>\<tên>.png`). Đọc kết quả `__probe()` / `__errs` — có lỗi JS là phải sửa trước khi phát hành.

## 4. Dọn
```
powershell -File tools/win/stop-test.ps1       # chỉ tắt Edge thử nghiệm (lọc theo profile)
```
+ TaskStop máy chủ file.

## ⚠️ Bẫy đã gặp
- **Cổng 9333 thường bị Edge của PHIÊN KHÁC chiếm.** Không bao giờ điều khiển trình duyệt mình không mở (đã từng chạy nhầm JS vào trang phiên khác). `-launch` tự từ chối cổng bận; dùng 9455 hoặc cổng khác.
- Không tắt msedge.exe bừa bãi — chỉ dùng `stop-test.ps1`.
- PowerShell không phân biệt hoa thường: `$X` và `$x` là MỘT biến (từng gây vòng lặp vô hạn).
- Lệnh JS nhiều dòng trong steps không chạy được → gói vào `(()=>{ ... })()` trên 1 dòng.
- Bộ kiểm tra an toàn tự động đôi khi báo "no verdict" → thử lại; trong lúc chờ làm việc đọc code.
