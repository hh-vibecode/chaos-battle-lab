// ===================== 🎬 CINEMATIC "MEMES ASSEMBLE — PART II: THE WAR OF EVIL GARY" =====================
// Dựng theo BRIEF GỐC của user (3 phần, ~70s, gần như không có chữ — chỉ màn kết). Lớp phủ riêng 1080×1920 như phần 1,
// dùng chung nền js/cine-bg.js. Mở từ Meme Cinema (playCineWar trong game.js tải file này khi cần). Bố cục xem mục BỐ CỤC.
(function(){
  if(window._cineWar) return;
  const VW=540, VH=960, GROUND=560;
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
    angel:av('holycat','rageAvatarUrl'), friend:av('friend','skill4AvatarUrl'), grin:A('assets/img/friend/FR_GRIN_IMG.webp'),   // 👀😁 grin = chỉ đôi mắt + hàm răng của Friend (đã gỡ viền mặt) berserk:av('berserkcat'), berserkAtk:av('berserkcat','attackAvatarUrl'),
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
  function shadowHand(pose,bx,by,wx,wy,k,a,mir){ const im=IMG.hand[pose], m=HM[pose]; if(!im||!im.naturalWidth||a<=0.01) return; const ang=Math.atan2(wy-by,wx-bx);
    g.save(); g.globalAlpha=a; g.lineCap='round'; const L=Math.hypot(wx-bx,wy-by), nx=-(wy-by)/(L||1), ny=(wx-bx)/(L||1), w0=m.h*k*0.55, w1=m.h*k*0.32;
    g.fillStyle='#050208'; g.beginPath(); g.moveTo(bx+nx*w0,by+ny*w0); g.quadraticCurveTo((bx+wx)/2+nx*w1*1.3,(by+wy)/2+ny*w1*1.3,wx+nx*w1,wy+ny*w1); g.lineTo(wx-nx*w1,wy-ny*w1); g.quadraticCurveTo((bx+wx)/2-nx*w1*1.1,(by+wy)/2-ny*w1*1.1,bx-nx*w0,by-ny*w0); g.closePath(); g.fill();
    g.translate(wx,wy); g.rotate(ang); g.scale(k,k*(mir||1)); g.drawImage(im,-8,-m.wy,m.w,m.h); g.restore(); }
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
  const SC=[0,4.5,8.5,11.5,16,22.5,27.5,31,38,44,50.5,58,68,76.5,81.5,88.5,92,98.5];
  const SI={H:4,P:5,J1:7,K:12,L:13,M:14,N:15,END:16};
  const DUR=SC[SC.length-1];
  // 🎞️ SLOW-MOTION kiểu anime ở các cú đánh: [bắt đầu, kết thúc (thời gian phim), tốc độ] — đoạn đó chạy chậm lại, phim dài ra tương ứng
  const SLOW=[[8.38,8.62,0.3],[13.72,14.0,0.3],[18.98,19.3,0.3],[29.48,29.7,0.35],[32.98,33.25,0.25],[35.83,36.1,0.25],[43.4,43.6,0.4],[46.38,46.7,0.25],[52.8,53.1,0.22],[54.7,54.95,0.35],[62.98,63.12,0.35],[65.48,65.8,0.25],[72.78,73.0,0.3],[79.18,79.4,0.3],[83.88,84.1,0.3]];
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
  const camA=u=>keys(u,[[0,460,740,0.46],[4.5,500,760,0.54]]);

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

  // ═════════ C — EVIL GARY vs STALIN + CATLER ═════════
  function scC(u,t){ const gx=760, gy=870, sx=470, cx0=370;
    chaosSouls(t,10,gx,gy-150,260,140);
    addGlow(gx,gy-60,200,0.4+0.1*Math.sin(t*9),'255,30,30');
    // búa ném vào khiên đỏ rồi bay về · Catler vồ lửa bị thổi bật lại · đấu sét xanh vs tia đỏ
    const th=seg(u,0.1,0.6), ret=seg(u,0.65,1.1), cl=seg(u,1.1,1.65), kb=seg(u,1.65,2.3), beam=seg(u,2.3,3.9), boom=seg(u,3.9,4.0);
    if(u>=0.6 && u<1.0){ const k=seg(u,0.6,1.0); g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle=`rgba(255,60,40,${1-k})`; g.lineWidth=5; g.beginPath(); g.ellipse(gx-70,gy-70,50+30*k,90+30*k,0,0,Math.PI*2); g.stroke(); g.restore(); }
    { const hc=prep(IMG.hammer); let hx, hy; if(u<0.6){ hx=lerp(sx+40,gx-80,th); hy=gy-110-Math.sin(Math.PI*th)*60; } else if(u<1.1){ hx=lerp(gx-80,sx+40,ret); hy=gy-110-Math.sin(Math.PI*ret)*50; } else { hx=sx+35; hy=gy-150-eout(seg(u,2.0,2.3))*40; }
      if(hc){ g.save(); g.translate(hx,hy); g.rotate(u<1.1?u*16:-0.6); g.drawImage(hc.src,hc.sx,hc.sy,hc.sw,hc.sh,-32,-32,64,64*hc.sh/hc.sw); g.restore(); }
      if(u>=0.58 && u<0.66){ shake=10; sparks(gx-80,gy-110,24,'255,120,80',7); }
      if(beam>0 && boom<=0){ const mid=lerp(sx+35,gx-30,0.5+0.15*Math.sin(t*7)); bolt(hx,hy,mid,gy-140,3.4,1,'150,210,255'); bolt(hx,hy,mid,gy-140,2,0.8,'150,210,255');
        g.save(); g.globalCompositeOperation='lighter'; for(const [lw,al] of [[26,0.25],[10,0.7],[3,1]]){ g.strokeStyle=`rgba(255,50,40,${al})`; g.lineWidth=lw; g.beginPath(); g.moveTo(gx-30,gy-90); g.lineTo(mid,gy-140); g.stroke(); } g.restore();
        addGlow(mid,gy-140,90+20*Math.sin(t*30),0.9,'255,230,240'); if(Math.random()<0.7) sparks(mid,gy-140,4,Math.random()<0.5?'150,210,255':'255,90,70',6); } }
    if(u>=3.9 && u<3.98){ shake=24; } if(u>=3.9) impact(lerp(sx+35,gx-30,0.5),gy-140,seg(u,3.9,4.4),240);
    const push=eout(seg(u,3.9,4.4));
    shadow(gx,gy,55); actor(IMG.egary,gx+push*30,gy,135,{glow:'rgba(255,0,0,0.85)',gb:22,rot:Math.sin(t*14)*0.02});
    shadow(sx,gy,55); actor(IMG.stalin,sx-push*30,gy,150,{rot:beam>0?-0.06:0});
    const cX=cl<1?lerp(cx0,gx-120,eio(cl)):lerp(gx-120,cx0-20,eout(kb)), cY=gy+10-Math.sin(Math.PI*cl)*120*(cl<1?1:0)-Math.sin(Math.PI*kb)*60;
    shadow(cX,gy+10,40); actor(IMG.catler,cX,cY,110,{rot:cl<1?0.3*cl:-0.4*Math.sin(Math.PI*kb)});
    if(cl>0.85 && cl<1){ addGlow(gx-70,gy-60,90,0.9,'255,140,40'); sparks(gx-70,gy-60,6,'255,150,40',5); }
    if(u>=1.62 && u<1.7){ shake=12; ring(gx-60,gy-60,40,1,'255,60,40',8,1); } if(u>=1.65) impact(gx-80,gy-60,seg(u,1.65,2.0),150);
  }
  const camC=u=>keys(u,[[0,600,770,1.0],[3.8,610,760,1.12],[4,610,760,1.0]]);

  // ═════════ D — SPIDER CAT lướt cắt qua bầy quái ═════════
  function scD(u,t){ const k=seg(u,0.2,2.6), x=lerp(-250,1050,eio(k)), y=800;
    for(let i=0;i<8;i++){ const mx=-60+i*130, my=y+((i%2)*70)-20, pass=(mx+250)/1300, hit=seg(eio(k),pass,pass+0.001), cut=hit>0?seg(u,0.2+pass*2.4,0.2+pass*2.4+0.8):0;
      if(cut>0) halves(mx,my,110,false,cut,-0.15+((i%3)-1)*0.25); else monster(mx,my,110,false,1,Math.sin(t*3+i)*0.05);
      if(cut>0 && cut<0.25) slash(mx-70,my-50-((i%3)-1)*20,mx+70,my-70+((i%3)-1)*20,1-cut*4,'230,190,255'); }
    if(k>0.05 && k<1){ g.save(); g.lineCap='round'; for(let L=0;L<5;L++){ const off=(L-2)*16, P=[]; for(let s=0;s<16;s++) P.push([x-s*36, y-55+off+(Math.random()-0.5)*10]);
      for(const [lw,c,cmp] of [[12,'rgba(150,60,255,0.2)','lighter'],[5,'rgba(220,170,255,0.9)','lighter'],[2,'rgba(5,0,10,1)','source-over']]){ g.globalCompositeOperation=cmp; g.strokeStyle=c; g.lineWidth=lw*(1-L*0.08); g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); } } g.restore(); }
    actor(IMG.spider,x,y,115,{rot:0.22}); }
  const camD=u=>[lerp(-40,820,eio(seg(u,0.2,2.6))),730,1.05];

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
  const camH=u=>keys(u,[[0,300,760,0.95],[2.9,280,780,1.15],[3.0,330,820,0.95],[4.0,330,820,0.98],[6.5,330,800,0.88]]);

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
  const BEV=[[TJ1+0.45,-700,500,-100,0.5,0],[TJ1+2.05,200,900,400,0.5,1],[TJ1+3.5,-1300,-100,-200,0.7,0],[TJ3+2.45,-1800,2800,150,0.8,0]];
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
    actor(IMG.gigaBig,gX,gY,1000,{flip:true,rot:gR,sx:1+0.07*pn*(1-st)});
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
    const gx=150+(hit?Math.sin(t*41)*4:0);
    if(hit){ g.save(); g.fillStyle='rgba(10,4,4,0.55)'; g.beginPath(); g.ellipse(gx,GY+6,700*eout(pk),90*eout(pk),0,0,Math.PI*2); g.fill(); g.restore(); cracks(gx,GY,pk,1300,9); }   // mặt đất lún + nứt toác
    actor(IMG.gigaBig,gx,GY+sink*0.5,1000,{flip:true,sy:1-0.05*hold,sx:1+0.03*hold});
    if(fall<1) windRings(bx,by,BR,t,1);
    bijuu(bx,by,BR,t,lerp(1,0.35,pk));
    if(hit){ const k=pk; g.save(); g.globalCompositeOperation='lighter'; glow(BC.x,-75+sink,lerp(200,700,eout(k)),0.9*(1-k*0.6),'255,230,200'); g.restore();
      impact(BC.x,-75,seg(u,2.4,2.9),700);   // vạch áp lực toả ra
      dustWall(gx,GY,lerp(300,2600,eout(seg(u,2.45,4.4))),0.85*(1-seg(u,3.6,4.8)));
      if(u<2.47){ shake=48; sparks(BC.x,-75,80,'255,230,200',18); }
      if(Math.random()<0.6) sparks(BC.x+(Math.random()-0.5)*300,-90,4,'255,200,160',9); if(u<4.5) shake=Math.max(shake,5); }
    skyline(t,hit&&u<3.4?10:0,false);
    // 👀 tiền cảnh: các meme ngước nhìn lên — áp lực ập tới thì lấy tay che, bị đẩy lùi
    if(u<1.7) J3M.forEach((k,i)=>{ const x=-470+i*120+(i%2)*25, y=735+(i%3)*18, tr=Math.sin(t*30+i)*(fall>0.4?2:0);   // cận: ngước nhìn quả cầu
      shadow(x,y,60,0.4); actor(j3im(k),x+tr,y,330+(i%3)*30,{flip:flipTo(k,x<gx),rot:-0.07}); });
    else J3M.forEach((k,i)=>{ const side=i%2?1:-1, x0=gx+side*(560+Math.floor(i/2)*150), d=Math.abs(x0-gx), push=hit?eout(seg(u,2.45+d/2600,3.3+d/2600))*side*260:0, x=x0+push;   // toàn cảnh: đứng quanh chân Giga, bị áp lực đẩy bật ra
      shadow(x,GY,26,0.4); actor(j3im(k),x,GY,105,{flip:flipTo(k,side<0),rot:hit?side*0.3*Math.sin(Math.PI*seg(u,2.45+d/2600,3.3+d/2600)):0}); });
    if(fall<1){ g.save(); g.globalCompositeOperation='lighter'; glow(bx,by+BR,900,0.2*fall,'255,120,60'); g.restore(); }   // ánh đỏ hắt xuống mặt mọi người
  }
  const camJ3=u=>keys(u,[[0,140,-320,0.4,0.06],[1.5,140,-300,0.42,0.03],[1.7,180,-80,0.36,0],[2.33,180,-60,0.33,0],[2.45,190,-150,0.45,-0.06],[3.3,180,40,0.31,0],[5,190,80,0.35,0.04],[6.5,200,20,0.4,0]]);

  // ── J4: 2 KIẾM SĨ — Joninn + Berserk ngước lên, bật nhảy vút lên đỉnh quả bom, quay mặt chém xuống (xanh + đỏ) → đáp đất QUAY LƯNG lại quả bom →
  //        quả bom tách đôi theo nhát chém → NỔ TUNG trên trời, mây bị xẻ rãnh + thổi bạt → 2 kiếm sĩ quay mặt lại nhìn ──
  const SL={ax:BC.x+600, ay:BC.y-540, bx:BC.x-600, by:BC.y+540};   // đường chém (trên-phải → dưới-trái)
  function scJ4(u,t){
    const lp=seg(u,0.9,2.0), hang=u>=2.0&&u<2.3, dsh=eio(seg(u,2.3,2.55)), fl=seg(u,2.55,3.3), split=eout(seg(u,3.6,4.2)), ex=seg(u,4.2,7.3), turn=seg(u,4.45,4.6);
    const dx=SL.bx-SL.ax, dy=SL.by-SL.ay, L=Math.hypot(dx,dy), nx=dy/L, ny=-dx/L;
    skyHigh(); mountains(t); skyline(t,0,true);
    cloudSea(-1100,t,0.85,{hole:ex<0.3?{x:BC.x,y:BC.y,r:BR*1.5}:null, cut:u>=2.45?{x:BC.x,y:BC.y,nx,ny,w:lerp(0,170,eout(seg(u,2.45,3.4)))}:null, blow:ex>0?{x:BC.x,y:BC.y,r:3200*eout(ex)}:null, lit:ex>0?lerp(1,0.35,ex):0.35});
    sealGround(0.22,t);
    // 💪 Giga vẫn gồng đỡ → bom nổ thì khuỵu xuống rồi gượng dậy
    const knee=eout(seg(u,4.2,4.6))*(1-eio(seg(u,5.8,7.2)));
    actor(IMG.gigaBig,150+(ex<=0?Math.sin(t*41)*4:0),GY+(ex<=0?70:70*(1-seg(u,4.2,5))),1000,{flip:true,sy:(ex<=0?0.95:1)-0.12*knee,rot:-0.08*knee});
    // 🟣 quả bom: nguyên → vết cắt sáng → tách đôi (2 nửa trượt ra, lòng trong loá sáng) → nổ
    if(ex<0.06){ const sep=split*130, al=1-seg(ex,0,0.06);
      if(split<=0) bijuu(BC.x,BC.y,BR,t,0.35);
      else for(const s of [-1,1]){ g.save(); g.globalAlpha=al; g.beginPath(); const E2=4000; g.moveTo(BC.x-dx/L*E2,BC.y-dy/L*E2); g.lineTo(BC.x+dx/L*E2,BC.y+dy/L*E2); g.lineTo(BC.x+dx/L*E2+nx*s*E2,BC.y+dy/L*E2+ny*s*E2); g.lineTo(BC.x-dx/L*E2+nx*s*E2,BC.y-dy/L*E2+ny*s*E2); g.closePath(); g.clip(); g.translate(nx*s*sep,ny*s*sep); bijuu(BC.x,BC.y,BR,t,0.35); g.restore(); }
      if(u>=2.45){ g.save(); g.beginPath(); g.arc(BC.x,BC.y,BR+split*130,0,Math.PI*2); g.clip(); g.globalCompositeOperation='lighter'; g.lineCap='round';
        g.shadowColor='rgba(255,220,180,1)'; g.shadowBlur=30+split*90; for(const [lw,a] of [[5+split*26,0.55],[2+split*8,1]]){ g.strokeStyle=`rgba(255,250,240,${a})`; g.lineWidth=lw; g.beginPath(); g.moveTo(SL.ax,SL.ay); g.lineTo(SL.bx,SL.by); g.stroke(); }   // khe cắt phát sáng mềm
        g.restore(); } }
    skyBlast(BC.x,BC.y,ex);
    if(u>=4.2&&u<4.27){ shake=50; sparks(BC.x,BC.y,90,'255,230,200',22); }
    if(ex>0&&ex<0.5&&Math.random()<0.7) for(let q=0;q<2;q++){ const a=Math.random()*Math.PI*2; parts.push({k:'spark',x:BC.x+Math.cos(a)*200,y:BC.y+Math.sin(a)*200,vx:Math.cos(a)*22,vy:Math.sin(a)*22,l:50,L:50,c:'255,190,120'}); }   // tàn lửa văng
    skyline(t,0,false);
    // ⚔️ 2 kiếm sĩ
    const A=[[650,GY,IMG.joninn,IMG.joninnR,'samuraicheems','110,200,255',-1],[770,GY,IMG.berserk,IMG.berserkAtk,'berserkcat','255,60,60',1]];
    A.forEach(([sx,sy,im,im2,k,c,o],j)=>{ const off=o*55, ax=SL.ax+nx*off, ay=SL.ay+ny*off, ex2=SL.bx+nx*off, ey2=SL.by+ny*off, lx=-650+j*130, h=lerp(110,150,lp>0?1:0);
      let x,y,rot=0, img=u>0.5?im2:im, faceR=false;
      if(u<0.9){ x=sx; y=sy-(u>0.7?ein(seg(u,0.7,0.9))*-0:0); }
      else if(u<2.0){ const q=eout(lp), cx=sx-150, cy=-1700; x=(1-q)*(1-q)*sx+2*(1-q)*q*cx+q*q*ax; y=(1-q)*(1-q)*sy+2*(1-q)*q*cy+q*q*ay; rot=-0.5*Math.sin(Math.PI*lp); }
      else if(u<2.3){ x=ax; y=ay+Math.sin(t*5+j)*8; rot=-0.35; }
      else if(u<2.55){ x=lerp(ax,ex2,dsh); y=lerp(ay,ey2,dsh); rot=-0.75; }
      else if(u<3.3){ const q=ein(fl); x=lerp(ex2,lx,q); y=lerp(ey2,GY,q); rot=-0.3*(1-q); }
      else { x=lx; y=GY; faceR=turn>0.5; }
      if(u>=3.3&&u<3.36&&j===0){ dust(lx+60,GY,14,180); }
      const sq=u>=4.45&&u<4.6?Math.max(0.08,Math.abs(Math.cos(Math.PI*turn))):1;
      if(hang){ g.save(); g.globalCompositeOperation='lighter'; glow(x,y-h*0.5,h*1.6,0.55,c); g.restore(); if(Math.sin(t*20+j*3)>0.6) addGlow(x+(faceR?1:-1)*h*0.5,y-h*0.55,22,1,'255,255,255'); }   // tụ lực + loé lưỡi kiếm
      if(u>=2.3&&u<2.55) for(let q=1;q<6;q++) actor(img,lerp(ax,ex2,Math.max(0,dsh-q*0.05)),lerp(ay,ey2,Math.max(0,dsh-q*0.05)),h,{a:0.3-q*0.05,flip:flipTo(k,false),rot});
      if(u>=3.3) shadow(x,GY,h*0.35,0.4);
      actor(img,x,y,h,{flip:flipTo(k,faceR),rot,sx:sq});
      if(u>=2.3) slashArc(ax,ay,ex2,ey2,Math.min(1,dsh*1.02),j?70:-70,c,1-seg(u,2.7,3.4)); });
  }
  const camJ4=u=>keys(u,[[0,710,830,1.1,0.06],[0.85,710,820,1.25,0.06],[0.95,650,560,0.7,0],[1.5,760,-500,0.5,-0.04],[2.0,SL.ax-120,SL.ay+170,0.62,-0.08],[2.25,SL.ax-130,SL.ay+170,0.78,-0.1],[2.33,BC.x+40,BC.y,0.4,0],[2.6,BC.x-200,BC.y+250,0.36,0.05],[3.3,-580,760,0.9,0],[3.55,-580,760,0.95,0.04],[4.15,-330,380,0.5,0.03],[4.25,-100,0,0.32,0],[4.45,-220,170,0.5,-0.04],[5.0,-220,170,0.52,-0.03],[5.6,-150,250,0.42,0],[7.5,-50,250,0.36,0]]);

  // ── J5: Holy Cat hiện ra CHẶN TRƯỚC MẶT quỷ · Clapping Cat lẳng lặng sau lưng → bật ra vỗ tay → đổi chỗ với CHONKY siêu to → Chonky đè quỷ rơi thẳng xuống đất · chấn động quét sạch xung quanh ──
  function scJ5(u,t){
    const ap=eout(seg(u,0.1,1.3)), jp=seg(u,2.5,3.25), clap=seg(u,4.25,4.8), glw=seg(u,4.8,5.0), swap=u>=5.0, arr=1-seg(u,5.0,5.3), fall=ein(seg(u,6.55,7.5)), imp=seg(u,7.5,9.8), roll=eout(seg(u,8.0,9.2));
    skyHigh(); mountains(t); skyline(t,0,true);
    cloudSea(-650,t,0.8,{hole:{x:QH.x,y:-650,r:750},blow:u>=7.5?{x:SE.x,y:-650,r:2500*eout(imp)}:null});
    sealGround(0.25+0.75*seg(u,7.5,8.5),t);
    const white={filter:'brightness(0) invert(1)'};   // bản trắng tinh của ảnh → loé sáng đúng hình nhân vật (y như lúc vỗ tay đổi chỗ trong game)
    // 🐕 CHONKY siêu to đứng dưới đất (trước khi bị đổi chỗ)
    const GCX=-250;
    if(!swap){ actor(IMG.chonky,GCX,GY,1200,{flip:flipTo('chonkydog',true)}); if(glw>0) actor(IMG.chonky,GCX,GY,1200,{...white,a:glw*0.9,flip:flipTo('chonkydog',true)}); }
    // 😈 quỷ lơ lửng → bị Chonky đè rơi thẳng xuống phong ấn
    const cb=lerp(-1760,250,fall), qyC=u<6.55?QH.y:cb+600;
    if(u<7.5){ addGlow(QH.x,qyC,1100,0.4,'255,40,40'); demonFly(8,lerp(QH.x,SE.x,fall),qyC+Math.sin(t*3)*25*(1-fall),lerp(QH.w,1600,fall),{flip:true,lit:1.6,rot:fall*0.45,sy:1-0.2*fall}); }
    else demon2(0,SE.x,SE.y+60,1500,{flip:true,lit:1.25,rot:-0.05});
    // 😇 Holy Cat CHỞ Clapping Cat trên lưng bay tới chặn trước mặt quỷ
    const hx=lerp(-300,QH.x-570,ap), hy=QH.y-200+Math.sin(t*2)*12-(1-ap)*150, ha=1-seg(u,6.4,7.0);
    if(ap>0 && ha>0){ g.save(); g.globalCompositeOperation='lighter'; glow(hx,hy-150,380,0.6*ap*ha,'255,248,220'); g.restore(); actor(IMG.angel,hx,hy,300,{a:ha}); }
    // 👏 Clapping Cat: ngồi trên lưng Holy Cat → bật nhảy ra lên trên đầu quỷ → VỖ TAY → loé trắng → ĐỔI CHỖ với Chonky
    const RX=hx-30, RY=hy-255, CX1=QH.x+40, CY1=QH.y-1050;
    if(!swap){ let x=RX, y=RY, im=IMG.clapIdle, h=170;
      if(u>=2.5){ const q=eout(jp); x=lerp(RX,CX1,q); y=lerp(RY,CY1,q)-Math.sin(Math.PI*jp)*260; h=lerp(170,240,jp); im=jp<1?IMG.clapUp:IMG.clapIdle; }
      if(clap>0) im=IMG.clap[Math.min(2,Math.floor(clap*3))];
      if(u>=2.5){ g.save(); g.globalCompositeOperation='lighter'; glow(x,y-h*0.5,h*1.3,0.4,'255,190,120'); g.restore(); }
      actor(im,x,y,h,{}); if(glw>0){ actor(im,x,y,h,{...white,a:glw}); addGlow(x,y-h*0.5,h*1.5*glw,0.8*glw,'255,255,255'); } }
    // 🌀 ĐỔI CHỖ: vệt nhoè + vạch tốc độ ở cả 2 chỗ
    if(u>=5.0&&u<5.35){ const k=seg(u,5.0,5.35);
      for(const [px,py,c] of [[CX1,CY1-120,'255,255,255'],[GCX,GY-500,'255,255,255']]){ g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round';
        for(let i=0;i<16;i++){ const yy=py+(hash(i+800)-0.5)*500, L=200+hash(i+801)*500; g.strokeStyle=`rgba(${c},${0.55*(1-k)})`; g.lineWidth=2+hash(i+802)*4; g.beginPath(); g.moveTo(px-L*0.5-k*200,yy); g.lineTo(px+L*0.5-k*200,yy); g.stroke(); }
        glow(px,py,500*(1-k)+150,0.8*(1-k),c); g.restore(); } }
    // 🐕 CHONKY hiện ra trên trời ngay trên đầu quỷ → đè xuống → hất văng ra lăn sang bên
    if(swap && u<9.6){ const x=u<7.5?lerp(CX1,SE.x,fall):lerp(SE.x,380,roll), y=u<7.5?(u<6.55?-1760+Math.sin(t*2)*10:cb):lerp(250,GY,roll)-Math.sin(Math.PI*roll)*600, h=u<7.5?1700:lerp(1700,1100,roll), o={flip:flipTo('chonkydog',true),rot:u<7.5?fall*0.15:-0.4*Math.sin(Math.PI*roll),a:1-seg(u,9.1,9.6)};
      actor(IMG.chonky,x,y,h,o); if(arr>0) actor(IMG.chonky,x,y,h,{...o,...white,a:arr});
      if(fall>0&&fall<1) for(let k=1;k<5;k++) actor(IMG.chonky,x,y-k*170*fall,h,{...o,a:0.18-k*0.035}); }
    // 👏 Clapping Cat rơi xuống đúng chỗ Chonky vừa đứng — vỗ tay khoái chí
    if(swap){ g.save(); g.globalCompositeOperation='lighter'; glow(GCX,GY-120,260,0.45,'255,190,120'); g.restore(); }   // ánh ấm để thấy rõ con mèo đen trên nền tối
    if(swap){ const ci=u<6.0?0:Math.floor(t*8)%3; actor(u<6.0?IMG.clapUp:IMG.clap[ci],GCX,GY,230,{}); if(arr>0) actor(IMG.clapUp,GCX,GY,230,{...white,a:arr}); }
    // 💥 CHẤN ĐỘNG khổng lồ
    if(u>=7.5&&u<7.58){ shake=60; sparks(SE.x,SE.y-100,90,'255,220,180',20); rocks(SE.x,SE.y,40,0); }
    if(imp>0&&imp<1){ g.save(); g.globalCompositeOperation='lighter'; glow(SE.x,SE.y-150,lerp(300,1400,eout(imp)),0.9*(1-imp),'255,235,210'); g.restore();
      dustWall(SE.x,SE.y,lerp(250,3600,eout(imp)),0.95*(1-seg(imp,0.5,1))); cracks(SE.x,SE.y,imp,1500,13); }
    if(u>=6.55&&u<7.5) dust(lerp(CX1,SE.x,fall),cb,1,200);
    skyline(t,u>=7.5&&u<8.1?16:0,false);
  }
  const camJ5=u=>{ const hx=QH.x-570, hy=QH.y-200; return keys(u,[[0,300,-1250,0.55,0.04],[1.3,hx+250,hy-120,0.62,0.05],[1.7,hx+200,hy-120,0.66,0.05],[1.75,hx-20,hy-260,1.15,-0.06],[2.45,hx-20,hy-260,1.25,-0.07],[2.55,hx+250,hy-450,0.6,-0.03],[3.25,QH.x+40,QH.y-1000,0.62,0],[3.3,-250,380,0.42,0.04],[4.2,-250,320,0.46,0.04],[4.25,QH.x+40,QH.y-1180,0.95,-0.05],[4.95,QH.x+40,QH.y-1180,1.05,-0.06],[5.0,QH.x+40,QH.y-1300,0.75,0],[5.9,QH.x,QH.y-950,0.32,0.03],[6.0,-250,780,0.9,0],[6.5,-250,780,0.95,0],[6.55,QH.x+50,-1500,0.32,0],[7.45,1080,300,0.3,0.03],[7.55,1120,420,0.38,-0.06],[8.5,1050,350,0.32,0],[10,1100,450,0.4,0]]); };

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
  function scK(U,t){ const rise=seg(U,0,1.6), bind=eout(seg(U,0.9,2.4)), dome=eout(seg(U,1.3,2.9)), u=U-1.5;
    const on=seg(u,0,1.4), ang=eout(seg(u,1.8,3.0)), col=seg(u,2.9,3.3), hole=eio(seg(u,3.4,4.2)), sink=ein(seg(u,3.8,6.0)), shut=seg(u,6.0,6.6), fade=1-seg(u,6.4,7.0);
    // vòng phong ấn phối cảnh (vòng + chữ rune + ngôi sao 6 cánh), sáng theo nhạc
    g.save(); g.translate(SE.x,SE.y); g.scale(1,SE.ry/SE.rx); g.globalCompositeOperation='lighter'; const al=(0.35+0.65*on)*fade, beat=0.8+0.2*Math.sin(t*12);
    for(const [r,lw] of [[SE.rx,6],[SE.rx*0.93,2.5],[SE.rx*0.62,4]]){ g.strokeStyle=`rgba(130,215,255,${al*beat})`; g.lineWidth=lw; g.beginPath(); g.arc(0,0,r,0,Math.PI*2); g.stroke(); }
    g.save(); g.rotate(t*0.4); g.font='700 34px serif'; g.fillStyle=`rgba(180,235,255,${al})`; for(let i=0;i<28;i++){ g.save(); g.rotate(i/28*Math.PI*2); g.fillText(['♪','ᚱ','♫','ᛟ','ᚢ','♩','ᛖ'][i%7],SE.rx*0.75,10); g.restore(); } g.restore();
    g.save(); g.rotate(-t*0.7); g.strokeStyle=`rgba(120,200,255,${al})`; g.lineWidth=4; for(const o of [0,Math.PI/3]){ g.beginPath(); for(let i=0;i<=3;i++){ const a=o+i*Math.PI*2/3; i?g.lineTo(Math.cos(a)*SE.rx*0.62,Math.sin(a)*SE.rx*0.62):g.moveTo(Math.cos(a)*SE.rx*0.62,Math.sin(a)*SE.rx*0.62); } g.stroke(); } g.restore();
    if(hole>0){ g.globalCompositeOperation='source-over'; const r=SE.rx*0.62*hole*(1-shut); const gr=g.createRadialGradient(0,0,0,0,0,Math.max(1,r)); gr.addColorStop(0,'#000'); gr.addColorStop(0.75,'#1a0000'); gr.addColorStop(1,'rgba(255,70,20,0.9)'); g.fillStyle=gr; g.beginPath(); g.arc(0,0,Math.max(0,r),0,Math.PI*2); g.fill(); }
    g.restore();
    // 😈 quỷ gượng dậy (bò → chống → đứng) → bị trói → chìm qua cổng địa ngục
    const fr=U<0.5?0:U<1.0?3:U<1.5?4:5, tr=rise<1?Math.sin(t*23)*5:0;
    if(sink<1){ g.save(); g.beginPath(); g.rect(-2000,-2000,5000,SE.y-10+2000); g.ellipse(SE.x,SE.y,SE.rx*0.62*hole,SE.ry*0.62*hole,0,0,Math.PI*2); g.clip();
      demon2(fr,SE.x+tr+Math.sin(t*9)*6*bind*(1-sink),SE.y+30+sink*1100,1500*(1-sink*0.15),{lit:1.25,rot:Math.sin(t*3.3)*0.04}); g.restore();
      lightBind(SE.x,SE.y-420+sink*900,bind,1-sink,t); }
    barrier(dome,fade,t);
    // 4 meme âm nhạc ở 4 góc phong ấn, tuôn nhạc vào tâm + cột sáng dựng kết giới
    const C4=[[SE.x-SE.rx*0.92,SE.y-SE.ry*0.75,IMG.piano,'255,230,120',105],[SE.x+SE.rx*0.92,SE.y-SE.ry*0.75,IMG.guitar,'255,90,90',105],[SE.x-SE.rx*0.9,SE.y+SE.ry*0.85,IMG.bongo,'255,200,120',130],[SE.x+SE.rx*0.9,SE.y+SE.ry*0.85,IMG.mosq,'255,80,140',125]];
    C4.forEach(([x,y,im,c,h],i)=>{ addGlow(x,y-h*0.4,h*0.9,0.45*fade,c); shadow(x,y,h*0.3,0.4); actor(im,x,y-(i===3?40+Math.sin(t*3)*8:0),h,{flip:i===3});
      if(dome>0&&dome<1){ g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle=`rgba(${c},${0.5*(1-dome)})`; g.lineWidth=5; g.beginPath(); g.moveTo(x,y-h*0.5); g.lineTo(SE.x,SE.y-980*dome); g.stroke(); g.restore(); }
      if(on>0 && fade>0.05) for(let q=0;q<4;q++){ const f=(t*0.9+q/4+i*0.13)%1, px=lerp(x,SE.x,f), py=lerp(y-h*0.5,SE.y-60,f)-Math.sin(f*Math.PI)*90; addGlow(px,py,16,on*fade*(1-f*0.3),c); if(q%2) text(['♪','♫'][q%2?0:1],px,py,22,`rgba(${c},${on*fade})`); } });
    // 😇 Holy Cat trên cao NIỆM CHÚ → thánh giá vàng giáng xuống cắm phập vào quỷ, in dấu xuống phong ấn
    if(ang>0){ const ax=SE.x, ay=lerp(-200,330,ang); addGlow(ax,ay-80,280,0.6*ang*fade,'255,250,225');
      const form=eout(seg(u,2.15,2.9)), drop=ein(col), land=u>=3.3;
      if(form>0 && fade>0){ const S=lerp(50,150,form)+drop*40, cx=ax, cy=land?SE.y-S*1.25:lerp(ay-230-S,SE.y-S*1.25,drop);
        if(!land){ g.save(); g.globalCompositeOperation='lighter'; for(let q=0;q<16;q++){ const an=q/16*Math.PI*2+t*0.6, L=S*(2.4+0.5*Math.sin(t*5+q)); g.strokeStyle=`rgba(255,235,170,${0.22*form*fade})`; g.lineWidth=4; g.beginPath(); g.moveTo(cx+Math.cos(an)*S*0.9,cy+Math.sin(an)*S*0.9); g.lineTo(cx+Math.cos(an)*L,cy+Math.sin(an)*L); g.stroke(); }
          g.strokeStyle=`rgba(255,230,150,${0.7*form*fade})`; g.lineWidth=4; g.beginPath(); g.arc(cx,cy-S*0.35,S*0.95,0,Math.PI*2); g.stroke(); g.lineWidth=1.5; g.beginPath(); g.arc(cx,cy-S*0.35,S*1.08,0,Math.PI*2); g.stroke();
          g.font=`700 ${Math.round(S*0.16)}px serif`; g.fillStyle=`rgba(255,240,190,${form*fade})`; g.textAlign='center'; for(let q=0;q<12;q++){ const an=q/12*Math.PI*2-t*0.8; g.fillText('✦ᛉ✧ᛟ✦ᚨ'[q%6],cx+Math.cos(an)*S*1.02,cy-S*0.35+Math.sin(an)*S*1.02); } g.restore(); }
        if(land){ g.save(); g.beginPath(); g.rect(-3000,-3000,6000,SE.y+3000-6); g.clip(); }
        holyCross(cx,cy+(land?S*0.35:0),S,form*fade*(land?1-seg(u,5.4,6.4)*0.7:1)); if(land) g.restore();
        if(drop>0 && drop<1) for(let k=1;k<5;k++) holyCross(cx,cy-k*S*0.3,S,0.16*(1-k*0.2)*fade);
        if(land){ const k=seg(u,3.3,3.9); g.save(); g.translate(SE.x,SE.y); g.scale(1,SE.ry/SE.rx); holyCross(0,SE.rx*0.08,SE.rx*0.62*eout(k),0.7*fade,true); g.restore();
          if(u<3.42) shake=26; softShock(SE.x,SE.y,lerp(60,SE.rx*2.2,eout(k)),0.6*(1-k),'255,235,170',SE.ry/SE.rx); addGlow(SE.x,SE.y-80,420,0.85*(1-k)+0.2,'255,240,200'); if(u<3.36){ sparks(SE.x,SE.y-40,40,'255,230,160',12); dust(SE.x,SE.y,30,500); } } }
      actor(IMG.angel,ax,ay,250,{a:ang*fade}); }
    if(u>=6.5 && u<6.58) shake=16; if(u>=6.5) addGlow(SE.x,SE.y,500*seg(u,6.5,7)+100,1-seg(u,6.5,7),'255,255,255'); }
  const camK=u=>keys(u,[[0,SE.x,560,0.55,0.03],[1.5,SE.x,520,0.5,0.03],[3.0,SE.x,470,0.48,0],[4.7,SE.x,430,0.5,-0.03],[4.8,SE.x,560,0.7,0.06],[5.3,SE.x,540,0.55,0],[8.5,SE.x,640,0.62,0]]);

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
        for(let i=0;i<9;i++){ const bx=x+W*(0.22+hash(i+30)*0.56), L=flow(w-0.7-hash(i)*0.5,0.8+hash(i)*0.7)*(14+hash(i+3)*60); bloodDrip(bx,y+H*0.9,L,2.6+hash(i+4)*3,1); }   // máu chảy từ răng
        g.restore(); } } }

  const SCN=[[scA,camA],[scC,camC],[scD,camD],[scG,camG],[scH,camH],[scP,camP],[scQ,camQ],[scJ1,camJ1],[scJ2,camJ2],[scJ3,camJ3],[scJ4,camJ4],[scJ5,camJ5],[scK,camK],[scL,camL],[scM,camM],[scN,camN]];
  function keys(u,K){ for(let i=0;i<K.length-1;i++){ const a=K[i], b=K[i+1]; if(u>=a[0] && u<b[0]){ const k=(b[0]-a[0]<0.05)?1:eio((u-a[0])/(b[0]-a[0])); return [lerp(a[1],b[1],k),lerp(a[2],b[2],k),lerp(a[3],b[3],k),lerp(a[4]||0,b[4]||0,k)]; } } const L=K[K.length-1]; return [L[1],L[2],L[3],L[4]||0]; }   // [t, x, y, zoom, nghiêng]
  // 🔊 tiếng (thời điểm tuyệt đối)
  const SFX=[[0.3,'titan_roar',0.5,3],[1.6,'hit_heavy',0.6],[2.9,'holy_thunder',0.6],[3.6,'hit_mid',0.6],
    [5.1,'stalin_hammer_hit',0.9],[6.1,'stalin_hammer_return',0.6],[6.15,'burn_loop',0.5,1],[6.2,'hit_heavy',0.8],[6.8,'holy_thunder',0.8],[6.8,'flyingcat_laser',0.6,2.6],[8.4,'vine_boom',1.0],
    [8.65,'uia_tele_dbz',0.9],[9.28,'death_break',0.5],[9.48,'death_break',0.5],[9.65,'death_break',0.5],[9.81,'death_break',0.5],[9.97,'death_break',0.5],[10.14,'death_break',0.5],[10.31,'death_break',0.5],[10.51,'death_break',0.5],
    [11.7,'cdg_grow',0.9],[13.75,'vine_boom',1.0],[13.75,'creeper_explosion',0.8],[14,'wg_dragon_impact',0.8],
    [16.1,'sm_form',0.6],[19,'sm_schwing',1.0],[19.1,'ninja_slash',0.9],[19.9,'sm_fin',1.0],[20.1,'sm_drip',0.6],[20.1,'death_break',0.8],
    [22.6,'titan_roar',0.7,3],[23.3,'larry_horn',0.6,2],[23.5,'gp_souls',0.7,3],[24.6,'punch1',0.5],[25.2,'fd_roar',0.5,2],[25.8,'punch1',0.5],[26.6,'hit_mid',0.5],
    [28,'vine_boom',0.7],[29.5,'ultimate_charge_2',0.9],[29.9,'gigachad_roar',1.0,2],[29.95,'hit_heavy',1.0],
    [31,'wg_axe_whoosh',0.6],[31.45,'br_boom',1.0],[31.45,'hit_heavy',1.0],[31.5,'creeper_explosion',0.6],[32.45,'titan_roar',0.7,2],[32.72,'gigachad_roar',0.8,1.5],[33,'wg_dragon_impact',1.0],[33,'vine_boom',0.9],[33.05,'creeper_explosion',0.6],[34.2,'wg_axe_whoosh',0.8],[34.45,'hit_heavy',1.0],[34.5,'br_boom',0.7],[35.85,'wg_dragon_impact',1.0],[35.85,'vine_boom',1.0],[35.9,'hit_heavy',1.0],[36.4,'fd_roar',0.9,2.5],
    [38.1,'sc_wing',0.9],[38.6,'sc_wing',0.9],[39,'titan_roar',0.7,2],[39.2,'sc_wing',0.7],[40.6,'gp_souls',0.7,3],[41,'ultimate_charge_2',0.9],[42.6,'holy_thunder',0.4],[43,'vine_boom',0.8],[43.4,'br_boom',0.9],[43.45,'fd_roar',0.7,2],
    [44.1,'thunder_big',0.5,4],[45.6,'gigachad_roar',1.0,2],[46.4,'wg_dragon_impact',1.0],[46.4,'creeper_explosion',1.0],[46.45,'hit_heavy',1.0],[46.5,'br_boom',0.8],[47.8,'titan_roar',0.5,2],
    [51.1,'sm_form',0.7],[51.4,'wg_axe_whoosh',0.8],[52.6,'lightsaber_whoosh_01',0.6],[52.8,'sm_schwing',1.0],[52.8,'sm_slash',1.0],[52.85,'ninja_slash',0.8],[53.9,'sm_fin',0.9],[54.7,'creeper_explosion',1.0],[54.7,'br_boom',1.0],[54.75,'wg_dragon_impact',1.0],[54.8,'thunder_big',0.6,3],
    [58.2,'hl_choir',0.6,2],[60.5,'wg_axe_whoosh',0.6],[61.35,'cdg_grow',0.5],[62.8,'clap_cat',1.0],[63.0,'clap_tele',1.0],[63.4,'titan_roar',0.6,2],[64.05,'clap_cat',0.7],[64.3,'clap_cat',0.7],[64.6,'wg_axe_whoosh',0.8],[65.5,'creeper_explosion',1.0],[65.5,'wg_dragon_impact',1.0],[65.5,'vine_boom',1.0],[65.55,'br_boom',1.0],[65.7,'thunder_big',0.5,3],
    [68.1,'titan_roar',0.5,2],
    [69.5,'piano_giorno',0.55,4],[69.7,'guitar_jojo',0.5,4],[69.9,'tribe_1',0.6,4],[70.1,'mosquito_violin',0.55,4],[71.3,'hl_choir',1.0,5],[72.5,'hl_laser',1.0],[73,'titan_roar',0.8,3],[76,'holy_thunder',1.0],
    [76.8,'sc_terror',0.6],[77.5,'ultimate_charge_2',0.8],[79.2,'vine_boom',1.0],[79.2,'holy_thunder',0.8],[80,'uia_tele_dbz',1.0],
    [82.4,'holy_thunder',0.6],[83.1,'stalin_hammer_return',0.7],[83.65,'hm_claw1',1.0],[83.9,'vine_boom',1.0],[84.1,'hm_stalker',0.9],[84.6,'hm_crawl',0.8],[85.7,'hm_claw2',0.9],[85.9,'sc_terror',0.7],[86.5,'gp_souls',0.5],
    [95.7,'fr_thunder',0.8],[97.3,'fr_bite',0.7],];
  // 🎵 nhạc nền (Audio riêng, bám thời gian thật của phim)
  let MUS=[];
  function musSetup(){ musStop(); const mk=(src,a,b,vol,o)=>Object.assign({el:Object.assign(new Audio(src),{preload:'auto'}),a,b,vol},o||{});
    MUS=[ mk('assets/audio/cine_horns.mp3',0,16.5,0.8,{fi:0.6,fo:0.8}), mk('assets/audio/cine_epic.mp3',16,76.5,0.8,{loop:true,fi:0.5,fo:1.0}),
      mk('assets/audio/cine_heart_fast.mp3',76.5,81.5,0.7,{loop:true,fo:0.3}), mk('assets/audio/cine_horns.mp3',88.5,92.7,0.45,{fi:1.2,fo:1.0}), mk('assets/audio/fr_song.mp3',95.8,DUR,0.8,{fi:0.3}) ];
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
    raf=requestAnimationFrame(frame);
    const R=Math.min(paused?pauseT:(now-t0)/1000, DURR), t=r2c(R), SL=slowAt(t), spd=SL?SL[2]:1;
    let si=0; while(si<SCN.length && t>=SC[si+1]) si++;
    const u=t-SC[si];
    SFX.forEach(([ts,k,v,d],i)=>{ if(t>=ts && t<ts+1.5) sfx('s'+i,k,v,d); });
    g.setTransform(1,0,0,1,0,0); g.fillStyle='#000'; g.fillRect(0,0,cv.width,cv.height);
    if(si<SCN.length){ const [scf,camf]=SCN[si]; let [cx,cy,cz,roll]=camf(u); roll=roll||0; cz*=1+Math.abs(roll)*2; { const hw=VW/2/cz+4; cx=clamp(cx,-1450+hw,1650-hw); }   // không lia quá mép nền vẽ sẵn
      shake*=0.86; const ox=(Math.random()-0.5)*shake, oy=(Math.random()-0.5)*shake;
      g.setTransform(1,0,0,1,0,0); if(roll){ g.translate(SC_*VW/2,SC_*VH/2); g.rotate(roll); g.translate(-SC_*VW/2,-SC_*VH/2); }   // 🎥 góc máy nghiêng (dutch angle)
      g.transform(SC_*cz,0,0,SC_*cz,SC_*(VW/2-cx*cz+ox),SC_*(VH/2-cy*cz+oy));
      const red=si===SI.N?1-seg(u,0.6,3.5):1;
      if(window._cineBG) window._cineBG.draw(g,t,red);
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
    if(si===SI.END) endCard(u);
    if(t<0.8){ g.fillStyle=`rgba(0,0,0,${1-t/0.8})`; g.fillRect(0,0,VW,VH); }
    for(const b of [SC[2],SC[SI.P],SC[SI.L]]){ const d=Math.abs(t-b); if(d<0.1){ g.fillStyle=`rgba(0,0,0,${1-d/0.1})`; g.fillRect(0,0,VW,VH); } }   // chuyển phần: chớp đen rất nhanh
    if(si===SI.H && u>=3.0 && u<3.04){ g.fillStyle=`rgba(255,255,255,${0.8*(1-seg(u,3.0,3.04))})`;   // slow-mo kéo dài chớp → rút ngắn lại
      g.fillRect(0,0,VW,VH); }
    if(si===SI.L && u>=2.7 && u<2.73){ g.fillStyle='rgba(255,240,240,0.8)'; g.fillRect(0,0,VW,VH); }
    animeFX(t);
    const bar=si===SI.END?0:58; g.fillStyle='#000'; g.fillRect(0,0,VW,bar); g.fillRect(0,VH-bar,VW,bar);
    musTick(R,t);
    markOnly=false;
    if(panel) panel.update();
  }
  let SC_=2;
  const curT=()=>Math.min(paused?pauseT:(performance.now()-t0)/1000,DURR);
  function seek(sec){ sec=clamp(sec,0,DURR); try{ stopAllLongSfx(); }catch(e){} parts=[]; played={}; markOnly=true; if(paused) pauseT=sec; else t0=performance.now()-sec*1000; }
  function toggle(){ if(paused){ if(pauseT>=DURR-0.05) pauseT=0; t0=performance.now()-pauseT*1000; paused=false; } else { pauseT=curT(); paused=true; } }
  function stop(){ if(raf) cancelAnimationFrame(raf); raf=null; musStop(); try{ stopAllLongSfx(); }catch(e){} if(window._cinePanelRemove) _cinePanelRemove(); panel=null; if(overlay) overlay.remove(); overlay=null; }
  window._cineWar=function(){
    if(overlay) return;
    overlay=document.createElement('div');
    overlay.style.cssText='position:fixed;inset:0;z-index:99999;background:#000;display:flex;align-items:center;justify-content:center;';
    cv=document.createElement('canvas'); cv.width=1080; cv.height=1920; SC_=cv.width/VW;
    cv.style.cssText='height:100vh;max-width:100vw;aspect-ratio:9/16;object-fit:contain;';
    g=cv.getContext('2d');
    overlay.appendChild(cv); document.body.appendChild(overlay);
    if(window._cinePanelMake) panel=_cinePanelMake(overlay,{ title:'Memes Assemble II', dur:()=>DURR, t:curT, playing:()=>!paused && curT()<DURR,
      toggle:()=>{ if(!paused && curT()>=DURR) seek(0); else toggle(); }, seek, replay:()=>{ paused=false; setup(); seek(0); markOnly=false; }, close:()=>{ stop(); if(window.openCinema) openCinema(); } });
    try{ stopAllBattleMusic(); }catch(e){}
    try{ window._cineBG && window._cineBG.prepare && window._cineBG.prepare(); }catch(e){}
    paused=false; setup(); musSetup(); t0=performance.now(); raf=requestAnimationFrame(frame);
  };
  window._cineWarStop=stop;
  window._cineWarPause=t=>{ paused=true; pauseT=c2r(t); parts=[]; };   // t = thời gian phim
  window._cineWarCanvas=()=>cv;
})();
