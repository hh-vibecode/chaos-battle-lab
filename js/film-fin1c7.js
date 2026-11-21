// 🌌 Final Part 1 · KẾT — HAI PHE TỤ QUÂN — id `fin1c7`, sau fin1c4 (Gojo vs Pain).
// BẢN 2 (21/11/2026) — dựng lại theo lời anh 18/11 ("như đấm vào mồm, quá lộn xộn, hiệu ứng xấu"), kịch bản prompts/kich-ban/fin1c7-v2.md:
//   • Bread Cat BREAD PARADOX đúng game: xoay → sét xé đất thành 5 TẢNG → đá bị hút vào tâm xoáy → sụp 1 điểm → BIG BANG trắng xoá
//     → màu trở lại là CẢ BIỂN MEME đã đứng kín bãi (không rơi lắt nhắt) + cổng đa vũ trụ trên trời.
//   • Gigachad + Chonky đứng ĐẰNG XA sau biển quân, chỉ ~10 meme.
//   • Triệu hồi đủ nhịp: Mlem chột dạ → Ninja bước lên → cận mặt + Sharingan → ĐẬP tay → ấn chạy trên đất → cột khói nổ lần lượt → Evil Gary + Catvader + binh đoàn.
//   • Friend lao đầu xé mây như thiên thạch (Tengai Shinsei) → nện xuống sau phe Pain (mô phỏng nổ Blender + sóng chấn) → bụi tan, đứng che nửa trời.
//   • MỌI meme HOÀ VÀO CẢNH (luật 20/11): ảnh dựng trên lớp riêng — bớt rực, multiply ánh trăng máu, tối dần về chân, ánh hắt mỏng phía trên, mép mềm, bóng bầu dục;
//     biển quân xa ngược sáng gần đen. Mỗi meme nướng sẵn 3 tông (gần / giữa / xa) → vẽ hàng nghìn con vẫn nhẹ.
//   Trục: phe Gojo TRÁI (x<0), phe Pain PHẢI (x>0). Máy TĨNH mỗi shot. Meme = ảnh gốc, KHÔNG lật.
(function(){
  if(!window.CineKit || CineKit.films.fin1c7) return;
  const BASE=((document.currentScript&&document.currentScript.src)||'js/film-fin1c7.js').replace(/film-[^\/]*$/,''), V=window.GAME_VERSION?'?v='+GAME_VERSION.build:'';
  for(const [gl,f] of [['PIXI_FILTERS_GLSL','vendor/pixi-filters/glsl.js'],['Fin1City','fin1-city.js'],['Fin1Fight','fin1-fight.js'],['VfxBoom','vfx-boom.js']]) if(!window[gl]){ try{ const x=new XMLHttpRequest(); x.open('GET',BASE+f+V,false); x.send(); (0,eval)(x.responseText); }catch(e){} }
  const JX=p=>{ try{ const x=new XMLHttpRequest(); x.open('GET',BASE+p+V,false); x.send(); return JSON.parse(x.responseText); }catch(e){ return null; } };
  const K=CineKit, {seg,lerp,clamp,hash}=K, EA=K.EASE, eout=EA.eout, ein=EA.ein, eio=EA.eio, TAU=Math.PI*2, B=window.VfxBoom, VW=960, VH=540, H=120;
  // ───────── NHỊP (giây) ─────────
  const T={ g1:2.8, g2:4.1, bread:5.4, tear:8.2, suck:9.6, suckP:10.2, point:10.8, hush:11.1, bang:11.6, reveal:12.6, rows:16.0, giant:18.1, pain:20.4, mlem:21.0, step:21.6,
    ninja:22.4, shar:22.75, crouch:23.1, slam:23.4, seal:24.6, smoke:26.4, shard:29.2, quiet:30.3, sky:30.8, dive:32.2, land:34.6, stand:36.8, roar:37.9, look:39.0, split:40.2, boom:42.2, tbc:42.6, xmas:44.2, DUR:46.6 };
  const av=k=>'assets/avatars/'+k+'/avatarUrl.'+(k==='violinbee'||k==='saiyanmarmot'?'png':'webp');
  const FRONT=['feuerkatze','stalincat','duolingo','violinbee','saiyanmarmot','boxingcat','nyancat','suscat','samuraicheems','kingcheems','chillguy','bananacat','mechaniccat','electricguitarcat','mosquitoviolin','loooongcat','lebronsunshine','scaredhamster','infinitydoge','maxwell'];   // hàng đầu: meme quan trọng (anh chốt 16/11)
  const REST=['aliencat','alottadameguy','applecat','azel','bibilabu','bongocat','calmdog','capybara','cheems','commandercat','cornelius','coughcat','cryingcat','damdamdidi','dawae','drivercat','droolingcat','epicsaxguy','finedog','flyingcat','gary','germancat','hecker','kermit','knifecat','morsecat','pakistanguy','pianocat','poordog','ricardo','rickroll','rubikcat','scareddog','scootercat','screamcat','slapcat','smartguy','snoozecat','spidercat','susdog','trollface','uiacat','vampirecat','wetcat','windguy','yellingwomen','yuki'];
  const IMG={ ...window.FIN1_CITY_IMGS, BCS:'assets/img/breadcat/BC_SPIN.png', SIM:'assets/img/cine/VFX_BOOM_SIM_FIRE.png',
    GOJO:'assets/img/mewingcat/MEW_GOJO_IMG.webp', PAIN:'assets/img/depressedcat/DP_PAIN_IMG.webp',
    DB:'assets/avatars/doge/rageAvatarUrl.webp', CLAP:av('clappingcat'), BERS:av('berserkcat'), POP:av('popcat'), HUH:av('huhcat'),
    CHUD:av('doorbellchud'), MLEM:av('mlemcat'), MLEM2:'assets/avatars/mlemcat/attackAvatarUrl.webp', NINJA:av('ninjacat'), SHAR:'assets/img/ninjacat/NJ_SHARINGAN.webp', BAT:av('batcat'),
    CHONKY:av('chonkydog'), GIGA:av('gigachad'), GARY:av('evilgary'), VADER:av('catvader'), SOUL:'assets/img/evilgary/EG_SOUL_TORSO.webp',
    FR:av('friend'), FR_DIVE:'assets/avatars/friend/rageAvatarUrl.webp', FR_ROAR:'assets/avatars/friend/skill1AvatarUrl.webp' };
  for(const k of FRONT.concat(REST)) IMG['M_'+k]=av(k);
  const SIMJ=JX('../assets/img/cine/VFX_BOOM_SIM_FIRE.json')||{frames:45,cols:6,px:768,ph:549,fps:15,ground:[0.5,1.0]};
  // ───────── THÀNH PHỐ: bãi giữa đã bị Shinra san phẳng · dãy xa còn đứng làm chân trời ─────────
  const CITY=Fin1City({seed:3, x0:-16000, x1:16000, rows:1, near:15000});
  const theme=()=>CITY.TH_NIGHT;
  const RUBBLE=Array.from({length:300},(_,i)=>({x:(hash(i*3+11)-0.5)*16000,z:-600+12000*hash(i*3+12),r:30+90*Math.pow(hash(i*3+13),2),a:hash(i*3+14)*TAU}));

  // ═════════ HOÀ VÀO CẢNH: nướng sẵn ảnh theo TÔNG (gần / giữa / xa / anh hùng) ═════════
  //   desat = bớt rực · env = multiply ánh trăng máu · foot = tối dần về chân · rim = ánh hắt mỏng từ trên (trăng) · dark = ngược sáng
  const TONE={ hero:{desat:0.22,env:['#a65058',0.26],foot:0.55,rim:['#ffb4a4',0.5]},
    near:{desat:0.3,env:['#9a4650',0.34],foot:0.6,rim:['#ffa898',0.45]},
    mid:{desat:0.42,env:['#7a3442',0.48],foot:0.65,rim:['#ff9080',0.4],dark:0.3},
    far:{desat:0.6,env:['#5a2232',0.6],foot:0.5,rim:['#ff7a6a',0.55],dark:0.74},
    giant:{desat:0.4,env:['#5a3a5a',0.45],foot:0.75,rim:['#bfe6ff',0.75],dark:0.32},     // khổng lồ xa: ngược sáng, viền sáng xanh của cổng
    soul:{desat:1,env:['#7a1010',0.85],foot:0.4,rim:['#ff3020',0.7],dark:0.35},          // hồn quỷ: đen đỏ
    friend:{desat:0,env:['#5a3a78',0.35],foot:0.7,rim:['#ff6a8a',0.6]},
    fire:{desat:0.1,env:['#c05030',0.25],foot:0,rim:['#ffd080',0.8]} };                   // Friend lúc lao: ánh lửa ma sát
  const BK={};
  // res: 0 = 180px (biển quân xa) · 1 = 520px (tầm trung) · 2 = ảnh gốc tối đa 1600px (cận cảnh / 4K)
  function bake(F,key,tone,res){ res=res===true?2:(res||0); const id=key+'|'+tone+'|'+res; if(BK[id]) return BK[id]; const c=K.prep(F.I[key]); if(!c) return null;
    const sc=Math.min(1,[180,520,1600][res]/c.sh), w=Math.max(2,Math.round(c.sw*sc)), h=Math.max(2,Math.round(c.sh*sc)), cv=K.mk(w,h), x=cv.getContext('2d'), o=TONE[tone]||TONE.near, px=/^FR/.test(key);
    x.imageSmoothingEnabled=!px; const img=()=>x.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,0,0,w,h); img();
    if(o.desat){ x.globalCompositeOperation='saturation'; x.globalAlpha=o.desat; x.fillStyle='#808080'; x.fillRect(0,0,w,h); x.globalAlpha=1; }
    if(o.env){ x.globalCompositeOperation='multiply'; x.globalAlpha=o.env[1]; x.fillStyle=o.env[0]; x.fillRect(0,0,w,h); x.globalAlpha=1; }
    x.globalCompositeOperation='destination-in'; img(); x.globalCompositeOperation='source-atop';
    if(o.foot){ const lg=x.createLinearGradient(0,0,0,h); lg.addColorStop(0,'rgba(0,0,0,0)'); lg.addColorStop(0.6,'rgba(0,0,0,0)'); lg.addColorStop(1,'rgba(6,4,10,'+o.foot+')'); x.fillStyle=lg; x.fillRect(0,0,w,h); }
    if(o.dark){ x.globalAlpha=o.dark; x.fillStyle='#07040a'; x.fillRect(0,0,w,h); x.globalAlpha=1; }
    if(o.rim){ const rg=x.createLinearGradient(0,0,0,h*0.32); rg.addColorStop(0,o.rim[0]); rg.addColorStop(1,'rgba(0,0,0,0)'); x.globalAlpha=o.rim[1]*0.55; x.fillStyle=rg; x.fillRect(0,0,w,h); x.globalAlpha=1; }
    if(!/_F$/.test(key)){ x.globalCompositeOperation='destination-out'; const fg=x.createLinearGradient(0,h*0.84,0,h); fg.addColorStop(0,'rgba(0,0,0,0)'); fg.addColorStop(1,'rgba(0,0,0,0.92)'); x.fillStyle=fg; x.fillRect(0,h*0.84,w,h*0.16); }   // mép đáy mờ dần (avatar bán thân không lộ mép cắt thẳng)
    x.globalCompositeOperation='source-over'; return BK[id]={cv,ar:c.sw/c.sh,px}; }
  // vẽ 1 meme đã hoà cảnh, chân ở (x,y,z), cao h (đv thế giới) · o: tone, a, sy (co dọc khi trồi lên), rot, d (lệch sâu), shadow, mist, soft, glow:[màu rgb, độ]
  function blend(F,key,x,y,z,h,o){ o=o||{}; const P=K.proj(F.B,x,y,z); if(!P) return null; const hh=h*P.s*(o.sy==null?1:o.sy); if(hh<1) return null;
    const tone=o.tone||(z<1800?'near':z<5200?'mid':'far'), px=hh*(F.SC||1), res=o.hi||px>600?2:px>200?1:0, hi=res>0, b=bake(F,key,tone,res); if(!b) return null; const ww=h*P.s*b.ar*(o.sx||1);
    if(P.x+ww<-80||P.x-ww>VW+80||P.y-hh>VH+80||P.y<-80) return {P,hh,ww};
    const G=(o.shadow||o.mist)?K.proj(F.B,x,0,z):null, soft=o.soft!=null?o.soft:hi;
    F.list.push({d:P.d+(o.d||0), fn:()=>{ const g=F.g, al=o.a==null?1:o.a; if(al<=0.01) return;
      if(G&&o.shadow){ g.save(); g.globalAlpha=0.55*al; g.translate(G.x,G.y); g.scale(1,0.18); const rg=g.createRadialGradient(0,0,0,0,0,ww*0.6); rg.addColorStop(0,'rgba(0,0,0,0.85)'); rg.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=rg; g.beginPath(); g.arc(0,0,ww*0.6,0,TAU); g.fill(); g.restore(); }
      if(o.glow){ g.save(); g.globalCompositeOperation='lighter'; glowDot(g,P.x,P.y-hh*0.5,Math.max(ww,hh)*0.8,o.glow[0],o.glow[1]*al); g.restore(); }
      g.save(); g.globalAlpha=al; g.translate(P.x,P.y); if(o.rot) g.rotate(o.rot); if(b.px) g.imageSmoothingEnabled=false;
      if(soft&&!b.px){ g.filter='blur('+(0.5*(F.SC||1)).toFixed(2)+'px)'; g.drawImage(b.cv,-ww/2,-hh,ww,hh); g.filter='none'; }   // lớp mờ dưới + lớp nét trên = mép mềm
      g.drawImage(b.cv,-ww/2,-hh,ww,hh); g.restore();
      if(G&&o.mist){ g.save(); g.globalAlpha=o.mist*al; g.translate(G.x,G.y); g.scale(1,0.22); const rg=g.createRadialGradient(0,0,0,0,0,ww*0.8); rg.addColorStop(0,'rgba(120,90,100,0.75)'); rg.addColorStop(1,'rgba(120,90,100,0)'); g.fillStyle=rg; g.beginPath(); g.arc(0,0,ww*0.8,0,TAU); g.fill(); g.restore(); } }});
    return {P,hh,ww}; }
  function glowDot(g,x,y,r,col,a){ if(a<=0.01||r<=0.5) return; const rg=g.createRadialGradient(x,y,0,x,y,r); rg.addColorStop(0,'rgba('+col+','+a+')'); rg.addColorStop(1,'rgba('+col+',0)'); g.fillStyle=rg; g.fillRect(x-r,y-r,2*r,2*r); }
  const lighter=(g,fn)=>{ g.save(); g.globalCompositeOperation='lighter'; fn(); g.restore(); };
  // ảnh BÁN THÂN (Gojo, Pain): mờ dần mép dưới → lơ lửng, không lộ mép cắt
  const FADE={};
  function faded(F,key){ if(FADE[key]) return FADE[key]; const im=F.I[key]; if(!im||!im.complete||!im.naturalWidth) return null; const c=document.createElement('canvas'); c.width=im.naturalWidth; c.height=im.naturalHeight; const x=c.getContext('2d'); x.drawImage(im,0,0);
    x.globalCompositeOperation='destination-out'; const gr=x.createLinearGradient(0,c.height*0.55,0,c.height); gr.addColorStop(0,'rgba(0,0,0,0)'); gr.addColorStop(0.55,'rgba(0,0,0,0.72)'); gr.addColorStop(0.85,'rgba(0,0,0,0.97)'); gr.addColorStop(1,'rgba(0,0,0,1)'); x.fillStyle=gr; x.fillRect(0,0,c.width,c.height);   // mờ cong (soát: mờ thẳng còn lộ vạch ngang ở cận)
    c.complete=true; c.naturalWidth=c.width; c.naturalHeight=c.height; F.I[key+'_F']=c; return FADE[key]=c; }

  // ═════════ 2 PHE ═════════
  const POS_G=[-430,0], POS_P=[430,0];
  const AIDE_G=[['DB',-760,-60,3.0],['CLAP',-560,120,1],['BERS',-650,260,1.15],['POP',-470,330,0.95],['HUH',-830,340,1]];
  const AIDE_P=[['CHUD',620,-40,1.1],['BAT',840,300,1]];
  const NINJA0=[560,280], NINJA1=[720,-100], MLEMP=[760,140];
  const ninjaAt=t=>{ const k=eio(seg(t,T.step,T.step+0.7)); return [lerp(NINJA0[0],NINJA1[0],k),lerp(NINJA0[1],NINJA1[1],k)]; };
  function leaders(F,t,o){ o=o||{}; const up=o.up||0;
    for(const [key,[x,z],col,ph] of [['GOJO',POS_G,'140,200,255',0],['PAIN',POS_P,'200,120,255',1]]){ if(!faded(F,key)) continue; const y=H*0.45+Math.sin(t*1.8+ph)*6+up*20;
      blend(F,key+'_F',x,y,z,H*1.3,{tone:'hero',glow:[col,0.28],rot:(key==='GOJO'?-1:1)*0.04*up}); } }
  function vanguard(F,t){ for(const [k,x,z,s] of AIDE_G) blend(F,k,x,0,z,H*s,{shadow:true,mist:0.2});
    for(const [k,x,z,s] of AIDE_P) blend(F,k,x,0,z,H*s,{shadow:true,mist:0.2});
    const nm=t>=T.mlem+0.12&&t<T.step; blend(F,nm?'MLEM2':'MLEM',MLEMP[0],0,MLEMP[1],H*(nm?1.05:1),{shadow:true,mist:0.2,sy:nm?1+0.04*Math.sin((t-T.mlem)*30):1});   // Mlem chột dạ: thè lưỡi "mlem"
    const [nx,nz]=ninjaAt(t), cr=t>=T.crouch&&t<T.seal?eout(seg(t,T.crouch,T.slam))*(1-seg(t,T.slam+0.6,T.seal)):0;   // ngồi thụp xuống đập tay
    blend(F,'NINJA',nx,0,nz,H*1.05,{shadow:true,mist:0.2,sy:1-0.12*cr}); }
  // biển meme phe Gojo: khối x −900…−7600, z 640…9800 · hàng 0 = meme quan trọng xếp đúng chỗ (3 góc cận dọc hàng đầu)
  const ARMY_G=[]; (function(){ const L=FRONT.concat(REST); let i=0;
    for(let row=0;row<36;row++){ const z=640+row*260, n=30+row*2, x0=-930-(row%2)*60, span=5600+row*120;
      for(let c=0;c<n;c++){ const x=x0-c*(span/n)-(row?hash(i*3+1)*110:0), key=row===0?FRONT[c%FRONT.length]:row<3?FRONT[(c*3+row*5)%FRONT.length]:L[(i*7+row*3)%L.length];
        ARMY_G.push({key:'M_'+key,x,z:z+(row?(hash(i*3+2)-0.5)*110:0),h:H*(0.88+0.2*hash(i*3+3)),ph:hash(i*3+4)*TAU}); i++; } } })();
  function armyG(F,t){ const k=seg(t,T.bang,T.reveal+0.3);   // đã đứng sẵn khi màu trở lại · bụi Big Bang lắng
    for(const m of ARMY_G){ const bob=Math.max(0,Math.sin(t*2.2+m.ph))*5; blend(F,m.key,m.x,bob,m.z,m.h,{shadow:m.z<2200,mist:m.z<1800?0.35:0,a:1}); } }
  // binh đoàn ác quỷ phe Pain: trồi lên theo từng cột khói (trước → sau)
  const PILLARS=[]; for(let i=0;i<22;i++){ const row=Math.floor(i/4); PILLARS.push({x:1300+((i%4)+0.5*(row%2))*1500+(hash(i+300)-0.5)*500,z:1500+row*1550+(hash(i+301)-0.5)*400,t:T.smoke+0.15+row*0.32+hash(i+302)*0.2}); }
  const ARMY_P=[]; (function(){ let i=0; for(let row=0;row<36;row++){ const z=640+row*260, n=30+row*2, span=5600+row*120;
      for(let c=0;c<n;c++){ const x=1000+c*(span/n)+hash(i*5+1)*110, zz=z+(hash(i*5+2)-0.5)*110; let tp=T.smoke+3; for(const p of PILLARS){ if(Math.hypot(p.x-x,p.z-zz)<1300){ tp=Math.min(tp,p.t+0.25+0.3*hash(i*5+4)); } }
        ARMY_P.push({x,z:zz,h:H*(0.95+0.4*hash(i*5+3)),ta:tp,ph:hash(i*5+5)*TAU}); i++; } } })();
  function armyP(F,t){ for(const m of ARMY_P){ if(t<m.ta) continue; const k=eout(seg(t,m.ta,m.ta+0.5)); blend(F,'SOUL',m.x,0,m.z,m.h,{tone:'soul',sy:0.3+0.7*k,a:Math.min(1,k*1.6),rot:Math.sin(t*1.7+m.ph)*0.04}); }
    const k=seg(t,T.smoke+0.9,T.smoke+1.7); if(k>0){ blend(F,'GARY',1700,0,lerp(1500,1050,eout(k)),H*2.8,{tone:'near',a:Math.min(1,k*2),shadow:true,mist:0.4}); blend(F,'VADER',2350,0,lerp(1400,980,eout(seg(t,T.smoke+1.1,T.smoke+1.9))),H*2.7,{tone:'near',a:Math.min(1,seg(t,T.smoke+1.1,T.smoke+1.5)),shadow:true,mist:0.4}); } }
  // Gigachad + Chonky ĐẰNG XA sau biển quân, ~10 meme, đứng thẳng dậy trong bụi
  const GIANTS=[['GIGA',-2700,8600,H*10.5,0],['CHONKY',-4900,9400,H*8.5,0.6]];
  function giants(F,t){ for(const [k,x,z,h,dl] of GIANTS){ const u=seg(t,T.giant+dl,T.giant+dl+1.3); if(u<=0&&t<T.giant) continue; const e=eout(u);
      blend(F,k,x,0,z,h,{tone:'giant',sy:0.45+0.55*e,a:Math.min(1,0.25+u*1.5),mist:0.6}); } }

  // ═════════ BREAD PARADOX trên trời phía Gojo ═════════
  const VX=[-1800,3800,9000];   // tâm xoáy (Bread Cat) — cũng là chỗ cổng mở
  const breadK=t=>clamp(seg(t,T.bread,T.point),0,1);
  function breadCat(F,t){ if(t<T.bread||t>=T.bang) return; const im=F.I.BCS; if(!im||!im.naturalWidth) return; const k=breadK(t), app=eout(seg(t,T.bread,T.bread+0.8)), sh=t<T.point?1:1-ein(seg(t,T.point,T.bang-0.15));
    const P=K.proj(F.B,...VX); if(!P) return; F.list.push({d:P.d+5000, fn:()=>{ const g=F.g, s=6000*P.s*app*sh; if(s<0.5) return; const fr=Math.floor(((t*(0.9+5*k*k))%1)*48), cs=256;   // xoay trục ngang như game, nhanh dần
      lighter(g,()=>{ glowDot(g,P.x,P.y,s*2.2,'255,214,150',0.35+0.4*k); glowDot(g,P.x,P.y,s*0.9,'255,245,220',0.3+0.5*k);
        if(k>0.15){ const w=s*0.16*(0.5+k), gr=g.createLinearGradient(P.x-w,0,P.x+w,0); gr.addColorStop(0,'rgba(255,220,160,0)'); gr.addColorStop(0.5,'rgba(255,250,235,'+(0.65*k)+')'); gr.addColorStop(1,'rgba(255,220,160,0)'); g.fillStyle=gr; g.fillRect(P.x-w,-40,w*2,VH+80); }   // cột sáng
        for(let i=0;i<40;i++){ const a=hash(i+500)*TAU+t*(0.5+k), d=s*(0.55+((t*(0.8+2*k)+hash(i+501))%1)*1.6); g.fillStyle='rgba(255,236,190,'+(0.85*k)+')'; g.fillRect(P.x+Math.cos(a)*d,P.y+Math.sin(a)*d*0.6,2.2,2.2); }   // mưa tia lửa
        const fl=hash(Math.floor(t*14)); if(k>0.3&&fl>0.55) glowDot(g,P.x,P.y,s*3.2,'255,255,255',0.25*k); });   // đèn chớp
      g.drawImage(im,(fr%8)*cs,((fr/8)|0)*cs,cs,cs,P.x-s/2,P.y-s/2,s,s); }}); }
  // ⚡ sét (dịch điểm giữa, băm theo seed — không random)
  function boltPts(x0,y0,x1,y1,seed,det){ let P=[[x0,y0],[x1,y1]]; for(let it=0;it<(det||6);it++){ const Q=[P[0]]; for(let i=1;i<P.length;i++){ const [ax,ay]=P[i-1],[bx,by]=P[i], L=Math.hypot(bx-ax,by-ay)||1, m=(hash(seed*31+it*7+i)-0.5)*L*0.42;
        const nx=-(by-ay)/L, ny=(bx-ax)/L; Q.push([(ax+bx)/2+nx*m,(ay+by)/2+ny*m],P[i]); } P=Q; } return P; }
  function bolt(g,x0,y0,x1,y1,seed,k,col,w){ if(k<=0.01) return; const P=boltPts(x0,y0,x1,y1,seed), cl=col||'230,240,255'; w=w||3;
    const line=(pts,lw,c)=>{ g.strokeStyle=c; g.lineWidth=lw; g.beginPath(); pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); };
    lighter(g,()=>{ g.lineCap='round'; g.lineJoin='round'; line(P,w*6,'rgba('+cl+','+(0.14*k)+')'); line(P,w*2.2,'rgba('+cl+','+(0.5*k)+')'); line(P,w*0.8,'rgba(255,255,255,'+k+')');
      for(let b=0;b<3;b++){ const p=P[Math.floor(P.length*(0.25+0.5*hash(seed+b*5)))]; if(!p) continue; const an=Math.atan2(y1-y0,x1-x0)+(hash(seed+b)-0.5)*1.5, L=Math.hypot(x1-x0,y1-y0)*(0.12+0.18*hash(seed+b*3));
        const Bp=boltPts(p[0],p[1],p[0]+Math.cos(an)*L,p[1]+Math.sin(an)*L,seed+b*17,4); line(Bp,w*1.1,'rgba('+cl+','+(0.4*k)+')'); line(Bp,w*0.4,'rgba(255,255,255,'+(0.75*k)+')'); } }); }
  const boltK=(t,a,d)=>{ d=d||0.35; if(t<a||t>a+d) return 0; const u=(t-a)/d; return (u<0.12?1:u<0.2?0.3:u<0.3?0.9:1-u)*(1-u*0.3); };
  // 5 TẢNG ĐẤT bị sét xé ra (giữa 2 phe, sau lưng 2 thủ lĩnh) → nhấc lên, nghiêng → bị hút về tâm xoáy
  const SLABS=[[[-2000,1300],[-700,1150],[-560,2700],[-2100,2900]],[[-700,1150],[700,1300],[620,2800],[-560,2700]],[[700,1300],[2000,1200],[2100,3000],[620,2800]],
    [[-2100,2900],[-560,2700],[-260,4700],[-2300,4900]],[[-560,2700],[620,2800],[2100,3000],[2200,5000],[-260,4700]]].map((pts,i)=>{ const cx=pts.reduce((a,p)=>a+p[0],0)/pts.length, cz=pts.reduce((a,p)=>a+p[1],0)/pts.length;
      return {pts:pts.map(([x,z])=>[cx+(x-cx)*0.9,cz+(z-cz)*0.9]),cx,cz,tl:T.tear+0.25+i*0.18,tx:(hash(i+40)-0.5)*1.4,tz:(hash(i+41)-0.5)*1.1,th:180+120*hash(i+42),seed:i}; });   // co 0.9 quanh tâm = khe nứt giữa các tảng
  function slabPose(s,t){ const lift=eout(seg(t,s.tl,s.tl+1.0)), su=ein(seg(t,T.suck+0.1*s.seed,T.point+0.1)); // nhấc → hút
    const y=lift*(220+320*hash(s.seed+43))+su*VX[1]*0.85, mx=su*(VX[0]-s.cx)*0.85, mz=su*(VX[2]-s.cz)*0.85, sc=1-0.85*su, tilt=lift*(1+3*su);
    return {y,mx,mz,sc,tx:s.tx*tilt,tz:s.tz*tilt,on:t>=s.tl}; }
  function slabs(F,t){ if(t<T.tear||t>=T.bang) return; for(const s of SLABS){ if(t<s.tl) { continue; } const q=slabPose(s,t), B0=F.B;
      const top=s.pts.map(([x,z])=>{ const dx=(x-s.cx)*q.sc, dz=(z-s.cz)*q.sc; return [s.cx+q.mx+dx, q.y+dx*q.tx+dz*q.tz, s.cz+q.mz+dz]; });
      const P=top.map(p=>K.proj(B0,p[0],p[1],p[2])), Q=top.map(p=>K.proj(B0,p[0],p[1]-s.th*q.sc,p[2])); if(P.some(p=>!p)||Q.some(p=>!p)) continue;
      const C=K.proj(B0,s.cx+q.mx,q.y,s.cz+q.mz); if(!C) continue;
      F.list.push({d:C.d, fn:()=>{ const g=F.g; g.save(); g.lineJoin='round';
        for(let i=0;i<P.length;i++){ const j=(i+1)%P.length; g.fillStyle=i%2?'#2a1c22':'#3a262c'; g.beginPath(); g.moveTo(P[i].x,P[i].y); g.lineTo(P[j].x,P[j].y); g.lineTo(Q[j].x,Q[j].y); g.lineTo(Q[i].x,Q[i].y); g.closePath(); g.fill(); }   // mặt bên đất
        g.fillStyle='#5a4448'; g.strokeStyle='#120a0e'; g.lineWidth=1.6; g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y)); g.closePath(); g.fill(); g.stroke();   // mặt trên (bê tông)
        g.strokeStyle='rgba(255,190,170,0.35)'; g.lineWidth=1; g.beginPath(); g.moveTo(P[0].x,P[0].y); g.lineTo(P[1].x,P[1].y); g.stroke(); g.restore(); }}); }
    // HỐ dưới tảng đã nhấc: tối + mép sáng trắng xanh (thời không rách)
    F.under.push(()=>{ const g=F.g, ek=1-seg(t,T.point,T.point+0.35); for(const s of SLABS){ if(t<s.tl) continue; const k=seg(t,s.tl,s.tl+0.4), P=s.pts.map(([x,z])=>K.proj(F.B,x,1,z)); if(P.some(p=>!p)) continue;
        g.save(); g.fillStyle='rgba(6,4,10,'+(0.95*k)+')'; g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y)); g.closePath(); g.fill();
        if(ek>0.01) lighter(g,()=>{ g.strokeStyle='rgba(255,236,200,'+(0.8*k*ek)+')'; g.lineWidth=2; g.stroke(); g.strokeStyle='rgba(255,180,120,'+(0.25*k*ek)+')'; g.lineWidth=8; g.stroke(); }); g.restore(); } }); }   // mép sáng tắt khi sụp vào 1 điểm
  // đá vụn bị HÚT ngược lên tâm xoáy
  function suckDebris(F,t){ if(t<T.suck-0.3||t>=T.bang) return; for(let i=0;i<150;i++){ const d0=T.suck-0.3+hash(i+900)*1.3, u=seg(t,d0,d0+1.1); if(u<=0||u>=1) continue; const e=ein(u);
      const x0=(hash(i+901)-0.5)*7000, z0=600+hash(i+902)*6000, sw=Math.sin(u*Math.PI)*900*(hash(i+903)-0.5), x=lerp(x0,VX[0],e)+sw, y=lerp(0,VX[1],e), z=lerp(z0,VX[2],e), P=K.proj(F.B,x,y,z); if(!P) continue;
      const r=(18+50*hash(i+904))*P.s*(1-0.7*e); if(r<0.4) continue; F.list.push({d:P.d, fn:()=>{ const g=F.g; g.save(); g.translate(P.x,P.y); g.rotate(t*(hash(i+905)*10-5)); g.fillStyle=hash(i+906)>0.5?'#3a2a30':'#5a4448'; g.strokeStyle='#100a0c'; g.lineWidth=Math.max(0.5,r*0.15);
        g.beginPath(); for(let k=0;k<5;k++){ const th=k/5*TAU, rr=r*(0.6+0.4*hash(i*7+k)); k?g.lineTo(Math.cos(th)*rr,Math.sin(th)*rr):g.moveTo(Math.cos(th)*rr,Math.sin(th)*rr); } g.closePath(); g.fill(); g.stroke(); g.restore(); }}); } }

  // ═════════ CỔNG ĐA VŨ TRỤ (rách, mép răng cưa) ═════════
  const PORTAL_R=2600;
  function portal(F,t){ if(t<T.reveal-0.2||t>=T.pain) return; const P=K.proj(F.B,...VX); if(!P) return; const kc=ein(seg(t,T.giant+1.5,T.pain-0.1)), k=eout(seg(t,T.bang+0.6,T.reveal+0.6))*(1-kc);   // quân đổ bộ xong → cổng khép lại
    F.list.push({d:P.d+6000, fn:()=>{ const g=F.g, R=PORTAL_R*P.s*(0.85+0.15*k)*(1-kc); if(R<1) return; const fr=Math.floor(t*12); g.save(); g.translate(P.x,P.y);
      const edge=()=>{ g.beginPath(); for(let i=0;i<=72;i++){ const a=i/72*TAU, w=R*(1+0.09*(hash(i*7+3)-0.5)+0.03*(hash(i*13+fr)-0.5)); i?g.lineTo(Math.cos(a)*w,Math.sin(a)*w*0.92):g.moveTo(Math.cos(a)*w,Math.sin(a)*w*0.92); } g.closePath(); };
      lighter(g,()=>glowDot(g,0,0,R*1.9,'150,200,255',0.3));
      const gr=g.createRadialGradient(0,0,0,0,0,R); gr.addColorStop(0,'#0c0a26'); gr.addColorStop(0.8,'#1a1446'); gr.addColorStop(1,'#2a2266'); g.fillStyle=gr; edge(); g.fill();
      g.save(); edge(); g.clip(); for(let i=0;i<34;i++){ const a=hash(i+600)*TAU+t*0.12*(i%2?1:-1), d=R*0.85*Math.sqrt(hash(i+601)), r=R*(0.04+0.1*hash(i+602)), col=['120,200,255','255,150,220','180,255,170','255,210,120','190,150,255'][i%5];   // muôn vàn vũ trụ BONG BÓNG
        const bx=Math.cos(a)*d, by=Math.sin(a)*d, bg2=g.createRadialGradient(bx,by,0,bx,by,r); bg2.addColorStop(0,'rgba('+col+',0.85)'); bg2.addColorStop(0.7,'rgba('+col+',0.25)'); bg2.addColorStop(1,'rgba('+col+',0)'); g.fillStyle=bg2; g.beginPath(); g.arc(bx,by,r,0,TAU); g.fill();
        g.strokeStyle='rgba(255,255,255,0.4)'; g.lineWidth=1; g.beginPath(); g.arc(bx,by,r*0.8,0,TAU); g.stroke(); } g.restore();
      lighter(g,()=>{ for(const [w,a] of [[0.08,0.25],[0.03,0.6],[0.01,1]]){ g.strokeStyle='rgba(215,240,255,'+a+')'; g.lineWidth=Math.max(1,R*w); edge(); g.stroke(); } });   // mép cổng sáng
      g.restore(); }}); }

  // ═════════ ẤN TRIỆU HỒI: vệt lửa chạy từ tay Ninja toả khắp nửa bãi phải → vòng ký tự ═════════
  const SEAL_C=[3400,0,4200], SEAL_R=3600;
  const SEAL_LINES=Array.from({length:16},(_,i)=>{ const a=-1.3+i/15*2.6+(hash(i+700)-0.5)*0.12, L=SEAL_R*(0.9+0.6*hash(i+701)); return {a,L,seed:i}; });   // toả về phía +x (nửa phải)
  function sealGround(F,t){ if(t<T.slam) return; const k=eout(seg(t,T.slam+0.1,T.seal+1.4)), fade=1-seg(t,T.shard,T.dive), [ox,oz]=NINJA1; if(fade<=0.01) return;
    F.under.push(()=>{ const g=F.g; g.save(); g.lineCap='round'; g.lineJoin='round';
      lighter(g,()=>{ for(const s of SEAL_LINES){ const o=[]; const n=14; for(let j=0;j<=n;j++){ const f=j/n; if(f>k*1.15) break; const r=s.L*f, aa=s.a+Math.sin(f*5+s.seed)*0.08, p=K.proj(F.B,ox+Math.cos(aa)*r,2,oz+Math.sin(aa)*r); if(p) o.push(p); }
          if(o.length<2) continue; for(const [lw,a,c] of [[10,0.18,'255,60,20'],[4,0.7,'255,90,30'],[1.4,0.95,'255,220,160']]){ g.strokeStyle='rgba('+c+','+(a*fade)+')'; for(let j=1;j<o.length;j++){ const ss=(o[j-1].s+o[j].s)/2; g.lineWidth=Math.min(lw*1.2,Math.max(0.6,lw*ss*6)); g.beginPath(); g.moveTo(o[j-1].x,o[j-1].y); g.lineTo(o[j].x,o[j].y); g.stroke(); } } }
        const rk=seg(t,T.seal+0.4,T.smoke+0.2); if(rk>0) for(const rr of [0.45,0.78,1]){ const P=[]; for(let i=0;i<=72;i++){ if(i/72>eout(rk)) break; const a=-Math.PI/2+i/72*TAU, p=K.proj(F.B,SEAL_C[0]+Math.cos(a)*SEAL_R*rr,2,SEAL_C[2]+Math.sin(a)*SEAL_R*rr); if(p) P.push(p); }
          if(P.length<2) continue; g.strokeStyle='rgba(255,80,30,'+(0.8*fade)+')'; g.lineWidth=Math.min(4,Math.max(1,3*P[0].s*8)); g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y)); g.stroke();
          if(rr===0.78) for(let i=0;i<24;i++){ if(i/24>eout(rk)) break; const a=-Math.PI/2+i/24*TAU, p=K.proj(F.B,SEAL_C[0]+Math.cos(a)*SEAL_R*0.89,2,SEAL_C[2]+Math.sin(a)*SEAL_R*0.89); if(!p) continue; const s=Math.max(2,120*p.s);   // ký tự ấn (vạch ngang dọc kiểu chữ)
            g.fillStyle='rgba(255,140,60,'+(0.85*fade)+')'; g.fillRect(p.x-s*0.5,p.y-s*0.08,s,s*0.16); g.fillRect(p.x-s*0.08,p.y-s*0.35,s*0.16,s*0.5*(0.5+hash(i))); } } });
      g.restore(); }); }

  // ═════════ FRIEND ═════════
  const FR_LAND=[4400,0,11000];
  function friendStand(F,t,o){ o=o||{}; const k=t>=T.roar&&t<T.roar+1.4?'FR_ROAR':'FR', rise=eout(seg(t,T.stand-0.2,T.stand+1.2));
    return blend(F,k,FR_LAND[0],0,FR_LAND[2],H*(o.h||82),{tone:'friend',sy:0.85+0.15*rise,hi:true,d:-1500,glow:['255,70,120',0.18]}); }

  // ═════════ MÁY: mỗi shot 1 góc TĨNH (máy phía −z nhìn +z; trái = Gojo, phải = Pain) ═════════
  const S=(t0,t1,a,b)=>({t0,t1,a,b:b||a,ease:'lin'});
  const shots=[
    S(0,T.g1,{tx:0,ty:210,tz:900,dist:2300,yaw:0,pitch:5,fov:56},{tx:0,ty:210,tz:900,dist:2240,yaw:0,pitch:5,fov:56}),          // 1 toàn: bãi đổ nát, Gojo trái – Pain phải
    S(T.g1,T.g2,{tx:-640,ty:125,tz:150,dist:760,yaw:5,pitch:-2,fov:50}),               // 2 phe Gojo bước ra
    S(T.g2,T.bread,{tx:650,ty:125,tz:150,dist:760,yaw:-5,pitch:-2,fov:50}),            // 3 phe Pain bước ra
    S(T.bread,T.tear,{tx:-1800,ty:3800,tz:9000,dist:10530,yaw:11.1,pitch:-20.4,fov:60}),  // 4 ngước từ sát đất phe Gojo: Bread Cat khổng lồ giữa trời
    S(T.tear,T.suck,{tx:0,ty:320,tz:3000,dist:4300,yaw:0,pitch:2,fov:58}),             // 5 toàn thấp: sét xé đất thành 5 tảng
    S(T.suck,T.suckP,{tx:-430,ty:185,tz:0,dist:300,yaw:2,pitch:-3,fov:46}),           // 6 cận Gojo: gió hút
    S(T.suckP,T.point,{tx:430,ty:185,tz:0,dist:300,yaw:-2,pitch:-3,fov:46}),          //   cận Pain: gió hút
    S(T.point,T.reveal,{tx:-500,ty:1800,tz:4200,dist:5800,yaw:4,pitch:-8,fov:58}),    // 7–8 toàn: sụp vào 1 điểm → BIG BANG
    S(T.reveal,T.rows,{tx:-2600,ty:300,tz:4000,dist:5460,yaw:26,pitch:3,fov:64},{tx:-2600,ty:300,tz:4000,dist:5360,yaw:26,pitch:3,fov:64}),   // 9 toàn cao: biển meme kín bãi tới chân trời + cổng
    S(T.rows,T.rows+0.7,{tx:-1023,ty:80,tz:640,dist:380,yaw:2,pitch:-2,fov:46}),      // 10 hàng đầu: Adolf + Stalin
    S(T.rows+0.7,T.rows+1.4,{tx:-1397,ty:80,tz:640,dist:380,yaw:-2,pitch:-2,fov:46}), //    Duolingo + Violin Bee
    S(T.rows+1.4,T.giant,{tx:-1770,ty:80,tz:640,dist:380,yaw:2,pitch:-2,fov:46}),     //    Saiyan Marmot + Boxing
    S(T.giant,T.pain,{tx:-3800,ty:900,tz:9000,dist:6095,yaw:17.2,pitch:-4.9,fov:36}),     // 11 thấp trong biển quân nhìn ra xa: 2 khổng lồ đứng dậy
    S(T.pain,T.mlem,{tx:660,ty:120,tz:120,dist:720,yaw:-6,pitch:-2,fov:50}),          // 12 phe Pain nhìn sang biển quân bên kia
    S(T.mlem,T.step,{tx:760,ty:70,tz:140,dist:230,yaw:-3,pitch:-3,fov:44}),           //    cận Mlem chột dạ thè lưỡi (nhịp hài)
    S(T.step,T.ninja,{tx:660,ty:120,tz:120,dist:720,yaw:-6,pitch:-2,fov:50}),         //    Ninja bước lên trước
    S(T.ninja,T.shar,{tx:720,ty:118,tz:-100,dist:250,yaw:-4,pitch:-2,fov:42}),        // 13 cận mặt Ninja
    S(T.shar,T.crouch,{tx:720,ty:118,tz:-100,dist:250,yaw:-4,pitch:-2,fov:42}),       //    Sharingan xoay (lớp màn hình)
    S(T.crouch,T.seal,{tx:720,ty:75,tz:-100,dist:430,yaw:-10,pitch:-6,fov:50}),       // 14 trung thấp: ngồi thụp → ĐẬP tay
    S(T.seal,T.smoke,{tx:2600,ty:0,tz:2800,dist:4400,yaw:-10,pitch:55,fov:62}),       // 15 cao nhìn xuống: ấn chạy khắp nửa bãi
    S(T.smoke,T.shard,{tx:2600,ty:520,tz:3400,dist:4300,yaw:-16,pitch:4,fov:58}),     // 16 thấp toàn: cột khói nổ lần lượt, quân ác bước ra
    S(T.shard,T.sky,{tx:430,ty:190,tz:0,dist:330,yaw:-6,pitch:-4,fov:46}),            // 17 cận Pain giơ mảnh vỡ
    S(T.sky,T.dive,{tx:1600,ty:9000,tz:14000,dist:15000,yaw:-8,pitch:-34,fov:66}),    // 18 giun ngước: mây đỏ rực, cháy ra 1 lỗ
    S(T.dive,T.land,{tx:1200,ty:2600,tz:9000,dist:11000,yaw:-6,pitch:-9,fov:64}),     // 19 toàn rộng thấp: Friend xé mây lao xuống
    S(T.land,T.stand,{tx:2600,ty:900,tz:9000,dist:11600,yaw:-8,pitch:-1,fov:60}),     // 20 toàn: nện xuống sau phe Pain, tường bụi nuốt máy
    S(T.stand,T.look,{tx:3000,ty:3000,tz:9000,dist:10147,yaw:-13.96,pitch:-16.3,fov:64}),   // 21 thấp sau phe Pain: Friend đứng che nửa trời
    S(T.look,T.split,{tx:-430,ty:175,tz:0,dist:300,yaw:4,pitch:-10,fov:46}),          //    cận Gojo ngẩng nhìn
    S(T.split,T.boom,{tx:0,ty:210,tz:900,dist:2300,yaw:0,pitch:5,fov:56}),            // 22 chia đôi (ô riêng trong panels)
    S(T.boom,T.DUR,{tx:0,ty:210,tz:900,dist:2300,yaw:0,pitch:5,fov:56})];             // 23 BÙM → TO BE CONTINUED

  // ═════════ THẾ GIỚI ═════════
  const LAND_SIM={t0:T.land+0.05, key:'SIM', meta:SIMJ, x:FR_LAND[0], z:FR_LAND[2], size:24000, hold:true, twos:true};
  const LAND_GS={t0:T.land, x:FR_LAND[0], z:FR_LAND[2], K:9800, crack:9000, crater:2200, rocks:0, plates:0, seed:11, dust:400};
  function rubble(F){ for(const r of RUBBLE){ const P=K.proj(F.B,r.x,0,r.z); if(!P) continue; const R=r.r*P.s; if(R<0.8||R>40||P.x<-60||P.x>VW+60||P.y<-60||P.y>VH+60) continue;
      F.list.push({d:P.d+r.r, fn:()=>{ const g=F.g; g.save(); g.translate(P.x,P.y); g.rotate(r.a); g.fillStyle='#2b2528'; g.beginPath(); g.moveTo(-R,0); g.lineTo(-R*0.4,-R*0.55); g.lineTo(R*0.5,-R*0.45); g.lineTo(R,0); g.lineTo(R*0.3,R*0.18); g.closePath(); g.fill();
        g.fillStyle='#3d3539'; g.beginPath(); g.moveTo(-R*0.4,-R*0.55); g.lineTo(R*0.5,-R*0.45); g.lineTo(R*0.2,-R*0.2); g.closePath(); g.fill(); g.restore(); }}); } }
  // vá mặt đất SÁT MÁY: ô đất có góc sau lưng máy bị bỏ (cine-kit) → lộ màu sương đỏ thành dải ở đáy khung. Tô màu đất từ ~1 ô trước máy trở về.
  function nearGround(F){ const th=theme(), B0=F.B, L=Math.hypot(B0.f[0],B0.f[2])||1, fx=B0.f[0]/L, fz=B0.f[2]/L, cam=B0.pos, TL=th.tile||260, RR=th.R||7000;
    // lưới ô thật chỉ có trong ±R quanh điểm nhìn (F.cam.tx/tz) → máy đứng ngoài lưới (nhìn xa) thì vá tới tận mép lưới
    const gx=F.cam.tx||0, gz=F.cam.tz||0; let D=Math.max(320,cam[1]*0.3); const dz=cam[2]<gz-RR&&fz>0.05?(gz-RR-cam[2])/fz:0, dx=cam[0]<gx-RR&&fx>0.05?(gx-RR-cam[0])/fx:cam[0]>gx+RR&&fx<-0.05?(cam[0]-gx-RR)/-fx:0; D=Math.max(D,dz+TL,dx+TL);
    const at=(d,w)=>K.proj(B0,cam[0]+fx*d-fz*w,0,cam[2]+fz*d+fx*w), p1=at(D,-9000), p2=at(D,9000); if(!p1||!p2||Math.min(p1.y,p2.y)>VH+20) return;
    const gc=th.ground[0].split(',').map(Number), fogRGB=th.fog.split(',').map(Number), fogD=RR*0.9, colAt=d=>{ const fk=clamp((d-fogD*0.25)/(fogD*0.75),0,1); return gc.map((x,n)=>Math.round(lerp(x,fogRGB[n],fk))); };
    F.under.unshift(()=>{ const g=F.g; g.save(); g.beginPath(); g.moveTo(p1.x,p1.y); g.lineTo(p2.x,p2.y); g.lineTo(p2.x,VH+3000); g.lineTo(p1.x,VH+3000); g.closePath(); g.clip();
      const far=colAt(D), near=colAt(0), q=at(Math.min(D,60),0), lg=g.createLinearGradient(0,Math.min(p1.y,p2.y),0,q?Math.max(q.y,VH):VH); lg.addColorStop(0,'rgb('+far+')'); lg.addColorStop(1,'rgb('+near+')'); g.fillStyle=lg; g.fillRect(-200,-200,VW+400,VH+3400);
      g.strokeStyle='rgba('+th.ground[2]+',0.5)'; g.lineWidth=1;   // lưới ô cùng cỡ ô thật (TL) — nối liền với lưới phía xa
      const zA=cam[2]-TL*2, zB=cam[2]+Math.max(D,1)*Math.max(0.2,fz)+TL*3, xA=cam[0]-9000, xB=cam[0]+9000, seg2=(x0,z0,x1,z1)=>{ const n=24; let st=true; g.beginPath(); for(let i=0;i<=n;i++){ const P=K.proj(B0,lerp(x0,x1,i/n),0,lerp(z0,z1,i/n)); if(!P){ st=true; continue; } st?g.moveTo(P.x,P.y):g.lineTo(P.x,P.y); st=false; } g.stroke(); };
      for(let x=Math.ceil(xA/TL)*TL;x<=xB;x+=TL) seg2(x,zA,x,zB); for(let z=Math.ceil(zA/TL)*TL;z<=zB;z+=TL) seg2(xA,z,xB,z); g.restore(); }); }
  function world(F,t){ F.t=t; CITY.draw(F,t,theme(t)); nearGround(F); rubble(F);
    for(let i=0;i<6;i++) K.smoke(F,{x:-6000+2400*i,z:11000+hash(i+20)*3000,t0:-3,n:4,spread:1500,rise:2800,life:90,size:1500,seed:800+i,a:0.3,tint:'70,50,52'});   // khói cột chân trời
    const sh=F.panel&&F.panel.side, after=t>=T.bang;
    if(!sh||sh==='G'){ breadCat(F,t); slabs(F,t); suckDebris(F,t); if(after){ portal(F,t); armyG(F,t); giants(F,t); }
      if(t>=T.reveal&&t<T.rows+0.4) for(let i=0;i<5;i++) K.smoke(F,{x:-5200+2000*i,z:1200+hash(i+60)*5000,t0:T.bang+0.2,n:4,spread:1800,rise:200,life:5,size:1000,seed:860+i,a:0.2,tint:'150,120,120'});   // bụi Big Bang đang lắng
      if(t>=T.giant&&t<T.pain) for(const [k,x,z,h,dl] of GIANTS) K.smoke(F,{x,z,t0:T.giant+dl,n:7,spread:900,rise:500,life:2.5,size:900,seed:880+(dl*10|0),a:0.5,tint:'110,90,100'}); }
    if(!sh||sh==='P'){ sealGround(F,t);
      if(t>=T.smoke){ for(const [i,p] of PILLARS.entries()) K.smoke(F,{x:p.x,z:p.z,t0:p.t,n:6,spread:420,rise:2600,life:2.6,size:900,seed:900+i,a:0.85,tint:'40,14,16'}); armyP(F,t); }
      if(t>=T.land){ B.groundShock(F,t,LAND_GS); LAND_SIM.alpha=1-seg(t,T.stand+0.2,T.stand+1.2); if(LAND_SIM.alpha>0.01) B.simSprite(F,t,LAND_SIM); }   // khói nổ tắt dần khi bụi tan (soát: khói kem giữ lại thành mảng sắc mép sau chân Friend)
      if(t>=T.land-0.05&&t<T.land+0.5){ const k=seg(t,T.land-0.05,T.land+0.5); blend(F,'FR_DIVE',FR_LAND[0]-1800*(1-k),-H*26*eout(k),FR_LAND[2],H*48,{tone:'fire',rot:0.85,hi:true,d:-800}); }   // Friend cắm đầu xuống đất đúng khung nện
      if(t>=T.stand) friendStand(F,t,{h:sh==='P'?95:95}); }
    leaders(F,t,{up:t>=T.split?eout(seg(t,T.split,T.split+0.8)):0}); vanguard(F,t); }

  // ═════════ MÀN HÌNH ═════════
  function star4(g,x,y,L,Wd,a){ if(a<=0.01) return; const sp=(an,len,w)=>{ const c=Math.cos(an), s=Math.sin(an); g.beginPath(); g.moveTo(x-s*w,y+c*w); g.lineTo(x+c*len,y+s*len); g.lineTo(x+s*w,y-c*w); g.closePath(); g.fill(); };
    lighter(g,()=>{ g.fillStyle='rgba(255,252,240,'+a+')'; for(let i=0;i<4;i++) sp(i*Math.PI/2,i%2?L*0.62:L,Wd); g.fillStyle='rgba(255,250,235,'+(0.5*a)+')'; for(let i=0;i<4;i++) sp(Math.PI/4+i*Math.PI/2,L*0.22,Wd*0.35); glowDot(g,x,y,Wd*7,'255,250,240',0.9*a); }); }
  // tràng impact (30 khung/s): Big Bang · Ninja đập tay · Friend nện đất
  const STROBES=[[T.bang,'k bw wb bw w w w w w w w w w w w w w w w w w w w w w w w w w w w',0.36,0.38],[T.slam,'bw wb bw',0.5,0.78],[T.land,'wb bw k wb w',0.6,0.55]];
  const strobeAt=t=>B.strobe(t,STROBES);
  // tầng mây đỏ (lớp màn hình, cho 2 shot trời): mây cel 3 tông, phát sáng từ trong ra ở chỗ Friend sắp xé
  let CL=null;
  // tầng mây cel 3 tông phủ từ đỉnh khung xuống `base`: từng cụm mây có mặt dưới hắt đỏ (đậm dần về phía lỗ), lỗ cháy ra ở (hx,hy) với mép lửa
  function cloudDeck(F,t,o){ const g=F.g, SC=F.SC||1; if(!CL||CL.width!==Math.round(VW*SC)){ CL=K.mk(VW*SC,VH*SC); } const x=CL.getContext('2d'); x.setTransform(SC,0,0,SC,0,0); x.globalCompositeOperation='source-over'; x.clearRect(0,0,VW,VH);
    const yb=o.base, hx=o.hx, hy=o.hy, hr=o.hr, glow=o.glow, R=o.r, rows=Math.max(2,Math.ceil((yb+R)/(R*0.62)));
    x.fillStyle='#1c0812'; x.fillRect(0,0,VW,Math.max(0,yb-R*0.9));
    for(let L=0;L<rows;L++){ const y0=yb-(rows-1-L)*R*0.62, sc=0.75+0.35*L/rows;   // hàng trên (xa) nhỏ – tối, hàng dưới (gần) to
      for(let i=0;i<16;i++){ const cx=((i+0.5*(L%2))/15)*(VW+2*R)-R+((t*(4+2*L))%(R*0.5)), rr=R*sc*(0.75+0.45*hash(i*7+L*13)), cy=y0+(hash(i*3+L)-0.5)*R*0.25, d=Math.hypot(cx-hx,(cy-hy)*1.6), near=clamp(1-d/(VW*0.6),0,1);
        x.fillStyle=['#24091a','#2e0c20','#3a1026'][L%3]; x.beginPath(); x.ellipse(cx,cy,rr,rr*0.52,0,0,TAU); x.fill();
        const lit=0.25+0.75*near*glow; x.fillStyle='rgba('+Math.round(120+135*near)+','+Math.round(30+60*near*glow)+','+Math.round(50+20*near)+','+(0.55*lit)+')'; x.beginPath(); x.ellipse(cx,cy+rr*0.22,rr*0.86,rr*0.28,0,0,TAU); x.fill(); } }   // mặt dưới hắt đỏ
    if(glow>0){ x.globalCompositeOperation='source-atop'; const rg=x.createRadialGradient(hx,hy,0,hx,hy,hr*3.4); rg.addColorStop(0,'rgba(255,190,110,'+(0.9*glow)+')'); rg.addColorStop(0.3,'rgba(255,80,60,'+(0.6*glow)+')'); rg.addColorStop(1,'rgba(120,20,40,0)'); x.fillStyle=rg; x.fillRect(0,0,VW,VH); }
    if(o.hole>0){ const hole=()=>{ x.beginPath(); for(let i=0;i<=44;i++){ const a=i/44*TAU, w=hr*o.hole*(0.72+0.5*hash(i*5+3)); i?x.lineTo(hx+Math.cos(a)*w,hy+Math.sin(a)*w*0.6):x.moveTo(hx+Math.cos(a)*w,hy+Math.sin(a)*w*0.6); } x.closePath(); };
      x.globalCompositeOperation='destination-out'; hole(); x.fill(); x.globalCompositeOperation='source-over';
      lighter(x,()=>{ hole(); x.strokeStyle='rgba(255,210,130,'+(0.9*glow)+')'; x.lineWidth=3; x.stroke(); x.strokeStyle='rgba(255,90,50,'+(0.4*glow)+')'; x.lineWidth=14; x.stroke(); }); }
    x.globalCompositeOperation='source-over'; g.save(); g.setTransform(1,0,0,1,0,0); g.drawImage(CL,0,0); g.restore(); }
  // Friend lao đầu xé mây (lớp màn hình): ảnh rage (đầu lao + vệt tốc độ) xoay chúc xuống, vệt lửa ma sát, mây rách thành vòng quanh
  function friendDive(F,t){ const g=F.g, u=seg(t,T.dive,T.land), e=ein(u)*0.75+u*0.25, c=K.prep(F.I.FR_DIVE); if(!c) return;
    const x0=VW*0.3, y0=VH*0.02, x1=VW*0.74, y1=VH*0.9, x=lerp(x0,x1,e), y=lerp(y0,y1,e), hh=VH*lerp(0.55,0.95,e), ww=hh*c.sw/c.sh, an=Math.atan2(y1-y0,x1-x0);
    lighter(g,()=>{ const L=Math.hypot(x-x0,y-y0)+hh*0.6; g.save(); g.translate(x,y); g.rotate(an+Math.PI); const gr=g.createLinearGradient(0,0,L,0); gr.addColorStop(0,'rgba(255,230,170,0.9)'); gr.addColorStop(0.25,'rgba(255,120,50,0.6)'); gr.addColorStop(1,'rgba(160,30,40,0)');
      g.fillStyle=gr; g.beginPath(); g.moveTo(0,-hh*0.42); g.quadraticCurveTo(L*0.5,-hh*0.3,L,0); g.quadraticCurveTo(L*0.5,hh*0.3,0,hh*0.42); g.closePath(); g.fill(); g.restore();   // vệt lửa ma sát kéo dài sau lưng
      glowDot(g,x+Math.cos(an)*ww*0.35,y+Math.sin(an)*ww*0.35,hh*0.75,'255,170,80',0.55); });
    const b=bake(F,'FR_DIVE','fire',true); if(b){ g.save(); g.translate(x,y); g.rotate(an); g.imageSmoothingEnabled=false; g.drawImage(b.cv,-ww/2,-hh/2,ww,hh); g.restore(); }
    lighter(g,()=>{ for(let i=0;i<10;i++){ const f=hash(i+950), off=(hash(i+951)-0.5)*hh*0.8, px=x-Math.cos(an)*ww*(0.3+f)+Math.sin(an)*off, py=y-Math.sin(an)*ww*(0.3+f)-Math.cos(an)*off; glowDot(g,px,py,hh*0.06,'255,210,140',0.5*(1-f)); } }); }   // tia lửa văng khỏi vệt
  function cloudTear(F,t){ const g=F.g, u=seg(t,T.dive,T.dive+1.6), hx=VW*0.3, hy=VH*0.06; if(u<=0||u>=1) return; for(let i=0;i<24;i++){ const a=i/24*TAU, d=VW*(0.08+0.55*eout(u))*(0.8+0.4*hash(i+960)), r=VW*(0.06+0.05*hash(i+961))*(1-0.4*u);   // vòng mây rách toả ra
      g.save(); g.globalAlpha=0.9*(1-u); g.fillStyle=i%2?'#4e1a30':'#6a2236'; g.beginPath(); g.ellipse(hx+Math.cos(a)*d,hy+Math.sin(a)*d*0.35,r,r*0.5,a,0,TAU); g.fill(); g.restore(); } }
  const def={ id:'fin1c7', title:'Final 1 · Kết · Hai phe tụ quân', DUR:T.DUR, VW, VH, fadeIn:false, fadeOut:true, imgs:IMG, theme:t=>theme(t), shots, world,
    cast:['bc','fr','mlem','ninja','gary','catvader','dp','mw'],
    sfxOk:{thunder_big:'sét lớn dùng chung cho cảnh phim', ep4_step1:'bước chân khổng lồ dùng chung (Gigachad / Chonky)', ep4_step2:'bước chân khổng lồ dùng chung', demon_roar1:'tiếng gầm quỷ của phim — đúng binh đoàn ác quỷ', burn_loop:'tiếng lửa cháy chung — vệt lửa của ấn triệu hồi'},
    // 22 CHIA ĐÔI chéo: ô trái phe Gojo (cổng + biển meme), ô phải phe Pain (Friend + quỷ) — 2 thủ lĩnh ngẩng lên
    panels:t=>t>=T.split&&t<T.boom?[{cam:{tx:-250,ty:190,tz:0,dist:520,yaw:6,pitch:-6,fov:56},clip:[[0,0],[0.56,0],[0.44,1],[0,1]],side:'G'},
                                    {cam:{tx:250,ty:190,tz:0,dist:520,yaw:-6,pitch:-6,fov:56},clip:[[0.56,0],[1,0],[1,1],[0.44,1]],side:'P'}]:null,
    sfx:[[0.2,'l2p_sub',0.4,2.6,'bãi đổ nát mênh mông, Gojo và Pain đứng 2 bên, gió'],
      [T.g1+0.15,'se_step_in',0.5,0.5,'phe Gojo bước ra từ khói'],[T.g2+0.15,'se_step_in',0.42,0.5,'phe Pain bước ra từ khói'],
      [T.bread,'bc_spin',0.75,T.point-T.bread,'Bread Cat hiện trên trời, xoay nghịch lý bơ'],[T.bread+1.6,'bc_zap',0.45,1.2,'+ đèn chớp, tia lửa dồn dập quanh Bread Cat (lớp của tiếng xoay)'],
      [T.tear,'thunder_big',0.9,1.4,'sét đánh nứt toác đất thành 5 tảng'],[T.tear+0.3,'se_rock_break',0.7,1.0,'+ đá vỡ, tảng đất nhấc lên (lớp của sét)'],
      [T.suck,'l2p_riser',0.7,T.hush-T.suck,'đá vụn bị hút ngược lên tâm xoáy, gió quất'],
      [T.bang,'l2p_explode',1,2.4,'BIG BANG — thời không va vào nhau nổ tung, trắng xoá'],[T.bang,'se_big_explode',0.8,2.0,'+ lớp nổ trầm của Big Bang'],[T.bang+0.05,'se_shockwave',0.6,1.4,'+ sóng chấn quét qua (lớp của Big Bang)'],
      [T.reveal+0.2,'ep3_quake',0.45,1.6,'màu trở lại: biển meme đã đứng kín bãi, đất còn rung, bụi lắng'],
      [T.rows,'se_step_in',0.5,0.4,'hàng đầu: Adolf + Stalin dậm chân thủ thế'],
      [T.giant+0.3,'ep4_step1',0.9,1.0,'Gigachad + Chonky đứng dậy xa sau biển quân, đất rung'],
      [T.mlem+0.12,'mlem_lick',0.8,0.6,'Mlem chột dạ thè lưỡi'],
      [T.shar,'l2p_shimmer',0.6,0.4,'Sharingan xoay'],
      [T.slam,'kn_boom_low',0.9,1.0,'Ninja ĐẬP tay xuống đất, đất nổ rền'],[T.slam+0.02,'se_super_hit',0.6,0.5,'+ lớp đập chát (Ninja đập tay)'],
      [T.seal,'burn_loop',0.6,1.8,'ấn triệu hồi chạy như vệt lửa cháy khắp nửa bãi'],
      [T.smoke+0.15,'se_bomb',0.6,0.6,'cột khói nổ bùng lần lượt'],[T.smoke+0.8,'demon_roar1',0.8,1.4,'binh đoàn ác quỷ trồi lên gầm vang'],[T.smoke+1.0,'gary_titan_roar',0.7,1.4,'+ Evil Gary gầm (lớp của triệu hồi)'],[T.smoke+1.6,'catvader_breathe',0.6,1.0,'Catvader bước ra, tiếng thở rít'],
      [T.shard,'l2p_chime',0.6,1.0,'Pain giơ mảnh linh hồn Friend, loé tím'],
      [T.sky,'l2p_rumble',0.8,1.4,'mây đỏ rực từ bên trong, cháy ra 1 lỗ'],
      [T.dive,'fr_dash',0.9,1.6,'Friend lao đầu xé toạc tầng mây'],[T.dive+0.3,'se_whoosh_fast',0.6,1.2,'+ xé gió (lớp của Friend lao)'],
      [T.land,'se_big_explode',1,2.0,'Friend nện ĐẬP xuống đất sau phe Pain, nổ tung'],[T.land+0.06,'kn_explode_crunch',0.8,1.4,'+ lớp đất vỡ vụn (Friend nện)'],[T.land+0.12,'se_quake',0.8,1.8,'+ đất nứt rung chuyển (lớp của Friend nện)'],
      [T.roar,'fr_titan_roar',0.9,1.6,'Friend đứng che nửa trời, gầm'],
      [T.split,'l2p_whoosh',0.7,0.6,'màn hình chia đôi 2 phe'],[T.boom,'l2p_explode',1,2.0,'BÙM — nổ trắng xoá']],
    // 🎵 "Portals" (Avengers: Endgame): lặng 8–19s rồi BÙNG ở 20s → canh chỗ bùng rơi ĐÚNG lúc Big Bang
    mus:[{src:'assets/audio/mus_portals.m4a',ra:T.bread,rb:T.boom+0.3,off:20-(T.bang+0.05-T.bread),vol:0.45,fi:0.6,fo:0.3}],
    impact:t=>{ const s=strobeAt(t); return B.impactOf(s,true); },
    grade:t=>{ const s=strobeAt(t); if(s) return B.gradeOf(s)||{}; if(t>=T.boom&&t<T.boom+0.4) return {white:1-seg(t,T.boom+0.2,T.boom+0.4)};
      if(t>=T.point&&t<T.bang) return {sat:0.15,bright:lerp(0.75,0.35,seg(t,T.hush,T.bang))};   // sụp vào 1 điểm: tối dần, mất màu
      const E=K.edit; return E.mix(E.duotone(t,T.smoke,T.smoke+2.4,'#1a0000','#ff4030',0.22,0.3),E.duotone(t,T.sky,T.stand+1,'#0d0518','#c06090',0.3,0.3),E.rgb(t,T.bang+0.9,0.5,8),E.rgb(t,T.land+0.2,0.5,9)); },
    shake:t=>{ let s=0; const h=(a,amp,d)=>{ if(t>=a&&t<a+d) s=Math.max(s,amp*(1-(t-a)/d)); };
      if(t>=T.bread+1&&t<T.hush) s=1+3*seg(t,T.bread,T.point); h(T.tear,8,0.5); h(T.bang+0.9,10,0.8); h(T.giant+0.3,5,0.5); h(T.giant+0.95,5,0.5); h(T.slam,9,0.5); h(T.smoke+0.2,4,1.6);
      h(T.sky,3,1.4); if(t>=T.dive&&t<T.land) s=Math.max(s,2+4*seg(t,T.dive,T.land)); h(T.land,16,1.4); h(T.roar,6,1.2); h(T.boom,18,0.4); return s; },
    post(F,t){ const fx={shocks:[]}, sh=(a,x,y,z,rm,d,str)=>{ if(t>=a&&t<a+d){ const u=(t-a)/d; fx.shocks.push({x,y,z,r:20+rm*eout(u),w:60,str:str*(1-u)}); fx.chroma=Math.max(fx.chroma||0,0.3*(1-u)); } };
      sh(T.bang+0.9,VX[0],VX[1],VX[2],6000,0.8,26); sh(T.slam,NINJA1[0],0,NINJA1[1],1600,0.5,18); sh(T.land+0.1,FR_LAND[0],0,FR_LAND[2],9000,0.9,24); return fx; },
    screen(F,t){ const g=F.g, s=strobeAt(t);
      if(s){ B.impactOverlay(F,s); return; }
      // 5 · sét từ Bread Cat đánh xuống 5 tảng
      if(t>=T.tear&&t<T.suck){ const P=K.proj(F.B,...VX); if(P) SLABS.forEach((sl,i)=>{ const Q=K.proj(F.B,sl.cx,0,sl.cz); if(Q) bolt(g,P.x,P.y,Q.x,Q.y,i*7+3,boltK(t,sl.tl-0.2,0.45),'255,240,220',3); }); K.flash(F,boltK(t,T.tear,0.4)*0.5,'#fff4e6'); }
      // 6 · gió hút: vạch toả về tâm xoáy
      if(t>=T.suck&&t<T.point){ const P=K.proj(F.B,...VX); K.speedLines(F,{k:0.55,cx:P?P.x:VW*0.4,cy:P?P.y:-VH*0.4,n:60}); }
      // 7 · điểm sụp → sao 4 cánh GIỮ rồi nở
      if(t>=T.point&&t<T.bang){ const P=K.proj(F.B,...VX), px=P?P.x:VW*0.36, py=P?P.y:VH*0.38, k=seg(t,T.point,T.hush), n=seg(t,T.bang-0.35,T.bang);
        lighter(g,()=>glowDot(g,px,py,VH*(0.5-0.42*k),'255,240,210',0.7)); star4(g,px,py,VW*(0.03+0.3*n),VH*0.006,1); }
      // 13 · Sharingan xoay (cắt nhanh, đỏ phủ khung)
      if(t>=T.shar&&t<T.crouch){ const c=K.prep(F.I.SHAR), u=seg(t,T.shar,T.crouch); g.save(); g.fillStyle='rgba(20,0,0,0.78)'; g.fillRect(0,0,VW,VH); if(c){ const sz=VH*(0.9+0.15*u); g.translate(VW/2,VH/2); g.rotate(u*4.2); g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,-sz/2,-sz/2,sz,sz); } g.restore(); }
      // 14 · KUCHIYOSE NO JUTSU (chữ trên màn — không lồng giọng)
      if(t>=T.slam+0.15&&t<T.seal+0.9){ const a=seg(t,T.slam+0.15,T.slam+0.35)*(1-seg(t,T.seal+0.5,T.seal+0.9)); g.save(); g.globalAlpha=a; g.textAlign='center'; g.shadowColor='rgba(0,0,0,0.85)'; g.shadowBlur=10;
        g.fillStyle='#ffe2d0'; g.font='900 '+Math.round(VH*0.075)+'px Shojumaru, Georgia, serif'; g.fillText('KUCHIYOSE NO JUTSU',VW/2,VH*0.2);
        g.fillStyle='rgba(255,140,110,0.95)'; g.font='700 '+Math.round(VH*0.03)+'px Montserrat, Arial, sans-serif'; g.fillText('SUMMONING TECHNIQUE  ·  CALLS FORTH THE LEGION OF HELL',VW/2,VH*0.27); g.restore(); }
      // 17 · mảnh linh hồn Friend trong tay Pain
      if(t>=T.shard&&t<T.sky){ const k=eout(seg(t,T.shard,T.shard+0.6)), x=VW*0.66, y=VH*0.3-k*VH*0.05, sz=VH*0.075, pul=0.75+0.25*Math.sin(t*9);
        g.save(); g.translate(x,y); g.rotate(Math.sin(t*2)*0.2); lighter(g,()=>glowDot(g,0,0,sz*3.4,'190,120,255',0.65*k*pul)); g.globalAlpha=k;
        g.fillStyle='rgba(205,155,255,0.95)'; g.strokeStyle='#ffffff'; g.lineWidth=2; g.beginPath(); g.moveTo(0,-sz); g.lineTo(sz*0.45,-sz*0.1); g.lineTo(sz*0.2,sz*0.9); g.lineTo(-sz*0.35,sz*0.3); g.lineTo(-sz*0.4,-sz*0.4); g.closePath(); g.fill(); g.stroke(); g.restore();
        if(t>=T.quiet) lighter(g,()=>glowDot(g,x,y,VW*0.5*seg(t,T.quiet,T.sky),'150,80,255',0.25)); }
      // 18 · mây đỏ rực, cháy ra 1 lỗ
      if(t>=T.sky&&t<T.dive){ const u=seg(t,T.sky,T.dive); cloudDeck(F,t,{base:VH*0.78,r:VW*0.11,hx:VW*0.5,hy:VH*0.3,hr:VW*0.13,glow:0.25+0.75*u,hole:ein(seg(t,T.sky+0.5,T.dive))*0.85}); }
      // 19 · Friend xé mây lao xuống
      if(t>=T.dive&&t<T.land){ cloudDeck(F,t,{base:VH*0.3,r:VW*0.075,hx:VW*0.3,hy:VH*0.08,hr:VW*0.16,glow:1-0.5*seg(t,T.dive,T.land),hole:1}); friendDive(F,t); cloudTear(F,t);
        K.speedLines(F,{k:0.35+0.4*seg(t,T.dive,T.land),cx:VW*0.74,cy:VH*0.95,n:50}); }
      // 20 · tường bụi nuốt máy
      const dust=k=>{ if(k<=0.01) return; g.save(); g.globalAlpha=k; g.fillStyle='#5e4044'; g.fillRect(0,0,VW,VH); for(let i=0;i<14;i++){ const px=(hash(i+980)*1.3-0.15)*VW+Math.sin(t*0.7+i)*40, py=(hash(i+981)*1.2-0.1)*VH-t*12%40, r=VW*(0.18+0.16*hash(i+982));
          const rg=g.createRadialGradient(px,py,0,px,py,r); rg.addColorStop(0,i%2?'rgba(140,100,96,0.55)':'rgba(40,24,28,0.45)'); rg.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=rg; g.fillRect(px-r,py-r,2*r,2*r); } g.restore(); };   // tường bụi cuộn
      if(t>=T.land&&t<T.stand) dust(seg(t,T.land+0.9,T.land+1.7));
      if(t>=T.stand&&t<T.stand+0.9) dust(0.9*(1-ein(seg(t,T.stand,T.stand+0.9))));   // bụi tan dần
      if(t>=T.split&&t<T.boom){ g.save(); g.strokeStyle='#ffffff'; g.lineWidth=5; g.beginPath(); g.moveTo(VW*0.56,0); g.lineTo(VW*0.44,VH); g.stroke(); g.restore(); }
      if(t>=T.boom+0.35){ g.fillStyle='#000'; g.fillRect(0,0,VW,VH); const a1=seg(t,T.tbc,T.tbc+0.6), a2=seg(t,T.xmas,T.xmas+0.8); g.save(); g.textAlign='center';
        g.fillStyle='rgba(255,255,255,'+a1+')'; g.font='900 '+Math.round(VH*0.09)+'px Montserrat, Arial Black, sans-serif'; g.fillText('TO BE CONTINUED…',VW/2,VH*0.46);
        g.fillStyle='rgba(255,90,90,'+a2+')'; g.font='700 '+Math.round(VH*0.045)+'px Montserrat, Arial, sans-serif'; g.fillText('FINAL · PART 2 — CHRISTMAS 2026',VW/2,VH*0.58); g.restore(); return; }
      K.letterbox(F,t<T.g1?0.5:0); K.vignette(F,0.5); } };
  CineKit.film(def);
})();
