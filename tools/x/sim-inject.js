// ⚡ GIẢ LẬP TRẬN NHANH trong trang game (nạp bởi tools/x/sim.js qua cdp.js — Windows + Mac, không cần playwright / ffmpeg).
// Đồng hồ ẢO (performance.now / Date.now / rAF / setTimeout chạy theo __vt) → trận chạy nhanh hết mức máy cho phép, không chờ giờ thật.
// seed cố định → cùng seed ra cùng trận (như render-match). Tiếng: không phát thật (play() trả về luôn).
// fast: tắt các lệnh VẼ lên canvas chính (logic trận giữ nguyên) → nhanh hơn nhiều; KHÔNG dùng fast khi cần chụp hình.
(() => {
  if (window.__sim) return;
  const RT = { setTimeout: window.setTimeout.bind(window), now: performance.now.bind(performance) };   // giờ THẬT (để nhường luồng cho ảnh tải)
  const S = window.__sim = { ok: false, fast: false };
  let rs = 1; const rnd = () => { rs = (rs + 0x6D2B79F5) >>> 0; let t = rs; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  S.setup = () => {
    if (S.ok) return; S.ok = true;
    Math.random = rnd;
    window.__vt = 0; const p0 = performance.now(), d0 = Date.now(); performance.now = () => p0 + __vt * 1000; Date.now = () => d0 + Math.round(__vt * 1000);
    window.__raf = new Map(); let rid = 0; window.requestAnimationFrame = cb => { __raf.set(++rid, cb); return rid; }; window.cancelAnimationFrame = i => { __raf.delete(i); };
    window.__tm = []; let tid = 1e6;
    window.setTimeout = (fn, ms, ...a) => { const id = ++tid; if (typeof fn === 'function') __tm.push({ id, at: __vt + (+ms || 0) / 1000, fn, a }); return id; };
    window.setInterval = (fn, ms, ...a) => { const id = ++tid; if (typeof fn === 'function') __tm.push({ id, at: __vt + Math.max(16, +ms || 0) / 1000, fn, a, rep: Math.max(16, +ms || 0) / 1000 }); return id; };
    window.clearTimeout = window.clearInterval = id => { const i = __tm.findIndex(t => t.id === id); if (i >= 0) __tm.splice(i, 1); };
    const P = HTMLMediaElement.prototype; P.play = function () { return Promise.resolve(); };   // 🔇 không phát tiếng thật
  };
  // tắt / bật lệnh vẽ của canvas chính (ctx là const toàn cục của game)
  const DRAW = ['drawImage', 'fill', 'stroke', 'fillRect', 'strokeRect', 'fillText', 'strokeText', 'putImageData'];
  S.setFast = on => { S.fast = !!on; for (const k of DRAW) { if (on) ctx[k] = () => {}; else delete ctx[k]; } };
  const step = n => { for (let k = 0; k < n; k++) {
    __tm.sort((a, b) => a.at - b.at || a.id - b.id);
    while (__tm.length && __tm[0].at <= __vt) { const t = __tm.shift(); if (t.rep) __tm.push({ ...t, at: t.at + t.rep }); try { t.fn(...t.a); } catch (e) {} }
    const q = [...__raf.values()]; __raf.clear(); for (const cb of q) { try { cb(performance.now()); } catch (e) { (S.errs || (S.errs = [])).push(String(e && e.message || e).slice(0, 160)); } }
    __vt += 1 / 60; } };
  const yieldReal = ms => new Promise(r => RT.setTimeout(r, ms || 0));
  const idx = k => roster.findIndex(c => c.charKey === k);
  // 1 trận A vs B. o: {seed, max (giây ảo), fast, force: 'js chạy sau khi vào trận' }
  S.run = async (A, B, o = {}) => {
    S.setup(); S.setFast(!!o.fast); S.errs = [];
    if (idx(A) < 0 || idx(B) < 0) return { err: 'không thấy nhân vật ' + A + ' / ' + B };
    rs = (o.seed >>> 0) || 1;
    picks = [idx(A), idx(B)];
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active')); document.getElementById('selectScreen').classList.add('active');
    goToBattle();
    for (let i = 0; i < 40; i++) { step(6); await yieldReal(15); }   // ảnh / tiếng của 2 meme tải về (giờ thật) trong lúc màn giới thiệu chạy
    rs = (o.seed >>> 0) || 1;
    startGame('instant');
    if (o.force) { try { (0, eval)(o.force); } catch (e) { S.errs.push('force: ' + e.message); } }
    // 🎯 BÙ NHÌN đo dame (anh 26/11): đối thủ bất tử, KHÔNG skill, đi lại như meme thường, chạm vào thì đánh 40 / 0.8s (để meme có chiêu phản / chiêu khi bị đánh vẫn kích)
    if (o.dummy) { const d = fighters.find(f => f.slotIdx === 1); if (d) { d.type = '__dummy__'; d.maxHp = d.hp = 1e7; d._dmCD = 30;
      d.doAbility = function () { if (--this._dmCD > 0) return; const e = this.enemy; if (e && !e.dead && Math.hypot(e.x - this.x, e.y - this.y) < this.size + (e.size || 20) + MELEE_REACH) { e.takeDamage(40, this); this._dmCD = 48; } }; } }
    // ♾️ CẢ 2 BẤT TỬ (anh 27/11): meme đấu đối thủ THẬT (đủ skill), cả 2 vô hạn máu, đánh đủ --max giây → đếm dame meme gây ra (~1000 / 22–26s = đạt)
    const _imm = () => { for (const f of fighters) { if (f.maxHp < 1e6) { f.maxHp = 1e7; f.hp = 1e7; } else if (f.hp < 5e6) f.hp = 1e7; } };
    if (o.immortal) _imm();
    const t0 = RT.now(), v0 = __vt, max = o.max || 90; let koAt = null;
    while (__vt - v0 < max) {
      step(o.immortal ? 6 : 120); if (o.immortal) _imm(); await yieldReal(0);
      const dead = fighters.some(f => f.dead);
      if (dead && koAt == null) koAt = __vt - v0;
      if (!o.dummy && koAt != null && __vt - v0 > koAt + 0.2) break;
      if (o.dummy && fighters.find(f => f.slotIdx === 0 && f.dead)) break;
    }
    const hp = fighters.map(f => [f.type, Math.max(0, Math.round(f.hp)), f.maxHp, !!f.dead]);
    const a = fighters.find(f => f.slotIdx === 0), b = fighters.find(f => f.slotIdx === 1);
    let win = null; if (a && b) { if (a.dead && !b.dead) win = B; else if (b.dead && !a.dead) win = A; else if (!a.dead && !b.dead) win = (a.hp / a.maxHp >= b.hp / b.maxHp ? A : B) + '?'; }
    const dealt = Math.round((_matchStats[0] && _matchStats[0].dmg) || 0);
    return { A, B, seed: o.seed, dealt, win, t: +(koAt != null ? koAt : __vt - v0).toFixed(1), hp, realSec: +((RT.now() - t0) / 1000).toFixed(1), errs: S.errs.slice(0, 4), extra: o.extra ? (() => { try { return (0, eval)(o.extra); } catch (e) { return 'extra: ' + e.message; } })() : undefined };
  };
})();
