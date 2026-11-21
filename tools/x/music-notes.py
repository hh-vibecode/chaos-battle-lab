# 🎵 DÒ NỐT THẬT của từng nhạc cụ trong bản trộn → bảng nốt cho phim (hình đổi khung / lightstick lắc ĐÚNG lúc nhạc cụ đó kêu, không theo lưới phách).
#   python3 tools/x/music-mix.py tools/x/_ref/mega/plan.json ra.wav --stems <thư mục>      (WAV riêng từng bản, đúng giờ như bản trộn)
#   python3 tools/x/music-notes.py <thư mục> --film docs/mau-phim/film-megaband.js [--tracks drum,sax,piano,guitar,violin]
# Ghi vào phim khối giữa 2 dòng `// <NOTES>` … `// </NOTES>`:
#   const NOTES = { sax: { t:[centi giây…], s:[độ mạnh 1–9…], acc:[centi giây các nốt NHẤN, thưa — cho lightstick] }, … }
# Cách dò: spectral flux (log biên độ, 11.6ms / khung) → đỉnh cục bộ vượt ngưỡng trượt (trung vị 0.6s + delta), cách nhau ≥ GAP, bỏ chỗ bản đó gần như im (< −50 dB).
#   Nốt NHẤN (acc) = nốt mạnh ≥ trung vị, cách nhau ≥ ACCGAP (trống 0.4s ≈ 1 phách, violin 0.5s — câu chậm, guitar 0.3s, sax 0.4s).
import sys, os, json, wave, numpy as np
SR = 44100; HOP = 512; N = 2048
GAP = {'drum': 0.07, 'sax': 0.09, 'piano': 0.07, 'guitar': 0.07, 'violin': 0.1}
ACCGAP = {'drum': 0.4, 'sax': 0.4, 'piano': 0.35, 'guitar': 0.3, 'violin': 0.5}
PITCH = {'sax'}
BAND = {'drum': (60, 8000), 'sax': (150, 4000), 'piano': (100, 5000), 'guitar': (150, 6000), 'violin': (200, 6000)}
d = sys.argv[1]; film = sys.argv[sys.argv.index('--film') + 1] if '--film' in sys.argv else None
tracks = (sys.argv[sys.argv.index('--tracks') + 1] if '--tracks' in sys.argv else 'drum,sax,piano,guitar,violin').split(',')
def load(p):
    with wave.open(p) as w: x = np.frombuffer(w.readframes(w.getnframes()), dtype='<i2').reshape(-1, 2).mean(1) / 32767.
    return x
out = {}
for trk in tracks:
    x = load(os.path.join(d, trk + '.wav')); nf = (len(x) - N) // HOP; win = np.hanning(N)
    fr = np.fft.rfftfreq(N, 1 / SR); lo, hi = BAND[trk]; m = (fr >= lo) & (fr <= hi)
    flux = np.zeros(nf); en = np.zeros(nf); prev = None
    for i in range(nf):
        seg = x[i * HOP:i * HOP + N]; S = np.log1p(1000 * np.abs(np.fft.rfft(seg * win))[m])
        en[i] = 10 * np.log10(np.mean(seg ** 2) + 1e-12)
        if prev is not None: flux[i] = np.maximum(0, S - prev).sum()
        prev = S
    fps = SR / HOP; W = int(0.6 * fps); med = np.array([np.median(flux[max(0, i - W // 2):i + W // 2 + 1]) for i in range(nf)])
    sc = np.percentile(flux[en > -50], 95) if (en > -50).any() else 1
    thr = med + 0.12 * sc; g = int(GAP[trk] * fps); t, s = [], []
    for i in range(1, nf - 1):
        if en[i] < -50 or flux[i] < thr[i] or flux[i] < flux[i - 1] or flux[i] < flux[i + 1]: continue
        if t and i - t[-1] < g:
            if flux[i] > flux[t[-1]]: t[-1] = i; s[-1] = flux[i]
            continue
        t.append(i); s.append(flux[i])
    s = np.array(s); st = np.clip(np.round(1 + 8 * s / (np.percentile(s, 95) + 1e-9)), 1, 9).astype(int) if len(s) else s
    # trống + piano (nốt gõ): tinh chỉnh từng nốt theo đường năng lượng 1ms (dải BAND): chỗ năng lượng TĂNG DỐC NHẤT trong [−60ms, +30ms] quanh giữa cửa sổ FFT
    from scipy.signal import butter, sosfiltfilt
    y = sosfiltfilt(butter(4, [lo, min(hi, SR / 2 - 100)], 'bandpass', fs=SR, output='sos'), x); h1 = SR // 1000; n1 = len(y) // h1
    e1 = np.log(1e-9 + (y[:n1 * h1] ** 2).reshape(n1, h1).mean(1)); e1 = np.convolve(e1, np.ones(3) / 3, 'same'); de = e1 - np.roll(e1, 5)
    ts = []
    for i in t:
        if trk not in ('drum', 'piano'): ts.append(round((i * HOP + N / 2) / SR * 100)); continue   # sax / guitar / violin: nốt bật mềm → giữ đỉnh flux (chính xác hơn)
        c = int((i * HOP + N / 2) / h1); a0, b0 = max(5, c - 60), min(n1 - 1, c + 30)
        ts.append(round((a0 + int(np.argmax(de[a0:b0]))) / 10))   # ms → centi giây
    pit = []
    if trk in PITCH:   # cao độ mỗi nốt (số MIDI, HPS trong 40–140ms sau nốt) — Sans: vị trí ống trombone theo nốt cao / thấp
        M = 8192; wn = np.hanning(M); ff = np.fft.rfftfreq(M, 1 / SR)
        for tt in ts:
            a0 = int((tt / 100 + 0.04) * SR); seg = x[a0:a0 + M]
            if len(seg) < M: pit.append(0); continue
            X = np.abs(np.fft.rfft(seg * wn)); h = X.copy()
            for r in (2, 3): h[:len(X[::r])] *= X[::r]
            band = (ff >= 110) & (ff <= 1100); f0 = ff[band][np.argmax(h[band])]
            pit.append(int(round(69 + 12 * np.log2(f0 / 440))))
    acc = []; md = np.median(st) if len(st) else 0
    for tt, ss in zip(ts, st):
        if ss >= md and (not acc or tt - acc[-1] >= ACCGAP[trk] * 100): acc.append(tt)
    out[trk] = {'t': ts, 's': [int(v) for v in st], 'acc': acc, **({'p': pit} if pit else {})}
    print(f'{trk:7s} {len(ts):5d} nốt · {len(acc):4d} nốt nhấn · TB {len(ts) / (len(x) / SR):.1f} nốt/s')
if film:
    src = open(film).read(); a = src.index('// <NOTES>'); b = src.index('// </NOTES>')
    js = '// <NOTES> (tự sinh: tools/x/music-notes.py — ĐỪNG sửa tay; trộn lại nhạc thì chạy lại)\n  const NOTES=' + json.dumps(out, separators=(',', ':')) + ';\n  '
    open(film, 'w').write(src[:a] + js + src[b:]); print('ghi', film, f'{len(js) / 1024:.0f} KB')
