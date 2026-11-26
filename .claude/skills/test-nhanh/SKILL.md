---
name: test-nhanh
description: TEST NHANH sức mạnh / cân bằng meme — giả lập hàng chục trận 1vs1 bằng đồng hồ ảo (trận 40s chạy ~2s thật), cố định seed, ra bảng thắng/thua + máu còn lại. Mac + Windows, chỉ cần Node + Edge/Chrome. Dùng khi thêm meme mới, đổi chỉ số, anh hỏi "con này mạnh/yếu không", hoặc cần chọn seed trước khi quay.
---

# Test nhanh cân bằng meme (`tools/x/sim.js`)

## Lệnh
- Mac: `node tools/x/sim.js <meme> --vs a,b,c --n 3`
- Windows: `powershell -NoProfile -ExecutionPolicy Bypass -File tools/node.ps1 tools/x/sim.js <meme> --vs a,b,c --n 3`
- `--vs all` đấu cả roster · `--n` số seed mỗi cặp (seed, seed+1…) · `--seed 11` đổi dải seed · `--max 90` giây ảo tối đa
- `--extra "<js>"` in thêm số liệu cuối trận, vd `"JSON.stringify([_matchStats[0].dmg,_matchStats[1].dmg])"` (dame 2 bên)
- `--force "<js>"` chạy ngay sau START (ép trạng thái) · `--slow` vẫn vẽ (mặc định TẮT vẽ để nhanh; logic trận y nguyên)
- Đo 26/11 (Windows): 36 trận ≈ 2 phút. Cùng seed → cùng trận.

## Chuẩn cân bằng (anh chốt 26/11)
- **Doge là thước đo**: meme mới phải ĐÁNH SÁT với Doge (~40–60% thắng trên ≥8 seed). Doge mạnh nhất, các con khác không cần cân với nhau.
- Chỉ đổi SỐ (dame, máu, hồi chiêu, tầm), giữ cơ chế người thiết kế viết. Số đã đổi so với thiết kế gốc → ghi lại trong docs/notes/memes.md.

## Dọn (anh 26/11: để ý RAM)
Công cụ tự bật `serve.js` (8765) + trình duyệt ngầm (9455) và để mở cho lần chạy sau. XONG LÀ TẮT:
`tools/x/cdp.js --stop` + `tools/x/serve.js --stop`.

## Giới hạn
- Tiếng không phát (play() trả về ngay) → meme nhảy theo thời gian bài nhạc (Violin Bee, Azel, 4 con nhạc…) có thể lệch so với trận thật; muốn chuẩn cho mấy con đó thì dùng render-match (Mac).
- Chỉ 1vs1. Cần chụp hình thì dùng skill `chay-thu`.
