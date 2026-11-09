// ===================== 🖌️ VFX-MANGA — hiệu ứng manga làm sẵn cho cine-kit → CineKit.fx.* =====================
// Học từ clip anime (repo meme-anime-lab: playbook/luat.md + cong-thuc.md). Canvas 2D thuần → chạy cả PC lẫn Mac, xem trong game
// lẫn xuất video offline (render-cine) ra y hệt. Toạ độ = đơn vị LOGIC của phim (F.VW × F.VH), giống K.flash / K.speedLines.
// Gọi trong def.screen(F,t) (vẽ sau thế giới) — hoặc trong def.world(F,t) nếu muốn hiệu ứng nằm dưới sprite.
//   smear(F,img,x,y,w,h,{dx,dy,n,streak,lines,a})  vệt nhoè THẬT: ảnh kéo thành sọc theo hướng lao, đầu rõ đuôi tan (fight-1 1:59.2 đập xuống)
//   swirl(F,t,{cx,cy,r,colA,colB,colC,arms,turns,speed,core,a})  xoáy màu xoắn ốc sau lưng lúc kết ấn / mở lãnh địa (fight-1 1:43.6–1:46.7)
//   halftone(F,{dot,a,col,mode:'flat'|'luma',rect,ang,size})  lớp chấm manga (flat = lưới chấm đều · luma = chấm to ở chỗ tối, đọc lại khung)
//   mangaBW(F,{keep,tol,sat,contrast,bright,k,scale})  khung → đen trắng tương phản cao, CHỈ GIỮ 1 màu nhấn (fight-1 C1 lửa xanh / C3 lửa đỏ)
//   blast(F,{x,y,z?,t0,life,size,seed,n,rise})  lửa nổ khối đặc kiểu manga: cụm tròn đỏ-cam viền đen, lõi vàng → hoá khói nâu có viền (fight-1 A24)
//   rimLight(F,img,x,y,w,h,{col,k,w,dir,dark,darkCol,glow,a})  ngược sáng: thân thành khối tối + viền sáng ở mép (kaiju-a #1, kaiju-b #2)
// img = Image (tự cắt sát qua K.prep), canvas, hoặc kết quả K.prep. Mọi hàm tất định theo F.t (tua đi tua lại vẫn y hệt).
(function(){
  const TAU=Math.PI*2, D2R=Math.PI/180;
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)), seg=(t,a,b)=>clamp((t-a)/(b-a),0,1), lerp=(a,b,k)=>a+(b-a)*k;
  const hash=n=>{ const s=Math.sin(n*127.1+311.7)*43758.5453; return s-Math.floor(s); };
  const eout3=x=>1-Math.pow(1-x,3), sstep=(a,b,x)=>{ const u=clamp((x-a)/(b-a),0,1); return u*u*(3-2*u); };
  const POOL={};
  const tmp=(key,w,h)=>{ w=Math.max(1,Math.ceil(w)); h=Math.max(1,Math.ceil(h)); let c=POOL[key];
    if(!c){ c=POOL[key]=document.createElement('canvas'); c.ctx=c.getContext('2d',{willReadFrequently:key.startsWith('rd')}); }
    if(c.width!==w||c.height!==h){ c.width=w; c.height=h; } else { c.ctx.setTransform(1,0,0,1,0,0); c.ctx.globalCompositeOperation='source-over'; c.ctx.globalAlpha=1; c.ctx.clearRect(0,0,w,h); }
    return c; };
  const srcOf=img=>{ if(!img) return null; if(img.sw&&img.src&&typeof img.src!=='string') return img;
    if(typeof HTMLImageElement!=='undefined' && img instanceof HTMLImageElement){ const K=window.CineKit;
      if(K&&K.prep) return K.prep(img); return img.complete&&img.naturalWidth?{src:img,sx:0,sy:0,sw:img.naturalWidth,sh:img.naturalHeight,tint:{}}:null; }
    if(!img._fx) img._fx={src:img,sx:0,sy:0,sw:img.width,sh:img.height,tint:{}}; return img._fx; };
  // bóng 1 màu của ảnh; hard = mép cứng (alpha > 110 → đặc) để viền ngược sáng không bị nhạt vì quầng mờ quanh ảnh
  const sil=(c,col,hard)=>{ c.tint=c.tint||{}; const key=col+(hard?'|h':''); if(c.tint[key]) return c.tint[key]; const t=document.createElement('canvas'); t.width=c.sw; t.height=c.sh; const x=t.getContext('2d');
    x.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,0,0,c.sw,c.sh);
    if(hard){ const id=x.getImageData(0,0,c.sw,c.sh), d=id.data; for(let i=3;i<d.length;i+=4) d[i]=d[i]>110?255:0; x.putImageData(id,0,0); }
    x.globalCompositeOperation='source-in'; x.fillStyle=col; x.fillRect(0,0,c.sw,c.sh); return c.tint[key]=t; };
  const rgb=s=>{ if(Array.isArray(s)) return s; s=String(s).trim(); if(s[0]==='#'){ if(s.length===4) s='#'+s[1]+s[1]+s[2]+s[2]+s[3]+s[3]; const n=parseInt(s.slice(1),16); return [n>>16&255,n>>8&255,n&255]; }
    return s.replace(/rgba?\(|\)/g,'').split(',').slice(0,3).map(Number); };
  const mix=(a,b,k)=>a.map((v,i)=>Math.round(lerp(v,b[i],k)));
  const scOf=F=>F.SC||1;
  const hasFilter=g=>typeof g.filter==='string';
  const FX={};

  // ───────── 1. SMEAR — ảnh kéo thành vệt sọc ─────────
  // (x,y,w,h) = ảnh ở vị trí ĐẦU (đang tới); {dx,dy} = vệt kéo dài bao xa về phía SAU (đơn vị logic, cùng chiều chuyển động).
  // n = số lát (28) · streak 0–1 = các lát dài ngắn khác nhau (0.6) · lines 0–1 = nét sọc mực dọc vệt (0.5) · lineCol · a · seed
  FX.smear=(F,img,x,y,w,h,o={})=>{ const c=srcOf(img); if(!c) return; const g=F.g, dx=o.dx||0, dy=o.dy||0, L=Math.hypot(dx,dy), A=o.a==null?1:o.a; if(A<=0.01) return;
    if(L<1){ g.save(); g.globalAlpha=A; g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,x,y,w,h); g.restore(); return; }
    const K=Math.min(scOf(F),2), n=o.n||28, st=o.streak==null?0.6:o.streak, seed=o.seed||0;
    const bx=Math.min(x,x-dx), by=Math.min(y,y-dy), bw=w+Math.abs(dx), bh=h+Math.abs(dy);
    const T=tmp('smear',bw*K,bh*K), q=T.ctx, hx=x-bx, hy=y-by, vert=Math.abs(dy)>=Math.abs(dx);
    // lát vuông góc với hướng chính, mỗi lát kéo dài về phía sau; hướng phụ thì xô lệch (shear) theo tỉ lệ
    if(vert){ const s=dx/dy, ref=hy+h/2; q.setTransform(K,0,s*K,K,-s*K*ref,0);
      for(let i=0;i<n;i++){ const Li=Math.abs(dy)*(1-st+st*hash(seed*71+i)), sx=c.sx+c.sw*i/n, sw=c.sw/n, X=hx+w*i/n, W=w/n+0.6;
        if(dy>0) q.drawImage(c.src,sx,c.sy,sw,c.sh,X,hy-Li,W,h+Li); else q.drawImage(c.src,sx,c.sy,sw,c.sh,X,hy,W,h+Li); } }
    else { const s=dy/dx, ref=hx+w/2; q.setTransform(K,s*K,0,K,0,-s*K*ref);
      for(let i=0;i<n;i++){ const Li=Math.abs(dx)*(1-st+st*hash(seed*71+i)), sy=c.sy+c.sh*i/n, sh=c.sh/n, Y=hy+h*i/n, H=h/n+0.6;
        if(dx>0) q.drawImage(c.src,c.sx,sy,c.sw,sh,hx-Li,Y,w+Li,H); else q.drawImage(c.src,c.sx,sy,c.sw,sh,hx,Y,w+Li,H); } }
    // nét sọc mực chạy dọc vệt
    const ln=o.lines==null?0.5:o.lines; if(ln>0){ q.setTransform(K,0,0,K,0,0); q.strokeStyle=o.lineCol||'rgba(0,0,0,0.7)'; q.lineCap='round';
      const m=Math.round(n*ln); for(let i=0;i<m;i++){ const u=hash(seed*13+i*3.7), px=hx+w*(vert?u:0.5)+(vert?0:(dx>0?w*0.3:-w*0.3)), py=hy+h*(vert?0.5:u)+(vert?(dy>0?h*0.3:-h*0.3):0), k=0.35+0.65*hash(seed*7+i);
        q.globalAlpha=0.35+0.5*hash(seed+i*5); q.lineWidth=Math.max(0.6,(vert?w:h)*0.006*(0.5+hash(i))); q.beginPath(); q.moveTo(px,py); q.lineTo(px-dx*k,py-dy*k); q.stroke(); } q.globalAlpha=1; }
    // đuôi tan dần: mặt nạ gradient từ đuôi (trong suốt) → đầu (đậm)
    q.setTransform(1,0,0,1,0,0); q.globalCompositeOperation='destination-in';
    const cx=(hx+w/2)*K, cy=(hy+h/2)*K, gr=q.createLinearGradient(cx-dx*K,cy-dy*K,cx,cy); gr.addColorStop(0,'rgba(0,0,0,0)'); gr.addColorStop(0.55,'rgba(0,0,0,0.55)'); gr.addColorStop(1,'rgba(0,0,0,1)');
    q.fillStyle=gr; q.fillRect(0,0,T.width,T.height); q.globalCompositeOperation='source-over';
    g.save(); g.globalAlpha=A*0.9; g.drawImage(T,0,0,T.width,T.height,bx,by,bw,bh); g.globalAlpha=A; g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,x,y,w,h); g.restore(); };

  // ───────── 2. SWIRL — xoáy màu xoắn ốc ─────────
  // cx,cy tâm (giữa khung) · r bán kính (0.6 đường chéo) · colA/colB/colC 'r,g,b' hoặc '#hex' xen kẽ theo nhánh · arms (7) · turns vòng xoắn (1.25)
  // speed rad/s (1.6, âm = quay ngược) · core = độ tối lõi (0.55) · blend ('lighter') · a
  FX.swirl=(F,t,o={})=>{ const g=F.g, A=o.a==null?1:o.a; if(A<=0.01) return; const cx=o.cx==null?F.VW/2:o.cx, cy=o.cy==null?F.VH/2:o.cy, R=o.r||Math.hypot(F.VW,F.VH)*0.6;
    const arms=o.arms||7, turns=o.turns||1.25, sp=o.speed==null?1.6:o.speed, dir=sp<0?-1:1, cols=[o.colA||'255,40,60',o.colB||'90,170,255',o.colC].filter(Boolean).map(rgb), seed=o.seed||0;
    g.save();
    if(o.core!==0){ const cg=g.createRadialGradient(cx,cy,0,cx,cy,R*0.55); cg.addColorStop(0,`rgba(0,0,0,${0.55*(o.core==null?1:o.core/0.55)*A})`); cg.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=cg; g.fillRect(cx-R,cy-R,R*2,R*2); }
    g.globalCompositeOperation=o.blend||'lighter';
    // mỗi nhánh = vài SỢI ngắn so le (không chạy hết vòng) → ra vệt xoáy loang, không thành sọc kẹo đều
    const M=30, L=[[2.2,0.12],[1.0,0.34],[0.35,0.8]], per=o.strands||4;
    for(let ly=0;ly<3;ly++) for(let i=0;i<arms*per;i++){ const arm=i%arms, s=seed*97+i*7+ly*131, ph=arm/arms*TAU+hash(s)*1.1+t*sp*(1+0.12*ly), col=cols[arm%cols.length], c2=ly===2?mix(col,[255,255,255],0.55):col;
      const a0=0.08+0.62*hash(s+3), r0=R*a0, r1=Math.min(R*1.15,r0+R*(0.22+0.4*hash(s+5))), W=R*0.03*(0.5+hash(s+9))*L[ly][0]*(0.6+a0);
      const P=[]; for(let j=0;j<=M;j++){ const u=j/M, rr=r0+(r1-r0)*u, th=ph+dir*(rr/R)*turns*TAU; P.push([cx+Math.cos(th)*rr,cy+Math.sin(th)*rr,W*Math.pow(Math.sin(Math.PI*u),0.7)]); }
      g.beginPath(); for(let j=0;j<=M;j++){ const p=P[j], q=P[Math.min(M,j+1)], b=P[Math.max(0,j-1)], tx=q[0]-b[0], ty=q[1]-b[1], tl=Math.hypot(tx,ty)||1; const nx=-ty/tl*p[2], ny=tx/tl*p[2]; j?g.lineTo(p[0]+nx,p[1]+ny):g.moveTo(p[0]+nx,p[1]+ny); }
      for(let j=M;j>=0;j--){ const p=P[j], q=P[Math.min(M,j+1)], b=P[Math.max(0,j-1)], tx=q[0]-b[0], ty=q[1]-b[1], tl=Math.hypot(tx,ty)||1; g.lineTo(p[0]+ty/tl*p[2],p[1]-tx/tl*p[2]); }
      g.closePath(); g.fillStyle=`rgba(${c2},${L[ly][1]*A})`; g.fill(); }
    g.restore(); };

  // ───────── 3a. HALFTONE — lớp chấm manga ─────────
  // mode 'flat' (lưới chấm đều, nhanh) · 'luma' (chấm to ở chỗ TỐI của khung đang vẽ — đọc lại canvas) · dot = bước lưới (6) · size hệ số cỡ chấm (1)
  // col màu chấm ('#000') · a (0.35) · rect [x,y,w,h] vùng phủ (cả khung) · ang góc lưới độ (45, chỉ flat) · inv (luma: chấm ở chỗ SÁNG)
// paper (luma): màu giấy tô kín vùng trước khi chấm, vd '#f4f1ea' → biến cả vùng thành bản in manga
  FX.halftone=(F,o={})=>{ const g=F.g, A=o.a==null?0.35:o.a; if(A<=0.01) return; const dot=o.dot||6, sz=o.size||1, col=o.col||'#000', R=o.rect||[0,0,F.VW,F.VH];
    if((o.mode||'flat')==='flat'){ const K=scOf(F), key='ht'+dot+'|'+sz+'|'+col+'|'+K, d=Math.max(2,Math.round(dot*K));
      let P=POOL[key]; if(!P){ P=POOL[key]=document.createElement('canvas'); P.width=P.height=d; const x=P.getContext('2d'); x.fillStyle=col; x.beginPath(); x.arc(d/2,d/2,d*0.3*sz,0,TAU); x.fill(); }
      const pat=g.createPattern(P,'repeat'); if(pat.setTransform && typeof DOMMatrix!=='undefined') pat.setTransform(new DOMMatrix().scale(1/K).rotate(o.ang==null?45:o.ang));
      g.save(); g.globalAlpha=A; g.fillStyle=pat; g.fillRect(R[0],R[1],R[2],R[3]); g.restore(); return; }
    // luma: lấy mẫu khung nhỏ (1 điểm / ô) → 1 đường path gồm mọi chấm
    const K=scOf(F), cols=Math.ceil(R[2]/dot), rows=Math.ceil(R[3]/dot), S=tmp('rd-ht',cols,rows);
    S.ctx.drawImage(g.canvas,R[0]*K,R[1]*K,R[2]*K,R[3]*K,0,0,cols,rows); const d=S.ctx.getImageData(0,0,cols,rows).data, rmax=dot*0.62*sz;
    g.save(); if(o.paper){ g.fillStyle=o.paper; g.fillRect(R[0],R[1],R[2],R[3]); }   // paper: tô nền giấy trước → khung thành bản in chấm thật
    // tô thẳng điểm ảnh (nhanh hơn ~10× so với vẽ hàng chục nghìn vòng tròn): mỗi ô chỉ duyệt khung vuông quanh chấm, mép chấm khử răng cưa 1px
    const DK=dot*K, OW=Math.ceil(R[2]*K), OH=Math.ceil(R[3]*K), O=tmp('rd-ht-o',OW,OH), od=O.ctx.createImageData(OW,OH), q=od.data, cc=rgb(col);
    for(let j=0;j<rows;j++) for(let i=0;i<cols;i++){ const p=(j*cols+i)*4, lum=(0.299*d[p]+0.587*d[p+1]+0.114*d[p+2])/255, v=o.inv?lum:1-lum; if(v<0.06) continue;
      const r=rmax*Math.sqrt(v)*K, X=(i+0.5+(j&1)*0.5)*DK, Y=(j+0.5)*DK, x0=Math.max(0,Math.floor(X-r-1)), x1=Math.min(OW-1,Math.ceil(X+r+1)), y0=Math.max(0,Math.floor(Y-r-1)), y1=Math.min(OH-1,Math.ceil(Y+r+1));
      for(let y=y0;y<=y1;y++){ const dy=y+0.5-Y; for(let x=x0;x<=x1;x++){ const dx=x+0.5-X, cov=r-Math.sqrt(dx*dx+dy*dy)+0.5; if(cov<=0) continue;
        const k=(y*OW+x)*4, a=(cov>1?1:cov)*255; if(a>q[k+3]){ q[k]=cc[0]; q[k+1]=cc[1]; q[k+2]=cc[2]; q[k+3]=a; } } } }
    O.ctx.putImageData(od,0,0); g.globalAlpha=A; g.drawImage(O,0,0,OW,OH,R[0],R[1],OW/K,OH/K); g.restore(); };

  // ───────── 3b. MANGA BW — đen trắng tương phản, giữ 1 màu nhấn ─────────
  // keep màu giữ ('#3c8cff' / 'r,g,b') · tol độ lệch sắc (0–0.5, mặc định 0.08) · sat độ bão hoà tối thiểu để giữ (0.3) · contrast (3) · bright (1.1)
  // k 0–1 mức áp (để mờ vào / ra) · scale độ phân giải mặt nạ màu (0.5; 0.25 nhanh hơn, mép màu mềm hơn)
  // Gọi CUỐI def.screen (sau khi đã vẽ hết) — nó đọc lại cả khung. Chậm hơn các hàm khác (đo trong tools/x/vfx-manga-test.html).
  FX.mangaBW=(F,o={})=>{ const k=o.k==null?1:o.k; if(k<=0.01) return; const g=F.g, cv=g.canvas, W=cv.width, H=cv.height;
    const key=rgb(o.keep||'#3c8cff'), kh=hueOf(key[0]/255,key[1]/255,key[2]/255), tol=o.tol==null?0.08:o.tol, smin=o.sat==null?0.3:o.sat, sc=o.scale||0.5;
    const O=tmp('mbw-o',W,H); O.ctx.drawImage(cv,0,0);
    const mw=Math.ceil(W*sc), mh=Math.ceil(H*sc), M=tmp('rd-mbw',mw,mh); M.ctx.drawImage(cv,0,0,mw,mh);
    const id=M.ctx.getImageData(0,0,mw,mh), d=id.data;
    for(let p=0;p<d.length;p+=4){ const r=d[p]/255, gg=d[p+1]/255, b=d[p+2]/255, mx=Math.max(r,gg,b), mn=Math.min(r,gg,b), s=mx?((mx-mn)/mx):0; let a=0;
      if(s>=smin*0.7 && mx>0.12){ let dh=Math.abs(hueOf(r,gg,b)-kh); if(dh>0.5) dh=1-dh; a=(1-sstep(tol,tol*1.6,dh))*sstep(smin*0.7,smin,s); }
      d[p]=d[p+1]=d[p+2]=255; d[p+3]=a*255; }
    M.ctx.putImageData(id,0,0);
    const C=tmp('mbw-c',W,H); C.ctx.drawImage(O,0,0); C.ctx.globalCompositeOperation='destination-in'; C.ctx.imageSmoothingEnabled=true; C.ctx.drawImage(M,0,0,W,H); C.ctx.globalCompositeOperation='source-over';
    g.save(); g.setTransform(1,0,0,1,0,0); g.globalAlpha=k;
    const con=o.contrast||3, br=o.bright||1.1;
    if(hasFilter(g)){ g.filter=`grayscale(1) contrast(${con}) brightness(${br})`; g.drawImage(O,0,0); g.filter=`saturate(1.35)`; g.drawImage(C,0,0); g.filter='none'; }
    else { const G=tmp('rd-mbw-g',W,H); G.ctx.drawImage(O,0,0); const gi=G.ctx.getImageData(0,0,W,H), q=gi.data;   // máy không có ctx.filter (Safari cũ)
      for(let p=0;p<q.length;p+=4){ let y=(0.299*q[p]+0.587*q[p+1]+0.114*q[p+2])/255; y=clamp((y-0.5)*con+0.5,0,1)*br*255; q[p]=q[p+1]=q[p+2]=y>255?255:y; }
      G.ctx.putImageData(gi,0,0); g.drawImage(G,0,0); g.drawImage(C,0,0); }
    g.restore(); };
  function hueOf(r,g,b){ const mx=Math.max(r,g,b), mn=Math.min(r,g,b), d=mx-mn; if(!d) return 0; let h;
    if(mx===r) h=((g-b)/d)%6; else if(mx===g) h=(b-r)/d+2; else h=(r-g)/d+4; h/=6; return h<0?h+1:h; }

  // ───────── 4. BLAST — lửa nổ khối manga ─────────
  // x,y toạ độ màn hình logic — hoặc thêm z → điểm THẾ GIỚI (x,y,z), tự chiếu theo máy + xếp độ sâu cùng sprite
  // t0 giây bắt đầu · life (1.4) · size bán kính đơn vị (120) · seed · n số cụm (14) · rise bốc lên (0.6 × size)
  // pha: 0–25% lửa đỏ-cam lõi vàng → 25–60% chuyển dần thành khói nâu → cuối tan (khối vẫn có viền đen)
  FX.blast=(F,o={})=>{ const t=F.t-(o.t0||0), life=o.life||1.4; if(t<0||t>life) return; const u=t/life;
    let X=o.x||0, Y=o.y||0, S=o.size||120, dep=null;
    if(o.z!=null){ const K=window.CineKit, P=K&&F.B?K.proj(F.B,o.x||0,o.y||0,o.z):null; if(!P) return; X=P.x; Y=P.y; S*=P.s; dep=P.d; }
    const draw=()=>drawBlast(F.g,X,Y,S,u,o);
    if(dep!=null) F.list.push({d:dep-2,fn:draw}); else draw(); };
  function drawBlast(g,X,Y,S,u,o){ const seed=o.seed||1, n=o.n||14, rise=o.rise==null?0.6:o.rise, f=1-seg(u,0.25,0.6), fade=1-seg(u,0.82,1);
    const outer=mix([125,85,55],[235,72,30],f), shade=mix([80,52,35],[165,28,18],f), core=mix([170,125,85],[255,205,70],f), lw=Math.max(2,S*0.055);
    const B=[]; const grow=eout3(Math.min(1,u*3.2));
    for(let i=0;i<n;i++){ const s=seed*53+i, ang=hash(s)*TAU, dist=S*(0.12+0.62*hash(s+1))*eout3(Math.min(1,u*2.2));
      const r=S*(0.26+0.3*hash(s+2))*(0.35+0.65*grow)*(1+0.3*u)*(1-0.35*seg(u,0.7,1));
      B.push([X+Math.cos(ang)*dist*1.15, Y+Math.sin(ang)*dist*0.75-S*rise*Math.pow(u,1.3)*(0.6+0.8*hash(s+3)), r]); }
    for(let i=0;i<5;i++){ const s=seed*31+i+200, ang=-Math.PI/2+(hash(s)-0.5)*2.6, dist=S*(0.6+1.1*eout3(Math.min(1,u*1.8)))*(0.7+0.5*hash(s+1));   // cụm nhỏ văng xa
      B.push([X+Math.cos(ang)*dist, Y+Math.sin(ang)*dist*0.8-S*rise*u, S*0.12*(0.6+0.6*hash(s+2))*(1-0.5*u)]); }
    g.save(); g.globalAlpha=fade*(o.a==null?1:o.a);
    if(u<0.07){ g.fillStyle=`rgba(255,250,225,${1-u/0.07})`; g.beginPath(); g.arc(X,Y,S*(0.5+6*u),0,TAU); g.fill(); }   // loé mở màn
    const pass=(col,dr,ox,oy,kr)=>{ g.fillStyle=col; g.beginPath(); for(const b of B){ const r=b[2]*kr+dr; if(r<=0) continue; g.moveTo(b[0]+ox*b[2]+r,b[1]+oy*b[2]); g.arc(b[0]+ox*b[2],b[1]+oy*b[2],r,0,TAU); } g.fill(); };
    pass('#120a08',lw,0,0,1);                       // viền mực (gộp mọi cụm thành 1 khối)
    pass(`rgb(${outer})`,0,0,0,1);                  // màu khối
    pass(`rgb(${shade})`,0,0.24,0.26,0.68);         // mảng tối dưới-phải (cel shade)
    if(f>0.02 || u<0.9){ g.globalAlpha*=0.35+0.65*f; pass(`rgb(${core})`,0,-0.2,-0.24,0.48); }   // lõi sáng trên-trái
    g.restore(); }

  // ───────── 5. RIM LIGHT — ngược sáng ─────────
  // col viền 'r,g,b' (255,240,220) · k độ sáng viền (1) · w độ dày viền logic (1.6% bề rộng) · dir hướng NGUỒN SÁNG độ (bỏ trống = sáng bao quanh, -90 = từ trên)
  // dark độ tối thân 0–1 (0.85) · darkCol 'r,g,b' (14,10,20) · glow quầng sáng sau lưng (0.35) · bloom loé quanh viền (0.7, 0 = tắt cho nhanh) · a
  FX.rimLight=(F,img,x,y,w,h,o={})=>{ const c=srcOf(img); if(!c) return; const g=F.g, A=o.a==null?1:o.a; if(A<=0.01) return;
    const K=Math.min(scOf(F),2), col=rgb(o.col||'255,240,220').join(','), dk=rgb(o.darkCol||'14,10,20').join(','), th=o.w||Math.max(2,w*0.016), k=o.k==null?1:o.k;
    const pad=Math.ceil(th*K*2)+2, PW=w*K+pad*2, PH=h*K+pad*2, T=tmp('rim',PW,PH), q=T.ctx, S=sil(c,`rgb(${col})`,true);
    if(o.dir!=null){   // 1 nguồn sáng: bỏ bản dịch về phía ngược nguồn sáng → còn dải mép phía nguồn sáng
      q.drawImage(S,pad,pad,w*K,h*K); q.globalCompositeOperation='destination-out';
      q.drawImage(S,pad-Math.cos(o.dir*D2R)*th*K,pad-Math.sin(o.dir*D2R)*th*K,w*K,h*K); }
    else {             // sáng bao quanh: viền = bóng − bóng CO VÀO (giao của 8 bản dịch)
      const E=tmp('rim-e',PW,PH), e=E.ctx; e.drawImage(S,pad,pad,w*K,h*K); e.globalCompositeOperation='destination-in';
      for(let i=0;i<8;i++){ const a=i*Math.PI/4; e.drawImage(S,pad+Math.cos(a)*th*K,pad+Math.sin(a)*th*K,w*K,h*K); }
      q.drawImage(S,pad,pad,w*K,h*K); q.globalCompositeOperation='destination-out'; q.drawImage(E,0,0); }
    q.globalCompositeOperation='source-over';
    const glow=o.glow==null?0.35:o.glow;
    g.save(); g.globalAlpha=A;
    if(glow>0){ g.globalAlpha=A*glow*k; g.globalCompositeOperation='lighter'; const sx=w*0.05, sy=h*0.04; g.drawImage(S,x-sx/2,y-sy/2,w+sx,h+sy); g.globalCompositeOperation='source-over'; g.globalAlpha=A; }
    g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,x,y,w,h);
    g.globalAlpha=A*(o.dark==null?0.85:o.dark); g.drawImage(sil(c,`rgb(${dk})`),x,y,w,h);
    g.globalCompositeOperation='lighter'; g.globalAlpha=A*k; const bx=x-pad/K, by=y-pad/K, bw=PW/K, bh=PH/K; g.drawImage(T,bx,by,bw,bh);
    const bloom=o.bloom==null?0.7:o.bloom;   // quầng loé quanh viền: nhoè ở 1/3 độ phân giải (nhoè cả khung to rất chậm)
    if(bloom>0 && hasFilter(g)){ const s3=1/3, Bm=tmp('rim-b',PW*s3,PH*s3); Bm.ctx.filter=`blur(${Math.max(1,th*K*s3*1.2)}px)`; Bm.ctx.drawImage(T,0,0,PW*s3,PH*s3); Bm.ctx.filter='none';
      g.globalAlpha=A*k*bloom; g.drawImage(Bm,0,0,Bm.width,Bm.height,bx,by,bw,bh); }
    g.restore(); };

  // ───────── gắn vào CineKit.fx (cine-kit có thể tải SAU file này) ─────────
  window.CineKitFx=FX;
  const attach=()=>{ if(!window.CineKit) return false; window.CineKit.fx=Object.assign(window.CineKit.fx||{},FX); return true; };
  if(!attach()){ let n=0; const iv=setInterval(()=>{ if(attach()||++n>600) clearInterval(iv); },20); }
})();
