// 😎 Final Part 1 · CẢNH CHILL GUY (16/11/2026, kịch bản anh duyệt: prompts/kich-ban/fin1-chillguy-ending.md [A]) — id `fin1c6`, đặt sau fin1c5, trước trận Bat Cat
// Dựng 2D THEO LỚP: nền vẽ tay (phố đổ nát) + vật rời phông xanh (toà nhà nghiêng, xe, cột đèn, mảng tường, nửa toà nhà) + meme ẢNH GỐC + VFX code. Mỗi shot 1 góc tĩnh.
(function(){
  if(!window.CineKit || CineKit.films.fin1c6) return;
  const BASE=((document.currentScript&&document.currentScript.src)||'js/film-fin1c6.js').replace(/film-[^\/]*$/,''), V=window.GAME_VERSION?'?v='+GAME_VERSION.build:'';
  for(const [gl,f] of [['Fin1Plate','fin1-plate.js'],['Fin1Fight','fin1-fight.js']]) if(!window[gl]){ try{ const x=new XMLHttpRequest(); x.open('GET',BASE+f+V,false); x.send(); (0,eval)(x.responseText); }catch(e){} }
  const P=Fin1Plate(), {K,seg,lerp,clamp,hash,eout,ein,eio,TAU,VW,VH,bg,spr,obj,puff,dust,ring,streak,zap,sparks,star4,impact3,embers}=P, C=K.cam;
  const T={ help:2.6, tilt:4.4, dive:5.8, crash:6.5, sense:7.2, turn:8.6, dodge:9.35, carHit:9.6, emerge:10.2, rin:11.2, lift:11.8, fire:13.4, f1:13.55, f2:14.35, f3:15.15, f4:15.95, half:16.6, halfHit:17.0, clear:18.2, rage:19.4, dash:20.6, block:21.15, calm:22.2, nod:23.0, run:23.6, face:24.6, DUR:27.0 };
  const av=k=>'assets/avatars/'+k+'/avatarUrl.webp';
  const CROWD=['popcat','huhcat','cornelius','kermit','cheems','nyancat','suscat','wetcat','scareddog','scaredhamster','capybara','rickroll','yuki','gary','smartguy','droolingcat','poordog','calmdog'];
  const IMG={ BST:'assets/img/cine/FIN_C6_BG_STREET.jpg', OBJ:'assets/img/cine/FIN_C6_OBJS.png', ZRK:'assets/img/cine/FIN_F1_ROCKS.png',
    CG:av('chillguy'), CGK:'assets/avatars/chillguy/skill1AvatarUrl.webp', BAN:av('bananacat'), BANC:'assets/avatars/bananacat/attackAvatarUrl.webp',
    PAINU:'assets/img/cine/FIN_P6.png', PAINP:'assets/img/cine/MVD_PAIN_PUSH.png', PAIN:'assets/img/cine/FIN_P9.png', PAINB:'assets/img/depressedcat/DP_PAIN_IMG.webp',
    GOJO:'assets/img/cine/FIN_G6.png', GOJO9:'assets/img/cine/FIN_G9.png' };
  for(const k of CROWD) IMG['CR_'+k]=av(k);
  // tấm vật rời (thứ tự: toà nhà nghiêng · xe · cột đèn · mảng tường 1–3 · nửa toà nhà) — toạ độ trong FIN_C6_OBJS.png (dò vùng liền khối)
  const OB={tilt:[124,34,294,454],car:[572,308,392,154],lamp:[1210,60,174,426],w1:[76,588,308,348],w2:[454,698,148,232],w3:[654,782,168,148],half:[946,526,526,466]};
  const GY=VH*0.86, NM=VH*0.2;
  const runner=(F,t,list,y0,h0,dir,seed)=>{ for(let i=0;i<list.length;i++){ const sp=0.18+0.12*hash(seed+i), ph=hash(seed+i+7), x=((ph+t*sp)%1.25)-0.12, dep=hash(seed+i+13), y=y0+dep*VH*0.1, h=h0*(0.7+0.5*dep), bob=Math.abs(Math.sin(t*12+i))*h*0.05;
      spr(F,'CR_'+list[i],dir>0?x*VW:VW-x*VW,y-bob,h,{flip:dir<0,rot:dir*0.08}); } };   // dân meme chạy loạn nhún nhảy
  const SHOTS=[
    // A1 phố đổ nát, mưa gạch, dân meme chạy loạn
    [0,T.help,(F,t,u)=>{ const g=F.g; bg(F,'BST',lerp(1.05,1.0,u),0.5,0.55); runner(F,t,CROWD.slice(0,9),VH*0.72,NM*0.9,1,10); runner(F,t,CROWD.slice(9),VH*0.8,NM,-1,40);
      for(let i=0;i<8;i++){ const k=((t*0.7+hash(i+60))%1); obj(F,'ZRK',[740,842,88,106],VW*hash(i+61),k*VH*0.9,VH*0.04,k*6); } embers(g,t,24); }],
    // A2 Chill Guy đi NGƯỢC dòng người, đỡ 1 con vấp ngã đứng dậy
    [T.help,T.tilt,(F,t,u)=>{ const g=F.g; bg(F,'BST',1.45,0.5,0.62); runner(F,t,CROWD.slice(2,8),VH*0.96,VH*0.32,1,20);
      const x=lerp(VW*0.62,VW*0.5,u); spr(F,'CG',x,VH*1.0,VH*0.55,{flip:true}); const up=seg(t,T.help+0.8,T.help+1.3); spr(F,'CR_popcat',x-VW*0.14,VH*1.0,VH*0.3,{rot:(1-up)*1.2,sy:lerp(0.6,1,up)}); embers(g,t,14); }],
    // A3 góc ngước: toà nhà nghiêng đổ xuống chỗ Banana Cat đang ngồi khóc
    [T.tilt,T.dive,(F,t,u)=>{ const g=F.g; bg(F,'BST',1.3,0.35,0.7); const k=ein(u); obj(F,'OBJ',OB.tilt,lerp(VW*0.72,VW*0.55,k),lerp(VH*0.25,VH*0.42,k),VH*1.1,-0.2-k*0.75);   /* toà nhà đổ ập về phía Banana */
      g.save(); g.fillStyle='rgba(0,0,0,'+(0.15+0.35*u)+')'; g.fillRect(0,0,VW,VH); g.restore(); spr(F,'BANC',VW*0.35,VH*1.02,VH*0.5); for(let i=0;i<6;i++) obj(F,'ZRK',[1018,866,104,80],VW*(0.5+0.3*hash(i+70)),((t-T.tilt)*1.4+hash(i+71))%1*VH,VH*0.035,t*4+i); }],
    // A4 Chill Guy lao tới ôm Banana lăn ra — mảng tường đập xuống ngay sau lưng
    [T.dive,T.sense,(F,t,u)=>{ const g=F.g; bg(F,'BST',1.3,0.4,0.66); const d=seg(t,T.dive,T.dive+0.35), x=lerp(VW*0.85,VW*0.3,eout(d));
      if(t<T.dive+0.35) streak(g,VW*0.95,VH*0.72,x,VH*0.74,VH*0.06,'180,220,255',null,0.7);
      const k=seg(t,T.dive+0.1,T.crash); if(t<T.crash) obj(F,'OBJ',OB.w2,VW*0.55,lerp(-VH*0.2,VH*0.72,ein(k)),VH*0.38,0.3); else obj(F,'OBJ',OB.w2,VW*0.55,VH*0.76,VH*0.38,0.42);
      spr(F,'CG',x,VH*0.98,VH*0.5,{rot:t<T.dive+0.6?-0.9*Math.sin(Math.PI*seg(t,T.dive+0.25,T.dive+0.6)):0,ghost:t<T.dive+0.35?[-VW*0.05,0,3]:null}); spr(F,'BANC',x+VW*0.04,VH*0.9,VH*0.26,{rot:-0.3});
      if(t>=T.crash){ dust(g,VW*0.55,VH*0.86,seg(t,T.crash,T.crash+1.0),VW*0.3,'150,130,120',5); sparks(g,VW*0.55,VH*0.8,T.crash,t,24,200,'255,200,120',8); } }],
    // A5 cận: đặt Banana xuống, khựng — LINH CẢM (nhạc tắt)
    [T.sense,T.turn,(F,t,u)=>{ const g=F.g; bg(F,'BST',1.8,0.45,0.6,{blur:3}); spr(F,'BAN',VW*0.28,VH*1.05,VH*0.42); spr(F,'CG',VW*0.62,VH*1.4,VH*1.25*lerp(1,1.05,u),{shadow:false,flip:u>0.6});
      if(u>0.5){ const k=seg(u,0.5,0.7); g.save(); g.strokeStyle='rgba(255,255,255,'+(0.8*(1-Math.abs(k*2-1)))+')'; g.lineWidth=3; for(let i=0;i<5;i++){ const an=-Math.PI*0.5+(i-2)*0.3; g.beginPath(); g.moveTo(VW*0.62+Math.cos(an)*VH*0.3,VH*0.25+Math.sin(an)*VH*0.3); g.lineTo(VW*0.62+Math.cos(an)*VH*0.42,VH*0.25+Math.sin(an)*VH*0.42); g.stroke(); } g.restore(); } }],   // vạch linh cảm kiểu manga trên đầu
    // A6 qua vai: chiếc XE bay thẳng tới → Chill Guy nhảy sang bên né, xe cày nát mặt đường
    [T.turn,T.emerge,(F,t,u)=>{ const g=F.g; bg(F,'BST',1.15,0.5,0.58); const k=seg(t,T.turn+0.2,T.carHit), cx=lerp(VW*0.5,VW*0.45,k), cy=lerp(VH*0.45,VH*0.78,k), ch=lerp(VH*0.08,VH*0.6,ein(k));
      const jump=seg(t,T.dodge-0.1,T.dodge+0.3), gx=lerp(VW*0.48,VW*0.12,eout(jump)); spr(F,'CG',gx,VH*1.02-Math.sin(Math.PI*jump)*VH*0.12,VH*0.55,{rot:-0.5*Math.sin(Math.PI*jump)});
      if(t<T.carHit) obj(F,'OBJ',OB.car,cx,cy,ch,t*6); else { const v=seg(t,T.carHit,T.carHit+0.6); obj(F,'OBJ',OB.car,lerp(VW*0.45,VW*0.6,eout(v)),VH*0.84,VH*0.4,lerp(0.8,3.4,eout(v))); dust(g,VW*0.5,VH*0.9,seg(t,T.carHit,T.carHit+1.2),VW*0.35,'140,120,110',15); sparks(g,VW*0.5,VH*0.85,T.carHit,t,40,300,'255,200,110',16); } }],
    // A7 góc ngước: Depressed (Pain) lơ lửng bước ra từ khói, Rinnegan loé
    [T.emerge,T.lift,(F,t,u)=>{ const g=F.g; bg(F,'BST',1.5,0.55,0.4,{alpha:0.7}); const fy=Math.sin(t*2)*6; spr(F,'PAIN',VW*0.5,VH*0.95+fy,VH*0.85,{shadow:false,dark:0.5*(1-seg(t,T.emerge,T.emerge+0.8))});
      for(let i=0;i<8;i++) puff(g,VW*(0.2+0.6*hash(i+80))+(i%2?1:-1)*u*VW*0.15,VH*(0.55+0.4*hash(i+81)),VH*0.25,0.5*(1-u*0.6),'70,60,62');
      if(t>=T.rin&&t<T.rin+0.4){ g.save(); g.globalCompositeOperation='lighter'; const a=1-seg(t,T.rin,T.rin+0.4); puff(g,VW*0.478,VH*0.29+fy,VH*0.05,a,'190,140,255'); puff(g,VW*0.54,VH*0.28+fy,VH*0.05,a,'190,140,255'); g.restore(); } }],
    // A8 Pain giơ 2 tay: đá, cột đèn, mảng tường bị hút lên lơ lửng quanh người
    [T.lift,T.fire,(F,t,u)=>{ const g=F.g; bg(F,'BST',1.2,0.5,0.55); spr(F,'PAINU',VW*0.5,VH*0.9,VH*0.6,{glow:'#b48cff',glowA:0.3});
      const it=[['lamp',0.22,0.35,0.3],['w1',0.78,0.3,0.2],['w3',0.3,0.15,0.16],['w2',0.7,0.12,0.2]]; it.forEach(([k,x,y,h],i)=>{ const r=eout(seg(t,T.lift+0.1*i,T.lift+0.8+0.1*i)); obj(F,'OBJ',OB[k],VW*x,lerp(VH*0.95,VH*y,r)+Math.sin(t*3+i)*6,VH*h,Math.sin(t+i)*0.2); });
      for(let i=0;i<10;i++){ const r=eout(seg(t,T.lift+0.05*i,T.lift+0.9)); obj(F,'ZRK',[1330,864,74,74],VW*(0.15+0.7*hash(i+90)),lerp(VH*0.95,VH*(0.2+0.5*hash(i+91)),r),VH*0.03,t*2+i); } }],
    // A9 tràng bắn liên tục: Chill Guy chạy, né trái, né phải, lăn — mỗi món sát hơn (4 góc ngắn)
    ...[[T.fire,T.f2,'lamp',-1],[T.f2,T.f3,'w1',1],[T.f3,T.f4,'w3',-1],[T.f4,T.half,'w2',1]].map(([a,b,k,dir],i)=>[a,b,(F,t,u)=>{ const g=F.g; bg(F,'BST',1.3+0.1*i,0.5+0.1*dir,0.6); const fx=dir>0?VW*0.2:VW*0.8;
      const run=VW*0.5+dir*VW*0.05*Math.sin(t*3), dg=seg(t,a+0.25,a+0.45), gx=run+dir*VW*0.22*eout(dg); spr(F,'CG',gx,VH*1.0-Math.sin(Math.PI*dg)*VH*0.08,VH*0.5,{flip:dir<0,rot:dir*0.3*Math.sin(Math.PI*dg),ghost:dg>0&&dg<1?[dir*VW*0.04,0,3]:null});
      const k2=seg(t,a,a+0.32), ox=lerp(fx,run,k2), oy=lerp(VH*0.2,VH*0.75,k2); if(t<a+0.32){ streak(g,fx,VH*0.2,ox,oy,VH*0.025,'210,190,170','240,230,220',0.35); obj(F,'OBJ',OB[k],ox,oy,VH*0.3,t*8); }
      else { obj(F,'OBJ',OB[k],run,VH*0.86,VH*0.22,1.2); dust(g,run,VH*0.9,seg(t,a+0.32,a+1.0),VW*0.22,'140,120,110',30+i); sparks(g,run,VH*0.85,a+0.32,t,26,220,'255,200,120',40+i); } }]),
    // A10 NỬA TOÀ NHÀ đập trúng người → im lặng
    [T.half,T.clear,(F,t,u)=>{ const g=F.g; bg(F,'BST',1.1,0.5,0.55); const k=seg(t,T.half,T.halfHit);
      if(t<T.halfHit){ spr(F,'CG',VW*0.5,VH*0.98,VH*0.32,{rot:0.1}); obj(F,'OBJ',OB.half,VW*0.5,lerp(-VH*0.5,VH*0.6,ein(k)),VH*0.9,0.15); g.save(); g.fillStyle='rgba(0,0,0,'+(0.4*k)+')'; g.fillRect(0,0,VW,VH); g.restore(); }
      else { obj(F,'OBJ',OB.half,VW*0.5,VH*0.68,VH*0.9,0.22); const v=seg(t,T.halfHit,T.clear); for(let i=0;i<16;i++) puff(g,VW*(0.1+0.8*hash(i+100)),VH*(0.4+0.5*hash(i+101))-v*VH*0.1,VH*(0.2+0.15*hash(i+102))*(1+v),0.85*(1-v*0.3),'120,105,100');
        if(t<T.halfHit+0.12) impact3(g,VW*0.5,VH*0.75,Math.min(2,Math.floor((t-T.halfHit)/0.04))); } }],
    // A11 khói tan: Chill Guy bước ra, hào quang NỘ đỏ, "I'M NOT CHILL ANYMORE"
    [T.clear,T.dash,(F,t,u)=>{ const g=F.g, fr=Math.floor(t*10); bg(F,'BST',1.5,0.5,0.45); const v=seg(t,T.clear,T.rage);
      for(let i=0;i<14;i++) puff(g,VW*(0.1+0.8*hash(i+110))+(hash(i+111)-0.5)*v*VW*0.6,VH*(0.3+0.6*hash(i+112)),VH*0.25,0.8*(1-v),'120,105,100');
      const ra=seg(t,T.rage-0.4,T.rage); for(let i=0;i<10;i++) puff(g,VW*0.5+(hash(i+120)-0.5)*VW*0.2,VH*0.95-((t*0.8+hash(i+121))%1)*VH*0.7,VH*0.08,0.5*ra,'255,40,30');
      spr(F,'CG',VW*0.5,VH*1.02,VH*0.85*lerp(0.9,1,v),{glow:'#ff2a1a',glowA:0.7*ra,tint:'#ff3020',tintA:0.25*ra,shadow:false});
      for(let i=0;i<3;i++){ const sd=fr*13+i*7; if(ra<0.5||hash(sd)<0.4) continue; zap(g,VW*0.5+(hash(sd+1)-0.5)*VW*0.3,VH*(0.3+0.5*hash(sd+2)),hash(sd+3)*TAU,VH*0.18,3,sd,'red'); }
      if(t>=T.rage){ const k=seg(t,T.rage,T.rage+0.15); g.save(); g.font='900 '+Math.round(VH*0.075*lerp(1.4,1,k))+'px Montserrat, Arial Black, sans-serif'; g.textAlign='center'; g.lineWidth=8; g.strokeStyle='#000'; g.fillStyle='#ff2a1a';
        g.translate(VW*0.5+(hash(fr)-0.5)*6,VH*0.18); g.strokeText("I'M NOT CHILL ANYMORE",0,0); g.fillText("I'M NOT CHILL ANYMORE",0,0); g.restore(); } }],
    // A12 lao thẳng về Depressed (vệt đỏ) → GOJO đứng chắn giữa, giơ tay ngăn
    [T.dash,T.calm,(F,t,u)=>{ const g=F.g; bg(F,'BST',1.15,0.5,0.6); spr(F,'PAIN',VW*0.86,VH*0.92,VH*0.5,{flip:true});
      const k=seg(t,T.dash,T.block), x=lerp(VW*0.05,VW*0.36,ein(k)); if(t<T.block) streak(g,-VW*0.1,VH*0.65,x,VH*0.65,VH*0.08,'255,50,30',null,0.9);
      spr(F,t<T.block?'CGK':'CG',x,VH*0.95,VH*0.5,{glow:'#ff2a1a',glowA:0.6,ghost:t<T.block?[VW*0.05,0,3]:null});
      if(t>=T.block-0.06){ const a=seg(t,T.block-0.06,T.block+0.06); spr(F,'GOJO',VW*0.56,VH*0.95,VH*0.58,{alpha:a,flip:true,glow:'#8fd0ff',glowA:0.4}); if(t<T.block+0.3) ring(g,VW*0.47,VH*0.7,VW*0.25*eout(seg(t,T.block,T.block+0.3)),1-seg(t,T.block,T.block+0.3),'190,225,255',4); } }],
    // A13 Chill Guy tắt nộ, nhìn Gojo, GẬT ĐẦU, quay người chạy vào làn khói
    [T.calm,T.face,(F,t,u)=>{ const g=F.g; bg(F,'BST',1.5,0.45,0.55); const off=seg(t,T.calm,T.calm+0.6), nod=t>=T.nod&&t<T.nod+0.35?Math.sin(Math.PI*seg(t,T.nod,T.nod+0.35)):0;
      spr(F,'GOJO9',VW*0.68,VH*1.04,VH*0.8,{flip:true}); const rx=t<T.run?VW*0.3:lerp(VW*0.3,-VW*0.2,ein(seg(t,T.run,T.face)));
      spr(F,'CG',rx,VH*1.06,VH*0.85,{flip:t>=T.run,glow:'#ff2a1a',glowA:0.6*(1-off),sy:1-0.05*nod,rot:0.06*nod});
      for(let i=0;i<8;i++) puff(g,-VW*0.05+VW*0.2*hash(i+130),VH*(0.4+0.5*hash(i+131)),VH*0.25,0.55,'110,96,92'); }],   // làn khói bên trái
    // A14 Gojo và Depressed đối mặt giữa khói → sang trận Bat Cat
    [T.face,T.DUR,(F,t,u)=>{ const g=F.g; bg(F,'BST',1.05,0.5,0.55); spr(F,'GOJO9',VW*0.3,VH*0.92,VH*0.5); spr(F,'PAIN',VW*0.72,VH*0.92,VH*0.5,{flip:true}); embers(g,t,30,'255,170,120');
      for(let i=0;i<6;i++) puff(g,VW*hash(i+140),VH*(0.7+0.25*hash(i+141))+Math.sin(t+i)*6,VH*0.2,0.35,'110,96,92'); }]];
  const R=P.runner(SHOTS);
  // ⏱️ nhanh – chậm đan xen: tích tụ / linh cảm / khói tan chậm · né, đập, lao nhanh
  const RETIME=[[0,T.help,1],[T.help,T.tilt,0.9],[T.tilt,T.dive,1],[T.dive,T.sense,0.85],[T.sense,T.turn,1.1],[T.turn,T.emerge,0.85],[T.emerge,T.fire,1],[T.fire,T.f4,0.85],[T.f4,T.half,1.0],[T.half,T.clear,1.1],[T.clear,T.dash,1.15],[T.dash,T.calm,0.8],[T.calm,T.DUR,1]];
  const film=def=>CineKit.film(window.Fin1Fight&&Fin1Fight.retime?Fin1Fight.retime(RETIME,def):def);
  film({ id:'fin1c6', title:'Final 1 · Chill Guy', DUR:T.DUR, VW, VH, fadeIn:false, fadeOut:false, imgs:IMG, shots:R.shots, world:R.world,
    sfx:[[0.2,'se_collapse_b',0.5,null,'mưa gạch đá, nhà đổ xa'],
      [T.help+0.9,'se_step_in',0.5,null,'Chill Guy đỡ Pop Cat vấp ngã đứng dậy'],
      [T.tilt+0.1,'se_collapse',0.7,null,'toà nhà nghiêng đổ xuống chỗ Banana Cat'],[T.tilt+0.4,'cry_banana_cat',0.9,null,'+ Banana Cat ngồi khóc ngước lên (lớp của tiếng nhà đổ)'],
      [T.dive,'se_whoosh_fast',0.7,null,'Chill Guy lao tới ôm Banana Cat lăn ra'],[T.crash,'l2p_crack',0.9,null,'mảng tường đập xuống ngay sau lưng'],
      [T.turn+0.2,'l2p_whoosh',0.7,null,'chiếc xe bay vút tới'],[T.carHit,'pd_truck_crash',1,null,'xe đâm sầm cày nát mặt đường, Chill Guy né kịp'],
      [T.emerge+0.2,'l2p_sub',0.5,null,'Depressed (Pain) lơ lửng bước ra từ khói'],[T.rin,'ep3_shine',0.5,null,'+ Rinnegan loé (lớp của tiếng trầm)'],
      [T.lift,'l2p_riser',0.6,null,'đá, cột đèn, mảng tường bị hút lên lơ lửng'],
      [T.f1+0.32,'se_rock_break',0.8,null,'cột đèn đập xuống, Chill Guy né'],[T.f2+0.32,'se_wall_break',0.8,null,'mảng tường thứ nhất vỡ tung'],[T.f3+0.32,'kn_boom_low',0.7,null,'mảng tường nhỏ nổ bụi, Chill Guy lăn'],[T.f4+0.32,'se_collapse',0.8,null,'mảng tường lớn sập, Chill Guy nhảy né'],
      [T.halfHit,'cine_deep_impact',1,null,'NỬA TOÀ NHÀ đập trúng Chill Guy'],
      [T.rage,'chillguy_uppercut',0.9,null,'"I\'M NOT CHILL ANYMORE": hào quang nộ bùng'],
      [T.dash,'se_machdash',0.8,null,'Chill Guy lao thẳng về phía Depressed'],[T.block,'se_impact_stop',1,null,'Gojo đứng chắn giữa, khựng'],
      [T.run+0.1,'se_step_in',0.4,null,'Chill Guy chạy vào làn khói']],
    mus:[{src:'assets/audio/fin_crowd.mp3',ra:0,rb:T.sense,off:0,vol:0.45,fi:0.3,fo:0.4},{src:'assets/audio/fin_city.mp3',ra:0,rb:T.sense,off:0,vol:0.3,fi:0.3,fo:0.4},
      {src:'assets/audio/fin_crowd.mp3',ra:T.turn,rb:T.half,off:6,vol:0.25,fi:0.3,fo:0.2}],
    impact:t=>{ const E=K.edit; return E.first(E.impacts(t,T.carHit,3,[['#000000','#ffffff']],3),E.impacts(t,T.block,3,[['#000000','#9fd8ff']],3)); },
    grade:t=>{ const E=K.edit; if(t>=T.sense&&t<T.turn) return {sat:0.6}; if(t>=T.halfHit&&t<T.clear) return {sat:0.5,bright:0.9};
      return E.mix(E.rgb(t,T.carHit,0.4,6),E.duotone(t,T.rage,T.dash,'#1a0000','#ff4030',0.1,0.45),E.rgb(t,T.block,0.4,8)); },
    shake:t=>{ let s=0; const h=(a,amp,d)=>{ if(t>=a&&t<a+d) s=Math.max(s,amp*(1-(t-a)/d)); }; h(T.crash,8,0.5); h(T.carHit,14,0.6); for(const x of [T.f1,T.f2,T.f3,T.f4]) h(x+0.32,6,0.3); h(T.halfHit,22,0.9); h(T.rage,6,0.8); h(T.block,10,0.4); if(t>=0&&t<T.sense) s=Math.max(s,1.2); return s; },
    post(F,t){ const fx={shocks:[]}, sh=(a,sx,sy,rm,d,str)=>{ if(t>=a&&t<a+d){ const u=(t-a)/d; fx.shocks.push({sx,sy,r:20+rm*eout(u),w:30,str:str*(1-u)}); fx.chroma=Math.max(fx.chroma||0,0.3*(1-u)); } };
      sh(T.carHit,VW*0.5,VH*0.85,VW*0.5,0.5,20); sh(T.halfHit,VW*0.5,VH*0.75,VW*0.8,0.8,30); sh(T.rage,VW*0.5,VH*0.6,VW*0.6,0.7,18); sh(T.block,VW*0.47,VH*0.7,VW*0.5,0.5,22); return fx; },
    screen(F,t){ if(t>=T.dash&&t<T.block) K.speedLines(F,{k:0.5,n:60,r0:0.4}); if(t>=T.dive&&t<T.dive+0.35) K.speedLines(F,{k:0.35,n:40,r0:0.45});
      K.letterbox(F,t>=T.sense&&t<T.turn?0.6:0); K.vignette(F,0.5); } });
})();
