# 🎼 SOÁT BẢN PHỐI NHIỀU COVER (Mac: python3 + numpy + ffmpeg) — mỗi hàng của plan, các bản có chơi CÙNG 1 ĐOẠN BÀI không.
#   python3 tools/x/music-check.py tools/x/_ref/mega/plan.json            → bảng độ giống giai điệu từng cặp bản trong từng hàng
#   python3 tools/x/music-check.py --map <bản> <gốc giây> <ref> <gốc ref>  → mỗi vòng của <bản> giống vòng nào của <ref> nhất (dò cấu trúc bài)
# Độ giống = chroma GIAI ĐIỆU (400–2200 Hz, mỗi khung 23ms, cùng vị trí trong vòng). Cùng đoạn ~0.45–0.8, khác đoạn ~0.1–0.3.
# (Dải đầy đủ KHÔNG dùng được: vòng nào của Megalovania cũng 4 hợp âm D C B B♭ → mọi vòng đều "giống" nhau — lỗi của bản phối v1–v3.)
# Bản trống (chơi đè nhạc gốc) bị chũm choẹ lấn → điểm của nó thấp hơn hẳn (0.2–0.5) dù đúng đoạn; so với nhau thì xem hàng / cột chứ đừng so tuyệt đối.
import sys, json, subprocess, os, numpy as np
SR, HOP, N = 22050, 512, 4096
FPS = SR / HOP
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
_c = {}
def chroma(path, lo=400, hi=2200):
    k = (path, lo, hi)
    if k in _c: return _c[k]
    x = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', os.path.join(ROOT, path), '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout, dtype=np.float32)
    w = np.hanning(N); fr = np.fft.rfftfreq(N, 1 / SR); m = (fr >= lo) & (fr <= hi); pc = ((np.round(12 * np.log2(fr[m] / 440)) + 9) % 12).astype(int)
    out = []
    for p in range(0, len(x) - N, HOP):
        S = np.abs(np.fft.rfft(x[p:p + N] * w))[m] ** 2; out.append(np.sqrt(np.bincount(pc, S, 12)))
    c = np.array(out); cs = np.cumsum(np.vstack([np.zeros((1, 12)), c]), 0); c = (cs[3:] - cs[:-3]) / 3
    c -= c.mean(1, keepdims=True); c /= np.linalg.norm(c, axis=1, keepdims=True) + 1e-9
    _c[k] = c; return c
def seg(path, t, dur):
    X = chroma(path); s = int(round(t * FPS)); n = int(round(dur * FPS))
    return X[s:s + n] if s >= 0 and s + n <= len(X) else None
def sim(a, b):
    n = min(len(a), len(b)); return float((a[:n] * b[:n]).sum(1).mean())
if sys.argv[1] == '--map':
    _, _, a, oa, r, orr = sys.argv[:6]; C = 8 * 120 / 119.717
    def cyc(p, o):
        o = float(o); out = []; t = o
        while t < 0: out.append(None); t += C          # vòng bị cắt đầu file
        while seg(p, t, C) is not None: out.append(seg(p, t, C)); t += C
        return out
    A, R = cyc(a, oa), cyc(r, orr)
    for i, x in enumerate(A):
        if x is None: continue
        sc = sorted(((sim(x, y), j) for j, y in enumerate(R) if y is not None), reverse=True)[:3]
        print(f'{i:3d}  ' + '  '.join(f'{j}({int(s * 100)})' for s, j in sc))
    sys.exit()
plan = json.load(open(sys.argv[1])); C = 16 * 60 / plan['bpm']
print('hàng  nhãn  tên                      cặp bản: độ giống giai điệu (x100) — thấp nhất')
for r in plan['rows']:
    tr = r['play']; segs = {t: seg(plan['tracks'][t], r['src'][t], C) for t in tr}; pairs = []
    for i in range(len(tr)):
        for j in range(i + 1, len(tr)):
            a, b = segs[tr[i]], segs[tr[j]]
            if a is not None and b is not None: pairs.append((sim(a, b), tr[i][:3] + '-' + tr[j][:3]))
    lo = min(pairs)[0] if pairs else None
    print(f"{r['k']:3d}  {r['lab']:5s} {r['name'][:24]:24s} " + ' '.join(f'{n}:{int(s * 100)}' for s, n in pairs) + (f'   ↓{int(lo * 100)}' if lo is not None else ''))
