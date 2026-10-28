---
name: tach-nen-anh
description: Đưa ảnh nhân vật anh Hải vẽ bằng ChatGPT (nền xanh lá, có khi nhiều tư thế trên 1 tấm) vào Chaos Battle Lab — tách nền, cắt sát, cao 420px, chân chạm đáy, đặt tên khung, nối vào code chọn khung. Dùng khi anh gửi ảnh nhân vật / tư thế mới.
---

# Ảnh nhân vật từ ChatGPT → khung trong game

Luật (anh dặn 27/10/2026): ảnh NHÂN VẬT do anh vẽ bằng ChatGPT. Claude chỉ xử lý ảnh + làm VFX/skill bằng code,
KHÔNG tự vẽ bộ phận nhân vật bằng code. Ảnh anh gửi nằm ở đường dẫn trong tin nhắn (thường `...\images\N.png`).

## 1. Xem ảnh, xác định từng tư thế
- Read ảnh gốc. Nhiều tư thế cạnh nhau → chia cột (vd 1774px rộng, 2 tư thế → `-x0 0 -x1 887` và `-x0 887 -x1 1774`).
- Ghi lại: mặt quay TRÁI hay PHẢI; tư thế nào dùng lúc nào (đứng / tấn công / skill…). Không rõ thì hỏi anh.

## 2. Tách nền
(`gkey.ps1` dùng System.Drawing của Windows. Trên Mac: làm cùng thuật toán bằng python + Pillow — alpha theo `G - max(R,B)`: ≥90 trong suốt, ≤25 giữ nguyên, khử viền xanh, cắt sát, cao 420.)
```
powershell -File tools/win/gkey.ps1 -src <ảnh gốc> -out <scratchpad>\prev.png -x0 0 -x1 887 -grid     # xem trước có thước đo
powershell -File tools/win/gkey.ps1 -src <ảnh gốc> -out assets/img/<key>/<TÊN>.png -x0 0 -x1 887    # bản thật (không -grid)
```
- Kết quả: nền trong suốt, viền xanh đã khử, cắt sát, cao 420px, chân chạm đáy.
- Read lại file ra để soát: còn mảng xanh / ăn mất lông vàng? → chỉnh `-keyHi` (mặc định 90) / `-keyLo` (25).

## 3. Khớp cỡ với khung cũ
- Game vẽ ảnh theo CHIỀU CAO (ảnh dọc), nên thứ nhô cao (tóc dựng, mũ, vũ khí giơ lên) làm THÂN nhỏ lại.
  Đo trên bản `-grid`: thân chiếm bao nhiêu phần chiều cao so với khung cũ → bù bằng hệ số `_avMul` riêng cho ảnh đó
  (vd Super Saiyan Marmot: thân chiếm ~86% → vẽ to thêm 15%, xem `img===MM_FR[2] || img===MM_FR[7]`).
- Các khung cùng 1 bộ nên cùng cao 420 + chân chạm đáy → đổi khung không bị nhảy.

## 4. Nối vào code
- Khung dựng sẵn khai báo kiểu `MM_FR` / `DC_FR` (mảng `new Image()`, `_noMask=true`, `_crop` lúc onload) — thêm tên file vào mảng,
  rồi sửa hàm chọn khung (`_mmFrame`, `_dcFrame`…) theo trạng thái.
- Hướng mặt: ảnh quay TRÁI → key phải có trong danh sách quay-trái (`facingDefault` trong constructor Fighter + `facesLeft` trong `_selSideRender`).
- Ảnh đại diện (roster) mặc định: `_mcDefaultAvatars` → `assets/avatars/<key>/avatarUrl.(png|webp)`.
- Thêm ảnh vào `js/asset-groups.js` với nhóm = key nhân vật.

## 5. Kiểm + phát hành
Skill **chay-thu** (ép đúng trạng thái dùng ảnh mới, chụp màn hình) → skill **phat-hanh** (nhớ `-files` gồm ảnh mới).
