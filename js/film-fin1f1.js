// 🧊⛓️ Meme Lore · FINAL · Part 1 — TRẬN PHỤ 1: DOORBELL CHUD (dạng Kratos, 2 xích nung đỏ, áo Akatsuki) + MLEM CAT vs BUFF DOGE + CLAPPING CAT — CÔNG VIÊN ĐÊM (dựng lại 12/11/2026)
//   KỊCH BẢN ANH (11–12/11): Doge + Clapping VỪA ĐƯỢC TRUYỀN TỐNG XUỐNG (cột sáng guardian vàng + trắng ở cảnh nối fin1c5), đang nhìn quanh thì bị TẬP KÍCH:
//   Doge đang đi thì XÍCH quấn quanh người (Chud, đã sẵn dạng Kratos — KHÔNG giật chuông) và bị Mlem liếm ĐÓNG BĂNG luôn → Chud + Mlem đi ra VÂY Clapping,
//   Clapping chỉ CƯỜI VỖ TAY → không gian CHẤN ĐỘNG, 2 con quay ra thấy BĂNG NỨT DẦN → Doge HOÁ TO (Buff Doge) lao tới (meme One-Punch Shiba anh gửi = cảnh charge)
//   HÚC VĂNG Chud, cả 2 ĐÂM XUYÊN mấy dãy nhà → Clapping CHE MỒM nhìn theo bất lực (trước) → rồi quay lại đứng GIƠ TAY như meme với Mlem.
//   ⚠️ Trận này Clapping + Mlem CHƯA đánh, chỉ đứng nhìn. GIAO TRANH CHÍNH = CHUD (XÍCH) vs BUFF DOGE (TAY BO), anh chọn mẫu Kurapika vs Uvogin (HxH):
//   người dùng xích giữ TẦM XA, quất / trói / đu xích né; tay bo lao vào, đỡ đòn bị đẩy lùi, cúi né, nắm đấm toàn lực nện nát mặt đất.
//   LÚC ĐẦU DOGE THẤT THẾ (bị quất lùi, đấm hụt, bị trói 2 tay, bị nhấc lên quật xuống đất) → giao tranh căng nhất mới BẬT HAKI → GIẬT TAN XÍCH → 2 con lao vào nhau → chuyển cảnh.
//   CHỮ KÝ RIÊNG (anh dặn "đừng dùng mãi 1 công thức"): mở yên lặng không nhạc, đánh lén từ bóng tối, tĩnh lâu (khối băng, vỗ tay lạc lõng), sức ép dâng dần,
//   1 SHOT DÀI bám cú húc xuyên 3 dãy nhà, nhịp hài (che mồm), rồi trận chính quay NGANG giữ trục (Chud 1 bên, Doge 1 bên) để thấy rõ tầm xích.
//   Chiêu đúng game: Chud dạng phẫn nộ 2 dây kiểu Kratos (`DC_RG`, dây nung đỏ `_dcCord`, `dc_chain`) · Mlem liếm + đóng băng (`mlem_lick`, `mlem_freeze`) ·
//   Doge → Buff Doge → HAKI lần đầu (trận đứng hình 1s, 2 tay đen bóng) · Clapping vỗ tay (`clap_cat`).
(function(){
  if(!window.CineKit || CineKit.films.fin1f1) return;
  const BASE=((document.currentScript&&document.currentScript.src)||'js/film-fin1f1.js').replace(/film-[^\/]*$/,''), V=window.GAME_VERSION?'?v='+GAME_VERSION.build:'';
  for(const [g,f] of [['PIXI_FILTERS_GLSL','vendor/pixi-filters/glsl.js'],['Fin1City','fin1-city.js'],['Fin1Fight','fin1-fight.js']]) if(!window[g]){ try{ const x=new XMLHttpRequest(); x.open('GET',BASE+f+V,false); x.send(); (0,eval)(x.responseText); }catch(e){} }
  const K=CineKit, {seg,lerp,clamp,hash}=K, E=K.EASE, eout=E.eout, ein=E.ein, eio=E.eio, C=K.cam, W=window.Fin1Fight, TAU=Math.PI*2;
  const FX=()=>window.CineKitFx;
  const T={ strikeD:0.5, strikeK:0.85, landD:2.2, landK:3.6,   // ĐÁP XUỐNG kiểu cổng BIFROST (anh dặn 12/11: "chiếu xuống kiểu cổng Bifrost của Thor", "đáp xuống chất tí")
    look:4.6, lurk:6.8, bind:8.8, lick:9.5, frz:9.62, hold:11, out:13.8, surr:17, laugh:19.4, puzzle:22.6, shake:24.4, turn:26.4, crack:27.4, eye:29, quiet:30, 
    burst:30.6, charge:31.6, ram:32.4, b1:33.3, b2:34.2, b3:35.1, dust:36.4, cover:38.8, mturn:41.6, raise:43.2, rise:45.6, chains:48.6, r1:50.2, w1:51.4, r2:53.6, 
    w2:54.35, punch:54.85, zip:54.8, tie0:57, tie:57.6, tug:59.4, lift:62.6, slam:63.2, down:64.4, haki:66.9, hakiOn:67.6, pull:69.4, snap:70.6, shock:71.9, 
    lunge:73.9, clash:75.1, far:75.6, whip:76.45, tunnel:76.7, DUR:77.65 };
  const H=120;
  // đường húc: từ chỗ Chud đứng bay chéo vào sâu, xuyên 3 dãy nhà phía sau công viên
  const CH0=[60,200], DIRV=[0.64,0.77], RAM=k=>[CH0[0]+DIRV[0]*k, CH0[1]+DIRV[1]*k];
  const HITS=[[T.b1,2143],[T.b2,3896],[T.b3,5650]];   // [giây xuyên, quãng đường] — giữa dãy 1 / 2 / 3
  const FZ=[4550,5600];   // bãi trống sau dãy nhà thứ 3 (2 con văng tới đây) — nơi đánh trận chính, đống đổ nát sau lưng
  const PIL=[FZ[0]+860,420,FZ[1]+140];   // cột bê tông gãy Chud quăng xích quấn vào để đu né cú đấm
  const CITY=Fin1City({seed:7, kind:'park', collapse:HITS.map(([t,k])=>{ const p=RAM(k); return {x:p[0],z:p[1],t,r:520,v:9000}; }).concat([{x:9000,z:0,t:T.far,r:1,v:1}])});
  const theme=t=>CITY.TH_PARK;
  const IMG={ C0:'assets/img/cine/FIN_AKA_CHUD.png', CK0:'assets/img/cine/FIN_F1_CHUD_K0.png', CK1:'assets/img/cine/FIN_F1_CHUD_K1.png', CK2:'assets/img/cine/FIN_F1_CHUD_K2.png', CK3:'assets/img/cine/FIN_F1_CHUD_K3.png', CK4:'assets/img/cine/FIN_F1_CHUD_K4.png',
    M0:'assets/img/cine/FIN_AKA_MLEM.png',
    D0:'assets/avatars/doge/avatarUrl.webp', DB:'assets/avatars/doge/rageAvatarUrl.webp', DZ:'assets/img/cine/FIN_F1_DOGE_ONEPUNCH.png',
    DBL:'assets/img/cine/FIN_F1_DOGE_BLOCK.png', DRN:'assets/img/cine/FIN_F1_DOGE_RUN.png', DDK:'assets/img/cine/FIN_F1_DOGE_DUCK.png', DPU:'assets/img/cine/FIN_F1_DOGE_PUNCH.png', DGP:'assets/img/cine/FIN_F1_DOGE_GPUNCH.png', DPL:'assets/img/cine/FIN_F1_DOGE_PULL.png', DHP:'assets/img/cine/FIN_F1_DOGE_HPULL.png',
    DH:'assets/img/doge/DG_HAKI_IDLE.webp', DP1:'assets/img/doge/DG_HAKI_P1.webp',
    // 🎥 ĐA GÓC (12/11): Buff Doge đứng thủ 5 góc · Buff Doge lao tới (sau lưng / chính diện / 3/4 sau) · Chud Kratos thủ thế 5 góc
    DBF:'assets/img/cine/FIN_F1_DB_front.png', DBQ:'assets/img/cine/FIN_F1_DB_q3f.png', DBS:'assets/img/cine/FIN_F1_DB_side.png', DBQB:'assets/img/cine/FIN_F1_DB_q3b.png', DBB:'assets/img/cine/FIN_F1_DB_back.png',
    DRB:'assets/img/cine/FIN_F1_DRUN_back.png', DRF:'assets/img/cine/FIN_F1_DRUN_front.png', DRQ:'assets/img/cine/FIN_F1_DRUN_q3b.png',
    DDL:'assets/img/cine/FIN_F1_DDOWN_lie.png', DKN:'assets/img/cine/FIN_F1_DDOWN_kneel.png', DUP:'assets/img/cine/FIN_F1_DDOWN_up.png',
    DPF:'assets/img/cine/FIN_F1_DPUN_front.png', DPB:'assets/img/cine/FIN_F1_DPUN_back.png', DPQ:'assets/img/cine/FIN_F1_DPUN_q3b.png',
    CWB:'assets/img/cine/FIN_F1_CWHIP_back.png', CWF:'assets/img/cine/FIN_F1_CWHIP_front.png', CWQ:'assets/img/cine/FIN_F1_CWHIP_q3b.png',
    CHF:'assets/img/cine/FIN_F1_CHIT_fly.png', CHL:'assets/img/cine/FIN_F1_CHIT_lie.png', CHK:'assets/img/cine/FIN_F1_CHIT_kneel.png',
    CKF:'assets/img/cine/FIN_F1_CK_front.png', CKQ:'assets/img/cine/FIN_F1_CK_q3f.png', CKS:'assets/img/cine/FIN_F1_CK_side.png', CKQB:'assets/img/cine/FIN_F1_CK_q3b.png', CKB:'assets/img/cine/FIN_F1_CK_back.png',
    K0:'assets/avatars/clappingcat/avatarUrl.webp', KR:'assets/avatars/clappingcat/rageAvatarUrl.webp', K1:'assets/avatars/clappingcat/skill1AvatarUrl.webp', K2:'assets/avatars/clappingcat/skill2AvatarUrl.webp', K3:'assets/avatars/clappingcat/skill3AvatarUrl.webp',
    CORD:'assets/img/doorbellchud/DC_CORD_IMG.webp', ...window.FIN1_CITY_IMGS };
  // hướng ảnh: −1 nhìn TRÁI · 1 nhìn / đánh về PHẢI · 0 chính diện. Chud K1–K4: tay quất nằm bên PHẢI ảnh → coi như "nhìn phải"
  const DIR={DGP:1,C0:0,CK0:0,CK1:1,CK2:1,CK3:1,CK4:1,M0:0,D0:0,DB:0,DZ:1,DBL:-1,DRN:-1,DDK:-1,DPU:-1,DPL:-1,DHP:-1,DH:0,DP1:-1,K0:0,KR:0,K1:0,K2:0,K3:0};
  // chiều cao: ảnh vẽ cùng tỉ lệ người → cao theo khung hình của từng tư thế (ngồi thấp thì khung thấp)
  const HT={DGP:H*1.45,DDL:H*0.84,DKN:H*1.65,DUP:H*1.9,DPF:H*1.8,DPB:H*1.8,DPQ:H*1.8,CWB:H*1.3,CWF:H*1.3,CWQ:H*1.3,CHF:H*1.15,CHL:H*0.45,CHK:H*1.05,
    DBF:H*1.9,DBQ:H*1.9,DBS:H*1.9,DBQB:H*1.9,DBB:H*1.9,DRB:H*1.75,DRF:H*1.75,DRQ:H*1.75,CKF:H*1.25,CKQ:H*1.25,CKS:H*1.25,CKQB:H*1.25,CKB:H*1.25,C0:H*1.3,CK0:H*1.17,CK1:H*1.19,CK2:H*1.41,CK3:H*0.96,CK4:H*1.17,M0:H*1.0,D0:H*0.72,DB:H*1.9,DZ:H*1.55,DBL:H*1.9,DRN:H*1.5,DDK:H*1.12,DPU:H*1.8,DPL:H*1.7,DHP:H*1.7,DH:H*1.9,DP1:H*1.75,
    K0:H*1.0,KR:H*1.08,K1:H*1.0,K2:H*1.0,K3:H*1.0};
  // chuôi xích trong tay Chud (tỉ lệ khung ảnh đã cắt, đo bằng lưới): [tay 0, tay 1]; WHIP = tay đang quất của tư thế
  // điểm tay / chuôi xích (tỉ lệ trên ảnh đã cắt, đo bằng lưới 10×10 — 12/11 đo lại sau khi vẽ lại Doge đúng chất meme)
  const HAND={DGP:[[0.9,0.95],[0.08,0.5]],DPL:[[0.03,0.31],[0.03,0.43]],DHP:[[0.03,0.14],[0.05,0.27]],DBL:[[0.12,0.15],[0.3,0.13]],DB:[[0.33,0.27],[0.7,0.27]],DPU:[[0.02,0.4],[0.02,0.4]],DRN:[[0.06,0.55],[0.85,0.45]],DDK:[[0.05,0.75],[0.2,0.8]],DH:[[0.2,0.62],[0.8,0.62]],
    DBF:[[0.33,0.27],[0.7,0.27]],DBQ:[[0.3,0.27],[0.62,0.27]],DBS:[[0.06,0.35],[0.1,0.37]],DBQB:[[0.1,0.35],[0.4,0.33]],DBB:[[0.1,0.4],[0.9,0.4]],DRB:[[0.1,0.55],[0.88,0.55]],DRF:[[0.12,0.55],[0.88,0.55]],DRQ:[[0.05,0.55],[0.6,0.5]],
    DDL:[[0.6,0.28],[0.66,0.36]],DKN:[[0.12,0.75],[0.75,0.55]],DUP:[[0.3,0.33],[0.6,0.33]],
    CKF:[[0.02,0.39],[0.97,0.38]],CKQ:[[0.05,0.39],[0.65,0.42]],CKS:[[0.05,0.38],[0.1,0.4]],CKQB:[[0.05,0.41],[0.92,0.4]],CKB:[[0.03,0.4],[0.95,0.4]],
    CWB:[[0.07,0.45],[0.92,0.1]],CWF:[[0.85,0.45],[0.4,0.27]],CWQ:[[0.1,0.47],[0.8,0.02]],CHF:[[0.3,0.12],[0.48,0.1]],CHL:[[0.4,0.35],[0.55,0.4]],CHK:[[0.02,0.42],[0.98,0.42]],
    C0:[[0.18,0.55],[0.82,0.55]],CK0:[[0.05,0.43],[0.96,0.43]],CK1:[[0.04,0.03],[0.62,0.48]],CK2:[[0.83,0.02],[0.88,0.47]],CK3:[[0.05,0.47],[0.97,0.04]],CK4:[[0.12,0.27],[0.97,0.38]]};
  const VIEWS={ DB:{v:{front:'DBF',q3f:'DBQ',side:'DBS',q3b:'DBQB',back:'DBB'},face:{q3f:1}},
    DPU:{v:{side:'DPU',front:'DPF',back:'DPB',q3b:'DPQ'},face:{q3b:1}},
    CK2:{v:{side:'CK2',front:'CWF',back:'CWB',q3b:'CWQ'},face:{side:1,q3b:1}}, CK4:{v:{side:'CK4',front:'CWF',back:'CWB',q3b:'CWQ'},face:{side:1,q3b:1}},
    CK0:{v:{front:'CKF',q3f:'CKQ',side:'CKS',q3b:'CKQB',back:'CKB'}},
    DZ:{v:{side:'DZ',back:'DRB',q3b:'DRQ',front:'DRF'},face:{q3b:1,side:1}},   // ảnh One-Punch Shiba gốc quay mặt PHẢI     // CHARGE: nhìn ngang = meme One-Punch Shiba · từ sau lưng = Buff Doge lao đi (anh 12/11: "quay mặt ra ngoài nhưng lao về phía trước")
    DRN:{v:{side:'DRN',back:'DRB',q3b:'DRQ',front:'DRF'},face:{q3b:1}} };
  // vẽ nhân vật theo góc máy: ảnh có bộ đa góc → chọn góc, trả {flip,key} (key = ảnh thật vừa vẽ, để gắn xích / tay đúng)
  function act(F,o){ const V=VIEWS[o.key]; if(!V) return {flip:W.actor(F,o), key:o.key}; const key0=o.key; const fl=W.actor(F,Object.assign({},o,{views:V.v,vface:V.face||null,face:o.face||null}));
    const k=F._actorKey||key0; return {flip:fl, key:k}; }
  // ───────── BIÊN ĐẠO [giây, x, ảnh, chuyển, nhoè, z, y] ─────────
  // phần công viên
  const DK=[[0,-640,'D0',0,0,-240,520],[T.strikeD,-640,'D0',0,0,-240,520],[T.landD,-640,'D0','ein',0,-240,0],[T.look,-560,'D0','eout',0,-230,0],[T.bind,-300,'D0','lin',0,-185,0],[T.bind+0.2,-262,'D0','eout',0,-180,0],[T.burst,-260,'DB',0,0,-180,0],[T.charge-0.1,-270,'DB',0,0,-190,0],
    [T.charge,-250,'DZ',0,0,-170,30],[T.ram,CH0[0]-80,'DZ','ein',1,CH0[1]-90,60]];   // từ T.ram: Doge + Chud bay theo RAM()
  const KK=[[0,-486,'K3',0,0,-368,520],[T.strikeK,-486,'K3',0,0,-368,520],[T.landK,-486,'K3','ein',0,-368,0],[T.look,-440,'K3','eout',0,-340,0],[T.bind+0.4,-150,'K3','lin',0,-70,0],[T.bind+0.8,-120,'K3','eout',0,-60,0],[T.DUR,-120,'K3',0,0,-60,0]];
  const MK=[[0,380,'M0',0,0,620,0],[T.out,380,'M0',0,0,620,0],[T.surr,-300,'M0','eio',0,160,0],[T.laugh,-330,'M0','eio',0,90,0],[T.DUR,-330,'M0',0,0,90,0]];
  const CK=[[0,560,'CK0',0,0,760,0],[T.bind-0.5,560,'CK1',0,0,760,0],[T.bind-0.25,560,'CK2',0,0,760,0],[T.bind+0.4,560,'CK0',0,0,760,0],[T.out+0.3,560,'CK0',0,0,760,0],
    [T.surr+0.3,150,'CK0','eio',0,260,0],[T.laugh,CH0[0],'CK0','eio',0,CH0[1],0],[T.DUR,CH0[0],'CK0',0,0,CH0[1],0]];
  // trận chính: x LOCAL quanh FZ (z = FZ[1]); Doge bên trái số nhỏ, Chud bên số lớn
  const DM=[[T.rise,-260,'DKN',0,0,0,0],[T.rise+1.3,-260,'DUP'],[T.rise+2.3,-260,'DB'],[T.w1-0.5,-260,'DB'],[T.w1-0.42,-250,'DRN','eout'],[T.w1,-40,'DRN','ein',1],[T.w1+0.05,-40,'DBL'],[T.w1+0.9,-300,'DBL','back'],[T.w1+1.6,-300,'DB'],   // lao vào → ăn xích → đỡ, bị đẩy lùi
    [T.w2-0.45,-300,'DB'],[T.w2-0.38,-290,'DRN','eout'],[T.w2-0.08,-130,'DRN','ein',1],[T.w2,-110,'DDK','eout'],[T.w2+0.25,60,'DDK','ein',1],[T.punch-0.12,60,'DPU','eout'],[T.punch-0.03,35,'DGP','ein',1],[T.punch+1.4,35,'DGP'],   // cúi né dưới xích → áp sát → đấm hụt nện đất
    [T.tie0,170,'DB'],[T.tie,175,'DPL','eout'],[T.tug,190,'DPL'],[T.lift-0.2,300,'DPL','lin',0,0,0],[T.lift,310,'DB','eout',0,0,40],[T.slam,380,'DDL','ein',1,0,0],[T.down,380,'DDL'],   // bị trói, giằng co, bị kéo lê → nhấc lên quật xuống
    [T.haki,380,'DDL'],[T.haki+0.3,380,'DKN'],[T.hakiOn,380,'DH'],[T.pull,380,'DHP','eout'],[T.snap,365,'DHP'],[T.snap+0.4,360,'DH','back'],[T.lunge,360,'DH'],[T.clash-0.5,345,'DP1','eout'],[T.clash-0.27,345,'DP1'],[T.clash,495,'DP1','ein',1],[T.DUR,495,'DP1']];
  const CM=[[T.rise,300,'CHL',0,0,0,0],[T.rise+1.1,300,'CHK'],[T.rise+2.1,300,'CK0'],[T.r1+0.6,300,'CK0'],[T.r1+0.8,305,'CK1','eout'],[T.w1-0.06,305,'CK1'],[T.w1,300,'CK2','ein'],[T.w1+0.7,300,'CK2'],[T.w1+1.0,300,'CK0'],
    [T.r2+0.3,300,'CK0'],[T.r2+0.45,305,'CK3','eout'],[T.w2-0.05,305,'CK3'],[T.w2,300,'CK4','ein'],[T.zip,300,'CK4'],[T.zip+0.45,620,'CK1','eout',1,0,80],[T.zip+0.8,620,'CK0','ein',0,0,0],   // quất trượt → quăng xích vào cột, đu né cú đấm
    [T.tie0,620,'CK0'],[T.tie0+0.2,625,'CK1','eout'],[T.tie-0.04,625,'CK1'],[T.tie,620,'CK2','ein'],[T.tug,640,'CK1','eout'],[T.lift-0.2,650,'CK1'],[T.lift,640,'CK4','ein'],[T.slam,640,'CK4'],[T.down,640,'CK0'],
    [T.down+1.2,740,'CK0','eio'],[T.snap,740,'CK0'],[T.snap+0.25,700,'CK0','eout'],[T.shock,700,'CK0'],[T.lunge,700,'CK0'],[T.clash-0.5,712,'CK1','eout'],[T.clash-0.27,712,'CK1'],[T.clash,650,'CK2','ein',1],[T.DUR,650,'CK2']];
  const doge=t=>W.track(DK,t), clap=t=>W.track(KK,t), mlem=t=>W.track(MK,t), chud=t=>W.track(CK,t);
  const hs=W.hstop([[T.w1,0.16],[T.punch,0.18],[T.slam,0.2],[T.hakiOn,1.0],[T.snap,0.2]]);   // HAKI: trận đứng hình 1s (đúng game)
  const dogeM=t=>W.track(DM,hs(t)), chudM=t=>W.track(CM,hs(t));
  const walking=(t,a,b)=>t>=a&&t<b?Math.abs(Math.sin(t*8.5))*5:0;   // nhún khi đi
  const CLAPS=[18.35,18.8,19.25,19.7,20.15,20.6];   // Clapping cười vỗ tay (mỗi cái 1 tiếng, đúng game)
  const clapPose=t=>{ for(let i=CLAPS.length-1;i>=0;i--) if(t>=CLAPS[i]) return t-CLAPS[i]<0.12?'K2':(i%2?'K1':'K3'); return 'K3'; };
  const kImg=t=>t>=T.raise+0.35?'KR':t>=T.cover?'K0':(t>=T.laugh&&t<T.puzzle)?clapPose(t):'K3';
  const flyK=t=>{ if(t<T.ram) return 0; const u=t-T.ram; return Math.min(6200, 2600*u - (u>1?120*(u-1)*(u-1):0)); };
  const flyA=t=>t<T.b3+0.25?1:1-seg(t,T.b3+0.25,T.b3+0.6);
  // ───────── MÁY QUAY ─────────  (yaw 0 = nhìn vào sâu +z; dãy nhà ở sau công viên z ≥ 1500)
  const S=(t0,t1,a,b,ease)=>({t0,t1,a,b:b||a,ease:ease||'eio'});
  const OPEN={tx:-560,ty:110,tz:-180,dist:900,yaw:-40,pitch:-4,fov:52,roll:-2};   // = máy ô tròn (lỗ vòng khói) cuối fin1f2 → nối liền
  const FX0=FZ[0], FZz=FZ[1];
  const shots=C.seq([
    S(0,1.5,OPEN,{tx:-540,ty:130,tz:-200,dist:860,yaw:-38,pitch:-6,fov:52,roll:-2},'lin'),                                                                // toàn: công viên đêm yên lặng → 2 cột BIFROST giáng xuống (vàng rồi trắng)
    S(1.5,3.0,{tx:-640,ty:150,tz:-240,dist:420,yaw:-28,pitch:-20,fov:50},{tx:-640,ty:90,tz:-240,dist:360,yaw:-30,pitch:-14,fov:50},'eout'),          // góc giun: Doge hạ xuống trong cột vàng, chạm đất, bụi toé vòng
    S(3.0,T.look,{tx:-486,ty:150,tz:-368,dist:420,yaw:-58,pitch:-20,fov:50},{tx:-486,ty:95,tz:-368,dist:370,yaw:-56,pitch:-14,fov:50},'eout'),        // góc đối xứng: Clapping hạ xuống trong cột trắng, chạm đất                                                                  // toàn: 2 cột sáng vàng + trắng tắt dần → Doge + Clapping vừa truyền tống xuống
    S(T.look,T.lurk,{tx:-470,ty:70,tz:-180,dist:340,yaw:-58,pitch:-3,fov:46},{tx:-430,ty:70,tz:-180,dist:320,yaw:-50,pitch:-3,fov:46},'lin'),           // trung: 2 con dáo dác nhìn quanh công viên lạ
    S(T.lurk,T.bind-0.3,{tx:470,ty:80,tz:690,dist:420,yaw:172,pitch:-3,fov:46},{tx:470,ty:80,tz:690,dist:390,yaw:172,pitch:-3,fov:46},'lin'),          // trong hàng cây: bóng Chud xích đỏ rực + bóng Mlem, mắt loé
    S(T.bind-0.3,T.hold,{tx:0,ty:100,tz:220,dist:1100,yaw:-14,pitch:4,fov:52},{tx:-100,ty:100,tz:170,dist:1020,yaw:-16,pitch:4,fov:52},'lin'),         // toàn: 2 sợi xích từ bóng tối quấn quanh Doge → lưỡi liếm → đông cứng
    ...C.pushIn(T.hold,{d:T.out-T.hold,tx:-230,ty:62,tz:-160,dist:300,dist1:250,yaw:-28,pitch:-3,fov:46,ox:-0.06}),                                    // THỞ: Doge bị xích quấn + đông cứng trong băng
    S(T.out,T.surr,{tx:150,ty:110,tz:420,dist:1000,yaw:-8,pitch:-2,fov:52},{tx:60,ty:100,tz:300,dist:900,yaw:-10,pitch:-2,fov:52},'lin'),              // toàn: Chud (vẫn ghì xích) + Mlem bước ra từ hàng cây
    S(T.surr,T.laugh,{tx:-120,ty:90,tz:-60,dist:620,yaw:-36,pitch:6,fov:50},{tx:-120,ty:90,tz:-60,dist:560,yaw:-6,pitch:6,fov:50},'eio'),             // máy trôi vòng chậm: 2 con vây quanh Clapping
    ...C.pushIn(T.laugh,{d:T.puzzle-T.laugh,tx:-120,ty:62,tz:-60,dist:240,dist1:205,yaw:-12,pitch:-3,fov:46}),                                         // cận: Clapping chỉ CƯỜI và VỖ TAY
    S(T.puzzle,T.shake,{tx:-140,ty:90,tz:150,dist:470,yaw:-4,pitch:0,fov:48},{tx:-140,ty:90,tz:150,dist:450,yaw:-4,pitch:0,fov:48},'lin'),             // Chud + Mlem nhìn nhau khó hiểu
    S(T.shake,T.turn,{tx:-60,ty:180,tz:300,dist:1300,yaw:-20,pitch:-6,fov:54},{tx:-60,ty:180,tz:300,dist:1260,yaw:-20,pitch:-6,fov:54},'lin'),         // toàn: không gian chấn động — lá rụng, đất rung, xích căng rung
    S(T.turn,T.crack,{tx:-160,ty:95,tz:40,dist:320,yaw:-150,pitch:-2,fov:48,ox:0.12},{tx:-180,ty:95,tz:30,dist:300,yaw:-152,pitch:-2,fov:48,ox:0.12},'lin'),   // qua vai Chud: quay phắt lại nhìn khối băng
    S(T.crack,T.eye,{tx:-260,ty:55,tz:-180,dist:230,yaw:-24,pitch:-2,fov:46},{tx:-260,ty:55,tz:-180,dist:200,yaw:-24,pitch:-2,fov:46},'lin'),         // trung: vết nứt lan dần, xích đỏ rực căng
    S(T.eye,T.burst,{tx:-250,ty:68,tz:-180,dist:80,yaw:-24,pitch:-2,fov:40},{tx:-250,ty:68,tz:-180,dist:68,yaw:-24,pitch:-2,fov:40},'lin'),           // đặc tả: mắt Doge loé sáng trong băng (nhạc lặng)
    S(T.burst,T.charge,{tx:-240,ty:170,tz:-170,dist:620,yaw:-22,pitch:-14,fov:54},{tx:-240,ty:180,tz:-170,dist:600,yaw:-22,pitch:-16,fov:54},'lin'),   // toàn góc giun: BĂNG VỠ TUNG, xích bung ra, Buff Doge khổng lồ hiện ra
    S(T.charge,T.ram,{tx:-170,ty:110,tz:-80,dist:600,yaw:50,pitch:-4,fov:52},{tx:0,ty:110,tz:120,dist:540,yaw:50,pitch:-4,fov:52},'lin'),   // máy VUÔNG GÓC đường lao (anh 12/11: góc cũ thấy lưng mà ảnh lao ngang) → thấy đúng meme One-Punch Shiba lao vào Chud            // CHARGE: One-Punch Shiba xoắn tròn lao thẳng vào Chud
    S(T.ram,T.b1,{tx:CH0[0]+160,ty:260,tz:CH0[1]+190,dist:900,yaw:50,pitch:30,fov:50},{tx:1500,ty:560,tz:1930,dist:900,yaw:50,pitch:24,fov:50},'lin'),   // (anh 12/11) cắt thẳng từ cú lao sang CHUD BỊ HÚC BAY: cùng trục ngang với cú lao, máy cao trên ngọn cây bám theo 2 con (trước quay sau lưng → cây che mất Chud)
    S(T.b1,T.dust,{tx:1100,ty:700,tz:1450,dist:1700,yaw:-40,pitch:14,fov:54},{tx:2200,ty:1000,tz:2900,dist:2900,yaw:-40,pitch:12,fov:54},'brake'), // 1 SHOT DÀI sau lưng: húc trúng → cả 2 bay xuyên 3 dãy nhà
    S(T.dust,T.cover,{tx:1500,ty:900,tz:2600,dist:3400,yaw:-30,pitch:2,fov:54},{tx:1500,ty:960,tz:2600,dist:3300,yaw:-30,pitch:1,fov:54},'lin'),         // THỞ: cột bụi bốc cao sau công viên
    ...C.pushIn(T.cover,{d:T.mturn-T.cover,tx:-120,ty:66,tz:-60,dist:250,dist1:225,yaw:-150,pitch:-3,fov:46}),                                          // cận: Clapping CHE MỒM nhìn theo, bất lực
    S(T.mturn,T.raise,{tx:-330,ty:70,tz:90,dist:260,yaw:30,pitch:-3,fov:46},{tx:-330,ty:70,tz:90,dist:245,yaw:30,pitch:-3,fov:46},'lin'),              // cận Mlem: chậm rãi quay sang Clapping
    S(T.raise,T.rise,{tx:-230,ty:80,tz:0,dist:560,yaw:-12,pitch:-1,fov:48},{tx:-230,ty:80,tz:0,dist:520,yaw:-12,pitch:-1,fov:48},'lin'),               // Clapping quay lại GIƠ TAY như meme; 2 con đứng nhìn nhau
    // ── TRẬN CHÍNH (bãi trống sau 3 dãy nhà): máy NGANG, giữ trục — Doge trái, Chud phải ──
    S(T.rise,T.chains,{tx:FX0+20,ty:130,tz:FZz,dist:900,yaw:0,pitch:-3,fov:52},{tx:FX0+20,ty:125,tz:FZz,dist:820,yaw:0,pitch:-3,fov:52},'lin'),   // toàn: bụi tan, Buff Doge + Chud đứng dậy giữa đống đổ nát
    ...C.pushIn(T.chains,{d:T.r1-T.chains,tx:FX0+300,ty:95,tz:FZz,dist:270,dist1:235,yaw:-14,pitch:-3,fov:44,ox:0.06}),                                 // cận Chud: 2 xích nung đỏ buông thõng, áo Akatsuki rách
    S(T.r1,T.r2,{tx:FX0+40,ty:105,tz:FZz,dist:620,yaw:0,pitch:2,fov:50},{tx:FX0,ty:105,tz:FZz,dist:660,yaw:0,pitch:2,fov:50},'lin'),                    // pha 1: Doge lao vào → xích quất trúng → đỡ, bị đẩy lùi xa
    S(T.r2,T.tie0,{tx:FX0+20,ty:105,tz:FZz,dist:620,yaw:4,pitch:2,fov:50},{tx:FX0+260,ty:120,tz:FZz,dist:760,yaw:6,pitch:2,fov:50},'brake'),          // pha 2: cúi né xích → áp sát → đấm, Chud quăng xích vào cột đu đi → nắm đấm nện nát đất
    S(T.tie0,T.tug,{tx:FX0+400,ty:110,tz:FZz,dist:600,yaw:0,pitch:2,fov:50},{tx:FX0+400,ty:110,tz:FZz,dist:570,yaw:0,pitch:2,fov:50},'lin'),            // pha 3: 2 xích quấn trói 2 tay Doge
    S(T.tug,T.tug+1.5,{tx:FX0+200,ty:110,tz:FZz,dist:300,yaw:-10,pitch:-2,fov:46},{tx:FX0+240,ty:110,tz:FZz,dist:280,yaw:-10,pitch:-2,fov:46},'lin'),  // giằng co: cận Doge gồng, chân trượt dần
    S(T.tug+1.5,T.lift,{tx:FX0+630,ty:100,tz:FZz,dist:280,yaw:12,pitch:-2,fov:46},{tx:FX0+640,ty:100,tz:FZz,dist:265,yaw:12,pitch:-2,fov:46},'lin'),  // giằng co: cận Chud ghì xích, xích rực đỏ
    S(T.lift,T.down,{tx:FX0+480,ty:180,tz:FZz,dist:700,yaw:0,pitch:-6,fov:52},{tx:FX0+480,ty:160,tz:FZz,dist:660,yaw:0,pitch:-6,fov:52},'lin'),        // Chud giật mạnh: nhấc bổng Doge lên quật xuống đất
    ...C.pushIn(T.down,{d:T.haki-T.down,tx:FX0+380,ty:50,tz:FZz,dist:330,dist1:290,yaw:-6,pitch:10,fov:46}),                                           // THỞ: Doge nằm trong hố, xích vẫn trói, Chud bước tới
    S(T.haki,T.hakiOn,{tx:FX0+370,ty:50,tz:FZz,dist:190,yaw:-10,pitch:4,fov:44},{tx:FX0+385,ty:130,tz:FZz,dist:220,yaw:-10,pitch:1,fov:44},'eout'),   // cực cận: Doge chống gối dậy, máy từ mặt đất nâng theo
    S(T.hakiOn,T.pull,{tx:FX0+392,ty:212,tz:FZz,dist:310,yaw:-10,pitch:-2,fov:44},{tx:FX0+392,ty:208,tz:FZz,dist:255,yaw:-10,pitch:-2,fov:44},'lin'),   // HAKI phủ đen 2 tay: khung thấy RÕ MẶT + 2 tay (trận đứng hình)
    S(T.pull,T.shock,{tx:FX0+540,ty:110,tz:FZz,dist:620,yaw:0,pitch:2,fov:50},{tx:FX0+540,ty:110,tz:FZz,dist:580,yaw:0,pitch:2,fov:50},'lin'),        // Doge haki giật ngược → XÍCH ĐỨT TUNG
    S(T.shock,T.lunge,{tx:FX0+700,ty:100,tz:FZz,dist:250,yaw:14,pitch:-2,fov:44},{tx:FX0+700,ty:100,tz:FZz,dist:230,yaw:14,pitch:-2,fov:44},'lin'),   // cận Chud sững người
    S(T.lunge,T.far,{tx:FX0+540,ty:120,tz:FZz,dist:560,yaw:0,pitch:0,fov:52},{tx:FX0+560,ty:120,tz:FZz,dist:420,yaw:0,pitch:0,fov:52},'ein'),          // 2 con lao vào nhau
    S(T.far,T.whip,{tx:FX0+560,ty:120,tz:FZz,dist:420,yaw:0,pitch:0,fov:52}),                                                                          // KHỰNG giữa không trung — chân trời loé tím trắng (trận Gojo vs Pain)
    S(T.whip,T.tunnel,{tx:FX0+560,ty:150,tz:FZz,dist:500,yaw:0,pitch:0,fov:52},{tx:FX0+560,ty:150,tz:FZz,dist:500,yaw:-70,pitch:0,fov:52},'eio'),     // lia giật về phía chân trời
    S(T.tunnel,T.DUR,{tx:FX0+2000,ty:300,tz:FZz,dist:500,yaw:-80,pitch:0,fov:56}) ]);                                                                  // lao đi (đường hầm tốc độ)
  // ───────── VẼ ─────────
  const mouthM=m=>[m.x+26,m.y+62,m.z-14];
  function tongue(F,t,t0,A,tg,o){ o=o||{}; const out=o.out||0.18, back=o.back||0.3; if(t<t0-out||t>t0+back) return;
    const k=t<t0?eout(seg(t,t0-out,t0)):1-ein(seg(t,t0,t0+back)); const B=[lerp(A[0],tg[0],k),lerp(A[1],tg[1],k),lerp(A[2],tg[2],k)];
    const P=[]; for(let i=0;i<=10;i++){ const f=i/10; P.push([lerp(A[0],B[0],f),lerp(A[1],B[1],f)+Math.sin(Math.PI*f)*40*k,lerp(A[2],B[2],f)]); }
    W.taper(F,P,16,11,'#ff7aa2',{stroke:'#b8335c',shine:true}); }
  // ⛓️ XÍCH NUNG ĐỎ — chép cách game vẽ (`_dcCord`): quầng đỏ cam → lõi tối → dải ảnh dây xoắn DC_CORD_IMG kéo theo đường đi
  const CORD_X0=0.30, CORD_X1=0.75, CORD_Y1=0.844;
  function cordScreen(g,im,pts,cw,hot){ if(pts.length<2) return; g.save(); g.lineCap='round'; g.lineJoin='round';
    if(hot) for(const [w,al] of [[cw*3.4,0.28],[cw*2.0,0.6]]){ g.strokeStyle=`rgba(255,${w>cw*3?40:110},0,${al*hot})`; g.lineWidth=w; g.beginPath(); g.moveTo(pts[0][0],pts[0][1]); for(let i=1;i<pts.length;i++) g.lineTo(pts[i][0],pts[i][1]); g.stroke(); }
    g.strokeStyle='rgba(18,18,18,0.92)'; g.lineWidth=cw*0.75; g.beginPath(); g.moveTo(pts[0][0],pts[0][1]); for(let i=1;i<pts.length;i++) g.lineTo(pts[i][0],pts[i][1]); g.stroke();
    if(im&&im.complete&&im.naturalWidth){ const Wd=im.naturalWidth, Hd=im.naturalHeight, sx=Wd*CORD_X0, sw=Wd*(CORD_X1-CORD_X0), TH=Hd*CORD_Y1; let tot=0; for(let i=1;i<pts.length;i++) tot+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);
      let acc=0; const dw=cw/0.45; for(let i=1;i<pts.length;i++){ const a=pts[i-1], b=pts[i], L=Math.hypot(b[0]-a[0],b[1]-a[1]); if(L<0.01) continue; const sy=TH*acc/tot, sh=Math.max(1,TH*L/tot); acc+=L;
        g.save(); g.translate(a[0],a[1]); g.rotate(Math.atan2(b[1]-a[1],b[0]-a[0])-Math.PI/2); g.drawImage(im,sx,sy,sw,sh,-dw/2,0,dw,L+0.6); g.restore(); } }
    if(hot){ g.globalCompositeOperation='lighter'; g.strokeStyle=`rgba(255,120,40,${0.35*hot})`; g.lineWidth=cw*0.5; g.beginPath(); g.moveTo(pts[0][0],pts[0][1]); for(let i=1;i<pts.length;i++) g.lineTo(pts[i][0],pts[i][1]); g.stroke(); }
    g.restore(); }
  // xích từ điểm thế giới A tới B, võng / cong `sag` (đơn vị thế giới, + = võng xuống), lắc `wob`; k = độ dài đã phóng (0..1)
  function chain(F,A,B,o){ o=o||{}; const k=o.k==null?1:o.k, N=18, P=[]; for(let i=0;i<=N;i++){ const f=i/N*k, x=lerp(A[0],B[0],f), y=lerp(A[1],B[1],f)-(o.sag||0)*4*f*(1-f)+(o.wob||0)*Math.sin(f*9+(o.t||0)*20)*f, z=lerp(A[2],B[2],f); const p=K.proj(F.B,x,y,z); if(!p) return; P.push(p); }
    const s=(P[0].s+P[P.length-1].s)/2, cw=Math.max(1.2,Math.min(7,(o.w||9)*0.38*s)),   /* trần 7px: xích sát máy không phình thành dải to vắt ngang khung */ d=Math.min(P[0].d,P[P.length-1].d)+(o.d||-10);
    F.list.push({d, fn:()=>{ const g=F.g; g.save(); g.globalAlpha=o.a==null?1:o.a; cordScreen(g,F.I.CORD,P.map(p=>[p.x,p.y]),cw,o.hot==null?1:o.hot); g.restore(); }}); }
  // xích QUẤN quanh người (vòng xoắn phía trước thân): tâm x,z, từ cao y0 tới y1, bán kính theo bề ngang ảnh
  function coil(F,x,z,y0,y1,R,turns,o){ o=o||{}; const B=F.B, r=B.r, P=[]; for(let i=0;i<=turns*14;i++){ const a=i/14*TAU, y=lerp(y0,y1,i/(turns*14)), c=Math.cos(a), sn=Math.sin(a);
      const p=K.proj(B,x+r[0]*c*R-B.f[0]*sn*R*0.5,y,z+r[2]*c*R-B.f[2]*sn*R*0.5); if(!p) return; p.front=sn>0; P.push(p); }
    const s=P[0].s, cw=Math.max(1.1,(o.w||8)*0.38*s), d=P[0].d+(o.d||-14);
    F.list.push({d, fn:()=>{ let run=[]; const flush=()=>{ if(run.length>1) cordScreen(F.g,F.I.CORD,run,cw,o.hot==null?1:o.hot); run=[]; }; for(const p of P){ if(p.front) run.push([p.x,p.y]); else flush(); } flush(); }}); }
  // điểm thế giới của chuôi xích trong tay Chud (ảnh billboard theo máy; ảnh lật thì đổi tay)
  function handW(F,key,x,y,z,flip,j){ const c=K.prep(F.I[key]); if(!c||!HAND[key]) return [x,y+HT[key]*0.5,z]; const h=HT[key], w=h*c.sw/c.sh; let [fx,fy]=HAND[key][j]; if(flip) fx=1-fx;
    const r=F.B.r, dx=(fx-0.5)*w; return [x+r[0]*dx, y+h*(1-fy), z+r[2]*dx]; }
  function chudActor(F,key0,x,z,y,look,o){ const r=act(F,Object.assign({key:key0,dir:DIR[key0],x,z,y,h:HT[key0],look,shadow:true,life:{breath:0.6,wind:0.9}},o||{})), flip=r.flip, key=r.key;   // đa góc: chuôi xích = handW theo ẢNH THẬT vừa vẽ (đã lật)
    // người ửng đỏ / tàn lửa bốc (dạng phẫn nộ của game)
    if(F.t!=null&&!(o&&o.dry)) K.sparks(F,{x,y:60,z,t0:Math.floor(F.t*4)/4,n:4,speed:200,life:0.7,seed:Math.floor(F.t*4)+900,col:'255,110,50'});
    return [handW(F,key,x,y,z,flip,0),handW(F,key,x,y,z,flip,1)]; }
  // vết nứt trên khối băng
  function iceCracks(F,x,z,h,k){ if(k<=0) return; const P=K.proj(F.B,x,h*0.5,z); if(!P) return; const S=h*P.s;
    F.list.push({d:P.d-7, fn:()=>{ const g=F.g; g.save(); g.lineCap='round';
      for(let i=0;i<9;i++){ const an=i/9*TAU+hash(i*3.1)*0.5; let px=P.x, py=P.y, L=0; const Lm=S*(0.25+0.5*hash(i*5.7))*k; g.beginPath(); g.moveTo(px,py);
        while(L<Lm){ const st=S*0.05*(0.6+hash(i*7+L)), a2=an+(hash(i*11+L*0.1)-0.5)*0.9; px+=Math.cos(a2)*st; py+=Math.sin(a2)*st*1.2; L+=st; g.lineTo(px,py); }
        g.strokeStyle='rgba(255,255,255,0.95)'; g.lineWidth=Math.max(1,S*0.008); g.stroke(); g.globalCompositeOperation='lighter'; g.strokeStyle=`rgba(255,220,140,${0.35*k})`; g.lineWidth=Math.max(2,S*0.025); g.stroke(); g.globalCompositeOperation='source-over'; }
      g.restore(); }}); }
  // bóng nhân vật trong hàng cây (ảnh nhuộm đen) + 2 đốm mắt loé — không vẽ bộ phận nhân vật bằng code
  function lurker(F,t,key,x,z,eyes){ const c=K.prep(F.I[key]), P=K.proj(F.B,x,0,z); if(!c||!P) return; const h=HT[key]*P.s, w=h*c.sw/c.sh, blink=seg(t,T.lurk+0.5,T.lurk+0.7);
    F.list.push({d:P.d+40, fn:()=>{ const g=F.g; g.save(); g.globalAlpha=0.95; g.drawImage(K.tinted(c,'#06050a'),P.x-w/2,P.y-h,w,h);
      if(eyes){ g.globalCompositeOperation='lighter'; for(const sx of eyes){ const ex=P.x+sx[0]*w, ey=P.y-h*sx[1], R=Math.max(2,h*0.04)*blink+0.01, gr=g.createRadialGradient(ex,ey,0,ex,ey,R*3); gr.addColorStop(0,'rgba(255,240,200,1)'); gr.addColorStop(0.3,'rgba(255,200,120,0.6)'); gr.addColorStop(1,'rgba(255,160,80,0)'); g.fillStyle=gr; g.fillRect(ex-R*3,ey-R*3,R*6,R*6); } }
      g.restore(); }}); }
  // cột sáng truyền tống (cùng màu cột guardian ở fin1c5: Doge vàng, Clapping trắng) — tắt dần lúc mở phim
  // 🌈 CỔNG BIFROST (kiểu Thor): cột sáng giáng thẳng từ trời (đầu cột lao xuống 0.18s) — lõi trắng, thân màu riêng (Doge vàng / Clapping trắng),
  //    viền ánh CẦU VỒNG; vệt sáng XOÁY quanh trục; chạm đất = loé + sóng quét cỏ; người hạ xuống trong cột; sau khi đáp cột tan thành hạt bay lên;
  //    mặt cỏ còn lại VÒNG KÝ TỰ Bifrost (vòng đồng tâm + nút thắt) sáng màu rồi nguội thành vết cháy sém, giữ suốt cảnh công viên.
  const RAINBOW=['255,80,80','255,170,60','255,240,90','90,255,140','80,190,255','160,110,255'];
  function bifrost(F,t,x,z,col,t0,tL){ if(t<t0) return; const head=lerp(4200,0,eout(seg(t,t0,t0+0.18))), a=t<tL+0.2?1:1-seg(t,tL+0.2,tL+1.6), B=F.B;
    if(a>0.01){ const w=t<t0+0.3?1.4-0.4*seg(t,t0,t0+0.3):1;
      RAINBOW.forEach((c,i)=>{ const off=(i-2.5)*9; W.beam(F,[x+B.r[0]*off,head,z+B.r[2]*off],[x+B.r[0]*off,4200,z+B.r[2]*off],9*w,c,0.55*a,{d:44}); });   // viền CẦU VỒNG (6 dải sát nhau)
      W.beam(F,[x,head,z],[x,4200,z],26*w,col,0.85*a,{d:42}); W.beam(F,[x,head,z],[x,4200,z],8*w,'255,255,255',a,{d:41});   // thân màu riêng + lõi trắng gắt
      for(let i=0;i<5;i++){ const ph=(t*1.6+i/5)%1, y0=head+ph*900, pts=[]; for(let j=0;j<=14;j++){ const an=t*9+i*1.3+j*0.42, y=y0+j*30, R=48*w; pts.push([x+B.r[0]*Math.cos(an)*R-B.f[0]*Math.sin(an)*R*0.5,y,z+B.r[2]*Math.cos(an)*R-B.f[2]*Math.sin(an)*R*0.5]); }
        W.line(F,pts,3.2,'rgba(255,255,255,'+(0.95*a)+')',{glow:'rgba('+RAINBOW[i%6]+','+(0.8*a)+')',d:-30}); }   // vệt xoáy quanh trục
      if(t>=tL) K.sparks(F,{x,y:30,z,t0:tL,n:46,speed:420,life:1.6,seed:(x|0)+7,col}); }
    // vòng ký tự Bifrost trên cỏ (vẽ dưới mọi thứ): sáng khi cột chạm đất, nguội thành vết cháy
    const P=K.proj(B,x,0,z), Q=K.proj(B,x+260,0,z), Zp=K.proj(B,x,0,z+260); if(!P||!Q||!Zp) return; const rx=Math.abs(Q.x-P.x)+2, ry=Math.max(3,Math.abs(Zp.y-P.y)), hot=t<t0+0.18?0:1-seg(t,tL+0.4,tL+2.5), born=seg(t,t0+0.18,t0+0.5);
    const flat=clamp((ry/rx-0.1)/0.18,0,1); if(flat<=0.01) return;   // máy sát đất → vòng dẹt thành vạch → ẩn
    F.under.push(()=>{ const g=F.g; g.save(); g.globalAlpha=flat; g.translate(P.x,P.y); g.scale(1,ry/rx); g.lineCap='round';
      const stroke=(al,lw)=>{ for(const k of [1,0.82,0.5]){ g.lineWidth=lw*(k===1?1.4:1); g.beginPath(); g.arc(0,0,rx*k*born,0,TAU); g.stroke(); }
        for(let i=0;i<12;i++){ const a0=i/12*TAU; g.beginPath(); g.arc(Math.cos(a0)*rx*0.66*born,Math.sin(a0)*rx*0.66*born,rx*0.17*born,a0+1.2,a0+TAU-1.2); g.stroke(); }   // vòng nút thắt
        for(let i=0;i<24;i++){ const a0=i/24*TAU; g.beginPath(); g.moveTo(Math.cos(a0)*rx*0.84*born,Math.sin(a0)*rx*0.84*born); g.lineTo(Math.cos(a0)*rx*0.98*born,Math.sin(a0)*rx*0.98*born); g.stroke(); } };   // vạch ký tự vòng ngoài
      g.strokeStyle='rgba(20,14,10,0.75)'; stroke(1,4);   // vết cháy sém (ở lại)
      if(hot>0.01){ g.globalCompositeOperation='lighter'; g.strokeStyle='rgba('+col+','+(0.5*hot)+')'; stroke(1,9); g.strokeStyle='rgba('+col+','+hot+')'; stroke(1,3.5); g.strokeStyle='rgba(255,255,255,'+(0.8*hot)+')'; stroke(1,1.4); }
      g.restore(); }); }
  function landFx(F,t,x,z,col,tL){ if(t<tL||t>tL+2.4) return; const u=seg(t,tL,tL+0.7); K.ring(F,x,z,40+520*eout(u),10,0.3*(1-u),col);   // sóng nhỏ, mờ (góc sát đất vòng to dẹt thành vạch sáng cắt khung)
    K.smoke(F,{x,z,t0:tL,n:16,spread:520,rise:90,life:1.6,size:110,seed:(x|0)+3,a:0.5,tint:'140,130,120'}); K.debris(F,{x,y:10,z,t0:tL,n:26,speed:700,life:1.0,size:10,seed:(x|0)+5,col:'#3c3a2e'}); }
  // đá vụn / cột gãy quanh bãi đánh chính
  const RUBBLE=Array.from({length:26},(_,i)=>{ const w=70+220*hash(i*7.1), h=30+150*hash(i*2.9), d=60+160*hash(i*4.3), x=FZ[0]+(hash(i*3.3)-0.5)*2600, z=FZ[1]+(i%4===0?-420-300*hash(i*9.1):260+hash(i*5.7)*1100); return {x,z,w,h,d,dark:hash(i*6.6)<0.5}; }).filter(r=>!(Math.abs(r.z-FZ[1])<300&&r.x>FZ[0]-400&&r.x<FZ[0]+900));
  function rock(F,x,y,z,S,seed){ const P=K.proj(F.B,x,y+S*0.45,z); if(!P) return; const R=S*P.s;
    F.list.push({d:P.d, fn:()=>{ const g=F.g; g.save(); g.translate(P.x,P.y); g.rotate(seed); const pts=[]; for(let i=0;i<8;i++){ const a=i/8*TAU, rr=R*(0.62+0.38*hash(seed*13+i)); pts.push([Math.cos(a)*rr,Math.sin(a)*rr*0.78]); }
      g.fillStyle='#5f5955'; g.beginPath(); pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.closePath(); g.fill();
      g.fillStyle='rgba(180,170,162,0.3)'; g.beginPath(); g.moveTo(pts[4][0],pts[4][1]); g.lineTo(pts[5][0],pts[5][1]); g.lineTo(pts[6][0],pts[6][1]); g.lineTo(0,-R*0.1); g.closePath(); g.fill();
      g.strokeStyle='rgba(20,16,16,0.8)'; g.lineWidth=Math.max(1,R*0.04); g.stroke(); g.restore(); }}); }
  // hố trên mặt đất (vẽ dưới mọi thứ)
  function crater(F,x,z,R,a){ const P=K.proj(F.B,x,0,z), Q=K.proj(F.B,x+R,0,z), Z=K.proj(F.B,x,0,z+R); if(!P||!Q||!Z) return; const rx=Math.abs(Q.x-P.x), ry=Math.max(2,Math.abs(Z.y-P.y));
    F.under.push(()=>{ const g=F.g; g.save(); g.globalAlpha=a; const gr=g.createRadialGradient(P.x,P.y,0,P.x,P.y,rx); gr.addColorStop(0,'rgba(10,8,8,0.9)'); gr.addColorStop(0.7,'rgba(30,24,22,0.7)'); gr.addColorStop(1,'rgba(60,50,46,0)'); g.fillStyle=gr; g.beginPath(); g.ellipse(P.x,P.y,rx,ry,0,0,TAU); g.fill(); g.restore(); }); }
  function world(F,t){ const th=theme(t); CITY.draw(F,t,th); F.t=t;
    if(t<T.rise) parkWorld(F,t); else fightWorld(F,t); farFlash(F,t); }
  // ── 2 VỆT TỐC ĐỘ CAO sau cú húc: đuôi = đường bay thật vài phần giây trước (cong theo đà hất lên), đầu sáng trắng, quầng màu cộng sáng (lighter)
  //   Doge vàng-trắng · Chud đỏ (bay trước 90, cao hơn 85) · bóng mờ của cả 2 kéo theo vệt trong 0.15s đầu
  const STREAK_AT=0.07, flyY=tt=>120+420*eout(seg(tt,T.ram,T.ram+0.7));
  function streak(F,t,ahead,dy,w,col,trail){ const pts=[]; for(let i=0;i<=14;i++){ const tt=Math.max(T.ram,t-trail*(1-i/14)), p=RAM(flyK(tt)+ahead); pts.push(K.proj(F.B,p[0],flyY(tt)+dy,p[1])); } streakP(F,pts,w,col); }
  const streakP=W.streak;   // vệt tốc độ cao — bản chung ở js/fin1-fight.js
  function clashStreaks(F,t,X,Z){ const t0=T.clash-0.27, u=seg(t,t0,T.clash);
    const run=(xa,xb,y,w,col,dir)=>{ const pts=[]; for(let i=0;i<=12;i++){ const k=Math.max(0,u-0.55*(1-i/12)), x=lerp(xa,xb,eout(Math.min(1,k))); pts.push(K.proj(F.B,X+x,y,Z)); } streakP(F,pts,w,col); };
    run(300,562,105,40,'255,40,30',1); run(300,562,112,16,'60,20,40',1);   // Doge haki: lõi đỏ + vệt tím than (đuôi bắt đầu SAU chỗ đứng → vệt dài)
    run(760,584,95,34,'255,120,50',-1); }   // Chud: vệt cam đỏ, 2 đầu vệt gặp nhau ở giữa (572)
  function ramStreaks(F,t){ const u=t-T.ram, tr=Math.min(0.4,0.08+u*0.9);
    streak(F,t,90,150,18,'255,60,40',tr*0.9);    // Chud
    streak(F,t,0,20,24,'255,205,110',tr);      // Doge
    if(u<0.22){ const ga=0.5*(1-u/0.22), p=RAM(flyK(t)), q=RAM(flyK(t)+90), fy=flyY(t);   // bóng mờ 2 con tan vào vệt
      W.actor(F,{key:'CHF',dir:1,x:q[0],z:q[1],y:fy+85,h:HT.CHF,look:{x:p[0],z:p[1]},shadow:false,a:ga,life:{breath:0}});
      act(F,{key:'DZ',x:p[0],z:p[1],y:fy,h:HT.DZ,face:[DIRV[0],DIRV[1]],smear:{dx:-DIRV[0]*90,dy:0,dz:-DIRV[1]*90},shadow:false,a:ga,life:{breath:0}}); } }
  // ═════════ CÔNG VIÊN: truyền tống → tập kích → vây → phá băng → húc xuyên nhà → người xem ═════════
  function parkWorld(F,t){ const d=doge(t), k=clap(t), m=mlem(t), c=chud(t);
    bifrost(F,t,-640,-240,'255,214,90',T.strikeD,T.landD); bifrost(F,t,-486,-368,'255,255,255',T.strikeK,T.landK); landFx(F,t,-640,-240,'255,214,90',T.landD); landFx(F,t,-486,-368,'255,255,255',T.landK);
    const shk=t>=T.shake&&t<T.burst?Math.sin(t*47)*3*seg(t,T.shake,T.shake+0.6):0;
    const frozen=t>=T.frz&&t<T.burst, iceA=t<T.frz?0:t<T.frz+0.5?seg(t,T.frz,T.frz+0.5):t<T.burst?1:0, bound=t>=T.bind+0.2&&t<T.burst;
    const lookD=t<T.bind?{x:d.x+Math.sin(t*1.7)*300,z:d.z+200}:{x:c.x,z:c.z};   // dáo dác nhìn quanh
    if(t<T.ram&&t>=T.strikeD+0.12){ const key=d.im, pre=t>=T.charge-0.1&&t<T.charge?seg(t,T.charge-0.1,T.charge):0;
      act(F,{key,dir:DIR[key],face:t>=T.charge&&t<T.ram?[CH0[0]-d.x,CH0[1]-d.z]:null,x:d.x+(frozen?shk*0.4:0),z:d.z,y:d.y+walking(t,0,T.bind),h:HT[key],look:lookD,smear:d.sm,shadow:true,
        aura:t>=T.burst?{preset:'fire',k:0.6,seed:3}:null, white:(t>=T.burst&&t<T.burst+0.06)?1:0, life:frozen?{breath:0}:{breath:0.7,squash:pre?-0.3*pre:K.squash(t,T.landD,0.4,0.12)}});
      if(iceA>0) W.ice(F,{key:'D0',x:d.x+(frozen?shk*0.4:0),z:d.z,h:HT.D0*1.08,seed:4},iceA,t);
      if(frozen) iceCracks(F,d.x,d.z-2,HT.D0,t<T.crack?0:seg(t,T.crack,T.quiet));
      if(t>=T.eye&&t<T.burst){ const P=K.proj(F.B,d.x+6,HT.D0*0.72,d.z-6); if(P) F.list.push({d:P.d-9, fn:()=>{ const g=F.g, R=Math.max(3,18*P.s)*(0.6+0.4*Math.sin(t*30)); g.save(); g.globalCompositeOperation='lighter'; const gr=g.createRadialGradient(P.x,P.y,0,P.x,P.y,R*4); gr.addColorStop(0,'rgba(255,240,190,1)'); gr.addColorStop(0.25,'rgba(255,190,90,0.7)'); gr.addColorStop(1,'rgba(255,140,40,0)'); g.fillStyle=gr; g.fillRect(P.x-R*4,P.y-R*4,R*8,R*8); g.restore(); }}); }
    } else if(t>=T.ram+STREAK_AT&&flyA(t)>0.02){ ramStreaks(F,t);   // (anh 12/11) húc trúng xong KHÔNG vẽ nhân vật bay nữa: cả 2 thành 2 VỆT TỐC ĐỘ CAO lao đi (kiểu anime)
    } else if(t>=T.ram&&flyA(t)>0.02){ const p=RAM(flyK(t)), q=RAM(flyK(t)+90), fy=120+420*eout(seg(t,T.ram,T.ram+0.7));   // khoảnh khắc chạm (vài khung): còn thấy 2 con
      W.actor(F,{key:'CHF',dir:1,x:q[0],z:q[1],y:fy+85,h:HT.CHF,look:{x:p[0],z:p[1]},shadow:false,life:{breath:0}});   // Chud bị húc bay ngửa ra sau, mặt về phía Doge   // Chud bị húc: mặt hướng về Doge (ngược đường bay)
      act(F,{key:'DZ',dir:-1,x:p[0],z:p[1],y:fy,h:HT.DZ,face:[DIRV[0],DIRV[1]],smear:{dx:-DIRV[0]*60,dy:0,dz:-DIRV[1]*60},shadow:false,life:{breath:0}}); }
    // ── Chud: bóng trong hàng cây (lurker) → quăng 2 xích quấn Doge → bước ra (vẫn ghì xích) → vây → bị húc
    if(t>=T.lurk-0.1&&t<T.bind+0.3){ lurker(F,t,'CK0',560,760,[[-0.06,0.86],[0.06,0.86]]); lurker(F,t,'M0',380,620,[[-0.12,0.7],[0.1,0.7]]); }
    let hands=null;
    if(t>=T.bind+0.3&&t<T.ram) hands=chudActor(F,c.im,c.x,c.z,walking(t,T.out+0.3,T.laugh),t>=T.turn?{x:d.x,z:d.z}:{x:k.x,z:k.z});
    else if(t>=T.bind-0.5&&t<T.bind+0.3) hands=[handW(F,c.im,560,0,760,false,0),handW(F,c.im,560,0,760,false,1)];
    if(hands&&t<T.burst+0.25){ const tgt=[d.x,60,d.z], fly=seg(t,T.bind-0.25,T.bind+0.05), strain=t>=T.shake?seg(t,T.shake,T.quiet):0, snap=t>=T.burst?seg(t,T.burst,T.burst+0.25):0;
      for(let j=0;j<2;j++){ const B=[tgt[0]+(j?20:-20),tgt[1]+(j?10:30),tgt[2]]; chain(F,hands[j],B,{k:fly*(1-snap),sag:bound?30-25*strain:70,wob:strain*6,t,w:9,hot:1}); }
      if(bound&&t<T.burst) coil(F,d.x+(frozen?shk*0.4:0),d.z,HT.D0*0.2,HT.D0*0.62,HT.D0*0.46,3,{w:8,hot:0.8+0.2*Math.sin(t*6)}); }
    if(t>=T.burst&&t<T.burst+0.6) K.debris(F,{x:d.x,y:60,z:d.z,t0:T.burst,n:20,speed:900,life:0.8,size:8,seed:24,col:'#ff5a20'});   // mắt xích bung ra
    // ── Mlem: lè lưỡi liếm (sau khi xích đã quấn) → bước ra → vây → ở lại
    if(t>=T.lick-0.3&&t<T.lick+0.4){ const A=mouthM({x:380,y:0,z:620}); tongue(F,t,T.lick,A,[d.x+10,48,d.z-6]); }
    if(t>=T.out) W.actor(F,{key:'M0',dir:0,x:m.x,z:m.z,y:walking(t,T.out,T.laugh),h:HT.M0,look:t>=T.turn&&t<T.cover?{x:d.x,z:d.z}:t>=T.dust&&t<T.mturn?{x:1400,z:1800}:{x:k.x,z:k.z},shadow:true,life:{breath:0.7,wind:0.8}});
    if(t>=T.strikeK+0.12){ const key=kImg(t); W.actor(F,{key,dir:0,x:k.x,z:k.z,y:walking(t,0,T.bind+0.8),h:HT[key],look:t<T.bind?{x:k.x-Math.sin(t*1.3)*300,z:k.z+200}:t>=T.dust&&t<T.raise?{x:1400,z:1800}:{x:m.x,z:m.z},shadow:true,
        lean:t>=T.raise&&t<T.raise+0.35?-12*Math.sin(Math.PI*seg(t,T.raise,T.raise+0.35)):0, life:{breath:t>=T.laugh&&t<T.puzzle?1.6:0.7,squash:t>=T.laugh&&t<T.puzzle?0.12*Math.abs(Math.sin(t*14)):K.squash(t,T.landK,0.4,0.12)}}); }
    if(t>=T.frz&&t<T.frz+0.9){ K.smoke(F,{x:d.x,z:d.z,t0:T.frz,n:10,spread:120,rise:50,life:0.9,size:50,seed:11,a:0.5,tint:'220,240,255'}); K.sparks(F,{x:d.x,y:50,z:d.z,t0:T.frz,n:20,speed:260,life:0.6,seed:12,col:'200,235,255'}); }
    if(t>=T.shake&&t<T.burst){ for(let i=0;i<14;i++){ const ph=((t-T.shake)*0.5+hash(i*3.3))%1, x=-900+1800*hash(i*5.1), z=300+600*hash(i*7.7), P=K.proj(F.B,x,500-ph*500,z); if(!P) continue;
        F.list.push({d:P.d, fn:()=>{ const g=F.g; g.save(); g.translate(P.x,P.y); g.rotate(t*3+i); g.fillStyle='rgba(60,70,40,0.9)'; g.beginPath(); g.ellipse(0,0,Math.max(1,7*P.s),Math.max(1,3*P.s),0,0,TAU); g.fill(); g.restore(); }}); }
      K.smoke(F,{x:d.x,z:d.z,t0:T.crack,n:4,spread:60,rise:30,life:1.6,size:40,seed:15,a:0.3*seg(t,T.crack,T.quiet),tint:'230,245,255'}); }
    if(t>=T.burst&&t<T.burst+1.6){ K.debris(F,{x:d.x,y:60,z:d.z,t0:T.burst,n:46,speed:1300,life:1.4,size:24,seed:21,col:'#cfeaff'}); K.sparks(F,{x:d.x,y:90,z:d.z,t0:T.burst,n:40,speed:900,life:0.7,seed:22,col:'220,245,255'});
      K.smoke(F,{x:d.x,z:d.z,t0:T.burst,n:14,spread:420,rise:140,life:1.5,size:120,seed:23,a:0.5,tint:'230,240,255'}); if(t<T.burst+0.6){ const u=seg(t,T.burst,T.burst+0.6); K.ring(F,d.x,d.z,40+700*eout(u),16,0.6*(1-u),'230,245,255'); } }
    if(t>=T.charge-0.1&&t<T.charge+1.2) K.smoke(F,{x:-260,z:-180,t0:T.charge-0.05,n:10,spread:260,rise:60,life:1.2,size:90,seed:31,a:0.45,tint:'120,110,96'});   // đạp đất lao đi
    if(t>=T.ram&&t<T.ram+0.9){ const u=seg(t,T.ram,T.ram+0.6); K.ring(F,CH0[0],CH0[1],40+600*eout(u),8,0.35*(1-u),'255,200,120'); K.sparks(F,{x:CH0[0],y:130,z:CH0[1],t0:T.ram,n:30,speed:700,life:0.5,seed:41,col:'255,210,150'}); }
    for(const [tb,kk] of HITS) if(t>=tb&&t<tb+2.6){ const p=RAM(kk); K.debris(F,{x:p[0],y:300,z:p[1]-200,t0:tb,n:36,speed:1500,life:2.2,size:70,seed:50+kk%97,col:'#4d4448'});
      K.smoke(F,{x:p[0],z:p[1],t0:tb+0.05,n:16,spread:900,rise:700,life:2.4,size:420,seed:60+kk%91,a:0.55,tint:'120,100,90'}); }
    if(t>=T.b1) K.smoke(F,{x:2000,z:3100,t0:T.b1,n:30,spread:2800,rise:1800,life:12,size:900,seed:71,a:0.6,tint:'110,92,84'}); }
  // ═════════ TRẬN CHÍNH: CHUD (xích) vs BUFF DOGE (tay bo) ═════════
  function fightWorld(F,t){ const tt=hs(t), d=dogeM(t), c=chudM(t), X=FZ[0], Z=FZ[1];
    for(const r of RUBBLE) CITY.box(F,r.x-r.w/2,r.x+r.w/2,0,r.h,r.z-r.d/2,r.z+r.d/2,r.dark?'#2c2729':'#3a3436',r.dark?'#4a4245':'#5a5154','rgba(220,70,50,0.18)');   // khối bê tông vỡ, viền đỏ ánh lửa
    CITY.box(F,PIL[0]-50,PIL[0]+50,0,PIL[1]+60,PIL[2]-50,PIL[2]+50,'#4a4446','#6a6266','rgba(20,16,16,0.6)');   // cột bê tông gãy
    K.smoke(F,{x:X,z:Z+200,t0:T.rise-1,n:14,spread:1800,rise:60,life:4,size:220,seed:81,a:0.35*(1-seg(t,T.rise,T.rise+3))+0.12,tint:'110,92,84'});   // bụi đổ nát tan dần
    if(t>=T.punch) crater(F,X+170-60,Z,260,Math.min(1,seg(t,T.punch,T.punch+0.2)));
    if(t>=T.slam) crater(F,X+380,Z,220,Math.min(1,seg(t,T.slam,T.slam+0.2)));
    const haki=tt>=T.hakiOn, dKey=d.im;
    const dO={key:dKey,dir:DIR[dKey],face:(t>=T.haki&&t<T.pull)?[0.6-F.B.f[0],-F.B.f[2]]:null,x:X+d.x,z:Z+d.z,y:d.y,h:HT[dKey],   /* cực cận Haki: mặt 3/4 về máy */look:{x:X+c.x,z:Z},smear:d.sm,shadow:d.y<100,
      aura:haki?{preset:'haki',k:tt<T.hakiOn+1?1.3:0.7,seed:8}:{preset:'fire',k:0.45,seed:3}, white:(t>=T.w1&&t<T.w1+0.06)?1:0,
      lean:0, life:{breath:t>=T.tug&&t<T.lift?2.2:0.7,squash:K.squash(tt,T.slam,0.35,0.1)}};
    // THỨ TỰ VẼ (12/11): xích trói tay XA (bên kia thân so với Chud) phải chui SAU người Doge — trước vẽ đè lên, sợi xích cắt ngang bụng
    const bound=t>=T.tie0&&t<T.snap, dR0=act(F,Object.assign({},dO,{dry:true})), dF0=[0,1].map(j=>handW(F,dR0.key,X+d.x,d.y,Z+d.z,dR0.flip,j));
    const hands0=chudActor(F,c.im,X+c.x,Z+c.z,c.y,{x:X+d.x,z:Z},{dry:true});
    const R=F.B.r, sx=(px,pz)=>(px-(X+d.x))*R[0]+(pz-(Z+d.z))*R[2], sC=sx(X+c.x,Z+c.z);   // so theo HƯỚNG NGANG máy (Chud ngoài khung vẫn đúng)
    const far=[0,1].map(j=>sx(dF0[j][0],dF0[j][2])*sC<0);
    const tieChain=(j,hd,dA)=>{ const dz=far[j]?70:-10;   // bộ khung XẾP THEO ĐỘ SÂU: xích tay xa lùi sau thân Doge
      if(t<T.tie) chain(F,hd[j],dA[j],{k:seg(t,T.tie0+0.25,T.tie),sag:-30,t,w:9,hot:1,d:dz}); else { const taut=t>=T.tug?1:0.6; chain(F,hd[j],dA[j],{sag:taut?4:30,wob:t>=T.tug?2.5:0,t,w:9,hot:t>=T.hakiOn?0.6:1,d:dz}); coil(F,dA[j][0],dA[j][2],dA[j][1]-9,dA[j][1]+9,13,2,{w:7}); } };
    if(bound) for(let j=0;j<2;j++) if(far[j]) tieChain(j,hands0,dF0);
    const dashing=t>=T.clash-0.25&&t<T.clash-0.01;   // (anh 12/11) pha lao vào nhau quá nhanh để thấy người → 2 VỆT
    if(dashing) clashStreaks(F,t,X,Z);
    const dR=dashing?{flip:dR0.flip,key:dR0.key}:act(F,dO);
    const dFlip=dR.flip, dKv=dR.key;   // ảnh thật (đa góc)
    const hands=dashing?hands0:chudActor(F,c.im,X+c.x,Z+c.z,c.y,{x:X+d.x,z:Z});
    // ── xích: buông thõng · quất (pha 1, 2) · quấn cột (đu né) · trói 2 tay Doge (pha 3 → giằng co → nhấc quật) · đứt
    const dF=[handW(F,dKv,X+d.x,d.y,Z+d.z,dFlip,0),handW(F,dKv,X+d.x,d.y,Z+d.z,dFlip,1)], dChest=dF[0], dArms=dF;   // 12/11: xích gắn đúng NẮM ĐẤM / tay đỡ của ảnh (trước đặt sau lưng → xích xuyên qua người)
    const hang=(j)=>{ const h=hands[j]; chain(F,h,[h[0]+(j?30:-30),Math.max(4,h[1]-150),h[2]],{sag:-10,wob:6,t,w:8,hot:0.9}); };
    // nhát QUẤT = sóng roi: vươn ra cong như roi (sóng lớn giảm dần khi duỗi thẳng), đầu xích bật vào đích, kéo theo 3 vệt bóng mờ
    const whip=(j,t0,tg,miss)=>{ const B=miss?[tg[0]+(hands[j][0]-tg[0])*-0.25,tg[1]+40,tg[2]]:tg, at=tt=>{ const k=eout(seg(tt,t0-0.14,t0)), back=seg(tt,t0+0.18,t0+0.6); return {k:k*(1-back*0.85), wob:(1-k)*70+back*20}; };
      for(let i=3;i>=1;i--){ const q=at(t-i*0.025); if(q.k>0.02&&t<t0+0.05) chain(F,hands[j],B,{k:q.k,sag:-40*(1-q.k)+15,wob:q.wob,t:t-i*0.025,w:9,hot:0.7,a:0.22*(4-i)/3}); }
      const q=at(t); chain(F,hands[j],B,{k:q.k,sag:-40*(1-q.k)+15,wob:q.wob,t,w:9,hot:1}); };
    const snapK=t>=T.snap?seg(t,T.snap,T.snap+0.5):0;
    if(t<T.r1+0.8){ hang(0); hang(1); }
    else if(t<T.w1+0.7){ hang(1); whip(0,T.w1,dChest); }
    else if(t<T.r2+0.45){ hang(0); hang(1); }
    else if(t<T.zip){ hang(0); whip(1,T.w2,[X+d.x,HT.DDK*1.25,Z],true); }
    else if(t<T.tie0){ chain(F,hands[1],[PIL[0],PIL[1],PIL[2]],{sag:10,t,w:9,hot:1}); if(t<T.zip+0.9) coil(F,PIL[0],PIL[2],PIL[1]-60,PIL[1]+10,60,2,{w:8}); hang(0); }
    else if(t<T.snap){ for(let j=0;j<2;j++) if(!far[j]) tieChain(j,hands,dArms); }   // tay GẦN: xích vẽ trước mặt; quấn siết quanh cổ tay   // quấn siết quanh 2 cổ tay (trước vẽ vòng to ngang ngực)
    else if(snapK<1){ for(let j=0;j<2;j++){ const h=hands[j]; chain(F,h,[lerp(dArms[j][0],h[0],0.5)+j*40,lerp(dArms[j][1],h[1],0.5)-snapK*200,Z],{sag:-20,wob:8,t,w:8,hot:1-snapK*0.5}); } }
    else if(!dashing){ hang(0); hang(1); }
    // ── hiệu ứng
    if(t>=T.w1&&t<T.w1+1.1){ K.sparks(F,{x:dChest[0],y:dChest[1],z:Z,t0:T.w1,n:60,speed:900,life:0.7,seed:91,col:'255,140,60'}); if(t<T.w1+0.3){ const u=seg(t,T.w1,T.w1+0.3); K.ring(F,dChest[0],Z,20+160*eout(u),8,0.6*(1-u),'255,170,90'); } K.smoke(F,{x:X+d.x,z:Z,t0:T.w1+0.1,n:8,spread:200,rise:30,life:0.9,size:70,seed:92,a:0.4,tint:'120,104,96'}); }   // xích quất trúng tay đỡ, Doge trượt lùi
    if(t>=T.punch&&t<T.punch+2.0){ const px=X+110; K.debris(F,{x:px,y:10,z:Z+60,t0:T.punch,n:28,speed:1400,life:1.8,size:20,seed:93,col:'#4a4246'}); K.smoke(F,{x:px,z:Z,t0:T.punch,n:14,spread:700,rise:220,life:2,size:180,seed:94,a:0.38,tint:'130,104,96'});
      }   // (bỏ vòng sáng trắng trên sàn — trông giả) nắm đấm nện nát mặt đất (kiểu Big Bang Impact)
    if(t>=T.slam&&t<T.slam+1.6){ K.debris(F,{x:X+380,y:10,z:Z,t0:T.slam,n:40,speed:1100,life:1.4,size:28,seed:95,col:'#4a4246'}); K.smoke(F,{x:X+380,z:Z,t0:T.slam,n:14,spread:500,rise:140,life:1.6,size:160,seed:96,a:0.55,tint:'130,104,96'});
      if(t<T.slam+0.6){ const u=seg(t,T.slam,T.slam+0.6); K.ring(F,X+380,Z,40+600*eout(u),20,0.6*(1-u),'255,200,160'); } }
    if(t>=T.hakiOn&&t<T.hakiOn+1.6) K.smoke(F,{x:X+d.x,z:Z,t0:T.hakiOn,n:10,spread:220,rise:260,life:1.4,size:80,seed:97,a:0.22,tint:'40,30,40'});
    if(t>=T.snap&&t<T.snap+1.2){ K.debris(F,{x:X+d.x+60,y:110,z:Z,t0:T.snap,n:36,speed:1000,life:1.0,size:10,seed:98,col:'#ff6a20'}); K.sparks(F,{x:X+d.x+60,y:110,z:Z,t0:T.snap,n:46,speed:900,life:0.7,seed:99,col:'255,150,60'}); }   // mắt xích đứt văng tung toé
    if(t>=T.clash-0.02&&t<T.clash+0.7){ const cx=X+572, u=seg(t,T.clash,T.clash+0.5); K.sparks(F,{x:cx,y:105,z:Z,t0:T.clash,n:60,speed:1100,life:0.6,seed:111,col:'255,190,120'});
      K.smoke(F,{x:cx,z:Z,t0:T.clash,n:8,spread:500,rise:80,life:1.2,size:110,seed:112,a:0.28,tint:'120,104,96'}); }   // nắm đấm haki đụng xích: loé + sóng + tia lửa
    if(t>=T.clash-0.3&&t<T.clash+0.8){ K.smoke(F,{x:X+360,z:Z,t0:T.clash-0.27,n:8,spread:200,rise:40,life:1,size:80,seed:101,a:0.45,tint:'120,104,96'}); K.smoke(F,{x:X+700,z:Z,t0:T.clash-0.27,n:8,spread:200,rise:40,life:1,size:80,seed:102,a:0.45,tint:'120,104,96'}); } }
  // ── chân trời: trận Gojo vs Pain va chạm — loé tím trắng + vòng sóng trên trời (lúc 2 con lao vào nhau)
  function farFlash(F,t){ if(t<T.far) return; const v=t-T.far, P=K.proj(F.B,FZ[0]+9000,900,FZ[1]+3000); if(!P) return;
    F.list.push({d:5e8, fn:()=>{ const g=F.g, R=(300+2600*eout(Math.min(1,v*0.8)))*P.s; g.save(); g.globalCompositeOperation='lighter';
      let gr=g.createRadialGradient(P.x,P.y,0,P.x,P.y,R); gr.addColorStop(0,`rgba(255,255,255,${0.9*Math.max(0,1-v*0.6)})`); gr.addColorStop(0.3,'rgba(190,120,255,0.5)'); gr.addColorStop(0.7,'rgba(90,150,255,0.25)'); gr.addColorStop(1,'rgba(90,150,255,0)');
      g.fillStyle=gr; g.fillRect(P.x-R,P.y-R,2*R,2*R); g.strokeStyle=`rgba(230,220,255,${0.7*Math.max(0,1-v*0.7)})`; g.lineWidth=Math.max(2,R*0.02); g.beginPath(); g.ellipse(P.x,P.y,R*0.9,R*0.3,0,0,TAU); g.stroke(); g.restore(); }}); }
  const MUS='assets/audio/dp_akatsuki.mp3', ML=8.3, mseg=(ra,rb,o)=>Object.assign({src:MUS,ra,rb,off:ra%ML,vol:0.5,loop:true,fi:0.1,fo:0.3},o||{});
  // ⏱️ (12/11 tối) NHANH – CHẬM ĐAN XEN: nén theo loại shot — đối mặt ×0.75 · thở / giới thiệu ×0.85 · đánh ×0.92 · ra chiêu ×0.95 · nổ lớn / chuyển cảnh giữ nguyên
  const RETIME=[[0,1.5,0.85],[1.5,4.6,0.95],[4.6,8.5,0.75],[8.5,11,0.92],[11,13.8,0.85],[13.8,24.4,0.75],[24.4,26.4,0.95],[26.4,27.4,0.75],[27.4,31.6,0.95],[31.6,33.3,0.92],[33.3,36.4,1],[36.4,38.8,0.85],[38.8,45.6,0.75],[45.6,48.6,0.85],[48.6,50.2,0.75],[50.2,59.4,0.92],[59.4,62.6,0.75],[62.6,64.4,0.92],[64.4,66.9,0.85],[66.9,69.4,0.95],[69.4,71.9,0.92],[71.9,73.9,0.75],[73.9,75.6,0.92],[75.6,77.65,1]];
  CineKit.film(W.retime(RETIME,{ id:'fin1f1', title:'Final 1 · Fight · Chud + Mlem vs Doge + Clapping Cat', DUR:T.DUR, VW:960, VH:540, fadeIn:false, fadeOut:false,   // vào từ lỗ vòng khói fin1f2 · ra: lao về chân trời sang Gojo vs Pain
    imgs:IMG, cast:['dc','mlem','clap'],
    sfxOk:{ clap_cat:'Clapping cười vỗ tay liên tục: mỗi lần vỗ 1 tiếng (game)', dc_chain:'mỗi nhát xích quất / quấn trúng 1 tiếng (game)' },
    // 🔊 mở đầu KHÔNG NHẠC → nhạc vào khi Meowkatsuki bước ra → LẶNG lúc mắt Doge loé → bùng lại khi băng vỡ → LẶNG trước Haki → bùng lại khi xích đứt
    //    xích = 1 giọng `dc_chain` (của Chud) · đòn tay của Doge = se_punch_* · cú nặng có lớp trầm '+'
    sfx:[[T.strikeD,'cine_impact',0.8,null,'cột Bifrost vàng giáng thẳng từ trời xuống công viên'],
      [T.strikeK,'cine_impact',0.65,null,'+ cột Bifrost trắng giáng xuống ngay sau, cạnh cột vàng'],
      [T.landD-0.65,'l2p_riser',0.45,null,'Doge từ từ hạ xuống trong cột sáng'],
      [T.landD,'kn_boom_low',0.65,null,'Doge đáp đất, sóng bùng quét qua bãi cỏ'],
      [T.landK,'se_step_in',0.7,null,'Clapping đáp đất, bụi toé vòng'],
      [T.lurk+0.4,'l2p_sub',0.4,null,'trong hàng cây: bóng Chud xích đỏ rực + bóng Mlem, mắt loé'],
      [T.bind-0.2,'dc_chain',0.9,null,'2 sợi xích nung đỏ từ bóng tối quấn chặt quanh người Doge'],
      [T.lick-0.15,'mlem_lick',0.9,null,'Mlem phóng lưỡi từ bụi cây liếm trúng Doge'],
      [T.frz,'mlem_freeze',1,null,'Doge bị đóng băng cứng cả người (vẫn bị xích quấn)'],
      [T.out,'se_gogogo',0.35,3.4,'Chud + Mlem bước ra từ hàng cây (sức ép gogogo)'],
      ...CLAPS.map((s,i)=>[s,'clap_cat',0.75,null,(i?'+ ':'')+'Clapping cười, vỗ tay']),
      [T.shake,'se_tremor',0.7,3.6,'không gian chấn động, mặt đất rung, lá rụng, xích căng rung'],
      [T.turn,'ep3_whoosh',0.45,null,'Chud + Mlem quay phắt lại nhìn khối băng'],
      [T.crack,'l2p_crack',0.85,null,'khối băng nứt dần, vết nứt lan ra'],
      [T.eye,'ep3_shine',0.5,null,'mắt Doge loé sáng trong khối băng'],
      [T.burst,'duo_ice_break',1,null,'Buff Doge đập vỡ tung khối băng, xích bung ra, mảnh băng vỡ văng'],
      [T.burst+0.01,'kn_boom_low',0.6,null,'+ lớp trầm: Buff Doge bùng ra khổng lồ'],
      [T.charge,'se_machdash',0.9,null,'Doge xoắn tròn lao thẳng vào Chud (One-Punch Shiba)'],
      [T.ram,'se_super_hit',1,null,'Doge húc trúng ngực Chud'],
      [T.ram+0.01,'kn_punch_heavy',0.6,null,'+ lớp thịt cú húc trúng'],
      [T.b1,'se_wall_break',0.9,null,'cả 2 đâm xuyên toà nhà dãy thứ nhất, tường vỡ'],
      [T.b2,'se_rock_break',0.75,null,'xuyên tiếp dãy thứ 2, bê tông vỡ vụn'],
      [T.b3,'se_collapse',0.8,null,'xuyên dãy thứ 3, toà nhà đổ sập, mảng tường rơi'],
      [T.dust+0.2,'se_collapse_b',0.6,4.5,'cột bụi bốc cao sau công viên, nhà đổ rền từ xa'],
      [T.mturn+0.2,'l2p_sub',0.35,null,'Mlem chậm rãi quay sang Clapping'],
      [T.raise+0.3,'ep3_shine',0.45,null,'Clapping đứng giơ tay như meme, 2 con đứng nhìn nhau'],
      // trận chính
      [T.rise+0.2,'se_rock_break',0.45,null,'đá vụn lăn xuống, 2 con đứng dậy giữa đống đổ nát'],
      [T.chains,'se_gogogo',0.3,1.6,'cận Chud: 2 xích nung đỏ buông thõng, sức ép'],
      [T.r1+0.1,'se_step_in',0.8,null,'Doge đạp đất lao vào'],
      [T.w1,'dc_chain',1,null,'xích quất trúng 2 tay Doge đang đỡ'],
      [T.w1+0.01,'kn_punch_heavy',0.55,null,'+ lớp thịt cú quất trúng'],
      [T.w1+0.2,'se_pushback',0.75,null,'+ Doge bị đẩy trượt lùi xa trên đất (lớp đuôi của cú quất)'],
      [T.r2+0.2,'se_step_in',0.7,null,'Doge lao vào lần nữa'],
      [T.w2,'se_swing_kick',0.7,null,'xích vụt sượt qua đầu, Doge cúi né'],
      [T.zip+0.55,'l2p_whoosh',0.5,null,'+ Chud đu vụt ra xa trên xích quấn cột (lớp đuôi, sau tiếng nện đất)'],
      [T.punch,'se_punch_heavy',1,null,'nắm đấm toàn lực của Doge đập trúng mặt đất (hụt Chud)'],
      [T.punch+0.01,'kn_boom_low',0.7,null,'+ lớp trầm: mặt đất nứt bùng thành hố'],
      [T.punch+0.45,'se_rock_break',0.6,null,'đá vụn văng tung, rơi lả tả'],
      [T.tie,'dc_chain',0.9,null,'2 xích quấn chặt trói 2 tay Doge'],
      [T.tug,'l2p_riser',0.5,null,'giằng co: xích căng rực đỏ, chân Doge trượt dần'],
      [T.lift,'se_machdash',0.7,null,'Chud giật mạnh, nhấc bổng Doge lên'],
      [T.slam,'se_super_hit',1,null,'Doge bị quật đập trúng mặt đất'],
      [T.slam+0.01,'kn_boom_low',0.6,null,'+ lớp trầm: đất bùng nứt dưới lưng Doge'],
      [T.haki,'ep3_shine',0.5,null,'cực cận: mắt Doge loé'],
      [T.hakiOn,'cine_haki',0.9,null,'HAKI thức tỉnh: 2 tay Doge phủ đen bóng, trận đứng hình'],
      [T.snap,'kn_explode_crunch',0.9,null,'Doge giật ngược đập tan: 2 sợi xích đứt vỡ tung'],
      [T.shock+0.2,'l2p_sub',0.4,null,'cận Chud sững người'],
      [T.clash-0.27,'se_step_in',0.9,null,'2 con đạp đất, hoá 2 vệt lao vào nhau'],[T.clash,'se_punch_heavy',1,null,'nắm đấm haki đụng xích Chud giữa đường: va chạm'],[T.clash+0.01,'kn_boom_low',0.6,null,'+ lớp trầm: tiếng nổ nén khi 2 đòn đụng nhau'],
      [T.far,'kn_boom_low',0.8,null,'chân trời nổ loé tím trắng, tiếng nổ dội từ xa'],
      [T.whip,'l2p_whoosh',0.7,null,'máy lia giật về phía chân trời'],[T.tunnel,'l2p_riser',0.7,null,'máy lao về phía trận Gojo vs Pain']],
    duckAuto:{decisive:[T.ram,T.snap]},   // 🎚️ nhạc nhường tiếng: mỗi cú lùi nhạc, cú húc + giật đứt xích thì lặng trước rồi nổ
    mus:[mseg(T.out,T.quiet,{fi:1.2}), mseg(T.burst,T.haki-0.3,{vol:0.55}), mseg(T.snap,T.DUR,{fo:0.6,vol:0.6})],
    theme:t=>theme(t), shots,
    impact:C.negFrames([T.burst,T.snap],0.07,'inv',[T.ram,T.slam]),
    shake:t=>{ let s=0; const h=(a,amp,d)=>{ if(t>=a&&t<a+d) s=Math.max(s,amp*(1-(t-a)/d)); };
      if(t>=T.shake&&t<T.burst) s=Math.max(s,1.5+2.5*seg(t,T.shake,T.quiet)); if(t>=T.quiet&&t<T.burst) s=0.5;
      h(T.strikeD,8,0.5); h(T.strikeK,6,0.4); h(T.landD,6,0.4); h(T.landK,4,0.3); h(T.bind,4,0.3); h(T.frz,4,0.4); h(T.burst,16,0.8); h(T.charge,6,0.3); h(T.ram,18,0.8); for(const [tb] of HITS) h(tb,8,0.6);
      h(T.w1,14,0.45); h(T.punch,20,0.9); h(T.slam,16,0.7); h(T.hakiOn,5,1.0); h(T.snap,10,0.5); h(T.clash,14,0.5); h(T.far,6,0.8); if(t>=T.tug&&t<T.lift) s=Math.max(s,1.2); return s; },
    world, post(F,t){ const fx={shocks:[]}; const sh=(a,x,y,z,rm,d,str)=>{ if(t>=a&&t<a+d){ const u=(t-a)/d; fx.shocks.push({x,y,z,r:20+rm*eout(u),w:26,str:str*(1-u)}); fx.chroma=Math.max(fx.chroma||0,0.5*(1-u)); } };
      sh(T.burst,-260,80,-180,600,0.7,26); sh(T.ram,CH0[0],120,CH0[1],520,0.6,28); sh(T.punch,FZ[0]+110,40,FZ[1],800,0.8,12); sh(T.slam,FZ[0]+380,40,FZ[1],520,0.6,22); sh(T.hakiOn,FZ[0]+380,120,FZ[1],400,0.9,18); return fx; },
    screen(F,t){
      if(t>=T.charge&&t<T.ram) K.panLines(F,{k:0.55,ang:-0.3,n:24});
      if(t>=T.ram&&t<T.b1) K.speedLines(F,{k:0.45*(1-seg(t,T.ram+0.4,T.b1)),n:60,r0:0.45});
      if(t>=T.lunge+0.25&&t<T.far) K.speedLines(F,{k:0.4,n:50,r0:0.45});
      if(t>=T.strikeD&&t<T.strikeD+0.06) K.flash(F,0.4,'#fff4c8'); if(t>=T.strikeK&&t<T.strikeK+0.06) K.flash(F,0.3,'#ffffff');
      if(t>=T.ram&&t<T.ram+0.05) K.flash(F,0.35,'#fff1d6'); if(t>=T.clash&&t<T.clash+0.05) K.flash(F,0.4,'#fff1e0');
      if(t>=T.burst&&t<T.burst+0.05) K.flash(F,0.4,'#eaf6ff');
      if(t>=T.hakiOn&&t<T.hakiOn+1.0){ const g=F.g; g.save(); g.globalCompositeOperation='multiply'; g.fillStyle=`rgba(150,140,160,${0.5*(1-seg(t,T.hakiOn+0.7,T.hakiOn+1.0))})`; g.fillRect(0,0,F.VW,F.VH); g.restore(); }   // trận đứng hình: cả khung xám tối lại
      if(C){ C.whipFx(F,t,T.whip,T.tunnel-T.whip); C.speedTunnel(F,t,T.tunnel,T.DUR-T.tunnel); }
      K.letterbox(F,t>=T.lurk&&t<T.bind-0.3?0.7:(t>=T.raise&&t<T.rise?0.8:0));
      K.vignette(F,t>=T.lurk&&t<T.bind-0.3?0.8:0.5); } }));
})();
