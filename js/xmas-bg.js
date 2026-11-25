// 🎄 CẢNH GIÁNG SINH quanh sàn Commenter Battle (anh dặn 25/11) — NHÌN TỪ TRÊN CAO XUỐNG như sàn đấu, GỌN, không rối:
//    mặt tuyết (tông xanh xám tối hơn sàn để sàn nổi giữa), mép màn tối dần · bên trái: cây thông có đèn nháy (nhìn từ trên)
//    · bên phải: người tuyết (nhìn từ trên) · vài cây thông nhỏ · tuyết rơi thưa NGOÀI sàn · thỉnh thoảng xe Noel bay ngang
//    (vẽ NHÌN NGANG cho dễ nhận) kèm tiếng cười + chuông · lúc khác thỉnh thoảng 1 hồi chuông.
//    2 lớp canvas DOM riêng, KHÔNG đụng canvas trận: lớp TĨNH (sau sàn, vẽ lại khi đổi cỡ) · lớp ĐỘNG (trước sàn, 30 khung/giây).
//    ⚠️ KHÔNG gọi Math.random (giữ nguyên chuỗi random có seed của trận) — dùng bộ sinh số riêng _rng.
//    Gọi: XmasBg.start(hostEl, arenaEl) lúc vào trận · XmasBg.stop() lúc rời trận.
(function(){
  let host=null, arenaEl=null, cS=null, cD=null, gS=null, gD=null, raf=0, lastT=0, W=0, H=0, R=null, key='';
  let flakes=[], bulbs=[], starPt=null, santa=null, nextSanta=0, nextBells=0, lastSantaEnd=0, seed=20261225;
  const _rng=()=>{ seed=(seed*1664525+1013904223)>>>0; return seed/4294967296; };
  const TAU=Math.PI*2, SH='rgba(30,45,75,0.28)', SDX=0.18, SDY=0.22;   // bóng đổ: nắng trăng từ trên-trái → bóng lệch xuống-phải

  function mk(z){ const c=document.createElement('canvas'); c.className='xmas-layer';
    c.style.cssText=`position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:${z};display:block;`; return c; }
  function start(h, a){
    stop(); host=h; arenaEl=a; if(!host) return;
    cS=mk(0); cD=mk(6); host.insertBefore(cS, host.firstChild); host.appendChild(cD);
    gS=cS.getContext('2d'); gD=cD.getContext('2d');
    seed=20261225; flakes=[]; santa=null; nextSanta=performance.now()+8000; nextBells=performance.now()+20000; lastSantaEnd=0;
    key=''; lastT=0; raf=requestAnimationFrame(frame);
  }
  function stop(){ if(raf) cancelAnimationFrame(raf); raf=0; if(cS) cS.remove(); if(cD) cD.remove(); cS=cD=gS=gD=null; host=null; arenaEl=null; }

  function layout(){
    const hr=host.getBoundingClientRect(), vw=Math.round(hr.width), vh=Math.round(Math.max(hr.height, window.innerHeight));
    let ar={left:vw*0.25, right:vw*0.75, top:vh*0.06, bottom:vh*0.94};
    if(arenaEl){ const r=arenaEl.getBoundingClientRect(); if(r.width>10) ar={left:r.left-hr.left, right:r.right-hr.left, top:r.top-hr.top, bottom:r.bottom-hr.top}; }
    const k=[vw,vh,Math.round(ar.left),Math.round(ar.right),Math.round(ar.top)].join(',');
    if(k===key) return; key=k; W=vw; H=vh; R=ar;
    const dpr=Math.min(window.devicePixelRatio||1, 1.5);
    cS.width=Math.round(W*dpr); cS.height=Math.round(H*dpr); gS.setTransform(dpr,0,0,dpr,0,0);
    cD.width=W; cD.height=H;
    buildStatic(); seedFlakes();
  }

  // ---------- LỚP TĨNH (nhìn từ trên) ----------
  function buildStatic(){
    const g=gS; bulbs=[]; starPt=null; const s0=seed; seed=777;
    let gr=g.createRadialGradient(W/2,H/2,Math.min(W,H)*0.3,W/2,H/2,Math.hypot(W,H)*0.6);
    gr.addColorStop(0,'#9db1cb'); gr.addColorStop(1,'#7a91b2'); g.fillStyle=gr; g.fillRect(0,0,W,H);
    for(let i=0;i<26;i++){ const x=_rng()*W, y=_rng()*H, r=(60+120*_rng())*H/1000, lt=_rng()<0.5;   // vân tuyết rất mờ
      const rg=g.createRadialGradient(x,y,0,x,y,r); rg.addColorStop(0,lt?'rgba(255,255,255,0.10)':'rgba(40,60,100,0.07)'); rg.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=rg; g.fillRect(x-r,y-r,r*2,r*2); }
    const Lw=R.left, Rw=W-R.right, u=H/1000;
    if(Lw>80){
      pine(Lw*0.5, H*0.40, Math.min(Lw*0.36, 175*u), true);   // cây thông có đèn
      pine(Lw*0.30, H*0.82, Math.min(Lw*0.2, 85*u), false);
    }
    if(Rw>80){
      const cx=R.right+Rw*0.5;
      snowman(cx, H*0.56, Math.min(Rw*0.2, 92*u));
      pine(R.right+Rw*0.70, H*0.16, Math.min(Rw*0.21, 95*u), false);
    }
    // mép màn tối dần → mắt dồn vào giữa sàn
    gr=g.createRadialGradient(W/2,H/2,Math.min(W,H)*0.45,W/2,H/2,Math.hypot(W,H)*0.58); gr.addColorStop(0,'rgba(10,20,45,0)'); gr.addColorStop(1,'rgba(10,20,45,0.45)'); g.fillStyle=gr; g.fillRect(0,0,W,H);
    seed=s0;
  }
  function star(g, x, y, ro, ri, n, rot){ g.beginPath(); for(let i=0;i<n*2;i++){ const a=rot+i*Math.PI/n, r=i%2?ri:ro; g.lineTo(x+Math.cos(a)*r, y+Math.sin(a)*r); } g.closePath(); }
  // 🌲 cây thông NHÌN TỪ TRÊN: 3 tầng tán hình sao chồng nhau (dưới to tối, trên nhỏ sáng), đầu lá phủ tuyết, bóng đổ lệch
  function pine(x, y, r, lit){ const g=gS, rot=_rng()*TAU;
    g.fillStyle=SH; star(g, x+r*SDX*0.7, y+r*SDY*0.7, r*1.0, r*0.7, 9, rot); g.fill();   // bóng sát gốc
    [[1,'#1a5232',0],[0.74,'#22673e',0.17],[0.48,'#2c7a49',0.35]].forEach(([k,c,dr],j)=>{
      g.fillStyle=c; star(g, x, y, r*k, r*k*0.66, 9, rot+dr); g.fill();
      if(j) for(let i=0;i<9;i++){ const a=rot+dr+i*TAU/9; g.fillStyle='rgba(240,246,255,0.55)'; g.beginPath(); g.arc(x+Math.cos(a)*r*k*0.84, y+Math.sin(a)*r*k*0.84, r*k*0.05, 0, TAU); g.fill(); } });   // chút tuyết ở chóp lá (nhỏ, mờ)
    if(lit){
      const cols=['#ff5a5a','#ffd84d','#5ad2ff','#86ff6a','#ff8af0'];
      [[0.82,14],[0.55,9]].forEach(([k,n],j)=>{ for(let i=0;i<n;i++){ const a=rot+i*TAU/n+j*0.3; bulbs.push({x:x+Math.cos(a)*r*k, y:y+Math.sin(a)*r*k, c:cols[(i+j)%cols.length], ph:_rng()*TAU, sp:1.2+_rng()*2, r:Math.max(2,r*0.035)}); } });
      starPt={x, y, r:r*0.17};
      g.fillStyle='#f2c33a'; star(g, x, y, starPt.r, starPt.r*0.45, 5, -Math.PI/2); g.fill(); g.strokeStyle='#b8871a'; g.lineWidth=Math.max(1,r*0.012); g.stroke();
    } }
  // ⛄ người tuyết NHÌN TỪ TRÊN: thân tròn to, đầu tròn, mũ chóp (vành + đỉnh), khăn đỏ, mũi cà rốt, 2 tay que
  function snowman(x, y, r){ const g=gS, hx=x-r*0.12, hy=y-r*0.1, hr=r*0.58;
    g.fillStyle=SH; g.beginPath(); g.arc(x+r*SDX*0.8, y+r*SDY*0.8, r*1.02, 0, TAU); g.fill();
    g.strokeStyle='#5a3a22'; g.lineCap='round'; g.lineWidth=Math.max(2,r*0.07);
    g.beginPath(); g.moveTo(x-r*0.8,y+r*0.2); g.lineTo(x-r*1.6,y+r*0.55); g.moveTo(x-r*1.35,y+r*0.44); g.lineTo(x-r*1.5,y+r*0.78);
    g.moveTo(x+r*0.8,y+r*0.25); g.lineTo(x+r*1.55,y+r*0.05); g.moveTo(x+r*1.3,y+r*0.12); g.lineTo(x+r*1.5,y+r*0.4); g.stroke();
    let gr=g.createRadialGradient(x-r*0.35,y-r*0.35,r*0.1,x,y,r); gr.addColorStop(0,'#ffffff'); gr.addColorStop(1,'#c3d2e8'); g.fillStyle=gr; g.beginPath(); g.arc(x,y,r,0,TAU); g.fill();
    g.fillStyle='#d42a3a'; g.beginPath(); g.arc(hx,hy,hr*1.12,0,TAU); g.fill();   // khăn
    g.beginPath(); g.moveTo(hx+hr*0.5,hy+hr*0.8); g.lineTo(hx+hr*0.95,hy+hr*1.75); g.lineTo(hx+hr*0.55,hy+hr*1.85); g.lineTo(hx+hr*0.15,hy+hr*1.0); g.closePath(); g.fill();
    gr=g.createRadialGradient(hx-hr*0.3,hy-hr*0.3,hr*0.1,hx,hy,hr); gr.addColorStop(0,'#ffffff'); gr.addColorStop(1,'#cfdcee'); g.fillStyle=gr; g.beginPath(); g.arc(hx,hy,hr,0,TAU); g.fill();
    g.fillStyle='#ff8a1f'; g.beginPath(); g.moveTo(hx+hr*0.55,hy-hr*0.18); g.lineTo(hx+hr*1.55,hy+hr*0.12); g.lineTo(hx+hr*0.6,hy+hr*0.22); g.closePath(); g.fill();   // mũi cà rốt
    g.fillStyle='#1d1f26'; g.beginPath(); g.arc(hx-hr*0.15,hy-hr*0.12,hr*0.72,0,TAU); g.fill();   // vành mũ
    g.fillStyle='#d42a3a'; g.beginPath(); g.arc(hx-hr*0.15,hy-hr*0.12,hr*0.5,0,TAU); g.fill();
    g.fillStyle='#2a2d36'; g.beginPath(); g.arc(hx-hr*0.15,hy-hr*0.12,hr*0.42,0,TAU); g.fill();   // đỉnh mũ
    g.fillStyle='#22252c'; [[-0.1,0.45],[0.15,0.7]].forEach(([dx,dy])=>{ g.beginPath(); g.arc(x+dx*r, y+dy*r*0.75, r*0.06, 0, TAU); g.fill(); });   // cúc áo
  }

  // ---------- LỚP ĐỘNG ----------
  function seedFlakes(){ flakes=[]; const n=Math.round(Math.min(110, W*H/20000));
    for(let i=0;i<n;i++) flakes.push({x:_rng()*W, y:_rng()*H, r:0.9+_rng()*1.6, vx:-6+_rng()*12, vy:10+_rng()*14, ph:_rng()*TAU}); }
  const inArena=(x,y)=>R && x>R.left-14 && x<R.right+14 && y>R.top-14 && y<R.bottom+14;

  function frame(t){
    if(!host) return; raf=requestAnimationFrame(frame);
    if(t-lastT<32) return;
    const dt=Math.min(0.1,(t-(lastT||t))/1000); lastT=t; layout();
    const g=gD, ts=t/1000; g.clearRect(0,0,W,H);
    if(bulbs.length){ g.save(); g.globalCompositeOperation='lighter';   // 💡 đèn cây thông nháy
      for(const b of bulbs){ const k=0.5+0.5*Math.sin(ts*b.sp+b.ph), a=0.2+0.8*k*k;
        g.globalAlpha=a*0.3; g.fillStyle=b.c; g.beginPath(); g.arc(b.x,b.y,b.r*2.6,0,TAU); g.fill();
        g.globalAlpha=a; g.beginPath(); g.arc(b.x,b.y,b.r,0,TAU); g.fill(); }
      g.restore(); }
    if(starPt){ const p=0.7+0.3*Math.sin(ts*2), r=starPt.r*2.6*p, gr=g.createRadialGradient(starPt.x,starPt.y,0,starPt.x,starPt.y,r);
      gr.addColorStop(0,'rgba(255,225,130,0.45)'); gr.addColorStop(1,'rgba(255,225,130,0)'); g.fillStyle=gr; g.beginPath(); g.arc(starPt.x,starPt.y,r,0,TAU); g.fill(); }
    santaTick(g, t, dt);
    g.fillStyle='rgba(255,255,255,0.75)'; g.beginPath();   // ❄️ tuyết rơi (nhìn từ trên: hạt trôi chậm), KHÔNG vẽ đè lên sàn
    for(const f of flakes){ f.x+=(f.vx+Math.sin(ts*0.7+f.ph)*8)*dt; f.y+=f.vy*dt;
      if(f.y>H+4){ f.y=-4; f.x=_rng()*W; } if(f.x<-4) f.x=W+4; else if(f.x>W+4) f.x=-4;
      if(inArena(f.x,f.y)) continue; g.moveTo(f.x+f.r,f.y); g.arc(f.x,f.y,f.r,0,TAU); }
    g.fill();
  }

  function santaTick(g, t, dt){
    if(!santa && t>=nextSanta){ const dir=_rng()<0.5?1:-1, sz=Math.max(24, H*0.042);
      santa={dir, t0:t, dur:7000+_rng()*2000, y:Math.max(sz*1.5, (R?R.top:H*0.05)+sz*0.1), sz, trail:[]};   // bay SÁT mép trên (ngang viền sàn) — đỡ che meme
      if(window.XmasBg.onSanta) try{ window.XmasBg.onSanta(); }catch(e){} }   // 🔊 tiếng "ho ho ho" + chuông
    if(!santa){   // 🔔 lúc không có xe Noel: thỉnh thoảng 1 hồi chuông leng keng
      if(t>=nextBells){ nextBells=t+16000+_rng()*12000; if(window.XmasBg.onBells && t-lastSantaEnd>5000) try{ window.XmasBg.onBells(); }catch(e){} }
      return; }
    const u=(t-santa.t0)/santa.dur; if(u>1){ santa=null; lastSantaEnd=t; nextSanta=t+24000+_rng()*14000; return; }   // mỗi ~24–38s một lượt
    const s=santa.sz, span=W+s*20, x=santa.dir>0 ? -s*10+span*u : W+s*10-span*u, y=santa.y+Math.sin(u*TAU*1.3)*s*0.25;
    santa.trail.push({x:x-santa.dir*s*1.2, y:y+s*0.3, a:1}); if(santa.trail.length>40) santa.trail.shift();
    g.save(); g.globalCompositeOperation='lighter';
    santa.trail.forEach((p,i)=>{ p.a-=dt*1.1; if(p.a<=0) return; g.fillStyle=`rgba(255,220,120,${p.a*0.7})`; g.beginPath(); g.arc(p.x+Math.sin(i*1.7)*s*0.15, p.y+Math.cos(i*2.3)*s*0.12, s*0.08*(0.4+p.a), 0, TAU); g.fill(); });
    g.restore();
    drawSanta(g, x, y, s, santa.dir, t/1000);
  }
  // (anh 25/11: "ông già noel thì bay trực diện được") xe Noel vẽ NHÌN NGANG: xe trượt + ông già Noel + 4 tuần lộc (con đầu mũi đỏ). Vẽ hướng PHẢI rồi lật theo dir.
  function drawSanta(g, x, y, s, dir, ts){
    g.save(); g.translate(x,y); g.scale(dir,1);
    g.strokeStyle='#c9a24a'; g.lineWidth=Math.max(1,s*0.04);
    g.beginPath(); g.moveTo(s*0.6,-s*0.05); g.lineTo(s*7.6,-s*0.15); g.stroke();   // dây cương
    for(let i=0;i<4;i++){ const rx=s*(2.1+i*1.45)+(i%2)*s*0.15, ry=-s*0.2+(i%2?-s*0.32:0)+Math.sin(ts*9+i)*s*0.07; deer(g, rx, ry, s*0.62, ts*9+i*1.3, i===3); }
    g.fillStyle='#7a4a2a'; g.beginPath(); g.ellipse(-s*0.55,-s*0.55,s*0.45,s*0.4,0,0,TAU); g.fill();   // túi quà
    g.fillStyle='#d42a3a'; g.fillRect(-s*0.8,-s*1.05,s*0.22,s*0.22); g.fillStyle='#3aa65a'; g.fillRect(-s*0.45,-s*1.1,s*0.2,s*0.25);
    g.fillStyle='#c81e2b'; g.beginPath(); g.ellipse(s*0.05,-s*0.45,s*0.32,s*0.4,0,0,TAU); g.fill();   // ông Noel
    g.fillStyle='#ffe0c2'; g.beginPath(); g.arc(s*0.12,-s*0.95,s*0.17,0,TAU); g.fill();
    g.fillStyle='#ffffff'; g.beginPath(); g.ellipse(s*0.16,-s*0.78,s*0.17,s*0.16,0,0,TAU); g.fill();   // râu
    g.fillStyle='#c81e2b'; g.beginPath(); g.moveTo(-s*0.08,-s*1.05); g.lineTo(s*0.3,-s*1.06); g.lineTo(-s*0.25,-s*1.42); g.closePath(); g.fill();   // mũ
    g.fillStyle='#ffffff'; g.fillRect(-s*0.1,-s*1.1,s*0.42,s*0.08); g.beginPath(); g.arc(-s*0.27,-s*1.42,s*0.07,0,TAU); g.fill();
    g.strokeStyle='#c81e2b'; g.lineWidth=s*0.11; g.lineCap='round'; g.beginPath(); g.moveTo(s*0.15,-s*0.55); g.lineTo(s*0.55,-s*0.3); g.stroke();   // tay cầm cương
    g.fillStyle='#b3121f'; g.beginPath(); g.moveTo(-s*1.05,-s*0.6); g.quadraticCurveTo(-s*1.1,s*0.15,-s*0.6,s*0.2); g.lineTo(s*0.75,s*0.2); g.quadraticCurveTo(s*1.0,s*0.15,s*0.9,-s*0.25);
    g.lineTo(s*0.35,-s*0.2); g.quadraticCurveTo(-s*0.2,-s*0.15,-s*0.55,-s*0.6); g.closePath(); g.fill();   // thân xe
    g.strokeStyle='#f2c54a'; g.lineWidth=Math.max(1,s*0.06); g.stroke();
    g.lineWidth=Math.max(1.2,s*0.07); g.beginPath(); g.moveTo(-s*0.9,s*0.42); g.lineTo(s*0.95,s*0.42); g.quadraticCurveTo(s*1.3,s*0.42,s*1.25,s*0.12);   // càng trượt vàng
    g.moveTo(-s*0.5,s*0.2); g.lineTo(-s*0.5,s*0.42); g.moveTo(s*0.5,s*0.2); g.lineTo(s*0.5,s*0.42); g.stroke();
    g.restore();
  }
  function deer(g, x, y, s, ph, lead){
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

  window.XmasBg={ start, stop, onSanta:null, onBells:null, santaNow(){ nextSanta=0; santa=null; } };   // onSanta / onBells: game gắn tiếng (ho ho ho / chuông) · santaNow: gọi xe ngay (chạy thử)
})();
