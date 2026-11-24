#!/usr/bin/env python3
# 🔇 CHUẨN HOÁ LẠI ÂM LƯỢNG 1 DỰ ÁN CAPCUT CÓ SẴN, sửa tại chỗ (anh 24/11: "có tiếng rè rè" trong dự án Final Part 1 - tieng le).
#   python3 tools/x/capcut-normalize.py "Final Part 1 - tieng le"
# Rè = vỡ tiếng: âm lượng từng clip (chuẩn hoá theo LUFS) đẩy đỉnh quá 0 dBFS, và CapCut không có bộ giới hạn như render-cine nên chỗ nhiều tiếng
# chồng nhau cũng vỡ. Cách sửa: (1) mỗi clip: âm lượng không đẩy đỉnh quá −1 dBFS · (2) mô phỏng cả bản trộn (mono 22.05 kHz) → vẫn vượt
# −1.5 dBFS thì hạ ĐỀU mọi clip tiếng (giữ tương quan to nhỏ). Giữ nguyên đường dẫn file (kể cả file anh đã "Link media"), vị trí, cắt.
# ⚠️ CapCut PHẢI TẮT (nó ghi đè dự án khi lưu / thoát). Sao lưu draft_info.json cạnh nó (.bak-normalize) trước khi sửa.
import json, os, sys, glob, shutil, subprocess
import numpy as np
ROOT = os.path.expanduser('~/Movies/CapCut/User Data/Projects/com.lveditor.draft')
if len(sys.argv) < 2: sys.exit('cách dùng: capcut-normalize.py "<tên dự án>"')
if subprocess.run(['pgrep', '-x', 'CapCut'], capture_output=True).returncode == 0: sys.exit('❌ CapCut đang mở — lưu rồi thoát CapCut (Cmd+Q) rồi chạy lại')
P = os.path.join(ROOT, sys.argv[1]); F = os.path.join(P, 'draft_info.json')
if not os.path.exists(F): sys.exit('❌ không thấy dự án: ' + P)
D = json.load(open(F, encoding='utf-8')); MAT = {m['id']: m for m in D['materials'].get('audios', [])}
SR = 22050; US = 1_000_000; _pcm = {}
def pcm(p):
    if p not in _pcm:
        r = subprocess.run(['ffmpeg', '-v', 'error', '-i', p, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True)
        _pcm[p] = np.frombuffer(r.stdout, dtype=np.float32) if r.returncode == 0 else np.zeros(0, np.float32)
    return _pcm[p]
segs = []
for t in D['tracks']:
    if t['type'] != 'audio': continue
    for s in t['segments']:
        m = MAT.get(s['material_id'])
        if not m or not m.get('path'): continue
        if not os.path.exists(m['path']): sys.exit('❌ thiếu file (chưa Link media?): ' + m['path'])
        segs.append((s, m['path']))
ncap = 0
def cut(s, p):
    a = int(s['source_timerange']['start'] / US * SR); return pcm(p)[a:a + int(s['source_timerange']['duration'] / US * SR)]
for s, p in segs:
    x = cut(s, p); pk = float(np.abs(x).max()) if x.size else 0
    if pk > 0 and s.get('volume', 1) * pk > 10 ** (-1 / 20): s['volume'] = 10 ** (-1 / 20) / pk; ncap += 1
end = max((s['target_timerange']['start'] + s['target_timerange']['duration']) / US for s, _ in segs) + 1
mix = np.zeros(int(end * SR), np.float32)
for s, p in segs:
    x = cut(s, p); a = int(s['target_timerange']['start'] / US * SR); x = x[:max(0, mix.size - a)]; mix[a:a + x.size] += x * s.get('volume', 1)
mpk = float(np.abs(mix).max()); k = min(1.0, 10 ** (-1.5 / 20) / mpk) if mpk > 0 else 1.0
for s, _ in segs:
    s['volume'] = s.get('volume', 1) * k
    if s['volume'] > 0: s['last_nonzero_volume'] = s['volume']
shutil.copy2(F, F + '.bak-normalize')
txt = json.dumps(D, ensure_ascii=False, separators=(',', ':'))
for f in [F] + glob.glob(os.path.join(P, 'Timelines', '*', 'draft_info.json')): open(f, 'w', encoding='utf-8').write(txt)
print(f'✅ {len(segs)} clip tiếng · chặn đỉnh {ncap} clip · đỉnh bản trộn {20 * np.log10(mpk):+.1f} dBFS → hạ đều {20 * np.log10(k):+.1f} dB · sao lưu {F}.bak-normalize')
