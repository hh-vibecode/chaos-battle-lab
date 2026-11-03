// ===================== 🎬 ANIME LAB · MEWING CAT vs DEPRESSED CAT (~28.5s, 9:16) =====================
// Anh yêu cầu 3/11/2026: 1 trận ~25–30s "cực cháy", chuyển cảnh kiểu anime, tung chiêu + đối kháng liên tục,
// kết bằng 2 chiêu cuối va nhau hất 2 con lùi lại — NGANG TÀI NGANG SỨC. Chiêu bám đúng game:
//   Mewing: tư thế mewing (ngón tay suỵt) → tượng đá Moai lao tới · dạng Gojo · chiêu cuối HOLLOW PURPLE (cầu xanh + cầu đỏ → cầu tím)
//   Depressed: kêu than → mây đen, mưa, sét · dạng PAIN (áo Akatsuki, mắt Rinnegan) · chiêu cuối SHINRA TENSEI (đẩy văng)
// Ảnh có sẵn đều là ảnh BÁN THÂN chính diện → đánh phép + VFX + cận mặt kiểu anime, không tung cước.
//   0–2 toàn cảnh góc cao · 2–3.5 cận mặt xen kẽ · 3.5–6 mewing gọi 2 tượng · 6–8 góc ngước: mây + sét bổ nát 2 tượng
//   8–10 bay vòng: tượng thứ 3 húc trúng · 10–13 góc cao: mưa sét liên hoàn, Mewing lướt né · 13–15 hoá Gojo · 15–17 hoá Pain
//   17–20 lao vào nhau 2 lần · 20–21.2 Hollow Purple · 21.2–22.5 Shinra Tensei · 22.5–24 va nhau · 24–26 hất văng · 26–28.5 đứng dậy, hoà
(function(){
  if(!window.CineKit || CineKit.films.mvd) return;
  const K=CineKit, {seg,lerp,clamp,eio,eout,ein,hash}=K;
  const T={ c1:2.0, c2:2.75, s3:3.5, s5:6.0, s6:8.0, s7:10.0, s8:13.0, s9:15.0, s10:17.0, s11:20.0, s12:21.2, s13:22.5, hit:23.2, s14:24.0, s15:26.0, DUR:28.5 };
  const MX=-190, DX=190, H=120;
  const dusk={ sky:['#231a3a','#7a4a6e','#e39a6c'], sun:{x:-150,y:0.05,r:30,col:'rgba(255,190,140,A)'}, mount:['#4a3352','#2c2036'],
               ground:['126,112,118','112,100,108','44,36,44'], fog:'150,112,122', tile:110, R:2400 };
  const storm={ sky:['#07080f','#1d2033','#3b3f57'], mount:['#22243a','#15162a'], ground:['92,90,104','80,78,92','30,30,40'], fog:'52,54,70', tile:110, R:2400 };
  const STATUES=[{t0:4.2,img:'st1',z:-115,end:6.6},{t0:4.75,img:'st2',z:105,end:7.3},{t0:8.35,img:'st3',z:0,end:9.2,hit:true}];
  const BOLTS=[[6.6,0],[7.3,1],[10.6,-1],[11.4,-1],[12.2,-1]];   // [giây, tượng bị bổ (-1 = đánh xuống chỗ Mewing)]
  const shots=[
    {t0:0,     t1:T.c1, a:{tx:0,ty:60,tz:0,dist:930,yaw:-38,pitch:46,fov:44}, b:{tx:0,ty:60,tz:0,dist:800,yaw:-20,pitch:40,fov:44}},
    {t0:T.c1,  t1:T.c2, a:{tx:MX,ty:70,tz:0,dist:215,yaw:16,pitch:2,fov:40}, b:{tx:MX,ty:72,tz:0,dist:190,yaw:10,pitch:2,fov:40}, ease:'eout'},
    {t0:T.c2,  t1:T.s3, a:{tx:DX,ty:70,tz:0,dist:215,yaw:-16,pitch:2,roll:4,fov:40}, b:{tx:DX,ty:72,tz:0,dist:190,yaw:-10,pitch:2,roll:6,fov:40}, ease:'eout'},
    {t0:T.s3,  t1:T.s5, a:{tx:-110,ty:75,tz:0,dist:430,yaw:58,pitch:9,fov:48}, b:{tx:-60,ty:75,tz:0,dist:400,yaw:52,pitch:8,fov:48}},
    {t0:T.s5,  t1:T.s6, a:{tx:120,ty:110,tz:0,dist:400,yaw:-22,pitch:-18,roll:-6,fov:52}, b:{tx:120,ty:115,tz:0,dist:370,yaw:-26,pitch:-20,roll:-8,fov:52}},
    {t0:T.s6,  t1:T.s7, a:{tx:140,ty:60,tz:0,dist:540,yaw:-75,pitch:18,fov:48}, b:{tx:150,ty:60,tz:0,dist:500,yaw:30,pitch:14,fov:48}, ease:'eio'},
    {t0:T.s7,  t1:T.s8, a:{tx:-110,ty:30,tz:0,dist:720,yaw:-28,pitch:58,fov:46}, b:{tx:-140,ty:30,tz:0,dist:660,yaw:-12,pitch:54,fov:46}},
    {t0:T.s8,  t1:T.s9, a:{tx:MX,ty:85,tz:0,dist:240,yaw:20,pitch:-10,roll:6,fov:46}, b:{tx:MX,ty:90,tz:0,dist:195,yaw:14,pitch:-12,roll:8,fov:46}, ease:'eout'},
    {t0:T.s9,  t1:T.s10,a:{tx:DX,ty:85,tz:0,dist:250,yaw:-20,pitch:-6,roll:-5,fov:46}, b:{tx:DX,ty:88,tz:0,dist:205,yaw:-14,pitch:-8,roll:-7,fov:46}, ease:'eout'},
    {t0:T.s10, t1:T.s11,a:{tx:0,ty:70,tz:0,dist:560,yaw:0,pitch:8,fov:48}, b:{tx:0,ty:70,tz:0,dist:690,yaw:6,pitch:10,fov:48}},
    {t0:T.s11, t1:T.s12,a:{tx:MX+45,ty:72,tz:0,dist:330,yaw:20,pitch:4,roll:4,fov:46}, b:{tx:MX+45,ty:74,tz:0,dist:305,yaw:26,pitch:4,roll:5,fov:46}},
    {t0:T.s12, t1:T.s13,a:{tx:DX-40,ty:72,tz:0,dist:320,yaw:-20,pitch:4,roll:-4,fov:46}, b:{tx:DX-40,ty:74,tz:0,dist:295,yaw:-26,pitch:4,roll:-5,fov:46}},
    {t0:T.s13, t1:T.s14,a:{tx:0,ty:70,tz:0,dist:840,yaw:0,pitch:6,fov:50}, b:{tx:0,ty:70,tz:0,dist:810,yaw:0,pitch:6,fov:50}},
    {t0:T.s14, t1:T.s15,a:{tx:0,ty:55,tz:0,dist:740,yaw:0,pitch:10,fov:46}, b:{tx:0,ty:55,tz:0,dist:775,yaw:2,pitch:10,fov:46}},
    {t0:T.s15, t1:T.DUR,a:{tx:0,ty:70,tz:0,dist:930,yaw:0,pitch:9,fov:46,oy:0.08}, b:{tx:0,ty:70,tz:0,dist:880,yaw:0,pitch:8,fov:46,oy:0.08}},
  ];
  const faceFlip=(F,x,ox)=>{ const a=K.proj(F.B,x,0,0), b=K.proj(F.B,ox,0,0); return a&&b ? b.x>a.x : x<ox; };
  // ── vị trí 2 con theo thời gian ──
  const KB0=T.hit+0.08, KB1=T.hit+1.4;   // bị hất văng: bay ra mép sân rồi trượt dừng
  function mew(t){ const tq=K.twos(t); let x=MX, z=0, y=0, lean=0, sm=null, im='mN';
    if(t>=T.s3 && t<T.s5) im=['mS1','mS2','mS3'][Math.min(2,Math.floor((t-T.s3)/0.85))];
    else if(t>=T.s5 && t<T.s8) im=(Math.floor(t*2.5)%3===0)?'mS2':'mN';
    if(t>=T.s7 && t<T.s8){ const D=[[T.s7,MX,0],[10.45,MX+70,-60],[11.25,MX-60,40],[12.05,MX+40,90],[12.9,MX,0]];   // lướt né sét
      for(let i=0;i<D.length-1;i++){ const [a,x0,z0]=D[i], [b,x1,z1]=D[i+1]; if(t>=a && t<b){ const k=eout(seg(tq,a,a+0.18)); x=lerp(x0,x1,k); z=lerp(z0,z1,k); if(k<0.95) sm={dx:(x1-x0)*6,dy:0,dz:(z1-z0)*6,n:5}; } } }
    if(t>=T.s8+0.6) im='mG';
    if(t>=T.s11 && t<KB0) im='mB'; if(t>=KB0 && t<KB1+0.6) im='mK';
    if(t>=T.s10 && t<T.s11){ const C=[[17.2,17.6,MX,-55],[17.6,18.1,-55,-165],[18.4,18.8,-165,-55],[19.4,20,-55,MX]];
      for(const [a,b,x0,x1] of C) if(t>=a && t<b){ const k=(x1>x0?ein:eout)(seg(tq,a,b)); x=lerp(x0,x1,k); if(x1>x0) sm={dx:600,dy:0,dz:0,n:6}; }
      if(t>=17.6 && t<17.62) x=-55; if(t>=18.8 && t<19.4) x=-55+Math.sin(t*60)*3; }
    if(t>=KB0){ const k=eout(seg(tq,KB0,KB1)); x=lerp(MX+50,-170,k); lean=t<KB1+0.6?0:-12*(1-seg(t,T.s15+0.2,T.s15+1.0)); if(t<KB1) y=26*Math.sin(Math.PI*Math.min(1,seg(t,KB0,KB1)*1.15)); if(k<0.9) sm={dx:-500,dy:0,dz:0,n:6}; if(t>=T.s15) x=lerp(-170,-128,eout(seg(tq,T.s15,T.s15+1.1))); }   // đứng dậy, tiến lại đối mặt
    return {x,z,y,lean,sm,im}; }
  function dep(t){ const tq=K.twos(t); let x=DX, z=0, y=0, lean=0, sm=null, im='dN';
    if(t>=9.2 && t<T.s7){ const k=eout(seg(tq,9.2,9.5)), b=seg(tq,9.6,10); x=lerp(DX,DX+70,k)-70*eio(b); lean=10*(1-b)*k; }
    if(t>=T.s9+0.6) im='dP';
    if(t>=T.s12-0.25 && t<KB0) im='dB'; if(t>=KB0 && t<KB1+0.6) im='dK';
    if(t>=T.s10 && t<T.s11){ const C=[[17.2,17.6,DX,55],[17.6,18.1,55,165],[18.4,18.8,165,55],[19.4,20,55,DX]];
      for(const [a,b,x0,x1] of C) if(t>=a && t<b){ const k=(x1<x0?ein:eout)(seg(tq,a,b)); x=lerp(x0,x1,k); if(x1<x0) sm={dx:-600,dy:0,dz:0,n:6}; }
      if(t>=18.8 && t<19.4) x=55-Math.sin(t*60)*3; }
    if(t>=KB0){ const k=eout(seg(tq,KB0,KB1)); x=lerp(DX-50,170,k); lean=t<KB1+0.6?0:12*(1-seg(t,T.s15+0.3,T.s15+1.1)); if(t<KB1) y=26*Math.sin(Math.PI*Math.min(1,seg(t,KB0,KB1)*1.15)); if(k<0.9) sm={dx:500,dy:0,dz:0,n:6}; if(t>=T.s15) x=lerp(170,128,eout(seg(tq,T.s15+0.1,T.s15+1.2))); }
    return {x,z,y,lean,sm,im}; }
  // vị trí tượng
  function statue(S,t){ const u=t-S.t0; if(u<0 || t>=S.end+0.02) return null; const fly=S.hit?0.85:2.6, k=eio(seg(t,S.t0,S.t0+fly));
    return {x:lerp(MX+40,DX-55,k)-(S.hit?0:lerp(0,95,k)), z:S.z*(1-(S.hit?k:0)), y:30+18*Math.sin(u*3)+(1-seg(u,0,0.35))*-30, k}; }
  // cầu năng lượng (cộng sáng)
  function orb(F,x,y,z,r,col,a){ if(a<=0.01) return; const P=K.proj(F.B,x,y,z); if(!P) return; const R=r*P.s;
    F.list.push({d:P.d-40, fn:()=>{ const g=F.g; g.save(); g.globalCompositeOperation='lighter';
      let gr=g.createRadialGradient(P.x,P.y,0,P.x,P.y,R*2.6); gr.addColorStop(0,`rgba(${col},${0.55*a})`); gr.addColorStop(1,`rgba(${col},0)`); g.fillStyle=gr; g.fillRect(P.x-R*2.6,P.y-R*2.6,R*5.2,R*5.2);
      gr=g.createRadialGradient(P.x,P.y,0,P.x,P.y,R); gr.addColorStop(0,`rgba(255,255,255,${a})`); gr.addColorStop(0.45,`rgba(${col},${a})`); gr.addColorStop(1,`rgba(${col},0)`); g.fillStyle=gr; g.beginPath(); g.arc(P.x,P.y,R,0,Math.PI*2); g.fill();
      g.strokeStyle=`rgba(255,255,255,${0.5*a})`; g.lineWidth=Math.max(1,R*0.06); g.beginPath(); g.arc(P.x,P.y,R*(0.7+0.15*Math.sin(F.t*40)),F.t*9,F.t*9+4.2); g.stroke(); g.restore(); }}); }
  // sét từ trời bổ xuống 1 điểm thế giới
  function strike(F,x,y,z,t0,seed){ const u=F.t-t0; if(u<0||u>0.35) return; const P=K.proj(F.B,x,y,z); if(!P) return;
    F.list.push({d:P.d-60, fn:()=>{ const g=F.g, top=-40, len=P.y-top, a=u<0.05?1:1-seg(u,0.05,0.35); g.save(); g.globalAlpha=a;
      VfxGL.boltSet(g,P.x+(hash(seed)-0.5)*60,top,Math.PI/2+(hash(seed+1)-0.5)*0.25,len,Math.min(9,Math.max(4,len*0.02)),seed*7+Math.floor(F.t*14),{core:'#f4fbff',rim:'#7ab8ff',glow:'rgba(120,170,255,0.4)'});
      g.globalCompositeOperation='lighter'; const gr=g.createRadialGradient(P.x,P.y,0,P.x,P.y,90); gr.addColorStop(0,`rgba(200,225,255,${0.8*a})`); gr.addColorStop(1,'rgba(120,170,255,0)'); g.fillStyle=gr; g.fillRect(P.x-90,P.y-90,180,180); g.restore(); }}); }

  CineKit.film({ id:'mvd', title:'Anime Lab · Mewing Cat vs Depressed Cat', DUR:T.DUR,
    imgs:{ mN:'assets/avatars/mewingcat/avatarUrl.webp', mS1:'assets/avatars/mewingcat/skill1AvatarUrl.webp', mS2:'assets/avatars/mewingcat/skill2AvatarUrl.webp', mS3:'assets/avatars/mewingcat/skill3AvatarUrl.webp',
      mG:'assets/img/mewingcat/MEW_GOJO_IMG.webp', dN:'assets/avatars/depressedcat/avatarUrl.webp', dP:'assets/img/depressedcat/DP_PAIN_IMG.webp',
      mB:'assets/img/cine/MVD_GOJO_BLAST.png', dB:'assets/img/cine/MVD_PAIN_PUSH.png', mK:'assets/img/cine/MVD_GOJO_KB.png', dK:'assets/img/cine/MVD_PAIN_KB.png',
      st1:'assets/img/mewingcat/MEWING_STONE_1_IMG.webp', st2:'assets/img/mewingcat/MEWING_STONE_2_IMG.webp', st3:'assets/img/mewingcat/MEWING_STONE_3_IMG.webp',
      cA:'assets/img/depressedcat/DP_CLOUD_A.webp', cB:'assets/img/depressedcat/DP_CLOUD_B.webp' },
    sfx:[[0.2,'l2p_rumble',0.5],[T.c1,'sm_schwing',0.7],[T.c2,'l2p_whoosh',0.6],[T.s3,'mewing_song',0.5,2.4],[4.2,'ar_stone_on',0.8],[4.75,'ar_stone_on',0.8],
      [T.s5,'dp_rain',0.5,11],[6.6,'thunder_big',0.9],[6.6,'mewing_statue_break',0.9],[7.3,'holy_thunder',0.8],[7.3,'ar_stone_break',0.9],
      [8.35,'fr_dash',0.8],[9.2,'cine_strongpunch',1],[9.2,'mewing_statue_break',0.8],
      [10.45,'l2p_whoosh',0.6],[10.6,'thunder_big',0.7],[11.25,'l2p_whoosh',0.6],[11.4,'holy_thunder',0.7],[12.05,'l2p_whoosh',0.6],[12.2,'thunder_big',0.8],
      [T.s8+0.55,'ep3_charge',0.9],[T.s8+0.6,'sm_schwing',0.8],[T.s9+0.55,'dp_akatsuki',0.9],[T.s9+0.6,'dp_cloak',0.7],
      [17.25,'fr_dash',0.8],[17.6,'cine_haki_hit',1],[18.45,'fr_dash',0.8],[18.8,'cine_haki_hit',1],[18.85,'lightsaber_clash_06',0.7],
      [21.05,'mw_gojo',1],[T.s12+0.05,'ps_shinra',1],[T.s13,'l2p_riser',0.7],
      [T.hit,'ep3_explode',1],[T.hit,'cine_deep_impact',1],[T.hit,'l2p_explode',0.9],[KB1-0.1,'cine_impact',0.8],[KB1,'ep3_quake',0.6],[27.0,'cine_drop',0.5]],
    mus:[{src:'assets/audio/cine_horns.mp3',ra:0,rb:T.DUR,vol:0.32,fi:1,fo:1.5}],
    theme:t=>t<T.s5?dusk:storm, shots,
    impact:t=>(t>=6.6&&t<6.67)||(t>=7.3&&t<7.36)?'bw':(t>=9.2&&t<9.26)?'inv':(t>=17.6&&t<17.66)?'bw':(t>=18.8&&t<18.86)?'inv':(t>=T.hit&&t<T.hit+0.07)?'red':(t>=T.hit+0.07&&t<T.hit+0.14)?'inv':(t>=T.hit+0.14&&t<T.hit+0.2)?'bw':0,
    shake:t=>{ let s=0; const h=(a,amp,d)=>{ if(t>=a&&t<a+d) s=Math.max(s,amp*(1-(t-a)/d)); };
      h(6.6,7,0.4); h(7.3,7,0.4); h(9.2,12,0.5); for(const b of [10.6,11.4,12.2]) h(b,5,0.3); h(17.6,10,0.4); h(18.8,12,0.5); h(T.hit,22,0.9); h(KB1,6,0.4);
      if(t>=18.8&&t<19.4) s=Math.max(s,2.5); if(t>=T.s11&&t<T.hit) s=Math.max(s,1.2+2.5*seg(t,T.s11,T.hit)); if(t>=T.s9+0.6&&t<T.s10) s=Math.max(s,1.5); return s; },
    world(F,t){ const I=F.I, m=mew(t), d=dep(t);
      const HT={mG:H*1.18,dP:H*1.12,mB:H*1.15,dB:H*1.15,mK:H*0.95,dK:H*0.95}, mh=HT[m.im]||H, dh=HT[d.im]||H;
      const mAura=(t>=T.s8+0.45)?{preset:'ki',k:t<T.s8+0.9?seg(t,T.s8+0.45,T.s8+0.9):(t>=T.s11&&t<T.hit?1:0.7),seed:3}:null;
      const dAura=(t>=T.s9+0.45)?{preset:'cursed',k:t<T.s9+0.9?seg(t,T.s9+0.45,T.s9+0.9):(t>=T.s12&&t<T.hit?1:0.7),seed:9}:null;
      const flashM=(t>=T.s8+0.55&&t<T.s8+0.7)?1:0, flashD=(t>=T.s9+0.55&&t<T.s9+0.7)?1:0;
      K.sprite(F,{img:I[m.im],x:m.x,z:m.z,y:m.y,h:mh,lean:m.lean,smear:m.sm,aura:mAura,white:flashM||(t>=T.hit&&t<T.hit+0.12?1:0)});
      K.sprite(F,{img:I[d.im],x:d.x,z:d.z,y:d.y,h:dh,lean:d.lean,smear:d.sm,aura:dAura,flip:d.im==='dN'?faceFlip(F,d.x,m.x):false,white:flashD||(t>=9.2&&t<9.28?1:0)||(t>=T.hit&&t<T.hit+0.12?1:0)});
      F._d=d; F._dh=dh;
      // gió cuốn bụi mở màn
      K.smoke(F,{x:0,z:60,t0:-0.3,n:12,spread:560,rise:18,life:2.4,size:30,seed:1,swirl:0.25,a:0.3,tint:'170,130,140'});
      // tượng đá Moai
      for(const [i,S] of STATUES.entries()){ const p=statue(S,t); if(!p) continue;
        K.sprite(F,{img:I[S.img],x:p.x,z:p.z,y:p.y,h:100,flip:true,smear:p.k<0.97?{dx:520,dy:0,dz:0,n:5}:null,aura:{col:'200,190,170',k:0.25},shadow:true});
        if(t-S.t0<0.4) K.smoke(F,{x:MX+40,z:S.z,t0:S.t0,n:8,spread:60,rise:40,life:0.9,size:30,seed:30+i,a:0.6}); }
      // vỡ tượng (2 cái bị sét, 1 cái húc trúng)
      for(const [i,S] of STATUES.entries()){ if(t<S.end) continue; const p=statue(S,S.end-0.001); if(!p) continue;
        K.debris(F,{x:p.x,y:p.y,z:p.z,t0:S.end,n:16,speed:360,life:1.4,size:12,seed:50+i,col:'#7c776f'}); K.smoke(F,{x:p.x,z:p.z,t0:S.end,n:10,spread:100,rise:50,life:1.3,size:30,seed:60+i,a:0.45});
        K.sparks(F,{x:p.x,y:p.y+30,z:p.z,t0:S.end,n:18,speed:420,life:0.5,seed:70+i,col:'200,225,255'}); }
      // sét bổ
      for(const [i,[bt,si]] of BOLTS.entries()){ let x, z;
        if(si>=0){ const p=statue(STATUES[si],bt-0.001); if(!p) continue; x=p.x; z=p.z; } else { const mm=mew(bt-0.15); x=mm.x+((i%2)?40:-40); z=mm.z; }
        strike(F,x,0,z,bt,i+1); if(t>=bt){ const u=seg(t,bt,bt+0.5); K.ring(F,x,z,20+200*eout(u),10,(1-u)*0.9,'150,190,255'); if(si<0) K.smoke(F,{x,z,t0:bt,n:10,spread:80,rise:50,life:1.2,size:36,seed:80+i,a:0.6,tint:'120,130,170'}); } }
      // tượng 3 húc trúng
      if(t>=9.2){ const u=seg(t,9.2,9.7); K.ring(F,DX-30,0,30+300*eout(u),14,1-u,'230,220,200'); }
      // hoá Gojo / Pain: bùng khí
      for(const [tt,x,col,sd] of [[T.s8+0.55,MX,'120,190,255',91],[T.s9+0.55,DX,'170,90,255',92]]) if(t>=tt){ const u=seg(t,tt,tt+0.7);
        K.ring(F,x,0,20+260*eout(u),12,1-u,col); K.smoke(F,{x,z:0,t0:tt,n:14,spread:180,rise:70,life:1.4,size:46,seed:sd,swirl:2,a:0.55}); }
      // đụng nhau 2 lần
      for(const [tt,sd] of [[17.6,101],[18.8,102]]) if(t>=tt){ const u=seg(t,tt,tt+0.5);
        K.ring(F,0,0,30+360*eout(u),14,1-u,'220,200,255'); K.sparks(F,{x:0,y:75,z:0,t0:tt,n:26,speed:520,life:0.6,seed:sd,col:'200,170,255'}); K.smoke(F,{x:0,z:0,t0:tt,n:12,spread:200,rise:40,life:1.3,size:44,seed:sd,a:0.6}); }
      if(t>=18.8&&t<19.4){ for(let i=0;i<3;i++) K.sparks(F,{x:0,y:75,z:0,t0:18.8+i*0.2,n:12,speed:380,life:0.45,seed:110+i,col:'170,200,255'});
        const ph=((t-18.8)%0.2)/0.2; K.ring(F,0,0,20+150*eout(ph),7,(1-ph)*0.7,'200,170,255'); }
      // HOLLOW PURPLE: cầu xanh + cầu đỏ dồn vào → cầu tím (trước mặt Mewing)
      const HP0=T.s11+0.1, HPm=T.s11+0.95;
      const _mbc=K.prep(I.mB), _mbw=_mbc?H*1.15*_mbc.sw/_mbc.sh:100;
      if(t>=HP0 && t<T.hit){ const k=eio(seg(t,HP0,HPm)), cx=MX+(0.951-0.5)*_mbw+12, cy=H*1.15*0.6, sp=1-k;
        if(k<1){ orb(F,cx-65*sp,cy+25*sp,-40*sp,16+4*Math.sin(t*30),'90,170,255',1); orb(F,cx+65*sp,cy+25*sp,40*sp,16+4*Math.sin(t*33),'255,70,80',1); }
        if(t>=HPm){ const g=seg(t,HPm,T.s13), fly=seg(t,T.s13,T.hit), x=lerp(cx,0,ein(fly)); orb(F,x,cy-10*fly,0,(18+16*g+10*fly)*(1+0.06*Math.sin(t*50)),'170,80,255',1);
          if(fly>0) K.smoke(F,{x:x-40,z:0,t0:T.s13,n:6,spread:30,rise:10,life:0.5,size:20,seed:120,a:0.35,tint:'150,90,220'}); } }
      // SHINRA TENSEI: vòng dồn lực co vào quanh Pain, rồi bức tường đẩy lao sang trái
      if(t>=T.s12 && t<T.s13){ for(let i=0;i<3;i++){ const ph=((t-T.s12)*1.6+i/3)%1; K.ring(F,d.x-40,0,300*(1-ph)+20,8,ph*0.8,'235,225,255'); } }
      if(t>=T.s13 && t<T.hit+0.05){ const fly=ein(seg(t,T.s13,T.hit)), _dbc=K.prep(I.dB), _dbw=_dbc?H*1.15*_dbc.sw/_dbc.sh:100, xw=lerp(DX+(0.039-0.5)*_dbw-10,0,fly), P=K.proj(F.B,xw,H*1.15*0.661,0);
        if(P) F.list.push({d:P.d-40, fn:()=>{ const g=F.g, ry=150*P.s, rx=46*P.s; g.save(); g.globalCompositeOperation='lighter';
          const gr=g.createRadialGradient(P.x,P.y,0,P.x,P.y,ry); gr.addColorStop(0,'rgba(255,255,255,0)'); gr.addColorStop(0.7,'rgba(220,215,255,0.18)'); gr.addColorStop(0.92,'rgba(255,255,255,0.7)'); gr.addColorStop(1,'rgba(255,255,255,0)');
          g.translate(P.x,P.y); g.scale(rx/ry,1); g.translate(-P.x,-P.y); g.fillStyle=gr; g.beginPath(); g.arc(P.x,P.y,ry,0,Math.PI*2); g.fill(); g.restore(); }});
        K.ring(F,xw,0,30,10,0.6,'235,230,255'); }
      // VA NHAU: quả cầu nổ tím-trắng + sóng + khói + đá
      if(t>=T.hit){ const u=seg(t,T.hit,T.hit+0.9); orb(F,0,80,0,40+260*eout(u),'190,120,255',(1-u)*1.1);
        K.ring(F,0,0,40+700*eout(seg(t,T.hit,T.hit+1)),20,1-seg(t,T.hit,T.hit+1),'210,170,255');
        K.smoke(F,{x:0,z:0,t0:T.hit,n:16,spread:420,rise:90,life:1.8,size:55,seed:130,a:0.5,tint:'150,120,190'});
        K.debris(F,{x:0,z:0,t0:T.hit,n:24,speed:620,life:1.8,size:13,seed:131,col:'#5d5568'}); K.sparks(F,{x:0,y:80,z:0,t0:T.hit,n:40,speed:800,life:0.8,seed:132,col:'220,190,255'});
        // 2 con trượt lùi: bụi kéo dài theo đường trượt
        for(let i=0;i<6;i++){ const tt=KB0+i*0.2; if(t<tt) continue; const kk=eout(seg(tt,KB0,KB1));
          K.smoke(F,{x:lerp(MX+50,-170,kk),z:0,t0:tt,n:3,spread:30,rise:20,life:0.9,size:20,seed:140+i,a:0.35}); K.smoke(F,{x:lerp(DX-50,170,kk),z:0,t0:tt,n:3,spread:30,rise:20,life:0.9,size:20,seed:150+i,a:0.35}); } }
      // bụi lắng cuối phim
      if(t>=T.s15) K.smoke(F,{x:0,z:40,t0:T.s15,n:16,spread:700,rise:20,life:3,size:60,seed:160,a:0.35}); },
    post(F,t){ const fx={shocks:[]}; const sh=(a,x,y,rm,d,str)=>{ if(t>=a&&t<a+d){ const u=(t-a)/d; fx.shocks.push({x,y,z:0,r:20+rm*eout(u),w:26,str:str*(1-u)}); fx.chroma=Math.max(fx.chroma||0,2*(1-u)); } };
      sh(9.2,DX-30,60,320,0.5,20); sh(17.6,0,70,340,0.5,22); sh(18.8,0,70,380,0.55,26); sh(T.hit,0,80,620,0.9,36);
      if(t>=T.s8+0.55&&t<T.s9) fx.heat={k:2.5,t}; if(t>=T.s9+0.55&&t<T.s10) fx.heat={k:2.5,t};
      if(t>=T.s11+0.95&&t<T.s12){ fx.shocks.push({x:MX+55,y:88,z:0,r:60+20*Math.sin(t*20),w:30,str:10}); fx.chroma=Math.max(fx.chroma||0,1); }
      if((t>=17.2&&t<17.6)||(t>=18.4&&t<18.8)) fx.zoom={x:0,y:80,z:0,k:0.08};
      if(t>=T.s13&&t<T.hit){ fx.zoom={x:0,y:80,z:0,k:0.1*seg(t,T.s13,T.hit)}; fx.chroma=Math.max(fx.chroma||0,1.5*seg(t,T.s13,T.hit)); }
      if(t>=KB0&&t<KB1) fx.zoom={x:0,y:80,z:0,k:0.06};
      return fx; },
    screen(F,t){ const g=F.g, VW=F.VW, VH=F.VH;
      // mây đen + mưa (Pain đứng yên → mưa đứng hình)
      const cl=t<T.s5?0:Math.min(1,(t-T.s5)/0.8)*(t>=T.s14?0.5:1);
      if(cl>0){ g.save(); const gr=g.createLinearGradient(0,0,0,VH*0.45); gr.addColorStop(0,`rgba(8,8,18,${0.75*cl})`); gr.addColorStop(1,'rgba(8,8,18,0)'); g.fillStyle=gr; g.fillRect(0,0,VW,VH*0.45);
        for(let i=0;i<4;i++){ const im=F.I[i%2?'cB':'cA'], c=K.prep(im); if(!c) continue; const w=VW*0.9, h=w*c.sh/c.sw, x=((i*0.37+t*0.015*(i%2?1:-1))%1.4-0.2)*VW-w/2+VW*0.3, y=-h*0.35+i*12;
          g.globalAlpha=0.55*cl; g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,x,y,w,h); } g.restore(); }
      const rainK=t<T.s5?0:t<T.s6?0.45:t<T.s7?0.6:t<T.s9+0.6?1:t<T.s10?0.9:t<T.s14?0.7:0.35;
      if(rainK>0){ const frozen=t>=T.s9+0.6&&t<T.s10, tr=frozen?T.s9+0.6:t; g.save(); g.strokeStyle=frozen?'rgba(210,190,255,0.55)':'rgba(190,205,235,0.45)'; g.lineWidth=frozen?1.4:1.1;
        for(let i=0,n=Math.round(170*rainK);i<n;i++){ const x=((hash(i)*VW*1.2+tr*90)%(VW*1.2))-VW*0.1, y=((hash(i+0.5)*VH+tr*(900+300*hash(i+0.7)))%(VH+60))-30, L=frozen?6:16+14*hash(i+0.9);
          g.beginPath(); g.moveTo(x,y); g.lineTo(x-L*0.18,y+L); g.stroke(); } g.restore(); }
      // cận mặt xen kẽ / hoá dạng: tia tập trung
      if(t>=T.c1&&t<T.s3) K.speedLines(F,{k:0.7,n:70,r0:0.38});
      if(t>=T.s8+0.5&&t<T.s9) K.speedLines(F,{k:0.6,n:60,r0:0.36,col:'rgba(150,200,255,0.8)'});
      if(t>=T.s9+0.5&&t<T.s10) K.speedLines(F,{k:0.6,n:60,r0:0.36,col:'rgba(20,0,30,0.85)'});
      if(t>=T.s11&&t<T.s13) K.speedLines(F,{k:0.45+0.4*seg(t,T.s11,T.s13),n:80,r0:0.34,col:t<T.s12?'rgba(200,170,255,0.8)':'rgba(255,255,255,0.8)'});
      if((t>=8.3&&t<9.2)||(t>=17.2&&t<17.6)||(t>=18.4&&t<18.8)) K.panLines(F,{k:0.9,ang:0,n:30});
      if(t>=KB0&&t<KB1) K.panLines(F,{k:1-seg(t,KB0,KB1),ang:0,n:34});
      // chữ
      K.sfxText(F,'BONK!',VW*0.62,VH*0.33,{t0:9.2,life:0.7,px:80,rot:-10});
      K.sfxText(F,'DON!',VW*0.5,VH*0.3,{t0:17.6,life:0.55,px:84,rot:-8});
      K.sfxText(F,'DOOON!!',VW*0.5,VH*0.3,{t0:18.8,life:0.65,px:84,rot:8,col:'#c9a7ff'});
      K.sfxText(F,'HOLLOW PURPLE',VW*0.5,VH*0.2,{t0:T.s11+0.3,life:0.85,px:44,rot:-4,col:'#c9a7ff'});
      K.sfxText(F,'SHINRA TENSEI',VW*0.5,VH*0.2,{t0:T.s12+0.4,life:0.9,px:44,rot:4,col:'#ffffff'});
      if(t>=T.hit&&t<T.hit+0.06) K.flash(F,0.9,'#fff'); if(t>=T.hit+0.2&&t<T.hit+0.6) K.flash(F,0.5*(1-seg(t,T.hit+0.2,T.hit+0.6)),'#e9dcff');
      for(const b of [6.6,7.3,10.6,11.4,12.2]) if(t>=b&&t<b+0.05) K.flash(F,0.55,'#dfe9ff');
      K.letterbox(F,t<T.c1?1-seg(t,1.2,T.c1):t>=T.s15?seg(t,T.s15,T.s15+0.5):0);
      K.vignette(F,0.5);
      if(t>=27.1){ const a=seg(t,27.1,27.6); g.save(); g.globalAlpha=a; g.textAlign='center'; g.lineJoin='round';
        g.font='900 42px "Arial Black",Impact,sans-serif'; g.lineWidth=10; g.strokeStyle='#000'; g.strokeText('MEWING CAT',VW/2,VH*0.2); g.fillStyle='#9fd0ff'; g.fillText('MEWING CAT',VW/2,VH*0.2);
        g.font='900 26px "Arial Black",Impact,sans-serif'; g.lineWidth=7; g.strokeText('vs',VW/2,VH*0.2+38); g.fillStyle='#fff'; g.fillText('vs',VW/2,VH*0.2+38);
        g.font='900 40px "Arial Black",Impact,sans-serif'; g.lineWidth=10; g.strokeText('DEPRESSED CAT',VW/2,VH*0.2+82); g.fillStyle='#c9a7ff'; g.fillText('DEPRESSED CAT',VW/2,VH*0.2+82); g.restore(); } }
  });
})();
