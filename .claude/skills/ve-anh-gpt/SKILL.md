---
name: ve-anh-gpt
description: Claude TỰ VẼ ẢNH bằng GPT Image qua Codex CLI (gói ChatGPT anh đã đăng nhập, không API key) — vẽ lại ảnh meme gốc anh đưa lên PHÔNG XANH + nét hơn, thêm tư thế mới giữ đúng mặt nhân vật, nền / đồ vật / logo / texture cho phim. Dùng khi anh đưa ảnh meme mới, khi cần tư thế / sprite mới, hoặc khi phim cần ảnh mà trước đây phải nhờ anh vẽ ChatGPT. Mac + Windows.
---

# Vẽ ảnh bằng GPT (Codex CLI)

## Quy trình anh chốt (9/11/2026) cho MEME MỚI
1. Anh đưa **ảnh meme gốc** (ảnh mạng, mờ, dính nền cũng được).
2. Em **vẽ lại đúng con đó trên phông xanh + tăng chất lượng** (`--ref ảnh_gốc --green`).
3. Chỉ khi cần thì **thêm tư thế** — LẤY ẢNH VỪA VẼ Ở BƯỚC 2 làm `--ref` (không lấy ảnh gốc mờ) để mọi tư thế cùng một bản vẽ.
4. Tách nền → khung game: skill `tach-nen-anh` (`tools/x/gkey.js`). Gửi anh bảng ảnh duyệt trước khi nối vào code.
Anh vẫn là người duyệt cuối; ảnh anh tự vẽ gửi tới thì dùng ảnh anh, không vẽ đè.

## Lệnh
```bash
bash tools/x/gpt-image.sh "<câu lệnh tiếng Anh>" <ra.png> [--ref a.png]... [--green] [--size 1024x1024] [--effort low]
```
- Chạy NỀN (`run_in_background`). Đo 9/11: 45s–3 phút / ảnh. Ảnh ra ~1254px, PNG RGB (không trong suốt → luôn `--green` cho nhân vật).
- Ảnh nháp để ở scratchpad hoặc `_source/` — KHÔNG commit ảnh nháp; chỉ commit khung đã tách nền vào `assets/`.
- Cạnh ảnh có `<ra>.prompt.txt` ghi câu lệnh đã dùng → vẽ lại / chỉnh từ đó.
- Windows: gọi bằng Git Bash (`bash tools/x/...`), KHÔNG cần node.

## Viết câu lệnh
- Vẽ lại meme gốc: "Recreate this exact meme <tên> … same face, eyes, markings, colors, proportions … remove blur, compression noise and jagged cut-out edges; crisp detail".
- Tư thế mới: "Same <tên> as the reference image (identical face, markings, colors, realistic look), now FULL BODY … <tư thế>, facing left/right … Real cat paws, no human hands."
- Luôn ghi hướng mặt (game dùng mặt quay TRÁI/PHẢI theo từng meme), toàn thân trọn khung, chân mèo thật.
- Nhiều khung chuyển động → xin 1 SPRITE SHEET lưới đều (cùng cỡ, cùng đường chân, cách đều) trong 1 ảnh, rồi cắt cột bằng `gkey.js --x0 --x1`.
- Phim: nền / đồ vật / logo / texture VFX không cần `--green`; ghi khung (`--size 1536x1024` cho 16:9).

## Cài đặt (đã xong trên Windows của anh 9/11)
- Windows: gói đầy đủ `codex-package-x86_64-pc-windows-msvc.tar.gz` từ github.com/openai/codex/releases (kiểm sha256 với `digest` của API) giải nén vào `~/.codex-cli/pkg/`
  — PHẢI là gói đủ: bản `codex.exe` lẻ thiếu `codex-code-mode-host.exe` → công cụ vẽ không chạy.
- Mac: `brew install codex`.
- Đăng nhập 1 lần — ANH tự làm trên trình duyệt: `codex login` (em có thể chạy lệnh để mở trang, anh đăng nhập). Kiểm: `codex login status` → "Logged in using ChatGPT".
- Windows chạy Codex ở chế độ chỉ đọc → Codex không ghi được file; script lấy ảnh từ `~/.codex/generated_images/<session id>/` (đã xử lý sẵn).

## Lưu ý
- Ăn quota ChatGPT của anh (không tốn tiền API) → không vẽ phí; nháp 1 ảnh, đạt rồi mới vẽ loạt.
- Lỗi "không ra ảnh": xem log in ra (hết quota / bị từ chối nội dung / mạng).
- Cờ `-i` của codex nhận NHIỀU file → câu lệnh phải đứng TRƯỚC `-i` (script đã làm đúng).
