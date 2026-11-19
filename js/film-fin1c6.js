// 😎 Final Part 1 · CẢNH CHILL GUY — id `fin1c6`, sau fin1c5, trước trận Bat Cat (fin1f2). Kịch bản anh duyệt: prompts/kich-ban/fin1-chillguy-ending.md [A].
// (17/11) DỰNG LẠI theo lời anh chê 16/11 (docs/notes/viec-do-fin1.md):
//   • NỐI TIẾP THÀNH PHỐ BỊ PHÁ: dùng đúng thành phố 3D của các trận (Fin1City seed 3 = đại lộ trận Ninja vs Berserk), vài toà đã sập sẵn + khói lửa. KHÔNG nền vẽ mới.
//   • Máy TĨNH mỗi shot, giữ TRỤC: Chill Guy + Gojo bên TRÁI (−x), Pain bên PHẢI (+x); máy luôn đứng phía −z nhìn vào +z (yaw trong ±35°) → trái / phải màn hình không đảo.
//   • HƯỚNG MẶT tự tính: Fin1Fight.actor lật ảnh theo vị trí đối thủ so với hướng ngang của máy (dir = ảnh vốn quay bên nào).
//   • MEME FORM NGUYÊN BẢN của game: Chill Guy (avatar + skill1), Banana (avatar + khóc), Gojo = MEW_GOJO_IMG, Pain = DP_PAIN_IMG (2 ảnh bán thân → lơ lửng, mép dưới chìm vào hào quang).
//   • Nổi nộ xong Gojo CHẮN LUÔN (không lao vào) · kết: Gojo và Pain THỦ THẾ chuẩn bị giao tranh → cắt sang Bat Cat.
(function(){
  if(!window.CineKit || CineKit.films.fin1c6) return;
  const BASE=((document.currentScript&&document.currentScript.src)||'js/film-fin1c6.js').replace(/film-[^\/]*$/,''), V=window.GAME_VERSION?'?v='+GAME_VERSION.build:'';
  for(const [gl,f] of [['PIXI_FILTERS_GLSL','vendor/pixi-filters/glsl.js'],['Fin1City','fin1-city.js'],['Fin1Fight','fin1-fight.js']]) if(!window[gl]){ try{ const x=new XMLHttpRequest(); x.open('GET',BASE+f+V,false); x.send(); (0,eval)(x.responseText); }catch(e){} }
  const K=CineKit, {seg,lerp,clamp,hash}=K, EA=K.EASE, eout=EA.eout, ein=EA.ein, eio=EA.eio, TAU=Math.PI*2, W=window.Fin1Fight;
  const T={ help:2.6, tilt:4.4, dive:5.8, crash:6.5, sense:7.2, turn:8.6, carHit:9.55, emerge:10.2, rin:11.1, lift:11.8, fire:13.4, f2:14.2, f3:15.0, f4:15.8, half:16.6, halfHit:17.05, clear:18.2, rage:19.4, rage2:20.9, say:21.9, block:22.8, nod:23.6, run:24.3, face:25.3, ready:26.7, DUR:28.3 };
  const H=120;
  // thành phố đã bị Friend phá: vài toà sập sẵn (t âm → chỉ còn đống đổ nát) — toà gần đại lộ cả 2 bên
  const RUIN_XZ=[[-2700,1450],[-1500,1450],[-300,1450],[900,1450],[2100,1450],[-2100,2850],[-900,2850],[300,2850],[1500,2850],[2700,2850],[-900,-1450],[1500,-1450]];   // dãy 1 + dãy 2 sau đại lộ sập gần hết → lộ trăng máu + bóng dãy xa
  const RUINED=RUIN_XZ.map(([x,z])=>({x,z,t:-20,r:720}));
  const CITY=Fin1City({seed:3, collapse:RUINED});
  const theme=t=>CITY.TH_NIGHT;
  const av=k=>'assets/avatars/'+k+'/avatarUrl.webp';
  const CROWD=['popcat','huhcat','cornelius','kermit','cheems','suscat','wetcat','scareddog','scaredhamster','capybara','rickroll','yuki','gary','smartguy','droolingcat','poordog','calmdog','damdamdidi'];
  const IMG={ ...window.FIN1_CITY_IMGS, OBJ:'assets/img/cine/FIN_C6_OBJS.png',
    CG:av('chillguy'), CGK:'assets/avatars/chillguy/skill1AvatarUrl.webp', BAN:av('bananacat'), BANC:'assets/avatars/bananacat/attackAvatarUrl.webp',
    GOJO:'assets/img/mewingcat/MEW_GOJO_IMG.webp', PAIN:'assets/img/depressedcat/DP_PAIN_IMG.webp' };
  for(const k of CROWD) IMG['CR_'+k]=av(k);
  const DIR={CG:-1,CGK:-1};   // ảnh vốn quay mặt TRÁI (−1) → actor tự lật theo đối thủ; còn lại chính diện (0, không lật)
  // vật rời trong FIN_C6_OBJS.png (toạ độ dò vùng liền khối 16/11)
  const OB={tilt:[124,34,294,454],car:[572,308,392,154],lamp:[1210,60,174,426],w1:[76,588,308,348],w2:[454,698,148,232],w3:[654,782,168,148],half:[946,526,526,466]};
  // ───────── NHÂN VẬT / VẬT trong thế giới 3D ─────────
  // người: chân ở (x,y,z), cao h (đơn vị thế giới) · look = điểm nhìn (actor tự lật mặt theo hướng ngang của máy)
  const man=(F,key,x,z,h,o)=>{ o=o||{}; return W.actor(F,Object.assign({key,dir:DIR[key]||0,x,z,y:o.y||0,h,look:o.look||null,shadow:o.shadow!==false},o)); };
  // ảnh BÁN THÂN (Gojo, Pain): làm bản mờ dần mép dưới 1 lần → lơ lửng, chân "chìm" vào hào quang, không lộ mép cắt
  const FADE={};
  function faded(F,key){ if(FADE[key]) return FADE[key]; const im=F.I[key]; if(!im||!im.complete||!im.naturalWidth) return null;
    const c=document.createElement('canvas'); c.width=im.naturalWidth; c.height=im.naturalHeight; const x=c.getContext('2d'); x.drawImage(im,0,0);
    x.globalCompositeOperation='destination-out'; const gr=x.createLinearGradient(0,c.height*0.62,0,c.height); gr.addColorStop(0,'rgba(0,0,0,0)'); gr.addColorStop(1,'rgba(0,0,0,1)'); x.fillStyle=gr; x.fillRect(0,0,c.width,c.height);
    c.complete=true; c.naturalWidth=c.width; c.naturalHeight=c.height; F.I[key+'_F']=c; return FADE[key]=c; }
  const bust=(F,key,x,z,y,h,o)=>W.actor(F,Object.assign({key,dir:0,x,z,y,h,shadow:y<5},o||{}));   // 19/11: ảnh ĐẶC (bỏ mờ mép dưới — anh chê 'xuyên thấu'); y=0 → chạm đất + bóng
  // vật rời (atlas) đặt trong thế giới: tâm vật ở (x,y,z), cao h, xoay rot (rad trên màn hình) — xếp lớp theo độ sâu
  function obj(F,k,x,y,z,h,rot,o){ const im=F.I.OBJ; if(!im||!im.naturalWidth) return; const P=K.proj(F.B,x,y,z); if(!P) return; const b=OB[k]; o=o||{};
    F.list.push({d:P.d+(o.dd||0), fn:()=>{ const g=F.g, hh=h*P.s, ww=hh*b[2]/b[3]; g.save(); if(o.a!=null) g.globalAlpha=o.a; g.translate(P.x,P.y); g.rotate(rot||0); if(o.flip) g.scale(-1,1); g.filter=NIGHT; g.drawImage(im,b[0],b[1],b[2],b[3],-ww/2,-hh/2,ww,hh); g.restore(); }}); }
  function objShadow(F,x,z,r,a){ F.shadows.push({x,z,r,a}); }
  // vật GPT vẽ tông sáng ban ngày → hạ sáng + ửng đỏ ánh lửa / trăng máu cho khớp thành phố đêm (không như dán vào)
  const NIGHT='brightness(0.5) contrast(1.15) saturate(0.7) sepia(0.25)';
  // ───────── VỊ TRÍ (trục: TRÁI = phe Chill Guy / Gojo, PHẢI = Pain) ─────────
  const BX=-1000, BZ=200, SAFE=-1650, SZ=150, CGB=-1390, PX=620, PZ=220, PX2=-500, GX=-1060, GZ=-90, EZ=0, CGW=H*1.35, BANH=H*0.75, GOH=H*1.15, PAH=H*1.3;
  // (17/11 soát) toà nhà đổ từ CHÂN ở x −1200 sang PHẢI (nằm vắt −1200…−300) → chỗ an toàn SAFE −1650 ở bên TRÁI chân toà, không chồng lên nhau
  //   xe lao từ phải tới SAFE → Chill Guy nhảy sang PHẢI (CGB), xe trượt sang TRÁI · vật đã rơi NẰM LẠI trên đường tới hết cảnh (nối cảnh)
  const CGXA=t=>lerp(-650,-420,seg(t,T.help,T.help+1.4));   // A2 đi ngược dòng người
  const DODGE=[CGB,-1000,-1600,-1100,-1450];               // A9: chỗ đứng sau mỗi lần né — giãn ≥400 để đồ rơi KHÔNG đè lên người (anh chê 'đè lên nhau')
  const painX=t=>t<T.half?PX:lerp(PX,PX2,eio(seg(t,T.half,T.rage))), painZ=t=>t<T.half?PZ:lerp(PZ,GZ,eio(seg(t,T.half,T.rage)));   // trôi lại gần + lên cùng hàng với Gojo (đối mặt cùng cỡ)   // sau cú nửa toà nhà Pain trôi lại gần để kết liễu
  // ───────── MÁY: mỗi shot 1 góc TĨNH (máy phía −z nhìn +z) ─────────
  const S=(t0,t1,a)=>({t0,t1,a,ease:'lin'});
  const shots=[
    S(0,T.help,{tx:-760,ty:120,tz:120,dist:760,yaw:5,pitch:-3,fov:52}),                 // A1 toàn đại lộ: dân meme chạy loạn sang trái, Banana ngồi khóc
    S(T.help,T.tilt,{tx:-520,ty:110,tz:0,dist:640,yaw:8,pitch:-2,fov:48}),               // A2 trung: Chill Guy đi NGƯỢC dòng (sang phải), đỡ Pop vấp ngã
    S(T.tilt,T.dive,{tx:BX-60,ty:260,tz:BZ,dist:560,yaw:-10,pitch:-24,fov:56}),          // A3 góc ngước: toà nhà nghiêng dần đổ về phía Banana
    S(T.dive,T.sense,{tx:-1250,ty:130,tz:0,dist:1120,yaw:3,pitch:-3,fov:52}),            // A4 trung rộng: vệt sáng từ phải lao vào ôm Banana lăn sang TRÁI, toà nhà sập ngay sau lưng
    S(T.sense,T.turn,{tx:SAFE-20,ty:125,tz:SZ,dist:300,yaw:10,pitch:-3,fov:44}),         // A5 cận: đặt Banana xuống, linh cảm, quay lại
    S(T.turn,T.emerge,{tx:SAFE+320,ty:150,tz:SZ,dist:960,yaw:-14,pitch:-3,fov:52}),      // A6 xe bay từ phải tới, Chill Guy nhảy sang phải né, xe trượt sang trái
    S(T.emerge,T.lift,{tx:PX,ty:230,tz:PZ,dist:400,yaw:-6,pitch:-16,fov:54}),            // A7 góc ngước: Pain lơ lửng ra khỏi khói, Rinnegan loé
    S(T.lift,T.fire,{tx:PX-40,ty:300,tz:PZ,dist:660,yaw:-4,pitch:-9,fov:54}),            // A8 Pain hút đá, cột đèn, mảng tường lên quanh người
    S(T.fire,T.f2,{tx:CGB+250,ty:150,tz:SZ,dist:900,yaw:-8,pitch:-3,fov:52}),            // A9 tràng bắn: 4 góc, đồ luôn bay từ PHẢI sang
    S(T.f2,T.f3,{tx:CGB+120,ty:120,tz:SZ,dist:620,yaw:14,pitch:-4,fov:50}),
    S(T.f3,T.f4,{tx:CGB+200,ty:100,tz:SZ,dist:700,yaw:-18,pitch:3,fov:50}),
    S(T.f4,T.half,{tx:CGB+150,ty:130,tz:SZ,dist:780,yaw:6,pitch:-3,fov:52}),
    S(T.half,T.clear,{tx:DODGE[4]+150,ty:380,tz:SZ,dist:1150,yaw:0,pitch:-10,fov:56}),   // A10: NỬA TOÀ NHÀ từ trên đập xuống Chill Guy
    S(T.clear,T.rage,{tx:DODGE[4]+20,ty:140,tz:EZ,dist:380,yaw:4,pitch:-8,fov:48}),     // A11a cận: bước ra khỏi khói, nộ bắt đầu bốc
    S(T.rage,T.rage2,{tx:DODGE[4],ty:CGW*0.8,tz:EZ,dist:175,yaw:3,pitch:0,fov:44}),     // A11b CỰC CẬN kiểu Gon: nửa trên mặt chìm trong bóng, hào quang đen đỏ cuộn lên
    S(T.rage2,T.say,{tx:DODGE[4],ty:210,tz:EZ,dist:560,yaw:2,pitch:-20,fov:52}),     // A11c góc ngước: hào quang BÙNG toàn thân, đất nứt, đá vụn bị nâng lên
    S(T.say,T.block,{tx:DODGE[4],ty:210,tz:EZ,dist:560,yaw:2,pitch:-20,fov:52}),   // A11d MÀN ĐEN: im bặt, chữ "Chill, leave it to me." (chưa thấy ai)
    S(T.block,T.face,{tx:(DODGE[4]+GX)/2+40,ty:140,tz:GZ,dist:640,yaw:5,pitch:-3,fov:46}),   // A12 NGẮT: Gojo đã đứng chắn trước · Chill Guy tắt nộ, gật đầu, quay đi vào làn khói
    S(T.face,T.ready,{tx:(GX+PX2)/2,ty:170,tz:GZ,dist:1150,yaw:0,pitch:-3,fov:50}),    // A14 Gojo – Pain đối mặt
    S(T.ready,T.DUR,{tx:(GX+PX2)/2,ty:150,tz:GZ,dist:800,yaw:0,pitch:-2,fov:46})];    //     thủ thế, sắp giao tranh → cắt sang Bat Cat
  // ───────── DIỄN: mỗi khoảng thời gian vẽ đúng ai / cái gì ─────────
  const LOOKR={x:3000,z:0}, LOOKL={x:-3000,z:0};
  function crowd(F,t,n,zMin){ for(let i=0;i<n;i++){ const k=CROWD[i%CROWD.length], sp=300*(0.8+0.5*hash(i+3)), L=1900, x=200-((t*sp+hash(i+7)*L)%L), z=(zMin||-200)+520*hash(i+11), h=H*(0.72+0.25*hash(i+13));
      man(F,'CR_'+k,x,z,h,{y:Math.abs(Math.sin(t*11+i*1.7))*14,lean:-6}); } }   // dân meme chạy loạn sang TRÁI, nhún nhảy, chúi người về trước
  // toà nhà nghiêng đổ (A3–A4): xoay quanh CHÂN toà, ngả về phía Banana (sang phải), đập đất ở T.crash
  const TILT_X=-1200, TILT_Z=BZ+620, TILT_H=720;
  function tiltAngle(t){ if(t<T.tilt) return -0.06; if(t<T.dive) return lerp(-0.06,0.32,ein(seg(t,T.tilt,T.dive))); return t<T.crash?lerp(0.32,1.42,ein(seg(t,T.dive,T.crash))):1.42+0.03*Math.sin(Math.PI*seg(t,T.crash,T.crash+0.25)); }
  function tiltBuilding(F,t){ const im=F.I.OBJ; if(!im||!im.naturalWidth) return; const P=K.proj(F.B,TILT_X,0,TILT_Z); if(!P) return; const b=OB.tilt, a=tiltAngle(t);
    F.list.push({d:P.d, fn:()=>{ const g=F.g, hh=TILT_H*P.s, ww=hh*b[2]/b[3]; g.save(); g.translate(P.x,P.y); g.rotate(a); g.filter=NIGHT; g.drawImage(im,b[0],b[1],b[2],b[3],-ww/2,-hh,ww,hh); g.restore(); }}); }
  // vật đã rơi NẰM LẠI trên đường tới hết cảnh (nối cảnh giữa các shot)
  const CAR_END=[SAFE-220,60,SZ+40,190,3.14];
  function props(F,t){ if(t>=T.tilt) tiltBuilding(F,t);
    if(t>=T.carHit+0.5){ obj(F,'car',CAR_END[0],CAR_END[1],CAR_END[2],CAR_END[3],CAR_END[4]); objShadow(F,CAR_END[0],CAR_END[2],180,0.4); }
    const seg4=[T.fire,T.f2,T.f3,T.f4]; for(let i=0;i<4;i++) if(t>=seg4[i]+0.32){ const it=LIFT[i]; const lay=it[0]==='lamp'; obj(F,it[0],DODGE[i],lay?it[4]*0.21:it[4]*0.48,SZ+120,it[4],lay?Math.PI/2:(i%2?0.14:-0.12)); }   // nằm SÁT đất: cột đèn đổ ngang, mảng tường chống nghiêng
    if(t>=T.halfHit){ obj(F,'half',DODGE[4]+40,205,SZ+60,560,0.2); objShadow(F,DODGE[4]+40,SZ+60,300,0.5); } }
  function cast(F,t){ props(F,t);
    if(t<T.help){ crowd(F,t,26); man(F,'BANC',BX,BZ,BANH); return; }
    if(t<T.tilt){ crowd(F,t,10,300); man(F,'BANC',BX,BZ,BANH);
      const fall=seg(t,T.help+0.35,T.help+0.55), up=seg(t,T.help+1.0,T.help+1.35), popX=-300-(t>T.help+1.35?(t-T.help-1.35)*420:0);
      man(F,'CR_popcat',popX,60,H*0.8,{lean:t<T.help+1.35?-80*fall*(1-up):-6,y:t>T.help+1.35?Math.abs(Math.sin(t*11))*12:0});   // Pop vấp ngã → được đỡ dậy → chạy tiếp
      const x=t<T.help+0.9?CGXA(t):t<T.help+1.4?CGXA(T.help+0.9):lerp(CGXA(T.help+0.9),-420,seg(t,T.help+1.4,T.tilt));
      man(F,'CG',x,40,CGW,{look:t<T.help+0.5?LOOKR:{x:popX,z:60},life:{breath:0.8,sway:0.6,squash:t>T.help+0.95&&t<T.help+1.3?0.35:0}}); return; }
    if(t<T.dive){ man(F,'BANC',BX,BZ,BANH); return; }
    if(t<T.sense){ const r=seg(t,T.dive+0.32,T.crash-0.05);
      if(t<T.dive+0.32){ man(F,'BANC',BX,BZ,BANH); W.dash(F,t,T.dive,T.dive+0.32,[-420,90,40],[BX,80,BZ],{w:26,col:'190,225,255',core:'255,255,250'}); }   // lao tới = vệt sáng (không vẽ người)
      else { const x=t<T.crash-0.05?lerp(BX,SAFE,eout(r)):SAFE, y=t<T.crash-0.05?Math.sin(Math.PI*r)*70:0;
        man(F,'CG',x,BZ-20,CGW,{y,look:LOOKL}); man(F,'BAN',x-30,BZ-60,BANH*0.8,{y:y+CGW*0.32,shadow:false}); }
      if(t>=T.crash){ K.smoke(F,{x:BX,z:BZ+200,t0:T.crash,n:16,spread:1100,rise:260,life:2.4,size:300,seed:61,a:0.6,tint:'110,96,92'}); K.debris(F,{x:BX,y:60,z:BZ+200,t0:T.crash,n:28,speed:1300,life:1.4,size:42,seed:62,col:'#4a4246'}); }
      return; }
    if(t<T.turn){ const turned=t>=T.turn-0.35, put=seg(t,T.sense,T.sense+0.45);
      man(F,'BAN',SAFE-115,SZ+10,BANH,{y:(1-put)*CGW*0.32}); man(F,'CG',SAFE,SZ,CGW,{look:turned?LOOKR:{x:SAFE-200,z:SZ},life:{breath:0.6,squash:put<1?0.25*Math.sin(Math.PI*put):0}}); return; }
    if(t<T.emerge){ const k=seg(t,T.turn+0.15,T.carHit), jump=seg(t,T.carHit-0.22,T.carHit+0.25), cgx=lerp(SAFE,CGB,eout(jump)), air=jump>0&&jump<1;
      man(F,'BAN',SAFE-115,SZ+10,BANH,{a:1-seg(t,T.turn,T.turn+0.3)});   // Banana chạy khỏi khung lúc xe tới
      man(F,'CG',cgx,SZ,CGW,{y:Math.sin(Math.PI*jump)*130,look:LOOKR,lean:air?14*Math.sin(Math.PI*jump):0});   // né = dáng đứng gốc + nghiêng người (không tư thế đá)
      if(t<T.carHit) obj(F,'car',lerp(-200,SAFE,k),lerp(460,70,k*k),lerp(80,SZ,k),lerp(170,190,k),t*7);   // xe bay xoay vòng từ phải tới
      else if(t<T.carHit+0.5){ const v=seg(t,T.carHit,T.carHit+0.5); obj(F,'car',lerp(SAFE,CAR_END[0],eout(v)),60,CAR_END[2],190,lerp(0.4,CAR_END[4],eout(v))); objShadow(F,lerp(SAFE,CAR_END[0],eout(v)),CAR_END[2],180,0.4); }
      if(t>=T.carHit){ K.smoke(F,{x:SAFE-120,z:SZ+40,t0:T.carHit,n:12,spread:600,rise:180,life:1.6,size:220,seed:71,a:0.55,tint:'120,104,100'}); K.sparks(F,{x:SAFE-80,y:40,z:SZ+40,t0:T.carHit,n:40,speed:900,life:0.6,seed:72,col:'255,200,110'}); }
      return; }
    if(t<T.lift){ const a=seg(t,T.emerge,T.emerge+0.9); K.smoke(F,{x:PX,z:PZ,t0:T.emerge-1.5,n:14,spread:700,rise:120,life:4,size:300,seed:81,a:0.55*(1-a*0.6),tint:'70,60,62'});
      bust(F,'PAIN',PX,PZ,H*0.6+Math.sin(t*2)*8,PAH,{a,aura:{preset:'cursed',k:0.6,seed:9}}); painEyes(F,t,PX,PZ); return; }
    if(t<T.fire){ bust(F,'PAIN',PX,PZ,H*0.6+Math.sin(t*2)*8,PAH,{aura:{preset:'cursed',k:0.8,seed:9}});
      LIFT.forEach(([k,dx,yy,dz,h],i)=>{ const r=eout(seg(t,T.lift+0.12*i,T.lift+0.9+0.12*i)); obj(F,k,PX+dx,lerp(h*0.5,yy,r)+Math.sin(t*3+i)*10,PZ+dz,h,Math.sin(t*1.3+i)*0.18); }); return; }
    if(t<T.half){ const seg4=[T.fire,T.f2,T.f3,T.f4,T.half]; let i=0; while(i<3&&t>=seg4[i+1]) i++;
      const a=seg4[i], dg=seg(t,a+0.28,a+0.5), x=lerp(DODGE[i],DODGE[i+1],eout(dg)), air=dg>0&&dg<1;
      man(F,'CG',x,SZ,CGW,{y:Math.sin(Math.PI*dg)*90,look:LOOKR,lean:air?12*Math.sign(DODGE[i+1]-DODGE[i])*Math.sin(Math.PI*dg):0});
      const k=seg(t,a,a+0.32), it=LIFT[i], from=[PX+it[1],it[2],PZ+it[3]], to=[DODGE[i],it[4]*0.5,SZ+120];
      if(t<a+0.32) obj(F,it[0],lerp(from[0],to[0],k),lerp(from[1],to[1],k)+Math.sin(Math.PI*k)*120,lerp(from[2],to[2],k),it[4],t*8);
      else { K.smoke(F,{x:to[0],z:to[2],t0:a+0.32,n:10,spread:500,rise:160,life:1.2,size:200,seed:90+i,a:0.55,tint:'120,104,100'}); K.debris(F,{x:to[0],y:50,z:to[2],t0:a+0.32,n:18,speed:1000,life:1.0,size:30,seed:95+i,col:'#4a4246'}); }
      return; }
    if(t<T.clear){ const k=seg(t,T.half,T.halfHit); bust(F,'PAIN',painX(t),painZ(t),H*0.6,PAH,{aura:{preset:'cursed',k:0.9,seed:9}});
      if(t<T.halfHit){ man(F,'CG',DODGE[4],SZ,CGW,{look:LOOKR}); obj(F,'half',DODGE[4]+40,lerp(2600,205,ein(k)),SZ+60,560,lerp(0.05,0.2,k)); objShadow(F,DODGE[4]+40,SZ+60,300*k,0.5*k); }
      else { K.smoke(F,{x:DODGE[4],z:SZ,t0:T.halfHit,n:30,spread:1600,rise:500,life:3.5,size:560,seed:101,a:0.85,tint:'120,104,100'}); K.debris(F,{x:DODGE[4],y:100,z:SZ,t0:T.halfHit,n:50,speed:1800,life:1.8,size:60,seed:102,col:'#4a4246'}); }
      return; }
    const cgx=DODGE[4], rageOn=t>=T.rage&&t<T.say, nod=t>=T.nod&&t<T.nod+0.4?Math.sin(Math.PI*seg(t,T.nod,T.nod+0.4)):0;   // bước ra khỏi đống đổ nát, đứng cạnh nửa toà nhà
    const runX=t<T.run?cgx:lerp(cgx,cgx-700,ein(seg(t,T.run,T.face)));
    if(t<T.face){ const auraK=t<T.rage?0.5*seg(t,T.rage-0.5,T.rage):rageOn?1:0, walk=seg(t,T.clear,T.rage);   // NGẮT ở T.block: hào quang tắt phụt
      man(F,'CG',runX,t<T.rage?lerp(SZ,EZ,eout(walk)):EZ,CGW,{look:t<T.run?LOOKR:LOOKL,aura:auraK>0.01&&!(t>=T.rage&&t<T.rage2)?{preset:'haki',k:(t>=T.rage2?1.7:1.15)*auraK,seed:4}:null,life:{breath:rageOn?1.9:0.6,squash:0.25*nod}});
      if(t>=T.rage2&&t<T.say){ K.ring(F,cgx,EZ,60+900*eout(seg(t,T.rage2,T.rage2+0.5)),36,1-seg(t,T.rage2,T.rage2+0.5),'255,70,40'); rocks(F,t,T.rage2,cgx,EZ,500,140);
        K.smoke(F,{x:cgx,z:EZ,t0:T.rage2,n:14,spread:900,rise:120,life:1.4,size:220,seed:141,a:0.5,tint:'60,20,20'}); }   // bùng: vòng sóng đỏ, bụi bị thổi bạt, đá vụn nâng lên
      if(t<T.block+0.6) K.smoke(F,{x:DODGE[4],z:SZ,t0:T.halfHit,n:30,spread:1600,rise:500,life:3.5,size:560,seed:101,a:0.85*(1-seg(t,T.clear,T.rage+0.2)),tint:'120,104,100'});
      if(t>=T.run) K.smoke(F,{x:cgx-900,z:EZ,t0:T.run-2,n:16,spread:700,rise:200,life:6,size:420,seed:111,a:0.7,tint:'110,96,92'}); }   // làn khói Chill Guy chạy vào
    if(t>=T.block){ bust(F,'GOJO',GX,GZ,0,GOH,{aura:{preset:'ki',k:t>=T.face?1:0.55,seed:3},life:{breath:0.5}}); K.smoke(F,{x:GX,z:GZ-10,t0:T.block-1,n:6,spread:240,rise:30,life:3,size:110,seed:151,a:0.45,tint:'110,96,92'}); }   // ĐỨNG CHẠM ĐẤT, bụi phủ chân   // đã đứng sẵn (cắt thẳng vào, không loé xuất hiện)
    const rd=seg(t,T.ready,T.DUR);   // THỦ THẾ: 2 bên nhích lại gần, hào quang dâng mạnh, gió cuốn bụi + đá vụn lơ lửng giữa 2 con
    if(t>=T.block) K.smoke(F,{x:PX2,z:GZ-10,t0:T.block-1,n:6,spread:260,rise:30,life:3,size:120,seed:152,a:0.45,tint:'110,96,92'});
    bust(F,'PAIN',t>=T.face?PX2-40*eio(rd):painX(t),painZ(t),t>=T.block?0:H*0.6+Math.sin(t*2)*8,PAH,{aura:{preset:'cursed',k:t>=T.face?1+0.6*rd:0.8,seed:9}});
    if(t>=T.face) standoff(F,t,rd); }
  function rocks(F,t,t0,cx,cz,spread,seed){ for(let i=0;i<10;i++){ const k=seg(t,t0+0.08*i,t0+0.9+0.08*i); if(k<=0) continue; const x=cx+(hash(i+seed)-0.5)*spread, y=20+k*(90+140*hash(i+seed+1))+Math.sin(t*3+i)*8, z=cz+(hash(i+seed+2)-0.5)*spread*0.4;
      const P=K.proj(F.B,x,y,z); if(!P) continue; F.list.push({d:P.d, fn:()=>{ const g=F.g, r=Math.max(1.5,(6+8*hash(i+seed+3))*P.s); g.save(); g.fillStyle='#3d3538'; g.translate(P.x,P.y); g.rotate(t*2+i);
        g.beginPath(); g.moveTo(-r,-r*0.6); g.lineTo(r*0.8,-r); g.lineTo(r,r*0.5); g.lineTo(-r*0.6,r); g.closePath(); g.fill(); g.restore(); }}); } }
  // ───── KHUNG NỘ KIỂU GON (19/11 làm lại GIỐNG GIF anh gửi — D:/meme-anime-lab-videos/ref-gon/gon-angry.gif, tách khung bằng tools/x/gif-frames.html) ─────
  //   GIF: CẬN MẶT choán cả khung · nền + mặt ĐEN tuyệt đối · 2 MẮT tròn trắng RẤT TO (Ø ~1/6 khung) có quầng · LỬA TRẮNG lởm chởm dày chạy dọc MỌI NÉT
  //   (viền ngoài + nét trong: tai, mõm, miệng, lông mày), lưỡi lửa liếm lên trên · đốm trắng li ti · mảnh vỡ xám mờ trôi qua · hình đổi mỗi 0.1s (10 hình/giây).
  const CG_EYES=[[0.54,0.18],[0.673,0.18]];   // 2 mắt trên ảnh gốc avatar Chill Guy (đo lưới 17/11)
  let LINES=null;   // nét của ảnh gốc: [x,y (tỉ lệ ảnh), tx,ty (hướng dọc nét), out (1 = viền ngoài), nx,ny (pháp tuyến hướng ra)] — tính 1 lần (Sobel độ sáng + mép alpha)
  function lineArt(c){ if(LINES) return LINES; const x=c.src.getContext('2d'), d=x.getImageData(c.sx,c.sy,c.sw,c.sh).data, W=c.sw, H2=c.sh;
    const A=(i,j)=>i<0||j<0||i>=W||j>=H2?0:d[(j*W+i)*4+3]/255, Lm=(i,j)=>{ if(i<0||j<0||i>=W||j>=H2) return 1; const k=(j*W+i)*4, a=d[k+3]/255; return a<0.5?1:(d[k]*0.3+d[k+1]*0.59+d[k+2]*0.11)/255; };
    LINES=[]; for(let j=1;j<H2-1;j++) for(let i=1;i<W-1;i++){ const gx=Lm(i+1,j-1)+2*Lm(i+1,j)+Lm(i+1,j+1)-Lm(i-1,j-1)-2*Lm(i-1,j)-Lm(i-1,j+1), gy=Lm(i-1,j+1)+2*Lm(i,j+1)+Lm(i+1,j+1)-Lm(i-1,j-1)-2*Lm(i,j-1)-Lm(i+1,j-1), m=Math.hypot(gx,gy);
      const ax=A(i+1,j)-A(i-1,j), ay=A(i,j+1)-A(i,j-1), out=A(i,j)>0.5&&Math.hypot(ax,ay)>0.3;
      if(m>0.9||out){ const ux=out?-ax:gx, uy=out?-ay:gy, ul=Math.hypot(ux,uy)||1; LINES.push([i/W,j/H2,-uy/ul,ux/ul,out?1:0,ux/ul,uy/ul]); } }
    return LINES; }
  function gonRage(F,t){ const g=F.g, VW=F.VW, VH=F.VH, c=K.prep(F.I.CG); if(!c) return; const L=lineArt(c), u=seg(t,T.rage,T.rage2), fr=Math.floor(t*10);   // 10 hình/giây như GIF
    const sp=VH*0.27, sc=sp/((CG_EYES[1][0]-CG_EYES[0][0])*c.sw)*(1+0.06*u), mx=(CG_EYES[0][0]+CG_EYES[1][0])/2, my=CG_EYES[0][1];   // khoảng 2 mắt = 20% cao khung (Chill Guy mặt dài, mắt gần nhau → lùi máy để thấy viền mặt chụm xuống cằm như GIF), máy dí sát dần
    const jx=(hash(fr*3+1)-0.5)*VH*0.008, jy=(hash(fr*3+2)-0.5)*VH*0.008, cx=VW*0.44+jx, cy=VH*0.36+jy;
    const X=fx=>cx-(fx-mx)*c.sw*sc, Y=fy=>cy+(fy-my)*c.sh*sc;   // LẬT ngang: ảnh gốc quay TRÁI, nộ nhìn về Pain (PHẢI)
    g.save(); g.fillStyle='#000'; g.fillRect(0,0,VW,VH);
    // mảnh vỡ xám mờ trôi qua (vài khung có)
    for(let i=0;i<3;i++){ const sd=Math.floor(fr/3)*7+i*31; if(hash(sd)>0.5) continue; const px=VW*hash(sd+1), py=VH*hash(sd+2), R=VH*(0.12+0.2*hash(sd+3)), an=hash(sd+4)*TAU;
      g.fillStyle='rgba(150,150,150,'+(0.04+0.05*hash(sd+5))+')'; g.beginPath(); for(let k=0;k<4;k++){ const a=an+k*TAU/4+(hash(sd+k+6)-0.5)*0.9, rr=R*(0.5+0.6*hash(sd+k+10)); k?g.lineTo(px+Math.cos(a)*rr,py+Math.sin(a)*rr*0.5):g.moveTo(px+Math.cos(a)*rr,py+Math.sin(a)*rr*0.5); } g.closePath(); g.fill(); }
    // LỬA TRẮNG dọc mọi nét (so GIF 19/11): MẢNG lửa dày, CHÁY THEO CỤM (mỗi khung cụm khác sáng / tắt), lưỡi lửa THON DÀI liếm ra ngoài + lên — không phải lông mảnh đều
    g.globalCompositeOperation='lighter'; g.lineCap='round'; g.lineJoin='round'; g.shadowColor='rgba(255,255,255,0.55)'; g.shadowBlur=VH*0.012; const ps=sc;   // quầng sáng nhẹ như GIF   // ps = px màn / px ảnh
    for(let i=0;i<L.length;i++){ const [fx,fy,tx,ty,out,nx,ny]=L[i], cell=hash(Math.floor(fx*26)*73+Math.floor(fy*26)*151+fr*977); if(cell<0.3) continue;   // cụm tắt khung này
      const sd=fr*7919+i*31; if(hash(sd)<0.25) continue; const x0=X(fx), y0=Y(fy); if(x0<-80||x0>VW+80||y0<-80||y0>VH+80) continue;
      const len=ps*(2.2+3.5*hash(sd+1)), w=Math.max(2.5,VH*(0.006+0.01*hash(sd+2))*(0.7+0.6*cell));
      g.strokeStyle='rgba(255,255,255,'+(0.75+0.25*hash(sd+3))+')'; g.lineWidth=w; g.beginPath(); g.moveTo(x0+tx*len*0.5,y0-ty*len*0.5); g.lineTo(x0+(hash(sd+4)-0.5)*ps,y0+(hash(sd+5)-0.5)*ps); g.lineTo(x0-tx*len*0.5,y0+ty*len*0.5); g.stroke();   // hướng dọc nét đã lật theo X (−tx)
      if(out&&hash(sd+6)<0.22+0.14*u){ let sx=-tx, sy=ty; if(sy>0){ sx=-sx; sy=-sy; } let dx=sx*0.75-nx*0.25, dy=sy*0.75+ny*0.25-0.6;   // vuốt DỌC nét + hướng lên (như GIF), không chĩa ngang như gai
        const dl=Math.hypot(dx,dy)||1; dx/=dl; dy/=dl; const LL=VH*(0.05+0.14*hash(sd+7))*(0.8+0.5*u), bw=VH*(0.012+0.02*hash(sd+8)), px=-dy, py=dx;   // LƯỠI LỬA thon: chân rộng → mũi nhọn, uốn
        const bend=(hash(sd+9)-0.5)*LL*0.5, mx2=x0+dx*LL*0.5+px*bend, my2=y0+dy*LL*0.5+py*bend, tx2=x0+dx*LL+px*bend*1.6, ty2=y0+dy*LL+py*bend*1.6;
        g.fillStyle='rgba(255,255,255,'+(0.7+0.3*hash(sd+10))+')'; g.beginPath(); g.moveTo(x0-px*bw/2,y0-py*bw/2); g.quadraticCurveTo(mx2-px*bw*0.35,my2-py*bw*0.35,tx2,ty2); g.quadraticCurveTo(mx2+px*bw*0.35,my2+py*bw*0.35,x0+px*bw/2,y0+py*bw/2); g.closePath(); g.fill(); } }
    for(let i=0;i<70;i++){ const sd=fr*331+i*17, x=VW*hash(sd), y=VH*hash(sd+1); if(Math.abs(x-cx)>VH*0.9) continue; g.fillStyle='rgba(255,255,255,'+(0.4+0.6*hash(sd+2))+')'; g.fillRect(x,y,Math.max(1.5,VH*0.004),Math.max(2,VH*(0.006+0.012*hash(sd+3)))); }   // đốm trắng li ti
    g.globalCompositeOperation='source-over'; g.shadowBlur=0;
    for(const [fx,fy] of CG_EYES){ const ex=X(fx), ey=Y(fy), R=sp*0.3*(1+0.03*Math.sin(t*40));   // 2 MẮT tròn trắng TO, mép hơi rung, có quầng
      const gr=g.createRadialGradient(ex,ey,R*0.85,ex,ey,R*1.5); gr.addColorStop(0,'rgba(255,255,255,0.45)'); gr.addColorStop(1,'rgba(255,255,255,0)'); g.fillStyle=gr; g.fillRect(ex-R*1.6,ey-R*1.6,R*3.2,R*3.2);
      g.fillStyle='#fff'; g.beginPath(); for(let k=0;k<=20;k++){ const a=k/20*TAU, rr=R*(1+0.035*(hash(fr*41+k)-0.5)); k?g.lineTo(ex+Math.cos(a)*rr,ey+Math.sin(a)*rr):g.moveTo(ex+Math.cos(a)*rr,ey+Math.sin(a)*rr); } g.closePath(); g.fill(); }
    g.restore(); }
  function standoff(F,t,rd){ const cx=(GX+PX2)/2;
    K.smoke(F,{x:cx,z:GZ+40,t0:T.face-0.5,n:14,spread:900,rise:60,life:4,size:160,seed:121,a:0.35,tint:'120,104,100'});   // bụi gió quét sát đất
    for(let i=0;i<10;i++){ const k=seg(t,T.face+0.15*i,T.face+1.2+0.15*i); if(k<=0) continue; const x=cx+(hash(i+130)-0.5)*600, y=20+k*(80+120*hash(i+131))+Math.sin(t*3+i)*8, z=GZ+(hash(i+132)-0.5)*200;
      const P=K.proj(F.B,x,y,z); if(!P) continue; F.list.push({d:P.d, fn:()=>{ const g=F.g, r=Math.max(1.5,(6+8*hash(i+133))*P.s); g.save(); g.fillStyle='#3d3538'; g.translate(P.x,P.y); g.rotate(t*2+i);
        g.beginPath(); g.moveTo(-r,-r*0.6); g.lineTo(r*0.8,-r); g.lineTo(r,r*0.5); g.lineTo(-r*0.6,r); g.closePath(); g.fill(); g.restore(); }}); } }   // đá vụn bị sức ép 2 bên nâng lên lơ lửng
  // đồ Pain hút lên (A8) rồi ném lần lượt (A9): [vật, lệch x, độ cao lơ lửng, lệch z, cao]
  const LIFT=[['lamp',-330,520,40,420],['w1',300,560,60,300],['w3',-160,780,-40,190],['w2',420,840,20,260]];
  // mắt Rinnegan loé (A7): 2 mắt trên ảnh DP_PAIN_IMG (tỉ lệ khung đo trong game: DP_EYES)
  function painEyes(F,t,x,z){ if(t<T.rin||t>=T.rin+0.45) return; const c=K.prep(F.I.PAIN_F||F.I.PAIN); if(!c) return; const y=H*0.6+Math.sin(t*2)*8, P=K.proj(F.B,x,y,z); if(!P) return;
    const hh=PAH*P.s, ww=hh*c.sw/c.sh, a=1-seg(t,T.rin,T.rin+0.45);
    F.list.push({d:P.d-1, fn:()=>{ const g=F.g; g.save(); g.globalCompositeOperation='lighter'; for(const [ex,ey] of [[0.463,0.299],[0.702,0.268]]){ const px=P.x-ww/2+ex*ww, py=P.y-hh+ey*hh, R=Math.max(3,hh*0.06);
        const gr=g.createRadialGradient(px,py,0,px,py,R*3); gr.addColorStop(0,'rgba(240,220,255,'+a+')'); gr.addColorStop(0.3,'rgba(190,140,255,'+(0.8*a)+')'); gr.addColorStop(1,'rgba(150,90,255,0)'); g.fillStyle=gr; g.fillRect(px-R*3,py-R*3,R*6,R*6); } g.restore(); }}); }
  function world(F,t){ F.t=t; const th=theme(t); CITY.draw(F,t,th);
    RUIN_XZ.forEach(([x,z],i)=>{ K.smoke(F,{x,z,t0:-2,n:5,spread:700,rise:1100,life:60,size:560,seed:700+i,a:0.3,tint:'64,48,46'}); fire(F,x,z,t,i); });   // khói cột + lửa âm ỉ ở từng đống đổ nát
    embers(F,t); cast(F,t); }
  // 🔥 lửa cháy ở chân đống đổ nát: quầng cam (cộng sáng) + lưỡi lửa nhấp nháy, đặt trong thế giới 3D (xếp lớp theo độ sâu)
  function fire(F,x,z,t,i){ const P=K.proj(F.B,x,40,z); if(!P) return; F.list.push({d:P.d-5, fn:()=>{ const g=F.g, R=Math.max(6,260*P.s); g.save(); g.globalCompositeOperation='lighter';
      let gr=g.createRadialGradient(P.x,P.y,0,P.x,P.y,R*2.2); gr.addColorStop(0,'rgba(255,140,50,0.45)'); gr.addColorStop(1,'rgba(255,80,20,0)'); g.fillStyle=gr; g.fillRect(P.x-R*2.2,P.y-R*2.2,R*4.4,R*4.4);
      for(let k=0;k<7;k++){ const fx=P.x+(hash(i*13+k)-0.5)*R*2.2, fh=R*(0.45+0.55*hash(i*13+k+5))*(0.8+0.2*Math.sin(t*7+k*2.3+i)), fw=R*(0.18+0.14*hash(i*13+k+9)), sw=Math.sin(t*5+k*1.7+i)*fw*0.9;   // lưỡi lửa MỀM: thân phình, đỉnh cong lắc theo gió
        gr=g.createLinearGradient(0,P.y,0,P.y-fh); gr.addColorStop(0,'rgba(255,215,120,0.75)'); gr.addColorStop(0.45,'rgba(255,120,40,0.45)'); gr.addColorStop(1,'rgba(255,60,20,0)'); g.fillStyle=gr;
        g.beginPath(); g.moveTo(fx-fw,P.y); g.bezierCurveTo(fx-fw*1.3,P.y-fh*0.35,fx-fw*0.2+sw*0.5,P.y-fh*0.7,fx+sw,P.y-fh); g.bezierCurveTo(fx+fw*0.3+sw*0.5,P.y-fh*0.7,fx+fw*1.3,P.y-fh*0.35,fx+fw,P.y); g.closePath(); g.fill(); }
      g.restore(); }}); }
  // tàn lửa bay lên (màn hình, nhẹ) — băm theo t, không Math.random
  function embers(F,t){ F.list.push({d:-1e8, fn:()=>{ const g=F.g; g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<34;i++){ const x=((hash(i+900)*F.VW+t*18*(0.5+hash(i+905)))%F.VW), y=F.VH-((t*35*(0.5+hash(i+910))+hash(i+915)*F.VH)%F.VH), a=0.35+0.4*Math.sin(t*4+i);
      g.fillStyle='rgba(255,'+(140+60*hash(i+920)|0)+',70,'+Math.max(0,a)+')'; g.fillRect(x,y,2+2*hash(i+925),2+2*hash(i+925)); } g.restore(); }}); }
  // ⚡ TRÀNG CHỚP IMPACT (học 3 video mẫu anh gửi 17/11 — skill edit-video mục 8): mỗi hình 1 khung, đổi liên tục giữa
  //   'bw' = bóng ĐEN trên nền TRẮNG · 'wb' = đảo ngược · 'w' = trắng xoá · 'k' = đen + sao 4 cánh nhỏ ở tâm
  const FR=1/30, STROBES=[[T.carHit,'bw wb w'],[T.halfHit,'bw wb bw k w wb bw w wb w'],[T.rage2,'bw wb w']];
  function strobe(t){ for(const [t0,seq] of STROBES){ const L=seq.split(' '), i=Math.floor((t-t0)/FR); if(i>=0&&i<L.length) return {kind:L[i],t0}; } return null; }
  const IMPC={bw:{fg:'#000000',bg:'#ffffff'}, wb:{fg:'#ffffff',bg:'#000000'}};
  // ⏱️ nhanh – chậm đan xen: linh cảm / khói tan / thủ thế CHẬM · né, đập NHANH
  const RETIME=[[0,T.help,1],[T.help,T.tilt,0.95],[T.tilt,T.dive,1],[T.dive,T.sense,0.9],[T.sense,T.turn,1.15],[T.turn,T.emerge,0.9],[T.emerge,T.fire,1],[T.fire,T.half,0.9],
    [T.half,T.halfHit,0.9],[T.halfHit,T.clear,1.1],[T.clear,T.rage,1.1],[T.rage,T.say,1.1],[T.say,T.block,1],[T.block,T.face,1],[T.face,T.DUR,1.1]];
  const def={ id:'fin1c6', title:'Final 1 · Chill Guy', cast:['cry','chillguy','dp','mw'], sfxOk:{pd_truck_crash:'tiếng xe đâm CHUNG (không phải tiếng đặc trưng Poor Dog)'}, DUR:T.DUR, VW:960, VH:540, fadeIn:false, fadeOut:false, imgs:IMG, theme:t=>theme(t), shots, world,
    // 🔊 không nhạc nền (tiếng thành phố + đám đông) · LẶNG lúc linh cảm · tiếng va chạm NGẮT khi hết cú (anh 17/11)
    sfx:[[0.2,'se_collapse_b',0.45,1.6,'mưa gạch đá, nhà đổ xa'],
      [T.help+0.5,'se_step_in',0.5,0.4,'Pop Cat vấp ngã, Chill Guy dừng lại đỡ dậy'],
      [T.tilt+0.1,'se_collapse',0.6,1.3,'toà nhà nghiêng, gạch đá rơi rào rào xuống phía Banana Cat'],[T.tilt+0.35,'cry_banana_cat',0.85,T.dive-T.tilt-0.35,'+ Banana Cat ngồi khóc ngước lên (lớp của tiếng nhà đổ)'],
      [T.dive,'se_whoosh_fast',0.7,0.4,'Chill Guy hoá vệt sáng lao tới ôm Banana'],[T.crash,'l2p_crack',0.9,0.7,'toà nhà đập sập xuống ngay sau lưng'],
            [T.carHit,'pd_truck_crash',1,0.9,'xe đâm sầm, lật nhào trên mặt đường — Chill Guy nhảy né kịp'],
      [T.emerge+0.2,'l2p_sub',0.5,T.lift-T.emerge-0.2,'Depressed (Pain) lơ lửng bước ra từ khói, Rinnegan loé'],
      [T.lift,'l2p_riser',0.6,T.fire-T.lift,'cột đèn, mảng tường bị hút lên lơ lửng quanh Pain'],
      [T.fire+0.32,'se_rock_break',0.8,0.6,'cột đèn đập xuống chỗ Chill Guy vừa né'],[T.f2+0.32,'se_wall_break',0.8,0.6,'mảng tường lớn vỡ tung'],[T.f3+0.32,'kn_boom_low',0.65,0.5,'mảng tường nhỏ nổ bụi'],[T.f4+0.32,'se_collapse',0.75,0.7,'mảng tường cuối rơi đập xuống đất'],
      [T.halfHit,'cine_deep_impact',1,1.2,'NỬA TOÀ NHÀ đập trúng Chill Guy'],[T.halfHit+0.12,'se_tremor',0.5,1.0,'+ đất rung, bụi phủ kín (lớp của cú nện)'],
      [T.rage,'l2p_riser',0.6,T.rage2-T.rage,'cực cận: Chill Guy hoá bóng đen, 2 mắt trắng rực, nộ dâng lên'],[T.rage2,'chillguy_uppercut',0.9,T.say-T.rage2,'I\'M NOT CHILL ANYMORE: hào quang nộ bùng toàn thân'],[T.rage2+0.02,'kn_boom_low',0.55,0.5,'+ lớp nổ trầm: hào quang nộ BÙNG như vụ nổ, đất nứt (lớp của tiếng nộ)'],
      [T.run+0.1,'se_step_in',0.4,0.4,'Chill Guy quay người chạy vào làn khói'],
      [T.face+0.3,'l2p_riser',0.55,T.DUR-T.face-0.3,'Gojo và Pain đối mặt, sức ép dâng lên'],[T.ready+0.4,'ep3_whoosh',0.5,0.6,'+ gió cuốn bụi, đá vụn bị nâng lên giữa 2 bên (lớp của sức ép)']],
    // 🎵 KHÔNG nhạc nền / tiếng nền (anh 18/11: anh tự thêm) — chỉ tim đập căng thẳng lúc linh cảm · TIM ĐẬP TO lúc nộ (tắt phụt khi hiện chữ) · câu Gojo CHỈ BẰNG CHỮ (anh 19/11: không lồng giọng)
    mus:[{src:'assets/audio/cine_heart.mp3',ra:T.sense+0.3,rb:T.turn,off:0,vol:0.6,fi:0.12,fo:0.12},
      {src:'assets/audio/cine_heart.mp3',ra:T.rage,rb:T.say,off:0,vol:1.0,fi:0.05,fo:0.02}],
    impact:t=>{ const s=strobe(t); return s&&IMPC[s.kind]?IMPC[s.kind]:0; },
    grade:t=>{ const s=strobe(t); if(t>=T.rage&&t<T.rage2) return null;   // khung nộ Gon: trắng tinh trên đen tuyệt đối (không chỉnh màu đè)
      if(s&&s.kind==='w') return {white:1}; if(s&&s.kind==='k') return {bright:0.02};
      if(t>=T.sense+0.5&&t<T.turn) return {sat:0.55,bright:0.92};   // linh cảm: màu nhạt đi
      const E=K.edit; return E.mix(E.burn(t,T.halfHit+0.34,T.halfHit+0.5,0.1),E.rgb(t,T.carHit+0.1,0.4,6),E.rgb(t,T.rage2+0.1,0.5,10),E.duotone(t,T.rage2,T.say,'#0a0000','#ff3a22',0.08,0.45)); },
    shake:t=>{ let s=0; const h=(a,amp,d)=>{ if(t>=a&&t<a+d) s=Math.max(s,amp*(1-(t-a)/d)); };
      if(t<T.sense) s=1; h(T.crash,10,0.5); h(T.carHit,14,0.6); for(const x of [T.fire,T.f2,T.f3,T.f4]) h(x+0.32,6,0.3); h(T.halfHit,24,1.0); h(T.rage,6,0.8); if(t>=T.rage&&t<T.say) s=Math.max(s,t<T.rage2?2:4); h(T.rage2,12,0.6);
      if(t>=T.ready) s=Math.max(s,1+2*seg(t,T.ready,T.DUR)); return s; },
    post(F,t){ const fx={shocks:[]}, sh=(a,x,y,z,rm,d,str)=>{ if(t>=a&&t<a+d){ const u=(t-a)/d; fx.shocks.push({x,y,z,r:20+rm*eout(u),w:30,str:str*(1-u)}); fx.chroma=Math.max(fx.chroma||0,0.3*(1-u)); } };
      sh(T.crash,BX,40,BZ+200,700,0.5,16); sh(T.carHit,SAFE,40,SZ,600,0.5,20); sh(T.halfHit,DODGE[4],60,SZ,900,0.8,30); sh(T.rage,DODGE[4],80,EZ,500,0.7,16); sh(T.rage2,DODGE[4],100,EZ,800,0.7,24); return fx; },
    screen(F,t){ const g=F.g, VW=F.VW, VH=F.VH;
      const s=strobe(t); if(s&&s.kind==='k'){ const L=VW*0.12, W=VH*0.008; g.save(); g.globalCompositeOperation='lighter'; g.fillStyle='rgba(255,255,255,0.95)';   // sao 4 cánh nhỏ ở tâm
        for(let i=0;i<4;i++){ const an=i*Math.PI/2, len=i%2?L*0.6:L, c=Math.cos(an), sn=Math.sin(an); g.beginPath(); g.moveTo(VW/2-sn*W,VH/2+c*W); g.lineTo(VW/2+c*len,VH/2+sn*len); g.lineTo(VW/2+sn*W,VH/2-c*W); g.closePath(); g.fill(); } g.restore(); }
      if(t>=T.dive&&t<T.dive+0.32) K.speedLines(F,{k:0.35,n:40,r0:0.45});
      if(t>=T.turn-0.4&&t<T.turn){ const P=K.proj(F.B,SAFE,CGW*1.08,SZ); if(P){ const k=seg(t,T.turn-0.4,T.turn-0.25)*(1-seg(t,T.turn-0.1,T.turn)); g.save(); g.strokeStyle='rgba(255,255,255,'+(0.9*k)+')'; g.lineWidth=3; g.lineCap='round';
        for(let i=0;i<5;i++){ const an=-Math.PI/2+(i-2)*0.32, r0=VH*0.07, r1=VH*0.12; g.beginPath(); g.moveTo(P.x+Math.cos(an)*r0,P.y+Math.sin(an)*r0); g.lineTo(P.x+Math.cos(an)*r1,P.y+Math.sin(an)*r1); g.stroke(); } g.restore(); } }   // vạch LINH CẢM kiểu manga trên đầu
      if(t>=T.rage&&t<T.rage2) gonRage(F,t);   // khung nộ kiểu GON (GIF anh gửi)
      if(t>=T.rage2&&t<T.say) K.speedLines(F,{k:0.45*(1-seg(t,T.rage2+0.3,T.say)),n:60,r0:0.35,col:'rgba(255,120,90,0.7)'});
      if(t>=T.rage2&&t<T.say){ const k=seg(t,T.rage2,T.rage2+0.15), fr=Math.floor(t*12); g.save(); g.font='900 '+Math.round(VH*0.072*lerp(1.35,1,k))+'px Montserrat, Arial Black, sans-serif'; g.textAlign='center';
        g.lineWidth=8; g.strokeStyle='#000'; g.fillStyle='#ff2a1a'; g.translate(VW/2+(hash(fr)-0.5)*5,VH*0.17+(hash(fr+7)-0.5)*4); g.strokeText("I'M NOT CHILL ANYMORE",0,0); g.fillText("I'M NOT CHILL ANYMORE",0,0); g.restore(); }   // chữ đỏ đúng game
      if(t>=T.say&&t<T.block){ const k=seg(t,T.say+0.12,T.say+0.2); g.save(); g.fillStyle='#000'; g.fillRect(0,0,VW,VH); g.globalAlpha=k; g.font='800 '+Math.round(VH*0.06)+'px Montserrat, "Segoe UI", sans-serif'; g.textAlign='center'; g.textBaseline='middle';
        g.fillStyle='#fff'; g.fillText('Chill, leave it to me.',VW/2,VH/2); g.restore(); }   // MÀN ĐEN + CHỮ (giọng chưa lộ mặt) → rồi mới cắt sang Gojo
      if(!s&&!(t>=T.rage&&t<T.rage2)&&!(t>=T.say&&t<T.block)) K.letterbox(F,t>=T.sense+0.5&&t<T.turn?0.5:(t>=T.ready?0.6*seg(t,T.ready,T.ready+0.5):0)); if(!s&&!(t>=T.rage&&t<T.rage2)&&!(t>=T.say&&t<T.block)) K.vignette(F,0.5); } };   // khung chớp phải trắng / đen TUYỆT ĐỐI (không viền tối)
  CineKit.film(W&&W.retime?W.retime(RETIME,def):def);
})();
