// 🌌 Meme Lore · FINAL · Part 1 — CẢNH 5 (cảnh nối, anh viết 11/11/2026): từ nóc nhà (fin1c3) dẫn vào chuỗi trận phụ.
//   Nói chuyện trên mái xong → MÀU TRỞ VỀ → Depressed NGẨNG ĐẦU, thấy DẤU VÔ HẠN trên trời → lên VŨ TRỤ: cả hành tinh bị dấu ∞ cố định nằm ngang, bọc trong CỘT SÁNG
//   phong ấn → Depressed: "Here comes the first avatar… it has sniffed out a threat to the universe." → hiệu ứng XOAY của Bread Cat + trời CHỚP SÁNG TỐI →
//   CỘT SÁNG giáng xuống khắp thành phố (các GUARDIAN của meme multiverse) → Depressed NHẢY THẲNG LÊN TRỜI lao về cột sáng TÍM CAO NHẤT, vừa bay vừa nói
//   "Let's go. Stop the guardians of the meme multiverse… buy Friend more time to absorb." → BÙM → trận đầu tiên (fin1f2 Bat vs Pop + Huh, anh đổi 12/11) và nối tiếp các trận.
//   Dựng 2D (960×540) kiểu các cảnh truyện của Final. Ảnh vẽ GPT: FIN_DP_LOOKUP (ngẩng nhìn trời), FIN_SPACE_SEAL (hành tinh bị phong ấn).
(function(){
  if(!window.CineKit || CineKit.films.fin1c5) return;
  const K=CineKit, {seg,lerp,clamp,hash}=K, E=K.EASE, eout=E.eout, ein=E.ein, eio=E.eio, TAU=Math.PI*2;
  const VW=960, VH=540;
  const T={ col:0, look:0.6, sky:2.4, space:4.0, talk:8.0, spin:11.6, pil:13.6, crouch:15.4, launch:16.6, fly:17.3, fly2:19.5, boom:21.1, DUR:21.7 };   // 12/11: ảnh nhóm → ngẩng nhìn trời ~2s (anh dặn) · cảnh lao đi làm lại theo anime
  T.leap=T.crouch;
  const IMG={ pose:'assets/img/cine/FIN_AKA_POSE.png', dCr:'assets/img/cine/FIN_DP_CROUCH.png', dFl:'assets/img/cine/FIN_DP_FLY.png', bgR:'assets/img/cine/FIN_BG_RED.webp', dpL:'assets/img/cine/FIN_DP_LOOKUP.png', dp:'assets/img/depressedcat/DP_PAIN_IMG.webp',
    P6:'assets/img/cine/FIN_P6.png', spin:'assets/img/breadcat/BC_SPIN.png', space:'assets/img/cine/FIN_SPACE_SEAL.png' };
  let I={};
  const ok=k=>{ const im=I[k]; return im&&im.complete&&im.naturalWidth; };
  const cam=(g,x,y,z,r)=>{ g.translate(VW/2,VH/2); if(r) g.rotate(r); g.scale(z,z); g.translate(-x,-y); };
  const cover=(g,im,a)=>{ if(!im||!im.naturalWidth) return; const s=Math.max(VW/im.naturalWidth,VH/im.naturalHeight)*(a||1), w=im.naturalWidth*s, h=im.naturalHeight*s; g.drawImage(im,(VW-w)/2,(VH-h)/2,w,h); };
  const pic=(g,k,x,y,h,o)=>{ o=o||{}; const key=ok(k)?k:o.alt; if(!key||!ok(key)) return; const im=I[key], w=h*im.naturalWidth/im.naturalHeight; g.save(); g.translate(x,y); if(o.flip) g.scale(-1,1); if(o.rot) g.rotate(o.rot); g.globalAlpha=o.a==null?1:o.a; g.drawImage(im,-w*(o.ax==null?0.5:o.ax),-h*(o.ay==null?1:o.ay),w,h); g.restore(); };
  const blob=(g,x,y,r,col,a)=>{ if(a<=0.005||r<=0.5) return; const gr=g.createRadialGradient(x,y,0,x,y,r); gr.addColorStop(0,`rgba(${col},${a})`); gr.addColorStop(1,`rgba(${col},0)`); g.fillStyle=gr; g.fillRect(x-r,y-r,2*r,2*r); };
  // trời đêm trên mái (phông trăng máu, chỉ phần trời) + sao
  function nightSky(g,t,dark){ g.save(); cover(g,I.bgR); g.fillStyle=`rgba(6,2,8,${dark})`; g.fillRect(0,0,VW,VH); g.restore(); }
  // DẤU VÔ HẠN ∞ (lemniscate) vẽ dần, vàng trắng phát sáng — k = tiến độ vẽ 0..1, a = độ hiện
  function infinity(g,cx,cy,A,k,a,t){ if(a<=0.01) return; const N=160, n=Math.max(2,Math.floor(N*k)), P=[];
    for(let i=0;i<=n;i++){ const s=i/N*TAU-Math.PI/2, d=1+Math.sin(s)**2; P.push([cx+A*Math.cos(s)/d, cy+A*Math.sin(s)*Math.cos(s)/d*0.9]); }
    g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round'; g.lineJoin='round';
    for(const [w,col,al] of [[A*0.16,'255,200,90',0.18],[A*0.07,'255,226,150',0.45],[A*0.025,'255,255,240',1]]){ g.strokeStyle=`rgba(${col},${al*a*(0.85+0.15*Math.sin(t*6))})`; g.lineWidth=w; g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); }
    if(k<1){ const q=P[P.length-1]; blob(g,q[0],q[1],A*0.25,'255,240,200',0.9*a); }
    g.restore(); }
  // CỘT SÁNG giáng xuống: đầu cột lao từ trên trời xuống trong 0.25s, chạm đất loé + vòng sóng, rồi đứng lung linh
  function pillar(g,t,t0,x,yG,w,col,o){ o=o||{}; const u=t-t0; if(u<0) return; const head=lerp(-60,yG,eout(Math.min(1,u/0.25))), top=o.top==null?-80:o.top;
    g.save(); g.globalCompositeOperation='lighter';
    const gr=g.createLinearGradient(0,top,0,head); gr.addColorStop(0,`rgba(${col},0)`); gr.addColorStop(0.25,`rgba(${col},0.55)`); gr.addColorStop(1,`rgba(${col},0.9)`);
    const sh=1+0.12*Math.sin(t*20+x); g.fillStyle=gr; g.fillRect(x-w*1.6*sh,top,w*3.2*sh,head-top); g.fillStyle=`rgba(255,255,255,${0.85})`; g.fillRect(x-w*0.35,top,w*0.7,head-top);
    blob(g,x,(top+head)/2,w*6,col,0.12);
    if(u>=0.25){ const v=u-0.25; blob(g,x,yG,w*(8+6*Math.min(1,v*3)),col,0.7*Math.max(0.35,1-v)); g.strokeStyle=`rgba(${col},${Math.max(0,0.8-v)})`; g.lineWidth=3; g.beginPath(); g.ellipse(x,yG,w*4+v*260,(w*4+v*260)*0.18,0,0,TAU); g.stroke(); }
    g.restore(); }
  // Bread Cat XOAY 3D (sprite 48 góc của game, lưới 8 cột ô 256px) + trời chớp sáng tối, vòng sáng 2 bên, mưa tia lửa, hắt xanh (theo hiệu ứng nghịch lý mèo bơ trong game)
  function breadSpin(g,t,cx,cy,S,k){ if(!ok('spin')) return; const fr=Math.floor((t*48)%48), col=fr%8, row=Math.floor(fr/8);
    g.save(); g.globalCompositeOperation='lighter'; blob(g,cx,cy,S*2.2,'120,180,255',0.35*k); for(const sd of [-1,1]){ g.strokeStyle=`rgba(200,230,255,${0.7*k})`; g.lineWidth=4; g.beginPath(); g.ellipse(cx+sd*S*0.95,cy,S*0.25,S*0.7,0,0,TAU); g.stroke(); } g.restore();
    g.save(); g.globalAlpha=k; g.drawImage(I.spin,col*256,row*256,256,256,cx-S/2,cy-S/2,S,S); g.restore();
    g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<40;i++){ const ph=(t*1.3+hash(i*3.1))%1, x=cx+(hash(i*5.7)-0.5)*S*3, y=cy-S*0.4+ph*VH*0.9; g.fillStyle=`rgba(255,${200+40*hash(i)},140,${0.8*(1-ph)*k})`; g.fillRect(x,y,2,8+10*hash(i*2.2)); } g.restore(); }
  // phụ đề: tên người nói + chữ hiện từng từ (kiểu thoại trên mái)
  const LINES=[[8.2,9.85,'Here comes the first avatar…'],[9.95,11.5,'Looks like it has sniffed out a threat to the universe.'],
    [15.5,17.2,"Let's go. Stop the guardians of the meme multiverse…"],[17.6,19.4,'…and buy Friend more time to absorb.']];
  function subs(g,t){ const L=LINES.find(l=>t>=l[0]-0.15&&t<l[1]+0.15); if(!L) return; const [a,b,line]=L, e=Math.min(b,a+line.split(' ').length*0.12+1.6), al=seg(t,a-0.15,a)*(1-seg(t,e,e+0.25)); if(al<=0) return;   // 12/11: chữ chạy 0.12s/chữ, hết câu giữ 1.6s
    g.save(); g.textAlign='center'; g.textBaseline='middle'; g.globalAlpha=al; g.font='800 12px "Segoe UI",Arial,sans-serif'; g.letterSpacing='4px'; g.fillStyle='rgb(190,150,255)'; g.shadowColor='rgba(190,150,255,0.9)'; g.shadowBlur=10; g.fillText('DEPRESSED CAT',VW/2,VH-78);
    g.shadowBlur=0; g.letterSpacing='1px'; g.font='italic 600 21px Georgia,"Times New Roman",serif'; const ws=line.split(' '), n=Math.min(ws.length,Math.floor(Math.max(0,t-a)/0.12)+1); g.fillStyle='#f4ecff'; g.fillText(ws.slice(0,n).join(' '),VW/2,VH-52); g.restore(); }
  const PILS=[[13.65,150,'255,214,90',7],[13.85,800,'255,255,255',6],[14.0,300,'235,90,160',6],[14.15,670,'200,205,215',6],[14.3,90,'235,40,40',7],[14.55,480,'190,110,255',13]];   // Doge vàng · Clapping trắng · Huh hồng · Pop bạc · Berserk đỏ · Gojo TÍM cao nhất
  // 5 thành viên trên ẢNH NHÓM (FIN_AKA_POSE vẽ ở 480,560 cao 500): toạ độ thân / mắt, màu khí riêng, hướng bật đi, cột đích (x) ở toàn cảnh cuối
  const AKA5=[{n:'chud',x:166,y:355,eye:[160,235],col:'255,110,40',dir:[-0.55,-0.83],w:16,to:150,k0:0.05},{n:'bat',x:279,y:393,eye:[288,321],col:'150,190,255',dir:[-0.92,-0.4],w:14,to:300,k0:0.12},
    {n:'dp',x:472,y:275,eye:[476,138],col:'190,110,255',dir:[0.08,-1],w:22,to:480,k0:0},{n:'mlem',x:682,y:382,eye:[684,350],col:'120,230,255',dir:[0.93,-0.36],w:13,to:800,k0:0.18},{n:'ninja',x:816,y:328,eye:[822,226],col:'255,40,40',dir:[0.6,-0.8],w:14,to:90,k0:0.08}];
  function streak2(g,x0,y0,x1,y1,w,col){ const dx=x1-x0, dy=y1-y0, L=Math.hypot(dx,dy); if(L<2) return; const nx=-dy/L, ny=dx/L; g.save(); g.globalCompositeOperation='lighter';
    for(const [wk,al,c] of [[2.6,0.25,col],[1.2,0.6,col],[0.4,1,'255,255,255']]){ const ww=w*wk/2, gr=g.createLinearGradient(x0,y0,x1,y1); gr.addColorStop(0,`rgba(${c},0)`); gr.addColorStop(1,`rgba(${c},${al})`);
      g.fillStyle=gr; g.beginPath(); g.moveTo(x0,y0); g.lineTo(x1+nx*ww,y1+ny*ww); g.arc(x1,y1,ww,Math.atan2(ny,nx),Math.atan2(ny,nx)+Math.PI,true); g.lineTo(x0,y0); g.fill(); } blob(g,x1,y1,w*2.2,col,0.6); g.restore(); }
  function world(F,t){ I=F.I; const g=F.g; g.save();
    if(t<T.look){ const u=seg(t,0,T.look); g.save(); cam(g,480,300,lerp(1.0,1.06,u)); nightSky(g,t,0.35);
      pic(g,'pose',480,560,500,{ay:1}); g.restore();
      const back=1-eout(seg(t,0.05,0.55));   // MÀU TRỞ VỀ: lớp đỏ đen của đoạn thoại tan dần
      g.save(); g.globalCompositeOperation='multiply'; g.fillStyle=`rgba(255,${Math.round(255-200*back)},${Math.round(255-210*back)},1)`; g.fillRect(0,0,VW,VH); g.restore(); g.fillStyle=`rgba(0,0,0,${0.55*back})`; g.fillRect(0,0,VW,VH); }
    else if(t<T.sky){ const u=seg(t,T.look,T.sky), close=t>=T.look+0.9; g.save(); if(close) cam(g,505,lerp(205,195,seg(t,T.look+0.9,T.sky)),lerp(2.5,2.65,seg(t,T.look+0.9,T.sky))); else cam(g,480,lerp(330,300,u),lerp(1.15,1.25,u));   // trung → CẬN mặt ngẩng nhìn nightSky(g,t,0.3);
      g.fillStyle='#120a0e'; g.fillRect(-200,470,1400,300); pic(g,'dpL',520,470,300,{alt:'P6'}); g.restore();
      g.save(); g.globalCompositeOperation='lighter'; blob(g,560,0,500,'255,210,140',0.25*seg(u,0.5,1)); g.restore(); }   // ánh vàng từ trời hắt xuống
    else if(t<T.space){ const u=seg(t,T.sky,T.space); g.save(); cam(g,480,270,lerp(1.0,1.08,u)); nightSky(g,t,0.15); infinity(g,480,200,330,eout(seg(u,0,0.75)),1,t); g.restore(); }   // ngước lên: ∞ vẽ dần trên trời
    else if(t<T.talk){ const u=seg(t,T.space,T.talk); g.fillStyle='#04020a'; g.fillRect(0,0,VW,VH);
      for(let i=0;i<160;i++){ const x=(hash(i*3.3)*VW+u*20*(0.3+hash(i)))%VW, y=hash(i*5.1)*VH; g.fillStyle=`rgba(255,255,255,${0.3+0.6*hash(i*7.7)})`; g.fillRect(x,y,1.5,1.5); }
      g.save(); g.translate(VW/2,VH/2); g.scale(lerp(1.0,1.12,eio(u)),lerp(1.0,1.12,eio(u))); g.translate(-VW/2,-VH/2);
      if(ok('space')) cover(g,I.space); else { const gr=g.createRadialGradient(440,250,20,480,280,180); gr.addColorStop(0,'#6fb7c9'); gr.addColorStop(1,'#123049'); g.fillStyle=gr; g.beginPath(); g.arc(480,280,170,0,TAU); g.fill(); infinity(g,480,280,330,1,1,t); for(let i=0;i<8;i++){ const x=320+i*45; g.fillStyle='rgba(255,240,200,0.35)'; g.fillRect(x-4,0,8,VH); } }
      g.save(); g.globalCompositeOperation='lighter'; blob(g,480,280,420,'255,220,140',0.15+0.1*Math.sin(t*3)); for(let i=0;i<7;i++){ const x=300+i*60+Math.sin(t*2+i)*4; g.fillStyle=`rgba(255,245,215,${0.06+0.05*Math.sin(t*5+i)})`; g.fillRect(x-6,0,12,VH); } g.restore();   // phong ấn lung linh
      g.restore(); }
    else if(t<T.spin){ const u=seg(t,T.talk,T.spin); g.save(); cam(g,500,240,lerp(1.9,2.05,u)); nightSky(g,t,0.3); infinity(g,560,-60,330,1,0.6,t);
      g.fillStyle='#120a0e'; g.fillRect(-200,470,1400,300); pic(g,'dpL',520,470,300,{alt:'P6'}); g.restore(); }   // cận Depressed ngẩng nhìn, nói
    else if(t<T.pil){ const u=seg(t,T.spin,T.pil); g.save(); cam(g,480,270,lerp(1.0,1.05,u)); nightSky(g,t,0.1); infinity(g,480,170,300,1,0.8,t); breadSpin(g,t,480,170,220,eout(seg(u,0,0.3))); g.restore();
      const st=Math.floor(t*(6+10*u))%2===0; g.fillStyle=st?`rgba(255,255,255,${0.15+0.25*u})`:`rgba(0,0,10,${0.25+0.35*u})`; g.fillRect(0,0,VW,VH);   // trời CHỚP SÁNG TỐI dồn dập dần
      g.save(); g.globalCompositeOperation='multiply'; g.fillStyle='rgba(170,200,255,1)'; g.globalAlpha=0.35*u; g.fillRect(0,0,VW,VH); g.restore(); }   // hắt xanh
    else if(t<T.leap){ g.save(); cam(g,480,300,1.0); nightSky(g,t,0.05); for(const [t0,x,col,w] of PILS) pillar(g,t,t0,x,430,w,col,{top:col==='190,110,255'?-200:-60}); g.restore(); }   // cột sáng giáng xuống khắp thành phố
    // ① LẤY ĐÀ CẢ NHÓM (anh dặn 12/11: "5 thành viên tách ra các hướng cùng lúc"): mẹo anime = ẢNH TĨNH + MÁY ĐẨY + VFX — ảnh nhóm 5 con, mỗi con tụ khí MÀU RIÊNG,
    //   mái nứt dưới chân cả nhóm, sỏi bốc lên, rung dồn dập ở cuối (không cần vẽ 5 tư thế lấy đà)
    else if(t<T.launch){ const u=seg(t,T.crouch,T.launch); g.save(); cam(g,480,300,lerp(1.0,1.1,eio(u))); nightSky(g,t,0.2); pillar(g,t,T.crouch-1,700,430,13,'190,110,255',{top:-300});
      g.save(); g.globalCompositeOperation='lighter'; for(const m of AKA5) blob(g,m.x,m.y,80+140*u*(0.8+0.2*Math.sin(t*9+m.x)),m.col,0.25+0.55*u); g.restore();
      const jit=u>0.55?(hash(Math.floor(t*40))-0.5)*5*u:0; pic(g,'pose',480+jit,560,500,{ay:1});
      g.save(); g.strokeStyle=`rgba(200,150,255,${0.25+0.5*u})`; g.lineWidth=1.6; for(let i=0;i<16;i++){ const x0=120+i*48, L=20+90*u*hash(i*3.1); g.beginPath(); g.moveTo(x0,505); g.lineTo(x0+(hash(i*7.3)-0.5)*L,505+L*0.12); g.stroke(); } g.restore();   // mái nứt
      for(let i=0;i<30;i++){ const ph=((t-T.crouch)*0.7+hash(i*2.3))%1, x=100+760*hash(i*5.1), y=500-ph*(60+120*u)*(0.5+hash(i*7.7)); g.fillStyle=`rgba(40,30,40,${0.9*(1-ph)})`; g.fillRect(x,y,3+4*hash(i),3+4*hash(i*9)); }   // sỏi đá bốc lên
      g.save(); g.globalCompositeOperation='lighter'; for(const m of AKA5){ const e=m.eye; if(e) blob(g,e[0],e[1],10+18*u,m.col,0.4+0.5*u); } g.restore();   // mắt từng con loé màu riêng
      g.restore(); }
    // ② BẬT ĐI: loé trắng → bóng mờ cả nhóm tan dần → 5 VỆT MÀU toả ra 5 hướng cùng lúc (mẹo anime: pha nhanh không vẽ người) → mái còn hố + bụi
    else if(t<T.fly){ const v=t-T.launch; g.save(); cam(g,480,300,1.1); nightSky(g,t,0.2); pillar(g,t,T.crouch-1,700,430,13,'190,110,255',{top:-300});
      const ga=Math.max(0,1-v/0.22); if(ga>0){ g.save(); g.globalCompositeOperation='lighter'; pic(g,'pose',480,560,500,{ay:1,a:0.55*ga}); g.restore(); }   // bóng mờ cả nhóm
      { const rg=g.createLinearGradient(0,498,0,560); rg.addColorStop(0,'#4a4144'); rg.addColorStop(0.08,'#2a2326'); rg.addColorStop(1,'#141012'); g.fillStyle=rg; g.fillRect(-200,498,1400,300); g.fillStyle='rgba(255,90,60,0.25)'; g.fillRect(-200,498,1400,2); }   // mép mái (đá) ánh đỏ trăng
      g.fillStyle='rgba(10,6,10,0.92)'; for(const m of AKA5){ g.beginPath(); g.ellipse(m.x,505,42,9,0,0,TAU); g.fill(); }   // hố dưới chân từng con
      const R=60+380*eout(Math.min(1,v/0.6)); g.save(); const gr=g.createRadialGradient(480,505,R*0.3,480,505,R); gr.addColorStop(0,`rgba(150,130,140,${0.55*Math.max(0,1-v*1.2)})`); gr.addColorStop(1,'rgba(150,130,140,0)'); g.fillStyle=gr; g.beginPath(); g.ellipse(480,505,R,R*0.25,0,0,TAU); g.fill(); g.restore();   // vòng bụi
      for(const m of AKA5){ const sp=2600, hx=m.x+m.dir[0]*sp*v, hy=m.y+m.dir[1]*sp*v, L=Math.min(sp*v,520); streak2(g,hx-m.dir[0]*L,hy-m.dir[1]*L,hx,hy,m.w,m.col); }   // 5 vệt toả ra
      for(let i=0;i<34;i++){ const an=-Math.PI*(0.1+0.8*hash(i*3.3)), sp=200+500*hash(i*5.9), x=120+720*hash(i*1.7)+Math.cos(an)*sp*v, y=500+Math.sin(an)*sp*v+600*v*v; if(y>510) continue; g.fillStyle='#2a2226'; g.fillRect(x,y,4+6*hash(i),4+6*hash(i*7)); }   // đá văng rồi rơi
      g.restore(); if(v<0.06){ g.fillStyle=`rgba(255,240,255,${0.75*(1-v/0.06)})`; g.fillRect(0,0,VW,VH); } }
    // ③ ĐANG BAY: máy bám ngang — người chúi về trước, áo choàng phần phật, thành phố bên dưới vụt qua, vệt tốc độ, cột tím phía trước to dần
    else if(t<T.fly2){ const u=seg(t,T.fly,T.fly2); g.save(); nightSky(g,t,0.25);
      g.save(); g.globalCompositeOperation='lighter'; const px=lerp(1000,820,u), pw=10+20*u; const pg=g.createLinearGradient(px-pw*3,0,px+pw*3,0); pg.addColorStop(0,'rgba(190,110,255,0)'); pg.addColorStop(0.5,'rgba(220,170,255,0.8)'); pg.addColorStop(1,'rgba(190,110,255,0)'); g.fillStyle=pg; g.fillRect(px-pw*3,0,pw*6,VH); g.restore();   // cột tím phía trước
      for(const [k,y0,col,spd] of [[0,330,'#1a1018',600],[1,380,'#140c12',1100],[2,440,'#0c070b',2000]]){ const off=(t*spd)%240; for(let x=-240-off;x<VW+240;x+=60){ const hh=40+90*hash(Math.floor((x+off+t*spd)/60)+k*99); g.fillStyle=col; g.fillRect(x,y0+60-hh,52,hh+200);
          if(k<2){ g.fillStyle='rgba(255,190,110,0.5)'; for(let w=0;w<3;w++) g.fillRect(x+8+w*14,y0+70-hh+10,5,4); } } }   // 3 lớp nhà vụt qua (lớp gần nhanh nhất)
      g.save(); g.strokeStyle='rgba(230,215,255,0.35)'; g.lineWidth=1.5; for(let i=0;i<26;i++){ const y=VH*hash(i*3.7), L=80+200*hash(i*5.3), x=((VW+L)-((t*1600+hash(i)*VW*2)%(VW+L*2))); g.beginPath(); g.moveTo(x,y); g.lineTo(x+L,y); g.stroke(); } g.restore();   // vệt tốc độ
      const bx=430+Math.sin(t*3)*12, by=230+Math.sin(t*5)*6;
      g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<10;i++){ g.strokeStyle=`rgba(180,110,255,${0.5-i*0.045})`; g.lineWidth=36-i*3; g.beginPath(); g.moveTo(bx-120-i*40,by+20); g.lineTo(bx-170-i*40,by+22); g.stroke(); } blob(g,bx+40,by,130,'170,90,255',0.35); g.restore();   // vệt khí tím sau lưng
      g.save(); g.translate(bx,by); g.rotate(-0.12); g.scale(1,1+0.03*Math.sin(t*30)); pic(g,'dFl',0,60,140,{alt:'P6'}); g.restore();   // áo choàng phần phật (rung nhanh)
      g.restore(); }
    else { const u=seg(t,T.fly2,T.DUR); g.save(); cam(g,480,300,lerp(1.0,1.35,ein(u))); nightSky(g,t,0.1); for(const [t0,x,col,w] of PILS) pillar(g,t,t0-4,x,430,w,col,{top:col==='190,110,255'?-200:-60}); g.restore();
      for(const m of AKA5){ const k=ein(seg(u,m.k0,m.k0+0.7)), sx=m.x*0.4+290, sy=470, px=lerp(sx,m.to,k), py=lerp(sy,m.to===480?250:330,k)-120*Math.sin(Math.PI*k), qx=lerp(sx,m.to,Math.max(0,k-0.08)), qy=lerp(sy,m.to===480?250:330,Math.max(0,k-0.08))-120*Math.sin(Math.PI*Math.max(0,k-0.08));
        if(k>0&&k<1){ streak2(g,qx,qy,px,py,m.w*0.6,m.col); } }   // 5 vệt bay về 5 cột: Ninja → Berserk · Bat → Pop/Huh · Chud + Mlem → Doge/Clapping · Depressed → cột tím (Gojo)
      }
    g.restore(); }
  CineKit.film({ id:'fin1c5', title:'Final 1 · Cảnh 5 · Avatar đầu tiên', DUR:T.DUR, VW, VH, fadeIn:false, fadeOut:false,
    imgs:IMG, cast:['dp','bc'],
    sfx:[[0.15,'l2p_sub',0.5,null,'màu trở về trên nóc nhà, nền trầm'],
      [T.look+0.3,'ep3_shine',0.5,null,'Depressed ngẩng đầu nhìn trời'],
      [T.sky+0.2,'l2p_shimmer',0.8,null,'dấu vô hạn vàng trắng hiện dần trên trời'],
      [T.space+0.1,'l2p_chime',0.7,null,'vũ trụ: hành tinh bị dấu vô hạn phong ấn, cột sáng lung linh'],
      [T.spin,'bc_spin',0.9,null,'Bread Cat xoay giữa trời, rít to dần'],[T.spin+0.6,'bc_zap',0.8,null,'trời chớp sáng tối, điện chập'],
      ...PILS.map(([t0],i)=>[t0+0.25,i===5?'cine_deep_impact':'cine_impact',i===5?1:0.55,null,i===5?'cột sáng tím cao nhất giáng đập xuống':(i?'+ ':'')+'cột sáng giáng xuống thành phố']),
      [T.crouch+0.1,'l2p_riser',0.6,null,'cả nhóm 5 con lấy đà, mỗi con tụ khí màu riêng, mái nứt'],[T.launch,'ep3_quake',0.9,null,'cả 5 con bật đi cùng lúc: mái vỡ thành hố, đá văng, vòng bụi'],[T.launch+0.02,'se_machdash',0.8,null,'+ vệt tím vút chéo lên trời'],[T.fly+0.1,'l2p_whoosh',0.7,null,'Depressed bay vút qua thành phố về cột sáng tím'],
      [T.boom,'ep3_explode',1,null,'BÙM: lao đâm vào cột sáng, nổ loé trắng, sang trận đầu tiên']],
    mus:[{src:'assets/audio/mus_girei.m4a',ra:0,rb:T.DUR,off:window.FIN1_GIREI_AT||29.4,vol:0.5,fi:0.05,fo:0.4}],   // 13/11: Girei chạy tiếp từ nóc nhà (không lặp file 21.8s)
    shots:[{t0:0,t1:T.DUR,a:{}}],
    impact:t=>(t>=T.boom&&t<T.boom+0.07)?'red':(t>=T.boom+0.07&&t<T.boom+0.14)?'inv':(t>=14.8&&t<14.87)?'inv':0,
    shake:t=>{ let s=0; const h=(a,amp,d)=>{ if(t>=a&&t<a+d) s=Math.max(s,amp*(1-(t-a)/d)); }; for(const [t0] of PILS) h(t0+0.25,6,0.4); h(14.8,14,0.6); if(t>=T.crouch&&t<T.launch) s=Math.max(s,1+4*seg(t,T.crouch,T.launch)); h(T.launch,24,0.7); h(T.boom,22,0.6); if(t>=T.spin&&t<T.pil) s=Math.max(s,2+5*seg(t,T.spin,T.pil)); return s; },
    world, screen(F,t){ const g=F.g; if(t>=T.boom) K.flash(F,1-seg(t,T.boom+0.15,T.DUR),'#ffffff'); K.letterbox(F,t<T.spin?0.9:0); K.vignette(F,0.45); subs(g,t); } });   // 12/11: phụ đề vẽ SAU dải đen (trước bị dải đen che mất chữ)
})();
