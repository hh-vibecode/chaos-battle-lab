// 🌌 Final Part 1 · KẾT — CATVADER ĐÁNH LÉN — id `fin1c7`, sau fin1c4 (Gojo vs Pain).
// BẢN 4 (23/11/2026) — kịch bản prompts/kich-ban/fin1c7-v4.md (anh duyệt + đổi đoạn mở). Anh chê bản 3: "sơ sài, dùng nhiều form không nguyên bản",
//   "mây trời của t đâu", "Friend lao xuống nổ làm chi — lao xuống xong LƠ LỬNG", "Friend chưa đủ to", "cảm giác ghép 3D gượng ép".
// CÁCH DỰNG MỚI = LỚP 2D KIỂU ANIME (bỏ hẳn thành phố 3D + sàn lưới):
//   • NỀN = 4 tấm GPT vẽ tay cùng nét (assets/img/cine/FIN_C7_PL_*: mặt đất ngang tầm mắt / ngước trời / nhìn xuống / bãi rộng), trời đã tách → TRỜI + MÂY = CODE
//     (3 lớp mây cel trôi lệch tốc độ, đáy hắt ánh lửa; góc ngước: trần mây xoáy quanh 1 tâm). Nền nhuộm theo bảng màu từng đoạn + sương xa (atmospheric perspective).
//   • MEME = CHỈ ẢNH GỐC (Gojo MEW_GOJO_IMG · Pain DP_PAIN_IMG · Catvader / Friend / … avatarUrl · Buff Doge rage + Haki của game), hoà cảnh khi nướng:
//     bớt rực · multiply ánh môi trường · tối dần về chân · ánh hắt từ nguồn sáng · LIGHT WRAP (màu nền ăn vào mép) · mép đáy mờ + sương / bóng chân.
//   • Mỗi shot 1 góc TĨNH (máy chỉ trôi rất nhẹ), đổi pha = CẮT. Nền sau lưng cận cảnh làm mờ (độ sâu trường ảnh).
//   • Hậu kỳ kiểu satsuei: khuếch tán sáng (diffusion), hạt phim, vignette, dải sáng theo nguồn (para).
//   A  Pain thở dốc sau khi đẩy cầu tím lên trời (nối cuối fin1c4) → ngẩng: Gojo lơ lửng trên cao TỤ 3 CẦU TÍM → B đánh lén: LẶNG → bật kiếm → lưỡi laze xuyên ngực
//      → cầu tím xì tắt → chém ngang cắt cả khung → Gojo đứt đôi (không máu), nửa trên rơi xuống mới LỘ Catvader đứng ngay sau lưng → Catvader góc thấp
//   B2 Catvader LINH CẢM (tim đập, vạch loé) → Buff Doge (Haki) lao tới đấm → Catvader dựng TRƯỜNG LỰC đỡ → nứt → vỡ, vẫn bị đấm văng về cạnh Pain → Pain: Rinnegan sáng lại
//   C  Phe thiện chạy tới (47 con) · Banana khóc · phe thiện đứng thành hình móng ngựa quanh xác Gojo nằm đôi (góc cao, lạnh)
//   D  Akatsuki đáp xuống · Ninja KUCHIYOSE · binh đoàn quỷ · Pain giơ mảnh linh hồn · trần mây đỏ rực → Friend XÉ MÂY lao xuống → PHANH giữa trời, KHÔNG NỔ → LƠ LỬNG
//      khổng lồ trên đầu phe Evil (chỉ thấy 1 phần) · phe thiện ngẩng nhìn · khung chênh lệch · chia đôi Chill Guy NỘ (aura đen–đỏ theo nhịp tim) / Pain + Catvader → BÙM → TO BE CONTINUED.
(function(){
  if(!window.CineKit || CineKit.films.fin1c7) return;
  const BASE=((document.currentScript&&document.currentScript.src)||'js/film-fin1c7.js').replace(/film-[^\/]*$/,''), V=window.GAME_VERSION?'?v='+GAME_VERSION.build:'';
  for(const [gl,f] of [['PIXI_FILTERS_GLSL','vendor/pixi-filters/glsl.js'],['VfxBoom','vfx-boom.js']]) if(!window[gl]){ try{ const x=new XMLHttpRequest(); x.open('GET',BASE+f+V,false); x.send(); (0,eval)(x.responseText); }catch(e){} }
  const K=CineKit, {seg,lerp,clamp,hash}=K, EA=K.EASE, eout=EA.eout, ein=EA.ein, eio=EA.eio, TAU=Math.PI*2, B=window.VfxBoom, VW=960, VH=540;
  const backOut=k=>{ const s=1.7; k-=1; return 1+k*k*((s+1)*k+s); };

  // ───────── NHỊP (giây) ─────────
  // (anh 23/11 tối) chém đứt đôi → nửa trên rơi mới LỘ Catvader đứng ngay sau lưng → Catvader LINH CẢM → Buff Doge lao tới đấm, Catvader dựng TRƯỜNG LỰC đỡ
  //   nhưng vẫn bị đấm văng về phía Pain → rồi phe thiện mới tới · cảnh cuối thêm meme (47 con phe thiện) · aura nộ Chill Guy căng hơn
  const T={ a2:2.2, a3:4.0, a4:5.9, title:6.7, hush:8.2, ignite:8.55, stab:8.9, eye:10.1, fizz:10.35, slash:11.3, cut:11.42, split:11.9, reveal:14.8,
    sense:16.6, senseHit:16.9, doge:17.9, field:18.9, hit:19.2, crack:19.45, blast:19.8, fly:20.3, land:20.95, painUp:21.9,
    run:23.3, banana:25.5, mourn:26.9,
    aka:30.3, ninja:32.3, shar:32.45, crouch:33.05, slam:33.3, seal:33.7, smoke:35.5, shard:38.7, quiet:39.8, sky:40.7, dive:42.5, brake:44.3, hover:45.9,
    look:48.3, face:49.5, wide:50.7, split2:52.9, rage:53.3, boom:56.1, tbc:56.5, xmas:57.9, DUR:60.3 };

  // ───────── ẢNH (chỉ ảnh gốc + 4 tấm nền) ─────────
  const av=k=>'assets/avatars/'+k+'/avatarUrl.'+(k==='violinbee'||k==='saiyanmarmot'?'png':'webp');
  const GOOD=['chillguy','bananacat','popcat','huhcat','clappingcat','berserkcat','breadcat','boxingcat','feuerkatze','stalincat','duolingo','violinbee','saiyanmarmot','nyancat',
    'samuraicheems','kingcheems','electricguitarcat','mosquitoviolin','maxwell','mechaniccat','loooongcat','lebronsunshine','gigachad','chonkydog',
    // + 22 con (anh 23/11 tối: "tổng tầm 40–50 con") — không godly (Supreme / Flower / The Void), không phe ác, không Angry Cat (chưa phát hành)
    'germancat','cheems','kermit','suscat','scaredhamster','rickroll','trollface','bongocat','capybara','beluga','wetcat','snoozecat','spidercat','vampirecat',
    'sans','uiacat','aliencat','epicsaxguy','finedog','pianocat','screamcat','rubikcat'];
  const IMG={ PG:'assets/img/cine/FIN_C7_PL_GROUND.webp', PL:'assets/img/cine/FIN_C7_PL_LOW.webp', PH:'assets/img/cine/FIN_C7_PL_HIGH.jpg', PV:'assets/img/cine/FIN_C7_PL_VAST.webp',
    GOJO:'assets/img/mewingcat/MEW_GOJO_IMG.webp', PAIN:'assets/img/depressedcat/DP_PAIN_IMG.webp', VADER:av('catvader'),
    DB:'assets/avatars/doge/rageAvatarUrl.webp', DH:'assets/img/doge/DG_HAKI_IDLE.webp', FR:av('friend'),
    MLEM:'assets/img/cine/FIN_AKA_MLEM.png', CHUD:'assets/img/cine/FIN_AKA_CHUD.png', NINJA:'assets/img/cine/FIN_AKA_NINJA.png', BAT:'assets/img/cine/FIN_AKA_BAT.png',   /* anh 23/11: nhóm Akatsuki PHẢI mặc áo (ảnh gốc khoác áo mây đỏ, dùng từ các cảnh Final trước) */ SHAR:'assets/img/ninjacat/NJ_SHARINGAN.webp', GARY:av('evilgary') };
  // 👹 binh đoàn quỷ triệu hồi (anh 23/11: "tự kiếm model, đa dạng, hắc ám hơn, không dùng model cũ phần 1, quỷ to quỷ bé, cả LINH HỒN lẫn THỰC THỂ") — GPT vẽ cùng nét, quay mặt TRÁI (về phe thiện)
  //   s = cao so với 1 meme · sp = linh hồn (bán trong suốt, lơ lửng, đáy tan) · w = tỉ lệ xuất hiện
  const DM=[{k:'brute',s:2.1,sp:0,w:7},{k:'imp',s:0.55,sp:0,w:24},{k:'ghoul',s:1.3,sp:0,w:18},{k:'knight',s:1.35,sp:0,w:15},{k:'beast',s:0.8,sp:0,w:9},{k:'wraith',s:1.45,sp:1,w:14},{k:'shade',s:0.95,sp:1,w:12},{k:'winged',s:3.1,sp:1,w:1.6}];
  for(const d of DM) IMG['DM_'+d.k]='assets/img/cine/FIN_C7_DM_'+d.k+'.png';
  const DMW=DM.reduce((a,d)=>a+d.w,0), dmOf=r=>{ let x=r*DMW; for(const d of DM){ x-=d.w; if(x<=0) return d; } return DM[0]; };
  for(const k of GOOD) IMG['M_'+k]=av(k);
  // điểm chi tiết ĐO trên ảnh gốc bằng tools/x/plate-grid.html (u,v = tỉ lệ ảnh GỐC, chưa cắt sát)
  const PT={ painEyes:[[0.460,0.286],[0.697,0.257]], painFace:[0.58,0.30], gojoBand:[0.49,0.38], gojoChest:[0.25,0.80], vaderGlove:[0.23,0.885],
    frEyes:[[0.57,0.27],[0.72,0.27]], frMid:[0.645,0.30], chillEyes:[[0.545,0.18],[0.678,0.181]] };

  // ───────── BẢNG MÀU từng đoạn ─────────
  //   sky: [đỉnh, giữa, chân trời] · cl: mây [bóng, giữa, sáng] · under: ánh hắt đáy mây · gnd: nhuộm nền (multiply) · haze: sương xa · dark: tối dần về tiền cảnh
  const PAL={
    pur:  {sky:['#140a26','#3c2456','#a070b0'], cl:['#2c1c40','#4a3264','#76589a'], under:'255,160,230', ua:0.45, gnd:['#a890c8',0.5], haze:'170,120,190', dark:0.45},
    night:{sky:['#0b0710','#211828','#56405a'], cl:['#1a1220','#2c2034','#463850'], under:'200,90,90',  ua:0.3,  gnd:['#8a7a98',0.62], haze:'96,76,100', dark:0.55},
    cold: {sky:['#090d15','#1c2636','#58687e'], cl:['#18202c','#2a3646','#46566c'], under:'150,170,200',ua:0.25, gnd:['#8a98b0',0.6], haze:'112,126,148', dark:0.5},
    red:  {sky:['#140308','#3c0a12','#a8341e'], cl:['#2a0a10','#48121c','#742424'], under:'255,120,60', ua:0.6,  gnd:['#b07a78',0.55], haze:'150,64,50', dark:0.5} };
  // tông nướng meme theo ánh sáng cảnh: desat · env (multiply) · foot · rim [màu, độ, hướng top|left|right|bottom] · wrap = light wrap [màu, độ] · dark = ngược sáng
  const TN={
    pur:  {desat:0.2, env:['#9278b4',0.3], foot:0.5, rim:['#e6c2ff',0.55,'top'], wrap:['#c49ae8',0.55]},
    night:{desat:0.3, env:['#6e5c7e',0.4], foot:0.55, rim:['#c2a2e0',0.35,'top'], wrap:['#806c96',0.45]},
    saber:{desat:0.15, env:['#7a3a48',0.36], foot:0.6, rim:['#ff6a56',0.8,'left'], wrap:['#ff4a3a',0.55]},
    cold: {desat:0.45, env:['#5c6c8a',0.4], foot:0.55, rim:['#cadaff',0.35,'top'], wrap:['#8ea4cc',0.5]},
    red:  {desat:0.25, env:['#a2524a',0.34], foot:0.6, rim:['#ffa680',0.5,'top'], wrap:['#d8684c',0.5]},
    redB: {desat:0.3, env:['#8a3a36',0.45], foot:0.65, rim:['#ff7a50',0.6,'top'], wrap:['#c04a34',0.55], dark:0.35},
    demon:{desat:0.25, env:['#5a2a30',0.32], foot:0.55, rim:['#ff6040',0.7,'top'], wrap:['#b83a28',0.5]},
    spirit:{desat:0.55, env:['#3a1a3c',0.4], foot:0, rim:['#ff4a30',0.85,'top'], wrap:['#ff3020',0.75]},
    friend:{desat:0, env:['#5a2430',0.12], foot:0, rim:['#ff6a40',0.55,'bottom'], noFade:true} };

  // ═════════ TIỆN ÍCH ═════════
  const lighter=(g,fn)=>{ g.save(); g.globalCompositeOperation='lighter'; fn(); g.restore(); };
  function glowDot(g,x,y,r,col,a){ if(a<=0.01||r<=0.5) return; const rg=g.createRadialGradient(x,y,0,x,y,r); rg.addColorStop(0,'rgba('+col+','+a+')'); rg.addColorStop(0.35,'rgba('+col+','+(a*0.45)+')'); rg.addColorStop(1,'rgba('+col+',0)'); g.fillStyle=rg; g.fillRect(x-r,y-r,2*r,2*r); }   // quầng sáng tắt CHẬM (không gauss đều — kiểu ánh sáng anime)
  const SCx=F=>F.SC||1;
  let BUF=null; const buf=F=>{ const w=Math.round(VW*SCx(F)), h=Math.round(VH*SCx(F)); if(!BUF||BUF.width!==w||BUF.height!==h) BUF=K.mk(w,h); const x=BUF.getContext('2d'); x.setTransform(1,0,0,1,0,0); x.globalCompositeOperation='source-over'; x.globalAlpha=1; x.filter='none'; x.clearRect(0,0,w,h); x.setTransform(SCx(F),0,0,SCx(F),0,0); return x; };
  let BUF2=null; const buf2=F=>{ const w=Math.round(VW*SCx(F)), h=Math.round(VH*SCx(F)); if(!BUF2||BUF2.width!==w||BUF2.height!==h) BUF2=K.mk(w,h); const x=BUF2.getContext('2d'); x.setTransform(1,0,0,1,0,0); x.globalCompositeOperation='source-over'; x.globalAlpha=1; x.filter='none'; x.clearRect(0,0,w,h); x.setTransform(SCx(F),0,0,SCx(F),0,0); return x; };
  const blit=(g,c)=>{ g.drawImage(c,0,0,VW,VH); };

  // ═════════ NỀN (tấm GPT) ═════════
  //   hz = chân trời (tỉ lệ cao ảnh) · k = cỡ 1 meme đứng ở dòng v: k·(v − hz) chiều cao ảnh (đo theo cột gãy trong tranh) · sky = có trời đã tách
  const PLT={ PG:{hz:0.585,k:0.87,sky:true}, PV:{hz:0.515,k:0.25,sky:true}, PL:{hz:0.9,k:0,sky:true}, PH:{hz:null,k:0.15,sky:false} };
  // vw = {p, zm, cx, cy, zm2, cx2, cy2, blur} → khung nhìn (u = tiến độ shot cho máy trôi rất nhẹ)
  function plateView(F,vw,u){ const k=eio(clamp(u,0,1)), zm=lerp(vw.zm,vw.zm2==null?vw.zm:vw.zm2,k), cx=lerp(vw.cx,vw.cx2==null?vw.cx:vw.cx2,k), cy=lerp(vw.cy,vw.cy2==null?vw.cy:vw.cy2,k);
    const im=F.I[vw.p], iw=im&&im.naturalWidth||1536, ih=im&&im.naturalHeight||1024, s=Math.max(VW/iw,VH/ih)*zm*1.02, W=iw*s, H=ih*s, pl=PLT[vw.p];
    let x0=clamp(VW/2-cx*W,VW-W,0), y0=Math.max(VH/2-cy*H,VH-H); if(!pl.sky) y0=Math.min(y0,0);
    const M={vw,p:vw.p,s,W,H,x0,y0,X:u=>x0+u*W,Y:v=>y0+v*H,hz:pl.hz!=null?y0+pl.hz*H:null};
    M.at=(u,v)=>[M.X(u),M.Y(v)]; M.hOf=(v,mul)=>Math.max(3,(pl.hz!=null?pl.k*(v-pl.hz):pl.k*(0.85+0.3*v))*H*(mul||1)); return M; }
  // vẽ tấm nền: nhuộm bảng màu (multiply) + sương xa ở chân trời + tối dần về tiền cảnh (độ tương phản giảm theo khoảng cách)
  function plate(F,M,P,o){ o=o||{}; const im=F.I[M.p]; if(!im||!im.complete||!im.naturalWidth) return; const x=buf(F), bl=(M.vw.blur||0)*SCx(F);
    const draw=()=>{ if(bl) x.filter='blur('+bl.toFixed(2)+'px)'; x.drawImage(im,M.x0,M.y0,M.W,M.H); x.filter='none'; };
    draw(); x.globalCompositeOperation='multiply'; x.globalAlpha=P.gnd[1]; x.fillStyle=P.gnd[0]; x.fillRect(0,0,VW,VH); x.globalAlpha=1; x.globalCompositeOperation='destination-in'; draw();
    x.globalCompositeOperation='source-atop';
    if(M.hz!=null){ const hz=M.hz, lg=x.createLinearGradient(0,hz-VH*0.02,0,hz+VH*0.3); lg.addColorStop(0,'rgba('+P.haze+',0.75)'); lg.addColorStop(0.25,'rgba('+P.haze+',0.35)'); lg.addColorStop(1,'rgba('+P.haze+',0)'); x.fillStyle=lg; x.fillRect(0,0,VW,VH); }
    const dk=P.dark*(o.dark==null?1:o.dark), dg=x.createLinearGradient(0,VH*0.45,0,VH); dg.addColorStop(0,'rgba(4,2,8,0)'); dg.addColorStop(1,'rgba(4,2,8,'+dk+')'); x.fillStyle=dg; x.fillRect(0,0,VW,VH);
    if(o.light) for(const [lx,ly,lr,col,a] of o.light){ x.globalCompositeOperation='source-atop'; glowDot(x,lx,ly,lr,col,a); }
    blit(F.g,BUF); }

  // ═════════ TRỜI + MÂY (code — có chuyển động, luật phim) ═════════
  const CLUMP={};   // cụm mây cel 3 tông (bóng / giữa / sáng), đáy phẳng hắt ánh lửa
  // tích vân kiểu nền anime: viền phồng (nhiều vòng to nhỏ theo dáng vòm), đáy phẳng, tô CHUYỂN từ đỉnh sáng → đáy tối, vài mảng sáng mềm, đáy hắt ánh lửa, mép hơi mềm
  function clump(P,v){ const id=P.sky[0]+v; if(CLUMP[id]) return CLUMP[id]; const W=420, H=180, base=H*0.86, c=K.mk(W,H), x=c.getContext('2d'), n=16+(v%5)*2, Bs=[];
    for(let i=0;i<n;i++){ const f=hash(v*31+i*1.7), dome=Math.sin(Math.PI*(0.08+0.84*f)), r=H*(0.08+0.2*dome*(0.6+0.6*hash(v*13+i))); Bs.push([W*(0.08+0.84*f), base-r*0.35-dome*H*0.42*hash(v*5+i*2.3), r]); }
    const m=K.mk(W,H), mx=m.getContext('2d'); mx.fillStyle='#000'; for(const [a,b,r] of Bs){ mx.beginPath(); mx.arc(a,b,r,0,TAU); mx.fill(); }
    mx.globalCompositeOperation='destination-out'; mx.fillRect(0,base,W,H);
    x.filter='blur(1.2px)'; x.drawImage(m,0,0); x.filter='none'; x.globalCompositeOperation='source-in';
    const lg=x.createLinearGradient(0,H*0.15,0,base); lg.addColorStop(0,P.cl[2]); lg.addColorStop(0.45,P.cl[1]); lg.addColorStop(1,P.cl[0]); x.fillStyle=lg; x.fillRect(0,0,W,H);
    x.globalCompositeOperation='source-atop';
    for(const [a,b,r] of Bs) if(r>H*0.15&&hash(a+b)>0.35){ const rg=x.createRadialGradient(a-r*0.25,b-r*0.35,0,a-r*0.25,b-r*0.35,r*0.75); rg.addColorStop(0,P.cl[2]); rg.addColorStop(1,'rgba(0,0,0,0)'); x.globalAlpha=0.55; x.fillStyle=rg; x.fillRect(0,0,W,H); x.globalAlpha=1; }
    const ug=x.createLinearGradient(0,base-H*0.22,0,base); ug.addColorStop(0,'rgba('+P.under+',0)'); ug.addColorStop(1,'rgba('+P.under+','+P.ua+')'); x.fillStyle=ug; x.fillRect(0,0,W,H);
    return CLUMP[id]=c; }
  // khối mây nhìn từ dưới (cho trần mây góc ngước): tròn phồng, lõi tối, mép phía +x (quay về nguồn sáng) sáng lên
  const BLOB={};
  function blob(P,v){ const id=P.sky[0]+'b'+v; if(BLOB[id]) return BLOB[id]; const W=320, H=230, c=K.mk(W,H), x=c.getContext('2d'), m=K.mk(W,H), mx=m.getContext('2d'); mx.fillStyle='#000';
    for(let i=0;i<14;i++){ const an=hash(v*41+i)*TAU, d=Math.sqrt(hash(v*29+i*2.1)), r=H*(0.14+0.16*hash(v*17+i))*(1-0.4*d); mx.beginPath(); mx.arc(W/2+Math.cos(an)*d*W*0.3,H/2+Math.sin(an)*d*H*0.28,r,0,TAU); mx.fill(); }
    x.filter='blur(1.5px)'; x.drawImage(m,0,0); x.filter='none'; x.globalCompositeOperation='source-in';
    const lg=x.createLinearGradient(0,0,W,0); lg.addColorStop(0,P.cl[0]); lg.addColorStop(0.65,P.cl[1]); lg.addColorStop(1,P.cl[2]); x.fillStyle=lg; x.fillRect(0,0,W,H);
    x.globalCompositeOperation='source-atop'; const rg=x.createRadialGradient(W*0.78,H*0.5,0,W*0.78,H*0.5,W*0.35); rg.addColorStop(0,'rgba('+P.under+','+(P.ua*0.8)+')'); rg.addColorStop(1,'rgba('+P.under+',0)'); x.fillStyle=rg; x.fillRect(0,0,W,H);
    return BLOB[id]=c; }
  // mây tầng mỏng sát chân trời (vệt dài, mờ vào sương)
  function streak(x,P,cx,cy,w,h,a){ const g=x.createRadialGradient(0,0,0,0,0,1); x.save(); x.translate(cx,cy); x.scale(w,h); g.addColorStop(0,'rgba('+P.haze+','+a+')'); g.addColorStop(0.6,'rgba('+P.haze+','+(a*0.5)+')'); g.addColorStop(1,'rgba('+P.haze+',0)'); x.fillStyle=g; x.beginPath(); x.arc(0,0,1,0,TAU); x.fill(); x.restore(); }
  const STRIP={};   // 1 lớp mây = dải cụm mây lặp ngang (xa: nhỏ, nhạt vào sương · gần: to, đậm)
  function strip(P,L){ const id=P.sky[0]+L; if(STRIP[id]) return STRIP[id]; const W=2000, H=260, c=K.mk(W,H), x=c.getContext('2d'), n=[9,6,4][L], sc=[0.5,0.85,1.5][L];
    if(L===0) for(let i=0;i<14;i++){ const cx=hash(i+880)*W; for(const dx of [0,-W,W]) streak(x,P,cx+dx,H*(0.55+0.4*hash(i+881)),W*(0.06+0.1*hash(i+882)),H*(0.03+0.04*hash(i+883)),0.55); }
    for(let i=0;i<n;i++){ const k=0.75+0.5*hash(L*50+i), cw=420*sc*k*(1+0.6*hash(L*60+i)), ch=180*sc*k, cx=(i+0.25+hash(L*70+i)*0.5)/n*W, cy=H-ch-(hash(L*90+i))*H*(L===2?0.05:0.3);
      for(const dx of [0,-W,W]) x.drawImage(clump(P,(L*3+i)%8),cx+dx-cw/2,cy,cw,ch); }
    x.globalCompositeOperation='source-atop'; x.fillStyle='rgba('+P.haze+','+[0.55,0.22,0][L]+')'; x.fillRect(0,0,W,H);   // xa → nhạt vào sương (atmospheric perspective)
    return STRIP[id]=c; }
  // trời ngang tầm mắt: gradient + quầng sáng + 3 lớp mây (xa chậm, gần nhanh — parallax)
  function skyBand(F,t,P,hz,o){ o=o||{}; const g=F.g; hz=hz==null?VH*0.55:hz;
    const sg=g.createLinearGradient(0,hz-VH*1.1,0,hz); sg.addColorStop(0,P.sky[0]); sg.addColorStop(0.6,P.sky[1]); sg.addColorStop(1,P.sky[2]); g.fillStyle=sg; g.fillRect(-40,-VH*3,VW+80,VH*5);
    for(const gl of (o.glow||[])) lighter(g,()=>glowDot(g,gl[0],gl[1],gl[2],gl[3],gl[4]));
    const wind=o.wind==null?1:o.wind, cs=o.cs||1;
    for(let j=0;j<(o.up||0);j++){ const st=strip(P,2), bh=0.42*VH, sw=st.width*bh/st.height, by=hz-VH*(0.62+0.5*j), off=-(((t*(18+6*j)*wind+j*530)%sw)+sw)%sw; for(let xx=off-sw;xx<VW+sw;xx+=sw) g.drawImage(st,xx,by-bh,sw+1,bh); }   // mây tầng cao (cho shot ngước dọc thân Friend)
    for(let L=0;L<3;L++){ const s=strip(P,L), bh=[0.11,0.2,0.36][L]*VH*cs, sh=bh/s.height, sw=s.width*sh, by=hz-[0.004,0.07,0.21][L]*VH*cs, off=-(((t*[3,7,15][L]*wind+L*370)%sw)+sw)%sw;
      g.save(); g.globalAlpha=[0.9,0.95,1][L]; for(let xx=off-sw;xx<VW+sw;xx+=sw) g.drawImage(s,xx,by-bh,sw+1,bh); g.restore(); }
    if(o.red>0) lighter(g,()=>glowDot(g,o.redX==null?VW*0.6:o.redX,hz-VH*0.35,VW*0.9,'255,60,30',0.45*o.red)); }
  // góc NGƯỚC thẳng lên: trần mây xoáy quanh 1 tâm · glow = đỏ rực từ BÊN TRONG mây · hole = lỗ rách (Friend xé) · blow = mây bị thổi bạt ra · bolt = sét đỏ trong mây
  let CLC=null;
  function skyUp(F,t,P,o){ o=o||{}; const g=F.g, cx=o.cx==null?VW/2:o.cx, cy=o.cy==null?VH*0.3:o.cy;
    const sg=g.createRadialGradient(cx,cy,0,cx,cy,VW*0.9); sg.addColorStop(0,P.sky[2]); sg.addColorStop(0.45,P.sky[1]); sg.addColorStop(1,P.sky[0]); g.fillStyle=sg; g.fillRect(-40,-40,VW+80,VH+80);
    for(const gl of (o.glow||[])) lighter(g,()=>glowDot(g,gl[0],gl[1],gl[2],gl[3],gl[4]));
    const x=buf2(F), sw=o.swirl==null?0.03:o.swirl, hole=o.hole||0, blow=o.blow||0;
    // trần mây nhìn từ DƯỚI lên: khối mây tròn mềm rải ngẫu nhiên phủ kín trời (chừa tâm), xa tâm = gần máy → to + tối hơn; vẽ từ tâm (xa) ra mép (gần)
    const CL=[]; for(let i=0;i<54;i++){ const f=Math.pow(hash(i*7.1+3),0.7), a0=hash(i*3.3+1)*TAU; CL.push({f,a0,i}); } CL.sort((p,q)=>p.f-q.f);
    for(const cl of CL){ const {f,a0,i}=cl, a=a0+t*sw*(1.2-0.6*f), rr=VW*(0.16+0.85*f)+blow*VW*(0.5-0.25*f)+hole*VW*0.2*(1-f), px=cx+Math.cos(a)*rr, py=cy+Math.sin(a)*rr*0.8, s=VW*(0.2+0.42*f)*(0.8+0.4*hash(i+5));
      if(px<-s||px>VW+s||py<-s||py>VH+s) continue; const lit=Math.atan2(cy-py,cx-px); x.save(); x.translate(px,py); x.rotate(lit); x.drawImage(blob(P,i%6),-s/2,-s*0.36,s,s*0.72); x.restore(); }
    x.globalCompositeOperation='source-atop';
    if(o.glow2>0){ x.globalCompositeOperation='lighter'; const rg=x.createRadialGradient(cx,cy,0,cx,cy,VW*0.75); rg.addColorStop(0,'rgba(255,170,90,'+(0.75*o.glow2)+')'); rg.addColorStop(0.35,'rgba(255,60,40,'+(0.5*o.glow2)+')'); rg.addColorStop(1,'rgba(120,10,20,0)');
      x.fillStyle=rg; x.fillRect(0,0,VW,VH); x.globalCompositeOperation='source-atop'; }
    if(o.bolt>0){ const fr=Math.floor(t*14); if(hash(fr*3.7)>0.45){ x.globalCompositeOperation='lighter'; x.strokeStyle='rgba(255,90,60,'+(0.8*o.bolt)+')'; x.lineWidth=2; x.beginPath();
        let bx=cx+(hash(fr)-0.5)*VW*0.9, by=cy+(hash(fr+1)-0.5)*VH*0.6; x.moveTo(bx,by); for(let k=0;k<7;k++){ bx+=(hash(fr*7+k)-0.5)*90; by+=(hash(fr*9+k)-0.5)*60; x.lineTo(bx,by); } x.stroke(); x.globalCompositeOperation='source-atop'; } }
    if(hole>0){ const R=VW*0.36*hole; x.save(); x.translate(cx,cy); x.scale(1,0.8);   // lỗ rách MÉP MỀM (khoét bằng gradient, không kẻ viền) + mép mây cháy sáng
      x.globalCompositeOperation='destination-out'; let rg=x.createRadialGradient(0,0,0,0,0,R); rg.addColorStop(0,'rgba(0,0,0,1)'); rg.addColorStop(0.7,'rgba(0,0,0,0.85)'); rg.addColorStop(1,'rgba(0,0,0,0)'); x.fillStyle=rg; x.beginPath(); x.arc(0,0,R,0,TAU); x.fill();
      x.globalCompositeOperation='source-atop'; rg=x.createRadialGradient(0,0,R*0.6,0,0,R*1.5); rg.addColorStop(0,'rgba(255,190,110,'+(0.8*(o.glow2||0.5))+')'); rg.addColorStop(1,'rgba(255,70,40,0)'); x.fillStyle=rg; x.fillRect(-R*2,-R*2,R*4,R*4); x.restore(); }
    blit(g,BUF2); }

  // ═════════ KHÓI / BỤI / HẠT 2D ═════════
  let PUF=null; const PUFT=new Map();
  function puffs(){ if(PUF) return PUF; PUF=[]; for(let v=0;v<5;v++){ const S=128, c=K.mk(S,S), x=c.getContext('2d'), n=14+v*2;
      for(let i=0;i<n;i++){ const an=hash(v*97+i*3.1)*TAU, d=Math.sqrt(hash(v*53+i*7.7))*S*0.24, r=S*(0.1+0.09*hash(v*31+i*5.3));
        for(const [dy,k,col] of [[4,1.05,'120,112,108'],[0,0.94,'196,190,184'],[-4,0.7,'236,232,228']]){ const bx=S/2+Math.cos(an)*d, by=S/2+Math.sin(an)*d*0.85+dy, gr=x.createRadialGradient(bx,by,0,bx,by,r*k); gr.addColorStop(0,'rgba('+col+',0.85)'); gr.addColorStop(0.6,'rgba('+col+',0.45)'); gr.addColorStop(1,'rgba('+col+',0)'); x.fillStyle=gr; x.beginPath(); x.arc(bx,by,r*k,0,TAU); x.fill(); } }
      x.globalCompositeOperation='destination-in'; const m=x.createRadialGradient(S/2,S/2,S*0.16,S/2,S/2,S*0.5); m.addColorStop(0,'#000'); m.addColorStop(1,'rgba(0,0,0,0)'); x.fillStyle=m; x.fillRect(0,0,S,S); PUF.push(c); } return PUF; }
  function puffT(v,tint,kk){ kk=kk||0.62; const id=v+'|'+tint+'|'+kk; let c=PUFT.get(id); if(c) return c; const s=puffs()[v]; c=K.mk(s.width,s.height); const x=c.getContext('2d'); x.drawImage(s,0,0); x.globalCompositeOperation='source-atop'; x.fillStyle='rgba('+tint+','+kk+')'; x.fillRect(0,0,c.width,c.height); PUFT.set(id,c); return c; }
  // khói trôi chậm trong 1 vùng (x0..x1, y), n cụm · a độ đậm
  function wisps(F,t,o){ const g=F.g; for(let i=0;i<o.n;i++){ const s=(o.seed||1)*37+i, sp=(o.sp||8)*(0.5+hash(s)), x=o.x0+((hash(s+1)*(o.x1-o.x0)+t*sp)%(o.x1-o.x0+1)), y=o.y+(hash(s+2)-0.5)*(o.dy||40)-Math.sin(t*0.4+i)*6, r=(o.r||80)*(0.6+0.8*hash(s+3));
      g.save(); g.globalAlpha=(o.a||0.5)*(0.5+0.5*hash(s+4)); g.translate(x,y); g.rotate(hash(s+5)*TAU+t*0.05); g.drawImage(puffT(i%5,o.tint||'90,80,96'),-r,-r,2*r,2*r); g.restore(); } }
  // bụi bùng ở chân (đáp đất / văng) — toả ngang, bốc nhẹ, tan dần
  function dust(F,t,t0,x,y,w,o){ o=o||{}; const u=(t-t0)/(o.life||1.1); if(u<0||u>1) return; const g=F.g, n=o.n||9;
    for(let i=0;i<n;i++){ const s=(o.seed||3)*19+i, dir=(hash(s)-0.5)*2, d=w*(0.25+0.75*eout(u))*Math.abs(dir)*1.1, px=x+Math.sign(dir)*d, py=y-w*0.12*eout(u)*(0.4+hash(s+1))-w*0.05, r=w*(0.16+0.2*hash(s+2))*(0.6+0.8*eout(u));
      g.save(); g.globalAlpha=(o.a||0.6)*(1-ein(u)); g.translate(px,py); g.rotate(hash(s+3)*TAU); g.drawImage(puffT(i%5,o.tint||'110,96,100'),-r,-r,2*r,2*r); g.restore(); } }
  // hạt: tím rơi (tàn Hollow Purple) · tro như tuyết · than hồng bay lên
  function motes(F,t,o){ const g=F.g, a=o.a==null?1:o.a; if(a<=0.01) return; const n=o.n||50, up=o.up?-1:1;
    lighter(g,()=>{ for(let i=0;i<n;i++){ const s=(o.seed||5)*71+i, sp=(o.sp||30)*(0.5+hash(s)), y=(((hash(s+1)*(VH+40)+up*t*sp)%(VH+40))+VH+40)%(VH+40)-20, x=(hash(s+2)*VW+Math.sin(t*(0.6+hash(s+3))+i)*(o.sway||12)),
        tw=0.5+0.5*Math.sin(t*(3+4*hash(s+4))+i), r=(o.r||1.6)*(0.6+0.8*hash(s+5));
        if(o.add!==false){ glowDot(g,x,y,r*5,o.col,0.35*a*tw); g.fillStyle='rgba('+(o.core||'255,255,255')+','+(0.9*a*tw)+')'; g.fillRect(x-r*0.5,y-r*0.5,r,r); } } }); }
  function ash(F,t,a,x0,x1){ if(a<=0.01) return; const g=F.g; x0=x0||0; x1=x1||VW; g.save(); for(let i=0;i<80;i++){ const sp=14+22*hash(i+1300), y=((hash(i+1301)*VH+t*sp)%(VH+20))-10, x=x0+((hash(i+1302)*(x1-x0)+Math.sin(t*0.8+i)*16)%(x1-x0+1)), r=0.7+1.7*hash(i+1303);
      g.globalAlpha=a*(0.3+0.5*hash(i+1304)); g.fillStyle=i%3?'#d8d4dc':'#a8a0ac'; g.beginPath(); g.arc(x,y,r,0,TAU); g.fill(); } g.restore(); }

  // ═════════ MEME HOÀ VÀO CẢNH ═════════
  const CROP={NINJA:[0.06,0.955]};   // tỉ lệ ngang ảnh gốc giữ lại (bỏ mẩu áo dính mép)
  const BK={};
  // nướng 1 lần / (ảnh, tông, cỡ, mép đáy) — res 0: 220px · 1: 600px · 2: gốc ≤1600px
  function bake(F,key,tone,res,fade){ const id=key+'|'+tone+'|'+res+'|'+(fade||0); if(BK[id]) return BK[id]; let c=K.prep(F.I[key]); if(!c) return null; if(CROP[key]){ const nw=F.I[key].naturalWidth, a=Math.max(c.sx,CROP[key][0]*nw), z=Math.min(c.sx+c.sw,CROP[key][1]*nw); c={src:c.src,sx:a,sy:c.sy,sw:z-a,sh:c.sh}; }
    const o=TN[tone]||TN.night, px=key==='FR', sc=Math.min(1,[220,600,1600][res]/c.sh), w=Math.max(2,Math.round(c.sw*sc)), h=Math.max(2,Math.round(c.sh*sc)), cv=K.mk(w,h), x=cv.getContext('2d');
    x.imageSmoothingEnabled=!px; const img=()=>x.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,0,0,w,h); img();
    if(o.desat){ x.globalCompositeOperation='saturation'; x.globalAlpha=o.desat; x.fillStyle='#808080'; x.fillRect(0,0,w,h); x.globalAlpha=1; }
    if(o.env){ x.globalCompositeOperation='multiply'; x.globalAlpha=o.env[1]; x.fillStyle=o.env[0]; x.fillRect(0,0,w,h); x.globalAlpha=1; }
    x.globalCompositeOperation='destination-in'; img(); x.globalCompositeOperation='source-atop';
    if(o.foot){ const lg=x.createLinearGradient(0,0,0,h); lg.addColorStop(0,'rgba(0,0,0,0)'); lg.addColorStop(0.6,'rgba(0,0,0,0)'); lg.addColorStop(1,'rgba(6,4,10,'+o.foot+')'); x.fillStyle=lg; x.fillRect(0,0,w,h); }
    if(o.dark){ x.globalAlpha=o.dark; x.fillStyle='#07040a'; x.fillRect(0,0,w,h); x.globalAlpha=1; }
    if(o.rim){ const d=o.rim[2], lg=d==='left'?x.createLinearGradient(0,0,w*0.35,0):d==='right'?x.createLinearGradient(w,0,w*0.65,0):d==='bottom'?x.createLinearGradient(0,h,0,h*0.6):x.createLinearGradient(0,0,0,h*0.32);
      lg.addColorStop(0,o.rim[0]); lg.addColorStop(1,'rgba(0,0,0,0)'); x.globalAlpha=o.rim[1]*0.55; x.fillStyle=lg; x.fillRect(0,0,w,h); x.globalAlpha=1; }
    if(o.wrap&&!px){ const e=K.mk(w,h), ex=e.getContext('2d'); ex.drawImage(cv,0,0); ex.globalCompositeOperation='source-in'; ex.fillStyle=o.wrap[0]; ex.fillRect(0,0,w,h);   // LIGHT WRAP: màu nền ăn vào mép ảnh (mép = ảnh − ảnh mờ)
      ex.globalCompositeOperation='destination-out'; ex.filter='blur('+Math.max(1.2,h*0.012).toFixed(1)+'px)'; ex.drawImage(cv,0,0); ex.filter='none';
      x.globalCompositeOperation='source-atop'; x.globalAlpha=o.wrap[1]; x.drawImage(e,0,0); x.globalAlpha=1; }
    const fd=fade||(o.noFade?0:0.07); if(fd>0){ x.globalCompositeOperation='destination-out'; const fg=x.createLinearGradient(0,h*(1-fd),0,h); fg.addColorStop(0,'rgba(0,0,0,0)'); fg.addColorStop(1,'rgba(0,0,0,1)'); x.fillStyle=fg; x.fillRect(0,h*(1-fd),w,h*fd+1); }
    x.globalCompositeOperation='source-over'; return BK[id]={cv,ar:c.sw/c.sh,px,c,iw:F.I[key].naturalWidth,ih:F.I[key].naturalHeight}; }
  const SIL={}; function silOf(b,col){ const id=col; b.sil=b.sil||{}; if(b.sil[id]) return b.sil[id]; const c=K.mk(b.cv.width,b.cv.height), x=c.getContext('2d'); x.drawImage(b.cv,0,0); x.globalCompositeOperation='source-in'; x.fillStyle=col; x.fillRect(0,0,c.width,c.height); return b.sil[id]=c; }
  // vẽ meme, CHÂN (đáy ảnh) ở (x,y), cao h px · o: tone, fade (mép đáy mờ, ảnh bán thân), flip, rot, sx, sy, a, blur (độ sâu), shadow:[y,độ], mist:[màu,độ],
  //   back:[màu,độ] (ngược sáng quầng sau lưng), dark (0–1 bóng đen), white (loé), anchor:[u,v,X,Y] (đặt điểm (u,v) của ẢNH GỐC vào (X,Y) màn hình — thay cho x,y)
  function meme(F,key,x,y,h,o){ o=o||{}; const g=F.g, px=h*SCx(F), res=px>520?2:px>180?1:0, b=bake(F,key,o.tone||'night',res,o.fade); if(!b) return null;
    const hh=h*(o.sy||1), ww=h*b.ar*(o.sx||1), c=b.c;
    const loc=(u,v)=>[((u*b.iw-c.sx)/c.sw-0.5)*ww*(o.flip?-1:1), -hh+((v*b.ih-c.sy)/c.sh)*hh];   // điểm ảnh gốc → toạ độ quanh chân (trước khi xoay)
    if(o.anchor){ const [ax,ay]=loc(o.anchor[0],o.anchor[1]), cr=Math.cos(o.rot||0), sr=Math.sin(o.rot||0); x=o.anchor[2]-(ax*cr-ay*sr); y=o.anchor[3]-(ax*sr+ay*cr); }
    const al=o.a==null?1:o.a, pt=(u,v)=>{ const [lx,ly]=loc(u,v), cr=Math.cos(o.rot||0), sr=Math.sin(o.rot||0); return [x+lx*cr-ly*sr, y+lx*sr+ly*cr]; };
    if(al<=0.01) return {x,y,w:ww,h:hh,pt};
    if(o.shadow){ g.save(); g.globalAlpha=o.shadow[1]*al; g.translate(x,o.shadow[0]); g.scale(1,0.16); const rg=g.createRadialGradient(0,0,0,0,0,ww*0.62); rg.addColorStop(0,'rgba(0,0,0,0.9)'); rg.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=rg; g.beginPath(); g.arc(0,0,ww*0.62,0,TAU); g.fill(); g.restore(); }
    const put=(src,a,comp,blur)=>{ g.save(); g.globalAlpha=a; if(comp) g.globalCompositeOperation=comp; g.translate(x,y); if(o.rot) g.rotate(o.rot); if(o.flip) g.scale(-1,1); if(b.px) g.imageSmoothingEnabled=false;
      if(blur) g.filter='blur('+(blur*SCx(F)).toFixed(2)+'px)'; g.drawImage(src,-ww/2,-hh,ww,hh); g.restore(); };
    if(o.back) put(silOf(b,'rgb('+o.back[0]+')'),o.back[1]*al,'lighter',Math.max(3,h*0.03));
    if(!b.px&&!o.blur&&!o.cheap) put(b.cv,al*0.6,null,0.6);   // lớp mờ dưới + lớp nét trên = mép mềm (không "dán" PNG)
    put(b.cv,al,null,o.blur||0);
    if(o.dark) put(silOf(b,'#06040a'),o.dark*al);
    if(o.white) put(silOf(b,'#ffffff'),o.white*al,'lighter');
    if(o.mist){ g.save(); g.globalAlpha=o.mist[1]*al; g.translate(x,y-hh*0.02); g.scale(1,0.3); const rg=g.createRadialGradient(0,0,0,0,0,ww*0.75); rg.addColorStop(0,'rgba('+o.mist[0]+',0.8)'); rg.addColorStop(1,'rgba('+o.mist[0]+',0)'); g.fillStyle=rg; g.beginPath(); g.arc(0,0,ww*0.75,0,TAU); g.fill(); g.restore(); }
    return {x,y,w:ww,h:hh,pt}; }
  // nhịp thở dốc (Pain kiệt sức): nhấc + phồng theo nhịp 0.8s, có giật
  const gasp=t=>{ const p=(t%0.8)/0.8; return p<0.35?eout(p/0.35):1-ein((p-0.35)/0.65); };

  // ═════════ CHIÊU / VFX bằng code ═════════
  // cầu TÍM (Hollow Purple dạng cầu): quầng, vệt hút xoáy vào, vòng xoay, lõi trắng
  function orb(g,x,y,R,t,a,col){ if(a<=0.01||R<0.5) return; col=col||'190,110,255';
    lighter(g,()=>{ glowDot(g,x,y,R*4.2,col,0.55*a); g.lineCap='round';
      for(let i=0;i<22;i++){ const ph=(t*1.5+hash(i*2.3))%1, base=hash(i*1.7)*TAU, an=base+ph*2.2, rr=R*(3.2-2.3*ph), L=R*0.5*ph; const dx=-Math.sin(an), dy=Math.cos(an), px=x+Math.cos(an)*rr, py=y+Math.sin(an)*rr;
        g.strokeStyle='rgba('+(i%3?col:'255,255,255')+','+(a*Math.min(1,ph*2))+')'; g.lineWidth=Math.max(1,R*0.08); g.beginPath(); g.moveTo(px,py); g.lineTo(px-dx*L,py-dy*L); g.stroke(); }
      for(let k=0;k<3;k++){ const rot=-t*6+k*2.1; g.strokeStyle='rgba('+col+','+(0.75*a)+')'; g.lineWidth=Math.max(1,R*0.1); g.beginPath(); g.arc(x,y,R*(1.22+0.16*k),rot,rot+1.7); g.stroke(); }
      const gr=g.createRadialGradient(x,y,0,x,y,R); gr.addColorStop(0,'rgba(255,255,255,'+a+')'); gr.addColorStop(0.45,'rgba('+col+','+a+')'); gr.addColorStop(1,'rgba('+col+','+(0.25*a)+')'); g.fillStyle=gr; g.beginPath(); g.arc(x,y,R,0,TAU); g.fill();
      const fr=Math.floor(t*16); if(fr%2===0&&window.VfxGL&&VfxGL.boltSet) VfxGL.boltSet(g,x,y,hash(fr*3)*TAU,R*2.2,Math.max(1.2,R*0.07),fr*7,{branches:false,core:'#fbf2ff',rim:'#b06aff',glow:'rgba(170,90,255,0.35)'}); }); }
  // lưỡi kiếm laze: quầng đỏ nhiều lớp + lõi trắng
  function saber(g,x0,y0,x1,y1,w,a){ if(a<=0.01) return; g.save(); g.lineCap='round'; g.globalCompositeOperation='lighter';
    for(const [lw,c,al] of [[w*7,'255,30,20',0.16],[w*3.4,'255,50,30',0.42],[w*1.7,'255,120,90',0.8]]){ g.strokeStyle='rgba('+c+','+(al*a)+')'; g.lineWidth=lw; g.beginPath(); g.moveTo(x0,y0); g.lineTo(x1,y1); g.stroke(); }
    g.globalCompositeOperation='source-over'; g.strokeStyle='rgba(255,250,245,'+a+')'; g.lineWidth=Math.max(1,w*0.75); g.beginPath(); g.moveTo(x0,y0); g.lineTo(x1,y1); g.stroke(); g.restore(); }
  // mắt Rinnegan sáng (vòng tím + lõi trắng) tại 2 điểm đo
  function rinne(g,M,a,r){ if(!M||a<=0.01) return; lighter(g,()=>{ for(const [u,v] of PT.painEyes){ const [ex,ey]=M.pt(u,v); glowDot(g,ex,ey,r*3,'190,130,255',0.85*a); glowDot(g,ex,ey,r*0.9,'255,245,255',a); } }); }
  // đá vụn (khối đơn giản) bay theo đường
  function rock(g,x,y,R,ang,col){ g.save(); g.translate(x,y); g.rotate(ang); g.fillStyle=col||'#2e2834'; g.beginPath(); g.moveTo(-R,0); g.lineTo(-R*0.35,-R*0.7); g.lineTo(R*0.6,-R*0.45); g.lineTo(R,R*0.2); g.lineTo(0,R*0.6); g.closePath(); g.fill(); g.fillStyle='rgba(255,255,255,0.12)'; g.fillRect(-R*0.3,-R*0.6,R*0.6,R*0.2); g.restore(); }
  // vạch gió (hút / thổi)
  function windLines(g,t,cx,cy,inward,a,n,len,col){ if(a<=0.01) return; g.save(); g.lineCap='round'; for(let i=0;i<(n||30);i++){ const ph=(t*1.3+hash(i*3.3))%1, an=hash(i*1.9)*TAU, r0=VW*(inward?0.75-0.6*ph:0.08+0.7*ph), L=(len||60)*(inward?ph:1-ph);
      const x=cx+Math.cos(an)*r0, y=cy+Math.sin(an)*r0*0.7, dx=Math.cos(an)*(inward?-1:1), dy=Math.sin(an)*0.7*(inward?-1:1);
      g.strokeStyle='rgba('+(col||'230,220,255')+','+(a*0.55*Math.sin(ph*Math.PI))+')'; g.lineWidth=1.4; g.beginPath(); g.moveTo(x,y); g.lineTo(x-dx*L,y-dy*L); g.stroke(); } g.restore(); }
  // vòng lực Force (đỏ) quanh 1 điểm
  function forceRing(g,t,x,y,R,a){ if(a<=0.01) return; lighter(g,()=>{ const gr=g.createRadialGradient(x,y,R*0.3,x,y,R); gr.addColorStop(0,'rgba(255,40,30,0)'); gr.addColorStop(0.82,'rgba(255,50,40,'+(0.24*a)+')'); gr.addColorStop(1,'rgba(255,40,30,0)'); g.fillStyle=gr; g.beginPath(); g.arc(x,y,R,0,TAU); g.fill();
      g.strokeStyle='rgba(255,120,100,'+(0.6*a)+')'; g.lineWidth=2; for(let k=0;k<3;k++){ g.beginPath(); g.arc(x,y,R*(0.86+0.06*Math.sin(t*20+k)),t*3+k*2,t*3+k*2+2.1); g.stroke(); } }); }

  // ═════════ SHOT ═════════
  const SH=[];
  const S=(t0,t1,info,draw)=>SH.push({t0,t1,info,draw});
  const LS=(t,t0)=>t-t0;

  // ── A · Pain thở dốc ─────────────────────────────────────────────────────────
  S(0,T.a2,{co:'trung',goc:'ngang',loai:'thở',hd:'Nối cuối fin1c4: nổ tím còn loé trên trời, tàn tím rơi; Pain lơ lửng thấp giữa bãi đổ nát, THỞ DỐC khổ sở',anh:['PG','PAIN'],sfx:[]},(F,t,u)=>{
    const P=PAL.pur, vw={p:'PG',zm:1.5,cx:0.5,cy:0.62,zm2:1.56}, M=plateView(F,vw,u), g=F.g;
    skyBand(F,t,P,M.hz,{glow:[[VW*0.24,VH*0.08,VW*0.55,'205,120,255',0.6-0.2*u],[VW*0.24,VH*0.08,VW*0.14,'255,230,255',0.35-0.15*u]]});
    plate(F,M,P,{light:[[VW*0.24,VH*0.1,VW*0.7,'150,90,200',0.22]]});
    wisps(F,t,{n:7,x0:-80,x1:VW+80,y:M.hz+VH*0.04,r:90,a:0.42,tint:'110,86,124',seed:11});
    const br=gasp(t), m=meme(F,'PAIN',VW*0.6,VH*1.07-br*6+u*8,VH*0.8*(1+0.012*br),{tone:'pur',fade:0.3,sy:1-0.018*br,rot:-0.03+0.01*br,mist:['120,90,140',0.75]});
    rinne(g,m,0.35*Math.max(0,Math.sin(t*9))*(0.6+0.4*hash(Math.floor(t*12))),VH*0.012);
    wisps(F,t,{n:6,x0:VW*0.3,x1:VW*0.95,y:VH*0.98,r:110,a:0.55,tint:'96,78,110',seed:12,sp:12});
    motes(F,t,{n:55,col:'200,120,255',core:'240,210,255',sp:26,a:0.9,seed:3}); });
  S(T.a2,T.a3,{co:'cận',goc:'ngang',loai:'thở',hd:'Cận mặt Pain: run theo nhịp thở, Rinnegan chập chờn mờ; ánh tím từ TRÊN cao đổ xuống mặt (3 cầu đang tụ) → mắt loé',anh:['PG','PAIN'],sfx:[]},(F,t,u)=>{
    const P=PAL.pur, lt=LS(t,T.a2), vw={p:'PG',zm:2.6,cx:0.4,cy:0.62,blur:5}, M=plateView(F,vw,u), g=F.g, up=seg(t,T.a3-0.8,T.a3);
    skyBand(F,t,P,M.hz,{glow:[[VW*0.5,-VH*0.2,VW*0.7,'200,120,255',0.25+0.5*up]],cs:1.6}); plate(F,M,P);
    const br=gasp(t), sh=(hash(Math.floor(t*30))-0.5)*2.2;
    const m=meme(F,'PAIN',0,0,VH*2.05*(1+0.01*br),{tone:'pur',anchor:[PT.painFace[0],PT.painFace[1],VW*0.52+sh,VH*0.5-br*7-lt*6]});
    rinne(g,m,(0.3*Math.max(0,Math.sin(t*11))+0.9*seg(t,T.a3-0.35,T.a3-0.15))*(1-0.3*hash(Math.floor(t*15))),VH*0.03);
    lighter(g,()=>{ const lg=g.createLinearGradient(0,0,0,VH*0.6); lg.addColorStop(0,'rgba(180,100,255,'+(0.38*up)+')'); lg.addColorStop(1,'rgba(180,100,255,0)'); g.fillStyle=lg; g.fillRect(0,0,VW,VH); });   // para: ánh tím đổ từ trên
    motes(F,t,{n:30,col:'200,120,255',sp:30,a:0.7,seed:4,r:2.2}); });
  S(T.a3,T.a4,{co:'toàn',goc:'giun',loai:'ra chiêu',hd:'Ngước từ chỗ Pain: Gojo lơ lửng nhỏ trên cao, trên đầu TỤ 3 CẦU TÍM lớn dần, hút gió + đá vụn bay lên',anh:['PL','GOJO'],sfx:['ep3_charge']},(F,t,u)=>{
    const P=PAL.pur, lt=LS(t,T.a3), vw={p:'PL',zm:1.12,cx:0.5,cy:0.6,zm2:1.17}, M=plateView(F,vw,u), g=F.g, gx=VW*0.5, gy=VH*0.4+Math.sin(t*1.7)*3, gr=eout(seg(t,T.a3,T.a4));
    skyUp(F,t,P,{cx:gx,cy:gy-VH*0.12,swirl:0.05+0.08*gr,glow:[[gx,gy-VH*0.12,VW*0.5,'190,110,255',0.35+0.4*gr]]});
    windLines(g,t,gx,gy-VH*0.12,true,0.6+0.4*gr,34,70,'220,200,255');
    for(let i=0;i<14;i++){ const ph=((t-T.a3)*0.45+hash(i+60))%1, x0=VW*(0.08+0.84*hash(i+61)), y=lerp(VH*1.02,gy,ein(ph)), x=lerp(x0,gx,ein(ph)*0.8); rock(g,x,y,(4+8*hash(i+62))*(1-0.6*ph),t*2+i,'#241c2c'); }   // đá vụn bị hút bay lên
    plate(F,M,P,{dark:0.6,light:[[gx,gy,VW*0.6,'170,100,230',0.3]]});
    const m=meme(F,'GOJO',gx,gy+VH*0.06,VH*0.27,{tone:'pur',fade:0.25,back:['190,120,255',0.5]});
    const R=lerp(4,20,gr); [[-0.075,0.03],[0,-0.015],[0.075,0.03]].forEach(([dx,dy],i)=>orb(g,gx+dx*VW,gy-VH*0.27+dy*VH,R*(0.85+0.15*Math.sin(t*7+i)),t+i,eout(seg(t,T.a3+0.1*i,T.a3+0.4+0.1*i))));
    motes(F,t,{n:24,col:'200,120,255',sp:-20,a:0.6,seed:6}); });
  S(T.a4,T.stab,{co:'trung',goc:'giun',loai:'ra chiêu',hd:'Gojo cận trung góc thấp: 3 cầu tím TO trên đầu, tóc bay, lớp Vô hạn mờ đi; chữ HOLLOW PURPLE → LẶNG → tiếng bật kiếm, ánh đỏ loé sau lưng',anh:['PL','GOJO'],sfx:['se_charge','lightsaber_on']},(F,t,u)=>{
    const P=PAL.pur, vw={p:'PL',zm:1.4,cx:0.5,cy:0.62,blur:2.5}, M=plateView(F,vw,u), g=F.g, gr=eout(seg(t,T.a4,T.hush)), hush=seg(t,T.hush,T.hush+0.2), red=seg(t,T.ignite,T.ignite+0.1)*(0.7+0.3*Math.sin(t*40));
    skyUp(F,t,P,{cx:VW*0.45,cy:-VH*0.15,swirl:0.12,glow:[[VW*0.45,0,VW*0.7,'190,110,255',(0.5+0.3*gr)*(1-0.3*hush)]]});
    plate(F,M,P,{dark:0.7});
    for(let i=0;i<10;i++){ const ph=((t-T.a4)*0.5+hash(i+80))%1; rock(g,VW*(0.05+0.9*hash(i+81)),lerp(VH*1.05,-VH*0.05,ph),3+6*hash(i+82),t+i,'#2a2232'); }
    const gx=VW*0.44, by=VH*1.26+Math.sin(t*1.6)*4;
    if(red>0) lighter(g,()=>glowDot(g,gx-VW*0.02,VH*0.72,VH*0.5,'255,40,30',0.55*red));   // ánh kiếm đỏ bật sáng ngay SAU LƯNG Gojo
    const inf=0.5*(1-seg(t,T.title+0.4,T.hush)); if(inf>0.01) lighter(g,()=>{ for(let k=0;k<3;k++){ const r=VH*(0.52+0.06*k+0.012*Math.sin(t*5+k)); g.strokeStyle='rgba(190,225,255,'+((0.16-0.04*k)*inf)+')'; g.lineWidth=1.5; g.beginPath(); for(let i=0;i<=6;i++){ const an=i/6*TAU+t*0.4*(k%2?1:-1), px=gx+Math.cos(an)*r, py=VH*0.62+Math.sin(an)*r*0.92; i?g.lineTo(px,py):g.moveTo(px,py); } g.stroke(); } });
    meme(F,'GOJO',gx,by,VH*0.9,{tone:'pur',fade:0.2,back:red>0?['255,50,40',0.7*red]:['200,140,255',0.35]});
    lighter(g,()=>{ const lg=g.createLinearGradient(0,0,0,VH*0.55); lg.addColorStop(0,'rgba(190,110,255,'+(0.4*gr*(1-0.4*hush))+')'); lg.addColorStop(1,'rgba(190,110,255,0)'); g.fillStyle=lg; g.fillRect(0,0,VW,VH); });
    const R=lerp(24,46,gr)*(1-0.12*hush*Math.abs(Math.sin(t*25))); [[VW*0.27,VH*0.2],[VW*0.44,VH*0.13],[VW*0.61,VH*0.2]].forEach(([x,y],i)=>orb(g,x,y+Math.sin(t*2+i)*3,R*(0.9+0.1*Math.sin(t*9+i)),t+i*0.3,1-0.25*hush));
    windLines(g,t,VW*0.44,VH*0.08,true,0.5*(1-hush),26,80,'230,210,255'); });

  // ── B · Đánh lén ─────────────────────────────────────────────────────────────
  S(T.stab,T.eye,{co:'trung',goc:'ngang',loai:'đánh',hd:'Lưỡi laze ĐỎ đâm xuyên ngực Gojo từ sau ra trước: khựng, tia lửa, khói mép vết cháy (không máu); 3 cầu chập chờn',anh:['PL','GOJO'],sfx:['se_super_hit','se_impact_stop']},(F,t,u)=>{
    const P=PAL.night, lt=LS(t,T.stab), vw={p:'PL',zm:1.6,cx:0.55,cy:0.6,blur:3.5}, M=plateView(F,vw,u), g=F.g, hs=lt<0.14, sag=eout(seg(t,T.stab+0.4,T.eye));
    g.save(); g.translate(VW/2,VH/2); g.rotate(0.07); g.translate(-VW/2,-VH/2);
    skyUp(F,t,P,{cx:VW*0.5,cy:-VH*0.1,swirl:0.04,glow:[[VW*0.5,0,VW*0.6,'190,110,255',0.35*(1-sag)]]}); plate(F,M,P,{dark:0.7});
    lighter(g,()=>glowDot(g,VW*0.36,VH*0.72,VH*0.55,'255,40,30',0.45));
    const jit=hs?(hash(Math.floor(t*60))-0.5)*7:0;
    const m=meme(F,'GOJO',0,0,VH*1.24,{tone:'night',anchor:[PT.gojoBand[0],PT.gojoBand[1],VW*0.53+jit,VH*0.3+sag*VH*0.035],rot:0.05*sag,back:['255,50,40',0.6]});
    const [ex,ey]=m.pt(PT.gojoChest[0],PT.gojoChest[1]), L=VH*0.5*eout(seg(t,T.stab,T.stab+0.06)), dx=-0.88, dy=0.47;
    lighter(g,()=>{ glowDot(g,ex,ey,VH*0.22,'255,120,60',0.85*(1-0.5*sag)); glowDot(g,ex,ey,VH*0.06,'255,240,220',0.9); });
    saber(g,ex,ey,ex+dx*L,ey+dy*L,VH*0.012,1);
    lighter(g,()=>{ for(let i=0;i<18;i++){ const f=((lt*1.6)+hash(i+90))%1, an=-2.6+hash(i+91)*2.2, d=VH*0.35*f; g.fillStyle='rgba(255,'+(180+70*hash(i+92)|0)+',120,'+(1-f)+')'; g.fillRect(ex+Math.cos(an)*d,ey+Math.sin(an)*d+f*f*40,2.4,2.4); } });   // tia lửa toé ở vết đâm
    wisps(F,t,{n:4,x0:ex-30,x1:ex+30,y:ey-20-lt*30,r:34,a:0.45*(1-seg(t,T.eye-0.3,T.eye)),tint:'120,100,110',seed:21,sp:4,dy:30});
    const oa=1-0.5*seg(t,T.stab,T.eye); [[VW*0.33,VH*0.03],[VW*0.5,-VH*0.02],[VW*0.66,VH*0.03]].forEach(([x,y],i)=>orb(g,x,y,40*(0.9+0.2*Math.sin(t*31+i)),t,oa*(hash(Math.floor(t*20)+i)>0.25?1:0.35)));
    g.restore(); });
  S(T.eye,T.slash,{co:'cực cận',goc:'ngang',loai:'đối mặt',hd:'Cực cận mặt Gojo: run, ánh đỏ của lưỡi kiếm hắt từ dưới; 3 cầu trên đầu trôi lệch nhau rồi XÌ TẮT thành khói tím',anh:['PL','GOJO'],sfx:['l2p_shimmer']},(F,t,u)=>{
    const P=PAL.night, vw={p:'PL',zm:2.2,cx:0.5,cy:0.55,blur:6}, M=plateView(F,vw,u), g=F.g, fz=seg(t,T.fizz,T.fizz+0.55);
    skyUp(F,t,P,{cx:VW*0.5,cy:-VH*0.2,swirl:0.03,glow:[[VW*0.5,-VH*0.1,VW*0.6,'190,110,255',0.45*(1-fz)]]}); plate(F,M,P,{dark:0.7});
    const tr=(hash(Math.floor(t*40))-0.5)*3;
    meme(F,'GOJO',0,0,VH*2.7,{tone:'night',anchor:[PT.gojoBand[0],PT.gojoBand[1],VW*0.5+tr,VH*0.5+tr*0.5]});
    lighter(g,()=>{ const lg=g.createLinearGradient(0,VH,0,VH*0.45); lg.addColorStop(0,'rgba(255,50,30,0.42)'); lg.addColorStop(1,'rgba(255,50,30,0)'); g.fillStyle=lg; g.fillRect(0,0,VW,VH);
      const lg2=g.createLinearGradient(0,0,0,VH*0.4); lg2.addColorStop(0,'rgba(190,110,255,'+(0.4*(1-fz))+')'); lg2.addColorStop(1,'rgba(190,110,255,0)'); g.fillStyle=lg2; g.fillRect(0,0,VW,VH); });
    const sep=fz*VW*0.12; [[-1,0],[0,-1],[1,0]].forEach(([d,e],i)=>orb(g,VW*0.5+d*(VW*0.22+sep),VH*0.04+e*VH*0.03-fz*10,46*(1-0.7*fz)*(0.8+0.3*hash(Math.floor(t*24)+i)),t,(1-fz)*(hash(Math.floor(t*18)+i*5)>0.3?1:0.3)));
    if(fz>0) wisps(F,t,{n:9,x0:VW*0.15,x1:VW*0.85,y:VH*0.08+fz*VH*0.12,r:70,a:0.55*Math.sin(fz*Math.PI),tint:'150,90,200',seed:24,sp:10}); });
  S(T.slash,T.split,{co:'toàn',goc:'ngang',loai:'đánh',hd:'Catvader rút kiếm chém NGANG 1 nhát: vệt đỏ cắt qua cả khung, dãy nhà xa cũng đứt; nửa trên khung trượt lệch',anh:['PG','GOJO'],sfx:['lightsaber_whoosh_01','ed_hit7']},(F,t,u)=>{
    const P=PAL.night, vw={p:'PG',zm:1.18,cx:0.5,cy:0.6}, M=plateView(F,vw,u), g=F.g;
    skyBand(F,t,P,M.hz); plate(F,M,P); wisps(F,t,{n:6,x0:-60,x1:VW+60,y:M.hz+VH*0.03,r:80,a:0.4,tint:'80,66,84',seed:31});
    meme(F,'GOJO',VW*0.48,VH*0.66+Math.sin(t*1.7)*2,VH*0.34,{tone:'night',fade:0.25,back:['255,50,40',0.35],mist:['70,60,80',0.5]}); });
  S(T.split,T.reveal,{co:'trung',goc:'ngang',loai:'giới thiệu',hd:'Gojo đứt đôi: nửa trên ngả rơi NẰM NGANG xuống đất (mép cháy xém, không máu) → LỘ Catvader đứng NGAY SAU LƯNG, kiếm laze đỏ còn chìa ngang sau nhát chém; màu rút dần — khựng dài',anh:['PG','GOJO','VADER'],sfx:['cine_drop','catvader_breathe']},(F,t,u)=>{
    const P=PAL.night, lt=LS(t,T.split), vw={p:'PG',zm:2.0,cx:0.5,cy:0.66,blur:3,zm2:2.05}, M=plateView(F,vw,u), g=F.g;
    skyBand(F,t,P,M.hz,{cs:1.4}); plate(F,M,P); wisps(F,t,{n:6,x0:-60,x1:VW+60,y:M.hz+VH*0.05,r:90,a:0.4,tint:'80,66,84',seed:33});
    // Catvader đứng ngay SAU LƯNG Gojo (lùi sau 1 chút → nhỏ hơn): thân Gojo che kín, nửa trên rơi xuống mới lộ ra — ngược sáng, chỉ ánh kiếm đỏ hắt lên
    const rv=seg(lt,0.4,1.3), vx=VW*0.665, vy=VH*0.875, vh=VH*0.58;
    lighter(g,()=>glowDot(g,vx-VW*0.1,VH*0.78,VH*0.5,'255,40,30',0.22+0.25*rv));
    const vm=meme(F,'VADER',vx,vy,vh,{tone:'saber',fade:0.12,dark:0.62-0.42*rv,back:['255,40,30',0.25+0.25*rv],shadow:[vy,0.45],mist:['60,50,60',0.5]});
    const [hx,hy]=vm.pt(PT.vaderGlove[0],PT.vaderGlove[1]), an=Math.PI-0.1, L=VH*0.66; saber(g,hx,hy,hx+Math.cos(an)*L,hy+Math.sin(an)*L,VH*0.011,1);   // kiếm còn chìa ngang sau nhát chém (thân Gojo che phần giữa)
    gojoSplit(F,t,VW*0.66,VH*0.92,VH*0.74);
    wisps(F,t,{n:5,x0:VW*0.1,x1:VW*0.9,y:VH*0.96,r:120,a:0.5,tint:'70,60,74',seed:34,sp:6}); });
  // Gojo ĐỨT ĐÔI: cắt chính ẢNH GỐC theo đường ngang (v=CUTV của ảnh đã cắt sát)
  const CUTV=0.7;   // cắt ngang dưới cằm / ngực — không cắt qua mặt
  // o.still = vẽ tư thế CUỐI (2 nửa nằm trên đất) cho các cảnh sau — anh 23/11: "Gojo không cần làm mờ đen nữa, cứ để nằm đôi" · o.tone · o.blur
  function gojoSplit(F,t,x,gy,h,o){ o=o||{}; if(o.still) t=T.split+3; const b=bake(F,'GOJO',o.tone||'night',h*SCx(F)>520?2:1,0.2); if(!b) return; const g=F.g, ww=h*b.ar, u=seg(t,T.split,T.split+1.3), e=ein(Math.min(1,u*1.25)), cy=-h*(1-CUTV), lift=VH*0.06;
    const bot={rot:0.07*eout(seg(t,T.split+0.6,T.split+1.6)), dy:lerp(-lift,0,ein(seg(t,T.split+0.3,T.split+0.8)))};
    const top={rot:-e*1.5, dx:lerp(0,-ww*0.5,eout(u)), dy:lerp(-lift,-cy-ww*0.18,e)};
    if(!b.cg){ const w=b.cv.width, hh=b.cv.height, c=K.mk(w,hh), x=c.getContext('2d'); x.drawImage(b.cv,0,0); x.globalCompositeOperation='source-in'; const y=hh*CUTV, lg=x.createLinearGradient(0,y-hh*0.05,0,y+hh*0.05); lg.addColorStop(0,'rgba(255,80,30,0)'); lg.addColorStop(0.5,'rgba(255,170,110,1)'); lg.addColorStop(1,'rgba(255,80,30,0)'); x.fillStyle=lg; x.fillRect(0,0,w,hh); b.cg=c; }
    const glow=Math.max(0.2,1-seg(t,T.split,T.split+2.2));
    g.save(); g.globalAlpha=0.5; g.translate(x,gy); g.scale(1,0.14); const rg=g.createRadialGradient(0,0,0,0,0,ww); rg.addColorStop(0,'rgba(0,0,0,0.9)'); rg.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=rg; g.beginPath(); g.arc(0,0,ww,0,TAU); g.fill(); g.restore();
    const half=(isTop,q)=>{ g.save(); if(o.blur) g.filter='blur('+(o.blur*SCx(F)).toFixed(1)+'px)'; g.translate(x,gy); g.translate(isTop?q.dx:0,q.dy); g.translate(0,cy); g.rotate(q.rot); g.translate(0,-cy);
      g.beginPath(); if(isTop) g.rect(-ww,-h-20,ww*2,h+20+cy); else g.rect(-ww,cy,ww*2,h); g.clip(); g.drawImage(b.cv,-ww/2,-h,ww,h);
      g.globalCompositeOperation='lighter'; g.globalAlpha=0.9*glow; g.drawImage(b.cg,-ww/2,-h,ww,h); g.restore(); };
    half(false,bot); half(true,top); if(o.still) return;
    for(let i=0;i<8;i++){ const f=((t-T.split)*0.5+hash(i+70))%1; g.save(); g.globalAlpha=0.28*(1-f)*glow; g.translate(x+(hash(i+71)-0.5)*ww*0.6+top.dx*0.5,gy+cy-f*h*0.5); g.drawImage(puffT(i%5,'150,130,140'),-h*0.06,-h*0.06,h*0.12*(1+f),h*0.12*(1+f)); g.restore(); }
    dust(F,t,T.split+0.75,x+top.dx,gy,ww*0.9,{tint:'90,80,90',a:0.5,seed:7}); }
  S(T.reveal,T.sense,{co:'trung',goc:'giun',loai:'giới thiệu',hd:'CATVADER đứng sừng sững góc thấp, kiếm laze đỏ giơ chéo lên, ánh đỏ hắt lên người, khói còn vờn (Imperial March)',anh:['PL','VADER'],sfx:[]},(F,t,u)=>{
    const P=PAL.night, lt=LS(t,T.reveal), vw={p:'PL',zm:1.3,cx:0.5,cy:0.6,blur:2,zm2:1.35}, M=plateView(F,vw,u), g=F.g;
    skyUp(F,t,P,{cx:VW*0.55,cy:-VH*0.25,swirl:0.02}); plate(F,M,P,{dark:0.75});
    lighter(g,()=>glowDot(g,VW*0.4,VH*0.5,VH*0.7,'255,40,30',0.32));
    const br=Math.sin(lt*2.2)*0.5+0.5, m=meme(F,'VADER',VW*0.57,VH*1.12,VH*1.06*(1+0.006*br),{tone:'saber',fade:0.12,back:['255,40,30',0.45]});
    const [hx,hy]=m.pt(PT.vaderGlove[0],PT.vaderGlove[1]), L=VH*0.82, an=-1.86; saber(g,hx,hy,hx+Math.cos(an)*L,hy+Math.sin(an)*L,VH*0.014,1);
    lighter(g,()=>glowDot(g,hx+Math.cos(an)*L*0.4,hy+Math.sin(an)*L*0.4,VH*0.35,'255,50,40',0.28));
    wisps(F,t,{n:9,x0:-100,x1:VW+100,y:VH*0.75,dy:VH*0.5,r:150,a:0.35,tint:'64,52,60',seed:41,sp:22}); });
  // ── B2 · Catvader LINH CẢM → Buff Doge đấm vào TRƯỜNG LỰC → vỡ, Catvader văng về phía Pain (anh 23/11 tối) ──
  S(T.sense,T.doge,{co:'cận',goc:'ngang',loai:'đối mặt',hd:'Cận mũ Catvader: LINH CẢM — khựng, tim đập, cả khung tối sầm, vạch linh cảm loé quanh đầu; mép trái loé bóng đen viền đỏ (Haki đang lao tới)',anh:['PG','VADER'],sfx:[]},(F,t,u)=>{
    const P=PAL.night, vw={p:'PG',zm:2.5,cx:0.64,cy:0.62,blur:6}, M=plateView(F,vw,u), g=F.g, hit=seg(t,T.senseHit,T.senseHit+0.1), z=1+0.07*eout(seg(t,T.senseHit,T.senseHit+0.3)), cxz=VW*0.56, cyz=VH*0.32;
    g.save(); g.translate(cxz,cyz); g.scale(z,z); g.translate(-cxz,-cyz);
    skyBand(F,t,P,M.hz,{cs:1.6}); plate(F,M,P,{dark:0.8});
    lighter(g,()=>glowDot(g,VW*0.3,VH*0.95,VH*0.8,'255,40,30',0.3));
    const vm=meme(F,'VADER',VW*0.56,VH*1.78,VH*1.72,{tone:'saber',fade:0.05,back:['255,40,30',0.4]});
    g.restore();
    if(vm&&t>=T.senseHit){ const a=1-0.6*seg(t,T.senseHit+0.35,T.doge), hx=cxz+(vm.x-cxz)*z, top=cyz+((vm.y-vm.h)-cyz)*z, hw=vm.w*z;
      g.save(); const vg=g.createRadialGradient(hx,top+hw*0.35,hw*0.3,hx,top+hw*0.35,VW*0.75); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(0,0,0,'+(0.7*a)+')'); g.fillStyle=vg; g.fillRect(0,0,VW,VH); g.restore();   // khung tối sầm quanh đầu
      const ph=(t-T.senseHit)%0.55, pul=t<T.senseHit+1.1&&ph<0.32?1-ph/0.32*0.5:0;   // loé 2 nhịp theo tim đập
      if(pul>0){ g.save(); g.lineCap='round'; g.lineJoin='round';   // vạch LINH CẢM kiểu anime: tia gấp khúc DÀY viền mực loé quanh mũ (đặt theo khung ảnh đã cắt sát)
        for(let i=0;i<9;i++){ const an=-Math.PI*(0.08+0.84*i/8), r0=hw*0.44, L=hw*(0.22+0.1*hash(i+800))*(0.7+0.3*hit)*(0.85+0.15*pul), bx=hx+Math.cos(an)*r0, by=top+hw*0.32+Math.sin(an)*r0*0.8, nx=-Math.sin(an), ny=Math.cos(an);
          const path=()=>{ g.beginPath(); g.moveTo(bx,by); g.lineTo(bx+Math.cos(an)*L*0.5+nx*L*0.2,by+Math.sin(an)*L*0.5+ny*L*0.2); g.lineTo(bx+Math.cos(an)*L,by+Math.sin(an)*L); };
          path(); g.strokeStyle='rgba(10,4,8,'+(0.8*a*pul)+')'; g.lineWidth=11; g.stroke(); path(); g.strokeStyle='rgba(255,255,255,'+(a*pul)+')'; g.lineWidth=6; g.stroke(); }
        g.restore(); } }
    const hk=seg(t,T.doge-0.45,T.doge); if(hk>0){ g.save(); const lg=g.createLinearGradient(0,0,VW*0.35*hk,0); lg.addColorStop(0,'rgba(6,2,4,0.95)'); lg.addColorStop(0.8,'rgba(120,10,20,0.5)'); lg.addColorStop(1,'rgba(255,40,30,0)'); g.fillStyle=lg; g.fillRect(0,0,VW*0.35*hk,VH); g.restore(); } });   // Haki đen viền đỏ ập vào từ mép trái
  // Buff Doge lao tới: máy bám theo (nền nhoè + vạch tốc độ ngang), bóng mờ, bụi cày
  const dogeB=F=>bake(F,'DH','cold',2,0);
  function hStreaks(g,t,a,col,seed){ if(a<=0.01) return; g.save(); g.lineCap='round'; for(let i=0;i<34;i++){ const y=VH*hash(i*3.1+seed), sp=VW*(2.2+2*hash(i+seed)), L=VW*(0.12+0.3*hash(i*1.7+seed)), x=VW+L-((t*sp+hash(i*5.3+seed)*VW*2)%(VW*2+L*2));
      g.strokeStyle='rgba('+col+','+(a*(0.25+0.45*hash(i*2.2+seed)))+')'; g.lineWidth=1+2.5*hash(i*4.4+seed); g.beginPath(); g.moveTo(x,y); g.lineTo(x+L,y); g.stroke(); } g.restore(); }
  S(T.doge,T.field,{co:'trung',goc:'ngang',loai:'đánh',hd:'Buff Doge bật Haki LAO tới: máy bám theo, nền nhoè + vạch tốc độ ngang, bóng mờ phía sau, bụi cày dưới chân',anh:['PG','DH'],sfx:['se_machdash']},(F,t,u)=>{
    const P=PAL.cold, k=seg(t,T.doge,T.field), vw={p:'PG',zm:1.6,cx:lerp(0.2,0.5,k),cy:0.63,blur:7}, M=plateView(F,vw,u), g=F.g;
    skyBand(F,t,P,M.hz,{cs:1.4}); plate(F,M,P); hStreaks(g,t,0.8,'200,210,230',1);
    const dh=VH*0.92, x=lerp(VW*0.3,VW*0.56,eout(k)), y=VH*1.02, rot=0.1+0.03*Math.sin(t*30);
    for(let i=4;i>=1;i--) meme(F,'DH',x-i*VW*0.085,y,dh,{tone:'cold',rot,a:0.1*(5-i),cheap:true});   // bóng mờ phía sau
    meme(F,'DH',x,y,dh,{tone:'cold',rot,shadow:[y-VH*0.02,0.4]});
    dust(F,t,T.doge+0.05,x-dh*0.35,VH*1.0,dh*0.8,{tint:'96,104,118',a:0.6,seed:13,life:0.9}); dust(F,t,T.doge+0.45,x-dh*0.3,VH*1.0,dh*0.8,{tint:'96,104,118',a:0.5,seed:14,life:0.8});
    hStreaks(g,t,0.45,'235,240,250',7); });
  // TRƯỜNG LỰC Force (đỏ, hình vòm bầu dục che Catvader): quầng mép, vạch quét, gợn từ điểm chạm, VẾT NỨT lan, rồi vỡ thành mảnh
  function forceField(g,t,cx,cy,rx,ry,a,hx,hy,ck,seed){ if(a<=0.01) return;
    g.save(); g.beginPath(); g.ellipse(cx,cy,rx,ry,0,0,TAU); g.clip();
    lighter(g,()=>{ const gr=g.createRadialGradient(cx,cy,0,cx,cy,Math.max(rx,ry)); gr.addColorStop(0,'rgba(255,40,30,'+(0.05*a)+')'); gr.addColorStop(0.75,'rgba(255,50,40,'+(0.16*a)+')'); gr.addColorStop(1,'rgba(255,90,70,'+(0.55*a)+')'); g.fillStyle=gr; g.fillRect(cx-rx,cy-ry,2*rx,2*ry);
      for(let i=0;i<7;i++){ const y=cy-ry+((t*90+i*ry*0.3)%(2*ry)); g.fillStyle='rgba(255,120,100,'+(0.1*a)+')'; g.fillRect(cx-rx,y,2*rx,1.5); }   // vạch quét
      if(hx!=null) for(let j=0;j<3;j++){ const f=((t*2.4)+j/3)%1; g.strokeStyle='rgba(255,170,150,'+(0.5*a*(1-f))+')'; g.lineWidth=2.5; g.beginPath(); g.arc(hx,hy,ry*1.6*f,0,TAU); g.stroke(); } });   // gợn từ điểm chạm
    g.restore();
    lighter(g,()=>{ g.strokeStyle='rgba(255,110,90,'+(0.85*a)+')'; g.lineWidth=3; g.beginPath(); g.ellipse(cx,cy,rx,ry,0,0,TAU); g.stroke(); g.strokeStyle='rgba(255,230,220,'+(0.6*a)+')'; g.lineWidth=1.2; g.beginPath(); g.ellipse(cx,cy,rx*0.985,ry*0.99,0,0,TAU); g.stroke();
      if(ck>0&&hx!=null){ g.lineCap='round'; for(let i=0;i<11;i++){ const an=hash(i+seed)*TAU, Lm=Math.max(rx,ry)*(0.5+0.9*hash(i+seed+1)), L=Lm*eout(clamp(ck*1.3-hash(i+seed+2)*0.3,0,1)); if(L<2) continue;
        let x=hx, y=hy; g.beginPath(); g.moveTo(x,y); for(let s=1;s<=5;s++){ const aa=an+(hash(i*7+s+seed)-0.5)*0.7; x=hx+Math.cos(aa)*L*s/5; y=hy+Math.sin(aa)*L*s/5; g.lineTo(x,y); }
        g.strokeStyle='rgba(255,90,60,'+(0.5*a)+')'; g.lineWidth=5; g.stroke(); g.strokeStyle='rgba(255,245,235,'+a+')'; g.lineWidth=1.6; g.stroke(); } } }); }
  S(T.field,T.fly,{co:'trung',goc:'ngang',loai:'đánh',hd:'Catvader dựng TRƯỜNG LỰC đỏ → nắm đấm Haki của Doge nện vào: khựng, gợn, vết nứt lan → trường lực VỠ tung thành mảnh, cú đấm xuyên qua → Catvader bị đấm văng khỏi khung (về phía Pain)',anh:['PG','DH','VADER'],sfx:['ep3_force','cine_haki_hit','l2p_shatter','cine_deep_impact']},(F,t,u)=>{
    const P=PAL.cold, vw={p:'PG',zm:1.15,cx:0.56,cy:0.56}, M=plateView(F,vw,u), g=F.g, lt=LS(t,T.field), con=T.hit, gy=M.Y(0.85);   // máy lùi + hạ để thấy trọn mặt Buff Doge
    skyBand(F,t,P,M.hz); plate(F,M,P); wisps(F,t,{n:6,x0:-60,x1:VW+60,y:M.hz+VH*0.03,r:80,a:0.35,tint:'76,86,100',seed:61});
    // Catvader (bên phải) — bị ép lùi dần khi Doge dồn lực, rồi văng vọt ra mép phải
    const vh=M.hOf(0.85,1.25), push=t<T.blast?VW*0.035*eout(seg(t,con,T.blast)):0, bk=seg(t,T.blast,T.blast+0.28), vx=VW*0.7+push+bk*bk*VW*0.75, vy=gy-Math.sin(Math.min(1,bk)*Math.PI*0.5)*VH*0.12, vrot=0.9*bk;
    if(bk>0) for(let i=1;i<=3;i++){ const kb=Math.max(0,bk-i*0.08); meme(F,'VADER',VW*0.7+VW*0.035+kb*kb*VW*0.75,gy-Math.sin(kb*Math.PI*0.5)*VH*0.12,vh,{tone:'saber',fade:0.12,rot:0.9*kb,a:0.12*(4-i),cheap:true}); }
    const vm=meme(F,'VADER',vx,vy,vh,{tone:'saber',fade:0.12,rot:vrot,shadow:bk<0.3?[gy,0.5]:null,mist:bk<0.3?['70,76,90',0.6]:null});
    if(bk<1){ const [hx,hy]=vm.pt(PT.vaderGlove[0],PT.vaderGlove[1]); saber(g,hx,hy,hx+vh*0.28,hy-vh*0.75,Math.max(2,vh*0.012),1-bk); }
    lighter(g,()=>glowDot(g,vx-vh*0.1,gy-vh*0.6,vh*0.9,'255,50,40',0.2+0.25*(t<T.blast?1:1-bk)));
    // trường lực trước mặt Catvader
    const fcx=VW*0.7+push-vh*0.12, fcy=gy-vh*0.52, rx=vh*0.62, ry=vh*0.68, hx=fcx-rx*0.96, hy=fcy-ry*0.12;
    const fa=t<T.blast?eout(seg(t,T.field,T.field+0.12)):0; forceField(g,t,fcx,fcy,rx,ry,fa*(t>=con&&t<con+0.15?1.4:1),t>=con?hx:null,hy,seg(t,con,T.blast)*(t>=T.crack?1:0.45),900);
    if(t>=T.blast){ const sk=seg(t,T.blast,T.blast+0.9); lighter(g,()=>{ for(let i=0;i<30;i++){ const an=(hash(i+930)-0.5)*2.4, sp=VW*(0.25+0.5*hash(i+931)), x=hx+Math.cos(an)*sp*sk+rx*0.4*(hash(i+933)-0.3), y=hy+Math.sin(an)*sp*sk*0.6+sk*sk*VH*0.35+(hash(i+934)-0.5)*ry, s=(5+12*hash(i+932))*(1-0.5*sk);
        g.save(); g.translate(x,y); g.rotate(sk*6*(hash(i+935)-0.5)+i); g.globalAlpha=1-sk; g.fillStyle='rgba(255,80,60,0.55)'; g.strokeStyle='rgba(255,220,210,0.9)'; g.lineWidth=1; g.beginPath(); g.moveTo(-s,-s*0.4); g.lineTo(s*0.7,-s*0.6); g.lineTo(s*0.2,s*0.7); g.closePath(); g.fill(); g.stroke(); g.restore(); } }); }   // mảnh trường lực vỡ bay
    // Buff Doge (to ~2.4× Catvader — luật Buff Doge to gấp 3 meme thường) lao từ trái vào, nắm đấm chạm mép trường lực
    const b=dogeB(F); if(b){ const dh=Math.min(vh*2.4,gy+VH*0.02-VH*0.04), dw=dh*b.ar, xc=hx-dw*0.36, dy0=gy+VH*0.02, ink=seg(t,T.field,con), dx=t<con?lerp(-dw*0.6,xc,ein(ink)):t<T.blast?xc+Math.sin(t*50)*1.5:xc+VW*0.1*eout(seg(t,T.blast,T.blast+0.3)), rot=t<T.blast?0.1:0.1-0.06*seg(t,T.blast,T.blast+0.3);
      if(t<con+0.05) for(let i=3;i>=1;i--) meme(F,'DH',dx-i*VW*0.07,dy0,dh,{tone:'cold',rot,a:0.1*(4-i),cheap:true});
      meme(F,'DH',dx,dy0,dh,{tone:'cold',rot,shadow:[gy+VH*0.02,0.45]}); }
    if(t>=con&&t<con+0.2) lighter(g,()=>{ glowDot(g,hx,hy,VH*0.4,'255,200,180',0.8*(1-seg(t,con,con+0.2))); });
    if(t>=T.blast&&t<T.blast+0.25) lighter(g,()=>glowDot(g,hx,hy,VH*0.7,'255,230,220',0.9*(1-seg(t,T.blast,T.blast+0.25))));
    dust(F,t,T.blast+0.02,hx+VW*0.05,gy,VW*0.4,{tint:'96,104,118',a:0.6,seed:15,life:1.0,n:11}); });
  // Catvader văng lộn vòng qua bãi → rơi cày đất, trượt tới đứng cạnh Pain
  S(T.fly,T.painUp,{co:'toàn',goc:'ngang',loai:'chuyển cảnh',hd:'Toàn: Catvader bị đấm văng lộn vòng qua bãi đổ nát (vệt kiếm đỏ xoay), rơi cày đất, trượt tới cạnh Pain rồi đứng thẳng dậy',anh:['PG','VADER','PAIN'],sfx:['se_rock_break']},(F,t,u)=>{
    const P=PAL.cold, vw={p:'PG',zm:1.1,cx:0.58,cy:0.6}, M=plateView(F,vw,u), g=F.g;
    skyBand(F,t,P,M.hz); plate(F,M,P); wisps(F,t,{n:6,x0:-60,x1:VW+60,y:M.hz+VH*0.03,r:80,a:0.35,tint:'76,86,100',seed:62});
    const py=M.Y(0.84), ph=M.hOf(0.84,1.3); meme(F,'PAIN',M.X(0.86),py+Math.sin(t*1.8)*3,ph,{tone:'cold',fade:0.3,mist:['70,76,90',0.7]});
    const gv=0.855, h=M.hOf(gv,1.25), gy=M.Y(gv), k=seg(t,T.fly,T.land), sk=seg(t,T.land,T.land+0.4), up=seg(t,T.land+0.45,T.land+0.75);
    const pos=kk=>{ const e=eio(kk); return [M.X(lerp(0.12,0.66,e)), gy-Math.sin(kk*Math.PI)*VH*0.3-(1-kk)*VH*0.12]; };
    let x, y, rot, sy=1;
    if(t<T.land){ [x,y]=pos(k); rot=TAU*1.4*k; for(let i=1;i<=3;i++){ const kb=Math.max(0,k-i*0.05), [bx,by]=pos(kb); meme(F,'VADER',bx,by,h,{tone:'saber',fade:0.12,rot:TAU*1.4*kb,a:0.13*(4-i),cheap:true}); } }
    else { x=M.X(lerp(0.66,0.73,eout(sk))); y=gy; rot=lerp(0.5,0,eout(seg(t,T.land+0.2,T.land+0.75))); sy=1-0.14*(1-up)*(sk>0?1:0); }
    const vm=meme(F,'VADER',x,y,h,{tone:'saber',fade:0.12,rot,sy,shadow:[gy,t<T.land?0.25:0.5],mist:t>=T.land?['70,76,90',0.6]:null});
    const [hx,hy]=vm.pt(PT.vaderGlove[0],PT.vaderGlove[1]), an=-1.86+rot; saber(g,hx,hy,hx+Math.cos(an)*h*0.8,hy+Math.sin(an)*h*0.8,Math.max(2,h*0.012),1);
    if(t>=T.land){ dust(F,t,T.land,x,gy,h*1.2,{tint:'96,104,118',a:0.65,seed:16,life:1.2,n:11}); for(let i=0;i<8;i++){ const f=seg(t,T.land,T.land+0.7+0.3*hash(i+960)); if(f>=1) continue; rock(g,x+(hash(i+961)-0.3)*h*0.8+f*h*0.6*(hash(i+962)-0.2),gy-Math.sin(f*Math.PI)*h*(0.3+0.4*hash(i+963)),2+4*hash(i+964),f*8+i,'#2a2c36'); } }   // đá vụn bắn lên khi cày đất
    ash(F,t,0.3); });
  S(T.painUp,T.run,{co:'cận',goc:'ngang',loai:'đối mặt',hd:'Pain (mặt buồn đúng meme) — Catvader vừa đáp cạnh bên, Rinnegan SÁNG LẠI, vòng tím rực',anh:['PG','PAIN'],sfx:['ep3_shine']},(F,t,u)=>{
    const P=PAL.cold, lt=LS(t,T.painUp), vw={p:'PG',zm:2.4,cx:0.62,cy:0.62,blur:5}, M=plateView(F,vw,u), g=F.g, k=seg(t,T.painUp+0.3,T.painUp+0.6);
    skyBand(F,t,P,M.hz,{cs:1.6}); plate(F,M,P);
    lighter(g,()=>glowDot(g,VW*0.02,VH*0.7,VH*0.6,'255,40,30',0.22));   // ánh kiếm đỏ của Catvader vừa đáp ngay bên trái
    const m=meme(F,'PAIN',0,0,VH*1.75,{tone:'cold',anchor:[PT.painFace[0],PT.painFace[1],VW*0.44,VH*0.46-lt*5]});
    rinne(g,m,k*(0.8+0.2*Math.sin(t*12)),VH*0.026);
    if(k>0) lighter(g,()=>{ for(const [uu,vv] of PT.painEyes){ const [ex,ey]=m.pt(uu,vv); g.strokeStyle='rgba(200,150,255,'+(0.5*k)+')'; g.lineWidth=1.5; for(let r=1;r<4;r++){ g.beginPath(); g.arc(ex,ey,VH*0.012*r*(1+0.4*(1-k)),0,TAU); g.stroke(); } } }); });

  // ── C · Phe thiện ────────────────────────────────────────────────────────────
  const RUN=[['chillguy',0.30,0.95,1],['bananacat',0.42,0.9,0],['popcat',0.2,0.86,0],['huhcat',0.52,0.8,0],['clappingcat',0.1,0.79,0],['berserkcat',0.36,0.75,0],['breadcat',0.6,0.74,0],
    ['boxingcat',0.24,0.71,0],['duolingo',0.46,0.7,0],['nyancat',0.66,0.69,0],['maxwell',0.14,0.68,0],['kingcheems',0.55,0.675,0],['stalincat',0.33,0.665,0],['violinbee',0.06,0.66,0]];
  // các con còn lại chạy ở hàng XA (nhỏ dần theo độ sâu của nền, cùng tông lạnh) — đủ cả phe thiện
  GOOD.filter(k=>!RUN.some(r=>r[0]===k)).forEach((k,i)=>RUN.push([k,0.02+0.62*hash(i+320),0.618+0.042*hash(i+321),0]));
  const FLIP={chillguy:1};   // ảnh vốn quay mặt TRÁI → lật khi chạy sang phải
  S(T.run,T.banana,{co:'toàn',goc:'ngang',loai:'chuyển cảnh',hd:'Phe thiện hốt hoảng chạy tới từ trái qua bãi đổ nát, bụi tung sau chân (màu lạnh)',anh:['PG','M_chillguy','M_bananacat'],sfx:['se_step_in']},(F,t,u)=>{
    const P=PAL.cold, vw={p:'PG',zm:1.28,cx:0.42,cy:0.6}, M=plateView(F,vw,u), g=F.g;
    skyBand(F,t,P,M.hz); plate(F,M,P); wisps(F,t,{n:6,x0:-60,x1:VW+60,y:M.hz+VH*0.03,r:80,a:0.35,tint:'76,86,100',seed:51});
    gojoSplit(F,t,M.X(0.8),M.Y(0.76),M.hOf(0.76,1.15),{still:true,tone:'cold'});   // xác Gojo nằm đôi — phe thiện chạy tới
    const L=RUN.slice().sort((a,b)=>a[2]-b[2]);
    for(const [k,uu,v] of L){ const i=RUN.findIndex(r=>r[0]===k), t0=T.run-0.7+hash(i+300)*1.3+(v-0.66)*-0.6, kk=seg(t,t0,t0+1.5), e=eout(kk), x=M.X(uu-0.55*(1-e)), y=M.Y(v), h=M.hOf(v), hop=kk<1?Math.abs(Math.sin((t-t0)*11+i))*h*0.08*(1-e):0;
      if(t<t0) continue; meme(F,'M_'+k,x,y-hop,h,{tone:'cold',flip:!!FLIP[k],rot:kk<1?0.08*(1-e):0,shadow:[y,0.5],a:Math.min(1,kk*5)}); dust(F,t,t0+0.15,x-h*0.25,y,h*0.7,{tint:'96,104,118',a:0.45,seed:i+5,life:1.2}); }
    ash(F,t,0.35); });
  S(T.banana,T.mourn,{co:'cận',goc:'ngang',loai:'đối mặt',hd:'Cận Banana Cat khóc thét "NOOOO!"',anh:['PG','M_bananacat'],sfx:['cry_banana_cat']},(F,t,u)=>{
    const P=PAL.cold, vw={p:'PG',zm:2.5,cx:0.4,cy:0.64,blur:5}, M=plateView(F,vw,u), g=F.g, sh=(hash(Math.floor(t*24))-0.5)*5;
    skyBand(F,t,P,M.hz,{cs:1.6}); plate(F,M,P);
    meme(F,'M_bananacat',VW*0.5+sh,VH*1.14,VH*1.16,{tone:'cold',fade:0.1}); ash(F,t,0.4); });
  // phe thiện đứng quanh chỗ Gojo nằm (xác 2 nửa vẫn nằm đó — anh 23/11: không cần làm mờ đen), góc cao nhìn xuống: nhỏ bé, lạnh, tro rơi như tuyết
  //   47 con (anh 23/11 tối: "tổng tầm 40–50") xếp 3 VÒNG đồng tâm hở phía máy (vòng trong = meme quan trọng), vòng sau khuất 1 phần sau vòng trước như đám đông thật;
  //   Buff Doge (to gấp 3 — luật Buff Doge, ảnh gốc rageAvatarUrl) đứng giữa hàng sau cùng. Mọi con cùng tông lạnh + bóng chân, cỡ theo độ sâu của nền.
  //   hình MÓNG NGỰA hở về phía máy (trái → sau → phải) để không con nào che xác Gojo ở giữa
  const RING=(()=>{ const R=[], rings=[[0,13,0.2],[13,16,0.29],[29,GOOD.length-29,0.38]];
    for(const [i0,n,r0] of rings) for(let j=0;j<n;j++){ const i=i0+j, a=Math.PI*0.8+(j+0.5)/n*Math.PI*1.4+(hash(i+400)-0.5)*0.05, r=r0+0.02*(hash(i+401)-0.5); R.push({key:'M_'+GOOD[i],k:GOOD[i],u:0.42+Math.cos(a)*r*1.1,v:0.53+Math.sin(a)*r*0.72}); }
    R.push({key:'DB',k:'doge',u:0.79,v:0.74,s:3}); return R; })();   // Buff Doge to gấp 3 → đứng ở mũi PHẢI móng ngựa (gần máy) mới lọt khung, không che xác Gojo
  function goodRing(F,M,t,o){ o=o||{}; const L=RING.slice().sort((a,b)=>a.v-b.v);
    for(const m of L){ if(o.only&&!o.only.includes(m.k)) continue; const x=M.X(m.u), y=M.Y(m.v), h=M.hOf(m.v,m.s||((m.k==='gigachad'||m.k==='chonkydog')?1.2:1));
      meme(F,m.key,x,y,h,{tone:'cold',sy:0.92,shadow:[y,0.55],dark:o.dark||0}); } }
  S(T.mourn,T.aka,{co:'toàn',goc:'chim',loai:'thở',hd:'Góc CAO nhìn xuống: 47 meme phe thiện đứng thành 3 vòng quanh xác Gojo nằm đôi, nhỏ bé, màu lạnh, tro rơi như tuyết',anh:['PH','M_chillguy','M_gigachad','DB'],sfx:[]},(F,t,u)=>{
    const P=PAL.cold, vw={p:'PH',zm:1.1,cx:0.42,cy:0.5,zm2:1.16}, M=plateView(F,vw,u), g=F.g;
    g.fillStyle=P.sky[0]; g.fillRect(0,0,VW,VH); plate(F,M,P,{dark:0.4});
    gojoSplit(F,t,M.X(0.43),M.Y(0.55),M.hOf(0.55,1.15),{still:true,tone:'cold'}); goodRing(F,M,t); ash(F,t,0.75*seg(t,T.mourn,T.mourn+1)); });

  // ── D · Phe Evil + Friend ────────────────────────────────────────────────────
  const AKA=[['MLEM',0.36,0.7],['CHUD',0.62,0.75],['NINJA',0.44,0.75],['BAT',0.68,0.7]];
  AKA.forEach(([key,cx,hk],i)=>S(T.aka+i*0.5,T.aka+i*0.5+0.5,{co:'trung',goc:'giun',loai:'giới thiệu',hd:['Mlem','Chud','Ninja','Bat'][i]+' từ trên nhảy xuống đáp đất (bụi + than hồng)',anh:['PG',key],sfx:[['se_step_in','cine_drop','se_step_in','se_rock_break'][i]]},(F,t,u)=>{
    const P=PAL.red, t0=T.aka+i*0.5, vw={p:'PG',zm:2.1,cx:cx,cy:0.66,blur:2.5}, M=plateView(F,vw,u), g=F.g, k=seg(t,t0,t0+0.16), y0=VH*1.06, y=lerp(-VH*0.4,y0,ein(k)), sq=k>=1?1-0.1*Math.sin(seg(t,t0+0.16,t0+0.36)*Math.PI):1+0.12*(1-k);
    skyBand(F,t,P,M.hz,{cs:1.5,red:0.4}); plate(F,M,P);
    meme(F,key,VW*(i%2?0.56:0.46),y,VH*hk,{tone:'red',sy:sq,sx:2-sq,fade:0.06});
    dust(F,t,t0+0.16,VW*(i%2?0.56:0.46),y0-VH*0.04,VH*0.6,{tint:'120,70,64',a:0.6,seed:20+i,life:0.8}); motes(F,t,{n:24,col:'255,110,50',core:'255,220,160',sp:40,up:true,a:0.8,seed:30+i}); }));
  S(T.ninja,T.seal,{co:'cận',goc:'ngang',loai:'ra chiêu',hd:'Cận Ninja: Sharingan xoay loé → ngồi thụp → ĐẬP tay xuống đất, đất nứt sáng đỏ; chữ KUCHIYOSE NO JUTSU',anh:['PG','NINJA','SHAR'],sfx:['l2p_shimmer','kn_boom_low','se_super_hit']},(F,t,u)=>{
    const P=PAL.red, vw={p:'PG',zm:2.4,cx:0.5,cy:0.64,blur:4}, M=plateView(F,vw,u), g=F.g, cr=eout(seg(t,T.crouch,T.slam)), hit=seg(t,T.slam,T.slam+0.6);
    skyBand(F,t,P,M.hz,{cs:1.6,red:0.5}); plate(F,M,P);
    if(t>=T.slam) lighter(g,()=>{ for(let i=0;i<9;i++){ const an=Math.PI*(1.05+0.9*i/8)+(hash(i+500)-0.5)*0.2, L=VW*0.7*eout(hit); g.strokeStyle='rgba(255,90,40,'+(0.85*(1-0.5*hit))+')'; g.lineWidth=3; g.beginPath(); let x=VW*0.5, y=VH*1.0; g.moveTo(x,y); for(let s=1;s<=6;s++){ x=VW*0.5+Math.cos(an)*L*s/6+(hash(i*9+s)-0.5)*20; y=VH*1.0+Math.sin(an)*-L*s/6*0.25; g.lineTo(x,y); } g.stroke(); } glowDot(g,VW*0.5,VH*0.98,VH*0.5,'255,80,30',0.6*(1-0.5*hit)); });
    meme(F,'NINJA',VW*0.5,VH*1.1+cr*VH*0.05,VH*1.05,{tone:'red',sy:1-0.1*cr,sx:1+0.05*cr,fade:0.05});
    dust(F,t,T.slam,VW*0.5,VH*1.0,VH*0.9,{tint:'120,64,58',a:0.7,seed:40,life:1}); });
  S(T.seal,T.smoke,{co:'toàn',goc:'chim',loai:'ra chiêu',hd:'Từ trên cao: ấn triệu hồi chạy như vệt LỬA từ tay Ninja toả khắp nửa bãi phải, vòng ký tự hiện dần',anh:['PH','NINJA','PAIN','VADER'],sfx:['burn_loop']},(F,t,u)=>{
    const P=PAL.red, vw={p:'PH',zm:1.12,cx:0.5,cy:0.5,zm2:1.06}, M=plateView(F,vw,u), g=F.g, k=eout(seg(t,T.seal,T.smoke-0.2));
    g.fillStyle=P.sky[0]; g.fillRect(0,0,VW,VH); plate(F,M,P,{dark:0.3});
    const [ox,oy]=M.at(0.22,0.8);
    lighter(g,()=>{ for(let i=0;i<16;i++){ const a=-1.35+i/15*1.6+(hash(i+700)-0.5)*0.12, L=VW*(0.6+0.4*hash(i+701)); const pts=[]; for(let j=0;j<=14;j++){ const f=j/14; if(f>k*1.1) break; const aa=a+Math.sin(f*5+i)*0.07; pts.push([ox+Math.cos(aa)*L*f,oy+Math.sin(aa)*L*f*0.75]); }
        if(pts.length<2) continue; for(const [lw,al,c] of [[10,0.2,'255,60,20'],[4,0.7,'255,100,30'],[1.4,0.95,'255,225,160']]){ g.strokeStyle='rgba('+c+','+al+')'; g.lineWidth=lw; g.lineCap='round'; g.beginPath(); pts.forEach((p,j)=>j?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); } }
      const rk=seg(t,T.seal+0.6,T.smoke); if(rk>0){ const [cx,cy]=M.at(0.62,0.42), R=M.W*0.3; for(const rr of [0.55,0.85,1]){ g.strokeStyle='rgba(255,90,40,0.75)'; g.lineWidth=2.5; g.beginPath(); g.ellipse(cx,cy,R*rr,R*rr*0.72,0,-Math.PI/2,-Math.PI/2+TAU*eout(rk)); g.stroke(); }
        for(let i=0;i<24;i++){ if(i/24>eout(rk)) break; const a=-Math.PI/2+i/24*TAU, px=cx+Math.cos(a)*R*0.7, py=cy+Math.sin(a)*R*0.7*0.72; g.fillStyle='rgba(255,150,70,0.9)'; g.fillRect(px-7,py-1.5,14,3); g.fillRect(px-1.5,py-6,3,9*(0.5+hash(i))); } } });
    meme(F,'NINJA',ox,oy,M.hOf(0.8,0.9),{tone:'red',sy:0.82,shadow:[oy,0.5]}); meme(F,'PAIN',M.X(0.12),M.Y(0.7)-6,M.hOf(0.7,1.2),{tone:'red',fade:0.3,sy:0.9}); meme(F,'VADER',M.X(0.06),M.Y(0.82),M.hOf(0.82,1.2),{tone:'saber',fade:0.15,sy:0.9,shadow:[M.Y(0.82),0.5]});
    motes(F,t,{n:40,col:'255,110,50',core:'255,220,160',sp:30,up:true,a:0.8,seed:50}); });
  // binh đoàn quỷ: hàng từ trước ra sau, trồi lên theo từng cột khói
  const PILL=[]; for(let i=0;i<14;i++){ const row=Math.floor(i/4); PILL.push({u:0.42+((i%4)+0.5*(row%2))*0.15+(hash(i+300)-0.5)*0.05, v:0.86-row*0.075-hash(i+301)*0.02, t:T.smoke+0.15+row*0.35+hash(i+302)*0.15}); }
  const ARMY=[]; (function(){ let i=0; for(let row=0;row<30;row++){ const f=row/29, v=0.525+0.36*Math.pow(f,1.7), n=Math.round(64-50*f), u0=0.4+0.08*hash(row+990)-0.05*(1-f); for(let c=0;c<n;c++){ if(c<3&&hash(i*5+9)<0.5){ i++; continue; } const uu=u0+(1.02-u0)*(c+hash(i*5+1))/n, vv=v+(hash(i*5+2)-0.5)*0.01*(0.3+f); /* dày ở xa, thưa dần ra trước · mép trái so le (không thành tường) */ let tp=T.smoke+3.2; for(const p of PILL) if(Math.abs(p.u-uu)<0.12&&Math.abs(p.v-vv)<0.12) tp=Math.min(tp,p.t+0.25+0.3*hash(i*5+4)); const d=dmOf(hash(i*5+7)); ARMY.push({u:uu,v:vv,ta:tp,s:d.s*(0.88+0.24*hash(i*5+3)),d,ph:hash(i*5+5)*TAU}); i++; } } ARMY.sort((a,b)=>a.v-b.v); })();
  function army(F,M,t,o){ o=o||{}; for(const m of ARMY){ if(t<m.ta) continue; const k=o.all?1:eout(seg(t,m.ta,m.ta+0.5)), h=M.hOf(m.v,m.s); if(h<2.5) { if(k>0.5){ F.g.fillStyle=m.d.sp?'rgba(60,10,16,0.5)':'rgba(20,4,6,0.85)'; F.g.fillRect(M.X(m.u)-h*0.35,M.Y(m.v)-h,h*0.7,h); } continue; }
      const x=M.X(m.u), y=M.Y(m.v), cheap=h<26;
      if(m.d.sp){ const fl=h*0.07+Math.sin(t*1.6+m.ph)*h*0.035; meme(F,'DM_'+m.d.k,x,y-fl-(1-k)*h*0.3,h,{tone:'spirit',fade:0.32,a:0.66*Math.min(1,k*1.4),rot:Math.sin(t*1.1+m.ph)*0.03,back:cheap?null:['170,20,30',0.45],cheap,dark:o.dark?o.dark*0.5:0}); }   // LINH HỒN: bán trong suốt, lơ lửng, đáy tan
      else meme(F,'DM_'+m.d.k,x,y,h,{tone:'demon',sy:0.3+0.7*k,a:Math.min(1,k*1.6),rot:Math.sin(t*1.7+m.ph)*0.02,shadow:cheap?null:[y,0.45],cheap,dark:o.dark||0}); }   // THỰC THỂ: đặc, trồi lên từ đất
    // mắt đỏ lập loè của biển quỷ xa
    lighter(F.g,()=>{ for(let i=0;i<ARMY.length;i+=3){ const m=ARMY[i]; if(t<m.ta+0.4) continue; const h=M.hOf(m.v,m.s); if(h<7) continue; const fl=0.5+0.5*Math.sin(t*3+m.ph*3); glowDot(F.g,M.X(m.u),M.Y(m.v)-h*(m.d.k==='beast'?0.6:0.86),Math.max(2,h*0.08),'255,40,30',0.35*fl); } }); }
  S(T.smoke,T.shard,{co:'toàn',goc:'giun',loai:'ra chiêu',hd:'Góc thấp toàn: cột khói nổ lần lượt trước → sau, binh đoàn ác quỷ mắt đỏ + Evil Gary trồi lên, ĐÔNG kín tới chân trời',anh:['PV','DM_brute','DM_wraith','GARY'],sfx:['se_bomb','demon_roar1','gary_titan_roar']},(F,t,u)=>{
    const P=PAL.red, vw={p:'PV',zm:1.15,cx:0.56,cy:0.55,zm2:1.2}, M=plateView(F,vw,u), g=F.g;
    skyBand(F,t,P,M.hz,{red:0.6,redX:VW*0.65}); plate(F,M,P,{light:[[VW*0.7,M.hz,VW*0.6,'255,80,40',0.25]]});
    army(F,M,t);
    const gk=seg(t,T.smoke+0.9,T.smoke+1.7); if(gk>0){ const gy=M.Y(0.86); meme(F,'GARY',M.X(0.8),gy,M.hOf(0.86,1.4),{tone:'red',a:Math.min(1,gk*2),sy:0.4+0.6*eout(gk),shadow:[gy,0.5],mist:['90,30,26',0.6]}); }
    for(const [i,p] of PILL.entries()){ const lt=t-p.t; if(lt<0||lt>3) continue; const x=M.X(p.u), y=M.Y(p.v), h=M.hOf(p.v,1.8);
      for(let j=0;j<6;j++){ const f=clamp(lt/2.6,0,1), r=h*(0.16+0.2*eout(f))*(0.7+0.5*hash(i*9+j)), py=y-h*eout(Math.min(1,lt*1.4))*(0.2+0.8*j/5); g.save(); g.globalAlpha=0.7*(1-ein(f)); g.translate(x+(hash(i*9+j+1)-0.5)*h*0.3,py); g.drawImage(puffT(j%5,'40,12,14',0.88),-r,-r,2*r,2*r); g.restore(); }
      if(lt<0.25) lighter(g,()=>glowDot(g,x,y-h*0.1,h*0.5,'255,90,40',0.7*(1-lt/0.25))); }
    motes(F,t,{n:40,col:'255,110,50',core:'255,220,160',sp:34,up:true,a:0.7,seed:60}); });
  S(T.shard,T.sky,{co:'cận',goc:'ngang',loai:'đối mặt',hd:'Cận Pain giơ mảnh linh hồn Friend, mảnh loé tím → LẶNG',anh:['PG','PAIN'],sfx:['l2p_chime']},(F,t,u)=>{
    const P=PAL.red, lt=LS(t,T.shard), vw={p:'PG',zm:2.3,cx:0.55,cy:0.62,blur:5}, M=plateView(F,vw,u), g=F.g, q=seg(t,T.quiet,T.sky);
    skyBand(F,t,P,M.hz,{cs:1.6,red:0.3+0.5*q}); plate(F,M,P);
    const m=meme(F,'PAIN',0,0,VH*1.25,{tone:'red',anchor:[PT.painFace[0],PT.painFace[1],VW*0.36,VH*0.42]}); rinne(g,m,0.8,VH*0.018);
    const k=eout(seg(t,T.shard,T.shard+0.7)), x=VW*0.68, y=VH*0.42-k*VH*0.08, sz=VH*0.075;
    lighter(g,()=>{ glowDot(g,x,y,sz*4,'190,120,255',0.7*k*(0.75+0.25*Math.sin(t*9))); if(q>0) glowDot(g,x,y,VW*0.5*q,'150,80,255',0.22); });
    g.save(); g.translate(x,y); g.rotate(Math.sin(t*2)*0.2); g.globalAlpha=k; g.fillStyle='rgba(210,160,255,0.95)'; g.strokeStyle='#ffffff'; g.lineWidth=2; g.beginPath(); g.moveTo(0,-sz); g.lineTo(sz*0.45,-sz*0.1); g.lineTo(sz*0.2,sz*0.9); g.lineTo(-sz*0.35,sz*0.3); g.lineTo(-sz*0.4,-sz*0.4); g.closePath(); g.fill(); g.stroke(); g.restore();
    motes(F,t,{n:20,col:'200,130,255',sp:-14,a:0.6*k,seed:70}); });
  // Friend (ảnh GỐC, giữ nét điểm ảnh) — vẽ theo bề RỘNG thân (to tràn khung)
  function friend(F,x,yBottom,w,o){ o=o||{}; const b=bake(F,'FR','friend',2,0); if(!b) return null; const h=w/b.ar; return meme(F,'FR',x,yBottom,h,Object.assign({tone:'friend'},o)); }
  function frEyes(g,m,a){ if(!m||a<=0.01) return; lighter(g,()=>{ const r=m.h*0.05; [[PT.frEyes[0],'255,240,80'],[PT.frEyes[1],'255,120,200']].forEach(([[uu,vv],col])=>{ const [ex,ey]=m.pt(uu,vv); glowDot(g,ex,ey,r*3,col,0.7*a); glowDot(g,ex,ey,r,'255,255,255',0.6*a); }); }); }
  S(T.sky,T.dive,{co:'toàn',goc:'giun',loai:'chuyển cảnh',hd:'Ngước thẳng lên: trần mây dày ĐỎ RỰC từ bên trong, xoáy quanh 1 tâm, sét đỏ trong mây, đập theo nhịp tim',anh:['PL'],sfx:['l2p_rumble']},(F,t,u)=>{
    const P=PAL.red, vw={p:'PL',zm:1.1,cx:0.5,cy:0.6}, M=plateView(F,vw,u), k=seg(t,T.sky,T.dive), beat=Math.pow(Math.max(0,Math.sin(t*Math.PI*1.6)),6);
    skyUp(F,t,P,{cx:VW*0.5,cy:VH*0.3,swirl:0.05+0.1*k,glow2:0.25+0.6*k+0.25*beat,bolt:k}); plate(F,M,P,{dark:0.8}); ash(F,t,0.3); });
  S(T.dive,T.brake,{co:'toàn',goc:'giun',loai:'ra chiêu',hd:'Friend XÉ TOẠC trần mây: lỗ mây rách toang, vòng mây bị thổi bạt, vệt lửa ma sát; lao thẳng xuống, to dần',anh:['PL','FR'],sfx:['fr_dash','se_whoosh_fast']},(F,t,u)=>{
    const P=PAL.red, vw={p:'PL',zm:1.06,cx:0.5,cy:0.62}, M=plateView(F,vw,u), g=F.g, k=seg(t,T.dive,T.brake), hole=eout(seg(t,T.dive,T.dive+0.7)), cx=VW*0.5, cy=VH*0.3;
    skyUp(F,t,P,{cx,cy,swirl:0.15,glow2:0.9,bolt:0.6,hole,blow:0.35*eout(k)});
    const w=VW*lerp(0.06,1.05,ein(k)*0.85+k*0.15), m=friend(F,cx+Math.sin(t*9)*2*k,cy+w*0.5,w,{rot:Math.sin(t*3)*0.04});
    if(m){ lighter(g,()=>{ for(let i=0;i<26;i++){ const an=hash(i+950)*TAU, r0=m.w*0.42, L=VW*(0.2+0.5*hash(i+951))*(0.4+k); const sx=cx+Math.cos(an)*r0, sy=cy+Math.sin(an)*r0*0.8;
        const gr=g.createLinearGradient(sx,sy,sx+Math.cos(an)*L,sy+Math.sin(an)*L); gr.addColorStop(0,'rgba(255,200,120,0.75)'); gr.addColorStop(0.3,'rgba(255,100,40,0.45)'); gr.addColorStop(1,'rgba(120,20,20,0)'); g.strokeStyle=gr; g.lineWidth=(4+10*hash(i+952))*(0.4+k); g.beginPath(); g.moveTo(sx,sy); g.lineTo(sx+Math.cos(an)*L,sy+Math.sin(an)*L); g.stroke(); } });   // vệt lửa ma sát toả ra quanh thân
      frEyes(g,m,0.4+0.6*k); }
    plate(F,M,P,{dark:0.8});
    K.speedLines(F,{k:0.3+0.4*k,cx,cy,n:46}); });
  S(T.brake,T.hover,{co:'cận',goc:'giun',loai:'ra chiêu',hd:'KHÔNG NỔ: Friend PHANH gấp giữa trời ngay trên đầu (vượt xuống chút rồi bật lại), lửa tắt dần, gió ép xuống thổi bạt mây + bụi',anh:['PL','FR'],sfx:['l2p_rumble','l2p_whoosh']},(F,t,u)=>{
    const P=PAL.red, vw={p:'PL',zm:1.06,cx:0.5,cy:0.62}, M=plateView(F,vw,u), g=F.g, lt=LS(t,T.brake), cx=VW*0.5, cy=VH*0.3;
    skyUp(F,t,P,{cx,cy,swirl:0.1,glow2:0.7-0.3*seg(lt,0,1.5),hole:1,blow:0.35+0.3*eout(seg(lt,0,0.8))});
    const k=seg(lt,0,0.5), w=VW*(lt<0.12?lerp(1.05,1.32,eout(lt/0.12)):lerp(1.32,1.2,backOut(k)*0+eout(k))), bob=Math.sin(lt*2.2)*4;
    const fb=bake(F,'FR','friend',2,0), m=fb?meme(F,'FR',0,0,w/fb.ar,{tone:'friend',anchor:[PT.frMid[0],PT.frMid[1],cx,VH*0.36+bob],rot:0.02*Math.sin(lt*2)}):null;   // mặt (mắt + răng) luôn trong khung, thân tràn mép
    frEyes(g,m,0.8+0.2*Math.sin(t*6));
    windLines(g,t,cx,cy,false,0.9*(1-seg(lt,0.6,1.6)),40,90,'255,200,180');
    plate(F,M,P,{dark:0.85}); dust(F,t,T.brake+0.05,VW*0.5,VH*1.02,VW*0.9,{tint:'110,50,44',a:0.65,seed:77,life:1.4,n:12}); });
  // Friend CỠ THÀNH PHỐ (anh 23/11: "friend vẫn bé quá", "size của nó là size thành phố", "trong bối cảnh chung chỉ nhìn được 1 phần của nó")
  //   → mở ở chân trời: biển quỷ tí hon + chân Friend treo lơ lửng phía trên → máy NGƯỚC DỌC THÂN (tilt-up) tới khi lộ mặt cười. Không lúc nào thấy trọn con.
  S(T.hover,T.look,{co:'toàn',goc:'ngang',loai:'thở',hd:'Friend CỠ THÀNH PHỐ lơ lửng trên đầu phe Evil: mở ở chân trời (biển quỷ tí hon, chân Friend treo phía trên, gió ép thổi bạt bụi) → máy NGƯỚC dọc thân khổng lồ tới mặt cười',anh:['PV','FR','DM_brute','DM_wraith'],sfx:['fr_titan_roar']},(F,t,u)=>{
    const P=PAL.red, vw={p:'PV',zm:1.1,cx:0.55,cy:0.245}, M=plateView(F,vw,0), g=F.g, lt=LS(t,T.hover), b=bake(F,'FR','friend',2,0), fw=VW*1.25, fh=b?fw/b.ar:fw, legY=M.hz-VH*0.05;
    const TILT=Math.max(0,(fh*0.77-legY)+VH*0.24), tk=eio(seg(lt,0.55,1.95)), ty=TILT*tk, bob=Math.sin(lt*1.9)*VH*0.01;
    g.save(); g.translate(0,ty);
    skyBand(F,t,P,M.hz,{red:0.7,redX:VW*0.55,wind:2.2,cs:1.3,up:Math.ceil(TILT/(VH*0.5))+1});
    const m=friend(F,VW*0.5-fw*0.17,legY+bob,fw,{});   // lệch trái để lúc lộ mặt thì mặt ở giữa khung
    if(m){ lighter(g,()=>{ const lg=g.createLinearGradient(0,legY,0,legY-VH*0.5); lg.addColorStop(0,'rgba(255,90,40,0.4)'); lg.addColorStop(1,'rgba(255,90,40,0)'); g.fillStyle=lg; g.fillRect(0,legY-VH*0.5,VW,VH*0.5); });   // ánh lửa dưới đất hắt lên đáy thân
      frEyes(g,m,seg(lt,1.6,2.0)*(0.8+0.2*Math.sin(t*6))); wisps(F,t,{n:8,x0:-80,x1:VW+80,y:legY-VH*0.05,r:110,a:0.35,tint:'90,30,30',seed:83,sp:12,dy:60}); }   // khói ma sát còn bám quanh chân
    plate(F,M,P,{light:[[VW*0.55,M.hz,VW*0.5,'255,70,30',0.2]]});
    g.save(); g.globalCompositeOperation='multiply'; const sg=g.createRadialGradient(VW*0.55,M.hz+VH*0.1,0,VW*0.55,M.hz+VH*0.1,VW*0.6); sg.addColorStop(0,'rgba(40,20,30,0.75)'); sg.addColorStop(1,'rgba(255,255,255,0)'); g.fillStyle=sg; g.fillRect(0,M.hz-VH*0.02,VW,VH); g.restore();   // bóng Friend phủ bãi
    army(F,M,t,{all:true,dark:0.35});
    for(let i=0;i<3;i++){ const f=((lt*0.45)+i/3)%1; g.save(); g.globalAlpha=0.35*(1-f); g.strokeStyle='rgba(180,120,110,1)'; g.lineWidth=3; g.beginPath(); g.ellipse(VW*0.55,M.hz+VH*0.08,VW*(0.08+0.6*f),VH*(0.02+0.12*f),0,0,TAU); g.stroke(); g.restore(); }   // gió ép: vòng bụi toả trên mặt bãi
    wisps(F,t,{n:10,x0:-80,x1:VW+80,y:M.hz+VH*0.06,r:90,a:0.4,tint:'110,50,46',seed:81,sp:40});
    g.restore(); motes(F,t,{n:30,col:'255,110,50',core:'255,220,160',sp:26,up:true,a:0.6,seed:82}); });
  S(T.look,T.face,{co:'trung',goc:'chim',loai:'đối mặt',hd:'Góc cao: phe thiện nhỏ bé ngẩng nhìn, bóng khổng lồ trùm qua, gió thổi tro bạt ngang (màu lạnh)',anh:['PH','M_chillguy'],sfx:[]},(F,t,u)=>{
    const P=PAL.cold, vw={p:'PH',zm:2.0,cx:0.28,cy:0.6,zm2:2.06}, M=plateView(F,vw,u), g=F.g, k=seg(t,T.look,T.face);
    g.fillStyle=P.sky[0]; g.fillRect(0,0,VW,VH); plate(F,M,P,{dark:0.4}); gojoSplit(F,t,M.X(0.43),M.Y(0.55),M.hOf(0.55,1.15),{still:true,tone:'cold'}); goodRing(F,M,t);
    g.save(); g.globalCompositeOperation='multiply'; const sx=lerp(-VW*0.6,VW*0.3,eout(k)), lg=g.createLinearGradient(sx,0,sx+VW*0.7,0); lg.addColorStop(0,'rgba(30,20,30,1)'); lg.addColorStop(1,'rgba(255,255,255,1)'); g.fillStyle=lg; g.fillRect(0,0,VW,VH); g.restore();
    g.save(); g.strokeStyle='rgba(210,215,225,0.35)'; g.lineWidth=1.2; for(let i=0;i<40;i++){ const f=((t*1.4)+hash(i+1200))%1, y=hash(i+1201)*VH, x=lerp(-60,VW+60,f); g.beginPath(); g.moveTo(x,y); g.lineTo(x+40,y+6); g.stroke(); } g.restore(); });
  S(T.face,T.wide,{co:'cực cận',goc:'giun',loai:'đối mặt',hd:'Cực cận mặt Friend: 2 mắt vàng / hồng sáng rực, nhe răng',anh:['PL','FR'],sfx:[]},(F,t,u)=>{
    const P=PAL.red, g=F.g, lt=LS(t,T.face); skyUp(F,t,P,{cx:VW*0.5,cy:VH*0.2,glow2:0.5,swirl:0.06});
    const b=bake(F,'FR','friend',2,0); if(!b) return; const sh=(hash(Math.floor(t*30))-0.5)*3, m=meme(F,'FR',0,0,VH*3.1*(1+0.01*lt),{tone:'friend',anchor:[PT.frMid[0],PT.frMid[1],VW*0.5+sh,VH*0.42]});
    frEyes(g,m,0.7+0.3*Math.sin(t*7)); });
  S(T.wide,T.split2,{co:'toàn',goc:'ngang',loai:'thở',hd:'Toàn chênh lệch: trái 47 meme tụ quanh xác Gojo · phải biển quỷ đông tới chân trời · trên trời chân + bụng Friend khổng lồ tràn nửa trời (chỉ thấy 1 phần)',anh:['PV','FR','DM_brute','DM_wraith','M_chillguy'],sfx:[]},(F,t,u)=>{
    const P=PAL.red, vw={p:'PV',zm:1.0,cx:0.5,cy:0.266,zm2:1.03}, M=plateView(F,vw,u), g=F.g, lt=LS(t,T.wide);
    skyBand(F,t,P,M.hz,{red:0.6,redX:VW*0.7,wind:2,cs:1.2});
    friend(F,VW*0.74,M.hz-VH*0.05+Math.sin(lt*1.9)*VH*0.01,VW*1.25,{});   // cỡ thành phố: chỉ thấy chân + bụng tràn nửa trời, mặt ở ngoài khung
    plate(F,M,P); army(F,M,t,{all:true,dark:0.3}); gojoSplit(F,t,M.X(0.17),M.Y(0.6),M.hOf(0.6,1.9),{still:true,tone:'cold'});
    // cả 47 con phe thiện tụ thành khối bên trái (4 hàng so le, hàng sau nhỏ + nhạt dần) — vẫn lép vế trước biển quỷ
    const L=RING.map((m,i)=>{ const row=i%4, c=Math.floor(i/4); return {key:m.key,k:m.k,s:m.s,v:0.575+row*0.028+0.01*hash(i+600),u:0.02+(c+0.5*(row%2)+0.4*hash(i+601))*0.026}; }).sort((a,b)=>a.v-b.v);
    for(const m of L){ const y=M.Y(m.v); if(y>VH+10) continue; meme(F,m.key,M.X(m.u),y,M.hOf(m.v,1.7*(m.s||1)),{tone:'cold',shadow:[y,0.5]}); }
    ash(F,t,0.6,0,VW*0.42); });
  // 26 · CHIA ĐÔI: trái Chill Guy (gần như 1 mình, nộ kiểu Gon: bóng đen + 2 mắt trắng) sau xác Gojo nằm đôi (tiền cảnh mờ) · phải Pain + Catvader
  // (anh 23/11 tối: "aura Chill Guy cảnh cuối cần làm căng hơn") → hoá bóng đen → hào quang ĐEN–ĐỎ bốc ngùn ngụt (shader VfxGL, bám dáng người) dâng theo NHỊP TIM,
  //   đất dưới chân nứt rực đỏ, đá vụn bị nhấc bổng, gió hút vào người, máy dí dần + rung, 2 mắt trắng loé chói ngay trước BÙM
  const beatOf=t=>{ const p=(t*1.7)%1; return Math.max(Math.exp(-p*14),0.7*Math.exp(-Math.abs(p-0.2)*16)); };   // lub-dub
  //   3 lớp: (1) lưỡi lửa vẽ tay (code) bám vòm quanh thân, bốc lên + tắt dần — đỏ sáng xen đỏ thẫm · (2) lửa shader VfxGL nhiều lưỡi, cuộn nhanh · (3) sét đỏ chập chờn quanh người
  function rageAura(F,b,x,y,w,h,k,t,flip){ if(k<=0.01||!b) return; const g=F.g, cy=y-h*0.5, rx=w*0.52, ry=h*0.56;
    lighter(g,()=>{ for(let i=0;i<26;i++){ const s=i*1.37, ph=(t*(1.6+0.8*hash(s))+hash(s+1))%1, an=Math.PI*(1.06+0.88*hash(s+2)), bx=x+Math.cos(an)*rx*(0.92+0.1*hash(s+3)), by=cy+Math.sin(an)*ry, L=h*(0.16+0.3*hash(s+4))*k*(1-ph*0.5), wd=w*(0.05+0.05*hash(s+5))*(1-ph), lift=ph*h*0.35*k, sway=Math.sin(t*7+i)*w*0.04;
        const col=i%3===0?'120,0,14':'255,'+(40+50*hash(s+6)|0)+',24', a=k*(i%3===0?0.5:0.8)*Math.sin(ph*Math.PI); if(a<=0.01||wd<0.5) continue;
        g.fillStyle='rgba('+col+','+a+')'; g.beginPath(); g.moveTo(bx-wd,by-lift); g.quadraticCurveTo(bx+sway-wd*0.3,by-lift-L*0.55,bx+sway*1.6,by-lift-L); g.quadraticCurveTo(bx+sway*0.4+wd*0.4,by-lift-L*0.45,bx+wd,by-lift); g.closePath(); g.fill(); } });
    let ok=false; if(window.VfxGL&&VfxGL.drawAura) ok=VfxGL.drawAura(g,b.cv,{sx:0,sy:0,sw:b.cv.width,sh:b.cv.height,x,y,w,h,flip,res:340,c0:'#ffd2b8',c1:'#ff3418',c2:'#80000e',dark:0,speed:2.6,scale:5.6,warp:0.65,rise:0.24+0.22*k,gain:1,tongues:2.8,t,k:Math.min(1,1.1*k),seed:9});
    if(!ok){ const sil=silOf(b,'rgb(200,20,24)'); lighter(g,()=>{ for(let i=0;i<3;i++){ const sc=1.05+0.06*i+0.02*Math.sin(t*23+i); g.save(); g.globalAlpha=k*(0.45-0.12*i); g.translate(x,y); g.scale((flip?-1:1)*sc,sc+0.05*i); g.drawImage(sil,-w/2,-h,w,h); g.restore(); } }); }   // máy không có WebGL
    const fr=Math.floor(t*15); if(k>0.35&&window.VfxGL&&VfxGL.boltSet) lighter(g,()=>{ for(let j=0;j<2;j++){ if(hash(fr*3+j)>0.55+0.35*(1-k)) continue; const an=Math.PI*(1.1+0.8*hash(fr*7+j)), px=x+Math.cos(an)*rx*1.05, py=cy+Math.sin(an)*ry;
      VfxGL.boltSet(g,px,py,an+(hash(fr+j*5)-0.5)*1.2,h*(0.18+0.15*hash(fr*11+j)),Math.max(1.4,h*0.004),fr*13+j,{branches:true,core:'#fff0ea',rim:'#ff3020',glow:'rgba(255,40,30,0.35)'}); } }); }   // sét đỏ chập chờn
  S(T.split2,T.boom,{co:'trung',goc:'chéo',loai:'đối mặt',hd:'CHIA ĐÔI chéo: trái Chill Guy NỘ — hoá bóng đen 2 mắt trắng, hào quang đen–đỏ bốc ngùn ngụt dâng theo nhịp tim, đất nứt đỏ, đá vụn bị nhấc bổng, máy dí dần + rung (xác Gojo nằm đôi ở tiền cảnh) / phải Pain + Catvader ngẩng lên',anh:['PG','M_chillguy','PAIN','VADER'],sfx:['l2p_whoosh','l2p_riser','se_aura']},(F,t,u)=>{
    const g=F.g, lt=LS(t,T.split2), rg=ein(seg(t,T.rage,T.boom-0.2)), bt=beatOf(t)*seg(t,T.rage,T.rage+0.4), K2=Math.min(1,rg*0.8+0.25*bt+(t>=T.rage?0.2:0));
    g.save(); g.beginPath(); g.moveTo(0,0); g.lineTo(VW*0.56,0); g.lineTo(VW*0.44,VH); g.lineTo(0,VH); g.closePath(); g.clip();
    { const jx=(hash(Math.floor(t*30))-0.5)*(1.5+6*rg), jy=(hash(Math.floor(t*30)+5)-0.5)*(1+4*rg); g.translate(jx,jy);   // khung trái rung mạnh dần
      const zm=lerp(2.1,2.5,ein(u)), cx=VW*0.27, gy=VH*1.04, P=PAL.cold, M=plateView(F,{p:'PG',zm,cx:0.3,cy:0.64,blur:4},u), hh=VH*0.98*zm/2.1;
      skyBand(F,t,P,M.hz,{cs:1.5}); plate(F,M,P,{light:[[cx,VH*0.9,VW*0.5,'255,30,20',0.45*K2]]});
      // đất nứt rực đỏ toả từ chân
      if(rg>0) lighter(g,()=>{ for(let i=0;i<11;i++){ const an=Math.PI*(1.0+i/10)+(hash(i+1500)-0.5)*0.25, L=VW*0.55*eout(rg); let x=cx, y=VH*0.99; g.beginPath(); g.moveTo(x,y); for(let s=1;s<=6;s++){ x=cx+Math.cos(an)*L*s/6+(hash(i*9+s+1500)-0.5)*18; y=VH*0.99-Math.sin(an)*L*s/6*0.22; g.lineTo(x,y); }
          g.strokeStyle='rgba(255,40,20,'+(0.35*K2)+')'; g.lineWidth=7; g.stroke(); g.strokeStyle='rgba(255,170,120,'+(0.9*K2)+')'; g.lineWidth=2; g.stroke(); } glowDot(g,cx,VH*0.99,VW*0.35,'255,40,20',0.5*K2); });
      // đá vụn bị NHẤC BỔNG quanh người (lên chậm, rung)
      for(let i=0;i<14;i++){ const f=clamp((rg*1.3-hash(i+1520)*0.5),0,1); if(f<=0) continue; const x=cx+(hash(i+1521)-0.5)*VW*0.5+Math.sin(t*20+i)*1.5*f, y=VH*(0.97-0.05*hash(i+1522))-eout(f)*VH*(0.15+0.45*hash(i+1523)), R=7+13*hash(i+1524);
        lighter(g,()=>glowDot(g,x,y+R*0.5,R*2.2,'255,40,20',0.35*f)); rock(g,x,y,R,t*(0.5+hash(i+1525))+i,'#241618'); }   // đá to rõ, ánh đỏ hắt từ dưới
      windLines(g,t,cx,VH*0.55,true,0.55*rg,28,70,'255,170,160');
      const b=bake(F,'M_chillguy','cold',2,0.04), r=seg(t,T.split2+0.2,T.rage);
      if(b) rageAura(F,b,cx,gy,hh*b.ar,hh,K2,t,true);
      const m=meme(F,'M_chillguy',cx,gy,hh,{tone:'cold',fade:0.04,flip:true,dark:0.9*r,back:['200,20,30',(0.5+0.4*bt)*r]});   // quay mặt sang PHẢI (về phía Pain / Catvader)
      if(m&&r>0){ const fl=seg(t,T.boom-0.4,T.boom-0.15), big=1+0.6*bt*rg+2.2*fl; lighter(g,()=>{ for(const [uu,vv] of PT.chillEyes){ const [ex,ey]=m.pt(uu,vv); glowDot(g,ex,ey,VH*0.06*big,'255,255,255',0.55*r); glowDot(g,ex,ey,VH*0.12*big,'255,60,40',0.3*rg); g.fillStyle='rgba(255,255,255,'+r+')'; g.beginPath(); g.arc(ex,ey,VH*0.014*(1+0.3*fl),0,TAU); g.fill();
          if(fl>0){ g.strokeStyle='rgba(255,255,255,'+(0.9*fl)+')'; g.lineWidth=2; const L=VH*0.22*fl; g.beginPath(); g.moveTo(ex-L,ey); g.lineTo(ex+L,ey); g.moveTo(ex,ey-L*0.5); g.lineTo(ex,ey+L*0.5); g.stroke(); } } }); }   // mắt loé chói kiểu sao 4 cánh ngay trước BÙM
      gojoSplit(F,t,VW*0.36,VH*1.05,VH*0.62,{still:true,tone:'cold',blur:2.5}); ash(F,t,0.6*(1-rg),0,VW*0.56);
      motes(F,t,{n:40,col:'255,60,40',core:'255,200,180',sp:40+60*rg,up:true,a:0.9*rg,seed:91}); }   // tro bị hút bốc ngược lên
    g.restore();
    g.save(); g.beginPath(); g.moveTo(VW*0.56,0); g.lineTo(VW,0); g.lineTo(VW,VH); g.lineTo(VW*0.44,VH); g.closePath(); g.clip();
    { const P=PAL.red, M=plateView(F,{p:'PG',zm:2.0,cx:0.66,cy:0.64,blur:4},u); skyBand(F,t,P,M.hz,{cs:1.5,red:0.6}); plate(F,M,P);
      const vm=meme(F,'VADER',VW*0.86,VH*1.08,VH*0.98,{tone:'saber',fade:0.1}); const [hx,hy]=vm.pt(PT.vaderGlove[0],PT.vaderGlove[1]); saber(g,hx,hy,hx-VH*0.2,hy-VH*0.75,VH*0.012,1);
      const pm=meme(F,'PAIN',0,0,VH*1.1,{tone:'red',anchor:[PT.painFace[0],PT.painFace[1],VW*0.66,VH*0.42-lt*4]}); rinne(g,pm,0.9,VH*0.017);
      motes(F,t,{n:24,col:'255,110,50',core:'255,220,160',sp:30,up:true,a:0.7,seed:90}); }
    g.restore();
    g.save(); g.strokeStyle='#ffffff'; g.lineWidth=5; g.beginPath(); g.moveTo(VW*0.56,0); g.lineTo(VW*0.44,VH); g.stroke(); g.restore(); });
  S(T.boom,T.DUR,{co:'toàn',goc:'ngang',loai:'chuyển cảnh',hd:'BÙM trắng xoá → TO BE CONTINUED… → FINAL · PART 2 — CHRISTMAS 2026',anh:[],sfx:['l2p_explode']},(F,t,u)=>{ F.g.fillStyle='#000'; F.g.fillRect(0,0,VW,VH); });
  const shotAt=t=>{ let s=SH[0]; for(const x of SH) if(t>=x.t0) s=x; return s; };

  // ═════════ MÀN HÌNH (sau grade) ═════════
  const STROBES=[[T.stab,'k r k',0.5,0.5],[T.hit,'k k',0.54,0.66],[T.blast,'w bw wb',0.54,0.66],[T.slam,'bw wb bw',0.5,0.78]];
  const strobeAt=t=>B?B.strobe(t,STROBES):null;
  const title=(g,txt,y,a,col,size)=>{ if(a<=0.01) return; g.save(); g.globalAlpha=a; g.textAlign='center'; g.shadowColor='rgba(0,0,0,0.85)'; g.shadowBlur=12; g.fillStyle=col||'#ffe2d0'; g.font='900 '+Math.round(VH*(size||0.075))+'px Shojumaru, Georgia, serif'; g.fillText(txt,VW/2,VH*y); g.restore(); };
  let SL=null;   // nhát chém "cắt cả khung"
  function sliceFrame(F,t){ if(t<T.cut||t>=T.cut+0.5) return; const g=F.g, cv=g.canvas, SC=SCx(F), u=seg(t,T.cut,T.cut+0.5), yL=VH*0.52;
    if(!SL) SL=document.createElement('canvas'); if(SL.width!==cv.width||SL.height!==cv.height){ SL.width=cv.width; SL.height=cv.height; } const x=SL.getContext('2d'); x.setTransform(1,0,0,1,0,0); x.clearRect(0,0,SL.width,SL.height); x.drawImage(cv,0,0);
    const off=eout(Math.min(1,u*3))*VW*0.014*(1-seg(u,0.6,1));
    g.save(); g.setTransform(1,0,0,1,0,0); g.beginPath(); g.rect(0,0,cv.width,yL*SC); g.clip(); g.fillStyle='#000'; g.fillRect(0,0,cv.width,yL*SC); g.drawImage(SL,off*SC,-off*0.25*SC); g.restore();
    lighter(g,()=>{ const a=1-u; g.fillStyle='rgba(255,60,40,'+(0.35*a)+')'; g.fillRect(0,yL-VH*0.03,VW,VH*0.06); g.fillStyle='rgba(255,240,230,'+a+')'; g.fillRect(0,yL-1.5,VW,3); }); }
  function smearSlash(F,t){ if(t<T.slash+0.03||t>=T.cut+0.1) return; const g=F.g, uu=seg(t,T.slash+0.03,T.cut+0.02), yL=VH*0.52, xh=lerp(-VW*0.2,VW*1.2,eout(uu));
    lighter(g,()=>{ const lg=g.createLinearGradient(xh-VW*0.6,0,xh,0); lg.addColorStop(0,'rgba(255,40,30,0)'); lg.addColorStop(1,'rgba(255,90,60,0.9)'); g.fillStyle=lg; g.beginPath(); g.moveTo(xh-VW*0.6,yL-2); g.quadraticCurveTo(xh-VW*0.2,yL-VH*0.05,xh,yL); g.quadraticCurveTo(xh-VW*0.2,yL+VH*0.03,xh-VW*0.6,yL+2); g.closePath(); g.fill();
      g.fillStyle='rgba(255,245,240,0.95)'; g.fillRect(xh-VW*0.35,yL-1.5,VW*0.35,3); }); }
  // 🎞️ satsuei: khuếch tán sáng (diffusion — vùng sáng toả mềm) + hạt phim + vignette
  let DF=null, GR=null;
  function finish(F,t,k){ const g=F.g, cv=g.canvas; if(!DF){ DF=document.createElement('canvas'); DF.width=240; DF.height=135; }
    const d=DF.getContext('2d'); d.globalCompositeOperation='source-over'; d.filter='none'; d.drawImage(cv,0,0,240,135); d.globalCompositeOperation='multiply'; d.drawImage(DF,0,0); d.globalCompositeOperation='source-over';   // bình phương độ sáng → chỉ vùng SÁNG toả
    g.save(); g.setTransform(1,0,0,1,0,0); g.globalCompositeOperation='screen'; g.globalAlpha=0.32*(k==null?1:k); g.filter='blur('+Math.round(cv.width/160)+'px)'; g.drawImage(DF,0,0,cv.width,cv.height); g.restore();
    if(!GR){ GR=document.createElement('canvas'); GR.width=GR.height=256; const x=GR.getContext('2d'), id=x.createImageData(256,256); for(let i=0;i<id.data.length;i+=4){ const v=hash(i*0.37+1.3)*255|0; id.data[i]=id.data[i+1]=id.data[i+2]=v; id.data[i+3]=255; } x.putImageData(id,0,0); }
    const fr=Math.floor(t*24); g.save(); g.setTransform(1,0,0,1,0,0); g.globalCompositeOperation='overlay'; g.globalAlpha=0.07; const p=g.createPattern(GR,'repeat'); g.translate(-(hash(fr)*256|0),-(hash(fr+7)*256|0)); g.fillStyle=p; g.fillRect(0,0,cv.width+256,cv.height+256); g.restore();
    K.vignette(F,0.55); }

  const def={ id:'fin1c7', title:'Final 1 · Kết · Đánh lén', DUR:T.DUR, VW, VH, fadeIn:false, fadeOut:false, imgs:IMG,
    shots:SH.map((s,i)=>({t0:s.t0,t1:s.t1,a:{tx:i*1000,ty:0,tz:0,dist:600,yaw:0,pitch:0,fov:50},ease:'lin'})),   // máy 3D KHÔNG dùng (phim dựng lớp 2D) — chỉ để đánh dấu chỗ cắt cho công cụ soát
    world(F,t){ F.t=t; const s=shotAt(t); s.draw(F,t,seg(t,s.t0,s.t1)); },
    cast:['fr','mlem','ninja','gary','catvader','dp','mw','doge','bananacat','cry','lightsaber'],
    sfxOk:{demon_roar1:'tiếng gầm quỷ của phim — đúng binh đoàn ác quỷ', burn_loop:'tiếng lửa cháy chung — vệt lửa của ấn triệu hồi'},
    sfx:[[T.a3,'ep3_charge',0.6,T.a4-T.a3,'Gojo tụ 3 cầu tím trên đầu, gió và đá bị hút lên'],[T.a4,'se_charge',0.5,T.hush-T.a4,'+ 3 cầu tím lớn dần, ngân dâng (lớp của tụ cầu)'],
      [T.ignite,'lightsaber_on',0.9,0.5,'tiếng bật kiếm laze ngay sau lưng Gojo'],[T.stab,'se_super_hit',0.8,0.5,'lưỡi laze đỏ đâm xuyên ngực Gojo'],[T.stab+0.02,'se_impact_stop',0.6,0.4,'+ khựng đúng khung xuyên (lớp của cú đâm)'],
      [T.fizz,'l2p_shimmer',0.5,0.6,'3 cầu tím chập chờn rồi xì tắt'],
      [T.slash,'lightsaber_whoosh_01',0.9,0.45,'Catvader rút kiếm, xoay người chém ngang'],[T.cut,'ed_hit7',0.8,0.45,'+ nhát chém cắt ngang cả khung (lớp của nhát chém)'],
      [T.split+0.8,'cine_drop',0.5,0.6,'nửa trên của Gojo ngả rơi xuống chạm đất'],
      [T.split+1.4,'catvader_breathe',0.8,2.0,'nửa trên Gojo rơi xuống: lộ Catvader đứng ngay sau lưng, thở máy'],
      [T.doge,'se_machdash',0.7,0.6,'Buff Doge bật Haki lao vút tới'],
      [T.field,'ep3_force',0.7,0.5,'Catvader dựng trường lực Force đỏ trước mặt'],[T.hit,'cine_haki_hit',0.9,0.45,'nắm đấm Haki của Doge nện vào trường lực'],
      [T.blast,'l2p_shatter',0.8,0.7,'trường lực VỠ tung thành mảnh'],[T.blast+0.02,'cine_deep_impact',0.8,0.6,'+ cú đấm xuyên qua, Catvader bị đấm văng (lớp của cú vỡ)'],
      [T.land,'se_rock_break',0.6,0.6,'Catvader rơi cày đất, trượt tới cạnh Pain'],
      [T.painUp+0.3,'ep3_shine',0.5,0.6,'Pain: Rinnegan loé sáng lại'],
      [T.run+0.2,'se_step_in',0.6,0.8,'phe thiện hốt hoảng chạy tới'],
      [T.banana,'cry_banana_cat',0.9,1.3,'Banana Cat khóc thét'],
      [T.aka+0.16,'se_step_in',0.5,0.3,'Mlem đáp xuống'],[T.aka+0.66,'cine_drop',0.5,0.4,'+ Chud rơi đáp xuống (lớp của nhóm Akatsuki đáp)'],[T.aka+1.16,'se_step_in',0.45,0.3,'+ Ninja đáp xuống (lớp của nhóm Akatsuki đáp)'],[T.aka+1.66,'se_rock_break',0.4,0.4,'+ Bat đáp xuống đống gạch vụn (lớp của nhóm Akatsuki đáp)'],
      [T.shar,'l2p_shimmer',0.6,0.4,'Sharingan xoay'],
      [T.slam,'kn_boom_low',0.9,1.0,'Ninja ĐẬP tay xuống đất, đất nổ rền'],[T.slam+0.02,'se_super_hit',0.6,0.5,'+ lớp đập chát (Ninja đập tay)'],
      [T.seal,'burn_loop',0.6,1.8,'ấn triệu hồi chạy như vệt lửa cháy khắp nửa bãi'],
      [T.smoke+0.15,'se_bomb',0.6,0.6,'cột khói nổ bùng lần lượt'],[T.smoke+0.8,'demon_roar1',0.8,1.4,'binh đoàn ác quỷ trồi lên gầm vang'],[T.smoke+1.0,'gary_titan_roar',0.7,1.4,'+ Evil Gary gầm (lớp của triệu hồi)'],
      [T.shard,'l2p_chime',0.6,1.0,'Pain giơ mảnh linh hồn Friend, loé tím'],
      [T.sky,'l2p_rumble',0.8,1.8,'trần mây đỏ rực từ bên trong, rền theo nhịp tim'],
      [T.dive,'fr_dash',0.9,1.6,'Friend lao đầu xé toạc tầng mây'],[T.dive+0.3,'se_whoosh_fast',0.6,1.2,'+ xé gió (lớp của Friend lao)'],
      [T.brake,'l2p_whoosh',0.9,1.0,'Friend PHANH gấp giữa trời: gió ép bạt xuống (không nổ)'],[T.brake+0.05,'l2p_rumble',0.7,1.5,'+ gió ép trầm rền (lớp của cú phanh)'],
      [T.hover+0.3,'fr_titan_roar',0.9,1.6,'Friend lơ lửng trên đầu phe Evil, gầm'],
      [T.split2,'l2p_whoosh',0.6,0.6,'màn hình chia đôi: Chill Guy / Pain + Catvader'],
      [T.rage+0.4,'l2p_riser',0.6,T.boom-T.rage-0.4,'Chill Guy nộ: hào quang đen–đỏ dâng lên, đất nứt, đá bị nhấc bổng'],[T.rage+0.05,'se_aura',0.5,T.boom-T.rage-0.05,'+ hào quang bốc cháy ngùn ngụt (lớp của nộ)'],
      [T.boom,'l2p_explode',1,2.0,'BÙM — nổ trắng xoá']],
    // 🎵 nối nhạc trận Gojo (mus_honored) → TẮT CỤT lúc lặng trước cú đâm · Imperial March (Catvader lộ diện, 1 lần) · Sadness and Sorrow (Banana khóc → đứng quanh bóng Gojo) · Despair (phe Evil → hết)
    mus:[{src:'assets/audio/mus_honored.m4a',ra:0,rb:T.hush,off:96,vol:0.28,fi:0.6,fo:0.08},
      {src:'assets/audio/mus_imperial.m4a',ra:T.split+1.2,rb:T.split+1.2+8.3,off:0.05,vol:0.42,fi:0.05,fo:0.9},   // vào đúng lúc lộ Catvader, chạy hết bài (8.5s) qua cả pha Doge
      {src:'assets/audio/mus_sadness.m4a',ra:T.painUp+0.2,rb:T.aka+0.8,off:0.2,vol:0.4,fi:0.6,fo:0.8},
      {src:'assets/audio/mus_despair.m4a',ra:T.aka+0.8,rb:T.boom-0.05,off:0,vol:0.45,fi:0.5,fo:0.2},
      {src:'assets/audio/cine_heart.mp3',ra:T.senseHit-0.05,rb:T.doge+0.1,off:0,vol:0.6,fi:0.05,fo:0.15},   // tim đập lúc Catvader linh cảm (như linh cảm Chill Guy fin1c6)
      {src:'assets/audio/cine_heart.mp3',ra:T.rage,rb:T.boom,off:0,vol:0.95,fi:0.05,fo:0.02}],              // TIM ĐẬP TO lúc Chill Guy nộ, tắt phụt khi BÙM
    duckAuto:{decisive:[T.stab]},
    impact:t=>{ const s=strobeAt(t); return s?B.impactOf(s,true):0; },
    grade:t=>{ const s=strobeAt(t); if(s) return B.gradeOf(s)||{}; if(t>=T.boom&&t<T.boom+0.4) return {white:1-seg(t,T.boom+0.2,T.boom+0.4)};
      if(t>=T.split&&t<T.reveal) return {sat:lerp(1,0.55,seg(t,T.split,T.split+1.2))};   // đứt đôi: màu rút dần (khựng, bi thương)
      if(t>=T.senseHit&&t<T.doge) return {sat:0.45};   // linh cảm: màu rút
      if(t>=T.mourn&&t<T.aka) return {sat:0.7,bright:0.95};
      if(t>=T.look&&t<T.face) return {sat:0.75};
      return null; },
    shake:t=>{ let s=0; const h=(a,amp,d)=>{ if(t>=a&&t<a+d) s=Math.max(s,amp*(1-(t-a)/d)); };
      if(t>=T.a3&&t<T.hush) s=Math.max(s,0.6+1.4*seg(t,T.a3,T.hush)); h(T.stab,5,0.3); h(T.cut,7,0.4); h(T.senseHit,2,0.3); h(T.hit,6,0.35); h(T.blast,9,0.5); h(T.land,5,0.35); for(let i=0;i<4;i++) h(T.aka+i*0.5+0.16,3,0.25); h(T.slam,9,0.5); h(T.smoke+0.2,3,1.6);
      if(t>=T.sky&&t<T.brake) s=Math.max(s,1.5+4*seg(t,T.sky,T.brake)); h(T.brake,10,0.9); h(T.hover+0.3,3,1.2); h(T.face,4,1.0); if(t>=T.rage&&t<T.boom) s=Math.max(s,0.8+3.2*seg(t,T.rage,T.boom)); h(T.boom,18,0.4); return s; },
    post(F,t){ const fx={shocks:[]}, sh=(a,x,y,rm,d,str)=>{ if(t>=a&&t<a+d){ const u=(t-a)/d; fx.shocks.push({sx:x,sy:y,r:20+rm*eout(u),w:60,str:str*(1-u)}); fx.chroma=Math.max(fx.chroma||0,0.3*(1-u)); } };
      sh(T.stab,VW*0.3,VH*0.75,500,0.4,12); sh(T.hit,VW*0.54,VH*0.66,420,0.35,10); sh(T.blast,VW*0.54,VH*0.66,800,0.5,16); sh(T.slam,VW*0.5,VH*0.98,900,0.5,16); sh(T.brake,VW*0.5,VH*0.35,1000,0.7,18); return fx; },
    screen(F,t){ const g=F.g, s=strobeAt(t);
      if(s){ B.impactOverlay(F,s); return; }
      if(t>=T.slash&&t<T.split){ smearSlash(F,t); sliceFrame(F,t); }
      if(t>=T.boom+0.35){ g.fillStyle='#000'; g.fillRect(0,0,VW,VH); const a1=seg(t,T.tbc,T.tbc+0.6), a2=seg(t,T.xmas,T.xmas+0.8), out=1-seg(t,T.DUR-0.8,T.DUR); g.save(); g.textAlign='center';
        g.fillStyle='rgba(255,255,255,'+(a1*out)+')'; g.font='900 '+Math.round(VH*0.09)+'px Montserrat, Arial Black, sans-serif'; g.fillText('TO BE CONTINUED…',VW/2,VH*0.46);
        g.fillStyle='rgba(255,90,90,'+(a2*out)+')'; g.font='700 '+Math.round(VH*0.045)+'px Montserrat, Arial, sans-serif'; g.fillText('FINAL · PART 2 — CHRISTMAS 2026',VW/2,VH*0.58); g.restore(); return; }
      // chữ (chỉ TÊN CHIÊU — anh 23/11) / thoại ngắn
      if(t>=T.title&&t<T.stab) title(g,'HOLLOW PURPLE',0.9,seg(t,T.title,T.title+0.25)*(t>=T.hush?0.75+0.25*Math.sin(t*30):1),'#ead6ff');
      if(t>=T.slam+0.15&&t<T.smoke-0.4) title(g,'KUCHIYOSE NO JUTSU',0.2,seg(t,T.slam+0.15,T.slam+0.35)*(1-seg(t,T.smoke-0.9,T.smoke-0.4)));
      if(t>=T.banana+0.15&&t<T.mourn){ const a=seg(t,T.banana+0.15,T.banana+0.3); g.save(); g.globalAlpha=a; g.textAlign='center'; g.translate(VW*0.5+(hash(Math.floor(t*20))-0.5)*6,VH*0.2); g.font='900 '+Math.round(VH*0.11)+'px Montserrat, Arial Black, sans-serif'; g.lineWidth=8; g.strokeStyle='#000'; g.strokeText('NOOOO!',0,0); g.fillStyle='#ffffff'; g.fillText('NOOOO!',0,0); g.restore(); }
      // 21 · Sharingan xoay (cắt xen 0.6s)
      if(t>=T.shar&&t<T.crouch){ const c=K.prep(F.I.SHAR), uu=seg(t,T.shar,T.crouch); g.save(); g.fillStyle='rgba(20,0,0,0.82)'; g.fillRect(0,0,VW,VH); if(c){ const sz=VH*(0.9+0.15*uu); g.translate(VW/2,VH/2); g.rotate(uu*4.2); g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,-sz/2,-sz/2,sz,sz); } g.restore(); }
      if(t>=T.brake&&t<T.brake+0.25){ g.save(); g.globalAlpha=0.5*(1-seg(t,T.brake,T.brake+0.25)); g.fillStyle='#ffd8c0'; g.fillRect(0,0,VW,VH); g.restore(); }   // loé ngắn đúng khung phanh (không nổ)
      finish(F,t);
      if(t>=T.boom&&t<T.boom+0.35){ g.save(); g.globalAlpha=1-seg(t,T.boom+0.15,T.boom+0.35); g.fillStyle='#fff'; g.fillRect(0,0,VW,VH); g.restore(); } } };
  CineKit.film(def);
  window.__fin1c7SH=SH;   // cho công cụ xuất bảng phân cảnh
})();
