// Drive a headless Edge/Chrome page through the DevTools protocol (Mac + Windows, no npm deps, Node >= 22).
//   node tools/x/cdp.js --steps steps.txt --out <dir> [--port 9455] [--launch] [--url http://127.0.0.1:8765/] [--profile <dir>]
//   node tools/x/cdp.js --stop [--profile <dir>]          -> close ONLY the browser this tool launched
// Steps file, one command per line ('#' = comment). Every JS command must be ONE line:
//   eval <js>              evaluate (promises awaited), print result
//   evalsave <name> <js>   js returns 'data:image/png;base64,...' -> <out>/<name>.png
//   shot <name>            page screenshot -> <out>/<name>.png
//   wait <seconds>
//   reload                 reload bypassing HTTP cache + service worker, wait until the game finished booting
//   goto <path|url>        open another page of the same server (e.g. tools/x/view3d.html?src=assets/3d/doge.glb)
//   waitfor <js>           poll until the expression is truthy (max 2 min), e.g. waitfor window.__ready
// Dialogs (alert/confirm) are auto-accepted and printed.
// WARNING: another session's browser may already own a debug port (9333 seen taken). --launch refuses a busy port;
//          never drive a browser you did not start.
const fs = require('fs'), path = require('path'), os = require('os'), { spawn, execSync } = require('child_process');
const args = process.argv.slice(2), opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; }, has = k => args.includes(k);
const PORT = +opt('--port', 9455), URL0 = opt('--url', 'http://127.0.0.1:8765/'), OUT = path.resolve(opt('--out', '.'));
const PROFILE = path.resolve(opt('--profile', path.join(os.tmpdir(), 'cbl-browser-profile'))), PIDF = path.join(PROFILE, 'cbl-pid.txt');
const sleep = ms => new Promise(r => setTimeout(r, ms));

function browserPath() {
  const c = process.platform === 'win32'
    ? ['C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe', 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe']
    : ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge', '/Applications/Chromium.app/Contents/MacOS/Chromium'];
  const p = c.find(f => fs.existsSync(f)); if (!p) throw new Error('no Edge/Chrome found'); return p;
}
async function portBusy() { try { const r = await fetch(`http://127.0.0.1:${PORT}/json/version`, { signal: AbortSignal.timeout(1500) }); return r.ok; } catch (e) { return false; } }
function stop() {
  if (!fs.existsSync(PIDF)) return console.log('no test browser recorded');
  const pid = +fs.readFileSync(PIDF, 'utf8');
  try { if (process.platform === 'win32') execSync(`taskkill /PID ${pid} /T /F`, { stdio: 'ignore' }); else process.kill(-pid, 'SIGTERM'); } catch (e) { try { process.kill(pid); } catch (e2) {} }
  fs.rmSync(PIDF, { force: true }); console.log('stopped test browser pid', pid);
}

async function main() {
  if (has('--stop')) return stop();
  fs.mkdirSync(OUT, { recursive: true });
  if (has('--launch')) {
    if (await portBusy()) throw new Error(`port ${PORT} already in use by another browser - pick another port`);
    fs.mkdirSync(PROFILE, { recursive: true });
    const ch = spawn(browserPath(), ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROFILE}`, '--window-size=1280,1000',
      '--autoplay-policy=no-user-gesture-required', '--no-first-run', '--mute-audio', '--disable-background-timer-throttling',
      '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows', URL0], { detached: true, stdio: 'ignore' });
    ch.unref(); fs.writeFileSync(PIDF, String(ch.pid));
    for (let i = 0; i < 40 && !(await portBusy()); i++) await sleep(250);
    await sleep(1500);
  }
  const tabs = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
  const tab = tabs.find(t => t.type === 'page' && t.url.startsWith(URL0)); if (!tab) throw new Error(`no page with url ${URL0} on port ${PORT}`);
  const ws = new WebSocket(tab.webSocketDebuggerUrl); await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let id = 0; const pend = new Map();
  const send = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  ws.onmessage = ev => { const m = JSON.parse(ev.data);
    if (m.method === 'Page.javascriptDialogOpening') { console.log(`DIALOG[${m.params.type}]: ${m.params.message}`); ws.send(JSON.stringify({ id: ++id, method: 'Page.handleJavaScriptDialog', params: { accept: true } })); return; }
    if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } };
  const ev = async js => { const r = await send('Runtime.evaluate', { expression: js, awaitPromise: true, returnByValue: true, timeout: 120000 });
    if (r.result && r.result.exceptionDetails) return 'EXC: ' + JSON.stringify(r.result.exceptionDetails).slice(0, 600);
    return r.result && r.result.result ? r.result.result.value : JSON.stringify(r.error || r); };
  await send('Page.enable');
  for (const raw of fs.readFileSync(opt('--steps'), 'utf8').split(/\r?\n/)) {
    const line = raw.trim(); if (!line || line.startsWith('#')) continue;
    const sp = line.indexOf(' '), cmd = sp < 0 ? line : line.slice(0, sp), rest = sp < 0 ? '' : line.slice(sp + 1);
    if (cmd === 'eval') { console.log('> ' + rest.slice(0, 80)); console.log(await ev(rest)); }
    else if (cmd === 'evalsave') { const s2 = rest.indexOf(' '), nm = rest.slice(0, s2), v = await ev(rest.slice(s2 + 1));
      if (typeof v === 'string' && v.startsWith('data:image/png;base64,')) { fs.writeFileSync(path.join(OUT, nm + '.png'), Buffer.from(v.slice(22), 'base64')); console.log('saved ' + nm); } else console.log('evalsave fail: ' + v); }
    else if (cmd === 'shot') { const r = await send('Page.captureScreenshot', { format: 'png' }); fs.writeFileSync(path.join(OUT, rest + '.png'), Buffer.from(r.result.data, 'base64')); console.log('shot ' + rest); }
    else if (cmd === 'wait') await sleep(parseFloat(rest) * 1000);
    else if (cmd === 'goto') { await send('Page.navigate', { url: new URL(rest, new URL(URL0).origin + '/').href }); await sleep(800); for (let k = 0; k < 60; k++) { if (await ev('document.readyState') === 'complete') break; await sleep(500); } console.log('goto ' + rest); }
    else if (cmd === 'waitfor') { let v; for (let k = 0; k < 240; k++) { v = await ev(rest); if (v && !String(v).startsWith('EXC')) break; await sleep(500); } console.log('waitfor -> ' + v); }   // waitfor <js expression> (truthy, tối đa 2 phút)
    else if (cmd === 'reload') { await send('Network.enable'); await send('Network.setBypassServiceWorker', { bypass: true }); await send('Network.setCacheDisabled', { cacheDisabled: true }); await send('Page.reload', { ignoreCache: true });
      let v = 'wait'; for (let k = 0; k < 150 && v !== 'ready'; k++) { await sleep(2000); v = await ev("(typeof roster!=='undefined' && typeof goToBattle==='function' && !document.getElementById('bootScreen')) ? 'ready' : 'wait'"); }
      await send('Network.disable'); console.log('reloaded ' + v); }
    else console.log('unknown command: ' + cmd);
  }
  ws.close(); process.exit(0);
}
main().catch(e => { console.error('ERROR ' + e.message); process.exit(1); });
