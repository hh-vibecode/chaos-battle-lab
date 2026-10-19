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
    wdemon:A('assets/img/screamcat/SC_DEMON_IMG.webp'), soul:A('assets/img/evilgary/EG_SOUL_IMG.webp'), wolf:A('assets/img/susdog/SD_WOLF.webp'),
    hammer:A('assets/img/stalincat/STALIN_HAMMER_IMG.webp'), sickle:A('assets/img/stalincat/STALIN_SICKLE_IMG.webp'), cross:A('assets/img/stalincat/STALIN_CROSS_IMG.webp'),
    giga:av('gigachad'), gigaBig:av('gigachad','rageAvatarUrl'), chonky:av('chonkydog'), chill:av('chillguy'), chillKick:av('chillguy','skill1AvatarUrl'), spider:av('spidercat'),
    ricardo:av('ricardo'), rcFr:[0,1,2,3].map(i=>A('assets/img/ricardo/RC_FR_'+i+'.webp')), doge:av('doge'), dogeBuff:av('doge','rageAvatarUrl'), dogeHit:av('doge','rageAttackAvatarUrl'),
    cheems:av('cheems'), mallet:A('assets/img/cheems/CHEEMS_MALLET_IMG.webp'), guitar:av('electricguitarcat'), piano:av('pianocat'), bongo:av('bongocat'), mosq:av('mosquitoviolin','attackAvatarUrl'),
    maxwell:av('maxwell'), dsword:A('assets/img/maxwell/MAXWELL_DIAMOND_SWORD_IMG.webp'), uia:av('uiacat'), uiaSpin:av('uiacat','attackAvatarUrl'),
    king:av('kingcheems'), knight:A('assets/img/kingcheems/DOGE_KNIGHT_IMG.webp'), joninn:av('samuraicheems'), joninnR:av('samuraicheems','rageAvatarUrl'),
    angel:av('holycat','rageAvatarUrl'), friend:av('friend','skill4AvatarUrl'), grin:A('assets/img/friend/FR_GRIN_IMG.webp'), berserk:av('berserkcat'), berserkAtk:av('berserkcat','attackAvatarUrl'),   // 👀😁 grin = chỉ đôi mắt + hàm răng của Friend (đã gỡ viền mặt)
    gigaLift:A('assets/img/cine/CINE_GIGA_LIFT.webp'), gigaPunch:A('assets/img/cine/CINE_GIGA_PUNCH.webp'), smSlash:A('assets/img/cine/CINE_SM_SLASH.webp'), akaBg:A('assets/img/cine/CINE_AKA_BG.webp'), smBack:A('assets/img/cine/CINE_SM_BACK.webp'), bkBack:A('assets/img/cine/CINE_BK_BACK.webp'),
    larryMage:av('evillarry','introAvatarUrl'), bibi:av('bibilabu'), bibiBack:av('bibilabu','attackAvatarUrl'), catlerAtk:av('feuerkatze','attackAvatarUrl'),
    clapIdle:av('clappingcat'), clapUp:av('clappingcat','rageAvatarUrl'), clap:['skill1AvatarUrl','skill2AvatarUrl','skill3AvatarUrl'].map(f=>av('clappingcat',f)),
    hand:{} };
  for(const k of ['crawlA','crawlB','slap','grip','lunge']) IMG.hand[k]=A('assets/img/scaredhamster/HAND_'+k+'.webp');
  const HM={crawlA:{w:391,h:204,wy:74},crawlB:{w:333,h:203,wy:85},slap:{w:372,h:178,wy:92},grip:{w:333,h:238,wy:107.5},lunge:{w:382,h:315,wy:167}};
  // 🧭 hướng quay GỐC của ảnh: 'l' = quay trái, 'r' = quay phải (còn lại nhìn thẳng). face(im,toRight) → có cần lật không
  const FACE={bibilabu:'l',gigachad:'l',evilgary:'l',gary:'l',chonkydog:'l',chillguy:'l',cheems:'l',kingcheems:'l',samuraicheems:'l',doge:'l',mosquitoviolin:'r',maxwell:'r',uiacat:'r',berserkcat:'r'};
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
      im._cp={src:c, sx:x0, sy:y0, sw:x1-x0+1, sh:y1-y0+1, bust:cut>(x1-x0)*0.6}; }catch(e){ im._cp={src:im, sx:0, sy:0, sw:im.naturalWidth, sh:im.naturalHeight}; }
    return im._cp; };
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)), seg=(t,a,b)=>clamp((t-a)/(b-a),0,1);
  const eio=x=>x*x*(3-2*x), eout=x=>1-Math.pow(1-x,3), ein=x=>x*x*x, lerp=(a,b,k)=>a+(b-a)*k;
  const back=x=>{ const c=1.70158; return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2); };
  const hash=n=>{ const s=Math.sin(n*127.1+311.7)*43758.5453; return s-Math.floor(s); };
  let cv, g, raf=null, t0=0, parts=[], played={}, overlay, shake=0, paused=false, pauseT=0, markOnly=false, panel=null, crowd=[];
  const sfx=(id,k,v,dur)=>{ if(played[id]) return; played[id]=1; if(markOnly) return; try{ playSample(k,v==null?1:v,dur||null); }catch(e){} };
  function actor(im,x,y,h,o){ o=o||{}; const c=prep(im); if(!c) return 0; const w=h*c.sw/c.sh;
    if(inIns&&c.bust&&!o.center&&!o.rot&&y>VH*0.72&&y<VH*1.0) y=VH*1.0+h*0.03;   // 🎬 cảnh cận: ảnh bán thân gần đáy khung → hạ xuống cho vết cắt nằm dưới mép khung
    g.save(); g.globalAlpha*=(o.a==null?1:o.a); g.translate(x,y); if(o.rot) g.rotate(o.rot); g.scale((o.flip?-1:1)*(o.sx||1),o.sy||1);
    if(o.glow){ g.shadowColor=o.glow; g.shadowBlur=o.gb||18; }
    if(o.filter) g.filter=o.filter;
    g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,-w/2,o.center?-h/2:-h,w,h); g.restore();
    if(c.bust&&!o.center&&!o.noCover&&!inIns&&Math.abs(o.rot||0)<0.5&&(o.a==null||o.a>0.05)) baseCover(x,y,w*(o.sx?Math.abs(o.sx):1),o.a==null?1:o.a);   // 🪨 ảnh bán thân (cắt ngang) đứng trên sân → gò bụi/gạch vụn che vết cắt
    return w; }
  // 🪨 gò bụi + gạch vụn ở chân (che vết cắt ngang của ảnh bán thân) — màu theo mặt đất từng cảnh (COVERC)
  let COVERC='42,20,18', inIns=false;
  function baseCover(x,y,w,a){ g.save(); g.globalAlpha*=a; const c=COVERC;
    for(let i=0;i<6;i++){ const ox=(i/5-0.5)*w*0.95, r=w*(0.2+0.07*hash(i*7+3)); puff(x+ox,y-r*0.12,r,0.95,c); }
    g.fillStyle=`rgb(${c})`; g.beginPath(); g.moveTo(x-w*0.62,y+3); for(let i=0;i<=10;i++){ const f=i/10, xx=x+(f-0.5)*w*1.15; g.lineTo(xx,y-w*(0.05+0.05*Math.sin(f*Math.PI))-w*0.025*hash(i+11)); } g.lineTo(x+w*0.62,y+3); g.closePath(); g.fill();   // gờ đất lởm chởm
    const v=c.split(',').map(Number); for(let i=0;i<7;i++){ const xx=x+(hash(i+21)-0.5)*w*1.1, yy=y-w*0.02-hash(i+22)*w*0.05, r=w*(0.025+0.035*hash(i+23)); g.fillStyle=`rgb(${v.map(q=>Math.min(255,q+10+hash(i+24)*18)|0).join(',')})`; g.beginPath(); g.moveTo(xx-r,yy+r*0.4); g.lineTo(xx-r*0.3,yy-r*0.7); g.lineTo(xx+r*0.8,yy-r*0.3); g.lineTo(xx+r,yy+r*0.4); g.closePath(); g.fill(); }   // gạch vụn
    g.restore(); }
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
  // 👹 BẦY QUÁI ĐA DẠNG (dựng từ ảnh có sẵn, lọc màu 1 lần rồi cache): 0 hồn ma gốc · 1 xương trắng · 2 xanh thối rữa · 3 đỏ máu · 4 tím · 5 bò trườn · 6 bóng tối mắt đỏ · 7 tro xám
  const MVDEF=[['soul',''],['soul','grayscale(1) brightness(1.55) contrast(1.15)'],['soul','hue-rotate(-75deg) saturate(1.5) brightness(0.85)'],['soul','hue-rotate(165deg) saturate(2.2) brightness(0.8)'],['soul','hue-rotate(95deg) saturate(1.7) brightness(0.9)'],['soul',''],['soul','brightness(0.22) contrast(1.4)'],['soul','grayscale(0.6) sepia(0.5) brightness(0.7)']], _mv={};
  function monVar(v){ v=((v|0)%8+8)%8; if(_mv[v]) return _mv[v]; const [k,f]=MVDEF[v], im=k==='wolf'?IMG.wolf:IMG.soul, c=prep(im); if(!c) return null; if(!f) return _mv[v]={im,cp:c};
    const cv=document.createElement('canvas'); cv.width=c.sw; cv.height=c.sh; const x=cv.getContext('2d'); x.filter=f; x.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,0,0,c.sw,c.sh);
    const o={naturalWidth:c.sw,_cp:{src:cv,sx:0,sy:0,sw:c.sw,sh:c.sh}}; return _mv[v]={im:o,cp:o._cp}; }
  function monster(x,y,h,toRight,a,rot,fall,v){ const M=monVar(v||0); if(!M) return; const vv=((v|0)%8+8)%8, crawl=vv===5, wolf=false;
    shadow(x,y,h*0.22,0.3*(a==null?1:a));
    actor(M.im,x,y,h*(wolf?0.82:crawl?0.62:1),{flip:!!toRight,a,rot:(rot||0)+(crawl?(toRight?-1:1)*0.25:0)+(fall?fall*1.4*(toRight?-1:1):0),sy:(fall?1-fall*0.4:1)*(crawl?0.85:1),sx:crawl?1.35:1});
    if(vv===6){ g.save(); g.globalCompositeOperation='lighter'; for(const ex of [-0.07,0.05]) glow(x+(toRight?-ex:ex)*h,y-h*0.86,h*0.06,0.9,'255,40,30'); g.restore(); } }
  // 🗿 QUÁI KHỔNG LỒ cùng loại: to gấp 3–5 lần, bước chậm nặng nề, mắt đỏ rực, bụi dưới chân
  function giant(x,y,h,v,t,toRight){ const step=Math.sin(t*1.6+x*0.01), M=monVar(v); if(!M) return; shadow(x,y,h*0.3,0.5);
    g.save(); g.globalCompositeOperation='lighter'; glow(x,y-h*0.6,h*0.6,0.25,'255,40,30'); g.restore();
    actor(M.im,x,y-Math.max(0,step)*h*0.015,h,{flip:!!toRight,rot:step*0.03,filter:'brightness(0.8)'});
    if(step>0.97&&Math.random()<0.5) dust(x,y,3,h*0.4); }   // toRight: quay mặt sang phải (ảnh gốc quay trái)
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
  // 🖐️ bàn tay bóng tối: cánh tay KHÓI ĐEN dài, cong uốn, thon dần về cổ tay; phía GỐC mờ dần tan vào bóng tối (không thấy điểm cuối → như vươn ra từ bóng tối vô tận)
  function shadowHand(pose,bx,by,wx,wy,k,a,mir){ const im=IMG.hand[pose], m=HM[pose]; if(!im||!im.naturalWidth||a<=0.01) return;
    bx=wx+(bx-wx)*1.6; by=wy+(by-wy)*1.6;   // kéo dài cánh tay về phía gốc
    const L=Math.hypot(wx-bx,wy-by)||1, ux=(wx-bx)/L, uy=(wy-by)/L, nx=-uy, ny=ux, w0=m.h*k*0.42, w1=m.h*k*0.2, sd=(wx*0.013+wy*0.007)%6.28, N=Math.max(14,Math.ceil(L/(w1*0.8)));
    const P=[]; for(let i=0;i<=N;i++){ const f=i/N, wave=Math.sin(f*3.2+TT*1.6+sd)*Math.min(L*0.06,w0*1.2)*Math.sin(Math.PI*f)+Math.sin(f*7+TT*2.4+sd*2)*w1*0.25*(1-f); P.push([bx+ux*L*f+nx*wave, by+uy*L*f+ny*wave, lerp(w0,w1,Math.pow(f,0.7)), Math.min(1,f/0.45)]); }   // [x,y,bề ngang,độ đậm: 0 ở gốc → 1]
    const ex=P[N][0]-P[N-1][0], ey=P[N][1]-P[N-1][1], ang=Math.atan2(ey,ex);
    g.save(); g.lineCap='round'; g.lineJoin='round';
    const outline=(sc)=>{ g.beginPath(); for(let i=0;i<=N;i++){ const p=P[i]; g.lineTo(p[0]+nx*p[2]*sc,p[1]+ny*p[2]*sc); } for(let i=N;i>=0;i--){ const p=P[i]; g.lineTo(p[0]-nx*p[2]*sc,p[1]-ny*p[2]*sc); } g.closePath(); };
    const fade=(c,al)=>{ const gr=g.createLinearGradient(P[0][0],P[0][1],P[N][0],P[N][1]); gr.addColorStop(0,`rgba(${c},0)`); gr.addColorStop(0.45,`rgba(${c},${al})`); gr.addColorStop(1,`rgba(${c},${al})`); return gr; };   // gốc mờ dần vào bóng tối
    g.fillStyle=fade('70,25,120',0.18*a); outline(1.15); g.fill();   // viền sáng tím (1 lớp liền, không vằn)
    g.fillStyle=fade('4,1,7',a); outline(1); g.fill();   // thân tay
    for(let i=0;i<N;i+=2){ const p=P[i], r=p[2]*(1.05+0.25*Math.sin(TT*3+i)); puff(p[0]+nx*Math.sin(TT*2+i)*p[2]*0.3,p[1]+ny*Math.sin(TT*2+i)*p[2]*0.3,r*1.4,0.55*a*p[3],'8,2,14'); }   // khói bám dọc tay
    g.globalAlpha=a; g.translate(P[N][0],P[N][1]); g.rotate(ang); g.scale(k,k*(mir||1)); g.drawImage(im,-8,-m.wy,m.w,m.h); g.restore(); }
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
  const SC=[0,12.5,34.2,39.7,45,52.3,57.3,60.8,67.8,73.8,80.3,87.8,100.8,115.3,120.3,139.3,146.3,149.8,162.2];
  const SI={H:4,P:5,J1:7,K:12,L:13,Z:14,M:15,N:16,END:17};
  const DUR=SC[SC.length-1];
  // 🎞️ SLOW-MOTION kiểu anime ở các cú đánh: [bắt đầu, kết thúc (thời gian phim), tốc độ] — đoạn đó chạy chậm lại, phim dài ra tương ứng
  const SLOW_RAW=[[22.75,23.3,0.45],[23.72,23.98,0.45],[23.98,24.5,0.5],[24.5,25.05,0.6],[26.95,27.16,0.45],[27.48,27.68,0.45],[27.68,27.98,0.5],[27.98,28.18,0.45],[28.18,28.52,0.5],[29.12,29.32,0.45],[29.32,29.64,0.4],[18.05,18.35,0.35],[19.3,19.6,0.3],[32.8,33.1,0.4],[126.48,126.8,0.2],[127.08,127.6,0.4],[82.6,84.3,0.55],[35.45,35.95,0.35],[37.4,37.8,0.4],[5.2,5.6,0.3],[42.72,43,0.3],[48.78,49.1,0.3],[59.28,59.5,0.35],[62.25,62.75,0.5],[62.78,63.05,0.25],[65.25,65.63,0.45],[65.63,65.9,0.25],[73.2,73.4,0.4],[76.18,76.5,0.25],[76.7,77.4,0.6],[80.35,81.15,0.6],[82.3,82.8,0.5],[83.9,84.15,0.35],[91.28,91.42,0.35],[94.8,95.2,0.22],[105.58,105.8,0.3],[117.98,118.2,0.3],[141.68,141.9,0.3]];
  // 🛠️ chuẩn hoá: c2r/r2c cần các đoạn slow-mo SẮP XẾP tăng dần và KHÔNG chồng nhau (trước đây lẫn thứ tự → bộ đếm thời gian nhảy lùi, phát lặp lại cảnh)
  const SLOW=(()=>{ const L=SLOW_RAW.map(x=>x.slice()).sort((x,y)=>x[0]-y[0]), out=[]; for(const s of L){ const p=out[out.length-1]; if(p&&s[0]<p[1]){ if(s[1]<=p[1]) continue; s[0]=p[1]; } if(s[1]-s[0]>0.01) out.push(s); } return out; })();
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
  let team=[], army=[];
  const TEAMK=['stalincat','feuerkatze','doge','cheems','chillguy','spidercat','ricardo','kingcheems','samuraicheems','uiacat','electricguitarcat','pianocat','bongocat','maxwell'];
  function setup(){ parts=[]; played={};
    const pool=RO().filter(r=>r && r.charKey && !NAMED.has(r.charKey) && r.avatarUrl).map(r=>r.avatarUrl).sort(()=>Math.random()-0.5).slice(0,18);
    crowd=pool.map(u=>({im:A(u), h:52+Math.random()*16, ph:Math.random()*6}));
    team=TEAMK.map(k=>({k,im:av(k)}));
    const NOT=new Set(['catvader','friend','evillarry','evilgary','depressedcat']), seen=new Set();
    army=RO().filter(r=>r&&r.charKey&&!NOT.has(r.charKey)&&!seen.has(r.charKey)&&(seen.add(r.charKey),true)).map((r,i)=>({k:r.charKey, im:r.avatarUrl?A(r.avatarUrl):av(r.charKey), ph:hash(i+900)*6}));
    army.splice(Math.min(6,army.length),0,{k:'wolf', im:IMG.wolf, ph:2.2, wolf:true}); }   // 🐺 1 ma sói duy nhất — bên phe meme
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
  function halves(x,y,h,flip,k,ang,v){ const M=monVar(v||0), c=M&&M.cp; if(!c) return; const w=h*c.sw/c.sh, cy=y-h*0.5, a=ang||-0.25;
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

  // ═════════ A — ĐẠI CHIẾN: mở màn (máy quay hạ từ bầu trời có con quỷ lù lù) → cận mặt các meme sẵn sàng → 2 đạo quân LAO vào nhau
  //            → VA CHẠM tiền tuyến (slow-mo) → loạt cảnh cận từng meme hạ quái (nền vẽ riêng) → toàn cảnh hỗn chiến, máy đẩy vào tâm trận ═════════
  const FRONT=[...Array(10)].map((_,i)=>({x:250+(i%2)*50-Math.floor(i/2)*20, y:650+i*28, ph:hash(i+70)*6}));
  const AM=[...Array(12)].map((_,i)=>({k:i, row:i%3, ph:hash(i+700)*6}));   // đạo quân meme (trái)
  const AG=[...Array(72)].map((_,i)=>({row:i%6, col:Math.floor(i/6), ph:hash(i+720)*6, x0:900+Math.floor(i/6)*80+(i%6)*26}));   // đạo quân linh hồn (phải) — đông ngang ngửa phe meme
  function aBattle(u,t,ch,clash){ const D=[], FX=480;
    [[1150,600,460,3],[1420,620,520,7],[1650,590,430,6]].forEach(([gx,gy,gh,gv],i)=>D.push({y:gy-1,f:()=>giant(gx-(clash?0:lerp(0,-300,1-eio(ch))),gy,gh,gv,t+i,false)}));   // 🗿 quái khổng lồ lừng lững phía sau đạo quân   // ch: 0..1 tiến độ lao vào · clash: đã va chạm
    army.forEach((T,i)=>{ const row=i%7, col=Math.floor(i/7), y=630+row*48+(col%2)*14, x0=-560-col*90+(row%2)*40, xf=FX-50-col*80+(row%2)*36, x=clash?xf+lunge(t,T.ph,5.5)*24:lerp(x0,xf,eio(ch)), run=!clash&&ch>0, h=T.wolf?120:82;
      D.push({y,f:()=>{ shadow(x,y,26,0.3); actor(T.im,x,y-(run?Math.abs(Math.sin(t*14+i))*12:Math.abs(Math.sin(t*7+i))*3),h,{rot:run?0.12:0.15*lunge(t,T.ph,5.5),flip:T.wolf?true:flipTo(T.k,true)}); if(run&&Math.random()<0.15) dust(x-30,y,1,40); }}); });
    AG.forEach((s,i)=>{ const y=632+s.row*52+(s.col%2)*14, xe=FX+40+s.col*62+(s.row%2)*30, x=clash?xe-lunge(t,s.ph,5)*30:lerp(s.x0+400,xe,eio(ch)), run=!clash&&ch>0, fly=clash?seg(u,5.2+hash(i)*0.3,5.9+hash(i)*0.3)*(i%4===0?1:0):0;
      D.push({y,f:()=>{ if(fly>0&&fly<1){ monster(x+eout(fly)*500,y-Math.sin(Math.PI*fly)*260,104,false,1,0,fly,i); return; } if(fly>=1) return; monster(x,y-(run?Math.abs(Math.sin(t*13+i))*12:0),92+hash(i)*30,false,1,run?-0.12:-0.12*lunge(t,s.ph,5),0,i); }}); });
    D.sort((a,b)=>a.y-b.y); for(const d of D) d.f();
    if(clash){ for(let i=0;i<3;i++) if(Math.random()<0.25) sparks(FX+(Math.random()-0.5)*80,620+Math.random()*200,5,'255,210,150',5); if(Math.random()<0.05) slashArc(FX-60,700+Math.random()*120,FX+80,640+Math.random()*120,1,40,'255,230,200',0.8); } }
  // 🎬 cảnh cận 1 meme hạ quái: nền vạch tập trung màu riêng, meme lao vào từ trái, quái bị hạ (văng / chẻ đôi) + hiệu ứng riêng
  function aDuel(q,t,o){ bgFocus(t,o.c0,o.c1,true,VW*0.55,VH*0.55);
    const hit=0.45, k1=eout(Math.min(1,q/hit)), af=seg(q,hit,1), mx=lerp(-VW*0.1,VW*0.38,k1), sx=VW*0.68, y=VH*0.84;
    if(af<=0) monster(sx,y,VH*0.32,false,1,-0.1+Math.sin(t*8)*0.04);
    else if(o.split) halves(sx,y,VH*0.32,false,af,-0.35);
    else monster(sx+eout(af)*VW*0.6,y-Math.sin(Math.PI*af)*VH*0.3,VH*0.32,false,1-af*0.5,af*4,af);
    if(af>0&&af<0.25){ impact(sx-VW*0.08,y-VH*0.24,af*4,VW*0.5); g.fillStyle=`rgba(255,255,255,${0.5*(1-af*4)})`; g.fillRect(0,0,VW,VH); }
    if(o.fx) o.fx(q,af,mx,y,t);
    actor(af>0&&o.imHit?o.imHit:o.im,mx,y,VH*o.h*0.72,{flip:o.flip,rot:af>0?(o.rot||0):0}); }
  const DUELS=[
    {t0:5.9, c0:'#ffe0a0', c1:'#5a3a08', im:IMG.dogeBuff, imHit:IMG.dogeHit, h:0.5, flip:false, fx:(q,af,mx,y,t)=>{ if(af>0&&af<0.6) for(let i=0;i<5;i++){ const a=i/5*6.28+q*8, r=VW*0.18*af; text('★',VW*0.62+Math.cos(a)*r,y-VH*0.3+Math.sin(a)*r*0.5,46,'#ffe066','#000'); } }},   // 💪 Doge cơ bắp nện búa
    {t0:6.7, c0:'#ffd0a0', c1:'#4a1a08', im:IMG.cheems, h:0.36, flip:false, fx:(q,af,mx,y,t)=>{ const hc=prep(IMG.mallet); if(!hc) return; g.save(); g.translate(mx+VW*0.1,y-VH*0.22); g.rotate(af>0?1.4:-0.8+q*2); const L=VH*0.32; g.drawImage(hc.src,hc.sx,hc.sy,hc.sw,hc.sh,-L*0.06,-L,L*0.12*hc.sw/hc.sh*8,L); g.restore(); if(af>0&&af<0.3) text('BONK',VW*0.6,VH*0.3,80,'#fff','#000'); }},   // 🏏 Cheems vụt gậy
    {t0:7.5, c0:'#b0fff0', c1:'#04302a', im:IMG.maxwell, h:0.26, flip:true, split:true, fx:(q,af,mx,y,t)=>{ const sc=prep(IMG.dsword); if(sc){ g.save(); g.translate(mx+VW*0.06,y-VH*0.12); g.rotate(af>0?1.9:-0.6+q*3); g.drawImage(sc.src,sc.sx,sc.sy,sc.sw,sc.sh,-VH*0.06,-VH*0.24,VH*0.12,VH*0.24); g.restore(); }
      if(af>0) slashArc(VW*0.4,VH*0.82,VW*0.95,VH*0.4,Math.min(1,af*4),-60,'120,255,230',1-af); }},   // ⛏️ Maxwell chém kiếm kim cương
    {t0:8.3, c0:'#c0d8ff', c1:'#081a3a', im:IMG.uia, h:0.3, flip:false, fx:(q,af,mx,y,t)=>{ g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<8;i++){ const a=t*30+i*0.8; g.strokeStyle='rgba(180,220,255,0.6)'; g.lineWidth=4; g.beginPath(); g.ellipse(mx,y-VH*0.12,VH*0.16,VH*0.05,0,a,a+1.2); g.stroke(); } g.restore(); }},   // 🌀 UIA xoay khoan tới
    {t0:9.1, c0:'#ffb0c0', c1:'#3a0614', im:IMG.guitar, h:0.34, flip:false, fx:(q,af,mx,y,t)=>{ for(let r=0;r<4;r++){ const f=(q*2+r/4)%1; ring(mx+VW*0.1+f*VW*0.5,y-VH*0.18,VH*0.05+f*VH*0.2,0.8*(1-f),'255,90,140',6,1); } if(q>0.3) text('♪',VW*0.55+Math.sin(t*9)*20,VH*0.35,70,'#ff6aa0','#000'); }},   // 🎸 Guitar Cat bắn sóng âm
  ];
  function scA(u,t){
    const ch=seg(u,3.4,5.2), clash=u>=5.2;
    chaosSouls(t,34,450,250,1900,560);
    // nền xa: quỷ khổng lồ chỉ ĐỨNG lù lù sau trận (chưa tham chiến), mắt đỏ loé
    addGlow(900,300,700,0.35,'255,40,30'); demon2(5,900,640,1150,{flip:true,lit:0.8});
    { const E=demEye(5,900,640,1150,true); g.save(); g.globalCompositeOperation='lighter'; for(const ex of [-1,1]) glow(E[0]+ex*30,E[1],40,0.6+0.4*Math.sin(t*3),'255,40,30'); g.restore(); }
    if(u<2.5&&Math.random()<0.04) bolt(400+Math.random()*900,-900,450+Math.random()*800,300,3,0.8,'255,40,40','255,210,210');
    aBattle(u,t,ch,clash);
    // ⚔️ VA CHẠM tiền tuyến: vệt sáng dọc chiến tuyến + bụi cuộn
    if(u>=5.2&&u<6.2){ const k=seg(u,5.2,6.2); g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<6;i++) glow(480+(hash(i+730)-0.5)*40,640+i*45,160,0.7*(1-k),'255,235,210'); g.restore();
      dustWall(480,820,lerp(80,900,eout(k)),0.7*(1-k)); if(u<5.27){ shake=30; for(let i=0;i<6;i++) sparks(480,640+i*40,10,'255,220,180',9); } }
    // tâm trận: Stalin + Catler vs Evil Gary (dẫn sang cảnh C)
    if(u>=10.5){ const gx=820, sx=640; addGlow(gx,840,150,0.4,'255,30,30'); addGlow(sx,840,120,0.35,'120,190,255'); shadow(gx,900,50); actor(IMG.egary,gx,900,115,{glow:'rgba(255,0,0,0.8)',gb:18}); shadow(sx,900,50); actor(IMG.stalin,sx,900,130,{}); actor(IMG.catler,sx-90,905,96,{}); if(Math.random()<0.3) bolt(sx+60,820,gx-30,830,2,0.8,'150,210,255'); }
    // 🎬 cận mặt các meme SẴN SÀNG (3 khung chớp nhanh, vạch tập trung)
    const RD=[[2.5,IMG.doge,'#ffd27a',0.62],[2.8,IMG.cheems,'#ffb070',0.6],[3.1,IMG.maxwell,'#9fe8d8',0.3]];
    if(false) for(const [t0,im,c,hh] of RD) if(u>=t0&&u<t0+0.3) ins(()=>{ const q=seg(u,t0,t0+0.3); bgFocus(t,c,'#120404',true,VW/2,VH*0.45); actor(im,VW/2,VH*0.9,VH*hh*lerp(1.05,1.12,q),{}); if(q<0.15){ g.fillStyle=`rgba(255,255,255,${0.5*(1-q/0.15)})`; g.fillRect(0,0,VW,VH); } });
    // 🎬 loạt cảnh cận từng meme hạ quái
    for(const d of DUELS) if(u>=d.t0&&u<d.t0+0.8) ins(()=>aDuel(seg(u,d.t0,d.t0+0.8),t,d));
  }
  const camA=u=>keys(u,[[0,880,-150,0.5,0],[2.4,560,520,0.42,0],   // hạ máy từ bầu trời có con quỷ xuống chiến trường
    [3.4,280,690,0.45,0.03],[5.1,430,690,0.62,0.05],   // 2 đạo quân lao vào nhau
    [5.15,480,700,1.0,-0.06],[5.9,480,700,0.9,-0.04],   // va chạm (slow-mo)
    [9.9,480,690,0.7,0],[10.5,560,690,0.6,0],[12.5,720,820,1.0,0.02]]);   // toàn cảnh hỗn chiến → đẩy máy vào tâm trận

  // ═════════ B — KHỔNG LỒ ĐỤNG ĐỘ ═════════
  function scB(u,t){
    const LX=1180, step=Math.sin(u*2.2)*12;
    const p1=seg(u,0.9,1.25), back1=seg(u,1.25,2.0), wave=seg(u,1.9,2.6), slam=seg(u,2.6,3.3), p2=seg(u,3.6,3.9);
    const lrot=-0.08*Math.sin(Math.PI*back1)+(slam>0.9?-0.06:0)-0.07*Math.sin(Math.PI*seg(u,3.9,4.5));
    pentagram(LX-60,800,1,t,360,90);
    shadow(LX,800,220,0.5); actor(IMG.larryMage,LX+step*0.3,815,680,{flip:true,glow:'rgba(170,0,255,0.7)',gb:30,rot:lrot});
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
  }
  const camB=u=>keys(u,[[0,930,620,0.56],[4.5,960,600,0.52]]);

  function blackBolt(x1,y1,x2,y2,w,a){ if(a<=0.01) return; const pts=[[x1,y1]], n=8, dx=x2-x1, dy=y2-y1, L=Math.hypot(dx,dy)||1, nx=-dy/L, ny=dx/L;
    for(let i=1;i<n;i++){ const u=i/n, j=(Math.random()-0.5)*L*0.28; pts.push([x1+dx*u+nx*j,y1+dy*u+ny*j]); } pts.push([x2,y2]);
    g.save(); g.lineCap='round'; g.lineJoin='round'; const path=()=>{ g.beginPath(); pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); };
    g.globalCompositeOperation='lighter'; g.strokeStyle=`rgba(255,30,40,${0.3*a})`; g.lineWidth=w*2.4; path(); g.stroke(); g.strokeStyle=`rgba(255,80,80,${0.55*a})`; g.lineWidth=w*1.35; path(); g.stroke();
    g.globalCompositeOperation='source-over'; g.strokeStyle=`rgba(0,0,0,${a})`; g.lineWidth=w; path(); g.stroke(); g.restore(); }
  // ⚫ HẮC THIỂM: khung âm bản đỏ-đen chớp, tia sét ĐEN viền đỏ toả ra, vòng méo không gian
  function blackFlash(x,y,k,R){ if(k<=0||k>=1) return;
    for(let i=0;i<8;i++){ const a=hash(i+1300)*Math.PI*2+k*0.5, r0=R*0.12, r1=R*(0.45+0.5*hash(i+1301))*eout(Math.min(1,k*2.5)); blackBolt(x+Math.cos(a)*r0,y+Math.sin(a)*r0,x+Math.cos(a)*r1,y+Math.sin(a)*r1,R*0.011,1-k); }
    g.save(); g.globalCompositeOperation='lighter'; glow(x,y,R*0.45,0.55*(1-k),'255,40,40'); g.restore();
    softShock(x,y,lerp(R*0.2,R*2.4,eout(k)),0.35*(1-k),'255,80,80',0.8); }
  function cursedAura(x,y,h,c,dark,t,a){ if(a<=0.01) return; for(let i=0;i<10;i++){ const f=((t*0.9+hash(i+1400))%1), px=x+(hash(i+1401)-0.5)*h*0.8+Math.sin(t*3+i)*h*0.08, py=y-h*0.1-f*h*1.1, r=h*(0.16+0.12*hash(i+1402))*(1-f*0.5);
      if(dark) puff(px,py,r,0.5*a*(1-f),'10,2,8'); g.save(); g.globalCompositeOperation='lighter'; glow(px,py,r*0.9,0.4*a*(1-f),c); g.restore(); } }   // chú lực cuộn lên như lửa
  // ═════════ C — TRẬN MỞ MÀN: Evil Gary + Evil Larry đứng QUAY LƯNG vào nhau giữa sân, 5 meme vây 2 phía (dựng theo khung truyện đối kháng)
  //   · trái: STALIN + ADOLF (Catler) vs EVIL GARY — Catler đốt bầy linh hồn, Stalin vs Gary đánh qua lại 3 nhịp (đất → trên không → đất), lửa chuyền vào búa → HẮC THIỂM
  //   · phải: CLAPPING CAT (vỗ tay = ĐỔI CHỖ kiểu Boogie Woogie) + CHEEMS + BUFF DOGE vs EVIL LARRY — đổi chỗ né đòn đánh úp, vỗ tay GIẢ đánh lừa, BONK
  //   · 2 kẻ ác bị dồn về giữa, hợp lực bùng nổ → Clapping Cat nhảy lên vỗ tay đổi chỗ đưa Stalin lên ngay trên đầu chúng → búa lửa sét giáng xuống: HẮC THIỂM 2 ═════════
  const C2={Y:880, GX:560, LX:1020, SX:160, CX:30, DX:1400, KX:1540, PX:1700};
  function swapPop(x,y,h,k){ if(k<=0||k>=1) return; ring(x,y-h*0.5,lerp(10,h*0.9,eout(k)),1-k,'255,255,255',5,1); g.save(); g.globalCompositeOperation='lighter'; glow(x,y-h*0.5,h*0.7*(1-k),0.9*(1-k),'255,250,235'); g.restore(); }   // 👏 chỗ vừa đổi: loé trắng + vòng
  function clapBurst(x,y,k){ if(k<=0||k>=1) return; const f=eout(k); ring(x,y,lerp(10,170,f),0.6*(1-k),'255,245,220',3,0.9); }   // sóng vỗ tay (1 vòng gọn)   // sóng vỗ tay
  function sfxText(s,x,y,px,k,c){ if(k<=0||k>=1) return; const sc=k<0.15?lerp(1.7,1,k/0.15):1+0.08*k; g.save(); g.translate(x,y); g.rotate(-0.12); g.scale(sc,sc); text(s,0,0,px,c||'#fff','#000',undefined,1-seg(k,0.7,1)); g.restore(); }   // chữ tượng thanh kiểu truyện
  function mPanels(k,list){ g.fillStyle='#0b0707'; g.fillRect(0,0,VW,VH);   // 📖 khung truyện: các ô nghiêng trượt vào lần lượt, viền giấy trắng
    list.forEach((P,i)=>{ const s=eout(seg(k,i*0.1,i*0.1+0.28)); if(s<=0) return; const off=(1-s)*VW*0.7*(P.dir||1);
      const path=()=>{ g.beginPath(); P.poly.forEach(([x,y],j)=>j?g.lineTo(x*VW,y*VH):g.moveTo(x*VW,y*VH)); g.closePath(); };
      g.save(); g.translate(off,0); path(); g.save(); g.clip(); P.draw(); g.restore(); path(); g.lineWidth=8; g.strokeStyle='#f2ede4'; g.stroke(); g.restore(); }); }   // (dựng lại đường viền trước khi tô nét — không thì nét rơi vào hình tròn cuối cùng vẽ trong ô)
  function hexShield(x,y,k,t){ if(k<=0.01) return; g.save(); g.globalCompositeOperation='lighter'; g.translate(x,y); g.scale(0.32,1); for(let i=0;i<7;i++){ const a=i/6*Math.PI*2; } g.strokeStyle=`rgba(200,120,255,${0.9*k})`; g.lineWidth=8;
    for(let r=0;r<3;r++){ g.beginPath(); for(let i=0;i<=6;i++){ const a=i/6*Math.PI*2+Math.PI/6, R=200-r*60; i?g.lineTo(Math.cos(a)*R,Math.sin(a)*R):g.moveTo(Math.cos(a)*R,Math.sin(a)*R); } g.stroke(); }
    glow(0,0,230,0.35*k,'170,80,255'); g.restore(); }   // 💜 khiên lục giác tím của Larry (nhìn nghiêng)
  function clapPose(u,claps){ let c=claps[0]; for(const q of claps) if(Math.abs(u-q)<Math.abs(u-c)) c=q; const d=u-c; return d<-0.25||d>0.35?IMG.clapIdle:d<-0.05?IMG.clap[0]:d<0.1?IMG.clapUp:IMG.clap[2]; }   // tư thế theo lần vỗ tay gần nhất
  // 👏 cận ZOOM vỗ tay (mỗi lần đổi chỗ): Clapping Cat chụm tay → BỐP, loé trắng, sóng vỗ tay + chữ CLAP!
  function clapZoom(k,t){ bgFocus(t,'#ffdca0','#4a2a06',false,VW*0.5,VH*0.42); const on=k>=0.45;
    actor(on?IMG.clapUp:IMG.clap[0],VW*0.5,VH*1.08,VH*0.82*lerp(1,1.06,k),{});
    if(on){ const f=seg(k,0.45,1); g.save(); g.globalCompositeOperation='lighter'; glow(VW*0.5,VH*0.42,VH*0.5*(1-f)+30,0.9*(1-f),'255,250,230'); g.restore();
      for(let r=0;r<2;r++){ const q=seg(f,r*0.2,1); if(q>0&&q<1) ring(VW*0.5,VH*0.42,lerp(20,VW*0.5,eout(q)),0.9*(1-q),'255,245,220',6,0.85); }
      text('CLAP!',VW*0.78,VH*0.22,96,'#fff','#000',undefined,1-seg(f,0.7,1)); if(f<0.15){ g.fillStyle=`rgba(255,255,255,${0.7*(1-f/0.15)})`; g.fillRect(0,0,VW,VH); } } }
  function rockAt(x,y,s){ g.save(); g.translate(x,y); g.fillStyle='#4a3c38'; g.beginPath(); g.moveTo(-s,0); g.lineTo(-s*0.85,-s*0.6); g.lineTo(-s*0.3,-s*0.95); g.lineTo(s*0.45,-s*0.85); g.lineTo(s,-s*0.35); g.lineTo(s*0.9,0); g.closePath(); g.fill();
    g.fillStyle='#6a5a52'; g.beginPath(); g.moveTo(-s*0.75,-s*0.55); g.lineTo(-s*0.3,-s*0.9); g.lineTo(s*0.3,-s*0.8); g.lineTo(-s*0.1,-s*0.5); g.closePath(); g.fill(); g.restore(); }   // 🪨 tảng đá
  function scCw(U,t){ const {Y}=C2, u=U+4.0;   // U: giờ thật của cảnh · u: mốc cũ của trận Stalin/Gary (dời lên đầu, sớm hơn 4s)
    const CLAPS=[9.45,9.95,11.65,12.05,12.45,13.45];   // các lần vỗ tay đổi chỗ (mỗi lần có cận zoom + slow)
    const charge=eio(seg(U,2.6,3.4)), bump=tc=>Math.sin(Math.PI*seg(u,tc-0.18,tc+0.22)), gath=seg(U,15.4,17.2), boom=seg(U,17.2,18.4), bo=eout(boom);
    const sTop=false, arc=(f,x0,y0,x1,y1,h)=>[lerp(x0,x1,f),lerp(y0,y1,f)-Math.sin(Math.PI*f)*h];
    // ── EVIL GARY: đấu Stalin + Adolf → trúng Hắc Thiểm, lùi lại hồi sức → tụ với Larry giữa sân ──
    let gx=560-40*(bump(8.6)+bump(9.1)+bump(9.6)), gy=Y-250*bump(9.1); gx=lerp(gx,760,eout(seg(u,10.8,11.4))); gx=lerp(gx,860,eio(seg(U,14.6,15.2)));
    const gRec=U>=7.4&&U<14.6?1:0;
    // ── EVIL LARRY ──
    let lx=1150, ly=Y, lSx=1, lSy=1, lRot=0;
    if(U>=7.85&&U<8.6){ lx=lerp(1150,1110,seg(U,7.85,8.6)); lRot=0.06*Math.sin(t*30); }   // đỡ loạt gậy của Cheems
    if(U>=8.6){ lx=1110; }
    if(U>=8.6&&U<8.82) lSx=Math.cos(Math.PI*4*seg(U,8.6,8.82));   // xoay người hất bay Cheems
    if(U>=8.82&&U<10.2) lSx=-1;   // quay sang Clapping Cat, tụ lực
    if(U>=9.5&&U<9.6) lRot=-0.15;
    if(U>=10.2&&U<11.0){ const f=seg(U,10.2,11.0); [lx,ly]=arc(eout(f),1110,Y,1880,Y,260); lRot=f*5; }   // bị Doge đấm văng sang phải
    if(U>=11.0&&U<13.55){ lx=1880; lSx=-1; if(U<11.4) lSy=lerp(0.8,1,seg(U,11.0,11.4)); if(U>=11.5&&U<11.6||U>=11.9&&U<12.0) lRot=-0.15; if(U>=12.6) lSy=U<12.9?0.72:lerp(0.72,1,eout(seg(U,12.9,13.4))); }   // chưởng 2 phát · bị BONK cắm xuống · gượng dậy
    if(U>=13.55&&U<14.6){ const f=seg(U,14.3,14.6); [lx,ly]=[lerp(1500,1010,f),lerp(Y-900,Y,ein(f))]; lRot=-f*4; }   // bay từ bãi cỏ về, rơi xuống cạnh Evil Gary   // bị đấm móc bay về phía Evil Gary
    if(U>=14.6){ lx=1010; lSx=1; if(U<14.9) lSy=lerp(0.8,1,seg(U,14.6,14.9)); }
    // ── STALIN · CATLER (trái) ──
    let sx=lerp(160,300,charge), sy=Y; sx+=50*(bump(8.6)+bump(9.1)+bump(9.6)); sy-=250*bump(9.1); if(u>=10.6) sx=lerp(300,430,eio(seg(u,10.6,10.8)));
    let cx=lerp(30,150,charge); if(u>=7.6) cx=lerp(150,230,eout(seg(u,7.6,7.8)));
    sx=lerp(sx,640,eio(seg(U,15.0,15.8))); cx=lerp(cx,480,eio(seg(U,15.0,15.8)));
    // ── BUFF DOGE · CHEEMS · CLAPPING CAT (phải) ──
    let dx=lerp(1650,1450,charge), dy=Y, dHit=false, dRot=0, kx=lerp(1600,1340,charge), ky=Y, kRot=0, mal=null, px=lerp(1750,1560,charge), py=Y, pRot=0;
    // combo 1
    if(U>=7.6&&U<7.85){ [kx,ky]=arc(seg(U,7.6,7.85),1340,Y,1250,Y,120); mal=-1.6; }
    if(U>=7.85&&U<8.62){ kx=1250; mal=-1.6+2.9*Math.abs(Math.sin(Math.PI*(U-7.85)/0.18)); ky=Y-Math.abs(Math.sin(Math.PI*(U-7.85)/0.18))*14; }   // nện gậy liên tục
    if(U>=8.62&&U<9.25){ const f=seg(U,8.62,9.25); [kx,ky]=arc(eout(f),1250,Y,1640,Y,220); kRot=f*7; }   // bị hất bay
    if(U>=9.25) kx=1640;
    if(U>=7.9&&U<8.6){ const f=eio(seg(U,7.9,8.6)); px=lerp(1560,960,f); py=Y-Math.sin(Math.PI*f)*70; }   // chạy vòng ra sau lưng Larry
    if(U>=8.6) px=960;
    if(U>=9.45) px=520;   // 👏1: Clapping Cat ↔ con ma
    if(U>=9.95&&U<10.6){ const f=seg(U,9.97,10.2); dHit=true; [dx,dy]=[lerp(820,1050,ein(f)),lerp(Y-230,Y-110,ein(f))]; dRot=lerp(-0.7,0.9,f); if(U>=10.2){ const b=seg(U,10.2,10.6); [dx,dy]=arc(b,1050,Y-110,1080,Y,60); dRot=0.9*(1-b); } }   // 👏2: nửa con ma ↔ Doge → Doge lao xuống đấm
    if(U>=10.6) dx=1080;
    // combo 2: Doge + Clapping Cat bật nhảy đuổi theo, đổi chỗ né chưởng
    if(U>=11.1&&U<11.65){ const f=eio(seg(U,11.1,11.65)); [dx,dy]=arc(f,1080,Y,1420,Y-200,90); [px,py]=arc(f,520,Y,1250,Y-380,120); }
    if(U>=11.65&&U<12.05){ const f=seg(U,11.65,12.05); [dx,dy]=[lerp(1250,1600,f),lerp(Y-380,Y-250,f)]; const g2=seg(U,11.65,11.8); px=lerp(1420,1640,f); py=U<11.8?lerp(Y-200,Y-330,eout(g2)):lerp(Y-330,Y-160,seg(U,11.8,12.05)); pRot=U<11.8?-Math.PI*2*eio(g2):0; }   // 👏3 · Clapping Cat lộn qua quả chưởng
    if(U>=12.05&&U<12.45){ const f=seg(U,12.05,12.45); [px,py]=[lerp(1600,1860,f),lerp(Y-250,Y-330,f)]; dx=lerp(1640,1700,f); dy=lerp(Y-160,Y,ein(f)); dHit=U<12.3; dRot=U<12.3?lerp(0.6,-0.5,eout(seg(U,12.05,12.15))):0; }   // 👏4 · Doge đấm bật quả chưởng
    if(U>=12.45) { px=1640; py=Y; dx=1700; dy=Y; }   // 👏5: Clapping Cat ↔ Cheems
    if(U>=12.45&&U<12.95){ if(U<12.58){ kx=1880; ky=Y-330+Math.sin(t*10)*4; mal=U<12.5?-2.4:lerp(-2.4,1.0,eout(seg(U,12.5,12.58))); } else { const f=seg(U,12.58,12.95); kx=lerp(1880,1800,f); ky=lerp(Y-330,Y,ein(f)); mal=1.0; } }
    if(U>=12.95) kx=1800;
    if(U>=13.45){ dx=1990; dy=Y; if(U<13.75){ dHit=true; dRot=lerp(0.5,-0.9,eout(seg(U,13.47,13.58))); } }   // 👏6: tảng đá ↔ Doge → đấm móc
    // tụ lại vây quanh 2 kẻ ác
    if(U>=15.0){ const f=eio(seg(U,15.0,15.8)); dx=lerp(dx,1190,f); kx=lerp(kx,1330,f); px=lerp(px,1460,f); }
    // 💥 cú bùng ma lực: cả 5 meme bị thổi bay khỏi khung
    const fly=(x,dir,k)=>[x+dir*eout(k)*1500, Y-Math.sin(Math.PI*Math.min(1,k*1.2))*360];
    if(boom>0){ [sx,sy]=fly(sx,-1,boom); [cx]=fly(cx,-1,boom); [dx,dy]=fly(dx,1,boom); [kx,ky]=fly(kx,1,boom); [px,py]=fly(px,1,boom); dHit=false; mal=null; }
    const brace=gath>0&&boom<=0?Math.sin(t*30)*2:0;
    // ════ VẼ ════
    for(let i=0;i<22;i++){ const f=((t*0.16+hash(i+1500))%1); g.save(); g.globalAlpha=0.7*Math.sin(Math.PI*f); g.fillStyle=i%2?'#2a1018':'#3a2a26'; g.translate(-200+hash(i+1501)*2400+Math.sin(t*2+i)*14,Y-20-f*300); g.rotate(t*(1+hash(i))); const r=3+hash(i+1502)*7; g.fillRect(-r,-r*0.7,r*2,r*1.4); g.restore(); }
    // 👿 2 kẻ ác
    { const lA=gath>0?1+2*gath:1; cursedAura(gx,gy,150*lA,'255,30,30',true,t,1); shadow(gx,Y,55,0.5); actor(IMG.egary,gx+(u>=10.8&&u<11.4?Math.sin(t*60)*4:0)+(gRec?Math.sin(t*20)*1.5:0),gy,135,{glow:'rgba(255,0,0,0.85)',gb:22,sy:gRec?0.92:1,rot:Math.sin(t*14)*0.02,flip:U>=14.6});
      cursedAura(lx,ly,260*lA,'170,60,255',true,t,1); shadow(lx,Y,90,0.5*(ly>Y-60?1:0.3)); actor(IMG.larryMage,lx,ly,280,{glow:'rgba(190,90,255,0.7)',gb:16,sx:lSx,sy:lSy,rot:lRot}); }
    // 💜 Larry: xoay hất · tụ lực · chưởng
    if(U>=8.6&&U<8.95){ const k=seg(U,8.6,8.95); softShock(lx,Y-120,lerp(60,420,eout(k)),0.7*(1-k),'190,90,255',0.5); }
    if(U>=8.9&&U<9.5){ const k=seg(U,8.9,9.45); g.save(); g.globalCompositeOperation='lighter'; glow(lx-80,Y-210,lerp(10,90,k),0.95,'190,90,255'); glow(lx-80,Y-210,lerp(4,30,k),1,'255,230,255'); g.restore(); }
    if(U>=9.5&&U<9.62){ const f=seg(U,9.5,9.6), bx=lerp(lx-80,960,f); g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round'; for(const [lw,al] of [[60,0.25],[22,0.6],[8,1]]){ g.strokeStyle=`rgba(200,110,255,${al})`; g.lineWidth=lw; g.beginPath(); g.moveTo(lx-80,Y-210); g.lineTo(bx,Y-150); g.stroke(); } g.restore(); }
    if(U>=9.6&&U<9.95){ const k=seg(U,9.6,9.95); if(U<9.66){ shake=26; sparks(960,Y-80,40,'200,120,255',13); } softShock(960,Y-80,lerp(40,360,eout(k)),0.7*(1-k),'190,90,255',0.8); }
    // 🔮 combo 2: 2 phát chưởng — phát 1 lướt dưới Clapping Cat đang lộn · phát 2 bị Doge đấm bật lên trời
    if(U>=11.5&&U<11.95){ const f=seg(U,11.55,11.95), bx=lerp(1800,900,f), by=lerp(Y-200,Y-190,f); if(U>=11.55){ g.save(); g.globalCompositeOperation='lighter'; glow(bx,by,80,1,'190,90,255'); glow(bx,by,28,1,'255,230,255'); g.restore(); for(let k=1;k<5;k++) puff(bx+k*26,by,20-k*3,0.5,'120,40,180'); } }
    if(U>=11.95&&U<12.6){ let bx,by; if(U<12.1){ const f=seg(U,11.95,12.1); bx=lerp(1800,1660,f); by=lerp(Y-200,Y-170,f); } else { const f=seg(U,12.1,12.6); bx=lerp(1660,1300,f); by=lerp(Y-170,Y-1100,eout(f)); }
      g.save(); g.globalCompositeOperation='lighter'; glow(bx,by,80,1,'190,90,255'); glow(bx,by,28,1,'255,230,255'); g.restore(); }
    if(U>=12.1&&U<12.17){ shake=20; sparks(1660,Y-170,30,'255,230,180',12); }
    // 💥 các cú trúng
    for(const tb of [7.95,8.13,8.31,8.49]) if(U>=tb&&U<tb+0.05) sparks(1190,Y-150,14,'255,210,140',8);
    if(U>=10.2&&U<10.27){ shake=40; sparks(1100,Y-150,50,'255,230,180',14); } impact(1100,Y-150,seg(U,10.2,10.55),380);
    if(U>=12.58&&U<12.65){ shake=44; dust(1880,Y,14,300); } if(U>=12.58&&U<13.1) dustWall(1880,Y,lerp(80,420,eout(seg(U,12.58,13.1))),0.4*(1-seg(U,12.58,13.1)));
    if(U>=13.55&&U<13.62){ shake=40; sparks(1920,Y-180,50,'255,230,180',14); } impact(1920,Y-180,seg(U,13.55,13.9),380);
    if(U>=14.6&&U<14.66){ shake=24; dust(1010,Y,12,240); }
    for(const c of CLAPS) swapPop(c===9.45?960:c===9.95?1450:c===12.45?1640:c===13.45?1700:1420,c===9.95?Y:c===11.65||c===12.05?Y-250:Y,130,seg(U,c,c+0.25));
    // 🔴🟣 2 kẻ ác tụ lại TÍCH MA LỰC → quả cầu đỏ tím bao lấy cả 2, sét giật, đất rung → BÙNG NỔ thổi bay cả 5 meme
    if(gath>0&&boom<1){ const ox=(gx+lx)/2, oy=Y-170, R=lerp(60,420,eio(gath))*(1+0.04*Math.sin(t*25))*(boom>0?1+boom*4:1), al=boom>0?1-boom:1;
      g.save(); g.globalCompositeOperation='lighter'; glow(ox,oy,R*1.8,0.35*al,'255,40,90'); const gr=g.createRadialGradient(ox,oy,R*0.2,ox,oy,R); gr.addColorStop(0,`rgba(255,200,230,${0.05*al})`); gr.addColorStop(0.7,`rgba(220,40,140,${0.25*al})`); gr.addColorStop(1,`rgba(160,40,255,${0.5*al})`); g.fillStyle=gr; g.beginPath(); g.arc(ox,oy,R,0,Math.PI*2); g.fill();
      g.strokeStyle=`rgba(255,180,230,${0.7*al})`; g.lineWidth=4; g.beginPath(); g.arc(ox,oy,R,0,Math.PI*2); g.stroke(); g.restore();
      if(boom<=0){ if(Math.random()<0.6) bolt(ox+(Math.random()-0.5)*R,oy-R*0.6,ox+(Math.random()-0.5)*R*1.4,Y,2.2,0.9,Math.random()<0.5?'255,40,60':'190,90,255'); shake=Math.max(shake,3+gath*6);
        for(let i=0;i<12;i++){ const f=((t*0.7+hash(i+4100))%1); glow(ox+(hash(i+4101)-0.5)*R*2.2,Y-f*R*1.4,5,0.8*Math.sin(Math.PI*f),'255,120,200'); } } }
    if(boom>0&&boom<1){ if(U<17.27) shake=55; softShock((gx+lx)/2,Y-170,lerp(200,2600,bo),0.8*(1-boom),'255,90,180',0.55); dustWall((gx+lx)/2,Y,lerp(200,2200,bo),0.7*(1-boom)); if(boom<0.08){ g.fillStyle=`rgba(255,235,245,${0.8*(1-boom/0.08)})`; g.fillRect(-4000,-4000,9000,9000); } }
    // 👻 bầy linh hồn của Gary lao vào → bị lửa Catler đốt rụi
    if(u>=7.4&&u<8.5) for(let i=0;i<14;i++){ const f=seg(u,7.4+i*0.03,8.1+i*0.03), burn=seg(u,7.85+i*0.02,8.25+i*0.02), x=lerp(gx-60,320,eout(f)), y=Y-80-hash(i+1601)*260+Math.sin(t*6+i)*20;
      if(f>0&&burn<1){ actor(IMG.soul,x,y,70,{a:1-burn,rot:Math.sin(t*9+i)*0.2,filter:burn>0?`brightness(${1+2*burn}) sepia(${burn})`:''}); if(burn>0&&Math.random()<0.3) sparks(x,y-30,3,'255,160,60',5); } }
    if(u>=7.75&&u<8.4){ const k=seg(u,7.75,8.4); g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<16;i++){ const a=-1.2+i/15*1.4, r=lerp(40,420,eout(k)); glow(cx+40+Math.cos(a)*r,Y-120+Math.sin(a)*r*0.8,lerp(30,90,k),0.8*(1-k),i%2?'255,140,40':'255,90,30'); } g.restore(); }   // 🔥 vòng lửa quét ra
    // ⚔️ va chạm Stalin vs Gary (3 nhịp đổi đòn)
    for(const tc of [8.6,9.1,9.6]){ const k=seg(u,tc,tc+0.35); if(k>0&&k<1){ const mx=(sx+gx)/2-10, my=(tc===9.1?Y-250:Y)-130; g.save(); g.globalCompositeOperation='lighter'; glow(mx,my,lerp(60,tc===9.6?420:260,eout(k)),1-k,'255,240,220'); g.restore(); ring(mx,my,lerp(20,tc===9.6?400:240,eout(k)),1-k,'255,220,180',5,0.5); if(k<0.12){ shake=tc===9.6?26:16; sparks(mx,my,tc===9.6?40:20,Math.random()<0.5?'150,210,255':'255,60,60',11); } } }
    // 🐱 Catler
    cursedAura(cx,Y,120,'255,140,40',false,t,1); shadow(cx,Y,40); actor(IMG.catlerAtk,cx,Y-(charge>0&&charge<1?Math.abs(Math.sin(t*14))*10:0)+brace*0,122,{rot:boom>0?-boom*4:0});   // ảnh toàn thân (ảnh gốc Catler là bán thân bị cắt ngang)
    // 🔨 Stalin
    cursedAura(sx,sy,150,'120,190,255',false,t,1); if(!sTop) shadow(sx,Y,50);
    if(charge>0&&charge<1) for(let k=1;k<5;k++) actor(IMG.stalin,sx-k*50,sy,150,{a:0.28-k*0.06});
    actor(IMG.stalin,sx,sy-(charge>0&&charge<1?Math.abs(Math.sin(t*14))*10:0),150,{rot:sTop?0.2:(bump(8.6)+bump(9.1)+bump(9.6))*0.25});
    { const hc=prep(IMG.hammer); if(hc){ const fire=u>=10.0, swing=sTop?eout(seg(u,14.45,14.8)):0, hx=sx+45+(sTop?swing*40:0), hy=sy-125-(sTop?(1-swing)*80:0); g.save(); g.translate(hx,hy); g.rotate(sTop?lerp(-2.2,1.2,swing):-0.6+(bump(8.6)+bump(9.1)+bump(9.6))*1.4); g.drawImage(hc.src,hc.sx,hc.sy,hc.sw,hc.sh,-36,-36,72,72*hc.sh/hc.sw); g.restore();
      if(fire){ g.save(); g.globalCompositeOperation='lighter'; glow(hx,hy,lerp(60,140,sTop?1:0.5),0.85,'255,140,40'); g.restore(); for(let i=0;i<4;i++){ const f=((t*2+i/4)%1); puff(hx+Math.sin(i*1.7+t*6)*14,hy-f*70,18*(1-f)+4,0.6*(1-f),'255,'+(150-i*10)+',40'); } }
      if(Math.random()<0.5) bolt(hx,hy,hx+(Math.random()-0.5)*160,hy-80-Math.random()*120,1.6,0.8,'150,210,255'); } }
    // 💪 Buff Doge · 🐕 Cheems · 👏 Clapping Cat
    shadow(dx,Y,55,0.4*(1-Math.min(1,(Y-dy)/500))); actor(dHit?IMG.dogeHit:IMG.dogeBuff,dx,dy-(charge>0&&charge<1?Math.abs(Math.sin(t*13))*10:0),dHit?175:160,{flip:flipTo('doge',false),rot:dRot+(boom>0?boom*4:0)});
    shadow(kx,Y,38,0.35*(1-Math.min(1,(Y-ky)/600))); actor(IMG.cheems,kx,ky-(charge>0&&charge<1?Math.abs(Math.sin(t*15))*10:0),110,{flip:flipTo('cheems',false),rot:kRot+(boom>0?boom*5:0)});
    if(mal!=null){ const hc=prep(IMG.mallet); if(hc){ g.save(); g.translate(kx-20,ky-70); g.rotate(-mal); const L=120; g.drawImage(hc.src,hc.sx,hc.sy,hc.sw,hc.sh,-L*0.5*hc.sw/hc.sh,-L,L*hc.sw/hc.sh,L); g.restore(); } }
    shadow(px,Y,34,0.35*(py<Y-50?0.2:1)); actor(clapPose(U,CLAPS),px,py,118,{flip:true,glow:'rgba(255,225,170,0.75)',gb:12,rot:pRot+(boom>0?boom*5:0)});
    for(const c of CLAPS) clapBurst(px,py-70,seg(U,c,c+0.35));
    // ⚫ HẮC THIỂM (búa lửa vào Gary)
    blackFlash(gx-40,Y-150,seg(u,10.8,11.5),380); if(u>=10.8&&u<10.87){ shake=36; sparks(gx-40,Y-150,50,'255,80,80',13); }
    // 📖 BONK: Cheems nện gậy từ trên xuống đầu Larry (khung lớn chéo, chữ to)
    if(U>=12.5&&U<12.72) ins(()=>{ const k=seg(U,12.5,12.72); bgFocus(t,'#ffe9a8','#6a3a08',false,VW*0.5,VH*0.6); actor(IMG.larryMage,VW*0.55,VH*1.25,VH*0.75,{rot:0.25,sy:0.92});
      actor(IMG.cheems,VW*0.33,VH*0.55,VH*0.38,{rot:-0.3}); const hc=prep(IMG.mallet); if(hc){ g.save(); g.translate(VW*0.4,VH*0.4); g.rotate(lerp(-1.2,1.1,eout(Math.min(1,k*3)))); const L=VH*0.42; g.drawImage(hc.src,hc.sx,hc.sy,hc.sw,hc.sh,-L*0.5*hc.sw/hc.sh,-L,L*hc.sw/hc.sh,L); g.restore(); }
      if(k>0.3){ g.save(); g.globalCompositeOperation='lighter'; glow(VW*0.55,VH*0.45,VH*0.4*(1-k),0.9,'255,250,220'); g.restore(); } text('BONK!',VW*0.72,VH*0.22,110,'#ffe066','#000',undefined,seg(k,0.25,0.4)); });
    // 🔥 lửa tụ vào tay Catler → chuyền sang búa Stalin
    if(u>=10.0&&u<10.8) ins(()=>{ const k=seg(u,10.0,10.8); bgFocus(t,'#5a2408','#140402',true,VW/2,VH*0.55); cursedAura(VW*0.4,VH*0.92,VH*0.36,'255,140,40',false,t,0.6);
      const ch=VH*0.34*lerp(1,1.04,k); actor(IMG.catlerAtk,VW*0.4,VH*0.88,ch,{}); actor(IMG.stalin,VW*0.68,VH*0.9,VH*0.26,{rot:-0.15});
      const PX=VW*0.4-ch*0.3, PY=VH*0.88-ch*0.93, HX=VW*0.8, HY=VH*0.6, gat=seg(k,0,0.5), pass=seg(k,0.45,0.8), lit=seg(k,0.75,1);
      { const hc=prep(IMG.hammer); if(hc){ g.save(); g.translate(HX,HY); g.rotate(-0.5); g.drawImage(hc.src,hc.sx,hc.sy,hc.sw,hc.sh,-VH*0.07,-VH*0.07,VH*0.14,VH*0.14*hc.sh/hc.sw); g.restore(); } }
      g.save(); g.globalCompositeOperation='lighter';
      for(let i=0;i<26;i++){ const f=((k*1.6+hash(i+2100))%1), a=hash(i+2101)*6.28+f*4, d=lerp(VW*0.5,8,ein(f))*(1-pass); if(gat<=0) break; glow(PX+Math.cos(a)*d,PY+Math.sin(a)*d*0.7,lerp(14,6,f),0.85*gat*(1-pass*0.7),i%2?'255,160,50':'255,90,30'); }
      glow(PX,PY,lerp(20,90,gat)*(1-pass*0.6),0.95,'255,200,110'); glow(PX,PY,lerp(10,40,gat),1,'255,245,210');
      if(pass>0){ const e=eout(pass); g.lineCap='round'; for(const [lw,al,c] of [[34,0.25,'255,110,40'],[14,0.6,'255,170,70'],[5,1,'255,240,200']]){ g.strokeStyle=`rgba(${c},${al})`; g.lineWidth=lw; g.beginPath(); for(let i=0;i<=30;i++){ const f=i/30*e, x=lerp(PX,HX,f), y=lerp(PY,HY,f)-Math.sin(Math.PI*f)*VH*0.12+Math.sin(f*14-t*20)*6; i?g.lineTo(x,y):g.moveTo(x,y); } g.stroke(); } }
      if(lit>0){ glow(HX,HY,VH*0.12*lit+20,0.9,'255,140,40'); for(let i=0;i<8;i++){ const f=((t*2+i/8)%1); glow(HX+Math.sin(i*1.7+t*6)*VH*0.03,HY-f*VH*0.12,VH*0.03*(1-f)+4,lit*(1-f),'255,'+(150-i*8)+',40'); } }
      g.restore(); if(k<0.1){ g.fillStyle=`rgba(255,240,220,${0.6*(1-k/0.1)})`; g.fillRect(0,0,VW,VH); } });
    // ⚫ chèn HẮC THIỂM: khung âm bản đen đỏ, bóng các nhân vật
    for(const [t0,draw] of [[10.8,()=>{ actor(IMG.stalin,VW*0.32,VH*0.72,VH*0.26,{filter:'brightness(0)'}); actor(IMG.egary,VW*0.68,VH*0.72,VH*0.22,{filter:'brightness(0)'}); }]])
      if(u>=t0&&u<t0+0.2) ins(()=>{ g.fillStyle='#d01020'; g.fillRect(0,0,VW,VH); for(let i=0;i<8;i++){ const an=hash(i+t0*100)*Math.PI*2; blackBolt(VW/2,VH/2,VW/2+Math.cos(an)*VH,VH/2+Math.sin(an)*VH,6,1); } draw(); });
    // 👏 cận zoom vỗ tay mỗi lần đổi chỗ
    for(const c of CLAPS) if(U>=c-0.08&&U<c+0.1) ins(()=>clapZoom(seg(U,c-0.08,c+0.1),t));
  }
  // ═════════ 🌾 TRẬN LARRY Ở BỐI CẢNH RIÊNG (bãi cỏ ven rừng, trời nhiều mây — như trận Itadori + Todo vs Hanami) — dựng thành CHUỖI CẢNH QUAY anime full khung ═════════
  // nền bãi cỏ theo góc máy: hy = đường chân trời (tỉ lệ khung) · pan = máy lia ngang · streak = nền nhoè tốc độ (đang lia theo người bị đánh văng)
  function fieldBG(t,o){ o=o||{}; const hy=VH*(o.hy==null?0.55:o.hy), pan=o.pan||0;
    const sk=g.createLinearGradient(0,0,0,Math.max(10,hy)); sk.addColorStop(0,'#7d7a70'); sk.addColorStop(0.55,'#b9ab88'); sk.addColorStop(1,'#ddcda2'); g.fillStyle=sk; g.fillRect(0,0,VW,Math.max(0,hy)+2);
    for(let i=0;i<12;i++){ const x=((hash(i+5000)*VW*1.6+pan*0.3+t*8)%(VW*1.6))-VW*0.3, y=hy*(0.12+hash(i+5001)*0.6), r=VW*(0.05+0.05*hash(i+5002)); for(const [ox,oy,k,a,c] of [[0,0,1,0.5,'92,88,84'],[-0.15,-0.18,0.75,0.4,'214,204,180'],[0.25,0.05,0.6,0.35,'120,114,104']]){ g.save(); g.translate(x+ox*r*2.4,y+oy*r); g.scale(2.6,0.5); puff(0,0,r*k,a,c); g.restore(); } }   // dải mây dẹt kéo ngang
    if(hy>0&&hy<VH){
      g.fillStyle='#5f5c44'; g.beginPath(); g.moveTo(0,hy); for(let i=0;i<=40;i++){ const x=i/40*VW, h=VH*(0.035+0.03*hash(((i+Math.floor(pan*0.6/(VW/40)))|0)+5010)); g.lineTo(x,hy-h); } g.lineTo(VW,hy); g.closePath(); g.fill();   // rừng xa
      g.fillStyle='#34361f'; g.beginPath(); g.moveTo(0,hy+2); for(let i=0;i<=60;i++){ const x=i/60*VW, h=VH*(0.02+0.045*hash(((i+Math.floor(pan/(VW/60)))|0)+5020)); g.lineTo(x,hy-h); } g.lineTo(VW,hy+2); g.closePath(); g.fill();   // rừng gần
      for(let i=0;i<40;i++){ const x=((hash(i+5030)*VW*1.3-pan)%(VW*1.3)+VW*1.3)%(VW*1.3)-VW*0.15, y=hy-VH*0.03*hash(i+5031); glow(x,y,VH*0.012,0.5,'150,110,50'); }   // lá vàng thu
      const gr=g.createLinearGradient(0,hy,0,VH); gr.addColorStop(0,'#8a7f4c'); gr.addColorStop(1,'#4b4626'); g.fillStyle=gr; g.fillRect(0,hy,VW,VH-hy);   // bãi cỏ
      g.strokeStyle='rgba(40,38,18,0.45)'; g.lineWidth=1.5; for(let i=0;i<160;i++){ const f=hash(i+5040), y=hy+(VH-hy)*Math.pow(f,0.7), x=((hash(i+5041)*VW*1.2-pan*(0.5+f))%(VW*1.2)+VW*1.2)%(VW*1.2)-VW*0.1, L=4+f*18; g.beginPath(); g.moveTo(x,y); g.lineTo(x+L*0.3,y-L); g.stroke(); }   // ngọn cỏ
      for(let i=0;i<10;i++){ const f=hash(i+5050), y=hy+(VH-hy)*(0.2+0.8*f), x=((hash(i+5051)*VW*1.3-pan*(0.5+f))%(VW*1.3)+VW*1.3)%(VW*1.3)-VW*0.15; g.fillStyle='rgba(60,52,30,0.35)'; g.beginPath(); g.ellipse(x,y,VW*0.06*(0.4+f),VH*0.012*(0.4+f),0,0,Math.PI*2); g.fill(); } }   // mảng đất
    if(o.streak){ g.save(); g.globalAlpha=0.55; for(let i=0;i<46;i++){ const y=hash(i+5060)*VH, L=VW*(0.2+0.5*hash(i+5061)), x=((hash(i+5062)*VW*2+t*o.streak)%(VW*2))-VW*0.5; g.fillStyle=i%3?'rgba(70,64,40,0.5)':'rgba(230,220,190,0.45)'; g.fillRect(x,y,L,1.5+3*hash(i+5063)); } g.restore(); } }   // nền nhoè tốc độ
  function speedLines(cx,cy,a,dark){ g.save(); g.fillStyle=dark?`rgba(0,0,0,${0.35*a})`:`rgba(255,255,255,${0.3*a})`; const sd=Math.floor(performance.now()/60); for(let i=0;i<70;i++){ const an=hash(sd*13+i)*Math.PI*2, r0=VH*(0.25+hash(sd*7+i)*0.25), w=0.003+hash(i+sd*3)*0.008; g.beginPath(); g.moveTo(cx+Math.cos(an)*r0,cy+Math.sin(an)*r0); g.lineTo(cx+Math.cos(an-w)*VW,cy+Math.sin(an-w)*VW); g.lineTo(cx+Math.cos(an+w)*VW,cy+Math.sin(an+w)*VW); g.closePath(); g.fill(); } g.restore(); }
  function inkImpact(k,draw){ const inv=k>0.5; g.fillStyle=inv?'#050505':'#f4f1ea'; g.fillRect(0,0,VW,VH); g.fillStyle=inv?'#f4f1ea':'#0a0a0a';   // ⚪ khung va chạm: nền trắng + vết mực đen văng (nửa sau đảo âm bản)
    for(let i=0;i<48;i++){ const x=hash(i+5100)*VW, y=hash(i+5101)*VH, r=VH*(0.004+0.02*hash(i+5102)); g.save(); g.translate(x,y); g.rotate(hash(i+5103)*6); g.beginPath(); g.ellipse(0,0,r*2.4,r,0,0,Math.PI*2); g.fill(); g.restore(); }
    g.save(); g.filter=inv?'brightness(0) invert(1)':'brightness(0)'; draw(); g.restore(); }
  function fieldShotOld(U,t){ const Hs=VH;
    const ghostTop=(x,y,h,rot,a)=>{ g.save(); g.globalAlpha=a; g.translate(x,y); g.rotate(rot); g.beginPath(); g.rect(-h,-h-10,h*2,h*0.52+10); g.clip(); monster(0,0,h,true,1,0,0,2); g.restore(); };
    const mal=(x,y,L,ang)=>{ const hc=prep(IMG.mallet); if(!hc) return; g.save(); g.translate(x,y); g.rotate(ang); g.drawImage(hc.src,hc.sx,hc.sy,hc.sw,hc.sh,-L*0.5*hc.sw/hc.sh,-L,L*hc.sw/hc.sh,L); g.restore(); };
    const orb=(x,y,r)=>{ g.save(); g.globalCompositeOperation='lighter'; glow(x,y,r*2.4,0.9,'190,90,255'); glow(x,y,r,1,'255,230,255'); g.restore(); };
    const sh=(t0,t1)=>U>=t0&&U<t1, q=(t0,t1)=>seg(U,t0,t1);
    // ── COMBO 1 ──
    if(sh(7.4,8.05)){ const k=q(7.4,8.05), P=-k*60; fieldBG(t,{hy:0.5,pan:P});   // 1. toàn cảnh bãi cỏ: Larry giữa, 3 meme vây, 1 con ma lảng vảng xa xa
      monster(VW*0.13,VH*0.78,Hs*0.17,true,1,Math.sin(t*3)*0.05,0,2); actor(IMG.clapIdle,VW*0.86,VH*0.74,Hs*0.13,{flip:false}); actor(IMG.dogeBuff,VW*0.73,VH*0.77,Hs*0.19,{});
      cursedAura(VW*0.48,VH*0.8,Hs*0.3,'170,60,255',true,t,1); actor(IMG.larryMage,VW*0.48,VH*0.8,Hs*0.3,{}); actor(IMG.cheems,VW*0.64,VH*0.81,Hs*0.12,{}); return; }
    if(sh(8.05,8.55)){ const k=eio(q(8.05,8.55)); fieldBG(t,{hy:0.82}); speedLines(VW*0.4,VH*0.5,1,false);   // 2. góc thấp: Cheems bật nhảy lao vào, gậy giơ cao
      actor(IMG.larryMage,VW*0.22,VH*0.86,Hs*0.36,{filter:'brightness(0.7)'}); const x=lerp(VW*0.95,VW*0.45,k), y=lerp(VH*1.0,VH*0.62,k); mal(x-Hs*0.05,y-Hs*0.3,Hs*0.42,lerp(-0.4,-1.9,k)); actor(IMG.cheems,x,y,Hs*0.42,{rot:-0.25}); return; }
    if(sh(8.55,9.25)){ const k=q(8.55,9.25); fieldBG(t,{hy:0.42,pan:k*40});   // 3. trung cảnh: Cheems nện gậy liên tục, Larry đỡ bằng gậy phép · phía sau Clapping Cat chạy vòng ra sau lưng Larry
      actor(IMG.clapIdle,lerp(VW*1.02,VW*0.08,k),VH*0.6-Math.abs(Math.sin(t*16))*6,Hs*0.12,{flip:true});
      cursedAura(VW*0.38,VH*0.98,Hs*0.6,'170,60,255',true,t,1); actor(IMG.larryMage,VW*0.38,VH*0.99,Hs*0.66,{rot:0.04*Math.sin(t*40)});
      const sw=Math.abs(Math.sin(Math.PI*(U-8.55)/0.17)); mal(VW*0.6,VH*0.66,Hs*0.4,-0.6-1.6*sw); actor(IMG.cheems,VW*0.64,VH*0.95-sw*16,Hs*0.32,{});
      if(sw>0.92){ g.save(); g.globalCompositeOperation='lighter'; glow(VW*0.5,VH*0.58,Hs*0.1,0.9,'255,220,160'); g.restore(); } return; }
    if(sh(9.25,9.6)){ const k=q(9.25,9.6); fieldBG(t,{hy:0.58}); speedLines(VW*0.5,VH*0.55,0.8,true);   // 4. Larry xoay người, hất bay Cheems văng qua máy
      g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<3;i++){ g.strokeStyle=`rgba(190,90,255,${0.6-i*0.15})`; g.lineWidth=14-i*4; g.beginPath(); g.ellipse(VW*0.5,VH*0.7,VW*(0.25+i*0.08)*eout(k),VH*0.1,0,t*8+i,t*8+i+4); g.stroke(); } g.restore();
      actor(IMG.larryMage,VW*0.5,VH*1.12,Hs*0.95,{sx:Math.cos(Math.PI*4*k)}); actor(IMG.cheems,lerp(VW*0.62,VW*1.15,eout(k)),lerp(VH*0.6,VH*0.15,k),Hs*lerp(0.3,0.75,k),{rot:k*7}); return; }
    if(sh(9.6,10.1)){ const k=q(9.6,10.1); fieldBG(t,{hy:0.5});   // 5. qua vai Larry: hắn quay sang Clapping Cat, tụ cầu tím trong tay
      actor(IMG.clap[0],VW*0.68,VH*0.82,Hs*0.27,{flip:false}); actor(IMG.larryMage,VW*0.2,VH*1.32,Hs*1.15,{filter:'brightness(0.55)',sx:-1}); orb(VW*0.33,VH*0.52,Hs*lerp(0.02,0.07,k)); return; }
    if(sh(10.28,10.7)){ const k=q(10.28,10.7); fieldBG(t,{hy:0.5});   // 7. cùng góc: chỗ Clapping Cat giờ là CON MA → lãnh trọn chưởng, bị thổi bay còn nửa người
      const hit=q(10.3,10.38); if(hit<1){ monster(VW*0.68,VH*0.86,Hs*0.48,false,1,0,0,2); } else { const f=q(10.38,10.7); g.save(); g.globalAlpha=1-f; g.beginPath(); g.rect(0,VH*0.86-Hs*0.24,VW,VH); g.clip(); monster(VW*0.68,VH*0.86,Hs*0.48,false,1,0.2,0,2); g.restore(); ghostTop(lerp(VW*0.68,VW*0.95,eout(f)),lerp(VH*0.86,VH*0.45,eout(f)),Hs*0.48,f*5,1); }
      swapPop(VW*0.68,VH*0.82,Hs*0.3,q(10.28,10.45));
      if(hit<1){ g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round'; const ex=lerp(VW*0.33,VW*0.66,hit); for(const [lw,al] of [[70,0.25],[26,0.6],[10,1]]){ g.strokeStyle=`rgba(200,110,255,${al})`; g.lineWidth=lw; g.beginPath(); g.moveTo(VW*0.33,VH*0.52); g.lineTo(ex,VH*0.66); g.stroke(); } g.restore(); }
      else softShock(VW*0.68,VH*0.66,lerp(30,VH*0.5,eout(q(10.38,10.7))),0.8*(1-q(10.38,10.7)),'190,90,255',0.8);
      actor(IMG.larryMage,VW*0.2,VH*1.32,Hs*1.15,{filter:'brightness(0.55)',sx:-1}); return; }
    if(sh(10.88,11.45)){ const k=q(10.88,11.45); fieldBG(t,{hy:0.95}); speedLines(VW*0.45,VH*0.72,1,false);   // 9. góc ngước: nửa con ma hoá thành BUFF DOGE giữa trời, lao xuống đấm
      swapPop(VW*0.72,VH*0.55,Hs*0.45,q(10.88,11.1)); const x=lerp(VW*0.72,VW*0.48,ein(k)), y=lerp(VH*0.68,VH*0.97,ein(k)); actor(IMG.dogeHit,x,y,Hs*0.62,{flip:true,rot:lerp(-0.5,0.4,k)}); return; }
    if(sh(11.45,11.62)){ inkImpact(q(11.45,11.62),()=>{ actor(IMG.dogeHit,VW*0.38,VH*0.85,Hs*0.6,{flip:true,rot:0.4}); actor(IMG.larryMage,VW*0.68,VH*0.95,Hs*0.7,{rot:0.3}); }); return; }   // 10. khung va chạm mực đen
    if(sh(11.62,12.2)){ const k=q(11.62,12.2); fieldBG(t,{hy:0.5,pan:k*900,streak:-2600});   // 11. lia theo Larry bị đấm văng xuyên bãi cỏ, bụi tung sau lưng
      for(let i=0;i<8;i++) puff(VW*(0.15+i*0.05)-k*80,VH*0.86-i*4,Hs*(0.05+i*0.01),0.4,'150,135,95'); actor(IMG.larryMage,VW*0.55,VH*0.72-Math.sin(Math.PI*k)*VH*0.1,Hs*0.5,{center:true,rot:k*6}); return; }
    // ── COMBO 2 ──
    if(sh(12.2,12.7)){ const k=q(12.2,12.7); fieldBG(t,{hy:1.05,pan:k*200}); speedLines(VW*0.8,VH*0.5,0.7,false);   // 12. Doge + Clapping Cat bật nhảy đuổi theo (góc ngước trời)
      actor(IMG.clap[0],lerp(VW*0.05,VW*0.5,k),lerp(VH*0.5,VH*0.28,k),Hs*0.22,{flip:true}); actor(IMG.dogeBuff,lerp(VW*0.2,VW*0.7,k),lerp(VH*0.95,VH*0.6,k),Hs*0.5,{flip:true}); return; }
    if(sh(12.7,13.0)){ const k=q(12.7,13.0); fieldBG(t,{hy:0.62}); speedLines(VW*0.5,VH*0.4,0.6,true);   // 13. cận Larry quay lại, tụ cầu tím → chưởng
      actor(IMG.larryMage,VW*0.5,VH*1.45,Hs*1.6,{sx:-1}); orb(VW*0.38,VH*0.46,Hs*lerp(0.03,0.09,k)); if(k>0.85){ g.fillStyle=`rgba(230,190,255,${0.7*(k-0.85)/0.15})`; g.fillRect(0,0,VW,VH); } return; }
    if(sh(13.18,13.5)){ const k=q(13.18,13.5); fieldBG(t,{hy:0.9,pan:k*120});   // 15. giữa trời: Clapping Cat (vừa đổi vào chỗ Doge) LỘN QUA quả chưởng lướt ngay bên dưới · Doge phía sau
      swapPop(VW*0.5,VH*0.62,Hs*0.3,q(13.18,13.35)); actor(IMG.dogeBuff,VW*0.2,VH*0.35,Hs*0.25,{flip:true});
      const bx=lerp(VW*1.1,VW*-0.1,k); orb(bx,VH*0.72,Hs*0.06); for(let i=1;i<6;i++) puff(bx+i*VW*0.03,VH*0.72,Hs*0.05-i*4,0.5,'120,40,180');
      actor(IMG.clapUp,VW*0.5,VH*0.6-Math.sin(Math.PI*k)*VH*0.12,Hs*0.3,{center:true,rot:-Math.PI*2*eio(k),flip:true}); return; }
    if(sh(13.68,13.98)){ const k=q(13.68,13.98); fieldBG(t,{hy:0.85}); speedLines(VW*0.55,VH*0.5,0.9,false);   // 17. Doge (đổi vào chỗ Clapping Cat) ĐẤM BẬT quả chưởng thứ 2 lên trời
      swapPop(VW*0.45,VH*0.75,Hs*0.5,q(13.68,13.85)); const hitK=q(13.78,13.98), bx=hitK>0?lerp(VW*0.58,VW*0.8,hitK):lerp(VW*1.05,VW*0.58,q(13.68,13.78)), by=hitK>0?lerp(VH*0.42,VH*-0.2,hitK):VH*0.42;
      orb(bx,by,Hs*0.07); actor(IMG.dogeHit,VW*0.42,VH*0.92,Hs*0.62,{flip:true,rot:lerp(0.3,-0.6,eout(q(13.72,13.82)))}); if(hitK>0&&hitK<0.25){ g.save(); g.globalCompositeOperation='lighter'; glow(VW*0.58,VH*0.42,Hs*0.3,1-hitK*4,'255,240,220'); g.restore(); } return; }
    if(sh(14.16,14.5)){ const k=q(14.16,14.5); bgFocus(t,'#ffe9a8','#6a3a08',false,VW*0.5,VH*0.6); actor(IMG.larryMage,VW*0.55,VH*1.25,VH*0.75,{rot:0.25,sy:0.92});   // 19. BONK: Cheems (đổi vào chỗ Clapping Cat) nện chày từ trên xuống
      swapPop(VW*0.33,VH*0.45,Hs*0.4,q(14.16,14.3)); actor(IMG.cheems,VW*0.33,VH*0.55,VH*0.38,{rot:-0.3}); mal(VW*0.4,VH*0.4,VH*0.42,lerp(-1.2,1.1,eout(Math.min(1,k*3))));
      if(k>0.3){ g.save(); g.globalCompositeOperation='lighter'; glow(VW*0.55,VH*0.45,VH*0.4*(1-k),0.9,'255,250,220'); g.restore(); } text('BONK!',VW*0.72,VH*0.22,110,'#ffe066','#000',undefined,seg(k,0.25,0.4)); return; }
    if(sh(14.5,14.75)){ const k=q(14.5,14.75); fieldBG(t,{hy:0.45});   // 19b. Larry bị cắm xuống đất, bụi bung vòng tròn
      g.fillStyle='rgba(40,34,20,0.7)'; g.beginPath(); g.ellipse(VW*0.5,VH*0.8,VW*0.18,VH*0.05,0,0,Math.PI*2); g.fill(); actor(IMG.larryMage,VW*0.5,VH*0.84,Hs*0.45,{sy:0.7});
      dustWall(VW*0.5,VH*0.8,lerp(40,VW*0.4,eout(k)),0.7*(1-k)); return; }
    if(sh(14.75,15.1)){ const k=q(14.75,15.1); fieldBG(t,{hy:0.45});   // 20. Larry gượng dậy giữa hố, tảng đá ngay bên cạnh
      rockAt(VW*0.72,VH*0.86,Hs*0.17); g.fillStyle='rgba(40,34,20,0.7)'; g.beginPath(); g.ellipse(VW*0.45,VH*0.86,VW*0.16,VH*0.04,0,0,Math.PI*2); g.fill();
      cursedAura(VW*0.45,VH*0.88,Hs*0.5,'170,60,255',true,t,1); actor(IMG.larryMage,VW*0.45,VH*0.88,Hs*0.55,{sy:lerp(0.72,1,eout(k))}); actor(IMG.cheems,VW*0.12,VH*0.86,Hs*0.12,{}); return; }
    if(sh(15.28,15.6)){ const k=q(15.28,15.6); fieldBG(t,{hy:0.95}); speedLines(VW*0.4,VH*0.4,1,false);   // 22. góc ngước: tảng đá hoá thành Doge → ĐẤM MÓC hất Larry bay lên
      swapPop(VW*0.62,VH*0.95,Hs*0.5,q(15.28,15.45)); actor(IMG.larryMage,lerp(VW*0.38,VW*0.3,k),lerp(VH*0.75,VH*0.2,ein(q(15.38,15.6))),Hs*0.5,{rot:-k*2});
      actor(IMG.dogeHit,VW*0.6,VH*1.02,Hs*0.75,{flip:true,rot:lerp(0.6,-0.7,eout(q(15.3,15.4)))}); return; }
    if(sh(15.6,15.75)){ inkImpact(q(15.6,15.75),()=>{ actor(IMG.dogeHit,VW*0.6,VH*0.95,Hs*0.6,{flip:true,rot:-0.6}); actor(IMG.larryMage,VW*0.35,VH*0.6,Hs*0.6,{rot:-0.6}); }); return; }
    if(sh(15.75,15.9)){ const k=q(15.75,15.9); fieldBG(t,{hy:0.7}); actor(IMG.larryMage,lerp(VW*0.5,VW*0.15,k),lerp(VH*0.55,VH*0.05,k),Hs*0.14,{rot:-k*8}); return; }   // 23. Larry bay vút khỏi bãi cỏ
    // 6/8/14/16/18/21: cận vỗ tay
    for(const [a,b] of FIELD_CLAPS) if(sh(a,b)){ clapZoom(q(a,b),t); return; }
    fieldBG(t,{hy:0.5}); }
  // 🎬 nhịp dựng THEO ĐÚNG 25s đầu trận Itadori + Todo vs Hanami: máy chạy theo → qua vai kẻ địch → khung trắng mực → … mỗi lần đổi chỗ: cận MẮT → cận 2 BÀN TAY vỗ → TRẮNG XOÁ mực văng → cắt sang chỗ mới
  //    → chuỗi đấm cận cực gần → mặt kẻ địch trên nền đỏ đen. Các cảnh cũ (fieldShotOld) dùng lại bằng cách co giãn thời gian vào đúng ô.
  const FSEQ=[[7.4,8.1,'run'],[8.1,8.7,'ots'],[8.7,8.8,'ink'],[8.8,9.45,8.55,9.25],[9.45,9.8,9.25,9.6],[9.8,10.25,9.6,10.1],[10.25,10.42,'eye'],[10.42,10.52,'hands'],[10.52,10.8,'ink'],
    [10.8,11.22,10.28,10.7],[11.22,11.3,'hands'],[11.3,11.48,'ink'],[11.48,12.0,10.88,11.45],[12.0,12.55,'barrage'],[12.55,13.15,'redface'],[13.15,13.7,11.62,12.2],
    [13.7,14.15,12.2,12.7],[14.15,14.45,12.7,13.0],[14.45,14.53,'hands'],[14.53,14.66,'ink'],[14.66,14.98,13.18,13.5],[14.98,15.06,'hands'],[15.06,15.18,'ink'],[15.18,15.48,13.68,13.98],
    [15.48,15.56,'hands'],[15.56,15.68,'ink'],[15.68,16.02,14.16,14.5],[16.02,16.27,14.5,14.75],[16.27,16.62,14.75,15.1],[16.62,16.7,'hands'],[16.7,16.82,'ink'],[16.82,17.14,15.28,15.6],[17.14,17.27,15.6,15.75],[17.27,17.4,15.75,15.9]];
  function inkFlash(k){ g.fillStyle='#f6f3ec'; g.fillRect(0,0,VW,VH); if(k>0.75) return; const sp=0.7+0.5*k;   // ⚪ trắng xoá + MỰC ĐEN văng toả ra
    g.fillStyle='#0b0b0b'; for(let i=0;i<34;i++){ const an=hash(i+5200)*Math.PI*2, d=VH*(0.1+0.55*hash(i+5201))*sp, x=VW/2+Math.cos(an)*d*1.5, y=VH/2+Math.sin(an)*d, L=VH*(0.03+0.09*hash(i+5202)), w=VH*(0.008+0.02*hash(i+5203));
      g.save(); g.translate(x,y); g.rotate(an); g.beginPath(); g.moveTo(-L*0.6,0); g.quadraticCurveTo(0,-w,L,0); g.quadraticCurveTo(0,w*1.4,-L*0.6,0); g.fill(); g.beginPath(); g.arc(L*1.25,0,w*0.7,0,Math.PI*2); g.fill(); g.restore(); }
    for(let i=0;i<22;i++){ const x=hash(i+5250)*VW, y=hash(i+5251)*VH, r=VH*(0.003+0.008*hash(i+5252)); g.beginPath(); g.arc(x,y,r,0,Math.PI*2); g.fill(); } }
  function fieldShot(U,t){ const Hs=VH;
    for(const S of FSEQ){ if(U<S[0]||U>=S[1]) continue; const k=seg(U,S[0],S[1]);
      if(typeof S[2]==='number') return fieldShotOld(lerp(S[2],S[3],k),t);
      const kind=S[2];
      if(kind==='ink') return inkFlash(k);
      if(kind==='run'){ fieldBG(t,{hy:0.56,pan:k*1500,streak:-2200});   // máy đặt thấp chạy theo Doge + Clapping Cat lao về phía Larry
        actor(IMG.clapIdle,VW*0.66,VH*0.8-Math.abs(Math.sin(t*15))*10,Hs*0.24,{flip:false}); actor(IMG.dogeBuff,VW*0.3,VH*1.14-Math.abs(Math.sin(t*13))*18,Hs*0.85,{}); return; }
      if(kind==='ots'){ g.save(); const z=lerp(1,1.08,k); g.translate(VW/2,VH/2); g.scale(z,z); g.translate(-VW/2,-VH/2); fieldBG(t,{hy:0.47});   // qua vai Larry: 3 meme nhỏ xíu lao tới từ xa
        const a=lerp(0.1,0.16,k); actor(IMG.cheems,VW*0.58,VH*0.64,Hs*a*0.7,{}); actor(IMG.dogeBuff,VW*0.66,VH*0.63,Hs*a,{}); actor(IMG.clapIdle,VW*0.74,VH*0.62,Hs*a*0.75,{});
        cursedAura(VW*0.18,VH*1.3,Hs*0.9,'170,60,255',true,t,0.8); actor(IMG.larryMage,VW*0.17,VH*1.38,Hs*1.25,{filter:'brightness(0.5)',sx:-1}); g.restore(); return; }
      if(kind==='eye'){ fieldBG(t,{hy:0.6,pan:t*300,streak:-1500}); const z=lerp(2.6,3.4,eio(k)); actor(IMG.clapIdle,VW*0.5,VH*0.5+Hs*z*0.78,Hs*z,{}); return; }   // máy đẩy sát vào MẮT Clapping Cat
      if(kind==='hands'){ bgFocus(t,'#e2cf9e','#5a4620',false,VW*0.5,VH*0.42); actor(k<0.5?IMG.clap[0]:IMG.clapUp,VW*0.5,VH*1.18,Hs*1.25,{glow:'rgba(255,235,190,0.9)',gb:22}); if(k>=0.5){ g.save(); g.globalCompositeOperation='lighter'; glow(VW*0.5,VH*0.45,Hs*0.25,0.9,'255,250,230'); g.restore(); ring(VW*0.5,VH*0.45,Hs*lerp(0.05,0.4,(k-0.5)*2),1-(k-0.5)*2,'255,250,235',6,0.9); } return; }   // cận 2 BÀN TAY vỗ
      if(kind==='barrage'){ const sub=Math.min(2,Math.floor(k*3)), kk=k*3-sub; if(kk<0.18) return inkFlash(kk/0.18*0.6);   // chuỗi đấm cận cực gần vào thân Larry, có vệt gió
        const side=sub%2?-1:1; g.fillStyle='#2a1838'; g.fillRect(0,0,VW,VH); actor(IMG.larryMage,VW*(0.5+side*0.05),VH*0.5+Hs*1.1,Hs*2.6,{filter:'brightness(0.8)',rot:side*0.08});
        g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle='rgba(255,255,255,0.7)'; for(let i=0;i<26;i++){ const y=VH*(0.2+0.6*hash(i+5300+sub*40)), L=VW*(0.15+0.3*hash(i+5301)); g.lineWidth=2+4*hash(i+5302); g.beginPath(); g.moveTo(side>0?0:VW,y); g.lineTo(side>0?L:VW-L,y+(hash(i+5303)-0.5)*20); g.stroke(); } g.restore();
        actor(IMG.dogeHit,side>0?lerp(-VW*0.1,VW*0.32,eout(Math.min(1,kk*2))):lerp(VW*1.1,VW*0.68,eout(Math.min(1,kk*2))),VH*1.25,Hs*1.4,{flip:side>0,rot:side*0.4});
        if(kk>0.45&&kk<0.6){ g.save(); g.globalCompositeOperation='lighter'; glow(VW*0.5,VH*0.5,Hs*0.4,0.9,'255,250,235'); g.restore(); } return; }
      if(kind==='redface'){ g.fillStyle='#e0000f'; g.fillRect(0,0,VW,VH); g.fillStyle='#120006'; for(let i=0;i<14;i++){ g.beginPath(); g.ellipse(VW*hash(i+5400),VH*hash(i+5401),VW*(0.04+0.1*hash(i+5402)),VH*(0.03+0.08*hash(i+5403)),hash(i+5404)*3,0,Math.PI*2); g.fill(); }   // mặt Larry trên nền ĐỎ ĐEN phẳng, đứng hình
        const z=lerp(1,1.05,k); actor(IMG.larryMage,VW*0.42,VH*0.5+Hs*2.4*z*0.55,Hs*2.4*z,{filter:'brightness(0.6) sepia(1) hue-rotate(200deg) saturate(2.5)'}); return; } }
    fieldBG(t,{hy:0.5}); }
  const FIELD_CLAPS=[[10.1,10.28],[10.7,10.88],[13.0,13.18],[13.5,13.68],[13.98,14.16],[15.1,15.28]];
  const cUw=U=>U<7.4?U:U<17.4?7.39:U-3.1;   // giờ của phần chiến trường (trận Larry ở bãi cỏ riêng chen giữa 7.4 → 15.9)
  function scC(U,t){ scCw(cUw(U),t); if(U>=7.4&&U<17.4) ins(()=>fieldShot(U,t)); }
  const camCw=U=>keys(U,[[0,790,790,0.95,0],[1.6,860,740,0.62,0],[2.6,860,740,0.62,0],[3.37,860,740,0.62,0],
    [3.4,320,770,0.92,0],[4.4,390,770,0.98,0],[4.6,430,790,1.2,0.04],[5.1,430,660,1.05,-0.04],[5.6,430,790,1.3,0.05],[6.0,450,780,1.0,0],[6.8,600,770,1.2,0.06],[7.2,650,760,0.8,0],[7.37,660,760,0.8,0],   // Stalin + Adolf vs Gary
    [7.4,1250,770,0.8,0],[7.85,1210,780,1.05,0.02],[8.6,1190,780,1.0,0],[8.85,1320,770,0.8,0],[9.1,1060,770,0.9,0],[9.45,1040,770,0.95,0],[9.6,900,770,0.85,0],[9.95,950,740,0.85,0],[10.2,1080,760,1.05,-0.04],[10.6,1450,740,0.62,0],[11.0,1700,760,0.64,0],   // combo 1
    [11.4,1500,700,0.58,0],[11.65,1580,690,0.72,0.03],[12.05,1690,700,0.8,-0.03],[12.45,1800,680,0.85,0],[12.6,1880,740,1.0,0.04],[12.9,1880,770,0.82,0],[13.45,1910,770,0.9,0],[13.6,1890,740,1.0,-0.04],[14.6,1300,620,0.5,0],   // combo 2
    [15.2,940,760,0.62,0],[16.0,940,760,0.56,0],[17.2,940,740,0.64,0.02],[17.4,940,740,0.42,0],[18.6,940,740,0.4,0]]);
  const camC=U=>camCw(cUw(U));

  // ═════════ D — SPIDER CAT (vệt đen tím) + UIA (vệt vàng) LƯỚT CHÉO ZIC-ZẮC xuyên cả bầy quái → lướt qua hết rồi cả bầy mới ĐỒNG LOẠT chết ═════════
  const DM=[...Array(18)].map((_,i)=>({x:-200+(i%6)*230+(Math.floor(i/6)%2)*110, y:690+Math.floor(i/6)*95, ph:hash(i+1800)*6}));
  const DPATH=[[[-500,640],[120,900],[380,660],[700,920],[980,650],[1350,900]],[[-500,920],[60,660],[420,900],[760,650],[1050,910],[1350,640]]];   // 2 đường zic-zắc đan chéo nhau
  const pathAt=(P,f)=>{ const n=P.length-1, s=Math.min(n-1e-6,Math.max(0,f*n)), i=Math.floor(s), k=s-i; return [lerp(P[i][0],P[i+1][0],k),lerp(P[i][1],P[i+1][1],k),Math.atan2(P[i+1][1]-P[i][1],P[i+1][0]-P[i][0])]; };
  function scD(u,t){ const die=seg(u,3.2,4.6);
    const RUN=[[IMG.spider,'170,90,255','20,0,30',0.4,2.5,0],[IMG.uia,'255,210,60','120,80,0',0.55,2.65,1]];
    // 👹 bầy quái: đứng gầm gừ → lúc 2 vệt lướt qua bị khựng giật · khi cả 2 đã qua hết → đồng loạt bị chẻ đôi
    DM.forEach((m,i)=>{ if(die>0){ halves(m.x,m.y,108,false,Math.min(1,die*1.3+hash(i)*0.15),-0.6+hash(i+1)*1.2,i); return; }
      const jolt=u>0.4&&u<2.7?Math.sin(t*60+i)*2:0; monster(m.x+jolt,m.y,108,false,1,Math.sin(t*3+m.ph)*0.05,0,i); });
    if(die>0) halves(1180,640,420,false,Math.min(1,die*1.1),-0.5,7); else giant(1180,640,420,7,t,false);   // 🗿 con khổng lồ phía sau cũng bị chẻ đôi
    if(u>=3.2&&u<3.27){ shake=30; for(const m of DM) sparks(m.x,m.y-60,6,Math.random()<0.5?'200,140,255':'255,220,90',7); }
    // ⚡ 2 vệt lướt: đuôi dài nhiều lớp + bóng mờ + nhân vật ở đầu vệt
    RUN.forEach(([im,c,dk,a,b,j])=>{ const f=seg(u,a,b), P=DPATH[j]; if(f<=0) return;
      const tail=Math.max(0,f-0.35), N=40; g.save(); g.lineCap='round'; g.lineJoin='round';
      for(const [lw,col,cmp] of [[46,`rgba(${c},0.18)`,'lighter'],[20,`rgba(${c},0.6)`,'lighter'],[7,j?'rgba(255,250,220,1)':`rgba(${dk},1)`,j?'lighter':'source-over']]){ g.globalCompositeOperation=cmp; g.strokeStyle=col; g.lineWidth=lw;
        g.beginPath(); for(let s=0;s<=N;s++){ const p=pathAt(P,lerp(tail,f,s/N)); s?g.lineTo(p[0],p[1]-50):g.moveTo(p[0],p[1]-50); } g.stroke(); }
      g.restore();
      const [x,y,ang]=pathAt(P,f), done=f>=1;
      if(!done){ for(let k=1;k<5;k++){ const q=pathAt(P,Math.max(0,f-k*0.025)); actor(im,q[0],q[1],100,{a:0.3-k*0.06,rot:q[2]*0.4}); }
        g.save(); g.globalCompositeOperation='lighter'; glow(x,y-50,90,0.8,c); g.restore(); if(Math.random()<0.7) sparks(x,y-50,3,c,6); }
      const ex=done?P[P.length-1][0]-60:x, ey=done?P[P.length-1][1]:y;
      if(done) shadow(ex,ey,30,0.4); actor(im,ex,ey,done?110:100,{rot:done?0:ang*0.4,flip:j===1?flipTo('uiacat',true):false}); });
    // 🎬 cận: 2 vệt đan chéo nhau ngay trước mặt 1 con quái (slow) — con quái chưa kịp phản ứng
    if(u>=1.25&&u<1.75) ins(()=>{ const q=seg(u,1.25,1.75); bgFocus(t,'#1a0a28','#050008',true,VW/2,VH*0.5); monster(VW/2,VH*0.92,VH*0.55,false,1,0);
      g.save(); g.lineCap='round'; g.globalCompositeOperation='lighter'; for(const [c,a0,a1] of [['170,90,255',[-0.1,0.25],[1.1,0.75]],['255,210,60',[-0.1,0.78],[1.1,0.3]]]){ const k=Math.min(1,q*2.5);
        for(const [lw,al] of [[40,0.2],[14,0.7],[4,1]]){ g.strokeStyle=`rgba(${c},${al})`; g.lineWidth=lw; g.beginPath(); g.moveTo(VW*a0[0],VH*a0[1]); g.lineTo(VW*lerp(a0[0],a1[0],k),VH*lerp(a0[1],a1[1],k)); g.stroke(); } } g.restore(); });
  }
  const camD=u=>keys(u,[[0,250,760,0.8,0],[0.4,250,760,0.8,0.03],[2.7,780,770,0.8,-0.03],[3.15,900,770,0.85,0],[3.2,450,760,0.5,0],[5.5,450,760,0.48,0]]);

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
  function scG0(u,t){ const x=260, y=880, grow=eio(seg(u,0.1,1.6)), fall=ein(seg(u,1.7,2.25)), open=seg(u,2.25,3.4);
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
      if(open<1 && Math.random()<0.9){ const ex=lerp(X0,X0+1250,eout(open)); dust(ex,GC.cy,3,90); for(let q=0;q<3;q++) parts.push({k:'rock',x:ex+(Math.random()-0.5)*60,y:GC.cy-20,vx:(Math.random()-0.5)*3,vy:-3-Math.random()*4,l:50,L:50,c:'70,48,40',r:4+Math.random()*8}); }
      if(Math.random()<0.4*(1-seg(u,3.6,4.5))){ const rx=lerp(X0+60,X0+1200,Math.random())*Math.min(1,eout(open)*1.2); parts.push({k:'rock',x:rx,y:GC.cy-25,vx:0,vy:2,l:30,L:30,c:'90,62,50',r:3+Math.random()*6}); }   // đá vụn lở xuống vực
    }
    // 👹 lũ quỷ: vực mở tới đâu thì hụt chân rơi xuống tới đó (cắt theo mép dưới vực → như rơi vào trong)
    for(let i=0;i<9;i++){ const mx=GC.x0+40+i*120, my=GC.cy-30+(i%3)*30, reach=GC.x0+lerp(0,1250,eout(open)), f=open>0&&reach>mx?seg(u,2.25+(mx-GC.x0)/1250*1.15,2.25+(mx-GC.x0)/1250*1.15+1.1):0;
      if(f>=1) continue;
      if(f<=0){ monster(mx,my,108,false,1,Math.sin(t*3+i)*0.05,0,i+2); continue; }
      const dy=ein(f)*260, sx=mx+(hash(i)-0.5)*40*f;
      g.save(); g.beginPath(); g.moveTo(-3000,-3000); g.lineTo(3000,-3000); for(let k=N;k>=0;k--) g.lineTo(bot[k][0],bot[k][1]); g.lineTo(-3000,GC.cy+60); g.closePath(); g.clip();
      actor(IMG.soul,sx,lerp(my,GC.cy,Math.min(1,f*3))+dy,108*(1-f*0.25),{rot:(hash(i+5)-0.5)*3*f,filter:`brightness(${1-f*0.7})`}); g.restore();
      if(f<0.2 && Math.random()<0.4) sparks(sx,GC.cy-40,3,'255,120,60',3); }
    const h=lerp(120,560,grow); shadow(x+fall*h*0.55,y,h*0.4,0.5); actor(IMG.chonky,x,y,h,{flip:true,rot:fall*1.45+(1-fall)*Math.sin(u*6)*0.05*grow,sx:1+0.05*Math.sin(u*8)*grow*(1-fall)});
    if(u>=2.25 && u<2.33){ shake=30; dust(x+300,y,45,420); rocks(x+300,y,35,4); } impact(x+330,y-60,seg(u,2.25,2.7),320); }
  const camG0=u=>keys(u,[[0,360,760,1.0],[1.6,420,680,0.62],[2.3,560,720,0.58],[4.5,860,760,0.6]]);
  // 🐕 thêm mở đầu: cận Chonky giữa vòng vây quái, mắt híp lại, hào quang vàng bùng lên → bắt đầu hoá khổng lồ
  function scG(u,t){ scG0(Math.max(0,u-0.8),t);
    if(false) ins(()=>{ const q=seg(u,0,0.8); bgFocus(t,'#ffcf6a','#3a1a02',true,VW/2,VH*0.6);
      for(let i=0;i<3;i++){ const f=(q*1.5+i/3)%1; ring(VW/2,VH*0.75,lerp(60,VW*0.8,f),0.7*(1-f),'255,220,120',6,0.4); }
      monster(VW*0.12,VH*0.92,VH*0.38,true,1,0.05); monster(VW*0.9,VH*0.92,VH*0.38,false,1,-0.05);
      actor(IMG.chonky,VW/2+Math.sin(t*40)*q*4,VH*0.95,VH*0.5*lerp(1,1.15,ein(q)),{flip:true}); if(q>0.85){ g.fillStyle=`rgba(255,240,200,${(q-0.85)/0.15*0.7})`; g.fillRect(0,0,VW,VH); } }); }
  const camG=u=>u<0.8?camG0(0):camG0(u-0.8);

  // ═════════ H — KING CHEEMS bị kỵ sĩ vây → MỘT NHÁT CẮT · Joninn tra kiếm vào vỏ → cả bầy chết ═════════
  const HK={x:250,y:830}, HJ={x:470,y:1040};
  function scH0(u,t){ const close=eio(seg(u,0,2.6)), cut=u>=3.0, die=seg(u,4.0,5.6), sheath=seg(u,3.1,3.9);
    g.save(); g.fillStyle=`rgba(0,0,0,${0.35*close})`; g.fillRect(-1500,-1500,3500,3500); g.restore();   // tối dần, căng thẳng
    const N=9; for(let i=0;i<N;i++){ const a=Math.PI+(i/(N-1))*Math.PI*1.0-0.0, R=lerp(330,175,close), mx=HK.x+Math.cos(a)*R*1.2, my=HK.y-30+Math.sin(a)*70*(i%2?1:0.6)+40;
      const raise=seg(u,2.2,2.9)*0.4; if(die>0) halves(mx,my,128,Math.cos(a)<0,die,-0.2,i*3); else monster(mx,my,128,Math.cos(a)<0,1,-raise*(Math.cos(a)>0?-1:1),0,i*3); }   // quay mặt vào King
    addGlow(HK.x,HK.y-70,140,0.35+0.2*close,'255,210,90'); shadow(HK.x,HK.y,50); actor(IMG.king,HK.x,HK.y,140,{rot:Math.sin(t*12)*0.015*close});
    if(u>=3.0 && u<3.35){ const k=seg(u,3.0,3.35); slash(-200,HK.y-260,900,HK.y+80,1-k,'240,250,255'); }   // 1 nhát cắt xuyên ngang cả khung
    if(u>=3.0 && u<3.08) shake=10;
    // Joninn tiền cảnh (cùng khung): tay tra kiếm vào vỏ — CẠCH
    if(cut){ shadow(HJ.x,HJ.y,70,0.5); actor(IMG.joninn,HJ.x,HJ.y,250,{flip:true}); if(sheath>0.95 && u<4.1){ addGlow(HJ.x-30,HJ.y-95,40,1-seg(u,3.9,4.1),'255,255,255'); } }
  }
  const camH0=u=>keys(u,[[0,300,760,0.95],[1.2,300,780,1.05],[1.25,250,700,1.9,0],[2.0,250,690,2.1,0],[2.05,60,800,1.3,0],[2.9,90,800,1.4,0],[3.0,330,820,0.95,0],[4.0,330,820,0.98],[4.05,250,800,1.25,0],[5.2,260,800,1.15,0],[6.5,330,800,0.88]]);   // cận mặt King → góc thấp kỵ sĩ áp sát → 1 nhát cắt (cùng khung Joninn) → cận cả bầy đứt đôi
  // 👑 thêm mở đầu: lưỡi kiếm của bầy kỵ sĩ loé sáng khép vòng quanh King Cheems, mồ hôi chảy · (giữa cảnh có chớp trắng lúc chém → dời theo)
  function scH(u,t){ scH0(Math.max(0,u-0.8),t);
    if(u<0.8) ins(()=>{ const q=seg(u,0,0.8); bgFocus(t,'#2a2010','#050302',true,VW/2,VH*0.55);
      for(let i=0;i<6;i++){ const a=Math.PI*(1.0+i*0.2), r=lerp(VW*1.0,VW*0.62,eout(q)), x=VW/2+Math.cos(a)*r, y=VH*0.66+Math.sin(a)*r*0.35; actor(IMG.knight||IMG.soul,x,y,VH*0.2,{flip:Math.cos(a)>0,filter:'brightness(0.6)'});
        if(Math.sin(t*20+i*2)>0.7) addGlow(x+(Math.cos(a)>0?-1:1)*30,y-VH*0.2,26,1,'255,255,255'); }
      actor(IMG.king,VW/2,VH*0.98,VH*0.42,{}); g.save(); g.globalCompositeOperation='lighter'; glow(VW/2,VH*0.7,VW*0.4,0.35,'255,210,90'); g.restore();
      if(q>0.4){ const dy=(q-0.4)*VH*0.12; g.fillStyle='rgba(180,220,255,0.85)'; g.beginPath(); g.ellipse(VW*0.58,VH*0.62+dy,5,9,0,0,Math.PI*2); g.fill(); } }); }
  const camH=u=>u<0.8?camH0(0):camH0(u-0.8);

  // ═════════ I — phe ác yếu thế · quỷ khổng lồ trồi lên ═════════
  const QX=1020;
  function scI(u,t){ const rise=eout(seg(u,1.4,3.6)), gx=lerp(820,980,eio(seg(u,0.2,2.0)));
    for(let i=0;i<10;i++){ const mx=300+i*70, my=700+(i%3)*60, k=seg(u,0.1+i*0.08,1.1+i*0.08); if(k<1) halves(mx,my,100,false,k,-0.1+(i%2)*0.3); }
    chaosSouls(t,14,QX-200,300-u*80,900,260);
    addGlow(QX,820,520*rise,0.55*rise,'255,40,20'); g.save(); g.fillStyle=`rgba(15,0,0,${0.9*rise})`; g.beginPath(); g.ellipse(QX,850,360*rise,70*rise,0,0,Math.PI*2); g.fill(); g.restore();
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
    const pup=[[PG,IMG.egary,125,0,'evilgary'],[PL,IMG.larryMage,190,2.1,'evillarry']].map(([P,im,h,sd,k])=>{ const j=tug(sd), x=P.x+Math.sin(t*2+sd)*6, y=P.y-14-j*34-Math.abs(Math.sin(t*1.7+sd))*8;
      pentagram(x,PGY,0.7+0.3*j,t,170,42); addGlow(x,PGY,180,0.35+0.4*j,'255,30,30'); bolt(x,y-h*0.4,x+(Math.random()-0.5)*80,PGY,1.6,0.5+0.5*j,'255,40,40');   // tia hắc lực từ con rối xuống vòng gọi hồn
      D.push({y:2000,f:()=>{ shadow(x,PGY,45,0.3); actor(im,x,y,h,{glow:'rgba(255,0,0,0.85)',gb:20+j*20,rot:Math.sin(t*9+sd)*0.05*j+(k==='evilgary'?-0.06:0.04)*j}); }});
      return [x,y-h*0.92]; });
    // 💀 linh hồn mới trồi lên không ngớt — con to con nhỏ, lao về phía các meme, bị chém thì con khác lên thay
    for(let i=0;i<40;i++){ const L=3.4, age=((u+hash(i+500)*L)%L)/L, src=i%2?PG:PL, big=hash(i+510)<0.22, h=big?190+hash(i+511)*110:55+hash(i+512)*55;
      const sx=src.x-120+hash(i+513)*240, sy=PGY-10+hash(i+520)*110, tx=250+hash(i+514)*70, m=seg(age,0.16,0.86), x=lerp(sx,tx,m), y=sy;
      D.push({y,f:()=>{ if(age<0.16){ const e=age/0.16; ring(sx,sy,h*0.45*e+10,0.8*(1-e),'255,40,40',4,0.25);
          g.save(); g.beginPath(); g.rect(-3000,-3000,6000,sy+3000); g.clip(); actor(monVar(i).im,sx,sy+h*(1-eout(e)),h,{filter:`brightness(${0.5+0.5*e})`}); g.restore(); }
        else if(age<0.86){ const b=Math.abs(Math.sin(t*7+i))*4; monster(x,y-b,h,false,1,Math.sin(t*5+i)*0.05,0,i); }
        else halves(x,y,h,false,(age-0.86)/0.14,-0.2+hash(i)*0.4,i); }}); }
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
  let insOn=false;   // frame này có cảnh chèn toàn màn hình → không vẽ sương nền chính đè lên
  function ins(fn){ insOn=true; inIns=true; g.save(); try{ if(WIDE){ const oW=VW, oH=VH, k=oH/960; VW=oW/k; VH=960; g.setTransform(SC_*k,0,0,SC_*k,0,0); try{ fn(); } finally{ VW=oW; VH=oH; } } else { g.setTransform(SC_,0,0,SC_,0,0); fn(); } } finally{ inIns=false; } g.restore(); }
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
  // ═════════ CẢNH TOÀN CẢNH THẬT XA (học từ anime: nhìn ra chân trời / nhìn từ trên cao / trên tầng mây) — vẽ theo khung màn hình, dùng trong ins() ═════════
  // 🌅 1) NHÌN RA CHÂN TRỜI: dãy nhà bóng đen ở tiền cảnh, tia rơi xuống chân trời (air: nổ giữa trời) → vòm sáng bán cầu phình to → sóng bụi cuộn về phía máy, nuốt dãy nhà
  function horizonBlast(q,t,o){ o=o||{}; const HY=VH*0.6, cx=VW*(o.x||0.55), air=!!o.air, cy=air?VH*0.3:HY, fall=seg(q,0,0.22), k=seg(q,0.22,1), e=eout(k);
    const sk=g.createLinearGradient(0,0,0,HY); sk.addColorStop(0,o.sky0||'#1a0408'); sk.addColorStop(1,o.sky1||'#6a1c10'); g.fillStyle=sk; g.fillRect(0,0,VW,HY+2);
    for(let i=0;i<9;i++) puff(((hash(i+1700)*VW*1.4+t*6)%(VW*1.4))-VW*0.2,HY*(0.2+hash(i+1701)*0.6),50+hash(i+1702)*90,0.25,'90,40,40');
    const gr=g.createLinearGradient(0,HY,0,VH); gr.addColorStop(0,'#2a0e0a'); gr.addColorStop(1,'#080303'); g.fillStyle=gr; g.fillRect(0,HY,VW,VH-HY);
    g.fillStyle='#120506'; for(let i=0;i<26;i++){ const x=hash(i+1710)*VW*1.1-20, w=6+hash(i+1711)*14, h=6+hash(i+1712)*26; g.fillRect(x,HY-h,w,h); }   // dãy nhà xa li ti ở chân trời
    if(air&&k<0.15){ const R=VW*0.07, sep=fall*VW*0.02; for(const sd of [-1,1]){ g.save(); g.beginPath(); g.rect(sd<0?0:cx,0,VW/2+Math.abs(cx-VW/2),VH); g.clip(); g.translate(sd*sep,-sd*sep); bijuu(cx,cy,R,t,0.4); g.restore(); } g.save(); g.globalCompositeOperation='lighter'; glow(cx,cy,R*2,0.8,'255,240,220'); g.restore(); }   // quả bom đã bị chẻ đôi lơ lửng giữa trời, ngay trước khi nổ
    if(fall<1&&!air){ const y1=lerp(-20,HY,ein(fall)); g.save(); g.lineCap='round'; g.strokeStyle='rgba(0,0,0,0.95)'; g.lineWidth=3; g.beginPath(); g.moveTo(cx,Math.max(-20,y1-VH*0.35)); g.lineTo(cx,y1); g.stroke(); g.globalCompositeOperation='lighter'; g.strokeStyle='rgba(255,60,40,0.4)'; g.lineWidth=8; g.stroke(); g.restore(); }   // tia rơi xuống chân trời
    if(k>0){ const R=lerp(4,VW*1.1,e);
      g.save(); g.beginPath(); g.rect(0,0,VW,air?VH:HY); g.clip(); g.globalCompositeOperation='lighter';
      const dg=g.createRadialGradient(cx,cy,0,cx,cy,R); dg.addColorStop(0,`rgba(255,255,245,${1-k*0.6})`); dg.addColorStop(0.55,`rgba(255,230,190,${0.85*(1-k*0.7)})`); dg.addColorStop(0.92,`rgba(255,170,110,${0.6*(1-k)})`); dg.addColorStop(1,'rgba(255,150,90,0)');
      g.fillStyle=dg; g.beginPath(); g.ellipse(cx,cy,R,R*(air?0.9:0.75),0,0,Math.PI*2); g.fill();   // vòm sáng
      g.strokeStyle=`rgba(255,250,240,${0.8*(1-k)})`; g.lineWidth=3; g.beginPath(); g.ellipse(cx,cy,R*1.04,R*(air?0.94:0.78),0,0,Math.PI*2); g.stroke(); g.restore();   // viền sóng xung kích
      if(air){ g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle=`rgba(255,240,220,${0.6*(1-k)})`; g.lineWidth=5; g.beginPath(); g.ellipse(cx,cy,R*1.5,R*0.12,0,0,Math.PI*2); g.stroke(); g.restore(); }   // vành xung kích nằm ngang
      const wy=lerp(HY,VH*1.05,eout(seg(q,0.35,1))), wa=seg(q,0.3,0.5);   // 🌫️ sóng bụi cuộn về phía máy
      if(!air) for(let i=0;i<22;i++){ const x=i/21*VW, y=lerp(HY,wy,0.6+0.4*Math.sin(i*1.7)), r=lerp(20,VW*0.22,eout(seg(q,0.3,1))); puff(x,y,r,0.85*wa,'150,110,95'); puff(x,y-r*0.5,r*0.8,0.6*wa,'200,170,150'); } }
    g.fillStyle='#050203'; g.beginPath(); g.moveTo(0,VH); for(let i=0;i<=14;i++){ const x=i/14*VW, h=VH*(0.1+0.14*hash(i+1720)); g.lineTo(x,VH-h); g.lineTo(x+VW/14*0.85,VH-h); } g.lineTo(VW,VH); g.closePath(); g.fill();   // tiền cảnh: dãy nhà bóng đen
    if(k>0&&k<0.08){ g.fillStyle=`rgba(255,250,240,${0.85*(1-k/0.08)})`; g.fillRect(0,0,VW,VH); } }
  // 🛰️ 2) NHÌN THẲNG TỪ TRÊN CAO XUỐNG: mặt đất nứt nẻ, hố giữa, nhiều vòng xung kích + vành mây bụi toả tròn, vạch đất văng
  function topDownRings(q,t,c){ c=c||'255,225,200'; const cx=VW/2, cy=VH*0.5, e=eout(q);
    const gr=g.createRadialGradient(cx,cy,10,cx,cy,VH*0.8); gr.addColorStop(0,'#2a1210'); gr.addColorStop(1,'#0c0505'); g.fillStyle=gr; g.fillRect(0,0,VW,VH);
    g.fillStyle='#030101'; g.beginPath(); g.arc(cx,cy,VW*0.12*eout(Math.min(1,q*3)),0,Math.PI*2); g.fill();   // hố
    for(let r=0;r<4;r++){ const f=seg(q,r*0.12,0.6+r*0.12), R=lerp(VW*0.1,VH*0.9,eout(f)); if(f<=0||f>=1) continue; ring(cx,cy,R,0.9*(1-f),c,6,1);
      for(let i=0;i<28;i++){ const a=i/28*Math.PI*2+r; puff(cx+Math.cos(a)*R,cy+Math.sin(a)*R,R*0.12+10,0.55*(1-f),'170,140,125'); } }   // vành mây bụi
    g.save(); g.globalCompositeOperation='lighter'; glow(cx,cy,VW*0.4*(1-q)+40,0.9*(1-q),'255,240,220'); g.restore(); }
  // ☁️ 3) TRÊN TẦNG MÂY: biển mây, cột sáng từ trời cắm xuống, nhiều vòng hào quang + dải năng lượng xoắn quanh cột, vật thể (fn) giáng xuống dọc cột
  function haloBeam(q,t,c,fn){ c=c||'255,236,180'; const cx=VW/2;
    const sk=g.createLinearGradient(0,0,0,VH); sk.addColorStop(0,'#0a1230'); sk.addColorStop(0.7,'#2a3a6a'); sk.addColorStop(1,'#6a7aa0'); g.fillStyle=sk; g.fillRect(0,0,VW,VH);
    for(let i=0;i<40;i++){ g.fillStyle=`rgba(255,255,255,${0.3+0.5*hash(i+1740)})`; g.fillRect(hash(i+1741)*VW,hash(i+1742)*VH*0.5,1.5,1.5); }
    g.save(); g.globalCompositeOperation='lighter'; for(const [w,a] of [[70,0.15],[26,0.4],[8,0.95]]){ const bg=g.createLinearGradient(0,0,0,VH); bg.addColorStop(0,`rgba(${c},0)`); bg.addColorStop(0.3,`rgba(${c},${a})`); bg.addColorStop(1,`rgba(${c},${a})`); g.fillStyle=bg; g.fillRect(cx-w/2*Math.min(1,q*3),0,w*Math.min(1,q*3),VH*0.82); } g.restore();
    for(let r=0;r<4;r++){ const f=seg(q,0.1+r*0.12,0.5+r*0.12), y=VH*(0.25+r*0.14); if(f<=0) continue; ring(cx,y,lerp(10,VW*(0.3+r*0.07),eout(f)),0.85*(f<1?1:1)*(1-seg(q,0.85,1)),c,5,0.22); }   // vòng hào quang
    g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round'; for(let s=0;s<3;s++){ g.strokeStyle=`rgba(${c},${0.5*seg(q,0.2,0.4)})`; g.lineWidth=3; g.beginPath(); for(let i=0;i<=60;i++){ const f=i/60, a=f*12+t*4+s*2.1, y=VH*(0.1+f*0.72), x=cx+Math.cos(a)*VW*(0.06+0.2*Math.sin(Math.PI*f)); i?g.lineTo(x,y):g.moveTo(x,y); } g.stroke(); } g.restore();   // dải năng lượng xoắn
    if(fn) fn(q);
    for(let i=0;i<16;i++){ const x=((hash(i+1750)*VW*1.4+t*20)%(VW*1.4))-VW*0.2, y=VH*(0.78+hash(i+1751)*0.18), r=VW*(0.15+hash(i+1752)*0.15); puff(x,y,r,0.85,'225,230,245'); puff(x,y-r*0.3,r*0.7,0.6,'255,255,255'); }   // biển mây
    g.save(); g.globalCompositeOperation='lighter'; glow(cx,VH*0.8,VW*0.4,0.7*seg(q,0.2,0.5),c); g.restore(); }
  // ⚔️ NHÁT CHÉM KHỔNG LỒ kiểu anime: 2 lưỡi trăng sáng choang cắt chéo nhau (lõi trắng, viền xanh/đỏ, nhiều sợi sáng song song) + chùm gai sáng nổ toả từ tâm, tâm tối
  function megaSlash(cx,cy,k,t,W,c1,c2){ if(k<=0||k>=1) return; const a=Math.pow(1-k,1.6), e=eout(Math.min(1,k*5)), R=W*0.55;
    g.save(); g.globalCompositeOperation='lighter';
    for(let i=0;i<110;i++){ const an=hash(i+2200)*Math.PI*2, L=R*(0.25+0.7*hash(i+2201))*e, w=R*(0.004+0.012*hash(i+2202)), r0=R*0.14;   // chùm gai sáng nhọn toả ra
      const x0=cx+Math.cos(an)*r0, y0=cy+Math.sin(an)*r0*0.75, x1=cx+Math.cos(an)*(r0+L), y1=cy+Math.sin(an)*(r0+L)*0.75, nx=-Math.sin(an)*w, ny=Math.cos(an)*w;
      g.fillStyle=`rgba(${i%4?c1:'255,255,255'},${a*(0.25+0.45*hash(i+2203))})`; g.beginPath(); g.moveTo(x0+nx,y0+ny); g.lineTo(x1,y1); g.lineTo(x0-nx,y0-ny); g.closePath(); g.fill(); }
    const arc=(rx,ry,rot,a0,a1,c,th)=>{ for(const [lw,al,cc] of [[th*3.2,0.12,c],[th*1.6,0.35,c],[th*0.8,0.85,c],[th*0.35,1,'255,255,255']]){ g.strokeStyle=`rgba(${cc},${al*a})`; g.lineWidth=lw; g.beginPath(); g.ellipse(cx,cy,rx,ry,rot,a0,a0+(a1-a0)*e); g.stroke(); }
      for(let j=0;j<14;j++){ const o=(hash(j+2300)-0.5)*th*2.4; g.strokeStyle=`rgba(${j%3?c:'255,255,255'},${0.35*a})`; g.lineWidth=1+hash(j+2301)*2.5; g.beginPath(); g.ellipse(cx,cy,rx+o,ry+o*0.4,rot,a0+hash(j+2302)*0.2,a0+(a1-a0)*e*(0.7+0.3*hash(j+2303))); g.stroke(); } };   // sợi sáng song song dọc lưỡi
    g.lineCap='round'; arc(R*1.15,R*0.22,-0.12,Math.PI*0.95,Math.PI*2.05,c1,R*0.035); arc(R*0.85,R*0.28,1.05,Math.PI*0.7,Math.PI*1.9,c2,R*0.026);
    g.restore();
    g.save(); const dg=g.createRadialGradient(cx,cy,0,cx,cy,R*0.3); dg.addColorStop(0,`rgba(0,0,0,${0.85*a})`); dg.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=dg; g.beginPath(); g.arc(cx,cy,R*0.3,0,Math.PI*2); g.fill(); g.restore(); }   // tâm tối như hình mẫu
  // 🎥 sau nhát chém: GÓC NHÌN CHÉO TỪ TRÊN CAO XUỐNG — mặt cắt của quả bom và ngọn núi lộ ra (mặt phẳng elip rực sáng), nửa trên trượt lệch khỏi nửa dưới, mặt đất + thành phố xa tít bên dưới
  function topSplit(k,t,boom){ boom=boom||0; const sep=eio(k), cx=VW*0.52, cy=VH*0.52, R=Math.min(VW,VH)*0.3, MR=R*2.1, dx=sep*R*0.9, dy=-sep*R*0.55;
    g.save(); g.translate(VW/2,VH/2); g.rotate(-0.14); g.translate(-VW/2,-VH/2);
    const gr=g.createRadialGradient(cx,cy+VH*0.2,10,cx,cy,VH*1.2); gr.addColorStop(0,'#3a1410'); gr.addColorStop(1,'#0a0304'); g.fillStyle=gr; g.fillRect(-VW,-VH,VW*3,VH*3);
    g.strokeStyle='rgba(255,120,60,0.18)'; g.lineWidth=1; for(let i=-12;i<=12;i++){ g.beginPath(); g.moveTo(cx+i*VW*0.08,VH*1.6); g.lineTo(cx+i*VW*0.02,-VH*0.4); g.stroke(); g.beginPath(); g.moveTo(-VW,cy+i*VH*0.07); g.lineTo(VW*2,cy+i*VH*0.07-VH*0.05); g.stroke(); }   // lưới phố xa tít bên dưới
    for(let i=0;i<40;i++){ const x=hash(i+2400)*VW*1.2-VW*0.1, y=hash(i+2401)*VH; g.fillStyle=`rgba(255,${150+hash(i)*80|0},80,${0.5*hash(i+2402)})`; g.fillRect(x,y,2,2); }   // đốm lửa thành phố
    for(let i=0;i<12;i++) puff(((hash(i+2410)*VW*1.4+t*10)%(VW*1.4))-VW*0.2,hash(i+2411)*VH,80+hash(i+2412)*120,0.25,'110,60,60');   // mây trôi bên dưới
    const ridge=(ox,oy,sc)=>{ g.beginPath(); for(let i=0;i<=24;i++){ const a=i/24*Math.PI*2, r=MR*sc*(0.85+0.18*Math.sin(a*5+1)+0.1*Math.sin(a*11)); i?g.lineTo(ox+Math.cos(a)*r,oy+Math.sin(a)*r*0.55):g.moveTo(ox+Math.cos(a)*r,oy+Math.sin(a)*r*0.55); } g.closePath(); };
    // ⛰️ núi: thân dưới (vết cắt = mặt phẳng loang sáng) · đỉnh trên trượt lệch
    g.fillStyle='#14060a'; ridge(cx-R*0.3,cy+R*0.5,1); g.fill();
    { const cg=g.createRadialGradient(cx-R*0.3,cy+R*0.5,0,cx-R*0.3,cy+R*0.5,MR*0.8); cg.addColorStop(0,'rgba(255,220,180,0.75)'); cg.addColorStop(0.6,'rgba(200,80,40,0.55)'); cg.addColorStop(1,'rgba(90,20,20,0.3)'); g.fillStyle=cg; ridge(cx-R*0.3,cy+R*0.5,0.8); g.fill(); }   // mặt cắt núi rực sáng
    g.save(); g.shadowColor='rgba(0,0,0,0.8)'; g.shadowBlur=40; g.fillStyle='#1c080c'; ridge(cx-R*0.3+dx*1.1,cy+R*0.5+dy*1.1,0.78); g.fill(); g.restore();   // phần đỉnh núi bị xẻ trượt lệch
    g.strokeStyle='rgba(255,120,60,0.5)'; g.lineWidth=3; ridge(cx-R*0.3+dx*1.1,cy+R*0.5+dy*1.1,0.78); g.stroke();
    // 🟣 quả bom: nửa dưới + mặt cắt elip rực sáng · nửa trên (chỏm cầu) trượt lệch — bị vụ nổ nuốt mất
    const ba=1-seg(boom,0.04,0.3); g.save(); g.globalAlpha=ba;
    g.save(); g.beginPath(); g.rect(cx-R*1.2,cy,R*2.4,R*1.3); g.ellipse(cx,cy,R,R*0.42,0,0,Math.PI*2); g.clip(); bijuu(cx,cy,R,t,0.2); g.restore();
    { const fg=g.createRadialGradient(cx,cy,0,cx,cy,R); fg.addColorStop(0,'rgba(255,250,240,1)'); fg.addColorStop(0.35,'rgba(210,170,255,0.95)'); fg.addColorStop(0.8,'rgba(90,50,180,0.9)'); fg.addColorStop(1,'rgba(255,200,160,1)');
      g.save(); g.fillStyle=fg; g.beginPath(); g.ellipse(cx,cy,R,R*0.42,0,0,Math.PI*2); g.fill(); g.globalCompositeOperation='lighter'; g.strokeStyle='rgba(255,240,220,0.9)'; g.lineWidth=4; g.stroke(); glow(cx,cy,R*1.1,0.5*(1-sep*0.4),'200,160,255'); g.restore(); }   // mặt cắt phát sáng (lõi năng lượng lộ ra)
    g.save(); g.beginPath(); g.rect(cx+dx-R*1.2,cy+dy-R*1.3,R*2.4,R*1.3); g.clip(); g.translate(cx+dx,cy+dy); g.rotate(sep*0.18); g.translate(-cx-dx,-cy-dy); g.shadowColor='rgba(0,0,0,0.7)'; g.shadowBlur=50; bijuu(cx+dx,cy+dy,R,t,0.2); g.restore();   // chỏm trên trượt lệch
    g.restore();
    if(Math.random()<0.8) parts.push({k:'spark',x:cx+(Math.random()-0.5)*R*2,y:cy+(Math.random()-0.5)*R*0.8,vx:(Math.random()-0.5)*4,vy:-2-Math.random()*3,l:40,L:40,c:Math.random()<0.5?'200,160,255':'255,200,150'});
    // 2 kiếm sĩ tí hon lơ lửng ở rìa khung (nhìn từ trên xuống)
    actor(IMG.smSlash,cx-R*0.08,cy+R*1.12,VH*0.06,{flip:true}); actor(IMG.berserkAtk,cx+R*0.08,cy+R*1.12,VH*0.057,{flip:flipTo('berserkcat',false)});
    // 💥 2 nửa quả bom NỔ TUNG (vẫn ở góc nhìn từ trên cao): lõi loá trắng → cầu lửa tím-cam nuốt cả 2 nửa + đỉnh núi → khói cuộn toả + sóng xung kích tròn trên mặt đất
    if(boom>0){ g.save(); g.translate(cx+dx*0.5,cy+dy*0.5); g.scale(0.9,0.9); skyBlast(0,0,boom); g.restore();
      if(boom<0.5&&Math.random()<0.9) for(let q=0;q<4;q++){ const a=Math.random()*Math.PI*2; parts.push({k:'rock',x:cx+Math.cos(a)*R*0.5,y:cy+Math.sin(a)*R*0.3,vx:Math.cos(a)*14,vy:Math.sin(a)*8-3,l:45,L:45,c:Math.random()<0.5?'60,30,70':'90,40,30',r:4+Math.random()*9}); }   // mảnh vỡ văng tung
      ring(cx,cy+R*0.6,lerp(R*0.5,VW*1.2,eout(boom)),0.8*(1-boom),'255,220,190',8,0.45);
      if(boom<0.12){ g.fillStyle=`rgba(255,250,240,${0.85*(1-boom/0.12)})`; g.fillRect(-VW,-VH,VW*3,VH*3); } }
    g.restore(); }
  // ⛰️ NÚI ĐẸP HƠN: sống núi lởm chởm (chia đôi + xê dịch ngẫu nhiên) · sườn trái hứng sáng, sườn phải tối · các rãnh đá chạy từ đỉnh xuống · viền sáng mảnh
  const _pk={};
  function peakPath(cx,baseY,w,h,seed){ const key=seed; if(!_pk[key]){ let P=[[-0.5,0],[-0.18,-0.62],[0,-1],[0.16,-0.7],[0.5,0]];
      for(let lv=0;lv<5;lv++){ const Q=[]; for(let i=0;i<P.length-1;i++){ const a=P[i], b=P[i+1], L=Math.hypot(b[0]-a[0],b[1]-a[1]); Q.push(a,[(a[0]+b[0])/2+(hash(seed+i*7+lv*131)-0.5)*L*0.12,(a[1]+b[1])/2+(hash(seed+i*11+lv*97)-0.5)*L*0.28]); } Q.push(P[P.length-1]); P=Q; }
      _pk[key]=P; } return _pk[key].map(p=>[cx+p[0]*w,baseY+p[1]*h]); }
  function peak(cx,baseY,w,h,seed,col,a){ a=a==null?1:a; const P=peakPath(cx,baseY,w,h,seed), top=P.reduce((m,p)=>p[1]<m[1]?p:m,P[0]);
    g.save(); g.globalAlpha*=a; g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.closePath();
    const gr=g.createLinearGradient(cx-w*0.5,0,cx+w*0.5,0); gr.addColorStop(0,col[0]); gr.addColorStop(0.48,col[1]); gr.addColorStop(0.52,col[2]); gr.addColorStop(1,col[3]); g.fillStyle=gr; g.fill(); g.save(); g.clip();
    const vg=g.createLinearGradient(0,baseY-h,0,baseY); vg.addColorStop(0,'rgba(255,255,255,0.06)'); vg.addColorStop(1,'rgba(0,0,0,0.45)'); g.fillStyle=vg; g.fillRect(cx-w,baseY-h*1.1,w*2,h*1.2);
    g.lineCap='round'; for(let i=0;i<14;i++){ let x=top[0]+(hash(seed+i*3)-0.5)*w*0.25, y=top[1]+h*0.05*hash(seed+i); const side=hash(seed+i*5)<0.5?-1:1;   // rãnh đá
      g.strokeStyle=side<0?'rgba(255,220,190,0.12)':'rgba(0,0,0,0.28)'; g.lineWidth=1+hash(seed+i*9)*2.5; g.beginPath(); g.moveTo(x,y);
      for(let j=0;j<8;j++){ x+=side*w*0.035*(0.5+hash(seed+i*13+j))+(hash(seed+i*17+j)-0.5)*w*0.02; y+=h*0.11; g.lineTo(x,y); } g.stroke(); }
    g.restore(); g.strokeStyle='rgba(255,200,160,0.35)'; g.lineWidth=1.5; g.beginPath(); P.slice(0,Math.ceil(P.length/2)).forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); g.restore(); }
  // 🏞️ CẢNH TOÀN CẢNH NHÌN TỪ TRÊN CAO (như Naruto): trời hoàng hôn đỏ + mây, dãy núi nhiều lớp mờ dần theo chiều sâu, đồng bằng rừng cháy sém,
  //    quả bom vĩ thú khổng lồ đứng giữa · LƯỠI CHÉM TRĂNG KHUYẾT vút ngang siêu nhanh · lặng ~2s · mọi thứ phía trên đường chém (đỉnh núi + chỏm bom) BAY LÊN · quả bom NỔ
  function landscape(u0,t,o){ const sl=seg(u0,o.s0,o.s1), fly=eio(seg(u0,o.f0,o.f1)), boom=seg(u0,o.b0,o.b1), CY=VH*0.45, HY=VH*0.6, bx=VW*0.52, R=VH*0.26, by=VH*0.66-R*0.75;
    const sky=g.createLinearGradient(0,0,0,HY); sky.addColorStop(0,'#1d0a14'); sky.addColorStop(0.6,'#5a1e1c'); sky.addColorStop(1,'#a2482a'); g.fillStyle=sky; g.fillRect(0,0,VW,VH);
    for(let i=0;i<9;i++){ const y=VH*(0.08+hash(i+2500)*0.3), x=((hash(i+2501)*VW*1.5+t*12)%(VW*1.5))-VW*0.25, w=VW*(0.2+hash(i+2502)*0.25); g.fillStyle=`rgba(${i%2?'90,40,50':'140,70,60'},0.35)`; g.beginPath(); g.ellipse(x,y,w,VH*0.012+hash(i)*VH*0.01,0,0,Math.PI*2); g.fill(); }   // mây dải mỏng
    const upper=(fn)=>{ g.save(); g.beginPath(); g.rect(-VW,-VH*2,VW*3,CY+VH*2); g.clip(); if(fly>0){ g.translate(-VW*0.025*eout(fly),-VH*0.008*eout(fly)); } fn(); g.restore(); },   // nửa trên chỉ trượt lệch nhẹ theo vết cắt (không chao đảo)
          lower=(fn)=>{ g.save(); g.beginPath(); g.rect(-VW,CY,VW*3,VH*3); g.clip(); fn(); g.restore(); };
    const ranges=()=>{ const L=[[0.35,0.62,'#4a2a34','#5e3640','#3a1e28','#2a141c',11,0.55],[0.22,0.7,'#3a1c24','#4e2830','#2a121a','#1c0a10',23,0.8],[0.0,0.78,'#2a1218','#3a1a20','#1c0a10','#12060a',37,1]];
      for(const [d,base,c0,c1,c2,c3,sd,al] of L) for(let i=0;i<5;i++){ const w=VW*(0.28+hash(sd+i)*0.2), h=VH*(0.22+hash(sd+i*3)*0.16)*(1-d*0.6), cx=VW*(-0.05+i*0.27+hash(sd+i*7)*0.08); peak(cx,VH*base,w,h,sd*10+i,[c0,c1,c2,c3],al); }
      g.save(); const hz=g.createLinearGradient(0,VH*0.45,0,VH*0.66); hz.addColorStop(0,'rgba(180,90,70,0)'); hz.addColorStop(1,'rgba(180,90,70,0.35)'); g.fillStyle=hz; g.fillRect(0,VH*0.45,VW,VH*0.21); g.restore(); };   // sương mù chân núi
    const plain=()=>{ const gr=g.createLinearGradient(0,HY,0,VH); gr.addColorStop(0,'#5a4428'); gr.addColorStop(1,'#1e160c'); g.fillStyle=gr; g.fillRect(0,VH*0.62,VW,VH);
      if(!landscape.F){ const c=document.createElement('canvas'); c.width=1200; c.height=500; const x=c.getContext('2d');   // 🌲 tán rừng cháy sém: vẽ 1 lần ra tấm riêng rồi dùng lại (hàng nghìn tán cây nhỏ chồng lớp, xa nhỏ gần to)
        for(let i=0;i<4200;i++){ const fy=Math.pow(hash(i+2600),0.9), y=fy*500, xx=hash(i+2601)*1200, r=(1.5+hash(i+2602)*3)*(0.5+fy*3.2), tone=hash(i+2603);
          x.fillStyle=tone<0.45?`rgb(${46+tone*40|0},${58+tone*30|0},${28})`:tone<0.8?`rgb(${70+tone*30|0},${60},${32})`:'rgb(110,92,58)'; x.beginPath(); x.ellipse(xx,y,r*1.3,r,0,0,Math.PI*2); x.fill();
          x.fillStyle='rgba(0,0,0,0.25)'; x.beginPath(); x.ellipse(xx+r*0.3,y+r*0.4,r*1.1,r*0.6,0,0,Math.PI*2); x.fill(); }
        landscape.F=c; }
      g.drawImage(landscape.F,0,VH*0.63,VW,VH*0.37); };   // rừng cháy sém
    const bomb=()=>{ g.save(); g.globalCompositeOperation='lighter'; glow(bx,by+R*0.9,R*1.8,0.4,'150,90,255'); g.restore(); bijuu(bx,by,R,t,0.3); };
    const shadowB=()=>{ g.save(); g.globalAlpha=0.5; g.fillStyle='#000'; g.beginPath(); g.ellipse(bx+R*0.2,by+R*0.98,R*1.1,R*0.18,0,0,Math.PI*2); g.fill(); g.restore(); };
    const ba=1-seg(boom,0.04,0.3);
    lower(()=>{ ranges(); plain(); shadowB(); g.save(); g.globalAlpha=ba; bomb(); g.restore(); });
    upper(()=>{ ranges(); g.save(); g.globalAlpha=ba; bomb(); g.restore(); });
    if(fly>0){ g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle=`rgba(255,235,210,${0.8*(1-boom)})`; g.lineWidth=3; g.shadowColor='#ffd9b0'; g.shadowBlur=20; g.beginPath(); g.moveTo(0,CY); g.lineTo(VW,CY); g.stroke(); g.restore();   // mặt cắt sáng rực
      for(let i=0;i<3;i++) if(Math.random()<0.9) parts.push({k:'rock',x:Math.random()*VW,y:CY,vx:(Math.random()-0.5)*3,vy:-3-Math.random()*5,l:50,L:50,c:'70,40,40',r:2+Math.random()*6});
      }   // bụi đá tung dọc vết cắt
    // ⚔️ LƯỠI CHÉM TRĂNG KHUYẾT vút ngang qua toàn cảnh (siêu nhanh), để lại vệt mảnh tắt dần
    if(sl>0&&sl<1){ const x=lerp(-VW*0.4,VW*1.4,eio(sl)), w=VW*0.42, hh=VH*0.06; g.save(); g.globalCompositeOperation='lighter';
      for(const [k2,al,c] of [[1.25,0.25,'140,225,255'],[1,0.9,'255,230,240'],[0.6,1,'255,255,255']]){ g.fillStyle=`rgba(${c},${al})`; g.beginPath(); g.moveTo(x-w*k2,CY); g.quadraticCurveTo(x-w*0.2,CY-hh*2.2*k2,x+w*0.25,CY-hh*0.2); g.quadraticCurveTo(x-w*0.15,CY-hh*0.9*k2,x-w*k2,CY); g.fill(); }
      g.strokeStyle='rgba(255,255,255,0.9)'; g.lineWidth=2; g.beginPath(); g.moveTo(Math.max(0,x-w*2.4),CY); g.lineTo(x-w,CY); g.stroke(); g.restore(); }
    if(sl>=1&&fly<=0){ g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle=`rgba(255,250,240,${0.5*(1-seg(u0,o.s1,o.f0))+0.15})`; g.lineWidth=1.5; g.beginPath(); g.moveTo(0,CY); g.lineTo(VW,CY); g.stroke(); g.restore(); }   // vết chém mảnh còn đọng lại — lặng như chưa có gì xảy ra
    if(boom>0){ g.save(); g.translate(bx,by); g.scale(0.85,0.85); skyBlast(0,0,boom); g.restore(); ring(bx,by+R*0.9,lerp(R,VW*1.3,eout(boom)),0.75*(1-boom),'255,220,190',7,0.22);
      if(boom<0.1){ g.fillStyle=`rgba(255,250,240,${0.8*(1-boom/0.1)})`; g.fillRect(0,0,VW,VH); } } }
  // 🎨 NỀN RIÊNG TỪNG PHẦN (vẽ đè lên nền chung, toạ độ thế giới — mặt đất ở y≈560)
  function skyTint(c0,c1,a){ if(a<=0.01) return; const gr=g.createLinearGradient(0,-1500,0,560); gr.addColorStop(0,`rgba(${c0},${a})`); gr.addColorStop(1,`rgba(${c1},${a*0.4})`); g.fillStyle=gr; g.fillRect(-3000,-1500,7000,2060); }
  function groundFog(t,c,a){ for(let L=0;L<3;L++) for(let i=0;i<14;i++){ const x=((hash(i+3700+L*20)*3600+t*(14+L*10))%3600)-1700, y=575+L*55+Math.sin(t*0.4+i)*10; g.save(); g.globalAlpha=a*(0.35-L*0.08); g.fillStyle=`rgb(${c})`; g.beginPath(); g.ellipse(x,y,260+hash(i+3710)*220,26+L*10,0,0,Math.PI*2); g.fill(); g.restore(); } }
  function embers(t,n,c){ g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<n;i++){ const f=((t*0.12+hash(i+3720))%1), x=-1400+hash(i+3721)*3000+Math.sin(t*0.8+i)*40, y=620-f*1500; g.fillStyle=`rgba(${c},${0.8*Math.sin(Math.PI*f)})`; g.fillRect(x,y,3,3); } g.restore(); }
  function partBG(si,u,t,ruin){
    // 🌫️ không khí chung cho mọi cảnh dưới đất: sương bay sát mặt đất + tàn lửa bay lên (cảnh kết thì không có tàn lửa)
    if(ruin){ groundFog(t,'175,160,140',0.5); }
    else if(si<=SI.P+1||si===SI.Z||si===SI.M||si===SI.N){ groundFog(t,si===SI.N?'200,170,150':'40,16,20',si===SI.N?0.5:0.9); if(si!==SI.N) embers(t,60,'255,150,70'); }
    if(si===1){   // 🟣 Stalin/Catler vs Evil Gary/Larry (kiểu JJK): trời nhuốm chú lực tím đỏ + trăng máu
      skyTint('70,10,80','100,10,40',0.75); const MX=1180, MY=262; g.save(); g.globalCompositeOperation='lighter'; glow(MX,MY,380,0.55,'255,40,40'); g.restore();
      const mg=g.createRadialGradient(MX-15,MY-15,0,MX,MY,64); mg.addColorStop(0,'rgba(255,120,100,0.97)'); mg.addColorStop(0.7,'rgba(210,30,40,0.95)'); mg.addColorStop(1,'rgba(120,5,20,0.9)'); g.fillStyle=mg; g.beginPath(); g.arc(MX,MY,64,0,Math.PI*2); g.fill();
      for(let i=0;i<5;i++) puff(MX-250+((hash(i+3740)*500+t*12)%500),MY+(hash(i+3741)-0.5)*80,40+hash(i+3742)*40,0.35,'30,6,20'); }   // mây mỏng trôi ngang trăng
    if(si===2){ skyTint('20,10,40','60,20,50',0.4); if(Math.sin(t*3.3)>0.97){ g.fillStyle='rgba(200,170,255,0.12)'; g.fillRect(-3000,-1500,7000,2100); } }   // Spider/UIA: trời giông tím, chớp nháy
    if(si===4){ skyTint('5,5,15','20,10,20',0.5); g.save(); g.globalCompositeOperation='lighter'; for(let L=0;L<6;L++){ const w=L*55, lg=g.createLinearGradient(0,-1200,0,900); lg.addColorStop(0,'rgba(255,240,200,0)'); lg.addColorStop(1,`rgba(255,230,170,${0.045-L*0.005})`); g.fillStyle=lg; g.beginPath(); g.moveTo(230-w*0.4,-1200); g.lineTo(270+w*0.4,-1200); g.lineTo(330+w*1.2,900); g.lineTo(170-w*1.2,900); g.closePath(); g.fill(); }
      for(let i=0;i<24;i++){ const f=((t*0.05+hash(i+3750))%1); g.fillStyle=`rgba(255,240,200,${0.5*Math.sin(Math.PI*f)})`; g.fillRect(250+(hash(i+3751)-0.5)*(120+f*300),-600+f*1450,2,2); } g.restore(); }   // King Cheems bị vây: đêm tối + 1 vệt sáng trời rọi xuống (mép mềm, bụi lơ lửng trong vệt)
    if(si===SI.Z&&!ruin){ const k=seg(u,0.8,3.5); skyTint('6,10,40','30,20,60',0.7*k); g.save(); for(let i=0;i<80;i++){ g.fillStyle=`rgba(255,255,255,${k*(0.4+0.6*hash(i+3730))*(0.7+0.3*Math.sin(t*3+i))})`; g.fillRect(-1400+hash(i+3731)*3000,-1400+hash(i+3732)*1700,2,2); } g.restore(); }   // tụ cầu năng lượng: trời chuyển đêm sao như lúc Goku gom Genki Dama
    if(si===SI.M){ skyTint('10,0,20','20,0,30',0.45); }
    if(si===0){   // ⚔️ mở màn: chiến trường — cột khói đen bốc từ các đám cháy, cờ rách phấp phới, ánh lửa chân trời
      for(let i=0;i<7;i++){ const x=-1100+i*420+hash(i+3000)*160, by=540+hash(i+3001)*30; g.save(); g.globalCompositeOperation='lighter'; glow(x,by,90,0.5,'255,120,40'); g.restore();
        for(let j=0;j<10;j++){ const f=((t*0.08+j/10+hash(i)*0.3)%1); puff(x+Math.sin(f*6+i)*40+f*120,by-f*900,40+f*160,0.45*(1-f),'20,10,12'); } }
      for(let i=0;i<9;i++){ const x=-900+i*330+hash(i+3010)*90, y=560-hash(i+3011)*20, H=150+hash(i+3012)*90, wv=Math.sin(t*4+i)*0.15;
        g.strokeStyle='#1a0c08'; g.lineWidth=4; g.beginPath(); g.moveTo(x,y); g.lineTo(x+(hash(i+3013)-0.5)*20,y-H); g.stroke();
        g.fillStyle=i%2?'rgba(120,20,20,0.85)':'rgba(40,40,60,0.85)'; g.beginPath(); g.moveTo(x,y-H); for(let k=0;k<=6;k++){ const fx=k/6*70; g.lineTo(x+fx,y-H+12*Math.sin(fx*0.08+t*5+i)+fx*wv); } for(let k=6;k>=0;k--){ const fx=k/6*70; g.lineTo(x+fx-(k%2?6:0),y-H+40+12*Math.sin(fx*0.08+t*5+i)+fx*wv); } g.closePath(); g.fill(); } }   // cờ rách
    if(si===SI.P||si===SI.P+1){   // 🌑 quỷ giật dây / Giga quyết định: tàn tích về đêm — trời tối sầm, mây đỏ XOÁY quanh con quỷ
      g.save(); g.fillStyle='rgba(0,0,10,0.35)'; g.fillRect(-3000,-3000,7000,3560); g.restore();
      const cx=si===SI.P?PD.x:1350, cy=si===SI.P?-200:-150;
      for(let r=0;r<4;r++) for(let i=0;i<18;i++){ const a=i/18*Math.PI*2+t*(0.15+r*0.05)*(r%2?-1:1), R=500+r*320; puff(cx+Math.cos(a)*R,cy+Math.sin(a)*R*0.35,140+r*40,0.22,r%2?'90,10,20':'40,4,12'); }
      g.save(); g.globalCompositeOperation='lighter'; glow(cx,cy,700,0.25,'255,30,30'); g.restore(); }
    if(si===SI.N){   // 🌅 kết: bình minh — đĩa mặt trời mọc ở chân trời, trời ấm dần, khói tàn mỏng
      const k=seg(u,0.4,3.5); g.save(); g.globalCompositeOperation='lighter'; glow(-150,520,900,0.45*k,'255,200,120'); g.restore();
      g.save(); g.globalAlpha=k; const sg=g.createRadialGradient(-150,520,0,-150,520,120); sg.addColorStop(0,'#fff8e0'); sg.addColorStop(1,'rgba(255,210,140,0)'); g.fillStyle=sg; g.beginPath(); g.arc(-150,520,120,0,Math.PI*2); g.fill(); g.restore();
      for(let i=0;i<6;i++){ const f=((t*0.05+i/6)%1); puff(200+i*250,540-f*500,60+f*120,0.18*(1-f),'90,80,80'); } }
  }
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
      pane(-VW*(1-sl),70,VW,VH/2-80,()=>{ g.fillStyle='#120204'; g.fillRect(0,70,VW,VH/2-80); const w=VW*z*0.7, h=w*124/140; crop(F.c,235,95,140,124,VW/2-w/2,70+(VH/2-80)/2-h/2,w,h,{filter:'brightness(1.9)'}); g.save(); g.globalCompositeOperation='lighter'; for(const ex of [-1,1]) glow(VW/2+ex*62*z,70+(VH/2-80)/2,38,0.9,'255,40,30'); g.restore(); });
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
    if(hit){ g.save(); g.fillStyle='rgba(10,4,4,0.55)'; g.beginPath(); g.ellipse(gx,GY+6,700*eout(pk),90*eout(pk),0,0,Math.PI*2); g.fill(); g.restore(); }   // mặt đất lún
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
    if(false) ins(()=>{ bgFocus(t,'#5a1a12','#0a0203',true,VW/2,VH*0.2); bijuu(VW/2,-120,420,t,0.3); actor(IMG.gigaLift,VW/2+Math.sin(t*50)*4,VH+180,1050,{});
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
    const A=[[650,GY,IMG.joninn,IMG.joninnR,'samuraicheems','110,200,255',-1],[770,GY,IMG.berserk,IMG.berserkAtk,'berserkcat','255,60,60',1],[710,GY,IMG.bibi,IMG.bibi,'bibilabu','255,200,90',0]];
    A.forEach(([sx,sy,im,im2,k,c,o],j)=>{ const off=o*70, lx=-650+j*130;
      if(sketch){   // góc ngước chéo: 2 kiếm sĩ lơ lửng góc dưới-trái → vung kiếm → phóng KIẾM KHÍ khổng lồ bay xuyên quả bom, xén đỉnh núi phía sau
        const o2=[-60,60,0][j], P=QA(-1010+j*230), x=P.x+QN.x*o2, y=P.y+QN.y*o2+60, h=170, sw=seg(u,1.84,1.95), ang=Math.atan2(QD.y,QD.x);
        if(j===0) actor(IMG.smSlash,x,y+h*0.45,h*1.35,{flip:false,rot:ang*0.3,center:true});   // ⚔️ Joninn: tư thế chém trên không (ảnh mới)
        else actor(sw>0?im2:im,x,y+h*0.45,h,{flip:flipTo(k,true),rot:ang*0.35+(sw>0?0.35*(1-sw):-0.25),center:true});
        if(sw>0) bladeSlash(x-h*0.35,y+h*0.25,x+h*0.45,y-h*0.55,0,Math.min(1,sw*1.2),j===1?-90:90,c,1-seg(u,1.95,2.2),j*50+11);   // nhát vung tại chỗ
        if(qf>0&&qf<1){ const d=lerp(-1010+j*230,QE,qf)-(j===1?40:j===2?80:0), Q=QA(d); qiWave(Q.x+QN.x*o2,Q.y+QN.y*o2,ang,560,c,1-seg(qf,0.85,1),j*31+7); }
        return; }
      const h=lerp(110,150,lp>0?1:0); let x,y,rot=0, img=u>0.5?im2:im, faceR=false;
      if(u<0.9){ x=sx; y=sy; }
      else if(u<1.75){ const q=eout(lp), P=QA(-1010+j*230), cx=sx-150, cy=-900; x=(1-q)*(1-q)*sx+2*(1-q)*q*cx+q*q*P.x; y=(1-q)*(1-q)*sy+2*(1-q)*q*cy+q*q*P.y; rot=-0.5*Math.sin(Math.PI*lp); }
      else { x=lx; y=GY; faceR=turn>0.5; if(u<3.4) return; }   // (đang bay ngoài khung → đáp đất quay lưng về phía vụ nổ)
      if(u>=4.3&&u<4.36&&j===0){ dust(lx+60,GY,14,180); }
      const sq=u>=4.75&&u<4.9?Math.max(0.08,Math.abs(Math.cos(Math.PI*turn))):1;
      if(u>=3.4) shadow(x,GY,h*0.35,0.4);
      if(u>=3.4&&u<4.75) actor([IMG.smBack,IMG.bkBack,IMG.bibiBack][j],x,y,j===2?h*0.95:h*1.2,{});   // đáp đất QUAY LƯNG lại vụ nổ
      else actor(img,x,y,h,{flip:flipTo(k,faceR),rot,sx:sq}); });
    // 🎬 nhịp 1: 2 kiếm sĩ đứng QUAY LƯNG về phía máy, ĐỐI MẶT quả bom khổng lồ (Giga gồng đỡ phía trên) — trước khi bật nhảy chém từ dưới lên
    if(u<0.9) ins(()=>{ const k=seg(u,0,0.9), z=1+0.06*k;
      const gr=g.createLinearGradient(0,0,0,VH); gr.addColorStop(0,'#14030a'); gr.addColorStop(0.65,'#4a1210'); gr.addColorStop(1,'#140605'); g.fillStyle=gr; g.fillRect(0,0,VW,VH);
      g.save(); g.translate(VW/2,VH*0.55); g.scale(z,z); g.translate(-VW/2,-VH*0.55);
      bijuu(VW/2,-150,330,t,0.3); actor(IMG.gigaLift,VW/2,VH*0.95,830,{filter:'brightness(0.55)'});   // to + hạ thấp: dải đất che phần quần bị cắt → đứng chạm đất, 2 tay chạm đáy quả bom
      g.fillStyle='#0b0506'; g.fillRect(-50,VH*0.84,VW+100,VH);
      actor(IMG.smBack,VW*0.3,VH*0.9,330,{}); actor(IMG.bibiBack,VW*0.5,VH*0.91,230,{}); actor(IMG.bkBack,VW*0.7,VH*0.9,340,{});
      g.save(); g.globalCompositeOperation='lighter'; glow(VW*0.3,VH*0.72,170,0.35,'110,200,255'); glow(VW*0.5,VH*0.76,150,0.35,'255,200,90'); glow(VW*0.7,VH*0.72,170,0.35,'255,60,60'); g.restore(); g.restore(); });
    // 🎬 nhịp 2 (kiểu Mihawk chém đôi tảng băng): 2 kiếm sĩ bật nhảy lên NGANG TẦM quả bom vĩ thú, ngọn núi khổng lồ sừng sững sau lưng quả bom
    //    → khí xanh + đỏ xoắn vào nhau (hợp chiêu) → khựng lại → 1 VỆT KIẾM NGANG vụt qua cả khung rồi tắt ngấm → lặng 1 nhịp
    //    → nửa trên quả bom + nửa trên ngọn núi + mây TRƯỢT LỆCH ra theo đường chém ngang (như tảng băng bị Mihawk chém)
    if(u>=2.12&&u<4.6) ins(()=>landscape(u,t,{s0:2.14,s1:2.3,f0:3.25,f1:3.6,b0:3.6,b1:4.6}));   // 🏞️ toàn cảnh từ trên cao: lưỡi chém vút ngang → lặng → nửa trên bay lên → bom nổ
    else if(u>=0.9&&u<2.12) ins(()=>{ const lp=eout(seg(u,0.9,1.5)), cm=seg(u,1.5,2.0), fl=seg(u,2.0,2.08), cut=u>=2.0, sep=eio(seg(u,2.5,3.4)), CY=VH*0.5, bx=VW*0.5, by=CY, R=Math.min(VW*0.3,VH*0.4);   // quả bom TO ngang ngọn núi, ngay giữa khung (theo phác thảo)
      const still=u>=2.08&&u<2.5, tt=still?2.08:u;
      const scene=()=>{ const gr=g.createLinearGradient(0,0,0,VH); gr.addColorStop(0,'#3a0c10'); gr.addColorStop(0.5,'#8a2a14'); gr.addColorStop(1,'#2a0806'); g.fillStyle=gr; g.fillRect(-VW,-VH,VW*3,VH*3);
        peak(VW*0.5,VH*1.05,VW*1.15,VH*1.05,4242,['#5a2c30','#6e3a3a','#3a1820','#200c12']); peak(VW*0.12,VH*1.05,VW*0.5,VH*0.55,4343,['#3a1a22','#4a2228','#28101a','#160a0e'],0.9); peak(VW*0.9,VH*1.05,VW*0.5,VH*0.6,4444,['#3a1a22','#4a2228','#28101a','#160a0e'],0.9);   // ngọn núi lớn sau lưng quả bom (đỉnh ở giữa) + 2 núi phụ
        for(let i=0;i<10;i++) puff(((hash(i+620)*VW*1.4+tt*16)%(VW*1.4))-VW*0.2,VH*(0.1+hash(i+621)*0.7),50+hash(i+622)*70,0.28,'120,60,70');
        bijuu(bx,by,R,tt,0.25); };
      if(sep<=0) scene();
      else { g.save(); g.beginPath(); g.rect(-VW,CY,VW*3,VH*3); g.clip(); scene(); g.restore();   // nửa dưới đứng yên
        g.save(); g.beginPath(); g.rect(-VW,-VH*2,VW*3,CY+VH*2); g.clip(); g.translate(sep*VW*0.3,-sep*VH*0.05); g.translate(VW*0.5,CY); g.rotate(-sep*0.06); g.translate(-VW*0.5,-CY); scene(); g.restore();   // nửa trên trượt lệch ra
        g.save(); g.globalCompositeOperation='lighter'; g.shadowColor='rgba(255,230,200,1)'; g.shadowBlur=24; g.strokeStyle=`rgba(255,250,240,${0.9*(1-seg(u,3.0,3.4)*0.4)})`; g.lineWidth=2+sep*4; g.beginPath(); g.moveTo(-10,CY); g.lineTo(VW+10,CY); g.stroke(); g.restore();   // vết cắt nóng sáng
        if(Math.random()<0.8) parts.push({k:'rock',x:Math.random()*VW,y:CY+4,vx:(Math.random()-0.5)*2,vy:2,l:40,L:40,c:'70,30,30',r:2+Math.random()*5}); }
      if(!still&&!cut){ g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<20;i++){ const x=((hash(i+500)*VW*1.3+t*700)%(VW*1.3))-VW*0.15, y=VH*(0.15+hash(i+501)*0.7), L=60+hash(i+502)*160; g.strokeStyle='rgba(255,230,215,0.08)'; g.lineWidth=1.5; g.beginPath(); g.moveTo(x,y); g.lineTo(x-L,y); g.stroke(); } g.restore(); }
      // 2 kiếm sĩ bật nhảy từ dưới lên đúng ngang tầm quả bom (bên trái khung), mặt hướng về quả bom
      const A0={x:VW*0.44,y:CY+VH*0.06}, B0={x:VW*0.56,y:CY+VH*0.06}, C0={x:VW*0.5,y:CY+VH*0.07}, atk=true;   // A B đứng cạnh nhau NGAY GIỮA khung, trước mặt quả bom — đứng yên tại chỗ chém
      if(cm>0&&atk){ g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round'; for(const [c,ph] of [['110,200,255',0],['255,60,60',Math.PI*2/3],['255,200,90',Math.PI*4/3]]){ g.strokeStyle=`rgba(${c},${0.7*cm})`; g.lineWidth=4; g.beginPath();
          for(let i=0;i<=60;i++){ const f=i/60, r=lerp(VH*0.14,6,f)*cm, a=f*12+t*9+ph, px=VW*0.5+Math.cos(a)*r, py=lerp(CY+VH*0.08,CY,f)+Math.sin(a)*r*0.6; i?g.lineTo(px,py):g.moveTo(px,py); } g.stroke(); }
        glow(VW*0.5,CY,30+70*cm,0.9*cm,'255,240,255'); g.restore(); }
      [[A0,IMG.smSlash,'110,200,255',VH*0.1,0],[B0,IMG.berserkAtk,'255,60,60',VH*0.095,1],[C0,IMG.bibiBack,'255,200,90',VH*0.075,2]].forEach(([P,im,c,h,j])=>{ let x=P.x-(1-lp)*20, y=lerp(VH+h,P.y,lp)-Math.sin(t*5+j)*3*(lp>=1&&atk?1:0);
                if(lp<1) for(let k=1;k<5;k++) actor(im,x,y+k*35*(1-lp),h,{a:0.25-k*0.05,flip:j===2?false:j?flipTo('berserkcat',false):true});
        if(cm>0&&atk){ g.save(); g.globalCompositeOperation='lighter'; glow(x,y-h*0.5,h*(1+cm),0.5,c); g.restore(); }
        actor(im,x,y,h,{flip:j===2?false:j?flipTo('berserkcat',false):true,rot:cut?(j===2?0:j?0.2:-0.2):0}); });   // A quay trái, B quay phải: vung kiếm chém ngang ra 2 bên
      // ⚡ 1 VỆT KIẾM NGANG vụt qua cả khung (~0.08s) rồi tắt ngấm
      if(fl>0&&fl<1){ g.fillStyle='rgba(255,252,245,0.85)'; g.fillRect(0,0,VW,VH); g.fillStyle='#000'; g.fillRect(0,CY-4,VW,8); }
      if(u>=2.0&&u<2.12) megaSlash(bx,by,seg(u,2.0,2.3),t,Math.min(VW,VH*1.4),'140,225,255','255,90,90');   // ⚔️ nhát chém khổng lồ cắt chéo qua quả bom
      if(u>=2.08&&u<2.2){ const k=seg(u,2.08,2.2); g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle=`rgba(255,255,255,${1-k})`; g.lineWidth=3; g.beginPath(); g.moveTo(0,CY); g.lineTo(VW,CY); g.stroke(); g.restore(); } });
    // 🎬 nhịp 3: chém xong → QUAY MẶT ĐI (hướng về máy) → quả bom nứt, tách đôi rồi NỔ TUNG SAU LƯNG, ánh nổ hắt viền lên người
    if(u>=4.6&&u<5.6) ins(()=>{ const split=1, ex=seg(u,3.75,5.8), bx=VW*0.55, by=VH*0.27, R=230;
      const gr=g.createLinearGradient(0,0,0,VH); gr.addColorStop(0,'#14030a'); gr.addColorStop(0.7,'#4a1210'); gr.addColorStop(1,'#1a0806'); g.fillStyle=gr; g.fillRect(0,0,VW,VH);
      if(ex<0.06){ const ang=Math.atan2(SL.by-SL.ay,SL.bx-SL.ax), ux=Math.cos(ang), uy=Math.sin(ang), nx=uy, ny=-ux;
        for(const sd of [-1,1]){ g.save(); g.beginPath(); g.moveTo(bx-ux*900,by-uy*900); g.lineTo(bx+ux*900,by+uy*900); g.lineTo(bx+ux*900+nx*sd*900,by+uy*900+ny*sd*900); g.lineTo(bx-ux*900+nx*sd*900,by-uy*900+ny*sd*900); g.closePath(); g.clip(); g.translate(nx*sd*split*60,ny*sd*split*60); bijuu(bx,by,R,t,0.3); g.restore(); }
        g.save(); g.beginPath(); g.arc(bx,by,R+split*60,0,Math.PI*2); g.clip(); g.globalCompositeOperation='lighter'; g.shadowColor='rgba(255,220,180,1)'; g.shadowBlur=20+split*50; g.strokeStyle='rgba(255,250,240,0.95)'; g.lineWidth=2+split*12; g.beginPath(); g.moveTo(bx-ux*R*1.2,by-uy*R*1.2); g.lineTo(bx+ux*R*1.2,by+uy*R*1.2); g.stroke(); g.restore(); }
      if(ex>0){ g.save(); g.translate(bx,by); g.scale(0.36,0.36); skyBlast(0,0,ex); g.restore(); if(ex<0.12){ g.fillStyle=`rgba(255,240,225,${0.55*(1-ex/0.12)})`; g.fillRect(0,0,VW,VH); } }
      g.fillStyle='#0b0506'; g.fillRect(0,VH*0.86,VW,VH);
      const lit=ex>0?Math.max(0,1-ex*1.3):0.15, tr=ex>0&&ex<0.25?Math.sin(t*60)*3:0;
      actor(IMG.joninnR,VW*0.3+tr,VH*0.92,280,{flip:flipTo('samuraicheems',true)}); actor(IMG.bibi,VW*0.5+tr,VH*0.93,200,{}); actor(IMG.berserk,VW*0.7+tr,VH*0.92,300,{flip:flipTo('berserkcat',false)});   // quay mặt về phía máy, lưng hướng quả bom
      if(lit>0){ g.save(); g.globalCompositeOperation='lighter'; glow(VW/2,VH*0.6,VW*0.9,0.4*lit,'255,170,110'); g.restore(); }   // ánh nổ hắt viền từ sau lưng
      if(ex>0&&Math.random()<0.6) parts.push({k:'spark',x:Math.random()*VW,y:VH*0.2,vx:(Math.random()-0.5)*4,vy:2+Math.random()*3,l:50,L:50,c:'255,180,110'}); });
    if(u>=5.6&&u<6.6) ins(()=>horizonBlast(seg(u,5.6,6.6),t,{air:true,x:0.5,sky1:'#7a2410'}));   // 🌅 nhìn từ xa: quả bom nổ giữa trời trên thành phố
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
    sealGround(0.22,t);
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
      dustWall(SE.x,SE.y,lerp(250,4200,eout(imp)),0.95*(1-seg(imp,0.5,1)));
      if(imp<0.4&&Math.random()<0.9) rocks(SE.x+(Math.random()-0.5)*900,SE.y,3,(Math.random()-0.5)*14); }   // mặt đất vỡ tan
    skyline(t,u>=9.1&&u<9.8?18:0,false);
    if(u>=9.3&&u<10.7) ins(()=>horizonBlast(seg(u,9.3,10.7),t,{x:0.5}));   // 🌅 nhìn từ thật xa: tia đen cắm xuống chân trời, vòm nổ + sóng bụi cuộn tới
    if(u>=10.7&&u<11.6) ins(()=>topDownRings(seg(u,10.7,11.6),t));   // 🛰️ nhìn thẳng từ trên cao: vòng xung kích + vành bụi toả tròn
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
    { const mx=KX+2700, my=KY-3000, mg=g.createRadialGradient(mx,my,0,mx,my,450); mg.addColorStop(0,'rgba(230,240,255,0.95)'); mg.addColorStop(0.5,'rgba(200,220,255,0.9)'); mg.addColorStop(1,'rgba(200,220,255,0)'); g.fillStyle=mg; g.beginPath(); g.arc(mx,my,450,0,Math.PI*2); g.fill(); g.save(); g.globalCompositeOperation="lighter"; glow(mx,my,2500,0.2,'170,200,255'); g.restore(); }   // 🌕 trăng tròn lạnh
    g.fillStyle='#120406'; g.beginPath(); g.moveTo(KX-30000,KY); for(let i=0;i<=60;i++){ const x=KX-15000+i*500, h=900+1400*Math.abs(Math.sin(i*0.7+1))*hash(i+70)+600*hash(i+71); g.lineTo(x,KY-h); } g.lineTo(KX+30000,KY); g.closePath(); g.fill();   // núi xa
    const gr=g.createLinearGradient(0,KY,0,KY+6000); gr.addColorStop(0,'#2a0d0b'); gr.addColorStop(0.3,'#160606'); gr.addColorStop(1,'#060202'); g.fillStyle=gr; g.fillRect(KX-30000,KY,60000,30000);
  }
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
    // 🎬 4 meme âm nhạc CÙNG LÚC: màn hình chia 4 cột, từng cột lần lượt trượt vào xen kẽ (trên xuống / dưới lên) như slideshow, rồi giữ cả 4 · cuối cùng 4 cột trượt ra ngược lại
    if(u>=1.8&&u<4.6) ins(()=>{ const ORD=['pianocat','electricguitarcat','bongocat','mosquitoviolin'], n=4, cw=VW/n, out=seg(u,4.25,4.6);
      g.fillStyle='#050103'; g.fillRect(0,0,VW,VH);
      ORD.forEach((k,i)=>{ const c=K4.find(e=>e[2]===k)[3], im=kIm(k), dir=i%2?1:-1, inK=eout(seg(u,1.8+i*0.28,2.25+i*0.28)), oy=dir*VH*(1-inK)+(-dir)*VH*ein(out), x0=i*cw, cx=x0+cw/2, q=seg(u,1.8+i*0.28,4.6);
        if(inK<=0) return;
        g.save(); g.beginPath(); g.rect(x0+2,0,cw-4,VH); g.clip(); g.translate(0,oy);
        const gr=g.createLinearGradient(0,0,0,VH); gr.addColorStop(0,'#14040c'); gr.addColorStop(0.55,`rgba(${c},0.35)`); gr.addColorStop(1,'#0a0206'); g.fillStyle=gr; g.fillRect(x0,0,cw,VH);
        g.save(); g.globalCompositeOperation='lighter'; for(let r=0;r<3;r++){ const f=(q*1.4+r/3)%1; ring(cx,VH*0.62,lerp(20,cw*0.9,f),0.6*(1-f),c,4,1); } glow(cx,VH*0.6,cw*0.7,0.5,c); g.restore();
        const hh=Math.min(VH*0.34,cw*1.15); actor(im,cx,VH*0.8,hh*lerp(1,1.04,q),{flip:k==='mosquitoviolin'});
        g.font='900 40px serif'; g.textAlign='center'; for(let j=0;j<4;j++){ const f=(q*1.2+j/4)%1; g.fillStyle=`rgba(${c},${1-f})`; g.fillText(['♪','♫','♩','♬'][j],cx+Math.sin(j*2+t*2)*cw*0.3,VH*0.55-f*VH*0.4); }
        g.restore(); });
      g.fillStyle='#000'; for(let i=1;i<n;i++) g.fillRect(i*cw-3,0,6,VH);   // vạch chia khung
    });
    // 🎬 cận Holy Cat NIỆM CHÚ: vòng hào quang + phù văn vàng xoay, tia sáng toả
    if(u>=6.4&&u<7.4) ins(()=>{ const q=seg(u,6.4,7.4); bgFocus(t,'#fff3d8','#4a2a10',true,VW/2,VH*0.42); g.save(); g.globalCompositeOperation='lighter';
      for(let i=0;i<20;i++){ const an=i/20*Math.PI*2+t*0.3; g.strokeStyle='rgba(255,230,160,0.18)'; g.lineWidth=14; g.beginPath(); g.moveTo(VW/2,VH*0.38); g.lineTo(VW/2+Math.cos(an)*VH,VH*0.38+Math.sin(an)*VH); g.stroke(); }
      for(const [r,sp] of [[VW*0.42,0.6],[VW*0.3,-0.9]]){ g.strokeStyle='rgba(255,220,140,0.85)'; g.lineWidth=4; g.beginPath(); g.arc(VW/2,VH*0.38,r,0,Math.PI*2); g.stroke(); g.font='700 34px serif'; g.fillStyle='rgba(255,236,180,0.95)'; g.textAlign='center'; for(let i=0;i<14;i++){ const an=i/14*Math.PI*2+t*sp; g.fillText('✦ᛉ✧ᛟ✝ᚨ✦'[i%7],VW/2+Math.cos(an)*r,VH*0.38+Math.sin(an)*r+12); } }
      g.restore(); actor(IMG.angel,VW/2,VH*0.72+Math.sin(t*2)*6,VH*0.5*lerp(1,1.08,q),{});
      if(q<0.12){ g.fillStyle=`rgba(255,255,255,${0.7*(1-q/0.12)})`; g.fillRect(0,0,VW,VH); } });
    // 😇 Holy Cat tí hon lơ lửng trên nóc kết giới
    if(u>=7.4&&fade>0){ const ax=KX, ay=KY-KHC-500+Math.sin(t*2)*30; g.save(); g.globalCompositeOperation='lighter'; glow(ax,ay-60,700,0.6*fade,'255,250,225'); g.restore(); actor(IMG.angel,ax,ay,110,{a:fade}); }
    if(u>=7.45&&u<8.5) ins(()=>haloBeam(seg(u,7.45,8.5),t,'255,236,180',q=>{ const y=lerp(-VH*0.1,VH*0.62,ein(seg(q,0.35,1))); holyCross(VW/2,y,lerp(30,70,q),1); }));   // ☁️ trên tầng mây: cột sáng + vòng hào quang, thánh giá giáng xuyên mây
  }
  const camK=u=>keys(u,[[0,KX,KY-1500,0.13,0.02],[1.8,KX,KY-1700,0.115,0.02],[4.6,KX,KY-1800,0.105,0],[4.7,KX,KY-2500,0.092,-0.015],[6.4,KX,KY-2800,0.088,0],
    [7.4,KX,KY-3500,0.085,0.015],[8.45,KX,KY-3300,0.085,0.015],[8.5,KX,KY-2600,0.09,0],[9.0,KX,KY-2100,0.1,-0.02],[12,KX,KY-1800,0.1,0],[14.5,KX,KY-1700,0.105,0]]);

  // ═════════ Z — CHIÊU CUỐI: Catler + Stalin đọ chưởng với Evil Gary + Evil Larry (pháp sư), bị dồn → cả dàn meme ùa tới, giơ tay
  //            truyền năng lượng: vô số tia sáng li ti từ mọi phía tụ thành 1 QUẢ CẦU NĂNG LƯỢNG khổng lồ (kiểu Genki Dama) → Chill Guy chạy từ xa,
  //            bật nhảy ĐÁ quả cầu bay về phía 2 kẻ ác → chúng dựng KẾT GIỚI NGÔI SAO QUỶ chống đỡ → kết giới nứt vỡ, 2 kẻ ác bị đẩy bật →
  //            TOÀN CẢNH TỪ TRÊN CAO: quả cầu cày nát 1 đường thẳng xuyên thung lũng, bụi cuộn lên liên tục, khoét thủng vách núi cuối thung lũng
  //            → Larry nhảy vút lên tan vào bóng đêm · Evil Gary yếu đi, bị cả dàn meme quây kín · Stalin bước ra giơ búa ═════════
  const ZG={sx:380,cx:270,gx:900,lx:1060,y:880};
  const zCrew=()=>army.filter(m=>m.k!=='stalincat'&&m.k!=='feuerkatze'&&m.k!=='chillguy').slice(0,18);
  // 🫂 chỗ đứng của meme thứ i khi quây Evil Gary: 2 hàng vòng cung RỘNG phía trái + sau-phải (chừa trống ngay sau lưng Gary để không đè lên hắn), cách đều nhau
  function zSlot(i,gx,Y){ const row=i%2, j=Math.floor(i/2), a=Math.PI*(row?1.17+j*0.095:1.12+j*0.11), R=row?600:430, RY=row?240:170;   // vòng cung PHÍA SAU Gary từ trái sang phải, phía trước để trống cho Stalin
    return {x:gx+Math.cos(a)*R, y:Y+15+Math.sin(a)*RY}; }
  // 🔮 vòng phù văn tím Larry niệm chú (nằm trên mặt đất, xoay, chữ rune sáng dần, cột sáng tím dâng lên)
  function runeCircle(x,y,k,t){ if(k<=0.01) return; g.save(); g.globalCompositeOperation='lighter'; g.translate(x,y); g.save(); g.scale(1,0.26);
    for(const [r,lw] of [[230,6],[200,2.5],[120,4]]){ g.strokeStyle=`rgba(190,110,255,${0.85*k})`; g.lineWidth=lw; g.beginPath(); g.arc(0,0,r*eout(k),0,Math.PI*2); g.stroke(); }
    g.rotate(t*0.8); g.font='700 34px serif'; g.textAlign='center'; g.textBaseline='middle'; g.fillStyle=`rgba(225,180,255,${k})`; for(let i=0;i<16;i++){ g.save(); g.rotate(i/16*Math.PI*2); g.fillText(['ᚱ','ᛟ','ᚢ','ᛖ','ᛉ','ᛞ','ᚦ','ᛗ'][i%8],0,-215*eout(k)); g.restore(); }
    g.rotate(-t*1.6); g.strokeStyle=`rgba(190,110,255,${0.7*k})`; g.lineWidth=3; for(const o of [0,Math.PI/4]){ g.beginPath(); for(let i=0;i<=4;i++){ const q=o+i*Math.PI/2; i?g.lineTo(Math.cos(q)*120,Math.sin(q)*120):g.moveTo(Math.cos(q)*120,Math.sin(q)*120); } g.stroke(); } g.restore();
    g.save(); g.scale(1,3.2); glow(0,-90,190,0.3*k,'170,80,255'); glow(0,-60,90,0.35*k,'210,150,255'); g.restore();   // cột sáng tím (mềm)
    for(let i=0;i<24;i++){ const f=((t*0.6+hash(i+4000))%1); glow((hash(i+4001)-0.5)*380,-f*650,5,0.9*k*Math.sin(Math.PI*f),'210,150,255'); } g.restore(); }

  function genki(x,y,R,t,a){ if(R<=1||a<=0.01) return; g.save(); g.globalCompositeOperation='lighter';   // 🔵 quả cầu năng lượng: quầng xanh trắng, lõi loá, gợn sáng xoay, tia lửa bám quanh
    glow(x,y,R*2.6,0.35*a,'120,190,255'); glow(x,y,R*1.5,0.6*a,'170,220,255');
    const gr=g.createRadialGradient(x-R*0.25,y-R*0.3,R*0.05,x,y,R); gr.addColorStop(0,`rgba(255,255,255,${a})`); gr.addColorStop(0.45,`rgba(200,235,255,${0.95*a})`); gr.addColorStop(0.85,`rgba(110,180,255,${0.8*a})`); gr.addColorStop(1,`rgba(80,150,255,${0.3*a})`);
    g.fillStyle=gr; g.beginPath(); g.arc(x,y,R,0,Math.PI*2); g.fill();
    g.strokeStyle=`rgba(255,255,255,${0.35*a})`; g.lineWidth=Math.max(1.5,R*0.03); for(let i=0;i<4;i++){ g.beginPath(); g.ellipse(x,y,R*(0.55+i*0.12),R*(0.2+i*0.07),t*(0.8+i*0.3)+i,0,Math.PI*1.3); g.stroke(); }
    for(let i=0;i<16;i++){ const an=t*2.5+i*0.39, rr=R*(1.02+0.08*Math.sin(t*7+i)); glow(x+Math.cos(an)*rr,y+Math.sin(an)*rr,R*0.06+3,0.8*a,'220,240,255'); }
    g.restore(); }
  function demonShield(x,y,k,crack,shat,t){ if(k<=0.01||shat>=1) return; const a=k*(1-shat), RX=80, RY=230;   // 🔴 kết giới NGÔI SAO QUỶ dựng đứng (nhìn nghiêng), nứt dần → vỡ vụn
    g.save(); g.globalAlpha=a; g.globalCompositeOperation='lighter';
    const fg=g.createRadialGradient(x,y,0,x,y,RY); fg.addColorStop(0,'rgba(255,40,60,0.10)'); fg.addColorStop(0.85,'rgba(255,40,60,0.25)'); fg.addColorStop(1,'rgba(255,90,90,0.55)'); g.fillStyle=fg; g.beginPath(); g.ellipse(x,y,RX,RY,0,0,Math.PI*2); g.fill();
    g.restore(); g.save(); g.globalAlpha=a; pentagram(x,y,1,t,RX,RY); g.restore();
    if(shat>0) for(let i=0;i<30;i++){ const an=hash(i+2750)*Math.PI*2, d=eout(shat)*(200+hash(i+2751)*500), sx=x+Math.cos(an)*(RX*0.6+d)+shat*300, sy=y+Math.sin(an)*(RY*0.5+d*0.6)+shat*shat*200, s=8+hash(i+2752)*22;
      g.save(); g.globalAlpha=(1-shat); g.translate(sx,sy); g.rotate(shat*8*hash(i)); g.fillStyle='rgba(255,70,80,0.75)'; g.beginPath(); g.moveTo(-s,0); g.lineTo(0,-s*0.6); g.lineTo(s*0.8,s*0.3); g.closePath(); g.fill(); g.restore(); } }   // mảnh kết giới văng
  // 🏞️ TOÀN CẢNH TỪ TRÊN CAO: thung lũng giữa 2 vách đá khổng lồ chạy về phía chân trời · quả cầu lao đi cày nát 1 rãnh thẳng, bụi cuộn lên liên tục sau lưng nó · khoét thủng vách núi chắn cuối thung lũng
  function canyonPlough(q,t){ const VPx=VW*0.5, VPy=VH*0.3, WH=z=>VH*(0.05+0.4*Math.pow(1-z,1.25)), d=eio(seg(q,0.04,0.72)), hit=seg(q,0.72,1);
    const sky=g.createLinearGradient(0,0,0,VPy); sky.addColorStop(0,'#0c2a7a'); sky.addColorStop(0.7,'#2a5ab8'); sky.addColorStop(1,'#8fb2e0'); g.fillStyle=sky; g.fillRect(0,0,VW,VH);
    for(let i=0;i<14;i++){ const y=VPy*(0.12+hash(i+2800)*0.75), x=((hash(i+2801)*VW*1.4+t*8)%(VW*1.4))-VW*0.2, w=VW*(0.08+hash(i+2802)*0.16); for(let j=0;j<4;j++){ g.fillStyle=`rgba(255,255,255,${0.5-j*0.08})`; g.beginPath(); g.ellipse(x+j*w*0.3,y-j*3,w*(1-j*0.18),VH*(0.012+0.006*j),0,0,Math.PI*2); g.fill(); } }   // mây trắng trải dài
    const depthY=z=>lerp(VH*1.08,VPy+VH*0.02,Math.pow(z,0.55)), halfW=z=>lerp(VW*0.3,VW*0.012,Math.pow(z,0.55));   // phối cảnh: z=0 sát máy · z=1 cuối thung lũng
    // 🏙️ THÀNH PHỐ ở cuối thung lũng — quả cầu lao tới khoét thủng hẳn 1 mảng lớn (nhà cửa biến mất, hố cháy rực, cột khói)
    { const CX0=VPx-VW*0.22, CX1=VPx+VW*0.22, base=VPy+VH*0.03, holeR=VW*0.17*eout(Math.min(1,hit*1.5));
      for(let i=0;i<46;i++){ const x=CX0+hash(i+2870)*(CX1-CX0), w=VW*(0.006+0.01*hash(i+2871)), h=VH*(0.02+0.07*hash(i+2872)), dx=Math.abs(x-VPx);
        if(hit>0&&dx<holeR*1.05) continue;   // nằm trong mảng bị khoét → mất
        g.fillStyle=hash(i+2873)<0.5?'#5a6a86':'#3e4a62'; g.fillRect(x-w/2,base-h,w,h); g.fillStyle='rgba(255,230,160,0.6)'; for(let j=0;j<3;j++) g.fillRect(x-w/4,base-h+h*(0.2+j*0.25),w*0.2,h*0.06); }
      if(hit>0){ g.save(); g.translate(VPx,base-VH*0.04); g.scale(0.45,0.45); skyBlast(0,0,Math.min(0.999,hit)); g.restore(); g.save(); g.globalCompositeOperation='lighter'; glow(VPx,base-VH*0.02,VW*0.3*(1-hit*0.4),0.9*(1-hit*0.5),'255,220,170'); g.restore();
        g.fillStyle='rgba(40,20,10,0.9)'; g.beginPath(); g.ellipse(VPx,base,holeR,holeR*0.22,0,0,Math.PI*2); g.fill();
        g.save(); g.globalCompositeOperation='lighter'; g.fillStyle=`rgba(255,120,40,${0.7*(1-hit*0.5)})`; g.beginPath(); g.ellipse(VPx,base,holeR*0.85,holeR*0.17,0,0,Math.PI*2); g.fill(); g.restore();   // hố cháy rực
        for(let i=0;i<14;i++){ const f=((t*0.4+hash(i+2880))%1), x=VPx+(hash(i+2881)-0.5)*holeR*1.6; puff(x,base-f*VH*0.25*hit,VW*0.02+f*VW*0.04,0.5*(1-f)*Math.min(1,hit*3),'90,80,80'); } } }   // cột khói bốc lên
    // đáy thung lũng
    const fl=g.createLinearGradient(0,VPy,0,VH); fl.addColorStop(0,'#d8c8a8'); fl.addColorStop(1,'#a89878'); g.fillStyle=fl; g.beginPath(); g.moveTo(VPx-halfW(1),depthY(1)); g.lineTo(VPx+halfW(1),depthY(1)); g.lineTo(VPx+halfW(0),VH*1.1); g.lineTo(VPx-halfW(0),VH*1.1); g.closePath(); g.fill();
    for(let i=0;i<60;i++){ const z=hash(i+2820), x=VPx+(hash(i+2821)-0.5)*2*halfW(z)*0.95, y=depthY(z); g.fillStyle='rgba(90,72,52,0.5)'; g.beginPath(); g.ellipse(x,y,(1-z)*18+2,(1-z)*6+1,0,0,Math.PI*2); g.fill(); }   // đá lổn nhổn
    // 2 vách đá KHỔNG LỒ hai bên chọc lên trời (gần to sừng sững, xa thấp dần) — đỉnh lởm chởm, mặt đá sáng/tối, vân dọc + khối đá nhô, tầng đá
    const TOPS={}, zb=d*0.98;
    for(const sd of [-1,1]){ const top=TOPS[sd]=[]; for(let i=0;i<=22;i++){ const z=1-i/22, H=WH(z)*(0.88+0.2*hash(i+2830+sd*7)); top.push([VPx+sd*(halfW(z)+VW*0.015+VW*0.08*(1-z)*hash(i+2835+sd)),depthY(z)-H]); }
      { const far=top[0], near=top[top.length-1], E=VPx+sd*VW*0.9; g.beginPath(); top.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.lineTo(E,near[1]); g.lineTo(E,far[1]); g.closePath();
        const pg=g.createLinearGradient(0,far[1],0,near[1]); pg.addColorStop(0,'#8a9a68'); pg.addColorStop(1,'#4a5a34'); g.fillStyle=pg; g.fill();   // mặt trên khối núi 2 bên vết xẻ (cỏ cây)
        g.beginPath(); g.moveTo(near[0],near[1]); for(let i=0;i<=10;i++){ const x=lerp(near[0],E,i/10); g.lineTo(x,near[1]+(i?VH*0.012*(hash(i+2898+sd)-0.5):0)); } g.lineTo(E,VH*1.1); g.lineTo(VPx+sd*halfW(0),VH*1.1); g.closePath();
        const ff=g.createLinearGradient(0,near[1],0,VH); ff.addColorStop(0,'#6a5a46'); ff.addColorStop(1,'#2e241a'); g.fillStyle=ff; g.fill();   // vách núi mặt trước (phía máy quay) kéo xuống tận đáy khung
        g.strokeStyle='rgba(0,0,0,0.2)'; for(let i=0;i<24;i++){ const x=lerp(near[0],E,hash(i+2899+sd)); g.lineWidth=1+3*hash(i+2900); g.beginPath(); g.moveTo(x,near[1]+4); g.lineTo(x+sd*6,VH); g.stroke(); }
        for(let i=0;i<26;i++){ const z=hash(i+2895+sd), y=lerp(far[1],near[1],1-z)+VH*0.01, x=VPx+sd*(halfW(z)+VW*0.05+hash(i+2896+sd)*VW*0.4); g.fillStyle='rgba(40,64,28,0.55)'; g.beginPath(); g.ellipse(x,y,VW*0.02*(1-z)+2,VH*0.008*(1-z)+1,0,0,Math.PI*2); g.fill(); } }
      const path=()=>{ g.beginPath(); g.moveTo(VPx+sd*halfW(1),depthY(1)); top.forEach(p=>g.lineTo(p[0],p[1])); g.lineTo(VPx+sd*halfW(0)-sd*1,VH*1.1); g.closePath(); };   // mặt vách (mặt cắt) chỉ giữa mép trên và đáy
      path(); const cg=g.createLinearGradient(VPx,0,VPx+sd*VW*0.6,0); cg.addColorStop(0,sd<0?'#7a6a58':'#4a3e34'); cg.addColorStop(0.5,sd<0?'#5a4a3c':'#2e2620'); cg.addColorStop(1,sd<0?'#3a2e24':'#1c1612'); g.fillStyle=cg; g.fill();
      g.save(); path(); g.clip();
      for(let i=0;i<90;i++){ const z=Math.pow(hash(i+2840+sd*3),0.8), x0=VPx+sd*(halfW(z)+VW*0.01+hash(i+2841)*VW*0.5*(1-z)), y0=depthY(z), L=VH*(0.15+0.9*(1-z))*(0.4+0.6*hash(i+2842));   // vân đá dọc (rãnh nước xói)
        g.strokeStyle=hash(i+2843)<0.5?(sd<0?'rgba(255,220,180,0.13)':'rgba(255,200,170,0.06)'):'rgba(0,0,0,0.3)'; g.lineWidth=1+5*(1-z)*hash(i+2844); g.beginPath(); g.moveTo(x0,y0); g.quadraticCurveTo(x0+sd*VW*0.01,y0-L*0.5,x0+sd*VW*0.02*(hash(i)-0.3),y0-L); g.stroke(); }
      for(let i=0;i<14;i++){ const z=hash(i+2860+sd), x=VPx+sd*(halfW(z)+VW*0.05+hash(i+2861)*VW*0.4*(1-z)), y=depthY(z)-VH*(0.1+0.6*hash(i+2862))*(1-z), r=VW*0.05*(1-z)+4;   // khối đá nhô + bóng
        g.fillStyle='rgba(0,0,0,0.22)'; g.beginPath(); g.ellipse(x+sd*r*0.3,y+r*0.4,r*1.2,r*0.5,0,0,Math.PI*2); g.fill(); g.fillStyle=sd<0?'rgba(255,215,175,0.1)':'rgba(255,200,170,0.05)'; g.beginPath(); g.ellipse(x,y,r,r*0.45,0,0,Math.PI*2); g.fill(); }
      g.strokeStyle='rgba(0,0,0,0.16)'; for(let j=1;j<10;j++){ g.lineWidth=2; g.beginPath(); for(let i=0;i<=12;i++){ const z=i/12, x=VPx+sd*(halfW(z)+VW*0.5*(1-z)), y=depthY(z)-VH*0.11*j*Math.pow(1-z,1.3); i?g.lineTo(x,y):g.moveTo(x,y); } g.stroke(); }   // tầng đá
      g.restore();
      g.strokeStyle=sd<0?'rgba(255,200,150,0.45)':'rgba(255,170,120,0.25)'; g.lineWidth=2; g.beginPath(); top.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke();   // viền sáng mép vách
      g.fillStyle='rgba(60,96,40,0.85)'; for(let i=2;i<top.length;i+=2){ const p=top[i]; g.beginPath(); g.ellipse(p[0],p[1]+3,VW*0.012+VW*0.02*(i/top.length),VH*0.01,0,0,Math.PI*2); g.fill(); } }   // bụi cây sẫm trên đỉnh vách
    // ⛰️ phần núi CHƯA bị xẻ (phía trước quả cầu): khối núi liền 1 mảng nối 2 vách — quả cầu cày tới đâu, núi tách đôi tới đó
    if(zb<0.995){ const tAt=(sd,z)=>{ const A=TOPS[sd], f=Math.min(21.999,Math.max(0,(1-z)*22)), i=Math.floor(f), k=f-i; return [lerp(A[i][0],A[i+1][0],k),lerp(A[i][1],A[i+1][1],k)]; };
      const N=24, zs=[...Array(N+1)].map((_,i)=>lerp(zb,1,i/N));
      g.beginPath(); zs.forEach((z,i)=>{ const p=tAt(-1,z); i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]); }); for(let i=N;i>=0;i--){ const p=tAt(1,zs[i]); g.lineTo(p[0],p[1]); } g.closePath();
      const tg=g.createLinearGradient(0,VPy-VH*0.1,0,VH); tg.addColorStop(0,'#7a8a5a'); tg.addColorStop(1,'#4a5a34'); g.fillStyle=tg; g.fill();   // mặt trên khối núi (cỏ cây)
      g.save(); g.clip(); for(let i=0;i<60;i++){ const z=lerp(zb,1,hash(i+2890)), y=depthY(z)-WH(z)*0.95, x=VPx+(hash(i+2891)-0.5)*2*(halfW(z)+VW*0.06*(1-z)); g.fillStyle='rgba(40,64,28,0.6)'; g.beginPath(); g.ellipse(x,y,VW*0.02*(1-z)+2,VH*0.008*(1-z)+1,0,0,Math.PI*2); g.fill(); } g.restore();
      const L0=tAt(-1,zb), R0=tAt(1,zb), fy=depthY(zb);   // mặt núi phía trước (chỗ quả cầu đang khoan vào)
      g.beginPath(); g.moveTo(L0[0],L0[1]); g.lineTo(R0[0],R0[1]); g.lineTo(VPx+halfW(zb),fy); g.lineTo(VPx-halfW(zb),fy); g.closePath();
      const fg=g.createLinearGradient(0,Math.min(L0[1],R0[1]),0,fy); fg.addColorStop(0,'#6a5a48'); fg.addColorStop(1,'#3a2e24'); g.fillStyle=fg; g.fill();
      if(d>0&&d<1){ g.save(); g.globalCompositeOperation='lighter'; const R=lerp(VH*0.3,VH*0.025,Math.pow(d,0.55)); glow(VPx,fy-R*0.7,R*2.2,0.7,'255,200,150'); g.restore(); } }   // đá nóng đỏ quanh chỗ khoan
    // 🔥 rãnh cày: từ sát máy tới vị trí quả cầu — lòng rãnh tối, mép nóng đỏ
    if(zb>0.01){ g.save(); g.beginPath(); for(let i=0;i<=24;i++){ const z=i/24*zb; g.lineTo(VPx-lerp(VW*0.12,VW*0.004,Math.pow(z,0.55)),depthY(z)); } for(let i=24;i>=0;i--){ const z=i/24*zb; g.lineTo(VPx+lerp(VW*0.12,VW*0.004,Math.pow(z,0.55)),depthY(z)); } g.closePath();
      g.fillStyle='#1a0c08'; g.fill(); g.globalCompositeOperation='lighter'; g.strokeStyle='rgba(255,140,60,0.55)'; g.lineWidth=3; g.stroke(); g.restore(); }
    // 🌫️ bụi đá cuộn lên liên tục dọc rãnh (chỗ quả cầu vừa đi qua bụi mới tung, càng về sau càng cao + loang)
    for(let i=0;i<40;i++){ const z=hash(i+2850)*zb; if(z<=0) continue; const age=Math.min(1.6,(zb-z)*1.6)+((t*0.5+hash(i+2851))%1)*0.5, sc=Math.pow(1-z,1.2)+0.08, x=VPx+(hash(i+2852)-0.5)*lerp(VW*0.32,VW*0.012,Math.pow(z,0.55)), y=depthY(z)-age*VH*0.22*sc, r=(VW*0.025+age*VW*0.04)*sc+3;
      puff(x,y,r*1.2,Math.max(0,0.5*(1-age/2.2)),'120,90,78'); puff(x,y-r*0.3,r*0.8,Math.max(0,0.55*(1-age/2.2)),age<0.6?'225,185,150':'180,150,130'); }
    // 🔵 quả cầu (nhỏ dần theo chiều sâu)
    if(hit<0.3){ const R=lerp(VH*0.3,VH*0.025,Math.pow(d,0.55)); genki(VPx,depthY(zb)-R*0.7,R,t,1-hit/0.3); for(let i=0;i<4;i++) if(Math.random()<0.8) parts.push({k:'rock',x:VPx+(Math.random()-0.5)*R*2,y:depthY(zb),vx:(Math.random()-0.5)*6,vy:-4-Math.random()*6,l:40,L:40,c:'110,70,50',r:2+Math.random()*6*(1-d)}); }
    if(hit>0&&hit<0.12){ g.fillStyle=`rgba(255,250,240,${0.7*(1-hit/0.12)})`; g.fillRect(0,0,VW,VH); } }
  // 🏙️ TOÀN CẢNH THÀNH PHỐ ĐỔ NÁT nhìn dọc đại lộ ra chân trời (phối cảnh thật) — quả cầu lao thẳng ra xa, đi tới đâu TOÀN BỘ PHẦN GIỮA bị san phẳng tới đó
  //    (nhà giữa nổ tung + mảnh vỡ văng, bụi cuộn), 2 bên còn nguyên → cuối cùng 1 dải đất trống thẳng tắp xuyên thành phố tới tận chân trời
  const PCW=3.2;   // nửa bề rộng dải thành phố bị quả cầu san phẳng (đơn vị thế giới)
  const CITY=(()=>{ const B=[]; for(let i=0;i<420;i++){ const mid=i<230, d=(mid?4:1.6)+Math.pow(hash(i+3100),1.6)*68, X=mid?(hash(i+3101)-0.5)*2*PCW:(hash(i+3102)<0.5?-1:1)*(PCW+0.4+hash(i+3103)*6);
      B.push({X,d,w:0.35+hash(i+3104)*0.9,h:(0.6+hash(i+3105)*3.2)*(mid?0.9:1.1),seed:i,mid,tone:hash(i+3106)}); } return B.sort((a,b)=>b.d-a.d); })();
  const _bsp={};
  function bSprite(b){ if(_bsp[b.seed]) return _bsp[b.seed]; const W=Math.round(60*b.w)+8, H=Math.round(60*b.h)+8, c=document.createElement('canvas'); c.width=W; c.height=H; const x=c.getContext('2d');
    const P=[[0,H]]; const n=6; for(let i=0;i<=n;i++){ const fx=i/n*W, top=H*(0.02+0.35*hash(b.seed*7+i)*(hash(b.seed+i*3)<0.6?1:0.2)); P.push([fx,top]); } P.push([W,H]);   // mái gãy lởm chởm
    const path=()=>{ x.beginPath(); P.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1])); x.closePath(); };
    const v=Math.round(70+b.tone*50); path(); const gr=x.createLinearGradient(0,0,W,0); gr.addColorStop(0,`rgb(${v+20},${v+24},${v+34})`); gr.addColorStop(0.7,`rgb(${v},${v+4},${v+14})`); gr.addColorStop(1,`rgb(${v-30},${v-28},${v-20})`); x.fillStyle=gr; x.fill();
    x.save(); path(); x.clip(); x.fillStyle='rgba(15,18,26,0.85)'; for(let yy=H*0.12;yy<H-6;yy+=9) for(let xx=4;xx<W-6;xx+=8) if(hash(b.seed*31+xx*3+yy)<0.75) x.fillRect(xx,yy,4,5);   // ô cửa sổ vỡ tối om
      for(let k=0;k<3;k++){ const cx=W*hash(b.seed+k*11), cy=H*(0.2+0.6*hash(b.seed+k*13)), r=W*0.18*hash(b.seed+k*17)+3; x.fillStyle='rgba(10,12,18,0.9)'; x.beginPath(); x.arc(cx,cy,r,0,Math.PI*2); x.fill(); } x.restore();   // mảng tường vỡ thủng
    const hz=document.createElement('canvas'); hz.width=W; hz.height=H; const hx=hz.getContext('2d'); hx.drawImage(c,0,0); hx.globalCompositeOperation='source-in'; hx.fillStyle='#a8bede'; hx.fillRect(0,0,W,H);   // bản "sương xa" cùng hình
    return _bsp[b.seed]={c,hz,W,H}; }
  // 🏚️ NỀN SAU CÚ CÀY (nhìn ngang, toạ độ thế giới): đứng ngay trong rãnh quả cầu vừa cày — trời xanh mây bị xé, 2 lớp nhà đổ nát xám (cùng kiểu cảnh cày) ở bờ rãnh phía xa,
  //    gờ gạch đá chất dọc bờ rãnh, đất xới sẫm có rãnh cào chạy ngang theo hướng quả cầu bay, hố lõm, gạch vụn, bụi còn lơ lửng
  function ruinBG(t,sky0,sky1){ const GY=600;
    const sk=g.createLinearGradient(0,-3500,0,GY); sk.addColorStop(0,sky0); sk.addColorStop(1,sky1); g.fillStyle=sk; g.fillRect(-6000,-6000,14000,6000+GY);
    for(let i=0;i<26;i++){ const x=-3500+((hash(i+3900)*8000+t*15)%8000), y=-1600+hash(i+3901)*1500, r=260+hash(i+3902)*420; if(Math.abs(x-800)<500+hash(i+3903)*300) continue; puff(x,y,r,0.55,'235,240,250'); puff(x,y+r*0.2,r*0.8,0.35,'170,185,210'); }   // mây bị xé dạt sang 2 bên (khe trống giữa trời)
    for(const [L,n,u2p,base,hz] of [[0,80,85,GY-4,0.72],[1,40,150,GY+30,0.38]]) for(let i=0;i<n;i++){ const b=CITY[(i*7+L*3)%CITY.length], S=bSprite(b), x=-3600+i*(8000/n)+(hash(i+3910+L*90)-0.5)*90, h=b.h*u2p*(L?0.8:1), w=b.w*u2p*1.2;
      g.save(); g.translate(x,base); g.rotate((hash(i+3920+L*90)-0.5)*0.08*L); g.drawImage(S.c,-w/2,-h,w,h); g.globalAlpha=hz; g.drawImage(S.hz,-w/2,-h,w,h); g.restore(); }   // 2 lớp nhà đổ nát
    const gr=g.createLinearGradient(0,GY-8,0,2400); gr.addColorStop(0,'#7a6c5c'); gr.addColorStop(0.35,'#5e5042'); gr.addColorStop(1,'#3a3028'); g.fillStyle=gr; g.fillRect(-6000,GY-8,14000,8000);   // đất bị cày
    g.fillStyle='#6e6252'; g.beginPath(); g.moveTo(-6000,GY+60); for(let x=-6000;x<=8000;x+=40) g.lineTo(x,GY+30-Math.abs(Math.sin(x*0.013)*30+Math.sin(x*0.051)*18)); g.lineTo(8000,GY+60); g.closePath(); g.fill();
    for(let i=0;i<260;i++){ const x=-4000+hash(i+3930)*9000, y=GY+20+hash(i+3931)*50, r=14+hash(i+3932)*44, v=Math.round(80+60*hash(i+3933)); g.fillStyle=`rgb(${v},${v-4},${v-12})`; g.beginPath(); g.moveTo(x-r*1.3,y); g.lineTo(x-r*0.5,y-r*(0.6+0.6*hash(i+3934))); g.lineTo(x+r*0.3,y-r*(0.4+0.8*hash(i+3935))); g.lineTo(x+r*1.2,y); g.closePath(); g.fill(); }   // gờ gạch đá dọc bờ rãnh
    for(let i=0;i<50;i++){ const y=GY+90+Math.pow(hash(i+3940),1.3)*1500, s=(y-GY)/600, x=-4000+hash(i+3941)*9000, r=(60+hash(i+3942)*220)*s, lt=hash(i+3943)<0.5; g.fillStyle=lt?'rgba(160,140,115,0.2)':'rgba(25,18,12,0.25)'; g.beginPath(); g.ellipse(x,y,r*2,r*0.25,0,0,Math.PI*2); g.fill(); }   // mảng đất loang
    g.lineCap='butt'; for(let i=0;i<40;i++){ const y=GY+70+Math.pow(hash(i+3950),1.4)*1500, s=(y-GY)/600, x0=-4500+hash(i+3951)*3000, x1=x0+4000+hash(i+3952)*5000; g.strokeStyle='rgba(30,22,16,0.5)'; g.lineWidth=(3+hash(i+3953)*6)*s; g.beginPath(); g.moveTo(x0,y); g.bezierCurveTo(x0+1500,y+(hash(i+3954)-0.5)*20*s,x1-1500,y+(hash(i+3955)-0.5)*20*s,x1,y); g.stroke();
      g.strokeStyle='rgba(175,155,130,0.3)'; g.lineWidth=(1+hash(i+3953)*2)*s; g.beginPath(); g.moveTo(x0,y-3*s); g.bezierCurveTo(x0+1500,y-3*s,x1-1500,y-3*s,x1,y-3*s); g.stroke(); }   // rãnh cào chạy ngang (hướng quả cầu bay)
    for(let i=0;i<40;i++){ const y=GY+120+Math.pow(hash(i+3960),1.3)*1400, s=(y-GY)/600, x=-4000+hash(i+3961)*9000, r=(30+hash(i+3962)*90)*s; g.fillStyle='rgba(28,20,14,0.55)'; g.beginPath(); g.ellipse(x,y,r*1.6,r*0.35,0,0,Math.PI*2); g.fill(); }   // hố lõm
    for(let i=0;i<300;i++){ const y=GY+40+Math.pow(hash(i+3970),1.2)*1500, s=(y-GY)/600, x=-4000+hash(i+3971)*9000, r=(4+hash(i+3972)*12)*s, v=Math.round(60+70*hash(i+3973)); g.fillStyle=`rgb(${v+10},${v+4},${v-4})`; g.beginPath(); g.moveTo(x-r,y); g.lineTo(x-r*0.4,y-r*0.9); g.lineTo(x+r*0.6,y-r*0.7); g.lineTo(x+r,y); g.closePath(); g.fill(); }   // gạch vụn
    for(let i=0;i<14;i++){ const x=-3000+((hash(i+3980)*7000+t*25)%7000), y=GY-40+hash(i+3981)*160; puff(x,y,240+hash(i+3982)*260,0.22,'190,175,155'); }   // bụi còn lơ lửng
  }
  function cityPlough(q,t){ const VPx=VW*0.5, VPy=VH*0.42, F=VH*0.9, HC=0.5, sx=(X,d)=>VPx+X*F/d, gy=d=>VPy+HC*F/d;
    const QS=0.14, QE=0.84, TL=2.9, BV=(80-0.4)/((QE-QS)*TL);   // quả cầu bay với VẬN TỐC KHÔNG ĐỔI theo chiều sâu (BV đơn vị/giây) · TL = thời lượng cảnh (giây)
    const bd=0.4+BV*Math.max(0,q-QS)*TL, done=seg(q,QE,1), tq=d=>QS+(d-0.4)/BV/TL;   // tq(d): thời điểm quả cầu đi qua độ sâu d
    const sky=g.createLinearGradient(0,0,0,VPy); sky.addColorStop(0,'#0c2a7a'); sky.addColorStop(0.75,'#3a6ac0'); sky.addColorStop(1,'#a8c4e8'); g.fillStyle=sky; g.fillRect(0,0,VW,VH);
    // ☁️ MÂY PHỐI CẢNH (cùng hệ trục với thành phố): quả cầu bay qua độ sâu nào thì luồng áp lực xé mây ở đó DẠT RA 2 BÊN (gần đường bay bị hất mạnh + kéo giãn) → để lại khe trời thẳng tới chân trời
    for(let i=0;i<64;i++){ const d=95-i*1.25-hash(i+3210)*1.2, X0=(hash(i+3211)-0.5)*(i%3?34:70), H=d*0.3+4+hash(i+3212)*4, cw=d*0.09+3+hash(i+3213)*4, th=(q-tq(Math.min(d,80)))*TL;
      let X=X0+Math.sin(t*0.05+i)*0.4, st=1, al=0.8;
      if(th>0){ const side=X0>=0?1:-1, near=Math.max(0,1-Math.abs(X0)/26), k=1-Math.exp(-th*2.2); X+=side*(3+near*24)*k; st=1+near*0.9*k; al*=1-0.35*near*k; }   // bị đẩy ra ngoài + giãn dài theo hướng bị hất
      const s=F/d, cx=sx(X,d), cy=VPy-(H-HC)*s, w=cw*s*st, hz=Math.min(0.75,d/95); if(cx+w<-40||cx-w>VW+40||cy<-w*0.5) continue;
      for(let j=0;j<5;j++){ const ox=(hash(i*7+j+3220)-0.5)*w*1.1, oy=(hash(i*7+j+3221)-0.5)*w*0.12, r=w*(0.22+0.18*hash(i*7+j+3222));
        puff(cx+ox,cy+oy+r*0.15,r*1.05,al*0.55,`${lerp(150,190,hz)|0},${lerp(165,205,hz)|0},${lerp(195,232,hz)|0}`);   // mặt dưới hơi tối
        puff(cx+ox,cy+oy-r*0.12,r*0.85,al*0.8,`${lerp(255,215,hz)|0},${lerp(255,228,hz)|0},${lerp(255,245,hz)|0}`); } }
    const gr=g.createLinearGradient(0,VPy,0,VH); gr.addColorStop(0,'#9aa2ae'); gr.addColorStop(1,'#5a5248'); g.fillStyle=gr; g.fillRect(0,VPy,VW,VH-VPy);   // mặt đất đầy gạch vụn
    for(let i=0;i<220;i++){ const d=1.2+Math.pow(hash(i+3300),1.5)*70, X=(hash(i+3301)-0.5)*14, r=(0.05+0.12*hash(i+3302))*F/d; if(Math.abs(X)<PCW+0.1&&d<bd) continue; g.fillStyle=hash(i+3303)<0.5?'rgba(60,58,62,0.8)':'rgba(120,110,100,0.7)'; g.beginPath(); g.ellipse(sx(X,d),gy(d),r*1.4,r*0.5,0,0,Math.PI*2); g.fill(); }   // đống gạch đá
    // 🕳️ dải đất BỊ CÀY NÁT phía sau quả cầu: đất xới sẫm màu, mép lởm chởm, rãnh cào dọc theo đường bay, hố lõm, gạch đá vụn, gờ đổ nát chất 2 bên
    if(bd>1.05){ const d1=bd, ew=(d,sd)=>PCW+0.22*Math.sin(d*1.9+sd)+0.16*Math.sin(d*5.3+sd*2)+0.1*Math.sin(d*11+sd);   // mép rãnh lởm chởm
      g.beginPath(); for(let i=0;i<=40;i++){ const d=lerp(0.5,d1,Math.pow(i/40,1.5)); i?g.lineTo(sx(-ew(d,0),d),gy(d)):g.moveTo(sx(-ew(d,0),d),gy(d)); } for(let i=40;i>=0;i--){ const d=lerp(0.5,d1,Math.pow(i/40,1.5)); g.lineTo(sx(ew(d,3),d),gy(d)); } g.closePath();
      const pg=g.createLinearGradient(0,gy(d1),0,VH); pg.addColorStop(0,'#7a6c5c'); pg.addColorStop(1,'#4e4236'); g.fillStyle=pg; g.fill();
      g.save(); g.clip(); for(let i=0;i<60;i++){ const d=0.8+Math.pow(hash(i+3390),1.4)*72; if(d>=d1) continue; const X=(hash(i+3391)-0.5)*2*PCW, r=(0.3+0.9*hash(i+3392))*F/d, lt=hash(i+3393)<0.5; g.fillStyle=lt?'rgba(160,140,115,0.22)':'rgba(25,18,12,0.25)'; g.beginPath(); g.ellipse(sx(X,d),gy(d),r*1.8,r*0.3,0,0,Math.PI*2); g.fill(); } g.restore();   // mảng đất xới loang sáng/tối
      g.lineCap='butt'; for(let i=0;i<30;i++){ const X0=(hash(i+3400)-0.5)*2*PCW*0.92, w=0.008+hash(i+3401)*0.02, P=[]; for(let j=0;j<=30;j++){ const d=lerp(0.6,d1,Math.pow(j/30,1.6)), X=X0+Math.sin(d*0.9+i)*0.08; P.push([sx(X,d),gy(d),F/d]); }
        for(let j=1;j<P.length;j++){ const [x0,y0,s0]=P[j-1], [x1,y1]=P[j]; g.strokeStyle='rgba(30,22,16,0.55)'; g.lineWidth=Math.max(0.6,w*s0); g.beginPath(); g.moveTo(x0,y0); g.lineTo(x1,y1); g.stroke(); g.strokeStyle='rgba(175,155,130,0.35)'; g.lineWidth=Math.max(0.4,w*s0*0.35); g.beginPath(); g.moveTo(x0,y0-w*s0*0.45); g.lineTo(x1,y1-w*s0*0.45); g.stroke(); } }   // rãnh cào dọc đường bay (mảnh dần về xa)
      for(let i=0;i<70;i++){ const d=2.2+Math.pow(hash(i+3430),1.4)*72; if(d>=d1) continue; const X=(hash(i+3431)-0.5)*2*PCW*0.9, r=(0.06+0.16*hash(i+3432))*F/d; g.fillStyle='rgba(28,20,14,0.6)'; g.beginPath(); g.ellipse(sx(X,d),gy(d),r*1.5,r*0.42,0,0,Math.PI*2); g.fill(); g.fillStyle='rgba(190,170,140,0.25)'; g.beginPath(); g.ellipse(sx(X,d),gy(d)-r*0.2,r*1.3,r*0.2,0,Math.PI,Math.PI*2); g.fill(); }   // hố lõm
      for(let i=0;i<300;i++){ const d=0.9+Math.pow(hash(i+3450),1.5)*72; if(d>=d1) continue; const X=(hash(i+3451)-0.5)*2*PCW, r=(0.02+0.06*hash(i+3452))*F/d, x=sx(X,d), y=gy(d), v=Math.round(60+70*hash(i+3453));
        g.fillStyle=`rgb(${v+10},${v+4},${v-4})`; g.beginPath(); g.moveTo(x-r,y); g.lineTo(x-r*0.4,y-r*0.9); g.lineTo(x+r*0.6,y-r*0.7); g.lineTo(x+r,y); g.closePath(); g.fill(); }   // gạch đá vụn rải khắp rãnh
      for(const sd of [-1,1]) for(let i=0;i<90;i++){ const d=1.4+Math.pow(hash(i+3480+sd*7),1.3)*72; if(d>=d1) continue; const X=sd*(ew(d,sd<0?0:3)+0.05+hash(i+3481)*0.35), r=(0.08+0.2*hash(i+3482))*F/d, x=sx(X,d), y=gy(d), v=Math.round(80+60*hash(i+3483));
        g.fillStyle=`rgb(${v},${v-4},${v-12})`; g.beginPath(); g.moveTo(x-r*1.3,y); g.lineTo(x-r*0.5,y-r*(0.6+0.6*hash(i+3484))); g.lineTo(x+r*0.3,y-r*(0.4+0.8*hash(i+3485))); g.lineTo(x+r*1.2,y); g.closePath(); g.fill(); }   // gờ đổ nát chất 2 bên mép rãnh
    }
    // 🏚️ nhà cửa (xa → gần): nhà ở phần GIỮA mà quả cầu đã đi qua thì mất, nhà ngay sát quả cầu đang bị thổi tung
    // 💥 VẬT LÝ: nhà giữa bị quả cầu đâm qua vỡ thành khối đá — văng tới trước (đà quả cầu), toả ra 2 bên, bay lên rồi rơi theo trọng lực, chạm đất thì trượt + dừng
    const GRV=9.8*0.55, frag=[];
    for(const b of CITY){ if(!b.mid) continue; const th=(q-tq(b.d))*TL; if(th<=0) continue; const S=bSprite(b);
      for(let k=0;k<14;k++){ const r=hash(b.seed*13+k), r2=hash(b.seed*17+k), r3=hash(b.seed*19+k);
        const vz=4+r*9, vx=(b.X>=0?1:-1)*(0.6+r2*2.4)+(r3-0.5)*1.2, vy=1.5+r3*4.5, x00=b.X+(r2-0.5)*b.w, y00=b.h*(0.15+0.75*r), sz=Math.max(b.w,b.h)*(0.05+0.1*r3);
        const tg=(vy+Math.sqrt(vy*vy+2*GRV*y00))/GRV, tt=Math.min(th,tg), slide=Math.max(0,th-tg), fr=Math.min(slide,0.6);   // tg: lúc chạm đất
        const X=x00+vx*tt+vx*0.35*(fr-fr*fr/1.2), Z=b.d+vz*tt+vz*0.35*(fr-fr*fr/1.2), Y=Math.max(0,y00+vy*tt-0.5*GRV*tt*tt);
        if(Z<0.4) continue; frag.push({X,Y,Z,sz,rot:(r-0.5)*8*tt,c:S,tone:b.tone}); } }
    frag.sort((a,b)=>b.Z-a.Z);
    for(const b of CITY){ const s=F/b.d, x0=sx(b.X,b.d), y0=gy(b.d), w=b.w*s, h=b.h*s; if(x0+w<-20||x0-w>VW+20) continue;
      if(b.mid&&b.d<bd) continue;
      let kk=0; if(b.mid&&b.d<bd+3) kk=seg(bd,b.d-3,b.d)*0.25;   // sắp bị đâm: rung + nứt (sóng áp lực đi trước quả cầu)
      const S=bSprite(b), haze=Math.min(0.85,b.d/70);
      g.save(); if(kk>0){ g.translate(Math.sin(t*60+b.seed)*kk*6,0); }
      g.drawImage(S.c,x0-w/2,y0-h,w,h); g.globalAlpha=haze; g.drawImage(S.hz,x0-w/2,y0-h,w,h); g.restore(); }
    for(const f of frag){ const s=F/f.Z, x=sx(f.X,f.Z), y=gy(f.Z)-f.Y*s, r=f.sz*s; if(r<0.6||x<-50||x>VW+50) continue; const v=Math.round(70+f.tone*50), hz=Math.min(0.8,f.Z/70);
      g.save(); g.translate(x,y); g.rotate(f.rot); g.fillStyle=`rgb(${lerp(v,168,hz)|0},${lerp(v+4,190,hz)|0},${lerp(v+14,222,hz)|0})`; g.beginPath(); g.moveTo(-r,-r*0.4); g.lineTo(-r*0.2,-r); g.lineTo(r,-r*0.3); g.lineTo(r*0.6,r*0.7); g.lineTo(-r*0.7,r*0.6); g.closePath(); g.fill();
      g.fillStyle='rgba(15,18,26,0.6)'; g.fillRect(-r*0.3,-r*0.3,r*0.25,r*0.3); g.restore();
      if(f.Y>0.05&&Math.random()<0.02) puff(x,y,r*1.5,0.3,'180,170,160'); }
    // 🌫️ bụi cuộn dọc dải đất vừa bị cày (tung lên liên tục, loang ra hai bên)
    for(let i=0;i<70;i++){ const d=1.2+hash(i+3500)*Math.max(0,bd-1.2); if(d>=bd) continue; const age=Math.min(2.2,(q-tq(d))*TL*0.9)+((t*0.5+hash(i+3501))%1)*0.4, s=F/d, X=(hash(i+3502)-0.5)*2*PCW;
      puff(sx(X,d),gy(d)-age*0.6*s,(0.35+age*0.5)*s,Math.max(0,0.45*(1-age/2.6))*(1-done*0.6),'190,180,165'); }
    // 🔵 quả cầu cày đi (nhỏ dần theo chiều sâu)
    if(q>=QS&&done<0.6){ const s=F/bd, R=1.6*s; genki(VPx,gy(bd)-R*0.8,R,t,1-done/0.6); if(Math.random()<0.8) for(let k=0;k<3;k++) parts.push({k:'rock',x:VPx+(Math.random()-0.5)*R*2,y:gy(bd),vx:(Math.random()-0.5)*10,vy:-4-Math.random()*6,l:40,L:40,c:'110,100,90',r:Math.max(1.5,R*0.08*Math.random())}); }
    if(done>0){ g.save(); g.globalCompositeOperation='lighter'; glow(VPx,VPy,VW*0.25*(1-done*0.5),0.6*(1-done),'255,240,220'); g.restore(); }   // loé sáng ở chân trời khi quả cầu biến mất
  }
  function scZ0(u,t){ const {sx:SX,cx:CX,gx:GX,lx:LX,y:Y}=ZG;
    const join=seg(u,1.6,3.6), gath=seg(u,3.0,6.0), run=eio(seg(u,6.0,6.5)), hop=seg(u,6.5,6.75), kick=u>=6.75, fly=seg(u,6.8,7.3),
      shield=eout(seg(u,6.9,7.25)), crack=seg(u,7.3,7.7), shat=seg(u,7.7,8.3), blow=seg(u,7.7,8.9), kb=eout(seg(u,7.7,8.4));
    chaosSouls(t,10,GX,Y-200,300,120);
    // 👿 Evil Larry (pháp sư) + Evil Gary
    // 👿 Evil Larry: bị thổi bay → NẰM sõng soài trên đất → bật dậy → niệm chú (vòng phù văn tím, cột sáng) → bị xoáy tím hút, biến mất
    const lie=eio(seg(u,8.5,9.1)), up=eout(seg(u,12.3,12.7)), cast=seg(u,12.8,14.2), van=seg(u,14.2,14.8), lx=LX+kb*260;
    runeCircle(lx,Y,eout(cast)*(1-seg(van,0.4,1)),t);
    if(van<1){ const c=prep(IMG.larryMage), asp=c?c.sw/c.sh:0.8, H=280, ld=lie*(1-up), cy=lerp(Y-H/2,Y-asp*H*0.42,ld)-(blow>0&&blow<1?Math.sin(Math.PI*blow)*80:0)-Math.sin(Math.PI*up)*60;
      cursedAura(lx,Y,260*(1+0.5*cast),'170,60,255',true,t,(1-van)*(1-0.7*ld));
      actor(IMG.larryMage,lx+(cast>0&&van<=0?Math.sin(t*40)*2:0),cy-van*40,H,{flip:flipTo('evillarry',false),center:true,a:1-van,sx:1-0.75*ein(van),sy:1+0.5*van,rot:lerp(-0.15*kb,-1.5,ld),filter:cast>0?`brightness(${1+0.3*cast})`:''});
      if(cast>0&&van<=0&&Math.random()<0.35) bolt(lx+55,Y-235,lx+(Math.random()-0.5)*500,Y-900-Math.random()*400,2.4,0.9,'200,120,255','255,230,255');   // tia tím từ quả cầu trên gậy phóng lên trời
      if(up>0&&up<0.4) dust(lx,Y,3,120); }
    if(van>0&&van<1){ g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round'; for(let i=0;i<10;i++){ const a0=i/10*Math.PI*2+t*9; g.strokeStyle=`rgba(190,110,255,${0.75*(1-van)})`; g.lineWidth=4; g.beginPath(); for(let j=0;j<=20;j++){ const f=j/20, r=lerp(320,10,f)*(1-van*0.6), a=a0+f*4; j?g.lineTo(lx+Math.cos(a)*r,Y-140+Math.sin(a)*r*0.6):g.moveTo(lx+Math.cos(a)*r,Y-140+Math.sin(a)*r*0.6); } g.stroke(); }   // xoáy tím hút Larry vào
      glow(lx,Y-140,lerp(60,420,Math.sin(Math.PI*van)),0.9*Math.sin(Math.PI*van),'200,130,255'); g.restore(); }
    { const sm=seg(u,14.5,15.6); if(sm>0&&sm<1) for(let i=0;i<8;i++) puff(lx+(hash(i+4010)-0.5)*260,Y-120-sm*260*hash(i+4011),80+sm*120,0.5*(1-sm),'40,10,60'); }   // khói tím tàn còn lại
    const gx=GX+kb*200, weak=seg(u,8.4,9.4);
    const gl=eio(seg(u,8.6,9.2)), GH=lerp(135,110,weak), gc=prep(IMG.egary), ga=gc?gc.sw/gc.sh:1;   // 😵 Evil Gary gục NẰM nghiêng trên đất, thở thoi thóp
    cursedAura(gx,Y,150,'255,30,30',true,t,1-0.75*weak); shadow(gx,Y,70,0.5);
    actor(IMG.egary,gx+(weak>0&&weak<1?Math.sin(t*30)*3:0),Y-GH/2+gl*GH*0.08,GH,{center:true,glow:'rgba(255,0,0,0.85)',gb:22,sy:1+0.02*gl*Math.sin(t*2.5),rot:-0.2*Math.sin(Math.PI*blow)*(1-gl)+Math.PI*0.94*gl,filter:weak>0?`brightness(${1-0.35*weak})`:''});
    // 🔵 cả dàn meme ùa tới phía sau, giơ tay lên trời truyền năng lượng
    const crew=zCrew(), PAL=['120,190,255','255,200,90','255,120,200','140,255,170','255,150,60','200,140,255'];
    const B0={x:CX-150,y:Y-760}, BR=lerp(6,330,eio(gath));   // quả cầu KHỔNG LỒ trên trời (kiểu Genki Dama đánh Ma Bư)
    crew.forEach((T,i)=>{ const row=i%3, col=Math.floor(i/3), tx=CX-90-col*70-row*24, ty=Y-row*28+20, k=eout(seg(join,i*0.035,i*0.035+0.45)), x=lerp(tx-700,tx,k), y=ty;
      const SL=zSlot(i,gx,Y), g0=seg(u,14.9+i*0.09,17.3+i*0.09), gk=eio(g0), qx=lerp(x,SL.x,gk), qy=lerp(y,SL.y,eout(g0)), walk=g0>0&&g0<1;   // lùi ra phía sau trước rồi mới vòng sang → không đi xuyên qua Gary   // từ từ tụ vào, lần lượt từng con
      const pw=k>=1&&gath>0&&u<6.8; if(pw){ g.save(); g.globalCompositeOperation='lighter'; glow(qx,qy-40,46,0.35+0.2*Math.sin(t*8+i),PAL[i%PAL.length]); g.restore(); }   // hào quang khi truyền năng lượng
      shadow(qx,qy,24,0.3); actor(T.im,qx,qy-(k<1||walk?Math.abs(Math.sin(t*(walk?7:13)+i))*(walk?6:10):(pw?6+Math.sin(t*6+i)*4:0)),T.wolf?100:78,{flip:T.wolf?qx<gx:flipTo(T.k,gk>0.5?qx<gx:true)});
      if(k>=1&&gath>0&&u<6.8){ const c=PAL[i%PAL.length]; g.save(); g.globalCompositeOperation='lighter'; glow(x,y-60,22,0.6,c);
        for(let p=0;p<5;p++){ const f=((t*0.9+p/5+hash(i)*0.7)%1), px=lerp(x,B0.x,f)+Math.sin(f*Math.PI)*(i%2?40:-40), py=lerp(y-60,B0.y,ein(f))-Math.sin(f*Math.PI)*120; glow(px,py,6+4*(1-f),0.9,c); } g.restore(); } });   // tia sáng li ti bay về quả cầu
    // ✨ tia sáng li ti từ khắp nơi (trời, mặt đất xa) tụ về quả cầu
    if(gath>0&&u<6.8) { g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<70;i++){ const f=((t*0.5+hash(i+2900))%1), an=hash(i+2901)*Math.PI*2, d0=900+hash(i+2902)*900, d=lerp(d0,BR,ein(f)); glow(B0.x+Math.cos(an)*d,B0.y+Math.sin(an)*d*0.7,4+3*f,0.9*Math.min(1,gath*2),i%3?'200,230,255':'255,240,200'); } g.restore(); }
    // 🔥⚡ Catler + Stalin
    const sw=eio(seg(u,16.4,19.3)), stx=lerp(SX-80*seg(u,0.3,1.6),gx-260,sw), ck=eio(seg(u,15.6,18.2)), ctx=lerp(CX,gx-430,ck), cty=lerp(Y,Y+55,ck);
    cursedAura(ctx,cty,120,'255,140,40',false,t,1-0.6*ck); cursedAura(stx,Y,150,'120,190,255',false,t,1);
    shadow(ctx,cty,40); actor(IMG.catlerAtk,ctx,cty-(ck>0&&ck<1?Math.abs(Math.sin(t*7))*5:0),118,{});
    shadow(stx,Y,50); actor(IMG.stalin,stx,Y-(sw>0&&sw<1?Math.abs(Math.sin(t*6))*6:0),150,{rot:sw>0?0:-0.08});
    { const hc=prep(IMG.hammer); if(hc){ const raise=0, hx=stx+45, hy=Y-120; g.save(); g.translate(hx,hy); g.rotate(lerp(-0.6,-1.0,raise)); g.drawImage(hc.src,hc.sx,hc.sy,hc.sw,hc.sh,-36,-36,72,72*hc.sh/hc.sw); g.restore();
      if(raise>0){ g.save(); g.globalCompositeOperation='lighter'; glow(hx,hy,140*raise,0.7,'150,210,255'); g.restore(); if(Math.random()<0.6) bolt(hx,hy,hx+(Math.random()-0.5)*200,hy-150-Math.random()*250,2,0.9,'150,210,255'); } } }
    // 🔵 quả cầu năng lượng: lơ lửng trên đầu cả dàn meme, lớn dần → bị đá bay về phía 2 kẻ ác → ép vào kết giới
    const SHX=gx-170, SHY=Y-190;
    let bx=B0.x, by=B0.y; if(u>=6.8){ const f=ein(fly); bx=lerp(B0.x,SHX-BR*0.7,f); by=lerp(B0.y,SHY,f); } if(u>=7.3){ bx=SHX-BR*0.7+Math.sin(t*50)*6*(1-shat); by=SHY; } if(u>=7.7){ bx=lerp(SHX-BR*0.7,1900,ein(seg(u,7.7,8.1))); }
    if(u<8.1) genki(bx,by,BR,t,1);
    if(fly>0&&fly<1) for(let k=1;k<6;k++) genki(lerp(B0.x,SHX-BR*0.7,Math.max(0,ein(fly)-k*0.06)),lerp(B0.y,SHY,Math.max(0,ein(fly)-k*0.06)),BR*(1-k*0.08),t,0.15);
    // 🔴 kết giới ngôi sao quỷ dựng trước mặt 2 kẻ ác
    demonShield(SHX,SHY,shield,crack,shat,t);
    if(u>=7.3&&u<7.37){ shake=40; sparks(SHX,SHY,60,'255,200,200',14); } if(u>=7.3&&u<7.7){ shake=Math.max(shake,10); if(Math.random()<0.8) sparks(SHX-40,SHY+(Math.random()-0.5)*300,4,Math.random()<0.5?'150,210,255':'255,60,80',12); }
    if(blow>0&&blow<1){ if(u<7.77) shake=50; impact(SHX,SHY,blow,700); g.save(); g.globalCompositeOperation='lighter'; glow(SHX,SHY,lerp(200,1200,eout(blow)),1-blow,'200,230,255'); g.restore(); dustWall(gx,Y,lerp(150,1300,eout(blow)),0.75*(1-blow)); }
    // 😎 Chill Guy chạy từ xa tới → bật vọt lên CAO HƠN quả cầu, lộn 1 vòng trên không → giáng cú ĐÁ TỪ TRÊN XUỐNG (chân chĩa chéo) vào mặt trên-trái quả cầu → bật ngược ra, đáp đất
    const CA=-2.35, PX=B0.x+Math.cos(CA)*BR, PY=B0.y+Math.sin(CA)*BR;   // điểm chạm trên-trái quả cầu → cầu lao chéo xuống về phía 2 kẻ ác
    if(u>=6.0&&u<7.6){ const CH=150, AX=PX-170, AY=PY-300, X0=B0.x-BR-300; let x,y,rot=0;   // (x,y) = TÂM người, xoay quanh tâm
      if(u<6.4){ x=lerp(-900,X0,eio(seg(u,6.0,6.4))); y=Y-CH/2-Math.abs(Math.sin(t*16))*12; }
      else if(u<6.62){ const f=seg(u,6.4,6.62); x=lerp(X0,AX,f); y=lerp(Y-CH/2,AY,eout(f)); rot=-Math.PI*2*eio(seg(u,6.45,6.62)); }   // bật vọt + lộn 1 vòng
      else if(u<6.75){ const f=ein(seg(u,6.62,6.75)); rot=-0.75; x=lerp(AX,PX-0.5*CH*Math.sin(-rot),f); y=lerp(AY,PY-0.5*CH*Math.cos(rot),f); }   // giáng xuống: chân chạm đúng điểm trên quả cầu
      else { const f=seg(u,6.75,7.6); rot=lerp(-0.75,0,eout(f)); x=PX-0.5*CH*Math.sin(0.75)-f*300; y=lerp(PY-0.5*CH*Math.cos(0.75),Y-CH/2,ein(f))-Math.sin(Math.PI*f)*140; }   // bật ngược ra, rơi về đất
      if(u>=6.4&&u<6.75) for(let k=1;k<5;k++) actor(IMG.chill,x-k*26,y+k*20,CH,{a:0.28-k*0.06,flip:true,rot,center:true});   // bóng mờ theo đà
      shadow(x,Y,40,0.3*(1-Math.min(1,(Y-CH/2-y)/600))); actor(IMG.chill,x,y,CH,{flip:true,rot,center:true});
      if(u>=6.75&&u<6.83){ shake=34; impact(PX,PY,seg(u,6.75,7.1),400); } }
    // 🎬 CẬN SLOW-MOTION cú đá: Chill Guy giáng xuống chậm rãi, chân chạm mặt quả cầu → loé trắng, sóng xung kích loang trên mặt cầu, tia năng lượng toé → quả cầu bắt đầu lao đi
    if(u>=6.68&&u<7.0) ins(()=>{ const q=seg(u,6.68,7.0), HQ=0.22, pre=Math.min(1,q/HQ), af=seg(q,HQ,1);
      const sk=g.createLinearGradient(0,0,0,VH); sk.addColorStop(0,'#05081c'); sk.addColorStop(1,'#1a1438'); g.fillStyle=sk; g.fillRect(0,0,VW,VH);
      for(let i=0;i<60;i++){ g.fillStyle=`rgba(255,255,255,${0.3+0.5*hash(i+3800)})`; g.fillRect(hash(i+3801)*VW,hash(i+3802)*VH*0.6,1.6,1.6); }
      const R=VH*0.8, bx=VW*0.82+eout(af)*VW*0.3, by=VH*1.12+eout(af)*VH*0.3; genki(bx,by,R,t,1);
      const cx=bx+Math.cos(CA)*R, cy=by+Math.sin(CA)*R, H=VH*0.6, rot=-0.75, dx=-Math.sin(-rot)*H*0.5, dy=-Math.cos(rot)*H*0.5;   // (dx,dy): từ chân lên tâm người
      const k=eout(pre), fx=lerp(cx-VW*0.22,cx,k)-(af>0?eout(seg(af,0.35,1))*VW*0.12:0), fy=lerp(cy-VH*0.32,cy,k)-(af>0?Math.sin(Math.PI*seg(af,0.35,1))*VH*0.08:0);
      g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round';
      if(af<=0) for(let i=0;i<26;i++){ const o=(hash(i+3810)-0.5)*H*0.9, L=VW*(0.15+0.25*hash(i+3811)), ox=fx+dx+o*0.73, oy=fy+dy-o*0.68; g.strokeStyle=`rgba(200,225,255,${0.35+0.3*hash(i+3812)})`; g.lineWidth=2+3*hash(i+3813); g.beginPath(); g.moveTo(ox-L*0.73,oy-L*0.68); g.lineTo(ox-L*0.2,oy-L*0.19); g.stroke(); }   // vệt tốc độ sau lưng
      if(af>0){ for(let r=0;r<4;r++){ const f=seg(af,r*0.12,0.55+r*0.12); if(f<=0||f>=1) continue; g.strokeStyle=`rgba(230,245,255,${0.9*(1-f)})`; g.lineWidth=8*(1-f)+2; g.beginPath(); g.ellipse(cx,cy,VW*0.6*eout(f),VW*0.6*eout(f)*0.35,CA+Math.PI/2,0,Math.PI*2); g.stroke(); }   // sóng xung kích loang trên mặt cầu
        for(let i=0;i<34;i++){ const an=CA+Math.PI+(hash(i+3820)-0.5)*2.6, f=eout(Math.min(1,af*1.6)), L=VW*(0.1+0.35*hash(i+3821))*f; g.strokeStyle=`rgba(${i%3?'190,230,255':'255,250,230'},${0.9*(1-af)})`; g.lineWidth=2+4*hash(i+3822); g.beginPath(); g.moveTo(cx+Math.cos(an)*L*0.3,cy+Math.sin(an)*L*0.3); g.lineTo(cx+Math.cos(an)*L,cy+Math.sin(an)*L); g.stroke(); }   // tia năng lượng toé ngược ra
        glow(cx,cy,VW*0.3*(1-af*0.6),0.9*(1-af),'235,245,255'); }
      g.restore();
      actor(IMG.chill,fx+dx,fy+dy,H,{flip:true,rot,center:true});
      if(af>0&&af<0.12){ g.fillStyle=`rgba(255,255,255,${0.85*(1-af/0.12)})`; g.fillRect(0,0,VW,VH); } });
    // 🎬 toàn cảnh: từ khắp mặt đất xa tít (thành phố, rừng, núi) vô số tia sáng bay vút lên trời về phía quả cầu (như cả thế giới góp sức cho Goku)
    if(u>=3.2&&u<4.3) ins(()=>{ const q=seg(u,3.2,4.3), HY=VH*0.62; const sk=g.createLinearGradient(0,0,0,HY); sk.addColorStop(0,'#0a0c22'); sk.addColorStop(1,'#4a2a3a'); g.fillStyle=sk; g.fillRect(0,0,VW,VH);
      for(let i=0;i<5;i++) peak(VW*(0.1+i*0.22),HY+VH*0.02,VW*0.4,VH*(0.12+hash(i+3600)*0.08),3600+i,['#2a1a2a','#34202e','#1c1018','#120a10'],0.9);
      g.fillStyle='#120a10'; g.fillRect(0,HY,VW,VH); for(let i=0;i<40;i++){ const x=hash(i+3610)*VW, w=VW*0.01+hash(i+3611)*VW*0.02, h=VH*(0.02+0.06*hash(i+3612)); g.fillStyle='#1c121a'; g.fillRect(x,HY-h,w,h); }
      genki(VW/2,VH*0.12,VH*lerp(0.1,0.14,q),t,1);
      g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<120;i++){ const f=((t*0.45+hash(i+3620))%1), x0=hash(i+3621)*VW, y0=HY+hash(i+3622)*VH*0.3, x=lerp(x0,VW/2,ein(f)), y=lerp(y0,VH*0.12,f);
        const f0=Math.max(0,f-0.12), px=lerp(x0,VW/2,ein(f0)), py=lerp(y0,VH*0.12,f0), lg=g.createLinearGradient(px,py,x,y); lg.addColorStop(0,'rgba(200,230,255,0)'); lg.addColorStop(1,`rgba(${i%3?'210,235,255':'255,240,200'},0.9)`); g.strokeStyle=lg; g.lineWidth=2.2; g.beginPath(); g.moveTo(px,py); g.lineTo(x,y); g.stroke(); glow(x,y,5,0.9,'220,240,255'); } g.restore(); });
    // 🎬 cận: tia sáng li ti từ khắp trời tụ thành quả cầu khổng lồ (góc ngước lên, dàn meme giơ tay ở dưới)
    if(u>=4.3&&u<5.6) ins(()=>{ const q=seg(u,4.3,5.6); const sk=g.createLinearGradient(0,0,0,VH); sk.addColorStop(0,'#0a1028'); sk.addColorStop(1,'#3a2a50'); g.fillStyle=sk; g.fillRect(0,0,VW,VH);
      g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<140;i++){ const f=((t*0.6+hash(i+2950))%1), an=hash(i+2951)*Math.PI*2, d=lerp(VW*1.1,VH*0.2,ein(f)); glow(VW/2+Math.cos(an)*d,VH*0.35+Math.sin(an)*d*0.8,3+3*f,0.95,i%3?'200,230,255':'255,240,200'); } g.restore();
      genki(VW/2,VH*0.33,VH*lerp(0.2,0.3,q),t,1);
      crew.slice(0,8).forEach((T,i)=>{ actor(T.im,VW*(0.06+i*0.125),VH*1.0,VH*0.2,{filter:'brightness(0.35)',flip:T.wolf?true:flipTo(T.k,true)}); }); });
    // 🎬 toàn cảnh từ trên cao: quả cầu cày nát thung lũng, khoét thủng vách núi
    if(u>=8.1&&u<11.0) ins(()=>cityPlough(seg(u,8.1,11.0),t));   // 🏙️ quả cầu san phẳng 1 đường thẳng xuyên thành phố tới tận chân trời
  }
  const zMap=u=>u<5.5?1.6+u*(4.4/5.5):u+0.5;   // u mới → u cũ của bản dựng gốc
  function scZ(u,t){ scZ0(zMap(u),t); }
  const camZ0=u=>keys(u,[[0,650,720,0.5,0],[1.5,620,720,0.55,0.02],[1.6,300,740,0.48,0],[3.6,300,700,0.46,0],[4.3,220,560,0.42,0],[6.0,300,640,0.4,0],[6.5,300,640,0.42,0.03],[6.8,420,620,0.5,0.05],[7.3,620,700,0.55,0.04],[7.7,700,700,0.5,0],[8.1,800,700,0.45,0],
    [11.0,1180,760,0.45,0],[12.0,1260,770,0.6,0],[12.3,1300,760,0.72,0],[12.8,1320,730,0.82,0.02],[14.2,1320,700,0.92,-0.02],[14.86,1320,710,0.94,0],[14.9,800,760,0.42,0],[17.0,850,760,0.45,0],[19.5,920,770,0.56,0]]);
  const camZ=u=>{ const o=zMap(u); return o<6?keys(o,[[1.6,380,560,0.42,0],[3.0,360,470,0.38,0],[4.3,330,360,0.34,0.02],[6.0,330,400,0.34,0]]):camZ0(o); };

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
    if(u>=3.72 && u<3.8) addGlow(230,y-40,160,1,'255,230,160'); 
    // 🎬 cận: Gary gốc (sáng trắng) bị kéo giãy ra khỏi cái bóng đỏ của Evil Gary — sợi hắc lực đỏ níu lại, căng ra rồi đứt
    if(u>=1.3&&u<2.75) ins(()=>{ const q=seg(u,1.3,2.75), sep=eio(q)*VW*0.16, j=Math.sin(t*40)*4*(1-q);
      bgFocus(t,'#2a0408','#050002',true,VW/2,VH*0.55);
      g.save(); g.globalCompositeOperation='lighter'; glow(VW/2-sep,VH*0.55,VH*0.4,0.6,'255,250,235'); glow(VW/2+sep,VH*0.55,VH*0.4,0.5,'255,30,30'); g.restore();
      for(let i=0;i<9;i++){ const yy=VH*(0.42+i*0.03), c=i%2?'255,40,40':'140,40,200'; const tension=q<0.85?1:1-seg(q,0.85,1); if(tension>0) bolt(VW/2-sep+20,yy+Math.sin(t*9+i)*10,VW/2+sep-20,yy-Math.sin(t*7+i)*10,2.4,0.8*tension,c); }   // sợi hắc lực níu
      actor(IMG.egary,VW/2+sep+j,VH*0.86,VH*0.42,{glow:'rgba(255,0,0,0.9)',gb:30,rot:0.15*q});
      actor(IMG.gary,VW/2-sep-j,VH*0.86,VH*0.4,{glow:'rgba(255,255,240,0.9)',gb:30,rot:-0.15*q});
      if(q>0.85){ const k=seg(q,0.85,1); g.fillStyle=`rgba(255,250,240,${0.8*(1-k)})`; g.fillRect(0,0,VW,VH); } });
  }
  const camL=u=>keys(u,[[0,600,780,1.5],[2.6,600,770,1.75],[2.75,520,760,1.05],[3.4,470,760,1.0],[4,450,760,1.0],[5,540,750,0.95]]);

  // ═════════ M — Stalin vung búa kết liễu → bàn tay bóng tối hất văng · bóng tối + vô số bàn tay · 2 kẻ ác bị lôi đi ═════════
  // (cả cảnh dời +220,+20 cho khớp vị trí cuối cảnh Z: Evil Gary nằm ở x=1100, Stalin đứng ở 740)
  function scM(u,t){ g.save(); g.translate(220,20); scM0(u,t); g.restore(); }
  function scM0(u,t){ const gx=880, lx=1040, sx0=620;
    const step=seg(u,0,1.3), raise=eout(seg(u,0.9,1.6)), swing=ein(seg(u,1.6,2.25)), slap=seg(u,2.15,2.4), fly=eout(seg(u,2.4,3.2));
    const dark=eio(seg(u,2.6,3.8))*(1-eio(seg(u,6.0,7.0))), back=eio(seg(u,3.2,4.2)), grab=eio(seg(u,4.2,4.8)), drag=eio(seg(u,4.9,6.0));
    const FR=lerp(2200,420,eio(seg(u,2.4,4.6)))*(dark>0?1:0)+(dark>0?0:9999), fogA=dark;   // mép trước của sương đen (trôi từ phải sang trái)
    if(fogA>0){ g.save(); const sk=g.createLinearGradient(FR-500,0,FR+400,0); sk.addColorStop(0,'rgba(2,0,5,0)'); sk.addColorStop(1,`rgba(2,0,5,${0.7*fogA})`); g.fillStyle=sk; g.fillRect(FR-500,-1500,4000,3500); g.restore();   // trời tối dần theo sương
      for(let L=0;L<3;L++) for(let i=0;i<34;i++){ const yy=lerp(-500,1150,(i+0.5)/34)+Math.sin(t*0.7+i*1.3+L)*40, wav=Math.sin(yy*0.006+t*0.9+L*2)*160+Math.sin(yy*0.017-t*1.3)*60, x=FR+wav+L*260+(hash(i+L*40)-0.3)*220, r=220+hash(i+L*41)*180+L*60;
        puff(x,yy,r,(0.55-L*0.1)*fogA,L===0?'18,6,28':'5,1,10'); }   // sương đen cuộn lan tới (nhiều lớp, mép gợn sóng)
      for(let i=0;i<26;i++){ const f=((t*0.12+hash(i+1960))%1), x=FR-120+f*-600, y=900+Math.sin(i*2.1)*150; if(x>FR-700) puff(x,y,120+hash(i+1961)*120,0.5*fogA*(1-f),'10,3,16'); }   // sương bò sát mặt đất đi trước
      if(fogA>0.3){ g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<6;i++){ const y=-300+i*260+Math.sin(t+i)*50; glow(FR+80+Math.sin(t*1.3+i)*60,y,180,0.08*fogA,'120,40,200'); } g.restore(); } }
    // 2 kẻ ác dồn vào góc → bị lôi đi
    { const gc=prep(IMG.egary), ga=gc?gc.sw/gc.sh:1, GH=lerp(110,45,drag); shadow(gx,860,70,0.4*(1-drag)); actor(IMG.egary,gx+drag*280,860-GH/2+GH*0.08-drag*50,GH,{center:true,a:1-drag,glow:'rgba(255,0,0,0.85)',gb:18,rot:Math.PI*0.94+Math.sin(t*16)*0.07*grab,filter:'brightness(0.65)'}); }   // vẫn NẰM gục như cuối cảnh Z
    if(grab>0){ const ga=grab*(1-seg(u,5.8,6.2)); shadowHand('grip',1700,250,gx+drag*280-150,800-drag*50,0.95*(1-drag*0.3),ga,1); shadowHand('grip',1750,1150,gx+drag*280-110,900-drag*50,0.85*(1-drag*0.3),ga,-1); }   // 2 bàn tay túm Evil Gary lôi vào sương
    // các meme lùi lại
    const GXW=gx+220, YW=880;   // vòng cung meme quây Gary (cùng chỗ đứng cuối cảnh Z) → giật lùi ra khi bóng tối ập tới
    zCrew().forEach((T,i)=>{ const SL=zSlot(i,GXW,YW), x=GXW+(SL.x-GXW)*(1+0.3*back)-220, y=YW+(SL.y-YW)*(1+0.3*back)-20; shadow(x,y,24,0.3); actor(T.im,x,y,T.wolf?100:78,{flip:T.wolf?x<gx:flipTo(T.k,x<gx),rot:Math.sin(t*9+i)*0.03*back}); });
    { const x=GXW-430-220-back*120, y=YW+55-20; shadow(x,y,40); actor(IMG.catlerAtk,x,y,118,{}); }
    // Stalin bước tới, giơ búa sét → vung → bị hất văng
    const sx=fly>0?lerp(sx0+90,-380,fly):lerp(sx0,sx0+90,eio(step)), sy=870-Math.sin(Math.PI*fly)*260;
    shadow(sx,870,50,0.5*(1-fly)); actor(IMG.stalin,sx,sy,150,{rot:fly*-3.4});
    if(fly<=0){ const hx=sx+40+swing*70, hy=lerp(740,560,raise)+swing*190; const hc=prep(IMG.hammer); if(hc){ g.save(); g.translate(hx,hy); g.rotate(lerp(-0.3,-0.95,raise)+swing*1.6); g.drawImage(hc.src,hc.sx,hc.sy,hc.sw,hc.sh,-38,-38,76,76*hc.sh/hc.sw); g.restore(); }
      if(raise>0.4){ addGlow(hx,hy,110,0.65,'150,210,255'); if(Math.random()<0.6) bolt(hx,hy,hx+(Math.random()-0.5)*180,hy-130-Math.random()*220,2,0.9,'150,210,255'); if(Math.random()<0.25) bolt(hx+(Math.random()-0.5)*300,-700,hx,hy,3.4,0.9,'150,210,255'); } }
    if(slap>0) shadowHand('slap',sx0+700,1350,lerp(sx0+560,sx0+60,eout(slap)),lerp(1060,770,eout(slap)),1.15,1-seg(u,2.8,3.4),1);
    if(u>=2.38 && u<2.46){ shake=26; } impact(sx0+110,740,seg(u,2.4,2.8),260);
    // vô số bàn tay thò ra từ TRONG sương đen (gốc nằm sâu trong sương, vươn ra phía trước mép sương)
    if(fogA>0) for(let i=0;i<7;i++){ const yy=-150+i*190+(hash(i+1970)-0.5)*60, bx=FR+260+hash(i+1971)*260, by=yy+(hash(i+1972)-0.5)*120, k=eio(seg(u,3.0+i*0.12,3.9+i*0.12))*fogA, reach=FR-60-hash(i+1973)*240;
      shadowHand(i%3?'crawlA':(i%2?'lunge':'crawlB'),bx,by,lerp(FR+120,reach,k),yy+Math.sin(t*1.5+i)*30,0.95+hash(i+3)*0.3,k,(i%2?1:-1)); }
  }
  const camM=u=>keys(u,[[0,910,760,0.82],[1.5,940,740,0.95],[2.2,920,740,1.05],[2.4,780,720,0.7],[3.2,720,680,0.5],[6,920,680,0.48],[7,820,720,0.55]]);

  // ═════════ N — Doge + các meme đỡ Stalin dậy, nắng xuyên trời đêm ═════════
  function scN(u,t){ const D2=[], up=eio(seg(u,0.7,2.4)), sun=eio(seg(u,0.6,3.5)), sx=300, sy=870;
    if(sun>0){ g.save(); g.globalCompositeOperation='lighter'; const gr=g.createLinearGradient(0,-900,0,950); gr.addColorStop(0,`rgba(255,215,150,${0.42*sun})`); gr.addColorStop(1,`rgba(255,195,120,${0.1*sun})`); g.fillStyle=gr; g.fillRect(-1500,-1500,3500,3000);
      g.translate(-150,-700); for(let i=0;i<6;i++){ const a=0.9+i*0.11+Math.sin(t*0.4+i)*0.01; const rg=g.createLinearGradient(0,0,Math.cos(a)*2600,Math.sin(a)*2600); rg.addColorStop(0,`rgba(255,240,200,${0.16*sun})`); rg.addColorStop(1,'rgba(255,220,150,0)'); g.fillStyle=rg; g.beginPath(); g.moveTo(0,0); g.lineTo(Math.cos(a-0.035)*2600,Math.sin(a-0.035)*2600); g.lineTo(Math.cos(a+0.035)*2600,Math.sin(a+0.035)*2600); g.closePath(); g.fill(); } g.restore(); }
    army.forEach((T,i)=>{ if(T.k==='doge'||T.k==='stalincat') return; const row=i%4, side=i%2?-1:1, n=Math.floor(i/2), x=sx+side*(170+(n%10)*62+row*14), y=790+row*34, run=eout(seg(u,0.15+(n%10)*0.04,1.1+(n%10)*0.04)), xx=lerp(x+side*500,x,run), cheer=u>2.4?Math.abs(Math.sin(t*6+i))*10:0, h=T.wolf?100:72-row*3;
      D2.push({y,f:()=>{ shadow(xx,y,22,0.3); actor(T.im,xx,y-(run<1?Math.abs(Math.sin(t*12+i))*6:cheer),h,{flip:T.wolf?side<0:flipTo(T.k,side<0)}); }}); });
    D2.sort((a,b)=>a.y-b.y); for(const d of D2) d.f();
    shadow(sx,sy,60); actor(IMG.stalin,sx,sy,150,{rot:lerp(-1.45,0,up)});
    const hc=prep(IMG.hammer); if(hc){ g.save(); g.translate(sx+64,sy-lerp(8,70,up)); g.rotate(lerp(-1.55,0.05,up)); g.drawImage(hc.src,hc.sx,hc.sy,hc.sw,hc.sh,-32,-32,64,64*hc.sh/hc.sw); g.restore(); }
    const dx=lerp(620,sx+105,eout(seg(u,0,0.7))); shadow(dx,sy,40); actor(IMG.doge,dx,sy-(u<0.7?Math.abs(Math.sin(u*14))*6:0),118,{flip:false,rot:-0.12*Math.sin(Math.PI*seg(u,0.7,2.4))}); }
  const camN=u=>keys(u,[[0,320,770,1.2],[2.4,320,740,0.9],[3.5,320,640,0.55]]);
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
    const c=document.createElement('canvas'); c.width=1000; c.height=120; const x=c.getContext('2d'); x.font=font; x.textAlign='center'; x.textBaseline='middle'; x.fillStyle='#fff'; x.fillText(str,500,60);
    const d=x.getImageData(0,0,1000,120).data, cols=[]; for(let xx=0;xx<1000;xx++){ let yb=-1; for(let yy=119;yy>=0;yy--) if(d[(yy*1000+xx)*4+3]>128){ yb=yy; break; } if(yb>=0) cols.push([xx-500,yb-60]); }
    const pts=[]; for(let i=0;i<n;i++){ const q=cols[Math.floor((i+0.2+hash(seed+i)*0.6)/n*cols.length)]; if(q) pts.push(q); }
    return _dripCache[key]=pts; }
  const flow=(t,T)=>t<=0?0:1-Math.exp(-t/T);   // chảy nhanh lúc đầu, chậm dần
  // ═════════ O — màn đen kết ═════════
  // ☁️ easter egg: mây đỏ viền trắng của AKATSUKI lặng lẽ hiện lên, trôi chậm trong nền đen phía sau chữ + mắt Friend
  let _akaC=null;   // ☁️ vẽ sẵn 1 đám mây Akatsuki ĐẬM (đỏ, viền trắng, xoáy trắng) ra canvas riêng → làm mờ cả khối 1 lần (không bị lớp trắng lẫn lớp đỏ thành hồng đục)
  function akatsukiCloud(x,y,s,a){ if(a<=0.01) return; const B=[[-1.05,0.1,0.42],[-0.55,-0.22,0.5],[0.05,-0.32,0.56],[0.62,-0.12,0.48],[1.05,0.12,0.4],[0.45,0.26,0.42],[-0.35,0.26,0.44]], S=100, CW=S*3.4, CH=S*1.9, ox=CW/2, oy=CH*0.47;
    if(!_akaC){ _akaC=document.createElement('canvas'); _akaC.width=CW; _akaC.height=CH; const c=_akaC.getContext('2d');
      for(const [lw,col] of [[S*0.16,'#f4f4f4'],[0,'#c0101c']]){ c.fillStyle=col; c.beginPath(); for(const [bx,by,r] of B){ c.moveTo(ox+bx*S+(r*S+lw),oy+by*S); c.arc(ox+bx*S,oy+by*S,r*S+lw,0,Math.PI*2); } c.fill(); }
      const sh=c.createLinearGradient(0,oy-S*0.8,0,oy+S*0.7); sh.addColorStop(0,'rgba(255,80,80,0.25)'); sh.addColorStop(1,'rgba(60,0,0,0.3)'); c.save(); c.globalCompositeOperation='source-atop'; c.fillStyle=sh; c.fillRect(0,0,CW,CH); c.restore();   // khối đỏ có sáng tối nhẹ
      c.strokeStyle='#ffffff'; c.lineWidth=S*0.06; c.lineCap='round'; for(const [bx,by,r] of B.slice(1,4)){ c.beginPath(); c.arc(ox+bx*S,oy+by*S+r*S*0.25,r*S*0.55,Math.PI*1.1,Math.PI*1.75); c.stroke(); } }
    const k=s/S; g.save(); g.globalAlpha*=a; g.drawImage(_akaC,x-ox*k,y-oy*k,CW*k,CH*k); g.restore(); }
  function akatsukiBg(w,u){ const CL=[[0.12,0.2,46],[0.86,0.16,40],[0.08,0.8,52],[0.9,0.82,44],[0.32,0.9,30],[0.7,0.07,28]];
    CL.forEach(([cx,cy,sz],i)=>{ const a=0.42*seg(w,0.6+i*0.25,2.2+i*0.25); akatsukiCloud(VW*cx+Math.sin(u*0.3+i)*12,VH*cy+Math.cos(u*0.25+i)*6,sz*(VH/540),a); }); }
  // 🗿 NỀN EASTER EGG (lộ ra sau tia chớp): ảnh 2 bàn tay tượng bị còng + 10 mèo Akatsuki đứng trên đầu ngón tay (ảnh user cung cấp), phủ kín khung, mờ mờ
  function gedoBg(a){ if(a<=0.01) return; const c=prep(IMG.akaBg); if(!c) return; const W=VW, H=W*c.sh/c.sw, y=0;   // chỉ cắt bớt phần nền đá phía dưới, giữ trọn mèo trên đầu ngón tay
    g.save(); g.globalAlpha=a; g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,0,y,W,H); g.restore();
    // 🐈‍⬛ dải trên (10 con mèo Akatsuki trên đầu ngón tay) vẽ lại ĐẬM + sáng hơn, mờ dần xuống phần bàn tay → mèo nổi rõ, nền vẫn mờ
    if(!_akaBand||_akaBand.w!==c.sw){ const bc=document.createElement('canvas'); bc.width=c.sw; bc.height=c.sh; const x=bc.getContext('2d'); x.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,0,0,c.sw,c.sh);
      { const bh=Math.round(c.sh*0.48), d=x.getImageData(0,0,c.sw,bh), q=d.data, ss=(e0,e1,v)=>{ const k=Math.max(0,Math.min(1,(v-e0)/(e1-e0))); return k*k*(3-2*k); };   // kéo sáng phần XÁM TỐI (thân mèo) — nền trời đen giữ nguyên
        for(let i=0;i<q.length;i+=4){ const L=Math.max(q[i],q[i+1],q[i+2]), f=1+2.6*ss(6,26,L)*(1-ss(70,110,L)); if(f>1.01){ q[i]=Math.min(255,q[i]*f); q[i+1]=Math.min(255,q[i+1]*f); q[i+2]=Math.min(255,q[i+2]*f); } } x.putImageData(d,0,0); }
      x.globalCompositeOperation='destination-in'; const m=x.createLinearGradient(0,0,0,c.sh); m.addColorStop(0,'rgba(0,0,0,1)'); m.addColorStop(0.36,'rgba(0,0,0,1)'); m.addColorStop(0.47,'rgba(0,0,0,0)'); m.addColorStop(1,'rgba(0,0,0,0)'); x.fillStyle=m; x.fillRect(0,0,c.sw,c.sh); _akaBand={w:c.sw,c:bc}; }
    g.save(); g.globalAlpha=Math.min(1,a*1.8); g.drawImage(_akaBand.c,0,y,W,H); g.restore(); }
  let _akaBand=null;
  function endCard(u){ g.fillStyle=`rgba(0,0,0,${seg(u,0,0.7)})`; g.fillRect(0,0,VW,VH); const v=u-0.8; if(v<=0) return;
    text('THAT IS THE END OF THE LORE',VW/2,VH*0.52,28,'#ffffff',null,'700 28px Georgia,serif',seg(v,0,0.7));
    const fw=v-3.7, fl=fw<0?0:fw<0.08?1:fw<0.18?0.25:fw<0.26?0.85:Math.max(0,0.85*(1-(fw-0.26)/0.55));   // ⚡ chớp 2 nhịp sau khi chữ đỏ hiện
    if(v>3.0){ const w=v-3.0, k=seg(w,0,0.5), F='900 30px Georgia,serif', TX='BUT ONLY IN THIS UNIVERSE…';
      if(fw>0) gedoBg(0.38+0.55*fl);
      { const ca=1-seg(fw,0,0.6); if(ca>0){ g.save(); g.globalAlpha=ca; akatsukiBg(w,u); g.restore(); } }   // ảnh nền đã có mây Akatsuki → mây vẽ tay tan đi sau tia chớp
      g.save(); g.font=F; g.textAlign='center'; g.textBaseline='middle'; g.globalAlpha=k;
      const tg=g.createLinearGradient(0,VH*0.6-20,0,VH*0.6+20); tg.addColorStop(0,'#c21818'); tg.addColorStop(0.6,'#9a0a0a'); tg.addColorStop(1,'#5e0000'); g.fillStyle=tg; g.fillText(TX,VW/2,VH*0.6);
      g.fillStyle='rgba(255,170,170,0.18)'; g.fillText(TX,VW/2-0.8,VH*0.6-1.2); g.restore();   // ánh ướt trên mặt chữ
      for(const [i,q] of textDripPts(TX,F,14,7).entries()){ const t0=0.15+hash(i+5)*0.7, L=flow(w-t0,0.9+hash(i)*0.8)*(16+hash(i+9)*110), ww=2.4+hash(i+2)*3.2;
        bloodDrip(VW/2+q[0], VH*0.6+q[1]-3, L, ww, k);
        const dt=w-t0-1.2-hash(i+11)*1.5; if(dt>0 && hash(i+13)<0.5){ const yy=VH*0.6+q[1]+L+dt*dt*260; if(yy<VH) bloodDrip(VW/2+q[0], yy-ww*2.2, ww*1.6, ww*0.7, k); } } }   // giọt rời ra rơi xuống
    if(v>4.4){ const w=v-4.4, open=eio(seg(w,0.3,1.4)), c=prep(IMG.grin); if(c){ const W=200, H=W*c.sh/c.sw, x=VW/2-W/2, y=VH*0.47-H-34, em=H*0.22;   // chỉ mắt + miệng, không hiện khuôn mặt
        g.save(); g.imageSmoothingEnabled=false; g.globalAlpha=seg(w,0,0.6); g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,x,y,W,H);
        g.fillStyle='#000'; g.fillRect(x-4,y-4,W+8,em*(1-open)+4); g.fillRect(x-4,y+em+em*1.05*open,W+8,em*1.05*(1-open)+1);   // mí mắt mở dần từ giữa ra
        g.restore(); } }  if(fl>0){ g.fillStyle=`rgba(232,236,255,${0.8*fl})`; g.fillRect(0,0,VW,VH); } }

  const SCN=[[scA,camA],[scC,camC],[scD,camD],[scG,camG],[scH,camH],[scP,camP],[scQ,camQ],[scJ1,camJ1],[scJ2,camJ2],[scJ3,camJ3],[scJ4,camJ4],[scJ5,camJ5],[scK,camK],[scL,camL],[scZ,camZ],[scM,camM],[scN,camN]];
  function keys(u,K){ for(let i=0;i<K.length-1;i++){ const a=K[i], b=K[i+1]; if(u>=a[0] && u<b[0]){ const k=(b[0]-a[0]<0.05)?1:eio((u-a[0])/(b[0]-a[0])); return [lerp(a[1],b[1],k),lerp(a[2],b[2],k),lerp(a[3],b[3],k),lerp(a[4]||0,b[4]||0,k)]; } } const L=K[K.length-1]; return [L[1],L[2],L[3],L[4]||0]; }   // [t, x, y, zoom, nghiêng]
  // 🔊 tiếng (thời điểm tuyệt đối)
  const SFX=[[19.9,'wg_axe_whoosh',0.5],[21.2,'hit_mid',0.7],[21.35,'bonk',0.7],[21.5,'hit_light',0.8],[21.67,'bonk',0.6],[21.83,'hit_light',0.8],[21.95,'larry_horn',0.6,1.5],[22.35,'ultimate_charge_2',0.6],[22.92,'clap_tele',1],[23.35,'death_break',0.9],[23.72,'clap_tele',1],[24.5,'cine_impact',1],[24.7,'hit_heavy',0.8],[24.88,'hit_heavy',0.8],[25.65,'wg_axe_whoosh',0.7],[26.2,'wg_axe_whoosh',0.6],[26.9,'larry_hit',0.7],[26.95,'clap_tele',1],[27.48,'clap_tele',1],[27.8,'punch2',1],[27.98,'clap_tele',1],[28.28,'bonk',1],[28.52,'hit_heavy',0.9],[29.12,'clap_tele',1],[29.4,'cine_impact_jr1',1],[29.77,'wg_axe_whoosh',0.6],[12.6,'sc_terror',0.4,2],[14.1,'wg_axe_whoosh',0.6],[15.1,'wg_axe_whoosh',0.7],[15.9,'gp_souls',0.7,1.5],[16.3,'burn_loop',0.6,1],[17.1,'hit_heavy',0.9],[17.6,'hit_mid',1],[18.1,'stalin_hammer_hit',1],[18.5,'burn_loop',0.5,0.8],[19.3,'cine_impact',1],[31,'eg_necro',0.8],[31.6,'ultimate_charge_2',0.8],[32.8,'creeper_explosion',1],[80.45,'bibilabu_sound',0.8],[132.6,'gp_souls',0.7,2.5],[133.95,'uia_tele_dbz',0.9],[120.3,'wg_axe_whoosh',0.6],[122.05,'ultimate_charge_2',0.9],[122.05,'hl_choir',0.6,3],[123.68,'ultimate_charge_2',0.7],[125.8,'wg_axe_whoosh',0.7],[126.3,'wg_axe_whoosh',0.8],[126.55,'chillguy_kick',1.0],[126.8,'larry_horn',0.6,2],[127.1,'cine_impact',1.0],[127.5,'creeper_explosion',1.0],[127.9,'thunder_big',0.5,3],[129.9,'creeper_explosion',1.0],[95.2,'cine_drop',1.7],[96.5,'cine_drop',1.8],[83.6,'cine_impact_jr1',0.8],[141.68,'cine_impact',0.9],[5.2,'cine_impact',0.8],[42.75,'cine_impact_jr1',1.0],[61.25,'cine_impact',0.9],[62.8,'cine_impact',0.9],[65.65,'cine_impact',0.9],[76.2,'cine_impact_jr1',1.0],[84.05,'cine_impact',1.0],[94.8,'cine_impact',1.0],[96.9,'cine_impact_jr1',1.0],[109.7,'cine_impact_jr1',1.0],
    [34.6,'uia_tele_dbz',0.9],[34.75,'uiacat_spin',0.6],[35.1,'spidercat_hit',0.6],[35.45,'ninja_slash',0.7],[35.8,'spidercat_hit',0.6],[36.2,'ninja_slash',0.6],[36.8,'uia_tele_dbz',0.6],[37.4,'death_break',1.0],[37.6,'death_break',0.7],[39.8,'cdg_grow',0.6],[45.1,'lightsaber_on',0.5],[45.4,'lightsaber_on',0.45],[0.2,'demon_roar1',0.85,3.5],[1,'thunder_big',0.35,3],[2.5,'wg_axe_whoosh',0.6],[2.8,'wg_axe_whoosh',0.6],[3.1,'wg_axe_whoosh',0.6],[3.4,'fd_roar',0.6,2],[3.5,'gigachad_roar',0.5,1.5],[6.26,'infdoge_bonk',1.0],[7.06,'bonk',1.0],[7.86,'sm_slash',0.9],[8.3,'uiacat_spin',0.7,0.8],[8.66,'hit_mid',0.8],[9.1,'guitar_s1',0.6,0.8],[9.46,'hit_heavy',0.8],[10.5,'hit_mid',0.5],[11.2,'hit_heavy',0.5],
    
    
    
    [40.7,'cdg_grow',0.9],[43,'wg_dragon_impact',0.8],
    [45.9,'lightsaber_on',0.45],[48.8,'sm_schwing',1.0],[49.7,'sm_fin',1.0],[49.9,'death_break',0.8],
    [52.4,'demon_roar2',0.85,3.5],[53.1,'larry_horn',0.6,2],[53.3,'gp_souls',0.7,3],[54.4,'punch1',0.5],[55,'fd_roar',0.5,2],[55.6,'punch1',0.5],[56.4,'hit_mid',0.5],
    [57.8,'vine_boom',0.7],[59.3,'ultimate_charge_2',0.9],[59.7,'gigachad_roar',1.0,2],[59.75,'hit_heavy',1.0],
    [60.8,'wg_axe_whoosh',0.6],[62.25,'demon_roar3',0.85,3.5],[62.52,'gigachad_roar',0.8,1.5],[64,'wg_axe_whoosh',0.8],[64.25,'hit_heavy',1.0],[66.2,'demon_roar1',0.85,3.5],
    [67.9,'sc_wing',0.9],[68.4,'sc_wing',0.9],[68.8,'demon_roar2',0.85,3.5],[69,'sc_wing',0.7],[70.4,'gp_souls',0.7,3],[70.8,'ultimate_charge_2',0.9],[72.4,'holy_thunder',0.4],[72.8,'vine_boom',0.8],[73.2,'br_boom',0.9],[73.25,'demon_roar3',0.85,3.5],
    [73.9,'thunder_big',0.5,4],[75.4,'gigachad_roar',1.0,2],[77.6,'demon_roar1',0.85,3.5],
    [80.9,'lightsaber_on',0.45],[81.2,'wg_axe_whoosh',0.8],[81.8,'ultimate_charge_2',0.6],[82.3,'zoro_blade',1.0],
    [88.1,'ultimate_charge_2',0.6],[89.4,'uia_tele_dbz',1.0],[90.6,'cdg_grow',0.6],[90.22,'clap_cat',1.0],[91.3,'clap_tele',1.0],[91.7,'burn_loop',0.7,2.4],[93.9,'cdg_grow',0.9],
    [95.3,'demon_roar2',0.85,3.5],[95.85,'wg_axe_whoosh',0.7],[97.4,'mewing_statue_break',0.8],
    [100.9,'demon_roar3',0.85,3.5],[101.8,'wg_dragon_impact',0.7],[102,'hl_choir',0.5,3],[102.6,'piano_giorno',0.6,1.6],[103.3,'guitar_jojo',0.6,1.6],[104,'tribe_1',0.7,1.6],[104.7,'mosquito_violin',0.6,1.6],[105.6,'hl_laser',0.8],[107.2,'hl_choir',1.0,4],[108.4,'holy_thunder',0.7],[109.3,'wg_axe_whoosh',0.8],[110.4,'demon_roar1',0.85,3.5],[113.4,'holy_thunder',0.8],
    [115.6,'sc_terror',0.6],[116.3,'ultimate_charge_2',0.8],[118,'vine_boom',1.0],[118.8,'uia_tele_dbz',1.0],
    [140.2,'holy_thunder',0.6],[140.9,'stalin_hammer_return',0.7],[141.45,'hm_claw1',1.0],[141.9,'hm_stalker',0.9],[142.4,'hm_crawl',0.8],[143.5,'hm_claw2',0.9],[143.7,'sc_terror',0.7],[144.3,'gp_souls',0.5],
    [154.3,'fr_thunder',0.8],[155.9,'fr_bite',0.7],];
  // 🎵 nhạc nền (Audio riêng, bám thời gian thật của phim)
  let MUS=[];
  // 🎵 nhạc nền theo từng phần phim (không lặp 1 đoạn ngắn nữa) · vol đã cân theo độ to (LUFS) của từng bài · off = bắt đầu từ giây thứ mấy của bài
  const MUS_DEF=[ {src:'assets/audio/cine_pufino.mp3',a:0,b:52.3,vol:0.5,fi:1.0,fo:1.5},                 // Pufino – Adventures Begin: đại chiến mở màn → Stalin/Catler → Spider/UIA → Chonky → King Cheems
      {src:'assets/audio/cine_horns.mp3',a:52.3,b:60.8,vol:0.7,fi:0.8,fo:1.0},                            // kèn u ám: quỷ giật dây · Giga quyết định
      {src:'assets/audio/cine_aylex.mp3',a:60.8,b:115.3,vol:0.44,fi:0.6,fo:2.0},                          // Aylex – Cinematic: trận khổng lồ Giga vs quỷ → bom vĩ thú → Chonky thiên thạch → phong ấn
      {src:'assets/audio/cine_heart_fast.mp3',a:115.3,b:120.3,vol:0.7,loop:true,fo:0.3},                  // tim đập: Evil Gary bị xé đôi
      {src:'assets/audio/cine_pufino.mp3',a:120.3,b:139.3,vol:0.5,off:75,fi:0.6,fo:1.0},                  // Pufino (đoạn cao trào): đọ chưởng cuối, cả dàn meme hợp sức
      {src:'assets/audio/cine_horns.mp3',a:146.3,b:150.5,vol:0.45,fi:1.2,fo:1.0}, {src:'assets/audio/dp_akatsuki.mp3',a:153.6,b:1e9,vol:0.7,fi:0.2} ];
  function musSetup(){ musStop(); MUS=MUS_DEF.map(d=>Object.assign({el:Object.assign(new Audio(d.src),{preload:'auto'})},d,{b:Math.min(d.b,DUR)}));
    for(const m of MUS) m.el.loop=!!m.loop; }
  function musTick(rR,tR){ for(const m of MUS){ const on=!paused && tR>=m.a && tR<m.b;
      if(!on){ if(!m.el.paused) m.el.pause(); continue; }
      const pos=rR-c2r(m.a)+(m.off||0), d=m.el.duration||1e9;
      if(!m.loop && pos>=d){ if(!m.el.paused) m.el.pause(); continue; }
      if(m.el.paused){ try{ m.el.currentTime=m.loop?pos%d:pos; }catch(e){} m.el.play().catch(()=>{}); }
      else if(!m.loop && Math.abs(m.el.currentTime-pos)>0.35){ try{ m.el.currentTime=pos; }catch(e){} }
      let v=m.vol; if(m.fi) v*=seg(tR,m.a,m.a+m.fi); if(m.fo) v*=1-seg(tR,m.b-m.fo,m.b);
      if(tR>=SC[SI.H]+2.0 && tR<SC[SI.H]+3.8) v*=lerp(1,0.15,seg(tR,SC[SI.H]+2.0,SC[SI.H]+3.2));   // King bị vây: nhạc lặng dần trước nhát cắt
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
    if(si<SCN.length){ const [scf,camf]=SCN[si]; let [cx,cy,cz,roll]=camf(u); roll=roll||0; cz*=1+Math.abs(roll)*2; if(WIDE) cz*=0.82; if(WIDE && SCN[si][0]!==scJ5 && SCN[si][0]!==scK && SCN[si][0]!==scC){ const room=Math.min(1650-cx,cx+1450); if(room>250) cz=Math.max(cz,(VW/2+4)/(room*1.2)); }   // 16:9: góc quá rộng so với nền → zoom vào vừa đủ để giữ đúng tâm cảnh
      if(SCN[si][0]!==scJ5&&SCN[si][0]!==scK&&SCN[si][0]!==scC){ const hw=VW/2/cz+4, sl=WIDE?hw*0.17:0, lo=-1450+hw-sl, hi=1650-hw+sl; cx=lo<=hi?clamp(cx,lo,hi):clamp(cx,hi,lo); }   // không lia quá mép nền vẽ sẵn (16:9 góc quá rộng: canh giữa nền)
      shake*=0.86; const ox=(Math.random()-0.5)*shake, oy=(Math.random()-0.5)*shake;
      g.setTransform(1,0,0,1,0,0); if(roll){ g.translate(SC_*VW/2,SC_*VH/2); g.rotate(roll); g.translate(-SC_*VW/2,-SC_*VH/2); }   // 🎥 góc máy nghiêng (dutch angle)
      g.transform(SC_*cz,0,0,SC_*cz,SC_*(VW/2-cx*cz+ox),SC_*(VH/2-cy*cz+oy));
      const red=si===SI.N?1-seg(u,0.6,3.5):1;
      insOn=false; g.fillStyle='#0d0709'; g.fillRect(-9000,-9000,18000,18000);   // 16:9: phần vượt ra ngoài nền vẽ sẵn → tối, không đen kịt
      const ruin=(si===SI.Z&&u>=10.5)||si===SI.M||si===SI.N;   // sau cú cày: đứng trong thành phố đổ nát
      COVERC=ruin?'118,104,88':(si>=SI.J1&&si<SI.K)?'24,14,20':'42,20,18';   // màu gò bụi che chân ảnh bán thân theo mặt đất cảnh
      if(ruin) ruinBG(t,si===SI.N?'#4a5a8a':'#2c4f96',si===SI.N?'#f2c08a':'#b4c6dc'); else if(window._cineBG) window._cineBG.draw(g,t,red);
      partBG(si,u,t,ruin);
      if(red>0.5 && si<SI.M && (Math.sin(t*17)>0.94 || Math.random()<0.01)){ g.fillStyle=`rgba(255,40,40,${0.1*red})`; g.fillRect(-1500,-1500,3500,GROUND+1500); bolt(cx-300+Math.random()*600,-800,cx-200+Math.random()*400,GROUND-160,4,0.8,'255,40,40','255,210,210'); }
      scf(u,t);
      for(let i=parts.length-1;i>=0;i--){ const p=parts[i]; if(!paused){ p.x+=p.vx*spd; p.y+=p.vy*spd; p.vx*=1-0.04*spd; p.vy=p.vy*(1-0.04*spd)+(p.k==='spark'||p.k==='rock'?0.25:-0.02)*spd; p.l-=spd; } if(p.l<=0){ parts.splice(i,1); continue; }
        if(p.k==='dust'){ g.fillStyle=`rgba(${p.c},${0.35*p.l/p.L})`; g.beginPath(); g.arc(p.x,p.y,p.r*(1.6-p.l/p.L),0,Math.PI*2); g.fill(); }
        else if(p.k==='rock'){ g.fillStyle=`rgb(${p.c})`; g.fillRect(p.x,p.y,p.r,p.r); }
        else { g.fillStyle=`rgba(${p.c},${p.l/p.L})`; g.fillRect(p.x,p.y,2.6,2.6); } }
      if(parts.length>700) parts.splice(0,parts.length-700);
      if(window._cineBG&&!insOn&&!ruin) window._cineBG.drawFront(g,t,red); }
    // ═════ lớp phủ màn hình ═════
    g.setTransform(SC_,0,0,SC_,0,0);
    if(si===SI.END){ if(WIDE){ g.fillStyle=`rgba(0,0,0,${seg(u,0,0.7)})`; g.fillRect(0,0,VW,VH); ins(()=>endCard(u)); } else endCard(u); }
    if(t<0.8){ g.fillStyle=`rgba(0,0,0,${1-t/0.8})`; g.fillRect(0,0,VW,VH); }
    for(const b of [SC[2],SC[SI.P],SC[SI.L]]){ const d=Math.abs(t-b); if(d<0.1){ g.fillStyle=`rgba(0,0,0,${1-d/0.1})`; g.fillRect(0,0,VW,VH); } }   // chuyển phần: chớp đen rất nhanh
    if(si===SI.H && u>=3.8 && u<3.84){ g.fillStyle=`rgba(255,255,255,${0.8*(1-seg(u,3.8,3.84))})`;   // slow-mo kéo dài chớp → rút ngắn lại
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
    const RK=(opts&&opts.scale)||1;   // scale 2 = vẽ thẳng 4K khi xuất video
    cv=document.createElement('canvas'); cv.width=(WIDE?1920:1080)*RK; cv.height=(WIDE?1080:1920)*RK; SC_=cv.width/VW;
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
  window._cineWarCheck=()=>{ let prev=-1, bad=[]; for(let R=0;R<=DURR;R+=0.02){ const c=r2c(R); if(c<prev-1e-6) bad.push([+R.toFixed(2),+c.toFixed(2),+prev.toFixed(2)]); prev=c; } let bad2=[]; for(let c=0;c<=DUR;c+=0.05){ const e=Math.abs(r2c(c2r(c))-c); if(e>0.01) bad2.push([+c.toFixed(2),+e.toFixed(3)]); } return {DUR,DURR:+DURR.toFixed(2),backwards:bad.length,firstBad:bad.slice(0,3),roundtrip:bad2.length}; };
  window._cineWarInfo=()=>({dur:DURR, sfx:SFX.map(([ts,k,v,d])=>[c2r(ts),k,v==null?1:v,d||0]), mus:MUS_DEF.map(m=>({...m,ra:c2r(m.a),rb:c2r(Math.min(m.b,DUR))})), slow:SLOW.map(([a,b,f])=>[c2r(a),c2r(b)])});
  window._cineWarStop=stop;
  window._cineWarPause=t=>{ paused=true; pauseT=c2r(t); parts=[]; };   // t = thời gian phim
  window._cineWarCanvas=()=>cv;
})();
