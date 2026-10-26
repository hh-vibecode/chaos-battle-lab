# 🔊 Trộn tiếng cho tools/render-duo.js: plan.json = [{f, t, end, ct, loop, rate, g}] → 1 file wav 48k stereo.
#   python3 tools/mix-plan.py plan.json out.wav
import json, subprocess, sys
import numpy as np

SR = 48000
plan = json.load(open(sys.argv[1]))
out = np.zeros((int(plan['dur'] * SR) + SR, 2), np.float32)
cache = {}

def load(f):
    if f not in cache:
        raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', f, '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-'], capture_output=True).stdout
        cache[f] = np.frombuffer(raw, np.float32).reshape(-1, 2)
    return cache[f]

for p in plan['plan']:
    src = load(p['f'])
    if not len(src):
        continue
    n = int((p['end'] - p['t']) * SR)
    if n <= 0:
        continue
    r = p['rate'] or 1
    # vị trí đọc trong file gốc (tốc phát r: nhanh hơn thì cao giọng hơn, y như playbackRate của trình duyệt cũ)
    pos = p['ct'] * SR + np.arange(n) * r
    if p['loop']:
        pos = np.mod(pos, len(src) - 1)
    else:
        pos = pos[pos < len(src) - 1]
    if not len(pos):
        continue
    i0 = pos.astype(np.int64); fr = (pos - i0)[:, None].astype(np.float32)
    seg = src[i0] * (1 - fr) + src[i0 + 1] * fr
    s = int(p['t'] * SR); e = min(len(out), s + len(seg))
    out[s:e] += seg[:e - s] * p['g']

out = out[:int(plan['dur'] * SR)]
raw = np.clip(out, -4, 4).astype(np.float32).tobytes()
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-i', '-', sys.argv[2]], input=raw, check=True)
