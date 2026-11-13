// 🦇 Meme Lore · FINAL · Part 1 — TRẬN 1: BAT CAT (Meowkatsuki) vs POP CAT + HUH CAT — CẦU TREO · BẢN 2 (13/11/2026, theo kịch bản anh duyệt)
//   Kịch bản: prompts/kich-ban/fin1-tran-phu.md mục 1 (skill viet-kich-ban). Anh tả 13/11: "pop cat bắn liên thanh như minigun, có uy lực · batman lướt đi, lăn lộn trốn siêu nhanh ·
//   thấy 1 chữ Huh cực to về phía mình mới ném phi tiêu ra chặn · vụ nổ, pop vs huh đi ra chỗ vụ nổ · khói tan không thấy batman mà thấy 1 loạt bom bat · huh quay sang huh rồi nổ tung → chuyển cảnh".
//   Nhân quả: 2 cột sáng → Pop + Huh xuống cầu → Bat trên dầm tháp bật chế độ thám tử (khoá mục tiêu + vạch sẵn ĐƯỜNG NẤP qua 3 xe + trụ đèn) → mắt loé, Pop thấy → MINIGUN vòng khói
//   → dầm nát, Bat nhảy xuống lăn / lướt theo đúng đường nấp đã vạch, xe nào vừa nấp là nát sau lưng → khựng sau trụ đèn, Pop thở khói → Huh gồng chữ HUH KHỔNG LỒ bám theo, cày xe, ép Bat ra giữa cầu
//   → Bat quay lại, ném NẮM PHI TIÊU: 1 cái cắm vào HUH nổ, 4 cái chệch cắm đường quanh tâm nổ (đèn đỏ mờ — khán giả kịp thấy) → khói → Pop + Huh hí hửng vào tìm xác
//   → khói tan: trống trơn, chỉ có vòng bom dơi nháy nhanh dần → "huh?" · "pop" → BÙM → vòng khói vụ nổ lao vào máy → qua lỗ sang Ninja vs Berserk.
//   Chiêu chép game: boomerang dơi `_batRangShape`; vòng khói Pop `_popRingDraw` (càng bắn càng nhanh); Huh tích lực rồi chữ HUH bám mục tiêu; bom dơi nháy đỏ → nổ.
(function(){
  if(!window.CineKit || CineKit.films.fin1f2) return;
  const BASE=((document.currentScript&&document.currentScript.src)||'js/film-fin1f2.js').replace(/film-[^\/]*$/,''), V=window.GAME_VERSION?'?v='+GAME_VERSION.build:'';
  for(const [g,f] of [['PIXI_FILTERS_GLSL','vendor/pixi-filters/glsl.js'],['Fin1City','fin1-city.js'],['Fin1Fight','fin1-fight.js']]) if(!window[g]){ try{ const x=new XMLHttpRequest(); x.open('GET',BASE+f+V,false); x.send(); (0,eval)(x.responseText); }catch(e){} }
  const K=CineKit, {seg,lerp,clamp,hash}=K, E=K.EASE, eout=E.eout, ein=E.ein, eio=E.eio, C=K.cam, W=window.Fin1Fight, TAU=Math.PI*2;
  const FX=()=>window.CineKitFx;
  const T={ col:0.3, look:2.4, perch:4.4, eyeB:6.4, scan:7.4, spot:10.4, fire:11.3, beamHit:12.1, land:12.9, car1:13.4, fl1:14.8, fl2:15.15, fl3:15.5, fl4:15.85, pil:16.2, cease:17.8,
    huhC:19.6, huhF:21.0, push:22.0, turn:23.0, throw:23.5, boom:24.1, smoke:25.6, walk:27.4, clear:30.0, ring:30.6, turnH:32.2, huh:32.6, pop:33.2, det:34.0, giant:34.15, hole:34.75, DUR:36.0 };
  const H=120;
  const CITY=Fin1City({seed:5, kind:'bridge', towers:[-900,900], towerH:1400, beams:[520,1050]});
  const theme=t=>CITY.TH_BRIDGE;
  const IMG={ A0:'assets/img/cine/FIN_AKA_BAT.png', AVF:'assets/img/cine/FIN_F2_BV_front.png', AVQ:'assets/img/cine/FIN_F2_BV_q3f.png', AVS:'assets/img/cine/FIN_F2_BV_side.png', AVQB:'assets/img/cine/FIN_F2_BV_q3b.png', AVB:'assets/img/cine/FIN_F2_BV_back.png', AT:'assets/img/cine/FIN_F2_BAT_THROW.png', AG:'assets/img/cine/FIN_F2_BAT_GRAPPLE.png',
    BPE:'assets/img/cine/FIN_F2_BAT_PERCH.png', BPI:'assets/img/cine/FIN_F2_BAT_PILLAR.png', BLA:'assets/img/cine/FIN_F2_BAT_LAND.png', BRO:'assets/img/cine/FIN_F2_BAT_ROLL.png',   // 13/11: ngồi dầm (góc dưới lên) · nép trụ · tiếp đất 3 điểm · lộn tròn
    P0:'assets/avatars/popcat/avatarUrl.webp', P1:'assets/avatars/popcat/attackAvatarUrl.webp', U0:'assets/avatars/huhcat/avatarUrl.webp',
    ...window.FIN1_CITY_IMGS };
  const BVIEW={front:'AVF',q3f:'AVQ',side:'AVS',q3b:'AVQB',back:'AVB'};   // Bat đứng 5 góc (vẽ quay TRÁI)
  const DIR={A0:0,AT:-1,AG:-1,BPE:-1,BPI:-1,BLA:-1,BRO:-1,P0:0,P1:0,U0:0};
  const HT={A0:H*1.12,AT:H*1.0,AG:H*1.15,BPE:H*0.95,BPI:H*1.1,BLA:H*0.8,BRO:H*0.62,P0:H*0.8,P1:H*0.8,U0:H*0.78};
  const has=(F,k)=>!!(F.I&&F.I[k]&&K.prep(F.I[k]));
  // ───────── BỐ TRÍ ─────────
  const BEAM_Y=520+120, LEDGE=[900,BEAM_Y,0], HIGH=[900,1050+120,-40];
  // 🚗 xe bỏ trên cầu + trụ đèn bê tông = ĐƯỜNG NẤP Bat vạch sẵn ở chế độ thám tử
  const CARS=[{x0:280,x1:520,z0:-250,z1:-150,col:'#3b4150',cab:'#1c2028'},{x0:120,x1:420,z0:140,z1:250,col:'#5b3c38',cab:'#2a1d1c',truck:true},{x0:20,x1:220,z0:-10,z1:90,col:'#46404c',cab:'#211d25'}];
  const PIL={x0:180,x1:240,z0:-40,z1:20,y1:280};
  const HIDE=[[610,0,-200],[60,0,195],[120,0,-110],[272,0,-10]];   // sau xe A · ra khỏi gầm xe tải · sau nắp capo xe C · sau trụ đèn
  const RUN=[640,0,30];                     // bị chữ HUH dồn ra giữa mặt cầu trống
  const CEN=[440,0,10];                     // tâm vụ nổ (phi tiêu chặn chữ HUH)
  const HITP=[470,110,25];                  // chỗ phi tiêu đầu cắm vào chữ HUH
  const SPOT=[0.5,2.0,3.6,5.0].map(a=>[CEN[0]+Math.cos(a)*200, CEN[2]+Math.sin(a)*165]);   // 4 phi tiêu chệch = 4 quả bom cắm quanh tâm nổ
  const SPOT2=[[CEN[0]-40,CEN[2]+205],[CEN[0]+215,CEN[2]-20]];                              // + 2 quả Bat gài thêm trong khói (thấy bóng lướt)
  const BOMBS=[...SPOT,...SPOT2];
  // ───────── LỊCH NHÂN VẬT ─────────  [giây, x, ảnh, ease, smear, z, y]
  const AK=[[0,LEDGE[0],'BPE',0,0,LEDGE[2],LEDGE[1]],[T.beamHit,LEDGE[0],'BPE',0,0,LEDGE[2],LEDGE[1]],
    [T.land,700,'BLA','ein',0,-60,0],[T.land+0.12,700,'BRO',0,0,-60,0],[T.car1,HIDE[0][0],'BRO','eout',0,HIDE[0][2],0],[T.car1+0.05,HIDE[0][0],'BLA',0,0,HIDE[0][2],0],
    [T.fl1,HIDE[0][0],'BLA',0,0,HIDE[0][2],0],[T.fl2,HIDE[1][0],'BLA',0,0,HIDE[1][2],0],[T.fl3,HIDE[2][0],'BLA',0,0,HIDE[2][2],0],[T.fl4,HIDE[3][0],'BPI',0,0,HIDE[3][2],0],
    [T.push,HIDE[3][0],'BPI',0,0,HIDE[3][2],0],[T.push+0.4,RUN[0],'A0',0,0,RUN[2],0],[T.throw,RUN[0],'A0',0,0,RUN[2],0],[T.throw+0.02,RUN[0],'AT',0,0,RUN[2],0],[T.boom-0.1,RUN[0],'AT',0,0,RUN[2],0],[T.boom,RUN[0],'A0',0,0,RUN[2],0],[T.DUR,RUN[0],'A0',0,0,RUN[2],0]];
  const PK=[[0,-520,'P0',0,0,-60,0],[T.walk,-560,'P0',0,0,-60,0],[T.clear-0.2,380,'P0','eio',0,-50,0],[T.DUR,380,'P0',0,0,-50,0]];
  const UK=[[0,-640,'U0',0,0,90,0],[T.walk+0.25,-640,'U0',0,0,90,0],[T.clear,500,'U0','eio',0,70,0],[T.DUR,500,'U0',0,0,70,0]];
  const bat=t=>W.track(AK,t), pop0=t=>W.track(PK,t), huh=t=>W.track(UK,t);
  const recoil=t=>t<T.fire?0:t<T.walk?-42*eout(seg(t,T.fire,T.cease)):-42;   // Pop giật lùi dần vì sức bắn
  const pop=t=>{ const p=pop0(t); return Object.assign({},p,{x:p.x+recoil(t)}); };
  const mouthOf=p=>[p.x+30,p.y+60,p.z-20], handOf=b=>[b.x-30,b.y+70,b.z];
  const appear=t=>seg(t,T.col+0.45,T.col+1.1);   // Pop + Huh hiện ra trong cột sáng
  const batA=t=>t>=T.boom+0.35?0:1;               // Bat biến mất trong khói vụ nổ (dây móc vút lên)
  // 🔫 MINIGUN: lịch từng phát vòng khói — nhanh dần (0.15s → 0.065s), nhắm theo Bat nhưng TRỄ 0.3s → luôn trúng chỗ Bat VỪA rời (xe / dầm / trụ)
  const RING_V=1700, FIRE=[]; { let s=T.fire; while(s<T.cease){ FIRE.push(s); s+=lerp(0.15,0.065,seg(s,T.fire,T.fire+2.4)); } }
  const BOXES=[...CARS.map((c,i)=>({...c,y1:c.truck?150:95,id:'car'+i})),{...PIL,id:'pil'}];
  function rayBox(A,B,b){ let t0=0,t1=1; for(const [a,d,lo,hi] of [[A[0],B[0]-A[0],b.x0,b.x1],[A[2],B[2]-A[2],b.z0,b.z1]]){ if(Math.abs(d)<1e-6){ if(a<lo||a>hi) return null; continue; } let u=(lo-a)/d, v=(hi-a)/d; if(u>v)[u,v]=[v,u]; t0=Math.max(t0,u); t1=Math.min(t1,v); if(t0>t1) return null; } return t0; }
  const RINGS=FIRE.map((s,i)=>{ const M=mouthOf(pop(s)); let tg;
    if(s<T.beamHit+0.05) tg=[LEDGE[0]+(hash(i*2.1)-0.5)*90,LEDGE[1]+20+(hash(i*3.7)-0.5)*70,LEDGE[2]+(hash(i*5.3)-0.5)*90];
    else if(s>=T.pil) tg=[HIDE[3][0]+(hash(i*1.3)-0.5)*40,60+hash(i*4.1)*170,HIDE[3][2]+(hash(i*6.1)-0.5)*60];
    else { const b=bat(s-0.3); tg=[b.x+(hash(i*1.9)-0.5)*70,70+hash(i*2.9)*60,b.z+(hash(i*3.3)-0.5)*70]; }
    let f=1, hit=null; if(s>=T.beamHit+0.05) for(const b of BOXES){ const u=rayBox(M,tg,b); if(u!=null&&u<f&&tg[1]<b.y1+20){ f=u; hit=b.id; } }
    const Ept=[lerp(M[0],tg[0],f),lerp(M[1],tg[1],f),lerp(M[2],tg[2],f)], L=Math.hypot(Ept[0]-M[0],Ept[1]-M[1],Ept[2]-M[2]);
    return {s,M,E:Ept,te:s+L/RING_V,hit:hit||(s<T.beamHit+0.05?'beam':'deck'),i}; });
  const hitsOf=id=>RINGS.filter(r=>r.hit===id).map(r=>r.te);
  const DMG={}; for(const b of BOXES) DMG[b.id]=hitsOf(b.id);
  const dmg=(id,t)=>{ let n=0; for(const te of DMG[id]) if(te<=t) n++; return Math.min(1,n/7); };
  // 🅷 chữ HUH KHỔNG LỒ: từ mồm Huh vòng qua xe C (hất văng) → bám Bat → trúng phi tiêu ở HITP lúc T.boom
  const HUH_A=[-600,80,90], HUH_C=[60,200,260];
  const huhPos=t=>{ const u=ein(seg(t,T.huhF,T.boom)), q=1-u; return [q*q*HUH_A[0]+2*q*u*HUH_C[0]+u*u*HITP[0], q*q*HUH_A[1]+2*q*u*HUH_C[1]+u*u*HITP[1], q*q*HUH_A[2]+2*q*u*HUH_C[2]+u*u*HITP[2]]; };
  const KNOCK=T.huhF+0.42;   // lúc chữ HUH cày qua xe C
  const carOff=(i,t)=>i===2&&t>=KNOCK?[60*eout(seg(t,KNOCK,KNOCK+0.5)),0,150*eout(seg(t,KNOCK,KNOCK+0.5))]:(i===0&&t>=T.boom?[40*eout(seg(t,T.boom,T.boom+0.4)),0,-110*eout(seg(t,T.boom,T.boom+0.4))]:[0,0,0]);
  // phi tiêu: [0] cắm vào chữ HUH · [1..4] chệch, cắm xuống mặt đường quanh tâm nổ
  const THR=[{to:HITP,a:T.throw+0.05,b:T.boom},...SPOT.map((sp,k)=>({to:[sp[0],6,sp[1]],a:T.throw+0.05+0.03*k,b:T.boom+0.06+0.05*k,side:k%2?1:-1}))];
  const LATE=[T.smoke+0.9,T.smoke+1.25];   // 2 quả cuối Bat lẻn vào gài trong khói
  const fuseOn=(t,t0,t1)=>{ const left=1-seg(t,t0,t1), per=lerp(0.05,0.3,left); return Math.floor((t-t0)/per)%2===0; };

  // ───────── MÁY QUAY ─────────  (Pop + Huh luôn TRÁI, Bat luôn PHẢI)
  const S=(t0,t1,a,b,ease)=>({t0,t1,a,b:b||a,ease:ease||'eio'});
  const shots=C.seq([
    S(0,T.look,{tx:-580,ty:150,tz:15,dist:760,yaw:-36,pitch:-6,fov:52,roll:-2},{tx:-590,ty:130,tz:15,dist:690,yaw:-38,pitch:-5,fov:52,roll:-2},'lin'),            // 1 toàn góc thấp dọc mặt cầu: 2 cột sáng giáng xuống, Pop + Huh hiện ra
    ...C.pushIn(T.look,{d:T.perch-T.look,tx:-580,ty:70,tz:15,dist:330,dist1:290,yaw:22,pitch:-6,fov:44,ox:-0.1}),                                                    // 2 Pop + Huh ngơ ngác nhìn quanh
    S(T.perch,T.eyeB,{tx:900,ty:690,tz:0,dist:600,yaw:-28,pitch:-22,fov:50},{tx:900,ty:720,tz:0,dist:520,yaw:-30,pitch:-24,fov:50},'lin'),                           // 3 góc giun: Bat ngồi xổm trên dầm tháp, trăng máu sau lưng
    S(T.eyeB,T.scan,{tx:900,ty:BEAM_Y+100,tz:0,dist:130,yaw:-22,pitch:-2,fov:40},{tx:900,ty:BEAM_Y+100,tz:0,dist:112,yaw:-22,pitch:-2,fov:40},'lin'),                 // 4 cực cận mắt Bat nheo lại, loé
    S(T.scan,T.spot,{tx:-150,ty:40,tz:0,dist:1050,yaw:-30,pitch:38,fov:52},{tx:-170,ty:40,tz:0,dist:990,yaw:-28,pitch:38,fov:52},'lin'),                               // 5 CHẾ ĐỘ THÁM TỬ từ trên xuống: khoá mục tiêu + vạch đường nấp
    S(T.spot,T.fire,{tx:-520,ty:72,tz:-60,dist:210,yaw:14,pitch:-10,fov:44,ox:-0.08},{tx:-520,ty:74,tz:-60,dist:190,yaw:14,pitch:-12,fov:44,ox:-0.08},'lin'),          // 6 cận Pop ngẩng lên thấy mắt loé trên tháp, há mồm (lặng)
    S(T.fire,T.beamHit,{tx:-470,ty:85,tz:-60,dist:300,yaw:-62,pitch:-4,fov:50},{tx:-430,ty:90,tz:-60,dist:330,yaw:-66,pitch:-4,fov:50},'lin'),                         // 7 cận Pop chính diện: MINIGUN xả vòng khói, giật lùi
    S(T.beamHit,T.land,{tx:860,ty:520,tz:0,dist:700,yaw:-24,pitch:-20,fov:54},{tx:780,ty:300,tz:0,dist:720,yaw:-22,pitch:-14,fov:54},'ein'),                           // 8 góc giun lên tháp: dầm nát vụn, Bat bật khỏi dầm rơi xuống
    S(T.land,T.fl1,{tx:640,ty:70,tz:-130,dist:430,yaw:-8,pitch:4,fov:52},{tx:560,ty:70,tz:-170,dist:450,yaw:-10,pitch:5,fov:52},'lin'),                              // 9 ngang thấp: Bat lăn tròn, nấp sau xe A — luồng đạn xé nát xe
    S(T.fl1,T.fl2,{tx:330,ty:50,tz:60,dist:560,yaw:-16,pitch:5,fov:56}),                                                                                            // 10 combo: vệt Bat trượt qua gầm xe tải
    S(T.fl2,T.fl3,{tx:120,ty:120,tz:40,dist:420,yaw:16,pitch:-14,fov:56}),                                                                                           // 11 combo: lộn qua nắp capo xe C
    S(T.fl3,T.fl4,{tx:240,ty:60,tz:-20,dist:330,yaw:-40,pitch:4,fov:56}),                                                                                            // 12 combo: trượt vào sau trụ đèn
    S(T.fl4,T.pil,{tx:260,ty:120,tz:180,dist:700,yaw:-8,pitch:6,fov:56}),                                                                                            // 13 combo: xe tải nổ tung sau lưng
    S(T.pil,T.cease,{tx:280,ty:95,tz:-10,dist:300,yaw:-8,pitch:-2,fov:46,ox:0.1},{tx:280,ty:95,tz:-10,dist:280,yaw:-8,pitch:-2,fov:46,ox:0.1},'lin'),            // 14 cận Bat nép lưng sau trụ, bê tông bị rỉa toé ra
    S(T.cease,T.huhC,{tx:-540,ty:80,tz:-40,dist:300,yaw:20,pitch:-4,fov:46},{tx:-540,ty:80,tz:-40,dist:280,yaw:20,pitch:-4,fov:46},'lin'),                           // 15 THỞ: Pop thở hổn hển, mồm bốc khói
    S(T.huhC,T.huhF,{tx:-640,ty:60,tz:90,dist:340,yaw:20,pitch:-10,fov:46,ox:-0.06},{tx:-640,ty:60,tz:90,dist:300,yaw:20,pitch:-12,fov:46,ox:-0.06},'lin'),          // 16 cận Huh từ dưới lên: gồng hết sức, quầng hồng
    S(T.huhF,T.push,{tx:-300,ty:180,tz:120,dist:1150,yaw:-10,pitch:4,fov:54},{tx:120,ty:180,tz:120,dist:1100,yaw:-10,pitch:4,fov:54},'lin'),                          // 17 toàn ngang: chữ HUH khổng lồ cày qua xe C, máy lia theo
    S(T.push,T.turn,{tx:420,ty:100,tz:30,dist:460,yaw:-6,pitch:3,fov:54},{tx:560,ty:100,tz:30,dist:430,yaw:-6,pitch:3,fov:54},'lin'),                                 // 18 Bat bị dồn ra giữa cầu, chữ HUH đuổi sau lưng
    S(T.turn,T.throw,{tx:540,ty:130,tz:30,dist:250,yaw:120,pitch:-4,fov:52,ox:0.15},{tx:540,ty:130,tz:30,dist:235,yaw:120,pitch:-4,fov:52,ox:0.15},'lin'),           // 19 qua vai Bat: chữ HUH lấp kín khung
    S(T.throw,T.boom,{tx:590,ty:90,tz:30,dist:300,yaw:-14,pitch:0,fov:50},{tx:520,ty:100,tz:30,dist:340,yaw:-14,pitch:0,fov:50},'eout'),                              // 20 cận tay Bat vung NẮM PHI TIÊU toả hình quạt
    S(T.boom,T.smoke,{tx:440,ty:200,tz:10,dist:1300,yaw:-10,pitch:6,fov:54},{tx:SPOT[2][0],ty:40,tz:SPOT[2][1],dist:260,yaw:-20,pitch:16,fov:50},'brake'),            // 21 NỔ LỚN toàn → máy lướt xuống 1 phi tiêu cắm đường, đèn đỏ nháy mờ
    S(T.smoke,T.walk,{tx:440,ty:140,tz:10,dist:1100,yaw:-12,pitch:6,fov:52},{tx:440,ty:140,tz:10,dist:1040,yaw:-12,pitch:6,fov:52},'lin'),                           // 22 THỞ: khói đen dày, im ắng
    S(T.walk,T.clear,{tx:-300,ty:80,tz:20,dist:520,yaw:-60,pitch:2,fov:50},{tx:300,ty:80,tz:20,dist:500,yaw:-62,pitch:2,fov:50},'lin'),                               // 23 theo sau Pop + Huh hí hửng đi vào khói tìm xác
    S(T.clear,T.turnH,{tx:CEN[0],ty:40,tz:CEN[2],dist:760,yaw:-12,pitch:44,fov:52},{tx:CEN[0],ty:40,tz:CEN[2],dist:700,yaw:-10,pitch:46,fov:52},'lin'),             // 24 góc chim: khói tan, trống trơn, vòng bom dơi nháy nhanh dần
    S(T.turnH,T.pop,{tx:500,ty:72,tz:70,dist:150,yaw:-12,pitch:-2,fov:42,ox:-0.14},{tx:500,ty:72,tz:70,dist:140,yaw:-12,pitch:-2,fov:42,ox:-0.14},'lin'),            // 25 cận Huh: từ từ quay sang Pop… "huh?"
    S(T.pop,T.det,{tx:380,ty:66,tz:-50,dist:150,yaw:-12,pitch:-2,fov:42,ox:0.14},{tx:380,ty:66,tz:-50,dist:142,yaw:-12,pitch:-2,fov:42,ox:0.14},'lin'),              // 26 cận Pop: quay sang Huh, "pop" khẽ
    S(T.det,T.DUR,{tx:440,ty:80,tz:30,dist:520,yaw:-12,pitch:-4,fov:50}) ]);                                                                                          // 27 BÙM → vòng khói lao vào máy → qua lỗ sang trận kế
  // ───────── TRẬN KẾ (fin1f1, CÔNG VIÊN) trong lỗ vòng khói: Doge + Clapping đi dạo — đúng khung mở đầu fin1f1 ─────────
  // (12/11) Pop + Huh là TRẬN ĐẦU → trong lỗ vòng khói là trận KẾ: Ninja vs Berserk (đại lộ, cùng tham số Fin1City + máy shot đầu fin1f3)
  const PARK=Fin1City({seed:3}), NEXT1={tx:120,ty:150,tz:0,dist:1100,yaw:-34,pitch:-6,fov:52,roll:-2,oy:0};   // = máy shot đầu fin1f1   // oy:0 → ô tròn không tự dời tâm ảnh
  function drawNext(F,t){ PARK.draw(F,t,PARK.TH_NIGHT);
    // khung mở đầu fin1f1: công viên đêm còn TRỐNG, yên lặng — ngay sau đó 2 cột Bifrost giáng xuống (Doge + Clapping truyền tống)
  }
  const ringR=t=>{ const u=seg(t,T.giant,T.hole+0.9); return lerp(30,1500,Math.pow(u,2.4)); };   // bán kính vòng khói khổng lồ TRÊN MÀN HÌNH (px logic)
  const ringC=t=>[480+Math.sin(t*3)*6, 300-40*seg(t,T.giant,T.hole)];
  function panels(t){ if(t<T.giant+0.3) return null; const R=ringR(t)*0.6, [cx,cy]=ringC(t), poly=[];
    for(let i=0;i<40;i++){ const a=i/40*TAU; poly.push([(cx+Math.cos(a)*R)/960,(cy+Math.sin(a)*R)/540]); }
    return [{cam:null, clip:null}, {cam:NEXT1, clip:poly, next:true, theme:PARK.TH_NIGHT}]; }
  // ───────── VẼ CHIÊU (chép từ game) ─────────
  // boomerang dơi `_batRangShape` (toạ độ quanh tâm, sz = cỡ)
  const RANG=[[0.18,-0.3],[0.42,-0.28],[1,-0.05],[0.72,0.02],[0.58,0.24],[0.38,0.1],[0.18,0.3],[0,0.16]];
  function rangPath(g,sz){ g.beginPath(); g.moveTo(0,-0.22*sz); for(const [x,y] of RANG) g.lineTo(x*sz,y*sz); for(let i=RANG.length-2;i>=0;i--) g.lineTo(-RANG[i][0]*sz,RANG[i][1]*sz); g.lineTo(-0.18*sz,-0.3*sz); g.closePath(); }
  function batarang(F,x,y,z,rot,o){ o=o||{}; const P=K.proj(F.B,x,y,z); if(!P) return; const sz=(o.sz||22)*P.s; if(sz<1.5) return;
    F.list.push({d:P.d-6, fn:()=>{ const g=F.g; g.save(); g.translate(P.x,P.y); g.rotate(rot);
      if(!o.stuck){ g.globalAlpha=0.25; g.fillStyle='#000'; g.rotate(-0.35); rangPath(g,sz*1.05); g.fill(); g.rotate(0.35); g.globalAlpha=1; }   // vệt mờ quay
      g.fillStyle='#141218'; g.strokeStyle=o.boom?'#ff5252':'#7e57c2'; g.lineWidth=Math.max(1.2,sz*0.08); g.lineJoin='round'; rangPath(g,sz); g.fill(); g.stroke();
      if(o.boom){ const on=o.on; if(on){ g.globalCompositeOperation='lighter'; const gr=g.createRadialGradient(0,0,0,0,0,sz*0.9); gr.addColorStop(0,'rgba(255,60,60,1)'); gr.addColorStop(0.3,'rgba(255,23,68,0.6)'); gr.addColorStop(1,'rgba(255,0,0,0)'); g.fillStyle=gr; g.fillRect(-sz,-sz,sz*2,sz*2); }
        g.globalCompositeOperation='source-over'; g.fillStyle=on?'#ff1744':'#5d0f16'; g.beginPath(); g.arc(0,0,sz*0.13,0,TAU); g.fill(); }
      g.restore(); }}); }
  // đường bay: từ A tới B, lệch vòng cung sang 1 bên (side ±1 theo trục z = 2 phía) rồi bẻ lái về đích (đúng kiểu ném cặp lệch ±1.15 rad)
  const rangPos=(A,B,u,side,arc)=>{ const k=eio(u); return [lerp(A[0],B[0],k), lerp(A[1],B[1],k)+Math.sin(Math.PI*u)*30, lerp(A[2],B[2],k)+side*Math.sin(Math.PI*Math.min(1,u*1.15))*arc]; };
  // mây khói Pop (`_popCloudSprite`: nhiễu value-noise xám bạc, 4 biến thể)
  const CL=[]; function popCloudSprite(v){ v=((v%4)+4)%4; if(CL[v]) return CL[v]; const N=96, c=K.mk(N,N), g=c.getContext('2d'), id=g.createImageData(N,N), D=id.data;
    const hs2=(i,j)=>{ let n=Math.imul(i,374761393)^Math.imul(j,668265263)^Math.imul(v*131+7,1442695041); n=Math.imul(n^(n>>>13),1274126177); n^=n>>>16; return (n>>>0)/4294967296; };
    const vn=(x,y)=>{ const xi=Math.floor(x), yi=Math.floor(y), xf=x-xi, yf=y-yi, u=xf*xf*(3-2*xf), w=yf*yf*(3-2*yf); const a=hs2(xi,yi), b=hs2(xi+1,yi), cc=hs2(xi,yi+1), d=hs2(xi+1,yi+1); return a+(b-a)*u+(cc-a)*w+(a-b-cc+d)*u*w; };
    for(let y=0;y<N;y++) for(let x=0;x<N;x++){ const nx=x/N*2-1, ny=y/N*2-1, n=0.6*vn(nx*3+5,ny*3+2)+0.4*vn(nx*7+1,ny*7+9), r=Math.hypot(nx,ny)/(0.78+0.22*n), fall=Math.max(0,1-r*r), a=Math.pow(fall,0.9)*(0.7+0.3*n);
      const k=(y*N+x)*4, sh=Math.round(196+26*n); D[k]=sh; D[k+1]=sh+3; D[k+2]=Math.min(255,sh+11); D[k+3]=Math.round(Math.min(1,a)*255); }
    g.putImageData(id,0,0); return CL[v]=c; }
  const DC=[]; function darkCloud(v){ v=((v%4)+4)%4; if(DC[v]) return DC[v]; const s0=popCloudSprite(v), c=K.mk(s0.width,s0.height), x=c.getContext('2d'); x.drawImage(s0,0,0); x.globalCompositeOperation='source-atop'; x.fillStyle='rgba(26,24,30,0.86)'; x.fillRect(0,0,c.width,c.height); return DC[v]=c; }
  const popCloud=(g,v,x,y,r,rot,a)=>{ if(!(a>0.004)||!(r>0.3)) return; g.save(); g.globalAlpha*=Math.min(1,a); g.translate(x,y); g.rotate(rot); g.drawImage(popCloudSprite(v),-r,-r,r*2,r*2); g.restore(); };
  // vòng khói chữ O nhìn ngang (`_popRingDraw`), r/th theo đơn vị thế giới; dir = hướng bay TRÊN MÀN HÌNH; spread 0..1 = đang tan
  function popRing(F,x,y,z,r,th,dirW,a,spread,seed,t){ const P=K.proj(F.B,x,y,z), Q=K.proj(F.B,x+dirW[0],y,z+dirW[2]); if(!P||!Q||a<=0.01) return; const s=P.s, R=r*s, TH=th*s, dir=Math.atan2(Q.y-P.y,Q.x-P.x);
    F.list.push({d:P.d-4, fn:()=>{ const g=F.g, rx=R*0.72, ry=R; g.save(); g.translate(P.x,P.y); g.rotate(dir); g.lineCap='round';
      const ring=(lw,col,al)=>{ g.globalAlpha=al; g.strokeStyle=col; g.lineWidth=lw; g.beginPath(); g.ellipse(0,0,rx,ry,0,0,TAU); g.stroke(); };
      ring(TH*1.45,'rgb(190,196,207)',0.22*a); ring(TH*1.15,'rgb(203,208,218)',0.45*a); ring(TH,'rgb(212,216,225)',0.72*a*(1-spread*0.5)); ring(TH*0.5,'rgb(228,231,237)',0.55*a*(1-spread));
      for(const sy of [-1,1]){ const Rr=TH*0.85, gr=g.createRadialGradient(0,sy*ry,0,0,sy*ry,Rr); gr.addColorStop(0,`rgba(230,233,239,${0.4*a*(1-spread*0.6)})`); gr.addColorStop(1,'rgba(230,233,239,0)'); g.globalAlpha=1; g.fillStyle=gr; g.fillRect(-Rr,sy*ry-Rr,Rr*2,Rr*2); }
      for(let i=0;i<16;i++){ const an=i/16*TAU+t*1.8+seed, w=1+0.1*Math.sin(i*2.3+t*4+seed)+spread*0.25*Math.sin(i*1.7+seed); popCloud(g,i+((seed*7)|0),Math.cos(an)*rx*w*1.08,Math.sin(an)*ry*w*1.08,TH*(0.6+spread*0.8),an+t*0.6,a*(0.55-0.3*spread)); }
      g.restore(); }}); }
  // chữ HUH bay (`p.isHuh`): 3 bóng hồng phía sau + chữ chính trắng viền hồng, quầng hồng, phập phồng
  function huhText(F,x,y,z,vx,vz,t){ for(let tr=3;tr>=1;tr--) W.text3(F,x-vx*tr*0.045,y,z-vz*tr*0.045,'HUH',36-tr*4,{font:'Impact,"Arial Black",sans-serif',weight:'bold',col:'#e91e63',stroke:'rgba(0,0,0,0)',a:0.25/tr+0.15,d:-14+tr});
    const wb=1+Math.sin(t*16)*0.08; W.text3(F,x,y,z,'HUH',36*wb,{font:'Impact,"Arial Black",sans-serif',weight:'bold',col:'#ffffff',stroke:'#e91e63',glow:'#e91e63',d:-16}); }
  // sao choáng quanh đầu
  function stars(F,x,y,z,t){ for(let i=0;i<4;i++){ const an=t*6+i*TAU/4; W.text3(F,x+Math.cos(an)*38,y+Math.sin(an)*8,z+Math.sin(an)*20,'★',16,{col:'#ffe066',stroke:'#4a3a00',d:-10}); } }
  // ───────── VẬT TRÊN CẦU ─────────
  function car(F,c,i,t){ const o=carOff(i,t), d=Math.max(dmg('car'+i,t),i===0&&t>=T.boom?1:0), x0=c.x0+o[0], x1=c.x1+o[0], z0=c.z0+o[2], z1=c.z1+o[2];
    const dk=(hex,k)=>{ const n=parseInt(hex.slice(1),16), f=1-0.55*k; return `rgb(${Math.round((n>>16)*f)},${Math.round(((n>>8)&255)*f)},${Math.round((n&255)*f)})`; };
    const bodyH=c.truck?80:52, cabH=(c.truck?70:42)*(1-0.55*d);
    CITY.box(F,x0,x1,8,bodyH,z0,z1,dk(c.col,d),dk(c.col,d*0.7),'rgba(220,70,50,0.18)');
    if(c.truck) CITY.box(F,x0,x0+90,bodyH,bodyH+cabH,z0+8,z1-8,dk(c.cab,d),dk('#3a3036',d),'rgba(220,70,50,0.15)');
    else CITY.box(F,x0+50,x1-40,bodyH,bodyH+cabH,z0+10,z1-10,dk(c.cab,d),dk('#2c3442',d),'rgba(160,190,230,0.25)');
    if(d>0.45) K.smoke(F,{x:(x0+x1)/2,y:bodyH+cabH,z:(z0+z1)/2,t0:-1,n:5,spread:60,rise:60,life:2.2,size:60,seed:30+i,a:0.35*d,tint:'40,36,40'}); }
  function pillar(F,t){ const d=dmg('pil',t), cut=26*d;   // bê tông mép trái bị rỉa dần
    CITY.box(F,PIL.x0+cut,PIL.x1,0,PIL.y1,PIL.z0,PIL.z1,'#4a464c','#5a565c','rgba(220,70,50,0.2)');
    CITY.box(F,PIL.x0+10,PIL.x1-10,PIL.y1,PIL.y1+14,PIL.z0+8,PIL.z1-8,'#2a2830','#ffdca0',null); }
  function lightPillar(F,x,z,t,col){ const a=seg(t,T.col,T.col+0.15)*(1-seg(t,T.col+0.9,T.col+1.8)); if(a<=0.01) return;
    W.beam(F,[x,0,z],[x,3200,z],70*(1+0.4*Math.sin(t*30)),col,a);
    const pts=[]; for(let i=0;i<=40;i++){ const an=i/40*TAU; pts.push([x+Math.cos(an)*95,2,z+Math.sin(an)*60]); } W.line(F,pts,4,`rgba(${col},${0.9*a})`); }
  function bigHuh(F,x,y,z,vx,vz,t,sz){ for(let tr=3;tr>=1;tr--) W.text3(F,x-vx*tr*0.05,y,z-vz*tr*0.05,'HUH',sz*(1-tr*0.08),{font:'Impact,"Arial Black",sans-serif',weight:'bold',col:'#e91e63',stroke:'rgba(0,0,0,0)',a:0.12/tr+0.06,d:-14+tr});
    const wb=1+Math.sin(t*16)*0.06; W.text3(F,x,y,z,'HUH',sz*wb,{font:'Impact,"Arial Black",sans-serif',weight:'bold',col:'#ffffff',stroke:'#e91e63',glow:'#e91e63',d:-16}); }
  function cracks(F,p,k){ if(k<=0.02) return; for(let i=0;i<7;i++){ const an=i/7*TAU+0.4, L=(60+50*hash(i*3.1))*k, pts=[[p.x,1,p.z]]; let x=p.x, z=p.z;
      for(let j=1;j<=4;j++){ x+=Math.cos(an+(hash(i*7+j)-0.5)*0.8)*L/4; z+=Math.sin(an+(hash(i*9+j)-0.5)*0.8)*L/4*0.7; pts.push([x,1,z]); } W.line(F,pts,2.2,'rgba(10,8,12,0.85)'); } }
  // ───────── THẾ GIỚI ─────────
  function world(F,t){ const pn=F.panel||{}; if(pn.next) return drawNext(F,t);
    const th=theme(t), b0=bat(t), p0=pop(t), u0=huh(t);
    CITY.draw(F,t,th);
    CARS.forEach((c,i)=>car(F,c,i,t)); pillar(F,t);
    lightPillar(F,-520,-60,t,'235,235,255'); lightPillar(F,-640,90,t,'255,150,200');   // cột sáng bạc (Pop) + hồng (Huh)
    // ── Bat
    if(batA(t)>0.5){ const im=has(F,b0.im)?b0.im:'A0', rolling=b0.im==='BRO';
      const fall=W.dash(F,t,T.beamHit+0.12,T.land,[LEDGE[0],LEDGE[1],0],[700,40,-60],{w:22,col:'40,40,60',core:'200,190,230',tail:0.5});   // rơi khỏi dầm = vệt đen
      const fly=[[T.fl1,T.fl2,0,1,15],[T.fl2,T.fl3,1,2,150],[T.fl3,T.fl4-0.05,2,3,20],[T.push,T.push+0.4,3,null,30]].some(([a,b,i,j,yy])=>{ const A=HIDE[i], B=j==null?RUN:HIDE[j];
        if(t<a||t>=b) return false; if(yy>100){ const u=seg(t,a,b), mid=[(A[0]+B[0])/2,yy,(A[2]+B[2])/2]; return W.dash(F,t,a,b,[A[0],30,A[2]],[B[0],30,B[2]],{w:22,col:'40,40,60',core:'200,190,230',tail:0.6})||true; }
        return W.dash(F,t,a,b,[A[0],yy,A[2]],[B[0],yy,B[2]],{w:22,col:'40,40,60',core:'200,190,230',tail:0.6}); });
      if(!fall&&!fly){ const o={key:im,views:im==='A0'?BVIEW:null,dir:DIR[im],x:b0.x,z:b0.z,y:b0.y,h:HT[im]||HT.A0,look:t>=T.push?{x:u0.x-400,z:u0.z}:{x:p0.x,z:p0.z},shadow:b0.y<200,life:{breath:0.6,wind:1.1}};
        if(rolling){ o.lean=-((t-T.land)*900)%360; o.y=HT.BRO*0.2; }
        if(t>=T.car1&&t<T.fl1) o.y=b0.y-4*Math.abs(Math.sin(t*20))*(dmg('car0',t)>0?1:0);   // nép sau xe, rung theo từng phát
        W.actor(F,o); }
      if(t>=T.land&&t<T.car1) K.smoke(F,{x:b0.x,z:b0.z,t0:T.land,n:6,spread:40,rise:20,life:0.7,size:40,seed:12,a:0.4}); }
    // ── Pop: há / ngậm theo từng phát (minigun), giật lùi, mặt đường nứt dưới chân
    let shot=false; for(const s of FIRE) if(t>=s&&t<s+0.045) shot=true;
    const look=t>=T.spot&&t<T.fire;   // ngẩng nhìn mắt loé trên tháp, há mồm
    const panting=t>=T.cease&&t<T.walk;
    W.actor(F,{key:(shot||look)?'P1':'P0',dir:0,flip:t>=T.pop,lean:t>=T.pop?-7*eout(seg(t,T.pop,T.pop+0.3)):(look?-5:0),x:p0.x+(shot?-4:0),z:p0.z,y:p0.y,h:HT.P0*appear(t),
      life:{breath:panting?2.6:0.8,squash:shot?0.18:0}});
    { const pf=pop(Math.min(t,T.cease)); cracks(F,{x:pf.x,z:pf.z},seg(t,T.fire+0.6,T.cease)); }
    if(panting) K.smoke(F,{x:p0.x+30,y:70,z:p0.z-20,t0:T.cease,n:10,spread:20,rise:50,life:1.4,size:24,seed:9,a:0.4,tint:'200,205,215'});
    const tipB=t>=T.walk&&t<T.clear?Math.abs(Math.sin((t-T.walk)*9)):0, frozen=t>=T.ring;
    W.actor(F,{key:'U0',dir:0,x:u0.x,z:u0.z,y:u0.y+tipB*8,h:HT.U0*appear(t),lean:t>=T.turnH?9*eio(seg(t,T.turnH,T.turnH+0.5)):0,life:{breath:frozen?0:(t>=T.huhC&&t<T.huhF)?2.4:0.7}});
    if(t>=T.huhC&&t<T.huhF){ const k=seg(t,T.huhC,T.huhF); K.sparks(F,{x:u0.x,y:40,z:u0.z,t0:T.huhC,n:20,speed:90,life:1.2,seed:71,col:'255,120,180'}); }
    if(t>=T.huh&&t<T.huh+0.9) W.text3(F,u0.x+30,u0.y+120,u0.z,'huh?',13,{font:'Impact,"Arial Black",sans-serif',col:'#ffffff',stroke:'#e91e63',a:1-seg(t,T.huh+0.6,T.huh+0.9)});
    if(t>=T.pop+0.15&&t<T.det) W.text3(F,p0.x-30,p0.y+110,p0.z,'pop',12,{font:'Impact,"Arial Black",sans-serif',col:'#ffffff',stroke:'#ff9800',a:1-seg(t,T.det-0.3,T.det)});
    if(t>=T.ring&&t<T.det) for(const [q,dx] of [[u0,26],[p0,-22]]) W.text3(F,q.x+dx,q.y+95-8*seg(t,T.ring,T.det),q.z,'💧',16,{a:0.9});
    // ── 🔫 vòng khói minigun
    for(const r of RINGS){ const u=t-r.s; if(u<0||t>r.te+0.3) continue; const L=Math.hypot(r.E[0]-r.M[0],r.E[2]-r.M[2])||1, f=Math.min(1,u*RING_V/Math.max(1,Math.hypot(r.E[0]-r.M[0],r.E[1]-r.M[1],r.E[2]-r.M[2])));
      const x=lerp(r.M[0],r.E[0],f), y=lerp(r.M[1],r.E[1],f), z=lerp(r.M[2],r.E[2],f), burst=t>r.te?seg(t,r.te,r.te+0.3):0, grow=1+0.4*Math.min(1,u*RING_V/400);
      popRing(F,x,y,z,26*grow*(1+0.5*burst),10*(1+burst*0.6),[r.E[0]-r.M[0],0,r.E[2]-r.M[2]],1-burst,burst,r.i*1.37,t);
      if(u<0.12) K.smoke(F,{x:r.M[0],y:r.M[1]-10,z:r.M[2],t0:r.s,n:2,spread:24,rise:30,life:0.5,size:22,seed:200+r.i,a:0.4,tint:'200,205,215'});
      if(t>=r.te&&t<r.te+0.35){ const metal=r.hit!=='deck'; K.sparks(F,{x:r.E[0],y:r.E[1],z:r.E[2],t0:r.te,n:metal?10:6,speed:metal?380:220,life:0.35,seed:300+r.i,col:metal?'255,220,160':'200,200,210'});
        if(r.hit.startsWith('car')&&r.i%3===0) K.debris(F,{x:r.E[0],y:r.E[1],z:r.E[2],t0:r.te,n:6,speed:320,life:0.7,size:8,seed:400+r.i,col:'#bfe3ff'});   // kính xe vỡ
        if(r.hit==='pil'||r.hit==='beam') K.debris(F,{x:r.E[0],y:r.E[1],z:r.E[2],t0:r.te,n:5,speed:260,life:0.8,size:12,seed:500+r.i,col:'#6a666c'}); } }
    if(t>=T.fl4&&t<T.fl4+1.2&&FX()) FX().blast(F,{x:270,y:60,z:195,t0:T.fl4,size:300,life:0.9,seed:21});   // xe tải nổ tung sau lưng
    // ── 🅷 chữ HUH khổng lồ
    if(t>=T.huhF&&t<T.boom){ const P=huhPos(t), Q=huhPos(t+0.02); bigHuh(F,P[0],P[1],P[2],(Q[0]-P[0])*50,(Q[2]-P[2])*50,t,lerp(60,175,eout(seg(t,T.huhF,T.huhF+0.4))));
      K.smoke(F,{x:P[0],y:20,z:P[2],t0:t-0.05,n:2,spread:80,rise:20,life:0.6,size:60,seed:(t*40)|0,a:0.3,tint:'160,120,130'}); }
    if(t>=KNOCK&&t<KNOCK+0.8) K.debris(F,{x:120,y:60,z:60,t0:KNOCK,n:18,speed:600,life:0.9,size:16,seed:77,col:'#3a3540'});
    // ── phi tiêu
    THR.forEach((p,k)=>{ if(t<p.a) return; const A=handOf(bat(p.a));
      if(t<p.b){ const u=seg(t,p.a,p.b), q=k===0?[lerp(A[0],p.to[0],u),lerp(A[1],p.to[1],u),lerp(A[2],p.to[2],u)]:rangPos(A,p.to,u,p.side,140); batarang(F,q[0],q[1],q[2],t*30+k,{sz:20,boom:true,on:Math.floor(t*14)%2===0}); }
      else if(k>0&&t<T.det){ const on=t>=T.ring?fuseOn(t,T.ring,T.det):Math.floor(t*1.6+k*0.5)%2===0; batarang(F,p.to[0],5,p.to[2],k*1.1,{sz:22,boom:true,stuck:true,on:on&&(t<T.clear||t>=T.ring||true)}); } });
    LATE.forEach((lt,j)=>{ if(t<lt||t>=T.det) return; const sp=SPOT2[j], on=t>=T.ring?fuseOn(t,T.ring,T.det):Math.floor(t*1.6+j)%2===0; batarang(F,sp[0],5,sp[1],j*2.2,{sz:22,boom:true,stuck:true,on}); });
    // ── 💥 phi tiêu cắm vào HUH: NỔ LỚN
    if(t>=T.boom&&t<T.boom+2.4&&FX()){ FX().blast(F,{x:HITP[0],y:HITP[1],z:HITP[2],t0:T.boom,size:720,life:1.2,seed:44});
      K.debris(F,{x:HITP[0],y:HITP[1],z:HITP[2],t0:T.boom,n:36,speed:1000,life:1.8,size:22,seed:45,col:'#3a3540'}); K.sparks(F,{x:HITP[0],y:HITP[1],z:HITP[2],t0:T.boom,n:30,speed:700,life:0.6,seed:47,col:'233,30,99'}); }
    // ── khói đen vụ nổ: trùm tâm nổ tới lúc tan (gió thổi) — bóng Bat lướt gài 2 quả cuối, dây móc vút lên rồi mất
    if(t>=T.boom+0.1&&t<T.clear+0.55){ const grow=eout(seg(t,T.boom+0.1,T.boom+0.9)), fade=t<T.clear?1:1-seg(t,T.clear,T.clear+0.55), drift=t<T.clear?0:eout(seg(t,T.clear,T.clear+0.55));
      for(let i=0;i<38;i++){ const a=hash(i*3.1)*TAU+t*0.06*(i%2?1:-1), r=(40+340*Math.sqrt(hash(i*5.5)))*(0.3+0.7*grow), x=CEN[0]+Math.cos(a)*r+drift*500, z=CEN[2]+Math.sin(a)*r*0.75, y=20+220*hash(i*7.7)+drift*90, P=K.proj(F.B,x,y,z); if(!P) continue;
        const R=(130+90*hash(i*9.3))*P.s*(0.5+0.5*grow), near=clamp((P.d-120)/500,0.12,1), al=0.95*fade*near*(0.65+0.35*hash(i*2.2));
        F.list.push({d:P.d-1, fn:()=>{ const g=F.g; g.save(); g.globalAlpha=al; for(let j=0;j<3;j++){ const ox=(hash(i*7+j)-0.5)*R*0.7, oy=(hash(i*11+j)-0.5)*R*0.5; g.save(); g.translate(P.x+ox,P.y+oy); g.rotate(i+j*2+t*0.15); const c=darkCloud(i+j), rr=R*(0.75+0.3*hash(i+j*5)); g.drawImage(c,-rr,-rr,rr*2,rr*2); g.restore(); } g.restore(); }}); }
      LATE.forEach((lt,j)=>{ if(t>=lt-0.25&&t<lt+0.2){ const sp=SPOT2[j], u=seg(t,lt-0.25,lt+0.2), P=K.proj(F.B,sp[0]+lerp(-60,60,u),0,sp[1]-10), c=K.prep(F.I.A0); if(P&&c) F.list.push({d:-1e6+1, fn:()=>{ const g=F.g, h=HT.A0*P.s, w=h*c.sw/c.sh; g.save(); g.globalAlpha=0.9*Math.sin(Math.PI*u); g.drawImage(K.tinted(c,'#050407'),P.x-w/2,P.y-h,w,h); g.restore(); }}); } });
      if(t>=T.smoke+1.6&&t<T.smoke+2.0){ const u=seg(t,T.smoke+1.6,T.smoke+1.75); W.line(F,[[CEN[0]+60,100,CEN[2]],[lerp(CEN[0]+60,HIGH[0],u),lerp(100,HIGH[1],u),lerp(CEN[2],HIGH[2],u)]],2.2,'rgba(20,18,24,0.9)'); } }   // dây móc vút lên khỏi khói
    // ── BÙM cuối: 6 quả bom nổ sau lưng vòng khói
    if(t>=T.det){ BOMBS.forEach((sp,i)=>{ const tb=T.det+0.05*i; if(t>=tb&&FX()) FX().blast(F,{x:sp[0],y:40,z:sp[1],t0:tb,size:360,life:1.0,seed:80+i}); }); }
  }
  // ───────── MÀN HÌNH ─────────
  // 🦇 CHẾ ĐỘ THÁM TỬ: khoá 2 mục tiêu + vạch sẵn ĐƯỜNG NẤP qua xe A → gầm xe tải → nắp capo xe C → trụ đèn (vì sao lát nữa Bat lướt đúng đường đó)
  function detective(F,t){ if(t<T.scan||t>=T.spot) return; const g=F.g, VW=F.VW, VH=F.VH, k=seg(t,T.scan,T.scan+0.25)*(1-seg(t,T.spot-0.25,T.spot)), u=seg(t,T.scan,T.spot-0.4);
    g.save(); g.globalCompositeOperation='multiply'; g.fillStyle=`rgba(${Math.round(255-170*k)},${Math.round(255-90*k)},255,1)`; g.fillRect(0,0,VW,VH); g.globalCompositeOperation='source-over';
    g.globalAlpha=0.12*k; g.fillStyle='#bfe3ff'; for(let y=(t*120)%6;y<VH;y+=6) g.fillRect(0,y,VW,1); g.globalAlpha=k;
    const P=(x,y,z)=>K.proj(F.B,x,y,z), br=(p,w,h,col)=>{ if(!p) return; g.strokeStyle=col; g.lineWidth=2; const L=Math.min(w,h)*0.3;
      for(const [sx,sy] of [[-1,-1],[1,-1],[1,1],[-1,1]]){ const x=p.x+sx*w/2, y=p.y+sy*h/2; g.beginPath(); g.moveTo(x-sx*L,y); g.lineTo(x,y); g.lineTo(x,y-sy*L); g.stroke(); } };
    const lab=(x,y,a,b)=>{ g.font='700 11px "Courier New",monospace'; g.fillStyle='#e8f6ff'; g.fillText(a,x,y); g.fillStyle='#7fc8ff'; g.fillText(b,x,y+13); };
    const pp=P(-520,60,-60), hp=P(-640,55,90);
    if(pp){ br(pp,80*pp.s*2,100*pp.s*2,'#9fd8ff'); if(u>0.15) lab(pp.x+60*pp.s,pp.y-60*pp.s,'TARGET: POP CAT','fires faster with every pop'); }
    if(hp){ br(hp,80*hp.s*2,90*hp.s*2,'#9fd8ff'); if(u>0.3) lab(hp.x-170*hp.s-150,hp.y+50*hp.s,'TARGET: HUH CAT','homing shot · 0.5s charge'); }
    if(u>0.45){ CARS.forEach((c,i)=>{ const p=P((c.x0+c.x1)/2,40,(c.z0+c.z1)/2); if(p){ br(p,(c.x1-c.x0)*p.s,90*p.s,'#ffd27f'); } }); const pl=P((PIL.x0+PIL.x1)/2,140,(PIL.z0+PIL.z1)/2); if(pl) br(pl,60*pl.s,280*pl.s,'#ffd27f');
      g.setLineDash([5,6]); g.strokeStyle='rgba(255,210,127,0.95)'; g.lineWidth=2; g.beginPath(); const route=[[LEDGE[0],0,0],...HIDE], n=Math.max(1,Math.floor((u-0.45)/0.55*route.length*4));
      let j=0; for(let a=0;a<route.length-1&&j<n;a++) for(let s=0;s<=4&&j<n;s++,j++){ const f=s/4, q=P(lerp(route[a][0],route[a+1][0],f),4,lerp(route[a][2],route[a+1][2],f)); if(q) (a||s)?g.lineTo(q.x,q.y):g.moveTo(q.x,q.y); } g.stroke(); g.setLineDash([]);
      if(u>0.8) lab(VW*0.04,VH*0.12,'ANALYSIS COMPLETE','cover route: 3 cars · 1 pillar'); }
    g.restore(); }
  // 🌀 vòng khói KHỔNG LỒ lao về máy (vẽ trên màn hình: nhìn thẳng = vòng tròn) — trong lỗ là trận kế (def.panels)
  function giantRing(F,t){ if(t<T.giant) return; const g=F.g, R=ringR(t), [cx,cy]=ringC(t), th=R*0.26;
    if(t>=T.det&&t<T.hole+0.6){ const k=seg(t,T.det,T.det+0.15)*(1-seg(t,T.hole,T.hole+0.6)); g.save(); g.globalCompositeOperation='lighter'; const gr=g.createRadialGradient(cx,cy,R*0.6,cx,cy,R*1.6); gr.addColorStop(0,`rgba(255,170,90,${0.0})`); gr.addColorStop(0.3,`rgba(255,150,70,${0.55*k})`); gr.addColorStop(1,'rgba(255,90,40,0)'); g.fillStyle=gr; g.fillRect(0,0,F.VW,F.VH); g.restore(); }   // bom nổ sau lưng vòng khói
    g.save(); g.lineCap='round';
    for(const [lw,col,al] of [[th*1.45,'190,196,207',0.25],[th*1.15,'203,208,218',0.5],[th,'212,216,225',0.78],[th*0.5,'228,231,237',0.6]]){ g.strokeStyle=`rgba(${col},${al})`; g.lineWidth=lw; g.beginPath(); g.arc(cx,cy,R*0.78,0,TAU); g.stroke(); }
    for(let i=0;i<22;i++){ const an=i/22*TAU+t*1.6, w=1+0.08*Math.sin(i*2.3+t*4); popCloud(g,i,cx+Math.cos(an)*R*0.78*w,cy+Math.sin(an)*R*0.78*w,th*0.75,an+t*0.6,0.5); }
    g.restore(); }
  // 🎵 (13/11 anh chốt: nhạc epic CHẠY DÀI) The Batman 2022 — Giacchino (bản trailer 1:42): đọc từ giây 30 → đoạn cao trào (file 46s+) rơi đúng lúc minigun / chữ HUH;
  //    TẮT PHỤT khi khói tan lộ vòng bom (hài) → chỉ còn tích tắc → nổ. Không lặp file. Âm lượng quy về cùng mức nhạc cũ (-25 LUFS sau vol).
  const BUSY=[T.beamHit,T.land,T.car1+0.3,T.fl1,T.fl2,T.fl3,T.fl4,T.pil+0.3,T.cease+0.1];   // chừa chỗ cho tiếng va chạm chính (không đè 2 tiếng cùng lúc)
  const POPK=FIRE.filter((s,i)=>i===0||BUSY.every(b=>Math.abs(s-b)>0.17)).map((s,i)=>[s,'popcat',i===0?0.85:0.38,null,i===0?'Pop xả MINIGUN vòng khói lên tháp (phát đầu)':'+ minigun: phát pop liên thanh (lớp của loạt bắn)']);
  CineKit.film({ id:'fin1f2', title:'Final 1 · Fight · Bat Cat vs Pop Cat + Huh Cat', DUR:T.DUR, VW:960, VH:540, fadeIn:false, fadeOut:false,   // vào từ cột sáng nổ của fin1c5, ra qua lỗ vòng khói sang fin1f3
    imgs:IMG, cast:['bat','br','pop','huh'],
    sfxOk:{ popcat:'đòn thường của Pop Cat: MỖI phát vòng khói 1 tiếng pop, đúng như game — minigun = cả loạt pop', huh_sample:'Huh bắn HUH + kêu huh? (tiếng của chính nó)', br_boom:'bom dơi: mỗi lần nổ 1 tiếng' },
    sfx:[[0.1,'l2p_rumble',0.4,null,'cầu treo trong đêm, gió trên cầu'],
      [T.col,'cine_impact',0.8,null,'2 cột sáng bạc + hồng giáng xuống mặt cầu'],[T.col+0.05,'l2p_shimmer',0.5,null,'+ vòng ký tự sáng trên mặt đường (lớp của cột sáng)'],
      [T.perch+0.2,'l2p_sub',0.45,null,'lộ Bat ngồi xổm trên dầm tháp, nền trầm'],
      [T.eyeB+0.1,'l2p_chime',0.5,null,'cực cận mắt Bat nheo lại, loé'],
      [T.scan,'ep3_blip',0.6,null,'chế độ thám tử: khoá 2 mục tiêu, vạch đường nấp qua 3 xe + trụ đèn'],
      ...POPK,
      [T.fire+0.02,'se_machdash',0.55,null,'+ lớp gió rít của luồng đạn khói liên thanh'],
      [T.beamHit,'se_wall_break',0.8,null,'luồng đạn đập trúng dầm tháp chỗ Bat ngồi, rỉa nát, thép toé lửa'],
      [T.land,'se_step_in',0.7,null,'Bat rơi xuống mặt cầu, lăn tròn tiếp đất'],
      [T.car1+0.3,'se_glass',0.7,null,'kính xe A vỡ tung, cửa xe móp dần theo từng phát'],
      [T.fl1,'se_whoosh_fast',0.65,null,'Bat vụt qua gầm xe tải'],[T.fl2,'ep3_whoosh',0.5,null,'+ lộn qua nắp capo xe C (lớp của tràng lướt)'],[T.fl3,'se_whoosh_fast',0.45,null,'+ trượt vào sau trụ đèn (lớp của tràng lướt)'],
      [T.fl4,'br_boom',0.7,null,'xe tải bị rỉa nổ tung sau lưng Bat'],
      [T.pil+0.3,'se_rock_break',0.55,null,'bê tông mép trụ đèn bị rỉa toé ra'],
      [T.cease+0.1,'ep3_breath',0.5,null,'Pop ngừng bắn, thở hổn hển, mồm bốc khói'],
      [T.huhC,'l2p_riser',0.55,null,'Huh gồng hết sức, quầng hồng tụ lại'],
      [T.huhF,'huh_sample',1,null,'Huh bắn chữ HUH KHỔNG LỒ bám theo Bat'],[T.huhF+0.03,'kn_boom_low',0.5,null,'+ lớp trầm: tiếng nổ dội khi chữ HUH khổng lồ phóng đi'],
      [KNOCK,'se_wall_break',0.6,null,'chữ HUH cày qua xe C, hất văng'],
      [T.throw,'se_swing_kick',0.6,null,'Bat vung tay ném nắm phi tiêu toả quạt'],
      [T.boom,'br_boom',1,null,'phi tiêu đâm trúng chữ HUH: NỔ LỚN giữa cầu'],[T.boom+0.01,'kn_boom_low',0.6,null,'+ lớp trầm: sóng nổ quét cầu, dây cáp rung'],
      [T.boom+0.5,'ep3_klunk',0.45,null,'+ 4 phi tiêu chệch cắm xuống mặt đường quanh tâm nổ (lớp đuôi của vụ nổ)'],
      [T.smoke+1.6,'bat_grapple',0.5,null,'dây móc vút lên khỏi khói — Bat biến mất'],
      [T.walk+0.2,'se_step_in',0.35,null,'Pop + Huh hí hửng đi vào khói tìm xác'],
      [T.ring,'br_tick',0.6,null,'khói tan: vòng bom dơi nháy nhanh dần chờ nổ, tích tắc — nhạc tắt phụt'],
      [T.huh,'huh_sample',0.55,null,'Huh quay sang Pop, kêu khẽ "huh?"'],[T.pop+0.15,'popcat',0.5,null,'Pop quay sang Huh, đáp khẽ "pop"'],
      [T.det,'br_boom',1,null,'6 quả bom dơi nổ cùng lúc'],
      [T.hole,'l2p_whoosh',0.7,null,'+ máy chui qua lỗ vòng khói của vụ nổ sang trận Ninja vs Berserk']],
    duckAuto:{decisive:[T.boom,T.det]},
    mus:[{src:'assets/audio/mus_batman.m4a',ra:0,rb:T.ring,off:30,vol:0.34,fi:0.8,fo:0.08}],
    theme:t=>theme(t), shots, panels,
    impact:C.negFrames([T.beamHit],0.07,'inv',[T.boom]),
    shake:t=>{ let s=0; const h=(a,amp,d)=>{ if(t>=a&&t<a+d) s=Math.max(s,amp*(1-(t-a)/d)); };
      h(T.col,6,0.5); if(t>=T.fire&&t<T.cease) s=Math.max(s,1.5+1.5*seg(t,T.fire,T.fire+2)); h(T.beamHit,8,0.4); h(T.fl4,7,0.4); h(KNOCK,6,0.4); h(T.boom,18,1.1); h(T.det,20,1.2); return s; },
    world, post(F,t){ const fx={shocks:[]}; if(F.panels) return fx; const sh=(a,x,y,z,rm,d,str)=>{ if(t>=a&&t<a+d){ const u=(t-a)/d; fx.shocks.push({x,y,z,r:20+rm*eout(u),w:26,str:str*(1-u)}); fx.chroma=Math.max(fx.chroma||0,1.5*(1-u)); } };
      sh(T.col,-580,0,15,300,0.5,10); sh(T.huhF,-600,80,90,260,0.4,14); sh(T.boom,HITP[0],HITP[1],HITP[2],700,0.8,28); return fx; },
    screen(F,t){ const g=F.g, VW=F.VW, VH=F.VH;
      detective(F,t); giantRing(F,t);
      if(t>=T.fl1&&t<T.pil) K.speedLines(F,{k:0.3,n:40,r0:0.45});
      if(t>=T.giant&&t<T.hole) K.speedLines(F,{k:0.4*seg(t,T.giant,T.hole),n:60,r0:0.5});
      if(t>=T.boom&&t<T.boom+0.07) K.flash(F,0.5,'#ffe2c8');
      if(t>=T.eyeB+0.1&&t<T.eyeB+0.2) K.flash(F,0.25,'#ffffff');
      K.sfxText(F,'POP POP POP',VW*0.26,VH*0.3,{t0:T.fire+0.2,life:0.8,px:54,rot:-8,col:'#ffd6a0'});
      K.letterbox(F,t>=T.perch&&t<T.scan?0.7:(t>=T.ring&&t<T.det?0.6:0));
      K.vignette(F,t>=T.boom&&t<T.clear?0.7:0.5); } });
})();
