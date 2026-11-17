// Image -> 3D model (.glb) through the public TRELLIS demo on Hugging Face (no account; Mac + Windows, Node >= 22).
//   node tools/x/img23d.js --src assets/avatars/doge/rageAvatarUrl.webp --out assets/3d/doge.glb [--seed 0] [--space https://trellis-community-trellis.hf.space]
// The image is UPLOADED to Hugging Face (public demo) - only use public meme images, never private / company data.
// Free GPU quota per IP is limited: if it fails with a quota / queue error, wait and retry, or log in on the site.
const fs = require('fs'), path = require('path');
const args = process.argv.slice(2), opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
// --model hunyuan (default, Tencent Hunyuan3D-2, free public demo) | trellis (TRELLIS community demo)
const MODEL = opt('--model', 'hunyuan');
const SPACE = opt('--space', MODEL === 'trellis' ? 'https://trellis-community-trellis.hf.space' : 'https://tencent-hunyuan3d-2.hf.space'), SRC = opt('--src'), OUT = opt('--out');
if (!SRC || !OUT) { console.error('usage: --src <image> --out <file.glb>'); process.exit(2); }
let API = SPACE + '/gradio_api';   // gradio 4.x; older apps serve the API at the root (detected below)
const fd = p => ({ path: p, meta: { _type: 'gradio.FileData' } });

async function upload(file) {
  const form = new FormData(); form.append('files', new Blob([fs.readFileSync(file)]), path.basename(file));
  const r = await fetch(API + '/upload', { method: 'POST', body: form }); if (!r.ok) throw new Error('upload ' + r.status);
  return (await r.json())[0];
}
// every step must run in the SAME session (the app keeps per-session state/dirs) -> gradio queue protocol with one session_hash
const SESSION = Math.random().toString(36).slice(2, 13); let CFG = null;
async function call(name, data) {
  if (!CFG) CFG = await (await fetch(SPACE + '/config')).json();
  const fn = CFG.dependencies.findIndex(d => d.api_name === name.replace(/^\//, '')); if (fn < 0) throw new Error('no endpoint ' + name);
  const j = await fetch(`${API}/queue/join`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data, event_data: null, fn_index: fn, trigger_id: CFG.dependencies[fn].id ?? null, session_hash: SESSION }) });
  if (!j.ok) throw new Error(`${name} join ${j.status} ${await j.text()}`);
  const s = await fetch(`${API}/queue/data?session_hash=${SESSION}`), rd = s.body.getReader(), dec = new TextDecoder(); let buf = '';
  for (;;) { const { value, done } = await rd.read(); if (done) break; buf += dec.decode(value, { stream: true });
    let k; while ((k = buf.indexOf('\n\n')) >= 0) { const line = buf.slice(0, k).replace(/^data: ?/, ''); buf = buf.slice(k + 2); let m; try { m = JSON.parse(line); } catch (e) { continue; }
      if (m.msg === 'estimation' && m.rank != null) process.stdout.write(`  queue #${m.rank}\r`);
      if (m.msg === 'process_completed') { rd.cancel().catch(() => {}); if (!m.success) throw new Error(`${name} failed: ${JSON.stringify(m.output).slice(0, 400)}`); return m.output.data; } } }
  throw new Error(name + ': stream ended without result');
}
(async () => {
  const t0 = Date.now(); console.log('upload', SRC);
  if (!(await fetch(API + '/info').catch(() => ({ ok: false }))).ok) API = SPACE;
  const up = await upload(SRC);
  let glb, res;
  if (MODEL === 'trellis') {
    try { await call('start_session', []); } catch (e) {}
    console.log('preprocess (background removal)...');
    const [pre] = await call('preprocess_image', [fd(up)]);
    console.log('generate 3D (can take 1-3 min)...');
    res = await call('generate_and_extract_glb', [pre, [], +opt('--seed', 0), 7.5, 12, 3.0, 12, 'stochastic', 0.95, 1024]);
    glb = res[2] || res[1];
  } else {
    // Hunyuan3D-2. args: caption, image, mv front/back/left/right, steps, guidance, seed, octree, remove bg, chunks, random seed
    // --shape-only: geometry only (no texture) - the texture step of the public demo is sometimes broken; game colours it with toon shading anyway
    const a = [null, fd(up), null, null, null, null, 30, 5.0, +opt('--seed', 1234), +opt('--octree', 160), true, 8000, false];   // --octree: 256 = rất chi tiết (~500k mặt, 8MB), 160 = nhẹ hơn nhiều cho phim
    if (!args.includes('--shape-only')) { console.log('generate textured 3D (can take 1-4 min)...');
      try { res = await call('generation_all', a); glb = res[1] && (res[1].path || res[1].url) ? res[1] : res[0]; } catch (e) { console.log('  texture step failed (' + e.message.slice(0, 120) + ') -> shape only'); } }
    if (!glb) { console.log('generate 3D shape (can take 1-3 min)...'); res = await call('shape_generation', a); glb = res[0]; }
  }
  if (args.includes('--debug')) console.log(JSON.stringify(res).slice(0, 1500));
  if (glb && glb.value) glb = glb.value;   // some apps wrap the file in {value: FileData}
  const url = glb.url || `${API}/file=${glb.path}`;
  const fr = await fetch(url); if (!fr.ok) throw new Error(`download ${fr.status} ${url}`);
  const b = Buffer.from(await fr.arrayBuffer()); if (b.length < 1000) throw new Error(`downloaded file too small (${b.length} B) from ${url}`);
  fs.mkdirSync(path.dirname(path.resolve(OUT)), { recursive: true }); fs.writeFileSync(OUT, b);
  const vid = res[0] && (res[0].video || res[0]); if (vid && (vid.url || vid.path)) { const v = Buffer.from(await (await fetch(vid.url || `${API}/file=${vid.path}`)).arrayBuffer()); fs.writeFileSync(OUT.replace(/\.glb$/i, '') + '.preview.mp4', v); }
  console.log(`saved ${OUT} (${(b.length / 1024).toFixed(0)} KB) in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
})().catch(e => { console.error('ERROR ' + e.message); process.exit(1); });
