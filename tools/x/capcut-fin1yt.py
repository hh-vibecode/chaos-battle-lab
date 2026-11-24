#!/usr/bin/env python3
# Ráp vào dự án CapCut "Final Part 1 - tieng le" (bản 2, anh 24/11):
#   [mở đầu: tràng giao tranh nhanh Gojo vs Pain → lao vào nhau → VA (âm bản, trắng)] + [INTRO KÊNH 3s kenhintro] + [cảnh phố fin1yt: proudly presents · MEME LORE 2]
#   + [phim từ T.cry = 14.0s]. Cú va có thêm 3 lớp tiếng cho LỰC (anh: "sound lúc va nhau cần có lực hơn"), màn tên kênh có tiếng đập chữ + vút sang cảnh.
#   python3 tools/x/capcut-fin1yt.py out/Final-Part-1/00a-kenhintro-4k-khong-tieng.mp4 out/Final-Part-1/00-fin1yt-4k-khong-tieng.mp4   (CapCut phải tắt)
# Luôn ráp từ bản CHƯA ráp (draft_info.json.bak-coldopen — tạo ở lần ráp đầu). Ráp lại được nhiều lần.
import json, os, sys, glob, shutil, uuid, copy, subprocess
US = 1_000_000
P = os.path.expanduser('~/Movies/CapCut/User Data/Projects/com.lveditor.draft/Final Part 1 - tieng le'); F = os.path.join(P, 'draft_info.json'); BASE = F + '.bak-coldopen'
CARD, INTRO = sys.argv[1], sys.argv[2]
dur = lambda p: float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p], capture_output=True, text=True).stdout)
CARD_D, INTRO_D = dur(CARD), dur(INTRO)
C4 = 246.66                                   # giây bắt đầu Gojo vs Pain trong phim ghép
# (giây trong cảnh Gojo vs Pain) — đo bằng bảng khung 10 hình/giây
HOOK_CUTS = [(6.95, 7.45),    # Gojo đấm trúng — BAM
             (7.95, 8.60),    # Pain lao vào, Gojo cúi né móc ngược
             (9.50, 10.15),   # Pain đấm trúng, Gojo trượt lùi
             (12.40, 13.15),  # Gojo lướt tới đấm, Pain đỡ trượt lùi
             (14.95, 15.62),  # Pain ALMIGHTY PUSH → khung va chạm đỏ / xanh
             (5.88, 6.18),    # 2 luồng sáng xanh / tím lao vào nhau
             (11.22, 11.58)]  # lao vào → VA MẠNH (âm bản → trắng DOOON)
HOOK_CUTS = [(C4 + a, C4 + b) for a, b in HOOK_CUTS]
CRY = 14.0; EXT = INTRO_D - CRY
HOOK = sum(b - a for a, b in HOOK_CUTS); SHIFT = HOOK + CARD_D + EXT
CLASH = HOOK - (HOOK_CUTS[-1][1] - (C4 + 11.40))   # giây khung âm bản của cú va trong video mới
# lớp tiếng thêm: (giây trên video mới, tên file, âm lượng so với clip mẫu cùng file, lặng đầu file cần bỏ)
LEAD = {'kn_explode_crunch': 0.025, 'se_impact_stop': 0.026, 'se_super_hit': 0.026, 'l2p_whoosh': 0.254, 'se_whoosh_fast': 0.043, 'vine_boom': 0.087}
ADD = [(CLASH, 'ed_hit10', 1.0), (CLASH, 'se_super_hit', 1.0), (CLASH, 'kn_explode_crunch', 0.9),          # cú va: 3 lớp
       # INTRO KÊNH 3s (js/film-kenhintro.js): chữ bay ra từ khe · khớp ĐẬP 0.85 · BÙM huy hiệu 1.6 · kính rơi khớp 2.05 (vine boom) · loé 2.1 · vút ra 2.6
       (HOOK + 0.08, 'se_whoosh_fast', 0.7), (HOOK + 0.85, 'se_impact_stop', 1.0), (HOOK + 1.6, 'se_bomb', 1.0),
       (HOOK + 2.05, 'vine_boom', 0.8), (HOOK + 2.12, 'ep3_shine', 0.6), (HOOK + CARD_D - 0.4, 'l2p_whoosh', 0.8)]
_acc = 0.0
for a, b in HOOK_CUTS[:-2]: _acc += b - a; ADD.append((_acc - 0.04, 'se_whoosh_fast', 0.55))   # vút ở mỗi chỗ chuyển pha (bản gốc giữa 2 đòn có quãng lặng)
if subprocess.run(['pgrep', '-x', 'CapCut'], capture_output=True).returncode == 0: sys.exit('CapCut đang mở')
if not os.path.exists(BASE): shutil.copy2(F, BASE)
D = json.load(open(BASE, encoding='utf-8')); M = D['materials']
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
def clone(seg, src_start, d, tgt, mat_id=None):
    s = copy.deepcopy(seg); s['id'] = U(); s['extra_material_refs'] = dup_refs(seg)
    s['source_timerange'] = {'start': int(round(src_start * US)), 'duration': int(round(d * US))}
    s['target_timerange'] = {'start': int(round(tgt * US)), 'duration': int(round(d * US))}
    if mat_id: s['material_id'] = mat_id
    return s
# ── video ──
vt = next(t for t in D['tracks'] if t['type'] == 'video'); v0 = vt['segments'][0]; vm0 = byid[v0['material_id']][1]
med = os.path.dirname(vm0['path'])
def vmat(src, d):
    ip = os.path.join(med, os.path.basename(src))
    if os.path.exists(ip): os.remove(ip)
    os.link(src, ip)
    vm = copy.deepcopy(vm0); vm.update(id=U(), path=ip, duration=int(round(d * US)), material_name=os.path.basename(ip), local_material_id=str(uuid.uuid4())); M['videos'].append(vm); return vm['id']
segs, t = [], 0.0
for a, b in HOOK_CUTS: segs.append(clone(v0, a, b - a, t)); t += b - a
segs.append(clone(v0, 0, CARD_D, HOOK, vmat(CARD, CARD_D)))
segs.append(clone(v0, 0, INTRO_D, HOOK + CARD_D, vmat(INTRO, INTRO_D)))
VEND = v0['source_timerange']['duration'] / US
segs.append(clone(v0, CRY, VEND - CRY, HOOK + CARD_D + INTRO_D))
vt['segments'] = segs
# ── tiếng ──
atracks = [t for t in D['tracks'] if t['type'] == 'audio']; new, tmpl = [], {}
A = {m['id']: m for m in M['audios']}
for tr in atracks:
    for s in list(tr['segments']):
        st = s['target_timerange']['start'] / US; du = s['target_timerange']['duration'] / US; ss = s['source_timerange']['start'] / US
        name = os.path.splitext(os.path.basename(A[s['material_id']]['path']))[0]; tmpl.setdefault(name, (tr, s))
        acc = 0.0
        for a, b in HOOK_CUTS:            # tiếng của đoạn mở đầu: chép đúng giờ sang đầu video (lặng đầu file có thể đẩy tiếng trễ hơn mốc cắt chút → +0.12)
            if a <= st < b + 0.12: new.append((tr, clone(s, ss, min(du, 2.0), acc + (st - a))))
            elif a - 0.35 <= st < a and st + du > a + 0.1 and not tr.get('name', '').startswith('Tiếng nền'):   # đòn bắt đầu NGAY TRƯỚC mốc cắt → lấy phần còn lại (không hụt tiếng giữa tràng đòn)
                new.append((tr, clone(s, ss + (a - st), min(du - (a - st), 2.0), acc)))
            acc += b - a
        if st < 0.05 and tr.get('name', '').startswith('Tiếng nền'):   # tiếng nền phố: phủ thêm đoạn giữ khung intro
            new.append((tr, clone(s, ss, EXT, HOOK + CARD_D)))
        s['target_timerange']['start'] = int(round((st + SHIFT) * US))
for at, name, k in ADD:
    if name not in tmpl: sys.exit('thiếu tiếng trong dự án: ' + name)
    tr, s0 = tmpl[name]; m = A[s0['material_id']]; L = LEAD.get(name, 0); d = min(m['duration'] / US - L, 2.5)
    s = clone(s0, L, d, at); s['volume'] = s0.get('volume', 1) * k; s['last_nonzero_volume'] = s['volume']; new.append((tr, s))
for tr, s in new: tr['segments'].append(s)
new_tracks = []
for tr in atracks:                     # sắp lại + tách track nếu chồng
    tr['segments'].sort(key=lambda s: s['target_timerange']['start']); lanes = []
    for s in tr['segments']:
        a = s['target_timerange']['start']
        for L in lanes:
            if L[-1]['target_timerange']['start'] + L[-1]['target_timerange']['duration'] <= a: L.append(s); break
        else: lanes.append([s])
    tr['segments'] = lanes[0]
    for L in lanes[1:]:
        t2 = copy.deepcopy(tr); t2['id'] = U(); t2['segments'] = L; t2['name'] = tr.get('name', '') + ' +'; new_tracks.append(t2)
D['tracks'] += new_tracks
D['duration'] = int(round((HOOK + CARD_D + INTRO_D + VEND - CRY) * US))
txt = json.dumps(D, ensure_ascii=False, separators=(',', ':'))
for f in [F] + glob.glob(os.path.join(P, 'Timelines', '*', 'draft_info.json')): open(f, 'w', encoding='utf-8').write(txt)
mi = os.path.join(P, 'draft_meta_info.json'); Mi = json.load(open(mi)); Mi['tm_duration'] = D['duration']; json.dump(Mi, open(mi, 'w'), ensure_ascii=False)
print(f'✅ mở đầu {HOOK:.2f}s ({len(HOOK_CUTS)} pha, cú va ở {CLASH:.2f}s) + tên kênh {CARD_D:.2f}s + cảnh phố {INTRO_D:.2f}s + phim từ {CRY}s · tiếng dời +{SHIFT:.2f}s · tổng {D["duration"]/US:.1f}s')
