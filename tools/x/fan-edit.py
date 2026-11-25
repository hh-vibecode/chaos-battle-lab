#!/usr/bin/env python3
# ✂️ EDIT 1 tập Commenter vs 3 Random Memes theo kiểu anh (skill tap-commenter mục 3) — chỉ ffmpeg + Pillow, không cần CapCut.
#   python3 tools/x/fan-edit.py spec.json
# spec.json:
# { "rec": "out/fan/x.mp4",               # bản quay render-fan.js (bánh quay + trận, có tiếng game)
#   "comment": "assets/fan-comments/<key>.png", "taunt": "can bro solo my 3 random memes", "taunt_style": "red" | "black",
#   "intro": 3.5,                         # giây mở đầu (màn đen + comment + nhãn)
#   "intro_sfx": [["~/Desktop/#memesource/vine-boom.mp3", 0.05, 1.0], ...],   # [file, giây, âm lượng]
#   "label_at": 1.0,                      # nhãn khiêu khích hiện lúc nào
#   "inserts": [                          # mốc "at" = giây trong bản QUAY (không tính intro)
#     {"at": 5.2, "kind": "full", "media": "...mp4|gif|jpg|mov", "ss": 0, "dur": 1.8, "caption": "bro ...", "sound": "self" | "<file>", "svol": 1.0, "key": false},
#     {"at": 30.1, "kind": "sticker", "media": "...mov", "dur": 2.0, "pos": "br", "h": 0.42, "key": true, "sound": "self"} ],
#   "out": "~/Desktop/Meme Battles/x.mp4" }
#  • full    = CẮT CHEN: bản quay DỪNG lại, meme full màn (giữ tỉ lệ, viền đen 2 bên) + thẻ chữ trắng chữ đen, rồi quay tiếp đúng chỗ đó
#              → không che mất kết quả bánh quay. Tiếng game tạm ngưng, chỉ còn tiếng meme.
#  • sticker = dán đè lên bản quay (phông xanh tách nền), bánh vẫn thấy; tiếng meme trộn chung tiếng game.
import json, os, subprocess, sys, tempfile, shutil, re
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
FONT = os.path.join(os.path.dirname(__file__), 'fonts', 'Montserrat.ttf')
W, H, FPS, SR = 1920, 1080, 50, 48000
X = lambda p: os.path.expanduser(p) if p else p

def font(sz, w='ExtraBold'):
    try:
        f = ImageFont.truetype(FONT, sz); f.set_variation_by_name(w); return f
    except Exception:
        return ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', sz)

def run(cmd):
    if cmd[:1] == ['ffmpeg'] and '-filter_threads' not in cmd: cmd = cmd[:1] + ['-filter_threads', '2'] + cmd[1:]   # 🐢 nhường máy anh (25/11: dựng ăn 640% CPU làm máy đơ)
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode: print(' '.join(cmd)); print(r.stderr[-2000:]); sys.exit(1)
    return r

def dur_of(f):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout.strip() or 0)

def has_audio(f):
    return 'audio' in subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'stream=codec_type', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout

EMOJI_FONT = '/System/Library/Fonts/Apple Color Emoji.ttc'
def _is_emoji(ch): return ord(ch) >= 0x2190 and not ('　' <= ch <= '鿿')
def _runs(s):   # tách chữ thường / emoji
    out = []
    for ch in s:
        e = _is_emoji(ch) or (ch in '️‍' and out and out[-1][0])
        if out and out[-1][0] == e: out[-1][1] += ch
        else: out.append([e, ch])
    return out
def _emoji_img(s, size):
    ef = ImageFont.truetype(EMOJI_FONT, 160); d = ImageDraw.Draw(Image.new('RGBA', (10, 10)))
    w_ = int(d.textlength(s, font=ef)) + 8; im = Image.new('RGBA', (w_, 200), (0, 0, 0, 0))
    ImageDraw.Draw(im).text((4, 10), s, font=ef, embedded_color=True); im = im.crop(im.getbbox() or (0, 0, w_, 200))
    k = size * 0.95 / im.height; return im.resize((max(1, int(im.width * k)), max(1, int(im.height * k))), Image.LANCZOS)
def _tlen(d, s, f, size):
    return sum(d.textlength(t, font=f) if not e else _emoji_img(t, size).width + size * 0.08 for e, t in _runs(s))

def label_png(text, path, style='red', rot=0.0, size=58, maxw=900):
    """thẻ chữ: nền trắng, chữ đỏ/đen đậm (kiểu nhãn CapCut anh dùng), có thể nghiêng; emoji màu"""
    f = font(size)
    words, lines, cur = text.split(), [], ''
    d0 = ImageDraw.Draw(Image.new('RGB', (10, 10)))
    for w_ in words:
        t = (cur + ' ' + w_).strip()
        if _tlen(d0, t, f, size) > maxw and cur: lines.append(cur); cur = w_
        else: cur = t
    lines.append(cur)
    lh = int(size * 1.18); tw = int(max(_tlen(d0, l, f, size) for l in lines))
    padx, pady = int(size * 0.45), int(size * 0.28)
    img = Image.new('RGBA', (tw + 2 * padx, lh * len(lines) + 2 * pady), (255, 255, 255, 255))
    d = ImageDraw.Draw(img); col = (225, 20, 28) if style == 'red' else (10, 10, 10)
    for i, l in enumerate(lines):
        x = (img.width - _tlen(d, l, f, size)) / 2; y = pady + i * lh + int(size * 0.02)
        for e, t in _runs(l):
            if e:
                em = _emoji_img(t, size); img.paste(em, (int(x + size * 0.04), int(y + size * 0.08)), em); x += em.width + size * 0.08
            else:
                d.text((x, y), t, font=f, fill=col); x += d.textlength(t, font=f)
    if rot: img = img.rotate(rot, expand=True, resample=Image.BICUBIC)
    img.save(path); return img.size

def main():
    S = json.load(open(sys.argv[1]))
    tmp = tempfile.mkdtemp(prefix='fanedit_', dir=os.path.join(ROOT, 'out'))
    rec = os.path.join(ROOT, S['rec']) if not os.path.isabs(X(S['rec'])) else X(S['rec'])
    RD = dur_of(rec)
    VENC = ['-threads', '2', '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', '-r', str(FPS)]
    AENC = ['-c:a', 'pcm_s16le', '-ar', str(SR), '-ac', '2']
    segs = []
    # ---------- 1. MỞ ĐẦU: màn đen + dải comment trắng ngang màn + nhãn khiêu khích ----------
    IN = float(S.get('intro', 3.5)); LA = float(S.get('label_at', 1.0))
    com = Image.open(os.path.join(ROOT, S['comment'])).convert('RGB')
    cw = min(1760, com.width); ch = round(com.height * cw / com.width)
    com = com.resize((cw, ch), Image.LANCZOS)
    band_h = ch + 40; band_y = round(H * 0.47 - band_h / 2)
    base = Image.new('RGB', (W, H), (0, 0, 0)); ImageDraw.Draw(base).rectangle([0, band_y, W, band_y + band_h], fill=(255, 255, 255))
    base.paste(com, ((W - cw) // 2, band_y + 20))
    base.save(os.path.join(tmp, 'intro0.png'))
    lp = os.path.join(tmp, 'label.png'); lw, lh = label_png(S.get('taunt', 'can bro solo my 3 random memes'), lp, S.get('taunt_style', 'red'), float(S.get('taunt_rot', 5)), 62, 760)
    b1 = base.copy(); L = Image.open(lp); b1.paste(L, ((W - lw) // 2 - 120, max(10, band_y - lh + 30)), L); b1.save(os.path.join(tmp, 'intro1.png'))
    sfx = S.get('intro_sfx', [])
    cmd = ['ffmpeg', '-y', '-loglevel', 'error', '-loop', '1', '-t', str(LA), '-i', os.path.join(tmp, 'intro0.png'), '-loop', '1', '-t', str(IN - LA), '-i', os.path.join(tmp, 'intro1.png')]
    for f, t, v in sfx: cmd += ['-i', X(f)]
    fc = '[0:v][1:v]concat=n=2:v=1:a=0,fps=%d,format=yuv420p[v];' % FPS
    am = []
    for k, (f, t, v) in enumerate(sfx):
        fc += '[%d:a]aresample=%d,aformat=channel_layouts=stereo,volume=%s,adelay=%d|%d[s%d];' % (k + 2, SR, v, int(t * 1000), int(t * 1000), k); am.append('[s%d]' % k)
    fc += 'anullsrc=r=%d:cl=stereo,atrim=0:%s[sil];' % (SR, IN) + '[sil]' + ''.join(am) + 'amix=inputs=%d:normalize=0:duration=first[a]' % (len(am) + 1)
    p = os.path.join(tmp, 'seg_intro.mkv'); run(cmd + ['-filter_complex', fc, '-map', '[v]', '-map', '[a]', '-t', str(IN)] + VENC + AENC + [p]); segs.append(p)
    # ---------- 2. BẢN QUAY + CHÈN MEME ----------
    ins = sorted(S.get('inserts', []), key=lambda x: x['at'])
    stickers = [x for x in ins if x['kind'] == 'sticker']; fulls = [x for x in ins if x['kind'] == 'full']
    # 2a. dán sticker lên bản quay (1 lần, cả bản)
    rec2 = rec
    if stickers:
        cmd = ['ffmpeg', '-y', '-loglevel', 'error', '-i', rec]; fc = ''; vlast = '[0:v]'; am = ['[0:a]']
        for k, s in enumerate(stickers):
            m = X(s['media']); cmd += ['-ss', str(s.get('ss', 0)), '-t', str(s['dur']), '-i', m]
            hh = int(H * s.get('h', 0.42)); idx = k + 1
            fc += '[%d:v]fps=%d,%sscale=-2:%d,%sformat=yuva420p,setpts=PTS-STARTPTS+%s/TB[st%d];' % (idx, FPS, ('crop=%s,' % s['crop']) if s.get('crop') else '', hh, 'colorkey=0x00FF00:0.36:0.10,despill=type=green:mix=0.6:expand=0.2,' if s.get('key', True) else '', s['at'], k)
            pos = s.get('pos', 'br'); xx = {'br': 'W-w-40', 'bl': '40', 'r': 'W-w-40'}.get(pos, 'W-w-40'); yy = 'H-h' if pos in ('br', 'bl') else '(H-h)/2'
            fc += '%s[st%d]overlay=%s:%s:eof_action=pass:enable=\'between(t,%s,%s)\'[v%d];' % (vlast, k, xx, yy, s['at'], s['at'] + s['dur'], k); vlast = '[v%d]' % k
            snd = s.get('sound', 'self')
            if snd:
                if snd == 'self': src = '[%d:a]' % idx
                else: cmd += ['-i', X(snd)]; src = '[%d:a]' % (len(cmd) and (cmd.count('-i') - 1))
                fc += '%saresample=%d,aformat=channel_layouts=stereo,volume=%s,adelay=%d|%d[sa%d];' % (src, SR, s.get('svol', 1.0), int(s['at'] * 1000), int(s['at'] * 1000), k); am.append('[sa%d]' % k)
        fc += ''.join(am) + 'amix=inputs=%d:normalize=0:duration=first[a]' % len(am)
        rec2 = os.path.join(tmp, 'rec_st.mkv'); run(cmd + ['-filter_complex', fc, '-map', vlast, '-map', '[a]'] + VENC + AENC + [rec2])
    # 2b. cắt bản quay ở mốc full-insert, chen clip meme vào giữa
    cut = 0.0
    for k, s in enumerate(fulls):
        at = s['at']
        if at > cut + 0.02:
            p = os.path.join(tmp, 'seg_r%02d.mkv' % k); run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', '%.3f' % cut, '-to', '%.3f' % at, '-i', rec2] + VENC + AENC + [p]); segs.append(p)
        cut = at
        m = X(s['media']); d = float(s['dur']); ext = m.lower().rsplit('.', 1)[-1]
        cmd = ['ffmpeg', '-y', '-loglevel', 'error']
        if ext in ('jpg', 'jpeg', 'png', 'webp'): cmd += ['-loop', '1', '-t', str(d), '-i', m]
        elif ext == 'gif': cmd += ['-ignore_loop', '0', '-t', str(d), '-i', m]
        else: cmd += ['-stream_loop', '-1', '-ss', str(s.get('ss', 0)), '-t', str(d), '-i', m]
        boxh = H; boxw = W
        crop = ('crop=%s,' % s['crop']) if s.get('crop') else ''
        if s.get('key'):   # phông xanh → tách nền, đặt lên nền ĐEN
            vf = 'color=black:s=%dx%d:r=%d:d=%s[bg];[0:v]fps=%d,%scolorkey=0x00FF00:0.36:0.10,despill=type=green:mix=0.6:expand=0.2,scale=%d:%d:force_original_aspect_ratio=decrease[fg];[bg][fg]overlay=(W-w)/2:H-h:shortest=1,format=yuv420p,setsar=1' % (W, H, FPS, d, FPS, crop, boxw, boxh)
        else:
            vf = '[0:v]fps=%d,%sscale=%d:%d:force_original_aspect_ratio=decrease,pad=%d:%d:(ow-iw)/2:(oh-ih)/2:black,format=yuv420p,setsar=1' % (FPS, crop, boxw, boxh, W, H)
        if s.get('caption'):
            cp = os.path.join(tmp, 'cap%02d.png' % k); cwid, chei = label_png(s['caption'], cp, 'black', 0, 50, 1100)
            cmd += ['-i', cp]; vf += '[mv];[mv][1:v]overlay=(W-w)/2:%s' % s.get('cap_y', 'H*0.80-h/2')
        vf += '[v]'
        ai = None; snd = s.get('sound', 'self')
        if snd == 'self' and has_audio(m): ai = '0:a'
        elif snd and snd != 'self': cmd += ['-i', X(snd)]; ai = '%d:a' % (cmd.count('-i') - 1)
        af = ('[%s]aresample=%d,aformat=channel_layouts=stereo,volume=%s,apad,atrim=0:%s[a]' % (ai, SR, s.get('svol', 1.0), d)) if ai \
            else 'anullsrc=r=%d:cl=stereo,atrim=0:%s[a]' % (SR, d)
        p = os.path.join(tmp, 'seg_m%02d.mkv' % k); run(cmd + ['-filter_complex', vf + ';' + af, '-map', '[v]', '-map', '[a]', '-t', str(d)] + VENC + AENC + [p]); segs.append(p)
    tail_end = S.get('rec_end', RD)
    p = os.path.join(tmp, 'seg_rz.mkv'); run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', '%.3f' % cut, '-to', '%.3f' % tail_end, '-i', rec2] + VENC + AENC + [p]); segs.append(p)
    # ---------- 3. NỐI + CÂN ĐỘ TO −14 LUFS ----------
    lst = os.path.join(tmp, 'list.txt'); open(lst, 'w').write(''.join("file '%s'\n" % s for s in segs))
    cat = os.path.join(tmp, 'cat.mkv'); run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', lst, '-c', 'copy', cat])
    r = subprocess.run(['ffmpeg', '-nostats', '-i', cat, '-vn', '-af', 'ebur128', '-f', 'null', '-'], capture_output=True, text=True)
    mm = re.findall(r'I:\s+(-?[\d.]+) LUFS', r.stderr); g = max(-20, min(10, -14 - float(mm[-1]))) if mm else 0
    out = X(S['out']); os.makedirs(os.path.dirname(out), exist_ok=True)
    run(['ffmpeg', '-y', '-loglevel', 'error', '-i', cat, '-c:v', 'copy', '-af', 'volume=%.2fdB,alimiter=limit=0.89' % g, '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out])
    shutil.rmtree(tmp)
    print('✅ %s  (%.1fs, độ to %+.1f dB → −14 LUFS)' % (out, dur_of(out), g))

if __name__ == '__main__':
    main()
