# 💥 Mô phỏng VỤ NỔ THẬT bằng Blender (Mantaflow lửa + khói) → tô CEL anime (3–4 tông + viền mực) → 1 tấm sprite sheet cho cine-kit.
# Chạy (Windows):  "D:/tools/blender-5.2.4-windows-x64/blender.exe" -b -P tools/blender/boom_sim.py -- --out <thư mục> [--frames 90] [--res 128] [--px 384] [--name boom_sim]
# Mac:             /Applications/Blender.app/Contents/MacOS/Blender -b -P tools/blender/boom_sim.py -- --out …
# Vật lý (Mantaflow tự giải): quả cầu khí cực nóng PHỒNG RẤT NHANH 0.2s đầu (cầu lửa) rồi tắt nguồn → khí nóng nổi (beta) cuộn xoáy thành NẤM,
#   khí đập đất toả ra chân, lửa nguội dần thành khói, khói tan. KHÔNG render Cycles (nhiễu): đọc thẳng lưới 3D (OpenVDB) → chiếu trực giao + đổ bóng 3D → tô cel.
# Ra: <out>/<name>.png (sheet cols×rows, ô px×px vuông = miền SIZE×SIZE m nhìn chính diện, đáy ô = mặt đất, tâm nổ giữa) + <out>/<name>.json
# Tuỳ chọn: --skip-bake (đã bake, chỉ tô lại)  --blast 3.2 (bán kính cầu lửa m)  --beta 3.2 (độ nổi)  --pal fire|cyan|purple
import bpy, sys, os, json, math, glob
import numpy as np

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
def opt(k, d):
    return type(d)(argv[argv.index(k) + 1]) if k in argv else d
OUT = os.path.abspath(opt('--out', os.path.join(os.getcwd(), '_boom')))
N = opt('--frames', 90); RES = opt('--res', 128); PX = opt('--px', 384); NAME = opt('--name', 'boom_sim')
BLAST = opt('--blast', 3.2); BETA = opt('--beta', 3.2); PAL = opt('--pal', 'fire'); SIZE = 16.0
SKIP_BAKE = '--skip-bake' in argv
os.makedirs(OUT, exist_ok=True); CACHE = os.path.join(OUT, 'cache')

# ---------- cảnh + bake ----------
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene; sc.frame_start, sc.frame_end = 1, N; sc.render.fps = 30
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, SIZE / 2)); dom = bpy.context.object; dom.name = 'Domain'; dom.scale = (SIZE, SIZE, SIZE)
bpy.ops.object.transform_apply(scale=True)
m = dom.modifiers.new('Fluid', 'FLUID'); m.fluid_type = 'DOMAIN'; ds = m.domain_settings
ds.domain_type = 'GAS'; ds.resolution_max = RES; ds.cache_directory = CACHE; ds.cache_type = 'ALL'
ds.cache_frame_start = 1; ds.cache_frame_end = N; ds.use_adaptive_domain = False
ds.alpha = 0.4; ds.beta = BETA; ds.vorticity = 0.3
ds.use_dissolve_smoke = True; ds.dissolve_speed = 70; ds.use_dissolve_smoke_log = True
ds.burning_rate = 0.55; ds.flame_smoke = 1.8; ds.flame_vorticity = 0.5; ds.flame_ignition = 1.25; ds.flame_max_temp = 3.0
ds.use_noise = False
try: ds.cache_data_format = 'OPENVDB'
except Exception: pass

# nguồn nổ: cầu sát đất, PHỒNG nhanh (giảm tốc dần như cầu lửa thật), phụt ra ngoài, rồi tắt
bpy.ops.mesh.primitive_uv_sphere_add(radius=1, location=(0, 0, 0.3)); src = bpy.context.object; src.name = 'Blast'
fm = src.modifiers.new('Fluid', 'FLUID'); fm.fluid_type = 'FLOW'; fs = fm.flow_settings
fs.flow_type = 'BOTH'; fs.flow_behavior = 'INFLOW'; fs.flow_source = 'MESH'; fs.surface_distance = 0.6; fs.use_initial_velocity = True
KEYS = {1: (0.35, 2.0, 3.0, 2.6, 30.0), 3: (0.62, 2.0, 3.0, 2.6, 22.0), 5: (0.85, 1.8, 3.0, 2.4, 12.0), 6: (0.92, 1.6, 3.0, 2.2, 8.0), 7: (0.95, 0.0, 0.0, 0.0, 0.0)}
for f, (rr, dens, temp, fuel, vel) in KEYS.items():
    s = BLAST * rr; src.scale = (s, s, s * 0.85)
    fs.density, fs.temperature, fs.fuel_amount, fs.velocity_normal = dens, temp, fuel, vel
    for p in ('density', 'temperature', 'fuel_amount', 'velocity_normal'): fs.keyframe_insert(p, frame=f)
    src.keyframe_insert('scale', frame=f)

if not SKIP_BAKE:
    bpy.context.view_layer.objects.active = dom; dom.select_set(True)
    with bpy.context.temp_override(object=dom, active_object=dom, selected_objects=[dom]):
        bpy.ops.fluid.bake_all()
    print('BAKE xong', flush=True)

# ---------- đọc lưới 3D ----------
import openvdb
def grids(f):
    p = glob.glob(os.path.join(CACHE, 'data', 'fluid_data_%04d.vdb' % f))
    if not p: return None
    out = {}
    for name in ('density', 'flame'):
        g = openvdb.read(p[0], name); a = np.zeros((RES, RES, RES), np.float32)
        try: g.copyToArray(a, ijk=(0, 0, 0))
        except Exception as e: print('copy lỗi', name, e)
        out[name] = a
    return out

def up(a, n):   # phóng song tuyến 2D (ảnh nhỏ → n×n), mượt để ngưỡng cel ra mép trơn
    h, w = a.shape; ys = np.linspace(0, h - 1, n); xs = np.linspace(0, w - 1, n)
    y0 = np.floor(ys).astype(int); x0 = np.floor(xs).astype(int); y1 = np.minimum(y0 + 1, h - 1); x1 = np.minimum(x0 + 1, w - 1); fy = (ys - y0)[:, None]; fx = (xs - x0)[None, :]
    return (a[y0][:, x0] * (1 - fx) + a[y0][:, x1] * fx) * (1 - fy) + (a[y1][:, x0] * (1 - fx) + a[y1][:, x1] * fx) * fy
def sh(a, dy, dx): return np.roll(np.roll(a, dy, 0), dx, 1)
def blur(a, k):
    for _ in range(k): a = (a * 2 + sh(a, 1, 0) + sh(a, -1, 0) + sh(a, 0, 1) + sh(a, 0, -1)) / 6
    return a

KD = 6.0 * RES / 128.0 / 1.0   # độ đục mỗi ô
proj = []
for f in range(1, N + 1):
    G = grids(f)
    if G is None: proj.append(None); continue
    d = np.clip(G['density'], 0, None); fl = np.clip(G['flame'], 0, None)   # trục (x, y, z); máy nhìn từ -y
    sig = d * KD / RES * 16
    # ánh sáng từ TRÊN + hơi TRÁI-TRƯỚC: truyền qua = exp(-tích luỹ mật độ phía nguồn sáng)
    cz = np.cumsum(sig[:, :, ::-1], axis=2)[:, :, ::-1] - sig          # từ đỉnh xuống
    cx = np.cumsum(sig, axis=0) - sig                                   # từ trái sang
    cy = np.cumsum(sig, axis=1) - sig                                   # từ trước ra sau
    Tl = np.exp(-(cz * 0.9 + cx * 0.45 + cy * 0.25))
    Tv = np.exp(-(np.cumsum(sig, axis=1) - sig))                        # còn thấy được từ máy
    wv = Tv * (1 - np.exp(-sig))
    A = wv.sum(1); S = (wv * Tl).sum(1) / np.maximum(A, 1e-6); Fp = (Tv * fl).sum(1) / RES * 16
    proj.append((A.T[::-1], S.T[::-1], Fp.T[::-1]))                     # → ảnh: hàng = z (trên xuống), cột = x
Fn = max(1e-6, float(np.percentile(np.concatenate([p[2][p[2] > 1e-3] for p in proj if p is not None] or [np.ones(1)]), 96)))

C = lambda *c: np.array(c, np.float32)
SMOKE = [C(.27, .22, .22), C(.47, .41, .39), C(.70, .64, .57), C(.93, .88, .79)]
FIREP = {'fire': [C(.66, .16, .08), C(.95, .44, .10), C(1, .80, .24), C(1, .98, .88)],
         'cyan': [C(.16, .30, .70), C(.16, .66, 1), C(.56, .96, 1), C(1, 1, 1)],
         'purple': [C(.30, .10, .60), C(.62, .30, 1), C(.88, .70, 1), C(1, 1, 1)]}[PAL]
INK = C(.10, .06, .07)
cells = []
for p in proj:
    if p is None: cells.append(np.zeros((PX, PX, 4), np.float32)); continue
    A = blur(up(p[0], PX), 2); S = blur(up(p[1], PX), 3); Fl = blur(up(p[2] / Fn, PX), 2)
    alpha = np.clip((A - 0.10) / 0.06, 0, 1)
    band = np.where(S > 0.62, 3, np.where(S > 0.36, 2, np.where(S > 0.16, 1, 0)))
    col = np.zeros((PX, PX, 3), np.float32)
    for i in range(4): col = np.where((band == i)[..., None], SMOKE[i], col)
    fb = np.where(Fl > 0.60, 3, np.where(Fl > 0.32, 2, np.where(Fl > 0.14, 1, np.where(Fl > 0.05, 0, -1))))
    fb = np.where(alpha > 0.3, fb, -1)
    for i in range(4): col = np.where((fb == i)[..., None], FIREP[i], col)
    lab = np.where(alpha > 0.5, np.where(fb >= 0, 10 + fb, band), -1)
    edge = np.zeros(lab.shape, bool)
    for dy, dx in ((1, 0), (0, 1), (-1, 0), (0, -1)):
        n = sh(lab, dy, dx)
        edge |= (lab >= 0) & (n < 0)                                     # mép ngoài
        edge |= (lab >= 0) & (lab < 10) & (n >= 0) & (n < 10) & (lab < n) & (lab <= 1)   # ranh tông khói tối
    if PX >= 512: edge |= sh(edge, 1, 0)
    col = np.where(edge[..., None], INK, col); alpha = np.where(edge, 1.0, alpha)
    cells.append(np.concatenate([col, alpha[..., None]], -1))

cols = math.ceil(math.sqrt(N)); rows = math.ceil(N / cols)
sheet = np.zeros((rows * PX, cols * PX, 4), np.float32)
for i, c in enumerate(cells):
    r0, c0 = divmod(i, cols); sheet[r0 * PX:(r0 + 1) * PX, c0 * PX:(c0 + 1) * PX] = c
im = bpy.data.images.new(NAME, cols * PX, rows * PX, alpha=True)
im.pixels.foreach_set(np.ascontiguousarray(sheet[::-1]).ravel())
im.filepath_raw = os.path.join(OUT, NAME + '.png'); im.file_format = 'PNG'; im.save()
json.dump({'frames': N, 'cols': cols, 'px': PX, 'fps': 30, 'ground': [0.5, 1.0], 'sizeM': SIZE, 'blastM': BLAST}, open(os.path.join(OUT, NAME + '.json'), 'w'))
print('XONG', os.path.join(OUT, NAME + '.png'), flush=True)
