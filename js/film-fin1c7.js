// 🌌 Final Part 1 · KẾT — HAI PHE TỤ QUÂN (16/11/2026, kịch bản anh duyệt: prompts/kich-ban/fin1-chillguy-ending.md [B]) — id `fin1c7`, sau fin1c4 (Gojo vs Pain)
// Dựng 2D THEO LỚP: nền vẽ tay (thành phố tàn lụi toàn cảnh) + meme ẢNH GỐC + VFX code (cổng đa vũ trụ, ấn triệu hồi, mảnh vỡ, chia đôi màn hình).
// Anh chốt: Bread Cat hiện TRÊN TRỜI như các phần đầu, xoay giống game (BC_SPIN 48 góc) · đổ bộ đủ mọi meme TRỪ Catvader, Grumpy, Godly, phe ác · Adolf + Stalin vào phe Gojo ·
//   hàng đầu = meme đang giao tranh, hàng sau = meme quan trọng · Chonky + Gigachad KHỔNG LỒ, Buff Doge ×3 · KHÔNG Evil Larry.
(function(){
  if(!window.CineKit || CineKit.films.fin1c7) return;
  const BASE=((document.currentScript&&document.currentScript.src)||'js/film-fin1c7.js').replace(/film-[^\/]*$/,''), V=window.GAME_VERSION?'?v='+GAME_VERSION.build:'';
  for(const [gl,f] of [['Fin1Plate','fin1-plate.js'],['Fin1Fight','fin1-fight.js']]) if(!window[gl]){ try{ const x=new XMLHttpRequest(); x.open('GET',BASE+f+V,false); x.send(); (0,eval)(x.responseText); }catch(e){} }
  const P=Fin1Plate(), {K,seg,lerp,clamp,hash,eout,ein,eio,TAU,VW,VH,bg,spr,puff,dust,ring,streak,zap,sparks,star4,impact3,embers}=P;
  const T={ ally:2.8, foe:4.2, bread:5.6, crack:8.4, portal:10.0, land:12.0, land2:14.0, giant:16.0, seal:18.4, sealOn:19.2, summon:20.6, shard:23.6, friend:25.0, fStep:[25.4,26.1,26.8,27.4], split:28.0, boom:32.0, tbc:32.4, xmas:34.0, DUR:36.5 };
  const av=k=>'assets/avatars/'+k+'/avatarUrl.webp';
  const BACK=['feuerkatze','stalincat','duolingo','violinbee','saiyanmarmot','boxingcat','nyancat','suscat','samuraicheems','kingcheems','chillguy','bananacat','mechaniccat','electricguitarcat','mosquitoviolin','loooongcat','lebronsunshine','scaredhamster','infinitydoge','maxwell'];   // hàng sau: meme quan trọng (anh dặn)
  const REST=['aliencat','alottadameguy','applecat','azel','bibilabu','bongocat','calmdog','capybara','cheems','commandercat','cornelius','coughcat','cryingcat','damdamdidi','dawae','drivercat','droolingcat','epicsaxguy','finedog','flyingcat','gary','germancat','hecker','kermit','knifecat','morsecat','pakistanguy','pianocat','poordog','ricardo','rickroll','rubikcat','scareddog','scootercat','screamcat','slapcat','smartguy','snoozecat','spidercat','susdog','trollface','uiacat','vampirecat','wetcat','windguy','yellingwomen','yuki'];
  const IMG={ BW:'assets/img/cine/FIN_C7_BG_CITYWIDE.jpg', BCS:'assets/img/breadcat/BC_SPIN.png',
    GOJO:'assets/img/cine/FIN_G9.png', PAIN:'assets/img/cine/FIN_P9.png', PAINB:'assets/img/depressedcat/DP_PAIN_IMG.webp',
    DB:'assets/avatars/doge/rageAvatarUrl.webp', CLAP:av('clappingcat'), BERS:av('berserkcat'), POP:av('popcat'), HUH:av('huhcat'),
    CHUD:'assets/img/cine/FIN_AKA_CHUD.png', MLEM:'assets/img/cine/FIN_AKA_MLEM.png', NINJA:'assets/img/cine/FIN_AKA_NINJA.png', BAT:'assets/img/cine/FIN_AKA_BAT.png',
    CHONKY:av('chonkydog'), GIGA:av('gigachad'), GARY:av('evilgary'), GARYE:'assets/img/evilgary/GP_EVIL_IMG.webp', VADER:av('catvader'), FRIEND:av('friend'),
    DEMONS:'assets/img/screamcat/SC_DEMON_IMG.webp', SOUL:'assets/img/evilgary/EG_SOUL_TORSO.webp' };
  for(const k of BACK.concat(REST)) IMG['M_'+k]=av(k);
  const GY=VH*0.84, NM=VH*0.16;
  // đứng 2 phe: hàng đầu ở gần, hàng sau nhỏ + xa dần (độ sâu theo y)
  function gojoSide(F,t,o){ o=o||{}; const n=o.crowd||0;
    if(n){ const L=BACK.concat(REST); for(let i=Math.min(L.length,n)-1;i>=0;i--){ const back=i<BACK.length, row=back?1:2+((i-BACK.length)%3), col=back?i:((i-BACK.length)/3|0), y=GY-VH*0.05*row, sc=1-0.13*row, x=VW*(0.04+0.42*((col*0.37+hash(i+5)*0.3)%1)), dl=o.land?hash(i+9)*1.6:0;
        const k=o.land?eout(clamp((t-o.land-dl)/0.4,0,1)):1; if(k<=0) continue; spr(F,'M_'+L[i],x,lerp(-VH*0.3,y,k),NM*sc*(L[i]==='loooongcat'?0.8:1),{shadowK:k,alpha:Math.min(1,k*2)}); } }
    spr(F,'POP',VW*0.36,GY+4,NM*0.95); spr(F,'HUH',VW*0.3,GY+6,NM); spr(F,'BERS',VW*0.22,GY+8,NM*1.15); spr(F,'CLAP',VW*0.15,GY+10,NM);
    spr(F,'DB',VW*0.08,GY+12,NM*3.0); spr(F,'GOJO',VW*0.42,GY+14,NM*1.1); }
  function painSide(F,t,o){ o=o||{}; spr(F,'BAT',VW*0.63,GY+4,NM*1.0,{flip:true}); spr(F,'NINJA',VW*0.7,GY+6,NM*1.05,{flip:true}); spr(F,'MLEM',VW*0.77,GY+8,NM*0.95,{flip:true}); spr(F,'CHUD',VW*0.84,GY+10,NM*1.15,{flip:true});
    if(o.army){ const k=o.army; for(let i=0;i<26;i++){ const x=VW*(0.6+0.38*hash(i+300)), y=GY-VH*(0.04+0.12*hash(i+301)), h=NM*(0.6+0.5*hash(i+302)); spr(F,'SOUL',x,lerp(y+VH*0.2,y,eout(clamp(k*1.5-hash(i+303)*0.5,0,1))),h,{dark:0.55,glow:'#ff2a1a',glowA:0.25,shadow:false}); }
      spr(F,'GARYE',VW*0.74,GY-VH*0.08,NM*1.4,{glow:'#ff2a1a',glowA:0.4,alpha:Math.min(1,k*2)}); spr(F,'VADER',VW*0.88,GY-VH*0.06,NM*1.3,{flip:true,glow:'#ff2a1a',glowA:0.3,alpha:Math.min(1,k*2)}); }
    spr(F,'PAIN',VW*0.58,GY+14,NM*1.15,{flip:true}); }
  function demonSky(F,t,k){ const im=F.I.DEMONS; if(!im||!im.naturalWidth||k<=0) return; const g=F.g; g.save(); g.globalAlpha=Math.min(1,k); for(let i=0;i<7;i++){ const w=VW*(0.25+0.15*hash(i+400)), h=w*im.naturalHeight/im.naturalWidth, x=VW*(0.55+0.4*hash(i+401))+Math.sin(t*0.8+i)*20, y=VH*(0.08+0.25*hash(i+402))+Math.cos(t+i)*8; g.drawImage(im,x-w/2,y,w,h); } g.restore(); }
  function breadSky(F,t,x,y,s,k){ const im=F.I.BCS; if(!im||!im.naturalWidth) return; const g=F.g, n=48, fr=Math.floor(((t*(1.2+3.5*k))%1)*n), c=fr%8, r=(fr/8)|0, cs=256;   // Bread Cat xoay trục ngang như game (48 góc, ô 256)
    g.save(); g.globalCompositeOperation='lighter'; puff(g,x,y,s*1.8,0.35+0.35*k,'120,200,255'); for(let i=0;i<2;i++) ring(g,x,y+s*0.1,s*(0.9+0.4*i+0.1*Math.sin(t*6+i)),0.5*k,'160,230,255',2+2*k);   // hắt xanh + vòng sáng 2 bên (như game)
    if(k>0.4&&Math.floor(t*14)%3===0){ g.fillStyle='rgba(200,240,255,'+(0.25*k)+')'; g.fillRect(0,0,VW,VH); } g.restore();   // đèn chớp dồn dập
    g.drawImage(im,c*cs,r*cs,cs,cs,x-s/2,y-s/2,s,s);
    if(k>0.25){ g.save(); g.globalCompositeOperation='lighter'; const w=s*0.25*k; const gr=g.createLinearGradient(x-w,0,x+w,0); gr.addColorStop(0,'rgba(150,220,255,0)'); gr.addColorStop(0.5,'rgba(230,250,255,'+(0.7*k)+')'); gr.addColorStop(1,'rgba(150,220,255,0)'); g.fillStyle=gr; g.fillRect(x-w,-40,w*2,y+40);   // cột sáng
      for(let i=0;i<20;i++){ const a=hash(i+500)*TAU, d=s*(0.6+((t*1.5+hash(i+501))%1)*1.2); g.fillStyle='rgba(220,245,255,'+(0.8*k)+')'; g.fillRect(x+Math.cos(a)*d,y+Math.sin(a)*d*0.7,2.5,2.5); } g.restore(); } }   // mưa tia lửa
  function portal(F,t,x,y,R,k){ if(k<=0) return; const g=F.g; g.save(); g.translate(x,y); g.scale(1,0.55);
    g.globalCompositeOperation='source-over'; const gr=g.createRadialGradient(0,0,0,0,0,R); gr.addColorStop(0,'#0a0820'); gr.addColorStop(0.8,'#1a1040'); gr.addColorStop(1,'rgba(30,20,70,0)'); g.fillStyle=gr; g.beginPath(); g.arc(0,0,R*k,0,TAU); g.fill();
    for(let i=0;i<16;i++){ const a=hash(i+600)*TAU+t*0.2*(i%2?1:-1), d=R*k*0.75*Math.sqrt(hash(i+601)), r=R*k*(0.08+0.12*hash(i+602)), col=['120,200,255','255,150,220','180,255,170','255,210,120','190,150,255'][i%5];   // muôn vàn vũ trụ BONG BÓNG
      const bg2=g.createRadialGradient(Math.cos(a)*d,Math.sin(a)*d,0,Math.cos(a)*d,Math.sin(a)*d,r); bg2.addColorStop(0,'rgba('+col+',0.9)'); bg2.addColorStop(0.7,'rgba('+col+',0.3)'); bg2.addColorStop(1,'rgba('+col+',0)'); g.fillStyle=bg2; g.beginPath(); g.arc(Math.cos(a)*d,Math.sin(a)*d,r,0,TAU); g.fill();
      g.strokeStyle='rgba(255,255,255,0.5)'; g.lineWidth=1; g.beginPath(); g.arc(Math.cos(a)*d,Math.sin(a)*d,r*0.8,0,TAU); g.stroke(); }
    g.globalCompositeOperation='lighter'; for(const [w,a] of [[R*0.12,0.25],[R*0.05,0.7],[R*0.015,1]]){ g.strokeStyle='rgba(200,235,255,'+a+')'; g.lineWidth=w; g.beginPath(); g.arc(0,0,R*k,0,TAU); g.stroke(); }   // viền cổng sáng
    g.restore(); }
  function seal(F,t,x,y,R,k){ if(k<=0) return; const g=F.g; g.save(); g.translate(x,y); g.scale(1,0.28); g.globalCompositeOperation='lighter';   // ẤN TRIỆU HỒI (kiểu Kuchiyose): vệt chữ cháy loang ra thành vòng xoáy
    for(let i=0;i<16;i++){ const a=i/16*TAU, L=R*k*(0.6+0.4*hash(i+700)); g.strokeStyle='rgba(255,'+(60+60*hash(i+701))+',40,0.85)'; g.lineWidth=6; g.beginPath(); g.moveTo(0,0); for(let j=1;j<=6;j++){ const f=j/6; g.lineTo(Math.cos(a+f*0.6)*L*f,Math.sin(a+f*0.6)*L*f); } g.stroke(); }
    for(const r of [0.35,0.7,1]){ g.strokeStyle='rgba(255,80,40,0.8)'; g.lineWidth=4; g.beginPath(); g.arc(0,0,R*k*r,0,TAU); g.stroke(); }
    g.font='bold '+Math.round(R*0.12)+'px serif'; g.fillStyle='rgba(255,120,60,0.9)'; for(let i=0;i<12;i++){ const a=i/12*TAU+t*0.3; g.save(); g.rotate(a); g.fillText('口寄',R*k*0.82,0); g.restore(); } g.restore(); }
  function shard(g,x,y,s,t,k){ g.save(); g.translate(x,y); g.rotate(Math.sin(t*2)*0.2); g.globalCompositeOperation='lighter'; puff(g,0,0,s*3,0.6*k,'190,120,255'); g.globalCompositeOperation='source-over';
    g.fillStyle='rgba(200,150,255,0.95)'; g.strokeStyle='#ffffff'; g.lineWidth=2; g.beginPath(); g.moveTo(0,-s); g.lineTo(s*0.45,-s*0.1); g.lineTo(s*0.2,s*0.9); g.lineTo(-s*0.35,s*0.3); g.lineTo(-s*0.4,-s*0.4); g.closePath(); g.fill(); g.stroke(); g.restore(); }   // mảnh vỡ linh hồn Friend
  const SHOTS=[
    // B1 toàn: thành phố tàn lụi, Gojo trái – Pain phải
    [0,T.ally,(F,t,u)=>{ const g=F.g; bg(F,'BW',lerp(1.04,1.0,u),0.5,0.55); spr(F,'GOJO',VW*0.42,GY+14,NM*1.1); spr(F,'PAIN',VW*0.58,GY+14,NM*1.15,{flip:true}); embers(g,t,36,'255,170,120'); }],
    // B2 quân 2 phe bước ra từ khói đứng sau thủ lĩnh
    [T.ally,T.foe,(F,t,u)=>{ const g=F.g; bg(F,'BW',1.5,0.25,0.62); const k=eout(u); g.save(); g.globalAlpha=k; gojoSide(F,t); g.restore(); for(let i=0;i<8;i++) puff(g,VW*0.05+VW*0.4*hash(i+10),GY-VH*0.05,VH*0.18,0.5*(1-k),'120,100,96'); embers(g,t,20); }],
    [T.foe,T.bread,(F,t,u)=>{ const g=F.g; bg(F,'BW',1.5,0.75,0.62); const k=eout(u); g.save(); g.globalAlpha=k; painSide(F,t); g.restore(); for(let i=0;i<8;i++) puff(g,VW*0.55+VW*0.4*hash(i+20),GY-VH*0.05,VH*0.18,0.5*(1-k),'120,100,96'); embers(g,t,20); }],
    // B3 Bread Cat hiện TRÊN TRỜI (như các phần đầu), xoay nghịch lý bơ — mạnh dần như game
    [T.bread,T.crack,(F,t,u)=>{ const g=F.g; bg(F,'BW',1.25,0.35,0.25); g.save(); g.fillStyle='rgba(0,0,10,'+(0.3*u)+')'; g.fillRect(0,0,VW,VH); g.restore(); breadSky(F,t,VW*0.38,VH*0.32,VH*0.42*lerp(0.9,1.1,u),u); }],
    // B4 xoay mạnh hơn bao giờ hết → không gian nứt, thời không sụp vào 1 điểm (lặng)
    [T.crack,T.portal,(F,t,u)=>{ const g=F.g; bg(F,'BW',1.25,0.35,0.25,{alpha:1-0.6*u}); breadSky(F,t,VW*0.38,VH*0.32,VH*0.42*lerp(1.1,0.2,ein(u)),1); g.save(); g.fillStyle='rgba(0,0,0,'+(0.6*u)+')'; g.fillRect(0,0,VW,VH); g.restore();
      if(u>0.8) star4(g,VW*0.38,VH*0.32,VW*0.4*seg(u,0.8,1),VH*0.015,1); }],
    // B5 xé ra CỔNG thông đạo, sau là muôn vàn vũ trụ bong bóng
    [T.portal,T.land,(F,t,u)=>{ const g=F.g; bg(F,'BW',1.15,0.3,0.3); portal(F,t,VW*0.3,VH*0.3,VW*0.3,eout(seg(t,T.portal,T.portal+0.6))); if(t<T.portal+0.15){ g.save(); g.fillStyle='rgba(255,255,255,'+(1-seg(t,T.portal,T.portal+0.15))+')'; g.fillRect(0,0,VW,VH); g.restore(); } }],
    // B6 meme đổ bộ đông nghịt từ cổng xuống đường (toàn) → cận dải meme hàng đầu / hàng sau
    [T.land,T.land2,(F,t,u)=>{ const g=F.g; bg(F,'BW',1.0,0.5,0.55); portal(F,t,VW*0.28,VH*0.2,VW*0.18,1); gojoSide(F,t,{crowd:67,land:T.land});
      for(let i=0;i<20;i++){ const k=((t-T.land)*1.4+hash(i+40))%1; streak(g,VW*0.28+(hash(i+41)-0.5)*VW*0.2,VH*0.25,VW*(0.05+0.4*hash(i+42)),lerp(VH*0.25,GY,k),VH*0.012,'200,235,255',null,0.5*(1-k)); }
      painSide(F,t); }],
    [T.land2,T.giant,(F,t,u)=>{ const g=F.g; bg(F,'BW',1.45,0.25,0.65); gojoSide(F,t,{crowd:67}); embers(g,t,16); }],
    // B7 đất rung: Chonky Dog + Gigachad bước ra KHỔNG LỒ (cao ngang nhà chọc trời) — góc giun
    [T.giant,T.seal,(F,t,u)=>{ const g=F.g; bg(F,'BW',1.3,0.25,0.75); const s1=eout(seg(t,T.giant,T.giant+0.8)), s2=eout(seg(t,T.giant+0.6,T.giant+1.4));
      spr(F,'GIGA',VW*0.12,VH*1.05+VH*0.4*(1-s1),VH*1.15,{alpha:Math.min(1,s1*2)}); spr(F,'CHONKY',VW*0.36,VH*1.05+VH*0.4*(1-s2),VH*0.95,{alpha:Math.min(1,s2*2)}); gojoSide(F,t,{crowd:30});
      for(const ts of [T.giant+0.4,T.giant+1.0,T.giant+1.6]) if(t>=ts) dust(g,VW*0.25,VH*0.95,seg(t,ts,ts+1),VW*0.35,'130,110,100',ts*10|0); }],
    // B8 Ninja kết ấn → dấu ẤN TRIỆU HỒI khổng lồ cháy loang trên nền đổ nát
    [T.seal,T.summon,(F,t,u)=>{ const g=F.g; if(t<T.sealOn){ bg(F,'BW',1.9,0.7,0.62,{blur:2}); spr(F,'NINJA',VW*0.5,VH*1.2,VH*1.1,{flip:true,glow:'#ff3a2a',glowA:0.5*seg(t,T.seal,T.sealOn)}); g.save(); g.globalCompositeOperation='lighter'; puff(g,VW*0.5,VH*0.55,VH*0.12*(1+Math.sin(t*30)*0.2),0.9*seg(t,T.seal,T.sealOn),'255,80,40'); g.restore(); }
      else { bg(F,'BW',1.0,0.5,0.55); painSide(F,t); seal(F,t,VW*0.76,GY-VH*0.02,VW*0.3,eout(seg(t,T.sealOn,T.summon))); } }],
    // B9 khói nổ: Evil Gary + Catvader + binh đoàn ác quỷ bước ra
    [T.summon,T.shard,(F,t,u)=>{ const g=F.g; bg(F,'BW',1.15,0.72,0.6); seal(F,t,VW*0.76,GY-VH*0.02,VW*0.3,1-0.6*u); const k=seg(t,T.summon,T.summon+1.6); demonSky(F,t,k); painSide(F,t,{army:k});
      if(t<T.summon+0.8) for(let i=0;i<14;i++) puff(g,VW*(0.55+0.4*hash(i+50)),GY-VH*0.1*hash(i+51)-seg(t,T.summon,T.summon+0.8)*VH*0.2,VH*0.2,0.8*(1-seg(t,T.summon,T.summon+0.8)),'40,20,24'); }],
    // B10 Depressed giơ MẢNH VỠ, mảnh loé tím
    [T.shard,T.friend,(F,t,u)=>{ const g=F.g; bg(F,'BW',1.6,0.6,0.4,{blur:3}); spr(F,'PAINB',VW*0.48,VH*1.08,VH*0.95,{shadow:false,flip:true}); shard(g,VW*0.7,VH*0.32-u*VH*0.05,VH*0.08,t,eout(u)); }],
    // B11 Friend từ chân trời quay lại, mỗi bước rung thành phố → đứng sau lưng Pain che kín trời
    [T.friend,T.split,(F,t,u)=>{ const g=F.g; bg(F,'BW',1.1,0.65,0.55); const k=eio(u), fx=lerp(VW*0.95,VW*0.78,k), fh=lerp(VH*0.35,VH*1.05,k);
      spr(F,'FRIEND',fx,lerp(VH*0.62,VH*1.05,k),fh,{shadow:false,pixel:true,glow:'#b48cff',glowA:0.25}); g.save(); g.fillStyle='rgba(0,0,0,'+(0.25*k)+')'; g.fillRect(VW*0.5,0,VW*0.5,VH); g.restore(); painSide(F,t,{army:1});
      for(const ts of T.fStep) if(t>=ts&&t<ts+0.6) dust(g,fx,VH*0.9,seg(t,ts,ts+0.6),VW*0.3,'110,90,90',ts*10|0); }],
    // B12 CHIA ĐÔI MÀN HÌNH chéo 2 phe — 2 thủ lĩnh ngẩng lên
    [T.split,T.boom,(F,t,u)=>{ const g=F.g, k=eout(seg(t,T.split,T.split+0.5)), dx=VW*0.06;
      g.save(); g.beginPath(); g.moveTo(0,0); g.lineTo(VW*0.55+dx,0); g.lineTo(VW*0.45-dx,VH); g.lineTo(0,VH); g.closePath(); g.clip(); g.translate(-VW*0.18*(1-k),0); bg(F,'BW',1.2,0.25,0.55); portal(F,t,VW*0.25,VH*0.18,VW*0.15,1); gojoSide(F,t,{crowd:67}); g.restore();
      g.save(); g.beginPath(); g.moveTo(VW*0.55+dx,0); g.lineTo(VW,0); g.lineTo(VW,VH); g.lineTo(VW*0.45-dx,VH); g.closePath(); g.clip(); g.translate(VW*0.18*(1-k),0); bg(F,'BW',1.2,0.75,0.55); spr(F,'FRIEND',VW*0.8,VH*0.95,VH*0.95,{shadow:false,pixel:true}); demonSky(F,t,1); painSide(F,t,{army:1}); g.restore();
      g.save(); g.strokeStyle='#ffffff'; g.lineWidth=5; g.beginPath(); g.moveTo(VW*0.55+dx,0); g.lineTo(VW*0.45-dx,VH); g.stroke(); g.restore(); }],
    // B13 BÙM — trắng xoá → TO BE CONTINUED… → FINAL · PART 2 — CHRISTMAS 2026
    [T.boom,T.DUR,(F,t,u)=>{ const g=F.g; if(t<T.tbc){ star4(g,VW*0.5,VH*0.5,VW*0.6*seg(t,T.boom,T.boom+0.1),VH*0.03,1); g.save(); g.fillStyle='rgba(255,255,255,'+seg(t,T.boom+0.08,T.tbc)+')'; g.fillRect(0,0,VW,VH); g.restore(); return; }
      g.fillStyle='#000'; g.fillRect(0,0,VW,VH); const a1=seg(t,T.tbc,T.tbc+0.6), a2=seg(t,T.xmas,T.xmas+0.8);
      g.save(); g.textAlign='center'; g.fillStyle='rgba(255,255,255,'+a1+')'; g.font='900 '+Math.round(VH*0.09)+'px Montserrat, Arial Black, sans-serif'; g.fillText('TO BE CONTINUED…',VW*0.5,VH*0.46);
      g.fillStyle='rgba(255,90,90,'+a2+')'; g.font='700 '+Math.round(VH*0.045)+'px Montserrat, Arial, sans-serif'; g.fillText('FINAL · PART 2 — CHRISTMAS 2026',VW*0.5,VH*0.58); g.restore(); }]];
  const R=P.runner(SHOTS);
  // ⏱️ chậm ở lúc tụ quân / thần xuất hiện / lặng · nhanh ở cổng xé, đổ bộ, ấn bùng
  const RETIME=[[0,T.bread,1],[T.bread,T.crack,1.1],[T.crack,T.portal,1.1],[T.portal,T.giant,0.9],[T.giant,T.seal,1],[T.seal,T.summon,0.9],[T.summon,T.shard,1],[T.shard,T.split,1.05],[T.split,T.DUR,1]];
  const film=def=>CineKit.film(window.Fin1Fight&&Fin1Fight.retime?Fin1Fight.retime(RETIME,def):def);
  film({ id:'fin1c7', title:'Final 1 · Kết · Hai phe tụ quân', DUR:T.DUR, VW, VH, fadeIn:false, fadeOut:true, imgs:IMG, shots:R.shots, world:R.world,
    sfx:[[0.3,'l2p_sub',0.4,null,'thành phố tàn lụi, Gojo và Pain đứng 2 đầu'],
      [T.ally+0.3,'se_step_in',0.5,null,'phe Gojo bước ra từ khói'],[T.foe+0.3,'se_step_in',0.45,null,'+ phe Pain bước ra từ khói (lớp của tiếng bước chân)'],
      [T.bread,'bc_spin',0.8,null,'Bread Cat hiện trên trời, bắt đầu xoay nghịch lý bơ'],[T.bread+1.4,'bc_zap',0.5,null,'+ đèn chớp, tia lửa dồn dập quanh Bread Cat (lớp của tiếng xoay)'],
      [T.crack,'l2p_riser',0.7,null,'thời không sụp vào 1 điểm'],
      [T.portal,'blackhole',1,null,'CỔNG thông đạo xé ra, muôn vàn vũ trụ phía sau'],
      [T.land+0.2,'se_quake',0.6,null,'meme đổ bộ ào xuống đường'],[T.land+0.9,'se_step_in',0.5,null,'+ tiếng đáp đất dồn dập (lớp của đổ bộ)'],
      [T.giant+0.4,'ep4_step1',0.9,null,'Gigachad bước ra khổng lồ'],[T.giant+1.0,'ep4_step2',0.9,null,'Chonky Dog bước ra khổng lồ'],[T.giant+1.2,'gigachad_roar',0.6,null,'+ Gigachad gầm (lớp của bước chân khổng lồ)'],
      [T.seal,'king_knight_summon',0.8,null,'Ninja kết ấn'],[T.sealOn,'kn_boom_low',0.7,null,'ẤN TRIỆU HỒI cháy loang trên nền đổ nát'],
      [T.summon,'demon_roar1',0.9,null,'Evil Gary + Catvader + binh đoàn ác quỷ bước ra'],[T.summon+0.6,'demon_roar2',0.6,null,'+ quỷ gầm vang (lớp của triệu hồi)'],
      [T.shard,'ep3_shine',0.6,null,'Depressed giơ mảnh vỡ, mảnh loé tím'],
      ...T.fStep.map((s,i)=>[s,['ep4_step1','ep4_step2','ep4_step3','ep4_step1'][i],0.95,null,(i?'+ ':'')+'Friend bước từ chân trời tới, mỗi bước rung cả thành phố']),[T.fStep[3]+0.4,'fr_titan_roar',0.9,null,'Friend gầm, đứng sau lưng Pain che kín trời'],
      [T.split,'l2p_whoosh',0.7,null,'màn hình chia đôi 2 phe'],[T.boom,'l2p_explode',1,null,'BÙM — trắng xoá'],[T.tbc+0.1,'ep3_shine',0.4,null,'TO BE CONTINUED']],
    impact:t=>{ const E=K.edit; return E.first(E.impacts(t,T.sealOn,3,[['#000000','#ff4a2a']],3),E.impacts(t,T.portal,3,[['#000000','#cfeeff']],3)); },
    grade:t=>{ const E=K.edit; if(t>=T.crack+0.8&&t<T.portal) return {sat:0.2}; return E.mix(E.duotone(t,T.summon,T.summon+1.4,'#1a0000','#ff4030',0.2,0.35),E.duotone(t,T.friend,T.split,'#0d0518','#b48cff',0.3,0.3),E.rgb(t,T.portal,0.5,8),E.rgb(t,T.boom,0.3,12)); },
    shake:t=>{ let s=0; const h=(a,amp,d)=>{ if(t>=a&&t<a+d) s=Math.max(s,amp*(1-(t-a)/d)); }; if(t>=T.bread+1&&t<T.crack+0.8) s=1+3*seg(t,T.bread,T.crack); h(T.portal,10,0.6); h(T.land+0.2,6,0.8); h(T.giant+0.4,10,0.5); h(T.giant+1.0,12,0.5); h(T.sealOn,8,0.5); h(T.summon,10,0.8); for(const x of T.fStep) h(x,12,0.5); h(T.boom,20,0.4); return s; },
    post(F,t){ const fx={shocks:[]}, sh=(a,sx,sy,rm,d,str)=>{ if(t>=a&&t<a+d){ const u=(t-a)/d; fx.shocks.push({sx,sy,r:20+rm*eout(u),w:30,str:str*(1-u)}); fx.chroma=Math.max(fx.chroma||0,0.3*(1-u)); } };
      sh(T.portal,VW*0.3,VH*0.3,VW*0.7,0.7,28); sh(T.sealOn,VW*0.76,GY,VW*0.5,0.6,20); for(const x of T.fStep) sh(x,VW*0.8,VH*0.9,VW*0.4,0.4,12); sh(T.boom,VW*0.5,VH*0.5,VW*0.9,0.4,30); return fx; },
    // 🎵 "Portals" (Avengers: Endgame, Alan Silvestri — có bản quyền, anh ok): bài lặng 8–19s rồi BÙNG ở 20s → canh off để cú bùng rơi ĐÚNG lúc cổng xé ra (Bread Cat → cổng = 4.84s sau giãn nhịp)
    mus:[{src:'assets/audio/mus_portals.m4a',ra:T.bread,rb:T.boom+0.3,off:15.16,vol:0.45,fi:0.6,fo:0.3}],
    screen(F,t){ K.letterbox(F,t<T.bread?0.5:0); K.vignette(F,0.5); } });
})();
