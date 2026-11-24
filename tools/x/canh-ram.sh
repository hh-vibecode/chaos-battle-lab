#!/bin/zsh
# 🛡️ RÀO AN TOÀN khi xuất phim / chạy việc nặng trên MacBook (anh 24/11: "làm k có rào an toàn à" — xuất 4K làm SẬP máy anh 2 lần).
#   tools/x/canh-ram.sh <PID tiến trình chính>   (chạy nền cạnh lệnh xuất; tự thoát khi tiến trình chính kết thúc)
#   • máy CĂNG (RAM trống+chờ < 1.5GB, hoặc load 1 phút > 24, hoặc swap > 4GB) → TẠM DỪNG (SIGSTOP) tiến trình chính + mọi Chrome ngầm
#     → máy DỊU (RAM trống+chờ > 3GB, load < 10, swap < 4GB) mới chạy tiếp (SIGCONT). ⚠️ swap macOS KHÔNG tự giảm khi RAM đã rảnh → không lấy swap thấp làm điều kiện chạy lại (24/11 dừng nhầm 16 phút).
#   • TRẦN RAM = 1 NỬA máy (anh 24/11: "dùng ram trần 1 nửa thôi"): TỔNG RAM cả cụm xuất (node + mọi Chrome ngầm + ffmpeg) > nửa RAM máy,
#     hoặc 1 Chrome ngầm > 3GB → TẮT HẲN tất cả, ghi lý do, thoát mã 3 — KHÔNG tự chạy lại (sửa gốc trước).
MAIN=$1; [ -z "$MAIN" ] && { echo "cách dùng: canh-ram.sh <PID>"; exit 2; }
PAUSED=0; CAP=$(( $(sysctl -n hw.memsize) / 1048576 / 2 ))   # MB — nửa RAM máy
swapmb(){ sysctl -n vm.swapusage | awk '{gsub("M","",$6); print int($6)}'; }
freemb(){ vm_stat | awk '/Pages free/{f=$3} /Pages inactive/{i=$3} END{gsub("\\.","",f); gsub("\\.","",i); print int((f+i)*4096/1048576)}'; }
load1(){ sysctl -n vm.loadavg | awk '{print int($2)}'; }
chromes(){ ps -ax -o pid=,comm= | awk '/chrome-headless-shell/{print $1}'; }
sig(){ kill -$1 $MAIN 2>/dev/null; for p in $(chromes); do kill -$1 $p 2>/dev/null; done; }
while kill -0 $MAIN 2>/dev/null; do
  big=$(ps -ax -o rss=,comm= | awk '/chrome-headless-shell/{if($1>m)m=$1} END{print int(m/1024)}')
  tot=$(ps -ax -o rss=,comm=,args= | awk '/chrome-headless-shell|render-cine|film-check|ffmpeg/ && !/awk/{s+=$1} END{print int(s/1024)}')
  if [ ${tot:-0} -gt $CAP ]; then echo "🛑 $(date +%H:%M:%S) cụm xuất dùng ${tot}MB > trần ${CAP}MB (nửa RAM máy) → tắt hẳn"; sig KILL; pkill -f ffmpeg 2>/dev/null; exit 3; fi
  if [ ${big:-0} -gt 3072 ]; then echo "🛑 $(date +%H:%M:%S) Chrome ngầm phình ${big}MB > 3GB → tắt hẳn (rò RAM / hiệu ứng quá nặng — phải sửa gốc)"; sig KILL; exit 3; fi
  S=$(swapmb); F=$(freemb); L=$(load1)
  if [ $PAUSED = 0 ] && { [ $S -gt 4096 ] || [ $F -lt 1536 ] || [ $L -gt 24 ]; }; then echo "⏸ $(date +%H:%M:%S) máy căng (swap ${S}MB · RAM rảnh ${F}MB · load $L) → tạm dừng"; sig STOP; PAUSED=1; fi
  if [ $PAUSED = 1 ] && [ $S -lt 4096 ] && [ $F -gt 3072 ] && [ $L -lt 10 ]; then echo "▶ $(date +%H:%M:%S) máy dịu (swap ${S}MB · RAM rảnh ${F}MB · load $L) → chạy tiếp"; sig CONT; PAUSED=0; fi
  sleep 5
done
