// 🏙️ THÀNH PHỐ ĐÊM TRĂNG MÁU của Meme Lore · Final (11/11/2026) — tách từ js/film-fin1c4.js để 3 TRẬN PHỤ (fin1f1–f3) dùng chung.
//   (fin1c4 vẫn giữ bản riêng trong file của nó — chưa chuyển sang đây để khỏi vỡ phim đã duyệt.)
//   const C=Fin1City({seed, x0, x1, rows, near, collapse:[{x,z,t,r}], fogMul:t=>k});
//   C.BL (toà nhà) · C.pano(F,t,th) phông vẽ GPT · C.drawBuilding(F,b,t,th) · C.draw(F,t,th) = pano + mọi toà · C.TH_NIGHT / TH_RISE / TH_DUST / TH_CLEAR
//   collapse: toà có tâm cách (x,z) < r sẽ ĐỔ ở giây t (đòn mạnh trúng nhà — môi trường phản ứng). b.shakeAt = giây toà rung.
//   Ảnh phim cần nạp: bgR, bgU, bgP (phông) · txN, txD (mặt tiền) — xem FIN1_CITY_IMGS.
(function(){
  if(window.Fin1City) return;
  window.FIN1_CITY_IMGS={ bgR:'assets/img/cine/FIN_BG_RED.webp', bgU:'assets/img/cine/FIN_BG_RUIN.webp', bgP:'assets/img/cine/FIN_BG_PURPLE.webp', txN:'assets/img/cine/FIN_TEX_NIGHT.webp', txD:'assets/img/cine/FIN_TEX_DAY.webp',
    bgPark:'assets/img/cine/FIN_BG_PARK.png', bgBridge:'assets/img/cine/FIN_BG_BRIDGE.png', tree1:'assets/img/cine/FIN_TREE1.png' };
  window.Fin1City=function(o){ o=o||{};
  const K=CineKit, {seg,lerp,clamp,hash}=K, E=K.EASE, eout=E.eout, TAU=Math.PI*2, STY=300;
  const BL=[];
  (function build(){ let sd=(o.seed||1)*1000+1; const x0=o.x0==null?-3200:o.x0, x1=o.x1==null?3200:o.x1, near=o.near||1100, rows=o.rows||3;
    const kind=o.kind||'street'; if(kind==='bridge') return;   // cầu: không có nhà (thành phố chỉ ở phông xa)
    for(const side of (kind==='park'?[1]:[-1,1])) for(let row=0;row<rows;row++){ let x=x0; const z0=(kind==='park'?1500:near)+row*1350;   // công viên: chỉ còn dãy nhà phía xa sau lưng
      while(x<x1){ const w=650+380*hash(sd*1.3), d=700+350*hash(sd*2.1), st=row===0?4+Math.floor(5*hash(sd*3.7)):10+Math.floor(18*Math.pow(hash(sd*4.9),1.3));
        BL.push({x0:x,x1:x+w,z0:side>0?z0:-z0-d,z1:side>0?z0+d:-z0,h:st*STY,st,seed:sd,hue:hash(sd*5.3)}); x+=w+140+260*hash(sd*6.1); sd++; } }
    for(const b of BL){ b.cx=(b.x0+b.x1)/2; b.cz=(b.z0+b.z1)/2; b.ta=Infinity;
      for(const c of (o.collapse||[])) if(Math.hypot(b.cx-c.x,b.cz-c.z)<c.r) b.ta=Math.min(b.ta,c.t+Math.hypot(b.cx-c.x,b.cz-c.z)/(c.v||6000)); } })();
  const fogMix=(c,f,k)=>c.map((v,i)=>Math.round(lerp(v,f[i],k)));
  const AVG=new Map(), PAT=new Map();
  function texAvg(im,y0=0,y1=1){ const key=im.src+'|'+y0+'|'+y1; if(AVG.has(key)) return AVG.get(key); let c=[60,58,66];
    try{ const cv=document.createElement('canvas'); cv.width=cv.height=4; const x=cv.getContext('2d'); x.drawImage(im,0,im.naturalHeight*y0,im.naturalWidth,Math.max(1,im.naturalHeight*(y1-y0)),0,0,4,4);
      const d=x.getImageData(0,0,4,4).data; c=[0,0,0]; for(let i=0;i<64;i+=4){ c[0]+=d[i]/16; c[1]+=d[i+1]/16; c[2]+=d[i+2]/16; } c=c.map(Math.round); }catch(e){}
    AVG.set(key,c); return c; }
  function texPat(g,im){ let m=PAT.get(im); if(!m){ m=new WeakMap(); PAT.set(im,m); } let p=m.get(g); if(!p){ p=g.createPattern(im,'repeat'); m.set(g,p); } return p; }
  // 🌄 PHÔNG TOÀN CẢNH VẼ (Bước 4, 10/11): ảnh nền GPT vẽ SAU mọi toà nhà (đầu world). Ảnh = dải trụ quanh máy, 1 ảnh rộng 110°, lặp ngang kiểu soi gương
  //    (mép nối liền), trượt đúng theo yaw (vật ở vô cực). Chân trời ảnh (th.pano.hz) đặt trùng chân trời máy (chiếu 1 điểm rất xa trên mặt đất theo hướng nhìn).
  //    Chỉ vẽ phần trời + dải 5% dưới chân trời rồi mờ vào sương (không đè mặt đường gần). Máy ngước gắt → phóng ảnh tới 3× cho phủ kín; quá nữa thì phần trên tô màu đỉnh ảnh.
  function pano(F,t,th){ const PN=th.pano; if(!PN) return; const im=F.I[PN.im]; if(!im||!im.complete||!im.naturalWidth) return;
    const g=F.g, B=F.B, VW=F.VW, VH=F.VH, fx=B.f[0], fz=B.f[2], fl=Math.hypot(fx,fz)||1;
    const far=K.proj(B,B.pos[0]+fx/fl*1e6,0,B.pos[2]+fz/fl*1e6); if(!far) return;
    const hy=far.y, top=-VH*0.35, xL=-VW*0.35, xR=VW*1.35; if(hy<top) return;   // nhìn xuống gắt: trời nằm ngoài khung
    const iw=im.naturalWidth, ih=im.naturalHeight, s0=1.92*B.focal/iw, s=Math.min(s0*3,Math.max(s0,(hy-top)/(PN.hz*ih)));
    const band=clamp(B.focal*Math.max(0,B.pos[1])/6500,2,0.05*ih*s);   // dải dưới chân trời chỉ tới chỗ mặt đất đã chìm hẳn trong sương (≈6500 đơn vị)
    const sx0=(PN.x0||0)*iw, sw=((PN.x1||1)-(PN.x0||0))*iw;   // x0/x1: cắt bỏ vật tiền cảnh sát mép ảnh (soi gương sẽ nhân đôi nó)
    const W=sw*s, y0=hy-PN.hz*ih*s, srcH=Math.min(ih,PN.hz*ih+band/s), yB=y0+srcH*s, base=B.cx+B.yaw*B.focal-W/2;   // yaw 0 → giữa ảnh ở giữa khung
    let n=Math.floor((xL-base)/W);
    for(let x=base+n*W; x<xR; x+=W, n++){ if(n&1){ g.save(); g.translate(x+W,0); g.scale(-1,1); g.drawImage(im,sx0,0,sw,srcH,0,y0,W+0.5,srcH*s); g.restore(); }
      else g.drawImage(im,sx0,0,sw,srcH,x,y0,W+0.5,srcH*s); }
    if(y0>top){ const tc=texAvg(im,0,0.03); g.fillStyle=`rgb(${tc})`; g.fillRect(xL,top,xR-xL,y0-top+1);
      const gt=g.createLinearGradient(0,y0,0,y0+ih*s*0.12); gt.addColorStop(0,`rgba(${tc},1)`); gt.addColorStop(1,`rgba(${tc},0)`); g.fillStyle=gt; g.fillRect(xL,y0,xR-xL,ih*s*0.12); }
    if(PN.glow){ const gg=g.createLinearGradient(0,y0,0,hy); gg.addColorStop(0,`rgba(${PN.glow},0)`); gg.addColorStop(1,`rgba(${PN.glow},0.4)`);
      g.save(); g.globalCompositeOperation='screen'; g.fillStyle=gg; g.fillRect(xL,y0,xR-xL,hy-y0); g.restore(); }
    const gb=g.createLinearGradient(0,hy-ih*s*0.02,0,yB); gb.addColorStop(0,`rgba(${th.fog},0)`); gb.addColorStop(1,`rgba(${th.fog},1)`);
    g.fillStyle=gb; g.fillRect(xL,hy-ih*s*0.02,xR-xL,yB-hy+ih*s*0.02+1); }
  function drawBuilding(F,b,t,th){ const B=F.B, k=t>=b.ta?eout(seg(t,b.ta,b.ta+0.55)):0, h=b.h*(1-0.93*k);   // k = độ đổ (sóng Shinra)
    const crashShake=b.shakeAt!=null&&t>=b.shakeAt&&t<b.shakeAt+0.6?(hash(Math.floor(t*40))-0.5)*30:0;
    const pc=K.proj(B,b.cx,h*0.5,b.cz); if(!pc) return;
    F.list.push({d:pc.d+Math.max(b.x1-b.x0,b.z1-b.z0)*0.35, fn:()=>{ const g=F.g, cam=B.pos, fogK=clamp((pc.d-2500)/9000,0,0.85)*(o.fogMul?o.fogMul(t):1), fog=th.fogRGB;
      const base=th.bld(b), lit=k<0.2;
      const P=(x,y,z)=>K.proj(B,x+crashShake,y,z);
      const poly=(...ps)=>{ g.beginPath(); ps.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y)); g.closePath(); };
      // 🧱 MẶT NHÀ DÁN ẢNH (Bước 4, 10/11): mặt tiền vẽ GPT (th.tex) lặp theo tầng (1 tầng ảnh = STY) + bề rộng; mặt chia lưới ô theo cỡ trên màn
      //    (điểm lưới chiếu từ toạ độ THẬT → đúng phối cảnh), mỗi ô 2 tam giác ánh xạ affine (createPattern + setTransform); rồi nhân màu theo mặt + sương.
      //    W* = góc mặt trong thế giới [x,y,z]: A chân trái · Bw chân phải · Cw đỉnh phải · Dw đỉnh trái. Mặt quá nhỏ (tầng < 4px) → tô màu trung bình của ảnh.
      const face=(A,Bw,Cw,Dw,shade,win,wW)=>{ const a=P(...A), b2=P(...Bw), c=P(...Cw), d=P(...Dw); if(!a||!b2||!c||!d) return;
        const tx=th.tex, im=win&&tx?F.I[tx.im]:null, ok=im&&im.complete&&im.naturalWidth, stPx=Math.abs(a.y-d.y)/Math.max(1,h/STY);
        if(!ok||stPx<4){ const col=ok?texAvg(im).map((v,i)=>v*tx.tint[i]/255*shade*(0.86+0.28*b.hue)):base.map(v=>v*shade);
          g.fillStyle=`rgb(${fogMix(col,fog,fogK)})`; poly(a,b2,c,d); g.fill();
          g.strokeStyle=`rgba(0,0,0,${0.35*(1-fogK)})`; g.lineWidth=1; g.stroke(); return; }
        const pat=texPat(g,im), fpx=im.naturalHeight/tx.floors, upp=STY/fpx;   // upp = đơn vị thế giới / 1 điểm ảnh của ảnh mặt tiền
        const U0=Math.floor(hash(b.seed*3.1+win)*tx.cols)*im.naturalWidth/tx.cols, VB=fpx*(64+Math.floor(hash(b.seed*5.7+win)*8)), uw=wW/upp, vh=h/upp;
        const sw=Math.max(Math.hypot(a.x-b2.x,a.y-b2.y),Math.hypot(d.x-c.x,d.y-c.y)), sh=Math.max(Math.hypot(a.x-d.x,a.y-d.y),Math.hypot(b2.x-c.x,b2.y-c.y));
        const nU=clamp(Math.ceil(sw/260),1,3), nV=clamp(Math.ceil(sh/110),1,6), G=[];
        for(let j=0;j<=nV;j++){ const r=j/nV, row=[]; for(let i=0;i<=nU;i++){ const s=i/nU;
          const p=P(A[0]+(Bw[0]-A[0])*s+(Dw[0]-A[0])*r, A[1]+(Bw[1]-A[1])*s+(Dw[1]-A[1])*r, A[2]+(Bw[2]-A[2])*s+(Dw[2]-A[2])*r); if(!p) return; row.push({x:p.x,y:p.y,u:U0+uw*s,v:VB-vh*r}); } G.push(row); }
        const grow=(ps)=>{ let cx=0,cy=0; for(const p of ps){ cx+=p.x; cy+=p.y; } cx/=ps.length; cy/=ps.length;
          return ps.map(p=>{ const dx=p.x-cx, dy=p.y-cy, L=Math.hypot(dx,dy)||1; return {x:p.x+dx/L*0.7, y:p.y+dy/L*0.7}; }); };   // nở 0.7px: không hở khe giữa các ô
        const aff=(p0,p1,p2)=>{ const du1=p1.u-p0.u, dv1=p1.v-p0.v, du2=p2.u-p0.u, dv2=p2.v-p0.v, det=du1*dv2-du2*dv1; if(Math.abs(det)<1e-9) return null;
          const dx1=p1.x-p0.x, dy1=p1.y-p0.y, dx2=p2.x-p0.x, dy2=p2.y-p0.y, A1=(dx1*dv2-dx2*dv1)/det, C1=(dx2*du1-dx1*du2)/det, B1=(dy1*dv2-dy2*dv1)/det, D1=(dy2*du1-dy1*du2)/det;
          return new DOMMatrix([A1,B1,C1,D1,p0.x-A1*p0.u-C1*p0.v,p0.y-B1*p0.u-D1*p0.v]); };
        g.fillStyle=pat;
        for(let j=0;j<nV;j++) for(let i=0;i<nU;i++){ const p00=G[j][i], p10=G[j][i+1], p11=G[j+1][i+1], p01=G[j+1][i];
          const [e00,e10,e11,e01]=grow([p00,p10,p11,p01]);
          let m=aff(p00,p10,p11); if(m){ pat.setTransform(m); poly(e00,e10,e11,e01); g.fill(); }        // tam giác 1 tô cả ô (lấp đường chéo)
          m=aff(p00,p11,p01); if(m){ pat.setTransform(m); poly(e00,e11,e01); g.fill(); } }              // tam giác 2 đè lên
        const [oa,ob,oc,od]=grow([a,b2,c,d]), tint=tx.tint.map(v=>Math.round(Math.min(255,v*shade*(0.86+0.28*b.hue))));
        g.save(); g.globalCompositeOperation='multiply'; g.fillStyle=`rgb(${tint})`; poly(oa,ob,oc,od); g.fill(); g.restore();   // màu theo bảng + độ tối theo mặt
        if(fogK>0.01){ g.fillStyle=`rgba(${fog},${fogK})`; poly(oa,ob,oc,od); g.fill(); }
        g.strokeStyle=`rgba(0,0,0,${0.35*(1-fogK)})`; g.lineWidth=1; poly(a,b2,c,d); g.stroke(); };
      const {x0,x1,z0,z1}=b;
      if(cam[2]<z0) face([x0,0,z0],[x1,0,z0],[x1,h,z0],[x0,h,z0],0.82,1,x1-x0);
      if(cam[2]>z1) face([x1,0,z1],[x0,0,z1],[x0,h,z1],[x1,h,z1],0.7,2,x1-x0);
      if(cam[0]<x0) face([x0,0,z1],[x0,0,z0],[x0,h,z0],[x0,h,z1],0.62,2,z1-z0);
      if(cam[0]>x1) face([x1,0,z0],[x1,0,z1],[x1,h,z1],[x1,h,z0],0.95,1,z1-z0);
      if(cam[1]>h) face([x0,h,z0],[x1,h,z0],[x1,h,z1],[x0,h,z1],k>0.5?0.55:1.08,0,0);
    }});
    if(k>0 && t<b.ta+2.6){ K.debris(F,{x:b.cx,y:b.h*0.4,z:b.cz,t0:b.ta,n:9,speed:1300,life:1.8,size:70,seed:b.seed,col:'#4d4040'});
      K.smoke(F,{x:b.cx,z:b.cz,t0:b.ta,n:5,spread:900,rise:520,life:2.6,size:520,seed:b.seed+3,a:0.42,tint:'96,72,58'}); } }

  // ───────── BẢNG MÀU theo đoạn (trời đỏ trăng máu → bụi nâu sau Shinra → tím quang sau nổ tím) ─────────
  const mkTh=(sky,fog,ground,bld,sun)=>({sky,fog,ground,tile:260,R:7000,sun,fogRGB:fog.split(',').map(Number),bld});
  const TH_NIGHT=mkTh(['#12020a','#4e0c12','#c2421c'],'70,24,22',['78,70,70','70,62,64','28,22,24'],b=>[46+18*b.hue,34+8*b.hue,40+10*b.hue],{x:-80,y:0.55,r:70,col:'rgba(200,44,30,A)'});
  const TH_DUST =mkTh(['#2a1208','#6b3a22','#b07040'],'110,78,56',['96,78,62','88,70,56','40,30,24'],b=>[70+14*b.hue,56+8*b.hue,48],{x:-80,y:0.55,r:70,col:'rgba(220,120,70,A)'});
  const TH_CLEAR=mkTh(['#120a26','#4a2a62','#b48ac0'],'86,62,98',['92,80,90','84,72,84','34,26,34'],b=>[58+12*b.hue,48,62],{x:-80,y:0.55,r:70,col:'rgba(235,200,255,A)'});
  const TH_RISE=mkTh(['#b8321c','#e0582a','#ff9a52'],'150,50,30',['78,70,70','70,62,64','28,22,24'],b=>[30+10*b.hue,22,26],{x:-80,y:0.55,r:90,col:'rgba(255,90,50,A)'});
  // 🖼️ Bước 4 (10/11): phông vẽ GPT (pano: ảnh + hz = chân trời trong ảnh theo tỉ lệ cao) + mặt tiền dán ảnh (tex: ảnh, số tầng trong 1 ô ảnh, màu nhân)
  Object.assign(TH_NIGHT,{pano:{im:'bgR',hz:0.675},tex:{im:'txN',floors:8,cols:6,tint:[235,200,205]}});
  Object.assign(TH_RISE ,{pano:{im:'bgR',hz:0.675,glow:'255,120,50'},tex:{im:'txN',floors:8,cols:6,tint:[255,190,170]}});
  Object.assign(TH_DUST ,{pano:{im:'bgU',hz:0.48},tex:{im:'txD',floors:5,cols:4,tint:[150,118,96]}});
  Object.assign(TH_CLEAR,{pano:{im:'bgP',hz:0.75,x0:0.13,x1:0.97},tex:{im:'txD',floors:5,cols:4,tint:[118,96,140]}});

  // ═════════ BỐI CẢNH ĐA DẠNG (anh dặn 11/11: phông chiến đấu bị lặp nhiều → công viên, cây cầu, giữa phố…) ═════════
  //   o.kind 'street' (mặc định: đại lộ 2 dãy nhà) · 'park' (CÔNG VIÊN: nhà chỉ ở dãy xa phía sau, cây + cột đèn + ghế đá + đài phun nước, mặt cỏ)
  //   · 'bridge' (CẦU TREO: mặt cầu nhựa đường, lan can, 2 cặp tháp, cáp chính võng + dây treo, dưới là mặt sông). Phông: bgPark / bgBridge.
  const KIND=o.kind||'street';
  const TH_PARK=Object.assign(mkTh(['#12020a','#4e0c12','#c2421c'],'40,22,24',['30,38,28','26,33,25','10,13,9'],b=>[40+16*b.hue,30+8*b.hue,36+10*b.hue],{x:-80,y:0.55,r:70,col:'rgba(200,44,30,A)'}),
    {pano:{im:'bgPark',hz:0.7},tex:{im:'txN',floors:8,cols:6,tint:[225,190,195]}});
  const TH_BRIDGE=Object.assign(mkTh(['#12020a','#4e0c12','#c2421c'],'36,18,24',['26,22,34','22,18,30','8,6,12'],b=>[40,30,36],{x:-80,y:0.55,r:70,col:'rgba(200,44,30,A)'}),
    {pano:{im:'bgBridge',hz:0.6},tex:{im:'txN',floors:8,cols:6,tint:[225,190,195]}});
  // vật trang trí công viên (cố định theo seed): cây (ảnh GPT 'tree1'), cột đèn, ghế đá, đài phun nước — tránh vùng đánh nhau |x|<1000, |z|<330
  const PROPS=[];
  if(KIND==='park'){ let s=(o.seed||1)*77;
    for(let i=0;i<34;i++){ const x=-3000+i*180+(hash(s+i)-0.5)*120, z=i%3===0?520+hash(s+i*3)*260:(i%3===1?820+hash(s+i*5)*300:-1500-hash(s+i*7)*400); if(Math.abs(x)<1000&&Math.abs(z)<330) continue; PROPS.push({k:'tree',x,z,h:520+260*hash(s+i*9)}); }
    for(let x=-2600;x<=2600;x+=520){ PROPS.push({k:'lamp',x,z:380}); PROPS.push({k:'bench',x:x+150,z:400}); }
    PROPS.push({k:'fountain',x:-60,z:760}); }
  function drawProps(F,t){ const B=F.B;
    for(const p of PROPS){ const P=K.proj(B,p.x,0,p.z); if(!P) continue;
      if(p.k==='tree'){ const im=F.I.tree1; if(im&&im.complete&&im.naturalWidth) K.sprite(F,{img:im,x:p.x,z:p.z,h:p.h,life:{sway:0.6,wind:0.4},shadow:false}); }
      else if(p.k==='lamp'){ const T0=K.proj(B,p.x,330,p.z); if(!T0) continue; F.list.push({d:P.d, fn:()=>{ const g=F.g; g.save(); g.strokeStyle='#1c1a1f'; g.lineWidth=Math.max(1.5,10*P.s); g.beginPath(); g.moveTo(P.x,P.y); g.lineTo(T0.x,T0.y); g.stroke();
          g.globalCompositeOperation='lighter'; const R=60*T0.s, gr=g.createRadialGradient(T0.x,T0.y,0,T0.x,T0.y,R); gr.addColorStop(0,'rgba(255,220,150,0.9)'); gr.addColorStop(1,'rgba(255,170,90,0)'); g.fillStyle=gr; g.fillRect(T0.x-R,T0.y-R,2*R,2*R); g.restore(); }}); }
      else if(p.k==='bench'){ const A=K.proj(B,p.x-70,40,p.z), C2=K.proj(B,p.x+70,40,p.z), A2=K.proj(B,p.x-70,80,p.z+12), C3=K.proj(B,p.x+70,80,p.z+12); if(!A||!C2||!A2||!C3) continue;
        F.list.push({d:P.d, fn:()=>{ const g=F.g; g.save(); g.strokeStyle='#3b2a20'; g.lineWidth=Math.max(1.5,9*P.s); g.beginPath(); g.moveTo(A.x,A.y); g.lineTo(C2.x,C2.y); g.moveTo(A2.x,A2.y); g.lineTo(C3.x,C3.y); g.stroke();
          g.strokeStyle='#18161a'; g.lineWidth=Math.max(1,5*P.s); g.beginPath(); g.moveTo(A.x,A.y); g.lineTo(A.x,P.y); g.moveTo(C2.x,C2.y); g.lineTo(C2.x,P.y); g.stroke(); g.restore(); }}); }
      else if(p.k==='fountain'){ const pts=[], top=[]; for(let i=0;i<=28;i++){ const a=i/28*TAU, q=K.proj(B,p.x+Math.cos(a)*240,0,p.z+Math.sin(a)*240), q2=K.proj(B,p.x+Math.cos(a)*240,60,p.z+Math.sin(a)*240); if(!q||!q2) break; pts.push(q); top.push(q2); } if(top.length<29) continue;
        const J=K.proj(B,p.x,60,p.z), JT=K.proj(B,p.x,260+20*Math.sin(t*6),p.z); if(!J||!JT) continue;
        F.list.push({d:P.d, fn:()=>{ const g=F.g; g.save(); g.fillStyle='#4a4448'; g.beginPath(); top.forEach((q,i)=>i?g.lineTo(q.x,q.y):g.moveTo(q.x,q.y)); g.closePath(); g.fill();
          g.fillStyle='rgba(60,30,40,0.9)'; g.beginPath(); top.forEach((q,i)=>{ const x=lerp(q.x,J.x,0.12), y=lerp(q.y,J.y,0.12); i?g.lineTo(x,y):g.moveTo(x,y); }); g.closePath(); g.fill();   // mặt nước phản ánh trăng đỏ
          g.globalCompositeOperation='lighter'; g.strokeStyle='rgba(220,230,255,0.55)'; g.lineWidth=Math.max(1,6*P.s); for(let k=0;k<5;k++){ const a=k/5*TAU+t; g.beginPath(); g.moveTo(J.x,J.y); g.quadraticCurveTo(JT.x+Math.cos(a)*30*P.s,JT.y,J.x+Math.cos(a)*150*P.s,J.y+10*P.s); g.stroke(); } g.restore(); }}); } } }
  // CẦU TREO: mặt cầu (dưới mọi thứ), lan can, tháp, cáp chính, dây treo
  const DECK=300, TOW=o.towers||[-2200,2200], TH_H=o.towerH||2600, BEAMS=o.beams||[900,1800];   // phim tự đặt tháp gần chỗ đánh: {towers:[-900,900], towerH:1400, beams:[520,1050]}
  const cableY=x=>{ const a=TOW[0], b=TOW[1]; if(x<a||x>b) return Math.max(80,TH_H-(Math.abs(x)-b)*0.9); const u=(x-a)/(b-a); return lerp(TH_H,260,4*u*(1-u)); };
  // 🧱 khối hộp thật (12/11: tháp / dầm vẽ bằng mặt phẳng mỏng → nhìn nghiêng thì biến mất, Bat như ngồi giữa không trung)
  function box(F,x0,x1,y0,y1,z0,z1,col,top,rim){ const B=F.B, P=(x,y,z)=>K.proj(B,x,y,z), cam=K.camPos?K.camPos(B):null;
    const V=[[x0,y0,z0],[x1,y0,z0],[x1,y1,z0],[x0,y1,z0],[x0,y0,z1],[x1,y0,z1],[x1,y1,z1],[x0,y1,z1]].map(v=>P(v[0],v[1],v[2])); if(V.some(p=>!p)) return;
    const faces=[[0,1,2,3,col],[5,4,7,6,col],[4,0,3,7,col],[1,5,6,2,col],[3,2,6,7,top],[4,5,1,0,col]];
    const vis=f=>{ const a=V[f[0]], b=V[f[1]], c=V[f[2]]; return (b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x)<0; };   // mặt quay về máy (thứ tự đỉnh ngược chiều kim đồng hồ khi nhìn từ ngoài)
    const d=V.reduce((m,p)=>Math.min(m,p.d),1e9);
    F.list.push({d, fn:()=>{ const g=F.g; g.save(); for(const f of faces){ if(!vis(f)) continue; g.fillStyle=f[4]; g.beginPath(); for(let i=0;i<4;i++){ const p=V[f[i]]; i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y); } g.closePath(); g.fill();
      if(rim){ g.strokeStyle=rim; g.lineWidth=1.5; g.stroke(); } } g.restore(); }}); }
  function drawBridge(F,t){ const B=F.B, g=F.g, P=(x,y,z)=>K.proj(B,x,y,z);
    const deck=[]; for(let i=0;i<=24;i++){ const x=-7000+i*14000/24, a=P(x,0,-DECK), b=P(x,0,DECK); if(a&&b) deck.push([a,b]); }
    if(deck.length>1) F.under.push(()=>{ g.save(); g.fillStyle='#2a272e'; g.beginPath(); deck.forEach(([a],i)=>i?g.lineTo(a.x,a.y):g.moveTo(a.x,a.y)); for(let i=deck.length-1;i>=0;i--) g.lineTo(deck[i][1].x,deck[i][1].y); g.closePath(); g.fill();
      g.strokeStyle='rgba(230,220,180,0.55)'; g.lineWidth=2; g.setLineDash([18,22]); g.beginPath(); for(let i=0;i<=24;i++){ const x=-7000+i*14000/24, q=P(x,1,0); if(q) i?g.lineTo(q.x,q.y):g.moveTo(q.x,q.y); } g.stroke(); g.setLineDash([]); g.restore(); });
    for(const sd of [-1,1]){ const z=sd*DECK;
      for(let x=-4000;x<=4000;x+=160){ const a=P(x,0,z), b=P(x,58,z); if(!a||!b) continue; F.list.push({d:a.d, fn:()=>{ g.strokeStyle='#3a3540'; g.lineWidth=Math.max(1,4*a.s); g.beginPath(); g.moveTo(a.x,a.y); g.lineTo(b.x,b.y); g.stroke(); }}); }   // trụ lan can
      for(let x=-4000;x<4000;x+=320){ const a=P(x,58,z), b=P(x+320,58,z); if(!a||!b) continue; F.list.push({d:(a.d+b.d)/2, fn:()=>{ g.strokeStyle='#5a5460'; g.lineWidth=Math.max(1,5*a.s); g.beginPath(); g.moveTo(a.x,a.y); g.lineTo(b.x,b.y); g.stroke(); }}); }   // thanh lan can
      for(let x=-4000;x<4000;x+=200){ const a=P(x,cableY(x),z+sd*30), b=P(x+200,cableY(x+200),z+sd*30); if(!a||!b) continue; F.list.push({d:(a.d+b.d)/2, fn:()=>{ g.strokeStyle='#4a4450'; g.lineWidth=Math.max(1.5,14*a.s); g.beginPath(); g.moveTo(a.x,a.y); g.lineTo(b.x,b.y); g.stroke(); }}); }   // cáp chính
      for(let x=-3900;x<=3900;x+=160){ if(TOW.some(tx=>Math.abs(x-tx)<80)) continue; const a=P(x,58,z+sd*30), b=P(x,cableY(x),z+sd*30); if(!a||!b) continue; F.list.push({d:a.d+2, fn:()=>{ g.strokeStyle='rgba(90,84,96,0.85)'; g.lineWidth=Math.max(1,2.5*a.s); g.beginPath(); g.moveTo(a.x,a.y); g.lineTo(b.x,b.y); g.stroke(); }}); }   // dây treo
      for(const tx of TOW) box(F,tx-60,tx+60,0,TH_H+80,z+sd*30-45,z+sd*30+45,'#2b2630','#3a3340','rgba(220,70,50,0.28)');   // chân tháp cầu: khối hộp (viền đỏ trăng)
    }
    for(const tx of TOW) for(const by of BEAMS){ const zs=[-DECK+15,-60,60,DECK-15]; for(let i=0;i<3;i++) box(F,tx-50,tx+50,by,by+120,zs[i],zs[i+1],'#262229','#3c3540','rgba(220,70,50,0.22)'); }   // dầm ngang tháp: khối hộp (chia 3 đoạn để xếp lớp đúng với nhân vật ngồi trên)
    for(let x=-3600;x<=3600;x+=600) for(const sd of [-1,1]){ const L=P(x,120,sd*DECK); if(!L) continue; F.list.push({d:L.d, fn:()=>{ g.save(); g.globalCompositeOperation='lighter'; const R=50*L.s, gr=g.createRadialGradient(L.x,L.y,0,L.x,L.y,R); gr.addColorStop(0,'rgba(255,215,150,0.85)'); gr.addColorStop(1,'rgba(255,170,90,0)'); g.fillStyle=gr; g.fillRect(L.x-R,L.y-R,2*R,2*R); g.restore(); }}); }   // đèn cầu
  }
  function draw(F,t,th){ pano(F,t,th); for(const b of BL) drawBuilding(F,b,t,th); if(KIND==='park') drawProps(F,t); if(KIND==='bridge') drawBridge(F,t); }
  const TH=KIND==='park'?TH_PARK:KIND==='bridge'?TH_BRIDGE:TH_NIGHT;   // bảng màu mặc định theo bối cảnh
  return { BL, STY, pano, drawBuilding, draw, TH, TH_NIGHT, TH_RISE, TH_DUST, TH_CLEAR, TH_PARK, TH_BRIDGE, KIND, cableY, TOW, DECK, TH_H, BEAMS, box };
  };
})();
