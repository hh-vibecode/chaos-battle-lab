// 🧊⛓️ Meme Lore · FINAL · Part 1 — TRẬN PHỤ 1: DOORBELL CHUD (Kratos, 2 xích nung đỏ, áo Akatsuki) + MLEM vs BUFF DOGE + CLAPPING — CÔNG VIÊN ĐÊM
// (16/11/2026, anh chốt) DỰNG LẠI TOÀN BỘ THEO LỚP 2D — bỏ hẳn thành phố / nhân vật 3D:
//   • NỀN = GPT vẽ nét anime TAY (tô phẳng, viền mực, KHÔNG nhân vật, KHÔNG hiệu ứng): công viên yên bình · góc ngước trời · bụi cây tối · phố 3 toà nhà · bãi đổ nát
//     + công viên nứt vỡ (đoạn vận sức) · tấm 12 tảng đá phông xanh · khối băng vẽ tay.
//   • NHÂN VẬT = ẢNH MEME GỐC (anh: "meme luôn phải nguyên bản"; ảnh Buff Doge vẽ lại tư thế → BỎ HẾT, "trông không giống nguyên tác").
//     Buff Doge chỉ dùng ảnh gốc + chuyển động code (lao, giật lùi, nảy, nghiêng) + vệt sáng cho pha nhanh. Haki = ảnh Haki của game. Chud giữ các khung động tác.
//   • CỠ (anh dặn): Buff Doge to GẤP 3 meme thường. Doge thường (lúc bị đóng băng) cỡ meme thường.
//   • VFX code: sét vàng, xích nung đỏ (ô mắt xích lặp), cột Bifrost, nổ, bụi, vệt tốc độ. Mỗi pha 1 góc TĨNH, đổi pha = CẮT.
//   Kịch bản: prompts/kich-ban/fin1f1-v3.md (anh duyệt) — đã bỏ cảnh Buff Doge bị trói / nhấc bổng (anh: "bỏ mấy cảnh như này").
(function(){
  if(!window.CineKit || CineKit.films.fin1f1) return;
  const BASE=((document.currentScript&&document.currentScript.src)||'js/film-fin1f1.js').replace(/film-[^\/]*$/,''), V=window.GAME_VERSION?'?v='+GAME_VERSION.build:'';
  if(!window.Fin1Fight){ try{ const x=new XMLHttpRequest(); x.open('GET',BASE+'fin1-fight.js'+V,false); x.send(); (0,eval)(x.responseText); }catch(e){} }
  const K=CineKit, {seg,lerp,clamp,hash}=K, EA=K.EASE, eout=EA.eout, ein=EA.ein, eio=EA.eio, C=K.cam, TAU=Math.PI*2, VW=960, VH=540;
  const T={ strikeD:2.2, strikeK:2.55, landD:3.9, landK:4.4, look:5.4, lurk:6.8, bind:8.4, mlem:9.2, lick:9.5, frz:9.82, out:11.4, laugh:13.6, puzzle:15.2,
    shake:16.4, crack:16.9, imp1:18.2, wideD:18.25, eye:19.6, blk:20.9, zImp:21.4, burst:21.65, quiet:22.6, charge:22.6, glare:23.3, ram:24.4, b1:25.3, h1:25.5, h2:26.2, h3:26.9, dust:28.4,
    cover:30.4, mturn:32.4, raise:33.8, rise:35.8, net0:36.8, spin:37.05, back:37.25, release:37.45, netDone:37.95, r1:38.2, l1:38.45, l2:38.7, l3:39.0, swing0:39.6, punch:40.15, land:40.4,
    storm:40.8, down:42.4, haki:43.7, hakiOn:44.3, pull:45.5, snap:46.2, shock:46.9, lunge:47.5, clash:48.2, far:48.6, whip:49.35, tunnel:49.55, DUR:50.5 };
  const STORM=[40.95,41.15,41.35,41.55,41.8,42.05];   // lưới siết: 6 roi quất dồn dập từ mọi phía
  const CLAPS=[13.75,14.05,14.35,14.65,14.95];
  const IMG={ ZBG:'assets/img/cine/FIN_F1_ZBG.jpg', ZRK:'assets/img/cine/FIN_F1_ROCKS.png', ZICE:'assets/img/cine/FIN_F1_ICE.png', CHT:'assets/img/cine/FIN_F1_CHAIN_TILE.png',
    BPARK:'assets/img/cine/FIN_F1_BG_PARK.jpg', BSKY:'assets/img/cine/FIN_F1_BG_SKY.jpg', BTREE:'assets/img/cine/FIN_F1_BG_TREES.jpg', BCITY:'assets/img/cine/FIN_F1_BG_CITY.jpg', BRUIN:'assets/img/cine/FIN_F1_BG_RUIN.jpg',
    D0:'assets/avatars/doge/avatarUrl.webp', DB:'assets/avatars/doge/rageAvatarUrl.webp', DZ:'assets/img/cine/FIN_F1_DOGE_ONEPUNCH.png', DH:'assets/img/doge/DG_HAKI_IDLE.webp',
    K0:'assets/avatars/clappingcat/avatarUrl.webp', KR:'assets/avatars/clappingcat/rageAvatarUrl.webp', K1:'assets/avatars/clappingcat/skill1AvatarUrl.webp', K2:'assets/avatars/clappingcat/skill2AvatarUrl.webp', K3:'assets/avatars/clappingcat/skill3AvatarUrl.webp',
    M0:'assets/img/cine/FIN_AKA_MLEM.png', MA:'assets/avatars/mlemcat/attackAvatarUrl.webp',
    CK0:'assets/img/cine/FIN_F1_CHUD_K0.png', CK2:'assets/img/cine/FIN_F1_CHUD_K2.png', CHF:'assets/img/cine/FIN_F1_CHIT_fly.png' };
  for(let i=1;i<=8;i++) IMG['CN'+i]='assets/img/cine/FIN_F1_CN_'+i+'.png';
  const HT={D0:0.72,DB:3.3,DZ:3.3,DH:3.3,K0:1,KR:1,K1:1,K2:1,K3:1,M0:1,MA:1,CK0:1.17,CK2:1.41,CHF:1.0,CN1:1.17,CN2:1.18,CN3:1.10,CN4:1.17,CN5:1.22,CN6:1.20,CN7:1.0,CN8:0.99};   // cỡ tương đối (meme thường = 1, Buff Doge ×3.3)
  const HAND={CK0:[[0.08,0.45],[0.92,0.45]],CN1:[[0.114,0.40],[0.18,0.445]],CN2:[[0.104,0.088],[0.104,0.407]],CN3:[[0.06,0.226],[0.97,0.226]],CN4:[[0.03,0.215],[0.933,0.21]],CN5:[[0.224,0.06],[0.853,0.06]],CN6:[[0.29,0.268],[0.696,0.268]],CN7:[[0.519,0.018],[0.706,0.044]],CN8:[[0.977,0.248],[0.977,0.248]]};
  const ROCKBB=[[460,82,582,314],[22,100,450,264],[1052,110,456,256],[864,460,178,288],[62,480,286,258],[1188,490,268,232],[482,514,224,206],[740,842,88,106],[118,844,128,110],[422,848,134,106],[1330,864,74,74],[1018,866,104,80]];

  // ═════════ CÔNG CỤ VẼ 2D ═════════
  function cover(g,im,zm,cx,cy){ if(!im||!im.naturalWidth) return; const sc=Math.max(VW/im.naturalWidth,VH/im.naturalHeight)*zm*1.03, w=im.naturalWidth*sc, h=im.naturalHeight*sc; g.drawImage(im,VW*0.5-w*cx,VH*0.5-h*cy,w,h); }
  function bg(F,key,zm,cx,cy,o){ const g=F.g; o=o||{}; g.save(); if(o.alpha!=null) g.globalAlpha=o.alpha; if(o.blur) g.filter='blur('+o.blur+'px)'; cover(g,F.I[key],zm,cx==null?0.5:cx,cy==null?0.5:cy); g.restore(); }
  // ảnh meme: chân đặt ở (x,y), cao h px · o: flip, rot, sx, sy, alpha, shadow, glow:'#màu', glowA, tint:'#màu', tintA, ghost:[dx,dy,n], dark
  function spr(F,key,x,y,h,o){ const c=K.prep(F.I[key]); if(!c) return null; const g=F.g, w=h*c.sw/c.sh; o=o||{}; const al=o.alpha==null?1:o.alpha;
    if(o.shadow!==false){ g.save(); g.globalAlpha=0.45*al*(o.shadowK==null?1:o.shadowK); g.fillStyle='#000'; g.beginPath(); g.ellipse(x,o.gy==null?y:o.gy,w*0.4,Math.max(2,h*0.045),0,0,TAU); g.fill(); g.restore(); }
    const draw=(src,a,dx,dy,comp)=>{ g.save(); g.globalAlpha=a; if(comp) g.globalCompositeOperation=comp; g.translate(x+(dx||0),y+(dy||0)); if(o.rot) g.rotate(o.rot); g.scale((o.flip?-1:1)*(o.sx||1),o.sy||1);
      if(src===c) g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,-w/2,-h,w,h); else g.drawImage(src,-w/2,-h,w,h); g.restore(); };
    if(o.ghost){ const [gx,gy,n]=o.ghost; for(let k=n;k>=1;k--) draw(c,al*0.22*(n+1-k)/n,-gx*k,-gy*k); }
    if(o.glow){ const tg=K.tinted(c,o.glow), a=(o.glowA==null?0.6:o.glowA)*al; for(const [dx,dy] of [[-3,0],[3,0],[0,-3],[0,3]]) draw(tg,a,dx,dy,'lighter'); }
    draw(c,al);
    if(o.tint) draw(K.tinted(c,o.tint),(o.tintA==null?0.4:o.tintA)*al,0,0,'lighter');
    if(o.dark) draw(K.tinted(c,'#05040a'),o.dark*al);
    return {w,h,c}; }
  const handAt=(key,x,y,h,flip,j)=>{ const c=K.prep(window.__f1I&&__f1I[key]); const hd=HAND[key]; if(!c||!hd) return [x,y-h*0.5]; const w=h*c.sw/c.sh; let [fx,fy]=hd[j]; if(flip) fx=1-fx; return [x-w/2+fx*w, y-h+fy*h]; };
  // xích nung đỏ: ô mắt xích lặp dọc đường (ảnh GPT FIN_F1_CHAIN_TILE) + quầng đỏ
  function chainPts(a,b,sag,wob,t,k){ const P=[]; k=k==null?1:k; for(let i=0;i<=16;i++){ const f=i/16*k; P.push([lerp(a[0],b[0],f), lerp(a[1],b[1],f)+sag*4*f*(1-f)+(wob||0)*Math.sin(f*9+t*22)*f]); } return P; }
  function chain(F,P,w,o){ const im=F.I.CHT, c=K.prep(im); const g=F.g; o=o||{}; if(P.length<2) return;
    g.save(); g.lineCap='round'; g.lineJoin='round'; g.globalCompositeOperation='lighter'; g.strokeStyle='rgba(255,70,20,'+(0.28*(o.hot==null?1:o.hot))+')'; g.lineWidth=w*1.8; g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); g.restore();
    if(!c){ g.save(); g.strokeStyle='#5a2a1a'; g.lineWidth=w*0.6; g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); g.restore(); return; }
    const tl=w*c.sw/c.sh; let carry=0; for(let i=1;i<P.length;i++){ const [x0,y0]=P[i-1], [x1,y1]=P[i], L=Math.hypot(x1-x0,y1-y0), an=Math.atan2(y1-y0,x1-x0); let d=carry;
      while(d<L){ const f=d/L; g.save(); g.translate(lerp(x0,x1,f),lerp(y0,y1,f)); g.rotate(an); g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,0,-w/2,tl,w); g.restore(); d+=tl*0.92; } carry=d-L; } }
  // vòng xích quấn quanh người (nửa sau vẽ trước nhân vật, nửa trước vẽ sau)
  function coil(F,cx,cy,rx,ry,w,front,t){ for(let k=0;k<3;k++){ const y=cy+(k-1)*ry*1.6, P=[]; for(let i=0;i<=12;i++){ const a=(front?0:Math.PI)+i/12*Math.PI; P.push([cx+Math.cos(a)*rx*(1-0.06*k),y+Math.sin(a)*ry]); } chain(F,P,w,{hot:0.8}); } }
  function streak(g,x0,y0,x1,y1,w,col,core,fade){ fade=fade==null?1:fade; if(fade<=0.01) return; const an=Math.atan2(y1-y0,x1-x0), L=Math.hypot(x1-x0,y1-y0), nx=-Math.sin(an), ny=Math.cos(an);
    g.save(); g.globalCompositeOperation='lighter'; for(const [k,a,cc] of [[2.4,0.3,col],[1.2,0.75,col],[0.45,1,core||'255,255,240']]){ const ww=w*k; g.fillStyle='rgba('+cc+','+(a*fade)+')'; g.beginPath(); g.moveTo(x0,y0); g.lineTo(x1+nx*ww/2,y1+ny*ww/2); g.arc(x1,y1,ww/2,an-Math.PI/2,an+Math.PI/2,false); g.lineTo(x0,y0); g.fill(); } g.restore(); }
  function puff(g,x,y,r,a,col){ if(a<=0.01||r<=0.5) return; const gr=g.createRadialGradient(x,y,0,x,y,r); gr.addColorStop(0,'rgba('+col+','+a+')'); gr.addColorStop(0.6,'rgba('+col+','+(a*0.45)+')'); gr.addColorStop(1,'rgba('+col+',0)'); g.fillStyle=gr; g.fillRect(x-r,y-r,2*r,2*r); }
  function dust(g,x,y,u,R,col,seed){ if(u<0||u>1) return; for(let i=0;i<10;i++){ const an=Math.PI*(hash(seed+i)*1.0)+Math.PI, d=R*(0.3+0.7*eout(u))*(0.6+0.6*hash(seed+i+20)); puff(g,x+Math.cos(an)*d*1.6,y+Math.sin(an)*d*0.35-u*R*0.15,R*(0.18+0.16*hash(seed+i+40))*(0.7+u),0.35*(1-u),col||'150,130,120'); } }
  function ring(g,x,y,r,a,col,lw){ if(a<=0.01) return; g.save(); g.strokeStyle='rgba('+(col||'255,230,160')+','+a+')'; g.lineWidth=lw||3; g.beginPath(); g.ellipse(x,y,r,r*0.22,0,0,TAU); g.stroke(); g.restore(); }
  // sét vàng: nhiều khúc gãy + 1–2 nhánh, 3 lớp (quầng · thân · lõi trắng)
  function zap(g,x,y,ang,len,wd,seed,col){ const H=n=>hash(seed*31+n), path=(x0,y0,a,L,n,o)=>{ const P=[[x0,y0]]; let px=x0, py=y0; for(let i=1;i<=n;i++){ const j=(H(o+i)-0.5)*L*0.34; px+=Math.cos(a)*L/n-Math.sin(a)*j; py+=Math.sin(a)*L/n+Math.cos(a)*j; P.push([px,py]); } return P; };
    const M=path(x,y,ang,len,8,0), B=[M]; for(let k=0;k<2;k++){ const q=M[3+((H(50+k)*4)|0)]; B.push(path(q[0],q[1],ang+(H(60+k)<0.5?-1:1)*(0.5+0.5*H(70+k)),len*(0.25+0.2*H(80+k)),6,100+k*20)); }
    const cs=col==='red'?[[3.5,'rgba(255,30,30,0.22)'],[1.3,'rgba(255,60,50,0.85)'],[0.5,'rgba(255,230,230,1)']]:[[3.5,'rgba(255,160,20,0.2)'],[1.3,'rgba(255,205,70,0.8)'],[0.5,'rgba(255,252,235,1)']];
    g.save(); g.lineCap='round'; g.lineJoin='round'; g.globalCompositeOperation='lighter'; for(const [lw,cc] of cs) B.forEach((P,bi)=>{ g.strokeStyle=cc; g.lineWidth=wd*lw*(bi?0.55:1); g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); }); g.restore(); }
  function sparks(g,x,y,t0,t,n,sp,col,seed){ const u=(t-t0)/0.45; if(u<0||u>1) return; g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle='rgba('+(col||'255,200,90')+','+(1-u)+')'; g.lineWidth=2;
    for(let i=0;i<n;i++){ const an=hash(seed+i)*TAU, d=sp*u*(0.5+hash(seed+i+50)), px=x+Math.cos(an)*d, py=y+Math.sin(an)*d+u*u*40; g.beginPath(); g.moveTo(px,py); g.lineTo(px-Math.cos(an)*10,py-Math.sin(an)*10); g.stroke(); } g.restore(); }
  function rockFly(F,x,y,t0,t,n,sp,seed,sz){ const im=F.I.ZRK; if(!im||!im.naturalWidth) return; const u=t-t0; if(u<0||u>1.6) return; const g=F.g;
    for(let i=0;i<n;i++){ const b=ROCKBB[7+(i%5)], an=-Math.PI*(0.15+0.7*hash(seed+i)), v=sp*(0.6+0.8*hash(seed+i+9)), px=x+Math.cos(an)*v*u, py=y+Math.sin(an)*v*u+600*u*u, s=(sz||22)*(0.6+0.8*hash(seed+i+19)), w=s*b[2]/b[3];
      g.save(); g.globalAlpha=Math.min(1,(1.6-u)*2); g.translate(px,py); g.rotate(u*8*(hash(seed+i+29)-0.5)); g.drawImage(im,b[0],b[1],b[2],b[3],-w/2,-s/2,w,s); g.restore(); } }
  function fireflies(g,t,n){ g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<n;i++){ const x=VW*hash(i+900)+Math.sin(t*0.6+i)*20, y=VH*(0.35+0.5*hash(i+910))+Math.sin(t*0.9+i*2)*12, a=0.5+0.5*Math.sin(t*3+i*5); puff(g,x,y,6+4*hash(i+920),0.55*a,'255,220,120'); } g.restore(); }
  function eyes(g,x,y,sep,r,col,k){ if(k<=0.01) return; g.save(); g.globalCompositeOperation='lighter'; for(const s of [-1,1]){ puff(g,x+s*sep,y,r*4,0.35*k,col); g.fillStyle='rgba('+col+','+k+')'; g.beginPath(); g.ellipse(x+s*sep,y,r*1.4,r*0.45*k+0.5,s*0.15,0,TAU); g.fill(); } g.restore(); }
  function pillar(g,x,top,bot,w,col,k,t){ if(k<=0.01) return; g.save(); g.globalCompositeOperation='lighter';
    for(const [kk,al] of [[3,0.15],[1.5,0.35],[0.7,0.75],[0.25,1]]){ const ww=w*kk, gr=g.createLinearGradient(x-ww,0,x+ww,0); gr.addColorStop(0,'rgba('+col+',0)'); gr.addColorStop(0.5,kk<0.3?'rgba(255,255,250,'+(al*k)+')':'rgba('+col+','+(al*k)+')'); gr.addColorStop(1,'rgba('+col+',0)'); g.fillStyle=gr; g.fillRect(x-ww,top,ww*2,bot-top); }
    const rb=['255,80,80','255,200,60','80,255,120','80,160,255','200,90,255']; for(let i=0;i<5;i++){ g.strokeStyle='rgba('+rb[i]+','+(0.35*k)+')'; g.lineWidth=1.5; for(const s of [-1,1]){ g.beginPath(); g.moveTo(x+s*w*(0.8+i*0.08),top); g.lineTo(x+s*w*(0.8+i*0.08),bot); g.stroke(); } }   // viền cầu vồng (Bifrost)
    g.strokeStyle='rgba(255,255,255,'+(0.5*k)+')'; g.lineWidth=2; for(let i=0;i<6;i++){ const yy=top+((t*900+i*(bot-top)/6)%(bot-top)); g.beginPath(); g.moveTo(x-w*0.9,yy); g.lineTo(x+w*0.9,yy+w*0.5); g.stroke(); }   // vệt xoáy chạy xuống
    g.restore(); }
  function rune(g,x,y,r,a,col){ if(a<=0.01) return; g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle='rgba('+col+','+a+')'; g.lineWidth=2; for(const rr of [r,r*0.78]){ g.beginPath(); g.ellipse(x,y,rr,rr*0.24,0,0,TAU); g.stroke(); }
    for(let i=0;i<24;i++){ const an=i/24*TAU, x0=x+Math.cos(an)*r*0.8, y0=y+Math.sin(an)*r*0.8*0.24; g.beginPath(); g.moveTo(x0,y0); g.lineTo(x0+Math.cos(an)*r*0.12,y0+Math.sin(an)*r*0.12*0.24-(i%3)*2); g.stroke(); } g.restore(); }

  // ═════════ ĐÁ NỔI (đoạn vận sức) ═════════
  const ROCKS=Array.from({length:22},(_,i)=>{ const H=n=>hash(i*17+n), dep=H(3), r=i%ROCKBB.length; let x=0.04+0.92*H(2); if(dep>0.78&&Math.abs(x-0.5)<0.16) x=x<0.5?0.3-H(9)*0.2:0.7+H(9)*0.2;
    return {r, x, dep, gy:0.64+0.3*dep, sz:(0.05+0.11*H(4))*(0.45+1.0*dep), lift:0.18+0.5*H(5), dl:0.9*H(6), sp:0.8+0.6*H(7), rot:(H(8)-0.5)*0.9, ph:H(10)*TAU}; }).sort((a,b)=>a.dep-b.dep);
  function drawRock(F,R,t,t0){ const im=F.I.ZRK; if(!im||!im.naturalWidth) return; const g=F.g, b=ROCKBB[R.r], k=eio(clamp((t-t0-R.dl)/1.6,0,1)), h=VH*R.sz, w=h*b[2]/b[3], gy=VH*R.gy;
    const bl=t>T.burst?t-T.burst:0;   // (anh 16/11) băng nổ → đá BẬT MẠNH vọt lên khỏi khung
    const y=gy-VH*R.lift*k+Math.sin(t*R.sp*2+R.ph)*VH*0.006*k-VH*(1.4*bl+4*bl*bl)*(0.5+R.lift), x=VW*R.x+Math.sin(t*R.sp+R.ph)*VW*0.004*k+(R.x-0.5)*VW*bl*0.6;
    g.save(); g.globalAlpha=0.35*(1-0.6*k); g.fillStyle='#000'; g.beginPath(); g.ellipse(VW*R.x,gy,w*0.5,h*0.1,0,0,TAU); g.fill(); g.restore();
    g.save(); g.translate(x,y-h/2); g.rotate(R.rot*k+Math.sin(t*R.sp+R.ph)*0.04*k); if(R.dep>0.85) g.filter='blur(1.5px)'; g.drawImage(im,b[0],b[1],b[2],b[3],-w/2,-h/2,w,h); g.restore(); }
  function rockScene(F,t,o){ o=o||{}; const g=F.g, u=seg(t,T.wideD,T.burst), fr=Math.floor(t*10), cx=VW*0.5, gy=VH*0.8;
    bg(F,'ZBG',lerp(1.0,1.05,eio(u)),0.5,0.55);
    g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<7;i++){ const an=Math.PI*(0.08+0.84*i/6)+(hash(i+300)-0.5)*0.2; g.save(); g.translate(cx,gy); g.scale(1,0.28); zap(g,0,0,an+Math.PI,VW*(0.12+0.25*hash(i+310))*(0.3+0.7*eout(u)),2,i*7+1); g.restore(); } g.restore();   // nứt vàng toả từ chân
    for(const R of ROCKS) if(R.dep<=0.85) drawRock(F,R,t,T.wideD);
    if(o.noDoge){} else if(o.buff){ spr(F,'DB',cx,gy,VH*0.95,{glow:'#ffd860',glowA:0.9,tint:'#ffe9a0',tintA:0.28,shadow:false}); }   // trong cột sáng: Buff Doge (to ×3) rực trắng vàng
    else { const r=spr(F,'D0',cx,gy,VH*0.34,{glow:'#ffc23a',glowA:0.55+0.25*Math.sin(t*30)});
      const ic=K.prep(F.I.ZICE); if(ic&&r){ const ih=VH*0.34*1.25, iw=ih*ic.sw/ic.sh; g.save(); g.globalCompositeOperation='screen'; g.globalAlpha=0.85; g.drawImage(ic.src,ic.sx,ic.sy,ic.sw,ic.sh,cx-iw/2,gy-ih+VH*0.014,iw,ih); g.restore(); } }
    const nb=o.bolts==null?4:o.bolts; for(let i=0;i<nb;i++){ const sd=fr*13+i*7; if(hash(sd)<0.3) continue; zap(g,cx+(hash(sd+1)-0.5)*VW*0.9,gy-hash(sd+2)*VH*0.25,-Math.PI/2+(hash(sd+3)-0.5)*1.6,VH*(0.25+0.4*hash(sd+4)),3+3*hash(sd+5),sd); }
    for(const R of ROCKS) if(R.dep>0.85) drawRock(F,R,t,T.wideD); }

  // ═════════ CÁC SHOT (mỗi shot 1 góc tĩnh; [giây đầu, giây cuối, hàm vẽ]) ═════════
  const GY=VH*0.8, NM=VH*0.21;   // đất cảnh rộng · cao meme thường ở cảnh rộng
  const SHOTS=[
    // A1 công viên đêm yên lặng
    [0,1.8,(F,t,u)=>{ bg(F,'BPARK',lerp(1.0,1.04,u),0.5,0.55); fireflies(F.g,t,22); }],
    // A2 góc ngước trời: 2 cột Bifrost giáng xuống
    [1.8,3.6,(F,t,u)=>{ const g=F.g; bg(F,'BSKY',lerp(1.06,1.0,eout(u)),0.5,0.5);
      for(const [x,ts,col] of [[VW*0.42,T.strikeD,'255,210,80'],[VW*0.6,T.strikeK,'235,240,255']]){ const k=seg(t,ts-0.12,ts); if(k<=0) continue; pillar(g,x,-20,lerp(-20,VH+20,eout(k)),VW*0.045,col,1,t); if(t>=ts&&t<ts+0.5) ring(g,x,VH*0.86,VW*0.12*eout(seg(t,ts,ts+0.5)),0.8*(1-seg(t,ts,ts+0.5)),col,4); } }],
    // A3 toàn: Doge + Clapping hạ xuống trong cột sáng, bụi toé, vòng ký tự cháy
    [3.6,5.4,(F,t,u)=>{ const g=F.g; bg(F,'BPARK',1.08,0.5,0.6); const fade=1-seg(t,4.7,5.3);
      for(const [x,tl,col,key] of [[VW*0.42,T.landD,'255,210,80','D0'],[VW*0.6,T.landK,'235,240,255','K0']]){ pillar(g,x,-20,GY,VW*0.04,col,fade,t); rune(g,x,GY,VW*0.09,0.9*fade*seg(t,tl,tl+0.2),col);
        const yy=lerp(VH*0.3,GY,eout(seg(t,3.6,tl))); spr(F,key,x,yy,NM*HT[key],{glow:col==='255,210,80'?'#ffd060':'#e8f0ff',glowA:0.4*fade,shadowK:seg(t,tl-0.3,tl)}); dust(g,x,GY,seg(t,tl,tl+0.9),VW*0.1,'140,130,120',x|0); } }],
    // A4 trung: Doge nhìn quanh (lật mặt), Clapping đứng cạnh
    [5.4,6.8,(F,t,u)=>{ bg(F,'BPARK',1.6,0.5,0.66); const fl=(t>=5.85&&t<6.35); spr(F,"D0",VW*0.4,VH*0.92,VH*0.6*0.72,{flip:fl}); spr(F,'K0',VW*0.64,VH*0.92,VH*0.6); fireflies(F.g,t,8); }],
    // B1 bụi cây tối: 2 cặp mắt loé (Chud đỏ · Mlem vàng), tiếng xích rít
    [6.8,8.0,(F,t,u)=>{ const g=F.g; bg(F,'BTREE',lerp(1.0,1.06,u),0.5,0.5); g.fillStyle='rgba(0,0,0,0.35)'; g.fillRect(0,0,VW,VH);
      eyes(g,VW*0.34,VH*0.42,14,5,'255,40,30',seg(t,7.05,7.2)); eyes(g,VW*0.63,VH*0.55,11,4,'255,220,80',seg(t,7.4,7.55));
      if(t>7.2) chain(F,chainPts([VW*0.30,VH*0.5],[VW*0.27,VH*0.95],10,3,t),9,{hot:0.6}); }],
    // B2 trung Doge: 2 xích nung đỏ vụt từ bóng cây bên trái quấn chặt
    [8.0,9.2,(F,t,u)=>{ const g=F.g; bg(F,'BPARK',1.6,0.45,0.66); const x=VW*0.52, y=VH*0.92, h=VH*0.5, k=seg(t,T.bind-0.12,T.bind), jolt=t>=T.bind&&t<T.bind+0.2?Math.sin(t*90)*4:0;
      if(t>=T.bind) coil(F,x+jolt,y-h*0.42,h*0.42,h*0.1,10,false,t); spr(F,'D0',x+jolt,y,h);
      if(t>=T.bind-0.12){ for(const [yy,ty] of [[VH*0.3,y-h*0.55],[VH*0.75,y-h*0.3]]) chain(F,chainPts([-30,yy],[t<T.bind?lerp(-30,x,k):x-h*0.4,ty],t<T.bind?-20:8,t<T.bind?20:2,t,1),10,{}); }
      if(t>=T.bind) coil(F,x+jolt,y-h*0.42,h*0.42,h*0.1,10,true,t); sparks(g,x-h*0.4,y-h*0.45,T.bind,t,24,160,'255,140,60',41); }],
    // B3 cận Mlem trong bóng cây: lè lưỡi → lưỡi phóng ra liếm
    [9.2,9.75,(F,t,u)=>{ const g=F.g; bg(F,'BTREE',1.4,0.6,0.5); g.fillStyle='rgba(0,0,0,0.4)'; g.fillRect(0,0,VW,VH); spr(F,'MA',VW*0.38,VH*1.05,VH*1.0,{tint:'#ff3a3a',tintA:0.12});
      if(t>=T.lick-0.05){ const k=eout(seg(t,T.lick-0.05,T.lick+0.06)), x0=VW*0.42, y0=VH*0.62, x1=lerp(x0,VW*1.1,k); g.save(); g.fillStyle='#ff7aa8'; g.beginPath(); g.moveTo(x0,y0-12); g.quadraticCurveTo((x0+x1)/2,y0-30,x1,y0-4); g.lineTo(x1,y0+10); g.quadraticCurveTo((x0+x1)/2,y0+6,x0,y0+12); g.fill(); g.restore(); streak(g,x0,y0,x1,y0,14,'255,150,200','255,240,250',0.5); } }],
    // B4 trung: băng phủ dần Doge đang bị xích quấn
    [9.75,11.4,(F,t,u)=>{ const g=F.g; bg(F,'BPARK',1.6,0.45,0.66); const x=VW*0.52, y=VH*0.92, h=VH*0.5; coil(F,x,y-h*0.42,h*0.42,h*0.1,10,false,t); spr(F,'D0',x,y,h); coil(F,x,y-h*0.42,h*0.42,h*0.1,10,true,t);
      const ic=K.prep(F.I.ZICE), k=eout(seg(t,T.frz-0.1,T.frz+0.45)); if(ic&&k>0){ const ih=h*1.3, iw=ih*ic.sw/ic.sh; g.save(); g.beginPath(); g.rect(0,y-ih*k-4,VW,ih*k+10); g.clip(); g.globalCompositeOperation='screen'; g.globalAlpha=0.9; g.drawImage(ic.src,ic.sx,ic.sy,ic.sw,ic.sh,x-iw/2,y-ih+h*0.04,iw,ih); g.restore(); }
      if(t>=T.frz&&t<T.frz+0.1){ g.fillStyle='rgba(220,250,255,0.5)'; g.fillRect(0,0,VW,VH); } }],
    // C1 toàn: Chud + Mlem bước ra từ hàng cây, vây Clapping cạnh khối băng
    [11.4,13.6,(F,t,u)=>{ const g=F.g; bg(F,'BPARK',1.1,0.5,0.6); const x=VW*0.5, y=GY, h=NM*0.72; coil(F,x,y-h*0.42,h*0.42,h*0.1,4,false,t); spr(F,'D0',x,y,h); coil(F,x,y-h*0.42,h*0.42,h*0.1,4,true,t);
      const ic=K.prep(F.I.ZICE); if(ic){ const ih=h*1.3, iw=ih*ic.sw/ic.sh; g.save(); g.globalCompositeOperation='screen'; g.globalAlpha=0.9; g.drawImage(ic.src,ic.sx,ic.sy,ic.sw,ic.sh,x-iw/2,y-ih+h*0.04,iw,ih); g.restore(); }
      spr(F,'K0',VW*0.62,y,NM); const w=eout(seg(t,11.5,12.9)), bob=t<12.9?Math.abs(Math.sin(t*9))*-4:0;
      spr(F,'CK0',lerp(-VW*0.08,VW*0.24,w),y+bob,NM*HT.CK0,{dark:0.6*(1-w)}); spr(F,'M0',lerp(-VW*0.18,VW*0.34,w),y+bob*0.8,NM,{dark:0.6*(1-w)}); }],
    // C2 trung: Clapping cười vỗ tay liên tục
    [13.6,15.2,(F,t,u)=>{ bg(F,'BPARK',1.7,0.62,0.66); let i=0; for(const c of CLAPS) if(t>=c) i++; spr(F,['K3','K1','K2','K1','K2','K3'][i%6],VW*0.55,VH*0.98,VH*0.8); }],
    // C3 Chud + Mlem nhìn nhau khó hiểu
    [15.2,16.4,(F,t,u)=>{ bg(F,'BPARK',1.6,0.3,0.66); const turn=t>=15.55; spr(F,'CK0',VW*0.33,VH*0.98,VH*0.72,{flip:!turn}); spr(F,'M0',VW*0.66,VH*0.98,VH*0.62,{flip:turn}); }],
    // ── D VẬN SỨC (khuôn Zenitsu 0:43–0:48) ──
    [16.4,18.2,(F,t,u)=>{ const g=F.g, fr=Math.floor(t*10); bg(F,'ZBG',1.6,0.5,0.4,{alpha:0.35,blur:6});   // cực cận mặt Doge GỐC trong băng
      const c=K.prep(F.I.D0); if(c){ const k=lerp(1.0,1.12,eio(u)), h=VH*1.55*k, w=h*c.sw/c.sh; g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,VW*0.5-w*0.5,VH*0.62-h*0.42,w,h);
        const ic=K.prep(F.I.ZICE); if(ic){ const ih=VH*3.4*k, iw=ih*ic.sw/ic.sh; g.save(); g.globalCompositeOperation='screen'; g.globalAlpha=0.7; g.drawImage(ic.src,ic.sx,ic.sy,ic.sw,ic.sh,VW*0.5-iw/2,VH*0.55-ih*0.5,iw,ih); g.restore(); } }
      for(let i=0;i<3;i++){ const sd=fr*11+i*5; if(hash(sd)<0.35) continue; const an=hash(sd+1)*TAU, R=VH*(0.32+0.12*hash(sd+2)); zap(g,VW*0.5+Math.cos(an)*R*1.3,VH*0.45+Math.sin(an)*R,an+Math.PI*0.5+(hash(sd+3)-0.5),VH*(0.12+0.12*hash(sd+4)),2.5+2*hash(sd+5),sd); } }],
    [18.2,18.25,(F,t,u)=>{}],   // 1 khung đen
    [18.25,19.6,(F,t,u)=>rockScene(F,t,{bolts:4})],
    [19.6,20.9,(F,t,u)=>{ const g=F.g; bg(F,'ZBG',1.3,0.5,0.5,{alpha:0.5,blur:4});   // Chud GỐC cận mặt, ánh vàng hắt từ dưới
      const k=lerp(1.0,1.08,eio(u)); spr(F,'CK0',VW*0.5,VH*0.06+VH*3.4*k*0.98,VH*3.4*k,{tint:'#ffb830',tintA:0.35+0.12*Math.sin(t*35),shadow:false});
      g.save(); g.globalCompositeOperation='lighter'; const gr=g.createLinearGradient(0,VH,0,VH*0.3); gr.addColorStop(0,'rgba(255,190,60,0.45)'); gr.addColorStop(1,'rgba(255,190,60,0)'); g.fillStyle=gr; g.fillRect(0,0,VW,VH);
      for(let i=0;i<30;i++){ const x=((hash(i+700)*VW*1.4+t*VW*(0.6+hash(i+710)))%(VW*1.4))-VW*0.2, y=VH*hash(i+720); g.strokeStyle='rgba(255,220,140,'+(0.4*hash(i+730))+')'; g.lineWidth=1+hash(i+740)*2; g.beginPath(); g.moveTo(x,y); g.lineTo(x+20+40*hash(i+750),y-6); g.stroke(); } g.restore(); }],
    [20.9,21.65,(F,t,u)=>rockScene(F,t,{bolts:7})],
    [21.65,T.charge,(F,t,u)=>{ const g=F.g, z0=T.burst, cx=VW*0.5, gy=GY; rockScene(F,t,{bolts:8,buff:true});   // BĂNG NỔ: cột sáng vàng, Buff Doge (×3) rực trong cột
      const k=eout(seg(t,z0,z0+0.25))*(1-0.5*seg(t,T.quiet-0.5,T.quiet)), w=VW*0.13*k*(1+0.08*Math.sin(t*45)); g.save(); g.globalCompositeOperation='lighter';
      for(const [kk,al] of [[3.2,0.18],[1.6,0.4],[0.7,0.8],[0.28,1]]){ const gr=g.createLinearGradient(cx-w*kk,0,cx+w*kk,0); gr.addColorStop(0,'rgba(255,190,40,0)'); gr.addColorStop(0.5,'rgba(255,'+(kk<0.5?250:215)+','+(kk<0.5?225:90)+','+al+')'); gr.addColorStop(1,'rgba(255,190,40,0)'); g.fillStyle=gr; g.fillRect(cx-w*kk,-60,w*2*kk,gy+60); } g.restore();
      const sh=seg(t,z0,z0+0.8); if(sh<1) for(let i=0;i<16;i++){ const an=-Math.PI*(0.05+0.9*hash(i+500)), sp=VW*(0.25+0.55*hash(i+510)), px=cx+Math.cos(an)*sp*eout(sh), py=gy-VH*0.18+Math.sin(an)*sp*eout(sh)*0.8+sh*sh*VH*0.45, sz=VH*(0.025+0.05*hash(i+520));
        g.save(); g.globalAlpha=1-sh*sh; g.translate(px,py); g.rotate(sh*7*(hash(i+530)-0.5)+hash(i+535)*6); g.beginPath(); g.moveTo(0,-sz); g.lineTo(sz*(0.5+0.4*hash(i+540)),sz*0.6); g.lineTo(-sz*(0.4+0.4*hash(i+545)),sz*(0.3+0.5*hash(i+548))); g.closePath(); g.fillStyle='rgba(190,240,252,0.9)'; g.fill(); g.strokeStyle='#ffffff'; g.lineWidth=1.6; g.stroke(); g.restore(); } }],
    // D7 (anh 16/11) Buff Doge (One-Punch Shiba) LAO RA TỪ CỘT SÁNG thẳng về phía Chud (máy đặt ở chỗ Chud)
    [T.charge,T.glare,(F,t,u)=>{ const g=F.g, cx=VW*0.5; rockScene(F,t,{bolts:5,noDoge:true}); const w=VW*0.11*(1+0.08*Math.sin(t*45));
      g.save(); g.globalCompositeOperation='lighter'; for(const [kk,al] of [[3.2,0.18],[1.6,0.4],[0.7,0.8],[0.28,1]]){ const gr=g.createLinearGradient(cx-w*kk,0,cx+w*kk,0); gr.addColorStop(0,'rgba(255,190,40,0)'); gr.addColorStop(0.5,'rgba(255,'+(kk<0.5?250:215)+','+(kk<0.5?225:90)+','+al+')'); gr.addColorStop(1,'rgba(255,190,40,0)'); g.fillStyle=gr; g.fillRect(cx-w*kk,-60,w*2*kk,GY+60); }
      puff(g,cx,VH*0.55,VH*(0.25+0.5*u),0.6,'255,230,150'); g.restore();
      const k=ein(u), h=lerp(VH*0.3,VH*2.6,k*k); spr(F,'DZ',cx,VH*0.55+h*0.5,h,{ghost:[0,-h*0.07,3],shadow:false,glow:'#ffd860',glowA:0.5*(1-u)}); }],
    // cận Chud: ánh vàng ập tới trước mặt
    [T.glare,T.ram-0.3,(F,t,u)=>{ const g=F.g; bg(F,'BPARK',1.4,0.55,0.5,{alpha:0.6,blur:4}); const L=eio(u);
      spr(F,'CK0',VW*0.55,VH*0.06+VH*3.2*0.98,VH*3.2*lerp(1,1.05,u),{tint:'#ffc040',tintA:0.15+0.55*L,shadow:false});
      g.save(); g.globalCompositeOperation='lighter'; puff(g,-VW*0.05,VH*0.45,VW*(0.4+0.9*L),0.4+0.55*L,'255,215,120');
      for(let i=0;i<26;i++){ const x=((hash(i+600)*VW*1.4+t*VW*1.6)%(VW*1.4))-VW*0.2, y=VH*hash(i+610); g.strokeStyle='rgba(255,230,170,'+(0.5*L*hash(i+620))+')'; g.lineWidth=1.5; g.beginPath(); g.moveTo(x,y); g.lineTo(x+40,y-4); g.stroke(); } g.restore(); }],
    // E1 quảng trường: Chud đứng → vệt vàng xé ngang cuốn Chud bay khỏi khung
    [24.1,25.3,(F,t,u)=>{ const g=F.g; bg(F,'BPARK',1.0+0.03*u,0.5,0.62); const fx=VW*0.6, fy=VH*0.84, ch=VH*0.56, sy=fy-ch*0.5, t0=T.ram-0.07, t1=T.ram, t2=T.ram+0.3;
      const hx=t<t0?-VW*0.3:t<t1?lerp(-VW*0.2,fx,(t-t0)/(t1-t0)):lerp(fx,VW*1.5,ein(seg(t,t1,t2)));
      if(t<t1) spr(F,'CK0',fx,fy+Math.sin(t*7)*1.2,ch,{tint:t>=t0?'#ffc040':null,tintA:0.5*seg(t,t0,t1)});
      else if(hx<VW*1.3) spr(F,'CHF',hx-ch*0.15,fy-(hx-fx)*0.12,ch,{rot:0.9*seg(t,t1,t2),ghost:[ch*0.35,-6,3],shadow:false});
      if(t>=t0){ const fade=1-seg(t,t2,t2+0.7); streak(g,-VW*0.2,sy+3,Math.min(hx,VW*1.4),sy,VH*0.11*(1-0.5*seg(t,t2,t2+0.7)),'255,190,60','255,255,240',fade);
        g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<26;i++){ const yy=sy+(hash(i*7+3)-0.5)*VH*0.5, ln=VW*(0.1+0.25*hash(i*7+5)), xx=((hash(i*7+1)*VW*1.6+(t-t0)*VW*5)%(VW*1.6))-VW*0.3; g.strokeStyle='rgba(255,240,200,'+(0.5*fade*hash(i*7+9))+')'; g.lineWidth=1+2*hash(i*7+11); g.beginPath(); g.moveTo(xx,yy); g.lineTo(xx+ln,yy); g.stroke(); } g.restore(); }
      if(t>=t1){ dust(g,fx,fy,seg(t,t1,t1+1.0),VW*0.18,'130,110,110',77); sparks(g,fx,sy,t1,t,22,VW*0.4,'255,200,90',61); } }],
    // E2 toàn phố: vệt vàng xuyên 3 toà nhà, nổ nối tiếp
    [25.3,28.4,(F,t,u)=>{ const g=F.g; bg(F,'BCITY',lerp(1.0,1.03,u),0.5,0.5); const B=[[VW*0.315,VH*0.6],[VW*0.5,VH*0.58],[VW*0.675,VH*0.6]], hs=[T.h1,T.h2,T.h3];
      const hx=t<T.h1?lerp(-VW*0.1,B[0][0],seg(t,T.b1,T.h1)):t<T.h2?lerp(B[0][0],B[1][0],seg(t,T.h1,T.h2)):t<T.h3?lerp(B[1][0],B[2][0],seg(t,T.h2,T.h3)):lerp(B[2][0],VW*1.3,seg(t,T.h3,T.h3+0.3));
      const hy=VH*0.59; streak(g,-VW*0.1,hy,hx,hy,VH*0.035,'255,190,60','255,255,240',1-seg(t,T.h3+0.3,T.h3+1.4));
      for(let i=0;i<3;i++){ const [bx,by]=B[i], te=hs[i]; if(t<te) continue; const v=t-te; puff(g,bx,by,VH*(0.12+0.25*eout(Math.min(1,v/0.4))),Math.max(0,0.9-v*0.9),'255,170,60'); puff(g,bx,by,VH*0.08,Math.max(0,1-v*2.5),'255,250,220');
        for(let j=0;j<6;j++) puff(g,bx+(hash(i*10+j)-0.5)*VW*0.1,by-v*VH*0.12*(0.5+hash(i*10+j+5))-j*8,VH*(0.06+0.06*hash(i*10+j+7))*(1+v),Math.min(0.55,v*1.2)*(1-seg(t,te+2,te+4)),'70,60,62');
        rockFly(F,bx,by,te,t,8,VW*0.35,i*40+3,14); } }],
    // E3 thở: cột bụi bốc cao, nhà đổ rền
    [28.4,30.4,(F,t,u)=>{ const g=F.g; bg(F,'BCITY',lerp(1.03,1.0,u),0.5,0.5); for(let i=0;i<3;i++){ const bx=VW*[0.315,0.5,0.675][i]; for(let j=0;j<8;j++) puff(g,bx+(hash(i*10+j)-0.5)*VW*0.12,VH*0.5-(t-28.4+j*0.3)*VH*0.05-j*12,VH*(0.08+0.05*hash(i*10+j+3))*(1.5+u),0.5,'70,60,62'); } }],
    // E4 cận Clapping CHE MỒM nhìn theo
    [30.4,32.4,(F,t,u)=>{ bg(F,'ZBG',1.6,0.5,0.5,{blur:3}); spr(F,'K0',VW*0.5,VH*1.08,VH*0.98*lerp(1,1.05,u),{shadow:false,glow:'#ff4a4a',glowA:0.35}); }],
    // E5 cận Mlem chậm rãi quay sang Clapping
    [32.4,33.8,(F,t,u)=>{ bg(F,'ZBG',1.6,0.3,0.5,{blur:3}); const tt=seg(t,32.85,33.0); spr(F,'M0',VW*0.5,VH*1.06,VH*0.95,{glow:'#ff4a4a',glowA:0.3,flip:tt>0.5,sx:Math.abs(1-2*tt)*0.7+0.3,shadow:false}); }],
    // E6 Clapping quay lại GIƠ TAY như meme, 2 con đứng nhìn nhau
    [33.8,35.8,(F,t,u)=>{ bg(F,'ZBG',1.35,0.5,0.6); spr(F,t>=34.15?'KR':'K0',VW*0.36,VH*0.95,VH*0.6); spr(F,'M0',VW*0.66,VH*0.95,VH*0.55,{flip:true}); }],
    // ── F TRẬN CHÍNH: bãi đổ nát · Doge TRÁI (×3) · Chud PHẢI ──
    [35.8,36.8,(F,t,u)=>{ const g=F.g; bg(F,'BRUIN',1.05,0.5,0.55); const k=eout(seg(t,35.85,36.5)); spr(F,'DB',VW*0.3,GY+VH*0.25*(1-k),NM*HT.DB); spr(F,'CK0',VW*0.74,GY+VH*0.08*(1-k),NM*HT.CK0); dust(g,VW*0.3,GY,seg(t,35.85,36.8),VW*0.18,'120,105,100',5); dust(g,VW*0.74,GY,seg(t,35.95,36.8),VW*0.08,'120,105,100',9); }],
    [36.8,37.45,(F,t,u)=>{ bg(F,'BRUIN',1.9,0.74,0.62); const key=t<T.spin?'CN1':t<T.back?'CN2':t<T.release?'CN3':'CN4', h=VH*0.85, x=VW*0.5, y=VH*1.0;
      spr(F,key,x,y,h*HT[key]/1.17); for(let j=0;j<2;j++){ const p=handAt(key,x,y,h*HT[key]/1.17,false,j); chain(F,chainPts(p,[p[0]+(j?60:-60)+Math.sin(t*20+j)*30,VH*1.1],-20,10,t),12,{}); } }],
    [37.45,38.2,(F,t,u)=>netShot(F,t,{})],
    [38.2,38.7,(F,t,u)=>{ const g=F.g; bg(F,'BRUIN',1.5,0.3,0.6); const dash=seg(t,T.r1,T.r1+0.15), back=t>=T.l1?eout(seg(t,T.l1,T.l1+0.2)):0, x=VW*lerp(0.22,0.46,eout(dash))-back*VW*0.08;
      if(t<T.r1+0.15) streak(g,VW*0.05,VH*0.55,x,VH*0.55,VH*0.08,'255,200,90',null,0.8);
      spr(F,'DB',x,VH*1.12,VH*1.1,{rot:-back*0.08,ghost:t<T.r1+0.18?[VW*0.05,0,3]:null});
      if(t>=T.l1-0.08){ const k=eout(seg(t,T.l1-0.08,T.l1)); chain(F,chainPts([VW*0.6,-40],[lerp(VW*0.6,x+VW*0.05,k),lerp(-40,VH*0.4,k)],-30*(1-k),40*(1-k),t),11,{}); sparks(g,x+VW*0.05,VH*0.42,T.l1,t,30,200,'255,180,80',11); } }],
    [38.7,39.0,(F,t,u)=>{ const g=F.g; bg(F,'BRUIN',1.9,0.42,0.7); const pop=1+0.08*Math.sin(Math.PI*seg(t,T.l2,T.l2+0.2)); spr(F,'DB',VW*0.42,VH*1.12,VH*1.05*pop,{shadow:false});
      const k=seg(t,T.l2-0.06,T.l2), bk=seg(t,T.l2,T.l2+0.25); chain(F,chainPts([-40,VH*0.2],[lerp(-40,VW*0.62,k)+bk*VW*0.2,lerp(VH*0.2,VH*0.45,k)-bk*VH*0.5],-10,20*bk,t),12,{});
      if(t>=T.l2&&t<T.l2+0.1) puff(g,VW*0.62,VH*0.45,VH*0.25,0.8,'255,240,200'); sparks(g,VW*0.62,VH*0.45,T.l2,t,34,260,'255,200,90',13); }],
    [39.0,39.6,(F,t,u)=>{ const g=F.g; bg(F,'BRUIN',1.4,0.35,0.6); const k=eout(seg(t,T.l3,T.l3+0.35)), x=VW*lerp(0.42,0.2,k);
      spr(F,'DB',x,VH*1.0,VH*0.9,{rot:-0.28*Math.sin(Math.PI*Math.min(1,k*1.3))}); const kk=eout(seg(t,T.l3-0.08,T.l3)); chain(F,chainPts([VW*1.1,VH*0.3],[lerp(VW*1.1,x+VW*0.04,kk),VH*0.55],-20,30*(1-kk),t),11,{});
      sparks(g,x+VW*0.05,VH*0.55,T.l3,t,30,220,'255,160,70',17); dust(g,x,VH*0.98,seg(t,T.l3+0.1,T.l3+0.8),VW*0.12,'120,105,100',19); }],
    [39.6,40.45,(F,t,u)=>{ const g=F.g; bg(F,'BRUIN',1.05,0.5,0.55); netLines(F,t,0.6); const sw=seg(t,T.swing0,T.land-0.05);
      if(t<T.swing0+0.05) spr(F,'CK0',VW*0.74,GY,NM*HT.CK0); else if(t<T.land){ const x=lerp(VW*0.74,VW*0.9,sw), y=GY-Math.sin(Math.PI*sw)*VH*0.3; chain(F,chainPts([x,y-NM],[VW*0.86,VH*0.12],5,2,t),7,{}); spr(F,'CN7',x,y,NM*HT.CN7,{shadow:false}); streak(g,VW*0.74,GY-NM*0.5,x,y-NM*0.5,VH*0.03,'255,60,40',null,0.8); }
      else spr(F,'CN8',VW*0.9,GY,NM*HT.CN8);
      const pk=seg(t,T.punch-0.15,T.punch), dx=t<T.punch-0.15?VW*0.3:lerp(VW*0.3,VW*0.7,ein(pk)); if(t>=T.punch-0.15&&t<T.punch) streak(g,VW*0.3,GY-VH*0.3,dx,GY-VH*0.15,VH*0.07,'255,200,90',null,0.9);
      spr(F,'DB',dx,GY,NM*HT.DB,{rot:t>=T.punch?0.18:0,ghost:t>=T.punch-0.15&&t<T.punch?[VW*0.06,0,3]:null});
      if(t>=T.punch){ ring(g,VW*0.74,GY,VW*0.3*eout(seg(t,T.punch,T.punch+0.5)),0.8*(1-seg(t,T.punch,T.punch+0.5)),'255,220,170',4); rockFly(F,VW*0.74,GY,T.punch,t,12,VW*0.45,71,26); dust(g,VW*0.74,GY,seg(t,T.punch,T.punch+1.2),VW*0.22,'130,110,100',73); } }],
    [40.45,40.8,(F,t,u)=>{ const g=F.g; bg(F,'BRUIN',1.8,0.7,0.75); spr(F,'DB',VW*0.55,VH*1.3,VH*1.4,{rot:0.18,shadow:false}); rockFly(F,VW*0.5,VH*0.95,T.punch,t,10,VW*0.5,81,40); dust(g,VW*0.5,VH*0.95,seg(t,T.punch,T.punch+1.0),VW*0.4,'130,110,100',83); }],
    [40.8,42.4,(F,t,u)=>{ const g=F.g; bg(F,'BRUIN',1.25,0.42,0.58); netLines(F,t,0.5); let hit=-1; STORM.forEach((s,i)=>{ if(t>=s) hit=i; });
      const sink=seg(t,T.storm,T.down), x=VW*0.4, y=VH*0.95+sink*VH*0.12, j=hit>=0&&t<STORM[hit]+0.12?(hit%2?1:-1)*0.06:0;
      spr(F,'DB',x,y,VH*0.95,{rot:j+sink*0.1,sy:1-0.1*sink,gy:VH*0.95});
      const AN=[[VW*0.05,VH*0.05],[VW*0.95,VH*0.1],[VW*0.02,VH*0.6],[VW*0.98,VH*0.55],[VW*0.3,-30],[VW*0.75,-30]];
      STORM.forEach((s,i)=>{ if(t<s-0.08||t>s+0.25) return; const k=eout(seg(t,s-0.08,s)), bk=seg(t,s+0.05,s+0.25), tgt=[x+(hash(i+60)-0.5)*VW*0.15,y-VH*(0.3+0.4*hash(i+61))]; chain(F,chainPts(AN[i],[lerp(AN[i][0],tgt[0],k*(1-bk*0.8)),lerp(AN[i][1],tgt[1],k*(1-bk*0.8))],-20,25*(1-k),t),9,{}); sparks(g,tgt[0],tgt[1],s,t,20,160,'255,160,70',90+i); }); }],
    [42.4,43.7,(F,t,u)=>{ const g=F.g; bg(F,'BRUIN',1.3,0.55,0.6); netLines(F,t,0.4); const br=1+0.02*Math.sin(t*9); spr(F,'DB',VW*0.35,VH*1.07,VH*0.95*0.88,{rot:0.12,sy:br*0.92});
      const w=eio(seg(t,42.6,43.6)); spr(F,'CK0',lerp(VW*0.9,VW*0.72,w),VH*1.0+(w<1?Math.abs(Math.sin(t*7))*-3:0),VH*0.3*1.17,{flip:true}); }],
    [43.7,44.3,(F,t,u)=>{ const g=F.g; bg(F,'BRUIN',1.6,0.4,0.5,{alpha:0.5,blur:4}); spr(F,'DB',VW*0.5,VH*2.6,VH*2.5*lerp(1,1.06,u),{shadow:false});   // cực cận: mắt Doge loé
      const k=seg(t,43.85,43.95)*(1-seg(t,44.1,44.3)); g.save(); g.globalCompositeOperation='lighter'; puff(g,VW*0.47,VH*0.36,VH*0.07,0.9*k,'255,60,40'); puff(g,VW*0.535,VH*0.36,VH*0.07,0.9*k,'255,60,40'); g.restore(); }],
    [44.3,45.5,(F,t,u)=>{ const g=F.g, fr=Math.floor(t*10); bg(F,'BRUIN',1.25,0.4,0.55,{alpha:0.8}); for(let i=0;i<10;i++) puff(g,VW*0.4+(hash(i+30)-0.5)*VW*0.25,VH*0.9-hash(i+31)*VH*0.6-(t-44.3)*60,VH*(0.08+0.06*hash(i+32)),0.45,'20,12,18');   // HAKI: khí đen bốc, sét đỏ
      spr(F,'DH',VW*0.42,VH*0.95,VH*0.86,{glow:'#ff2a2a',glowA:0.35+0.2*Math.sin(t*25)}); for(let i=0;i<3;i++){ const sd=fr*17+i*3; if(hash(sd)<0.4) continue; zap(g,VW*0.4+(hash(sd+1)-0.5)*VW*0.35,VH*(0.3+0.5*hash(sd+2)),hash(sd+3)*TAU,VH*0.2,3,sd,'red'); } }],
    [45.5,46.9,(F,t,u)=>{ const g=F.g; bg(F,'BRUIN',1.05,0.5,0.55); const x=VW*0.3, y=GY, h=NM*HT.DH; if(t<T.snap){ const tr=Math.sin(t*60)*2; NET_A.forEach((a,i)=>chain(F,chainPts(a,[x+(hash(i+70)-0.5)*h*0.4,y-h*(0.3+0.4*hash(i+71))],3,tr,t),7,{hot:0.9})); }
      spr(F,'DH',x,y,h,{glow:'#ff2a2a',glowA:0.4}); spr(F,'CK0',VW*0.74,y,NM*HT.CK0,{flip:true});
      if(t>=T.snap){ const v=seg(t,T.snap,T.snap+0.9); ring(g,x,y-h*0.4,VW*0.9*eout(v),0.9*(1-v),'255,90,70',6); NET_A.forEach((a,i)=>{ for(let k=0;k<3;k++){ const m=[lerp(a[0],x,(k+0.5)/3),lerp(a[1],y-h*0.5,(k+0.5)/3)], an=Math.atan2(m[1]-(y-h*0.5),m[0]-x)+(hash(i*3+k)-0.5), d=v*VW*0.4*(0.5+hash(i*3+k+9)), c=[m[0]+Math.cos(an)*d,m[1]+Math.sin(an)*d+v*v*VH*0.4];
          chain(F,[[c[0]-20*Math.cos(an+v*6),c[1]-20*Math.sin(an+v*6)],[c[0]+20*Math.cos(an+v*6),c[1]+20*Math.sin(an+v*6)]],7,{hot:1-v}); } }); sparks(g,x,y-h*0.5,T.snap,t,60,VW*0.5,'255,150,60',111); } }],   // CẢ LƯỚI đứt tung
    [46.9,47.5,(F,t,u)=>{ const g=F.g; bg(F,'BRUIN',1.7,0.74,0.5,{alpha:0.6,blur:3}); spr(F,'CK0',VW*0.5,VH*0.06+VH*3.0,VH*3.0,{shadow:false,flip:true});
      g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<24;i++){ const x=((hash(i+800)*VW*1.4-t*VW*1.2)%(VW*1.4)+VW*1.4)%(VW*1.4)-VW*0.2, y=VH*hash(i+810); g.strokeStyle='rgba(255,200,180,'+(0.35*hash(i+820))+')'; g.lineWidth=1.5; g.beginPath(); g.moveTo(x,y); g.lineTo(x-50,y+4); g.stroke(); } g.restore(); }],
    [47.5,48.6,(F,t,u)=>{ const g=F.g; bg(F,'BRUIN',1.05,0.5,0.55); const k=ein(seg(t,T.clash-0.3,T.clash)), cx=VW*0.55, cy=VH*0.6;
      if(t<T.clash-0.3){ spr(F,'DH',VW*0.3,GY,NM*HT.DH*lerp(1,0.97,u),{glow:'#ff2a2a',glowA:0.3}); spr(F,'CK0',VW*0.74,GY,NM*HT.CK0,{flip:true}); }
      else if(t<T.clash){ streak(g,VW*0.1,cy,lerp(VW*0.3,cx,k),cy,VH*0.09,'255,190,70',null,1); streak(g,VW*0.95,cy,lerp(VW*0.74,cx,k),cy,VH*0.05,'255,60,40',null,1); }
      else { const v=seg(t,T.clash,T.clash+0.4); puff(g,cx,cy,VH*0.6*eout(v),0.9*(1-v),'255,230,190'); ring(g,cx,cy+VH*0.1,VW*0.6*eout(v),0.9*(1-v),'255,220,170',5); sparks(g,cx,cy,T.clash,t,60,VW*0.4,'255,200,120',121);
        spr(F,'DH',cx-VW*0.12,cy+VH*0.45,VH*0.85,{shadow:false}); spr(F,'CK2',cx+VW*0.2,cy+VH*0.22,NM*HT.CK2*1.3,{shadow:false,flip:true}); } }],
    [48.6,49.35,(F,t,u)=>{ const g=F.g; bg(F,'BRUIN',1.1,0.6,0.5); const cx=VW*0.5, cy=VH*0.58, dr=u*6; spr(F,'DH',cx-VW*0.12-dr,cy+VH*0.45,VH*0.85,{shadow:false}); spr(F,'CK2',cx+VW*0.2+dr,cy+VH*0.22,NM*HT.CK2*1.3,{shadow:false,flip:true});
      const k=seg(t,48.85,49.0)*(1-0.4*seg(t,49.0,49.35)); g.save(); g.globalCompositeOperation='lighter'; puff(g,VW*1.0,VH*0.42,VH*0.7,0.8*k,'190,90,255'); puff(g,VW*1.0,VH*0.42,VH*0.25,k,'255,235,255'); g.restore(); }],   // chân trời loé tím
    [49.35,49.55,(F,t,u)=>{ bg(F,'BRUIN',1.2,lerp(0.6,0.9,u),0.5,{blur:6*u}); }],
    [49.55,50.5,(F,t,u)=>{ const g=F.g; bg(F,'BRUIN',1.4,0.9,0.5,{blur:8}); g.save(); g.globalCompositeOperation='lighter'; puff(g,VW*0.5,VH*0.5,VH*0.9,0.6,'170,80,255'); g.restore(); }]];
  // lưới xích: điểm cắm trên nền đổ nát (cột / tường / đất) — đặt theo ảnh FIN_F1_BG_RUIN
  const NET_A=[[VW*0.024,VH*0.205],[VW*0.128,VH*0.235],[VW*0.03,VH*0.62],[VW*0.25,VH*0.92],[VW*0.5,VH*0.95],[VW*0.795,VH*0.32],[VW*0.976,VH*0.117],[VW*0.97,VH*0.6]];
  const NET_X=[[0,1],[1,5],[5,6],[6,7],[2,0],[3,4],[0,5],[2,3]];
  function netLines(F,t,a){ NET_A.forEach((p,i)=>chain(F,chainPts([VW*0.74,GY-NM*0.6],p,10,1.5,t),9,{hot:a})); NET_X.forEach(([p,q])=>chain(F,chainPts(NET_A[p],NET_A[q],18,1,t),8,{hot:a})); }
  function netShot(F,t){ const g=F.g; bg(F,'BRUIN',1.05,0.5,0.55); spr(F,'DB',VW*0.3,GY,NM*HT.DB); const h=NM*HT.CN4; spr(F,'CN4',VW*0.74,GY,h); const hd=[handAt('CN4',VW*0.74,GY,h,false,0),handAt('CN4',VW*0.74,GY,h,false,1)];
    NET_A.forEach((p,i)=>{ const k=clamp((t-T.release-0.04*i)/0.3,0,1); if(k<=0) return; const s=hd[i%2]; chain(F,chainPts(s,p,k<1?-50*(1-k):12,k<1?30*(1-k):2,t,k),10,{}); if(k>=1) sparks(g,p[0],p[1],T.release+0.04*i+0.3,t,14,120,'255,150,70',300+i); });
    if(t>=T.netDone) NET_X.forEach(([p,q],i)=>chain(F,chainPts(NET_A[p],NET_A[q],18,1,t,seg(t,T.netDone+0.03*i,T.netDone+0.03*i+0.25)),8,{})); }

  // ═════════ KHAI BÁO PHIM ═════════
  const S=(t0,t1)=>({t0,t1,a:{tx:0,ty:100,tz:0,dist:600,yaw:0,pitch:0,fov:50},ease:'lin'});
  const shots=SHOTS.map(s=>S(s[0],s[1]));
  function plates(F,t){ window.__f1I=F.I; const s=SHOTS.find(q=>t>=q[0]&&t<q[1])||SHOTS[SHOTS.length-1];
    F.list.push({d:-1e9, fn:()=>{ const g=F.g; g.save(); g.fillStyle='#000'; g.fillRect(-60,-60,VW+120,VH+120); s[2](F,t,seg(t,s[0],s[1])); g.restore(); }}); }
  // ⏱️ (anh 16/11: "không biết lúc nào nên nhanh nên chậm") NHỊP NHANH – CHẬM ĐAN XEN — [giây gốc a, b, hệ số]: >1 = chậm lại (tích tụ / căng / thở sau cú lớn), <1 = nhanh (bùng nổ)
  const RETIME=[[0,1.8,0.85],[1.8,2.2,0.6],[2.2,2.7,1],[2.7,3.6,0.7],[3.6,5.4,0.9],[5.4,6.8,0.85],[6.8,8.0,1],[8.0,8.3,0.6],[8.3,9.2,1],[9.2,9.75,0.8],[9.75,11.4,1.1],
    [11.4,13.6,1.0],[13.6,15.2,0.9],[15.2,16.4,1],[16.4,18.2,1.1],[18.2,19.6,1],[19.6,20.9,0.9],[20.9,21.65,0.8],[21.65,22.6,0.75],[22.6,23.3,0.6],[23.3,24.1,1],
    [24.1,24.45,0.7],[24.45,25.3,1.2],[25.3,28.4,1],[28.4,30.4,0.7],[30.4,35.8,0.85],[35.8,36.8,1.2],[36.8,37.45,1.1],[37.45,38.2,0.9],[38.2,39.0,0.75],[39.0,39.6,1.0],[39.6,40.45,0.8],[40.45,40.8,1.75],
    [40.8,42.4,0.75],[42.4,43.7,1.3],[43.7,44.3,1.3],[44.3,45.5,1],[45.5,46.2,1.1],[46.2,46.9,0.9],[46.9,47.5,1.2],[47.5,48.2,0.6],[48.2,48.6,1.2],[48.6,49.35,1.3],[49.35,50.5,0.8]];
  const film=def=>CineKit.film(window.Fin1Fight&&Fin1Fight.retime?Fin1Fight.retime(RETIME,def):def);
  film({ id:'fin1f1', title:'Final 1 · Fight · Chud + Mlem vs Doge + Clapping Cat', DUR:T.DUR, VW, VH, fadeIn:false, fadeOut:false,
    imgs:IMG, cast:['dc','mlem','clap'],
    sfxOk:{ clap_cat:'Clapping cười vỗ tay liên tục: mỗi lần vỗ 1 tiếng (game)', dc_chain:'mỗi nhát xích quất trúng 1 tiếng (game)' },
    sfx:[[T.strikeD,'cine_impact',0.8,null,'cột Bifrost vàng giáng thẳng từ trời xuống công viên'],
      [T.strikeK,'cine_impact',0.65,null,'+ cột Bifrost trắng giáng xuống ngay sau, cạnh cột vàng'],
      [T.landD-0.65,'l2p_riser',0.45,null,'Doge từ từ hạ xuống trong cột sáng'],
      [T.landD,'se_quake',0.65,null,'Doge đáp đất, bụi toé, vòng ký tự cháy trên sân'],
      [T.landK,'se_step_in',0.7,null,'Clapping đáp đất, bụi toé vòng'],
      [T.lurk+0.3,'l2p_sub',0.4,null,'trong bụi cây tối: 2 cặp mắt loé (Chud đỏ, Mlem vàng)'],
      [T.bind-0.15,'ep3_chain',0.9,null,'2 sợi xích nung đỏ từ bóng tối quấn chặt quanh người Doge'],
      [T.lick-0.1,'mlem_lick',0.9,null,'Mlem phóng lưỡi từ bụi cây liếm trúng Doge'],
      [T.frz,'mlem_freeze',1,null,'Doge bị đóng băng cứng cả người (vẫn bị xích quấn)'],
      [T.out,'se_gogogo',0.35,2.2,'Chud + Mlem bước ra từ hàng cây (sức ép gogogo)'],
      ...CLAPS.map((s,i)=>[s,'clap_cat',0.75,null,(i?'+ ':'')+'Clapping cười, vỗ tay']),
      [T.shake+0.3,'bc_zap',0.35,null,'cực cận Doge trong băng: sét vàng lách tách quanh đầu'],
      [T.crack,'l2p_crack',0.5,null,'+ khối băng rạn dần (lớp của tiếng tim đập)'],
      [T.imp1,'kn_boom_low',0.7,null,'khung đen: cú nện trầm'],[T.wideD,'thunder_big',0.6,null,'+ góc rộng: sét vàng giáng khắp nơi, đất vỡ đá nổi lên (lớp của cú nện)'],
      [T.wideD+0.1,'se_tremor',0.5,null,'+ đất rung, tảng đá tách lên (lớp đuôi của sét)'],
      [T.burst-1.3,'ed_hit3',0.8,null,'cận Chud hoảng dưới ánh vàng → tụ lực dâng lên (đỉnh đúng lúc cột sáng nổ)'],[T.zImp,'ed_hit5',0.6,null,'+ lớp bùng sáng trước khi khối băng nổ (lớp đầu của cú nổ băng)'],
      [T.burst,'duo_ice_break',1,null,'khối băng NỔ tung, mảnh băng văng, cột sáng vàng xé trời'],[T.burst+0.01,'kn_boom_low',0.6,null,'+ lớp trầm: Buff Doge bùng ra khổng lồ'],
      [T.charge,'se_machdash',0.9,null,'Buff Doge (One-Punch Shiba) lao thẳng về màn hình'],
      [T.ram,'se_super_hit',1,null,'vệt vàng húc trúng Chud, cuốn Chud bay khỏi khung'],[T.ram+0.01,'kn_punch_heavy',0.6,null,'+ lớp trầm của cú húc'],
      [T.h1,'se_wall_break',0.9,null,'vệt sáng đâm xuyên toà nhà thứ nhất, nổ tung'],[T.h2,'se_rock_break',0.75,null,'xuyên toà nhà thứ hai, nổ tung'],[T.h3,'se_collapse',0.8,null,'xuyên toà nhà thứ ba, nổ tung'],
      [T.dust+0.2,'se_collapse_b',0.6,null,'cột bụi bốc cao, nhà đổ rền'],
      [T.mturn+0.4,'l2p_sub',0.35,null,'Mlem chậm rãi quay sang Clapping'],[T.raise+0.3,'ep3_shine',0.45,null,'Clapping giơ tay như meme'],
      [T.rise+0.1,'se_rock_break',0.45,null,'đá vụn lăn xuống, Buff Doge + Chud đứng dậy giữa đống đổ nát'],
      [T.spin,'ep3_whoosh',0.55,null,'Chud xoay người vung 2 xích'],[T.release,'l2p_chains',1,null,'THIÊN LA ĐỊA VÕNG: 2 xích bủa ra mọi hướng, rít xé gió'],[T.release+0.34,'ep3_klunk',0.6,null,'+ đầu xích cắm phập vào cột, tường, mặt đất (lớp của tiếng xích bủa)'],
      [T.r1,'se_step_in',0.6,null,'+ Buff Doge đạp đất lao vào lưới (lớp đầu của roi thứ nhất)'],[T.l1,'dc_chain',0.9,null,'roi xích thứ nhất quất xuống, Doge đỡ bằng tay'],[T.l2,'se_punch_high',0.8,null,'+ Doge đấm gạt roi thứ hai (lớp của tràng roi)'],
      [T.l3,'kn_punch_heavy',0.9,null,'roi thứ ba quất trúng Doge, văng'],[T.l3+0.15,'se_pushback',0.6,null,'+ Doge bị hất trượt trên đất (lớp đuôi của roi thứ ba)'],
      [T.swing0+0.05,'l2p_whoosh',0.6,null,'Chud đu trên lưới xích vụt qua như nhện'],[T.punch,'se_punch_heavy',1,null,'Doge lao tới đấm nện mặt đất chỗ Chud vừa rời'],[T.punch+0.01,'kn_boom_low',0.6,null,'+ lớp trầm: mặt đất vỡ bùng thành hố'],
      ...STORM.map((s,i)=>[s,'dc_chain',i%2?0.7:0.85,null,(i?'+ ':'')+'lưới siết: roi xích quất dồn dập từ mọi phía vào Doge']),
      [T.storm+1.2,'se_quake',0.5,null,'+ Doge khuỵu gối xuống (lớp cuối của tràng roi)'],
      [T.haki,'ep3_shine',0.5,null,'cực cận: mắt Doge loé đỏ'],[T.hakiOn,'cine_haki',0.9,null,'HAKI thức tỉnh: khí đen bốc, sét đỏ, trận đứng hình'],
      [T.pull+0.2,'l2p_riser',0.45,null,'mọi sợi xích căng rung siết vào Doge'],
      [T.snap,'kn_explode_crunch',0.9,null,'Doge bùng Haki giật tan cả lưới xích, mắt xích văng khắp nơi'],[T.shock+0.2,'l2p_sub',0.4,null,'+ cận Chud sững người (lớp đuôi của tiếng xích đứt)'],
      [T.clash-0.3,'se_machdash',0.85,null,'2 con hoá 2 vệt lao vào nhau'],[T.clash,'se_impact_stop',1,null,'nắm đấm haki đụng Chud giữa đường: va chạm, khựng'],[T.clash+0.01,'ed_hit5',0.55,null,'+ lớp edit: impact bùng lúc 2 con va nhau'],
      [T.far+0.25,'l2p_explode',0.7,null,'chân trời loé tím (trận Gojo vs Pain)'],[T.whip,'l2p_whoosh',0.7,null,'máy quay ngoắt về phía ánh tím'],[T.tunnel,'l2p_riser',0.7,null,'lao đi theo ánh tím']],
    mus:[{src:'assets/audio/cine_heart.mp3',ra:T.shake,rb:T.imp1,off:0,vol:0.55,fi:0.1,fo:0.15},{src:'assets/audio/mus_kusari.m4a',ra:T.rise-0.4,rb:T.haki-0.3,off:24,vol:0.22,fi:0.1,fo:0.3},{src:'assets/audio/mus_overtaken.m4a',ra:T.haki,rb:T.DUR,off:0.3,vol:0.5,fi:0.2,fo:0.8}],
    shots,
    impact:t=>{ const E=K.edit; return E.first(E.impacts(t,T.ram,3,[['#000000','#ffd84a']],3),E.impacts(t,T.punch,3,[['#000000','#ffd84a']],3),E.impacts(t,T.snap,6,[['#000000','#ff3a2a'],['#ff3a2a','#000000']],3),E.impacts(t,T.clash,6,[['#000000','#ff3a2a'],['#ffffff','#000000']],3)); },
    grade:t=>{ const E=K.edit; return E.mix(E.burn(t,T.zImp+0.2,T.burst,0.05),E.rgb(t,T.burst+0.05,0.6,10),E.rgb(t,T.wideD,0.25,8),E.rgb(t,T.ram+0.27,0.8,12),E.duotone(t,T.hakiOn,T.pull,'#200000','#ff4a3a',0.15,0.6),E.rgb(t,T.snap+0.2,0.7,12),E.zoom(t,T.clash-0.3,0.2,0.4),E.rgb(t,T.clash+0.2,0.6,14)); },
    shake:t=>{ let s=0; const h=(a,amp,d)=>{ if(t>=a&&t<a+d) s=Math.max(s,amp*(1-(t-a)/d)); };
      if(t>=T.shake&&t<T.burst) s=Math.max(s,1.5+2.5*seg(t,T.shake,T.quiet)); if(t>=T.wideD&&t<T.blk) s=Math.max(s,2+3*seg(t,T.wideD,T.blk));
      h(T.strikeD,8,0.5); h(T.strikeK,6,0.4); h(T.landD,6,0.4); h(T.landK,4,0.3); h(T.bind,4,0.3); h(T.frz,4,0.4); h(T.imp1,10,0.3); h(T.burst,16,0.8); h(T.ram,18,0.8); h(T.h1,8,0.6); h(T.h2,8,0.6); h(T.h3,8,0.6);
      h(T.release+0.3,6,0.4); h(T.l1,6,0.3); h(T.l3,10,0.4); h(T.punch,20,0.9); for(const x of STORM) h(x,6,0.25); h(T.hakiOn,5,1.0); h(T.snap,12,0.5); h(T.clash,14,0.5); h(T.far+0.25,5,0.8); return s; },
    world:(F,t)=>plates(F,t),
    screen(F,t){
      if(t>=T.charge&&t<T.glare) K.speedLines(F,{k:0.6,n:70,r0:0.25});
      if(t>=T.clash-0.3&&t<T.clash) K.speedLines(F,{k:0.5,n:60,r0:0.4});
      if(t>=T.strikeD&&t<T.strikeD+0.06) K.flash(F,0.4,'#fff4c8'); if(t>=T.strikeK&&t<T.strikeK+0.06) K.flash(F,0.3,'#ffffff');
      if(t>=T.ram&&t<T.ram+0.05) K.flash(F,0.35,'#fff1d6'); if(t>=T.clash&&t<T.clash+0.05) K.flash(F,0.4,'#fff1e0'); if(t>=T.burst&&t<T.burst+0.05) K.flash(F,0.4,'#fff6d8');
      if(t>=T.hakiOn&&t<T.hakiOn+1.0){ const g=F.g; g.save(); g.globalCompositeOperation='multiply'; g.fillStyle='rgba(150,140,160,'+(0.5*(1-seg(t,T.hakiOn+0.7,T.hakiOn+1.0)))+')'; g.fillRect(0,0,F.VW,F.VH); g.restore(); }
      if(C){ C.whipFx(F,t,T.whip,T.tunnel-T.whip); C.speedTunnel(F,t,T.tunnel,T.DUR-T.tunnel); }
      K.letterbox(F,t>=T.lurk&&t<T.bind-0.4?0.7:0);
      K.vignette(F,t>=T.lurk&&t<T.bind-0.4?0.8:0.5); } });
})();
