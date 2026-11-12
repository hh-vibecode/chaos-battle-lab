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
  // 🎬 (9/11 nâng cấp theo meme-anime-lab/playbook — kaiju-a, kaiju-b, fight-1): glimpse = ngước lên thấy trời tối + mép bóng khổng lồ (báo trước) ·
  //    reveal = BỘ BA lộ diện quái: cực cận lướt mặt Friend (mắt bật sáng) → roar: góc giun ĐỨNG YÊN đọc tỉ lệ → react: cận Banana Cat ngước khóc → title ·
  //    d2a = dân chạy TIỀN CẢNH 0.5s · d5b = nổ góc chim → GÓC GIUN · d6 = TĨNH TRƯỚC PHÁ 0.4s · d7 = HẬU QUẢ đứng yên
  const T={ street:0, stand:7, shadow:11, glimpse:12.9, cry:14, splat:15.7, reveal:16.5, roar:18.4, react:20.6, title:21.0, glass:21.0, d1:22.5, d2a:24.5, d2:25.0, d3:26.3, d4:28, d5:30, d5b:31.0, d6:32, d7:34, roof:37, line:46.6, booms:61.8, group:65.0, akaT:65.4, DUR:75.4 };   // 10/11: nóc nhà dài thêm 6.2s cho thoại đúng tốc độ nói
  const FXr=()=>window.CineKitFx;   // hiệu ứng manga (js/vfx-manga.js) — gọi trong cảnh sau cam(): toạ độ thế giới của cảnh
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
  // 📏 TỈ LỆ (anh dặn 9/11: "meme nó bé mà, sao toàn to gần bằng nhà"): 1 meme đứng cao MEME_H đơn vị.
  //    Tầng trệt cửa hàng GF ≈ 3.1× meme (biển hiệu + mái hiên + tủ kính), tầng trên FL ≈ 2.6× · cửa ra vào ≈ 1.75× · ô tô ≈ 1.5× · xe buýt ≈ 3× ·
  //    quầy kem ≈ 1.4× (dù ≈ 2.6×) · cây / cột đèn ≈ 4.5–5× · cửa hàng mặt phố 3–5 tầng · cao tầng phía sau 15–40 tầng (xa nên mỗi tầng vẽ nhỏ lại).
  //    person / kid NHẬN kích thước kiểu cũ (100 = 1 meme) rồi tự nhân MK → mọi cảnh gọi person(…,92,…) tự đúng tỉ lệ. Cảnh cận thì ZOOM máy, không phóng to meme.
  const MEME_H=32, MK=MEME_H/100, GF=100, FL=84, DOOR_H=56;
  const SKY_DAY=['#5aa9ec','#a8d6fb','#ffe6c4'];
  // 🌄 PHÔNG VẼ GPT (Bước 4, 10/11): ảnh nền là lớp XA NHẤT — cảnh 1 BG_DAY (phố bình yên), cảnh 2 BG_RED (trăng máu, cityRuin). Chỉ vẽ khi gọi sky có hy
  //    (= toạ độ y THẾ GIỚI của chân trời, đặt sau chân dãy cao tầng xa). Ảnh cao PANO_H đơn vị (meme 32 → ảnh rộng ≈ 42 meme), trượt parallax 0.1 theo máy
  //    (tâm máy lấy từ ma trận đang vẽ), lặp ngang kiểu soi gương; phần dưới chân trời của ảnh (mái nhà xa) bị dãy nhà + phố che.
  const PANO={ day:{im:'bgDay',hz:0.69}, red:{im:'bgRed',hz:0.675} }, PANO_H=900, PANO_PAR=0.1;
  function panoBg(g,P,hy){ const im=IM&&IM[P.im]; if(!im||!im.complete||!im.naturalWidth) return false;
    let cx=480; try{ const p=g.getTransform().inverse().transformPoint(new DOMPoint(g.canvas.width/2,g.canvas.height/2)); cx=p.x; }catch(e){}
    const s=PANO_H/im.naturalHeight, W=im.naturalWidth*s, y0=hy-P.hz*PANO_H, base=cx*(1-PANO_PAR)+480*PANO_PAR-W/2;   // máy ở x=480 → giữa ảnh giữa khung
    if(!im.__top){ im.__top='90,140,220'; try{ const c=document.createElement('canvas'); c.width=c.height=2; const x=c.getContext('2d'); x.drawImage(im,0,0,im.naturalWidth,im.naturalHeight*0.03,0,0,2,2);
      const d=x.getImageData(0,0,1,1).data; im.__top=d[0]+','+d[1]+','+d[2]; }catch(e){} }
    g.fillStyle=`rgb(${im.__top})`; g.fillRect(cx-2600,y0-2400,5200,2402);   // trên mép ảnh: màu đỉnh ảnh (máy ngước cao không lộ mép)
    let n=Math.floor((cx-2600-base)/W);
    for(let x=base+n*W; x<cx+2600; x+=W, n++){ if(n&1){ g.save(); g.translate(x+W,0); g.scale(-1,1); g.drawImage(im,0,y0,W+1,PANO_H); g.restore(); } else g.drawImage(im,x,y0,W+1,PANO_H); }
    return true; }
  function sky(g,t,dark,red,hy){ const gr=g.createLinearGradient(0,-500,0,560);
    gr.addColorStop(0,SKY_DAY[0]); gr.addColorStop(0.55,SKY_DAY[1]); gr.addColorStop(1,SKY_DAY[2]);
    g.fillStyle=gr; g.fillRect(-3000,-1200,9000,2600);
    const pn=hy!=null&&panoBg(g,red>=0.5?PANO.red:PANO.day,hy); if(pn&&red>=0.5) red=0;   // ảnh trăng máu đã đỏ sẵn → bỏ lớp phủ đỏ
    const cl=pn?0:(1-Math.min(1,dark*1.4))*(1-Math.min(1,red*1.5));   // mây trắng trôi chậm (trời sáng; ảnh vẽ đã có mây)
    if(cl>0.02) for(let i=0;i<9;i++){ const x=-900+520*i+((t*7+400*H(i,401))%520), y=-150+150*H(i,402), s=0.7+0.6*H(i,403);
      for(let k=0;k<4;k++) blob(g,x+(k-1.5)*42*s,y+(k%2?-10:6)*s,46*s,'255,255,255',0.42*cl); }
    g.globalAlpha=1;
    if(red>0){ const r=g.createLinearGradient(0,-400,0,560); r.addColorStop(0,'#14020a'); r.addColorStop(0.55,'#5a0d12'); r.addColorStop(1,'#d2461c'); g.globalAlpha=red; g.fillStyle=r; g.fillRect(-3000,-1200,9000,2600); g.globalAlpha=1; }
    if(dark>0){ g.globalAlpha=dark; g.fillStyle='#120818'; g.fillRect(-3000,-1200,9000,2600); g.globalAlpha=1; } }
  const BLD={};
  function bset(seed,n,x0,span,hmin,hvar,wmin,wvar,gap){ gap=gap||10; const k=seed+'|'+n+'|'+gap; if(BLD[k]) return BLD[k]; const out=[]; let x=x0;
    for(let i=0;i<n && x<x0+span;i++){ const w=wmin+wvar*H(seed,i), h=hmin+hvar*Math.pow(H(seed+1,i),1.4); out.push({x,w,h,seed:seed*100+i,roof:H(seed+2,i)}); x+=w+4+gap*H(seed+3,i); }
    return BLD[k]=out; }
  // 1 toà CAO TẦNG: thân + mặt dựng theo kiểu (lưới ô / dải kính / lam đứng) + chi tiết mái (bể nước, ăng-ten, biển quảng cáo, chóp)
  //   o: fl = chiều cao 1 tầng (xa → nhỏ) · far = chỉ vẽ dải tầng (rẻ) · det = chi tiết (điều hoà, ban công, mái) · haze + hazeCol = sương không khí (xa → nhạt)
  //      ruin = mái gãy lởm chởm (cảnh cháy) · glass = màu kính tối · cw/ch/gx/gy = kiểu cũ (lưới ô cố định)
  const BB=['#e53935','#1e88e5','#fdd835','#43a047','#ff7043','#8e24aa'];
  function building(g,b,base,col,win,lit,o={}){ const {x,w,h}=b; let top=base-h; const sty=H(b.seed,5), fl=o.fl||16, glass=o.glass||'rgba(22,34,56,0.5)';
    let jag=0;
    if(o.ruin && H(b.seed,11)<0.6){ jag=fl*(1.5+2.5*H(b.seed,12)); g.fillStyle=col; g.beginPath(); g.moveTo(x,base+2); g.lineTo(x,top+jag*H(b.seed,13));   // mái gãy
      for(let k=1;k<6;k++) g.lineTo(x+w*k/6,top+jag*H(b.seed,13+k)); g.lineTo(x+w,top+jag*H(b.seed,20)); g.lineTo(x+w,base+2); g.closePath(); g.fill(); }
    else { g.fillStyle=col; g.fillRect(x,top,w,h+2);
      if(b.roof>0.62){ g.fillRect(x+w*0.18,top-fl*0.9,w*0.64,fl*0.9); g.fillRect(x+w*0.5-1,top-fl*3,2.4,fl*2.2); }               // tầng kỹ thuật + ăng-ten
      else if(b.roof<0.16){ g.beginPath(); g.moveTo(x,top); g.lineTo(x+w/2,top-w*0.35); g.lineTo(x+w,top); g.closePath(); g.fill(); } }   // chóp
    g.fillStyle='rgba(255,255,255,0.07)'; g.fillRect(x,top+jag,w*0.1,h-jag);           // cạnh sáng
    g.fillStyle='rgba(0,0,0,0.16)'; g.fillRect(x+w*0.88,top+jag,w*0.12,h-jag);         // cạnh tối
    const y1=top+jag+fl*0.5, rows=Math.floor((base-y1-fl*0.3)/fl);
    if(o.far){ g.fillStyle=o.band||'rgba(40,60,90,0.28)'; for(let r=0;r<rows;r++) g.fillRect(x+w*0.08,y1+r*fl,w*0.82,fl*0.38);
      for(let r=0;r<rows;r+=2) if(H(b.seed+r,3)<lit){ g.fillStyle=win; g.fillRect(x+w*(0.15+0.6*H(b.seed,r)),y1+r*fl,w*0.1,fl*0.38); } }
    else if(o.cw){ const cw=o.cw, ch=o.ch||9, gx=o.gx||5, gy=o.gy||7, nx=Math.floor((w-8)/(cw+gx)), ny=Math.floor((h-jag-12)/(ch+gy));   // kiểu cũ (lưới cố định)
      for(let j=0;j<ny;j++) for(let i=0;i<nx;i++){ g.fillStyle=H(b.seed+i*3.1,j*7.7)<lit?win:glass; g.fillRect(x+4+i*(cw+gx)+((w-8)-(nx*(cw+gx)-gx))/2,top+jag+8+j*(ch+gy),cw,ch); } }
    else if(sty<0.42){ const ww=fl*0.34, nx=Math.max(2,Math.floor((w-8)/(fl*0.58))), sp=(w-nx*ww)/(nx+1);   // lưới ô cửa + điều hoà + ban công
      for(let r=0;r<rows;r++){ const yy=y1+r*fl; for(let i=0;i<nx;i++){ const xx=x+sp+i*(ww+sp); g.fillStyle=H(b.seed+i*3.1,r*7.7)<lit?win:glass; g.fillRect(xx,yy,ww,fl*0.5);
          if(o.det && H(b.seed+i,r+40)<0.22){ g.fillStyle='rgba(225,228,232,0.95)'; g.fillRect(xx+ww*0.1,yy+fl*0.56,ww*0.8,fl*0.22); } }
        if(o.det && sty<0.2 && r%2===0){ g.fillStyle='rgba(40,44,52,0.55)'; g.fillRect(x+3,yy+fl*0.62,w-6,Math.max(1,fl*0.07)); } } }
    else if(sty<0.74){ for(let r=0;r<rows;r++){ const yy=y1+r*fl; g.fillStyle=H(b.seed,r*3.3)<lit*1.4?win:glass; g.fillRect(x+w*0.06,yy,w*0.86,fl*0.42);   // dải kính ngang
        g.fillStyle='rgba(255,255,255,0.18)'; for(let k=x+w*0.06+fl*0.7;k<x+w*0.9;k+=fl*0.7) g.fillRect(k,yy,1,fl*0.42); } }
    else { const n=Math.max(3,Math.floor(w/(fl*0.5))); for(let i=0;i<n;i++){ const xx=x+w*0.06+i*(w*0.86/n); g.fillStyle=H(b.seed,i+60)<lit?win:glass; g.fillRect(xx,y1,w*0.86/n-2.5,base-y1-fl*0.3); } }   // lam đứng
    if(o.det && !jag){ const rv=H(b.seed,7);
      if(rv<0.3){ const tx=x+w*(0.2+0.4*H(b.seed,8)), tw=Math.min(w*0.3,fl*1.1); g.fillStyle='rgba(60,64,72,0.9)'; g.fillRect(tx+tw*0.15,top-fl*0.5,1.5,fl*0.5); g.fillRect(tx+tw*0.8,top-fl*0.5,1.5,fl*0.5);   // bể nước
        g.fillStyle='#9aa4ae'; g.fillRect(tx,top-fl*1.4,tw,fl*0.9); g.beginPath(); g.moveTo(tx,top-fl*1.4); g.lineTo(tx+tw/2,top-fl*1.8); g.lineTo(tx+tw,top-fl*1.4); g.fill(); }
      else if(rv<0.48){ const bw=w*0.8, bh=fl*1.6, bx=x+w*0.1, by=top-bh-fl*0.6; g.fillStyle='rgba(50,54,60,0.9)'; g.fillRect(bx+bw*0.2,by+bh,2,fl*0.6); g.fillRect(bx+bw*0.8,by+bh,2,fl*0.6);   // biển quảng cáo
        g.fillStyle=BB[(b.seed|0)%BB.length]; g.fillRect(bx,by,bw,bh); g.fillStyle='rgba(255,255,255,0.85)'; g.fillRect(bx+bw*0.1,by+bh*0.3,bw*0.55,bh*0.16); g.fillRect(bx+bw*0.1,by+bh*0.58,bw*0.35,bh*0.12); } }
    if(o.haze>0){ g.globalAlpha=o.haze; g.fillStyle=o.hazeCol||'#cfe2f5'; g.fillRect(x-1,top-fl*3.2,w+2,h+fl*3.2+2); g.globalAlpha=1; } }
  // lớp cao tầng (parallax par: 0 = đứng yên xa tít, 1 = đi theo máy) — chỉ vẽ toà nằm trong tầm nhìn
  function skyline(g,camx,par,base,seed,n,hmin,hvar,wmin,wvar,col,win,lit,o){ g.save(); const off=camx*(1-par), V=(o&&o.view)||1500; g.translate(off,0);
    for(const b of bset(seed,n,-1400,5400,hmin,hvar,wmin,wvar,o&&o.gap)){ const sx=b.x+off; if(sx+b.w<camx-V || sx>camx+V) continue; building(g,b,base,col,win,lit,o||{}); } g.restore(); }
  // MẶT PHỐ: vỉa hè lát gạch sâu 46 (meme đi ở y0+8…+40) · bó vỉa · lòng đường 2 làn (xe chiều + đáy y0+112, chiều − đáy y0+195), vạch giữa y0+130 ·
  //   vạch qua đường mỗi 2000 đơn vị · nắp cống
  const LANE_A=112, LANE_B=195;
  function street(g,y0){ g.fillStyle='#cdc6ba'; g.fillRect(-3000,y0,9000,46); g.fillStyle='rgba(0,0,0,0.07)'; for(let x=-3000;x<6000;x+=30) g.fillRect(x,y0,1.2,46); g.fillRect(-3000,y0+23,9000,1.2);
    g.fillStyle='#9a958b'; g.fillRect(-3000,y0+46,9000,5); g.fillStyle='#6f6b63'; g.fillRect(-3000,y0+51,9000,2);
    g.fillStyle='#4a4c52'; g.fillRect(-3000,y0+53,9000,260); g.fillStyle='rgba(255,255,255,0.035)'; g.fillRect(-3000,y0+150,9000,40);
    g.fillStyle='#e9e3d0'; g.fillRect(-3000,y0+60,9000,2); for(let x=-3000;x<6000;x+=80) g.fillRect(x,y0+129,40,4);
    for(let cx=-1300;cx<6000;cx+=2000) for(let y=y0+64;y<y0+250;y+=17) g.fillRect(cx-55,y,110,8);   // vạch qua đường
    g.fillStyle='rgba(0,0,0,0.25)'; for(let x=-2800;x<6000;x+=700){ g.beginPath(); g.ellipse(x,y0+222,16,4,0,0,TAU); g.fill(); } }
  // DÃY CỬA HÀNG mặt phố: 3–5 tầng. Tầng trệt GF: biển hiệu + mái hiên sọc + tủ kính + cửa (cao DOOR_H ≈ 1.75 meme); tầng trên FL: cửa sổ có khung,
  //   rèm, máy điều hoà, có nhà có ban công + chậu cây; mái: gờ, bể nước / ăng-ten / biển quảng cáo. o.burn = cảnh cháy (kính vỡ tối, ánh lửa trong nhà)
  const AWN=[['#e53935','#fff'],['#1e88e5','#fff'],['#43a047','#fff'],['#fb8c00','#fff8e1'],['#8e24aa','#fff'],['#00897b','#e0f2f1']];
  const SHOPN=['MEME MART','CAFÉ DOGE','RAMEN','BAKERY','BOOKS','FLOWERS','PHỞ 24','ARCADE','PHARMACY','SUSHI','TOYS','KARAOKE'];
  const SHOPX=[]; { let x=-3000; for(let i=0;x<7000;i++){ SHOPX.push(x); x+=Math.round(190+110*H(41,i))+3; } }   // 1 dãy phố CỐ ĐỊNH: mọi cảnh thấy cùng các nhà
  function shops(g,y0,x0,x1,o={}){ for(let i=0;i<SHOPX.length-1;i++){ const x=SHOPX[i], w=SHOPX[i+1]-x-3; if(x+w<x0) continue; if(x>x1) break;
      const nf=2+Math.floor(3*H(42,i)), h=GF+nf*FL, hue=Math.round(15+330*H(43,i)), sat=22+22*H(44,i)|0, lig=68+14*H(45,i)|0;
      const base=`hsl(${hue},${sat}%,${lig}%)`, trim=`hsl(${hue},${sat}%,${lig-26}%)`, c=AWN[i%AWN.length];
      g.fillStyle=base; g.fillRect(x,y0-h,w,h); g.fillStyle='rgba(0,0,0,0.10)'; g.fillRect(x+w-8,y0-h,8,h);
      g.fillStyle=trim; g.fillRect(x-3,y0-h-7,w+6,9); for(let f=0;f<nf;f++) g.fillRect(x,y0-GF-f*FL-3,w,3);   // gờ mái + gờ tầng
      // tầng trên
      const nw=Math.max(2,Math.floor((w-24)/64)), ww=30, wh=40, sp=(w-nw*ww)/(nw+1), bal=H(46,i)<0.35;
      for(let f=0;f<nf;f++){ const wy=y0-GF-(f+1)*FL+20;
        for(let q=0;q<nw;q++){ const wx=x+sp+q*(ww+sp), lit=H(i*7+f,q)<0.28;
          g.fillStyle=trim; g.fillRect(wx-2,wy-2,ww+4,wh+4);
          g.fillStyle=o.burn?(H(i+f,q)<0.3?'#ff8a3a':'#1a0d0e'):o.broke?'#141820':(lit?'#ffe3a8':'#9cc6e8'); g.fillRect(wx,wy,ww,wh); if(o.out) o.out.push({x:wx,y:wy,w:ww,h:wh,k:i*17+f*5+q});
          if(o.broke) brokenPane(g,wx,wy,ww,wh,i*17+f*5+q);
          else if(!o.burn){ g.fillStyle='rgba(255,255,255,0.35)'; g.fillRect(wx+3,wy+3,ww*0.24,wh-6); if(H(i*3+f,q+9)<0.4){ g.fillStyle=`hsl(${(hue+150)%360},40%,70%)`; g.fillRect(wx,wy,ww*0.3,wh); } }   // phản sáng + rèm
          g.fillStyle=trim; g.fillRect(wx+ww/2-1,wy,2,wh);
          if(H(i*11+f,q+3)<0.32){ g.fillStyle='#dfe3e8'; g.fillRect(wx+ww+3,wy+wh-12,15,11); g.fillStyle='#8f98a2'; g.fillRect(wx+ww+5,wy+wh-9,11,1.5); g.fillRect(wx+ww+5,wy+wh-5,11,1.5); } }   // điều hoà
        if(bal){ const by=wy+wh; g.fillStyle='rgba(55,58,66,0.9)'; g.fillRect(x+8,by,w-16,3); g.fillRect(x+8,by-15,w-16,2); for(let k=x+10;k<x+w-10;k+=7) g.fillRect(k,by-14,1.5,14);
          for(let k=0;k<3;k++) blob(g,x+26+k*(w-52)/2,by-14,8,'70,150,70',0.9); g.globalAlpha=1; } }
      // mái
      const rv=H(47,i), ry=y0-h-7;
      if(rv<0.3){ const tx=x+w*0.62; g.fillStyle='#6b7178'; g.fillRect(tx+4,ry-10,2,10); g.fillRect(tx+22,ry-10,2,10); g.fillStyle='#a7b0b8'; g.fillRect(tx,ry-30,28,20); g.fillStyle='#8c949c'; g.fillRect(tx,ry-30,28,4); }   // bể nước
      else if(rv<0.5){ g.fillStyle='#4a4f57'; g.fillRect(x+w*0.3,ry-34,2,34); g.fillRect(x+w*0.3-8,ry-26,18,2); }   // ăng-ten
      else if(rv<0.62){ const bw=w*0.7, bx=x+w*0.15; g.fillStyle='#4a4f57'; g.fillRect(bx+10,ry-12,3,12); g.fillRect(bx+bw-13,ry-12,3,12); g.fillStyle=BB[i%BB.length]; g.fillRect(bx,ry-56,bw,44);   // biển quảng cáo
        g.save(); g.font=`900 15px ${SANS}`; g.textAlign='center'; g.textBaseline='middle'; g.fillStyle='#fff'; g.fillText(['MEME COLA','DOGE COIN','STONKS','CHEEMS BANK'][i%4],bx+bw/2,ry-34); g.restore(); }
      // tầng trệt
      g.fillStyle=trim; g.fillRect(x+6,y0-GF+4,w-12,20);
      g.save(); g.font=`800 12px ${SANS}`; g.letterSpacing='1.5px'; g.textAlign='center'; g.textBaseline='middle'; g.fillStyle='#fff'; g.fillText(SHOPN[i%SHOPN.length],x+w/2,y0-GF+14.5); g.restore();
      const ay=y0-GF+27, ah=13; for(let k=0;k*16<w-10;k++){ const ax=x+5+k*16, aw=Math.min(16,x+w-5-ax); g.fillStyle=k%2?c[0]:c[1]; g.fillRect(ax,ay,aw,ah); g.beginPath(); g.arc(ax+aw/2,ay+ah,aw/2,0,Math.PI); g.fill(); }   // mái hiên sọc viền lượn
      g.fillStyle='rgba(0,0,0,0.12)'; g.fillRect(x+5,ay+ah+8,w-10,3);
      const left=H(48,i)<0.5, dx=left?x+14:x+w-44, gx0=left?x+52:x+12, gw=w-64, gy=y0-DOOR_H+2;
      const gr=g.createLinearGradient(0,gy,0,y0); gr.addColorStop(0,o.burn?'#2a1010':o.broke?'#10141c':'#2c4a66'); gr.addColorStop(1,o.burn?'#120606':o.broke?'#1c2230':'#86b3d4'); g.fillStyle=gr; g.fillRect(gx0,gy,gw,y0-gy-4);   // tủ kính
      if(o.out) o.out.push({x:gx0,y:gy,w:gw,h:y0-gy-4,k:i*17+99,big:1});
      if(o.broke){ brokenPane(g,gx0,gy,gw,y0-gy-4,i*17+99); for(let k=0;k<4;k++){ g.fillStyle=['#ffcc80','#ef9a9a','#a5d6a7','#90caf9'][(i+k)%4]; g.fillRect(gx0+12+k*(gw-24)/4,y0-16,(gw-24)/4-6,10); } }
      else if(!o.burn){ g.fillStyle='rgba(255,255,255,0.22)'; g.beginPath(); g.moveTo(gx0+gw*0.15,gy); g.lineTo(gx0+gw*0.32,gy); g.lineTo(gx0+gw*0.12,y0-4); g.lineTo(gx0,y0-4); g.lineTo(gx0,gy+gw*0.2); g.fill();
        for(let k=0;k<4;k++){ g.fillStyle=['#ffcc80','#ef9a9a','#a5d6a7','#90caf9'][(i+k)%4]; g.fillRect(gx0+12+k*(gw-24)/4,y0-16,(gw-24)/4-6,10); } }
      else { g.save(); g.globalCompositeOperation='lighter'; blob(g,gx0+gw/2,y0-20,gw*0.5,'255,110,30',0.45); g.restore(); g.globalAlpha=1; }
      g.fillStyle=trim; g.fillRect(gx0-2,gy-2,gw+4,3); g.fillRect(dx-2,y0-DOOR_H-2,34,DOOR_H+2);   // khung kính + khung cửa
      g.fillStyle=o.burn?'#1a0d0e':'#5d7f9a'; g.fillRect(dx,y0-DOOR_H,30,DOOR_H); g.fillStyle='rgba(255,255,255,0.3)'; g.fillRect(dx+4,y0-DOOR_H+4,9,DOOR_H-10); g.fillStyle='#d8c27a'; g.fillRect(dx+23,y0-DOOR_H*0.5,3,8); } }   // cửa
  // ô kính VỠ (cảnh sóng âm, 11/11): lỗ tối + răng kính lởm chởm bám mép khung + vài vết nứt còn sáng
  function brokenPane(g,x,y,w,h,k){ g.save(); g.fillStyle='rgba(205,232,250,0.85)';
    const tooth=(ax,ay,bx,by,nx,ny)=>{ const n=3+Math.floor(3*H(k,7)); for(let i=0;i<n;i++){ const f0=i/n, f1=(i+1)/n, d=(0.15+0.35*H(k+i,ax|0))*Math.min(w,h);
        const p0x=ax+(bx-ax)*f0, p0y=ay+(by-ay)*f0, p1x=ax+(bx-ax)*f1, p1y=ay+(by-ay)*f1, fm=lerp(f0,f1,H(k+i,3));
        g.beginPath(); g.moveTo(p0x,p0y); g.lineTo(p1x,p1y); g.lineTo(ax+(bx-ax)*fm+nx*d,ay+(by-ay)*fm+ny*d); g.closePath(); g.fill(); } };
    tooth(x,y,x+w,y,0,1); tooth(x+w,y+h,x,y+h,0,-1); tooth(x,y+h,x,y,1,0); tooth(x+w,y,x+w,y+h,-1,0);
    g.strokeStyle='rgba(235,248,255,0.55)'; g.lineWidth=0.8; const cx=x+w*(0.3+0.4*H(k,9)), cy=y+h*(0.3+0.4*H(k,10));
    for(let i=0;i<5;i++){ const a=TAU*(i/5+H(k,i+20)*0.15), L=Math.max(w,h)*0.6; g.beginPath(); g.moveTo(cx,cy); g.lineTo(cx+Math.cos(a)*L*0.5,cy+Math.sin(a)*L*0.5+2); g.lineTo(cx+Math.cos(a)*L,cy+Math.sin(a)*L); g.stroke(); }
    g.restore(); }
  // CÂY xanh vỉa hè (s=1 ≈ 4.5 meme) · CỘT ĐÈN (≈ 5 meme) · ghế · thùng rác · trụ cứu hoả · trạm xe buýt
  function tree(g,x,y,s){ s=s||1; g.fillStyle='#6d4c2f'; g.fillRect(x-3*s,y-70*s,6*s,70*s); g.fillStyle='rgba(0,0,0,0.18)'; g.fillRect(x-11*s,y-3,22*s,4);
    blob(g,x,y-104*s,44*s,'58,132,58',0.97); blob(g,x-22*s,y-88*s,30*s,'48,116,48',0.95); blob(g,x+22*s,y-92*s,32*s,'72,156,66',0.95); blob(g,x+4*s,y-122*s,30*s,'90,170,80',0.9); g.globalAlpha=1; }
  function lamp(g,x,y){ g.fillStyle='#3a3f47'; g.fillRect(x-2,y-158,4,158); g.fillRect(x-6,y-6,12,6); g.fillRect(x-2,y-158,30,3); g.fillStyle='#2b2f35'; g.fillRect(x+20,y-158,14,6); g.fillStyle='#ffe9a8'; g.fillRect(x+22,y-152,10,3); }
  function bench(g,x,y){ g.fillStyle='#5d4037'; g.fillRect(x-22,y-15,44,4); g.fillRect(x-22,y-26,44,4); g.fillStyle='#37474f'; g.fillRect(x-19,y-15,3,15); g.fillRect(x+16,y-15,3,15); g.fillRect(x-19,y-26,2,11); g.fillRect(x+17,y-26,2,11); }
  function busStop(g,x,y){ g.fillStyle='#455a64'; g.fillRect(x-62,y-86,3,86); g.fillRect(x+59,y-86,3,86); g.fillRect(x-68,y-90,136,6);
    g.fillStyle='rgba(180,220,245,0.45)'; g.fillRect(x-58,y-80,116,58); g.fillStyle='#ffca28'; g.fillRect(x-30,y-74,56,30); g.fillStyle='#37474f'; g.fillRect(x-24,y-66,40,4); g.fillRect(x-24,y-58,28,4);
    bench(g,x,y); g.fillStyle='#455a64'; g.fillRect(x+76,y-100,3,100); g.fillStyle='#1565c0'; g.beginPath(); g.arc(x+77,y-104,11,0,TAU); g.fill();
    g.save(); g.font=`900 11px ${SANS}`; g.textAlign='center'; g.textBaseline='middle'; g.fillStyle='#fff'; g.fillText('BUS',x+77,y-104); g.restore(); }
  function hydrant(g,x,y){ g.fillStyle='#d32f2f'; g.fillRect(x-4,y-14,8,14); g.fillRect(x-6,y-10,12,3); g.beginPath(); g.arc(x,y-14,4,Math.PI,0); g.fill(); }
  function bin(g,x,y){ g.fillStyle='#2e7d32'; g.fillRect(x-6,y-18,12,18); g.fillStyle='#1b5e20'; g.fillRect(x-7,y-20,14,3); }
  // đồ vỉa hè SÁT NHÀ (vẽ trước dân phố) và SÁT LỀ ĐƯỜNG (vẽ sau dân phố → che 1 phần = có chiều sâu). Cố định theo lưới 420 đơn vị.
  function propsBack(g,y0,x0,x1){ for(let k=Math.floor(x0/420);k*420<x1;k++){ const X=k*420, v=H(k,501);
      if(((k%6)+6)%6===1) busStop(g,X+200,y0+8); else if(v<0.5) bench(g,X+190,y0+8); else bin(g,X+170,y0+8); } }
  function propsFront(g,y0,x0,x1){ for(let k=Math.floor(x0/420);k*420<x1;k++){ const X=k*420; tree(g,X+70,y0+44,0.95+0.15*H(k,502)); lamp(g,X+300,y0+44); if(H(k,503)<0.4) hydrant(g,X+360,y0+44); } }
  function bus(g,x,y,dir,col){ g.save(); g.translate(x,y); g.scale(dir,1); g.fillStyle='rgba(0,0,0,0.25)'; g.fillRect(-145,-2,290,5);
    g.fillStyle=col||'#fbc02d'; g.beginPath(); g.roundRect(-145,-92,290,82,10); g.fill(); g.fillStyle='rgba(0,0,0,0.12)'; g.fillRect(-145,-30,290,6);
    g.fillStyle='#bfe0f5'; for(let k=0;k<6;k++) g.fillRect(-128+k*40,-80,32,28); g.fillRect(118,-80,20,40); g.fillStyle='#455a64'; g.fillRect(-138,-80,8,64);
    g.fillStyle='#1b1b1b'; for(const q of [-95,90]){ g.beginPath(); g.arc(q,-10,15,0,TAU); g.fill(); } g.fillStyle='#fff6b0'; g.fillRect(138,-36,6,8); g.restore(); }
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
  // h nhận kiểu cũ (100 = 1 meme) → nhân MK: meme thật cao ≈ MEME_H (anh dặn 9/11: meme nhỏ so với nhà)
  function person(g,x,y,h,i,ph,o={}){ h*=MK; const key='c'+(i%CROWD.length), run=o.run, dir=o.dir||1, s=h/100, hop=Math.abs(Math.sin(ph*(run?1.2:0.8)))*(run?16:7)*s;
    g.save(); g.globalAlpha=0.2; g.fillStyle='#000'; g.beginPath(); g.ellipse(x,y,h*0.24,h*0.05,0,0,TAU); g.fill(); g.restore();
    pic(g,key,x,y-hop,h*0.82,{flip:dir<0, rot:run?-dir*0.14+Math.sin(ph*1.2)*0.08:Math.sin(ph*0.8)*0.05});
    if(run && o.scream){ g.save(); g.fillStyle='#7ec8ff'; for(let k=0;k<2;k++){ const f=(TT*2.4+k*0.5+i*0.13)%1; g.globalAlpha=1-f; g.beginPath(); g.ellipse(x+dir*h*0.25+k*6*s,y-h*0.75-hop+f*14*s,2.4*s+0.6,4*s+0.8,0,0,TAU); g.fill(); } g.restore(); } }   // giọt mồ hôi lúc chạy loạn
  // Banana Cat đi mua kem (ảnh thường) → ngước nhìn trời → khóc tuôn nước mắt (ảnh khóc có sẵn) — ice: đang cầm kem · h kiểu cũ (70) → em bé ≈ 0.8 meme
  const KID_K=MK*0.88;
  function kidH(h,cry){ return h*KID_K*(cry?1.55:1.3); }
  function kid(g,x,y,h,o={}){ const hh=kidH(h,o.cry), hop=o.walk?Math.abs(Math.sin(TT*9))*5*KID_K:0;
    g.save(); g.globalAlpha=0.2; g.fillStyle='#000'; g.beginPath(); g.ellipse(x,y,hh*0.22,hh*0.05,0,0,TAU); g.fill(); g.restore();
    pic(g,o.cry?'banCry':'ban',x,y-hop,hh,{rot:o.look?-0.1:0});
    if(o.ice){ g.save(); g.translate(x+hh*0.33,y-hh*0.3-hop); iceCone(g,hh/120); g.restore(); } }
  function iceCone(g,s,rot){ g.save(); if(rot) g.rotate(rot); g.fillStyle='#d79b54'; g.beginPath(); g.moveTo(-8*s,0); g.lineTo(8*s,0); g.lineTo(0,24*s); g.closePath(); g.fill();
    g.fillStyle='#ffd1e1'; g.beginPath(); g.arc(0,-6*s,10*s,0,TAU); g.fill(); g.fillStyle='#fff3c4'; g.beginPath(); g.arc(-3*s,-14*s,7*s,0,TAU); g.fill(); g.restore(); }
  // XE KEM (đáy tại y): thân 64×40 ≈ 1.25 meme, tủ kem kính phía trên, dù sọc hồng-trắng (đỉnh ≈ 2.8 meme), bánh xe. Cornelius nằm trên nóc tủ (vẽ ở cảnh).
  function stand(g,x,y){ g.fillStyle='rgba(0,0,0,0.2)'; g.fillRect(x-34,y-2,68,4);
    g.fillStyle='#ffffff'; g.fillRect(x-32,y-40,64,34); g.fillStyle='#7ecbff'; g.fillRect(x-32,y-26,64,5); g.fillStyle='#e9eef2'; g.fillRect(x+26,y-40,6,34);
    g.fillStyle='#bfe9ff'; g.fillRect(x-28,y-52,56,12); g.fillStyle='rgba(255,255,255,0.6)'; g.fillRect(x-26,y-51,10,10);
    for(let i=0;i<5;i++){ g.fillStyle=['#ffd1e1','#fff3c4','#b9f6ca','#d1c4e9','#ffe0b2'][i]; g.beginPath(); g.arc(x-20+i*10,y-44,3.6,0,TAU); g.fill(); }   // kem trong tủ
    g.fillStyle='#666'; g.fillRect(x-1.5,y-76,3,24);
    for(let i=0;i<8;i++){ g.fillStyle=i%2?'#ff7aa8':'#ffffff'; g.beginPath(); g.moveTo(x,y-90); g.lineTo(x-44+i*11,y-74); g.lineTo(x-44+(i+1)*11,y-74); g.closePath(); g.fill(); }
    g.fillStyle='#1b1b1b'; for(const q of [-20,20]){ g.beginPath(); g.arc(x+q,y-5,5,0,TAU); g.fill(); }
    g.save(); g.font=`900 8px ${SANS}`; g.textAlign='center'; g.fillStyle='#e91e63'; g.fillText('ICE CREAM',x-2,y-13); g.restore(); }

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
  // mảnh vỡ / kính: dir (rad) = văng THEO hướng quét của đuôi (kaiju-b #8: nhà vỡ, mảnh bay theo đuôi), cone = độ toả; bỏ trống = toả lên như cũ · sz = cỡ
  function chunks(g,x,y,t,n,seed,sp,col,dir,cone,sz){ if(t<0) return; for(let i=0;i<n;i++){ const a=dir==null?-Math.PI*(0.1+0.8*H(seed,i)):dir+(H(seed,i)-0.5)*(cone||1.2), v=sp*(0.5+H(seed+1,i)), gx=Math.cos(a)*v*t, gy=Math.sin(a)*v*t+300*t*t, s=(3+7*H(seed+2,i))*(sz||1);
      g.save(); g.translate(x+gx,y+gy); g.rotate(t*6*(H(seed+3,i)-0.5)); g.fillStyle=col||(i%3?'#6b6560':'#9a948c'); g.fillRect(-s/2,-s/2,s,s*0.7); g.restore(); } }
  function glass(g,x,y,t,n,seed,dir,cone){ if(t<0) return; g.save(); for(let i=0;i<n;i++){ const a=dir==null?TAU*H(seed,i):dir+(H(seed,i)-0.5)*(cone||1.4), v=180+260*H(seed+1,i), s=3+5*H(seed+2,i);
      g.globalAlpha=Math.max(0,1-t*1.2); g.fillStyle=i%2?'rgba(200,235,255,0.9)':'rgba(255,255,255,0.8)'; g.beginPath(); const px=x+Math.cos(a)*v*t, py=y+Math.sin(a)*v*t+200*t*t;
      g.moveTo(px,py); g.lineTo(px+s,py+s*0.4); g.lineTo(px+s*0.2,py+s); g.closePath(); g.fill(); } g.restore(); }
  // 🦊 ĐUÔI BÓNG TỐI (anh dặn 9/11: đuôi quật kiểu Cửu Vĩ phá làng Lá — kaiju-b; KHÔNG dùng nắm tay ở cảnh 2)
  //   P = điểm điều khiển [gốc … ngọn] (Catmull-Rom) · W = bề dày ở gốc (cỡ 1–2 toà nhà) · thân thuôn nhọn, uốn lượn trễ dần như roi (sóng chạy từ gốc ra ngọn),
  //   khối đen kịt + viền đỏ-tím mờ (ngược sáng trăng máu) + sợi lông sáng mảnh · o.a độ đục · o.rim màu viền · trả về mảng điểm giữa thân (để đặt bụi / va chạm)
  function shadowTail(g,t,P,W,seed,o={}){ if(!P||P.length<2) return null; const A=o.a==null?1:o.a; if(A<=0.01) return null;
    const D=[]; for(let i=0;i<P.length-1;i++){ const p0=P[Math.max(0,i-1)], p1=P[i], p2=P[i+1], p3=P[Math.min(P.length-1,i+2)], sg=Math.max(3,Math.ceil(Math.hypot(p2[0]-p1[0],p2[1]-p1[1])/6));
      for(let j=0;j<sg;j++){ const q=j/sg, q2=q*q, q3=q2*q; D.push([0.5*(2*p1[0]+(-p0[0]+p2[0])*q+(2*p0[0]-5*p1[0]+4*p2[0]-p3[0])*q2+(-p0[0]+3*p1[0]-3*p2[0]+p3[0])*q3),
        0.5*(2*p1[1]+(-p0[1]+p2[1])*q+(2*p0[1]-5*p1[1]+4*p2[1]-p3[1])*q2+(-p0[1]+3*p1[1]-3*p2[1]+p3[1])*q3)]); } }
    D.push(P[P.length-1]); const n=D.length; const S=[0]; for(let i=1;i<n;i++) S.push(S[i-1]+Math.hypot(D[i][0]-D[i-1][0],D[i][1]-D[i-1][1])); const L=S[n-1]||1;
    const C=[], N=[], R=[];
    for(let i=0;i<n;i++){ const p=D[Math.max(0,i-1)], q=D[Math.min(n-1,i+1)], dx=q[0]-p[0], dy=q[1]-p[1], l=Math.hypot(dx,dy)||1, nx=-dy/l, ny=dx/l, s=S[i]/L;
      const wv=W*0.18*s*Math.sin(t*(o.wf||3.2)-s*5.5+seed);   // sóng roi: gốc yên, ngọn quẫy
      C.push([D[i][0]+nx*wv, D[i][1]+ny*wv]); N.push([nx,ny]);
      R.push(W*0.5*Math.pow(1-s,0.75)*(1+0.18*Math.max(0,1-s*4))*(1+0.05*Math.sin(s*23+seed))+1.2); }   // thuôn nhọn, gốc phình
    const path=(k,d)=>{ g.beginPath(); for(let i=0;i<n;i++){ const r=R[i]*k+d; i?g.lineTo(C[i][0]+N[i][0]*r,C[i][1]+N[i][1]*r):g.moveTo(C[i][0]+N[i][0]*r,C[i][1]+N[i][1]*r); }
      for(let i=n-1;i>=0;i--){ const r=R[i]*k+d; g.lineTo(C[i][0]-N[i][0]*r,C[i][1]-N[i][1]*r); } g.closePath(); };
    g.save(); g.globalAlpha=A;
    g.globalCompositeOperation='lighter'; for(let i=0;i<n;i+=5) blob(g,C[i][0],C[i][1],R[i]*2.6+8,o.rim||'150,20,60',0.07*A);   // quầng đỏ-tím
    g.globalCompositeOperation='source-over'; g.globalAlpha=A;
    g.fillStyle=`rgba(${o.rim||'190,40,70'},0.55)`; path(1,W*0.035+1.5); g.fill();   // viền sáng ngược sáng
    g.fillStyle='#060307'; path(1,0); g.fill();
    g.lineCap='round'; for(const row of [-0.55,-0.2,0.15,0.5]) for(let b=0;b<Math.floor(L/(W*0.55));b++){ const hv=hash(b*5.1+row*17+seed*13); if(hv<0.62) continue;
      const s0=b*W*0.55+hv*W*0.3, s1=s0+W*(0.2+0.25*hv); let i0=0; while(i0<n-1&&S[i0]<s0) i0++; let i1=i0; while(i1<n-1&&S[i1]<s1) i1++; if(i1<=i0) continue;
      g.strokeStyle=`rgba(150,120,170,${0.1+0.18*hv})`; g.lineWidth=Math.max(0.6,W*0.02); g.beginPath();
      for(let i=i0;i<=i1;i++){ const ow=row*R[i]; i>i0?g.lineTo(C[i][0]+N[i][0]*ow,C[i][1]+N[i][1]*ow):g.moveTo(C[i][0]+N[i][0]*ow,C[i][1]+N[i][1]*ow); } g.stroke(); }   // sợi lông
    if(o.root){ for(let i=0;i<n;i+=2){ if(S[i]>o.root) break; const f=S[i]/o.root; blob(g,C[i][0],C[i][1],R[i]*2.2+W*0.6*(1-f),'8,2,12',0.9*Math.pow(1-f,1.4)); } }   // gốc chìm vào khói / sau lưng Friend
    g.restore(); return C; }
  // toà nhà đứng cạnh nhau làm "thước đo" + bị ĐUÔI CHÉM NGANG: phần trên trượt + xoay THEO hướng quét rồi rơi, mặt cắt lởm chởm, kính + mảnh văng theo hướng quét
  //   b = {x,w,h,seed} · base = chân · hitT = giây bị chém (null = còn nguyên) · cutY = độ cao mặt cắt (tính từ chân) · dir = +1 quét sang phải / −1 sang trái
  function cutTower(g,t,b,base,col,lit,hitT,cutY,dir){ const {x,w,h,seed}=b, top=base-h, cy=base-cutY;
    const win=(x0,y0,x1,y1)=>{ const nx=Math.floor((w-10)/13), ny=Math.floor((y1-y0-6)/17); for(let j=0;j<ny;j++) for(let i=0;i<nx;i++){ const v=H(seed+i*3.1,j*7.7);
      g.fillStyle=v<lit?'rgba(255,190,110,0.75)':'rgba(15,10,18,0.55)'; g.fillRect(x0+6+i*13,y0+4+j*17,7,10); } };
    const body=(y0,y1)=>{ g.fillStyle=col; g.fillRect(x,y0,w,y1-y0); g.fillStyle='rgba(255,255,255,0.05)'; g.fillRect(x,y0,w*0.1,y1-y0); g.fillStyle='rgba(0,0,0,0.25)'; g.fillRect(x+w*0.85,y0,w*0.15,y1-y0); win(x,y0,x+w,y1); };
    if(hitT==null||t<hitT){ body(top,base); if(H(seed,9)>0.5){ g.fillStyle=col; g.fillRect(x+w*0.4,top-16,3,16); } return; }
    const v=t-hitT, jag=k=>{ g.beginPath(); g.moveTo(x,cy); for(let i=1;i<=6;i++) g.lineTo(x+w*i/6, cy+(H(seed+i,k)-0.5)*16); };
    // phần dưới còn lại + mặt cắt lởm chởm cháy đỏ
    g.save(); jag(1); g.lineTo(x+w,base); g.lineTo(x,base); g.closePath(); g.clip(); body(cy-12,base); g.restore();
    g.save(); jag(1); g.strokeStyle=`rgba(255,120,40,${0.9*(1-seg(v,0.3,2))})`; g.lineWidth=3; g.stroke(); g.restore();
    // phần trên: trượt theo hướng quét (đà đuôi) + xoay + rơi
    const fx=dir*260*v, fy=-30*v+420*v*v, rot=dir*Math.min(1.6,1.2*v+0.6*v*v);
    if(fy<900){ g.save(); g.translate(x+w/2+fx, cy+fy); g.rotate(rot); g.translate(-(x+w/2), -cy); body(top,cy+8); g.restore(); }
    glass(g,x+w/2,cy,v,26,seed+3,dir>0?-0.25:Math.PI+0.25,1.2); chunks(g,x+w/2,cy,v,16,seed+5,340,'#4a3f44',dir>0?-0.3:Math.PI+0.3,1.1,1.6);
    smoke(g,x+w/2+dir*v*90,cy-10,40+v*110,0.55*(1-seg(v,0.6,2.2)),'60,44,46'); }
  function ring(g,x,y,t,R,col){ if(t<0||t>1) return; g.save(); g.globalAlpha=(1-t)*0.8; g.strokeStyle=col||'rgba(255,240,220,1)'; g.lineWidth=10*(1-t); g.beginPath(); g.ellipse(x,y,R*E.eout(t),R*E.eout(t)*0.28,0,0,TAU); g.stroke(); g.restore(); }

  // ───────── CẢNH ─────────
  // nền thành phố TRỜI SÁNG (cảnh 1): tháp xa mờ sương (par 0.12, mỗi tầng 11, THẤP + THƯA — phông vẽ đã có thành phố xa) → cao tầng trung cảnh có chi tiết
  //   (par 0.32, mỗi tầng 22, 15–34 tầng, THƯA: khe rộng để lộ trời + nhà xa trong phông FIN_BG_DAY — anh dặn 10/11: ~35–45% khung mở đầu là trời)
  function cityBack(g,cx,y0){ skyline(g,cx,0.12,y0-60,3,70,160,200,46,60,'#a3bcd8','rgba(255,255,255,0.55)',0.12,{far:1,fl:11,haze:0.5,hazeCol:'#d8e7f6',band:'rgba(70,95,130,0.22)',gap:150});
    skyline(g,cx,0.32,y0-30,7,46,340,420,78,70,'#8ea7c2','#fff4c2',0.16,{fl:22,det:1,haze:0.2,hazeCol:'#d0e1f3',gap:340}); }
  // phố bình yên: dân phố = meme NHỎ (≈ MEME_H) đi 2 chiều ở nhiều độ sâu trên vỉa hè (xa nhỏ hơn, vẽ trước) · xe + buýt chạy đúng làn
  const TL_N=22, TL_ORDER=Array.from({length:TL_N},(_,i)=>i).sort((a,b)=>H(8,a)-H(8,b));
  function townLife(g,t,y0,dark,panic){ const tw=K.twos(t);
    for(const i of TL_ORDER){ const dir=H(5,i)<0.5?1:-1, sp=16+14*H(6,i), x0=-400+170*i+80*H(7,i), dd=H(8,i);
      const x=panic?x0-sp*5*(tw-T.d2):x0+dir*sp*tw, yy=y0+8+30*dd;
      person(g,x,yy,(90+18*H(9,i))*(0.9+0.2*dd),i,tw*(panic?16:7)+i,{dir:panic?-1:dir,run:panic,scream:panic}); }
    if(panic) for(let j=0;j<18;j++){ const x0=480+62*j+30*H(j,71), x=x0-(95+45*H(j,72))*(tw-T.d2), yy=y0+8+30*H(j,73);   // đám đông chạy dồn (cảnh 2)
      person(g,x,yy,96+10*H(j,74),j+3,tw*16+j,{dir:-1,run:true,scream:true}); }
    for(const lane of [1,-1]) for(let i=0;i<8;i++){ const dir=i%2?1:-1; if(dir!==lane) continue; const v=panic?0:(110+30*H(i,61)), x=((i*530+dir*tw*v)%4200+4200)%4200-800, y=y0+(dir>0?LANE_A:LANE_B);
      if(i===4) bus(g,x,y,dir); else car(g,x,y,104,CARC[i%CARC.length],dir); } }
  function scStreet(g,t){ const k=seg(t,0,7), kz=E.eio(seg(t,2.2,7)), cx=lerp(300,980,E.eio(k)), y0=400, tw=K.twos(t);
    cam(g,cx,lerp(130,318,kz),lerp(0.52,1.0,kz)); sky(g,t,0,0,y0-385); cityBack(g,cx,y0);   // toàn cảnh rộng GIỮ ~2s, máy hơi NGƯỚC (trời ~40% khung, thấy làn xe gần, khung có viền điện ảnh) → đẩy dần vào mặt phố
    // hy = y0-385: chân dãy tháp trong phông vẽ nằm ngay trên mái dãy cửa hàng → khe giữa các nhà lộ thành phố xa của phông
    shops(g,y0,cx-1000,cx+1000); propsBack(g,y0,cx-1000,cx+1000); street(g,y0);
    // meme quen trên phố (cùng cỡ dân phố): Chill Guy thong thả · Doge ngồi ghế · Cheems trước tiệm · Capy chờ xe buýt
    pic(g,'chill',700+tw*24,y0+30,36); pic(g,'doge',985,y0+14,24); pic(g,'cheems',1262,y0+20,22); pic(g,'capy',640,y0+12,20,{flip:true});
    townLife(g,t,y0,0,false);
    stand(g,1500,y0+30); pic(g,'corn',1508,y0-22,20,{flip:true});
    propsFront(g,y0,cx-1000,cx+1000); }
  // trung cảnh: Banana Cat đi tới xe kem, Cornelius đưa kem — máy ZOOM (meme vẫn nhỏ, tủ kính / mái hiên phía sau to hơn nhiều)
  function scStand(g,t){ const u=t-T.stand, y0=400, cx=1482+u*3, z=3.7;
    cam(g,cx,y0-12,z); sky(g,t,0,0,y0-50); shops(g,y0,1200,1800); propsBack(g,y0,1200,1800); street(g,y0);
    person(g,1380+u*16,y0+12,96,5,K.twos(t)*7,{dir:1});
    stand(g,1500,y0+30); pic(g,'corn',1508,y0-22,20,{flip:true});   // người bán kem = Cornelius nằm trên nóc tủ kem
    const walk=1-seg(u,0,1.4), kx=1456-walk*60, hasIce=u>1.6, hh=kidH(70,false); kid(g,kx,y0+38,70,{ice:hasIce,walk:walk>0});
    if(u>1.2&&u<1.7){ const f=seg(u,1.2,1.7); g.save(); g.translate(lerp(1504,kx+hh*0.33,f),lerp(y0-14,y0+38-hh*0.3,f)); iceCone(g,hh/120); g.restore(); }
    person(g,1640-u*18,y0+22,92,1,K.twos(t)*7+2,{dir:-1});
    propsFront(g,y0,1200,1800); }
  // bóng đen trùm từ phải sang trái — trung cảnh rộng hơn: cả dãy nhà 2 tầng dưới + dân phố khựng lại
  function scShadow(g,t){ const u=t-T.shadow, y0=400, z=1.9, cx=1470;
    cam(g,cx,y0-58,z); const k=seg(t,T.shadow,T.shadow+1.6);
    sky(g,t,k*0.7,0,y0-50); cityBack(g,cx,y0); shops(g,y0,1100,1850); propsBack(g,y0,1100,1850); street(g,y0);
    for(let i=0;i<7;i++){ const x=1250+i*62, f=u<1+i*0.12; person(g,x+(f?u*14:14+i*2),y0+10+(i%3)*11,94,i+2,f?K.twos(t)*7:0,{dir:i%2?-1:1}); }
    stand(g,1500,y0+30); pic(g,'corn',1508,y0-22,20,{flip:true});
    kid(g,1456,y0+38,70,{ice:true,look:u>1.2});
    propsFront(g,y0,1100,1850);
    const ex=lerp(2300,700,k); const gr=g.createLinearGradient(ex-260,0,ex+40,0); gr.addColorStop(0,'rgba(10,4,16,0)'); gr.addColorStop(1,'rgba(10,4,16,0.78)');
    g.fillStyle=gr; g.fillRect(ex-260,-900,300,1800); g.fillStyle='rgba(10,4,16,0.78)'; g.fillRect(ex+40,-900,3000,1800); }
  // cận Banana Cat khóc (máy zoom sát, meme vẫn nhỏ so với tủ kính phía sau) → que kem rơi → đặc tả kem bẹp trên vỉa hè
  function scCry(g,t){ const u=t-T.cry, y0=400, KX=1456;
    if(t<T.splat){ const cr=u>0.4, hh=kidH(70,cr), z=8.2, cy=y0+38-hh*0.52+u*1.2;
      cam(g,KX+4,cy,z,(hash(Math.floor(t*30))-0.5)*0.01*(u>0.4?1:0)); sky(g,t,0.75,0); shops(g,y0,1250,1700); street(g,y0);
      g.fillStyle='rgba(10,4,16,0.7)'; g.fillRect(800,-600,1400,1400);
      kid(g,KX,y0+38,70,{look:!cr,cry:cr,ice:!cr});
      if(cr){ const h0=kidH(70,false), f=seg(u,0.45,1.6), x=KX+h0*0.33+f*4, y=lerp(y0+38-h0*0.3,y0+36,f*f); g.save(); g.translate(x,y); iceCone(g,h0/120,f*4); g.restore(); } }
    else { const v=t-T.splat, s=kidH(70,false)/120, X=KX+12, Y=y0+40; cam(g,X,Y-6,8.5); shops(g,y0,1300,1650); street(g,y0); g.fillStyle='rgba(10,4,16,0.65)'; g.fillRect(1200,200,600,400);
      g.fillStyle='#ffd1e1'; g.beginPath(); g.ellipse(X,Y,(14+8*E.eout(seg(v,0,0.2)))*s,5*s,0,0,TAU); g.fill(); g.fillStyle='#fff3c4'; g.beginPath(); g.ellipse(X-6*s,Y-1*s,8*s,3*s,0,0,TAU); g.fill();
      g.save(); g.translate(X+12*s,Y-4*s); iceCone(g,s,2.2); g.restore();
      for(let i=0;i<6;i++){ const a=-Math.PI*(0.15+0.7*H(9,i)), d=E.eout(seg(v,0,0.3))*18*s; g.fillStyle='#ffd1e1'; g.beginPath(); g.arc(X+Math.cos(a)*d,Y-2*s+Math.sin(a)*d*0.5,1.8*s,0,TAU); g.fill(); } } }
  // nhìn từ dưới phố NGƯỚC lên: các toà cao tầng chụm về đỉnh, Friend che kín trời
  // toà nhà nhìn NGƯỚC từ dưới phố: hình thang chụm về điểm tụ trên cao (lit = cửa sổ sáng, hue/l = tông)
  //   o: t · die 0..1 = đèn TẮT DẦN (chập chờn quanh ngưỡng) khi Friend hiện · shade 0..1 = BÓNG Friend đổ xuống nửa trên các toà · rattle px = kính rung lúc gầm
  function wormCity(g,lit,dark,o={}){ const vx=480, vy=-900, t=o.t||0, die=o.die||0, sh=o.shade||0, rt=o.rattle||0;
    for(let i=0;i<8;i++){ const side=i<4?-1:1, k=(i%4), bx=vx+side*(330+k*140), w=120+30*H(31,i), base=700, topK=0.42+0.08*k;
      const x0=bx-w/2, x1=bx+w/2, tx0=lerp(x0,vx,topK), tx1=lerp(x1,vx,topK), ty=lerp(base,vy,topK);
      const poly=()=>{ g.beginPath(); g.moveTo(x0,base); g.lineTo(tx0,ty); g.lineTo(tx1,ty); g.lineTo(x1,base); g.closePath(); };
      g.fillStyle=`hsl(220,12%,${(12+k*4)*(1-0.5*(dark||0))}%)`; poly(); g.fill();
      for(let r=0;r<10;r++){ const f=r/10, yy=lerp(base,ty,f), xa=lerp(x0,tx0,f), xb=lerp(x1,tx1,f);
        for(let q=0;q<3;q++){ if(H(i*13+r,q)>=0.4) continue; const d=H(i*7+r,q+11), fl=Math.abs(die-d)<0.07?(hash(Math.floor(t*22)+i*31+r*7+q)>0.45?1:0.15):(die<d?1:0);   // tắt dần, chập chờn ở ngưỡng
          if(fl<=0.01) continue; const jx=rt?(hash(Math.floor(t*40)+i+r*3+q)-0.5)*rt:0, jy=rt?(hash(Math.floor(t*40)+i*5+r+q*9)-0.5)*rt:0;
          g.fillStyle=`rgba(255,200,120,${0.35*(lit==null?1:lit)*fl})`; g.fillRect(lerp(xa,xb,0.15+q*0.27)+jx,yy-6+jy,(xb-xa)*0.14,5); } }
      if(sh>0){ const gr=g.createLinearGradient(0,ty,0,lerp(base,ty,0.25)); gr.addColorStop(0,`rgba(4,1,6,${0.85*sh})`); gr.addColorStop(1,'rgba(4,1,6,0)'); g.fillStyle=gr; poly(); g.fill(); }   // bóng Friend đổ lên mặt nhà
      g.strokeStyle='rgba(230,60,40,0.35)'; g.lineWidth=1.5; g.beginPath(); g.moveTo(side<0?x1:x0,base); g.lineTo(side<0?tx1:tx0,ty); g.stroke(); }   // mép nhà hứng ánh trời đỏ
    g.fillStyle='rgba(0,0,0,0.35)'; g.fillRect(-400,560,1800,400); }
  // tạo điểm điều khiển cho shadowTail: gốc (rx,ry), góc ang, dài len, cong curl (rad dồn về ngọn), quẫy theo thời gian
  function tailPts(rx,ry,ang,len,curl,t,seed,sway){ const P=[[rx,ry]], n=6; let x=rx, y=ry;
    for(let i=1;i<n;i++){ const s=i/(n-1), a=ang+curl*s*s+(sway==null?0.22:sway)*Math.sin(t*1.7-s*2.6+seed)*s; x+=Math.cos(a)*len/(n-1); y+=Math.sin(a)*len/(n-1); P.push([x,y]); } return P; }
  // MÂY bị Friend đẩy / xoáy quanh thân: vòng cụm mây đỏ sẫm quay chậm, lúc gầm bị thổi bạt ra ngoài (push 0..1) · front=true: nửa vòng phía trước
  function cloudSwirl(g,t,cx,cy,R,push,front){ for(let i=0;i<16;i++){ const a=i/16*TAU+t*0.12+H(i,51)*0.3, fr=Math.sin(a)>0; if(fr!==!!front) continue;
      const r=R*(1+0.5*push)*(0.85+0.3*H(i,52)), x=cx+Math.cos(a)*r*1.35, y=cy+Math.sin(a)*r*0.42-40;
      smoke(g,x,y,70+60*H(i,53),0.5*(front?0.8:1),fr?'30,6,10':'60,12,16'); } }
  // CHIM bay toán loạn ra xa Friend (t0 = lúc gầm) + GIẤY / lá vụn bay lượn ở tiền cảnh
  function birds(g,t,t0,cx,cy){ const v=t-t0; if(v<0||v>3) return; g.save(); g.strokeStyle='#080306'; g.lineCap='round';
    for(let i=0;i<14;i++){ const a=-Math.PI*(0.1+0.8*H(i,41)), sp=220+260*H(i,42), x=cx+Math.cos(a)*sp*v+(H(i,43)-0.5)*200, y=cy+Math.sin(a)*sp*v*0.7+(H(i,44)-0.5)*80, s=4+5*H(i,45), fl=Math.sin(t*22+i)*s*0.6;
      g.lineWidth=1.6; g.beginPath(); g.moveTo(x-s,y-fl); g.lineTo(x,y); g.lineTo(x+s,y-fl); g.stroke(); } g.restore(); }
  function papers(g,t,n,seed,y0){ g.save(); for(let i=0;i<n;i++){ const ph=(t*0.35*(0.6+H(seed+i,1))+H(seed+i,2))%1, x=-80+1120*((H(seed+i,3)+ph*0.6)%1), y=(y0||560)-ph*620+Math.sin(t*3+i)*20;
      g.save(); g.translate(x,y); g.rotate(t*(2+3*H(seed+i,4))+i); g.scale(1,Math.sin(t*6+i)); g.fillStyle=i%3?'rgba(230,220,200,0.8)':'rgba(120,40,30,0.8)'; g.fillRect(-5,-3.5,10,7); g.restore(); } g.restore(); }
  // trăng máu (Friend kéo theo trăng máu — anh chốt 9/11): đĩa đỏ + quầng, đặt SAU Friend / tháp để ra hình bóng ngược sáng (kaiju-b #2, #9)
  function bloodMoon(g,x,y,r,a){ if(a<=0) return; g.save(); g.globalAlpha=a; g.globalCompositeOperation='lighter'; blob(g,x,y,r*2.4,'170,20,16',0.6); g.restore();
    g.save(); g.globalAlpha=a; const mg=g.createRadialGradient(x-r*0.2,y-r*0.25,r*0.1,x,y,r); mg.addColorStop(0,'#d8452c'); mg.addColorStop(0.6,'#9a1a1c'); mg.addColorStop(1,'#4a0608');
    g.fillStyle=mg; g.beginPath(); g.arc(x,y,r,0,TAU); g.fill(); g.fillStyle='rgba(50,0,4,0.35)'; for(let i=0;i<7;i++){ g.beginPath(); g.arc(x+(H(i,91)-0.5)*r*1.3,y+(H(i,92)-0.5)*r*1.3,r*(0.06+0.12*H(i,93)),0,TAU); g.fill(); } g.restore(); }
  // ① BỘ BA lộ diện (kaiju-a #1): CỰC CẬN lướt dọc thân Friend từ dưới lên trong khói, quái tràn khung, KHÔNG thấy hết → mắt BẬT SÁNG (kaiju-b #1)
  const FRX=372;   // Friend 678×718 vẽ cao 806 → mắt vàng ở FRX+49, mắt hồng FRX+167, y≈153
  function scRevealClose(g,t){ const u=t-T.reveal, k=E.eio(seg(u,0,1.75)), z=lerp(2.6,2.9,k);
    cam(g,lerp(FRX+40,FRX+108,k),lerp(300,168,k),z,lerp(0.05,0.0,k)); sky(g,t,0.1,1);
    bloodMoon(g,560,120,230,1);
    cloudSwirl(g,t,FRX+108,250,330,0,false);
    const ey=seg(t,T.reveal+1.05,T.reveal+1.3); friendSky(g,FRX,330,760,1,ey*(1.15+0.3*Math.sin(t*9)));
    g.save(); g.globalCompositeOperation='lighter'; blob(g,480,330,520,'255,60,30',0.12);
      if(ey>0){ blob(g,FRX+49,153,150,'255,220,80',0.22*ey); blob(g,FRX+167,153,150,'255,110,200',0.22*ey); } g.restore();   // mắt bật sáng hắt màu lên khói quanh
    for(let i=0;i<7;i++){ const x=((i*190-u*260*(1+H(i,61)))%1300+1300)%1300-170, y=200+340*H(i,62); smoke(g,x,y,90+60*H(i,63),0.55); }   // khói TIỀN CẢNH lướt ngang ăn vào thân
    papers(g,t,8,70,420); }
  // ② góc giun ĐỨNG YÊN ~2s đọc tỉ lệ (kaiju-a #2): 2 dãy nhà kẹp 2 mép (nhà chỉ tới cằm Friend), trời đỏ → Friend khối đen NGƯỢC SÁNG, đủ 2 mắt lọt khe.
  //    Môi trường phản ứng: đèn nhà chập chờn TẮT DẦN, BÓNG Friend đổ xuống nửa trên các toà, kính rung lúc gầm, mây bị thổi bạt / xoáy quanh thân,
  //    chim bay toán loạn, giấy vụn bay, bụi bốc ở chân nhà; ĐUÔI xoè dần sau lưng (kiểu Cửu Vĩ) từ lúc gầm.
  function scReveal(g,t){ const u=t-T.roar, z=t<T.title?1.02:lerp(1.0,1.07,seg(t,T.title,T.d1)), rr=(t>T.roar&&t<T.roar+1.4)?(hash(Math.floor(t*40))-0.5)*0.02:0;
    cam(g,480,300,z,rr); sky(g,t,0.08,1);
    const CX=FRX+108, push=E.eout(seg(u,0,0.7));
    bloodMoon(g,CX,120,340,1);
    cloudSwirl(g,t,CX,260,360,push,false);
    const tk=E.eout(seg(u,0.25,1.4));   // đuôi vươn lên sau lưng, xoè quạt
    if(tk>0) for(let i=0;i<6;i++){ const sd=i<3?-1:1, j=i%3, ang=-Math.PI/2+sd*(0.35+0.32*j), len=(560+90*j)*tk;
      shadowTail(g,t,tailPts(CX+sd*(60+30*j),330,ang,len,sd*(0.5+0.25*j),t,i*1.7,0.16),70-8*j,i*2.3,{root:120,wf:1.6}); }
    friendSky(g,FRX,330,760,1,1+0.4*Math.sin(t*7));   // mắt Friend ở ~y153: 2 mắt nằm giữa khe 2 dãy nhà
    cloudSwirl(g,t,CX,260,360,push,true);
    birds(g,t,T.roar+0.05,CX,300);
    roarRings(g,t,CX,250);
    wormCity(g,1,0.2,{t,die:seg(t,T.roar-0.1,T.roar+1.6),shade:0.75,rattle:(t>T.roar&&t<T.roar+1.2)?3*(1-seg(t,T.roar,T.roar+1.2)):0});
    for(let i=0;i<9;i++){ const ph=((t*0.25+H(i,95))%1); smoke(g,-80+i*140+Math.sin(t+i)*20,640-ph*120,110+60*H(i,96),0.45*(1-ph)*(0.4+push*0.6),'70,28,26'); }   // bụi bốc ở chân nhà
    papers(g,t,10,30,600);
    if(t>T.roar){ const k=seg(t,T.roar,T.roar+0.6); g.save(); g.globalCompositeOperation='lighter'; blob(g,480,200,700*k,'120,20,60',0.25*(1-seg(t,T.roar+0.6,T.roar+2))); g.restore(); } }
  // ③ cận mặt NGƯỜI phản ứng (kaiju-a #3): Banana Cat ngước khóc, ánh đỏ từ trên đổ xuống, rung nhẹ — 0.4s (zoom sát, meme vẫn đúng cỡ so với tủ kính)
  function scReact(g,t){ const u=t-T.react, y0=400, hh=kidH(70,true); cam(g,1458,y0+38-hh*0.58-u*1.5,8.4,(hash(Math.floor(t*30))-0.5)*0.012);
    sky(g,t,0.6,0.9); shops(g,y0,1250,1700); street(g,y0); g.fillStyle='rgba(40,4,8,0.55)'; g.fillRect(800,-600,1400,1400);
    kid(g,1456,y0+38,70,{cry:true,look:true});
    g.save(); g.globalCompositeOperation='lighter'; blob(g,1456,y0-40,90,'255,50,40',0.35); g.restore(); g.globalAlpha=1; }
  // 🔊 (11/11 anh dặn) SÓNG ÂM tiếng gầm quét xuống phố → VỠ HẾT KÍNH: mặt dãy cửa hàng, sóng tròn lan từ phía Friend (trên-trái ngoài khung);
  //    vòng sóng qua tới ô nào thì ô đó vỡ (vẽ lại bản kính vỡ trong vòng tròn) + mảnh kính bắn ra theo hướng sóng rồi rơi; dân meme khựng lại, rung theo sóng.
  const GL_SX=-420, GL_SY=-520, GL_V=1500, GL_R0=300;   // tâm sóng (đơn vị thế giới so với tâm khung) + tốc độ lan / giây
  function scGlass(g,t){ const u=t-T.glass, y0=400, cx=2050, z=lerp(1.62,1.76,E.eout(seg(u,0,1.5))), cy=y0-52, Sx=cx+GL_SX, Sy=cy+GL_SY;
    const R=Math.max(0,(u-0.12))*GL_V+GL_R0;   // bán kính mặt sóng (0.12s đầu: sóng chưa tới khung)
    cam(g,cx,cy,z,0); sky(g,t,0.6,0.9); const out=[]; shops(g,y0,cx-400,cx+400,{out}); propsBack(g,y0,cx-400,cx+400); street(g,y0);
    g.save(); g.beginPath(); g.arc(Sx,Sy,R,0,TAU); g.clip(); shops(g,y0,cx-400,cx+400,{broke:1}); g.restore();   // trong vòng sóng = kính đã vỡ
    // dân meme trên vỉa hè: khựng, rung mạnh khi sóng qua người
    for(let i=0;i<4;i++){ const x=cx-190+i*125, hit=Math.hypot(x-Sx,y0+20-Sy)<R, j=hit?(hash(Math.floor(t*40)+i*7)-0.5)*5:0; person(g,x+j,y0+14+(i%2)*10,92,i+3,0,{dir:i%2?-1:1,scream:hit}); }
    propsFront(g,y0,cx-400,cx+400);
    g.save(); g.globalCompositeOperation='multiply'; g.fillStyle='rgb(196,112,108)'; g.fillRect(cx-900,-600,1800,1600); g.restore();   // ánh trời đỏ phủ cả phố (Friend đã che trời)
    g.fillStyle='rgba(30,3,8,0.22)'; g.fillRect(cx-900,-600,1800,1600);
    // mảnh kính: mỗi ô vỡ đúng lúc vòng sóng chạm tâm ô, bắn THEO hướng sóng (ra xa tâm) + rơi
    for(const p of out){ const px=p.x+p.w/2, py=p.y+p.h/2, d=Math.hypot(px-Sx,py-Sy), hu=0.12+(d-GL_R0)/GL_V; if(u<hu) continue;
      const a=Math.atan2(py-Sy,px-Sx); glass(g,px,py,(u-hu)*0.9,p.big?18:7,p.k*13+5,a,1.3);
      if(u-hu<0.08){ g.save(); g.globalCompositeOperation='lighter'; blob(g,px,py,p.big?40:18,'230,245,255',0.5*(1-(u-hu)/0.08)); g.restore(); } }   // loé trắng lúc ô kính nổ
    // mặt sóng: 3 vòng sáng mờ + dải không khí nén ngay sau vòng ngoài
    g.save(); g.globalCompositeOperation='lighter';
    for(let k=0;k<3;k++){ const r=R-k*70; if(r<=0) continue; g.strokeStyle=`rgba(255,${200-k*50},${210-k*40},${0.42-k*0.12})`; g.lineWidth=(14-k*4); g.beginPath(); g.arc(Sx,Sy,r,0,TAU); g.stroke(); }
    const gr=g.createRadialGradient(Sx,Sy,Math.max(1,R-140),Sx,Sy,R); gr.addColorStop(0,'rgba(255,120,140,0)'); gr.addColorStop(1,'rgba(255,170,190,0.16)'); g.fillStyle=gr; g.beginPath(); g.arc(Sx,Sy,R,0,TAU); g.fill();
    g.restore(); g.globalAlpha=1; }
  // vòng SÓNG ÂM toả từ miệng Friend lúc gầm (góc giun) — vẽ SAU trời, TRƯỚC dãy nhà (sóng lan trong không khí, nhà che bớt)
  function roarRings(g,t,x,y){ const u=t-T.roar; if(u<0||u>2.4) return; g.save(); g.globalCompositeOperation='lighter';
    for(let k=0;k<6;k++){ const v=u-k*0.28; if(v<0||v>1.4) continue; const r=40+v*820, a=0.7*(1-v/1.4);
      g.strokeStyle=`rgba(255,150,170,${a})`; g.lineWidth=10*(1-v/1.4)+2; g.beginPath(); g.ellipse(x,y,r,r*0.62,0,0,TAU); g.stroke();
      g.strokeStyle=`rgba(255,240,245,${a*0.6})`; g.lineWidth=2; g.beginPath(); g.ellipse(x,y,r*0.97,r*0.6,0,0,TAU); g.stroke(); }
    g.restore(); }
  // ⓪ BÁO TRƯỚC (cảnh 1): ngước lên giữa 2 dãy nhà — trời xanh tối dần, MÉP bóng khổng lồ trườn vào từ trên (chưa lộ mặt)
  function scGlimpse(g,t){ const u=t-T.glimpse, k=seg(u,0,1.1); cam(g,480,300,1.12+u*0.03,0);
    sky(g,t,0.25+0.45*k,0);
    pic(g,'fr',480,lerp(-390,-215,E.eout(k)),900,{ax:0.5,ay:0.5,pixel:true,dark:1});   // bóng đen thuần, chỉ thấy mép — nằm SAU dãy nhà
    wormCity(g,0.6,0.1); }
  // tàn phá: CÙNG thành phố bị cháy, trời đỏ — tháp xa thành dải tối, cao tầng gần mái gãy lởm chởm, cửa sổ ánh lửa (độ cao giữ như cũ cho các shot đuôi / tay)
  function cityRuin(g,cx,y0,red,lit){ sky(g,0,0.15,red,y0-30);
    skyline(g,cx,0.25,y0-20,3,60,140,240,40,60,'#3a2830','rgba(255,150,80,0.5)',lit*0.6,{far:1,fl:9,band:'rgba(8,3,5,0.4)'});
    skyline(g,cx,0.6,y0-8,7,50,200,300,60,80,'#2a1e24','rgba(255,170,90,0.7)',lit,{fl:15,det:1,ruin:1,glass:'rgba(12,6,8,0.6)'}); }
  // giây đuôi đi qua toạ độ x (xFn đơn điệu theo u trong [a,b]) — để toà nhà vỡ ĐÚNG khung đuôi chạm
  function passU(xFn,a,b,x){ let lo=a, hi=b; const up=xFn(b)>xFn(a); for(let i=0;i<30;i++){ const m=(lo+hi)/2; if((xFn(m)<x)===up) lo=m; else hi=m; } return (lo+hi)/2; }
  // d1 · ĐUÔI QUÉT NGANG dãy cao tầng ở xa (kaiju-b #8): Friend khổng lồ sau lưng (nhà chỉ tới cằm), đuôi cuộn lên lấy đà 0.45s → quét trái→phải
  //      chém đứt ngọn từng toà ĐÚNG khung chạm, ngọn trượt + đổ theo hướng quét, kính / mảnh văng theo đuôi, bụi cuộn sau đuôi, lửa manga 2 chỗ
  const D1_TW=[[-80,120,300],[50,130,330],[190,110,270],[310,140,340],[460,120,290],[590,135,320],[730,115,300],[860,140,335],[1000,120,280]];
  const D1_X=u=>u<0.45?-260:lerp(-260,1250,E.eio(seg(u,0.45,1.15)));
  function scD1(g,t){ const u=t-T.d1, y0=470; cam(g,480,240,1.0+u*0.03); cityRuin(g,480,y0,0.8,0.35);
    friendSky(g,480,330,900,1,0.8+0.5*seg(u,0.3,0.45)); hazeBelow(g,260);
    const yc=250, xc=D1_X(u);
    for(let i=0;i<D1_TW.length;i++){ const [x,w,h]=D1_TW[i], b={x,w,h,seed:400+i*7}, hu=passU(D1_X,0.45,1.15,x+w/2);
      cutTower(g,t,b,y0,i%2?'#4a3940':'#56434a',0.55,T.d1+hu,y0-yc-8+16*H(i,7),1);   // sáng hơn skyline xa → ngọn bị chém đọc rõ
      if((i===2||i===6)&&FXr()) FXr().blast({g,t},{x:x+w/2,y:yc,t0:T.d1+hu,size:70,life:1.2,seed:i*5}); }
    // đuôi: lấy đà cuộn cao sau lưng Friend → quét sát mặt cắt → vút lên bên phải
    const lift=u>1.15?(u-1.15)*620:0, R=[-320,300];   // gốc ngoài mép trái (từ sau lưng Friend vòng ra) → thân đuôi nằm NGANG trên mặt cắt
    let P; if(u<0.45){ const k=E.eout(seg(u,0,0.45)); P=tailPts(R[0],R[1],-0.95-0.25*k,lerp(260,560,k),-0.7*k,t,1.3,0.1); }   // giơ cao bên trái lấy đà
    else P=[R,[xc-480,yc-40-lift],[xc-200,yc+4-lift],[xc+60,yc-4-lift],[xc+230,yc-80-lift]];
    for(let i=0;i<10;i++){ const sx=xc-60-i*90; if(sx<-200||u<0.45) continue; smoke(g,sx,yc+10-i*6,60+i*14,0.5*(1-i/10),'55,40,42'); }   // bụi cuộn THEO đuôi
    shadowTail(g,t,P,125,1.3,{wf:2.4});
    g.fillStyle='#0d0709'; g.fillRect(-200,y0,1400,200); }
  // DÂN CHẠY Ở TIỀN CẢNH 0.5s (kaiju-b #3): meme to sát máy chạy vụt qua, tay bóng tối đập xuống phía sau → tỉ lệ + nỗi sợ
  function scCrowdFg(g,t){ const u=t-T.d2a, y0=470; cam(g,480,250,1.08,0.03); cityRuin(g,480,y0,0.85,0.3);
    const k=E.ein(seg(u,0,0.22)); shadowArm(g,t,620,-280,560,330,k,40,3.3,'hFist',{root:180});
    if(FXr()) FXr().blast({g,t},{x:560,y:320,t0:T.d2a+0.22,size:80,life:1.0,seed:5});
    g.fillStyle='#0d0709'; g.fillRect(-200,y0,1400,200);
    for(let i=0;i<3;i++){ const x=lerp(1080+i*170,-260+i*170,u/0.5), y=498+i*7; person(g,x,y,300-i*40,i+6,K.twos(t)*18+i,{dir:-1,run:true,scream:true}); } }   // meme SÁT MÁY (gần nên to hơn nhà ở xa)
  // phố hoảng loạn: cùng dãy phố cảnh 1 nhưng kính vỡ, lửa trong nhà, trời đỏ; dân phố (nhỏ) chạy cùng 1 hướng, xe bỏ lại giữa đường
  function scD2(g,t){ const u=t-T.d2, y0=400, cx=900-u*80; cam(g,cx,y0-70,1.95,-0.03); cityRuin(g,cx,y0,0.6,0.25);
    shops(g,y0,cx-520,cx+520,{burn:1}); propsBack(g,y0,cx-520,cx+520); street(g,y0);
    townLife(g,t,y0,0.4,true);
    pic(g,'dogeS',900-u*130,y0+34,34,{flip:true});   // Doge hoảng sợ chạy giữa đám đông
    propsFront(g,y0,cx-520,cx+520);
    g.save(); g.globalCompositeOperation='multiply'; g.fillStyle='rgb(150,72,62)'; g.fillRect(-200,-600,2400,1400); g.restore();   // ánh lửa đỏ + khói: cùng phố nhưng đang cháy
    for(let i=0;i<5;i++){ smoke(g,520+i*170,y0-210-40*H(i,75),150,0.55,'34,24,26'); fire(g,540+i*170,y0-GF-FL*(1+H(i,76)),26,t,i*7); } g.globalAlpha=1;
    g.save(); g.globalCompositeOperation='lighter'; blob(g,cx,y0+60,500,'255,90,30',0.18); g.restore(); g.globalAlpha=1; }
  // d3 · mặt toà nhà SÁT MÁY: kính rung lấy đà → ĐUÔI chém chéo qua mặt nhà (trái→phải): ô kính trên đường chém vỡ ĐÚNG lúc đuôi qua, kính + mảnh văng
  //      THEO đuôi (về phía máy), rãnh chém đen mép cháy → cuối shot đuôi quật ngược SÁT MÁY che kín khung = chuyển sang d4 (kaiju-b #12 hàm răng lướt che khung)
  const D3_X=u=>lerp(-500,1500,E.eio(seg(u,0.3,0.85)));
  function scD3(g,t){ const u=t-T.d3; cam(g,480,270,1.1+u*0.08);
    const ln=x=>140+x*0.28, rt=u<0.3?2.5*seg(u,0,0.3):0, xc=D3_X(u);
    g.fillStyle='#4a5260'; g.fillRect(-200,-200,1400,1000);   // mặt toà nhà sát máy
    for(let j=0;j<9;j++) for(let i=0;i<12;i++){ const x=40+i*80, y=20+j*62, cx=x+29, cy=y+22, hit=Math.abs(cy-ln(cx))<95&&u>passU(D3_X,0.3,0.85,cx);
      const jx=rt?(hash(Math.floor(t*40)+i*3+j)-0.5)*rt:0;
      if(hit){ g.fillStyle='#120a10'; g.fillRect(x,y,58,44); g.strokeStyle='rgba(255,120,50,0.6)'; g.lineWidth=2; g.strokeRect(x,y,58,44); }
      else { g.fillStyle='#9fc3e6'; g.fillRect(x+jx,y,58,44); g.fillStyle='rgba(255,255,255,0.15)'; g.fillRect(x+jx,y,58,6); } }
    if(u>0.3){ const x1=Math.min(xc-80,1300); if(x1>-200){ g.fillStyle='#0a0508'; g.beginPath(); g.moveTo(-200,ln(-200)-60);
      for(let x=-200;x<=x1;x+=40) g.lineTo(x,ln(x)-60+(H(x,3)-0.5)*24); for(let x=Math.floor(x1/40)*40;x>=-200;x-=40) g.lineTo(x,ln(x)+60+(H(x,4)-0.5)*24); g.closePath(); g.fill();
      g.strokeStyle='rgba(255,110,40,0.55)'; g.lineWidth=3; g.stroke(); } }   // rãnh chém, mép cháy
    for(let k=0;k<12;k++){ const cx=-60+k*95, hu=passU(D3_X,0.3,0.85,cx); if(u>hu){ glass(g,cx,ln(cx),u-hu,10,30+k,-0.2,1.6); chunks(g,cx,ln(cx),u-hu,6,50+k,300,'#5d6470',-0.25,1.2,1.5); } }
    if(u>0.28&&u<1.0) shadowTail(g,t,[[-700,-400],[xc-520,ln(xc-520)-40],[xc-180,ln(xc-180)],[xc+120,ln(xc+120)],[xc+330,ln(xc+330)-80]],300,4.2,{wf:3});
    if(u>1.38){ const k=E.ein(seg(u,1.38,1.7)), x=lerp(1900,250,k);   // đuôi quật ngược SÁT MÁY → che kín khung đúng lúc cắt sang d4
      shadowTail(g,t,[[x+1500,-600],[x+700,100],[x,280],[x-700,420],[x-1300,350]],1100,6.6,{wf:2}); } }
  // d4 · ĐUÔI QUẬT DỌC đập xuống phố (thay nắm tay): giơ cao GIỮ rồi BẬT (holdSnap) → bổ xuống ĐÚNG 0.42 → sóng xung kích, ô tô hất tung, bụi toả sát mặt đất
  //      2 phía, mảnh vỡ bật lên, lửa manga; đuôi nằm vắt trên phố 0.9s rồi rút lên · meme NHỎ (MEME_H) chạy tán loạn
  function scD4(g,t){ const u=t-T.d4, y0=400, HIT=0.42, v=u-HIT, gy=y0+118; cam(g,960,320,1.15,0.04); cityRuin(g,960,y0,0.7,0.3); shops(g,y0,300,1800); street(g,y0);
    g.fillStyle='rgba(30,8,10,0.4)'; g.fillRect(-200,-600,2400,1400);
    for(let i=0;i<8;i++){ const run=v>-0.1; person(g,820+i*52+(run?(i<4?-1:1)*Math.max(0,v)*160:0),y0+52+(i%3)*24,92,i+3,K.twos(t)*(run?16:6),{dir:i<4?-1:1,run,scream:run}); }
    if(v<=0){ car(g,760,y0+120,110,CARC[0],1); car(g,1180,y0+150,110,CARC[1],-1); }
    else { ring(g,960,gy,seg(v,0,0.7),560); chunks(g,960,gy-8,v,30,11,380,'#555',-Math.PI/2,2.2,1.4);
      car(g,760-v*300,y0+120-Math.sin(Math.min(1,v*1.6)*Math.PI)*160,110,CARC[0],1,-v*4); car(g,1180+v*320,y0+150-Math.sin(Math.min(1,v*1.4)*Math.PI)*190,110,CARC[1],-1,v*5);
      for(let i=0;i<8;i++){ const sd=i%2?1:-1, d=(60+v*480)*(0.5+0.5*H(i,71)); smoke(g,960+sd*d,gy-12-6*H(i,72),50+v*90,0.55*(1-seg(v,0.8,1.8)),'70,58,56'); } }   // bụi toả sát đất 2 phía
    const ez=E.holdSnap||E.ein, k=u<HIT?ez(seg(u,0,HIT)):1, lift=v>0.9?(v-0.9)*700:0, cy=lerp(-460,gy,k)-lift;
    shadowTail(g,t,[[1560,-760],[1360,-330-lift*0.4],[1100,cy-190],[960,cy-6],[690,cy+(v>0?2:-60)],[540,cy-30]],170,6.1,{wf:2.2});
    if(FXr()) FXr().blast({g,t},{x:960,y:gy-20,t0:T.d4+HIT,size:150,life:1.5,seed:9}); }
  // d5 · nhìn chéo từ trên cao: 2 ĐUÔI quét VÒNG CUNG lệch nhịp (trái rồi phải) — khối nhà nằm trong vệt quét bị SAN PHẲNG đúng lúc đuôi qua,
  //      mảnh văng theo hướng quét, lửa + khói bốc từ đống đổ (kaiju-b #8 nhìn từ trên)
  const D5_T=[{px:-140,py:-220,a0:0.1,a1:1.3,d:0.0,dur:0.5,sd:2.1},{px:1100,py:-220,a0:Math.PI-0.1,a1:Math.PI-1.3,d:0.32,dur:0.5,sd:4.4}];   // gốc sát mép trên → thấy rõ THÂN đuôi, không chỉ chóp
  const d5Ang=(s,uu)=>s.a0+(s.a1-s.a0)*E.eio(seg(uu,s.d,s.d+s.dur));
  // 10/11: góc chim = PHÔNG VẼ thành phố cháy nhìn từ trên (FIN_BG_TOP, GPT) thay khối hộp; vẫn giữ tương tác: chỗ đuôi quét qua bung mảnh / khói / lửa đúng lúc
  function scD5(g,t){ const u=t-T.d5; cam(g,480,260,1.05,0.0); sky(g,t,0.2,0.85);
    { const c=K.prep(IM.bgTop); if(c){ const z=1.08+0.05*seg(u,0,2), W=1040*z, Hh=W*c.sh/c.sw; g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,480-W/2+u*6,260-Hh/2,W,Hh); } }
    const PAINT=!!K.prep(IM.bgTop);
    for(let j=0;j<6;j++) for(let i=0;i<9;i++){ const x=-60+i*130+(j%2)*60, y=120+j*80, h0=40+70*H(i,j), w=90, cx=x+w/2, cy=y-h0*0.5;
      let hu=null, sw=null; for(const s of D5_T){ const a=Math.atan2(cy-s.py,cx-s.px), dd=Math.hypot(cx-s.px,cy-s.py); if(dd<260||dd>1000) continue;
        if(s.a1>s.a0?(a>s.a0&&a<s.a1):(a<s.a0&&a>s.a1)){ const q=passU(uu=>d5Ang(s,uu),s.d,s.d+s.dur,a); if(hu==null||q<hu){ hu=q; sw=a+(s.a1>s.a0?Math.PI/2:-Math.PI/2); } } }
      const v=hu==null?-1:u-hu, h=v>0?h0*lerp(1,0.18,E.eout(seg(v,0,0.18))):h0;   // san phẳng đúng lúc đuôi qua
      if(!PAINT){ g.fillStyle=`hsl(15,10%,${14+8*H(j,i)}%)`; g.fillRect(x,y-h,w,h); g.fillStyle=`hsl(15,10%,${24+8*H(j,i)}%)`; g.beginPath(); g.moveTo(x,y-h); g.lineTo(x+18,y-h-12); g.lineTo(x+w+18,y-h-12); g.lineTo(x+w,y-h); g.closePath(); g.fill(); }   // ảnh chưa tải → khối hộp dự phòng
      if(v>0){ chunks(g,cx,y-h,v,10,i*7+j,260,'#5a4a46',sw,1.4,1.2); smoke(g,cx,y-h-10,30+v*80,0.55*(1-seg(v,0.6,1.4)),'50,36,36'); fire(g,cx,y-h-6,36,t,i*9+j); }
      else if(!PAINT && H(i+20,j)<0.15) fire(g,cx,y-h-6,26,t,i*9+j); }
    for(const s of D5_T){ if(u<s.d-0.2) continue; const a=u<s.d?s.a0-(s.a1-s.a0)*0.12*E.eout(seg(u,s.d-0.2,s.d)):d5Ang(s,u), lift=u>s.d+s.dur?(u-s.d-s.dur)*400:0;   // lấy đà ngược 0.2s → quét
      shadowTail(g,t,tailPts(s.px,s.py-lift,a,1050,(s.a1>s.a0?-1:1)*0.3,t,s.sd,0.06),165,s.sd,{wf:2.6}); }
    g.save(); g.globalCompositeOperation='lighter'; blob(g,480,520,600,'255,90,30',0.3); g.restore(); }
  // NỔ: góc CHIM (d5) → góc GIUN nhìn lên cột khói (fight-1 A24–A25): nhà chụm lên trời, khối nổ manga bốc lên, mảnh to rơi về máy
  function scD5b(g,t){ const u=t-T.d5b; cam(g,480,300,1.0+u*0.04,(hash(Math.floor(t*30))-0.5)*0.008); sky(g,t,0.2,0.9);
    if(FXr()) FXr().blast({g,t},{x:480,y:250,t0:T.d5b-0.1,size:200,life:1.4,rise:0.7,seed:21});
    if(u>0.25) shadowTail(g,t,tailPts(-520,lerp(-60,200,E.eio(seg(u,0.25,0.95))),lerp(-0.55,0.15,E.eio(seg(u,0.25,0.95))),1650,0.35,t,3.3,0.08),170,3.3,{wf:2});   // đuôi khổng lồ quét NGANG qua khe trời trên cột khói
    wormCity(g,0.4,0.35,{t,die:0.7,shade:0.5});
    for(let i=0;i<8;i++){ const f=seg(u,0.1*i,0.1*i+0.7), s=10+70*f*f; if(f<=0||f>=1) continue; const x=480+(H(i,81)-0.5)*700*(0.3+f), y=lerp(160,620,f*f);
      g.save(); g.translate(x,y); g.rotate(f*4*(H(i,82)-0.5)); g.fillStyle=i%2?'#3b3236':'#5a5054'; g.fillRect(-s/2,-s/2,s,s*0.7); g.restore(); } }   // mảnh vỡ to dần = rơi THẲNG VỀ MÁY
  // TĨNH TRƯỚC PHÁ (kaiju-b #9–10): 0.4s tháp canh còn nguyên đứng trước trăng máu, CÙNG MÁY → ĐUÔI quét phải→trái chém ngang thân tháp ĐÚNG 0.62 (âm bản)
  //      → ngọn tháp trượt + đổ nghiêng THEO hướng quét (sang trái), kính + mảnh văng theo đuôi, bụi cuộn sau đuôi → tháp đổ sập kéo bụi
  const D6_X=u=>u<0.42?1300:u<0.62?lerp(1300,520,seg(u,0.42,0.62)):lerp(520,-420,E.eout(seg(u,0.62,0.98)));
  function scD6(g,t){ const u=t-T.d6, y0=470, HIT=0.62; cam(g,480,250,1.05+(u>HIT?0.02*Math.min(1,u-HIT):0)); cityRuin(g,480,y0,0.75,0.3);
    bloodMoon(g,560,150,150,1);
    const k=E.ein(seg(u,HIT,HIT+1.3)), bx=520, bw=130, bh=420, crack=y0-170, xc=D6_X(u);
    g.fillStyle='#2c2226'; g.fillRect(bx-bw/2,crack,bw,y0-crack);
    g.save(); g.translate(bx-bw/2-k*120,crack+k*k*60); g.rotate(-k*0.9); g.fillStyle='#352a2e'; g.fillRect(0,-(bh-170),bw,bh-170);   // ngọn tháp trượt + đổ sang TRÁI (hướng quét)
    for(let j=0;j<10;j++) for(let i=0;i<4;i++) if(H(i,j)<0.5){ g.fillStyle='rgba(255,170,90,0.6)'; g.fillRect(10+i*30,-(bh-170)+12+j*24,16,12); } g.restore();
    if(u>HIT){ const v=u-HIT; g.strokeStyle=`rgba(255,120,40,${0.9*(1-seg(v,0.4,1.6))})`; g.lineWidth=3; g.beginPath(); g.moveTo(bx-bw/2,crack); for(let i=1;i<=5;i++) g.lineTo(bx-bw/2+bw*i/5,crack+(H(i,61)-0.5)*14); g.stroke(); }   // mặt cắt cháy đỏ
    const lift=u>0.98?(u-0.98)*700:0;
    if(u>0.3&&u<1.6) shadowTail(g,t,[[1420,640],[xc+400,crack-160-lift],[xc+130,crack-8-lift],[xc-120,crack+8-lift],[xc-280,crack-80-lift]],150,2.3,{root:160,wf:2.4});
    if(u>HIT){ const v=u-HIT; for(let i=0;i<8;i++){ const sx=xc+80+i*90; if(sx>1300) continue; smoke(g,sx,crack-4+i*5,50+i*12,0.5*(1-i/8)*(1-seg(v,1,2)),'55,40,42'); }   // bụi cuộn sau đuôi
      glass(g,bx,crack,v,40,17,Math.PI+0.2,1.3); chunks(g,bx,crack,v,18,19,320,'#4a3f44',Math.PI+0.3,1.1,1.5); if(FXr()) FXr().blast({g,t},{x:bx,y:crack,t0:T.d6+HIT,size:90,life:1.1,seed:31}); }
    if(u>1.9){ const v=u-1.9; smoke(g,bx-260,y0-40,120+v*260,0.7*(1-seg(v,1.2,2.2))); chunks(g,bx-200,y0-60,v,24,13,300); }
    g.fillStyle='#0d0709'; g.fillRect(-200,y0,1400,200); }
  // HẬU QUẢ (kaiju-b #14): máy ĐỨNG YÊN, các ĐUÔI hạ dần, xoè chậm sau lưng Friend (dáng Cửu Vĩ) → Friend lặng nhìn thành phố cháy ~1.5s rồi tối về nóc nhà
  function scD7(g,t){ const u=t-T.d7, y0=480; cam(g,480,240,1.06); cityRuin(g,480,y0,0.95,0.2);
    bloodMoon(g,480,150,260,1);
    const down=E.eio(seg(u,0.2,1.8));
    for(let i=0;i<6;i++){ const sd=i<3?-1:1, j=i%3, ang=-Math.PI/2+sd*(0.35+0.32*j+0.35*down), len=640+90*j-120*down;
      shadowTail(g,t,tailPts(480+sd*(70+30*j),400,ang,len,sd*(0.55+0.25*j),t*0.6,i*1.7,0.14),82-8*j,i*2.3,{root:140,wf:1.1}); }
    friendSky(g,480,400,1000,1,1); hazeBelow(g,300);   // hạ Friend: mắt không sát mép trên
    // tiền cảnh: hàng cao tầng đã bị chém cụt (đuôi đi qua từ trước) cháy âm ỉ → thấy rõ HẬU QUẢ + tỉ lệ (Friend cao gấp nhiều lần)
    for(let i=0;i<8;i++){ const x=-40+i*128+18*H(i,61), w=96+40*H(i,62), h=200+130*H(i,63), b={x,w,h,seed:600+i*9};
      cutTower(g,T.d7+5,b,y0+20,i%2?'#1d1417':'#24191d',0.12,T.d7-3,h*(0.4+0.25*H(i,64)),i%2?1:-1); }
    for(let i=0;i<10;i++){ const x=40+i*100; fire(g,x,y0-60-60*H(i,1),60,t,i*3); smoke(g,x,y0-200-80*H(i,2),120,0.4); }
    papers(g,t,8,90,520);
    g.fillStyle='#0b0507'; g.fillRect(-200,y0+20,1400,200); }
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
  // 10/11 anh sửa kịch bản: các vị thần meme đã rời sang chiều không gian khác sau khi Friend bị phong ấn — giờ chỉ còn avatar (1 phần bản thể) với 1 phần nhỏ sức mạnh, không đáng lo.
  //   Mỗi chữ hiện sau 0.36s (≈ tốc độ nói), giữ thêm ~0.8s sau chữ cuối.
  const DIALOG=[[37.9,41.9,'MLEM CAT',"Leader… is it truly time to set it free?"],
    [42.2,45.2,'MLEM CAT',"What if the Godly Memes return?"],
    [45.6,49.8,'DEPRESSED CAT',"After Friend was sealed, they left for other dimensions."],
    [50.2,54.8,'DEPRESSED CAT',"Only their avatars remain… a mere fragment of their power."],
    [55.1,57.2,'DEPRESSED CAT',"Nothing worth worrying about."],
    [57.6,61.6,'DEPRESSED CAT',"Let's go. Let this world… and this universe… know pain."]];
  const SPK={'MLEM CAT':{col:'255,214,120',eyes:[],eye:'255,230,150',cx:560},   // anh dặn: lúc thoại chỉ là bóng đen, KHÔNG loé mắt Mlem — riêng Depressed loé Rinnegan
   'DEPRESSED CAT':{col:'190,150,255',eyes:[[736,405],[852,405]],eye:'170,110,255',cx:480}};
  const speaking=t=>{ for(const d of DIALOG) if(t>=d[0]-0.2&&t<d[1]+0.15) return d; return null; };
  const SUB_WORD=0.12, SUB_HOLD=1.6;   // 12/11 anh dặn: chữ chạy tốc bình thường, hết câu giữ 1–2s rồi tắt (trước 0.36s/chữ → chậm, vừa hiện hết đã tắt)
  const subEnd=d=>Math.min(d[1],d[0]+d[3].split(' ').length*SUB_WORD+SUB_HOLD);
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
    // ⚠️ (9/11 anh chê: chuyển động làm hỏng chi tiết — kính của Chud): KHÔNG cho từng ô chữ nhật (PL) thở / nghiêng riêng nữa — ô cắt xuyên qua
    //    mặt con khác (đầu Chud vắt sang ô Bat) → nửa mặt lệch, vỡ nét. Giờ cả ảnh thở ĐỒNG NHẤT 1 khối (không đường cắt); chỉ dải băng Ninja (vùng RIB
    //    tách sạch) bay riêng; còn lại do máy trôi + tàn lửa. Muốn từng con cử động riêng → cần ẢNH TÁCH LỚP từng con (xin anh), không cắt ô chữ nhật.
    const br=1+0.0035*Math.sin(t*2.1), by=PY0+900*PK;
    g.save(); g.translate(480,by); g.scale(br,br); g.translate(-480,-by);
    if(dark>0.01){ g.save(); g.globalAlpha=dark; for(const [dx,dy] of [[-1.6,0],[1.6,0],[0,-1.6],[0,1]]) g.drawImage(P.rO,dx,PY0+dy,960,P.rO.height*PK); g.restore(); }   // viền đỏ: 1 lần từ nguyên ảnh
    layer(0,0,P.o.width,P.o.height,false);
    { const n=12, sw=RIB[2]/n; for(let i=0;i<n;i++){ const fx=RIB[0]+i*sw, amp=(1-(i+0.5)/n)*7, dy=Math.sin(t*9-i*0.7)*amp+Math.sin(t*14-i*1.3)*amp*0.35;   // đầu tự do (trái) bay mạnh, sát đầu đứng yên
        g.save(); g.translate(0,dy); layer(fx,RIB[1],sw+0.6,RIB[3],true); g.restore(); } }
    g.restore(); g.restore(); }
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
  const RINGS=['零','青','白','朱','空','南','北','三','玉','亥'];   // lint-ok: cjk (logo theo mẫu anh gửi 5/11)
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
      g.fillStyle='#120204'; g.font='900 40px serif'; g.fillText('猫',0,2); g.restore(); }   // lint-ok: cjk (logo theo mẫu anh gửi 5/11)
    const tk=seg(v,1.0,1.4); if(tk>0){ g.globalAlpha=(a0==null?1:a0)*tk; g.fillStyle=RED; g.font=`${Math.round(R*0.15)}px Shojumaru, ${SANS}`;
      g.fillText('EST.',cx-R*1.02,cy+R*0.36); g.fillText('2026',cx+R*1.02,cy+R*0.36);
 }
    g.restore(); }
  // 🎥 GÓC MÁY từng câu thoại (cắt cứng giữa các shot, trong shot máy trôi): [đầu, cuối, cx0,cy0,z0, cx1,cy1,z1, nghiêng]
  const ROOF_SHOTS=[[37.0,39.6, 480,700,1.0, 480,285,1.0, 0],       // cẩu máy từ tường toà nhà lên: lộ cả nhóm trên bệ đá, trăng máu sau đầu thủ lĩnh
    [39.6,42.0, 660,360,1.8, 656,356,1.92, 0.04],                     // câu 1 — Mlem hỏi (trung cảnh)
    [42.0,45.4, 300,330,1.65, 318,322,1.78, -0.03],                   // câu 2 — Bat Cat tiền cảnh trái, cả nhóm phía sau (Mlem hỏi tiếp)
    [45.4,50.0, 480,190,1.55, 484,170,1.8, 0],                        // câu 3 — thủ lĩnh trên bệ đá, trăng máu làm hào quang
    [50.0,54.9, 790,215,1.85, 786,208,2.0, -0.06],                     // câu 4 — góc ngước Ninja (người nghe phản ứng), băng đầu bay
    [54.9,57.4, 494,100,3.3, 494,98,3.6, 0],                          // câu 5 — cận mắt Rinnegan: "Nothing worth worrying about."
    [57.4,61.9, 484,170,2.0, 480,285,1.0, 0]];                        // câu 6 — kéo lùi toàn cảnh: "…know pain"
  const _talkNm=t=>{ const d=speaking(t); return d?(d[2]==='MLEM CAT'?'MLEM':'DEPRESSED'):null; };
  // 👁️ RINNEGAN vẽ RÕ (anh dặn 9/11: trong bóng tối không vẽ thành 2 chấm sáng): tròng tím nhạt viền tím đậm, 3 VÒNG TRÒN ĐỒNG TÂM đen, đồng tử chấm đen,
  //    điểm sáng phản chiếu + quầng tím mờ quanh mắt (sáng giữa bóng đen). r = bán kính tròng (đơn vị thế giới), a = độ hiện (0..1)
  function rinnegan(g,x,y,r,a){ if(a<=0.01) return; g.save();
    g.globalCompositeOperation='lighter'; blob(g,x,y,r*3.2,'150,90,255',0.45*a); g.globalCompositeOperation='source-over'; g.globalAlpha=Math.min(1,a);
    const gr=g.createRadialGradient(x-r*0.2,y-r*0.25,r*0.1,x,y,r); gr.addColorStop(0,'#efe6ff'); gr.addColorStop(0.55,'#c7b0ff'); gr.addColorStop(1,'#8a63e6');
    g.fillStyle=gr; g.beginPath(); g.arc(x,y,r,0,TAU); g.fill();
    g.strokeStyle='#2a1450'; g.lineWidth=Math.max(0.6,r*0.12); g.beginPath(); g.arc(x,y,r,0,TAU); g.stroke();   // viền tròng
    g.strokeStyle='#1a0a33'; g.lineWidth=Math.max(0.45,r*0.085); for(const k of [0.74,0.5,0.28]){ g.beginPath(); g.arc(x,y,r*k,0,TAU); g.stroke(); }   // 3 vòng đồng tâm
    g.fillStyle='#120624'; g.beginPath(); g.arc(x,y,r*0.11,0,TAU); g.fill();   // đồng tử
    g.fillStyle='rgba(255,255,255,0.85)'; g.beginPath(); g.arc(x-r*0.38,y-r*0.42,r*0.13,0,TAU); g.fill();   // điểm sáng phản chiếu
    g.restore(); }
  function scRoof(g,t){ const u=t-T.roof;
    if(t<T.group){ let S=ROOF_SHOTS[0]; for(const q of ROOF_SHOTS) if(t>=q[0]) S=q; const k=E.eio(seg(t,S[0],S[1]));
      cam(g,lerp(S[2],S[5],k),lerp(S[3],S[6],k),lerp(S[4],S[7],k),S[8]); roofSky(g,t); drawPose(g,t,0,_talkNm(t));
      let e=0; for(const d of DIALOG) if(d[2]==='DEPRESSED CAT') e=Math.max(e,seg(t,d[0]-0.3,d[0]+0.2)); if(e>0){ e*=0.8+0.2*Math.sin(t*9);   // Rinnegan loé trong bóng đen
        const br=1+0.0035*Math.sin(t*2.1), by=PY0+900*PK;   // theo đúng nhịp thở cả khối của drawPose
        for(const [ex,ey] of [[815,155],[905,155]]) rinnegan(g,480+(ex*PK-480)*br,by+(PY0+ey*PK-by)*br,8.5,e); } }
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
  const SCENES=[[0,scStreet],[T.stand,scStand],[T.shadow,scShadow],[T.glimpse,scGlimpse],[T.cry,scCry],[T.reveal,scRevealClose],[T.roar,scReveal],[T.react,scReact],[T.glass,scGlass],
    [T.d1,scD1],[T.d2a,scCrowdFg],[T.d2,scD2],[T.d3,scD3],[T.d4,scD4],[T.d5,scD5],[T.d5b,scD5b],[T.d6,scD6],[T.d7,scD7],[T.roof,scRoof]];

  // ───────── chữ ─────────
  function spaced(g,txt,x,y,font,ls,col,a){ g.save(); g.font=font; g.letterSpacing=ls+'px'; g.textAlign='center'; g.textBaseline='middle'; g.globalAlpha=a; g.fillStyle=col; g.fillText(txt,x+ls/2,y); g.restore(); }
  function friendTitle(g,t){ if(t<T.title||t>T.d1) return; const k=seg(t,T.title,T.title+0.5), out=1-seg(t,T.d1-0.4,T.d1);
    g.save(); g.shadowColor='rgba(170,60,255,0.95)'; g.shadowBlur=24*SCv; spaced(g,'FRIEND',VW/2,300+(1-k)*20,`900 96px ${SERIF}`,30,'#f4ecff',k*out); g.restore(); }
  function akaLine(g,t){ const D=speaking(t); if(!D || t>=T.booms) return; const [a,b,nm,line]=D, e=subEnd(D), al=seg(t,a-0.2,a)*(1-seg(t,e,e+0.25)); if(al<=0) return;
    g.save(); g.textAlign='center'; g.textBaseline='middle'; g.globalAlpha=al;
    g.font=`800 12px ${SANS}`; g.letterSpacing='4px'; g.fillStyle=`rgb(${SPK[nm].col})`; g.shadowColor=`rgba(${SPK[nm].col},0.9)`; g.shadowBlur=10*SCv; g.fillText('UNKNOWN MEME',VW/2,VH-78);   // anh dặn: lúc thoại chưa lộ tên thành viên
    g.shadowBlur=0; g.letterSpacing='1px'; g.font=`italic 600 21px ${SERIF}`; const ws=line.split(' '), n=Math.min(ws.length,Math.floor(Math.max(0,t-a)/SUB_WORD)+1);
    g.fillStyle='#f4ecff'; g.fillText(ws.slice(0,n).join(' '),VW/2,VH-52); g.restore(); }
  function endCard(g,t){ const v=t-(T.DUR-3.2); if(v<0) return; const k=seg(v,0,0.8);
    spaced(g,'MEME LORE',VW/2,226,`800 14px ${SANS}`,12,'rgb(255,200,200)',k);
    g.save(); g.shadowColor='rgba(255,40,60,0.9)'; g.shadowBlur=16*SCv; spaced(g,'FINAL',VW/2,272,`400 58px ${SERIF}`,18,'#fff2f2',seg(v,0.3,1.1)); g.restore();
    spaced(g,'PART 1',VW/2,322,`800 12px ${SANS}`,10,'rgb(255,200,200)',seg(v,0.7,1.4)); }

  // ───────── tiếng ─────────
  const A='assets/audio/';
  // cảnh 2 (đuôi quật, 9/11): vút đúng đầu đoạn quét · va đúng khung đuôi chạm (d1 toà đầu +0.65 · d3 ô kính đầu +0.5 · d4 +0.42 · d6 +0.62)
  // 🔊 (10/11 sửa theo tools/x/sfx-lint.js) mỗi dòng: [giây, key, to, dài, NHÃN = việc đang xảy ra trên hình] — mỗi nhịp 1 tiếng, không mượn tiếng meme khác
  const sfx=[
    [T.splat,'cine_impact',0.25,null,'que kem rơi bẹp xuống vỉa hè'],
    [T.cry+0.4,'cry_banana_cat',0.95,null,'Banana Cat ngước lên khóc thét'],
    [T.roar-0.14,'fr_titan_roar',0.8,null,'Friend gầm trên trời (góc giun)'],
    [T.glass+0.1,'l2p_shatter',0.75,null,'sóng âm tiếng gầm quét tới, ô kính đầu tiên nổ'],
    [T.glass+0.35,'ep3_glass',0.7,null,'cả dãy tủ kính vỡ theo vòng sóng'],
    [T.glass+0.65,'se_glass',0.55,null,'mảnh kính rơi rào rào xuống vỉa hè'],
    [T.d1+0.42,'l2p_whoosh',0.6,null,'đuôi bóng tối quét ngang dãy nhà'],
    [T.d1+0.65,'l2p_explode',0.55,null,'đuôi va vào nhà, nổ lửa'],
    [T.d1+0.86,'cine_deep_impact',0.5,null,'khối nhà sập theo đường quét'],
    [T.d2a+0.22,'cine_deep_impact',0.45,null,'đuôi đập xuống sau lưng dân đang chạy'],
    [T.d3+0.32,'ep3_whoosh',0.55,null,'đuôi lao thẳng vào mặt kính toà nhà'],
    [T.d3+0.5,'ep3_glass',0.7,null,'kính vỡ bay về phía máy'],
    [T.d3+1.42,'l2p_whoosh',0.6,null,'đuôi rút ra khỏi toà nhà'],
    [T.d4+0.22,'ep3_whoosh',0.5,null,'đuôi vung lên quật dọc xuống phố'],
    [T.d4+0.42,'cine_deep_impact',0.8,null,'đuôi đập mặt phố, xe văng lên'],
    [T.d5,'l2p_whoosh',0.45,null,'góc chim: nhiều đuôi lao xuống thành phố'],
    [T.d5+0.4,'l2p_explode',0.45,null,'nổ lửa khắp các khối nhà'],
    [T.d5b,'l2p_explode',0.55,null,'góc giun: cột lửa khói bốc lên trời'],
    [T.d6+0.45,'l2p_whoosh',0.5,null,'đuôi lao vào tháp đứng trước trăng máu'],
    [T.d6+0.62,'l2p_crack',0.7,null,'tháp gãy ngang, đổ nghiêng']];
  for(let i=0;i<5;i++) sfx.push([T.booms+i*0.6,'vine_boom',0.85,null,'khung cận mặt thành viên '+(i+1)+'/5 trượt vào']);   // 5 tiếng vine boom = 5 khung trượt vào
  sfx.push([T.akaT,'cine_deep_impact',0.8,null,'logo MEOWKATSUKI đập xuống sau lưng cả nhóm']);   // MEOWKATSUKI đập xuống
  const mus=[
    {src:A+'fin_icecream.mp3', ra:0, rb:T.shadow+0.6, vol:0.32, fo:1.2},                         // nhạc xe kem leng keng: phố bình yên
    {src:A+'fin_city.mp3', ra:0, rb:T.shadow+1, vol:0.3, loop:true, fo:1},                      // tiếng xe cộ
    {src:A+'cine_heart.mp3', ra:T.shadow+0.4, rb:T.reveal+0.4, vol:0.7, fi:0.4, fo:0.4},         // tim đập lúc bóng đen trùm xuống
    {src:A+'cine_ambient_war.mp3', ra:T.reveal, rb:T.roof+0.8, vol:0.55, fi:1, fo:1.2},
    {src:A+'fin_crowd.mp3', ra:T.d1+0.6, rb:T.d7+1, vol:0.45, loop:true, fi:0.5, fo:1},           // đám đông la hét
    {src:A+'fin_collapse.mp3', ra:T.d6+0.6, rb:T.d7+1.5, vol:0.6, fo:0.8},                        // toà nhà sập
    {src:A+'cine_epic.mp3', ra:T.d1, rb:T.roof, vol:0.6, loop:true, fi:0.3, fo:1.0},   // file 12.1s < 14.5s cảnh phá → lặp (10/11)
    {src:A+'dp_akatsuki.mp3', ra:T.roof, rb:DUR, vol:0.75, loop:true, fi:1.2, fo:1.5} ];   // file 8.3s < 32s cảnh nóc nhà → lặp, không tắt giữa chừng (anh chê 10/11)                     // theme Akatsuki: 5 bóng lộ diện

  // 🧩 (9/11/2026) Tập chia CẢNH: MAIN là bản vẽ cả tập theo giây gốc; mỗi cảnh = 1 phim con cắt 1 khoảng giây của MAIN (fin1c1, fin1c2, fin1c3),
  //    tập 'fin1' = K.seq nối các cảnh + nhạc nền theo giây cả tập. Cảnh MỚI (Gojo vs Pain…) viết file riêng rồi thêm id vào FIN1_PARTS.
  const MAIN=({ id:'fin1', title:'Meme Lore · Final — Part 1', VW, VH, DUR,
    imgs:{ fr:'assets/avatars/friend/avatarUrl.webp', hFist:'assets/img/scaredhamster/HAND_fist.webp', hLunge:'assets/img/scaredhamster/HAND_lunge.webp', hClose:'assets/img/scaredhamster/HAND_closing.webp',
      chill:'assets/img/chillguy/CHILLGUY_AVATAR_IMG.webp', doge:'assets/avatars/doge/avatarUrl.webp', cheems:'assets/avatars/cheems/avatarUrl.webp', capy:'assets/avatars/capybara/avatarUrl.webp',
      dogeS:'assets/img/cine/CINE_DOGE_SCARED.webp', dp:'assets/img/depressedcat/DP_PAIN_IMG.webp', chud:'assets/avatars/doorbellchud/avatarUrl.webp', ninja:'assets/avatars/ninjacat/avatarUrl.webp',
      bat:'assets/avatars/batcat/avatarUrl.webp', mlem:'assets/avatars/mlemcat/avatarUrl.webp', akaG:'assets/img/cine/FIN_AKA_GROUP.png', pose:'assets/img/cine/FIN_AKA_POSE.png', aChud:'assets/img/cine/FIN_AKA_CHUD.png', aBat:'assets/img/cine/FIN_AKA_BAT.png', aNinja:'assets/img/cine/FIN_AKA_NINJA.png', aMlem:'assets/img/cine/FIN_AKA_MLEM.png',
      ban:'assets/avatars/bananacat/avatarUrl.webp', banCry:'assets/avatars/bananacat/attackAvatarUrl.webp', corn:'assets/avatars/cornelius/avatarUrl.webp',
      bgDay:'assets/img/cine/FIN_BG_DAY.webp', bgRed:'assets/img/cine/FIN_BG_RED.webp', bgTop:'assets/img/cine/FIN_BG_TOP.webp',   // Bước 4: phông vẽ GPT (cảnh 1 phố bình yên · cảnh 2 trăng máu)
      ...Object.fromEntries(CROWD.map((k,i)=>['c'+i,'assets/avatars/'+k+'/avatarUrl.webp'])) },
    sfx, mus, shots:[{t0:0,t1:DUR,a:{}}],
    impact:t=>{ const on=(a,d)=>t>=a&&t<a+(d||0.07);
      if(on(T.roar,0.05)||on(T.d3+0.5,0.05)||on(T.d1+0.65)||on(T.d2a+0.22)||on(T.d6+0.62)||on(T.akaT)) return 'inv';
      if(on(T.d4+0.42,0.06)||on(T.d5b)) return 'bw';
      return 0; },
    shake:t=>{ let s=0; const hit=(a,amp,d)=>{ if(t>=a&&t<a+d) s=Math.max(s,amp*(1-(t-a)/d)); };
      hit(T.roar,12,1.6); hit(T.d1+0.65,8,0.8); hit(T.d1+0.86,7,0.8); hit(T.d3+0.5,10,0.6); hit(T.d3+1.6,6,0.3); hit(T.d4+0.42,14,0.9); hit(T.d5+0.4,6,0.8); hit(T.d6+0.62,11,0.7); hit(T.d6+1.9,10,1.2); hit(T.d2a+0.22,8,0.5); hit(T.d5b,9,0.9); hit(T.splat,3,0.2); hit(T.glass+0.12,7,0.9); hit(T.akaT,9,0.7);
      if(t>=T.d1&&t<T.roof) s=Math.max(s,1.5); return s; },
    world(F,t){ IM=F.I; TT=t; SCv=F.SC; const g=F.g; let fn=SCENES[0][1]; for(const s of SCENES) if(t>=s[0]) fn=s[1]; g.save(); fn(g,t); g.restore(); },
    post(F,t){ const fx={shocks:[],chroma:0}; const sh=(a,x,y,rm,d,str)=>{ if(t>=a&&t<a+d){ const u=(t-a)/d; fx.shocks.push({sx:x,sy:y,r:20+rm*E.eout(u),w:30,str:str*(1-u)}); fx.chroma=Math.max(fx.chroma,1-u); } };
      sh(T.roar,480,200,600,1.0,26); sh(T.glass+0.1,80,-120,900,0.9,22); sh(T.d4+0.42,480,420,520,0.8,24); sh(T.d3+0.5,300,220,420,0.6,20); sh(T.d1+0.65,60,250,380,0.6,14); sh(T.d6+0.62,520,300,420,0.7,20); if(t>=T.reveal&&t<T.d1) fx.chroma=Math.max(fx.chroma,0.15); return fx; },
    screen(F,t){ const g=F.g; SCv=F.SC;
      // cắt cảnh tàn phá: loé trắng ngắn ở mỗi khung mới
      for(const a of [T.d1,T.d2a,T.d2,T.d3,T.d4,T.d5,T.d5b,T.d6,T.d7]) if(t>=a&&t<a+0.06) K.flash(F,0.5*(1-(t-a)/0.06),'#fff');
      if(t>=T.roof-0.4&&t<T.roof+0.6) K.flash(F,1-Math.abs(t-T.roof)/0.6,'#000');
      if(t>=T.group&&t<T.group+0.35) K.flash(F,1-(t-T.group)/0.35,'#fff');   // 5 khung → ảnh nhóm
      
      K.letterbox(F,0.9*(1-seg(t,T.group,T.group+0.6)));
      akaLine(g,t); akaStrips(g,t); } });   // 10/11 anh dặn: BỎ tiêu đề FRIEND + thẻ cuối (anh không yêu cầu)

  // ── CẢNH: [id, tên, giây đầu, giây cuối (theo MAIN), ảnh dùng (dò bằng window.__ckImgLog, quét 0.1s/khung 9/11; null = tất cả)] ──
  const CUTS=[
    ['fin1c1','Final 1 · Cảnh 1 · Phố bình yên', 0, T.reveal, ['fr','ban','banCry','corn','chill','doge','cheems','capy','bgDay',...Array.from({length:14},(_,i)=>'c'+i)]],
    ['fin1c2','Final 1 · Cảnh 2 · Friend phá thành phố', T.reveal, T.roof, ['fr','hFist','dogeS','banCry','bgRed','bgTop',...Array.from({length:14},(_,i)=>'c'+i)]],
    ['fin1c3','Final 1 · Cảnh 3 · Nóc nhà Meowkatsuki', T.roof, T.DUR, ['pose','dp','aChud','aBat','aNinja','aMlem']]];
  const pick=keys=>keys?Object.fromEntries(keys.map(k=>[k,MAIN.imgs[k]])):MAIN.imgs;
  CUTS.forEach(([id,title,a,b,keys],i)=>CineKit.film({ id, title, VW, VH, cast:['cry','fr','dp'],   // tiền tố tiếng của nhân vật có mặt (Banana Cat, Friend, Depressed) — sfx-lint
    DUR:b-a, imgs:pick(keys), fadeIn:i===0, fadeOut:i===CUTS.length-1,
    sfx:MAIN.sfx.filter(s=>s[0]>=a&&s[0]<b).map(s=>[s[0]-a,...s.slice(1)]),
    mus:MAIN.mus.filter(m=>m.rb>a&&m.ra<b).map(m=>({...m, ra:Math.max(0,m.ra-a), rb:Math.min(b,m.rb)-a, off:(m.off||0)+Math.max(0,a-m.ra), fi:m.ra>=a?m.fi:0, fo:m.rb<=b?m.fo:0})),   // chỉ dùng khi xem LẺ cảnh
    shots:[{t0:0,t1:b-a,a:{}}],
    impact:t=>MAIN.impact(t+a), shake:t=>MAIN.shake(t+a), world:(F,t)=>MAIN.world(F,t+a), post:(F,t)=>MAIN.post(F,t+a), screen:(F,t)=>MAIN.screen(F,t+a) }));
  // TẬP: thứ tự cảnh. Thêm cảnh mới: tạo js/film-<id>.js (CineKit.film, fadeIn/fadeOut:false), nạp trước dòng này, thêm id vào đây (+ nhạc nền vào mus nếu cần).
  // 📱 TRAILER DỌC 9:16 'fin1tr' (anh dặn 10/11): Friend xuất hiện → Banana Cat hoảng sợ → nhảy sang thoại Akatsuki → giới thiệu thành viên.
  //    Hình = CẮT KHUNG DỌC từ bản vẽ ngang MAIN (lấy 304×540 quanh tâm cx của khung gốc, phóng ×1.78). Phụ đề + 5 thẻ thành viên vẽ RIÊNG cho khung dọc
  //    (bản ngang cắt dọc sẽ cụt chữ). Tiếng = tiếng của MAIN rơi vào từng đoạn; nhạc riêng. Xem: Meme Cinema → MEME LORE 2 → Final · Part 1 — Trailer 9:16.
  (function(){ const TW=540, TH=960, KZ=TH/VH;
    // 10/11 anh dặn: trailer 15–20s (thoại chỉ giữ câu hỏi + câu Pain), mỗi shot ZOOM / tâm khung riêng cho vừa 9:16. cut(giây gốc, dài, tâm ngang, nhảy cảnh, zoom, tâm dọc) — zoom mặc định 1.78 (= lấp đầy chiều cao)
    const EDL=[]; let acc=0; const cut=(s,d,cx,jump,kz,cy)=>{ EDL.push({a:acc,s,d,cx:cx||VW/2,jump:!!jump,kz:kz||KZ,cy:cy||VH/2}); acc+=d; };
    // 10/11 anh dặn lại thứ tự: MỌI NGƯỜI HOẢNG LOẠN → FRIEND LÓ RA → CHUỐI KHÓC (không que kem) → thoại → thành viên → logo
    cut(T.d2,1.1,430,false,2.5,420);        // dân meme chạy loạn dọc phố (zoom sát đám đông dưới chân nhà)
    cut(T.d2a+0.05,0.45,560,true,1.6,270);  // đuôi bóng tối đập xuống sau lưng dân, nổ lửa
    // (11/11 bỏ shot ngước lên T.glimpse: khung dọc chỉ lọt khoảng trời xám giữa 2 dãy nhà)
    const RV=acc; cut(T.reveal+0.4,1.5,null,false,1.78);  // cực cận lướt hàm răng Friend → mắt bật sáng = TIẾNG GẦM vào đúng lúc này (anh dặn 11/11)
    cut(T.roar,1.3,480,false,1.6,250);      // góc giun: Friend gầm, vòng sóng âm toả ra
    cut(T.glass+0.05,0.95,null,true,1.9,290); // sóng âm quét xuống phố → vỡ hết kính
    cut(T.cry,1.65,null,true,2.0,240);      // Banana Cat cầm kem NGƯỚC LÊN → hoảng → khóc thét, que kem rơi (1 lần, anh dặn 11/11 — trước bị lặp)
    const dlg=acc; cut(42.0,3.3,null,true,1.5,300);   // nóc nhà — Mlem: "What if the Godly Memes return?"
    cut(57.4,4.4,480,false,1.15,300);       // "…know pain." — lùi máy cho lọt cả nhóm
    cut(T.booms,T.group-T.booms);           // 5 thẻ thành viên (vẽ dọc ở screen)
    cut(T.group,2.3,480,false,1.2,330);     // ảnh cả nhóm + logo MEOWKATSUKI, lùi cho vừa khung dọc
    const DURT=acc, at=t=>{ let e=EDL[0]; for(const q of EDL) if(t>=q.a) e=q; return e; }, src=t=>{ const e=at(t); return e.s+Math.min(e.d-1e-3,t-e.a); };
    const sfxT=[]; for(const e of EDL) for(const s of MAIN.sfx) if(s[1]!=='fr_titan_roar' && s[0]>=e.s && s[0]<e.s+e.d) sfxT.push([e.a+s[0]-e.s,...s.slice(1)]);
    sfxT.push([RV+0.5,'fr_titan_roar',0.9,null,'mắt Friend bật sáng → gầm (kéo sang shot góc giun)']);   // mắt bật sáng ở giây gốc reveal+1.05 = RV+0.65; tiếng có đỉnh trễ 0.14s
    // 5 thẻ thành viên XẾP DỌC (mỗi thẻ 1/5 chiều cao, mép chéo), trượt vào theo 5 tiếng vine boom
    function stripsV(g,s){ if(s<T.booms||s>=T.group+0.25) return; const SK=40, Hd=TH/5;
      for(let i=0;i<5;i++){ const a=T.booms+i*0.6, k=E.eout3(seg(s,a,a+0.22)); if(k<=0) continue; const dir=i%2?1:-1, ox=(1-k)*TW*1.1*dir, yT=i*Hd;
        const P=[[0,yT+(i===0?-SK:SK*0.5)],[TW,yT-(i===0?SK:SK*0.5)],[TW,yT+Hd-(i===4?-SK:SK*0.5)],[0,yT+Hd+(i===4?SK:SK*0.5)]];
        g.save(); g.translate(ox,0); g.beginPath(); P.forEach(([x,y],j)=>j?g.lineTo(x,y):g.moveTo(x,y)); g.closePath(); g.clip();
        const bg=g.createLinearGradient(0,yT,TW,yT+Hd); bg.addColorStop(0,'#2a0408'); bg.addColorStop(1,'#0a0103'); g.fillStyle=bg; g.fillRect(0,yT-SK,TW,Hd+SK*2);
        const [key,fx,fy]=AKA_ONE[i], c=K.prep(IM[key]); if(c){ const dw=TW*0.95, dh=dw*c.sh/c.sw; g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,TW*0.62-fx*dw,yT+Hd*0.5-fy*dh,dw,dh); }
        const vg=g.createLinearGradient(0,0,TW*0.6,0); vg.addColorStop(0,'rgba(0,0,0,0.85)'); vg.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=vg; g.fillRect(0,yT-SK,TW,Hd+SK*2);
        if(s<a+0.08){ g.globalCompositeOperation='lighter'; g.globalAlpha=1-(s-a)/0.08; g.fillStyle='#ff5a4a'; g.fillRect(0,yT-SK,TW,Hd+SK*2); g.globalCompositeOperation='source-over'; g.globalAlpha=1; }
        g.restore();
        g.save(); g.translate(ox,0); g.strokeStyle='#fff'; g.lineWidth=3; g.beginPath(); g.moveTo(P[0][0],P[0][1]); g.lineTo(P[1][0],P[1][1]); g.stroke();
        g.font=`800 22px ${SANS}`; g.letterSpacing='4px'; g.textAlign='left'; g.textBaseline='middle'; g.fillStyle='#ffecec'; g.shadowColor='rgba(255,40,40,0.9)'; g.shadowBlur=12*SCv;
        g.fillText(AKA[i][0],28,yT+Hd*0.5); g.restore(); } }
    // phụ đề khung dọc: tên người nói + câu xuống dòng trong bề ngang 480, chữ hiện 0.36s / chữ (đúng tốc độ nói)
    function subV(g,s){ const D=speaking(s); if(!D || s>=T.booms) return; const [a,b,nm,line]=D, e=subEnd(D), al=seg(s,a-0.2,a)*(1-seg(s,e,e+0.25)); if(al<=0) return;
      const ws=line.split(' '), n=Math.min(ws.length,Math.floor(Math.max(0,s-a)/SUB_WORD)+1); g.save(); g.globalAlpha=al; g.textAlign='center'; g.textBaseline='middle';
      g.font=`800 16px ${SANS}`; g.letterSpacing='5px'; g.fillStyle=`rgb(${SPK[nm].col})`; g.shadowColor=`rgba(${SPK[nm].col},0.9)`; g.shadowBlur=10*SCv; g.fillText('UNKNOWN MEME',TW/2,TH-230);
      g.shadowBlur=0; g.letterSpacing='1px'; g.font=`italic 600 30px ${SERIF}`; const L=[]; let cur='';
      for(const w of ws){ const tryS=cur?cur+' '+w:w; if(g.measureText(tryS).width>470&&cur){ L.push(cur); cur=w; } else cur=tryS; } if(cur) L.push(cur);   // xếp dòng theo CẢ câu (không nhảy dòng khi chữ hiện dần)
      let shown=0; L.forEach((ln,i)=>{ const lw=ln.split(' '), take=Math.max(0,Math.min(lw.length,n-shown)); shown+=lw.length; if(!take) return;
        const full=g.measureText(ln).width, part=lw.slice(0,take).join(' '); g.textAlign='left'; g.lineWidth=6; g.strokeStyle='rgba(0,0,0,0.75)'; g.strokeText(part,TW/2-full/2,TH-190+i*42); g.fillStyle='#f4ecff'; g.fillText(part,TW/2-full/2,TH-190+i*42); });
      g.restore(); }
    const keys=Object.keys(MAIN.imgs);   // 11/11: nạp HẾT ảnh MAIN — trước thiếu c0…c13 / dogeS / hFist nên dân phố + đuôi không hiện trong trailer
    CineKit.film({ id:'fin1tr', title:'Final 1 · Trailer 9:16', VW:TW, VH:TH, DUR:DURT, cast:['cry','fr','dp'], fadeIn:true, fadeOut:true,
      imgs:Object.fromEntries(keys.filter(k=>MAIN.imgs[k]).map(k=>[k,MAIN.imgs[k]])), sfx:sfxT,
      mus:[{src:A+'fin_crowd.mp3', ra:0, rb:RV+0.1, vol:0.55, fo:0.3},                        // đám đông la hét (đoạn hoảng loạn)
           {src:A+'cine_heart.mp3', ra:RV-0.05, rb:RV+0.7, vol:0.7, fi:0.15, fo:0.3},                 // tim đập lúc Friend ló ra
           {src:A+'cine_ambient_war.mp3', ra:0, rb:dlg+0.3, vol:0.5, fi:0.4, fo:0.5},
           {src:A+'dp_akatsuki.mp3', ra:dlg, rb:DURT, vol:0.75, loop:true, fi:0.6, fo:1.2}],
      shots:[{t0:0,t1:DURT,a:{}}],
      impact:t=>MAIN.impact(src(t)), shake:t=>MAIN.shake(src(t)),
      world(F,t){ const e=at(t), s=src(t), g=F.g; g.save(); g.translate(TW/2,TH/2); g.scale(e.kz,e.kz); g.translate(-e.cx,-e.cy); MAIN.world(F,s); g.restore(); },
      screen(F,t){ const g=F.g, s=src(t), e=at(t); SCv=F.SC;
        if(e.jump && t-e.a<0.07) K.flash(F,0.6*(1-(t-e.a)/0.07),'#fff');                 // nhảy cảnh: loé trắng 1 khung
        if(s>=T.group&&s<T.group+0.35) K.flash(F,1-(s-T.group)/0.35,'#fff');              // 5 thẻ → ảnh nhóm
        subV(g,s); stripsV(g,s); K.vignette(F,0.45); } });
  })();
  // 10/11 anh dặn: TÁCH các trận lớn ra khỏi tập (chưa có cảnh nối) → tập fin1 chỉ 3 cảnh. Gojo vs Pain = phim riêng 'fin1c4' (js/film-fin1c4.js, mục riêng trong menu);
  //   các trận phụ = js/film-fin1f*.js. Khi anh thêm cảnh nối thì mới ghép lại vào FIN1_PARTS.
  window.FIN1_PARTS=window.FIN1_PARTS||CUTS.map(c=>c[0]);
  CineKit.seq({ id:'fin1', title:MAIN.title, VW, VH, parts:window.FIN1_PARTS, mus:MAIN.mus });
})();
