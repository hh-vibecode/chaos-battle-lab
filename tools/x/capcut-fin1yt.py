#!/usr/bin/env python3
# python3 tools/x/capcut-fin1yt.py out/Final-Part-1/00-fin1yt-4k-khong-tieng.mp4  (CapCut phải tắt)
# Ráp vào dự án CapCut "Final Part 1 - tieng le": [mở đầu Gojo vs Pain] + [intro kênh fin1yt] + [phim từ T.cry=14.0s].
import json, os, sys, glob, shutil, uuid, copy, subprocess
US = 1_000_000
P = os.path.expanduser('~/Movies/CapCut/User Data/Projects/com.lveditor.draft/Final Part 1 - tieng le'); F = os.path.join(P, 'draft_info.json')
INTRO = sys.argv[1]; INTRO_D = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', INTRO], capture_output=True, text=True).stdout)
C4 = 246.66                                   # giây bắt đầu Gojo vs Pain trong phim ghép
HOOK_CUTS = [(C4 + 1.60, C4 + 5.86), (C4 + 10.95, C4 + 11.42)]   # toàn cảnh 2 đầu phố → cận Gojo → cận Pain → lao vào · cú VA MẠNH âm bản
CRY = 14.0; EXT = 2.0
HOOK = sum(b - a for a, b in HOOK_CUTS); SHIFT = HOOK + EXT
if subprocess.run(['pgrep', '-x', 'CapCut'], capture_output=True).returncode == 0: sys.exit('CapCut đang mở')
D = json.load(open(F, encoding='utf-8')); M = D['materials']
if any(m.get('path', '').endswith(os.path.basename(INTRO)) for m in M['videos']): sys.exit('đã ráp rồi')
byid = {}
for k, L in M.items():
    if isinstance(L, list):
        for x in L:
            if isinstance(x, dict) and 'id' in x: byid[x['id']] = (k, x)
U = lambda: str(uuid.uuid4()).upper()
def dup_refs(seg):
    out = []
    for r in seg.get('extra_material_refs', []):
        if r not in byid: continue
        k, x = byid[r]; y = copy.deepcopy(x); y['id'] = U(); M[k].append(y); byid[y['id']] = (k, y); out.append(y['id'])
    return out
def clone(seg, src_start, dur, tgt, mat_id=None):
    s = copy.deepcopy(seg); s['id'] = U(); s['extra_material_refs'] = dup_refs(seg)
    s['source_timerange'] = {'start': int(round(src_start * US)), 'duration': int(round(dur * US))}
    s['target_timerange'] = {'start': int(round(tgt * US)), 'duration': int(round(dur * US))}
    if mat_id: s['material_id'] = mat_id
    return s
# ── video ──
vt = next(t for t in D['tracks'] if t['type'] == 'video'); v0 = vt['segments'][0]; vm0 = byid[v0['material_id']][1]
med = os.path.dirname(vm0['path']); ip = os.path.join(med, os.path.basename(INTRO))
if not os.path.exists(ip): os.link(INTRO, ip)
vm = copy.deepcopy(vm0); vm.update(id=U(), path=ip, duration=int(round(INTRO_D * US)), material_name=os.path.basename(ip), local_material_id=str(uuid.uuid4())); M['videos'].append(vm)
segs, t = [], 0.0
for a, b in HOOK_CUTS: segs.append(clone(v0, a, b - a, t)); t += b - a
segs.append(clone(v0, 0, INTRO_D, HOOK, vm['id']))
VEND = v0['source_timerange']['duration'] / US
segs.append(clone(v0, CRY, VEND - CRY, HOOK + INTRO_D))
vt['segments'] = segs
assert abs(INTRO_D - (CRY + EXT)) < 0.05, INTRO_D
# ── tiếng ──
atracks = [t for t in D['tracks'] if t['type'] == 'audio']; hook_new, bed_new = [], []
for tr in atracks:
    for s in list(tr['segments']):
        st = s['target_timerange']['start'] / US; du = s['target_timerange']['duration'] / US; ss = s['source_timerange']['start'] / US
        acc = 0.0
        for a, b in HOOK_CUTS:            # tiếng của đoạn mở đầu: chép đúng giờ sang đầu video
            if a <= st < b + 0.12: hook_new.append((tr, clone(s, ss, min(du, 3.0), acc + (st - a))))
            acc += b - a
        if st < 0.05 and (tr.get('name', '').startswith('Tiếng nền')):   # tiếng nền phố: phủ thêm 2s giữ khung intro
            bed_new.append((tr, clone(s, ss, EXT, HOOK)))
        s['target_timerange']['start'] = int(round((st + SHIFT) * US))
for tr, s in hook_new + bed_new: tr['segments'].append(s)
# sắp lại + tách track nếu chồng
def fix(tr):
    tr['segments'].sort(key=lambda s: s['target_timerange']['start'])
new_tracks = []
for tr in atracks:
    fix(tr); lanes = []
    for s in tr['segments']:
        a = s['target_timerange']['start']
        for L in lanes:
            e = L[-1]['target_timerange']['start'] + L[-1]['target_timerange']['duration']
            if e <= a: L.append(s); break
        else: lanes.append([s])
    tr['segments'] = lanes[0]
    for L in lanes[1:]:
        t2 = copy.deepcopy(tr); t2['id'] = U(); t2['segments'] = L; t2['name'] = tr.get('name', '') + ' +'; new_tracks.append(t2)
D['tracks'] += new_tracks
D['duration'] = int(round((HOOK + INTRO_D + VEND - CRY) * US))
shutil.copy2(F, F + '.bak-coldopen')
txt = json.dumps(D, ensure_ascii=False, separators=(',', ':'))
for f in [F] + glob.glob(os.path.join(P, 'Timelines', '*', 'draft_info.json')): open(f, 'w', encoding='utf-8').write(txt)
mi = os.path.join(P, 'draft_meta_info.json'); Mi = json.load(open(mi)); Mi['tm_duration'] = D['duration']; json.dump(Mi, open(mi, 'w'), ensure_ascii=False)
print(f'✅ mở đầu {HOOK:.2f}s ({len(hook_new)} tiếng) + intro {INTRO_D:.2f}s + phim từ {CRY}s · tiếng dời +{SHIFT:.2f}s · nền phủ thêm {len(bed_new)} đoạn · tổng {D["duration"]/US:.1f}s')
