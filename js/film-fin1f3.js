// ⚔️ Meme Lore · FINAL · Part 1 — TRẬN 2: NINJA CAT (Meowkatsuki · Itachi) vs BERSERK CAT (Guts) — ĐẠI LỘ · BẢN 2 (13/11/2026, kịch bản anh duyệt)
//   Kịch bản: prompts/kich-ban/fin1-tran-phu.md mục 2 (skill viet-kich-ban). Anh chê 13/11: "chém nhau mà không có động tác giơ kiếm ra đỡ… làm cẩu thả kinh khủng"
//   + "phần ninja phải linh hoạt cực nhiều tư thế, kamui phải ra sau lưng chém xuống, ber quay lại chém đỡ… xử lý chuẩn".
//   → 32 tư thế GPT (FIN_F3_N_* / FIN_F3_B_*, cùng tỉ lệ trong tấm). MỌI đòn có phản ứng: đỡ (khiên / đỡ trên / đỡ thấp / gạt), né, trúng + bật lùi.
//   Mạch nhân quả: Berserk kéo lê kiếm vào đại lộ → quạ tụ thành Ninja sau lưng → kunai (Berserk dựng kiếm làm khiên) → Ninja nấp sau kunai lao chém → KHOÁ KIẾM, Berserk nhìn thẳng
//   Sharingan (mầm ảo thuật) → hất văng, bổ dọc (Ninja nhảy lùi, mặt đường vỡ, xe lật) → Ninja đáp nóc xe → quét ngang xẻ xe (Ninja dựng kiếm đỡ, văng xuyên kính) → thở →
//   3 nhát (đỡ, đỡ, nhát 3 rạch vai) → Berserk đâm → Mangekyou → xuyên thấu, Kamui nuốt Ninja → xoáy mở TRÊN KHÔNG SAU LƯNG, Ninja lộn ngược CHÉM XUỐNG → Berserk XOAY NGƯỜI CHÉM ĐỠ
//   → Ninja chống tay tiếp đất, tràng 4 đòn đa góc (đỡ trên / đỡ thấp / gạt / trúng ngực) → khựng, Berserk khuỵu → càng mất máu càng điên → 3 nhát bổ, Ninja đỡ từng nhát trượt lùi cày rãnh
//   → gồng kiếm, LƯỚT QUA NHAU → kiếm gãy, đứt người, cả dãy nhà xẻ ngang → hoá quạ: ảo thuật từ lúc khoá kiếm → trời đỏ, 2 mắt Sharingan → Berserk hú, chém vỡ ảo cảnh → công viên trận kế.
(function(){
  if(!window.CineKit || CineKit.films.fin1f3) return;
  const BASE=((document.currentScript&&document.currentScript.src)||'js/film-fin1f3.js').replace(/film-[^\/]*$/,''), V=window.GAME_VERSION?'?v='+GAME_VERSION.build:'';
  for(const [g,f] of [['PIXI_FILTERS_GLSL','vendor/pixi-filters/glsl.js'],['Fin1City','fin1-city.js'],['Fin1Fight','fin1-fight.js']]) if(!window[g]){ try{ const x=new XMLHttpRequest(); x.open('GET',BASE+f+V,false); x.send(); (0,eval)(x.responseText); }catch(e){} }
  const K=CineKit, {seg,lerp,clamp,hash}=K, E=K.EASE, eout=E.eout, ein=E.ein, eio=E.eio, C=K.cam, W=window.Fin1Fight, TAU=Math.PI*2;
  const FX=()=>window.CineKitFx;
  const T={ walk:0.3, crow:3.0, gather:4.0, formed:5.4, draw:6.6, kun:8.4, leap:9.15, clash:9.6, gen:10.1, genE:10.9, off:11.4, wind:11.9, slam:12.6, perch:13.0, sweep:14.0, glass:14.5,
    out:15.0, c0:16.4, c1:17.0, c2:17.6, c3:18.2, thr:19.3, eye:19.4, hit60:20.1, kam:20.4, emerge:21.4, turnB:21.85, plant:22.5, f1:23.0, f2:23.45, f3:23.8, f4:24.65,
    pause:25.0, kneel:25.3, rage:26.6, fr1:29.0, fr2:29.8, fr3:30.6, charge:31.1, read:31.6, cut:32.3 };
  T.crows=T.cut+3.4; T.eye2=T.cut+4.6; T.howl=T.cut+6.8; T.brk=T.cut+8.6; T.fall=T.cut+8.8; T.DUR=T.cut+10.4;
  T.arc=1e9; T.stab=1e9; T.turn=1e9; T.ripo=1e9; T.lock=T.clash; T.land=T.perch;   // mốc của bản cũ không còn dùng (giữ tên cho các hàm dùng chung)
  const H=120;
  const NCX=-140, BCX=-540;   // sau nhát lướt qua nhau: Ninja PHẢI, Berserk TRÁI, quay lưng vào nhau
  const TB=0.42, TSPLIT=0.62, TBLD=1.4;
  const BLD_CUT=[-1800,-1250,-700,-150,400,950,1500];
  const CITY=Fin1City({seed:3, collapse:BLD_CUT.map((x,i)=>({x,z:1500+250*(i%2),t:T.cut+TBLD+0.04*i,r:520,v:9000}))});
  const TH_GENJ=Object.assign({},CITY.TH_RISE,{sky:['#3a0000','#a00606','#ff2414'],fog:'110,4,4',fogRGB:[110,4,4],ground:['70,8,8','58,6,6','24,2,2'],bld:b=>[26+6*b.hue,4,6],
    pano:Object.assign({},CITY.TH_RISE.pano,{glow:'255,40,20'}),tex:Object.assign({},CITY.TH_RISE.tex,{tint:[120,24,22]})});
  const theme=t=>(t>=T.eye2&&t<T.fall)?TH_GENJ:(t>=T.rage)?CITY.TH_RISE:CITY.TH_NIGHT;
  // ───────── ẢNH ─────────  bộ đứng 5 góc (N0/B0 → views) + 32 tư thế GPT 13/11 (vẽ quay TRÁI trừ KNOCK / TUMBLE / CHOP2 quay PHẢI)
  const P3=n=>'assets/img/cine/FIN_F3_'+n+'.png';
  const IMG={ N0:'assets/img/cine/FIN_AKA_NINJA.png', NVF:P3('NV_front'), NVQ:P3('NV_q3f'), NVS:P3('NV_side'), NVQB:P3('NV_q3b'), NVB:P3('NV_back'),
    BVF:P3('BV_front'), BVQ:P3('BV_q3f'), BVS:P3('BV_side'), BVQB:P3('BV_q3b'), BVB:P3('BV_back'), NS:P3('NINJA_SLASH'), B0:P3('BK_GUARD'), BH:P3('BK_HOWL'),
    NJS:'assets/img/ninjacat/NJ_SHARINGAN.webp', ...window.FIN1_CITY_IMGS };
  const NPOSE=['DRAW','THROW','LEAP','DODGE','CROUCH','BLOCK','KNOCK','HSLASH','UPSLASH','STAB','DIVE','TUMBLE','PLANT','FLIP','SLIDE','SPRING'], BPOSE=['DRAG','SHOULDER','SHIELD','OVERHEAD','SWEEP','GUARDHI','GUARDLO','THRUST','PARRY','HITSH','HITCH','TURN','KNEEL','CHARGE','CHOP2','CHOP3'];
  const PH={"N_DRAW":642,"N_THROW":563,"N_LEAP":650,"N_DODGE":468,"N_CROUCH":485,"N_BLOCK":675,"N_KNOCK":460,"N_HSLASH":569,"N_UPSLASH":638,"N_STAB":477,"N_DIVE":650,"N_TUMBLE":554,"N_PLANT":411,"N_FLIP":407,"N_SLIDE":395,"N_SPRING":638,
    "B_DRAG":293,"B_SHOULDER":422,"B_SHIELD":351,"B_OVERHEAD":502,"B_SWEEP":296,"B_GUARDHI":339,"B_GUARDLO":356,"B_THRUST":286,"B_PARRY":382,"B_HITSH":437,"B_HITCH":376,"B_TURN":512,"B_KNEEL":360,"B_CHARGE":348,"B_CHOP2":431,"B_CHOP3":365};   // chiều cao ảnh (cùng tỉ lệ trong tấm)
  const DIR={N0:-1,NS:-1,B0:-1,BH:-1}, HT={N0:H*1.12,NS:H*1.02,B0:H*1.32,BH:H*1.12};
  for(const n of NPOSE){ IMG['N_'+n]=P3('N_'+n); DIR['N_'+n]=(n==='KNOCK'||n==='TUMBLE')?1:-1; HT['N_'+n]=H*1.12*PH['N_'+n]/640; }
  for(const n of BPOSE){ IMG['B_'+n]=P3('B_'+n); DIR['B_'+n]=n==='CHOP2'?1:-1; HT['B_'+n]=H*1.32*PH['B_'+n]/420; }
  const pick=(F,k)=>{ const im=F.I[k]; return (im&&im.complete&&im.naturalWidth)?k:(k[0]==='N'?'N0':'B0'); };
  // ───────── VẬT TRÊN ĐƯỜNG ─────────  xe 1 (bị cú bổ hất lật, rồi bị nhát quét xẻ đôi) · xe 2 bên trái (Ninja đáp lên lúc khựng) · kính cửa hàng · cột đèn (quạ đậu)
  const CAR1={x0:270,x1:500,z0:-90,z1:20}, CAR2={x0:-780,x1:-560,z0:-80,z1:30}, PANE={x:840,z0:-160,z1:140,y1:230}, LAMP=[330,-200];
  // ───────── BIÊN ĐẠO: [giây, x, ảnh, kiểu chuyển, nhoè, z, y] ─────────  Berserk TRÁI · Ninja PHẢI (đổi bên sau Kamui, đổi lại sau nhát lướt qua nhau)
  const NK=[[0,250,'N0',0,0,0,0],[T.draw,250,'N_DRAW'],[T.kun-0.3,250,'N0'],[T.kun,250,'N_THROW'],[T.leap-0.25,250,'N_THROW'],
    [T.leap,40,'N_LEAP','eout',0,0,170],[T.clash,-50,'N_LEAP','ein',1,0,40],[T.clash+0.06,-50,'N_HSLASH',0,0,0,0],[T.off,-45,'N_HSLASH'],[T.off+0.4,120,'N_CROUCH','back'],   // lao chém từ trên → khoá kiếm → bị hất văng
    [T.wind,120,'N0'],[T.slam-0.3,120,'N0'],[T.slam-0.05,260,'N_DODGE','eout',0,0,130],[T.perch,385,'N_CROUCH','ein',0,0,96],                                        // thấy kiếm giơ cao → nhảy lùi, đáp nóc xe lật
    [T.sweep-0.12,385,'N_CROUCH',0,0,0,96],[T.sweep-0.06,385,'N_BLOCK',0,0,0,96],[T.sweep+0.08,405,'N_BLOCK',0,0,0,96],[T.sweep+0.12,430,'N_KNOCK',0,0,0,110],[T.glass,PANE.x,'N_KNOCK','eout',1,0,90],[T.glass+0.25,PANE.x+70,'N_KNOCK','eout',0,0,30],   // dựng kiếm đỡ nhát quét → văng xuyên kính
    [T.out,PANE.x+30,'N0',0,0,0,0],[T.c0,600,'N0','lin'],
    [T.c1-0.14,110,'N_HSLASH'],[T.c1+0.22,105,'N_HSLASH'],[T.c2-0.16,100,'N_UPSLASH'],[T.c2+0.2,100,'N_UPSLASH'],[T.c3-0.14,90,'N_STAB'],[T.c3+0.3,70,'N_STAB','eout'],[T.thr,140,'N0','eio'],[T.hit60,140,'N0'],
    [T.emerge,-170,'N_DIVE',0,0,0,250],[T.turnB,-30,'N_DIVE','ein',1,0,110],[T.turnB+0.05,-30,'N_TUMBLE',0,0,0,130],[T.plant-0.05,-320,'N_TUMBLE','eout',0,0,40],[T.plant,-330,'N_PLANT','ein',0,0,0],   // xoáy nhả ra TRÊN KHÔNG sau lưng → lộn ngược chém xuống → bị hất lộn → chống 1 tay
    [T.f1-0.32,-330,'N_PLANT'],[T.f1-0.3,-200,'N_FLIP','eout',1,0,150],[T.f1,0,'N_FLIP',0,0,0,200],[T.f1+0.25,-170,'N_CROUCH','ein',0,0,0],               // ① lộn qua đầu chém xuống
    [T.f2-0.14,-170,'N_SLIDE','eout',1],[T.f2,-40,'N_SLIDE'],[T.f2+0.15,-60,'N_SLIDE'],                                                                      // ② trượt sát đất chém ngang gối
    [T.f3-0.12,-70,'N_STAB'],[T.f3,-25,'N_STAB','eout',1],[T.f3+0.2,-60,'N_STAB','eout'],                                                                    // ③ vòng sang đâm sườn
    [T.f4-0.42,-60,'N_SPRING',0,0,0,0],[T.f4-0.2,-60,'N_SPRING','eout',0,0,200],[T.f4,-5,'N_LEAP','ein',1,0,90],[T.f4+0.28,-130,'N_CROUCH','eout',0,0,0],      // ④ đạp lên bản kiếm bật cao → chém chéo xuống trúng ngực
    [T.pause+0.45,-650,'N_CROUCH','eio',0,0,96],[T.fr1-0.6,-650,'N_CROUCH',0,0,0,96],[T.fr1-0.3,-380,'N_BLOCK','eout',0,0,0],                                  // khựng trên nóc xe 2 → nhảy xuống đỡ
    [T.fr1,-380,'N_BLOCK'],[T.fr1+0.3,-405,'N_BLOCK','eout'],[T.fr2,-405,'N_BLOCK'],[T.fr2+0.3,-425,'N_BLOCK','eout'],[T.fr3,-425,'N_BLOCK'],[T.fr3+0.35,-440,'N_BLOCK','eout'],   // đỡ từng nhát, trượt lùi xa dần
    [T.charge,-440,'N0'],[T.cut-0.3,-440,'NS'],[T.cut,NCX,'NS','ein',1],[T.DUR,NCX,'NS']];
  const BK=[[0,300,'B_DRAG',0,0,0,0],[T.crow,-200,'B_DRAG','lin'],[T.formed-0.1,-200,'B_DRAG'],[T.formed,-200,'B0'],[T.formed+0.6,-200,'B_SHOULDER'],
    [T.kun-0.12,-200,'B_SHIELD'],[T.kun+0.6,-200,'B_SHIELD'],[T.leap,-200,'B_GUARDHI'],[T.clash+0.2,-185,'B_GUARDHI','back'],[T.off-0.05,-185,'B_GUARDHI'],[T.off,-170,'B_SWEEP','eout'],[T.off+0.35,-150,'B0'],
    [T.wind,-150,'B_OVERHEAD'],[T.slam-0.12,-120,'B_OVERHEAD','eout'],[T.slam,-60,'B_CHOP3','ein',1],[T.slam+0.55,-60,'B_CHOP3'],
    [T.sweep-0.45,-20,'B_CHARGE','eout'],[T.sweep-0.1,150,'B_CHARGE','ein',1],[T.sweep,190,'B_SWEEP'],[T.sweep+0.6,190,'B_SWEEP'],[T.out,190,'B0'],[T.c0,20,'B0','eio'],
    [T.c1-0.1,20,'B_PARRY'],[T.c1+0.2,15,'B_PARRY','eout'],[T.c2-0.1,15,'B_GUARDLO'],[T.c2+0.2,10,'B_GUARDLO','eout'],[T.c3-0.05,10,'B_GUARDHI'],[T.c3+0.05,0,'B_HITSH','eout'],[T.c3+0.8,-30,'B_HITSH','back'],
    [T.thr,-30,'B_CHARGE'],[T.hit60-0.1,-20,'B_CHARGE'],[T.hit60,60,'B_THRUST','ein',1],[T.emerge-0.3,60,'B_THRUST'],[T.emerge-0.2,60,'B0'],
    [T.turnB-0.25,60,'B_TURN'],[T.turnB+0.4,60,'B_TURN'],[T.turnB+0.5,40,'B0'],
    [T.f1-0.1,40,'B_GUARDHI'],[T.f1+0.15,40,'B_GUARDHI'],[T.f2-0.1,40,'B_GUARDLO'],[T.f2+0.15,40,'B_GUARDLO'],[T.f3-0.1,40,'B_PARRY'],[T.f3+0.15,40,'B_PARRY'],[T.f4-0.05,40,'B_GUARDHI'],[T.f4,40,'B_HITCH'],[T.f4+0.4,60,'B_HITCH','back'],
    [T.kneel,60,'B_KNEEL'],[T.rage+0.6,60,'B_KNEEL'],[T.rage+0.7,60,'BH'],[T.fr1-0.6,60,'BH'],
    [T.fr1-0.4,-60,'B_OVERHEAD','eout'],[T.fr1,-140,'B_CHOP3','ein',1],[T.fr2-0.3,-140,'B_OVERHEAD'],[T.fr2,-160,'B_CHOP2','ein',1],[T.fr3-0.3,-160,'B_OVERHEAD'],[T.fr3,-180,'B_CHOP3','ein',1],
    [T.charge,-180,'B_CHARGE'],[T.cut-0.3,-180,'B_CHARGE'],[T.cut,BCX,'B_SWEEP','ein',1],[T.cut+1.2,BCX,'B_SWEEP'],[T.howl-0.4,-300,'B0','eio'],[T.howl,-300,'BH'],[T.brk-0.25,-300,'B_OVERHEAD','eout'],[T.brk,-300,'B_CHOP3','ein',1],[T.DUR,-300,'B_CHOP3']];
  const hs=W.hstop([[T.clash,0.2],[T.slam,0.12],[T.sweep,0.14],[T.c3,0.12],[T.turnB,0.2],[T.f4,0.14],[T.fr3,0.14],[T.cut,0.22],[T.brk,0.14]]);
  const RAGE=[[T.c3,0.25],[T.f4,0.5],[T.rage,1.0],[T.howl,1.6]];
  const rageK=t=>{ let k=0; for(const [a,v] of RAGE) if(t>=a) k=v; return k; };
  // Ninja: hiện dần khi bầy quạ tụ lại · co vào xoáy Kamui rồi nở ra từ xoáy trên không · ẩn trong cửa hàng sau khi văng xuyên kính
  const ninjaS=t=>{ if(t<T.gather+0.6) return 0; if(t<T.formed) return eout(seg(t,T.gather+0.6,T.formed));
    if(t>=T.glass+0.3&&t<T.out) return 0;
    if(t>=T.kam&&t<T.emerge-0.2) return 1-ein(seg(t,T.kam,T.kam+0.45)); if(t>=T.emerge-0.2&&t<T.emerge+0.1) return eout(seg(t,T.emerge-0.2,T.emerge+0.1)); return 1; };
  const bkS=t=>t<0.6?eout(seg(t,0.15,0.6)):1;   // bước ra từ cột sáng đỏ
  // ───────── MÁY QUAY ─────────  máy luôn PHÍA TRƯỚC trục 2 người (yaw −40…40): ai bên trái vẫn bên trái
  const S=(t0,t1,a,b,ease)=>({t0,t1,a,b:b||a,ease:ease||'eio'});
  const shots=C.seq([
    S(0,T.crow,{tx:120,ty:150,tz:0,dist:1100,yaw:-34,pitch:-6,fov:52,roll:-2},{tx:0,ty:130,tz:0,dist:980,yaw:-30,pitch:-5,fov:52,roll:-2},'lin'),                       // 1 cột sáng đỏ, Berserk kéo lê kiếm dọc đại lộ, mũi kiếm toé lửa
    S(T.crow,T.gather,{tx:LAMP[0],ty:300,tz:LAMP[1],dist:300,yaw:-14,pitch:-8,fov:46},{tx:LAMP[0],ty:300,tz:LAMP[1],dist:280,yaw:-14,pitch:-8,fov:46},'lin'),           // 2 quạ đậu cột đèn kêu
    S(T.gather,T.formed,{tx:60,ty:120,tz:0,dist:560,yaw:22,pitch:-4,fov:50},{tx:90,ty:110,tz:0,dist:500,yaw:20,pitch:-4,fov:50},'lin'),                                 // 3 qua vai Berserk: bầy quạ sà xuống tụ thành Ninja
    ...C.pushIn(T.formed,{d:T.draw-T.formed,tx:-200,ty:96,tz:0,dist:260,dist1:235,yaw:24,pitch:-5,fov:42,ox:-0.12}),                                                  // 4 đối mặt: Berserk vác đại kiếm lên vai
    ...C.pushIn(T.draw,{d:T.kun-T.draw,tx:250,ty:100,tz:0,dist:260,dist1:235,yaw:-24,pitch:-5,fov:42,ox:0.12}),                                                       // 5 đối mặt: Ninja rút Kusanagi
    S(T.kun,T.leap-0.15,{tx:20,ty:95,tz:0,dist:640,yaw:-4,pitch:2,fov:48},{tx:10,ty:95,tz:0,dist:620,yaw:-4,pitch:2,fov:48},'lin'),                                     // 6 kunai → Berserk dựng đại kiếm làm khiên, 3 tia lửa
    S(T.leap-0.15,T.gen,{tx:-20,ty:110,tz:0,dist:620,yaw:-6,pitch:2,fov:48},{tx:-110,ty:100,tz:0,dist:360,yaw:-4,pitch:2,fov:48},'brake'),                             // 7 nấp sau kunai lao chém từ trên → Berserk đỡ trên: KHOÁ KIẾM
    S(T.gen,T.genE,{tx:-60,ty:110,tz:0,dist:120,yaw:-20,pitch:0,fov:40}),                                                                                             // 8 (cực cận Sharingan vẽ ở screen) — Berserk nhìn thẳng vào: mầm ảo thuật
    S(T.genE,T.wind,{tx:-80,ty:95,tz:0,dist:420,yaw:6,pitch:2,fov:48},{tx:0,ty:95,tz:0,dist:460,yaw:4,pitch:2,fov:48},'lin'),                                          // 9 Berserk hất văng Ninja bằng sức thô
    S(T.wind,T.perch+0.35,{tx:120,ty:30,tz:-60,dist:1000,yaw:-16,pitch:30,fov:50},{tx:160,ty:30,tz:-60,dist:960,yaw:-14,pitch:30,fov:50},'lin'),                       // 10 góc cao chéo: bổ dọc → Ninja nhảy lùi, đường vỡ hố, xe lật, Ninja đáp nóc xe
    S(T.perch+0.35,T.glass+0.35,{tx:240,ty:100,tz:0,dist:700,yaw:-6,pitch:3,fov:50},{tx:640,ty:100,tz:0,dist:720,yaw:-6,pitch:3,fov:50},'brake'),                     // 11 quét ngang xẻ đôi xe → Ninja dựng kiếm đỡ → văng xuyên kính cửa hàng
    S(T.glass+0.35,T.c0,{tx:780,ty:110,tz:0,dist:420,yaw:-22,pitch:0,fov:48},{tx:700,ty:105,tz:0,dist:400,yaw:-22,pitch:0,fov:48},'lin'),                              // 12 THỞ: kính rơi lả tả, Ninja bước ra phủi áo
    S(T.c0,T.eye,{tx:180,ty:92,tz:0,dist:560,yaw:-6,pitch:2,fov:48},{tx:50,ty:92,tz:0,dist:500,yaw:-6,pitch:2,fov:48},'lin'),                                          // 13 1 shot ngang: 3 nhát — đỡ, đỡ, nhát 3 rạch vai; Berserk lấy đà đâm
    S(T.eye,T.hit60-0.15,{tx:140,ty:110,tz:0,dist:150,yaw:-20,pitch:0,fov:40}),                                                                                       // 14 (cực cận Mangekyou vẽ ở screen) — kích hoạt TRƯỚC khi đòn tới
    S(T.hit60-0.15,T.emerge,{tx:90,ty:100,tz:0,dist:560,yaw:-4,pitch:2,fov:48},{tx:70,ty:100,tz:0,dist:520,yaw:-2,pitch:2,fov:48},'lin'),                              // 15 đại kiếm XUYÊN qua Ninja, Kamui nuốt Ninja, Berserk ngơ ngác
    S(T.emerge,T.plant+0.2,{tx:-60,ty:170,tz:0,dist:520,yaw:24,pitch:-18,fov:52},{tx:-140,ty:120,tz:0,dist:560,yaw:20,pitch:-12,fov:52},'lin'),                        // 16 góc thấp sau lưng Berserk: xoáy mở TRÊN KHÔNG, Ninja lộn ngược chém xuống → Berserk XOAY NGƯỜI chém đỡ → Ninja lộn ra, chống tay
    S(T.plant+0.2,T.f1+0.1,{tx:0,ty:190,tz:0,dist:520,yaw:-10,pitch:26,fov:54}),                                                                                      // 17 combo cao: lộn qua đầu chém — đỡ trên
    S(T.f1+0.1,T.f2+0.05,{tx:-30,ty:30,tz:0,dist:360,yaw:12,pitch:-6,fov:56}),                                                                                        // 18 combo sát đất: trượt chém ngang gối — cắm kiếm đỡ thấp
    S(T.f2+0.05,T.f3+0.05,{tx:0,ty:95,tz:0,dist:330,yaw:-30,pitch:2,fov:54}),                                                                                         // 19 combo nghiêng: đâm sườn — gạt
    S(T.f3+0.05,T.pause+0.4,{tx:-20,ty:150,tz:0,dist:480,yaw:-12,pitch:-16,fov:52},{tx:-30,ty:110,tz:0,dist:520,yaw:-12,pitch:-10,fov:52},'lin'),                      // 20 góc giun: đạp kiếm bật cao → chém chéo trúng ngực
    S(T.pause+0.4,T.rage,{tx:-300,ty:130,tz:0,dist:1050,yaw:-8,pitch:3,fov:50},{tx:-300,ty:130,tz:0,dist:1000,yaw:-8,pitch:3,fov:50},'lin'),                          // 21 KHỰNG: Ninja trên nóc xe 2, Berserk khuỵu, máu nhỏ giọt
    S(T.rage,T.fr1-0.6,{tx:60,ty:135,tz:0,dist:290,yaw:24,pitch:-28,fov:52},{tx:60,ty:140,tz:0,dist:250,yaw:26,pitch:-30,fov:52},'lin'),                                // 22 góc giun: lửa đỏ bốc từ chân, Berserk ngẩng lên gầm
    S(T.fr1-0.6,T.charge,{tx:-200,ty:92,tz:0,dist:560,yaw:-4,pitch:2,fov:50},{tx:-330,ty:92,tz:0,dist:540,yaw:-4,pitch:2,fov:50},'lin'),                              // 23 1 shot ngang lùi theo Ninja: 3 nhát bổ, Ninja đỡ từng nhát, cày rãnh
    S(T.charge,T.read,{tx:-200,ty:80,tz:0,dist:330,yaw:20,pitch:-8,fov:46},{tx:-200,ty:80,tz:0,dist:310,yaw:20,pitch:-8,fov:46},'lin'),                                // 24 Berserk gồng kiếm, hạ thấp người
    S(T.read,T.cut-0.3,{tx:-185,ty:118,tz:0,dist:95,yaw:22,pitch:-2,fov:40,ox:-0.06},{tx:-185,ty:118,tz:0,dist:85,yaw:22,pitch:-2,fov:40,ox:-0.06},'lin'),            // 25 ĐẶC TẢ mắt Berserk loé đỏ
    S(T.cut-0.3,T.cut+0.32,{tx:-340,ty:150,tz:120,dist:760,yaw:-6,pitch:2,fov:56},{tx:-340,ty:150,tz:120,dist:730,yaw:-6,pitch:2,fov:56}),   // (12/11) LƯỚT QUA NHAU (2 vệt, loé ở điểm giao) → hiện ra quay lưng vào nhau, KHỰNG
    S(T.cut+0.32,T.cut+1.4,{tx:NCX,ty:105,tz:0,dist:300,yaw:-14,pitch:0,fov:46,ox:0.1},{tx:NCX,ty:100,tz:0,dist:275,yaw:-14,pitch:0,fov:46,ox:0.1},'lin'),   // cận Ninja: MŨI KIẾM GÃY văng xoay · vạch sáng hiện ngang người → nửa trên trượt
    S(T.cut+1.4,T.cut+2.2,{tx:-340,ty:420,tz:600,dist:2300,yaw:-6,pitch:10,fov:58},{tx:-340,ty:440,tz:600,dist:2200,yaw:-6,pitch:10,fov:58},'lin'),   // toàn cao: CẢ DÃY NHÀ 2 bên đường bị xẻ ngang, đổ sập     // toàn: nhát chém xẻ đôi Ninja + toà nhà phía sau
    S(T.cut+2.2,T.crows,{tx:NCX-10,ty:70,tz:0,dist:320,yaw:-30,pitch:-8,roll:5,fov:50},{tx:NCX-15,ty:62,tz:0,dist:290,yaw:-32,pitch:-8,roll:6,fov:50},'lin'),   // 2 nửa người nằm trên đường — lặng
    S(T.crows,T.eye2,{tx:-380,ty:180,tz:0,dist:720,yaw:-20,pitch:-14,fov:58},{tx:-380,ty:420,tz:0,dist:640,yaw:-20,pitch:-34,fov:60}),         // 2 nửa hoá BẦY QUẠ bay vút lên trời (máy ngước theo)
    S(T.eye2,T.howl,{tx:-392,ty:420,tz:0,dist:620,yaw:-10,pitch:-46,fov:64},{tx:-392,ty:440,tz:0,dist:590,yaw:-10,pitch:-48,fov:64},'lin'),   // THẾ GIỚI ẢO THUẬT: trời đỏ, 2 mắt Sharingan, quạ lượn
    S(T.howl,T.brk-0.25,{tx:-300,ty:135,tz:0,dist:300,yaw:20,pitch:-30,fov:54},{tx:-300,ty:140,tz:0,dist:260,yaw:22,pitch:-32,fov:54},'lin'),   // góc giun: Berserk HÚ lên, hào quang bùng
    S(T.brk-0.25,T.DUR,{tx:-300,ty:105,tz:0,dist:520,yaw:-14,pitch:0,fov:50}) ]);                                                           // chém vỡ ảo cảnh (máy ĐỨNG YÊN, không nghiêng — mảnh kính dời theo máy này)
  // ═════════ KẾT DANG DỞ + CHUYỂN TRẬN (anh biên đạo 11/11) ═════════
  //   Berserk BẮT ĐƯỢC GÓC → chém đứt đôi Ninja cùng 1 toà nhà → 2 nửa rơi xuống thì MẮT SHARINGAN hiện phủ kín bầu trời (dính ẢO THUẬT)
  //   → 2 nửa hoá BẦY QUẠ bay khắp nơi → Berserk HÚ lên bùng hào quang → chém VỠ TAN ảo cảnh thành mảnh kính → sau lớp kính là TRẬN KHÁC (fin1f2: Bat vs Pop + Huh).
  //   Mảnh kính = def.panels: mỗi mảnh 1 ô vẽ lại thế giới ĐÔNG CỨNG ở khung vỡ, dời theo mảnh rơi; ô nền vẽ cảnh mở đầu của fin1f2 (cùng máy quay shot đầu fin1f2 → nối liền).
  const NVIEW={front:'NVF',q3f:'NVQ',side:'NVS',q3b:'NVQB',back:'NVB'}, BVIEW={front:'BVF',q3f:'BVQ',side:'BVS',q3b:'BVQB',back:'BVB'};   // Berserk vác đại kiếm 5 góc (vẽ quay TRÁI)   // 🎥 Ninja đứng thủ 5 góc (vẽ quay TRÁI)
  const CUT_ANG=-0.42;   // đường chém chéo trên màn hình (rad)
  function halves(F,t){ if(t<T.cut||t>=T.crows+0.25) return; const key=pick(F,'NS'), c=K.prep(F.I[key]); if(!c) return; const x=NCX, z=0, P=K.proj(F.B,x,0,z); if(!P) return;
    const h=HT.NS*P.s, w=h*c.sw/c.sh, cx=P.x, cy=P.y-h*0.55, u=seg(t,T.cut+TSPLIT,T.cut+TSPLIT+0.9), fade=1-seg(t,T.crows,T.crows+0.22), lineK=seg(t,T.cut+TB+0.05,T.cut+TSPLIT), broke=t>=T.cut+TB;
    const r=F.B.r, flip=r[0]>0;   // (12/11) mặt nhìn về phía vừa LAO TỚI (phải) — quay lưng với Berserk
    const dx=Math.cos(CUT_ANG), dy=Math.sin(CUT_ANG), nx=-dy, ny=dx;   // pháp tuyến đường chém
    const IX=ix=>P.x-w/2+(ix-c.sx)/c.sw*w, IY=iy=>P.y-h+(iy-c.sy)/c.sh*h, TIP=[IX(0),IY(196),IX(125),IY(252)];   // vùng mũi kiếm (ngoài thân áo → cắt gọn)
    F.list.push({d:P.d-2, fn:()=>{ const g=F.g;
      for(const side of [1,-1]){ g.save(); g.globalAlpha=fade;
        const mv=side>0?{x:-dx*h*0.75*eout(u), y:-dy*h*0.2*eout(u)+Math.min(h*0.5,h*1.4*u*u), rot:-0.4*eout(u)}:{x:dx*h*0.12*u, y:Math.min(h*0.08,h*0.3*u*u), rot:0.16*ein(u)};   // nửa trên TRƯỢT theo đường chém rồi rơi đáp đất · nửa dưới nghiêng đổ
        g.translate(cx+mv.x,cy+mv.y); g.rotate(mv.rot); g.translate(-cx,-cy);
        g.beginPath(); const L=Math.max(w,h)*2; g.moveTo(cx-dx*L,cy-dy*L); g.lineTo(cx+dx*L,cy+dy*L); g.lineTo(cx+dx*L-side*nx*L,cy+dy*L-side*ny*L); g.lineTo(cx-dx*L-side*nx*L,cy-dy*L-side*ny*L); g.closePath(); g.clip();
        if(flip){ g.translate(P.x,0); g.scale(-1,1); g.translate(-P.x,0); }
        if(broke){ g.beginPath(); g.rect(-1e5,-1e5,2e5,2e5); g.rect(TIP[0],TIP[1],TIP[2]-TIP[0],TIP[3]-TIP[1]); g.clip('evenodd'); }   // mũi kiếm đã gãy văng đi
        g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,P.x-w/2,P.y-h,w,h);
        if(flip){ g.translate(P.x,0); g.scale(-1,1); g.translate(-P.x,0); }
        g.globalCompositeOperation='lighter'; g.globalAlpha=fade*lineK; g.strokeStyle=`rgba(255,235,225,${0.9*(1-0.6*u)})`; g.lineWidth=Math.max(2,h*0.018); g.beginPath(); g.moveTo(cx-dx*w*0.7,cy-dy*w*0.7); g.lineTo(cx+dx*w*0.7,cy+dy*w*0.7); g.stroke();   // mép chém sáng
        g.strokeStyle=`rgba(255,90,70,${0.4*(1-0.6*u)})`; g.lineWidth=Math.max(5,h*0.05); g.stroke();
        g.restore(); }
      // 🗡️ MŨI KIẾM GÃY: văng lên xoay tít rồi rơi cắm xuống đường
      if(broke){ const v=t-T.cut-TB, gy=P.y; g.save(); if(flip){ g.translate(P.x,0); g.scale(-1,1); g.translate(-P.x,0); }
        const tw=TIP[2]-TIP[0], th=TIP[3]-TIP[1], fall=Math.min(1,v/0.9), cx0=TIP[0]+tw/2, cy0=TIP[1]+th/2, px=cx0-h*0.55*fall, py=Math.min(gy-th*0.2, cy0-h*0.9*v+h*2.2*v*v);
        g.translate(px,py); g.rotate(py>=gy-th*0.2-0.5?-1.1:-v*11); g.globalAlpha=fade; g.drawImage(c.src,c.sx+(0-c.sx),196,125,56,-tw/2,-th/2,tw,th); g.restore(); }
      if(u>0&&u<0.5){ g.save(); g.globalCompositeOperation='lighter'; g.globalAlpha=(1-u*2)*fade; g.strokeStyle='#ffe8e0'; g.lineWidth=Math.max(2,h*0.02); g.beginPath(); g.moveTo(cx-dx*w,cy-dy*w); g.lineTo(cx+dx*w,cy+dy*w); g.stroke(); g.restore(); } }}); }
  // 🐦‍⬛ bầy quạ (ảo thuật Itachi): nổ ra từ 2 nửa người, vỗ cánh bay tán loạn khắp nơi, có con lao thẳng vào máy; lông vũ đen rơi lả tả
  const CROWS=Array.from({length:70},(_,i)=>{ const a=hash(i*3.1)*TAU, sp=200+420*hash(i*7.3); return {x0:NCX+(hash(i*1.9)-0.5)*40, y0:40+90*hash(i*2.7), vx:Math.cos(a)*sp, vy:420+700*hash(i*5.7), vz:Math.sin(a)*sp-(i%7===0?350:0), s:22+26*hash(i*9.1), ph:hash(i*4.4)*TAU}; });
  function crows(F,t){ if(t<T.crows||t>T.brk+1.2) return; const v=t-T.crows, push=t>=T.howl?seg(t,T.howl,T.howl+0.6):0;
    for(const c of CROWS){ const k=1-Math.exp(-v*1.2), x=c.x0+c.vx*k*1.3+(c.x0+300>0?1:-1)*push*400, y=c.y0+c.vy*k*1.3+v*v*20, z=c.vz*k*1.3, P=K.proj(F.B,x,y,z); if(!P) continue;
      const S=c.s*P.s, fl=Math.sin(v*24+c.ph), hd=Math.atan2(-c.vy,c.vx*(P.x>F.VW/2?1:1));
      F.list.push({d:P.d, fn:()=>{ const g=F.g; g.save(); g.translate(P.x,P.y); g.rotate(Math.atan2(-c.vy*0.4,c.vx)*0.5); if(c.vx<0) g.scale(-1,1); g.fillStyle='#07060a'; crowShape(g,S,Math.abs(fl)); g.restore(); }}); }
    for(let i=0;i<34;i++){ const ph=(v*0.35+hash(i*2.3))%1, x=NCX+(hash(i*5.1)-0.5)*900, y=420-ph*420, z=(hash(i*6.2)-0.5)*500, P=K.proj(F.B,x,y,z); if(!P) continue; const s=Math.max(1,6*P.s);
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

  // 🌉 TRẬN KẾ TIẾP (sau lớp kính vỡ): cảnh mở đầu của fin1f2 — CẦU TREO (cùng tham số Fin1City), Pop + Huh đang đi vào cầu, Bat ngồi trên dầm tháp; cùng máy quay shot đầu fin1f2
  // (12/11) thứ tự mới: Pop+Huh → Ninja vs Berserk → Chud vs Doge: sau lớp kính là CÔNG VIÊN đêm còn trống của fin1f1 (cùng tham số + máy shot đầu fin1f1)
  const CITY2=Fin1City({seed:7, kind:'park'});
  const NEXTCAM={tx:-560,ty:110,tz:-180,dist:900,yaw:-40,pitch:-4,fov:52,roll:-2};
  function drawNext(F,t){ CITY2.draw(F,t,CITY2.TH_PARK); }   // công viên đêm yên lặng — ngay sau đó 2 cột Bifrost giáng xuống
  // mảnh kính: lưới tam giác lệch ngẫu nhiên (tỉ lệ khung 0–1), rơi trễ dần theo khoảng cách tới điểm nứt
  const CRACK=[0.46,0.46];
  const SHARDS=(()=>{ const NX=6, NY=4, P=[]; for(let j=0;j<=NY;j++) for(let i=0;i<=NX;i++){ const ed=i===0||j===0||i===NX||j===NY; P.push([i/NX+(ed?0:(hash(i*7+j*13)-0.5)*0.12), j/NY+(ed?0:(hash(i*11+j*3)-0.5)*0.16)]); }
    const id=(i,j)=>j*(NX+1)+i, out=[]; for(let j=0;j<NY;j++) for(let i=0;i<NX;i++){ const a=P[id(i,j)], b=P[id(i+1,j)], c=P[id(i+1,j+1)], d=P[id(i,j+1)];
      for(const tri of (hash(i+j*9)<0.5?[[a,b,c],[a,c,d]]:[[a,b,d],[b,c,d]])){ const cx=(tri[0][0]+tri[1][0]+tri[2][0])/3, cy=(tri[0][1]+tri[1][1]+tri[2][1])/3;
        out.push({pts:tri, cx, cy, delay:0.32*Math.hypot(cx-CRACK[0],cy-CRACK[1]), vx:(cx-CRACK[0])*0.35+(hash(cx*91)-0.5)*0.08}); } } return out; })();
  const shardPos=(sh,t)=>{ const tau=Math.max(0,t-T.fall-sh.delay); return {dx:sh.vx*tau, dy:0.5*2.4*tau*tau}; };
  let FREEZE=null;
  function panels(t){ if(t<T.fall) return null; if(!FREEZE) FREEZE=Object.assign({},K.camAt(shots,T.fall-1e-4));
    const out=[{cam:NEXTCAM, clip:[[0,0],[1,0],[1,1],[0,1]], next:true, theme:CITY2.TH_PARK}];
    for(const sh of SHARDS){ const {dx,dy}=shardPos(sh,t); if(dy>1.25) continue; out.push({cam:Object.assign({},FREEZE,{ox:(FREEZE.ox||0)+dx, oy:(FREEZE.oy||0)+dy, roll:0}), clip:sh.pts.map(([x,y])=>[x+dx,y+dy]), freeze:true, theme:TH_GENJ}); }
    return out; }

  // ───────── HIỆU ỨNG ─────────
  // vệt chém đúng nhịp: vung trong `pre` giây trước mốc chạm → mờ dần sau mốc
  function slashAt(F,t,t0,x,y,o){ const pre=o.pre||0.16, post=o.post||0.22; if(t<t0-pre||t>t0+post) return;
    K.slash(F,x,y,o.z||0,{ang:o.ang||0,R:o.R||140,span:o.span||150,k:seg(t,t0-pre,t0+0.02),a:1-seg(t,t0+0.02,t0+post),col:o.col||'200,225,255',flip:o.flip}); }
  // 12/11 anh dặn "vũ khí phải va chạm và hướng phải hợp logic": vệt chém / tia lửa / chỗ trúng tính theo VỊ TRÍ THẬT 2 người ĐÚNG lúc ra đòn (trước đặt toạ độ cố định
  //   → sau Kamui đổi bên vẫn chém về phía cũ, vào khoảng không). who: 'N' Ninja chém Berserk · 'B' Berserk chém Ninja
  const at0=t0=>({n:W.track(NK,t0), b:W.track(BK,t0)});
  function strike(F,t,t0,who,o){ const pre=o.pre||0.16, post=o.post||0.22; if(t<t0-pre||t>t0+post) return; const p=at0(t0), A=who==='N'?p.n:p.b, Bt=who==='N'?p.b:p.n, y=o.y||95;
    const PA=K.proj(F.B,A.x,y,A.z||0), PB=K.proj(F.B,Bt.x,y,Bt.z||0); if(!PA||!PB) return; const side=PB.x>=PA.x?1:-1, base=Math.atan2(PB.y-PA.y,PB.x-PA.x)*180/Math.PI;
    const dist=Math.hypot(Bt.x-A.x,(Bt.z||0)-(A.z||0)), R=o.R||Math.max(90,Math.min(dist*1.05,o.Rmax||400));
    K.slash(F,A.x,y,A.z||0,{ang:base+side*(o.tilt||0),R,span:o.span||150,k:seg(t,t0-pre,t0+0.02),a:1-seg(t,t0+0.02,t0+post),col:o.col||'200,225,255',flip:side<0?!o.flip:!!o.flip}); }
  const mid=(t0)=>{ const p=at0(t0); return [(p.n.x+p.b.x)/2,((p.n.z||0)+(p.b.z||0))/2]; };   // điểm 2 lưỡi kiếm gặp nhau
  const CLASHES=[T.clash,T.c1,T.c2,T.turnB,T.f1,T.f2,T.f3,T.fr1,T.fr2,T.fr3,T.sweep];   // kiếm VA kiếm (đỡ): tia lửa + vòng sóng ở ĐIỂM GIỮA 2 người
  const HITS=[[T.c3,'255,90,70'],[T.f4,'255,70,60']];                                    // Ninja chém TRÚNG Berserk (vai · ngực)
  function lightPillar(F,x,z,t,t0,col){ const a=seg(t,t0,t0+0.15)*(1-seg(t,t0+0.8,t0+1.6)); if(a<=0.01) return; W.beam(F,[x,0,z],[x,3200,z],80*(1+0.4*Math.sin(t*30)),col,a);
    const pts=[]; for(let i=0;i<=40;i++){ const an=i/40*TAU; pts.push([x+Math.cos(an)*110,2,z+Math.sin(an)*70]); } W.line(F,pts,4,`rgba(${col},${0.9*a})`); }
  function car(F,c,t,o){ o=o||{}; const dy=o.flip?20:0, col=o.col||'#3e3a44';
    for(const [a,b,dx] of o.halves?[[c.x0,(c.x0+c.x1)/2-6,-o.halves],[(c.x0+c.x1)/2+6,c.x1,o.halves]]:[[c.x0,c.x1,0]]){ const x0=a+dx, x1=b+dx;
      CITY.box(F,x0,x1,8+dy,58+dy,c.z0,c.z1,col,'#4a4652','rgba(220,70,50,0.18)');
      if(o.flip){ for(const wx of [x0+30,x1-60]) for(const wz of [c.z0+6,c.z1-30]) CITY.box(F,wx,wx+30,58+dy,80+dy,wz,wz+24,'#111014','#1c1a20',null); }   // xe lật: 4 bánh chổng lên trời
      else CITY.box(F,x0+40,x1-35,58,98,c.z0+10,c.z1-10,'#1d1c24','#2c3442','rgba(160,190,230,0.25)'); } }
  function pane(F,t){ if(t>=T.glass) return; const P=[[PANE.x,0,PANE.z0],[PANE.x,0,PANE.z1],[PANE.x,PANE.y1,PANE.z1],[PANE.x,PANE.y1,PANE.z0]].map(p=>K.proj(F.B,...p)); if(P.some(p=>!p)) return;
    F.list.push({d:Math.min(...P.map(p=>p.d))-2, fn:()=>{ const g=F.g; g.save(); g.fillStyle='rgba(150,190,230,0.16)'; g.strokeStyle='rgba(220,235,255,0.55)'; g.lineWidth=1.5; g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y)); g.closePath(); g.fill(); g.stroke();
      g.strokeStyle='rgba(255,255,255,0.35)'; g.beginPath(); g.moveTo(lerp(P[0].x,P[1].x,0.2),lerp(P[0].y,P[3].y,0.2)); g.lineTo(lerp(P[0].x,P[1].x,0.45),lerp(P[0].y,P[3].y,0.75)); g.stroke(); g.restore(); }}); }
  function crater(F,t){ if(t<T.slam) return; const k=eout(seg(t,T.slam,T.slam+0.15)), pts=[]; for(let i=0;i<24;i++){ const an=i/24*TAU, r=(70+20*hash(i*3.3))*k; pts.push(K.proj(F.B,120+Math.cos(an)*r*1.4,1,Math.sin(an)*r)); }
    if(pts.some(p=>!p)) return; F.list.push({d:Math.min(...pts.map(p=>p.d))+40, fn:()=>{ const g=F.g; g.save(); g.fillStyle='rgba(12,8,10,0.75)'; g.beginPath(); pts.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y)); g.closePath(); g.fill(); g.restore(); }}); }
  function trench(F,t){ if(t<T.fr1) return; const x1=W.track(NK,Math.min(t,T.fr3+0.35)).x; for(const dz of [-16,16]) W.line(F,[[-380,1,dz],[x1,1,dz]],5,'rgba(14,10,12,0.8)'); }   // 2 rãnh chân Ninja cày trên mặt đường
  function crowsGather(F,t){ if(t<T.crow-0.6||t>=T.formed+0.1) return;
    if(t<T.gather){ const P=K.proj(F.B,LAMP[0],300,LAMP[1]); if(P) F.list.push({d:P.d-1, fn:()=>{ const g=F.g, S=34*P.s; g.save(); g.translate(P.x,P.y-S*0.2); g.scale(-1,1); g.fillStyle='#07060a'; crowShape(g,S,0.15+0.1*Math.sin(t*3)); g.restore(); }}); }
    else for(let i=0;i<26;i++){ const u=seg(t,T.gather+0.03*i%0.5,T.formed-0.1), a=hash(i*3.1)*TAU, r0=500+300*hash(i*5.2), x=250+Math.cos(a)*r0*(1-eio(u)), y=90+(200+200*hash(i*7.7))*(1-eio(u)), z=Math.sin(a)*r0*0.6*(1-eio(u)), P=K.proj(F.B,x,y,z); if(!P||u>=1) continue;
      F.list.push({d:P.d, fn:()=>{ const g=F.g, S=30*P.s*(1-0.5*u); g.save(); g.translate(P.x,P.y); if(Math.cos(a)>0) g.scale(-1,1); g.fillStyle='#07060a'; crowShape(g,S,Math.abs(Math.sin(t*22+i))); g.restore(); }}); } }
  function world(F,t0){ const pn=F.panel||{}; if(pn.next){ F.t=t0; return drawNext(F,t0); } const t=pn.freeze?T.fall-1e-4:t0; F.t=t;
    const th=theme(t), g0=W.track(NK,hs(t)), b0=W.track(BK,hs(t)), rk=rageK(t);
    CITY.draw(F,t,th);
    lightPillar(F,300,0,t,0.0,'255,70,50');
    // cột đèn quạ đậu
    W.line(F,[[LAMP[0],0,LAMP[1]],[LAMP[0],290,LAMP[1]]],6,'#1a171c'); W.line(F,[[LAMP[0],290,LAMP[1]],[LAMP[0]-60,300,LAMP[1]]],4,'#1a171c');
    car(F,CAR1,t,{flip:t>=T.slam+0.1,halves:t>=T.sweep?70*eout(seg(t,T.sweep,T.sweep+0.5)):0}); car(F,CAR2,t,{col:'#3a3f48'}); pane(F,t); crater(F,t); trench(F,t);
    const bk=pick(F,b0.im), nk=pick(F,g0.im), bs=bkS(t), ns=ninjaS(t), bh=(HT[bk]||H)*bs, nh=(HT[nk]||H)*ns;
    // ⚡ vệt (không vẽ người): Ninja lao chém từ trên · Ninja lướt vào 3 nhát · Berserk lao quét · LƯỚT QUA NHAU
    const dashN=W.dash(F,t,T.leap-0.25,T.leap,[250,100,0],[40,170,0],{w:28,col:'170,210,255'})||W.dash(F,t,T.c0+0.15,T.c1-0.14,[600,95,0],[110,95,0],{w:28,col:'170,210,255'});
    const dashB=W.dash(F,t,T.sweep-0.32,T.sweep-0.1,[-20,100,0],[150,100,0],{w:40,col:'255,50,40',core:'90,20,30'});
    const passB=W.dash(F,t,T.cut-0.28,T.cut-0.01,[-180,110,0],[BCX,100,0],{w:46,col:'255,40,30',core:'80,10,20'}), passN=W.dash(F,t,T.cut-0.28,T.cut-0.01,[-440,95,0],[NCX,95,0],{w:30,col:'170,210,255'});
    if(t>=T.cut-0.16&&t<T.cut+0.1){ const P=K.proj(F.B,-330,100,0); if(P) F.list.push({d:P.d-20, fn:()=>{ const g=F.g, k=1-Math.abs((t-(T.cut-0.12))/0.12); if(k<=0) return; g.save(); g.globalCompositeOperation='lighter'; const R=260*P.s*(0.6+k), gr=g.createRadialGradient(P.x,P.y,0,P.x,P.y,R); gr.addColorStop(0,`rgba(255,255,255,${k})`); gr.addColorStop(0.3,`rgba(255,120,90,${0.6*k})`); gr.addColorStop(1,'rgba(255,60,40,0)'); g.fillStyle=gr; g.beginPath(); g.arc(P.x,P.y,R,0,TAU); g.fill(); g.restore(); }}); }
    const bLook=(t>=T.cut&&t<T.howl-0.4)?{x:b0.x-500,z:b0.z}:(t>=T.emerge-0.2&&t<T.turnB-0.25)?{x:b0.x+400,z:0}:{x:g0.x,z:g0.z};   // sau Kamui: còn nhìn chỗ Ninja biến mất (phía trước) → xoay người
    if(bs>0.02&&!dashB&&!passB) W.actor(F,{key:bk,views:bk==='B0'?BVIEW:null,dir:DIR[bk]||-1,x:b0.x,z:b0.z,y:b0.y,h:bh,look:bLook,smear:b0.sm,shadow:b0.y<200,
      aura:rk>0.05?{preset:'haki',k:0.35+0.65*rk,seed:7}:null, white:(t>=T.c3&&t<T.c3+0.06)||(t>=T.f4&&t<T.f4+0.07)?1:0,
      life:{breath:t>=T.kneel&&t<T.rage+0.6?1.6:0.6,wind:0.6,squash:K.squash(hs(t),T.slam,0.35,0.1)}});
    if(ns>0.02&&t<T.cut&&!dashN&&!passN) W.actor(F,{key:nk,views:nk==='N0'?NVIEW:null,dir:DIR[nk]||-1,x:g0.x,z:g0.z,y:g0.y+(HT[nk]||H)*(1-ns)*0.5,h:nh,look:{x:b0.x,z:b0.z},smear:g0.sm,shadow:ns>0.6&&g0.y<150,
      life:{breath:0.5,wind:1.0,squash:K.squash(hs(t),T.perch,0.35,0.1)}});
    crowsGather(F,t);
    K.smoke(F,{x:0,z:300,t0:-0.3,n:12,spread:1700,rise:30,life:3,size:90,seed:1,swirl:0.2,a:0.22,tint:'150,90,80'});
    if(t<T.crow) K.sparks(F,{x:b0.x+150,y:5,z:b0.z,t0:Math.floor(t*8)/8,n:4,speed:180,life:0.3,seed:Math.floor(t*8)+600,col:'255,200,120'});   // mũi kiếm kéo lê toé lửa trên nhựa đường
    // 🗡️ 3 kunai → cắm vào BẢN đại kiếm đang dựng ngang (khiên) → bật ra, tia lửa
    for(let i=0;i<3;i++){ const ts=T.kun+0.04+i*0.06, th2=ts+0.2; if(t<ts||t>=th2+0.5) continue; const y=82+(i-1)*24, z=(i-1)*14, A=[230,110,0], B=[-165,y,z];
      if(t<th2){ const u=seg(t,ts,th2), x=lerp(A[0],B[0],u), yy=lerp(A[1],B[1],u); W.line(F,[[x,yy,z],[x+40,yy+2,z]],4,'#c8ccd6',{glow:'rgba(255,255,255,0.35)'}); }
      else { const v=t-th2; W.line(F,[[B[0]+v*300,y+v*420-v*v*900,z+(i-1)*v*300],[B[0]+18+v*300,y+v*420-v*v*900+6,z+(i-1)*v*300]],4,'#c8ccd6'); if(v<0.1) K.sparks(F,{x:B[0],y,z,t0:th2,n:12,speed:420,life:0.3,seed:70+i,col:'255,230,160'}); } }
    // ⚔️ kiếm va kiếm (đỡ) / chém trúng
    for(const tt of CLASHES) if(t>=tt&&t<tt+0.6){ const [cx,cz]=mid(tt), u=seg(t,tt,tt+0.45), y=tt===T.turnB?150:tt===T.f1?170:tt===T.f2?40:95; K.ring(F,cx,cz,30+200*eout(u),7,0.6*(1-u),'255,210,160');
      K.sparks(F,{x:cx,y,z:cz,t0:tt,n:34,speed:700,life:0.5,seed:(tt*10)|0,col:'255,220,150'}); }
    for(const [tt,col] of HITS) if(t>=tt&&t<tt+0.6){ const v=at0(tt).b; K.sparks(F,{x:v.x,y:tt===T.c3?120:90,z:v.z||0,t0:tt,n:22,speed:520,life:0.45,seed:(tt*13)|0,col}); K.smoke(F,{x:v.x,z:v.z||0,t0:tt,n:6,spread:140,rise:40,life:0.9,size:40,seed:(tt*7)|0,a:0.45}); }
    if(t>=T.turnB&&t<T.turnB+0.7){ const u=seg(t,T.turnB,T.turnB+0.6); K.ring(F,60,0,40+260*eout(u),12,0.6*(1-u),'240,220,200'); K.debris(F,{x:60,y:5,z:0,t0:T.turnB,n:20,speed:600,life:0.9,size:18,seed:91,col:'#4a4246'}); }   // cú đỡ xoay người: mặt đường lõm vòng
    if(t>=T.kneel&&t<T.rage+0.7) for(let i=0;i<3;i++){ const ph=((t-T.kneel)*0.9+i/3)%1; W.line(F,[[60+i*8,70-ph*70,6],[60+i*8,66-ph*70,6]],3,`rgba(160,10,10,${1-ph})`); }   // máu nhỏ giọt
    const bR=170*(1+1.3*rk), bC=rk>0.4?'255,70,50':'230,200,190', nC='210,230,255';
    strike(F,t,T.clash,'N',{tilt:-60,y:150,col:nC,pre:0.14}); strike(F,t,T.clash,'B',{tilt:-30,y:120,Rmax:bR,col:bC});
    strike(F,t,T.slam,'B',{tilt:-70,y:140,R:bR*1.15,span:120,col:bC,pre:0.12});
    strike(F,t,T.sweep,'B',{tilt:-6,y:100,Rmax:bR*1.2,col:bC,pre:0.2});
    strike(F,t,T.c1,'N',{tilt:-10,y:100,col:nC,pre:0.1}); strike(F,t,T.c2,'N',{tilt:35,y:70,col:nC,pre:0.1,flip:true}); strike(F,t,T.c3,'N',{tilt:-30,y:110,col:nC,pre:0.1});
    strike(F,t,T.hit60,'B',{tilt:-4,y:95,Rmax:bR,col:bC,pre:0.16});
    strike(F,t,T.turnB,'N',{tilt:-80,y:200,col:nC,pre:0.14}); strike(F,t,T.turnB,'B',{tilt:-60,y:130,Rmax:bR,col:bC,pre:0.16,flip:true});
    strike(F,t,T.f1,'N',{tilt:-75,y:190,col:nC,pre:0.1}); strike(F,t,T.f2,'N',{tilt:5,y:35,col:nC,pre:0.1}); strike(F,t,T.f3,'N',{tilt:0,y:90,col:nC,pre:0.08}); strike(F,t,T.f4,'N',{tilt:-45,y:150,col:nC,pre:0.12});
    for(const [i,tt] of [T.fr1,T.fr2,T.fr3].entries()) strike(F,t,tt,'B',{tilt:i%2?-55:-70,y:140,Rmax:bR*1.1,col:'255,60,40',pre:0.12});
    if(t>=T.slam&&t<T.slam+1.8){ K.debris(F,{x:120,y:10,z:0,t0:T.slam,n:30,speed:900,life:1.3,size:26,seed:31,col:'#4a4246'}); K.smoke(F,{x:120,z:0,t0:T.slam,n:14,spread:420,rise:120,life:1.6,size:120,seed:32,a:0.55,tint:'130,104,96'});
      if(t<T.slam+0.6){ const u=seg(t,T.slam,T.slam+0.6); K.ring(F,120,0,40+380*eout(u),12,0.55*(1-u),'240,220,200'); } }
    if(t>=T.sweep&&t<T.sweep+1.0) K.sparks(F,{x:385,y:60,z:-35,t0:T.sweep,n:30,speed:600,life:0.6,seed:93,col:'255,200,140'});   // thép xe bị xẻ
    if(t>=T.glass&&t<T.glass+2.4) K.debris(F,{x:PANE.x,y:120,z:0,t0:T.glass,n:40,speed:500,life:2.2,size:12,seed:95,col:'#cfe6ff'});   // kính vỡ rơi lả tả
    if(rk>0.5&&t<T.fall){ K.smoke(F,{x:b0.x,z:b0.z,t0:Math.floor(t*5)/5,n:3,spread:60,rise:160,life:0.9,size:60,seed:Math.floor(t*5)+400,a:0.5*rk,tint:'190,40,30'});
      K.sparks(F,{x:b0.x,y:40,z:b0.z,t0:Math.floor(t*6)/6,n:6,speed:260,life:0.6,seed:Math.floor(t*6)+500,col:'255,120,60'}); }
    // 🌀 KAMUI: ① xuyên thấu (thân xoắn quanh lưỡi kiếm) → ② hút Ninja tại chỗ → ③ xoáy mở TRÊN KHÔNG SAU LƯNG Berserk, nhả Ninja lộn ngược ra
    const KS=H*0.375*1.9;
    W.kamui(F,140,70,0,KS*0.55,seg(t,T.hit60-0.06,T.hit60+0.34),{mode:'phase',angle:3});
    W.kamui(F,140,62,0,KS,seg(t,T.kam-0.05,T.kam+0.6),{dir:1});
    W.kamui(F,-170,250,0,KS,seg(t,T.emerge-0.35,T.emerge+0.25),{dir:-1});
    halves(F,t); crows(F,t); skyEye(F,t);
    slashAt(F,t,T.cut,-330,200,{ang:-24,R:1400,span:150,col:'255,60,40',pre:0.14,post:0.5});
    if(t>=T.cut+TSPLIT+0.05&&t<T.cut+3.2) for(const [i,bx] of BLD_CUT.entries()){ const tb=T.cut+TBLD+0.04*i; if(t<tb) continue; K.debris(F,{x:bx,y:700+200*(i%2),z:1500+250*(i%2),t0:tb,n:18,speed:1300,life:2.2,size:70,seed:140+i,col:'#4d4040'}); K.smoke(F,{x:bx,z:1500+250*(i%2),t0:tb+0.1,n:8,spread:700,rise:700,life:2.4,size:420,seed:150+i,a:0.45,tint:'110,80,66'}); }
    if(t>=T.howl&&t<T.brk){ for(let i=0;i<4;i++){ const ph=((t-T.howl)*1.8+i/4)%1; K.ring(F,-300,0,40+700*ph,16,0.7*(1-ph),'255,70,50'); }
      K.debris(F,{x:-300,y:5,z:0,t0:T.howl,n:30,speed:700,life:1.2,size:20,seed:131,col:'#4a3f44',dir:90,cone:120}); }
    slashAt(F,t,T.brk,-330,150,{ang:-30,R:700,span:160,col:'255,80,60',pre:0.12,post:0.3});
  }
  // 👁️ CỰC CẬN MẮT MANGEKYOU (ảnh Sharingan của game) — nền đen, đồng tử xoay, quầng đỏ, vệt loé
  function eyeFX(F,t){ const A=t>=T.eye&&t<T.hit60-0.15?[T.eye,T.hit60-0.15]:t>=T.gen&&t<T.genE?[T.gen,T.genE]:null; if(!A) return; const g=F.g, VW=F.VW, VH=F.VH, u=seg(t,A[0],A[1]), im=F.I.NJS;
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
  const SMEAR=[[T.leap+0.1,-1],[T.hit60-0.04,1],[T.turnB-0.04,1],[T.f4-0.04,-1]];
  // 🎵 (13/11 anh chốt: nhạc anime CHẠY DÀI, theme mỗi bài 1 lần) mở đầu KHÔNG nhạc (gió, quạ) → Kokuten (Naruto Shippuden) từ cú kunai
  //    → Berserk nổi điên: Forces (Berserk 1997, Susumu Hirasawa) → LẶNG 0.5s trước nhát lướt qua nhau → ảo thuật: Senya (theme Itachi) tới hết. Âm lượng quy về -25 LUFS.
  CineKit.film({ id:'fin1f3', title:'Final 1 · Fight · Ninja Cat vs Berserk Cat', DUR:T.DUR, VW:960, VH:540, fadeIn:false, fadeOut:false,
    imgs:IMG, cast:['ninja','nj','bk'],
    sfx:[[0.25,'l2p_rumble',0.45,null,'đại lộ đổ nát, gió bụi'],[0.05,'cine_impact',0.8,null,'cột sáng đỏ giáng xuống giữa đại lộ'],
      [0.9,'se_gogogo',0.3,2.0,'Berserk bước ra kéo lê đại kiếm, mũi kiếm cào đường toé lửa'],
      [T.crow,'fin_crow_caw',0.8,null,'quạ đậu cột đèn kêu, Berserk liếc'],
      [T.gather,'fin_crow_fly',0.9,null,'cả đàn quạ sà xuống tụ thành Ninja sau lưng'],
      [T.draw,'ep3_shine',0.5,null,'Ninja rút Kusanagi, lưỡi kiếm loé'],
      [T.kun,'ninja_kunai',0.8,null,'Ninja ném 3 kunai'],[T.kun+0.25,'ep3_klunk',0.6,null,'+ 3 kunai cắm vào bản đại kiếm dựng làm khiên, bật ra (lớp của cú ném)'],
      [T.leap-0.2,'se_step_in',0.8,null,'Ninja nấp sau loạt kunai, đạp đất bật lên lao chém từ trên'],
      [T.clash,'se_sword_clash',1,null,'Berserk giơ kiếm đỡ trên: 2 lưỡi kiếm va nhau, khoá kiếm'],[T.clash+0.01,'kn_boom_low',0.55,null,'+ lớp trầm: sóng xung kích bùng ra từ cú va kiếm'],
      [T.gen,'l2p_chime',0.7,null,'mặt sát mặt: Berserk nhìn thẳng vào mắt Sharingan (mầm ảo thuật)'],
      [T.off,'se_pushback',0.75,null,'Berserk dồn sức thô hất văng Ninja, Ninja trượt lùi'],
      [T.slam-0.6,'se_big_slash',0.85,null,'Berserk bổ đại kiếm thẳng xuống (đỉnh tiếng đúng lúc chạm đất)'],
      [T.slam,'se_rock_break',0.9,null,'đại kiếm đập vỡ mặt đường thành hố chỗ Ninja vừa đứng'],[T.slam+0.12,'se_wall_break',0.55,null,'+ ô tô cạnh hố bị hất lật (lớp của cú bổ)'],
      
      [T.sweep-0.6,'se_big_slash',0.8,null,'+ Berserk lao tới quét ngang đại kiếm (lớp đầu của nhát quét)'],
      [T.sweep,'se_sword_clash',0.9,null,'Ninja dựng kiếm đỡ nhát quét, kiếm va kiếm, xe bị xẻ đôi'],
      [T.glass,'se_glass',1,null,'+ Ninja bị đánh văng xuyên kính cửa hàng, kính vỡ tung (lớp đuôi của cú đỡ)'],
      [T.c1,'se_katana_a',0.85,null,'Ninja chém nhát 1, Berserk gạt bằng bản kiếm (va kiếm)'],
      [T.c2,'se_katana_b',0.8,null,'+ chém hất nhát 2, Berserk cắm kiếm đỡ thấp, va kiếm (lớp của tràng 3 nhát)'],
      [T.c3,'se_slash',1,null,'nhát 3 lách qua, chém trúng rạch vai Berserk'],[T.c3+0.01,'kn_punch_heavy',0.5,null,'+ lớp thịt nhát chém trúng vai'],
      [T.eye,'nj_sharingan',1,null,'cực cận mắt Mangekyou Sharingan loé, Kamui kích hoạt'],
      [T.hit60-0.45,'se_machdash',0.7,null,'+ Berserk lao tới đâm kết liễu (lớp đầu của cú đâm xuyên)'],[T.hit60-0.1,'ep3_whoosh',0.7,null,'+ đại kiếm đi xuyên qua người Ninja như không khí (lớp của cú đâm)'],
      [T.kam,'ep3_kamui',0.9,null,'xoáy Kamui nuốt Ninja'],
      [T.emerge-0.3,'ninja_sub',0.6,null,'+ xoáy mở trên không sau lưng Berserk, Ninja lộn ngược lao xuống (lớp của Kamui)'],
      [T.turnB,'se_sword_clash',1,null,'Berserk xoay người chém đỡ: 2 lưỡi va trên đầu, mặt đường lõm'],[T.turnB+0.01,'kn_punch_heavy',0.6,null,'+ lớp trầm cú va kiếm trên đầu'],
      [T.f1,'se_katana_a',0.8,null,'lộn qua đầu chém xuống, Berserk đỡ trên (va kiếm)'],
      [T.f2,'se_katana_b',0.75,null,'+ trượt sát đất chém gối, Berserk cắm kiếm đỡ thấp (lớp của tràng đòn)'],
      [T.f3,'se_sword_clash',0.6,null,'+ đâm sườn, Berserk gạt văng (lớp của tràng đòn)'],
      [T.f4,'se_slash',1,null,'đạp kiếm bật cao chém chéo xuống, trúng ngực Berserk'],[T.f4+0.01,'kn_punch_heavy',0.55,null,'+ lớp thịt nhát chém trúng ngực'],
      [T.kneel,'ep3_breath',0.5,null,'Berserk khuỵu 1 gối thở dốc, máu nhỏ giọt'],
      [T.rage,'cine_haki',0.8,null,'Berserk nổi điên: lửa đỏ bốc từ chân lên'],
      [T.fr1,'se_sword_clash',0.85,null,'bổ nhát 1, Ninja giơ kiếm đỡ, trượt lùi'],[T.fr1+0.02,'kn_punch_heavy',0.45,null,'+ lớp trầm nhát bổ 1'],
      [T.fr2,'se_sword_clash',0.85,null,'bổ nhát 2, Ninja đỡ, bị đẩy xa hơn, chân cày rãnh'],
      [T.fr3,'se_sword_clash',0.95,null,'bổ nhát 3, kiếm Ninja rung bần bật, đỡ lùi sát'],[T.fr3+0.02,'kn_punch_heavy',0.5,null,'+ lớp trầm nhát bổ 3'],
      [T.read-0.12,'ep3_shine',0.5,null,'đặc tả mắt Berserk loé đỏ, gồng kiếm'],
      [T.cut-0.6,'se_big_slash',1,null,'Berserk vung đại kiếm chém'],
      [T.cut-0.28,'se_machdash',0.8,null,'+ 2 con hoá vệt lao vượt qua nhau (lớp đầu của nhát chém)'],[T.cut-0.12,'se_super_hit',1,null,'2 lưỡi kiếm va nhau ở điểm giao (chém), loé'],
      [T.cut+TB,'se_katana_b',0.9,null,'+ kiếm Ninja gãy đôi, mũi kiếm văng xoay tít (lớp của nhát chém)'],[T.cut+TSPLIT,'cine_flesh',0.7,null,'+ Ninja đứt ngang người, nửa trên trượt đổ (lớp của nhát chém)'],
      [T.cut+TBLD,'cine_heavy_slow',0.8,null,'+ cả dãy nhà hai bên đường bị xẻ ngang đổ sập (lớp đuôi của nhát chém)'],
      [T.crows,'fin_crow_fly',1,null,'2 nửa người hoá bầy quạ vỗ cánh bay tán loạn'],[T.crows+0.4,'fin_crow_caw',0.8,null,'+ quạ kêu giữa bầy quạ bay'],
      [T.eye2,'l2p_shimmer',0.8,null,'mắt Sharingan khổng lồ hiện phủ kín bầu trời (ảo thuật)'],
      [T.howl,'bk_howl',1,null,'Berserk gầm thét hú lên, hào quang bùng nổ'],
      [T.brk,'se_glass',1,null,'nhát chém làm ảo cảnh nứt toác như mặt kính'],
      [T.fall,'l2p_shatter',0.9,null,'ảo cảnh vỡ tan thành mảnh kính rơi, lộ ra trận khác']],
    duckAuto:{decisive:[T.clash,T.turnB,T.cut]},
    mus:[{src:'assets/audio/mus_kokuten.m4a',ra:T.kun-0.2,rb:T.rage+0.3,off:0.9,vol:0.3,fi:0.4,fo:0.8},
      {src:'assets/audio/mus_forces.m4a',ra:T.rage,rb:T.cut-0.5,off:2.0,vol:0.25,fi:0.5,fo:0.12},
      {src:'assets/audio/mus_senya.m4a',ra:T.crows-0.3,rb:T.DUR,off:0.3,vol:0.33,fi:0.8,fo:1.5}],
    theme:t=>theme(t), shots,
    impact:C.negFrames([],0.07,'inv',[T.clash,T.turnB,T.cut-0.12]),
    shake:t=>{ let s=0; const h=(a,amp,d)=>{ if(t>=a&&t<a+d) s=Math.max(s,amp*(1-(t-a)/d)); };
      h(0.05,8,0.5); h(T.clash,12,0.5); h(T.slam,14,0.6); h(T.sweep,8,0.4); h(T.glass,6,0.4); h(T.c3,6,0.3); h(T.turnB,12,0.5); h(T.f4,7,0.3); h(T.fr1,6,0.3); h(T.fr2,7,0.3); h(T.fr3,8,0.4); h(T.cut,18,0.8); h(T.brk,10,0.4);
      if(t>=T.howl&&t<T.brk) s=Math.max(s,4+3*seg(t,T.howl,T.howl+0.5)); if(t>=T.fall) s=0;
      if(t>=T.rage&&t<T.fr1-0.6) s=Math.max(s,1.5+2*seg(t,T.rage,T.fr1-0.6)); return s; },
    world, panels, post(F,t){ const fx={shocks:[]}; if(t>=T.fall) return fx; const sh=(a,x,y,rm,d,str)=>{ if(t>=a&&t<a+d){ const u=(t-a)/d; fx.shocks.push({x,y,z:0,r:20+rm*eout(u),w:26,str:str*(1-u)}); fx.chroma=Math.max(fx.chroma||0,1.5*(1-u)); } };
      sh(T.clash,-110,110,420,0.6,26); sh(T.slam,120,20,520,0.7,24); sh(T.turnB,30,150,420,0.6,26); sh(T.cut,-330,90,520,0.7,30); sh(T.howl,-300,90,700,1.0,26);
      if(t>=T.rage&&t<T.fr1-0.6){ fx.chroma=Math.max(fx.chroma||0,0.8); } return fx; },
    screen(F,t){ const g=F.g, VW=F.VW, VH=F.VH; F.t=t;
      if(t>=T.cut+TBLD-0.04&&t<T.cut+TBLD+0.7){ const u=seg(t,T.cut+TBLD-0.04,T.cut+TBLD+0.08), f=1-seg(t,T.cut+TBLD+0.15,T.cut+TBLD+0.7), y0=VH*0.47, y1=VH*0.33, xe=VW*u;
        g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round';
        for(const [lw,col,al] of [[26,'255,50,30',0.35],[10,'255,120,90',0.7],[3,'255,250,245',1]]){ g.strokeStyle=`rgba(${col},${al*f})`; g.lineWidth=lw; g.beginPath(); g.moveTo(0,y0); g.lineTo(xe,y0+(y1-y0)*(xe/VW)); g.stroke(); }
        g.restore(); }
      eyeFX(F,t); endFX(F,t); if(C) C.wipeBlob(F,t,T.eye2-0.1,0.2,'#a00000');
      if(t>=T.leap-0.25&&t<T.clash) K.panLines(F,{k:0.5,ang:0,n:20});
      if(t>=T.hit60-0.45&&t<T.hit60) K.panLines(F,{k:0.5,ang:0,n:20});
      if(t>=T.plant+0.2&&t<T.f4) K.speedLines(F,{k:0.3,n:40,r0:0.45});
      if(t>=T.rage&&t<T.fr1-0.6) K.speedLines(F,{k:0.35,n:50,r0:0.45,col:'rgba(255,80,60,0.5)'});
      if(t>=T.howl&&t<T.brk-0.25) K.speedLines(F,{k:0.45,n:60,r0:0.42,col:'rgba(255,70,50,0.55)'});
      for(const [c,dir] of SMEAR) if(Math.abs(t-c)<0.04) W.smearFrame(F,dir*0.05);
      if(t>=T.f4&&t<T.f4+0.05) K.flash(F,0.3,'#ffd0c8'); if(t>=T.cut&&t<T.cut+0.06) K.flash(F,0.4,'#ffd0c8');
      K.sfxText(F,'CLANG!',VW*0.52,VH*0.3,{t0:T.clash,life:0.7,px:82,rot:-7}); K.sfxText(F,'CLANG!',VW*0.45,VH*0.22,{t0:T.turnB,life:0.6,px:70,rot:6});
      K.letterbox(F,t<T.crow?1:0);
      K.vignette(F,0.5); } });
})();
