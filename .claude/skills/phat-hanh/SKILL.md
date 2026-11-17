---
name: phat-hanh
description: Phát hành bản mới Chaos Battle Lab lên main (Mac hoặc Windows) — tăng số bản + giờ VN, gắn ?v=, cập nhật assets-manifest.json, commit "Ver N: ...", push. Dùng mỗi khi làm xong việc trong game (anh đã dặn làm xong là tự đẩy, không cần hỏi).
---

# Phát hành bản mới

`tools/x/release.js` làm đúng các bước của `tools/release.py` nhưng chạy được cả máy không có python.
Chạy: **Mac** `node tools/x/release.js ...` · **Windows** `powershell -NoProfile -File tools/node.ps1 tools/x/release.js ...`
(Mac có python3 thì `python3 tools/release.py "mô tả"` vẫn dùng được, nhưng nó luôn `git add -A`.)

## Trước khi phát hành
1. `--check js/game.js` OK; thay đổi có hình/skill → đã chạy skill **chay-thu**.
2. `git status --short` + `git diff --stat`: chỉ có file MÌNH sửa. Thấy file lạ → có thể phiên khác đang sửa cùng lúc → dùng `--files`.
3. Cập nhật "Nhật ký gần đây" trong `CLAUDE.md` nếu đáng để phiên sau biết.

## Lệnh
```
NODE tools/x/release.js --msg "<English, kiểu commit cũ>" --files js/game.js,CLAUDE.md,assets/img/<key>/NEW.png --author-name "Hoàng Hải" --author-email "<userEmail của phiên>"
```
- `--dry-run`: xem trước số bản + file mới vào manifest, không ghi gì. `--no-push`: commit nhưng chưa đẩy.
- Bỏ `--files` = `git add -A`. Máy Windows chưa cấu hình tên/email git → luôn truyền `--author-name/--author-email` (Mac có sẵn thì bỏ qua được).
- Script tự: dừng nếu đang thua origin (bảo `git pull --ff-only origin main`), đổi `GAME_VERSION={build:N,at:"HH:mm · dd/MM/yyyy"}` giờ VN,
  thay mọi `.css?v=` / `.js?v=`, dựng lại manifest GIỮ thứ tự cũ (người chơi chỉ tải lại đúng file đổi), commit qua file `-F`, push `HEAD:main`.

## Mô tả commit
Tiếng Anh, mở đầu bằng tên meme / mục: `Saiyan Marmot: ...; Catvader: ...` — nói điều NGƯỜI CHƠI thấy, không nói tên biến. Script tự thêm `Ver N: ` + Co-Authored-By.

## ⚠️ Bẫy đã gặp (Windows)
- Không gõ `git commit -m "..."` có dấu ngoặc kép trong PowerShell 5.1 (vỡ tham số) → script đã commit bằng file.
- File .ps1 có tiếng Việt bị PowerShell 5.1 đọc sai mã (· thành Â·) → công cụ viết bằng JS, `tools/node.ps1` chỉ ASCII.
- `git push` in ra stderr nên PowerShell có thể báo exit 255 dù đã đẩy — tin dòng `abc..def  HEAD -> main`.
