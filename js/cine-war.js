// ===================== 🎬 CINEMATIC "MEMES ASSEMBLE — PART II: THE WAR OF EVIL GARY" =====================
// Dựng theo BRIEF GỐC của user (3 phần, ~70s, gần như không có chữ — chỉ màn kết). Lớp phủ riêng 1080×1920 như phần 1,
// dùng chung nền js/cine-bg.js. Mở từ Meme Cinema (playCineWar trong game.js tải file này khi cần). Bố cục xem mục BỐ CỤC.
(function(){
  if(window._cineWar) return;
  let VW=540, VH=960, WIDE=false, OFF=null;   // WIDE: bản 16:9 (960×540) · OFF: đang xuất video từng khung (không chạy thời gian thật / không phát tiếng)
  const GROUND=560;
  const A=p=>{ const im=new Image(); im.src=p; return im; };
  const av=(k,f)=>A('assets/avatars/'+k+'/'+(f||'avatarUrl')+'.webp');
  const IMG={ stalin:av('stalincat'), catler:av('feuerkatze'), egary:av('evilgary'), gary:av('gary'), larry:av('evillarry'), larryRed:A('assets/img/evillarry/EVILLARRY_RED_IMG.webp'),
    wdemon:A('assets/img/screamcat/SC_DEMON_IMG.webp'), soul:A('assets/img/evilgary/EG_SOUL_IMG.webp'),
    hammer:A('assets/img/stalincat/STALIN_HAMMER_IMG.webp'), sickle:A('assets/img/stalincat/STALIN_SICKLE_IMG.webp'), cross:A('assets/img/stalincat/STALIN_CROSS_IMG.webp'),
    giga:av('gigachad'), gigaBig:av('gigachad','rageAvatarUrl'), chonky:av('chonkydog'), chill:av('chillguy'), chillKick:av('chillguy','skill1AvatarUrl'), spider:av('spidercat'),
    ricardo:av('ricardo'), rcFr:[0,1,2,3].map(i=>A('assets/img/ricardo/RC_FR_'+i+'.webp')), doge:av('doge'), dogeBuff:av('doge','rageAvatarUrl'), dogeHit:av('doge','rageAttackAvatarUrl'),
    cheems:av('cheems'), mallet:A('assets/img/cheems/CHEEMS_MALLET_IMG.webp'), guitar:av('electricguitarcat'), piano:av('pianocat'), bongo:av('bongocat'), mosq:av('mosquitoviolin','attackAvatarUrl'),
    maxwell:av('maxwell'), dsword:A('assets/img/maxwell/MAXWELL_DIAMOND_SWORD_IMG.webp'), uia:av('uiacat'), uiaSpin:av('uiacat','attackAvatarUrl'),
    king:av('kingcheems'), knight:A('assets/img/kingcheems/DOGE_KNIGHT_IMG.webp'), joninn:av('samuraicheems'), joninnR:av('samuraicheems','rageAvatarUrl'),
    angel:av('holycat','rageAvatarUrl'), friend:av('friend','skill4AvatarUrl'), grin:A('assets/img/friend/FR_GRIN_IMG.webp'), berserk:av('berserkcat'), berserkAtk:av('berserkcat','attackAvatarUrl'),   // 👀😁 grin = chỉ đôi mắt + hàm răng của Friend (đã gỡ viền mặt)
    gigaLift:A('assets/img/cine/CINE_GIGA_LIFT.webp'), gigaPunch:A('assets/img/cine/CINE_GIGA_PUNCH.webp'), smSlash:A('assets/img/cine/CINE_SM_SLASH.webp'), smBack:A('assets/img/cine/CINE_SM_BACK.webp'), bkBack:A('assets/img/cine/CINE_BK_BACK.webp'),
    larryMage:av('evillarry','introAvatarUrl'), catlerAtk:av('feuerkatze','attackAvatarUrl'),
    clapIdle:av('clappingcat'), clapUp:av('clappingcat','rageAvatarUrl'), clap:['skill1AvatarUrl','skill2AvatarUrl','skill3AvatarUrl'].map(f=>av('clappingcat',f)),
    hand:{} };
  for(const k of ['crawlA','crawlB','slap','grip','lunge']) IMG.hand[k]=A('assets/img/scaredhamster/HAND_'+k+'.webp');
  const HM={crawlA:{w:391,h:204,wy:74},crawlB:{w:333,h:203,wy:85},slap:{w:372,h:178,wy:92},grip:{w:333,h:238,wy:107.5},lunge:{w:382,h:315,wy:167}};
  // 🧭 hướng quay GỐC của ảnh: 'l' = quay trái, 'r' = quay phải (còn lại nhìn thẳng). face(im,toRight) → có cần lật không
  const FACE={gigachad:'l',evilgary:'l',gary:'l',chonkydog:'l',chillguy:'l',cheems:'l',kingcheems:'l',samuraicheems:'l',doge:'l',mosquitoviolin:'r',maxwell:'r',uiacat:'r',berserkcat:'r'};
  const flipTo=(k,toRight)=>{ const f=FACE[k]; return f==='l'?!!toRight:f==='r'?!toRight:false; };
  const RO=()=>{ try{ return (typeof roster!=='undefined' && roster) || []; }catch(e){ return []; } };
  const NAMED=new Set(['stalincat','feuerkatze','evilgary','gary','evillarry','gigachad','chonkydog','chillguy','spidercat','ricardo','doge','cheems','electricguitarcat','pianocat','bongocat','mosquitoviolin','maxwell','uiacat','kingcheems','samuraicheems','holycat','friend']);
  // ── tiện ích ──
  const prep=im=>{ if(im._cp) return im._cp; if(!im.naturalWidth) return null;
    try{ const w=im.naturalWidth, h=im.naturalHeight, c=document.createElement('canvas'); c.width=w; c.height=h; const x=c.getContext('2d'); x.drawImage(im,0,0);
      const d=x.getImageData(0,0,w,h), px=d.data; let x0=w,y0=h,x1=0,y1=0, cut=0;
      for(let yy=0;yy<h;yy+=2) for(let xx=0;xx<w;xx+=2) if(px[(yy*w+xx)*4+3]>40){ if(xx<x0)x0=xx; if(xx>x1)x1=xx; if(yy<y0)y0=yy; if(yy>y1)y1=yy; }
      if(x1<x0){ x0=0;y0=0;x1=w-1;y1=h-1; }
      for(let xx=x0;xx<=x1;xx++) if(px[(y1*w+xx)*4+3]>120) cut++;
      if(cut>(x1-x0)*0.6){ const F=Math.round((y1-y0)*0.07); /* chỉ ảnh bán thân bị cắt thẳng mới mờ nhẹ mép dưới — chân ảnh toàn thân giữ nét */ for(let yy=y1-F;yy<=y1;yy++){ const k=(y1-yy)/F; for(let xx=x0;xx<=x1;xx++){ const i=(yy*w+xx)*4+3; px[i]=px[i]*k; } } x.putImageData(d,0,0); }
      im._cp={src:c, sx:x0, sy:y0, sw:x1-x0+1, sh:y1-y0+1}; }catch(e){ im._cp={src:im, sx:0, sy:0, sw:im.naturalWidth, sh:im.naturalHeight}; }
    return im._cp; };
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)), seg=(t,a,b)=>clamp((t-a)/(b-a),0,1);
  const eio=x=>x*x*(3-2*x), eout=x=>1-Math.pow(1-x,3), ein=x=>x*x*x, lerp=(a,b,k)=>a+(b-a)*k;
  const back=x=>{ const c=1.70158; return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2); };
  const hash=n=>{ const s=Math.sin(n*127.1+311.7)*43758.5453; return s-Math.floor(s); };
  let cv, g, raf=null, t0=0, parts=[], played={}, overlay, shake=0, paused=false, pauseT=0, markOnly=false, panel=null, crowd=[];
  const sfx=(id,k,v,dur)=>{ if(played[id]) return; played[id]=1; if(markOnly) return; try{ playSample(k,v==null?1:v,dur||null); }catch(e){} };
  function actor(im,x,y,h,o){ o=o||{}; const c=prep(im); if(!c) return 0; const w=h*c.sw/c.sh;
    g.save(); g.globalAlpha*=(o.a==null?1:o.a); g.translate(x,y); if(o.rot) g.rotate(o.rot); g.scale((o.flip?-1:1)*(o.sx||1),o.sy||1);
    if(o.glow){ g.shadowColor=o.glow; g.shadowBlur=o.gb||18; }
    if(o.filter) g.filter=o.filter;
    g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,-w/2,o.center?-h/2:-h,w,h); g.restore(); return w; }
  function shadow(x,y,w,a){ g.save(); g.globalAlpha=a==null?0.4:a; const gr=g.createRadialGradient(x,y,0,x,y,w); gr.addColorStop(0,'rgba(0,0,0,0.85)'); gr.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=gr; g.beginPath(); g.ellipse(x,y,w,w*0.22,0,0,Math.PI*2); g.fill(); g.restore(); }
  function glow(x,y,r,a,c){ if(a<=0.01||r<=0) return; const gr=g.createRadialGradient(x,y,0,x,y,r); gr.addColorStop(0,`rgba(${c},${a})`); gr.addColorStop(0.5,`rgba(${c},${a*0.4})`); gr.addColorStop(1,`rgba(${c},0)`); g.fillStyle=gr; g.beginPath(); g.arc(x,y,r,0,Math.PI*2); g.fill(); }
  const addGlow=(x,y,r,a,c)=>{ g.save(); g.globalCompositeOperation='lighter'; glow(x,y,r,a,c); g.restore(); };
  function bolt(x1,y1,x2,y2,w,a,c,core){ const pts=[[x1,y1]], n=10, dx=x2-x1, dy=y2-y1, L=Math.hypot(dx,dy)||1, nx=-dy/L, ny=dx/L;
    for(let i=1;i<n;i++){ const u=i/n, j=(Math.random()-0.5)*L*0.2; pts.push([x1+dx*u+nx*j,y1+dy*u+ny*j]); } pts.push([x2,y2]);
    g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round'; g.lineJoin='round';
    for(const [lw,al,cc] of [[w*4,0.22,c],[w*1.8,0.6,c],[w*0.7,1,core||'255,255,255']]){ g.strokeStyle=`rgba(${cc},${a*al})`; g.lineWidth=lw; g.beginPath(); pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); }
    g.restore(); }
  function text(s,x,y,px,fill,stroke,font,al){ g.save(); g.globalAlpha*=(al==null?1:al); g.font=font||`900 ${px}px Impact,"Arial Black",sans-serif`; g.textAlign='center'; g.textBaseline='middle'; g.lineJoin='round';
    if(stroke){ g.lineWidth=px*0.16; g.strokeStyle=stroke; g.strokeText(s,x,y); } g.fillStyle=fill; g.fillText(s,x,y); g.restore(); }
  function ring(x,y,r,a,c,lw,sy){ if(a<=0.01) return; g.save(); g.globalCompositeOperation='lighter'; lw=lw||4; for(const [m,al] of [[3,0.18],[0.5,0.8]]){ g.strokeStyle=`rgba(${c},${a*al})`; g.lineWidth=lw*m; g.beginPath(); g.ellipse(x,y,r,r*(sy||0.32),0,0,Math.PI*2); g.stroke(); } g.restore(); }
  function dust(x,y,n,s){ for(let i=0;i<n;i++){ const a=Math.random()*Math.PI*2; parts.push({k:'dust',x:x+(Math.random()-0.5)*s,y:y-Math.random()*s*0.3,vx:Math.cos(a)*(1+Math.random()*3),vy:-Math.random()*3,l:40,L:40,r:6+Math.random()*12,c:'90,60,50'}); } }
  function sparks(x,y,n,c,sp){ for(let i=0;i<n;i++){ const a=Math.random()*Math.PI*2, v=(sp||4)*(0.4+Math.random()); parts.push({k:'spark',x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-1,l:26,L:26,c:c||'255,220,150'}); } }
  // ── quái vật của Evil Gary (linh hồn xanh có móng) ──
  function monster(x,y,h,toRight,a,rot,fall){ shadow(x,y,h*0.22,0.3*(a==null?1:a)); actor(IMG.soul,x,y,h,{flip:!!toRight,a,rot:(rot||0)+(fall?fall*1.4*(toRight?-1:1):0),sy:fall?1-fall*0.4:1}); }   // toRight: quay mặt sang phải (ảnh gốc quay trái)
  // ── linh hồn khói đen bay đầy trời ──
  function skySouls(t,n,x0,x1,y0,y1,toward){ g.save();
    for(let i=0;i<n;i++){ const sp=0.05+hash(i)*0.08, u=(hash(i+3)+t*sp)%1, x=toward?lerp(x0,toward[0],u):lerp(x0,x1,(hash(i+9)+t*sp*0.6)%1), y=toward?lerp(lerp(y0,y1,hash(i+5)),toward[1],u*u):lerp(y0,y1,hash(i+5))+Math.sin(t*1.3+i)*14;
      const r=10+hash(i+7)*12, a=toward?Math.min(1,(1-u)*4):0.9;
      g.globalAlpha=a*0.85; const gr=g.createRadialGradient(x,y,0,x,y,r*2.2); gr.addColorStop(0,'rgba(8,4,10,0.95)'); gr.addColorStop(0.5,'rgba(20,8,16,0.6)'); gr.addColorStop(1,'rgba(20,8,16,0)'); g.fillStyle=gr; g.beginPath(); g.arc(x,y,r*2.2,0,Math.PI*2); g.fill();
      g.fillStyle='rgba(10,4,10,0.45)'; for(let k=1;k<5;k++){ g.beginPath(); g.arc(x+k*r*0.7*(toward?-(toward[0]-x0)/Math.abs(toward[0]-x0||1):-1),y+Math.sin(t*4+i+k)*3,r*(1-k*0.17),0,Math.PI*2); g.fill(); }
      g.globalAlpha=a; g.fillStyle='#ff2a2a'; g.fillRect(x-r*0.35,y-r*0.15,2.4,2.4); g.fillRect(x+r*0.15,y-r*0.15,2.4,2.4); }
    g.restore(); }
  // ⛧ ngôi sao quỷ (mặt đất, vẽ dần) — giống phần 1
  function pentagram(x,y,k,tm,RX,RY){ RX=RX||175; RY=RY||46; const P=[0,1,2,3,4].map(i=>{ const a=-Math.PI/2+i*Math.PI*2/5; return [x+Math.cos(a)*RX, y+Math.sin(a)*RY]; }), ord=[0,2,4,1,3,0];
    const pul=0.75+0.25*Math.sin(tm*6); g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round'; g.lineJoin='round';
    const segs=5, drawn=k*(segs+1);
    for(const [lw,c,al] of [[12,'255,30,30',0.25],[5,'255,60,40',0.6],[2,'255,220,200',0.95]]){ g.strokeStyle=`rgba(${c},${al*pul})`; g.lineWidth=lw;
      g.beginPath(); for(let i=0;i<segs && i<drawn;i++){ const a=P[ord[i]], b=P[ord[i+1]], u=Math.min(1,drawn-i); if(i===0) g.moveTo(a[0],a[1]); g.lineTo(a[0]+(b[0]-a[0])*u, a[1]+(b[1]-a[1])*u); } g.stroke();
      if(drawn>segs){ g.beginPath(); g.ellipse(x,y,RX*1.08,RY*1.08,0,-Math.PI/2,-Math.PI/2+Math.PI*2*Math.min(1,drawn-segs)); g.stroke(); } }
    g.restore(); }
  // ⛧ ngôi sao quỷ lơ lửng trên đầu Evil Gary (5 cánh sáng dần)
  function headStar(x,y,r,k,tm){ const pul=0.7+0.3*Math.sin(tm*7); g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round';
    const P=[0,1,2,3,4].map(i=>{ const a=-Math.PI/2+i*Math.PI*2/5; return [x+Math.cos(a)*r,y+Math.sin(a)*r]; }), ord=[0,2,4,1,3,0];
    for(const [lw,c,al] of [[9,'255,30,30',0.3],[3.5,'255,80,60',0.8],[1.4,'255,230,210',1]]){ g.strokeStyle=`rgba(${c},${al*pul})`; g.lineWidth=lw; g.beginPath();
      for(let i=0;i<5;i++){ const a=P[ord[i]], b=P[ord[i+1]], u=clamp(k*5-i,0,1); if(u<=0) break; g.moveTo(a[0],a[1]); g.lineTo(lerp(a[0],b[0],u),lerp(a[1],b[1],u)); } g.stroke(); }
    glow(x,y,r*1.6,0.35*k*pul,'255,30,30'); g.restore(); }
  // 🦇 quỷ có cánh khổng lồ (sprite bung cánh) — cắt từng khung, kéo dài thân mờ dần
  const DEM_EXT=150, demC={};
  function demFrame(fr,nf){ const ck=fr+(nf?'n':''); if(demC[ck]) return demC[ck]; const im=IMG.wdemon, FW=494, FH=320;
    const c=document.createElement('canvas'); c.width=FW; c.height=FH+DEM_EXT; const x=c.getContext('2d');
    const d=document.createElement('canvas'); d.width=FW; d.height=FH; d.getContext('2d').drawImage(im,fr*FW,0,FW,FH,0,0,FW,FH);
    let last=FH-1; { const a=d.getContext('2d').getImageData(0,0,FW,FH).data; for(let y=FH-1;y>0;y--){ let n=0; for(let xx=0;xx<FW;xx+=3) if(a[(y*FW+xx)*4+3]>60) n++; if(n>20){ last=y; break; } } }
    x.drawImage(d,0,0);
    if(nf) return demC[ck]={c, last};
    x.globalCompositeOperation='destination-in'; const gr=x.createLinearGradient(0,0,0,FH+DEM_EXT);
    gr.addColorStop(0,'rgba(0,0,0,1)'); gr.addColorStop(Math.max(0,last-90)/(FH+DEM_EXT),'rgba(0,0,0,1)'); gr.addColorStop(last/(FH+DEM_EXT),'rgba(0,0,0,0)'); gr.addColorStop(1,'rgba(0,0,0,0)');
    x.fillStyle=gr; x.fillRect(0,0,FW,FH+DEM_EXT);
    return demC[ck]={c, last}; }
  function demon(x,yB,w,a,wing,tm,rot){ const im=IMG.wdemon; if(!im.naturalWidth) return; const FW=494, FH=320, fr=5+Math.min(2,Math.floor(wing*3)), F=demFrame(fr), k=w/FW, top=yB-F.last*k;
    g.save(); g.globalAlpha=a; g.translate(x,yB); if(rot) g.rotate(rot); g.translate(-x,-yB); g.shadowColor='rgba(255,0,0,0.7)'; g.shadowBlur=24; if(demon.lit) g.filter=`brightness(${demon.lit})`; g.drawImage(F.c,x-w/2,top,F.c.width*k,F.c.height*k); g.restore();
    addGlow(x-w/2+w*0.553,top+FH*k*0.55,w*0.05,0.7*a*(0.6+0.4*Math.sin(tm*5)),'255,40,30'); }
  // 😈 quỷ theo KHUNG bất kỳ của sprite (0-4 cúi/chồm · 5 choàng cánh · 6-7 bung cánh · 8 bay dang cánh · 9 bay chéo) — khung 0-5, 9 GỐC quay mặt sang PHẢI
  function demon2(fr,x,yB,w,o){ const im=IMG.wdemon; if(!im.naturalWidth) return; o=o||{}; const F=demFrame(fr,o.nf), k=w/494, top=yB-F.last*k;
    g.save(); g.globalAlpha=o.a==null?1:o.a; g.translate(x,yB); if(o.rot) g.rotate(o.rot); if(o.flip) g.scale(-1,1); if(o.sy) g.scale(1,o.sy); g.translate(-x,-yB);
    g.shadowColor='rgba(255,0,0,0.7)'; g.shadowBlur=24; if(o.lit) g.filter=`brightness(${o.lit})`; g.drawImage(F.c,x-w/2,top,F.c.width*k,F.c.height*k); g.restore(); }
  function demonFly(fr,cx,cy,w,o){ const im=IMG.wdemon; if(!im.naturalWidth) return; o=o||{}; const F=demFrame(fr,true), k=w/494;
    g.save(); g.translate(cx,cy); if(o.rot) g.rotate(o.rot); if(o.flip) g.scale(-1,1); if(o.sy) g.scale(1,o.sy); g.shadowColor='rgba(255,0,0,0.7)'; g.shadowBlur=24; if(o.lit) g.filter=`brightness(${o.lit})`;
    g.drawImage(F.c,-w/2,-160*k,F.c.width*k,F.c.height*k); g.restore();
    const ex=cx+(o.flip?-1:1)*((fr===9?307:285)-247)*k, ey=cy-160*k+(fr===9?99:80)*k; addGlow(ex,ey,40*k/5,0.8,'255,40,30'); }
  const DEYE={0:[279,189],3:[305,148],4:[290,146],5:[291,113]};
  const demEye=(fr,x,yB,w,flip)=>{ const F=demFrame(fr), k=w/494, top=yB-F.last*k, e=DEYE[fr]||DEYE[5]; return [x+(flip?-1:1)*(e[0]-247)*k, top+e[1]*k]; };
  // 🖐️ bàn tay bóng tối: cánh tay đen thuôn nối từ gốc (trong bóng tối) tới cổ tay + ảnh bàn tay
  let TT=0;   // thời gian phim hiện tại (cho các hàm vẽ phụ cần chuyển động)
  // 🖐️ bàn tay bóng tối: cánh tay KHÓI ĐEN cong uốn (thon dần từ gốc tới cổ tay, gợn sóng chậm), viền sáng tím mờ, gốc chìm trong mây đen + ảnh bàn tay
  function shadowHand(pose,bx,by,wx,wy,k,a,mir){ const im=IMG.hand[pose], m=HM[pose]; if(!im||!im.naturalWidth||a<=0.01) return;
    const L=Math.hypot(wx-bx,wy-by)||1, ux=(wx-bx)/L, uy=(wy-by)/L, nx=-uy, ny=ux, w0=m.h*k*0.5, w1=m.h*k*0.2, sd=(bx*0.013+by*0.007)%6.28, N=Math.max(10,Math.ceil(L/(w1*0.9)));
    const P=[]; for(let i=0;i<=N;i++){ const f=i/N, wave=Math.sin(f*3.2+TT*1.6+sd)*L*0.07*Math.sin(Math.PI*f)+Math.sin(f*7+TT*2.4+sd*2)*w1*0.25*(1-f); P.push([bx+ux*L*f+nx*wave, by+uy*L*f+ny*wave, lerp(w0,w1,Math.pow(f,0.7))]); }
    const ex=P[N][0]-P[N-1][0], ey=P[N][1]-P[N-1][1], ang=Math.atan2(ey,ex);
    g.save(); g.globalAlpha=a;
    g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round'; g.lineJoin='round'; g.strokeStyle='rgba(140,60,220,0.18)';   // viền sáng tím
    for(let i=1;i<=N;i++){ g.lineWidth=P[i][2]*2.5; g.beginPath(); g.moveTo(P[i-1][0],P[i-1][1]); g.lineTo(P[i][0],P[i][1]); g.stroke(); } g.restore();
    g.lineCap='round'; g.lineJoin='round'; g.strokeStyle='#040107';
    for(let i=1;i<=N;i++){ g.lineWidth=P[i][2]*2; g.beginPath(); g.moveTo(P[i-1][0],P[i-1][1]); g.lineTo(P[i][0],P[i][1]); g.stroke(); }   // thân tay liền mạch
    for(let i=0;i<N;i+=2){ const p=P[i], r=p[2]*(1.05+0.25*Math.sin(TT*3+i)); puff(p[0]+nx*Math.sin(TT*2+i)*p[2]*0.3,p[1]+ny*Math.sin(TT*2+i)*p[2]*0.3,r*1.4,0.55,'8,2,14'); }   // khói bám dọc tay
    for(let q=0;q<3;q++){ const f=((TT*0.5+q/3+sd)%1), i=Math.floor(f*N), p=P[i]; puff(p[0]+nx*p[2]*1.2*(q%2?1:-1),p[1]+ny*p[2]*1.2*(q%2?1:-1)-f*20,p[2]*0.6,0.45*(1-f),'20,6,30'); }   // khói bong ra
    for(let q=0;q<5;q++) puff(bx+(hash(q+sd*10)-0.5)*w0*3,by+(hash(q+sd*10+1)-0.5)*w0*1.5,w0*(1.6+hash(q)*0.8),0.9,'3,0,6');   // gốc chìm trong mây đen
    g.translate(P[N][0],P[N][1]); g.rotate(ang); g.scale(k,k*(mir||1)); g.drawImage(im,-8,-m.wy,m.w,m.h); g.restore(); }
  // 🌑 bóng tối tràn (mây khói đen cuộn)
  function darkCloud(x,y,r,a,tm,seed){ if(a<=0.01) return; g.save(); g.globalAlpha=a;
    for(let i=0;i<14;i++){ const ang=hash(seed+i)*6.28+tm*(0.2+hash(seed+i*3)*0.3), d=r*0.6*hash(seed+i*7), px=x+Math.cos(ang)*d, py=y+Math.sin(ang)*d*0.6, rr=r*(0.35+0.3*hash(seed+i*11))*(1+0.08*Math.sin(tm*2+i));
      const gr=g.createRadialGradient(px,py,0,px,py,rr); gr.addColorStop(0,'rgba(4,1,8,0.95)'); gr.addColorStop(0.6,'rgba(14,4,22,0.7)'); gr.addColorStop(1,'rgba(14,4,22,0)'); g.fillStyle=gr; g.beginPath(); g.arc(px,py,rr,0,Math.PI*2); g.fill(); }
    g.restore(); }
  // ── phụ đề / thoại ──
  function sub(t,s,a,b,who,col){ const k=seg(t,a,a+0.2)*(1-seg(t,b-0.25,b)); if(k<=0) return; const y=VH-150;
    if(who) text(who,VW/2,y-34,20,col||'#ffcc80','#000',undefined,k); text(s,VW/2,y,27,'#fff','#000','italic 700 27px Georgia,serif',k); }
  function bigWord(t,s,a,b,col,px,y){ const k=seg(t,a,a+0.12), o=1-seg(t,b-0.3,b); if(k<=0||o<=0) return; g.save(); g.translate(VW/2,y||VH*0.42); const sc=back(k)*1; g.scale(sc,sc);
    text(s,(Math.random()-0.5)*3,(Math.random()-0.5)*3,px||64,col||'#fff','#000',undefined,o); g.restore(); }


  // ═════════════════ BỐ CỤC + THỜI GIAN (theo brief gốc của user — 3 phần, ~70s, gần như không có chữ) ═════════════════
  //  PHẦN 1 (khung rộng): A đại chiến · B Gigachad + Chonky khổng lồ đấu Evil Larry · C Evil Gary đấu Stalin + Catler
  //  PHẦN 2 (cận từng combo): D Spider Cat lướt cắt · E Chill Guy đá · F Ricardo đấm · G Chonky hoá to đè vỡ đất cuốn trôi quái vật
  //                           · H King Cheems bị kỵ sĩ quây → 1 nhát cắt, cùng khung Joninn tra kiếm vào vỏ → cả bầy chết
  //  PHẦN 3: I phe ác yếu thế, quỷ khổng lồ trồi lên · J Gigachad khổng lồ húc nó ngã · K phong ấn âm nhạc 4 góc + Holy Angel,
  //          quỷ chìm xuống địa ngục · L Evil Gary bị xé làm đôi, Gary gốc văng ra, UIA lướt như Flash đón đi
  //          · M Stalin vung búa → bàn tay bóng tối hất văng, bóng tối + vô số bàn tay, 2 tay lôi 2 kẻ ác đi · N Doge đỡ Stalin, nắng
  //          · O THAT IS THE END OF THE LORE → (3s) BUT NOT MY… máu chảy + mắt và nụ cười đầy máu của Friend
  const SC=[0,4.5,13.5,16.5,21,27.5,32.5,36,43,49,55.5,63,76,90.5,95.5,102.5,106,112.5];
  const SI={H:4,P:5,J1:7,K:12,L:13,M:14,N:15,END:16};
  const DUR=SC[SC.length-1];
  // 🎞️ SLOW-MOTION kiểu anime ở các cú đánh: [bắt đầu, kết thúc (thời gian phim), tốc độ] — đoạn đó chạy chậm lại, phim dài ra tương ứng
  const SLOW=[[6.7,6.95,0.3],[10.4,10.65,0.3],[12.5,12.85,0.35],[18.72,19,0.3],[23.98,24.3,0.3],[34.48,34.7,0.35],[37.45,37.95,0.5],[37.98,38.25,0.25],[40.45,40.83,0.45],[40.83,41.1,0.25],[48.4,48.6,0.4],[51.38,51.7,0.25],[51.9,52.6,0.6],[55.55,56.35,0.6],[57.5,58,0.5],[59.1,59.35,0.35],[66.48,66.62,0.35],[70,70.4,0.22],[80.78,81,0.3],[93.18,93.4,0.3],[97.88,98.1,0.3]];
  const c2r=c=>{ let r=c; for(const [a,b,f] of SLOW){ if(c<=a) break; r+=(Math.min(c,b)-a)*(1/f-1); } return r; };   // thời gian phim → thời gian thật
  const r2c=r=>{ let off=0; for(const [a,b,f] of SLOW){ const ra=a+off; if(r<=ra) return r-off; const rb=ra+(b-a)/f; if(r<rb) return a+(r-ra)*f; off+=(b-a)*(1/f-1); } return r-off; };
  const DURR=c2r(DUR);
  const slowAt=t=>{ for(const S of SLOW) if(t>=S[0] && t<S[1]) return S; return null; };
  // ⚡ khung hình ANIME lúc slow-mo: chớp âm bản trắng đen (impact frame) → vạch tập trung toả vào giữa + viền tối
  function animeFX(t){ const S=slowAt(t); if(!S) return; const [a,b,f]=S, re=(t-a)/f, k=(t-a)/(b-a), env=Math.sin(Math.PI*k);
    if(re<0.08){ g.save(); g.setTransform(1,0,0,1,0,0); g.globalCompositeOperation='saturation'; g.fillStyle='#808080'; g.fillRect(0,0,cv.width,cv.height);
      if(re<0.035){ g.globalCompositeOperation='difference'; g.fillStyle='#fff'; g.fillRect(0,0,cv.width,cv.height); } g.restore(); }
    g.save(); const vg=g.createRadialGradient(VW/2,VH/2,VH*0.25,VW/2,VH/2,VH*0.62); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,`rgba(0,0,0,${0.4*env})`); g.fillStyle=vg; g.fillRect(0,0,VW,VH);
    const sd=Math.floor(re*24); g.fillStyle=`rgba(255,255,255,${0.22*env})`;
    for(let i=0;i<44;i++){ const an=hash(sd*97+i)*Math.PI*2, r0=VH*(0.34+hash(sd*31+i)*0.22), r1=VH*1.2, w=0.002+hash(i+sd)*0.005;
      g.beginPath(); g.moveTo(VW/2+Math.cos(an)*r0,VH/2+Math.sin(an)*r0); g.lineTo(VW/2+Math.cos(an-w)*r1,VH/2+Math.sin(an-w)*r1); g.lineTo(VW/2+Math.cos(an+w)*r1,VH/2+Math.sin(an+w)*r1); g.closePath(); g.fill(); }
    g.restore(); }
  let team=[];
  const TEAMK=['stalincat','feuerkatze','doge','cheems','chillguy','spidercat','ricardo','kingcheems','samuraicheems','uiacat','electricguitarcat','pianocat','bongocat','maxwell'];
  function setup(){ parts=[]; played={};
    const pool=RO().filter(r=>r && r.charKey && !NAMED.has(r.charKey) && r.avatarUrl).map(r=>r.avatarUrl).sort(()=>Math.random()-0.5).slice(0,18);
    crowd=pool.map(u=>({im:A(u), h:52+Math.random()*16, ph:Math.random()*6}));
    team=TEAMK.map(k=>({k,im:av(k)})); }
  const lunge=(t,ph,sp)=>{ const s=Math.sin(t*(sp||5)+ph); return s>0.6?(s-0.6)/0.4:0; };   // 0..1: nhịp vồ tới
  function impact(x,y,k,R){ if(k<=0||k>=1) return; R=R||120; g.save(); g.strokeStyle=`rgba(0,0,0,${0.45*(1-k)})`; g.lineWidth=2;
    for(let q=0;q<14;q++){ const a=q/22*Math.PI*2+q*0.4, r0=R*0.35+((q*37)%20), r1=r0+R*(0.8+((q*53)%40)/40); g.beginPath(); g.moveTo(x+Math.cos(a)*r0,y+Math.sin(a)*r0); g.lineTo(x+Math.cos(a)*r1,y+Math.sin(a)*r1); g.stroke(); }
    g.restore(); addGlow(x,y,R*(0.6+0.8*k),1-k,'255,250,230'); }
  function slash(x1,y1,x2,y2,a,c){ if(a<=0.01) return; g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round';
    for(const [lw,al] of [[14,0.25],[6,0.6],[2,1]]){ g.strokeStyle=`rgba(${c||'240,250,255'},${a*al})`; g.lineWidth=lw; g.beginPath(); g.moveTo(x1,y1); g.lineTo(x2,y2); g.stroke(); } g.restore(); }
  // linh hồn đen bay loạn khắp trời (quỹ đạo vòng xoắn, có con lao chúi xuống)
  function chaosSouls(t,n,cx,cy,W,Hh){ g.save();
    for(let i=0;i<n;i++){ const sp=0.25+hash(i)*0.35, ph=hash(i+3)*6.28, x=cx+Math.sin(t*sp+ph)*W*0.5+Math.sin(t*sp*2.3+i)*W*0.12, y=cy+Math.cos(t*sp*1.3+ph*2)*Hh*0.5+Math.sin(t*1.7+i)*20;
      const vx=Math.cos(t*sp+ph), r=8+hash(i+7)*10;
      g.globalAlpha=0.85; const gr=g.createRadialGradient(x,y,0,x,y,r*2.2); gr.addColorStop(0,'rgba(8,4,10,0.95)'); gr.addColorStop(0.55,'rgba(25,8,18,0.55)'); gr.addColorStop(1,'rgba(25,8,18,0)'); g.fillStyle=gr; g.beginPath(); g.arc(x,y,r*2.2,0,Math.PI*2); g.fill();
      g.fillStyle='rgba(10,4,10,0.4)'; for(let k=1;k<5;k++){ g.beginPath(); g.arc(x-vx*k*r*0.8,y+Math.sin(t*5+i+k)*3,r*(1-k*0.18),0,Math.PI*2); g.fill(); }
      g.globalAlpha=1; g.fillStyle='#ff2a2a'; g.fillRect(x-r*0.35,y-r*0.15,2.2,2.2); g.fillRect(x+r*0.12,y-r*0.15,2.2,2.2); }
    g.restore(); }
  // quái vật bị chém đôi: nửa trên trượt theo đường cắt, nửa dưới đổ xuống, tan thành khói đen
  function halves(x,y,h,flip,k,ang){ const c=prep(IMG.soul); if(!c) return; const w=h*c.sw/c.sh, cy=y-h*0.5, a=ang||-0.25;
    for(const up of [1,0]){ g.save(); g.globalAlpha=1-seg(k,0.5,1); g.beginPath(); const L=400, nx=-Math.sin(a), ny=Math.cos(a);
      g.moveTo(x-Math.cos(a)*L,cy-Math.sin(a)*L); g.lineTo(x+Math.cos(a)*L,cy+Math.sin(a)*L); g.lineTo(x+Math.cos(a)*L+nx*(up?-L:L),cy+Math.sin(a)*L+ny*(up?-L:L)); g.lineTo(x-Math.cos(a)*L+nx*(up?-L:L),cy-Math.sin(a)*L+ny*(up?-L:L)); g.closePath(); g.clip();
      const dx=up?-eout(k)*h*0.35:0, dy=up?-eout(k)*h*0.12+k*k*h*0.5:k*h*0.08; g.translate(x+dx,y+dy); if(!up) g.rotate((flip?-1:1)*k*0.5); g.scale(flip?-1:1,1);
      g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,-w/2,-h,w,h); g.restore(); }
    if(k>0.3) for(let q=0;q<2;q++) if(Math.random()<0.5) parts.push({k:'dust',x:x+(Math.random()-0.5)*w,y:cy+(Math.random()-0.5)*h*0.6,vx:(Math.random()-0.5),vy:-0.6-Math.random(),l:40,L:40,r:5+Math.random()*8,c:'12,6,14'}); }
  // ⚡ vệt sét vàng kiểu speedster (UIA lướt như Flash)
  function flashStreak(x0,x1,y,hh,a){ if(a<=0.01) return; g.save(); g.globalCompositeOperation='lighter';
    const gr=g.createLinearGradient(x0,0,x1,0); gr.addColorStop(0,'rgba(255,170,30,0)'); gr.addColorStop(0.8,`rgba(255,200,80,${0.35*a})`); gr.addColorStop(1,`rgba(255,250,220,${0.6*a})`);
    g.fillStyle=gr; g.beginPath(); g.moveTo(x0,y-hh*0.45); g.quadraticCurveTo(x1,y-hh*0.95,x1,y-hh*0.5); g.quadraticCurveTo(x1,y-hh*0.05,x0,y-hh*0.45); g.fill(); g.restore();
    for(let k=0;k<6;k++){ const yy=y-hh*(0.1+k*0.15); bolt(lerp(x0,x1,Math.random()*0.3),yy+(Math.random()-0.5)*hh*0.3,x1,yy+(Math.random()-0.5)*hh*0.15,2.6-k*0.25,a*(0.6+0.4*Math.random()),'255,180,30','255,250,210'); } }
  function rocks(x,y,n,vx){ for(let i=0;i<n;i++) parts.push({k:'rock',x:x+(Math.random()-0.5)*80,y:y-Math.random()*30,vx:(vx||0)+(Math.random()-0.5)*7,vy:-4-Math.random()*7,l:60,L:60,c:'60,42,38',r:4+Math.random()*9}); }
  function cracks(x,y,k,R,seed){ if(k<=0) return; g.save(); g.lineCap='round'; for(let i=0;i<12;i++){ const a=(i/12)*Math.PI*2+hash(seed+i)*0.4; let px=x, py=y; g.beginPath(); g.moveTo(px,py);
      for(let s=0;s<7;s++){ px+=Math.cos(a+(hash(seed+i*7+s)-0.5)*0.9)*R/7*k; py+=Math.sin(a+(hash(seed+i*9+s)-0.5)*0.9)*R/7*k*0.32; g.lineTo(px,py); }
      g.strokeStyle='rgba(10,2,2,0.9)'; g.lineWidth=5; g.stroke(); g.strokeStyle=`rgba(255,90,40,${0.7*k})`; g.lineWidth=1.6; g.stroke(); } g.restore(); }

  // ═════════ A — ĐẠI CHIẾN (khung rộng) ═════════
  const FRONT=[...Array(10)].map((_,i)=>({x:250+(i%2)*50-Math.floor(i/2)*20, y:650+i*28, ph:hash(i+70)*6}));
  function scA(u,t){
    chaosSouls(t,34,450,250,1900,560);
    // nền xa: quỷ khổng lồ chỉ ĐỨNG lù lù sau trận (chưa tham chiến)
    addGlow(900,300,700,0.35,'255,40,30'); demon.lit=0.8; demon(900,640,1150,0.92,0,t,0); demon.lit=0;
    const D=[];
    crowd.forEach((c,i)=>{ const x=-330+(i%9)*62, y=660+Math.floor(i/9)*40+((i*13)%20); D.push({y,f:()=>{ const b=Math.abs(Math.sin((t+c.ph)*8))*3; shadow(x,y,c.h*0.3,0.3); actor(c.im,x+lunge(t,c.ph,6)*16,y-b,c.h,{rot:0.08}); }}); });
    FRONT.forEach((P,i)=>{ const m=team[(i+2)%team.length]; const l=lunge(t,P.ph,5.5), lm=lunge(t,P.ph+2.2,5.5);
      D.push({y:P.y,f:()=>{ shadow(P.x,P.y,32,0.35); actor(m.im,P.x+l*28,P.y-Math.abs(Math.sin(t*7+i))*3,96,{rot:0.18*l,flip:flipTo(m.k,true)}); monster(P.x+110-lm*30,P.y,104,false,1,-0.15*lm);
        if(l>0.92||lm>0.92){ if(Math.random()<0.4) sparks(P.x+55,P.y-50,6,'255,210,150',4); } }}); });
    for(let i=0;i<14;i++){ const x=520+(i%7)*80+hash(i+90)*30, y=640+Math.floor(i/7)*60+hash(i+91)*20; D.push({y,f:()=>monster(x-lunge(t,i,4)*20,y,96+hash(i)*20,false,0.95,0)}); }
    // tâm trận: Evil Gary đấu Stalin + Catler
    D.push({y:900,f:()=>{ const gx=700, sx=560, l=lunge(t,1,3.6), lc=lunge(t,3,4.2);
      addGlow(gx,840,150,0.35,'255,30,30'); addGlow(sx,840,120,0.3,'120,190,255');
      shadow(gx,900,50); actor(IMG.egary,gx,900,115,{glow:'rgba(255,0,0,0.8)',gb:18});   // quay mặt về phía Stalin
      shadow(sx,900,50); actor(IMG.stalin,sx+l*40,900,130,{rot:0.15*l}); actor(IMG.catler,sx-90+lc*50,905,96,{rot:0.15*lc});
      if(l>0.9){ bolt(sx+80,830,gx-30,840,2.5,0.9,'150,210,255'); } if(Math.random()<0.15) bolt(gx-20,830,sx+60,820,2,0.8,'255,40,40','255,200,200'); }});
    D.sort((a,b)=>a.y-b.y); for(const d of D) d.f();
  }
  const camA=u=>keys(u,[[0,520,560,0.42,0],[1.3,540,600,0.47,0],[1.35,240,780,1.05,0],[2.6,470,780,1.1,0],[2.65,630,820,1.45,0],[3.4,630,815,1.55,0],[3.45,1010,560,0.55,0],[4.5,1050,540,0.6,0]]);   // rộng → lia thấp dọc chiến tuyến → cận Stalin/Catler vs Gary → ngước lên 2 gã khổng lồ

  // ═════════ B — KHỔNG LỒ ĐỤNG ĐỘ ═════════
  function scB(u,t){
    const LX=1180, step=Math.sin(u*2.2)*12;
    const p1=seg(u,0.9,1.25), back1=seg(u,1.25,2.0), wave=seg(u,1.9,2.6), slam=seg(u,2.6,3.3), p2=seg(u,3.6,3.9);
    const lrot=-0.08*Math.sin(Math.PI*back1)+(slam>0.9?-0.06:0)-0.07*Math.sin(Math.PI*seg(u,3.9,4.5));
    pentagram(LX-60,800,1,t,360,90);
    shadow(LX,800,220,0.5); actor(IMG.larry,LX+step*0.3,815,680,{flip:true,glow:'rgba(170,0,255,0.7)',gb:30,rot:lrot});
    if(wave>0 && wave<1){ ring(LX-150,820,lerp(60,700,eout(wave)),1-wave,'230,90,255',7,0.3); }
    // Gigachad khổng lồ: bước vào → đấm → bị sóng đẩy lùi → đấm lần 2
    const gx=lerp(700,800,eio(seg(u,0,0.9)))+eout(p1)*130*(1-seg(u,1.25,1.6))-eout(wave)*90+eout(p2)*150;
    shadow(gx,860,150,0.5); actor(IMG.gigaBig,gx,870,500,{rot:0.18*(p1*(1-back1)+p2)-0.1*Math.sin(Math.PI*wave)});
    // Chonky khổng lồ lao vào húc
    const cx=lerp(470,LX-330,ein(slam)), cy=880-Math.sin(Math.PI*slam)*90;
    shadow(cx,880,130,0.45); actor(IMG.chonky,cx,cy,400,{rot:slam*0.35,sx:1+0.05*Math.sin(u*7)});
    if(u>=1.22 && u<1.3){ shake=18; sparks(LX-230,560,30,'255,230,200',9); } if(u>=1.25) impact(LX-230,560,seg(u,1.25,1.6),200);
    if(u>=3.28 && u<3.36){ shake=22; dust(LX-260,860,25,260); rocks(LX-260,860,20,3); } if(u>=3.3) impact(LX-260,700,seg(u,3.3,3.7),230);
    if(u>=3.88 && u<3.96){ shake=18; sparks(LX-200,520,30,'255,230,200',9); } if(u>=3.9) impact(LX-200,520,seg(u,3.9,4.3),190);
    cracks(LX-200,860,seg(u,3.3,4.3),500,7);
  }
  const camB=u=>keys(u,[[0,930,620,0.56],[4.5,960,600,0.52]]);

  // ═════════ C — STALIN + CATLER vs EVIL GARY + EVIL LARRY (phong cách Jujutsu Kaisen) ═════════
  //  đối đầu (chú lực cuộn quanh người) → cận chia khung → Stalin lao búa vào Larry: HẮC THIỂM (black flash) → Catler vồ lửa vs bầy linh hồn của Gary
  //  → Larry phản đòn: ngũ giác tím dưới chân Stalin, cột tím phun lên hất văng → Catler đỡ Stalin, bùng lửa → búa sét + lửa xoay vút đi → HẮC THIỂM lần 2
  //  → 2 bên đối chưởng (xanh+cam vs đỏ+tím) giữa sân, đất xé toạc → nổ
  const CG={sx:380,cx:250,gx:900,lx:1050,y:880}, CM=(CG.sx+CG.gx)/2;
  function blackBolt(x1,y1,x2,y2,w,a){ if(a<=0.01) return; const pts=[[x1,y1]], n=8, dx=x2-x1, dy=y2-y1, L=Math.hypot(dx,dy)||1, nx=-dy/L, ny=dx/L;
    for(let i=1;i<n;i++){ const u=i/n, j=(Math.random()-0.5)*L*0.28; pts.push([x1+dx*u+nx*j,y1+dy*u+ny*j]); } pts.push([x2,y2]);
    g.save(); g.lineCap='round'; g.lineJoin='round'; const path=()=>{ g.beginPath(); pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); };
    g.globalCompositeOperation='lighter'; g.strokeStyle=`rgba(255,30,40,${0.55*a})`; g.lineWidth=w*3.2; path(); g.stroke(); g.strokeStyle=`rgba(255,90,90,${0.8*a})`; g.lineWidth=w*1.6; path(); g.stroke();
    g.globalCompositeOperation='source-over'; g.strokeStyle=`rgba(0,0,0,${a})`; g.lineWidth=w; path(); g.stroke(); g.restore(); }
  // ⚫ HẮC THIỂM: khung âm bản đỏ-đen chớp, tia sét ĐEN viền đỏ toả ra, vòng méo không gian
  function blackFlash(x,y,k,R){ if(k<=0||k>=1) return;
    for(let i=0;i<14;i++){ const a=hash(i+1300)*Math.PI*2+k*0.5, r0=R*0.15, r1=R*(0.6+0.8*hash(i+1301))*eout(Math.min(1,k*2.5)); blackBolt(x+Math.cos(a)*r0,y+Math.sin(a)*r0,x+Math.cos(a)*r1,y+Math.sin(a)*r1,R*0.03,1-k); }
    g.save(); g.globalCompositeOperation='lighter'; glow(x,y,R*0.8,0.9*(1-k),'255,40,40'); g.restore();
    softShock(x,y,lerp(R*0.2,R*2.4,eout(k)),0.35*(1-k),'255,80,80',0.8); }
  function cursedAura(x,y,h,c,dark,t,a){ if(a<=0.01) return; for(let i=0;i<10;i++){ const f=((t*0.9+hash(i+1400))%1), px=x+(hash(i+1401)-0.5)*h*0.8+Math.sin(t*3+i)*h*0.08, py=y-h*0.1-f*h*1.1, r=h*(0.16+0.12*hash(i+1402))*(1-f*0.5);
      if(dark) puff(px,py,r,0.5*a*(1-f),'10,2,8'); g.save(); g.globalCompositeOperation='lighter'; glow(px,py,r*0.9,0.4*a*(1-f),c); g.restore(); } }   // chú lực cuộn lên như lửa
  function scC(u,t){ const {sx:SX,cx:CX,gx:GX,lx:LX,y:Y}=CG;
    const dash=eio(seg(u,1.5,1.95)), bf1=seg(u,2.0,2.7), kb1=eout(seg(u,2.0,2.6)), clw=seg(u,2.4,3.2), pen=seg(u,3.3,3.7), pil=seg(u,3.7,4.3), knock=eout(seg(u,3.75,4.3)),
      thr=seg(u,5.0,5.7), bf2=seg(u,5.7,6.5), beam=seg(u,6.6,8.0), boom=seg(u,8.0,9.0);
    // đất nứt + bụi lơ lửng (áp lực chú lực)
    for(let i=0;i<14;i++){ const f=((t*0.15+hash(i+1500))%1); g.fillStyle=`rgba(90,60,50,${0.5*Math.sin(Math.PI*f)})`; g.fillRect(-100+hash(i+1501)*1400,Y-f*300,4+hash(i+1502)*6,4+hash(i+1502)*6); }
    cracks(CM,Y,seg(u,6.6,7.6),900,21);
    // 👿 Evil Larry (pháp sư tím) + Evil Gary
    const lShake=bf1>0&&bf1<0.5?Math.sin(t*70)*8:0;
    cursedAura(LX,Y,260,'170,60,255',true,t,1); cursedAura(GX,Y,140,'255,30,30',true,t,1);
    if(pen>0){ pentagram(SX-kb1*120,Y+20,eio(pen),t,170,44); }
    shadow(LX,Y,90,0.5); actor(IMG.larryMage,LX+kb1*60+lShake,Y,280,{flip:flipTo('evillarry',false),rot:0.05*Math.sin(Math.PI*bf1)});
    shadow(GX,Y,55,0.5); actor(IMG.egary,GX+(boom>0?eout(boom)*120:0),Y,135,{glow:'rgba(255,0,0,0.85)',gb:22,rot:Math.sin(t*14)*0.02});
    // 👻 bầy linh hồn của Gary chặn Catler
    if(clw>0&&clw<1) for(let i=0;i<10;i++){ const f=seg(clw,i*0.05,0.6+i*0.04), x=lerp(GX-60,CM-40+(hash(i+1600)-0.5)*120,eout(f)), y=Y-100-hash(i+1601)*160; actor(IMG.soul,x,y,70,{a:1-seg(clw,0.7,1),rot:Math.sin(t*9+i)*0.2}); }
    // 🔨 Stalin: đứng → lao búa → bị cột tím hất văng → Catler đỡ → ném búa
    let sxp=SX+dash*(LX-SX-160); if(u>=1.95) sxp=LX-160-kb1*380; if(u>=3.75) sxp=lerp(LX-160-380,CX+70,knock);
    const sy=Y-(u>=3.75&&u<4.3?Math.sin(Math.PI*knock)*180:0);
    cursedAura(sxp,Y,150,'120,190,255',false,t,1); cursedAura(CX,Y,120,'255,140,40',false,t,clw>0?0.6:1);
    if(dash>0&&dash<1) for(let k=1;k<6;k++) actor(IMG.stalin,sxp-k*60,sy,150,{a:0.3-k*0.05});
    shadow(sxp,Y,50); actor(IMG.stalin,sxp,sy,150,{rot:u>=3.75&&u<4.3?-1.2*Math.sin(Math.PI*knock):(dash>0&&dash<1?0.25:0)});
    { const hc=prep(IMG.hammer); if(hc&&thr<=0){ const hx=sxp+40, hy=sy-120-(u>=4.6&&u<5.0?eout(seg(u,4.6,5.0))*60:0); g.save(); g.translate(hx,hy); g.rotate(dash>0&&dash<1?1.2:-0.6); g.drawImage(hc.src,hc.sx,hc.sy,hc.sw,hc.sh,-34,-34,68,68*hc.sh/hc.sw); g.restore();
        if(Math.random()<0.5) bolt(hx,hy,hx+(Math.random()-0.5)*160,hy-80-Math.random()*120,1.6,0.8,'150,210,255'); } }
    // 🐱 Catler: vồ lửa → lửa vs linh hồn → đỡ Stalin
    const cxp=clw>0&&clw<1?lerp(CX,CM-60,eio(seg(clw,0,0.45)))-eout(seg(clw,0.55,1))*(CM-60-CX):CX, cyp=Y-(clw>0&&clw<1?Math.sin(Math.PI*seg(clw,0,0.55))*110:0);
    shadow(cxp,Y,40); actor(clw>0&&clw<0.6?IMG.catlerAtk:IMG.catler,cxp,cyp,115,{rot:clw>0&&clw<0.5?0.3:0});
    if(clw>0.35&&clw<0.7){ g.save(); g.globalCompositeOperation='lighter'; glow(CM-10,Y-140,160,0.9,'255,140,40'); g.restore(); if(Math.random()<0.8) sparks(CM-10,Y-140,6,'255,160,60',8); }
    // ⚫ HẮC THIỂM 1: búa chạm khiên tím của Larry
    blackFlash(LX-110,Y-150,bf1,520); if(u>=2.0&&u<2.07){ shake=34; sparks(LX-110,Y-150,40,'255,80,80',12); }
    // 💜 cột tím phun lên từ ngũ giác dưới chân Stalin
    if(pil>0&&pil<1){ const px=LX-160-380, a=Math.sin(Math.PI*pil); g.save(); g.globalCompositeOperation='lighter'; for(const [w,al] of [[260,0.25],[120,0.5],[40,0.95]]){ const gr=g.createLinearGradient(0,Y,0,Y-1600); gr.addColorStop(0,`rgba(190,90,255,${al*a})`); gr.addColorStop(1,'rgba(190,90,255,0)'); g.fillStyle=gr; g.fillRect(px-w/2,Y-1600,w,1600); } g.restore(); if(u<3.78) shake=20; }
    // 🔥⚡ búa sét + lửa xoay vút về phía 2 kẻ ác → HẮC THIỂM 2
    if(thr>0&&thr<1){ const hx=lerp(CX+100,CM+260,ein(thr)), hy=Y-170-Math.sin(Math.PI*thr)*80, hc=prep(IMG.hammer);
      for(let k=1;k<6;k++) puff(hx-k*30,hy+Math.sin(k)*10,30-k*4,0.6,'255,140,40');
      if(hc){ g.save(); g.translate(hx,hy); g.rotate(t*25); g.drawImage(hc.src,hc.sx,hc.sy,hc.sw,hc.sh,-40,-40,80,80*hc.sh/hc.sw); g.restore(); }
      bolt(hx,hy,hx+(Math.random()-0.5)*120,hy+(Math.random()-0.5)*120,2,0.9,'150,210,255'); g.save(); g.globalCompositeOperation='lighter'; glow(hx,hy,90,0.8,'255,170,80'); g.restore(); }
    blackFlash(CM+260,Y-170,bf2,700); if(u>=5.7&&u<5.77){ shake=40; sparks(CM+260,Y-170,60,'255,90,90',14); }
    // 💥 ĐỐI CHƯỞNG: xanh+cam (Stalin+Catler) vs đỏ+tím (Gary+Larry)
    if(beam>0&&boom<=0){ const mid=CM+70+Math.sin(t*6)*40-beam*30, my=Y-160;
      g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round';
      for(const [x0,y0,c1,c2] of [[CX+120,Y-110,'150,210,255','255,150,60'],[GX-40,Y-100,'255,40,40','190,90,255']]){ for(const [lw,al] of [[70,0.2],[30,0.55],[10,1]]){ for(const [c,o] of [[c1,-6],[c2,6]]){ g.strokeStyle=`rgba(${c},${al})`; g.lineWidth=lw*0.6; g.beginPath(); g.moveTo(x0,y0+o); g.quadraticCurveTo((x0+mid)/2,my+o+Math.sin(t*20)*14,mid,my); g.stroke(); } } }
      glow(mid,my,lerp(120,260,beam)+30*Math.sin(t*30),1,'255,240,240'); g.restore();
      if(Math.random()<0.9) sparks(mid,my,6,Math.random()<0.5?'150,210,255':'255,60,80',10); shake=Math.max(shake,4+beam*8); dust(mid+(Math.random()-0.5)*300,Y,2,200); }
    if(boom>0){ if(u<8.07) shake=50; impact(CM+40,Y-160,boom,600); g.save(); g.globalCompositeOperation='lighter'; glow(CM+40,Y-160,lerp(200,1400,eout(boom)),1-boom,'255,240,230'); g.restore(); dustWall(CM+40,Y,lerp(200,1600,eout(boom)),0.8*(1-boom)); }
    // 🎬 cận chia khung chéo (kiểu JJK): trên Stalin (chú lực xanh) · dưới Evil Gary (đỏ)
    if(u>=0.9&&u<1.5) ins(()=>{ const k=seg(u,0.9,1.5), sl=eout(seg(u,0.9,1.05));
      g.save(); g.beginPath(); g.moveTo(-VW*(1-sl),0); g.lineTo(VW,0); g.lineTo(VW,VH*0.38); g.lineTo(-VW*(1-sl),VH*0.56); g.closePath(); g.clip(); bgFocus(t,'#1a3a6a','#030814',true,VW/2,VH*0.25);
      g.save(); g.globalCompositeOperation='lighter'; glow(VW/2,VH*0.3,VW*0.5,0.6,'120,190,255'); g.restore(); actor(IMG.stalin,VW*0.55,VH*0.62,VH*0.62*lerp(1,1.06,k),{});
      for(let i=0;i<3;i++) bolt(VW*(0.2+i*0.3),0,VW*(0.3+i*0.2),VH*0.4,2,0.8,'150,210,255'); g.restore();
      g.save(); g.beginPath(); g.moveTo(0,VH*0.6); g.lineTo(VW*(1+(1-sl)),VH*0.42); g.lineTo(VW*(1+(1-sl)),VH); g.lineTo(0,VH); g.closePath(); g.clip(); bgFocus(t,'#5a0606','#0a0101',true,VW/2,VH*0.75);
      cursedAura(VW*0.45,VH*1.02,VH*0.5,'255,30,30',true,t,1); actor(IMG.egary,VW*0.45,VH*1.04,VH*0.55*lerp(1,1.06,k),{glow:'rgba(255,0,0,0.9)',gb:30}); g.restore();
      g.save(); g.strokeStyle='#000'; g.lineWidth=10; g.beginPath(); g.moveTo(0,VH*0.58); g.lineTo(VW,VH*0.4); g.stroke(); g.restore(); });
    // 🎬 cận Catler đỡ Stalin, bùng lửa
    if(u>=4.3&&u<5.0) ins(()=>{ const k=seg(u,4.3,5.0); bgFocus(t,'#ff9a40','#3a0a02',true,VW/2,VH*0.55); cursedAura(VW/2,VH*0.98,VH*0.6,'255,140,40',false,t,1);
      actor(IMG.catlerAtk,VW*0.42,VH*1.0,VH*0.6*lerp(1,1.08,k),{}); actor(IMG.stalin,VW*0.75,VH*1.02,VH*0.42,{rot:-0.15});
      if(k<0.1){ g.fillStyle=`rgba(255,240,220,${0.6*(1-k/0.1)})`; g.fillRect(0,0,VW,VH); } });
    // 🎬 chèn HẮC THIỂM: khung âm bản đen đỏ với bóng 2 nhân vật
    for(const [t0,a,b] of [[2.0,IMG.stalin,IMG.larryMage],[5.7,IMG.catlerAtk,IMG.egary]]) if(u>=t0&&u<t0+0.18) ins(()=>{ g.fillStyle='#d01020'; g.fillRect(0,0,VW,VH); g.fillStyle='#000'; for(let i=0;i<9;i++){ const an=hash(i+t0*100)*Math.PI*2; blackBolt(VW/2,VH/2,VW/2+Math.cos(an)*VH,VH/2+Math.sin(an)*VH,14,1); }
      actor(a,VW*0.3,VH*0.75,VH*0.4,{filter:'brightness(0)'}); actor(b,VW*0.72,VH*0.75,VH*0.45,{filter:'brightness(0)',flip:true}); });
  }
  const camC=u=>keys(u,[[0,660,700,0.5,0],[0.85,660,700,0.55,0.02],[1.5,640,720,0.58,0],[1.95,CG.lx-200,750,0.95,0.06],[2.0,CG.lx-170,740,1.2,0.08],[2.7,CG.lx-300,750,0.72,0.02],
    [2.75,CM-40,760,0.95,-0.04],[3.25,CM-40,760,1.0,-0.05],[3.3,CG.lx-500,760,0.7,0],[4.3,420,740,0.55,0.03],[5.0,480,740,0.6,0],[5.6,CM+200,740,0.85,0.06],[5.75,CM+260,720,1.15,0.08],
    [6.5,680,730,0.52,0],[7.3,690,720,0.6,-0.04],[8.0,690,720,0.66,-0.05],[8.05,680,740,0.52,0],[9,680,740,0.5,0]]);

  // ═════════ D — SPIDER CAT lướt cắt qua bầy quái ═════════
  function scD(u,t){ const k=seg(u,0.2,2.6), x=lerp(-250,1050,eio(k)), y=800;
    for(let i=0;i<8;i++){ const mx=-60+i*130, my=y+((i%2)*70)-20, pass=(mx+250)/1300, hit=seg(eio(k),pass,pass+0.001), cut=hit>0?seg(u,0.2+pass*2.4,0.2+pass*2.4+0.8):0;
      if(cut>0) halves(mx,my,110,false,cut,-0.15+((i%3)-1)*0.25); else monster(mx,my,110,false,1,Math.sin(t*3+i)*0.05);
      if(cut>0 && cut<0.25) slash(mx-70,my-50-((i%3)-1)*20,mx+70,my-70+((i%3)-1)*20,1-cut*4,'230,190,255'); }
    if(k>0.05 && k<1){ g.save(); g.lineCap='round'; for(let L=0;L<5;L++){ const off=(L-2)*16, P=[]; for(let s=0;s<16;s++) P.push([x-s*36, y-55+off+(Math.random()-0.5)*10]);
      for(const [lw,c,cmp] of [[12,'rgba(150,60,255,0.2)','lighter'],[5,'rgba(220,170,255,0.9)','lighter'],[2,'rgba(5,0,10,1)','source-over']]){ g.globalCompositeOperation=cmp; g.strokeStyle=c; g.lineWidth=lw*(1-L*0.08); g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); } } g.restore(); }
    actor(IMG.spider,x,y,115,{rot:0.22}); }
  const camD=u=>[lerp(-40,820,eio(seg(u,0.2,2.6))),760,1.45,0];

  // ═════════ E — CHILL GUY: ăn đòn vẫn chill → một cú đá ═════════
  function scE(u,t){ const x=300, y=850, kick=seg(u,1.85,2.05), fly=seg(u,2.05,2.9);
    const hitA=seg(u,0.35,0.55), hitB=seg(u,1.0,1.2);
    monster(x-150+Math.sin(Math.PI*hitA)*70,y-10,118,true,1,Math.sin(Math.PI*hitA)*0.3);
    monster(x+150-Math.sin(Math.PI*hitB)*60+eout(fly)*620,y+10-Math.sin(Math.PI*fly)*240,124,false,1,fly*7+(hitB>0&&hitB<1?-0.3:0));
    if(u>=0.45 && u<0.5){ sparks(x-40,y-80,10); shake=4; } if(u>=1.1 && u<1.15){ sparks(x+40,y-80,10); shake=4; }
    shadow(x,y,40); if(kick>0 && u<2.7) actor(IMG.chillKick,x+kick*70,y-kick*50,165,{flip:true}); else actor(IMG.chill,x,y-Math.abs(Math.sin(u*2))*1.5,138,{flip:u>1.3,rot:(hitA>0&&hitA<1?0.04:0)+(hitB>0&&hitB<1?-0.04:0)});
    if(u>=2.05 && u<2.12) shake=18; impact(x+150,y-90,seg(u,2.05,2.45),170); }
  const camE=u=>keys(u,[[0,300,760,1.45],[1.8,300,760,1.6],[2.05,330,750,1.75],[2.15,380,740,1.3],[3,440,740,1.2]]);

  // ═════════ F — RICARDO: lắc né rồi tung cú đấm ═════════
  function scF(u,t){ const x=290, y=850, pun=seg(u,1.85,2.0), fly=seg(u,2.0,2.9);
    g.save(); g.globalCompositeOperation='lighter'; for(const [w,al] of [[1,0.07],[0.75,0.07],[0.5,0.08]]){ const sg=g.createLinearGradient(x,250,x,y); sg.addColorStop(0,'rgba(255,245,220,0)'); sg.addColorStop(1,`rgba(255,245,220,${al})`);
      g.fillStyle=sg; g.beginPath(); g.moveTo(x-25*w,250); g.lineTo(x+25*w,250); g.lineTo(x+150*w,y+15); g.lineTo(x-150*w,y+15); g.closePath(); g.fill(); } g.restore(); addGlow(x,y,140,0.25,'255,240,210');
    const sw1=seg(u,0.4,0.7), sw2=seg(u,1.1,1.4);
    monster(x-150+Math.sin(Math.PI*sw1)*80,y,120,true,1,Math.sin(Math.PI*sw1)*0.35);
    monster(x+160-Math.sin(Math.PI*sw2)*70+eout(fly)*600,y-Math.sin(Math.PI*fly)*200,124,false,1,fly*6);
    const dodge=Math.sin(Math.PI*sw1)*36-Math.sin(Math.PI*sw2)*36, fr=IMG.rcFr[Math.floor(u*6)%4];
    shadow(x,y,45); actor(fr.naturalWidth?fr:IMG.ricardo,x+dodge+pun*80*(1-fly),y,158,{rot:pun*0.28*(1-fly)});
    if(u>=2.0 && u<2.07) shake=18; impact(x+150,y-85,seg(u,2.0,2.4),160); }
  const camF=u=>keys(u,[[0,300,760,1.4],[1.85,310,760,1.5],[2.0,340,750,1.7],[2.1,380,740,1.25],[3,420,740,1.15]]);

  // ═════════ G — CHONKY hoá khổng lồ, đổ sập xuống → MẶT ĐẤT NỨT TOÁC thành vực sâu, lũ quỷ đứng trên hụt chân rơi xuống ═════════
  const GC={x0:520, cy:885};
  function chasmHW(x,open){ const L=lerp(0,1250,eout(open)); if(x<GC.x0-30 || x>GC.x0+L) return 0; const k=Math.min(1,(x-GC.x0+30)/120)*Math.min(1,(GC.x0+L-x)/160);
    return k*(120+34*Math.sin(x*0.021)+20*Math.sin(x*0.067+1))*eout(open); }   // nửa bề rộng vực tại x (lởm chởm, mở dần ra xa)
  function scG(u,t){ const x=260, y=880, grow=eio(seg(u,0.1,1.6)), fall=ein(seg(u,1.7,2.25)), open=seg(u,2.25,3.4);
    const X0=GC.x0-40, X1=GC.x0+1300, N=60, top=[], bot=[];
    for(let i=0;i<=N;i++){ const xx=lerp(X0,X1,i/N), hw=chasmHW(xx,open), j=(hash(i+3)-0.5)*hw*0.15; top.push([xx,GC.cy-hw*0.7+j]); bot.push([xx,GC.cy+hw*0.5+j*0.6]); }
    if(open>0){
      // 🕳️ lòng vực: mép đá sáng → vách tối → đáy đỏ rực (địa ngục) ở sâu
      g.save(); g.beginPath(); top.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); for(let i=N;i>=0;i--) g.lineTo(bot[i][0],bot[i][1]); g.closePath();
      const gr=g.createLinearGradient(0,GC.cy-110,0,GC.cy+70); gr.addColorStop(0,'#6b4a36'); gr.addColorStop(0.18,'#24120c'); gr.addColorStop(0.5,'#080203'); gr.addColorStop(0.8,'#5a0a03'); gr.addColorStop(1,'#ff6a1a');
      g.fillStyle=gr; g.fill(); g.save(); g.clip(); g.globalCompositeOperation='lighter';
      for(let i=0;i<10;i++){ const gx=lerp(X0+80,X0+80+1180*eout(open),i/9); glow(gx,GC.cy+40,130,0.7*(0.7+0.3*Math.sin(t*4+i)),'255,90,20'); } g.restore();   // lửa địa ngục rực dưới đáy
      g.save(); g.globalCompositeOperation='lighter'; addGlow(lerp(X0,X0+1250*eout(open),0.5),GC.cy,700*eout(open),0.25,'255,70,20'); g.restore();   // vầng đỏ hắt lên mặt đất quanh vực
      if(Math.random()<0.9) for(let q=0;q<2;q++) parts.push({k:'spark',x:lerp(X0+60,X0+60+1200*eout(open),Math.random()),y:GC.cy,vx:(Math.random()-0.5)*1.5,vy:-2-Math.random()*3,l:40,L:40,c:'255,140,60'});   // tàn lửa bay lên
      g.lineWidth=6; g.strokeStyle='rgba(185,140,105,0.95)'; g.beginPath(); top.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke();   // mép đá trên
      g.strokeStyle='rgba(30,14,10,0.9)'; g.lineWidth=4; g.beginPath(); bot.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); g.restore();
      cracks(GC.x0+40,GC.cy,seg(u,2.25,2.7),520,3); cracks(GC.x0+600,GC.cy,seg(u,2.5,3.1),420,9);   // vết nứt toả ra hai bên vực
      if(open<1 && Math.random()<0.9){ const ex=lerp(X0,X0+1250,eout(open)); dust(ex,GC.cy,3,90); for(let q=0;q<3;q++) parts.push({k:'rock',x:ex+(Math.random()-0.5)*60,y:GC.cy-20,vx:(Math.random()-0.5)*3,vy:-3-Math.random()*4,l:50,L:50,c:'70,48,40',r:4+Math.random()*8}); }
      if(Math.random()<0.4*(1-seg(u,3.6,4.5))){ const rx=lerp(X0+60,X0+1200,Math.random())*Math.min(1,eout(open)*1.2); parts.push({k:'rock',x:rx,y:GC.cy-25,vx:0,vy:2,l:30,L:30,c:'90,62,50',r:3+Math.random()*6}); }   // đá vụn lở xuống vực
    }
    // 👹 lũ quỷ: vực mở tới đâu thì hụt chân rơi xuống tới đó (cắt theo mép dưới vực → như rơi vào trong)
    for(let i=0;i<9;i++){ const mx=GC.x0+40+i*120, my=GC.cy-30+(i%3)*30, reach=GC.x0+lerp(0,1250,eout(open)), f=open>0&&reach>mx?seg(u,2.25+(mx-GC.x0)/1250*1.15,2.25+(mx-GC.x0)/1250*1.15+1.1):0;
      if(f>=1) continue;
      if(f<=0){ monster(mx,my,108,false,1,Math.sin(t*3+i)*0.05); continue; }
      const dy=ein(f)*260, sx=mx+(hash(i)-0.5)*40*f;
      g.save(); g.beginPath(); g.moveTo(-3000,-3000); g.lineTo(3000,-3000); for(let k=N;k>=0;k--) g.lineTo(bot[k][0],bot[k][1]); g.lineTo(-3000,GC.cy+60); g.closePath(); g.clip();
      actor(IMG.soul,sx,lerp(my,GC.cy,Math.min(1,f*3))+dy,108*(1-f*0.25),{rot:(hash(i+5)-0.5)*3*f,filter:`brightness(${1-f*0.7})`}); g.restore();
      if(f<0.2 && Math.random()<0.4) sparks(sx,GC.cy-40,3,'255,120,60',3); }
    const h=lerp(120,560,grow); shadow(x+fall*h*0.55,y,h*0.4,0.5); actor(IMG.chonky,x,y,h,{flip:true,rot:fall*1.45+(1-fall)*Math.sin(u*6)*0.05*grow,sx:1+0.05*Math.sin(u*8)*grow*(1-fall)});
    if(u>=2.25 && u<2.33){ shake=30; dust(x+300,y,45,420); rocks(x+300,y,35,4); } impact(x+330,y-60,seg(u,2.25,2.7),320); }
  const camG=u=>keys(u,[[0,360,760,1.0],[1.6,420,680,0.62],[2.3,560,720,0.58],[4.5,860,760,0.6]]);

  // ═════════ H — KING CHEEMS bị kỵ sĩ vây → MỘT NHÁT CẮT · Joninn tra kiếm vào vỏ → cả bầy chết ═════════
  const HK={x:250,y:830}, HJ={x:470,y:1040};
  function scH(u,t){ const close=eio(seg(u,0,2.6)), cut=u>=3.0, die=seg(u,4.0,5.6), sheath=seg(u,3.1,3.9);
    g.save(); g.fillStyle=`rgba(0,0,0,${0.35*close})`; g.fillRect(-1500,-1500,3500,3500); g.restore();   // tối dần, căng thẳng
    const N=9; for(let i=0;i<N;i++){ const a=Math.PI+(i/(N-1))*Math.PI*1.0-0.0, R=lerp(330,175,close), mx=HK.x+Math.cos(a)*R*1.2, my=HK.y-30+Math.sin(a)*70*(i%2?1:0.6)+40;
      const raise=seg(u,2.2,2.9)*0.4; if(die>0) halves(mx,my,128,Math.cos(a)<0,die,-0.2); else monster(mx,my,128,Math.cos(a)<0,1,-raise*(Math.cos(a)>0?-1:1)); }   // quay mặt vào King
    addGlow(HK.x,HK.y-70,140,0.35+0.2*close,'255,210,90'); shadow(HK.x,HK.y,50); actor(IMG.king,HK.x,HK.y,140,{rot:Math.sin(t*12)*0.015*close});
    if(u>=3.0 && u<3.35){ const k=seg(u,3.0,3.35); slash(-200,HK.y-260,900,HK.y+80,1-k,'240,250,255'); }   // 1 nhát cắt xuyên ngang cả khung
    if(u>=3.0 && u<3.08) shake=10;
    // Joninn tiền cảnh (cùng khung): tay tra kiếm vào vỏ — CẠCH
    if(cut){ shadow(HJ.x,HJ.y,70,0.5); actor(IMG.joninn,HJ.x,HJ.y,250,{flip:true}); if(sheath>0.95 && u<4.1){ addGlow(HJ.x-30,HJ.y-95,40,1-seg(u,3.9,4.1),'255,255,255'); } }
  }
  const camH=u=>keys(u,[[0,300,760,0.95],[1.2,300,780,1.05],[1.25,250,700,1.9,0],[2.0,250,690,2.1,0],[2.05,60,800,1.3,0],[2.9,90,800,1.4,0],[3.0,330,820,0.95,0],[4.0,330,820,0.98],[4.05,250,800,1.25,0],[5.2,260,800,1.15,0],[6.5,330,800,0.88]]);   // cận mặt King → góc thấp kỵ sĩ áp sát → 1 nhát cắt (cùng khung Joninn) → cận cả bầy đứt đôi

  // ═════════ I — phe ác yếu thế · quỷ khổng lồ trồi lên ═════════
  const QX=1020;
  function scI(u,t){ const rise=eout(seg(u,1.4,3.6)), gx=lerp(820,980,eio(seg(u,0.2,2.0)));
    for(let i=0;i<10;i++){ const mx=300+i*70, my=700+(i%3)*60, k=seg(u,0.1+i*0.08,1.1+i*0.08); if(k<1) halves(mx,my,100,false,k,-0.1+(i%2)*0.3); }
    chaosSouls(t,14,QX-200,300-u*80,900,260);
    addGlow(QX,820,520*rise,0.55*rise,'255,40,20'); g.save(); g.fillStyle=`rgba(15,0,0,${0.9*rise})`; g.beginPath(); g.ellipse(QX,850,360*rise,70*rise,0,0,Math.PI*2); g.fill(); g.restore(); cracks(QX,850,rise,620,11);
    demon(QX,850-lerp(0,460,rise),1500,rise,seg(u,2.6,3.8),t,0);
    shadow(gx,880,50); actor(IMG.egary,gx,880,120,{glow:'rgba(255,0,0,0.8)',gb:18,rot:Math.sin(t*16)*0.04});
    if(u>=1.4 && u<1.5) shake=14; }
  const camI=u=>keys(u,[[0,700,700,0.6],[1.4,820,640,0.5],[4,QX-60,420,0.4]]);

  // ═════════ P — quỷ to GIẬT DÂY: 2 sợi dây đỏ nối Evil Gary + Evil Larry → bắt chúng gọi linh hồn mới (to nhỏ) mãi không hết, các meme đánh tới mệt ═════════
  const PD={x:700,yB:560,w:1500}, PG={x:430,y:610}, PL={x:900,y:600}, PGY=820;   // 2 con rối treo LƠ LỬNG giữa không trung trên đầu bầy hồn
  function demHand(D,side){ const F=demFrame(5), k=D.w/494, top=D.yB-F.last*k; return side<0?[D.x-D.w/2+165*k,top+215*k]:[D.x-D.w/2+322*k,top+228*k]; }
  function redString(ax,ay,bx,by,t,a,seed){ const mx=(ax+bx)/2+Math.sin(t*2+seed)*30, my=(ay+by)/2+70+Math.sin(t*3+seed)*20; g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round';
    for(const [lw,al,c] of [[24,0.14,'255,20,20'],[9,0.4,'255,40,40'],[3.2,0.95,'255,110,100'],[1.2,1,'255,230,220']]){ g.strokeStyle=`rgba(${c},${al*a})`; g.lineWidth=lw; g.beginPath(); g.moveTo(ax,ay); g.quadraticCurveTo(mx,my,bx,by); g.stroke(); }
    for(let q=0;q<4;q++){ const f=(t*0.8+q/4+seed*0.3)%1, x=(1-f)*(1-f)*ax+2*(1-f)*f*mx+f*f*bx, y=(1-f)*(1-f)*ay+2*(1-f)*f*my+f*f*by; glow(x,y,28,0.8*a,'255,60,40'); }   // xung hắc lực chạy dọc dây
    glow(ax,ay,60,0.8*a,'255,40,30'); g.restore(); }
  const TIRED=['stalincat','doge','cheems','chillguy','kingcheems','ricardo'], _tim={}, tim=k=>_tim[k]||(_tim[k]=av(k));
  function scP(u,t){
    chaosSouls(t,16,600,-60,1200,260);
    addGlow(PD.x,PD.yB-560,900,0.5,'255,40,30'); demon.lit=1.15; demon(PD.x,PD.yB,PD.w,1,0,t,Math.sin(t*1.3)*0.015); demon.lit=0;
    const D=[], tug=(sd)=>Math.pow(Math.max(0,Math.sin(t*5.2+sd)),6);
    // 🎎 2 con rối: Evil Gary + Evil Larry bị giật dây → giơ người gọi hồn
    const pup=[[PG,IMG.egary,125,0,'evilgary'],[PL,IMG.larry,165,2.1,'evillarry']].map(([P,im,h,sd,k])=>{ const j=tug(sd), x=P.x+Math.sin(t*2+sd)*6, y=P.y-14-j*34-Math.abs(Math.sin(t*1.7+sd))*8;
      pentagram(x,PGY,0.7+0.3*j,t,170,42); addGlow(x,PGY,180,0.35+0.4*j,'255,30,30'); bolt(x,y-h*0.4,x+(Math.random()-0.5)*80,PGY,1.6,0.5+0.5*j,'255,40,40');   // tia hắc lực từ con rối xuống vòng gọi hồn
      D.push({y:2000,f:()=>{ shadow(x,PGY,45,0.3); actor(im,x,y,h,{glow:'rgba(255,0,0,0.85)',gb:20+j*20,rot:Math.sin(t*9+sd)*0.05*j+(k==='evilgary'?-0.06:0.04)*j}); }});
      return [x,y-h*0.92]; });
    // 💀 linh hồn mới trồi lên không ngớt — con to con nhỏ, lao về phía các meme, bị chém thì con khác lên thay
    for(let i=0;i<40;i++){ const L=3.4, age=((u+hash(i+500)*L)%L)/L, src=i%2?PG:PL, big=hash(i+510)<0.22, h=big?190+hash(i+511)*110:55+hash(i+512)*55;
      const sx=src.x-120+hash(i+513)*240, sy=PGY-10+hash(i+520)*110, tx=250+hash(i+514)*70, m=seg(age,0.16,0.86), x=lerp(sx,tx,m), y=sy;
      D.push({y,f:()=>{ if(age<0.16){ const e=age/0.16; ring(sx,sy,h*0.45*e+10,0.8*(1-e),'255,40,40',4,0.25);
          g.save(); g.beginPath(); g.rect(-3000,-3000,6000,sy+3000); g.clip(); actor(IMG.soul,sx,sy+h*(1-eout(e)),h,{filter:`brightness(${0.5+0.5*e})`}); g.restore(); }
        else if(age<0.86){ const b=Math.abs(Math.sin(t*7+i))*4; shadow(x,y,h*0.22,0.3); actor(IMG.soul,x,y-b,h,{rot:Math.sin(t*5+i)*0.05}); }
        else halves(x,y,h,false,(age-0.86)/0.14,-0.2+hash(i)*0.4); }}); }
    // 😮‍💨 các meme đánh mãi mệt lả: vung đòn chậm, thở dốc, mồ hôi
    TIRED.forEach((k,i)=>{ const x=70+(i%3)*85+(i>2?40:0), y=800+Math.floor(i/3)*85+(i%2)*14, l=lunge(t,i*1.7,2.6), pant=Math.sin(t*7+i);
      D.push({y,f:()=>{ shadow(x,y,34,0.35); actor(tim(k),x+l*22,y,k==='stalincat'?118:100,{flip:flipTo(k,true),rot:0.12+0.15*l,sy:1-0.035*pant,sx:1+0.02*pant});
        if(((t*1.4+i*0.37)%1)<0.04) parts.push({k:'spark',x:x+10,y:y-95,vx:1.2,vy:-1.5,l:28,L:28,c:'170,220,255'});   // giọt mồ hôi
        if(l>0.95 && Math.random()<0.3) sparks(x+60,y-50,4,'255,220,170',3); }}); });
    D.sort((a,b)=>a.y-b.y); for(const d of D) d.f();
    // 🔴 2 dây đỏ từ 2 tay quỷ xuống đầu 2 con rối
    if(IMG.wdemon.naturalWidth){ const [ax,ay]=demHand(PD,-1), [bx,by]=demHand(PD,1); redString(ax,ay,pup[0][0],pup[0][1],t,1,0); redString(bx,by,pup[1][0],pup[1][1],t,1,2.1); }
  }
  const camP=u=>keys(u,[[0,700,170,0.62],[1.5,700,330,0.55],[3.0,520,610,0.5],[5,470,640,0.5]]);

  // ═════════ Q — Gigachad quay lại nhìn các meme mệt lả → quyết định → bùng khí, hoá to, lao lên đánh quỷ ═════════
  const QG={x:600,y:880};
  function scQ(u,t){ const turn1=seg(u,0.35,0.65), turn2=seg(u,1.75,2.0), rs=seg(u,2.0,2.4), go=seg(u,2.4,3.5);
    addGlow(1350,250,800,0.4,'255,40,30'); demon2(5,1350,600,1300,{flip:true,lit:0.9});   // quỷ to chờ phía xa
    chaosSouls(t,10,1100,150,900,200);
    TIRED.forEach((k,i)=>{ const x=150+i*58, y=870+(i%2)*28, pant=Math.sin(t*6+i); shadow(x,y,30,0.35); actor(tim(k),x,y,92,{flip:flipTo(k,true),rot:0.1+(i%3===1?0.25:0),sy:1-0.04*pant}); });   // mệt lả nhìn lên Giga
    const faceL=u<0.5||(u>=0.5&&u<1.875), sq=Math.max(0.06,Math.abs(Math.cos(Math.PI*(u<1?turn1:turn2))));
    const right=u<0.5?true:u<1.875?false:true;
    if(rs>0){ const k=eout(rs); addGlow(QG.x,QG.y-180,260+260*k,0.8*(1-go*0.5),'255,235,170'); if(u>=2.0 && u<2.06){ shake=24; dust(QG.x,QG.y,30,260); rocks(QG.x,QG.y,14,3); } ring(QG.x,QG.y,lerp(40,520,k),1-rs,'255,230,170',8,0.25); }
    const big=u>=2.0, h=big?lerp(300,330,eout(rs))+ein(go)*900:280, gx=QG.x+ein(go)*1000, gy=QG.y-Math.sin(Math.PI*Math.min(1,go*1.3))*260;
    if(go>0) for(let k=1;k<6;k++) actor(IMG.gigaBig,gx-k*70*go,gy+k*10*go,h*(1-k*0.03),{a:0.3-k*0.05,flip:flipTo('gigachad',true)});   // bóng mờ khi lao
    shadow(gx,QG.y,h*0.25,0.45*(1-go));
    actor(big?IMG.gigaBig:IMG.giga,gx,gy,h,{flip:flipTo('gigachad',right),sx:sq,rot:go*0.18});
    if(u>0.8 && u<1.75){ addGlow(QG.x+(right?16:-16),QG.y-h*0.9,20,0.3,'255,255,255'); }
    if(u>=1.95 && u<2.05) addGlow(QG.x+18,QG.y-h*0.9,60,1-seg(u,1.95,2.05),'255,255,255');   // ánh mắt loé lên khi quyết định
    if(go>0 && go<1 && Math.random()<0.8) dust(gx-80,QG.y,3,120);
  }
  const camQ=u=>keys(u,[[0,560,760,1.0],[0.65,520,700,1.25],[1.75,560,640,1.45],[2.0,580,720,1.0],[2.4,660,700,0.8],[3.5,1050,500,0.42]]);

  // ═════════ J — TRẬN CỦA 2 VỊ THẦN trên thành phố (kiểu Super Sentai), 5 cảnh liền:
  //   J1 tay đôi Giga vs quỷ · J2 quỷ bung cánh bay lên tụ BOM VĨ THÚ · J3 bom rơi, cả đám meme ngước nhìn, Giga giơ người đỡ, áp lực toả ra ·
  //   J4 Joninn + Berserk nhảy lên chém đôi quả bom → nổ tung trên trời · J5 Holy Cat chặn trước mặt, Clapping Cat sau lưng vỗ tay đổi chỗ
  //   Chonky siêu to đè quỷ rơi thẳng xuống đất, chấn động khổng lồ ═════════
  const JM={px:860, py:-380}, GY=925;
  const TJ1=SC[7], TJ3=SC[9];
  // 🏙️ thành phố: 2 dãy cao ốc (sau + trước chân 2 vị thần) — va chạm tới đâu NỔ + ĐỔ SẬP tới đó (giữ nguyên đổ nát sang các cảnh sau)
  const SKY=[...Array(26)].map((_,i)=>({x:-900+i*120+hash(i+200)*50, w:70+hash(i+210)*60, h:180+hash(i+220)*260, back:true})).concat(
            [...Array(22)].map((_,i)=>({x:-850+i*140+hash(i+300)*60, w:90+hash(i+310)*70, h:120+hash(i+320)*200, back:false})));
  function mountains(t){
    const ridge=mountains.R||(mountains.R=(()=>{ let P=[[-900,900],[-650,380],[-380,520],[-120,240],[150,430],[420,120],[640,0],[JM.px,JM.py],[1080,-20],[1320,200],[1600,90],[1900,330],[2200,250],[2600,900]];
      for(let lv=0;lv<4;lv++){ const Q=[]; for(let i=0;i<P.length-1;i++){ const a=P[i], b=P[i+1], L=Math.hypot(b[0]-a[0],b[1]-a[1]); Q.push(a,[(a[0]+b[0])/2+(hash(i*7+lv*131)-0.5)*L*0.25,(a[1]+b[1])/2+(hash(i*11+lv*97)-0.5)*L*0.35]); } Q.push(P[P.length-1]); P=Q; }
      return P; })());
    g.save(); g.globalCompositeOperation='lighter'; glow(JM.px,JM.py+80,1100,0.55,'255,110,40'); g.restore();
    const gr=g.createLinearGradient(0,-400,0,900); gr.addColorStop(0,'#2a0a0e'); gr.addColorStop(0.45,'#160507'); gr.addColorStop(1,'#080203'); g.fillStyle=gr;
    g.beginPath(); ridge.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.closePath(); g.fill();
    g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle='rgba(255,90,40,0.25)'; g.lineWidth=24; g.beginPath(); ridge.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); g.restore();
    g.strokeStyle='rgba(255,170,110,0.55)'; g.lineWidth=2.5; g.beginPath(); ridge.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); }
  // thời điểm (phim) toà nhà bị phá: [lúc, x từ, x tới, tâm chấn, trễ/1000px, chỉ dãy trước] — lấy cú sớm nhất chạm tới nó
  const BEV=[[SC[11]+9.15,-2600,3200,QX+160,0.35,0],[TJ1+0.45,-700,500,-100,0.5,0],[TJ1+2.05,200,900,400,0.5,1],[TJ1+3.5,-1300,-100,-200,0.7,0],[TJ3+2.45,-1800,2800,150,0.8,0]];
  function bCollapse(b){ const c=b.x+b.w/2, r=hash(b.x)*0.3; let best=null;
    for(const [t0,x0,x1,xo,sp,front] of BEV){ if(c<x0||c>x1||(front&&b.back)) continue; const tt=t0+Math.abs(c-xo)/1000*sp+r; if(best==null||tt<best) best=tt; }
    return best; }
  function boom(x,y,r,k){ if(k<=0||k>=1) return; const f=eout(k);   // 💥 vụ nổ lửa kiểu sentai: cầu lửa phồng lên rồi hoá khói
    g.save(); g.globalCompositeOperation='lighter'; glow(x,y-r*f*0.6,r*(0.5+f),(1-k)*0.8,'255,160,60'); glow(x,y-r*f*0.6,r*(0.3+0.6*f),(1-k)*0.9,'255,235,190'); g.restore();
    g.save(); g.globalAlpha=0.6*Math.sin(Math.PI*k); for(let q=0;q<5;q++){ const px=x+(hash(q+x)-0.5)*r, py=y-r*f*(0.8+q*0.25), pr=r*0.45*f+1, sg=g.createRadialGradient(px,py,0,px,py,pr); sg.addColorStop(0,'rgba(30,18,16,0.9)'); sg.addColorStop(0.6,'rgba(26,14,12,0.5)'); sg.addColorStop(1,'rgba(26,14,12,0)'); g.fillStyle=sg; g.beginPath(); g.arc(px,py,pr,0,Math.PI*2); g.fill(); } g.restore(); }
  function building(b,t,shk){ const cT=bCollapse(b), k=cT==null?0:seg(t,cT,cT+1.3); if(k>=1){ g.save(); g.fillStyle=b.back?'#1a1218':'#100a0e'; g.beginPath(); g.moveTo(b.x-b.w*0.25,927); for(let q=0;q<=8;q++){ const xx=b.x-b.w*0.25+b.w*1.5*q/8, hh=Math.sin(Math.PI*q/8)*(18+b.w*0.35)*(0.55+0.45*hash(b.x+q*3)); g.lineTo(xx,927-hh); } g.lineTo(b.x+b.w*1.25,927); g.closePath(); g.fill();
      if(hash(b.x+9)<0.4){ g.fillStyle='rgba(255,120,50,0.5)'; g.fillRect(b.x+b.w*hash(b.x+11),915,4,3); } g.restore(); return; }   // đống gạch đổ nát lởm chởm (còn vài đốm lửa)
    const sink=ein(k)*b.h, tilt=(hash(b.x+1)-0.5)*0.5*k, bx=b.x+(Math.random()-0.5)*shk, by=925;
    g.save(); g.beginPath(); g.rect(-5000,-5000,10000,by+5000); g.clip(); g.translate(bx+b.w/2,by+sink); g.rotate(tilt); g.translate(-b.w/2,0);
    g.fillStyle=b.back?'#1b1420':'#0d0a12'; g.fillRect(0,-b.h,b.w,b.h+60); g.fillStyle=b.back?'#130e18':'#08060c'; g.fillRect(b.w*0.72,-b.h,b.w*0.28,b.h+60);
    for(let yy=-b.h+14; yy<-8; yy+=18) for(let xx=7; xx<b.w*0.66; xx+=14) if(hash(xx*1.3+yy+b.x)<(k>0?0.15:0.5)){ g.fillStyle=hash(xx+yy*2+b.x)<0.5?'rgba(255,205,120,0.9)':'rgba(255,150,90,0.7)'; g.fillRect(xx,yy,6,8); }
    if(b.h>300 && Math.sin(t*3+b.x)>0){ g.fillStyle='#ff3b30'; g.fillRect(b.w/2-2,-b.h-8,4,4); }
    g.restore();
    if(cT!=null){ boom(b.x+b.w/2,by-b.h*(0.35+0.4*hash(b.x+5)),b.w*2.1,seg(t,cT-0.05,cT+0.9)); if(k>0 && k<0.8 && Math.random()<0.5) dust(b.x+b.w/2,by,2,b.w); if(t>=cT && t<cT+0.06){ rocks(b.x+b.w/2,by-b.h*0.5,8,0); sparks(b.x+b.w/2,by-b.h*0.5,14,'255,200,120',7); } } }
  function skyline(t,shk,back){ for(const b of SKY) if(b.back===back) building(b,t,shk); }
  function sealGround(a,t){ if(a<=0.01) return; g.save(); g.translate(SE.x,SE.y); g.scale(1,SE.ry/SE.rx); g.globalCompositeOperation='lighter';
    for(const [r,lw] of [[SE.rx,6],[SE.rx*0.93,2.5],[SE.rx*0.62,4]]){ g.strokeStyle=`rgba(130,215,255,${a*(0.8+0.2*Math.sin(t*6))})`; g.lineWidth=lw; g.beginPath(); g.arc(0,0,r,0,Math.PI*2); g.stroke(); }
    g.rotate(t*0.4); g.font='700 34px serif'; g.fillStyle=`rgba(180,235,255,${a})`; for(let i=0;i<28;i++){ g.save(); g.rotate(i/28*Math.PI*2); g.fillText(['♪','ᚱ','♫','ᛟ','ᚢ','♩','ᛖ'][i%7],SE.rx*0.75,10); g.restore(); }
    g.restore(); }
  // 🌌 trời cao (khi camera ngước lên quá nền vẽ sẵn): đen đỏ thẫm dần lên
  function skyHigh(){ const gr=g.createLinearGradient(0,-3400,0,-450); gr.addColorStop(0,'#070103'); gr.addColorStop(0.6,'#1d0408'); gr.addColorStop(1,'rgba(45,8,12,0)'); g.fillStyle=gr; g.fillRect(-4000,-3400,9000,2950); }
  function puff(x,y,r,a,c){ if(a<=0.01||r<=1) return; const gr=g.createRadialGradient(x,y,0,x,y,r); gr.addColorStop(0,`rgba(${c},${a})`); gr.addColorStop(0.6,`rgba(${c},${a*0.55})`); gr.addColorStop(1,`rgba(${c},0)`); g.fillStyle=gr; g.beginPath(); g.arc(x,y,r,0,Math.PI*2); g.fill(); }
  // ☁️ biển mây: hole = khoét lỗ tròn (bom xuyên qua) · cut = xẻ rãnh thẳng (nhát chém) · blow = thổi bạt ra (va chạm/nổ) · lit = ánh lửa hắt lên
  function cloudSea(y0,t,a,o){ o=o||{}; if(a<=0.01) return; const lit=o.lit||0, col=`${Math.round(lerp(70,255,lit))},${Math.round(lerp(42,175,lit))},${Math.round(lerp(55,120,lit))}`;
    for(let i=0;i<70;i++){ let x=-2300+((i*74+t*14+hash(i+900)*60)%5180), y=y0+(hash(i+901)-0.5)*180; const r=120+hash(i+902)*150;
      if(o.hole){ const dx=x-o.hole.x, dy=(y-o.hole.y)*2.2, d=Math.hypot(dx,dy)||1; if(d<o.hole.r){ const p=o.hole.r-d; x+=dx/d*p; y+=dy/d*p/2.2; } }
      if(o.cut){ const d=(x-o.cut.x)*o.cut.nx+(y-o.cut.y)*o.cut.ny; if(Math.abs(d)<o.cut.w){ const p=(o.cut.w-Math.abs(d))*(d<0?-1:1); x+=o.cut.nx*p; y+=o.cut.ny*p; } }
      if(o.blow){ const dx=x-o.blow.x, dy=y-o.blow.y, d=Math.hypot(dx,dy)||1; if(d<o.blow.r){ const p=o.blow.r-d; x+=dx/d*p; y+=dy/d*p*0.5; } }
      puff(x,y+r*0.3,r*1.05,a*0.5,'22,7,12'); puff(x,y,r,a*0.7,col); } }
  // 🟣 BOM VĨ THÚ: khối cầu tím than loang lổ (như Bơm Vĩ Thú của Naruto), xoáy năng lượng bên trong, viền sáng; heat = nóng rực mặt dưới khi lao xuống
  function bijuu(x,y,R,t,heat){ if(R<=1) return; heat=heat||0;
    g.save(); g.globalCompositeOperation='lighter'; glow(x,y,R*1.8,0.32,'110,50,220'); if(heat>0) glow(x,y+R*0.45,R*1.7,0.55*heat,'255,110,40'); g.restore();
    g.save(); g.beginPath(); g.arc(x,y,R,0,Math.PI*2); g.clip();
    const b=g.createRadialGradient(x-R*0.35,y-R*0.4,R*0.05,x,y,R); b.addColorStop(0,'#6b5bb4'); b.addColorStop(0.35,'#33256f'); b.addColorStop(0.75,'#160c34'); b.addColorStop(1,'#07030f'); g.fillStyle=b; g.fillRect(x-R,y-R,2*R,2*R);
    for(let i=0;i<9;i++){ const a=t*0.4*(i%2?1:-1)+i*0.7, d=R*(0.25+0.5*hash(i+40)), px=x+Math.cos(a)*d, py=y+Math.sin(a)*d*0.8, r=R*(0.18+0.18*hash(i+41)), m=g.createRadialGradient(px,py,0,px,py,r); m.addColorStop(0,'rgba(8,3,20,0.55)'); m.addColorStop(1,'rgba(8,3,20,0)'); g.fillStyle=m; g.fillRect(px-r,py-r,2*r,2*r); }   // vân loang
    g.globalCompositeOperation='lighter'; for(let i=0;i<5;i++){ const a=t*0.3*(i%2?-1:1)+i*1.3, d=R*(0.2+0.45*hash(i+50)), px=x+Math.cos(a)*d, py=y+Math.sin(a)*d*0.8, r=R*(0.22+0.15*hash(i+51)), m=g.createRadialGradient(px,py,0,px,py,r); m.addColorStop(0,'rgba(120,95,220,0.14)'); m.addColorStop(1,'rgba(120,95,220,0)'); g.fillStyle=m; g.fillRect(px-r,py-r,2*r,2*r); }   // vệt năng lượng loang bên trong
    if(heat>0){ const h=g.createLinearGradient(0,y,0,y+R); h.addColorStop(0,'rgba(255,90,30,0)'); h.addColorStop(1,`rgba(255,150,60,${0.65*heat})`); g.fillStyle=h; g.fillRect(x-R,y,2*R,R); }
    g.restore();
    g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle='rgba(180,150,255,0.4)'; g.lineWidth=R*0.025; g.beginPath(); g.arc(x,y,R*0.985,Math.PI*1.05,Math.PI*1.75); g.stroke(); g.restore(); }
  // 🌪️ vòng mây xoáy quanh quả bom đang lao xuống (trôi ngược lên → cảm giác đang rơi rất nhanh)
  function windRings(x,y,R,t,a){ if(a<=0.01) return; g.save(); g.lineCap='round'; for(let i=0;i<5;i++){ const rr=R*(1.2+i*0.2), ph=(t*1.4+i*0.37)%1, yy=y+R*(0.5-ph*1.4); g.strokeStyle=`rgba(225,215,225,${a*0.4*Math.sin(Math.PI*ph)})`; g.lineWidth=8+i*3; g.beginPath(); g.ellipse(x,yy,rr*(0.85+0.3*ph),rr*0.2,0,Math.PI*0.08,Math.PI*0.92); g.stroke(); } g.restore(); }
  function orb(x,y,r,c,a){ if(a<=0.01) return; const gr=g.createRadialGradient(x-r*0.35,y-r*0.35,r*0.1,x,y,r); gr.addColorStop(0,`rgba(255,255,255,${a})`); gr.addColorStop(0.35,`rgba(${c},${a})`); gr.addColorStop(1,`rgba(${c},${a*0.25})`); g.fillStyle=gr; g.beginPath(); g.arc(x,y,r,0,Math.PI*2); g.fill(); }
  // 〰️ sóng chấn động MỀM (dải sáng mờ nở ra, không phải nét viền cứng)
  function softShock(x,y,r,a,c,sy){ if(a<=0.01||r<=2) return; g.save(); g.translate(x,y); g.scale(1,sy||1); const w=Math.min(r*0.35,170), gr=g.createRadialGradient(0,0,Math.max(0,r-w),0,0,r); gr.addColorStop(0,`rgba(${c},0)`); gr.addColorStop(0.7,`rgba(${c},${a})`); gr.addColorStop(1,`rgba(${c},0)`); g.globalCompositeOperation='lighter'; g.fillStyle=gr; g.beginPath(); g.arc(0,0,r,0,Math.PI*2); g.fill(); g.restore(); }
  // 🌫️ bức tường bụi cuộn ra 2 bên mặt đất
  function dustWall(x,y,r,a){ if(a<=0.01) return; for(let i=0;i<34;i++){ const an=i/34*Math.PI*2+hash(i+990)*0.15, px=x+Math.cos(an)*r, py=y+Math.sin(an)*r*0.12, pr=r*0.11+70; for(const [hy,al] of [[0.35,0.32],[0.95,0.22],[1.6,0.12]]) puff(px+(hash(i+hy*7)-0.5)*pr*0.6,py-pr*hy,pr*(1+hy*0.35),a*al,'128,98,84'); } }   // bức tường bụi cuộn cao, mềm
  // 💥 vụ nổ trên trời: chớp trắng → cầu lửa → khói tím đen văng ra + sóng chấn động rộng
  function skyBlast(x,y,k){ if(k<=0||k>=1) return; const e=eout(k), R=lerp(160,1150,e);
    g.save(); g.globalCompositeOperation='lighter';
    if(k<0.1) glow(x,y,lerp(400,1800,k*10),1-k*10,'255,250,240');   // chớp trắng
    glow(x,y,R*1.9,0.55*(1-k),'255,130,50');
    for(let i=0;i<46;i++){ const a=hash(i+880)*Math.PI*2, d=R*Math.sqrt(hash(i+881))*0.85, px=x+Math.cos(a)*d, py=y+Math.sin(a)*d*0.85-k*R*0.25, pr=R*(0.25+0.25*hash(i+882)), h=Math.min(1,d/R+k*0.8);
      puff(px,py,pr,0.55*Math.pow(1-k,1.3),`255,${Math.round(lerp(235,90,h))},${Math.round(lerp(190,30,h))}`); }   // cầu lửa cuộn: lõi trắng vàng → rìa cam đỏ
    g.restore();
    for(let i=0;i<30;i++){ const a=i/30*Math.PI*2+hash(i)*0.2, d=R*(0.85+0.35*hash(i+3)), pr=R*(0.3+0.2*hash(i+4)); puff(x+Math.cos(a)*d,y+Math.sin(a)*d*0.8-k*R*0.3,pr,0.6*Math.sin(Math.PI*Math.min(1,k*1.4)),'48,22,30'); }   // khói đen tím cuộn quanh rìa
  }
  // ⚔️ nhát chém trăng khuyết MẢNH (lõi trắng, quầng màu mềm, nhọn 2 đầu)
  function slashArc(ax,ay,bx,by,head,B,c,a){ if(a<=0.01||head<=0) return; const dx=bx-ax, dy=by-ay, L=Math.hypot(dx,dy)||1, nx=dy/L, ny=-dx/L, P=[];
    for(let i=0;i<=36;i++){ const f=i/36*head, sn=Math.sin(Math.PI*f); P.push([ax+dx*f+nx*B*sn, ay+dy*f+ny*B*sn, Math.sin(Math.PI*i/36)]); }
    g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round';
    for(const [lw,al,cc] of [[26,0.12,c],[9,0.45,c],[2.6,0.95,'255,255,255']]){ g.strokeStyle=`rgba(${cc},${al*a})`; for(let i=1;i<P.length;i++){ g.lineWidth=lw*(0.15+0.85*P[i][2]); g.beginPath(); g.moveTo(P[i-1][0],P[i-1][1]); g.lineTo(P[i][0],P[i][1]); g.stroke(); } }
    g.restore(); }
  // 🎬 CẢNH CHÈN kiểu anime: vẽ thẳng theo khung MÀN HÌNH (bỏ qua máy quay), nền vẽ riêng cho từng cảnh
  function ins(fn){ g.save(); if(WIDE){ const oW=VW, oH=VH, k=oH/960; VW=oW/k; VH=960; g.setTransform(SC_*k,0,0,SC_*k,0,0); try{ fn(); } finally{ VW=oW; VH=oH; } } else { g.setTransform(SC_,0,0,SC_,0,0); fn(); } g.restore(); }
  function bgFocus(t,c0,c1,dark,cx,cy){ cx=cx==null?VW/2:cx; cy=cy==null?VH/2:cy;   // nền vạch tập trung
    const gr=g.createRadialGradient(cx,cy,30,cx,cy,VH*0.8); gr.addColorStop(0,c0); gr.addColorStop(1,c1); g.fillStyle=gr; g.fillRect(0,0,VW,VH);
    const sd=Math.floor(t*14); g.fillStyle=dark?'rgba(0,0,0,0.3)':'rgba(255,255,255,0.22)';
    for(let i=0;i<80;i++){ const an=hash(sd*13+i)*Math.PI*2, r0=VH*(0.2+hash(sd*7+i)*0.25), w=0.003+hash(i+sd*3)*0.009; g.beginPath(); g.moveTo(cx+Math.cos(an)*r0,cy+Math.sin(an)*r0); g.lineTo(cx+Math.cos(an-w)*VH*1.2,cy+Math.sin(an-w)*VH*1.2); g.lineTo(cx+Math.cos(an+w)*VH*1.2,cy+Math.sin(an+w)*VH*1.2); g.closePath(); g.fill(); } }
  function bgRush(t,vy,top,bot,cloud){   // trời + mây trôi vút theo phương dọc (vy>0: mây trôi xuống = đang bay lên)
    const gr=g.createLinearGradient(0,0,0,VH); gr.addColorStop(0,top); gr.addColorStop(1,bot); g.fillStyle=gr; g.fillRect(0,0,VW,VH);
    const SP=VH*1.6; for(let i=0;i<26;i++){ const x=hash(i+300)*VW, sp=0.6+hash(i+301), y=((hash(i+302)*SP+t*vy*sp)%SP+SP)%SP-VH*0.3, r=60+hash(i+303)*130; puff(x,y,r,0.32,cloud||'120,62,72'); }
    if(Math.abs(vy)>200){ g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<40;i++){ const x=hash(i+400)*VW, L=80+hash(i+401)*240, y=((hash(i+402)*SP+t*vy*2.2)%SP+SP)%SP-VH*0.2; g.strokeStyle=`rgba(255,230,215,${0.08+0.12*hash(i+403)})`; g.lineWidth=1+hash(i+404)*2; g.beginPath(); g.moveTo(x,y); g.lineTo(x,y-Math.sign(vy)*L); g.stroke(); } g.restore(); } }
  function crop(im,sx,sy,sw,sh,dx,dy,dw,dh,o){ if(!im||!(im.naturalWidth||im.width)) return; o=o||{}; g.save(); g.globalAlpha=o.a==null?1:o.a; if(o.filter) g.filter=o.filter; g.drawImage(im,sx,sy,sw,sh,dx,dy,dw,dh); g.restore(); }
  function pane(x,y,w,h,fn){ g.save(); g.beginPath(); g.rect(x,y,w,h); g.clip(); fn(); g.restore(); g.save(); g.strokeStyle='#000'; g.lineWidth=6; g.strokeRect(x,y,w,h); g.restore(); }
  function jCity(t,shk,co){ skyHigh(); mountains(t); skyline(t,0,true); if(co!==false) cloudSea(-1000,t,0.55,co); sealGround(0.22,t); }

  // ── J1: TAY ĐÔI — Giga đáp xuống thành phố, 2 bên lao vào nhau, va chạm, vật lộn, quỷ vả văng Giga, Giga phản đòn đấm thẳng mặt, quỷ gầm ──
  function scJ1(u,t){
    const land=ein(seg(u,0,0.45)), ch=ein(seg(u,1.45,2.0)), grap=u>=2.0&&u<3.2, sw=seg(u,3.2,3.5), kb=eout(seg(u,3.45,4.2)), pn=ein(seg(u,4.45,4.85)), st=eout(seg(u,4.85,5.6)), roar=seg(u,5.4,6.4), bk=eio(seg(u,6.2,7.0));
    jCity(t,0,{blow:{x:400,y:-1000,r:900*eout(seg(u,2.0,3.0))*(1-seg(u,4,6))}});
    const jit=grap?Math.sin(t*55)*7:0;
    // 😈 quỷ quay mặt sang TRÁI về phía Giga: đứng → chồm lao (khung cúi) → vả → bị đấm ngửa ra → gầm
    const dfr=u<1.45?5:u<3.2?3:u<3.5?4:u<4.85?5:u<6.4?4:5;
    const dX=1300-ch*400+jit-Math.sin(Math.PI*sw)*90+st*300+bk*200, dR=(grap?-0.03:0)-Math.sin(Math.PI*sw)*0.16+(u>=4.85?0.2*(1-seg(u,5.3,6.3)):0)+(roar>0&&roar<1?Math.sin(t*40)*0.01:0);
    const CP1=[380,130], CP2=[400,90];
        addGlow(dX-150,-500,1100,0.5,'255,40,40');
    demon2(dfr,dX,1080,2100,{flip:true,rot:dR,lit:1.6});
    const E=demEye(dfr,dX,1080,2100,true); addGlow(E[0],E[1],70+roar*110,0.5+0.5*Math.max(roar*(1-seg(u,6.4,7)),0.5+0.5*Math.sin(t*5)),'255,40,30');
    // 💪 Giga quay mặt sang PHẢI: rơi từ trời xuống → lao vào → vật → bị vả văng → lấy đà đấm
    const gX=lerp(-250,-30,ch)+jit-kb*330+pn*380-st*60, gY=lerp(-1000,GY,land), gR=(grap?0.05:0)-Math.sin(Math.PI*kb)*0.22+pn*0.2*(1-st);
    if(land<1) for(let k=1;k<4;k++) actor(IMG.gigaBig,gX,gY-k*130,1000,{a:0.2-k*0.05,flip:true});
    if(pn>0&&pn<1) for(let k=1;k<4;k++) actor(IMG.gigaBig,gX-k*80,gY,1000,{a:0.22-k*0.05,flip:true,rot:gR});
    const gIm=(u>=1.95&&u<2.7)||(u>=4.8&&u<5.7)?IMG.gigaPunch:IMG.gigaBig;   // tư thế ĐẤM lúc va chạm + lúc phản đòn
    actor(gIm,gX,gY,1000,{flip:gIm===IMG.gigaBig,rot:gIm===IMG.gigaBig?gR:gR*0.5,sx:1+0.07*pn*(1-st)});
    if(u>=0.45&&u<0.52){ shake=34; dust(gX,GY,40,520); rocks(gX,GY,26,0); }
    dustWall(-250,GY,lerp(150,1500,eout(seg(u,0.45,1.8))),0.9*(1-seg(u,0.45,1.8)));
    // ⚔️ va chạm 1
    if(u>=2.0&&u<2.07){ shake=40; sparks(CP1[0],CP1[1],60,'255,230,200',15); }
    impact(CP1[0],CP1[1],seg(u,2.0,2.5),420);   // vạch va chạm toả ra (kiểu manga)
    if(grap){ if(Math.random()<0.5) sparks(CP1[0]+(Math.random()-0.5)*60,CP1[1]+(Math.random()-0.5)*60,3,'255,200,160',8); if(Math.random()<0.4) dust(100+Math.random()*700,GY,2,140); }
    cracks(380,GY,seg(u,2.0,3.0),700,4);
    // 🩸 vuốt quỷ quét trúng
    if(sw>0&&u<3.8){ const k=seg(u,3.2,3.5), f=1-seg(u,3.5,3.8); for(let i=0;i<3;i++) slashArc(dX-420,-120+i*70,gX+200,420+i*70,k,-110,'255,60,50',f); }
    if(u>=3.45&&u<3.52){ shake=26; sparks(gX+150,260,30,'255,210,180',10); }
    // 💥 va chạm 2: Giga đấm thẳng mặt quỷ
    if(u>=4.85&&u<4.92){ shake=46; sparks(CP2[0],CP2[1],70,'255,235,210',16); }
    impact(CP2[0],CP2[1],seg(u,4.85,5.35),480);
    if(roar>0&&roar<1){ softShock(E[0],E[1]+120,lerp(80,1500,eout(roar)),0.25*(1-roar),'255,60,40',0.9); if(u<5.6) shake=Math.max(shake,8); }   // 😈 gầm: sóng đỏ
    skyline(t,(grap?5:0)+(u>=4.85&&u<5.4?14:0),false);
    // 🎬 chèn: MẮT ĐỐI MẮT — chia đôi khung (trên: mắt quỷ · dưới: mắt Giga), từ từ áp sát
    if(u>=1.45&&u<1.98) ins(()=>{ const k=seg(u,1.45,1.98), sl=eout(seg(u,1.45,1.57)), z=1+0.08*k;
      bgFocus(t,'#3a0608','#090102',true); const F=demFrame(5);
      pane(-VW*(1-sl),70,VW,VH/2-80,()=>{ g.fillStyle='#120204'; g.fillRect(0,70,VW,VH/2-80); const w=VW*z, h=w*124/140; crop(F.c,235,95,140,124,VW/2-w/2,70+(VH/2-80)/2-h/2,w,h,{filter:'brightness(1.9)'}); g.save(); g.globalCompositeOperation='lighter'; for(const ex of [-1,1]) glow(VW/2+ex*62*z,70+(VH/2-80)/2,38,0.9,'255,40,30'); g.restore(); });
      pane(VW*(1-sl),VH/2+10,VW,VH/2-80,()=>{ g.fillStyle='#0c0c0e'; g.fillRect(0,VH/2+10,VW,VH/2-80); const w=VW*z, h=w*160/180; crop(IMG.gigaPunch,130,55,180,160,VW/2-w/2,VH/2+10+(VH/2-80)/2-h/2,w,h,{filter:'contrast(1.15)'}); }); });
    // 🎬 chèn: CÚ ĐẤM lao thẳng vào máy quay (nền vạch tập trung)
    if(u>=4.45&&u<4.83) ins(()=>{ const k=seg(u,4.45,4.83), z=lerp(1.0,3.2,Math.pow(k,1.8)); bgFocus(t,'#f0c8b0','#2a0606',true,VW/2,VH*0.45);
      const w=VW*z, h=w*494/640; crop(IMG.gigaPunch,0,0,640,494,VW/2-w*0.82+Math.sin(t*60)*3,VH*0.45-h*0.33,w,h,{});   // phóng to quanh NẮM ĐẤM → lao thẳng vào máy
      if(k>0.85){ g.fillStyle=`rgba(255,255,255,${(k-0.85)/0.15})`; g.fillRect(0,0,VW,VH); } });
  }
  const camJ1=u=>{ const e5=1300-(291-247)*4.25, eS=1180-(290-247)*4.25; return keys(u,[[0,-150,-700,0.38,0],[0.42,-60,300,0.31,0],[0.5,150,320,0.29,0.02],[1.35,450,300,0.29,-0.03],[1.45,e5,213,0.9,0.07],[1.68,e5,213,1.0,0.08],[1.74,-240,20,0.9,-0.07],[1.92,-240,20,1.0,-0.08],[1.98,470,260,0.33,0],[2.06,450,230,0.38,0.05],[2.6,500,300,0.3,0.02],[3.2,480,320,0.29,0],[3.42,200,300,0.36,-0.07],[4.2,350,320,0.29,0],[4.75,450,200,0.36,0.06],[4.92,450,180,0.42,0.07],[5.3,650,260,0.31,-0.03],[5.5,eS,330,0.7,0.05],[6.3,eS,330,0.8,-0.03],[7,550,300,0.29,0]]); };

  // ── J2: quỷ BUNG CÁNH, đập cánh bay vút lên trên tầng mây → hút năng lượng tụ BOM VĨ THÚ trước miệng → nén lại → bắn ──
  const QH={x:1000,y:-1050,w:2000};   // chỗ quỷ lơ lửng trên trời
  const qMouth=()=>{ const k=QH.w/494; return [QH.x-(285-247)*k, QH.y-160*k+80*k+100]; };
  function scJ2(u,t){
    const spread=seg(u,0,0.9), tk=eout(seg(u,1.0,2.6)), gat=seg(u,2.6,5.0), cmp=seg(u,5.0,5.4), fire=seg(u,5.4,6.0);
    jCity(t,0,false);
    actor(IMG.gigaBig,-100,GY,1000,{flip:true,rot:-0.05*Math.sin(Math.PI*spread)});   // Giga phía dưới thủ thế
    if(u<1.0){ const fr=5+Math.min(2,Math.floor(spread*3)); addGlow(1250,-400,1100,0.5,'255,40,40'); demon2(fr,1250,1080,2100,{flip:true,lit:1.6,sy:1+0.04*Math.sin(Math.PI*spread)});
      if(spread>0.6){ dustWall(1250,GY,lerp(300,1400,seg(spread,0.6,1)),0.7); if(Math.random()<0.6) rocks(800+Math.random()*900,GY-100,2,(Math.random()-0.5)*8); } }   // đập cánh: gió bụi tung
    else { const cx=lerp(1250,QH.x,tk), cy=lerp(GY-700,QH.y,tk)+Math.sin(t*3)*25, flap=Math.sin(t*(u<2.6?11:6));
      addGlow(cx,cy,1200,0.45,'255,40,40'); demonFly(u<2.6&&flap>0.3?9:8,cx,cy,QH.w,{flip:true,lit:1.6,sy:1+flap*0.05});
      if(u<1.3) dustWall(1250,GY,lerp(400,1600,seg(u,1.0,1.3)),0.6*(1-seg(u,1.0,1.3))); }
    cloudSea(-650,t,0.85,{hole:u>=1.5?{x:QH.x,y:-650,r:lerp(0,750,eout(seg(u,1.5,2.4)))}:null});   // xuyên thủng tầng mây
    // 🟣 tụ Bom Vĩ Thú: các viên năng lượng xanh trắng + đỏ đen xoáy hút về trước miệng
    const [mx,my]=qMouth(); let R=lerp(18,330,eio(gat)); if(cmp>0&&fire<=0) R=lerp(330,235,eout(cmp)); if(fire>0) R=lerp(235,350,eout(fire));
    if(gat>0 && fire<1){ for(let i=0;i<110;i++){ const k=((t*0.55+hash(i+700))%1), a0=hash(i+701)*Math.PI*2+k*2.2, d=lerp(1100,R*0.95,ein(k)), blue=i%3!==0, ox=mx+Math.cos(a0)*d, oy=my+Math.sin(a0)*d*0.8, rr=(blue?20:26)*(0.6+hash(i+702))*(1-k*0.4), al=0.95*Math.min(1,gat*3)*(1-cmp);
        g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle=`rgba(${blue?'120,170,255':'200,40,60'},${0.18*al})`; g.lineWidth=rr*0.8; g.lineCap='round'; g.beginPath(); g.moveTo(ox,oy); g.lineTo(ox+Math.cos(a0)*rr*4,oy+Math.sin(a0)*rr*3.2); g.stroke(); g.restore();
        orb(ox,oy,rr,blue?'120,170,255':'90,8,24',al); }
      if(Math.random()<0.25*gat) bolt(mx+(Math.random()-0.5)*R*2.6,my+(Math.random()-0.5)*R*2.6,mx,my,1.4,0.5,'190,140,255'); }
    if(gat>0) bijuu(mx,my+fire*300,R,t,0);
    if(cmp>0&&cmp<1){ g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round'; for(let i=0;i<28;i++){ const a=hash(i+760)*Math.PI*2, r1=lerp(R*4,R*1.1,eout(cmp))*(0.8+0.4*hash(i+761)); g.strokeStyle=`rgba(200,170,255,${0.35*(1-cmp)})`; g.lineWidth=3; g.beginPath(); g.moveTo(mx+Math.cos(a)*r1,my+Math.sin(a)*r1); g.lineTo(mx+Math.cos(a)*(r1+R*0.9),my+Math.sin(a)*(r1+R*0.9)); g.stroke(); } g.restore(); }   // nén: không khí bị hút vào
    if(u>=1.0&&u<1.8) ins(()=>{ const k=seg(u,1.0,1.8); bgRush(t,1100,'#120206','#4a100e','110,55,62'); demonFly(9,VW*0.5,lerp(VH*0.75,VH*0.4,eout(k)),760,{flip:true,lit:1.6,sy:1+Math.sin(t*12)*0.05}); });   // 🎬 chèn: vút lên xuyên mây
    if(u>=5.4&&u<5.47){ shake=30; } if(fire>0) softShock(mx,my,lerp(R,R*4,eout(fire)),0.25*(1-fire),'200,170,255',1);
  }
  const camJ2=u=>{ const [mx,my]=qMouth(); return keys(u,[[0,600,300,0.3,0],[0.9,600,260,0.33,0.05],[1.0,700,320,0.3,0],[1.8,800,-300,0.33,-0.05],[2.6,850,-900,0.4,0],[3.0,mx,my+60,0.5,0.05],[4.8,mx,my+40,0.68,0],[5.0,mx,my-120,1.05,0.1],[5.3,mx,my,0.62,-0.06],[6,mx-150,my+500,0.36,0]]); };

  // ── J3: BOM RƠI — cả đám meme dưới đất ngước nhìn quả cầu khổng lồ xé mây lao xuống · Giga bước ra giơ người đỡ · áp lực toả ra quét sạch thành phố ──
  const BC={x:190,y:-505}, BR=430;
  const J3M=['stalincat','doge','cheems','kingcheems','spidercat','uiacat','maxwell','electricguitarcat','chillguy','ricardo'], _j3i={}, j3im=k=>_j3i[k]||(_j3i[k]=av(k));
  function scJ3(u,t){
    const fall=seg(u,0,2.4), hit=u>=2.4, pk=seg(u,2.4,4.2), hold=hit?1:0;
    const bx=lerp(700,BC.x,eio(fall)), sink=hit?70*eout(seg(u,2.4,3.0))+Math.sin(t*38)*5:0, by=lerp(-2050,BC.y,eio(fall))+sink;
    skyHigh(); mountains(t); skyline(t,hit&&u<3.4?8:0,true);
    cloudSea(-1100,t,0.85,{hole:{x:bx,y:by,r:BR*1.5},blow:hit?{x:BC.x,y:-1000,r:2200*eout(pk)}:null,lit:0.35+0.4*fall});
    sealGround(0.22,t);
    // 💪 Giga đỡ quả bom: đứng tấn, bị ép lún xuống, rung bần bật
    const run=eout(seg(u,1.6,2.3)), gx=lerp(-950,150,run)+(hit?Math.sin(t*41)*4:0);
    if(u<1.6){   // 👀 GÓC NHÌN ĐÁM MEME (kiểu các ninja ngước nhìn thiên thạch của Madara): cả đội đứng thành hàng sát ống kính, chỉ thấy BÓNG lưng,
      //    phía trên là quả bom khổng lồ xé mây lao xuống — chưa có Giga trong khung này
      if(fall<1) windRings(bx,by,BR,t,1);
      bijuu(bx,by,BR,t,0); g.save(); g.globalCompositeOperation='lighter'; glow(bx,by+BR,1000,0.25*fall+0.1,'255,120,60'); g.restore();
      const SIL=[...J3M,'gigachad','chonkydog','bongocat','pianocat','mosquitoviolin','feuerkatze'];
      SIL.forEach((k,i)=>{ const x=-900+i*112+(i%3)*30, y=760+(i%2)*60+(i%3)*25, h=380+(i%4)*70, tr=Math.sin(t*30+i)*(fall>0.4?2.5:0);
        const o={flip:flipTo(k,x<bx),rot:Math.sin(i)*0.04}; actor(j3im(k),x+tr,y+420-6,h*2.3,{...o,filter:'brightness(0) invert(1) sepia(1) saturate(6) hue-rotate(-25deg) brightness(1.1)',a:0.85}); actor(j3im(k),x+tr,y+420,h*2.3,{...o,filter:'brightness(0)'}); });
      const rim=g.createLinearGradient(0,300,0,800); rim.addColorStop(0,`rgba(255,90,40,${0.18+0.2*fall})`); rim.addColorStop(1,'rgba(255,90,40,0)'); g.save(); g.globalCompositeOperation='lighter'; g.fillStyle=rim; g.fillRect(-1500,300,3500,500); g.restore();
      return; }
    if(run<1){ for(let k=1;k<5;k++) actor(IMG.gigaBig,gx-k*120,GY,1000,{flip:true,a:0.28-k*0.05,rot:0.12}); dust(gx-200,GY,2,160); }   // 💨 Giga lao ra từ bên trái
    if(hit){ g.save(); g.fillStyle='rgba(10,4,4,0.55)'; g.beginPath(); g.ellipse(gx,GY+6,700*eout(pk),90*eout(pk),0,0,Math.PI*2); g.fill(); g.restore(); cracks(gx,GY,pk,1300,9); }   // mặt đất lún + nứt toác
    if(run<1) actor(IMG.gigaBig,gx,GY+sink*0.5,1000,{flip:true,rot:0.12});
    if(fall<1) windRings(bx,by,BR,t,1);
    bijuu(bx,by,BR,t,lerp(1,0.35,pk));
    if(run>=1) actor(IMG.gigaLift,gx,GY+sink*0.5+(1-eout(seg(u,2.3,2.45)))*60,1250,{sy:1-0.04*hold,sx:1+0.03*hold});   // 🙌 giơ 2 tay đỡ quả bom
    if(hit){ const k=pk; g.save(); g.globalCompositeOperation='lighter'; glow(BC.x,-75+sink,lerp(200,700,eout(k)),0.9*(1-k*0.6),'255,230,200'); g.restore();
      impact(BC.x,-75,seg(u,2.4,2.9),700);   // vạch áp lực toả ra
      dustWall(gx,GY,lerp(300,2600,eout(seg(u,2.45,4.4))),0.85*(1-seg(u,3.6,4.8)));
      if(u<2.47){ shake=48; sparks(BC.x,-75,80,'255,230,200',18); }
      if(Math.random()<0.6) sparks(BC.x+(Math.random()-0.5)*300,-90,4,'255,200,160',9); if(u<4.5) shake=Math.max(shake,5); }
    skyline(t,hit&&u<3.4?10:0,false);
    // 👀 tiền cảnh: các meme ngước nhìn lên — áp lực ập tới thì lấy tay che, bị đẩy lùi
    J3M.forEach((k,i)=>{ const side=i%2?1:-1, x0=gx+side*(560+Math.floor(i/2)*150), d=Math.abs(x0-gx), push=hit?eout(seg(u,2.45+d/2600,3.3+d/2600))*side*260:0, x=x0+push;   // toàn cảnh: đứng quanh chân Giga, bị áp lực đẩy bật ra
      shadow(x,GY,26,0.4); actor(j3im(k),x,GY,105,{flip:flipTo(k,side<0),rot:hit?side*0.3*Math.sin(Math.PI*seg(u,2.45+d/2600,3.3+d/2600)):0}); });
    if(fall<1){ g.save(); g.globalCompositeOperation='lighter'; glow(bx,by+BR,900,0.2*fall,'255,120,60'); g.restore(); }   // ánh đỏ hắt xuống mặt mọi người
    // 🎬 chèn: cận Giga gồng đỡ, rung bần bật
    if(u>=2.9&&u<3.6) ins(()=>{ bgFocus(t,'#5a1a12','#0a0203',true,VW/2,VH*0.2); bijuu(VW/2,-120,420,t,0.3); actor(IMG.gigaLift,VW/2+Math.sin(t*50)*4,VH+180,1050,{});
      if(Math.random()<0.5) parts.push({k:'spark',x:Math.random()*VW,y:VH*0.2,vx:0,vy:4,l:30,L:30,c:'255,190,140'}); });
  }
  const camJ3=u=>keys(u,[[0,BC.x+60,-560,0.36,0.05],[1.55,BC.x+60,-470,0.38,0.03],[1.6,-250,-180,0.3,0],[2.33,90,-160,0.3,0],[2.45,190,-150,0.45,-0.06],[3.3,180,40,0.31,0],[5,190,80,0.35,0.04],[6.5,200,20,0.4,0]]);

  // ── J4: 2 KIẾM SĨ — Joninn + Berserk ngước lên → bật nhảy (toàn cảnh) → CẮT sang GÓC NGƯỚC CHÉO (quả bom choán góc trên-phải,
  //        2 kiếm sĩ lao từ góc dưới-trái) chém XUYÊN qua quả bom bay vút ra góc trên-phải → CẮT: cận quả bom, khe chém loá sáng → tách đôi → NỔ
  //        → 2 kiếm sĩ đáp đất QUAY LƯNG lại vụ nổ, rồi quay mặt lại nhìn ──
  const SL={ax:BC.x+600, ay:BC.y-540, bx:BC.x-600, by:BC.y+540};   // khe chém trên quả bom (song song đường lao của 2 kiếm sĩ)
  const SP0={x:BC.x-1150,y:BC.y+1035}, SP1={x:BC.x+1150,y:BC.y-1035};   // đường lao: dưới-trái → trên-phải, xuyên tâm quả bom
  // ⚔️ nhát chém đẹp: lưỡi trăng khuyết thuôn 2 đầu (quầng màu → thân màu → lõi trắng loá), viền sáng mảnh, tia lấp lánh rơi dọc vệt, loé sáng ở đầu lưỡi
  function bladeSlash(ax,ay,bx,by,tail,head,B,c,a,seed){ if(a<=0.01||head<=tail) return; const dx=bx-ax, dy=by-ay, L=Math.hypot(dx,dy)||1, nx=-dy/L, ny=dx/L, N=40;
    const pt=(f,o)=>{ const sn=Math.sin(Math.PI*f); return [ax+dx*f+nx*(B*sn+o), ay+dy*f+ny*(B*sn+o)]; };
    const lens=(w)=>{ g.beginPath(); for(let i=0;i<=N;i++){ const f=lerp(tail,head,i/N), th=Math.sin(Math.PI*i/N)*w*(0.35+0.65*(i/N)); const p=pt(f,th); i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]); }
      for(let i=N;i>=0;i--){ const f=lerp(tail,head,i/N), th=Math.sin(Math.PI*i/N)*w*(0.35+0.65*(i/N)); const p=pt(f,-th*0.35); g.lineTo(p[0],p[1]); } g.closePath(); };
    g.save(); g.globalCompositeOperation='lighter';
    g.shadowColor=`rgba(${c},1)`; g.shadowBlur=60; lens(110); g.fillStyle=`rgba(${c},${0.18*a})`; g.fill(); g.shadowBlur=0;
    lens(60); g.fillStyle=`rgba(${c},${0.45*a})`; g.fill();
    lens(26); g.fillStyle=`rgba(255,255,255,${0.9*a})`; g.fill();
    g.strokeStyle=`rgba(255,255,255,${0.8*a})`; g.lineWidth=3; g.beginPath(); for(let i=0;i<=N;i++){ const f=lerp(tail,head,i/N), p=pt(f,Math.sin(Math.PI*i/N)*62*(0.35+0.65*(i/N))); i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]); } g.stroke();   // viền sáng mảnh mép ngoài
    for(let i=0;i<26;i++){ const f=lerp(tail,head,hash(seed+i)), p=pt(f,(hash(seed+i*3)-0.3)*90), r=3+hash(seed+i*7)*6, tw=0.5+0.5*Math.sin(performance.now()/60+i);   // tia lấp lánh
      g.fillStyle=`rgba(255,255,255,${a*tw})`; g.beginPath(); g.moveTo(p[0]-r*2.4,p[1]); g.lineTo(p[0],p[1]-r*0.5); g.lineTo(p[0]+r*2.4,p[1]); g.lineTo(p[0],p[1]+r*0.5); g.closePath(); g.fill();
      g.beginPath(); g.moveTo(p[0],p[1]-r*2.4); g.lineTo(p[0]+r*0.5,p[1]); g.lineTo(p[0],p[1]+r*2.4); g.lineTo(p[0]-r*0.5,p[1]); g.closePath(); g.fill(); }
    const hp=pt(head,0); glow(hp[0],hp[1],180,0.9*a,'255,255,255'); glow(hp[0],hp[1],380,0.5*a,c);   // loé ở đầu lưỡi
    g.restore(); }
  const QD=(()=>{ const L=Math.hypot(1,0.9); return {x:1/L,y:-0.9/L}; })(), QN={x:-QD.y,y:QD.x};   // hướng bay của kiếm khí (dưới-trái → trên-phải) + pháp tuyến
  const QA=s=>({x:BC.x+QD.x*s,y:BC.y+QD.y*s});   // điểm trên đường bay (s = khoảng cách tới tâm quả bom)
  // 🌙 KIẾM KHÍ: lưỡi trăng khuyết khổng lồ (lồi về phía trước), quầng màu loang + thân màu + lõi trắng loá, mép trước sáng sắc, vệt đuôi + tia lửa
  function qiWave(x,y,ang,S,c,a,seed){ if(a<=0.01) return; g.save(); g.translate(x,y); g.rotate(ang); g.globalCompositeOperation='lighter';
    const cres=(k)=>{ g.beginPath(); g.arc(0,0,S*k,-1.2,1.2); g.arc(-S*0.2*k,0,S*0.985*k,1.17,-1.17,true); g.closePath(); };   // trăng khuyết MẢNH, 2 đầu nhọn hoắt
    { const tx=S*Math.cos(1.15), ty=S*Math.sin(1.15), tl=g.createLinearGradient(S,0,-S*2.6,0); tl.addColorStop(0,`rgba(${c},${0.45*a})`); tl.addColorStop(0.35,`rgba(${c},${0.18*a})`); tl.addColorStop(1,`rgba(${c},0)`);
      g.fillStyle=tl; g.beginPath(); g.moveTo(tx,-ty); g.quadraticCurveTo(-S*0.6,-ty*0.9,-S*2.6,-ty*0.25); g.lineTo(-S*2.6,ty*0.25); g.quadraticCurveTo(-S*0.6,ty*0.9,tx,ty); g.arc(0,0,S,1.15,-1.15,true); g.closePath(); g.fill();   // vệt đuôi mượt
      g.strokeStyle=`rgba(255,255,255,${0.35*a})`; g.lineWidth=2; for(let i=0;i<7;i++){ const yy=(i/6-0.5)*ty*1.6; g.beginPath(); g.moveTo(-S*0.2,yy); g.lineTo(-S*(1.4+hash(seed+i)*1.2),yy*0.6); g.stroke(); } }   // vạch gió xé dọc đuôi
    g.shadowColor=`rgba(${c},1)`; g.shadowBlur=55; g.globalAlpha=a*0.5; cres(1.04); g.fillStyle=`rgb(${c})`; g.fill(); g.shadowBlur=0;
    g.globalAlpha=a*0.9; cres(1); g.fillStyle=`rgba(${c},0.9)`; g.fill();
    g.save(); g.globalAlpha=a; g.beginPath(); g.arc(0,0,S*1.0,-1.1,1.1); g.arc(-S*0.08,0,S*1.055,1.06,-1.06,true); g.closePath(); g.fillStyle='rgba(255,255,255,0.97)'; g.fill(); g.restore();   // lõi trắng loá sát mép trước
    g.globalAlpha=a; g.strokeStyle='rgba(255,255,255,1)'; g.lineWidth=5; g.beginPath(); g.arc(0,0,S*1.02,-1.1,1.1); g.stroke();   // mép trước sắc lẹm
    for(let i=0;i<18;i++){ const an=(hash(seed+i)-0.5)*2.2, r=S*(0.75+0.3*hash(seed+i*3)), px=Math.cos(an)*r-hash(seed+i*5)*S*0.9, py=Math.sin(an)*r; g.fillStyle=`rgba(255,255,255,${0.8*a})`; g.fillRect(px,py,4,4); }
    g.restore(); }
  // ⛰️ ngọn núi xa phía sau quả bom (chỉ ở góc ngước chéo) — bị kiếm khí XÉN đỉnh: phần trên đường chém trượt ra rồi đổ xuống
  const FP=[[-500,700],[-250,260],[-50,60],[150,-280],[310,-620],[430,-880],[500,-1060],[560,-1260],[640,-1080],[760,-930],[900,-640],[1050,-340],[1250,40],[1450,700]];
  function farPeak(cut,slide,t){ const lineY=x=>BC.y+(x-BC.x)*QD.y/QD.x;
    const body=()=>{ g.beginPath(); FP.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.closePath(); };
    const paint=()=>{ const gr=g.createLinearGradient(0,-1200,0,700); gr.addColorStop(0,'#3a1015'); gr.addColorStop(1,'#120405'); body(); g.fillStyle=gr; g.fill();
      g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle='rgba(255,120,60,0.35)'; g.lineWidth=10; body(); g.stroke(); g.restore(); };
    const half=(above)=>{ g.beginPath(); g.moveTo(-3000,lineY(-3000)); g.lineTo(3000,lineY(3000)); g.lineTo(3000,above?-5000:5000); g.lineTo(-3000,above?-5000:5000); g.closePath(); g.clip(); };
    if(!cut){ g.save(); g.globalAlpha=0.92; paint(); g.restore(); return; }
    g.save(); g.globalAlpha=0.92; half(false); paint(); g.restore();
    g.save(); g.globalAlpha=0.92; half(true); g.translate(QD.x*260*slide+0,QD.y*260*slide+slide*slide*380); g.translate(560,-1050); g.rotate(slide*0.22); g.translate(-560,1050); paint(); g.restore();   // đỉnh núi trượt theo vết chém rồi đổ
    g.save(); g.beginPath(); body(); g.clip(); g.globalCompositeOperation='lighter'; g.strokeStyle=`rgba(255,240,220,${0.9*(1-slide*0.6)})`; g.lineWidth=6; g.shadowColor='#ffd9b0'; g.shadowBlur=30; g.beginPath(); g.moveTo(-500,lineY(-500)); g.lineTo(1300,lineY(1300)); g.stroke(); g.restore();   // vết cắt nóng sáng
    if(slide<0.6&&Math.random()<0.8) rocks(430+Math.random()*260,lineY(560)+Math.random()*60,2,4); }
  function scJ4(u,t){
    const lp=seg(u,0.9,1.7), dsh=seg(u,1.85,2.45), trail=1-seg(u,2.45,2.75), split=eout(seg(u,2.5,3.4)), ex=seg(u,3.6,6.6), turn=seg(u,4.75,4.9);
    const dx=SL.bx-SL.ax, dy=SL.by-SL.ay, L=Math.hypot(dx,dy), nx=dy/L, ny=-dx/L, sketch=u>=1.75&&u<2.75;
    skyHigh(); mountains(t); skyline(t,0,true);
    cloudSea(-1100,t,0.85,{hole:ex<0.3?{x:BC.x,y:BC.y,r:BR*1.5}:null, cut:u>=2.18?{x:BC.x,y:BC.y,nx,ny,w:lerp(0,170,eout(seg(u,2.18,3.2)))}:null, blow:ex>0?{x:BC.x,y:BC.y,r:3200*eout(ex)}:null, lit:ex>0?lerp(1,0.35,ex):0.35});
    sealGround(0.22,t);
    // 💪 Giga vẫn gồng đỡ → bom nổ thì khuỵu xuống rồi gượng dậy
    const knee=eout(seg(u,3.4,3.8))*(1-eio(seg(u,5.0,6.4)));
    if(!sketch&&ex>0) actor(IMG.gigaBig,150,GY+70*(1-seg(u,3.4,4.2)),1000,{flip:true,sy:1-0.12*knee,rot:-0.08*knee});
    // 💨 góc ngước chéo: vạch tốc độ song song đường lao phủ cả khung
    const qf=seg(u,1.92,2.5), QS=-1150, QE=1400, qs=lerp(QS,QE,qf), passB=u>=2.18, passP=u>=2.27, pSl=eout(seg(u,2.27,2.75));
    if(sketch) farPeak(passP,pSl,t);
    if(sketch){ g.save(); g.globalCompositeOperation='lighter'; const ux=(SP1.x-SP0.x), uy=(SP1.y-SP0.y), UL=Math.hypot(ux,uy);
      for(let i=0;i<36;i++){ const o=(hash(i+300)-0.5)*2400, sh=((t*3.2+hash(i+301))%1)*3000-1500, cx0=BC.x-200+nx*o+ux/UL*sh, cy0=BC.y+200+ny*o+uy/UL*sh, Ls=200+hash(i+302)*500;
        g.strokeStyle=`rgba(255,235,220,${0.06+0.1*hash(i+303)})`; g.lineWidth=2+hash(i+304)*4; g.beginPath(); g.moveTo(cx0,cy0); g.lineTo(cx0-ux/UL*Ls,cy0-uy/UL*Ls); g.stroke(); } g.restore(); }
    // 🟣 quả bom: nguyên → khe chém loá sáng → tách đôi (2 nửa trượt ra, lòng trong loá sáng) → nổ
    if(ex<0.06){ const sep=split*130, al=1-seg(ex,0,0.06), R0=BR;   // giữ ĐÚNG cỡ quả bom ở mọi góc máy
      if(split<=0) bijuu(BC.x,BC.y,R0,t,0.35);
      else for(const s2 of [-1,1]){ g.save(); g.globalAlpha=al; g.beginPath(); const E2=4000; g.moveTo(BC.x-dx/L*E2,BC.y-dy/L*E2); g.lineTo(BC.x+dx/L*E2,BC.y+dy/L*E2); g.lineTo(BC.x+dx/L*E2+nx*s2*E2,BC.y+dy/L*E2+ny*s2*E2); g.lineTo(BC.x-dx/L*E2+nx*s2*E2,BC.y-dy/L*E2+ny*s2*E2); g.closePath(); g.clip(); g.translate(nx*s2*sep,ny*s2*sep); bijuu(BC.x,BC.y,BR,t,0.35); g.restore(); }
      if(passB){ const op=seg(u,2.18,2.3); g.save(); g.beginPath(); g.arc(BC.x,BC.y,R0+split*130,0,Math.PI*2); g.clip(); g.globalCompositeOperation='lighter'; g.lineCap='round';
        g.shadowColor='rgba(255,220,180,1)'; g.shadowBlur=30+split*90; for(const [lw,a] of [[5+split*26,0.55],[2+split*8,1]]){ g.strokeStyle=`rgba(255,250,240,${a*op})`; g.lineWidth=lw; g.beginPath(); g.moveTo(SL.ax,SL.ay); g.lineTo(SL.bx,SL.by); g.stroke(); }   // khe cắt phát sáng mềm
        g.restore(); } }
    if(!sketch&&ex<=0) actor(IMG.gigaLift,150+Math.sin(t*41)*4,GY+70,1250,{sy:0.96});   // 🙌 vẫn giơ 2 tay đỡ quả bom
    skyBlast(BC.x,BC.y,ex);
    if(u>=3.4&&u<3.47){ shake=50; sparks(BC.x,BC.y,90,'255,230,200',22); }
    if(ex>0&&ex<0.5&&Math.random()<0.7) for(let q=0;q<2;q++){ const a=Math.random()*Math.PI*2; parts.push({k:'spark',x:BC.x+Math.cos(a)*200,y:BC.y+Math.sin(a)*200,vx:Math.cos(a)*22,vy:Math.sin(a)*22,l:50,L:50,c:'255,190,120'}); }   // tàn lửa văng
    if(!sketch) skyline(t,0,false);
    // ⚔️ 2 kiếm sĩ
    const A=[[650,GY,IMG.joninn,IMG.joninnR,'samuraicheems','110,200,255',-1],[770,GY,IMG.berserk,IMG.berserkAtk,'berserkcat','255,60,60',1]];
    A.forEach(([sx,sy,im,im2,k,c,o],j)=>{ const off=o*70, lx=-650+j*130;
      if(sketch){   // góc ngước chéo: 2 kiếm sĩ lơ lửng góc dưới-trái → vung kiếm → phóng KIẾM KHÍ khổng lồ bay xuyên quả bom, xén đỉnh núi phía sau
        const o2=j?60:-60, P=QA(-1010+j*230), x=P.x+QN.x*o2, y=P.y+QN.y*o2+60, h=170, sw=seg(u,1.84,1.95), ang=Math.atan2(QD.y,QD.x);
        if(j===0) actor(IMG.smSlash,x,y+h*0.45,h*1.35,{flip:false,rot:ang*0.3,center:true});   // ⚔️ Joninn: tư thế chém trên không (ảnh mới)
        else actor(sw>0?im2:im,x,y+h*0.45,h,{flip:flipTo(k,true),rot:ang*0.35+(sw>0?0.35*(1-sw):-0.25),center:true});
        if(sw>0) bladeSlash(x-h*0.35,y+h*0.25,x+h*0.45,y-h*0.55,0,Math.min(1,sw*1.2),j?-90:90,c,1-seg(u,1.95,2.2),j*50+11);   // nhát vung tại chỗ
        if(qf>0&&qf<1){ const d=lerp(-1010+j*230,QE,qf)-(j?40:0), Q=QA(d); qiWave(Q.x+QN.x*o2,Q.y+QN.y*o2,ang,560,c,1-seg(qf,0.85,1),j*31+7); }
        return; }
      const h=lerp(110,150,lp>0?1:0); let x,y,rot=0, img=u>0.5?im2:im, faceR=false;
      if(u<0.9){ x=sx; y=sy; }
      else if(u<1.75){ const q=eout(lp), P=QA(-1010+j*230), cx=sx-150, cy=-900; x=(1-q)*(1-q)*sx+2*(1-q)*q*cx+q*q*P.x; y=(1-q)*(1-q)*sy+2*(1-q)*q*cy+q*q*P.y; rot=-0.5*Math.sin(Math.PI*lp); }
      else { x=lx; y=GY; faceR=turn>0.5; if(u<3.4) return; }   // (đang bay ngoài khung → đáp đất quay lưng về phía vụ nổ)
      if(u>=4.3&&u<4.36&&j===0){ dust(lx+60,GY,14,180); }
      const sq=u>=4.75&&u<4.9?Math.max(0.08,Math.abs(Math.cos(Math.PI*turn))):1;
      if(u>=3.4) shadow(x,GY,h*0.35,0.4);
      if(u>=3.4&&u<4.75) actor(j?IMG.bkBack:IMG.smBack,x,y,h*1.2,{});   // đáp đất QUAY LƯNG lại vụ nổ
      else actor(img,x,y,h,{flip:flipTo(k,faceR),rot,sx:sq}); });
    // 🎬 nhịp 1: 2 kiếm sĩ đứng QUAY LƯNG về phía máy, ĐỐI MẶT quả bom khổng lồ (Giga gồng đỡ phía trên) — trước khi bật nhảy chém từ dưới lên
    if(u<0.9) ins(()=>{ const k=seg(u,0,0.9), z=1+0.06*k;
      const gr=g.createLinearGradient(0,0,0,VH); gr.addColorStop(0,'#14030a'); gr.addColorStop(0.65,'#4a1210'); gr.addColorStop(1,'#140605'); g.fillStyle=gr; g.fillRect(0,0,VW,VH);
      g.save(); g.translate(VW/2,VH*0.55); g.scale(z,z); g.translate(-VW/2,-VH*0.55);
      bijuu(VW/2,-150,330,t,0.3); actor(IMG.gigaLift,VW/2,VH*0.66,540,{filter:'brightness(0.55)'});
      g.fillStyle='#0b0506'; g.fillRect(-50,VH*0.84,VW+100,VH);
      actor(IMG.smBack,VW*0.36,VH*0.9,330,{}); actor(IMG.bkBack,VW*0.66,VH*0.9,340,{});
      g.save(); g.globalCompositeOperation='lighter'; glow(VW*0.36,VH*0.72,170,0.35,'110,200,255'); glow(VW*0.66,VH*0.72,170,0.35,'255,60,60'); g.restore(); g.restore(); });
    // 🎬 nhịp 2 (bố cục theo phác thảo): quả bom khổng lồ choán khung, NGỌN NÚI sau lưng nó; A = Joninn, B = Berserk tí hon góc dưới-trái
    //    bật nhảy vào vị trí → 2 luồng khí xanh + đỏ XOẮN VÀO NHAU (hợp chiêu) → khựng lại → 1 VỆT KIẾM DUY NHẤT vụt qua cả khung rồi tắt ngấm
    //    → lặng 1 nhịp → quả bom + nửa ngọn núi + mây phía sau cùng TRƯỢT TÁCH ĐÔI theo đúng vết chém
    if(u>=0.9&&u<3.4) ins(()=>{ const lp=eout(seg(u,0.9,1.5)), cm=seg(u,1.5,2.0), fl=seg(u,2.0,2.08), cut=u>=2.0, sep=eio(seg(u,2.5,3.4)), bx=VW*0.57, by=VH*0.42, R=VW*0.33;
      const A0={x:VW*0.15,y:VH*0.72}, B0={x:VW*0.34,y:VH*0.8}, O={x:(A0.x+B0.x)/2,y:(A0.y+B0.y)/2-70}, ang=Math.atan2(by-O.y,bx-O.x), dx=Math.cos(ang), dy=Math.sin(ang), nx=-dy, ny=dx;
      const still=u>=2.08&&u<2.5;   // ⏸️ khựng: mọi thứ đứng im
      const tt=still?2.08:u;
      const scene=()=>{   // trời + núi + mây + quả bom (lớp sẽ bị xẻ)
        const gr=g.createLinearGradient(0,-VH*0.1,0,VH); gr.addColorStop(0,'#5a1810'); gr.addColorStop(0.45,'#8a2a14'); gr.addColorStop(1,'#2a0806'); g.fillStyle=gr; g.fillRect(-VW,-VH,VW*3,VH*3);   // trời đỏ cam sáng sau núi → núi nổi khối đen
        const MP=[[-VW,VH*0.95],[VW*0.05,VH*0.5],[VW*0.3,VH*0.3],[VW*0.5,VH*0.02],[VW*0.66,VH*0.06],[VW*0.8,-VH*0.04],[VW*0.92,VH*0.1],[VW*1.1,VH*0.32],[VW*2,VH*0.95]];
        { const mg=g.createLinearGradient(0,-VH*0.05,0,VH*0.9); mg.addColorStop(0,'#1a0609'); mg.addColorStop(1,'#070203'); g.fillStyle=mg; g.beginPath(); MP.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.closePath(); g.fill(); }   // ngọn núi lớn sau lưng quả bom
        g.save(); g.globalCompositeOperation='lighter'; for(const [lw,al] of [[18,0.18],[4,0.7]]){ g.strokeStyle=`rgba(255,120,60,${al})`; g.lineWidth=lw; g.beginPath(); MP.slice(1,-1).forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); } g.restore();
        for(let i=0;i<12;i++) puff(((hash(i+620)*VW*1.4+tt*18)%(VW*1.4))-VW*0.2,VH*(0.05+hash(i+621)*0.5),60+hash(i+622)*80,0.3,'120,60,70');
        bijuu(bx,by,R,tt,0.25); };
      if(sep<=0) scene();
      else for(const sd of [-1,1]){ g.save(); const E=3000; g.beginPath(); g.moveTo(O.x-dx*E,O.y-dy*E); g.lineTo(O.x+dx*E,O.y+dy*E); g.lineTo(O.x+dx*E+nx*sd*E,O.y+dy*E+ny*sd*E); g.lineTo(O.x-dx*E+nx*sd*E,O.y-dy*E+ny*sd*E); g.closePath(); g.clip();
        g.translate(dx*sd*sep*70+nx*sd*sep*26,dy*sd*sep*70+ny*sd*sep*26); scene(); g.restore(); }   // 2 nửa trượt lệch dọc vết chém
      if(sep>0){ g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round'; g.shadowColor='rgba(255,230,200,1)'; g.shadowBlur=30; g.strokeStyle=`rgba(255,250,240,${0.9*(1-seg(u,3.0,3.4)*0.4)})`; g.lineWidth=2+sep*5; g.beginPath(); g.moveTo(O.x-dx*60,O.y-dy*60); g.lineTo(O.x+dx*VH*2,O.y+dy*VH*2); g.stroke(); g.restore();   // vết cắt nóng sáng giữa 2 nửa
        if(Math.random()<0.7) parts.push({k:'rock',x:O.x+dx*(R+Math.random()*VW),y:O.y+dy*(R+Math.random()*VW),vx:(Math.random()-0.5)*3,vy:2,l:40,L:40,c:'70,30,30',r:3+Math.random()*5}); }
      if(!still&&!cut){ g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<24;i++){ const o=(hash(i+500)-0.5)*VW*2, sh=((t*0.6+hash(i+501))%1)*VH*2-VH*0.5, px=VW/2+nx*o+dx*sh, py=VH/2+ny*o+dy*sh, L=80+hash(i+502)*200; g.strokeStyle='rgba(255,230,215,0.08)'; g.lineWidth=1.5; g.beginPath(); g.moveTo(px,py); g.lineTo(px-dx*L,py-dy*L); g.stroke(); } g.restore(); }
      g.fillStyle='#0b0506'; g.beginPath(); g.moveTo(0,VH*0.82); g.quadraticCurveTo(VW*0.3,VH*0.79,VW*0.55,VH*0.88); g.lineTo(VW,VH*0.88); g.lineTo(VW,VH); g.lineTo(0,VH); g.closePath(); g.fill();
      // 🌀 hợp chiêu: 2 luồng khí xanh/đỏ xoắn vào nhau quanh 2 kiếm sĩ, dồn vào mũi kiếm
      if(cm>0&&!cut){ g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round'; for(const [c,ph] of [['110,200,255',0],['255,60,60',Math.PI]]){ g.strokeStyle=`rgba(${c},${0.7*cm})`; g.lineWidth=5; g.beginPath();
          for(let i=0;i<=60;i++){ const f=i/60, r=lerp(150,8,f)*cm, a=f*12+t*9+ph, px=lerp(O.x-40,O.x+dx*90,f)+Math.cos(a)*r, py=lerp(O.y+90,O.y+dy*90-30,f)+Math.sin(a)*r*0.6; i?g.lineTo(px,py):g.moveTo(px,py); } g.stroke(); }
        glow(O.x+dx*90,O.y+dy*90-30,40+80*cm,0.9*cm,'255,240,255'); g.restore(); }
      // 2 kiếm sĩ: trước khi chém ở góc dưới-trái · sau vệt chém đã ở phía bên kia (trên-phải, sau quả bom) trong tư thế vung xong
      const atk=!cut;
      [[A0,IMG.smSlash,'110,200,255',128,0],[B0,IMG.berserkAtk,'255,60,60',122,1]].forEach(([P,im,c,h,j])=>{ let x=P.x-(1-lp)*30, y=lerp(VH+160,P.y,lp)-Math.sin(t*5+j)*3*(lp>=1&&atk?1:0);
        if(!atk){ x=VW*(0.7+j*0.14); y=VH*(0.16+j*0.05); }
        if(lp<1) for(let k=1;k<5;k++) actor(im,x,y+k*45*(1-lp),h,{a:0.25-k*0.05,flip:j?flipTo('berserkcat',true):false});
        if(cm>0&&atk){ g.save(); g.globalCompositeOperation='lighter'; glow(x,y-h*0.5,h*(1+cm),0.5,c); g.restore(); }
        actor(im,x,y,h*(atk?1:0.8),{flip:j?flipTo('berserkcat',true):false,rot:atk?0:-0.5}); });
      // ⚡ 1 VỆT KIẾM vụt qua cả khung (chỉ ~0.08s) rồi tắt ngấm
      if(fl>0&&fl<1){ g.fillStyle='rgba(255,252,245,0.85)'; g.fillRect(0,0,VW,VH); g.save(); g.globalCompositeOperation='source-over'; g.strokeStyle='#000'; g.lineWidth=10; g.beginPath(); g.moveTo(O.x-dx*200,O.y-dy*200); g.lineTo(O.x+dx*VH*2,O.y+dy*VH*2); g.stroke(); g.restore(); }   // khung trắng loá + 1 nét đen sắc lẹm
      if(u>=2.08&&u<2.2){ const k=seg(u,2.08,2.2); g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle=`rgba(255,255,255,${1-k})`; g.lineWidth=3; g.beginPath(); g.moveTo(O.x-dx*200,O.y-dy*200); g.lineTo(O.x+dx*VH*2,O.y+dy*VH*2); g.stroke(); g.restore(); } });
    // 🎬 nhịp 3: chém xong → QUAY MẶT ĐI (hướng về máy) → quả bom nứt, tách đôi rồi NỔ TUNG SAU LƯNG, ánh nổ hắt viền lên người
    if(u>=3.4&&u<5.6) ins(()=>{ const split=1, ex=seg(u,3.6,5.8), bx=VW*0.55, by=VH*0.27, R=230;
      const gr=g.createLinearGradient(0,0,0,VH); gr.addColorStop(0,'#14030a'); gr.addColorStop(0.7,'#4a1210'); gr.addColorStop(1,'#1a0806'); g.fillStyle=gr; g.fillRect(0,0,VW,VH);
      if(ex<0.06){ const ang=Math.atan2(SL.by-SL.ay,SL.bx-SL.ax), ux=Math.cos(ang), uy=Math.sin(ang), nx=uy, ny=-ux;
        for(const sd of [-1,1]){ g.save(); g.beginPath(); g.moveTo(bx-ux*900,by-uy*900); g.lineTo(bx+ux*900,by+uy*900); g.lineTo(bx+ux*900+nx*sd*900,by+uy*900+ny*sd*900); g.lineTo(bx-ux*900+nx*sd*900,by-uy*900+ny*sd*900); g.closePath(); g.clip(); g.translate(nx*sd*split*60,ny*sd*split*60); bijuu(bx,by,R,t,0.3); g.restore(); }
        g.save(); g.beginPath(); g.arc(bx,by,R+split*60,0,Math.PI*2); g.clip(); g.globalCompositeOperation='lighter'; g.shadowColor='rgba(255,220,180,1)'; g.shadowBlur=20+split*50; g.strokeStyle='rgba(255,250,240,0.95)'; g.lineWidth=2+split*12; g.beginPath(); g.moveTo(bx-ux*R*1.2,by-uy*R*1.2); g.lineTo(bx+ux*R*1.2,by+uy*R*1.2); g.stroke(); g.restore(); }
      if(ex>0){ g.save(); g.translate(bx,by); g.scale(0.36,0.36); skyBlast(0,0,ex); g.restore(); if(ex<0.12){ g.fillStyle=`rgba(255,240,225,${0.55*(1-ex/0.12)})`; g.fillRect(0,0,VW,VH); } }
      g.fillStyle='#0b0506'; g.fillRect(0,VH*0.86,VW,VH);
      const lit=ex>0?Math.max(0,1-ex*1.3):0.15, tr=ex>0&&ex<0.25?Math.sin(t*60)*3:0;
      actor(IMG.joninnR,VW*0.34+tr,VH*0.92,280,{flip:flipTo('samuraicheems',true)}); actor(IMG.berserk,VW*0.68+tr,VH*0.92,300,{flip:flipTo('berserkcat',false)});   // quay mặt về phía máy, lưng hướng quả bom
      if(lit>0){ g.save(); g.globalCompositeOperation='lighter'; glow(VW/2,VH*0.6,VW*0.9,0.4*lit,'255,170,110'); g.restore(); }   // ánh nổ hắt viền từ sau lưng
      if(ex>0&&Math.random()<0.6) parts.push({k:'spark',x:Math.random()*VW,y:VH*0.2,vx:(Math.random()-0.5)*4,vy:2+Math.random()*3,l:50,L:50,c:'255,180,110'}); });
  }
  const camJ4=u=>keys(u,[[0,710,830,1.1,0.06],[0.85,710,820,1.25,0.06],[0.95,650,560,0.7,0],[1.7,620,-200,0.5,-0.04],
    [1.75,-60,-180,0.333,0.1],[2.7,-40,-200,0.345,0.12],   // góc ngước chéo (như hình phác: bom góc trên-phải, 2 kiếm sĩ lao từ dưới-trái)
    [2.75,BC.x,BC.y,0.6,0.04],[3.38,BC.x,BC.y,0.78,0.02],   // cận quả bom: khe chém loá → tách đôi
    [3.42,BC.x,BC.y,0.62,0],[4.2,BC.x-100,BC.y+300,0.34,0],   // nổ → lùi máy
    [4.25,-580,760,0.9,0],[5.2,-580,760,0.95,0.04],   // 2 kiếm sĩ quay lưng lại vụ nổ → quay mặt lại
    [5.6,-150,250,0.42,0],[7.5,-50,250,0.36,0]]);

  // ── J5: quỷ định tụ quả bom thứ 2 → BẤT NGỜ: tia sét UIA lướt ngang qua, thả Clapping Cat ngay trước mặt nó → cận: Clapping Cat VỖ TAY 1 cái
  //        → cắt: CHONKY khổng lồ đứng dưới đất ngửa mặt lên, loé trắng → ĐỔI CHỖ (nhoè + vạch tốc độ) → Chonky hiện trên trời ngay trên đầu quỷ
  //        → đè quỷ rơi thẳng xuống phong ấn · chấn động quét sạch xung quanh · Clapping Cat dưới đất vỗ tay khoái chí ──
  function scJ5(u,t){
    const gat=seg(u,0,1.6), uia=seg(u,1.6,2.05), clapK=seg(u,2.3,2.5), glwC=seg(u,2.42,2.62), glwH=seg(u,3.1,3.5), swap=u>=3.5, arr=1-seg(u,3.5,3.85), fall=seg(u,8.7,9.1), imp=seg(u,9.1,12.3);
    const fire=seg(u,3.85,4.3), grow=eout(seg(u,4.6,7)), hit=seg(u,7,7.4), shrink=eio(seg(u,7.95,8.5));
    g.fillStyle='#070103'; g.fillRect(-6000,-12000,16000,8650);   // trời cao (khung rất rộng lúc Chonky hoá khổng lồ)
    skyHigh(); mountains(t); skyline(t,0,true);
    cloudSea(-650,t,0.8,{hole:{x:QH.x,y:-650,r:lerp(750,1300,fall)},blow:u>=7?{x:QH.x,y:-650,r:2600*eout(seg(u,7,9))}:null});
    sealGround(0.25+0.75*seg(u,7.85,8.8),t);
    const white={filter:'brightness(0) invert(1)'};   // bản trắng tinh của ảnh → loé sáng đúng hình nhân vật (y như lúc vỗ tay đổi chỗ trong game)
    const GCX=-250, [mx,my]=qMouth(), CCx=mx-620, CCy=my+330, CX1=QH.x+40, CY1=QH.y-1050;
    // 🐕 CHONKY khổng lồ đứng dưới đất → nghe tiếng vỗ tay thì NGỬA MẶT lên trời → loé trắng
    if(!swap){ const fl=flipTo('chonkydog',true), up=eout(seg(u,2.75,3.05))*(fl?-0.2:0.2), o={flip:fl,rot:up}; actor(IMG.chonky,GCX,GY,1200,o); if(glwH>0) actor(IMG.chonky,GCX,GY,1200,{...o,...white,a:glwH*0.9}); }
    // 😈 quỷ lơ lửng → bị Chonky đè rơi thẳng xuống phong ấn
    const qX=QH.x, qY=QH.y, qTop=qY-160*(QH.w/494)+30;   // đỉnh đầu quỷ (chỗ Chonky đáp vào)
    if(u<7.4){ addGlow(qX,qY,1100,0.4,'255,40,40'); demonFly(8,qX,qY+Math.sin(t*3)*25*(1-hit),QH.w,{flip:true,lit:1.6,sy:1-0.16*Math.sin(Math.PI*Math.min(1,hit*1.6))}); }
    else if(u<9.1){ if(u<8.7) {} else { const y0=-4600, y1=SE.y, st=fall, hx=lerp(QH.x,SE.x,st), hy=lerp(y0,y1,st), tx=lerp(QH.x,SE.x,Math.max(0,st-0.45)), ty=lerp(y0,y1,Math.max(0,st-0.45)); g.save(); g.lineCap='round';   // ⬇️ quỷ bị NÉN thành 1 TIA ĐEN cắm thẳng xuống đất
      for(const [lw,c] of [[420,'rgba(255,40,30,0.14)'],[180,'rgba(40,0,8,0.85)'],[70,'rgba(0,0,0,1)']]){ const gr=g.createLinearGradient(tx,ty,hx,hy); gr.addColorStop(0,'rgba(0,0,0,0)'); gr.addColorStop(1,c); g.strokeStyle=gr; g.lineWidth=lw; g.beginPath(); g.moveTo(tx,ty); g.lineTo(hx,hy); g.stroke(); }
      g.globalCompositeOperation='lighter'; for(let i=0;i<14;i++){ const ox=(hash(i+940)-0.5)*1600, L=300+hash(i+941)*700, yy=hy-hash(i+942)*900; g.strokeStyle='rgba(255,210,190,0.18)'; g.lineWidth=2; g.beginPath(); g.moveTo(hx+ox,yy); g.lineTo(hx+ox,yy-L); g.stroke(); } g.restore(); } }
    else { g.save(); g.globalCompositeOperation='lighter'; for(const ex of [-1,1]) glow(SE.x+ex*90,SE.y-60,70,0.8*(0.6+0.4*Math.sin(t*4)),'255,40,30'); g.restore(); }   // 👁️ dưới đáy hố chỉ còn đôi mắt đỏ
    // 🟣 quả bom thứ 2 bắt đầu tụ trước miệng (bị cắt ngang → tan)
    const bf=1-seg(u,3.5,3.7);
    if(u<4.0 && !(u>=4.1)){ const R=lerp(15,190,eio(gat))*bf;
      for(let i=0;i<60;i++){ const k=((t*0.55+hash(i+900))%1), a0=hash(i+901)*Math.PI*2+k*2.2, d=lerp(900,R*0.95,ein(k)), blue=i%3!==0; orb(mx+Math.cos(a0)*d,my+Math.sin(a0)*d*0.8,(blue?16:20)*(0.6+hash(i+902))*(1-k*0.4),blue?'120,170,255':'90,8,24',0.9*Math.min(1,gat*3)*bf); }
      if(R>2) bijuu(mx,my,R,t,0); }
    // ⚡ tia sét UIA lướt ngang qua mặt quỷ — để lại Clapping Cat lơ lửng ngay trước mặt nó
    if(uia>0&&uia<1){ const hx=lerp(QH.x-2300,QH.x+900,eio(uia)); flashStreak(hx-1100,hx,CCy+40,230,1-seg(uia,0.85,1)); actor(IMG.uia,hx,CCy+40,170,{rot:-0.22,flip:flipTo('uiacat',true)}); if(hx<CCx) actor(IMG.clapIdle,hx-30,CCy-40,190,{}); }
    // 👏 Clapping Cat lơ lửng trước mặt quỷ → VỖ TAY 1 cái → loé trắng
    if(!swap && u>=1.6 && (uia>=1 || lerp(QH.x-2300,QH.x+900,eio(uia))>=CCx)){ const im=clapK>0?IMG.clap[Math.min(2,Math.floor(clapK*3))]:IMG.clapIdle, y=CCy+Math.sin(t*3)*8;
      g.save(); g.globalCompositeOperation='lighter'; glow(CCx,y-110,300,0.45,'255,190,120'); g.restore(); actor(im,CCx,y,230,{});
      if(glwC>0){ actor(im,CCx,y,230,{...white,a:glwC}); addGlow(CCx,y-110,320*glwC,0.8*glwC,'255,255,255'); }
      if(u>=2.42&&u<2.5) impact(CCx,y-120,seg(u,2.42,2.62),260); }
    // 🌀 ĐỔI CHỖ: vệt nhoè + vạch tốc độ ở cả 2 chỗ (chỗ Chonky dưới đất ↔ chỗ Clapping Cat trước mặt quỷ)
    if(u>=3.5&&u<3.85){ const k=seg(u,3.5,3.85);
      for(const [px,py,dir] of [[CX1,CY1-120,-1],[GCX,GY-560,1]]){ g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round';
        for(let i=0;i<20;i++){ const xx=px+(hash(i+800)-0.5)*700, L=200+hash(i+801)*600; g.strokeStyle=`rgba(255,255,255,${0.6*(1-k)})`; g.lineWidth=2+hash(i+802)*5; g.beginPath(); g.moveTo(xx,py-L*0.5+dir*k*300); g.lineTo(xx,py+L*0.5+dir*k*300); g.stroke(); }
        glow(px,py,600*(1-k)+150,0.85*(1-k),'255,255,255'); g.restore(); } }
    if(u>=3.1&&u<3.5){ const k=seg(u,3.1,3.5); actor(IMG.chonky,GCX,GY-k*k*400,1200*(1+k*0.6),{flip:flipTo('chonkydog',true),sx:1-k*0.7,...white,a:k*0.6}); }   // Chonky nhoè vút lên lúc biến mất
    // 🐕 CHONKY hiện ra trên trời ngay trên đầu quỷ → đè xuống → hất văng ra lăn sang bên
    if(swap){ const fl=flipTo('chonkydog',true);
      let h, yb, x=QH.x-60;
      if(u<4.6){ h=320; yb=lerp(QH.y-2300,QH.y-1800,ein(seg(u,3.5,4.6))); }   // dạng bé, ở TRÊN CAO, bắt đầu rơi
      else if(u<7.4){ h=lerp(320,3400,grow); yb=u<7?lerp(QH.y-1800,qTop,ein(seg(u,4.6,7))):qTop+Math.sin(Math.PI*hit)*60; }   // SKILL PHÓNG TO: to gấp ~3 con quỷ
      else { const q=eio(seg(u,7.4,8.4)); h=lerp(3400,330,q); yb=qTop-q*600; }   // nện xong bật ngược lên, thu nhỏ lại
      const o={flip:fl,sy:u>=7&&u<7.4?1-0.1*Math.sin(Math.PI*hit):1,rot:u<4.6?Math.sin(t*6)*0.08:0,a:1-seg(u,8.2,8.6)};
      if(u>=3.85 && u<7.5){ const k=fire*(u>=7.4?1-seg(u,7.4,7.5):1), cyF=yb-h*0.45;   // ☄️ bốc lửa như thiên thạch: đuôi lửa vuốt ngược lên trời
        g.save(); g.globalCompositeOperation='lighter';
        for(let i=0;i<9;i++){ const q=i/8, fy=cyF-q*h*1.5-Math.sin(t*20+i)*h*0.03, fr=h*(0.62-q*0.45)*(0.9+0.1*Math.sin(t*25+i*2));
          glow(x+Math.sin(t*9+i)*h*0.05,fy,fr*1.25,0.42*k*(1-q*0.6),q<0.3?'255,230,170':q<0.6?'255,140,40':'230,50,20'); }
        for(let i=0;i<14;i++){ const a=i/14*Math.PI*2+t*3, rr=h*(0.48+0.06*Math.sin(t*30+i)); glow(x+Math.cos(a)*rr*0.8,cyF+Math.sin(a)*rr*0.9-h*0.1,h*0.32,0.28*k,i%2?'255,120,30':'255,200,80'); }   // lửa trùm quanh thân
        glow(x,yb-h*0.05,h*0.7,0.32*k,'255,200,140'); g.restore();
        if(Math.random()<0.8*k) for(let q=0;q<3;q++) parts.push({k:'spark',x:x+(Math.random()-0.5)*h*0.8,y:yb-Math.random()*h,vx:(Math.random()-0.5)*h*0.01,vy:-h*0.012*(1+Math.random()),l:40,L:40,c:Math.random()<0.5?'255,200,90':'255,120,40'}); }
      actor(IMG.chonky,x,yb,h,o); if(arr>0) actor(IMG.chonky,x,yb,h,{...o,...white,a:arr});
      if(u>=3.85&&u<7.9){ const k=fire; g.save(); g.globalCompositeOperation='lighter'; glow(x,yb-h*0.08,h*0.5,0.22*k,'255,110,40'); g.restore(); }   // mặt dưới nóng đỏ dịu (không loá)
      }
    // 💥 CHẤN ĐỘNG khổng lồ
    if(hit>0&&hit<1){ const k=hit; g.save(); g.globalCompositeOperation='lighter'; glow(QH.x-60,qTop,lerp(300,1300,eout(k)),0.38*(1-k*0.6),'255,240,200'); glow(QH.x-60,qTop,800,0.3*(1-k),'255,140,40'); g.restore();
      if(Math.random()<0.8) sparks(QH.x-60+(Math.random()-0.5)*800,qTop,8,'255,200,120',16); }   // 💥 va chạm trên không
    if(u>=7&&u<7.06) shake=40;
    if(u>=9.1&&u<9.35) ins(()=>{ g.fillStyle=`rgba(255,248,240,${0.9*(1-seg(u,9.1,9.35))})`; g.fillRect(0,0,VW,VH); });   // loé trắng lúc chạm đất
    if(u>=9.1&&u<9.18){ shake=80; sparks(SE.x,SE.y-100,120,'255,220,180',24); rocks(SE.x,SE.y,60,0); }
    if(imp>0&&imp<1){ const e=eout(imp), RR=lerp(200,5200,e);   // 🌀 kiểu SHINRA TENSEI: hố sâu + vòm sóng xung kích nở tròn quét phẳng mọi thứ
      g.save(); g.fillStyle='rgba(8,3,3,0.92)'; g.beginPath(); g.ellipse(SE.x,SE.y+10,lerp(200,1500,eout(Math.min(1,imp*3))),lerp(40,300,eout(Math.min(1,imp*3))),0,0,Math.PI*2); g.fill(); g.restore();   // hố
      g.save(); g.globalCompositeOperation='lighter'; const dg=g.createRadialGradient(SE.x,SE.y,RR*0.6,SE.x,SE.y,RR); dg.addColorStop(0,'rgba(255,220,190,0)'); dg.addColorStop(0.85,`rgba(255,225,200,${0.8*(1-imp)})`); dg.addColorStop(1,'rgba(255,220,190,0)');
      g.fillStyle=dg; g.beginPath(); g.ellipse(SE.x,SE.y,RR,RR*0.62,0,Math.PI,Math.PI*2); g.fill();   // vòm xung kích (nửa trên mặt đất)
      glow(SE.x,SE.y-150,lerp(300,1800,e),0.8*(1-imp),'255,235,210');
      for(let i=0;i<40;i++){ const a=Math.PI+hash(i+960)*Math.PI, r0=RR*0.7, r1=RR*(0.95+0.1*hash(i+961)); g.strokeStyle=`rgba(255,215,185,${0.25*(1-imp)})`; g.lineWidth=6; g.beginPath(); g.moveTo(SE.x+Math.cos(a)*r0,SE.y+Math.sin(a)*r0*0.62); g.lineTo(SE.x+Math.cos(a)*r1,SE.y+Math.sin(a)*r1*0.62); g.stroke(); }   // vạch bụi bắn toả
      g.restore();
      dustWall(SE.x,SE.y,lerp(250,4200,eout(imp)),0.95*(1-seg(imp,0.5,1))); cracks(SE.x,SE.y,Math.min(1,imp*1.5),2200,13); cracks(SE.x-200,SE.y,Math.min(1,imp*1.3),1600,29);
      if(imp<0.4&&Math.random()<0.9) rocks(SE.x+(Math.random()-0.5)*900,SE.y,3,(Math.random()-0.5)*14); }   // mặt đất vỡ tan
    skyline(t,u>=9.1&&u<9.8?18:0,false);
    // 🎬 chèn: quỷ bị đánh bay — nhìn từ trên xuống, nó rơi xa dần (nhỏ lại) kéo theo vệt đen
    if(u>=7.4&&u<8.0) ins(()=>{ const k=seg(u,7.4,8.0); bgFocus(t,'#3a0a0c','#050102',true,VW/2,VH*0.62); const s=lerp(1.0,0.18,eout(k)), w=VW*1.4*s;
      g.save(); g.globalCompositeOperation='lighter'; glow(VW/2,VH*0.62,w*0.8,0.5,'255,50,30'); g.restore(); demonFly(9,VW/2,VH*0.62,w,{flip:true,lit:1.4,rot:k*2.4});
      g.save(); g.lineCap='round'; g.strokeStyle='rgba(0,0,0,0.75)'; for(let i=0;i<10;i++){ const an=hash(i+970)*Math.PI*2; g.lineWidth=6+hash(i+971)*10; g.beginPath(); g.moveTo(VW/2+Math.cos(an)*w*0.4,VH*0.62+Math.sin(an)*w*0.4); g.lineTo(VW/2+Math.cos(an)*VH,VH*0.62+Math.sin(an)*VH); g.stroke(); } g.restore(); });
    // 🎬 chèn: rơi XUYÊN tầng mây — mây vút ngược lên, thân quỷ nén lại thành vệt đen
    if(u>=8.0&&u<8.7) ins(()=>{ const k=seg(u,8.0,8.7); bgRush(t,-1900,'#1a0408','#5a1810','140,70,70'); const w=lerp(520,260,k);
      g.save(); g.lineCap='round'; for(const [lw,c] of [[w*0.9,'rgba(255,40,30,0.15)'],[w*0.45,'rgba(20,0,4,0.75)']]){ g.strokeStyle=c; g.lineWidth=lw; g.beginPath(); g.moveTo(VW/2,VH*0.55); g.lineTo(VW/2,-100); g.stroke(); } g.restore();
      demonFly(8,VW/2,VH*0.55,w,{flip:true,lit:1.3,sy:lerp(1,0.6,k)}); });
  }
  const camJ5=u=>{ const [mx,my]=qMouth(), CCx=mx-620, CCy=my+330, GCX=-250; return keys(u,[[0,QH.x-250,QH.y+150,0.4,0.03],[1.55,QH.x-300,QH.y+170,0.45,0.03],
    [1.6,CCx+250,CCy-60,0.6,0],[2.05,CCx+150,CCy-60,0.64,0],   // tia sét UIA lướt qua → Clapping Cat hiện ra trước mặt quỷ
    [2.1,CCx,CCy-120,1.45,-0.05],[2.64,CCx,CCy-120,1.65,-0.06],   // cận: vỗ tay 1 cái
    [2.68,GCX+60,GY-620,0.5,0.06],[3.48,GCX+60,GY-700,0.56,0.05],   // cắt: Chonky dưới đất ngửa mặt lên → loé trắng → biến mất
    [3.52,QH.x-60,QH.y-2440,0.72,0],[3.85,QH.x-60,QH.y-2380,0.78,0],   // Chonky dạng bé hiện ra trên đầu quỷ
    [3.9,QH.x-60,QH.y-2250,0.55,0.05],[4.55,QH.x-60,QH.y-1950,0.5,0.06],   // rơi xuống, bốc lửa như thiên thạch
    [4.6,900,-2350,0.17,0],[6.95,900,-2250,0.17,0],   // TOÀN CẢNH: phóng to gấp ~3 con quỷ
    [7,QH.x-60,QH.y-560,0.42,0.05],[7.4,QH.x-60,QH.y-560,0.47,0.06],   // va chạm trên không (slow-motion)
    [8.7,SE.x,-1400,0.16,0],[9.05,SE.x,SE.y-900,0.17,0],   // góc rộng: tia đen cắm thẳng từ trời cao xuống đất
    [9.1,SE.x,SE.y-700,0.2,0.04],[10.6,SE.x,SE.y-800,0.15,0],   // chấn động kiểu Shinra Tensei
    [12.3,SE.x,SE.y-700,0.17,0],[13,SE.x,SE.y-600,0.2,0]]); };

  // ═════════ K — PHONG ẤN ÂM NHẠC 4 GÓC + HOLY ANGEL · quỷ chìm xuống địa ngục ═════════
  const SE={x:QX+160,y:860,rx:380,ry:105};
  function holyCross(x,y,S,a,flat){ if(a<=0.01) return; const T=S*0.24, top=-S*1.15, bot=S*1.25, ay=-S*0.38, aw=S*0.72;
    const path=()=>{ g.beginPath(); g.moveTo(x-T/2,y+top); g.lineTo(x+T/2,y+top); g.lineTo(x+T/2,y+ay-T/2); g.lineTo(x+aw,y+ay-T/2); g.lineTo(x+aw,y+ay+T/2); g.lineTo(x+T/2,y+ay+T/2); g.lineTo(x+T/2,y+bot); g.lineTo(x-T/2,y+bot); g.lineTo(x-T/2,y+ay+T/2); g.lineTo(x-aw,y+ay+T/2); g.lineTo(x-aw,y+ay-T/2); g.lineTo(x-T/2,y+ay-T/2); g.closePath(); };
    g.save(); g.globalCompositeOperation='lighter'; g.globalAlpha=a;
    g.shadowColor='rgba(255,215,120,1)'; g.shadowBlur=flat?30:70; g.fillStyle=flat?'rgba(255,215,120,0.55)':'rgba(255,225,150,0.75)'; path(); g.fill(); g.shadowBlur=0;
    const gr=g.createLinearGradient(x-aw,0,x+aw,0); gr.addColorStop(0,'rgba(255,200,90,0.5)'); gr.addColorStop(0.5,'rgba(255,255,240,1)'); gr.addColorStop(1,'rgba(255,200,90,0.5)');
    g.strokeStyle=gr; g.lineWidth=Math.max(2,S*0.035); path(); g.stroke();
    g.strokeStyle='rgba(255,255,255,0.95)'; g.lineWidth=Math.max(1.5,S*0.02); g.beginPath(); g.moveTo(x,y+top+T*0.3); g.lineTo(x,y+bot-T*0.3); g.moveTo(x-aw+T*0.3,y+ay); g.lineTo(x+aw-T*0.3,y+ay); g.stroke();   // lõi sáng trắng
    g.restore(); }
  // ✨ các vệt sáng thánh quấn quanh thân quỷ, siết dần vào (trói)
  function lightBind(cx,cy,k,a,t){ if(a<=0.01||k<=0) return; g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round';
    for(let i=0;i<5;i++){ const yy=cy-300+i*130, rx=lerp(900,250+50*Math.sin(i*1.7),k), ry=rx*0.2, tilt=(hash(i+60)-0.5)*0.6, rot=t*(1.2+i*0.25)*(i%2?1:-1);
      g.save(); g.translate(cx,yy); g.rotate(tilt);
      for(const [lw,al,c] of [[9,0.12,'255,225,150'],[3,0.4,'255,240,190'],[1.3,0.9,'255,255,255']]){ g.strokeStyle=`rgba(${c},${al*a*k})`; g.lineWidth=lw; g.setLineDash([rx*0.35,rx*1.4]); g.lineDashOffset=-rot*rx; g.beginPath(); g.ellipse(0,0,rx,ry,0,0,Math.PI*2); g.stroke(); }
      g.restore(); }
    g.setLineDash([]); g.restore(); }
  // 🔷 KẾT GIỚI của 4 meme âm nhạc: vòm sáng trong suốt dựng từ vòng phong ấn lên (kinh tuyến, vĩ tuyến, sóng nhạc chạy dọc vòm)
  function barrier(k,a,t){ if(k<=0.01||a<=0.01) return; const Hh=980, cx=SE.x, by=SE.y, rx=SE.rx*1.12, el=(f)=>Math.sqrt(Math.max(0,1-f*f));
    g.save(); g.globalCompositeOperation='lighter'; g.beginPath(); g.rect(cx-rx-60,by-Hh*k-10,rx*2+120,Hh*k+40); g.clip();   // dựng từ dưới lên
    const path=()=>{ g.beginPath(); g.ellipse(cx,by,rx,Hh,0,Math.PI,Math.PI*2); g.closePath(); };
    const gr=g.createRadialGradient(cx,by-Hh*0.4,Hh*0.2,cx,by-Hh*0.4,Hh*1.05); gr.addColorStop(0,`rgba(120,210,255,${0.03*a})`); gr.addColorStop(0.85,`rgba(120,210,255,${0.09*a})`); gr.addColorStop(1,`rgba(160,230,255,${0.2*a})`); g.fillStyle=gr; path(); g.fill();
    g.strokeStyle=`rgba(170,235,255,${0.5*a})`; g.lineWidth=3; path(); g.stroke();
    for(let i=1;i<4;i++){ g.strokeStyle=`rgba(150,220,255,${0.16*a})`; g.lineWidth=1.5; g.beginPath(); g.ellipse(cx,by,rx*i/4,Hh,0,Math.PI,Math.PI*2); g.stroke();
      const f=i/4*0.95; g.beginPath(); g.ellipse(cx,by-Hh*f,rx*el(f),SE.ry*0.6*el(f),0,0,Math.PI*2); g.stroke(); }
    for(let q=0;q<3;q++){ const f=((t*0.5+q/3)%1)*0.97; g.strokeStyle=`rgba(200,245,255,${0.32*(1-f)*a})`; g.lineWidth=2; g.beginPath(); g.ellipse(cx,by-Hh*f,rx*el(f),SE.ry*0.6*el(f),0,0,Math.PI*2); g.stroke(); }
    g.restore(); }
  // ═════════ K — quỷ gượng đứng dậy giữa phong ấn · vệt sáng trói khắp người · 4 meme âm nhạc dựng KẾT GIỚI · Holy Cat niệm chú, thánh giá giáng xuống → đẩy nó về địa ngục ═════════
  // ═════════ K — PHONG ẤN (toàn cảnh rộng: quỷ to gấp ~50 lần meme) ═════════
  //  quỷ gượng dậy giữa vòng phong ấn khổng lồ → vệt sáng trói khắp người → cận lần lượt 4 meme âm nhạc ở 4 góc → KẾT GIỚI KHỐI VUÔNG trong suốt dựng lên
  //  → cận Holy Cat niệm chú → thánh giá khổng lồ giáng xuống xuyên nóc kết giới → cổng địa ngục mở, quỷ bị đẩy chìm xuống → cổng đóng
  const KX=SE.x, KY=SE.y, KRX=2400, KRY=600, KDW=6000, KHC=5600;   // tâm vòng · bán kính vòng · bề ngang quỷ · chiều cao kết giới
  const K4=[[KX-KRX*0.82,KY-KRY*0.78,'pianocat','255,230,120'],[KX+KRX*0.82,KY-KRY*0.78,'electricguitarcat','255,90,90'],[KX-KRX*0.98,KY+KRY*0.86,'bongocat','255,200,120'],[KX+KRX*0.98,KY+KRY*0.86,'mosquitoviolin','255,80,140']];
  const kIm=k=>({pianocat:IMG.piano,electricguitarcat:IMG.guitar,bongocat:IMG.bongo,mosquitoviolin:IMG.mosq})[k];
  function kGround(t){   // nền riêng cho cảnh rộng: trời đỏ thẫm, dãy núi xa, đồng bằng nứt nẻ có mạch dung nham
    const sk=g.createLinearGradient(0,KY-9000,0,KY); sk.addColorStop(0,'#050103'); sk.addColorStop(0.55,'#1c0408'); sk.addColorStop(0.85,'#4a0e0c'); sk.addColorStop(1,'#6a1a10');
    g.fillStyle=sk; g.fillRect(KX-30000,KY-30000,60000,30000);
    g.save(); g.globalCompositeOperation='lighter'; glow(KX,KY-600,9000,0.35,'255,90,40'); g.restore();
    g.fillStyle='#120406'; g.beginPath(); g.moveTo(KX-30000,KY); for(let i=0;i<=60;i++){ const x=KX-15000+i*500, h=900+1400*Math.abs(Math.sin(i*0.7+1))*hash(i+70)+600*hash(i+71); g.lineTo(x,KY-h); } g.lineTo(KX+30000,KY); g.closePath(); g.fill();   // núi xa
    const gr=g.createLinearGradient(0,KY,0,KY+6000); gr.addColorStop(0,'#2a0d0b'); gr.addColorStop(0.3,'#160606'); gr.addColorStop(1,'#060202'); g.fillStyle=gr; g.fillRect(KX-30000,KY,60000,30000);
    g.save(); g.lineCap='round'; for(let i=0;i<34;i++){ const a=hash(i+80)*Math.PI, d0=KRX*(1.1+hash(i+81)*0.3), d1=d0+2000+hash(i+82)*6000, sx=Math.cos(a)*(hash(i+83)<0.5?1:-1);
      const x0=KX+sx*d0, y0=KY+Math.abs(Math.sin(a))*KRY*1.1*(hash(i+84)<0.5?-0.4:1), x1=KX+sx*d1, y1=y0+(y0-KY)*(d1/d0-1)*0.6;
      g.strokeStyle='rgba(255,90,30,0.35)'; g.lineWidth=40; g.beginPath(); g.moveTo(x0,y0); g.lineTo((x0+x1)/2+(hash(i+85)-0.5)*600,(y0+y1)/2); g.lineTo(x1,y1); g.stroke();
      g.strokeStyle='rgba(20,4,4,0.9)'; g.lineWidth=14; g.stroke(); } g.restore(); }   // vết nứt toả ra từ chỗ quỷ rơi
  function kRing(a,t,hole,shut){ g.save(); g.translate(KX,KY); g.scale(1,KRY/KRX); g.globalCompositeOperation='lighter'; const beat=0.8+0.2*Math.sin(t*12);
    for(const [r,lw] of [[KRX,40],[KRX*0.93,16],[KRX*0.62,26]]){ g.strokeStyle=`rgba(130,215,255,${a*beat})`; g.lineWidth=lw; g.beginPath(); g.arc(0,0,r,0,Math.PI*2); g.stroke(); }
    g.save(); g.rotate(t*0.15); g.font='700 230px serif'; g.fillStyle=`rgba(180,235,255,${a})`; for(let i=0;i<28;i++){ g.save(); g.rotate(i/28*Math.PI*2); g.fillText(['♪','ᚱ','♫','ᛟ','ᚢ','♩','ᛖ'][i%7],KRX*0.75,70); g.restore(); } g.restore();
    g.save(); g.rotate(-t*0.25); g.strokeStyle=`rgba(120,200,255,${a})`; g.lineWidth=24; for(const o of [0,Math.PI/3]){ g.beginPath(); for(let i=0;i<=3;i++){ const q=o+i*Math.PI*2/3; i?g.lineTo(Math.cos(q)*KRX*0.62,Math.sin(q)*KRX*0.62):g.moveTo(Math.cos(q)*KRX*0.62,Math.sin(q)*KRX*0.62); } g.stroke(); } g.restore();
    if(hole>0){ g.globalCompositeOperation='source-over'; const r=Math.max(0,KRX*0.7*hole*(1-shut)), gr=g.createRadialGradient(0,0,0,0,0,Math.max(1,r)); gr.addColorStop(0,'#000'); gr.addColorStop(0.75,'#1a0000'); gr.addColorStop(1,'rgba(255,70,20,0.9)'); g.fillStyle=gr; g.beginPath(); g.arc(0,0,r,0,Math.PI*2); g.fill(); }
    g.restore(); }
  // 🔷 KẾT GIỚI KHỐI VUÔNG trong suốt: 4 cạnh đáy theo phối cảnh, mặt kính xanh nhạt, cạnh phát sáng + chữ phù văn chạy dọc, dải sáng quét dần lên
  function kCube(k,a,t,front){ if(k<=0.01||a<=0.01) return; const h=KHC*k, FL=[KX-KRX*1.02,KY+KRY*0.95], FR=[KX+KRX*1.02,KY+KRY*0.95], BL=[KX-KRX*0.84,KY-KRY*0.9], BR=[KX+KRX*0.84,KY-KRY*0.9];
    const up=(p,s)=>[p[0],p[1]-h*s];
    const face=(P,al)=>{ g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.closePath(); g.fillStyle=`rgba(140,210,255,${al*a})`; g.fill(); };
    const edge=(p,q,w)=>{ g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round'; for(const [lw,al] of [[w*20,0.12],[w*8,0.35],[w*3,0.95]]){ g.strokeStyle=`rgba(${al>0.9?'235,250,255':'130,215,255'},${al*a})`; g.lineWidth=lw; g.beginPath(); g.moveTo(p[0],p[1]); g.lineTo(q[0],q[1]); g.stroke(); } g.restore(); };
    if(!front){ face([BL,BR,up(BR,0.94),up(BL,0.94)],0.05); face([BL,FL,up(FL,1),up(BL,0.94)],0.05); face([BR,FR,up(FR,1),up(BR,0.94)],0.05);
      edge(BL,up(BL,0.94),9); edge(BR,up(BR,0.94),9); edge(BL,BR,9); if(k>0.98) edge(up(BL,0.94),up(BR,0.94),9); return; }
    face([FL,FR,up(FR,1),up(FL,1)],0.11); if(k>0.98) face([up(FL,1),up(FR,1),up(BR,0.94),up(BL,0.94)],0.08);
    for(let q=0;q<3;q++){ const f=((t*0.25+q/3)%1)*k; g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle=`rgba(200,245,255,${0.25*(1-f)*a})`; g.lineWidth=50; g.beginPath(); g.moveTo(FL[0],FL[1]-KHC*f); g.lineTo(FR[0],FR[1]-KHC*f); g.lineTo(BR[0],BR[1]-KHC*0.94*f); g.stroke(); g.restore(); }   // dải sáng quét lên
    edge(FL,FR,12); edge(FL,up(FL,1),12); edge(FR,up(FR,1),12); if(k>0.98){ edge(up(FL,1),up(FR,1),12); edge(up(FL,1),up(BL,0.94),12); edge(up(FR,1),up(BR,0.94),12); }
    g.save(); g.font='700 150px serif'; g.fillStyle=`rgba(200,240,255,${0.7*a})`; g.textAlign='center'; for(const p of [FL,FR]) for(let i=0;i<9;i++){ const f=((i/9+t*0.08)%1)*k; g.fillText('ᚱᛟ♪ᚢ♫ᛖ'[i%6],p[0]+(p===FL?110:-110),p[1]-KHC*f); } g.restore();
    for(const p of [FL,FR,BL,BR]){ g.save(); g.globalCompositeOperation='lighter'; glow(p[0],p[1],600,0.55*a,'150,220,255'); g.restore(); } }
  function kBind(k,a,t,sink){ if(a<=0.01||k<=0) return; g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round';
    for(let i=0;i<6;i++){ const yy=KY-3300+i*560+sink, rx=lerp(5200,1300+260*Math.sin(i*1.7),k), ry=rx*0.2, tilt=(hash(i+60)-0.5)*0.6, rot=t*(1.2+i*0.25)*(i%2?1:-1);
      g.save(); g.translate(KX,yy); g.rotate(tilt);
      for(const [lw,al,c] of [[60,0.12,'255,225,150'],[20,0.4,'255,240,190'],[8,0.9,'255,255,255']]){ g.strokeStyle=`rgba(${c},${al*a*k})`; g.lineWidth=lw; g.setLineDash([rx*0.35,rx*1.4]); g.lineDashOffset=-rot*rx; g.beginPath(); g.ellipse(0,0,rx,ry,0,0,Math.PI*2); g.stroke(); }
      g.restore(); } g.setLineDash([]); g.restore(); }
  function scK(u,t){
    const rise=seg(u,0,1.8), bind=eout(seg(u,0.9,2.6)), cube=eio(seg(u,4.7,6.3)), form=eout(seg(u,7.4,8.4)), drop=ein(seg(u,8.5,8.9)), land=u>=8.9,
      hole=eio(seg(u,9.0,9.8)), sink=ein(seg(u,9.6,12.0)), shut=seg(u,12.0,12.6), fade=1-seg(u,12.8,14.2);
    kGround(t);
    { g.save(); g.fillStyle='rgba(6,2,2,0.95)'; g.beginPath(); g.ellipse(KX,KY+40,KRX*0.62,KRY*0.55,0,0,Math.PI*2); g.fill(); g.strokeStyle='rgba(120,60,40,0.8)'; g.lineWidth=40; g.stroke(); g.restore(); }   // hố sâu do cú rơi để lại
    kRing(0.35+0.65*seg(u,4.7,5.5),t,hole,shut);
    kCube(cube,fade,t,false);
    // 😈 quỷ khổng lồ: bò → chống tay → đứng dậy (rung bần bật) → bị trói → chìm qua cổng địa ngục
    const fr=u<0.5?0:u<1.0?3:u<1.6?4:5, tr=rise<1?Math.sin(t*23)*30:Math.sin(t*9)*20*bind*(1-sink);
    if(sink<1){ g.save(); g.beginPath(); g.rect(KX-30000,KY-30000,60000,30000-20); g.ellipse(KX,KY,KRX*0.7*hole,KRY*0.7*hole,0,0,Math.PI*2); g.clip();
      g.save(); g.globalCompositeOperation='lighter'; glow(KX,KY-2200,4200,0.35,'255,40,30'); g.restore();
      demon2(fr,KX+tr,KY+150+sink*5200+(1-eout(seg(u,0,1.7)))*3600,KDW,{lit:1.25,rot:Math.sin(t*3.3)*0.03}); g.restore();   // bò lên từ dưới hố
      kBind(bind,1-sink,t,sink*4000); }
    if(u<1.8&&Math.random()<0.8){ dust(KX+(Math.random()-0.5)*KDW*0.8,KY,3,600); rocks(KX+(Math.random()-0.5)*KDW*0.7,KY-200,2,(Math.random()-0.5)*30); }
    // 4 meme âm nhạc TÍ HON ở 4 góc vòng (to bằng ~1/50 con quỷ) — tuôn nhạc vào tâm, bắn cột sáng dựng kết giới
    K4.forEach(([x,y,k,c],i)=>{ const im=kIm(k), h=i<2?82:96; g.save(); g.globalCompositeOperation='lighter'; glow(x,y-h*0.5,h*2.2,0.5*fade,c); g.restore(); actor(im,x,y-(i===3?30:0),h,{flip:i===3});
      if(u>=4.6&&u<6.4){ const k2=seg(u,4.6,6.2); g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle=`rgba(${c},${0.5*(1-k2)})`; g.lineWidth=30; g.beginPath(); g.moveTo(x,y-h); g.lineTo(x,y-KHC*cube); g.stroke(); g.restore(); }
      if(fade>0.05&&u>=1.5) for(let q=0;q<4;q++){ const f=(t*0.5+q/4+i*0.13)%1, px=lerp(x,KX,f), py=lerp(y-h*0.5,KY-1600,f)-Math.sin(f*Math.PI)*700; g.save(); g.globalCompositeOperation='lighter'; glow(px,py,90,0.7*fade,c); g.restore(); } });
    kCube(cube,fade,t,true);
    // ✝️ thánh giá khổng lồ trên trời → giáng xuyên nóc kết giới, cắm vào quỷ → in dấu xuống vòng
    const CRS=1300;
    if(form>0&&fade>0){ const cx=KX, cy=land?KY-CRS*1.25:lerp(KY-KHC-2200,KY-CRS*1.25,drop);
      if(!land){ g.save(); g.globalCompositeOperation='lighter'; for(let q=0;q<16;q++){ const an=q/16*Math.PI*2+t*0.4, L=CRS*(2.4+0.4*Math.sin(t*5+q)); g.strokeStyle=`rgba(255,235,170,${0.2*form})`; g.lineWidth=30; g.beginPath(); g.moveTo(cx+Math.cos(an)*CRS*0.9,cy+Math.sin(an)*CRS*0.9); g.lineTo(cx+Math.cos(an)*L,cy+Math.sin(an)*L); g.stroke(); } g.restore(); }
      if(land){ g.save(); g.beginPath(); g.rect(KX-30000,KY-30000,60000,30000-20); g.clip(); }
      holyCross(cx,cy+(land?CRS*0.35:0),CRS*form,fade*(land?1-seg(u,11,12.6)*0.7:1)); if(land) g.restore();
      if(drop>0&&drop<1) for(let k=1;k<5;k++) holyCross(cx,cy-k*CRS*0.35,CRS,0.15*(1-k*0.2));
      if(land){ const k=seg(u,8.9,9.5); g.save(); g.translate(KX,KY); g.scale(1,KRY/KRX); holyCross(0,KRX*0.08,KRX*0.62*eout(k),0.7*fade,true); g.restore();
        if(u<9.0) shake=40; softShock(KX,KY,lerp(400,KRX*2.4,eout(k)),0.6*(1-k),'255,235,170',KRY/KRX); if(u<8.97){ sparks(KX,KY-300,60,'255,230,160',40); dust(KX,KY,40,3500); } } }
    if(u>=12.6&&u<12.68) shake=20; if(u>=12.6) { g.save(); g.globalCompositeOperation='lighter'; glow(KX,KY,lerp(800,6000,seg(u,12.6,13.3)),1-seg(u,12.6,13.3),'255,255,255'); g.restore(); }
    // 🎬 cận lần lượt 4 meme âm nhạc (kiểu cận mặt Gigachad): nền vạch tập trung theo màu, nhân vật to choán khung, nốt nhạc + sóng âm toả ra
    const CU=[[1.8,'pianocat'],[2.5,'electricguitarcat'],[3.2,'bongocat'],[3.9,'mosquitoviolin']];
    for(const [t0,k] of CU){ if(u<t0||u>=t0+0.7) continue; const c=K4.find(e=>e[2]===k)[3], q=seg(u,t0,t0+0.7), im=kIm(k);
      ins(()=>{ const col=`rgb(${c})`; bgFocus(t,'#2a0a12','#050103',false,VW/2,VH*0.42); g.save(); g.globalCompositeOperation='lighter'; glow(VW/2,VH*0.5,VW*0.8,0.55,c); g.restore();
        for(let r=0;r<3;r++){ const f=(q*1.6+r/3)%1; ring(VW/2,VH*0.55,lerp(60,VW*0.9,f),0.6*(1-f),c,5,1); }
        const z=lerp(1.0,1.12,q), hh=VH*0.62*z; actor(im,VW/2+Math.sin(t*30)*2*(1-q),VH*0.86+hh*0.04,hh,{flip:k==='mosquitoviolin'});
        g.save(); g.font='900 64px serif'; g.textAlign='center'; for(let i=0;i<8;i++){ const f=(q+i/8)%1, an=hash(i+t0*10)*Math.PI*2, d=lerp(80,VW*0.6,f); g.fillStyle=`rgba(${c},${1-f})`; g.fillText(['♪','♫','♩','♬'][i%4],VW/2+Math.cos(an)*d,VH*0.5+Math.sin(an)*d*0.8); } g.restore();
        if(q<0.12){ g.fillStyle=`rgba(255,255,255,${0.6*(1-q/0.12)})`; g.fillRect(0,0,VW,VH); } }); }
    // 🎬 cận Holy Cat NIỆM CHÚ: vòng hào quang + phù văn vàng xoay, tia sáng toả
    if(u>=6.4&&u<7.4) ins(()=>{ const q=seg(u,6.4,7.4); bgFocus(t,'#fff3d8','#4a2a10',true,VW/2,VH*0.42); g.save(); g.globalCompositeOperation='lighter';
      for(let i=0;i<20;i++){ const an=i/20*Math.PI*2+t*0.3; g.strokeStyle='rgba(255,230,160,0.18)'; g.lineWidth=14; g.beginPath(); g.moveTo(VW/2,VH*0.38); g.lineTo(VW/2+Math.cos(an)*VH,VH*0.38+Math.sin(an)*VH); g.stroke(); }
      for(const [r,sp] of [[VW*0.42,0.6],[VW*0.3,-0.9]]){ g.strokeStyle='rgba(255,220,140,0.85)'; g.lineWidth=4; g.beginPath(); g.arc(VW/2,VH*0.38,r,0,Math.PI*2); g.stroke(); g.font='700 34px serif'; g.fillStyle='rgba(255,236,180,0.95)'; g.textAlign='center'; for(let i=0;i<14;i++){ const an=i/14*Math.PI*2+t*sp; g.fillText('✦ᛉ✧ᛟ✝ᚨ✦'[i%7],VW/2+Math.cos(an)*r,VH*0.38+Math.sin(an)*r+12); } }
      g.restore(); actor(IMG.angel,VW/2,VH*0.72+Math.sin(t*2)*6,VH*0.5*lerp(1,1.08,q),{});
      if(q<0.12){ g.fillStyle=`rgba(255,255,255,${0.7*(1-q/0.12)})`; g.fillRect(0,0,VW,VH); } });
    // 😇 Holy Cat tí hon lơ lửng trên nóc kết giới
    if(u>=7.4&&fade>0){ const ax=KX, ay=KY-KHC-500+Math.sin(t*2)*30; g.save(); g.globalCompositeOperation='lighter'; glow(ax,ay-60,700,0.6*fade,'255,250,225'); g.restore(); actor(IMG.angel,ax,ay,110,{a:fade}); }
  }
  const camK=u=>keys(u,[[0,KX,KY-1500,0.13,0.02],[1.8,KX,KY-1700,0.115,0.02],[4.6,KX,KY-1800,0.105,0],[4.7,KX,KY-2500,0.092,-0.015],[6.4,KX,KY-2800,0.088,0],
    [7.4,KX,KY-3500,0.085,0.015],[8.45,KX,KY-3300,0.085,0.015],[8.5,KX,KY-2600,0.09,0],[9.0,KX,KY-2100,0.1,-0.02],[12,KX,KY-1800,0.1,0],[14.5,KX,KY-1700,0.105,0]]);

  // ═════════ L — Evil Gary bị xé làm đôi (kiểu Voldemort/Harry) → Gary gốc văng ra, UIA lướt như Flash đón đi ═════════
  function scL(u,t){ const x=600, y=870, wr=seg(u,0,0.9), tear=eio(seg(u,0.8,2.7)), snap=u>=2.7, fly=eout(seg(u,2.7,3.3)), streak=seg(u,3.5,3.95), took=u>=3.72;
    chaosSouls(t,8,x,y-160,200,80);
    if(!snap){ const j=(Math.random()-0.5)*10*wr, sep=tear*95;
      g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<7;i++) bolt(x-sep*0.6,y-60,x+sep*0.6+(Math.random()-0.5)*60,y-60+(Math.random()-0.5)*110,2.2,0.75*wr,i%2?'255,30,30':'110,50,190'); g.restore();
      addGlow(x,y-60,180,0.5*wr,'255,40,40');
      actor(IMG.gary,x-sep+j,y,105,{a:0.25+0.75*tear,rot:-0.25*tear+Math.sin(t*30)*0.06*wr,sx:1+tear*0.15});
      actor(IMG.egary,x+sep-j,y,112,{a:1-0.15*tear,rot:0.25*tear-Math.sin(t*28)*0.06*wr,glow:'rgba(255,0,0,0.85)',gb:20,sx:1+tear*0.15}); }
    else { if(u<2.78){ shake=24; } impact(x,y-60,seg(u,2.7,3.2),300);
      if(!took){ const gX=lerp(x,230,fly), gY=y+20-Math.sin(Math.PI*fly)*170; actor(IMG.gary,gX,gY,98,{rot:fly*3.3}); }
      shadow(x+130,y,50); actor(IMG.egary,x+130,y,lerp(125,100,seg(u,2.8,3.2)),{sy:0.86,glow:'rgba(255,0,0,0.85)',gb:20,rot:Math.sin(t*18)*0.04});
      if(streak>0 && streak<1){ const hx=lerp(980,-300,streak); flashStreak(Math.min(1100,hx+500),hx,y,110,1); actor(took?IMG.uia:IMG.uia,hx,y,104,{rot:-0.22,flip:true});
        if(took){ actor(IMG.gary,hx+20,y-50,70,{rot:0.4}); } } }
    if(u>=3.72 && u<3.8) addGlow(230,y-40,160,1,'255,230,160'); }
  const camL=u=>keys(u,[[0,600,780,1.5],[2.6,600,770,1.75],[2.75,520,760,1.05],[3.4,470,760,1.0],[4,450,760,1.0],[5,540,750,0.95]]);

  // ═════════ M — Stalin vung búa kết liễu → bàn tay bóng tối hất văng · bóng tối + vô số bàn tay · 2 kẻ ác bị lôi đi ═════════
  function scM(u,t){ const gx=880, lx=1040, sx0=520;
    const step=seg(u,0,1.3), raise=eout(seg(u,0.9,1.6)), swing=ein(seg(u,1.6,2.25)), slap=seg(u,2.15,2.4), fly=eout(seg(u,2.4,3.2));
    const dark=eio(seg(u,2.6,3.8))*(1-eio(seg(u,6.0,7.0))), back=eio(seg(u,3.2,4.2)), grab=eio(seg(u,4.2,4.8)), drag=eio(seg(u,4.9,6.0));
    if(dark>0){ g.save(); g.fillStyle=`rgba(2,0,5,${0.62*dark})`; g.fillRect(-1500,-1500,3500,3500); g.restore(); for(let i=0;i<7;i++) darkCloud(-200+i*260,lerp(-500,60,dark)+Math.sin(i*1.7)*90,380,dark,t,i*13); for(let i=0;i<6;i++) darkCloud(-150+i*300,1050,300,dark*0.9,t,i*29+5); }
    // 2 kẻ ác dồn vào góc → bị lôi đi
    actor(IMG.larryRed,lx+drag*320,830-drag*30,lerp(330,90,drag),{a:1-drag,flip:true,rot:Math.sin(t*14)*0.05*grab});
    shadow(gx,860,55,0.4*(1-drag)); actor(IMG.egary,gx+drag*280,860-drag*50,lerp(125,45,drag),{a:1-drag,glow:'rgba(255,0,0,0.85)',gb:18,rot:Math.sin(t*16)*0.07*grab});
    if(grab>0){ const ga=grab*(1-seg(u,5.8,6.2)); shadowHand('grip',1700,250,gx+drag*280-150,800-drag*50,0.85*(1-drag*0.3),ga,1); shadowHand('grip',1700,1150,lx+drag*320-200,660-drag*30,1.05*(1-drag*0.3),ga,-1); }
    // các meme lùi lại
    team.slice(1,7).forEach((m,i)=>{ const x=lerp(160,-40,back)-i*70+(i%2)*20, y=880+(i%3)*28; shadow(x,y,30,0.35); actor(m.im,x,y,i===0?108:96,{flip:flipTo(m.k,true),rot:Math.sin(t*9+i)*0.03*back}); });
    // Stalin bước tới, giơ búa sét → vung → bị hất văng
    const sx=fly>0?lerp(sx0+170,-380,fly):lerp(sx0,sx0+170,eio(step)), sy=870-Math.sin(Math.PI*fly)*260;
    shadow(sx,870,50,0.5*(1-fly)); actor(IMG.stalin,sx,sy,150,{rot:fly*-3.4});
    if(fly<=0){ const hx=sx+40+swing*70, hy=lerp(740,560,raise)+swing*190; const hc=prep(IMG.hammer); if(hc){ g.save(); g.translate(hx,hy); g.rotate(lerp(-0.3,-0.95,raise)+swing*1.6); g.drawImage(hc.src,hc.sx,hc.sy,hc.sw,hc.sh,-38,-38,76,76*hc.sh/hc.sw); g.restore(); }
      if(raise>0.4){ addGlow(hx,hy,110,0.65,'150,210,255'); if(Math.random()<0.6) bolt(hx,hy,hx+(Math.random()-0.5)*180,hy-130-Math.random()*220,2,0.9,'150,210,255'); if(Math.random()<0.25) bolt(hx+(Math.random()-0.5)*300,-700,hx,hy,3.4,0.9,'150,210,255'); } }
    if(slap>0) shadowHand('slap',sx0+700,1350,lerp(sx0+560,sx0+60,eout(slap)),lerp(1060,770,eout(slap)),1.15,1-seg(u,2.8,3.4),1);
    if(u>=2.38 && u<2.46){ shake=26; } impact(sx0+190,740,seg(u,2.4,2.8),260);
    // vô số bàn tay trồi ra từ bóng tối (trời + đất + 2 mép)
    if(dark>0) for(let i=0;i<14;i++){ const top=i<6, bx=top?-250+i*300:(i<11?-300+(i-6)*340:(i%2?-700:1900)), by=top?-600:(i<11?1350:500+(i%3)*120), k=eio(seg(u,3.0+i*0.09,3.9+i*0.09))*dark;
      const tx=bx+(top?(hash(i)-0.5)*200:(i<11?(hash(i)-0.5)*200:(i%2?520:-520))), ty=top?lerp(by,by+560+hash(i)*120,k):(i<11?lerp(by,by-460-hash(i)*120,k):by);
      shadowHand(i%3?'crawlA':(i%2?'lunge':'crawlB'),bx,by,lerp(bx,tx,i>=11?k:1),ty,0.8+hash(i+3)*0.3,k,(i%2?1:-1)); }
  }
  const camM=u=>keys(u,[[0,690,740,0.82],[1.5,720,720,0.95],[2.2,700,720,1.05],[2.4,560,700,0.7],[3.2,500,660,0.5],[6,700,660,0.48],[7,600,700,0.55]]);

  // ═════════ N — Doge + các meme đỡ Stalin dậy, nắng xuyên trời đêm ═════════
  function scN(u,t){ const up=eio(seg(u,0.7,2.4)), sun=eio(seg(u,0.6,3.5)), sx=300, sy=870;
    if(sun>0){ g.save(); g.globalCompositeOperation='lighter'; const gr=g.createLinearGradient(0,-900,0,950); gr.addColorStop(0,`rgba(255,215,150,${0.42*sun})`); gr.addColorStop(1,`rgba(255,195,120,${0.1*sun})`); g.fillStyle=gr; g.fillRect(-1500,-1500,3500,3000);
      g.translate(-150,-700); for(let i=0;i<6;i++){ const a=0.9+i*0.11+Math.sin(t*0.4+i)*0.01; const rg=g.createLinearGradient(0,0,Math.cos(a)*2600,Math.sin(a)*2600); rg.addColorStop(0,`rgba(255,240,200,${0.16*sun})`); rg.addColorStop(1,'rgba(255,220,150,0)'); g.fillStyle=rg; g.beginPath(); g.moveTo(0,0); g.lineTo(Math.cos(a-0.035)*2600,Math.sin(a-0.035)*2600); g.lineTo(Math.cos(a+0.035)*2600,Math.sin(a+0.035)*2600); g.closePath(); g.fill(); } g.restore(); }
    crowd.slice(0,10).forEach((c,i)=>{ const x=i%2?-60-i*28:560+i*26, y=820+(i%3)*30, run=eout(seg(u,0.2+i*0.05,1.2+i*0.05)); const xx=lerp(x+(i%2?-200:200),x,run); shadow(xx,y,c.h*0.3,0.3); actor(c.im,xx,y-(run<1?Math.abs(Math.sin(t*12+i))*5:0),c.h); });
    team.slice(1,6).forEach((m,i)=>{ if(m.k==='doge') return; const x=i%2?120-i*25:470+i*22, y=870+(i%2)*20; shadow(x,y,30,0.35); actor(m.im,x,y,98,{flip:flipTo(m.k,x<sx)}); });   // quay về phía Stalin
    shadow(sx,sy,60); actor(IMG.stalin,sx,sy,150,{rot:lerp(-1.45,0,up)});
    const hc=prep(IMG.hammer); if(hc){ g.save(); g.translate(sx+64,sy-lerp(8,70,up)); g.rotate(lerp(-1.55,0.05,up)); g.drawImage(hc.src,hc.sx,hc.sy,hc.sw,hc.sh,-32,-32,64,64*hc.sh/hc.sw); g.restore(); }
    const dx=lerp(620,sx+105,eout(seg(u,0,0.7))); shadow(dx,sy,40); actor(IMG.doge,dx,sy-(u<0.7?Math.abs(Math.sin(u*14))*6:0),118,{flip:false,rot:-0.12*Math.sin(Math.PI*seg(u,0.7,2.4))}); }
  const camN=u=>keys(u,[[0,320,770,1.2],[2.4,320,740,1.0],[3.5,320,640,0.7]]);
  // 🩸 DÒNG MÁU THẬT: gốc phình liền mép (máu ứ), thân thon dần có viền sẫm + vệt bóng, đuôi là giọt căng tròn; chảy nhanh rồi chậm dần
  function bloodDrip(x,y0,L,w,a){ if(L<=0.5 || a<=0.01) return; const r=w*0.95, yb=y0+L;
    g.save(); g.globalAlpha*=a;
    const gr=g.createLinearGradient(x-w*1.6,0,x+w*1.6,0); gr.addColorStop(0,'#4a0000'); gr.addColorStop(0.35,'#a40b0b'); gr.addColorStop(0.55,'#b81414'); gr.addColorStop(1,'#3d0000');
    g.fillStyle=gr; g.beginPath();
    g.moveTo(x-w*1.9,y0); g.quadraticCurveTo(x-w*0.6,y0+Math.min(L,w*1.6)*0.35,x-w*0.55,y0+Math.min(L,w*3));   // gốc phình liền mép
    g.lineTo(x-w*0.42,yb-r*0.6); g.arc(x,yb,r,Math.PI*1.12,Math.PI*1.88,true);   // giọt tròn ở đuôi
    g.lineTo(x+w*0.55,y0+Math.min(L,w*3)); g.quadraticCurveTo(x+w*0.6,y0+Math.min(L,w*1.6)*0.35,x+w*1.9,y0); g.closePath(); g.fill();
    g.fillStyle='rgba(255,170,170,0.35)'; g.beginPath(); g.ellipse(x-r*0.35,yb-r*0.3,r*0.28,r*0.42,-0.3,0,Math.PI*2); g.fill();   // ánh bóng trên giọt
    g.strokeStyle='rgba(255,150,150,0.22)'; g.lineWidth=Math.max(0.6,w*0.25); g.beginPath(); g.moveTo(x-w*0.25,y0+w); g.lineTo(x-w*0.22,yb-r*1.1); g.stroke();   // vệt bóng dọc thân
    g.restore(); }
  // mép dưới thật của chữ (quét điểm ảnh) → các điểm để máu chảy ra
  const _dripCache={};
  function textDripPts(str,font,n,seed){ const key=str+font; if(_dripCache[key]) return _dripCache[key];
    const c=document.createElement('canvas'); c.width=600; c.height=120; const x=c.getContext('2d'); x.font=font; x.textAlign='center'; x.textBaseline='middle'; x.fillStyle='#fff'; x.fillText(str,300,60);
    const d=x.getImageData(0,0,600,120).data, cols=[]; for(let xx=0;xx<600;xx++){ let yb=-1; for(let yy=119;yy>=0;yy--) if(d[(yy*600+xx)*4+3]>128){ yb=yy; break; } if(yb>=0) cols.push([xx-300,yb-60]); }
    const pts=[]; for(let i=0;i<n;i++){ const q=cols[Math.floor((i+0.2+hash(seed+i)*0.6)/n*cols.length)]; if(q) pts.push(q); }
    return _dripCache[key]=pts; }
  const flow=(t,T)=>t<=0?0:1-Math.exp(-t/T);   // chảy nhanh lúc đầu, chậm dần
  // ═════════ O — màn đen kết ═════════
  function endCard(u){ g.fillStyle=`rgba(0,0,0,${seg(u,0,0.7)})`; g.fillRect(0,0,VW,VH); const v=u-0.8; if(v<=0) return;
    text('THAT IS THE END OF THE LORE',VW/2,VH*0.52,28,'#ffffff',null,'700 28px Georgia,serif',seg(v,0,0.7));
    if(v>3.0){ const w=v-3.0, k=seg(w,0,0.5), F='900 38px Georgia,serif';
      g.save(); g.font=F; g.textAlign='center'; g.textBaseline='middle'; g.globalAlpha=k;
      const tg=g.createLinearGradient(0,VH*0.6-20,0,VH*0.6+20); tg.addColorStop(0,'#c21818'); tg.addColorStop(0.6,'#9a0a0a'); tg.addColorStop(1,'#5e0000'); g.fillStyle=tg; g.fillText('BUT NOT MY…',VW/2,VH*0.6);
      g.fillStyle='rgba(255,170,170,0.18)'; g.fillText('BUT NOT MY…',VW/2-0.8,VH*0.6-1.2); g.restore();   // ánh ướt trên mặt chữ
      for(const [i,q] of textDripPts('BUT NOT MY…',F,11,7).entries()){ const t0=0.15+hash(i+5)*0.7, L=flow(w-t0,0.9+hash(i)*0.8)*(16+hash(i+9)*110), ww=2.4+hash(i+2)*3.2;
        bloodDrip(VW/2+q[0], VH*0.6+q[1]-3, L, ww, k);
        const dt=w-t0-1.2-hash(i+11)*1.5; if(dt>0 && hash(i+13)<0.5){ const yy=VH*0.6+q[1]+L+dt*dt*260; if(yy<VH) bloodDrip(VW/2+q[0], yy-ww*2.2, ww*1.6, ww*0.7, k); } } }   // giọt rời ra rơi xuống
    if(v>3.6){ const w=v-3.6, open=eio(seg(w,0.3,1.4)), c=prep(IMG.grin); if(c){ const W=200, H=W*c.sh/c.sw, x=VW/2-W/2, y=VH*0.47-H-34, em=H*0.22;   // chỉ mắt + miệng, không hiện khuôn mặt
        g.save(); g.imageSmoothingEnabled=false; g.globalAlpha=seg(w,0,0.6); g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,x,y,W,H);
        g.fillStyle='#000'; g.fillRect(x-4,y-4,W+8,em*(1-open)+4); g.fillRect(x-4,y+em+em*1.05*open,W+8,em*1.05*(1-open)+1);   // mí mắt mở dần từ giữa ra
        g.restore(); } } }

  const SCN=[[scA,camA],[scC,camC],[scD,camD],[scG,camG],[scH,camH],[scP,camP],[scQ,camQ],[scJ1,camJ1],[scJ2,camJ2],[scJ3,camJ3],[scJ4,camJ4],[scJ5,camJ5],[scK,camK],[scL,camL],[scM,camM],[scN,camN]];
  function keys(u,K){ for(let i=0;i<K.length-1;i++){ const a=K[i], b=K[i+1]; if(u>=a[0] && u<b[0]){ const k=(b[0]-a[0]<0.05)?1:eio((u-a[0])/(b[0]-a[0])); return [lerp(a[1],b[1],k),lerp(a[2],b[2],k),lerp(a[3],b[3],k),lerp(a[4]||0,b[4]||0,k)]; } } const L=K[K.length-1]; return [L[1],L[2],L[3],L[4]||0]; }   // [t, x, y, zoom, nghiêng]
  // 🔊 tiếng (thời điểm tuyệt đối)
  const SFX=[[0.3,'titan_roar',0.5,3],[1.6,'hit_heavy',0.6],[2.9,'holy_thunder',0.6],[3.6,'hit_mid',0.6],
    [4.55,'stalin_domain',0.5,2],[5.4,'sm_form',0.6],[6.0,'wg_axe_whoosh',0.8],[6.5,'stalin_hammer_hit',1.0],[6.5,'holy_thunder',0.9],[6.52,'vine_boom',1.0],[6.9,'burn_loop',0.6,1],[7.0,'gp_souls',0.7,1.5],[7.3,'hit_heavy',0.8],[7.8,'larry_horn',0.6,2],[8.2,'fd_roar',0.7,2],[8.25,'hit_heavy',1.0],[8.8,'burn_loop',0.6,1],[9.5,'stalin_hammer_return',0.8],[10.2,'stalin_hammer_hit',1.0],[10.2,'holy_thunder',1.0],[10.22,'vine_boom',1.0],[11.1,'flyingcat_laser',0.7,1.4],[11.1,'king_laser',0.7],[12.5,'creeper_explosion',1.0],[12.5,'wg_dragon_impact',1.0],[12.55,'br_boom',0.9],
    [13.65,'uia_tele_dbz',0.9],[14.28,'death_break',0.5],[14.48,'death_break',0.5],[14.65,'death_break',0.5],[14.81,'death_break',0.5],[14.97,'death_break',0.5],[15.14,'death_break',0.5],[15.31,'death_break',0.5],[15.51,'death_break',0.5],
    [16.7,'cdg_grow',0.9],[18.75,'vine_boom',1.0],[18.75,'creeper_explosion',0.8],[19,'wg_dragon_impact',0.8],
    [21.1,'sm_form',0.6],[24,'sm_schwing',1.0],[24.1,'ninja_slash',0.9],[24.9,'sm_fin',1.0],[25.1,'sm_drip',0.6],[25.1,'death_break',0.8],
    [27.6,'titan_roar',0.7,3],[28.3,'larry_horn',0.6,2],[28.5,'gp_souls',0.7,3],[29.6,'punch1',0.5],[30.2,'fd_roar',0.5,2],[30.8,'punch1',0.5],[31.6,'hit_mid',0.5],
    [33,'vine_boom',0.7],[34.5,'ultimate_charge_2',0.9],[34.9,'gigachad_roar',1.0,2],[34.95,'hit_heavy',1.0],
    [36,'wg_axe_whoosh',0.6],[36.45,'br_boom',1.0],[36.45,'hit_heavy',1.0],[36.5,'creeper_explosion',0.6],[37.45,'titan_roar',0.7,2],[37.72,'gigachad_roar',0.8,1.5],[38,'wg_dragon_impact',1.0],[38,'vine_boom',0.9],[38.05,'creeper_explosion',0.6],[39.2,'wg_axe_whoosh',0.8],[39.45,'hit_heavy',1.0],[39.5,'br_boom',0.7],[40.85,'wg_dragon_impact',1.0],[40.85,'vine_boom',1.0],[40.9,'hit_heavy',1.0],[41.4,'fd_roar',0.9,2.5],
    [43.1,'sc_wing',0.9],[43.6,'sc_wing',0.9],[44,'titan_roar',0.7,2],[44.2,'sc_wing',0.7],[45.6,'gp_souls',0.7,3],[46,'ultimate_charge_2',0.9],[47.6,'holy_thunder',0.4],[48,'vine_boom',0.8],[48.4,'br_boom',0.9],[48.45,'fd_roar',0.7,2],
    [49.1,'thunder_big',0.5,4],[50.6,'gigachad_roar',1.0,2],[51.4,'wg_dragon_impact',1.0],[51.4,'creeper_explosion',1.0],[51.45,'hit_heavy',1.0],[51.5,'br_boom',0.8],[52.8,'titan_roar',0.5,2],
    [56.1,'sm_form',0.7],[56.4,'wg_axe_whoosh',0.8],[57,'ultimate_charge_2',0.6],[57.5,'sm_schwing',1.0],[57.5,'sm_slash',1.0],[58,'sm_fin',0.9],[58,'mewing_statue_break',0.8],[59.1,'creeper_explosion',1.0],[59.1,'br_boom',1.0],[59.15,'wg_dragon_impact',1.0],[59.2,'thunder_big',0.6,3],
    [63.3,'ultimate_charge_2',0.6],[64.6,'uia_tele_dbz',1.0],[65.8,'cdg_grow',0.6],[65.42,'clap_cat',1.0],[66.5,'clap_tele',1.0],[66.9,'burn_loop',0.7,2.4],[69.1,'cdg_grow',0.9],[70,'vine_boom',1.0],[70,'hit_heavy',1.0],
    [70.45,'wg_axe_whoosh',0.9],[70.5,'fd_roar',0.8,2],[71.05,'wg_axe_whoosh',0.7],[71.1,'thunder_big',0.5,3],[71.75,'lightsaber_whoosh_01',0.8],[72.1,'creeper_explosion',1.0],[72.1,'wg_dragon_impact',1.0],[72.1,'vine_boom',1.0],[72.15,'br_boom',1.0],[72.2,'thunder_big',0.7,4],[72.6,'mewing_statue_break',0.8],
    [76.1,'titan_roar',0.7,3],[77,'wg_dragon_impact',0.7],[77.2,'hl_choir',0.5,3],[77.8,'piano_giorno',0.6,1.6],[78.5,'guitar_jojo',0.6,1.6],[79.2,'tribe_1',0.7,1.6],[79.9,'mosquito_violin',0.6,1.6],[80.7,'ultimate_charge_2',0.9],[80.8,'hl_laser',0.8],[82.4,'hl_choir',1.0,4],[83.6,'holy_thunder',0.7],[84.5,'wg_axe_whoosh',0.8],[84.9,'holy_thunder',1.0],[84.9,'wg_dragon_impact',1.0],[84.9,'vine_boom',1.0],[85.6,'titan_roar',0.9,3],[88.6,'holy_thunder',0.8],
    [90.8,'sc_terror',0.6],[91.5,'ultimate_charge_2',0.8],[93.2,'vine_boom',1.0],[93.2,'holy_thunder',0.8],[94,'uia_tele_dbz',1.0],
    [96.4,'holy_thunder',0.6],[97.1,'stalin_hammer_return',0.7],[97.65,'hm_claw1',1.0],[97.9,'vine_boom',1.0],[98.1,'hm_stalker',0.9],[98.6,'hm_crawl',0.8],[99.7,'hm_claw2',0.9],[99.9,'sc_terror',0.7],[100.5,'gp_souls',0.5],
    [109.7,'fr_thunder',0.8],[111.3,'fr_bite',0.7],];
  // 🎵 nhạc nền (Audio riêng, bám thời gian thật của phim)
  let MUS=[];
  const MUS_DEF=[ {src:'assets/audio/cine_horns.mp3',a:0,b:21.5,vol:0.8,fi:0.6,fo:0.8}, {src:'assets/audio/cine_epic.mp3',a:21,b:90.5,vol:0.8,loop:true,fi:0.5,fo:1.0},
      {src:'assets/audio/cine_heart_fast.mp3',a:90.5,b:95.5,vol:0.7,loop:true,fo:0.3}, {src:'assets/audio/cine_horns.mp3',a:102.5,b:106.7,vol:0.45,fi:1.2,fo:1.0}, {src:'assets/audio/fr_song.mp3',a:109.8,b:1e9,vol:0.8,fi:0.3} ];
  function musSetup(){ musStop(); MUS=MUS_DEF.map(d=>Object.assign({el:Object.assign(new Audio(d.src),{preload:'auto'})},d,{b:Math.min(d.b,DUR)}));
    for(const m of MUS) m.el.loop=!!m.loop; }
  function musTick(rR,tR){ for(const m of MUS){ const on=!paused && tR>=m.a && tR<m.b;
      if(!on){ if(!m.el.paused) m.el.pause(); continue; }
      const pos=rR-c2r(m.a), d=m.el.duration||1e9;
      if(!m.loop && pos>=d){ if(!m.el.paused) m.el.pause(); continue; }
      if(m.el.paused){ try{ m.el.currentTime=m.loop?pos%d:pos; }catch(e){} m.el.play().catch(()=>{}); }
      else if(!m.loop && Math.abs(m.el.currentTime-pos)>0.35){ try{ m.el.currentTime=pos; }catch(e){} }
      let v=m.vol; if(m.fi) v*=seg(tR,m.a,m.a+m.fi); if(m.fo) v*=1-seg(tR,m.b-m.fo,m.b);
      if(tR>=SC[SI.H]+1.2 && tR<SC[SI.H]+3.0) v*=lerp(1,0.15,seg(tR,SC[SI.H]+1.2,SC[SI.H]+2.4));   // King bị vây: nhạc lặng dần trước nhát cắt
      if(slowAt(tR)) v*=0.55;   // slow-mo: nhạc lặng xuống
      m.el.volume=clamp(v,0,1); } }
  function musStop(){ for(const m of MUS){ try{ m.el.pause(); }catch(e){} } }

  function frame(now){
    if(!OFF) raf=requestAnimationFrame(frame);
    const R=OFF?Math.min(OFF.R,DURR):Math.min(paused?pauseT:(now-t0)/1000, DURR), t=r2c(R), SL=slowAt(t), spd=SL?SL[2]:1;
    let si=0; while(si<SCN.length && t>=SC[si+1]) si++;
    const u=t-SC[si];
    if(!OFF) SFX.forEach(([ts,k,v,d],i)=>{ if(t>=ts && t<ts+1.5) sfx('s'+i,k,v,d); });
    g.setTransform(1,0,0,1,0,0); g.fillStyle='#000'; g.fillRect(0,0,cv.width,cv.height);
    TT=t;
    if(si<SCN.length){ const [scf,camf]=SCN[si]; let [cx,cy,cz,roll]=camf(u); roll=roll||0; cz*=1+Math.abs(roll)*2; if(WIDE) cz*=0.82; if(WIDE && SCN[si][0]!==scJ5 && SCN[si][0]!==scK){ const room=Math.min(1650-cx,cx+1450); if(room>250) cz=Math.max(cz,(VW/2+4)/(room*1.2)); }   // 16:9: góc quá rộng so với nền → zoom vào vừa đủ để giữ đúng tâm cảnh
      if(SCN[si][0]!==scJ5&&SCN[si][0]!==scK){ const hw=VW/2/cz+4, sl=WIDE?hw*0.17:0, lo=-1450+hw-sl, hi=1650-hw+sl; cx=lo<=hi?clamp(cx,lo,hi):clamp(cx,hi,lo); }   // không lia quá mép nền vẽ sẵn (16:9 góc quá rộng: canh giữa nền)
      shake*=0.86; const ox=(Math.random()-0.5)*shake, oy=(Math.random()-0.5)*shake;
      g.setTransform(1,0,0,1,0,0); if(roll){ g.translate(SC_*VW/2,SC_*VH/2); g.rotate(roll); g.translate(-SC_*VW/2,-SC_*VH/2); }   // 🎥 góc máy nghiêng (dutch angle)
      g.transform(SC_*cz,0,0,SC_*cz,SC_*(VW/2-cx*cz+ox),SC_*(VH/2-cy*cz+oy));
      const red=si===SI.N?1-seg(u,0.6,3.5):1;
      g.fillStyle='#0d0709'; g.fillRect(-9000,-9000,18000,18000);   // 16:9: phần vượt ra ngoài nền vẽ sẵn → tối, không đen kịt
      if(window._cineBG) window._cineBG.draw(g,t,red);
      for(const [x0,x1] of [[1250,1650],[-1050,-1450]]){ const gr=g.createLinearGradient(x0,0,x1,0); gr.addColorStop(0,'rgba(13,7,9,0)'); gr.addColorStop(1,'rgba(13,7,9,1)'); g.fillStyle=gr; g.fillRect(Math.min(x0,x1),-9000,Math.abs(x1-x0),18000); }   // 16:9: mép nền vẽ sẵn mờ dần vào bóng tối (không lộ vết cắt)
      if(red>0.5 && si<SI.M && (Math.sin(t*17)>0.94 || Math.random()<0.01)){ g.fillStyle=`rgba(255,40,40,${0.1*red})`; g.fillRect(-1500,-1500,3500,GROUND+1500); bolt(cx-300+Math.random()*600,-800,cx-200+Math.random()*400,GROUND-160,4,0.8,'255,40,40','255,210,210'); }
      scf(u,t);
      for(let i=parts.length-1;i>=0;i--){ const p=parts[i]; if(!paused){ p.x+=p.vx*spd; p.y+=p.vy*spd; p.vx*=1-0.04*spd; p.vy=p.vy*(1-0.04*spd)+(p.k==='spark'||p.k==='rock'?0.25:-0.02)*spd; p.l-=spd; } if(p.l<=0){ parts.splice(i,1); continue; }
        if(p.k==='dust'){ g.fillStyle=`rgba(${p.c},${0.35*p.l/p.L})`; g.beginPath(); g.arc(p.x,p.y,p.r*(1.6-p.l/p.L),0,Math.PI*2); g.fill(); }
        else if(p.k==='rock'){ g.fillStyle=`rgb(${p.c})`; g.fillRect(p.x,p.y,p.r,p.r); }
        else { g.fillStyle=`rgba(${p.c},${p.l/p.L})`; g.fillRect(p.x,p.y,2.6,2.6); } }
      if(parts.length>700) parts.splice(0,parts.length-700);
      if(window._cineBG) window._cineBG.drawFront(g,t,red); }
    // ═════ lớp phủ màn hình ═════
    g.setTransform(SC_,0,0,SC_,0,0);
    if(si===SI.END){ if(WIDE){ g.fillStyle=`rgba(0,0,0,${seg(u,0,0.7)})`; g.fillRect(0,0,VW,VH); ins(()=>endCard(u)); } else endCard(u); }
    if(t<0.8){ g.fillStyle=`rgba(0,0,0,${1-t/0.8})`; g.fillRect(0,0,VW,VH); }
    for(const b of [SC[2],SC[SI.P],SC[SI.L]]){ const d=Math.abs(t-b); if(d<0.1){ g.fillStyle=`rgba(0,0,0,${1-d/0.1})`; g.fillRect(0,0,VW,VH); } }   // chuyển phần: chớp đen rất nhanh
    if(si===SI.H && u>=3.0 && u<3.04){ g.fillStyle=`rgba(255,255,255,${0.8*(1-seg(u,3.0,3.04))})`;   // slow-mo kéo dài chớp → rút ngắn lại
      g.fillRect(0,0,VW,VH); }
    if(si===SI.L && u>=2.7 && u<2.73){ g.fillStyle='rgba(255,240,240,0.8)'; g.fillRect(0,0,VW,VH); }
    animeFX(t);
    const bar=si===SI.END?0:Math.round(VH*0.06); g.fillStyle='#000'; g.fillRect(0,0,VW,bar); g.fillRect(0,VH-bar,VW,bar);
    if(!OFF) musTick(R,t);
    markOnly=false;
    if(panel&&!OFF) panel.update();
  }
  let SC_=2;
  const curT=()=>Math.min(paused?pauseT:(performance.now()-t0)/1000,DURR);
  function seek(sec){ sec=clamp(sec,0,DURR); try{ stopAllLongSfx(); }catch(e){} parts=[]; played={}; markOnly=true; if(paused) pauseT=sec; else t0=performance.now()-sec*1000; }
  function toggle(){ if(paused){ if(pauseT>=DURR-0.05) pauseT=0; t0=performance.now()-pauseT*1000; paused=false; } else { pauseT=curT(); paused=true; } }
  function stop(){ if(raf) cancelAnimationFrame(raf); raf=null; musStop(); try{ stopAllLongSfx(); }catch(e){} if(window._cinePanelRemove) _cinePanelRemove(); panel=null; if(overlay) overlay.remove(); overlay=null; }
  function setFormat(wide){ WIDE=!!wide; VW=WIDE?960:540; VH=WIDE?540:960; }
  window._cineWar=function(opts){
    if(overlay) return;
    setFormat(opts&&opts.wide);
    overlay=document.createElement('div');
    overlay.style.cssText='position:fixed;inset:0;z-index:99999;background:#000;display:flex;align-items:center;justify-content:center;';
    cv=document.createElement('canvas'); cv.width=WIDE?1920:1080; cv.height=WIDE?1080:1920; SC_=cv.width/VW;
    cv.style.cssText=WIDE?'width:100vw;max-height:100vh;aspect-ratio:16/9;object-fit:contain;':'height:100vh;max-width:100vw;aspect-ratio:9/16;object-fit:contain;';
    g=cv.getContext('2d');
    overlay.appendChild(cv); document.body.appendChild(overlay);
    if(window._cinePanelMake && !(opts&&opts.offline)) panel=_cinePanelMake(overlay,{ title:'Memes Assemble II'+(WIDE?' (16:9)':''), dur:()=>DURR, t:curT, playing:()=>!paused && curT()<DURR,
      toggle:()=>{ if(!paused && curT()>=DURR) seek(0); else toggle(); }, seek, replay:()=>{ paused=false; setup(); seek(0); markOnly=false; }, close:()=>{ stop(); if(window.openCinema) openCinema(); } });
    try{ stopAllBattleMusic(); }catch(e){}
    try{ window._cineBG && window._cineBG.prepare && window._cineBG.prepare(); }catch(e){}
    if(opts&&opts.offline){ OFF={R:0}; paused=false; setup(); return; }   // 🎞️ chế độ xuất video: không tiếng, không chạy theo đồng hồ
    paused=false; setup(); musSetup(); t0=performance.now(); raf=requestAnimationFrame(frame);
  };
  // 🎞️ XUẤT VIDEO: vẽ đúng khung ở thời điểm thật R (giây) — bước nhỏ 1/60s để hạt/rung chạy đúng nhịp như lúc xem
  window._cineWarStep=R=>{ if(!OFF) return; OFF.R=R; frame(0); };
  window._cineWarInfo=()=>({dur:DURR, sfx:SFX.map(([ts,k,v,d])=>[c2r(ts),k,v==null?1:v,d||0]), mus:MUS_DEF.map(m=>({...m,ra:c2r(m.a),rb:c2r(Math.min(m.b,DUR))})), slow:SLOW.map(([a,b,f])=>[c2r(a),c2r(b)])});
  window._cineWarStop=stop;
  window._cineWarPause=t=>{ paused=true; pauseT=c2r(t); parts=[]; };   // t = thời gian phim
  window._cineWarCanvas=()=>cv;
})();
