// 🦇 Meme Lore · FINAL · Part 1 — TRẬN PHỤ 2: BAT CAT (Meowkatsuki, áo Akatsuki) vs POP CAT + HUH CAT — TẦM XA, TRÊN CẦU TREO (11/11 → dựng lại 12/11/2026)
//   ANH DẶN 11/11: Bat Cat = BATMAN → thể hiện SỰ THÔNG MINH: cài bẫy, gài bom, "có thời gian chuẩn bị là xử lý hết" · trận KẾT DANG DỞ, chuyển trận bằng 1 pha có câu chuyện.
//   12/11: anh chê trận phụ rush / đau mắt / tiếng lộn xộn + "đừng dùng mãi 1 công thức" + bối cảnh đa dạng → trận này lên CẦU TREO và có CHỮ KÝ RIÊNG kiểu BATMAN:
//   KẺ SĂN MỒI — Bat không đối mặt từ đầu mà NGỒI TRÊN DẦM THÁP CẦU nhìn xuống, con mồi đi vào vùng của nó; nhịp CHẬM, hồi hộp, nhiều góc cao nhìn xuống,
//   ít đối đầu trực diện, tiếng thưa (gió trên cầu, tiếng tích tắc), nhạc lặng trong khói. Nhịp theo bản gốc (meme-anime-lab/playbook nhip.md "Trận đánh thật").
//   Mạch: (ra từ kính vỡ fin1f3) Pop + Huh đi trên cầu, dáo dác → lộ Bat ngồi trên dầm tháp, trăng máu sau lưng → mắt nheo → CHẾ ĐỘ THÁM TỬ nhìn từ trên xuống
//   (khoá mục tiêu, đường bay dự đoán, dấu X chỗ gài bom, quả bom gài sẵn trên thân tháp) → Bat nhảy xuống lượn áo choàng đáp trước mặt 2 con →
//   Pop bắn vòng khói, Bat bước né → ném 2 cặp boomerang "HỤT" (thật ra GÀI BOM quanh chân) → Pop cười nhạo → Huh tích lực bắn HUH bám đuôi →
//   Bat phóng dây móc lên tháp, lướt NGANG QUA quả bom gài sẵn → HUH đâm trúng bom, nổ trên thân tháp, mảnh rơi xuống cầu → Bat đứng trên dầm cao →
//   nhảy xuống đấu tầm xa (vòng khói nhanh dần, boomerang xé vòng khói, 1 vòng trúng Bat) → BOM KHÓI: trong khói đèn đỏ lần lượt bật, 2 con đứng tựa lưng,
//   bóng Bat lướt qua gài nốt → Pop thổi tan khói → lộ VÒNG 6 QUẢ BOM, Bat đã ngồi lại trên dầm tháp → Bat bấm kích nổ: ngòi 3s (đúng game) →
//   Pop hít sâu phả 1 VÒNG KHÓI KHỔNG LỒ lao về máy, bom nổ sau lưng → máy chui qua LỖ CHỮ O → trận kế (fin1f1, công viên). Không biết ai sống sót (dang dở).
//   Chiêu CHÉP ĐÚNG GAME: boomerang dơi `_batRangShape` ném theo cặp vòng 2 bên; dây móc `bat_grapple`; boomerang NỔ đèn đỏ nháy nhanh dần, ngòi 3s (`br_tick` → `br_boom`);
//   vòng khói Pop `_popRingDraw` (xám bạc như vape, lỗ giữa trống) + mỗi phát nhanh dần; Huh tích lực 0.5s, chữ HUH trắng viền hồng bám mục tiêu.
(function(){
  if(!window.CineKit || CineKit.films.fin1f2) return;
  const BASE=((document.currentScript&&document.currentScript.src)||'js/film-fin1f2.js').replace(/film-[^\/]*$/,''), V=window.GAME_VERSION?'?v='+GAME_VERSION.build:'';
  for(const [g,f] of [['PIXI_FILTERS_GLSL','vendor/pixi-filters/glsl.js'],['Fin1City','fin1-city.js'],['Fin1Fight','fin1-fight.js']]) if(!window[g]){ try{ const x=new XMLHttpRequest(); x.open('GET',BASE+f+V,false); x.send(); (0,eval)(x.responseText); }catch(e){} }
  const K=CineKit, {seg,lerp,clamp,hash}=K, E=K.EASE, eout=E.eout, ein=E.ein, eio=E.eio, C=K.cam, W=window.Fin1Fight, TAU=Math.PI*2;
  const FX=()=>window.CineKitFx;
  const T={ look:3.6, perch:5.6, eyeB:8.4, scan:10.0, drop:13.6, land:15.4, pop1:17.2, dodge:17.5, throw1:18.8, land1:19.6, mock:20.6, huhC:22.4, huhF:23.8, grap:24.1, pass:25.9, lure:26.8,
    after:27.6, duel:30.4, cut2:31.6, cut3:33.0, rhitB:34.0, smokeT:36.0, smoke:36.5, sm3:40.2, sm4:42.6, arm:45.6, fuse:48.6, panic:49.2, inhale:50.0, giant:51.2, det:51.6, hole:51.8, DUR:53.0 };
  const H=120;
  // 🌉 CẦU TREO: 2 tháp đặt sát chỗ đánh (x ±900), cao 1400, 2 dầm ngang (520, 1050) — Bat ngồi trên dầm thấp của tháp phải
  const CITY=Fin1City({seed:5, kind:'bridge', towers:[-900,900], towerH:1400, beams:[520,1050]});
  const theme=t=>CITY.TH_BRIDGE;
  const IMG={ A0:'assets/img/cine/FIN_AKA_BAT.png', AT:'assets/img/cine/FIN_F2_BAT_THROW.png', AG:'assets/img/cine/FIN_F2_BAT_GRAPPLE.png',
    P0:'assets/avatars/popcat/avatarUrl.webp', P1:'assets/avatars/popcat/attackAvatarUrl.webp', U0:'assets/avatars/huhcat/avatarUrl.webp',
    nD:'assets/avatars/doge/avatarUrl.webp', nK:'assets/avatars/clappingcat/avatarUrl.webp',   // trận kế (fin1f1, công viên) trong lỗ vòng khói
    ...window.FIN1_CITY_IMGS };
  const DIR={A0:0,AT:-1,AG:-1,P0:0,P1:0,U0:0};
  const HT={A0:H*1.12,AT:H*1.0,AG:H*1.15,P0:H*0.8,P1:H*0.8,U0:H*0.78};
  // ───────── BỐ TRÍ (Batman chuẩn bị sẵn) ─────────
  const CEN=[-440,15];   // tâm giữa Pop + Huh
  const SPOT=Array.from({length:6},(_,i)=>{ const a=i/6*TAU+0.3; return [CEN[0]+Math.cos(a)*215, CEN[1]+Math.sin(a)*170]; });   // 6 chỗ gài bom quanh chân 2 con
  const THROWN=[0,1,3,4], LATE=[2,5];                 // 4 quả ném "hụt" lúc đầu · 2 quả gài thêm trong khói
  const LATE_T={2:43.4,5:44.5};
  const LIGHT={0:38.4,3:38.4,1:40.6,4:40.6,2:43.7,5:44.8};   // giây đèn đỏ từng quả bật lên trong khói
  const BEAM_Y=520+120, LEDGE=[900,BEAM_Y,0], HIGH=[900,1050+120,-40];   // Bat ngồi trên dầm thấp (đầu + cuối trận) · đứng trên dầm cao sau pha dụ HUH
  const WB=[880,860,-320];                            // quả bom gài sẵn trên THÂN THÁP phải TỪ TRƯỚC TRẬN (để dụ chữ HUH)
  const WALL1=[900,1170,-300];                        // điểm móc dây: dầm cao của tháp
  const AK=[[0,LEDGE[0],'A0',0,0,LEDGE[2],LEDGE[1]],[T.drop,LEDGE[0],'A0',0,0,LEDGE[2],LEDGE[1]],[T.drop+0.3,870,'AG','eout',0,0,LEDGE[1]+70],[T.land,430,'AG','ein',1,0,0],[T.land+0.35,430,'A0'],   // nhảy khỏi dầm, lượn áo choàng đáp xuống cầu
    [T.pop1,430,'A0'],[T.dodge,430,'A0','eout',1,-110],[T.throw1-0.1,430,'A0',0,0,-110],[T.throw1,425,'AT','eout',0,-110],[T.throw1+0.4,425,'A0',0,0,-110],
    [T.huhF,430,'A0',0,0,-100],[T.grap,430,'AG',0,0,-100],[T.pass,WB[0]-70,'AG','eout',1,WB[2]+50,WB[1]+30],[T.lure,HIGH[0]-30,'AG','lin',1,HIGH[2],HIGH[1]+20],[T.lure+0.3,HIGH[0],'A0','eout',0,HIGH[2],HIGH[1]],
    [T.duel-0.6,HIGH[0],'A0',0,0,HIGH[2],HIGH[1]],[T.duel-0.15,470,'AG','ein',1,40,60],[T.duel,420,'A0','eout',0,40,0],   // từ dầm cao nhảy xuống đấu tầm xa
    [T.cut2-0.45,420,'A0',0,0,40],[T.cut2-0.35,420,'AT',0,0,40],[T.cut2,420,'A0',0,0,40],[T.cut2+0.45,420,'A0','eout',1,-120],
    [T.cut3-0.35,420,'A0',0,0,-120],[T.cut3-0.25,420,'AT',0,0,-120],[T.cut3+0.1,420,'A0',0,0,-120],[T.rhitB,465,'A0','back',0,-120],[T.rhitB+0.9,450,'A0','eio',0,-110],
    [T.smokeT-0.1,440,'A0',0,0,-80],[T.smokeT,440,'AT',0,0,-80],[T.smokeT+0.35,440,'A0',0,0,-80],[T.smoke+0.4,150,'A0','ein',1,-40],[T.arm-0.01,150,'A0',0,0,-40],
    [T.arm,LEDGE[0],'A0',0,0,LEDGE[2],LEDGE[1]],[T.DUR,LEDGE[0],'A0',0,0,LEDGE[2],LEDGE[1]]];
  const PK=[[0,-900,'P0',0,0,-60,0],[T.look,-380,'P0','eout',0,-60,0],[T.DUR,-380,'P0']], UK=[[0,-1040,'U0',0,0,90,0],[T.look+0.3,-500,'U0','eout',0,90,0],[T.DUR,-500,'U0']];   // 2 con đi vào giữa cầu
  const batA=t=>(t>T.smoke+0.45&&t<T.arm)?0:1;   // Bat lẩn vào khói (chỉ thấy bóng lướt qua lúc gài bom)
  // Pop phả vòng khói: [giây, kiểu] — 'aim' nhắm Bat · 'blind' bắn mù trong khói · 'clear' thổi tan khói. Đấu tầm xa: mỗi phát NHANH DẦN (đúng game)
  const POPS=[[T.pop1,'aim'],[T.cut2-0.62,'aim'],[T.cut2-0.36,'aim',1],[T.cut3-0.6,'aim'],[T.cut3-0.38,'aim',1],[T.rhitB-0.7,'aim'],   // [giây, kiểu, 1 = phát thứ 2 của cùng 1 loạt (tiếng là lớp '+')]
    [38.9,'blind'],[41.7,'blind'],[43.0,'blind'],[T.arm,'clear']];
  const MOCK=[T.mock,T.mock+0.25];   // Pop phả "pop pop" cười nhạo (không bắn)
  const RING_V=900, CUT={}, HITB={}; CUT[String(+(T.cut2-0.62).toFixed(2))]=T.cut2; CUT[String(+(T.cut2-0.36).toFixed(2))]=T.cut2; CUT[String(+(T.cut3-0.6).toFixed(2))]=T.cut3; CUT[String(+(T.cut3-0.38).toFixed(2))]=T.cut3; HITB[String(+(T.rhitB-0.7).toFixed(2))]=T.rhitB;
  const hs=W.hstop([[T.lure,0.16],[T.rhitB,0.14],[T.cut2,0.1],[T.cut3,0.1]]);
  // ───────── MÁY QUAY ─────────  (Pop + Huh luôn TRÁI, Bat luôn PHẢI; góc cao nhìn xuống = mắt kẻ săn mồi)
  const S=(t0,t1,a,b,ease)=>({t0,t1,a,b:b||a,ease:ease||'eio'});
  const OPEN={tx:-560,ty:120,tz:0,dist:950,yaw:-48,pitch:-4,fov:52,roll:-2};   // = máy ô nền lúc kính vỡ ở cuối fin1f3 → nối liền
  const shots=C.seq([
    S(0,T.look,OPEN,{tx:-420,ty:110,tz:0,dist:820,yaw:-44,pitch:-4,fov:52,roll:-2}),                                                                    // toàn: cầu treo trong đêm, Pop + Huh đi vào giữa cầu
    ...C.pushIn(T.look,{d:T.perch-T.look,tx:-440,ty:70,tz:15,dist:300,dist1:265,yaw:22,pitch:-6,fov:44,ox:-0.1}),                                          // Pop + Huh dáo dác nhìn quanh
    S(T.perch,T.eyeB,{tx:900,ty:690,tz:0,dist:600,yaw:-28,pitch:-22,fov:50},{tx:900,ty:720,tz:0,dist:520,yaw:-30,pitch:-24,fov:50},'lin'),              // góc giun: Bat NGỒI TRÊN DẦM THÁP, trăng máu sau lưng
    S(T.eyeB,T.scan,{tx:900,ty:BEAM_Y+122,tz:0,dist:120,yaw:-22,pitch:-2,fov:40},{tx:900,ty:BEAM_Y+122,tz:0,dist:104,yaw:-22,pitch:-2,fov:40},'lin'),     // đặc tả mắt Bat nheo lại
    S(T.scan,T.drop,{tx:-420,ty:40,tz:0,dist:1250,yaw:-60,pitch:34,fov:50},{tx:-440,ty:40,tz:0,dist:1180,yaw:-58,pitch:34,fov:50},'lin'),                 // CHẾ ĐỘ THÁM TỬ: nhìn TỪ TRÊN XUỐNG 2 con mồi (HUD vẽ ở screen)
    S(T.drop,T.land+0.6,{tx:860,ty:700,tz:0,dist:640,yaw:-10,pitch:-6,fov:50},{tx:330,ty:90,tz:0,dist:600,yaw:-4,pitch:3,fov:48},'brake'),                // Bat nhảy khỏi dầm, áo choàng xoè lượn xuống, đáp trước mặt 2 con
    S(T.land+0.6,T.pop1,{tx:-60,ty:90,tz:0,dist:620,yaw:-8,pitch:3,fov:52},{tx:-60,ty:90,tz:0,dist:590,yaw:-8,pitch:3,fov:52},'lin'),                           // đối mặt trên mặt cầu, gió thổi
    S(T.pop1,T.throw1,{tx:-20,ty:85,tz:-40,dist:640,yaw:-8,pitch:5,fov:52},{tx:0,ty:85,tz:-50,dist:620,yaw:-6,pitch:5,fov:52}),                              // vòng khói bay tới, Bat bước né vừa khít
    S(T.throw1,T.mock,{tx:150,ty:90,tz:-80,dist:560,yaw:-30,pitch:8,fov:52},{tx:-260,ty:70,tz:0,dist:760,yaw:-18,pitch:22,fov:52},'brake'),                 // 2 cặp boomerang "hụt", máy bám theo, găm xuống quanh chân địch
    S(T.mock,T.huhC,{tx:-440,ty:72,tz:15,dist:310,yaw:16,pitch:-4,fov:46},{tx:-440,ty:72,tz:15,dist:295,yaw:16,pitch:-4,fov:46},'lin'),                   // Pop phả "pop pop" cười nhạo
    S(T.huhC,T.huhF,{tx:-500,ty:75,tz:90,dist:235,yaw:20,pitch:-6,fov:44,ox:-0.08},{tx:-500,ty:75,tz:90,dist:205,yaw:20,pitch:-6,fov:44,ox:-0.08},'lin'),   // Huh tích lực
    S(T.huhF,T.grap+0.7,{tx:0,ty:110,tz:0,dist:600,yaw:-6,pitch:2,fov:50}),                                                                                // HUH bay ra → Bat bắn dây móc lên tháp
    S(T.grap+0.7,T.lure,{tx:780,ty:820,tz:-260,dist:900,yaw:-24,pitch:-14,fov:56},{tx:840,ty:1000,tz:-280,dist:840,yaw:-26,pitch:-18,fov:56},'lin'),       // Bat lướt NGANG QUA quả bom trên thân tháp, HUH bám đuôi
    S(T.lure,T.after,{tx:860,ty:900,tz:-300,dist:1150,yaw:-14,pitch:-10,fov:54},{tx:860,ty:900,tz:-300,dist:1110,yaw:-14,pitch:-10,fov:54},'lin'),           // HUH đâm trúng bom, nổ trên thân tháp
    S(T.after,T.duel-0.6,{tx:-300,ty:150,tz:0,dist:620,yaw:30,pitch:-20,fov:54},{tx:-300,ty:180,tz:0,dist:580,yaw:30,pitch:-24,fov:54},'lin'),          // THỞ: mảnh tháp rơi lả tả xuống cầu, 2 con ngước nhìn Bat đứng trên dầm cao
    S(T.duel-0.6,T.cut2+0.5,{tx:300,ty:160,tz:0,dist:700,yaw:0,pitch:3,fov:50},{tx:0,ty:90,tz:0,dist:580,yaw:0,pitch:3,fov:50},'brake'),                  // Bat nhảy xuống → đấu tầm xa: boomerang xé 2 vòng khói giữa cầu
    S(T.cut2+0.5,T.rhitB-0.2,{tx:-20,ty:90,tz:-30,dist:520,yaw:-16,pitch:4,fov:50},{tx:20,ty:90,tz:-50,dist:500,yaw:-18,pitch:4,fov:50},'lin'),             // vòng khói nhanh dần, boomerang chém đôi thêm 2 vòng
    S(T.rhitB-0.2,T.smokeT-0.2,{tx:430,ty:95,tz:-110,dist:290,yaw:-24,pitch:-4,roll:-4,fov:48},{tx:440,ty:95,tz:-110,dist:270,yaw:-24,pitch:-4,roll:-4,fov:48},'lin'),   // 1 vòng khói trúng Bat, lảo đảo, chỉnh lại găng
    S(T.smokeT-0.2,T.smoke+1.0,{tx:-80,ty:90,tz:0,dist:860,yaw:-6,pitch:6,fov:48},{tx:-160,ty:100,tz:0,dist:880,yaw:-6,pitch:8,fov:48},'lin'),              // ném bom khói → nổ bung trùm 2 con
    S(T.smoke+1.0,T.sm3,{tx:-440,ty:150,tz:15,dist:980,yaw:12,pitch:12,fov:50},{tx:-440,ty:150,tz:15,dist:900,yaw:12,pitch:12,fov:50},'lin'),                // khói trùm, vòng khói bắn mù ra ngoài, đèn đỏ bật dần (nhạc nhỏ hẳn)
    ...C.pushIn(T.sm3,{d:T.sm4-T.sm3,tx:-440,ty:74,tz:15,dist:280,dist1:240,yaw:-8,pitch:-4,fov:46}),                                                        // trong khói: 2 con đứng tựa lưng, thở gấp
    S(T.sm4,T.arm,{tx:-330,ty:70,tz:-40,dist:420,yaw:26,pitch:-4,fov:48},{tx:-360,ty:70,tz:-40,dist:380,yaw:26,pitch:-4,fov:48},'lin'),                   // bóng Bat lướt qua trong khói, gài 2 quả cuối
    S(T.arm,T.arm+1.5,{tx:-440,ty:40,tz:15,dist:940,yaw:-20,pitch:40,fov:52},{tx:-440,ty:40,tz:15,dist:880,yaw:-18,pitch:40,fov:52}),                        // LỘ BẪY: khói tan, vòng 6 quả bom quanh 2 con (góc chim)
    S(T.arm+1.5,T.panic,{tx:LEDGE[0],ty:LEDGE[1]+70,tz:0,dist:320,yaw:-20,pitch:-30,fov:52,ox:0.1},{tx:LEDGE[0],ty:LEDGE[1]+70,tz:0,dist:290,yaw:-22,pitch:-31,fov:52,ox:0.1},'lin'),   // góc giun: Bat đã ngồi lại trên dầm, BẤM KÍCH NỔ (đèn chuyển nháy nhanh)
    S(T.panic,T.inhale,{tx:-440,ty:74,tz:15,dist:260,yaw:-10,pitch:-6,fov:46}),                                                                              // Pop + Huh hoảng loạn
    ...C.pushIn(T.inhale,{d:T.giant-T.inhale,tx:-380,ty:78,tz:-60,dist:210,dist1:180,yaw:0,pitch:-4,fov:44}),                                                // Pop hít sâu
    S(T.giant,T.DUR,{tx:-380,ty:78,tz:-20,dist:235,yaw:0,pitch:-4,fov:48}) ]);                                                                             // vòng khói khổng lồ lao về máy → chui qua lỗ O
  // ───────── TRẬN KẾ (fin1f1, CÔNG VIÊN) trong lỗ vòng khói: Doge + Clapping đi dạo — đúng khung mở đầu fin1f1 ─────────
  const PARK=Fin1City({seed:7, kind:'park'}), NEXT1={tx:0,ty:160,tz:0,dist:1500,yaw:-56,pitch:-6,fov:52,roll:-2,oy:0};   // oy:0 → ô tròn không tự dời tâm ảnh
  function drawNext(F,t){ PARK.draw(F,t,PARK.TH_PARK);
    K.sprite(F,{img:F.I.nD,x:-160,z:30,h:H*0.75,life:{breath:0.8}}); K.sprite(F,{img:F.I.nK,x:-40,z:-50,h:H*1.05,life:{breath:0.7}}); }
  const ringR=t=>{ const u=seg(t,T.giant,T.hole+0.9); return lerp(30,1500,Math.pow(u,2.4)); };   // bán kính vòng khói khổng lồ TRÊN MÀN HÌNH (px logic)
  const ringC=t=>[480+Math.sin(t*3)*6, 300-40*seg(t,T.giant,T.hole)];
  function panels(t){ if(t<T.giant+0.3) return null; const R=ringR(t)*0.6, [cx,cy]=ringC(t), poly=[];
    for(let i=0;i<40;i++){ const a=i/40*TAU; poly.push([(cx+Math.cos(a)*R)/960,(cy+Math.sin(a)*R)/540]); }
    return [{cam:null, clip:null}, {cam:NEXT1, clip:poly, next:true, theme:PARK.TH_PARK}]; }
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
  // ───────── LỊCH ─────────
  const bat=t=>W.track(AK,hs(t)), pop=t=>W.track(PK,hs(t)), huh=t=>W.track(UK,hs(t));
  const mouthOf=p=>[p.x+30,p.y+60,p.z-20], handOf=b=>[b.x-30,b.y+70,b.z];
  const fuseOn=(t,t0,t1)=>{ const left=1-seg(t,t0,t1), per=lerp(0.06,0.3,left); return Math.floor((t-t0)/per)%2===0; };
  // gờ nhà Bat ngồi (khối hộp tối bám mặt toà nhà)
  function ledge(F){ const [x,y,z]=LEDGE, q=(dx,dy,dz)=>K.proj(F.B,x+dx,y+dy,z+dz), A=[q(-80,0,-40),q(80,0,-40),q(80,0,70),q(-80,0,70),q(-80,-26,-40),q(80,-26,-40)]; if(A.some(p=>!p)) return;
    F.list.push({d:A[0].d+5, fn:()=>{ const g=F.g; g.save(); g.fillStyle='#2a2328'; g.beginPath(); [A[0],A[1],A[2],A[3]].forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y)); g.closePath(); g.fill();
      g.fillStyle='#17131a'; g.beginPath(); [A[4],A[5],A[1],A[0]].forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y)); g.closePath(); g.fill(); g.restore(); }}); }
  function world(F,t){ const pn=F.panel||{}; if(pn.next) return drawNext(F,t);
    const th=theme(t), b0=bat(t), p0=pop(t), u0=huh(t);
    CITY.draw(F,t,th);
    let mouth=false; for(const [s] of POPS) if(t>=s&&t<s+0.1) mouth=true; for(const s of MOCK) if(t>=s&&t<s+0.1) mouth=true; if(t>=T.giant&&t<T.giant+0.3) mouth=true;
    if(batA(t)>0.5) W.actor(F,{key:b0.im,dir:DIR[b0.im],x:b0.x,z:b0.z,y:b0.y,h:HT[b0.im],look:{x:p0.x,z:p0.z},smear:b0.sm,shadow:b0.y<200,life:{breath:0.6,wind:1.1}});
    W.actor(F,{key:mouth?'P1':'P0',dir:0,x:p0.x,z:p0.z,y:p0.y,h:HT.P0,life:{breath:t>=T.inhale&&t<T.giant?2.4:0.8,squash:mouth?0.25:(t>=T.inhale&&t<T.giant?-0.35*seg(t,T.inhale,T.giant):0)}});
    W.actor(F,{key:'U0',dir:0,x:u0.x,z:u0.z,y:u0.y,h:HT.U0,lean:t>=T.panic&&t<T.giant?Math.sin(t*14)*5:0,life:{breath:(t>=T.huhC&&t<T.huhF)?2.2:0.7}});
    if(t>=T.panic&&t<T.panic+0.7) W.text3(F,u0.x,u0.y+175,u0.z,'HUH?!',42,{font:'Impact,"Arial Black",sans-serif',col:'#ffffff',stroke:'#e91e63',glow:'#e91e63',a:1-seg(t,T.panic+0.4,T.panic+0.7)});
    K.smoke(F,{x:p0.x,z:p0.z,t0:-0.5,n:6,spread:70,rise:10,life:6,size:70,seed:3,a:0.5,tint:'90,70,64'});   // bụi chân Pop (đầu meme) — không lộ mép ảnh
    K.smoke(F,{x:0,z:300,t0:-0.3,n:12,spread:1700,rise:30,life:3,size:90,seed:1,swirl:0.2,a:0.22,tint:'150,90,80'});
    // 💣 quả bom GÀI SẴN trên tường (từ trước trận): đèn mờ → Bat lướt qua thì bật nháy → HUH đâm vào → nổ
    if(t<T.lure){ batarang(F,WB[0],WB[1],WB[2],0.4,{sz:20,boom:true,stuck:true,on:t>=T.pass?fuseOn(t,T.pass,T.pass+0.5):(Math.floor(t*1.2)%3===0)}); }
    // 💣 6 quả bom quanh chân Pop + Huh: 4 quả ném "hụt" găm đất (đèn mờ) · 2 quả gài thêm trong khói · ngòi 3s từ lúc lộ bẫy (T.arm)
    SPOT.forEach((sp,i)=>{ let ok=false, on=false;
      if(THROWN.includes(i)){ const k=THROWN.indexOf(i), s=T.throw1+(k>>1)*0.08, side=k%2?1:-1; if(t>=s&&t<T.land1+0.02*k){ const A=handOf(bat(s)), u=seg(t,s,T.land1+0.02*k), p=rangPos(A,[sp[0],6,sp[1]],u,side,320);
          batarang(F,p[0],p[1],p[2],t*28+i,{sz:22}); } ok=t>=T.land1+0.02*k; }
      else ok=t>=LATE_T[i];
      if(!ok||t>=T.det+0.05*i) return; on=t>=T.fuse?fuseOn(t,T.fuse,T.det):t>=T.arm?(Math.floor(t*1.6+i*0.5)%2===0):(t>=LIGHT[i]?Math.floor(t*2+i)%2===0:false);   // lộ bẫy: nháy chậm (chưa kích) → Bat bấm: ngòi 3s nhanh dần
      batarang(F,sp[0],5,sp[1],i*1.1,{sz:22,boom:true,stuck:true,on});
      if(on&&t>=T.smoke&&t<T.arm+0.4){ const P=K.proj(F.B,sp[0],8,sp[1]); if(P) F.list.push({d:-1e6, fn:()=>{ const g=F.g, R=Math.max(6,26*P.s); g.save(); g.globalCompositeOperation='lighter'; const gr=g.createRadialGradient(P.x,P.y,0,P.x,P.y,R); gr.addColorStop(0,'rgba(255,60,60,0.95)'); gr.addColorStop(0.35,'rgba(255,23,68,0.5)'); gr.addColorStop(1,'rgba(255,0,0,0)'); g.fillStyle=gr; g.fillRect(P.x-R,P.y-R,2*R,2*R); g.restore(); }}); } });
    // ── vòng khói Pop
    POPS.forEach(([s,kind],i)=>{ const u=t-s; if(u<0) return; const P0=pop(s), M=mouthOf(P0); let tg;
      if(kind==='aim'){ const b=bat(s); tg=[b.x,95,b.z]; } else if(kind==='blind'){ const a=hash(i*3.3)*TAU; tg=[M[0]+Math.cos(a)*900,90+200*hash(i*5.1),M[2]+Math.sin(a)*700]; } else tg=[M[0]+10,140,M[2]-600];
      const L=Math.hypot(tg[0]-M[0],tg[2]-M[2]), key=String(+s.toFixed(2)); let end=9, f=u*RING_V/L;
      if(CUT[key]) end=(CUT[key]-s)*RING_V/L; if(HITB[key]){ f=u/(HITB[key]-s); end=1; }
      if(f>end+0.3||f>1.3) return; const ff=Math.min(f,end), x=lerp(M[0],tg[0],ff), y=lerp(M[1],tg[1],ff), z=lerp(M[2],tg[2],ff), grow=1+0.5*Math.min(1,u*RING_V/400), pop2=Math.min(1,0.6+u*RING_V/40);
      const burst=f>end?seg(f,end,end+0.3):0, big=kind==='clear'?3.2:1;
      popRing(F,x,y,z,13*1.6*pop2*grow*big*(1+0.35*burst),(13*0.38+1.5)*1.6*big*(1+burst*0.5),[tg[0]-M[0],0,tg[2]-M[2]],1-burst,burst,i*1.37,t);
      if(u<0.5) K.smoke(F,{x:M[0],y:M[1]-20,z:M[2],t0:s,n:3,spread:30,rise:40,life:0.7,size:26,seed:200+i,a:0.45,tint:'200,205,215'}); });
    // ── boomerang chặn vòng khói (đạn va đạn) — ném cặp vòng 2 bên tới đúng chỗ vòng khói bị xé
    for(const [cut,thr] of [[T.cut2,T.cut2-0.35],[T.cut3,T.cut3-0.25]]) if(t>=thr&&t<cut+0.5){ for(const side of [-1,1]){ const A=handOf(bat(thr)), B=[60,90,side*40-40], u=seg(t,thr,cut);
        if(t<cut){ const p=rangPos(A,B,u,side,240); batarang(F,p[0],p[1],p[2],t*28+side,{sz:22}); } else { const v=t-cut, p=[B[0]-v*700,B[1]+v*90,B[2]+side*v*200]; batarang(F,p[0],p[1],p[2],t*28+side,{sz:22}); } }
      if(t>=cut&&t<cut+0.5) K.sparks(F,{x:60,y:90,z:-40,t0:cut,n:18,speed:420,life:0.4,seed:(cut*10)|0,col:'200,180,255'}); }
    // ── HUH bám đuôi Bat → đâm vào quả bom trên tường
    if(t>=T.huhF&&t<T.lure){ const U=huh(T.huhF), A=[U.x+40,70,U.z], Cp=[620,560,-200], u=ein(seg(t,T.huhF,T.lure)), q=1-u;
      const x=q*q*A[0]+2*q*u*Cp[0]+u*u*WB[0], y=q*q*A[1]+2*q*u*Cp[1]+u*u*WB[1], z=q*q*A[2]+2*q*u*Cp[2]+u*u*WB[2]; huhText(F,x,y,z,WB[0]-A[0],WB[2]-A[2],t); }
    if(t>=T.lure&&t<T.lure+2.2){ if(FX()) FX().blast(F,{x:WB[0],y:WB[1],z:WB[2]-30,t0:T.lure,size:420,life:1.0,seed:44});
      K.debris(F,{x:WB[0],y:WB[1],z:WB[2]-20,t0:T.lure,n:30,speed:900,life:1.8,size:30,seed:45,col:'#4d4448'}); K.smoke(F,{x:WB[0],y:WB[1]-60,z:WB[2]-80,t0:T.lure+0.05,n:10,spread:300,rise:60,life:1.8,size:180,seed:46,a:0.5});
      K.sparks(F,{x:WB[0],y:WB[1],z:WB[2]-20,t0:T.lure,n:24,speed:600,life:0.5,seed:47,col:'233,30,99'}); }
    // ── dây móc
    if(t>=T.grap+0.15&&t<T.lure+0.3){ const H0=handOf(bat(t)), k=eout(seg(t,T.grap+0.15,T.grap+0.3)), Wp=WALL1, P1=[lerp(H0[0],Wp[0],k),lerp(H0[1]+40,Wp[1],k),lerp(H0[2],Wp[2]-8,k)];
      W.line(F,[[H0[0]+10,H0[1]+40,H0[2]],P1],2.5,'#1a1a1f',{d:-4}); }
    // ── vòng khói trúng Bat
    if(t>=T.rhitB&&t<T.rhitB+0.5) K.sparks(F,{x:b0.x,y:95,z:b0.z,t0:T.rhitB,n:14,speed:360,life:0.4,seed:61,col:'220,225,235'});
    // ── bom khói: viên khói bay vòng cung → nổ bung khói đen dày trùm Pop + Huh, tan khi vòng khói 'clear' thổi qua
    if(t>=T.smokeT&&t<T.smoke){ const A=handOf(bat(T.smokeT)), u=seg(t,T.smokeT,T.smoke), x=lerp(A[0],CEN[0],u), y=lerp(A[1],0,u)+Math.sin(Math.PI*u)*220, z=lerp(A[2],CEN[1],u), P=K.proj(F.B,x,y,z);
      if(P) F.list.push({d:P.d, fn:()=>{ const g=F.g; g.fillStyle='#2c2a30'; g.beginPath(); g.arc(P.x,P.y,Math.max(2,9*P.s),0,TAU); g.fill(); }}); }
    if(t>=T.smoke&&t<T.arm+0.8){ const fade=t<T.arm?1:1-seg(t,T.arm,T.arm+0.6), blow=t<T.arm?0:eout(seg(t,T.arm,T.arm+0.6));
      const grow=eout(seg(t,T.smoke,T.smoke+0.5));
      for(let i=0;i<34;i++){ const a=hash(i*3.1)*TAU+t*0.08*(i%2?1:-1), r=(30+300*Math.sqrt(hash(i*5.5)))*(0.3+0.7*grow)*(1+blow*2.4), x=CEN[0]+Math.cos(a)*r, z=CEN[1]+Math.sin(a)*r*0.7, y=20+200*hash(i*7.7)+blow*120, P=K.proj(F.B,x,y,z); if(!P) continue;
        const R=(120+80*hash(i*9.3))*P.s*(0.5+0.5*grow), near=clamp((P.d-120)/500,0.12,1), al=0.95*fade*near*(0.65+0.35*hash(i*2.2));   // sát máy thì mỏng → cận cảnh trong khói vẫn thấy đèn / bóng
        F.list.push({d:P.d-1, fn:()=>{ const g=F.g; g.save(); g.globalAlpha=al; for(let j=0;j<3;j++){ const ox=(hash(i*7+j)-0.5)*R*0.7, oy=(hash(i*11+j)-0.5)*R*0.5; g.save(); g.translate(P.x+ox,P.y+oy); g.rotate(i+j*2+t*0.15); const c=darkCloud(i+j), rr=R*(0.75+0.3*hash(i+j*5)); g.drawImage(c,-rr,-rr,rr*2,rr*2); g.restore(); } g.restore(); }}); }
      // bóng Bat lướt trong khói lúc gài 2 quả cuối
      for(const i of LATE){ const tt=LATE_T[i]; if(t>=tt-0.25&&t<tt+0.2){ const sp=SPOT[i], u=seg(t,tt-0.25,tt+0.2); const P=K.proj(F.B,sp[0]+lerp(-60,60,u),0,sp[1]-10), c=K.prep(F.I.A0); if(P&&c) F.list.push({d:-1e6+1, fn:()=>{ const g=F.g, h=HT.A0*P.s, w=h*c.sw/c.sh; g.save(); g.globalAlpha=0.9*Math.sin(Math.PI*u); g.drawImage(K.tinted(c,'#050407'),P.x-w/2,P.y-h,w,h); g.restore(); }}); } } }   // BÓNG ĐEN Bat lướt qua trong khói
    // ── NỔ (bom quanh chân) — lửa sau lưng vòng khói khổng lồ
    if(t>=T.det){ SPOT.forEach((sp,i)=>{ const tb=T.det+0.05*i; if(t>=tb&&FX()) FX().blast(F,{x:sp[0],y:40,z:sp[1],t0:tb,size:360,life:1.0,seed:80+i}); }); }
  }
  // ───────── MÀN HÌNH ─────────
  // 🦇 CHẾ ĐỘ THÁM TỬ (Batman): khung lạnh xanh, ngoặc khoá mục tiêu, nhãn phân tích, đường bay dự đoán của boomerang, dấu X chỗ gài bom + quả bom trên tường
  function detective(F,t){ if(t<T.scan||t>=T.drop) return; const g=F.g, VW=F.VW, VH=F.VH, k=seg(t,T.scan,T.scan+0.25)*(1-seg(t,T.drop-0.25,T.drop)), u=seg(t,T.scan,T.drop-0.4);
    g.save(); g.globalCompositeOperation='multiply'; g.fillStyle=`rgba(${Math.round(255-170*k)},${Math.round(255-90*k)},255,1)`; g.fillRect(0,0,VW,VH); g.globalCompositeOperation='source-over';
    g.globalAlpha=0.12*k; g.fillStyle='#bfe3ff'; for(let y=(t*120)%6;y<VH;y+=6) g.fillRect(0,y,VW,1); g.globalAlpha=k;
    const P=(x,y,z)=>K.proj(F.B,x,y,z), br=(p,w,h,col)=>{ if(!p) return; g.strokeStyle=col; g.lineWidth=2; const L=Math.min(w,h)*0.3;
      for(const [sx,sy] of [[-1,-1],[1,-1],[1,1],[-1,1]]){ const x=p.x+sx*w/2, y=p.y+sy*h/2; g.beginPath(); g.moveTo(x-sx*L,y); g.lineTo(x,y); g.lineTo(x,y-sy*L); g.stroke(); } };
    const lab=(x,y,a,b)=>{ g.font='700 11px "Courier New",monospace'; g.fillStyle='#e8f6ff'; g.fillText(a,x,y); g.fillStyle='#7fc8ff'; g.fillText(b,x,y+13); };
    const pp=P(-380,60,-60), hp=P(-500,55,90);
    if(pp){ br(pp,90*pp.s*2,110*pp.s*2,'#9fd8ff'); if(u>0.2) lab(pp.x+70*pp.s,pp.y-60*pp.s,'TARGET: POP CAT','fires faster with every pop'); }
    if(hp){ br(hp,90*hp.s*2,100*hp.s*2,'#9fd8ff'); if(u>0.35) lab(hp.x-200*hp.s-150,hp.y+50*hp.s,'TARGET: HUH CAT','homing shot · 0.5s charge'); }
    if(u>0.45){ g.setLineDash([5,6]); g.strokeStyle='rgba(160,220,255,0.9)'; g.lineWidth=1.5;
      THROWN.forEach((i,k2)=>{ const A=[400,160,-110], sp=SPOT[i], side=k2%2?1:-1; g.beginPath(); for(let j=0;j<=16;j++){ const q=rangPos(A,[sp[0],6,sp[1]],j/16*Math.min(1,(u-0.45)*3),side,320), p=P(...q); if(p) j?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y); } g.stroke(); });
      g.setLineDash([]); }
    if(u>0.6){ g.strokeStyle='#ff6b6b'; g.lineWidth=2; for(const sp of SPOT){ const p=P(sp[0],5,sp[1]); if(!p) continue; const r=9; g.beginPath(); g.moveTo(p.x-r,p.y-r); g.lineTo(p.x+r,p.y+r); g.moveTo(p.x+r,p.y-r); g.lineTo(p.x-r,p.y+r); g.stroke(); }
      const w=P(...WB); if(w){ g.beginPath(); g.arc(w.x,w.y,12,0,TAU); g.stroke(); lab(w.x+16,w.y-6,'CHARGE PLANTED','(before the fight)'); }
      lab(VW*0.04,VH*0.12,'ANALYSIS COMPLETE','plan: 6 charges · 1 decoy'); }
    g.restore(); }
  // 🌀 vòng khói KHỔNG LỒ lao về máy (vẽ trên màn hình: nhìn thẳng = vòng tròn) — trong lỗ là trận kế (def.panels)
  function giantRing(F,t){ if(t<T.giant) return; const g=F.g, R=ringR(t), [cx,cy]=ringC(t), th=R*0.26;
    if(t>=T.det&&t<T.hole+0.6){ const k=seg(t,T.det,T.det+0.15)*(1-seg(t,T.hole,T.hole+0.6)); g.save(); g.globalCompositeOperation='lighter'; const gr=g.createRadialGradient(cx,cy,R*0.6,cx,cy,R*1.6); gr.addColorStop(0,`rgba(255,170,90,${0.0})`); gr.addColorStop(0.3,`rgba(255,150,70,${0.55*k})`); gr.addColorStop(1,'rgba(255,90,40,0)'); g.fillStyle=gr; g.fillRect(0,0,F.VW,F.VH); g.restore(); }   // bom nổ sau lưng vòng khói
    g.save(); g.lineCap='round';
    for(const [lw,col,al] of [[th*1.45,'190,196,207',0.25],[th*1.15,'203,208,218',0.5],[th,'212,216,225',0.78],[th*0.5,'228,231,237',0.6]]){ g.strokeStyle=`rgba(${col},${al})`; g.lineWidth=lw; g.beginPath(); g.arc(cx,cy,R*0.78,0,TAU); g.stroke(); }
    for(let i=0;i<22;i++){ const an=i/22*TAU+t*1.6, w=1+0.08*Math.sin(i*2.3+t*4); popCloud(g,i,cx+Math.cos(an)*R*0.78*w,cy+Math.sin(an)*R*0.78*w,th*0.75,an+t*0.6,0.5); }
    g.restore(); }
  // 🎵 nhạc LIỀN, lặng trước 2 cú nổ quyết định, NHỎ HẲN trong khói (hồi hộp: chỉ còn tiếng tích tắc / vòng khói bắn mù)
  const MUS='assets/audio/dp_akatsuki.mp3', ML=8.3, mseg=(ra,rb,o)=>Object.assign({src:MUS,ra,rb,off:ra%ML,vol:0.5,loop:true,fi:0.1,fo:0.3},o||{});
  CineKit.film({ id:'fin1f2', title:'Final 1 · Fight · Bat Cat vs Pop Cat + Huh Cat', DUR:T.DUR, VW:960, VH:540, fadeIn:false, fadeOut:false,   // nối liền: vào từ kính vỡ fin1f3, ra qua lỗ vòng khói sang fin1f1
    imgs:IMG, cast:['bat','br','pop','huh'],
    sfxOk:{ popcat:'đòn thường của Pop Cat: MỖI phát phả vòng khói 1 tiếng pop, đúng như game', huh_sample:'Huh bắn HUH + kêu HUH?! lúc hoảng (tiếng của chính nó)', br_boom:'2 lần nổ: quả bom trên tháp + bom quanh chân (game: mỗi quả nổ 1 tiếng)' },
    // 🔊 thưa, có khoảng trống: gió trên cầu là nền; boomerang = 1 giọng vút (se_whoosh_fast); bom = br_*; không gắn tiếng cho bước chân / xoay người
    sfx:[[0.1,'l2p_rumble',0.4,null,'toàn cảnh cầu treo trong đêm (vừa ra khỏi kính vỡ), gió trên cầu'],
      [T.perch+0.2,'l2p_sub',0.45,null,'lộ Bat ngồi trên dầm tháp, nền trầm rung'],
      [T.eyeB,'l2p_chime',0.5,null,'đặc tả mắt Bat nheo lại'],
      [T.scan,'ep3_blip',0.6,null,'chế độ thám tử: quét 2 mục tiêu, vẽ đường bay, đánh dấu chỗ gài bom'],
      [T.drop+0.1,'l2p_whoosh',0.6,null,'Bat nhảy khỏi dầm, áo choàng xoè lượn xuống'],
      [T.land,'se_step_in',0.7,null,'Bat đáp xuống mặt cầu trước mặt 2 con'],
      ...POPS.map(([s,k,l2])=>[s,'popcat',k==='blind'?0.5:l2?0.6:0.8,null,(l2?'+ phát thứ 2 trong loạt: ':'')+(k==='aim'?'Pop phả vòng khói nhắm Bat':k==='blind'?'Pop phả vòng khói bắn mù trong khói':'Pop phả vòng khói to thổi tan khói')]),
      ...MOCK.map((s,i)=>[s,'popcat',0.6,null,(i?'+ ':'')+'Pop phả pop pop cười nhạo cú ném hụt']),
      [T.dodge+0.05,'ep3_whoosh',0.55,null,'Bat bước né vừa khít, vòng khói sượt qua'],
      [T.throw1+0.03,'se_swing_kick',0.6,null,'Bat ném 2 cặp boomerang vòng rộng 2 bên'],
      [T.land1,'ep3_klunk',0.5,null,'boomerang găm xuống mặt cầu quanh chân địch (bom chưa kích hoạt)'],
      [T.huhC,'l2p_riser',0.45,null,'Huh tích lực, chậm lại'],
      [T.huhF,'huh_sample',1,null,'Huh bắn chữ HUH bám theo Bat'],
      [T.grap+0.2,'bat_grapple',0.9,null,'Bat bắn dây móc lên dầm tháp cầu'],
      [T.lure,'br_boom',1,null,'chữ HUH đâm trúng quả bom trên thân tháp, nổ tung giữa trời'],
      [T.lure+0.01,'kn_boom_low',0.5,null,'+ lớp trầm: sóng nổ bùng dội xuống mặt cầu'],
      [T.after+0.3,'se_rock_break',0.55,null,'mảnh tháp vỡ rơi lả tả xuống mặt cầu'],
      [T.cut2,'se_whoosh_fast',0.7,null,'boomerang chém xé tan 2 vòng khói, đạn va đạn'],
      [T.cut3,'se_whoosh_fast',0.7,null,'boomerang chém đôi thêm 2 vòng khói'],
      [T.rhitB,'se_punch_heavy',0.65,null,'1 vòng khói đập trúng ngực Bat, lảo đảo'],
      [T.smoke,'kn_boom_low',0.7,null,'bom khói nổ bung, khói đen trùm Pop + Huh'],
      [LIGHT[0]+0.02,'ep3_blip',0.4,null,'trong khói đèn đỏ đầu tiên bật lên'],
      [T.fuse,'br_tick',0.9,null,'Bat bấm kích nổ: 6 quả bom nháy nhanh dần, ngòi 3s đếm tới lúc nổ'],
      [T.panic,'huh_sample',0.8,null,'Huh hoảng hốt kêu HUH?!'],
      [T.inhale,'l2p_riser',0.5,null,'Pop hít một hơi thật sâu'],
      [T.giant,'popcat',1,null,'Pop phả vòng khói khổng lồ lao về máy'],
      [T.det,'br_boom',1,null,'6 quả bom nổ sau lưng vòng khói'],
      [T.hole,'l2p_whoosh',0.7,null,'máy chui qua lỗ vòng khói sang trận khác']],
    mus:[mseg(0,T.lure-0.5,{fi:0.3}), mseg(T.lure,T.smoke), mseg(T.smoke,T.arm,{vol:0.22,fi:0.6,fo:0.6}), mseg(T.arm,T.det-0.4,{vol:0.5}), mseg(T.det,T.DUR,{fo:0.6})],
    theme:t=>theme(t), shots, panels,
    impact:C.negFrames([T.rhitB],0.07,'inv',[T.lure]),   // bom nổ cuối: loé cam sau vòng khói (giantRing), không chớp âm bản
    shake:t=>{ let s=0; const h=(a,amp,d)=>{ if(t>=a&&t<a+d) s=Math.max(s,amp*(1-(t-a)/d)); };
      h(T.lure,12,0.7); h(T.after+0.3,3,1.2); h(T.rhitB,6,0.3); h(T.smoke,5,0.4); h(T.det,20,1.2); h(T.land,4,0.3); return s; },
    world, post(F,t){ const fx={shocks:[]}; if(F.panels) return fx; const sh=(a,x,y,z,rm,d,str)=>{ if(t>=a&&t<a+d){ const u=(t-a)/d; fx.shocks.push({x,y,z,r:20+rm*eout(u),w:26,str:str*(1-u)}); fx.chroma=Math.max(fx.chroma||0,1.5*(1-u)); } };
      sh(T.lure,WB[0],WB[1],WB[2]-30,500,0.7,26); sh(T.smoke,CEN[0],60,CEN[1],400,0.5,16); sh(T.arm,CEN[0],80,CEN[1],700,0.7,20); return fx; },
    screen(F,t){ const g=F.g, VW=F.VW, VH=F.VH;
      detective(F,t); giantRing(F,t);
      if(t>=T.grap+0.2&&t<T.grap+0.6) K.speedLines(F,{k:0.35,n:40,r0:0.45});
      if(t>=T.giant&&t<T.hole) K.speedLines(F,{k:0.4*seg(t,T.giant,T.hole),n:60,r0:0.5});
      if(t>=T.lure&&t<T.lure+0.06) K.flash(F,0.4,'#ffe2c8');
      K.sfxText(F,'POP!',VW*0.3,VH*0.32,{t0:T.pop1,life:0.6,px:70,rot:-8,col:'#ffd6a0'});
      K.letterbox(F,t>=T.perch&&t<T.scan?0.7:(t>=T.arm+1.5&&t<T.panic?0.6:0));
      K.vignette(F,t>=T.smoke&&t<T.arm?0.7:0.5); } });
})();
