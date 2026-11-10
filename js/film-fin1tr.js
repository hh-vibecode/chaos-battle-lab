// Trailer dọc 9:16 của Meme Lore Final Part 1 — CODE nằm ở js/film-fin1.js (đăng ký phim fin1tr cạnh fin1c1..c3).
// Tệp này chỉ để playCineKit('fin1tr') / tools/render-cine.js fin1tr tìm thấy phim.
(function(){ if(window.CineKit && CineKit.films.fin1tr) return; const v=window.GAME_VERSION?'?v='+GAME_VERSION.build:'', s=document.createElement('script'); s.src='js/film-fin1.js'+v; document.body.appendChild(s); })();
