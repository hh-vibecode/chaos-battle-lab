#!/usr/bin/env python3
# 🎼 BẢN ĐỒ CAO TRÀO của bài hát (Mac): mỗi 0.5s 1 chữ số 0 nhẹ · 1 vào riff · 2 cao trào, xếp hạng trong CHÍNH bài đó.
#   python3 tools/song-hype.py assets/audio/a.mp3 assets/audio/b.mp3   → in các dòng dán vào EG_HYPE (js/game.js)
import sys, os, subprocess
import numpy as np
SR = 22050; CELL = SR // 2
def tiers(f):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', f, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True, check=True).stdout
    x = np.frombuffer(raw, '<i2').astype(np.float32) / 32768
    n = len(x) // CELL; rms = np.zeros(n); flux = np.zeros(n); W = 1024; H = 512; win = np.hanning(W); prev = None
    for i in range(n):
        seg = x[i * CELL:(i + 1) * CELL]; rms[i] = np.sqrt((seg ** 2).mean() + 1e-12)
        for k in range(0, len(seg) - W, H):
            s = np.abs(np.fft.rfft(seg[k:k + W] * win))
            if prev is not None: flux[i] += np.maximum(s - prev, 0).sum()
            prev = s
    z = lambda a: (a - a.mean()) / (a.std() + 1e-9)
    e = 0.6 * z(20 * np.log10(rms + 1e-6)) + 0.4 * z(flux); e = np.convolve(np.r_[e[0], e[0], e, e[-1], e[-1]], np.ones(5) / 5, 'valid')
    rk = lambda a: a.argsort().argsort() / max(1, n - 1)
    # trận chỉ nghe khoảng 20s đầu: xếp hạng cả bài + xếp hạng so với 20s xung quanh, không thì đoạn đầu luôn bị coi là nhẹ
    W2 = 41; loc = e - np.convolve(np.r_[np.full(W2 // 2, e[0]), e, np.full(W2 // 2, e[-1])], np.ones(W2) / W2, 'valid')
    r = rk(0.4 * rk(e) + 0.6 * rk(loc)); t = np.where(r > 0.68, 2, np.where(r > 0.34, 1, 0))
    i = 0   # bỏ đoạn ngắn dưới 1.5s: tư thế không nhảy mức liên tục
    while i < n:
        j = i
        while j < n and t[j] == t[i]: j += 1
        if j - i < 3 and i > 0: t[i:j] = t[i - 1]
        i = j
    return ''.join(map(str, t))
for f in sys.argv[1:]:
    s = tiers(f); print(f"  {os.path.splitext(os.path.basename(f))[0]}:'{s}',   // 0/1/2: {s.count('0')*100//len(s)}/{s.count('1')*100//len(s)}/{s.count('2')*100//len(s)}%")
