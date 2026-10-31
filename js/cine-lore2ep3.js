// ===================== 🎬 MEME LORE 2 · TẬP 3 — "THE HIGH GROUND" =====================
// Cảnh 1 · núi lửa: Supreme Cat đứng trên mỏm đá CAO dùng trọng lực (hiệu ứng gốc trong game: hào quang tím đen, vệt áp lực,
//   mặt quỷ) ép Grumpy Cat dí xuống mỏm đá thấp. Hộp thoại chữ pixel kiểu game cũ: "GIVE UP, GRUMPY." / "I HAVE THE HIGH GROUND."
//   Grumpy vẫn cố nhặt viên đá ném trúng mặt Supreme → Supreme nổi giận (mặt quỷ hiện ra), áp lực dí mạnh tới mức mỏm đá vỡ
//   thành từng tảng, Grumpy rơi xuống dung nham.
// 📼 Từ 30/10 chia 2 TẬP (PARTS2): TẬP 3 = đánh nhau ("MASTER... WHY?!") → rơi dung nham → cổng KAMUI xoắn không gian → 5 thành viên Akatsuki
//   (bóng đen, không lộ mặt) → mắt Pain loé "Shinra Tensei" → dung nham tách đôi → Grumpy cháy nửa người → bàn tay cử động. TẬP 4 = từ cảnh 2 trở đi.
// Cảnh 2 · bờ dung nham (đầu tập 4): Grumpy cháy nửa người nằm thoi thóp, 2 lính mèo nhấc lên CÁNG khiêng đi.
// Cảnh 3 · phòng thí nghiệm: đưa vào BUỒNG KÍNH kiểu Captain America (Vita-Ray), truyền thuốc qua ống dẫn, buồng sáng dịu (KHÔNG loé),
//   hơi nước tan → buồng mở, tay máy lắp mảng giáp chân → ngực (Grumpy cháy vẫn ở trong) → LOÉ SÁNG → CATVADER, thở phì phò.
// Cảnh 4 · doanh trại: Catvader giơ tay thử thần lực, lôi 1 lính mèo (German Cat) ra khỏi hàng quân, bóp cổ trên không → thả rơi. Kết.
// Khung dọc 1080×1920 như tập 1 + 2. Nền mỗi cảnh vẽ SẴN 1 lần, phần động vẽ mỗi khung. Không vẽ vết nứt (tảng đá rời ra nguyên khối).
(function(){
  if(window._cineL2E3) return;
  const VW=540, VH=960, FL=8.4, KM=15.5;   // KM: đoạn KAMUI cuối tập 3 (cổng xoáy → Akatsuki hiện ra → dung nham tách đôi)   // FL: đoạn ĐÁNH NHAU thêm ở đầu (anh yêu cầu 30/10) — mọi mốc cũ dời sau FL giây
  const T={ press:1.2, line1:2.9, line2:5.1, boxOff:7.3, grab:7.5, throw:8.1, hit:8.8, rage:9.4, crush:11.3, fall:11.6, splash:12.2, fade1:12.7, s2:13.6,
            pain:14.4, carry0:14.9, lift:15.7, onStr:16.7, carry:17.3, fade2:18.6, lab:19.2, door:19.6, doorShut:20.1, serum:20.6, ray:21.6, peak:23.6, cool:24.2, open:24.7,
            leg:25.9, body:27.1, helm:28.3, breath:29.3, army:31.6, hand:32.4, pull:33.0, choke:34.0, drop:36.6,
            painOut:37.3, rin:38.5, pl1:39.0, pl2:41.0, fist:43.2, pBoxOff:43.7, cave:44.2, beams:45.0, join:46.2, sealBreak:47.4, cageBurst:47.75, eyes:48.2, dash:48.9, stEyes:49.6, shake:49.9, real:50.7, grow:51.4, out:52.8, rise:53.0, free:55.0, roar:55.3, hands:55.6, title:58.8, fade:61.6, end:62.4 };
  for(const k in T) T[k]+=FL;
  // ⏸️ ĐOẠN LẶNG (anh dặn 30/10: phim đang dồn dập, nhịp nối nhịp liền tù tì) — HOLD = nghỉ thêm sau 1 nhịp · GAP = khoảng ĐEN yên lặng giữa 2 cảnh (cảnh trước mờ dần → đen → cảnh sau hiện dần)
  const HOLD=(k,sec)=>{ const v=T[k]; for(const j in T) if(T[j]>v) T[j]+=sec; }, GAPS=[];
  const GAP=(k,sec)=>{ const v=T[k]; for(const j in T) if(T[j]>=v) T[j]+=sec; GAPS.push([k,sec]); };
  HOLD('boxOff',0.8);   // Supreme nói xong → lặng 1 nhịp rồi Grumpy mới nhặt đá
  HOLD('hit',0.6);      // đá trúng mặt → khựng lại, im lặng → rồi mới nổi giận
  HOLD('rage',1.5);     // nổi giận: CẬN MẶT Supreme kiểu màn thắng trong game (tối om, chỉ mặt sáng, 1 tia sét sau lưng) rồi mới ra toàn cảnh ép vỡ đá
  // 🌀 KAMUI (cuối TẬP 3): chèn KM giây ngay sau khi Grumpy chìm (chỗ cảnh 1 từng mờ dần) → mọi mốc từ đó dời sau KM
  const K0=T.fade1; for(const k in T) if(T[k]>=K0) T[k]+=KM;
  // Grumpy chìm → Supreme đứng nhìn xuống, aura tắt dần → quay lưng bước vào bóng tối ("HE LEFT YOU TO BURN") → mỏm đá trống, dung nham lặng → lúc đó Kamui mới xoắn
  const K={ calm:K0, turn:K0+1.7, gone:K0+3.6, open:K0+5.0, peak:K0+6.0, members:K0+6.8, eye:K0+8.6, warp:K0+9.6, arrive:K0+10.7, reveal:K0+11.9, zoom:K0+12.7, eyes:K0+13.9 };   // Sharingan của Ninja Cat → Kamui hút Grumpy → nhả lên bậc đá → zoom sát mặt: MỞ MẮT   // eye→split = đúng câu "Shinra Tensei" của Pain (tiếng nổ lực đẩy rơi vào lúc dung nham tách)
  const PX=440, PY=640;   // tâm cổng xoáy (trên mặt dung nham)
  const PAINY=750;   // Pain lơ lửng ngay trên chỗ Grumpy chìm
  // 📼 chia 2 TẬP (anh dặn 30/10): tập 3 = đánh nhau → rơi dung nham → Akatsuki tới (hết khi tay Grumpy cử động) · tập 4 = lính khiêng cáng → phòng thí nghiệm → … → Friend
  HOLD('pain',0.7);     // mở tập 4: Grumpy nằm 1 mình 1 lúc rồi lính mới tới
  GAP('lab',0.7); GAP('army',1.0); HOLD('drop',0.7); HOLD('pBoxOff',0.5); GAP('cave',1.0); HOLD('cave',0.7); HOLD('beams',1.6); HOLD('join',2.4);   /* beams → CHIA ĐÔI MÀN Catvader | Evil Gary bước vào → join */   /* join → CẬN CẢNH 2 Friend bị rút (CU) → mới về toàn cảnh vỡ tan */ HOLD('stEyes',0.4); HOLD('roar',0.8);
  const CU0=T.join+1.0, CU1=T.join+3.0;   // 🔍 cận cảnh 1 con Friend to cả màn: lao đâm "nhoi nhoi" vào lồng khi đang bị hút
  const SJ0=T.join-1.75, SJ1=T.join-0.35;   // ✂️ màn chia đôi: nửa Catvader · nửa Evil Gary (anh dặn 30/10)
  const DUR=T.end;
  const PARTS2={ 1:{a:0, b:T.s2, title:'Meme Lore 2 · Ep 3 · The High Ground'}, 2:{a:T.carry0-1.5, b:DUR, title:'Meme Lore 2 · Ep 4 · Rise of Catvader'} };
  // ⚔️ ĐÁNH NHAU (0 → FL) — kịch bản anh dặn 30/10: 2 bên đứng CÙNG mặt đá bằng phẳng · Grumpy lướt cực nhanh đánh từ mọi phía nhưng TRƯỜNG LỰC chặn hết
  //    → đứng thở dốc: "MASTER... WHY DIDN'T YOU TEACH ME HAKI?!" → lặng 1 nhịp → lao đòn tiếp → aura Supreme bùng lên HẤT VĂNG Grumpy xuống mỏm đá thấp → rồi Supreme mới nói
  const TF={ a1:1.0, a2:1.55, a3:2.1, a4:2.65, a5:3.2, rest:3.9, say:4.5, sayOff:6.7, leap:7.4, hit:7.85, blast:8.0, land:8.55, kneel:9.0 };
  const PRESS0=TF.kneel;   // từ lúc quỳ rạp là bị đè liên tục (trước đây bắt đầu ở T.press)
  const LINES=[{t:TF.say,txt:"MASTER... WHY DIDN'T YOU TEACH ME HAKI?!"},{t:T.line1,txt:'GIVE UP, GRUMPY.'},{t:T.line2,txt:'I HAVE THE HIGH GROUND.'},{t:T.pl1,txt:'HE LEFT YOU TO BURN.'},{t:T.pl2,txt:'JOIN US... AND HE WILL KNOW PAIN.'}], CPS=30;   // chữ / giây (anh bảo chạy nhanh hơn: 18 → 30)
  const BOXES=[{t0:TF.say,t1:TF.sayOff,L:[0,0],who:'GRUMPY CAT',im:'grumpy',col:'#9fd3ff',bd:'#3a8bff',bg:['#0a2a4a','#020812'],face:[0.5,0.42],fz:0.62},
               {t0:T.line1,t1:T.boxOff,L:[1,2],who:'SUPREME CAT',im:'sup',col:'#c48cff',bd:'#8a5cff',bg:['#3a0a6a','#12021f'],face:[0.647,0.146],fz:0.38},
               {t0:T.pl1,t1:T.pBoxOff,L:[3,4],who:'DEPRESSED CAT',im:'pain',col:'#ff8a5a',bd:'#ff3a2a',bg:['#4a0a0a','#120202'],face:null,fz:0.42}];   // 2 lượt hội thoại: Supreme · Pain
  const A=p=>{ const im=new Image(); im.src=p; return im; };
  const IMG={ grumpy:A('assets/avatars/grumpycat/avatarUrl.webp'), grumpyAtk:A('assets/avatars/grumpycat/attackAvatarUrl.webp'), sup:A('assets/avatars/supremearbiter/avatarUrl.webp'),
    vader:A('assets/avatars/catvader/avatarUrl.webp'), vaderHand:A('assets/avatars/catvader/skill2AvatarUrl.webp'), pain:A('assets/img/depressedcat/DP_PAIN_IMG.webp'),
    grumpyShut:A('assets/img/grumpycat/GRUMPY_EYES_CLOSED.webp'), soldier:A('assets/avatars/germancat/skill1AvatarUrl.webp'), stone:A('assets/img/poordog/PD_TH_STONE.webp'), egary:A('assets/avatars/evilgary/avatarUrl.webp') };
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
  const DS=3.3;   // 👹 mặt quỷ trong phim to gấp 3.3 lần trong game (anh dặn 30/10: nhân vật mạnh phải hoành tráng)
  function saDemon(cx,fy,L,P,eyesK,t){ if(P<=0.001) return;
    const top=fy-L.dh*0.85, Dw=L.dh*2.15*1.1*DS, Dh=L.dh*2.15*DS*(SA_DEMON_INK.naturalHeight||1106)/(SA_DEMON_INK.naturalWidth||928), x0=cx-Dw/2, y0=fy-L.dh*0.95-Dh;
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
  const LAVA=900, LO=690, HI=LO-72, SUPX=208, GRX=430;   // Supreme đứng ngay cạnh, chỉ cao hơn Grumpy 1 BẬC ĐÁ (anh sửa 30/10)
  const FC=[SUPX,HI-48], FR=92, G0=[30,HI];   // tâm + bán kính trường lực · chỗ Grumpy đứng (chân) bên trái Supreme
  const ATK=[[TF.a1,Math.PI],[TF.a2,-Math.PI/2],[TF.a3,0],[TF.a4,-2.35],[TF.a5,-0.8]], ATKF=-0.6;   // 5 đòn: trái · trên đầu · phải · chéo trái · chéo phải · đòn cuối chéo phải
  const cpt=(a,d)=>[FC[0]+Math.cos(a)*(FR+d), FC[1]+Math.sin(a)*(FR+d)];   // tâm Grumpy cách trường lực d
  const MEMK=[[492,330],[SUPX+44,HI],[672,596],[-30,548]], FLOAT=0;   // Ninja Cat trên tảng đá lơ lửng phía sau · bậc đá của Supreme · 2 cột đá
  const SFACE=[SUPX+8,HI-90], SFR=17;   // tâm mặt Supreme (SA_FACE của game: 0.647 · 0.146 khung ảnh) · bán kính mặt
  const SRC=[GRX+20,LAVA-6], DST=[128,HI-36];   // chỗ Grumpy chìm · chỗ Kamui nhả Grumpy ra (bậc đá trống của Supreme)
  const FALLS=[[-190,120,22],[610,60,30],[760,250,18]];   // thác dung nham: x, đỉnh y, bề rộng (vẽ động)
  const PILLARS=[[-30,548,92],[672,596,84]];   // x · đỉnh · rộng
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
    // 🗿 2 cột đá bazan nhô khỏi dung nham (chỗ thành viên Akatsuki đứng lúc xuất hiện)
    for(const [x,top,w] of PILLARS){ const Pp=[[x-w*0.5,top+6],[x-w*0.2,top-2],[x+w*0.25,top],[x+w*0.5,top+8],[x+w*0.62,LAVA+10],[x-w*0.66,LAVA+10]]; rockPoly(Pp,'#120808','#2a1814','#8a2e10',x|0);
      g.save(); path(Pp); g.clip(); const gp=g.createLinearGradient(0,LAVA-200,0,LAVA); gp.addColorStop(0,'rgba(255,90,20,0)'); gp.addColorStop(1,'rgba(255,120,30,0.55)'); g.fillStyle=gp; g.fillRect(x-w,LAVA-210,w*2,220); g.restore(); }
    // 🪨 bậc đá của Supreme: khối đá liền kề, mặt trên cao hơn mỏm của Grumpy đúng 1 bậc
    const P=[[-170,HI+16],[-130,HI-2],[-60,HI+1],[10,HI-2],[84,HI-3],[140,HI-1],[200,HI+1],[254,HI-2],[300,HI+5],[314,HI+34],[306,LO+48],[322,LO+140],[344,LAVA+10],[-200,LAVA+10]];   // mặt đá BẰNG rộng (2 bên đánh nhau trên đó trước)
    rockPoly(P,'#140909','#2f1b18','#9a3412',7);
    g.save(); path(P); g.clip(); gr=g.createLinearGradient(0,LAVA-260,0,LAVA); gr.addColorStop(0,'rgba(255,90,20,0)'); gr.addColorStop(1,'rgba(255,120,30,0.6)'); g.fillStyle=gr; g.fillRect(-220,LAVA-280,580,290); g.restore();
    g.strokeStyle='rgba(255,180,130,0.35)'; g.lineWidth=2; g.beginPath(); g.moveTo(-130,HI-2); [[-60,HI+1],[10,HI-2],[84,HI-3],[140,HI-1],[200,HI+1],[254,HI-2],[300,HI+5]].forEach(p=>g.lineTo(p[0],p[1])); g.stroke();   // viền sáng mép trên
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
  // 📳 biên độ rung: đè áp lực → rung NHẸ · trúng đá vào mặt Supreme → rung MẠNH dần tới lúc vỡ
  function quake(t){ if(t<T.press || t>=T.crush) return 0; if(t<T.hit) return 0.9*seg(t,T.press,T.press+0.6); return 3+11*eio(seg(t,T.hit,T.crush)); }
  const qx=(t,ph)=>Math.sin(t*61+ph)*quake(t)+Math.sin(t*97+ph*2)*quake(t)*0.4, qy=(t,ph)=>Math.sin(t*53+ph)*quake(t)*0.35;
  function drawLedge(t){
    if(t<T.crush){ const Q=quake(t), blur=t>=T.hit?seg(t,T.hit,T.hit+0.6):0;
      const one=(dx,dy,a)=>{ g.save(); g.globalAlpha=a; g.translate(dx,dy); rockPoly(LEDGE.outline,'#1a0d0c','#38221d','#a0360f',11); g.strokeStyle='rgba(255,180,130,0.3)'; g.lineWidth=1.6; g.beginPath(); LEDGE.outline.slice(0,7).forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); g.restore(); };
      if(blur>0){ one(qx(t,1.7)+Q*1.3,qy(t,0.4),0.38*blur); one(qx(t,3.1)-Q*1.3,qy(t,2.2),0.38*blur); }   // rung NHOÈ: bóng mờ 2 bên
      one(qx(t,0),qy(t,0),1); return; }
    for(const c of LEDGE.ch){ const p=chunkPose(c,t); if(c.cy+p.dy>LAVA+80) continue;
      g.save(); g.translate(c.cx+p.dx,c.cy+p.dy); g.rotate(p.r); g.translate(-c.cx,-c.cy); rockPoly(c.P,'#1a0d0c','#38221d','#a0360f'); g.restore(); } }
  function drawFalls(t){ g.save(); for(const [x,y0,w] of FALLS){ const gr=g.createLinearGradient(0,y0,0,LAVA); gr.addColorStop(0,'#ffd36a'); gr.addColorStop(0.3,'#ff7a1c'); gr.addColorStop(1,'#b5300a');
      g.fillStyle=gr; g.beginPath(); g.moveTo(x-w*0.4,y0); g.quadraticCurveTo(x-w*0.6,(y0+LAVA)/2,x-w*0.8,LAVA); g.lineTo(x+w*0.8,LAVA); g.quadraticCurveTo(x+w*0.6,(y0+LAVA)/2,x+w*0.4,y0); g.closePath(); g.fill();
      g.globalCompositeOperation='lighter'; for(let i=0;i<6;i++){ const ph=(t*0.9+i/6)%1, yy=y0+ph*(LAVA-y0); g.fillStyle=`rgba(255,240,170,${0.35*Math.sin(ph*Math.PI)})`; g.fillRect(x-w*0.3+(hash(i+x)-0.5)*w*0.4,yy,w*0.25,18); }
      glow(x,LAVA,w*4,0.35,'255,120,30'); g.globalCompositeOperation='source-over'; } g.restore(); }
  function drawLava(t){ const x0=-320, x1=860;
    let gr=g.createLinearGradient(0,LAVA-6,0,LAVA+260); gr.addColorStop(0,'#ffd76a'); gr.addColorStop(0.06,'#ff8a1c'); gr.addColorStop(0.4,'#c8320a'); gr.addColorStop(1,'#3a0904'); g.fillStyle=gr; g.fillRect(x0,LAVA,x1-x0,900);
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
  let BURN=null, BURN_SHUT=null;   // Grumpy cháy nửa người (vẽ sẵn)
  function buildBurn(im){ const c=prep(im||IMG.grumpy); if(!c) return null; const w=c.sw, h=c.sh, out=mk(w,h), x=out.getContext('2d');
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
  const CAMK=[[0,SUPX-40,HI-70,1.15],[TF.a1-0.2,SUPX-50,HI-80,1.3],[TF.a2,SUPX,HI-110,1.2],[TF.a3,SUPX+30,HI-80,1.25],[TF.a5,SUPX+10,HI-90,1.2],[TF.rest,SUPX-60,HI-60,1.35],[TF.say,G0[0]+10,HI-55,1.95],[TF.sayOff,G0[0]+10,HI-55,2.05],[TF.leap-0.2,SUPX+20,HI-70,1.1],[TF.blast,SUPX+80,HI-80,1.2],[TF.land,(SUPX+GRX)/2+40,LO-60,1.1],[TF.kneel,GRX,LO-40,1.45],[T.press-0.5,320,560,0.98],[T.press,318,575,1.05],[T.line1-0.25,260,560,1.4],[T.line1+0.4,SUPX+30,HI-18,1.85],[T.boxOff,SUPX+30,HI-18,1.9],[T.grab,GRX-10,LO-40,2.05],[T.throw,GRX-10,LO-40,2.1],[T.throw+0.25,(SUPX+GRX)/2,(HI+LO)/2-50,1.7],[T.hit,SUPX+35,HI-42,2.1],[T.rage-0.001,SUPX+30,HI-50,2.2],[T.rage,SFACE[0],SFACE[1],4.6],[T.rage+1.45,SFACE[0],SFACE[1],5.3],[T.rage+1.451,SUPX+40,260,0.66],[T.rage+2.2,SUPX+50,250,0.64],
    [T.crush-0.3,(SUPX+GRX)/2+10,270,0.64],[T.crush+0.15,410,650,1.3],[T.splash-0.15,430,800,1.3],[T.splash+0.3,430,850,1.4],[K.calm,420,820,1.25],[K.calm+0.9,SUPX+70,HI-50,1.4],[K.turn,SUPX+60,HI-50,1.45],[K.turn+0.9,SUPX-10,HI-50,1.3],[K.gone,300,720,0.95],[K.open-0.2,PX-20,PY+60,0.98],[K.open,PX,PY+40,1.0],[K.peak,PX,PY+20,0.9],[K.members,320,590,0.7],[K.eye-0.4,320,600,0.72],[K.eye+0.2,MEMK[0][0],MEMK[0][1]-60,1.7],[K.warp-0.2,MEMK[0][0]-10,MEMK[0][1]-55,1.75],[K.warp+0.3,SRC[0]-30,SRC[1]-80,1.05],[K.arrive-0.3,(SRC[0]+DST[0])/2,(SRC[1]+DST[1])/2-60,0.9],[K.arrive+0.3,DST[0]+10,DST[1]-20,1.35],[K.reveal,DST[0],DST[1]-10,1.5],[K.zoom,DST[0]-8,DST[1],3.0],[K.eyes,DST[0]-8,DST[1],4.6],[T.s2-0.001,DST[0]-8,DST[1],4.9],
    [T.s2,330,690,1.7],[T.pain,345,680,1.45],[T.lift,330,660,1.45],[T.carry,300,660,1.4],[T.lab-0.001,180,660,1.35],
    [T.lab,270,560,1.0],[T.doorShut,270,580,1.25],[T.serum,270,560,1.35],[T.ray,270,560,1.2],[T.peak,270,560,1.5],[T.open,270,580,1.6],[T.leg,265,620,1.9],[T.body,265,580,1.9],[T.helm,268,540,2.0],[T.breath,270,530,2.3],[T.army-0.001,270,500,2.8],
    [T.army,300,660,1.3],[T.hand,270,660,1.35],[T.pull,255,630,1.35],[T.choke,215,600,1.75],[T.drop,205,620,1.55],[T.painOut,250,650,1.15],[T.rin,300,700,1.3],[T.pl1-0.3,250,725,1.06],[T.fist,245,725,1.08],[T.cave-0.001,245,725,1.12],
    [T.cave,270,380,0.46],[T.beams,270,420,0.5],[T.join,270,520,0.47],[T.sealBreak-0.3,270,360,0.55],[T.sealBreak+0.2,270,340,0.6],[T.eyes,270,260,0.66],[T.dash,270,170,0.62],[T.stEyes,270,120,0.62],[T.real,270,180,0.6],[T.grow,270,260,0.5],[T.out-0.001,270,330,0.42],
    [T.out,270,620,0.3],[T.rise,270,600,0.3],[T.free,270,560,0.28],[T.roar,270,470,0.33],[T.hands,270,520,0.27],[DUR,270,500,0.26]];   // lùi xa: núi bé xíu cạnh Friend → thấy độ khổng lồ, không chiếm kín khung
  for(let i=1;i<CAMK.length;i++) if(CAMK[i][0]<CAMK[i-1][0]) console.error('🎥 CAMK lệch thứ tự ở mốc',i,CAMK[i][0].toFixed(2),'<',CAMK[i-1][0].toFixed(2));   // mốc máy phải tăng dần
  function cam(t){ let r=CAMK[CAMK.length-1].slice(1);
    for(let i=1;i<CAMK.length;i++) if(t<CAMK[i][0]){ const a=CAMK[i-1], b=CAMK[i], e=eio(seg(t,a[0],b[0])); r=[lerp(a[1],b[1],e),lerp(a[2],b[2],e),Math.exp(lerp(Math.log(a[3]),Math.log(b[3]),e))]; break; }
    let sh=0; for(const [ts] of ATK) if(t>=ts && t<ts+0.25) sh+=6*(1-(t-ts)/0.25); for(const ts of [TF.blast,TF.land]) if(t>=ts && t<ts+0.45) sh+=12*(1-(t-ts)/0.45);
    if(t>=T.crush && t<T.splash+0.6) sh+=9*Math.exp(-(t-T.crush)*1.2)+(t>=T.splash?10*Math.exp(-(t-T.splash)*5):0);
    if(t>=T.rage && t<T.crush) sh+=2.5*seg(t,T.rage,T.crush); if(t>=T.hit && t<T.hit+0.25) sh+=6*(1-(t-T.hit)/0.25);
    if(t>=T.ray && t<T.peak+0.3) sh+=3*seg(t,T.ray,T.peak); if(t>=T.drop+0.35 && t<T.drop+0.6) sh+=5;
    if(t>=T.sealBreak && t<T.sealBreak+0.5) sh+=12*(1-(t-T.sealBreak)/0.5); if(t>=T.shake && t<T.out) sh+=4+10*seg(t,T.shake,T.out); if(t>=T.out && t<T.free) sh+=14*Math.exp(-(t-T.out)*0.9); if(t>=T.roar && t<T.roar+1.6) sh+=18*Math.exp(-(t-T.roar)*1.6);
    if(sh>0.2){ r[0]+=(hash(Math.floor(t*60))-0.5)*sh/r[2]; r[1]+=(hash(Math.floor(t*60)+7)-0.5)*sh/r[2]; }
    return r; }

  // ───────────────────── 🔊 LỊCH TIẾNG (1 nhịp 1 tiếng) ─────────────────────
  const SFX_PLAN=[[0.3,'ep3_lava',0.7,0],...ATK.map(([ta])=>[ta,'hit_heavy',0.85,0]),[TF.leap,'ep3_whoosh',0.9,0],[TF.blast,'cine_haki_hit',1.0,0],[TF.land,'cine_heavy_slow',1.0,0],   /* ⚔️ lướt · 5 đòn dội vào trường lực · lao đòn cuối · aura hất văng · rơi xuống mỏm thấp */
    [T.press,'sa_phase1',0.75,T.rage-T.press],[T.hit,'bonk',1.0,0],[T.rage-0.25,'sa_phase1',1.0,T.splash+0.55-T.rage],[T.rage+0.33,'thunder_big',0.9,0],[T.rage+1.6,'sa_menacing',1.0,0],   /* 😼 giống GAME: aura áp lực = sa_phase1 (lớp 2 to hơn lúc nổi giận) · ゴゴゴ = sa_menacing · mặt quỷ không gầm */[T.crush,'ep3_rock',1.0,0],[T.splash-0.05,'ep3_whoosh',1.0,0],
    [K.open-0.1,'ep3_kamui',1.0,0],[K.eyes,'ep3_end_boom',1.0,0],   /* 💥 Grumpy mở mắt — hết tập */
    [K.members,'ep3_pain4',1.0,4],[K.eye,'nj_sharingan',1.0,0],[K.warp-0.3,'ep3_kamui',0.85,0],   /* 🌀 cổng Kamui · 4s nhạc Pain lúc Akatsuki hiện ra · 👁️ Sharingan (tiếng của chính Ninja Cat) · Kamui hút / nhả Grumpy */
    [T.doorShut,'ep3_klunk',1.0,0],[T.serum,'ep3_hydraulic',0.9,0],[T.ray,'ultimate_charge_2',0.9,0],[T.cool,'gas_leak',0.8,1.6],
    [T.leg-0.55,'ep3_ratchet',0.8,0],[T.leg,'ep3_klunk',1.0,0],[T.body-0.55,'ep3_ratchet',0.8,0],[T.body,'ep3_klunk',1.0,0],[T.helm,'ep3_shine',1.0,0],[T.helm+0.15,'flyingcat_theme',0.8,T.cave-T.helm-0.4],
    [T.breath,'ep3_breath',1.0,0],[T.hand,'ep3_force',1.0,0],[T.choke,'ep3_choke',0.9,0],[T.drop+0.35,'cine_drop',1.0,0],
    [T.painOut+0.35,'ep3_dark',0.8,0],[T.fist+0.15,'ep3_glass',0.8,0],[T.beams,'ep3_charge',1.0,0],[SJ0,'ep3_breath',0.9,0],[T.join,'eg_necro',1.0,0],[CU0+0.05,'fr_dash',1.0,0],[CU0+0.5,'fr_dash',1.0,0],[CU0+0.95,'fr_dash',1.0,0],[CU0+1.4,'fr_dash',1.0,0],   /* 🐈‍⬛ tiếng "nhoi nhoi" lướt đâm của Friend trong game — mỗi cú húc lồng 1 tiếng (trùng RAMS) */
    [T.sealBreak,'ep3_glass',1.0,0],[T.cageBurst+0.05,'death_break',1.0,0],[T.dash,'soul_steal',0.9,0],
    [T.shake,'ep3_quake',1.0,0],[T.real,'ep3_titan',1.0,0],[T.grow+0.6,'ep3_rock',0.9,0],[T.out+0.15,'ep3_explode',1.0,0],[T.roar,'fr_titan_roar',1.0,0]];   /* (bỏ tiêu đề cuối + tiếng nổ theo yêu cầu 30/10) */
  for(const L of LINES){ let n=0; for(let i=0;i<L.txt.length;i++){ if(L.txt[i]===' ') continue; if((n++)%2) continue; SFX_PLAN.push([L.t+0.25+i/CPS,'ep3_blip',0.7,0]); } }   // tiếng "píp" chữ pixel (cách 1 chữ kêu 1 lần)
  // ⏱️ GIỜ GHI TRONG LỊCH = lúc muốn NGHE THẤY trên hình. File nào có khoảng lặng đầu (đo bằng tools/sfx-audit.js) thì phát sớm lên đúng bấy nhiêu.
  const SND_ONSET={hit_heavy:0.15, cine_heavy_slow:0.26, cine_haki_hit:0.26,   /* tiếng va chạm: canh theo ĐỈNH */ sa_menacing:0.36, ep3_dark:0.22, ep3_breath:0.2, ep3_glass:0.36, ep3_charge:0.18, ep3_quake:0.14, ep3_titan:0.14, soul_steal:1.32, flyingcat_theme:0.56, fr_titan_roar:0.14};
  for(const e of SFX_PLAN) e[0]=Math.max(0,e[0]-(SND_ONSET[e[1]]||0));
  SFX_PLAN.sort((a,b)=>a[0]-b[0]);

  // ───────────────────── 💬 HỘP THOẠI CHỮ PIXEL (toạ độ màn hình) ─────────────────────
  function dialog(t){ const B=BOXES.find(b=>t>=b.t0 && t<=b.t1+0.25); if(!B) return; const a=Math.min(seg(t,B.t0,B.t0+0.2),1-seg(t,B.t1,B.t1+0.25)); if(a<=0) return;
    const L=t>=LINES[B.L[1]].t?LINES[B.L[1]]:LINES[B.L[0]], n=Math.floor(clamp((t-L.t-0.25)*CPS,0,L.txt.length)), txt=L.txt.slice(0,n);
    const bx=20, by=708, bw=VW-40, bh=190, pop=1+0.06*(1-eout(seg(t,B.t0,B.t0+0.2)));
    g.save(); g.globalAlpha=a; g.translate(VW/2,by+bh/2); g.scale(pop,pop); g.translate(-VW/2,-(by+bh/2)); g.imageSmoothingEnabled=false;
    g.fillStyle='rgba(0,0,0,0.92)'; g.fillRect(bx,by,bw,bh);
    g.fillStyle='#fff'; for(const [x,y,w,h] of [[bx,by,bw,5],[bx,by+bh-5,bw,5],[bx,by,5,bh],[bx+bw-5,by,5,bh]]) g.fillRect(x,y,w,h);   // viền pixel 2 lớp
    g.fillStyle=B.bd; for(const [x,y,w,h] of [[bx+10,by+10,bw-20,3],[bx+10,by+bh-13,bw-20,3],[bx+10,by+10,3,bh-20],[bx+bw-13,by+10,3,bh-20]]) g.fillRect(x,y,w,h);
    const pc=prep(IMG[B.im]), PX=bx+24, PY=by+26, PS=108;
    if(pc){ g.save(); g.beginPath(); g.rect(PX,PY,PS,PS); g.clip(); const bgp=g.createLinearGradient(0,PY,0,PY+PS); bgp.addColorStop(0,B.bg[0]); bgp.addColorStop(1,B.bg[1]); g.fillStyle=bgp; g.fillRect(PX,PY,PS,PS);
      const F=B.face||[(375-pc.sx)/pc.sw,(285-pc.sy)/pc.sh], fh=PS/B.fz, fw=fh*pc.sw/pc.sh, fx=F[0], fy=F[1]; g.imageSmoothingEnabled=true; g.drawImage(pc.src,pc.sx,pc.sy,pc.sw,pc.sh,PX+PS/2-fw*fx,PY+PS*0.48-fh*fy,fw,fh); g.restore();   // tâm mặt Supreme (SA_FACE trong game)
      g.fillStyle='#fff'; g.fillRect(PX-3,PY-3,PS+6,3); g.fillRect(PX-3,PY+PS,PS+6,3); g.fillRect(PX-3,PY,3,PS); g.fillRect(PX+PS,PY,3,PS); }
    g.textAlign='left'; g.textBaseline='top'; g.font='13px "Press Start 2P",monospace'; g.fillStyle=B.col; g.fillText(B.who,PX+PS+18,PY+2);
    g.font='18px "Press Start 2P",monospace'; g.fillStyle='#fff';
    const words=txt.split(' '); let line='', lines=[]; for(const w of words){ const test=line?line+' '+w:w; if(g.measureText(test).width>bw-PS-62){ lines.push(line); line=w; } else line=test; } lines.push(line);
    lines.forEach((ln,i)=>g.fillText(ln,PX+PS+18,PY+34+i*32));
    if(n>=L.txt.length && Math.floor(t*3)%2===0){ g.fillStyle='#fff'; const ax=bx+bw-34, ay=by+bh-38; g.fillRect(ax,ay,12,4); g.fillRect(ax+2,ay+4,8,4); g.fillRect(ax+4,ay+8,4,4); }
    g.restore(); }
  function title(t){ return;   /* anh bỏ tiêu đề cuối tập (30/10) */ if(t<T.title) return; const a=seg(t,T.title,T.title+0.35), s=1+0.25*(1-eout(seg(t,T.title,T.title+0.5)));
    g.save(); g.globalAlpha=a; g.textAlign='center'; g.textBaseline='middle';
    const gr=g.createLinearGradient(0,VH*0.1,0,VH*0.1+170); gr.addColorStop(0,'rgba(0,0,0,0)'); gr.addColorStop(0.3,'rgba(0,0,0,0.7)'); gr.addColorStop(0.7,'rgba(0,0,0,0.7)'); gr.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=gr; g.fillRect(0,VH*0.1,VW,170);
    g.translate(VW/2,VH*0.1+85); g.scale(s,s);
    g.font='14px "Press Start 2P",monospace'; g.fillStyle='#ff4040'; g.fillText('MEME LORE 2 · EP 3',0,-40);
    g.font='28px "Press Start 2P",monospace'; g.lineWidth=7; g.strokeStyle='#000'; g.strokeText('THE HIGH GROUND',0,8); g.fillStyle='#fff'; g.fillText('THE HIGH GROUND',0,8);
    g.fillStyle='#ff2a2a'; g.fillRect(-150,36,300,3);
    g.restore(); }

  // ⚔️ tư thế Grumpy trong đoạn đánh nhau (hàm theo thời gian → vẽ được bóng nhoè ở các khung trước)
  function grumpyFight(t){ let gx=GRX, gy=LO, rot=0, sy=1, sx=1, atk=false, sm=0, fl=false;
    if(t<PRESS0){ const tq=Math.floor(t*12)/12;   // giật 12 hình/giây như anime vẽ tay
      let c=[G0[0],G0[1]-MU*0.5], prev=c.slice();
      if(t<TF.a1-0.15){ fl=true; }
      else if(t<TF.rest){ for(let i=0;i<ATK.length;i++){ const [ta,a]=ATK[i], C=cpt(a,26), Bk=cpt(a,90), t0=ta-0.15, nxt=i+1<ATK.length?ATK[i+1][0]-0.15:TF.rest;
          if(t<t0) break;
          if(t<ta){ const u=eio(seg(tq,t0,ta)); c=[lerp(prev[0],C[0],u),lerp(prev[1],C[1],u)]; sm=1; atk=true; }   // ⚡ lướt vụt tới
          else if(t<ta+0.16){ c=[C[0]+Math.sin(t*90)*2.5,C[1]+Math.cos(t*77)*2]; atk=true; }   // ép vào trường lực
          else if(t<nxt){ const u=eout(seg(t,ta+0.16,ta+0.34)); c=[lerp(C[0],Bk[0],u),lerp(C[1],Bk[1],u)]; rot=(i%2?1:-1)*0.45*u; }   // bị bật ra
          else { prev=Bk; continue; }
          break; }
        if(t>=ATK[ATK.length-1][0]+0.34){ const Bk=cpt(ATK[ATK.length-1][1],90), u=eio(seg(t,ATK[ATK.length-1][0]+0.34,TF.rest)); c=[lerp(Bk[0],G0[0],u),lerp(Bk[1],G0[1]-MU*0.5,u)-Math.sin(u*Math.PI)*40]; rot=0; sm=1; }   // đáp về chỗ cũ
        fl=c[0]<FC[0]-4; }
      else if(t<TF.leap){ const br=Math.sin(t*7)*0.03; sy=1-0.04-br; sx=1+0.04+br; fl=true; }   // đứng thở dốc
      else if(t<TF.hit){ const C=cpt(ATKF,26), u=eio(seg(tq,TF.leap,TF.hit)); c=[lerp(G0[0],C[0],u),lerp(G0[1]-MU*0.5,C[1],u)-Math.sin(u*Math.PI)*120]; atk=true; sm=1; fl=c[0]<FC[0]; }   // lao đòn cuối
      else if(t<TF.blast){ const C=cpt(ATKF,26); c=[C[0]+Math.sin(t*90)*3,C[1]]; atk=true; }
      else if(t<TF.land){ const C=cpt(ATKF,26), u=seg(t,TF.blast,TF.land); c=[lerp(C[0],GRX,u),lerp(C[1],LO-MU*0.5,u*u)-Math.sin(u*Math.PI)*70]; rot=u*5.2; sm=1; }   // 💥 bị aura HẤT VĂNG xoay vòng xuống mỏm thấp
      if(t<TF.land){ gx=c[0]; gy=c[1]+MU*0.5; }
      else { const u=seg(t,TF.land,TF.kneel); gx=GRX; sy=lerp(0.62,0.8,eio(u)); sx=lerp(1.25,1.1,eio(u)); rot=0.2*(1-u); } }   // đập xuống, bẹp dí → quỳ rạp
    return {gx,gy,rot,sy,sx,atk,sm,fl}; }

  // ───────────────────── 🌀 KAMUI · cuối TẬP 3 ─────────────────────
  // Supreme bỏ đi → Kamui xoắn không gian → 5 thành viên Akatsuki hiện ra (bóng đen viền tím, mắt đỏ, KHÔNG lộ mặt)
  // → NINJA CAT đứng phía sau: Mangekyou Sharingan loé sau lưng, xoay vòng (đúng hiệu ứng trong game) → Kamui hút Grumpy khỏi dung nham
  // → Kamui thứ 2 nhả Grumpy (cháy nửa người) nằm trên bậc đá → zoom vào mặt: khẽ cử động
  const NJ_SHAR=A('assets/img/ninjacat/NJ_SHARINGAN.webp');
  let PAINS=null, AVS=null;
  // 🕶️ bóng thành viên ở cảnh Kamui cắt từ CHÍNH AVATAR (anh chê bóng áo choàng vuông vức 30/10): đen tuyền + viền tím, không lộ mặt · cỡ theo dáng từng meme · mắt (tỉ lệ khung ảnh)
  const AVM=[{h:1.0,eye:[[0.45,0.21],[0.60,0.21]]},{h:0.9,eye:[[0.30,0.37],[0.72,0.37]]},{h:1.15,eye:[[0.27,0.40],[0.44,0.38]]},{h:1.45,eye:[[0.43,0.11],[0.60,0.11]]}];   // Ninja · Mewing · Infinity Doge · Doorbell Chud
  function avSils(KIT){ if(AVS) return AVS; const ims=KIT.imgs().slice(4); AVS=ims.map(im=>{ const c=prep(im); if(!c) return null; const pad=8, o=mk(c.sw+pad*2,c.sh+pad*2), x=o.getContext('2d');
      x.filter='blur(4px)'; x.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,pad,pad,c.sw,c.sh); x.filter='none'; x.globalCompositeOperation='source-in'; x.fillStyle='rgba(150,70,230,0.9)'; x.fillRect(0,0,o.width,o.height);
      x.globalCompositeOperation='source-over'; const d=mk(c.sw,c.sh), y=d.getContext('2d'); y.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,0,0,c.sw,c.sh); y.globalCompositeOperation='source-in'; y.fillStyle='#07040c'; y.fillRect(0,0,c.sw,c.sh); x.drawImage(d,pad,pad);
      return {c:o, pad, sw:c.sw, sh:c.sh}; }); if(AVS.some(a=>!a)) { const r=AVS; AVS=null; return r; } return AVS; }
  function painSil(){ if(PAINS) return PAINS; const c=prep(IMG.pain); if(!c) return null; const pad=10, o=mk(c.sw+pad*2,c.sh+pad*2), x=o.getContext('2d');
    x.filter='blur(5px)'; x.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,pad,pad,c.sw,c.sh); x.filter='none'; x.globalCompositeOperation='source-in'; x.fillStyle='rgba(150,70,230,0.9)'; x.fillRect(0,0,o.width,o.height);
    x.globalCompositeOperation='source-over'; const d=mk(c.sw,c.sh), y=d.getContext('2d'); y.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,0,0,c.sw,c.sh); y.globalCompositeOperation='source-in'; y.fillStyle='#07040c'; y.fillRect(0,0,c.sw,c.sh); x.drawImage(d,pad,pad);
    return PAINS={src:o, sx:0, sy:0, sw:o.width, sh:o.height, pad, c}; }
  // 🌀 hình xoáy Kamui (theo ảnh mẫu anh gửi): DẢI MỰC đen to mép rách cuộn xoắn ốc vào 1 tâm · đường xoắn mảnh gợn quanh · vạch tốc độ toả 1 bên
  //    (không gian bị xoắn + bạc màu = hậu kỳ twist/adjust trong postFX) · u: 0→1 suốt lần xoắn · dir: chiều xoay
  function kamuiSwirl(cx,cy,u,Rmax,dir){ if(u<=0||u>=1) return; const kk=Math.sin(Math.PI*u), R=Rmax*(0.35+0.65*eout(Math.min(1,u*2.2))), rot=u*9*dir;
    g.save(); g.translate(cx,cy); g.scale(dir,1); g.lineCap='round';
    for(let k=0;k<16;k++){ g.beginPath(); const a0=k/16*Math.PI*2+rot*0.6; for(let i=0;i<=40;i++){ const q=i/40, r=R*(0.05+1.15*q), a=a0+q*2.4; i?g.lineTo(Math.cos(a)*r,Math.sin(a)*r):g.moveTo(Math.cos(a)*r,Math.sin(a)*r); }
      g.strokeStyle=`rgba(28,28,32,${0.4*kk})`; g.lineWidth=Math.max(0.8,R*0.003); g.stroke(); }   // đường xoắn mảnh
    for(let k=0;k<28;k++){ const a=-0.8+k/28*1.6+rot*0.25, r0=R*0.58, r1=R*(0.7+0.1*hash(k+3000)); g.strokeStyle=`rgba(22,22,26,${0.55*kk})`; g.lineWidth=Math.max(0.8,R*0.0035);
      g.beginPath(); g.moveTo(Math.cos(a)*r0,Math.sin(a)*r0); g.lineTo(Math.cos(a)*r1,Math.sin(a)*r1); g.stroke(); }   // vạch tốc độ
    for(let b=0;b<4;b++){ const a0=b/4*Math.PI*2+rot, N=56, out=[], inn=[];   // dải mực to, mép rách
      for(let i=0;i<=N;i++){ const q=i/N, a=a0+q*3.6, r=R*(0.06+0.98*q), w=R*0.085*Math.sin(Math.PI*Math.min(1,q*1.12))*(0.75+0.5*h2(i,b,7)), jg=(h2(i,b,9)-0.5)*w*0.6;
        out.push([Math.cos(a)*(r+w/2+jg),Math.sin(a)*(r+w/2+jg)]); inn.push([Math.cos(a)*(r-w/2),Math.sin(a)*(r-w/2)]); }
      g.beginPath(); out.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); inn.reverse().forEach(p=>g.lineTo(p[0],p[1])); g.closePath();
      g.fillStyle=`rgba(12,12,16,${0.88*kk})`; g.fill(); g.strokeStyle=`rgba(110,110,120,${0.35*kk})`; g.lineWidth=1; g.stroke(); }
    const gr=g.createRadialGradient(0,0,0,0,0,R*0.13); gr.addColorStop(0,`rgba(0,0,0,${0.9*kk})`); gr.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=gr; g.beginPath(); g.arc(0,0,R*0.13,0,Math.PI*2); g.fill();   // tâm hút
    g.restore(); }
  const KW=[{x:PX,y:PY,t0:K.open,t1:K.members+0.4,R:430,dir:1,ang:5.5,rad:560},{x:SRC[0],y:SRC[1],t0:K.warp,t1:K.warp+1.4,R:170,dir:-1,ang:-4.5,rad:240},{x:DST[0],y:DST[1],t0:K.arrive-0.3,t1:K.arrive+1.0,R:150,dir:1,ang:4,rad:220}];   // 3 lần Kamui: cổng lớn · hút Grumpy · nhả Grumpy
  function kamui(t){
    kamuiSwirl(KW[0].x,KW[0].y,seg(t,KW[0].t0,KW[0].t1),KW[0].R,KW[0].dir);
    if(t<K.peak+0.3) return;
    // 🪨 tảng đá lơ lửng (Ninja Cat đứng trên)
    const [fx,fy]=MEMK[FLOAT], bob=Math.sin(t*1.6)*4; { const a=eio(seg(t,K.peak+0.3,K.peak+0.6)); if(a>0){ g.save(); g.globalAlpha=a; const Pf=[[fx-46,fy+bob+4],[fx-20,fy+bob-3],[fx+26,fy+bob-1],[fx+50,fy+bob+6],[fx+30,fy+bob+40],[fx+4,fy+bob+70],[fx-28,fy+bob+38]]; rockPoly(Pf,'#140909','#2c1a16','#7a2a10',fx|0); g.restore(); } }
    // 👥 4 thành viên (bóng đen, mắt đỏ) — hiện ra NGAY TRONG lúc không gian tháo xoắn
    const KIT=window._l2e2Kit, SL=KIT?avSils(KIT):[];
    MEMK.forEach(([x,y],i)=>{ const t0=K.peak+0.35+0.12*i, a=eio(seg(t,t0,t0+0.6)), sl=SL[i]; if(!sl || a<=0) return; const yy=i===FLOAT?y+bob:y, h=MU*AVM[i].h, w=h*sl.sw/sl.sh, k=w/sl.sw, fl=x>PX;
      if(i===0 && t>=K.eye && NJ_SHAR.naturalWidth){   // 👁️ Mangekyou Sharingan sau lưng Ninja Cat (port _njDrawUnder trong game): loé lên, xoay vòng, quầng đỏ
        const u=seg(t,K.eye,K.arrive+0.6), al=Math.min(seg(t,K.eye,K.eye+0.2),1-seg(t,K.arrive+0.2,K.arrive+0.6)), R=h*0.85*(1+0.18*Math.min(1,u*3)), cx=x, cy=yy-h*0.5;
        if(al>0){ g.save(); g.globalAlpha=al; g.globalCompositeOperation='lighter'; const gr=g.createRadialGradient(cx,cy,0,cx,cy,R*1.5); gr.addColorStop(0,'rgba(255,40,40,0.55)'); gr.addColorStop(1,'rgba(160,0,0,0)');
          g.fillStyle=gr; g.beginPath(); g.arc(cx,cy,R*1.5,0,Math.PI*2); g.fill(); g.globalCompositeOperation='source-over'; g.translate(cx,cy); g.rotate(-(t-K.eye)*2.2); g.drawImage(NJ_SHAR,-R,-R,R*2,R*2); g.restore();
          if(t<K.eye+0.18) fullFill('rgba(255,30,30,A)',0.3*(1-seg(t,K.eye,K.eye+0.18))); } }   // loé đỏ
      g.save(); g.globalAlpha=a; g.translate(x,yy); if(fl) g.scale(-1,1); g.drawImage(sl.c,-w/2-sl.pad*k,-h-sl.pad*k,sl.c.width*k,sl.c.height*k); g.restore();
      const ek=a*(0.75+0.25*Math.sin(t*5+i)); g.save(); g.globalCompositeOperation='lighter'; for(const [ex,ey] of AVM[i].eye){ const px=x+(fl?-1:1)*(ex-0.5)*w, py=yy-h+ey*h; glow(px,py,h*0.05,ek,'255,40,30'); glow(px,py,h*0.015,ek,'255,200,190'); } g.restore(); });
    // 🟣 PAIN lơ lửng giữa (bóng đen, mắt Rinnegan tím âm ỉ)
    const ps=painSil(); if(ps){ const a=eio(seg(t,K.peak+0.3,K.peak+0.9)), h=MU*1.15, py=PAINY+Math.sin(t*1.3)*4, w=h*ps.sw/ps.sh, s=h/ps.sh;
      g.save(); g.globalAlpha=a; actor(ps,PX,py,h,{}); g.restore();
      const ex=e=>[PX-w/2+(ps.pad+e[0]-ps.c.sx)*s, py-h+(ps.pad+e[1]-ps.c.sy)*s], ek=a*(0.6+0.4*Math.sin(t*4));
      g.save(); g.globalCompositeOperation='lighter'; for(const [x,y] of [ex([297,275]),ex([452,250])]){ glow(x,y,6,ek,'190,110,255'); glow(x,y,3,ek,'240,220,255'); } g.restore(); }
    // 🌀 Kamui hút Grumpy khỏi dung nham → 🌀 Kamui nhả Grumpy nằm trên bậc đá
    kamuiSwirl(KW[1].x,KW[1].y,seg(t,KW[1].t0,KW[1].t1),KW[1].R,KW[1].dir);
    if(t>=K.arrive){ const ra=eio(seg(t,K.arrive+0.1,K.arrive+0.7)), bc=BURN||(BURN=buildBurn());
      const bs=BURN_SHUT||(BURN_SHUT=IMG.grumpyShut.naturalWidth?buildBurn(IMG.grumpyShut):null), op=bs?eio(seg(t,K.eyes,K.eyes+0.3)):1;   // 😾 nằm NHẮM MẮT → zoom sát: MỞ MẮT
      if(bs && op<1) actor(bs,DST[0],DST[1],MU,{center:true,rot:-1.5,a:ra});
      if(bc && op>0) actor(bc,DST[0],DST[1],MU,{center:true,rot:-1.5,a:ra*op});
      g.save(); for(let i=0;i<4;i++){ const ph=(t*0.3+i/4)%1; g.strokeStyle=`rgba(70,60,64,${0.2*ra*Math.sin(ph*Math.PI)})`; g.lineWidth=2.5; g.beginPath(); const sx=DST[0]-20+i*14; g.moveTo(sx,DST[1]-20-ph*80); g.bezierCurveTo(sx+9,DST[1]-36-ph*80,sx-9,DST[1]-52-ph*80,sx+4,DST[1]-70-ph*80); g.stroke(); } g.restore();   // khói mảnh
      g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<6;i++){ const ph=(t*0.7+hash(i+80))%1; glow(DST[0]-30+hash(i+81)*60,DST[1]-12+hash(i+82)*26,4,0.55*Math.sin(ph*Math.PI)*ra,'255,120,40'); } g.restore(); }
    kamuiSwirl(KW[2].x,KW[2].y,seg(t,KW[2].t0,KW[2].t1),KW[2].R,KW[2].dir);
  }
  // 🛡️ TRƯỜNG LỰC quanh Supreme chặn mọi đòn của Grumpy (anh dặn 30/10): chỉ hiện LỜ MỜ khi Grumpy lao tới — vỏ năng lượng tím đen kiểu aura Supreme
  //    (shader aura 'cursed' chạy quanh 1 hình tròn) · chỗ Grumpy đập vào: gợn sóng tím loang ra
  const FLD={x:FC[0], y:FC[1], R:FR, hits:ATK.concat([[TF.hit,ATKF]])};
  let FLDC=null;
  function field(t){ const k=Math.max(Math.min(seg(t,TF.a1-0.3,TF.a1-0.1),1-seg(t,TF.rest-0.1,TF.rest+0.4)),Math.min(seg(t,TF.leap,TF.leap+0.3),1-seg(t,TF.land,TF.land+0.5))); if(k<=0.01) return;
    if(!FLDC){ FLDC=mk(256,256); const x=FLDC.getContext('2d'); x.fillStyle='#fff'; x.beginPath(); x.arc(128,128,120,0,Math.PI*2); x.fill(); }
    const {x,y,R}=FLD; g.save(); g.globalAlpha=0.42*k;
    if(window.VfxGL) VfxGL.drawAura(g,FLDC,{preset:'cursed',x,y:y+R,w:R*2,h:R*2,t,k:0.7,seed:7});
    g.restore();
    g.save(); g.globalCompositeOperation='lighter'; const gr=g.createRadialGradient(x,y,R*0.55,x,y,R); gr.addColorStop(0,'rgba(120,40,220,0)'); gr.addColorStop(0.85,`rgba(150,70,255,${0.16*k})`); gr.addColorStop(1,'rgba(150,70,255,0)');
    g.fillStyle=gr; g.beginPath(); g.arc(x,y,R,0,Math.PI*2); g.fill();
    g.strokeStyle=`rgba(200,150,255,${0.22*k})`; g.lineWidth=1.5; g.beginPath(); g.arc(x,y,R*0.98,0,Math.PI*2); g.stroke();
    for(const [h0,a] of FLD.hits){ const u=t-h0; if(u<0||u>0.7) continue; const cx=x+Math.cos(a)*R, cy=y+Math.sin(a)*R;   // 💥 chỗ bị chặn: gợn tím loang
      for(let j=0;j<3;j++){ const v=u/0.7-j*0.15; if(v<0||v>1) continue; g.strokeStyle=`rgba(210,150,255,${0.6*(1-v)})`; g.lineWidth=2.5*(1-v)+0.5; g.beginPath(); g.arc(x,y,R,a-0.2-1.1*v,a+0.2+1.1*v); g.stroke(); }
      glow(cx,cy,40*(1-u/0.7)+10,0.7*(1-u/0.7),'190,110,255'); }
    if(t>=TF.blast && t<TF.blast+0.5){ const u=(t-TF.blast)/0.5; g.strokeStyle=`rgba(190,120,255,${0.8*(1-u)})`; g.lineWidth=10*(1-u)+1; g.beginPath(); g.arc(x,y,R*(1+1.6*eout(u)),0,Math.PI*2); g.stroke(); glow(x+R*1.2,y-R*0.4,R*1.4,0.4*(1-u),'170,80,255'); }   // aura bùng nổ hất văng (quầng ở phía Grumpy, không phủ hồng lên Supreme)
    g.restore(); }
  // ───────────────────── 🎬 CẢNH 1 · NÚI LỬA ─────────────────────
  function scene1(t){
    drawBG(BG1); drawFalls(t); embers(t,-300,840,LAVA,90,'255,140,60'); heatHaze(t,LAVA-300,LAVA,0.05);
    const pc=prep(IMG.sup); const sL=pc?spriteInfo(pc,MU*1.05):null;
    const flare=Math.max(Math.min(seg(t,TF.a1-0.3,TF.a1),1-seg(t,TF.rest,TF.rest+0.5))*0.7,Math.sin(Math.PI*seg(t,TF.leap,TF.land+0.3)));
    const gf=t<PRESS0?0.6*flare:(t<T.rage?Math.max(0.55*seg(t,PRESS0,PRESS0+0.8),0.6*flare):lerp(0.55,1,seg(t,T.rage,T.rage+0.7)));
    const calmK=1-seg(t,T.splash+0.3,K.calm+0.6), P=t<T.rage?0:eio(seg(t,T.rage,T.rage+1.0))*calmK, eyes=seg(t,T.rage+0.7,T.rage+1.0)*calmK;
    if(sL && P>0){ const dcy=HI-MU*1.05*0.95-MU*1.05*2.15*DS*0.6; g.save(); g.globalCompositeOperation='lighter'; glow(SUPX,dcy,260*DS*0.8,0.45*P,'150,40,230'); glow(SUPX,dcy-60,150*DS*0.8,0.35*P,'255,90,200'); g.restore(); }   // quầng sáng tím sau lưng mặt quỷ (để mặt quỷ đen nổi trên nền trời tối)
    const wk=seg(t,K.turn+0.2,K.gone), supX=lerp(SUPX,60,wk), supA=1-seg(wk,0.45,1), turned=t>=K.turn, look=t<K.turn?0.07*eio(seg(t,T.splash+0.2,K.calm+0.6)):0;   // nhìn xuống dung nham → quay lưng bước vào bóng tối
    if(sL && t<K.gone){ if(P>0) saDemon(SUPX,HI,sL,P,eyes,t); if(gf*calmK>0.01){ saRings(SUPX,HI,MU*0.5,gf*calmK,t); saAura(SUPX,HI,sL,gf*calmK,t); }
      const jr=t>=T.hit?-0.28*Math.exp(-(t-T.hit)*5)*Math.cos((t-T.hit)*18):0;   // bị đá trúng mặt: giật đầu
      actor(pc,supX,HI-(wk>0?Math.abs(Math.sin(t*8))*3:0),MU*1.05,{rot:jr+look+(wk>0?Math.sin(t*8)*0.04:0),flip:turned,a:supA});
      if(t>=T.rage && t<K.turn){ const k=seg(t,T.rage,T.rage+0.4)*(0.35+0.65*calmK); g.save(); g.globalCompositeOperation='lighter'; glow(SUPX-6,HI-MU*0.86,14,0.9*k,'200,80,255'); glow(SUPX+14,HI-MU*0.86,14,0.9*k,'200,80,255'); g.restore(); }   // mắt rực tím
      if(t>=T.rage+1.5 && t<T.splash+0.8){ const k=Math.min(seg(t,T.rage+1.5,T.rage+1.8),1-seg(t,T.splash,T.splash+0.8)); g.save(); g.font='bold 30px "Noto Sans JP","Hiragino Sans",sans-serif'; g.textAlign='center';   // ゴゴゴ
        for(let i=0;i<4;i++){ const a2=i/4*Math.PI*2+0.4, rr=MU*0.95+Math.sin(t*6+i)*4; g.save(); g.translate(SUPX+Math.cos(a2)*rr*1.1,HI-MU*0.55+Math.sin(a2)*rr*0.6); g.rotate(-0.15+0.3*hash(i+5));
          g.lineWidth=5; g.strokeStyle=`rgba(20,0,30,${0.9*k})`; g.strokeText('ゴゴゴ',0,0); g.fillStyle=`rgba(200,80,255,${k})`; g.fillText('ゴゴゴ',0,0); g.restore(); } g.restore(); } }
    field(t);
    drawLedge(t);
    const pv=t<PRESS0?0:(t<T.crush?0.6+0.3*seg(t,T.rage,T.crush):1);
    let {gx,gy,rot,sy,sx,atk,sm,fl}=grumpyFight(t), alpha=1;
    if(t>=PRESS0 && t<T.press){ const k=eio(seg(t,PRESS0,PRESS0+0.4)); sy=lerp(0.8,0.78,k); sx=lerp(1.1,1.12,k); gx+=Math.sin(t*55)*1.2; }   // quỳ rạp dưới áp lực
    if(t>=T.press){ const k=eio(seg(t,T.press,T.press+0.5)); sy=lerp(1,t<T.rage?0.76:lerp(0.76,0.62,seg(t,T.rage,T.crush)),k); sx=lerp(1,1.14,k); }
    if(t<T.crush){ gx+=qx(t,0); gy+=qy(t,0); }   // rung cùng tảng đá dưới chân
    if(t>=T.crush){ const c=LEDGE.ch[3], p=chunkPose(c,t); gx+=p.dx; gy+=p.dy; rot=p.r*0.6; if(t>=T.splash) alpha=0; }
    if(t<T.crush && pv>0) saPressed(GRX,LO,MU*0.5,pv,t,3.7);
    for(const [ts,xx,yy] of [[TF.rest,G0[0],HI+4],[TF.land,GRX,LO+4]]) if(t>=ts && t<ts+1.2) smoke(xx,yy,t-ts+0.6,7,1-seg(t,ts,ts+1.2));   // bụi bốc lên chỗ đập
    const gc=(atk || (t>=T.throw-0.1 && t<T.throw+0.35))?prep(IMG.grumpyAtk):prep(IMG.grumpy);
    if(alpha>0 && sm && t<PRESS0){ for(let j=3;j>=1;j--){ const q=grumpyFight(t-j*0.045); actor(gc,q.gx,q.gy,MU,{sx:q.sx,sy:q.sy,rot:q.rot,a:0.32/j,flip:q.fl}); } }   // vệt nhoè: bóng mờ ở vị trí các khung trước
    if(alpha>0){ const bl=t>=T.hit&&t<T.crush?seg(t,T.hit,T.hit+0.6):0, Q=quake(t);
      if(bl>0){ actor(gc,gx+Q*1.3,gy,MU,{sx,sy,rot,a:0.38*bl}); actor(gc,gx-Q*1.3,gy,MU,{sx,sy,rot,a:0.38*bl}); }   // rung nhoè
      actor(gc,gx,gy,MU,{sx,sy,rot,flip:fl&&t<PRESS0}); }   // mặt quay về phía Supreme (bên trái)
    const st=prep(IMG.stone);
    if(st){ if(t>=T.grab && t<T.throw){ actor(st,GRX-34,LO-4,16,{}); }
      else if(t>=T.throw && t<T.hit){ const u=seg(t,T.throw,T.hit), x=lerp(GRX-30,SUPX+10,u), y=lerp(LO-50,HI-MU*0.8,u)-Math.sin(u*Math.PI)*70; actor(st,x,y,18,{center:true,rot:t*14}); }
      else if(t>=T.hit && t<T.hit+1.6){ const u=t-T.hit, x=SUPX+10+60*u, y=HI-MU*0.8-120*u+500*u*u; actor(st,x,y,18,{center:true,rot:t*10}); } }
    if(t>=T.hit && t<T.hit+0.3){ const k=1-(t-T.hit)/0.3; g.save(); g.globalCompositeOperation='lighter'; glow(SUPX+10,HI-MU*0.8,60*k+10,0.9*k,'255,240,200'); g.restore(); }
    drawLava(t);
    if(t>=T.splash){ const u=t-T.splash; g.save(); g.globalCompositeOperation='lighter';
      glow(GRX+20,LAVA,240*Math.min(1,u*4),0.9*Math.exp(-u*1.5),'255,150,40');
      for(let i=0;i<54;i++){ const a=-Math.PI/2+(hash(i+500)-0.5)*1.5, sp=180+340*hash(i+520), x=GRX+20+Math.cos(a)*sp*u, y=LAVA+Math.sin(a)*sp*u+520*u*u;
        if(y>LAVA+10) continue; g.fillStyle=`rgba(255,${120+120*hash(i+540)|0},40,${Math.max(0,1-u*0.8)})`; g.beginPath(); g.arc(x,y,2+4*hash(i+560),0,Math.PI*2); g.fill(); } g.restore(); }
    if(t>=T.rage && t<T.splash) fullFill('rgba(18,0,30,A)',0.28*seg(t,T.rage,T.rage+0.6));
    if(t>=T.rage && t<T.rage+1.5){   // 😼⚡ CẬN MẶT (port _saWinDraw của game): xung quanh tối om, chỉ khuôn mặt sáng · đúng 1 tia sét dọc sau lưng
      const u=t-T.rage, k=Math.min(1,u/0.4), bt=u-0.33, flash=bt>=0&&bt<0.05?1-bt/0.05:0, A=(0.86-0.3*flash)*k, [fx,fy]=SFACE;
      const gr=g.createRadialGradient(fx,fy,SFR*0.55,fx,fy,SFR*2.3); gr.addColorStop(0,'rgba(0,0,0,0)'); gr.addColorStop(0.45,`rgba(0,0,0,${A*0.45})`); gr.addColorStop(1,`rgba(0,0,0,${A})`);
      g.save(); g.fillStyle=gr; g.fillRect(fx-600,fy-900,1200,1800); g.restore();
      if(bt>=0 && bt<0.3){ const a=1-bt/0.3, x0=SUPX+40, pts=[]; let yy=HI-260, xx=x0, n=0; while(yy<HI+10){ pts.push([xx,yy]); yy+=8+hash(n+5200)*16; xx+=(hash(n+5300)-0.5)*14; n++; }
        const br=[0,1].map(k2=>{ const s0=pts[3+Math.floor(hash(k2+5400)*(pts.length-5))], B=[[s0[0],s0[1]]], dir=k2?1:-1; let bx=s0[0], by=s0[1]; for(let q=0;q<4;q++){ bx+=dir*(6+hash(q+k2*9+5500)*10); by+=8+hash(q+k2*9+5600)*12; B.push([bx,by]); } return B; });
        const line=P=>{ g.beginPath(); P.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1])); g.stroke(); };
        g.save(); g.globalCompositeOperation='lighter'; g.lineJoin='round'; g.lineCap='round';
        for(const [lw,col] of [[9,`rgba(120,150,255,${0.25*a})`],[4,`rgba(190,210,255,${0.6*a})`],[1.6,`rgba(255,255,255,${a})`]]){ g.lineWidth=lw/4; g.strokeStyle=col; line(pts); br.forEach(line); } g.restore(); } }
    if(t>=K.calm) kamui(t);
  }
  // ───────────────────── 🎬 CẢNH 2 (đầu TẬP 4) · BỜ DUNG NHAM: lính nhấc Grumpy lên cáng, khiêng đi ─────────────────────
  function scene2(t){
    drawBG(BG2); embers(t,-200,760,GY2-60,50,'255,120,50',600);
    const sc=soldierImg();
    // 🛏️ cáng: 2 lính khiêng vào từ phải (dừng cạnh Grumpy) → đặt Grumpy lên → khiêng ra bên trái
    const cin=eio(seg(t,T.carry0,T.lift)), cout=seg(t,T.carry,T.lab), sx0=lerp(640,250,cin)-cout*560, sy0=GY2-46, len=110, walk=(t>=T.carry0&&t<T.lift)||t>=T.carry?Math.sin(t*14):0;
    // Grumpy: nằm trên đất → 2 lính nhấc lên → đặt xuống cáng → đi theo cáng (đầu TẬP 4 — không còn Pain dùng chakra)
    const lift=seg(t,T.lift,T.lift+0.6), onS=eio(seg(t,T.lift+0.5,T.onStr));
    let gx=290, gy=GY2-30, gr=-Math.PI/2+0.06*Math.sin(t*0.8)*(1-lift);
    gy-=lift*(1-onS)*34; gx=lerp(gx,sx0,onS); gy=lerp(gy,sy0-30,onS)+(t>=T.carry?walk*1.5:0);
    if(t>=T.carry){ gx=sx0; }
    // lính khiêng 2 đầu cáng (đi bộ nhún nhảy)
    const sold=(x,ph)=>actor(sc,x,GY2-2+Math.abs(Math.sin(t*7+ph))*-3,MU*0.82,{flip:t<T.carry,rot:Math.sin(t*7+ph)*0.04});
    if(t>=T.carry0){ sold(sx0+len/2+26,0); }
    if(t>=T.carry0) stretcher(sx0,sy0+walk*1.5,len,0);
    burntGrumpy(gx,gy,MU*0.92,gr,1,t);
    if(t>=T.carry0) sold(sx0-len/2-26,1.6);
    fog(t,GY2+20,0.18,'60,30,30');
    if(t>=T.fade2) fullFill('rgba(0,0,0,A)',seg(t,T.fade2,T.fade2+0.6));
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
  const PARTS=[{v0:0.66,v1:1.0,t:T.leg,arm:0},{v0:0.48,v1:0.66,t:T.body,arm:2}];   // chỉ lắp MẢNG GIÁP (chân · ngực — dải thân bắt đầu dưới cằm 0.48 để không lấy mặt/râu mèo; Grumpy cháy vẫn nằm bên trong) — đủ thì loé sáng thành Catvader (T.helm)   // dải trong ảnh Catvader (trên → dưới) · lúc gắn · tay máy nào
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
    const inner=g.createRadialGradient(CHX,CHY-CHH*0.5,10,CHX,CHY-CHH*0.5,CHH*0.7); inner.addColorStop(0,`rgba(220,240,255,${0.15+0.4*ray})`); inner.addColorStop(1,`rgba(80,140,255,${0.05+0.25*ray})`);   /* sáng dịu — buồng KHÔNG loé trắng (anh dặn 30/10: chỉ loé lúc lắp giáp xong) */ g.fillStyle=inner; g.fillRect(CHX-CHW/2,CHY-CHH,CHW,CHH);
    for(let k=0;k<10;k++){ g.fillStyle=`rgba(255,${180+60*ray|0},90,${0.3+0.7*ray})`; g.fillRect(CHX-CHW/2+4,CHY-CHH+14+k*23,6,10); g.fillRect(CHX+CHW/2-10,CHY-CHH+14+k*23,6,10); }   // dãy đèn 2 mép
    g.restore();
    // 😾 thân bên trong buồng: Grumpy cháy → (sau khi mở buồng) giáp Catvader lắp dần từ chân lên đầu
    const done=PARTS.filter(p=>t>=p.t).length;
    if(bc && t<T.helm){ const wb=H*bc.sw/bc.sh*0.92; g.save(); g.globalAlpha=1-(done>=3?1:0); g.drawImage(bc.src,bc.sx,bc.sy,bc.sw,bc.sh,CHX-wb/2,bodyY-H,wb,H); g.restore(); }
    if(vc && t>=T.helm){ const w=H*vc.sw/vc.sh, k=seg(t,T.helm-0.04,T.helm+0.12); g.save(); g.globalAlpha=k; g.drawImage(vc.src,vc.sx,vc.sy,vc.sw,vc.sh,CHX-w/2,bodyY-H,w,H); g.restore();   // ✨ loé → Catvader hoàn chỉnh (mũ + mặt nạ)
      if(t<T.helm+0.6){ const u=seg(t,T.helm,T.helm+0.6); g.save(); g.globalCompositeOperation='lighter'; glow(CHX,bodyY-H*0.55,H*1.4,0.9*(1-u),'255,255,255'); glow(CHX,bodyY-H*0.75,H*0.6,0.9*(1-u),'255,230,230'); g.restore(); } }
    else if(vc){ const w=H*vc.sw/vc.sh; for(const p of PARTS){ if(t<p.t) continue; const k=seg(t,p.t,p.t+0.15); g.save(); g.globalAlpha=k; g.beginPath(); g.rect(CHX-w/2-2,bodyY-H+H*p.v0,w+4,H*(p.v1-p.v0)+0.8); g.clip();
      g.drawImage(vc.src,vc.sx,vc.sy,vc.sw,vc.sh,CHX-w/2,bodyY-H,w,H); g.restore(); } }
    // 💉 dây truyền thuốc vào 2 tay
    if(serum>0){ g.save(); g.lineCap='round'; for(const [x0,y0,x1,y1,col] of [[CHX-CHW/2+2,CHY-CHH*0.5,CHX-22,bodyY-H*0.48,'255,60,80'],[CHX+CHW/2-2,CHY-CHH*0.55,CHX+22,bodyY-H*0.48,'80,200,255']]){
        g.strokeStyle=`rgba(${col},${0.8*serum})`; g.lineWidth=2.5; g.setLineDash([6,5]); g.lineDashOffset=-t*60; g.beginPath(); g.moveTo(x0,y0); g.quadraticCurveTo((x0+x1)/2,(y0+y1)/2+20,x1,y1); g.stroke(); g.setLineDash([]); } g.restore(); }
    // 🪟 kính trước buồng (trượt) + phản chiếu
    if(doorK>0.01){ const gh=CHH*doorK; g.save(); g.fillStyle=`rgba(140,190,255,${0.12+0.1*ray})`; g.fillRect(CHX-CHW/2,CHY-CHH,CHW,gh);
      g.strokeStyle='rgba(220,240,255,0.35)'; g.lineWidth=2; g.strokeRect(CHX-CHW/2+2,CHY-CHH+1,CHW-4,gh-2);
      g.globalCompositeOperation='lighter'; g.fillStyle='rgba(255,255,255,0.12)'; g.beginPath(); g.moveTo(CHX-CHW/2+12,CHY-CHH); g.lineTo(CHX-CHW/2+34,CHY-CHH); g.lineTo(CHX-CHW/2+10,CHY-CHH+gh); g.lineTo(CHX-CHW/2-12+12,CHY-CHH+gh); g.closePath(); g.fill(); g.restore(); }
    // ☀️ tia Vita-Ray: sáng tràn ra ngoài buồng, tia toả
    if(ray>0){ g.save(); g.globalCompositeOperation='lighter'; glow(CHX,CHY-CHH*0.5,CHH*0.9*ray+30,0.2*ray,'120,170,255');   // chỉ hắt sáng xanh dịu, không toả tia / không loé
      g.restore(); }
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
    if(t>=T.helm-0.1 && t<T.helm+0.4) fullFill('rgba(255,250,245,A)',0.85*Math.min(seg(t,T.helm-0.1,T.helm),1-seg(t,T.helm,T.helm+0.4)));   // ✨ LOÉ SÁNG duy nhất của phòng thí nghiệm: lắp giáp xong → thành Catvader
    // 😮‍💨 Catvader thở: đèn đỏ phòng nhịp theo hơi thở
    if(t>=T.helm+0.4){ const k=seg(t,T.helm+0.4,T.helm+1.2), ph=((t-T.breath)%2.15)/2.15; g.save(); g.globalCompositeOperation='lighter'; glow(CHX,bodyY-H*0.55,220,0.25*k+(t>=T.breath?0.12*Math.sin(Math.max(0,ph)*Math.PI):0),'255,40,40'); g.restore();
      fullFill('rgba(60,0,0,A)',0.18*k); }
    if(t<T.lab+0.5) fullFill('rgba(0,0,0,A)',1-seg(t,T.lab,T.lab+0.5));
  }
  // ───────────────────── 🎬 CẢNH 4 · DOANH TRẠI ─────────────────────
  let HOLO=null;   // hình chiếu tím của Supreme (vẽ sẵn: nhuộm tím + vạch quét ngang)
  function holoSup(){ if(HOLO) return HOLO; const c=prep(IMG.sup); if(!c) return null; const o=mk(c.sw,c.sh), x=o.getContext('2d'); x.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,0,0,c.sw,c.sh);
    x.globalCompositeOperation='source-atop'; x.fillStyle='rgba(150,80,255,0.62)'; x.fillRect(0,0,c.sw,c.sh); x.fillStyle='rgba(0,0,0,0.25)'; for(let y=0;y<c.sh;y+=6) x.fillRect(0,y,c.sw,2);
    return HOLO=o; }
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
    const fear=seg(t,T.pull,T.pull+0.6), part=eio(seg(t,T.painOut,T.painOut+0.8)), PATH=380;
    SOLD.slice().sort((a,b)=>a.y-b.y).forEach((s,i)=>{ if(SOLD.indexOf(s)===VICTIM) return; const sh=fear*(Math.sin(t*30+i)*1.2)*(1-part), side=s.x<PATH?-1:1;
      actor(sc,s.x+sh+fear*12+side*part*84,s.y,MU*1.1*s.s,{flip:true,rot:fear*0.1*(1-part)+side*part*0.06}); });   // lính dạt 2 bên nhường đường cho Pain
    if(sc){ if(force>0 && t>=T.pull){ g.save(); g.globalCompositeOperation='lighter'; glow(vx,vy-MU*0.4,70,0.35*force,'255,40,40'); g.restore(); }
      actor(sc,vx,vy,MU*1.1,{flip:true,rot:vr}); }
    // 🌑 Pain bước ra từ phía sau hàng quân
    const pc=prep(IMG.pain); if(pc && t>=T.painOut){ const u=eio(seg(t,T.painOut+0.2,T.rin)), px=lerp(PATH+10,PATH,u), py=lerp(GY4-110,GY4+110,u), ph=MU*lerp(0.95,1.4,u), a=seg(t,T.painOut,T.painOut+0.6);
      g.save(); g.globalCompositeOperation='lighter'; glow(px,py-ph*0.5,ph*0.9,0.22*a,'130,40,220'); g.restore();
      actor(pc,px,py+Math.abs(Math.sin(t*6))*-2*(t<T.rin?1:0),ph,{a,flip:true});
      if(t>=T.rin){ const k=Math.max(seg(t,T.rin,T.rin+0.15)*(1-seg(t,T.rin+0.5,T.rin+1.2)),0.35), w=ph*pc.sw/pc.sh;   // 👁️ Rinnegan loé tím
        g.save(); g.globalCompositeOperation='lighter'; for(const [ex,ey] of [[297,275],[452,250]]){ const u2=(ex-pc.sx)/pc.sw, v2=(ey-pc.sy)/pc.sh, x=px-(u2-0.5)*w, y=py-ph+v2*ph; glow(x,y,14+26*k,0.9*k,'190,120,255'); } g.restore(); }
      // 💠 hình chiếu Supreme (trên cao — "high ground") phát ra từ bàn tay Pain, Catvader bóp vỡ
      if(t>=T.pl1-0.3 && t<T.fist+1.2){ const hc=holoSup(); if(hc){ const ap=seg(t,T.pl1-0.3,T.pl1+0.2), sq=seg(t,T.fist,T.fist+0.15), brk=seg(t,T.fist+0.15,T.fist+1.1), hx=230, hy=GY4-210, hh=MU*1.25, hw=hh*hc.width/hc.height;
          if(brk<=0){ g.save(); g.globalCompositeOperation='lighter'; const cone=g.createLinearGradient(px-30,py-ph*0.55,hx,hy); cone.addColorStop(0,'rgba(170,110,255,0.4)'); cone.addColorStop(1,'rgba(170,110,255,0.04)'); g.fillStyle=cone;
              g.beginPath(); g.moveTo(px-30,py-ph*0.55); g.lineTo(hx-hw*0.5,hy); g.lineTo(hx+hw*0.5,hy); g.closePath(); g.globalAlpha=ap; g.fill(); g.restore();
            const fl=(Math.floor(t*20)%9===0?0.5:1)*(0.75+0.15*Math.sin(t*9)); g.save(); g.globalAlpha=ap*fl; g.translate(hx,hy); g.scale(1-0.35*sq,1+0.08*sq); g.drawImage(hc,-hw/2,-hh,hw,hh); g.restore();
            if(sq>0){ g.save(); g.globalCompositeOperation='lighter'; glow(hx,hy-hh*0.5,hh*0.9,0.6*sq,'255,40,40'); g.restore(); } }
          else { g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<40;i++){ const a2=hash(i+600)*Math.PI*2, sp=60+140*hash(i+601), x=hx+(hash(i+602)-0.5)*hw+Math.cos(a2)*sp*brk, y=hy-hh*hash(i+603)+Math.sin(a2)*sp*brk+60*brk*brk;
              g.fillStyle=`rgba(190,140,255,${1-brk})`; g.fillRect(x,y,4,4); } g.restore(); } } } }
    if(force>0){ g.save(); g.globalCompositeOperation='lighter'; glow(hx,hy,80,0.55*force,'255,40,40');
      for(let k=0;k<3;k++){ const ph=((t*1.4+k/3)%1); g.strokeStyle=`rgba(255,70,70,${0.4*(1-ph)*force})`; g.lineWidth=2; g.beginPath(); g.arc(hx,hy,10+100*ph,0,Math.PI*2); g.stroke(); } g.restore(); }
    actor(vc,VX,VY,MU*1.45,{});
    if(t>=T.fist && t<T.fist+0.6){ const k=1-seg(t,T.fist,T.fist+0.6); g.save(); g.globalCompositeOperation='lighter'; glow(VX+60,VY-MU*1.0,60,0.8*k,'255,40,40'); g.restore(); }   // ✊ nắm tay: loé đỏ
    fog(t,GY4+10,0.12,'120,20,30');
    if(t>=T.title){ const k=seg(t,T.title,T.title+0.3)*(0.75+0.25*Math.sin(t*3)); g.save(); g.globalCompositeOperation='lighter'; glow(VX,VY-MU*0.8,240,0.35*k,'255,30,30'); g.restore(); }
  }

  // ───────────────────── 🎬 CẢNH 5 · HANG ĐÁ CỦA TẬP 2: cả nhóm phá phong ấn, Friend nhập vào tượng ─────────────────────
  // Dùng LẠI đúng hang / tượng / lồng / phong ấn / tay bóng tối của tập 2 (window._l2e2Kit — chính các hàm vẽ của js/cine-lore2ep2.js)
  const T2=20;   // thời điểm bên tập 2 lúc hang đã thắp sáng hết
  const BEAMC=['90,170,255','80,230,255','255,210,70','120,255,140'];   // Ninja · Mewing · Infinity Doge · Doorbell Chud
  let FIGS=null, SILS=null;
  // 🕶️ thành viên Akatsuki KHÔNG lộ mặt (anh dặn 30/10): bóng đen tuyền + viền tím mờ bao quanh, thay cho hình thật
  function sils(K){ if(SILS) return SILS; SILS=figs(K).map(fg=>{ if(!fg) return null; const pad=6, c=mk(fg.width+pad*2,fg.height+pad*2), x=c.getContext('2d');
      x.filter='blur(3px)'; x.drawImage(fg,pad,pad); x.filter='none'; x.globalCompositeOperation='source-in'; x.fillStyle='rgba(150,70,230,0.9)'; x.fillRect(0,0,c.width,c.height);   // quầng viền tím
      x.globalCompositeOperation='source-over'; const d=mk(fg.width,fg.height), y=d.getContext('2d'); y.drawImage(fg,0,0); y.globalCompositeOperation='source-in'; y.fillStyle='#07040c'; y.fillRect(0,0,d.width,d.height);
      x.drawImage(d,pad,pad); c._pad=pad; return c; }); return SILS; }
  function figs(K){ if(FIGS) return FIGS; const ims=K.imgs().slice(4); FIGS=ims.map((im,i)=>{ try{ return K.buildFigure(im,K.C.MEM_HEAD[i],K.C.MH*3); }catch(e){ return null; } }); return FIGS; }
  function beamLine(x0,y0,x1,y1,col,k,t,seed){ if(k<=0.01) return; const mx=(x0+x1)/2+Math.sin(t*3+seed)*20, my=(y0+y1)/2-40;
    g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round';
    for(const [w,a] of [[18,0.18],[8,0.45],[2.5,1]]){ g.strokeStyle=`rgba(${col},${a*k})`; g.lineWidth=w*(0.7+0.5*k); g.beginPath(); g.moveTo(x0,y0); g.quadraticCurveTo(mx,my,x1,y1); g.stroke(); }
    for(let i=0;i<6;i++){ const u=((t*1.6+i/6+seed)%1), x=(1-u)*(1-u)*x0+2*(1-u)*u*mx+u*u*x1, y=(1-u)*(1-u)*y0+2*(1-u)*u*my+u*u*y1; glow(x,y,10,0.8*k,col); }
    glow(x0,y0,24,0.6*k,col); g.restore(); }
  // 🔒 5 LỒNG — mỗi lồng 1 Friend bị phong ấn riêng, bị rút năng lượng truyền thẳng vào bức tượng (anh đổi kịch bản 30/10)
  const CAGES5=[[-80,388],[95,272],[270,222],[445,272],[620,388]], CS5=0.5, CORE=[270,40];
  function core5(){ return CORE; }
  // mảnh vỡ của 1 Friend (lưới 3×3 cắt từ ảnh) bay theo đường cong về lõi tượng
  function friendShards(fc,cx,cy,FH,u,i){ if(!fc) return; const FW=FH*fc.sw/fc.sh, N=3, [kx,ky]=CORE;
    for(let a=0;a<N;a++) for(let b=0;b<N;b++){ const q=a*N+b, dl=hash(i*13+q)*0.35, v=clamp((u-dl)/0.85,0,1); if(v>=1) continue;
      const sx0=cx-FW/2+(a+0.5)*FW/N, sy0=cy-FH/2+(b+0.5)*FH/N, e=v*v*(3-2*v), mx=(sx0+kx)/2+(hash(q+i*7)-0.5)*260, my=Math.min(sy0,ky)-120-160*hash(q+3+i);
      const x=(1-e)*(1-e)*sx0+2*(1-e)*e*mx+e*e*kx, y=(1-e)*(1-e)*sy0+2*(1-e)*e*my+e*e*ky, sc=1-0.85*e, rot=(hash(q+9+i)-0.5)*8*e;
      const fa=1-eio(clamp((e-0.35)/0.45,0,1)); if(fa<=0.01) continue;   // 🌫️ (anh dặn 31/10) mảnh TAN BIẾN dần trên đường bay — không bám lên người tượng
      g.save(); g.globalCompositeOperation='lighter'; glow(x,y,FW/N*0.9*sc+4,0.5*fa,'255,60,50');
      for(let d=0;d<5;d++){ const dx=(hash(q*5+d+i*31)-0.5)*FW/N*(0.4+1.4*e), dy=(hash(q*5+d+i*31+7)-0.5)*FH/N*(0.4+1.4*e)-30*e; glow(x+dx,y+dy,3+5*hash(q+d),0.8*fa*e,'255,90,60'); }   // bụi đỏ bay ra khi tan
      g.restore();
      g.save(); g.globalAlpha=fa; g.translate(x,y); g.rotate(rot); g.scale(sc,sc); g.drawImage(fc.src,fc.sx+a*fc.sw/N,fc.sy+b*fc.sh/N,fc.sw/N,fc.sh/N,-FW/N/2,-FH/N/2,FW/N,FH/N); g.restore(); } }
  // 🔍 CẬN CẢNH (anh dặn 30/10): 1 con Friend to cả màn hình, đang bị rút năng lượng vẫn LAO ĐÂM liên tục vào lồng (kiểu lướt đâm "nhoi nhoi" trong game)
  //    mỗi cú húc: lao vụt về phía máy (để lại bóng mờ) → song sắt cong ra, phong ấn vàng loé lên chặn lại, toé lửa, rung màn → bị kéo giật về
  const RAMS=[0.05,0.5,0.95,1.4];   // giây trong cận cảnh (trùng 4 tiếng fr_dash)
  function friendCloseups(t){ if(t<CU0 || t>=CU1) return; const KIT=window._l2e2Kit, fc=KIT&&prep(KIT.imgs()[1]); if(!fc) return;
    const v=t-CU0, u=v/(CU1-CU0);
    const ram=tt=>{ let s=0, hit=0; for(const r of RAMS){ const d=tt-r; if(d<0) continue; if(d<0.12) s=Math.max(s,eio(d/0.12)); else if(d<0.18){ s=Math.max(s,1); hit=Math.max(hit,1-(d-0.12)/0.06*0.3); } else if(d<0.45) s=Math.max(s,1-eout((d-0.18)/0.27)); } return {s,hit}; };
    const R=ram(v); let imp=0; for(const r of RAMS){ const d=v-r-0.12; if(d>=0 && d<0.35) imp=Math.max(imp,1-d/0.35); }
    const shx=(hash(Math.floor(t*50))-0.5)*(4+26*imp), shy=(hash(Math.floor(t*50)+9)-0.5)*(3+18*imp);
    g.save(); g.setTransform(SC,0,0,SC,0,0); g.fillStyle='#000'; g.fillRect(0,0,VW,VH); g.translate(shx,shy);
    let gr=g.createRadialGradient(VW/2,VH*0.5,20,VW/2,VH*0.5,VH*0.7); gr.addColorStop(0,'#4a0808'); gr.addColorStop(0.6,'#170306'); gr.addColorStop(1,'#040102'); g.fillStyle=gr; g.fillRect(-40,-40,VW+80,VH+80);
    const cx=VW/2, FCX=0.635, FCY=0.3, fxy=[VW/2,VH*0.44], H0=VH*0.4, base=fxy[1]+H0*(1-FCY), at=(s)=>{ const h=H0*(1+0.6*s), w=h*fc.sw/fc.sh; return {h, w, x0:fxy[0]-FCX*w, y0:fxy[1]+VH*0.05*s-FCY*h}; };   // neo theo MẶT Friend (mắt ở ~0.64·0.3 khung ảnh)
    // 🩸 năng lượng bị hút ra ngoài (vệt đỏ bay lên phía tượng, mạnh dần)
    g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round'; glow(fxy[0],fxy[1]+H0*0.3,H0*0.9,0.3+0.4*u,'255,40,30');
    for(let i=0;i<34;i++){ const ph=(t*(0.9+0.9*hash(i+11))+hash(i+12))%1, x0=fxy[0]+(hash(i+13)-0.5)*H0*1.1, y0=fxy[1]+H0*0.3+(hash(i+14)-0.5)*H0*0.6, x=x0+(hash(i+15)-0.5)*120*ph, y=y0-ph*VH*0.7, L=20+60*ph;
      g.strokeStyle=`rgba(255,${50+90*hash(i+16)|0},40,${(1-ph)*(0.35+0.55*u)})`; g.lineWidth=2+5*(1-ph); g.beginPath(); g.moveTo(x,y); g.lineTo(x,y+L); g.stroke(); }
    g.restore();
    // 👻 bóng mờ cú lao (giống vệt lướt trong game)
    for(let j=3;j>=1;j--){ const q=ram(v-j*0.035); if(q.s<0.05) continue; const A=at(q.s); g.save(); g.globalAlpha=0.22/j; g.drawImage(fc.src,fc.sx,fc.sy,fc.sw,fc.sh,A.x0,A.y0,A.w,A.h); g.restore(); }
    const A=at(R.s);
    if(window.VfxGL) VfxGL.drawAura(g,fc.src,{preset:'haki',sx:fc.sx,sy:fc.sy,sw:fc.sw,sh:fc.sh,x:A.x0+A.w/2,y:A.y0+A.h,w:A.w,h:A.h,t,k:0.7+0.5*u,seed:3});
    g.drawImage(fc.src,fc.sx,fc.sy,fc.sw,fc.sh,A.x0,A.y0,A.w,A.h);
    g.save(); g.globalCompositeOperation='multiply'; g.fillStyle=`rgb(${210-100*u|0},${140-100*u|0},${150-100*u|0})`; g.fillRect(-40,-40,VW+80,VH+80); g.restore();   // bị rút cạn: tối & đỏ dần
    // ⛓️ song sắt lồng phía trước — cong ra ở giữa mỗi lần bị húc
    g.save(); g.lineCap='butt'; for(let k=0;k<7;k++){ const bx=VW*(0.04+k*0.153), off=(bx-fxy[0])/(VW/2), bend=imp*48*off;
      g.strokeStyle='rgba(18,16,24,0.95)'; g.lineWidth=13; g.beginPath(); g.moveTo(bx,-40); g.quadraticCurveTo(bx+bend*2,VH*0.5,bx,VH+40); g.stroke();
      g.strokeStyle='rgba(120,110,140,0.35)'; g.lineWidth=2; g.beginPath(); g.moveTo(bx-4,-40); g.quadraticCurveTo(bx-4+bend*2,VH*0.5,bx-4,VH+40); g.stroke(); }
    g.restore();
    // 🔶 phong ấn vàng loé lên chặn cú húc + toé lửa
    if(KIT){ const pg=KIT.setG(g); KIT.drawSeal(fxy[0],fxy[1],VW*0.5*(1+0.1*imp),1,t*0.8,0.08+0.55*imp); KIT.setG(pg); }
    if(imp>0){ g.save(); g.globalCompositeOperation='lighter'; const last=RAMS.filter(r=>v>=r+0.12).pop(), d=v-last-0.12;
      for(let i=0;i<30;i++){ const a=hash(i+last*91)*Math.PI*2, sp=200+500*hash(i+last*37), x=fxy[0]+Math.cos(a)*sp*d, y=fxy[1]+Math.sin(a)*sp*d+500*d*d;
        g.fillStyle=`rgba(255,${180+60*hash(i)|0},90,${imp})`; g.beginPath(); g.arc(x,y,1.5+2.5*hash(i+3),0,Math.PI*2); g.fill(); }
      glow(fxy[0],fxy[1],VW*0.35*imp+30,0.5*imp,'255,200,120'); g.restore(); }
    g.restore();
    if(u<0.04 || u>0.96){ g.save(); g.setTransform(SC,0,0,SC,0,0); g.fillStyle=`rgba(255,240,230,${0.5*(u<0.04?1-u/0.04:(u-0.96)/0.04)})`; g.fillRect(0,0,VW,VH); g.restore(); } }   // chớp nhẹ lúc cắt vào/ra
  // ✂️ CHIA ĐÔI MÀN (chéo): nửa trên Catvader giơ tay trong aura haki đỏ đen · nửa dưới Evil Gary trong aura độc xanh — trượt vào từ 2 phía
  function joinSplit(t){ if(t<SJ0 || t>=SJ1) return; const u=(t-SJ0)/(SJ1-SJ0), sl=eout(Math.min(1,u*4)), push=1+0.06*u;
    const P=[{im:prep(IMG.vaderHand),pre:'haki',bg:['#3a0608','#080103'],line:'255,60,60',clip:[[0,0],[VW,0],[VW,VH*0.36],[0,VH*0.64]],fx:VW*0.36,fy:VH*0.6,h:VH*0.5,fl:false,dx:-1},
             {im:prep(IMG.egary),pre:'toxic',bg:['#0a2a0c','#020803'],line:'120,255,120',clip:[[0,VH*0.64],[VW,VH*0.36],[VW,VH],[0,VH]],fx:VW*0.56,fy:VH*0.95,h:VH*0.3,fl:true,dx:1}];
    g.save(); g.setTransform(SC,0,0,SC,0,0); g.fillStyle='#000'; g.fillRect(0,0,VW,VH);
    for(const p of P){ g.save(); g.beginPath(); p.clip.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1])); g.closePath(); g.clip(); g.translate(p.dx*(1-sl)*VW,0);
      const cy=p.fy-p.h*0.5; let gr=g.createRadialGradient(p.fx,cy,10,p.fx,cy,VW*0.9); gr.addColorStop(0,p.bg[0]); gr.addColorStop(1,p.bg[1]); g.fillStyle=gr; g.fillRect(-VW,0,VW*3,VH);
      g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<40;i++){ const a=hash(i+(p.dx>0?70:0))*Math.PI*2, r0=p.h*0.45+((t*900+hash(i+5)*900)%(VW*0.9)), L=30+60*hash(i+9);   // vạch tốc độ toả ra
        g.strokeStyle=`rgba(${p.line},${0.25*(1-r0/(VW*1.2))})`; g.lineWidth=1.5+2*hash(i+3); g.beginPath(); g.moveTo(p.fx+Math.cos(a)*r0,cy+Math.sin(a)*r0); g.lineTo(p.fx+Math.cos(a)*(r0+L),cy+Math.sin(a)*(r0+L)); g.stroke(); } g.restore();
      if(p.im){ const h=p.h*push, w=h*p.im.sw/p.im.sh;
        if(window.VfxGL) VfxGL.drawAura(g,p.im.src,{preset:p.pre,sx:p.im.sx,sy:p.im.sy,sw:p.im.sw,sh:p.im.sh,x:p.fx,y:p.fy,w,h,t,k:1,flip:p.fl,seed:p.dx*3});
        g.save(); g.translate(p.fx,p.fy); if(p.fl) g.scale(-1,1); g.drawImage(p.im.src,p.im.sx,p.im.sy,p.im.sw,p.im.sh,-w/2,-h,w,h); g.restore(); }
      g.restore(); }
    g.lineWidth=10; g.strokeStyle='#000'; g.beginPath(); g.moveTo(-10,VH*0.64+3); g.lineTo(VW+10,VH*0.36-3); g.stroke(); g.lineWidth=3; g.strokeStyle='rgba(255,255,255,0.9)'; g.stroke();   // đường chia chéo
    if(u>0.93){ g.fillStyle=`rgba(0,0,0,${(u-0.93)/0.07})`; g.fillRect(0,0,VW,VH); }
    g.restore(); }
  // 👁️ tâm 2 mắt Friend trên ảnh avatar (tỉ lệ khung đã cắt sát — đo điểm ảnh vàng / hồng): vàng · hồng
  const FR_EYES=[[0.595,0.227,'255,220,40'],[0.761,0.227,'255,110,200']], FR_EYE_R=0.05;
  // mắt tượng sống lại: vòng mắt loé sáng chói 1 nhịp rồi giữ sáng · con ngươi đen đảo TRÁI → PHẢI → về GIỮA
  function stEyes(ST,t,a){ const u=t-T.stEyes, flash=Math.exp(-u*5), on=Math.min(1,u/0.12), r=ST.w*FR_EYE_R;
    const look=u<0.35?0:u<0.6?-1:u<0.95?1:u<1.15?-0.4:0, px=look*r*0.42;   // nhìn trái → phải → hơi trái → giữa
    for(const [ex,ey,col] of FR_EYES){ const x=ST.x+ex*ST.w, y=ST.y+ey*ST.h;
      g.save(); g.globalCompositeOperation='lighter'; glow(x,y,r*(2.2+5*flash),(0.75+0.25*flash)*on*a,col); glow(x,y,r*0.95,on*a,'255,250,235'); g.restore();
      g.save(); g.globalAlpha=on*a; g.fillStyle='#0a0406'; const pr=r*0.36; g.beginPath(); g.roundRect(x+px-pr,y-pr,pr*2,pr*2,pr*0.35); g.fill(); g.restore(); } }
  function scene5(t){
    const K=window._l2e2Kit; if(!K || !K.get().BG){ return; } const prevG=K.setG(g), C=K.C, G=K.get(), ST=G.ST, CG=C.CAGE, tt=T2+(t-T.cave), fc=prep(K.imgs()[1]);
    K.bg();
    // 🗿 tượng (rung + phình to sau khi hoá Friend thật) — lõi tượng sáng dần theo năng lượng hút vào
    const grow=t<T.grow?0:eio(seg(t,T.grow,T.out)), sc=1+0.32*grow, sk=t>=T.shake?(0.4+grow):0, shx=Math.sin(t*48)*5*sk, shy=Math.sin(t*37)*3*sk;
    const realK=eio(seg(t,T.real,T.real+0.7)), fr=fc;
    g.save(); g.translate(C.STX+shx,C.PED+shy); g.scale(sc,sc); g.translate(-C.STX,-C.PED);
    if(realK<1){ g.save(); g.globalAlpha=1-realK; g.drawImage(ST.c,ST.x,ST.y,ST.w,ST.h); g.restore(); K.statueRims((1-realK)*Math.max(1,1+2*seg(t,T.cageBurst,T.stEyes))); }
    if(realK>0 && fr){ g.save(); g.globalAlpha=realK; g.drawImage(fr.src,fr.sx,fr.sy,fr.sw,fr.sh,ST.x,ST.y,ST.w,ST.h); g.restore(); }
    if(t>=T.real && t<T.real+1.0){ const u=seg(t,T.real,T.real+1.0); g.save(); g.globalCompositeOperation='lighter'; glow(C.STX,ST.y+ST.h*0.45,ST.h*0.8,0.6*Math.sin(u*Math.PI),'255,210,120'); g.restore();
      if(window.VfxGL){ const sd=Math.floor(t*16); for(let i=0;i<3;i++) VfxGL.boltSet(g,ST.x+hash(sd*3+i)*ST.w,ST.y+ST.h*0.1+hash(sd*3+i+1)*ST.h*0.5,Math.PI/2+(hash(sd+i)-0.5)*0.8,260,14,sd*5+i,{core:'#fff6d8',rim:'#ffb340',glow:'rgba(255,190,80,0.3)'}); } }   // ⚡ sét biến hình (thư viện sét chung)
    if(t>=T.stEyes && realK<1) stEyes(ST,t,1-realK);   // 👁️ 2 mắt tượng LOÉ SÁNG + con ngươi đảo như vừa sống lại (anh dặn 31/10)
    g.restore();
    K.hands(T2,1); if(t<T.cageBurst) K.cuffs(T2,1);
    K.flames(t);
    // ⚡ cường độ rút năng lượng: bắt đầu khi các thành viên kết ấn · Catvader + Evil Gary nhập cuộc → phong ấn MỞ RỘNG, rút mạnh gấp đôi
    const bk=t<T.beams?0:seg(t,T.beams,T.beams+0.6)*(t<T.cageBurst?1:1-seg(t,T.cageBurst,T.cageBurst+0.5)), jk=t<T.join?0:eio(seg(t,T.join,T.join+0.9)), drain=bk*(0.55+0.45*jk)*(t<T.sealBreak?1:1.2);
    const dried=seg(t,T.join+0.4,T.sealBreak+0.2);   // Friend bị rút dần tới cạn (tối dần, run bần bật)
    // 🌀 luồng năng lượng đỏ từ mỗi lồng chảy vào lõi tượng
    if(t<T.cageBurst) CAGES5.forEach(([x,y],i)=>beamLine(x,y-30,CORE[0],CORE[1],'255,60,50',drain*0.9,t,i*0.61+3));
    if(drain>0){ g.save(); g.globalCompositeOperation='lighter'; glow(CORE[0],CORE[1],90+150*drain+200*seg(t,T.cageBurst,T.stEyes),0.35+0.4*drain,'255,70,60'); g.restore(); }
    // 🔒 5 lồng (trước khi vỡ): Friend giẫy giụa trong lồng, phong ấn vàng nhỏ quay trước mỗi lồng
    if(t<T.cageBurst) CAGES5.forEach(([x,y],i)=>{ const jit=(1+3*dried*jk)*(Math.sin(t*41+i*2)*1.6), jy=Math.cos(t*33+i)*1.2*(1+2*dried*jk);
      g.save(); g.translate(x+jit,y+jy); g.scale(CS5,CS5); g.translate(-CG.x,-CG.y); K.friendCage(tt+i*0.73); g.restore();
      if(dried>0){ g.save(); g.beginPath(); g.roundRect(x-CG.w*CS5/2,y-CG.h*CS5/2,CG.w*CS5,CG.h*CS5,12); g.clip(); g.fillStyle=`rgba(12,4,20,${0.55*dried})`; g.fillRect(x-CG.w,y-CG.h,CG.w*2,CG.h*2); g.restore(); }   // bị rút cạn: tối dần
      K.drawSeal(x,y,(118+14*jk)*(1+0.04*Math.sin(t*20+i)*bk),1,t*(0.4+1.2*bk)+i,0.12+0.33*bk); });   // phong ấn nhỏ mờ, lớn hơn lồng → vẫn thấy Friend bên trong
    else { const u=t-T.cageBurst;   // 💥 5 Friend TAN VỠ thành mảnh, bị hút xoáy vào tượng · khung lồng đổ sập
      CAGES5.forEach(([x,y],i)=>{ const w=CG.w*CS5, h=CG.h*CS5, x0=x-w/2, y0=y-h/2;
        g.save(); g.globalAlpha=Math.max(0,1-u*0.8); g.beginPath(); g.roundRect(x0,y0,w,h,12); g.fillStyle='#050307'; g.fill(); g.restore();
        for(let k=0;k<6;k++){ const bx=x0+8+k*(w-16)/5, dir=bx<x?-1:1, vx=dir*(70+60*hash(i*6+k+40)), vy=-90-60*hash(i*6+k+41);
          g.save(); g.translate(bx+vx*u,y+vy*u+500*u*u); g.rotate(dir*u*(3+2*hash(k+42))); g.fillStyle='#3e3a4a'; g.fillRect(-3,-h/2,6,h); g.restore(); }
        friendShards(fc,x,y+h*0.03,h*0.92,seg(t,T.cageBurst,T.stEyes-0.2),i);
        if(u<0.4){ g.save(); g.globalCompositeOperation='lighter'; glow(x,y,140*(0.5+u),0.9*(1-u/0.4),'255,120,90'); g.restore(); } }); }
    // 👥 kẻ phá phong ấn: 4 thành viên trên 2 lòng bàn tay + Pain dưới sàn — chakra cấp cho phong ấn từng lồng
    const P=K.memPos(), F=figs(K), SL=sils(K), boost=1+0.8*jk, pairs=[0,1,4,3];
    F.forEach((fg,i)=>{ if(!fg) return; const [x,y]=P[i], h=C.MH, w=h*fg.width/fg.height, sl=SL[i]; if(sl){ const k=w/fg.width; g.drawImage(sl,x-w/2-sl._pad*k,y-h-sl._pad*k,sl.width*k,sl.height*k); }   // bóng đen, không lộ mặt
      const cg=CAGES5[pairs[i]]; if(t<T.cageBurst) beamLine(x,y-h*0.62,cg[0],cg[1],BEAMC[i],bk*boost/1.8,t,i*0.37); });
    const pc=prep(IMG.pain), GYc=C.GY; actor(pc,270,GYc,MU*1.15,{flip:true}); if(t<T.cageBurst) beamLine(270,GYc-MU*1.15*0.62,CAGES5[2][0],CAGES5[2][1],'180,90,255',bk*boost/1.8,t,1.9);
    // ⚫🔴 CATVADER + 🐱 EVIL GARY bước ra từ bóng tối 2 bên — aura shader, tia của họ nuôi VÒNG PHONG ẤN LỚN
    if(t>=T.join-0.4){ const ap=eio(seg(t,T.join-0.4,T.join+0.3)), vc=prep(t>=T.join?IMG.vaderHand:IMG.vader), ec=prep(IMG.egary);
      for(const [im,x,h,pre,col,fl] of [[vc,90,MU*1.3,'haki','255,50,50',false],[ec,452,MU*0.95,'toxic','120,255,120',true]]){ if(!im) continue; const w=h*im.sw/im.sh, xx=x+(fl?1:-1)*(1-ap)*80;
        if(window.VfxGL && ap>0.05) VfxGL.drawAura(g,im.src,{preset:pre,sx:im.sx,sy:im.sy,sw:im.sw,sh:im.sh,x:xx,y:GYc,w,h,t,k:ap*(0.6+0.4*jk),flip:fl,seed:x});
        actor(im,xx,GYc,h,{a:ap,flip:fl});
        if(t<T.cageBurst) beamLine(xx+(fl?-1:1)*w*0.3,GYc-h*0.7,270,300,col,jk*1.1,t,x*0.01); } }
    // 🔶 VÒNG PHONG ẤN LỚN: nở rộng phủ cả 5 lồng khi Catvader + Evil Gary nhập cuộc, quay nhanh, sét tím chập chờn quanh vành → loé trắng lúc rút cạn
    const BR=lerp(0,640,eout(seg(t,T.join+0.15,T.join+1.0)));
    if(BR>4 && t<T.cageBurst+0.4){ const fa=t<T.cageBurst?1:1-seg(t,T.cageBurst,T.cageBurst+0.4); K.drawSeal(270,300,BR*(1+0.02*Math.sin(t*30)),1,-t*(0.8+1.2*jk),(0.5+0.5*jk)*fa);
      if(window.VfxGL && t<T.cageBurst){ const sd=Math.floor(t*14); for(let i=0;i<4;i++){ const a=hash(sd*4+i)*Math.PI*2; VfxGL.boltSet(g,270+Math.cos(a)*BR*0.92,300+Math.sin(a)*BR*0.92,a+Math.PI+(hash(sd+i*3)-0.5),120+80*hash(i+sd),9,sd*7+i,{core:'#120018',rim:'#c060ff',glow:'rgba(170,80,255,0.3)'}); } } }
    if(t>=T.sealBreak && t<T.sealBreak+0.25) fullFill('rgba(255,235,200,A)',0.8*(1-(t-T.sealBreak)/0.25));
    // 🪨 đá trần rơi khi tượng phình to
    if(t>=T.grow){ for(let i=0;i<26;i++){ const t0=T.grow+hash(i+90)*1.3, u=t-t0; if(u<0) continue; const x=C.BX0+200+hash(i+91)*(C.BX1-C.BX0-400), y=C.BY0+300+ 0.5*1400*u*u, r=14+30*hash(i+92);
        g.save(); g.translate(x,y); g.rotate(u*(hash(i+93)-0.5)*6); g.fillStyle='#1b1722'; g.beginPath(); for(let k=0;k<6;k++){ const a=k/6*Math.PI*2, rr=r*(0.7+0.4*h2(k,i,5)); k?g.lineTo(Math.cos(a)*rr,Math.sin(a)*rr):g.moveTo(Math.cos(a)*rr,Math.sin(a)*rr); } g.closePath(); g.fill(); g.restore(); }
      K.fog(tt,1); }
    K.fog(tt,0.6); K.motes(tt,0.7);
    K.setG(prevG);
    fullFill('rgba(14,6,26,A)',0.22);
    friendCloseups(t); joinSplit(t);
    
  }
  // ───────────────────── 🎬 CẢNH 6 · NGOÀI NÚI: tượng Friend khổng lồ phá núi chui ra, đuôi kiểu Thập Vĩ mọc từ sau lưng lên tận trời ─────────────────────
  // thung lũng rộng kiểu trận đại chiến cuối: trăng máu tròn đỏ rực, 2 vách núi xa, núi giữa (Friend phá ra), đáy thung lũng ngổn ngang đá + lửa xa
  let BG5=null, MT=null; const GND=1000, PEAKY=430, VS=0.7;
  function paintS(x0,y0,x1,y1,sc,fn){ const c=mk((x1-x0)*sc,(y1-y0)*sc), prev=g; g=c.getContext('2d'); g.setTransform(sc,0,0,sc,-x0*sc,-y0*sc); fn(); g=prev; return {c,x0,y0,w:x1-x0,h:y1-y0}; }
  function paintValley(){ return paintS(-1050,-1350,1590,2350,VS,()=>{
    let gr=g.createLinearGradient(0,-1350,0,GND); gr.addColorStop(0,'#030102'); gr.addColorStop(0.45,'#220406'); gr.addColorStop(0.85,'#5a0e08'); gr.addColorStop(1,'#8a1c0c'); g.fillStyle=gr; g.fillRect(-1050,-1350,2640,GND+1350);
    for(let i=0;i<220;i++){ g.fillStyle=`rgba(255,${200+40*hash(i+1600)|0},${190+40*hash(i+1601)|0},${0.5*hash(i+1602)})`; g.fillRect(-1050+hash(i+1603)*2640,-1350+hash(i+1604)*1500,1.6,1.6); }
    // 🌕🩸 TRĂNG MÁU tròn đỏ rực
    { const mx=270, my=-430, R=300; let mg=g.createRadialGradient(mx,my,R*0.8,mx,my,R*3.2); mg.addColorStop(0,'rgba(255,60,30,0.45)'); mg.addColorStop(1,'rgba(150,0,0,0)'); g.fillStyle=mg; g.beginPath(); g.arc(mx,my,R*3.2,0,Math.PI*2); g.fill();
      mg=g.createRadialGradient(mx-R*0.25,my-R*0.25,R*0.1,mx,my,R); mg.addColorStop(0,'#ff8a5a'); mg.addColorStop(0.55,'#d8341c'); mg.addColorStop(1,'#7a0a06'); g.fillStyle=mg; g.beginPath(); g.arc(mx,my,R,0,Math.PI*2); g.fill();
      g.save(); g.beginPath(); g.arc(mx,my,R,0,Math.PI*2); g.clip(); for(let i=0;i<14;i++){ g.fillStyle=`rgba(90,0,0,${0.15+0.2*hash(i+1650)})`; g.beginPath(); g.ellipse(mx+(hash(i+1651)-0.5)*R*1.5,my+(hash(i+1652)-0.5)*R*1.5,R*(0.08+0.18*hash(i+1653)),R*(0.06+0.14*hash(i+1654)),hash(i+1655)*3,0,Math.PI*2); g.fill(); } g.restore(); }
    for(let i=0;i<12;i++) cloud(-1050+hash(i+1700)*2640,-900+hash(i+1701)*1100,420+300*hash(i+1702),70+60*hash(i+1703),'rgba(20,4,6,1)','rgba(130,30,20,1)',0.5,i+70);   // mây đỏ hắt trăng
    // ⛰️ 3 lớp dãy núi 2 bên — THẤP, lởm chởm, bé xíu cạnh Friend (anh dặn 30/10: núi bé để thấy Friend khổng lồ)
    [[0.35,'#3a0c0c',GND-50,190],[0.6,'#260808',GND-20,150],[0.85,'#160505',GND+20,110]].forEach(([k,col,base,amp],L)=>{ g.beginPath(); g.moveTo(-1050,GND+300);
      for(let x=-1050;x<=1590;x+=12){ const v=Math.pow(Math.min(1,Math.abs(x-270)/1100),0.8), pk=Math.pow(Math.abs(Math.sin(x*0.0075+L*1.7)),0.6)*0.7+0.3*Math.pow(Math.abs(Math.sin(x*0.021+L)),0.8), y=base-amp*(0.3+0.7*v)*pk*(0.85+0.15*h2(x|0,L,9)); g.lineTo(x,y); }
      g.lineTo(1590,GND+300); g.closePath(); gr=g.createLinearGradient(0,base-amp,0,GND+300); gr.addColorStop(0,col); gr.addColorStop(1,'#050102'); g.fillStyle=gr; g.fill();
      g.save(); g.clip(); gr=g.createLinearGradient(-1050,0,1590,0); gr.addColorStop(0,'rgba(255,80,40,0)'); gr.addColorStop(0.5,`rgba(255,70,30,${0.14*k})`); gr.addColorStop(1,'rgba(255,80,40,0)'); g.fillStyle=gr; g.fillRect(-1050,base-amp,2640,amp+300); g.restore(); });
    // đáy thung lũng
    gr=g.createLinearGradient(0,GND-20,0,2350); gr.addColorStop(0,'#2a0a08'); gr.addColorStop(0.25,'#140605'); gr.addColorStop(1,'#030101'); g.fillStyle=gr; g.beginPath(); g.moveTo(-1050,GND+40); for(let x=-1050;x<=1590;x+=40) g.lineTo(x,GND+(hash(x|0)-0.5)*30+Math.abs(x-270)*0.12); g.lineTo(1590,2350); g.lineTo(-1050,2350); g.closePath(); g.fill();
    for(let i=0;i<90;i++){ const d=hash(i+1800), y=GND+40+d*d*1300, x=-1050+hash(i+1801)*2640, r=(10+60*hash(i+1802))*(0.3+d*1.4);   // đá vụn ngổn ngang (xa nhỏ, gần to)
      g.fillStyle='#0c0404'; g.beginPath(); for(let k=0;k<6;k++){ const a=Math.PI+k/5*Math.PI, rr=r*(0.6+0.5*h2(k,i,3)); k?g.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr*0.7):g.moveTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr*0.7); } g.closePath(); g.fill();
      g.strokeStyle='rgba(255,90,50,0.25)'; g.lineWidth=2; g.stroke(); }
    for(let i=0;i<26;i++){ const d=hash(i+1900), x=-1000+hash(i+1901)*2540, y=GND+60+d*700; g.fillStyle=`rgba(255,${120+80*hash(i+1902)|0},40,0.75)`; g.beginPath(); g.arc(x,y,2+5*d,0,Math.PI*2); g.fill(); const fg=g.createRadialGradient(x,y,0,x,y,30+60*d); fg.addColorStop(0,'rgba(255,100,30,0.35)'); fg.addColorStop(1,'rgba(255,60,20,0)'); g.fillStyle=fg; g.beginPath(); g.arc(x,y,30+60*d,0,Math.PI*2); g.fill(); }   // lửa cháy rải rác
  }); }
  // núi giữa (Friend phá ra) — vẽ ĐÈ lên Friend
  const MTOP=(()=>{ const P=[]; for(let i=0;i<=16;i++){ const u=i/16, x=lerp(-80,620,u); P.push([x,700+Math.abs(u-0.5)*240+(hash(i+1800)-0.5)*40]); } return P; })();
  function paintMountain(){ return paintS(-900,560,1440,1500,VS,()=>{
    const P=[[-900,GND+260],[-520,GND+60],[-200,880]].concat(MTOP).concat([[740,880],[1060,GND+60],[1440,GND+260],[1440,1500],[-900,1500]]);
    rockPoly(P,'#120608','#2c1012','#060203',33);
    g.save(); path(P); g.clip(); const gr=g.createLinearGradient(0,600,0,1100); gr.addColorStop(0,'rgba(255,90,50,0.22)'); gr.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=gr; g.fillRect(-900,560,2340,600); g.restore();   // trăng máu hắt đỉnh
  }); }
  const PEAK=(()=>{ const out=[]; for(let i=0;i<8;i++){ const x0=MTOP[i*2][0], x1=MTOP[Math.min(16,i*2+2)][0], yb0=MTOP[i*2][1], yb1=MTOP[Math.min(16,i*2+2)][1], cx=(x0+x1)/2, ty=lerp(PEAKY,yb0,Math.abs(cx-270)/350);
    out.push({P:[[x0,yb0],[x1,yb1],[lerp(x0,x1,0.7),ty+10],[lerp(x0,x1,0.3),ty]],cx,cy:(yb0+ty)/2,vx:(cx-270)*1.6+(hash(i+1900)-0.5)*120,vy:-520-300*hash(i+1901),vr:(hash(i+1902)-0.5)*5}); } return out; })();
  // 🐉 ĐUÔI kiểu THẬP VĨ: 10 đuôi to mọc từ sau lưng Friend vươn thẳng lên tận trời — CHỈ hiện BÓNG (đen tuyền, viền đỏ mờ trăng máu)
  // (anh dặn 31/10) đuôi TO, KHÔNG nhọn, CONG QUẮN về cuối, vươn qua khỏi trời · đầu mỗi đuôi là 1 BÀN TAY (kiểu Thập Vĩ)
  const TAILS6=Array.from({length:10},(_,i)=>{ const u=i/9-0.5; return {u, a0:-Math.PI/2+u*1.5, bend:-u*0.9+(hash(i+2200)-0.5)*0.5, curl:(i%2?1:-1)*(2.6+1.6*hash(i+2205)), L:2900+700*hash(i+2201), w:200+70*hash(i+2202), dl:Math.abs(u)*0.5+hash(i+2203)*0.25, ph:hash(i+2204)*6, hand:i%3}; });
  function tail(bx,by,T6,k,t){ const N=34, L=T6.L*k, pts=[]; let x=bx, y=by, a=T6.a0;
    for(let n=0;n<=N;n++){ const s=n/N; pts.push([x,y,a]); a+=T6.bend/N+(s>0.55?T6.curl*k*(s-0.55)*2.2/N:0)+Math.sin(t*1.2+T6.ph+s*3.2)*0.06*s; x+=Math.cos(a)*L/N; y+=Math.sin(a)*L/N; }   // nửa cuối cuộn quắn
    const side=sg=>pts.map(([x,y,a],n)=>{ const s=n/N, w=T6.w*(1-s*0.3)*(0.6+0.4*k); return [x+Math.cos(a+sg*Math.PI/2)*w/2, y+Math.sin(a+sg*Math.PI/2)*w/2]; });   // gần như KHÔNG thon — đuôi to tới tận đầu
    const P=side(1).concat(side(-1).reverse()); g.beginPath(); P.forEach((q,n)=>n?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1])); g.closePath(); return pts[N]; }
  // ✋ bàn tay ở đầu đuôi: ảnh tay bóng đen có sẵn (ngón chĩa sang PHẢI) → xoay theo hướng đuôi, đen tuyền như đuôi
  const TAILHAND=['HAND_grip','HAND_slap','HAND_lunge'].map(n=>A('assets/img/scaredhamster/'+n+'.webp'));
  function tailHand(tip,T6,k){ const hc=prep(TAILHAND[T6.hand]); if(!hc || !tip) return; const L=T6.w*2.4*(0.6+0.4*k), Hh=L*hc.sh/hc.sw;
    g.save(); g.translate(tip[0],tip[1]); g.rotate(tip[2]); g.drawImage(hc.src,hc.sx,hc.sy,hc.sw,hc.sh,-L*0.12,-Hh/2,L,Hh); g.restore(); }
  const FR6_H=1750, FR6_BASE=1480;   // 🐈‍⬛ Friend cảnh cuối TO thêm ~52% (1150 → 1750, anh dặn 31/10): đỉnh tai gần chạm trăng máu (tâm y −430, bán kính 300); chân vẫn khuất sau núi (núi vẽ tới y 1500)
  let FRT=null;
  function frTint(fr){ if(FRT) return FRT; const o=mk(fr.sw,fr.sh), x=o.getContext('2d'); x.drawImage(fr.src,fr.sx,fr.sy,fr.sw,fr.sh,0,0,fr.sw,fr.sh);
    x.globalCompositeOperation='multiply'; x.fillStyle='rgba(200,90,90,0.35)'; x.fillRect(0,0,fr.sw,fr.sh); x.globalCompositeOperation='destination-in'; x.drawImage(fr.src,fr.sx,fr.sy,fr.sw,fr.sh,0,0,fr.sw,fr.sh); return FRT=o; }
  function scene6(t){
    const K=window._l2e2Kit, fr=K&&prep(K.imgs()[1]);
    drawBG(BG5);
    // 🐉 đuôi Thập Vĩ (vẽ TRƯỚC Friend → mọc ra từ sau lưng)
    if(fr && t>=T.hands){ const HS=FR6_H, base=FR6_BASE, bx=270, by=base-HS*0.42;
      for(const T6 of TAILS6){ const k=eout(seg(t,T.hands+T6.dl,T.hands+T6.dl+1.6)); if(k<=0.01) continue; const x0=bx+T6.u*HS*0.5;
        g.save(); const tip=tail(x0,by,T6,k,t); g.shadowColor='rgba(255,40,30,0.55)'; g.shadowBlur=26*SC*cam(t)[2]; g.fillStyle='#070103'; g.fill(); tailHand(tip,T6,k); g.restore(); } }
    // 🐈‍⬛ Friend THẬT trồi lên từ lòng núi → thoát hẳn → gầm
    if(fr){ const rise=eio(seg(t,T.rise,T.free)), HS=FR6_H, WS=HS*fr.sw/fr.sh, roarK=t>=T.roar?Math.exp(-(t-T.roar)*2.2)*Math.sin(Math.min(1,(t-T.roar)*6)*Math.PI*0.5):0;
      const base=lerp(FR6_BASE+900,FR6_BASE,rise)+(t<T.free?Math.sin(t*30)*5:0), sc=1+0.07*roarK, x0=270-WS*sc/2, y0=base-HS*sc;
      g.save(); g.globalCompositeOperation='lighter'; glow(270,y0+HS*0.35,760,0.22*rise+0.3*roarK,'200,30,30'); g.restore();
      const FT=frTint(fr); g.drawImage(FT,0,0,FT.width,FT.height,x0,y0,WS*sc,HS*sc);   // ánh trăng máu nhuộm đỏ (nhuộm SẴN trên hình — trước đây nhuộm cả khung chữ nhật quanh Friend, lùi xa thấy rõ)
      g.save(); g.globalCompositeOperation='lighter'; const r=HS*0.05*(1+0.25*Math.sin(t*7)+0.8*roarK);
      for(const [u,v,col] of FR_EYES){ const ex=x0+u*WS*sc, ey=y0+v*HS*sc; glow(ex,ey,r*2.6,0.95,col); glow(ex,ey,r*0.8,1,'255,250,240'); } g.restore();
      if(t>=T.roar){ const u=t-T.roar; g.save(); for(let k=0;k<4;k++){ const ph=u*0.9-k*0.25; if(ph<0||ph>1) continue;   // 🔊 sóng gầm toả ra
          g.strokeStyle=`rgba(255,80,60,${0.6*(1-ph)})`; g.lineWidth=18*(1-ph)+2; g.beginPath(); g.ellipse(270,y0+HS*0.62*sc,200+1500*ph,(200+1500*ph)*0.45,0,0,Math.PI*2); g.stroke(); } g.restore(); } }
    drawBG(MT);
    const u=Math.max(0,t-T.out-0.1);   // đỉnh núi nổ tung thành từng tảng (không vết nứt)
    for(const c of PEAK){ const dx=c.vx*u, dy=c.vy*u+0.5*900*u*u; if(c.cy+dy>2000) continue; g.save(); g.translate(c.cx+dx,c.cy+dy); g.rotate(c.vr*u); g.translate(-c.cx,-c.cy); rockPoly(c.P,'#120608','#2c1012','#060203'); g.restore(); }
    if(u>0 && u<3){ g.save(); for(let i=0;i<16;i++){ const ph=Math.min(1,u/3), x=270+(hash(i+2000)-0.5)*900*ph, y=700-ph*320*hash(i+2001), r=70+190*ph*hash(i+2002); g.fillStyle=`rgba(46,20,22,${0.5*(1-ph)})`; g.beginPath(); g.arc(x,y,r,0,Math.PI*2); g.fill(); } g.restore(); }
    fog(t,GND+30,0.22,'70,20,20'); fog(t+7,GND+500,0.16,'60,16,16');
    if(t>=T.roar && t<T.roar+0.5) fullFill('rgba(255,40,30,A)',0.35*(1-(t-T.roar)/0.5));
    if(t<T.out+0.35) fullFill('rgba(255,240,230,A)',1-seg(t,T.out,T.out+0.35));
  }
  // ───────────────────── ✨ HẬU KỲ (VfxGL — bộ lọc pixi-filters, MIT) ─────────────────────
  // sóng bóp méo lúc tảng đá vỡ / dung nham bắn / phong ấn lớn bung / Friend gầm · XOẮN (twist) CHỈ ở cổng Kamui · zoom blur lúc phong ấn loé · god rays trăng máu
  let PA=null, PB=null;
  function postFX(t,cx,cy,z){ if(!window.VfxGL || !VfxGL.fx) return W2; let src=W2; const F=VfxGL.fx, S=SC*z, dev=(x,y)=>[SC*(VW/2+(x-cx)*z), SC*(VH/2+(y-cy)*z)];
    const step=o=>{ if(!o) return; const d=(src===PA)?(PB||(PB=mk(1,1))):(PA||(PA=mk(1,1))); if(d.width!==o.width||d.height!==o.height){ d.width=o.width; d.height=o.height; } const x=d.getContext('2d'); x.clearRect(0,0,d.width,d.height); x.drawImage(o,0,0); src=d; };
    try{
      if(t<T.s2){ for(const [ts,xx,yy] of [[TF.blast,FC[0],FC[1]],[TF.land,GRX,LO]]) if(t>=ts && t<ts+0.7){ const [x,y]=dev(xx,yy); step(F.shockwave(src,{x,y,time:t-ts,speed:600*S,amplitude:18*S,wavelength:120*S,brightness:1.05})); }
        if(t>=T.crush && t<T.crush+0.9){ const [x,y]=dev(GRX,LO+30); step(F.shockwave(src,{x,y,time:t-T.crush,speed:700*S,amplitude:26*S,wavelength:140*S,brightness:1.1})); }
        if(t>=T.splash && t<T.splash+0.8){ const [x,y]=dev(GRX+20,LAVA); step(F.shockwave(src,{x,y,time:t-T.splash,speed:800*S,amplitude:30*S,wavelength:170*S,brightness:1.15})); }
        let gk=0; for(const w of KW){ const u=seg(t,w.t0,w.t1); if(u<=0||u>=1) continue; const [x,y]=dev(w.x,w.y), k=Math.sin(Math.PI*u); gk=Math.max(gk,k); step(F.twist(src,{x,y,radius:w.rad*S,angle:w.ang*k})); }
        if(gk>0.01) step(F.adjust(src,{saturation:1-0.7*gk,brightness:1-0.12*gk})); }   // 🌀 XOẮN KHÔNG GIAN — hiệu ứng ĐỘC QUYỀN của Kamui (anh dặn 30/10: không dùng twist chỗ khác)
      else if(t>=T.cave && t<T.out){ if(t>=T.join && t<T.join+0.8){ const [x,y]=dev(270,300); step(F.shockwave(src,{x,y,time:t-T.join,speed:900*S,amplitude:22*S,wavelength:200*S})); }
        if(t>=T.sealBreak && t<T.sealBreak+0.35){ const [x,y]=dev(270,300); step(F.zoomBlur(src,{x,y,strength:0.18*(1-seg(t,T.sealBreak,T.sealBreak+0.35)),inner:40*S})); } }
      else if(t>=T.out){ const [mx,my]=dev(270,-430); step(F.godray(src,{parallel:false,x:mx,y:my,gain:0.5,lacunarity:2.6,alpha:0.2,time:t*0.5}));
        if(t>=T.roar && t<T.roar+1.0){ const [x,y]=dev(270,700); step(F.shockwave(src,{x,y,time:t-T.roar,speed:1100*S,amplitude:36*S,wavelength:240*S,brightness:1.2})); } }
    }catch(e){ console.warn('ep3 postFX',e); }
    return src; }
  // ───────────────────── 🖼️ VẼ 1 KHUNG ─────────────────────
  function frame(now){ if(OFF) return; raf=requestAnimationFrame(frame); if(!ready) return; renderAt(paused?pauseT:(now-t0)/1000); }
  // 📼 2 TẬP chung 1 dòng thời gian: tập đang chiếu = đoạn [OFFS, OFFS+PDUR] — đồng hồ phát/tua/xuất video tính theo giây TRONG TẬP
  let PART=1, OFFS=0, PDUR=PARTS2[1].b;
  function renderAt(rel){ rel=clamp(rel,0,PDUR); renderAbs(rel+OFFS);
    if(PART>1 && rel<0.6){ g.fillStyle=`rgba(0,0,0,${1-rel/0.6})`; g.fillRect(0,0,VW,VH); }   // tập 4 mở từ màn đen
    if(panel) panel.update(); }
  function renderAbs(t){
    if(OFF) markOnly=true;
    for(let i=0;i<SFX_PLAN.length;i++){ const s=SFX_PLAN[i]; if(t>=s[0] && s[0]>=OFFS-0.05 && s[0]<OFFS+PDUR) sfx('s'+i,s[1],s[2],s[3]||null); }
    const [cx,cy,z]=cam(t);
    w2.setTransform(1,0,0,1,0,0); w2.fillStyle='#000'; w2.fillRect(0,0,W2.width,W2.height);
    w2.setTransform(SC*z,0,0,SC*z,SC*(VW/2-cx*z),SC*(VH/2-cy*z)); g=w2;
    if(t<T.s2) scene1(t); else if(t<T.lab) scene2(t); else if(t<T.army) scene3(t); else if(t<T.cave) scene4(t); else if(t<T.out) scene5(t); else scene6(t);
    const SRC=postFX(t,cx,cy,z);
    g=cv.getContext('2d'); g.setTransform(1,0,0,1,0,0); g.drawImage(SRC,0,0); g.setTransform(SC,0,0,SC,0,0);
    { const vg=g.createRadialGradient(VW/2,VH/2,VH*0.25,VW/2,VH/2,VH*0.75); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(0,0,0,0.55)'); g.fillStyle=vg; g.fillRect(0,0,VW,VH); }
    dialog(t); title(t);   /* (bỏ kính màn hình nứt — hiệu ứng UI của game, anh bảo không hợp phim 30/10) */
    if(t<0.6){ g.fillStyle=`rgba(0,0,0,${1-t/0.6})`; g.fillRect(0,0,VW,VH); }
    for(const [k,sec] of GAPS){ const b=T[k], a=b-sec, al=t<a?seg(t,a-0.6,a):(t<b?1:1-seg(t,b,b+0.6)); if(al>0){ g.fillStyle=`rgba(0,0,0,${al})`; g.fillRect(0,0,VW,VH); } }   // ⏸️ chuyển cảnh: mờ dần → đen lặng → hiện dần
    if(t>=T.fade1 && t<T.s2+0.5){ g.fillStyle=`rgba(0,0,0,${t<T.s2?seg(t,T.fade1,T.s2):1-seg(t,T.s2,T.s2+0.5)})`; g.fillRect(0,0,VW,VH); }
    if(t>T.fade){ g.fillStyle=`rgba(0,0,0,${seg(t,T.fade,DUR)})`; g.fillRect(0,0,VW,VH); }
    markOnly=false;
  }
  function build(){ for(const k in IMG) prep(IMG[k]); BG1=paintVolcano(); BG2=paintShore(); BG3=paintLab(); BG4=paintHall(); BG5=paintValley(); MT=paintMountain(); BURN=buildBurn(); try{ if(window._l2e2Kit){ _l2e2Kit.build(); } }catch(e){ console.warn('l2e2 kit',e); } try{ if(typeof _saDemonBuild==='function') _saDemonBuild(); }catch(e){} }
  const curT=()=>paused?pauseT:(performance.now()-t0)/1000;
  function seek(sec){ sec=clamp(sec,0,PDUR); try{ stopAllLongSfx(); }catch(e){} played={}; markOnly=true; if(paused) pauseT=sec; else t0=performance.now()-sec*1000; }
  function toggle(){ if(paused){ if(pauseT>=PDUR-0.05) pauseT=0; t0=performance.now()-pauseT*1000; paused=false; } else { pauseT=curT(); paused=true; } }
  function stop(){ if(raf) cancelAnimationFrame(raf); raf=null; try{ stopAllLongSfx(); }catch(e){} if(window._cinePanelRemove) _cinePanelRemove(); panel=null; if(overlay) overlay.remove(); overlay=null; }
  window._cineL2E3=function(opts){
    if(overlay) return;
    PART=(opts&&opts.part===2)?2:1; OFFS=PARTS2[PART].a; PDUR=PARTS2[PART].b-OFFS;
    const SCALE=(opts&&opts.scale)||1;
    overlay=document.createElement('div');
    overlay.style.cssText='position:fixed;inset:0;z-index:99999;background:#000;display:flex;align-items:center;justify-content:center;';
    cv=document.createElement('canvas'); cv.width=Math.round(1080*SCALE); cv.height=Math.round(1920*SCALE); SC=cv.width/VW;
    cv.style.cssText='height:100vh;max-width:100vw;aspect-ratio:9/16;object-fit:contain;';
    W2=mk(cv.width,cv.height); w2=W2.getContext('2d');
    overlay.appendChild(cv); document.body.appendChild(overlay);
    { const x=cv.getContext('2d'); x.fillStyle='#000'; x.fillRect(0,0,cv.width,cv.height); x.fillStyle='rgba(255,255,255,0.5)'; x.font='40px system-ui'; x.textAlign='center'; x.fillText('Loading…',cv.width/2,cv.height/2); }
    if(opts&&opts.offline) OFF={};
    if(window._cinePanelMake && !OFF) panel=_cinePanelMake(overlay,{ title:PARTS2[PART].title, dur:()=>PDUR, t:()=>ready?Math.min(curT(),PDUR):0, playing:()=>ready && !paused && curT()<PDUR,
      toggle:()=>{ if(!ready) return; if(!paused && curT()>=PDUR) seek(0); else toggle(); }, seek:s=>{ if(ready) seek(s); }, replay:()=>{ if(!ready) return; paused=false; seek(0); markOnly=false; }, close:()=>{ stop(); if(window.openCinema) openCinema('__lore2'); } });
    try{ stopAllBattleMusic(); }catch(e){}
    const all=[...Object.values(IMG),SA_DEMON_INK,SA_DEMON_GLOW];
    const kitP=window._l2e2Kit?Promise.resolve():new Promise(r=>{ const v=window.GAME_VERSION?'?v='+GAME_VERSION.build:'', s=document.createElement('script'); s.src='js/cine-lore2ep2.js'+v; s.onload=r; s.onerror=r; document.body.appendChild(s); });
    kitP.then(()=>Promise.all(window._l2e2Kit?_l2e2Kit.imgs().map(im=>im.decode?im.decode().catch(()=>{}):0):[])).then(()=>Promise.all([...all.map(im=>im.decode?im.decode().catch(()=>{}):Promise.resolve()), document.fonts?document.fonts.load('18px "Press Start 2P"').catch(()=>{}):Promise.resolve()])).then(()=>{ if(!overlay) return;
      if(!ready){ build(); ready=true; } paused=false; played={}; t0=performance.now(); });
    paused=false; played={}; t0=performance.now(); if(!OFF) raf=requestAnimationFrame(frame);
  };
  window._cineL2E3Ready=()=>ready;
  window._cineL2E3Step=R=>{ if(OFF && ready) renderAt(R); };
  window._cineL2E3Info=()=>({dur:PDUR, sfx:SFX_PLAN.filter(e=>e[0]>=OFFS-0.05 && e[0]<OFFS+PDUR).map(([a,k,v,d])=>[Math.max(0,a-OFFS),k,v,d]), mus:[]});
  window._cineL2E3Stop=stop;
  window._cineL2E3Canvas=()=>cv;
})();
