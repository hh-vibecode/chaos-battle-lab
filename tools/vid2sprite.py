#!/usr/bin/env python3
# 🎞️➡️🖼️ VIDEO NGẮN → KHUNG HÌNH KHÔNG NỀN cho game (Mac: python3 + rembg[cpu] + numpy/scipy/Pillow, ffmpeg; link TikTok/YouTube cần yt_dlp)
#
#   python3 tools/vid2sprite.py <file.mp4 | link> --out assets/img/<key> --name BX_V [--from 1.5 --to 3.0] [--fps 15] [--h 420]
#
# Các bước: (1) link → tải bằng python -m yt_dlp vào thư mục tạm riêng · (2) ffmpeg cắt khung theo --fps trong đoạn --from..--to
# (3) tách nền bằng AI rembg, model BiRefNet-lite (sạch nhất mà máy 16GB chạy nổi; bản đầy đủ bị hệ điều hành giết vì tràn RAM).
#     CHỈ chạy CPU — CoreML trên Mac Intel chậm gấp 9 lần (đo 15/11: CPU ~13s/khung, CoreML ~130s)
# (4) dọn mặt nạ: giữ mảng lớn nhất (bỏ vụn nền), LẤP LỖ trong thân (mắt/đốm sáng hay bị khoét thủng), tô lại màu lông cho
#     vùng bán trong suốt (tay nhoè chuyển động hay lẫn màu nền tối → thành vệt bẩn) bằng màu thân lân cận
# (5) cắt CHUNG 1 khung cho mọi ảnh (hộp bao gộp tất cả khung, chân chạm đáy) → đổi khung trong game không giật
# (6) phóng về cao --h px: Lanczos + làm nét nhẹ; có --esrgan <đường dẫn realesrgan-ncnn-vulkan> thì phóng AI ×4 trước
# Ra: <out>/<name>_01.webp … + bảng xem trước <out-tmp>/sheet.png + preview.gif (nền xám) để soát trước khi đưa vào game.
import argparse, os, subprocess, sys, tempfile, glob, shutil, time
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

ap = argparse.ArgumentParser()
ap.add_argument('src'); ap.add_argument('--out', required=True); ap.add_argument('--name', required=True)
ap.add_argument('--from', dest='t0', type=float, default=0); ap.add_argument('--to', dest='t1', type=float, default=None)
ap.add_argument('--fps', type=float, default=15); ap.add_argument('--h', type=int, default=420)
ap.add_argument('--model', default='birefnet-general-lite'); ap.add_argument('--esrgan', default=None)
ap.add_argument('--tmp', default=None, help='thư mục làm việc (giữ lại khung tách nền để chạy lại bước sau không phải tách lại)')
ap.add_argument('--pick', default=None, help='chỉ xuất các khung này (đếm từ 1 trong đoạn đã cắt), vd 1,3-10,12')
ap.add_argument('--quality', type=int, default=92)
ap.add_argument('--warm-gray', action='store_true', help='nhuộm lại mảng XÁM nhoè (thiếu sáng) theo màu lông lân cận — dùng khi lông có màu (mèo cam…)')
ap.add_argument('--keep-blur', action='store_true', help='giữ vùng nhoè chuyển động bán trong suốt như AI tách ra (mặc định làm đặc lõi để khỏi trông như khuyết)')
ap.add_argument('--no-shadow-trim', action='store_true', help='giữ nguyên vùng tối sát đáy (mặc định xoá: bóng nhân vật trên mặt đất hay dính vào chân)')
ap.add_argument('--drop-edge', action='store_true', help='bỏ khung có nhân vật CHẠM mép trái / phải / trên của video (bị cắt mất 1 phần)')
a = ap.parse_args()

tmp = a.tmp or tempfile.mkdtemp(prefix='vid2sprite_'); os.makedirs(tmp, exist_ok=True)
src = a.src
if src.startswith('http'):   # tải về thư mục riêng, không chạy gì trong đó
    dl = os.path.join(tmp, 'dl'); os.makedirs(dl, exist_ok=True)
    if not glob.glob(os.path.join(dl, 'src.*')):
        subprocess.run([sys.executable, '-m', 'yt_dlp', '-q', '--no-playlist', '-f', 'bv*+ba/b', '-o', os.path.join(dl, 'src.%(ext)s'), src], check=True)
    src = sorted(glob.glob(os.path.join(dl, 'src.*')))[0]

# (2) cắt khung
fr = os.path.join(tmp, 'frames')
if not glob.glob(os.path.join(fr, '*.png')):
    os.makedirs(fr, exist_ok=True)
    cmd = ['ffmpeg', '-v', 'error', '-y', '-ss', str(a.t0)] + (['-to', str(a.t1)] if a.t1 else []) + ['-i', src, '-vf', f'fps={a.fps}', os.path.join(fr, '%03d.png')]
    subprocess.run(cmd, check=True)
files = sorted(glob.glob(os.path.join(fr, '*.png')))
if a.pick:
    keep = set()
    for part in a.pick.split(','):
        lo, _, hi = part.partition('-'); keep.update(range(int(lo), int(hi or lo) + 1))
    files = [f for i, f in enumerate(files, 1) if i in keep]
print(f'{len(files)} khung', flush=True)

# (3) tách nền (cache trong tmp/cut)
cut = os.path.join(tmp, 'cut'); os.makedirs(cut, exist_ok=True)
todo = [f for f in files if not os.path.exists(os.path.join(cut, os.path.basename(f)))]
if todo:
    from rembg import remove, new_session
    sess = new_session(a.model, providers=['CPUExecutionProvider'])
    for i, f in enumerate(todo, 1):
        t = time.time(); remove(Image.open(f).convert('RGB'), session=sess).save(os.path.join(cut, os.path.basename(f)))
        print(f'  tách nền {i}/{len(todo)} ({time.time()-t:.0f}s)', flush=True)

# (4) dọn mặt nạ
def clean(im):
    x = np.asarray(im.convert('RGBA')).astype(np.float32)
    al = x[..., 3] / 255
    m = al > 0.5
    lab, n = ndimage.label(m)
    if n:   # giữ THÂN = mảng lớn nhất + mảng đặc nào nằm sát nó (vd đuôi tách rời vài px)
        sz = ndimage.sum(m, lab, range(1, n + 1)); big = lab == (1 + int(np.argmax(sz)))
        near = ndimage.binary_dilation(big, iterations=6)
        ids = [i for i in np.unique(lab[near & m]) if i > 0 and sz[i - 1] >= 0.03 * sz.max()]   # mảng rời phải ĐỦ LỚN (đuôi, chân) — vệt bóng chân phản chiếu dưới đất / đốm nhỏ thì bỏ dù nằm sát
        body = np.isin(lab, ids)
        # xoá MỌI đốm rời (kể cả đốm mờ — đèn mưa, bóng phản chiếu): chỉ giữ vùng mờ NỐI LIỀN rõ với thân, trong 6px quanh thân
        lab2, _ = ndimage.label(al > 0.15); ids2 = np.unique(lab2[body]); soft = np.isin(lab2, ids2[ids2 > 0])
        al = np.where(soft & ndimage.binary_dilation(body, iterations=6), al, 0)
        m = al > 0.5
    if not a.no_shadow_trim:   # bóng đổ dưới chân: vùng RẤT TỐI ở 15% dưới cùng của thân → xoá (mắt / đốm tối của lông không nằm ở đó)
        ys = np.where(m.any(1))[0]
        if len(ys):
            y0b = ys[-1] - int((ys[-1] - ys[0]) * 0.15); dark = (x[..., :3].max(-1) < 60); dark[:y0b] = False
            al = np.where(ndimage.binary_dilation(dark, iterations=1), 0, al); m = al > 0.5
            lab, n = ndimage.label(m)   # cắt bóng có thể để lại mẩu rời → giữ lại khối thân
            if n > 1: sz2 = ndimage.sum(m, lab, range(1, n + 1)); keep = lab == (1 + int(np.argmax(sz2))); al = np.where(ndimage.binary_dilation(keep, iterations=4), al, 0); m = al > 0.5
    holes = ndimage.binary_fill_holes(m) & ~m          # lỗ bị khoét trong thân → đặc lại
    al = np.where(holes, 1.0, al)
    # 🖐️ vùng NHOÈ CHUYỂN ĐỘNG (tay đang vung) bị tách thành bán trong suốt → trông như KHUYẾT 1 mảng, lộ nền.
    #    Gom vùng ≥ 0.2 alpha, đóng các chỗ lõm nhỏ, lấp kín → phần lõi (lùi vào 3px) đặc lại ≥ 0.95, mép ngoài vẫn mềm
    if not a.keep_blur:
        disk = np.hypot(*np.mgrid[-5:6, -5:6]) <= 5
        sol = ndimage.binary_fill_holes(ndimage.binary_closing(al > 0.2, structure=disk, iterations=2))
        core = ndimage.binary_erosion(sol, iterations=3)
        al = np.where(core, np.maximum(al, 0.95), al)
    # màu vùng mép / bán trong suốt: lấy màu trung bình có trọng số của phần THÂN ĐẶC lân cận (normalized convolution)
    solid = (al > 0.92).astype(np.float32)
    rgb = x[..., :3]
    num = np.stack([ndimage.gaussian_filter(rgb[..., c] * solid, 3) for c in range(3)], -1)
    den = ndimage.gaussian_filter(solid, 3)[..., None]
    fill = np.where(den > 1e-3, num / np.maximum(den, 1e-3), rgb)
    w = np.clip((0.92 - al) / 0.6, 0, 1)[..., None]     # càng trong suốt càng lấy màu thân (giữ nguyên chỗ gần đặc)
    rgb = rgb * (1 - w) + fill * w
    if a.warm_gray:   # 🎨 mảng XÁM do nhoè + thiếu sáng (tay vung khuất đèn) trông như KHUYẾT → nhuộm lại theo màu lông có màu lân cận
        mx, mn = rgb.max(-1), rgb.min(-1); sat = (mx - mn) / np.maximum(mx, 1)
        furw = ((sat > 0.28) & (al > 0.9)).astype(np.float32)
        gmean = (rgb * furw[..., None]).sum((0, 1)) / max(1, furw.sum())   # màu lông trung bình cả con (dự phòng)
        fn = np.stack([ndimage.gaussian_filter(rgb[..., c] * furw, 28) for c in range(3)], -1); fd = ndimage.gaussian_filter(furw, 28)[..., None]   # mảng xám rộng → lấy màu lông ở phạm vi rộng
        wf = np.clip(fd / 0.05, 0, 1); fur = (fn / np.maximum(fd, 1e-4)) * wf + gmean * (1 - wf)
        lum = rgb.mean(-1)
        gm = (sat < 0.25) & (lum > 35) & (lum < 190) & (al > 0.5)       # xám / nâu xám tối: bỏ qua bụng trắng sáng
        lab, n = ndimage.label(gm)                                        # chỉ mảng xám LỚN (tay khuất bóng) — mắt, mũi, ria nhỏ thì giữ nguyên
        if n: szs = ndimage.sum(gm, lab, range(1, n + 1)); gm = np.isin(lab, [i + 1 for i, v in enumerate(szs) if v >= 0.012 * max(1, (al > 0.5).sum())])
        g = np.clip((0.25 - sat) / 0.25, 0.35, 1) * gm
        g = ndimage.gaussian_filter(g.astype(np.float32), 2)[..., None] * 0.9
        rgb = rgb * (1 - g) + fur * (lum[..., None] / np.maximum(fur.mean(-1, keepdims=True), 1)).clip(0.6, 1.4) * g   # giữ sáng tối gốc, chỉ thay sắc
    return np.dstack([rgb, al * 255]).clip(0, 255).astype(np.uint8)

arrs = [clean(Image.open(os.path.join(cut, os.path.basename(f)))) for f in files]
names = [os.path.basename(f) for f in files]
if a.drop_edge:   # nhân vật chạm mép (trừ mép dưới — chân đứng ở đáy là bình thường) = bị video cắt mất 1 phần → bỏ
    ok = [i for i, A in enumerate(arrs) if not ((A[:, :3, 3] > 128).any() or (A[:, -3:, 3] > 128).any() or (A[:3, :, 3] > 128).any())]
    print('bỏ khung chạm mép: ' + (', '.join(names[i] for i in range(len(arrs)) if i not in ok) or 'không có'), flush=True)
    arrs = [arrs[i] for i in ok]; names = [names[i] for i in ok]
# (5) hộp bao chung
x0 = y0 = 10**9; x1 = y1 = 0
for A in arrs:
    ys, xs = np.where(A[..., 3] > 10)
    if len(xs): x0, x1, y0, y1 = min(x0, xs.min()), max(x1, xs.max()), min(y0, ys.min()), max(y1, ys.max())
pad = 4; x0, y0 = max(0, x0 - pad), max(0, y0 - pad); x1, y1 = x1 + pad + 1, y1 + 1   # đáy = chân thấp nhất (không chừa)
print(f'hộp chung {x1-x0}x{y1-y0}', flush=True)

# (6) phóng + làm nét + xuất
os.makedirs(a.out, exist_ok=True)
outs = []
for i, A in enumerate(arrs, 1):
    im = Image.fromarray(A).crop((x0, y0, x1, y1))
    if a.esrgan and os.path.exists(a.esrgan):   # phóng AI ×4 (RGB + kênh alpha phóng thường)
        pi, po = os.path.join(tmp, 'e_in.png'), os.path.join(tmp, 'e_out.png')
        im.convert('RGB').save(pi); subprocess.run([a.esrgan, '-i', pi, '-o', po, '-n', 'realesrgan-x4plus', '-s', '4'], check=True, capture_output=True)
        big = Image.open(po).convert('RGB'); al = im.getchannel('A').resize(big.size, Image.LANCZOS); big.putalpha(al); im = big
    k = a.h / im.height
    im = im.resize((max(1, round(im.width * k)), a.h), Image.LANCZOS)
    r, g, b, al = im.split()
    rgb = Image.merge('RGB', (r, g, b)).filter(ImageFilter.UnsharpMask(radius=1.4, percent=70, threshold=2))
    im = Image.merge('RGBA', (*rgb.split(), al))
    p = os.path.join(a.out, f'{a.name}_{i:02d}.webp'); im.save(p, quality=a.quality, method=6); outs.append(im)
open(os.path.join(a.out, f'{a.name}_map.txt'), 'w').write('\n'.join(f'{a.name}_{i:02d} ← {n}' for i, n in enumerate(names, 1)))   # khung xuất ← khung gốc trong đoạn cắt
print(f'✅ {len(outs)} khung → {a.out}/{a.name}_01.webp … ({outs[0].width}x{outs[0].height})')

# xem trước: bảng khung nền xám có số + gif chạy đúng nhịp --fps
cols = min(10, len(outs)); rows = (len(outs) + cols - 1) // cols; tw = 160; th = round(tw * outs[0].height / outs[0].width)
sheet = Image.new('RGB', (cols * tw, rows * th), (90, 90, 100))
for i, im in enumerate(outs):
    t = im.resize((tw, th)); sheet.paste(t, ((i % cols) * tw, (i // cols) * th), t)
sheet.save(os.path.join(tmp, 'sheet.png'))
gif = [Image.alpha_composite(Image.new('RGBA', im.size, (90, 90, 100, 255)), im).convert('P', palette=Image.ADAPTIVE) for im in outs]
gif[0].save(os.path.join(tmp, 'preview.gif'), save_all=True, append_images=gif[1:], duration=round(1000 / a.fps), loop=0)
print(f'🖼️ {tmp}/sheet.png · {tmp}/preview.gif')
