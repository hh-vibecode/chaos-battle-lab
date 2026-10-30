#!/bin/bash
# 🎬 HÀNG QUAY nhiều trận Solo 1vs1 (Mac). Danh sách: mỗi dòng "a|b|win|Tên A|Tên B"  (win = a | b · dòng bắt đầu bằng # bị bỏ qua)
#   tools/render-queue.sh tools/match-lists/<file>.txt raw   → CHỈ chạy thử 10 trận/cặp (không quay) → KẾT QUẢ THÔ: <file>.raw.txt
#                                                               (mỗi cặp: bên muốn thắng thắng mấy/10, trận sát nhất: seed · giây · máu còn)
#   tools/render-queue.sh tools/match-lists/<file>.txt       → QUAY 3K (1620×2880 60fps — anh chốt 30/10: không cần 4K): mỗi cặp chạy thử ≥10 trận, gom ≥3 trận đúng bên thắng rồi lấy trận SÁT NHẤT (anh: luôn ưu tiên thắng sát)
#                                                               → ~/Desktop/<Tên A> vs <Tên B> - Meme Battle.mp4 (đã có file thì bỏ qua)
#   Chạy 2 hàng song song được (anh cho phép): chia danh sách làm 2 file, chạy 2 lệnh.
# ⚠️ node phải chạy với < /dev/null — không thì nó đọc lấn mất dòng kế tiếp của danh sách (30/10: cứ 1 trận chạy là trận sau hỏng tên).
LIST="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"; MODE="$2"
cd "$(dirname "$0")/.." || exit 1
export NODE_PATH="${NODE_PATH:-/Users/hoanghai/.npm/_npx/e41f203b7505f1fb/node_modules}"
RAW="${LIST%.txt}.raw.txt"; [ "$MODE" = raw ] && : > "$RAW"
while IFS='|' read -r A B WIN NA NB; do
  [ -z "$A" ] || [[ "$A" == \#* ]] && continue
  if [ "$MODE" = raw ]; then
    echo "=== $(date +%H:%M) $NA vs $NB (muốn $WIN thắng)"
    OUT=$(node tools/render-match.js /tmp/_rq.mp4 --a "$A" --b "$B" --sim 10 < /dev/null 2>&1)
    W=$([ "$WIN" = a ] && echo "$A" || echo "$B")
    N=$(echo "$OUT" | grep -c " $W thắng")
    BEST=$(echo "$OUT" | grep " $W thắng" | awk -v w="$W" '{ for(i=1;i<=NF;i++) if($i==w && $(i+1) ~ /^[0-9]+\//){ split($(i+1),h,"/"); print h[1] "\t" $0 } }' | sort -n | head -1 | cut -f2-)
    WN=$([ "$WIN" = a ] && echo "$NA" || echo "$NB")
    printf '%s vs %s · muốn %s thắng: %s/10 · sát nhất: %s\n' "$NA" "$NB" "$WN" "$N" "${BEST:-không có}" | tee -a "$RAW"
  else
    OUTF="$HOME/Desktop/$NA vs $NB - Meme Battle.mp4"
    [ -e "$OUTF" ] && { echo "=== bỏ qua (đã có) $NA vs $NB"; continue; }
    echo "=== $(date +%H:%M) $NA vs $NB (win $WIN)"
    node tools/render-match.js "$OUTF" --a "$A" --b "$B" --win "$WIN" --min 10 --want 3 --tries 40 --w 1620 < /dev/null 2>&1 | grep -E "🏆|kết quả|✅|Error|không thấy"
  fi
done < "$LIST"
[ "$MODE" = raw ] && echo "📝 kết quả thô: $RAW"
