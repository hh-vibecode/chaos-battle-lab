// ===================== 🎬 CINE-KIT — bộ dựng phim dùng chung (anime 2.5D) =====================
// Mỗi phim mới chỉ cần 1 file js/film-<id>.js gọi CineKit.film({...}) — khung chạy, bảng điều khiển, xuất video offline,
// máy quay, nền, hiệu ứng anime đều nằm ở đây (phim cũ js/cine-*.js mỗi file tự viết lại hết).
//
// THẾ GIỚI 2.5D: x sang phải, y lên trên, z vào sâu; mặt đất y=0. 1 meme cao 100 (chuẩn MU — Buff Doge 200…).
// Nhân vật = ảnh phẳng luôn quay về máy (billboard), đặt chân trên đất → máy quay bay vòng, góc cao chéo, góc thấp, nghiêng máy
// đều ra phối cảnh thật (to/nhỏ theo khoảng cách, bóng đổ dưới chân, nền đá co theo phối cảnh).
//
// MÁY QUAY: {tx,ty,tz (điểm nhìn), dist, yaw (độ, 0 = đứng phía -z nhìn vào), pitch (độ, + = nhìn từ trên xuống),
//            roll (độ, nghiêng máy), fov (độ dọc), ox, oy (lệch khung theo tỉ lệ màn hình)}
// Shot = {t0,t1,a:{cam lúc đầu},b:{cam lúc cuối},ease} — giữa 2 shot là CẮT CỨNG (kiểu anime), trong shot máy trôi a→b.
//
// HIỆU ỨNG: smoke (khói toon), ring (sóng xung kích trên đất), slash (vệt chém trăng khuyết), aura (hào quang lửa theo bóng nhân vật),
//   speedLines (tia tập trung), impact (khung đảo màu đen trắng), sparks, debris (đá văng), sfxText (chữ tượng thanh), letterbox, flash.
// Chuyển động nhân vật nên dùng K.twos(t) (giật 12 hình/giây như anime vẽ tay); máy quay + hiệu ứng mượt 60.
(function(){
  if(window.CineKit) return;
  const K={ films:{} };
  // ───────── toán ─────────
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)), seg=(t,a,b)=>clamp((t-a)/(b-a),0,1), lerp=(a,b,k)=>a+(b-a)*k;
  const EASE={ lin:x=>x, eio:x=>x*x*(3-2*x), eout:x=>1-(1-x)*(1-x), ein:x=>x*x, eout3:x=>1-Math.pow(1-x,3), ein3:x=>x*x*x };
  const hash=n=>{ const s=Math.sin(n*127.1+311.7)*43758.5453; return s-Math.floor(s); };
  const h2=(a,b)=>{ const v=Math.sin(a*127.1+b*311.7+74.7)*43758.5453; return v-Math.floor(v); };
  const D2R=Math.PI/180;
  Object.assign(K,{clamp,seg,lerp,EASE,hash,h2,eio:EASE.eio,eout:EASE.eout,ein:EASE.ein});
  K.twos=(t,fps)=>Math.floor(t*(fps||12))/(fps||12);   // giật theo nhịp vẽ tay
  K.mk=(w,h)=>{ const c=document.createElement('canvas'); c.width=Math.max(1,Math.round(w)); c.height=Math.max(1,Math.round(h)); return c; };
  // ảnh cắt sát + bỏ nền mờ
  K.prep=im=>{ if(!im) return null; if(im._ck) return im._ck; if(!im.complete || !im.naturalWidth) return null;
    const sw=im.naturalWidth, sh=im.naturalHeight, c=K.mk(sw,sh), x=c.getContext('2d'); x.drawImage(im,0,0);
    const id=x.getImageData(0,0,sw,sh), d=id.data; let x0=sw,y0=sh,x1=0,y1=0;
    for(let i=3;i<d.length;i+=4){ if(d[i]<40) d[i]=0; else if(d[i]<90) d[i]=(d[i]-40)*255/50|0; }
    x.putImageData(id,0,0);
    for(let yy=0;yy<sh;yy+=2) for(let xx=0;xx<sw;xx+=2) if(d[(yy*sw+xx)*4+3]>40){ if(xx<x0)x0=xx; if(xx>x1)x1=xx; if(yy<y0)y0=yy; if(yy>y1)y1=yy; }
    if(x1<x0) return null; return im._ck={src:c, sx:x0, sy:y0, sw:x1-x0+1, sh:y1-y0+1, tint:{}}; };
  // bóng 1 màu của ảnh (cho hào quang / khung impact)
  K.tinted=(c,col)=>{ if(c.tint[col]) return c.tint[col]; const t=K.mk(c.sw,c.sh), x=t.getContext('2d');
    x.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,0,0,c.sw,c.sh); x.globalCompositeOperation='source-in'; x.fillStyle=col; x.fillRect(0,0,c.sw,c.sh); return c.tint[col]=t; };

  // ───────── máy quay 2.5D ─────────
  K.camAt=(shots,t)=>{ let s=shots[0]; for(const x of shots) if(t>=x.t0) s=x; const k=(EASE[s.ease||'eio'])(seg(t,s.t0,s.t1)), a=s.a, b=s.b||s.a, o={};
    for(const key of new Set([...Object.keys(a),...Object.keys(b)])){ const va=a[key]!=null?a[key]:b[key], vb=b[key]!=null?b[key]:a[key]; o[key]=lerp(va,vb,k); }
    o.shot=s; o.k=k; o.st=t-s.t0; return o; };
  // dựng ma trận nhìn từ thông số máy
  function camBasis(c,VW,VH){ const yaw=(c.yaw||0)*D2R, p=(c.pitch||0)*D2R, dist=c.dist||600;
    const pos=[(c.tx||0)+dist*Math.cos(p)*Math.sin(yaw), (c.ty||0)+dist*Math.sin(p), (c.tz||0)-dist*Math.cos(p)*Math.cos(yaw)];
    const f=[-Math.cos(p)*Math.sin(yaw), -Math.sin(p), Math.cos(p)*Math.cos(yaw)], r=[Math.cos(yaw),0,Math.sin(yaw)];
    const u=[f[1]*r[2]-f[2]*r[1], f[2]*r[0]-f[0]*r[2], f[0]*r[1]-f[1]*r[0]];
    const focal=(VH/2)/Math.tan(((c.fov||50)*D2R)/2);
    return {pos,f,r,u,focal,cx:VW/2+(c.ox||0)*VW,cy:VH/2+(c.oy||0)*VH,roll:(c.roll||0)*D2R,yaw,pitch:p}; }
  // chiếu điểm thế giới → màn hình {x,y,s(px / 1 đơn vị),d(độ sâu)}; sau lưng máy → null
  K.proj=(B,x,y,z)=>{ const vx=x-B.pos[0], vy=y-B.pos[1], vz=z-B.pos[2];
    const zc=vx*B.f[0]+vy*B.f[1]+vz*B.f[2]; if(zc<8) return null;
    const xc=vx*B.r[0]+vy*B.r[1]+vz*B.r[2], yc=vx*B.u[0]+vy*B.u[1]+vz*B.u[2], s=B.focal/zc;
    return {x:B.cx+xc*s, y:B.cy-yc*s, s, d:zc}; };

  K.toPx=(F,p)=>{ let X,Y; if(p.sx!=null){ X=p.sx; Y=p.sy; } else { const P=K.proj(F.B,p.x,p.y||0,p.z||0); if(!P) return null; X=P.x; Y=P.y; }
    const c=Math.cos(F.B.roll), s=Math.sin(F.B.roll), dx=X-F.VW/2, dy=Y-F.VH/2, k=F.SC||1;
    return {x:(F.VW/2+(F.shx||0)+dx*c-dy*s)*k, y:(F.VH/2+(F.shy||0)+dx*s+dy*c)*k}; };
  // ───────── nền: trời + núi xa + sân đá phối cảnh ─────────
  // th = {sky:[trên,giữa,chân trời], sun:{x (độ yaw), y (0–1 trên chân trời), r, col}, mount:[màu xa, màu gần], ground:[màu đá 1, màu đá 2, màu khe], fog:'r,g,b', tile:120, R:2600}
  K.drawWorldBg=(F,th)=>{ const g=F.g, B=F.B, VW=F.VW, VH=F.VH;
    // điểm chân trời: chiếu 1 điểm rất xa theo hướng nhìn ngang
    const fx=B.f[0], fz=B.f[2], fl=Math.hypot(fx,fz)||1, far=K.proj(B, B.pos[0]+fx/fl*1e6, 0, B.pos[2]+fz/fl*1e6);
    const hy=far?far.y:(B.pitch>0?-VH:VH*2);
    const R=Math.hypot(VW,VH);
    // trời
    const sg=g.createLinearGradient(0,hy-VH*1.2,0,hy); sg.addColorStop(0,th.sky[0]); sg.addColorStop(0.6,th.sky[1]); sg.addColorStop(1,th.sky[2]);
    g.fillStyle=sg; g.fillRect(-R,-R,VW+2*R,VH+2*R);
    if(th.sun){ const sx=VW/2+(((th.sun.x*D2R-B.yaw+Math.PI*3)%(Math.PI*2))-Math.PI)*B.focal*0.9, sy=hy-th.sun.y*VH*0.25, sr=th.sun.r||40;
      const gg=g.createRadialGradient(sx,sy,0,sx,sy,sr*4); gg.addColorStop(0,th.sun.col.replace('A','0.9')); gg.addColorStop(0.25,th.sun.col.replace('A','0.35')); gg.addColorStop(1,th.sun.col.replace('A','0'));
      g.fillStyle=gg; g.fillRect(sx-sr*4,sy-sr*4,sr*8,sr*8); g.fillStyle=th.sun.col.replace('A','1'); g.beginPath(); g.arc(sx,sy,sr,0,Math.PI*2); g.fill(); }
    // 2 lớp núi xa, trôi theo hướng máy (yaw) — vòng 360°
    if(th.mount) for(let L=0;L<2;L++){ const amp=VH*(L?0.05:0.09), per=VW*(L?0.55:0.9), shift=-B.yaw*B.focal*(L?0.75:0.5);
      g.fillStyle=th.mount[L]; g.beginPath(); g.moveTo(-R,hy+2);
      for(let x=-R;x<=VW+R;x+=8){ const u=(x-shift)/per; const y=hy-amp*(0.55+0.45*Math.sin(u*2.1+L*3)+0.3*Math.sin(u*5.3+L)*Math.sin(u*0.7)); g.lineTo(x,y); }
      g.lineTo(VW+R,hy+2); g.closePath(); g.fill(); }
    // đất xa (màu sương) phủ dưới chân trời trước, ô đá vẽ đè lên
    const fg=`rgb(${th.fog})`; g.fillStyle=fg; g.fillRect(-R,hy,VW+2*R,VH+2*R);
    // ô đá: lưới quanh điểm nhìn, ô xa mờ dần vào sương
    const T=th.tile||120, N=Math.ceil((th.R||2600)/T), cx0=Math.round((F.cam.tx||0)/T), cz0=Math.round((F.cam.tz||0)/T);
    const P={}; const pt=(i,j)=>{ const k=i+','+j; if(k in P) return P[k]; return P[k]=K.proj(B,i*T,0,j*T); };
    const tiles=[];
    for(let j=cz0-N;j<cz0+N;j++) for(let i=cx0-N;i<cx0+N;i++){ const a=pt(i,j), b=pt(i+1,j), c=pt(i+1,j+1), d=pt(i,j+1); if(!a||!b||!c||!d) continue;
      const minx=Math.min(a.x,b.x,c.x,d.x), maxx=Math.max(a.x,b.x,c.x,d.x), miny=Math.min(a.y,b.y,c.y,d.y), maxy=Math.max(a.y,b.y,c.y,d.y);
      if(maxx<-R*0.4||minx>VW+R*0.4||maxy<-R*0.4||miny>VH+R*0.4) continue; tiles.push([i,j,a,b,c,d,(a.d+c.d)/2]); }
    const fogD=(th.R||2600)*0.9, fogRGB=th.fog.split(',').map(Number);
    for(const [i,j,a,b,c,d,dd] of tiles){ const v=h2(i,j), base=(v<0.5?th.ground[0]:th.ground[1]).split(',').map(Number), sh=0.88+0.22*h2(i+7,j-3);
      const fk=clamp((dd-fogD*0.25)/(fogD*0.75),0,1), col=base.map((x,n)=>Math.round(lerp(x*sh,fogRGB[n],fk)));
      g.fillStyle=`rgb(${col})`; g.strokeStyle=`rgba(${th.ground[2]},${0.55*(1-fk)})`; g.lineWidth=Math.max(0.4,Math.min(2,a.s*3));
      g.beginPath(); g.moveTo(a.x,a.y); g.lineTo(b.x,b.y); g.lineTo(c.x,c.y); g.lineTo(d.x,d.y); g.closePath(); g.fill(); g.stroke(); }
    return {hy}; };

  // ───────── vật thể trong thế giới (sắp theo độ sâu) ─────────
  // sprite: o = {img, x,z, y(độ cao khỏi đất), h (cao theo đơn vị thế giới), flip, lean (độ, nghiêng ảnh), a, white (0–1 loé trắng),
  //              smear:{dx,dy,dz,n} vệt nhoè theo vận tốc thế giới, aura:{col:'r,g,b', k}, shadow:true}
  K.sprite=(F,o)=>{ const c=K.prep(o.img); if(!c) return; const P=K.proj(F.B,o.x,o.y||0,o.z); if(!P) return;
    F.list.push({d:P.d, fn:()=>drawSprite(F,c,o,P)});
    if(o.shadow!==false) F.shadows.push({x:o.x,z:o.z,r:(o.h*c.sw/c.sh)*0.42,a:0.38*clamp(1-(o.y||0)/(o.h*1.5),0,1)}); };
  function drawSprite(F,c,o,P){ const g=F.g, h=o.h*P.s, w=h*c.sw/c.sh;
    const one=(x,y,a,img)=>{ g.save(); g.globalAlpha=a; g.translate(x,y); if(o.lean) g.rotate(o.lean*D2R); g.scale(o.flip?-1:1,1);
      if(img) g.drawImage(img,-w/2,-h,w,h); else g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,-w/2,-h,w,h); g.restore(); };
    if(o.aura) K.auraAt(F,c,P.x,P.y,w,h,o);
    if(o.smear){ const S=o.smear, Q=K.proj(F.B,o.x-S.dx,(o.y||0)-(S.dy||0),o.z-(S.dz||0)); if(Q){ const n=S.n||5;
      for(let i=n;i>=1;i--){ const k=i/(n+1); one(lerp(P.x,Q.x,k),lerp(P.y,Q.y,k),(o.a==null?1:o.a)*0.32*(1-k),null); } } }
    one(P.x,P.y,o.a==null?1:o.a,null);
    if(o.white>0) one(P.x,P.y,clamp(o.white,0,1),K.tinted(c,'#fff'));
    o._scr={x:P.x,y:P.y,w,h}; }
  // hào quang lửa theo đúng bóng nhân vật: nhiều lớp bóng màu phóng to rung + lưỡi lửa bốc lên
  K.auraAt=(F,c,x,y,w,h,o)=>{ const g=F.g, A=o.aura, col=A.col, k=A.k==null?1:A.k, t=F.t; if(k<=0.01) return;
    // ✨ có preset → lửa sinh bằng shader (js/vfx-gl.js): mềm, cuộn liên tục, bám dáng người. Không có WebGL → kiểu vẽ tay cũ bên dưới
    if(A.preset && window.VfxGL && VfxGL.drawAura(g,c.src,Object.assign({},A,{sx:c.sx,sy:c.sy,sw:c.sw,sh:c.sh,x,y,w,h,t:t+(A.seed||0),k,flip:o.flip}))) return;
    const sil=K.tinted(c,`rgb(${col})`);
    g.save(); g.globalCompositeOperation='lighter';
    for(let i=0;i<3;i++){ const sc=1.06+0.07*i+0.03*Math.sin(t*23+i*2), j=(Math.sin(t*31+i)*0.012)*w;
      g.globalAlpha=k*(0.42-0.11*i); g.save(); g.translate(x+j,y+h*0.02); g.scale((o.flip?-1:1)*sc,sc+0.04*i); g.drawImage(sil,-w/2,-h,w,h); g.restore(); }
    const n=14; for(let i=0;i<n;i++){ const u=(i+0.5)/n, ph=(t*2.2+hash(i*3.1))%1, bx=x+(u-0.5)*w*0.95, by=y-h*(0.15+0.7*Math.sin(u*Math.PI)*0.9), L=h*(0.12+0.22*hash(i))*(1-ph)*k;
      g.globalAlpha=k*0.75*(1-ph); g.fillStyle=`rgb(${col})`; g.beginPath(); g.moveTo(bx-w*0.035,by); g.quadraticCurveTo(bx+Math.sin(t*9+i)*w*0.05,by-L*0.6,bx+Math.sin(t*7+i)*w*0.03,by-L-ph*h*0.25); g.quadraticCurveTo(bx+w*0.02,by-L*0.4,bx+w*0.035,by); g.fill(); }
    g.restore(); };
  // bóng đổ (vẽ trước mọi vật)
  function drawShadows(F){ const g=F.g; for(const s of F.shadows){ if(s.a<=0.01) continue; g.beginPath(); let ok=true;
    for(let i=0;i<=20;i++){ const th=i/20*Math.PI*2, p=K.proj(F.B,s.x+Math.cos(th)*s.r,0,s.z+Math.sin(th)*s.r*0.7); if(!p){ ok=false; break; } i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y); }
    if(ok){ g.fillStyle=`rgba(0,0,0,${s.a})`; g.fill(); } } }

  // khói toon: puff mềm vẽ sẵn 1 lần, mỗi cụm tự trôi/nở/tan theo thời gian (tất định — tua đi tua lại vẫn y hệt)
  let PUFF=null; const puffImg=()=>{ if(PUFF) return PUFF; const c=K.mk(128,128), x=c.getContext('2d');
    for(const [ox,oy,r,col] of [[64,70,52,'rgba(120,110,105,1)'],[60,62,48,'rgba(205,198,190,1)'],[56,56,40,'rgba(240,236,230,1)']]){ const gr=x.createRadialGradient(ox,oy,r*0.55,ox,oy,r); gr.addColorStop(0,col); gr.addColorStop(1,col.replace(',1)',',0)')); x.fillStyle=gr; x.beginPath(); x.arc(ox,oy,r,0,Math.PI*2); x.fill(); }
    return PUFF=c; };
  // e = {x,y,z, t0, n, spread, rise, life, size, seed, swirl(rad/s quanh tâm), tint:'r,g,b', a (độ đậm 0–1)}
  K.smoke=(F,e)=>{ const t=F.t-e.t0; if(t<0||t>e.life+0.5) return; const img=puffImg();
    for(let i=0;i<e.n;i++){ const s=e.seed*31+i, dl=hash(s)*0.25, tt=t-dl; if(tt<0) continue; const life=e.life*(0.6+0.4*hash(s+1)), u=tt/life; if(u>1) continue;
      const ang=hash(s+2)*Math.PI*2+(e.swirl||0)*tt, sp=e.spread*(0.4+0.6*hash(s+3))*EASE.eout3(Math.min(1,u*1.4));
      const x=e.x+Math.cos(ang)*sp, z=e.z+Math.sin(ang)*sp, y=(e.y||0)+e.rise*u*(0.5+hash(s+4))+12, P=K.proj(F.B,x,y,z); if(!P) continue;
      const r=e.size*(0.5+0.8*hash(s+5))*(0.6+0.8*EASE.eout(u))*P.s, a=(u<0.15?u/0.15:1-EASE.ein(Math.max(0,(u-0.35)/0.65)))*0.9*(e.a==null?1:e.a);
      F.list.push({d:P.d+1, fn:()=>{ const g=F.g; g.save(); g.globalAlpha=a; g.drawImage(img,P.x-r,P.y-r,r*2,r*2);
        if(e.tint){ g.globalCompositeOperation='multiply'; g.globalAlpha=a*0.5; g.fillStyle=`rgb(${e.tint})`; g.beginPath(); g.arc(P.x,P.y,r*0.8,0,Math.PI*2); g.fill(); } g.restore(); }}); } };
  // sóng xung kích tròn trên mặt đất
  K.ring=(F,x,z,r,wid,a,col)=>{ if(a<=0.01) return; const g=F.g; const pts=[]; for(let i=0;i<=40;i++){ const th=i/40*Math.PI*2, p=K.proj(F.B,x+Math.cos(th)*r,1,z+Math.sin(th)*r); if(!p) return; pts.push(p); }
    F.under.push(()=>{ g.save(); g.globalCompositeOperation='lighter'; for(const [lw,aa] of [[wid*2.2,0.25],[wid,0.8],[wid*0.35,1]]){ g.beginPath(); pts.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y));
      g.strokeStyle=`rgba(${aa===1?'255,255,255':col},${a*aa})`; g.lineWidth=Math.max(1,lw*pts[0].s); g.stroke(); } g.restore(); }); };
  // vệt chém trăng khuyết ở 1 điểm thế giới: ang (độ, trên màn hình), R (đơn vị thế giới), span (độ), k = tiến độ vung 0→1, fade
  K.slash=(F,x,y,z,o)=>{ const P=K.proj(F.B,x,y,z); if(!P) return; const g=F.g, R=o.R*P.s, sp=(o.span||150)*D2R, k=clamp(o.k,0,1), fa=o.a==null?1:o.a; if(fa<=0.01) return;
    F.list.push({d:P.d-30, fn:()=>{ g.save(); g.translate(P.x,P.y); g.rotate((o.ang||0)*D2R); if(o.flip) g.scale(1,-1); g.globalCompositeOperation='lighter';
      const a1=-sp/2, a2=-sp/2+sp*k, tail=Math.max(a1,a2-sp*0.55);
      const crescent=(rr,th)=>{ g.beginPath(); g.arc(0,0,rr,tail,a2); g.arc(-rr*th,0,rr*(1-th*0.9),a2-0.05,tail+0.05,true); g.closePath(); };
      g.fillStyle=`rgba(${o.col||'120,200,255'},${0.35*fa})`; crescent(R*1.12,0.3); g.fill();
      const gr=g.createLinearGradient(Math.cos(tail)*R,Math.sin(tail)*R,Math.cos(a2)*R,Math.sin(a2)*R); gr.addColorStop(0,`rgba(${o.col||'120,200,255'},0)`); gr.addColorStop(0.7,`rgba(${o.col||'120,200,255'},${0.9*fa})`); gr.addColorStop(1,`rgba(255,255,255,${fa})`);
      g.fillStyle=gr; crescent(R,0.16); g.fill();
      g.strokeStyle=`rgba(255,255,255,${fa})`; g.lineWidth=Math.max(1.5,R*0.02); g.beginPath(); g.arc(0,0,R,Math.max(tail,a2-sp*0.3),a2); g.stroke();
      g.restore(); }}); };
  // tia lửa văng (n tia, vẽ dạng vệt sáng dài theo vận tốc)
  K.sparks=(F,e)=>{ const t=F.t-e.t0; if(t<0||t>e.life) return;
    for(let i=0;i<e.n;i++){ const s=e.seed*17+i, u=t/(e.life*(0.5+0.5*hash(s))); if(u>1) continue; const ang=(e.dir||0)*D2R+(hash(s+1)-0.5)*(e.cone||360)*D2R, el=(hash(s+2)*0.8+0.1)*Math.PI/2;
      const v=e.speed*(0.4+0.6*hash(s+3)), tt=t, x=e.x+Math.cos(ang)*Math.cos(el)*v*tt, z=e.z+Math.sin(ang)*Math.cos(el)*v*tt, y=e.y+Math.sin(el)*v*tt-420*tt*tt;
      const x2=x-Math.cos(ang)*Math.cos(el)*v*0.03, z2=z-Math.sin(ang)*Math.cos(el)*v*0.03, y2=y-(Math.sin(el)*v-840*tt)*0.03; if(y<0) continue;
      const P=K.proj(F.B,x,y,z), Q=K.proj(F.B,x2,y2,z2); if(!P||!Q) continue;
      F.list.push({d:P.d-5, fn:()=>{ const g=F.g; g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle=`rgba(${e.col||'255,220,140'},${1-u})`; g.lineWidth=Math.max(1,2.2*P.s*3); g.lineCap='round';
        g.beginPath(); g.moveTo(Q.x,Q.y); g.lineTo(P.x,P.y); g.stroke(); g.restore(); }}); } };
  // đá vụn văng theo trọng lực (đa giác tối màu, có xoay)
  K.debris=(F,e)=>{ const t=F.t-e.t0; if(t<0||t>e.life) return;
    for(let i=0;i<e.n;i++){ const s=e.seed*13+i, ang=(e.dir||0)*D2R+(hash(s)-0.5)*(e.cone||360)*D2R, el=(0.25+0.6*hash(s+1))*Math.PI/2, v=e.speed*(0.35+0.65*hash(s+2));
      let y=(e.y||0)+Math.sin(el)*v*t-500*t*t; if(y<0) y=0; const x=e.x+Math.cos(ang)*Math.cos(el)*v*t, z=e.z+Math.sin(ang)*Math.cos(el)*v*t, P=K.proj(F.B,x,y+4,z); if(!P) continue;
      const r=e.size*(0.35+0.65*hash(s+3))*P.s, rot=t*(hash(s+4)*14-7), a=1-seg(t,e.life*0.7,e.life);
      F.list.push({d:P.d, fn:()=>{ const g=F.g; g.save(); g.globalAlpha=a; g.translate(P.x,P.y); g.rotate(rot); g.fillStyle=e.col||'#5b4a42'; g.strokeStyle='rgba(0,0,0,0.6)'; g.lineWidth=Math.max(0.5,r*0.12);
        g.beginPath(); for(let k=0;k<6;k++){ const th=k/6*Math.PI*2, rr=r*(0.6+0.4*hash(s+10+k)); k?g.lineTo(Math.cos(th)*rr,Math.sin(th)*rr):g.moveTo(Math.cos(th)*rr,Math.sin(th)*rr); } g.closePath(); g.fill(); g.stroke(); g.restore(); }}); } };

  // ───────── hiệu ứng màn hình (vẽ sau thế giới) ─────────
  // tia tập trung kiểu manga: n nêm trắng/đen từ mép vào, đổi hình 12 lần/giây
  K.speedLines=(F,o)=>{ const g=F.g, VW=F.VW, VH=F.VH, k=o.k==null?1:o.k; if(k<=0.01) return; const cx=o.cx==null?VW/2:o.cx, cy=o.cy==null?VH/2:o.cy, fr=Math.floor(F.t*12), n=o.n||70, R=Math.hypot(VW,VH);
    g.save(); g.fillStyle=o.col||'rgba(255,255,255,0.85)';
    for(let i=0;i<n;i++){ const s=fr*101+i, th=hash(s)*Math.PI*2, r0=(o.r0||0.32)*Math.min(VW,VH)*(0.8+0.6*hash(s+1)), wd=(0.004+0.012*hash(s+2))*k;
      g.globalAlpha=k*(0.4+0.6*hash(s+3)); g.beginPath(); g.moveTo(cx+Math.cos(th)*r0,cy+Math.sin(th)*r0); g.lineTo(cx+Math.cos(th-wd)*R,cy+Math.sin(th-wd)*R); g.lineTo(cx+Math.cos(th+wd)*R,cy+Math.sin(th+wd)*R); g.closePath(); g.fill(); }
    g.restore(); };
  // vệt gió ngang (đường chạy song song khi máy lia nhanh)
  K.panLines=(F,o)=>{ const g=F.g, k=o.k==null?1:o.k; if(k<=0.01) return; const fr=Math.floor(F.t*24), ang=(o.ang||0)*D2R; g.save(); g.translate(F.VW/2,F.VH/2); g.rotate(ang); g.strokeStyle='rgba(255,255,255,0.7)';
    for(let i=0;i<(o.n||26);i++){ const s=fr*37+i, y=(hash(s)-0.5)*F.VH*1.4, L=F.VW*(0.2+0.6*hash(s+1)), x=(hash(s+2)-0.5)*F.VW*1.6; g.globalAlpha=k*(0.25+0.5*hash(s+3)); g.lineWidth=1+3*hash(s+4); g.beginPath(); g.moveTo(x,y); g.lineTo(x+L,y); g.stroke(); }
    g.restore(); };
  // chữ tượng thanh: bật to rồi rung, viền đen dày
  K.sfxText=(F,txt,x,y,o)=>{ const g=F.g, t=F.t-o.t0; if(t<0||t>o.life) return; const u=t/o.life, sc=(t<0.08?0.4+t/0.08*0.9:1.3-0.3*EASE.eout(seg(t,0.08,0.3)))*(o.size||1), a=1-seg(u,0.75,1), j=Math.sin(t*90)*3*(1-u);
    g.save(); g.translate(x+j,y); g.rotate((o.rot||-8)*D2R); g.scale(sc,sc); g.globalAlpha=a; g.font=`900 ${o.px||72}px "Arial Black",Impact,sans-serif`; g.textAlign='center'; g.textBaseline='middle'; g.lineJoin='round';
    g.lineWidth=(o.px||72)*0.22; g.strokeStyle='#000'; g.strokeText(txt,0,0); g.lineWidth=(o.px||72)*0.08; g.strokeStyle=o.edge||'#fff'; g.strokeText(txt,0,0); g.fillStyle=o.col||'#ffd34d'; g.fillText(txt,0,0); g.restore(); };
  K.flash=(F,a,col)=>{ if(a<=0.01) return; const g=F.g; g.save(); g.globalAlpha=clamp(a,0,1); g.fillStyle=col||'#fff'; g.fillRect(0,0,F.VW,F.VH); g.restore(); };
  K.letterbox=(F,k)=>{ if(k<=0) return; const g=F.g, h=F.VH*0.11*k; g.fillStyle='#000'; g.fillRect(0,0,F.VW,h); g.fillRect(0,F.VH-h,F.VW,h); };
  K.vignette=(F,a)=>{ const g=F.g, vg=g.createRadialGradient(F.VW/2,F.VH/2,F.VH*0.25,F.VW/2,F.VH/2,F.VH*0.75); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,`rgba(0,0,0,${a==null?0.5:a})`); g.fillStyle=vg; g.fillRect(0,0,F.VW,F.VH); };

  // ───────── khung chạy phim ─────────
  // def = { id, title, VW:540, VH:960 (khung logic; xuất 1080×1920 ×scale), DUR, imgs:{tên:đường dẫn}, sfx:[[giây,khoá,âm lượng,thời lượng]],
  //         theme (nền K.drawWorldBg), shots (máy quay), world(F,t) (đặt nhân vật + hiệu ứng thế giới), screen(F,t) (hiệu ứng màn hình),
  //         impact(t) → 0 / 'bw' / 'inv' / 'red' (khung impact) , shake(t) → biên độ rung (px logic),
//         post(F,t) → hậu kỳ shader (js/vfx-gl.js): {shocks:[{x,y,z | sx,sy, r,w,str}], zoom:{x,y,z | sx,sy, k}, chroma, heat:{k,t}} (đơn vị logic) }
  K.film=def=>{ const id=def.id, VW=def.VW||540, VH=def.VH||960, DUR=def.DUR;
    const I={}; for(const [k,p] of Object.entries(def.imgs||{})){ const im=new Image(); im.src=p; I[k]=im; }
    let cv=null, W2=null, w2=null, SC=1, raf=null, t0=0, paused=false, pauseT=0, played={}, markOnly=false, panel=null, overlay=null, ready=false, OFF=null;
    const curT=()=>paused?pauseT:(performance.now()-t0)/1000;
    const sfx=(i,k,v,d)=>{ if(played[i]) return; played[i]=1; if(markOnly) return; try{ playSample(k,v==null?1:v,d||null); }catch(e){} };
    function renderAt(t){
      if(OFF) markOnly=true;
      (def.sfx||[]).forEach((s,i)=>{ if(t>=s[0] && t<DUR && t-s[0]<0.25) sfx('s'+i,s[1],s[2],s[3]); else if(t>=s[0]) played['s'+i]=1; });
      const cam=K.camAt(def.shots,t), B=camBasis(cam,VW,VH);
      const shk=def.shake?def.shake(t):0, sx=shk?(hash(Math.floor(t*60))-0.5)*2*shk:0, sy=shk?(hash(Math.floor(t*60)+7)-0.5)*2*shk:0;
      const F={t,cam,B,VW,VH,g:w2,list:[],shadows:[],under:[],I,DUR,SC};
      w2.setTransform(SC,0,0,SC,0,0); w2.fillStyle='#000'; w2.fillRect(0,0,VW,VH);
      w2.translate(VW/2+sx,VH/2+sy); w2.rotate(B.roll); w2.translate(-VW/2,-VH/2);
      if(def.theme) K.drawWorldBg(F,typeof def.theme==='function'?def.theme(t):def.theme);
      if(def.world) def.world(F,t);
      drawShadows(F); for(const fn of F.under) fn();
      F.list.sort((a,b)=>b.d-a.d); for(const it of F.list) it.fn();
      const g=cv.getContext('2d'); g.setTransform(1,0,0,1,0,0);
      F.shx=sx; F.shy=sy;
      let SRC=W2; if(def.post && window.VfxGL){ const fx=def.post(F,t); if(fx){ const px=v=>v*SC, cvt=p=>K.toPx(F,p);   // toạ độ logic → điểm ảnh thật
          const out={chroma:fx.chroma||0, heat:fx.heat?{k:px(fx.heat.k),t:fx.heat.t}:null,
            shocks:(fx.shocks||[]).map(s0=>{ const q=cvt(s0); return q?{x:q.x,y:q.y,r:px(s0.r),w:px(s0.w),str:px(s0.str)}:null; }).filter(Boolean),
            zoom:fx.zoom?(()=>{ const q=cvt(fx.zoom); return q?{x:q.x,y:q.y,k:fx.zoom.k}:null; })():null};
          const r=VfxGL.post(W2,out); if(r) SRC=r; } }
      const imp=def.impact?def.impact(t):0;
      if(imp==='bw'){ g.filter='grayscale(1) contrast(6) brightness(1.15)'; g.drawImage(SRC,0,0); g.filter='none'; }
      else if(imp==='inv'){ g.filter='grayscale(1) invert(1) contrast(6)'; g.drawImage(SRC,0,0); g.filter='none'; }
      else if(imp==='red'){ g.filter='grayscale(1) contrast(5)'; g.drawImage(SRC,0,0); g.filter='none'; g.globalCompositeOperation='multiply'; g.fillStyle='#ff2a2a'; g.fillRect(0,0,cv.width,cv.height); g.globalCompositeOperation='source-over'; }
      else g.drawImage(SRC,0,0);
      F.g=g; g.setTransform(SC,0,0,SC,0,0);
      if(def.screen) def.screen(F,t);
      if(t<0.4) K.flash(F,1-t/0.4,'#000');
      if(t>DUR-0.6) K.flash(F,seg(t,DUR-0.6,DUR),'#000');
      markOnly=false; if(panel) panel.update(); }
    function frame(now){ if(OFF) return; raf=requestAnimationFrame(frame); if(!ready) return; renderAt(Math.min(curT(),DUR)); }
    function seek(s){ s=clamp(s,0,DUR); played={}; (def.sfx||[]).forEach((x,i)=>{ if(x[0]<s) played['s'+i]=1; }); try{ stopAllLongSfx(); }catch(e){} if(paused) pauseT=s; else t0=performance.now()-s*1000; }
    function toggle(){ if(paused){ paused=false; t0=performance.now()-pauseT*1000; } else { pauseT=curT(); paused=true; try{ stopAllLongSfx(); }catch(e){} } }
    function stop(){ if(raf) cancelAnimationFrame(raf); raf=null; try{ stopAllLongSfx(); }catch(e){} if(window._cinePanelRemove) _cinePanelRemove(); panel=null; if(overlay) overlay.remove(); overlay=null; }
    function play(opts){ if(overlay) return; const SCALE=(opts&&opts.scale)||1;
      overlay=document.createElement('div'); overlay.style.cssText='position:fixed;inset:0;z-index:99999;background:#000;display:flex;align-items:center;justify-content:center;';
      cv=K.mk(VW*2*SCALE,VH*2*SCALE); SC=cv.width/VW; cv.style.cssText=`height:100vh;max-width:100vw;aspect-ratio:${VW}/${VH};object-fit:contain;`;
      W2=K.mk(cv.width,cv.height); w2=W2.getContext('2d'); overlay.appendChild(cv); document.body.appendChild(overlay);
      if(opts&&opts.offline) OFF={};
      if(window._cinePanelMake && !OFF) panel=_cinePanelMake(overlay,{ title:def.title, dur:()=>DUR, t:()=>ready?Math.min(curT(),DUR):0, playing:()=>ready && !paused && curT()<DUR,
        toggle:()=>{ if(!ready) return; if(!paused && curT()>=DUR) seek(0); else toggle(); }, seek:s=>{ if(ready) seek(s); }, replay:()=>{ if(!ready) return; paused=false; seek(0); }, close:()=>stop() });
      try{ stopAllBattleMusic(); }catch(e){}
      Promise.all(Object.values(I).map(im=>im.decode?im.decode().catch(()=>{}):0)).then(()=>{ if(!overlay) return; for(const im of Object.values(I)) K.prep(im); ready=true; paused=false; played={}; t0=performance.now(); });
      paused=false; played={}; t0=performance.now(); if(!OFF) raf=requestAnimationFrame(frame); }
    const api={ play, stop, ready:()=>ready, step:R=>{ if(OFF && ready) renderAt(R); }, canvas:()=>cv, info:()=>({dur:DUR, sfx:(def.sfx||[]).map(([a,k,v,d])=>[a,k,v,d]), mus:[]}), def };
    K.films[id]=api; return api; };
  window.CineKit=K;
})();
