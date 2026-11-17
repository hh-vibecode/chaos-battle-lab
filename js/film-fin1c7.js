// 🌌 Final Part 1 · KẾT — HAI PHE TỤ QUÂN — id `fin1c7`, sau fin1c4 (Gojo vs Pain). Kịch bản anh duyệt: prompts/kich-ban/fin1-chillguy-ending.md [B] + mục "ANH CHỐT".
// (17/11) DỰNG LẠI theo lời anh chê 16/11 ("khung cảnh bé, quay ngược xuôi đè lên nhau, hỗn loạn") + 2 ảnh mẫu anh gửi (Madara vs Liên minh Ninja: BIỂN QUÂN tới chân trời ·
//   thiên thạch che nửa trời → Friend ÍT NHẤT to cỡ đó) — ảnh ở D:\meme-anime-lab-videos\ref-fin1-ending\:
//   • THẾ GIỚI 3D: chính thành phố của tập (Fin1City), trung tâm đã bị san phẳng thành BÃI ĐỔ NÁT rộng tới chân trời (sau Shinra Tensei). Máy TĨNH mỗi shot.
//   • TRỤC: phe Gojo TRÁI (x<0), phe Pain PHẢI (x>0). Quân xếp KHỐI dày, mỗi phe hàng trăm meme, nhỏ dần theo độ sâu, KHÔNG lật mặt (mọi ảnh giữ nguyên chiều).
//   • Meme FORM NGUYÊN BẢN (avatar game). Buff Doge ×3, Gigachad + Chonky KHỔNG LỒ (cao ngang nhà chọc trời), Friend to cỡ thiên thạch che nửa trời.
//   • Bread Cat trên trời xoay như game (BC_SPIN 48 góc) → thời không sụp → cổng đa vũ trụ · Ninja ấn triệu hồi → Evil Gary + Catvader + binh đoàn ác quỷ · Pain giơ mảnh vỡ → Friend.
(function(){
  if(!window.CineKit || CineKit.films.fin1c7) return;
  const BASE=((document.currentScript&&document.currentScript.src)||'js/film-fin1c7.js').replace(/film-[^\/]*$/,''), V=window.GAME_VERSION?'?v='+GAME_VERSION.build:'';
  for(const [gl,f] of [['PIXI_FILTERS_GLSL','vendor/pixi-filters/glsl.js'],['Fin1City','fin1-city.js'],['Fin1Fight','fin1-fight.js']]) if(!window[gl]){ try{ const x=new XMLHttpRequest(); x.open('GET',BASE+f+V,false); x.send(); (0,eval)(x.responseText); }catch(e){} }
  const K=CineKit, {seg,lerp,clamp,hash}=K, EA=K.EASE, eout=EA.eout, ein=EA.ein, eio=EA.eio, TAU=Math.PI*2, W=window.Fin1Fight, VW=960, VH=540, H=120;
  const T={ g1:3.0, g2:4.8, bread:6.6, crack:9.6, portal:11.0, land:12.6, land2:16.0, giant:18.0, seal:20.6, sealOn:21.6, summon:22.6, shard:25.6, friend:27.4, split:32.0, boom:35.0, tbc:35.4, xmas:37.0, DUR:39.5 };
  const av=k=>'assets/avatars/'+k+'/avatarUrl.webp';
  const BACK=['feuerkatze','stalincat','duolingo','violinbee','saiyanmarmot','boxingcat','nyancat','suscat','samuraicheems','kingcheems','chillguy','bananacat','mechaniccat','electricguitarcat','mosquitoviolin','loooongcat','lebronsunshine','scaredhamster','infinitydoge','maxwell'];   // hàng sau: meme quan trọng (anh dặn)
  const REST=['aliencat','alottadameguy','applecat','azel','bibilabu','bongocat','calmdog','capybara','cheems','commandercat','cornelius','coughcat','cryingcat','damdamdidi','dawae','drivercat','droolingcat','epicsaxguy','finedog','flyingcat','gary','germancat','hecker','kermit','knifecat','morsecat','pakistanguy','pianocat','poordog','ricardo','rickroll','rubikcat','scareddog','scootercat','screamcat','slapcat','smartguy','snoozecat','spidercat','susdog','trollface','uiacat','vampirecat','wetcat','windguy','yellingwomen','yuki'];
  const IMG={ ...window.FIN1_CITY_IMGS, BCS:'assets/img/breadcat/BC_SPIN.png',
    GOJO:'assets/img/mewingcat/MEW_GOJO_IMG.webp', PAIN:'assets/img/depressedcat/DP_PAIN_IMG.webp',
    DB:'assets/avatars/doge/rageAvatarUrl.webp', CLAP:av('clappingcat'), BERS:av('berserkcat'), POP:av('popcat'), HUH:av('huhcat'),
    CHUD:av('doorbellchud'), MLEM:av('mlemcat'), NINJA:av('ninjacat'), BAT:av('batcat'),
    CHONKY:av('chonkydog'), GIGA:av('gigachad'), GARY:av('evilgary'), VADER:av('catvader'), FRIEND:av('friend'), SOUL:'assets/img/evilgary/EG_SOUL_TORSO.webp' };
  for(const k of BACK.concat(REST)) IMG['M_'+k]=av(k);
  // ───────── THÀNH PHỐ: trung tâm san phẳng (toà sập từ trước), dãy xa còn đứng làm chân trời ─────────
  const CITY=Fin1City({seed:3, x0:-14000, x1:14000, rows:1, near:13000});   // bãi giữa đã bị Shinra san phẳng · dãy nhà còn đứng làm chân trời
  const RUBBLE=Array.from({length:260},(_,i)=>({x:(hash(i*3+11)-0.5)*15000,z:-400+10500*hash(i*3+12),r:30+90*Math.pow(hash(i*3+13),2),a:hash(i*3+14)*TAU}));   // đá vụn / mảng bê tông rải khắp bãi
  const theme=t=>CITY.TH_NIGHT;
  // ───────── QUÂN 2 PHE (toạ độ cố định, băm theo chỉ số — không Math.random) ─────────
  const POS_G=[-430,0], POS_P=[430,0];   // 2 thủ lĩnh
  const AIDE_G=[['DB',-760,-60,3.0],['CLAP',-560,120,1],['BERS',-650,260,1.15],['POP',-470,320,0.95],['HUH',-820,330,1]];
  const AIDE_P=[['CHUD',600,-40,1.1],['MLEM',760,140,1],['NINJA',560,280,1.05],['BAT',840,300,1]];
  // biển meme phe Gojo: khối chữ nhật x −700…−6800, z −200…9000 · hàng trước = meme quan trọng (BACK), sau = phần còn lại lặp lại
  const ARMY_G=[]; (function(){ const L=BACK.concat(REST); let i=0; for(let row=0;row<34;row++){ const z=420+row*260, n=10+row; for(let c=0;c<n;c++){ const x=-760-c*(6000/n)-hash(i*3+1)*120, key=row<2?BACK[(c+row*7)%BACK.length]:L[(i*7+row)%L.length];
      ARMY_G.push({key:'M_'+key,x,z:z+(hash(i*3+2)-0.5)*120,h:H*(0.85+0.2*hash(i*3+3)),ta:T.land+0.25*Math.min(1,row/34)*8*hash(i*3+4)*0.2+row*0.06+hash(i*3+5)*0.5}); i++; } } })();
  // binh đoàn ác quỷ phe Pain: linh hồn khói đen trồi lên từ ấn triệu hồi, khối x 700…6800
  const ARMY_P=[]; (function(){ let i=0; for(let row=0;row<34;row++){ const z=420+row*260, n=10+row; for(let c=0;c<n;c++){ ARMY_P.push({x:760+c*(6000/n)+hash(i*5+1)*120,z:z+(hash(i*5+2)-0.5)*120,h:H*(0.9+0.4*hash(i*5+3)),ta:T.summon+row*0.035+hash(i*5+4)*0.4}); i++; } } })();
  // vẽ 1 meme bằng ảnh gốc trong thế giới (nhẹ, cho biển quân): chân ở (x,0,z), cao h, KHÔNG lật
  function crowdOne(F,key,x,z,h,o){ const c=K.prep(F.I[key]); if(!c) return; const P=K.proj(F.B,x,o&&o.y||0,z); if(!P) return; const hh=h*P.s; if(hh<1.2) return; const ww=hh*c.sw/c.sh;
    if(P.x+ww<-50||P.x-ww>VW+50||P.y-hh>VH+50||P.y<-50) return;
    F.list.push({d:P.d, fn:()=>{ const g=F.g; g.save(); if(o&&o.a!=null) g.globalAlpha=o.a; if(o&&o.filter) g.filter=o.filter; g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,P.x-ww/2,P.y-hh+(o&&o.bob||0)*P.s,ww,hh); g.restore(); }}); }
  function armyG(F,t){ for(let i=0;i<ARMY_G.length;i++){ const m=ARMY_G[i]; if(t<m.ta) continue; const k=seg(t,m.ta,m.ta+0.35); crowdOne(F,m.key,m.x,m.z,m.h,{y:(1-eout(k))*900,a:Math.min(1,k*3),bob:-Math.abs(Math.sin(t*3+i))*6}); } }
  function armyP(F,t){ for(let i=0;i<ARMY_P.length;i++){ const m=ARMY_P[i]; if(t<m.ta) continue; const k=seg(t,m.ta,m.ta+0.6); crowdOne(F,'SOUL',m.x,m.z,m.h*k,{a:Math.min(1,k*2),filter:'brightness(0.55) sepia(0.6) hue-rotate(-30deg) saturate(2.2)'}); } }
  // ảnh BÁN THÂN (Gojo, Pain): mờ dần mép dưới → lơ lửng, không lộ mép cắt (như cảnh Chill Guy)
  const FADE={};
  function faded(F,key){ if(FADE[key]) return FADE[key]; const im=F.I[key]; if(!im||!im.complete||!im.naturalWidth) return null; const c=document.createElement('canvas'); c.width=im.naturalWidth; c.height=im.naturalHeight; const x=c.getContext('2d'); x.drawImage(im,0,0);
    x.globalCompositeOperation='destination-out'; const gr=x.createLinearGradient(0,c.height*0.62,0,c.height); gr.addColorStop(0,'rgba(0,0,0,0)'); gr.addColorStop(1,'rgba(0,0,0,1)'); x.fillStyle=gr; x.fillRect(0,0,c.width,c.height); c.complete=true; c.naturalWidth=c.width; c.naturalHeight=c.height; F.I[key+'_F']=c; return FADE[key]=c; }
  const leader=(F,key,x,z,t,aura)=>{ if(!faded(F,key)) return; W.actor(F,{key:key+'_F',dir:0,x,z,y:H*0.5+Math.sin(t*1.8+(x>0?1:0))*7,h:H*1.25,shadow:false,aura}); };
  const man=(F,key,x,z,h,o)=>W.actor(F,Object.assign({key,dir:0,x,z,y:0,h,shadow:true},o||{}));
  function leaders(F,t){ leader(F,'GOJO',POS_G[0],POS_G[1],t,{preset:'ki',k:0.8,seed:3}); leader(F,'PAIN',POS_P[0],POS_P[1],t,{preset:'cursed',k:0.8,seed:9});
    for(const [k,x,z,s] of AIDE_G) man(F,k,x,z,H*s); for(const [k,x,z,s] of AIDE_P) man(F,k,x,z,H*s); }
  // ───────── VẬT KHỔNG LỒ / VFX TRONG THẾ GIỚI ─────────
  const SKY_G=[-3200,6200,9000], PORTAL_R=3600;   // điểm trên trời phía Gojo: Bread Cat → cổng
  function atWorld(F,x,y,z,fn,dd){ const P=K.proj(F.B,x,y,z); if(!P) return; F.list.push({d:P.d+(dd||0), fn:()=>fn(F.g,P)}); }
  function puff(g,x,y,r,a,col){ if(a<=0.01||r<=0.5) return; const gr=g.createRadialGradient(x,y,0,x,y,r); gr.addColorStop(0,'rgba('+col+','+a+')'); gr.addColorStop(0.6,'rgba('+col+','+(a*0.45)+')'); gr.addColorStop(1,'rgba('+col+',0)'); g.fillStyle=gr; g.fillRect(x-r,y-r,2*r,2*r); }
  function breadCat(F,t,k,s0){ const im=F.I.BCS; if(!im||!im.naturalWidth) return; atWorld(F,...SKY_G,(g,P)=>{ const s=s0*P.s, fr=Math.floor(((t*(1.0+4*k))%1)*48), cs=256;   // xoay trục ngang như game, nhanh dần
      g.save(); g.globalCompositeOperation='lighter'; puff(g,P.x,P.y,s*1.8,0.3+0.4*k,'120,200,255'); for(let i=0;i<2;i++){ g.strokeStyle='rgba(160,230,255,'+(0.5*k)+')'; g.lineWidth=2+3*k; g.beginPath(); g.ellipse(P.x,P.y+s*0.1,s*(0.9+0.4*i+0.1*Math.sin(t*6+i)),s*(0.9+0.4*i)*0.22,0,0,TAU); g.stroke(); }
      if(k>0.25){ const w=s*0.22*k, gr=g.createLinearGradient(P.x-w,0,P.x+w,0); gr.addColorStop(0,'rgba(150,220,255,0)'); gr.addColorStop(0.5,'rgba(230,250,255,'+(0.6*k)+')'); gr.addColorStop(1,'rgba(150,220,255,0)'); g.fillStyle=gr; g.fillRect(P.x-w,-40,w*2,VH+80); }   // cột sáng
      for(let i=0;i<24;i++){ const a=hash(i+500)*TAU, d=s*(0.6+((t*1.5+hash(i+501))%1)*1.3); g.fillStyle='rgba(220,245,255,'+(0.8*k)+')'; g.fillRect(P.x+Math.cos(a)*d,P.y+Math.sin(a)*d*0.7,2.5,2.5); } g.restore();   // mưa tia lửa
      g.drawImage(im,(fr%8)*cs,((fr/8)|0)*cs,cs,cs,P.x-s/2,P.y-s/2,s,s); },-500); }
  function portal(F,t,k){ if(k<=0) return; atWorld(F,...SKY_G,(g,P)=>{ const R=PORTAL_R*P.s*k; g.save(); g.translate(P.x,P.y);
      const gr=g.createRadialGradient(0,0,0,0,0,R); gr.addColorStop(0,'#0a0820'); gr.addColorStop(0.85,'#1a1040'); gr.addColorStop(1,'rgba(30,20,70,0.6)'); g.fillStyle=gr; g.beginPath(); g.arc(0,0,R,0,TAU); g.fill();
      g.save(); g.beginPath(); g.arc(0,0,R,0,TAU); g.clip(); for(let i=0;i<26;i++){ const a=hash(i+600)*TAU+t*0.15*(i%2?1:-1), d=R*0.8*Math.sqrt(hash(i+601)), r=R*(0.05+0.1*hash(i+602)), col=['120,200,255','255,150,220','180,255,170','255,210,120','190,150,255'][i%5];   // muôn vàn vũ trụ BONG BÓNG
        const bx=Math.cos(a)*d, by=Math.sin(a)*d, bg2=g.createRadialGradient(bx,by,0,bx,by,r); bg2.addColorStop(0,'rgba('+col+',0.9)'); bg2.addColorStop(0.7,'rgba('+col+',0.3)'); bg2.addColorStop(1,'rgba('+col+',0)'); g.fillStyle=bg2; g.beginPath(); g.arc(bx,by,r,0,TAU); g.fill();
        g.strokeStyle='rgba(255,255,255,0.45)'; g.lineWidth=1; g.beginPath(); g.arc(bx,by,r*0.8,0,TAU); g.stroke(); } g.restore();
      g.globalCompositeOperation='lighter'; for(const [w,a] of [[0.1,0.25],[0.04,0.7],[0.012,1]]){ g.strokeStyle='rgba(200,235,255,'+a+')'; g.lineWidth=Math.max(1,R*w); g.beginPath(); g.arc(0,0,R,0,TAU); g.stroke(); }   // viền cổng sáng
      g.restore(); },-400); }
  // ẤN TRIỆU HỒI khổng lồ nằm trên mặt đất phía Pain: vòng tròn + vệt cháy xoáy + chữ, chiếu đúng phối cảnh mặt đất
  const SEAL_C=[3600,0,4200], SEAL_R=3400;
  function sealGround(F,t,k){ if(k<=0) return; const pts=(r,n,a0)=>{ const o=[]; for(let i=0;i<=n;i++){ const a=(a0||0)+i/n*TAU; const p=K.proj(F.B,SEAL_C[0]+Math.cos(a)*r,2,SEAL_C[2]+Math.sin(a)*r); if(!p) return null; o.push(p); } return o; };
    F.under.push(()=>{ const g=F.g; g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round';
      for(const rr of [0.35,0.7,1]){ const P=pts(SEAL_R*k*rr,64); if(!P) continue; g.strokeStyle='rgba(255,70,30,0.85)'; g.lineWidth=Math.max(1.5,4*P[0].s*30); g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y)); g.stroke(); }
      for(let i=0;i<20;i++){ const a=i/20*TAU, o=[]; for(let j=0;j<=8;j++){ const f=j/8, r=SEAL_R*k*f*(0.6+0.4*hash(i+700)), p=K.proj(F.B,SEAL_C[0]+Math.cos(a+f*0.7)*r,2,SEAL_C[2]+Math.sin(a+f*0.7)*r); if(p) o.push(p); }
        g.strokeStyle='rgba(255,'+(60+80*hash(i+701)|0)+',40,0.8)'; g.lineWidth=2.5; g.beginPath(); o.forEach((p,j)=>j?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y)); g.stroke(); }
      const gl=K.proj(F.B,SEAL_C[0],2,SEAL_C[2]); if(gl) puff(g,gl.x,gl.y,SEAL_R*k*gl.s*1.2,0.35,'255,60,20'); g.restore(); }); }
  // FRIEND khổng lồ (cỡ thiên thạch): ảnh pixel gốc vẽ SẮC NÉT (không làm mịn), đứng xa sau phe Pain, che nửa trời
  const FR_POS=[4200,26000];
  function friend(F,t,h,x,z,o){ const im=F.I.FRIEND; if(!im||!im.naturalWidth) return; const c=K.prep(im); if(!c) return; atWorld(F,x,0,z,(g,P)=>{ const hh=h*P.s, ww=hh*c.sw/c.sh; g.save(); g.imageSmoothingEnabled=false;
      if(o&&o.dark) g.filter='brightness('+(1-o.dark)+')'; g.drawImage(c.src,c.sx,c.sy,c.sw,c.sw*c.sh/c.sw,P.x-ww/2,P.y-hh,ww,hh); g.restore();
      g.save(); g.globalCompositeOperation='lighter'; puff(g,P.x,P.y-hh*0.55,hh*0.7,0.12,'180,120,255'); g.restore(); },0); }
  function giants(F,t,k1,k2){ if(k1>0) man(F,'GIGA',-2600,2600,H*42,{y:-(1-k1)*H*42*0.6,shadow:k1>0.5}); if(k2>0) man(F,'CHONKY',-4800,3800,H*36,{y:-(1-k2)*H*36*0.6,shadow:k2>0.5}); }
  // ───────── MÁY: mỗi shot 1 góc TĨNH (máy phía −z nhìn +z; trái = Gojo, phải = Pain) ─────────
  const S=(t0,t1,a)=>({t0,t1,a,ease:'lin'});
  const shots=[
    S(0,T.g1,{tx:0,ty:300,tz:2000,dist:4200,yaw:0,pitch:9,fov:56}),                      // B1 toàn rộng cao: bãi đổ nát mênh mông, 2 thủ lĩnh 2 bên
    S(T.g1,T.g2,{tx:-620,ty:120,tz:150,dist:720,yaw:4,pitch:-2,fov:50}),                 // B2 phe Gojo bước ra từ khói
    S(T.g2,T.bread,{tx:640,ty:120,tz:150,dist:720,yaw:-4,pitch:-2,fov:50}),              //    phe Pain bước ra từ khói
    S(T.bread,T.crack,{tx:-1500,ty:2600,tz:2600,dist:3600,yaw:8,pitch:-24,fov:58}),     // B3 góc ngước qua đầu phe Gojo: Bread Cat hiện trên trời, xoay như game
    S(T.crack,T.portal,{tx:-2400,ty:5200,tz:7200,dist:2400,yaw:4,pitch:-8,fov:54}),     // B4 cận Bread Cat: xoay mạnh nhất → thời không sụp vào 1 điểm (lặng)
    S(T.portal,T.land,{tx:-1500,ty:2600,tz:2600,dist:3600,yaw:8,pitch:-24,fov:58}),     // B5 CỔNG thông đạo xé ra trên trời
    S(T.land,T.land2,{tx:-2600,ty:600,tz:3400,dist:5200,yaw:22,pitch:12,fov:58}),       // B6 toàn cao: meme ĐỔ BỘ ào xuống, biển quân phủ tới chân trời
    S(T.land2,T.giant,{tx:-1900,ty:115,tz:700,dist:950,yaw:4,pitch:-1,fov:50}),          // B7 trung: hàng đầu (meme quan trọng) đứng sau nhóm Gojo
    S(T.giant,T.seal,{tx:-3400,ty:2200,tz:2400,dist:4600,yaw:8,pitch:-16,fov:60}),      // B8 góc ngước: Gigachad + Chonky KHỔNG LỒ trồi lên (thấy trọn người)
    S(T.seal,T.sealOn,{tx:560,ty:120,tz:280,dist:330,yaw:-4,pitch:-2,fov:46}),           // B9 cận Ninja kết ấn
    S(T.sealOn,T.shard,{tx:3200,ty:300,tz:2600,dist:3400,yaw:-22,pitch:18,fov:58}),     // B10: ấn triệu hồi loang trên phe Pain → binh đoàn ác quỷ trồi lên
    S(T.shard,T.friend,{tx:430,ty:180,tz:0,dist:360,yaw:-6,pitch:-4,fov:46}),            // B11 cận Pain giơ mảnh vỡ
    S(T.friend,T.friend+2.3,{tx:1200,ty:900,tz:1200,dist:3800,yaw:-6,pitch:-12,fov:60}),   // B12 góc ngước: Friend bước tới từ chân trời
    S(T.friend+2.3,T.split,{tx:700,ty:330,tz:100,dist:1300,yaw:-8,pitch:-22,fov:60}),   //     trung cảnh nhóm Pain, Friend sừng sững sau lưng che nửa trời
    S(T.split,T.boom,{tx:0,ty:300,tz:2000,dist:4200,yaw:0,pitch:9,fov:56}),              // B13 chia đôi (ô riêng trong panels)
    S(T.boom,T.DUR,{tx:0,ty:300,tz:2000,dist:4200,yaw:0,pitch:9,fov:56})];              //     BÙM → TO BE CONTINUED
  // ───────── DIỄN ─────────
  const breadK=t=>t<T.bread?0:t<T.crack?seg(t,T.bread,T.crack):1;
  function rubble(F){ for(const r of RUBBLE){ const P=K.proj(F.B,r.x,0,r.z); if(!P) continue; const R=r.r*P.s; if(R<0.8||R>34||P.x<-60||P.x>VW+60||P.y<-60||P.y>VH+60) continue;
      F.list.push({d:P.d+r.r, fn:()=>{ const g=F.g; g.save(); g.translate(P.x,P.y); g.rotate(r.a); g.fillStyle='#2b2528'; g.beginPath(); g.moveTo(-R,0); g.lineTo(-R*0.4,-R*0.55); g.lineTo(R*0.5,-R*0.45); g.lineTo(R,0); g.lineTo(R*0.3,R*0.18); g.closePath(); g.fill();
        g.fillStyle='#3d3539'; g.beginPath(); g.moveTo(-R*0.4,-R*0.55); g.lineTo(R*0.5,-R*0.45); g.lineTo(R*0.2,-R*0.2); g.closePath(); g.fill(); g.restore(); }}); } }
  function world(F,t){ F.t=t; CITY.draw(F,t,theme(t)); rubble(F);
    for(let i=0;i<6;i++) K.smoke(F,{x:-5000+2000*i,z:9000+hash(i+20)*3000,t0:-3,n:4,spread:1400,rise:2600,life:80,size:1400,seed:800+i,a:0.32,tint:'70,54,50'});   // khói cột chân trời
    const sh=F.panel&&F.panel.side;
    if(!sh||sh==='G'){ if(t>=T.bread&&t<T.portal+0.2) breadCat(F,t,breadK(t),t<T.crack?1600:lerp(1600,60,ein(seg(t,T.crack,T.portal)))); if(t>=T.portal) portal(F,t,eout(seg(t,T.portal,T.portal+0.8)));
      if(t>=T.land) armyG(F,t); giants(F,t,eout(seg(t,T.giant,T.giant+1.0)),eout(seg(t,T.giant+0.7,T.giant+1.7)));
      if(t>=T.land&&t<T.land2) for(let i=0;i<30;i++){ const k=((t-T.land)*1.3+hash(i+40))%1; atWorld(F,lerp(SKY_G[0],-1000-5800*hash(i+41),k),lerp(SKY_G[1],60,k),lerp(SKY_G[2],400+8000*hash(i+42),k),(g,P)=>{ g.save(); g.globalCompositeOperation='lighter'; puff(g,P.x,P.y,Math.max(3,60*P.s),0.8*(1-k),'210,240,255'); g.restore(); },-1); } }   // vệt sáng meme rơi từ cổng
    if(!sh||sh==='P'){ if(t>=T.sealOn) sealGround(F,t,eout(seg(t,T.sealOn,T.summon))*(1-0.5*seg(t,T.shard,T.friend)));
      if(t>=T.summon){ armyP(F,t); const k=seg(t,T.summon,T.summon+1); man(F,'GARY',1500,700,H*1.6,{y:-(1-k)*H*1.6}); man(F,'VADER',1900,560,H*1.5,{y:-(1-k)*H*1.5}); }
      if(t>=T.friend){ const k=eio(seg(t,T.friend,T.split-0.4)), z=lerp(60000,FR_POS[1],k); friend(F,t,lerp(18000,30000,k),FR_POS[0],z); } }
    leaders(F,t); }
  // ───────── MÀN HÌNH ─────────
  function star4(g,x,y,L,Wd,a){ if(a<=0.01) return; const sp=(an,len,w)=>{ const c=Math.cos(an), s=Math.sin(an); g.beginPath(); g.moveTo(x-s*w,y+c*w); g.lineTo(x+c*len,y+s*len); g.lineTo(x+s*w,y-c*w); g.closePath(); g.fill(); };
    g.save(); g.globalCompositeOperation='lighter'; g.fillStyle='rgba(255,252,240,'+a+')'; for(let i=0;i<4;i++) sp(i*Math.PI/2,i%2?L*0.62:L,Wd); g.fillStyle='rgba(255,250,235,'+(0.5*a)+')'; for(let i=0;i<4;i++) sp(Math.PI/4+i*Math.PI/2,L*0.22,Wd*0.35); puff(g,x,y,Wd*7,0.9*a,'255,250,240'); g.restore(); }
  const FR=1/30, STROBES=[[T.portal-0.1,'bw wb w k w'],[T.sealOn,'wb bw w'],[T.boom,'bw wb bw k w wb w w w w w w']];
  function strobe(t){ for(const [t0,seq] of STROBES){ const L=seq.split(' '), i=Math.floor((t-t0)/FR); if(i>=0&&i<L.length) return L[i]; } return null; }
  const IMPC={bw:{fg:'#000000',bg:'#ffffff'}, wb:{fg:'#ffffff',bg:'#000000'}};
  const def={ id:'fin1c7', title:'Final 1 · Kết · Hai phe tụ quân', DUR:T.DUR, VW, VH, fadeIn:false, fadeOut:true, imgs:IMG, theme:t=>theme(t), shots, world,
    // B13: CHIA ĐÔI chéo — ô trái phe Gojo (cổng + biển meme), ô phải phe Pain (Friend + quỷ)
    panels:t=>t>=T.split&&t<T.boom?[{cam:{tx:-2200,ty:900,tz:3000,dist:4600,yaw:14,pitch:2,fov:58},clip:[[0,0],[0.56,0],[0.44,1],[0,1]],side:'G'},
                                    {cam:{tx:1800,ty:1200,tz:1200,dist:3800,yaw:-10,pitch:-19,fov:60},clip:[[0.56,0],[1,0],[1,1],[0.44,1]],side:'P'}]:null,
    sfx:[[0.3,'l2p_sub',0.4,null,'bãi đổ nát mênh mông, Gojo và Pain đứng 2 bên'],
      [T.g1+0.2,'se_step_in',0.5,0.5,'phe Gojo bước ra từ khói'],[T.g2+0.2,'se_step_in',0.45,0.5,'+ phe Pain bước ra từ khói (lớp của tiếng bước chân)'],
      [T.bread,'bc_spin',0.8,null,'Bread Cat hiện trên trời, xoay nghịch lý bơ'],[T.bread+1.6,'bc_zap',0.5,1.2,'+ đèn chớp, tia lửa dồn dập quanh Bread Cat (lớp của tiếng xoay)'],
      [T.crack,'l2p_riser',0.7,null,'thời không sụp vào 1 điểm'],
      [T.portal,'blackhole',1,null,'CỔNG thông đạo xé ra, muôn vàn vũ trụ phía sau'],
      [T.land+0.2,'se_quake',0.6,1.4,'meme đổ bộ ào xuống bãi đổ nát'],[T.land+1.0,'se_step_in',0.5,0.6,'+ tiếng đáp đất dồn dập (lớp của đổ bộ)'],
      [T.giant+0.3,'ep4_step1',0.9,null,'Gigachad trồi lên khổng lồ'],[T.giant+1.0,'ep4_step2',0.9,null,'Chonky Dog trồi lên khổng lồ'],[T.giant+1.3,'gigachad_roar',0.6,null,'+ Gigachad gầm (lớp của bước chân khổng lồ)'],
      [T.seal,'king_knight_summon',0.8,null,'Ninja kết ấn'],[T.sealOn,'kn_boom_low',0.7,0.8,'ẤN TRIỆU HỒI cháy loang khắp phe Pain'],
      [T.summon,'demon_roar1',0.9,null,'binh đoàn ác quỷ + Evil Gary + Catvader trồi lên'],[T.summon+0.7,'demon_roar2',0.6,null,'+ quỷ gầm vang (lớp của triệu hồi)'],
      [T.shard,'ep3_shine',0.6,null,'Pain giơ mảnh vỡ, mảnh loé tím'],
      [T.friend+0.6,'ep4_step1',0.95,null,'Friend bước từ chân trời tới, mặt đất rung'],[T.friend+1.6,'ep4_step2',0.95,null,'+ bước thứ 2 (lớp của bước chân Friend)'],[T.friend+2.6,'ep4_step3',0.95,null,'+ bước thứ 3'],[T.friend+3.4,'fr_titan_roar',0.9,null,'Friend gầm, che kín nửa trời sau lưng Pain'],
      [T.split,'l2p_whoosh',0.7,0.6,'màn hình chia đôi 2 phe'],[T.boom,'l2p_explode',1,null,'BÙM — trắng xoá'],[T.tbc+0.1,'ep3_shine',0.4,null,'TO BE CONTINUED']],
    // 🎵 "Portals" (Avengers: Endgame): lặng 8–19s rồi BÙNG ở 20s → canh để chỗ bùng rơi ĐÚNG lúc cổng xé ra
    mus:[{src:'assets/audio/mus_portals.m4a',ra:T.bread,rb:T.boom+0.3,off:20-(T.portal-T.bread),vol:0.45,fi:0.6,fo:0.3}],
    impact:t=>{ const s=strobe(t); return s&&IMPC[s]?IMPC[s]:0; },
    grade:t=>{ const s=strobe(t); if(s==='w') return {white:1}; if(s==='k') return {bright:0.02}; if(t>=T.crack+0.9&&t<T.portal-0.1) return {sat:0.15,bright:0.7};
      const E=K.edit; return E.mix(E.duotone(t,T.summon,T.summon+1.5,'#1a0000','#ff4030',0.2,0.3),E.duotone(t,T.friend,T.split,'#0d0518','#b48cff',0.4,0.25),E.rgb(t,T.portal+0.15,0.5,8),E.rgb(t,T.boom+0.4,0.4,10)); },
    shake:t=>{ let s=0; const h=(a,amp,d)=>{ if(t>=a&&t<a+d) s=Math.max(s,amp*(1-(t-a)/d)); };
      if(t>=T.bread+1&&t<T.crack+0.9) s=1+3*seg(t,T.bread,T.crack); h(T.portal,10,0.6); h(T.land+0.2,6,1.2); h(T.giant+0.3,10,0.6); h(T.giant+1.0,12,0.6); h(T.sealOn,8,0.6); h(T.summon,8,0.9);
      for(const x of [0.6,1.6,2.6]) h(T.friend+x,14,0.5); h(T.boom,20,0.4); return s; },
    post(F,t){ const fx={shocks:[]}, sh=(a,x,y,z,rm,d,str)=>{ if(t>=a&&t<a+d){ const u=(t-a)/d; fx.shocks.push({x,y,z,r:20+rm*eout(u),w:60,str:str*(1-u)}); fx.chroma=Math.max(fx.chroma||0,0.3*(1-u)); } };
      sh(T.portal,SKY_G[0],SKY_G[1],SKY_G[2],5000,0.7,28); sh(T.sealOn,SEAL_C[0],0,SEAL_C[2],4000,0.6,20); return fx; },
    screen(F,t){ const g=F.g, s=strobe(t);
      if(s==='k') star4(g,VW/2,VH/2,VW*0.12,VH*0.008,1);
      if(t>=T.crack+0.8&&t<T.portal-0.1){ const P=K.proj(F.B,...SKY_G); if(P) star4(g,P.x,P.y,VW*(0.03+0.25*seg(t,T.portal-0.6,T.portal-0.1)),VH*0.006,1); }   // điểm sụp → sao 4 cánh GIỮ rồi nở
      if(t>=T.shard&&t<T.friend){ const k=eout(seg(t,T.shard,T.shard+0.6)), x=VW*0.66, y=VH*0.3-k*VH*0.05, sz=VH*0.07;   // mảnh vỡ linh hồn Friend trong tay Pain
        g.save(); g.translate(x,y); g.rotate(Math.sin(t*2)*0.2); g.globalCompositeOperation='lighter'; puff(g,0,0,sz*3,0.6*k,'190,120,255'); g.globalCompositeOperation='source-over'; g.globalAlpha=k;
        g.fillStyle='rgba(200,150,255,0.95)'; g.strokeStyle='#ffffff'; g.lineWidth=2; g.beginPath(); g.moveTo(0,-sz); g.lineTo(sz*0.45,-sz*0.1); g.lineTo(sz*0.2,sz*0.9); g.lineTo(-sz*0.35,sz*0.3); g.lineTo(-sz*0.4,-sz*0.4); g.closePath(); g.fill(); g.stroke(); g.restore(); }
      if(t>=T.split&&t<T.boom){ g.save(); g.strokeStyle='#ffffff'; g.lineWidth=5; g.beginPath(); g.moveTo(VW*0.56,0); g.lineTo(VW*0.44,VH); g.stroke(); g.restore(); }
      if(t>=T.boom+0.35){ g.fillStyle='#000'; g.fillRect(0,0,VW,VH); const a1=seg(t,T.tbc,T.tbc+0.6), a2=seg(t,T.xmas,T.xmas+0.8); g.save(); g.textAlign='center';
        g.fillStyle='rgba(255,255,255,'+a1+')'; g.font='900 '+Math.round(VH*0.09)+'px Montserrat, Arial Black, sans-serif'; g.fillText('TO BE CONTINUED…',VW/2,VH*0.46);
        g.fillStyle='rgba(255,90,90,'+a2+')'; g.font='700 '+Math.round(VH*0.045)+'px Montserrat, Arial, sans-serif'; g.fillText('FINAL · PART 2 — CHRISTMAS 2026',VW/2,VH*0.58); g.restore(); return; }
      if(!s){ K.letterbox(F,t<T.g1?0.5:0); K.vignette(F,0.5); } } };
  CineKit.film(def);
})();
