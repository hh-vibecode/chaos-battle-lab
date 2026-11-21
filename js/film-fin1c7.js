// 🌌 Final Part 1 · KẾT — CATVADER ĐÁNH LÉN — id `fin1c7`, sau fin1c4 (Gojo vs Pain).
// BẢN 3 (21/11/2026) — anh đổi cốt truyện, kịch bản prompts/kich-ban/fin1c7-v3.md (anh duyệt "ok hết", Chill Guy ở màn chia đôi):
//   A  Gojo áp đảo: va nhau → Almighty Push dừng trên lớp Vô hạn → cầu XANH hút Pain → cầu ĐỎ đấm Pain văng xuyên 2 toà → Pain quỳ trong hố
//      → (gài: đốm đỏ + tiếng thở máy trong khói sau lưng Gojo) → "It's over, Pain." → Gojo gom Xanh + Đỏ để bắn Hollow Purple lần 2, lớp Vô hạn sau lưng mờ đi.
//   B  Đánh lén: LẶNG → bật kiếm → lưỡi laze ĐỎ xuyên ngực Gojo từ sau → mắt mở to, 2 cầu xì tắt → 1 nhát chém ngang cắt cả khung
//      → Gojo đứt đôi: nửa trên ngả NẰM NGANG, 2 nửa tách nhau 1 chút, mép cháy xém, KHÔNG máu → từ đó KHÔNG hiện xác, chỉ còn BÓNG trên đất (anh dặn, chính sách YouTube)
//      → khói tan: CATVADER lộ diện (Imperial March) → Pain ngẩng lên, Rinnegan loé lại.
//   C  Phe thiện (~25 meme tiêu biểu) hốt hoảng chạy tới · Banana khóc thét · Buff Doge bật Haki lao vào → Force giữ đứng giữa không trung → đẩy văng
//      → Catvader bật lùi về cạnh Pain → phe thiện đứng chắn quanh chỗ Gojo nằm (góc CAO nhìn xuống, màu lạnh, tro rơi như tuyết — BI THƯƠNG).
//   D  Phe Evil tập hợp: Mlem / Chud / Ninja / Bat đáp xuống → Kuchiyose → binh đoàn quỷ ĐÔNG kín tới chân trời → Pain giơ mảnh linh hồn
//      → Friend xé mây lao xuống như thiên thạch → đứng che nửa trời → khung chênh lệch quân số → chia đôi Chill Guy / Pain + Catvader → BÙM → TO BE CONTINUED.
//   Trục: phe thiện TRÁI (x<0), phe Evil PHẢI (x>0). Máy TĨNH mỗi shot. Meme = ảnh gốc HOÀ VÀO CẢNH (bake / blend).
(function(){
  if(!window.CineKit || CineKit.films.fin1c7) return;
  const BASE=((document.currentScript&&document.currentScript.src)||'js/film-fin1c7.js').replace(/film-[^\/]*$/,''), V=window.GAME_VERSION?'?v='+GAME_VERSION.build:'';
  for(const [gl,f] of [['PIXI_FILTERS_GLSL','vendor/pixi-filters/glsl.js'],['Fin1City','fin1-city.js'],['Fin1Fight','fin1-fight.js'],['VfxBoom','vfx-boom.js']]) if(!window[gl]){ try{ const x=new XMLHttpRequest(); x.open('GET',BASE+f+V,false); x.send(); (0,eval)(x.responseText); }catch(e){} }
  const JX=p=>{ try{ const x=new XMLHttpRequest(); x.open('GET',BASE+p+V,false); x.send(); return JSON.parse(x.responseText); }catch(e){ return null; } };
  const K=CineKit, {seg,lerp,clamp,hash}=K, EA=K.EASE, eout=EA.eout, ein=EA.ein, eio=EA.eio, TAU=Math.PI*2, B=window.VfxBoom, VW=960, VH=540, H=120;
  // ───────── NHỊP (giây) ─────────
  const T={ hit:0.7, push:1.2, pHit:1.5, blue:2.6, red:3.7, crash:4.6, crater:4.8, appr:6.4, glint:7.2, say:7.6, charge:8.8, hush:10.5, ignite:10.82, stab:11.0,
    eye:12.0, fizz:12.4, slash:13.0, cut:13.12, split:13.6, reveal:16.4, painUp:19.4,
    run:20.8, banana:22.8, doge:24.0, freeze:24.45, pushB:25.45, leap:26.4, landV:27.3, mourn:27.8,
    aka:31.6, ninja:33.6, shar:33.9, crouch:34.3, slam:34.6, seal:35.6, smoke:37.4, shard:40.4, quiet:41.4, sky:41.9, dive:43.3, land:45.7, stand:47.9, roar:49.0,
    wide:50.2, split2:52.2, boom:54.4, tbc:54.8, xmas:56.4, DUR:58.8 };
  const av=k=>'assets/avatars/'+k+'/avatarUrl.'+(k==='violinbee'||k==='saiyanmarmot'?'png':'webp');
  // phe thiện: ~25 meme tiêu biểu (anh 21/11: "lấy 20–30 con tiêu biểu thôi") — đã đánh trong Part 1 + vệ thần đổ bộ ở fin1c5
  const GOOD=['chillguy','bananacat','clappingcat','berserkcat','popcat','huhcat','breadcat','feuerkatze','stalincat','duolingo','violinbee','saiyanmarmot','boxingcat','nyancat',
    'samuraicheems','kingcheems','electricguitarcat','mosquitoviolin','maxwell','mechaniccat','loooongcat','lebronsunshine','gigachad','chonkydog'];
  const IMG={ ...window.FIN1_CITY_IMGS, SIM:'assets/img/cine/VFX_BOOM_SIM_FIRE.png',
    G1:'assets/img/cine/MVD_G1.png', G6:'assets/img/cine/FIN_G6.png', PAIN:'assets/img/depressedcat/DP_PAIN_IMG.webp',
    P1:'assets/img/cine/MVD_P1.png', PPUSH:'assets/img/cine/MVD_PAIN_PUSH.png', PKB:'assets/img/cine/MVD_PAIN_KB.png', PCR:'assets/img/cine/FIN_DP_CROUCH.png',
    DB:'assets/avatars/doge/rageAvatarUrl.webp', DBA:'assets/avatars/doge/rageAttackAvatarUrl.webp', BANC:'assets/avatars/bananacat/attackAvatarUrl.webp',
    VADER:av('catvader'), VADER_S:'assets/avatars/catvader/introAvatarUrl.webp', VADER_F:'assets/avatars/catvader/skill2AvatarUrl.webp',
    CHUD:av('doorbellchud'), MLEM:av('mlemcat'), NINJA:av('ninjacat'), SHAR:'assets/img/ninjacat/NJ_SHARINGAN.webp', BAT:av('batcat'),
    GARY:av('evilgary'), SOUL:'assets/img/evilgary/EG_SOUL_TORSO.webp',
    FR:av('friend'), FR_DIVE:'assets/avatars/friend/rageAvatarUrl.webp', FR_ROAR:'assets/avatars/friend/skill1AvatarUrl.webp' };
  for(const k of GOOD) IMG['M_'+k]=av(k);
  const SIMJ=JX('../assets/img/cine/VFX_BOOM_SIM_FIRE.json')||{frames:45,cols:6,px:768,ph:549,fps:15,ground:[0.5,1.0]};

  // ───────── THÀNH PHỐ: bãi đã bị Shinra san phẳng · dãy xa còn đứng làm chân trời · 2 toà còn trơ giữa bãi (cầu Đỏ đánh Pain văng xuyên qua) ─────────
  const CITY=Fin1City({seed:3, x0:-16000, x1:16000, rows:1, near:15000});
  const theme=()=>CITY.TH_NIGHT;
  const GX0=-2850, PX0=-2350, CRATER=[450,0], GOJO=[-450,0], VADER0=[-720,40], VADER1=[560,170];   // chỗ đánh · hố Pain rơi · chỗ Gojo đứng gom Purple · Catvader
  const FLY=[-2600,450];   // cầu Đỏ hất Pain bay dọc x: −2600 → 450 trong T.red → T.crash
  const flyX=t=>lerp(FLY[0],FLY[1],eout(seg(t,T.red+0.05,T.crash)));
  const tAt=x=>T.red+0.05+(T.crash-T.red-0.05)*(1-Math.sqrt(Math.max(0,1-(x-FLY[0])/(FLY[1]-FLY[0]))));   // giây Pain bay qua toạ độ x (nghịch đảo eout)
  for(const [x0,x1,st,sd] of [[-1900,-1500,9,901],[-1150,-760,12,902]]){ const b={x0,x1,z0:-260,z1:260,h:st*300,st,seed:sd,hue:hash(sd*5.3)}; b.cx=(x0+x1)/2; b.cz=0; b.ta=tAt(b.cx); b.shakeAt=b.ta-0.02; b.h0=b.h; b.mine=true; CITY.BL.push(b); }
  const MINE=CITY.BL.filter(b=>b.mine);
  const settle=t=>{ for(const b of MINE){ b.h=b.h0*(t<b.ta+0.3?1:lerp(1,0.06,eout(seg(t,b.ta+0.3,b.ta+1.1)))); const i=CITY.BL.indexOf(b), on=t<b.ta+1.1; if(on&&i<0) CITY.BL.push(b); else if(!on&&i>=0) CITY.BL.splice(i,1); } };   // sập xong sạt hẳn xuống rồi BỎ hẳn (chỉ còn đống gạch vụn) — không để mảng mái đen phẳng như cái hố
  const RUBBLE=Array.from({length:300},(_,i)=>({x:(hash(i*3+11)-0.5)*16000,z:-600+12000*hash(i*3+12),r:30+90*Math.pow(hash(i*3+13),2),a:hash(i*3+14)*TAU}));
  const PILE=[]; for(const [x0,x1,sd] of [[-1900,-1500,901],[-1150,-760,902]]) for(let i=0;i<34;i++) PILE.push({x:lerp(x0-80,x1+80,hash(sd+i*3)),z:60+hash(sd+i*3+1)*560,r:18+46*Math.pow(hash(sd+i*3+2),1.5),a:hash(sd+i*3+3)*TAU,ta:tAt((x0+x1)/2)+0.7});   // đống gạch vụn chỗ 2 toà sập

  // ═════════ HOÀ VÀO CẢNH: nướng sẵn ảnh theo TÔNG ═════════
  //   desat = bớt rực · env = multiply ánh môi trường · foot = tối dần về chân · rim = ánh hắt mỏng từ trên · dark = ngược sáng
  const TONE={ hero:{desat:0.22,env:['#a65058',0.26],foot:0.55,rim:['#ffb4a4',0.5]},
    near:{desat:0.3,env:['#9a4650',0.34],foot:0.6,rim:['#ffa898',0.45]},
    mid:{desat:0.42,env:['#7a3442',0.48],foot:0.65,rim:['#ff9080',0.4],dark:0.3},
    far:{desat:0.6,env:['#5a2232',0.6],foot:0.5,rim:['#ff7a6a',0.55],dark:0.74},
    cold:{desat:0.5,env:['#56607a',0.42],foot:0.6,rim:['#c8d6ff',0.38],dark:0.12},        // phe thiện lúc tang thương: lạnh, nhạt
    saber:{desat:0.18,env:['#8a2a30',0.3],foot:0.6,rim:['#ff5040',0.65]},                  // Catvader: ánh đỏ của kiếm hắt lên
    soul:{desat:1,env:['#7a1010',0.85],foot:0.4,rim:['#ff3020',0.7],dark:0.35},           // hồn quỷ: đen đỏ
    friend:{desat:0,env:['#5a3a78',0.35],foot:0.7,rim:['#ff6a8a',0.6]},
    fire:{desat:0.1,env:['#c05030',0.25],foot:0,rim:['#ffd080',0.8]} };
  const BK={};
  // res: 0 = 180px (quân xa) · 1 = 520px (tầm trung) · 2 = ảnh gốc tối đa 1600px (cận cảnh)
  function bake(F,key,tone,res){ res=res===true?2:(res||0); const id=key+'|'+tone+'|'+res; if(BK[id]) return BK[id]; const c=K.prep(F.I[key]); if(!c) return null;
    const sc=Math.min(1,[180,520,1600][res]/c.sh), w=Math.max(2,Math.round(c.sw*sc)), h=Math.max(2,Math.round(c.sh*sc)), cv=K.mk(w,h), x=cv.getContext('2d'), o=TONE[tone]||TONE.near, px=/^FR/.test(key);
    x.imageSmoothingEnabled=!px; const img=()=>x.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,0,0,w,h); img();
    if(o.desat){ x.globalCompositeOperation='saturation'; x.globalAlpha=o.desat; x.fillStyle='#808080'; x.fillRect(0,0,w,h); x.globalAlpha=1; }
    if(o.env){ x.globalCompositeOperation='multiply'; x.globalAlpha=o.env[1]; x.fillStyle=o.env[0]; x.fillRect(0,0,w,h); x.globalAlpha=1; }
    x.globalCompositeOperation='destination-in'; img(); x.globalCompositeOperation='source-atop';
    if(o.foot){ const lg=x.createLinearGradient(0,0,0,h); lg.addColorStop(0,'rgba(0,0,0,0)'); lg.addColorStop(0.6,'rgba(0,0,0,0)'); lg.addColorStop(1,'rgba(6,4,10,'+o.foot+')'); x.fillStyle=lg; x.fillRect(0,0,w,h); }
    if(o.dark){ x.globalAlpha=o.dark; x.fillStyle='#07040a'; x.fillRect(0,0,w,h); x.globalAlpha=1; }
    if(o.rim){ const rg=x.createLinearGradient(0,0,0,h*0.32); rg.addColorStop(0,o.rim[0]); rg.addColorStop(1,'rgba(0,0,0,0)'); x.globalAlpha=o.rim[1]*0.55; x.fillStyle=rg; x.fillRect(0,0,w,h); x.globalAlpha=1; }
    if(!/_F$/.test(key)&&!o.noFade){ x.globalCompositeOperation='destination-out'; const fg=x.createLinearGradient(0,h*0.86,0,h); fg.addColorStop(0,'rgba(0,0,0,0)'); fg.addColorStop(1,'rgba(0,0,0,0.85)'); x.fillStyle=fg; x.fillRect(0,h*0.86,w,h*0.14); }   // mép đáy mờ dần
    x.globalCompositeOperation='source-over'; return BK[id]={cv,ar:c.sw/c.sh,px}; }
  // vẽ 1 meme đã hoà cảnh, chân ở (x,y,z), cao h · o: tone, a, sy (co dọc), sx, rot, flip, d (lệch sâu), shadow, mist, soft, hi, glow:[màu, độ]
  function blend(F,key,x,y,z,h,o){ o=o||{}; const P=K.proj(F.B,x,y,z); if(!P) return null; const hh=h*P.s*(o.sy==null?1:o.sy); if(hh<1) return null;
    const tone=o.tone||(z<1800?'near':z<5200?'mid':'far'), px=hh*(F.SC||1), res=o.hi||px>600?2:px>200?1:0, hi=res>0, b=bake(F,key,tone,res); if(!b) return null; const ww=h*P.s*b.ar*(o.sx||1);
    if(P.x+ww<-80||P.x-ww>VW+80||P.y-hh>VH+80||P.y<-80) return {P,hh,ww};
    const G=(o.shadow||o.mist)?K.proj(F.B,x,0,z):null, soft=o.soft!=null?o.soft:hi;
    F.list.push({d:P.d+(o.d||0), fn:()=>{ const g=F.g, al=o.a==null?1:o.a; if(al<=0.01) return;
      if(G&&o.shadow){ g.save(); g.globalAlpha=0.55*al; g.translate(G.x,G.y); g.scale(1,0.18); const rg=g.createRadialGradient(0,0,0,0,0,ww*0.6); rg.addColorStop(0,'rgba(0,0,0,0.85)'); rg.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=rg; g.beginPath(); g.arc(0,0,ww*0.6,0,TAU); g.fill(); g.restore(); }
      if(o.glow){ g.save(); g.globalCompositeOperation='lighter'; glowDot(g,P.x,P.y-hh*0.5,Math.max(ww,hh)*0.8,o.glow[0],o.glow[1]*al); g.restore(); }
      g.save(); g.globalAlpha=al; g.translate(P.x,P.y); if(o.rot) g.rotate(o.rot); if(o.flip) g.scale(-1,1); if(b.px) g.imageSmoothingEnabled=false;
      if(soft&&!b.px){ g.filter='blur('+(0.5*(F.SC||1)).toFixed(2)+'px)'; g.drawImage(b.cv,-ww/2,-hh,ww,hh); g.filter='none'; }   // lớp mờ dưới + lớp nét trên = mép mềm
      g.drawImage(b.cv,-ww/2,-hh,ww,hh); g.restore();
      if(G&&o.mist){ g.save(); g.globalAlpha=o.mist*al; g.translate(G.x,G.y); g.scale(1,0.22); const rg=g.createRadialGradient(0,0,0,0,0,ww*0.8); rg.addColorStop(0,'rgba(120,90,100,0.75)'); rg.addColorStop(1,'rgba(120,90,100,0)'); g.fillStyle=rg; g.beginPath(); g.arc(0,0,ww*0.8,0,TAU); g.fill(); g.restore(); } }});
    return {P,hh,ww}; }
  function glowDot(g,x,y,r,col,a){ if(a<=0.01||r<=0.5) return; const rg=g.createRadialGradient(x,y,0,x,y,r); rg.addColorStop(0,'rgba('+col+','+a+')'); rg.addColorStop(1,'rgba('+col+',0)'); g.fillStyle=rg; g.fillRect(x-r,y-r,2*r,2*r); }
  const lighter=(g,fn)=>{ g.save(); g.globalCompositeOperation='lighter'; fn(); g.restore(); };
  const FADE={};
  function faded(F,key){ if(FADE[key]) return FADE[key]; const im=F.I[key]; if(!im||!im.complete||!im.naturalWidth) return null; const c=document.createElement('canvas'); c.width=im.naturalWidth; c.height=im.naturalHeight; const x=c.getContext('2d'); x.drawImage(im,0,0);
    x.globalCompositeOperation='destination-out'; const gr=x.createLinearGradient(0,c.height*0.55,0,c.height); gr.addColorStop(0,'rgba(0,0,0,0)'); gr.addColorStop(0.55,'rgba(0,0,0,0.72)'); gr.addColorStop(0.85,'rgba(0,0,0,0.97)'); gr.addColorStop(1,'rgba(0,0,0,1)'); x.fillStyle=gr; x.fillRect(0,0,c.width,c.height);
    c.complete=true; c.naturalWidth=c.width; c.naturalHeight=c.height; F.I[key+'_F']=c; return FADE[key]=c; }

  // ═════════ CHIÊU CỦA GOJO (cùng nét với fin1c4) ═════════
  const BOLT={ blue:{core:'#f2fbff',rim:'#5ab4ff',glow:'rgba(90,170,255,0.35)'}, red:{core:'#fff2f0',rim:'#ff4a4a',glow:'rgba(255,60,60,0.35)'} };
  const zap=(g,x,y,an,len,w,seed,c)=>{ if(window.VfxGL) VfxGL.boltSet(g,x,y,an,len,Math.max(1.2,w),seed,Object.assign({branches:false},BOLT[c])); };
  // 🔵🔴 XANH (hút vào: hạt xoáy về tâm) · ĐỎ (đẩy ra: tia lửa toé ra ngoài)
  function elemOrb(F,x,y,z,r,t,col,inward,a,top){ if(a<=0.01) return; const P=K.proj(F.B,x,y,z); if(!P) return; const R=r*P.s, fr=Math.floor(t*16);
    F.list.push({d:top?-1e7:P.d-45, fn:()=>{ const g=F.g; g.save(); g.globalCompositeOperation='lighter';
      let gr=g.createRadialGradient(P.x,P.y,R*0.5,P.x,P.y,R*4); gr.addColorStop(0,`rgba(${col},${0.6*a})`); gr.addColorStop(1,`rgba(${col},0)`); g.fillStyle=gr; g.fillRect(P.x-R*4,P.y-R*4,R*8,R*8);
      g.lineCap='round'; for(let i=0;i<28;i++){ const ph=(t*(inward?1.6:1.3)+hash(i*2.3))%1, base=hash(i*1.7)*TAU, an=base+(inward?ph*2.4:ph*0.4), rr=inward?R*(3.4-2.5*ph):R*(1.05+3*ph), L=R*0.45*(inward?ph:1-ph);
        const dx=inward?-Math.sin(an):Math.cos(an), dy=inward?Math.cos(an):Math.sin(an), px=P.x+Math.cos(an)*rr, py=P.y+Math.sin(an)*rr;
        g.strokeStyle=`rgba(${i%3?col:'255,255,255'},${a*(inward?Math.min(1,ph*2):1-ph)})`; g.lineWidth=Math.max(1,R*0.08); g.beginPath(); g.moveTo(px,py); g.lineTo(px-dx*L,py-dy*L); g.stroke(); }
      for(let k=0;k<3;k++){ const rot=t*(inward?-7:6)+k*2.1; g.strokeStyle=`rgba(${col},${0.7*a})`; g.lineWidth=Math.max(1,R*0.1); g.beginPath(); g.arc(P.x,P.y,R*(1.25+0.18*k),rot,rot+1.6); g.stroke(); }
      gr=g.createRadialGradient(P.x,P.y,0,P.x,P.y,R); gr.addColorStop(0,`rgba(255,255,255,${a})`); gr.addColorStop(0.45,`rgba(${col},${a})`); gr.addColorStop(1,`rgba(${col},${0.25*a})`);
      g.fillStyle=gr; g.beginPath(); g.arc(P.x,P.y,R,0,TAU); g.fill();
      if(fr%2===0) zap(g,P.x,P.y,hash(fr*3+(inward?1:2))*TAU,R*2.2,R*0.09,fr*7+(inward?1:9),inward?'blue':'red');
      g.restore(); }}); }
  // lớp VÔ HẠN quanh Gojo: không khí gợn trong suốt (vòng lục giác mờ) · a = độ rõ · stop = đá vụn đứng yên quanh
  function infinity(F,x,y,z,r,t,a){ if(a<=0.01) return; const P=K.proj(F.B,x,y,z); if(!P) return; const R=r*P.s;
    F.list.push({d:P.d-30, fn:()=>{ const g=F.g; g.save(); g.globalCompositeOperation='lighter';
      for(let k=0;k<3;k++){ const rr=R*(0.85+0.12*k+0.03*Math.sin(t*5+k)); g.strokeStyle=`rgba(190,225,255,${(0.16-0.04*k)*a})`; g.lineWidth=Math.max(1,R*0.012);
        g.beginPath(); for(let i=0;i<=6;i++){ const an=i/6*TAU+t*0.4*(k%2?1:-1); i?g.lineTo(P.x+Math.cos(an)*rr,P.y+Math.sin(an)*rr*0.92):g.moveTo(P.x+Math.cos(an)*rr,P.y+Math.sin(an)*rr*0.92); } g.stroke(); }
      const gr=g.createRadialGradient(P.x,P.y,R*0.6,P.x,P.y,R*1.05); gr.addColorStop(0,'rgba(160,210,255,0)'); gr.addColorStop(0.85,`rgba(170,215,255,${0.12*a})`); gr.addColorStop(1,'rgba(160,210,255,0)'); g.fillStyle=gr; g.beginPath(); g.arc(P.x,P.y,R*1.05,0,TAU); g.fill(); g.restore(); }}); }
  // bức tường lực của Pain (elip trắng) — Almighty Push
  function field(F,x,y,z,ry,a){ const P=K.proj(F.B,x,y,z); if(!P||a<=0.01) return;
    F.list.push({d:P.d-35, fn:()=>{ const g=F.g, Ry=ry*P.s, Rx=Ry*0.32; g.save(); g.globalCompositeOperation='lighter'; g.translate(P.x,P.y); g.scale(Rx/Ry,1);
      const gr=g.createRadialGradient(0,0,0,0,0,Ry); gr.addColorStop(0,'rgba(255,255,255,0)'); gr.addColorStop(0.68,`rgba(220,215,255,${0.18*a})`); gr.addColorStop(0.92,`rgba(255,255,255,${0.75*a})`); gr.addColorStop(1,'rgba(255,255,255,0)');
      g.fillStyle=gr; g.beginPath(); g.arc(0,0,Ry,0,TAU); g.fill(); g.restore(); }}); }
  // đá vụn: rơi / treo lơ lửng trên lớp Vô hạn (đứng yên giữa không trung — Gojo không lùi)
  const FLOAT=Array.from({length:22},(_,i)=>({x:GX0+60+hash(i+40)*150,y:30+hash(i+41)*190,z:(hash(i+42)-0.5)*220,r:6+12*hash(i+43),a:hash(i+44)*TAU}));
  function floatRocks(F,t){ if(t<T.push||t>=T.blue) return; const k=eout(seg(t,T.pHit-0.15,T.pHit+0.1));
    for(const r of FLOAT){ const P=K.proj(F.B,lerp(r.x+300,r.x,k),r.y+Math.sin(t*2+r.a)*2,r.z); if(!P) continue; const R=r.r*P.s;
      F.list.push({d:P.d, fn:()=>{ const g=F.g; g.save(); g.translate(P.x,P.y); g.rotate(r.a+t*0.2*(1-k)); g.fillStyle='#3a3035'; g.beginPath(); g.moveTo(-R,0); g.lineTo(-R*0.3,-R*0.7); g.lineTo(R*0.6,-R*0.4); g.lineTo(R,R*0.2); g.lineTo(0,R*0.6); g.closePath(); g.fill(); g.fillStyle='#5a4a50'; g.fillRect(-R*0.3,-R*0.6,R*0.6,R*0.25); g.restore(); }}); } }

  // ═════════ LƯỠI KIẾM LAZE (code: lõi trắng, quầng đỏ) ═════════
  function saber(F,ax,ay,az,bx,by,bz,a,w){ if(a<=0.01) return; const A=K.proj(F.B,ax,ay,az), Bp=K.proj(F.B,bx,by,bz); if(!A||!Bp) return; const W=(w||6)*(A.s+Bp.s)/2;
    F.list.push({d:Math.min(A.d,Bp.d)-60, fn:()=>{ const g=F.g; g.save(); g.lineCap='round'; g.globalCompositeOperation='lighter';
      for(const [lw,c,al] of [[W*6,'255,30,20',0.18],[W*3,'255,50,30',0.45],[W*1.6,'255,120,90',0.8]]){ g.strokeStyle=`rgba(${c},${al*a})`; g.lineWidth=lw; g.beginPath(); g.moveTo(A.x,A.y); g.lineTo(Bp.x,Bp.y); g.stroke(); }
      g.globalCompositeOperation='source-over'; g.strokeStyle=`rgba(255,250,245,${a})`; g.lineWidth=Math.max(1,W*0.7); g.beginPath(); g.moveTo(A.x,A.y); g.lineTo(Bp.x,Bp.y); g.stroke(); g.restore(); }}); }

  // ═════════ GOJO ═════════
  const GH=H*1.18;   // cỡ Gojo toàn thân (như fin1c4)
  const gojoPos=t=>{ if(t<T.appr) return [GX0,0]; const k=eio(seg(t,T.appr,T.charge)); return [lerp(GX0,GOJO[0],k),lerp(0,42,Math.min(1,k*3))*(1-0.2*k)]; };   // lơ lửng tiến lại
  const PAINX=t=>t<T.blue?PX0:t<T.red?lerp(PX0,-2620,ein(seg(t,T.blue+0.1,T.red-0.05))):t<T.crash?flyX(t):CRATER[0];
  function gojo(F,t){ const [x,y]=gojoPos(t); const z=0, bob=t>=T.appr?Math.sin(t*1.9)*4:0;
    let key=t>=T.eye&&t<T.slash?'G6':'G1', sh=0; if(t>=T.stab&&t<T.stab+0.14) sh=(hash(Math.floor(t*60))-0.5)*6;   // hit-stop: rung đúng khung xuyên
    if(t<T.split) blend(F,key,x+sh,y+bob,z,GH,{tone:'hero',shadow:true,mist:t<T.appr?0.25:0,glow:t>=T.charge&&t<T.stab?['190,150,255',0.22*seg(t,T.charge,T.hush)]:null}); }
  // Gojo ĐỨT ĐÔI: cắt chính ảnh gốc theo đường chém ngang ngang bụng (v = 0.55 tính từ đỉnh) — nửa trên ngả NẰM NGANG, 2 nửa tách nhau 1 chút (anh dặn), mép cháy xém, không máu
  const CUTV=0.55;
  function cutGlow(b){ if(b.cg) return b.cg; const w=b.cv.width, h=b.cv.height, c=K.mk(w,h), x=c.getContext('2d'); x.drawImage(b.cv,0,0); x.globalCompositeOperation='source-in';   // vệt cháy xém CHỈ trong thân (theo alpha ảnh)
    const y=h*CUTV, lg=x.createLinearGradient(0,y-h*0.05,0,y+h*0.05); lg.addColorStop(0,'rgba(255,80,30,0)'); lg.addColorStop(0.5,'rgba(255,170,110,1)'); lg.addColorStop(1,'rgba(255,80,30,0)'); x.fillStyle=lg; x.fillRect(0,0,w,h); return b.cg=c; }
  function gojoSplit(F,t){ if(t<T.split||t>=T.reveal) return; const P=K.proj(F.B,GOJO[0],42,0), G=K.proj(F.B,GOJO[0],0,0); if(!P||!G) return; const b=bake(F,'G1','hero',2); if(!b) return;
    const u=seg(t,T.split,T.split+1.3), e=ein(Math.min(1,u*1.25)), hh=GH*P.s, ww=hh*b.ar, cy=-hh*(1-CUTV);
    const fall=G.y-P.y, bot={rot:0.06*eout(seg(t,T.split+0.6,T.split+1.6)), dy:lerp(0,fall,ein(seg(t,T.split+0.35,T.split+0.95)))};   // nửa dưới rơi chạm đất, đứng trơ
    const top={rot:e*1.52, dx:lerp(0,ww*0.42,eout(u)), dy:lerp(0,fall-cy-ww*0.2,e)};   // nửa trên ngả về TRƯỚC, nằm NGANG trên đất, tách khỏi nửa dưới 1 khe (anh dặn)
    F.list.push({d:P.d, fn:()=>{ const g=F.g, glow=Math.max(0.25,1-seg(t,T.split,T.split+2.2));
      const half=(isTop,q)=>{ g.save(); g.translate(P.x,P.y); g.translate(isTop?q.dx:0,q.dy); g.translate(0,cy); g.rotate(q.rot); g.translate(0,-cy);
        g.beginPath(); if(isTop) g.rect(-ww,-hh-20,ww*2,hh+20+cy); else g.rect(-ww,cy,ww*2,hh); g.clip();
        g.drawImage(b.cv,-ww/2,-hh,ww,hh);
        lighter(g,()=>{ g.globalAlpha=0.9*glow; g.drawImage(cutGlow(b),-ww/2,-hh,ww,hh); });   // mép cháy xém đỏ hồng (kiếm laze) — không máu
        g.restore(); };
      half(false,bot); half(true,top);
      for(let i=0;i<8;i++){ const f=((t-T.split)*0.6+hash(i+70))%1; g.save(); g.globalAlpha=0.25*(1-f)*glow; g.fillStyle='#b8a8a8'; g.beginPath(); g.arc(P.x+(hash(i+71)-0.5)*ww*0.6+top.dx*0.5,P.y+cy-f*hh*0.5,hh*(0.04+0.06*f),0,TAU); g.fill(); g.restore(); } }});   // khói mỏng bốc từ mép cắt
    if(t<T.split+0.5) K.smoke(F,{x:GOJO[0],z:0,t0:T.split+0.35,n:4,spread:60,rise:40,life:1.2,size:60,seed:520,a:0.35,tint:'110,100,104'}); }   // bụi khi nửa trên chạm đất
  // từ nhịp 13 trở đi: KHÔNG hiện xác — chỉ còn BÓNG trên mặt đất chỗ Gojo nằm (anh dặn)
  function gojoShadow(F,t){ if(t<T.reveal) return; const G=K.proj(F.B,GOJO[0]+30,0,0); if(!G) return; const R=GH*1.1*G.s;
    F.under.push(()=>{ const g=F.g; g.save(); g.translate(G.x,G.y); g.scale(1,0.22); const rg=g.createRadialGradient(0,0,0,0,0,R); rg.addColorStop(0,'rgba(0,0,0,0.85)'); rg.addColorStop(0.6,'rgba(0,0,0,0.5)'); rg.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=rg; g.beginPath(); g.arc(0,0,R,0,TAU); g.fill(); g.restore(); }); }

  // ═════════ PAIN ═════════
  function pain(F,t){ const x=PAINX(t);
    if(t<T.push){ blend(F,'P1',x,0,0,H*1.17,{tone:'hero',shadow:true,mist:0.25}); return; }
    if(t<T.blue){ blend(F,'PPUSH',x,0,0,H*1.17,{tone:'hero',shadow:true,mist:0.25}); return; }
    if(t<T.red){ const k=seg(t,T.blue+0.1,T.red-0.05); blend(F,'P1',x,0,0,H*1.17,{tone:'hero',shadow:true,rot:-0.12*Math.sin(k*Math.PI)}); return; }   // bị cầu Xanh hút, chân cày đất
    if(t<T.crash){ blend(F,'PKB',x,60+60*Math.sin(seg(t,T.red,T.crash)*Math.PI),0,H*1.2,{tone:'hero',flip:true}); return; }   // văng dọc x
    if(t<T.landV+0.2){ const hit=t<T.crater+0.15?(hash(Math.floor(t*60))-0.5)*4:0; blend(F,'PCR',CRATER[0]+hit,0,CRATER[1],H*0.95,{tone:'hero',flip:true,shadow:true,mist:0.35}); return; }   // quỳ giữa hố, ngẩng nhìn Gojo
    if(faded(F,'PAIN')){ const up=eout(seg(t,T.landV+0.2,T.landV+1.2)); blend(F,'PAIN_F',CRATER[0],H*0.35*up+Math.sin(t*1.8)*5*up,CRATER[1],H*1.3,{tone:'hero',glow:['200,120,255',0.25*up]}); } }
  // Rinnegan loé: đo trên FIN_DP_CROUCH (u,v) = (0.788,0.181) / (0.841,0.189) của ảnh cắt sát · ảnh LẬT ngang → u' = 1 − u
  function rinnegan(F,t,a){ if(a<=0.01) return; const P=K.proj(F.B,CRATER[0],0,CRATER[1]); if(!P) return; const b=bake(F,'PCR','hero',2); if(!b) return; const hh=H*0.95*P.s, ww=hh*b.ar;
    F.list.push({d:P.d-5, fn:()=>{ const g=F.g; lighter(g,()=>{ for(const [u,v] of [[0.788,0.181],[0.841,0.189]]){ const x=P.x+((1-u)-0.5)*ww, y=P.y-hh+v*hh; glowDot(g,x,y,hh*0.09,'200,140,255',0.9*a); glowDot(g,x,y,hh*0.025,'255,255,255',a); } }); }}); }

  // ═════════ CATVADER ═════════
  function vader(F,t){
    if(t>=T.glint&&t<T.glint+0.35){ const P=K.proj(F.B,-2100,150,900); if(P){ const a=Math.sin(seg(t,T.glint,T.glint+0.35)*Math.PI); F.list.push({d:P.d-10,fn:()=>lighter(F.g,()=>{ glowDot(F.g,P.x,P.y,6+40*P.s,'255,40,30',0.8*a); glowDot(F.g,P.x,P.y,2+6*P.s,'255,220,210',a); })}); } }   // gài: đốm đỏ trong khói sau lưng Gojo
    if(t>=T.ignite&&t<T.slash){   // kiếm xuyên ngực từ SAU LƯNG: chỉ thấy đoạn lưỡi nhô ra trước ngực
      const L=eout(seg(t,T.stab,T.stab+0.06))*170*(1-seg(t,T.eye+0.8,T.slash)), [gx]=gojoPos(t); if(L>2) saber(F,gx+18,82,6,gx+18+L,86,6,1,5);
      if(t>=T.stab){ const P=K.proj(F.B,gx+20,82,0); if(P) F.list.push({d:P.d-70,fn:()=>lighter(F.g,()=>glowDot(F.g,P.x,P.y,30*P.s+6,'255,120,60',0.7*(1-seg(t,T.stab,T.slash))))}); } }
    if(t>=T.reveal&&t<T.doge){ blend(F,'VADER_S',VADER0[0],0,VADER0[1],H*1.25,{tone:'saber',shadow:true,mist:0.3,glow:['255,50,40',0.22]}); return; }
    if(t>=T.doge&&t<T.leap){ const f=t>=T.freeze-0.15&&t<T.pushB+0.2; blend(F,f?'VADER_F':'VADER_S',VADER0[0],0,VADER0[1],H*1.25,{tone:'saber',shadow:true,mist:0.3,flip:f}); return; }   // giơ tay dùng Force về phía Doge (lật: tay hướng sang trái)
    if(t>=T.leap&&t<T.landV){ const k=seg(t,T.leap,T.landV), e=eio(k); blend(F,'VADER',lerp(VADER0[0],VADER1[0],e),Math.sin(k*Math.PI)*480,lerp(VADER0[1],VADER1[1],e),H*1.2,{tone:'saber',rot:Math.sin(k*Math.PI)*-0.5}); return; }   // bật lùi 1 vòng
    if(t>=T.landV) blend(F,t>=T.wide?'VADER_S':'VADER',VADER1[0],0,VADER1[1],H*1.25,{tone:'saber',shadow:true,mist:0.3,sy:t<T.landV+0.15?0.9+0.1*seg(t,T.landV,T.landV+0.15):1}); }
  // vùng FORCE đỏ: Buff Doge khựng đứng giữa không trung 1s, đá vụn quanh cũng đứng yên (đúng skill game) → đẩy văng ngược
  function forceZone(F,t){ if(t<T.freeze-0.05||t>=T.pushB+0.35) return; const P=K.proj(F.B,-1000,140,20); if(!P) return; const R=230*P.s, a=t<T.pushB?seg(t,T.freeze-0.05,T.freeze+0.1):1-seg(t,T.pushB,T.pushB+0.35), r=R*(t<T.pushB?1:1+2*seg(t,T.pushB,T.pushB+0.35));
    F.list.push({d:P.d-80, fn:()=>{ const g=F.g; lighter(g,()=>{ const gr=g.createRadialGradient(P.x,P.y,r*0.3,P.x,P.y,r); gr.addColorStop(0,'rgba(255,40,30,0)'); gr.addColorStop(0.8,`rgba(255,50,40,${0.22*a})`); gr.addColorStop(1,'rgba(255,40,30,0)'); g.fillStyle=gr; g.beginPath(); g.arc(P.x,P.y,r,0,TAU); g.fill();
        g.strokeStyle=`rgba(255,110,90,${0.6*a})`; g.lineWidth=2; for(let k=0;k<2;k++){ g.beginPath(); g.arc(P.x,P.y,r*(0.9+0.05*Math.sin(t*20+k)),t*3+k*2,t*3+k*2+2.2); g.stroke(); } }); }}); }

  // ═════════ PHE THIỆN: ~25 meme chạy tới → đứng chắn quanh chỗ Gojo nằm ═════════
  const GPOS=[]; (function(){ const rows=[[-760,-170,6],[-940,40,8],[-1150,240,10]]; let i=0;
    for(const [x0,z,n] of rows) for(let c=0;c<n&&i<GOOD.length;c++,i++){ const key=GOOD[i], x=x0-c*190-(hash(i+300)-0.5)*60;
      GPOS.push({key, x, z:z+(hash(i+301)-0.5)*70, h:H*(key==='gigachad'||key==='chonkydog'?1.25:0.95+0.12*hash(i+302)), t0:T.run+0.1+hash(i+303)*1.3+(key==='chillguy'||key==='bananacat'?-0.1:0), dx:2400+hash(i+304)*900, ph:hash(i+305)*TAU}); } })();
  const BANANA=GPOS.find(m=>m.key==='bananacat'), CHILL=GPOS.find(m=>m.key==='chillguy');
  function goodSide(F,t,o){ o=o||{}; if(t<T.run) return; const cold=t>=T.mourn;
    for(const m of GPOS){ if(o.skip&&o.skip(m)) continue; const k=seg(t,m.t0,m.t0+1.4), e=eout(k), x=m.x-m.dx*(1-e), hop=k<1?Math.abs(Math.sin((t-m.t0)*11+m.ph))*14*(1-e):0;
      if(t<m.t0) continue; let key='M_'+m.key, h=m.h; if(m===BANANA&&t>=T.banana-0.1&&t<T.mourn+2) { key='BANC'; }
      const rage=o.rage&&m===CHILL; blend(F,key,x,hop,m.z,h,{tone:cold?'cold':'near',shadow:true,mist:0.25,a:Math.min(1,k*4),glow:rage?['150,20,30',0.55+0.15*Math.sin(t*9)]:null});
      if(k<1) K.smoke(F,{x:x-40,z:m.z,t0:m.t0,n:2,spread:40,rise:20,life:0.6,size:40,seed:600+(m.ph*100|0),a:0.3,tint:'120,100,100'}); } }
  // băng mắt của Gojo nằm trên đất trước mặt Chill Guy, bay phần phật trong gió tro (ảnh Chill Guy đút tay túi quần → không cầm được)
  function blindfold(F,t){ const x0=CHILL.x+120, z0=CHILL.z-90, pts=[]; for(let i=0;i<=10;i++){ const f=i/10, P=K.proj(F.B,x0+f*70,2+f*f*26*(0.6+0.4*Math.sin(t*7+f*5)),z0+Math.sin(t*5+f*6)*8*f); if(P) pts.push(P); } if(pts.length<2) return;
    F.list.push({d:pts[0].d, fn:()=>{ const g=F.g, w=Math.max(1.5,10*pts[0].s); g.save(); g.lineCap='round'; g.lineJoin='round'; g.strokeStyle='#0b0b10'; g.lineWidth=w; g.beginPath(); pts.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y)); g.stroke();
      g.strokeStyle='rgba(120,130,160,0.35)'; g.lineWidth=w*0.3; g.beginPath(); pts.forEach((p,i)=>i?g.lineTo(p.x,p.y-w*0.25):g.moveTo(p.x,p.y-w*0.25)); g.stroke(); g.restore(); }}); }
  // Buff Doge bật Haki lao vào Catvader → Force giữ đứng giữa không trung → đẩy văng ngược về phe mình, cày rãnh
  const DOGE0=[-1700,60];
  function buffDoge(F,t){ if(t<T.run+0.4) return; let x=DOGE0[0], y=0, key='DB', rot=0;
    const kIn=eout(seg(t,T.run+0.4,T.run+1.8)); if(t<T.doge) x=DOGE0[0]-2200*(1-kIn);
    else if(t<T.freeze){ const k=seg(t,T.doge,T.freeze); x=lerp(DOGE0[0],-1250,ein(k)); y=Math.sin(k*Math.PI*0.5)*110; key='DBA'; }   // lao + bật lên
    else if(t<T.pushB){ x=-1250+Math.sin(t*40)*1.5; y=110; key='DBA'; }    // khựng ĐỨNG giữa không trung
    else { const k=seg(t,T.pushB,T.pushB+0.7); x=lerp(-1250,DOGE0[0]-200,eout(k)); y=110*(1-ein(Math.min(1,k*1.6))); rot=0.35*(1-k); }   // bị đẩy văng ngược, rơi xuống cày rãnh
    blend(F,key,x,y,DOGE0[1],H*3,{tone:t>=T.mourn?'cold':'near',shadow:true,mist:0.3,rot,soft:true,glow:t>=T.doge&&t<T.pushB?['40,40,60',0.25]:null});
    if(t>=T.pushB+0.45&&t<T.pushB+1.6) K.smoke(F,{x:x+80,z:DOGE0[1],t0:T.pushB+0.45,n:5,spread:120,rise:60,life:1.2,size:120,seed:640,a:0.45,tint:'110,90,92'}); }

  // ═════════ PHE EVIL ═════════
  const AKA=[['MLEM',760,140,1,T.aka],['CHUD',620,-40,1.1,T.aka+0.5],['NINJA',760,-100,1.05,T.aka+1.0],['BAT',940,300,1,T.aka+1.5]];
  function akatsuki(F,t){ for(const [k,x,z,s,t0] of AKA){ if(t<t0) continue; const u=seg(t,t0,t0+0.32), y=900*Math.pow(1-u,2), sq=u>=1&&t<t0+0.5?1-0.12*Math.sin(seg(t,t0+0.32,t0+0.5)*Math.PI):1;
      let sy=sq; if(k==='NINJA'){ const cr=t>=T.crouch&&t<T.seal?eout(seg(t,T.crouch,T.slam))*(1-seg(t,T.slam+0.6,T.seal)):0; sy*=1-0.12*cr; }
      blend(F,k,x,y,z,H*s,{tone:'near',shadow:u>=1,mist:0.2,sy}); if(u>=1&&t<t0+1.2) K.smoke(F,{x,z,t0:t0+0.32,n:4,spread:60,rise:30,life:0.9,size:70,seed:700+(x|0),a:0.4,tint:'110,80,84'}); } }
  // binh đoàn ác quỷ: trồi lên theo từng cột khói (trước → sau) — ĐÔNG kín tới chân trời (anh: "bên evil mới cần đông")
  const PILLARS=[]; for(let i=0;i<22;i++){ const row=Math.floor(i/4); PILLARS.push({x:1300+((i%4)+0.5*(row%2))*1500+(hash(i+300)-0.5)*500,z:1500+row*1550+(hash(i+301)-0.5)*400,t:T.smoke+0.15+row*0.32+hash(i+302)*0.2}); }
  const ARMY_P=[]; (function(){ let i=0; for(let row=0;row<36;row++){ const z=640+row*260, n=30+row*2, span=5600+row*120;
      for(let c=0;c<n;c++){ const x=1000+c*(span/n)+hash(i*5+1)*110, zz=z+(hash(i*5+2)-0.5)*110; let tp=T.smoke+3; for(const p of PILLARS){ if(Math.hypot(p.x-x,p.z-zz)<1300){ tp=Math.min(tp,p.t+0.25+0.3*hash(i*5+4)); } }
        ARMY_P.push({x,z:zz,h:H*(0.95+0.4*hash(i*5+3)),ta:tp,ph:hash(i*5+5)*TAU}); i++; } } })();
  function armyP(F,t){ for(const m of ARMY_P){ if(t<m.ta) continue; const k=eout(seg(t,m.ta,m.ta+0.5)); blend(F,'SOUL',m.x,0,m.z,m.h,{tone:'soul',sy:0.3+0.7*k,a:Math.min(1,k*1.6),rot:Math.sin(t*1.7+m.ph)*0.04}); }
    const k=seg(t,T.smoke+0.9,T.smoke+1.7); if(k>0) blend(F,'GARY',1700,0,lerp(1500,1050,eout(k)),H*2.8,{tone:'near',a:Math.min(1,k*2),shadow:true,mist:0.4}); }
  // ấn triệu hồi: vệt lửa chạy từ tay Ninja toả khắp nửa bãi phải → vòng ký tự
  const NINJA1=[760,-100], SEAL_C=[3400,0,4200], SEAL_R=3600;
  const SEAL_LINES=Array.from({length:16},(_,i)=>{ const a=-1.3+i/15*2.6+(hash(i+700)-0.5)*0.12, L=SEAL_R*(0.9+0.6*hash(i+701)); return {a,L,seed:i}; });
  function sealGround(F,t){ if(t<T.slam) return; const k=eout(seg(t,T.slam+0.1,T.seal+1.4)), fade=1-seg(t,T.shard,T.dive), [ox,oz]=NINJA1; if(fade<=0.01) return;
    F.under.push(()=>{ const g=F.g; g.save(); g.lineCap='round'; g.lineJoin='round';
      lighter(g,()=>{ for(const s of SEAL_LINES){ const o=[]; const n=14; for(let j=0;j<=n;j++){ const f=j/n; if(f>k*1.15) break; const r=s.L*f, aa=s.a+Math.sin(f*5+s.seed)*0.08, p=K.proj(F.B,ox+Math.cos(aa)*r,2,oz+Math.sin(aa)*r); if(p) o.push(p); }
          if(o.length<2) continue; for(const [lw,a,c] of [[10,0.18,'255,60,20'],[4,0.7,'255,90,30'],[1.4,0.95,'255,220,160']]){ g.strokeStyle='rgba('+c+','+(a*fade)+')'; for(let j=1;j<o.length;j++){ const ss=(o[j-1].s+o[j].s)/2; g.lineWidth=Math.min(lw*1.2,Math.max(0.6,lw*ss*6)); g.beginPath(); g.moveTo(o[j-1].x,o[j-1].y); g.lineTo(o[j].x,o[j].y); g.stroke(); } } }
        const rk=seg(t,T.seal+0.4,T.smoke+0.2); if(rk>0) for(const rr of [0.45,0.78,1]){ const P=[]; for(let i=0;i<=72;i++){ if(i/72>eout(rk)) break; const a=-Math.PI/2+i/72*TAU, p=K.proj(F.B,SEAL_C[0]+Math.cos(a)*SEAL_R*rr,2,SEAL_C[2]+Math.sin(a)*SEAL_R*rr); if(p) P.push(p); }
          if(P.length<2) continue; g.strokeStyle='rgba(255,80,30,'+(0.8*fade)+')'; g.lineWidth=Math.min(4,Math.max(1,3*P[0].s*8)); g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y)); g.stroke();
          if(rr===0.78) for(let i=0;i<24;i++){ if(i/24>eout(rk)) break; const a=-Math.PI/2+i/24*TAU, p=K.proj(F.B,SEAL_C[0]+Math.cos(a)*SEAL_R*0.89,2,SEAL_C[2]+Math.sin(a)*SEAL_R*0.89); if(!p) continue; const s=Math.max(2,120*p.s);
            g.fillStyle='rgba(255,140,60,'+(0.85*fade)+')'; g.fillRect(p.x-s*0.5,p.y-s*0.08,s,s*0.16); g.fillRect(p.x-s*0.08,p.y-s*0.35,s*0.16,s*0.5*(0.5+hash(i))); } } });
      g.restore(); }); }
  // Friend
  const FR_LAND=[4400,0,11000];
  function friendStand(F,t,o){ o=o||{}; const k=t>=T.roar&&t<T.roar+1.4?'FR_ROAR':'FR', rise=eout(seg(t,T.stand-0.2,T.stand+1.2));
    return blend(F,k,FR_LAND[0],0,FR_LAND[2],H*(o.h||82),{tone:'friend',sy:0.85+0.15*rise,hi:true,d:-1500,glow:['255,70,120',0.18]}); }

  // ═════════ MÁY: mỗi shot 1 góc TĨNH (máy phía −z nhìn +z; trái = phe thiện, phải = phe Evil) ═════════
  const S=(t0,t1,a,b)=>({t0,t1,a,b:b||a,ease:'lin'});
  const shots=[
    S(0,T.push,{tx:-2600,ty:110,tz:0,dist:950,yaw:0,pitch:1,fov:50}),                       // 1 toàn thấp: 2 vệt lao vào nhau
    S(T.push,T.blue,{tx:-2700,ty:120,tz:0,dist:620,yaw:28,pitch:-1,fov:46}),                 // 2 qua vai Pain: lực đẩy dừng trên lớp Vô hạn
    S(T.blue,T.red,{tx:-2600,ty:110,tz:0,dist:860,yaw:-4,pitch:0,fov:48}),                    // 3 trung ngang: cầu Xanh hút Pain
    S(T.red,T.crater,{tx:-1100,ty:300,tz:0,dist:3000,yaw:0,pitch:2,fov:56}),                 // 4 toàn: cầu Đỏ — Pain văng xuyên 2 toà
    S(T.crater,T.appr,{tx:450,ty:70,tz:0,dist:520,yaw:-10,pitch:-3,fov:48}),                 // 5 trung thấp: Pain quỳ giữa hố
    S(T.appr,T.charge,{tx:-750,ty:95,tz:0,dist:1350,yaw:4,pitch:-2,fov:58}),              // 6 toàn thấp: Gojo lơ lửng tiến lại · đốm đỏ trong khói
    S(T.charge,T.stab,{tx:-450,ty:110,tz:0,dist:470,yaw:-6,pitch:-2,fov:46}),                // 7 trung chính diện: gom Xanh + Đỏ · LẶNG · bật kiếm
    S(T.stab,T.eye,{tx:-440,ty:110,tz:0,dist:380,yaw:-6,pitch:-2,fov:46}),                   // 9 trung gần: lưỡi đỏ xuyên ngực
    S(T.eye,T.slash,{tx:-457,ty:142,tz:0,dist:115,yaw:-6,pitch:-2,fov:44}),                  // 10 cận mặt: băng mắt tuột, mắt mở to
    S(T.slash,T.split,{tx:-450,ty:240,tz:0,dist:2300,yaw:0,pitch:1,fov:54}),                 // 11 toàn: 1 nhát chém ngang cắt cả khung
    S(T.split,T.reveal,{tx:-400,ty:75,tz:0,dist:430,yaw:4,pitch:2,fov:46}),                  // 12 trung tĩnh: đứt đôi (khựng dài)
    S(T.reveal,T.painUp,{tx:-660,ty:135,tz:40,dist:380,yaw:0,pitch:-7,fov:50}),            // 13 ngước: CATVADER lộ diện
    S(T.painUp,T.run,{tx:450,ty:80,tz:0,dist:400,yaw:-8,pitch:-4,fov:46}),                   // 14 trung: Pain ngẩng, Rinnegan loé
    S(T.run,T.banana,{tx:-1500,ty:140,tz:100,dist:1550,yaw:0,pitch:4,fov:54}),               // 15 toàn: phe thiện hốt hoảng chạy tới
    S(T.banana,T.doge,{tx:BANANA.x,ty:62,tz:BANANA.z,dist:230,yaw:4,pitch:-2,fov:44}),       // 16 cận Banana khóc thét
    S(T.doge,T.leap,{tx:-1150,ty:190,tz:0,dist:1250,yaw:3,pitch:1,fov:50}),                  // 17 trung ngang: Doge lao → Force giữ → văng
    S(T.leap,T.mourn,{tx:0,ty:320,tz:0,dist:2000,yaw:0,pitch:2,fov:54}),                     // 18 toàn: Catvader bật lùi về cạnh Pain
    S(T.mourn,T.aka,{tx:-1050,ty:0,tz:60,dist:1500,yaw:4,pitch:46,fov:50},{tx:-1050,ty:0,tz:60,dist:1420,yaw:4,pitch:47,fov:50}),   // 19 CAO nhìn xuống: phe thiện nhỏ bé quanh chỗ Gojo nằm
    S(T.aka,T.aka+0.5,{tx:760,ty:70,tz:140,dist:320,yaw:-4,pitch:-2,fov:46}),                // 20 Mlem đáp
    S(T.aka+0.5,T.aka+1.0,{tx:620,ty:75,tz:-40,dist:320,yaw:4,pitch:-2,fov:46}),             //    Chud đáp
    S(T.aka+1.0,T.aka+1.5,{tx:760,ty:72,tz:-100,dist:320,yaw:-4,pitch:-2,fov:46}),           //    Ninja đáp
    S(T.aka+1.5,T.ninja,{tx:780,ty:120,tz:100,dist:900,yaw:-8,pitch:-4,fov:50}),             //    Bat đáp · cả nhóm quanh Pain + Catvader (ngước)
    S(T.ninja,T.crouch,{tx:760,ty:118,tz:-100,dist:250,yaw:-4,pitch:-2,fov:42}),             // 21 cận Ninja · Sharingan
    S(T.crouch,T.seal,{tx:760,ty:75,tz:-100,dist:430,yaw:-10,pitch:-6,fov:50}),              //    ngồi thụp → ĐẬP tay
    S(T.seal,T.smoke,{tx:2600,ty:0,tz:2800,dist:4400,yaw:-10,pitch:55,fov:62}),              // 22 cao: ấn chạy khắp nửa bãi
    S(T.smoke,T.shard,{tx:2600,ty:520,tz:3400,dist:4300,yaw:-16,pitch:-2,fov:58}),           //    thấp toàn: cột khói nổ, binh đoàn bước ra (ngước)
    S(T.shard,T.sky,{tx:450,ty:190,tz:0,dist:330,yaw:-6,pitch:-4,fov:46}),                   // 23 cận Pain giơ mảnh linh hồn
    S(T.sky,T.dive,{tx:1600,ty:9000,tz:14000,dist:15000,yaw:-8,pitch:-34,fov:66}),           // 24 giun ngước: mây đỏ rực
    S(T.dive,T.land,{tx:1200,ty:2600,tz:9000,dist:11000,yaw:-6,pitch:-9,fov:64}),            //    Friend xé mây lao xuống
    S(T.land,T.stand,{tx:2600,ty:900,tz:9000,dist:11600,yaw:-8,pitch:-1,fov:60}),            //    nện xuống, tường bụi nuốt máy
    S(T.stand,T.roar+0.2,{tx:3000,ty:3000,tz:9000,dist:10147,yaw:-13.96,pitch:-16.3,fov:64}),    //    Friend đứng che nửa trời
    S(T.roar+0.2,T.wide,{tx:520,ty:260,tz:0,dist:900,yaw:-8,pitch:-14,fov:60}),             //    trung ngước: Pain + Catvader tiền cảnh, Friend gầm phía sau
    S(T.wide,T.split2,{tx:500,ty:420,tz:2600,dist:4700,yaw:14,pitch:8,fov:64}),               // 25 toàn: trái thưa thớt quanh chỗ Gojo nằm · phải biển quỷ + Friend
    S(T.split2,T.boom,{tx:0,ty:210,tz:900,dist:2300,yaw:0,pitch:5,fov:56}),                  // 26 chia đôi (ô riêng trong panels)
    S(T.boom,T.DUR,{tx:0,ty:210,tz:900,dist:2300,yaw:0,pitch:5,fov:56})];

  // ═════════ THẾ GIỚI ═════════
  const LAND_SIM={t0:T.land+0.05, key:'SIM', meta:SIMJ, x:FR_LAND[0], z:FR_LAND[2], size:24000, hold:true, twos:true};
  const LAND_GS={t0:T.land, x:FR_LAND[0], z:FR_LAND[2], K:9800, crack:9000, crater:2200, rocks:0, plates:0, seed:11, dust:400};
  function rubble(F){ for(const r of RUBBLE.concat(PILE.filter(p=>F.t>=p.ta))){ const P=K.proj(F.B,r.x,0,r.z); if(!P) continue; const R=r.r*P.s; if(R<0.8||R>70||P.x<-60||P.x>VW+60||P.y<-60||P.y>VH+60) continue;
      F.list.push({d:P.d+r.r, fn:()=>{ const g=F.g; g.save(); g.translate(P.x,P.y); g.rotate(r.a); g.fillStyle='#2b2528'; g.beginPath(); g.moveTo(-R,0); g.lineTo(-R*0.4,-R*0.55); g.lineTo(R*0.5,-R*0.45); g.lineTo(R,0); g.lineTo(R*0.3,R*0.18); g.closePath(); g.fill();
        g.fillStyle='#3d3539'; g.beginPath(); g.moveTo(-R*0.4,-R*0.55); g.lineTo(R*0.5,-R*0.45); g.lineTo(R*0.2,-R*0.2); g.closePath(); g.fill(); g.restore(); }}); } }
  // vá mặt đất SÁT MÁY (ô đất sau lưng máy bị bỏ → lộ dải sương đỏ ở đáy khung)
  function nearGround(F){ const th=theme(), B0=F.B, L=Math.hypot(B0.f[0],B0.f[2])||1, fx=B0.f[0]/L, fz=B0.f[2]/L, cam=B0.pos, TL=th.tile||260, RR=th.R||7000;
    const gx=F.cam.tx||0, gz=F.cam.tz||0; let D=Math.max(320,cam[1]*0.3); const dz=cam[2]<gz-RR&&fz>0.05?(gz-RR-cam[2])/fz:0, dx=cam[0]<gx-RR&&fx>0.05?(gx-RR-cam[0])/fx:cam[0]>gx+RR&&fx<-0.05?(cam[0]-gx-RR)/-fx:0; D=Math.max(D,dz+TL,dx+TL);
    const at=(d,w)=>K.proj(B0,cam[0]+fx*d-fz*w,0,cam[2]+fz*d+fx*w), p1=at(D,-9000), p2=at(D,9000); if(!p1||!p2||Math.min(p1.y,p2.y)>VH+20) return;
    const gc=th.ground[0].split(',').map(Number), fogRGB=th.fog.split(',').map(Number), fogD=RR*0.9, colAt=d=>{ const fk=clamp((d-fogD*0.25)/(fogD*0.75),0,1); return gc.map((x,n)=>Math.round(lerp(x,fogRGB[n],fk))); };
    F.under.unshift(()=>{ const g=F.g; g.save(); g.beginPath(); g.moveTo(p1.x,p1.y); g.lineTo(p2.x,p2.y); g.lineTo(p2.x,VH+3000); g.lineTo(p1.x,VH+3000); g.closePath(); g.clip();
      const far=colAt(D), near=colAt(0), q=at(Math.min(D,60),0), lg=g.createLinearGradient(0,Math.min(p1.y,p2.y),0,q?Math.max(q.y,VH):VH); lg.addColorStop(0,'rgb('+far+')'); lg.addColorStop(1,'rgb('+near+')'); g.fillStyle=lg; g.fillRect(-200,-200,VW+400,VH+3400);
      g.strokeStyle='rgba('+th.ground[2]+',0.5)'; g.lineWidth=1;
      const zA=cam[2]-TL*2, zB=cam[2]+Math.max(D,1)*Math.max(0.2,fz)+TL*3, xA=cam[0]-9000, xB=cam[0]+9000, seg2=(x0,z0,x1,z1)=>{ const n=24; let st=true; g.beginPath(); for(let i=0;i<=n;i++){ const P=K.proj(B0,lerp(x0,x1,i/n),0,lerp(z0,z1,i/n)); if(!P){ st=true; continue; } st?g.moveTo(P.x,P.y):g.lineTo(P.x,P.y); st=false; } g.stroke(); };
      for(let x=Math.ceil(xA/TL)*TL;x<=xB;x+=TL) seg2(x,zA,x,zB); for(let z=Math.ceil(zA/TL)*TL;z<=zB;z+=TL) seg2(xA,z,xB,z); g.restore(); }); }
  const after=(t,a)=>t>=a;
  function world(F,t){ F.t=t; settle(t); CITY.draw(F,t,theme(t)); nearGround(F); rubble(F); const sh=F.panel&&F.panel.side;
    for(let i=0;i<6;i++) K.smoke(F,{x:-6000+2400*i,z:11000+hash(i+20)*3000,t0:-3,n:4,spread:1500,rise:2800,life:90,size:1500,seed:800+i,a:0.3,tint:'70,50,52'});   // khói cột chân trời
    if(sh==='G'){ goodSide(F,t,{skip:m=>m!==CHILL,rage:true}); gojoShadow(F,t); blindfold(F,t); return; }   // Chill Guy gần như đứng 1 mình
    if(sh==='P'){ pain(F,t); vader(F,t); akatsuki(F,t); sealGround(F,t); armyP(F,t); if(t>=T.stand) friendStand(F,t,{h:95}); return; }
    // ── A · B: Gojo vs Pain
    if(t<T.reveal){ gojo(F,t); gojoSplit(F,t); }
    gojoShadow(F,t); pain(F,t); floatRocks(F,t); vader(F,t);
    if(t<T.hit+0.1){ const k=seg(t,0,T.hit); for(const [x0,x1,col] of [[GX0-900,GX0+150,'140,200,255'],[PX0+900,PX0-150,'200,120,255']]) { const P=K.proj(F.B,lerp(x0,x1,ein(k)),90,0), Q=K.proj(F.B,lerp(x0,x1,Math.max(0,ein(k)-0.25)),90,0); if(P&&Q) F.list.push({d:P.d-50,fn:()=>lighter(F.g,()=>{ const g=F.g; g.lineCap='round'; g.strokeStyle=`rgba(${col},0.7)`; g.lineWidth=14*P.s+3; g.beginPath(); g.moveTo(Q.x,Q.y); g.lineTo(P.x,P.y); g.stroke(); g.strokeStyle='rgba(255,255,255,0.95)'; g.lineWidth=4*P.s+1; g.beginPath(); g.moveTo(Q.x,Q.y); g.lineTo(P.x,P.y); g.stroke(); })}); } }   // 2 vệt lao vào nhau
    if(t>=T.push&&t<T.blue){ const k=eout(seg(t,T.push+0.05,T.pHit)); field(F,lerp(PX0-40,GX0+120,k),90,0,150,1-0.5*seg(t,T.pHit,T.blue)); infinity(F,GX0,85,0,135,t,0.35+0.65*seg(t,T.pHit-0.1,T.pHit+0.1)); }   // lực đẩy dội vào lớp Vô hạn, dừng sát mặt Gojo
    if(t>=T.blue&&t<T.red) elemOrb(F,GX0+110,95,-10,26,t,'90,170,255',true,eout(seg(t,T.blue,T.blue+0.2)));   // cầu Xanh hút
    if(t>=T.red-0.05&&t<T.red+0.25) elemOrb(F,lerp(GX0+110,-2550,seg(t,T.red-0.05,T.red+0.1)),95,-10,32,t,'255,80,70',false,1-seg(t,T.red+0.1,T.red+0.25));   // cầu Đỏ đấm thẳng
    if(t>=T.red&&t<T.crater+1.2) K.smoke(F,{x:CRATER[0]+60,z:120,t0:T.crash,n:6,spread:260,rise:140,life:1.6,size:130,seed:540,a:0.3,tint:'110,90,92'});   // hố Pain rơi
    for(const b of MINE) if(t>=b.ta&&t<b.ta+2.2) K.smoke(F,{x:b.cx,z:0,t0:b.ta,n:7,spread:260,rise:500,life:2,size:260,seed:560+b.seed%7,a:0.5,tint:'100,84,88'});   // 2 toà sập theo
    if(t>=T.charge&&t<T.slash){ const [gx]=gojoPos(t), fz=seg(t,T.fizz,T.fizz+0.5), gm=seg(t,T.charge,T.hush), a=1-fz, sep=fz*60;   // gom Xanh (trái) + Đỏ (phải) về giữa · bị đâm thì trôi lệch nhau rồi xì tắt
      const eyeK=t>=T.eye?0.3:1; elemOrb(F,gx+40-30*gm-sep,100+Math.sin(t*3)*3,-20,14+14*gm,t,'90,170,255',true,eyeK*a*eout(seg(t,T.charge,T.charge+0.3)));
      elemOrb(F,gx+95+30*gm+sep,100+Math.sin(t*3+1)*3,-20,14+14*gm,t,'255,80,70',false,eyeK*a*eout(seg(t,T.charge+0.2,T.charge+0.5)));
      if(t<T.eye) infinity(F,gx,95,0,135,t,0.8*(1-seg(t,T.charge+0.6,T.hush)));   // lớp Vô hạn MỜ đi vì dồn hết lực vào Purple
      if(fz>0&&fz<1) K.smoke(F,{x:gx+65,z:-20,t0:T.fizz,n:5,spread:40,rise:60,life:0.9,size:50,seed:580,a:0.4,tint:'150,90,200'}); }   // xì tắt thành khói tím
    if(t>=T.appr&&t<T.charge) K.smoke(F,{x:-2000,z:900,t0:T.appr-2,n:6,spread:500,rise:200,life:8,size:380,seed:590,a:0.45,tint:'80,64,70'});   // khói sau lưng Gojo (Catvader nấp trong đó)
    if(t>=T.reveal&&t<T.reveal+1.8) K.smoke(F,{x:VADER0[0],z:VADER0[1]+60,t0:T.reveal-0.6,n:6,spread:160,rise:120,life:2.4,size:160,seed:610,a:0.6*(1-seg(t,T.reveal,T.reveal+1.8)),tint:'70,60,64'});   // khói tan dần quanh Catvader
    // ── C · D
    forceZone(F,t); goodSide(F,t); buffDoge(F,t); akatsuki(F,t); sealGround(F,t);
    if(t>=T.painUp-0.1&&t<T.run) rinnegan(F,t,seg(t,T.painUp+0.3,T.painUp+0.5)*(0.75+0.25*Math.sin(t*14)));
    if(t>=T.crater&&t<T.appr) rinnegan(F,t,0.5*Math.max(0,Math.sin(t*9))*(1-seg(t,T.crater,T.appr)));   // nhấp nháy mờ dần
    if(t>=T.smoke){ for(const [i,p] of PILLARS.entries()) K.smoke(F,{x:p.x,z:p.z,t0:p.t,n:6,spread:420,rise:2600,life:2.6,size:900,seed:900+i,a:0.85,tint:'40,14,16'}); armyP(F,t); }
    if(t>=T.land){ B.groundShock(F,t,LAND_GS); LAND_SIM.alpha=1-seg(t,T.stand+0.2,T.stand+1.2); if(LAND_SIM.alpha>0.01) B.simSprite(F,t,LAND_SIM); }
    if(t>=T.land-0.05&&t<T.land+0.5){ const k=seg(t,T.land-0.05,T.land+0.5); blend(F,'FR_DIVE',FR_LAND[0]-1800*(1-k),-H*26*eout(k),FR_LAND[2],H*48,{tone:'fire',rot:0.85,hi:true,d:-800}); }
    if(t>=T.stand) friendStand(F,t); }

  // ═════════ MÀN HÌNH ═════════
  const STROBES=[[T.hit,'bw wb',0.5,0.5],[T.stab,'k r k',0.5,0.5],[T.slam,'bw wb bw',0.5,0.78],[T.land,'wb bw k wb w',0.6,0.55]];
  const strobeAt=t=>B.strobe(t,STROBES);
  let CL=null;
  function cloudDeck(F,t,o){ const g=F.g, SC=F.SC||1; if(!CL||CL.width!==Math.round(VW*SC)){ CL=K.mk(VW*SC,VH*SC); } const x=CL.getContext('2d'); x.setTransform(SC,0,0,SC,0,0); x.globalCompositeOperation='source-over'; x.clearRect(0,0,VW,VH);
    const yb=o.base, hx=o.hx, hy=o.hy, hr=o.hr, glow=o.glow, R=o.r, rows=Math.max(2,Math.ceil((yb+R)/(R*0.62)));
    x.fillStyle='#1c0812'; x.fillRect(0,0,VW,Math.max(0,yb-R*0.9));
    for(let L=0;L<rows;L++){ const y0=yb-(rows-1-L)*R*0.62, sc=0.75+0.35*L/rows;
      for(let i=0;i<16;i++){ const cx=((i+0.5*(L%2))/15)*(VW+2*R)-R+((t*(4+2*L))%(R*0.5)), rr=R*sc*(0.75+0.45*hash(i*7+L*13)), cy=y0+(hash(i*3+L)-0.5)*R*0.25, d=Math.hypot(cx-hx,(cy-hy)*1.6), near=clamp(1-d/(VW*0.6),0,1);
        x.fillStyle=['#24091a','#2e0c20','#3a1026'][L%3]; x.beginPath(); x.ellipse(cx,cy,rr,rr*0.52,0,0,TAU); x.fill();
        const lit=0.25+0.75*near*glow; x.fillStyle='rgba('+Math.round(120+135*near)+','+Math.round(30+60*near*glow)+','+Math.round(50+20*near)+','+(0.55*lit)+')'; x.beginPath(); x.ellipse(cx,cy+rr*0.22,rr*0.86,rr*0.28,0,0,TAU); x.fill(); } }
    if(glow>0){ x.globalCompositeOperation='source-atop'; const rg=x.createRadialGradient(hx,hy,0,hx,hy,hr*3.4); rg.addColorStop(0,'rgba(255,190,110,'+(0.9*glow)+')'); rg.addColorStop(0.3,'rgba(255,80,60,'+(0.6*glow)+')'); rg.addColorStop(1,'rgba(120,20,40,0)'); x.fillStyle=rg; x.fillRect(0,0,VW,VH); }
    if(o.hole>0){ const hole=()=>{ x.beginPath(); for(let i=0;i<=44;i++){ const a=i/44*TAU, w=hr*o.hole*(0.72+0.5*hash(i*5+3)); i?x.lineTo(hx+Math.cos(a)*w,hy+Math.sin(a)*w*0.6):x.moveTo(hx+Math.cos(a)*w,hy+Math.sin(a)*w*0.6); } x.closePath(); };
      x.globalCompositeOperation='destination-out'; hole(); x.fill(); x.globalCompositeOperation='source-over';
      lighter(x,()=>{ hole(); x.strokeStyle='rgba(255,210,130,'+(0.9*glow)+')'; x.lineWidth=3; x.stroke(); x.strokeStyle='rgba(255,90,50,'+(0.4*glow)+')'; x.lineWidth=14; x.stroke(); }); }
    x.globalCompositeOperation='source-over'; g.save(); g.setTransform(1,0,0,1,0,0); g.drawImage(CL,0,0); g.restore(); }
  function friendDive(F,t){ const g=F.g, u=seg(t,T.dive,T.land), e=ein(u)*0.75+u*0.25, c=K.prep(F.I.FR_DIVE); if(!c) return;
    const x0=VW*0.3, y0=VH*0.02, x1=VW*0.74, y1=VH*0.9, x=lerp(x0,x1,e), y=lerp(y0,y1,e), hh=VH*lerp(0.55,0.95,e), ww=hh*c.sw/c.sh, an=Math.atan2(y1-y0,x1-x0);
    lighter(g,()=>{ const L=Math.hypot(x-x0,y-y0)+hh*0.6; g.save(); g.translate(x,y); g.rotate(an+Math.PI); const gr=g.createLinearGradient(0,0,L,0); gr.addColorStop(0,'rgba(255,230,170,0.9)'); gr.addColorStop(0.25,'rgba(255,120,50,0.6)'); gr.addColorStop(1,'rgba(160,30,40,0)');
      g.fillStyle=gr; g.beginPath(); g.moveTo(0,-hh*0.42); g.quadraticCurveTo(L*0.5,-hh*0.3,L,0); g.quadraticCurveTo(L*0.5,hh*0.3,0,hh*0.42); g.closePath(); g.fill(); g.restore();
      glowDot(g,x+Math.cos(an)*ww*0.35,y+Math.sin(an)*ww*0.35,hh*0.75,'255,170,80',0.55); });
    const b=bake(F,'FR_DIVE','fire',true); if(b){ g.save(); g.translate(x,y); g.rotate(an); g.imageSmoothingEnabled=false; g.drawImage(b.cv,-ww/2,-hh/2,ww,hh); g.restore(); }
    lighter(g,()=>{ for(let i=0;i<10;i++){ const f=hash(i+950), off=(hash(i+951)-0.5)*hh*0.8, px=x-Math.cos(an)*ww*(0.3+f)+Math.sin(an)*off, py=y-Math.sin(an)*ww*(0.3+f)-Math.cos(an)*off; glowDot(g,px,py,hh*0.06,'255,210,140',0.5*(1-f)); } }); }
  function cloudTear(F,t){ const g=F.g, u=seg(t,T.dive,T.dive+1.6), hx=VW*0.3, hy=VH*0.06; if(u<=0||u>=1) return; for(let i=0;i<24;i++){ const a=i/24*TAU, d=VW*(0.08+0.55*eout(u))*(0.8+0.4*hash(i+960)), r=VW*(0.06+0.05*hash(i+961))*(1-0.4*u);
      g.save(); g.globalAlpha=0.9*(1-u); g.fillStyle=i%2?'#4e1a30':'#6a2236'; g.beginPath(); g.ellipse(hx+Math.cos(a)*d,hy+Math.sin(a)*d*0.35,r,r*0.5,a,0,TAU); g.fill(); g.restore(); } }
  // tro rơi như tuyết (lớp màn hình, cho các khung phe thiện tang thương) — băm theo giây, không Math.random
  function ash(F,t,a,x0,x1){ if(a<=0.01) return; const g=F.g; x0=x0||0; x1=x1||VW; g.save(); for(let i=0;i<70;i++){ const sp=14+20*hash(i+1300), y=((hash(i+1301)*VH+t*sp)%(VH+20))-10, x=x0+((hash(i+1302)*(x1-x0)+Math.sin(t*0.8+i)*14)%(x1-x0+1)), r=0.8+1.8*hash(i+1303);
      g.globalAlpha=a*(0.35+0.5*hash(i+1304)); g.fillStyle=i%3?'#d8d4d8':'#a8a0a8'; g.beginPath(); g.arc(x,y,r,0,TAU); g.fill(); } g.restore(); }
  const title=(g,txt,sub,y,a,col,size)=>{ if(a<=0.01) return; g.save(); g.globalAlpha=a; g.textAlign='center'; g.shadowColor='rgba(0,0,0,0.85)'; g.shadowBlur=10;
    g.fillStyle=col||'#ffe2d0'; g.font='900 '+Math.round(VH*(size||0.075))+'px Shojumaru, Georgia, serif'; g.fillText(txt,VW/2,VH*y);
    if(sub){ g.fillStyle='rgba(255,170,150,0.95)'; g.font='700 '+Math.round(VH*0.03)+'px Montserrat, Arial, sans-serif'; g.fillText(sub,VW/2,VH*(y+0.07)); } g.restore(); };
  const line=(g,txt,a)=>{ if(a<=0.01) return; g.save(); g.globalAlpha=a; g.textAlign='center'; g.font='italic 700 '+Math.round(VH*0.052)+'px Montserrat, Arial, sans-serif'; g.lineWidth=5; g.strokeStyle='rgba(0,0,0,0.85)'; g.strokeText(txt,VW/2,VH*0.86); g.fillStyle='#ffffff'; g.fillText(txt,VW/2,VH*0.86); g.restore(); };   // thoại = chữ (không lồng giọng)
  let SL=null;   // bộ đệm cho nhát chém "cắt cả khung"
  function sliceFrame(F,t){ if(t<T.cut||t>=T.cut+0.55) return; const g=F.g, cv=g.canvas, SC=F.SC||1, u=seg(t,T.cut,T.cut+0.55), yL=VH*0.6;
    if(!SL) SL=document.createElement('canvas'); if(SL.width!==cv.width||SL.height!==cv.height){ SL.width=cv.width; SL.height=cv.height; } const x=SL.getContext('2d'); x.setTransform(1,0,0,1,0,0); x.clearRect(0,0,SL.width,SL.height); x.drawImage(cv,0,0);
    const off=eout(Math.min(1,u*3))*VW*0.012*(1-seg(u,0.6,1));
    g.save(); g.setTransform(1,0,0,1,0,0); g.beginPath(); g.rect(0,0,cv.width,yL*SC); g.clip(); g.fillStyle='#000'; g.fillRect(0,0,cv.width,yL*SC); g.drawImage(SL,off*SC,-off*0.25*SC); g.restore();   // nửa trên cả khung trượt lệch theo đường chém
    lighter(g,()=>{ const a=1-u; g.fillStyle=`rgba(255,60,40,${0.35*a})`; g.fillRect(0,yL-VH*0.03,VW,VH*0.06); g.fillStyle=`rgba(255,240,230,${a})`; g.fillRect(0,yL-1.5,VW,3); }); }
  function smearSlash(F,t){ if(t<T.slash+0.05||t>=T.cut+0.12) return; const g=F.g, u=seg(t,T.slash+0.05,T.cut+0.02), yL=VH*0.6; const xh=lerp(-VW*0.2,VW*1.2,eout(u));
    lighter(g,()=>{ const lg=g.createLinearGradient(xh-VW*0.6,0,xh,0); lg.addColorStop(0,'rgba(255,40,30,0)'); lg.addColorStop(1,'rgba(255,90,60,0.85)'); g.fillStyle=lg; g.beginPath(); g.moveTo(xh-VW*0.6,yL-2); g.quadraticCurveTo(xh-VW*0.2,yL-VH*0.05,xh,yL); g.quadraticCurveTo(xh-VW*0.2,yL+VH*0.03,xh-VW*0.6,yL+2); g.closePath(); g.fill();
      g.fillStyle='rgba(255,245,240,0.95)'; g.fillRect(xh-VW*0.35,yL-1.5,VW*0.35,3); }); }
  const def={ id:'fin1c7', title:'Final 1 · Kết · Đánh lén', DUR:T.DUR, VW, VH, fadeIn:false, fadeOut:true, imgs:IMG, theme:t=>theme(t), shots, world,
    cast:['fr','mlem','ninja','gary','catvader','dp','mw','doge','bananacat','cry','lightsaber'],
    sfxOk:{demon_roar1:'tiếng gầm quỷ của phim — đúng binh đoàn ác quỷ', burn_loop:'tiếng lửa cháy chung — vệt lửa của ấn triệu hồi'},
    // 26 CHIA ĐÔI chéo: ô trái Chill Guy (gần như 1 mình) · ô phải Pain + Catvader
    panels:t=>t>=T.split2&&t<T.boom?[{cam:{tx:CHILL.x+120,ty:72,tz:CHILL.z,dist:270,yaw:6,pitch:-6,fov:52},clip:[[0,0],[0.56,0],[0.44,1],[0,1]],side:'G'},
                                     {cam:{tx:330,ty:150,tz:0,dist:480,yaw:-6,pitch:-10,fov:56},clip:[[0.56,0],[1,0],[1,1],[0.44,1]],side:'P'}]:null,
    sfx:[[0.05,'se_whoosh_fast',0.6,0.6,'+ vút: 2 vệt Gojo + Pain lao vào nhau (lớp mở của cú va)'],[T.hit,'cine_haki_hit',1,0.7,'va nhau giữa bãi, sóng chấn'],
      [T.push+0.05,'ep3_force',1,0.8,'Pain tung Almighty Push'],[T.pHit,'cine_deep_impact',0.8,0.6,'+ lực đẩy dội vào lớp Vô hạn rồi dừng sát mặt Gojo (lớp của Almighty Push)'],
      [T.blue,'l2p_riser',0.7,1.0,'Gojo búng tay: cầu Xanh hút Pain trượt tới (tiếng hút dâng)'],
      [T.red,'cine_impact',1,0.6,'cầu Đỏ đấm thẳng Pain'],[T.red+0.02,'ep3_explode',0.7,0.9,'+ nổ đỏ hất Pain văng (lớp của cầu Đỏ)'],
      [MINE[0].ta,'se_collapse',0.8,1.4,'Pain văng xuyên toà nhà thứ nhất, mảng tường đổ rơi xuống'],[MINE[1].ta,'se_rock_break',0.7,1.0,'+ Pain văng xuyên toà thứ hai, bê tông vỡ vụn (lớp của cú văng)'],
      [T.crash,'cine_heavy_slow',0.9,1.0,'Pain rơi đập xuống thành hố'],
      [T.glint,'ep3_breath',0.25,0.8,'đốm đỏ trong khói sau lưng Gojo, tiếng thở rất khẽ (gài)'],
      [T.charge,'ep3_charge',0.7,T.hush-T.charge,'Gojo gom cầu Xanh + Đỏ, gió và đá bị hút về'],
      [T.ignite,'lightsaber_on',0.9,0.6,'tiếng bật kiếm laze ngay sau lưng Gojo'],[T.stab,'se_super_hit',0.8,0.5,'lưỡi laze đỏ đâm xuyên ngực Gojo'],[T.stab+0.02,'se_impact_stop',0.6,0.4,'+ khựng đúng khung xuyên (lớp của cú đâm)'],
      [T.fizz,'l2p_shimmer',0.5,0.6,'2 cầu xanh đỏ chập chờn rồi xì tắt'],
      [T.slash,'lightsaber_whoosh_01',0.9,0.5,'Catvader rút kiếm, xoay người chém ngang'],[T.cut,'ed_hit7',0.8,0.5,'+ nhát chém cắt ngang cả khung (lớp của nhát chém)'],
      [T.split+0.4,'cine_drop',0.5,0.6,'nửa trên của Gojo ngả rơi xuống chạm đất'],
      [T.reveal+0.2,'catvader_breathe',0.8,1.4,'khói tan, Catvader đứng sau lưng, thở máy'],
      [T.painUp+0.3,'ep3_shine',0.5,0.6,'Pain ngẩng lên, Rinnegan loé sáng lại'],
      [T.run,'se_step_in',0.6,0.8,'phe thiện hốt hoảng chạy tới'],
      [T.banana,'cry_banana_cat',0.9,1.2,'Banana Cat khóc thét'],
      [T.doge+0.05,'cine_haki_hit',0.7,0.4,'Buff Doge bật Haki lao vào Catvader'],[T.freeze,'ep3_force',0.8,0.9,'Catvader giơ tay dùng Force: Doge đứng khựng giữa không trung'],
      [T.pushB,'cine_deep_impact',0.8,0.6,'Force đẩy Doge văng ngược về phe mình'],[T.pushB+0.5,'se_rock_break',0.5,0.6,'+ Doge rơi cày rãnh đất'],
      [T.leap,'ep3_whoosh',0.5,0.5,'Catvader bật lùi 1 vòng qua đống đổ nát (vút)'],[T.landV,'se_step_in',0.6,0.4,'Catvader đáp xuống cạnh Pain'],
      [T.aka+0.3,'se_step_in',0.5,0.3,'Mlem đáp xuống'],[T.aka+0.8,'cine_drop',0.5,0.4,'+ Chud rơi đáp xuống (lớp của nhóm Akatsuki đáp)'],[T.aka+1.8,'se_step_in',0.45,0.3,'+ Bat đáp xuống (lớp của nhóm Akatsuki đáp)'],
      [T.shar,'l2p_shimmer',0.6,0.4,'Sharingan xoay'],
      [T.slam,'kn_boom_low',0.9,1.0,'Ninja ĐẬP tay xuống đất, đất nổ rền'],[T.slam+0.02,'se_super_hit',0.6,0.5,'+ lớp đập chát (Ninja đập tay)'],
      [T.seal,'burn_loop',0.6,1.8,'ấn triệu hồi chạy như vệt lửa cháy khắp nửa bãi'],
      [T.smoke+0.15,'se_bomb',0.6,0.6,'cột khói nổ bùng lần lượt'],[T.smoke+0.8,'demon_roar1',0.8,1.4,'binh đoàn ác quỷ trồi lên gầm vang'],[T.smoke+1.0,'gary_titan_roar',0.7,1.4,'+ Evil Gary gầm (lớp của triệu hồi)'],
      [T.shard,'l2p_chime',0.6,1.0,'Pain giơ mảnh linh hồn Friend, loé tím'],
      [T.sky,'l2p_rumble',0.8,1.4,'mây đỏ rực từ bên trong, cháy ra 1 lỗ'],
      [T.dive,'fr_dash',0.9,1.6,'Friend lao đầu xé toạc tầng mây'],[T.dive+0.3,'se_whoosh_fast',0.6,1.2,'+ xé gió (lớp của Friend lao)'],
      [T.land,'se_big_explode',1,2.0,'Friend nện ĐẬP xuống đất sau phe Evil, nổ tung'],[T.land+0.06,'kn_explode_crunch',0.8,1.4,'+ lớp đất vỡ vụn (Friend nện)'],[T.land+0.12,'se_quake',0.8,1.8,'+ đất nứt rung chuyển (lớp của Friend nện)'],
      [T.roar,'fr_titan_roar',0.9,1.6,'Friend đứng che nửa trời, gầm'],
      [T.split2,'l2p_whoosh',0.7,0.6,'màn hình chia đôi: Chill Guy / Pain + Catvader'],[T.boom,'l2p_explode',1,2.0,'BÙM — nổ trắng xoá']],
    // 🎵 A: nối nhạc trận Gojo (mus_honored) → TẮT CỤT lúc lặng trước cú đâm · (Imperial March / nhạc buồn / nhạc phe Evil: chờ tải bài — xem kịch bản)
    // Imperial March (theme Catvader — 1 lần, đúng lúc lộ diện) → Sadness and Sorrow (Naruto, Banana khóc → đứng quanh chỗ Gojo nằm) → Despair (Naruto Shippuden, phe Evil tập hợp:
    //   khúc lặng của bài rơi đúng lúc Pain giơ mảnh linh hồn / Friend lao, bùng lại lúc Friend đứng dậy) · 3 file đã CẮT chỉ giữ đoạn dùng (game tải hết assets/ lúc khởi động)
    mus:[{src:'assets/audio/mus_honored.m4a',ra:0,rb:T.hush,off:96,vol:0.32,fi:0.3,fo:0.08},
      {src:'assets/audio/mus_imperial.m4a',ra:T.reveal,rb:T.banana-0.2,off:0.05,vol:0.42,fi:0.05,fo:0.9},
      {src:'assets/audio/mus_sadness.m4a',ra:T.banana,rb:T.aka,off:0.2,vol:0.4,fi:0.4,fo:0.8},
      {src:'assets/audio/mus_despair.m4a',ra:T.aka,rb:T.boom+0.2,off:0.4,vol:0.45,fi:0.5,fo:0.2}],
    duckAuto:{decisive:[T.land]},
    impact:t=>{ const s=strobeAt(t); return B.impactOf(s,true); },
    grade:t=>{ const s=strobeAt(t); if(s) return B.gradeOf(s)||{}; if(t>=T.boom&&t<T.boom+0.4) return {white:1-seg(t,T.boom+0.2,T.boom+0.4)};
      const E=K.edit; if(t>=T.split&&t<T.reveal) return {sat:lerp(1,0.55,seg(t,T.split,T.split+1.2))};   // đứt đôi: màu rút dần (khựng, bi thương)
      if(t>=T.mourn&&t<T.aka) return E.mix({sat:0.6,bright:0.92},E.duotone(t,T.mourn,T.aka,'#05070d','#9fb2d0',0.3,0.5));   // tang thương: lạnh, nhạt
      return E.mix(E.duotone(t,T.smoke,T.smoke+2.4,'#1a0000','#ff4030',0.22,0.3),E.duotone(t,T.sky,T.stand+1,'#0d0518','#c06090',0.3,0.3),E.rgb(t,T.land+0.2,0.5,9),E.rgb(t,T.cut,0.4,7)); },
    shake:t=>{ let s=0; const h=(a,amp,d)=>{ if(t>=a&&t<a+d) s=Math.max(s,amp*(1-(t-a)/d)); };
      h(T.hit,8,0.4); h(T.pHit,4,0.3); h(T.red,9,0.5); h(T.crash,10,0.6); for(const b of MINE) h(b.ta,6,0.5); h(T.stab,5,0.3); h(T.cut,7,0.4); h(T.pushB,6,0.4); h(T.slam,9,0.5); h(T.smoke+0.2,4,1.6);
      h(T.sky,3,1.4); if(t>=T.dive&&t<T.land) s=Math.max(s,2+4*seg(t,T.dive,T.land)); h(T.land,16,1.4); h(T.roar,6,1.2); h(T.boom,18,0.4); return s; },
    post(F,t){ const fx={shocks:[]}, sh=(a,x,y,z,rm,d,str)=>{ if(t>=a&&t<a+d){ const u=(t-a)/d; fx.shocks.push({x,y,z,r:20+rm*eout(u),w:60,str:str*(1-u)}); fx.chroma=Math.max(fx.chroma||0,0.3*(1-u)); } };
      sh(T.hit,-2600,90,0,900,0.5,18); sh(T.pHit,GX0+120,90,0,300,0.4,10); sh(T.red,-2550,95,0,1200,0.5,16); sh(T.freeze,-1000,140,20,500,0.4,10); sh(T.slam,NINJA1[0],0,NINJA1[1],1600,0.5,18); sh(T.land+0.1,FR_LAND[0],0,FR_LAND[2],9000,0.9,24); return fx; },
    screen(F,t){ const g=F.g, s=strobeAt(t);
      if(s){ B.impactOverlay(F,s); return; }
      if(t>=T.slash&&t<T.split){ smearSlash(F,t); sliceFrame(F,t); }
      // chữ / thoại (chỉ tiếng Anh, không lồng giọng)
      if(t>=T.say&&t<T.charge) line(g,"It's over, Pain.",seg(t,T.say,T.say+0.2)*(1-seg(t,T.charge-0.25,T.charge)));
      if(t>=T.charge+0.7&&t<T.stab){ const a=seg(t,T.charge+0.7,T.charge+0.9)*(t>=T.hush?0.7+0.3*Math.sin(t*30):1); g.save(); g.beginPath(); g.rect(0,0,VW*(0.5+0.07*Math.sin(t*2)),VH); g.clip();   // HOLLOW PURPLE hiện DỞ 1 nửa (chưa kịp bắn)
        title(g,'HOLLOW PURPLE','IMAGINARY TECHNIQUE  ·  ERASES ALL MATTER',0.17,a,'#e6d0ff'); g.restore(); }
      if(t>=T.banana+0.15&&t<T.doge) { const a=seg(t,T.banana+0.15,T.banana+0.3); g.save(); g.globalAlpha=a; g.textAlign='center'; g.translate(VW*0.5+(hash(Math.floor(t*20))-0.5)*6,VH*0.2); g.font='900 '+Math.round(VH*0.11)+'px Montserrat, Arial Black, sans-serif'; g.lineWidth=8; g.strokeStyle='#000'; g.strokeText('NOOOO!',0,0); g.fillStyle='#ffffff'; g.fillText('NOOOO!',0,0); g.restore(); }
      if(t>=T.mourn&&t<T.aka) ash(F,t,seg(t,T.mourn,T.mourn+1)*(1-seg(t,T.aka-0.4,T.aka)));
      if(t>=T.wide&&t<T.split2) ash(F,t,0.7,0,VW*0.45);
      if(t>=T.split2&&t<T.boom) ash(F,t,0.6,0,VW*0.5);
      // 21 · Sharingan xoay
      if(t>=T.shar&&t<T.crouch){ const c=K.prep(F.I.SHAR), u=seg(t,T.shar,T.crouch); g.save(); g.fillStyle='rgba(20,0,0,0.78)'; g.fillRect(0,0,VW,VH); if(c){ const sz=VH*(0.9+0.15*u); g.translate(VW/2,VH/2); g.rotate(u*4.2); g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,-sz/2,-sz/2,sz,sz); } g.restore(); }
      if(t>=T.slam+0.15&&t<T.seal+0.9) title(g,'KUCHIYOSE NO JUTSU','SUMMONING TECHNIQUE  ·  CALLS FORTH THE LEGION OF HELL',0.2,seg(t,T.slam+0.15,T.slam+0.35)*(1-seg(t,T.seal+0.5,T.seal+0.9)));
      // 23 · mảnh linh hồn Friend trong tay Pain
      if(t>=T.shard&&t<T.sky){ const k=eout(seg(t,T.shard,T.shard+0.6)), x=VW*0.66, y=VH*0.3-k*VH*0.05, sz=VH*0.075;
        g.save(); g.translate(x,y); g.rotate(Math.sin(t*2)*0.2); lighter(g,()=>glowDot(g,0,0,sz*3.4,'190,120,255',0.65*k*(0.75+0.25*Math.sin(t*9)))); g.globalAlpha=k;
        g.fillStyle='rgba(205,155,255,0.95)'; g.strokeStyle='#ffffff'; g.lineWidth=2; g.beginPath(); g.moveTo(0,-sz); g.lineTo(sz*0.45,-sz*0.1); g.lineTo(sz*0.2,sz*0.9); g.lineTo(-sz*0.35,sz*0.3); g.lineTo(-sz*0.4,-sz*0.4); g.closePath(); g.fill(); g.stroke(); g.restore();
        if(t>=T.quiet) lighter(g,()=>glowDot(g,x,y,VW*0.5*seg(t,T.quiet,T.sky),'150,80,255',0.25)); }
      if(t>=T.sky&&t<T.dive){ const u=seg(t,T.sky,T.dive); cloudDeck(F,t,{base:VH*0.78,r:VW*0.11,hx:VW*0.5,hy:VH*0.3,hr:VW*0.13,glow:0.25+0.75*u,hole:ein(seg(t,T.sky+0.5,T.dive))*0.85}); }
      if(t>=T.dive&&t<T.land){ cloudDeck(F,t,{base:VH*0.3,r:VW*0.075,hx:VW*0.3,hy:VH*0.08,hr:VW*0.16,glow:1-0.5*seg(t,T.dive,T.land),hole:1}); friendDive(F,t); cloudTear(F,t); K.speedLines(F,{k:0.35+0.4*seg(t,T.dive,T.land),cx:VW*0.74,cy:VH*0.95,n:50}); }
      const dust=k=>{ if(k<=0.01) return; g.save(); g.globalAlpha=k; g.fillStyle='#5e4044'; g.fillRect(0,0,VW,VH); for(let i=0;i<14;i++){ const px=(hash(i+980)*1.3-0.15)*VW+Math.sin(t*0.7+i)*40, py=(hash(i+981)*1.2-0.1)*VH-t*12%40, r=VW*(0.18+0.16*hash(i+982));
          const rg=g.createRadialGradient(px,py,0,px,py,r); rg.addColorStop(0,i%2?'rgba(140,100,96,0.55)':'rgba(40,24,28,0.45)'); rg.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=rg; g.fillRect(px-r,py-r,2*r,2*r); } g.restore(); };
      if(t>=T.land&&t<T.stand) dust(seg(t,T.land+0.9,T.land+1.7));
      if(t>=T.stand&&t<T.stand+0.9) dust(0.9*(1-ein(seg(t,T.stand,T.stand+0.9))));
      if(t>=T.split2&&t<T.boom){ g.save(); g.strokeStyle='#ffffff'; g.lineWidth=5; g.beginPath(); g.moveTo(VW*0.56,0); g.lineTo(VW*0.44,VH); g.stroke(); g.restore(); }
      if(t>=T.boom+0.35){ g.fillStyle='#000'; g.fillRect(0,0,VW,VH); const a1=seg(t,T.tbc,T.tbc+0.6), a2=seg(t,T.xmas,T.xmas+0.8); g.save(); g.textAlign='center';
        g.fillStyle='rgba(255,255,255,'+a1+')'; g.font='900 '+Math.round(VH*0.09)+'px Montserrat, Arial Black, sans-serif'; g.fillText('TO BE CONTINUED…',VW/2,VH*0.46);
        g.fillStyle='rgba(255,90,90,'+a2+')'; g.font='700 '+Math.round(VH*0.045)+'px Montserrat, Arial, sans-serif'; g.fillText('FINAL · PART 2 — CHRISTMAS 2026',VW/2,VH*0.58); g.restore(); return; }
      K.vignette(F,t>=T.split&&t<T.run?0.65:0.5); } };
  CineKit.film(def);
})();
