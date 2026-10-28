// ===================== 🎬 MEME LORE 2 · TẬP 3 — "THE HIGH GROUND" =====================
// Cảnh 1 · núi lửa: Supreme Cat đứng trên mỏm đá CAO dùng trọng lực (hiệu ứng gốc trong game: hào quang tím đen, vệt áp lực,
//   mặt quỷ) ép Grumpy Cat dí xuống mỏm đá thấp. Hộp thoại chữ pixel kiểu game cũ: "GIVE UP, GRUMPY." / "I HAVE THE HIGH GROUND."
//   Grumpy vẫn cố nhặt viên đá ném trúng mặt Supreme → Supreme nổi giận (mặt quỷ hiện ra), áp lực dí mạnh tới mức mỏm đá vỡ
//   thành từng tảng, Grumpy rơi xuống dung nham.
// Cảnh 2 · bờ dung nham: Grumpy cháy nửa người nằm thoi thóp. Depressed Cat (dạng Pain) bước ra từ bóng tối, dùng chakra đen nhấc
//   Grumpy đặt lên CÁNG, 2 lính mèo khiêng đi.
// Cảnh 3 · phòng thí nghiệm: đưa vào BUỒNG KÍNH kiểu Captain America (Vita-Ray), truyền thuốc qua ống dẫn, buồng bừng sáng trắng xoá,
//   hơi nước tan → buồng mở, tay máy lắp chân → thân → mũ giáp → CATVADER, thở phì phò.
// Cảnh 4 · doanh trại: Catvader giơ tay thử thần lực, lôi 1 lính mèo (German Cat) ra khỏi hàng quân, bóp cổ trên không → thả rơi. Kết.
// Khung dọc 1080×1920 như tập 1 + 2. Nền mỗi cảnh vẽ SẴN 1 lần, phần động vẽ mỗi khung. Không vẽ vết nứt (tảng đá rời ra nguyên khối).
(function(){
  if(window._cineL2E3) return;
  const VW=540, VH=960, DUR=41;
  const T={ press:1.2, line1:2.9, line2:5.1, boxOff:7.3, grab:7.5, throw:8.1, hit:8.8, rage:9.4, crush:11.3, fall:11.6, splash:12.2, fade1:12.7, s2:13.6,
            pain:14.4, carry0:14.9, lift:15.7, onStr:16.7, carry:17.3, fade2:18.6, lab:19.2, door:19.6, doorShut:20.1, serum:20.6, ray:21.6, peak:23.6, cool:24.2, open:24.7,
            leg:25.9, body:27.1, helm:28.3, breath:29.3, army:31.6, hand:32.4, pull:33.0, choke:34.0, drop:36.6, title:37.6, fade:40.2 };
  const LINES=[{t:T.line1,txt:'GIVE UP, GRUMPY.'},{t:T.line2,txt:'I HAVE THE HIGH GROUND.'}], CPS=18;   // chữ / giây
  const A=p=>{ const im=new Image(); im.src=p; return im; };
  const IMG={ grumpy:A('assets/avatars/grumpycat/avatarUrl.webp'), grumpyAtk:A('assets/avatars/grumpycat/attackAvatarUrl.webp'), sup:A('assets/avatars/supremearbiter/avatarUrl.webp'),
    vader:A('assets/avatars/catvader/avatarUrl.webp'), vaderHand:A('assets/avatars/catvader/skill2AvatarUrl.webp'), pain:A('assets/img/depressedcat/DP_PAIN_IMG.webp'),
    soldier:A('assets/avatars/germancat/skill1AvatarUrl.webp'), stone:A('assets/img/poordog/PD_TH_STONE.webp') };
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)), seg=(t,a,b)=>clamp((t-a)/(b-a),0,1), eio=x=>x*x*(3-2*x), lerp=(a,b,k)=>a+(b-a)*k;
  const eout=x=>1-(1-x)*(1-x);
  const hash=n=>{ const s=Math.sin(n*127.1+311.7)*43758.5453; return s-Math.floor(s); };
  const h2=(a,b,s)=>{ const v=Math.sin(a*127.1+b*311.7+s*74.7)*43758.5453; return v-Math.floor(v); };
  let cv, g, W2, w2, SC, raf=null, t0=0, paused=false, pauseT=0, played={}, markOnly=false, panel=null, overlay=null, ready=false, OFF=null;
  const sfx=(id,k,v,dur)=>{ if(played[id]) return; played[id]=1; if(markOnly) return; try{ playSample(k,v==null?1:v,dur||null); }catch(e){} };
  const mk=(w,h)=>{ const c=document.createElement('canvas'); c.width=Math.max(1,Math.round(w)); c.height=Math.max(1,Math.round(h)); return c; };
  // ảnh cắt sát nội dung + bỏ hẳn nền mờ (alpha thấp) để tô màu lên không lòi khung chữ nhật
  const prep=im=>{ if(im._cp) return im._cp; if(!im.complete || !im.naturalWidth) return null;
    const sw=im.naturalWidth, sh=im.naturalHeight, c=mk(sw,sh), x=c.getContext('2d'); x.drawImage(im,0,0);
    const id=x.getImageData(0,0,sw,sh), d=id.data; let x0=sw,y0=sh,x1=0,y1=0;
    for(let i=3;i<d.length;i+=4){ if(d[i]<40) d[i]=0; else if(d[i]<90) d[i]=(d[i]-40)*255/50|0; }
    x.putImageData(id,0,0);
    for(let yy=0;yy<sh;yy+=2) for(let xx=0;xx<sw;xx+=2) if(d[(yy*sw+xx)*4+3]>40){ if(xx<x0)x0=xx; if(xx>x1)x1=xx; if(yy<y0)y0=yy; if(yy>y1)y1=yy; }
    if(x1<x0) return null; return im._cp={src:c, sx:x0, sy:y0, sw:x1-x0+1, sh:y1-y0+1}; };
  // vẽ nhân vật: (x,y) = điểm giữa CHÂN (center:true → tâm ảnh)
  function actor(c,x,y,h,o){ o=o||{}; if(!c) return; const w=h*c.sw/c.sh;
    g.save(); g.globalAlpha*=(o.a==null?1:o.a); g.translate(x,y); if(o.rot) g.rotate(o.rot); g.scale((o.flip?-1:1)*(o.sx||1),o.sy||1);
    g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,-w/2,o.center?-h/2:-h,w,h); g.restore(); }
  function glow(x,y,r,a,c){ if(a<=0.01||r<=0) return; const gr=g.createRadialGradient(x,y,0,x,y,r); gr.addColorStop(0,`rgba(${c},${a})`); gr.addColorStop(0.45,`rgba(${c},${a*0.4})`); gr.addColorStop(1,`rgba(${c},0)`);
    g.fillStyle=gr; g.beginPath(); g.arc(x,y,r,0,Math.PI*2); g.fill(); }
  const hh=(a,b)=>(typeof _hmHash==='function')?_hmHash(a,b):h2(a,b,1);   // dùng chung hàm băm của game cho hiệu ứng Supreme port sang
  const MU=100;   // 1 meme = 100 đơn vị (chuẩn cỡ phim)
  const fullFill=(col,a)=>{ g.save(); g.setTransform(1,0,0,1,0,0); g.fillStyle=col.replace('A',a); g.fillRect(0,0,W2.width,W2.height); g.restore(); };

  // ───────────────────── 😼 HIỆU ỨNG GỐC CỦA SUPREME CAT (port từ game.js: _saDrawAura / _saDrawDemon / _saDrawPressed) ─────────────────────
  function spriteInfo(c,h){ const w=h*c.sw/c.sh; return {img:c.src, sx:c.sx, sy:c.sy, sw:c.sw, sh:c.sh, dw:w, dh:h, fl:false}; }
  function saWavy(img,x,y,w,h,t,amp,alpha){ const N=36, sh=img.height/N, dh=h/N; g.globalAlpha=alpha;
    for(let i=0;i<N;i++){ const k=Math.pow(1-i/N,1.4), off=(Math.sin(t*1.5+i*0.42)+0.5*Math.sin(t*2.7+i*0.9))*amp*k; g.drawImage(img,0,i*sh,img.width,sh+0.6,x+off,y+i*dh,w,dh+0.6); } g.globalAlpha=1; }
  function saDemon(cx,fy,L,P,eyesK,t){ if(P<=0.001) return;
    const top=fy-L.dh*0.85, Dw=L.dh*2.15*1.1, Dh=L.dh*2.15*(SA_DEMON_INK.naturalHeight||1106)/(SA_DEMON_INK.naturalWidth||928), x0=cx-Dw/2, y0=fy-L.dh*0.95-Dh;
    g.save();
    const n=Math.round(50+90*Math.min(1,P*1.6));
    for(let i=0;i<n;i++){ const sp=0.1+0.09*hh(i,40), ph=(t*sp+hh(i,41))%1, sx=cx+(hh(i,42)-0.5)*L.dw*0.9, sy=top+L.dh*0.3;
      const tx=cx+(hh(i,43)-0.5)*Dw*0.75, ty=y0+Dh*(0.2+0.75*hh(i,44)), e=ph*ph*(3-2*ph), wob=Math.sin(t*1.3+i)*L.dw*0.1*Math.sin(ph*Math.PI);
      const x=sx+(tx-sx)*e+wob, y=sy+(ty-sy)*e, a=0.8*Math.sin(Math.min(1,ph*1.12)*Math.PI)*Math.min(1,0.4+P);
      if(i%4===0){ g.strokeStyle=`rgba(6,3,10,${a})`; g.lineWidth=0.8; g.beginPath(); g.moveTo(x,y); g.lineTo(x-wob*0.05,y+4+5*hh(i,46)); g.stroke(); }
      else { g.fillStyle=`rgba(6,3,10,${a})`; g.beginPath(); g.arc(x,y,0.45+0.8*hh(i,45),0,Math.PI*2); g.fill(); } }
    const S=(typeof _saDemonBuild==='function')?_saDemonBuild():null;
    if(S){ const K=S.length, fk=P*K, k0=Math.floor(fk), fr=fk-k0, amp=L.dw*0.05;
      if(k0>=1) saWavy(S[Math.min(K,k0)-1],x0,y0,Dw,Dh,t,amp,1);
      if(k0<K && fr>0.01) saWavy(S[k0],x0,y0,Dw,Dh,t,amp,fr); }
    if(eyesK>0 && SA_DEMON_GLOW.naturalWidth){ g.globalCompositeOperation='lighter'; const fl=0.82+0.18*Math.sin(t*6)*Math.sin(t*2.3);
      saWavy(SA_DEMON_GLOW,x0,y0,Dw,Dh,t,L.dw*0.05,eyesK*fl); saWavy(SA_DEMON_GLOW,x0-Dw*0.02,y0-Dh*0.02,Dw*1.04,Dh*1.04,t,L.dw*0.05,0.35*eyesK*fl); g.globalCompositeOperation='source-over'; }
    g.restore(); }
  function saAura(fx,fy,L,gf,t){ const S=(typeof _saAuraSil==='function')?_saAuraSil(L):null; if(!S) return;
    const k=L.dw/L.sw, W2s=S.w*k, H2s=S.h*k;
    g.save();
    { const gr=g.createRadialGradient(fx,fy,0,fx,fy,L.dw*(0.8+0.6*gf)); gr.addColorStop(0,`rgba(6,0,14,${0.7*gf})`); gr.addColorStop(0.6,`rgba(30,0,55,${0.35*gf})`); gr.addColorStop(1,'rgba(30,0,55,0)');
      g.fillStyle=gr; g.beginPath(); g.ellipse(fx,fy,L.dw*(0.8+0.6*gf),L.dw*(0.22+0.12*gf),0,0,Math.PI*2); g.fill(); }
    const LAY=[[1.34,1.6,0.9,'source-over'],[1.17,1.32,0.85,'source-over'],[1.07,1.12,0.7,'lighter']];
    S.layers.forEach((c,i)=>{ const [sx,sy,al,op]=LAY[i], flk=1+0.05*Math.sin(t*8+i*1.7)+0.03*Math.sin(t*21+i), wob=Math.sin(t*4+i)*L.dw*0.015;
      const ws=W2s*(1+(sx-1)*gf), hs=H2s*(1+(sy-1)*gf)*flk;
      g.save(); g.globalCompositeOperation=op; g.globalAlpha=al*Math.min(1,gf*1.3); g.translate(fx+wob,fy+S.pad*k*0.4); g.drawImage(c,-ws/2,-hs,ws,hs); g.restore(); });
    g.globalCompositeOperation='lighter';
    for(let i=0;i<Math.round(6+10*gf);i++){ const ph=(t*0.5+hh(i,4.4))%1, x=fx+(hh(i,6.6)-0.5)*L.dw*1.5+Math.sin(t*2+i)*5, y=fy-ph*L.dh*1.7, r=(1+1.6*hh(i,1.1))*(1-ph*0.5), a=Math.sin(ph*Math.PI)*gf;
      g.fillStyle=`rgba(${200+50*hh(i,2.9)|0},${40+40*hh(i,3.9)|0},${180+60*hh(i,5.1)|0},${0.85*a})`; g.beginPath(); g.arc(x,y,r,0,Math.PI*2); g.fill(); }
    g.restore(); }
  function saRings(cx,fy,R,gf,t){ const tk=t*60;
    for(let k=0;k<3;k++){ const ph=((tk+k*22)%66)/66, rr=R*(0.8+7*ph);
      g.strokeStyle=`rgba(225,195,255,${(1-ph)*0.5*gf})`; g.lineWidth=3*(1-ph)+0.8; g.beginPath(); g.ellipse(cx,fy,rr,rr*0.32,0,0,Math.PI*2); g.stroke(); } }
  function saPressed(x,fy,R,gv,t,sd){ if(gv<0.03) return; const tk=t*60;
    const rx=R*(0.9+1.0*gv), ry=rx*0.32, cg=g.createRadialGradient(x,fy,0,x,fy,rx);
    cg.addColorStop(0,`rgba(8,2,14,${0.6*gv})`); cg.addColorStop(0.7,`rgba(20,6,30,${0.35*gv})`); cg.addColorStop(1,'rgba(20,6,30,0)');
    g.save(); g.translate(x,fy); g.scale(1,ry/rx); g.fillStyle=cg; g.beginPath(); g.arc(0,0,rx,0,Math.PI*2); g.fill(); g.restore();
    for(let r=0;r<2;r++){ const ph=((tk+sd*10+r*18)%36)/36, rr=R*(0.5+2.2*ph);
      g.strokeStyle=`rgba(150,60,220,${(1-ph)*0.6*gv})`; g.lineWidth=2*(1-ph)+0.6; g.beginPath(); g.ellipse(x,fy,rr,rr*0.3,0,0,Math.PI*2); g.stroke(); }
    const top=fy-R*1.95; g.save(); g.lineCap='round';
    for(let i=0;i<11;i++){ const ph=((tk*0.045+hh(i,sd))%1), xx=x+(hh(i+3,sd)-0.5)*R*1.7, y1=top-R*1.6*(1-ph), len=R*(0.45+0.5*hh(i+7,sd));
      const gr=g.createLinearGradient(xx,y1-len,xx,y1); gr.addColorStop(0,'rgba(40,0,70,0)'); gr.addColorStop(1,`rgba(120,30,190,${0.75*gv*Math.sin(ph*Math.PI)})`);
      g.strokeStyle=gr; g.lineWidth=3; g.beginPath(); g.moveTo(xx,y1-len); g.lineTo(xx,y1); g.stroke(); }
    g.restore(); }

  // ───────────────────── 🎨 NỀN (vẽ sẵn 1 lần mỗi cảnh) ─────────────────────
  const BS=1.4;
  function paint(x0,y0,x1,y1,fn){ const c=mk((x1-x0)*BS,(y1-y0)*BS), prev=g; g=c.getContext('2d'); g.setTransform(BS,0,0,BS,-x0*BS,-y0*BS); fn(); g=prev; return {c,x0,y0,w:x1-x0,h:y1-y0}; }
  const drawBG=B=>g.drawImage(B.c,B.x0,B.y0,B.w,B.h);
  const path=P=>{ g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.closePath(); };
  // khối đá: thân tối, chân hắt đỏ dung nham, có thớ đá (vân ngang mờ, không phải vết nứt)
  function rockPoly(P,c0,c1,lit,seed){ path(P); let ys=P.map(p=>p[1]), xs=P.map(p=>p[0]), ymin=Math.min(...ys), ymax=Math.max(...ys), xmin=Math.min(...xs), xmax=Math.max(...xs);
    const gr=g.createLinearGradient(0,ymin,0,ymax); gr.addColorStop(0,c1); gr.addColorStop(0.5,c0); gr.addColorStop(1,lit||c0); g.fillStyle=gr; g.fill();
    if(seed!=null){ g.save(); path(P); g.clip();
      for(let i=0;i<28;i++){ const x=xmin+h2(i,seed,1)*(xmax-xmin), y=ymin+h2(i,seed,2)*(ymax-ymin); g.fillStyle=`rgba(0,0,0,${0.12+0.18*h2(i,seed,3)})`; g.beginPath(); g.ellipse(x,y,14+34*h2(i,seed,4),5+10*h2(i,seed,5),(h2(i,seed,6)-0.5)*0.5,0,Math.PI*2); g.fill(); }
      for(let i=0;i<14;i++){ const x=xmin+h2(i,seed,7)*(xmax-xmin), y=ymin+h2(i,seed,8)*(ymax-ymin); g.fillStyle=`rgba(255,140,90,${0.05+0.06*h2(i,seed,9)})`; g.beginPath(); g.ellipse(x,y,10+20*h2(i,seed,10),3+5*h2(i,seed,11),0,0,Math.PI*2); g.fill(); }
      const gl=g.createLinearGradient(xmin,0,xmax,0); gl.addColorStop(0,'rgba(0,0,0,0.35)'); gl.addColorStop(0.5,'rgba(0,0,0,0)'); gl.addColorStop(1,'rgba(255,90,30,0.12)'); g.fillStyle=gl; g.fillRect(xmin,ymin,xmax-xmin,ymax-ymin);
      g.restore(); } }
  function cloud(x,y,w,h,top,bot,a,seed){ for(let k=0;k<7;k++){ const cx=x+(h2(k,seed,1)-0.5)*w, cy=y+(h2(k,seed,2)-0.5)*h*0.6, r=h*(0.45+0.4*h2(k,seed,3));
      const gr=g.createLinearGradient(0,cy-r,0,cy+r); gr.addColorStop(0,top); gr.addColorStop(1,bot); g.globalAlpha=a; g.fillStyle=gr; g.beginPath(); g.ellipse(cx,cy,r*1.8,r,0,0,Math.PI*2); g.fill(); } g.globalAlpha=1; }
  // 🌋 cảnh 1 · núi lửa (kiểu Mustafar): trời đen tro, mây hắt đỏ từ dưới, núi xa nhiều lớp, thác dung nham, cột đá cao
  const LAVA=900, HI=330, LO=690, SUPX=140, GRX=430;
  const FALLS=[[-190,120,22],[610,60,30],[760,250,18]];   // thác dung nham: x, đỉnh y, bề rộng (vẽ động)
  let BG1, BG2, BG3, BG4;
  function paintVolcano(){ return paint(-320,-260,860,1180,()=>{
    let gr=g.createLinearGradient(0,-260,0,LAVA); gr.addColorStop(0,'#050203'); gr.addColorStop(0.35,'#1c0506'); gr.addColorStop(0.7,'#5a1307'); gr.addColorStop(1,'#c4400e'); g.fillStyle=gr; g.fillRect(-320,-260,1180,LAVA+260);
    for(let i=0;i<9;i++) cloud(-320+hash(i+20)*1180,-180+hash(i+30)*380,260+200*hash(i+40),90+50*hash(i+50),'rgba(20,6,8,1)','rgba(150,40,14,1)',0.55+0.25*hash(i+60),i+1);   // mây tro hắt đỏ
    for(let i=0;i<80;i++){ g.fillStyle=`rgba(255,${120+80*hash(i+90)|0},60,${0.3*hash(i+91)})`; g.fillRect(-320+hash(i+92)*1180,-240+hash(i+93)*900,1.5,1.5); }   // tàn lửa xa
    // 3 lớp núi xa (càng xa càng nhạt, sườn hắt sáng)
    const RANGES=[[0.45,'#3a120c',LAVA-430,220],[0.7,'#240a08',LAVA-330,260],[1,'#140606',LAVA-220,200]];
    RANGES.forEach(([k,col,base,amp],L)=>{ g.beginPath(); g.moveTo(-320,LAVA); for(let x=-320;x<=860;x+=20){ const y=base-amp*Math.pow(Math.abs(Math.sin(x*0.004*(1+L*0.4)+L)),1.6)*(0.7+0.3*h2(x|0,L,3)); g.lineTo(x,y); } g.lineTo(860,LAVA); g.closePath();
      gr=g.createLinearGradient(0,base-amp,0,LAVA); gr.addColorStop(0,col); gr.addColorStop(1,'#060202'); g.fillStyle=gr; g.fill();
      g.save(); g.clip(); gr=g.createLinearGradient(0,LAVA-120,0,LAVA); gr.addColorStop(0,'rgba(255,80,20,0)'); gr.addColorStop(1,`rgba(255,90,20,${0.25*k})`); g.fillStyle=gr; g.fillRect(-320,LAVA-120,1180,120); g.restore(); });
    // 🏔️ cột đá CAO của Supreme (bên trái)
    const P=[[-60,HI+12],[-26,HI-6],[30,HI-3],[90,HI-1],[150,HI],[210,HI-3],[262,HI+4],[286,HI+40],[298,HI+150],[312,HI+330],[340,LAVA+10],[-140,LAVA+10],[-118,HI+330],[-96,HI+160],[-80,HI+50]];
    rockPoly(P,'#140909','#2f1b18','#9a3412',7);
    g.save(); path(P); g.clip(); gr=g.createLinearGradient(0,LAVA-280,0,LAVA); gr.addColorStop(0,'rgba(255,90,20,0)'); gr.addColorStop(1,'rgba(255,120,30,0.6)'); g.fillStyle=gr; g.fillRect(-160,LAVA-280,520,290); g.restore();
    g.strokeStyle='rgba(255,180,130,0.35)'; g.lineWidth=2; g.beginPath(); g.moveTo(-26,HI-6); [[30,HI-3],[90,HI-1],[150,HI],[210,HI-3],[262,HI+4]].forEach(p=>g.lineTo(p[0],p[1])); g.stroke();   // viền sáng mép trên
    // khói bốc từ mặt dung nham
    for(let i=0;i<12;i++) cloud(-300+hash(i+70)*1140,LAVA-60-hash(i+71)*140,120+90*hash(i+72),40+30*hash(i+73),'rgba(60,20,16,1)','rgba(30,10,8,1)',0.28,i+30);
  }); }
  // tảng đá thấp của Grumpy: chia sẵn 6 khối (mép chung, lúc liền khối vẽ 1 hình nên không thấy đường ghép)
  const LEDGE=(()=>{ const xs=[290,335,385,430,478,522,570], top=[LO+6,LO,LO-2,LO,LO+1,LO+4,LO+10], bot=[LO+40,LO+70,LO+92,LO+100,LO+86,LO+64,LO+30];
    const mids=xs.map((x,i)=>[x+(i&&i<xs.length-1?(hash(i+70)-0.5)*14:0), (top[i]+bot[i])/2+(hash(i+90)-0.5)*20]);
    const ch=[]; for(let i=0;i<xs.length-1;i++){ const P=[[xs[i],top[i]],[xs[i+1],top[i+1]],mids[i+1],[xs[i+1],bot[i+1]],[xs[i],bot[i]],mids[i]];
      const cx=P.reduce((s,p)=>s+p[0],0)/P.length, cy=P.reduce((s,p)=>s+p[1],0)/P.length; ch.push({P,cx,cy,vx:(i-2.5)*14+(hash(i+11)-0.5)*20,vy:-40-hash(i+13)*60,vr:(hash(i+17)-0.5)*3.2,dl:hash(i+19)*0.18}); }
    const outline=[]; for(let i=0;i<xs.length;i++) outline.push([xs[i],top[i]]); for(let i=xs.length-1;i>=0;i--) outline.push([xs[i],bot[i]]);
    return {ch,outline}; })();
  { const c=LEDGE.ch[3]; let u=0; while(c.vy*u+575*u*u<LAVA-LO-10 && u<3) u+=0.005; T.splash=T.crush+c.dl+u; }   // 🔥 dung nham bắn tung ĐÚNG lúc Grumpy chạm mặt dung nham
  function chunkPose(c,t){ const u=Math.max(0,t-T.crush-c.dl); return {dx:c.vx*u, dy:c.vy*u+0.5*1150*u*u, r:c.vr*u}; }
  function drawLedge(t){ const shake=t<T.crush&&t>T.press?Math.sin(t*70)*0.6*seg(t,T.rage,T.crush):0;
    if(t<T.crush){ g.save(); g.translate(shake,0); rockPoly(LEDGE.outline,'#1a0d0c','#38221d','#a0360f',11); g.strokeStyle='rgba(255,180,130,0.3)'; g.lineWidth=1.6; g.beginPath(); LEDGE.outline.slice(0,7).forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); g.restore(); return; }
    for(const c of LEDGE.ch){ const p=chunkPose(c,t); if(c.cy+p.dy>LAVA+80) continue;
      g.save(); g.translate(c.cx+p.dx,c.cy+p.dy); g.rotate(p.r); g.translate(-c.cx,-c.cy); rockPoly(c.P,'#1a0d0c','#38221d','#a0360f'); g.restore(); } }
  function drawFalls(t){ g.save(); for(const [x,y0,w] of FALLS){ const gr=g.createLinearGradient(0,y0,0,LAVA); gr.addColorStop(0,'#ffd36a'); gr.addColorStop(0.3,'#ff7a1c'); gr.addColorStop(1,'#b5300a');
      g.fillStyle=gr; g.beginPath(); g.moveTo(x-w*0.4,y0); g.quadraticCurveTo(x-w*0.6,(y0+LAVA)/2,x-w*0.8,LAVA); g.lineTo(x+w*0.8,LAVA); g.quadraticCurveTo(x+w*0.6,(y0+LAVA)/2,x+w*0.4,y0); g.closePath(); g.fill();
      g.globalCompositeOperation='lighter'; for(let i=0;i<6;i++){ const ph=(t*0.9+i/6)%1, yy=y0+ph*(LAVA-y0); g.fillStyle=`rgba(255,240,170,${0.35*Math.sin(ph*Math.PI)})`; g.fillRect(x-w*0.3+(hash(i+x)-0.5)*w*0.4,yy,w*0.25,18); }
      glow(x,LAVA,w*4,0.35,'255,120,30'); g.globalCompositeOperation='source-over'; } g.restore(); }
  function drawLava(t){ const x0=-320, x1=860;
    let gr=g.createLinearGradient(0,LAVA-6,0,LAVA+260); gr.addColorStop(0,'#ffd76a'); gr.addColorStop(0.06,'#ff8a1c'); gr.addColorStop(0.4,'#c8320a'); gr.addColorStop(1,'#3a0904'); g.fillStyle=gr; g.fillRect(x0,LAVA,x1-x0,300);
    g.save(); g.globalCompositeOperation='lighter';
    for(let i=0;i<22;i++){ const y=LAVA+8+i*11, ph=t*(0.4+0.3*hash(i))+hash(i+5)*9; g.strokeStyle=`rgba(255,${180+60*hash(i+2)|0},80,${0.2*(1-i/22)})`; g.lineWidth=2; g.beginPath();
      for(let x=x0;x<=x1;x+=24){ const yy=y+Math.sin(x*0.02+ph)*3; x===x0?g.moveTo(x,yy):g.lineTo(x,yy); } g.stroke(); }
    for(let i=0;i<10;i++){ const ph=(t*0.6+hash(i+50))%1, x=x0+hash(i+60)*(x1-x0), r=3+8*Math.sin(ph*Math.PI); glow(x,LAVA+4,r*3,0.5*Math.sin(ph*Math.PI),'255,200,90'); }
    g.restore(); glow(300,LAVA,560,0.28,'255,90,20'); }
  function embers(t,x0,x1,yb,n,col,hgt){ hgt=hgt||900; g.save(); g.globalCompositeOperation='lighter';
    for(let i=0;i<n;i++){ const ph=(t*(0.08+0.06*hash(i+3))+hash(i))%1, x=x0+hash(i+7)*(x1-x0)+Math.sin(t*1.3+i)*14, y=yb-ph*hgt, a=Math.sin(ph*Math.PI)*0.8;
      g.fillStyle=`rgba(${col},${a})`; g.beginPath(); g.arc(x,y,0.8+1.6*hash(i+9),0,Math.PI*2); g.fill(); } g.restore(); }
  function heatHaze(t,y0,y1,a){ g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<5;i++){ const y=y0+(y1-y0)*((t*0.12+i/5)%1); const gr=g.createLinearGradient(0,y-30,0,y+30); gr.addColorStop(0,'rgba(255,90,30,0)'); gr.addColorStop(0.5,`rgba(255,110,40,${a})`); gr.addColorStop(1,'rgba(255,90,30,0)'); g.fillStyle=gr; g.fillRect(-320,y-30,1180,60); } g.restore(); }
  // 🌑 cảnh 2 · bờ dung nham đêm
  const GY2=760;
  function paintShore(){ return paint(-240,160,780,1120,()=>{
    let gr=g.createLinearGradient(0,160,0,GY2); gr.addColorStop(0,'#040102'); gr.addColorStop(0.6,'#1e0505'); gr.addColorStop(1,'#701a08'); g.fillStyle=gr; g.fillRect(-240,160,1020,GY2-160);
    for(let i=0;i<7;i++) cloud(-240+hash(i+200)*1020,220+hash(i+210)*200,220+140*hash(i+220),70+40*hash(i+230),'rgba(14,4,6,1)','rgba(110,30,12,1)',0.5,i+40);
    g.beginPath(); g.moveTo(-240,GY2-110); for(let x=-240;x<=780;x+=30) g.lineTo(x,GY2-150-60*Math.abs(Math.sin(x*0.006+1))-20*hash(x|0)); g.lineTo(780,GY2-110); g.closePath(); g.fillStyle='#120505'; g.fill();   // dãy đá xa
    gr=g.createLinearGradient(0,GY2-120,0,GY2-58); gr.addColorStop(0,'#ffb340'); gr.addColorStop(0.4,'#ff7418'); gr.addColorStop(1,'#8a2208'); g.fillStyle=gr; g.fillRect(-240,GY2-120,1020,64);   // sông dung nham
    for(let i=0;i<40;i++){ const x=-240+hash(i+700)*1020; g.fillStyle=`rgba(255,230,140,${0.3*hash(i+720)})`; g.fillRect(x,GY2-118+hash(i+740)*55,30+60*hash(i+760),2); }
    g.beginPath(); g.moveTo(-240,GY2-50); for(let k=0;k<=24;k++){ g.lineTo(-240+k*42.5, GY2-50+(hash(k+800)-0.5)*26); } g.lineTo(780,1120); g.lineTo(-240,1120); g.closePath();
    gr=g.createLinearGradient(0,GY2-60,0,1120); gr.addColorStop(0,'#4a2416'); gr.addColorStop(0.08,'#1e0e0a'); gr.addColorStop(1,'#050202'); g.fillStyle=gr; g.fill();   // bờ đá đen phía trước
    for(let i=0;i<70;i++){ const x=-240+hash(i+900)*1020, y=GY2-30+hash(i+940)*360; g.fillStyle=`rgba(0,0,0,${0.3*hash(i+980)})`; g.beginPath(); g.ellipse(x,y,10+30*hash(i+1000),4+10*hash(i+1020),0,0,Math.PI*2); g.fill(); }
    for(let i=0;i<30;i++){ const x=-240+hash(i+1100)*1020, y=GY2-40+hash(i+1110)*80; g.fillStyle=`rgba(255,120,40,${0.12*hash(i+1120)})`; g.beginPath(); g.ellipse(x,y,20+30*hash(i+1130),3,0,0,Math.PI*2); g.fill(); }   // ánh dung nham hắt lên mặt đá
  }); }
  // 🧪 cảnh 3 · phòng thí nghiệm: tường thép, cửa kính lớn nhìn ra núi lửa đêm, bàn điều khiển màn hình xanh, cáp, buồng Vita-Ray ở giữa
  const CHX=270, CHY=700, CHW=124, CHH=250;   // buồng kính: tâm x · đáy y · rộng · cao
  function paintLab(){ return paint(-240,120,780,1080,()=>{
    let gr=g.createLinearGradient(0,120,0,1080); gr.addColorStop(0,'#04060a'); gr.addColorStop(0.55,'#0e141c'); gr.addColorStop(1,'#06080b'); g.fillStyle=gr; g.fillRect(-240,120,1020,960);
    for(let i=0;i<12;i++){ const x=-240+i*90; gr=g.createLinearGradient(x,0,x+90,0); gr.addColorStop(0,'#161c25'); gr.addColorStop(0.5,'#212935'); gr.addColorStop(1,'#11161d'); g.fillStyle=gr; g.fillRect(x+3,180,84,600);
      g.fillStyle='rgba(0,0,0,0.5)'; for(const yy of [200,450,760]) for(const xx of [x+12,x+78]){ g.beginPath(); g.arc(xx,yy,2.2,0,Math.PI*2); g.fill(); } }
    // cửa kính lớn sau buồng: núi lửa đêm phía xa
    g.save(); g.beginPath(); g.rect(110,250,320,250); g.clip(); gr=g.createLinearGradient(0,250,0,500); gr.addColorStop(0,'#08030a'); gr.addColorStop(1,'#5a1406'); g.fillStyle=gr; g.fillRect(110,250,320,250);
    g.beginPath(); g.moveTo(110,500); g.lineTo(200,400); g.lineTo(260,430); g.lineTo(330,360); g.lineTo(430,470); g.lineTo(430,500); g.closePath(); g.fillStyle='#120404'; g.fill(); g.strokeStyle='rgba(255,120,30,0.7)'; g.lineWidth=2; g.beginPath(); g.moveTo(330,362); g.lineTo(318,420); g.lineTo(326,480); g.stroke();
    for(let i=0;i<5;i++){ g.strokeStyle='rgba(180,220,255,0.06)'; g.lineWidth=18; g.beginPath(); g.moveTo(130+i*70,250); g.lineTo(90+i*70,500); g.stroke(); } g.restore();
    g.strokeStyle='#2d3644'; g.lineWidth=8; g.strokeRect(110,250,320,250); g.lineWidth=4; for(const x of [217,323]){ g.beginPath(); g.moveTo(x,250); g.lineTo(x,500); g.stroke(); }
    // bàn điều khiển 2 bên
    for(const [x,f] of [[-150,1],[500,-1]]){ g.fillStyle='#151b23'; g.fillRect(x,600,200,180); g.fillStyle='#202834'; g.fillRect(x,590,200,16);
      for(let k=0;k<3;k++){ const sx=x+14+k*62, sy=520; g.fillStyle='#030806'; g.fillRect(sx,sy,54,60); g.strokeStyle='#2d3644'; g.lineWidth=3; g.strokeRect(sx,sy,54,60);
        for(let l=0;l<6;l++){ g.fillStyle=`rgba(80,255,150,${0.35+0.4*hash(k*7+l+x)})`; g.fillRect(sx+5,sy+6+l*9,44*(0.3+0.7*hash(k*9+l+x)),3); } }
      for(let k=0;k<8;k++){ g.fillStyle=['#ff3b3b','#3bff7a','#ffd23b'][k%3]; g.globalAlpha=0.8; g.beginPath(); g.arc(x+18+k*22,630,4,0,Math.PI*2); g.fill(); g.globalAlpha=1; } }
    g.fillStyle='#090c10'; g.fillRect(-240,780,1020,300);   // sàn bóng
    gr=g.createLinearGradient(0,780,0,880); gr.addColorStop(0,'rgba(120,170,255,0.08)'); gr.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=gr; g.fillRect(-240,780,1020,100);
    g.strokeStyle='rgba(120,140,170,0.12)'; g.lineWidth=1; for(let i=0;i<14;i++){ g.beginPath(); g.moveTo(-240+i*80,780); g.lineTo(270+(i*80-510)*2.2,1080); g.stroke(); }
    g.fillStyle='#12161d'; g.fillRect(-240,120,1020,62); g.fillStyle='#2a323d'; g.fillRect(-240,178,1020,8);   // trần + ray tay máy
    for(const x of [40,270,500]){ g.fillStyle='#2c3542'; g.fillRect(x-30,182,60,12); }   // đèn trần
    for(let k=0;k<5;k++){ g.strokeStyle='#0a0d11'; g.lineWidth=6; g.beginPath(); g.moveTo(-200+k*40,186); g.bezierCurveTo(-180+k*40,400,-60,500,CHX-CHW*0.55,CHY-CHH*0.85+k*12); g.stroke(); }   // bó cáp
  }); }
  // 🏛️ cảnh 4 · doanh trại: cột đen, dải đèn đỏ, băng rôn đỏ trơn, sàn bóng
  const GY4=800;
  function paintHall(){ return paint(-240,140,800,1100,()=>{
    let gr=g.createLinearGradient(0,140,0,GY4); gr.addColorStop(0,'#020203'); gr.addColorStop(1,'#16101a'); g.fillStyle=gr; g.fillRect(-240,140,1040,GY4-140);
    for(let i=0;i<10;i++){ const x=-220+i*110; gr=g.createLinearGradient(x,0,x+50,0); gr.addColorStop(0,'#08070b'); gr.addColorStop(0.5,'#1a161f'); gr.addColorStop(1,'#08070b'); g.fillStyle=gr; g.fillRect(x,180,50,GY4-180);
      g.fillStyle='rgba(255,40,40,0.5)'; g.fillRect(x+4,220,42,4); g.fillRect(x+4,GY4-40,42,4); }
    for(let i=0;i<4;i++){ const x=-110+i*250; g.fillStyle='#4a0707'; g.fillRect(x,230,80,260); g.fillStyle='#1a0101'; g.fillRect(x+8,240,64,240); g.strokeStyle='rgba(255,70,70,0.4)'; g.lineWidth=2; g.beginPath(); g.arc(x+40,320,20,0,Math.PI*2); g.stroke(); g.beginPath(); g.moveTo(x+40,300); g.lineTo(x+40,340); g.moveTo(x+20,320); g.lineTo(x+60,320); g.stroke(); }
    gr=g.createLinearGradient(0,GY4,0,1100); gr.addColorStop(0,'#201a26'); gr.addColorStop(1,'#040306'); g.fillStyle=gr; g.fillRect(-240,GY4,1040,300);
    g.strokeStyle='rgba(255,60,60,0.12)'; for(let i=0;i<16;i++){ g.beginPath(); g.moveTo(-240+i*70,GY4); g.lineTo(280+(i*70-520)*2.4,1100); g.stroke(); }
    for(let i=0;i<4;i++){ gr=g.createLinearGradient(0,140,0,GY4); gr.addColorStop(0,'rgba(255,40,40,0.12)'); gr.addColorStop(1,'rgba(255,40,40,0)'); g.fillStyle=gr; g.beginPath(); g.moveTo(-40+i*200,140); g.lineTo(-10+i*200,140); g.lineTo(60+i*200,GY4); g.lineTo(-110+i*200,GY4); g.closePath(); g.fill(); }   // vệt đèn đỏ chiếu xiên
  }); }
  function fog(t,y,a,col){ g.save(); for(let i=0;i<10;i++){ const x=-240+((hash(i+300)*1100+t*14*(0.5+hash(i+301)))%1100); g.fillStyle=`rgba(${col},${a*(0.4+0.6*hash(i+302))})`; g.beginPath(); g.ellipse(x,y+(hash(i+303)-0.5)*40,160,30,0,0,Math.PI*2); g.fill(); } g.restore(); }

  // ───────────────────── 🎭 NHÂN VẬT ─────────────────────
  let BURN=null;   // Grumpy cháy nửa người (vẽ sẵn)
  function buildBurn(){ const c=prep(IMG.grumpy); if(!c) return null; const w=c.sw, h=c.sh, out=mk(w,h), x=out.getContext('2d');
    x.drawImage(c.src,c.sx,c.sy,w,h,0,0,w,h); x.globalCompositeOperation='source-atop';
    let gr=x.createLinearGradient(w*0.35,0,w*0.75,0); gr.addColorStop(0,'rgba(20,8,4,0)'); gr.addColorStop(0.35,'rgba(30,10,4,0.75)'); gr.addColorStop(1,'rgba(10,4,2,0.95)'); x.fillStyle=gr; x.fillRect(0,0,w,h);
    for(let i=0;i<120;i++){ const px=w*(0.45+0.55*hash(i+1200)), py=h*hash(i+1300); x.fillStyle=`rgba(0,0,0,${0.3+0.4*hash(i+1400)})`; x.beginPath(); x.arc(px,py,2+w*0.03*hash(i+1500),0,Math.PI*2); x.fill(); }
    gr=x.createLinearGradient(w*0.36,0,w*0.5,0); gr.addColorStop(0,'rgba(255,120,30,0)'); gr.addColorStop(0.5,'rgba(255,110,30,0.55)'); gr.addColorStop(1,'rgba(255,90,20,0)'); x.fillStyle=gr; x.fillRect(0,0,w,h);   // mép cháy âm ỉ
    x.globalCompositeOperation='destination-in'; const m=x.createRadialGradient(w*0.5,h*0.36,Math.min(w,h)*0.22,w*0.5,h*0.42,Math.max(w,h)*0.62); m.addColorStop(0,'rgba(0,0,0,1)'); m.addColorStop(0.7,'rgba(0,0,0,0.85)'); m.addColorStop(1,'rgba(0,0,0,0)'); x.fillStyle=m; x.fillRect(0,0,w,h);   // mép ảnh nửa người mờ dần (nằm nghiêng không lòi đường cắt)
    return {src:out, sx:0, sy:0, sw:w, sh:h}; }
  function smoke(x,y,t,n,a){ g.save(); for(let i=0;i<n;i++){ const ph=(((t*0.35+hash(i+60))%1)+1)%1, xx=x+(hash(i+61)-0.5)*40+Math.sin(t+i)*10*ph, yy=y-ph*140, r=10+ph*40;
      g.fillStyle=`rgba(46,40,46,${a*0.35*Math.sin(ph*Math.PI)})`; g.beginPath(); g.arc(xx,yy,r,0,Math.PI*2); g.fill(); } g.restore(); }
  function burntGrumpy(x,y,h,rot,a,t){ const bc=BURN||(BURN=buildBurn()); if(!bc) return; actor(bc,x,y,h,{center:true,rot,a}); smoke(x+10,y-8,t,6,a);
    g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<8;i++){ const ph=(t*0.7+hash(i+80))%1; glow(x-10+hash(i+81)*36,y-10+hash(i+82)*24,4,0.6*Math.sin(ph*Math.PI)*a,'255,120,40'); } g.restore(); }
  // 🛏️ cáng: 2 đòn + vải
  function stretcher(x,y,len,ang){ g.save(); g.translate(x,y); g.rotate(ang||0); g.fillStyle='#4a3a28'; g.fillRect(-len/2-20,-5,len+40,4); g.fillRect(-len/2-20,5,len+40,4);
    g.fillStyle='#5f6b4a'; g.fillRect(-len/2,-6,len,14); g.strokeStyle='rgba(0,0,0,0.4)'; g.lineWidth=1; for(let k=1;k<5;k++){ g.beginPath(); g.moveTo(-len/2+k*len/5,-6); g.lineTo(-len/2+k*len/5,8); g.stroke(); } g.restore(); }

  // ───────────────────── 🎥 MÁY QUAY (toạ độ riêng mỗi cảnh — cặp mốc trùng giờ ở chỗ chuyển cảnh nên không trượt qua nhau) ─────────────────────
  const CAMK=[[0,300,600,0.92],[T.press,300,600,0.98],[T.line1-0.25,250,470,1.25],[T.line1+0.4,170,315,1.85],[T.boxOff,170,315,1.9],[T.grab,430,650,2.05],[T.throw,430,650,2.1],[T.throw+0.35,290,510,1.15],[T.hit,175,290,2.1],
    [T.rage,165,215,1.12],[T.crush-0.3,165,215,1.12],[T.crush+0.15,410,650,1.3],[T.splash-0.15,430,800,1.3],[T.splash+0.3,430,850,1.4],[T.s2-0.001,430,850,1.45],
    [T.s2,330,690,1.7],[T.pain,345,680,1.45],[T.lift,330,660,1.45],[T.carry,300,660,1.4],[T.lab-0.001,180,660,1.35],
    [T.lab,270,560,1.0],[T.doorShut,270,580,1.25],[T.serum,270,560,1.35],[T.ray,270,560,1.2],[T.peak,270,560,1.5],[T.open,270,580,1.6],[T.leg,265,620,1.9],[T.body,265,580,1.9],[T.helm,268,540,2.0],[T.breath,270,530,2.3],[T.army-0.001,270,500,2.8],
    [T.army,300,660,1.3],[T.hand,270,660,1.35],[T.pull,255,630,1.35],[T.choke,215,600,1.75],[T.drop,205,620,1.55],[T.title,150,680,1.45],[DUR,150,670,1.6]];
  function cam(t){ let r=CAMK[CAMK.length-1].slice(1);
    for(let i=1;i<CAMK.length;i++) if(t<CAMK[i][0]){ const a=CAMK[i-1], b=CAMK[i], e=eio(seg(t,a[0],b[0])); r=[lerp(a[1],b[1],e),lerp(a[2],b[2],e),Math.exp(lerp(Math.log(a[3]),Math.log(b[3]),e))]; break; }
    let sh=0; if(t>=T.crush && t<T.splash+0.6) sh=9*Math.exp(-(t-T.crush)*1.2)+(t>=T.splash?10*Math.exp(-(t-T.splash)*5):0);
    if(t>=T.rage && t<T.crush) sh+=2.5*seg(t,T.rage,T.crush); if(t>=T.hit && t<T.hit+0.25) sh+=6*(1-(t-T.hit)/0.25); if(t>=T.title && t<T.title+0.5) sh+=8*(1-(t-T.title)/0.5);
    if(t>=T.ray && t<T.peak+0.3) sh+=3*seg(t,T.ray,T.peak); if(t>=T.drop+0.35 && t<T.drop+0.6) sh+=5;
    if(sh>0.2){ r[0]+=(hash(Math.floor(t*60))-0.5)*sh/r[2]; r[1]+=(hash(Math.floor(t*60)+7)-0.5)*sh/r[2]; }
    return r; }

  // ───────────────────── 🔊 LỊCH TIẾNG (1 nhịp 1 tiếng) ─────────────────────
  const SFX_PLAN=[[0.3,'ep3_lava',0.7,0],[T.press,'sa_menacing',1.0,0],[T.hit,'bonk',1.0,0],[T.rage,'demon_roar1',1.0,0],[T.crush,'ep3_rock',1.0,0],[T.splash-0.05,'ep3_whoosh',1.0,0],
    [T.pain,'ep3_dark',0.9,0],[T.doorShut,'ep3_klunk',1.0,0],[T.serum,'ep3_hydraulic',0.9,0],[T.ray,'ultimate_charge_2',0.9,0],[T.cool,'gas_leak',0.8,1.6],
    [T.leg-0.55,'ep3_ratchet',0.8,0],[T.leg,'ep3_klunk',1.0,0],[T.body-0.55,'ep3_ratchet',0.8,0],[T.body,'ep3_klunk',1.0,0],[T.helm-0.8,'ep3_arm',0.9,0],[T.helm,'ep3_klunk',1.0,0],
    [T.breath,'ep3_breath',1.0,0],[T.hand,'ep3_force',1.0,0],[T.choke,'ep3_choke',0.9,0],[T.drop+0.35,'pd_fall',0.9,0],[T.title,'ep3_boom',1.0,0]];
  for(const L of LINES){ let n=0; for(let i=0;i<L.txt.length;i++){ if(L.txt[i]===' ') continue; if((n++)%2) continue; SFX_PLAN.push([L.t+0.25+i/CPS,'ep3_blip',0.7,0]); } }   // tiếng "píp" chữ pixel (cách 1 chữ kêu 1 lần)
  SFX_PLAN.sort((a,b)=>a[0]-b[0]);

  // ───────────────────── 💬 HỘP THOẠI CHỮ PIXEL (toạ độ màn hình) ─────────────────────
  function dialog(t){ if(t<T.line1 || t>T.boxOff+0.25) return; const a=Math.min(seg(t,T.line1,T.line1+0.2),1-seg(t,T.boxOff,T.boxOff+0.25)); if(a<=0) return;
    const L=t>=T.line2?LINES[1]:LINES[0], n=Math.floor(clamp((t-L.t-0.25)*CPS,0,L.txt.length)), txt=L.txt.slice(0,n);
    const bx=20, by=708, bw=VW-40, bh=190, pop=1+0.06*(1-eout(seg(t,T.line1,T.line1+0.2)));
    g.save(); g.globalAlpha=a; g.translate(VW/2,by+bh/2); g.scale(pop,pop); g.translate(-VW/2,-(by+bh/2)); g.imageSmoothingEnabled=false;
    g.fillStyle='rgba(0,0,0,0.92)'; g.fillRect(bx,by,bw,bh);
    g.fillStyle='#fff'; for(const [x,y,w,h] of [[bx,by,bw,5],[bx,by+bh-5,bw,5],[bx,by,5,bh],[bx+bw-5,by,5,bh]]) g.fillRect(x,y,w,h);   // viền pixel 2 lớp
    g.fillStyle='#8a5cff'; for(const [x,y,w,h] of [[bx+10,by+10,bw-20,3],[bx+10,by+bh-13,bw-20,3],[bx+10,by+10,3,bh-20],[bx+bw-13,by+10,3,bh-20]]) g.fillRect(x,y,w,h);
    const pc=prep(IMG.sup), PX=bx+24, PY=by+26, PS=108;
    if(pc){ g.save(); g.beginPath(); g.rect(PX,PY,PS,PS); g.clip(); const bgp=g.createLinearGradient(0,PY,0,PY+PS); bgp.addColorStop(0,'#3a0a6a'); bgp.addColorStop(1,'#12021f'); g.fillStyle=bgp; g.fillRect(PX,PY,PS,PS);
      const fh=PS/0.38, fw=fh*pc.sw/pc.sh, fx=0.647, fy=0.146; g.imageSmoothingEnabled=true; g.drawImage(pc.src,pc.sx,pc.sy,pc.sw,pc.sh,PX+PS/2-fw*fx,PY+PS*0.48-fh*fy,fw,fh); g.restore();   // tâm mặt Supreme (SA_FACE trong game)
      g.fillStyle='#fff'; g.fillRect(PX-3,PY-3,PS+6,3); g.fillRect(PX-3,PY+PS,PS+6,3); g.fillRect(PX-3,PY,3,PS); g.fillRect(PX+PS,PY,3,PS); }
    g.textAlign='left'; g.textBaseline='top'; g.font='13px "Press Start 2P",monospace'; g.fillStyle='#c48cff'; g.fillText('SUPREME CAT',PX+PS+18,PY+2);
    g.font='18px "Press Start 2P",monospace'; g.fillStyle='#fff';
    const words=txt.split(' '); let line='', lines=[]; for(const w of words){ const test=line?line+' '+w:w; if(g.measureText(test).width>bw-PS-62){ lines.push(line); line=w; } else line=test; } lines.push(line);
    lines.forEach((ln,i)=>g.fillText(ln,PX+PS+18,PY+34+i*32));
    if(n>=L.txt.length && Math.floor(t*3)%2===0){ g.fillStyle='#fff'; const ax=bx+bw-34, ay=by+bh-38; g.fillRect(ax,ay,12,4); g.fillRect(ax+2,ay+4,8,4); g.fillRect(ax+4,ay+8,4,4); }
    g.restore(); }
  function title(t){ if(t<T.title) return; const a=seg(t,T.title,T.title+0.35), s=1+0.25*(1-eout(seg(t,T.title,T.title+0.5)));
    g.save(); g.globalAlpha=a; g.textAlign='center'; g.textBaseline='middle';
    const gr=g.createLinearGradient(0,VH*0.1,0,VH*0.1+170); gr.addColorStop(0,'rgba(0,0,0,0)'); gr.addColorStop(0.3,'rgba(0,0,0,0.7)'); gr.addColorStop(0.7,'rgba(0,0,0,0.7)'); gr.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=gr; g.fillRect(0,VH*0.1,VW,170);
    g.translate(VW/2,VH*0.1+85); g.scale(s,s);
    g.font='14px "Press Start 2P",monospace'; g.fillStyle='#ff4040'; g.fillText('MEME LORE 2 · EP 3',0,-40);
    g.font='28px "Press Start 2P",monospace'; g.lineWidth=7; g.strokeStyle='#000'; g.strokeText('THE HIGH GROUND',0,8); g.fillStyle='#fff'; g.fillText('THE HIGH GROUND',0,8);
    g.fillStyle='#ff2a2a'; g.fillRect(-150,36,300,3);
    g.restore(); }

  // ───────────────────── 🎬 CẢNH 1 · NÚI LỬA ─────────────────────
  function scene1(t){
    drawBG(BG1); drawFalls(t); embers(t,-300,840,LAVA,90,'255,140,60'); heatHaze(t,LAVA-300,LAVA,0.05);
    const pc=prep(IMG.sup); const sL=pc?spriteInfo(pc,MU*1.05):null;
    const gf=t<T.press?0:(t<T.rage?0.55*seg(t,T.press,T.press+0.8):lerp(0.55,1,seg(t,T.rage,T.rage+0.7)));
    const P=t<T.rage?0:eio(seg(t,T.rage,T.rage+1.0)), eyes=seg(t,T.rage+0.7,T.rage+1.0);
    if(sL && P>0){ g.save(); g.globalCompositeOperation='lighter'; glow(SUPX,HI-MU*2.1,260,0.45*P,'150,40,230'); glow(SUPX,HI-MU*2.4,150,0.35*P,'255,90,200'); g.restore(); }   // quầng sáng tím sau lưng mặt quỷ (để mặt quỷ đen nổi trên nền trời tối)
    if(sL){ if(P>0) saDemon(SUPX,HI,sL,P,eyes,t); if(gf>0){ saRings(SUPX,HI,MU*0.5,gf,t); saAura(SUPX,HI,sL,gf,t); }
      const jr=t>=T.hit?-0.28*Math.exp(-(t-T.hit)*5)*Math.cos((t-T.hit)*18):0;   // bị đá trúng mặt: giật đầu
      actor(pc,SUPX,HI,MU*1.05,{rot:jr});
      if(t>=T.rage){ const k=seg(t,T.rage,T.rage+0.4); g.save(); g.globalCompositeOperation='lighter'; glow(SUPX-6,HI-MU*0.86,14,0.9*k,'200,80,255'); glow(SUPX+14,HI-MU*0.86,14,0.9*k,'200,80,255'); g.restore(); }   // mắt rực tím
      if(t>=T.rage+0.5 && t<T.splash+0.8){ const k=Math.min(seg(t,T.rage+0.5,T.rage+0.8),1-seg(t,T.splash,T.splash+0.8)); g.save(); g.font='bold 30px "Noto Sans JP","Hiragino Sans",sans-serif'; g.textAlign='center';   // ゴゴゴ
        for(let i=0;i<4;i++){ const a2=i/4*Math.PI*2+0.4, rr=MU*0.95+Math.sin(t*6+i)*4; g.save(); g.translate(SUPX+Math.cos(a2)*rr*1.1,HI-MU*0.55+Math.sin(a2)*rr*0.6); g.rotate(-0.15+0.3*hash(i+5));
          g.lineWidth=5; g.strokeStyle=`rgba(20,0,30,${0.9*k})`; g.strokeText('ゴゴゴ',0,0); g.fillStyle=`rgba(200,80,255,${k})`; g.fillText('ゴゴゴ',0,0); g.restore(); } g.restore(); } }
    drawLedge(t);
    const pv=t<T.press?0:(t<T.crush?0.6+0.3*seg(t,T.rage,T.crush):1);
    let gx=GRX, gy=LO, rot=0, sy=1, sx=1, alpha=1;
    if(t>=T.press){ const k=eio(seg(t,T.press,T.press+0.5)); sy=lerp(1,t<T.rage?0.76:lerp(0.76,0.62,seg(t,T.rage,T.crush)),k); sx=lerp(1,1.14,k); gx+=Math.sin(t*55)*1.4*k; }
    if(t>=T.crush){ const c=LEDGE.ch[3], p=chunkPose(c,t); gx+=p.dx; gy+=p.dy; rot=p.r*0.6; if(t>=T.splash) alpha=0; }
    if(t<T.crush && pv>0) saPressed(GRX,LO,MU*0.5,pv,t,3.7);
    const gc=(t>=T.throw-0.1 && t<T.throw+0.35)?prep(IMG.grumpyAtk):prep(IMG.grumpy);
    if(alpha>0) actor(gc,gx,gy,MU,{sx,sy,rot,flip:true});
    const st=prep(IMG.stone);
    if(st){ if(t>=T.grab && t<T.throw){ actor(st,GRX-34,LO-4,16,{}); }
      else if(t>=T.throw && t<T.hit){ const u=seg(t,T.throw,T.hit), x=lerp(GRX-30,SUPX+10,u), y=lerp(LO-50,HI-MU*0.8,u)-Math.sin(u*Math.PI)*150; actor(st,x,y,18,{center:true,rot:t*14}); }
      else if(t>=T.hit && t<T.hit+1.6){ const u=t-T.hit, x=SUPX+10+60*u, y=HI-MU*0.8-120*u+500*u*u; actor(st,x,y,18,{center:true,rot:t*10}); } }
    if(t>=T.hit && t<T.hit+0.3){ const k=1-(t-T.hit)/0.3; g.save(); g.globalCompositeOperation='lighter'; glow(SUPX+10,HI-MU*0.8,60*k+10,0.9*k,'255,240,200'); g.restore(); }
    drawLava(t);
    if(t>=T.splash){ const u=t-T.splash; g.save(); g.globalCompositeOperation='lighter';
      glow(GRX+20,LAVA,240*Math.min(1,u*4),0.9*Math.exp(-u*1.5),'255,150,40');
      for(let i=0;i<54;i++){ const a=-Math.PI/2+(hash(i+500)-0.5)*1.5, sp=180+340*hash(i+520), x=GRX+20+Math.cos(a)*sp*u, y=LAVA+Math.sin(a)*sp*u+520*u*u;
        if(y>LAVA+10) continue; g.fillStyle=`rgba(255,${120+120*hash(i+540)|0},40,${Math.max(0,1-u*0.8)})`; g.beginPath(); g.arc(x,y,2+4*hash(i+560),0,Math.PI*2); g.fill(); } g.restore(); }
    if(t>=T.rage && t<T.splash) fullFill('rgba(18,0,30,A)',0.28*seg(t,T.rage,T.rage+0.6));
  }
  // ───────────────────── 🎬 CẢNH 2 · BỜ DUNG NHAM: Pain nhấc lên cáng, lính khiêng đi ─────────────────────
  function scene2(t){
    drawBG(BG2); embers(t,-200,760,GY2-60,50,'255,120,50',600);
    const sc=soldierImg(), pc=prep(IMG.pain);
    // 🛏️ cáng: 2 lính khiêng vào từ phải (dừng cạnh Grumpy) → đặt Grumpy lên → khiêng ra bên trái
    const cin=eio(seg(t,T.carry0,T.lift)), cout=seg(t,T.carry,T.lab), sx0=lerp(640,250,cin)-cout*560, sy0=GY2-46, len=110, walk=(t>=T.carry0&&t<T.lift)||t>=T.carry?Math.sin(t*14):0;
    // Grumpy: nằm trên đất → nổi lên (chakra) → hạ xuống cáng → đi theo cáng
    const lift=seg(t,T.lift,T.lift+0.6), onS=eio(seg(t,T.lift+0.5,T.onStr));
    let gx=290, gy=GY2-30, gr=-Math.PI/2+0.06*Math.sin(t*0.8)*(1-lift);
    gy-=lift*(1-onS)*80; gx=lerp(gx,sx0,onS); gy=lerp(gy,sy0-30,onS)+(t>=T.carry?walk*1.5:0);
    if(t>=T.carry){ gx=sx0; }
    // lính khiêng 2 đầu cáng (đi bộ nhún nhảy)
    const sold=(x,ph)=>actor(sc,x,GY2-2+Math.abs(Math.sin(t*7+ph))*-3,MU*0.82,{flip:t<T.carry,rot:Math.sin(t*7+ph)*0.04});
    if(t>=T.carry0){ sold(sx0+len/2+26,0); }
    if(t>=T.carry0) stretcher(sx0,sy0+walk*1.5,len,0);
    burntGrumpy(gx,gy,MU*0.92,gr,1,t);
    if(t>=T.carry0) sold(sx0-len/2-26,1.6);
    // 🌑 Pain bước ra từ bóng tối, dùng chakra nhấc Grumpy
    if(pc && t>=T.pain){ const a=seg(t,T.pain,T.pain+0.8)*(1-seg(t,T.carry+0.3,T.carry+1.0)), px=lerp(480,410,eio(seg(t,T.pain+0.3,T.lift-0.2))), bob=Math.sin(t*5)*1.5*(t<T.lift?1:0);
      g.save(); g.globalCompositeOperation='lighter'; glow(px,GY2-60,100,0.28*a,'120,40,200'); g.restore();
      actor(pc,px,GY2-30+bob,MU*1.1,{a,flip:true});
      if(t>=T.lift && t<T.onStr+0.3){ const k=a*(1-seg(t,T.onStr,T.onStr+0.3)); g.save(); g.lineCap='round';
        for(let i=0;i<8;i++){ const ph=(t*1.4+hash(i+90))%1, x0=px-34, y0=GY2-30-MU*0.6, x1=gx+(hash(i+91)-0.5)*40, y1=gy+(hash(i+92)-0.5)*20;
          g.strokeStyle=`rgba(${60+60*hash(i)|0},20,${110+60*hash(i+1)|0},${0.6*k*Math.sin(ph*Math.PI)})`; g.lineWidth=2+3*hash(i+93);
          g.beginPath(); g.moveTo(x0,y0); g.quadraticCurveTo((x0+x1)/2+Math.sin(t*3+i)*20,(y0+y1)/2-30,x1,y1); g.stroke(); }
        g.globalCompositeOperation='lighter'; glow(gx,gy,60,0.35*k,'140,60,220'); g.restore(); } }
    fog(t,GY2+20,0.18,'60,30,30');
    if(t>=T.fade2) fullFill('rgba(0,0,0,A)',seg(t,T.fade2,T.lab));
  }
  // ───────────────────── 🎬 CẢNH 3 · PHÒNG THÍ NGHIỆM ─────────────────────
  // 🦾 tay máy: gốc trên trần → khuỷu → kẹp
  function arm(bx,by,tx,ty,open){ const L1=150, L2=140, dx=tx-bx, dy=ty-by, d=Math.min(L1+L2-1,Math.hypot(dx,dy)), a=Math.atan2(dy,dx), c=Math.acos(clamp((L1*L1+d*d-L2*L2)/(2*L1*d),-1,1)), ex=bx+Math.cos(a-c)*L1, ey=by+Math.sin(a-c)*L1;
    g.save(); g.lineCap='round';
    for(const [w,col] of [[18,'#20262f'],[12,'#465262'],[4,'#6a7a8e']]){ g.strokeStyle=col; g.lineWidth=w; g.beginPath(); g.moveTo(bx,by); g.lineTo(ex,ey); g.lineTo(tx,ty); g.stroke(); }
    g.fillStyle='#2a323d'; g.fillRect(bx-16,by-8,32,16);
    g.fillStyle='#596577'; g.beginPath(); g.arc(ex,ey,10,0,Math.PI*2); g.fill(); g.fillStyle='#ff3030'; g.beginPath(); g.arc(ex,ey,3.2,0,Math.PI*2); g.fill();
    const ang=Math.atan2(ty-ey,tx-ex); g.translate(tx,ty); g.rotate(ang); g.strokeStyle='#9aa8bb'; g.lineWidth=5;
    for(const s of [-1,1]){ g.beginPath(); g.moveTo(0,0); g.lineTo(16,s*(6+open*8)); g.lineTo(27,s*(2+open*6)); g.stroke(); } g.restore(); }
  const PARTS=[{v0:0.66,v1:1.0,t:T.leg,arm:0},{v0:0.33,v1:0.66,t:T.body,arm:2},{v0:0,v1:0.33,t:T.helm,arm:1}];   // dải trong ảnh Catvader (trên → dưới) · lúc gắn · tay máy nào
  function sparks(x,y,t0,t,n){ const u=t-t0; if(u<0||u>0.6) return; g.save(); g.globalCompositeOperation='lighter';
    for(let i=0;i<n;i++){ const a=hash(i+t0*7)*Math.PI*2, sp=80+160*hash(i+3+t0), xx=x+Math.cos(a)*sp*u, yy=y+Math.sin(a)*sp*u+300*u*u; g.fillStyle=`rgba(255,${200+50*hash(i)|0},120,${1-u/0.6})`; g.fillRect(xx,yy,2.4,2.4); }
    glow(x,y,50*(1-u/0.6),0.8*(1-u/0.6),'255,220,150'); g.restore(); }
  // ống dẫn thuốc: chất lỏng phát sáng chạy dọc ống (gạch sáng trôi)
  function tube(P,col,k,t,w){ g.save(); g.lineCap='round'; g.lineJoin='round'; g.strokeStyle='#1a2029'; g.lineWidth=w+4; g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke();
    g.strokeStyle='rgba(200,220,255,0.18)'; g.lineWidth=w; g.stroke();
    if(k>0){ g.strokeStyle=`rgba(${col},${0.85*k})`; g.lineWidth=w-2; g.setLineDash([14,10]); g.lineDashOffset=-t*90; g.stroke(); g.setLineDash([]); g.globalCompositeOperation='lighter'; g.strokeStyle=`rgba(${col},${0.25*k})`; g.lineWidth=w+8; g.stroke(); }
    g.restore(); }
  function scene3(t){
    drawBG(BG3);
    const H=MU*1.3, bodyY=CHY-10, bc=BURN||(BURN=buildBurn()), vc=prep(IMG.vader);
    const doorK=t<T.open?eio(seg(t,T.door,T.doorShut)):1-eio(seg(t,T.open,T.open+0.6));   // kính trượt xuống (đóng) · lúc mở trượt lên
    const ray=t<T.ray?0:(t<T.peak?eio(seg(t,T.ray,T.peak)):1-eio(seg(t,T.peak,T.cool+0.6)));
    const serum=seg(t,T.serum,T.serum+0.5)*(1-seg(t,T.cool,T.open));
    // ⚗️ ống dẫn thuốc từ trên trần / 2 bên vào buồng
    tube([[CHX-CHW*0.38,CHY-CHH-10],[CHX-CHW*0.38,CHY-CHH-60],[CHX-160,CHY-CHH-60],[CHX-160,186]],'255,60,80',serum,t,9);
    tube([[CHX+CHW*0.38,CHY-CHH-10],[CHX+CHW*0.38,CHY-CHH-80],[CHX+170,CHY-CHH-80],[CHX+170,186]],'80,200,255',serum,t+0.3,9);
    tube([[CHX-CHW/2-6,CHY-CHH*0.5],[CHX-140,CHY-CHH*0.5],[CHX-160,CHY-40],[CHX-200,CHY-40]],'255,60,80',serum,t+0.6,7);
    // 🫙 buồng Vita-Ray: khung kim loại tròn trên/dưới, lòng buồng sáng theo tia
    g.save();
    let gr=g.createLinearGradient(CHX-CHW/2,0,CHX+CHW/2,0); gr.addColorStop(0,'#1a2029'); gr.addColorStop(0.5,'#2c3542'); gr.addColorStop(1,'#141920');
    g.fillStyle=gr; g.fillRect(CHX-CHW/2-14,CHY-CHH-26,CHW+28,30); g.fillRect(CHX-CHW/2-14,CHY-6,CHW+28,34);   // nắp trên + đế
    g.fillStyle='#0d1117'; g.fillRect(CHX-CHW/2,CHY-CHH,CHW,CHH);   // lòng buồng tối
    const inner=g.createRadialGradient(CHX,CHY-CHH*0.5,10,CHX,CHY-CHH*0.5,CHH*0.7); inner.addColorStop(0,`rgba(220,240,255,${0.15+0.85*ray})`); inner.addColorStop(1,`rgba(80,140,255,${0.05+0.45*ray})`); g.fillStyle=inner; g.fillRect(CHX-CHW/2,CHY-CHH,CHW,CHH);
    for(let k=0;k<10;k++){ g.fillStyle=`rgba(255,${180+60*ray|0},90,${0.3+0.7*ray})`; g.fillRect(CHX-CHW/2+4,CHY-CHH+14+k*23,6,10); g.fillRect(CHX+CHW/2-10,CHY-CHH+14+k*23,6,10); }   // dãy đèn 2 mép
    g.restore();
    // 😾 thân bên trong buồng: Grumpy cháy → (sau khi mở buồng) giáp Catvader lắp dần từ chân lên đầu
    const done=PARTS.filter(p=>t>=p.t).length;
    if(bc && done<3){ const wb=H*bc.sw/bc.sh*0.92; g.save(); g.globalAlpha=1-(done>=3?1:0); g.drawImage(bc.src,bc.sx,bc.sy,bc.sw,bc.sh,CHX-wb/2,bodyY-H,wb,H); g.restore(); }
    if(vc){ const w=H*vc.sw/vc.sh; for(const p of PARTS){ if(t<p.t) continue; const k=seg(t,p.t,p.t+0.15); g.save(); g.globalAlpha=k; g.beginPath(); g.rect(CHX-w/2-2,bodyY-H+H*p.v0,w+4,H*(p.v1-p.v0)+0.8); g.clip();
      g.drawImage(vc.src,vc.sx,vc.sy,vc.sw,vc.sh,CHX-w/2,bodyY-H,w,H); g.restore(); } }
    // 💉 dây truyền thuốc vào 2 tay
    if(serum>0){ g.save(); g.lineCap='round'; for(const [x0,y0,x1,y1,col] of [[CHX-CHW/2+2,CHY-CHH*0.5,CHX-22,bodyY-H*0.48,'255,60,80'],[CHX+CHW/2-2,CHY-CHH*0.55,CHX+22,bodyY-H*0.48,'80,200,255']]){
        g.strokeStyle=`rgba(${col},${0.8*serum})`; g.lineWidth=2.5; g.setLineDash([6,5]); g.lineDashOffset=-t*60; g.beginPath(); g.moveTo(x0,y0); g.quadraticCurveTo((x0+x1)/2,(y0+y1)/2+20,x1,y1); g.stroke(); g.setLineDash([]); } g.restore(); }
    // 🪟 kính trước buồng (trượt) + phản chiếu
    if(doorK>0.01){ const gh=CHH*doorK; g.save(); g.fillStyle=`rgba(140,190,255,${0.12+0.1*ray})`; g.fillRect(CHX-CHW/2,CHY-CHH,CHW,gh);
      g.strokeStyle='rgba(220,240,255,0.35)'; g.lineWidth=2; g.strokeRect(CHX-CHW/2+2,CHY-CHH+1,CHW-4,gh-2);
      g.globalCompositeOperation='lighter'; g.fillStyle='rgba(255,255,255,0.12)'; g.beginPath(); g.moveTo(CHX-CHW/2+12,CHY-CHH); g.lineTo(CHX-CHW/2+34,CHY-CHH); g.lineTo(CHX-CHW/2+10,CHY-CHH+gh); g.lineTo(CHX-CHW/2-12+12,CHY-CHH+gh); g.closePath(); g.fill(); g.restore(); }
    // ☀️ tia Vita-Ray: sáng tràn ra ngoài buồng, tia toả
    if(ray>0){ g.save(); g.globalCompositeOperation='lighter'; glow(CHX,CHY-CHH*0.5,CHH*1.4*ray+40,0.75*ray,'200,225,255');
      for(let i=0;i<14;i++){ const a=i/14*Math.PI*2+t*0.3, L=(160+120*hash(i+400))*ray; g.strokeStyle=`rgba(210,230,255,${0.25*ray})`; g.lineWidth=6+8*hash(i+401); g.beginPath(); g.moveTo(CHX,CHY-CHH*0.5); g.lineTo(CHX+Math.cos(a)*L,CHY-CHH*0.5+Math.sin(a)*L); g.stroke(); }
      if(Math.floor(t*14)%3===0) glow(CHX+(hash(Math.floor(t*14))-0.5)*CHW,CHY-CHH*hash(Math.floor(t*14)+3),40,0.6*ray,'255,255,255');   // chớp loé
      g.restore(); }
    if(t>=T.peak-0.25 && t<T.cool+0.2) fullFill('rgba(235,245,255,A)',Math.min(seg(t,T.peak-0.25,T.peak),1-seg(t,T.peak,T.cool+0.2)));   // trắng xoá
    // 🌫️ hơi nước tràn ra khi tắt tia + mở buồng
    if(t>=T.cool && t<T.leg+1){ const u=seg(t,T.cool,T.leg+1); for(const dx of [-50,0,50]) smoke(CHX+dx,CHY+10,t*1.6+dx,8,1.3*(1-u)); }
    // 🦾 tay máy (chỉ hạ xuống sau khi buồng mở)
    const ARMB=[[90,192],[270,192],[450,192]];
    for(const p of PARTS){ const [bx,by]=ARMB[p.arm], mid=(p.v0+p.v1)/2, fx=CHX, fy=bodyY-H+H*mid, go=seg(t,p.t-0.85,p.t), back=seg(t,p.t+0.25,p.t+0.9);
      const hx=lerp(bx,fx+(p.arm===0?-30:p.arm===2?30:0),eio(go)), hy=lerp(by+90,fy-34,eio(go))-back*150, open=t<p.t?0:1;
      if(t<T.open){ arm(bx,by,bx,by+90,0); continue; }
      if(t<p.t+1.0 && t>p.t-1.2){ arm(bx,by,hx,hy,open);
        if(vc && t<p.t){ const w=H*vc.sw/vc.sh; g.save(); g.translate(hx-(p.arm===0?-30:p.arm===2?30:0),hy+34); g.beginPath(); g.rect(-w/2,-H*(p.v1-p.v0)/2,w,H*(p.v1-p.v0)); g.clip();   // mảnh giáp đang được mang tới
          g.drawImage(vc.src,vc.sx,vc.sy,vc.sw,vc.sh,-w/2,-H*(p.v1-p.v0)/2-H*p.v0,w,H); g.restore(); } }
      else arm(bx,by,bx,by+90,0);
      sparks(fx,fy,p.t,t,26); }
    // 😮‍💨 Catvader thở: đèn đỏ phòng nhịp theo hơi thở
    if(t>=T.helm+0.4){ const k=seg(t,T.helm+0.4,T.helm+1.2), ph=((t-T.breath)%2.15)/2.15; g.save(); g.globalCompositeOperation='lighter'; glow(CHX,bodyY-H*0.55,220,0.25*k+(t>=T.breath?0.12*Math.sin(Math.max(0,ph)*Math.PI):0),'255,40,40'); g.restore();
      fullFill('rgba(60,0,0,A)',0.18*k); }
    if(t<T.lab+0.5) fullFill('rgba(0,0,0,A)',1-seg(t,T.lab,T.lab+0.5));
  }
  // ───────────────────── 🎬 CẢNH 4 · DOANH TRẠI ─────────────────────
  let SOLDC=null;   // ảnh lính (ảnh chụp bị cắt ngang dưới) → mờ dần phần đáy cho hàng quân liền mạch
  function soldierImg(){ if(SOLDC) return SOLDC; const c=prep(IMG.soldier); if(!c) return null; const out=mk(c.sw,c.sh), x=out.getContext('2d'); x.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,0,0,c.sw,c.sh);
    x.globalCompositeOperation='destination-in'; const gr=x.createLinearGradient(0,0,0,c.sh); gr.addColorStop(0,'#000'); gr.addColorStop(0.72,'#000'); gr.addColorStop(1,'rgba(0,0,0,0)'); x.fillStyle=gr; x.fillRect(0,0,c.sw,c.sh);
    const gs=x.createLinearGradient(0,0,c.sw,0); gs.addColorStop(0,'rgba(0,0,0,0)'); gs.addColorStop(0.08,'#000'); gs.addColorStop(0.92,'#000'); gs.addColorStop(1,'rgba(0,0,0,0)'); x.fillStyle=gs; x.fillRect(0,0,c.sw,c.sh);
    return SOLDC={src:out,sx:0,sy:0,sw:c.sw,sh:c.sh}; }
  const SOLD=(()=>{ const out=[]; for(let r=0;r<3;r++) for(let c=0;c<4;c++) out.push({x:285+c*62+(r%2)*30, y:GY4-56+r*40, s:0.86+r*0.1, r, c}); return out; })();
  const VICTIM=5;   // hàng giữa
  function scene4(t){
    drawBG(BG4);
    const sc=soldierImg(), vc=prep(t>=T.hand?IMG.vaderHand:IMG.vader), VX=110, VY=GY4+30;
    const force=t>=T.hand?seg(t,T.hand,T.hand+0.4)*(1-seg(t,T.drop,T.drop+0.6)*0.6):0, hx=VX+70, hy=VY-MU*1.0;
    const vt=SOLD[VICTIM], pull=eio(seg(t,T.pull,T.choke-0.15)), dropU=Math.max(0,t-T.drop);
    let vx=lerp(vt.x,250,pull), vy=lerp(vt.y,GY4-190,pull), vr=0;
    if(t>=T.choke && t<T.drop){ vx+=Math.sin(t*40)*2.4; vy+=Math.sin(t*23)*1.5; vr=Math.sin(t*17)*0.12; }
    if(t>=T.drop){ vy=Math.min(GY4+6,GY4-190+0.5*1600*dropU*dropU); vr=Math.min(1.45,dropU*4); }
    const fear=seg(t,T.pull,T.pull+0.6);
    SOLD.slice().sort((a,b)=>a.y-b.y).forEach((s,i)=>{ if(SOLD.indexOf(s)===VICTIM) return; const sh=fear*(Math.sin(t*30+i)*1.2);
      actor(sc,s.x+sh+fear*12,s.y,MU*1.1*s.s,{flip:true,rot:fear*0.1}); });
    if(sc){ if(force>0 && t>=T.pull){ g.save(); g.globalCompositeOperation='lighter'; glow(vx,vy-MU*0.4,70,0.35*force,'255,40,40'); g.restore(); }
      actor(sc,vx,vy,MU*1.1,{flip:true,rot:vr}); }
    if(force>0){ g.save(); g.globalCompositeOperation='lighter'; glow(hx,hy,80,0.55*force,'255,40,40');
      for(let k=0;k<3;k++){ const ph=((t*1.4+k/3)%1); g.strokeStyle=`rgba(255,70,70,${0.4*(1-ph)*force})`; g.lineWidth=2; g.beginPath(); g.arc(hx,hy,10+100*ph,0,Math.PI*2); g.stroke(); } g.restore(); }
    actor(vc,VX,VY,MU*1.45,{});
    fog(t,GY4+10,0.12,'120,20,30');
    if(t>=T.title){ const k=seg(t,T.title,T.title+0.3)*(0.75+0.25*Math.sin(t*3)); g.save(); g.globalCompositeOperation='lighter'; glow(VX,VY-MU*0.8,240,0.35*k,'255,30,30'); g.restore(); }
    if(t<T.army+0.15) fullFill('rgba(255,255,255,A)',0.6*(1-seg(t,T.army,T.army+0.15)));
  }

  // ───────────────────── 🖼️ VẼ 1 KHUNG ─────────────────────
  function frame(now){ if(OFF) return; raf=requestAnimationFrame(frame); if(!ready) return; renderAt(paused?pauseT:(now-t0)/1000); }
  function renderAt(t){
    if(OFF) markOnly=true;
    for(let i=0;i<SFX_PLAN.length;i++){ const s=SFX_PLAN[i]; if(t>=s[0] && t<DUR) sfx('s'+i,s[1],s[2],s[3]||null); }
    const [cx,cy,z]=cam(t);
    w2.setTransform(1,0,0,1,0,0); w2.fillStyle='#000'; w2.fillRect(0,0,W2.width,W2.height);
    w2.setTransform(SC*z,0,0,SC*z,SC*(VW/2-cx*z),SC*(VH/2-cy*z)); g=w2;
    if(t<T.s2) scene1(t); else if(t<T.lab) scene2(t); else if(t<T.army) scene3(t); else scene4(t);
    g=cv.getContext('2d'); g.setTransform(1,0,0,1,0,0); g.drawImage(W2,0,0); g.setTransform(SC,0,0,SC,0,0);
    { const vg=g.createRadialGradient(VW/2,VH/2,VH*0.25,VW/2,VH/2,VH*0.75); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(0,0,0,0.55)'); g.fillStyle=vg; g.fillRect(0,0,VW,VH); }
    dialog(t); title(t);
    if(t<0.6){ g.fillStyle=`rgba(0,0,0,${1-t/0.6})`; g.fillRect(0,0,VW,VH); }
    if(t>=T.fade1 && t<T.s2+0.5){ g.fillStyle=`rgba(0,0,0,${t<T.s2?seg(t,T.fade1,T.s2):1-seg(t,T.s2,T.s2+0.5)})`; g.fillRect(0,0,VW,VH); }
    if(t>T.fade){ g.fillStyle=`rgba(0,0,0,${seg(t,T.fade,DUR)})`; g.fillRect(0,0,VW,VH); }
    markOnly=false;
    if(panel) panel.update();
  }
  function build(){ for(const k in IMG) prep(IMG[k]); BG1=paintVolcano(); BG2=paintShore(); BG3=paintLab(); BG4=paintHall(); BURN=buildBurn(); try{ if(typeof _saDemonBuild==='function') _saDemonBuild(); }catch(e){} }
  const curT=()=>paused?pauseT:(performance.now()-t0)/1000;
  function seek(sec){ sec=clamp(sec,0,DUR); try{ stopAllLongSfx(); }catch(e){} played={}; markOnly=true; if(paused) pauseT=sec; else t0=performance.now()-sec*1000; }
  function toggle(){ if(paused){ if(pauseT>=DUR-0.05) pauseT=0; t0=performance.now()-pauseT*1000; paused=false; } else { pauseT=curT(); paused=true; } }
  function stop(){ if(raf) cancelAnimationFrame(raf); raf=null; try{ stopAllLongSfx(); }catch(e){} if(window._cinePanelRemove) _cinePanelRemove(); panel=null; if(overlay) overlay.remove(); overlay=null; }
  window._cineL2E3=function(opts){
    if(overlay) return;
    const SCALE=(opts&&opts.scale)||1;
    overlay=document.createElement('div');
    overlay.style.cssText='position:fixed;inset:0;z-index:99999;background:#000;display:flex;align-items:center;justify-content:center;';
    cv=document.createElement('canvas'); cv.width=Math.round(1080*SCALE); cv.height=Math.round(1920*SCALE); SC=cv.width/VW;
    cv.style.cssText='height:100vh;max-width:100vw;aspect-ratio:9/16;object-fit:contain;';
    W2=mk(cv.width,cv.height); w2=W2.getContext('2d');
    overlay.appendChild(cv); document.body.appendChild(overlay);
    { const x=cv.getContext('2d'); x.fillStyle='#000'; x.fillRect(0,0,cv.width,cv.height); x.fillStyle='rgba(255,255,255,0.5)'; x.font='40px system-ui'; x.textAlign='center'; x.fillText('Loading…',cv.width/2,cv.height/2); }
    if(opts&&opts.offline) OFF={};
    if(window._cinePanelMake && !OFF) panel=_cinePanelMake(overlay,{ title:'Meme Lore 2 · Ep 3 · The High Ground', dur:()=>DUR, t:()=>ready?Math.min(curT(),DUR):0, playing:()=>ready && !paused && curT()<DUR,
      toggle:()=>{ if(!ready) return; if(!paused && curT()>=DUR) seek(0); else toggle(); }, seek:s=>{ if(ready) seek(s); }, replay:()=>{ if(!ready) return; paused=false; seek(0); markOnly=false; }, close:()=>{ stop(); if(window.openCinema) openCinema('__lore2'); } });
    try{ stopAllBattleMusic(); }catch(e){}
    const all=[...Object.values(IMG),SA_DEMON_INK,SA_DEMON_GLOW];
    Promise.all([...all.map(im=>im.decode?im.decode().catch(()=>{}):Promise.resolve()), document.fonts?document.fonts.load('18px "Press Start 2P"').catch(()=>{}):Promise.resolve()]).then(()=>{ if(!overlay) return;
      if(!ready){ build(); ready=true; } paused=false; played={}; t0=performance.now(); });
    paused=false; played={}; t0=performance.now(); if(!OFF) raf=requestAnimationFrame(frame);
  };
  window._cineL2E3Ready=()=>ready;
  window._cineL2E3Step=R=>{ if(OFF && ready) renderAt(R); };
  window._cineL2E3Info=()=>({dur:DUR, sfx:SFX_PLAN.map(([a,k,v,d])=>[a,k,v,d]), mus:[]});
  window._cineL2E3Stop=stop;
  window._cineL2E3Canvas=()=>cv;
})();
