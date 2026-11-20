// 🎸💀 MEGALOVANIA — Meme Band in the Castle (MV 16:9, 2:58, 20/11/2026). Kịch bản: prompts/kich-ban/megaband.md · việc dở: docs/notes/viec-do-megalovania.md
//   Nhạc = bản mix 5 cover (tools/x/mega-arrange.js → music-mix.html), lưới 119.717 BPM, vòng 8.02s, phách 0 ở 12.5s.
//   LUẬT PHIM (anh 20/11): GPT CHỈ vẽ kiến trúc (assets/img/cine/megaband/MB_*, trời đã tách) + đạo cụ đứng yên.
//   MỌI thứ chuyển động — trời, trăng, mây, mưa, sương, sét, nến, lửa, dơi, khói, tàn lửa, vòng ký tự, kính màu sáng, sóng âm, nốt nhạc, dây, ong — là CODE ở file này.
//   Meme = ẢNH GỐC, chỉ luân phiên KHUNG GỐC theo phách + nhún / nghiêng cả khối (không vẽ lại, không bóp méo).
(function(){
  if(!window.CineKit || CineKit.films.megaband) return;
  const K=CineKit, {seg,lerp,clamp,hash}=K, EA=K.EASE, eout=EA.eout, ein=EA.ein, eio=EA.eio, TAU=Math.PI*2, VW=960, VH=540;
  // ═════════ NHỊP ═════════
  const BPM=119.717, P=60/BPM, C=16*P, T0=12.5, cs=k=>T0+k*C, bar=(k,b)=>cs(k)+b*4*P, END=cs(20), DUR=177.8;
  const beatF=t=>(t-T0)/P, cycK=t=>Math.floor((t-T0)/C);
  const pulse=(t,dec,div)=>{ const b=beatF(t)*(div||1); if(b<0) return 0; return Math.exp(-(b-Math.floor(b))*P/(div||1)/dec); };   // 1 đúng phách → tắt dần
  const TUTTI_K=[5,6,7,8,14,15,16,17,18,19];   // các vòng cả nhóm chơi (+ riff kết)
  const SEC={ sans:cs(0), bp:cs(1), gtr:cs(2), build:cs(3), vio:cs(4), tutti:cs(5), brk:cs(9), vsolo:cs(10), gsolo:cs(12), tutti2:cs(14), fin:cs(18), end:END };
  // ═════════ ẢNH ═════════
  const MB='assets/img/cine/megaband/', IMG={ CASTLE:MB+'MB_CASTLE.webp', BALC:MB+'MB_BALCONY.webp', CRYPT:MB+'MB_CRYPT.jpg', HALL:MB+'MB_HALL.jpg', TOWER:MB+'MB_TOWER.webp',
    STAIRS:MB+'MB_STAIRS.webp', SPIRE:MB+'MB_SPIRE.webp', STAGE:MB+'MB_STAGE.webp', GL:MB+'MB_GARG_L.png', GR:MB+'MB_GARG_R.png', AMP1:MB+'MB_AMP_1.png', AMP2:MB+'MB_AMP_2.png',
    SX0:'assets/img/sans/SX_PLAY_0.webp', SX1:'assets/img/sans/SX_PLAY_1.webp', SX2:'assets/img/sans/SX_PLAY_2.webp', SXB:'assets/img/sans/SX_BLASTER.webp',
    BG0:'assets/avatars/bongocat/avatarUrl.webp', BG1:'assets/avatars/bongocat/skill1AvatarUrl.webp', BG2:'assets/avatars/bongocat/skill2AvatarUrl.webp', BG3:'assets/avatars/bongocat/skill3AvatarUrl.webp',
    PC0:'assets/avatars/pianocat/avatarUrl.webp', PC1:'assets/avatars/pianocat/attackAvatarUrl.webp',
    MQ0:'assets/avatars/mosquitoviolin/avatarUrl.webp', MQ1:'assets/avatars/mosquitoviolin/attackAvatarUrl.webp', MQ2:'assets/avatars/mosquitoviolin/skill1AvatarUrl.webp' };
  const EG=['EG_O3','EG_CALM','EG_PEEK','EG_O1','EG_BANG','EG_SKY','EG_O2','EG_BACK','EG_KNEEL','EG_O4','EG_FIST'];   // = EG_LOOP trong game (anh chốt Ver 464: mỗi nốt 1 khung, nhịp đều)
  EG.forEach(k=>IMG[k]='assets/img/electricguitarcat/'+k+'.webp');
  for(let i=1;i<=6;i++){ IMG['VB'+i]='assets/img/violinbee/VB_'+i+'.png'; } for(let i=1;i<=3;i++) IMG['BEE'+i]='assets/img/violinbee/VB_BEE'+i+'.png';
  // 🐱🐶 ĐÁM ĐÔNG = mọi meme mèo + chó (anh 20/11), xen kẽ mèo / chó, trừ 3 con trong ban nhạc. Ảnh gốc; vài con có kiểu nhảy riêng đúng meme.
  const CATS=['popcat','feuerkatze','germancat','uiacat','screamcat','bananacat','suscat','nyancat','loooongcat','flyingcat','snoozecat','depressedcat','drivercat','knifecat','holycat','hecker',
    'commandercat','batcat','grumpycat','catvader','applecat','maxwell','coughcat','spidercat','flowercat','yuki','mechaniccat','rubikcat','mewingcat','aliencat','wetcat','droolingcat',
    'boxingcat','ninjacat','breadcat','slapcat','clappingcat','supremearbiter','cryingcat','damdamdidi','stalincat','vampirecat','mlemcat','berserkcat','angrycat','crunchycat','scootercat','morsecat'];
  const DOGS=['doge','cheems','kingcheems','finedog','scareddog','poordog','infinitydoge','calmdog','susdog','chonkydog','samuraicheems'];
  const CROWD=[]; { let d=0; CATS.forEach((c,i)=>{ CROWD.push(c); if(i%4===2 && d<DOGS.length) CROWD.push(DOGS[d++]); }); while(d<DOGS.length) CROWD.push(DOGS[d++]); }
  CROWD.forEach(k=>IMG['C_'+k]='assets/avatars/'+k+'/avatarUrl.webp');
  IMG.C_popcat_o='assets/avatars/popcat/attackAvatarUrl.webp'; for(let i=1;i<=3;i++) IMG['C_clap'+i]='assets/avatars/clappingcat/skill'+i+'AvatarUrl.webp';

  // ═════════ CÔNG CỤ VẼ ═════════
  // khung nhìn 1 tấm nền: zm (1 = vừa khít), cx, cy (điểm ảnh đặt giữa khung, 0–1) → biến đổi ảnh → màn hình
  function view(F,key,zm,cx,cy){ const im=F.I[key]; const W=im&&im.naturalWidth||1600, H=im&&im.naturalHeight||900, sc=Math.max(VW/W,VH/H)*zm*1.03, w=W*sc, h=H*sc;
    return {key, im, sc, w, h, x0:VW*0.5-w*cx, y0:VH*0.5-h*cy, at(u,v){ return [this.x0+u*this.w, this.y0+v*this.h]; }, s(px){ return px*this.sc; }}; }
  function plate(F,V,o){ if(!V.im||!V.im.naturalWidth) return; const g=F.g; o=o||{}; g.save(); if(o.alpha!=null) g.globalAlpha=o.alpha; if(o.blur) g.filter='blur('+(o.blur*(F.SC||1)).toFixed(1)+'px)';   // blur = nền mờ ở cảnh cận (tách người khỏi nền)
    g.drawImage(V.im,V.x0,V.y0,V.w,V.h); g.filter='none';
    if(o.tint){ g.globalCompositeOperation='source-atop'; } g.restore();
    if(o.shade){ g.save(); g.globalCompositeOperation='multiply'; g.globalAlpha=o.shade[1]; g.fillStyle=o.shade[0]; g.fillRect(-50,-50,VW+100,VH+100); g.restore(); } }
  // ảnh meme: chân ở (x,y), cao h · o: flip, rot, sx, sy, alpha, env:[màu,độ] (nhuộm ánh môi trường), rim:[màu,độ], dark (bóng đen), shadow, mist
  function spr(F,key,x,y,h,o){ const c=K.prep(F.I[key]); if(!c) return null; const g=F.g, w=h*c.sw/c.sh; o=o||{}; const al=o.alpha==null?1:o.alpha;
    if(o.shadow!==false && al>0.05){ g.save(); g.globalAlpha=0.4*al; const rg=g.createRadialGradient(x,y,0,x,y,w*0.5); rg.addColorStop(0,'rgba(0,0,0,0.9)'); rg.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=rg; g.beginPath(); g.ellipse(x,y,w*0.5,Math.max(2,h*0.06),0,0,TAU); g.fill(); g.restore(); }
    const draw=(src,a,dx,dy,comp)=>{ g.save(); g.globalAlpha=a; if(comp) g.globalCompositeOperation=comp; g.translate(x+(dx||0),y+(dy||0)); if(o.rot) g.rotate(o.rot); g.scale((o.flip?-1:1)*(o.sx||1),o.sy||1);
      if(src===c) g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,-w/2,-h,w,h); else g.drawImage(src,-w/2,-h,w,h); g.restore(); };
    // viền sáng = ánh hắt MỎNG từ trên (soát 20/11: lệch 3 hướng thành đường viền bao quanh → lộ PNG). Vẽ đè rồi trừ thân: chỉ còn mép trên sáng
    if(o.rim) draw(K.tinted(c,o.rim[0]),o.rim[1]*al*0.7,0,-Math.max(0.6,h*0.007),'lighter');   // bản sáng lệch LÊN 1 chút, thân vẽ đè → chỉ còn vệt mảnh mép trên
    draw(c,al);
    if(o.env) draw(K.tinted(c,o.env[0]),o.env[1]*al,0,0,'multiply');
    if(o.glow) draw(K.tinted(c,o.glow[0]),o.glow[1]*al,0,0,'lighter');
    if(o.dark) draw(K.tinted(c,'#05040a'),o.dark*al);
    if(o.mist){ g.save(); g.globalAlpha=o.mist*al; g.translate(x,y); g.scale(1,0.22); const rg=g.createRadialGradient(0,0,0,0,0,w*0.75); rg.addColorStop(0,'rgba(130,150,170,0.75)'); rg.addColorStop(1,'rgba(130,150,170,0)');
      g.fillStyle=rg; g.beginPath(); g.arc(0,0,w*0.75,0,TAU); g.fill(); g.restore(); }   // sương phủ chân = vệt BẦU DỤC mềm (soát 20/11: hộp chữ nhật lộ mép)
    return {w,h,c}; }
  // 🎨 HOÀ VÀO CẢNH (anh 20/11: "tránh làm nhân vật nổi như png ở nền"): dựng ảnh trên LỚP RIÊNG trước khi dán —
  //   giảm độ rực (ảnh thật gần tông nét vẽ phẳng) · phủ ánh môi trường · TỐI DẦN VỀ CHÂN · ánh hắt mỏng phía trên · mép mềm nhẹ · bóng tiếp đất.
  const BLC={}; const blCv=(k,w,h)=>{ const c=BLC[k]||(BLC[k]=K.mk(w,h)); if(c.width<w||c.height<h){ c.width=Math.max(c.width,w); c.height=Math.max(c.height,h); } return c; };
  // o.ref = khung CHUẨN của bộ khung (cùng khổ ảnh): cả bộ dùng chung 1 tỉ lệ + 1 điểm chân → đổi khung KHÔNG to nhỏ / nhảy chỗ (soát 20/11: cắt sát từng khung rồi phóng về cùng
  //   chiều cao làm khung quỳ của Guitar bị phóng to). Không có ref = cắt sát như cũ.
  function sprBlend(F,key,x,y,h,o){ o=o||{}; const c=K.prep(F.I[key]); if(!c) return null; const I0=o.ref&&F.I[o.ref], I1=F.I[key], same=I0&&I1&&I0.naturalWidth===I1.naturalWidth&&I0.naturalHeight===I1.naturalHeight, c0=same?K.prep(I0):null, g=F.g, SCk=F.SC||1, al=o.alpha==null?1:o.alpha;
    const R=c0?{sx:0,sy:0,sw:c.src.width,sh:c.src.height}:{sx:c.sx,sy:c.sy,sw:c.sw,sh:c.sh}, kk=h/(c0?c0.sh:c.sh), W=R.sw*kk, H=R.sh*kk, w=(c0?c0.sw:c.sw)*kk;
    const AX=c0?(c0.sx+c0.sw/2)*kk:W/2, AY=c0?(c0.sy+c0.sh)*kk:H;   // điểm neo (giữa chân) tính từ góc trái trên của vùng vẽ
    if(o.shadow!==false && al>0.05){ g.save(); g.globalAlpha=0.55*al; g.translate(x,y); g.scale(1,0.16); const rg=g.createRadialGradient(0,0,0,0,0,w*0.55); rg.addColorStop(0,'rgba(0,0,0,0.85)'); rg.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=rg; g.beginPath(); g.arc(0,0,w*0.55,0,TAU); g.fill(); g.restore(); }
    const pw=Math.ceil(W*SCk)+6, ph=Math.ceil(H*SCk)+6, oc=blCv(o.slot||key,pw,ph), x2=oc.getContext('2d'); x2.setTransform(1,0,0,1,0,0); x2.globalCompositeOperation='source-over'; x2.globalAlpha=1; x2.clearRect(0,0,oc.width,oc.height);
    const img=()=>x2.drawImage(c.src,R.sx,R.sy,R.sw,R.sh,3,3,pw-6,ph-6); img();
    if(o.desat){ x2.globalCompositeOperation='saturation'; x2.globalAlpha=o.desat; x2.fillStyle='#808080'; x2.fillRect(0,0,pw,ph); x2.globalAlpha=1; }
    if(o.env){ x2.globalCompositeOperation='multiply'; x2.globalAlpha=o.env[1]; x2.fillStyle=o.env[0]; x2.fillRect(0,0,pw,ph); x2.globalAlpha=1; }
    x2.globalCompositeOperation='destination-in'; img();   // cắt lại đúng hình (saturation / multiply tô cả vùng trong suốt)
    x2.globalCompositeOperation='source-atop';
    const yTop=(AY-h)*SCk+3, yFoot=AY*SCk+3;
    const lg=x2.createLinearGradient(0,yTop,0,yFoot); lg.addColorStop(0,'rgba(0,0,0,0)'); lg.addColorStop(0.62,'rgba(0,0,0,0)'); lg.addColorStop(1,'rgba(4,6,14,'+(o.foot==null?0.5:o.foot)+')'); x2.fillStyle=lg; x2.fillRect(0,0,pw,ph);
    if(o.rim){ const rg=x2.createLinearGradient(0,yTop,0,yTop+h*SCk*0.35); rg.addColorStop(0,o.rim[0]); rg.addColorStop(1,'rgba(0,0,0,0)'); x2.globalAlpha=o.rim[1]*0.5; x2.fillStyle=rg; x2.fillRect(0,0,pw,ph); x2.globalAlpha=1; }
    if(o.dark){ x2.globalAlpha=o.dark; x2.fillStyle='#05040a'; x2.fillRect(0,0,pw,ph); x2.globalAlpha=1; }
    g.save(); g.globalAlpha=al; g.translate(x,y); if(o.rot) g.rotate(o.rot); g.scale((o.flip?-1:1)*(o.sx||1),o.sy||1); g.filter='blur('+(0.45*SCk).toFixed(2)+'px)';
    g.drawImage(oc,0,0,pw,ph,-AX-3/SCk,-AY-3/SCk,pw/SCk,ph/SCk); g.filter='none'; g.drawImage(oc,0,0,pw,ph,-AX-3/SCk,-AY-3/SCk,pw/SCk,ph/SCk); g.restore();   // lớp mờ dưới + lớp nét trên = mép mềm, thân vẫn nét
    if(o.mist){ g.save(); g.globalAlpha=o.mist*al; g.translate(x,y); g.scale(1,0.22); const rg=g.createRadialGradient(0,0,0,0,0,w*0.75); rg.addColorStop(0,'rgba(130,150,170,0.75)'); rg.addColorStop(1,'rgba(130,150,170,0)'); g.fillStyle=rg; g.beginPath(); g.arc(0,0,w*0.75,0,TAU); g.fill(); g.restore(); }
    return {w,h,c}; }
  const lightOn=(g,fn)=>{ g.save(); g.globalCompositeOperation='lighter'; fn(); g.restore(); };
  function glowDot(g,x,y,r,col,a){ if(a<=0.01) return; const rg=g.createRadialGradient(x,y,0,x,y,r); rg.addColorStop(0,'rgba('+col+','+a+')'); rg.addColorStop(1,'rgba('+col+',0)'); g.fillStyle=rg; g.fillRect(x-r,y-r,2*r,2*r); }

  // ═════════ TRỜI: dải đêm · trăng · mây cel · dơi · mưa · sương · sét (CODE) ═════════
  const PAL={ cyan:{top:'#04121c',mid:'#0b2f40',low:'#1a5266',moon:'190,255,245',cl:['#0d3445','#164a5c'],rim:'150,240,235'},
              red:{top:'#0c0412',mid:'#3a1030',low:'#7a2234',moon:'255,120,70',cl:['#2a0d2e','#4a1838'],rim:'255,140,90'},
              storm:{top:'#050a12',mid:'#141c30',low:'#2a2a44',moon:'210,220,255',cl:['#121a2c','#1d2840'],rim:'190,200,255'} };
  function sky(F,t,o){ const g=F.g, pl=PAL[o.pal||'cyan']; const lg=g.createLinearGradient(0,0,0,VH); lg.addColorStop(0,pl.top); lg.addColorStop(0.6,pl.mid); lg.addColorStop(1,pl.low); g.fillStyle=lg; g.fillRect(-60,-60,VW+120,VH+120);
    if(o.moon){ const m=o.moon, mr=m.r, mx=m.x, my=m.y; glowDot(g,mx,my,mr*3.2,pl.moon,0.35);
      // lưỡi liềm: khoét đĩa lệch trên LỚP RIÊNG rồi mới dán (soát 20/11: khoét thẳng lên khung làm thủng cả trời thành đĩa tối)
      const S=Math.ceil(mr*2+4), mc=moonCv(S), x=mc.getContext('2d'); x.setTransform(1,0,0,1,0,0); x.clearRect(0,0,S,S); x.fillStyle='rgb('+pl.moon+')'; x.beginPath(); x.arc(S/2,S/2,mr,0,TAU); x.fill();
      if(m.cres){ x.globalCompositeOperation='destination-out'; x.beginPath(); x.arc(S/2+mr*0.42*m.cres,S/2-mr*0.18*m.cres,mr*0.92,0,TAU); x.fill(); x.globalCompositeOperation='source-over'; }
      g.drawImage(mc,mx-S/2,my-S/2); if(!m.cres){ g.save(); g.globalAlpha=0.12; g.fillStyle='#0a3a44'; for(let i=0;i<5;i++){ g.beginPath(); g.arc(mx+(hash(i+3)-0.5)*mr*1.2,my+(hash(i+9)-0.5)*mr*1.2,mr*(0.08+0.12*hash(i)),0,TAU); g.fill(); } g.restore(); } }
    if(o.clouds!==false) clouds(F,t,pl,o.cloudK==null?1:o.cloudK,o.cloudSpd||1);
    if(o.bats) bats(F,t,o.bats); }
  const MOONCV={}; const moonCv=S=>MOONCV[S]||(MOONCV[S]=K.mk(S,S));
  // mây cel 2 tông: dải sóng trôi ngang (băm theo chỉ số, KHÔNG Math.random), viền dưới sáng ánh trăng
  function clouds(F,t,pl,k,spd){ const g=F.g; for(let L=0;L<3;L++){ const y0=VH*(0.12+0.16*L), amp=22+10*L, sh=(t*(6+5*L)*spd)%(VW*1.6);
      g.save(); g.globalAlpha=(0.55+0.15*L)*k; g.fillStyle=pl.cl[L%2]; g.beginPath(); g.moveTo(-80,y0-40);
      for(let x=-80;x<=VW+80;x+=12){ const u=(x+sh)/140+L*7; g.lineTo(x,y0+amp*(0.6*Math.sin(u)+0.4*Math.sin(u*2.3+L))); }
      g.lineTo(VW+80,y0-120); g.lineTo(-80,y0-120); g.closePath(); g.fill(); g.restore(); } }
  function bats(F,t,n){ const g=F.g; g.save(); g.fillStyle='#07040a'; for(let i=0;i<n;i++){ const sp=30+30*hash(i*3), x=((hash(i)*VW*1.4+t*sp)%(VW*1.4))-VW*0.2, y=VH*(0.12+0.35*hash(i*7))+Math.sin(t*1.3+i)*12, s=3+4*hash(i*11), fl=Math.sin(t*14+i*2);
      g.beginPath(); g.moveTo(x,y); g.quadraticCurveTo(x-s,y-s*fl,x-s*2,y+s*0.2); g.quadraticCurveTo(x-s,y+s*0.1,x,y+s*0.4); g.quadraticCurveTo(x+s,y+s*0.1,x+s*2,y+s*0.2); g.quadraticCurveTo(x+s,y-s*fl,x,y); g.fill(); } g.restore(); }
  function rain(F,t,k,ang){ if(k<=0.01) return; const g=F.g, a=(ang==null?0.28:ang), n=Math.round(230*k); g.save(); g.strokeStyle='rgba(170,210,230,'+(0.22+0.1*k)+')'; g.lineWidth=1; g.beginPath();
    for(let i=0;i<n;i++){ const sp=650+300*hash(i*5), L=14+16*hash(i*7), x=(hash(i)*(VW+200)-100+t*sp*a)%(VW+200)-100, y=((hash(i*13)*VH+t*sp)%(VH+60))-30; g.moveTo(x,y); g.lineTo(x-L*a,y-L); } g.stroke(); g.restore(); }
  function fog(F,t,y,k,col){ if(k<=0.01) return; const g=F.g; col=col||'120,150,170'; g.save(); const lg=g.createLinearGradient(0,y-90,0,VH); lg.addColorStop(0,'rgba('+col+',0)'); lg.addColorStop(1,'rgba('+col+','+(0.45*k)+')'); g.fillStyle=lg; g.fillRect(-50,y-90,VW+100,VH-y+150);
    for(let i=0;i<7;i++){ const x=((hash(i*3)*VW+t*(8+6*hash(i)))%(VW+300))-150, yy=y-20+hash(i*5)*50, r=120+80*hash(i*9); const rg=g.createRadialGradient(x,yy,0,x,yy,r); rg.addColorStop(0,'rgba('+col+','+(0.18*k)+')'); rg.addColorStop(1,'rgba('+col+',0)'); g.fillStyle=rg; g.fillRect(x-r,yy-r,2*r,2*r); } g.restore(); }
  function embers(F,t,k,col){ if(k<=0.01) return; const g=F.g; col=col||'255,150,60'; lightOn(g,()=>{ for(let i=0;i<60*k;i++){ const sp=20+40*hash(i*3), x=(hash(i)*VW+Math.sin(t*0.7+i)*30), y=VH-((t*sp+hash(i*7)*VH)%(VH+40)), a=0.5+0.5*Math.sin(t*6+i);
      g.fillStyle='rgba('+col+','+(0.55*a)+')'; g.fillRect(x,y,2,2); } }); }
  // ⚡ sét: dịch điểm giữa (băm theo seed) + nhánh, 3 lớp sáng · k = độ sáng (0–1)
  function boltPts(x0,y0,x1,y1,seed,det){ let P=[[x0,y0],[x1,y1]]; for(let it=0;it<(det||6);it++){ const Q=[P[0]]; for(let i=1;i<P.length;i++){ const [ax,ay]=P[i-1],[bx,by]=P[i], L=Math.hypot(bx-ax,by-ay), m=(hash(seed*31+it*7+i)-0.5)*L*0.45;
        const nx=-(by-ay)/L, ny=(bx-ax)/L; Q.push([(ax+bx)/2+nx*m,(ay+by)/2+ny*m],P[i]); } P=Q; } return P; }
  function bolt(F,x0,y0,x1,y1,seed,k,col,w){ if(k<=0.01) return; const g=F.g, P=boltPts(x0,y0,x1,y1,seed), cl=col||'200,240,255'; w=w||3;
    const line=(pts,lw,c)=>{ g.strokeStyle=c; g.lineWidth=lw; g.beginPath(); pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); };
    lightOn(g,()=>{ g.lineCap='round'; g.lineJoin='round'; line(P,w*6,'rgba('+cl+','+(0.12*k)+')'); line(P,w*2.2,'rgba('+cl+','+(0.45*k)+')'); line(P,w*0.8,'rgba(255,255,255,'+k+')');
      for(let b=0;b<4;b++){ const i0=Math.floor(P.length*(0.2+0.6*hash(seed+b*5))), p=P[i0]; if(!p) continue; const an=Math.atan2(y1-y0,x1-x0)+(hash(seed+b)-0.5)*1.6, L=Math.hypot(x1-x0,y1-y0)*(0.15+0.2*hash(seed+b*3));
        const Bp=boltPts(p[0],p[1],p[0]+Math.cos(an)*L,p[1]+Math.sin(an)*L,seed+b*17,4); line(Bp,w*1.2,'rgba('+cl+','+(0.35*k)+')'); line(Bp,w*0.4,'rgba(255,255,255,'+(0.7*k)+')'); } }); }
  const boltK=(t,a,d)=>{ if(t<a||t>a+(d||0.35)) return 0; const u=(t-a)/(d||0.35); return (u<0.12?1:u<0.2?0.3:u<0.3?0.9:1-u)*(1-u*0.3); };   // chớp: loé – tắt – loé lại – tắt dần
  // 🕯️ lửa nến: giọt lửa 2 tông + quầng, rung theo băm thời gian
  function flame(g,x,y,s,t,seed,k){ if(k<=0.01) return; const f=0.85+0.3*hash(Math.floor(t*14)+seed*7), h=s*2.2*f, sw=s*0.55*(0.9+0.2*hash(Math.floor(t*10)+seed));
    glowDot(g,x,y-h*0.4,s*7*k,'255,170,80',0.32*k);
    g.save(); g.globalAlpha=k; g.fillStyle='#ff9a2a'; g.beginPath(); g.moveTo(x,y-h); g.quadraticCurveTo(x+sw*1.6,y-h*0.3,x,y); g.quadraticCurveTo(x-sw*1.6,y-h*0.3,x,y-h); g.fill();
    g.fillStyle='#fff3c0'; g.beginPath(); g.moveTo(x,y-h*0.62); g.quadraticCurveTo(x+sw*0.7,y-h*0.2,x,y-h*0.02); g.quadraticCurveTo(x-sw*0.7,y-h*0.2,x,y-h*0.62); g.fill(); g.restore(); }
  // 🔥 lửa phun / cột lửa cel 2 tông (các lưỡi lửa băm theo khung 12 hình/s)
  function fireJet(F,x,y,dx,dy,len,wd,t,seed,k){ if(k<=0.01) return; const g=F.g, fr=Math.floor(t*12), an=Math.atan2(dy,dx), L=len*k;
    glowDot(g,x+Math.cos(an)*L*0.5,y+Math.sin(an)*L*0.5,L*0.9,'255,120,40',0.4*k);
    g.save(); g.translate(x,y); g.rotate(an); for(let i=0;i<7;i++){ const u=hash(fr*13+i+seed), ll=L*(0.55+0.45*u), ww=wd*(0.6+0.5*hash(fr*7+i+seed)), off=(hash(fr*3+i+seed)-0.5)*wd*0.8;
      g.fillStyle=i<4?'#ff6a1a':'#ffd060'; g.beginPath(); g.moveTo(0,off*0.3); g.quadraticCurveTo(ll*0.45,off-ww,ll,off*1.4); g.quadraticCurveTo(ll*0.45,off+ww,0,off*0.3); g.fill(); }
    g.fillStyle='#fff6d0'; g.beginPath(); g.moveTo(0,0); g.quadraticCurveTo(L*0.25,-wd*0.25,L*0.45,0); g.quadraticCurveTo(L*0.25,wd*0.25,0,0); g.fill(); g.restore(); }
  // 🔘 sóng âm (Bongo / Guitar): vòng tròn toả ra · nốt nhạc (Piano) · dây sáng (Mosquito)
  function ring(g,x,y,r,a,col,w){ if(a<=0.01) return; g.save(); g.strokeStyle='rgba('+col+','+a+')'; g.lineWidth=w||2; g.beginPath(); g.ellipse(x,y,r,r*0.55,0,0,TAU); g.stroke(); g.restore(); }
  const NOTE_COL=['255,90,90','255,170,60','255,230,80','120,230,110','80,200,255','150,120,255','230,110,230'];
  function note(g,x,y,s,col,a){ if(a<=0.01) return; g.save(); g.globalAlpha=a; g.fillStyle='rgb('+col+')'; g.strokeStyle='rgb('+col+')'; g.lineWidth=s*0.18; g.beginPath(); g.ellipse(x,y,s*0.42,s*0.3,-0.4,0,TAU); g.fill();
    g.beginPath(); g.moveTo(x+s*0.36,y-s*0.08); g.lineTo(x+s*0.36,y-s*1.3); g.quadraticCurveTo(x+s*0.8,y-s*1.0,x+s*0.75,y-s*0.65); g.stroke(); g.restore(); }

  // ═════════ BAN NHẠC: khung gốc theo phách + nhún nhẹ (không bóp méo) ═════════
  const beatI=(t,div)=>Math.floor(Math.max(0,beatF(t))*(div||1));
  const POSE={ sans:t=>'SX'+[0,1,2,1][beatI(t)%4], bongo:t=>{ const i=beatI(t,2); return (i%8===0)?'BG3':(i%2?'BG2':'BG1'); }, piano:t=>beatI(t)%2?'PC1':'PC0',
    // 🎸 anh 20/11: "tập trung vào tư thế tay lên xuống, dùng chuẩn theo cách chơi guitar theo điệu nhạc" — không phát lần lượt cả 11 khung:
    //   nền = QUẠT DÂY lên / xuống theo nốt 1/8 (cặp khung tay ở dây, 2 ô nhịp đổi cặp) · solo: sét đánh = HEADBANG đúng phách, cuối câu = NGẢ NGƯỜI (nốt cao),
    //   ô cuối solo = QUỲ GỐI rồi GIƠ TAY rock · tutti: headbang phách đầu mỗi câu 4 ô
    guitar:t=>{ const B=Math.max(0,beatF(t)), br=Math.floor(B/4), bb=B-br*4, e=Math.floor(B*2)%2;
      if(t>=SEC.gsolo&&t<SEC.tutti2){ const sb=Math.floor((t-SEC.gsolo)/B4), q=(t-SEC.gsolo)/P-sb*4;
        if(sb===7) return q<2?'EG_KNEEL':(q<3?'EG_FIST':'EG_O4'); if(sb%2===1&&q<1) return 'EG_BANG'; if(sb%4===2&&q>=2.5) return q<3.25?'EG_SKY':'EG_BACK'; }
      else if(br%4===0&&bb<0.5) return 'EG_BANG';
      return ((Math.floor(br/2)%2)?['EG_O1','EG_O2']:['EG_O3','EG_CALM'])[e]; }, mosq:t=>['MQ0','MQ1','MQ0','MQ2'][beatI(t)%4], bee:t=>'VB'+(1+beatI(t,2)%6) };
  const HB={ sans:1.0, bongo:0.8, piano:0.9, guitar:0.95, mosq:0.95, bee:0.85 };   // cỡ tương đối (Sans = 1)
  // vẽ 1 thành viên: chân (x,y), cao h · bob theo phách (lên nhanh về chậm), nghiêng nhẹ theo ô nhịp, côn trùng bay lơ lửng
  function member(F,t,who,x,y,h,o){ o=o||{}; const pb=pulse(t,0.16), sw=Math.sin((beatF(t)/4)*Math.PI)*0.025, fly=(who==='mosq'||who==='bee');
    const by=fly?Math.sin(t*2.1+(who==='bee'?1.5:0))*h*0.06:-pb*h*0.035, sy=fly?1:1-0.025*pb, sx=fly?1:1+0.015*pb;
    const play=o.play==null?(t>=(o.from||0)):o.play, key=play?POSE[who](t):(who==='sans'?'SX0':who==='bongo'?'BG0':who==='piano'?'PC0':who==='guitar'?'EG_CALM':who==='mosq'?'MQ0':'VB1');
    const photo=(who!=='sans'&&who!=='bongo');   // ảnh THẬT (Keyboard Cat, Guitar, Mosquito, Bee) → bớt rực cho gần nét vẽ phẳng
    const REF={sans:'SX0',bongo:'BG0',piano:'PC0',guitar:'EG_CALM',bee:'VB1'}[who];   // bộ khung cùng khổ → neo chung (Mosquito các ảnh khác khổ → cắt sát)
    return sprBlend(F,key,x,y+by,h*HB[who],Object.assign({rot:fly?Math.sin(t*1.7)*0.05:sw,sx,sy,shadow:!fly,desat:photo?0.28:0.1,foot:fly?0.2:0.5,slot:who+(o.slot||''),ref:REF},o)); }

  // ═════════ CẢNH (mỗi cảnh vẽ được trong 1 ô) ═════════
  const envOf=pal=>pal==='red'?['#c06070',0.35]:['#5a90a8',0.38], rimOf=pal=>pal==='red'?['#ff7a40',0.35]:['#a0fff0',0.28];
  function castleScene(F,t,zm,cx,cy,o){ o=o||{}; sky(F,t,{pal:o.pal||'cyan',moon:{x:VW*0.62,y:VH*0.26,r:95*zm},bats:6,cloudK:0.8}); const V=view(F,'CASTLE',zm,cx,cy); plate(F,V,{shade:['#3a6a80',0.15]});
    const [wx,wy]=V.at(0.705,0.45); g2glow(F,wx,wy,V.s(110),o.win==null?1:o.win,t); fog(F,t,VH*0.86,0.9); rain(F,t,o.rain==null?1:o.rain); return V; }
  function g2glow(F,x,y,r,k,t){ const g=F.g; lightOn(g,()=>{ glowDot(g,x,y,r*(1+0.06*Math.sin(t*9)),'255,160,70',0.45*k); glowDot(g,x,y,r*0.45,'255,210,140',0.5*k); }); }
  function balconyScene(F,t,zm,cx,cy,o){ o=o||{}; sky(F,t,{pal:'cyan',moon:{x:VW*0.82,y:VH*0.2,r:70},bats:4}); const V=view(F,'BALC',zm,cx,cy); plate(F,V,{shade:['#3a6a80',0.12]});
    const [gx,gy]=V.at(0.5,0.3); lightOn(F.g,()=>glowDot(F.g,gx,gy,V.s(330),'120,90,200',0.16+0.08*pulse(t,0.3))); return V; }
  // 🕯️ ĐẦU BẤC NẾN đo bằng tools/x/plate-grid.html (anh 20/11: "nến không chuẩn, phải rất để ý vị trí") — [u, v, cỡ lửa theo cỡ nến]. Mép phải ngoài khung đo = đối xứng.
  const CRYPT_C=[[0.0525,0.3012,9],[0.0816,0.2775,9],[0.1048,0.3107,9],[0.104,0.4751,7],[0.12,0.4656,8],[0.1349,0.4893,7],[0.188,0.5163,4.5],[0.2,0.4988,4.5],[0.2115,0.5154,4.5],
    [0.3381,0.4642,4.5],[0.3504,0.4528,4.5],[0.3629,0.4642,4.5],[0.6371,0.4642,4.5],[0.6496,0.4528,4.5],[0.6619,0.4642,4.5],[0.788,0.5154,4.5],[0.8,0.4988,4.5],[0.812,0.5163,4.5],
    [0.8664,0.4884,7],[0.8821,0.4576,8],[0.8981,0.4751,7],[0.9005,0.3116,9],[0.9232,0.2784,9],[0.9465,0.311,9]];
  function cryptScene(F,t,zm,cx,cy,o){ o=o||{}; const V=view(F,'CRYPT',zm,cx,cy); plate(F,V,{shade:['#2a4a5a',0.25]}); const on=o.lit==null?1:o.lit, g=F.g;
    CRYPT_C.forEach(([u,v,s],i)=>{ const [x,y]=V.at(u,v-0.002); flame(g,x,y,V.s(s),t,i+1,clamp(on*3-i*0.08,0,1)*(1+0.25*(o.drum?pulse(t,0.12):0))); }); fog(F,t,VH*0.9,0.5,'90,110,120'); return V; }
  const HALL_C=[[0.0314,0.4778,7],[0.0461,0.4543,7],[0.0666,0.4274,7],[0.086,0.4558,7],[0.1005,0.4793,7],[0.1679,0.5744,5],[0.1766,0.5611,5],[0.1875,0.5456,5],[0.1986,0.5623,5],[0.2076,0.5759,5],
    [0.246,0.61,4],[0.2529,0.5998,4],[0.261,0.5879,4],[0.2691,0.6003,4],[0.2761,0.6105,4],[0.7261,0.61,4],[0.7331,0.5998,4],[0.7414,0.588,4],[0.7495,0.5998,4],[0.7568,0.61,4],
    [0.7975,0.5744,5],[0.8069,0.5608,5],[0.8176,0.5448,5],[0.8287,0.5608,5],[0.8379,0.5744,5],[0.9012,0.4785,7],[0.916,0.4547,7],[0.9354,0.4274,7],[0.9548,0.4547,7],[0.9696,0.4785,7]];
  function hallScene(F,t,zm,cx,cy,o){ o=o||{}; const V=view(F,'HALL',zm,cx,cy); plate(F,V,{shade:['#2a4050',0.2]}); const on=o.lit==null?1:o.lit, g=F.g;
    HALL_C.forEach(([u,v,s],i)=>{ const [x,y]=V.at(u,v-0.002); flame(g,x,y,V.s(s),t,i+40,clamp(on*4-i*0.1,0,1)); }); const [ox,oy]=V.at(0.5,0.35); lightOn(g,()=>glowDot(g,ox,oy,V.s(420),'255,150,80',0.12*on)); return V; }
  function towerScene(F,t,zm,cx,cy,o){ o=o||{}; sky(F,t,{pal:o.pal||'storm',moon:o.moon,bats:3,cloudK:1,cloudSpd:2}); const V=view(F,'TOWER',zm,cx,cy); plate(F,V,{shade:['#30486a',0.15]}); return V; }
  function stairsScene(F,t,zm,cx,cy,o){ o=o||{}; sky(F,t,{pal:o.pal||'red',moon:{x:VW*0.7,y:VH*0.3,r:110,cres:o.cres==null?1:o.cres},bats:10}); const V=view(F,'STAIRS',zm,cx,cy); plate(F,V,{shade:['#503048',0.15]});
    const [lx,ly]=V.at(0.872,0.51); lightOn(F.g,()=>{ glowDot(F.g,lx,ly,V.s(90),'255,170,90',0.6); }); flame(F.g,lx,ly+V.s(12),V.s(7),t,77,1); return V; }
  function spireScene(F,t,zm,cx,cy,o){ o=o||{}; sky(F,t,{pal:'red',moon:{x:VW*0.5,y:VH*0.28,r:150,cres:1},bats:8,cloudSpd:1.6}); const V=view(F,'SPIRE',zm,cx,cy); plate(F,V,{shade:['#502a40',0.2]}); return V; }
  // 🏰 SÂN KHẤU nhà thờ đổ nát (bố cục theo ảnh mẫu anh gửi): trăng máu qua vòm hở, kính màu giữa sáng + viền neon, vòng ký tự trên sàn, gargoyle phun lửa ở cú nhấn
  function stageScene(F,t,zm,cx,cy,o){ o=o||{}; const g=F.g, lit=o.lit==null?1:o.lit;
    sky(F,t,{pal:o.pal||'red',moon:{x:VW*0.18,y:VH*0.2,r:62},bats:12,cloudK:0.9}); const V=view(F,'STAGE',zm,cx,cy); plate(F,V,{shade:['#2a1e34',lit>0.5?0.34:0.18],blur:zm>=2?1.4:0});
    // kính màu: chiếu sáng từ phía sau (clip theo vòm) + viền neon xanh / đỏ
    const arch=()=>{ const p=[[0.392,0.643],[0.392,0.17],[0.43,0.07],[0.5,0.015],[0.57,0.07],[0.607,0.17],[0.607,0.643]].map(([u,v])=>V.at(u,v)); g.beginPath(); p.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1])); };
    const wk=lit*(0.55+0.45*pulse(t,0.25));
    g.save(); arch(); g.clip(); g.globalCompositeOperation='lighter'; const [cx2,cy2]=V.at(0.5,0.35); glowDot(g,cx2,cy2,V.s(330),'255,80,120',0.35*wk); glowDot(g,cx2,cy2,V.s(160),'255,220,240',0.25*wk); g.restore();
    lightOn(g,()=>{ arch(); g.lineWidth=V.s(5); g.strokeStyle='rgba(80,230,255,'+(0.75*lit)+')'; g.stroke(); g.lineWidth=V.s(14); g.strokeStyle='rgba(80,230,255,'+(0.18*lit)+')'; g.stroke(); });
    // vòng ký tự trên sàn sân khấu: xanh + đỏ, xoay chậm, sáng theo phách
    const [rx,ry]=V.at(0.5,0.77), RR=V.s(330), rk=lit*(0.5+0.5*pulse(t,0.2));
    lightOn(g,()=>{ for(const [col,r0,dir] of [['80,220,255',1,1],['255,70,90',0.72,-1]]){ g.strokeStyle='rgba('+col+','+(0.55*rk)+')'; g.lineWidth=V.s(3); g.beginPath(); g.ellipse(rx,ry,RR*r0,RR*r0*0.16,0,0,TAU); g.stroke();
        for(let i=0;i<24;i++){ const a=i/24*TAU+t*0.2*dir, x=rx+Math.cos(a)*RR*r0*0.92, y=ry+Math.sin(a)*RR*r0*0.16*0.92; g.fillStyle='rgba('+col+','+(0.6*rk)+')'; g.fillRect(x-V.s(4),y-V.s(1.5),V.s(8),V.s(3)); } } });
    // gargoyle trên 2 bệ + phun lửa ở cú nhấn
    // gargoyle (anh 20/11: bỏ lửa vẽ tay — "không cần thiết, trông giả"): MẮT loé đỏ theo phách + cú nhấn phả KHÓI LẠNH trắng (kiểu máy CO2 sân khấu)
    const gk=o.fire||0, gT0=Math.max(cs(cycK(t)),t>=bar(19,3)?bar(19,3):-1); for(const [key,u,dir] of [['GL',0.165,1],['GR',0.835,-1]]){ const [x,y]=V.at(u,0.612); const r=spr(F,key,x,y,V.s(150),{env:['#7a6a90',0.35],rim:['#ff7a40',0.25*lit],shadow:false});
      // mắt / miệng ĐO trên ảnh (plate-grid): trái mắt (0.843,0.198) miệng (0.857,0.343) · phải mắt (0.164,0.196) miệng (0.150,0.343) — anh 20/11: mắt đỏ nhầm chỗ
      const E=dir>0?[0.843,0.198,0.857,0.343]:[0.164,0.196,0.150,0.343], at=(u,v)=>[x-r.w/2+u*r.w,y-r.h+v*r.h];
      if(r&&lit>0.5){ const [ex,ey]=at(E[0],E[1]); lightOn(g,()=>{ glowDot(g,ex,ey,r.w*0.09,'255,40,30',0.45+0.5*pulse(t,0.15)); glowDot(g,ex,ey,r.w*0.025,'255,210,190',0.85); }); }
      if(r&&gk>0){ const [mx,my]=at(E[2],E[3]); cryo(F,mx,my,dir,t,gT0,V); } }
    for(const [key,u] of [['AMP1',0.255],['AMP2',0.745]]){ const [x,y]=V.at(u,0.79); spr(F,key,x,y,V.s(120),{env:['#6a5a80',0.3],rim:['#ff7a40',0.2*lit]}); }
    // 🔦 đèn rọi quét từ trên (anh 20/11 "chưa đủ cháy"): 4 luồng đổi đỏ / xanh theo ô nhịp, sáng theo phách
    if(o.beams){ const red=Math.floor(Math.max(0,beatF(t))/4)%2===0; lightOn(g,()=>{ for(let i=0;i<4;i++){ const x0=VW*(0.15+0.23*i), sw=Math.sin(t*0.9+i*1.7)*VW*0.22, x1=x0+sw, col=(i%2===0)===red?'255,40,60':'40,200,255', a=0.06+0.07*pulse(t,0.14);   // soát 20/11: tia rộng + sáng quá phủ bạc cả sân khấu → mảnh, đậm màu, nhạt hơn
        const lg=g.createLinearGradient(x0,-20,x1,VH); lg.addColorStop(0,'rgba('+col+','+(a*1.3)+')'); lg.addColorStop(1,'rgba('+col+',0)'); g.fillStyle=lg; g.beginPath(); g.moveTo(x0-5,-20); g.lineTo(x0+5,-20); g.lineTo(x1+55,VH); g.lineTo(x1-55,VH); g.closePath(); g.fill(); } }); }
    // ✨ ĐÀI PHUN TIA LỬA LẠNH mép trước sân khấu (anh 20/11: thay cột lửa vẽ tay): phun ở phách đầu, cách 1 ô nhịp 1 lần — hạt có trọng lực, vệt đuôi, lấp lánh
    if(o.pyro!=null){ const bb=Math.floor(Math.max(0,beatF(t))/4), b0=bb-(bb%2), t0=T0+b0*4*P; for(const [u,s] of [[0.13,1],[0.27,2],[0.73,3],[0.87,4]]){ const [x,y]=V.at(u,0.86); sparkFount(F,x,y,t,t0,s+b0*7,V); } }
    return V; }
  function sparkFount(F,x,y,t,t0,seed,V){ const g=F.g, age=t-t0; if(age<0||age>1.8) return; const N=150, emit=0.8, G=V.s(1100), life=0.95;
    lightOn(g,()=>{ g.lineCap='round'; for(let i=0;i<N;i++){ const a=age-i/N*emit; if(a<0||a>life) continue; const h1=hash(seed*97+i), h2=hash(seed*31+i*7), v=V.s(760)*(0.7+0.4*h1), an=-Math.PI/2+(h2-0.5)*0.32;
        const vx=Math.cos(an)*v, vy=Math.sin(an)*v, px=x+vx*a, py=y+vy*a+0.5*G*a*a, dvy=vy+G*a, sp=Math.hypot(vx,dvy)||1, L=V.s(8)+sp*0.02, f=1-a/life, tw=0.6+0.4*hash(Math.floor(t*30)+i);
        const ex=px-vx/sp*L, ey=py-dvy/sp*L; g.strokeStyle='rgba(255,170,80,'+(0.35*f*tw).toFixed(3)+')'; g.lineWidth=V.s(5)*(0.5+0.5*f); g.beginPath(); g.moveTo(px,py); g.lineTo(ex,ey); g.stroke();   // quầng
        g.strokeStyle='rgba(255,'+Math.round(205+50*f)+','+Math.round(140+110*f)+','+(f*tw).toFixed(3)+')'; g.lineWidth=V.s(2.2)*(0.5+0.5*f); g.beginPath(); g.moveTo(px,py); g.lineTo(ex,ey); g.stroke(); }   // lõi
      glowDot(g,x,y,V.s(90),'255,200,120',0.55*Math.max(0,1-age/emit)); }); }
  // 💨 khói lạnh (CO2) phả ra từ miệng gargoyle: cụm khói tròn mềm nở ra, trôi theo hướng phả rồi tan
  //   soát 20/11: phả ngang thì che Mosquito / Bee → bốc LÊN trên đầu gargoyle, nhỏ + nhạt
  function cryo(F,x,y,dir,t,t0,V){ const age=t-t0; if(age<0||age>1.8) return; const g=F.g; for(let i=0;i<14;i++){ const a=age-i*0.03; if(a<0||a>1.3) continue; const f=a/1.3, d=V.s(20)+V.s(170)*eout(Math.min(1,a/0.9))*(0.8+0.4*hash(i*5));
      const px=x+dir*d*0.18+(hash(i*3)-0.5)*V.s(26)*f, py=y-d, r=V.s(12)+V.s(46)*f; const rg=g.createRadialGradient(px,py,0,px,py,r);
      rg.addColorStop(0,'rgba(225,235,245,'+(0.22*(1-f)).toFixed(3)+')'); rg.addColorStop(1,'rgba(225,235,245,0)'); g.fillStyle=rg; g.fillRect(px-r,py-r,2*r,2*r); } }
  // vị trí ban nhạc trên sân khấu (toạ độ tấm STAGE) — cao thấp khác nhau, không thành 1 hàng: Sans bệ cao giữa, 2 côn trùng bay 2 bên kính màu, 3 con dưới sân khấu tròn
  const SPOT={ sans:[0.5,0.645,190], mosq:[0.31,0.47,150], bee:[0.69,0.47,145], piano:[0.32,0.80,170], bongo:[0.5,0.84,150], guitar:[0.68,0.80,180] };   // soát 20/11: toàn cảnh ban nhạc nhỏ quá → to thêm ~1.25×
  // 🌟 NỔI BẬT người đang diễn (anh 20/11: "không để lẫn vào nền và effect"): đèn NGƯỢC sau lưng + vũng sáng dưới chân, ánh môi trường phủ NHẸ hơn (giữ màu gốc),
  //   nền đã tối + mờ hơn ở stageScene (o.focus), hiệu ứng lớn (lửa / đèn rọi) vẽ TRƯỚC người
  function bandOnStage(F,t,V,o){ o=o||{}; const pal=o.pal||'red', env=[envOf(pal)[0],envOf(pal)[1]*0.55], rim=[rimOf(pal)[0],rimOf(pal)[1]*1.4], g=F.g; const order=['sans','mosq','bee','piano','guitar','bongo'];
    for(const w of order){ if(o.only&&!o.only.includes(w)) continue; const [u,v,h]=SPOT[w], [x,y]=V.at(u,v), hh=V.s(h)*HB[w], fly=(w==='mosq'||w==='bee'), bk=0.3+0.15*pulse(t,0.2);
      lightOn(g,()=>{ glowDot(g,x,y-hh*0.5,hh*0.85,pal==='red'?'255,190,150':'170,230,255',bk); if(!fly){ g.save(); g.translate(x,y); g.scale(1,0.2); glowDot(g,0,0,hh*0.7,'255,210,170',0.35); g.restore(); } });
      const r=member(F,t,w,x,y,V.s(h),{env,rim,mist:fly?0:0.25,dark:o.dark||0});
      if(r&&o.sig) sig(F,t,w,x,y,r,V,o); } }
  // chữ ký từng con (đúng skill game) — chỉ khi o.sig
  function sig(F,t,w,x,y,r,V,o){ const g=F.g, b=beatF(t);
    // 🥁 Bongo (anh 20/11: bỏ vòng tròn, "vfx musical hơn"): mỗi cú gõ (1/8) = VẠCH NHẤN manga ngắn toả quanh mặt trống bên vừa gõ + 1 nốt nảy lên rồi rơi
    if(w==='bongo'){ const i8=Math.floor(b*2), ph=b*2-i8, side=(i8%2?1:-1), hx=x+side*r.w*0.22, hy=y-r.h*0.42, k=Math.max(0,1-ph*2.2);
      if(k>0) lightOn(g,()=>{ g.strokeStyle='rgba(255,240,210,'+(0.85*k)+')'; g.lineCap='round'; g.lineWidth=V.s(3.2); for(let j=0;j<5;j++){ const an=-Math.PI/2+side*0.25+(j-2)*0.42+(hash(i8*5+j)-0.5)*0.2, r0=r.w*0.16, r1=r0+r.w*(0.12+0.08*hash(i8+j))*(0.6+0.6*(1-k));
        g.beginPath(); g.moveTo(hx+Math.cos(an)*r0,hy+Math.sin(an)*r0*0.8); g.lineTo(hx+Math.cos(an)*r1,hy+Math.sin(an)*r1*0.8); g.stroke(); } });
      for(let j=0;j<4;j++){ const bi=i8-j*2; if(bi<0) continue; const u=(b*2-bi)/8, sd=bi*3.7; if(u>=1) continue; const nx=x+(hash(sd)-0.5)*r.w*1.1+u*(hash(sd+1)-0.5)*V.s(80), ny=y-r.h*0.6-Math.sin(u*Math.PI)*V.s(90)+u*V.s(30);
        note(g,nx,ny,V.s(14),NOTE_COL[bi%7],(1-u)*0.9); } }
    // 🎺 Sans: nốt nhỏ bay ra từ loa kèn theo phách
    if(w==='sans'){ for(let j=0;j<4;j++){ const bi=Math.floor(b)-j; if(bi<0) continue; const u=(b-bi)/4, sd=bi*5.1; note(g,x+r.w*0.42+u*V.s(110),y-r.h*0.72-u*V.s(50)+Math.sin(u*9+sd)*V.s(8),V.s(13),'150,220,255',(1-u)*0.8); } }
    if(w==='piano'){ for(let i=0;i<6;i++){ const bi=Math.floor(b*2)-i; if(bi<0) continue; const ph=(b*2-bi)/6, sd=bi*7.3; note(g,x+r.w*(-0.3+0.6*hash(sd))+ph*V.s(60)*(hash(sd+1)-0.3),y-r.h*0.6-ph*V.s(160),V.s(18),NOTE_COL[bi%7],1-ph); } }
    // 🎸 Guitar (anh 20/11: bỏ vòng tròn): DẢI KHUÔNG NHẠC 5 dòng uốn lượn chảy ra từ thân đàn, nốt màu trôi trên khuông (mỗi 1/8 thêm 1 nốt)
    if(w==='guitar'){ const ox=x+r.w*0.2, oy=y-r.h*0.4, L=V.s(o.solo?520:300), dir=o.dir||1, sp=V.s(5.5), ang=-0.35;
      const at=(f,l)=>{ const s=f*L, wav=Math.sin(f*5-t*3.2)*V.s(26)*f, nx=Math.sin(ang), ny=-Math.cos(ang); return [ox+dir*Math.cos(ang)*s+nx*((l-2)*sp*(0.5+f)+wav)*dir, oy+Math.sin(ang)*s+ny*((l-2)*sp*(0.5+f)+wav)]; };
      lightOn(g,()=>{ g.lineWidth=V.s(1.3); for(let l=0;l<5;l++){ g.beginPath(); for(let i=0;i<=24;i++){ const f=i/24, p=at(f,l); i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]); } const gr=g.createLinearGradient(ox,oy,at(1,2)[0],at(1,2)[1]);
          gr.addColorStop(0,'rgba(220,235,255,0.55)'); gr.addColorStop(1,'rgba(220,235,255,0)'); g.strokeStyle=gr; g.stroke(); } });
      for(let j=0;j<8;j++){ const bi=Math.floor(b*2)-j; if(bi<0) continue; const f=clamp((b*2-bi)/8,0,1)*0.95+0.05, l=Math.floor(hash(bi*3.3)*5), p=at(f,l); note(g,p[0],p[1],V.s(15)*(1-0.3*f),NOTE_COL[bi%7],1-f*0.9); } }
    // 🦟 Mosquito: 2 sợi DÂY đàn mảnh rung theo vĩ, toả ra sau lưng rồi mờ dần (soát 20/11: dây thẳng xuống mép khung trông lạ)
    // 🦟 Mosquito (anh 20/11: "làm nốt nhạc đơn giản thôi, cái tia xấu quá"): nốt nhạc ấm bay ra từ cây đàn theo phách, trôi lên rồi tan
    if(w==='mosq'){ for(let j=0;j<4;j++){ const bi=Math.floor(b)-j; if(bi<0) continue; const u=(b-bi)/4, sd=bi*4.3; note(g,x+r.w*(0.2+0.1*hash(sd))+u*V.s(70)*(hash(sd+2)-0.2),y-r.h*0.6-u*V.s(90)+Math.sin(u*8+sd)*V.s(6),V.s(14),['255,200,120','255,160,90','255,225,150'][bi%3],(1-u)*0.85); } }
    if(w==='bee'){ const n=Math.min(22,1+Math.floor(Math.max(0,b-(o.beeFrom||0)))); for(let i=0;i<n;i++){ const a=i/22*TAU+t*0.9, R=V.s(120)+V.s(30)*Math.sin(t*2+i), bx=x+Math.cos(a)*R*1.4, by=y-r.h*0.5+Math.sin(a)*R*0.6;
        spr(F,'BEE'+(1+i%3),bx,by,V.s(26),{shadow:false,rot:Math.sin(t*9+i)*0.2}); } } }
  // 🐱🐶 đám đông nhìn từ sân khấu (mặt hướng máy): 3 hàng, xếp theo bề ngang thật của ảnh (KHÔNG đè nhau), hàng sau tối + nhạt (không khí), ánh lửa cam hắt từ sân khấu
  function crowd(F,t,o){ o=o||{}; const g=F.g, rows=o.rows||[[VH*0.98,104,0],[VH*0.80,82,1],[VH*0.66,64,2]], gap=o.gap||10, back=o.back!=null?o.back:true; let idx=o.start||0;
    const placed=[]; for(let R=rows.length-1;R>=0;R--){ const [y,h,depth]=rows[R]; let x=-20+(depth%2)*h*0.4; const list=[];
      while(x<VW+20){ const k=CROWD[idx%CROWD.length]; idx++; const c=K.prep(F.I['C_'+k]); if(!c) { x+=h*0.6; continue; } const w=Math.min(h*1.6,h*c.sw/c.sh); list.push([k,x+w/2,w]); x+=w+gap+h*0.15*hash(idx); }
      placed.push([y,h,depth,list]); }
    for(const [y,h,depth,list] of placed){ const dk=depth*0.22;
      for(const [k,x,w] of list){ const ph=hash(k.length*13+x), b=pulse(t+ph*0.08,0.18), bob=-b*h*0.07-(o.jump?pulse(t,0.2,0.25)*h*0.16:0)/* jump: cả đám nhảy ĐỒNG LOẠT phách đầu ô */, spin=(k==='uiacat'||k==='maxwell')?Math.cos(t*TAU*1.0+ph*6):1;
        let key='C_'+k; if(k==='popcat') key=beatI(t+ph*0.1)%2?'C_popcat_o':'C_popcat'; if(k==='clappingcat') key='C_clap'+(1+beatI(t,2)%3);
        const rot=k==='damdamdidi'?Math.sin(beatF(t)*Math.PI)*0.18:Math.sin(beatF(t)*Math.PI/2+ph*6)*0.04;
        const yy=y+bob+(hash(x*3.1)-0.5)*h*0.12; spr(F,key,x,yy,h,{sx:spin,rot,env:['#c07050',0.25+dk],rim:['#ff8a40',0.35-0.1*depth],dark:o.sil!=null?o.sil:(back?0.15+dk*1.4:dk),shadow:depth===0});
        if(o.sticks!==false) sticks(g,t,x,yy,w,h,ph,o.sway,depth); }
      fog(F,t,y-h*0.2,0.25+0.1*depth,'90,60,70'); } }
  // 🎆 MỖI MEME 2 LIGHTSTICK cầm 2 bên (anh 20/11), LẮC ĐÚNG NHỊP: mặc định 1 lần lắc / phách (chạm đầu mút đúng lúc phách đánh) · sway:'slow' = qua lại theo ô nhịp (đoạn solo)
  const STICK_COL=['255,60,200','80,230,255','120,255,140','255,230,80','255,120,60','180,120,255'];
  function sticks(g,t,x,y,w,h,ph,sway,depth){ const slow=sway==='slow', B=beatF(t)-0.02*ph, sw=slow?Math.cos(Math.PI*B/2)*0.55:Math.cos(Math.PI*B)*0.42, col=STICK_COL[Math.floor(ph*97)%STICK_COL.length], L=h*0.46, dim=depth===2?0.6:1;
    lightOn(g,()=>{ g.lineCap='round'; for(const s of [-1,1]){ const hx=x+s*w*0.3, hy=y-h*0.36, an=-Math.PI/2+s*0.32+sw, tx=hx+Math.cos(an)*L, ty=hy+Math.sin(an)*L;
        g.strokeStyle='rgba('+col+','+(0.22*dim)+')'; g.lineWidth=h*0.1; g.beginPath(); g.moveTo(hx,hy); g.lineTo(tx,ty); g.stroke();
        g.strokeStyle='rgba('+col+','+(0.95*dim)+')'; g.lineWidth=h*0.035; g.beginPath(); g.moveTo(hx,hy); g.lineTo(tx,ty); g.stroke();
        g.strokeStyle='rgba(255,255,255,'+(0.8*dim)+')'; g.lineWidth=h*0.012; g.beginPath(); g.moveTo(hx+(tx-hx)*0.1,hy+(ty-hy)*0.1); g.lineTo(tx,ty); g.stroke();
        glowDot(g,tx,ty,h*0.14,col,0.35*dim); } }); }
  // 🐱 hàng bóng đen đám đông ở mép dưới khung sân khấu rộng (ngược sáng — thấy được viền sáng, không lộ PNG)
  // cảnh khán giả lúc SOLO: sảnh tối, 2 luồng đèn chậm, lightstick lắc qua lại theo ô nhịp (anh 20/11)
  function crowdShot(F,t,sway,start,col){ const g=F.g; g.fillStyle='#0b060d'; g.fillRect(-50,-50,VW+100,VH+100);
    lightOn(g,()=>{ for(let i=0;i<2;i++){ const x=VW*(0.3+0.4*i)+Math.sin(t*0.5+i*2)*90, lg=g.createLinearGradient(x,0,x,VH); lg.addColorStop(0,'rgba('+col+',0.2)'); lg.addColorStop(1,'rgba('+col+',0)'); g.fillStyle=lg;
      g.beginPath(); g.moveTo(x-12,0); g.lineTo(x+12,0); g.lineTo(x+170,VH); g.lineTo(x-170,VH); g.closePath(); g.fill(); } });
    fog(F,t,VH*0.62,0.6,'80,55,75'); crowd(F,t,{start:start%CROWD.length,sway}); embers(F,t,0.4); }
  function crowdSil(F,t,V,sway){ crowd(F,t,{rows:[[VH*1.06,70,0],[VH*1.0,58,1]],gap:6,back:true,sil:0.82,sway}); }   // soát 20/11: hàng mép dưới còn rõ màu → ngược sáng gần đen

  // ═════════ CÁC Ô (chia khung) ═════════
  // ô = đa giác (tỉ lệ khung) → clip, vẽ cảnh riêng trong ô, viền ô = vạch sáng mảnh
  // center: dời cảnh để GIỮA cảnh (nơi nhân vật đứng) nằm giữa ô — không thì ô hẹp chỉ thấy 1 lát mép cảnh (soát 20/11: Piano / Guitar lọt khỏi ô)
  function panel(F,poly,fn,center){ const g=F.g; g.save(); g.beginPath(); poly.forEach(([u,v],i)=>i?g.lineTo(u*VW,v*VH):g.moveTo(u*VW,v*VH)); g.closePath(); g.clip();
    if(center!==false){ const xs=poly.map(p=>p[0]), cx=(Math.min(...xs)+Math.max(...xs))/2; g.translate((cx-0.5)*VW,0); } fn(); g.restore(); }
  function edge(F,a,b,col,k){ const g=F.g; lightOn(g,()=>{ g.strokeStyle='rgba('+(col||'200,240,255')+','+(0.85*(k==null?1:k))+')'; g.lineWidth=2.2; g.beginPath(); g.moveTo(a[0]*VW,a[1]*VH); g.lineTo(b[0]*VW,b[1]*VH); g.stroke(); });
    g.save(); g.strokeStyle='#000'; g.lineWidth=5; g.globalCompositeOperation='destination-over'; g.restore(); }
  // cảnh "cận" của từng thành viên trong ô riêng (vị trí khi chưa lên sân khấu)
  function soloView(F,t,who,o){ o=o||{}; const z=o.z||1, k=o.k||0; const drift=(a,b)=>lerp(a,b,k);
    if(who==='sans'){ const V=balconyScene(F,t,z*1.05,0.5,drift(0.62,0.6)); const [x,y]=V.at(0.5,0.79); member(F,t,'sans',x,y,V.s(330),{env:envOf('cyan'),rim:rimOf('cyan'),from:SEC.sans,dark:o.dark||0}); rain(F,t,0.7); return V; }
    if(who==='bongo'){ const V=cryptScene(F,t,z*1.15,0.5,drift(0.62,0.6),{lit:o.lit,drum:1}); const [x,y]=V.at(0.5,0.84); const r=member(F,t,'bongo',x,y,V.s(260),{env:['#806040',0.3],rim:['#ffaa60',0.3],from:SEC.bp}); if(r&&t>=SEC.bp) sig(F,t,'bongo',x,y,r,V,{}); return V; }
    if(who==='piano'){ const V=hallScene(F,t,z*1.1,0.5,drift(0.66,0.64),{lit:o.lit}); const [x,y]=V.at(0.5,0.86); const r=member(F,t,'piano',x,y,V.s(300),{env:['#806050',0.3],rim:['#ffb070',0.3],from:SEC.bp}); if(r&&t>=SEC.bp) sig(F,t,'piano',x,y,r,V,{}); return V; }
    if(who==='guitar'){ const V=towerScene(F,t,z*1.1,0.5,drift(0.62,0.6),{}); const [x,y]=V.at(0.5,0.9); const r=member(F,t,'guitar',x,y,V.s(340),{env:envOf('cyan'),rim:['#c0d0ff',0.35],from:SEC.gtr}); if(r&&t>=SEC.gtr) sig(F,t,'guitar',x,y,r,V,{}); rain(F,t,1); return V; }
    // muỗi bay → lơ lửng GIỮA khung trên lòng cầu thang (anh 20/11: bị dính sát mép trên khung); máy căn theo giữa thân, không lia quá mép ảnh nền
    if(who==='mosq'||who==='bee'){ const V=stairsScene(F,t,z*1.2,who==='mosq'?0.47:0.72,who==='mosq'?drift(0.42,0.4):drift(0.5,0.48),{}); const [x,y]=who==='mosq'?V.at(0.47,0.56):V.at(0.75,0.72); const r=member(F,t,who,x,y,V.s(260),{env:envOf('red'),rim:rimOf('red'),from:SEC.vio});
      if(r&&t>=SEC.vio) sig(F,t,who,x,y,r,V,{beeFrom:beatF(SEC.vio)}); return V; } }
  const GRID6=[[[0,0],[0.34,0],[0.32,0.5],[0,0.5]],[[0.34,0],[0.67,0],[0.65,0.5],[0.32,0.5]],[[0.67,0],[1,0],[1,0.5],[0.65,0.5]],[[0,0.5],[0.32,0.5],[0.34,1],[0,1]],[[0.32,0.5],[0.65,0.5],[0.67,1],[0.34,1]],[[0.65,0.5],[1,0.5],[1,1],[0.67,1]]];
  function grid6(F,t){ const W=['sans','bongo','piano','guitar','mosq','bee']; GRID6.forEach((p,i)=>panel(F,p,()=>{ const g=F.g; g.save(); const cx=(p[0][0]+p[2][0])/2, cy=(p[0][1]+p[2][1])/2; g.translate(cx*VW,cy*VH); g.scale(0.5,0.5); g.translate(-VW/2,-VH/2); soloView(F,t,W[i],{z:1.25}); g.restore(); },false));
    edge(F,[0.34,0],[0.32,0.5]); edge(F,[0.67,0],[0.65,0.5]); edge(F,[0.32,0.5],[0.34,1]); edge(F,[0.65,0.5],[0.67,1]); edge(F,[0,0.5],[1,0.5]); }

  // ═════════ SHOT (mỗi ô nhịp 2s 1 góc trong đoạn tutti) ═════════
  const B4=4*P;   // 1 ô nhịp
  function label(F,t,a,txt,sub){ const k=seg(t,a,a+0.4)*(1-seg(t,a+2.6,a+3.2)); if(k<=0.01) return; const g=F.g; g.save(); g.globalAlpha=k; g.font='700 22px Georgia, serif'; g.fillStyle='#f4ecff'; g.shadowColor='rgba(0,0,0,0.8)'; g.shadowBlur=8;
    g.fillText(txt,36,VH-44); if(sub){ g.font='500 12px Georgia, serif'; g.fillStyle='rgba(220,210,240,0.85)'; g.fillText(sub,37,VH-26); } g.restore(); }
  // 🔥 năng lượng tutti (anh 20/11 "chưa đủ cháy, sôi động"): cột lửa phách đầu cách 1 ô · loé đèn theo phách · zoom giật phách đầu ô
  const pyroK=t=>{ const b=Math.floor(Math.max(0,beatF(t))/4); if(b%2) return 0; const a=T0+b*4*P; return t<a?0:Math.max(0,1-seg(t,a+0.15,a+0.75))*seg(t,a,a+0.06); };
  const punchK=t=>0.045*pulse(t,0.12,0.25);
  function beatFlash(F,t){ const g=F.g, a=0.05*pulse(t,0.09)+0.09*pulse(t,0.12,0.25); if(a>=0.01) lightOn(g,()=>{ g.fillStyle='rgba(255,140,90,'+a+')'; g.fillRect(-50,-50,VW+100,VH+100); });
    const k=cycK(t), st=t-cs(k); if(TUTTI_K.includes(k)&&k!==5&&st<0.12) K.flash(F,0.45*(1-st/0.12),'#fff1e0'); }   // loé ấm đầu mỗi vòng tutti
  // 1 vòng tutti = 8 shot dài [4,2,2,2,2,2,1,1] phách (nhanh – chậm đan xen): toàn → chính → cận → đám đông → toàn nghiêng → cận → chính → toàn
  const TSEG=[[0,4,'wide'],[4,2,'lead'],[6,2,'close'],[8,2,'crowd'],[10,2,'wide2'],[12,2,'close'],[14,1,'lead'],[15,1,'wide']];
  function tuttiShot(F,t,k){ const bt=(t-cs(k))/P, si=TSEG.findIndex(s=>bt>=s[0]&&bt<s[0]+s[1]), S0=TSEG[Math.max(0,si)], u=clamp((bt-S0[0])/S0[1],0,1), bi=Math.floor(bt/4), n=k*8+Math.max(0,si), kind=S0[2];
    const lead=k<9?['sans','guitar','piano','bongo'][k-5]:['mosq','bee','guitar','sans'][k-14]||'sans';
    const accent=(t-cs(k))<1.4, fire=accent&&(k===8||k===16||k===17)?1-seg(t,cs(k)+0.9,cs(k)+1.4):(bi===0&&bt<1.4?0.6*(1-bt/1.4):0), pyro=pyroK(t);
    if(kind!=='crowd'){ const who=kind==='close'?['piano','bongo','mosq','bee','guitar','sans'][n%6]:lead; const sp=SPOT[who]; const wide=kind==='wide'||kind==='wide2';
      const zm=wide?(kind==='wide2'?1.18:1.02)+0.04*u:2.3+0.15*u, cx=wide?(kind==='wide2'?(n%2?0.42:0.58):0.5):sp[0], cy=wide?(kind==='wide2'?0.6:0.55):sp[1]-0.12, roll=kind==='wide2'?(n%2?-0.06:0.06):0;
      const g=F.g; if(roll){ g.translate(VW/2,VH/2); g.rotate(roll); g.scale(1.1,1.1); g.translate(-VW/2,-VH/2); }
      const V=stageScene(F,t,zm,cx,cy,{fire,lit:1,beams:true,pyro}); bandOnStage(F,t,V,{sig:true,beeFrom:beatF(cs(5))}); fog(F,t,VH*0.95,0.5,'120,90,110'); embers(F,t,1.3);
      if(wide) crowdSil(F,t,V);
      if(k===6&&bi===3) blaster(F,t,V,bar(6,3)); if(k===17&&bi===3) blaster(F,t,V,bar(17,3));
      if(k===7&&bi===3) nyan(F,t,bar(7,3)); }
    else { const g=F.g; g.fillStyle='#120a12'; g.fillRect(0,0,VW,VH); lightOn(g,()=>{ for(let i=0;i<3;i++){ const x=VW*(0.2+0.3*i)+Math.sin(t*0.8+i*2)*120; const lg=g.createLinearGradient(x,0,x+Math.sin(t+i)*200,VH); lg.addColorStop(0,'rgba(255,120,80,0.28)'); lg.addColorStop(1,'rgba(255,120,80,0)'); g.fillStyle=lg; g.beginPath(); g.moveTo(x-20,0); g.lineTo(x+20,0); g.lineTo(x+Math.sin(t+i)*200+140,VH); g.lineTo(x+Math.sin(t+i)*200-140,VH); g.closePath(); g.fill(); } });
      fog(F,t,VH*0.6,0.6,'110,70,90'); crowd(F,t,{start:(n*7)%CROWD.length,jump:true}); embers(F,t,1.3); }
    beatFlash(F,t); }
  // tia Gaster Blaster bắn lên trời (chữ ký Sans, 1 lần / cao trào)
  function blaster(F,t,V,a){ const u=seg(t,a,a+1.6); if(u<=0||u>=1) return; const g=F.g; for(const [uu,dir] of [[0.38,-1],[0.62,1]]){ const [x,y]=V.at(uu,0.2); const s=V.s(140);
      spr(F,'SXB',x,y+s*0.3,s,{shadow:false,flip:dir>0,rot:dir*0.3}); const k=u<0.25?u/0.25*0.4:u<0.85?1:1-(u-0.85)/0.15; if(u>0.25) lightOn(g,()=>{ g.save(); g.translate(x,y-s*0.3); g.rotate(-Math.PI/2+dir*0.3);
        const lg=g.createLinearGradient(0,0,VH*1.5,0); lg.addColorStop(0,'rgba(255,255,255,'+k+')'); lg.addColorStop(1,'rgba(200,230,255,0)'); g.fillStyle=lg; g.fillRect(0,-s*0.22*k,VH*1.5,s*0.44*k); g.restore(); }); } }
  function nyan(F,t,a){ const u=seg(t,a,a+1.8); if(u<=0||u>=1) return; const g=F.g, x=lerp(-120,VW+120,u), y=VH*0.25+Math.sin(u*12)*10; const cols=['#ff3a3a','#ff9a2a','#ffe23a','#3ae04a','#3aa0ff','#7a4aff'];
    cols.forEach((c,i)=>{ g.fillStyle=c; g.fillRect(-20,y-24+i*7,x-30,7); }); spr(F,'C_nyancat',x,y+28,60,{shadow:false}); }

  // ═════════ KỊCH BẢN THEO GIÂY ═════════
  function frame(F,t){ const g=F.g; g.fillStyle='#000'; g.fillRect(-60,-60,VW+120,VH+120);
    // 1 · 0–12.5 intro: lâu đài trong giông (6s) → cửa sổ đại sảnh (4s) → ngọn nến (2.5s)
    if(t<6){ castleScene(F,t,1.0+0.05*seg(t,0,6),0.52,0.5,{}); const fl=boltK(t,4.9,0.4); if(fl>0) K.flash(F,fl*0.25,'#cfefff'); return; }
    if(t<10){ castleScene(F,t,2.4+0.3*seg(t,6,10),0.705,0.47,{win:1}); return; }
    if(t<T0){ const V=hallScene(F,t,3.6+0.4*seg(t,10,T0),0.18,0.5,{lit:0.25}); rain(F,t,0.15); return; }
    // 2 · 12.5 SÉT → bóng Sans mắt xanh → hiện màu · 3 · Sans thổi kèn trên ban công
    if(t<SEC.bp){ const b=Math.floor((t-T0)/B4), u=((t-T0)%B4)/B4;
      if(b===0){ const V=balconyScene(F,t,1.25,0.5,0.6); const [x,y]=V.at(0.5,0.79), rev=seg(t,T0+0.9,T0+1.6); const r=member(F,t,'sans',x,y,V.s(330),{env:envOf('cyan'),rim:rimOf('cyan'),from:T0+1.2,dark:1-rev});
        if(r){ const ek=seg(t,T0+0.35,T0+0.55)*(1-0.6*rev); lightOn(g,()=>{ glowDot(g,x-r.w*0.13,y-r.h*0.82,r.h*0.09,'80,200,255',ek); glowDot(g,x-r.w*0.13,y-r.h*0.82,r.h*0.03,'230,255,255',ek); }); }
        bolt(F,VW*0.72,-20,VW*0.6,VH*0.55,12,boltK(t,T0,0.5),null,4); K.flash(F,boltK(t,T0,0.5)*0.85,'#e8f8ff'); rain(F,t,0.8); label(F,t,T0+1.4,'SANS','the trombone of judgment'); return; }
      const z=[1,1.25,2.6,1.0][b], cy=[0.6,0.6,0.42,0.58][b]; const V=balconyScene(F,t,z+0.05*u,b===2?0.52:0.5,cy); const [x,y]=V.at(0.5,0.79); member(F,t,'sans',x,y,V.s(330),{env:envOf('cyan'),rim:rimOf('cyan'),from:T0});
      rain(F,t,0.7); fog(F,t,VH*0.95,0.4); label(F,t,T0+1.4,'SANS','the trombone of judgment'); return; }
    // 4 · 20.5 chia 3 ô: Sans | Bongo (hầm mộ) | Piano (đại sảnh) — nến bùng dần
    if(t<SEC.gtr){ const op=eout(seg(t,SEC.bp,SEC.bp+0.5)), a=lerp(1,0.34,op), lit=seg(t,SEC.bp,SEC.bp+2.5);
      panel(F,[[0,0],[a,0],[a-0.03,1],[0,1]],()=>soloView(F,t,'sans',{z:1.1}));
      if(op>0.01){ panel(F,[[a,0],[0.67,0],[0.64,1],[a-0.03,1]],()=>soloView(F,t,'bongo',{lit})); panel(F,[[0.67,0],[1,0],[1,1],[0.64,1]],()=>soloView(F,t,'piano',{lit})); edge(F,[a,0],[a-0.03,1]); edge(F,[0.67,0],[0.64,1]); }
      label(F,t,SEC.bp+0.6,'BONGO CAT  ·  PIANO CAT','the crypt and the great hall wake up'); return; }
    // 5 · 28.5 sét rạch ô thứ 4: Guitar trên đỉnh tháp
    if(t<SEC.build){ const op=eout(seg(t,SEC.gtr,SEC.gtr+0.35));
      const X=[0,0.25,0.5,0.75,1].map((x,i)=>i===0||i===4?x:lerp([0,0.34,0.67,1][i],x,op)); const P=i=>[[X[i],0],[X[i+1],0],[X[i+1]-(i<3?0.03:0),1],[X[i]-(i>0?0.03:0),1]];
      panel(F,P(0),()=>soloView(F,t,'sans',{z:1.1})); panel(F,P(1),()=>soloView(F,t,'bongo',{})); panel(F,P(2),()=>soloView(F,t,'piano',{})); panel(F,P(3),()=>soloView(F,t,'guitar',{}));
      for(let i=1;i<4;i++) edge(F,[X[i],0],[X[i]-0.03,1]); const bk=boltK(t,SEC.gtr,0.45); bolt(F,X[3]*VW,-10,(X[3]-0.03)*VW,VH+10,44,bk,null,3); K.flash(F,bk*0.4,'#e8f8ff');
      label(F,t,SEC.gtr+0.5,'ELECTRIC GUITAR CAT','lightning on the highest tower'); return; }
    // 6 · 36.6 dồn lên: mỗi ô nhịp 1 con toàn khung, mây cuộn nhanh dần
    if(t<SEC.vio){ const b=Math.floor((t-SEC.build)/B4), u=((t-SEC.build)%B4)/B4; soloView(F,t,['sans','bongo','piano','guitar'][b],{z:1.15+0.25*u+0.15*b,k:u}); const fl=boltK(t,bar(3,b)+1.2,0.3); K.flash(F,fl*0.2,'#e8f8ff'); return; }
    // 7 · 44.6 mây tím rách → trăng lưỡi liềm ĐỎ, 2 violin trên cầu thang → 6 ô
    if(t<SEC.tutti){ const b=Math.floor((t-SEC.vio)/B4);
      if(b===0){ const V=stairsScene(F,t,1.0+0.05*seg(t,SEC.vio,SEC.vio+B4),0.5,0.5,{cres:1}); const [mx,my]=V.at(0.45,0.56), [bx,by]=V.at(0.75,0.72);
        const r1=member(F,t,'mosq',mx,my,V.s(220),{env:envOf('red'),rim:rimOf('red'),from:SEC.vio}), r2=member(F,t,'bee',bx,by,V.s(160),{env:envOf('red'),rim:rimOf('red'),from:SEC.vio});
        if(r1) sig(F,t,'mosq',mx,my,r1,V,{}); if(r2) sig(F,t,'bee',bx,by,r2,V,{beeFrom:beatF(SEC.vio)}); const op=1-seg(t,SEC.vio,SEC.vio+0.6); if(op>0){ const V2=view(F,'STAIRS',1,0.5,0.5); g.save(); g.globalAlpha=op; g.fillStyle=PAL.storm.mid; g.fillRect(0,0,VW,VH); g.restore(); }
        label(F,t,SEC.vio+0.4,'VIOLIN MOSQUITO  ·  VIOLIN BUMBLEBEE','under the blood moon'); return; }
      grid6(F,t); return; }
    // 8 · 52.6 6 ô vỡ như kính → sân khấu nhà thờ · 9 · TUTTI
    if(t<SEC.brk){ const k=cycK(t); tuttiShot(F,t,k); const sh=seg(t,SEC.tutti,SEC.tutti+0.7); if(sh<1) shatter(F,t,sh); return; }
    // 10 · 84.7 phần 2: tắt đèn, mưa, chỉ còn Sans trong vệt trăng
    if(t<SEC.vsolo){ const u=seg(t,SEC.brk,SEC.vsolo); const V=stageScene(F,t,2.2+0.4*u,0.5,0.5,{pal:'cyan',lit:0.12}); bandOnStage(F,t,V,{only:['sans'],pal:'cyan'});
      lightOn(g,()=>{ const [x,y]=V.at(0.5,0.5); const lg=g.createLinearGradient(x,0,x,y+V.s(40)); lg.addColorStop(0,'rgba(170,240,255,0.25)'); lg.addColorStop(1,'rgba(170,240,255,0.04)'); g.fillStyle=lg; g.beginPath(); g.moveTo(x-V.s(40),0); g.lineTo(x+V.s(40),0); g.lineTo(x+V.s(120),y+V.s(40)); g.lineTo(x-V.s(120),y+V.s(40)); g.closePath(); g.fill(); });
      rain(F,t,0.8); fog(F,t,VH*0.9,0.7); return; }
    // 11 · 92.7 SOLO 2 VIOLIN trên đỉnh tháp cao nhất, trăng đỏ, sét nhánh ở ô nhịp chẵn
    if(t<SEC.gsolo){ const b=Math.floor((t-SEC.vsolo)/B4), u=((t-SEC.vsolo)%B4)/B4, view4=b%4;
      if(b===3||b===7){ crowdShot(F,t,'slow',b*9,'255,90,120'); return; }   // anh 20/11: đoạn solo có khán giả giơ lightstick lắc qua lại
      const zm=[1.0,1.9,1.9,1.3][view4], cx=[0.5,0.38,0.62,0.5][view4], cy=[0.42,0.42,0.42,0.45][view4];
      const V=spireScene(F,t,zm+0.06*u,cx,cy); if(b%2===0){ const bk=boltK(t,bar(10+(b>>2),b%4)+0.02,0.4); bolt(F,VW*(0.2+0.6*hash(b)),-10,VW*(0.3+0.4*hash(b+3)),VH*0.6,90+b,bk,'255,190,200',2.5); K.flash(F,bk*0.15,'#ffe0e8'); }
      const [mx,my]=V.at(0.4,0.42), [bx,by]=V.at(0.6,0.42); const r1=member(F,t,'mosq',mx,my,V.s(150),{env:envOf('red'),rim:rimOf('red')}), r2=member(F,t,'bee',bx,by,V.s(140),{env:envOf('red'),rim:rimOf('red'),flip:false});
      if(r1) sig(F,t,'mosq',mx,my,r1,V,{}); if(r2) sig(F,t,'bee',bx,by,r2,V,{beeFrom:beatF(SEC.vsolo)-22}); embers(F,t,0.5,'255,120,140'); return; }
    // 12 · 108.7 SOLO GUITAR TRÊN SÂN KHẤU (anh 20/11): TẮT HẾT ĐÈN, chỉ 1 vệt đèn rọi xuống Guitar đứng giữa phía trước, máy zoom vào nó,
    //   khán giả bên dưới giơ lightstick lắc qua lại theo ô nhịp · sét đánh xuống đàn ở ô nhịp lẻ (qua mái vòm hở)
    if(t<SEC.tutti2){ const b=Math.floor((t-SEC.gsolo)/B4), u=((t-SEC.gsolo)%B4)/B4;
      if(b===2||b===6){ crowdShot(F,t,'slow',b*11,'255,230,200'); return; }
      const zm=[1.15,1.9,0,2.6,1.4,2.2,0,2.9][b], cy=[0.66,0.68,0,0.66,0.67,0.69,0,0.67][b];
      const V=stageScene(F,t,zm+0.08*u,0.5,cy,{lit:0.06,pal:'red'}); g.save(); g.globalAlpha=0.6; g.fillStyle='#030208'; g.fillRect(-50,-50,VW+100,VH+100); g.restore();   // tắt đèn: cả sân khấu chìm tối
      const [x,y]=V.at(0.5,0.86), H=V.s(230);
      lightOn(g,()=>{ const lg=g.createLinearGradient(x,-20,x,y); lg.addColorStop(0,'rgba(255,240,215,0.32)'); lg.addColorStop(1,'rgba(255,240,215,0.1)'); g.fillStyle=lg; g.beginPath(); g.moveTo(x-H*0.12,-20); g.lineTo(x+H*0.12,-20); g.lineTo(x+H*0.75,y+H*0.05); g.lineTo(x-H*0.75,y+H*0.05); g.closePath(); g.fill();
        g.save(); g.translate(x,y); g.scale(1,0.22); glowDot(g,0,0,H*0.9,'255,235,205',0.55); g.restore(); });
      const r=member(F,t,'guitar',x,y,H,{env:['#c09080',0.15],rim:['#fff0dc',0.6],mist:0.2}); if(r) sig(F,t,'guitar',x,y,r,V,{solo:true});
      if(b%2===1){ const a=bar(12+(b>>2),b%4), bk=boltK(t,a,0.45); if(r) bolt(F,x+(hash(b)-0.5)*VW*0.5,-10,x+r.w*0.1,y-r.h*0.45,200+b,bk,null,4); K.flash(F,bk*0.35,'#eef6ff'); }
      crowdSil(F,t,V,'slow'); embers(F,t,0.4); return; }
    // 13 · 124.8 TUTTI lại (lửa mạnh hơn) · 14 · 156.9 KẾT riff: mỗi ô nhịp 1 con cận mặt
    if(t<SEC.fin){ tuttiShot(F,t,cycK(t)); const rk=1-seg(t,SEC.tutti2,SEC.tutti2+0.5); if(rk>0) K.flash(F,rk*0.7,'#fff'); return; }
    if(t<SEC.end){ const b=Math.floor((t-SEC.fin)/B4), who=['sans','bongo','piano','guitar','mosq','bee','all','all'][b]; const u=((t-SEC.fin)%B4)/B4;
      if(who==='all'){ const V=stageScene(F,t,1.02+0.08*u,0.5,0.55,{fire:b===7?seg(t,bar(19,3),bar(19,3)+0.3):0.5,beams:true,pyro:Math.max(pyroK(t),b===7?seg(t,bar(19,3),bar(19,3)+0.4):0)}); bandOnStage(F,t,V,{sig:true,beeFrom:beatF(cs(5))}); crowdSil(F,t,V); embers(F,t,1.5); fog(F,t,VH*0.95,0.5,'120,90,110'); beatFlash(F,t); return; }
      const sp=SPOT[who], V=stageScene(F,t,2.8+0.25*u,sp[0],sp[1]-0.12,{fire:0,beams:true,pyro:pyroK(t)}); bandOnStage(F,t,V,{sig:true,beeFrom:beatF(cs(5))}); embers(F,t,1.3); beatFlash(F,t); return; }
    // 15 · 172.9 nốt kết: tia sét khổng lồ đánh xuống cả lâu đài → trắng xoá → lâu đài lặng dưới trăng xanh
    { const u=seg(t,END,DUR); const V=castleScene(F,t,1.0-0.03*u,0.52,0.5,{rain:0.35,win:0.4}); const bk=boltK(t,END,0.8); bolt(F,VW*0.62,-20,VW*0.6,VH*0.5,333,bk,null,9); K.flash(F,Math.max(bk,1-seg(t,END,END+1.2)),'#ffffff');
      const tk=seg(t,END+1.4,END+2.4); if(tk>0){ g.save(); g.globalAlpha=tk; g.textAlign='center'; g.font='700 46px Georgia, serif'; g.fillStyle='#eafcff'; g.shadowColor='rgba(80,220,255,0.8)'; g.shadowBlur=18; g.fillText('MEGALOVANIA',VW/2,VH*0.86); g.font='500 14px Georgia, serif'; g.shadowBlur=6; g.fillText('MEME BAND  ·  LIVE AT THE CASTLE',VW/2,VH*0.86+26); g.restore(); } } }
  // 🪟 6 ô vỡ như kính (0.7s): mảnh tam giác băm theo chỉ số, văng ra + xoay + rơi, mỗi mảnh mang 1 phần khung 6 ô (vẽ lại khung 6 ô ở thời điểm vỡ rồi cắt theo mảnh)
  let SH_CV=null;
  function shatter(F,t,u){ const g=F.g, SCk=F.SC||1; if(!SH_CV||SH_CV.width!==Math.round(VW*SCk)){ SH_CV=K.mk(Math.round(VW*SCk),Math.round(VH*SCk)); SH_CV._done=false; }
    if(!SH_CV._done){ const x=SH_CV.getContext('2d'); x.setTransform(SCk,0,0,SCk,0,0); const F2=Object.assign({},F,{g:x}); grid6(F2,SEC.tutti-0.01); SH_CV._done=true; }
    const N=7, M=4; for(let i=0;i<N;i++) for(let j=0;j<M;j++) for(let tri=0;tri<2;tri++){ const s=i*31+j*7+tri, x0=i/N*VW, y0=j/M*VH, w=VW/N, h=VH/M;
      const pts=tri?[[x0,y0],[x0+w,y0],[x0+w*hash(s),y0+h]]:[[x0+w*hash(s),y0+h],[x0+w,y0],[x0+w,y0+h]]; if(!tri) pts.push([x0,y0+h]);
      const cx=pts.reduce((a,p)=>a+p[0],0)/pts.length, cy=pts.reduce((a,p)=>a+p[1],0)/pts.length, dx=(cx-VW/2)/VW, dy=(cy-VH/2)/VH, e=ein(u);
      g.save(); g.translate(cx+dx*e*VW*0.9,cy+dy*e*VH*0.6+e*e*VH*0.5); g.rotate((hash(s+3)-0.5)*e*3); g.scale(1-0.3*e,1-0.3*e); g.translate(-cx,-cy); g.globalAlpha=1-seg(u,0.6,1);
      g.beginPath(); pts.forEach((p,q)=>q?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.closePath(); g.clip(); g.drawImage(SH_CV,0,0,VW,VH); g.strokeStyle='rgba(220,250,255,0.8)'; g.lineWidth=1.5; g.stroke(); g.restore(); }
    K.flash(F,0.6*(1-seg(u,0,0.25)),'#fff'); }

  // ═════════ KHAI BÁO PHIM ═════════
  CineKit.film({ id:'megaband', title:'Megalovania · Meme Band in the Castle', DUR, VW, VH, fadeIn:false, fadeOut:true, imgs:IMG, cast:['sx'],
    sfx:[[SEC.tutti,'ep3_glass',0.55,1.2,'6 ô hình vỡ như kính, mở ra sân khấu nhà thờ']],
    mus:[{src:'assets/audio/mb_mix.webm', ra:0, rb:DUR, off:0, vol:1, fi:0, fo:0.4}],
    shots:[{t0:0,t1:DUR,a:{tx:0,ty:100,tz:0,dist:600,yaw:0,pitch:0,fov:50},ease:'lin'}],
    world:(F,t)=>{ F.list.push({d:-1e9, fn:()=>{ const g=F.g; g.save(); if(isTutti(t)){ const s=1+punchK(t); g.translate(VW/2,VH/2); g.scale(s,s); g.translate(-VW/2,-VH/2); } frame(F,t); g.restore(); }}); },
    shake:t=>{ let s=0; const h=(a,amp,d)=>{ if(t>=a&&t<a+d) s=Math.max(s,amp*(1-(t-a)/d)); }; h(T0,7,0.5); h(SEC.gtr,4,0.4); h(SEC.tutti,8,0.6); h(SEC.tutti2,6,0.5); h(END,12,1.0);
      for(let b=0;b<8;b+=2) h(bar(12+(b>>2)+0,(b+1)%4),5,0.35); for(const k of TUTTI_K){ h(cs(k),6,0.45); for(let b=1;b<4;b++) h(bar(k,b),2.2,0.2); } return s; },
    // khung impact 2 màu ở đầu mỗi vòng tutti (bỏ vòng 5 — đang vỡ kính) + tách RGB
    // (soát 20/11) BỎ khung impact: cảnh tối → không tách được người, cả khung thành 1 mảng màu đặc trông như lỗi. Thay = loé sáng ấm 0.12s đầu vòng (beatFlash) + RGB + rung.
    grade:t=>{ const E=K.edit; return E.mix(E.rgb(t,T0,0.4,6),E.rgb(t,SEC.tutti,0.5,8),E.rgb(t,END,0.8,10),...TUTTI_K.map(k=>E.rgb(t,cs(k),0.3,5))); } });
  function isTutti(t){ const k=cycK(t); return TUTTI_K.includes(k); }
})();
