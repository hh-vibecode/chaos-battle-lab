// 🎞️ Xuất phim Meme Cinema ra file MP4 (30fps, có tiếng) — vẽ TỪNG KHUNG offline nên không giật/lag như quay màn hình.
// Cần: node + playwright (chromium) + ffmpeg. Chạy trong thư mục repo:
//   node tools/render-cine.js war   out.mp4            → bản dọc 9:16 (1080×1920)
//   node tools/render-cine.js war   out.mp4 --wide     → bản ngang 16:9 (1920×1080)
//   thêm --intro boss.mp4 để ghép 1 đoạn mở đầu (vd trận Boss Raid quay bằng tools/render-boss.js) lên ĐẦU video
//   thêm --4k để vẽ thẳng 3840×2160 (16:9) / 2160×3840 (9:16) · --scale 1.5 = 3K (1620×2880 dọc)
//   node tools/render-cine.js l2e2 out.mp4 --scale 1.5   → Meme Lore 2 tập 2 (chỉ có bản dọc 9:16)
//   thêm --from 40 --to 60 để xuất thử 1 đoạn (giây) · --jobs 6 = số tiến trình vẽ SONG SONG (mặc định 6; chia phim thành nhiều đoạn rồi ghép)
const { chromium } = require('playwright');
const { spawn, execFileSync } = require('child_process');
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2), film = args[0] || 'war', OUT = path.resolve(args[1] || `cine-${film}.mp4`);
const WIDE = args.includes('--wide'), K4 = args.includes('--4k'), FPS = 30, SUB = 2;
const _sc = (() => { const i = args.indexOf('--scale'); return i >= 0 ? parseFloat(args[i + 1]) : null; })(), RK = K4 ? 2 : (_sc || 1);
const FILMS = { war: { play: 'playCineWar', step: '_cineWarStep', canvas: '_cineWarCanvas', info: '_cineWarInfo' },
  l2e2: { play: 'playCineL2E2', step: '_cineL2E2Step', canvas: '_cineL2E2Canvas', info: '_cineL2E2Info', ready: '_cineL2E2Ready' },
  l2e3: { play: 'playCineL2E3', step: '_cineL2E3Step', canvas: '_cineL2E3Canvas', info: '_cineL2E3Info', ready: '_cineL2E3Ready' } }, FM = FILMS[film] || { kit: film };   // phim khác = phim CINE-KIT (js/film-<id>.js)   // SUB: số bước mô phỏng / khung (hạt, rung… chạy theo nhịp 60Hz như lúc xem)
const opt = k => { const i = args.indexOf(k); return i >= 0 ? parseFloat(args[i + 1]) : null; };
const sopt = k => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; }, INTRO = sopt('--intro') ? path.resolve(sopt('--intro')) : null;
const PART = args.includes('--part'), JOBS = Math.max(1, opt('--jobs') || 3);   // ⚠️ anh dặn: chạy NHIỀU tiến trình làm MacBook vừa LAG vừa LÂU hơn → mặc định 3 (trước là 6). Đừng tăng nếu anh không yêu cầu.
const TSTART = Date.now(), WEBC = args.includes('--webcodecs');
// --webcodecs : trình duyệt tự nén H.264 bằng phần cứng (WebCodecs → VideoToolbox) → bỏ hẳn khâu JPEG 4K + chuyển ~10MB base64/khung + ffmpeg nén lại.
//               Tự kiểm hỗ trợ; không có thì quay về cách JPEG cũ (in ra '↩').
// ⚡ TĂNG TỐC (thêm 28/10/2026):
//   --cache        : cắt phim thành đoạn CỐ ĐỊNH (--chunk giây, mặc định 20) lưu ở <out>.chunks/ và GIỮ LẠI → lần xuất sau đoạn nào còn thì dùng lại
//   --redo 80-95   : (đi kèm --cache) chỉ quay lại các đoạn chạm khoảng giây đó (nhiều khoảng: 10-20,80-95 · 'all' = quay lại hết)
//                    → sửa 1 cảnh chỉ quay lại ~20–40s phim thay vì cả phim. Sửa thứ ảnh hưởng CẢ phim (nhạc nền chung, hàm vẽ chung…) thì --redo all.
//   --hw           : (chỉ macOS) nén bằng VideoToolbox thay libx264 → CPU dành hết cho việc vẽ, nhanh hơn rõ khi chạy 6 tiến trình
const CACHE = args.includes('--cache'), CHUNK = opt('--chunk') || 20, REDO = sopt('--redo');
const HW = args.includes('--hw') && process.platform === 'darwin';
const VENC = HW ? ['-c:v', 'h264_videotoolbox', '-b:v', '30M', '-maxrate', '40M', '-bufsize', '60M', '-allow_sw', '1'] : ['-c:v', 'libx264', '-preset', 'medium', '-crf', '18'];
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.gif': 'image/gif', '.mp3': 'audio/mpeg', '.ogg': 'audio/ogg', '.wav': 'audio/wav', '.woff2': 'font/woff2', '.ttf': 'font/ttf' };

(async () => {
  // 1) máy chủ tĩnh tạm thời
  const srv = http.createServer((q, r) => { const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0])).replace(/\/$/, '/index.html');
    fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); r.end(d); }); });
  await new Promise(r => srv.listen(0, '127.0.0.1', r)); const PORT = srv.address().port;
  const W = Math.round((WIDE ? 1920 : 1080) * RK), H = Math.round((WIDE ? 1080 : 1920) * RK);
  const br = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
  const pg = await br.newPage({ viewport: WIDE ? { width: 1280, height: 720 } : { width: 720, height: 1280 } });
  pg.on('pageerror', e => console.log('⚠️', e.message.slice(0, 160)));
  await pg.goto(`http://127.0.0.1:${PORT}/`);
  await pg.waitForFunction(() => !document.getElementById('bootScreen'), null, { timeout: 300000 });
  // 2) mở phim ở chế độ offline (không tiếng, không chạy theo đồng hồ)
  if (FM.kit) {   // 🎬 CINE-KIT: tải bộ khung + phim, gắn tên hàm chuẩn để phần dưới dùng chung
    await pg.evaluate(async ({ id, WIDE, RK }) => { await playCineKit(id, { wide: WIDE, offline: true, scale: RK }); const f = CineKit.films[id];
      window.__ckStep = f.step; window.__ckCanvas = f.canvas; window.__ckInfo = f.info; window.__ckReady = f.ready; }, { id: FM.kit, WIDE, RK });
    Object.assign(FM, { step: '__ckStep', canvas: '__ckCanvas', info: '__ckInfo', ready: '__ckReady' });
  } else await pg.evaluate(async ({ FM, WIDE, RK }) => { window[FM.play]({ wide: WIDE, offline: true, scale: RK }); }, { FM, WIDE, RK });
  await pg.waitForFunction(FM => window[FM.step] && window[FM.canvas] && window[FM.canvas]() && (!FM.ready || window[FM.ready]()), FM, { timeout: 120000 });
  await pg.waitForFunction(() => [...document.images].every(i => i.complete), null, { timeout: 60000 }).catch(() => {});
  await pg.waitForTimeout(3000);   // chờ ảnh phim tải xong
  const info = await pg.evaluate(FM => { const I = window[FM.info](); const src = {}, lufs = {};
    for (const s of I.sfx) { const a = AUDIO_SAMPLES[s[1]]; if (a) src[s[1]] = new URL(a.src, location.href).pathname; if (SND_LUFS[s[1]]) lufs[s[1]] = SND_LUFS[s[1]]; }
    return { ...I, src, lufs, music: [...SND_MUSIC] }; }, FM);
  const T0 = opt('--from') || 0, T1 = Math.min(info.dur, opt('--to') || info.dur), N = Math.ceil((T1 - T0) * FPS);
  const F0 = PART ? opt('--f0') : 0, F1 = PART ? opt('--f1') : N;
  if (!PART) console.log(`🎬 ${film} ${WIDE ? '16:9' : '9:16'} ${W}×${H} · ${(T1 - T0).toFixed(1)}s · ${N} khung · ${JOBS} tiến trình`);
  const t0 = Date.now(), tmpV = PART ? OUT : OUT + '.video.mp4';
  if (!PART && (JOBS > 1 || CACHE)) {   // 🚀 chia đều số khung cho nhiều tiến trình chạy song song, mỗi tiến trình ra 1 đoạn video → ghép lại không nén lại
    await br.close(); srv.close();
    const per = CACHE ? Math.round(CHUNK * FPS) : Math.ceil(N / JOBS), NP = Math.ceil(N / per), parts = [];
    const CDIR = OUT + '.chunks'; if (CACHE) fs.mkdirSync(CDIR, { recursive: true });
    const partFile = (j, a, b) => CACHE ? path.join(CDIR, `${film}-${W}x${H}-from${T0}-f${a}-${b}${WEBC ? '-wc' : HW ? '-hw' : ''}.mp4`) : `${OUT}.part${j}.mp4`;
    if (CACHE && REDO) {   // xoá đúng các đoạn chạm khoảng cần quay lại
      const rs = REDO === 'all' ? [[-1e9, 1e9]] : REDO.split(',').map(s => s.split('-').map(Number));
      for (let j = 0; j < NP; j++) { const a = j * per, b = Math.min(N, a + per), sa = T0 + a / FPS, sb = T0 + b / FPS, f = partFile(j, a, b);
        if (rs.some(([x, y]) => sb > x && sa < y) && fs.existsSync(f)) { fs.unlinkSync(f); console.log(`  ✂ quay lại đoạn ${sa.toFixed(0)}–${sb.toFixed(0)}s`); } } }
    const CONC = opt('--conc') || JOBS; let live = 0; const q = []; const slot = () => new Promise(r => { if (live < CONC) { live++; r(); } else q.push(r); }), free = () => { live--; if (q.length) { live++; q.shift()(); } };   // --conc: số tiến trình chạy CÙNG LÚC (ít hơn số đoạn → khỏi tràn RAM)
    const doneOK = (f, n) => { try { const c = execFileSync('ffprobe', ['-v', 'error', '-count_packets', '-select_streams', 'v:0', '-show_entries', 'stream=nb_read_packets', '-of', 'csv=p=0', f]).toString().trim().replace(',', ''); return +c === n; } catch (e) { return false; } };
    await Promise.all([...Array(NP).keys()].map(j => { const a = j * per, b = Math.min(N, a + per); if (a >= b) return null; const f = partFile(j, a, b); parts.push([j, f]);
      if ((CACHE || args.includes('--keep')) && fs.existsSync(f) && doneOK(f, b - a)) { console.log(`  ✔ giữ đoạn ${j} (đã xuất xong)`); return null; }   // --keep / --cache: đoạn đã xuất đủ khung thì dùng lại
      const run = () => new Promise(res => { const c = spawn(process.execPath, [__filename, film, f, '--part', '--f0', a, '--f1', b, '--from', T0, '--to', T1, ...(WIDE ? ['--wide'] : []), ...(K4 ? ['--4k'] : []), ...(_sc ? ['--scale', _sc] : []), ...(HW ? ['--hw'] : []), ...(WEBC ? ['--webcodecs'] : [])], { stdio: ['ignore', 'inherit', 'inherit'], env: process.env }); c.on('close', res); });
      return (async () => { await slot(); try { for (let k = 0; k < 3; k++) { if (await run() === 0) return; console.log(`  ↻ đoạn ${j} lỗi, chạy lại (${k + 1})`); } throw new Error('part ' + j + ' failed'); } finally { free(); } })(); }));   // đoạn nào lỗi (vd tải trang chậm) thì tự chạy lại
    parts.sort((x, y) => x[0] - y[0]); const lst = OUT + '.parts.txt'; fs.writeFileSync(lst, parts.map(([, f]) => `file '${f.replace(/'/g, "'\\''")}'`).join('\n'));
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', lst, '-c', 'copy', tmpV], { stdio: 'inherit' });
    if (!CACHE) for (const [, f] of parts) fs.unlinkSync(f); fs.unlinkSync(lst);   // --cache: giữ các đoạn cho lần xuất sau
  } else {
  const RS = T0 + F0 / FPS, tBoot = (Date.now() - TSTART) / 1000, tag = PART ? `[đoạn ${F0}-${F1}] ` : '';
  if (RS > 0) await pg.evaluate(({ RS, FM }) => { for (let R = Math.max(0, RS - 1); R < RS; R += 1 / 60) window[FM.step](R); }, { RS, FM });   // làm ấm hạt/hiệu ứng trước điểm bắt đầu (1 lần gọi thay vì 60)
  let tDraw = 0, tPipe = 0, useWC = false;
  if (WEBC) useWC = await pg.evaluate(async ({ W, H, FPS }) => {   // 3a) thử WebCodecs H.264 phần cứng
    if (!window.VideoEncoder) return false;
    let cfg = null;   // phần cứng trước (VideoToolbox), không có thì nén phần mềm của trình duyệt (đã đo trên Windows: 4K ~85ms/khung, vẫn rẻ hơn JPEG + chuyển 10MB + x264)
    for (const hw of ['prefer-hardware', 'no-preference']) { const c = { codec: 'avc1.640033', width: W, height: H, bitrate: W * H > 4e6 ? 40e6 : 24e6, framerate: FPS, hardwareAcceleration: hw, avc: { format: 'annexb' } };
      try { if ((await VideoEncoder.isConfigSupported(c)).supported) { cfg = c; break; } } catch (e) {} }
    if (!cfg) return false;
    window.__wcOut = []; window.__wcErr = null;
    window.__wcEnc = new VideoEncoder({ output: ch => { const b = new Uint8Array(ch.byteLength); ch.copyTo(b); __wcOut.push(b); }, error: e => { __wcErr = String(e); } });
    __wcEnc.configure(cfg);
    window.__wcTake = () => { const n = __wcOut.reduce((a, b) => a + b.length, 0), all = new Uint8Array(n); let o = 0; for (const b of __wcOut) { all.set(b, o); o += b.length; } __wcOut = [];
      let s = ''; for (let j = 0; j < all.length; j += 0x8000) s += String.fromCharCode.apply(null, all.subarray(j, j + 0x8000)); return btoa(s); };
    return true; }, { W, H, FPS });
  if (WEBC && !useWC) console.log(`  ↩ ${tag}trình duyệt không nén H.264 được → dùng cách JPEG`);
  if (useWC) {
    // 3b) WebCodecs: mỗi lần gọi vẽ + nén 8 khung ngay trong trình duyệt, chỉ chuyển về dữ liệu H.264 đã nén (vài chục KB/khung)
    const raw = tmpV + '.h264', out = fs.openSync(raw, 'w'), B = 8;
    for (let i = F0; i < F1; i += B) { const n = Math.min(B, F1 - i), ta = Date.now();
      const b64 = await pg.evaluate(async ({ i, n, T0, F0, SUB, FPS, FM }) => { const cv = window[FM.canvas]();
        for (let k = 0; k < n; k++) { const R = T0 + (i + k) / FPS; for (let s = SUB - 1; s >= 0; s--) window[FM.step](R - s / (FPS * SUB));
          const vf = new VideoFrame(cv, { timestamp: Math.round((i + k - F0) * 1e6 / FPS) }); __wcEnc.encode(vf, { keyFrame: (i + k - F0) % 60 === 0 }); vf.close();
          while (__wcEnc.encodeQueueSize > 4) await new Promise(r => setTimeout(r, 1)); }
        if (__wcErr) throw new Error(__wcErr); return __wcTake(); }, { i, n, T0, F0, SUB, FPS, FM });
      const tb = Date.now(); tDraw += tb - ta; fs.writeSync(out, Buffer.from(b64, 'base64')); tPipe += Date.now() - tb;
      if ((i - F0) % 40 === 0) console.log(`  ${tag}khung ${i - F0}/${F1 - F0} · ${((Date.now() - t0) / 1000).toFixed(0)}s`); }
    fs.writeSync(out, Buffer.from(await pg.evaluate(async () => { await __wcEnc.flush(); if (__wcErr) throw new Error(__wcErr); return __wcTake(); }), 'base64')); fs.closeSync(out);
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'h264', '-framerate', String(FPS), '-i', raw, '-c', 'copy', '-r', String(FPS), tmpV], { stdio: 'inherit' }); fs.unlinkSync(raw);
  } else {
  // 3) hình: vẽ từng khung → đẩy JPEG vào ffmpeg
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', ...VENC, '-pix_fmt', 'yuv420p', '-s', `${W}x${H}`, tmpV], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = F0; i < F1; i++) {
    const R = T0 + i / FPS, ta = Date.now();
    const b64 = await pg.evaluate(({ R, SUB, FPS, FM }) => { for (let s = SUB - 1; s >= 0; s--) window[FM.step](R - s / (FPS * SUB)); return window[FM.canvas]().toDataURL('image/jpeg', 0.93).split(',')[1]; }, { R, SUB, FPS, FM });
    const tb = Date.now(); tDraw += tb - ta;
    if (!ff.stdin.write(Buffer.from(b64, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    tPipe += Date.now() - tb;
    if ((i - F0) % 10 === 0) console.log(`  ${tag}khung ${i - F0}/${F1 - F0} · ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
  }
  { const nf = Math.max(1, F1 - F0);   // 📊 đo để biết chậm ở đâu: boot · vẽ(+nén JPEG hoặc WebCodecs) · đẩy sang ffmpeg/ghi file
    console.log(`  ⏱️ ${tag}${useWC ? 'WebCodecs' : 'JPEG'} · boot ${tBoot.toFixed(0)}s · vẽ ${(tDraw / nf).toFixed(0)}ms/khung · đẩy ${(tPipe / nf).toFixed(0)}ms/khung · tổng ${((Date.now() - TSTART) / 1000).toFixed(0)}s`); }
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
    filters.push(`[${n+1}:a]${d ? `atrim=0:${d},` : ''}volume=${gn.toFixed(3)},adelay=${Math.max(0, Math.round((R - T0) * 1000))}|${Math.max(0, Math.round((R - T0) * 1000))},aformat=channel_layouts=stereo[a${n}]`); n++; }
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
  if (INTRO && fs.existsSync(INTRO)) {   // 🎬 ghép đoạn mở đầu (đã tự tối dần ở cuối) + phim (tự hiện dần từ đen) — đưa về cùng cỡ khung/khung hình/tần số
    const tmpO = OUT + '.film.mp4'; fs.renameSync(OUT, tmpO);
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', INTRO, '-i', tmpO, '-filter_complex',
      `[0:v]scale=${W}:${H}:flags=lanczos,fps=${FPS},setsar=1,format=yuv420p[v0];[1:v]fps=${FPS},setsar=1,format=yuv420p[v1];[0:a]aresample=48000,aformat=channel_layouts=stereo[a0];[1:a]aresample=48000,aformat=channel_layouts=stereo[a1];[v0][a0][v1][a1]concat=n=2:v=1:a=1[v][a]`,
      '-map', '[v]', '-map', '[a]', ...VENC, '-c:a', 'aac', '-b:a', '192k', OUT], { stdio: 'inherit' });
    fs.unlinkSync(tmpO); console.log(`🎬 đã ghép đoạn mở đầu ${path.basename(INTRO)}`); }
  console.log(`✅ ${OUT}  (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
})();
