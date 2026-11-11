// 🔔 Meme Lore · FINAL · Part 1 — TRẬN PHỤ 1: DOORBELL CHUD + MLEM CAT (Meowkatsuki, áo Akatsuki) vs DOGE + CLAPPING CAT — 2 vs 2, trộn cận chiến + tầm xa (11/11/2026)
//   Anh dặn: làm HAY, PHỐI HỢP QUA LẠI giữa đồng đội · kết DANG DỞ, chuyển trận bằng 1 pha có câu chuyện. Vào từ lỗ vòng khói của fin1f2 (cùng máy + chỗ đứng).
//   Chiêu ĐÚNG GAME: Chud giật dây CHUÔNG (mỗi lần reng = sóng âm trúng MỌI địch), lần giật thứ 4 chuông VỠ → hét phẫn nộ → quật DÂY nung đỏ tầm xa ·
//   Mlem lè LƯỠI liếm xa (gấp 3 cận chiến), giật địch về phía mình, có lúc ĐÓNG BĂNG cả người · Doge bắn CHỮ MEME (Press Start 2P vàng viền nâu),
//   trúng đủ 5 phát → hoá BUFF DOGE, lần đầu thức tỉnh HAKI (trận đứng hình 1s, 2 tay đen bóng), đấm haki · Clapping có BÓNG CHÔNG lăn, VỖ TAY ĐỔI CHỖ với địch ngay trước khi va.
//   PHỐI HỢP: ① chuông reng làm 2 địch choáng → Mlem liếm ② Clapping đổi chỗ đẩy Chud vào bóng chông → Doge xả chữ vào Chud đang choáng
//   ③ lưỡi Mlem kéo Doge vào sát chuông ④ Clapping định vỗ tay thì bị Mlem đóng băng (phản combo) ⑤ Buff Doge lao vào Clapping, Clapping đổi chỗ với Chud → Chud lãnh đấm haki
//   ⑥ lưỡi Mlem quấn + đóng băng tay haki → Chud quật xích nung đỏ vào tay băng → Doge phá băng đập đất ⑦ đối mặt 2 vs 2 → cuối đại lộ loé sáng (trận Gojo vs Pain) → cả 4 quay đầu → máy lao theo.
(function(){
  if(!window.CineKit || CineKit.films.fin1f1) return;
  const BASE=((document.currentScript&&document.currentScript.src)||'js/film-fin1f1.js').replace(/film-[^\/]*$/,''), V=window.GAME_VERSION?'?v='+GAME_VERSION.build:'';
  for(const [g,f] of [['PIXI_FILTERS_GLSL','vendor/pixi-filters/glsl.js'],['Fin1City','fin1-city.js'],['Fin1Fight','fin1-fight.js']]) if(!window[g]){ try{ const x=new XMLHttpRequest(); x.open('GET',BASE+f+V,false); x.send(); (0,eval)(x.responseText); }catch(e){} }
  const K=CineKit, {seg,lerp,clamp,hash}=K, E=K.EASE, eout=E.eout, ein=E.ein, eio=E.eio, C=K.cam, W=window.Fin1Fight, TAU=Math.PI*2;
  const FX=()=>window.CineKitFx;
  const T={ face1:2.0, face2:3.1, adv:4.2, txt1:4.6, txt2:4.85, lick1:5.0, lick2:5.25, pull1:5.5, ring1:5.95, lickA:6.25, ball:6.6, clap1:7.15, swap1:7.4, bhit:7.6,
    dt1:7.78, dt2:7.98, dt3:8.18, tug:8.55, ring2:9.0, clap2:9.22, frz:9.42, dt4:9.75, dt5:10.0, morph:10.25, haki:10.65, hakiE:11.65, charge:11.8, clap3:11.98, swap2:12.15, punch:12.32, land:12.75,
    pull4:13.0, shatter:13.3, shout:13.5, bind:14.4, bindE:14.85, clap4:15.1, swap3:15.25, yank:15.4, claps:15.55, sp1:15.7, sp2:15.95, sp3:16.2, slam:16.5, mirror:16.9, far:18.1, look:18.6, whip:19.4, tunnel:19.65, DUR:20.55 };
  // (anh gợi ý 11/11) BỊ TRÓI XÍCH → Clapping vỗ tay ĐỔI CHỖ cứu (Doge ↔ Mlem: Mlem dính xích thay, Chud giật nhầm đồng đội) · COMBAT TỐC ĐỘ CAO nhờ Clapping:
  //   mỗi tiếng vỗ tay dịch chuyển Buff Doge sang 1 phía của Chud (trái / phải / sau / trên đầu) — Chud chặn 1, trúng 1, lưỡi Mlem gạt 1, cú cuối đập đất.
  const H=120;
  const CITY=Fin1City({seed:7, collapse:[{x:3400,z:0,t:T.far,r:1,v:1}]});
  const theme=t=>CITY.TH_NIGHT;
  const IMG={ C0:'assets/img/cine/FIN_AKA_CHUD.png', C1:'assets/img/cine/FIN_F1_CHUD_PULL.png', C2:'assets/img/cine/FIN_F1_CHUD_WHIP.png',
    M0:'assets/img/cine/FIN_AKA_MLEM.png', M1:'assets/img/cine/FIN_F1_MLEM_LICK.png',
    D0:'assets/avatars/doge/avatarUrl.webp', DB:'assets/avatars/doge/rageAvatarUrl.webp', DH:'assets/img/doge/DG_HAKI_IDLE.webp', DP1:'assets/img/doge/DG_HAKI_P1.webp', DP5:'assets/img/doge/DG_HAKI_P5.webp',
    K0:'assets/avatars/clappingcat/avatarUrl.webp', K1:'assets/avatars/clappingcat/skill1AvatarUrl.webp', K2:'assets/avatars/clappingcat/skill2AvatarUrl.webp', K3:'assets/avatars/clappingcat/skill3AvatarUrl.webp',
    BELL:'assets/img/doorbellchud/DC_BELL_IMG.webp', BALL:'assets/img/clappingcat/CLP_BALL_IMG.webp', ...window.FIN1_CITY_IMGS };
  const DIR={C0:0,C1:0,C2:-1,M0:0,M1:-1,D0:0,DB:0,DH:0,DP1:-1,DP5:0,K0:0,K1:0,K2:0,K3:0};
  const HT={C0:H*1.3,C1:H*1.42,C2:H*1.15,M0:H*1.0,M1:H*1.0,D0:H*0.72,DB:H*1.9,DH:H*1.9,DP1:H*1.75,DP5:H*1.9,K0:H*1.0,K1:H*1.0,K2:H*1.0,K3:H*1.0};
  // ───────── BIÊN ĐẠO [giây, x, ảnh, chuyển, nhoè, z, y] ─────────
  const CK=[[0,400,'C0',0,0,0,0],[T.adv,400,'C0'],[T.adv+0.4,240,'C0','eio',0,0],[T.pull1-0.2,240,'C0'],[T.pull1,240,'C1'],[T.ring1+0.3,240,'C0'],[T.swap1-0.01,240,'C0'],[T.swap1,-430,'C0',0,0,-80],
    [T.bhit,-430,'C0'],[T.bhit+0.3,-330,'C0','back',0,-60],[T.dt3+0.05,-330,'C0'],[T.tug-0.1,120,'C0','eio',0,-20],[T.ring2-0.35,120,'C1'],[T.ring2+0.3,120,'C0'],
    [T.swap2-0.01,120,'C0',0,0,-20],[T.swap2,240,'C0',0,0,0],[T.punch,240,'C0'],[T.land,560,'C0','eout',0,0,0],[T.pull4-0.15,560,'C0'],[T.pull4,560,'C1'],[T.shatter+0.1,560,'C0'],
    [T.bind-0.12,560,'C2'],[T.yank+0.3,560,'C2'],[T.sp1,560,'C2'],[T.sp2,575,'C0','back'],[T.slam,560,'C0'],[T.slam+0.3,660,'C0','back'],[T.DUR,660,'C0']];
  const MK=[[0,540,'M0',0,0,-110,0],[T.adv,540,'M0'],[T.adv+0.4,380,'M0','eio',0,-100],[T.lick1-0.05,380,'M1'],[T.lick2+0.25,380,'M0'],[T.lickA-0.05,380,'M1'],[T.lickA+0.3,380,'M0'],
    [T.tug-0.05,380,'M1'],[T.tug+0.35,380,'M0'],[T.frz-0.05,380,'M1'],[T.frz+0.3,380,'M0'],[T.bindE-0.05,380,'M1'],[T.swap3-0.01,380,'M1',0,0,-100],[T.swap3,200,'M0',0,0,0],[T.yank,200,'M0'],[T.yank+0.3,470,'M0','ein',1,-40],[T.sp3-0.05,470,'M1'],[T.sp3+0.25,470,'M0'],[T.slam,470,'M0'],[T.slam+0.3,520,'M0','back',0,-60],[T.DUR,520,'M0']];
  const DK=[[0,-420,'D0',0,0,60,0],[T.adv,-420,'D0'],[T.adv+0.4,-300,'D0','eio',0,60],[T.ring1,-300,'D0'],[T.tug,-300,'D0'],[T.tug+0.3,-60,'D0','ein',0,40],[T.morph,-60,'D0'],[T.morph+0.01,-60,'DB'],
    [T.haki+0.5,-60,'DB'],[T.hakiE,-60,'DH'],[T.charge,-60,'DH'],[T.punch-0.05,200,'DP1','ein',1,0],[T.punch+0.4,200,'DP1'],[T.bind,200,'DH'],[T.swap3-0.01,200,'DH',0,0,0],[T.swap3,380,'DH',0,0,-100],[T.claps,380,'DH',0,0,-100],
    [T.sp1-0.12,380,'DH',0,0,-100],[T.sp1-0.11,430,'DP1',0,0,-40],[T.sp1+0.12,430,'DP1'],[T.sp2-0.12,430,'DP1'],[T.sp2-0.11,690,'DP1',0,0,40],[T.sp2+0.12,690,'DP1'],[T.sp3-0.12,690,'DP1'],[T.sp3-0.11,520,'DP1',0,0,-170],[T.sp3+0.1,520,'DP1'],
    [T.slam-0.28,520,'DP1'],[T.slam-0.27,560,'DP5',0,0,-40,300],[T.slam,560,'DP5','ein',1,-40,0],[T.slam+0.3,300,'DH','back',0,0,0],[T.DUR,300,'DH']];   // mỗi tiếng vỗ: Doge biến mất → hiện ở phía khác của Chud
  const KK=[[0,-560,'K0',0,0,-90,0],[T.adv,-560,'K0'],[T.adv+0.4,-430,'K0','eio',0,-80],[T.clap1,-430,'K1'],[T.clap1+0.1,-430,'K2'],[T.clap1+0.2,-430,'K3'],[T.swap1-0.01,-430,'K3',0,0,-80],[T.swap1,240,'K0',0,0,0],
    [T.clap2,240,'K1'],[T.clap2+0.12,240,'K2'],[T.clap3-0.1,240,'K0'],[T.clap3,240,'K1'],[T.clap3+0.08,240,'K3'],[T.swap2-0.01,240,'K3',0,0,0],[T.swap2,120,'K0',0,0,-20],[T.clap4,120,'K1'],[T.clap4+0.1,120,'K3'],[T.claps,120,'K1'],[T.claps+0.12,120,'K2'],[T.claps+0.24,120,'K3'],[T.claps+0.36,120,'K1'],[T.claps+0.48,120,'K2'],[T.claps+0.6,120,'K3'],[T.claps+0.72,120,'K1'],[T.slam,120,'K0'],[T.slam+0.3,20,'K0','back'],[T.DUR,20,'K0']];
  // haki thức tỉnh: TRẬN ĐỨNG HÌNH 1s (Chud, Mlem, Clapping khựng; Doge vẫn biến đổi) + các cú khựng khi trúng
  const hsAll=W.hstop([[T.bhit,0.1],[T.ring2,0.1],[T.punch,0.16],[T.sp2,0.1],[T.slam,0.14]]), hsFrz=t=>(t>=T.haki&&t<T.hakiE)?T.haki:hsAll(t);
  const chud=t=>W.track(CK,hsFrz(t)), mlem=t=>W.track(MK,hsFrz(t)), doge=t=>W.track(DK,hsAll(t)), clap=t=>W.track(KK,hsFrz(t));
  const kFrozen=t=>t>=T.frz&&t<T.frz+1.0;
  const bound=t=>t>=T.bindE-0.15&&t<T.yank+0.35;   // vòng xích đang siết (quanh Doge, sau đổi chỗ là quanh Mlem)

  // ───────── MÁY QUAY ─────────
  const S=(t0,t1,a,b,ease)=>({t0,t1,a,b:b||a,ease:ease||'eio'});
  const OPEN={tx:0,ty:160,tz:0,dist:1500,yaw:-56,pitch:-6,fov:52,roll:-2};   // = máy trong lỗ vòng khói cuối fin1f2
  const shots=C.seq([
    S(0,T.face1,OPEN,{tx:0,ty:150,tz:0,dist:1360,yaw:-54,pitch:-5,fov:52,roll:-2}),
    ...C.pushIn(T.face1,{d:T.face2-T.face1,tx:-470,ty:80,tz:-10,dist:300,dist1:260,yaw:22,pitch:-5,fov:44,ox:-0.1}),                                         // đối mặt: Doge + Clapping
    ...C.pushIn(T.face2,{d:T.adv-T.face2,tx:460,ty:100,tz:-50,dist:300,dist1:265,yaw:-22,pitch:-5,fov:44,ox:0.1}),                                           // đối mặt: Chud + Mlem (áo Akatsuki)
    S(T.adv,T.lick1,{tx:-20,ty:90,tz:-20,dist:900,yaw:0,pitch:5,fov:46},{tx:-20,ty:90,tz:-20,dist:860,yaw:0,pitch:5,fov:46}),                                // 2 phe tiến vào, Doge bắn chữ meme
    S(T.lick1,T.pull1,{tx:120,ty:100,tz:-60,dist:420,yaw:-34,pitch:-4,roll:-6,fov:50}),                                                                     // lưỡi Mlem liếm chữ giữa không trung
    S(T.pull1,T.lickA,{tx:240,ty:170,tz:0,dist:330,yaw:24,pitch:-26,fov:52},{tx:240,ty:180,tz:0,dist:310,yaw:26,pitch:-28,fov:52},'lin'),                    // góc giun: Chud giật chuông, sóng âm toả
    S(T.lickA,T.ball,{tx:-100,ty:90,tz:-50,dist:760,yaw:12,pitch:6,fov:48}),                                                                                 // ① sóng làm 2 địch choáng → Mlem liếm Clapping
    S(T.ball,T.clap1,{tx:-700,ty:60,tz:-80,dist:520,yaw:30,pitch:4,fov:52},{tx:-520,ty:60,tz:-80,dist:480,yaw:30,pitch:4,fov:52},'lin'),                      // bóng chông lăn tới
    S(T.clap1,T.swap1,{tx:-430,ty:85,tz:-80,dist:220,yaw:-14,pitch:-4,fov:44,ox:-0.06}),                                                                     // cận Clapping vỗ tay
    S(T.swap1,T.dt1,{tx:-420,ty:80,tz:-70,dist:560,yaw:18,pitch:8,fov:50}),                                                                                  // ② ĐỔI CHỖ → bóng chông đâm Chud
    S(T.dt1,T.tug-0.1,{tx:-320,ty:90,tz:0,dist:360,yaw:-40,pitch:-6,roll:6,fov:50},{tx:-330,ty:90,tz:0,dist:340,yaw:-42,pitch:-6,roll:7,fov:50}),             //    Doge xả chữ vào Chud đang choáng
    S(T.tug-0.1,T.ring2,{tx:150,ty:90,tz:-20,dist:820,yaw:-4,pitch:6,fov:48},{tx:120,ty:90,tz:-20,dist:780,yaw:-4,pitch:6,fov:48}),                           // ③ lưỡi Mlem kéo Doge vào sát chuông
    S(T.ring2,T.clap2,{tx:20,ty:110,tz:0,dist:300,yaw:30,pitch:-14,roll:-6,fov:52}),                                                                          //    chuông reng sát mặt Doge
    S(T.clap2,T.dt4,{tx:280,ty:80,tz:-40,dist:300,yaw:-26,pitch:-4,fov:46}),                                                                                 // ④ Clapping định vỗ tay → bị Mlem đóng băng
    S(T.dt4,T.morph,{tx:180,ty:90,tz:-40,dist:760,yaw:6,pitch:5,fov:48}),                                                                                    //    Doge bắn trúng Mlem (phát 4, 5)
    S(T.morph,T.haki,{tx:-60,ty:110,tz:40,dist:420,yaw:16,pitch:-6,fov:50},{tx:-60,ty:130,tz:40,dist:480,yaw:16,pitch:-8,fov:50},'eout'),                   // ⑤ Doge hoá BUFF DOGE
    S(T.haki,T.hakiE,{tx:-60,ty:150,tz:40,dist:330,yaw:-20,pitch:-18,fov:50},{tx:-60,ty:160,tz:40,dist:290,yaw:-24,pitch:-20,fov:50},'lin'),                  //    HAKI thức tỉnh: trận đứng hình, 2 tay đen bóng
    S(T.hakiE,T.clap3,{tx:80,ty:110,tz:0,dist:620,yaw:-10,pitch:4,fov:50},{tx:140,ty:110,tz:0,dist:600,yaw:-10,pitch:4,fov:50},'ein'),                        // ⑥ Buff Doge lao vào Clapping
    S(T.clap3,T.punch,{tx:200,ty:95,tz:-10,dist:240,yaw:-24,pitch:-4,fov:46}),                                                                               //    Clapping vỗ tay ĐỔI CHỖ với Chud
    S(T.punch,T.punch+0.08,{tx:240,ty:110,tz:0,dist:220,yaw:-30,pitch:-6,roll:8,fov:56}),                                                                     //    Chud lãnh trọn đấm haki — khựng nhiều góc
    S(T.punch+0.08,T.punch+0.16,{tx:240,ty:100,tz:0,dist:240,yaw:48,pitch:-18,roll:-9,fov:58}),
    S(T.punch+0.16,T.pull4,{tx:380,ty:110,tz:0,dist:760,yaw:-6,pitch:4,fov:50},{tx:420,ty:110,tz:0,dist:720,yaw:-6,pitch:4,fov:50}),                         //    Chud văng ra
    S(T.pull4,T.shout,{tx:560,ty:190,tz:0,dist:320,yaw:-22,pitch:-24,fov:52},{tx:560,ty:200,tz:0,dist:300,yaw:-24,pitch:-26,fov:52},'lin'),                   //    lần giật thứ 4: CHUÔNG VỠ
    ...C.pushIn(T.shout,{d:T.bind-T.shout,tx:560,ty:120,tz:0,dist:280,dist1:230,yaw:-18,pitch:-8,fov:46,ox:0.08}),                                          //    Chud hét phẫn nộ, dây nung đỏ
    S(T.bind,T.bindE,{tx:360,ty:120,tz:-10,dist:560,yaw:-12,pitch:2,fov:50},{tx:330,ty:120,tz:-10,dist:520,yaw:-12,pitch:2,fov:50},'ein'),                  // ⑦ xích nung đỏ quấn TRÓI Buff Doge
    S(T.bindE,T.clap4,{tx:270,ty:110,tz:-50,dist:300,yaw:-34,pitch:-4,roll:-6,fov:50}),                                                                     //    Mlem phóng lưỡi định kết liễu
    S(T.clap4,T.swap3,{tx:120,ty:90,tz:-20,dist:200,yaw:-10,pitch:-4,fov:44}),                                                                              //    Clapping vỗ tay
    S(T.swap3,T.yank,{tx:290,ty:110,tz:-50,dist:320,yaw:-30,pitch:-4,roll:6,fov:50}),                                                                       //    ĐỔI CHỖ Doge ↔ Mlem: Mlem dính xích thay
    ...C.orbit(T.yank,{d:T.slam-T.yank,cut:0.15,tx:540,ty:120,tz:-40,dist:420,pitch:6,yaw0:-60,yaw1:70}),                                                 //    Chud giật nhầm Mlem → COMBAT TỐC ĐỘ CAO: mỗi tiếng vỗ Doge dịch chuyển sang 1 phía
    S(T.slam,T.mirror,{tx:500,ty:40,tz:0,dist:900,yaw:-14,pitch:30,fov:52}),                                                                                //    Doge đập đất từ trên xuống, sóng đẩy lùi cả 4
    ...C.mirror(T.mirror,{d:0.6,gap:0,cam:{dist:340,pitch:-4,ox:-0.1,yaw:20,fov:46},A:{tx:60,ty:110,tz:-10},B:{tx:500,ty:110,tz:-60},flip:true}),            // đối mặt 2 vs 2 soi gương
    S(T.mirror+1.2,T.far,{tx:300,ty:140,tz:0,dist:1250,yaw:-2,pitch:3,fov:50}),
    S(T.far,T.look,{tx:2600,ty:600,tz:0,dist:2600,yaw:-80,pitch:-4,fov:50}),                                                                                 // cuối đại lộ loé sáng tím trắng
    S(T.look,T.look+0.2,{tx:200,ty:200,tz:0,dist:200,yaw:-40,pitch:-4,fov:46}),                                                                              // cả 4 quay đầu nhìn (0.2s / con)
    S(T.look+0.2,T.look+0.4,{tx:-60+260,ty:110,tz:0,dist:220,yaw:-40,pitch:-4,fov:46}),
    S(T.look+0.4,T.look+0.6,{tx:560,ty:150,tz:0,dist:240,yaw:-40,pitch:-4,fov:46}),
    S(T.look+0.6,T.whip,{tx:380,ty:100,tz:-100,dist:220,yaw:-40,pitch:-4,fov:46}),
    S(T.whip,T.tunnel,{tx:500,ty:150,tz:0,dist:500,yaw:-10,pitch:0,fov:52},{tx:500,ty:150,tz:0,dist:500,yaw:-80,pitch:0,fov:52},'eio'),                      // lia giật theo đại lộ
    S(T.tunnel,T.DUR,{tx:2500,ty:200,tz:0,dist:600,yaw:-80,pitch:0,fov:60},{tx:5200,ty:220,tz:0,dist:600,yaw:-80,pitch:0,fov:62},'ein') ]);                // lao về phía trận Gojo vs Pain

  // ───────── VẼ CHIÊU ─────────
  // chữ meme Doge (game: font "Press Start 2P", vàng #ffe066 viền nâu #8b4513, quầng #f4a460, phập phồng)
  const WORDS=['wow','such aim','very shoot','much dmg','amaze','plz','so fast','many hurt','much wow'];
  const dogeText=(F,x,y,z,i,t,a)=>W.text3(F,x,y,z,WORDS[i%WORDS.length],24*(1+Math.sin(t*12+i)*0.06),{font:'"Press Start 2P",Impact,sans-serif',weight:'bold',col:'#ffe066',stroke:'#8b4513',glow:'#f4a460',a:a==null?1:a});
  // [giây bắn, đích ('C' | 'M' | 'mid1' | 'mid2'), giây chạm]
  const TXT=[[T.txt1,'mid',T.lick1],[T.txt2,'mid',T.lick2],[T.dt1-0.15,'C',T.dt1],[T.dt2-0.15,'C',T.dt2],[T.dt3-0.15,'C',T.dt3],[T.dt4-0.3,'M',T.dt4],[T.dt5-0.3,'M',T.dt5]];
  const mouthD=d=>[d.x+20,d.y+40,d.z-10], mouthM=m=>[m.x-34,m.y+62,m.z-6];
  // lưỡi Mlem: khối thon hồng từ mồm tới đích (vươn ra rồi thu về), [giây chạm, đích]
  function tongue(F,t,t0,tg,o){ o=o||{}; const out=o.out||0.12, back=o.back||0.18; if(t<t0-out||t>t0+back+(o.hold||0)) return; const m=mlem(t), A=mouthM(m);
    const k=t<t0?eout(seg(t,t0-out,t0)):t<t0+(o.hold||0)?1:1-ein(seg(t,t0+(o.hold||0),t0+(o.hold||0)+back)); const B=[lerp(A[0],tg[0],k),lerp(A[1],tg[1],k),lerp(A[2],tg[2],k)];
    const P=[]; for(let i=0;i<=8;i++){ const f=i/8; P.push([lerp(A[0],B[0],f),lerp(A[1],B[1],f)+Math.sin(Math.PI*f)*14*k,lerp(A[2],B[2],f)]); }
    W.taper(F,P,16,11,'#ff7aa2',{stroke:'#b8335c',shine:true}); }
  // chuông cửa trên đầu Chud + dây từ nắm tay giật xuống; rung khi reng
  function bell(F,t,c,ring){ const im=F.I.BELL; if(!im||!im.complete||!im.naturalWidth) return; const top=[c.x-8,c.y+HT.C1*0.98,c.z], B=[c.x-8,c.y+HT.C1*1.25,c.z];
    const P=K.proj(F.B,...B), Q=K.proj(F.B,...top); if(!P||!Q) return; const sh=ring?Math.sin(t*60)*0.25*(1-ring):0, w=56*P.s, h=w*im.naturalHeight/im.naturalWidth;
    F.list.push({d:P.d-8, fn:()=>{ const g=F.g; g.save(); g.strokeStyle='#d8c9a8'; g.lineWidth=Math.max(1.5,2.2*P.s); g.beginPath(); g.moveTo(Q.x,Q.y); g.lineTo(P.x,P.y); g.stroke();
      g.translate(P.x,P.y); g.rotate(sh); g.drawImage(im,-w*0.634,-h,w,h); g.restore(); }}); }
  // bóng chông Clapping lăn (ảnh game, xoay theo quãng lăn)
  function ball(F,x,z,rot,R){ const im=F.I.BALL, P=K.proj(F.B,x,R,z); if(!P||!im||!im.complete||!im.naturalWidth) return; const r=R*P.s;
    F.list.push({d:P.d, fn:()=>{ const g=F.g; g.save(); g.translate(P.x,P.y); g.rotate(rot); g.drawImage(im,-r,-r,r*2,r*2); g.restore(); }}); }
  const ballX=t=>lerp(-1150,-430,seg(t,T.ball,T.bhit));
  // nhoè + vạch tốc độ lúc đổi chỗ (game: clapFx smear/slines)
  function swapFx(F,t,ts,A,B){ if(t<ts-0.2||t>ts+0.25) return; const u=seg(t,ts-0.2,ts);
    for(const p of [A,B]){ const P=K.proj(F.B,p[0],70,p[1]); if(!P) continue; F.list.push({d:P.d-12, fn:()=>{ const g=F.g; g.save(); g.globalCompositeOperation='lighter'; const R=60*P.s*(1+u), a=t<ts?u:1-seg(t,ts,ts+0.25);
        const gr=g.createRadialGradient(P.x,P.y,0,P.x,P.y,R); gr.addColorStop(0,`rgba(255,240,180,${0.7*a})`); gr.addColorStop(1,'rgba(255,200,90,0)'); g.fillStyle=gr; g.fillRect(P.x-R,P.y-R,2*R,2*R);
        g.strokeStyle=`rgba(255,255,255,${0.7*a})`; g.lineWidth=2; for(let i=0;i<10;i++){ const y=P.y-R*0.8+i*R*0.17, L=R*(0.6+0.8*hash(i+ts)); g.beginPath(); g.moveTo(P.x-L,y); g.lineTo(P.x+L,y); g.stroke(); } g.restore(); }}); } }
  function world(F,t){ const th=theme(t); CITY.draw(F,t,th);
    const c=chud(t), m=mlem(t), d=doge(t), k=clap(t);
    const aura=t>=T.shout&&t<T.DUR?{preset:'fire',k:0.75,seed:5}:null, haki=t>=T.haki?{preset:'haki',k:t<T.hakiE?1.2:0.7,seed:8}:null;
    W.actor(F,{key:c.im,dir:DIR[c.im],x:c.x,z:c.z,y:c.y,h:HT[c.im],look:{x:d.x,z:d.z},smear:c.sm,aura,white:(t>=T.bhit&&t<T.bhit+0.06)||(t>=T.punch&&t<T.punch+0.07)?1:0,
      lean:t>=T.bhit&&t<T.bhit+0.4?-8:t>=T.look&&t<T.whip?6:0, life:{breath:t>=T.shout&&t<T.bind?2.4:0.6,wind:0.8,squash:K.squash(hsAll(t),T.land,0.4,0.1)}});
    W.actor(F,{key:m.im,dir:DIR[m.im],x:m.x,z:m.z,y:m.y,h:HT[m.im],look:{x:d.x,z:d.z},smear:m.sm,white:(t>=T.dt4&&t<T.dt4+0.06)||(t>=T.dt5&&t<T.dt5+0.06)?0.8:0,life:{breath:0.7,wind:0.8}});
    const dMorph=t>=T.morph&&t<T.morph+0.35, dk=d.im, dh=HT[dk]*(dMorph?lerp(0.45,1,eout(seg(t,T.morph,T.morph+0.35))):1);
    W.actor(F,{key:dk,dir:DIR[dk],x:d.x,z:d.z,y:d.y,h:dh,look:{x:c.x,z:c.z},smear:d.sm,aura:haki,white:dMorph?0.7*(1-seg(t,T.morph,T.morph+0.35)):(t>=T.ring2&&t<T.ring2+0.06?1:0),
      lean:(t>=T.ring1&&t<T.ring1+0.35)||(t>=T.ring2&&t<T.ring2+0.35)?-7:0, life:{breath:0.7,squash:K.squash(hsAll(t),T.slam,0.35,0.1)}});
    W.actor(F,{key:k.im,dir:0,x:k.x,z:k.z,y:k.y,h:HT[k.im],look:{x:c.x,z:c.z},smear:k.sm,lean:t>=T.ring1&&t<T.ring1+0.35?-7:0,life:kFrozen(t)?false:{breath:0.7}});
    if(kFrozen(t)) W.ice(F,{key:k.im,x:k.x,z:k.z,y:k.y,h:HT[k.im],seed:7},1-seg(t,T.frz+0.85,T.frz+1.0),t);
    K.smoke(F,{x:0,z:300,t0:-0.3,n:12,spread:1700,rise:30,life:3,size:90,seed:1,swirl:0.2,a:0.22,tint:'150,90,80'});
    // ── chữ meme Doge
    TXT.forEach(([s,who,hitT],i)=>{ if(t<s||t>hitT+0.25) return; const D0=doge(s), A=mouthD(D0); let B;
      if(who==='mid') B=[lerp(A[0],380,0.55),95,lerp(A[2],-100,0.55)]; else { const tg=who==='C'?chud(hitT):mlem(hitT); B=[tg.x,tg.y+85,tg.z]; }
      const u=seg(t,s,hitT); if(t<hitT){ dogeText(F,lerp(A[0],B[0],u),lerp(A[1],B[1],u)+Math.sin(Math.PI*u)*30,lerp(A[2],B[2],u),i,t); }
      else { const v=t-hitT; for(let q=0;q<4;q++) W.text3(F,B[0]+(q-1.5)*18+v*(q-1.5)*160,B[1]+v*120-v*v*400,B[2],'wow such'[q*2]||'w',16,{font:'"Press Start 2P",Impact,sans-serif',col:'#ffe066',stroke:'#8b4513',a:1-v*4}); } });   // chữ vỡ ra từng mảnh
    // ── lưỡi Mlem
    tongue(F,t,T.lick1,[lerp(mouthD(doge(T.txt1))[0],380,0.55),95,lerp(60,-100,0.55)]); tongue(F,t,T.lick2,[lerp(mouthD(doge(T.txt2))[0],380,0.55),95,lerp(60,-100,0.55)]);
    { const kk=clap(T.lickA); tongue(F,t,T.lickA,[kk.x,85,kk.z]); }
    { const dd=doge(T.tug); tongue(F,t,T.tug,[dd.x+10,60,dd.z],{hold:0.28,back:0.12}); }   // ③ quấn kéo Doge
    { const kk=clap(T.frz); tongue(F,t,T.frz,[kk.x,95,kk.z]); }
    { const dd=doge(T.bindE); tongue(F,t,T.bindE+0.2,[dd.x+40,120,dd.z],{out:0.2,back:0.15}); }   // Mlem phóng lưỡi vào Doge đang bị trói → hụt vì đổi chỗ
    // ── chuông Chud + sóng âm toả toàn sân (mỗi lần reng)
    const pulling=(t>=T.pull1&&t<T.ring1+0.4)||(t>=T.ring2-0.35&&t<T.ring2+0.4)||(t>=T.pull4&&t<T.shatter);
    if(pulling){ const rg=t>=T.ring1&&t<T.ring1+0.4?seg(t,T.ring1,T.ring1+0.4):t>=T.ring2&&t<T.ring2+0.4?seg(t,T.ring2,T.ring2+0.4):0; bell(F,t,c,rg||0); }
    for(const tr of [T.ring1,T.ring2]) if(t>=tr&&t<tr+0.9){ const cc=chud(tr); for(let i=0;i<3;i++){ const u=seg(t,tr+i*0.12,tr+0.75+i*0.12); if(u>0&&u<1) K.ring(F,cc.x,cc.z,40+1300*eout(u),16,0.8*(1-u),'255,236,180'); } }
    // chuông vỡ: 8 mảnh văng + bụi
    if(t>=T.shatter&&t<T.shatter+1.6){ const v=t-T.shatter, cc=chud(T.shatter); for(let i=0;i<8;i++){ const a=i/8*TAU, x=cc.x-8+Math.cos(a)*v*260, y=cc.y+HT.C1*1.18+Math.sin(a)*v*200+v*120-v*v*700, z=cc.z+Math.sin(a*1.7)*v*120, P=K.proj(F.B,x,Math.max(4,y),z); if(!P) continue;
        F.list.push({d:P.d, fn:()=>{ const g=F.g, s=Math.max(2,14*P.s); g.save(); g.translate(P.x,P.y); g.rotate(v*9+i); g.fillStyle=i%2?'#4a4f57':'#7b818b'; g.beginPath(); g.moveTo(-s,-s*0.5); g.lineTo(s,0); g.lineTo(-s*0.3,s*0.7); g.closePath(); g.fill(); g.restore(); }}); }
      K.sparks(F,{x:cc.x-8,y:cc.y+HT.C1*1.18,z:cc.z,t0:T.shatter,n:20,speed:500,life:0.5,seed:21,col:'230,230,240'}); }
    // ⛓️ dây nung đỏ quất ra rồi QUẤN TRÓI (vòng xoắn quanh thân) — Doge, sau khi đổi chỗ là Mlem; Chud giật (yank) kéo nạn nhân về phía mình
    if(t>=T.bind-0.12&&t<T.yank+0.35){ const cc=chud(t), vic=t<T.swap3?doge(t):mlem(t), vh=t<T.swap3?HT.DH:HT.M0, H0=[cc.x-40,cc.y+90,cc.z], u=seg(t,T.bind-0.12,T.bind+0.2);
      const tip=[lerp(H0[0],vic.x,u),lerp(H0[1],vic.y+vh*0.5,u),lerp(H0[2],vic.z,u)]; W.line(F,[H0,[lerp(H0[0],tip[0],0.5),Math.max(H0[1],tip[1])+30*(1-u),lerp(H0[2],tip[2],0.5)],tip],4,'#2a0d06',{glow:'rgba(255,90,20,0.65)',d:-6});
      if(u>=1){ const P=[]; for(let i=0;i<=40;i++){ const f=i/40, a=f*TAU*3.2+t*2, r=vh*(bound(t)?0.32:0.45)*(1-0.15*Math.sin(f*9)); P.push([vic.x+Math.cos(a)*r,vic.y+vh*(0.2+0.6*f),vic.z+Math.sin(a)*r]); } W.line(F,P,4,'#2a0d06',{glow:'rgba(255,90,20,0.6)',d:-14}); }
      if(t>=T.bind+0.2&&t<T.bind+0.5) K.sparks(F,{x:vic.x,y:vic.y+vh*0.5,z:vic.z,t0:T.bind+0.2,n:14,speed:380,life:0.4,seed:81,col:'255,140,60'}); }
    // ⚡ COMBAT TỐC ĐỘ CAO: mỗi lần dịch chuyển Doge — loé chỗ cũ + chỗ mới, va chạm ở mỗi cú
    for(const [ts,a,b] of [[T.sp1-0.11,[380,-100],[430,-40]],[T.sp2-0.11,[430,-40],[690,40]],[T.sp3-0.11,[690,40],[520,-170]],[T.slam-0.27,[520,-170],[560,-40]]]) swapFx(F,t,ts,a,b);
    if(t>=T.sp1&&t<T.sp1+0.4) K.sparks(F,{x:500,y:120,z:-30,t0:T.sp1,n:18,speed:480,life:0.4,seed:91,col:'255,140,60'});   // xích chặn nắm đấm
    if(t>=T.sp2&&t<T.sp2+0.5){ K.ring(F,600,0,30+380*eout(seg(t,T.sp2,T.sp2+0.45)),14,1-seg(t,T.sp2,T.sp2+0.45),'255,60,60'); K.sparks(F,{x:600,y:120,z:0,t0:T.sp2,n:24,speed:560,life:0.45,seed:92,col:'255,90,90'}); }   // trúng
    { const dd=doge(T.sp3); tongue(F,t,T.sp3,[dd.x+40,130,dd.z]); }   // lưỡi Mlem gạt nắm đấm sau lưng Chud
    // ── bóng chông + đổi chỗ
    if(t>=T.ball&&t<T.bhit+0.7){ const x=t<T.bhit?ballX(t):lerp(-430,-760,eout(seg(t,T.bhit,T.bhit+0.7))); ball(F,x,-80,x/36,46); }
    if(t>=T.bhit&&t<T.bhit+0.6){ K.sparks(F,{x:-430,y:70,z:-80,t0:T.bhit,n:22,speed:520,life:0.45,seed:31,col:'255,210,150'}); K.smoke(F,{x:-430,z:-80,t0:T.bhit,n:8,spread:160,rise:40,life:1,size:60,seed:32,a:0.5}); }
    swapFx(F,t,T.swap1,[-430,-80],[240,0]); swapFx(F,t,T.swap2,[240,0],[120,-20]);
    // ── HAKI thức tỉnh: nền tối thoáng qua, sét đen viền đỏ quanh Doge, hơi nước Gear 2, chữ doge haki bật ra
    if(t>=T.haki&&t<T.hakiE+0.4){ const v=t-T.haki, dd=doge(t), P=K.proj(F.B,dd.x,dd.y+110,dd.z); if(P) F.list.push({d:P.d-20, fn:()=>{ const g=F.g, R=150*P.s, fr=Math.floor(t*14);
        if(window.VfxGL) for(let i=0;i<4;i++){ const s=fr*7+i, an=hash(s)*TAU; VfxGL.boltSet(g,P.x+Math.cos(an)*R*0.4,P.y+Math.sin(an)*R*0.5,an,R*(0.6+0.6*hash(s+1)),Math.max(2,R*0.04),s,{core:'#07060a',rim:'#e8102c',glow:'rgba(255,20,40,0.28)'}); } }});
      for(let i=0;i<5;i++){ const w=['wow haki','such buff','too hard','very black','much armament'][i], a=-Math.PI/2+(i-2)*0.62, uu=v-i*0.1; if(uu<0||uu>1.1) continue; const dd2=doge(t);
        W.text3(F,dd2.x+Math.cos(a)*(120+160*eout(Math.min(1,uu*1.4))),dd2.y+140+Math.sin(a)*90+uu*30,dd2.z,w,20,{font:'"Comic Sans MS","Comic Sans",cursive',col:['#ff4081','#00e5ff','#ffea00','#76ff03','#ff9100'][i],stroke:'rgba(0,0,0,0.85)',a:1-seg(uu,0.8,1.1)}); }
      K.smoke(F,{x:dd.x,z:dd.z,t0:T.haki,n:14,spread:140,rise:260,life:1.4,size:90,seed:41,a:0.55,tint:'255,226,230'}); }
    // đấm haki trúng Chud · Doge phá băng đập đất
    if(t>=T.punch&&t<T.punch+0.6){ K.ring(F,240,0,30+500*eout(seg(t,T.punch,T.punch+0.5)),18,1-seg(t,T.punch,T.punch+0.5),'255,60,60'); K.sparks(F,{x:240,y:110,z:0,t0:T.punch,n:26,speed:620,life:0.5,seed:51,col:'255,90,90'}); }
    if(t>=T.slam&&t<T.slam+1.4){ const u=seg(t,T.slam,T.slam+0.7); K.ring(F,560,-40,40+900*eout(u),26,1-u,'255,70,70'); K.debris(F,{x:560,y:10,z:-40,t0:T.slam,n:36,speed:1000,life:1.3,size:26,seed:71,col:'#4a4246'});
      K.smoke(F,{x:560,z:-40,t0:T.slam,n:16,spread:600,rise:120,life:1.6,size:140,seed:72,a:0.55,tint:'130,104,96'}); }
    // ── cuối đại lộ: trận Gojo vs Pain va chạm — loé tím trắng + vòng sóng trên trời
    if(t>=T.far){ const v=t-T.far, P=K.proj(F.B,4200,700,0); if(P) F.list.push({d:5e8, fn:()=>{ const g=F.g, R=(300+2600*eout(Math.min(1,v*0.8)))*P.s; g.save(); g.globalCompositeOperation='lighter';
        let gr=g.createRadialGradient(P.x,P.y,0,P.x,P.y,R); gr.addColorStop(0,`rgba(255,255,255,${0.9*Math.max(0,1-v*0.6)})`); gr.addColorStop(0.3,'rgba(190,120,255,0.5)'); gr.addColorStop(0.7,'rgba(90,150,255,0.25)'); gr.addColorStop(1,'rgba(90,150,255,0)');
        g.fillStyle=gr; g.fillRect(P.x-R,P.y-R,2*R,2*R); g.strokeStyle=`rgba(230,220,255,${0.7*Math.max(0,1-v*0.7)})`; g.lineWidth=Math.max(2,R*0.02); g.beginPath(); g.ellipse(P.x,P.y,R*0.9,R*0.3,0,0,TAU); g.stroke(); g.restore(); }}); }
  }
  CineKit.film({ id:'fin1f1', title:'Final 1 · Fight · Chud + Mlem vs Doge + Clapping Cat', DUR:T.DUR, VW:960, VH:540, fadeIn:false, fadeOut:false,   // vào từ lỗ vòng khói fin1f2 · ra: lao theo đại lộ sang Gojo vs Pain
    imgs:IMG, cast:['dc','mlem','clap'],
    sfxOk:{ dc_bell:'mỗi lần giật chuông 1 tiếng reng (game), 2 lần reng', dc_chain:'2 nhát quật dây (game: mỗi nhát 1 tiếng)', mlem_lick:'mỗi cú liếm 1 tiếng (game)', mlem_freeze:'2 lần đóng băng (Clapping, tay Doge)',
      clap_cat:'mỗi lần vỗ tay 1 tiếng (game)', clap_tele:'2 lần đổi chỗ (game)' },
    sfx:[[0.1,'l2p_rumble',0.45,null,'vừa ra khỏi lỗ vòng khói: đại lộ, 2 phe 2 đầu'],
      [T.face1+0.1,'l2p_sub',0.4,null,'đối mặt: Doge nằm cười, Clapping vỗ tay chờ'],
      [T.face2+0.3,'ep3_shine',0.45,null,'đối mặt: Chud + Mlem áo Akatsuki'],
      [T.txt1,'ep3_whoosh',0.5,null,'Doge bắn chữ meme'],[T.txt2,'se_whoosh_fast',0.5,null,'Doge bắn chữ meme thứ 2'],
      [T.lick1,'mlem_lick',0.8,null,'lưỡi Mlem liếm nát chữ giữa không trung'],[T.lick2+0.03,'mlem_lick',0.8,null,'lưỡi Mlem liếm nát chữ thứ 2'],
      [T.pull1,'l2p_whoosh',0.4,null,'Chud với tay giật dây chuông'],
      [T.ring1,'dc_bell',1,null,'chuông reng, sóng âm toả toàn sân, 2 địch loạng choạng'],
      [T.lickA,'mlem_lick',0.8,null,'① Mlem tranh thủ liếm Clapping đang choáng'],
      [T.ball,'l2p_rumble',0.5,null,'bóng chông lăn ầm ầm tới'],
      [T.clap1,'clap_cat',1,null,'Clapping vỗ tay'],[T.swap1,'clap_tele',1,null,'② Clapping đổi chỗ với Chud'],
      [T.bhit,'hit_heavy',0.8,null,'bóng chông đâm trúng Chud'],
      [T.dt1,'ep3_klunk',0.5,null,'Doge xả chữ meme vào Chud đang choáng'],[T.dt2,'hit_light',0.5,null,'chữ meme thứ 2 vào Chud'],[T.dt3,'punch2',0.5,null,'chữ meme thứ 3 vào Chud'],
      [T.tug,'mlem_lick',0.85,null,'③ lưỡi Mlem quấn kéo Doge vào sát Chud'],
      [T.ring2,'dc_bell',1,null,'chuông reng sát mặt Doge'],
      [T.clap2,'clap_cat',0.8,null,'④ Clapping định vỗ tay đổi chỗ'],[T.frz,'mlem_freeze',1,null,'Mlem liếm, Clapping đóng băng giữa lúc vỗ tay'],
      [T.dt4,'hit_mid',0.5,null,'chữ meme thứ 4 vào Mlem'],[T.dt5,'se_impact_stop',0.6,null,'chữ meme thứ 5 vào Mlem'],
      [T.morph,'l2p_riser',0.6,null,'⑤ Doge phồng cơ hoá Buff Doge'],
      [T.haki,'cine_haki',1,null,'HAKI thức tỉnh: trận đứng hình, 2 tay đen bóng'],
      [T.charge,'ep3_whoosh',0.7,null,'Buff Doge lao vào Clapping'],
      [T.clap3,'clap_cat',1,null,'Clapping vỗ tay'],[T.swap2,'clap_tele',1,null,'⑥ Clapping đổi chỗ với Chud'],
      [T.punch,'cine_strongpunch',1,null,'nắm đấm haki trúng Chud'],[T.land,'cine_impact',0.5,null,'Chud văng ngã xuống đường'],
      [T.shatter,'dc_rock',1,null,'lần giật thứ 4: chuông vỡ tan'],[T.shout,'dc_rage',1,null,'Chud hét phẫn nộ, dây nung đỏ'],
      [T.bind,'dc_chain',1,null,'⑦ dây nung đỏ quất ra quấn trói Buff Doge'],[T.bind+0.22,'l2p_chains',0.6,null,'xích siết chặt quanh người'],
      [T.bindE,'mlem_lick',0.85,null,'Mlem phóng lưỡi định kết liễu Doge đang bị trói'],
      [T.clap4+0.05,'clap_cat',1,null,'Clapping vỗ tay cứu đồng đội'],[T.swap3+0.05,'clap_tele',1,null,'đổi chỗ Doge ↔ Mlem: Mlem dính xích thay'],
      [T.claps-0.03,'clap_cat',0.9,null,'Clapping vỗ tay liên hồi, Doge dịch chuyển tốc độ cao'],
      [T.sp1,'se_impact_stop',0.8,null,'Doge hiện bên trái, Chud gồng xích chặn nắm đấm'],[T.sp2,'cine_strongpunch',1,null,'Doge hiện bên phải, nắm đấm trúng Chud'],
      [T.sp3,'mlem_lick',0.8,null,'Doge hiện sau lưng, lưỡi Mlem gạt nắm đấm'],[T.slam,'cine_deep_impact',1,null,'Doge từ trên đầu đập đất, sóng đẩy lùi cả 4'],
      [T.mirror,'l2p_sub',0.5,null,'đối mặt 2 vs 2 soi gương'],
      [T.far,'kn_boom_low',0.8,null,'cuối đại lộ nổ loé tím trắng, tiếng nổ dội từ xa'],
      [T.whip,'l2p_whoosh',0.7,null,'máy lia giật theo đại lộ'],[T.tunnel,'l2p_riser',0.7,null,'máy lao về phía trận Gojo vs Pain']],
    mus:[{src:'assets/audio/dp_akatsuki.mp3',ra:0,rb:T.DUR,vol:0.55,loop:true,fi:0.3,fo:0.6}],
    theme:t=>theme(t), shots,
    impact:C.negFrames([T.bhit,T.ring2,T.sp1,T.sp2,T.sp3],0.07,'inv',[T.punch,T.slam]),
    shake:t=>{ let s=0; const h=(a,amp,d)=>{ if(t>=a&&t<a+d) s=Math.max(s,amp*(1-(t-a)/d)); };
      h(T.ring1,6,0.5); h(T.ring2,8,0.5); h(T.bhit,10,0.4); h(T.haki,6,1.0); h(T.punch,16,0.6); h(T.shatter,8,0.4); h(T.shout,5,0.9); h(T.bind+0.2,6,0.3); h(T.sp2,10,0.35); h(T.slam,18,0.8); h(T.far,6,1.0); return s; },
    world, post(F,t){ const fx={shocks:[]}; const sh=(a,x,y,z,rm,d,str)=>{ if(t>=a&&t<a+d){ const u=(t-a)/d; fx.shocks.push({x,y,z,r:20+rm*eout(u),w:26,str:str*(1-u)}); fx.chroma=Math.max(fx.chroma||0,2*(1-u)); } };
      sh(T.ring1,240,200,0,500,0.6,20); sh(T.ring2,120,200,-20,500,0.6,24); sh(T.punch,240,110,0,420,0.5,32); sh(T.slam,560,20,-40,700,0.7,34); sh(T.sp2,600,120,0,300,0.4,22); sh(T.haki,-60,120,40,400,1.0,18); return fx; },
    screen(F,t){ const g=F.g, VW=F.VW, VH=F.VH;
      if(t>=T.haki&&t<T.hakiE){ g.save(); g.globalAlpha=0.3*Math.min(1,(t-T.haki)*6); g.fillStyle='#05030a'; g.fillRect(0,0,VW,VH); g.restore(); }   // trận đứng hình: nền tối thoáng qua (game hakion)
      if(t>=T.charge&&t<T.clap3) K.panLines(F,{k:0.8,ang:0,n:28});
      if(C){ C.whipFx(F,t,T.whip,T.tunnel-T.whip); C.speedTunnel(F,t,T.tunnel,T.DUR-T.tunnel); }
      K.sfxText(F,'DING!',VW*0.5,VH*0.24,{t0:T.ring1,life:0.5,px:76,rot:-6,col:'#ffe9a0'});
      K.sfxText(F,'BELL BROKEN!',VW*0.5,VH*0.22,{t0:T.shatter+0.05,life:0.8,px:60,rot:-4,col:'#cfd8dc'});
      K.letterbox(F,t>=T.mirror&&t<T.far?0.8:0);
      K.vignette(F,0.5); } });
})();
