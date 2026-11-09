// Cảnh 1 của Meme Lore Final Part 1 — CODE nằm ở js/film-fin1.js (file đó đăng ký cảnh fin1c1..fin1c3 + tập fin1).
// Tệp này chỉ để playCineKit('fin1c1') / tools/render-cine.js fin1c1 (xuất RIÊNG cảnh này) tìm thấy phim.
(function(){ if(window.CineKit && CineKit.films.fin1c1) return; const v=window.GAME_VERSION?'?v='+GAME_VERSION.build:'', s=document.createElement('script'); s.src='js/film-fin1.js'+v; document.body.appendChild(s); })();
