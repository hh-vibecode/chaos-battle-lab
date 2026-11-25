// 🎄 CẢNH GIÁNG SINH cho Commenter Battle (anh dặn 25/11): nền đêm tuyết, cây thông (đèn nháy + sao), người tuyết,
//    hộp quà, tuyết rơi, thỉnh thoảng ông già Noel kéo xe tuần lộc bay ngang trời.
//    2 lớp canvas DOM riêng, KHÔNG đụng canvas trận:
//      · lớp TĨNH (sau sàn): trời, trăng, đồi tuyết, cây thông, người tuyết, quà — vẽ lại khi đổi cỡ cửa sổ / sàn
//      · lớp ĐỘNG (trước sàn, không bắt chuột): tuyết rơi, đèn nháy, sao lấp lánh, xe Noel — 30 khung/giây
//    ⚠️ KHÔNG gọi Math.random (giữ nguyên chuỗi random có seed của trận) — dùng bộ sinh số riêng _rng.
//    Gọi: XmasBg.start(hostEl, arenaEl) lúc vào trận · XmasBg.stop() lúc rời trận.
(function(){
  let host=null, arenaEl=null, cS=null, cD=null, gS=null, gD=null, raf=0, lastT=0, W=0, H=0, R=null, key='';
  let flakes=[], bulbs=[], starPt=null, santa=null, nextSanta=0, seed=20261225;
  const _rng=()=>{ seed=(seed*1664525+1013904223)>>>0; return seed/4294967296; };
  const TAU=Math.PI*2;

  function mk(z){ const c=document.createElement('canvas'); c.className='xmas-layer';
    c.style.cssText=`position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:${z};display:block;`; return c; }

  function start(h, a){
    stop(); host=h; arenaEl=a; if(!host) return;
    cS=mk(0); cD=mk(6); host.insertBefore(cS, host.firstChild); host.appendChild(cD);
    gS=cS.getContext('2d'); gD=cD.getContext('2d');
    seed=20261225; flakes=[]; santa=null; nextSanta=performance.now()+6000;   // xe Noel lần đầu sau ~6s
    key=''; lastT=0; raf=requestAnimationFrame(frame);
  }
  function stop(){
    if(raf) cancelAnimationFrame(raf); raf=0;
    if(cS) cS.remove(); if(cD) cD.remove(); cS=cD=gS=gD=null; host=null; arenaEl=null;
  }

  // ---------- bố cục: lấy đúng chỗ sàn đang nằm để đặt cây / người tuyết vào 2 khoảng trống 2 bên ----------
  function layout(){
    const hr=host.getBoundingClientRect(), vw=Math.round(hr.width), vh=Math.round(Math.max(hr.height, window.innerHeight));
    let ar={left:vw*0.25, right:vw*0.75, top:vh*0.06, bottom:vh*0.94};
    if(arenaEl){ const r=arenaEl.getBoundingClientRect(); if(r.width>10) ar={left:r.left-hr.left, right:r.right-hr.left, top:r.top-hr.top, bottom:r.bottom-hr.top}; }
    const k=[vw,vh,Math.round(ar.left),Math.round(ar.right),Math.round(ar.top)].join(',');
    if(k===key) return; key=k; W=vw; H=vh; R=ar;
    const dpr=Math.min(window.devicePixelRatio||1, 1.5);
    cS.width=Math.round(W*dpr); cS.height=Math.round(H*dpr); gS.setTransform(dpr,0,0,dpr,0,0);
    cD.width=W; cD.height=H;   // lớp động: tuyết + đèn mềm, không cần nét gấp
    buildStatic(); if(!flakes.length) seedFlakes();
  }

  // ---------- LỚP TĨNH ----------
  function buildStatic(){
    const g=gS; bulbs=[]; g.clearRect(0,0,W,H);
    const hz=H*0.70;   // đường chân trời
    let gr=g.createLinearGradient(0,0,0,H); gr.addColorStop(0,'#08122e'); gr.addColorStop(0.45,'#15265a'); gr.addColorStop(0.72,'#2f4682'); gr.addColorStop(1,'#3d5592');
    g.fillStyle=gr; g.fillRect(0,0,W,H);
    const s0=seed; seed=777;
    for(let i=0;i<170;i++){ const x=_rng()*W, y=_rng()*hz*0.95, r=0.5+_rng()*1.1; g.fillStyle=`rgba(225,235,255,${0.25+_rng()*0.5})`; g.beginPath(); g.arc(x,y,r,0,TAU); g.fill(); }
    // 🌕 trăng (góc trên trái, trong khoảng trống bên trái)
    const mx=Math.max(R.left*0.42, 40), my=H*0.15, mr=Math.min(H*0.055, R.left*0.22+8);
    gr=g.createRadialGradient(mx,my,mr*0.6,mx,my,mr*4); gr.addColorStop(0,'rgba(255,246,214,0.35)'); gr.addColorStop(1,'rgba(255,246,214,0)'); g.fillStyle=gr; g.beginPath(); g.arc(mx,my,mr*4,0,TAU); g.fill();
    g.fillStyle='#fff6d8'; g.beginPath(); g.arc(mx,my,mr,0,TAU); g.fill();
    g.fillStyle='rgba(220,205,160,0.35)'; [[-0.3,-0.2,0.22],[0.25,0.15,0.16],[-0.05,0.38,0.12]].forEach(([dx,dy,rr])=>{ g.beginPath(); g.arc(mx+dx*mr,my+dy*mr,rr*mr,0,TAU); g.fill(); });
    // ⛰️ đồi tuyết xa (2 lớp) + rừng thông bóng xa
    hills(hz+H*0.02, H*0.05, '#6e86bd', 3.1, 0.6);
    pinesFar(hz+H*0.035, '#24386a');
    hills(hz+H*0.07, H*0.04, '#91a7d6', 2.3, 2.1);
    pinesFar(hz+H*0.085, '#1d2f5c', true);
    // ❄️ nền tuyết gần (trước mặt)
    const gy=H*0.86;
    g.beginPath(); g.moveTo(0,H); g.lineTo(0,gy);
    for(let x=0;x<=W;x+=W/40) g.lineTo(x, gy+Math.sin(x/W*TAU*1.6+0.8)*H*0.012+Math.sin(x/W*TAU*4.3)*H*0.005);
    g.lineTo(W,H); g.closePath();
    gr=g.createLinearGradient(0,gy-H*0.02,0,H); gr.addColorStop(0,'#eef4fc'); gr.addColorStop(1,'#c3d2ea'); g.fillStyle=gr; g.fill();
    // 2 khoảng trống 2 bên sàn
    const Lw=R.left, Rw=W-R.right, base=H*0.915;
    const sc=Math.min(H/1000, Math.max(Lw,Rw)/420);   // cỡ vật theo chiều cao màn, không tràn khoảng trống
    if(Lw>60){
      smallPine(Lw*0.12, base-H*0.03, 150*sc);
      tree(Lw*0.52, base, Math.min(560*sc, Lw*1.25), sc);
      gifts(Lw*0.52, base, sc);
    }
    if(Rw>60){
      const cx=R.right+Rw*0.5;
      smallPine(R.right+Rw*0.86, base-H*0.035, 190*sc);
      smallPine(R.right+Rw*0.16, base-H*0.045, 130*sc);
      snowman(cx, base+4*sc, 330*sc);
    }
    seed=s0;
  }
  function hills(y, amp, col, f, ph){ const g=gS; g.beginPath(); g.moveTo(0,H); g.lineTo(0,y);
    for(let x=0;x<=W;x+=W/60) g.lineTo(x, y-Math.abs(Math.sin(x/W*Math.PI*f+ph))*amp-Math.sin(x/W*TAU*7+ph)*amp*0.12);
    g.lineTo(W,H); g.closePath(); g.fillStyle=col; g.fill(); }
  function pinesFar(y, col, big){ const g=gS, n=big?26:40;
    for(let i=0;i<n;i++){ const x=_rng()*W, h=(big?34:22)*(0.6+_rng()*0.8)*H/1000*1.6, w=h*0.42;
      g.fillStyle=col; g.beginPath(); g.moveTo(x,y-h); g.lineTo(x+w,y); g.lineTo(x-w,y); g.closePath(); g.fill();
      g.fillStyle='rgba(235,242,255,0.75)'; g.beginPath(); g.moveTo(x,y-h); g.lineTo(x+w*0.3,y-h*0.7); g.lineTo(x-w*0.3,y-h*0.7); g.closePath(); g.fill(); } }
  function smallPine(x, base, h){ const g=gS, w=h*0.36;
    g.fillStyle='#4a3020'; g.fillRect(x-w*0.09, base-h*0.12, w*0.18, h*0.13);
    for(let t=0;t<3;t++){ const ty=base-h*0.1-t*h*0.27, th=h*0.42, tw=w*(1-t*0.24);
      g.fillStyle=t%2?'#17532f':'#1c6237'; g.beginPath(); g.moveTo(x,ty-th); g.lineTo(x+tw,ty); g.lineTo(x-tw,ty); g.closePath(); g.fill();
      snowCap(x, ty, tw, h*0.04); }
    g.fillStyle='#f4f8ff'; g.beginPath(); g.moveTo(x,base-h*0.1-2*h*0.27-h*0.42); g.lineTo(x+w*0.18,base-h*0.83); g.lineTo(x-w*0.18,base-h*0.83); g.closePath(); g.fill(); }
  function snowCap(x, y, w, d){ const g=gS; g.fillStyle='#f2f7ff'; g.beginPath(); g.moveTo(x-w,y);
    const n=7; for(let k=1;k<=n;k++){ const px=x-w+2*w*k/n; g.quadraticCurveTo(px-w/n, y+d*(k%2?1.3:0.7), px, y); }
    g.lineTo(x+w*0.82, y-d*1.1); g.lineTo(x-w*0.82, y-d*1.1); g.closePath(); g.fill(); }
  // 🎄 cây thông lớn: 4 tầng lá + tuyết mép tầng + bóng châu + dây đèn (bóng đèn nháy vẽ ở lớp động)
  function tree(x, base, h, sc){ const g=gS, w=h*0.36;
    g.fillStyle='rgba(20,30,60,0.25)'; g.beginPath(); g.ellipse(x, base+4*sc, w*1.05, h*0.035, 0, 0, TAU); g.fill();
    g.fillStyle='#5a3a22'; g.fillRect(x-w*0.1, base-h*0.11, w*0.2, h*0.12);
    const tiers=4, tops=[];
    for(let t=0;t<tiers;t++){ const ty=base-h*0.09-t*h*0.2, th=h*0.36, tw=w*(1-t*0.2);
      let gr=g.createLinearGradient(x-tw,0,x+tw,0); gr.addColorStop(0,'#1f7a43'); gr.addColorStop(0.55,'#17663a'); gr.addColorStop(1,'#0f4d2b');
      g.fillStyle=gr; g.beginPath(); g.moveTo(x,ty-th); g.lineTo(x+tw,ty); g.lineTo(x-tw,ty); g.closePath(); g.fill();
      snowCap(x, ty, tw, h*0.022); tops.push([ty,tw]); }
    // dây đèn: đường cong võng qua từng tầng, bóng đèn đặt dọc dây
    const cols=['#ff4d4d','#ffd84d','#4dd2ff','#7dff6a','#ff8af0'];
    tops.forEach(([ty,tw],t)=>{ const y0=ty-h*0.11, n=Math.max(4, Math.round(7-t));
      g.strokeStyle='rgba(30,25,15,0.55)'; g.lineWidth=Math.max(1,1.2*sc); g.beginPath();
      for(let k=0;k<=n;k++){ const u=k/n, px=x-tw*0.8+tw*1.6*u, py=y0+Math.sin(u*Math.PI)*h*0.04+u*h*0.02; k?g.lineTo(px,py):g.moveTo(px,py);
        bulbs.push({x:px, y:py, c:cols[(k+t*2)%cols.length], ph:_rng()*TAU, sp:1.5+_rng()*2.5, r:Math.max(2,4.2*sc)}); }
      g.stroke();
      // bóng châu tĩnh
      for(let k=0;k<3;k++){ const u=(k+0.5)/3, px=x-tw*0.62+tw*1.24*u+(_rng()-0.5)*tw*0.1, py=ty-h*0.035-_rng()*h*0.03, r=Math.max(3,7.5*sc);
        g.fillStyle=['#d42a3a','#e8b830','#3a7be0'][(k+t)%3]; g.beginPath(); g.arc(px,py,r,0,TAU); g.fill();
        g.fillStyle='rgba(255,255,255,0.55)'; g.beginPath(); g.arc(px-r*0.35,py-r*0.35,r*0.32,0,TAU); g.fill(); } });
    starPt={x, y:base-h*0.09-(tiers-1)*h*0.2-h*0.36, r:Math.max(8,22*sc)};
    starShape(g, starPt.x, starPt.y, starPt.r, '#ffd84a', '#c9971a');
  }
  function starShape(g, x, y, r, fill, line){ g.beginPath(); for(let i=0;i<10;i++){ const a=-Math.PI/2+i*Math.PI/5, rr=i%2?r*0.45:r; g.lineTo(x+Math.cos(a)*rr, y+Math.sin(a)*rr); } g.closePath();
    g.fillStyle=fill; g.fill(); if(line){ g.strokeStyle=line; g.lineWidth=Math.max(1,r*0.08); g.stroke(); } }
  function gifts(x, base, sc){ const g=gS;
    [[-0.95,0.95,1.0,'#d42a3a','#ffd84a'],[0.62,0.8,0.85,'#2f7be0','#ffffff'],[-0.2,0.62,0.6,'#3aa65a','#d42a3a']].forEach(([dx,ww,hh,c,rb])=>{
      const bw=70*sc*ww, bh=58*sc*hh, bx=x+dx*95*sc-bw/2, by=base-bh+6*sc;
      g.fillStyle='rgba(20,30,60,0.2)'; g.fillRect(bx+4*sc, by+bh-3*sc, bw, 5*sc);
      g.fillStyle=c; g.fillRect(bx,by,bw,bh); g.fillStyle='rgba(0,0,0,0.15)'; g.fillRect(bx+bw*0.62,by,bw*0.38,bh);
      g.fillStyle=rb; g.fillRect(bx+bw*0.43,by,bw*0.14,bh); g.fillRect(bx,by+bh*0.38,bw,bh*0.14);
      g.strokeStyle=rb; g.lineWidth=Math.max(1.5,4*sc); g.beginPath(); g.ellipse(bx+bw*0.4,by-5*sc,9*sc,5*sc,-0.5,0,TAU); g.ellipse(bx+bw*0.6,by-5*sc,9*sc,5*sc,0.5,0,TAU); g.stroke(); });
  }
  // ⛄ người tuyết
  function snowman(x, base, h){ const g=gS, r1=h*0.22, r2=h*0.16, r3=h*0.115;
    const y1=base-r1, y2=y1-r1-r2*0.75, y3=y2-r2-r3*0.75;
    g.fillStyle='rgba(20,30,60,0.22)'; g.beginPath(); g.ellipse(x, base, r1*1.25, r1*0.18, 0, 0, TAU); g.fill();
    // tay que
    g.strokeStyle='#5a3a22'; g.lineCap='round'; g.lineWidth=Math.max(2,h*0.016);
    g.beginPath(); g.moveTo(x-r2*0.8,y2-r2*0.1); g.lineTo(x-r2*2.1,y2-r2*0.9); g.moveTo(x-r2*1.7,y2-r2*0.65); g.lineTo(x-r2*1.95,y2-r2*1.15);
    g.moveTo(x+r2*0.8,y2-r2*0.1); g.lineTo(x+r2*2.0,y2-r2*0.55); g.moveTo(x+r2*1.65,y2-r2*0.42); g.lineTo(x+r2*1.9,y2-r2*0.95); g.stroke();
    [[y1,r1],[y2,r2],[y3,r3]].forEach(([yy,rr])=>{ const gr=g.createRadialGradient(x-rr*0.35,yy-rr*0.35,rr*0.1,x,yy,rr); gr.addColorStop(0,'#ffffff'); gr.addColorStop(0.7,'#eaf1fb'); gr.addColorStop(1,'#b8c9e3');
      g.fillStyle=gr; g.beginPath(); g.arc(x,yy,rr,0,TAU); g.fill(); });
    g.fillStyle='#22252c'; [-0.35,0.1,0.55].forEach(k=>{ g.beginPath(); g.arc(x, y2+k*r2, r2*0.08, 0, TAU); g.fill(); });   // cúc áo than
    g.beginPath(); g.arc(x-r3*0.36,y3-r3*0.18,r3*0.1,0,TAU); g.arc(x+r3*0.36,y3-r3*0.18,r3*0.1,0,TAU); g.fill();   // mắt
    for(let i=0;i<5;i++){ const a=Math.PI*(0.25+0.5*i/4); g.beginPath(); g.arc(x+Math.cos(a)*r3*0.55, y3+Math.sin(a)*r3*0.45, r3*0.055, 0, TAU); g.fill(); }   // miệng
    g.fillStyle='#ff8a1f'; g.beginPath(); g.moveTo(x, y3-r3*0.06); g.lineTo(x+r3*0.95, y3+r3*0.08); g.lineTo(x, y3+r3*0.16); g.closePath(); g.fill();   // mũi cà rốt
    // khăn đỏ
    g.fillStyle='#d42a3a'; g.beginPath(); g.ellipse(x, y3+r3*0.85, r3*1.0, r3*0.24, 0, 0, TAU); g.fill();
    g.beginPath(); g.moveTo(x+r3*0.35,y3+r3*0.9); g.lineTo(x+r3*0.75,y3+r3*1.9); g.lineTo(x+r3*0.35,y3+r3*1.95); g.lineTo(x+r3*0.1,y3+r3*1.0); g.closePath(); g.fill();
    g.fillStyle='rgba(255,255,255,0.8)'; g.fillRect(x+r3*0.45,y3+r3*1.55,r3*0.28,r3*0.08);
    // mũ chóp đen
    g.fillStyle='#1d1f26'; g.fillRect(x-r3*0.95, y3-r3*0.82, r3*1.9, r3*0.18); g.fillRect(x-r3*0.6, y3-r3*1.75, r3*1.2, r3*0.95);
    g.fillStyle='#d42a3a'; g.fillRect(x-r3*0.6, y3-r3*1.0, r3*1.2, r3*0.18);
  }

  // ---------- LỚP ĐỘNG ----------
  function seedFlakes(){ flakes=[]; const n=Math.round(Math.min(260, W*H/9000));
    for(let i=0;i<n;i++){ const near=_rng()<0.3; flakes.push({x:_rng()*W, y:_rng()*H, r:near?1.8+_rng()*1.8:0.8+_rng()*1.1, v:near?40+_rng()*30:18+_rng()*16, ph:_rng()*TAU, sw:6+_rng()*14, near}); } }

  function frame(t){
    if(!host) return; raf=requestAnimationFrame(frame);
    if(t-lastT<32) return;   // ~30 khung/giây là đủ cho tuyết
    const dt=Math.min(0.1,(t-(lastT||t))/1000); lastT=t;
    layout();
    const g=gD; g.clearRect(0,0,W,H);
    const ts=t/1000;
    // 💡 đèn cây thông nháy
    if(bulbs.length){ g.save(); g.globalCompositeOperation='lighter';
      for(const b of bulbs){ const k=0.5+0.5*Math.sin(ts*b.sp+b.ph), a=0.25+0.75*k*k;
        g.globalAlpha=a*0.35; g.fillStyle=b.c; g.beginPath(); g.arc(b.x,b.y,b.r*2.6,0,TAU); g.fill();
        g.globalAlpha=a; g.beginPath(); g.arc(b.x,b.y,b.r,0,TAU); g.fill(); }
      g.restore(); }
    // ⭐ sao đỉnh cây toả sáng
    if(starPt){ const p=0.75+0.25*Math.sin(ts*2.2), r=starPt.r*3.2*p; const gr=g.createRadialGradient(starPt.x,starPt.y,0,starPt.x,starPt.y,r);
      gr.addColorStop(0,'rgba(255,230,140,0.55)'); gr.addColorStop(1,'rgba(255,230,140,0)'); g.fillStyle=gr; g.beginPath(); g.arc(starPt.x,starPt.y,r,0,TAU); g.fill(); }
    // 🦌 xe Noel
    santaTick(g, t, dt);
    // ❄️ tuyết
    g.fillStyle='rgba(255,255,255,0.55)'; g.beginPath();
    for(const f of flakes){ if(f.near) continue; step(f,dt,ts); g.moveTo(f.x+f.r,f.y); g.arc(f.x,f.y,f.r,0,TAU); } g.fill();
    g.fillStyle='rgba(255,255,255,0.9)'; g.beginPath();
    for(const f of flakes){ if(!f.near) continue; step(f,dt,ts); g.moveTo(f.x+f.r,f.y); g.arc(f.x,f.y,f.r,0,TAU); } g.fill();
  }
  function step(f, dt, ts){ f.y+=f.v*dt; f.x+=Math.sin(ts*0.8+f.ph)*f.sw*dt;
    if(f.y>H+5){ f.y=-5; f.x=_rng()*W; } if(f.x<-5) f.x=W+5; else if(f.x>W+5) f.x=-5; }

  function santaTick(g, t, dt){
    if(!santa && t>=nextSanta){ const dir=_rng()<0.5?1:-1, sz=Math.max(24, H*0.042);
      santa={dir, t0:t, dur:7500+_rng()*2500, y:Math.max(sz*1.5, (R?R.top:H*0.05)+sz*0.1), sz, trail:[]}; }   // bay SÁT mép trên (ngang viền sàn) — đỡ che meme trong sàn
    if(!santa) return;
    const u=(t-santa.t0)/santa.dur; if(u>1){ santa=null; nextSanta=t+22000+_rng()*16000; return; }   // mỗi ~22–38s một lượt
    const span=W+santa.sz*16, x=santa.dir>0 ? -santa.sz*10+span*u : W+santa.sz*10-span*u, y=santa.y+Math.sin(u*TAU*1.3)*santa.sz*0.25;
    // ✨ vệt bụi sao sau xe
    santa.trail.push({x:x-santa.dir*santa.sz*1.2, y:y+santa.sz*0.3, a:1}); if(santa.trail.length>40) santa.trail.shift();
    g.save(); g.globalCompositeOperation='lighter';
    santa.trail.forEach((p,i)=>{ p.a-=dt*1.1; if(p.a<=0) return; const r=santa.sz*0.08*(0.4+p.a);
      g.fillStyle=`rgba(255,220,120,${p.a*0.7})`; g.beginPath(); g.arc(p.x+Math.sin(i*1.7)*santa.sz*0.15, p.y+Math.cos(i*2.3)*santa.sz*0.12, r, 0, TAU); g.fill(); });
    g.restore();
    drawSanta(g, x, y, santa.sz, santa.dir, t/1000);
  }
  // xe trượt + ông già Noel + 4 tuần lộc (con đầu mũi đỏ). Vẽ hướng sang PHẢI rồi lật theo dir.
  function drawSanta(g, x, y, s, dir, ts){
    g.save(); g.translate(x,y); g.scale(dir,1);
    // dây cương
    g.strokeStyle='#c9a24a'; g.lineWidth=Math.max(1,s*0.04);
    g.beginPath(); g.moveTo(s*0.6,-s*0.05); g.lineTo(s*7.6,-s*0.15); g.stroke();
    // tuần lộc: 2 cặp
    for(let i=0;i<4;i++){ const rx=s*(2.1+i*1.45)+(i%2)*s*0.15, ry=-s*0.2+(i%2?-s*0.32:0)+Math.sin(ts*9+i)*s*0.07; reindeer(g, rx, ry, s*0.62, ts*9+i*1.3, i===3); }
    // túi quà
    g.fillStyle='#7a4a2a'; g.beginPath(); g.ellipse(-s*0.55,-s*0.55,s*0.45,s*0.4,0,0,TAU); g.fill();
    g.fillStyle='#d42a3a'; g.fillRect(-s*0.8,-s*1.05,s*0.22,s*0.22); g.fillStyle='#3aa65a'; g.fillRect(-s*0.45,-s*1.1,s*0.2,s*0.25);
    // ông già Noel
    g.fillStyle='#c81e2b'; g.beginPath(); g.ellipse(s*0.05,-s*0.45,s*0.32,s*0.4,0,0,TAU); g.fill();
    g.fillStyle='#ffe0c2'; g.beginPath(); g.arc(s*0.12,-s*0.95,s*0.17,0,TAU); g.fill();
    g.fillStyle='#ffffff'; g.beginPath(); g.ellipse(s*0.16,-s*0.78,s*0.17,s*0.16,0,0,TAU); g.fill();   // râu
    g.fillStyle='#c81e2b'; g.beginPath(); g.moveTo(-s*0.08,-s*1.05); g.lineTo(s*0.3,-s*1.06); g.lineTo(-s*0.25,-s*1.42); g.closePath(); g.fill();   // mũ
    g.fillStyle='#ffffff'; g.fillRect(-s*0.1,-s*1.1,s*0.42,s*0.08); g.beginPath(); g.arc(-s*0.27,-s*1.42,s*0.07,0,TAU); g.fill();
    g.strokeStyle='#c81e2b'; g.lineWidth=s*0.11; g.lineCap='round'; g.beginPath(); g.moveTo(s*0.15,-s*0.55); g.lineTo(s*0.55,-s*0.3); g.stroke();   // tay cầm cương
    // thân xe
    g.fillStyle='#b3121f'; g.beginPath(); g.moveTo(-s*1.05,-s*0.6); g.quadraticCurveTo(-s*1.1,s*0.15,-s*0.6,s*0.2); g.lineTo(s*0.75,s*0.2); g.quadraticCurveTo(s*1.0,s*0.15,s*0.9,-s*0.25);
    g.lineTo(s*0.35,-s*0.2); g.quadraticCurveTo(-s*0.2,-s*0.15,-s*0.55,-s*0.6); g.closePath(); g.fill();
    g.strokeStyle='#f2c54a'; g.lineWidth=Math.max(1,s*0.06); g.stroke();
    // càng trượt vàng
    g.lineWidth=Math.max(1.2,s*0.07); g.beginPath(); g.moveTo(-s*0.9,s*0.42); g.lineTo(s*0.95,s*0.42); g.quadraticCurveTo(s*1.3,s*0.42,s*1.25,s*0.12);
    g.moveTo(-s*0.5,s*0.2); g.lineTo(-s*0.5,s*0.42); g.moveTo(s*0.5,s*0.2); g.lineTo(s*0.5,s*0.42); g.stroke();
    g.restore();
  }
  function reindeer(g, x, y, s, ph, lead){
    g.save(); g.translate(x,y);
    const lg=Math.sin(ph)*0.6;
    g.strokeStyle='#5b3a22'; g.lineWidth=Math.max(1,s*0.12); g.lineCap='round';
    g.beginPath(); g.moveTo(s*0.35,s*0.15); g.lineTo(s*0.35+Math.sin(lg)*s*0.45,s*0.62); g.moveTo(-s*0.35,s*0.15); g.lineTo(-s*0.35-Math.sin(lg)*s*0.45,s*0.62); g.stroke();   // chân phi
    g.fillStyle='#8a5a35'; g.beginPath(); g.ellipse(0,0,s*0.58,s*0.26,-0.08,0,TAU); g.fill();   // thân
    g.fillStyle='#f3e6d0'; g.beginPath(); g.arc(-s*0.55,-s*0.05,s*0.1,0,TAU); g.fill();   // đuôi
    g.fillStyle='#8a5a35'; g.beginPath(); g.moveTo(s*0.4,-s*0.1); g.lineTo(s*0.62,-s*0.5); g.lineTo(s*0.78,-s*0.42); g.lineTo(s*0.56,s*0.02); g.closePath(); g.fill();   // cổ
    g.beginPath(); g.ellipse(s*0.78,-s*0.5,s*0.2,s*0.13,0.2,0,TAU); g.fill();   // đầu
    g.strokeStyle='#d8c39a'; g.lineWidth=Math.max(1,s*0.06);   // gạc
    g.beginPath(); g.moveTo(s*0.7,-s*0.6); g.lineTo(s*0.55,-s*0.92); g.moveTo(s*0.62,-s*0.76); g.lineTo(s*0.45,-s*0.8); g.moveTo(s*0.78,-s*0.62); g.lineTo(s*0.8,-s*0.95); g.moveTo(s*0.79,-s*0.8); g.lineTo(s*0.95,-s*0.88); g.stroke();
    if(lead){ g.globalCompositeOperation='lighter'; g.fillStyle='rgba(255,60,60,0.45)'; g.beginPath(); g.arc(s*0.98,-s*0.46,s*0.16,0,TAU); g.fill(); g.globalCompositeOperation='source-over'; }
    g.fillStyle=lead?'#ff2a2a':'#2a1a10'; g.beginPath(); g.arc(s*0.97,-s*0.46,s*0.065,0,TAU); g.fill();   // mũi (con đầu: đỏ)
    g.restore();
  }

  window.XmasBg={ start, stop, santaNow(){ nextSanta=0; santa=null; } };   // santaNow: gọi xe Noel ngay (để chạy thử / chụp)
})();
