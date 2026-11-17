#!/usr/bin/env python3
# 🎨 TÔ LẠI 1 BỘ PHẬN của ảnh meme (tay haki, giáp thép, tay vàng, đổi màu…) — giữ khối cơ của ảnh gốc, kiểu cel-shading anime.
# Mac (python3 + numpy + Pillow + scipy). Ví dụ đã dùng: Doge haki vũ trang (assets/img/doge/DG_HAKI_*).
#
# 1) SOI NẾP CƠ để khoanh đúng ranh giới bộ phận (đừng đoán bằng mắt trên ảnh gốc — nếp vai/ngực rất mờ):
#    python3 tools/part-paint.py --img assets/avatars/doge/rageAvatarUrl.webp --crease <scratchpad>/c.png [--box 0,130,387,440]
#    → ảnh lọc thông cao (nếp cơ hiện rõ) phóng ×2 + lưới toạ độ ẢNH GỐC (mỗi 10px, vạch xanh mỗi 50px). Read rồi chép toạ độ.
# 2) TÔ:
#    python3 tools/part-paint.py --img <ảnh> --part '[[[x,y],...],[[x,y],...]]' --style haki --out out.webp --check <scratchpad>/chk.png
#    --part : danh sách ĐA GIÁC (toạ độ ảnh gốc) — chỉ phần đa giác ∩ hình nhân vật được tô; mép ngoài đa giác được thò ra ngoài hình thoải mái,
#             chỉ đường cắt TRONG người (vd tay/ngực) là quan trọng → lấy từ bước 1. Có thể dùng --part-file x.json.
#    --style: haki (đen bóng, mảng bóng xám xanh viền sắc, vệt sáng dọc mép — kiểu tay haki Luffy) · steel (thép bạc) · gold (vàng kim)
#             · tint:#ff3355:0.7 (đổi màu giữ khối, độ đậm 0–1)
#    --body-tint '#ff7a3a:0.3' : phần NGOÀI bộ phận ửng màu (vd Gear 2 ửng cam đỏ) · --no-part : chỉ ửng thân, không tô bộ phận (ảnh "trước khi lan")
#    --scale 2 (mặc định): phóng ×2 trước khi tô (Lanczos có xử lý viền trong suốt + làm nét nhẹ) → mép mịn, không lấm tấm khi vẽ to
#    --light -0.55,-0.65 : hướng đèn (x,y ảnh; mặc định trên-trái)
#    --check: ảnh so trước/sau + vùng khoanh tô xanh → Read soát: CHỈ đúng bộ phận, không lấn ngực/cổ (anh từng chê "tay thôi sao lên cả ngực")
import argparse, json, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage

ap = argparse.ArgumentParser()
ap.add_argument('--img', required=True); ap.add_argument('--out'); ap.add_argument('--check'); ap.add_argument('--crease'); ap.add_argument('--box')
ap.add_argument('--part'); ap.add_argument('--part-file'); ap.add_argument('--style', default='haki'); ap.add_argument('--body-tint')
ap.add_argument('--no-part', action='store_true'); ap.add_argument('--scale', type=float, default=2); ap.add_argument('--light', default='-0.55,-0.65')
A = ap.parse_args()
src = Image.open(A.img).convert('RGBA')

# ───────── 1) soi nếp cơ ─────────
if A.crease:
    L = np.asarray(src.convert('L')).astype(float); al = np.asarray(src)[..., 3]
    B = np.asarray(Image.fromarray(L.astype(np.uint8)).filter(ImageFilter.GaussianBlur(6))).astype(float)
    h = np.clip(128 + (L - B) * 6, 0, 255); h[al < 100] = 40
    box = tuple(int(v) for v in A.box.split(',')) if A.box else (0, 0, src.width, src.height)
    c = Image.fromarray(h.astype(np.uint8)).convert('RGB').crop(box); k = 2; c = c.resize((c.width * k, c.height * k)); d = ImageDraw.Draw(c)
    for x in range(box[0] - box[0] % 10, box[2], 10):
        X = (x - box[0]) * k; d.line([(X, 0), (X, c.height)], fill=(255, 0, 0) if x % 50 else (0, 200, 255), width=1)
        if x % 50 == 0: d.text((X + 2, 2), str(x), fill=(255, 255, 0))
    for y in range(box[1] - box[1] % 10, box[3], 10):
        Y = (y - box[1]) * k; d.line([(0, Y), (c.width, Y)], fill=(255, 0, 0) if y % 50 else (0, 200, 255), width=1)
        if y % 50 == 0: d.text((2, Y + 2), str(y), fill=(255, 255, 0))
    c.save(A.crease); print('✅ ảnh soi nếp:', A.crease)
    if not A.out: sys.exit(0)

UPS = A.scale
def upscale(im):
    if UPS == 1: return im
    a = np.asarray(im).astype(float) / 255.; pm = a[..., :3] * a[..., 3:4]; W, H = im.size; NW, NH = int(W * UPS), int(H * UPS)
    big = lambda arr: np.asarray(Image.fromarray((arr * 255).clip(0, 255).astype(np.uint8)).resize((NW, NH), Image.LANCZOS)).astype(float) / 255.
    P = big(pm); Al = np.clip((big(a[..., 3]) - 0.08) / 0.84, 0, 1)
    rgb = np.where(Al[..., None] > 1e-3, P / np.maximum(Al[..., None], 1e-3), 0).clip(0, 1)
    o = Image.fromarray(np.dstack([rgb * 255, Al * 255]).astype(np.uint8)); r = o.convert('RGB').filter(ImageFilter.UnsharpMask(radius=2, percent=60, threshold=2))
    return Image.merge('RGBA', (*r.split(), o.split()[3]))

polys = json.load(open(A.part_file)) if A.part_file else (json.loads(A.part) if A.part else [])
im = upscale(src); x = np.asarray(im).astype(float); rgb = x[..., :3] / 255.; alpha = x[..., 3] / 255.
m = Image.new('L', im.size, 0); dr = ImageDraw.Draw(m)
for p in polys: dr.polygon([(px * UPS, py * UPS) for px, py in p], fill=255)
m = np.asarray(m.filter(ImageFilter.GaussianBlur(1.3 * UPS))) / 255.
if A.no_part: m = m * 0
ss = lambda e0, e1, v: np.clip((v - e0) / (e1 - e0), 0, 1)
hexc = lambda h: np.array([int(h[i:i + 2], 16) for i in (1, 3, 5)]) / 255.

# ───────── 2) tô bộ phận ─────────
L = np.asarray(im.convert('L').filter(ImageFilter.GaussianBlur(1.6 * UPS))).astype(float) / 255.   # làm mượt lông → giữ khối cơ
sel = (m > 0.5) & (alpha > 0.5); lo, hi = np.percentile(L[sel], [4, 97]) if sel.any() else (0.4, 0.9)
Ln = np.clip((L - lo) / max(1e-3, hi - lo), 0, 1)
style = A.style
if style.startswith('tint:'):
    _, c, k = style.split(':'); col = hexc(c) * (0.35 + 0.9 * Ln[..., None]); col = np.clip(rgb * (1 - float(k)) + col * float(k), 0, 1)
else:
    PAL = {'haki': ([9, 9, 13], [30, 33, 44], [150, 160, 182], [92, 99, 118]),       # nền · tông 2 · mảng bóng · dải viền
           'steel': ([70, 76, 88], [120, 128, 142], [235, 240, 248], [170, 178, 192]),
           'gold': ([120, 72, 10], [190, 128, 28], [255, 240, 170], [230, 180, 60])}[style]
    base, tone2, shine, rimc = [np.array(v) / 255. for v in PAL]
    # coi độ sáng như bề mặt nổi khối → pháp tuyến → mảng bóng Blinn-Phong cắt ngưỡng (cel) + vệt sáng song song mép phía đón đèn
    Hh = np.asarray(Image.fromarray((Ln * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(6.5 * UPS))).astype(float) / 255.
    gy, gx = np.gradient(Hh); k = 16.0 * UPS; nx, ny, nz = -gx * k, -gy * k, np.ones_like(Hh); nl = np.sqrt(nx * nx + ny * ny + nz * nz); nx /= nl; ny /= nl; nz /= nl
    lx, ly = [float(v) for v in A.light.split(',')]
    def unit(v): v = np.array(v, float); return v / np.linalg.norm(v)
    Lt = unit([lx, ly, 0.55]); Hv = unit(Lt + np.array([0, 0, 1.])); Lt2 = unit([-lx * 1.2, 0.2, 0.45]); H2 = unit(Lt2 + np.array([0, 0, 1.]))
    ndl = np.clip(nx * Lt[0] + ny * Lt[1] + nz * Lt[2], 0, 1); spec = np.clip(nx * Hv[0] + ny * Hv[1] + nz * Hv[2], 0, 1) ** 22
    spec2 = np.clip(nx * H2[0] + ny * H2[1] + nz * H2[2], 0, 1) ** 22
    def blob(v, th):
        b = Image.fromarray(((v > th) * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(9)).filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(1.6))
        return np.asarray(b).astype(float) / 255.
    hs = np.maximum(blob(spec, 0.62), blob(spec2, 0.62) * 0.75)
    part = (m > 0.5) & (alpha > 0.5); D = ndimage.distance_transform_edt(alpha > 0.5); Ds = ndimage.gaussian_filter(D, 2.0 * UPS)
    gy2, gx2 = np.gradient(Ds); gl = np.sqrt(gx2 ** 2 + gy2 ** 2) + 1e-6; lit = (-gx2 / gl) * lx + (-gy2 / gl) * ly
    W0 = max(2.5, part.shape[0] * 0.008); band = part & (D > W0) & (D < W0 * 2.6) & (lit > 0.45)
    hs = np.maximum(hs, np.asarray(Image.fromarray((band * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(5)).filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(1.6))).astype(float) / 255.)
    edge = np.clip(alpha - np.asarray(Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(9))).astype(float) / 255., 0, 1)
    col = base + (tone2 - base) * ss(0.69, 0.75, ndl)[..., None]
    col = col + (rimc - col) * (ss(0.25, 0.4, edge) * 0.9)[..., None]
    col = np.clip(col + (shine - col) * hs[..., None], 0, 1)
body = rgb
if A.body_tint:
    c, k = A.body_tint.split(':'); tc = hexc(c); k = float(k)
    warm = np.clip(rgb * (0.55 + 0.45 * tc) + tc * 0.12, 0, 1); body = rgb * (1 - k) + warm * k
out = body * (1 - m[..., None]) + col * m[..., None]
res = Image.fromarray(np.dstack([out * 255, x[..., 3]]).clip(0, 255).astype(np.uint8))
if A.out: res.save(A.out, quality=90, method=6); print('✅', A.out, res.size)
if A.check:
    chk = rgb.copy(); chk = chk * (1 - m[..., None] * 0.7) + np.array([0.15, 0.25, 1.0]) * m[..., None] * 0.7
    ov = Image.fromarray(np.dstack([chk * 255, x[..., 3]]).clip(0, 255).astype(np.uint8))
    W, H = res.size; S = Image.new('RGBA', (W * 3 + 20, H), (70, 70, 95, 255))
    for i, t in enumerate([im, ov, res]): S.alpha_composite(t, (i * (W + 10), 0))
    S.convert('RGB').save(A.check); print('🔎 so sánh (gốc · vùng khoanh · kết quả):', A.check)
