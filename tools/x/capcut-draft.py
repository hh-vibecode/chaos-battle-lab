#!/usr/bin/env python3
# 🎬→✂️ DỰNG DỰ ÁN CAPCUT TỪ PHIM (anh 23/11: "tiếng chia lẻ ra để t cut đi cái k phù hợp"). Chỉ Mac (CapCut desktop, bản 9.x).
#   1) xuất video KHÔNG tiếng:  node tools/render-cine.js <phim> out/X.mp4 --wide --4k --cache --chunk 5 --no-audio
#   2) lấy lịch tiếng:          node tools/render-cine.js <phim> out/_i.mp4 --wide --info-json out/X-lich-tieng.json
#   3) dựng dự án:              python3 tools/x/capcut-draft.py --video out/X.mp4 --info out/X-lich-tieng.json --name "Final Part 1 - tieng le"
# Ra: 1 dự án mới trong CapCut — track video + track "Tiếng nền" + các track SFX; MỖI TIẾNG 1 CLIP RIÊNG đúng giây, đặt tên theo
#   hành động (nhãn sfx trong phim) + key, âm lượng đã chuẩn hoá y như render-cine trộn (−14 LUFS × vol). Mờ vào / ra của tiếng nền không chép sang.
# ⚠️ CapCut PHẢI TẮT lúc chạy (nó ghi đè root_meta_info.json khi thoát). Không đụng dự án cũ: chép dự án mẫu có sẵn track tiếng (--template,
#   mặc định tự tìm) sang thư mục MỚI rồi viết lại nội dung. root_meta_info.json được sao lưu cạnh nó (.bak-capcut-draft) trước khi sửa.
import json, os, sys, shutil, subprocess, uuid, copy, time, argparse, glob

ROOT = os.path.expanduser('~/Movies/CapCut/User Data/Projects/com.lveditor.draft')
REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
ap = argparse.ArgumentParser()
ap.add_argument('--video', required=True); ap.add_argument('--info', required=True); ap.add_argument('--name', required=True)
ap.add_argument('--template', default=None); ap.add_argument('--max-gain', type=float, default=3.16)   # CapCut cho tối đa ~+10 dB
A = ap.parse_args()

if subprocess.run(['pgrep', '-x', 'CapCut'], capture_output=True).returncode == 0:
    sys.exit('❌ CapCut đang mở — tắt CapCut rồi chạy lại')
U = lambda: str(uuid.uuid4()).upper()
us = lambda s: int(round(s * 1_000_000))
def probe(p):
    o = json.loads(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration:stream=width,height,codec_type', '-of', 'json', p], capture_output=True, text=True).stdout)
    v = next((s for s in o.get('streams', []) if s.get('codec_type') == 'video'), {})
    return float(o['format']['duration']), v.get('width'), v.get('height')

# ── dự án mẫu: cần có 1 track video + ≥1 track audio ──
def has_av(d): T = [t['type'] for t in d['tracks']]; return 'video' in T and 'audio' in T and d['materials'].get('audios')
tpl = None
for f in ([os.path.join(ROOT, A.template, 'draft_info.json')] if A.template else sorted(glob.glob(os.path.join(ROOT, '*', 'draft_info.json')))):
    try: d = json.load(open(f))
    except Exception: continue
    if has_av(d) and glob.glob(os.path.join(os.path.dirname(f), 'Timelines', '*', 'draft_info.json')): tpl = os.path.dirname(f); break
if not tpl: sys.exit('❌ không tìm được dự án mẫu có track video + tiếng (--template <tên thư mục>)')
D = json.load(open(os.path.join(tpl, 'draft_info.json'))); M0 = D['materials']
byid = {}
for k, v in M0.items():
    if isinstance(v, list):
        for x in v:
            if isinstance(x, dict) and 'id' in x: byid[x['id']] = (k, x)
vtrack = next(t for t in D['tracks'] if t['type'] == 'video'); atrack = next(t for t in D['tracks'] if t['type'] == 'audio')
vseg0, aseg0 = vtrack['segments'][0], atrack['segments'][0]
vmat0 = byid[vseg0['material_id']][1]; amat0 = byid[aseg0['material_id']][1]

M = {k: ([] if isinstance(v, list) else v) for k, v in M0.items()}
def extras(seg0):   # nhân bản các vật liệu phụ (tốc độ, kênh tiếng, …) mà 1 đoạn cần, id mới
    refs = []
    for r in seg0['extra_material_refs']:
        if r not in byid: continue
        k, x = byid[r]; y = copy.deepcopy(x); y['id'] = U(); M[k].append(y); refs.append(y['id'])
    return refs

# ── video ──
vpath = os.path.abspath(A.video); vdur, vw, vh = probe(vpath)
vm = copy.deepcopy(vmat0); vm.update(id=U(), path=vpath, duration=us(vdur), width=vw, height=vh, has_audio=False, material_name=os.path.basename(vpath), local_material_id=str(uuid.uuid4()))
M['videos'].append(vm)
vs = copy.deepcopy(vseg0); vs.update(id=U(), material_id=vm['id'], source_timerange={'start': 0, 'duration': us(vdur)}, target_timerange={'start': 0, 'duration': us(vdur)}, extra_material_refs=extras(vseg0), volume=1.0)
vt = copy.deepcopy(vtrack); vt.update(id=U(), segments=[vs])

# ── tiếng ──
info = json.load(open(A.info)); fdur = {}
def adur(rel):
    p = os.path.join(REPO, rel)
    if p not in fdur: fdur[p] = probe(p)[0]
    return p, fdur[p]
def clip(rel, name, t, off, ln, gain):
    p, fd = adur(rel); ln = min(ln, fd - off)
    if ln <= 0.02: return None
    am = copy.deepcopy(amat0); am.update(id=U(), path=p, name=name, duration=us(fd), music_id=str(uuid.uuid4()), local_material_id=str(uuid.uuid4()), wave_points=[])
    M['audios'].append(am)
    s = copy.deepcopy(aseg0); g = max(0.0, min(A.max_gain, gain))
    s.update(id=U(), material_id=am['id'], source_timerange={'start': us(off), 'duration': us(ln)}, target_timerange={'start': us(max(0, t)), 'duration': us(ln)},
             extra_material_refs=extras(aseg0), volume=g, last_nonzero_volume=g if g > 0 else 1.0)
    return s
beds, sfx = [], []
for m in info['mus']:   # tiếng nền: file lặp thì nối nhiều đoạn
    t, off = m['ra'], m['off']; nm = os.path.basename(m['src']).rsplit('.', 1)[0]
    while t < m['rb'] - 0.02:
        p, fd = adur(m['src']); ln = min(m['rb'] - t, fd - off)
        c = clip(m['src'], f'[nền] {nm}', t, off, ln, m['gain'])
        if not c: break
        beds.append(c); t += ln; off = 0
        if not m['loop']: break
for i, s in enumerate(info['sfx']):
    p, fd = adur(s['file']); ln = s['d'] or fd
    c = clip(s['file'], f"{s['label'] or s['key']} ({s['key']})", s['t'], 0, ln, s['gain'])
    if c: sfx.append(c)
def lanes(segs, label):   # xếp vào ít track nhất, không chồng nhau trong 1 track
    segs.sort(key=lambda s: s['target_timerange']['start']); L = []
    for s in segs:
        a = s['target_timerange']['start']
        for ln in L:
            if ln[-1]['target_timerange']['start'] + ln[-1]['target_timerange']['duration'] <= a: ln.append(s); break
        else: L.append([s])
    out = []
    for i, ln in enumerate(L):
        t = copy.deepcopy(atrack); t.update(id=U(), segments=ln, name=f'{label} {i + 1}' if len(L) > 1 else label, is_default_name=False); out.append(t)
    return out
tracks = [vt] + lanes(beds, 'Tiếng nền') + lanes(sfx, 'SFX')

# ── ghi dự án mới ──
name = A.name; dst = os.path.join(ROOT, name)
if os.path.exists(dst): sys.exit(f'❌ đã có dự án "{name}" — đặt tên khác hoặc xoá trong CapCut')
shutil.copytree(tpl, dst)
for f in glob.glob(os.path.join(dst, '**', '*.tmp'), recursive=True) + glob.glob(os.path.join(dst, '**', '*.bak'), recursive=True): os.remove(f)
now = int(time.time() * 1_000_000)
D2 = copy.deepcopy(D); D2.update(materials=M, tracks=tracks, duration=us(vdur), fps=float(info.get('fps', 50)), name='', create_time=now // 1_000_000, update_time=now // 1_000_000,
    canvas_config={**D['canvas_config'], 'ratio': 'original', 'width': vw, 'height': vh})
for k, v in list(D2.get('keyframes', {}).items()):
    if isinstance(v, list): D2['keyframes'][k] = []
for k in ('time_marks', 'relationships', 'keyframe_graph_list'):
    if isinstance(D2.get(k), list): D2[k] = []
txt = json.dumps(D2, ensure_ascii=False, separators=(',', ':'))
for f in [os.path.join(dst, 'draft_info.json')] + glob.glob(os.path.join(dst, 'Timelines', '*', 'draft_info.json')): open(f, 'w', encoding='utf-8').write(txt)
pj = os.path.join(dst, 'Timelines', 'project.json')
if os.path.exists(pj): P = json.load(open(pj)); P['id'] = U(); json.dump(P, open(pj, 'w'), ensure_ascii=False, separators=(',', ':'))
did = U(); mi = os.path.join(dst, 'draft_meta_info.json'); Mi = json.load(open(mi))
Mi.update(draft_id=did, draft_name=name, draft_fold_path=dst, draft_root_path=ROOT, tm_duration=us(vdur), tm_draft_create=now, tm_draft_modified=now)
for grp in Mi.get('draft_materials', []):
    grp['value'] = []
    if grp.get('type') == 0:
        grp['value'] = [{'ai_group_type': '', 'create_time': now // 1_000_000, 'duration': us(vdur), 'enter_from': 0, 'extra_info': os.path.basename(vpath), 'file_Path': vpath, 'height': vh, 'id': str(uuid.uuid4()),
                         'import_time': now // 1_000_000, 'import_time_ms': now, 'item_source': 1, 'material_color_tag': '', 'md5': '', 'metetype': 'video', 'roughcut_time_range': {'duration': us(vdur), 'start': 0},
                         'sub_time_range': {'duration': -1, 'start': -1}, 'type': 0, 'width': vw}]
json.dump(Mi, open(mi, 'w'), ensure_ascii=False, separators=(',', ':'))
try:   # ảnh bìa = khung giữa phim
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-ss', str(vdur / 2), '-i', vpath, '-frames:v', '1', '-vf', 'scale=640:-2', os.path.join(dst, 'draft_cover.jpg')], check=True)
except Exception: pass
rp = os.path.join(ROOT, 'root_meta_info.json'); R = json.load(open(rp)); shutil.copy(rp, rp + '.bak-capcut-draft')
src = next((x for x in R['all_draft_store'] if os.path.normpath(x.get('draft_fold_path', '')) == os.path.normpath(tpl)), R['all_draft_store'][0])
e = copy.deepcopy(src); e.update(draft_id=did, draft_name=name, draft_fold_path=dst, draft_json_file=os.path.join(dst, 'draft_info.json'), draft_cover=os.path.join(dst, 'draft_cover.jpg'),
    tm_duration=us(vdur), tm_draft_create=now, tm_draft_modified=now)
R['all_draft_store'].insert(0, e); R['draft_ids'] = len(R['all_draft_store'])
json.dump(R, open(rp, 'w'), ensure_ascii=False, separators=(',', ':'))
print(f'✅ dự án CapCut "{name}": video {vdur:.1f}s {vw}×{vh} · {len(sfx)} tiếng hiệu ứng + {len(beds)} đoạn tiếng nền · {len(tracks) - 1} track tiếng · mẫu: {os.path.basename(tpl)}')
