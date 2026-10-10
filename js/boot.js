// ===================== 📦 BỘ NẠP GAME =====================
// Chạy TRƯỚC game.js. Làm 3 việc:
//  1. Màn hình tải: chỉ chờ phần THIẾT YẾU (code, logo, font, tiếng đánh chung, VFX chung, ảnh nhỏ màn chọn) rồi vào game.
//  2. Tải lười: ảnh/tiếng của từng nhân vật (js/asset-groups.js) CHƯA tải cho tới khi nhân vật đó được tạo vào trận
//     (ASSETS.loadChar trong constructor Fighter) — chơi tới đâu tải tới đấy.
//  3. Tải ngầm: vào game xong thì lặng lẽ tải dần các nhóm còn lại (nhân vật nào được chọn thì chen lên đầu hàng).
// Ảnh: chặn ở setter img.src (đường dẫn thuộc nhóm chưa mở → ghi nhớ, chưa tải). Tiếng: preload 'none' tới khi mở nhóm.
// 🔒 CHẾ ĐỘ CHỈ CHƠI: bản online (github.io…) ẩn + chặn mọi công cụ chỉnh sửa — nội dung game chỉ sửa ở project rồi đẩy lên.
//    Chạy ở máy (localhost / 127.0.0.1) thì vẫn đủ công cụ để kiểm tra.
window.PLAY_ONLY = !/^(localhost|127\.0\.0\.1|\[::1\]|)$/.test(location.hostname);
if(window.PLAY_ONLY) document.documentElement.classList.add('play-only');
(function(){
  const GROUP = window.ASSET_GROUP || {};
  const DEPS = { arabiccat:['windguy'] };          // nhân vật mượn đồ của nhân vật khác (Arabic Cat hoá gà bằng gà của Wind Guy)
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

  // ---- màn hình tải ----
  const screen = document.getElementById('bootScreen'), bar = document.getElementById('bootBar'), pctEl = document.getElementById('bootPct'), tipEl = document.getElementById('bootTip');
  const TIPS = ['Warming up the memes…','Teaching Gigachad to blink…','Polishing the genie lamp…','Refilling Flex Seal…','Untangling Loooong Cat…','Calming down Calm Dog…','Sharpening the chainsaw…'];
  let shown = 0, codeDone = false, tipI = 0;
  const tipT = setInterval(() => { tipI = (tipI+1) % TIPS.length; if(tipEl) tipEl.textContent = TIPS[tipI]; }, 1800);
  function paint(){
    const target = codeDone ? 0.15 + 0.85 * (crit.total ? crit.done/crit.total : 0) : Math.min(0.14, shown + 0.004);
    shown = Math.max(shown, target);
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
    setTimeout(background, 800);
  }
  // 🏷️ số bản + giờ cập nhật (index.html → window.GAME_VERSION, do tools/release.py ghi) — hiện ở màn hình tải + menu chính
  const V = window.GAME_VERSION;
  if(V){ const txt = 'Ver ' + V.build + ' · Updated ' + V.at; for(const id of ['bootVer','mmVersion']){ const el = document.getElementById(id); if(el) el.textContent = txt; } }
  const s = document.createElement('script'); s.src = 'js/game.js' + (V ? '?v=' + V.build : '');   // ?v= → bản mới luôn tải code mới, không lẫn code cũ trong bộ nhớ đệm
  s.onload = async () => {
    codeDone = true;
    try{ await (window._gameBootP || Promise.resolve()); }catch(e){}
    const t0 = performance.now();
    while(crit.done < crit.total && performance.now() - t0 < 45000) await new Promise(r => setTimeout(r, 100));
    finish();
  };
  s.onerror = () => { if(tipEl) tipEl.textContent = 'Could not load the game. Refresh to try again.'; };
  document.body.appendChild(s);
})();
