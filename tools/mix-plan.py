# 🔊 Trộn tiếng cho tools/render-duo.js: plan.json = [{f, t, end, ct, loop, rate, g}] → 1 file wav 48k stereo.
#   python3 tools/mix-plan.py plan.json out.wav
import json, subprocess, sys
import numpy as np

SR = 48000
plan = json.load(open(sys.argv[1]))
out = np.zeros((int(plan['dur'] * SR) + SR, 2), np.float32)
bg = np.zeros_like(out); fx = np.zeros_like(out)   # bg = nhạc nền cần nhường (duck) · fx = tiếng đánh nhau (không phải nhạc) dùng làm tín hiệu nén
cache = {}

def load(f, tempo=1):
    k = (f, round(tempo, 4))
    if k not in cache:
        af = ['-af', f'atempo={tempo:.5f}'] if abs(tempo - 1) > 1e-4 else []   # giãn thời gian, GIỮ cao độ (Chrome mặc định preservesPitch)
        raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', f, *af, '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-'], capture_output=True).stdout
        cache[k] = np.frombuffer(raw, np.float32).reshape(-1, 2)
    return cache[k]

# 🔇 khoảng lặng đầu file: 145/326 tiếng im >0.1s mới kêu (marmot_scream 0.48s, sm_omae 0.9s…) → game gọi đúng lúc mà nghe TRỄ.
#    Tiếng hiệu ứng tự bỏ qua đoạn này (tới lúc tiếng đạt 10% đỉnh, chừa 12ms) · nhạc giữ nguyên vì hình bám theo vị trí nhạc
heads = {}
def head(f, src):
    if f not in heads:
        m = np.abs(src).mean(axis=1); w = int(0.01 * SR); e = np.sqrt(np.convolve(m * m, np.ones(w) / w, 'same')); pk = e.max()
        heads[f] = min(1.6, max(0.0, np.argmax(e > pk * 0.1) / SR - 0.012)) if pk > 0 else 0.0
    return heads[f]

for p in plan['plan']:
    r = p['rate'] or 1
    keep = p.get('keep') and abs(r - 1) > 1e-4   # nhạc đổi tốc: dùng bản đã giãn, đọc ở tốc 1
    src = load(p['f'], r if keep else 1)
    if not len(src):
        continue
    n = int((p['end'] - p['t']) * SR)
    if n <= 0:
        continue
    # vị trí đọc trong file (tiếng hiệu ứng: tốc r đổi cả cao độ · nhạc: đã giãn sẵn nên đọc tốc 1, điểm đầu ct cũng co theo r)
    skip = head(p['f'], src) if not p.get('keep') and not p['loop'] and p['ct'] < 0.01 else 0
    pos = p['ct'] / r * SR + np.arange(n) if keep else (p['ct'] + skip) * SR + np.arange(n) * r
    if p['loop']:
        pos = np.mod(pos, len(src) - 1)
    else:
        pos = pos[pos < len(src) - 1]
    if not len(pos):
        continue
    i0 = pos.astype(np.int64); fr = (pos - i0)[:, None].astype(np.float32)
    seg = src[i0] * (1 - fr) + src[i0 + 1] * fr
    s = int(p['t'] * SR); e = min(len(out), s + len(seg))
    x = seg[:e - s] * p['g']
    (bg if p.get('duck') else out)[s:e] += x
    if not p.get('keep'): fx[s:e] += x

if bg.any():   # 🎚️ nén nhạc nền theo tiếng đánh nhau: có tiếng là nhỏ xuống (tối đa −10dB), hết tiếng to lại từ từ
    m = np.abs(fx).max(axis=1); h = int(0.01 * SR); m = np.maximum.reduceat(m, np.arange(0, len(m), h)); env = np.zeros_like(m); a, r = np.exp(-1 / 3), np.exp(-1 / 45); v = 0.0
    for i, x in enumerate(m): v = x + (v - x) * (a if x > v else r); env[i] = v
    gain = np.clip(1 / (1 + (env / 0.06) ** 1.2), 0.32, 1.0); out += bg * np.repeat(gain, h)[:len(bg), None]
out = out[:int(plan['dur'] * SR)]
raw = np.clip(out, -4, 4).astype(np.float32).tobytes()
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-i', '-', sys.argv[2]], input=raw, check=True)
