#!/usr/bin/env python3
# 🎞️ XEM VIDEO MẪU — tách video tham khảo thành BẢNG PHÂN CẢNH để Claude "xem" được (Mac: cần ffmpeg, python3 + numpy + Pillow, yt-dlp nếu dùng link)
#   python3 tools/xem-video.py <file.mp4 | link YouTube> [--from 62] [--to 75] [--out thư_mục] [--cut 0.32] [--sketch]
# • Link YouTube: chỉ tải ĐÚNG đoạn --from..--to (yt-dlp --download-sections, client android_vr — client mặc định hay lỗi).
# • Tìm chỗ CẮT MÁY bằng bộ lọc scene của ffmpeg (--cut = ngưỡng, nhỏ hơn = nhạy hơn) → mỗi cảnh 1 hàng: 3 khung (đầu/giữa/cuối)
#   ghi giây + thời lượng cảnh; --sketch thêm cột nét phác đen trắng (nhìn bố cục/góc máy cho rõ).
# • Nhịp nhạc: dò điểm bùng âm (spectral flux) → in danh sách giây + vạch đỏ trên thanh thời gian mỗi hàng.
# Ra: <out>/sheet_01.jpg, sheet_02.jpg… (8 cảnh / tấm) + shots.json {shots:[[đầu,cuối]...], beats:[...]}. Đọc ảnh bằng Read.
import sys, os, re, json, subprocess, shutil, tempfile, argparse
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps, ImageFont

ap = argparse.ArgumentParser()
ap.add_argument('src'); ap.add_argument('--from', dest='t0', type=float, default=None); ap.add_argument('--to', dest='t1', type=float, default=None)
ap.add_argument('--out', default=None); ap.add_argument('--cut', type=float, default=0.32); ap.add_argument('--sketch', action='store_true')
ap.add_argument('--per', type=int, default=8)
A = ap.parse_args()
out = os.path.abspath(A.out or os.path.join(tempfile.gettempdir(), 'xem-video'))
os.makedirs(out, exist_ok=True)

def _font(px):
    for f in ['/System/Library/Fonts/Supplemental/Arial Bold.ttf', '/System/Library/Fonts/Supplemental/Arial.ttf', 'C:/Windows/Fonts/arialbd.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf']:
        if os.path.exists(f): return ImageFont.truetype(f, px)
    return ImageFont.load_default()
FT, FS = _font(17), _font(15)
def run(cmd, **kw): return subprocess.run(cmd, capture_output=True, text=True, **kw)

# 1) nguồn video (tải đúng đoạn nếu là link)
src = A.src; off = 0.0
if re.match(r'https?://', src):
    dst = os.path.join(out, 'clip.%(ext)s')
    cmd = [sys.executable, '-m', 'yt_dlp', '-q', '--no-playlist', '--extractor-args', 'youtube:player_client=android_vr', '-f', 'bv*[height<=720]+ba/b[height<=720]/b',
           '--merge-output-format', 'mp4', '-o', dst, '--force-overwrites']
    if A.t0 is not None or A.t1 is not None:
        cmd += ['--download-sections', f'*{A.t0 or 0}-{A.t1 if A.t1 is not None else "inf"}', '--force-keyframes-at-cuts']
        off = A.t0 or 0.0
    r = run(cmd + [src])
    if r.returncode: print(r.stderr[-1500:]); sys.exit('❌ tải video lỗi')
    src = next(os.path.join(out, f) for f in os.listdir(out) if f.startswith('clip.'))
    t0, t1 = 0.0, None   # file tải về đã là đúng đoạn
else:
    t0, t1 = A.t0 or 0.0, A.t1
    off = 0.0

dur = float(run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', src]).stdout.strip() or 0)
t1 = min(t1, dur) if t1 else dur
seg = ['-ss', str(t0), '-to', str(t1)]

# 2) chỗ cắt máy
r = run(['ffmpeg', '-hide_banner', *seg, '-i', src, '-vf', f"select='gt(scene,{A.cut})',showinfo", '-an', '-f', 'null', '-'])
cuts = [t0 + float(m) for m in re.findall(r'pts_time:([0-9.]+)', r.stderr)]
edges = [t0] + [c for c in cuts if c - t0 > 0.15 and t1 - c > 0.15] + [t1]
shots = [[a, b] for a, b in zip(edges, edges[1:]) if b - a > 0.08]

# 3) nhịp: điểm bùng âm từ phổ (spectral flux), lọc cách nhau ≥ 0.18s
beats = []
wav = os.path.join(out, 'a.raw')
r = run(['ffmpeg', '-hide_banner', '-y', *seg, '-i', src, '-vn', '-ac', '1', '-ar', '22050', '-f', 's16le', wav])
if os.path.exists(wav) and os.path.getsize(wav) > 22050:
    x = np.frombuffer(open(wav, 'rb').read(), np.int16).astype(np.float32) / 32768
    H, N = 512, 1024; fr = np.lib.stride_tricks.sliding_window_view(x, N)[::H] * np.hanning(N)
    S = np.log1p(np.abs(np.fft.rfft(fr, axis=1)) * 10); flux = np.maximum(0, np.diff(S, axis=0)).sum(1)
    flux = (flux - np.median(flux)) / (flux.std() + 1e-9); w = 8
    for i in range(w, len(flux) - w):
        if flux[i] > 1.6 and flux[i] == flux[i - w:i + w + 1].max():
            t = t0 + (i + 1) * H / 22050
            if not beats or t - beats[-1] > 0.18: beats.append(round(t, 2))
    os.remove(wav)

# 4) bảng ảnh
def grab(t, path):
    run(['ffmpeg', '-hide_banner', '-y', '-ss', f'{t:.3f}', '-i', src, '-frames:v', '1', '-vf', 'scale=480:-2', path])
    return Image.open(path).convert('RGB') if os.path.exists(path) else None
tmp = os.path.join(out, '_f.jpg'); rows = []
for i, (a, b) in enumerate(shots):
    ts = [a + min(0.08, (b - a) * 0.2), (a + b) / 2, b - min(0.08, (b - a) * 0.2)]
    ims = [grab(t, tmp) for t in ts]
    if A.sketch and ims[1]:
        e = ImageOps.invert(ims[1].convert('L').filter(ImageFilter.FIND_EDGES)); e = ImageOps.autocontrast(e, cutoff=2).point(lambda v: 255 if v > 200 else (0 if v < 120 else v)); ims.append(e.convert('RGB'))
    rows.append((i, a, b, ts, ims))
for p in range(0, len(rows), A.per):
    part = rows[p:p + A.per]; cw = 480; ch = max((im.height for r_ in part for im in r_[4] if im), default=270)
    cols = 4 if A.sketch else 3; lab = 26
    sheet = Image.new('RGB', (cw * cols, (ch + lab) * len(part)), (18, 18, 22)); d = ImageDraw.Draw(sheet)
    for j, (i, a, b, ts, ims) in enumerate(part):
        y = j * (ch + lab)
        nb = [bt for bt in beats if a <= bt < b]
        d.text((6, y + 4), f'SHOT {i + 1}   {a + off:.2f}s -> {b + off:.2f}s   ({b - a:.2f}s)    beats: {", ".join(f"{bt + off:.2f}" for bt in nb) or "-"}', fill=(255, 220, 90), font=FT)
        for k, im in enumerate(ims):
            if im: sheet.paste(im.resize((cw, int(im.height * cw / im.width))), (k * cw, y + lab))
            if k < 3: d.text((k * cw + 6, y + lab + 4), f'{ts[k] + off:.2f}s', fill=(255, 255, 0), font=FS, stroke_width=2, stroke_fill=(0, 0, 0))
        for bt in nb:   # vạch nhịp trên thanh thời gian của cảnh
            xx = int((bt - a) / max(1e-6, b - a) * cw * 3); d.line([(xx, y + lab - 4), (xx, y + lab - 1)], fill=(255, 60, 60), width=3)
    sheet.save(os.path.join(out, f'sheet_{p // A.per + 1:02d}.jpg'), quality=86)
if os.path.exists(tmp): os.remove(tmp)
json.dump({'src': A.src, 'offset': off, 'shots': [[round(a + off, 2), round(b + off, 2)] for a, b in shots], 'beats': [round(b + off, 2) for b in beats]}, open(os.path.join(out, 'shots.json'), 'w'))
print(f'✅ {len(shots)} cảnh · {len(beats)} nhịp → {out}/sheet_*.jpg  (+ shots.json)')
