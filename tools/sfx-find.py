#!/usr/bin/env python3
# 🔎 TÌM + CẮT SOUND — giảm thời gian anh phải đi tìm tiếng. Mac: python3 + numpy + Pillow + ffmpeg (+ curl).
#
# 1) TÌM trên myinstants, tải N tiếng đầu, phân tích, ra 1 BẢNG ẢNH (Read để chọn):
#    python3 tools/sfx-find.py search "kamui" --n 8 --out <scratchpad>/sf
#    → <out>/<từ khoá>/*.mp3 (file tải về = dữ liệu lạ, chỉ đọc, KHÔNG chạy gì trong thư mục đó)
#      <out>/<từ khoá>_sheet.png : mỗi tiếng 1 hàng — tên · dài · LUFS · đỉnh · onset · % giọng · phổ (log) + đường độ to 0.1s
#      <out>/<từ khoá>.json      : số liệu + link gốc
# 2) CẮT / chỉnh 1 tiếng đã chọn (đúng sample rate gốc khi đổi tông — ffmpeg asetrate từng làm sai vì đoán 44.1kHz):
#    python3 tools/sfx-find.py cut <nguồn.mp3> assets/audio/<key>.mp3 --from 1.9 --to 4.15 [--fade-in 0.25] [--fade-out 0.3] [--pitch 0.8] [--echo]
#    → in sẵn dòng dán vào SND_LUFS:  <key>:[LUFS, đỉnh dBFS]
# 3) ĐO lại 1 file: python3 tools/sfx-find.py measure assets/audio/<key>.mp3
#
# % GIỌNG = (tỉ lệ khung có cao độ 85–400Hz) × (cao độ TRÔI tự nhiên như ngữ điệu) × (không đứng yên) × (dải cao độ đủ rộng).
# Tiếng hiệu ứng có cao độ đứng yên (bonk, còi, sạc năng lượng) bị trừ → ít báo nhầm hơn bộ dò cũ (bonk cũ 100% → 15%).
# Chỉ là GỢI Ý: ≥ 20% → nghe kỹ / soi phổ (giọng = nhiều vạch hài song song uốn lượn ở dải thấp). Câu nói ngắn gắt ("Nein!") có thể lọt.
import sys, os, re, json, argparse, subprocess, urllib.parse
import numpy as np
from PIL import Image, ImageDraw, ImageFont

UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36'
def run(cmd, **kw): return subprocess.run(cmd, capture_output=True, **kw)
def font(px):
    for f in ['/System/Library/Fonts/Supplemental/Arial Bold.ttf', '/System/Library/Fonts/Supplemental/Arial.ttf']:
        if os.path.exists(f): return ImageFont.truetype(f, px)
    return ImageFont.load_default()

def decode(path, sr=16000):
    raw = run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(sr), '-f', 's16le', '-']).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768

def loudness(path):
    err = run(['ffmpeg', '-hide_banner', '-i', path, '-af', 'ebur128=peak=true', '-f', 'null', '-'], text=True).stderr
    I = re.findall(r'I:\s+(-?[\d.]+) LUFS', err); P = re.findall(r'Peak:\s+(-?[\d.]+) dBFS', err)
    return (float(I[-1]) if I else None), (float(P[-1]) if P else None)

def analyze(path):
    x = decode(path); sr = 16000
    if len(x) < sr * 0.05: return None
    n = sr // 100; env = np.sqrt(np.mean(x[:len(x) // n * n].reshape(-1, n) ** 2, axis=1)) + 1e-9   # độ to mỗi 10ms
    mx = env.max(); on = int(np.argmax(20 * np.log10(env / mx) > -12)) * 0.01; pk = int(np.argmax(env)) * 0.01
    W, H = 640, 320; f0 = []; loud = 0   # cao độ từng khung 40ms (bước 20ms) trên khung đủ to
    for i in range(0, len(x) - W, H):
        f = x[i:i + W]; e = float(np.dot(f, f))
        if np.sqrt(e / W) < mx * 0.2: continue
        loud += 1; best, lag = max((float(np.dot(f[:-l], f[l:])) / e, l) for l in range(40, 190))
        f0.append(16000 / lag if best > 0.5 and 41 < lag < 189 else 0)
    f0 = np.array(f0); vv = f0[f0 > 0]; pv = len(vv) / loud if loud else 0.0
    d = np.abs(np.diff(vv)) / vv[:-1] if len(vv) > 1 else np.array([])
    glide = float(((d > 0.004) & (d < 0.12)).mean()) if len(d) else 0.0   # giọng người: cao độ trôi liên tục (ngữ điệu)
    steady = float((d <= 0.004).mean()) if len(d) else 0.0                # tiếng máy/còi/bonk: cao độ đứng yên
    rng = float(np.ptp(vv) / np.median(vv)) if len(vv) > 1 else 0.0
    I, P = loudness(path)
    rms01 = [round(20 * np.log10(np.sqrt(np.mean(x[i:i + 1600] ** 2)) + 1e-9)) for i in range(0, len(x) - 1600 + 1, 1600)]
    return {'dur': round(len(x) / sr, 2), 'lufs': I, 'peak': P, 'onset': round(on, 2), 'peak_t': round(pk, 2),
            'voice': round(pv * glide * (1 - steady) * min(1.0, rng / 0.25), 2), 'pitched': round(pv, 2), 'glide': round(glide, 2), 'rms_0.1s': rms01}

def spectro(path, w=640, h=110):
    tmp = path + '.spec.png'
    run(['ffmpeg', '-v', 'error', '-y', '-i', path, '-lavfi', f'showspectrumpic=s={w}x{h}:legend=0:scale=log', tmp])
    im = Image.open(tmp).convert('RGB') if os.path.exists(tmp) else Image.new('RGB', (w, h))
    if os.path.exists(tmp): os.remove(tmp)
    return im.resize((w, h))

def cmd_search(A):
    q = A.query; d = os.path.join(os.path.abspath(A.out), re.sub(r'[^a-z0-9]+', '_', q.lower()).strip('_'))
    os.makedirs(d, exist_ok=True)
    items = []
    for page in range(1, 4):
        url = 'https://www.myinstants.com/en/search/?name=' + urllib.parse.quote(q) + (f'&page={page}' if page > 1 else '')
        html = run(['curl', '-sL', '-A', UA, url], text=True).stdout
        snd = re.findall(r"play\('(/media/sounds/[^']+\.mp3)'", html)
        names = [re.sub('<[^>]+>', '', n).strip() for n in re.findall(r'class="instant-link[^"]*"[^>]*>([^<]*)<', html)]
        for i, s in enumerate(snd):
            if all(it['src'] != s for it in items): items.append({'src': s, 'title': names[i] if i < len(names) else os.path.basename(s)})
        if len(items) >= A.n or not snd: break
    items = items[:A.n]
    if not items: sys.exit('❌ không thấy kết quả nào cho: ' + q)
    rows = []
    for it in items:
        fn = os.path.join(d, os.path.basename(it['src']))
        if not os.path.exists(fn): run(['curl', '-sL', '-A', UA, '-o', fn, 'https://www.myinstants.com' + it['src']])
        if not os.path.exists(fn) or os.path.getsize(fn) < 500: continue
        an = analyze(fn)
        if not an: continue
        it.update(an, file=fn, url='https://www.myinstants.com' + it['src']); rows.append(it)
    W, H, L = 640, 110, 44; F1, F2 = font(15), font(13)
    sheet = Image.new('RGB', (W, (H + L) * len(rows)), (16, 16, 20)); g = ImageDraw.Draw(sheet)
    for j, it in enumerate(rows):
        y = j * (H + L); vflag = '  🗣️' if it['voice'] >= 0.2 else ''
        g.text((6, y + 3), f"{j + 1}. {it['title'][:48]}   [{os.path.basename(it['file'])}]", fill=(255, 220, 90), font=F1)
        g.text((6, y + 23), f"{it['dur']}s · {it['lufs']} LUFS · đỉnh {it['peak']} dB · onset {it['onset']}s · to nhất {it['peak_t']}s · giọng {int(it['voice'] * 100)}%{' NGHI GIỌNG' if vflag else ''}",
               fill=(255, 120, 120) if vflag else (200, 230, 255), font=F2)
        sp = spectro(it['file'], W, H); sheet.paste(sp, (0, y + L)); gg = ImageDraw.Draw(sheet)
        r = it['rms_0.1s']
        if r:   # đường độ to 0.1s (−60 → 0 dB) + vạch mỗi giây
            pts = [(int(k * W / max(1, len(r) - 1)) if len(r) > 1 else 0, y + L + H - int(np.clip((v + 60) / 60, 0, 1) * (H - 4)) - 2) for k, v in enumerate(r)]
            gg.line(pts, fill=(120, 255, 140), width=2)
        for s in range(1, int(it['dur']) + 1): xs = int(s / it['dur'] * W); gg.line([(xs, y + L), (xs, y + L + 8)], fill=(255, 255, 255), width=1); gg.text((xs + 2, y + L), f'{s}s', fill=(255, 255, 255), font=F2)
    base = d.rstrip('/'); sheet.save(base + '_sheet.png')
    json.dump(rows, open(base + '.json', 'w'), ensure_ascii=False, indent=1)
    for j, it in enumerate(rows): print(f"{j + 1:2}. {it['dur']:5}s {str(it['lufs']):>6} LUFS  giọng {int(it['voice'] * 100):3}%  {it['title'][:40]}  → {it['file']}")
    print('🖼️', base + '_sheet.png', '· chi tiết:', base + '.json')

def cmd_cut(A):
    sr = int(run(['ffprobe', '-v', 'error', '-select_streams', 'a:0', '-show_entries', 'stream=sample_rate', '-of', 'csv=p=0', A.src], text=True).stdout.strip() or 44100)
    af = []
    if A.pitch and A.pitch != 1: af += [f'asetrate={int(sr * A.pitch)}', f'aresample={sr}']   # đổi tông theo ĐÚNG sample rate gốc
    if A.echo: af.append('aecho=0.8:0.6:120|260:0.35|0.2')
    seg = ['-ss', str(A.t0)] if A.t0 else []
    if A.t1: seg += ['-to', str(A.t1)]
    dur = (A.t1 or float(run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', A.src], text=True).stdout)) - (A.t0 or 0)
    if A.pitch and A.pitch != 1: dur /= A.pitch
    if A.fade_in: af.append(f'afade=t=in:st=0:d={A.fade_in}')
    if A.fade_out: af.append(f'afade=t=out:st={max(0, dur - A.fade_out):.3f}:d={A.fade_out}')
    cmd = ['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *seg, '-i', A.src] + (['-af', ','.join(af)] if af else []) + ['-ar', '44100', '-b:a', '160k', A.dst]
    r = run(cmd, text=True)
    if r.returncode: sys.exit(r.stderr)
    cmd_measure(argparse.Namespace(file=A.dst))

def cmd_measure(A):
    I, P = loudness(A.file); an = analyze(A.file); key = os.path.splitext(os.path.basename(A.file))[0]
    print(f"✅ {A.file}: {an['dur']}s · onset {an['onset']}s · to nhất {an['peak_t']}s · giọng {int(an['voice'] * 100)}%")
    print(f"   SND_LUFS → {key}:[{I}, {P}]" + (f"   ·  SND_ONSET (phim) → {key}:{an['onset']}" if an['onset'] >= 0.1 else ''))

ap = argparse.ArgumentParser(); sp = ap.add_subparsers(dest='cmd', required=True)
a = sp.add_parser('search'); a.add_argument('query'); a.add_argument('--n', type=int, default=8); a.add_argument('--out', default='sfx-find')
a = sp.add_parser('cut'); a.add_argument('src'); a.add_argument('dst'); a.add_argument('--from', dest='t0', type=float); a.add_argument('--to', dest='t1', type=float)
a.add_argument('--fade-in', type=float); a.add_argument('--fade-out', type=float); a.add_argument('--pitch', type=float); a.add_argument('--echo', action='store_true')
a = sp.add_parser('measure'); a.add_argument('file')
A = ap.parse_args(); {'search': cmd_search, 'cut': cmd_cut, 'measure': cmd_measure}[A.cmd](A)
