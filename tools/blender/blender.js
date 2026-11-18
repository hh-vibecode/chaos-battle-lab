// 🧊 Chạy script Blender KHÔNG GIAO DIỆN, tự tìm Blender trên Windows / Mac (luồng VFX mô phỏng — docs/notes/luong-phim-blender.md)
//   node tools/blender/blender.js boom_sim -- --out <thư mục> [--frames 90 --res 128 --px 384 --pal fire]
//   node tools/blender/blender.js --where          (in đường dẫn Blender đang dùng)
// Windows không có node: ELECTRON_RUN_AS_NODE=1 "D:/Microsoft VS Code/Code.exe" tools/blender/blender.js …
const fs = require('fs'), path = require('path'), { spawnSync } = require('child_process');
function find() {
  if (process.env.BLENDER && fs.existsSync(process.env.BLENDER)) return process.env.BLENDER;
  const c = [];
  if (process.platform === 'win32') { try { for (const d of fs.readdirSync('D:/tools')) if (/^blender-5\.2/.test(d)) c.push('D:/tools/' + d + '/blender.exe'); } catch (e) {} }
  else c.push('/Applications/Blender.app/Contents/MacOS/Blender', path.join(process.env.HOME || '', 'Applications/Blender.app/Contents/MacOS/Blender'), '/opt/homebrew/bin/blender', '/usr/local/bin/blender');
  return c.sort().reverse().find(p => fs.existsSync(p));
}
const B = find(), a = process.argv.slice(2);
if (!B) { console.error('❌ Không thấy Blender 5.2 LTS. Cài theo docs/notes/luong-phim-blender.md mục 2 (hoặc đặt biến BLENDER=<đường dẫn>).'); process.exit(2); }
if (a[0] === '--where' || !a.length) { console.log(B); process.exit(0); }
const script = path.join(__dirname, a[0].replace(/\.py$/, '') + '.py'); if (!fs.existsSync(script)) { console.error('không có ' + script); process.exit(2); }
const rest = a.slice(1); if (rest[0] === '--') rest.shift();
const r = spawnSync(B, ['-b', '-P', script, '--', ...rest], { stdio: 'inherit' });
process.exit(r.status == null ? 2 : r.status);
