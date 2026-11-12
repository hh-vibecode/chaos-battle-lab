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
  // ───────── SỨC SỐNG: lưới biến dạng LIÊN TỤC cả ảnh (không cắt ô → mặt / kính / chữ chỉ dịch + giãn rất nhẹ, không vỡ) ─────────
  // o.life = {breath, sway, wind, squash, stretch, ang, dir, seed, fps, nx, ny}; bỏ trống = K.LIFE (nhẹ, mọi sprite); life:false = tắt.
  //   breath  thở: ngực/thân phồng ngang + nhấc nhẹ thân trên, chân đứng yên (1 = ~2% ngang ngực, chu kỳ 3.2s)
  //   sway    lắc / nghiêng quanh chân, cong dần lên trên (1 ≈ 1° ở đỉnh, chu kỳ 4.1s)
  //   wind    áo / tóc / đuôi phất: lệch theo gió + sóng chạy lên, tăng theo (chiều cao)² và ra mép ảnh; dir = ±1 hướng gió TRÊN MÀN HÌNH
  //   squash  >0 dẹt (chạm đất: thấp xuống, xoè ngang — chân dẹt nhiều, đầu ít), <0 kéo dài dọc (đang rơi). Dùng K.squash(t,tLand,dur)
  //   stretch 0–1 kéo dài theo hướng lao (hướng lấy từ smear; hoặc ang = độ trên màn hình, 0 = sang phải, 90 = xuống)
  //   fps 12 (mặc định, giật như vẽ tay; 0 = mượt) · seed lệch pha (mặc định theo ảnh) · lưới nx×ny = 6×10
  K.LIFE={breath:0.5, sway:0.4, wind:0.25};
  // giá trị squash cho 1 lần tiếp đất ở tLand: trước đó `pre` giây kéo dài (−0.6), chạm đất dẹt 1 (giữ `hold` giây), nảy lại rồi tắt sau `dur`
  K.squash=(t,tLand,dur,pre,hold)=>{ dur=dur||0.45; pre=pre==null?0.12:pre; hold=hold==null?0.05:hold;
    if(t<tLand-pre||t>=tLand+hold+dur) return 0; if(t<tLand) return pre>0?-0.6*seg(t,tLand-pre,tLand):0; if(t<tLand+hold) return 1;
    const u=(t-tLand-hold)/dur; return Math.exp(-3.5*u)*Math.cos(u*Math.PI*2.4)*(1-u); };
  let MESH=null, MESHW=null;   // 2 canvas dùng chung (vẽ xong dùng ngay trong drawSprite) — chỉ nới, không thu
  const grow=(cv,W,H)=>(!cv||cv.width<W||cv.height<H)?K.mk(Math.max(W,cv?cv.width:0),Math.max(H,cv?cv.height:0)):cv;
  const sstep=(a,b,x)=>{ const k=clamp((x-a)/(b-a),0,1); return k*k*(3-2*k); };
  function lifeOf(o){ if(o.life===false) return null; const L=Object.assign({},K.LIFE); if(o.life) for(const k in o.life) if(o.life[k]!=null) L[k]=o.life[k]; return L; }
  // dựng ảnh đã biến dạng vào canvas chung: trả {img,W,H,ax,ay,R} — (ax,ay) = chân giữa ảnh, R = px canvas / 1 chiều cao ảnh
  function lifeMesh(F,c,L,h,flip){ const fps=L.fps==null?12:L.fps, tt=fps?K.twos(F.t,fps):F.t, ph=(L.seed!=null?L.seed:hash(c.sw*0.131+c.sh*0.071))*6.283;
    const nx=L.nx||6, ny=L.ny||10, asp=c.sw/c.sh, br=(L.breath||0)*0.02*Math.sin(tt*6.283/3.2+ph), sw=(L.sway||0)*0.018*Math.sin(tt*6.283/4.1+ph*1.7),
      wd=(L.wind||0)*0.03*(L.dir||1)*(flip?-1:1), sa=0.32*(L.squash||0), sb=0.25*(L.squash||0), NV=(nx+1)*(ny+1), V=new Float64Array(NV*2);
    let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9,dev=0;   // dev = độ lệch lớn nhất so với ảnh gốc (đơn vị chiều cao ảnh) → aura chỉ theo lưới khi lệch rõ
    for(let j=0;j<=ny;j++){ const Y=1-j/ny, bump=Math.exp(-Math.pow((Y-0.6)/0.22,2)), Ys=Y-sa*(Y-0.35*Y*Y)+br*0.35*sstep(0.15,0.7,Y), Y2=Y*Y, Y15=Math.pow(Y,1.5);
      for(let i=0;i<=nx;i++){ const u=i/nx, e=Math.abs(2*u-1);
        let X=(u-0.5)*asp*(1+sb*(1-0.5*Y))*(1+br*bump)+sw*Y15;
        if(wd) X+=wd*Y2*(0.35+0.65*e*e)*(0.55+0.45*(0.6*Math.sin(tt*5.65-Y*2.2+ph)+0.4*Math.sin(tt*10.7-Y*3.5+u*1.3+ph*2)));
        const n=(j*(nx+1)+i)*2; V[n]=X; V[n+1]=-Ys; if(X<x0)x0=X; if(X>x1)x1=X; if(-Ys<y0)y0=-Ys; if(-Ys>y1)y1=-Ys;
        const dv=Math.max(Math.abs(X-(u-0.5)*asp),Math.abs(Ys-Y)); if(dv>dev) dev=dv; } }
    const r=Math.min(1,h*(F.SC||1)/c.sh), R=c.sh*r, W=Math.ceil((x1-x0)*R)+6, H=Math.ceil((y1-y0)*R)+6, ox=3-x0*R, oy=3-y0*R;
    MESH=grow(MESH,W,H); const x=MESH.getContext('2d'); x.setTransform(1,0,0,1,0,0); x.clearRect(0,0,W,H);
    for(let n=0;n<NV*2;n+=2){ V[n]=V[n]*R+ox; V[n+1]=V[n+1]*R+oy; }
    const cw=c.sw/nx, ch=c.sh/ny, pad=Math.max(1.5,1.2/r), SW=c.src.width, SH=c.src.height;
    const tri=(sx0,sy0,sx1,sy1,sx2,sy2,a,b,d,bx,by,bw,bh)=>{ const d0x=V[a],d0y=V[a+1],d1x=V[b],d1y=V[b+1],d2x=V[d],d2y=V[d+1];
      const a1=sx1-sx0,b1=sy1-sy0,a2=sx2-sx0,b2=sy2-sy0,det=a1*b2-a2*b1; if(!det) return;
      const e1x=d1x-d0x,e1y=d1y-d0y,e2x=d2x-d0x,e2y=d2y-d0y, ma=(e1x*b2-e2x*b1)/det, mc=(e2x*a1-e1x*a2)/det, mb=(e1y*b2-e2y*b1)/det, md=(e2y*a1-e1y*a2)/det;
      const cx=(d0x+d1x+d2x)/3, cy=(d0y+d1y+d2y)/3, ex=(px,py)=>{ const dx=px-cx, dy=py-cy, l=Math.hypot(dx,dy)||1; return [px+dx/l*0.6, py+dy/l*0.6]; };   // chồng mép 0.6px chống khe
      const p0=ex(d0x,d0y), p1=ex(d1x,d1y), p2=ex(d2x,d2y);
      x.save(); x.beginPath(); x.moveTo(p0[0],p0[1]); x.lineTo(p1[0],p1[1]); x.lineTo(p2[0],p2[1]); x.closePath(); x.clip();
      x.setTransform(ma,mb,mc,md,d0x-ma*sx0-mc*sy0,d0y-mb*sx0-md*sy0); x.drawImage(c.src,bx,by,bw,bh,bx,by,bw,bh); x.restore(); };
    for(let j=0;j<ny;j++) for(let i=0;i<nx;i++){ const sx=c.sx+i*cw, sy=c.sy+j*ch, A=(j*(nx+1)+i)*2, B=A+2, C=A+(nx+1)*2+2, D=A+(nx+1)*2;
      const bx=Math.max(0,sx-pad), by=Math.max(0,sy-pad), bw=Math.min(SW,sx+cw+pad)-bx, bh=Math.min(SH,sy+ch+pad)-by;
      tri(sx,sy,sx+cw,sy,sx+cw,sy+ch,A,B,C,bx,by,bw,bh); tri(sx,sy,sx+cw,sy+ch,sx,sy+ch,A,C,D,bx,by,bw,bh); }
    // ver = chữ ký hình lưới (đổi thì mặt nạ aura shader dựng lại; không đổi — vd giữa 2 nhịp 12 hình/giây — thì dùng lại)
    return {img:MESH,W,H,ax:ox,ay:oy,R,dev,ver:[tt,ph,L.breath,L.sway,L.wind,L.squash,L.dir,flip?1:0,nx,ny,W,H].join('|')}; }
  function drawSprite(F,c,o,P){ const g=F.g, h=o.h*P.s, w=h*c.sw/c.sh;
    const L=h>=24?lifeOf(o):null, M=(L&&(L.breath||L.sway||L.wind||L.squash))?lifeMesh(F,c,L,h,o.flip):null, q=M?h/M.R:1;
    // kéo dài theo hướng lao: 1 phép affine quanh giữa thân (trước khi nghiêng / lật ảnh)
    let st=null; if(L&&L.stretch>0){ let A=L.ang!=null?L.ang*D2R:null;
      if(A==null&&o.smear){ const S=o.smear, Q=K.proj(F.B,o.x-S.dx,(o.y||0)-(S.dy||0),o.z-(S.dz||0)); if(Q&&Math.hypot(P.x-Q.x,P.y-Q.y)>1) A=Math.atan2(P.y-Q.y,P.x-Q.x); }
      if(A!=null){ const k=clamp(L.stretch,0,1), s1=1+0.45*k, s2=1/Math.sqrt(s1), cs=Math.cos(A), sn=Math.sin(A);
        st=[cs*cs*s1+sn*sn*s2, cs*sn*(s1-s2), cs*sn*(s1-s2), sn*sn*s1+cs*cs*s2]; } }
    const one=(x,y,a,img)=>{ g.save(); g.globalAlpha=a; g.translate(x,y);
      if(st){ g.translate(0,-h/2); g.transform(st[0],st[1],st[2],st[3],0,0); g.translate(0,h/2); }
      if(o.lean) g.rotate(o.lean*D2R); g.scale(o.flip?-1:1,1);
      if(M) g.drawImage(img||M.img,0,0,M.W,M.H,-M.ax*q,-M.ay*q,M.W*q,M.H*q);
      else if(img) g.drawImage(img,-w/2,-h,w,h); else g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,-w/2,-h,w,h); g.restore(); };
    // hào quang theo ĐÚNG hình đang vẽ: cùng phép kéo dài + nghiêng; lưới lệch rõ (dẹt / gió mạnh) → bóng lấy từ ảnh đã biến dạng
    if(o.aura){ g.save(); g.translate(P.x,P.y); if(st){ g.translate(0,-h/2); g.transform(st[0],st[1],st[2],st[3],0,0); g.translate(0,h/2); } if(o.lean) g.rotate(o.lean*D2R);
      if(M&&M.dev>0.025) K.auraAt(F,c,(o.flip?-1:1)*(M.W/2-M.ax)*q,(M.H-M.ay)*q,M.W*q,M.H*q,o,M); else K.auraAt(F,c,0,0,w,h,o);
      g.restore(); }
    if(o.smear){ const S=o.smear, Q=K.proj(F.B,o.x-S.dx,(o.y||0)-(S.dy||0),o.z-(S.dz||0)); if(Q){ const n=S.n||5;
      for(let i=n;i>=1;i--){ const k=i/(n+1); one(lerp(P.x,Q.x,k),lerp(P.y,Q.y,k),(o.a==null?1:o.a)*0.32*(1-k),null); } } }
    one(P.x,P.y,o.a==null?1:o.a,null);
    if(o.white>0){ let wi;
      if(M){ MESHW=grow(MESHW,M.W,M.H); const x=MESHW.getContext('2d'); x.save(); x.globalCompositeOperation='copy'; x.drawImage(M.img,0,0,M.W,M.H,0,0,M.W,M.H);
        x.globalCompositeOperation='source-in'; x.fillStyle='#fff'; x.fillRect(0,0,M.W,M.H); x.restore(); wi=MESHW; } else wi=K.tinted(c,'#fff');
      one(P.x,P.y,clamp(o.white,0,1),wi); }
    o._scr={x:P.x,y:P.y,w,h}; }
  // hào quang lửa theo đúng bóng nhân vật: nhiều lớp bóng màu phóng to rung + lưỡi lửa bốc lên
  // M (tuỳ chọn) = ảnh lưới đã biến dạng từ lifeMesh: bóng / mặt nạ lấy từ đó thay vì ảnh gốc (x,y,w,h khi đó là khung của canvas lưới)
  let AUID=0;
  K.auraAt=(F,c,x,y,w,h,o,M)=>{ const g=F.g, A=o.aura, col=A.col, k=A.k==null?1:A.k, t=F.t; if(k<=0.01) return;
    // ✨ có preset → lửa sinh bằng shader (js/vfx-gl.js): mềm, cuộn liên tục, bám dáng người. Không có WebGL → kiểu vẽ tay cũ bên dưới
    if(A.preset && window.VfxGL && VfxGL.drawAura(g,M?M.img:c.src,Object.assign({},A,M?{sx:0,sy:0,sw:M.W,sh:M.H,dyn:'ck'+(c._id||(c._id=++AUID)),ver:M.ver,res:Math.min(A.res||400,260)}:{sx:c.sx,sy:c.sy,sw:c.sw,sh:c.sh},
      {x,y,w,h,t:t+(A.seed||0),k,flip:o.flip}))) return;
    let sil, SW=c.sw, SH=c.sh;
    if(M){ MESHW=grow(MESHW,M.W,M.H); const xx=MESHW.getContext('2d'); xx.save(); xx.globalCompositeOperation='copy'; xx.drawImage(M.img,0,0,M.W,M.H,0,0,M.W,M.H);
      xx.globalCompositeOperation='source-in'; xx.fillStyle=`rgb(${col})`; xx.fillRect(0,0,M.W,M.H); xx.restore(); sil=MESHW; SW=M.W; SH=M.H; } else sil=K.tinted(c,`rgb(${col})`);
    g.save(); g.globalCompositeOperation='lighter';
    for(let i=0;i<3;i++){ const sc=1.06+0.07*i+0.03*Math.sin(t*23+i*2), j=(Math.sin(t*31+i)*0.012)*w;
      g.globalAlpha=k*(0.42-0.11*i); g.save(); g.translate(x+j,y+h*0.02); g.scale((o.flip?-1:1)*sc,sc+0.04*i); g.drawImage(sil,0,0,SW,SH,-w/2,-h,w,h); g.restore(); }
    const n=14; for(let i=0;i<n;i++){ const u=(i+0.5)/n, ph=(t*2.2+hash(i*3.1))%1, bx=x+(u-0.5)*w*0.95, by=y-h*(0.15+0.7*Math.sin(u*Math.PI)*0.9), L=h*(0.12+0.22*hash(i))*(1-ph)*k;
      g.globalAlpha=k*0.75*(1-ph); g.fillStyle=`rgb(${col})`; g.beginPath(); g.moveTo(bx-w*0.035,by); g.quadraticCurveTo(bx+Math.sin(t*9+i)*w*0.05,by-L*0.6,bx+Math.sin(t*7+i)*w*0.03,by-L-ph*h*0.25); g.quadraticCurveTo(bx+w*0.02,by-L*0.4,bx+w*0.035,by); g.fill(); }
    g.restore(); };
  // bóng đổ (vẽ trước mọi vật)
  function drawShadows(F){ const g=F.g; for(const s of F.shadows){ if(s.a<=0.01) continue; g.beginPath(); let ok=true;
    for(let i=0;i<=20;i++){ const th=i/20*Math.PI*2, p=K.proj(F.B,s.x+Math.cos(th)*s.r,0,s.z+Math.sin(th)*s.r*0.7); if(!p){ ok=false; break; } i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y); }
    if(ok){ g.fillStyle=`rgba(0,0,0,${s.a})`; g.fill(); } } }

  // khói toon: puff mềm vẽ sẵn 1 lần, mỗi cụm tự trôi/nở/tan theo thời gian (tất định — tua đi tua lại vẫn y hệt)
  // 11/11 (anh chê khói "bóng bay xám"): bản cũ = 3 hình tròn đồng tâm mép rõ + nhuộm bằng đĩa tròn cắt cứng → mỗi cụm thành 1 quả bóng.
  //   Giờ 6 KIỂU CỤM MÂY: 18–28 cụm con mềm (gradient không có lõi đặc) xếp lệch, 3 lớp tối dưới / giữa / sáng trên (ánh từ trên),
  //   mép làm mờ bằng mặt nạ tròn mềm → mép lởm chởm, không ra hình tròn; mỗi hạt khói chọn 1 kiểu + xoay 1 góc riêng.
  let PUFFS=null; const PUFFT=new Map();
  const puffImgs=()=>{ if(PUFFS) return PUFFS; PUFFS=[];
    for(let v=0;v<6;v++){ const S=160, c=K.mk(S,S), x=c.getContext('2d'), n=18+v*2, B=[];
      for(let i=0;i<n;i++){ const an=hash(v*97+i*3.1)*Math.PI*2, d=Math.sqrt(hash(v*53+i*7.7))*S*0.26, r=S*(0.1+0.1*hash(v*31+i*5.3))*(1-0.35*d/(S*0.26));
        B.push([S/2+Math.cos(an)*d*1.12,S/2+Math.sin(an)*d*0.86,r]); }
      for(const [dy,k,col] of [[5,1.05,'112,104,100'],[0,0.95,'198,192,184'],[-5,0.72,'240,236,230']])
        for(const [bx,by,r] of B){ const rr=r*k, gr=x.createRadialGradient(bx,by+dy,0,bx,by+dy,rr); gr.addColorStop(0,`rgba(${col},0.9)`); gr.addColorStop(0.55,`rgba(${col},0.55)`); gr.addColorStop(1,`rgba(${col},0)`);
          x.fillStyle=gr; x.beginPath(); x.arc(bx,by+dy,rr,0,Math.PI*2); x.fill(); }
      x.globalCompositeOperation='destination-in'; const m=x.createRadialGradient(S/2,S/2,S*0.18,S/2,S/2,S*0.5); m.addColorStop(0,'rgba(0,0,0,1)'); m.addColorStop(1,'rgba(0,0,0,0)'); x.fillStyle=m; x.fillRect(0,0,S,S);
      PUFFS.push(c); }
    return PUFFS; };
  // bản nhuộm màu (chỉ nhuộm phần có khói — không lem ra nền như đĩa multiply cũ), nhớ lại theo kiểu + màu
  const puffTinted=(v,tint)=>{ const key=v+'|'+tint; let c=PUFFT.get(key); if(c) return c; const src=puffImgs()[v]; c=K.mk(src.width,src.height); const x=c.getContext('2d');
    x.drawImage(src,0,0); x.globalCompositeOperation='source-atop'; x.fillStyle=`rgba(${tint},0.5)`; x.fillRect(0,0,c.width,c.height); PUFFT.set(key,c); return c; };
  // e = {x,y,z, t0, n, spread, rise, life, size, seed, swirl(rad/s quanh tâm), tint:'r,g,b', a (độ đậm 0–1)}
  K.smoke=(F,e)=>{ const t=F.t-e.t0; if(t<0||t>e.life+0.5) return; puffImgs();
    for(let i=0;i<e.n;i++){ const s=e.seed*31+i, dl=hash(s)*0.25, tt=t-dl; if(tt<0) continue; const life=e.life*(0.6+0.4*hash(s+1)), u=tt/life; if(u>1) continue;
      const ang=hash(s+2)*Math.PI*2+(e.swirl||0)*tt, sp=e.spread*(0.4+0.6*hash(s+3))*EASE.eout3(Math.min(1,u*1.4));
      const x=e.x+Math.cos(ang)*sp, z=e.z+Math.sin(ang)*sp, y=(e.y||0)+e.rise*u*(0.5+hash(s+4))+12, P=K.proj(F.B,x,y,z); if(!P) continue;
      const r=e.size*(0.5+0.8*hash(s+5))*(0.6+0.8*EASE.eout(u))*P.s, a=(u<0.15?u/0.15:1-EASE.ein(Math.max(0,(u-0.35)/0.65)))*0.9*(e.a==null?1:e.a);
      const v=Math.floor(hash(s+6)*6)%6, img=e.tint?puffTinted(v,e.tint):PUFFS[v], rot=hash(s+7)*Math.PI*2+tt*0.25*(hash(s+8)-0.5), R=r*1.25;
      F.list.push({d:P.d+1, fn:()=>{ const g=F.g; g.save(); g.globalAlpha=a; g.translate(P.x,P.y); g.rotate(rot); g.drawImage(img,-R,-R,R*2,R*2); g.restore(); }}); } };
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
    // ảnh chỉ TẢI khi phim phát (play / tập gọi _load) → tập nhiều cảnh: xuất riêng 1 cảnh chỉ nạp ảnh của cảnh đó (đỡ tràn RAM)
    const I={}, IP=def.imgs||{}; for(const k of Object.keys(IP)) I[k]=new Image(); let imgsOn=false;
    const loadImgs=()=>{ if(imgsOn) return; imgsOn=true; for(const [k,p] of Object.entries(IP)) I[k].src=p; };
    const decodeImgs=()=>{ loadImgs(); return Promise.all(Object.values(I).map(im=>im.decode?im.decode().catch(()=>{}):0)).then(()=>{ for(const im of Object.values(I)) K.prep(im); }); };
    let cv=null, W2=null, w2=null, SC=1, raf=null, t0=0, paused=false, pauseT=0, played={}, markOnly=false, panel=null, overlay=null, ready=false, OFF=null;
    const curT=()=>paused?pauseT:(performance.now()-t0)/1000;
    const sfx=(i,k,v,d)=>{ if(played[i]) return; played[i]=1; if(markOnly) return; try{ playSample(k,v==null?1:v,d||null); }catch(e){} };
    // 🎵 NHẠC NỀN: def.mus=[{src:'assets/audio/x.mp3', ra, rb (giây phim), vol, off (giây bắt đầu trong file), fi, fo (giây mờ vào/ra), loop}]
    //    xem trong game: mỗi bản 1 thẻ Audio chạy theo đồng hồ phim (tua / dừng là ngắt rồi vào lại đúng chỗ) · xuất video: render-cine trộn từ info().mus
    const MUS=(def.mus||[]).map(m=>({...m, el:null})), DUCK=def.duck||(def.duckAuto?K.autoDuck(def.sfx,def.duckAuto):[]);
    // 🎙️ m.vo = lồng tiếng: lúc đang đọc thì các bản nhạc khác tự hạ xuống (xuất video: render-cine nén theo giọng đọc)
    function musTick(t){ if(OFF) return; const voOn=MUS.some(m=>m.vo && t>=m.ra && t<m.rb); for(const m of MUS){ const on=!paused && t>=m.ra && t<m.rb;
        if(on && !m.el){ try{ const el=new Audio(m.src); el.loop=!!m.loop; el.currentTime=Math.max(0,(m.off||0)+(t-m.ra)); m.el=el; el.play().catch(()=>{});
          if(m.loop) el.addEventListener('loadedmetadata',()=>{ if(el.duration) el.currentTime=((m.off||0)+Math.max(0,curT()-m.ra))%el.duration; },{once:true}); }catch(e){} }   // bản lặp: tua giữa chừng vẫn vào đúng chỗ trong vòng lặp
        if(!on && m.el){ try{ m.el.pause(); }catch(e){} m.el=null; }
        if(m.el){ const f=Math.min(m.fi?seg(t,m.ra,m.ra+m.fi):1, m.fo?1-seg(t,m.rb-m.fo,m.rb):1); try{ m.el.volume=clamp((m.vol==null?1:m.vol)*f*(voOn && !m.vo?0.4:1)*(m.vo?1:K.duckAt(DUCK,t)),0,1); }catch(e){} } } }
    function musStop(){ for(const m of MUS){ if(m.el){ try{ m.el.pause(); }catch(e){} m.el=null; } } }
    function renderAt(t){
      if(OFF) markOnly=true;
      (def.sfx||[]).forEach((s,i)=>{ if(t>=s[0] && t<DUR && t-s[0]<0.25) sfx('s'+i,s[1],s[2],s[3]); else if(t>=s[0]) played['s'+i]=1; });
      const cam=K.camAt(def.shots,t), B=camBasis(cam,VW,VH);
      const shk=def.shake?def.shake(t):0, sx=shk?(hash(Math.floor(t*60))-0.5)*2*shk:0, sy=shk?(hash(Math.floor(t*60)+7)-0.5)*2*shk:0;
      const F={t,cam,B,VW,VH,g:w2,list:[],shadows:[],under:[],I:window.__ckImgLog?new Proxy(I,{get:(o,k)=>{ window.__ckImgLog.add(id+':'+String(k)); return o[k]; }}):I,DUR,SC};   // __ckImgLog: dò cảnh nào dùng ảnh nào
      w2.setTransform(SC,0,0,SC,0,0); w2.fillStyle='#000'; w2.fillRect(0,0,VW,VH);
      // 🎞️ CHIA KHUNG kiểu anime: def.panels(t) → [{cam:{...}, clip:[[x,y],…] (tỉ lệ 0–1 của khung)}] — mỗi ô 1 máy quay riêng, cả thế giới vẽ lại trong ô đó.
      //    Không có panels → 1 máy như cũ. Tâm ảnh của mỗi ô tự dời về giữa ô (oy), mép ô vẽ vạch trắng-đen ở screen().
      const PNL=def.panels?def.panels(t):null;
      const views=PNL&&PNL.length?PNL:[{cam:null,clip:null}];
      for(const v of views){ const c2=v.cam?Object.assign({},cam,v.cam):cam, B2=v.cam?camBasis(c2,VW,VH):B;
        if(v.clip && !(v.cam && v.cam.oy!=null)){ const ys=v.clip.map(p=>p[1]); B2.cy=VH*(Math.min(...ys)+Math.max(...ys))/2+(c2.oy||0)*VH; }
        const Fv=v.cam||v.clip?Object.assign(F,{cam:c2,B:B2,list:[],shadows:[],under:[]}):F; Fv.panel=v;
        w2.save(); w2.setTransform(SC,0,0,SC,0,0);
        if(v.clip){ w2.beginPath(); v.clip.forEach((p,i)=>i?w2.lineTo(p[0]*VW,p[1]*VH):w2.moveTo(p[0]*VW,p[1]*VH)); w2.closePath(); w2.clip(); }
        w2.translate(VW/2+sx,VH/2+sy); w2.rotate(B2.roll); w2.translate(-VW/2,-VH/2);
        if(v.theme||def.theme) K.drawWorldBg(Fv,v.theme||(typeof def.theme==='function'?def.theme(t):def.theme));   // ô (panel) có theme riêng: ô trận kế dùng bối cảnh trận kế
        if(def.world) def.world(Fv,t);
        drawShadows(Fv); for(const fn of Fv.under) fn();
        Fv.list.sort((a,b)=>b.d-a.d); for(const it of Fv.list) it.fn();
        w2.restore(); }
      F.panels=PNL&&PNL.length?PNL:null;
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
      if(def.fadeIn!==false && t<0.4) K.flash(F,1-t/0.4,'#000');            // cảnh giữa tập: fadeIn/fadeOut:false → nối cứng với cảnh trước / sau
      if(def.fadeOut!==false && t>DUR-0.6) K.flash(F,seg(t,DUR-0.6,DUR),'#000');
      markOnly=false; if(panel) panel.update(); }
    function frame(now){ if(OFF) return; raf=requestAnimationFrame(frame); if(!ready) return; const t=Math.min(curT(),DUR); musTick(t); renderAt(t); }
    function seek(s){ s=clamp(s,0,DUR); played={}; (def.sfx||[]).forEach((x,i)=>{ if(x[0]<s) played['s'+i]=1; }); try{ stopAllLongSfx(); }catch(e){} musStop(); if(paused) pauseT=s; else t0=performance.now()-s*1000; }
    function toggle(){ if(paused){ paused=false; t0=performance.now()-pauseT*1000; } else { pauseT=curT(); paused=true; try{ stopAllLongSfx(); }catch(e){} musStop(); } }
    function stop(){ if(raf) cancelAnimationFrame(raf); raf=null; try{ stopAllLongSfx(); }catch(e){} musStop(); if(window._cinePanelRemove) _cinePanelRemove(); panel=null; if(overlay) overlay.remove(); overlay=null; }
    function play(opts){ if(overlay) return; const SCALE=(opts&&opts.scale)||1;
      overlay=document.createElement('div'); overlay.style.cssText='position:fixed;inset:0;z-index:99999;background:#000;display:flex;align-items:center;justify-content:center;';
      cv=K.mk(VW*2*SCALE,VH*2*SCALE); SC=cv.width/VW; cv.style.cssText=`height:100vh;max-width:100vw;aspect-ratio:${VW}/${VH};object-fit:contain;`;
      W2=K.mk(cv.width,cv.height); w2=W2.getContext('2d'); overlay.appendChild(cv); document.body.appendChild(overlay);
      if(opts&&opts.offline) OFF={};
      if(window._cinePanelMake && !OFF) panel=_cinePanelMake(overlay,{ title:def.title, dur:()=>DUR, t:()=>ready?Math.min(curT(),DUR):0, playing:()=>ready && !paused && curT()<DUR,
        toggle:()=>{ if(!ready) return; if(!paused && curT()>=DUR) seek(0); else toggle(); }, seek:s=>{ if(ready) seek(s); }, replay:()=>{ if(!ready) return; paused=false; seek(0); }, close:()=>stop() });
      try{ stopAllBattleMusic(); }catch(e){}
      decodeImgs().then(()=>{ if(!overlay) return; ready=true; paused=false; played={}; t0=performance.now(); });
      paused=false; played={}; t0=performance.now(); if(!OFF) raf=requestAnimationFrame(frame); }
    const api={ play, stop, ready:()=>ready, step:R=>{ if(OFF && ready) renderAt(R); }, canvas:()=>cv, info:()=>({dur:DUR, sfx:(def.sfx||[]).map(([a,k,v,d])=>[a,k,v,d]), mus:K._musInfo(def.mus), slow:def.slow||[], duck:DUCK}), def,
      // dùng bởi K.seq (tập nhiều cảnh): vẽ lên canvas của tập, tải ảnh, đặt lại tiếng khi tua
      _bind:(c,W,off)=>{ cv=c; W2=W; w2=W.getContext('2d'); SC=c.width/VW; OFF=off?{}:null; }, _load:decodeImgs, _render:t=>renderAt(t),
      _seek:s=>{ played={}; (def.sfx||[]).forEach((x,i)=>{ if(x[0]<s) played['s'+i]=1; }); } };
    K.films[id]=api; return api; };
  // 🎚️ NHẠC NHƯỜNG TIẾNG (anh 12/11: "sound không có lực" — đo bằng film-listen: nhạc đều đều ngang tiếng đánh). def.duck=[[a,b,gain]] hoặc
  //    def.duckAuto={decisive:[giây cú quyết định], g:0.5, hold:0.8, re:/…/} → mỗi cú đánh chính (nhãn không '+', key khớp re) nhạc lùi ×g trong [t-0.12, t+hold];
  //    cú QUYẾT ĐỊNH: 0.6s trước gần như tắt (×0.08) rồi nổ ra trên nền nhạc thấp (×0.35, 1.4s). Mép mềm 0.1s vào / 0.25s ra. Áp: xem trong game · render-cine · film-listen.
  K.DUCK_RE=/hit|punch|slash|clash|boom|explod|impact|kick|break|crunch|chain|bomb|klunk|super|wall|rock|collapse|katana|blade|quake|glass|force|shinra|strike|stab|parry|clang|bonk|smash|crash|cut|whip|grapple|drop|step_in|pushback|machdash/i;
  K.autoDuck=(sfx,o)=>{ o=o||{}; const D=[], re=o.re||K.DUCK_RE; for(const s of sfx||[]){ if(/^\s*\+/.test(String(s[4]||''))||!re.test(s[1])) continue; D.push([s[0]-0.12,s[0]+(o.hold||0.8),o.g==null?0.5:o.g]); }
    for(const t of o.decisive||[]){ D.push([t-0.6,t-0.03,0.08]); D.push([t-0.03,t+1.4,0.35]); } return D; };
  K.duckAt=(D,t)=>{ let g=1; for(const [a,b,gg] of D||[]){ if(t<a-0.1||t>=b+0.25) continue; const k=t<a?(t-(a-0.1))/0.1:t>b?1-(t-b)/0.25:1; g=Math.min(g,1-(1-gg)*clamp(k,0,1)); } return g; };
  K._musInfo=list=>(list||[]).map(m=>({src:m.src, ra:m.ra, rb:m.rb, vol:m.vol==null?1:m.vol, off:m.off||0, fi:m.fi||0, fo:m.fo||0, loop:!!m.loop, vo:!!m.vo}));

  // ───────── TẬP = nhiều CẢNH nối nhau (anh chốt 9/11/2026: tập dài chia mỗi cảnh 1 phim) ─────────
  // K.seq({ id, title, VW, VH, parts:['idCảnh1','idCảnh2',…] (đã CineKit.film trước), mus:[…] (nhạc nền / lồng tiếng theo giây CẢ TẬP) })
  // · Xem trong game: phát liền mạch, 1 thanh tua cả tập. Tiếng hiệu ứng (sfx) lấy từ từng cảnh; nhạc nền của TẬP (cảnh tự có mus riêng chỉ dùng khi xem lẻ cảnh đó).
  // · Xuất: render-cine <idTập> = cả tập (y như 1 phim) · render-cine <idCảnh> = chỉ cảnh đó (chỉ nạp ảnh cảnh đó) → sửa cảnh nào xuất lại cảnh đó.
  // · Cảnh giữa tập nên đặt fadeIn/fadeOut:false để nối cứng; chuyển cảnh mềm thì tự vẽ trong cảnh.
  K.seq=def=>{ const id=def.id, VW=def.VW||540, VH=def.VH||960;
    const parts=()=>def.parts.map(p=>K.films[p]);
    const offs=[]; let DUR=0; for(const f of parts()){ offs.push(DUR); DUR+=f.info().dur; }
    const at=t=>{ let i=0; for(let j=0;j<offs.length;j++) if(t>=offs[j]) i=j; return i; };
    let cv=null, W2=null, raf=null, t0=0, paused=false, pauseT=0, panel=null, overlay=null, ready=false, OFF=null;
    const curT=()=>paused?pauseT:(performance.now()-t0)/1000;
    const MUS=(def.mus||[]).map(m=>({...m, el:null}));
    let DK=null; const duckS=()=>DK||(DK=[].concat(...parts().map((f,i)=>(f.info().duck||[]).map(([a,b,g])=>[a+offs[i],b+offs[i],g]))));
    function musTick(t){ if(OFF) return; const voOn=MUS.some(m=>m.vo && t>=m.ra && t<m.rb); for(const m of MUS){ const on=!paused && t>=m.ra && t<m.rb;
        if(on && !m.el){ try{ const el=new Audio(m.src); el.loop=!!m.loop; el.currentTime=Math.max(0,(m.off||0)+(t-m.ra)); m.el=el; el.play().catch(()=>{});
          if(m.loop) el.addEventListener('loadedmetadata',()=>{ if(el.duration) el.currentTime=((m.off||0)+Math.max(0,curT()-m.ra))%el.duration; },{once:true}); }catch(e){} }
        if(!on && m.el){ try{ m.el.pause(); }catch(e){} m.el=null; }
        if(m.el){ const f=Math.min(m.fi?seg(t,m.ra,m.ra+m.fi):1, m.fo?1-seg(t,m.rb-m.fo,m.rb):1); try{ m.el.volume=clamp((m.vol==null?1:m.vol)*f*(voOn && !m.vo?0.4:1)*(m.vo?1:K.duckAt(duckS(),t)),0,1); }catch(e){} } } }
    function musStop(){ for(const m of MUS){ if(m.el){ try{ m.el.pause(); }catch(e){} m.el=null; } } }
    function renderAt(t){ t=clamp(t,0,DUR-1e-4); const i=at(t); parts()[i]._render(t-offs[i]); if(panel) panel.update(); }
    function frame(){ if(OFF) return; raf=requestAnimationFrame(frame); if(!ready) return; const t=Math.min(curT(),DUR); musTick(t); renderAt(t); }
    function seek(s){ s=clamp(s,0,DUR); parts().forEach((f,i)=>f._seek(s-offs[i])); try{ stopAllLongSfx(); }catch(e){} musStop(); if(paused) pauseT=s; else t0=performance.now()-s*1000; }
    function toggle(){ if(paused){ paused=false; t0=performance.now()-pauseT*1000; } else { pauseT=curT(); paused=true; try{ stopAllLongSfx(); }catch(e){} musStop(); } }
    function stop(){ if(raf) cancelAnimationFrame(raf); raf=null; try{ stopAllLongSfx(); }catch(e){} musStop(); if(window._cinePanelRemove) _cinePanelRemove(); panel=null; if(overlay) overlay.remove(); overlay=null; }
    function play(opts){ if(overlay) return; const SCALE=(opts&&opts.scale)||1;
      overlay=document.createElement('div'); overlay.style.cssText='position:fixed;inset:0;z-index:99999;background:#000;display:flex;align-items:center;justify-content:center;';
      cv=K.mk(VW*2*SCALE,VH*2*SCALE); cv.style.cssText=`height:100vh;max-width:100vw;aspect-ratio:${VW}/${VH};object-fit:contain;`;
      W2=K.mk(cv.width,cv.height); overlay.appendChild(cv); document.body.appendChild(overlay);
      OFF=opts&&opts.offline?{}:null;
      if(window._cinePanelMake && !OFF) panel=_cinePanelMake(overlay,{ title:def.title, dur:()=>DUR, t:()=>ready?Math.min(curT(),DUR):0, playing:()=>ready && !paused && curT()<DUR,
        toggle:()=>{ if(!ready) return; if(!paused && curT()>=DUR) seek(0); else toggle(); }, seek:s=>{ if(ready) seek(s); }, replay:()=>{ if(!ready) return; paused=false; seek(0); }, close:()=>stop() });
      try{ stopAllBattleMusic(); }catch(e){}
      parts().forEach(f=>{ f._bind(cv,W2,!!OFF); f._seek(0); });
      Promise.all(parts().map(f=>f._load())).then(()=>{ if(!overlay) return; ready=true; paused=false; t0=performance.now(); });
      paused=false; t0=performance.now(); if(!OFF) raf=requestAnimationFrame(frame); }
    const api={ play, stop, ready:()=>ready, step:R=>{ if(OFF && ready) renderAt(R); }, canvas:()=>cv, def, parts:def.parts, offsets:()=>offs.slice(),
      info:()=>{ const I={dur:DUR, sfx:[], mus:K._musInfo(def.mus), slow:[], duck:duckS()};
        parts().forEach((f,i)=>{ const o=offs[i], d=f.info(); for(const s of d.sfx) if(s[0]<d.dur) I.sfx.push([s[0]+o,s[1],s[2],s[3]]);
          for(const s of d.slow||[]) I.slow.push(Array.isArray(s)?s.map((v,j)=>j<2?v+o:v):s); });
        return I; } };
    K.films[id]=api; return api; };
  window.CineKit=K;
})();
