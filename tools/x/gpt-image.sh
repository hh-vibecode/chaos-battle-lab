#!/usr/bin/env bash
# Vẽ ảnh bằng GPT Image qua Codex CLI (dùng gói ChatGPT anh đã đăng nhập — KHÔNG cần API key, KHÔNG tốn tiền API, ăn quota ChatGPT).
# Viết lại từ ý tưởng oakplank/gpt-image-bridge (MIT) + thêm gửi kèm ẢNH GỐC (--ref) và chế độ PHÔNG XANH cho tach-nen-anh.
#
#   tools/x/gpt-image.sh "<câu lệnh>" <ra.png> [--ref anh_goc.png ...] [--size 1024x1536] [--green] [--effort low|medium|high]
#
# --ref   ảnh tham chiếu (meme gốc / tư thế mẫu), lặp được. Codex nhìn ảnh rồi mới gọi công cụ vẽ.
# --green thêm yêu cầu nền xanh lá phẳng #00FF00, nhân vật trọn khung, không bóng đổ → đưa thẳng vào skill tach-nen-anh.
# Mất ~2–6 phút / ảnh → chạy nền. Codex tìm ở: $CODEX_BIN → ~/.codex-cli/pkg/bin/codex.exe (gói đủ codex-package: cần cả codex-code-mode-host.exe) (Windows) → PATH (Mac: brew install codex).
# Đăng nhập 1 lần (anh tự làm): codex login
set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo 'usage: gpt-image.sh "<prompt>" <out.png> [--ref img]... [--size WxH] [--green] [--effort low|medium|high]' >&2; exit 2
fi
prompt="$1"; out="$2"; shift 2
size=""; green=0; effort="low"; refs=()
while [[ $# -gt 0 ]]; do
  case "$1" in
    --size) size="$2"; shift 2 ;;
    --ref) refs+=("$2"); shift 2 ;;
    --green) green=1; shift ;;
    --effort) effort="$2"; shift 2 ;;
    *) echo "gpt-image: lạ: $1" >&2; exit 2 ;;
  esac
done

codex="${CODEX_BIN:-}"
if [[ -z "$codex" && -x "$HOME/.codex-cli/pkg/bin/codex.exe" ]]; then codex="$HOME/.codex-cli/pkg/bin/codex.exe"; fi
if [[ -z "$codex" ]]; then codex="$(command -v codex || true)"; fi
if [[ -z "$codex" ]]; then echo "gpt-image: chưa cài codex (Mac: brew install codex · Windows: ~/.codex-cli/pkg/bin/codex.exe (gói đủ codex-package: cần cả codex-code-mode-host.exe))" >&2; exit 127; fi

topath() { if command -v cygpath >/dev/null 2>&1; then cygpath -m "$1"; else echo "$1"; fi; }   # exe Windows không hiểu /c/...
abs() { (cd "$(dirname "$1")" && echo "$(pwd)/$(basename "$1")"); }

out_dir="$(cd "$(dirname "$out")" 2>/dev/null && pwd)" || { echo "gpt-image: không có thư mục $(dirname "$out")" >&2; exit 2; }
out="$out_dir/$(basename "$out")"

img_args=(); ref_note=""
if [[ -n "${refs[*]:-}" ]]; then   # (viết kiểu này để bash 3.2 của Mac + set -u không lỗi mảng rỗng)
  for r in "${refs[@]}"; do [[ -f "$r" ]] || { echo "gpt-image: không thấy ảnh $r" >&2; exit 2; }; img_args+=(-i "$(topath "$(abs "$r")")"); done
  ref_note="
REFERENCE IMAGES are attached. Pass them to the image_generation tool as reference/input images (do not just describe them).
Keep the SAME character identity as the reference: same species, face, eye shape, fur/skin colors and markings, proportions, outfit and props.
Do not redesign or 'improve' the character's look; only redraw it cleaner and sharper as instructed.
NEVER break the original meme: keep its original body and anatomy exactly (an animal keeps real animal anatomy — e.g. a cat has four cat legs and round cat paws with paw pads).
Do NOT add human hands, fingers, human arms, human legs or any human body parts, and do not add extra limbs, clothes or props that are not in the reference."
fi
size_line=""; [[ -n "$size" ]] && size_line="
SIZE: ${size}"
green_line=""; [[ $green -eq 1 ]] && green_line="
BACKGROUND: perfectly flat solid pure green #00FF00 chroma-key background filling the whole canvas — no gradient, no floor, no cast shadow, no green tint or green light on the character, no text, no border.
The full character is inside the frame with a margin on all sides (nothing cropped), feet/bottom on one baseline."

workdir="$(mktemp -d "${TMPDIR:-/tmp}/gpt-image.XXXXXX")"; log="${workdir}.log"
full_prompt="Use your image_generation tool to create an image.

PROMPT: ${prompt}${size_line}${green_line}${ref_note}

Requirements:
- You MUST call the image_generation tool exactly once. Do NOT write a script, use curl, or fabricate a PNG any other way.
- You do not need to save or copy the file; just generate it and reply DONE."

t0=$(date +%s)
# Codex tự lưu ảnh vào ~/.codex/generated_images/<session id>/ (Windows chạy chế độ chỉ đọc → không bắt nó ghi file) → lấy ảnh mới nhất ở đó
"$codex" exec --skip-git-repo-check -s workspace-write -c model_reasoning_effort="$effort" -C "$(topath "$workdir")" "$full_prompt" ${img_args[@]+"${img_args[@]}"} </dev/null >"$log" 2>&1 || true
sid="$(grep -m1 -oE 'session id: [0-9a-f-]+' "$log" | sed 's/session id: //' || true)"
gen="${CODEX_HOME:-$HOME/.codex}/generated_images/$sid"
img=""; [[ -n "$sid" && -d "$gen" ]] && img="$(ls -t "$gen"/*.png 2>/dev/null | head -n 1 || true)"
[[ -n "$img" ]] || img="$(ls -t "$workdir"/*.png 2>/dev/null | head -n 1 || true)"
if [[ -z "$img" || ! -f "$img" ]]; then
  echo "gpt-image: không ra ảnh (hết quota / bị từ chối nội dung / lỗi mạng?). 30 dòng cuối log:" >&2; tail -n 30 "$log" >&2; echo "(log: $log)" >&2; exit 1
fi
cp "$img" "$out"
# lưu câu lệnh cạnh ảnh để lần sau vẽ lại / chỉnh
printf '%s\n--ref: %s\n--size: %s --green: %s\n' "$prompt" "${refs[*]:-}" "$size" "$green" > "${out%.*}.prompt.txt"
rm -rf "$workdir" "$log" 2>/dev/null || true
echo "$out  ($(( $(date +%s) - t0 ))s)"
