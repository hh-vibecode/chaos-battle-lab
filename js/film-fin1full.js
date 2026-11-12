// 🎬 Meme Lore · FINAL · Part 1 — TẬP ĐẦY ĐỦ (12/11/2026): nối mọi cảnh thành 1 tập, xếp ĐẦU thư mục "Final · Part 1" (trước các cảnh lẻ)
//   phố bình yên (fin1c1) → Friend phá thành phố (fin1c2) → nóc nhà Meowkatsuki (fin1c3) → cảnh nối: dấu vô hạn, cột sáng guardian (fin1c5)
//   → Ninja vs Berserk (fin1f3, kính vỡ) → Bat vs Pop + Huh trên cầu treo (fin1f2, lỗ vòng khói) → Chud vs Buff Doge ở công viên (fin1f1, đường hầm) → Gojo vs Pain (fin1c4)
//   K.seq chỉ phát nhạc của CHÍNH nó → gom nhạc nền từng cảnh (def.mus) dời theo giây bắt đầu cảnh đó. Thêm / bớt cảnh: sửa PARTS.
(function(){
  if(!window.CineKit || CineKit.films.fin1full) return;
  const BASE=((document.currentScript&&document.currentScript.src)||'js/film-fin1full.js').replace(/film-[^\/]*$/,''), V=window.GAME_VERSION?'?v='+GAME_VERSION.build:'';
  const K=CineKit;
  // tải đồng bộ file phim còn thiếu (mỗi file tự tải phần phụ: thành phố, biên đạo…)
  for(const [id,f] of [['fin1','film-fin1.js'],['fin1c5','film-fin1c5.js'],['fin1f3','film-fin1f3.js'],['fin1f2','film-fin1f2.js'],['fin1f1','film-fin1f1.js'],['fin1c4','film-fin1c4.js']])
    if(!K.films[id]){ try{ const x=new XMLHttpRequest(); x.open('GET',BASE+f+V,false); x.send(); (0,eval)(x.responseText); }catch(e){ console.warn('fin1full: không tải được '+f,e); } }
  const PARTS=['fin1c1','fin1c2','fin1c3','fin1c5','fin1f3','fin1f2','fin1f1','fin1c4'].filter(p=>K.films[p]);
  // nhạc: nhạc chung của 3 cảnh đầu (seq 'fin1', giây tính từ đầu tập) + nhạc riêng từng cảnh sau, dời theo giây bắt đầu
  const mus=[]; const F1=K.films.fin1; if(F1&&F1.def&&F1.def.mus) mus.push(...F1.def.mus);
  let off=0; for(const p of PARTS){ const f=K.films[p], I=f.info(); if(!['fin1c1','fin1c2','fin1c3'].includes(p)) for(const m of (I.mus||[])) mus.push(Object.assign({},m,{ra:m.ra+off,rb:m.rb+off})); off+=I.dur; }
  K.seq({ id:'fin1full', title:'Meme Lore · Final · Part 1 (full episode)', VW:960, VH:540, parts:PARTS, mus });
})();
