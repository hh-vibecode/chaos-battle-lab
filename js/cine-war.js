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
    angel:av('holycat','rageAvatarUrl'), friend:av('friend','skill4AvatarUrl'), berserk:av('berserkcat'),
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
  function ring(x,y,r,a,c,lw,sy){ if(a<=0.01) return; g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle=`rgba(${c},${a})`; g.lineWidth=lw||4; g.beginPath(); g.ellipse(x,y,r,r*(sy||0.32),0,0,Math.PI*2); g.stroke(); g.restore(); }
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
  function demFrame(fr){ if(demC[fr]) return demC[fr]; const im=IMG.wdemon, FW=494, FH=320;
    const c=document.createElement('canvas'); c.width=FW; c.height=FH+DEM_EXT; const x=c.getContext('2d');
    const d=document.createElement('canvas'); d.width=FW; d.height=FH; d.getContext('2d').drawImage(im,fr*FW,0,FW,FH,0,0,FW,FH);
    let last=FH-1; { const a=d.getContext('2d').getImageData(0,0,FW,FH).data; for(let y=FH-1;y>0;y--){ let n=0; for(let xx=0;xx<FW;xx+=3) if(a[(y*FW+xx)*4+3]>60) n++; if(n>20){ last=y; break; } } }
    x.drawImage(d,0,0);
    x.globalCompositeOperation='destination-in'; const gr=x.createLinearGradient(0,0,0,FH+DEM_EXT);
    gr.addColorStop(0,'rgba(0,0,0,1)'); gr.addColorStop(Math.max(0,last-90)/(FH+DEM_EXT),'rgba(0,0,0,1)'); gr.addColorStop(last/(FH+DEM_EXT),'rgba(0,0,0,0)'); gr.addColorStop(1,'rgba(0,0,0,0)');
    x.fillStyle=gr; x.fillRect(0,0,FW,FH+DEM_EXT);
    return demC[fr]={c, last}; }
  function demon(x,yB,w,a,wing,tm,rot){ const im=IMG.wdemon; if(!im.naturalWidth) return; const FW=494, FH=320, fr=5+Math.min(2,Math.floor(wing*3)), F=demFrame(fr), k=w/FW, top=yB-F.last*k;
    g.save(); g.globalAlpha=a; g.translate(x,yB); if(rot) g.rotate(rot); g.translate(-x,-yB); g.shadowColor='rgba(255,0,0,0.7)'; g.shadowBlur=24; if(demon.lit) g.filter=`brightness(${demon.lit})`; g.drawImage(F.c,x-w/2,top,F.c.width*k,F.c.height*k); g.restore();
    addGlow(x-w/2+w*0.553,top+FH*k*0.55,w*0.05,0.7*a*(0.6+0.4*Math.sin(tm*5)),'255,40,30'); }
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
  const SC=[0,4.5,8.5,11.5,14.5,17.5,22,28.5,33.5,37,48,55,60,67,70.5,77];
  const DUR=SC[15];
  // 🎞️ SLOW-MOTION kiểu anime ở các cú đánh: [bắt đầu, kết thúc (thời gian phim), tốc độ] — đoạn đó chạy chậm lại, phim dài ra tương ứng
  const SLOW=[[8.38,8.62,0.3],[13.52,13.8,0.25],[16.48,16.75,0.25],[19.72,20.0,0.3],[24.98,25.3,0.3],[35.48,35.7,0.35],[43.48,43.85,0.25],[45.86,46.15,0.3],[57.68,57.9,0.3],[62.38,62.6,0.3]];
  const c2r=c=>{ let r=c; for(const [a,b,f] of SLOW){ if(c<=a) break; r+=(Math.min(c,b)-a)*(1/f-1); } return r; };   // thời gian phim → thời gian thật
  const r2c=r=>{ let off=0; for(const [a,b,f] of SLOW){ const ra=a+off; if(r<=ra) return r-off; const rb=ra+(b-a)/f; if(r<rb) return a+(r-ra)*f; off+=(b-a)*(1/f-1); } return r-off; };
  const DURR=c2r(DUR);
  const slowAt=t=>{ for(const S of SLOW) if(t>=S[0] && t<S[1]) return S; return null; };
  // ⚡ khung hình ANIME lúc slow-mo: chớp âm bản trắng đen (impact frame) → vạch tập trung toả vào giữa + viền tối
  function animeFX(t){ const S=slowAt(t); if(!S) return; const [a,b,f]=S, re=(t-a)/f, k=(t-a)/(b-a), env=Math.sin(Math.PI*k);
    if(re<0.11){ g.save(); g.setTransform(1,0,0,1,0,0); g.globalCompositeOperation='saturation'; g.fillStyle='#808080'; g.fillRect(0,0,cv.width,cv.height);
      if(re<0.06){ g.globalCompositeOperation='difference'; g.fillStyle='#fff'; g.fillRect(0,0,cv.width,cv.height); } g.restore(); }
    g.save(); const vg=g.createRadialGradient(VW/2,VH/2,VH*0.25,VW/2,VH/2,VH*0.62); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,`rgba(0,0,0,${0.55*env})`); g.fillStyle=vg; g.fillRect(0,0,VW,VH);
    const sd=Math.floor(re*24); g.fillStyle=`rgba(255,255,255,${0.42*env})`;
    for(let i=0;i<70;i++){ const an=hash(sd*97+i)*Math.PI*2, r0=VH*(0.34+hash(sd*31+i)*0.22), r1=VH*1.2, w=0.004+hash(i+sd)*0.01;
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
    addGlow(1350,250,800,0.4,'255,40,30'); demon.lit=0.9; demon(1350,600,1300,1,0,t,0); demon.lit=0;   // quỷ to chờ phía xa
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

  // ═════════ J — 2 VỊ THẦN KHỔNG LỒ: Gigachad (to hơn núi) đấu quỷ trên nóc các toà cao ốc ═════════
  //  quỷ dạng chưa bung cánh → bung cánh, QUẠT luồng linh hồn hắc ám → Giga bị đẩy lùi → Joninn + Berserk tí hon nhảy lên giữa,
  //  tụ năng lượng, chém chữ X xuyên luồng hắc ám, chém bay đỉnh núi phía sau → Giga vùng dậy húc quỷ đổ xuống phong ấn dựng sẵn
  const JM={px:860, py:-380};   // đỉnh núi lớn ở GIỮA, sau lưng 2 kiếm sĩ
  const CUT=[[620,-760],[1140,1120]];   // ✖️ đường chém khổng lồ (kiểu Zoro chém đôi Pica): xẻ luồng hắc ám + thành phố + núi

  // 🏙️ thành phố kiểu SUPER SENTAI: 2 dãy cao ốc (sau + trước chân 2 vị thần) — bị va chạm tới đâu là NỔ + ĐỔ SẬP tới đó
  const SKY=[...Array(26)].map((_,i)=>({x:-900+i*120+hash(i+200)*50, w:70+hash(i+210)*60, h:180+hash(i+220)*260, back:true})).concat(
            [...Array(22)].map((_,i)=>({x:-850+i*140+hash(i+300)*60, w:90+hash(i+310)*70, h:120+hash(i+320)*200, back:false})));
  function mountains(t){
    const ridge=mountains.R||(mountains.R=(()=>{ let P=[[-900,900],[-650,380],[-380,520],[-120,240],[150,430],[420,120],[640,0],[JM.px,JM.py],[1080,-20],[1320,200],[1600,90],[1900,330],[2200,250],[2600,900]];
      for(let lv=0;lv<4;lv++){ const Q=[]; for(let i=0;i<P.length-1;i++){ const a=P[i], b=P[i+1], L=Math.hypot(b[0]-a[0],b[1]-a[1]); Q.push(a,[(a[0]+b[0])/2+(hash(i*7+lv*131)-0.5)*L*0.25,(a[1]+b[1])/2+(hash(i*11+lv*97)-0.5)*L*0.35]); } Q.push(P[P.length-1]); P=Q; }
      return P; })());   // sống núi lởm chởm tự nhiên (chia đôi + xê dịch ngẫu nhiên 4 lần)
    g.save(); g.globalCompositeOperation='lighter'; glow(JM.px,JM.py+80,1100,0.65,'255,110,40'); g.restore();   // trời lửa sau núi → núi nổi khối đen viền lửa
    const gr=g.createLinearGradient(0,-400,0,900); gr.addColorStop(0,'#2a0a0e'); gr.addColorStop(0.45,'#160507'); gr.addColorStop(1,'#080203'); g.fillStyle=gr;
    g.beginPath(); ridge.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.closePath(); g.fill();
    g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle='rgba(255,90,40,0.35)'; g.lineWidth=30; g.beginPath(); ridge.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); g.restore();
    g.strokeStyle='rgba(255,170,110,0.7)'; g.lineWidth=3; g.beginPath(); ridge.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); }
  // ✂️ vẽ 1 lớp cảnh bị XẺ ĐÔI theo đường CUT: nửa trái giữ nguyên, nửa phải trượt lệch xuống dọc đường chém (sp: 0→1)
  function splitDraw(fn,sp,crack){ if(sp<=0){ fn(); return; }
    const [A,B]=CUT, dx=B[0]-A[0], dy=B[1]-A[1], L=Math.hypot(dx,dy), ux=dx/L, uy=dy/L, E=6000;
    const half=(side)=>{ g.beginPath(); g.moveTo(A[0]-ux*E,A[1]-uy*E); g.lineTo(B[0]+ux*E,B[1]+uy*E); g.lineTo(B[0]+ux*E+side*uy*E,B[1]+uy*E-side*ux*E); g.lineTo(A[0]-ux*E+side*uy*E,A[1]-uy*E-side*ux*E); g.closePath(); };
    g.save(); half(1); g.clip(); fn(); g.restore();
    g.save(); half(-1); g.clip(); g.translate(ux*sp*230+uy*sp*55,uy*sp*230-ux*sp*55); fn(); g.restore();
    if(sp>0 && crack>0){ g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round'; for(const [lw,al,c] of [[90,0.18,'255,90,30'],[30,0.45,'255,150,60'],[8,0.9,'255,235,190']]){ g.strokeStyle=`rgba(${c},${al*crack})`; g.lineWidth=lw*(0.4+0.6*sp); g.beginPath(); g.moveTo(A[0]-ux*400,A[1]-uy*400); g.lineTo(B[0]+ux*200,B[1]+uy*200); g.stroke(); } g.restore(); } }   // khe nứt nóng chảy giữa 2 nửa
  // thời điểm toà nhà bị phá (theo các cú va chạm của cảnh J) — null = còn đứng
  function bCollapse(b){ const c=b.x+b.w/2, r=hash(b.x)*0.5;
    if(c>-250 && c<560) return 3.2+(560-c)/810*1.1+r*0.3;             // Giga bị luồng hắc ám đẩy lùi giẫm nát
    if(c>760 && c<1280 && !b.back) return 8.95+r*0.4;                 // cú húc: sóng chấn động
    if(c>900 && c<1900) return 10.0+(c-900)/1000*0.6+r*0.2;           // quỷ ngã đè xuống
    return null; }
  function boom(x,y,r,k){ if(k<=0||k>=1) return; const f=eout(k);   // 💥 vụ nổ lửa kiểu sentai: cầu lửa phồng lên rồi hoá khói
    g.save(); g.globalCompositeOperation='lighter'; glow(x,y-r*f*0.6,r*(0.5+f),(1-k)*0.95,'255,170,60'); glow(x,y-r*f*0.6,r*(0.3+0.6*f),(1-k),'255,240,190'); g.restore();
    g.save(); g.globalAlpha=0.6*Math.sin(Math.PI*k); for(let q=0;q<5;q++){ const px=x+(hash(q+x)-0.5)*r, py=y-r*f*(0.8+q*0.25), pr=r*0.45*f+1, sg=g.createRadialGradient(px,py,0,px,py,pr); sg.addColorStop(0,'rgba(30,18,16,0.9)'); sg.addColorStop(0.6,'rgba(26,14,12,0.5)'); sg.addColorStop(1,'rgba(26,14,12,0)'); g.fillStyle=sg; g.beginPath(); g.arc(px,py,pr,0,Math.PI*2); g.fill(); } g.restore(); }
  function building(b,u,t,shk){ const cT=bCollapse(b), k=cT==null?0:seg(u,cT,cT+1.3); if(k>=1){ g.save(); g.globalAlpha=0.8; g.fillStyle='#120c10'; g.beginPath(); g.ellipse(b.x+b.w/2,925,b.w*0.75,22,0,0,Math.PI*2); g.fill(); g.restore(); return; }   // đống gạch đổ nát
    const sink=ein(k)*b.h, tilt=(hash(b.x+1)-0.5)*0.5*k, bx=b.x+(Math.random()-0.5)*shk, by=925;
    g.save(); g.beginPath(); g.rect(-5000,-5000,10000,by+5000); g.clip(); g.translate(bx+b.w/2,by+sink); g.rotate(tilt); g.translate(-b.w/2,0);
    g.fillStyle=b.back?'#1b1420':'#0d0a12'; g.fillRect(0,-b.h,b.w,b.h+60); g.fillStyle=b.back?'#130e18':'#08060c'; g.fillRect(b.w*0.72,-b.h,b.w*0.28,b.h+60);
    for(let yy=-b.h+14; yy<-8; yy+=18) for(let xx=7; xx<b.w*0.66; xx+=14) if(hash(xx*1.3+yy+b.x)<(k>0?0.15:0.5)){ g.fillStyle=hash(xx+yy*2+b.x)<0.5?'rgba(255,205,120,0.9)':'rgba(255,150,90,0.7)'; g.fillRect(xx,yy,6,8); }
    if(b.h>300 && Math.sin(t*3+b.x)>0){ g.fillStyle='#ff3b30'; g.fillRect(b.w/2-2,-b.h-8,4,4); }
    g.restore();
    if(cT!=null){ boom(b.x+b.w/2,by-b.h*(0.35+0.4*hash(b.x+5)),b.w*2.1,seg(u,cT-0.05,cT+0.9)); if(k>0 && k<0.8 && Math.random()<0.5) dust(b.x+b.w/2,by,2,b.w); if(u>=cT && u<cT+0.06){ rocks(b.x+b.w/2,by-b.h*0.5,8,0); sparks(b.x+b.w/2,by-b.h*0.5,14,'255,200,120',7); } } }
  function skyline(t,shk,u,back){ for(const b of SKY) if(b.back===back) building(b,u,t,shk); }
  function sealGround(a,t){ if(a<=0.01) return; g.save(); g.translate(SE.x,SE.y); g.scale(1,SE.ry/SE.rx); g.globalCompositeOperation='lighter';
    for(const [r,lw] of [[SE.rx,6],[SE.rx*0.93,2.5],[SE.rx*0.62,4]]){ g.strokeStyle=`rgba(130,215,255,${a*(0.8+0.2*Math.sin(t*6))})`; g.lineWidth=lw; g.beginPath(); g.arc(0,0,r,0,Math.PI*2); g.stroke(); }
    g.rotate(t*0.4); g.font='700 34px serif'; g.fillStyle=`rgba(180,235,255,${a})`; for(let i=0;i<28;i++){ g.save(); g.rotate(i/28*Math.PI*2); g.fillText(['♪','ᚱ','♫','ᛟ','ᚢ','♩','ᛖ'][i%7],SE.rx*0.75,10); g.restore(); }
    g.restore(); }
  function scJ(u,t){
    const walk=eio(seg(u,0,1.2)), wing=eio(seg(u,1.2,2.6)), fan=seg(u,2.8,4.6), push=eout(seg(u,3.0,4.3)), leap=seg(u,4.5,5.1), charge=seg(u,5.1,6.5), slash=seg(u,6.5,7.6), cut=seg(u,7.0,9.4),
      rise=eio(seg(u,7.6,8.4)), ram=ein(seg(u,8.4,8.9)), fallD=eio(seg(u,8.9,10.6)), sp=eout(seg(u,6.85,8.3));
    splitDraw(()=>{ mountains(t); skyline(t,0,u,true); },sp,1-seg(u,8.6,9.6));   // núi + dãy cao ốc phía SAU — bị xẻ đôi theo nhát chém
    sealGround(0.35+0.65*seg(u,8.9,10.0),t);   // phong ấn dựng sẵn dưới thành phố
    // 😈 quỷ khổng lồ: dạng choàng cánh → bung cánh → quạt (nghiêng tới) → bị húc ngã ngửa xuống phong ấn
    const dX=lerp(1300,SE.x+260,fallD), dY=lerp(1080,SE.y+1000,fallD), dRot=-0.08*Math.sin(Math.PI*fan)+fallD*0.42+(ram>=1?0.05:0);   // ngã ngửa đổ sụp xuống phong ấn
    addGlow(dX,dY-1000,1100,0.55*(0.6+0.4*wing),'255,40,40');   // đèn ngược đỏ sau lưng quỷ → nổi bóng
    demon.lit=1.9; demon(dX,dY,2900,1,wing,t,dRot); demon.lit=0;
    // 🌪️ luồng linh hồn hắc ám từ đôi cánh quét về phía Giga
    const tA=fan>0&&fan<1?Math.sin(Math.PI*fan):0, sliced=seg(u,6.8,7.6);
    if(tA>0 || (u>=4.6 && u<7.6)){ const flow=tA>0?tA:1-sliced, fx0=dX-520, fy0=dY-1050, fx1=lerp(520,330,push), fy1=dY-950;
      g.save(); g.globalCompositeOperation='source-over';
      const [CA,CB]=CUT, cl=Math.hypot(CB[0]-CA[0],CB[1]-CA[1]), cnx=(CB[1]-CA[1])/cl, cny=-(CB[0]-CA[0])/cl;
      for(let i=0;i<46;i++){ const k=((t*0.9+hash(i)*1.0)%1); let x=lerp(fx0,fx1,k), y=lerp(fy0,fy1,k)+Math.sin(t*5+i)*60*(1-k*0.4)+(hash(i+7)-0.5)*260; const r=30+hash(i+3)*45;
        if(sliced>0){ const sd=Math.sign((x-CA[0])*cnx+(y-CA[1])*cny)||1, d=eout(sliced)*260; x+=cnx*sd*d; y+=cny*sd*d; }   // luồng hắc ám bị xẻ: 2 nửa bật tách ra 2 bên đường chém
        const gr=g.createRadialGradient(x,y,0,x,y,r); gr.addColorStop(0,`rgba(6,2,10,${0.9*flow})`); gr.addColorStop(0.6,`rgba(40,6,50,${0.5*flow})`); gr.addColorStop(1,'rgba(40,6,50,0)'); g.fillStyle=gr; g.beginPath(); g.arc(x,y,r,0,Math.PI*2); g.fill();
        if(i%5===0){ g.fillStyle=`rgba(255,40,40,${flow})`; g.fillRect(x-7,y-4,5,5); g.fillRect(x+4,y-4,5,5); } }   // mắt linh hồn
      g.globalCompositeOperation='lighter'; for(let q=0;q<5;q++){ const yy=lerp(fy0,fy1,0.5)+(q-2)*70; g.strokeStyle=`rgba(170,60,255,${0.18*flow})`; g.lineWidth=24; g.beginPath(); g.moveTo(fx0,yy+Math.sin(t*4+q)*40); g.quadraticCurveTo((fx0+fx1)/2,yy-120,fx1,yy); g.stroke(); }
      g.restore(); }
    // 💪 Gigachad to hơn núi: bước vào → bị luồng hắc ám đẩy lùi, ghì người → vùng dậy húc
    const gX=lerp(lerp(-150,380,walk)-push*260,lerp(1300,SE.x+120,0)-640,ram)-eio(seg(u,9.1,10.4))*380, gR=-0.12*push*(1-rise)+ram*0.32, gH=1350;
    if(ram>0 && ram<1) for(let k=1;k<5;k++) actor(IMG.gigaBig,gX-k*90,925,gH,{a:0.25-k*0.05,rot:gR,flip:flipTo('gigachad',true)});
    actor(IMG.gigaBig,gX,925,gH,{rot:gR,flip:flipTo('gigachad',true)});
    if(u>=8.88 && u<8.96){ shake=34; sparks(dX-620,dY-1050,80,'255,230,200',16); dust(dX-300,900,40,600); }
    impact(dX-640,dY-1050,seg(u,8.9,9.5),560);
    if(u>=10.4 && u<10.5){ shake=26; dust(SE.x,SE.y,50,700); rocks(SE.x,SE.y,30,0); }
    // 🏙️ dãy cao ốc phía trước chân 2 vị thần (rung theo cú va)
    splitDraw(()=>skyline(t,(push>0&&push<1?6:0)+(u>=8.9&&u<9.4?12:0)+(u>=10.4&&u<10.8?10:0),u,false),sp);   // dãy phía TRƯỚC (che chân) — cũng bị xẻ
    // ⚔️ Joninn + Berserk tí hon: nhảy từ nóc nhà lên đỉnh đường chém → tụ năng lượng → lao chéo xuống theo đường chém (1 xanh 1 đỏ)
    const [CA,CB]=CUT, cdx=CB[0]-CA[0], cdy=CB[1]-CA[1], cL=Math.hypot(cdx,cdy), cux=cdx/cL, cuy=cdy/cL, cnx=cuy, cny=-cux;
    const SX=lerp(CA[0],CB[0],0.3), SY=lerp(CA[1],CB[1],0.3);   // chỗ tụ lực (trên cao, giữa trời)
    const dash=ein(seg(u,6.5,6.82));
    if(leap>0 && u<7.9){ const sz=lerp(60,92,charge);
      for(const [j,im,c] of [[0,IMG.joninn,'110,200,255'],[1,IMG.berserk,'255,60,60']]){ const off=(j?1:-1)*48;
        let x=lerp(lerp(900,SX,eout(leap)),CB[0]-cux*40,dash)+cnx*off, y=lerp(lerp(820,SY,eout(leap)),CB[1]-cuy*170,dash)+cny*off+(dash<=0?Math.sin(t*6+j)*6:0);
        if(charge>0 && dash<1){ const ck=charge*(1-dash); addGlow(x,y-sz*0.5,sz*(1.6+charge*1.4),0.7*ck,c);
          g.save(); g.globalCompositeOperation='lighter'; for(let q=0;q<10;q++){ const a=t*3+q*0.63+j, r1=sz*(2.2-((t*1.5+q*0.1)%1)*1.7); g.strokeStyle=`rgba(${c},${0.55*ck})`; g.lineWidth=2; g.beginPath(); g.moveTo(x+Math.cos(a)*r1,y-sz*0.5+Math.sin(a)*r1); g.lineTo(x+Math.cos(a)*(r1-sz*0.4),y-sz*0.5+Math.sin(a)*(r1-sz*0.4)); g.stroke(); } g.restore();   // năng lượng hút về
          for(let q=0;q<2;q++){ const a=t*7+q*3.1+j; bolt(x+Math.cos(a)*sz*1.3,y-sz*0.5+Math.sin(a)*sz,x,y-sz*0.5,1.4,0.85*ck,c); } }
        if(dash>0 && dash<1) for(let k=1;k<6;k++) actor(im,x-cux*k*60,y-cuy*k*60,sz,{a:0.35-k*0.06,flip:j===0?flipTo('samuraicheems',true):false,rot:0.5});   // bóng mờ khi lao
        actor(im,x,y,sz,{flip:j===0?flipTo('samuraicheems',true):false,rot:dash>0?0.5:0}); } }
    // ✖️ NHÁT CHÉM: 2 lưỡi trăng khuyết (xanh / đỏ) xoắn quanh đường chém, quét từ trên xuống trong 0.3s, để lại vệt sáng nứt toác
    if(u>=6.5 && u<8.6){ const head=eout(seg(u,6.5,6.82)), fade=1-seg(u,7.3,8.6);
      g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round';
      for(const [j,c,core] of [[0,'90,170,255','220,240,255'],[1,'255,50,60','255,215,215']]){ const sg=j?1:-1;
        const B=190*(1-seg(u,6.82,7.6)*0.5), O=[], I=[]; for(let i=0;i<=48;i++){ const f=i/48*head, sn=Math.sin(Math.PI*f), px=CA[0]+cdx*f, py=CA[1]+cdy*f; O.push([px+cnx*sg*B*sn,py+cny*sg*B*sn]); I.push([px+cnx*sg*B*0.42*sn,py+cny*sg*B*0.42*sn]); }
        const poly=()=>{ g.beginPath(); O.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1])); for(let i=I.length-1;i>=0;i--) g.lineTo(I[i][0],I[i][1]); g.closePath(); };
        const line=(P)=>{ g.beginPath(); P.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1])); };
        g.shadowColor=`rgba(${c},1)`; g.shadowBlur=60; g.fillStyle=`rgba(${c},${0.55*fade})`; poly(); g.fill(); g.shadowBlur=0;   // lưỡi trăng khuyết ĐẶC (anime): thân màu, nhọn 2 đầu
        g.fillStyle=`rgba(${core},${0.5*fade})`; g.beginPath(); O.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1])); for(let i=O.length-1;i>=0;i--) g.lineTo(lerp(O[i][0],I[i][0],0.3),lerp(O[i][1],I[i][1],0.3)); g.closePath(); g.fill();   // dải sáng sát mép ngoài
        for(const [lw,al,cc] of [[34,0.25,c],[10,0.8,c],[3.5,1,'255,255,255']]){ g.strokeStyle=`rgba(${cc},${al*fade})`; g.lineWidth=lw; line(O); g.stroke(); }   // mép lưỡi sắc trắng loá
        if(head<1){ const hx=CA[0]+cdx*head, hy=CA[1]+cdy*head; addGlow(hx,hy,220,0.9,c); sparks(hx,hy,6,c,10); } }
      // vệt cắt trắng loá còn đọng + mép cắt nóng đỏ
      for(const [lw,al,cc] of [[60,0.25,'255,255,255'],[18,0.7,'255,255,255'],[5,1,'255,255,255']]){ g.strokeStyle=`rgba(${cc},${al*fade*head})`; g.lineWidth=lw; g.beginPath(); g.moveTo(CA[0],CA[1]); g.lineTo(CA[0]+cdx*head,CA[1]+cdy*head); g.stroke(); }
      if(u>6.82) for(let q=0;q<26;q++){ const f=hash(q+40), a=(hash(q+41)-0.5)*0.8, L=80+hash(q+42)*260, px=CA[0]+cdx*f, py=CA[1]+cdy*f, sd=q%2?1:-1;   // vạch tốc độ toả ngang 2 bên
        g.strokeStyle=`rgba(255,255,255,${0.35*fade})`; g.lineWidth=2; g.beginPath(); g.moveTo(px+cnx*sd*30,py+cny*sd*30); g.lineTo(px+(cnx*sd+cux*a)*L,py+(cny*sd+cuy*a)*L); g.stroke(); }
      g.restore();
      if(u>=6.82 && u<6.9){ for(let q=0;q<12;q++){ const f=q/11; rocks(CA[0]+cdx*f,CA[1]+cdy*f,2,0); dust(CA[0]+cdx*f,CA[1]+cdy*f,2,80); } } }
    if(u>=6.5 && u<6.58) shake=20; if(u>=6.82 && u<6.9){ shake=34; }
    if(u>=6.45 && u<6.62){ g.save(); g.fillStyle=`rgba(255,255,255,${0.5*(1-seg(u,6.45,6.62))})`; g.fillRect(-4000,-4000,9000,9000); g.restore(); }
  }
  const camJ=u=>keys(u,[[0,640,250,0.3],[4.4,660,260,0.3],[4.6,850,300,0.7],[5.1,776,-200,0.95],[6.4,776,-210,1.3],[6.55,840,200,0.3],[8.3,760,280,0.3],[8.9,900,330,0.32],[9.6,1150,330,0.32],[10.8,SE.x+150,420,0.36]]);

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
  function scK(u,t){ const on=seg(u,0,1.4), chain=seg(u,1.3,2.6), ang=eout(seg(u,1.8,3.0)), col=seg(u,2.9,3.3), hole=eio(seg(u,3.4,4.2)), sink=ein(seg(u,3.8,6.0)), shut=seg(u,6.0,6.6), fade=1-seg(u,6.4,7.0);
    // vòng phong ấn phối cảnh (vòng + chữ rune + ngôi sao 6 cánh), sáng theo nhạc
    g.save(); g.translate(SE.x,SE.y); g.scale(1,SE.ry/SE.rx); g.globalCompositeOperation='lighter'; const al=(0.25+0.75*on)*fade, beat=0.8+0.2*Math.sin(t*12);
    for(const [r,lw] of [[SE.rx,6],[SE.rx*0.93,2.5],[SE.rx*0.62,4]]){ g.strokeStyle=`rgba(130,215,255,${al*beat})`; g.lineWidth=lw; g.beginPath(); g.arc(0,0,r,0,Math.PI*2); g.stroke(); }
    g.save(); g.rotate(t*0.4); g.font='700 34px serif'; g.fillStyle=`rgba(180,235,255,${al})`; for(let i=0;i<28;i++){ g.save(); g.rotate(i/28*Math.PI*2); g.fillText(['♪','ᚱ','♫','ᛟ','ᚢ','♩','ᛖ'][i%7],SE.rx*0.75,10); g.restore(); } g.restore();
    g.save(); g.rotate(-t*0.7); g.strokeStyle=`rgba(120,200,255,${al})`; g.lineWidth=4; for(const o of [0,Math.PI/3]){ g.beginPath(); for(let i=0;i<=3;i++){ const a=o+i*Math.PI*2/3; i?g.lineTo(Math.cos(a)*SE.rx*0.62,Math.sin(a)*SE.rx*0.62):g.moveTo(Math.cos(a)*SE.rx*0.62,Math.sin(a)*SE.rx*0.62); } g.stroke(); } g.restore();
    if(hole>0){ g.globalCompositeOperation='source-over'; const r=SE.rx*0.55*hole*(1-shut); const gr=g.createRadialGradient(0,0,0,0,0,r); gr.addColorStop(0,'#000'); gr.addColorStop(0.75,'#1a0000'); gr.addColorStop(1,'rgba(255,70,20,0.9)'); g.fillStyle=gr; g.beginPath(); g.arc(0,0,Math.max(0,r),0,Math.PI*2); g.fill(); }
    g.restore();
    // quỷ nằm giữa vòng → chìm qua cổng địa ngục (chỉ phần trên mặt đất + phần lọt trong miệng cổng là còn thấy)
    if(sink<1){ g.save(); g.beginPath(); g.rect(-2000,-2000,5000,SE.y-10+2000); g.ellipse(SE.x,SE.y,SE.rx*0.55*hole,SE.ry*0.55*hole,0,0,Math.PI*2); g.clip();
      demon(SE.x+Math.sin(t*9)*6*(1-sink),SE.y+12+sink*700,980*(1-sink*0.15),1,1,t,Math.sin(t*3.3)*0.06); g.restore();
      if(chain>0) for(let i=0;i<6;i++){ const a=i/6*Math.PI*2+0.4, px=SE.x+Math.cos(a)*SE.rx*0.95, py=SE.y+Math.sin(a)*SE.ry*0.95; g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle=`rgba(150,230,255,${0.85*chain*(1-sink)})`; g.lineWidth=5; g.setLineDash([16,10]); g.lineDashOffset=-t*60; g.beginPath(); g.moveTo(px,py); g.quadraticCurveTo(lerp(px,SE.x,0.5),SE.y-200,SE.x+(i%2?40:-40),SE.y-260+(i%3)*60+sink*500); g.stroke(); g.restore(); } }
    // 4 meme âm nhạc ở 4 góc phong ấn, tuôn nhạc vào tâm
    const C4=[[SE.x-SE.rx*0.92,SE.y-SE.ry*0.75,IMG.piano,'255,230,120',105],[SE.x+SE.rx*0.92,SE.y-SE.ry*0.75,IMG.guitar,'255,90,90',105],[SE.x-SE.rx*0.9,SE.y+SE.ry*0.85,IMG.bongo,'255,200,120',130],[SE.x+SE.rx*0.9,SE.y+SE.ry*0.85,IMG.mosq,'255,80,140',125]];
    C4.forEach(([x,y,im,c,h],i)=>{ addGlow(x,y-h*0.4,h*0.9,0.45*fade,c); shadow(x,y,h*0.3,0.4); actor(im,x,y-(i===3?40+Math.sin(t*3)*8:0),h,{flip:i===3});
      if(on>0 && fade>0.05) for(let q=0;q<4;q++){ const f=(t*0.9+q/4+i*0.13)%1, px=lerp(x,SE.x,f), py=lerp(y-h*0.5,SE.y-60,f)-Math.sin(f*Math.PI)*90; addGlow(px,py,16,on*fade*(1-f*0.3),c); if(q%2) text(['♪','♫'][q%2?0:1],px,py,22,`rgba(${c},${on*fade})`); } });
    // Holy Angel Cat trấn giữ trên đầu phong ấn + phong ấn thánh giá thần thánh
    if(ang>0){ const ax=SE.x, ay=lerp(-200,330,ang); addGlow(ax,ay-80,280,0.6*ang*fade,'255,250,225');
      // ✝️ PHONG ẤN THÁNH GIÁ: thánh giá vàng khổng lồ hiện trên đầu Holy Cat (hào quang xoay + tia sáng) → giáng thẳng xuống quỷ, cắm phập vào tâm phong ấn, in dấu thánh giá vàng xuống mặt vòng
      const form=eout(seg(u,2.15,2.9)), drop=ein(col), land=u>=3.3;
      if(form>0 && fade>0){ const S=lerp(50,150,form)+drop*40, cx=ax, cy=land?SE.y-S*1.25:lerp(ay-230-S,SE.y-S*1.25,drop);   // hiện TRÊN ĐẦU Holy Cat (sau lưng nó)
        if(!land){ g.save(); g.globalCompositeOperation='lighter'; for(let q=0;q<16;q++){ const an=q/16*Math.PI*2+t*0.6, L=S*(2.4+0.5*Math.sin(t*5+q)); g.strokeStyle=`rgba(255,235,170,${0.28*form*fade})`; g.lineWidth=6; g.beginPath(); g.moveTo(cx+Math.cos(an)*S*0.9,cy+Math.sin(an)*S*0.9); g.lineTo(cx+Math.cos(an)*L,cy+Math.sin(an)*L); g.stroke(); }   // tia hào quang
          g.strokeStyle=`rgba(255,230,150,${0.8*form*fade})`; g.lineWidth=5; g.beginPath(); g.arc(cx,cy-S*0.35,S*0.95,0,Math.PI*2); g.stroke(); g.lineWidth=2; g.beginPath(); g.arc(cx,cy-S*0.35,S*1.08,0,Math.PI*2); g.stroke();
          g.font=`700 ${Math.round(S*0.16)}px serif`; g.fillStyle=`rgba(255,240,190,${form*fade})`; g.textAlign='center'; for(let q=0;q<12;q++){ const an=q/12*Math.PI*2-t*0.8; g.fillText('✦ᛉ✧ᛟ✦ᚨ'[q%6],cx+Math.cos(an)*S*1.02,cy-S*0.35+Math.sin(an)*S*1.02); } g.restore(); }   // vòng hào quang + chữ thánh xoay
        if(land){ g.save(); g.beginPath(); g.rect(-3000,-3000,6000,SE.y+3000-6); g.clip(); }   // cắm ngập chân vào phong ấn
        holyCross(cx,cy+(land?S*0.35:0),S,form*fade*(land?1-seg(u,5.4,6.4)*0.7:1)); if(land) g.restore();
        if(drop>0 && drop<1) for(let k=1;k<5;k++) holyCross(cx,cy-k*S*0.3,S,0.18*(1-k*0.2)*fade);   // vệt giáng xuống
        if(land){ const k=seg(u,3.3,3.9); g.save(); g.translate(SE.x,SE.y); g.scale(1,SE.ry/SE.rx); holyCross(0,SE.rx*0.08,SE.rx*0.62*eout(k),0.75*fade,true); g.restore();   // dấu thánh giá in xuống mặt phong ấn
          if(u<3.42) shake=26; ring(SE.x,SE.y,lerp(60,SE.rx*1.6,eout(k)),1-k,'255,235,170',9,SE.ry/SE.rx); addGlow(SE.x,SE.y-80,420,0.9*(1-k)+0.25,'255,240,200'); if(u<3.36){ sparks(SE.x,SE.y-40,40,'255,230,160',12); dust(SE.x,SE.y,30,500); } } }
      actor(IMG.angel,ax,ay,250,{a:ang*fade}); }
    if(u>=6.5 && u<6.58) shake=16; if(u>=6.5) addGlow(SE.x,SE.y,500*seg(u,6.5,7)+100,1-seg(u,6.5,7),'255,255,255'); }
  const camK=u=>keys(u,[[0,SE.x,640,0.62],[3.0,SE.x,600,0.58],[6.5,SE.x,660,0.62],[7,SE.x,680,0.66]]);

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
    if(v>3.6){ const w=v-3.6, open=eio(seg(w,0.3,1.4)), c=prep(IMG.friend); if(c){ const W=240, H=W*c.sh/c.sw, x=VW/2-W/2, y=VH*0.47-H-30;
        g.save(); g.globalAlpha=seg(w,0,0.6); g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,x,y,W,H);
        g.fillStyle='#000'; const ey=y+H*0.44; g.fillRect(x,ey-H*0.14,W,H*0.14*(1-open)+0.5); g.fillRect(x,ey+H*0.14-H*0.14*(1-open),W,H*0.14*(1-open)+0.5);
        for(let i=0;i<9;i++){ const bx=x+W*(0.3+hash(i+30)*0.45), L=flow(w-0.7-hash(i)*0.5,0.8+hash(i)*0.7)*(14+hash(i+3)*60); bloodDrip(bx,y+H*0.8,L,2.6+hash(i+4)*3,1); }   // máu chảy từ răng
        g.restore(); } } }

  const SCN=[[scA,camA],[scC,camC],[scD,camD],[scE,camE],[scF,camF],[scG,camG],[scH,camH],[scP,camP],[scQ,camQ],[scJ,camJ],[scK,camK],[scL,camL],[scM,camM],[scN,camN]];
  function keys(u,K){ for(let i=0;i<K.length-1;i++){ const a=K[i], b=K[i+1]; if(u>=a[0] && u<b[0]){ const k=(b[0]-a[0]<0.05)?1:eio((u-a[0])/(b[0]-a[0])); return [lerp(a[1],b[1],k),lerp(a[2],b[2],k),lerp(a[3],b[3],k)]; } } const L=K[K.length-1]; return [L[1],L[2],L[3]]; }
  // 🔊 tiếng (thời điểm tuyệt đối)
  const SFX=[[0.3,'titan_roar',0.5,3],[1.6,'hit_heavy',0.6],[2.9,'holy_thunder',0.6],[3.6,'hit_mid',0.6],
    [5.1,'stalin_hammer_hit',0.9],[6.1,'stalin_hammer_return',0.6],[6.15,'burn_loop',0.5,1],[6.2,'hit_heavy',0.8],[6.8,'holy_thunder',0.8],[6.8,'flyingcat_laser',0.6,2.6],[8.4,'vine_boom',1.0],
    [8.9,'spidercat_hit',0.9],[9.4,'ninja_slash',0.7],[9.9,'ninja_slash',0.7],[10.4,'ninja_slash',0.7],[10.8,'spidercat_hit',0.8],
    [11.9,'punch1',0.7],[12.55,'punch1',0.7],[13.5,'chillguy_kick',1.0],[13.55,'vine_boom',0.9],
    [14.5,'ricardo_music',0.7,2.0],[16.5,'hit_heavy',1.0],[16.5,'punch2',0.9],
    [17.7,'cdg_grow',0.9],[19.75,'vine_boom',1.0],[19.75,'creeper_explosion',0.8],[20,'wg_dragon_impact',0.8],
    [22.1,'sm_form',0.6],[25,'sm_schwing',1.0],[25.1,'ninja_slash',0.9],[25.9,'sm_fin',1.0],[26.1,'sm_drip',0.6],[26.1,'death_break',0.8],
    [28.6,'titan_roar',0.7,3],[29.3,'larry_horn',0.6,2],[29.5,'gp_souls',0.7,3],[30.6,'punch1',0.5],[31.2,'fd_roar',0.5,2],[31.8,'punch1',0.5],[32.6,'hit_mid',0.5],
    [34.0,'vine_boom',0.7],[35.5,'ultimate_charge_2',0.9],[35.9,'gigachad_roar',1.0,2],[35.95,'hit_heavy',1.0],
    [37.3,'gigachad_roar',0.9,2],[38.5,'titan_roar',0.9,3],[39.9,'fd_roar',0.8,3],[40,'gp_souls',0.8,2],[41.6,'ultimate_charge_2',0.9],[42.1,'sm_form',0.8],[43.5,'sm_schwing',1.0],[43.5,'ninja_slash',1.0],[44,'creeper_explosion',0.9],[44.1,'wg_dragon_impact',0.9],[44.9,'gigachad_roar',1.0,2],[45.9,'vine_boom',1.0],[45.9,'hit_heavy',1.0],[47.4,'wg_dragon_impact',1.0],
    [48,'piano_giorno',0.55,4],[48.2,'guitar_jojo',0.5,4],[48.4,'tribe_1',0.6,4],[48.6,'mosquito_violin',0.55,4],[49.8,'hl_choir',1.0,5],[51,'hl_laser',1.0],[51.5,'titan_roar',0.8,3],[54.5,'holy_thunder',1.0],
    [55.3,'sc_terror',0.6],[56,'ultimate_charge_2',0.8],[57.7,'vine_boom',1.0],[57.7,'holy_thunder',0.8],[58.5,'uia_tele_dbz',1.0],
    [60.9,'holy_thunder',0.6],[61.6,'stalin_hammer_return',0.7],[62.15,'hm_claw1',1.0],[62.4,'vine_boom',1.0],[62.6,'hm_stalker',0.9],[63.1,'hm_crawl',0.8],[64.2,'hm_claw2',0.9],[64.4,'sc_terror',0.7],[65,'gp_souls',0.5],
    [74.2,'fr_thunder',0.8],[75.8,'fr_bite',0.7],];
  // 🎵 nhạc nền (Audio riêng, bám thời gian thật của phim)
  let MUS=[];
  function musSetup(){ musStop(); const mk=(src,a,b,vol,o)=>Object.assign({el:Object.assign(new Audio(src),{preload:'auto'}),a,b,vol},o||{});
    MUS=[ mk('assets/audio/cine_horns.mp3',0,22.5,0.8,{fi:0.6,fo:0.8}), mk('assets/audio/cine_epic.mp3',22,55,0.8,{loop:true,fi:0.5,fo:1.0}),
      mk('assets/audio/cine_heart_fast.mp3',55,60,0.7,{loop:true,fo:0.3}), mk('assets/audio/cine_horns.mp3',67,71.2,0.45,{fi:1.2,fo:1.0}), mk('assets/audio/fr_song.mp3',74.3,DUR,0.8,{fi:0.3}) ];
    for(const m of MUS) m.el.loop=!!m.loop; }
  function musTick(rR,tR){ for(const m of MUS){ const on=!paused && tR>=m.a && tR<m.b;
      if(!on){ if(!m.el.paused) m.el.pause(); continue; }
      const pos=rR-c2r(m.a), d=m.el.duration||1e9;
      if(!m.loop && pos>=d){ if(!m.el.paused) m.el.pause(); continue; }
      if(m.el.paused){ try{ m.el.currentTime=m.loop?pos%d:pos; }catch(e){} m.el.play().catch(()=>{}); }
      else if(!m.loop && Math.abs(m.el.currentTime-pos)>0.35){ try{ m.el.currentTime=pos; }catch(e){} }
      let v=m.vol; if(m.fi) v*=seg(tR,m.a,m.a+m.fi); if(m.fo) v*=1-seg(tR,m.b-m.fo,m.b);
      if(tR>=SC[6]+1.2 && tR<SC[6]+3.0) v*=lerp(1,0.15,seg(tR,SC[6]+1.2,SC[6]+2.4));   // King bị vây: nhạc lặng dần trước nhát cắt
      if(slowAt(tR)) v*=0.55;   // slow-mo: nhạc lặng xuống
      m.el.volume=clamp(v,0,1); } }
  function musStop(){ for(const m of MUS){ try{ m.el.pause(); }catch(e){} } }

  function frame(now){
    raf=requestAnimationFrame(frame);
    const R=Math.min(paused?pauseT:(now-t0)/1000, DURR), t=r2c(R), SL=slowAt(t), spd=SL?SL[2]:1;
    let si=0; while(si<14 && t>=SC[si+1]) si++;
    const u=t-SC[si];
    SFX.forEach(([ts,k,v,d],i)=>{ if(t>=ts && t<ts+1.5) sfx('s'+i,k,v,d); });
    g.setTransform(1,0,0,1,0,0); g.fillStyle='#000'; g.fillRect(0,0,cv.width,cv.height);
    if(si<14){ const [scf,camf]=SCN[si]; let [cx,cy,cz]=camf(u); { const hw=VW/2/cz+4; cx=clamp(cx,-1450+hw,1650-hw); }   // không lia quá mép nền vẽ sẵn
      shake*=0.86; const ox=(Math.random()-0.5)*shake, oy=(Math.random()-0.5)*shake;
      g.setTransform(SC_*cz,0,0,SC_*cz,SC_*(VW/2-cx*cz+ox),SC_*(VH/2-cy*cz+oy));
      const red=si===13?1-seg(u,0.6,3.5):1;
      if(window._cineBG) window._cineBG.draw(g,t,red);
      if(red>0.5 && si<12 && (Math.sin(t*17)>0.94 || Math.random()<0.01)){ g.fillStyle=`rgba(255,40,40,${0.1*red})`; g.fillRect(-1500,-1500,3500,GROUND+1500); bolt(cx-300+Math.random()*600,-800,cx-200+Math.random()*400,GROUND-160,4,0.8,'255,40,40','255,210,210'); }
      scf(u,t);
      for(let i=parts.length-1;i>=0;i--){ const p=parts[i]; if(!paused){ p.x+=p.vx*spd; p.y+=p.vy*spd; p.vx*=1-0.04*spd; p.vy=p.vy*(1-0.04*spd)+(p.k==='spark'||p.k==='rock'?0.25:-0.02)*spd; p.l-=spd; } if(p.l<=0){ parts.splice(i,1); continue; }
        if(p.k==='dust'){ g.fillStyle=`rgba(${p.c},${0.35*p.l/p.L})`; g.beginPath(); g.arc(p.x,p.y,p.r*(1.6-p.l/p.L),0,Math.PI*2); g.fill(); }
        else if(p.k==='rock'){ g.fillStyle=`rgb(${p.c})`; g.fillRect(p.x,p.y,p.r,p.r); }
        else { g.fillStyle=`rgba(${p.c},${p.l/p.L})`; g.fillRect(p.x,p.y,2.6,2.6); } }
      if(parts.length>700) parts.splice(0,parts.length-700);
      if(window._cineBG) window._cineBG.drawFront(g,t,red); }
    // ═════ lớp phủ màn hình ═════
    g.setTransform(SC_,0,0,SC_,0,0);
    if(si===14) endCard(u);
    if(t<0.8){ g.fillStyle=`rgba(0,0,0,${1-t/0.8})`; g.fillRect(0,0,VW,VH); }
    for(const b of [SC[2],SC[7],SC[11]]){ const d=Math.abs(t-b); if(d<0.1){ g.fillStyle=`rgba(0,0,0,${1-d/0.1})`; g.fillRect(0,0,VW,VH); } }   // chuyển phần: chớp đen rất nhanh
    if(si===6 && u>=3.0 && u<3.04){ g.fillStyle=`rgba(255,255,255,${0.8*(1-seg(u,3.0,3.04))})`;   // slow-mo kéo dài chớp → rút ngắn lại
      g.fillRect(0,0,VW,VH); }
    if(si===11 && u>=2.7 && u<2.73){ g.fillStyle='rgba(255,240,240,0.8)'; g.fillRect(0,0,VW,VH); }
    animeFX(t);
    const bar=si===14?0:58; g.fillStyle='#000'; g.fillRect(0,0,VW,bar); g.fillRect(0,VH-bar,VW,bar);
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
