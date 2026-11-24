#!/usr/bin/env python3
# 🎚️ GỘP TIẾNG 1 DỰ ÁN CAPCUT thành 1 FILE trộn sẵn trên 1 TRACK (anh 24/11: dự án Final Part 1 có 367 đoạn tiếng / 9 track → CapCut nặng, máy cũ giật tiếng).
#   python3 tools/x/capcut-premix.py "Final Part 1 - tieng le"            gộp (track cũ cất vào premix-tracks.json trong thư mục dự án)
#   python3 tools/x/capcut-premix.py "Final Part 1 - tieng le" --undo     trả lại 9 track như cũ (muốn sửa từng tiếng)
# Trộn đúng như CapCut phát: âm lượng từng clip + fade vào/ra (audio_fades) + vị trí; 48 kHz stereo, ghi WAV 24-bit vào <thư mục media>/premix/.
# Bản trộn có đỉnh quá −1 dBFS thì hạ đều cả file (in ra). ⚠️ CapCut PHẢI TẮT. Sao lưu draft_info.json (.bak-premix) trước khi sửa.
import json, os, sys, glob, shutil, subprocess, uuid, copy
import numpy as np
ROOT = os.path.expanduser('~/Movies/CapCut/User Data/Projects/com.lveditor.draft')
if len(sys.argv) < 2: sys.exit('cách dùng: capcut-premix.py "<tên dự án>" [--undo]')
if subprocess.run(['pgrep', '-x', 'CapCut'], capture_output=True).returncode == 0: sys.exit('❌ CapCut đang mở — thoát CapCut rồi chạy lại')
P = os.path.join(ROOT, sys.argv[1]); F = os.path.join(P, 'draft_info.json'); KEEP = os.path.join(P, 'premix-tracks.json')
D = json.load(open(F, encoding='utf-8')); M = D['materials']; US = 1_000_000; SR = 48000
def save():
    txt = json.dumps(D, ensure_ascii=False, separators=(',', ':'))
    for f in [F] + glob.glob(os.path.join(P, 'Timelines', '*', 'draft_info.json')): open(f, 'w', encoding='utf-8').write(txt)
if '--undo' in sys.argv:
    if not os.path.exists(KEEP): sys.exit('❌ chưa gộp (không thấy premix-tracks.json)')
    K = json.load(open(KEEP, encoding='utf-8')); shutil.copy2(F, F + '.bak-premix-undo')
    D['tracks'] = [t for t in D['tracks'] if not (t['type'] == 'audio' and t.get('name') == 'Tiếng gộp')] + K['tracks']
    for k, L in K['materials'].items(): M.setdefault(k, []).extend(L)
    save(); os.rename(KEEP, KEEP + '.used'); print(f'✅ trả lại {len(K["tracks"])} track tiếng'); sys.exit()
if os.path.exists(KEEP): sys.exit('❌ đã gộp rồi (chạy --undo trước nếu muốn gộp lại)')
A = {m['id']: m for m in M['audios']}; FD = {f['id']: f for f in M.get('audio_fades', [])}
tracks = [t for t in D['tracks'] if t['type'] == 'audio']
if not tracks: sys.exit('❌ không có track tiếng')
_pcm = {}
def pcm(p):
    if p not in _pcm:
        r = subprocess.run(['ffmpeg', '-v', 'error', '-i', p, '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True)
        _pcm[p] = np.frombuffer(r.stdout, np.float32).reshape(-1, 2)
    return _pcm[p]
end = max((s['target_timerange']['start'] + s['target_timerange']['duration']) for t in tracks for s in t['segments']) / US
mix = np.zeros((int(end * SR) + SR, 2), np.float32); n = 0
for t in tracks:
    for s in t['segments']:
        m = A.get(s['material_id'])
        if not m or not m.get('path'): continue
        if not os.path.exists(m['path']): sys.exit('❌ thiếu file: ' + m['path'])
        if abs(s.get('speed', 1) - 1) > 1e-3: sys.exit('❌ clip có đổi tốc độ — công cụ chưa hỗ trợ: ' + m['path'])
        x = pcm(m['path']); a = int(s['source_timerange']['start'] / US * SR); ln = int(s['source_timerange']['duration'] / US * SR)
        y = x[a:a + ln].copy() * s.get('volume', 1)
        for r in s.get('extra_material_refs', []):
            f = FD.get(r)
            if not f: continue
            fi = int(f.get('fade_in_duration', 0) / US * SR); fo = int(f.get('fade_out_duration', 0) / US * SR)
            if fi > 0: k = min(fi, len(y)); y[:k] *= np.linspace(0, 1, k, dtype=np.float32)[:, None]
            if fo > 0: k = min(fo, len(y)); y[len(y) - k:] *= np.linspace(1, 0, k, dtype=np.float32)[:, None]
        o = int(s['target_timerange']['start'] / US * SR); y = y[:max(0, len(mix) - o)]; mix[o:o + len(y)] += y; n += 1
mix = mix[:int(end * SR)]; pk = float(np.abs(mix).max()); g = min(1.0, 10 ** (-1 / 20) / pk) if pk > 0 else 1.0; mix *= g
med = os.path.dirname(next(iter(A.values()))['path']); med = os.path.dirname(med) if os.path.basename(med) == 'clean' else med
out = os.path.join(med, 'premix', sys.argv[1] + ' - tieng gop.wav'); os.makedirs(os.path.dirname(out), exist_ok=True)
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', '-', '-c:a', 'pcm_s24le', out], input=mix.astype(np.float32).tobytes(), check=True)
# ── cất track cũ, thay bằng 1 track ──
shutil.copy2(F, F + '.bak-premix')
json.dump({'tracks': tracks, 'materials': {}}, open(KEEP, 'w', encoding='utf-8'), ensure_ascii=False)
byid = {x['id']: (k, x) for k, L in M.items() if isinstance(L, list) for x in L if isinstance(x, dict) and 'id' in x}
s0 = tracks[0]['segments'][0]; m0 = A[s0['material_id']]
am = copy.deepcopy(m0); am.update(id=str(uuid.uuid4()).upper(), path=out, name=os.path.basename(out), duration=int(round(len(mix) / SR * US)), local_material_id=str(uuid.uuid4()))
M['audios'].append(am)
refs = []
for r in s0.get('extra_material_refs', []):
    if r in byid and byid[r][0] != 'audio_fades':
        k, x = byid[r]; y = copy.deepcopy(x); y['id'] = str(uuid.uuid4()).upper(); M[k].append(y); refs.append(y['id'])
seg = copy.deepcopy(s0); seg.update(id=str(uuid.uuid4()).upper(), material_id=am['id'], volume=1.0, last_nonzero_volume=1.0, extra_material_refs=refs,
                                    source_timerange={'start': 0, 'duration': am['duration']}, target_timerange={'start': 0, 'duration': am['duration']})
tr = copy.deepcopy(tracks[0]); tr.update(id=str(uuid.uuid4()).upper(), name='Tiếng gộp', segments=[seg])
D['tracks'] = [t for t in D['tracks'] if t['type'] != 'audio'] + [tr]
save()
print(f'✅ gộp {n} đoạn tiếng / {len(tracks)} track → 1 file {len(mix)/SR:.1f}s: {out}')
print(f'   đỉnh bản trộn {20*np.log10(pk):+.1f} dBFS' + (f' → hạ đều {20*np.log10(g):+.1f} dB' if g < 1 else '') + f' · track cũ cất ở {KEEP} (--undo để trả lại)')
