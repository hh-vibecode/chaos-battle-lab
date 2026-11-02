// ===================== 🌌 MEME LORE 2 · PROLOGUE "THE DARK AGE" (~2:50, 16:9 ngang) =====================
// Phim vũ trụ kiểu visual novel: chữ dẫn truyện (dải đen dưới, hiện từng từ, tên nhân vật có màu) + hình minh hoạ chuyển động.
// Không dùng máy quay 2.5D của cine-kit: mọi cảnh vẽ 2D theo toạ độ màn hình 960×540 (xuất 4K = ×4), mỗi cảnh có máy quay 2D riêng (cam()).
// Tỉ lệ: Friend là thực thể vũ trụ → to hơn hành tinh; 3 Supreme Meme to cỡ thần; vũ trụ bong bóng chứa cả thiên hà.
//   ACT 1 (0–47)    Dark Age: sao → các thế giới → bóng Friend mở mắt sau hành tinh → xúc tu đâm thủng lõi, hành tinh vỡ → nuốt từng thế giới
//   ACT 2 (47–104)  tàn lửa cơn giận → 3 ngôi sao → Supreme Cat · Bread Cat (mèo bơ xoay vô cực → hoá ổ bánh mì) · Flower Cat → cuộc chiến ~10 năm
//   ACT 3 (104–143) The Void mở mắt sau lưng Friend → hố đen phản bội → phong ấn → vỡ 5 mảnh bay vào 5 vũ trụ
//   ACT 4 (143–170) kỷ nguyên ánh sáng → đen → "Until now……" → mảnh vỡ mở mắt
// Nhạc tạm ghép từ tiếng có sẵn (def.mus) — thay bằng 1 bản nhạc vũ trụ không bản quyền dài ~2:50 là xong.
(function(){
  if(!window.CineKit || CineKit.films.l2pro) return;
  const K=CineKit, {seg,lerp,clamp,hash}=K, E=K.EASE, TAU=Math.PI*2, VW=960, VH=540, DUR=170;
  let IM={}, TT=0, SCv=1;
  const A='assets/audio/';

  // ───────── vật liệu chung ─────────
  const GLOW={};
  function glow(col){ if(GLOW[col]) return GLOW[col]; const c=K.mk(128,128), x=c.getContext('2d'), gr=x.createRadialGradient(64,64,0,64,64,64);
    gr.addColorStop(0,`rgba(${col},1)`); gr.addColorStop(0.22,`rgba(${col},0.5)`); gr.addColorStop(0.55,`rgba(${col},0.12)`); gr.addColorStop(1,`rgba(${col},0)`);
    x.fillStyle=gr; x.fillRect(0,0,128,128); return GLOW[col]=c; }
  function blob(g,x,y,r,col,a){ if(a<=0.003||r<=0) return; g.globalAlpha=Math.min(1,a); g.drawImage(glow(col),x-r,y-r,2*r,2*r); }
  function flare(g,x,y,r,col,a){ g.save(); g.globalCompositeOperation='lighter'; blob(g,x,y,r,col,a); blob(g,x,y,r*0.35,'255,255,255',a);
    g.globalAlpha=Math.min(1,a*0.8); g.drawImage(glow(col),x-r*3.2,y-r*0.07,r*6.4,r*0.14); g.drawImage(glow('255,255,255'),x-r*1.6,y-r*0.03,r*3.2,r*0.06); g.restore(); }
  function cam(g,cx,cy,z,rot){ g.translate(VW/2,VH/2); if(rot) g.rotate(rot); g.scale(z,z); g.translate(-cx,-cy); }
  const OFFS={};
  function off(id,size){ const px=Math.max(8,Math.ceil(size*SCv)); let c=OFFS[id]; if(!c||c.width!==px){ c=OFFS[id]=K.mk(px,px); }
    const x=c.getContext('2d'); x.setTransform(1,0,0,1,0,0); x.globalAlpha=1; x.globalCompositeOperation='source-over'; x.clearRect(0,0,px,px); x.setTransform(px/size,0,0,px/size,0,0); return [c,x]; }

  // ───────── ảnh nhân vật ─────────
  const RIM={};
  function rimOf(c,col,src){ const key=col+(src?'|f':''); c.rim=c.rim||{}; if(c.rim[key]) return c.rim[key]; const S=0.3, P=Math.round(Math.max(c.sw,c.sh)*S*0.1);
    let tt; if(src){ tt=K.mk(c.sw,c.sh); const y=tt.getContext('2d'); y.drawImage(src,0,0); y.globalCompositeOperation='source-in'; y.fillStyle=`rgb(${col})`; y.fillRect(0,0,c.sw,c.sh); } else tt=K.tinted(c,`rgb(${col})`);   // ảnh đã mờ đáy → viền sáng cũng theo
    const cw=Math.round(c.sw*S)+2*P, ch=Math.round(c.sh*S)+2*P, r=K.mk(cw,ch), x=r.getContext('2d');
    x.filter=`blur(${Math.max(2,P*0.45)}px)`; x.drawImage(tt,P,P,cw-2*P,ch-2*P); x.drawImage(tt,P,P,cw-2*P,ch-2*P); return c.rim[key]={cv:r,P,S}; }
  // vẽ ảnh: (x,y) = điểm neo (ax,ay theo tỉ lệ ảnh, mặc định giữa) · o: a, flip, rot, sx, sy, aura{preset|c0..,k}, rim:[col,a], tint:[col,a], comp
  function pic(g,key,x,y,h,o={}){ const c=K.prep(IM[key]); if(!c) return null; const w=h*c.sw/c.sh, a=o.a==null?1:o.a, ax=o.ax==null?0.5:o.ax, ay=o.ay==null?0.5:o.ay;
    const R={c,w,h,x,y,ax,ay,flip:!!o.flip}; if(a<=0.003 && !o.auraOnly) return R; const src=o.fadeB?fadeB(c,o.fadeB):null;
    g.save(); g.translate(x,y); if(o.rot) g.rotate(o.rot); g.scale((o.flip?-1:1)*(o.sx||1),o.sy||1);
    if(o.aura && window.VfxGL){ const Au=o.aura; VfxGL.drawAura(g,src||c.src,Object.assign({res:380},Au,{sx:src?0:c.sx,sy:src?0:c.sy,sw:c.sw,sh:c.sh,x:(0.5-ax)*w,y:(1-ay)*h,w,h,t:TT+(Au.seed||0),k:(Au.k==null?1:Au.k)*(o.auraOnly?1:a)})); }
    if(o.auraOnly){ g.restore(); return R; }
    if(o.rim){ const Rm=rimOf(c,o.rim[0],src), k=w/(c.sw*Rm.S); g.globalCompositeOperation='lighter'; g.globalAlpha=a*o.rim[1]; g.drawImage(Rm.cv,-ax*w-Rm.P*k,-ay*h-Rm.P*k,Rm.cv.width*k,Rm.cv.height*k); }
    g.globalCompositeOperation=o.comp||'source-over'; g.globalAlpha=a; if(src) g.drawImage(src,-ax*w,-ay*h,w,h); else g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,-ax*w,-ay*h,w,h);
    if(o.tint && o.tint[1]>0.003){ g.globalCompositeOperation='source-over'; g.globalAlpha=a*Math.min(1,o.tint[1]); let tc=K.tinted(c,o.tint[0]); if(src){ c.ft=c.ft||{}; tc=c.ft[o.tint[0]]||(c.ft[o.tint[0]]=(()=>{ const q=K.mk(c.sw,c.sh), y=q.getContext('2d'); y.drawImage(src,0,0); y.globalCompositeOperation='source-in'; y.fillStyle=o.tint[0]; y.fillRect(0,0,c.sw,c.sh); return q; })()); }
      g.drawImage(tc,-ax*w,-ay*h,w,h); }
    g.restore(); return R; }
  // ảnh bán thân (Flower Cat) bị cắt ngang đáy → mờ dần phần đáy để không lộ mép thẳng
  function fadeB(c,f){ c.fb=c.fb||{}; if(c.fb[f]) return c.fb[f]; const r=K.mk(c.sw,c.sh), x=r.getContext('2d'); x.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,0,0,c.sw,c.sh);
    x.globalCompositeOperation='destination-out'; const gr=x.createLinearGradient(0,c.sh*(1-f),0,c.sh); gr.addColorStop(0,'rgba(0,0,0,0)'); gr.addColorStop(1,'rgba(0,0,0,1)'); x.fillStyle=gr; x.fillRect(0,0,c.sw,c.sh);
    if(c.fbL){ const gl=x.createLinearGradient(0,0,c.sw*c.fbL,0); gl.addColorStop(0,'rgba(0,0,0,1)'); gl.addColorStop(1,'rgba(0,0,0,0)'); x.fillStyle=gl; x.fillRect(0,0,c.sw*c.fbL,c.sh); }   // ảnh cắt cả mép trái
    return c.fb[f]=r; }
  // tìm điểm đặc trưng trên ảnh (mắt vàng / hồng của Friend, vòng mắt The Void) — tính 1 lần
  const FEAT={};
  function feat(key,name,pred,split){ const id=key+'|'+name; if(FEAT[id]!==undefined) return FEAT[id]; const c=K.prep(IM[key]); if(!c) return null;
    const d=c.src.getContext('2d').getImageData(c.sx,c.sy,c.sw,c.sh).data, P=[];
    for(let y=0;y<c.sh;y+=2) for(let x=0;x<c.sw;x+=2){ const i=(y*c.sw+x)*4; if(d[i+3]>150 && pred(d[i],d[i+1],d[i+2])) P.push([x,y]); }
    if(!P.length) return FEAT[id]=null;
    const cen=pts=>{ let sx=0,sy=0; for(const p of pts){ sx+=p[0]; sy+=p[1]; } return {u:sx/pts.length/c.sw, v:sy/pts.length/c.sh}; };
    if(!split) return FEAT[id]=cen(P);
    const m=P.reduce((s,p)=>s+p[0],0)/P.length; const L=P.filter(p=>p[0]<m), Rr=P.filter(p=>p[0]>=m);
    return FEAT[id]=(L.length&&Rr.length)?[cen(L),cen(Rr)]:null; }
  const at=(R,f)=>R&&f?{x:R.x+(f.u-R.ax)*R.w*(R.flip?-1:1), y:R.y+(f.v-R.ay)*R.h}:null;
  const eyeY=()=>feat('fr','y',(r,g,b)=>r>200&&g>180&&b<110), eyeP=()=>feat('fr','p',(r,g,b)=>r>200&&g<175&&b>150);
  const voidHole=()=>feat('vdA','hole',(r,g,b)=>b>140&&g>110&&r<120&&b>r+50);
  const voidEyes=()=>feat('vd','ring',(r,g,b)=>r>150&&g>150&&b<200&&r+g>360,true);

  // ───────── bầu trời ─────────
  const PAL={ dark:['90,30,150','30,60,150','150,30,90','50,20,110'], war:['170,30,60','100,20,160','210,80,40','60,10,90'],
              light:['255,190,110','255,140,170','120,200,255','255,230,160'], rose:['255,120,190','160,60,170','255,180,140'] };
  const NEB={};
  function nebula(key,pal,seed){ const id=key+seed; if(NEB[id]) return NEB[id]; const W=1600,H=900, c=K.mk(W,H), x=c.getContext('2d');
    x.globalCompositeOperation='lighter';
    for(let i=0;i<110;i++){ const s=seed*17+i*1.13, u=hash(s), cx=u*W, cy=H*0.5+(hash(s+1)-0.5)*H*0.6+Math.sin(u*5+seed)*H*0.2, r=40+320*Math.pow(hash(s+2),2), col=pal[i%pal.length], a=0.035+0.1*hash(s+3);
      const gr=x.createRadialGradient(cx,cy,0,cx,cy,r); gr.addColorStop(0,`rgba(${col},${a})`); gr.addColorStop(1,`rgba(${col},0)`); x.fillStyle=gr; x.fillRect(cx-r,cy-r,2*r,2*r); }
    x.globalCompositeOperation='destination-out';
    for(let i=0;i<50;i++){ const s=seed*29+i*2.7, u=hash(s), cx=u*W, cy=H*0.5+(hash(s+1)-0.5)*H*0.4+Math.sin(u*5+seed)*H*0.2, r=20+110*hash(s+2);
      const gr=x.createRadialGradient(cx,cy,0,cx,cy,r); gr.addColorStop(0,'rgba(0,0,0,0.35)'); gr.addColorStop(1,'rgba(0,0,0,0)'); x.fillStyle=gr; x.fillRect(cx-r,cy-r,2*r,2*r); }
    const c2=K.mk(W,H), y=c2.getContext('2d'); y.filter='blur(7px)'; y.drawImage(c,0,0); return NEB[id]=c2; }
  function neb(g,key,seed,ox,oy,sc,a,rot){ const n=nebula(key,PAL[key],seed), w=VW*1.5*(sc||1), h=w*900/1600; g.save(); g.globalAlpha=a; g.globalCompositeOperation='lighter';
    g.translate(VW/2+(ox||0),VH/2+(oy||0)); if(rot) g.rotate(rot); g.drawImage(n,-w/2,-h/2,w,h); g.restore(); }
  function stars(g,t,o={}){ const z=o.z||1, px=o.px||0, py=o.py||0, a=o.a==null?1:o.a, seed=o.seed||0, dim=o.dim, LAY=[[420,0.2,0.55],[220,0.5,0.95],[80,1,1.6]];
    g.save(); g.fillStyle=o.tone||'#fff';
    for(let L=0;L<3;L++){ const [n,d,sz]=LAY[L], zz=1+(z-1)*d, WW=VW*1.2, HH=VH*1.2;
      for(let i=0;i<n;i++){ const s=seed*100+L*1000+i; let x=((hash(s)*WW-px*d)%WW+WW)%WW-VW*0.1, y=((hash(s+0.5)*HH-py*d)%HH+HH)%HH-VH*0.1;
        x=VW/2+(x-VW/2)*zz; y=VH/2+(y-VH/2)*zz; if(x<-6||x>VW+6||y<-6||y>VH+6) continue;
        let al=a*(0.3+0.7*hash(s+2))*(0.72+0.28*Math.sin(t*(0.8+hash(s+3)*2.5)+i)); if(dim) al*=dim(x,y); if(al<0.02) continue;
        const r=sz*(0.6+0.8*hash(s+4))*Math.min(2.4,zz); g.globalAlpha=al;
        if(r<1.3) g.fillRect(x-r/2,y-r/2,r,r); else { g.beginPath(); g.arc(x,y,r/2,0,TAU); g.fill(); }
        if(L===2 && hash(s+5)>0.78){ g.globalCompositeOperation='lighter'; blob(g,x,y,r*4.5,o.col||'170,190,255',al*0.55); g.globalCompositeOperation='source-over'; } } }
    g.restore(); }
  function bgFill(g,c0,c1){ const gr=g.createLinearGradient(0,0,0,VH); gr.addColorStop(0,c0); gr.addColorStop(1,c1); g.fillStyle=gr; g.fillRect(-2000,-2000,VW+4000,VH+4000); }

  // ───────── hành tinh ─────────
  const LD=(()=>{ const v=[-0.62,0.48,0.62], l=Math.hypot(...v); return v.map(a=>a/l); })();
  const PL={ home:{sea:['#2a86c4','#0a2a55'],land:['#4f9f55','#2f6b3a'],atm:'110,190,255',lights:1,cloud:1,seed:1,rot:0.05},
    desert:{sea:['#c58a4a','#5a2e14'],land:['#e0b070','#9a5a2a'],atm:'255,190,120',lights:1,seed:2,rot:0.06},
    ice:{sea:['#9fd0e6','#2a5a7a'],land:['#f0f8ff','#c4e2f2'],atm:'190,230,255',lights:1,cloud:1,seed:3,rot:0.04},
    violet:{sea:['#7a5ac0','#24144f'],land:['#b394e6','#5a3e9a'],atm:'190,150,255',lights:1,cloud:1,seed:4,rot:0.05},
    ember:{sea:['#b85a3a','#3a120a'],land:['#e08a4a','#7a2a14'],atm:'255,140,90',lights:1,seed:5,rot:0.07},
    moon:{sea:['#b8b4c4','#44404e'],land:['#8e8a9a','#6a6676'],seed:6,rot:0.02},
    sea2:{sea:['#3ab0b0','#0a3a4a'],land:['#7ad08a','#3a8a5a'],atm:'120,240,220',lights:1,cloud:1,seed:7,rot:0.05} };
  let NOISE=null;
  function noiseTex(){ if(NOISE) return NOISE; const c=K.mk(256,256), x=c.getContext('2d'); for(let i=0;i<2600;i++){ const v=hash(i*1.37), l=hash(i*2.11)>0.5; x.fillStyle=l?`rgba(255,255,255,${0.25*v})`:`rgba(0,0,0,${0.35*v})`; x.beginPath(); x.arc(hash(i*3.7)*256,hash(i*5.3)*256,0.6+3.2*hash(i*7.1),0,TAU); x.fill(); }
    const c2=K.mk(256,256), y=c2.getContext('2d'); y.filter='blur(1.2px)'; y.drawImage(c,0,0); return NOISE=c2; }
  function planet(g,x,y,r,P,t,o={}){ const rot=(P.rot||0.05)*t+(P.seed||0)*1.7, dark=o.dark||0, dead=o.dead||0;
    g.save(); g.beginPath(); g.arc(x,y,r,0,TAU); g.clip();
    let gr=g.createRadialGradient(x-r*0.35,y-r*0.35,r*0.1,x,y,r*1.05); gr.addColorStop(0,P.sea[0]); gr.addColorStop(1,P.sea[1]); g.fillStyle=gr; g.fillRect(x-r,y-r,2*r,2*r);
    const LT=[];
    for(let i=0;i<18;i++){ const s=(P.seed||0)*31+i*7.3, lon=hash(s)*TAU+rot, lat=(hash(s+1.7)-0.5)*2.4;
      const px=Math.sin(lon)*Math.cos(lat), py=Math.sin(lat), pz=Math.cos(lon)*Math.cos(lat); if(pz<-0.05) continue;
      const rr=r*(0.1+0.16*hash(s+2.9)), fx=Math.max(0.14,Math.sqrt(Math.max(0,1-px*px)));
      g.fillStyle=i%3?P.land[0]:P.land[1]; g.globalAlpha=clamp(pz*4+0.2,0,1);
      for(let j=0;j<3;j++){ const ox=(hash(s+j*3.3)-0.5)*rr*1.2, oy=(hash(s+j*5.1)-0.5)*rr*0.9; g.beginPath(); g.ellipse(x+px*r+ox*fx,y-py*r+oy,rr*fx*(0.7+0.5*hash(s+j)),rr*(0.6+0.4*hash(s+j+9)),0,0,TAU); g.fill(); }
      const lit=px*LD[0]+py*LD[1]+pz*LD[2]; if(P.lights && lit<0.2) for(let j=0;j<6;j++) LT.push([x+px*r+(hash(s+j*1.9)-0.5)*rr*1.5*fx, y-py*r+(hash(s+j*2.7)-0.5)*rr*1.1, pz]); }
    if(P.cloud){ g.fillStyle='#fff'; for(let i=0;i<12;i++){ const s=(P.seed||0)*53+i*4.1, lon=hash(s)*TAU+rot*1.35, lat=(hash(s+1)-0.5)*2.2;
      const px=Math.sin(lon)*Math.cos(lat), py=Math.sin(lat), pz=Math.cos(lon)*Math.cos(lat); if(pz<0) continue; const fx=Math.max(0.14,Math.sqrt(Math.max(0,1-px*px)));
      g.globalAlpha=0.22*clamp(pz*3,0,1); g.beginPath(); g.ellipse(x+px*r,y-py*r,r*0.3*fx,r*0.05,0,0,TAU); g.fill(); } }
    { const N=noiseTex(), off=((rot*r*0.6)%(2*r)+2*r)%(2*r); g.globalCompositeOperation='overlay'; g.globalAlpha=0.6; g.drawImage(N,x-r-off,y-r,2*r,2*r); g.drawImage(N,x+r-off,y-r,2*r,2*r); g.globalCompositeOperation='source-over'; }
    g.globalAlpha=1;
    const lx=x+LD[0]*r*0.8, ly=y-LD[1]*r*0.8; gr=g.createRadialGradient(lx,ly,r*0.05,lx,ly,r*1.95);
    gr.addColorStop(0,'rgba(255,255,255,0.1)'); gr.addColorStop(0.42,'rgba(0,0,0,0)'); gr.addColorStop(0.74,'rgba(2,2,14,0.78)'); gr.addColorStop(1,'rgba(0,0,6,0.96)'); g.fillStyle=gr; g.fillRect(x-r,y-r,2*r,2*r);
    if(dead>0){ g.globalAlpha=dead*0.75; g.fillStyle='#2a0c0a'; g.fillRect(x-r,y-r,2*r,2*r); g.globalAlpha=1; }
    if(LT.length && dark<1){ g.globalCompositeOperation='lighter'; for(let i=0;i<LT.length;i++){ const L=LT[i], off=hash(i*3.7+(P.seed||0)); // đèn tắt dần từng cụm
        const al=(1-clamp((dark-off*0.7)/0.3,0,1))*clamp(L[2]*3,0,1); blob(g,L[0],L[1],r*0.045,'255,200,110',al*0.95); } }
    if(o.core>0){ g.globalCompositeOperation='lighter'; blob(g,x,y,r*(0.6+o.core*0.9),'255,110,40',o.core); blob(g,x,y,r*0.4*o.core,'255,240,200',o.core); }
    g.restore();
    if(P.atm && !o.noAtm){ g.save(); g.globalCompositeOperation='lighter'; gr=g.createRadialGradient(x,y,r*0.9,x,y,r*1.2); gr.addColorStop(0,`rgba(${P.atm},${0.5*(1-dead)})`); gr.addColorStop(1,`rgba(${P.atm},0)`);
      g.fillStyle=gr; g.beginPath(); g.arc(x,y,r*1.2,0,TAU); g.arc(x,y,r*0.9,0,TAU,true); g.fill(); g.restore(); } }
  // vết nứt dung nham lan từ 1 điểm trên mặt hành tinh vào lõi
  function cracks(g,x,y,r,ang,k,seed){ if(k<=0) return; g.save(); g.beginPath(); g.arc(x,y,r,0,TAU); g.clip(); g.globalCompositeOperation='lighter'; g.lineCap='round'; g.lineJoin='round';
    for(let b=0;b<7;b++){ const s=seed*13+b*3.7; let px=x+Math.cos(ang)*r*0.95, py=y+Math.sin(ang)*r*0.95, a=ang+Math.PI+(hash(s)-0.5)*1.8; const L=r*(0.45+1.0*hash(s+1))*clamp(k*(1.2-b*0.08),0,1), n=12, pts=[[px,py]];
      for(let i=1;i<=n;i++){ a+=(hash(s+i*1.3)-0.5)*0.9; px+=Math.cos(a)*L/n; py+=Math.sin(a)*L/n; pts.push([px,py]); }
      for(const [lw,col] of [[r*0.06,'255,80,30,0.22'],[r*0.02,'255,160,70,0.85'],[r*0.007,'255,245,220,1']]){ g.strokeStyle=`rgba(${col})`; g.lineWidth=lw; g.beginPath(); pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); } }
    g.restore(); }
  // vỡ thành mảnh: src = canvas phủ ô [x-R, x+R] · k 0..1 · n mảnh nan quạt (mỗi nan tách trong/ngoài)
  function shatter(g,src,x,y,R,k,seed,n,hot){ n=n||12;
    const bnd=i=>{ const j=((i%n)+n)%n, base=j*TAU/n+(hash(seed*7+j)-0.5)*0.35+(i>=n?TAU:0), rm=R*(0.38+0.22*hash(seed*3+j));   // đường nứt chung giữa 2 mảnh kề nhau → khít
      return [[0,base],[rm,base+(hash(seed+j*5.1)-0.5)*0.3],[R*0.72,base+(hash(seed+j*6.3)-0.5)*0.4],[R*1.05,base+(hash(seed+j*7.7)-0.5)*0.35],[R*1.5,base]]; };
    const P=(r,a)=>[x+Math.cos(a)*r,y+Math.sin(a)*r];
    for(let i=0;i<n;i++){ const A=bnd(i), B=bnd(i+1), am=(A[0][1]+B[0][1])/2, s=seed*11+i;
      for(const inner of [0]){ const sp=(inner?0.3:0.7+hash(s+2))*R*1.5*k, rt=(hash(s+3+inner)-0.5)*(inner?1.2:2.6)*k, cx=x+Math.cos(am)*R*(inner?0.22:0.75), cy=y+Math.sin(am)*R*(inner?0.22:0.75);
        g.save(); g.translate(Math.cos(am)*sp,Math.sin(am)*sp); g.translate(cx,cy); g.rotate(rt); g.translate(-cx,-cy); g.beginPath();
        const pts=inner?[P(0,0),P(...A[1]),P(...B[1])]:[P(...A[1]),P(...A[2]),P(...A[3]),P(...A[4]),P(...B[4]),P(...B[3]),P(...B[2]),P(...B[1])];
        pts.forEach((p,q)=>q?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.closePath(); g.save(); g.clip(); g.drawImage(src,x-R,y-R,2*R,2*R); g.restore(); g.strokeStyle='rgba(12,6,8,0.85)'; g.lineWidth=R*0.03; g.stroke();
        if(hot && k<0.5){ g.globalCompositeOperation='lighter'; g.strokeStyle=`rgba(${hot},${0.7*(1-k*2)})`; g.lineWidth=R*0.008; g.stroke(); }
        g.restore(); } } }
  function planetBurst(g,id,x,y,r,P,t,k,o){ const R=r*1.25, [c,x2]=off(id,2*R); planet(x2,R,R,r,P,t,Object.assign({noAtm:1},o||{})); shatter(g,c,x,y,R,k,P.seed||1,12,'255,140,60'); }

  // ───────── xúc tu bóng tối (khói đặc, không phải bộ phận vẽ tay) ─────────
  function tentacle(g,t,x0,y0,x1,y1,k,w,seed,o={}){ if(k<=0.001) return null; const dx=x1-x0, dy=y1-y0, L=Math.hypot(dx,dy)||1, nx=-dy/L, ny=dx/L, bend=(o.bend==null?0.22:o.bend)*L, N=50, P=[];
    for(let i=0;i<=N;i++){ const s=i/N*k, b=Math.sin(s*Math.PI)*bend, wv=Math.sin(s*9-t*(o.sp||2.4)+seed*3)*L*0.035*(0.3+s)*(o.wave==null?1:o.wave);
      P.push([x0+dx*s+nx*(b+wv), y0+dy*s+ny*(b+wv), w*(1-(o.taper==null?0.86:o.taper)*s)]); }
    g.save(); g.lineCap='round'; g.globalCompositeOperation='lighter';
    for(let i=0;i<=N;i+=2) blob(g,P[i][0],P[i][1],P[i][2]*2.6,o.glow||'130,50,255',0.13*(o.a==null?1:o.a));
    g.globalCompositeOperation='source-over'; g.globalAlpha=o.a==null?1:o.a;
    for(const [ex,col] of [[2.6,o.rim||'#5b24b8'],[0,'#06000c']]){ g.strokeStyle=col; for(let i=1;i<=N;i++){ g.lineWidth=P[i][2]+ex; g.beginPath(); g.moveTo(P[i-1][0],P[i-1][1]); g.lineTo(P[i][0],P[i][1]); g.stroke(); } }
    for(let j=0;j<8;j++){ const s=hash(seed*9+j)*k, i=Math.round(s/k*N), p=P[Math.min(N,i)], dr=(t*0.6+hash(seed+j))%1;   // khói bốc ra
      blob(g,p[0]+(hash(j+seed)-0.5)*20,p[1]-dr*40,p[2]*(1.5+dr*2),'14,0,28',(1-dr)*0.55*(o.a==null?1:o.a)); }
    g.restore(); return P[N]; }   // [x, y, bề ngang ở đầu]

  // ───────── 🌪️ BÃO TÀ ÁC: xoáy mây đen cuộn quanh đôi mắt Friend, mép loé tím, sét tím giật — vùng tối lan tràn ─────────
  function storm(g,t,cx,cy,R,a){ if(a<=0.01) return; g.save();
    let gr=g.createRadialGradient(cx,cy,R*0.1,cx,cy,R*1.15); gr.addColorStop(0,`rgba(0,0,0,${a})`); gr.addColorStop(0.75,`rgba(4,0,10,${0.92*a})`); gr.addColorStop(1,'rgba(4,0,10,0)');
    g.fillStyle=gr; g.fillRect(cx-R*1.2,cy-R*1.2,R*2.4,R*2.4);
    g.globalCompositeOperation='lighter';
    for(let i=0;i<70;i++){ const s=i*1.37, rr=R*(0.35+0.75*hash(s)), an=hash(s+1)*TAU+t*(0.5-0.32*rr/R); blob(g,cx+Math.cos(an)*rr,cy+Math.sin(an)*rr*0.62,R*(0.1+0.12*hash(s+2)),i%5?'90,30,180':'170,50,140',0.2*a); }
    for(let i=0;i<90;i++){ const f=i/90, an=f*9+t*0.6, rr=R*(0.15+0.85*f); blob(g,cx+Math.cos(an)*rr,cy+Math.sin(an)*rr*0.62,R*0.07*(1-f*0.5),'190,120,255',0.16*a*(1-f*0.6)); blob(g,cx+Math.cos(an+Math.PI)*rr,cy+Math.sin(an+Math.PI)*rr*0.62,R*0.07*(1-f*0.5),'190,120,255',0.16*a*(1-f*0.6)); }   // 2 cánh xoắn ốc sáng tím   // vành mây phát sáng tím
    g.globalCompositeOperation='source-over';
    for(let i=0;i<150;i++){ const s=i*2.11+5, rr=R*(0.12+0.95*Math.sqrt(hash(s))), an=hash(s+1)*TAU+t*(0.55-0.38*rr/R)+rr/R*2.2; blob(g,cx+Math.cos(an)*rr,cy+Math.sin(an)*rr*0.62,R*(0.09+0.13*hash(s+2)),'6,0,12',0.55*a); }   // dải mây đen xoắn ốc
    g.globalCompositeOperation='lighter';
    const pu=0.7+0.3*Math.sin(t*2.3); blob(g,cx-R*0.07,cy-R*0.04,R*0.07,'255,230,60',0.75*a*pu); blob(g,cx+R*0.07,cy-R*0.04,R*0.07,'255,110,200',0.75*a*pu);   // đôi mắt trong tâm bão
    for(let j=0;j<3;j++){ const id=Math.floor(t*1.6+j*0.37), fr=(t*1.6+j*0.37)-id; if(hash(id*3.1+j)>0.55 || fr>0.22) continue;   // sét tím giật trong bão
      const an=hash(id*5.3)*TAU, r0=R*(0.25+0.4*hash(id*7.1)); let x=cx+Math.cos(an)*r0, y=cy+Math.sin(an)*r0*0.62, d=an+(hash(id)-0.5); const al=a*(1-fr/0.22);
      blob(g,x,y,R*0.35,'170,90,255',0.35*al); g.strokeStyle=`rgba(225,190,255,${al})`; g.lineWidth=2; g.beginPath(); g.moveTo(x,y);
      for(let k=0;k<9;k++){ d+=(hash(id*11+k)-0.5)*1.2; x+=Math.cos(d)*R*0.07; y+=Math.sin(d)*R*0.05; g.lineTo(x,y); } g.stroke(); }
    g.restore(); }
  // cánh tay bóng tối LIỀN 1 KHỐI với bàn tay (anh dặn 2/11: tay và cánh tay phải cùng 1 thể, không như gắn vào)
  // = chép cách vẽ _hmArmSprite của Scared Hamster trong game: thân đen bóng, mép run nét vẽ tay, vệt sáng ngắn chạy dọc thớ tay,
  //   đoạn cuối THẲNG theo hướng cổ tay của ảnh + bề ngang đúng bằng cổ tay ảnh → nối không thấy mối. Ảnh tay: cổ tay vào từ mép TRÁI.
  const HAND_META={handL:{w:382,h:315,wy:167,ww:90,fo:134}, handC:{w:333,h:238,wy:107.5,ww:91,fo:117}, handG:{w:333,h:238,wy:107.5,ww:91,fo:117}};
  function shadowArm(g,t,x0,y0,x1,y1,k,wd,seed,pose,o={}){ if(k<=0.02) return; const im=IM[pose], m=HAND_META[pose]; if(!im||!im.complete||!im.naturalWidth||!m) return;
    const sc=wd/(m.ww*0.97), dx=x1-x0, dy=y1-y0, L0=Math.hypot(dx,dy)||1, ang=Math.atan2(dy,dx), ux=dx/L0, uy=dy/L0, nx=-uy, ny=ux;
    const rx=x0+dx*k, ry=y0+dy*k, off=m.fo*sc, W0={x:rx-ux*off, y:ry-uy*off}, Lf=wd*1.3, bend=(o.bend||0.2)*L0*k;
    const P=[{x:x0,y:y0}, {x:lerp(x0,W0.x,0.5)+nx*bend+Math.sin(t*1.7+seed)*wd*0.6, y:lerp(y0,W0.y,0.5)+ny*bend+Math.cos(t*1.3+seed)*wd*0.6}, {x:W0.x-ux*Lf, y:W0.y-uy*Lf}, {x:W0.x+ux*wd*0.12, y:W0.y+uy*wd*0.12}];
    if(Math.hypot(W0.x-x0,W0.y-y0)<Lf*1.5) P.splice(1,1);
    const D=[]; for(let i=0;i<P.length-1;i++){ const p0=P[Math.max(0,i-1)], p1=P[i], p2=P[i+1], p3=P[Math.min(P.length-1,i+2)], sg=Math.max(2,Math.ceil(Math.hypot(p2.x-p1.x,p2.y-p1.y)/4));
      for(let j=0;j<sg;j++){ const q=j/sg, q2=q*q, q3=q2*q;
        D.push({x:0.5*(2*p1.x+(-p0.x+p2.x)*q+(2*p0.x-5*p1.x+4*p2.x-p3.x)*q2+(-p0.x+3*p1.x-3*p2.x+p3.x)*q3), y:0.5*(2*p1.y+(-p0.y+p2.y)*q+(2*p0.y-5*p1.y+4*p2.y-p3.y)*q2+(-p0.y+3*p1.y-3*p2.y+p3.y)*q3)}); } }
    D.push(P[P.length-1]); const n=D.length; if(n<2) return;
    const S=[0]; for(let i=1;i<n;i++) S.push(S[i-1]+Math.hypot(D[i].x-D[i-1].x,D[i].y-D[i-1].y)); const L=S[n-1]||1;
    const C=[], N=[], Wd=[];
    for(let i=0;i<n;i++){ const p=D[Math.max(0,i-1)], q=D[Math.min(n-1,i+1)], ddx=q.x-p.x, ddy=q.y-p.y, l=Math.hypot(ddx,ddy)||1, mx=-ddy/l, my=ddx/l;
      const s=S[i], toW=L-s, damp=Math.min(1,s/(wd*1.5))*clamp((toW-Lf*1.1)/(Lf*1.5),0,1), ow=wd*0.22*damp*Math.sin(t*2.2+(1-s/L)*4.5+seed);
      C.push({x:D[i].x+mx*ow, y:D[i].y+my*ow}); N.push({x:mx,y:my});
      const flare=1+0.6*Math.max(0,1-s/(wd*2)), mid=1+0.12*Math.sin(Math.PI*Math.min(1,s/Math.max(1,L-Lf))), wr=Math.min(1,toW/Lf), jit=(Math.sin(s*0.09+seed*3)*0.55+Math.sin(s*0.23+seed*7)*0.3)*wd*0.035;
      Wd.push(wd*0.5*(wr*flare*mid+(1-wr))+jit*wr); }
    const A=o.a==null?1:o.a; g.save(); g.globalAlpha=A;
    g.globalCompositeOperation='lighter'; for(let i=0;i<n;i+=6) blob(g,C[i].x,C[i].y,Wd[i]*3.2,o.glow||'90,30,180',0.1);   // quầng tím mờ — bám đều cả cánh tay lẫn bàn tay
    blob(g,rx,ry,off*1.6,o.glow||'90,30,180',0.14);
    g.globalCompositeOperation='source-over'; blob(g,x0,y0,wd*1.6,'4,0,8',0.9);   // gốc tay chìm vào bóng tối
    g.globalAlpha=A; g.fillStyle='#050505'; g.beginPath();
    for(let i=0;i<n;i++){ const j=Math.sin(S[i]*0.17+seed*5)*wd*0.02; const x=C[i].x+N[i].x*(Wd[i]+j), y=C[i].y+N[i].y*(Wd[i]+j); i?g.lineTo(x,y):g.moveTo(x,y); }
    for(let i=n-1;i>=0;i--){ const j=Math.sin(S[i]*0.15+seed*9)*wd*0.02; g.lineTo(C[i].x-N[i].x*(Wd[i]+j), C[i].y-N[i].y*(Wd[i]+j)); }
    g.closePath(); g.fill();
    g.lineCap='round'; const step=wd*0.42, rows=[-0.62,-0.34,-0.08,0.2,0.46,0.7];   // vệt sáng chạy dọc thớ tay — cùng nét với ảnh bàn tay
    for(let r=0;r<rows.length;r++) for(let b=0;b*step<L-wd*0.2;b++){ const hv=hash(b*7.3+r*13.1+seed*29); if(hv<0.74) continue;
      const s0=b*step+hash(b+7+r*3)*step*0.5, s1=s0+wd*(0.14+0.22*hash(b+r*5+3)); if(s0<wd*0.9) continue;
      let i0=0; while(i0<n-1 && S[i0]<s0) i0++; let i1=i0; while(i1<n-1 && S[i1]<s1) i1++; if(i1<=i0) continue;
      const cc=165+(hv*40|0); g.strokeStyle=`rgba(${cc},${cc},${cc+5},${0.12+0.22*hv})`; g.lineWidth=Math.max(0.6,wd*(0.012+0.018*hv));
      g.beginPath(); for(let i=i0;i<=i1;i++){ const ow=rows[r]*Wd[i]; const x=C[i].x+N[i].x*ow, y=C[i].y+N[i].y*ow; i>i0?g.lineTo(x,y):g.moveTo(x,y); } g.stroke(); }
    if(o.root){ const cut=Math.min(L*0.7,o.root);   // gốc tay chìm dần vào bóng tối: khói đen phủ dày ở gốc, mỏng dần ra phía cổ tay — không có mép cắt
      for(let i=0;i<n;i+=2){ if(S[i]>cut) break; const f=S[i]/cut, dr=Math.sin(t*1.3+i*0.7+seed)*wd*0.4; blob(g,C[i].x+dr,C[i].y-dr*0.6,Wd[i]*2.4+wd*(2.2-1.6*f),'5,0,10',0.95*Math.pow(1-f,1.3)); }
      for(let j=0;j<6;j++){ const ph=(t*0.35+hash(seed*7+j))%1, i=Math.min(n-1,Math.floor(n*Math.min(0.9,cut/L)*hash(seed+j*3))), q=C[i]; blob(g,q.x+(hash(j+seed)-0.5)*wd*3,q.y-ph*wd*4,wd*(1.4+2*ph),'10,2,20',0.5*(1-ph)); } }   // khói bốc nhẹ
    g.globalAlpha=A; g.globalCompositeOperation='source-over'; g.translate(W0.x,W0.y); g.rotate(ang); g.scale(sc,sc*(o.mir||1)); g.drawImage(im,0,-m.wy,m.w,m.h);   // bàn tay: cổ tay đặt đúng đầu cánh tay
    g.restore(); }
  // ───────── vật thể vũ trụ ─────────
  function rays(g,x,y,R,n,t,col,a,seed){ if(a<=0.01) return; g.save(); g.globalCompositeOperation='lighter';
    for(let i=0;i<n;i++){ const s=seed*5+i, ang=hash(s)*TAU+t*0.04*(hash(s+3)-0.5), wd=0.015+0.05*hash(s+1), len=R*(0.55+0.7*hash(s+2)), al=a*(0.25+0.75*hash(s+4))*(0.75+0.25*Math.sin(t*1.3+i));
      const gr=g.createLinearGradient(x,y,x+Math.cos(ang)*len,y+Math.sin(ang)*len); gr.addColorStop(0,`rgba(${col},${al})`); gr.addColorStop(1,`rgba(${col},0)`);
      g.fillStyle=gr; g.beginPath(); g.moveTo(x,y); g.lineTo(x+Math.cos(ang-wd)*len,y+Math.sin(ang-wd)*len); g.lineTo(x+Math.cos(ang+wd)*len,y+Math.sin(ang+wd)*len); g.closePath(); g.fill(); }
    g.restore(); }
  function ring(g,x,y,r,w,col,a){ if(a<=0.01||r<=0) return; g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle=`rgba(${col},${a*0.35})`; g.lineWidth=w*3; g.beginPath(); g.arc(x,y,r,0,TAU); g.stroke();
    g.strokeStyle=`rgba(${col},${a})`; g.lineWidth=w; g.stroke(); g.restore(); }
  function beam(g,x0,y0,x1,y1,w,col,a){ if(a<=0.01) return; g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round';
    for(const [lw,c,al] of [[w*3.2,col,0.14],[w*1.5,col,0.45],[w*0.5,'255,255,255',0.95]]){ g.strokeStyle=`rgba(${c},${al*a})`; g.lineWidth=lw; g.beginPath(); g.moveTo(x0,y0); g.lineTo(x1,y1); g.stroke(); }
    g.restore(); }
  function burst(g,x,y,t0,t,n,sp,col,seed,life){ const u=t-t0; life=life||0.9; if(u<0||u>life) return; g.save(); g.globalCompositeOperation='lighter';
    for(let i=0;i<n;i++){ const a=hash(seed+i)*TAU, v=sp*(0.3+0.7*hash(seed+i*2)), d=v*E.eout(u/life), k=1-u/life; blob(g,x+Math.cos(a)*d,y+Math.sin(a)*d,2+3*hash(seed+i*3),col,k); } g.restore(); }
  const BUBCOL=['120,180,255','255,160,220','160,255,210','255,210,140','190,150,255'];
  function bubble(g,x,y,r,t,seed,a,o={}){ if(a<=0.01) return; const col=o.col||BUBCOL[seed%5], br=o.br||0; g.save(); g.globalAlpha=a;
    let gr=g.createRadialGradient(x-r*0.3,y-r*0.3,r*0.1,x,y,r); gr.addColorStop(0,`rgba(${col},0.16)`); gr.addColorStop(0.8,`rgba(${col},0.07)`); gr.addColorStop(1,`rgba(${col},0.3)`);
    g.fillStyle=gr; g.beginPath(); g.arc(x,y,r,0,TAU); g.fill(); g.globalCompositeOperation='lighter';
    for(let j=0;j<46;j++){ const arm=j%2, f=j/46, ang=f*7+arm*Math.PI+t*0.25+seed, rr=r*0.62*f; blob(g,x+Math.cos(ang)*rr,y+Math.sin(ang)*rr*0.55,r*(0.05+0.04*(1-f)),col,a*0.5*(1-f*0.6)); }
    blob(g,x,y,r*0.22,'255,255,255',a*0.5);
    g.globalAlpha=a; g.strokeStyle=`rgba(${col},${0.55+br*0.45})`; g.lineWidth=Math.max(0.8,r*0.025*(1+br*2)); g.beginPath(); g.arc(x,y,r,0,TAU); g.stroke();
    g.strokeStyle=`rgba(255,255,255,0.35)`; g.lineWidth=r*0.03; g.beginPath(); g.arc(x,y,r*0.86,Math.PI*1.1,Math.PI*1.45); g.stroke();
    if(br>0) blob(g,x,y,r*1.6,o.brc||col,br*0.6);
    g.restore(); }
  function bubblePop(g,x,y,r,u,seed,col){ if(u<0||u>1.6) return; const k=E.eout(clamp(u/1.2,0,1)); g.save(); g.globalCompositeOperation='lighter';
    blob(g,x,y,r*(1+k*1.5),'255,255,255',(1-k)*0.9); ring(g,x,y,r*(1+k*1.8),r*0.03,col,(1-k));
    g.lineWidth=r*0.04; for(let i=0;i<9;i++){ const a0=i/9*TAU+hash(seed+i)*0.3, d=r*(1+k*(0.8+hash(seed+i*2))); g.strokeStyle=`rgba(${col},${1-k})`;
      g.beginPath(); g.arc(x+Math.cos(a0+0.2)*(d-r),y+Math.sin(a0+0.2)*(d-r),r,a0,a0+0.45); g.stroke(); }
    g.restore(); }
  function blackHole(g,x,y,R,t,a){ if(R<1||a<=0.01) return; g.save(); g.globalCompositeOperation='lighter'; blob(g,x,y,R*4.5,'255,120,50',0.35*a); blob(g,x,y,R*2.2,'255,200,140',0.3*a);
    const disk=front=>{ for(let i=0;i<14;i++){ const rr=R*(1.3+i*0.1); g.strokeStyle=`rgba(255,${200-i*8},${140-i*8},${(0.5-i*0.025)*a})`; g.lineWidth=R*0.08;
        g.setLineDash([rr*(0.3+0.5*hash(i)),rr*0.18]); g.lineDashOffset=-t*rr*(1.8-i*0.07); g.beginPath(); g.ellipse(x,y,rr*1.75,rr*0.34,-0.16,front?0:Math.PI,front?Math.PI:TAU); g.stroke(); } g.setLineDash([]); };
    disk(false);
    g.strokeStyle=`rgba(255,190,120,${0.55*a})`; g.lineWidth=R*0.14; g.beginPath(); g.ellipse(x,y,R*1.3,R*1.22,-0.16,Math.PI*1.02,Math.PI*1.98); g.stroke();   // vành bị bẻ cong phía sau
    g.strokeStyle=`rgba(255,240,220,${0.9*a})`; g.lineWidth=R*0.05; g.beginPath(); g.arc(x,y,R*1.05,0,TAU); g.stroke();
    g.globalCompositeOperation='source-over'; g.globalAlpha=a; g.fillStyle='#000'; g.beginPath(); g.arc(x,y,R,0,TAU); g.fill(); g.globalAlpha=1;
    g.globalCompositeOperation='lighter'; disk(true); g.restore(); }
  function sealCircle(g,x,y,R,rot,a,col){ if(a<=0.01) return; g.save(); g.translate(x,y); g.globalCompositeOperation='lighter'; g.lineCap='round';
    const st=(w,al)=>{ g.strokeStyle=`rgba(${col},${al*a})`; g.lineWidth=Math.min(w,w*260/R); };
    g.save(); g.rotate(rot);
    st(R*0.012,0.9); g.beginPath(); g.arc(0,0,R,0,TAU); g.stroke(); g.beginPath(); g.arc(0,0,R*0.9,0,TAU); g.stroke();
    st(R*0.008,0.8); for(let i=0;i<96;i++){ const an=i/96*TAU, l=i%4?0.03:0.06; g.beginPath(); g.moveTo(Math.cos(an)*R*0.9,Math.sin(an)*R*0.9); g.lineTo(Math.cos(an)*R*(0.9+l),Math.sin(an)*R*(0.9+l)); g.stroke(); }
    for(let i=0;i<24;i++){ const an=i/24*TAU+0.13, cx=Math.cos(an)*R*0.8, cy=Math.sin(an)*R*0.8, s=R*0.035, ty=Math.floor(hash(i*3.3)*4);   // ký hiệu phong ấn
      g.save(); g.translate(cx,cy); g.rotate(an+Math.PI/2); st(R*0.007,0.85); g.beginPath();
      if(ty===0){ g.arc(0,0,s,0,TAU); g.moveTo(-s*1.4,0); g.lineTo(s*1.4,0); } else if(ty===1){ g.moveTo(0,-s*1.3); g.lineTo(s,0); g.lineTo(0,s*1.3); g.lineTo(-s,0); g.closePath(); }
      else if(ty===2){ g.moveTo(-s,-s); g.lineTo(-s,s); g.moveTo(s,-s); g.lineTo(s,s); g.moveTo(-s,0); g.lineTo(s,0); } else { g.moveTo(0,-s*1.2); g.lineTo(s*1.1,s); g.lineTo(-s*1.1,s); g.closePath(); }
      g.stroke(); g.restore(); }
    g.restore(); g.save(); g.rotate(-rot*1.6);
    st(R*0.01,0.85); g.beginPath(); g.arc(0,0,R*0.66,0,TAU); g.stroke(); g.beginPath(); g.arc(0,0,R*0.6,0,TAU); g.stroke();
    for(const off of [0,Math.PI/4]){ g.beginPath(); for(let i=0;i<=4;i++){ const an=off+i/4*TAU; const px=Math.cos(an)*R*0.6, py=Math.sin(an)*R*0.6; i?g.lineTo(px,py):g.moveTo(px,py); } g.stroke(); }   // 2 hình vuông lồng = sao 8 cánh (4 kẻ phong ấn)
    g.restore(); g.save(); g.rotate(rot*0.7); st(R*0.006,0.6); g.setLineDash([R*0.04,R*0.03]); g.beginPath(); g.arc(0,0,R*0.42,0,TAU); g.stroke(); g.restore();
    g.restore(); }
  function embers(g,t,n,o){ g.save(); g.globalCompositeOperation='lighter'; const T=o.targets, ck=o.conv||0;
    for(let i=0;i<n;i++){ const s=i*1.71+3, sp=18+40*hash(s), ph=hash(s+1); let x=hash(s+2)*VW*1.1-VW*0.05+Math.sin(t*0.7+i)*14, y=VH+30-(((t*sp)+ph*(VH+80))%(VH+80));
      if(ck>0 && T){ const tg=T[i%T.length], kk=E.ein(clamp(ck*(1.1-0.3*hash(s+5)),0,1)), sw=(1-kk)*2.2+i*0.37+t*1.2, rr=(1-kk)*90*hash(s+6);
        x=lerp(x,tg[0]+Math.cos(sw)*rr,kk); y=lerp(y,tg[1]+Math.sin(sw)*rr*0.6,kk); }
      const al=(0.35+0.65*hash(s+3))*(0.6+0.4*Math.sin(t*6+i))*(o.a==null?1:o.a)*(y>VH-80?clamp((VH+30-y)/110,0,1):1);
      blob(g,x,y,1.6+3.5*hash(s+4),hash(s+7)>0.7?'255,190,90':'255,90,40',al); }
    g.restore(); }
  function petals(g,t,u,n,cx,cy){ g.save();
    for(let i=0;i<n;i++){ const s=i*2.31+9, a0=hash(s)*TAU, r0=380+340*hash(s+1), k=E.eout(clamp(u/1.7,0,1)), orb=70+170*hash(s+2), ang=a0+t*(0.5+0.6*hash(s+3))+(1-k)*2.5, rr=lerp(r0,orb,k);
      const x=cx+Math.cos(ang)*rr, y=cy+Math.sin(ang)*rr*0.6, sz=4+5*hash(s+4), rt=t*2*(hash(s+5)-0.5)+a0;
      g.save(); g.translate(x,y); g.rotate(rt); g.globalAlpha=(0.35+0.4*hash(s+6))*(0.5+0.5*Math.sin(t*3+i)); g.fillStyle=hash(s+7)>0.5?'#ffb3d9':'#ff7fbf';
      g.beginPath(); g.ellipse(0,0,sz,sz*0.5,0,0,TAU); g.fill(); g.globalCompositeOperation='lighter'; g.globalAlpha=0.4; g.fillStyle='#fff'; g.beginPath(); g.ellipse(-sz*0.2,-sz*0.1,sz*0.4,sz*0.15,0,0,TAU); g.fill(); g.restore(); }
    g.restore(); }
  function shard(g,x,y,R,rot,seed){ const n=9, P=[]; for(let i=0;i<n;i++){ const an=i/n*TAU+(hash(seed+i)-0.5)*0.5, rr=R*(0.55+0.5*hash(seed+i*2)); P.push([Math.cos(an)*rr,Math.sin(an)*rr*1.3]); }
    g.save(); g.translate(x,y); g.rotate(rot); g.globalCompositeOperation='lighter'; blob(g,0,0,R*2,'120,40,230',0.35);
    g.globalCompositeOperation='source-over'; g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.closePath(); g.fillStyle='#040008'; g.fill();
    g.strokeStyle='rgba(170,90,255,0.6)'; g.lineWidth=R*0.012; g.stroke(); g.restore(); }

  // ───────── bố cục thời gian ─────────
  const T={ worlds:10, reveal:19, pierce:29, devour:38, embers:47, born:57, sup:63, bread:69, flower:76, line:82, war:86.5, voidS:104, hole:115, seal:122, split:132, light:143, black:155, until:158.5, eye:164.5 };
  const BREAD_POP=T.bread+2.6, SEAL_HIT=T.seal+5.6, EYE_OPEN=T.eye+1.7, EYE_HIT=T.eye+2.9;
  const DEV=[{x:180,y:300,r:55,P:PL.desert,tk:1.5},{x:350,y:175,r:38,P:PL.ice,tk:3},{x:530,y:345,r:72,P:PL.violet,tk:4.5},{x:730,y:205,r:46,P:PL.ember,tk:6},{x:930,y:330,r:62,P:PL.sea2,tk:7.4}];
  const BORN=[[480,215,'255,214,120',1.5],[300,290,'255,170,90',2.5],[660,290,'255,140,200',3.5]];
  const WAR={fr:{x:210,y:300,h:500}, orbs:[{x:800,y:235,col:'255,214,120',key:'sup',h:210},{x:690,y:385,col:'255,180,100',key:'bread',h:80},{x:890,y:395,col:'255,150,210',key:'flower',h:130,fb:0.3}]};
  const BUBS=[]; for(let gx=-3;gx<=6;gx++) for(let gy=-2;gy<=3;gy++){ const i=BUBS.length+gx*7+gy*3, x=480+gx*230+(hash(i*3.1+1)-0.5)*120, y=290+gy*200+(hash(i*5.7+2)-0.5)*90;
    if(Math.abs(x-480)<560 && Math.abs(y-290)<330) continue; BUBS.push({x,y,r:45+55*hash(i*2.3+3)}); }
  BUBS.forEach((b,i)=>{ b.pop=hash(i*9.1)<0.6?T.war+9.3+hash(i*4.4)*4:null; });
  const SPLIT=[...Array(5).keys()].map(i=>{ const an=-Math.PI/2+i*TAU/5+0.2; return {an, bx:480+Math.cos(an)*880, by:290+Math.sin(an)*540}; });

  // ───────── CẢNH ─────────
  function sTitle(g,t){ neb(g,'dark',3,-t*6,0,1+t*0.02,0.85*seg(t,0,3)); stars(g,t,{z:1+t*0.07,seed:1}); }
  function sWorlds(g,t){ const u=t-T.worlds, edge=-80+E.ein(seg(u,4.5,9))*640;
    neb(g,'dark',3,-60-u*5,10,1.1,0.8); stars(g,t,{seed:1,px:u*10,dim:x=>clamp((x-edge)/80,0,1)});
    g.save(); cam(g,470+u*7,270,1+u*0.012);
    planet(g,200,390,38,PL.ice,t); planet(g,610,290,150,PL.home,t); planet(g,395,165,22,PL.moon,t); g.restore();
    const gr=g.createLinearGradient(edge-260,0,edge+40,0); gr.addColorStop(0,'rgba(0,0,0,0.97)'); gr.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=gr; g.fillRect(0,0,Math.max(0,edge+40),VH);
    if(edge>-40){ g.save(); g.globalCompositeOperation='lighter'; const gg=g.createLinearGradient(edge-60,0,edge+30,0); gg.addColorStop(0,'rgba(90,30,170,0)'); gg.addColorStop(0.6,'rgba(90,30,170,0.18)'); gg.addColorStop(1,'rgba(90,30,170,0)'); g.fillStyle=gg; g.fillRect(edge-60,0,90,VH); g.restore(); } }
  function sReveal(g,t){ const u=t-T.reveal, rise=E.eout(seg(u,0,4.2)), open=seg(u,3.5,4.1), z=1+E.eio(seg(u,4.5,10))*0.22;
    neb(g,'dark',5,u*4,0,1.15,0.55); stars(g,t,{seed:2,px:u*3});
    const fy=lerp(600,290,rise); const ey=eyeY(), ep=eyeP();
    const fx=480, tx=480, ty=lerp(290,220,E.eio(seg(u,4.5,10)));
    g.save(); cam(g,tx,ty,z);
    const R=pic(g,'fr',fx,fy,470,{aura:{preset:'cursed',k:0.2+0.4*seg(u,3.5,6),seed:2,res:420},rim:['140,60,255',0.35+0.5*seg(u,0.5,4)],tint:['#000',1-open]});
    if(R && open>0){ const Y=at(R,ey), P=at(R,ep); g.save(); g.globalCompositeOperation='lighter'; const pu=0.75+0.25*Math.sin(t*3);
      if(Y) blob(g,Y.x,Y.y,26+30*open,'255,230,60',open*0.7*pu); if(P) blob(g,P.x,P.y,26+30*open,'255,110,200',open*0.7*pu); g.restore(); }
    planet(g,480,420,52,PL.home,t,{dark:seg(u,6,10)*0.5});
    g.restore(); }
  function sPierce(g,t){ const u=t-T.pierce, BURST=6.8, px=360, py=300, r=170, shk=u>BURST?0:Math.sin(t*40)*seg(u,2.6,6.8)*2;
    neb(g,'dark',7,-u*3,0,1.1,0.6); stars(g,t,{seed:3,px:u*4});
    g.save(); cam(g,480+shk,270,1+u*0.01);
    pic(g,'fr',860,170,470,{aura:{preset:'cursed',k:0.8,seed:4,res:420},rim:['140,60,255',0.6]});
    const TEN=[{rx:730,ry:200,an:-0.25,d:0},{rx:800,ry:330,an:0.4,d:0.25},{rx:690,ry:80,an:-0.85,d:0.5}];
    if(u<BURST){
      planet(g,px,py,r,PL.home,t,{dark:seg(u,3,5.8),core:E.ein(seg(u,4,BURST))});
      TEN.forEach((q,i)=>cracks(g,px,py,r,q.an,seg(u,2.7+q.d,5.8+q.d),i+3));
      g.save(); const clipOut=()=>{ g.beginPath(); g.rect(-500,-500,2000,1600); g.arc(px,py,r*0.98,0,TAU,true); g.clip(); }; clipOut();
      TEN.forEach((q,i)=>{ const k=E.ein(seg(u,0.6+q.d,2.6+q.d)), dep=lerp(1.0,0.45,E.eout(seg(u,2.6+q.d,5.5))), tx=px+Math.cos(q.an)*r*dep, ty=py+Math.sin(q.an)*r*dep;
        tentacle(g,t,q.rx,q.ry,tx,ty,k,26,i+1,{bend:0.18*(i%2?1:-1)}); });
      g.restore();
      TEN.forEach(q=>{ const hk=seg(u,2.6+q.d,3+q.d); if(hk>0){ g.save(); g.globalCompositeOperation='lighter'; blob(g,px+Math.cos(q.an)*r,py+Math.sin(q.an)*r,30+20*hk,'255,120,50',hk*0.8); g.restore(); } });
    } else {
      const k=E.eout(seg(u,BURST,BURST+2.6)); planetBurst(g,'pb',px,py,r,PL.home,t,k,{dark:1,dead:0.3,core:1});
      g.save(); g.globalCompositeOperation='lighter'; blob(g,px,py,r*(1.2+k*2.5),'255,130,50',(1-k)*1.2); blob(g,px,py,r*(0.5+k),'255,250,230',(1-k)); g.restore();
      ring(g,px,py,r*(1+k*3.2),6,'255,170,90',1-k); burst(g,px,py,T.pierce+BURST,t,60,520,'255,150,70',17,1.8);
      TEN.forEach((q,i)=>{ const back=E.eout(seg(u,BURST,BURST+2)); tentacle(g,t,q.rx,q.ry,lerp(px+Math.cos(q.an)*r*0.5,q.rx-120,back),lerp(py+Math.sin(q.an)*r*0.5,q.ry+40,back),1,26,i+1,{bend:0.2}); }); }
    g.restore(); }
  function sDevour(g,t){ const u=t-T.devour, cx=480+u*14, SR=250+u*22, scx=cx-480+150+u*42, edge=scx+SR*0.85;
    neb(g,'dark',9,-u*8,0,1.2,0.65); stars(g,t,{seed:4,px:u*14,dim:x=>clamp((x-(edge-cx+480)-40)/120,0,1)});
    g.save(); cam(g,cx,270,1);
    storm(g,t,scx,270,SR,seg(u,0,1.2));
    const gr=g.createLinearGradient(scx+SR*0.3,0,edge+120,0); gr.addColorStop(0,'rgba(2,0,6,0)'); gr.addColorStop(0.6,'rgba(2,0,6,0.6)'); gr.addColorStop(1,'rgba(2,0,6,0)'); g.fillStyle=gr; g.fillRect(scx+SR*0.3,-200,edge+120-scx-SR*0.3,VH+400);   // bóng tối tràn ra trước mép bão
    DEV.forEach((p,i)=>{ const crumb=u-(p.tk+1.4); if(crumb<0) planet(g,p.x,p.y,p.r,p.P,t,{dark:seg(u,p.tk,p.tk+0.7),dead:seg(u,p.tk+0.3,p.tk+1.3),core:seg(u,p.tk+0.6,p.tk+1.4)*0.6});
      else if(crumb<3){ const k=E.ein(seg(crumb,0,2.6)), px=lerp(p.x,scx,k), py=lerp(p.y,270,k), r2=p.r*(1-0.88*k);   // co lại, bị hút vào tâm bão
        if(r2>1) planet(g,px,py,r2,p.P,t,{dark:1,dead:1,core:0.7*(1-k)});
        g.save(); g.globalCompositeOperation='lighter'; for(let j=0;j<22;j++){ const h=i*31+j, dd=(hash(h)*0.6+0.15)*p.r*(1+crumb*1.5), aa=Math.atan2(py-270,px-scx)+(hash(h+1)-0.5)*1.6;   // bụi cháy kéo thành vệt về phía bão
          blob(g,px+Math.cos(aa)*dd,py+Math.sin(aa)*dd,1.5+2.5*hash(h+2),hash(h+3)>0.6?'255,190,110':'255,100,50',(1-k)*0.8); } g.restore(); } });
    DEV.forEach((p,i)=>{ const k=E.eio(seg(u,p.tk-1.6,p.tk-0.2)), rel=seg(u,p.tk+1.4,p.tk+2.6); if(k<=0||rel>=1) return;
      const y0=270+(hash(i*7)-0.5)*300, grab=u>=p.tk-0.2, pose=!grab?'handL':u<p.tk+0.2?'handC':'handG';
      const da=Math.atan2(p.y-270,p.x-scx), tx=p.x-Math.cos(da)*p.r*0.35, ty=p.y-Math.sin(da)*p.r*0.35;   // tay mọc từ mép bão về ĐÚNG hướng hành tinh của nó, không vắt qua hành tinh khác
      shadowArm(g,t,scx+Math.cos(da)*SR*0.3,270+Math.sin(da)*SR*0.3*0.62,tx,ty,k*(1-rel*0.7),11+p.r*0.1,i+7,pose,{bend:0.07*(i%2?1:-1),glow:'90,30,180',root:SR*0.62}); });
    g.restore(); }
  function sEmbers(g,t){ const u=t-T.embers; bgFill(g,'#030106','#0d0306');
    stars(g,t,{seed:5,a:0.25,px:u*2});
    g.save(); g.globalCompositeOperation='lighter'; const gr=g.createLinearGradient(0,VH,0,VH*0.4); gr.addColorStop(0,`rgba(140,30,20,${0.35*seg(u,0,3)})`); gr.addColorStop(1,'rgba(140,30,20,0)'); g.fillStyle=gr; g.fillRect(0,0,VW,VH); g.restore();
    for(let i=0;i<14;i++){ const s=i*4.3, x=((hash(s)*VW*1.3+u*(6+10*hash(s+1)))%(VW*1.3))-VW*0.15, y=hash(s+2)*VH, sz=4+14*hash(s+3), rt=u*0.3*(hash(s+4)-0.5)*4;   // xác hành tinh trôi
      g.save(); g.translate(x,y); g.rotate(rt); g.fillStyle='#1a1418'; g.strokeStyle='rgba(255,90,40,0.35)'; g.lineWidth=1; g.beginPath(); for(let j=0;j<6;j++){ const an=j/6*TAU, rr=sz*(0.6+0.5*hash(s+j)); j?g.lineTo(Math.cos(an)*rr,Math.sin(an)*rr):g.moveTo(Math.cos(an)*rr,Math.sin(an)*rr); } g.closePath(); g.fill(); g.stroke(); g.restore(); }
    embers(g,t,Math.round(120+380*seg(u,0,6)),{targets:BORN.map(b=>[b[0],b[1]]),conv:seg(u,6.8,10),a:seg(u,0,1.5)}); }
  function sBorn(g,t){ const u=t-T.born, z=1+u*0.025; bgFill(g,'#040108','#0a0306');
    g.save(); cam(g,480,260,z); stars(g,t,{seed:6,a:0.35});
    neb(g,'war',2,0,0,1,0.35*seg(u,1.5,5));
    embers(g,t,300,{targets:BORN.map(b=>[b[0],b[1]]),conv:1,a:1-seg(u,1.2,4)});
    BORN.forEach(([x,y,col,ti],i)=>{ const k=seg(u,ti,ti+0.4); if(k<=0){ g.save(); g.globalCompositeOperation='lighter'; blob(g,x,y,10+8*Math.sin(t*9+i),col,0.8); g.restore(); return; }
      const v=u-ti; ring(g,x,y,20+v*260,3,col,clamp(1-v/1.4,0,1)); rays(g,x,y,260,18,t,col,0.35*k,i+2); flare(g,x,y,60+20*Math.sin(t*2+i),col,0.9*k+0.6*(1-seg(v,0,0.5))); });
    g.restore(); }
  function sSupreme(g,t){ const u=t-T.sup; bgFill(g,'#0b0508','#1a0d06');
    neb(g,'light',4,-u*4,-30,1.2,0.35); stars(g,t,{seed:7,a:0.5,col:'255,220,160'});
    g.save(); cam(g,480,lerp(300,270,E.eio(seg(u,0,6))),lerp(1.08,1.0,E.eout(seg(u,0,6))));
    rays(g,600,150,620,28,t,'255,214,120',0.32,9); flare(g,600,130,90,'255,214,120',0.55);
    for(let i=0;i<40;i++){ const s=i*3.3, x=600+(hash(s)-0.5)*600, y=560-((u*30*(0.5+hash(s+1))+hash(s+2)*500)%520); g.save(); g.globalCompositeOperation='lighter'; blob(g,x,y,2+3*hash(s+3),'255,220,150',0.6); g.restore(); }
    pic(g,'sup',600,530,420,{ay:1,aura:{preset:'holy',k:0.45,seed:5,res:420},rim:['255,214,140',0.7],tint:['#fff',1-seg(u,0.6,2.6)]});
    g.restore(); }
  function sBread(g,t){ const u=t-T.bread; bgFill(g,'#0a0603','#1a0e04'); neb(g,'light',6,u*3,20,1.15,0.3); stars(g,t,{seed:8,a:0.45,col:'255,220,160'});
    const cx=480, cy=270, sz=230;
    const lem=s=>{ const d=1+Math.sin(s)**2; return [cx+sz*Math.cos(s)/d, cy+sz*0.9*Math.sin(s)*Math.cos(s)/d]; };
    if(t<BREAD_POP){ const sp=E.ein(seg(u,0,2.6)), ph=u*1.4+sp*9, rot=u*u*5.5+u*3;
      g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round';   // vệt ∞ vàng nó để lại
      const trail=Math.min(TAU*3,ph); for(const [lw,c,al] of [[14,'255,190,90',0.12],[5,'255,210,120',0.45],[1.6,'255,255,240',0.9]]){ g.strokeStyle=`rgba(${c},${al*seg(u,0.2,1)})`; g.lineWidth=lw; g.beginPath();
        for(let s=Math.max(0,ph-trail),i=0;s<=ph;s+=0.05,i++){ const p=lem(s); i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]); } g.stroke(); }
      g.restore();
      const p=lem(ph), k=lerp(1,0,E.ein(seg(u,2.1,2.6))), x=lerp(cx,p[0],k), y=lerp(cy,p[1],k);
      for(let i=5;i>=1;i--) pic(g,'butter',x,y,170,{rot:rot-i*0.18*(1+sp*3),a:0.12*(1-i/6)});
      pic(g,'butter',x,y,170,{rot,aura:{c0:'#fff6d8',c1:'#ffc35a',c2:'#d9822b',preset:'holy',k:0.4+sp,seed:1,res:300}});
      g.save(); g.globalCompositeOperation='lighter'; blob(g,cx,cy,60+sp*160,'255,200,110',sp*0.6); g.restore(); }
    else { const v=t-BREAD_POP, k=E.eout(seg(v,0,0.8));
      g.save(); cam(g,480,280,lerp(1.15,1.0,E.eout(seg(v,0,4.4))));
      rays(g,580,250,560,26,t,'255,190,100',0.3*k,11); flare(g,580,250,120,'255,190,100',0.3*k);
      for(let i=0;i<28;i++){ const an=i/28*TAU+t*0.35, rr=220+30*Math.sin(t+i); g.save(); g.globalCompositeOperation='lighter'; blob(g,580+Math.cos(an)*rr,290+Math.sin(an)*rr*0.35,2.5+2*hash(i),'255,220,150',0.7*k); g.restore(); }
      pic(g,'bread',590,300+Math.sin(t*1.2)*4,260,{aura:{c0:'#fff6d8',c1:'#ffc35a',c2:'#d9822b',preset:'holy',k:0.5,seed:3,res:420},rim:['255,200,120',0.7],tint:['#fff',1-seg(v,0.1,1.4)]});
      g.restore();
      ring(g,480,290,40+v*600,5,'255,220,150',clamp(1-v/1.1,0,1)); }
    }
  function sFlower(g,t){ const u=t-T.flower; bgFill(g,'#0a0309','#180612'); neb(g,'rose',3,-u*4,0,1.2,0.4*seg(u,0,1.5)); stars(g,t,{seed:9,a:0.45,col:'255,180,220'});
    g.save(); cam(g,480,280,lerp(1.0,1.08,seg(u,0,6)));
    rays(g,600,230,520,22,t,'255,150,210',0.28*seg(u,0.8,2),13);
    pic(g,'flower',600,560,420,{ay:1,fadeB:0.3,a:seg(u,0.9,2.2),aura:{c0:'#ffffff',c1:'#ffb3dd',c2:'#ff5fae',preset:'holy',k:0.45,seed:7,res:420},rim:['255,160,215',0.6],tint:['#fff',1-seg(u,1.3,2.8)]});
    petals(g,t,u,120,600,300);
    g.restore(); }
  function sLine(g,t){ const u=t-T.line; bgFill(g,'#05030a','#0d0708');
    neb(g,'light',8,120-u*6,0,1.1,0.4); stars(g,t,{seed:10,a:0.55,px:u*4});
    const gr=g.createLinearGradient(0,0,VW*0.45,0); gr.addColorStop(0,'rgba(0,0,0,0.97)'); gr.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=gr; g.fillRect(0,0,VW*0.45,VH);
    g.save(); g.globalCompositeOperation='lighter'; const pu=0.6+0.4*Math.sin(t*2.2); blob(g,92,232,14,'255,230,60',0.8*pu); blob(g,128,232,14,'255,110,200',0.8*pu); g.restore();   // mắt Friend xa trong bóng tối
    g.save(); cam(g,560,300,lerp(1.14,1.02,E.eout(seg(u,0,4.5))));
    rays(g,620,200,520,24,t,'255,214,140',0.22,15);
    pic(g,'bread',420,470,140,{ay:1,aura:{c0:'#fff6d8',c1:'#ffc35a',c2:'#d9822b',preset:'holy',k:0.4,seed:3},rim:['255,200,120',0.6]});
    pic(g,'sup',620,470,330,{ay:1,aura:{preset:'holy',k:0.4,seed:5},rim:['255,214,140',0.6]});
    pic(g,'flower',830,520,250,{ay:1,fadeB:0.3,aura:{c0:'#ffffff',c1:'#ffb3dd',c2:'#ff5fae',preset:'holy',k:0.4,seed:7},rim:['255,160,215',0.5]});
    g.restore(); }
  // ── chiến tranh ──
  const WARS=[[T.war,480,290,1,1.05],[T.war+4,0,0,2.1,2.3],[T.war+6.5,790,300,1.3,1.42],[T.war+9,480,290,0.5,0.44],[T.war+13.5,540,290,1.2,1.32]];
  function warWorld(g,t,u,frR){ const W=WAR, C=[500+40*Math.sin(t*0.8),300+30*Math.sin(t*1.3)], dim=1-0.7*seg(u,13.5,17.5);
    BUBS.forEach((b,i)=>{ const pu=b.pop?t-b.pop:-1; if(pu<0) bubble(g,b.x,b.y,b.r,t,i,0.75); else bubblePop(g,b.x,b.y,b.r,pu,i,BUBCOL[i%5]); });
    const R=pic(g,'fr',W.fr.x,W.fr.y,W.fr.h,{aura:{preset:'cursed',k:0.9,seed:6,res:420},rim:['140,60,255',0.6]}); if(frR) frR.R=R;
    const ey=eyeY(), ep=eyeP(); if(R){ const Y=at(R,ey), P=at(R,ep); g.save(); g.globalCompositeOperation='lighter'; if(Y) blob(g,Y.x,Y.y,30,'255,230,60',0.6); if(P) blob(g,P.x,P.y,30,'255,110,200',0.6); g.restore(); }
    const nT=5+Math.round(5*seg(u,13.5,17));
    for(let i=0;i<nT;i++){ const s=i*1.9, ry=200+i*28, tx=lerp(C[0]-20+Math.sin(t*1.7+i)*60, W.orbs[i%3].x-40, seg(u,13.5,17.5)*hash(s+1)), ty=C[1]+Math.sin(t*1.3+i*2)*90+(i-nT/2)*14;
      tentacle(g,t,W.fr.x+120+hash(s)*30,280+i*16,tx,ty,0.85+0.15*Math.sin(t*2+i),20,i+20,{bend:0.25*(i%2?1:-1),wave:1.5}); }
    W.orbs.forEach((o,i)=>{ const fl=0.85+0.15*Math.sin(t*7+i*2), al=dim*fl, ox=o.x+Math.sin(t*0.9+i)*8, oy=o.y+Math.cos(t*0.7+i)*6;
      const fire=(u>1.1 && u<12.5) || (u>13.5 && Math.sin(t*3+i)>0.3); if(fire) beam(g,ox-o.h*0.25,oy,C[0],C[1],10*dim*(0.8+0.2*Math.sin(t*20+i)),o.col,al);
      g.save(); g.globalCompositeOperation='lighter'; blob(g,ox,oy,o.h*1.1,o.col,0.45*al); g.restore();
      pic(g,o.key,ox,oy,o.h,{a:al,fadeB:o.fb,aura:{preset:'holy',c1:'#ffe9b0',k:0.35,seed:i*3,res:300},rim:[o.col,0.7]}); flare(g,ox-o.h*0.25,oy,26,o.col,0.6*al); });
    if(u>1.1 && u<17.5){ flare(g,C[0],C[1],70+20*Math.sin(t*13),'255,220,170',0.9*(u<13.5?1:1-seg(u,15,17.5))); for(let j=0;j<10;j++) burst(g,C[0],C[1],T.war+1.1+j*0.6,t,16,180,'255,200,140',j*13,0.6); } }
  function sWar(g,t){ const u=t-T.war; bgFill(g,'#050208','#0a0306'); let sh=WARS[0]; for(const s of WARS) if(t>=s[0]) sh=s; const ix=WARS.indexOf(sh), su=t-sh[0], sd=(WARS[ix+1]?WARS[ix+1][0]:T.voidS)-sh[0];
    neb(g,'war',3,-u*5,0,1.25,0.55); stars(g,t,{seed:11,px:u*6,a:0.8});
    let cx=sh[1], cy=sh[2]; if(ix===1){ const R=K.prep(IM.fr); const h=WAR.fr.h, w=R?h*R.sw/R.sh:h, ey=eyeY(); cx=ey?WAR.fr.x+(ey.u-0.5)*w+40:WAR.fr.x; cy=ey?WAR.fr.y+(ey.v-0.5)*h+30:WAR.fr.y-100; }
    g.save(); cam(g,cx,cy,lerp(sh[3],sh[4],E.eio(seg(su,0,sd)))); warWorld(g,t,u); g.restore(); }
  function sVoid(g,t){ const u=t-T.voidS, open=seg(u,2,2.6), full=seg(u,5,8);
    bgFill(g,'#020104','#050208'); stars(g,t,{seed:12,a:0.55,px:u*2});
    g.save(); cam(g,lerp(480,400,E.eio(seg(u,4,11))),lerp(290,240,E.eio(seg(u,4,11))),lerp(1,1.12,E.eio(seg(u,4,11))));
    const V=pic(g,'vd',300,200,430,{fadeB:0.3,rim:['170,150,255',0.1+0.3*full],tint:['#000',0.9]});
    const VE=voidEyes(); if(V&&VE&&open>0){ g.save(); g.globalCompositeOperation='lighter'; for(const e of VE){ const p=at(V,e); blob(g,p.x,p.y,34+20*open,'240,240,170',0.55*open*(0.8+0.2*Math.sin(t*2))); } g.restore(); }
    const R=pic(g,'fr',520,340,440,{aura:{preset:'cursed',k:0.85,seed:8,res:420},rim:['140,60,255',0.55],sy:1+0.012*Math.sin(t*1.5)});
    if(R){ const Y=at(R,eyeY()), P=at(R,eyeP()); g.save(); g.globalCompositeOperation='lighter'; if(Y) blob(g,Y.x,Y.y,26,'255,230,60',0.6); if(P) blob(g,P.x,P.y,26,'255,110,200',0.6); g.restore(); }
    WAR.orbs.forEach((o,i)=>{ g.save(); g.globalCompositeOperation='lighter'; blob(g,820+i*42,440-i*14,14,o.col,0.35+0.15*Math.sin(t*5+i)); g.restore(); });
    g.restore(); }
  function sHole(g,t){ const u=t-T.hole, MX=650, MY=235, pull=E.eio(seg(u,0.4,3)), open=seg(u,0.25,0.45);
    bgFill(g,'#020104','#060208'); stars(g,t,{seed:12,a:0.55,dim:(x,y)=>clamp(Math.hypot(x-MX,y-MY)/260,0,1)});
    g.save(); cam(g,lerp(560,520,E.eio(seg(u,0,7))),lerp(270,280,E.eio(seg(u,0,7))),lerp(1.0,1.06,E.eio(seg(u,0,7))));
    const hole=voidHole()||{u:0.39,v:0.5}, VH2=lerp(560,600,E.eout(seg(u,0,7)));
    pic(g,'vd',MX,MY,VH2*0.8,{a:1-open,tint:['#000',0.85],ax:0.42,ay:0.55});
    const V=pic(g,'vdA',MX,MY,VH2,{a:open,ax:hole.u,ay:hole.v,rim:['150,120,255',0.25]});
    const MR=V?V.w*0.075:50;   // miệng = vòng tròn quanh hố
    if(open>0){ g.save(); g.beginPath(); g.arc(MX,MY,MR*1.9,0,TAU); g.clip(); g.globalCompositeOperation='lighter';   // xoáy sáng trong miệng
      for(let i=0;i<12;i++){ const rr=MR*(0.6+i*0.12); g.strokeStyle=`rgba(${i%2?'120,220,255':'190,120,255'},${0.35*open*(1-i/13)})`; g.lineWidth=MR*0.05; g.setLineDash([rr*0.5,rr*0.35]); g.lineDashOffset=-t*rr*(2.4-i*0.12);
        g.beginPath(); g.ellipse(MX,MY,rr,rr*0.82,-0.2,0,TAU); g.stroke(); } g.setLineDash([]); g.restore();
      g.save(); g.globalAlpha=open; g.fillStyle='#000'; g.beginPath(); g.arc(MX,MY,MR*0.55,0,TAU); g.fill(); g.strokeStyle='rgba(200,240,255,0.9)'; g.lineWidth=MR*0.05; g.stroke(); g.restore(); }
    g.save(); g.globalCompositeOperation='lighter';   // ánh sáng, bụi bị hút vào miệng
    for(let i=0;i<60;i++){ const s=i*1.9, an=hash(s)*TAU, ph=((t*(0.25+0.3*hash(s+1))+hash(s+2))%1), d=MR*(1.2+7*(1-ph)), d2=d-MR*(0.6+1.2*ph);
      g.strokeStyle=`rgba(${i%3?'190,150,255':'255,255,255'},${0.5*ph*pull})`; g.lineWidth=1.3; g.beginPath(); g.moveTo(MX+Math.cos(an)*d,MY+Math.sin(an)*d*0.8); g.lineTo(MX+Math.cos(an+0.15)*d2,MY+Math.sin(an+0.15)*d2*0.8); g.stroke(); }
    g.restore();
    // Friend: gồng nhích lên trước CỰC CHẬM, thân bị kéo nhoè thành vệt về phía hố
    const fx=lerp(330,300,seg(u,0,7)), fy=lerp(345,360,seg(u,0,7)), fh=lerp(290,310,seg(u,0,7)), dx=MX-fx, dy=MY-fy, sh=Math.sin(t*31)*2*pull;
    for(let i=14;i>=1;i--){ const k=i/14, ex=0.85*pull*E.ein(k); pic(g,'fr',fx+dx*ex+sh,fy+dy*ex,fh*(1-0.55*k*pull),{a:(0.6*(1-k)+0.08)*pull,tint:['#5b24b8',0.35+0.6*k],sx:1+0.6*k*pull}); }
    for(let j=0;j<10;j++){ const s=j*2.3, ph=((t*0.9+hash(s))%1), k=ph*0.75*pull, px=fx+dx*k+(hash(s+1)-0.5)*fh*0.5*(1-k), py=fy+dy*k+(hash(s+2)-0.5)*fh*0.5*(1-k);   // mảnh bóng tối bị xé khỏi thân
      g.save(); g.globalAlpha=(1-ph)*pull; g.fillStyle='#07000f'; g.beginPath(); g.ellipse(px,py,fh*0.05*(1-ph*0.5),fh*0.025,Math.atan2(dy,dx),0,TAU); g.fill(); g.restore(); }
    const R=pic(g,'fr',fx+sh,fy,fh,{aura:{preset:'cursed',k:0.55,seed:9,res:420},rim:['140,60,255',0.6]});
    if(R){ const Y=at(R,eyeY()), P=at(R,eyeP()); g.save(); g.globalCompositeOperation='lighter'; if(Y) blob(g,Y.x,Y.y,26,'255,230,60',0.7); if(P) blob(g,P.x,P.y,26,'255,110,200',0.7); g.restore(); }
    g.restore(); }
  function friendCracked(id,t,k,h){ const c=K.prep(IM.fr); if(!c) return null; const w=h*c.sw/c.sh, S=Math.max(w,h)*1.1, [cv,x]=off(id,S);
    x.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,S/2-w/2,S/2-h/2,w,h);
    if(k>0){ x.globalCompositeOperation='source-atop'; x.lineCap='round';
      for(let b=0;b<9;b++){ let px=S/2+(hash(b*3)-0.5)*w*0.2, py=S/2+(hash(b*5)-0.5)*h*0.2, a=b/9*TAU+hash(b)*0.6; const L=Math.max(w,h)*0.6*clamp(k*1.3-b*0.04,0,1), pts=[[px,py]];
        for(let i=1;i<=12;i++){ a+=(hash(b*17+i)-0.5)*0.8; px+=Math.cos(a)*L/12; py+=Math.sin(a)*L/12; pts.push([px,py]); }
        for(const [lw,col] of [[h*0.022,'rgba(255,220,140,0.3)'],[h*0.005,'rgba(255,250,230,1)']]){ x.strokeStyle=col; x.lineWidth=lw; x.beginPath(); pts.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1])); x.stroke(); } } }
    return {cv,S}; }
  function sSeal(g,t){ const u=t-T.seal, ck=E.eio(seg(u,1,5.6)), Rs=lerp(980,240,ck), hit=t>=SEAL_HIT, hv=t-SEAL_HIT;
    bgFill(g,'#020104','#060208'); stars(g,t,{seed:13,a:0.5}); neb(g,'war',5,0,0,1.2,0.25);
    g.save(); cam(g,480,290,1+0.03*Math.sin(u*0.5));
    blackHole(g,650,235,70*(1-seg(u,0,2)),t,1-seg(u,0,2));
    const PTS=[[480,60,'240,240,200',1],[190,340,'255,180,100',0],[770,340,'255,150,210',0],[480,470,'255,214,120',0]];
    const lk=seg(u,0.4,1.6); g.save(); g.globalCompositeOperation='lighter';
    for(let i=0;i<4;i++) for(let j=i+1;j<4;j++){ const a=PTS[i], b=PTS[j], ll=lk; beam(g,a[0],a[1],lerp(a[0],b[0],ll),lerp(a[1],b[1],ll),2.2,'255,230,180',0.5); }
    g.restore();
    const wob=hit?0:Math.sin(t*14)*4*seg(u,2,5.6), crackK=hit?E.eout(seg(hv,0.1,3)):0;
    pic(g,'fr',480+wob,290,330,{a:0,auraOnly:1,aura:{preset:'cursed',k:hit?0.5:1,seed:10,res:420}});
    const FC=friendCracked('frc',t,crackK,330); if(FC){ g.drawImage(FC.cv,480+wob-FC.S/2,290-FC.S/2,FC.S,FC.S); }
    sealCircle(g,480,290,Rs,u*0.4,seg(u,0.6,1.6),hit?'255,240,200':'255,214,140');
    if(hit){ sealCircle(g,480,290,240*(1+0.04*Math.sin(t*3)),u*0.4,1-seg(hv,0,0.6)*0.3,'255,255,255'); ring(g,480,290,240+hv*500,6,'255,240,200',clamp(1-hv/1.2,0,1)); }
    PTS.forEach(([x,y,col,vd],i)=>{ if(vd){ const V=K.prep(IM.vd); g.save(); g.globalCompositeOperation='lighter'; blob(g,x-22,y,16,'240,240,170',0.9); blob(g,x+22,y,16,'240,240,170',0.9); g.restore(); }
      else flare(g,x,y,26+4*Math.sin(t*4+i),col,0.85); if(hit) beam(g,x,y,480,290,3,col,(1-seg(hv,1,4))*0.8); });
    g.restore(); }
  function sSplit(g,t){ const u=t-T.split, z=lerp(1,0.36,E.eio(seg(u,0.5,6.2)));
    bgFill(g,'#020104','#050208'); neb(g,'dark',11,0,0,1.3,0.5); stars(g,t,{seed:14,z:1/z*0.4+0.6});
    g.save(); cam(g,480,290,z);
    SPLIT.forEach((s,i)=>{ const arr=6+i*0.35, ap=seg(u,1.5,3.5), hitv=u-arr; bubble(g,s.bx,s.by,190,t,i,ap,{br:hitv>0?clamp(1-hitv/1.5,0,1):0,brc:'170,90,255'}); if(hitv>0&&hitv<1.2) ring(g,s.bx,s.by,190+hitv*260,6,'190,120,255',1-hitv/1.2); });
    const FC=friendCracked('frc',t,1,330);
    if(FC){ const n=5;
      for(let i=0;i<n;i++){ const s=SPLIT[i], arr=6+i*0.35, k=E.eio(clamp(u/arr,0,1)), a0=s.an-TAU/n/2, a1=s.an+TAU/n/2;
        const px=lerp(480,s.bx,k), py=lerp(290,s.by,k), rot=k*(hash(i)-0.5)*5, sc=lerp(1,0.4,k), fade=1-seg(u,arr,arr+0.3);
        if(fade<=0) continue;
        for(let j=1;j<=10;j++){ const kk=E.eio(clamp((u-j*0.05)/arr,0,1)); g.save(); g.globalCompositeOperation='lighter'; blob(g,lerp(480,s.bx,kk),lerp(290,s.by,kk),70*sc,'140,60,255',0.3*fade*(1-j/11)); g.restore(); }
        g.save(); g.globalAlpha=fade; g.translate(px,py); g.rotate(rot); g.scale(sc,sc); g.translate(-480,-290);
        g.beginPath(); g.moveTo(480,290); g.lineTo(480+Math.cos(a0)*400,290+Math.sin(a0)*400); g.lineTo(480+Math.cos(s.an)*420,290+Math.sin(s.an)*420); g.lineTo(480+Math.cos(a1)*400,290+Math.sin(a1)*400); g.closePath();
        g.clip(); g.drawImage(FC.cv,480-FC.S/2,290-FC.S/2,FC.S,FC.S); g.restore();
        g.save(); g.globalCompositeOperation='lighter'; blob(g,px,py,40*sc+14,'170,90,255',0.7*fade); blob(g,px,py,14*sc+8,i%2?'255,110,200':'255,230,60',0.95*fade); g.restore(); } }
    const bk=seg(u,0,0.9); if(bk<1){ g.save(); g.globalCompositeOperation='lighter'; blob(g,480,290,200+bk*500,'200,140,255',(1-bk)); blob(g,480,290,120,'255,255,255',(1-bk)); g.restore(); ring(g,480,290,100+bk*900,10,'210,160,255',1-bk); }
    g.restore(); }
  function sLight(g,t){ const u=t-T.light, dawn=seg(u,0,4); bgFill(g,'#0a0814','#1a0f10');
    g.save(); g.globalAlpha=dawn; const gr=g.createRadialGradient(820,110,10,820,110,700); gr.addColorStop(0,'rgba(255,200,130,0.55)'); gr.addColorStop(0.5,'rgba(200,110,140,0.18)'); gr.addColorStop(1,'rgba(40,30,80,0)'); g.fillStyle=gr; g.fillRect(0,0,VW,VH); g.restore();
    neb(g,'light',12,-u*7,0,1.25,0.9*dawn+0.2); stars(g,t,{seed:15,a:0.7,px:u*7,col:'255,220,170'});
    g.save(); cam(g,480+u*5,280,1+u*0.01);
    pic(g,'sup',650,520,560,{ay:1,a:0.1*dawn,comp:'lighter',tint:['#ffd890',0.9]}); pic(g,'flower',880,470,330,{ay:1,a:0.08*dawn,comp:'lighter',tint:['#ffb3dd',0.9]}); pic(g,'bread',190,250,150,{a:0.08*dawn,comp:'lighter',tint:['#ffc35a',0.9]});
    rays(g,820,110,700,30,t,'255,210,150',0.25*dawn,21); flare(g,820,110,90,'255,210,150',0.8*dawn);
    planet(g,300,340,120,PL.home,t); planet(g,690,400,48,PL.desert,t); planet(g,560,170,26,PL.ice,t);
    for(let i=0;i<4;i++){ const st=T.light+1.5+i*2.7+hash(i)*1.2, v=t-st; if(v<0||v>0.9) continue; const x0=100+hash(i*3)*700, y0=40+hash(i*5)*120, k=v/0.9;   // sao băng
      g.save(); g.globalCompositeOperation='lighter'; const x=x0+k*260, y=y0+k*120; const gg=g.createLinearGradient(x-90,y-42,x,y); gg.addColorStop(0,'rgba(255,240,200,0)'); gg.addColorStop(1,`rgba(255,240,200,${1-k})`); g.strokeStyle=gg; g.lineWidth=1.6; g.beginPath(); g.moveTo(x-90,y-42); g.lineTo(x,y); g.stroke(); g.restore(); }
    for(let i=0;i<8;i++){ const st=T.light+1+i*1.3, v=t-st; if(v<0) continue; const x=80+hash(i*9)*800, y=60+hash(i*11)*360; g.save(); g.globalCompositeOperation='lighter'; blob(g,x,y,4+10*clamp(1-v,0,1),'255,240,210',0.9); if(v<0.6) ring(g,x,y,v*60,1,'255,230,190',1-v/0.6); g.restore(); }   // sao mới thắp
    g.restore(); }
  function sBlack(g,t){ bgFill(g,'#000','#000'); stars(g,t,{seed:15,a:0.25*(1-seg(t,T.black,T.black+2))}); }
  function sUntil(g,t){ bgFill(g,'#000','#000'); const u=t-T.until; g.save(); g.globalCompositeOperation='lighter'; const pu=0.5+0.5*Math.sin(u*2.4);
    const gr=g.createRadialGradient(480,270,10,480,270,520); gr.addColorStop(0,`rgba(60,10,40,${0.25*pu*seg(u,0.5,2)})`); gr.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=gr; g.fillRect(0,0,VW,VH); g.restore(); }
  function sEye(g,t){ const u=t-T.eye; bgFill(g,'#000','#000'); if(t>=EYE_HIT+0.25) return;
    g.save(); cam(g,480,280,lerp(1,1.7,E.ein(seg(u,0,2.9))));
    stars(g,t,{seed:16,a:0.18});
    shard(g,480,285,150,u*0.05,4);
    const c=K.prep(IM.fr), ey=eyeY(), ep=eyeP();
    if(c&&ey&&ep&&t>=EYE_OPEN){ const d=Math.abs(ep.u-ey.u)*c.sw, mu=(ey.u+ep.u)/2*c.sw, mv=(ey.v+ep.v)/2*c.sh, bw=d*2.3, bh=d*1.9, sx=c.sx+mu-bw/2, sy=c.sy+mv-d*0.55;
      const scl=72/d, W=bw*scl, H=bh*scl, ox=480-W/2, oy=262-d*0.55*scl, op=E.eout(seg(t,EYE_OPEN,EYE_OPEN+0.14)), grin=seg(t,EYE_OPEN+0.5,EYE_OPEN+0.9);
      const [mc,mx]=off('eye',Math.max(W,H)); mx.drawImage(c.src,sx,sy,bw,bh,0,0,W,H);   // mép ảnh cắt mờ dần vào bóng tối của mảnh vỡ
      mx.globalCompositeOperation='destination-in'; const mg=mx.createRadialGradient(W/2,H*0.42,Math.min(W,H)*0.25,W/2,H*0.42,Math.max(W,H)*0.55); mg.addColorStop(0,'#000'); mg.addColorStop(1,'rgba(0,0,0,0)'); mx.fillStyle=mg; mx.fillRect(0,0,W,H);
      g.save(); g.beginPath(); g.rect(ox,oy+d*0.55*scl-(d*0.32*scl)*op,W,(d*0.64*scl)*op+(H-d*0.55*scl-d*0.32*scl)*grin); g.clip(); g.globalCompositeOperation='lighter'; const S=Math.max(W,H); g.drawImage(mc,ox,oy,S,S); g.restore();
      g.save(); g.globalCompositeOperation='lighter'; const ex=ox+(ey.u*c.sw-(mu-bw/2))*scl, eyy=oy+(ey.v*c.sh-(mv-d*0.55))*scl, px=ox+(ep.u*c.sw-(mu-bw/2))*scl;
      blob(g,ex,eyy,40,'255,230,60',0.7*op); blob(g,px,eyy,40,'255,110,200',0.7*op*seg(t,EYE_OPEN+0.2,EYE_OPEN+0.35)); g.restore(); }
    g.restore(); }
  const SCENES=[[0,sTitle],[T.worlds,sWorlds],[T.reveal,sReveal],[T.pierce,sPierce],[T.devour,sDevour],[T.embers,sEmbers],[T.born,sBorn],[T.sup,sSupreme],[T.bread,sBread],[T.flower,sFlower],
    [T.line,sLine],[T.war,sWar],[T.voidS,sVoid],[T.hole,sHole],[T.seal,sSeal],[T.split,sSplit],[T.light,sLight],[T.black,sBlack],[T.until,sUntil],[T.eye,sEye]];

  // ───────── chữ ─────────
  const NC={fr:'200,130,255', sp:'255,214,120', vd:'235,235,255'};
  const LINES=[[2,8.6,'Long, long ago… in the Dark Age of the Multiverse.'],
    [11,17.6,'Countless worlds lived beneath the same silent stars.'],
    [20.2,27.6,'[[Friend|fr]] was not yet a meme. It was a cosmic entity.'],
    [30,37,'It drifted from world to world, piercing their cores with its tentacles…'],
    [39,46,'…devouring entire civilizations and races.'],
    [48,55.6,'For thousands of years, the rage of memes grew into power…'],
    [57.6,62.6,'…and gave birth to three [[Supreme Memes|sp]].'],
    [82.6,86.2,'Together, they rose against [[Friend|fr]].'],
    [87.2,92.6,'A war of nearly ten years.'],
    [95.6,102.4,'Hundreds of universes were destroyed.'],
    [105,113.4,'Until [[The Void|vd]], [[Friend|fr]]’s oldest companion, could no longer bear its greed…'],
    [115.8,120.6,'…and betrayed it.'],
    [122.6,129.8,'Together, they sealed [[Friend|fr]] away…'],
    [132.6,136.9,'…split its mind into five fragments with clouded memories…'],
    [137.3,142.4,'…and cast them across the meme multiverse.'],
    [144,148.6,'A new age began.'],
    [149,154.4,'Millions of years of light, peace and prosperity.']];
  const PLATES=[[T.sup+1.4,T.sup+5.6,'SUPREME CAT','THE ONE CAT ABOVE ALL','255,214,120'],[BREAD_POP+0.6,T.flower-0.3,'BREAD CAT','THE INFINITY COSMIC POWER','255,190,110'],[T.flower+1.2,T.line-0.4,'FLOWER CAT','THE TRANSCENDENT ONE','255,150,210']];   // biệt danh = đúng biệt danh trong game (CHAR_DEFS defaultName)
  const SERIF='Georgia, "Times New Roman", serif', SANS='Montserrat, "Segoe UI", sans-serif';
  function words(txt){ return txt.replace(/\[\[([^\]]+)\]\]/g,m=>m.replace(/ /g,' ')).split(' ').map(w=>{ const parts=[]; let rest=w; const re=/\[\[([^|\]]+)\|(\w+)\]\]/;
      while(rest.length){ const m=rest.match(re); if(!m){ parts.push([rest,null]); break; } if(m.index) parts.push([rest.slice(0,m.index),null]); parts.push([m[1].replace(/ /g,' '),m[2]]); rest=rest.slice(m.index+m[0].length); }
      return parts; }); }
  function narr(g,t,L){ const [a,b,txt]=L; if(t<a||t>b+0.7) return; const W=L._w||(L._w=words(txt)); g.save(); g.font=`italic 400 19px ${SERIF}`; g.textBaseline='middle';
    const sp=g.measureText(' ').width, ws=W.map(ps=>ps.reduce((s,p)=>s+g.measureText(p[0]).width,0)), tot=ws.reduce((s,v)=>s+v,0)+sp*(W.length-1); let x=VW/2-tot/2; const y=VH-27;
    W.forEach((ps,i)=>{ const ta=a+i*0.085, k=seg(t,ta,ta+0.45), al=k*(1-seg(t,b,b+0.6)); if(al>0.004){ let xx=x; const dy=(1-E.eout(k))*5;
      for(const [s,c] of ps){ g.globalAlpha=al; if(c){ g.shadowColor=`rgba(${NC[c]},0.9)`; g.shadowBlur=9*SCv; g.fillStyle=`rgb(${NC[c]})`; g.fillText(s,xx,y+dy); g.shadowBlur=0; } else { g.fillStyle='rgb(232,228,242)'; g.fillText(s,xx,y+dy); } xx+=g.measureText(s).width; } }
      x+=ws[i]+sp; });
    g.restore(); }
  function spaced(g,txt,x,y,font,ls,col,a,align){ g.save(); g.font=font; g.letterSpacing=ls+'px'; g.textAlign=align||'center'; g.textBaseline='middle'; g.globalAlpha=a; g.fillStyle=col; g.fillText(txt,x+(align==='left'?0:ls/2),y); g.restore(); }
  function plate(g,t,P){ const [a,b,name,sub,col]=P; if(t<a||t>b) return; const k=E.eout(seg(t,a,a+0.8)), al=k*(1-seg(t,b-0.6,b));
    g.save(); g.shadowColor=`rgba(${col},0.8)`; g.shadowBlur=14*SCv; spaced(g,name,64+(1-k)*-20,392,`400 40px ${SERIF}`,10,`rgb(${col})`,al,'left'); g.restore();
    g.save(); g.globalAlpha=al; g.fillStyle=`rgba(${col},0.8)`; g.fillRect(64,416,220*k,1.2); g.restore();
    spaced(g,sub,64,432,`800 10px ${SANS}`,5,'rgba(235,230,245,0.85)',al*seg(t,a+0.4,a+1.1),'left'); }
  function titleCard(g,t){ if(t>9.8) return; const out=1-seg(t,8.4,9.6);
    spaced(g,'MEME LORE 2',VW/2,212,`800 12px ${SANS}`,10,'rgb(200,190,232)',seg(t,1,2)*out);
    g.save(); g.globalAlpha=out*0.8; const lw=220*E.eout(seg(t,1.4,2.6)); g.fillStyle='rgba(200,170,255,0.8)'; g.fillRect(VW/2-lw/2,232,lw,1); g.restore();
    const TXT='THE DARK AGE'; g.save(); g.font=`400 52px ${SERIF}`; g.letterSpacing='16px'; g.textBaseline='middle'; const tw=g.measureText(TXT).width; let x=VW/2-tw/2+8;
    for(let i=0;i<TXT.length;i++){ const ch=TXT[i], k=seg(t,2.6+i*0.1,3.3+i*0.1), cw=g.measureText(ch).width; if(k>0){ g.globalAlpha=k*out; g.shadowColor='rgba(170,110,255,0.9)'; g.shadowBlur=(18-12*k)*SCv; g.fillStyle='rgb(238,232,250)'; g.fillText(ch,x,282+(1-E.eout(k))*8); } x+=cw; }
    g.restore();
    const sw=seg(t,4.2,5.6); if(sw>0&&sw<1){ g.save(); g.globalCompositeOperation='lighter'; g.globalAlpha=Math.sin(sw*Math.PI)*0.6*out; g.drawImage(glow('255,255,255'),VW/2-tw/2+sw*tw-60,262,120,40); g.restore(); }   // vệt sáng lướt qua chữ
    spaced(g,'PROLOGUE',VW/2,330,`800 11px ${SANS}`,9,'rgb(200,190,232)',seg(t,4.2,5.2)*out); }
  function untilNow(g,t){ const u=t-T.until; if(u<0||t>T.eye) return; const TX='Until now', out=1-seg(t,T.eye-0.5,T.eye);
    g.save(); g.font=`italic 400 46px ${SERIF}`; g.textBaseline='middle'; const full=TX+'……', tw=g.measureText(full).width; let x=VW/2-tw/2;
    const jit=u>3.4?(hash(Math.floor(t*30))-0.5)*2:0;
    for(let i=0;i<full.length;i++){ const ch=full[i], ta=i<TX.length?0.7+i*0.11:0.7+TX.length*0.11+0.5+(i-TX.length)*0.55, k=seg(u,ta,ta+0.25), cw=g.measureText(ch).width;
      if(k>0){ g.globalAlpha=k*out; if(u>4.6){ g.fillStyle='rgba(255,40,80,0.6)'; g.fillText(ch,x+2+jit,270); g.fillStyle='rgba(80,120,255,0.6)'; g.fillText(ch,x-2-jit,270); }
        g.shadowColor='rgba(255,60,90,0.6)'; g.shadowBlur=12*SCv; g.fillStyle='rgb(240,236,245)'; g.fillText(ch,x+jit,270); g.shadowBlur=0; } x+=cw; }
    g.restore(); }
  function endTitle(g,t){ const v=t-(EYE_HIT+0.45); if(v<0) return; const k=seg(v,0,0.8);
    spaced(g,'MEME LORE 2',VW/2,236,`800 13px ${SANS}`,12,'rgb(210,200,240)',k);
    g.save(); g.shadowColor='rgba(170,110,255,0.9)'; g.shadowBlur=14*SCv; spaced(g,'THE DARK AGE',VW/2,282,`400 46px ${SERIF}`,14,'rgb(240,236,250)',seg(v,0.3,1.1)); g.restore();
    spaced(g,'PROLOGUE',VW/2,326,`800 11px ${SANS}`,9,'rgb(200,190,232)',seg(v,0.7,1.4)); }
  const DIPS=[[T.embers,0.5],[T.voidS,0.45],[T.light,0.5]], FLASH=[[T.pierce+6.8,0.5,'255,230,200'],[T.born+3.5,0.35,'255,240,210'],[BREAD_POP,0.45,'255,245,220'],[T.war+1.1,0.3,'255,240,220'],
    [T.hole+0.3,0.4,'255,255,255'],[SEAL_HIT,0.45,'255,250,235'],[T.split,0.5,'230,210,255'],[EYE_HIT,0.25,'255,255,255']];

  // ───────── tiếng ─────────
  const sfx=[[0.4,'ep3_dark',0.6],[3.1,'cine_deep_impact',0.7],[T.worlds+5,'ep3_dark',0.5],[T.reveal+3.6,'fr_titan_roar',0.9],[T.reveal+3.6,'thunder_big',0.55],
    [T.pierce+0.6,'ep3_whoosh',0.7],[T.pierce+2.6,'ep3_rock',0.9],[T.pierce+3.1,'ep3_quake',0.8],[T.pierce+4.4,'ep3_charge',0.6],[T.pierce+6.8,'ep3_explode',1],[T.pierce+6.8,'cine_deep_impact',0.8],
    [T.devour+0.6,'fr_thunder',0.5],...DEV.map(p=>[T.devour+p.tk+1.4,'ep3_boom',0.5]),
    [T.embers+5,'ep3_charge',0.5],...BORN.map(b=>[T.born+b[3],'ep3_shine',0.8]),[T.born+3.5,'cine_deep_impact',0.7],
    [T.sup+0.2,'thunder_big',0.45],[T.sup+1.4,'ep3_shine',0.6],
    [T.bread+0.2,'ep3_whoosh',0.7],[T.bread+1.3,'ep3_charge',0.7],[BREAD_POP,'cine_deep_impact',0.9],[BREAD_POP,'ep3_shine',0.7],
    [T.flower+0.3,'flower_transcend',0.9],[T.line+0.3,'cine_conq_haki',0.6],
    [T.war+1.1,'ep3_explode',0.9],[T.war+1.5,'thunder_big',0.7],[T.war+4.1,'fr_titan_roar',0.9],[T.war+4.6,'ep3_boom',0.6],[T.war+6.9,'ep3_explode',0.8],[T.war+7.7,'cine_deep_impact',0.7],
    ...BUBS.filter(b=>b.pop).slice(0,8).map((b,i)=>[b.pop,i%3?'ep3_glass':'ep3_boom',0.45]),[T.war+14,'fr_thunder',0.6],[T.war+16,'ep3_quake',0.6],
    [T.voidS+0.5,'ep3_dark',0.7],[T.voidS+2,'cine_drop',1],
    [T.hole+0.3,'blackhole',0.9],[T.hole+0.3,'ep3_end_boom',1],[T.hole+0.3,'thunder_big',0.6],[T.hole+2,'ep3_quake',0.6],
    [T.seal+1,'ep3_chain',0.8],[T.seal+3,'ep3_charge',0.7],[SEAL_HIT,'cine_deep_impact',1],[SEAL_HIT,'ep3_glass',0.6],[SEAL_HIT+1.5,'ep3_chain',0.6],
    [T.split,'ep3_explode',1],[T.split+0.3,'ep3_whoosh',0.8],...SPLIT.map((s,i)=>[T.split+6+i*0.35,'cine_impact',0.6]),
    [T.light+0.5,'ep3_shine',0.6],[T.light+4,'ep3_shine',0.4],[T.until+0.1,'ep3_dark',0.7],[EYE_OPEN,'cine_drop',1],[EYE_HIT,'ep3_end_boom',1],[EYE_HIT,'fr_titan_roar',0.7]];
  // nhạc tạm (ghép từ tiếng có sẵn) — thay bằng 1 bản nhạc dài là xong
  const mus=[{src:A+'cine_ambient_war.mp3',ra:0,rb:T.embers,vol:0.35,loop:true,fi:2,fo:1.5},
    {src:A+'cine_horns.mp3',ra:T.born-0.5,rb:T.line+1.5,vol:0.55,fi:1,fo:1.5},
    {src:A+'cine_epic.mp3',ra:T.line,rb:T.war+11.5,vol:0.6,fo:1.5},
    {src:A+'cine_ambient_war.mp3',ra:T.war+3,rb:T.light-0.2,vol:0.45,loop:true,fi:2,fo:2},
    {src:A+'cine_epic.mp3',ra:T.light,rb:T.black,vol:0.42,fi:1.5,fo:2},
    {src:A+'cine_heart.mp3',ra:T.black+0.5,rb:T.until+4,vol:0.8,fo:1}];

  CineKit.film({ id:'l2pro', title:'Meme Lore 2 · Prologue: The Dark Age', VW, VH, DUR,
    imgs:{ fr:'assets/avatars/friend/avatarUrl.webp', vdA:'assets/avatars/thevoid/attackAvatarUrl.webp',
      handL:'assets/img/scaredhamster/HAND_lunge.webp', handC:'assets/img/scaredhamster/HAND_closing.webp', handG:'assets/img/scaredhamster/HAND_grip.webp', vd:'assets/avatars/thevoid/avatarUrl.webp',
      sup:'assets/avatars/supremearbiter/avatarUrl.webp', flower:'assets/avatars/flowercat/attackAvatarUrl.webp',   /* anh dặn: Flower Cat dùng ảnh lúc chạm bông hoa, không dùng ảnh gốc */ bread:'assets/img/cine/L2P_BREAD.png', butter:'assets/img/cine/L2P_BUTTER.png' },
    sfx, mus, shots:[{t0:0,t1:DUR,a:{}}],
    impact:t=>(t>=T.hole+0.3&&t<T.hole+0.36)?'inv':(t>=SEAL_HIT&&t<SEAL_HIT+0.07)?'bw':(t>=T.split&&t<T.split+0.05)?'inv':(t>=EYE_HIT&&t<EYE_HIT+0.07)?'red':(t>=EYE_HIT+0.07&&t<EYE_HIT+0.13)?'inv':0,
    shake:t=>{ let s=0; const hit=(a,amp,d)=>{ if(t>=a&&t<a+d) s=Math.max(s,amp*(1-(t-a)/d)); };
      hit(T.reveal+3.6,6,1.6); hit(T.pierce+6.8,12,1.4); hit(BREAD_POP,6,0.8); hit(T.war+1.1,8,1); hit(T.war+4.1,7,1.2); hit(T.war+6.9,8,0.8); hit(T.hole+0.3,12,1.6); hit(SEAL_HIT,12,1.1); hit(T.split,10,1.2); hit(EYE_HIT,16,0.25);
      if(t>=T.war&&t<T.voidS) s=Math.max(s,1.2); if(t>=T.hole&&t<T.seal) s=Math.max(s,2*seg(t,T.hole,T.hole+2)); return s; },
    world(F,t){ IM=F.I; TT=t; SCv=F.SC; { const fc=K.prep(IM.flower); if(fc && fc.fbL==null) fc.fbL=0.35; } const g=F.g; let fn=SCENES[0][1]; for(const s of SCENES) if(t>=s[0]) fn=s[1]; g.save(); fn(g,t); g.restore(); },
    post(F,t){ const fx={shocks:[],chroma:0}; const sh=(a,x,y,rm,d,str)=>{ if(t>=a&&t<a+d){ const u=(t-a)/d; fx.shocks.push({sx:x,sy:y,r:20+rm*E.eout(u),w:30,str:str*(1-u)}); fx.chroma=Math.max(fx.chroma,1-u); } };
      sh(T.pierce+6.8,360,300,520,0.9,26); sh(T.born+3.5,660,290,380,0.7,16); sh(BREAD_POP,480,280,460,0.8,22); sh(T.war+1.1,500,300,420,0.7,18); sh(T.war+6.9,520,300,380,0.6,16);
      sh(T.hole+0.3,650,235,520,1.0,28); sh(SEAL_HIT,480,290,480,0.9,24); sh(T.split,480,290,620,1.0,28); sh(EYE_HIT,480,270,560,0.5,30);
      if(t>=T.hole+0.3&&t<T.seal){ const R=E.eout(seg(t,T.hole+0.25,T.hole+2))*70; fx.shocks.push({sx:650,sy:235,r:R*1.7,w:R*0.7,str:R*0.16}); }   // hố đen bẻ cong ánh sáng quanh nó
      if(t>=T.war+4&&t<T.war+6.5) fx.chroma=Math.max(fx.chroma,0.35);
      if(t>=T.until+4.6&&t<T.eye) fx.chroma=Math.max(fx.chroma,0.4);
      fx.shocks=fx.shocks.slice(0,4); return fx; },
    screen(F,t){ const g=F.g; SCv=F.SC;
      for(const [a,c,col] of FLASH) if(t>=a&&t<a+c) K.flash(F,(1-(t-a)/c)*0.85,`rgb(${col})`);
      let dp=0; for(const [a,d] of DIPS){ if(t>=a-d&&t<a+d) dp=Math.max(dp,1-Math.abs(t-a)/d); } if(t>=T.black-0.8&&t<T.until) dp=Math.max(dp,seg(t,T.black-0.8,T.black+0.4)); if(t>=EYE_HIT+0.25) dp=1;
      if(dp>0) K.flash(F,dp,'#000');
      K.letterbox(F,0.9);
      titleCard(g,t); for(const L of LINES) narr(g,t,L); for(const P of PLATES) plate(g,t,P); untilNow(g,t); endTitle(g,t); } });
})();
