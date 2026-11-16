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
    look:4.6, lurk:6.8, bind:8.8, lick:9.5, frz:9.62, hold:11, out:13.8, surr:17, laugh:19.4, puzzle:22.6, shake:24.4, imp1:26.2, wideD:26.25, turn:26.25, crack:24.9, eye:27.6, blk:28.9, zImp:29.4, quiet:31.1, 
    burst:29.65, charge:31.6, ram:32.4, b1:33.3, b2:34.2, b3:35.1, dust:36.4, cover:38.8, mturn:41.6, raise:43.2, rise:45.6, net0:46.6, spin:46.85, back:47.05, release:47.25, netDone:47.75, r1:48.0, l1:48.25, l2:48.5, l3:48.8, swing0:49.4, punch:49.95, land:50.2, tie0:50.6, tie:51.0, tug:51.4,
    lift:51.9, slam:52.3, lift2:52.55, slam2:52.95, down:53.3, haki:54.6, hakiOn:55.2, pull:56.4, snap:57.1, shock:57.8, lunge:58.4, clash:59.1, far:59.5, whip:60.25, tunnel:60.45, DUR:61.4 };   // (16/11 v3) THIÊN LA ĐỊA VÕNG   // (13/11 anh: "dựng lại combat nhịp nhanh, kết như t bảo") giao tranh ~16s thay ~32s
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
  // ⛓️ (13/11) Doge có XÍCH QUẤN SẴN trong ảnh (GPT vẽ cùng nhân vật: đúng nếp quấn, đè / khuất đúng chỗ) — HAND = chỗ đầu xích thò ra khỏi ảnh để nối đoạn xích lặp
  Object.assign(IMG,{DCW:'assets/img/cine/FIN_F1_DOGE_CHAINPULL.png',DCL:'assets/img/cine/FIN_F1_DOGE_CHAINLIFT.png',CHT:'assets/img/cine/FIN_F1_CHAIN_TILE.png',
    DDC:'assets/img/cine/FIN_F1_DDOWN_lieChain.png',DKC:'assets/img/cine/FIN_F1_DDOWN_kneelChain.png',DHK:'assets/img/cine/FIN_F1_DOGE_HAKIChain.png',DHC:'assets/img/cine/FIN_F1_DOGE_HPULLChain.png'});   // (13/11 anh chê xích lơ lửng / quấn bụng) nằm · quỳ · đứng Haki · Haki giật xích: vòng xích quấn CỔ TAY vẽ sẵn, đoạn thẳng xoá đi để code nối
  Object.assign(DIR,{DCW:-1,DCL:-1,DHC:-1}); Object.assign(HT,{DCW:H*1.75,DCL:H*2.0,DDC:H*0.92,DKC:H*1.65,DHK:H*1.9,DHC:H*1.7});
  Object.assign(IMG,{CN1:'assets/img/cine/FIN_F1_CN_1.png',CN2:'assets/img/cine/FIN_F1_CN_2.png',CN3:'assets/img/cine/FIN_F1_CN_3.png',CN4:'assets/img/cine/FIN_F1_CN_4.png',CN5:'assets/img/cine/FIN_F1_CN_5.png',CN6:'assets/img/cine/FIN_F1_CN_6.png',CN7:'assets/img/cine/FIN_F1_CN_7.png',CN8:'assets/img/cine/FIN_F1_CN_8.png'});   // Chud: lấy đà · xoay · quay lưng · bủa 2 tay · quăng · giật về · đu xích · tiếp đất
  Object.assign(DIR,{CN1:0,CN2:0,CN3:0,CN4:0,CN5:0,CN6:0,CN7:0,CN8:0}); Object.assign(HT,{CN1:H*1.17,CN2:H*1.18,CN3:H*1.10,CN4:H*1.17,CN5:H*1.22,CN6:H*1.20,CN7:H*1.0,CN8:H*0.99});
  for(const k of ['1a','1b','1c','2a','2b','2c','2d','2e','3a','3b','5a','5b']) IMG['ZN'+k]='assets/img/cine/FIN_F1_ZEN_'+k+'.jpg'; IMG.ZNE1='assets/img/cine/FIN_F1_ZEN_E1.jpg';   // (16/11) phá băng kiểu Zenitsu: khung vẽ phủ kín màn
  const HAND={CN1:[[0.114,0.40],[0.18,0.445]],CN2:[[0.104,0.088],[0.104,0.407]],CN3:[[0.06,0.226],[0.97,0.226]],CN4:[[0.03,0.215],[0.933,0.21]],CN5:[[0.224,0.06],[0.853,0.06]],CN6:[[0.29,0.268],[0.696,0.268]],CN7:[[0.519,0.018],[0.706,0.044]],CN8:[[0.977,0.248],[0.977,0.248]],DCW:[[0.995,0.462],[0.99,0.478]],DCL:[[0.845,0.004],[0.83,0.012]],DDC:[[0.846,0.059],[0.8,0.762]],DKC:[[0.9,0.61],[0.25,0.835]],DHK:[[0.99,0.74],[0.255,0.727]],DHC:[[0.004,0.33],[0.004,0.517]],DGP:[[0.9,0.95],[0.08,0.5]],DPL:[[0.03,0.31],[0.03,0.43]],DHP:[[0.03,0.14],[0.05,0.27]],DBL:[[0.12,0.15],[0.3,0.13]],DB:[[0.33,0.27],[0.7,0.27]],DPU:[[0.02,0.4],[0.02,0.4]],DRN:[[0.06,0.55],[0.85,0.45]],DDK:[[0.05,0.75],[0.2,0.8]],DH:[[0.2,0.62],[0.8,0.62]],
    DBF:[[0.33,0.27],[0.7,0.27]],DBQ:[[0.3,0.27],[0.62,0.27]],DBS:[[0.06,0.35],[0.1,0.37]],DBQB:[[0.1,0.35],[0.4,0.33]],DBB:[[0.1,0.4],[0.9,0.4]],DRB:[[0.1,0.55],[0.88,0.55]],DRF:[[0.12,0.55],[0.88,0.55]],DRQ:[[0.05,0.55],[0.6,0.5]],
    DDL:[[0.8,0.27],[0.76,0.8]],DKN:[[0.12,0.75],[0.75,0.55]],DUP:[[0.3,0.33],[0.6,0.33]],
    CKF:[[0.02,0.39],[0.97,0.38]],CKQ:[[0.05,0.39],[0.65,0.42]],CKS:[[0.05,0.38],[0.1,0.4]],CKQB:[[0.05,0.41],[0.92,0.4]],CKB:[[0.03,0.4],[0.95,0.4]],
    CWB:[[0.07,0.45],[0.92,0.1]],CWF:[[0.85,0.45],[0.4,0.27]],CWQ:[[0.1,0.47],[0.8,0.02]],CHF:[[0.3,0.12],[0.48,0.1]],CHL:[[0.4,0.35],[0.55,0.4]],CHK:[[0.02,0.42],[0.98,0.42]],
    C0:[[0.18,0.55],[0.82,0.55]],CK0:[[0.05,0.43],[0.96,0.43]],CK1:[[0.04,0.03],[0.62,0.48]],CK2:[[0.83,0.02],[0.88,0.47]],CK3:[[0.05,0.47],[0.97,0.04]],CK4:[[0.12,0.27],[0.97,0.38]]};
  // (16/11 anh: "không dùng doge góc nghiêng và sau lưng nữa, trông ngốc lắm") Doge chỉ còn ảnh CHÍNH DIỆN / 3/4 TRƯỚC + ảnh động tác gốc — máy ở góc nghiêng / sau lưng cũng dùng ảnh chính diện
  const VIEWS={ DB:{v:{front:'DBF',q3f:'DBQ',side:'DBQ',q3b:'DBQ',back:'DBF'},face:{q3f:1,side:1,q3b:1}},
    DPU:{v:{side:'DPU',front:'DPF',back:'DPF',q3b:'DPU'},face:{}},
    CK2:{v:{side:'CK2',front:'CWF',back:'CWB',q3b:'CWQ'},face:{side:1,q3b:1}}, CK4:{v:{side:'CK4',front:'CWF',back:'CWB',q3b:'CWQ'},face:{side:1,q3b:1}},
    CK0:{v:{front:'CKF',q3f:'CKQ',side:'CKS',q3b:'CKQB',back:'CKB'}},
    DZ:{v:{side:'DZ',back:'DRF',q3b:'DZ',front:'DRF'},face:{q3b:1,side:1}},   // ảnh One-Punch Shiba gốc quay mặt PHẢI     // CHARGE: nhìn ngang = meme One-Punch Shiba · từ sau lưng = Buff Doge lao đi (anh 12/11: "quay mặt ra ngoài nhưng lao về phía trước")
    DRN:{v:{side:'DRN',back:'DRF',q3b:'DRN',front:'DRF'},face:{}} };
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
  const DM=[[T.rise,-260,'DKN',0,0,0,0],[T.rise+0.5,-260,'DUP'],[T.rise+1.0,-260,'DB'],[T.r1,-260,'DB'],[T.r1+0.2,-60,'DBL','eout',0,0,0],[T.l1+0.1,-70,'DBL'],[T.l2-0.06,-70,'DPU'],[T.l2+0.2,-75,'DPU'],[T.l3-0.02,-75,'DBL'],[T.l3+0.35,-330,'DKN','eout',1,0,40],[T.l3+0.5,-330,'DKN','ein',0,0,0],   // lao vào lưới: đỡ · đấm gạt · ăn roi văng
    [T.swing0+0.3,-330,'DB'],[T.punch-0.05,-330,'DB'],[T.punch-0.04,250,'DGP','ein',1],[T.tie0-0.05,250,'DGP'],   // lao vào chỗ Chud vừa rời → đấm nện vỡ đất
    [T.tie0,250,'DB'],[T.tie,255,'DCW','eout'],[T.tug,270,'DCW'],[T.lift-0.15,300,'DCW','lin',0,0,0],[T.lift,320,'DCL','eout',0,0,260],[T.slam,380,'DDC','ein',1,0,0],[T.lift2,380,'DCL','eout',0,0,220],[T.slam2,380,'DDC','ein',1,0,0],[T.down,380,'DDC'],   // lưới siết · nhấc bổng · quật 2 lần
    [T.haki,380,'DDC'],[T.haki+0.3,380,'DKC'],[T.hakiOn,380,'DHK'],[T.pull,380,'DHC','eout'],[T.snap,365,'DHP'],[T.snap+0.4,360,'DH','back'],[T.lunge,360,'DH'],[T.clash-0.5,345,'DP1','eout'],[T.clash-0.27,345,'DP1'],[T.clash,495,'DP1','ein',1],[T.DUR,495,'DP1']];
  const CM=[[T.rise,600,'CHL',0,0,0,0],[T.rise+0.4,600,'CHK'],[T.rise+0.8,600,'CK0'],[T.net0,600,'CN1'],[T.spin,600,'CN2'],[T.back,600,'CN3'],[T.release,600,'CN4'],[T.r1,600,'CN4'],[T.r1+0.05,600,'CK0'],   // THIÊN LA ĐỊA VÕNG: lấy đà · xoay · bủa 2 tay
    [T.l1-0.05,600,'CN6'],[T.l1+0.1,600,'CK0'],[T.l2-0.05,600,'CN6'],[T.l2+0.1,600,'CK0'],[T.l3-0.05,600,'CN6'],[T.l3+0.2,600,'CK0'],[T.swing0,600,'CN7',0,0,0,0],[T.swing0+0.25,730,'CN7','eout',0,0,330],[T.land-0.05,860,'CN7','ein',0,0,40],[T.land,860,'CN8',0,0,0,0],   // giật xích quất · ĐU trên lưới · tiếp đất
    [T.tie0,860,'CN5'],[T.tie,860,'CN5'],[T.tug,860,'CN6'],[T.lift-0.15,860,'CN6'],[T.lift,860,'CK4'],[T.slam,860,'CN6'],[T.lift2,860,'CK4'],[T.slam2,860,'CN6'],[T.down,860,'CK0'],   // quăng lưới siết · giật · nhấc · quật
    [T.down+0.8,740,'CK0','eio'],[T.snap,740,'CK0'],[T.snap+0.25,700,'CK0','eout'],[T.shock,700,'CK0'],[T.lunge,700,'CK0'],[T.clash-0.5,712,'CK1','eout'],[T.clash-0.27,712,'CK1'],[T.clash,650,'CK2','ein',1],[T.DUR,650,'CK2']];
  const doge=t=>W.track(DK,t), clap=t=>W.track(KK,t), mlem=t=>W.track(MK,t), chud=t=>W.track(CK,t);
  const hs=W.hstop([[T.l3,0.14],[T.punch,0.18],[T.slam,0.16],[T.slam2,0.2],[T.hakiOn,1.0],[T.snap,0.2]]);   // HAKI: trận đứng hình 1s (đúng game)
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
  const shots=W.cutify(C.seq([
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
    S(T.shake,T.imp1,{tx:-262,ty:64,tz:-180,dist:105,yaw:-24,pitch:-2,fov:40},{tx:-262,ty:64,tz:-180,dist:92,yaw:-24,pitch:-2,fov:40},'lin'),   // D1 (16/11 Zenitsu) cực cận Doge trong băng, băng rạn, sét vàng lách tách, đẩy rất chậm
    S(T.imp1,T.wideD,{tx:-262,ty:120,tz:-180,dist:620,yaw:-22,pitch:-12,fov:54}),   // D2 khung đen → impact → trắng (vẽ ở impact / grade)
    S(T.wideD,T.eye,{tx:-262,ty:120,tz:-180,dist:620,yaw:-22,pitch:-12,fov:54}),   // D3 góc rộng thấp: băng + đá nổi lên, sét vàng nháy khắp nơi
    S(T.eye,T.blk,{tx:-253,ty:70,tz:-180,dist:52,yaw:-24,pitch:-2,fov:38}),   // D4 cực cận mắt Doge MỞ, loé vàng
    S(T.blk,T.burst,{tx:-262,ty:420,tz:-180,dist:1300,yaw:-22,pitch:-16,fov:56}),   // D5 rộng lần 2: đá nổi kín nửa trên, băng sắp nổ → impact frame
    S(T.burst,T.charge,{tx:-262,ty:420,tz:-180,dist:1400,yaw:-22,pitch:-16,fov:56}),   // D6 CỘT SÁNG VÀNG nổ băng → tối lặng
    S(T.charge,T.ram-0.3,{tx:-262,ty:115,tz:-180,dist:430,yaw:-140,pitch:-2,fov:56}),   // D7 One-Punch Shiba lao THẲNG VỀ MÀN HÌNH, lướt qua giữa Mlem và Clapping (anh khen)
    S(T.ram-0.3,T.b1,{tx:60,ty:120,tz:200,dist:640,yaw:130,pitch:2,fov:54}),   // E1 Chud đang đứng → vệt sáng vàng húc NGANG qua khung cuốn đi
    S(T.b1,T.dust,{tx:2200,ty:900,tz:2900,dist:3700,yaw:-40,pitch:12,fov:56}),   // E2 toàn cao: 3 toà nhà nổ nối tiếp theo đường vệt
    S(T.dust,T.cover,{tx:1500,ty:900,tz:2600,dist:3400,yaw:-30,pitch:2,fov:54},{tx:1500,ty:960,tz:2600,dist:3300,yaw:-30,pitch:1,fov:54},'lin'),         // THỞ: cột bụi bốc cao sau công viên
    ...C.pushIn(T.cover,{d:T.mturn-T.cover,tx:-120,ty:66,tz:-60,dist:250,dist1:225,yaw:-150,pitch:-3,fov:46}),                                          // cận: Clapping CHE MỒM nhìn theo, bất lực
    S(T.mturn,T.raise,{tx:-330,ty:70,tz:90,dist:260,yaw:30,pitch:-3,fov:46},{tx:-330,ty:70,tz:90,dist:245,yaw:30,pitch:-3,fov:46},'lin'),              // cận Mlem: chậm rãi quay sang Clapping
    S(T.raise,T.rise,{tx:-230,ty:80,tz:0,dist:560,yaw:-12,pitch:-1,fov:48},{tx:-230,ty:80,tz:0,dist:520,yaw:-12,pitch:-1,fov:48},'lin'),               // Clapping quay lại GIƠ TAY như meme; 2 con đứng nhìn nhau
    // ── TRẬN CHÍNH (bãi trống sau 3 dãy nhà): máy NGANG, giữ trục — Doge trái, Chud phải ──
    S(T.rise,T.net0,{tx:FX0+150,ty:130,tz:FZz,dist:950,yaw:0,pitch:-3,fov:52}),   // F1 đống đổ nát: 2 con đứng dậy
    S(T.net0,T.release,{tx:FX0+600,ty:105,tz:FZz,dist:420,yaw:8,pitch:-6,fov:48}),   // F2 cận Chud: lấy đà · xoay người · quay lưng
    S(T.release,T.r1,{tx:FX0+120,ty:0,tz:FZz,dist:1700,yaw:0,pitch:58,fov:54}),   // F2 góc CHIM: xích bủa ra 10 hướng, cắm vào cột / toà nhà / đất → LƯỚI đỏ rực vây Doge
    S(T.r1,T.l2,{tx:FX0-60,ty:105,tz:FZz,dist:560,yaw:0,pitch:2,fov:50}),   // F3 Doge lao vào: đỡ roi thứ nhất
    S(T.l2,T.l3-0.05,{tx:FX0-60,ty:80,tz:FZz,dist:360,yaw:24,pitch:-8,fov:50}),   // F3 góc thấp: đấm gạt roi thứ hai
    S(T.l3-0.05,T.swing0,{tx:FX0-180,ty:100,tz:FZz,dist:620,yaw:-6,pitch:2,fov:50}),   // F3 roi thứ ba quất trúng lưng → văng
    S(T.swing0,T.punch+0.35,{tx:FX0+380,ty:260,tz:FZz,dist:1250,yaw:0,pitch:4,fov:54}),   // F4 toàn: Chud ĐU trên lưới như nhện · Doge lao tới đấm chỗ vừa rời
    S(T.punch+0.35,T.tie0,{tx:FX0+250,ty:60,tz:FZz,dist:430,yaw:-10,pitch:8,fov:48}),   // F4 cận hố đấm
    S(T.tie0,T.tug,{tx:FX0+520,ty:120,tz:FZz,dist:820,yaw:0,pitch:3,fov:52}),   // F5 lưới SIẾT quấn cổ tay, cổ chân Doge
    S(T.tug,T.lift,{tx:FX0+270,ty:110,tz:FZz,dist:310,yaw:-10,pitch:-2,fov:46}),   // F5 cận Doge gồng
    S(T.lift,T.down,{tx:FX0+520,ty:240,tz:FZz,dist:960,yaw:0,pitch:-6,fov:52}),   // F5 nhấc bổng · quật 2 lần
    S(T.down,T.haki,{tx:FX0+380,ty:50,tz:FZz,dist:330,yaw:-6,pitch:10,fov:46}),   // F6 Doge nằm, Chud bước tới
    S(T.haki,T.hakiOn,{tx:FX0+380,ty:110,tz:FZz,dist:220,yaw:-10,pitch:2,fov:44}),   // cực cận: Doge chống gối dậy
    S(T.hakiOn,T.pull,{tx:FX0+392,ty:210,tz:FZz,dist:290,yaw:-10,pitch:-2,fov:44}),   // HAKI: 2 tay đen bóng, trận đứng hình
    S(T.pull,T.shock,{tx:FX0+540,ty:110,tz:FZz,dist:600,yaw:0,pitch:2,fov:50}),   // Doge giật ngược → XÍCH ĐỨT TUNG
    S(T.shock,T.lunge,{tx:FX0+700,ty:100,tz:FZz,dist:240,yaw:14,pitch:-2,fov:44}),   // cận Chud sững người
    S(T.lunge,T.far,{tx:FX0+540,ty:120,tz:FZz,dist:500,yaw:0,pitch:0,fov:52}),   // 2 con hoá 2 vệt lao vào nhau
    S(T.far,T.whip,{tx:FX0+560,ty:120,tz:FZz,dist:420,yaw:0,pitch:0,fov:52}),   // KHỰNG giữa không trung — chân trời loé tím
    S(T.whip,T.tunnel,{tx:FX0+560,ty:150,tz:FZz,dist:500,yaw:-70,pitch:0,fov:52}),   // CẮT sang hướng chân trời
    S(T.tunnel,T.DUR,{tx:FX0+2000,ty:300,tz:FZz,dist:500,yaw:-80,pitch:0,fov:56}) ]),{keep:[[T.shake,T.imp1]]});   // giữ 2 shot anh khen: One-Punch Shiba lao qua · cắt sang Chud bị húc bay trên ngọn cây                                                                  // lao đi (đường hầm tốc độ)
  // ───────── VẼ ─────────
  const mouthM=m=>[m.x+26,m.y+62,m.z-14];
  function tongue(F,t,t0,A,tg,o){ o=o||{}; const out=o.out||0.18, back=o.back||0.3; if(t<t0-out||t>t0+back) return;
    const k=t<t0?eout(seg(t,t0-out,t0)):1-ein(seg(t,t0,t0+back)); const B=[lerp(A[0],tg[0],k),lerp(A[1],tg[1],k),lerp(A[2],tg[2],k)];
    const P=[]; for(let i=0;i<=10;i++){ const f=i/10; P.push([lerp(A[0],B[0],f),lerp(A[1],B[1],f)+Math.sin(Math.PI*f)*40*k,lerp(A[2],B[2],f)]); }
    W.taper(F,P,16,11,'#ff7aa2',{stroke:'#b8335c',shine:true}); }
  // ⛓️ XÍCH NUNG ĐỎ — chép cách game vẽ (`_dcCord`): quầng đỏ cam → lõi tối → dải ảnh dây xoắn DC_CORD_IMG kéo theo đường đi
  const CORD_X0=0.30, CORD_X1=0.75, CORD_Y1=0.844;
  // ⛓️ (13/11) MẮT XÍCH THẬT: ô ảnh GPT (FIN_F1_CHAIN_TILE: nửa mắt dẹt · 1 mắt đứng · nửa mắt dẹt — nối ô cạnh nhau liền mạch) đặt nối đuôi dọc đường đi, mỗi ô xoay theo đoạn đó
  function linkScreen(g,im,pts,cw,hot){ if(pts.length<2||!im||!im.complete||!im.naturalWidth) return false; const LH=cw*1.7, PER=LH*im.naturalWidth/im.naturalHeight; const L=[0]; for(let i=1;i<pts.length;i++) L.push(L[i-1]+Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1])); const tot=L[L.length-1]; if(tot<1) return true;
    g.save(); if(hot){ g.lineCap='round'; g.lineJoin='round'; for(const [w,al] of [[LH*1.5,0.16],[LH*1.05,0.32]]){ g.strokeStyle=`rgba(255,${w>LH*2?50:110},0,${al*hot})`; g.lineWidth=w; g.beginPath(); g.moveTo(pts[0][0],pts[0][1]); for(let i=1;i<pts.length;i++) g.lineTo(pts[i][0],pts[i][1]); g.stroke(); } }
    let seg2=1; for(let d=0;d<tot;d+=PER){ const len=Math.min(PER,tot-d), m=d+len/2; while(seg2<L.length-1&&L[seg2]<m) seg2++; const a=pts[seg2-1], b=pts[seg2], f=(m-L[seg2-1])/Math.max(1e-6,L[seg2]-L[seg2-1]), x=a[0]+(b[0]-a[0])*f, y=a[1]+(b[1]-a[1])*f;
      g.save(); g.translate(x,y); g.rotate(Math.atan2(b[1]-a[1],b[0]-a[0])); g.drawImage(im,0,0,im.naturalWidth*len/PER,im.naturalHeight,-len/2,-LH/2,len+0.5,LH); g.restore(); }
    g.restore(); return true; }
  function cordScreen(g,im,pts,cw,hot){ if(pts.length<2) return; if(linkScreen(g,CHT_IMG,pts,cw,hot)) return; g.save(); g.lineCap='round'; g.lineJoin='round';
    if(hot) for(const [w,al] of [[cw*3.4,0.28],[cw*2.0,0.6]]){ g.strokeStyle=`rgba(255,${w>cw*3?40:110},0,${al*hot})`; g.lineWidth=w; g.beginPath(); g.moveTo(pts[0][0],pts[0][1]); for(let i=1;i<pts.length;i++) g.lineTo(pts[i][0],pts[i][1]); g.stroke(); }
    g.strokeStyle='rgba(18,18,18,0.92)'; g.lineWidth=cw*0.75; g.beginPath(); g.moveTo(pts[0][0],pts[0][1]); for(let i=1;i<pts.length;i++) g.lineTo(pts[i][0],pts[i][1]); g.stroke();
    if(im&&im.complete&&im.naturalWidth){ const Wd=im.naturalWidth, Hd=im.naturalHeight, sx=Wd*CORD_X0, sw=Wd*(CORD_X1-CORD_X0), TH=Hd*CORD_Y1; let tot=0; for(let i=1;i<pts.length;i++) tot+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);
      let acc=0; const dw=cw/0.45; for(let i=1;i<pts.length;i++){ const a=pts[i-1], b=pts[i], L=Math.hypot(b[0]-a[0],b[1]-a[1]); if(L<0.01) continue; const sy=TH*acc/tot, sh=Math.max(1,TH*L/tot); acc+=L;
        g.save(); g.translate(a[0],a[1]); g.rotate(Math.atan2(b[1]-a[1],b[0]-a[0])-Math.PI/2); g.drawImage(im,sx,sy,sw,sh,-dw/2,0,dw,L+0.6); g.restore(); } }
    if(hot){ g.globalCompositeOperation='lighter'; g.strokeStyle=`rgba(255,120,40,${0.35*hot})`; g.lineWidth=cw*0.5; g.beginPath(); g.moveTo(pts[0][0],pts[0][1]); for(let i=1;i<pts.length;i++) g.lineTo(pts[i][0],pts[i][1]); g.stroke(); }
    g.restore(); }
  // xích từ điểm thế giới A tới B, võng / cong `sag` (đơn vị thế giới, + = võng xuống), lắc `wob`; k = độ dài đã phóng (0..1)
  let CHT_IMG=null;
  function chain(F,A,B,o){ o=o||{}; CHT_IMG=F.I.CHT||CHT_IMG; const k=o.k==null?1:o.k, N=18, P=[]; for(let i=0;i<=N;i++){ const f=i/N*k, x=lerp(A[0],B[0],f), y=lerp(A[1],B[1],f)-(o.sag||0)*4*f*(1-f)+(o.wob||0)*Math.sin(f*9+(o.t||0)*20)*f, z=lerp(A[2],B[2],f); const p=K.proj(F.B,x,y,z); if(!p) return; P.push(p); }
    const s=(P[0].s+P[P.length-1].s)/2, cw=Math.max(1.6,Math.min(8,(o.w||9)*0.42*s)),   /* trần 7px: xích sát máy không phình thành dải to vắt ngang khung */ d=Math.min(P[0].d,P[P.length-1].d)+(o.d||-10);
    F.list.push({d, fn:()=>{ const g=F.g; g.save(); g.globalAlpha=o.a==null?1:o.a; cordScreen(g,F.I.CORD,P.map(p=>[p.x,p.y]),cw,o.hot==null?1:o.hot); g.restore(); }}); }
  // xích QUẤN quanh người (vòng xoắn phía trước thân): tâm x,z, từ cao y0 tới y1, bán kính theo bề ngang ảnh
  function coil(F,x,z,y0,y1,R,turns,o){ o=o||{}; CHT_IMG=F.I.CHT||CHT_IMG; const B=F.B, r=B.r, P=[]; for(let i=0;i<=turns*14;i++){ const a=i/14*TAU, y=lerp(y0,y1,i/(turns*14)), c=Math.cos(a), sn=Math.sin(a);
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
  const RUBBLE=Array.from({length:26},(_,i)=>{ const w=70+220*hash(i*7.1), h=30+150*hash(i*2.9), d=60+160*hash(i*4.3), x=FZ[0]+(hash(i*3.3)-0.5)*2600, z=FZ[1]+(i%4===0?-420-300*hash(i*9.1):260+hash(i*5.7)*1100); return {x,z,w,h,d,dark:hash(i*6.6)<0.5}; }).filter(r=>!(Math.abs(r.z-FZ[1])<300&&r.x>FZ[0]-400&&r.x<FZ[0]+900)&&!(r.z<FZ[1]&&Math.abs(r.x-(FZ[0]+300))<1300));   // (13/11 anh: vật che nhân vật) không đặt gạch vụn PHÍA TRƯỚC chỗ đánh (giữa máy và 2 con)
  function rock(F,x,y,z,S,seed){ const P=K.proj(F.B,x,y+S*0.45,z); if(!P) return; const R=S*P.s;
    F.list.push({d:P.d, fn:()=>{ const g=F.g; g.save(); g.translate(P.x,P.y); g.rotate(seed); const pts=[]; for(let i=0;i<8;i++){ const a=i/8*TAU, rr=R*(0.62+0.38*hash(seed*13+i)); pts.push([Math.cos(a)*rr,Math.sin(a)*rr*0.78]); }
      g.fillStyle='#5f5955'; g.beginPath(); pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.closePath(); g.fill();
      g.fillStyle='rgba(180,170,162,0.3)'; g.beginPath(); g.moveTo(pts[4][0],pts[4][1]); g.lineTo(pts[5][0],pts[5][1]); g.lineTo(pts[6][0],pts[6][1]); g.lineTo(0,-R*0.1); g.closePath(); g.fill();
      g.strokeStyle='rgba(20,16,16,0.8)'; g.lineWidth=Math.max(1,R*0.04); g.stroke(); g.restore(); }}); }
  // hố trên mặt đất (vẽ dưới mọi thứ)
  function crater(F,x,z,R,a){ const P=K.proj(F.B,x,0,z), Q=K.proj(F.B,x+R,0,z), Z=K.proj(F.B,x,0,z+R); if(!P||!Q||!Z) return; const rx=Math.abs(Q.x-P.x), ry=Math.max(2,Math.abs(Z.y-P.y));
    F.under.push(()=>{ const g=F.g; g.save(); g.globalAlpha=a; const gr=g.createRadialGradient(P.x,P.y,0,P.x,P.y,rx); gr.addColorStop(0,'rgba(10,8,8,0.9)'); gr.addColorStop(0.7,'rgba(30,24,22,0.7)'); gr.addColorStop(1,'rgba(60,50,46,0)'); g.fillStyle=gr; g.beginPath(); g.ellipse(P.x,P.y,rx,ry,0,0,TAU); g.fill(); g.restore(); }); }
  // 🎞️ (16/11) PHÁ BĂNG = HOẠT CẢNH VẼ theo khuôn video mẫu (Zenitsu 0:43–0:48, anh gửi): GPT vẽ lại từng khung, Doge / Chud thay nhân vật gốc.
  //   Mỗi chữ trong chuỗi = 1 bước khung, chia đều cả nhịp (~0.1s / khung → sét nháy, đá nổi dần) + máy đẩy chậm bằng code. Vẽ trong world → vẫn ăn rung / grade / impact frame.
  const ZSEQ=[[T.shake,T.imp1,'1a 1b 1a 1b 1a 1b 1a 1c 1b 1c 1b 1c 1c 1b 1c 1c 1b 1c',1.0,1.13,0.5,0.46],[T.imp1,T.wideD,'black'],
    [T.wideD,T.eye,'2a 2b 2a 2b 2c 2b 2c 2b 2c 2c 2b 2c 2c',1.0,1.05,0.5,0.5],[T.eye,T.blk,'3a 3b 3a 3b 3a 3b',1.0,1.08,0.5,0.45],
    [T.blk,T.burst,'2d 2e 2d 2e 2d',1.04,1.07,0.5,0.5],[T.burst,T.quiet,'5a 5a 5b 5a 5b 5b 5b 5a 5b 5b 5b 5b 5b 5b',1.08,1.0,0.5,0.55],[T.quiet,T.charge,'dark']];
  function cover(g,im,VW,VH,zm,cx,cy){ const sc=Math.max(VW/im.naturalWidth,VH/im.naturalHeight)*zm*1.03, w=im.naturalWidth*sc, h=im.naturalHeight*sc; g.drawImage(im,VW*0.5-w*cx,VH*0.5-h*cy,w,h); }
  function zenPlate(F,t){ if(t<T.shake||t>=T.charge) return; const z=ZSEQ.find(q=>t>=q[0]&&t<q[1]); if(!z) return;
    F.list.push({d:-1e9, fn:()=>{ const g=F.g, VW=F.VW, VH=F.VH, u=seg(t,z[0],z[1]); g.save(); g.fillStyle='#000'; g.fillRect(-60,-60,VW+120,VH+120);
      if(z[2]==='dark'){ const im=F.I.ZN5b; if(im&&im.naturalWidth){ g.globalAlpha=0.14*(1-u); cover(g,im,VW,VH,1,0.5,0.5); } }   // tối lặng: dư ảnh cột sáng tắt dần
      else if(z[2]!=='black'){ const L=z[2].split(' '), key=L[Math.min(L.length-1,Math.floor(u*L.length))], im=F.I['ZN'+key]; if(im&&im.naturalWidth) cover(g,im,VW,VH,lerp(z[3],z[4],eio(u)),z[5],z[6]);
        if(L[0]==='5a'){ g.globalCompositeOperation='lighter'; g.fillStyle='rgba(255,220,120,'+(0.16*(0.5+0.5*Math.sin(t*50))).toFixed(3)+')'; g.fillRect(0,0,VW,VH); } }   // cột sáng chập chờn
      g.restore(); }}); }
  // 🎞️ E1 (16/11, theo lớp): nền quảng trường GPT (trống giữa) + Chud ẢNH GỐC + vệt vàng code xé ngang cả khung, cuốn Chud bay ra khỏi khung
  function e1Plate(F,t){ const a=T.ram-0.3; if(t<a||t>=T.b1) return; F.list.push({d:-1e9, fn:()=>{ const g=F.g, VW=F.VW, VH=F.VH, bg=F.I.ZNE1, c=K.prep(F.I.CK0);
    g.save(); g.fillStyle='#000'; g.fillRect(-60,-60,VW+120,VH+120); if(bg&&bg.naturalWidth) cover(g,bg,VW,VH,1.0+0.03*seg(t,a,T.b1),0.5,0.62);
    const fx=VW*0.6, fy=VH*0.84, ch=VH*0.56, sy=fy-ch*0.5, t0=T.ram-0.07, t1=T.ram, t2=T.ram+0.3;
    const hx=t<t0?-VW*0.3:t<t1?lerp(-VW*0.2,fx,(t-t0)/(t1-t0)):lerp(fx,VW*1.5,ein(seg(t,t1,t2)));
    if(c){ const w=ch*c.sw/c.sh; const one=(x,y,r,al)=>{ g.save(); g.globalAlpha=al; g.translate(x,y); g.rotate(r); g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,-w/2,-ch,w,ch); g.restore(); };
      if(t<t1){ g.save(); g.globalAlpha=0.45; g.fillStyle='#000'; g.beginPath(); g.ellipse(fx,fy,w*0.42,ch*0.05,0,0,TAU); g.fill(); g.restore();   // bóng chân
        one(fx,fy+Math.sin(t*7)*1.2,0,1); if(t>=t0){ g.save(); g.globalCompositeOperation='lighter'; g.globalAlpha=0.5*seg(t,t0,t1); g.drawImage(K.tinted(c,'#ffc040'),-w/2+fx-w*0.04,fy-ch,w,ch); g.restore(); } }   // ánh vàng hắt lên Chud khi vệt tới
      else if(hx<VW*1.3){ const cx=hx-w*0.15, cy=fy-(hx-fx)*0.12, r=0.9*seg(t,t1,t2); for(let k=3;k>=1;k--) one(cx-k*w*0.35,cy+k*6,r*0.8,0.18*(4-k)/3); one(cx,cy,r,1); } }   // bị cuốn đi: bóng mờ nối đuôi
    // vệt sáng: dải vàng dày, lõi trắng, đầu tròn; sau cú húc mỏng + mờ dần
    if(t>=t0){ const fade=1-seg(t,t2,t2+0.7), w=VH*0.11*(1-0.5*seg(t,t2,t2+0.7)), x0=-VW*0.2, x1=Math.min(hx,VW*1.4); if(fade>0.01){ g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round';
      for(const [ww,col] of [[2.6,'rgba(255,150,30,'+(0.35*fade)+')'],[1.4,'rgba(255,200,80,'+(0.7*fade)+')'],[0.75,'rgba(255,235,160,'+(0.95*fade)+')'],[0.3,'rgba(255,255,245,'+fade+')']]){ g.strokeStyle=col; g.lineWidth=w*ww; g.beginPath(); g.moveTo(x0,sy+3); g.lineTo(x1,sy); g.stroke(); }
      for(let i=0;i<26;i++){ const yy=sy+(hash(i*7+3)-0.5)*VH*0.5, ln=VW*(0.1+0.25*hash(i*7+5)), xx=((hash(i*7+1)*VW*1.6+(t-t0)*VW*5)%(VW*1.6))-VW*0.3; g.strokeStyle='rgba(255,240,200,'+(0.5*fade*hash(i*7+9))+')'; g.lineWidth=1+2*hash(i*7+11); g.beginPath(); g.moveTo(xx,yy); g.lineTo(xx+ln,yy); g.stroke(); }   // vạch tốc độ ngang
      g.restore(); } }
    // bụi + tia lửa chỗ Chud vừa đứng
    if(t>=t1){ const u=seg(t,t1,t1+1.0); g.save(); for(let i=0;i<9;i++){ const px=fx+(hash(i*3+40)-0.3)*VW*0.35*u, py=fy-VH*0.02-hash(i*3+41)*VH*0.12*u, r=VH*(0.05+0.07*hash(i*3+42))*(0.5+u); g.fillStyle='rgba(120,90,90,'+(0.14*(1-u))+')'; g.beginPath(); g.arc(px,py,r,0,TAU); g.fill(); }
      g.globalCompositeOperation='lighter'; for(let i=0;i<22;i++){ const v=0.6+hash(i*5+60)*1.4, an=(hash(i*5+61)-0.5)*1.1, d=u*VW*0.5*v, px=fx+Math.cos(an)*d, py=sy+Math.sin(an)*d*0.5+u*u*VH*0.2; g.strokeStyle='rgba(255,200,90,'+(1-u)+')'; g.lineWidth=2; g.beginPath(); g.moveTo(px,py); g.lineTo(px-Math.cos(an)*14,py-Math.sin(an)*7); g.stroke(); } g.restore(); }
    g.restore(); }}); }
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
    if(t>=T.ram-0.3&&t<T.ram) W.dash(F,t,T.ram-0.3,T.ram,[-180,115,-80],[CH0[0],120,CH0[1]],{w:30,col:'255,205,110',core:'255,255,240'});   // vệt vàng lao vào Chud
    if(t<T.ram-0.3&&t>=T.strikeD+0.12){ const key=d.im, pre=t>=T.charge-0.1&&t<T.charge?seg(t,T.charge-0.1,T.charge):0;
      act(F,{key,dir:DIR[key],face:t>=T.charge&&t<T.ram?[CH0[0]-d.x,CH0[1]-d.z]:null,x:d.x+(frozen?shk*0.4:0),z:d.z,y:d.y+walking(t,0,T.bind),h:HT[key],look:lookD,smear:d.sm,shadow:true,
        aura:t>=T.burst?{preset:'fire',k:0.6,seed:3}:null, white:(t>=T.burst&&t<T.burst+0.06)?1:0, life:frozen?{breath:0}:{breath:0.7,squash:pre?-0.3*pre:K.squash(t,T.landD,0.4,0.12)}});
      if(iceA>0) W.ice(F,{key:'D0',x:d.x+(frozen?shk*0.4:0),z:d.z,h:HT.D0*1.08,seed:4},iceA,t);
      if(frozen) iceCracks(F,d.x,d.z-2,HT.D0,t<T.crack?0:seg(t,T.crack,T.quiet));
      if(t>=T.eye&&t<T.burst){ const P=K.proj(F.B,d.x+6,HT.D0*0.72,d.z-6); if(P) F.list.push({d:P.d-9, fn:()=>{ const g=F.g, R=Math.min(F.VH*0.035,Math.max(3,18*P.s))*(0.6+0.4*Math.sin(t*30));   /* trần cỡ loé: máy sát mắt vẫn thấy mắt */ g.save(); g.globalCompositeOperation='lighter'; const gr=g.createRadialGradient(P.x,P.y,0,P.x,P.y,R*4); gr.addColorStop(0,'rgba(255,240,190,1)'); gr.addColorStop(0.25,'rgba(255,190,90,0.7)'); gr.addColorStop(1,'rgba(255,140,40,0)'); g.fillStyle=gr; g.fillRect(P.x-R*4,P.y-R*4,R*8,R*8); g.restore(); }}); }
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
      if(bound&&t<T.burst) coil(F,d.x+(frozen?shk*0.4:0),d.z,HT.D0*0.2,HT.D0*0.62,HT.D0*0.46,3,{w:7,hot:0.12}); }   // (13/11) giữ ẢNH MEME GỐC của Doge, vòng xích bớt quầng sáng (trước như miếng dán)
    if(t>=T.burst&&t<T.burst+0.6) K.debris(F,{x:d.x,y:60,z:d.z,t0:T.burst,n:20,speed:900,life:0.8,size:8,seed:24,col:'#ff5a20'});   // mắt xích bung ra
    // ⚡ (16/11 Zenitsu) sét VÀNG quanh khối băng: lách tách nhỏ quanh đầu (D1) → nháy bật tắt khắp nơi (D3, D4)
    if(t>=T.shake&&t<T.burst){ const fr=Math.floor(t*30), big=t>=T.wideD, n=big?5:3, P0=K.proj(F.B,d.x,big?60:HT.D0*0.62,d.z); if(P0) F.list.push({d:P0.d-30, fn:()=>{ const g=F.g, U=F.VH;   // ⚡ sét VÀNG vẽ theo PIXEL màn hình (mảnh, sắc, nháy mỗi khung) — không phình to khi máy sát
        g.save(); g.lineCap='round'; g.lineJoin='round';
        for(let i=0;i<n;i++){ const sd=fr*7+i*13; if(hash(sd)<(big?0.35:0.45)) continue; const an=hash(sd+1)*TAU, r0=U*(big?0.04+0.16*hash(sd+2):0.12+0.22*hash(sd+2)), len=U*(big?0.12+0.2*hash(sd+4):0.06+0.08*hash(sd+4)), up=big?-Math.PI/2+(hash(sd+5)-0.5)*1.2:an+Math.PI/2+(hash(sd+5)-0.5);
          let x=P0.x+Math.cos(an)*r0*(big?1.6:1), y=P0.y+Math.sin(an)*r0*(big?0.35:1); const pts=[[x,y]]; for(let j=1;j<=9;j++){ x+=Math.cos(up)*len/9+(hash(sd+j*3)-0.5)*len*0.28; y+=Math.sin(up)*len/9+(hash(sd+j*5)-0.5)*len*0.28; pts.push([x,y]); }
          const path=()=>{ g.beginPath(); pts.forEach((p,k)=>k?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); };
          g.globalCompositeOperation='lighter'; g.strokeStyle='rgba(255,190,50,0.55)'; g.lineWidth=U*0.012; path(); g.stroke(); g.strokeStyle='rgba(255,225,120,0.95)'; g.lineWidth=U*0.0045; path(); g.stroke(); g.strokeStyle='#fffbe8'; g.lineWidth=Math.max(1,U*0.0018); path(); g.stroke();
          const b=pts[4+((sd>>2)&3)]; g.strokeStyle='rgba(255,220,110,0.85)'; g.lineWidth=U*0.0025; g.beginPath(); g.moveTo(b[0],b[1]); let bx=b[0], by=b[1]; for(let j=1;j<=4;j++){ bx+=Math.cos(up+0.9)*len/10+(hash(sd+j*11)-0.5)*len*0.2; by+=Math.sin(up+0.9)*len/10+(hash(sd+j*17)-0.5)*len*0.2; g.lineTo(bx,by); } g.stroke(); }
        g.restore(); }}); }
    if(t>=T.wideD&&t<T.blk+0.8) W.powerUp(F,t,T.wideD,T.blk,d.x,d.z,'255,210,80',77,{r:230});   // đá + mảnh băng nổi lên quanh khối băng, rồi văng tung lúc nổ
    if(t>=T.burst&&t<T.quiet){ const a=1-seg(t,T.quiet-0.4,T.quiet), P=K.proj(F.B,d.x,0,d.z), Q=K.proj(F.B,d.x,4000,d.z); if(P&&Q) F.list.push({d:P.d-50, fn:()=>{ const g=F.g, w=Math.max(20,180*P.s)*(1+0.15*Math.sin(t*40)); g.save(); g.globalCompositeOperation='lighter';
        for(const [k,al] of [[2.4,0.25],[1.2,0.5],[0.45,0.95]]){ const gr=g.createLinearGradient(P.x-w*k,0,P.x+w*k,0); gr.addColorStop(0,'rgba(255,200,60,0)'); gr.addColorStop(0.5,`rgba(255,${k<0.5?250:210},${k<0.5?230:90},${al*a})`); gr.addColorStop(1,'rgba(255,200,60,0)'); g.fillStyle=gr; g.fillRect(P.x-w*k,Q.y,w*2*k,P.y-Q.y); }
        g.restore(); }}); }   // CỘT SÁNG VÀNG xé trời lúc băng nổ
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
  // ═════════ TRẬN CHÍNH v3 (16/11): THIÊN LA ĐỊA VÕNG — Chud bủa 2 xích ra 10 hướng cắm cột / nhà / đất thành LƯỚI vây Doge; lưới quất · Chud đu trên lưới · lưới siết trói · Haki giật tan cả lưới ═════════
  const NETA=[[-460,0,-280],[-120,0,-360],[240,0,-330],[-560,260,40],[560,300,60],[-340,0,330],[140,0,380],[860,420,140],[-260,760,1000],[420,880,1100]];   // điểm cắm (toạ độ quanh FZ): đất · cột · toà nhà xa
  const NETX=[[0,5],[1,6],[2,7],[3,8],[4,9],[0,3],[5,8],[6,9],[1,2]];   // xích ngang nối các điểm cắm → mắt lưới
  function fightWorld(F,t){ const tt=hs(t), d=dogeM(t), c=chudM(t), X=FZ[0], Z=FZ[1], A=i=>[X+NETA[i][0],NETA[i][1],Z+NETA[i][2]];
    for(const r of RUBBLE) CITY.box(F,r.x-r.w/2,r.x+r.w/2,0,r.h,r.z-r.d/2,r.z+r.d/2,r.dark?'#2c2729':'#3a3436',r.dark?'#4a4245':'#5a5154','rgba(220,70,50,0.18)');
    CITY.box(F,PIL[0]-50,PIL[0]+50,0,PIL[1]+60,PIL[2]-50,PIL[2]+50,'#4a4446','#6a6266','rgba(20,16,16,0.6)');
    K.smoke(F,{x:X,z:Z+200,t0:T.rise-1,n:14,spread:1800,rise:60,life:4,size:220,seed:81,a:0.35*(1-seg(t,T.rise,T.rise+3))+0.12,tint:'110,92,84'});
    if(t>=T.punch) crater(F,X+250,Z,260,Math.min(1,seg(t,T.punch,T.punch+0.2)));
    if(t>=T.slam) crater(F,X+380,Z,220,Math.min(1,seg(t,T.slam,T.slam+0.2)));
    const haki=tt>=T.hakiOn, dKey=d.im;
    const dO={key:dKey,dir:DIR[dKey],face:(t>=T.haki&&t<T.pull)?[0.6-F.B.f[0],-F.B.f[2]]:null,x:X+d.x,z:Z+d.z,y:d.y,h:HT[dKey],look:{x:X+c.x,z:Z},smear:d.sm,shadow:d.y<100,
      aura:haki?{preset:'haki',k:tt<T.hakiOn+1?1.3:0.7,seed:8}:{preset:'fire',k:0.45,seed:3}, white:(t>=T.l3&&t<T.l3+0.06)?1:0, lean:0, life:{breath:t>=T.tug&&t<T.lift?2.2:0.7,squash:K.squash(tt,T.slam,0.35,0.1)}};
    // pha nhanh = VỆT (không vẽ người): Doge lao vào lưới · Doge lao tới đấm · Chud đu trên lưới · 2 con lao vào nhau
    const rush=W.dash(F,t,T.r1,T.r1+0.2,[X-260,95,Z],[X-60,95,Z],{w:34,col:'255,190,90'})||W.dash(F,t,T.punch-0.2,T.punch-0.04,[X-330,95,Z],[X+250,70,Z],{w:36,col:'255,200,100',core:'255,255,240'});
    const swing=t>=T.swing0+0.05&&t<T.land-0.05; if(swing){ const u=seg(t,T.swing0+0.05,T.land-0.05), pts=[]; for(let k=0;k<=12;k++){ const v=Math.max(0,u-0.5*(1-k/12)); pts.push(K.proj(F.B,X+lerp(600,860,v),120+380*Math.sin(Math.PI*v),Z+60*Math.sin(Math.PI*v))); } W.streak(F,pts,30,'255,60,40'); }
    const dashing=t>=T.clash-0.25&&t<T.clash-0.01; if(dashing) clashStreaks(F,t,X,Z);
    const dR=(dashing||rush)?{flip:false,key:dKey}:act(F,dO), dKv=dR.key;
    const hands=(dashing||swing)?chudActor(F,c.im,X+c.x,Z+c.z,c.y,{x:X+d.x,z:Z},{dry:true}):chudActor(F,c.im,X+c.x,Z+c.z,c.y,{x:X+d.x,z:Z});
    const dF=[handW(F,dKv,X+d.x,d.y,Z+d.z,dR.flip,0),handW(F,dKv,X+d.x,d.y,Z+d.z,dR.flip,1)], dChest=[X+d.x,d.y+70,Z+d.z], feet=[[X+d.x-30,d.y+12,Z+d.z],[X+d.x+30,d.y+12,Z+d.z]];
    const snapK=t>=T.snap?seg(t,T.snap,T.snap+0.5):0, hang=j=>{ const h=hands[j]; chain(F,h,[h[0]+(j?30:-30),Math.max(4,h[1]-150),h[2]],{sag:-10,wob:6,t,w:8,hot:0.9}); };
    // ── LƯỚI: mỗi xích phóng ra so le, cắm điểm → tia lửa; xích ngang nối thành mắt lưới
    const netOn=t>=T.release&&t<T.tie0, netOff=t>=T.tie0?1-seg(t,T.tie0,T.tie0+0.25):1;
    if(t>=T.release&&t<T.tie0+0.25){ for(let i=0;i<NETA.length;i++){ const k=clamp((t-T.release-0.04*i)/0.32,0,1); if(k<=0) continue; const from=t<T.swing0||t>=T.land?hands[i%2]:[X+c.x,c.y+100,Z];
        chain(F,from,A(i),{k:k*netOff,sag:k<1?-60*(1-k):18,wob:k<1?40*(1-k):(t<T.swing0?3:1.5),t,w:8,hot:1});
        if(k>=1&&t<T.release+0.04*i+0.5) K.sparks(F,{x:A(i)[0],y:A(i)[1]+10,z:A(i)[2],t0:T.release+0.04*i+0.32,n:12,speed:420,life:0.4,seed:300+i,col:'255,150,70'}); }
      if(t>=T.netDone) for(const [p,q] of NETX){ const k=seg(t,T.netDone,T.netDone+0.3); chain(F,A(p),A(q),{k:k*netOff,sag:24,wob:1.5,t,w:6,hot:0.8}); } }
    // ── 3 ROI từ lưới quất vào Doge (trên, trái, phải): 2 roi đầu Doge đỡ / gạt (tia lửa), roi thứ 3 trúng lưng
    for(const [t0,ai,hit] of [[T.l1,8,0],[T.l2,3,0],[T.l3,4,1]]){ if(t<t0-0.15||t>t0+0.3) continue; const k=eout(seg(t,t0-0.15,t0)), back=seg(t,t0+0.05,t0+0.3);
      chain(F,A(ai),hit?dChest:dF[0],{k:k*(1-back*0.9),sag:-30*(1-k),wob:(1-k)*60,t,w:9,hot:1}); if(t>=t0&&t<t0+0.3) K.sparks(F,{x:(hit?dChest:dF[0])[0],y:(hit?dChest:dF[0])[1],z:Z,t0,n:30,speed:700,life:0.45,seed:(t0*10)|0,col:'255,170,80'}); }
    if(swing) chain(F,[X+c.x,c.y+110,Z],A(9),{sag:6,t,w:8,hot:1});   // Chud đu bằng xích cắm toà nhà
    // ── LƯỚI SIẾT: 4 xích từ điểm cắm + 2 xích từ tay Chud quấn cổ tay, cổ chân Doge
    if(t>=T.tie0&&t<T.snap){ const k=seg(t,T.tie0+0.05,T.tie), taut=t>=T.tug;
      for(let j=0;j<2;j++) chain(F,hands[j],dF[j],{k,sag:taut?4:28,wob:taut?2.5:0,t,w:9,hot:t>=T.hakiOn?0.6:1,d:j?70:-10});
      [[0,dF[0]],[5,dF[1]],[1,feet[0]],[6,feet[1]]].forEach(([ai,p],n)=>{ const kk=seg(t,T.tie0+0.05*n,T.tie+0.05*n); chain(F,A(ai),p,{k:kk,sag:taut?3:20,wob:taut?2:0,t,w:7,hot:0.9}); }); }
    else if(t>=T.snap&&snapK<1){ for(let j=0;j<2;j++){ const h=hands[j]; chain(F,h,[lerp(dF[j][0],h[0],0.5)+j*40,lerp(dF[j][1],h[1],0.5)-snapK*200,Z],{sag:-20,wob:8,t,w:8,hot:1-snapK*0.5}); } }
    else if(!netOn&&!swing&&!dashing&&t<T.release) { hang(0); hang(1); }
    else if(t>=T.snap&&!dashing){ hang(0); hang(1); }
    // ── hiệu ứng
    if(t>=T.l3&&t<T.l3+0.9) K.smoke(F,{x:X+d.x,z:Z,t0:T.l3+0.1,n:8,spread:220,rise:30,life:0.9,size:70,seed:92,a:0.4,tint:'120,104,96'});
    if(t>=T.punch&&t<T.punch+2.0){ K.debris(F,{x:X+250,y:10,z:Z+60,t0:T.punch,n:30,speed:1400,life:1.8,size:22,seed:93,col:'#4a4246'}); K.smoke(F,{x:X+250,z:Z,t0:T.punch,n:14,spread:700,rise:220,life:2,size:180,seed:94,a:0.38,tint:'130,104,96'}); }
    for(const ts of [T.slam,T.slam2]) if(t>=ts&&t<ts+1.4){ K.debris(F,{x:X+380,y:10,z:Z,t0:ts,n:34,speed:1100,life:1.3,size:26,seed:95+(ts>T.slam?7:0),col:'#4a4246'}); K.smoke(F,{x:X+380,z:Z,t0:ts,n:12,spread:500,rise:140,life:1.5,size:160,seed:96,a:0.5,tint:'130,104,96'});
      if(t<ts+0.6){ const u=seg(t,ts,ts+0.6); K.ring(F,X+380,Z,40+600*eout(u),20,0.6*(1-u),'255,200,160'); } }
    if(t>=T.hakiOn&&t<T.hakiOn+1.6) K.smoke(F,{x:X+d.x,z:Z,t0:T.hakiOn,n:10,spread:220,rise:260,life:1.4,size:80,seed:97,a:0.22,tint:'40,30,40'});
    if(t>=T.snap&&t<T.snap+1.4){ for(let i=0;i<6;i++){ const p=i<4?[[0,5,1,6][i]].map(A)[0]:dF[i-4]; K.debris(F,{x:lerp(p[0],X+d.x,0.5),y:Math.max(60,p[1]*0.5),z:lerp(p[2],Z,0.5),t0:T.snap,n:16,speed:900,life:1.0,size:10,seed:98+i,col:'#ff6a20'}); }
      K.sparks(F,{x:X+d.x+60,y:110,z:Z,t0:T.snap,n:60,speed:1000,life:0.7,seed:99,col:'255,150,60'}); }   // CẢ LƯỚI đứt tung, mắt xích văng khắp khung
    if(t>=T.clash-0.02&&t<T.clash+0.7){ const cx=X+572; K.sparks(F,{x:cx,y:105,z:Z,t0:T.clash,n:60,speed:1100,life:0.6,seed:111,col:'255,190,120'}); K.smoke(F,{x:cx,z:Z,t0:T.clash,n:8,spread:500,rise:80,life:1.2,size:110,seed:112,a:0.28,tint:'120,104,96'}); } }
  // ── chân trời: trận Gojo vs Pain va chạm — loé tím trắng + vòng sóng trên trời (lúc 2 con lao vào nhau)
  function farFlash(F,t){ if(t<T.far) return; const v=t-T.far, P=K.proj(F.B,FZ[0]+9000,900,FZ[1]+3000); if(!P) return;
    F.list.push({d:5e8, fn:()=>{ const g=F.g, R=(300+2600*eout(Math.min(1,v*0.8)))*P.s; g.save(); g.globalCompositeOperation='lighter';
      let gr=g.createRadialGradient(P.x,P.y,0,P.x,P.y,R); gr.addColorStop(0,`rgba(255,255,255,${0.9*Math.max(0,1-v*0.6)})`); gr.addColorStop(0.3,'rgba(190,120,255,0.5)'); gr.addColorStop(0.7,'rgba(90,150,255,0.25)'); gr.addColorStop(1,'rgba(90,150,255,0)');
      g.fillStyle=gr; g.fillRect(P.x-R,P.y-R,2*R,2*R); g.strokeStyle=`rgba(230,220,255,${0.7*Math.max(0,1-v*0.7)})`; g.lineWidth=Math.max(2,R*0.02); g.beginPath(); g.ellipse(P.x,P.y,R*0.9,R*0.3,0,0,TAU); g.stroke(); g.restore(); }}); }
  // ⏱️ (12/11 tối) NHANH – CHẬM ĐAN XEN: nén theo loại shot — đối mặt ×0.75 · thở / giới thiệu ×0.85 · đánh ×0.92 · ra chiêu ×0.95 · nổ lớn / chuyển cảnh giữ nguyên
  const RETIME=[[0,1.5,0.85],[1.5,4.6,0.95],[4.6,8.5,0.75],[8.5,11,0.92],[11,13.8,0.85],[13.8,24.4,0.75],[24.4,31.6,1],[31.6,33.3,0.92],[33.3,36.4,1],[36.4,38.8,0.85],[38.8,45.6,0.75],[45.6,61.4,1]];
  CineKit.film(W.retime(RETIME,{ id:'fin1f1', title:'Final 1 · Fight · Chud + Mlem vs Doge + Clapping Cat', DUR:T.DUR, VW:960, VH:540, fadeIn:false, fadeOut:false,   // vào từ lỗ vòng khói fin1f2 · ra: lao về chân trời sang Gojo vs Pain
    imgs:IMG, cast:['dc','mlem','clap'],
    sfxOk:{ clap_cat:'Clapping cười vỗ tay liên tục: mỗi lần vỗ 1 tiếng (game)', dc_chain:'mỗi nhát xích quất / quấn trúng 1 tiếng (game)' },
    // 🔊 mở đầu KHÔNG NHẠC → nhạc vào khi Meowkatsuki bước ra → LẶNG lúc mắt Doge loé → bùng lại khi băng vỡ → LẶNG trước Haki → bùng lại khi xích đứt
    //    xích = 1 giọng `dc_chain` (của Chud) · đòn tay của Doge = se_punch_* · cú nặng có lớp trầm '+'
    sfx:[[T.strikeD,'cine_impact',0.8,null,'cột Bifrost vàng giáng thẳng từ trời xuống công viên'],
      [T.strikeK,'cine_impact',0.65,null,'+ cột Bifrost trắng giáng xuống ngay sau, cạnh cột vàng'],
      [T.landD-0.65,'l2p_riser',0.45,null,'Doge từ từ hạ xuống trong cột sáng'],
      [T.landD,'se_quake',0.65,null,'Doge đáp đất, sóng bùng quét qua bãi cỏ'],
      [T.landK,'se_step_in',0.7,null,'Clapping đáp đất, bụi toé vòng'],
      [T.lurk+0.4,'l2p_sub',0.4,null,'trong hàng cây: bóng Chud xích đỏ rực + bóng Mlem, mắt loé'],
      [T.bind-0.2,'ep3_chain',0.9,null,'2 sợi xích nung đỏ từ bóng tối quấn chặt quanh người Doge'],
      [T.lick-0.15,'mlem_lick',0.9,null,'Mlem phóng lưỡi từ bụi cây liếm trúng Doge'],
      [T.frz,'mlem_freeze',1,null,'Doge bị đóng băng cứng cả người (vẫn bị xích quấn)'],
      [T.out,'se_gogogo',0.35,3.4,'Chud + Mlem bước ra từ hàng cây (sức ép gogogo)'],
      ...CLAPS.map((s,i)=>[s,'clap_cat',0.75,null,(i?'+ ':'')+'Clapping cười, vỗ tay']),
      [T.shake+0.3,'bc_zap',0.35,null,'cực cận Doge nhắm mắt trong băng: sét vàng lách tách quanh đầu'],
      [T.imp1,'kn_boom_low',0.7,null,'khung đen: cú nện trầm'],[T.wideD,'thunder_big',0.6,null,'+ góc rộng: sét vàng giáng khắp nơi, đất vỡ đá nổi lên (lớp của cú nện)'],
      [T.crack,'l2p_crack',0.5,null,'+ khối băng rạn dần (lớp của tiếng tim đập)'],[T.wideD+0.1,'se_tremor',0.5,null,'+ đất rung, tảng đá tách lên (lớp đuôi của sét)'],
      [T.burst-1.3,'ed_hit3',0.8,null,'cận Chud hoảng dưới ánh vàng → tụ lực dâng lên (đỉnh đúng lúc cột sáng nổ)'],[T.zImp,'ed_hit5',0.6,null,'+ impact frame bóng Doge (lớp đầu của cú nổ băng)'],
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
      [T.spin,'ep3_whoosh',0.55,null,'Chud xoay người vung 2 xích'],[T.release,'l2p_chains',1,null,'THIÊN LA ĐỊA VÕNG: 2 xích bủa ra 10 hướng, rít xé gió'],[T.release+0.36,'ep3_klunk',0.6,null,'+ đầu xích cắm phập vào cột, toà nhà, mặt đất (lớp của tiếng xích bủa)'],
      [T.r1,'se_step_in',0.6,null,'+ Doge đạp đất lao vào lưới (lớp đầu của roi thứ nhất)'],[T.l1,'dc_chain',0.9,null,'roi xích thứ nhất quất xuống, Doge khoanh tay đỡ (va xích)'],[T.l2,'se_punch_high',0.8,null,'+ Doge đấm gạt roi thứ hai (lớp của tràng roi)'],
      [T.l3,'kn_punch_heavy',0.9,null,'roi thứ ba quất trúng lưng Doge, văng'],[T.l3+0.15,'se_pushback',0.6,null,'+ Doge bị hất trượt trên đất (lớp đuôi của roi thứ ba)'],
      [T.swing0+0.05,'l2p_whoosh',0.6,null,'Chud đu trên lưới xích vụt qua như nhện'],[T.punch,'se_punch_heavy',1,null,'Doge lao tới đấm trúng mặt đất chỗ Chud vừa rời'],[T.punch+0.01,'kn_boom_low',0.6,null,'+ lớp trầm: mặt đất vỡ bùng thành hố'],
      [T.tie0,'l2p_chains',0.8,null,'lưới siết: xích từ khắp nơi lao vào quấn cổ tay, cổ chân Doge'],[T.tug,'l2p_riser',0.5,null,'+ giằng co: lưới căng rực đỏ (lớp kéo dài của tiếng siết)'],
      [T.lift,'ep3_whoosh',0.7,null,'Chud giật mạnh nhấc bổng Doge lên'],[T.slam,'cine_deep_impact',1,null,'Doge bị quật đập trúng mặt đất lần 1'],[T.lift2,'ep3_whoosh',0.5,null,'+ nhấc lên lần 2 (lớp của cú quật)'],[T.slam2,'se_super_hit',1,null,'Doge bị quật đập trúng mặt đất lần 2'],[T.slam2+0.01,'se_quake',0.6,null,'+ lớp trầm: đất rung nứt'],
      [T.haki,'ep3_shine',0.5,null,'+ cực cận: mắt Doge loé (lớp đầu của Haki)'],[T.hakiOn,'cine_haki',0.9,null,'HAKI thức tỉnh: 2 tay Doge phủ đen bóng, trận đứng hình'],
      [T.snap,'kn_explode_crunch',0.9,null,'Doge giật ngược đập tan cả lưới xích, mắt xích văng khắp nơi'],[T.shock+0.2,'l2p_sub',0.4,null,'+ cận Chud sững người (lớp đuôi của tiếng xích đứt)'],
      [T.clash-0.27,'se_machdash',0.85,null,'2 con hoá 2 vệt lao vào nhau'],[T.clash,'se_impact_stop',1,null,'nắm đấm haki đụng xích Chud giữa đường: va chạm, khựng'],[T.clash+0.01,'ed_hit5',0.55,null,'+ lớp edit: impact bùng theo tràng impact frame lúc 2 con va nhau'],
      [T.far,'l2p_explode',0.7,null,'chân trời nổ loé tím trắng, tiếng nổ dội từ xa'],
      [T.whip,'l2p_whoosh',0.7,null,'cắt sang hướng chân trời, gió rít'],[T.tunnel,'l2p_riser',0.7,null,'máy lao về phía trận Gojo vs Pain']],
    duckAuto:{decisive:[T.ram,T.snap]},   // 🎚️ nhạc nhường tiếng: mỗi cú lùi nhạc, cú húc + giật đứt xích thì lặng trước rồi nổ
    // 🎵 (13/11 anh chốt: nhạc anime CHẠY DÀI) Kusari Yarou (HxH 2011 — theme xích của Kurapika, đúng trận mẫu anh chọn) · lặng lúc băng nứt · Overtaken (One Piece) từ lúc bật HAKI tới hết — mỗi bài 1 lần, không lặp file
    mus:[{src:'assets/audio/cine_heart.mp3',ra:T.shake,rb:T.imp1,off:0,vol:0.55,fi:0.1,fo:0.15},{src:'assets/audio/mus_kusari.m4a',ra:T.rise-0.4,rb:T.haki-0.3,off:24,vol:0.22,fi:0.1,fo:0.3},{src:'assets/audio/mus_overtaken.m4a',ra:T.haki,rb:T.DUR,off:0.3,vol:0.5,fi:0.2,fo:0.8}],
    theme:t=>theme(t), shots,
    // 🎬 EDIT (16/11, skill edit-video): impact frame 2 màu ở cú húc / quật / va chạm cuối · Haki: đỏ – đen · vận lực: cam – đen
    impact:t=>{ const E=K.edit;
      return E.first(E.impacts(t,T.zImp,6,[['#000000','#ffd84a'],['#ffffff','#000000']],3),E.impacts(t,T.ram,3,[['#000000','#ffd84a']],3),E.impacts(t,T.l3,4,'red',3),E.impacts(t,T.slam2,6,'red',3),E.impacts(t,T.snap,6,'blue',3),E.impacts(t,T.clash,9,'red',3)); },
    grade:t=>{ const E=K.edit;
      return E.mix(E.burn(t,T.zImp+0.2,T.burst,0.05),E.rgb(t,T.burst+0.05,0.6,10),E.rgb(t,T.wideD,0.25,8),E.rgb(t,T.ram+0.27,0.8,12),E.duotone(t,T.release,T.r1,'#2a0000','#ff5040',0.15,0.5),E.duotone(t,T.hakiOn,T.pull,'#200000','#ff4a3a',0.15,0.8),E.rgb(t,T.snap+0.2,0.7,12),E.zoom(t,T.clash-0.27,0.2,0.4),E.rgb(t,T.clash+0.33,0.6,14)); },
    shake:t=>{ let s=0; const h=(a,amp,d)=>{ if(t>=a&&t<a+d) s=Math.max(s,amp*(1-(t-a)/d)); };
      if(t>=T.shake&&t<T.burst) s=Math.max(s,1.5+2.5*seg(t,T.shake,T.quiet)); if(t>=T.quiet&&t<T.burst) s=0.5;
      h(T.strikeD,8,0.5); h(T.strikeK,6,0.4); h(T.landD,6,0.4); h(T.landK,4,0.3); h(T.bind,4,0.3); h(T.frz,4,0.4); h(T.burst,16,0.8); h(T.charge,6,0.3); h(T.ram,18,0.8); for(const [tb] of HITS) h(tb,8,0.6);
      h(T.imp1,10,0.3); if(t>=T.wideD&&t<T.blk) s=Math.max(s,2+3*seg(t,T.wideD,T.blk)); if(t>=T.eye&&t<T.blk) s=Math.max(s,4); h(T.release+0.3,8,0.4); h(T.l1,6,0.3); h(T.l3,12,0.4); h(T.punch,20,0.9); h(T.slam,16,0.7); h(T.slam2,18,0.8); h(T.hakiOn,5,1.0); h(T.snap,10,0.5); h(T.clash,14,0.5); h(T.far,6,0.8); if(t>=T.tug&&t<T.lift) s=Math.max(s,1.2); return s; },
    world:(F,t)=>{ world(F,t); zenPlate(F,t); e1Plate(F,t); }, post(F,t){ const fx={shocks:[]}; const sh=(a,x,y,z,rm,d,str)=>{ if(t>=a&&t<a+d){ const u=(t-a)/d; fx.shocks.push({x,y,z,r:20+rm*eout(u),w:26,str:str*(1-u)}); fx.chroma=Math.max(fx.chroma||0,0.5*(1-u)); } };
      sh(T.burst,-260,80,-180,600,0.7,26); sh(T.ram,CH0[0],120,CH0[1],520,0.6,28); sh(T.punch,FZ[0]+250,40,FZ[1],800,0.8,12); sh(T.slam,FZ[0]+380,40,FZ[1],520,0.6,22); sh(T.slam2,FZ[0]+380,40,FZ[1],560,0.6,24); sh(T.hakiOn,FZ[0]+380,120,FZ[1],400,0.9,18); return fx; },
    screen(F,t){
      if(t>=T.charge&&t<T.ram-0.3) K.speedLines(F,{k:0.6,n:70,r0:0.25});   // lao THẲNG về màn hình: vệt tốc độ toả tâm
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
