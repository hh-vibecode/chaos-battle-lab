// Mở đầu bản YouTube (intro kênh) của Final Part 1 — CODE nằm ở js/film-fin1.js (file đó đăng ký cảnh fin1yt..fin1c3 + tập fin1).
// Tệp này chỉ để playCineKit('fin1yt') / tools/render-cine.js fin1yt (xuất RIÊNG cảnh này) tìm thấy phim.
(function(){ if(window.CineKit && CineKit.films.fin1yt) return; const v=window.GAME_VERSION?'?v='+GAME_VERSION.build:'', s=document.createElement('script'); s.src='js/film-fin1.js'+v; document.body.appendChild(s); })();
