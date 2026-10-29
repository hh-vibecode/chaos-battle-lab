// ===================== 🎬 BÀI THỬ CINE-KIT · BUFF DOGE vs SAMURAI CHEEMS (~7.6s, 9:16) =====================
// Mục đích: thử bộ dựng anime 2.5D (js/cine-kit.js) — góc cao chéo, bay vòng quanh 2 nhân vật, góc thấp, qua vai,
// khói + vệt chém + hào quang + khung impact. Ảnh nhân vật lấy từ kho phim/game sẵn có (sau thay bằng khung anh vẽ ChatGPT).
// Mỗi nhịp 1 hành động có lý do:
//   1 toàn cảnh góc cao chéo: 2 đứa đứng đối mặt giữa sân đá lúc hoàng hôn, gió cuốn bụi
//   2 góc thấp cận Cheems: mắt đỏ, hào quang xanh bùng lên → nó sẵn sàng rút kiếm
//   3 qua vai Cheems: Doge lao tới (nhoè + bụi)
//   4 VA CHẠM: khung impact đảo màu, sóng xung kích, chữ "DON!"
//   5 máy bay vòng từ trên cao: 2 đứa ghì nhau, khói xoáy, tia lửa, hào quang xanh vs vàng đè nhau
//   6 Cheems hất ra bằng 1 nhát chém lớn, Doge bật lùi
//   7 Doge gồng tay haki đen → lao tới đấm, khung impact đỏ → Cheems bay văng xa
//   8 toàn cảnh: bụi mù chỗ Cheems rơi, Doge đứng — tên trận
(function(){
  if(!window.CineKit || CineKit.films.dvc) return;
  const K=CineKit, {seg,lerp,clamp,eio,eout,ein,hash}=K;
  const C={ x:-170, h:105 }, D={ x:170, h:200 };   // vị trí + chiều cao (chuẩn MU: meme 100, Buff Doge 200)
  const T={ s2:1.5, s3:2.3, dash:2.45, s4:3.0, s5:3.25, s6:4.7, s7:5.35, punch:5.9, hit:6.0, s8:6.35, DUR:7.6 };
  const CLASH=0;   // điểm va chạm (x)
  const theme={ sky:['#1d1033','#b84a66','#ffb36b'], sun:{x:200,y:0.15,r:34,col:'rgba(255,214,150,A)'}, mount:['#6b3a5e','#462543'],
                ground:['152,126,108','140,114,98','58,42,38'], fog:'205,140,128', tile:110, R:2400 };
  const shots=[
    {t0:0,    t1:T.s2, a:{tx:0,ty:70,tz:0,dist:950,yaw:-40,pitch:50,fov:44}, b:{tx:0,ty:70,tz:0,dist:820,yaw:-22,pitch:46,fov:44}},
    {t0:T.s2, t1:T.s3, a:{tx:C.x,ty:65,tz:0,dist:250,yaw:28,pitch:-14,roll:7,fov:48}, b:{tx:C.x,ty:70,tz:0,dist:205,yaw:22,pitch:-16,roll:10,fov:48}, ease:'eout'},
    {t0:T.s3, t1:T.s4, a:{tx:120,ty:95,tz:0,dist:470,yaw:-84,pitch:6,roll:-4,fov:50,ox:0.08}, b:{tx:-20,ty:95,tz:0,dist:390,yaw:-80,pitch:6,roll:-6,fov:50,ox:0.08}, ease:'ein'},
    {t0:T.s4, t1:T.s5, a:{tx:CLASH,ty:85,tz:0,dist:560,yaw:0,pitch:8,fov:46}, b:{tx:CLASH,ty:85,tz:0,dist:540,yaw:0,pitch:8,fov:46}},
    {t0:T.s5, t1:T.s6, a:{tx:CLASH,ty:40,tz:0,dist:640,yaw:-20,pitch:74,fov:46}, b:{tx:CLASH,ty:40,tz:0,dist:560,yaw:190,pitch:62,fov:46}, ease:'eio'},
    {t0:T.s6, t1:T.s7, a:{tx:-10,ty:80,tz:0,dist:500,yaw:32,pitch:4,roll:-3,fov:50}, b:{tx:60,ty:85,tz:0,dist:540,yaw:24,pitch:6,roll:-8,fov:50}, ease:'eout'},
    {t0:T.s7, t1:T.punch, a:{tx:210,ty:120,tz:0,dist:300,yaw:-25,pitch:-12,roll:-6,fov:50}, b:{tx:210,ty:125,tz:0,dist:250,yaw:-30,pitch:-14,roll:-9,fov:50}, ease:'eout'},
    {t0:T.punch, t1:T.s8, a:{tx:90,ty:80,tz:0,dist:520,yaw:4,pitch:6,roll:4,fov:52}, b:{tx:-200,ty:80,tz:0,dist:620,yaw:4,pitch:8,roll:2,fov:52}, ease:'eout'},
    {t0:T.s8, t1:T.DUR, a:{tx:-200,ty:60,tz:0,dist:1150,yaw:18,pitch:40,fov:44}, b:{tx:-200,ty:60,tz:0,dist:1250,yaw:24,pitch:38,fov:44}},
  ];
  // ảnh gốc nhìn sang TRÁI → lật khi đối thủ nằm bên phải trên màn hình
  const faceFlip=(F,x,ox)=>{ const a=K.proj(F.B,x,0,0), b=K.proj(F.B,ox,0,0); return a&&b ? b.x>a.x : x<ox; };
  // vị trí Doge theo thời gian
  function doge(t){ const tq=K.twos(t);
    if(t<T.dash) return {x:D.x, y:0, im:'dBuff'};
    if(t<T.s4){ const k=ein(seg(tq,T.dash,T.s4)); return {x:lerp(D.x,CLASH+55,k), y:0, im:'dP1', sm:{dx:-180,dy:0,dz:0,n:6}}; }
    if(t<T.s6){ const w=Math.sin(t*26)*4; return {x:CLASH+55+w, y:0, im:'dP2'}; }
    if(t<T.s7){ const k=eout(seg(tq,T.s6+0.12,T.s6+0.55)); return {x:lerp(CLASH+55,230,k), y:Math.sin(k*Math.PI)*70, im:'dP5', sm:k<0.9?{dx:90,dy:0,dz:0,n:4}:null}; }
    if(t<T.punch) return {x:230, y:0, im:'dHaki'};
    if(t<T.s8){ const k=ein(seg(tq,T.punch,T.hit)); return {x:lerp(230,C.x+60,k), y:0, im:'dP4', sm:t<T.hit+0.05?{dx:-220,dy:0,dz:0,n:7}:null}; }
    return {x:C.x+60, y:0, im:'dBuff'}; }
  function cheems(t){ const tq=K.twos(t);
    if(t<T.s3) return {x:C.x, y:0, im:t<T.s2?'cIdle':'cRage', lean:0};
    if(t<T.s4) return {x:C.x, y:0, im:'cBack', lean:0};
    if(t<T.s6){ const k=eout(seg(tq,T.s4-0.05,T.s4+0.1)); return {x:lerp(C.x,CLASH-70,k), y:20, im:'cSlash', lean:Math.sin(t*24)*2}; }
    if(t<T.hit) return {x:CLASH-60, y:t<T.s6+0.3?20+30*Math.sin(seg(t,T.s6,T.s6+0.3)*Math.PI):0, im:t<T.s7?'cSlash':'cRage', lean:0};
    const k=eout(seg(t,T.hit,T.hit+0.9)); return {x:lerp(CLASH-60,-1050,k), y:Math.sin(Math.min(1,k*1.15)*Math.PI)*160, im:'cRage', lean:-k*540, gone:k>=1}; }
  CineKit.film({ id:'dvc', title:'Anime Test · Buff Doge vs Samurai Cheems', DUR:T.DUR,
    imgs:{ dBuff:'assets/img/cine/CINE_DOGE_BUFF.webp', dP1:'assets/img/cine/CINE_DOGE_P1.webp', dP2:'assets/img/cine/CINE_DOGE_P2.webp', dP4:'assets/img/cine/CINE_DOGE_P4.webp',
           dP5:'assets/img/cine/CINE_DOGE_P5.webp', dHaki:'assets/img/cine/CINE_DOGE_HAKI.webp',
           cIdle:'assets/avatars/samuraicheems/avatarUrl.webp', cRage:'assets/avatars/samuraicheems/rageAvatarUrl.webp', cBack:'assets/img/cine/CINE_SM_BACK.webp', cSlash:'assets/img/cine/CINE_SM_SLASH.webp' },
    sfx:[[T.s2+0.1,'sm_schwing',0.9],[T.dash,'fr_dash',1],[T.s4,'cine_haki_hit',1],[T.s5+0.2,'lightsaber_clash_06',0.8],[T.s6,'sm_slash',0.9],[T.s7+0.05,'cine_haki',1],[T.hit,'cine_strongpunch',1],[T.s8+0.1,'cine_impact_jr1',0.8]],
    theme, shots,
    impact:t=>(t>=T.s4&&t<T.s4+0.07)?'inv':(t>=T.s4+0.07&&t<T.s4+0.14)?'bw':(t>=T.hit&&t<T.hit+0.07)?'red':(t>=T.hit+0.07&&t<T.hit+0.13)?'inv':0,
    shake:t=>Math.max(t>=T.s4?14*(1-seg(t,T.s4,T.s4+0.45)):0, (t>=T.s5&&t<T.s6)?2.2:0, t>=T.s6&&t<T.s6+0.25?6:0, t>=T.hit?18*(1-seg(t,T.hit,T.hit+0.6)):0, t>=T.s8+0.1&&t<T.s8+0.6?5*(1-seg(t,T.s8+0.1,T.s8+0.6)):0),
    world(F,t){ const I=F.I, d=doge(t), c=cheems(t);
      const dFl=faceFlip(F,d.x,c.x), cFl=faceFlip(F,c.x,d.x);
      const auraC=(t>=T.s2&&t<T.s7)?{col:'90,170,255',k:t<T.s3?seg(t,T.s2,T.s2+0.4):0.85}:null;
      const auraD=(t>=T.s5&&t<T.s6)?{col:'255,200,70',k:0.8}:(t>=T.s7&&t<T.s8)?{col:'170,20,40',k:seg(t,T.s7,T.s7+0.35)}:null;
      if(!c.gone) K.sprite(F,{img:I[c.im],x:c.x,y:c.y,z:0,h:c.im==='cSlash'?C.h*1.15:C.h,flip:c.im==='cBack'?false:cFl,lean:c.lean,aura:auraC,white:(t>=T.hit&&t<T.hit+0.1)?1:0});
      K.sprite(F,{img:I[d.im],x:d.x,y:d.y,z:0,h:D.h,flip:dFl,smear:d.sm,aura:auraD});
      // gió cuốn bụi lúc mở màn
      K.smoke(F,{x:0,z:60,t0:-0.3,n:12,spread:560,rise:20,life:2.2,size:30,seed:1,swirl:0.25,a:0.35,tint:'190,140,120'});
      // bụi chân lúc Doge lao
      if(t>=T.dash&&t<T.s5) for(let i=0;i<4;i++){ const tt=T.dash+i*0.12; K.smoke(F,{x:lerp(D.x,CLASH,i/4),z:0,t0:tt,n:4,spread:40,rise:40,life:0.8,size:34,seed:20+i}); }
      // va chạm 1: sóng xung kích + khói tròn + đá vụn
      if(t>=T.s4){ const u=seg(t,T.s4,T.s4+0.5); K.ring(F,CLASH,0,40+520*eout(u),14,1-u,'150,200,255');
        K.smoke(F,{x:CLASH,z:0,t0:T.s4,n:14,spread:320,rise:60,life:1.6,size:52,seed:3,swirl:t<T.s6?1.6:0.3,a:0.7}); K.debris(F,{x:CLASH,z:0,t0:T.s4,n:12,speed:420,life:1.4,size:9,seed:5}); }
      // ghì nhau: tia lửa liên tục + sóng nhỏ đều đều
      if(t>=T.s5&&t<T.s6){ for(let i=0;i<4;i++) K.sparks(F,{x:CLASH,y:70,z:0,t0:T.s5+i*0.35,n:14,speed:380,life:0.5,seed:40+i});
        const ph=((t-T.s5)%0.35)/0.35; K.ring(F,CLASH,0,30+260*eout(ph),8,(1-ph)*0.8,'255,210,120');
        K.smoke(F,{x:CLASH,z:0,t0:T.s5,n:14,spread:280,rise:24,life:1.5,size:42,seed:9,swirl:2.4,a:0.55}); }
      // nhát chém hất ra
      if(t>=T.s6-0.02&&t<T.s6+0.45){ const k=seg(t,T.s6,T.s6+0.16), a=1-seg(t,T.s6+0.18,T.s6+0.45); K.slash(F,CLASH-20,80,0,{R:170,span:170,ang:-35,k,a,col:'120,200,255'}); }
      // cú đấm haki: khói cuộn sau lưng Cheems, sóng đỏ, đá văng, rồi bụi mù chỗ nó rơi
      if(t>=T.hit){ const u=seg(t,T.hit,T.hit+0.6); K.ring(F,C.x+20,0,40+600*eout(u),18,1-u,'255,70,70');
        K.smoke(F,{x:C.x-60,z:0,t0:T.hit,n:20,spread:360,rise:80,life:2.0,size:70,seed:12,tint:'120,60,70'}); K.debris(F,{x:C.x,z:0,t0:T.hit,n:16,speed:560,life:1.6,size:11,seed:15,dir:180,cone:120});
        K.sparks(F,{x:C.x+20,y:80,z:0,t0:T.hit,n:24,speed:600,life:0.6,seed:17,col:'255,120,100'}); }
      if(t>=T.hit+0.85) K.smoke(F,{x:-1050,z:0,t0:T.hit+0.85,n:22,spread:260,rise:110,life:2.4,size:80,seed:30}); },
    screen(F,t){
      if(t>=T.s2&&t<T.s3) K.speedLines(F,{k:0.5+0.5*seg(t,T.s2,T.s3),n:60,r0:0.36});
      if(t>=T.dash&&t<T.s4) K.panLines(F,{k:0.8,ang:-4});
      if(t>=T.s4&&t<T.s4+0.4) K.sfxText(F,'DON!',F.VW*0.5,F.VH*0.3,{t0:T.s4,life:0.6,px:92,rot:-10});
      if(t>=T.s5&&t<T.s6) K.speedLines(F,{k:0.35,n:40,r0:0.42});
      if(t>=T.s6&&t<T.s6+0.3) K.panLines(F,{k:1-seg(t,T.s6,T.s6+0.3),ang:20});
      if(t>=T.s7&&t<T.punch) K.speedLines(F,{k:seg(t,T.s7,T.punch),n:80,r0:0.3,col:'rgba(20,0,0,0.9)'});
      if(t>=T.punch&&t<T.hit) K.panLines(F,{k:1,ang:0,n:34});
      if(t>=T.hit&&t<T.hit+0.7) K.sfxText(F,'BAM!!',F.VW*0.42,F.VH*0.34,{t0:T.hit,life:0.8,px:100,rot:8,col:'#ff4d4d'});
      if(t>=T.s4&&t<T.s4+0.05) K.flash(F,0.8,'#fff');
      K.letterbox(F,t<T.s2?1-seg(t,1.0,T.s2):t>=T.s8?seg(t,T.s8,T.s8+0.4):0);
      K.vignette(F,0.45);
      if(t>=T.s8+0.4){ const g=F.g, a=seg(t,T.s8+0.4,T.s8+0.8); g.save(); g.globalAlpha=a; g.textAlign='center'; g.font='900 44px "Arial Black",Impact,sans-serif'; g.lineJoin='round';
        g.lineWidth=10; g.strokeStyle='#000'; g.strokeText('BUFF DOGE',F.VW/2,F.VH*0.2); g.fillStyle='#ffd34d'; g.fillText('BUFF DOGE',F.VW/2,F.VH*0.2);
        g.font='900 26px "Arial Black",Impact,sans-serif'; g.lineWidth=7; g.strokeText('vs',F.VW/2,F.VH*0.2+38); g.fillStyle='#fff'; g.fillText('vs',F.VW/2,F.VH*0.2+38);
        g.font='900 40px "Arial Black",Impact,sans-serif'; g.lineWidth=10; g.strokeText('SAMURAI CHEEMS',F.VW/2,F.VH*0.2+84); g.fillStyle='#7ec8ff'; g.fillText('SAMURAI CHEEMS',F.VW/2,F.VH*0.2+84); g.restore(); } }
  });
})();
