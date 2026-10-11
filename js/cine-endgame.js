// ===================== 🎬 CINEMATIC "MEMES ASSEMBLE" (Stalin vs Evil Gary — kiểu Avengers: Endgame) =====================
// Phân cảnh dựng sẵn, chạy trên 1 lớp phủ riêng (canvas 1080×1920, khung dọc như Shorts), KHÔNG đụng vào trận đấu thật.
// Mở bằng nút "Memes Assemble" ở màn chính (playCineEndgame trong game.js tải file này khi cần).
// Thế giới RỘNG hơn khung hình (phe meme bên trái, phe ác ở xa bên phải), máy quay lia/zoom theo kịch bản:
//   1  Stalin quỳ còn 10 máu, linh hồn xanh vây quanh · 2 một linh hồn giơ tay vung nhát kết liễu → bàn tay mèo CHẶN (cận)
//   → lùi máy: Adolf Catler · 3 "NEIN!" → sóng nổ quét tan linh hồn · 4 tiếng OIIA → cổng không gian kiểu Doctor Strange mở
//   khắp cánh đồng → meme đại diện lần lượt bước ra (cận + tên), đám đông lố nhố phía sau → toàn cảnh cả đội tập hợp
//   · 5 Catler nhặt búa đưa Stalin → đứng dậy giơ búa, sét giáng → "Memes… assemble." · 6 phía Evil Gary: trời đỏ sấm chớp
//   kiểu Stranger Things, Evil Larry khổng lồ trồi lên, bóng quỷ to đùng phía sau · 7 cả đội lao vào → DỪNG HÌNH → TO BE CONTINUED…
(function(){
  if(window._cineEG) return;
  const VW=540, VH=960, GROUND=560;
  const A=p=>{ const im=new Image(); im.src=p; return im; };
  const av=k=>A('assets/avatars/'+k+'/avatarUrl.webp');
  const IMG={ stalin:av('stalincat'), gary:av('evilgary'), larry:av('evillarry'), wdemon:A('assets/img/screamcat/SC_DEMON_IMG.webp'),
    catler:av('feuerkatze'), cross:A('assets/img/stalincat/STALIN_CROSS_IMG.webp'), catlerUp:A('assets/avatars/feuerkatze/attackAvatarUrl.webp'), hammer:A('assets/img/stalincat/STALIN_HAMMER_IMG.webp'),
    soulT:A('assets/img/evilgary/EG_SOUL_TORSO.webp'), soulL:A('assets/img/evilgary/EG_SOUL_LARM.webp'), soulR:A('assets/img/evilgary/EG_SOUL_RARM.webp') };
  IMG.catlerUp._feather=0.06;
  const SOUL_PIV={L:[0.10,0.50], R:[0.893,0.581]};
  const HERO_KEYS=['uiacat','chillguy','electricguitarcat','doge','cheems','ricardo','maxwell','gigachad'];
  // 🔊 tiếng đặc trưng của từng meme lúc bước ra (bản nhạc dài chỉ phát ~1.3s): [key, âm lượng, thời lượng]
  const HERO_SFX={ uiacat:[['uia_tele_dbz',0.9],['uiacat_spin',0.8]], chillguy:[['chillguy_kick',0.9]], electricguitarcat:[['guitar_jojo',0.8,1.4]],
    doge:[['infdoge_bonk',0.9]], cheems:[['cheems_bongo',1.0]], ricardo:[['ricardo_music',0.8,1.4]], maxwell:[['maxwell_dance',0.8,1.4]], gigachad:[['gigachad_roar',0.85,1.4]] };
  const RO=()=>{ try{ return (typeof roster!=='undefined' && roster) || []; }catch(e){ return []; } };
  const nameOf=k=>{ const r=RO().find(r=>r && r.charKey===k); return (r && r.name) || k; };
  const USED=new Set(['stalincat','evilgary','evillarry','feuerkatze',...HERO_KEYS]);
  // 🧼 ảnh bán thân bị CẮT THẲNG ở đáy → làm mờ dần mép dưới cho hoà vào sương (không còn mép chữ nhật) + tính khung bao
  const prep=im=>{ if(im._cp) return im._cp; if(!im.naturalWidth) return null;
    try{ const w=im.naturalWidth, h=im.naturalHeight, c=document.createElement('canvas'); c.width=w; c.height=h; const x=c.getContext('2d'); x.drawImage(im,0,0);
      const d=x.getImageData(0,0,w,h), px=d.data; let x0=w,y0=h,x1=0,y1=0, cut=0;
      for(let yy=0;yy<h;yy+=2) for(let xx=0;xx<w;xx+=2) if(px[(yy*w+xx)*4+3]>40){ if(xx<x0)x0=xx; if(xx>x1)x1=xx; if(yy<y0)y0=yy; if(yy>y1)y1=yy; }
      if(x1<x0){ x0=0;y0=0;x1=w-1;y1=h-1; }
      for(let xx=x0;xx<=x1;xx++) if(px[(y1*w+xx)*4+3]>120) cut++;
      if(cut>(x1-x0)*0.25){ const F=Math.round((y1-y0)*(im._feather==null?0.22:im._feather)); for(let yy=y1-F;yy<=y1;yy++){ const k=(y1-yy)/F; for(let xx=x0;xx<=x1;xx++){ const i=(yy*w+xx)*4+3; px[i]=px[i]*k; } } x.putImageData(d,0,0); }
      im._cp={src:c, sx:x0, sy:y0, sw:x1-x0+1, sh:y1-y0+1}; }catch(e){ im._cp={src:im, sx:0, sy:0, sw:im.naturalWidth, sh:im.naturalHeight}; }
    return im._cp; };
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)), seg=(t,a,b)=>clamp((t-a)/(b-a),0,1);
  const eio=x=>x*x*(3-2*x), eout=x=>1-Math.pow(1-x,3), lerp=(a,b,k)=>a+(b-a)*k;
  const back=x=>{ const c=1.70158; return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2); };
  let cv, g, SC, raf=null, t0=0, parts=[], played={}, overlay, crowd=[], heroes=[], shake=0, paused=false, pauseT=0, markOnly=false, panel=null;
  const sfx=(id,k,v,dur)=>{ if(played[id]) return; played[id]=1; if(markOnly) return; try{ playSample(k,v==null?1:v,dur||null); }catch(e){} };   // markOnly: ngay sau khi tua → chỉ đánh dấu, không phát dồn
  function actor(im,x,y,h,o){ o=o||{}; const c=prep(im); if(!c) return 0; const w=h*c.sw/c.sh;
    g.save(); g.globalAlpha*=(o.a==null?1:o.a); g.translate(x,y); if(o.rot) g.rotate(o.rot); g.scale((o.flip?-1:1)*(o.sx||1),o.sy||1);
    if(o.glow){ g.shadowColor=o.glow; g.shadowBlur=o.gb||18; }
    g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,-w/2,-h,w,h); g.restore(); return w; }
  function shadow(x,y,w,a){ g.save(); g.globalAlpha=a==null?0.4:a; const gr=g.createRadialGradient(x,y,0,x,y,w); gr.addColorStop(0,'rgba(0,0,0,0.85)'); gr.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=gr; g.beginPath(); g.ellipse(x,y,w,w*0.22,0,0,Math.PI*2); g.fill(); g.restore(); }
  function glow(x,y,r,a,c){ if(a<=0.01||r<=0) return; const gr=g.createRadialGradient(x,y,0,x,y,r); gr.addColorStop(0,`rgba(${c},${a})`); gr.addColorStop(0.5,`rgba(${c},${a*0.4})`); gr.addColorStop(1,`rgba(${c},0)`); g.fillStyle=gr; g.beginPath(); g.arc(x,y,r,0,Math.PI*2); g.fill(); }
  function bolt(x1,y1,x2,y2,w,a,c,core){ const pts=[[x1,y1]], n=10, dx=x2-x1, dy=y2-y1, L=Math.hypot(dx,dy)||1, nx=-dy/L, ny=dx/L;
    for(let i=1;i<n;i++){ const u=i/n, j=(Math.random()-0.5)*L*0.2; pts.push([x1+dx*u+nx*j,y1+dy*u+ny*j]); } pts.push([x2,y2]);
    g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round'; g.lineJoin='round';
    for(const [lw,al,cc] of [[w*4,0.22,c],[w*1.8,0.6,c],[w*0.7,1,core||'255,255,255']]){ g.strokeStyle=`rgba(${cc},${a*al})`; g.lineWidth=lw; g.beginPath(); pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); }
    g.restore(); }
  function text(s,x,y,px,fill,stroke,font,al){ g.save(); g.globalAlpha*=(al==null?1:al); g.font=font||`900 ${px}px Impact,"Arial Black",sans-serif`; g.textAlign='center'; g.textBaseline='middle'; g.lineJoin='round';
    if(stroke){ g.lineWidth=px*0.16; g.strokeStyle=stroke; g.strokeText(s,x,y); } g.fillStyle=fill; g.fillText(s,x,y); g.restore(); }
  // ── linh hồn xanh: thân + 2 tay tách rời; trả về vị trí MÓNG tay phải (world) ──
  function soul(x,y,h,flip,aR,aL,a,lean){ const im=IMG.soulT; if(!im.naturalWidth) return null;
    const w=h*im.naturalWidth/im.naturalHeight, top=-h*0.55;
    g.save(); g.globalAlpha*=a; g.translate(x,y); if(lean) g.rotate(lean); g.translate(0,-h*0.45); y-=h*0.45;   // y truyền vào = chân; lean = chúi người (xoay quanh chân)
    g.scale(flip?-1:1,1);
    const arm=(L,pv,an)=>{ const pX=-w/2+w*pv[0], pY=top+h*pv[1]; g.save(); g.translate(pX,pY); g.rotate(an); g.translate(-pX,-pY); g.drawImage(L,-w/2,top,w,h); g.restore(); };
    g.shadowColor='rgba(80,255,190,0.5)'; g.shadowBlur=12;
    arm(IMG.soulL,SOUL_PIV.L,aL); arm(IMG.soulR,SOUL_PIV.R,aR); g.drawImage(IMG.soulT,-w/2,top,w,h);
    g.restore();
    const pX=-w/2+w*SOUL_PIV.R[0], pY=top+h*SOUL_PIV.R[1], vx=(0.76-SOUL_PIV.R[0])*w, vy=(0.97-SOUL_PIV.R[1])*h;
    const cx=pX+vx*Math.cos(aR)-vy*Math.sin(aR), cy=pY+vx*Math.sin(aR)+vy*Math.cos(aR);
    return [x+(flip?-cx:cx), y+cy]; }
  // ── cánh tay + bàn tay mèo (ngắn, có khuỷu cong) ──
  function catArm(sx,sy,px,py,s){
    const mx=(sx+px)/2+(py-sy)*0.15, my=(sy+py)/2-(px-sx)*0.15;   // khuỷu cong nhẹ
    g.save(); g.lineCap='round'; g.lineJoin='round';
    for(const [lw,c] of [[s*0.36+3,'#2a2522'],[s*0.36,'#f2efe8']]){ g.strokeStyle=c; g.lineWidth=lw; g.beginPath(); g.moveTo(sx,sy); g.quadraticCurveTo(mx,my,px,py); g.stroke(); }
    g.strokeStyle='rgba(180,170,155,0.6)'; g.lineWidth=s*0.1; g.beginPath(); g.moveTo(sx+3,sy+4); g.quadraticCurveTo(mx+3,my+4,px+2,py+4); g.stroke();
    const a=Math.atan2(py-my,px-mx); g.translate(px,py); g.rotate(a);
    g.fillStyle='#f6f3ec'; g.strokeStyle='#2a2522'; g.lineWidth=2;
    g.beginPath(); g.ellipse(s*0.05,0,s*0.22,s*0.2,0,0,Math.PI*2); g.fill(); g.stroke();
    for(const [ox,oy] of [[0.24,-0.15],[0.29,-0.05],[0.29,0.06],[0.24,0.16]]){ g.beginPath(); g.ellipse(s*ox,s*oy,s*0.075,s*0.065,0,0,Math.PI*2); g.fill(); g.stroke(); }
    g.fillStyle='#f48fb1'; g.beginPath(); g.ellipse(s*0.06,0,s*0.09,s*0.08,0,0,Math.PI*2); g.fill();
    g.restore(); }
  // ── cổng không gian kiểu Doctor Strange: cửa sổ nhìn sang thế giới khác + vòng tia lửa cam xoay ──
  function portal(x,y,r,k,t,seed){ if(k<=0.01) return; const R=r*eout(k), cy=y-R*1.02;
    g.save(); g.translate(x,cy);
    g.save(); g.beginPath(); g.ellipse(0,0,R*0.8,R,0,0,Math.PI*2); g.clip();
    g.fillStyle='#4574c6'; g.fillRect(-R,-R,R*2,R*2);   // phía bên kia cổng là SÀN ĐẤU xanh của game → meme chui ra từ sàn đấu
    g.save(); g.translate(0,R*0.12); g.scale(1,0.55);   // viền sàn đấu (3 vòng #333 → #888 → #333), nhìn chếch phối cảnh
    for(const [lw,c] of [[R*0.12,'#2b2b2b'],[R*0.065,'#8a8a8a'],[R*0.03,'#2b2b2b']]){ g.strokeStyle=c; g.lineWidth=lw; g.beginPath(); g.roundRect(-R*0.6,-R*0.6,R*1.2,R*1.2,R*0.08); g.stroke(); }
    g.restore();
    const lg=g.createRadialGradient(0,R*0.1,0,0,0,R); lg.addColorStop(0,'rgba(255,255,255,0.28)'); lg.addColorStop(1,'rgba(255,255,255,0)'); g.fillStyle=lg; g.fillRect(-R,-R,R*2,R*2);
    g.restore();
    g.globalCompositeOperation='lighter';
    g.strokeStyle='rgba(255,170,40,0.95)'; g.lineWidth=3.5; g.shadowColor='#ff9100'; g.shadowBlur=18; g.beginPath(); g.ellipse(0,0,R*0.8,R,0,0,Math.PI*2); g.stroke(); g.shadowBlur=0;
    for(let i=0;i<54;i++){ const a=i/54*Math.PI*2+t*3+(i%3)*0.35, rr=1+0.07*Math.sin(t*11+i*1.7), x1=Math.cos(a)*R*0.8*rr, y1=Math.sin(a)*R*rr, x2=Math.cos(a+0.12)*R*0.8*rr, y2=Math.sin(a+0.12)*R*rr;
      g.strokeStyle=`rgba(255,${150+((i*41)%100)},${30+((i*13)%40)},0.9)`; g.lineWidth=1.8; g.beginPath(); g.moveTo(x1,y1); g.lineTo(x2,y2); g.stroke(); }
    g.restore();
    if(Math.random()<0.7*k){ const a=Math.random()*Math.PI*2; parts.push({k:'spark',x:x+Math.cos(a)*R*0.8,y:cy+Math.sin(a)*R,vx:-Math.sin(a)*2.6+(Math.random()-0.5),vy:Math.cos(a)*2.6+0.6,l:22,L:22,c:'255,170,40'}); } }
  // ═════════ BỐ CỤC ═════════
  const ST={x:150,y:800}, GARY={x:930,y:700};
  const CATP={x:ST.x-100, y:ST.y-10};   // sau cú nổ: Catler đứng LÙI sau, bên trái Stalin (không che Stalin)   // Catler đứng BÊN TRÁI Stalin, vươn tay qua đầu Stalin chặn móng
  const HP=[ // [cổng x, chân y, bán kính, chỗ đứng x, y, chiều cao meme] — hero i ↔ cổng i, trải rộng & có chiều sâu
    [330,820,60, 330,850,120],[-175,800,58,-175,840,118],[440,720,52, 440,752,104],[-310,700,50,-310,735,100],
    [250,680,46, 250,710, 94],[-160,690,48,-160,722, 96],[540,650,44, 540,680, 88],[580,790,62, 580,830,132]];
  const BACKP=[[-260,640,30],[-90,612,28],[60,602,26],[210,606,28],[360,616,30],[480,600,24],[-200,600,24],[600,612,26]];
  const HERO_T0=13.4, HERO_DT=1.3, UIA_T=10.2, UIA_SPIN=2.2;   // UIA lao tới trước, xoay 2.2s mở các cổng; meme khác bước ra từ HERO_T0
  const SOULS=[{a:3.3},{a:2.85},{a:0.2},{a:5.75},{a:4.5}].map((s,i)=>({...s,ph:i*1.3}));
  const ATT={x:ST.x+238, y:ST.y+16}, ATT_H=232;   // linh hồn vung nhát kết liễu: to, lừng lững bên phải Stalin
  function setup(){
    parts=[]; played={};
    heroes=HERO_KEYS.map((k,i)=>({k, name:nameOf(k).toUpperCase(), im:av(k), P:HP[i], t:i===0?UIA_T:HERO_T0+(i-1)*HERO_DT}));
    const pool=RO().filter(r=>r && r.charKey && !USED.has(r.charKey) && r.avatarUrl).map(r=>r.avatarUrl).sort(()=>Math.random()-0.5).slice(0,34);
    crowd=pool.map((u,i)=>{ const p=BACKP[i%BACKP.length]; return {im:A(u), p, t:13.6+i*0.27, tx:p[0]+(Math.random()-0.5)*110, ty:p[1]+6+Math.random()*34, h:40+Math.random()*16, ph:Math.random()*6}; });
  }
  // 🌀 UIA CAT: lao vút từ ngoài khung vào đúng cổng (bóng tàn ảnh + vệt tốc độ) → xoay tít kiểu OIIA chậm dần → đứng nhìn
  function uiaDraw(H,tf,chargeK,run,D){ const P=H.P, dash=seg(tf,H.t,H.t+0.22), spin=seg(tf,H.t+0.22,H.t+0.22+UIA_SPIN); if(dash<=0) return;
    const x0=P[3]-520, x=(tf>=T_CUT2_G)?armyX(P[3],FXG,0.38):lerp(x0,P[3],eout(dash))+run(230), y=P[4], hh=P[5];
    D.push({y, f:()=>{
      if(dash<1){ for(let k=1;k<=5;k++){ const gx=lerp(x0,P[3],Math.max(0,eout(dash)-k*0.07)); actor(H.im,gx,y,hh,{a:0.35-k*0.06,sx:Math.cos(tf*60+k)}); }
        g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle='rgba(255,255,255,0.8)'; g.lineWidth=3; for(let k=0;k<6;k++){ const yy=y-hh*(0.15+k*0.14); g.beginPath(); g.moveTo(x-30,yy); g.lineTo(x-220,yy); g.stroke(); } g.restore(); }
      const sp=dash<1?60:lerp(55,0,eout(spin)), ph=(tf-H.t)*sp, sx=spin<1?Math.cos(ph):1;   // xoay quanh trục dọc (lật mặt) nhanh → chậm dần
      shadow(x,y,hh*0.3,0.4); actor(H.im,x,y-(chargeK>0?Math.abs(Math.sin(tf*9))*6:0),hh,{sx:Math.abs(sx)<0.08?0.08:sx,rot:chargeK>0?0.13:0});
      if(spin>0 && spin<1){ g.save(); g.globalCompositeOperation='lighter';   // 🌀 vòng năng lượng cam toả ra theo vòng xoay → mở các cổng
        for(let q=0;q<3;q++){ const v=((tf-H.t-0.22)*1.4+q/3)%1; g.strokeStyle=`rgba(255,170,40,${0.7*(1-v)*(1-spin*0.5)})`; g.lineWidth=3*(1-v)+1; g.beginPath(); g.ellipse(x,y-hh*0.3,40+v*520,(40+v*520)*0.32,0,0,Math.PI*2); g.stroke(); }
        g.restore(); g.save(); g.globalCompositeOperation='lighter'; for(let k=0;k<2;k++){ g.strokeStyle=`rgba(200,230,255,${0.6*(1-spin)})`; g.lineWidth=2; g.beginPath(); g.ellipse(x,y-hh*(0.35+k*0.3),hh*0.55,hh*0.12,0,0,Math.PI*2); g.stroke(); } g.restore(); }   // vòng gió xoáy
    }}); }
  const SUM0=2.6, SUM_D=6.0;   // 😈 đoạn chèn: Evil Gary thắp ngôi sao quỷ, gọi Evil Larry khổng lồ + quỷ có cánh trên trời
  const T_UP=3.0, T_HOLD=3.7, T_STRIKE=4.12, T_BLOCK=4.35;   // giơ tay → gồng giữ trên cao → bổ xuống → bị chặn
  // 🎵 nhạc/tiếng nền chạy theo THỜI GIAN THẬT của phim (tR): tự bám đúng chỗ khi tua, dừng khi tạm dừng/đóng
  //   tim đập chậm (Stalin nằm) → tim đập nhanh (quỷ gồng tay) → kèn chiến trận dồn dần (UIA tới, cổng mở, meme bước ra)
  //   → dàn nhạc chiến trận (Memes… assemble → lao vào) → cắt phụt lúc DỪNG HÌNH
  let MUS=[];
  function musSetup(){ musStop(); const E=tE()+SUM_D, TB=T_BLOCK+SUM_D, TE=E+13.5, EP=E+3.3;
    const mk=(src,a,b,vol,o)=>Object.assign({el:Object.assign(new Audio(src),{preload:'auto'}),a,b,vol},o||{});
    MUS=[ mk('assets/audio/cine_heart.mp3',0.4,SUM0,0.9,{loop:true,fi:0.6,fo:0.4}),
      mk('assets/audio/cine_heart.mp3',SUM0+SUM_D,T_HOLD+SUM_D,0.9,{loop:true,fi:0.3,fo:0.15}),
      mk('assets/audio/cine_heart_fast.mp3',T_HOLD+SUM_D,TB,1.0,{loop:true,fo:0.05}) ];   // (nhạc nền + tiếng mở cổng: user tự thêm sau)
    for(const m of MUS) m.el.loop=!!m.loop; }
  function musTick(tR){ for(const m of MUS){ const on=!paused && tR>=m.a && tR<m.b;
      if(!on){ if(!m.el.paused) m.el.pause(); continue; }
      const pos=tR-m.a, d=m.el.duration||1e9;
      if(!m.loop && pos>=d){ if(!m.el.paused) m.el.pause(); continue; }
      if(m.el.paused){ try{ m.el.currentTime=m.loop?pos%d:pos; }catch(e){} m.el.play().catch(()=>{}); }
      else if(!m.loop && Math.abs(m.el.currentTime-pos)>0.35){ try{ m.el.currentTime=pos; }catch(e){} }   // lệch nhịp (sau khi tua) → bám lại
      let v=m.vol; if(m.fi) v*=seg(tR,m.a,m.a+m.fi); if(m.fo) v*=1-seg(tR,m.b-m.fo,m.b); if(m.duckA) v*=lerp(1,m.duckTo,seg(tR,m.duckA,m.duckB));
      m.el.volume=clamp(v,0,1); } }
  function musStop(){ for(const m of MUS){ try{ m.el.pause(); }catch(e){} } }
  const armyX=(x0,fx,sc)=>fx-140-(560-x0)*sc;   // cảnh cuối: cả đội (x gốc -330..600) dồn sát sau lưng Stalin, vẫn giữ đội hình
  let T_CUT2_G=1e9, FXG=0;   // (cho uiaDraw — nằm ngoài frame)
  let C=null;   // điểm bàn tay mèo chụp móng linh hồn (chốt lúc chặn)
  // góc tay phải của linh hồn để móng chĩa đúng điểm NGAY TRÊN ĐẦU Stalin (nơi bàn tay Catler sẽ chặn)
  function attGeo(){ const im=IMG.soulT; if(!im.naturalWidth) return null; const h=ATT_H, w=h*im.naturalWidth/im.naturalHeight, top=-h*0.55, yc=ATT.y-h*0.45;
    return { yc, pX:-w/2+w*SOUL_PIV.R[0], pY:top+h*SOUL_PIV.R[1], vx:(0.76-SOUL_PIV.R[0])*w, vy:(0.97-SOUL_PIV.R[1])*h }; }
  const norm=a=>{ while(a>0.5) a-=Math.PI*2; while(a<-Math.PI*1.6) a+=Math.PI*2; return a; };
  function attEndAngle(){ const G=attGeo(); if(!G) return -2.4;   // móng chĩa xuống điểm NGAY TRÊN NGƯỜI Stalin đang nằm (chỗ bàn tay Catler chặn)
    const P=catPaw(), lx=-(P[0]-ATT.x), ly=P[1]-G.yc; return norm(Math.atan2(ly-G.pY,lx-G.pX)-Math.atan2(G.vy,G.vx)); }   // móng bổ thẳng vào bàn tay Catler
  function attUpAngle(){ const G=attGeo(); if(!G) return -3.3; return norm(-Math.PI/2-Math.atan2(G.vy,G.vx))-0.28; }   // tay giơ THẲNG lên trời, hơi ngả ra sau
  // ⛧ ngôi sao quỷ vẽ dần từng nét trên mặt đất quanh Evil Gary + cột sáng đỏ
  function pentagram(x,y,k,tm){ const RX=175, RY=46, P=[0,1,2,3,4].map(i=>{ const a=-Math.PI/2+i*Math.PI*2/5; return [x+Math.cos(a)*RX, y+Math.sin(a)*RY]; }), ord=[0,2,4,1,3,0];
    const pul=0.75+0.25*Math.sin(tm*6);
    g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round'; g.lineJoin='round';
    const segs=5, drawn=k*(segs+1);
    for(const [lw,c,al] of [[12,'255,30,30',0.25],[5,'255,60,40',0.6],[2,'255,220,200',0.95]]){ g.strokeStyle=`rgba(${c},${al*pul})`; g.lineWidth=lw;
      g.beginPath(); for(let i=0;i<segs && i<drawn;i++){ const a=P[ord[i]], b=P[ord[i+1]], u=Math.min(1,drawn-i); if(i===0) g.moveTo(a[0],a[1]); g.lineTo(a[0]+(b[0]-a[0])*u, a[1]+(b[1]-a[1])*u); } g.stroke();
      if(drawn>segs){ g.beginPath(); g.ellipse(x,y,RX*1.08,RY*1.08,0,-Math.PI/2,-Math.PI/2+Math.PI*2*Math.min(1,drawn-segs)); g.stroke(); } }
    if(k>=1){ const pg=g.createLinearGradient(x-RX,0,x+RX,0); pg.addColorStop(0,'rgba(255,0,0,0)'); pg.addColorStop(0.5,`rgba(255,40,30,${0.22*pul})`); pg.addColorStop(1,'rgba(255,0,0,0)'); g.fillStyle=pg; g.fillRect(x-RX,y-900,RX*2,900); }
    g.restore(); }
  // 🦇 quỷ có cánh (sprite bung cánh của Evil Gary): khung 5 choàng áo → 6 cánh đang mở → 7 dang hết cánh
  function wingDemon(x,yB,w,a,wing,tm){ const im=IMG.wdemon; if(!im.naturalWidth) return; const FW=494, FH=320, h=w*FH/FW, fr=5+Math.min(2,Math.floor(wing*3));
    g.save(); g.globalAlpha=a*0.95; g.shadowColor='rgba(255,0,0,0.85)'; g.shadowBlur=40; g.drawImage(im,fr*FW,0,FW,FH,x-w/2,yB-h,w,h); g.restore();
    g.save(); g.globalCompositeOperation='lighter'; const ex=x-w/2+w*0.553, ey=yB-h+h*0.55, ep=0.6+0.4*Math.sin(tm*5); glow(ex,ey,w*0.07,0.7*a*ep,'255,40,30'); g.restore(); }
  // máy quay đoạn triệu hồi: Gary + ngôi sao → Larry trồi lên → ngửa lên trời thấy quỷ có cánh
  function sumCam(u){ const K=[[0,GARY.x-10,640,0.95],[2.2,GARY.x-10,630,0.85],[2.6,GARY.x,540,0.62],[3.4,GARY.x,470,0.55],[4.0,GARY.x-20,280,0.42],[6.0,GARY.x-20,250,0.42]];
    for(let i=0;i<K.length-1;i++){ const a=K[i], b=K[i+1]; if(u>=a[0] && u<=b[0]){ const k=eio((u-a[0])/(b[0]-a[0])); return [lerp(a[1],b[1],k),lerp(a[2],b[2],k),lerp(a[3],b[3],k)]; } } return [K[5][1],K[5][2],K[5][3]]; }
  const PAW=[0.11,0.075];   // bàn tay giơ lên trong ảnh Catler giơ tay (tỉ lệ theo khung bao hình)
  const CB={x:ST.x+128, y:ST.y+10, h:178}, CAT_NORM_H=100;   // ảnh Catler thường là cận MẶT → cao 100 thì đầu bằng cỡ đầu trong ảnh giơ tay 178   // Catler lúc chặn: đứng CHẮN trước-bên phải Stalin (giữa Stalin và con quỷ)
  function catBlockPos(){ return CB; }
  function catPaw(){ const c=prep(IMG.catlerUp); const w=c?CB.h*c.sw/c.sh:CB.h*0.65; return [CB.x+(0.5-PAW[0])*w, CB.y-(1-PAW[1])*CB.h]; }   // bàn tay giơ lên (ảnh lật → tay bên phải)
  const tE=()=>HERO_T0+HERO_DT*(heroes.length-1);   // ≈22.5 (UIA đã ra trước)
  function camAt(t){
    const E=tE();
    if(t>=E+8.0){ const u=seg(t,E+8.0,E+10.0), k=eio(seg(u,0.3,0.85)); return [GARY.x-250+lerp(0,25,k), lerp(612,470,k), lerp(0.95,0.7,k)]; }   // cảnh cuối (CẮT): lao vào → ngửa máy theo cú nhảy
    if(t>=HERO_T0 && t<E){ const i=1+Math.floor((t-HERO_T0)/HERO_DT), P=heroes[i].P, u=(t-HERO_T0-(i-1)*HERO_DT)/HERO_DT;
      return [P[3], P[4]-P[5]*0.55, lerp(1.85,2.05,u)]; }
    const cx=C?C[0]:ST.x+80, cy=C?C[1]:ST.y-150;
    const K=[[0,170,720,1.0],[T_UP,162,716,1.2],                       // cảnh 1: toàn cảnh, đẩy máy rất chậm
      [T_UP,ST.x+70,655,1.5],[T_BLOCK,ST.x+70,645,1.65],                  // cảnh 2 (CẮT): góc thấp — quỷ giơ tay gồng lên rồi bổ xuống
      [T_BLOCK,cx-15,cy+40,1.95],[5.5,cx-15,cy+38,2.0],                   // cảnh 3 (CẮT): khung chặn đòn
      [5.5,ST.x+60,700,1.75],[6.75,ST.x+70,695,1.8],                      // cảnh 4 (CẮT): toàn cảnh Catler che chở Stalin
      [6.85,ST.x+80,680,1.85],[7.7,ST.x+60,700,1.6],[9.6,170,700,1.35],
      [UIA_T,170,700,1.15],[UIA_T,HP[0][3],HP[0][4]-70,1.75],[UIA_T+1.0,HP[0][3],HP[0][4]-75,1.85],[UIA_T+2.3,140,680,0.7],[HERO_T0,140,680,0.7],
      [E,140,690,0.56],[E+1.2,150,690,0.52],[E+1.7,ST.x-20,730,1.55],[E+3.3,ST.x,715,1.6],[E+4.2,ST.x+20,700,1.4],
      [E+4.8,GARY.x,470,0.6],[E+6.8,GARY.x-10,480,0.55],[E+7.0,450,645,0.62],[E+8.0,500,640,0.6],[999,500,640,0.6]];
    for(let i=0;i<K.length-1;i++){ const a=K[i], b=K[i+1]; if(t>=a[0] && t<=b[0]){ const k=(b[0]-a[0]<0.2)?1:eio((t-a[0])/(b[0]-a[0])); return [lerp(a[1],b[1],k),lerp(a[2],b[2],k),lerp(a[3],b[3],k)]; } }
    return [560,630,0.58];
  }
  function frame(now){
    raf=requestAnimationFrame(frame);
    const tR=paused?pauseT:(now-t0)/1000;                        // thời gian THẬT của phim
    const inSum=tR>=SUM0 && tR<SUM0+SUM_D, su=tR-SUM0;           // đang ở đoạn Evil Gary triệu hồi?
    const t=tR<SUM0?tR:(inSum?SUM0:tR-SUM_D);                    // thời gian của kịch bản cũ (đứng yên trong lúc triệu hồi)
    const E=tE(), T_CHARGE=E+7.0, T_CUT2=E+8.0, T_FREEZE=E+10.0, T_END=E+13.5;
    const tf=Math.min(t,T_FREEZE);
    // ── âm thanh ──
    if(t>=T_STRIKE) sfx('whoosh','wg_axe_whoosh',1.0);
    if(t>=T_BLOCK){ sfx('block','vine_boom',1.0); sfx('clang','bk_clang',0.75); }
    if(t>=6.85) sfx('nein','nein',1.0);
    if(t>=7.3) sfx('blast','ultimate_charge_2',0.8);
    for(let i=0;i<5;i++) if(t>=7.55+i*0.2) sfx('die'+i,'death_break',0.45);
    for(let i=0;i<heroes.length;i++) if(t>=heroes[i].t+0.05) (HERO_SFX[heroes[i].k]||[]).forEach((q,j)=>sfx('h'+i+'_'+j,q[0],q[1],q[2]));
    if(t>=E+3.0) sfx('ham','holy_thunder',0.85);
    if(t>=E+4.9) sfx('thunder','holy_thunder',1.0);
    if(tR>=SUM0+0.3) sfx('s_necro','eg_necro',1.0);
    if(tR>=SUM0+1.9) sfx('s_thunder','holy_thunder',0.9);
    { const w0=SUM0+3.6, wd=1.4; if(tR>=w0+wd/3) sfx('s_wing1','sc_wing',1.8); if(tR>=w0+wd*2/3) sfx('s_wing2','sc_wing',2.0); }   // 🦇 vỗ cánh đúng lúc cánh hé mở (khung 6) và dang hết (khung 7)
    if(tR>=SUM0+4.5) sfx('s_laugh','gp_evil_laugh',0.95);
    if(t>=T_FREEZE) sfx('freeze','vine_boom',1.0);
    // ── máy quay ──
    let [cx,cy,cz]=inSum?sumCam(su):camAt(tf); if(t>=T_FREEZE) cz*=1+0.07*eout(seg(t,T_FREEZE,T_FREEZE+0.4));
    shake*=0.88; if(Math.abs(t-(T_BLOCK+0.03))<0.05) shake=12; if(t>T_HOLD && t<T_STRIKE) shake=Math.max(shake,1.5); if(Math.abs(t-7.33)<0.05) shake=8; if(Math.abs(t-(E+4.95))<0.05) shake=8; if(Math.abs(t-(E+3.05))<0.05) shake=7; if(t>=T_FREEZE&&t<T_FREEZE+0.06) shake=12;
    const ox=(Math.random()-0.5)*shake, oy=(Math.random()-0.5)*shake;
    g.setTransform(1,0,0,1,0,0); g.fillStyle='#000'; g.fillRect(0,0,cv.width,cv.height);
    g.setTransform(SC*cz,0,0,SC*cz,SC*(VW/2-cx*cz+ox),SC*(VH/2-cy*cz+oy));
    const red=eio(seg(tR,SUM0+1.8,SUM0+3.0));
    const fin=tf>=T_CUT2, finU=seg(tf,T_CUT2,T_FREEZE), FX=lerp(GARY.x-480,GARY.x-235,eio(finU)), FY=GARY.y+52;   // cảnh cuối: Stalin dẫn đầu lao tới…
    T_CUT2_G=T_CUT2; FXG=FX;
    const jump=eout(seg(finU,0.32,0.85)), JY=FY-280*jump, sunK=seg(finU,0.66,0.8);   // …nhảy vọt lên, búa + liềm chạm nhau loé sáng như MẶT TRỜI   // trời hoá đỏ từ lúc triệu hồi và giữ tới cuối
    // ── nền: trời bão / thành phố đổ nát / mặt đất cháy sém (js/cine-bg.js) — tự chuyển sang Upside Down đỏ theo `red` ──
    if(window._cineBG) window._cineBG.draw(g,tf,red);
    if(red>0){ if(Math.sin(tf*19)>0.86 || Math.random()<0.025){ g.fillStyle=`rgba(255,40,40,${0.16*red})`; g.fillRect(-1400,-1400,3000,GROUND+1400);
        bolt(GARY.x-260+Math.random()*520,-700,GARY.x-150+Math.random()*300,GROUND-180,4,red,'255,30,30','255,210,210'); } }
    // ── phe ác: bóng quỷ → Evil Larry khổng lồ → Evil Gary ──
    const rise=eout(seg(tR,SUM0+2.4,SUM0+3.8)), demA=eout(seg(tR,SUM0+3.3,SUM0+4.1)), wing=seg(tR,SUM0+3.6,SUM0+5.0), starK=seg(tR,SUM0+0.3,SUM0+2.0);
    if(demA>0) wingDemon(GARY.x-20,GROUND-240+Math.sin(tR*1.3)*12,1300,demA,wing,tR);   // 🦇 quỷ có cánh khổng lồ trên trời
    if(starK>0) pentagram(GARY.x,GARY.y+6,starK,tR);                                      // ⛧ ngôi sao quỷ dưới chân Gary
    const turn=eio(seg(tf,E+5.0,E+5.9)), tsx=(v=>Math.sign(v||1)*Math.max(0.06,Math.abs(v)))(lerp(-1,1,turn));   // Larry + Gary đang quay lưng → QUAY MẶT LẠI phía đội meme
    const finK=fin?eio(finU):0;
    if(rise>0){ actor(IMG.larry,GARY.x+20-finK*30,GROUND+40+(1-rise)*420,600,{sx:tsx,rot:-0.07*finK,glow:'rgba(170,0,255,0.75)',gb:34,sy:1+0.012*Math.sin(tf*2)}); }
    { const lb=1+0.04*Math.abs(Math.sin(tf*7)); glow(GARY.x,GARY.y-50,130+60*(inSum?1:0),0.25+0.25*red+(inSum?0.25*Math.sin(tR*8)*0.5+0.2:0),'255,40,40'); const gx=GARY.x-finK*90, gy=GARY.y-Math.sin(Math.PI*finK)*18; shadow(gx,GARY.y,60); actor(IMG.gary,gx,gy,125,{sx:tsx,sy:lb,rot:-0.12*finK,glow:'rgba(255,30,30,0.95)',gb:22}); }
    // ── cổng không gian (đóng lại sau khi meme bước ra) ──
    const chargeK=seg(tf,T_CHARGE,T_FREEZE), run=d=>eio(chargeK)*d;
    heroes.forEach((H,i)=>{ if(i===0) return; const P=H.P, o=UIA_T+0.6+(i-1)*0.22; const k=seg(tf,o,o+0.5)*(1-seg(tf,H.t+1.0,H.t+1.5)); portal(P[0],P[1],P[2],k,tf,i); });
    BACKP.forEach((p,i)=>{ const k=seg(tf,UIA_T+1.0+i*0.2,UIA_T+1.5+i*0.2)*(1-seg(tf,E+0.6,E+1.2)); portal(p[0],p[1],p[2],k,tf,i+20); });
    // ── vẽ theo chiều sâu (y nhỏ = xa = vẽ trước) ──
    const D=[];
    for(const c of crowd){ const u=seg(tf,c.t,c.t+1.0); if(u<=0) continue; const y=lerp(c.p[1]-4,c.ty,eout(u));
      D.push({y, f:()=>{ const x=fin?armyX(c.tx,FX,0.42):lerp(c.p[0],c.tx,eout(u))+run(220), mv=u<1||chargeK>0, bob=Math.abs(Math.sin((tf+c.ph)*(mv?9:2.5)))*(mv?4:1);
        shadow(x,y,c.h*0.33,0.35); actor(c.im,x,y-bob,c.h*(0.4+0.6*eout(u)),{a:Math.min(1,u*3),rot:chargeK>0?0.12:Math.sin(tf*1.5+c.ph)*0.03}); }}); }
    for(const H of heroes){ if(H.k==='uiacat'){ uiaDraw(H,tf,chargeK,run,D); continue; }
      const u=seg(tf,H.t,H.t+0.8); if(u<=0) continue; const P=H.P, y=lerp(P[1]-6,P[4],eout(u));
      D.push({y, f:()=>{ const x=fin?armyX(P[3],FX,0.38):lerp(P[0],P[3],eout(u))+run(230), mv=u<1||chargeK>0, bob=Math.abs(Math.sin(tf*9+H.t))*(mv?6:1.2), hh=lerp(P[5]*0.45,P[5],eout(u));
        shadow(x,y,hh*0.3,0.4); actor(H.im,x,y-bob,hh,{a:Math.min(1,u*4),rot:chargeK>0?0.13:Math.sin(tf*2+H.t)*0.025}); }}); }
    // Stalin
    const stand=eout(seg(tf,E+2.5,E+3.2)), raise=eout(seg(tf,E+3.0,E+3.5));   // Stalin chống dậy lúc nhận búa
    D.push({y:fin?FY:ST.y, f:()=>{ if(fin){ const b=jump>0?0:Math.abs(Math.sin(tf*10))*8; shadow(FX,FY,58*(1-jump*0.5)); actor(IMG.stalin,FX,JY-b,170,{rot:0.16-0.2*jump}); return; }
      const x=lerp(ST.x+62,ST.x,stand)+run(240), bob=chargeK>0?Math.abs(Math.sin(tf*9))*7:0, br=stand<1?0.02*Math.sin(tf*2.2):0;   // thở thoi thóp
      shadow(lerp(ST.x-8,ST.x,stand)+run(240),ST.y,lerp(85,62,stand)); actor(IMG.stalin,x,ST.y-bob,lerp(150,170,stand),{sy:1+br,rot:chargeK>0?0.12:lerp(-1.48,0,stand)}); }});
    // Catler: đứng NGAY SAU LƯNG Stalin, dùng đúng ảnh Catler GIƠ TAY (ảnh lật để tay giơ về phía linh hồn) — bàn tay chặn
    //   đúng móng linh hồn ngay trên đầu Stalin · sau cú nổ thì về ảnh thường và bước sang trái Stalin (chỗ nhặt búa)
    const BP=catBlockPos(), mv=eio(seg(tf,9.0,10.0)), catX=lerp(BP.x,CATP.x,mv), catY=lerp(BP.y,CATP.y,mv);
    if(tf>=T_BLOCK-0.02) D.push({y:fin?FY+20:(tf<9.5?99999:catY), f:()=>{ if(fin){ const b=Math.abs(Math.sin(tf*10+1))*8; shadow(FX-85,FY+20,50); actor(IMG.catler,FX-85,FY+20-b,CAT_NORM_H,{rot:0.16}); return; } const nein=seg(tf,6.85,7.5), nb=nein>0&&nein<1?1+0.04*Math.sin(tf*60):1, x=catX+run(240), y=catY-(chargeK>0?Math.abs(Math.sin(tf*9))*7:0), a=1;
      shadow(x,catY,48);
      actor(IMG.catlerUp,x,y,CB.h*nb,{flip:true,rot:chargeK>0?0.1:0}); }});
    // linh hồn vây quanh
    SOULS.forEach((S,i)=>{ const die=seg(tf,7.5+i*0.2,8.3+i*0.2); if(die>=1) return; const R=lerp(205,172,eio(seg(tf,0,4.3))), orb=Math.sin(tf*0.5+S.ph)*0.05, x=ST.x+Math.cos(S.a+orb)*R, y=ST.y+Math.sin(S.a+orb)*40+4;
      const lean=(x>ST.x?-1:1)*(0.2+0.06*Math.sin(tf*1.6+S.ph))*(1-seg(tf,7.3,7.5));   // khom người chúi VỀ PHÍA Stalin (không đứng quay mặt ra)
      D.push({y, f:()=>{ shadow(x,y,40,0.3*(1-die)); soul(x,y,118*(1-die*0.25),x>ST.x,-0.5+0.25*Math.sin(tf*2+S.ph),0.35+0.2*Math.sin(tf*2.3+S.ph+1),1-die,lean);
        if(die>0 && t<T_FREEZE) for(let k=0;k<2;k++) parts.push({k:'ash',x:x+(Math.random()-0.5)*50,y:y-Math.random()*110,vx:(Math.random()-0.5)*1.2,vy:-(0.8+Math.random()*1.8),l:50,L:50,c:Math.random()<0.5?'80,255,190':'30,60,50'}); }}); });
    // linh hồn vung nhát kết liễu
    { const die=seg(tf,7.45,8.2); if(die<1) D.push({y:ATT.y, f:()=>{ let aR=0.25*Math.sin(tf*2);
        const aEnd=attEndAngle(), aUp=attUpAngle(), up=eout(seg(tf,T_UP,T_HOLD)), strike=Math.pow(seg(tf,T_STRIKE,T_BLOCK),2);   // bổ xuống NHANH DẦN (ease-in)
        aR=lerp(aR,aUp,up); if(tf>=T_HOLD && tf<T_STRIKE) aR=aUp+0.05*Math.sin(tf*35);   // gồng run trên cao
        if(strike>0) aR=lerp(aUp,aEnd,strike);
        if(tf>=T_BLOCK) aR=aEnd+0.04*Math.sin(tf*40)*(1-seg(tf,T_BLOCK,6));   // bị giữ chặt, giằng co
        shadow(ATT.x,ATT.y,42,0.3*(1-die));
        const cl=soul(ATT.x,ATT.y,ATT_H*(1-die*0.25),true,aR,0.2*Math.sin(tf*2.3),1-die);
        if(cl) C=cl;   // điểm móng tay (lúc chặn = đúng chỗ bàn tay Catler)
        if(die>0 && t<T_FREEZE) for(let k=0;k<3;k++) parts.push({k:'ash',x:ATT.x+(Math.random()-0.5)*50,y:ATT.y-Math.random()*110,vx:(Math.random()-0.5)*1.2,vy:-(0.8+Math.random()*1.8),l:50,L:50,c:Math.random()<0.5?'80,255,190':'30,60,50'}); }}); }
    D.sort((a,b)=>a.y-b.y); for(const d of D) d.f();
    // ── búa: nằm đất → Catler nhặt → đưa Stalin → giơ lên trời, sét giáng ──
    { const pick=eio(seg(tf,E+1.6,E+2.1)), give=eio(seg(tf,E+2.1,E+2.8)), stx=fin?FX:ST.x+run(240), sty=fin?FY:ST.y;
      let hx=ST.x-175, hy=ST.y+46, hr=-0.5, hs=60;   // búa văng nằm 1 góc xa
      const pw=catPaw(), paw=[CATP.x+(pw[0]-CB.x), CATP.y+(pw[1]-CB.y)];   // bàn tay giơ lên của Catler (cùng ảnh, cùng cỡ)
      if(pick>0){ hx=lerp(hx,paw[0],pick); hy=lerp(hy,paw[1],pick); hr=lerp(hr,-0.3,pick); }
      if(give>0){ hx=lerp(paw[0],stx+34,give); hy=lerp(paw[1],ST.y-125,give); }
      if(raise>0){ hx=stx+34; hy=lerp(ST.y-125,ST.y-215,raise); hr=lerp(-0.3,-0.8,raise); hs=66; }
      if(chargeK>0) hy=sty-215-Math.abs(Math.sin(tf*(fin?10:9)))*(fin?8:7);
      if(fin){ hx=stx+30; hy=JY-215; hr=-0.55; hs=70; if(finU>0.55) hs=0; }   // lúc nhảy: búa nhập với liềm (vẽ ở dưới)
      const c=prep(IMG.hammer); if(c && hs>0){ g.save(); g.translate(hx,hy); g.rotate(hr); g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,-hs/2,-hs/2,hs,hs*c.sh/c.sw); g.restore(); }
      if(raise>0.3 && t<T_FREEZE){ for(let i=0;i<2;i++) bolt(hx,hy-10,hx+(Math.random()-0.5)*100,hy-60-Math.random()*100,1.6,0.9*raise,'140,200,255'); }
      if(raise>0.3) glow(hx,hy-10,70,0.5*raise,'150,210,255');
      if(raise>0 && tf<E+4.0){ const k=seg(tf,E+3.05,E+3.6); bolt(hx,-800,hx,hy-12,5,1-k*0.7,'150,210,255'); } }
    // ── bàn tay mèo chặn nhát chém ──
    if(C && tf>=T_BLOCK && tf<7.45){
      if(tf<T_BLOCK+0.3){ const k=1-seg(tf,T_BLOCK,T_BLOCK+0.3); g.save(); g.strokeStyle=`rgba(0,0,0,${0.75*k})`; g.lineWidth=2;   // vệt tốc độ toả ra kiểu "impact frame" anime
        for(let q=0;q<26;q++){ const a=q/26*Math.PI*2+q*0.37, r0=40+((q*37)%30), r1=r0+90+((q*53)%80); g.beginPath(); g.moveTo(C[0]+Math.cos(a)*r0,C[1]+Math.sin(a)*r0); g.lineTo(C[0]+Math.cos(a)*r1,C[1]+Math.sin(a)*r1); g.stroke(); } g.restore(); }
      if(tf<T_BLOCK+0.33){ const k=1-seg(tf,T_BLOCK,T_BLOCK+0.33); g.save(); g.globalCompositeOperation='lighter'; glow(C[0],C[1],70,0.9*k,'255,255,230'); g.strokeStyle=`rgba(255,240,200,${k})`; g.lineWidth=2.5; g.beginPath(); g.arc(C[0],C[1],14+50*(1-k),0,Math.PI*2); g.stroke(); g.restore(); }
      if(tf<T_BLOCK+0.05) for(let k=0;k<18;k++){ const a=Math.random()*Math.PI*2; parts.push({k:'spark',x:C[0],y:C[1],vx:Math.cos(a)*4,vy:Math.sin(a)*4,l:22,L:22,c:'255,230,150'}); } }
    if(tf<9) glow(ST.x,ST.y-40,250,0.16,'80,255,170');
    // ── NEIN + sóng nổ ──
    if(tf>=6.85 && tf<8.2){ const k=seg(tf,6.85,7.05), out=1-seg(tf,7.8,8.2); const BPn=catBlockPos(); g.save(); g.translate(BPn.x-70,BPn.y-BPn.h-50); g.rotate(0.06); g.scale(back(k)*0.9,back(k)*0.9);
      g.fillStyle=`rgba(255,255,255,${0.95*out})`; g.strokeStyle=`rgba(0,0,0,${out})`; g.lineWidth=3; g.beginPath(); g.ellipse(0,0,84,40,0,0,Math.PI*2); g.fill(); g.stroke();
      g.beginPath(); g.moveTo(-28,32); g.lineTo(-46,62); g.lineTo(-4,38); g.closePath(); g.fill(); g.stroke();
      text('NEIN!',(Math.random()-0.5)*3,(Math.random()-0.5)*3,42,'#d50000','#000',undefined,out); g.restore(); }
    if(tf>=7.3 && tf<8.7){ const k=seg(tf,7.3,8.7), BPb=catBlockPos(); g.save(); g.globalCompositeOperation='lighter';
      for(const [dl,c] of [[0,'255,240,220'],[0.12,'255,90,60']]){ const v=clamp((k-dl)/0.8,0,1); if(v<=0||v>=1) continue; const R=40+560*eout(v); g.strokeStyle=`rgba(${c},${1-v})`; g.lineWidth=10*(1-v)+1; g.shadowColor=`rgb(${c})`; g.shadowBlur=20; g.beginPath(); g.ellipse(BPb.x,BPb.y-60,R,R*0.45,0,0,Math.PI*2); g.stroke(); }
      glow(BPb.x,BPb.y-70,170,0.7*(1-k),'255,230,200'); g.restore(); }
    // ☭🌞 búa + liềm chạm nhau trên đầu Stalin đang bay → loé sáng như MẶT TRỜI · thế giới chia đôi: phe meme sáng rực / phe ác đỏ đen
    if(fin && finU>0.5){ const cx2=FX+12, cy2=JY-235, cr=prep(IMG.cross), ck=seg(finU,0.5,0.68), sk=sunK;
      if(sk>0){ const bx=cx2, tilt=0.18;   // ranh giới hơi nghiêng xuyên qua mặt trời
        g.save(); g.beginPath(); g.moveTo(bx+2000*tilt,-2000); g.lineTo(bx-2000*tilt,2400); g.lineTo(bx+3000,2400); g.lineTo(bx+3000,-2000); g.closePath();
        g.fillStyle=`rgba(25,0,0,${0.55*sk})`; g.fill(); g.restore();   // nửa phải: phe ác chìm trong đỏ đen
        g.save(); g.beginPath(); g.moveTo(bx+2000*tilt,-2000); g.lineTo(bx-2000*tilt,2400); g.lineTo(bx-3000,2400); g.lineTo(bx-3000,-2000); g.closePath(); g.clip();
        g.globalCompositeOperation='lighter'; const lg=g.createRadialGradient(cx2,cy2,0,cx2,cy2,1400); lg.addColorStop(0,`rgba(255,240,190,${0.55*sk})`); lg.addColorStop(1,`rgba(255,180,60,${0.12*sk})`);
        g.fillStyle=lg; g.fillRect(cx2-3000,-2000,6000,4400); g.restore();   // nửa trái: phe meme bừng sáng
        g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle=`rgba(255,250,220,${0.9*sk})`; g.lineWidth=5; g.shadowColor='#fff3c4'; g.shadowBlur=30;
        g.beginPath(); g.moveTo(bx+2000*tilt,-2000); g.lineTo(bx-2000*tilt,2400); g.stroke(); g.restore();   // vệt ranh giới sáng
        g.save(); g.globalCompositeOperation='lighter'; g.translate(cx2,cy2); g.rotate(tf*0.5);   // tia nắng xoay
        for(let q=0;q<16;q++){ const a=q*Math.PI/8, L=520+120*((q*0.37)%1); const rg=g.createLinearGradient(0,0,Math.cos(a)*L,Math.sin(a)*L); rg.addColorStop(0,`rgba(255,245,200,${0.55*sk})`); rg.addColorStop(1,'rgba(255,200,80,0)');
          g.fillStyle=rg; g.beginPath(); g.moveTo(0,0); g.lineTo(Math.cos(a-0.05)*L,Math.sin(a-0.05)*L); g.lineTo(Math.cos(a+0.05)*L,Math.sin(a+0.05)*L); g.closePath(); g.fill(); }
        g.restore(); g.save(); g.globalCompositeOperation='lighter'; glow(cx2,cy2,300,0.9*sk,'255,250,225'); glow(cx2,cy2,110,1*sk,'255,255,255'); g.restore(); }
      if(cr){ const sz=lerp(70,120,ck); g.save(); g.globalAlpha=Math.min(1,ck*3); g.shadowColor='rgba(255,230,150,0.95)'; g.shadowBlur=30*ck; g.translate(cx2,cy2); g.rotate(Math.sin(tf*3)*0.05);
        g.drawImage(cr.src,cr.sx,cr.sy,cr.sw,cr.sh,-sz/2,-sz/2*cr.sh/cr.sw,sz,sz*cr.sh/cr.sw); g.restore(); } }
    // ── hạt ──
    for(let i=parts.length-1;i>=0;i--){ const p=parts[i]; if(t<T_FREEZE){ p.x+=p.vx; p.y+=p.vy; p.vx*=0.97; p.vy=p.vy*0.97+(p.k==='spark'?0.12:-0.01); p.l--; } if(p.l<=0){ parts.splice(i,1); continue; }
      g.fillStyle=`rgba(${p.c},${p.l/p.L})`; g.fillRect(p.x,p.y,2.4,2.4); }
    if(parts.length>900) parts.splice(0,parts.length-900);
    if(window._cineBG) window._cineBG.drawFront(g,tf,red);   // 🌫️ sương thấp + tàn lửa / bào tử phía trước nhân vật
    // ── lao vào: vệt tốc độ ──
    if(chargeK>0 && t<T_FREEZE){ g.save(); g.globalAlpha=0.3*chargeK; g.strokeStyle='#fff'; g.lineWidth=2.5; for(let i=0;i<22;i++){ const y=GROUND+30+((i*67)%420), x=((i*131+tf*1500)%1500)-300; g.beginPath(); g.moveTo(x,y); g.lineTo(x-110,y); g.stroke(); } g.restore(); }
    // ═════ lớp phủ màn hình ═════
    g.setTransform(SC,0,0,SC,0,0);
    if(t<1.2){ g.fillStyle=`rgba(0,0,0,${1-seg(t,0,1.2)})`; g.fillRect(0,0,VW,VH); }
    if(t<10.4){ const k=1-seg(t,9.6,10.4), vg=g.createRadialGradient(VW/2,VH/2,VH*0.22,VW/2,VH/2,VH*0.62);   // 🎞️ viền tối + nhịp đỏ thoi thóp (đoạn mở đầu nặng nề)
      const pr=t<T_BLOCK?0.5+0.5*Math.sin(t*4.4):0; vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,`rgba(${Math.round(60*pr)},0,0,${0.72*k})`);
      g.fillStyle=vg; g.fillRect(0,0,VW,VH); }
    if(t>=T_BLOCK && t<T_BLOCK+0.16){ g.fillStyle=`rgba(255,255,255,${0.85*(1-seg(t,T_BLOCK,T_BLOCK+0.16))})`; g.fillRect(0,0,VW,VH); }   // ⚡ chớp trắng đúng lúc chặn
    if(t>=T_FREEZE){ const k=seg(t,T_FREEZE,T_FREEZE+0.25); g.fillStyle=`rgba(255,255,255,${0.7*(1-k)})`; g.fillRect(0,0,VW,VH);
      g.fillStyle=`rgba(20,8,8,${0.4*seg(t,T_FREEZE+0.3,T_FREEZE+1.2)})`; g.fillRect(0,0,VW,VH); }
    const bar=lerp(64,108,seg(t,T_FREEZE,T_FREEZE+0.8)); g.fillStyle='#000'; g.fillRect(0,0,VW,bar); g.fillRect(0,VH-bar,VW,bar);
    for(const H of heroes){ const u=seg(t,H.t+0.15,H.t+HERO_DT); if(u<=0||u>=1) continue; const inK=eout(seg(u,0,0.18)), outK=1-seg(u,0.85,1);
      g.save(); g.globalAlpha=outK; const x=lerp(-280,24,inK); g.fillStyle='rgba(190,20,20,0.95)'; g.fillRect(x,VH-bar-94,6,60);
      g.font='900 34px Impact,"Arial Black",sans-serif'; g.textAlign='left'; g.textBaseline='alphabetic'; g.lineJoin='round'; g.lineWidth=5; g.strokeStyle='#000'; g.strokeText(H.name,x+16,VH-bar-52); g.fillStyle='#fff'; g.fillText(H.name,x+16,VH-bar-52);
      g.fillStyle='rgba(255,255,255,0.75)'; g.fillRect(x+16,VH-bar-44,lerp(0,230,inK),3); g.restore(); }
    const sub=(s,a,b)=>{ const k=seg(t,a,a+0.25)*(1-seg(t,b-0.3,b)); if(k>0) text(s,VW/2,VH-bar-40,27,'#fff','#000','italic 700 27px Georgia,serif',k); };
    sub('“Memes…”',E+3.4,E+4.1); sub('“…assemble.”',E+4.1,E+4.8);
    if(t>=T_FREEZE+0.9){ const k=eout(seg(t,T_FREEZE+0.9,T_FREEZE+1.6)); g.save(); g.globalAlpha=k; g.translate(VW/2,VH/2+lerp(30,0,k));
      text('TO BE CONTINUED…',0,0,46,'#ffffff','#000'); g.fillStyle='rgba(255,255,255,0.8)'; g.fillRect(-180*k,30,360*k,3);
      text('MEMES ASSEMBLE',0,58,22,'#ffcc80','#000',undefined,0.9); g.restore(); }
    musTick(tR);
    markOnly=false;
    if(panel) panel.update();
  }
  const DUR=()=>tE()+13.5+SUM_D, curT=()=>paused?pauseT:(performance.now()-t0)/1000;
  function seek(sec){ sec=clamp(sec,0,DUR()); try{ stopAllLongSfx(); }catch(e){} parts=[]; played={}; markOnly=true; C=null;
    if(paused) pauseT=sec; else t0=performance.now()-sec*1000; }
  function toggle(){ if(paused){ if(pauseT>=DUR()-0.05) pauseT=0; t0=performance.now()-pauseT*1000; paused=false; } else { pauseT=curT(); paused=true; } }
  function stop(){ if(raf) cancelAnimationFrame(raf); raf=null; musStop(); try{ stopAllLongSfx(); }catch(e){} if(window._cinePanelRemove) _cinePanelRemove(); panel=null; if(overlay) overlay.remove(); overlay=null; }
  window._cineEG=function(){
    if(overlay) return;
    overlay=document.createElement('div');
    overlay.style.cssText='position:fixed;inset:0;z-index:99999;background:#000;display:flex;align-items:center;justify-content:center;';
    cv=document.createElement('canvas'); cv.width=1080; cv.height=1920; SC=cv.width/VW;
    cv.style.cssText='height:100vh;max-width:100vw;aspect-ratio:9/16;object-fit:contain;';
    g=cv.getContext('2d');
    overlay.appendChild(cv); document.body.appendChild(overlay);
    if(window._cinePanelMake) panel=_cinePanelMake(overlay,{ title:'Memes Assemble', dur:DUR, t:()=>Math.min(curT(),DUR()), playing:()=>!paused && curT()<DUR(),
      toggle:()=>{ if(!paused && curT()>=DUR()) seek(0); else toggle(); }, seek, replay:()=>{ paused=false; setup(); seek(0); markOnly=false; }, close:()=>{ stop(); if(window.openCinema) openCinema(); } });
    try{ stopAllBattleMusic(); }catch(e){}
    try{ window._cineBG && window._cineBG.prepare && window._cineBG.prepare(); }catch(e){}   // dựng sẵn các lớp nền (tránh giật khung đầu)
    paused=false; C=null; setup(); musSetup(); t0=performance.now(); raf=requestAnimationFrame(frame);
  };
  window._cineEGStop=stop;
  window._cineEGSeek=t=>{ t0=performance.now()-t*1000; };   // (kiểm tra) nhảy tới giây t
  window._cineEGCanvas=()=>cv;
  window._cineEGDbg=()=>({C, BP:catBlockPos(), up:IMG.catlerUp.naturalWidth, cp:!!prep(IMG.catlerUp)});
})();
