# 🎚️ TRỘN NHIỀU BẢN COVER THEO PLAN (Mac: python3 + numpy + ffmpeg) — cùng định dạng plan với tools/x/music-mix.html (bản Windows, chạy trong trình duyệt).
#   python3 tools/x/music-mix.py tools/x/_ref/mega/plan.json <ra.wav> [--levels]
#   --levels: in bảng độ to (dB RMS, trước nén) của TỪNG BẢN ở từng hàng của plan.rows → soát con nào bị nuốt / con mới vào có nổi lên không.
# PLAN: { dur, bpm, t0, snapRange, tracks:{tên:đường dẫn}, clips:[…], free:[…], master:{gain, comp} }
#   clip: {trk, src (giây phách đầu trong bản gốc), beat (phách trên lưới ra), beats, gain, pan, fi, fo, env, lvl, snap}
#   free: {trk, src, at (giây), dur, gain, pan, fi, fo, env, lvl, lvlRef:{src,dur}}
#   lvl  = CÂN ĐỘ TO: đo RMS (dB) đoạn nguồn đang dùng (hoặc lvlRef) rồi đưa về đúng lvl dBFS trước khi nhân gain / env
#          (các bản cover thu to nhỏ khác nhau — không cân thì bản thu nhỏ bị nuốt, vd piano v3 nhỏ hơn guitar ~14 dB).
#   pre  = giây vào sớm trước phách đầu (mặc định plan.xfade): to dần trong `pre` giây, khúc trước nhỏ dần đúng khoảng đó → NỐI GỐI, không lỗ hụt
#          (fo cũ 20ms + fi 6ms ⇒ hụt 10–20ms ngay trước phách 1 ở mọi chỗ nối, nghe "chật nhịp" — anh 20/11). Đuôi khúc cũng nhỏ dần trong `pre` giây cuối.
#   verb = giây ngân đuôi (vang giả lập) khi bản đó RỜI sân khấu sau khúc này — nốt cuối vang tắt tự nhiên thay vì bị cắt cụt.
#   env  = [[giây trong khúc, hệ số]] — đường âm lượng nối thẳng giữa các điểm (trước điểm đầu = hệ số đầu, sau điểm cuối = hệ số cuối).
#   snap = dò độ lệch ±snapRange (bước 1ms) để các cú (onset) của khúc trùng lưới 1/16 nốt nhất (tốc giữ nguyên = 1).
# master: nén (ngưỡng −16 dB, tỉ lệ 3, attack 5ms, release 150ms) rồi đưa đỉnh về −1 dBFS.
import sys, json, os, subprocess, wave, numpy as np
SR = 44100
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
plan = json.load(open(sys.argv[1])); OUT = sys.argv[2]; LEVELS = '--levels' in sys.argv; STEM = {}
P = 60 / plan.get('bpm', 120); dur = plan['dur']
def dec(p):
    b = subprocess.run(['ffmpeg', '-v', 'error', '-i', os.path.join(ROOT, p), '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout
    return np.frombuffer(b, dtype=np.float32).reshape(-1, 2).astype(np.float64)
buf = {k: dec(u) for k, u in plan['tracks'].items()}
for k, v in buf.items(): print('nạp', k, f'{len(v) / SR:.1f}s')
def onset_env(x):   # năng lượng > ~150 Hz, 1ms / điểm, tăng dương, mượt 7ms (giống music-mix.html)
    m = x.mean(1); hp = np.diff(m, prepend=0.0); hop = SR // 1000; n = len(hp) // hop
    e = np.log(1e-9 + (hp[:n * hop] ** 2).reshape(n, hop).mean(1)); d = np.maximum(0, e - np.roll(e, 4)); d[:4] = 0
    return np.convolve(d, np.ones(7) / 7, 'same')
ENV = {}
def snap(trk, src, beats, rng):
    if trk not in ENV: ENV[trk] = onset_env(buf[trk])
    env = ENV[trk]; W = np.array([1, 0.3, 0.6, 0.3]); k = np.arange(int(min(beats, 64) * 4)); w = W[k % 4]; best = (-1, 0)
    for o in np.arange(-rng, rng + 0.0005, 0.001):
        i = np.round((src + o + k * P / 4) * 1000).astype(int); ok = (i >= 0) & (i < len(env))
        s = float((env[i[ok]] * w[ok]).sum())
        if s > best[0]: best = (s, o)
    return best[1]
def rms_db(x): return 10 * np.log10(np.mean(x ** 2) + 1e-12)
out = np.zeros((int(np.ceil(dur * SR)), 2)); report = []
XF = plan.get('xfade', 0)
def place(cl, at, ln, src, xf=0):
    pre = cl.get('pre', xf); at -= pre; src -= pre; ln += pre
    b = buf[cl['trk']]; s0 = int(round(src * SR)); n = int(round(ln * SR)); a0 = int(round(at * SR))
    seg = np.zeros((n, 2)); lo = max(0, s0); hi = min(len(b), s0 + n)
    if hi > lo: seg[lo - s0:hi - s0] = b[lo:hi]
    G = cl.get('gain', 1.0)
    if cl.get('lvl') is not None:
        ref = cl.get('lvlRef'); r = seg if not ref else b[int(ref['src'] * SR):int((ref['src'] + ref['dur']) * SR)]
        G *= 10 ** ((cl['lvl'] - rms_db(r)) / 20)
    t = np.arange(n) / SR; fi = max(cl.get('fi', 0.008), pre); fo = max(cl.get('fo', 0.03), pre)
    if pre > 0:   # nối gối công suất đều (sin / cos) để 2 khúc gối nhau không hụt cũng không phồng
        g = np.sin(np.pi / 2 * np.clip(t / fi, 0, 1)) * np.sin(np.pi / 2 * np.clip((ln - t) / fo, 0, 1)) * G
    else:
        g = np.minimum(1, t / max(fi, 1e-6)) * np.minimum(1, (ln - t) / max(fo, 1e-6)); g = np.clip(g, 0, 1) * G
    if cl.get('env'): e = np.array(cl['env'], dtype=float); g *= np.interp(t - pre, e[:, 0], e[:, 1])
    seg *= g[:, None]
    p = cl.get('pan', 0) or 0
    if p:   # StereoPanner của WebAudio với nguồn stereo
        L, R = seg[:, 0].copy(), seg[:, 1].copy()
        if p <= 0: x = (p + 1) * np.pi / 2; seg[:, 0] = L + R * np.cos(x); seg[:, 1] = R * np.sin(x)
        else: x = p * np.pi / 2; seg[:, 0] = L * np.cos(x); seg[:, 1] = R + L * np.sin(x)
    if cl.get('verb'):   # vang giả lập: 0.4s cuối khúc chập với nhiễu tắt dần (RT60 = verb), lọc bớt chói, nhỏ hơn ~8 dB
        rt = cl['verb']; m = int(0.4 * SR); src_t = seg[-m:]; L = int(rt * SR)
        rng = np.random.default_rng(7); ir = rng.standard_normal((L, 2)) * np.exp(-6.9 * np.arange(L) / L)[:, None]
        a = np.exp(-2 * np.pi * 4500 / SR)
        from scipy.signal import lfilter, fftconvolve
        ir = lfilter([1 - a], [1, -a], ir, axis=0); ir /= np.sqrt((ir ** 2).sum(0, keepdims=True)) + 1e-9
        wet = np.stack([fftconvolve(src_t[:, c], ir[:, c]) for c in range(2)], 1) * 0.4
        wet[:m] *= np.linspace(0, 1, m)[:, None] ** 2          # vang nở dần trong lúc nốt cuối còn kêu
        seg = np.vstack([seg, np.zeros((len(wet) - m, 2))]); seg[-len(wet):] += wet; n = len(seg)
    e0 = min(len(out), a0 + n)
    if e0 > a0:
        out[a0:e0] += seg[:e0 - a0]
        if LEVELS: STEM.setdefault(cl['trk'], np.zeros_like(out))[a0:e0] += seg[:e0 - a0]
    return G
for cl in plan.get('clips', []):
    off = snap(cl['trk'], cl['src'], cl['beats'], cl.get('snapRange', plan.get('snapRange', 0.08))) if cl.get('snap', True) else 0
    G = place(cl, plan['t0'] + cl['beat'] * P, cl['beats'] * P, cl['src'] + off, XF)
    report.append(f"{cl['trk']:7s} phách {cl['beat']:3d} từ {cl['src']:7.3f}s lệch {round(off * 1000):+3d}ms  hệ số {G:.2f}")
for fr in plan.get('free', []): place(fr, fr['at'], fr['dur'], fr['src'])
if LEVELS and plan.get('rows'):
    C = 16 * P; ks = list(STEM); print('hàng  nhãn  tên                     ' + ''.join(f'{k:>8s}' for k in ks) + '   (dB, mỗi ô nhịp 2s: TB 4 ô)')
    for r in plan['rows']:
        cells = []
        for k in ks:
            a = int(r['at'] * SR); b = int((r['at'] + C) * SR); v = rms_db(STEM[k][a:b])
            cells.append(f'{v:8.1f}' if v > -60 else '       ·')
        print(f"{r['k']:3d}  {r['lab']:5s} {r['name'][:22]:22s} " + ''.join(cells))
out *= plan.get('master', {}).get('gain', 1)
if plan.get('master', {}).get('comp', True):
    hop = SR // 1000; n = len(out) // hop; lv = np.abs(out[:n * hop]).max(1).reshape(n, hop).max(1)
    db = 20 * np.log10(lv + 1e-9); T, Rt, Kn = -16.0, 3.0, 8.0; over = db - T
    gr = np.where(over <= -Kn / 2, 0, np.where(over >= Kn / 2, over * (1 - 1 / Rt), (1 - 1 / Rt) * (over + Kn / 2) ** 2 / (2 * Kn)))
    aA, aR = np.exp(-1 / 5), np.exp(-1 / 150); sm = np.zeros(n); y = 0.0
    for i in range(n):
        x = gr[i]; y = aA * y + (1 - aA) * x if x > y else aR * y + (1 - aR) * x; sm[i] = y
    gl = 10 ** (-np.interp(np.arange(len(out)) / hop, np.arange(n) + 0.5, sm) / 20); out *= gl[:, None]
pk = np.abs(out).max(); out *= 0.89 / pk if pk > 0 else 1
pcm = (np.clip(out, -1, 1) * 32767).astype('<i2')
with wave.open(OUT, 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print('\n'.join(report)); print(f'xong {OUT}  {len(out) / SR:.1f}s  đỉnh trước chuẩn hoá {pk:.2f}')
