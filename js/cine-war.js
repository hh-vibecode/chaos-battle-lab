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
    angel:av('holycat','rageAvatarUrl'), friend:av('friend','skill4AvatarUrl'),
    hand:{} };
  for(const k of ['crawlA','crawlB','slap','grip','lunge']) IMG.hand[k]=A('assets/img/scaredhamster/HAND_'+k+'.webp');
  const HM={crawlA:{w:391,h:204,wy:74},crawlB:{w:333,h:203,wy:85},slap:{w:372,h:178,wy:92},grip:{w:333,h:238,wy:107.5},lunge:{w:382,h:315,wy:167}};
  const RO=()=>{ try{ return (typeof roster!=='undefined' && roster) || []; }catch(e){ return []; } };
  const NAMED=new Set(['stalincat','feuerkatze','evilgary','gary','evillarry','gigachad','chonkydog','chillguy','spidercat','ricardo','doge','cheems','electricguitarcat','pianocat','bongocat','mosquitoviolin','maxwell','uiacat','kingcheems','samuraicheems','holycat','friend']);
  // ── tiện ích ──
  const prep=im=>{ if(im._cp) return im._cp; if(!im.naturalWidth) return null;
    try{ const w=im.naturalWidth, h=im.naturalHeight, c=document.createElement('canvas'); c.width=w; c.height=h; const x=c.getContext('2d'); x.drawImage(im,0,0);
      const d=x.getImageData(0,0,w,h), px=d.data; let x0=w,y0=h,x1=0,y1=0, cut=0;
      for(let yy=0;yy<h;yy+=2) for(let xx=0;xx<w;xx+=2) if(px[(yy*w+xx)*4+3]>40){ if(xx<x0)x0=xx; if(xx>x1)x1=xx; if(yy<y0)y0=yy; if(yy>y1)y1=yy; }
      if(x1<x0){ x0=0;y0=0;x1=w-1;y1=h-1; }
      for(let xx=x0;xx<=x1;xx++) if(px[(y1*w+xx)*4+3]>120) cut++;
      if(cut>(x1-x0)*0.25){ const F=Math.round((y1-y0)*0.18); for(let yy=y1-F;yy<=y1;yy++){ const k=(y1-yy)/F; for(let xx=x0;xx<=x1;xx++){ const i=(yy*w+xx)*4+3; px[i]=px[i]*k; } } x.putImageData(d,0,0); }
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
  function monster(x,y,h,flip,a,rot,fall){ shadow(x,y,h*0.22,0.3*(a==null?1:a)); actor(IMG.soul,x,y,h,{flip,a,rot:(rot||0)+(fall?fall*1.4*(flip?-1:1):0),sy:fall?1-fall*0.4:1}); }
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
    g.save(); g.globalAlpha=a; g.translate(x,yB); if(rot) g.rotate(rot); g.translate(-x,-yB); g.shadowColor='rgba(255,0,0,0.7)'; g.shadowBlur=24; g.drawImage(F.c,x-w/2,top,F.c.width*k,F.c.height*k); g.restore();
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
  const SC=[0,4.5,9,13,16,19,22,26.5,33,37,41,48,53,60,63.5,70];
  const DUR=SC[15];
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
    // nền xa: 2 meme khổng lồ đấu Evil Larry
    { const pg=lunge(t,0,3.2), pc=lunge(t,2,2.6); actor(IMG.larry,1230,690,560,{flip:true,glow:'rgba(170,0,255,0.6)',gb:26,rot:-0.05*pg});
      actor(IMG.gigaBig,980+pg*70,700,400,{rot:0.12*pg}); actor(IMG.chonky,800+pc*60,705,320,{rot:0.1*pc});
      if(pg>0.9) sparks(1120,520,4,'255,220,190',6); }
    const D=[];
    crowd.forEach((c,i)=>{ const x=-330+(i%9)*62, y=660+Math.floor(i/9)*40+((i*13)%20); D.push({y,f:()=>{ const b=Math.abs(Math.sin((t+c.ph)*8))*3; shadow(x,y,c.h*0.3,0.3); actor(c.im,x+lunge(t,c.ph,6)*16,y-b,c.h,{rot:0.08}); }}); });
    FRONT.forEach((P,i)=>{ const m=team[(i+2)%team.length]; const l=lunge(t,P.ph,5.5), lm=lunge(t,P.ph+2.2,5.5);
      D.push({y:P.y,f:()=>{ shadow(P.x,P.y,32,0.35); actor(m.im,P.x+l*28,P.y-Math.abs(Math.sin(t*7+i))*3,96,{rot:0.18*l}); monster(P.x+110-lm*30,P.y,104,true,1,-0.15*lm);
        if(l>0.92||lm>0.92){ if(Math.random()<0.4) sparks(P.x+55,P.y-50,6,'255,210,150',4); } }}); });
    for(let i=0;i<14;i++){ const x=520+(i%7)*80+hash(i+90)*30, y=640+Math.floor(i/7)*60+hash(i+91)*20; D.push({y,f:()=>monster(x-lunge(t,i,4)*20,y,96+hash(i)*20,true,0.95,0)}); }
    // tâm trận: Evil Gary đấu Stalin + Catler
    D.push({y:900,f:()=>{ const gx=700, sx=560, l=lunge(t,1,3.6), lc=lunge(t,3,4.2);
      addGlow(gx,840,150,0.35,'255,30,30'); addGlow(sx,840,120,0.3,'120,190,255');
      shadow(gx,900,50); actor(IMG.egary,gx,900,115,{flip:true,glow:'rgba(255,0,0,0.8)',gb:18});
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
    shadow(gx,gy,55); actor(IMG.egary,gx+push*30,gy,135,{flip:true,glow:'rgba(255,0,0,0.85)',gb:22,rot:Math.sin(t*14)*0.02});
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
      if(cut>0) halves(mx,my,110,true,cut,-0.15+((i%3)-1)*0.25); else monster(mx,my,110,true,1,Math.sin(t*3+i)*0.05);
      if(cut>0 && cut<0.25) slash(mx-70,my-50-((i%3)-1)*20,mx+70,my-70+((i%3)-1)*20,1-cut*4,'230,190,255'); }
    if(k>0.05 && k<1){ g.save(); g.lineCap='round'; for(let L=0;L<5;L++){ const off=(L-2)*16, P=[]; for(let s=0;s<16;s++) P.push([x-s*36, y-55+off+(Math.random()-0.5)*10]);
      for(const [lw,c,cmp] of [[12,'rgba(150,60,255,0.2)','lighter'],[5,'rgba(220,170,255,0.9)','lighter'],[2,'rgba(5,0,10,1)','source-over']]){ g.globalCompositeOperation=cmp; g.strokeStyle=c; g.lineWidth=lw*(1-L*0.08); g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); } } g.restore(); }
    actor(IMG.spider,x,y,115,{rot:0.22}); }
  const camD=u=>[lerp(-40,820,eio(seg(u,0.2,2.6))),730,1.05];

  // ═════════ E — CHILL GUY: ăn đòn vẫn chill → một cú đá ═════════
  function scE(u,t){ const x=300, y=850, kick=seg(u,1.85,2.05), fly=seg(u,2.05,2.9);
    const hitA=seg(u,0.35,0.55), hitB=seg(u,1.0,1.2);
    monster(x-150+Math.sin(Math.PI*hitA)*70,y-10,118,false,1,Math.sin(Math.PI*hitA)*0.3);
    monster(x+150-Math.sin(Math.PI*hitB)*60+eout(fly)*620,y+10-Math.sin(Math.PI*fly)*240,124,true,1,fly*7+(hitB>0&&hitB<1?-0.3:0));
    if(u>=0.45 && u<0.5){ sparks(x-40,y-80,10); shake=4; } if(u>=1.1 && u<1.15){ sparks(x+40,y-80,10); shake=4; }
    shadow(x,y,40); if(kick>0 && u<2.7) actor(IMG.chillKick,x+kick*70,y-kick*50,165); else actor(IMG.chill,x,y-Math.abs(Math.sin(u*2))*1.5,138,{rot:(hitA>0&&hitA<1?0.04:0)+(hitB>0&&hitB<1?-0.04:0)});
    if(u>=2.05 && u<2.12) shake=18; impact(x+150,y-90,seg(u,2.05,2.45),170); }
  const camE=u=>keys(u,[[0,300,760,1.45],[1.8,300,760,1.6],[2.05,330,750,1.75],[2.15,380,740,1.3],[3,440,740,1.2]]);

  // ═════════ F — RICARDO: lắc né rồi tung cú đấm ═════════
  function scF(u,t){ const x=290, y=850, pun=seg(u,1.85,2.0), fly=seg(u,2.0,2.9);
    g.save(); g.globalCompositeOperation='lighter'; for(const [w,al] of [[1,0.07],[0.75,0.07],[0.5,0.08]]){ const sg=g.createLinearGradient(x,250,x,y); sg.addColorStop(0,'rgba(255,245,220,0)'); sg.addColorStop(1,`rgba(255,245,220,${al})`);
      g.fillStyle=sg; g.beginPath(); g.moveTo(x-25*w,250); g.lineTo(x+25*w,250); g.lineTo(x+150*w,y+15); g.lineTo(x-150*w,y+15); g.closePath(); g.fill(); } g.restore(); addGlow(x,y,140,0.25,'255,240,210');
    const sw1=seg(u,0.4,0.7), sw2=seg(u,1.1,1.4);
    monster(x-150+Math.sin(Math.PI*sw1)*80,y,120,false,1,Math.sin(Math.PI*sw1)*0.35);
    monster(x+160-Math.sin(Math.PI*sw2)*70+eout(fly)*600,y-Math.sin(Math.PI*fly)*200,124,true,1,fly*6);
    const dodge=Math.sin(Math.PI*sw1)*36-Math.sin(Math.PI*sw2)*36, fr=IMG.rcFr[Math.floor(u*6)%4];
    shadow(x,y,45); actor(fr.naturalWidth?fr:IMG.ricardo,x+dodge+pun*80*(1-fly),y,158,{rot:pun*0.28*(1-fly)});
    if(u>=2.0 && u<2.07) shake=18; impact(x+150,y-85,seg(u,2.0,2.4),160); }
  const camF=u=>keys(u,[[0,300,760,1.4],[1.85,310,760,1.5],[2.0,340,750,1.7],[2.1,380,740,1.25],[3,420,740,1.15]]);

  // ═════════ G — CHONKY hoá khổng lồ, đè vỡ mặt đất, sóng đất cuốn trôi quái vật ═════════
  function scG(u,t){ const x=260, y=880, grow=eio(seg(u,0.1,1.6)), fall=ein(seg(u,1.7,2.25)), wave=seg(u,2.25,4.2), wx=lerp(380,1500,eout(wave));
    cracks(x+260,y,seg(u,2.25,2.9),700,3);
    for(let i=0;i<9;i++){ const mx=520+i*95, my=y-40+(i%3)*45, k=wx>mx?seg(wx,mx,mx+500):0; if(k>=1) continue;
      monster(mx+k*480,my-Math.sin(Math.PI*k)*170,108,true,1-k*0.4,k*5); }
    if(wave>0 && wave<1){ g.save(); const gr=g.createLinearGradient(wx-260,0,wx+40,0); gr.addColorStop(0,'rgba(60,40,32,0)'); gr.addColorStop(1,'rgba(70,46,36,0.85)'); g.fillStyle=gr; g.beginPath(); g.moveTo(wx-260,y+60); g.quadraticCurveTo(wx-60,y-120,wx+40,y-40); g.lineTo(wx+40,y+60); g.closePath(); g.fill(); g.restore();
      if(Math.random()<0.8) rocks(wx,y,3,6); if(Math.random()<0.6) dust(wx,y,3,80); }
    const h=lerp(120,560,grow); shadow(x+fall*h*0.55,y,h*0.4,0.5); actor(IMG.chonky,x,y,h,{rot:fall*1.45+(1-fall)*Math.sin(u*6)*0.05*grow,sx:1+0.05*Math.sin(u*8)*grow*(1-fall)});
    if(u>=2.25 && u<2.33){ shake=28; dust(x+300,y,40,400); rocks(x+300,y,30,4); } impact(x+330,y-60,seg(u,2.25,2.7),300); }
  const camG=u=>keys(u,[[0,360,760,1.0],[1.6,420,680,0.62],[2.3,520,700,0.6],[4.5,900,700,0.62]]);

  // ═════════ H — KING CHEEMS bị kỵ sĩ vây → MỘT NHÁT CẮT · Joninn tra kiếm vào vỏ → cả bầy chết ═════════
  const HK={x:250,y:830}, HJ={x:470,y:1040};
  function scH(u,t){ const close=eio(seg(u,0,2.6)), cut=u>=3.0, die=seg(u,4.0,5.6), sheath=seg(u,3.1,3.9);
    g.save(); g.fillStyle=`rgba(0,0,0,${0.35*close})`; g.fillRect(-1500,-1500,3500,3500); g.restore();   // tối dần, căng thẳng
    const N=9; for(let i=0;i<N;i++){ const a=Math.PI+(i/(N-1))*Math.PI*1.0-0.0, R=lerp(330,175,close), mx=HK.x+Math.cos(a)*R*1.2, my=HK.y-30+Math.sin(a)*70*(i%2?1:0.6)+40;
      const raise=seg(u,2.2,2.9)*0.4; if(die>0) halves(mx,my,128,Math.cos(a)>0,die,-0.2); else monster(mx,my,128,Math.cos(a)>0,1,-raise*(Math.cos(a)>0?-1:1)); }
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
    for(let i=0;i<10;i++){ const mx=300+i*70, my=700+(i%3)*60, k=seg(u,0.1+i*0.08,1.1+i*0.08); if(k<1) halves(mx,my,100,true,k,-0.1+(i%2)*0.3); }
    chaosSouls(t,14,QX-200,300-u*80,900,260);
    addGlow(QX,820,520*rise,0.55*rise,'255,40,20'); g.save(); g.fillStyle=`rgba(15,0,0,${0.9*rise})`; g.beginPath(); g.ellipse(QX,850,360*rise,70*rise,0,0,Math.PI*2); g.fill(); g.restore(); cracks(QX,850,rise,620,11);
    demon(QX,850-lerp(0,460,rise),1500,rise,seg(u,2.6,3.8),t,0);
    shadow(gx,880,50); actor(IMG.egary,gx,880,120,{flip:true,glow:'rgba(255,0,0,0.8)',gb:18,rot:Math.sin(t*16)*0.04});
    if(u>=1.4 && u<1.5) shake=14; }
  const camI=u=>keys(u,[[0,700,700,0.6],[1.4,820,640,0.5],[4,QX-60,420,0.4]]);

  // ═════════ J — Gigachad khổng lồ húc quỷ ngã ngửa vào vùng phong ấn ═════════
  function scJ(u,t){ const run=ein(seg(u,0.3,1.9)), hit=u>=1.9, fallD=eio(seg(u,1.95,3.3));
    demon(QX+fallD*160,390+fallD*420,1500,1,1,t,fallD*1.25);
    const gx=lerp(250,QX-420,run); if(run>0 && !hit) for(let k=1;k<5;k++) actor(IMG.gigaBig,gx-k*70,900,640,{a:0.3-k*0.06,rot:0.25});
    shadow(gx,900,170,0.5); actor(IMG.gigaBig,gx,900,640,{rot:run>0?0.25:0});
    if(u>=1.9 && u<1.98){ shake=30; sparks(QX-260,520,60,'255,230,200',12); } impact(QX-260,520,seg(u,1.9,2.4),320);
    if(u>=3.2 && u<3.28){ shake=26; dust(QX+150,850,40,500); rocks(QX+150,850,30,0); }
    const sk=seg(u,3.3,4); if(sk>0){ g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle=`rgba(140,220,255,${sk})`; g.lineWidth=4; g.beginPath(); g.ellipse(QX+160,860,460*eout(sk),120*eout(sk),0,0,Math.PI*2); g.stroke(); g.restore(); } }
  const camJ=u=>keys(u,[[0,600,640,0.48],[1.9,850,620,0.46],[2.0,900,660,0.45],[4,1000,700,0.5]]);

  // ═════════ K — PHONG ẤN ÂM NHẠC 4 GÓC + HOLY ANGEL · quỷ chìm xuống địa ngục ═════════
  const SE={x:QX+160,y:860,rx:380,ry:105};
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
    C4.forEach(([x,y,im,c,h],i)=>{ addGlow(x,y-h*0.4,h*0.9,0.45*fade,c); shadow(x,y,h*0.3,0.4); actor(im,x,y-(i===3?40+Math.sin(t*3)*8:0),h);
      if(on>0 && fade>0.05) for(let q=0;q<4;q++){ const f=(t*0.9+q/4+i*0.13)%1, px=lerp(x,SE.x,f), py=lerp(y-h*0.5,SE.y-60,f)-Math.sin(f*Math.PI)*90; addGlow(px,py,16,on*fade*(1-f*0.3),c); if(q%2) text(['♪','♫'][q%2?0:1],px,py,22,`rgba(${c},${on*fade})`); } });
    // Holy Angel Cat trấn giữ trên đầu phong ấn + cột sáng
    if(ang>0){ const ax=SE.x, ay=lerp(-200,330,ang); addGlow(ax,ay-80,280,0.6*ang*fade,'255,250,225'); actor(IMG.angel,ax,ay,250,{a:ang*fade});
      if(col>0 && fade>0){ g.save(); g.globalCompositeOperation='lighter'; for(const [w,al] of [[200,0.22],[90,0.5],[34,0.95]]){ const gr=g.createLinearGradient(0,ay,0,SE.y); gr.addColorStop(0,`rgba(255,250,230,${al*col*fade})`); gr.addColorStop(1,`rgba(255,240,200,${al*col*fade*0.6})`); g.fillStyle=gr; g.fillRect(ax-w/2,ay-40,w,SE.y-ay+40); } g.restore(); addGlow(SE.x,SE.y-40,300,0.6*col*fade,'255,250,230'); } }
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
      shadow(x+130,y,50); actor(IMG.egary,x+130,y,lerp(125,100,seg(u,2.8,3.2)),{flip:true,sy:0.86,glow:'rgba(255,0,0,0.85)',gb:20,rot:Math.sin(t*18)*0.04});
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
    shadow(gx,860,55,0.4*(1-drag)); actor(IMG.egary,gx+drag*280,860-drag*50,lerp(125,45,drag),{a:1-drag,flip:true,glow:'rgba(255,0,0,0.85)',gb:18,rot:Math.sin(t*16)*0.07*grab});
    if(grab>0){ const ga=grab*(1-seg(u,5.8,6.2)); shadowHand('grip',1700,250,gx+drag*280-150,800-drag*50,0.85*(1-drag*0.3),ga,1); shadowHand('grip',1700,1150,lx+drag*320-200,660-drag*30,1.05*(1-drag*0.3),ga,-1); }
    // các meme lùi lại
    team.slice(1,7).forEach((m,i)=>{ const x=lerp(160,-40,back)-i*70+(i%2)*20, y=880+(i%3)*28; shadow(x,y,30,0.35); actor(m.im,x,y,i===0?108:96,{flip:back>0&&back<1,rot:Math.sin(t*9+i)*0.03*back}); });
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
    team.slice(1,6).forEach((m,i)=>{ if(m.k==='doge') return; const x=i%2?120-i*25:470+i*22, y=870+(i%2)*20; shadow(x,y,30,0.35); actor(m.im,x,y,98); });
    shadow(sx,sy,60); actor(IMG.stalin,sx,sy,150,{rot:lerp(-1.45,0,up)});
    const hc=prep(IMG.hammer); if(hc){ g.save(); g.translate(sx+64,sy-lerp(8,70,up)); g.rotate(lerp(-1.55,0.05,up)); g.drawImage(hc.src,hc.sx,hc.sy,hc.sw,hc.sh,-32,-32,64,64*hc.sh/hc.sw); g.restore(); }
    const dx=lerp(620,sx+105,eout(seg(u,0,0.7))); shadow(dx,sy,40); actor(IMG.doge,dx,sy-(u<0.7?Math.abs(Math.sin(u*14))*6:0),118,{flip:true,rot:-0.12*Math.sin(Math.PI*seg(u,0.7,2.4))}); }
  const camN=u=>keys(u,[[0,320,770,1.2],[2.4,320,740,1.0],[3.5,320,640,0.7]]);
  // ═════════ O — màn đen kết ═════════
  function endCard(u){ g.fillStyle=`rgba(0,0,0,${seg(u,0,0.7)})`; g.fillRect(0,0,VW,VH); const v=u-0.8; if(v<=0) return;
    text('THAT IS THE END OF THE LORE',VW/2,VH*0.52,28,'#ffffff',null,'700 28px Georgia,serif',seg(v,0,0.7));
    if(v>3.0){ const w=v-3.0, k=seg(w,0,0.5); g.save(); g.font='900 38px Georgia,serif'; g.textAlign='center'; g.textBaseline='middle'; g.globalAlpha=k; g.fillStyle='#a30000'; g.fillText('BUT NOT MY…',VW/2,VH*0.6); g.restore();
      g.save(); g.fillStyle='#8f0000'; for(let i=0;i<18;i++){ const x=VW/2-115+hash(i)*230, L=seg(w,0.15+hash(i+5)*0.6,1.3+hash(i+5)*1.4)*(25+hash(i+9)*85); if(L<=0) continue; g.fillRect(x-1.1,VH*0.6+12,2.2,L); g.beginPath(); g.arc(x,VH*0.6+13+L,2.8,0,Math.PI*2); g.fill(); } g.restore(); }
    if(v>3.6){ const w=v-3.6, open=eio(seg(w,0.3,1.4)), c=prep(IMG.friend); if(c){ const W=240, H=W*c.sh/c.sw, x=VW/2-W/2, y=VH*0.47-H-30;
        g.save(); g.globalAlpha=seg(w,0,0.6); g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,x,y,W,H);
        g.fillStyle='#000'; const ey=y+H*0.44; g.fillRect(x,ey-H*0.14,W,H*0.14*(1-open)+0.5); g.fillRect(x,ey+H*0.14-H*0.14*(1-open),W,H*0.14*(1-open)+0.5);
        g.fillStyle='rgba(165,0,0,0.9)'; for(let i=0;i<9;i++){ const bx=x+W*(0.3+hash(i+30)*0.45), L=seg(w,0.7+hash(i)*0.5,1.9+hash(i)*1.2)*(18+hash(i+3)*55); g.fillRect(bx-1.5,y+H*0.82,3,L); g.beginPath(); g.arc(bx,y+H*0.82+L,3.4,0,Math.PI*2); g.fill(); }
        g.restore(); } } }

  const SCN=[[scA,camA],[scB,camB],[scC,camC],[scD,camD],[scE,camE],[scF,camF],[scG,camG],[scH,camH],[scI,camI],[scJ,camJ],[scK,camK],[scL,camL],[scM,camM],[scN,camN]];
  function keys(u,K){ for(let i=0;i<K.length-1;i++){ const a=K[i], b=K[i+1]; if(u>=a[0] && u<b[0]){ const k=(b[0]-a[0]<0.05)?1:eio((u-a[0])/(b[0]-a[0])); return [lerp(a[1],b[1],k),lerp(a[2],b[2],k),lerp(a[3],b[3],k)]; } } const L=K[K.length-1]; return [L[1],L[2],L[3]]; }
  // 🔊 tiếng (thời điểm tuyệt đối)
  const SFX=[[0.3,'titan_roar',0.5,3],[1.6,'hit_heavy',0.6],[2.9,'holy_thunder',0.6],[3.6,'hit_mid',0.6],
    [5.7,'gigachad_roar',0.8,2],[5.75,'hit_heavy',1.0],[6.4,'larry_horn',0.6,2],[7.75,'vine_boom',1.0],[7.8,'cdg_grow',0.7],[8.4,'hit_heavy',1.0],
    [9.6,'stalin_hammer_hit',0.9],[10.6,'stalin_hammer_return',0.6],[10.65,'burn_loop',0.5,1],[10.7,'hit_heavy',0.8],[11.3,'holy_thunder',0.8],[11.3,'flyingcat_laser',0.6,2.6],[12.9,'vine_boom',1.0],
    [13.4,'spidercat_hit',0.9],[13.9,'ninja_slash',0.7],[14.4,'ninja_slash',0.7],[14.9,'ninja_slash',0.7],[15.3,'spidercat_hit',0.8],
    [16.4,'punch1',0.7],[17.05,'punch1',0.7],[18.0,'chillguy_kick',1.0],[18.05,'vine_boom',0.9],
    [19.0,'ricardo_music',0.7,2.0],[21.0,'hit_heavy',1.0],[21.0,'punch2',0.9],
    [22.2,'cdg_grow',0.9],[24.25,'vine_boom',1.0],[24.25,'creeper_explosion',0.8],[24.5,'wg_dragon_impact',0.8],
    [26.6,'sm_form',0.6],[29.5,'sm_schwing',1.0],[29.6,'ninja_slash',0.9],[30.4,'sm_fin',1.0],[30.6,'sm_drip',0.6],[30.6,'death_break',0.8],
    [34.3,'titan_roar',1.0,3],[34.4,'gary_titan_roar',0.6,3],[34.5,'fd_roar',0.7,3],
    [37.4,'gigachad_roar',0.9,2],[38.9,'vine_boom',1.0],[38.9,'hit_heavy',1.0],[40.2,'wg_dragon_impact',1.0],
    [41.0,'piano_giorno',0.55,4],[41.2,'guitar_jojo',0.5,4],[41.4,'tribe_1',0.6,4],[41.6,'mosquito_violin',0.55,4],[42.8,'hl_choir',1.0,5],[44.0,'hl_laser',1.0],[44.5,'titan_roar',0.8,3],[47.5,'holy_thunder',1.0],
    [48.3,'sc_terror',0.6],[49.0,'ultimate_charge_2',0.8],[50.7,'vine_boom',1.0],[50.7,'holy_thunder',0.8],[51.5,'uia_tele_dbz',1.0],
    [53.9,'holy_thunder',0.6],[54.6,'stalin_hammer_return',0.7],[55.15,'hm_claw1',1.0],[55.4,'vine_boom',1.0],[55.6,'hm_stalker',0.9],[56.1,'hm_crawl',0.8],[57.2,'hm_claw2',0.9],[57.4,'sc_terror',0.7],[58.0,'gp_souls',0.5],
    [67.2,'fr_thunder',0.8],[68.8,'fr_bite',0.7]];
  // 🎵 nhạc nền (Audio riêng, bám thời gian thật của phim)
  let MUS=[];
  function musSetup(){ musStop(); const mk=(src,a,b,vol,o)=>Object.assign({el:Object.assign(new Audio(src),{preload:'auto'}),a,b,vol},o||{});
    MUS=[ mk('assets/audio/cine_horns.mp3',0,27,0.8,{fi:0.6,fo:0.8}), mk('assets/audio/cine_epic.mp3',26.5,48,0.8,{loop:true,fi:0.5,fo:1.0}),
      mk('assets/audio/cine_heart_fast.mp3',48,53,0.7,{loop:true,fo:0.3}), mk('assets/audio/cine_horns.mp3',60,64.2,0.45,{fi:1.2,fo:1.0}), mk('assets/audio/fr_song.mp3',67.3,DUR,0.8,{fi:0.3}) ];
    for(const m of MUS) m.el.loop=!!m.loop; }
  function musTick(tR){ for(const m of MUS){ const on=!paused && tR>=m.a && tR<m.b;
      if(!on){ if(!m.el.paused) m.el.pause(); continue; }
      const pos=tR-m.a, d=m.el.duration||1e9;
      if(!m.loop && pos>=d){ if(!m.el.paused) m.el.pause(); continue; }
      if(m.el.paused){ try{ m.el.currentTime=m.loop?pos%d:pos; }catch(e){} m.el.play().catch(()=>{}); }
      else if(!m.loop && Math.abs(m.el.currentTime-pos)>0.35){ try{ m.el.currentTime=pos; }catch(e){} }
      let v=m.vol; if(m.fi) v*=seg(tR,m.a,m.a+m.fi); if(m.fo) v*=1-seg(tR,m.b-m.fo,m.b);
      if(tR>=SC[7]+1.2 && tR<SC[7]+3.0) v*=lerp(1,0.15,seg(tR,SC[7]+1.2,SC[7]+2.4));   // King bị vây: nhạc lặng dần trước nhát cắt
      m.el.volume=clamp(v,0,1); } }
  function musStop(){ for(const m of MUS){ try{ m.el.pause(); }catch(e){} } }

  function frame(now){
    raf=requestAnimationFrame(frame);
    const t=Math.min(paused?pauseT:(now-t0)/1000, DUR);
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
      for(let i=parts.length-1;i>=0;i--){ const p=parts[i]; if(!paused){ p.x+=p.vx; p.y+=p.vy; p.vx*=0.96; p.vy=p.vy*0.96+(p.k==='spark'||p.k==='rock'?0.25:-0.02); p.l--; } if(p.l<=0){ parts.splice(i,1); continue; }
        if(p.k==='dust'){ g.fillStyle=`rgba(${p.c},${0.35*p.l/p.L})`; g.beginPath(); g.arc(p.x,p.y,p.r*(1.6-p.l/p.L),0,Math.PI*2); g.fill(); }
        else if(p.k==='rock'){ g.fillStyle=`rgb(${p.c})`; g.fillRect(p.x,p.y,p.r,p.r); }
        else { g.fillStyle=`rgba(${p.c},${p.l/p.L})`; g.fillRect(p.x,p.y,2.6,2.6); } }
      if(parts.length>700) parts.splice(0,parts.length-700);
      if(window._cineBG) window._cineBG.drawFront(g,t,red); }
    // ═════ lớp phủ màn hình ═════
    g.setTransform(SC_,0,0,SC_,0,0);
    if(si===14) endCard(u);
    if(t<0.8){ g.fillStyle=`rgba(0,0,0,${1-t/0.8})`; g.fillRect(0,0,VW,VH); }
    for(const b of [SC[3],SC[8],SC[11]]){ const d=Math.abs(t-b); if(d<0.1){ g.fillStyle=`rgba(0,0,0,${1-d/0.1})`; g.fillRect(0,0,VW,VH); } }   // chuyển phần: chớp đen rất nhanh
    if(si===7 && u>=3.0 && u<3.12){ g.fillStyle=`rgba(255,255,255,${0.8*(1-seg(u,3.0,3.12))})`; g.fillRect(0,0,VW,VH); }
    if(si===9 && u>=1.9 && u<2.0){ g.fillStyle='rgba(255,255,255,0.7)'; g.fillRect(0,0,VW,VH); }
    if(si===11 && u>=2.7 && u<2.8){ g.fillStyle='rgba(255,240,240,0.8)'; g.fillRect(0,0,VW,VH); }
    const bar=si===14?0:58; g.fillStyle='#000'; g.fillRect(0,0,VW,bar); g.fillRect(0,VH-bar,VW,bar);
    musTick(t);
    markOnly=false;
    if(panel) panel.update();
  }
  let SC_=2;
  const curT=()=>Math.min(paused?pauseT:(performance.now()-t0)/1000,DUR);
  function seek(sec){ sec=clamp(sec,0,DUR); try{ stopAllLongSfx(); }catch(e){} parts=[]; played={}; markOnly=true; if(paused) pauseT=sec; else t0=performance.now()-sec*1000; }
  function toggle(){ if(paused){ if(pauseT>=DUR-0.05) pauseT=0; t0=performance.now()-pauseT*1000; paused=false; } else { pauseT=curT(); paused=true; } }
  function stop(){ if(raf) cancelAnimationFrame(raf); raf=null; musStop(); try{ stopAllLongSfx(); }catch(e){} if(window._cinePanelRemove) _cinePanelRemove(); panel=null; if(overlay) overlay.remove(); overlay=null; }
  window._cineWar=function(){
    if(overlay) return;
    overlay=document.createElement('div');
    overlay.style.cssText='position:fixed;inset:0;z-index:99999;background:#000;display:flex;align-items:center;justify-content:center;';
    cv=document.createElement('canvas'); cv.width=1080; cv.height=1920; SC_=cv.width/VW;
    cv.style.cssText='height:100vh;max-width:100vw;aspect-ratio:9/16;object-fit:contain;';
    g=cv.getContext('2d');
    overlay.appendChild(cv); document.body.appendChild(overlay);
    if(window._cinePanelMake) panel=_cinePanelMake(overlay,{ title:'Memes Assemble II', dur:()=>DUR, t:curT, playing:()=>!paused && curT()<DUR,
      toggle:()=>{ if(!paused && curT()>=DUR) seek(0); else toggle(); }, seek, replay:()=>{ paused=false; setup(); seek(0); markOnly=false; }, close:()=>{ stop(); if(window.openCinema) openCinema(); } });
    try{ stopAllBattleMusic(); }catch(e){}
    try{ window._cineBG && window._cineBG.prepare && window._cineBG.prepare(); }catch(e){}
    paused=false; setup(); musSetup(); t0=performance.now(); raf=requestAnimationFrame(frame);
  };
  window._cineWarStop=stop;
  window._cineWarPause=t=>{ paused=true; pauseT=t; parts=[]; };
  window._cineWarCanvas=()=>cv;
})();
