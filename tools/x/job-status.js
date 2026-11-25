// 📊 Ghi TRẠNG THÁI việc đang chạy cho trang theo dõi Studio (tools/x/fan-studio.js, http://localhost:8790).
//   require('./x/job-status.js')('match', OUT)  → từ đó mọi console.log của công cụ cũng được ghi vào out/status/<kind>.json
//   (40 dòng cuối + pid + giờ bắt đầu). Ghi tối đa ~1.4 lần/giây, file nhỏ → KHÔNG làm chậm việc quay.
//   kind: 'film' | 'match' | 'commenter' (3 mảng việc chính của anh, 25/11).
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', '..'), DIR = path.join(ROOT, 'out', 'status');
module.exports = function jobStatus(kind, out, extra) {
  fs.mkdirSync(DIR, { recursive: true });
  const F = path.join(DIR, kind + '.json');
  const ST = Object.assign({ kind, tool: path.basename(process.argv[1] || ''), pid: process.pid, out: out || null, args: process.argv.slice(2).join(' '),
    phase: 'đang chạy', started: Date.now(), log: [] }, extra || {});
  let last = 0;
  const save = force => { const n = Date.now(); if (!force && n - last < 700) return; last = n; ST.at = n;
    try { fs.writeFileSync(F + '.tmp', JSON.stringify(ST)); fs.renameSync(F + '.tmp', F); } catch (e) {} };
  const set = (p, force) => { Object.assign(ST, p); save(force); };
  const _log = console.log;
  console.log = (...a) => { _log(...a); const s = a.map(x => typeof x === 'string' ? x : (() => { try { return JSON.stringify(x); } catch (e) { return String(x); } })()).join(' ');
    if (!s.startsWith('⚠️')) { for (const ln of s.split('\n')) { ST.log.push(ln); if (ST.log.length > 40) ST.log.shift(); }
      if (/^✅/.test(s)) ST.phase = 'xong'; } save(); };
  process.on('exit', code => { if (ST.phase !== 'xong' && ST.phase !== 'lỗi') ST.phase = code ? 'lỗi' : 'xong'; ST.exit = code; save(true); });
  save(true);
  return { ST, set, save, dir: DIR, live: path.join(DIR, kind + '-live.jpg') };
};
