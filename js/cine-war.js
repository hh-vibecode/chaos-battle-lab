// ===================== 🎬 CINEMATIC "MEMES ASSEMBLE — PART II: THE WAR OF EVIL GARY" =====================
// Kịch bản user viết (10 cảnh). Chạy trên lớp phủ riêng (canvas 1080×1920, khung dọc Shorts) giống phần 1, dùng chung nền
// js/cine-bg.js (trời bão đỏ / thành phố đổ nát). Mở từ Meme Cinema (playCineWar trong game.js tải file này khi cần).
//   1 THE WAR BEGINS: Evil Gary đứng dậy "You really think you can win?" → 2 phe lao vào nhau
//   2 GIANTS CLASH: Evil Larry khổng lồ vẽ ngôi sao quỷ · Gigachad to dần húc · Chonky Dog phình rồi đổ sập
//   3 FRONTLINE: Spider Cat vệt sét đen · Chill Guy "Still chill." → "I'M NOT CHILL ANYMORE!" song phi · Ricardo disco · Doge → Buff Doge · Cheems bonk
//   4 CHAOS: Guitar · Piano · Bongo · Mosquito · Maxwell · UIA (cắt nhanh)
//   5 King Cheems bị vây + 2 Doge Knight · Joninn Cheems một nhát lướt, tra kiếm → cả bầy đổ gục
//   6 ENEMY LOSING: Stalin mở Domain ☭, Catler cào lửa · "No... this can't be happening!" · quỷ khổng lồ trồi lên → Gigachad húc ngã
//   7 MUSICAL SEAL: 4 meme âm nhạc + Holy Angel Cat "JUDGMENT" → quỷ bị kéo xuống cổng địa ngục
//   8 SEPARATION: Evil Gary bị xé làm đôi → Gary gốc văng ra, UIA xoay cuốn đi mất
//   9 SHADOW HANDS: Stalin "This ends now." → bàn tay bóng tối hất văng, kéo Evil Gary + Evil Larry vào bóng đêm
//  10 THAT IS THE END OF THE LORE … BUT NOT MY… (mắt Friend mở + miệng cười đầy máu)
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
  let cv, g, SC, raf=null, t0=0, parts=[], played={}, overlay, shake=0, paused=false, pauseT=0, markOnly=false, panel=null, crowd=[];
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
    const b0=last-26; x.drawImage(d,0,b0,FW,14,0,b0+6,FW,FH+DEM_EXT-b0-6); x.drawImage(d,0,0,FW,b0+12,0,0,FW,b0+12);
    x.globalCompositeOperation='destination-in'; const gr=x.createLinearGradient(0,0,0,FH+DEM_EXT);
    gr.addColorStop(0,'rgba(0,0,0,1)'); gr.addColorStop((b0-30)/(FH+DEM_EXT),'rgba(0,0,0,1)'); gr.addColorStop((b0+DEM_EXT*0.45)/(FH+DEM_EXT),'rgba(0,0,0,0.55)'); gr.addColorStop(1,'rgba(0,0,0,0)');
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

  // ═════════════════ BỐ CỤC + THỜI GIAN ═════════════════
  const S=[0,9,17,31,38.5,46,55,64,71,81,97];   // mốc bắt đầu từng cảnh (s)
  const DUR=S[10];
  const EG={x:760,y:890}, LARRY={x:1080};
  const TEAM=[['stalincat',160,800,150],['feuerkatze',60,812,108],['doge',-60,770,110],['cheems',260,760,104],['gigachad',-190,800,150],['chonkydog',340,820,120],['chillguy',-300,760,112],
    ['spidercat',420,760,96],['ricardo',-110,860,128],['kingcheems',190,880,124],['samuraicheems',-240,870,112],['uiacat',480,850,104]];
  function setup(){ parts=[]; played={};
    const pool=RO().filter(r=>r && r.charKey && !NAMED.has(r.charKey) && r.avatarUrl).map(r=>r.avatarUrl).sort(()=>Math.random()-0.5).slice(0,22);
    crowd=pool.map((u,i)=>({im:A(u), x:-360+(i%11)*70+Math.random()*30, y:640+Math.floor(i/11)*50+Math.random()*20, h:48+Math.random()*14, ph:Math.random()*6}));
    team=TEAM.map(([k,x,y,h])=>({k,im:av(k),x,y,h})); }
  let team=[];
  const ARMY=[...Array(30)].map((_,i)=>({x:700+(i%10)*72+hash(i)*40, y:630+Math.floor(i/10)*70+hash(i+4)*30, h:96+hash(i+8)*40, ph:hash(i+2)*6}));

  // ═════════ CẢNH 1 — THE WAR BEGINS ═════════
  function sc1(u,t){
    const stand=eout(seg(u,3.0,4.0)), raise=eout(seg(u,4.9,5.3)), charge=seg(u,5.4,9), clash=seg(u,6.6,9);
    skySouls(t,26,-500,1500,-520,260,u<4.5?[EG.x,EG.y-150]:null);
    const D=[];
    for(const c of crowd){ const x=c.x+lerp(0,260,eio(charge)); D.push({y:c.y,f:()=>{ const b=charge>0?Math.abs(Math.sin((t+c.ph)*9))*4:0; shadow(x,c.y,c.h*0.3,0.3); actor(c.im,x,c.y-b,c.h,{rot:charge>0?0.12:0}); }}); }
    for(const m of team){ const x=m.x+lerp(0,300,eio(charge)); D.push({y:m.y,f:()=>{ const b=charge>0?Math.abs(Math.sin(t*9+m.x))*6:Math.abs(Math.sin(t*2+m.x))*1.5; shadow(x,m.y,m.h*0.3,0.4); actor(m.im,x,m.y-b,m.h,{rot:charge>0?0.13:0}); }}); }
    for(const m of ARMY){ const x=m.x-lerp(0,330,eio(charge)); D.push({y:m.y,f:()=>{ const b=charge>0?Math.abs(Math.sin(t*8+m.ph))*5:0; monster(x,m.y-b,m.h,true,1,charge>0?-0.12:Math.sin(t*1.5+m.ph)*0.04); }}); }
    D.push({y:EG.y,f:()=>{ const gx=EG.x+lerp(0,-40,eio(charge)); addGlow(gx,EG.y-50,170,0.3+0.15*Math.sin(t*6),'255,30,30'); shadow(gx,EG.y,60);
      actor(IMG.egary,gx,EG.y,lerp(95,135,stand),{sy:lerp(0.82,1,stand),rot:raise*-0.08,glow:'rgba(255,0,0,0.8)',gb:22});
      headStar(gx,EG.y-lerp(150,200,stand),46,clamp(u/4.6,0,1),t);
      if(raise>0){ bolt(gx+30,EG.y-170,gx+80,-700,4,raise*(0.6+0.4*Math.random()),'255,40,40','255,210,210'); } }});
    D.sort((a,b)=>a.y-b.y); for(const d of D) d.f();
    if(clash>0){ const cx=lerp(560,520,clash); for(let i=0;i<3;i++) if(Math.random()<0.6) sparks(cx+(Math.random()-0.5)*260,700+Math.random()*180,6,Math.random()<0.5?'255,200,120':'255,80,60',5);
      if(Math.random()<0.3) dust(cx+(Math.random()-0.5)*300,760+Math.random()*120,3,60); }
    if(u>=5.0 && u<5.3) shake=10;
  }
  function cam1(u){ return keys(u,[[0,380,640,0.5],[2.8,400,660,0.56],[3.0,EG.x,EG.y-110,1.35],[4.9,EG.x,EG.y-130,1.2],[5.35,EG.x,EG.y-130,1.2],[5.35,520,720,0.8],[9,440,640,0.5]]); }

  // ═════════ CẢNH 2 — GIANTS CLASH ═════════
  function sc2(u,t){
    const walk=seg(u,0,9), larryX=LARRY.x-lerp(0,120,seg(u,4.2,5.0))+lerp(0,160,eio(seg(u,6.4,8)))+(u<4.2?Math.sin(u*2)*20:0);
    pentagram(LARRY.x-40,700,clamp(u/7,0,1),t,330,80);
    const grow=eio(seg(u,1.4,3.6)), gH=lerp(150,440,grow), big=gH>260;
    const balloon=eio(seg(u,1.6,3.6)), topple=ein(seg(u,5.0,5.9)), cH=lerp(120,400,balloon);
    const chargeG=seg(u,4.2,5.0), gX=lerp(420,LARRY.x-330,eout(chargeG))+lerp(0,160,eio(seg(u,6.4,8)));
    // Evil Larry khổng lồ vừa đi vừa vẽ sao
    const stag=seg(u,5.0,5.6), lrot=Math.sin(Math.PI*stag)*0.12+lerp(0,0.06,seg(u,6.4,8));
    shadow(larryX,770,210,0.5); actor(IMG.larry,larryX,790+Math.abs(Math.sin(u*2.4))*8,640,{glow:'rgba(170,0,255,0.7)',gb:30,rot:lrot,flip:true});
    // quái vật nhỏ quanh chân
    for(let i=0;i<10;i++){ const m=ARMY[i], squash=seg(u,5.9,6.2)*(i<5?1:0); const x=lerp(80,330,hash(i+40))+(i%2)*30, y=760+hash(i+44)*120; if(i<5) monster(x,y,lerp(90,25,squash),true,1,0,0); }
    // Chonky Dog phình rồi đổ
    { const x=170, y=880; shadow(x+topple*cH*0.5,y,cH*0.4,0.5); actor(IMG.chonky,x,y,cH,{rot:topple*1.45+Math.sin(u*5)*0.05*balloon*(1-topple),sx:1+0.04*Math.sin(u*6)}); }
    // Gigachad
    { const y=860; shadow(gX,y,gH*0.25,0.5); if(chargeG>0 && chargeG<1){ for(let k=1;k<5;k++) actor(big?IMG.gigaBig:IMG.giga,gX-k*45,y,gH,{a:0.35-k*0.07,rot:0.25}); }
      actor(big?IMG.gigaBig:IMG.giga,gX,y-(grow<1?Math.abs(Math.sin(u*14))*4:0),gH,{rot:chargeG>0&&chargeG<1?0.25:0}); }
    // đòn đánh trúng Gigachad lúc đang to dần
    if(u>1.4 && u<3.6 && Math.random()<0.18) sparks(gX+(Math.random()-0.5)*60,860-gH*(0.3+Math.random()*0.5),8,'255,230,170',4);
    // sóng xung kích của Larry
    { const k=seg(u,3.6,4.3); if(k>0&&k<1){ ring(larryX-120,820,lerp(40,520,eout(k)),1-k,'255,80,255',6); if(k<0.1) shake=8; } }
    // BOOM: Gigachad húc trúng Larry
    if(u>=5.0 && u<5.08){ shake=16; sparks(LARRY.x-250,620,40,'255,240,200',8); dust(LARRY.x-250,800,20,200); }
    if(u>=5.9 && u<5.98){ shake=18; dust(330,880,40,320); }
    if(u>6.4) for(let i=0;i<2;i++) if(Math.random()<0.5) parts.push({k:'rock',x:gX+180+Math.random()*80,y:780+Math.random()*80,vx:(Math.random()-0.2)*6,vy:-3-Math.random()*5,l:50,L:50,c:'70,50,45',r:3+Math.random()*5});
  }
  function cam2(u){ return keys(u,[[0,700,760,0.62],[1.4,700,760,0.6],[1.4,330,720,0.85],[3.6,330,680,0.75],[3.6,LARRY.x-150,640,0.55],[5.0,LARRY.x-200,640,0.6],[5.0,300,770,0.75],[6.3,320,760,0.7],[6.3,LARRY.x-150,600,0.45],[8,LARRY.x-100,560,0.42]]); }

  // ═════════ CẢNH 3 — THE FRONTLINE ═════════
  function sc3(u,t){
    if(u<2.5){ // 🕷️ Spider Cat lướt xuyên bầy quái vật với vệt sét đen viền tím
      const k=seg(u,0,2.5), x=lerp(-200,900,eio(k)), y=780;
      for(let i=0;i<8;i++){ const mx=-50+i*120, hit=x>mx-20, fly=hit?seg(u,(mx+200)/1100*2.5,(mx+200)/1100*2.5+0.6):0;
        monster(mx+fly*200,y+((i%2)*60)-Math.sin(Math.PI*fly)*180,100,true,1-fly*0.3,fly*5); }
      if(k>0.15){ g.save(); g.lineCap='round'; for(let L=0;L<5;L++){ const off=(L-2)*18, P=[]; for(let s=0;s<14;s++) P.push([x-s*34, y-60+off+(Math.random()-0.5)*12]);
        for(const [lw,c,cmp] of [[11,'rgba(150,60,255,0.18)','lighter'],[5,'rgba(220,170,255,0.9)','lighter'],[2,'rgba(5,0,10,1)','source-over']]){ g.globalCompositeOperation=cmp; g.strokeStyle=c; g.lineWidth=lw*(1-L*0.08); g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); } } g.restore(); }
      actor(IMG.spider,x,y,110,{rot:0.2});
      return; }
    if(u<6.5){ // 😎 Chill Guy
      const v=u-2.5, x=260, y=820, hits=[0.3,0.9,1.5,2.1,3.1], dm=[140,410,630,880,1000]; let n=0; for(const h of hits) if(v>=h) n++;
      const kick=seg(v,3.55,3.85), fly=seg(v,3.85,4.0);
      for(let i=0;i<4;i++){ const mx=x+(i%2?140:-150), my=y+(i<2?-30:40), lunge=hits.some(h=>v>=h && v<h+0.2 && (hits.indexOf(h)%4)===i)?0.5:0;
        const knocked=i===1?seg(v,3.85,4.6):0; monster(mx-(i%2?lunge*40:-lunge*40)+knocked*300,my-Math.sin(Math.PI*knocked)*200,110,i%2===1,1-knocked*0.5,knocked*6); }
      shadow(x,y,40); if(kick>0) actor(IMG.chillKick,x+kick*90,y-kick*60,150,{rot:0}); else actor(IMG.chill,x,y-Math.abs(Math.sin(v*2))*1.5,130);
      if(n){ const awake=v>=3.1; text(String(dm[n-1]),x,y-170,awake?40:30,awake?'#ff3d3d':'#fff','#000'); }
      hits.forEach(h=>{ if(v>=h && v<h+0.06){ sparks(x,y-70,10,'255,220,160',4); shake=4; } });
      if(fly>0 && fly<0.2){ shake=14; addGlow(x+150,y-80,160,0.9,'255,240,200'); }
      sub(t,'“Still chill.”',S[2]+2.5+2.25,S[2]+2.5+3.05,'CHILL GUY','#9be7ff');
      bigWord(t,'I\'M NOT CHILL ANYMORE!',S[2]+2.5+3.1,S[2]+2.5+3.9,'#ff2a2a',34,VH*0.3);
      bigWord(t,'BOOM!',S[2]+2.5+3.85,S[2]+2.5+4.0+0.5,'#ffd54f',72,VH*0.4);
      return; }
    if(u<10){ // 🕺 Ricardo — spotlight + disco + đá văng linh hồn khổng lồ
      const v=u-6.5, x=250, y=830, fr=IMG.rcFr[Math.floor(v*6)%4], disco=seg(v,0.8,1.2);
      g.save(); g.globalCompositeOperation='lighter'; const sg=g.createLinearGradient(x,300,x,y); sg.addColorStop(0,'rgba(255,250,220,0)'); sg.addColorStop(1,'rgba(255,250,220,0.35)');
      g.fillStyle=sg; g.beginPath(); g.moveTo(x-30,300); g.lineTo(x+30,300); g.lineTo(x+120,y+10); g.lineTo(x-120,y+10); g.closePath(); g.fill();
      if(disco>0) for(let i=0;i<10;i++){ const a=t*2+i*0.63; g.fillStyle=`hsla(${(i*36+t*200)%360},100%,60%,${0.25*disco})`; g.beginPath(); g.moveTo(x,360); g.lineTo(x+Math.cos(a)*700,360+Math.abs(Math.sin(a))*700+200); g.lineTo(x+Math.cos(a+0.08)*700,360+Math.abs(Math.sin(a+0.08))*700+200); g.closePath(); g.fill(); } g.restore();
      if(disco>0){ g.save(); g.fillStyle='#ccc'; g.beginPath(); g.arc(x,340,26,0,Math.PI*2); g.fill(); for(let i=0;i<20;i++){ g.fillStyle=`hsl(${(i*40+t*300)%360},80%,70%)`; g.fillRect(x-24+(i%5)*10,320+Math.floor(i/5)*10,6,6); } g.restore(); }
      for(let i=0;i<3;i++){ const mx=x+(i-1)*170, atk=Math.sin(v*5+i)*0.5+0.5; monster(mx+(i===1?0:0),y+(i===1?60:-20),105,i>0,1,0); }
      const dodge=Math.sin(v*9)*22; shadow(x,y,45); actor(fr.naturalWidth?fr:IMG.ricardo,x+dodge,y,150);
      const big=seg(v,1.4,2.4), kicked=seg(v,2.4,3.3); if(big>0){ const sx=lerp(x+140,x+60,big)+kicked*500, sy=lerp(200,y-60,eout(big))-kicked*500; monster(sx,sy,lerp(120,220,big),true,1-kicked*0.6,kicked*8); }
      if(v>=2.4 && v<2.46){ shake=12; addGlow(x+60,y-100,140,0.9,'255,240,200'); sparks(x+60,y-100,30); }
      return; }
    // 🐕 Doge → Buff Doge + 🔨 Cheems
    { const v=u-10, x=200, y=830, buff=v>=1.6, smash=seg(v,2.2,2.5)>0 && v<3.0;
      for(let i=0;i<4;i++){ const mx=x+170+(i%2)*90, my=y-40+i*30, k=buff?seg(v,2.2+i*0.12,2.8+i*0.12):0; monster(mx+k*260,my-Math.sin(Math.PI*k)*150,105,true,1-k*0.4,k*6); }
      if(v<1.6){ for(let i=0;i<3;i++){ const k=(v*1.5+i*0.33)%1; text(['much wow','such meme','very doge'][i],x+60+k*200,y-120-i*20,16,['#ff5','#5ff','#f5f'][i],'#000','700 16px "Comic Sans MS",cursive',1-k); } }
      sub(t,'“Much wow!”',S[2]+10.05,S[2]+10.9,'DOGE','#ffd54f');
      if(v>=1.1 && v<1.6 && Math.random()<0.3){ sparks(x,y-70,8); shake=3; }
      if(v>=1.6 && v<1.75){ addGlow(x,y-90,220,1-seg(v,1.6,1.75),'255,240,200'); shake=8; }
      shadow(x,y,50); actor(buff?(smash?IMG.dogeHit:IMG.dogeBuff):IMG.doge,x,y,buff?190:115,{flip:buff});
      if(smash && v<2.3){ shake=10; dust(x+120,y,8,80); }
      // Cheems bonk với chày to dần
      const cx=x-150, cy=y+40, bon=Math.floor(Math.max(0,v-0.5)/0.45), mal=1+Math.min(8,bon)*0.12, sw=Math.sin(Math.max(0,v-0.5)/0.45*Math.PI*2);
      shadow(cx,cy,35); actor(IMG.cheems,cx,cy,105);
      const mc=prep(IMG.mallet); if(mc){ const h=90*mal; g.save(); g.translate(cx+30,cy-60); g.rotate(-0.9+sw*0.9); g.drawImage(mc.src,mc.sx,mc.sy,mc.sw,mc.sh,-h*mc.sw/mc.sh/2,-h,h*mc.sw/mc.sh,h); g.restore(); }
      monster(cx-110,cy-10,95,false,1,Math.max(0,sw)*0.3);
    }
  }
  function cam3(u){ if(u<2.5) return [lerp(-60,760,eio(seg(u,0,2.5))),700,1.0]; if(u<6.5) return keys(u-2.5,[[0,260,720,1.25],[3.0,260,700,1.5],[3.5,280,690,1.35],[4,320,700,1.1]]);
    if(u<10) return [250,690,lerp(1.15,1.0,seg(u,6.5,10))]; return [200,700,lerp(1.2,1.05,seg(u,10,14))]; }

  // ═════════ CẢNH 4 — CHAOS EVERYWHERE (cắt nhanh) ═════════
  function sc4(u,t){ const cut=Math.floor(u/1.2), v=u-cut*1.2, x=240, y=830;
    const mobs=(n,hitT)=>{ for(let i=0;i<n;i++){ const k=seg(v,hitT+i*0.08,hitT+0.5+i*0.08); monster(x+160+i*70+k*200,y-30+i*30-Math.sin(Math.PI*k)*120,100,true,1-k*0.4,k*5); } };
    if(cut===0){ shadow(x,y,40); actor(IMG.guitar,x,y,140); for(let i=0;i<4;i++){ const k=(v*1.6+i*0.25)%1; ring(x+40+k*380,y-70,30+k*40,1-k,`${[255,80,80][0]},${120+i*30},${200-i*30}`,5,1.4); } mobs(3,0.3); }
    else if(cut===1){ shadow(x,y,40); actor(IMG.piano,x,y,140); for(let i=0;i<8;i++){ const k=(v*1.3+i*0.125)%1, nx=x+40+k*420, ny=y-90-Math.sin(k*Math.PI*2+i)*50; text('♪',nx,ny,26,`hsl(${i*45},90%,65%)`,'#000'); } mobs(3,0.4); }
    else if(cut===2){ shadow(x+80,y,50); actor(IMG.bongo,x+80,y,130); for(let i=0;i<3;i++){ const k=(v*2+i/3)%1; ring(x+80,y-30,40+k*300,0.9*(1-k),'255,210,120',6); } for(let i=0;i<4;i++){ const a=i/4*Math.PI*2, k=seg(v,0.2,0.8); monster(x+80+Math.cos(a)*(150+k*200),y+Math.sin(a)*60-Math.sin(Math.PI*k)*80,95,Math.cos(a)>0,1-k*0.4,k*4); } }
    else if(cut===3){ const mx=x+260, my=y; monster(mx,my,130,true,1,Math.sin(t*30)*0.05*(v>0.3?1:0)); actor(IMG.mosq,x-20,y-120+Math.sin(t*3)*8,110);
      g.save(); g.strokeStyle='rgba(230,230,255,0.8)'; g.lineWidth=1.5; g.beginPath(); g.moveTo(x,y-150); g.quadraticCurveTo((x+mx)/2,y-60,mx,my-70); g.stroke(); g.restore();
      for(let i=0;i<3;i++){ const k=(v*1.8+i/3)%1, px=lerp(x,mx,k), py=lerp(y-150,my-70,k)+Math.sin(k*Math.PI)*50; addGlow(px,py,20,1,'255,60,90'); if(k>0.92) addGlow(mx,my-70,60,0.8,'255,80,100'); } }
    else if(cut===4){ const mx=x+60, my=y; monster(mx,my,150,true,1,0); actor(IMG.maxwell,mx,my-140,70);
      const k=seg(v,0,0.5); g.save(); g.translate(mx,my-230); for(let i=0;i<6;i++){ g.globalAlpha=0.9; g.fillStyle=['#5cf','#a52','#f80','#c43','#7c4','#999'][i]; const a=i/6*Math.PI*2+v*12*(1-k); g.fillRect(Math.cos(a)*30-6,Math.sin(a)*30-6,12,12); } g.restore();
      if(v>0.5){ const sc=prep(IMG.dsword); if(sc){ g.save(); g.translate(mx+30,my-170); g.rotate(-1+seg(v,0.7,0.9)*2.2); g.drawImage(sc.src,sc.sx,sc.sy,sc.sw,sc.sh,-12,-70,24,70); g.restore(); } if(v>0.85 && v<0.92){ sparks(mx+40,my-120,20,'120,240,255',6); shake=8; } } }
    else { const k=seg(v,0,1.5), ux=lerp(-80,620,k), im=IMG.uiaSpin, c=im.naturalWidth/8, fr=1+Math.floor(t*46)%59;
      for(let i=0;i<5;i++){ const mx=60+i*110, hit=ux>mx-30, f=hit?seg(u-5*1.2,(mx+80)/700*1.5,(mx+80)/700*1.5+0.5):0; monster(mx+f*150,y-20+(i%2)*40-Math.sin(Math.PI*f)*220,100,true,1-f*0.3,f*6); }
      addGlow(ux,y-60,110,0.6,'255,170,40'); if(im.naturalWidth){ const s=130/123; g.drawImage(im,(fr%8)*c,Math.floor(fr/8)*c,c,c,ux-62*s,y-95*s-20,128*s,128*s); } }
  }
  function cam4(u){ return [300,690,lerp(1.25,1.12,(u%1.2)/1.2)]; }

  // ═════════ CẢNH 5 — KING CHEEMS & JONINN CHEEMS ═════════
  const KX=-60, KY=820, JX=620, JY=820;
  function sc5(u,t){
    const ring5=eio(seg(u,0.5,2.2)), knights=seg(u,1.4,1.9), beam=seg(u,4.5,4.8), dash=seg(u,4.8,5.15), sheath=u>=5.7, fall=seg(u,6.2,6.9);
    // vòng vây kỵ sĩ quái vật quanh King
    for(let i=0;i<8;i++){ const a=i/8*Math.PI*2, R=lerp(330,180,ring5), mx=KX+Math.cos(a)*R, my=KY+Math.sin(a)*60, gone=(beam>0 && Math.abs(Math.sin(a))<0.5 && Math.cos(a)>0)?beam:0;
      monster(mx+gone*80,my,120,Math.cos(a)>0,1-gone,0); }
    shadow(KX,KY,45); actor(IMG.king,KX,KY,130);
    if(u<1.4 && Math.sin(t*9)>0.2){ g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle='rgba(255,220,80,0.9)'; g.lineWidth=4; g.beginPath(); g.moveTo(KX+20,KY-120); g.lineTo(KX+260,KY-60); g.stroke(); g.restore(); }
    if(knights>0) for(const s of [-1,1]){ const kx=KX+s*95, ky=KY+20; addGlow(kx,ky-60,90,0.45*knights,'80,255,150'); shadow(kx,ky,35); actor(IMG.knight,kx,ky,110*knights,{flip:s<0}); }
    if(beam>0 && beam<1 || (u>=4.8 && u<5.3)){ const a=u<4.8?beam:1-seg(u,4.8,5.3); g.save(); g.globalCompositeOperation='lighter'; for(const [lw,c] of [[40,'255,200,60,0.25'],[18,'255,220,120,0.7'],[6,'255,255,230,1']]){ g.strokeStyle=`rgba(${c.split(',').slice(0,3).join(',')},${a*parseFloat(c.split(',')[3])})`; g.lineWidth=lw; g.beginPath(); g.moveTo(KX+20,KY-120); g.lineTo(KX+1400,KY-130); g.stroke(); } g.restore(); }
    // Joninn quay lưng, tay đặt lên chuôi kiếm → lướt
    const jx=lerp(JX,JX-560,eout(dash));
    for(let i=0;i<6;i++){ const mx=JX-120-i*80, my=JY-40+(i%3)*40; const ff=fall*(1-i*0.05); monster(mx,my,110,false,1,0,u>=6.2?ff:0); if(u>=6.2 && u<6.25) sparks(mx,my-60,10,'140,220,255',4); }
    if(dash>0 && dash<1){ g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle='rgba(120,210,255,0.8)'; g.lineWidth=14; g.lineCap='round'; g.beginPath(); g.moveTo(JX,JY-60); g.lineTo(jx,JY-60); g.stroke(); g.strokeStyle='rgba(240,250,255,1)'; g.lineWidth=4; g.stroke(); g.restore(); }
    if(u>=5.15 && u<6.3){ const k=seg(u,5.15,6.3); g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle=`rgba(140,220,255,${0.7*(1-k)})`; g.lineWidth=6; g.beginPath(); g.moveTo(JX,JY-60); for(let s=0;s<=20;s++){ const xx=lerp(JX,JX-560,s/20); g.lineTo(xx,JY-60+Math.sin(s*1.3+t*8)*14); } g.stroke(); g.restore(); }
    shadow(jx,JY,40); actor(sheath||u<4.8?IMG.joninn:IMG.joninnR,jx,JY,125,{flip:u<4.8});
  }
  function cam5(u){ return keys(u,[[0,KX+60,720,0.95],[2.2,KX+60,720,1.05],[2.2,KX+5,KY-90,2.3],[3.0,KX+5,KY-90,2.4],[3.0,JX,JY-60,1.8],[4.4,JX,JY-60,2.0],[4.4,280,720,0.75],[5.2,280,720,0.75],[5.2,JX-560,JY-70,2.4],[5.9,JX-560,JY-70,2.5],[5.9,JX-300,720,1.0],[7.5,JX-300,700,0.8]]); }

  // ═════════ CẢNH 6 — THE ENEMY IS LOSING ═════════
  function sc6(u,t){
    const dom=seg(u,2.6,3.0), gx=EG.x-lerp(0,60,seg(u,3.5,4.5)), demonUp=eout(seg(u,5.6,7.0)), gigaG=eio(seg(u,6.5,7.6)), hitD=seg(u,7.6,7.9), fallD=eio(seg(u,7.9,8.6));
    if(dom>0){ g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<60;i++){ const x=-400+hash(i)*1700, y=560+hash(i+50)*400, a=0.5+0.5*Math.sin(t*7+i); g.fillStyle=`rgba(255,${200+((i*7)%55)},120,${a*dom})`; g.fillRect(x,y,3,3); } g.restore();
      g.save(); g.globalCompositeOperation='lighter'; g.fillStyle=`rgba(255,120,40,${0.12*dom})`; g.fillRect(-1500,560,3300,600); g.restore(); }
    // quân địch tan rã
    for(let i=0;i<12;i++){ const m=ARMY[i], k=seg(u,0.3+i*0.12,1.0+i*0.12); monster(m.x+k*100,m.y-Math.sin(Math.PI*k)*100,m.h,true,1-k,k*4); if(dom>0 && k<1) addGlow(m.x,m.y-50,40,0.5*dom,'255,120,40'); }
    // Gigachad vs Larry phía xa
    if(u<5.5){ actor(IMG.larry,LARRY.x+250,700,520,{flip:true,a:0.9,rot:0.06}); actor(IMG.gigaBig,LARRY.x+20,720,360,{rot:0.2}); }
    // Stalin ném búa + liềm → ☭
    const sx=EG.x-330, sy=EG.y-60; shadow(sx,sy,55); actor(IMG.stalin,sx,sy,150);
    { const k=seg(u,1.2,2.6), hx=lerp(sx+40,gx-120,eout(k)), hy=sy-120-Math.sin(Math.PI*k)*120; const hc=prep(IMG.hammer); if(hc && u<2.6){ g.save(); g.translate(hx,hy); g.rotate(u*14); g.drawImage(hc.src,hc.sx,hc.sy,hc.sw,hc.sh,-30,-30,60,60*hc.sh/hc.sw); g.restore(); }
      const lx=lerp(sx-80,gx-120,k), ly=sy-Math.abs(Math.sin(k*Math.PI*3))*120-60; const lc=prep(IMG.sickle); if(lc && u<2.6){ g.save(); g.translate(lx,ly); g.rotate(-u*16); g.drawImage(lc.src,lc.sx,lc.sy,lc.sw,lc.sh,-28,-28,56,56); g.restore(); }
      if(u>=2.6 && u<3.6){ const c=prep(IMG.cross), z=eout(seg(u,2.6,2.9)); addGlow(gx-120,sy-150,260*z,0.9*(1-seg(u,3.0,3.6)),'255,240,190'); if(c){ g.save(); g.globalAlpha=1-seg(u,3.2,3.6); g.translate(gx-120,sy-150); g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,-60*z,-60*z,120*z,120*z*c.sh/c.sw); g.restore(); } }
      if(u>=2.6 && u<2.66) shake=12; }
    // Evil Gary + Catler cào lửa
    shadow(gx,EG.y,55); actor(IMG.egary,gx,EG.y,130,{flip:true,glow:'rgba(255,0,0,0.8)',gb:20,rot:Math.sin(t*20)*0.03*seg(u,3.5,4.5)});
    { const cx=gx-110, scr=u>2.0 && u<3.8; shadow(cx,EG.y+10,40); actor(IMG.catler,cx+(scr?Math.sin(t*25)*14:0),EG.y+10,110,{flip:false});
      if(scr && Math.random()<0.5){ sparks(gx-30,EG.y-60,6,'255,140,40',4); addGlow(gx-30,EG.y-60,50,0.7,'255,120,30'); } }
    sub(t,'“No... this can\'t be happening!”',S[5]+4.2,S[5]+5.6,'EVIL GARY','#ff6b6b');
    // quỷ khổng lồ trồi lên + Gigachad húc
    if(demonUp>0){ addGlow(1000,820,420*demonUp,0.5,'255,40,20'); g.save(); g.fillStyle=`rgba(20,0,0,${0.85*demonUp})`; g.beginPath(); g.ellipse(1000,840,330*demonUp,60*demonUp,0,0,Math.PI*2); g.fill(); g.restore();
      demon(1000+fallD*120,840-lerp(0,420,demonUp)+fallD*260,1400,demonUp,seg(u,6.4,7.4),t,fallD*0.6); }
    if(gigaG>0){ const gx2=lerp(560,900,ein(seg(u,7.3,7.6))); actor(IMG.gigaBig,gx2,880,lerp(360,720,gigaG),{rot:u>7.3?0.25:0}); }
    if(u>=7.6 && u<7.68){ shake=22; sparks(980,520,50,'255,230,200',10); }
    if(u>=8.4){ const k=seg(u,8.4,9); g.save(); g.strokeStyle=`rgba(255,${120+80*k},60,${k})`; g.lineWidth=4; g.globalCompositeOperation='lighter'; for(let i=0;i<9;i++){ const a=i/9*Math.PI*2; g.beginPath(); g.moveTo(1000,840); let x=1000,y=840; for(let s=0;s<6;s++){ x+=Math.cos(a+(hash(i*7+s)-0.5))*60*k; y+=Math.sin(a+(hash(i*9+s)-0.5))*20*k; g.lineTo(x,y); } g.stroke(); } ring(1000,840,380*k,k,'120,220,255',5,0.25); g.restore(); }
  }
  function cam6(u){ return keys(u,[[0,420,600,0.5],[1.1,420,600,0.55],[1.1,EG.x-160,EG.y-120,1.0],[3.4,EG.x-150,EG.y-120,1.05],[3.4,EG.x-40,EG.y-80,1.7],[5.5,EG.x-40,EG.y-80,1.8],[5.5,1000,500,0.42],[7.0,1000,480,0.4],[7.0,800,620,0.55],[8.3,880,640,0.5],[9,1000,760,0.6]]); }

  // ═════════ CẢNH 7 — THE MUSICAL SEAL (nhìn từ trên xuống) ═════════
  function sc7(u,t){ const cx=VW/2, cy=VH*0.52, R=210;
    g.fillStyle='#120807'; g.fillRect(-200,-200,VW+400,VH+400);
    for(let i=0;i<40;i++){ g.strokeStyle='rgba(60,30,25,0.6)'; g.lineWidth=2; g.beginPath(); const a=hash(i)*6.28, r0=hash(i+3)*500; g.moveTo(cx+Math.cos(a)*r0,cy+Math.sin(a)*r0); g.lineTo(cx+Math.cos(a+0.2)*(r0+90),cy+Math.sin(a+0.2)*(r0+90)); g.stroke(); }
    const on=seg(u,1.8,4.4), judg=seg(u,4.4,4.8), gate=seg(u,5.6,6.4), pull=eio(seg(u,6.2,7.6)), close=seg(u,7.6,8.3), seal=(1-close);
    // vòng phong ấn
    g.save(); g.translate(cx,cy); g.globalCompositeOperation='lighter'; const al=(0.3+0.7*on)*seal;
    for(const [r,lw] of [[R,4],[R*0.92,2],[R*0.6,3]]){ g.strokeStyle=`rgba(140,220,255,${al})`; g.lineWidth=lw; g.beginPath(); g.arc(0,0,r,0,Math.PI*2); g.stroke(); }
    g.rotate(t*0.6); for(let i=0;i<24;i++){ g.save(); g.rotate(i/24*Math.PI*2); g.fillStyle=`rgba(180,235,255,${al})`; g.font='700 18px serif'; g.fillText(['ᚱ','ᚢ','ᚾ','ᛖ','♪','ᛟ','♫'][i%7],R*0.74,6); g.restore(); }
    g.rotate(-t*1.4); g.strokeStyle=`rgba(120,200,255,${al})`; g.lineWidth=2.5; g.beginPath(); for(let i=0;i<=6;i++){ const a=i*Math.PI*2/6*2+Math.PI/2; i?g.lineTo(Math.cos(a)*R*0.6,Math.sin(a)*R*0.6):g.moveTo(Math.cos(a)*R*0.6,Math.sin(a)*R*0.6); } g.stroke(); g.restore();
    // cổng địa ngục
    if(gate>0){ const r=R*0.75*gate*seal; const gr=g.createRadialGradient(cx,cy,0,cx,cy,r); gr.addColorStop(0,'#000'); gr.addColorStop(0.7,'#200000'); gr.addColorStop(1,'rgba(255,60,20,0.8)'); g.fillStyle=gr; g.beginPath(); g.arc(cx,cy,r,0,Math.PI*2); g.fill(); }
    // quỷ nằm giữa phong ấn → bị kéo xuống
    if(close<1){ const sc=lerp(1,0.15,pull); demon(cx,cy+170*sc,560*sc,1-pull*0.7,1,t,0); if(on>0 && pull<1){ g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle=`rgba(150,230,255,${0.8*on})`; g.lineWidth=5; for(let i=0;i<6;i++){ const a=i/6*Math.PI*2+0.3; g.beginPath(); g.moveTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R); g.quadraticCurveTo(cx+Math.cos(a+0.8)*80*sc,cy+Math.sin(a+0.8)*80*sc,cx+Math.cos(a+Math.PI)*60*sc,cy+Math.sin(a+Math.PI)*60*sc); g.stroke(); } g.restore(); } }
    // 4 meme âm nhạc ở 4 góc
    const C4=[[cx-200,cy-300,IMG.piano,'255,230,120'],[cx+200,cy-300,IMG.guitar,'255,90,90'],[cx-200,cy+330,IMG.bongo,'255,200,120'],[cx+200,cy+330,IMG.mosq,'255,80,120']];
    C4.forEach(([x,y,im,c],i)=>{ const k=seg(u,0.3+i*0.35,0.8+i*0.35); if(k<=0) return; addGlow(x,y-50,90,0.5*k*seal,c); actor(im,x,y,110,{a:k});
      if(on>0 && seal>0) for(let q=0;q<3;q++){ const f=(t*1.2+q/3+i*0.17)%1; addGlow(lerp(x,cx,f),lerp(y-50,cy,f),14,on*seal,c); } });
    // thiên thần + laze phán xét
    if(u>=3.8){ const k=eout(seg(u,3.8,4.4)), ax=cx, ay=lerp(-120,150,k); addGlow(ax,ay,220,0.6*k,'255,250,220'); actor(IMG.angel,ax,ay+90,190,{a:k});
      if(judg>0 && u<6.4){ const a=u<6.0?1:1-seg(u,6.0,6.4); g.save(); g.globalCompositeOperation='lighter'; for(const [w,al] of [[150,0.25],[70,0.6],[26,1]]){ g.fillStyle=`rgba(255,252,235,${al*a*judg})`; g.fillRect(cx-w/2,ay+40,w,cy-ay); } g.restore(); addGlow(cx,cy,260,a*judg,'255,250,230'); } }
    bigWord(t,'JUDGMENT.',S[6]+4.4,S[6]+5.8,'#fff6d5',60,VH*0.2);
  }
  function cam7(u){ return [VW/2,VH/2,lerp(1.05,1.0,seg(u,0,9))]; }

  // ═════════ CẢNH 8 — THE SEPARATION ═════════
  function sc8(u,t){ const x=420, y=820;
    const wr=seg(u,0,2.0), pullS=eio(seg(u,1.4,3.4)), boom=u>=3.4, fly=eout(seg(u,3.4,4.2)), uia=seg(u,4.3,5.3), gone=seg(u,5.3,5.6);
    if(!boom){ const j=(Math.random()-0.5)*8*wr, sep=pullS*70;
      g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<5;i++){ bolt(x-sep,y-60,x+sep+(Math.random()-0.5)*40,y-60+(Math.random()-0.5)*80,2,0.7*wr,i%2?'255,30,30':'120,60,200'); } g.restore();
      actor(IMG.gary,x-sep+j,y,100,{a:0.4+0.6*pullS,rot:-0.2*pullS-0.3*wr,sx:1+pullS*0.2}); actor(IMG.egary,x+sep-j,y,105,{a:1-0.2*pullS,rot:0.2*pullS-0.3*wr,glow:'rgba(255,0,0,0.8)',gb:18,sx:1+pullS*0.2}); }
    else { if(u<3.48){ shake=20; addGlow(x,y-60,300,1,'255,230,230'); sparks(x,y-60,40); }
      // Gary gốc văng ra góc, nằm bất động → UIA cuốn đi
      if(gone<1){ const gX=lerp(x,90,fly), gY=y+20-Math.sin(Math.PI*fly)*160; const up=uia>0.7?seg(uia,0.7,1):0; actor(IMG.gary,gX,gY-up*40,95,{rot:fly*3.2+(fly>=1?-0.1:0),a:1-gone}); }
      shadow(x+120,y,50); actor(IMG.egary,x+120,y,lerp(130,100,seg(u,3.6,4.0)),{sy:0.85,glow:'rgba(255,0,0,0.8)',gb:20,rot:Math.sin(t*18)*0.04});
      if(uia>0 && gone<1){ const ux=90, im=IMG.uiaSpin, c=im.naturalWidth/8, fr=1+Math.floor(t*46)%59; g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<3;i++) ring(ux,y,60+i*30+Math.sin(t*10+i)*10,0.8*uia,'255,180,50',4,0.45); addGlow(ux,y-50,140,0.6*uia,'255,170,40'); g.restore();
        if(im.naturalWidth){ const s=120/123; g.save(); g.globalAlpha=1-gone; g.drawImage(im,(fr%8)*c,Math.floor(fr/8)*c,c,c,ux-62*s-30,y-95*s,128*s,128*s); g.restore(); } }
      if(gone>0 && gone<1) addGlow(90,y-50,240*(1-gone)+40,1-gone,'255,230,160'); }
  }
  function cam8(u){ return keys(u,[[0,420,740,1.6],[3.3,420,720,1.9],[3.4,300,720,1.0],[5.6,250,720,1.05],[5.6,250,720,1.05],[7,560,700,0.8]]); }

  // ═════════ CẢNH 9 — THE SHADOW HANDS ═════════
  function sc9(u,t){
    const gx=840, lx=990, sx0=520, raise=eout(seg(u,1.4,2.2)), slow=seg(u,2.2,3.6), slap=seg(u,3.5,3.75), fly=eout(seg(u,3.75,4.6));
    const dark=eio(seg(u,4.2,5.6))*(1-eio(seg(u,8.2,9.4))), grab=eio(seg(u,5.8,6.4)), drag=eio(seg(u,6.6,8.0));
    // trời đổ bóng tối
    if(dark>0){ g.save(); g.fillStyle=`rgba(3,1,6,${0.6*dark})`; g.fillRect(-1500,-1500,3500,3500); g.restore(); for(let i=0;i<6;i++) darkCloud(-300+i*300,-200+Math.sin(i)*80+lerp(-300,0,dark),360,dark,t,i*13); }
    // Evil Larry + Evil Gary bị dồn vào góc (bị kéo đi)
    const dg=drag;
    actor(IMG.larryRed,lx+dg*300,820-dg*40,lerp(330,120,dg),{a:1-dg,flip:true,rot:Math.sin(t*14)*0.04*grab});
    shadow(gx,820,55,0.4*(1-dg)); actor(IMG.egary,gx+dg*260,820-dg*60,lerp(125,60,dg),{a:1-dg,glow:'rgba(255,0,0,0.8)',gb:18,rot:Math.sin(t*16)*0.06*grab});
    if(grab>0){ shadowHand('grip',1600,200,gx+dg*260-150,770-dg*60,0.8*(1-dg*0.3),grab*(1-seg(u,8.0,8.4)),1); shadowHand('grip',1600,1100,lx+dg*300-190,650-dg*40,1.0*(1-dg*0.3),grab*(1-seg(u,8.0,8.4)),-1); }
    // Stalin bước tới giơ búa (chậm) → bị bàn tay hất văng
    const sx=fly>0?lerp(sx0+150,-300,fly):lerp(sx0,sx0+150,seg(u,0,1.4)), sy=820-Math.sin(Math.PI*fly)*240;
    shadow(sx,820,50,0.5*(1-fly)); actor(IMG.stalin,sx,sy,150,{rot:fly*-3});
    if(fly<=0){ const hx=sx+40, hy=lerp(700,560,raise)+lerp(0,170,ein(slow)); const hc=prep(IMG.hammer); if(hc){ g.save(); g.translate(hx,hy); g.rotate(lerp(-0.3,-0.9,raise)+lerp(0,1.4,ein(slow))); g.drawImage(hc.src,hc.sx,hc.sy,hc.sw,hc.sh,-35,-35,70,70*hc.sh/hc.sw); g.restore(); }
      if(raise>0.4){ addGlow(hx,hy,90,0.6,'150,210,255'); if(Math.random()<0.5) bolt(hx,hy,hx+(Math.random()-0.5)*160,hy-120-Math.random()*200,1.8,0.9,'150,210,255'); if(u<2.4 && Math.random()<0.2) bolt(hx+(Math.random()-0.5)*300,-600,hx+(Math.random()-0.5)*100,hy,3,0.8,'150,210,255'); } }
    const catx=sx0-100; actor(IMG.catler,catx,830,105,{a:1});
    if(slap>0) shadowHand('slap',sx0+600,1300,lerp(sx0+400,sx0+40,eout(slap)),lerp(1000,760,eout(slap)),0.9,1-seg(u,4.0,4.6),1);
    if(u>=3.75 && u<3.83){ shake=24; addGlow(sx0+80,760,220,1,'255,255,255'); }
    // hàng chục bàn tay trồi ra từ bóng tối
    if(dark>0){ for(let i=0;i<10;i++){ const side=i%2?1:-1, bx=(i<5?-200+i*260:-100+(i-5)*280), by=i<5?-300:1250, k=eio(seg(u,4.6+i*0.12,5.4+i*0.12))*dark;
      shadowHand(i%3?'crawlA':'lunge',bx,by,bx+(240-hash(i)*120)*side*0.5+(i<5?60:-60),lerp(by,by+(i<5?520:-480),k),0.75,k,side); } }
    team.slice(2,8).forEach((m,i)=>{ const x=-200+i*110, y=900+(i%2)*30; actor(m.im,x,y,m.h*0.8,{flip:u>4.6,a:1-dark*0.3}); });
    sub(t,'“This ends now.”',S[8]+1.0,S[8]+2.4,'STALIN CAT','#ff8a80');
  }
  const sx9=520;
  function cam9(u){ return keys(u,[[0,700,720,0.8],[1.3,720,710,0.9],[1.3,sx9+190,640,1.5],[3.5,sx9+190,640,1.6],[3.5,560,700,0.85],[4.6,450,640,0.6],[5.7,700,600,0.5],[8.2,800,620,0.52],[10,500,650,0.6]]); }

  // ═════════ CẢNH 10 — THAT IS THE END OF THE LORE ═════════
  function sc10(u,t){
    const up=eio(seg(u,0.6,2.6)), sun=eio(seg(u,2.6,5.5));
    if(sun>0){ g.save(); g.globalCompositeOperation='lighter'; const gr=g.createLinearGradient(0,-800,0,900); gr.addColorStop(0,`rgba(255,220,150,${0.45*sun})`); gr.addColorStop(1,`rgba(255,200,120,${0.1*sun})`); g.fillStyle=gr; g.fillRect(-1500,-1500,3500,3000);
      g.translate(-300,-500); for(let i=0;i<9;i++){ const a=0.5+i*0.09; const rg=g.createLinearGradient(0,0,Math.cos(a)*2400,Math.sin(a)*2400); rg.addColorStop(0,`rgba(255,240,200,${0.35*sun})`); rg.addColorStop(1,'rgba(255,220,150,0)'); g.fillStyle=rg; g.beginPath(); g.moveTo(0,0); g.lineTo(Math.cos(a-0.02)*2400,Math.sin(a-0.02)*2400); g.lineTo(Math.cos(a+0.02)*2400,Math.sin(a+0.02)*2400); g.closePath(); g.fill(); } g.restore(); }
    for(const c of crowd.slice(0,14)){ const x=c.x+(c.x>-60?560:0), y=c.y+170; shadow(x,y,c.h*0.3,0.3); actor(c.im,x,y,c.h); }
    team.forEach((m,i)=>{ if(m.k==='stalincat'||m.k==='doge') return; const x=i%2?-120-((i*53)%140):560+((i*61)%170), y=800+((i*37)%70); shadow(x,y,m.h*0.25,0.35); actor(m.im,x,y,m.h*0.95); });
    const sx=300, sy=860; shadow(sx,sy,60); actor(IMG.stalin,sx,sy,150,{rot:lerp(-1.45,0,up)});
    const hc=prep(IMG.hammer); if(hc){ g.save(); g.translate(sx+60,sy-lerp(10,60,up)); g.rotate(lerp(-1.5,0.1,up)); g.drawImage(hc.src,hc.sx,hc.sy,hc.sw,hc.sh,-30,-30,60,60*hc.sh/hc.sw); g.restore(); }
    const dx=lerp(560,sx+110,eout(seg(u,0,0.6))); shadow(dx,sy,40); actor(IMG.doge,dx,sy-(u<0.6?Math.abs(Math.sin(u*14))*6:0),115,{flip:true});
  }
  function cam10(u){ return keys(u,[[0,330,760,1.25],[2.6,320,740,1.05],[5.5,320,560,0.5],[6,320,540,0.48]]); }
  // màn đen kết: chữ + mắt Friend
  function endCard(t){ const u=t-(S[9]+6);
    if(u<=0) return; g.fillStyle=`rgba(0,0,0,${seg(u,0,1.2)})`; g.fillRect(0,0,VW,VH); if(u<1.2) return;
    const v=u-1.2; text('THAT IS THE END OF THE LORE',VW/2,VH*0.52,30,'#ffffff',null,'900 30px Georgia,serif',seg(v,0,0.6));
    if(v>3.0){ const w=v-3.0, k=seg(w,0,0.4); g.save(); g.font='900 40px Georgia,serif'; g.textAlign='center'; g.textBaseline='middle'; g.globalAlpha=k; g.fillStyle='#b00000'; g.fillText('BUT NOT MY…',VW/2,VH*0.62); g.restore();
      g.save(); g.fillStyle='#a00000'; for(let i=0;i<16;i++){ const x=VW/2-120+hash(i)*240, L=seg(w,0.2+hash(i+5)*0.8,1.6+hash(i+5)*1.6)*(30+hash(i+9)*90); if(L<=0) continue; g.fillRect(x-1.2,VH*0.62+12,2.4,L); g.beginPath(); g.arc(x,VH*0.62+12+L,3,0,Math.PI*2); g.fill(); } g.restore(); }
    if(v>4.6){ const w=v-4.6, open=eio(seg(w,0.3,1.6)), c=prep(IMG.friend); if(c){ const W=250, H=W*c.sh/c.sw, x=VW/2-W/2, y=VH*0.47-H-28;
        g.save(); g.globalAlpha=seg(w,0,0.5); g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,x,y,W,H);
        g.fillStyle='#000'; const ey=y+H*0.44, eh=H*0.26*(1-open); g.fillRect(x,ey-H*0.13-0.5,W,H*0.13*(1-open)+0.5); g.fillRect(x,ey+H*0.13-H*0.13*(1-open),W,H*0.13*(1-open)+0.5);   // mí mắt mở dần
        g.fillStyle='rgba(170,0,0,0.85)'; for(let i=0;i<9;i++){ const bx=x+W*(0.3+hash(i+30)*0.45), L=seg(w,0.8+hash(i)*0.6,2.2+hash(i)*1.5)*(20+hash(i+3)*60); g.fillRect(bx-1.5,y+H*0.82,3,L); g.beginPath(); g.arc(bx,y+H*0.82+L,3.5,0,Math.PI*2); g.fill(); }   // máu nhỏ giọt từ miệng
        g.restore(); } }
  }

  const SCN=[[sc1,cam1],[sc2,cam2],[sc3,cam3],[sc4,cam4],[sc5,cam5],[sc6,cam6],[sc7,cam7],[sc8,cam8],[sc9,cam9],[sc10,cam10]];
  function keys(u,K){ for(let i=0;i<K.length-1;i++){ const a=K[i], b=K[i+1]; if(u>=a[0] && u<b[0]){ const k=(b[0]-a[0]<0.05)?1:eio((u-a[0])/(b[0]-a[0])); return [lerp(a[1],b[1],k),lerp(a[2],b[2],k),lerp(a[3],b[3],k)]; } } const L=K[K.length-1]; return [L[1],L[2],L[3]]; }
  // 🔊 tiếng (thời điểm tuyệt đối)
  const SFX=[[0.2,'larry_horn',0.5,6],[3.1,'gp_evil_laugh',0.7],[5.0,'holy_thunder',1.0],[5.2,'titan_roar',0.8,3],[6.6,'death_break',0.5],[7.2,'hit_heavy',0.8],
    [9.2,'larry_horn',0.6,3],[10.4,'gigachad_roar',0.9,2],[12.6,'ultimate_charge_2',0.7],[14.0,'vine_boom',1.0],[14.0,'hit_heavy',1.0],[14.9,'cdg_grow',0.8],[14.95,'vine_boom',0.9],
    [17.1,'spidercat_hit',0.9],[17.8,'spidercat_hit',0.8],[18.6,'spidercat_hit',0.8],[19.8,'punch1',0.6],[20.4,'punch1',0.6],[21.0,'punch1',0.6],[21.6,'punch1',0.6],[22.6,'punch1',0.7],[23.1,'vine_boom',0.9],[23.4,'chillguy_kick',1.0],
    [23.5,'ricardo_music',0.8,3.4],[25.9,'hit_heavy',1.0],[27.0,'infdoge_bonk',0.8],[28.6,'ultimate_charge_2',0.6],[29.2,'hit_heavy',0.9],[27.5,'bonk',0.6],[28.4,'bonk',0.6],[29.3,'bonk',0.7],[30.2,'bonk',0.8],
    [31.0,'guitar_jojo',0.8,1.2],[32.2,'piano_giorno',0.8,1.2],[33.4,'tribe_1',0.9,1.2],[34.6,'mosquito_violin',0.8,1.2],[35.8,'mc_sfx_craft',0.8],[36.7,'hit_heavy',0.8],[37.0,'uiacat_spin',0.9],
    [38.6,'king_laser',0.7],[39.2,'king_laser',0.7],[39.9,'king_knight_summon',0.9],[41.6,'sm_form',0.8],[43.0,'king_laser',1.0],[43.0,'hl_laser',0.8],[43.3,'sm_schwing',1.0],[44.2,'sm_fin',1.0],[44.7,'death_break',0.8],
    [47.2,'stalin_hammer_hit',0.8],[48.6,'stalin_domain',0.7,4],[48.9,'vine_boom',0.8],[50.2,'gp_evil_laugh',0.4],[51.6,'titan_roar',1.0,4],[51.8,'fd_roar',0.8,3],[53.6,'vine_boom',1.0],[53.6,'hit_heavy',1.0],[54.4,'stalin_hammer_hit',0.7],
    [57.0,'piano_giorno',0.5,3],[57.3,'guitar_jojo',0.4,3],[57.6,'tribe_1',0.5,3],[57.9,'mosquito_violin',0.5,3],[58.8,'hl_choir',1.0,5],[59.4,'hl_laser',1.0],[59.4,'holy_thunder',1.0],[60.8,'titan_roar',0.8,3],[62.3,'vine_boom',0.8],
    [64.2,'sc_terror',0.6],[66.0,'ultimate_charge_2',0.8],[67.4,'vine_boom',1.0],[67.4,'holy_thunder',0.8],[68.3,'uiacat_spin',0.9],[69.6,'uia_tele_dbz',0.9],
    [71.3,'holy_thunder',0.6],[72.1,'stalin_hammer_return',0.8],[74.5,'hm_claw1',1.0],[74.75,'vine_boom',1.0],[75.2,'hm_stalker',0.9],[75.6,'hm_crawl',0.8],[76.8,'hm_claw2',0.9],[77.6,'sc_terror',0.8],[78.4,'gp_souls',0.5],
    [93.0,'fr_thunder',0.9],[95.0,'fr_bite',0.8]];
  // 🎵 nhạc nền (Audio riêng, bám thời gian thật của phim)
  let MUS=[];
  function musSetup(){ musStop(); const mk=(src,a,b,vol,o)=>Object.assign({el:Object.assign(new Audio(src),{preload:'auto'}),a,b,vol},o||{});
    MUS=[ mk('assets/audio/cine_heart.mp3',0,5.0,0.8,{loop:true,fi:0.5,fo:0.2}), mk('assets/audio/cine_horns.mp3',5.0,32,0.75,{fo:1.0}), mk('assets/audio/cine_epic.mp3',31,55,0.8,{loop:true,fi:1.0,fo:0.8}),
      mk('assets/audio/cine_heart_fast.mp3',64,71,0.7,{loop:true,fo:0.4}), mk('assets/audio/cine_horns.mp3',82,88.5,0.45,{fi:1.5,fo:1.5}), mk('assets/audio/fr_song.mp3',93.2,DUR,0.8,{fi:0.4}) ];
    for(const m of MUS) m.el.loop=!!m.loop; }
  function musTick(tR){ for(const m of MUS){ const on=!paused && tR>=m.a && tR<m.b;
      if(!on){ if(!m.el.paused) m.el.pause(); continue; }
      const pos=tR-m.a, d=m.el.duration||1e9;
      if(!m.loop && pos>=d){ if(!m.el.paused) m.el.pause(); continue; }
      if(m.el.paused){ try{ m.el.currentTime=m.loop?pos%d:pos; }catch(e){} m.el.play().catch(()=>{}); }
      else if(!m.loop && Math.abs(m.el.currentTime-pos)>0.35){ try{ m.el.currentTime=pos; }catch(e){} }
      let v=m.vol; if(m.fi) v*=seg(tR,m.a,m.a+m.fi); if(m.fo) v*=1-seg(tR,m.b-m.fo,m.b);
      if(tR>=S[4]+3 && tR<S[4]+6.2) v*=0.25;   // Joninn đặt tay lên chuôi kiếm: âm thanh chiến trường nhỏ dần
      m.el.volume=clamp(v,0,1); } }
  function musStop(){ for(const m of MUS){ try{ m.el.pause(); }catch(e){} } }

  function frame(now){
    raf=requestAnimationFrame(frame);
    const t=Math.min(paused?pauseT:(now-t0)/1000, DUR);
    let si=0; while(si<9 && t>=S[si+1]) si++;
    const u=t-S[si], [scf,camf]=SCN[si];
    SFX.forEach(([ts,k,v,d],i)=>{ if(t>=ts && t<ts+1.5) sfx('s'+i,k,v,d); });
    let [cx,cy,cz]=camf(u);
    shake*=0.86; const ox=(Math.random()-0.5)*shake, oy=(Math.random()-0.5)*shake;
    g.setTransform(1,0,0,1,0,0); g.fillStyle='#000'; g.fillRect(0,0,cv.width,cv.height);
    g.setTransform(SC*cz,0,0,SC*cz,SC*(VW/2-cx*cz+ox),SC*(VH/2-cy*cz+oy));
    const red=si===9?1-seg(u,2.6,5.5):1;
    if(si!==6 && window._cineBG) window._cineBG.draw(g,t,red);
    if(si!==6 && red>0.5 && si<9 && (Math.sin(t*17)>0.93 || Math.random()<0.012)){ g.fillStyle=`rgba(255,40,40,${0.12*red})`; g.fillRect(-1500,-1500,3500,GROUND+1500); bolt(cx-300+Math.random()*600,-800,cx-200+Math.random()*400,GROUND-160,4,0.8,'255,40,40','255,210,210'); }
    scf(u,t);
    // hạt
    for(let i=parts.length-1;i>=0;i--){ const p=parts[i]; p.x+=p.vx; p.y+=p.vy; p.vx*=0.96; p.vy=p.vy*0.96+(p.k==='spark'||p.k==='rock'?0.2:-0.02); p.l--; if(p.l<=0){ parts.splice(i,1); continue; }
      if(p.k==='dust'){ g.fillStyle=`rgba(${p.c},${0.35*p.l/p.L})`; g.beginPath(); g.arc(p.x,p.y,p.r*(1.6-p.l/p.L),0,Math.PI*2); g.fill(); }
      else if(p.k==='rock'){ g.fillStyle=`rgba(${p.c},1)`; g.fillRect(p.x,p.y,p.r,p.r); }
      else { g.fillStyle=`rgba(${p.c},${p.l/p.L})`; g.fillRect(p.x,p.y,2.6,2.6); } }
    if(parts.length>700) parts.splice(0,parts.length-700);
    if(si!==6 && window._cineBG) window._cineBG.drawFront(g,t,red);
    // ═════ lớp phủ màn hình ═════
    g.setTransform(SC,0,0,SC,0,0);
    for(let i=1;i<10;i++){ const d=Math.abs(t-S[i]); if(d<0.12 && i!==4 && i!==3){ g.fillStyle=`rgba(0,0,0,${1-d/0.12})`; g.fillRect(0,0,VW,VH); } }   // cắt cảnh: chớp đen rất nhanh
    if(t<1){ g.fillStyle=`rgba(0,0,0,${1-t})`; g.fillRect(0,0,VW,VH); }
    if(si===0){ sub(t,'“You really think you can win?”',3.2,5.0,'EVIL GARY','#ff6b6b'); }
    if(si===6 && u>=4.4 && u<4.55){ g.fillStyle=`rgba(255,255,240,${1-seg(u,4.4,4.55)})`; g.fillRect(0,0,VW,VH); }
    if(si===7 && u>=3.4 && u<3.5){ g.fillStyle='rgba(255,255,255,0.85)'; g.fillRect(0,0,VW,VH); }
    const bar=si===9&&u>6?0:64; g.fillStyle='#000'; g.fillRect(0,0,VW,bar); g.fillRect(0,VH-bar,VW,bar);
    // tiêu đề phần
    { const tt=[[0,'PART 1 — THE WAR BEGINS'],[S[3],'PART 2 — MEME COMBOS'],[S[6],'PART 3 — THE END OF THE LORE']];
      for(const [a,s] of tt){ const k=seg(t,a+0.2,a+0.6)*(1-seg(t,a+2.2,a+2.6)); if(k>0) text(s,VW/2,100,20,'#ffcc80','#000',undefined,k); } }
    if(t<3){ const k=seg(t,0.6,1.2)*(1-seg(t,2.4,3)); text('MEMES ASSEMBLE — PART II',VW/2,VH*0.36,30,'#fff','#000',undefined,k); text('THE WAR OF EVIL GARY',VW/2,VH*0.36+40,24,'#ff5252','#000',undefined,k); }
    if(si===9) endCard(t);
    musTick(t);
    markOnly=false;
    if(panel) panel.update();
  }
  const curT=()=>Math.min(paused?pauseT:(performance.now()-t0)/1000,DUR);
  function seek(sec){ sec=clamp(sec,0,DUR); try{ stopAllLongSfx(); }catch(e){} parts=[]; played={}; markOnly=true; if(paused) pauseT=sec; else t0=performance.now()-sec*1000; }
  function toggle(){ if(paused){ if(pauseT>=DUR-0.05) pauseT=0; t0=performance.now()-pauseT*1000; paused=false; } else { pauseT=curT(); paused=true; } }
  function stop(){ if(raf) cancelAnimationFrame(raf); raf=null; musStop(); try{ stopAllLongSfx(); }catch(e){} if(window._cinePanelRemove) _cinePanelRemove(); panel=null; if(overlay) overlay.remove(); overlay=null; }
  window._cineWar=function(){
    if(overlay) return;
    overlay=document.createElement('div');
    overlay.style.cssText='position:fixed;inset:0;z-index:99999;background:#000;display:flex;align-items:center;justify-content:center;';
    cv=document.createElement('canvas'); cv.width=1080; cv.height=1920; SC=cv.width/VW;
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
  window._cineWarSeek=t=>{ parts=[]; played={}; markOnly=true; if(paused) pauseT=t; else t0=performance.now()-t*1000; };
  window._cineWarPause=t=>{ paused=true; pauseT=t; parts=[]; };
  window._cineWarCanvas=()=>cv;
})();
