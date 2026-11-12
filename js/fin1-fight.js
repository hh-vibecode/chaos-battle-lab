// ⚔️ BỘ BIÊN ĐẠO CHUNG cho 3 TRẬN PHỤ của Meme Lore · Final (11/11/2026) — fin1f1 / fin1f2 / fin1f3 (cách làm chép từ js/film-fin1c4.js).
//   const W=Fin1Fight;
//   W.track(KEYS,t)  KEYS=[[giây, x, ảnh, kiểu chuyển ('ein'|'eout'|'back'|'lin'|'eio'), nhoè 0/1, z, y], …] → {x,z,y,im,sm:{dx,dy,dz}|null}
//                    giữa 2 khoá: x/z/y nội suy theo kiểu chuyển của khoá SAU; ảnh = ảnh của khoá gần nhất đã qua. z/y bỏ trống = giữ như khoá trước.
//   W.hstop([[giây chạm, dài khựng], …]) → hs(t): nhân vật ĐỨNG HÌNH trong lúc khựng (hiệu ứng / máy / rung vẫn chạy) — mẹo combat số 3.
//   W.actor(F,{img,key,x,y,z,h,look:{x,z}|null, …K.sprite}) — tự LẬT ảnh cho mặt nhìn về phía đối thủ TRÊN MÀN HÌNH (DIR: −1 ảnh nhìn trái, 1 phải, 0 chính diện).
//   W.smearFrame(F,k) — khung nhoè nối cảnh (fight-1 1:22.4…). W.line / W.taper / W.text3 / W.beam / W.ice / W.kamui — xem từng hàm.
(function(){
  if(window.Fin1Fight) return;
  const K=CineKit, {seg,lerp,clamp,hash}=K, E=K.EASE, TAU=Math.PI*2;
  const backOut=k=>{ const c=1.9, u=k-1; return 1+(c+1)*u*u*u+c*u*u; };
  const EZ={ein:E.ein, eout:E.eout, eio:E.eio, back:backOut, lin:k=>k};
  function track(KEYS,t){ let x=KEYS[0][1], z=KEYS[0][5]||0, y=KEYS[0][6]||0, im=KEYS[0][2], sm=null;
    const zs=[], ys=[]; let zc=z, yc=y; for(const k of KEYS){ if(k[5]!=null) zc=k[5]; if(k[6]!=null) yc=k[6]; zs.push(zc); ys.push(yc); }
    if(t<=KEYS[0][0]) return {x,z:zs[0],y:ys[0],im,sm};
    for(let i=1;i<KEYS.length;i++){ const A=KEYS[i-1], B=KEYS[i];
      if(t<B[0]){ const k=seg(t,A[0],B[0]), e=(EZ[B[3]]||EZ.lin)(k);
        x=lerp(A[1],B[1],e); z=lerp(zs[i-1],zs[i],e); y=lerp(ys[i-1],ys[i],e); im=A[2];
        if(B[4]){ const d=Math.max(0.05,B[0]-A[0]); sm={dx:(B[1]-A[1])/d*0.05, dy:(ys[i]-ys[i-1])/d*0.05, dz:(zs[i]-zs[i-1])/d*0.05, n:4}; }
        return {x,z,y,im,sm}; } }
    const L=KEYS[KEYS.length-1]; return {x:L[1],z:zs[zs.length-1],y:ys[ys.length-1],im:L[2],sm:null}; }
  const hstop=L=>t=>{ for(const [a,d] of L) if(t>=a&&t<a+d) return a; return t; };
  // lật mặt: so vị trí TRÊN MÀN HÌNH của mình và đối thủ (máy bay vòng ra sau vẫn đúng)
  // 🎥 ĐA GÓC (12/11, anh: "điểm yếu nhất là đa góc nhân vật"): o.views={front,q3f,side,q3b,back} = ảnh cùng 1 động tác nhìn từ nhiều phía
  //   (ảnh nghiêng / 3/4 vẽ quay mặt TRÁI). Hướng nhân vật = về phía o.look (hoặc o.face=[dx,dz]); so với hướng máy → chọn ảnh + lật khi nhìn sang phải màn hình.
  //   Thiếu góc nào thì lấy góc gần nhất có ảnh. Trả về độ lật (như cũ) — o.views dùng thay cho o.key.
  function pickView(F,o){ const V=o.views, B=F.B; let fx=o.face?o.face[0]:(o.look?o.look.x-o.x:0), fz=o.face?o.face[1]:(o.look?(o.look.z||0)-(o.z||0):0); const L=Math.hypot(fx,fz)||1; fx/=L; fz/=L;
    const toCam=-(fx*B.f[0]+fz*B.f[2]), right=fx*B.r[0]+fz*B.r[2], ang=Math.abs(Math.atan2(right,toCam))*180/Math.PI;   // 0 = nhìn thẳng vào máy · 180 = quay lưng
    const order=ang<22.5?['front','q3f','side']:ang<67.5?['q3f','front','side']:ang<112.5?['side','q3f','q3b']:ang<157.5?['q3b','back','side']:['back','q3b','side'];
    const n=order.find(m=>V[m]&&F.I[V[m]]), k=n&&V[n], face=(o.vface&&o.vface[n])||-1;   // o.vface={q3f:1}: ảnh góc đó vẽ quay PHẢI
    return {key:k, flip:(n!=='front'&&n!=='back')&&(face<0?right>0:right<0)}; }
  function actor(F,o){ if(o.views){ const pv=pickView(F,o); if(!pv.key) return false; o=Object.assign({},o,{key:pv.key,flip:pv.flip,dir:0,look:null}); }
    const c=F.I[o.key]; if(!c) return; let flip=!!o.flip; const dir=o.dir||0;
    if(o.look&&dir){ const r=F.B.r, side=(o.look.x-o.x)*r[0]+((o.look.z||0)-(o.z||0))*r[2];   // so theo HƯỚNG NGANG của máy (đối thủ ngoài khung / sau lưng máy vẫn đúng)
      if(Math.abs(side)>1){ const want=side<0?-1:1; flip=want!==dir; } }
    if(o.dry){ F._actorKey=o.key; return flip; }   // dry: chỉ tính ảnh + lật (để vẽ đồ vật PHÍA SAU nhân vật trước)
    K.sprite(F,Object.assign({},o,{img:c,flip})); F._actorKey=o.key; return flip; }   // trả về ảnh có bị lật không (để gắn đồ vật vào tay đúng phía) · F._actorKey = ảnh vừa dùng (đa góc)
  let SMC=null;
  function smearFrame(F,k){ const c=F.g.canvas, g=F.g; if(!SMC) SMC=document.createElement('canvas'); if(SMC.width!==c.width||SMC.height!==c.height){ SMC.width=c.width; SMC.height=c.height; }
    SMC.getContext('2d').drawImage(c,0,0); g.save(); g.setTransform(1,0,0,1,0,0); const N=9, W=c.width*k;
    for(let i=1;i<=N;i++){ g.globalAlpha=1/(i+1); const o=W*(i/N-0.35); g.drawImage(SMC,o-Math.abs(W)*0.04,-c.height*0.02,c.width*1.08,c.height*1.04); }
    g.restore(); K.panLines(F,{k:0.9,ang:0,n:34}); }
  // đường cong qua các điểm thế giới (dây chuông, dây móc): pts=[[x,y,z],…] · w = bề dày (đơn vị thế giới) · d = lệch sâu để xếp lớp
  function line(F,pts,w,col,o){ o=o||{}; const P=pts.map(p=>K.proj(F.B,p[0],p[1],p[2])); if(P.some(p=>!p)) return; const dd=Math.min(...P.map(p=>p.d))+(o.d||-8);
    F.list.push({d:dd, fn:()=>{ const g=F.g; g.save(); g.lineCap='round'; g.lineJoin='round'; if(o.glow){ g.globalCompositeOperation='lighter'; g.strokeStyle=o.glow; g.lineWidth=Math.max(2,w*3*P[0].s); g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y)); g.stroke(); g.globalCompositeOperation='source-over'; }
      g.strokeStyle=col; g.lineWidth=Math.max(1,w*P[0].s); g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y)); g.stroke(); g.restore(); }}); }
  // khối THON (lưỡi Mlem): từ gốc to → ngọn tròn; pts thế giới, w0 → w1
  function taper(F,pts,w0,w1,fill,o){ o=o||{}; const P=pts.map(p=>K.proj(F.B,p[0],p[1],p[2])); if(P.some(p=>!p)||P.length<2) return; const dd=Math.min(...P.map(p=>p.d))+(o.d||-12);
    F.list.push({d:dd, fn:()=>{ const g=F.g, L=[], R=[], n=P.length; for(let i=0;i<n;i++){ const a=P[Math.max(0,i-1)], b=P[Math.min(n-1,i+1)], dx=b.x-a.x, dy=b.y-a.y, l=Math.hypot(dx,dy)||1, w=lerp(w0,w1,i/(n-1))*P[i].s/2;
        L.push([P[i].x-dy/l*w,P[i].y+dx/l*w]); R.push([P[i].x+dy/l*w,P[i].y-dx/l*w]); }
      g.save(); g.beginPath(); L.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); const T=P[n-1], tw=w1*T.s/2; g.arc(T.x,T.y,tw,0,TAU); for(let i=n-1;i>=0;i--) g.lineTo(R[i][0],R[i][1]); g.closePath();
      g.fillStyle=fill; g.fill(); if(o.stroke){ g.strokeStyle=o.stroke; g.lineWidth=Math.max(1,1.2*P[0].s); g.stroke(); }
      if(o.shine){ g.strokeStyle='rgba(255,255,255,0.45)'; g.lineWidth=Math.max(1,w0*0.12*P[0].s); g.beginPath(); P.forEach((p,i)=>{ const q=[(L[i][0]*0.65+R[i][0]*0.35),(L[i][1]*0.65+R[i][1]*0.35)]; i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]); }); g.stroke(); }
      g.restore(); }}); }
  // chữ nằm trong thế giới (meme text Doge, HUH, POP): cỡ px theo khoảng cách; o.font, o.col, o.stroke, o.rot (độ), o.a, o.glow
  function text3(F,x,y,z,txt,size,o){ o=o||{}; const P=K.proj(F.B,x,y,z); if(!P) return; const px=size*P.s; if(px<3) return;
    F.list.push({d:P.d+(o.d||-15), fn:()=>{ const g=F.g; g.save(); g.translate(P.x,P.y); g.rotate((o.rot||0)*Math.PI/180); g.globalAlpha=o.a==null?1:o.a; g.textAlign='center'; g.textBaseline='middle';
      g.font=`${o.weight||900} ${px}px ${o.font||'"Comic Sans MS","Comic Neue",cursive'}`; if(o.glow){ g.shadowColor=o.glow; g.shadowBlur=px*0.5; }
      g.lineJoin='round'; g.lineWidth=Math.max(2,px*0.14); g.strokeStyle=o.stroke||'#120a10'; g.strokeText(txt,0,0); g.shadowBlur=0; g.fillStyle=o.col||'#fff'; g.fillText(txt,0,0); g.restore(); }}); }
  // tia sáng giữa 2 điểm thế giới: lõi trắng + vỏ màu + quầng; w = bề dày thế giới
  function beam(F,A,B,w,col,a,o){ o=o||{}; const P=K.proj(F.B,...A), Q=K.proj(F.B,...B); if(!P||!Q||a<=0.01) return;
    F.list.push({d:Math.min(P.d,Q.d)+(o.d||-20), fn:()=>{ const g=F.g, s=(P.s+Q.s)/2; g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round';
      for(const [k,c,al] of [[3.2,col,0.25],[1.6,col,0.6],[0.55,'255,255,255',1]]){ g.strokeStyle=`rgba(${c},${al*a})`; g.lineWidth=Math.max(1,w*k*s); g.beginPath(); g.moveTo(P.x,P.y); g.lineTo(Q.x,Q.y); g.stroke(); }
      g.restore(); }}); }
  // ĐÓNG BĂNG (Mlem): phủ băng xanh trắng lên cả người (ảnh nhuộm băng) + tinh thể băng nhọn bám quanh + hơi lạnh
  function ice(F,o,a,t){ const c=K.prep(F.I[o.key]); if(!c||a<=0.01) return; const P=K.proj(F.B,o.x,o.y||0,o.z); if(!P) return; const h=o.h*P.s, w=h*c.sw/c.sh;
    F.list.push({d:P.d-6, fn:()=>{ const g=F.g; g.save(); g.globalAlpha=a*0.72; const ic=K.tinted(c,'rgb(190,232,255)');
      if(o.flip){ g.translate(P.x,0); g.scale(-1,1); g.translate(-P.x,0); } g.drawImage(ic,P.x-w/2,P.y-h,w,h); g.restore();
      g.save(); g.globalAlpha=a; for(let i=0;i<16;i++){ const s=i*3.7+(o.seed||0), bx=P.x+(hash(s)-0.5)*w*0.95, by=P.y-h*(0.05+0.9*hash(s+1)), L=h*(0.1+0.16*hash(s+2)), an=-Math.PI/2+(hash(s+3)-0.5)*2.2;
        const gr=g.createLinearGradient(bx,by,bx+Math.cos(an)*L,by+Math.sin(an)*L); gr.addColorStop(0,'rgba(170,220,255,0.85)'); gr.addColorStop(1,'rgba(255,255,255,0.95)'); g.fillStyle=gr;
        g.beginPath(); g.moveTo(bx+Math.cos(an+1.57)*L*0.18,by+Math.sin(an+1.57)*L*0.18); g.lineTo(bx+Math.cos(an)*L,by+Math.sin(an)*L); g.lineTo(bx+Math.cos(an-1.57)*L*0.18,by+Math.sin(an-1.57)*L*0.18); g.closePath(); g.fill();
        g.strokeStyle='rgba(255,255,255,0.9)'; g.lineWidth=1; g.stroke(); }
      g.globalCompositeOperation='lighter'; for(let i=0;i<10;i++){ const ph=((t||0)*0.6+hash(i*5.1))%1; g.globalAlpha=a*0.35*(1-ph); g.fillStyle='#e8f6ff'; const r=h*0.08*(0.5+ph);
        g.beginPath(); g.arc(P.x+(hash(i*2.2)-0.5)*w,P.y-h*(0.2+0.7*hash(i*3.3))-ph*h*0.2,r,0,TAU); g.fill(); }
      g.restore(); }}); }
  // 🌀 KAMUI — CHÉP ĐÚNG bản trong game (js/game.js `_njKamuiTickDraw` + `_njKamuiSwirl`, anh dặn 11/11: chiêu phải chuẩn, không tự chế):
  //    ① vùng quanh tâm bị XOẮN THẬT (VfxGL.fx.twist — hiệu ứng ĐỘC QUYỀN của Kamui) + bạc màu, mép mềm; ② dải mực đen mép rách cuộn xoắn ốc vào 1 tâm,
  //    đường xoắn mảnh, vạch tốc độ; ③ lõi đen. u = tiến độ 0→1 (mạnh nhất ở giữa, sin). o.dir ±1 chiều xoắn (hút = 1, nhả = −1).
  //    o.mode 'phase' = XUYÊN THẤU (Obito: đòn đi xuyên qua người như không tồn tại) → chỉ xoắn méo vùng thân + đường xoắn mảnh, KHÔNG dải mực / lõi đen.
  //    o.angle = độ xoắn tối đa (game 4.5) · r = bán kính thế giới (game: R = cỡ nhân vật × 1.9)
  let KTMP=null;
  function kamuiSwirl(g,x,y,u,R,dir,phase){ const kk=Math.sin(Math.PI*u), r0=R*(0.35+0.65*(1-(1-Math.min(1,u*2.2))**2)), rot=u*9*dir, h=(a,b,c)=>{ const v=Math.sin(a*127.1+b*311.7+c*74.7)*43758.5453; return v-Math.floor(v); };
    g.save(); g.translate(x,y); g.scale(dir,1); g.lineCap='round';
    for(let k=0;k<12;k++){ g.beginPath(); const a0=k/12*TAU+rot*0.6; for(let i=0;i<=28;i++){ const q=i/28, r=r0*(0.05+1.15*q), a=a0+q*2.4; i?g.lineTo(Math.cos(a)*r,Math.sin(a)*r):g.moveTo(Math.cos(a)*r,Math.sin(a)*r); }
      g.strokeStyle=`rgba(28,28,32,${(phase?0.3:0.4)*kk})`; g.lineWidth=Math.max(1,R*0.008); g.stroke(); }   // đường xoắn mảnh
    if(!phase){
      for(let k=0;k<20;k++){ const a=-0.8+k/20*1.6+rot*0.25, ra=r0*0.58, rb=r0*(0.7+0.1*h(k,1,3)); g.strokeStyle=`rgba(22,22,26,${0.55*kk})`; g.lineWidth=Math.max(1,R*0.01);
        g.beginPath(); g.moveTo(Math.cos(a)*ra,Math.sin(a)*ra); g.lineTo(Math.cos(a)*rb,Math.sin(a)*rb); g.stroke(); }   // vạch tốc độ
      for(let b=0;b<4;b++){ const a0=b/4*TAU+rot, N=40, out=[], inn=[];   // dải mực to, mép rách
        for(let i=0;i<=N;i++){ const q=i/N, a=a0+q*3.6, r=r0*(0.06+0.98*q), w=r0*0.09*Math.sin(Math.PI*Math.min(1,q*1.12))*(0.75+0.5*h(i,b,7)), jg=(h(i,b,9)-0.5)*w*0.6;
          out.push([Math.cos(a)*(r+w/2+jg),Math.sin(a)*(r+w/2+jg)]); inn.push([Math.cos(a)*(r-w/2),Math.sin(a)*(r-w/2)]); }
        g.beginPath(); out.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); inn.reverse().forEach(p=>g.lineTo(p[0],p[1])); g.closePath();
        g.fillStyle=`rgba(12,12,16,${0.88*kk})`; g.fill(); g.strokeStyle=`rgba(110,110,120,${0.35*kk})`; g.lineWidth=1; g.stroke(); }
      const gr=g.createRadialGradient(0,0,0,0,0,r0*0.13); gr.addColorStop(0,`rgba(0,0,0,${0.9*kk})`); gr.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=gr; g.beginPath(); g.arc(0,0,r0*0.13,0,TAU); g.fill(); }
    g.restore(); }
  function kamui(F,x,y,z,r,u,o){ o=o||{}; if(!(u>0&&u<1)) return; const P=K.proj(F.B,x,y,z); if(!P) return; const R=r*P.s, dir=o.dir||1, phase=o.mode==='phase';
    F.list.push({d:P.d+(o.d==null?-40:o.d), fn:()=>{ const g=F.g, cv=g.canvas, M=g.getTransform(), sc=Math.hypot(M.a,M.b)||1, kk=Math.sin(Math.PI*u);
      if(window.VfxGL&&VfxGL.fx){ const p=M.transformPoint(new DOMPoint(P.x,P.y)), RR=Math.round(R*1.25*sc), x0=Math.max(0,Math.round(p.x-RR)), y0=Math.max(0,Math.round(p.y-RR)), w=Math.min(cv.width-x0,RR*2), h=Math.min(cv.height-y0,RR*2);
        if(w>8&&h>8){ const c=KTMP||(KTMP=document.createElement('canvas')); c.width=w; c.height=h; const x=c.getContext('2d'); x.drawImage(cv,x0,y0,w,h,0,0,w,h);
          const o1=VfxGL.fx.twist(c,{x:p.x-x0,y:p.y-y0,radius:RR*0.95,angle:(o.angle||4.5)*kk*dir}); if(o1){ x.clearRect(0,0,w,h); x.drawImage(o1,0,0); }
          const o2=VfxGL.fx.adjust(c,{saturation:1-(phase?0.45:0.7)*kk,brightness:1-0.1*kk}); if(o2){ x.clearRect(0,0,w,h); x.drawImage(o2,0,0); }
          const gm=x.createRadialGradient(p.x-x0,p.y-y0,RR*0.6,p.x-x0,p.y-y0,RR); gm.addColorStop(0,'rgba(0,0,0,1)'); gm.addColorStop(1,'rgba(0,0,0,0)');   // mép mềm
          x.globalCompositeOperation='destination-in'; x.fillStyle=gm; x.fillRect(0,0,w,h); x.globalCompositeOperation='source-over';
          g.save(); g.setTransform(1,0,0,1,0,0); g.drawImage(c,x0,y0); g.restore(); } }
      kamuiSwirl(g,P.x,P.y,u,R,dir,phase); }}); }
  // ⚡ VỆT TỐC ĐỘ CAO (anh dặn 12/11: pha nhanh KHÔNG vẽ nhân vật — hoá vệt sáng kiểu anime). pts = điểm MÀN HÌNH (K.proj) từ đuôi → đầu
  function streak(F,pts,w,col){ const PP=pts.filter(Boolean); if(PP.length<3) return; const H=PP[PP.length-1], Tl=PP[0];
    F.list.push({d:H.d-6, fn:()=>{ const g=F.g; g.save(); g.globalCompositeOperation='lighter'; const n=PP.length;
      for(const [wk,al,c] of [[2.8,0.22,col],[1.3,0.55,col],[0.45,0.95,'255,255,255']]){
        const L=[],R=[]; for(let i=0;i<n;i++){ const A=PP[Math.max(0,i-1)], B=PP[Math.min(n-1,i+1)], dx=B.x-A.x, dy2=B.y-A.y, l=Math.hypot(dx,dy2)||1, ww=w*wk*PP[i].s*Math.pow(i/(n-1),0.7)/2; L.push([PP[i].x-dy2/l*ww,PP[i].y+dx/l*ww]); R.push([PP[i].x+dy2/l*ww,PP[i].y-dx/l*ww]); }
        const gr=g.createLinearGradient(Tl.x,Tl.y,H.x,H.y); gr.addColorStop(0,`rgba(${c},0)`); gr.addColorStop(0.6,`rgba(${c},${al*0.6})`); gr.addColorStop(1,`rgba(${c},${al})`);
        g.fillStyle=gr; g.beginPath(); L.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.arc(H.x,H.y,w*wk*H.s/2,0,TAU); for(let i=n-1;i>=0;i--) g.lineTo(R[i][0],R[i][1]); g.closePath(); g.fill(); }
      const rg=g.createRadialGradient(H.x,H.y,0,H.x,H.y,w*2.2*H.s); rg.addColorStop(0,`rgba(255,255,255,0.9)`); rg.addColorStop(0.3,`rgba(${col},0.5)`); rg.addColorStop(1,`rgba(${col},0)`); g.fillStyle=rg; g.beginPath(); g.arc(H.x,H.y,w*2.2*H.s,0,TAU); g.fill(); g.restore(); }}); }
  // dash: người lao từ A → B trong [t0,t1] thành vệt (đuôi bắt đầu trước A một đoạn 'tail' để vệt dài); trả true khi đang là vệt (để ẩn ảnh người)
  function dash(F,t,t0,t1,A,B,o){ o=o||{}; if(t<t0||t>=t1) return false; const u=(t-t0)/(t1-t0), tail=o.tail==null?0.55:o.tail, pts=[];
    for(let i=0;i<=12;i++){ const k=Math.max(0,Math.min(1,u-tail*(1-i/12))), e=1-(1-k)*(1-k); pts.push(K.proj(F.B,A[0]+(B[0]-A[0])*e,(A[1]+(B[1]-A[1])*e),(A[2]+(B[2]-A[2])*e))); }
    streak(F,pts,o.w||30,o.col||'255,220,150'); if(o.core) streak(F,pts,(o.w||30)*0.4,o.core); return true; }
  window.Fin1Fight={ streak, dash, track, hstop, actor, smearFrame, line, taper, text3, beam, ice, kamui, backOut };
})();
