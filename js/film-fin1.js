// ===================== 👁️ MEME LORE · FINAL — PART 1 (16:9 ngang, ~51s) =====================
// Anh kể (5/11/2026): thành phố bình yên, người dân đi dạo + vài meme quen thuộc trên phố → em bé đang mua kem thì bóng đen phủ cả khu,
// ngẩng lên khóc thét, rơi que kem → zoom: FRIEND khổng lồ che kín bầu trời giữa các toà cao tầng → mọi người chạy loạn, tay bóng tối
// đâm xuyên các toà nhà, phá huỷ mọi thứ (10–15s, cắt nhiều khung) → trên 1 nóc nhà, 5 bóng Akatsuki lộ diện:
// Depressed Cat · Doorbell Chud · Ninja Cat · Bat Cat · Mlem Cat.
// Cách dựng giống Prologue (film-l2pro.js): không dùng máy quay 2.5D, mỗi cảnh vẽ 2D toạ độ 960×540 với cam() riêng.
// Dân phố = ~30 meme trong game (anh dặn: bỏ người, toàn meme). Em bé mua kem = Banana Cat (ảnh thường + ảnh khóc), bán kem = Cornelius.
//    5 meme Akatsuki: Depressed Cat dùng ảnh Akatsuki có sẵn, 4 con kia tạm dùng ảnh gốc (chờ ảnh khoác áo Akatsuki).
(function(){
  if(!window.CineKit || CineKit.films.fin1) return;
  try{ const _f=new FontFace('Shojumaru','url(assets/fonts/Shojumaru.ttf)'); _f.load().then(ff=>document.fonts.add(ff)).catch(()=>{}); }catch(e){}   // 🈴 font tiêu đề kiểu anime (OFL) cho logo MEOWKATSUKI — anh dặn dùng font anime
  const K=CineKit, {seg,lerp,clamp,hash}=K, E=K.EASE, TAU=Math.PI*2, VW=960, VH=540;
  const T={ street:0, stand:7, shadow:11, cry:14, splat:15.7, reveal:16.5, roar:18.4, title:19.8, d1:22.5, d2:24.5, d3:26.3, d4:28, d5:30, d6:32, d7:34, roof:37, line:46.6, booms:55.6, group:58.8, akaT:59.2, DUR:69.2 };
  const DUR=T.DUR;
  let IM={}, SCv=1, TT=0;
  const SERIF='Georgia, "Times New Roman", serif', SANS='Montserrat, "Segoe UI", sans-serif';

  // ───────── vật liệu chung ─────────
  const GLOW={};
  function glow(col){ if(GLOW[col]) return GLOW[col]; const c=K.mk(128,128), x=c.getContext('2d'), gr=x.createRadialGradient(64,64,0,64,64,64);
    gr.addColorStop(0,`rgba(${col},1)`); gr.addColorStop(0.22,`rgba(${col},0.5)`); gr.addColorStop(0.55,`rgba(${col},0.12)`); gr.addColorStop(1,`rgba(${col},0)`);
    x.fillStyle=gr; x.fillRect(0,0,128,128); return GLOW[col]=c; }
  function blob(g,x,y,r,col,a){ if(a<=0.003||r<=0) return; g.globalAlpha=Math.min(1,a); g.drawImage(glow(col),x-r,y-r,2*r,2*r); }
  function cam(g,cx,cy,z,rot){ g.translate(VW/2,VH/2); if(rot) g.rotate(rot); g.scale(z,z); g.translate(-cx,-cy); }
  const H=(a,b)=>hash(a*12.9898+(b||0)*78.233);
  // ảnh: (x,y) = điểm neo (ax,ay theo tỉ lệ ảnh) · o: a, flip, rot, pixel, dark (0..1 phủ đen = bóng hình), rim:[col,a]
  function pic(g,key,x,y,h,o={}){ const c=K.prep(IM[key]); if(!c) return null; const w=h*c.sw/c.sh, ax=o.ax==null?0.5:o.ax, ay=o.ay==null?1:o.ay, a=o.a==null?1:o.a;
    if(a<=0.003) return {w,h}; g.save(); g.translate(x,y); if(o.rot) g.rotate(o.rot); g.scale(o.flip?-1:1,1); g.globalAlpha=a; g.imageSmoothingEnabled=!o.pixel;
    if(o.rim){ g.save(); g.globalCompositeOperation='lighter'; g.globalAlpha=a*o.rim[1]; const tc=K.tinted(c,`rgb(${o.rim[0]})`); for(const [dx,dy] of [[-2,0],[2,0],[0,-2]]) g.drawImage(tc,-ax*w+dx,-ay*h+dy,w,h); g.restore(); }
    g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,-ax*w,-ay*h,w,h);
    if(o.dark>0.003){ g.globalAlpha=a*Math.min(1,o.dark); g.drawImage(K.tinted(c,'#050206'),-ax*w,-ay*h,w,h); }
    g.restore(); return {w,h}; }

  // ───────── THÀNH PHỐ (vẽ bằng code, cố định theo seed — không Math.random) ─────────
  const SKY_DAY=['#7fc4ff','#bfe3ff','#fff1d6'];
  function sky(g,t,dark,red){ const gr=g.createLinearGradient(0,-400,0,560);
    const mix=(c,k)=>c; gr.addColorStop(0,SKY_DAY[0]); gr.addColorStop(0.6,SKY_DAY[1]); gr.addColorStop(1,SKY_DAY[2]);
    g.fillStyle=gr; g.fillRect(-3000,-1200,9000,2600);
    if(red>0){ const r=g.createLinearGradient(0,-400,0,560); r.addColorStop(0,'#14020a'); r.addColorStop(0.55,'#5a0d12'); r.addColorStop(1,'#d2461c'); g.globalAlpha=red; g.fillStyle=r; g.fillRect(-3000,-1200,9000,2600); g.globalAlpha=1; }
    if(dark>0){ g.globalAlpha=dark; g.fillStyle='#120818'; g.fillRect(-3000,-1200,9000,2600); g.globalAlpha=1; } }
  const BLD={};
  function bset(seed,n,x0,span,hmin,hvar,wmin,wvar){ const k=seed+'|'+n; if(BLD[k]) return BLD[k]; const out=[]; let x=x0;
    for(let i=0;i<n && x<x0+span;i++){ const w=wmin+wvar*H(seed,i), h=hmin+hvar*Math.pow(H(seed+1,i),1.4); out.push({x,w,h,seed:seed*100+i,roof:H(seed+2,i)}); x+=w+4+10*H(seed+3,i); }
    return BLD[k]=out; }
  // 1 toà nhà: thân + lưới cửa sổ (sáng/tối theo seed) + chi tiết mái
  function building(g,b,base,col,win,lit,o={}){ const {x,w,h}=b; const top=base-h;
    g.fillStyle=col; g.fillRect(x,top,w,h+2);
    g.fillStyle='rgba(255,255,255,0.06)'; g.fillRect(x,top,w*0.12,h);                 // cạnh sáng
    g.fillStyle='rgba(0,0,0,0.18)'; g.fillRect(x+w*0.86,top,w*0.14,h);               // cạnh tối
    if(b.roof>0.6){ g.fillStyle=col; g.fillRect(x+w*0.3,top-10,w*0.4,10); g.fillRect(x+w*0.48,top-26,2,16); }
    if(b.roof<0.2){ g.beginPath(); g.moveTo(x,top); g.lineTo(x+w/2,top-w*0.35); g.lineTo(x+w,top); g.closePath(); g.fill(); }
    const cw=o.cw||7, ch=o.ch||9, gx=o.gx||5, gy=o.gy||7; const nx=Math.floor((w-8)/(cw+gx)), ny=Math.floor((h-12)/(ch+gy));
    for(let j=0;j<ny;j++) for(let i=0;i<nx;i++){ const v=H(b.seed+i*3.1,j*7.7); const on=v<lit;
      g.fillStyle=on?win:'rgba(20,30,50,0.45)'; g.fillRect(x+4+i*(cw+gx)+((w-8)-(nx*(cw+gx)-gx))/2,top+8+j*(ch+gy),cw,ch); } }
  function skyline(g,camx,par,base,seed,n,hmin,hvar,wmin,wvar,col,win,lit,o){ g.save(); g.translate(camx*(1-par),0);
    for(const b of bset(seed,n,-900,4200,hmin,hvar,wmin,wvar)) building(g,b,base,col,win,lit,o); g.restore(); }
  // mặt phố: vỉa hè + lòng đường + vạch kẻ
  function street(g,y0){ g.fillStyle='#b9b3a8'; g.fillRect(-3000,y0,9000,40); g.fillStyle='#8f8a80'; g.fillRect(-3000,y0+36,9000,4);
    g.fillStyle='#45474d'; g.fillRect(-3000,y0+40,9000,200); g.fillStyle='#f0e6c8'; for(let x=-3000;x<6000;x+=90) g.fillRect(x,y0+108,46,5);
    g.fillStyle='rgba(0,0,0,0.08)'; for(let x=-3000;x<6000;x+=60) g.fillRect(x,y0,2,36); }
  // dãy cửa hàng sát phố (cao 2–3 tầng, mái hiên sọc)
  const AWN=[['#e53935','#fff'],['#1e88e5','#fff'],['#43a047','#fff'],['#fb8c00','#fff8e1'],['#8e24aa','#fff']];
  function shops(g,y0,x0,x1){ for(let i=0,x=x0;x<x1;i++){ const w=120+60*H(41,i), h=120+70*H(42,i), c=AWN[i%AWN.length], hue=`hsl(${Math.round(30+300*H(43,i))},${25+20*H(44,i)|0}%,${60+15*H(45,i)|0}%)`;
      g.fillStyle=hue; g.fillRect(x,y0-h,w,h); g.fillStyle='rgba(0,0,0,0.12)'; g.fillRect(x+w-6,y0-h,6,h);
      g.fillStyle='#2b3440'; g.fillRect(x+10,y0-58,w-20,52); g.fillStyle='rgba(180,220,255,0.35)'; g.fillRect(x+14,y0-54,w-28,22);   // tủ kính
      for(let k=0;k<Math.floor((w-14)/16);k++){ g.fillStyle=k%2?c[0]:c[1]; g.fillRect(x+7+k*16,y0-74,16,14); } g.fillStyle='rgba(0,0,0,0.15)'; g.fillRect(x+7,y0-60,w-14,3);   // mái hiên sọc
      for(let r=0;r<Math.floor((h-80)/34);r++) for(let q=0;q<2;q++){ g.fillStyle='#cfe8ff'; g.fillRect(x+16+q*(w/2-6),y0-h+14+r*34,w/2-26,20); }
      x+=w+2; } }
  function tree(g,x,y,s){ g.fillStyle='#6d4c2f'; g.fillRect(x-3*s,y-40*s,6*s,40*s); blob(g,x,y-55*s,30*s,'60,140,60',0.95); blob(g,x-14*s,y-45*s,20*s,'50,120,50',0.9); blob(g,x+14*s,y-48*s,22*s,'70,160,70',0.9); }
  function lamp(g,x,y){ g.fillStyle='#3a3f47'; g.fillRect(x-2,y-90,4,90); g.fillRect(x-2,y-90,20,4); g.fillStyle='#ffe9a8'; g.fillRect(x+12,y-88,8,5); }
  const CARC=['#e53935','#1e88e5','#fdd835','#ffffff','#43a047','#6d4c41'];
  function car(g,x,y,w,col,dir,rot){ g.save(); g.translate(x,y); if(rot) g.rotate(rot); g.scale(dir,1); const h=w*0.38;
    g.fillStyle='rgba(0,0,0,0.25)'; g.fillRect(-w/2,-2,w,5);
    g.fillStyle=col; g.beginPath(); g.roundRect(-w/2,-h*0.75,w,h*0.55,6); g.fill(); g.beginPath(); g.roundRect(-w*0.3,-h*1.15,w*0.55,h*0.5,8); g.fill();
    g.fillStyle='#bfe0f5'; g.fillRect(-w*0.24,-h*1.06,w*0.2,h*0.34); g.fillRect(0.0,-h*1.06,w*0.2,h*0.34);
    g.fillStyle='#1b1b1b'; for(const q of [-0.3,0.3]){ g.beginPath(); g.arc(q*w,-h*0.18,h*0.24,0,TAU); g.fill(); }
    g.fillStyle='#fff6b0'; g.fillRect(w*0.44,-h*0.62,w*0.06,h*0.14); g.restore(); }
  // 🐾 DÂN PHỐ = MEME (anh dặn 5/11: bỏ hết người, dân toàn là meme) — ảnh meme trong game, đi kiểu nhún nhảy như trong trận
  const CROWD=['popcat','gary','grumpycat','huhcat','kermit','maxwell','nyancat','pakistanguy','rickroll','smartguy','yellingwomen','windguy','pianocat','bongocat','uiacat',
    'applecat','yuki','calmdog','scareddog','poordog','wetcat','snoozecat','clappingcat','beluga','mewingcat','flowercat','dawae','trollface','gigachad','evillarry'];
  function person(g,x,y,h,i,ph,o={}){ const key='c'+(i%CROWD.length), run=o.run, dir=o.dir||1, hop=Math.abs(Math.sin(ph*(run?1.2:0.8)))*(run?16:7)*(h/100);
    g.save(); g.globalAlpha=0.2; g.fillStyle='#000'; g.beginPath(); g.ellipse(x,y,h*0.24,h*0.05,0,0,TAU); g.fill(); g.restore();
    pic(g,key,x,y-hop,h*0.82,{flip:dir<0, rot:run?-dir*0.14+Math.sin(ph*1.2)*0.08:Math.sin(ph*0.8)*0.05});
    if(run && o.scream){ g.save(); g.fillStyle='#7ec8ff'; for(let k=0;k<2;k++){ const f=(TT*2.4+k*0.5+i*0.13)%1; g.globalAlpha=1-f; g.beginPath(); g.ellipse(x+dir*h*0.25+k*6,y-h*0.75-hop+f*14,2.4,4,0,0,TAU); g.fill(); } g.restore(); } }   // giọt mồ hôi lúc chạy loạn
  // Banana Cat đi mua kem (ảnh thường) → ngước nhìn trời → khóc tuôn nước mắt (ảnh khóc có sẵn) — ice: đang cầm kem
  function kid(g,x,y,h,o={}){ const hh=h*(o.cry?1.55:1.3), hop=o.walk?Math.abs(Math.sin(TT*9))*5:0;
    g.save(); g.globalAlpha=0.2; g.fillStyle='#000'; g.beginPath(); g.ellipse(x,y,hh*0.22,hh*0.05,0,0,TAU); g.fill(); g.restore();
    pic(g,o.cry?'banCry':'ban',x,y-hop,hh,{rot:o.look?-0.1:0});
    if(o.ice){ g.save(); g.translate(x+hh*0.33,y-hh*0.3-hop); iceCone(g,hh/120); g.restore(); } }
  function iceCone(g,s,rot){ g.save(); if(rot) g.rotate(rot); g.fillStyle='#d79b54'; g.beginPath(); g.moveTo(-8*s,0); g.lineTo(8*s,0); g.lineTo(0,24*s); g.closePath(); g.fill();
    g.fillStyle='#ffd1e1'; g.beginPath(); g.arc(0,-6*s,10*s,0,TAU); g.fill(); g.fillStyle='#fff3c4'; g.beginPath(); g.arc(-3*s,-14*s,7*s,0,TAU); g.fill(); g.restore(); }
  function stand(g,x,y){ g.fillStyle='#ffffff'; g.fillRect(x-70,y-70,140,70); g.fillStyle='#7ecbff'; g.fillRect(x-70,y-40,140,8);
    g.fillStyle='#bfe9ff'; g.fillRect(x-60,y-66,120,22); for(let i=0;i<5;i++){ g.fillStyle=['#ffd1e1','#fff3c4','#b9f6ca','#d1c4e9','#ffe0b2'][i]; g.beginPath(); g.arc(x-46+i*23,y-56,8,0,TAU); g.fill(); }
    g.fillStyle='#555'; g.fillRect(x-3,y-170,6,100);
    for(let i=0;i<8;i++){ g.fillStyle=i%2?'#ff7aa8':'#ffffff'; g.beginPath(); g.moveTo(x,y-200); g.lineTo(x-90+i*22.5,y-160); g.lineTo(x-90+(i+1)*22.5,y-160); g.closePath(); g.fill(); }
    g.fillStyle='#1b1b1b'; for(const q of [-50,50]){ g.beginPath(); g.arc(x+q,y,9,0,TAU); g.fill(); }
    g.save(); g.font=`900 14px ${SANS}`; g.textAlign='center'; g.fillStyle='#e91e63'; g.fillText('ICE CREAM',x,y-22); g.restore(); }

  // ───────── FRIEND + TAY BÓNG TỐI ─────────
  // tay bóng tối: chép đúng nét từ Prologue (film-l2pro.js shadowArm) — cùng bộ ảnh tay Scared Hamster → cổ tay khớp bề ngang ảnh, gốc chìm khói
  const HAND_META={hFist:{w:321,h:192,wy:103.5,ww:91,fo:205}, hLunge:{w:382,h:315,wy:167,ww:90,fo:134}, hClose:{w:333,h:238,wy:107.5,ww:91,fo:117}};
  function shadowArm(g,t,x0,y0,x1,y1,k,wd,seed,pose,o={}){ if(k<=0.02) return; const im=IM[pose], m=HAND_META[pose]; if(!im||!im.complete||!im.naturalWidth||!m) return;
    const sc=wd/(m.ww*0.97), dx=x1-x0, dy=y1-y0, L0=Math.hypot(dx,dy)||1, ang=Math.atan2(dy,dx), ux=dx/L0, uy=dy/L0, nx=-uy, ny=ux;
    const rx=x0+dx*k, ry=y0+dy*k, off=m.fo*sc, W0={x:rx-ux*off, y:ry-uy*off}, Lf=wd*1.3, bend=(o.bend||0.2)*L0*k;
    const P=[{x:x0,y:y0}, {x:lerp(x0,W0.x,0.5)+nx*bend+Math.sin(t*1.7+seed)*wd*0.6, y:lerp(y0,W0.y,0.5)+ny*bend+Math.cos(t*1.3+seed)*wd*0.6}, {x:W0.x-ux*Lf, y:W0.y-uy*Lf}, {x:W0.x+ux*wd*0.12, y:W0.y+uy*wd*0.12}];
    if(Math.hypot(W0.x-x0,W0.y-y0)<Lf*1.5) P.splice(1,1);
    const D=[]; for(let i=0;i<P.length-1;i++){ const p0=P[Math.max(0,i-1)], p1=P[i], p2=P[i+1], p3=P[Math.min(P.length-1,i+2)], sg=Math.max(2,Math.ceil(Math.hypot(p2.x-p1.x,p2.y-p1.y)/4));
      for(let j=0;j<sg;j++){ const q=j/sg, q2=q*q, q3=q2*q;
        D.push({x:0.5*(2*p1.x+(-p0.x+p2.x)*q+(2*p0.x-5*p1.x+4*p2.x-p3.x)*q2+(-p0.x+3*p1.x-3*p2.x+p3.x)*q3), y:0.5*(2*p1.y+(-p0.y+p2.y)*q+(2*p0.y-5*p1.y+4*p2.y-p3.y)*q2+(-p0.y+3*p1.y-3*p2.y+p3.y)*q3)}); } }
    D.push(P[P.length-1]); const n=D.length; if(n<2) return;
    const S=[0]; for(let i=1;i<n;i++) S.push(S[i-1]+Math.hypot(D[i].x-D[i-1].x,D[i].y-D[i-1].y)); const L=S[n-1]||1;
    const C=[], N=[], Wd=[];
    for(let i=0;i<n;i++){ const p=D[Math.max(0,i-1)], q=D[Math.min(n-1,i+1)], ddx=q.x-p.x, ddy=q.y-p.y, l=Math.hypot(ddx,ddy)||1, mx=-ddy/l, my=ddx/l;
      const s=S[i], toW=L-s, damp=Math.min(1,s/(wd*1.5))*clamp((toW-Lf*1.1)/(Lf*1.5),0,1), ow=wd*0.22*damp*Math.sin(t*2.2+(1-s/L)*4.5+seed);
      C.push({x:D[i].x+mx*ow, y:D[i].y+my*ow}); N.push({x:mx,y:my});
      const flare=1+0.6*Math.max(0,1-s/(wd*2)), mid=1+0.12*Math.sin(Math.PI*Math.min(1,s/Math.max(1,L-Lf))), wr=Math.min(1,toW/Lf), jit=(Math.sin(s*0.09+seed*3)*0.55+Math.sin(s*0.23+seed*7)*0.3)*wd*0.035;
      Wd.push(wd*0.5*(wr*flare*mid+(1-wr))+jit*wr); }
    const A=o.a==null?1:o.a; g.save(); g.globalAlpha=A;
    g.globalCompositeOperation='lighter'; for(let i=0;i<n;i+=6) blob(g,C[i].x,C[i].y,Wd[i]*3.2,'90,30,180',0.08);
    g.globalCompositeOperation='source-over'; g.globalAlpha=A; g.fillStyle='#050505'; g.beginPath();
    for(let i=0;i<n;i++){ const j=Math.sin(S[i]*0.17+seed*5)*wd*0.02; const x=C[i].x+N[i].x*(Wd[i]+j), y=C[i].y+N[i].y*(Wd[i]+j); i?g.lineTo(x,y):g.moveTo(x,y); }
    for(let i=n-1;i>=0;i--){ const j=Math.sin(S[i]*0.15+seed*9)*wd*0.02; g.lineTo(C[i].x-N[i].x*(Wd[i]+j), C[i].y-N[i].y*(Wd[i]+j)); }
    g.closePath(); g.fill();
    g.lineCap='round'; const step=wd*0.42, rows=[-0.62,-0.34,-0.08,0.2,0.46,0.7];
    for(let r=0;r<rows.length;r++) for(let b=0;b*step<L-wd*0.2;b++){ const hv=hash(b*7.3+r*13.1+seed*29); if(hv<0.74) continue;
      const s0=b*step+hash(b+7+r*3)*step*0.5, s1=s0+wd*(0.14+0.22*hash(b+r*5+3)); if(s0<wd*0.9) continue;
      let i0=0; while(i0<n-1 && S[i0]<s0) i0++; let i1=i0; while(i1<n-1 && S[i1]<s1) i1++; if(i1<=i0) continue;
      const cc=165+(hv*40|0); g.strokeStyle=`rgba(${cc},${cc},${cc+5},${0.12+0.22*hv})`; g.lineWidth=Math.max(0.6,wd*(0.012+0.018*hv));
      g.beginPath(); for(let i=i0;i<=i1;i++){ const ow=rows[r]*Wd[i]; const x=C[i].x+N[i].x*ow, y=C[i].y+N[i].y*ow; i>i0?g.lineTo(x,y):g.moveTo(x,y); } g.stroke(); }
    if(o.root){ const cut=Math.min(L*0.7,o.root);   // gốc tay chìm vào mây đen trên trời, không có mép cắt
      for(let i=0;i<n;i+=2){ if(S[i]>cut) break; const f=S[i]/cut; blob(g,C[i].x,C[i].y,Wd[i]*2.4+wd*(2.2-1.6*f),'8,2,14',0.95*Math.pow(1-f,1.3)); } }
    g.globalAlpha=A; g.translate(W0.x,W0.y); g.rotate(ang); g.scale(sc,sc*(o.mir||1)); g.drawImage(im,0,-m.wy,m.w,m.h);
    g.restore(); }
  // Friend che trời: ảnh pixel gốc (anh dặn: Friend chỉ dùng dạng gốc, giữ nét điểm ảnh) + mắt loé
  function friendSky(g,cx,cy,w,a,eye){ const R=pic(g,'fr',cx,cy,w*1.06,{ax:0.5,ay:0.5,pixel:true,a}); if(!R||eye<=0) return;
    const ex=cx+(0.565-0.5)*R.w, ey=cy+(0.28-0.5)*R.h, px=cx+(0.72-0.5)*R.w;
    g.save(); g.globalCompositeOperation='lighter'; blob(g,ex,ey,R.w*0.09,'255,230,60',eye*0.9); blob(g,px,ey,R.w*0.09,'255,120,200',eye*0.9);
    g.globalAlpha=eye*0.6; g.drawImage(glow('255,240,160'),ex-R.w*0.4,ey-R.w*0.01,R.w*0.8,R.w*0.02); g.restore(); }
  // ánh lửa đỏ cam hắt lên từ thành phố cháy, phủ phần dưới thân Friend → dãy nhà nổi rõ trên nền
  function hazeBelow(g,y){ const gr=g.createLinearGradient(0,y-160,0,y+260); gr.addColorStop(0,'rgba(120,20,20,0)'); gr.addColorStop(0.5,'rgba(170,40,25,0.75)'); gr.addColorStop(1,'rgba(230,90,30,0.95)'); g.fillStyle=gr; g.fillRect(-600,y-160,2200,700); }
  // khói / bụi / lửa / mảnh vỡ
  function smoke(g,x,y,r,a,col){ blob(g,x,y,r,col||'40,34,36',a); }
  function fire(g,x,y,r,t,seed){ g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<5;i++){ const f=(t*1.6+H(seed,i))%1; blob(g,x+(H(seed+1,i)-0.5)*r,y-f*r*1.4,r*(0.7-0.5*f),i%2?'255,120,30':'255,200,80',0.6*(1-f)); } g.restore(); }
  function chunks(g,x,y,t,n,seed,sp,col){ if(t<0) return; for(let i=0;i<n;i++){ const a=-Math.PI*(0.1+0.8*H(seed,i)), v=sp*(0.5+H(seed+1,i)), gx=Math.cos(a)*v*t, gy=Math.sin(a)*v*t+300*t*t, s=3+7*H(seed+2,i);
      g.save(); g.translate(x+gx,y+gy); g.rotate(t*6*(H(seed+3,i)-0.5)); g.fillStyle=col||(i%3?'#6b6560':'#9a948c'); g.fillRect(-s/2,-s/2,s,s*0.7); g.restore(); } }
  function glass(g,x,y,t,n,seed){ if(t<0) return; g.save(); for(let i=0;i<n;i++){ const a=TAU*H(seed,i), v=180+260*H(seed+1,i), s=3+5*H(seed+2,i);
      g.globalAlpha=Math.max(0,1-t*1.2); g.fillStyle=i%2?'rgba(200,235,255,0.9)':'rgba(255,255,255,0.8)'; g.beginPath(); const px=x+Math.cos(a)*v*t, py=y+Math.sin(a)*v*t+200*t*t;
      g.moveTo(px,py); g.lineTo(px+s,py+s*0.4); g.lineTo(px+s*0.2,py+s); g.closePath(); g.fill(); } g.restore(); }
  function ring(g,x,y,t,R,col){ if(t<0||t>1) return; g.save(); g.globalAlpha=(1-t)*0.8; g.strokeStyle=col||'rgba(255,240,220,1)'; g.lineWidth=10*(1-t); g.beginPath(); g.ellipse(x,y,R*E.eout(t),R*E.eout(t)*0.28,0,0,TAU); g.stroke(); g.restore(); }

  // ───────── CẢNH ─────────
  const memesOnStreet=[['chill',700,'walk'],['doge',980,'sit'],['cheems',1260,'bench'],['capy',1820,'cross']];
  // phố bình yên: người đi 2 chiều, xe chạy, meme quen trên phố
  function townLife(g,t,y0,dark,panic){ const tw=K.twos(t);
    for(let i=0;i<14;i++){ const dir=H(5,i)<0.5?1:-1, sp=(28+22*H(6,i))*(panic?4:1)*(panic?-1:dir), x0=-200+170*i+60*H(7,i), x=x0+sp*(panic?tw-T.d2:tw), yy=y0+6+16*H(8,i);
      person(g,x,yy,90+20*H(9,i),i,tw*(panic?16:7)+i,{dir:panic?-1:dir,run:panic,scream:panic}); }
    for(let i=0;i<5;i++){ const dir=i%2?1:-1, x=((i*600+dir*tw*160)%3200+3200)%3200-400; car(g,x,y0+(dir>0?92:150),110,CARC[i],dir); } }
  function scStreet(g,t){ const k=seg(t,0,7), cx=lerp(300,980,E.eio(k)), y0=400;
    cam(g,cx,300,1); sky(g,t,0,0);
    skyline(g,cx,0.2,y0-20,3,60,140,240,40,60,'#9fb6cf','rgba(255,255,255,0.35)',0.25,{cw:4,ch:6,gx:4,gy:6});
    skyline(g,cx,0.5,y0-8,7,50,180,260,60,80,'#7d93ad','#fff4c2',0.3);
    shops(g,y0,-600,3000); for(let x=-500;x<3000;x+=260) tree(g,x,y0+6,1); for(let x=-380;x<3000;x+=330) lamp(g,x,y0+4);
    street(g,y0);
    // meme quen trên phố
    const tw=K.twos(t);
    pic(g,'chill',700+tw*38,y0+20,96,{a:1}); pic(g,'doge',980,y0+18,70); pic(g,'cheems',1260,y0+14,64); pic(g,'capy',1820-tw*30,y0+128,60,{flip:true});
    townLife(g,t,y0,0,false);
    stand(g,1500,y0+30); }
  function scStand(g,t){ const u=t-T.stand, y0=400, cx=1440+u*6, z=1.45;
    cam(g,cx,330,z); sky(g,t,0,0); skyline(g,cx,0.5,y0-8,7,50,180,260,60,80,'#7d93ad','#fff4c2',0.3); shops(g,y0,800,2200); street(g,y0);
    stand(g,1500,y0+30);
    pic(g,'corn',1560,y0-36,58,{flip:true});   // người bán kem = Cornelius nằm trên quầy
    const walk=1-seg(u,0,1.4), kx=1430-walk*120, hasIce=u>1.6; kid(g,kx,y0+40,70,{ice:hasIce,walk:walk>0});
    if(u>1.2&&u<1.7){ g.save(); g.translate(lerp(1565,kx+14,seg(u,1.2,1.7)),y0-26); iceCone(g,0.7); g.restore(); }
    if(hasIce){ const h=Math.abs(Math.sin((u-1.6)*6))*6*(1-seg(u,2.6,3.4)); }
    person(g,1250+u*30,y0+30,96,5,K.twos(t)*7,{dir:1}); person(g,1700-u*35,y0+36,92,1,K.twos(t)*7+2,{dir:-1}); }
  function scShadow(g,t){ const u=t-T.shadow, y0=400, z=1.15, cx=1460;
    cam(g,cx,300,z); const k=seg(t,T.shadow,T.shadow+1.6);
    sky(g,t,k*0.7,0); skyline(g,cx,0.2,y0-20,3,60,140,240,40,60,'#9fb6cf','rgba(255,255,255,0.35)',0.25,{cw:4,ch:6,gx:4,gy:6}); skyline(g,cx,0.5,y0-8,7,50,180,260,60,80,'#7d93ad','#fff4c2',0.3);
    shops(g,y0,600,2400); street(g,y0); stand(g,1500,y0+30);
    const look=u>1.2; kid(g,1450,y0+40,70,{ice:true,look});
    pic(g,'corn',1560,y0-36,58,{flip:true});
    for(let i=0;i<6;i++){ const x=1150+i*110, f=u<1+i*0.12; person(g,x+(f?u*30:30+i*3),y0+28+(i%2)*14,94,i+2,f?K.twos(t)*7:0,{dir:i%2?-1:1}); }
    // bóng đen trùm từ phải sang trái, mép mềm
    const ex=lerp(2600,600,k); const gr=g.createLinearGradient(ex-260,0,ex+40,0); gr.addColorStop(0,'rgba(10,4,16,0)'); gr.addColorStop(1,'rgba(10,4,16,0.78)');
    g.fillStyle=gr; g.fillRect(ex-260,-600,300,1400); g.fillStyle='rgba(10,4,16,0.78)'; g.fillRect(ex+40,-600,3000,1400); }
  function scCry(g,t){ const u=t-T.cry, y0=400;
    if(t<T.splat){ const z=2.6, cx=1450, cy=lerp(372,380,u);
      cam(g,cx,cy,z,(hash(Math.floor(t*30))-0.5)*0.01*(u>0.4?1:0)); sky(g,t,0.75,0); shops(g,y0,1100,1800); street(g,y0);
      g.fillStyle='rgba(10,4,16,0.7)'; g.fillRect(800,-600,1400,1400);
      const cr=u>0.4; kid(g,1450,y0+40,70,{look:!cr,cry:cr,ice:!cr});
      if(cr){ const f=seg(u,0.45,1.6), cy2=y0-26+f*f*70; g.save(); g.translate(1480,cy2); iceCone(g,0.7,f*4); g.restore(); } }
    else { const v=t-T.splat; cam(g,1460,y0+48,3.4); street(g,y0); g.fillStyle='rgba(10,4,16,0.65)'; g.fillRect(1200,200,600,400);
      g.fillStyle='#ffd1e1'; g.beginPath(); g.ellipse(1462,y0+50,14+8*E.eout(seg(v,0,0.2)),5,0,0,TAU); g.fill(); g.fillStyle='#fff3c4'; g.beginPath(); g.ellipse(1456,y0+49,8,3,0,0,TAU); g.fill();
      g.save(); g.translate(1474,y0+44); iceCone(g,0.7,2.2); g.restore();
      for(let i=0;i<6;i++){ const a=-Math.PI*(0.15+0.7*H(9,i)), d=E.eout(seg(v,0,0.3))*18; g.fillStyle='#ffd1e1'; g.beginPath(); g.arc(1462+Math.cos(a)*d,y0+48+Math.sin(a)*d*0.5,1.8,0,TAU); g.fill(); } } }
  // nhìn từ dưới phố NGƯỚC lên: các toà cao tầng chụm về đỉnh, Friend che kín trời
  function scReveal(g,t){ const u=t-T.reveal, z=lerp(1.35,1,E.eout(seg(u,0,5))), rr=(t>T.roar&&t<T.roar+1.4)?(hash(Math.floor(t*40))-0.5)*0.02:0;
    cam(g,480,300+u*4,z,rr); sky(g,t,0.35,0.55);
    const ey=seg(t,T.reveal+0.6,T.reveal+1.4); friendSky(g,480,330,760,1,ey*(1+0.4*Math.sin(t*7)));   // mắt Friend ở ~y130: mặt nằm giữa khoảng trời giữa 2 dãy nhà
    // toà nhà nhìn ngước: hình thang chụm về điểm tụ trên cao
    const vx=480, vy=-900;
    for(let i=0;i<8;i++){ const side=i<4?-1:1, k=(i%4), bx=vx+side*(330+k*140), w=120+30*H(31,i), base=700, topK=0.42+0.08*k;
      const x0=bx-w/2, x1=bx+w/2, tx0=lerp(x0,vx,topK), tx1=lerp(x1,vx,topK), ty=lerp(base,vy,topK);
      g.fillStyle=`hsl(220,12%,${12+k*4}%)`; g.beginPath(); g.moveTo(x0,base); g.lineTo(tx0,ty); g.lineTo(tx1,ty); g.lineTo(x1,base); g.closePath(); g.fill();
      g.fillStyle='rgba(255,200,120,0.35)'; for(let r=0;r<10;r++){ const f=r/10, yy=lerp(base,ty,f), xa=lerp(x0,tx0,f), xb=lerp(x1,tx1,f); for(let q=0;q<3;q++) if(H(i*13+r,q)<0.4) g.fillRect(lerp(xa,xb,0.15+q*0.27),yy-6,(xb-xa)*0.14,5); } }
    g.fillStyle='rgba(0,0,0,0.35)'; g.fillRect(-400,560,1800,400);
    if(t>T.roar){ const k=seg(t,T.roar,T.roar+0.6); g.save(); g.globalCompositeOperation='lighter'; blob(g,480,200,700*k,'120,20,60',0.25*(1-seg(t,T.roar+0.6,T.roar+2))); g.restore(); } }
  // tàn phá: nhiều khung cắt nhanh
  function cityRuin(g,cx,y0,red,lit){ sky(g,0,0.15,red);
    skyline(g,cx,0.25,y0-20,3,60,140,240,40,60,'#3a2830','rgba(255,150,80,0.5)',lit*0.6,{cw:4,ch:6,gx:4,gy:6});
    skyline(g,cx,0.6,y0-8,7,50,200,300,60,80,'#2a1e24','rgba(255,170,90,0.7)',lit,{}); }
  function scD1(g,t){ const u=t-T.d1, y0=470; cam(g,480,240,1.0+u*0.03); cityRuin(g,480,y0,0.8,0.35);
    friendSky(g,480,330,900,1,0.8); hazeBelow(g,260);
    const A=[[0.2,180,250],[0.55,720,310],[0.95,420,280]];
    for(const [d,x,y] of A){ const k=E.ein(seg(u,d,d+0.35)); shadowArm(g,t,x+(x<480?-120:120),-260,x,y,k,46,x*0.01,'hFist',{root:200});
      if(u>d+0.35){ const v=u-d-0.35; chunks(g,x,y,v,14,x,260); smoke(g,x,y-20,60+v*120,0.6*(1-seg(v,0.8,2))); fire(g,x,y,40,t,x); } }
    g.fillStyle='#0d0709'; g.fillRect(-200,y0,1400,200); }
  function scD2(g,t){ const u=t-T.d2, y0=400; cam(g,900-u*80,300,1.25,-0.03); cityRuin(g,900,y0,0.6,0.25); shops(g,y0,200,1800); street(g,y0);
    g.fillStyle='rgba(30,8,10,0.35)'; g.fillRect(-200,-600,2400,1400);
    townLife(g,t,y0,0.4,true);
    pic(g,'dogeS',900-u*260,y0+120,90,{flip:true});   // Doge hoảng sợ chạy giữa đám đông
    for(let i=0;i<4;i++) smoke(g,500+i*260,y0-40,140,0.35); }
  function scD3(g,t){ const u=t-T.d3; cam(g,480,270,1.1+u*0.12);
    g.fillStyle='#4a5260'; g.fillRect(-200,-200,1400,1000);   // mặt toà nhà sát máy
    for(let j=0;j<9;j++) for(let i=0;i<12;i++){ const x=40+i*80, y=20+j*62; const near=Math.hypot(x+30-480,y+25-280)<160*E.eout(seg(u,0.25,0.5));
      g.fillStyle=near?'#100810':'#9fc3e6'; g.fillRect(x,y,58,44); g.fillStyle='rgba(255,255,255,0.15)'; g.fillRect(x,y,58,6); }
    const k=seg(u,0.2,0.45); if(k>0){ g.save(); g.fillStyle='#08040a'; g.beginPath(); g.arc(480,280,170*E.eout(k),0,TAU); g.fill(); g.restore();
      shadowArm(g,t,480,-300,480,300,Math.min(1,0.4+k),110,4.2,'hFist',{root:250,a:1}); }
    glass(g,480,280,u-0.25,60,7); chunks(g,480,300,u-0.25,22,8,420,'#7d8590'); }
  function scD4(g,t){ const u=t-T.d4, y0=400; cam(g,960,320,1.15,0.04); cityRuin(g,960,y0,0.7,0.3); shops(g,y0,300,1800); street(g,y0);
    g.fillStyle='rgba(30,8,10,0.4)'; g.fillRect(-200,-600,2400,1400);
    const k=E.ein(seg(u,0.1,0.42)); shadowArm(g,t,1150,-400,960,y0+120,k,90,6.1,'hFist',{root:260});
    const v=u-0.42; if(v>0){ ring(g,960,y0+120,seg(v,0,0.7),520); chunks(g,960,y0+110,v,30,11,360,'#555');
      car(g,760-v*300,y0+120-Math.sin(Math.min(1,v*1.6)*Math.PI)*160,110,CARC[0],1,-v*4); car(g,1180+v*320,y0+150-Math.sin(Math.min(1,v*1.4)*Math.PI)*190,110,CARC[1],-1,v*5);
      smoke(g,960,y0+80,90+v*200,0.6*(1-seg(v,1,2))); }
    else { car(g,760,y0+120,110,CARC[0],1); car(g,1180,y0+150,110,CARC[1],-1); }
    for(let i=0;i<5;i++) person(g,700+i*120-(u*200),y0+60+(i%2)*30,92,i,K.twos(t)*16,{dir:-1,run:true,scream:true}); }
  function scD5(g,t){ const u=t-T.d5; cam(g,480,260,1.05,0.0); sky(g,t,0.2,0.85);
    // nhìn chéo từ trên cao: các khối nhà dạng hộp, tay đâm xuống khắp nơi, lửa
    for(let j=0;j<6;j++) for(let i=0;i<9;i++){ const x=-60+i*130+(j%2)*60, y=120+j*80, h=40+70*H(i,j), w=90;
        g.fillStyle=`hsl(15,10%,${14+8*H(j,i)}%)`; g.fillRect(x,y-h,w,h); g.fillStyle=`hsl(15,10%,${24+8*H(j,i)}%)`; g.beginPath(); g.moveTo(x,y-h); g.lineTo(x+18,y-h-12); g.lineTo(x+w+18,y-h-12); g.lineTo(x+w,y-h); g.closePath(); g.fill();
        if(H(i+20,j)<0.25) fire(g,x+w/2,y-h-6,30,t,i*9+j); }
    for(let i=0;i<9;i++){ const d=i*0.18, x=80+i*100+40*H(i,3), y=160+300*H(i,4), k=E.ein(seg(u,d,d+0.3));
      shadowArm(g,t,x+(H(i,5)-0.5)*300,-300,x,y,k,34,i*1.7,'hFist',{root:160}); if(u>d+0.3) smoke(g,x,y-10,40+(u-d)*60,0.5); }
    g.save(); g.globalCompositeOperation='lighter'; blob(g,480,520,600,'255,90,30',0.3); g.restore(); }
  function scD6(g,t){ const u=t-T.d6, y0=470; cam(g,480,250,1.05); cityRuin(g,480,y0,0.75,0.3);
    // toà tháp gãy ngang, đổ nghiêng
    const k=E.ein(seg(u,0.3,1.8)), bx=520, bw=130, bh=420, crack=y0-170;
    g.fillStyle='#2c2226'; g.fillRect(bx-bw/2,crack,bw,y0-crack);
    g.save(); g.translate(bx+bw/2,crack); g.rotate(k*0.9); g.fillStyle='#352a2e'; g.fillRect(-bw,-(bh-170),bw,bh-170);
    for(let j=0;j<10;j++) for(let i=0;i<4;i++) if(H(i,j)<0.5){ g.fillStyle='rgba(255,170,90,0.6)'; g.fillRect(-bw+10+i*30,-(bh-170)+12+j*24,16,12); } g.restore();
    shadowArm(g,t,820,-300,bx+bw/2,crack+10,clamp(1-seg(u,0.4,1.2),0,1)*1,70,2.3,'hFist',{root:220});
    smoke(g,bx,crack,80+u*90,0.55); if(u>1.6){ const v=u-1.6; smoke(g,bx-260,y0-40,120+v*260,0.7*(1-seg(v,1.2,2.2))); chunks(g,bx-200,y0-60,v,24,13,300); }
    g.fillStyle='#0d0709'; g.fillRect(-200,y0,1400,200); }
  function scD7(g,t){ const u=t-T.d7, y0=480; cam(g,480,240,1.12-u*0.04); cityRuin(g,480,y0,0.95,0.2);
    friendSky(g,480,340,1000,1,1); hazeBelow(g,250);
    for(let i=0;i<6;i++){ const x=60+i*170, y=320+60*H(i,8); shadowArm(g,t,x+(i-2.5)*60,-260,x,y,1,36+10*H(i,9),i*2.1,'hFist',{root:180}); }
    for(let i=0;i<10;i++){ const x=40+i*100; fire(g,x,y0-30*H(i,1),60,t,i*3); smoke(g,x,y0-160-80*H(i,2),120,0.4); }
    g.fillStyle='#0b0507'; g.fillRect(-200,y0,1400,200); }
  // nóc nhà: 5 bóng Akatsuki — ẢNH NHÓM anh vẽ (FIN_AKA_GROUP: Chud · Bat · Depressed từ ảnh 5 con, Ninja + Mlem thay bằng 2 con ở ảnh 4, anh dặn 5/11)
  //   lộ diện lần lượt TRÁI → PHẢI: mỗi con 1 vùng cắt (toạ độ ảnh nhóm 1472×987)
  const AKA_W=1472, AKA_H=987;
  const AKA=[['DOORBELL CHUD',[[0,0],[300,0],[300,987],[0,987]]],['BAT CAT',[[300,0],[590,0],[590,987],[300,987]]],['DEPRESSED CAT',[[590,0],[925,0],[925,987],[590,987]]],
    ['NINJA CAT',[[925,0],[1235,0],[1235,215],[1095,215],[1095,987],[925,987]]],['MLEM CAT',[[1235,0],[1472,0],[1472,987],[1095,987],[1095,215],[1235,215]]]];
  const AKA_CX=[150,445,757,1070,1290];
  function akaGroup(g,t,cx,base,h,lit){ pic(g,'akaG',cx,base,h,{dark:1-lit*0.92,rim:['255,60,60',0.7-0.25*lit]}); }
  // 5 KHUNG CHÉO trượt vào theo 5 tiếng vine boom (vẽ toạ độ màn hình): mỗi khung cận mặt 1 con + tên
  const AKA_ONE=[['aChud',0.5,0.1],['aBat',0.55,0.2],['dp',0.6,0.3],['aNinja',0.6,0.24],['aMlem',0.55,0.24]];   // ảnh riêng + tâm mặt (tỉ lệ ảnh)
  function akaStrips(g,t){ if(t<T.booms||t>=T.group+0.25) return; const SK=70, Wd=VW/5;
    for(let i=0;i<5;i++){ const a=T.booms+i*0.6, k=E.eout3(seg(t,a,a+0.22)); if(k<=0) continue; const dir=i%2?1:-1, oy=(1-k)*VH*1.1*dir;
      const xL=i*Wd, eL=i===0?-SK:0, eR=i===4?SK:0, P=[[xL+SK*0.5+eL,0],[xL+Wd+SK*0.5+eR,0],[xL+Wd-SK*0.5+eR,VH],[xL-SK*0.5+eL,VH]];   // khung đầu / cuối phủ kín mép màn hình
      g.save(); g.translate(0,oy); g.beginPath(); P.forEach(([x,y],j)=>j?g.lineTo(x,y):g.moveTo(x,y)); g.closePath(); g.clip();
      const bg=g.createLinearGradient(0,0,0,VH); bg.addColorStop(0,'#2a0408'); bg.addColorStop(1,'#0a0103'); g.fillStyle=bg; g.fillRect(xL-SK,0,Wd+SK*2,VH);
      const [key,fx,fy]=AKA_ONE[i], c=K.prep(IM[key]); if(c){ const dw=(Wd+SK)*1.25, dh=dw*c.sh/c.sw; g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,xL+Wd/2-fx*dw,VH*0.3-fy*dh,dw,dh); }   // mặt nằm ~1/3 trên khung
      const vg=g.createLinearGradient(0,VH*0.55,0,VH); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(0,0,0,0.85)'); g.fillStyle=vg; g.fillRect(xL-SK,0,Wd+SK*2,VH);
      if(t<a+0.08){ g.globalCompositeOperation='lighter'; g.globalAlpha=1-(t-a)/0.08; g.fillStyle='#ff5a4a'; g.fillRect(xL-SK,0,Wd+SK*2,VH); g.globalCompositeOperation='source-over'; g.globalAlpha=1; }
      g.restore();
      g.save(); g.translate(0,oy); g.strokeStyle='#ffffff'; g.lineWidth=3; g.beginPath(); g.moveTo(P[0][0],P[0][1]); g.lineTo(P[3][0],P[3][1]); g.stroke();   // vạch trắng ngăn khung
      g.font=`800 13px ${SANS}`; g.letterSpacing='3px'; g.textAlign='center'; g.fillStyle='#ffecec'; g.shadowColor='rgba(255,40,40,0.9)'; g.shadowBlur=10*SCv; g.fillText(AKA[i][0],xL+Wd/2-SK*0.25,VH*0.84); g.restore(); } }
  // 🔴 chữ MEOWKATSUKI giới thiệu nhóm — nằm LỚP DƯỚI CÙNG sau lưng cả nhóm (anh dặn: bọn nó đè lên chữ 1 chút), đập vào từng chữ + mây đỏ Akatsuki 2 bên
  function akaCloud(g,x,y,s,a){ if(a<=0) return; g.save(); g.globalAlpha=a; g.translate(x,y); g.scale(s,s);
    const lobes=[[-34,6,20],[-12,-10,24],[14,-12,22],[34,4,18],[0,10,22]];
    g.fillStyle='#ffffff'; for(const [lx,ly,r] of lobes){ g.beginPath(); g.arc(lx,ly,r+5,0,TAU); g.fill(); }
    g.fillStyle='#c8141e'; for(const [lx,ly,r] of lobes){ g.beginPath(); g.arc(lx,ly,r,0,TAU); g.fill(); }
    g.strokeStyle='rgba(255,255,255,0.9)'; g.lineWidth=2.5; for(const [lx,ly,r] of [[-12,-10,12],[14,-12,11]]){ g.beginPath(); g.arc(lx,ly+4,r,Math.PI*1.1,Math.PI*1.9); g.stroke(); }
    g.restore(); }
  function meowkatsuki(g,t,cx,cy){ const v=t-T.akaT; if(v<0) return; const TX='MEOWKATSUKI', n=TX.length;
    g.save(); g.font=`italic 900 64px ${SANS}`; g.textBaseline='middle'; g.letterSpacing='3px'; const tw=g.measureText(TX).width; const cws=[...TX].map(ch=>g.measureText(ch).width+4), TW=cws.reduce((a,b)=>a+b,0); let x=cx-TW/2;
    // vầng đỏ phía sau chữ
    g.save(); g.globalCompositeOperation='lighter'; blob(g,cx,cy,tw*0.7,'200,20,30',0.45*seg(v,0,0.4)); g.restore();
    for(let i=0;i<n;i++){ const ch=TX[i], cw=g.measureText(ch).width+4, d=i*0.045, k=seg(v,d,d+0.16), sc=lerp(2.4,1,E.eout(k)), a=k;
      if(a>0){ g.save(); g.translate(x+cw/2,cy); g.scale(sc,sc); g.globalAlpha=a; g.lineJoin='round';
        g.lineWidth=12; g.strokeStyle='#0a0204'; g.strokeText(ch,-cw/2+2,4);
        g.lineWidth=5.5; g.strokeStyle='#ffffff'; g.strokeText(ch,-cw/2+2,0);
        const gr=g.createLinearGradient(0,-34,0,34); gr.addColorStop(0,'#ff4a3a'); gr.addColorStop(0.55,'#c8141e'); gr.addColorStop(1,'#6a0610'); g.fillStyle=gr; g.fillText(ch,-cw/2+2,0);
        if(k<1){ g.globalCompositeOperation='lighter'; g.globalAlpha=(1-k)*0.8; g.fillStyle='#fff'; g.fillText(ch,-cw/2+2,0); }   // loé trắng lúc chữ đập xuống
        g.restore(); } x+=cw; }
    g.restore();
    const ck=E.eout(seg(v,0.55,1.1)); akaCloud(g,cx-TW/2-60-30*(1-ck),cy-4,0.95,ck); akaCloud(g,cx+TW/2+60+30*(1-ck),cy-4,0.95,ck);   // mây Akatsuki 2 bên
  }
  // 💬 THOẠI (anh viết 5/11): Mlem hỏi → Depressed đáp → "know pain". [đầu, cuối, ai nói, câu]
  const DIALOG=[[37.9,40.4,'MLEM CAT',"Leader… is this truly the right time to release it?"],
    [40.6,43.0,'MLEM CAT',"The Godly Memes have been gone for thousands of years."],
    [43.2,46.1,'MLEM CAT',"Once it absorbs enough power, no one will be able to stop it."],
    [46.6,48.8,'DEPRESSED CAT',"We hold a fragment of its soul."],
    [49.0,52.1,'DEPRESSED CAT',"As long as it remains incomplete… it will always be under our control."],
    [52.4,55.4,'DEPRESSED CAT',"Let's go. Let this world… and this universe… know pain."]];
  const SPK={'MLEM CAT':{col:'255,214,120',eyes:[],eye:'255,230,150',cx:560},   // anh dặn: lúc thoại chỉ là bóng đen, KHÔNG loé mắt Mlem — riêng Depressed loé Rinnegan
   'DEPRESSED CAT':{col:'190,150,255',eyes:[[736,405],[852,405]],eye:'170,110,255',cx:480}};
  const speaking=t=>{ for(const d of DIALOG) if(t>=d[0]-0.2&&t<d[1]+0.15) return d; return null; };
  // 🏙️ NÓC NHÀ = ẢNH POSE anh vẽ (FIN_AKA_POSE 1671×931, góc ngước, 5 con trên bệ đá) phủ kín khung (world 0..960 × 5.7..540).
  //    Tách lớp từng con (vùng chữ nhật, vẽ sau đè trước) để THỞ / nghiêng / gật đầu khi nói; dải băng đầu Ninja bay phần phật; bệ đá đứng yên ở lớp trước.
  const PK=960/1671, PY0=10*PK;   // ảnh px → world
  const PL=[   // [tên, vùng x,y,w,h (px ảnh), điểm neo chân (px ảnh), pha]
    ['NINJA',1150,0,521,900,1480,900,0.3],['MLEM',940,440,460,460,1170,840,1.7],['DEPRESSED',560,0,520,700,830,600,2.9],['CHUD',0,0,340,900,170,880,4.1],['BAT',220,330,440,570,450,860,5.3]];
  const STONE=[[0,790,1671,141],[600,560,460,260]];   // bờ tường + bệ đá: lớp trước, đứng yên
  const RIB=[1150,280,150,150];                          // dải băng đầu Ninja (bay theo gió) — vùng chỉ có băng, không dính đầu
  const _PC={};
  function _pc(){ if(_PC.ok) return _PC; const im=IM.pose; if(!im||!im.complete||!im.naturalWidth) return null; const w=im.naturalWidth, h=im.naturalHeight;
    const mk=f=>{ const c=K.mk(w,h), x=c.getContext('2d'); f(x); return c; }, tint=(src,col)=>mk(x=>{ x.drawImage(src,0,0); x.globalCompositeOperation='source-in'; x.fillStyle=col; x.fillRect(0,0,w,h); });
    const o=mk(x=>x.drawImage(im,0,0)), n=mk(x=>{ x.drawImage(im,0,0); x.clearRect(...RIB); });
    return Object.assign(_PC,{ok:1,o,n,dO:tint(o,'#050206'),dN:tint(n,'#050206'),rO:tint(o,'rgb(255,50,40)'),rN:tint(n,'rgb(255,50,40)')}); }
  // lit: 0 = bóng đen viền đỏ, 1 = đủ màu · talk: con đang nói (gật đầu nhẹ)
  function drawPose(g,t,lit,talk,sc){ const P=_pc(); if(!P) return; const dark=1-lit; g.save(); if(sc){ g.translate(480,545); g.scale(sc,sc); g.translate(-480,-545); }
    const blit=(src,x,y,w,h)=>g.drawImage(src,x,y,w,h,x*PK,PY0+y*PK,w*PK,h*PK);
    const layer=(x,y,w,h,ori)=>{ const B=ori?P.o:P.n, D=ori?P.dO:P.dN, R=ori?P.rO:P.rN;
      if(dark<0.99) blit(B,x,y,w,h); if(dark>0.01){ g.save(); g.globalAlpha=dark; blit(D,x,y,w,h); g.restore(); } };
    if(dark>0.01){ g.save(); g.globalAlpha=dark; for(const [dx,dy] of [[-1.6,0],[1.6,0],[0,-1.6],[0,1]]) g.drawImage(P.rO,dx,PY0+dy,960,P.rO.height*PK); g.restore(); }   // viền đỏ: 1 lần từ nguyên ảnh
    for(const [nm,x,y,w,h,ax,ay,ph] of PL){ const spk=talk===nm, br=1+0.009*Math.sin(t*2.1+ph), rot=0.005*Math.sin(t*1.3+ph)+(spk?0.012*Math.sin(t*5.5):0);
      g.save(); g.translate(ax*PK,PY0+ay*PK); g.rotate(rot); g.scale(1,br); g.translate(-ax*PK,-(PY0+ay*PK)); layer(x,y,w,h,false);
      if(nm==='NINJA'){ const n=12, sw=RIB[2]/n; for(let i=0;i<n;i++){ const fx=RIB[0]+i*sw, amp=(1-(i+0.5)/n)*7, dy=Math.sin(t*9-i*0.7)*amp+Math.sin(t*14-i*1.3)*amp*0.35;   // đầu tự do (trái) bay mạnh, sát đầu đứng yên
          g.save(); g.translate(0,dy); layer(fx,RIB[1],sw+0.6,RIB[3],true); g.restore(); } }
      g.restore(); }
    for(const [x,y,w,h] of STONE) layer(x,y,w,h,false);   // bệ đá: lớp trước, đứng yên (đè lên chân)
    g.restore(); }
  // 🌑 NỀN (anh dặn: ĐEN là chính, kiểu tranh vẽ): bóng toà nhà đen viền đỏ chụm lên trời 2 bên (góc ngước), trăng máu sau đầu thủ lĩnh,
  //    MÂY MÁU đỏ viền sáng trôi trên nền đen (hoạ tiết mây Akatsuki) · dưới bờ tường là mặt tường toà nhà (để cẩu máy lên)
  function bloodCloud(g,x,y,s,a){ if(a<=0) return; g.save(); g.globalAlpha=a; g.translate(x,y); g.scale(s,s);
    const L=[[-60,10,30],[-28,-14,38],[12,-20,34],[46,-4,30],[74,14,22],[-8,18,34],[30,18,30]];
    g.fillStyle='rgba(255,220,220,0.85)'; for(const [lx,ly,r] of L){ g.beginPath(); g.arc(lx,ly,r+4,0,TAU); g.fill(); }
    g.fillStyle='#a3101a'; for(const [lx,ly,r] of L){ g.beginPath(); g.arc(lx,ly,r,0,TAU); g.fill(); }
    g.strokeStyle='rgba(255,200,200,0.55)'; g.lineWidth=3; for(const [lx,ly,r] of [[-28,-6,18],[12,-12,16],[46,4,14]]){ g.beginPath(); g.arc(lx,ly+6,r,Math.PI*1.1,Math.PI*1.9); g.stroke(); }
    g.restore(); }
  function roofSky(g,t,noTower){ g.fillStyle='#050203'; g.fillRect(-1500,-1200,4000,3200);
    { const gr=g.createLinearGradient(0,-200,0,560); gr.addColorStop(0,'rgba(60,4,8,0)'); gr.addColorStop(0.55,'rgba(80,6,10,0.55)'); gr.addColorStop(1,'rgba(130,14,16,0.9)'); g.fillStyle=gr; g.fillRect(-1500,-200,4000,760); }   // sương máu sau lưng nhóm: bóng đen nổi lên trên nền đỏ
    g.save(); g.globalCompositeOperation='lighter'; blob(g,500,90,360,'170,16,14',0.55); g.restore();
    const mg=g.createRadialGradient(470,50,20,500,90,150); mg.addColorStop(0,'#b8301f'); mg.addColorStop(0.6,'#82101a'); mg.addColorStop(1,'#3e0406'); g.fillStyle=mg; g.beginPath(); g.arc(500,90,150,0,TAU); g.fill();   // trăng máu
    g.fillStyle='rgba(50,0,4,0.4)'; for(let i=0;i<8;i++){ g.beginPath(); g.arc(500+(H(i,71)-0.5)*215,90+(H(i,72)-0.5)*215,8+18*H(i,73),0,TAU); g.fill(); }
    for(let i=0;i<6;i++){ const x=((i*260+t*16)%1700)-370, y=-20+70*H(i,74)+(i%2)*160; if(noTower && x>250 && x<710 && y<330) continue; bloodCloud(g,x,y,0.55+0.4*H(i,75),0.92); }   // pose cuối: không cho mây đè lên logo   // mây máu trôi
    // bóng toà nhà 2 bên: đen kịt, viền đỏ, vài ô cửa đỏ mờ — chụm về đỉnh khung (góc ngước)
    if(!noTower) for(const side of [-1,1]) for(let k=0;k<2;k++){ const bx=480+side*(560-k*80), w=140-k*20, base=1200, top=-260+k*90, tw=w*0.55, tx=bx+side*-60*(k+1);
      g.fillStyle='#020101'; g.beginPath(); g.moveTo(bx-w/2,base); g.lineTo(tx-tw/2,top); g.lineTo(tx+tw/2,top); g.lineTo(bx+w/2,base); g.closePath(); g.fill();
      g.strokeStyle='rgba(220,30,30,0.7)'; g.lineWidth=1.2; g.stroke();
      for(let r=0;r<14;r++) for(let q=0;q<3;q++) if(H(k*17+r+side*5,q)<0.18){ const f=r/14, xa=lerp(bx-w/2,tx-tw/2,f), xb=lerp(bx+w/2,tx+tw/2,f), yy=lerp(base,top,f); g.fillStyle='rgba(200,20,20,0.5)'; g.fillRect(lerp(xa,xb,0.2+q*0.25),yy-8,(xb-xa)*0.12,6); } }
    g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<34;i++){ const ph=((t*0.06*(0.5+H(i,75)))+H(i,76))%1, x=960*H(i,77)+Math.sin(t+i)*14, y=560-ph*620; g.globalAlpha=Math.sin(ph*Math.PI)*0.8; g.fillStyle='#ff3a2a'; g.fillRect(x,y,2,2); } g.restore();   // tàn đỏ bay lên
    g.fillStyle='#070304'; g.fillRect(-300,520,1600,1100); g.strokeStyle='rgba(200,25,25,0.6)'; g.lineWidth=2; g.strokeRect(-300,520,1600,1100);   // mặt tường toà nhà dưới bờ tường
    for(let j=0;j<12;j++) for(let i=0;i<14;i++) if(H(i+50,j)<0.3){ g.fillStyle='rgba(180,20,20,0.45)'; g.fillRect(-120+i*90,580+j*70,40,30); } }
  // 🔴 LOGO MEOWKATSUKI theo mẫu anh gửi (logo Akatsuki): chữ cong theo vòng cung trên · vòng 10 nhẫn chữ Hán · mây đỏ giữa có chữ 猫 · EST. 2 bên ·
  //    ORGANIZATION + MEME HUNTERS bên dưới — toàn đỏ trên đen, hiện kiểu đóng dấu
  const RINGS=['零','青','白','朱','空','南','北','三','玉','亥'];
  function emblem(g,t,cx,cy,R,a0){ const v=t-T.akaT; if(v<0) return; const RED='#c41a22';
    g.save(); g.globalAlpha=a0==null?1:a0;
    g.save(); g.globalCompositeOperation='lighter'; blob(g,cx,cy,R*1.6,'150,10,15',0.5*seg(v,0,0.5)); g.restore();
    // chữ cong: mỗi chữ xoay theo góc trên vòng cung, đập vào lần lượt
    const TX='MEOWKATSUKI', n=TX.length, a0r=-Math.PI*0.86, a1r=-Math.PI*0.14;
    g.font=`${Math.round(R*0.3)}px Shojumaru, ${SANS}`; g.textAlign='center'; g.textBaseline='middle';
    for(let i=0;i<n;i++){ const k=seg(v,i*0.04,i*0.04+0.14); if(k<=0) continue; const an=lerp(a0r,a1r,i/(n-1)), sc=lerp(1.8,1,E.eout(k)), rr=R*1.12;
      g.save(); g.translate(cx+Math.cos(an)*rr,cy+Math.sin(an)*rr); g.rotate(an+Math.PI/2); g.scale(sc,sc); g.globalAlpha*=k; g.fillStyle=RED; g.fillText(TX[i],0,0); g.restore(); }
    // vòng 10 nhẫn chữ Hán
    for(let i=0;i<10;i++){ const k=E.eout(seg(v,0.45+i*0.05,0.6+i*0.05)); if(k<=0) continue; const an=-Math.PI/2+i*TAU/10+0.31, x=cx+Math.cos(an)*R*0.72, y=cy+Math.sin(an)*R*0.72, r=R*0.13*k;
      g.save(); g.translate(x,y); g.rotate(an+Math.PI/2); g.fillStyle=RED; g.beginPath(); g.ellipse(0,0,r,r*1.15,0,0,TAU); g.fill();
      g.fillStyle='#120204'; g.beginPath(); g.ellipse(0,0,r*0.68,r*0.78,0,0,TAU); g.fill();
      g.fillStyle=RED; g.font=`900 ${Math.round(r*0.95)}px serif`; g.fillText(RINGS[i],0,1); g.restore(); }
    // mây đỏ giữa + 猫
    const ck=E.eout(seg(v,0.25,0.6)); if(ck>0){ g.save(); g.translate(cx,cy); g.scale(R/160*ck,R/160*ck);
      const L=[[-48,8,26],[-22,-14,32],[12,-18,30],[42,-2,26],[-4,16,30],[26,16,26]]; g.fillStyle=RED; for(const [lx,ly,r] of L){ g.beginPath(); g.arc(lx,ly,r,0,TAU); g.fill(); }
      g.fillStyle='#120204'; g.font='900 40px serif'; g.fillText('猫',0,2); g.restore(); }
    const tk=seg(v,1.0,1.4); if(tk>0){ g.globalAlpha=(a0==null?1:a0)*tk; g.fillStyle=RED; g.font=`${Math.round(R*0.15)}px Shojumaru, ${SANS}`;
      g.fillText('EST.',cx-R*1.02,cy+R*0.36); g.fillText('2026',cx+R*1.02,cy+R*0.36);
 }
    g.restore(); }
  // 🎥 GÓC MÁY từng câu thoại (cắt cứng giữa các shot, trong shot máy trôi): [đầu, cuối, cx0,cy0,z0, cx1,cy1,z1, nghiêng]
  const ROOF_SHOTS=[[37.0,39.2, 480,700,1.0, 480,285,1.0, 0],       // cẩu máy từ tường toà nhà lên: lộ cả nhóm trên bệ đá, trăng máu sau đầu thủ lĩnh
    [39.2,40.5, 660,360,1.8, 656,356,1.92, 0.04],                     // Mlem hỏi (trung cảnh)
    [40.5,43.1, 300,330,1.65, 318,322,1.78, -0.03],                   // Bat Cat tiền cảnh trái, cả nhóm phía sau
    [43.1,46.3, 790,215,1.85, 786,208,2.0, -0.06],                     // góc ngước Ninja, băng đầu bay
    [46.3,48.9, 480,190,1.55, 484,170,1.8, 0],                        // thủ lĩnh trên bệ đá, trăng máu làm hào quang
    [48.9,52.2, 494,100,3.3, 494,98,3.6, 0],                          // cận mắt Rinnegan
    [52.2,55.7, 484,170,2.0, 480,285,1.0, 0]];                        // kéo lùi toàn cảnh: "…know pain"
  const _talkNm=t=>{ const d=speaking(t); return d?(d[2]==='MLEM CAT'?'MLEM':'DEPRESSED'):null; };
  function scRoof(g,t){ const u=t-T.roof;
    if(t<T.group){ let S=ROOF_SHOTS[0]; for(const q of ROOF_SHOTS) if(t>=q[0]) S=q; const k=E.eio(seg(t,S[0],S[1]));
      cam(g,lerp(S[2],S[5],k),lerp(S[3],S[6],k),lerp(S[4],S[7],k),S[8]); roofSky(g,t); drawPose(g,t,0,_talkNm(t));
      let e=0; for(const d of DIALOG) if(d[2]==='DEPRESSED CAT') e=Math.max(e,seg(t,d[0]-0.3,d[0]+0.2)); if(e>0){ e*=0.8+0.2*Math.sin(t*9);   // Rinnegan loé trong bóng đen
        for(const [ex,ey] of [[815,155],[905,155]]){ g.save(); g.globalCompositeOperation='lighter'; blob(g,ex*PK,PY0+ey*PK,9,'170,110,255',e); blob(g,ex*PK,PY0+ey*PK,3,'240,230,255',e); g.restore(); } } }
    else { const v=t-T.group; cam(g,480,265,lerp(1.12,1.0,E.eout(seg(v,0,2.5))),(t>T.akaT&&t<T.akaT+0.6)?(hash(Math.floor(t*40))-0.5)*0.012:0);
      roofSky(g,t,true);
      emblem(g,t,480,175,128);   // LỚP DƯỚI CÙNG: logo MEOWKATSUKI sau lưng — thủ lĩnh đứng đè lên dưới logo
      drawPoseFaded(g,t,0.72); } }
  let _OB=null;
  function drawPoseFaded(g,t,sc){ const Q=Math.max(1,SCv||1), w=Math.ceil(960*Q), h=Math.ceil(545*Q);
    if(!_OB||_OB.width!==w) _OB=K.mk(w,h); const o=_OB.getContext('2d'); o.setTransform(1,0,0,1,0,0); o.globalAlpha=1; o.globalCompositeOperation='source-over'; o.clearRect(0,0,w,h);
    o.setTransform(Q,0,0,Q,0,0); drawPose(o,t,1,null);
    o.globalCompositeOperation='destination-out'; const FW=120;
    for(const [xa,xb] of [[0,FW],[960,960-FW]]){ const gr=o.createLinearGradient(xa,0,xb,0); gr.addColorStop(0,'rgba(0,0,0,1)'); gr.addColorStop(1,'rgba(0,0,0,0)'); o.fillStyle=gr; o.fillRect(Math.min(xa,xb),0,FW,545); }
    { const gr=o.createLinearGradient(0,545,0,465); gr.addColorStop(0,'rgba(0,0,0,1)'); gr.addColorStop(1,'rgba(0,0,0,0)'); o.fillStyle=gr; o.fillRect(0,465,960,80); }
    o.globalCompositeOperation='source-over';
    g.save(); g.translate(480,545); g.scale(sc,sc); g.translate(-480,-545); g.drawImage(_OB,0,0,960,545); g.restore(); }
  const SCENES=[[0,scStreet],[T.stand,scStand],[T.shadow,scShadow],[T.cry,scCry],[T.reveal,scReveal],[T.d1,scD1],[T.d2,scD2],[T.d3,scD3],[T.d4,scD4],[T.d5,scD5],[T.d6,scD6],[T.d7,scD7],[T.roof,scRoof]];

  // ───────── chữ ─────────
  function spaced(g,txt,x,y,font,ls,col,a){ g.save(); g.font=font; g.letterSpacing=ls+'px'; g.textAlign='center'; g.textBaseline='middle'; g.globalAlpha=a; g.fillStyle=col; g.fillText(txt,x+ls/2,y); g.restore(); }
  function friendTitle(g,t){ if(t<T.title||t>T.d1) return; const k=seg(t,T.title,T.title+0.5), out=1-seg(t,T.d1-0.4,T.d1);
    g.save(); g.shadowColor='rgba(170,60,255,0.95)'; g.shadowBlur=24*SCv; spaced(g,'FRIEND',VW/2,300+(1-k)*20,`900 96px ${SERIF}`,30,'#f4ecff',k*out); g.restore(); }
  function akaLine(g,t){ const D=speaking(t); if(!D || t>=T.booms) return; const [a,b,nm,line]=D, al=seg(t,a-0.2,a)*(1-seg(t,b,b+0.15));
    g.save(); g.textAlign='center'; g.textBaseline='middle'; g.globalAlpha=al;
    g.font=`800 12px ${SANS}`; g.letterSpacing='4px'; g.fillStyle=`rgb(${SPK[nm].col})`; g.shadowColor=`rgba(${SPK[nm].col},0.9)`; g.shadowBlur=10*SCv; g.fillText('UNKNOWN MEME',VW/2,VH-78);   // anh dặn: lúc thoại chưa lộ tên thành viên
    g.shadowBlur=0; g.letterSpacing='1px'; g.font=`italic 600 21px ${SERIF}`; const ws=line.split(' '), n=Math.min(ws.length,Math.floor(Math.max(0,t-a)/0.11)+1);
    g.fillStyle='#f4ecff'; g.fillText(ws.slice(0,n).join(' '),VW/2,VH-52); g.restore(); }
  function endCard(g,t){ const v=t-(T.DUR-3.2); if(v<0) return; const k=seg(v,0,0.8);
    spaced(g,'MEME LORE',VW/2,226,`800 14px ${SANS}`,12,'rgb(255,200,200)',k);
    g.save(); g.shadowColor='rgba(255,40,60,0.9)'; g.shadowBlur=16*SCv; spaced(g,'FINAL',VW/2,272,`400 58px ${SERIF}`,18,'#fff2f2',seg(v,0.3,1.1)); g.restore();
    spaced(g,'PART 1',VW/2,322,`800 12px ${SANS}`,10,'rgb(255,200,200)',seg(v,0.7,1.4)); }

  // ───────── tiếng ─────────
  const A='assets/audio/';
  const sfx=[[T.roar-0.14,'fr_titan_roar',0.8],[T.d1+0.55,'l2p_explode',0.55],[T.d1+1.3,'cine_deep_impact',0.5],[T.d3+0.25,'ep3_glass',0.7],[T.d3+0.27,'l2p_crack',0.5],
    [T.d4+0.42,'cine_deep_impact',0.8],[T.d5+0.4,'l2p_explode',0.45],[T.d6+0.3,'l2p_crack',0.6],[T.splat,'cine_impact',0.25],[T.cry+0.4,'cry_banana_cat',0.95]];   // Banana Cat khóc
  for(let i=0;i<5;i++) sfx.push([T.booms+i*0.6,'vine_boom',0.85]);   // 5 tiếng vine boom = 5 khung trượt vào
  sfx.push([T.akaT,'cine_deep_impact',0.8]);   // MEOWKATSUKI đập xuống
  const mus=[
    {src:A+'fin_icecream.mp3', ra:0, rb:T.shadow+0.6, vol:0.32, fo:1.2},                         // nhạc xe kem leng keng: phố bình yên
    {src:A+'fin_city.mp3', ra:0, rb:T.shadow+1, vol:0.3, loop:true, fo:1},                      // tiếng xe cộ
    {src:A+'cine_heart.mp3', ra:T.shadow+0.4, rb:T.reveal+0.4, vol:0.7, fi:0.4, fo:0.4},         // tim đập lúc bóng đen trùm xuống
    {src:A+'cine_ambient_war.mp3', ra:T.reveal, rb:T.roof+0.8, vol:0.55, fi:1, fo:1.2},
    {src:A+'fin_crowd.mp3', ra:T.d1+0.6, rb:T.d7+1, vol:0.45, loop:true, fi:0.5, fo:1},           // đám đông la hét
    {src:A+'fin_collapse.mp3', ra:T.d6+0.6, rb:T.d7+1.5, vol:0.6, fo:0.8},                        // toà nhà sập
    {src:A+'cine_epic.mp3', ra:T.d1, rb:T.roof, vol:0.6, fi:0.3, fo:1.0},
    {src:A+'dp_akatsuki.mp3', ra:T.roof, rb:DUR, vol:0.75, fi:1.2, fo:1.5} ];                     // theme Akatsuki: 5 bóng lộ diện

  CineKit.film({ id:'fin1', title:'Meme Lore · Final — Part 1', VW, VH, DUR,
    imgs:{ fr:'assets/avatars/friend/avatarUrl.webp', hFist:'assets/img/scaredhamster/HAND_fist.webp', hLunge:'assets/img/scaredhamster/HAND_lunge.webp', hClose:'assets/img/scaredhamster/HAND_closing.webp',
      chill:'assets/img/chillguy/CHILLGUY_AVATAR_IMG.webp', doge:'assets/avatars/doge/avatarUrl.webp', cheems:'assets/avatars/cheems/avatarUrl.webp', capy:'assets/avatars/capybara/avatarUrl.webp',
      dogeS:'assets/img/cine/CINE_DOGE_SCARED.webp', dp:'assets/img/depressedcat/DP_PAIN_IMG.webp', chud:'assets/avatars/doorbellchud/avatarUrl.webp', ninja:'assets/avatars/ninjacat/avatarUrl.webp',
      bat:'assets/avatars/batcat/avatarUrl.webp', mlem:'assets/avatars/mlemcat/avatarUrl.webp', akaG:'assets/img/cine/FIN_AKA_GROUP.png', pose:'assets/img/cine/FIN_AKA_POSE.png', aChud:'assets/img/cine/FIN_AKA_CHUD.png', aBat:'assets/img/cine/FIN_AKA_BAT.png', aNinja:'assets/img/cine/FIN_AKA_NINJA.png', aMlem:'assets/img/cine/FIN_AKA_MLEM.png',
      ban:'assets/avatars/bananacat/avatarUrl.webp', banCry:'assets/avatars/bananacat/attackAvatarUrl.webp', corn:'assets/avatars/cornelius/avatarUrl.webp',
      ...Object.fromEntries(CROWD.map((k,i)=>['c'+i,'assets/avatars/'+k+'/avatarUrl.webp'])) },
    sfx, mus, shots:[{t0:0,t1:DUR,a:{}}],
    impact:t=>(t>=T.roar&&t<T.roar+0.05)?'inv':(t>=T.d4+0.42&&t<T.d4+0.48)?'bw':(t>=T.d3+0.25&&t<T.d3+0.3)?'inv':0,
    shake:t=>{ let s=0; const hit=(a,amp,d)=>{ if(t>=a&&t<a+d) s=Math.max(s,amp*(1-(t-a)/d)); };
      hit(T.roar,12,1.6); hit(T.d1+0.55,8,0.8); hit(T.d1+1.3,7,0.8); hit(T.d3+0.25,10,0.6); hit(T.d4+0.42,14,0.9); hit(T.d5+0.4,6,0.8); hit(T.d6+1.6,10,1.2); hit(T.splat,3,0.2); hit(T.akaT,9,0.7);
      if(t>=T.d1&&t<T.roof) s=Math.max(s,1.5); return s; },
    world(F,t){ IM=F.I; TT=t; SCv=F.SC; const g=F.g; let fn=SCENES[0][1]; for(const s of SCENES) if(t>=s[0]) fn=s[1]; g.save(); fn(g,t); g.restore(); },
    post(F,t){ const fx={shocks:[],chroma:0}; const sh=(a,x,y,rm,d,str)=>{ if(t>=a&&t<a+d){ const u=(t-a)/d; fx.shocks.push({sx:x,sy:y,r:20+rm*E.eout(u),w:30,str:str*(1-u)}); fx.chroma=Math.max(fx.chroma,1-u); } };
      sh(T.roar,480,200,600,1.0,26); sh(T.d4+0.42,480,420,520,0.8,24); sh(T.d3+0.25,480,280,420,0.6,20); if(t>=T.reveal&&t<T.d1) fx.chroma=Math.max(fx.chroma,0.15); return fx; },
    screen(F,t){ const g=F.g; SCv=F.SC;
      // cắt cảnh tàn phá: loé trắng ngắn ở mỗi khung mới
      for(const a of [T.d1,T.d2,T.d3,T.d4,T.d5,T.d6,T.d7]) if(t>=a&&t<a+0.06) K.flash(F,0.5*(1-(t-a)/0.06),'#fff');
      if(t>=T.roof-0.4&&t<T.roof+0.6) K.flash(F,1-Math.abs(t-T.roof)/0.6,'#000');
      if(t>=T.group&&t<T.group+0.35) K.flash(F,1-(t-T.group)/0.35,'#fff');   // 5 khung → ảnh nhóm
      if(t>=T.DUR-3.4) K.flash(F,seg(t,T.DUR-3.4,T.DUR-2.8),'#000');
      K.letterbox(F,0.9*(1-seg(t,T.group,T.group+0.6)));
      friendTitle(g,t); akaLine(g,t); akaStrips(g,t); endCard(g,t); } });
})();
