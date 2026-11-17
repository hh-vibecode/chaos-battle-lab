---
name: tach-nen-anh
description: Đưa ảnh nhân vật anh Hải vẽ bằng ChatGPT (nền xanh lá, có khi nhiều tư thế trên 1 tấm) vào Chaos Battle Lab — tách nền, cắt sát, cao 420px, chân chạm đáy, đặt tên khung, nối vào code chọn khung. Dùng khi anh gửi ảnh nhân vật / tư thế mới (Mac hoặc Windows).
---

# Ảnh nhân vật từ ChatGPT → khung trong game

Luật (anh dặn 27/10/2026): ảnh NHÂN VẬT do anh vẽ bằng ChatGPT. Claude chỉ xử lý ảnh + làm VFX/skill bằng code,
KHÔNG tự vẽ bộ phận nhân vật bằng code. Ảnh anh gửi nằm ở đường dẫn trong tin nhắn (thường `...\images\N.png`).

Chạy JS: **Mac** `node tools/x/gkey.js ...` · **Windows** `powershell -NoProfile -File tools/node.ps1 tools/x/gkey.js ...` (gọi chung là `NODE`).
`gkey.js` đọc/ghi PNG bằng Node thuần (không npm). Ảnh vào không phải PNG (jpg/webp) → đổi sang PNG trước.

## 1. Xem ảnh, xác định từng tư thế
- Read ảnh gốc. Nhiều tư thế cạnh nhau → chia cột (vd rộng 1774px, 2 tư thế → `--x0 0 --x1 887` và `--x0 887 --x1 1774`).
- Ghi lại: mặt quay TRÁI hay PHẢI; tư thế nào dùng lúc nào (đứng / tấn công / skill…). Không rõ thì hỏi anh.

## 2. Tách nền
```
NODE tools/x/gkey.js --src <ảnh gốc> --out <scratchpad>/prev.png --x0 0 --x1 887 --grid     # xem trước, có thước đo mỗi 20px
NODE tools/x/gkey.js --src <ảnh gốc> --out assets/img/<key>/<TÊN>.png --x0 0 --x1 887      # bản thật (không --grid)
```
- Kết quả: nền trong suốt, viền xanh đã khử, cắt sát, cao 420px (`--h`), chân chạm đáy.
- Read lại file ra để soát: còn mảng xanh / ăn mất chi tiết màu vàng-xanh? → chỉnh `--key-hi` (mặc định 90) / `--key-lo` (25).

## 3. Khớp cỡ với khung cũ
- Game vẽ ảnh dọc theo CHIỀU CAO, nên thứ nhô cao (tóc dựng, mũ, vũ khí giơ lên) làm THÂN nhỏ lại.
  Đo trên bản `--grid`: thân chiếm bao nhiêu phần chiều cao so với khung cũ → bù bằng hệ số `_avMul` riêng cho ảnh đó
  (vd Super Saiyan Marmot: thân ~86% → vẽ to thêm 15%, xem `img===MM_FR[2] || img===MM_FR[7]`).
- Các khung cùng bộ: cùng cao 420 + chân chạm đáy → đổi khung không bị nhảy.

## 4. Nối vào code
- Khung dựng sẵn khai báo kiểu `MM_FR` / `DC_FR` (mảng `new Image()`, `_noMask=true`, `_crop` lúc onload) — thêm tên file vào mảng,
  rồi sửa hàm chọn khung (`_mmFrame`, `_dcFrame`…) theo trạng thái.
- Hướng mặt: ảnh quay TRÁI → key phải có trong danh sách quay-trái (`facingDefault` trong constructor Fighter + `facesLeft` trong `_selSideRender`).
- Ảnh đại diện (roster) mặc định: `_mcDefaultAvatars` → `assets/avatars/<key>/avatarUrl.(png|webp)`.
- Thêm ảnh vào `js/asset-groups.js` với nhóm = key nhân vật.

## 5. Kiểm + phát hành
Skill **chay-thu** (ép đúng trạng thái dùng ảnh mới, chụp màn hình) → skill **phat-hanh** (`--files` gồm ảnh mới).
