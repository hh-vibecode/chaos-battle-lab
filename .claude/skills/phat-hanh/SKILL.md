---
name: phat-hanh
description: Phát hành bản mới Chaos Battle Lab lên main trên máy Windows của anh Hải (không có python nên KHÔNG chạy được tools/release.py) — tăng số bản + giờ VN, gắn ?v=, cập nhật assets-manifest.json, commit "Ver N: ...", push. Dùng mỗi khi làm xong việc trong game (anh đã dặn làm xong là tự đẩy, không cần hỏi).
---

# Phát hành bản mới (thay tools/release.py)

> Đang ở **MacBook** (có python3) → cứ `python3 tools/release.py "mô tả"` như cũ; skill này chỉ cho máy Windows.

## Trước khi phát hành
1. `powershell -File tools/win/syntax.ps1` phải OK. Thay đổi có hình/skill → đã chạy thử bằng skill **chay-thu**.
2. `git -C . status --short` + `git diff --stat`: chỉ có file MÌNH sửa. Thấy file lạ → có thể phiên khác đang sửa cùng lúc → KHÔNG `add -A`, dùng `-files`.
3. Cập nhật mục "Nhật ký gần đây" trong `CLAUDE.md` nếu thay đổi đáng để phiên sau biết.

## Chạy
```
powershell -File tools/win/release.ps1 -msg "<mô tả tiếng Anh, kiểu các commit cũ>" -authorName "Hoàng Hải" -authorEmail "<email tài khoản đang dùng>" -files js/game.js,CLAUDE.md,assets/img/<key>/NEW.png
```
- `-dryRun` để xem trước số bản + file mới vào manifest mà không ghi gì.
- Bỏ `-files` = `git add -A` y như release.py (chỉ khi chắc không có ai khác đang sửa repo).
- Script tự: kiểm remote (đang thua origin thì dừng, bảo `git pull --ff-only origin main`), đổi `GAME_VERSION={build:N,at:"HH:mm · dd/MM/yyyy"}` theo giờ VN,
  thay mọi `.css?v=` / `.js?v=` trong index.html, dựng lại manifest (giữ thứ tự cũ, cập nhật mã băm, bỏ file đã xoá, thêm file mới), commit qua file `-F`, push `HEAD:main`.
- Máy này KHÔNG cấu hình tên/email git → luôn truyền `-authorName/-authorEmail` (tên anh: Hoàng Hải; email lấy từ userEmail của phiên).

## Mô tả commit
- Tiếng Anh, bắt đầu bằng tên meme / mục: `Saiyan Marmot: ...; Catvader: ...` (script tự thêm `Ver N: ` và dòng Co-Authored-By).
- Nói điều NGƯỜI CHƠI thấy, không nói tên biến.

## ⚠️ Bẫy đã gặp
- File .ps1 phải ASCII: PowerShell 5.1 đọc UTF-8 không BOM thành ANSI → "·" thành "Â·" (script đã dùng `[char]0x00B7`).
- Dấu ngoặc kép trong `-m "..."` bị PowerShell 5.1 làm vỡ khi truyền cho git → luôn commit bằng file `-F` (script đã làm).
- `git push` in ra stderr nên PowerShell báo exit 255 dù push thành công → tin dòng `abc..def  HEAD -> main`.
