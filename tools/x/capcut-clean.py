#!/usr/bin/env python3
# 🧽 LÀM SẠCH TIẾNG 1 DỰ ÁN CAPCUT CÓ SẴN, sửa tại chỗ (anh 24/11: "vẫn có các đoạn rè, soát kĩ lại hết").
#   python3 tools/x/capcut-clean.py "Final Part 1 - tieng le"     (rồi chạy capcut-normalize.py cùng tên để chặn đỉnh + hạ đều bản trộn)
# 2 nguồn rè ngoài âm lượng:
#  (1) FILE GỐC đã vỡ đỉnh (đỉnh phẳng chạm trần) hoặc mp3 vượt 0 dBFS → CapCut giải mã số nguyên là vỡ. Sửa: giải mã float, file có đỉnh phẳng
#      thì khử vỡ (ffmpeg adeclip), đưa đỉnh về −1 dBFS, ghi WAV 24-bit vào <thư mục media>/clean/, trỏ clip sang file sạch, bù âm lượng clip
#      cho độ to y như cũ.
#  (2) CLIP CẮT NGANG lúc tiếng còn to (render-cine cắt tiếng đúng lúc sang shot) → cú "tách". Sửa: fade ra 30 ms ở clip bị cắt đuôi,
#      fade vào 8 ms ở clip bắt đầu giữa file.
# ⚠️ CapCut PHẢI TẮT. Sao lưu draft_info.json (.bak-clean) trước khi sửa.
import json, os, sys, glob, shutil, subprocess, uuid
import numpy as np
ROOT = os.path.expanduser('~/Movies/CapCut/User Data/Projects/com.lveditor.draft')
if len(sys.argv) < 2: sys.exit('cách dùng: capcut-clean.py "<tên dự án>"')
if subprocess.run(['pgrep', '-x', 'CapCut'], capture_output=True).returncode == 0: sys.exit('❌ CapCut đang mở — thoát CapCut rồi chạy lại')
P = os.path.join(ROOT, sys.argv[1]); F = os.path.join(P, 'draft_info.json')
D = json.load(open(F, encoding='utf-8')); M = D['materials']; MAT = {m['id']: m for m in M.get('audios', [])}
US = 1_000_000; SR = 48000
def probe_ch(p):
    r = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'a:0', '-show_entries', 'stream=channels', '-of', 'csv=p=0', p], capture_output=True, text=True)
    try: return max(1, min(2, int(r.stdout.strip().split(',')[0])))
    except Exception: return 2
def dec(p, ch, af=None):
    cmd = ['ffmpeg', '-v', 'error', '-i', p] + (['-af', af] if af else []) + ['-ac', str(ch), '-ar', str(SR), '-f', 'f32le', '-']
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).reshape(-1, ch)
def flat_tops(x):   # số đoạn ≥3 mẫu liền nhau đứng yên ở gần đỉnh = dấu hiệu file đã bị vỡ đỉnh từ gốc
    a = np.abs(x).max(axis=1); pk = a.max()
    if pk <= 0: return 0
    hi = (a >= pk * 0.985).astype(np.int8); d = np.diff(np.concatenate([[0], hi, [0]])); st = np.where(d == 1)[0]; en = np.where(d == -1)[0]
    return int(((en - st) >= 3).sum())
paths = sorted({m['path'] for m in MAT.values() if m.get('path') and os.path.exists(m['path'])})
if not paths: sys.exit('❌ không có file tiếng nào tồn tại (chưa Link media?)')
CLEAN = os.path.join(os.path.dirname(paths[0]) if '/clean/' not in paths[0] else os.path.dirname(os.path.dirname(paths[0])), 'clean'); os.makedirs(CLEAN, exist_ok=True)
newp, fac, rep = {}, {}, []
for p in paths:
    if '/clean/' in p: newp[p] = p; fac[p] = 1.0; continue
    ch = probe_ch(p); x = dec(p, ch); pk0 = float(np.abs(x).max()) if x.size else 0
    if pk0 <= 0: newp[p] = p; fac[p] = 1.0; continue
    ft = flat_tops(x)
    if ft >= 3: x = dec(p, ch, 'adeclip')
    pk = float(np.abs(x).max()); g = (10 ** (-1 / 20)) / pk; y = (x * g).astype(np.float32)
    out = os.path.join(CLEAN, os.path.splitext(os.path.basename(p))[0] + '.wav')
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 'f32le', '-ar', str(SR), '-ac', str(ch), '-i', '-', '-c:a', 'pcm_s24le', out], input=y.tobytes(), check=True)
    newp[p] = out; fac[p] = g * (pk / pk0)   # clip cũ đọc biên độ 1 → file mới biên độ ≈ fac (bù lại bằng âm lượng clip)
    if ft >= 3 or pk0 > 1.0: rep.append(f'{os.path.basename(p)}: đỉnh {20 * np.log10(pk0):+.1f} dB' + (f' · khử vỡ {ft} đoạn đỉnh phẳng' if ft >= 3 else ''))
# ── trỏ clip sang file sạch + bù âm lượng + fade ──
M.setdefault('audio_fades', [])
pcm = {}
def mono(p):
    if p not in pcm: pcm[p] = dec(p, 1)[:, 0]
    return pcm[p]
nfo = nfi = 0
for t in D['tracks']:
    if t['type'] != 'audio': continue
    for s in t['segments']:
        m = MAT.get(s['material_id'])
        if not m or m.get('path') not in newp: continue
        old = m['path']
        if newp[old] != old:
            s['volume'] = s.get('volume', 1) / fac[old]
            if s['volume'] > 0: s['last_nonzero_volume'] = s['volume']
        x = mono(newp[old]); a = int(s['source_timerange']['start'] / US * SR); n = int(s['source_timerange']['duration'] / US * SR); seg = x[a:a + n]
        if not seg.size: continue
        w = int(0.03 * SR); tail = float(np.abs(seg[-w:]).max()) * s.get('volume', 1); head = float(np.abs(seg[:int(0.01 * SR)]).max()) * s.get('volume', 1)
        fo = 30000 if (a + n < x.size - int(0.02 * SR) and tail > 0.01) else 0
        fi = 8000 if (a > int(0.005 * SR) and head > 0.01) else 0
        if fo or fi:
            ids = set(s.get('extra_material_refs', []))
            fd = next((f for f in M['audio_fades'] if f['id'] in ids), None)
            if not fd:
                fd = {'id': str(uuid.uuid4()).upper(), 'type': 'audio_fade', 'fade_type': 0, 'fade_in_duration': 0, 'fade_out_duration': 0}
                M['audio_fades'].append(fd); s.setdefault('extra_material_refs', []).append(fd['id'])
            fd['fade_in_duration'] = max(fd['fade_in_duration'], fi); fd['fade_out_duration'] = max(fd['fade_out_duration'], fo)
            nfo += bool(fo); nfi += bool(fi)
for m in MAT.values():
    if m.get('path') in newp: m['path'] = newp[m['path']]
shutil.copy2(F, F + '.bak-clean')
txt = json.dumps(D, ensure_ascii=False, separators=(',', ':'))
for f in [F] + glob.glob(os.path.join(P, 'Timelines', '*', 'draft_info.json')): open(f, 'w', encoding='utf-8').write(txt)
print(f'✅ {len(paths)} file → bản sạch trong {CLEAN}\n   file gốc có vấn đề ({len(rep)}):\n   - ' + '\n   - '.join(rep))
print(f'   fade ra 30 ms: {nfo} clip · fade vào 8 ms: {nfi} clip · sao lưu {F}.bak-clean')
