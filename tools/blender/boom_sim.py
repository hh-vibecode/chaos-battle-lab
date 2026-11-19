# 💥 Mô phỏng VỤ NỔ THẬT bằng Blender (Mantaflow lửa + khói) → tô CEL anime (3–4 tông + viền mực) → 1 tấm sprite sheet cho cine-kit.
# Chạy (Windows):  "D:/tools/blender-5.2.4-windows-x64/blender.exe" -b -P tools/blender/boom_sim.py -- --out <thư mục> [--frames 90] [--res 128] [--px 384] [--name boom_sim]
# Mac:             /Applications/Blender.app/Contents/MacOS/Blender -b -P tools/blender/boom_sim.py -- --out …
# Vật lý (Mantaflow tự giải): quả cầu khí cực nóng PHỒNG RẤT NHANH 0.2s đầu (cầu lửa) rồi tắt nguồn → khí nóng nổi (beta) cuộn xoáy thành NẤM,
#   khí đập đất toả ra chân, lửa nguội dần thành khói, khói tan. KHÔNG render Cycles (nhiễu): đọc thẳng lưới 3D (OpenVDB) → chiếu trực giao + đổ bóng 3D → tô cel.
# Ra: <out>/<name>.png (sheet cols×rows, ô px×ph = miền DX×DZ m nhìn chính diện, đáy ô = mặt đất, tâm nổ giữa) + <out>/<name>.json
# Tuỳ chọn: --skip-bake (đã bake, chỉ tô lại)  --blast 3.2 (bán kính cầu lửa m)  --beta 5.5 (độ nổi)  --timescale 1.7 (vật lý chạy nhanh hơn khung)  --pal fire|cyan|purple
import bpy, sys, os, json, math, glob
import numpy as np

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
def opt(k, d):
    return type(d)(argv[argv.index(k) + 1]) if k in argv else d
OUT = os.path.abspath(opt('--out', os.path.join(os.getcwd(), '_boom')))
N = opt('--frames', 90); RES = opt('--res', 128); PX = opt('--px', 384); NAME = opt('--name', 'boom_sim')
BLAST = opt('--blast', 3.2); BETA = opt('--beta', 5.5); TS = opt('--timescale', 1.7); PAL = opt('--pal', 'fire')
DX = opt('--width', 28.0); DZ = opt('--height', 20.0)          # miền khí rộng DX×DX m, cao DZ m (rộng để bụi chân nổ lan ra)
SURGE = opt('--surge', 12.0)                                     # bán kính vòng bụi sóng chấn đi tới (m), 0 = tắt
NZ = int(round(RES * DZ / DX))
SKIP_BAKE = '--skip-bake' in argv
STEP = opt('--step', 2)   # giữ 1 khung / STEP (2 = 'vẽ trên 2' 15 hình/giây như anime) → sheet nhẹ, ô to nét hơn
os.makedirs(OUT, exist_ok=True); CACHE = os.path.join(OUT, 'cache')

# ---------- cảnh + bake ----------
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene; sc.frame_start, sc.frame_end = 1, N; sc.render.fps = 30
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, DZ / 2)); dom = bpy.context.object; dom.name = 'Domain'; dom.scale = (DX, DX, DZ)
bpy.ops.object.transform_apply(scale=True)
m = dom.modifiers.new('Fluid', 'FLUID'); m.fluid_type = 'DOMAIN'; ds = m.domain_settings
ds.domain_type = 'GAS'; ds.resolution_max = RES; ds.cache_directory = CACHE; ds.cache_type = 'ALL'
ds.cache_frame_start = 1; ds.cache_frame_end = N; ds.use_adaptive_domain = False
ds.alpha = -0.15;   # bụi nguội hơi nặng (bám đất), khí nóng vẫn bốc nhờ beta
ds.beta = BETA; ds.vorticity = 0.22; ds.time_scale = TS
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

# 🌊 SÓNG CHẤN SÁT ĐẤT: vòng khói-bụi (vỏ trụ thấp không nắp) NỞ theo r ∝ t^0.45 (nhanh rồi chậm, như mặt sóng chấn), cuốn bụi đất ra ngoài.
#   Vận tốc bụi = vận tốc vỏ đang nở (velocity_factor) + đẩy ra ngoài → tường bụi cuộn sát đất (base surge). Chỉ khói, không lửa, không nóng.
if SURGE > 0:
    bpy.ops.mesh.primitive_cylinder_add(vertices=96, radius=1, depth=0.7, end_fill_type='NOTHING', location=(0, 0, 0.35)); ring = bpy.context.object; ring.name = 'Surge'
    rm = ring.modifiers.new('Fluid', 'FLUID'); rm.fluid_type = 'FLOW'; rs = rm.flow_settings
    rs.flow_type = 'SMOKE'; rs.flow_behavior = 'INFLOW'; rs.flow_source = 'MESH'; rs.surface_distance = 0.35
    rs.use_initial_velocity = True; rs.velocity_factor = 1.0; rs.temperature = 0.0
    F0, F1 = 2, 30; r0 = BLAST * 0.9
    for f in list(range(F0, F1 + 1, 2)) + [F1 + 1]:
        u = min(1.0, (f - F0) / (F1 - F0)); rr = r0 + (SURGE - r0) * u ** 0.45
        ring.scale = (rr, rr, 1.0); ring.keyframe_insert('scale', frame=f)
        rs.density = 0.0 if f > F1 else 1.6 * (1 - 0.65 * u); rs.velocity_normal = 0.0 if f > F1 else 6.0 * (1 - u) + 1.0
        rs.keyframe_insert('density', frame=f); rs.keyframe_insert('velocity_normal', frame=f)
    rs.density = 0.0; rs.keyframe_insert('density', frame=1)

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
        g = openvdb.read(p[0], name); a = np.zeros((RES, RES, NZ + 2), np.float32)
        try: g.copyToArray(a, ijk=(0, 0, 0))
        except Exception as e: print('copy lỗi', name, e)
        out[name] = a[:, :, :NZ]
    return out

def up(a, n, m=None):   # phóng song tuyến 2D (ảnh nhỏ → n×n), mượt để ngưỡng cel ra mép trơn
    m = m or n; h, w = a.shape; ys = np.linspace(0, h - 1, m); xs = np.linspace(0, w - 1, n)
    y0 = np.floor(ys).astype(int); x0 = np.floor(xs).astype(int); y1 = np.minimum(y0 + 1, h - 1); x1 = np.minimum(x0 + 1, w - 1); fy = (ys - y0)[:, None]; fx = (xs - x0)[None, :]
    return (a[y0][:, x0] * (1 - fx) + a[y0][:, x1] * fx) * (1 - fy) + (a[y1][:, x0] * (1 - fx) + a[y1][:, x1] * fx) * fy
def sh(a, dy, dx): return np.roll(np.roll(a, dy, 0), dx, 1)
def blur(a, k):
    for _ in range(k): a = (a * 2 + sh(a, 1, 0) + sh(a, -1, 0) + sh(a, 0, 1) + sh(a, 0, -1)) / 6
    return a

PH = int(round(PX * DZ / DX))
KD = 6.0 * RES / 128.0 / 1.0   # độ đục mỗi ô
proj = []
for f in range(1, N + 1, STEP):
    G = grids(f)
    if G is None: proj.append(None); continue
    d = np.clip(G['density'], 0, None); fl = np.clip(G['flame'], 0, None)   # trục (x, y, z); máy nhìn từ -y
    sig = d * KD / RES * DX
    # ánh sáng từ TRÊN + hơi TRÁI-TRƯỚC: truyền qua = exp(-tích luỹ mật độ phía nguồn sáng)
    cz = np.cumsum(sig[:, :, ::-1], axis=2)[:, :, ::-1] - sig          # từ đỉnh xuống
    cx = np.cumsum(sig, axis=0) - sig                                   # từ trái sang
    cy = np.cumsum(sig, axis=1) - sig                                   # từ trước ra sau
    Tl = 0.3 + 0.7 * np.exp(-0.28 * (cz * 0.9 + cx * 0.45 + cy * 0.25))   # có ánh sáng môi trường, bóng không đen kịt
    Tv = np.exp(-(np.cumsum(sig, axis=1) - sig))                        # còn thấy được từ máy
    wv = Tv * (1 - np.exp(-sig))
    A = wv.sum(1); S = (wv * Tl).sum(1) / np.maximum(A, 1e-6); Fp = (Tv * fl).sum(1) / RES * DX
    proj.append((A.T[::-1], S.T[::-1], Fp.T[::-1]))                     # → ảnh: hàng = z (trên xuống), cột = x
SV = np.concatenate([p[1][p[0] > 0.3] for p in proj if p is not None] or [np.ones(1)]); Q = np.percentile(SV, [18, 50, 80]) if SV.size > 10 else [0.16, 0.36, 0.62]
print('ngưỡng tông khói', [round(float(q), 3) for q in Q], flush=True)
Fn = max(1e-6, float(np.percentile(np.concatenate([p[2][p[2] > 1e-3] for p in proj if p is not None] or [np.ones(1)]), 96)))

C = lambda *c: np.array(c, np.float32)
SMOKE = [C(.24, .19, .20), C(.45, .38, .36), C(.70, .62, .55), C(.94, .88, .78)]
WARM = [C(.42, .16, .12), C(.74, .34, .17), C(.95, .60, .30), C(1.0, .86, .60)]   # khói ĐƯỢC LỬA HẮT SÁNG (gần lửa) — cel 2 vùng, không chuyển mờ
FIREP = {'fire': [C(.66, .16, .08), C(.95, .44, .10), C(1, .80, .24), C(1, .98, .88)],
         'cyan': [C(.16, .30, .70), C(.16, .66, 1), C(.56, .96, 1), C(1, 1, 1)],
         'purple': [C(.30, .10, .60), C(.62, .30, 1), C(.88, .70, 1), C(1, 1, 1)]}[PAL]
INK = C(.10, .06, .07)
cells = []
for p in proj:
    if p is None: cells.append(np.zeros((PH, PX, 4), np.float32)); continue
    A = blur(up(p[0], PX, PH), 2); S = blur(up(p[1], PX, PH), 3); Fl = blur(up(p[2] / Fn, PX, PH), 2)
    alpha = np.clip((A - 0.10) / 0.06, 0, 1)
    band = np.where(S > Q[2], 3, np.where(S > Q[1], 2, np.where(S > Q[0], 1, 0)))
    col = np.zeros((PH, PX, 3), np.float32)
    for i in range(4): col = np.where((band == i)[..., None], SMOKE[i], col)
    glow = blur(Fl, 10 if PX >= 600 else 6) > 0.06
    for i in range(4): col = np.where(((band == i) & glow)[..., None], WARM[i], col)
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

NF = len(cells); cols = math.ceil(math.sqrt(NF * PH / PX)); rows = math.ceil(NF / cols)
sheet = np.zeros((rows * PH, cols * PX, 4), np.float32)
for i, c in enumerate(cells):
    r0, c0 = divmod(i, cols); sheet[r0 * PH:(r0 + 1) * PH, c0 * PX:(c0 + 1) * PX] = c
im = bpy.data.images.new(NAME, cols * PX, rows * PH, alpha=True)
im.pixels.foreach_set(np.ascontiguousarray(sheet[::-1]).ravel())
im.filepath_raw = os.path.join(OUT, NAME + '.png'); im.file_format = 'PNG'; im.save()
json.dump({'frames': NF, 'cols': cols, 'px': PX, 'ph': PH, 'fps': 30 / STEP, 'ground': [0.5, 1.0], 'widthM': DX, 'heightM': DZ, 'surgeM': SURGE, 'blastM': BLAST}, open(os.path.join(OUT, NAME + '.json'), 'w'))
print('XONG', os.path.join(OUT, NAME + '.png'), flush=True)
