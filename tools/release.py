#!/usr/bin/env python3
"""Phát hành bản mới lên GitHub Pages: tăng số bản, ghi giờ cập nhật (giờ máy, Việt Nam), gắn ?v= cho css/js, commit + push.
Cách dùng:  python3 tools/release.py "Mô tả ngắn thay đổi"   (chạy trong thư mục repo)"""
import re, sys, subprocess, datetime, os
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
msg = sys.argv[1] if len(sys.argv) > 1 else 'Update'
s = open('index.html', encoding='utf-8').read()
m = re.search(r'window\.GAME_VERSION=\{build:(\d+),at:"[^"]*"\}', s); assert m, 'không thấy GAME_VERSION trong index.html'
n = int(m.group(1)) + 1
at = datetime.datetime.now().strftime('%H:%M · %d/%m/%Y')
s = s[:m.start()] + f'window.GAME_VERSION={{build:{n},at:"{at}"}}' + s[m.end():]
s = re.sub(r'(\.(?:css|js))\?v=\d+', rf'\1?v={n}', s)
open('index.html', 'w', encoding='utf-8').write(s)
# 📦 danh sách MỌI file tài nguyên + mã băm + dung lượng → boot.js tải đủ về máy lần đầu, bản sau chỉ tải lại file đã đổi
import hashlib, json
files = {}
for root, _, fs in os.walk('assets'):
    for f in sorted(fs):
        if f.startswith('.'): continue
        fp = os.path.join(root, f); rel = fp.replace(os.sep, '/')
        files[rel] = [hashlib.md5(open(fp, 'rb').read()).hexdigest()[:12], os.path.getsize(fp)]
open('assets-manifest.json', 'w').write(json.dumps({'v': n, 'files': files}, separators=(',', ':')))
subprocess.run(['git', 'add', '-A'], check=True)
subprocess.run(['git', 'commit', '-q', '-m', f'Ver {n}: {msg}\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>'], check=True)
subprocess.run(['git', 'push', '-q'], check=True)
print(f'Đã đẩy Ver {n} ({at})')
