#!/usr/bin/env python3
# ✂️→CapCut DỰNG DỰ ÁN CAPCUT CHO 1 TẬP COMMENTER (anh 27/11: "đẩy lên capcut mai t sửa"). Chỉ Mac (CapCut desktop 9.x).
#   1) python3 tools/x/fan-edit.py out/fan/<x>.edit.json --segs out/fan/<x>_segs     (ra bản edit hoàn chỉnh + từng đoạn mp4 + segs.json)
#   2) python3 tools/x/capcut-fan.py out/fan/<x>_segs --name "Commenter Part 7"
# Ra: 1 dự án mới trong CapCut — track video chính = các đoạn NỐI NHAU đúng như bản edit (mở đầu · bản quay · TỪNG MEME CHÈN là 1 clip riêng
#   → xoá / thay (Replace) / kéo dài từng meme dễ), tiếng game + tiếng meme nằm sẵn trong từng clip; tiếng mở đầu (vine boom, announce) = clip tiếng riêng.
#   Âm lượng = đúng hệ số cân −14 LUFS của bản edit cuối.
# ⚠️ CapCut PHẢI TẮT lúc chạy. Không đụng dự án cũ: chép dự án mẫu (có track video + tiếng) sang thư mục MỚI rồi viết lại; root_meta_info.json được
#   sao lưu (.bak-capcut-fan). Media hard-link vào trong thư mục dự án (CapCut chạy sandbox, không đọc được file ngoài).
import json, os, sys, shutil, subprocess, uuid, copy, time, argparse, glob

ROOT = os.path.expanduser('~/Movies/CapCut/User Data/Projects/com.lveditor.draft')
ap = argparse.ArgumentParser()
ap.add_argument('segs'); ap.add_argument('--name', required=True); ap.add_argument('--template', default=None); ap.add_argument('--max-gain', type=float, default=3.16)
A = ap.parse_args()
if subprocess.run(['pgrep', '-x', 'CapCut'], capture_output=True).returncode == 0:
    sys.exit('❌ CapCut đang mở — tắt CapCut rồi chạy lại')
S = json.load(open(os.path.join(A.segs, 'segs.json')))
U = lambda: str(uuid.uuid4()).upper()
us = lambda s: int(round(s * 1_000_000))
def probe(p):
    o = json.loads(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration:stream=width,height,codec_type', '-of', 'json', p], capture_output=True, text=True).stdout)
    v = next((s for s in o.get('streams', []) if s.get('codec_type') == 'video'), {})
    return float(o['format']['duration']), v.get('width'), v.get('height'), any(s.get('codec_type') == 'audio' for s in o.get('streams', []))

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
def extras(seg0):
    refs = []
    for r in seg0['extra_material_refs']:
        if r not in byid: continue
        k, x = byid[r]; y = copy.deepcopy(x); y['id'] = U(); M[k].append(y); refs.append(y['id'])
    return refs

G = min(A.max_gain, 10 ** (float(S.get('gain_db', 0)) / 20))
# ── track video chính: các đoạn nối nhau ──
vsegs = []; t = 0.0; W0 = H0 = None
for sg in S['segs']:
    p = os.path.abspath(sg['file']); d, w, h, ha = probe(p); W0, H0 = W0 or w, H0 or h
    vm = copy.deepcopy(vmat0); vm.update(id=U(), path=p, duration=us(d), width=w, height=h, has_audio=ha, material_name=sg['label'] or os.path.basename(p), local_material_id=str(uuid.uuid4()))
    M['videos'].append(vm)
    vs = copy.deepcopy(vseg0); vs.update(id=U(), material_id=vm['id'], source_timerange={'start': 0, 'duration': us(d)}, target_timerange={'start': us(t), 'duration': us(d)},
                                       extra_material_refs=extras(vseg0), volume=G, last_nonzero_volume=G)
    vsegs.append(vs); t += d
total = t
vt = copy.deepcopy(vtrack); vt.update(id=U(), segments=vsegs)
# ── tiếng mở đầu: mỗi tiếng 1 clip ──
asegs = []
for f, at, vol in S.get('sfx', []):
    p = os.path.abspath(os.path.expanduser(f)); d = probe(p)[0]; g = min(A.max_gain, float(vol) * G)
    am = copy.deepcopy(amat0); am.update(id=U(), path=p, name=os.path.basename(p).rsplit('.', 1)[0], duration=us(d), music_id=str(uuid.uuid4()), local_material_id=str(uuid.uuid4()), wave_points=[])
    M['audios'].append(am)
    s = copy.deepcopy(aseg0); s.update(id=U(), material_id=am['id'], source_timerange={'start': 0, 'duration': us(d)}, target_timerange={'start': us(at), 'duration': us(d)},
                                       extra_material_refs=extras(aseg0), volume=g, last_nonzero_volume=g)
    asegs.append(s)
def lanes(segs, label):
    segs.sort(key=lambda s: s['target_timerange']['start']); L = []
    for s in segs:
        a = s['target_timerange']['start']
        for ln in L:
            if ln[-1]['target_timerange']['start'] + ln[-1]['target_timerange']['duration'] <= a: ln.append(s); break
        else: L.append([s])
    out = []
    for i, ln in enumerate(L):
        tr = copy.deepcopy(atrack); tr.update(id=U(), segments=ln, name=f'{label} {i + 1}' if len(L) > 1 else label, is_default_name=False); out.append(tr)
    return out
tracks = [vt] + lanes(asegs, 'Tiếng mở đầu')

# ── ghi dự án mới ──
name = A.name; dst = os.path.join(ROOT, name)
if os.path.exists(dst): sys.exit(f'❌ đã có dự án "{name}" — đặt tên khác hoặc xoá trong CapCut')
shutil.copytree(tpl, dst)
for f in glob.glob(os.path.join(dst, '**', '*.tmp'), recursive=True) + glob.glob(os.path.join(dst, '**', '*.bak'), recursive=True): os.remove(f)
MED = os.path.join(dst, 'Resources', 'media'); os.makedirs(MED, exist_ok=True)
for k in ('videos', 'audios'):
    for m in M.get(k, []):
        p0 = m.get('path')
        if not p0 or not os.path.exists(p0): continue
        tg = os.path.join(MED, os.path.basename(p0))
        if not os.path.exists(tg):
            try: os.link(p0, tg)
            except OSError: shutil.copy2(p0, tg)
        m['path'] = tg
now = int(time.time() * 1_000_000)
D2 = copy.deepcopy(D); D2.update(materials=M, tracks=tracks, duration=us(total), fps=50.0, name='', create_time=now // 1_000_000, update_time=now // 1_000_000,
    canvas_config={**D['canvas_config'], 'ratio': 'original', 'width': W0, 'height': H0})
for k, v in list(D2.get('keyframes', {}).items()):
    if isinstance(v, list): D2['keyframes'][k] = []
for k in ('time_marks', 'relationships', 'keyframe_graph_list'):
    if isinstance(D2.get(k), list): D2[k] = []
txt = json.dumps(D2, ensure_ascii=False, separators=(',', ':'))
for f in [os.path.join(dst, 'draft_info.json')] + glob.glob(os.path.join(dst, 'Timelines', '*', 'draft_info.json')): open(f, 'w', encoding='utf-8').write(txt)
pj = os.path.join(dst, 'Timelines', 'project.json')
if os.path.exists(pj): P = json.load(open(pj)); P['id'] = U(); json.dump(P, open(pj, 'w'), ensure_ascii=False, separators=(',', ':'))
did = U(); mi = os.path.join(dst, 'draft_meta_info.json'); Mi = json.load(open(mi))
Mi.update(draft_id=did, draft_name=name, draft_fold_path=dst, draft_root_path=ROOT, tm_duration=us(total), tm_draft_create=now, tm_draft_modified=now)
for grp in Mi.get('draft_materials', []):
    grp['value'] = []
    if grp.get('type') == 0:
        grp['value'] = [{'ai_group_type': '', 'create_time': now // 1_000_000, 'duration': m['duration'], 'enter_from': 0, 'extra_info': os.path.basename(m['path']), 'file_Path': m['path'], 'height': m['height'],
                         'id': str(uuid.uuid4()), 'import_time': now // 1_000_000, 'import_time_ms': now, 'item_source': 1, 'material_color_tag': '', 'md5': '', 'metetype': 'video',
                         'roughcut_time_range': {'duration': m['duration'], 'start': 0}, 'sub_time_range': {'duration': -1, 'start': -1}, 'type': 0, 'width': m['width']} for m in M['videos']]
json.dump(Mi, open(mi, 'w'), ensure_ascii=False, separators=(',', ':'))
try:
    big = max(S['segs'], key=lambda x: x['dur'])['file']
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-ss', '20', '-i', big, '-frames:v', '1', '-vf', 'scale=640:-2', os.path.join(dst, 'draft_cover.jpg')], check=True)
except Exception: pass
rp = os.path.join(ROOT, 'root_meta_info.json'); R = json.load(open(rp)); shutil.copy(rp, rp + '.bak-capcut-fan')
src = next((x for x in R['all_draft_store'] if os.path.normpath(x.get('draft_fold_path', '')) == os.path.normpath(tpl)), R['all_draft_store'][0])
e = copy.deepcopy(src); e.update(draft_id=did, draft_name=name, draft_fold_path=dst, draft_json_file=os.path.join(dst, 'draft_info.json'), draft_cover=os.path.join(dst, 'draft_cover.jpg'),
    tm_duration=us(total), tm_draft_create=now, tm_draft_modified=now)
R['all_draft_store'].insert(0, e); R['draft_ids'] = len(R['all_draft_store'])
json.dump(R, open(rp, 'w'), ensure_ascii=False, separators=(',', ':'))
print(f'✅ dự án CapCut "{name}": {len(vsegs)} clip trên track chính ({total:.1f}s, {W0}×{H0}) · {len(asegs)} tiếng mở đầu · âm lượng ×{G:.2f} · mẫu: {os.path.basename(tpl)}')
