// 🎞️ Xuất phim Meme Cinema ra file MP4 (30fps, có tiếng) — vẽ TỪNG KHUNG offline nên không giật/lag như quay màn hình.
// Cần: node + playwright (chromium) + ffmpeg. Chạy trong thư mục repo:
//   node tools/render-cine.js war   out.mp4            → bản dọc 9:16 (1080×1920)
//   node tools/render-cine.js war   out.mp4 --wide     → bản ngang 16:9 (1920×1080)
//   thêm --4k để vẽ thẳng 3840×2160 (16:9) / 2160×3840 (9:16)
//   thêm --from 40 --to 60 để xuất thử 1 đoạn (giây) · --jobs 6 = số tiến trình vẽ SONG SONG (mặc định 6; chia phim thành nhiều đoạn rồi ghép)
const { chromium } = require('playwright');
const { spawn, execFileSync } = require('child_process');
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2), film = args[0] || 'war', OUT = path.resolve(args[1] || `cine-${film}.mp4`);
const WIDE = args.includes('--wide'), K4 = args.includes('--4k'), RK = K4 ? 2 : 1, FPS = 30, SUB = 2;   // SUB: số bước mô phỏng / khung (hạt, rung… chạy theo nhịp 60Hz như lúc xem)
const opt = k => { const i = args.indexOf(k); return i >= 0 ? parseFloat(args[i + 1]) : null; };
const PART = args.includes('--part'), JOBS = Math.max(1, opt('--jobs') || 6);
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.gif': 'image/gif', '.mp3': 'audio/mpeg', '.ogg': 'audio/ogg', '.wav': 'audio/wav', '.woff2': 'font/woff2', '.ttf': 'font/ttf' };

(async () => {
  // 1) máy chủ tĩnh tạm thời
  const srv = http.createServer((q, r) => { const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0])).replace(/\/$/, '/index.html');
    fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); r.end(d); }); });
  await new Promise(r => srv.listen(0, '127.0.0.1', r)); const PORT = srv.address().port;
  const W = (WIDE ? 1920 : 1080) * RK, H = (WIDE ? 1080 : 1920) * RK;
  const br = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
  const pg = await br.newPage({ viewport: WIDE ? { width: 1280, height: 720 } : { width: 720, height: 1280 } });
  pg.on('pageerror', e => console.log('⚠️', e.message.slice(0, 160)));
  await pg.goto(`http://127.0.0.1:${PORT}/`);
  await pg.waitForFunction(() => !document.getElementById('bootScreen'), null, { timeout: 300000 });
  // 2) mở phim ở chế độ offline (không tiếng, không chạy theo đồng hồ)
  await pg.evaluate(async ({ film, WIDE, RK }) => { const fn = { war: 'playCineWar' }[film]; window[fn]({ wide: WIDE, offline: true, scale: RK }); }, { film, WIDE, RK });
  await pg.waitForFunction(() => window._cineWarStep && window._cineWarCanvas && window._cineWarCanvas(), null, { timeout: 60000 });
  await pg.waitForFunction(() => [...document.images].every(i => i.complete), null, { timeout: 60000 }).catch(() => {});
  await pg.waitForTimeout(3000);   // chờ ảnh phim tải xong
  const info = await pg.evaluate(() => { const I = _cineWarInfo(); const src = {}, lufs = {};
    for (const s of I.sfx) { const a = AUDIO_SAMPLES[s[1]]; if (a) src[s[1]] = new URL(a.src, location.href).pathname; if (SND_LUFS[s[1]]) lufs[s[1]] = SND_LUFS[s[1]]; }
    return { ...I, src, lufs, music: [...SND_MUSIC] }; });
  const T0 = opt('--from') || 0, T1 = Math.min(info.dur, opt('--to') || info.dur), N = Math.ceil((T1 - T0) * FPS);
  const F0 = PART ? opt('--f0') : 0, F1 = PART ? opt('--f1') : N;
  if (!PART) console.log(`🎬 ${film} ${WIDE ? '16:9' : '9:16'} ${W}×${H} · ${(T1 - T0).toFixed(1)}s · ${N} khung · ${JOBS} tiến trình`);
  const t0 = Date.now(), tmpV = PART ? OUT : OUT + '.video.mp4';
  if (!PART && JOBS > 1) {   // 🚀 chia đều số khung cho nhiều tiến trình chạy song song, mỗi tiến trình ra 1 đoạn video → ghép lại không nén lại
    await br.close(); srv.close();
    const per = Math.ceil(N / JOBS), parts = [];
    await Promise.all([...Array(JOBS).keys()].map(j => { const a = j * per, b = Math.min(N, a + per); if (a >= b) return null; const f = `${OUT}.part${j}.mp4`; parts.push([j, f]);
      const run = () => new Promise(res => { const c = spawn(process.execPath, [__filename, film, f, '--part', '--f0', a, '--f1', b, '--from', T0, '--to', T1, ...(WIDE ? ['--wide'] : []), ...(K4 ? ['--4k'] : [])], { stdio: ['ignore', 'inherit', 'inherit'], env: process.env }); c.on('close', res); });
      return (async () => { for (let k = 0; k < 3; k++) { if (await run() === 0) return; console.log(`  ↻ đoạn ${j} lỗi, chạy lại (${k + 1})`); } throw new Error('part ' + j + ' failed'); })(); }));   // đoạn nào lỗi (vd tải trang chậm) thì tự chạy lại
    parts.sort((x, y) => x[0] - y[0]); const lst = OUT + '.parts.txt'; fs.writeFileSync(lst, parts.map(([, f]) => `file '${f.replace(/'/g, "'\\''")}'`).join('\n'));
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', lst, '-c', 'copy', tmpV], { stdio: 'inherit' });
    for (const [, f] of parts) fs.unlinkSync(f); fs.unlinkSync(lst);
  } else {
  // 3) hình: vẽ từng khung → đẩy JPEG vào ffmpeg
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-s', `${W}x${H}`, tmpV], { stdio: ['pipe', 'inherit', 'inherit'] });
  const RS = T0 + F0 / FPS;
  if (RS > 0) for (let R = Math.max(0, RS - 1); R < RS; R += 1 / 60) await pg.evaluate(R => _cineWarStep(R), R);   // làm ấm hạt/hiệu ứng trước điểm bắt đầu
  for (let i = F0; i < F1; i++) {
    const R = T0 + i / FPS;
    const b64 = await pg.evaluate(({ R, SUB, FPS }) => { for (let s = SUB - 1; s >= 0; s--) _cineWarStep(R - s / (FPS * SUB)); return _cineWarCanvas().toDataURL('image/jpeg', 0.93).split(',')[1]; }, { R, SUB, FPS });
    if (!ff.stdin.write(Buffer.from(b64, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    if ((i - F0) % 150 === 0) console.log(`  ${PART ? `[đoạn ${F0}-${F1}] ` : ''}khung ${i - F0}/${F1 - F0} · ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
  await br.close(); srv.close();
  if (PART) return;
  }
  // 4) tiếng: trộn lại đúng lịch SFX + nhạc nền (chuẩn hoá -14 LUFS y như trong game)
  const lufsGain = k => { const m = info.lufs[k]; if (!m) return 1; return Math.max(0.05, Math.min(8, Math.pow(10, (-14 - m[0]) / 20))); };
  const inputs = [], filters = []; let n = 0;
  const musOn = R => info.mus.some(m => R >= m.ra && R < m.rb);
  for (const [R, k, v, d] of info.sfx) { if (R < T0 - 0.05 || R >= T1 || !info.src[k]) continue;
    let gn = v * lufsGain(k); if (!info.music.includes(k) && musOn(R)) gn *= 0.75;
    inputs.push('-i', path.join(ROOT, info.src[k]));
    filters.push(`[${n+1}:a]${d ? `atrim=0:${d},` : ''}volume=${gn.toFixed(3)},adelay=${Math.round((R - T0) * 1000)}|${Math.round((R - T0) * 1000)},aformat=channel_layouts=stereo[a${n}]`); n++; }
  for (const m of info.mus) { const a = Math.max(m.ra, T0), b = Math.min(m.rb, T1); if (b <= a) continue;
    const off = a - m.ra + (m.off || 0), len = b - a;
    inputs.push(...(m.loop ? ['-stream_loop', '-1'] : []), '-i', path.join(ROOT, m.src));
    let f = `[${n+1}:a]atrim=${off.toFixed(3)}:${(off + len).toFixed(3)},asetpts=PTS-STARTPTS,volume=${m.vol}`;
    if (m.fi && a - m.ra < m.fi) f += `,afade=t=in:st=0:d=${(m.fi - (a - m.ra)).toFixed(3)}`;
    if (m.fo && m.rb <= T1) f += `,afade=t=out:st=${Math.max(0, len - m.fo).toFixed(3)}:d=${m.fo}`;
    for (const [sa, sb] of info.slow) if (sb > a && sa < b) f += `,volume=enable='between(t,${(sa - a).toFixed(3)},${(sb - a).toFixed(3)})':volume=0.55`;   // slow-mo: nhạc lặng xuống
    filters.push(f + `,adelay=${Math.round((a - T0) * 1000)}|${Math.round((a - T0) * 1000)},aformat=channel_layouts=stereo[a${n}]`); n++; }
  const mix = filters.join(';') + ';' + [...Array(n).keys()].map(i => `[a${i}]`).join('') + `amix=inputs=${n}:normalize=0:dropout_transition=0,alimiter=limit=0.95,atrim=0:${(T1 - T0).toFixed(3)}[out]`;
  const tmpF = OUT + '.filter.txt'; fs.writeFileSync(tmpF, mix);
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', tmpV, ...inputs, '-filter_complex_script', tmpF, '-map', '0:v', '-map', '[out]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', OUT], { stdio: 'inherit' });
  fs.unlinkSync(tmpV); fs.unlinkSync(tmpF);
  console.log(`✅ ${OUT}  (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
})();
