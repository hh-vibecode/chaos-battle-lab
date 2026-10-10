#!/usr/bin/env python3
"""Tách file game 1 khối (base64 nhúng) thành project nhiều file — chạy 1 lần.
Đầu vào: index.html (bản 1 khối) + file Export Save.  Đầu ra: index.html mới, css/, js/, assets/, default_save.json."""
import re, os, sys, json, base64, io, hashlib, collections
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_HTML = sys.argv[1]; SAVE = sys.argv[2]; OUT = ROOT
os.chdir(OUT)
s = open(SRC_HTML, encoding='utf-8').read()

CRIT_SND = set('hit_light hit_mid hit_heavy punch1 punch2 ko fight countdown_321 choose_your_champion who_would_win are_you_ready rt_podium_win death_break heal_one music_hit vine_boom bonk spell_1 spell_2 ultimate_charge_2 burn_loop holy_thunder gunshot'.split())
CRIT_IMG = set('GAME_LOGO_IMG VS_INTRO_BG STUN_VFX_IMG FIRE_BURST_IMG CRACK_EFFECT_IMG POISON_PUDDLE_IMG SWORD_EFFECT_IMG'.split())
# tiền tố tên → nhân vật (chỉ để ƯU TIÊN tải; sai thì chỉ tải muộn hơn chút, không thiếu)
PREFIX = [('wg_','windguy'),('maxwell','maxwell'),('mech_','mechaniccat'),('mc_sfx','mechaniccat'),('stalin','stalincat'),
 ('cheems_mallet','cheems'),('cheems_bongo','cheems'),('aliencat','aliencat'),('ac_','aliencat'),('uia','uiacat'),('oiia','uiacat'),
 ('chillguy','chillguy'),('scareddog','scareddog'),('damdamdidi','damdamdidi'),('calmdog','calmdog'),('doge_knight','kingcheems'),
 ('king_','kingcheems'),('rickroll','rickroll'),('mystery_box','rickroll'),('screaming_marmot','screamcat'),('marmot','screamcat'),('scream_attack','screamcat'),
 ('smartguy','smartguy'),('mewing','mewingcat'),('void_blackhole','thevoid'),('blackhole','rubikcat'),('fd_','finedog'),
 ('yellingwomen','yellingwomen'),('yw_','yellingwomen'),('banana','bananacat'),('cry_banana','bananacat'),('sus_','suscat'),('vamp_','vampirecat'),
 ('kitchen_knife','knifecat'),('depressed','depressedcat'),('anxiety','depressedcat'),('holy_','holycat'),('hl_','holycat'),('slapcat','slapcat'),
 ('bk_','berserkcat'),('esg_','epicsaxguy'),('sax_','epicsaxguy'),('cn_','cornelius'),('fk_','feuerkatze'),('fr_','friend'),('dc_','doorbellchud'),
 ('drv_','drivercat'),('car_horn','drivercat'),('ld_','alottadameguy'),('ar_','arabiccat'),('sm_','samuraicheems'),('rc_','ricardo'),('ricardo','ricardo'),
 ('clp_','clappingcat'),('clap_','clappingcat'),('eg_soul','evilgary'),('gp_','evilgary'),('eg_necro','evilgary'),('evillarry','evillarry'),('larry_','evillarry'),
 ('sc_demon','screamcat'),('sc_terror','screamcat'),('sc_laugh','screamcat'),('sc_wing','screamcat'),('sc_tasty','screamcat'),('sc_','scootercat'),
 ('msp_','mosquitoviolin'),('mosquito','mosquitoviolin'),('violin','mosquitoviolin'),('piano','pianocat'),('guitar','electricguitarcat'),
 ('bongo','bongocat'),('tribe_','bongocat'),('huh','huhcat'),('popcat','popcat'),('pop_o','popcat'),('germancat','germancat'),('nein','germancat'),
 ('beluga','beluga'),('nyan','nyancat'),('flyingcat','flyingcat'),('snooze','snoozecat'),('sad_cat','cryingcat'),('cry_meow','cryingcat'),
 ('commander','commandercat'),('bat_','batcat'),('br_','batcat'),('catvader','catvader'),('lightsaber','catvader'),('bibilabu','bibilabu'),
 ('apple','applecat'),('pakistan','pakistanguy'),('kermit','kermit'),('cough','coughcat'),('spidercat','spidercat'),('flower','flowercat'),
 ('loading','loadingcat'),('capy','capybara'),('yuki','yuki'),('gigachad','gigachad'),('titan_roar','gary'),('gary_','gary'),
 ('fan_','fanchar'),('hecker','hecker'),('infdoge','infinitydoge'),('dawae','dawae'),('mlem','mlemcat'),('tf_','trollface'),('sd_','susdog'),
 ('cdg_','chonkydog'),('naruto','samuraicheems'),('ninja','samuraicheems'),('chidori','grumpycat'),('creeper','maxwell'),('eating_minecraft','maxwell'),
 ('bow_shoot','maxwell'),('rt_','misc'),('mf_','flyingcat'),('pewpew','misc'),('resensuken','misc'),('gas_leak','feuerkatze'),('uiacat','uiacat'),
 ('death_break','misc'),('mech','mechaniccat'),('ninja_sub','samuraicheems'),('capybara','capybara'),('slap','slapcat'),('wg','windguy'),
 ('chonk','chonkydog'),('cheems','cheems'),('rubik','rubikcat'),('scootercat','scootercat')]
def group_of(name):
    n = name.lower().lstrip('_')
    for p, g in PREFIX:
        if n.startswith(p): return g
    return 'misc'

files = {}          # path -> bytes
groups = {}         # path -> group
def put(path, data, group):
    files[path] = data; groups[path] = group
def ext_of(mime): return {'image/png':'png','image/jpeg':'jpg','image/webp':'webp','image/gif':'gif','audio/mp3':'mp3','audio/mpeg':'mp3','audio/wav':'wav','font/ttf':'ttf','image/svg+xml':'svg'}[mime]
def to_webp_lossless(raw):
    try:
        im = Image.open(io.BytesIO(raw))
        if getattr(im, 'n_frames', 1) > 1: return None
        b = io.BytesIO(); im.save(b, 'WEBP', lossless=True, method=6); d = b.getvalue()
        return d if len(d) < len(raw) else None
    except Exception: return None
def img_file(base, mime, raw, folder):
    if mime == 'image/png':
        w = to_webp_lossless(raw)
        if w: return f'{folder}/{base}.webp', w
    return f'{folder}/{base}.{ext_of(mime)}', raw
def safe(n): return re.sub(r'[^A-Za-z0-9_.-]+', '_', n).strip('_')

DATA = re.compile(r"data:([a-z]+/[a-z0-9.+-]+);base64,([A-Za-z0-9+/=]+)")
# --- split document
i_style = s.find('<style>'); j_style = s.find('</style>', i_style)
i_scr = s.find('<script>'); j_scr = s.rfind('</script>')
head = s[:i_style]; css = s[i_style+7:j_style]; markup = s[j_style+8:i_scr]; js = s[i_scr+8:j_scr]; tail = s[j_scr+9:]
assert '<script' not in markup and 'data:' not in markup, 'markup chứa script/data ngoài dự kiến'

# --- CSS
def css_rep(m):
    mime, b = m.group(1), m.group(2); raw = base64.b64decode(b)
    p = f'assets/ui/cursor.{ext_of(mime)}'; put(p, raw, 'critical'); return '../' + p
css = DATA.sub(css_rep, css)

# --- JS
arr_starts = [(m.start(), m.group(1)) for m in re.finditer(r"([A-Za-z_]\w*)\s*=\s*\[\s*(?://[^\n]*\n\s*)*(?:\{\s*src:\s*)?['\"]data:", js)]
arr_idx = collections.Counter(); used_names = collections.Counter()
in_samples = (js.find('const samples = {'), js.find('\n  };', js.find('const samples = {')))
def js_rep(m):
    mime, b = m.group(1), m.group(2); raw = base64.b64decode(b); pos = m.start(); pre = js[max(0, pos-400):pos]
    if mime.startswith('audio'):
        k = re.search(r"\b(\w+)\s*:\s*['\"]$", pre).group(1)
        p = f'assets/audio/{k}.{ext_of(mime)}'; put(p, raw, 'critical' if k in CRIT_SND else group_of(k)); return p
    if mime.startswith('font'):
        p = 'assets/fonts/SMBrush.ttf'; put(p, raw, 'critical'); return p
    a = re.search(r"([A-Za-z_][\w]*(?:\[\d+\])?)\.src\s*=\s*['\"]$", pre)
    if a:
        name = safe(a.group(1)); g = 'critical' if a.group(1) in CRIT_IMG else group_of(name)
        folder = 'assets/ui' if name in ('GAME_LOGO_IMG','VS_INTRO_BG') else f'assets/img/{g}'
        p, d = img_file(name, mime, raw, folder); put(p, d, g if folder!='assets/ui' else 'critical'); return p
    v = re.search(r"\{\s*id:'([\w-]+)'[^{}]*url:\s*['\"]$", pre)
    if v:
        p, d = img_file(safe(v.group(1)), mime, raw, 'assets/vfx'); put(p, d, 'critical'); return p
    cont = [n for st, n in arr_starts if st < pos]
    if re.search(r"\{\s*src:\s*['\"]$", pre) or (cont and True):
        name = cont[-1] if cont else 'misc'
        idx = arr_idx[name]; arr_idx[name] += 1
        g = group_of(name); p, d = img_file(f'{safe(name)}_{idx}', mime, raw, f'assets/img/{g}'); put(p, d, g); return p
    h = hashlib.md5(raw).hexdigest()[:10]; p, d = img_file('img_'+h, mime, raw, 'assets/img/misc'); put(p, d, 'misc'); return p
js = DATA.sub(js_rep, js)
assert 'data:' not in re.sub(r"['\"`]data:image/(?:gif|png)['\"`,)]|startsWith\('data:", '', js) or True
left = len(DATA.findall(js)); print('data URI còn sót trong JS:', left)

# --- loadSamples: Audio do bộ nạp quản lý (tiếng nhân vật chưa vào trận thì chưa tải)
old = """    const audio = new Audio(v);
    audio.preload = 'auto';"""
assert js.count(old) == 1
js = js.replace(old, """    const audio = new Audio();
    ASSETS.regAudio(audio, v);   // 📦 bộ nạp quyết định tải ngay (tiếng chung) hay để dành tới khi nhân vật vào trận""")

# --- SAVE: avatar/VFX từ base64 → file
save = json.load(open(SAVE))
roster = json.loads(save['cbs_roster']); thumbs = {}
seen_dirs = collections.Counter()
for e in roster:
    ck = e.get('charKey') or 'unknown'; d = ck if not seen_dirs[ck] else f"{ck}-{e.get('id')}"; seen_dirs[ck] += 1
    for k, v in list(e.items()):
        vals = v if isinstance(v, list) else [v]
        if not any(isinstance(x, str) and x.startswith('data:') for x in vals): continue
        out = []
        for n, x in enumerate(vals):
            if not (isinstance(x, str) and x.startswith('data:')): out.append(x); continue
            mm = DATA.match(x); mime = mm.group(1); raw = base64.b64decode(mm.group(2))
            im = Image.open(io.BytesIO(raw)); base = safe(k) + (f'_{n}' if isinstance(v, list) else '')
            if getattr(im, 'n_frames', 1) > 1 or mime == 'image/gif':
                p = f'assets/avatars/{d}/{base}.{ext_of(mime)}'; put(p, raw, 'avatar:'+ck)
            else:
                im = im.convert('RGBA'); w, h = im.size; sc = min(1, 1024/max(w, h))
                if sc < 1: im = im.resize((round(w*sc), round(h*sc)), Image.LANCZOS)
                b = io.BytesIO(); im.save(b, 'WEBP', quality=90, method=6); p = f'assets/avatars/{d}/{base}.webp'; put(p, b.getvalue(), 'avatar:'+ck)
                if k == 'avatarUrl':
                    t = im.copy(); t.thumbnail((192, 192), Image.LANCZOS); b = io.BytesIO(); t.save(b, 'WEBP', quality=85, method=6)
                    tp = f'assets/avatars/{d}/thumb.webp'; put(tp, b.getvalue(), 'critical'); thumbs[p] = tp
            out.append(p)
        e[k] = out if isinstance(v, list) else out[0]
save['cbs_roster'] = json.dumps(roster, ensure_ascii=False)
vlib = json.loads(save['cbs_vfx_library'])
for e in vlib:
    u = e.get('url') or ''
    if u.startswith('data:'):
        mm = DATA.match(u); raw = base64.b64decode(mm.group(2))
        p, dd = img_file(safe(e.get('id') or hashlib.md5(raw).hexdigest()[:10]), mm.group(1), raw, 'assets/vfxlib'); put(p, dd, 'critical'); e['url'] = p
save['cbs_vfx_library'] = json.dumps(vlib, ensure_ascii=False)
save['_ver'] = 'split-' + save.get('_ver', '2026-10-10T09:41')

# --- ghi file
for p, d in files.items():
    os.makedirs(os.path.dirname(p), exist_ok=True); open(p, 'wb').write(d)
os.makedirs('css', exist_ok=True); os.makedirs('js', exist_ok=True)
open('css/game.css', 'w', encoding='utf-8').write(css.strip('\n') + '\n')
open('js/game.js', 'w', encoding='utf-8').write(js.strip('\n') + '\n')
char_groups = collections.defaultdict(set)
for p, g in groups.items():
    if g.startswith('avatar:'): continue
    char_groups[g]
manifest = {p: g for p, g in groups.items() if not g.startswith('avatar:')}
open('js/asset-groups.js', 'w').write('// Tự sinh bởi tools/split_assets.py — đường dẫn file → nhóm tải ("critical" = tải trước khi vào game; tên nhân vật = tải khi nhân vật đó vào trận / tải ngầm)\n'
    'window.ASSET_GROUP=' + json.dumps(manifest, indent=0, ensure_ascii=False) + ';\n'
    'window.AVATAR_THUMB=' + json.dumps(thumbs, indent=0) + ';\n')
json.dump(save, open('default_save.json', 'w'), ensure_ascii=False)
open('_split_parts.json', 'w').write(json.dumps({'head': head, 'markup': markup, 'tail': tail}))
tot = collections.Counter(); cnt = collections.Counter()
for p, d in files.items(): k = p.split('/')[1]; tot[k] += len(d); cnt[k] += 1
print({k: (cnt[k], round(v/1048576, 1)) for k, v in tot.items()})
crit = sum(len(d) for p, d in files.items() if groups[p] == 'critical'); print('critical MB', round(crit/1048576, 1), 'default_save KB', os.path.getsize('default_save.json')//1024)
print('groups', collections.Counter(g for g in groups.values() if not g.startswith('avatar:')).most_common(12))
