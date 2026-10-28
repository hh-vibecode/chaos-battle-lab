// Cross-platform release (Mac + Windows) - same steps as tools/release.py, which needs python:
//   bump GAME_VERSION build + time (Vietnam, UTC+7) in index.html, set ?v=<build> on css/js,
//   refresh assets-manifest.json (md5[:12] + size of every file under assets/), commit "Ver N: <msg>", push to main.
// node tools/x/release.js --msg "Short English description" [--author-name "<name>"] [--author-email "<email>"]
//                         [--files a,b,c] [--dry-run] [--no-push]
//   --files : stage ONLY these paths (+ index.html + assets-manifest.json). Omit = 'git add -A' like release.py.
//             Prefer --files when another session may be editing the repo at the same time.
// Manifest keeps the existing key order (hashes refreshed, deleted files dropped, new files appended sorted)
// so players only re-download files that really changed.
const fs = require('fs'), path = require('path'), os = require('os'), crypto = require('crypto'), { execFileSync } = require('child_process');
const args = process.argv.slice(2), opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; }, has = k => args.includes(k);
const ROOT = path.resolve(__dirname, '..', '..'), MSG = opt('--msg');
if (!MSG) { console.error('--msg is required'); process.exit(2); }
const git = (a, o = {}) => execFileSync('git', ['-C', ROOT, ...a], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], ...o }).trim();

git(['fetch', '-q', 'origin']);
const behind = +git(['rev-list', '--count', 'HEAD..origin/main']);
if (behind > 0) { console.error(`local main is ${behind} commit(s) behind origin/main - run: git pull --ff-only origin main`); process.exit(3); }

const ix = path.join(ROOT, 'index.html'); let s = fs.readFileSync(ix, 'utf8');
const m = s.match(/window\.GAME_VERSION=\{build:(\d+),at:"[^"]*"\}/); if (!m) { console.error('GAME_VERSION not found'); process.exit(4); }
const n = +m[1] + 1, vn = new Date(Date.now() + 7 * 3600e3), z = x => String(x).padStart(2, '0');
const at = `${z(vn.getUTCHours())}:${z(vn.getUTCMinutes())} · ${z(vn.getUTCDate())}/${z(vn.getUTCMonth() + 1)}/${vn.getUTCFullYear()}`;
s = s.replace(m[0], `window.GAME_VERSION={build:${n},at:"${at}"}`).replace(/(\.(?:css|js))\?v=\d+/g, `$1?v=${n}`);

const mf = path.join(ROOT, 'assets-manifest.json'), old = fs.readFileSync(mf, 'utf8');
const oldKeys = [...old.matchAll(/"(assets\/[^"]+)":\[/g)].map(x => x[1]);
const all = []; (function walk(d) { for (const e of fs.readdirSync(path.join(ROOT, d), { withFileTypes: true })) {
  const r = d + '/' + e.name; if (e.isDirectory()) walk(r); else if (!e.name.startsWith('.')) all.push(r); } })('assets');
const set = new Set(all), seen = new Set(), order = [];
for (const k of oldKeys) if (set.has(k) && !seen.has(k)) { seen.add(k); order.push(k); }
const added = all.filter(k => !seen.has(k)).sort(); order.push(...added);
const files = {}; for (const k of order) { const b = fs.readFileSync(path.join(ROOT, k)); files[k] = [crypto.createHash('md5').update(b).digest('hex').slice(0, 12), b.length]; }
const removed = oldKeys.length - (order.length - added.length);
console.log(`Ver ${n - 1} -> ${n}  at ${at}   (manifest: ${order.length} files, new: ${added.length}, removed: ${removed})`);
if (added.length) console.log('new files: ' + added.join(', '));
if (has('--dry-run')) { console.log('dry run - nothing written'); process.exit(0); }

fs.writeFileSync(ix, s); fs.writeFileSync(mf, JSON.stringify({ v: n, files }));
const only = (opt('--files', '') || '').split(',').map(x => x.trim()).filter(Boolean);
git(only.length ? ['add', '--', 'index.html', 'assets-manifest.json', ...only] : ['add', '-A']);
console.log(git(['status', '--short']));
const mfile = path.join(os.tmpdir(), `cbl-release-msg-${n}.txt`);
fs.writeFileSync(mfile, `Ver ${n}: ${MSG}\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>\n`);
const id = []; if (opt('--author-name')) id.push('-c', 'user.name=' + opt('--author-name')); if (opt('--author-email')) id.push('-c', 'user.email=' + opt('--author-email'));
try { execFileSync('git', ['-C', ROOT, ...id, 'commit', '-q', '-F', mfile], { stdio: 'inherit' }); }
catch (e) { console.error('git commit failed (no identity on this machine? pass --author-name / --author-email)'); process.exit(5); }
fs.rmSync(mfile, { force: true });
if (!has('--no-push')) execFileSync('git', ['-C', ROOT, 'push', 'origin', 'HEAD:main'], { stdio: 'inherit' });
console.log(git(['log', '--oneline', '-1']));
