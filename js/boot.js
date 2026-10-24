// ===================== 📦 BỘ NẠP GAME =====================
// Chạy TRƯỚC game.js. Làm 3 việc:
//  1. Màn hình tải: tải ĐỦ TOÀN BỘ tài nguyên (assets-manifest.json) về máy + mở hết mọi nhóm ảnh/tiếng rồi mới vào game
//     → vào game là chơi, không còn tải dở giữa trận (user yêu cầu 2026-10-10).
//  2. Lần sau: Service Worker (sw.js) trả file thẳng từ máy; bản mới chỉ tải lại đúng file đã đổi (so mã băm).
//  3. Cơ chế nhóm (js/asset-groups.js) vẫn giữ: phần THIẾT YẾU mở trước, các nhóm còn lại mở ngay sau đó trên màn tải.
// Ảnh: chặn ở setter img.src (đường dẫn thuộc nhóm chưa mở → ghi nhớ, chưa tải). Tiếng: preload 'none' tới khi mở nhóm.
// 🔒 CHẾ ĐỘ CHỈ CHƠI: bản online (github.io…) ẩn + chặn mọi công cụ chỉnh sửa — nội dung game chỉ sửa ở project rồi đẩy lên.
//    Chạy ở máy (localhost / 127.0.0.1) thì vẫn đủ công cụ để kiểm tra.
window.PLAY_ONLY = !/^(localhost|127\.0\.0\.1|\[::1\]|)$/.test(location.hostname);
if(window.PLAY_ONLY) document.documentElement.classList.add('play-only');
(function(){
  const GROUP = window.ASSET_GROUP || {};
  const DEPS = { arabiccat:['windguy'], ninjacat:['samuraicheems'] };          // nhân vật mượn đồ của nhân vật khác (Arabic Cat hoá gà bằng gà của Wind Guy · Ninja Cat mượn tiếng chém ninja_slash của Samurai Cheems)
  const desc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
  const active = new Set(['critical']), pending = {}, queue = [];
  const P = g => pending[g] || (pending[g] = { imgs:[], auds:[] });
  let booted = false; const crit = { total:0, done:0 };
  const waitImg = img => new Promise(r => { if(desc.get.call(img) && img.complete) return r(); img.addEventListener('load', r, {once:true}); img.addEventListener('error', r, {once:true}); });
  const waitAud = a => new Promise(r => { const f = () => r(); if(a.readyState >= 4) return r(); a.addEventListener('canplaythrough', f, {once:true}); a.addEventListener('error', f, {once:true}); setTimeout(f, 8000); });
  const track = p => { crit.total++; p.then(() => { crit.done++; }); };
  Object.defineProperty(HTMLImageElement.prototype, 'src', { configurable:true, enumerable:true,
    get(){ return this._lzUrl !== undefined ? new URL(this._lzUrl, document.baseURI).href : desc.get.call(this); },
    set(v){ const g = GROUP[v];
      if(g && !active.has(g)){ this._lzUrl = v; P(g).imgs.push(this); return; }
      this._lzUrl = undefined; desc.set.call(this, v);
      if(g === 'critical' && !booted) track(waitImg(this)); } });
  function activate(g){
    if(active.has(g)) return Promise.resolve(); active.add(g);
    const p = pending[g]; delete pending[g]; if(!p) return Promise.resolve();
    const ps = [];
    for(const img of p.imgs){ const u = img._lzUrl; if(u === undefined || GROUP[u] !== g) continue; img._lzUrl = undefined; desc.set.call(img, u); ps.push(waitImg(img)); }
    for(const a of p.auds){ a.preload = 'auto'; try{ a.load(); }catch(e){} ps.push(waitAud(a)); }
    return Promise.all(ps);
  }
  let bgRunning = false;
  async function background(){
    if(bgRunning) return; bgRunning = true;
    const rest = Object.keys(pending).sort((a,b) => (a==='misc'?-1:b==='misc'?1:0));
    for(const g of rest) if(!queue.includes(g)) queue.push(g);
    while(queue.length){ const g = queue.shift(); if(active.has(g)) continue; await activate(g); await new Promise(r => setTimeout(r, 120)); }
    bgRunning = false;
  }
  window.ASSETS = {
    regAudio(a, url){ const g = GROUP[url] || 'critical';
      if(active.has(g)){ a.preload = 'auto'; a.src = url; if(g === 'critical' && !booted) track(waitAud(a)); }
      else { a.preload = 'none'; a.src = url; P(g).auds.push(a); } },
    loadChar(type){ const gs = [type, ...(DEPS[type]||[])]; return Promise.all(gs.map(activate)); },
    thumb(url){ return (window.AVATAR_THUMB && AVATAR_THUMB[url]) || url; },
    status(){ return { active:[...active], pending:Object.keys(pending), crit:{...crit} }; },
  };

  // ---- 📦 giữ tài nguyên trong máy (Service Worker) — chỉ bản online; chạy ở máy thì tắt để sửa game không dính file cũ ----
  const USE_SW = 'serviceWorker' in navigator && window.caches && (window.PLAY_ONLY || /[?&]sw=1/.test(location.search));
  if(!USE_SW && 'serviceWorker' in navigator) navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister())).catch(()=>{});
  const pre = { total:0, done:0 };   // số byte cần tải trước khi vào game
  const abs = f => new URL(f, document.baseURI).href;
  async function syncCache(){   // so danh sách file mới với bản cũ trong máy → xoá đúng file đã đổi
    if(!USE_SW) return null;
    try{ navigator.serviceWorker.register('sw.js').catch(()=>{}); }catch(e){}
    let man; try{ man = await (await fetch('assets-manifest.json', { cache:'no-store' })).json(); }catch(e){ return null; }
    const cache = await caches.open('cbl-assets');
    let old = null; try{ const r = await cache.match(abs('__manifest')); if(r) old = await r.json(); }catch(e){}
    const of = (old && old.files) || {};
    await Promise.all(Object.keys(man.files).filter(f => !of[f] || of[f][0] !== man.files[f][0]).map(f => cache.delete(abs(f))));
    for(const f of Object.keys(of)) if(!man.files[f]) cache.delete(abs(f));
    const V0 = window.GAME_VERSION;   // code bản cũ (?v= khác số bản hiện tại) → bỏ
    if(V0) for(const k of await cache.keys()){ const u = new URL(k.url); if(/\.(js|css)$/.test(u.pathname) && u.searchParams.get('v') && u.searchParams.get('v') !== String(V0.build)) cache.delete(k); }
    await cache.put(abs('__manifest'), new Response(JSON.stringify(man), { headers:{ 'Content-Type':'application/json' } }));
    return { man, cache };
  }
  async function preloadAll(sc){   // tải ĐỦ mọi file chưa có trong máy (8 luồng song song)
    if(!sc) return;
    const { man, cache } = sc, need = [];
    for(const f of Object.keys(man.files)){ if(!(await cache.match(abs(f)))) need.push(f); }
    pre.total = need.reduce((t,f) => t + (man.files[f][1]||1), 0) || 0;
    let i = 0;
    const worker = async () => { while(i < need.length){ const f = need[i++];
      try{ const r = await fetch(abs(f), { cache:'no-cache' }); if(r.ok) await cache.put(abs(f), r); }catch(e){}
      pre.done += man.files[f][1]||1; } };
    await Promise.all(Array.from({ length:8 }, worker));
  }
  const all = { total:0, done:0 };   // mở + giải mã MỌI nhóm ảnh/tiếng còn lại trước khi vào game
  async function activateAll(){
    const gs = Object.keys(pending); all.total = gs.length;
    await Promise.all(gs.map(g => activate(g).then(() => { all.done++; })));
  }

  // ---- màn hình tải ----
  const screen = document.getElementById('bootScreen'), bar = document.getElementById('bootBar'), pctEl = document.getElementById('bootPct'), tipEl = document.getElementById('bootTip');
  const TIPS = ['Warming up the memes…','Teaching Gigachad to blink…','Polishing the genie lamp…','Refilling Flex Seal…','Untangling Loooong Cat…','Calming down Calm Dog…','Sharpening the chainsaw…'];
  let shown = 0, codeDone = false, tipI = 0;
  const tipT = setInterval(() => { tipI = (tipI+1) % TIPS.length; if(tipEl) tipEl.textContent = TIPS[tipI]; }, 1800);
  function paint(){
    // 5% code · 70% tải file về máy · 15% phần thiết yếu · 10% mở hết các nhóm
    const fPre = pre.total ? pre.done/pre.total : (codeDone ? 1 : 0), fCrit = crit.total ? crit.done/crit.total : 0, fAll = all.total ? all.done/all.total : 0;
    const target = Math.min(0.99, (codeDone ? 0.05 : 0) + 0.70*fPre + 0.15*fCrit + 0.10*fAll);
    shown = Math.max(shown, Math.min(target, shown + 0.02));
    if(bar) bar.style.width = (shown*100).toFixed(1) + '%';
    if(pctEl) pctEl.textContent = Math.floor(shown*100) + '%';
    if(!booted) requestAnimationFrame(paint);
  }
  requestAnimationFrame(paint);
  function finish(){
    if(booted) return; booted = true; shown = 1;
    if(bar) bar.style.width = '100%'; if(pctEl) pctEl.textContent = '100%';
    clearInterval(tipT);
    if(screen){ screen.classList.add('done'); setTimeout(() => screen.remove(), 600); }
    setTimeout(background, 800);   // (thường đã mở hết rồi — chỉ còn để phòng sót)
  }
  // 🏷️ số bản + giờ cập nhật (index.html → window.GAME_VERSION, do tools/release.py ghi) — hiện ở màn hình tải + menu chính
  const V = window.GAME_VERSION;
  if(V){ const txt = 'Ver ' + V.build + ' · Updated ' + V.at; for(const id of ['bootVer','mmVersion']){ const el = document.getElementById(id); if(el) el.textContent = txt; } }
  (async () => {
    let sc = null; try{ sc = await syncCache(); }catch(e){}   // phải xong TRƯỚC khi game tạo ảnh (không lấy nhầm file cũ)
    const preP = preloadAll(sc).catch(()=>{});
    const s = document.createElement('script'); s.src = 'js/game.js' + (V ? '?v=' + V.build : '');   // ?v= → bản mới luôn tải code mới
    s.onload = async () => {
      codeDone = true;
      try{ await (window._gameBootP || Promise.resolve()); }catch(e){}
      await preP;                                                       // 📦 tải xong TOÀN BỘ file về máy
      const t0 = performance.now();
      while(crit.done < crit.total && performance.now() - t0 < 45000) await new Promise(r => setTimeout(r, 100));
      await Promise.race([activateAll(), new Promise(r => setTimeout(r, 120000))]);   // mở hết mọi nhóm → vào game là chơi, không còn tải dở
      finish();
    };
    s.onerror = () => { if(tipEl) tipEl.textContent = 'Could not load the game. Refresh to try again.'; };
    document.body.appendChild(s);
  })();
})();
