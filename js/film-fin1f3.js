// ⚔️ Meme Lore · FINAL · Part 1 — TRẬN PHỤ 3: NINJA CAT (Meowkatsuki, áo Akatsuki) vs BERSERK CAT — CẬN CHIẾN thuần (11/11/2026)
//   Brief: prompts/fin1-fight-phu.md · bảng phân cảnh: js/shots/fin1f3.json · thành phố: js/fin1-city.js · biên đạo chung: js/fin1-fight.js
//   Signature đúng game: Ninja — Kusanagi chém / kunai; lần đầu xuống 60% và lần 30% máu: đòn kế tiếp XUYÊN qua người, Mangekyou loé, Kamui nuốt rồi nhả ra SAU LƯNG địch đâm 150.
//                         Berserk — đại kiếm vòng cung; càng mất máu càng mạnh (chém xa hơn, kiếm dài ra), lửa đỏ bốc lên, dưới 30% miễn đẩy lùi / choáng.
//   Luật cận chiến (anh dặn 11/11 + tham khảo): mỗi nhịp có nguyên nhân → hệ quả; đỡ gạt 0.2–0.3s rồi PHẢN ĐÒN NGAY; né bằng bước chân rồi quay lại tầm;
//   kiếm nặng (Berserk) = thế rộng, vung to, lấy đà chậm; kiếm nhẹ (Ninja) = bước nhanh gọn. Meowkatsuki thắng (phản diện mạnh).
(function(){
  if(!window.CineKit || CineKit.films.fin1f3) return;
  const BASE=((document.currentScript&&document.currentScript.src)||'js/film-fin1f3.js').replace(/film-[^\/]*$/,''), V=window.GAME_VERSION?'?v='+GAME_VERSION.build:'';
  for(const [g,f] of [['PIXI_FILTERS_GLSL','vendor/pixi-filters/glsl.js'],['Fin1City','fin1-city.js'],['Fin1Fight','fin1-fight.js']]) if(!window[g]){   /* glsl: shader TWIST của Kamui (game đã nạp sẵn; trang soát khung thì chưa) */ try{ const x=new XMLHttpRequest(); x.open('GET',BASE+f+V,false); x.send(); (0,eval)(x.responseText); }catch(e){} }
  const K=CineKit, {seg,lerp,clamp,hash}=K, E=K.EASE, eout=E.eout, ein=E.ein, eio=E.eio, C=K.cam, W=window.Fin1Fight, TAU=Math.PI*2;
  const FX=()=>window.CineKitFx;
  const T={ face1:2.0, face2:3.2, dash:4.4, clash:4.8, wind:5.0, slam:5.5, ripo:6.0, sweep:6.8, kun:7.35, c1:7.9, c2:8.1, c3:8.3, rage:8.6, arc:9.7, land:10.5,
    eye:10.7, wind2:11.2, hit60:11.5, kam:11.8, emerge:12.4, stab:13.0, turn:13.5, fr1:15.1, fr2:15.5, fr3:15.9, gen:16.15, read:16.45, cut:16.85, crows:17.75, eye2:18.55, howl:19.45, brk:20.45, fall:20.63, DUR:21.9 };
  // LOGIC (anh chê xếp cảnh vô lý 11/11): mắt Mangekyou kích hoạt TRƯỚC rồi đòn mới xuyên thấu được (eye → wind2 → hit60);
  //   ảo thuật phải có lúc TRÚNG: Ninja chạm mắt Berserk bằng Sharingan (gen) TRƯỚC khi Berserk "bắt được góc" (read) → nhát chém đứt đôi chỉ là ảo giác.
  // 🌀 KAMUI đúng nguyên tác (anh dặn 11/11): ① XUYÊN THẤU — đòn đi qua người như không tồn tại, thân xoắn méo quanh chỗ lưỡi kiếm qua (hit60, hit30)
  //    Lần 60% còn dùng đúng skill game: Kamui hút chính Ninja tại chỗ (kam) → nhả ra SAU LƯNG địch (emerge) → đâm 150 (stab).
  const H=120;
  const CITY=Fin1City({seed:3, collapse:[{x:500,z:1700,t:T.arc+0.12,r:950,v:9000},{x:-420,z:1550,t:T.cut+0.1,r:520,v:9000}]});
  const TH_GENJ=Object.assign({},CITY.TH_RISE,{sky:['#3a0000','#a00606','#ff2414'],fog:'110,4,4',fogRGB:[110,4,4],ground:['70,8,8','58,6,6','24,2,2'],bld:b=>[26+6*b.hue,4,6],
    pano:Object.assign({},CITY.TH_RISE.pano,{glow:'255,40,20'}),tex:Object.assign({},CITY.TH_RISE.tex,{tint:[120,24,22]})});   // ẢO THUẬT: trời đỏ rực, nhà thành khối đỏ đen
  const theme=t=>(t>=T.eye2&&t<T.fall)?TH_GENJ:(t>=T.rage)?CITY.TH_RISE:CITY.TH_NIGHT;

  // ───────── ẢNH ─────────  DIR: −1 ảnh nhìn TRÁI · 1 nhìn PHẢI · 0 chính diện (không lật)
  const IMG={ N0:'assets/img/cine/FIN_AKA_NINJA.png', NS:'assets/img/cine/FIN_F3_NINJA_SLASH.png', NT:'assets/img/cine/FIN_F3_NINJA_STAB.png',
    B0:'assets/img/cine/FIN_F3_BK_GUARD.png', B1:'assets/img/cine/FIN_F3_BK_SWING.png', B2:'assets/img/cine/FIN_F3_BK_UP.png', Bk:'assets/avatars/berserkcat/avatarUrl.webp',
    BH:'assets/img/cine/FIN_F3_BK_HOWL.png', NJS:'assets/img/ninjacat/NJ_SHARINGAN.webp',
    fA0:'assets/img/cine/FIN_AKA_BAT.png', fP0:'assets/avatars/popcat/avatarUrl.webp', fU0:'assets/avatars/huhcat/avatarUrl.webp',   // cảnh mở đầu trận kế (fin1f2) sau lớp kính vỡ
    ...window.FIN1_CITY_IMGS };
  const DIR={N0:-1,NS:-1,NT:1,B0:-1,B1:-1,B2:-1,Bk:-1,BH:-1};
  const HT={N0:H*1.12,NS:H*1.02,NT:H*0.86,B0:H*1.32,B1:H*0.98,B2:H*1.42,Bk:H*1.0,BH:H*1.12};   // ảnh có kiếm giơ cao: khung cao hơn thân → nâng h cho thân vẫn ≈ 1 meme
  const TEMP={B0:'Bk',B1:'Bk',B2:'Bk',BH:'B0'};   // ảnh Berserk cầm kiếm chưa có → tạm ảnh gốc
  const pick=(F,k)=>{ const im=F.I[k]; return (im&&im.complete&&im.naturalWidth)?k:(TEMP[k]||k); };

  // ───────── BIÊN ĐẠO: [giây, x, ảnh, kiểu chuyển, nhoè, z, y] ─────────
  const NK=[[0,380,'N0',0,0,0,0],[T.dash,380,'N0'],[T.dash+0.12,405,'NS','eout'],[T.clash,62,'NS','ein',1],[T.clash+0.3,95,'NS','back'],
    [T.wind,100,'N0','eout'],[T.slam-0.12,100,'N0'],[T.slam,95,'N0','eout',1,-140],                                   // bước chân né sang bên
    [T.ripo-0.12,85,'NS','eout',0,-90],[T.ripo,12,'NS','ein',1,0],[T.ripo+0.15,12,'NS'],[T.ripo+0.5,115,'N0','back'],   // né xong PHẢN ĐÒN NGAY
    [T.sweep-0.12,112,'NS'],[T.sweep+0.05,108,'NS'],[T.sweep+0.45,340,'NS','back'],                                     // đỡ quét ngang → trượt lùi
    [T.kun-0.1,340,'N0'],[T.kun+0.35,330,'N0'],
    [T.c1-0.15,320,'N0'],[T.c1,24,'NS','ein',1],[T.c2,40,'NS','lin'],[T.c3,28,'NS','lin'],[T.c3+0.32,150,'N0','back'],
    [T.arc-0.2,150,'N0'],[T.arc,168,'N0','eout',0,0,190],[T.land,190,'N0','ein',0,0,0],                                  // bật nhảy qua nhát vòng cung
    [T.hit60-0.2,190,'NS'],[T.hit60,190,'NS'],[T.emerge,-150,'NT'],[T.stab,-28,'NT','ein',1],[T.stab+0.4,-36,'NT','eout'],
    [T.turn+0.2,-40,'NT'],[T.turn+0.55,-170,'N0','eout'],
    [T.fr1-0.05,-170,'N0'],[T.fr1+0.12,-250,'N0','eout',1],[T.fr2+0.12,-325,'N0','eout',1],[T.fr3+0.12,-392,'N0','eout',1],[T.read,-392,'N0'],[T.cut-0.1,-392,'NS'],[T.DUR,-392,'NS']];   // từ T.cut: Ninja vẽ thành 2 nửa (halves) rồi hoá quạ
  const BK=[[0,-380,'B0',0,0,0,0],[T.dash,-380,'B0'],[T.dash+0.12,-402,'B0','eout'],[T.clash,-62,'B1','ein',1],[T.clash+0.3,-92,'B1','back'],
    [T.wind,-110,'B2','eout'],[T.slam-0.1,-116,'B2'],[T.slam,-58,'B1','ein',1],[T.ripo,-58,'B1'],[T.ripo+0.06,-40,'B0'],[T.ripo+0.42,-92,'B0','back'],
    [T.sweep-0.28,-82,'B2','eout'],[T.sweep,-6,'B1','ein',1],[T.sweep+0.4,-24,'B1','back'],
    [T.kun,-40,'B0'],[T.kun+0.2,-40,'B1'],[T.kun+0.5,-40,'B0'],
    [T.c1,-46,'B0'],[T.c2,-64,'B0'],[T.c3,-82,'B0'],[T.c3+0.28,-118,'B0','back'],
    [T.rage,-120,'B0'],[T.arc-0.32,-122,'B2','eout'],[T.arc,-62,'B1','ein',1],[T.arc+0.5,-62,'B1'],
    [T.land,-62,'B0'],[T.hit60-0.22,-72,'B2','eout'],[T.hit60,2,'B1','ein',1],[T.kam+0.4,2,'B1'],[T.emerge,0,'B0'],
    [T.stab,0,'B0'],[T.stab+0.3,22,'B0','back'],[T.turn,22,'B0'],
    [T.fr1-0.12,10,'B2','eout'],[T.fr1,-62,'B1','ein',1],[T.fr2-0.12,-70,'B2'],[T.fr2,-142,'B1','ein',1],[T.fr3-0.12,-150,'B2'],[T.fr3,-222,'B1','ein',1],
    [T.read-0.1,-230,'B0'],[T.read+0.25,-236,'B2','eout'],[T.cut,-280,'B1','ein',1],[T.cut+0.25,-245,'B1','back'],[T.cut+0.6,-240,'B1'],[T.howl-0.3,-300,'B1','eio'],[T.howl,-300,'BH'],[T.brk-0.15,-300,'B2','eout'],[T.brk,-300,'B1','ein',1],[T.DUR,-300,'B1']];
  const hs=W.hstop([[T.clash,0.14],[T.ripo,0.12],[T.sweep,0.12],[T.c1,0.07],[T.c2,0.07],[T.c3,0.12],[T.stab,0.16],[T.cut,0.16],[T.brk,0.12]]);
  // cơn điên Berserk: mỗi đòn trúng cộng 1 nấc → lửa đỏ to dần, kiếm vung xa hơn
  const RAGE=[[T.ripo,0.2],[T.c1,0.32],[T.c2,0.42],[T.c3,0.55],[T.rage,0.8],[T.stab,1.0],[T.howl,1.6]];   // hú lên: hào quang bùng
  const rageK=t=>{ let k=0; for(const [a,v] of RAGE) if(t>=a) k=v; return k; };
  // cỡ khi bị Kamui hút (co về tâm xoáy) / nhả ra (nở từ tâm) — 1 = bình thường, 0 = đã ở không gian Kamui
  const ninjaS=t=>{ if(t>=T.kam&&t<T.emerge-0.2) return 1-ein(seg(t,T.kam,T.kam+0.45)); if(t>=T.emerge-0.2&&t<T.emerge+0.1) return eout(seg(t,T.emerge-0.2,T.emerge+0.1)); return 1; };
  const bkS=t=>1;

  // ───────── MÁY QUAY ─────────
  const S=(t0,t1,a,b,ease)=>({t0,t1,a,b:b||a,ease:ease||'eio'});
  const shots=C.seq([
    S(0,T.face1,{tx:0,ty:170,tz:0,dist:1500,yaw:-58,pitch:-6,fov:52,roll:-2},{tx:0,ty:160,tz:0,dist:1350,yaw:-56,pitch:-5,fov:52,roll:-2}),   // toàn cảnh góc giun dọc đại lộ, trăng máu cuối đường
    ...C.pushIn(T.face1,{d:T.face2-T.face1,tx:-380,ty:96,tz:0,dist:235,yaw:24,pitch:-5,fov:42,ox:-0.12}),                                    // đối mặt: Berserk
    ...C.pushIn(T.face2,{d:T.dash-T.face2,tx:380,ty:100,tz:0,dist:235,yaw:-24,pitch:-5,fov:42,ox:0.12}),                                     // đối mặt: Ninja (gương)
    S(T.dash,T.clash,{tx:0,ty:80,tz:0,dist:950,yaw:0,pitch:4,fov:46},{tx:0,ty:80,tz:0,dist:640,yaw:0,pitch:4,fov:46},'ein'),
    S(T.clash,T.clash+0.08,{tx:0,ty:85,tz:0,dist:210,yaw:-14,pitch:-4,roll:7,fov:54}),                                                       // khựng NHIỀU GÓC
    S(T.clash+0.08,T.clash+0.16,{tx:0,ty:70,tz:0,dist:190,yaw:55,pitch:-18,roll:-10,fov:58}),
    S(T.clash+0.16,T.slam,{tx:-100,ty:130,tz:0,dist:330,yaw:32,pitch:-24,roll:-6,fov:52},{tx:-100,ty:135,tz:0,dist:310,yaw:34,pitch:-26,roll:-7,fov:52},'lin'),   // góc giun: Berserk nâng kiếm
    S(T.slam,T.ripo-0.12,{tx:-40,ty:20,tz:-40,dist:950,yaw:-30,pitch:38,fov:50},{tx:-40,ty:20,tz:-40,dist:900,yaw:-28,pitch:38,fov:50}),           // góc cao chéo: kiếm bổ xuống đường, Ninja né
    S(T.ripo-0.12,T.ripo+0.42,{tx:10,ty:86,tz:-30,dist:260,yaw:-36,pitch:-4,roll:8,fov:50},{tx:-10,ty:86,tz:-20,dist:250,yaw:-40,pitch:-4,roll:9,fov:50}),
    S(T.ripo+0.42,T.sweep-0.12,{tx:30,ty:80,tz:0,dist:720,yaw:28,pitch:6,fov:46},{tx:40,ty:80,tz:0,dist:680,yaw:26,pitch:6,fov:46}),
    S(T.sweep-0.12,T.sweep+0.45,{tx:40,ty:85,tz:0,dist:320,yaw:-20,pitch:0,roll:-6,fov:50},{tx:260,ty:85,tz:0,dist:340,yaw:-24,pitch:0,roll:-6,fov:50},'brake'),   // bám Ninja trượt lùi
    S(T.sweep+0.45,T.c1-0.15,{tx:150,ty:90,tz:0,dist:880,yaw:-8,pitch:6,fov:46},{tx:150,ty:90,tz:0,dist:840,yaw:-6,pitch:6,fov:46}),                           // kunai bay ngang khung
    ...C.orbit(T.c1-0.15,{d:T.rage-(T.c1-0.15),cut:0.15,tx:-10,ty:88,tz:0,dist:300,pitch:6,yaw0:-55,yaw1:55}),                                                 // combo: máy XOAY QUANH, đổi góc mỗi 0.15s
    S(T.rage,T.arc-0.32,{tx:-120,ty:135,tz:0,dist:270,yaw:28,pitch:-28,fov:52},{tx:-120,ty:140,tz:0,dist:245,yaw:30,pitch:-30,fov:52},'lin'),               // góc giun: Berserk nổi điên
    S(T.arc-0.32,T.land,{tx:60,ty:320,tz:0,dist:1750,yaw:-12,pitch:4,fov:56},{tx:60,ty:340,tz:0,dist:1650,yaw:-10,pitch:4,fov:56}),                        // toàn: nhát vòng cung xẻ toà nhà phía sau
    S(T.land,T.eye,{tx:110,ty:90,tz:0,dist:430,yaw:-20,pitch:2,fov:48}),
    S(T.eye,T.wind2,{tx:180,ty:110,tz:0,dist:200,yaw:-30,pitch:0,fov:44}),                                                                                 // (cận mắt Mangekyou vẽ ở screen) — kích hoạt TRƯỚC
    S(T.wind2,T.hit60,{tx:-30,ty:115,tz:0,dist:310,yaw:28,pitch:-14,roll:-5,fov:50},{tx:20,ty:110,tz:0,dist:300,yaw:30,pitch:-14,roll:-6,fov:50},'ein'),      // Berserk lao tới vung kiếm
    S(T.hit60,T.kam,{tx:180,ty:96,tz:0,dist:230,yaw:-30,pitch:-2,fov:44,ox:0.1}),                                                                         // kiếm đi XUYÊN qua thân Ninja (xoắn méo)
    S(T.kam,T.emerge,{tx:90,ty:95,tz:0,dist:520,yaw:12,pitch:2,fov:48},{tx:80,ty:95,tz:0,dist:480,yaw:10,pitch:2,fov:48},'lin'),
    S(T.emerge,T.stab,{tx:-80,ty:92,tz:0,dist:320,yaw:-48,pitch:-4,roll:-5,fov:50},{tx:-60,ty:92,tz:0,dist:300,yaw:-50,pitch:-4,roll:-6,fov:50}),
    S(T.stab,T.stab+0.08,{tx:-14,ty:90,tz:0,dist:180,yaw:-24,pitch:-4,roll:-8,fov:56}),                                                                   // khựng nhiều góc lúc đâm
    S(T.stab+0.08,T.stab+0.16,{tx:-14,ty:80,tz:0,dist:200,yaw:50,pitch:-16,roll:9,fov:58}),
    S(T.stab+0.16,T.turn,{tx:-10,ty:90,tz:0,dist:420,yaw:-10,pitch:2,fov:48}),
    ...C.pushIn(T.turn,{d:T.fr1-0.12-T.turn,tx:10,ty:115,tz:0,dist:320,dist1:250,yaw:16,pitch:-12,fov:46,ox:0.06}),                                         // Berserk dưới 30% KHÔNG ngã, quay lại
    S(T.fr1-0.12,T.fr2-0.12,{tx:-110,ty:85,tz:0,dist:430,yaw:22,pitch:0,fov:50},{tx:-160,ty:85,tz:0,dist:420,yaw:22,pitch:0,fov:50},'lin'),
    S(T.fr2-0.12,T.fr3-0.12,{tx:-220,ty:85,tz:0,dist:360,yaw:-32,pitch:-6,roll:6,fov:50},{tx:-260,ty:85,tz:0,dist:350,yaw:-34,pitch:-6,roll:6,fov:50},'lin'),
    S(T.fr3-0.12,T.gen,{tx:-310,ty:85,tz:0,dist:330,yaw:40,pitch:-14,roll:-6,fov:50},{tx:-340,ty:85,tz:0,dist:320,yaw:42,pitch:-14,roll:-6,fov:50},'lin'),
    S(T.gen,T.read,{tx:-392,ty:118,tz:0,dist:150,yaw:-30,pitch:0,fov:40}),                                                                              // (cận mắt Ninja vẽ ở screen) — chạm mắt: trúng ảo thuật
    S(T.read,T.cut-0.12,{tx:-236,ty:118,tz:0,dist:95,yaw:22,pitch:-2,fov:40,ox:-0.06},{tx:-236,ty:118,tz:0,dist:85,yaw:22,pitch:-2,fov:40,ox:-0.06},'lin'),      // ĐẶC TẢ mắt Berserk loé đỏ: bắt được góc
    S(T.cut-0.12,T.cut+0.4,{tx:-380,ty:230,tz:250,dist:900,yaw:-8,pitch:2,fov:56},{tx:-380,ty:240,tz:250,dist:860,yaw:-8,pitch:2,fov:56}),                   // toàn: nhát chém xẻ đôi Ninja + toà nhà phía sau
    S(T.cut+0.4,T.crows,{tx:-400,ty:70,tz:0,dist:300,yaw:-36,pitch:-8,roll:6,fov:50},{tx:-405,ty:62,tz:0,dist:285,yaw:-38,pitch:-8,roll:7,fov:50}),              // 2 nửa người tách nhau rơi xuống
    S(T.crows,T.eye2,{tx:-380,ty:180,tz:0,dist:720,yaw:-20,pitch:-14,fov:58},{tx:-380,ty:420,tz:0,dist:640,yaw:-20,pitch:-34,fov:60}),                         // 2 nửa hoá BẦY QUẠ bay vút lên trời (máy ngước theo)
    S(T.eye2,T.howl,{tx:-392,ty:420,tz:0,dist:620,yaw:-10,pitch:-46,fov:64},{tx:-392,ty:440,tz:0,dist:600,yaw:-10,pitch:-48,fov:64},'lin'),                  // THẾ GIỚI ẢO THUẬT: trời đỏ, 2 mắt Sharingan, quạ lượn
    S(T.howl,T.brk-0.15,{tx:-300,ty:135,tz:0,dist:300,yaw:20,pitch:-30,fov:54},{tx:-300,ty:140,tz:0,dist:270,yaw:22,pitch:-32,fov:54},'lin'),                  // góc giun: Berserk HÚ lên, hào quang bùng
    S(T.brk-0.15,T.DUR,{tx:-300,ty:105,tz:0,dist:520,yaw:-14,pitch:0,fov:50}) ]);                                                                           // chém vỡ ảo cảnh (máy ĐỨNG YÊN, không nghiêng — mảnh kính dời theo máy này)

  // ═════════ KẾT DANG DỞ + CHUYỂN TRẬN (anh biên đạo 11/11) ═════════
  //   Berserk BẮT ĐƯỢC GÓC → chém đứt đôi Ninja cùng 1 toà nhà → 2 nửa rơi xuống thì MẮT SHARINGAN hiện phủ kín bầu trời (dính ẢO THUẬT)
  //   → 2 nửa hoá BẦY QUẠ bay khắp nơi → Berserk HÚ lên bùng hào quang → chém VỠ TAN ảo cảnh thành mảnh kính → sau lớp kính là TRẬN KHÁC (fin1f2: Bat vs Pop + Huh).
  //   Mảnh kính = def.panels: mỗi mảnh 1 ô vẽ lại thế giới ĐÔNG CỨNG ở khung vỡ, dời theo mảnh rơi; ô nền vẽ cảnh mở đầu của fin1f2 (cùng máy quay shot đầu fin1f2 → nối liền).
  const CUT_ANG=-0.42;   // đường chém chéo trên màn hình (rad)
  function halves(F,t){ if(t<T.cut||t>=T.crows+0.25) return; const key=pick(F,'NS'), c=K.prep(F.I[key]); if(!c) return; const x=-392, z=0, P=K.proj(F.B,x,0,z); if(!P) return;
    const h=HT.NS*P.s, w=h*c.sw/c.sh, cx=P.x, cy=P.y-h*0.55, u=seg(t,T.cut,T.cut+0.9), fade=1-seg(t,T.crows,T.crows+0.22);
    const r=F.B.r, flip=((-300-x)*r[0])>0;   // mặt nhìn về Berserk (bên phải)
    const dx=Math.cos(CUT_ANG), dy=Math.sin(CUT_ANG), nx=-dy, ny=dx;   // pháp tuyến đường chém
    F.list.push({d:P.d-2, fn:()=>{ const g=F.g;
      for(const side of [1,-1]){ g.save(); g.globalAlpha=fade;
        const mv=side>0?{x:-dx*h*0.75*eout(u), y:-dy*h*0.2*eout(u)+Math.min(h*0.5,h*1.4*u*u), rot:-0.4*eout(u)}:{x:dx*h*0.12*u, y:Math.min(h*0.08,h*0.3*u*u), rot:0.16*ein(u)};   // nửa trên TRƯỢT theo đường chém rồi rơi đáp đất · nửa dưới nghiêng đổ
        g.translate(cx+mv.x,cy+mv.y); g.rotate(mv.rot); g.translate(-cx,-cy);
        g.beginPath(); const L=Math.max(w,h)*2; g.moveTo(cx-dx*L,cy-dy*L); g.lineTo(cx+dx*L,cy+dy*L); g.lineTo(cx+dx*L-side*nx*L,cy+dy*L-side*ny*L); g.lineTo(cx-dx*L-side*nx*L,cy-dy*L-side*ny*L); g.closePath(); g.clip();
        if(flip){ g.translate(P.x,0); g.scale(-1,1); g.translate(-P.x,0); } g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,P.x-w/2,P.y-h,w,h);
        if(flip){ g.translate(P.x,0); g.scale(-1,1); g.translate(-P.x,0); }
        g.globalCompositeOperation='lighter'; g.strokeStyle=`rgba(255,235,225,${0.9*(1-0.6*u)})`; g.lineWidth=Math.max(2,h*0.018); g.beginPath(); g.moveTo(cx-dx*w*0.7,cy-dy*w*0.7); g.lineTo(cx+dx*w*0.7,cy+dy*w*0.7); g.stroke();   // mép chém sáng
        g.strokeStyle=`rgba(255,90,70,${0.4*(1-0.6*u)})`; g.lineWidth=Math.max(5,h*0.05); g.stroke();
        g.restore(); }
      if(u<0.5){ g.save(); g.globalCompositeOperation='lighter'; g.globalAlpha=(1-u*2)*fade; g.strokeStyle='#ffe8e0'; g.lineWidth=Math.max(2,h*0.02); g.beginPath(); g.moveTo(cx-dx*w,cy-dy*w); g.lineTo(cx+dx*w,cy+dy*w); g.stroke(); g.restore(); } }}); }
  // 🐦‍⬛ bầy quạ (ảo thuật Itachi): nổ ra từ 2 nửa người, vỗ cánh bay tán loạn khắp nơi, có con lao thẳng vào máy; lông vũ đen rơi lả tả
  const CROWS=Array.from({length:70},(_,i)=>{ const a=hash(i*3.1)*TAU, sp=200+420*hash(i*7.3); return {x0:-392+(hash(i*1.9)-0.5)*40, y0:40+90*hash(i*2.7), vx:Math.cos(a)*sp, vy:420+700*hash(i*5.7), vz:Math.sin(a)*sp-(i%7===0?350:0), s:22+26*hash(i*9.1), ph:hash(i*4.4)*TAU}; });
  function crows(F,t){ if(t<T.crows||t>T.brk+1.2) return; const v=t-T.crows, push=t>=T.howl?seg(t,T.howl,T.howl+0.6):0;
    for(const c of CROWS){ const k=1-Math.exp(-v*1.2), x=c.x0+c.vx*k*1.3+(c.x0+300>0?1:-1)*push*400, y=c.y0+c.vy*k*1.3+v*v*20, z=c.vz*k*1.3, P=K.proj(F.B,x,y,z); if(!P) continue;
      const S=c.s*P.s, fl=Math.sin(v*24+c.ph), hd=Math.atan2(-c.vy,c.vx*(P.x>F.VW/2?1:1));
      F.list.push({d:P.d, fn:()=>{ const g=F.g; g.save(); g.translate(P.x,P.y); g.rotate(Math.atan2(-c.vy*0.4,c.vx)*0.5); if(c.vx<0) g.scale(-1,1); g.fillStyle='#07060a'; crowShape(g,S,Math.abs(fl)); g.restore(); }}); }
    for(let i=0;i<34;i++){ const ph=(v*0.35+hash(i*2.3))%1, x=-392+(hash(i*5.1)-0.5)*900, y=420-ph*420, z=(hash(i*6.2)-0.5)*500, P=K.proj(F.B,x,y,z); if(!P) continue; const s=Math.max(1,6*P.s);
      F.list.push({d:P.d, fn:()=>{ const g=F.g; g.save(); g.translate(P.x,P.y); g.rotate(v*3+i); g.fillStyle='rgba(10,8,12,0.85)'; g.beginPath(); g.ellipse(0,0,s,s*0.3,0,0,TAU); g.fill(); g.restore(); }}); } }
  // 👁️ 2 MẮT SHARINGAN TRÊN TRỜI (theo ảnh mẫu anh gửi): 2 mắt hạnh nhân viền đen 2 bên khung, lòng trắng, tròng đỏ (ảnh Sharingan của game) xoay chậm,
  //    quầng đỏ sẫm sau mắt; vẽ SAU mọi toà nhà (xa nhất) → nhà che chân trời. Bầy quạ đen lượn trên trời (skyCrows).
  function skyEye(F,t){ if(t<T.eye2||t>=T.fall) return; skyCrows(F,t); if(F.B.pitch>-0.42) return;   // 2 mắt CHỈ hiện khi máy NGƯỚC lên thấy trời (máy nhìn ngang thì mắt bị nhà che còn 1 mẩu — anh chê 11/11)
    const k=eout(seg(t,T.eye2,T.eye2+0.5)), im=F.I.NJS; if(!im||!im.complete||!im.naturalWidth) return;
    F.list.push({d:1e9, fn:()=>{ const g=F.g, VW=F.VW, VH=F.VH; g.save();
      for(const sd of [-1,1]){ const cx=VW*(0.5+sd*0.3), cy=VH*0.2, ew=VW*0.2, eh=VH*0.1*k+0.5, tilt=sd*0.06;
        const gr=g.createRadialGradient(cx,cy,ew*0.4,cx,cy,ew*1.4); gr.addColorStop(0,`rgba(30,0,0,${0.6*k})`); gr.addColorStop(1,'rgba(30,0,0,0)'); g.fillStyle=gr; g.fillRect(cx-ew*1.5,cy-ew*1.5,ew*3,ew*3);
        const lid=()=>{ g.beginPath(); g.moveTo(cx-ew,cy+eh*0.15); g.bezierCurveTo(cx-ew*0.4,cy-eh*1.25,cx+ew*0.5,cy-eh*1.1,cx+ew,cy-eh*0.1*sd); g.bezierCurveTo(cx+ew*0.45,cy+eh*1.0,cx-ew*0.5,cy+eh*1.05,cx-ew,cy+eh*0.15); g.closePath(); };
        g.save(); g.translate(cx,cy); g.rotate(tilt); g.translate(-cx,-cy); lid(); g.save(); g.clip(); g.fillStyle='#f4ece8'; g.fillRect(cx-ew,cy-eh*1.4,ew*2,eh*2.8);
        const ir=VH*0.1, ix=cx+sd*ew*0.05; g.translate(ix,cy); g.rotate(-t*1.6*sd); g.drawImage(im,-ir,-ir,ir*2,ir*2); g.restore();
        g.strokeStyle='#0a0000'; g.lineWidth=Math.max(3,VH*0.012); lid(); g.stroke(); g.restore(); }
      g.restore(); }}); }
  function crowShape(g,S,fl){ g.beginPath(); g.ellipse(0,0,S*0.5,S*0.16,0,0,TAU); g.fill(); g.beginPath(); g.arc(S*0.46,-S*0.05,S*0.14,0,TAU); g.fill();
    g.beginPath(); g.moveTo(S*0.56,-S*0.07); g.lineTo(S*0.82,-S*0.01); g.lineTo(S*0.56,S*0.02); g.fill();
    for(const sd of [-1,1]){ const up=sd*S*(0.2+0.75*fl); g.beginPath(); g.moveTo(S*0.12,0); g.lineTo(-S*0.05,up*0.55); g.lineTo(-S*0.3,up*1.05);   // cánh xoè sắc, mép sau răng cưa lông
      for(let q=0;q<5;q++){ const f=q/4; g.lineTo(-S*(0.42-0.05*q),up*(0.95-0.18*q)); g.lineTo(-S*(0.3-0.06*q),up*(0.7-0.16*q)); } g.lineTo(-S*0.18,0); g.closePath(); g.fill(); }
    g.beginPath(); g.moveTo(-S*0.42,0); g.lineTo(-S*0.8,-S*0.14); g.lineTo(-S*0.72,0); g.lineTo(-S*0.8,S*0.14); g.closePath(); g.fill(); }
  // bầy quạ lượn trên trời đỏ (xa, nhiều cỡ, mờ nhẹ theo khoảng cách) — cảnh ảo thuật
  function skyCrows(F,t){ const k=seg(t,T.eye2,T.eye2+0.6); F.list.push({d:9e8, fn:()=>{ const g=F.g, VW=F.VW, VH=F.VH; g.save(); g.fillStyle='#0a0204';
    for(let i=0;i<22;i++){ const sp=0.04+0.08*hash(i*2.1), x=((hash(i*3.7)+t*sp*(i%2?1:-1))%1+1)%1*VW*1.2-VW*0.1, y=VH*(0.04+0.42*hash(i*5.3))+Math.sin(t*1.5+i)*VH*0.02, S=VH*(0.02+0.05*hash(i*7.1));
      g.globalAlpha=k*(0.55+0.45*hash(i*9.9)); g.save(); g.translate(x,y); if(i%2) g.scale(-1,1); g.rotate((hash(i)-0.5)*0.5); crowShape(g,S,Math.abs(Math.sin(t*(7+5*hash(i))+i))); g.restore(); }
    g.restore(); }}); }

  // 🌆 TRẬN KẾ TIẾP (sau lớp kính vỡ): cảnh mở đầu của fin1f2 — cùng thành phố seed 5, cùng chỗ đứng, cùng máy quay shot đầu
  const CITY2=Fin1City({seed:5});
  const NEXTCAM={tx:0,ty:160,tz:0,dist:1500,yaw:-56,pitch:-6,fov:52,roll:-2};
  function drawNext(F,t){ CITY2.draw(F,t,CITY2.TH_NIGHT); const H2=120;
    K.sprite(F,{img:F.I.fA0,x:430,z:0,h:H2*1.12,life:{breath:0.6,wind:1.1}}); K.sprite(F,{img:F.I.fP0,x:-380,z:-60,h:H2*0.8,life:{breath:0.8}}); K.sprite(F,{img:F.I.fU0,x:-500,z:90,h:H2*0.78,life:{breath:0.7}});
    K.smoke(F,{x:-380,z:-60,t0:-0.5,n:6,spread:70,rise:10,life:6,size:70,seed:3,a:0.5,tint:'90,70,64'}); K.smoke(F,{x:0,z:300,t0:-0.3,n:12,spread:1700,rise:30,life:3,size:90,seed:1,swirl:0.2,a:0.22,tint:'150,90,80'}); }
  // mảnh kính: lưới tam giác lệch ngẫu nhiên (tỉ lệ khung 0–1), rơi trễ dần theo khoảng cách tới điểm nứt
  const CRACK=[0.46,0.46];
  const SHARDS=(()=>{ const NX=6, NY=4, P=[]; for(let j=0;j<=NY;j++) for(let i=0;i<=NX;i++){ const ed=i===0||j===0||i===NX||j===NY; P.push([i/NX+(ed?0:(hash(i*7+j*13)-0.5)*0.12), j/NY+(ed?0:(hash(i*11+j*3)-0.5)*0.16)]); }
    const id=(i,j)=>j*(NX+1)+i, out=[]; for(let j=0;j<NY;j++) for(let i=0;i<NX;i++){ const a=P[id(i,j)], b=P[id(i+1,j)], c=P[id(i+1,j+1)], d=P[id(i,j+1)];
      for(const tri of (hash(i+j*9)<0.5?[[a,b,c],[a,c,d]]:[[a,b,d],[b,c,d]])){ const cx=(tri[0][0]+tri[1][0]+tri[2][0])/3, cy=(tri[0][1]+tri[1][1]+tri[2][1])/3;
        out.push({pts:tri, cx, cy, delay:0.32*Math.hypot(cx-CRACK[0],cy-CRACK[1]), vx:(cx-CRACK[0])*0.35+(hash(cx*91)-0.5)*0.08}); } } return out; })();
  const shardPos=(sh,t)=>{ const tau=Math.max(0,t-T.fall-sh.delay); return {dx:sh.vx*tau, dy:0.5*2.4*tau*tau}; };
  let FREEZE=null;
  function panels(t){ if(t<T.fall) return null; if(!FREEZE) FREEZE=Object.assign({},K.camAt(shots,T.fall-1e-4));
    const out=[{cam:NEXTCAM, clip:[[0,0],[1,0],[1,1],[0,1]], next:true}];
    for(const sh of SHARDS){ const {dx,dy}=shardPos(sh,t); if(dy>1.25) continue; out.push({cam:Object.assign({},FREEZE,{ox:(FREEZE.ox||0)+dx, oy:(FREEZE.oy||0)+dy, roll:0}), clip:sh.pts.map(([x,y])=>[x+dx,y+dy]), freeze:true}); }
    return out; }

  // ───────── HIỆU ỨNG ─────────
  // vệt chém đúng nhịp: vung trong `pre` giây trước mốc chạm → mờ dần sau mốc
  function slashAt(F,t,t0,x,y,o){ const pre=o.pre||0.16, post=o.post||0.22; if(t<t0-pre||t>t0+post) return;
    K.slash(F,x,y,o.z||0,{ang:o.ang||0,R:o.R||140,span:o.span||150,k:seg(t,t0-pre,t0+0.02),a:1-seg(t,t0+0.02,t0+post),col:o.col||'200,225,255',flip:o.flip}); }
  const CLASHES=[[T.clash,0],[T.sweep,52],[T.fr1,-118],[T.fr2,-198],[T.fr3,-270]];   // kiếm va kiếm: tia lửa + vòng sóng
  const HITS=[[T.ripo,-30,'255,120,90'],[T.c1,-30,'255,120,90'],[T.c2,-50,'255,120,90'],[T.c3,-70,'255,120,90'],[T.stab,0,'255,70,60']];
  function world(F,t0){ const pn=F.panel||{}; if(pn.next){ F.t=t0; return drawNext(F,t0); } const t=pn.freeze?T.fall-1e-4:t0; F.t=t;
    const th=theme(t), g0=W.track(NK,hs(t)), b0=W.track(BK,hs(t)), rk=rageK(t);
    CITY.draw(F,t,th);
    const bk=pick(F,b0.im), nk=pick(F,g0.im);
    const bs=bkS(t), ns=ninjaS(t), bh=(HT[b0.im]||H)*bs, nh=(HT[g0.im]||H)*ns;
    if(bs>0.02) W.actor(F,{key:bk,dir:DIR[b0.im]||-1,x:b0.x,z:b0.z,y:b0.y+(HT[b0.im]||H)*(1-bs)*0.5,h:bh,look:{x:g0.x,z:g0.z},smear:b0.sm,lean:t>=T.kneel?-14*seg(t,T.kneel,T.kneel+0.4):0,shadow:bs>0.6&&b0.y<200,
      aura:rk>0.05?{preset:'haki',k:0.35+0.65*rk,seed:7}:null, white:(t>=T.ripo&&t<T.ripo+0.06)||(t>=T.stab&&t<T.stab+0.07)?1:0,
      life:{breath:t>=T.turn?1.4:0.6,wind:0.6,squash:K.squash(hs(t),T.slam,0.35,0.1)}});
    if(ns>0.02&&t<T.cut) W.actor(F,{key:nk,dir:DIR[g0.im]||-1,x:g0.x,z:g0.z,y:g0.y+(HT[g0.im]||H)*(1-ns)*0.5,h:nh,look:{x:b0.x,z:b0.z},smear:g0.sm,shadow:ns>0.6&&g0.y<150,
      life:{breath:0.5,wind:1.0,squash:K.squash(hs(t),T.land,0.35,0.1)}});
    // gió bụi nền
    K.smoke(F,{x:0,z:300,t0:-0.3,n:12,spread:1700,rise:30,life:3,size:90,seed:1,swirl:0.2,a:0.22,tint:'150,90,80'});
    // ⚔️ va kiếm
    for(const [tt,cx] of CLASHES) if(t>=tt&&t<tt+0.6){ const u=seg(t,tt,tt+0.45); K.ring(F,cx,0,30+200*eout(u),7,0.6*(1-u),'255,210,160');
      K.sparks(F,{x:cx,y:95,z:0,t0:tt,n:34,speed:700,life:0.5,seed:(tt*10)|0,col:'255,220,150'}); }
    for(const [tt,cx,col] of HITS) if(t>=tt&&t<tt+0.6){ K.sparks(F,{x:cx,y:90,z:0,t0:tt,n:22,speed:520,life:0.45,seed:(tt*13)|0,col}); K.smoke(F,{x:cx,z:0,t0:tt,n:6,spread:140,rise:40,life:0.9,size:40,seed:(tt*7)|0,a:0.45}); }
    // vệt chém: Ninja = thép xanh trắng (ngắn, nhanh) · Berserk = đỏ đen, to theo cơn điên
    const bR=170*(1+1.3*rk), bC=rk>0.4?'255,70,50':'230,200,190';
    slashAt(F,t,T.clash,0,100,{ang:-20,R:150,col:'210,230,255'}); slashAt(F,t,T.clash,-10,95,{ang:160,R:bR,col:bC,flip:true});
    slashAt(F,t,T.slam,-40,140,{ang:-95,R:bR*1.15,span:120,col:bC,pre:0.12});
    slashAt(F,t,T.ripo,-10,92,{ang:200,R:150,col:'210,230,255',pre:0.12});
    slashAt(F,t,T.sweep,30,85,{ang:-10,R:bR,col:bC,pre:0.2});
    slashAt(F,t,T.c1,-20,100,{ang:150,R:130,col:'210,230,255',pre:0.1}); slashAt(F,t,T.c2,-40,80,{ang:20,R:130,col:'210,230,255',pre:0.1,flip:true}); slashAt(F,t,T.c3,-60,95,{ang:250,R:150,col:'210,230,255',pre:0.1});
    slashAt(F,t,T.arc,0,150,{ang:-15,R:900*(1+0.6*rk),span:170,col:'255,60,40',pre:0.24,post:0.45});
    if(t>=T.arc-0.24&&t<T.arc+0.45){ const P=K.proj(F.B,0,150,0); if(P){ const k=seg(t,T.arc-0.24,T.arc+0.02), al=1-seg(t,T.arc+0.02,T.arc+0.45), R=900*(1+0.6*rk)*P.s, a0=-Math.PI*0.62, a1=a0+Math.PI*0.95*k;
      F.list.push({d:P.d-31, fn:()=>{ const g=F.g; g.save(); g.translate(P.x,P.y); g.rotate(-15*Math.PI/180); g.globalAlpha=0.85*al; g.fillStyle='#120406';
        g.beginPath(); g.arc(0,0,R*0.97,Math.max(a0,a1-1.6),a1); g.arc(-R*0.1,0,R*0.86,a1-0.05,Math.max(a0,a1-1.6)+0.05,true); g.closePath(); g.fill(); g.restore(); }}); } }   // lõi đen của nhát chém (kiểu Berserk)
    slashAt(F,t,T.hit60,120,95,{ang:-12,R:bR,col:bC,pre:0.16});
    for(const tt of [T.fr1,T.fr2,T.fr3]) slashAt(F,t,tt,b0.x+60,95,{ang:-12+((tt*10|0)%2)*30,R:bR*1.1,col:'255,60,40',pre:0.12});
    // đại kiếm bổ xuống mặt đường: đá vụn + bụi + vòng sóng (KHÔNG vẽ vết nứt đất)
    if(t>=T.slam&&t<T.slam+1.8){ K.debris(F,{x:-20,y:10,z:0,t0:T.slam,n:30,speed:900,life:1.3,size:26,seed:31,col:'#4a4246'}); K.smoke(F,{x:-20,z:0,t0:T.slam,n:14,spread:420,rise:120,life:1.6,size:120,seed:32,a:0.55,tint:'130,104,96'});
      if(t<T.slam+0.6){ const u=seg(t,T.slam,T.slam+0.6); K.ring(F,-20,0,40+380*eout(u),12,0.55*(1-u),'240,220,200'); } }
    // 🗡️ kunai: 3 mũi bay ngang → 2 mũi bị gạt văng (tia lửa), 1 mũi sượt qua
    if(t>=T.kun&&t<T.kun+0.6) for(let i=0;i<3;i++){ const t0=T.kun+i*0.06, u=seg(t,t0,t0+0.22); if(t<t0) continue; const x=lerp(320,-30,u), y=92+(i-1)*18, z=(i-1)*20;
      if(u<1) W.line(F,[[x,y,z],[x+46,y+2,z]],4,'#c8ccd6',{glow:'rgba(255,255,255,0.35)'});
      else if(i<2){ const v=t-(t0+0.22); W.line(F,[[-30+v*400,y+v*500-v*v*900,z+v*300],[-10+v*400,y+v*500-v*v*900+8,z+v*300]],4,'#c8ccd6'); if(v<0.1) K.sparks(F,{x:-30,y,z,t0:t0+0.22,n:10,speed:400,life:0.3,seed:70+i,col:'255,230,160'}); } }
    // 😡 nổi điên: lửa đỏ bốc ngùn ngụt dưới chân + tàn lửa bay lên
    if(rk>0.5&&t<T.fall){ K.smoke(F,{x:b0.x,z:b0.z,t0:Math.floor(t*5)/5,n:3,spread:60,rise:160,life:0.9,size:60,seed:Math.floor(t*5)+400,a:0.5*rk,tint:'190,40,30'});
      K.sparks(F,{x:b0.x,y:40,z:b0.z,t0:Math.floor(t*6)/6,n:6,speed:260,life:0.6,seed:Math.floor(t*6)+500,col:'255,120,60'}); }
    // nhát vòng cung xẻ toà nhà: đá + khói ở chân nhà phía sau
    if(t>=T.arc+0.1&&t<T.arc+3){ K.debris(F,{x:500,y:900,z:1500,t0:T.arc+0.12,n:40,speed:1800,life:2.4,size:90,seed:81,col:'#4d4040'}); K.smoke(F,{x:500,z:1500,t0:T.arc+0.2,n:18,spread:1400,rise:900,life:2.6,size:520,seed:82,a:0.5,tint:'110,80,66'}); }
    // 🌀 KAMUI: nuốt Ninja ở chỗ bị chém (60% / 30%) → mở sau lưng / trên đầu Berserk
    const KS=H*0.375*1.9;   // game: R = size × 1.9, size = BÁN KÍNH meme ≈ 0.375 × chiều cao (bản đầu em nhân nhầm với chiều cao → xoắn to gấp 2.7)
    W.kamui(F,190,70,0,KS*0.55,seg(t,T.hit60-0.06,T.hit60+0.34),{mode:'phase',angle:3});            // ① xuyên thấu: thân Ninja xoắn méo lúc lưỡi kiếm đi qua
    W.kamui(F,190,62,0,KS,seg(t,T.kam-0.05,T.kam+0.6),{dir:1});                                        // Kamui hút chính Ninja tại chỗ
    W.kamui(F,-150,62,0,KS,seg(t,T.emerge-0.35,T.emerge+0.25),{dir:-1});                               // xoáy ngược chiều nhả Ninja ra sau lưng Berserk
    halves(F,t); crows(F,t); skyEye(F,t);
    // nhát chém chéo xẻ đôi Ninja + toà nhà: vệt đỏ đen khổng lồ + đá vụn từ toà nhà
    slashAt(F,t,T.cut,-392,200,{ang:-24,R:1400,span:150,col:'255,60,40',pre:0.14,post:0.5});
    if(t>=T.cut+0.1&&t<T.cut+3){ K.debris(F,{x:-420,y:1100,z:1400,t0:T.cut+0.12,n:40,speed:1600,life:2.4,size:80,seed:121,col:'#4d4040'}); K.smoke(F,{x:-420,z:1400,t0:T.cut+0.2,n:16,spread:1200,rise:800,life:2.6,size:480,seed:122,a:0.5,tint:'110,80,66'}); }
    // HÚ: vòng sóng chấn động + đá bốc lên quanh chân Berserk
    if(t>=T.howl&&t<T.brk){ for(let i=0;i<4;i++){ const ph=((t-T.howl)*1.8+i/4)%1; K.ring(F,-300,0,40+700*ph,16,0.7*(1-ph),'255,70,50'); }
      K.debris(F,{x:-300,y:5,z:0,t0:T.howl,n:30,speed:700,life:1.2,size:20,seed:131,col:'#4a3f44',dir:90,cone:120}); }
    // chém vỡ ảo cảnh
    slashAt(F,t,T.brk,-330,150,{ang:-30,R:700,span:160,col:'255,80,60',pre:0.12,post:0.3});
  }
  // 👁️ CỰC CẬN MẮT MANGEKYOU (ảnh Sharingan của game) — nền đen, đồng tử xoay, quầng đỏ, vệt loé
  function eyeFX(F,t){ const A=t>=T.eye&&t<T.wind2?[T.eye,T.wind2]:t>=T.gen&&t<T.read?[T.gen,T.read]:null; if(!A) return; const g=F.g, VW=F.VW, VH=F.VH, u=seg(t,A[0],A[1]), im=F.I.NJS;
    g.save(); g.fillStyle='#070205'; g.fillRect(0,0,VW,VH);
    const cx=VW/2, cy=VH*0.52, R=VH*0.36*(1+0.08*eout(u)), open=eout(seg(u,0,0.3));
    g.save(); g.beginPath(); g.ellipse(cx,cy,VW*0.42,R*1.15*open+1,0,0,TAU); g.clip(); g.fillStyle='#e9e4e2'; g.fillRect(0,0,VW,VH);
    if(im&&im.complete&&im.naturalWidth){ g.translate(cx,cy); g.rotate(-t*3.5-u*2); g.drawImage(im,-R,-R,2*R,2*R); g.setTransform(1,0,0,1,0,0); }
    g.restore();
    g.globalCompositeOperation='lighter'; const gr=g.createRadialGradient(cx,cy,R*0.6,cx,cy,VW*0.7); gr.addColorStop(0,`rgba(255,40,40,${0.25+0.3*seg(u,0.3,0.6)})`); gr.addColorStop(1,'rgba(255,0,0,0)'); g.fillStyle=gr; g.fillRect(0,0,VW,VH);
    if(u>0.35&&u<0.7){ g.save(); g.translate(cx,cy); g.scale(1,0.04); const s=g.createRadialGradient(0,0,0,0,0,VW*0.6); s.addColorStop(0,'rgba(255,220,220,0.9)'); s.addColorStop(1,'rgba(255,60,60,0)'); g.fillStyle=s; g.beginPath(); g.arc(0,0,VW*0.6,0,TAU); g.fill(); g.restore(); }
    g.globalCompositeOperation='source-over'; g.strokeStyle='#050203'; g.lineWidth=10; g.beginPath(); g.ellipse(cx,cy,VW*0.42,R*1.15*open+1,0,0,TAU); g.stroke();
    g.restore(); }
  function endFX(F,t){ const g=F.g, VW=F.VW, VH=F.VH;
    if(t>=T.eye2&&t<T.fall){ const k=seg(t,T.eye2,T.eye2+0.5), vg=g.createRadialGradient(VW/2,VH*0.55,VH*0.3,VW/2,VH*0.55,VW*0.7); vg.addColorStop(0,'rgba(60,0,0,0)'); vg.addColorStop(1,`rgba(40,0,0,${0.6*k})`); g.save(); g.fillStyle=vg; g.fillRect(0,0,VW,VH); g.restore(); }   // ẢO THUẬT: viền tối đỏ
    if(t>=T.brk&&t<T.fall){ const u=seg(t,T.brk,T.fall); g.save(); g.lineCap='round';
      for(let i=0;i<14;i++){ const an=i/14*TAU+hash(i*3.3)*0.4; let x=CRACK[0]*VW, y=CRACK[1]*VH, L=0; g.beginPath(); g.moveTo(x,y); const Lmax=u*VW*(0.5+0.5*hash(i*5.1));
        while(L<Lmax){ const st=14+18*hash(i*7+L), a2=an+(hash(i*11+L*0.3)-0.5)*0.5; x+=Math.cos(a2)*st; y+=Math.sin(a2)*st; L+=st; g.lineTo(x,y); }
        g.strokeStyle='rgba(255,255,255,0.9)'; g.lineWidth=1.3; g.stroke(); g.globalCompositeOperation='lighter'; g.strokeStyle='rgba(255,200,200,0.25)'; g.lineWidth=4; g.stroke(); g.globalCompositeOperation='source-over'; }
      for(let r=1;r<4;r++){ const R=u*VW*0.12*r; g.strokeStyle='rgba(255,255,255,0.35)'; g.lineWidth=1; g.beginPath(); for(let i=0;i<=14;i++){ const an=i/14*TAU, rr=R*(0.85+0.3*hash(i*r)); i?g.lineTo(CRACK[0]*VW+Math.cos(an)*rr,CRACK[1]*VH+Math.sin(an)*rr):g.moveTo(CRACK[0]*VW+Math.cos(an)*rr,CRACK[1]*VH+Math.sin(an)*rr); } g.stroke(); }
      g.restore(); if(t<T.brk+0.05) K.flash(F,0.5,'#ffffff'); }
    if(t>=T.fall){ g.save(); for(const sh of SHARDS){ const {dx,dy}=shardPos(sh,t); if(dy>1.25) continue; const p=sh.pts.map(([x,y])=>[(x+dx)*VW,(y+dy)*VH]);
        g.strokeStyle='rgba(255,255,255,0.5)'; g.lineWidth=1; g.beginPath(); p.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1])); g.closePath(); g.stroke();
        g.globalCompositeOperation='lighter'; g.strokeStyle='rgba(255,220,220,0.35)'; g.lineWidth=4; g.beginPath(); g.moveTo(p[0][0],p[0][1]); g.lineTo(p[1][0],p[1][1]); g.stroke(); g.globalCompositeOperation='source-over'; }
      g.restore(); } }
  const SMEAR=[[T.dash+0.2,1],[T.ripo-0.12,-1],[T.c1+0.08,1],[T.c2+0.08,-1],[T.fr2-0.12,-1],[T.fr3-0.12,1]];

  CineKit.film({ id:'fin1f3', title:'Final 1 · Fight · Ninja Cat vs Berserk Cat', DUR:T.DUR, VW:960, VH:540, fadeIn:false, fadeOut:false,   /* 11/11: nằm giữa tập full (vào từ cảnh nối fin1c5, ra qua kính vỡ) */
    imgs:IMG, cast:['ninja','nj','bk'],
    sfx:[[0.1,'l2p_rumble',0.45,null,'toàn cảnh đại lộ đổ nát, gió bụi'],
      [T.face1+0.1,'l2p_sub',0.4,null,'đối mặt: cận Berserk, nền trầm rung'],
      [T.face2+0.35,'ep3_shine',0.5,null,'đối mặt: Ninja nắm chuôi Kusanagi, lưỡi kiếm loé'],
      [T.dash,'ep3_whoosh',0.8,null,'2 bên lấy đà lao vào nhau'],
      [T.clash,'bk_clang',1,null,'2 lưỡi kiếm va nhau giữa đường, khựng'],
      [T.wind,'l2p_whoosh',0.5,null,'Berserk nâng đại kiếm qua đầu lấy đà'],
      [T.slam,'cine_deep_impact',0.9,null,'đại kiếm bổ xuống mặt đường, Ninja bước né'],
      [T.ripo-0.06,'ninja_slash',0.9,null,'Ninja phản đòn chém trúng Berserk'],
      [T.sweep,'se_impact_stop',0.95,null,'Ninja đỡ cú quét ngang, kiếm va kiếm, trượt lùi'],
      [T.kun,'ninja_kunai',0.8,null,'Ninja ném 3 kunai'],
      [T.kun+0.24,'se_slash',0.5,null,'Berserk gạt kunai văng bằng bản kiếm'],
      [T.c1,'se_slash',0.7,null,'combo: Ninja chém trúng nhát 1'],[T.c2,'hit_mid',0.7,null,'combo: chém trúng nhát 2'],[T.c3,'se_whoosh_fast',0.8,null,'combo: chém trúng nhát 3, Berserk lùi'],
      [T.rage,'cine_haki',0.8,null,'Berserk nổi điên: lửa đỏ bốc lên, kiếm vung xa hơn'],
      [T.arc-0.12,'l2p_whoosh',0.8,null,'Berserk chém vòng cung khổng lồ'],
      [T.arc+0.14,'cine_heavy_slow',0.9,null,'nhát chém xẻ toà nhà phía sau, nhà đổ'],
      [T.hit60,'ep3_whoosh',0.7,null,'đại kiếm đi xuyên qua người Ninja'],
      [T.eye,'nj_sharingan',1,null,'cận mắt Mangekyou Sharingan loé, Kamui kích hoạt'],
      [T.gen,'l2p_chime',0.7,null,'Ninja nhìn thẳng mắt Berserk, Sharingan loé (dính ảo thuật)'],
      [T.kam,'ep3_kamui',0.9,null,'xoáy Kamui nuốt Ninja'],
      [T.emerge-0.3,'ninja_sub',0.6,null,'xoáy mở sau lưng Berserk, Ninja chui ra'],
      [T.stab,'cine_impact',1,null,'Ninja đâm xuyên lưng Berserk, trúng 150'],
      [T.turn,'l2p_riser',0.6,null,'Berserk dưới 30% không ngã, quay lại, lửa bùng'],
      [T.fr1,'ep3_klunk',0.85,null,'Berserk chém dồn nhát 1, Ninja đỡ, kiếm va kiếm'],[T.fr2,'l2p_whoosh',0.6,null,'chém dồn nhát 2, Ninja lùi né'],[T.fr3,'ep3_whoosh',0.6,null,'chém dồn nhát 3, Ninja lùi né'],
      [T.read,'ep3_shine',0.5,null,'đặc tả mắt Berserk loé đỏ, bắt được góc chém'],
      [T.cut-0.22,'se_whoosh_fast',0.75,null,'Berserk vung đại kiếm chém chéo'],
      [T.cut,'se_super_hit',1,null,'đại kiếm trúng Ninja, chém đứt đôi người cùng toà nhà phía sau'],
      [T.cut+0.22,'cine_heavy_slow',0.8,null,'toà nhà bị xẻ đôi đổ sập'],
      [T.eye2,'l2p_shimmer',0.8,null,'mắt Sharingan khổng lồ hiện phủ kín bầu trời (ảo thuật)'],
      [T.crows,'fin_crow_fly',1,null,'2 nửa người hoá bầy quạ vỗ cánh bay tán loạn'],
      [T.crows+0.25,'fin_crow_caw',0.8,null,'quạ kêu giữa bầy quạ bay'],
      [T.howl,'bk_howl',1,null,'Berserk gầm thét hú lên, hào quang bùng nổ'],
      [T.brk,'se_glass',1,null,'nhát chém làm ảo cảnh nứt toác như mặt kính'],
      [T.fall,'l2p_shatter',0.9,null,'ảo cảnh vỡ tan thành mảnh kính rơi, lộ ra trận khác']],
    mus:[{src:'assets/audio/dp_akatsuki.mp3',ra:0,rb:T.DUR,vol:0.55,loop:true,fi:0.6,fo:1.5}],
    theme:t=>theme(t), shots,
    impact:C.negFrames([T.ripo,T.sweep,T.c1,T.c2,T.c3,T.fr1,T.slam,T.brk],0.07,'inv',[T.clash,T.stab,T.cut]),
    shake:t=>{ let s=0; const h=(a,amp,d)=>{ if(t>=a&&t<a+d) s=Math.max(s,amp*(1-(t-a)/d)); };
      h(T.clash,14,0.45); h(T.slam,16,0.5); h(T.ripo,7,0.3); h(T.sweep,9,0.35); h(T.c1,5,0.2); h(T.c2,5,0.2); h(T.c3,8,0.3); h(T.arc+0.12,22,1.2); h(T.stab,14,0.5); h(T.fr1,8,0.3); h(T.cut,20,0.7); h(T.brk,12,0.4); if(t>=T.howl&&t<T.brk) s=Math.max(s,5+4*seg(t,T.howl,T.howl+0.5)); if(t>=T.fall) s=0;
      if(t>=T.rage&&t<T.arc) s=Math.max(s,2+3*seg(t,T.rage,T.arc)); return s; },
    world, panels, post(F,t){ const fx={shocks:[]}; if(t>=T.fall) return fx; const sh=(a,x,y,rm,d,str)=>{ if(t>=a&&t<a+d){ const u=(t-a)/d; fx.shocks.push({x,y,z:0,r:20+rm*eout(u),w:26,str:str*(1-u)}); fx.chroma=Math.max(fx.chroma||0,2*(1-u)); } };
      sh(T.clash,0,95,420,0.5,30); sh(T.slam,-20,20,520,0.6,28); sh(T.sweep,52,90,300,0.4,20); sh(T.stab,0,90,420,0.5,32); sh(T.cut,-392,90,520,0.6,34); sh(T.howl,-300,90,700,1.0,30); sh(T.arc+0.1,300,300,900,0.8,30);
      if(t>=T.rage&&t<T.arc){ fx.chroma=Math.max(fx.chroma||0,1); } return fx; },
    screen(F,t){ const g=F.g, VW=F.VW, VH=F.VH; F.t=t;
      eyeFX(F,t); endFX(F,t); if(C) C.wipeBlob(F,t,T.eye2-0.1,0.2,'#a00000');
      if(t>=T.dash&&t<T.clash) K.panLines(F,{k:0.9,ang:0,n:30});
      for(const [a,b] of [[T.ripo-0.12,T.ripo],[T.c1-0.1,T.c1],[T.c2-0.1,T.c2],[T.c3-0.1,T.c3],[T.fr1-0.12,T.fr1],[T.fr2-0.12,T.fr2],[T.fr3-0.12,T.fr3]]) if(t>=a&&t<b) K.panLines(F,{k:0.8,ang:0,n:26});
      if(t>=T.rage&&t<T.arc-0.32) K.speedLines(F,{k:0.45,n:60,r0:0.42,col:'rgba(255,80,60,0.6)'});
      if(t>=T.howl&&t<T.brk-0.15) K.speedLines(F,{k:0.5,n:70,r0:0.4,col:'rgba(255,70,50,0.6)'});
      for(const [c,dir] of SMEAR) if(Math.abs(t-c)<0.05) W.smearFrame(F,dir*0.06);
      if(t>=T.stab&&t<T.stab+0.05) K.flash(F,0.5,'#ffd0c8'); if(t>=T.cut&&t<T.cut+0.06) K.flash(F,0.5,'#ffd0c8');
      if(t>=T.arc+0.1&&t<T.arc+0.2) K.flash(F,0.45,'#ff8a70');
      K.sfxText(F,'CLANG!',VW*0.52,VH*0.3,{t0:T.clash,life:0.5,px:82,rot:-7});
      K.letterbox(F,t<T.face1?1:0);
      K.vignette(F,0.5); } });
})();
