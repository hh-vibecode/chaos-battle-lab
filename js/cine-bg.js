// ===================== 🌌 CINEMATIC BACKGROUND (Endgame scene) =====================
// Procedural background for js/cine-endgame.js — no image files. Everything is drawn in WORLD coords
// (the camera transform is already applied on g). Static layers are pre-rendered ONCE into offscreen canvases
// (one night set + one "Upside Down" red set) and cross-faded with `red`; per frame only cheap things move
// (cloud drift via pattern offsets, smoke puffs, fire flicker, lightning glow, particles, fog).
//   window._cineBG.draw(g,t,red)       sky + clouds + far ruins + ground (behind the characters)
//   window._cineBG.drawFront(g,t,red)  thin foreground: low fog + embers / ash (in front of the characters)
//   window._cineBG.prepare()           optional: build the offscreen layers ahead of time (otherwise lazy on 1st draw)
(function(){
  'use strict';
  if(window._cineBG) return;
  const GROUND=560, X0=-1450, X1=1650, W=X1-X0, GB=1660, SKY_TOP=-1520;
  const CX0=-330, CX1=680, CY0=585, CY1=900;               // character zone: keep it calm
  const PI2=Math.PI*2, TM=24;   // TM: wrap margin of tiled layers (world units)

  // ---------- helpers ----------
  function rng(seed){ let s=seed>>>0; return ()=>{ s=(s+0x6D2B79F5)>>>0; let t=s; t=Math.imul(t^(t>>>15),t|1); t^=t+Math.imul(t^(t>>>7),t|61); return ((t^(t>>>14))>>>0)/4294967296; }; }
  function hash(a,b,c){ let h=Math.imul(a|0,0x27d4eb2d)^Math.imul(b|0,0x165667b1)^Math.imul(c|0,0x7feb352d); h=Math.imul(h^(h>>>15),0x85ebca6b); h=Math.imul(h^(h>>>13),0xc2b2ae35); h^=h>>>16; return (h>>>0)/4294967296; }
  const clamp01=v=>v<0?0:v>1?1:v, lerp=(a,b,k)=>a+(b-a)*k, frac=v=>v-Math.floor(v);
  const rgba=(c,a)=>`rgba(${c[0]},${c[1]},${c[2]},${a})`;
  function canvas(w,h){ const c=document.createElement('canvas'); c.width=Math.max(1,Math.round(w)); c.height=Math.max(1,Math.round(h)); return c; }
  // offscreen layer: paint() draws in world coords; px = (world - x) * k
  function layer(x,y,w,h,k,paint){ const c=canvas(w*k,h*k), g=c.getContext('2d'); g.setTransform(k,0,0,k,-x*k,-y*k); paint(g); return {c,x,y,y00:y,w:c.width/k,h:c.height/k,k}; }
  function soft(g,x,y,rx,ry,c,a,mid){ if(rx<=0||ry<=0||a<=0) return; g.save(); g.translate(x,y); g.scale(1,ry/rx);
    const gr=g.createRadialGradient(0,0,0,0,0,rx); gr.addColorStop(0,rgba(c,a)); gr.addColorStop(mid==null?0.5:mid,rgba(c,a*0.6)); gr.addColorStop(1,rgba(c,0));
    g.fillStyle=gr; g.fillRect(-rx,-rx,rx*2,rx*2); g.restore(); }
  function poly(g,pts){ g.beginPath(); g.moveTo(pts[0][0],pts[0][1]); for(let i=1;i<pts.length;i++) g.lineTo(pts[i][0],pts[i][1]); g.closePath(); }
  const zone=(x,y)=>clamp01(Math.min(x-CX0,CX1-x)/140)*clamp01(Math.min(y-CY0,CY1-y)/70);
  const pp=y=>clamp01((y-GROUND)/900), persp=y=>0.22+1.25*pp(y);

  // ---------- palettes ----------
  const PN={ red:0,
    sky:[[SKY_TOP,'#03040a'],[-700,'#070a1c'],[-150,'#121431'],[250,'#231f40'],[460,'#382a49'],[GROUND+40,'#4f3448']],
    moonGlow:[150,160,225], hor:[120,70,90], horA:0.28, fireSky:[255,120,50], fireSkyA:0.16,
    cloud:{body:[33,31,58], base:[22,20,40], shade:[11,10,24], light:[120,126,176], bodyA:0.82, shadeA:0.55, lightA:0.32, dir:-1},
    dist:'#3a2f4d', far:'#211b2f', farWin:[255,175,100], haze:[80,58,84], hazeA:0.4,
    near:'#110f1a', slab:'#1d1a29', hole:'#07060b', win:'rgba(255,150,70,0.7)', steel:'#24212f', edge:'rgba(140,140,190,0.22)',
    rim:[130,135,190], rimA:0.16, fireLight:[255,120,45], fireLightA:0.32, band:'#15121c', bandHaze:[44,38,52],
    gnd:[[GROUND,'#3b3344'],[GROUND+40,'#2d2836'],[GROUND+200,'#211d28'],[GROUND+520,'#15121a'],[GB,'#09080c']],
    gLight:[86,80,100], gDark:[6,5,9], speckL:[125,120,140], rockTop:'#3e3948', rockBot:'#15121b', conTop:'#4b4754', conBot:'#1c1a22',
    steelG:'#2c2a36', puddle:[120,132,190], crack:'#060508', crackL:'rgba(95,90,112,0.35)', smolder:[255,110,40], vine:null };
  const PR={ red:1,
    sky:[[SKY_TOP,'#040001'],[-700,'#150204'],[-150,'#360508'],[250,'#640b0c'],[460,'#9a1a10'],[GROUND+40,'#b42c16']],
    moonGlow:null, hor:[255,70,30], horA:0.35, fireSky:[255,60,20], fireSkyA:0.22,
    cloud:{body:[30,4,8], base:[18,2,5], shade:[5,0,2], light:[205,38,22], bodyA:0.9, shadeA:0.65, lightA:0.38, dir:1},
    dist:'#4a0a0b', far:'#220506', farWin:[255,70,40], haze:[95,14,12], hazeA:0.3,
    near:'#0e0203', slab:'#200607', hole:'#070102', win:'rgba(255,60,30,0.6)', steel:'#2a080b', edge:'rgba(255,70,50,0.25)',
    rim:[255,50,30], rimA:0.22, fireLight:[255,60,25], fireLightA:0.4, band:'#1a0507', bandHaze:[70,18,16],
    gnd:[[GROUND,'#5c1d18'],[GROUND+40,'#43130f'],[GROUND+200,'#2d0b0b'],[GROUND+520,'#1a0607'],[GB,'#090203']],
    gLight:[120,32,26], gDark:[6,1,2], speckL:[160,60,50], rockTop:'#4c1814', rockBot:'#160405', conTop:'#5a2420', conBot:'#1e0807',
    steelG:'#36100f', puddle:[235,55,35], crack:'#070102', crackL:'rgba(170,50,40,0.35)', smolder:[255,60,30],
    vine:'#0d0203', vineHi:'rgba(210,35,30,0.55)' };

  // ---------- fixed scene data ----------
  const FIRES=[], SMOKES=[], STARS=[];
  (function(){
    const R=rng(55);
    for(const x0 of [-1390,-1230,-1070,-905,-720,-560,-430,790,980,1150,1320,1470,1610]){
      FIRES.push({x:x0+(R()-0.5)*60, y:GROUND+8-R()*14, s:0.6+R()*0.8, ph:R()*20, big:R()<0.6});
    }
    // wreck fires on the ground (edges only)
    FIRES.push({x:-860,y:640,s:0.9,ph:3.1,big:false}); FIRES.push({x:1330,y:648,s:1.0,ph:7.7,big:false});
    for(const f of FIRES) if(f.big) SMOKES.push({x:f.x, y:f.y-10, h:480+R()*420, w:70+R()*70, rate:0.035+R()*0.03, ph:R()});
    const S=rng(77);
    for(let i=0;i<150;i++){ STARS.push({x:X0+S()*W, y:SKY_TOP+S()*(GROUND-220-SKY_TOP), r:0.6+S()*S()*1.6, a:0.25+S()*0.65, f:1+S()*3, p:S()*7}); }
  })();

  const CLOUD_DEF=[
    {seed:11, tw:2200, y0:-1500, y1:420, k:0.3, cy0:-1080, cy1:120, n:30, w0:320, w1:880, hr:0.2,  spd:2.5, par:0.35, a:0.5},
    {seed:23, tw:2000, y0:-800,  y1:560, k:0.35,  cy0:-420,  cy1:380, n:24, w0:260, w1:640, hr:0.3,  spd:6,   par:0.22, a:0.62},
    {seed:37, tw:1800, y0:-40,   y1:600, k:0.4,  cy0:340,   cy1:525, n:22, w0:280, w1:720, hr:0.26, spd:11,  par:0.12, a:0.78},
  ];

  // ---------- painters ----------
  function paintSky(g,P){
    const gr=g.createLinearGradient(0,SKY_TOP,0,GROUND+40);
    for(const [y,c] of P.sky) gr.addColorStop(clamp01((y-SKY_TOP)/(GROUND+40-SKY_TOP)),c);
    g.fillStyle=gr; g.fillRect(X0,SKY_TOP,W,GROUND+40-SKY_TOP);
    if(P.moonGlow){ soft(g,40,180,760,560,P.moonGlow,0.2,0.3); }
    const hg=g.createLinearGradient(0,GROUND-420,0,GROUND+40); hg.addColorStop(0,rgba(P.hor,0)); hg.addColorStop(1,rgba(P.hor,P.horA));
    g.fillStyle=hg; g.fillRect(X0,GROUND-420,W,460);
    for(const f of FIRES) if(f.big) soft(g,f.x,GROUND-20,300*f.s,140*f.s,P.fireSky,P.fireSkyA,0.4);
    if(P.red){ const R=rng(909);
      soft(g,980,GROUND-120,900,380,[255,40,20],0.25,0.35);               // hellish glow far right
      for(let i=0;i<46;i++) soft(g,X0+R()*W,-1300+R()*1350,220+R()*520,50+R()*120,[8,0,2],0.3+R()*0.3);
    }
  }

  function paintClouds(g,D,P){
    const R=rng(D.seed), C=P.cloud;
    for(let i=0;i<D.n;i++){
      const cx=R()*D.tw, cy=D.cy0+R()*(D.cy1-D.cy0), w=D.w0+R()*(D.w1-D.w0), h=w*D.hr*(0.7+R()*0.6);
      const np=7+(R()*9|0), pf=[];
      for(let j=0;j<np;j++){ const u=R()*2-1, env=1-u*u, r=h*(0.3+0.5*env)*(0.7+R()*0.6); pf.push([cx+u*w*0.5, cy-r*0.45-R()*h*0.35*env, r]); }
      const wraps=[0]; if(cx-w*1.3<TM) wraps.push(D.tw); if(cx+w*1.3>D.tw-TM) wraps.push(-D.tw);
      for(const dx of wraps){
        for(const p of pf) soft(g,p[0]+dx,p[1],p[2]*1.3,p[2]*1.05,C.body,D.a*C.bodyA,0.55);
        soft(g,cx+dx,cy,w*0.62,h*0.24,C.base,D.a*C.bodyA,0.6);
        for(const p of pf) soft(g,p[0]+dx+p[2]*0.1,p[1]-C.dir*p[2]*0.4,p[2]*0.95,p[2]*0.6,C.shade,D.a*C.shadeA,0.45);
        for(const p of pf) soft(g,p[0]+dx-p[2]*0.12,p[1]+C.dir*p[2]*0.5,p[2]*0.8,p[2]*0.5,C.light,D.a*C.lightA,0.35);
      }
    }
    if(P.red){ // extra heavy dark masses in the Upside Down
      const Q=rng(D.seed*7+1);
      for(let i=0;i<D.n*0.7;i++){ const cx=Q()*D.tw, cy=D.cy0+Q()*(D.cy1-D.cy0), w=D.w0+Q()*(D.w1-D.w0);
        for(const dx of [0,cx-w<TM?D.tw:null,cx+w>D.tw-TM?-D.tw:null]) if(dx!=null){ soft(g,cx+dx,cy,w*0.6,w*D.hr*0.5,[10,1,3],0.45*D.a,0.6); soft(g,cx+dx,cy+w*D.hr*0.25,w*0.5,w*D.hr*0.18,C.light,0.18*D.a,0.4); } }
    }
  }

  // ---- city pieces ----
  function tower(g,x,w,h,P,R){
    const b=GROUND+14, lean=(R()-0.5)*0.12, st=2+(R()*4|0), hl=h*(0.7+R()*0.3), hr=h*(0.45+R()*0.55), top=[];
    for(let s=0;s<=st;s++){ const u=s/st; top.push([x+w*u, b-lerp(hl,hr,u)+((s>0&&s<st)?(R()-0.2)*h*0.22:0)]); }
    g.save(); g.translate(x+w/2,b); g.rotate(lean); g.translate(-(x+w/2),-b);
    g.beginPath(); g.moveTo(x,b); for(const p of top) g.lineTo(p[0],p[1]); g.lineTo(x+w,b); g.closePath();
    g.fillStyle=P.near; g.fill(); g.save(); g.clip();
    const fh=13+R()*7, cols=Math.max(2,(w/15)|0), cw=w/cols;
    for(let yy=b-fh; yy>b-h; yy-=fh){
      g.fillStyle=P.slab; g.fillRect(x-2,yy,w+4,2.2);
      for(let c=0;c<cols;c++){ const rr=R(); if(rr<0.55){ g.fillStyle=rr<0.04?P.win:P.hole; g.fillRect(x+c*cw+cw*0.22,yy+fh*0.28,cw*0.56,fh*0.52); } }
    }
    if(R()<0.55){ const hx=x+w*(0.2+R()*0.5), hy=b-h*(0.3+R()*0.4), hs=w*(0.2+R()*0.25), pts=[];
      for(let i=0;i<8;i++){ const a=i/8*PI2; pts.push([hx+Math.cos(a)*hs*(0.6+R()*0.6), hy+Math.sin(a)*hs*(0.6+R()*0.6)]); }
      g.fillStyle=P.hole; poly(g,pts); g.fill();
      g.strokeStyle=P.steel; g.lineWidth=1; for(let i=0;i<3;i++){ g.beginPath(); g.moveTo(hx-hs,hy-hs*0.5+i*hs*0.5); g.lineTo(hx+hs,hy-hs*0.4+i*hs*0.5); g.stroke(); } }
    g.fillStyle=P.edge; g.fillRect(x,b-h-20,1.6,h+20);
    g.restore();
    g.strokeStyle=P.steel; g.lineWidth=1.3;
    for(const p of top){ if(R()<0.65){ const L=6+R()*18, a=-Math.PI/2+(R()-0.5)*1.5, c=R()-0.5;
      g.beginPath(); g.moveTo(p[0],p[1]); g.quadraticCurveTo(p[0]+Math.cos(a)*L*0.6,p[1]+Math.sin(a)*L*0.6,p[0]+Math.cos(a+c*2)*L,p[1]+Math.sin(a+c*2)*L); g.stroke(); } }
    g.restore();
  }
  function frame(g,x,w,h,P,R){
    const b=GROUND+14, n=2+(R()*3|0), cols=[], hs=[];
    for(let i=0;i<=n;i++){ cols.push(x+w*i/n); hs.push(h*(0.5+R()*0.5)); }
    g.strokeStyle=P.steel; g.lineWidth=3.2;
    for(let i=0;i<=n;i++){ const c=cols[i], hh=hs[i], bend=(R()-0.5)*2;
      g.beginPath(); g.moveTo(c,b); g.lineTo(c,b-hh*0.72); g.quadraticCurveTo(c+bend*6,b-hh,c+bend*hh*0.3,b-hh+Math.abs(bend)*hh*0.18); g.stroke(); }
    g.lineWidth=1.7;
    for(let yy=b-20; yy>b-h*0.72; yy-=22+R()*8){
      for(let i=0;i<n;i++){ const ok=Math.min(hs[i],hs[i+1])*0.72>b-yy, r1=R(), r2=R();
        if(ok && r1<0.85){ g.beginPath(); g.moveTo(cols[i],yy); g.lineTo(cols[i+1],yy+(r2-0.5)*4); if(r2<0.4){ g.moveTo(cols[i],yy); g.lineTo(cols[i+1],yy+20); } g.stroke(); } }
    }
    // a sagging, snapped girder
    const i=(R()*n)|0, yy=b-hs[i]*0.5; g.lineWidth=2.4; g.beginPath(); g.moveTo(cols[i],yy); g.quadraticCurveTo(cols[i]+w*0.4,yy+30,cols[i]+w*0.25,yy+55+R()*20); g.stroke();
  }
  function collapsed(g,x,w,h,P,R){
    const b=GROUND+16; g.fillStyle=P.near; g.beginPath(); g.moveTo(x-12,b);
    const st=7+(R()*6|0); for(let s=0;s<=st;s++){ const u=s/st; g.lineTo(x+w*u, b-h*Math.sin(u*Math.PI)*(0.55+R()*0.45)); } g.lineTo(x+w+12,b); g.closePath(); g.fill();
    for(let k=0;k<2;k++){ g.save(); g.translate(x+w*(0.25+R()*0.5),b-h*(0.35+R()*0.3)); g.rotate((R()-0.5)*1.6);
      const sw=w*(0.4+R()*0.35); g.fillStyle=P.slab; g.fillRect(-sw/2,-5,sw,9); g.fillStyle=P.hole; for(let j=0;j<4;j++) g.fillRect(-sw/2+sw*(0.1+j*0.22),-3,sw*0.1,4);
      g.strokeStyle=P.steel; g.lineWidth=1.1; g.beginPath(); g.moveTo(sw/2,0); g.quadraticCurveTo(sw/2+8,-6,sw/2+14,-2+R()*6); g.stroke(); g.restore(); }
  }
  function poles(g,x,w,P,R){
    const b=GROUND+14, n=2+(R()*2|0), tops=[];
    g.strokeStyle=P.steel; g.lineWidth=2.2;
    for(let i=0;i<n;i++){ const px=x+w*i/(n-1||1), ph=70+R()*45, tl=(R()-0.5)*0.35, tx=px+Math.sin(tl)*ph, ty=b-Math.cos(tl)*ph;
      g.beginPath(); g.moveTo(px,b); g.lineTo(tx,ty); g.moveTo(tx-11,ty+6); g.lineTo(tx+11,ty+6+tl*20); g.stroke(); tops.push([tx,ty+6]); }
    g.lineWidth=0.7; for(let i=0;i<tops.length-1;i++){ const a=tops[i], c=tops[i+1];
      for(const o of [-9,9]){ g.beginPath(); g.moveTo(a[0]+o,a[1]); g.quadraticCurveTo((a[0]+c[0])/2,(a[1]+c[1])/2+20+R()*14,c[0]+o,c[1]); g.stroke(); } g.lineWidth=2.2; g.lineWidth=0.7; }
    if(R()<0.6){ const a=tops[tops.length-1]; g.beginPath(); g.moveTo(a[0]+9,a[1]); g.quadraticCurveTo(a[0]+30,a[1]+40,a[0]+22,b); g.stroke(); } // snapped wire
  }
  function crane(g,x,h,dir,broken,P){
    const b=GROUND+10; g.strokeStyle=P.far; g.lineWidth=2;
    g.beginPath(); g.moveTo(x-5,b); g.lineTo(x-5,b-h); g.moveTo(x+5,b); g.lineTo(x+5,b-h); g.stroke();
    g.lineWidth=0.9; g.beginPath(); for(let y=b; y>b-h; y-=12){ g.moveTo(x-5,y); g.lineTo(x+5,y-12); } g.stroke();
    g.lineWidth=2.2; g.beginPath(); g.moveTo(x-dir*50,b-h); g.lineTo(x,b-h-8);
    if(broken){ g.lineTo(x+dir*110,b-h+4); g.quadraticCurveTo(x+dir*160,b-h+20,x+dir*150,b-h+90); }
    else g.lineTo(x+dir*190,b-h);
    g.stroke(); g.lineWidth=0.8; g.beginPath(); g.moveTo(x,b-h-26); g.lineTo(x+dir*(broken?100:180),b-h); g.moveTo(x,b-h-26); g.lineTo(x-dir*50,b-h);
    g.moveTo(x+dir*(broken?60:140),b-h); g.lineTo(x+dir*(broken?60:140),b-h+70+(broken?40:0)); g.stroke();
    g.fillRect(x-dir*58,b-h-4,18,12); g.fillRect(x-2,b-h-26,4,26);
  }
  function ship(g,cx,cy,len,ht,ang,P,R){
    g.save(); g.translate(cx,cy); g.rotate(ang);
    const hull=()=>{ g.beginPath(); g.moveTo(-len/2,0); g.bezierCurveTo(-len*0.32,-ht,len*0.28,-ht*1.15,len/2,-ht*0.25); g.lineTo(len/2+24,ht*0.05);
      g.bezierCurveTo(len*0.3,ht*0.65,-len*0.3,ht*0.55,-len/2,0); g.closePath(); };
    // dorsal fins / spikes
    g.fillStyle=P.near; for(let i=0;i<6;i++){ const fx=-len*0.32+i*len*0.12, fy=-ht*(0.78+0.12*Math.sin(i)); g.beginPath(); g.moveTo(fx-14,fy+12); g.lineTo(fx+6+R()*10,fy-30-R()*30); g.lineTo(fx+16,fy+12); g.fill(); }
    hull(); g.fill(); g.save(); hull(); g.clip();
    g.strokeStyle=P.hole; g.lineWidth=1.4;
    for(let i=0;i<16;i++){ const px=-len/2+len*i/15; g.beginPath(); g.moveTo(px,-ht*1.2); g.quadraticCurveTo(px+12,0,px,ht); g.stroke(); }
    for(let j=1;j<4;j++){ g.beginPath(); g.moveTo(-len/2,-ht*0.15*j); g.bezierCurveTo(-len*0.3,-ht*(0.2+0.22*j),len*0.3,-ht*(0.25+0.22*j),len/2,-ht*0.2*j); g.stroke(); }
    // torn open section with exposed ribs
    const hx=len*0.08, pts=[]; for(let i=0;i<10;i++){ const a=i/10*PI2; pts.push([hx+Math.cos(a)*len*0.12*(0.6+R()*0.5), -ht*0.35+Math.sin(a)*ht*0.42*(0.6+R()*0.5)]); }
    g.fillStyle=P.hole; poly(g,pts); g.fill();
    g.strokeStyle=P.steel; g.lineWidth=2.4; for(let i=0;i<5;i++){ const rx=hx-len*0.09+i*len*0.045; g.beginPath(); g.moveTo(rx,-ht*0.75); g.quadraticCurveTo(rx+10,-ht*0.35,rx-4,ht*0.05); g.stroke(); }
    g.restore();
    g.strokeStyle=P.edge; g.lineWidth=2; g.beginPath(); g.moveTo(-len/2,0); g.bezierCurveTo(-len*0.32,-ht,len*0.28,-ht*1.15,len/2,-ht*0.25); g.stroke();
    g.restore();
  }
  function car(g,x,y,s,P,flip){
    g.save(); g.translate(x,y); g.scale(flip?-s:s,s); g.rotate(0.05);
    g.fillStyle=P.near; g.beginPath(); g.moveTo(-34,0); g.lineTo(-36,-12); g.lineTo(-20,-14); g.lineTo(-10,-26); g.lineTo(14,-27); g.lineTo(24,-15); g.lineTo(37,-12); g.lineTo(36,0); g.closePath(); g.fill();
    g.fillStyle=P.hole; g.beginPath(); g.moveTo(-8,-23); g.lineTo(2,-23); g.lineTo(3,-15); g.lineTo(-15,-15); g.fill(); g.beginPath(); g.moveTo(6,-23); g.lineTo(13,-23); g.lineTo(20,-15); g.lineTo(6,-15); g.fill();
    g.fillStyle=P.slab; g.beginPath(); g.arc(-21,0,7,0,PI2); g.arc(22,1,7,0,PI2); g.fill();
    g.fillStyle=P.edge; g.fillRect(-36,-13,72,1.2);
    g.restore();
  }
  function vines(g,R,P,x,y,len,w,ang,curl,flat){
    let px=x, py=y, a=ang; const pts=[[px,py]];
    for(let i=0;i<len;i+=6){ a+=(R()-0.5)*0.5+curl*0.04; px+=Math.cos(a)*6; py+=Math.sin(a)*6*(flat||1); pts.push([px,py]); }
    const n=pts.length;
    for(let pass=0;pass<2;pass++){
      g.strokeStyle=pass?P.vineHi:P.vine; g.lineCap='round';
      for(let i=1;i<n;i++){ const k=1-i/n; g.lineWidth=pass?Math.max(0.4,w*k*0.25):Math.max(0.6,w*k); g.beginPath(); g.moveTo(pts[i-1][0],pts[i-1][1]-(pass?w*k*0.25:0)); g.lineTo(pts[i][0],pts[i][1]-(pass?w*k*0.25:0)); g.stroke(); }
    }
    return pts;
  }

  function paintCity(g,P){
    const R=rng(101);
    // --- distant skyline (very hazy) + far skyline (textured, windows)
    const skyline=(seed,col,hMin,hVar,hCl,wMin,wVar,tex)=>{ const Q=rng(seed), tops=[]; let x=X0-20;
      while(x<X1+20){
        const w=wMin+Q()*wVar, cl=0.5+0.5*Math.sin(x*0.004+seed)*Math.sin(x*0.0017+0.4), cz=(x>CX0-60&&x<CX1+60)?0.72:1;
        const h=(hMin+Q()*hVar+cl*hCl)*cz, ty=Q(), b=GROUND+10;
        g.beginPath(); g.moveTo(x,b);
        if(ty<0.42){ const hl=h, hr=h*(0.35+Q()*0.55), st=3+(Q()*4|0); g.lineTo(x,b-hl); for(let s=1;s<st;s++) g.lineTo(x+w*s/st,b-lerp(hl,hr,s/st)-(Q()-0.3)*h*0.18); g.lineTo(x+w,b-hr); }
        else if(ty<0.62){ g.lineTo(x,b-h*0.78); g.lineTo(x+w*0.18,b-h*0.78); g.lineTo(x+w*0.18,b-h); g.lineTo(x+w*0.82,b-h); g.lineTo(x+w*0.82,b-h*0.9); g.lineTo(x+w,b-h*0.9); }
        else { g.lineTo(x,b-h); g.lineTo(x+w,b-h); }
        g.lineTo(x+w,b); g.closePath(); g.fillStyle=col; g.fill();
        if(tex){ g.save(); g.clip(); const sh=Q();
          g.fillStyle=sh<0.5?'rgba(0,0,0,0.16)':'rgba(255,255,255,0.03)'; g.fillRect(x,b-h-40,w,h+40);          // per-building tone
          g.fillStyle='rgba(0,0,0,0.22)'; for(let yy=b-8; yy>b-h; yy-=8) g.fillRect(x,yy,w,1.3);              // floors
          g.fillStyle=P.edge; g.fillRect(x,b-h-40,1.2,h+40);                                                   // rim
          const nW=Q()<0.45?2+(Q()*7|0):0; for(let i=0;i<nW;i++){ g.fillStyle=rgba(P.farWin,0.3+Q()*0.5); g.fillRect(x+3+Q()*(w-8),b-8-((Q()*h/8)|0)*8+2.5,3,3); }
          g.restore(); }
        if(ty>=0.62 && Q()<0.35){ g.fillStyle=col; g.fillRect(x+w*0.45,b-h-34-Q()*40,1.6,60); }
        tops.push([x,w,h]); x+=w*(0.55+Q()*0.6);
      } return tops; };
    skyline(7,P.dist,30,70,150,18,46,false);
    g.save(); g.globalCompositeOperation='source-atop';
    let hz=g.createLinearGradient(0,GROUND-300,0,GROUND+10); hz.addColorStop(0,rgba(P.haze,0.15)); hz.addColorStop(1,rgba(P.haze,0.55));
    g.fillStyle=hz; g.fillRect(X0,GROUND-620,W,680); g.restore();
    skyline(3,P.far,25,80,120,24,60,true);
    crane(g,-640,300,1,false,P); crane(g,1150,280,-1,true,P); crane(g,1540,330,-1,false,P); crane(g,-1300,260,1,true,P);
    // atmospheric haze on everything so far (bottom = thicker)
    g.save(); g.globalCompositeOperation='source-atop';
    hz=g.createLinearGradient(0,GROUND-260,0,GROUND+10); hz.addColorStop(0,rgba(P.haze,0)); hz.addColorStop(1,rgba(P.haze,P.hazeA));
    g.fillStyle=hz; g.fillRect(X0,GROUND-620,W,680); g.restore();
    // --- near ruins
    let x=X0-30;
    while(x<X1+30){
      const inC=x>CX0-80 && x<CX1+40, tp=R(), w=40+R()*90, hm=inC?0.5:1;
      if(tp<0.5) tower(g,x,w,(110+R()*230)*hm,P,R);
      else if(tp<0.68) frame(g,x,w*0.8,(120+R()*200)*hm,P,R);
      else if(tp<0.86) collapsed(g,x,w*1.4,(45+R()*90)*hm,P,R);
      else poles(g,x,w*1.6,P,R);
      x+=w+14+R()*(inC?130:80);
    }
    ship(g,-1010,GROUND-28,560,92,0.16,P,R);
    ship(g,1450,GROUND-12,330,60,-0.32,P,R);
    // light: rim from the sky + fire glow on the ruins
    g.save(); g.globalCompositeOperation='source-atop';
    const rm=g.createLinearGradient(0,GROUND-460,0,GROUND-60); rm.addColorStop(0,rgba(P.rim,P.rimA)); rm.addColorStop(1,rgba(P.rim,0));
    g.fillStyle=rm; g.fillRect(X0,GROUND-620,W,560);
    for(const f of FIRES) soft(g,f.x,f.y-30,170*f.s,120*f.s,P.fireLight,P.fireLightA,0.35);
    g.restore();
    // --- rubble band where ruins meet the ground
    g.fillStyle=P.band; g.beginPath(); g.moveTo(X0,GROUND+60);
    for(let bx=X0; bx<=X1; bx+=10){ const n=Math.sin(bx*0.02)*0.5+Math.sin(bx*0.053+2)*0.3+Math.sin(bx*0.13)*0.2; g.lineTo(bx,GROUND+12-(n*0.5+0.5)*16-R()*6); }
    g.lineTo(X1,GROUND+60); g.closePath(); g.fill();
    for(let i=0;i<160;i++){ const bx=X0+R()*W, s=2+R()*6; g.fillStyle=R()<0.5?P.slab:P.near; g.save(); g.translate(bx,GROUND+6+R()*10); g.rotate(R()*3); g.fillRect(-s,-s*0.5,s*2,s); g.restore(); }
    car(g,-1180,GROUND+16,0.9,P,false); car(g,-560,GROUND+15,0.7,P,true); car(g,1060,GROUND+16,0.8,P,true); car(g,1560,GROUND+16,0.9,P,false);
    // horizon mist merging into the ground
    const mz=g.createLinearGradient(0,GROUND-70,0,GROUND+50); mz.addColorStop(0,rgba(P.bandHaze,0)); mz.addColorStop(0.6,rgba(P.bandHaze,0.35)); mz.addColorStop(1,rgba(P.bandHaze,0.7));
    g.fillStyle=mz; g.fillRect(X0,GROUND-70,W,120);
    g.save(); g.globalCompositeOperation='destination-out'; const fo=g.createLinearGradient(0,GROUND+6,0,GROUND+46); fo.addColorStop(0,'rgba(0,0,0,0)'); fo.addColorStop(1,'rgba(0,0,0,1)');
    g.fillStyle=fo; g.fillRect(X0,GROUND+6,W,70); g.restore();
    // --- Upside Down: vines crawling over the ruins
    if(P.vine){ const Q=rng(808);
      for(let i=0;i<46;i++){ const vx=X0+Q()*W; if(vx>CX0&&vx<CX1&&Q()<0.6) continue; vines(g,Q,P,vx,GROUND+10,30+Q()*130,2.5+Q()*4,-Math.PI/2+(Q()-0.5)*0.9,(Q()-0.5)*2); }
      for(let i=0;i<40;i++){ const vx=X0+Q()*W; vines(g,Q,P,vx,GROUND+8,60+Q()*160,2+Q()*2,Q()<0.5?0:Math.PI,(Q()-0.5),0.15); }
    }
  }

  function crater(g,x,y,rx,P,R,z){
    const ry=rx*(0.24+0.14*pp(y)), fade=1-z*0.5, n=28, out=[], inn=[];
    const ph1=R()*7, ph2=R()*7; for(let i=0;i<n;i++){ const a=i/n*PI2, j=0.92+0.07*Math.sin(a*2+ph1)+0.05*Math.sin(a*5+ph2)+R()*0.03; out.push([x+Math.cos(a)*rx*1.25*j, y+Math.sin(a)*ry*1.4*j]); inn.push([x+Math.cos(a)*rx*j*0.92, y+ry*0.06+Math.sin(a)*ry*j*0.9]); }
    soft(g,x,y+ry*0.2,rx*2.4,ry*2.7,P.gDark,0.5*fade,0.35); soft(g,x,y+ry*0.9,rx*1.35,ry*0.55,P.gLight,0.22*fade,0.4);
    g.strokeStyle=rgba(P.gDark,0.25*fade); g.lineWidth=Math.max(0.6,rx*0.025);
    for(let i=0;i<16;i++){ const a=R()*PI2, l=1.3+R()*0.9; g.beginPath(); g.moveTo(x+Math.cos(a)*rx*1.2,y+Math.sin(a)*ry*1.3); g.lineTo(x+Math.cos(a)*rx*l*1.3,y+Math.sin(a)*ry*l*1.3); g.stroke(); }
    for(let i=0;i<14;i++){ const a=R()*PI2, d=1.15+R()*0.8, sz=rx*(0.025+R()*0.05); g.fillStyle=R()<0.5?P.rockTop:P.rockBot; g.beginPath(); g.ellipse(x+Math.cos(a)*rx*d,y+Math.sin(a)*ry*d,sz,sz*0.6,0,0,PI2); g.fill(); }
    let gr=g.createLinearGradient(0,y-ry*1.4,0,y+ry*1.4); gr.addColorStop(0,rgba(P.gDark,0.45*fade)); gr.addColorStop(0.5,rgba(P.gDark,0.25*fade)); gr.addColorStop(0.82,rgba(P.gLight,0.2*fade)); gr.addColorStop(1,rgba(P.gLight,0));
    g.fillStyle=gr; poly(g,out); g.fill();
    gr=g.createLinearGradient(0,y-ry,0,y+ry); gr.addColorStop(0,rgba(P.gLight,0.45*fade)); gr.addColorStop(0.4,rgba(P.gDark,0.85*fade)); gr.addColorStop(1,rgba(P.gDark,0.95*fade));
    g.fillStyle=gr; poly(g,inn); g.fill();
  }
  function rock(g,x,y,r,P,R){
    const n=5+(R()*4|0), pts=[];
    for(let i=0;i<n;i++){ const a=i/n*PI2+R()*0.5, d=r*(0.6+R()*0.4); pts.push([x+Math.cos(a)*d, y+Math.min(0.15,Math.sin(a))*d*0.75]); }
    soft(g,x+r*0.25,y+r*0.12,r*1.5,r*0.35,[0,0,0],0.55,0.5);
    const gr=g.createLinearGradient(0,y-r*0.75,0,y+r*0.15); gr.addColorStop(0,P.rockTop); gr.addColorStop(1,P.rockBot);
    g.fillStyle=gr; poly(g,pts); g.fill();
  }
  function slab(g,x,y,s,P,R){
    g.save(); g.translate(x,y); g.scale(1,0.55+0.35*pp(y)); g.rotate((R()-0.5)*1.2);
    const w=s*(1.4+R()*1.6), h=s*(0.5+R()*0.5);
    soft(g,s*0.2,h*0.7,w*0.8,h*0.5,[0,0,0],0.5,0.5);
    const gr=g.createLinearGradient(0,-h,0,h); gr.addColorStop(0,P.conTop); gr.addColorStop(1,P.conBot);
    g.fillStyle=gr; poly(g,[[-w/2,-h/2+R()*h*0.3],[w/2-R()*w*0.15,-h/2],[w/2,h/2-R()*h*0.3],[-w/2+R()*w*0.2,h/2]]); g.fill();
    g.strokeStyle=P.steelG; g.lineWidth=Math.max(0.6,s*0.06);
    for(let i=0;i<2+(R()*2|0);i++){ const yy=-h/3+i*h/3; g.beginPath(); g.moveTo(w/2-2,yy); g.quadraticCurveTo(w/2+s*0.4,yy-s*0.3*R(),w/2+s*(0.5+R()*0.5),yy+s*(R()-0.5)); g.stroke(); }
    g.restore();
  }
  function crack(g,x,y,s,P,R){
    let a=R()<0.5?0:Math.PI, px=x, py=y; const pts=[[px,py]], n=5+(R()*8|0);
    for(let i=0;i<n;i++){ a+=(R()-0.5)*1.1; const L=(8+R()*18)*s; px+=Math.cos(a)*L; py+=Math.sin(a)*L*0.35; pts.push([px,py]); }
    for(const [col,dy,lw] of [[P.crackL,0.9*s,1.0],[P.crack,0,1.6]]){ g.strokeStyle=col; g.lineWidth=lw*s; g.beginPath(); g.moveTo(pts[0][0],pts[0][1]+dy); for(const p of pts) g.lineTo(p[0],p[1]+dy); g.stroke(); }
    if(R()<0.6){ const p=pts[(R()*pts.length)|0]; g.lineWidth=0.9*s; g.beginPath(); g.moveTo(p[0],p[1]); g.lineTo(p[0]+(R()-0.5)*40*s,p[1]+(R()-0.5)*10*s); g.stroke(); }
  }
  function puddle(g,x,y,rx,P,R){
    const ry=rx*(0.13+0.1*pp(y)), parts=[[0,0,1]]; for(let i=0;i<2;i++) parts.push([(R()-0.5)*rx*1.1,(R()-0.5)*ry*0.7,0.4+R()*0.4]);
    g.fillStyle=rgba(P.gDark,0.6); for(const [dx,dy,k] of parts){ g.beginPath(); g.ellipse(x+dx,y+dy,rx*k*1.1,ry*k*1.35,0,0,PI2); g.fill(); }
    const gr=g.createLinearGradient(0,y-ry*1.2,0,y+ry*1.2); gr.addColorStop(0,rgba(P.puddle,0.26)); gr.addColorStop(0.5,rgba(P.puddle,0.1)); gr.addColorStop(1,rgba(P.puddle,0.03));
    g.fillStyle=gr; for(const [dx,dy,k] of parts){ g.beginPath(); g.ellipse(x+dx,y+dy,rx*k,ry*k,0,0,PI2); g.fill(); }
    g.strokeStyle=rgba(P.puddle,0.3); g.lineWidth=Math.max(0.5,ry*0.07); g.beginPath(); g.moveTo(x-rx*0.45,y-ry*0.45); g.lineTo(x+rx*(R()*0.4),y-ry*0.5); g.stroke();
  }
  function paintGround(g,P){
    const R=rng(303);
    const gr=g.createLinearGradient(0,GROUND,0,GB); for(const [y,c] of P.gnd) gr.addColorStop(clamp01((y-GROUND)/(GB-GROUND)),c);
    g.fillStyle=gr; g.fillRect(X0,GROUND,W,GB-GROUND);
    const Yr=e=>GROUND+4+(GB-GROUND)*Math.pow(R(),e);
    // large mottling
    for(let i=0;i<260;i++){ const y=Yr(1.3), x=X0+R()*W, s=persp(y), rx=(60+R()*170)*s, light=R()<0.45;
      soft(g,x,y,rx,rx*(0.2+0.18*pp(y)),light?P.gLight:P.gDark,(light?0.09:0.16)+R()*0.08,0.45); }
    // perspective furrows toward the vanishing point
    const vx=170; g.fillStyle=rgba(P.gDark,0.02);
    for(let i=0;i<22;i++){ const bx=vx+(i-10.5)*300+(R()-0.5)*120, ww=20+R()*60; g.beginPath(); g.moveTo(vx+(bx-vx)*0.02,GROUND+6); g.lineTo(bx-ww,GB); g.lineTo(bx+ww,GB); g.fill(); }
    // fine grit
    for(let i=0;i<14000;i++){ const y=Yr(1.15), x=X0+R()*W, s=persp(y), w=(0.6+R()*2.2)*s, z=zone(x,y);
      if(R()<0.55){ g.fillStyle=rgba(P.gDark,(0.25+R()*0.35)*(1-z*0.5)); } else { g.fillStyle=rgba(P.speckL,(0.08+R()*0.16)*(1-z*0.6)); }
      g.fillRect(x,y,w,w*0.5); }
    // scorch marks (blast streaks)
    for(let i=0;i<34;i++){ const y=Yr(1.2), x=X0+R()*W, s=persp(y), rx=(50+R()*110)*s, z=zone(x,y), ry=rx*(0.22+0.15*pp(y));
      soft(g,x,y,rx,ry,P.gDark,0.55*(1-z*0.6),0.3);
      g.strokeStyle=rgba(P.gDark,0.22*(1-z*0.6)); g.lineWidth=Math.max(0.6,2*s);
      for(let j=0;j<12;j++){ const a=R()*PI2, l=rx*(1+R()*0.8); g.beginPath(); g.moveTo(x+Math.cos(a)*rx*0.3,y+Math.sin(a)*ry*0.3); g.lineTo(x+Math.cos(a)*l,y+Math.sin(a)*l*ry/rx); g.stroke(); } }
    // cracks
    for(let i=0;i<70;i++){ const y=Yr(1.25), x=X0+R()*W, z=zone(x,y), keep=R()>z*0.75; if(keep) crack(g,x,y,persp(y),P,R); else { R();R();R(); } }
    // puddles (away from the characters)
    for(let i=0;i<26;i++){ const y=Yr(1.1), x=X0+R()*W, rx=(26+R()*60)*persp(y); if(zone(x,y)<0.05) puddle(g,x,y,rx,P,R); else { R();R();R();R();R();R(); } }
    // craters
    for(let i=0;i<46;i++){ const y=Yr(1.35), x=X0+R()*W, z=zone(x,y), rx=(40+R()*95)*persp(y)*(1-z*0.45); if(R()>z*0.7) crater(g,x,y,rx,P,R,z); }
    // rubble: rocks, concrete slabs, girders
    for(let i=0;i<520;i++){ const y=Yr(1.3), x=X0+R()*W, z=zone(x,y), s=persp(y), t=R(), keep=R()>z*0.85;
      if(!keep) continue;
      if(t<0.62) rock(g,x,y,(2.5+R()*R()*13)*s,P,R);
      else if(t<0.9) slab(g,x,y,(6+R()*12)*s,P,R);
      else { g.save(); g.translate(x,y); g.rotate((R()-0.5)*0.5); const L=(40+R()*70)*s, h=Math.max(1.2,3.2*s);
        soft(g,0,h*1.6,L*0.55,h*1.2,[0,0,0],0.5,0.5); g.fillStyle=P.steelG; g.fillRect(-L/2,-h/2,L,h); g.fillStyle=P.crackL; g.fillRect(-L/2,-h/2,L,h*0.3); g.restore(); }
    }
    // smoldering embers inside a few edge craters
    for(let i=0;i<10;i++){ const x=R()<0.5?X0+R()*(CX0-120-X0):CX1+120+R()*(X1-CX1-120), y=GROUND+30+R()*500, s=persp(y);
      soft(g,x,y,26*s,9*s,P.smolder,0.35,0.3); for(let j=0;j<6;j++){ g.fillStyle=rgba(P.smolder,0.5+R()*0.4); g.fillRect(x+(R()-0.5)*30*s,y+(R()-0.5)*6*s,1.4*s,0.8*s); } }
    // wrecked vehicles at the edges
    car(g,-860,646,1.25,{near:P.rockBot,hole:'#050406',slab:P.conBot,edge:P.crackL},false);
    car(g,1330,654,1.35,{near:P.rockBot,hole:'#050406',slab:P.conBot,edge:P.crackL},true);
    // Upside Down: vines over the ground, mostly at the edges
    if(P.vine){ const Q=rng(4242);
      for(let i=0;i<90;i++){ const y=GROUND+10+Q()*900, x=X0+Q()*W; if(zone(x,y)>0.1 && Q()<0.85) continue;
        const pts=vines(g,Q,P,x,y,80+Q()*260,(2.5+Q()*4)*persp(y),Q()<0.5?0:Math.PI,(Q()-0.5)*1.5,0.35);
        if(Q()<0.4){ const p=pts[pts.length-1]; soft(g,p[0],p[1],10*persp(y),4*persp(y),[255,40,30],0.4,0.3); } }
    }
    // horizon haze
    const hz=g.createLinearGradient(0,GROUND,0,GROUND+110); hz.addColorStop(0,rgba(P.bandHaze,0.75)); hz.addColorStop(1,rgba(P.bandHaze,0));
    g.fillStyle=hz; g.fillRect(X0,GROUND,W,110);
  }

  function paintFog(g,tw,y0,h,col){
    const R=rng(515);
    for(let i=0;i<80;i++){ const x=R()*tw, y=y0+h*(0.25+0.5*R()), rx=80+R()*240, ry=rx*(0.08+R()*0.06), a=0.05+R()*0.1;
      for(const dx of [0,x-rx<TM?tw:null,x+rx>tw-TM?-tw:null]) if(dx!=null) soft(g,x+dx,y,rx,ry,col,a,0.4); }
  }

  // ---------- sprites ----------
  function spriteGlow(rad,col,a,mid){ const c=canvas(rad*2,rad*2), x=c.getContext('2d'); const gr=x.createRadialGradient(rad,rad,0,rad,rad,rad);
    gr.addColorStop(0,rgba(col,a)); gr.addColorStop(mid,rgba(col,a*0.35)); gr.addColorStop(1,rgba(col,0)); x.fillStyle=gr; x.fillRect(0,0,rad*2,rad*2); return c; }
  function spriteSmoke(col,seed){ const S=64, c=canvas(S*2,S*2), x=c.getContext('2d'), R=rng(seed);
    for(let i=0;i<14;i++){ const a=R()*PI2, d=R()*S*0.4, r=S*(0.3+R()*0.3), px=S+Math.cos(a)*d, py=S+Math.sin(a)*d*0.8;
      const gr=x.createRadialGradient(px,py,0,px,py,r); gr.addColorStop(0,rgba(col,0.42)); gr.addColorStop(0.6,rgba(col,0.2)); gr.addColorStop(1,rgba(col,0)); x.fillStyle=gr; x.fillRect(0,0,S*2,S*2); }
    return c; }

  // drop fully transparent rows at the top/bottom of a layer (less fill per frame)
  function trim(Ly){
    const c=Ly.c, w=c.width, h=c.height, d=c.getContext('2d').getImageData(0,0,w,h).data; let r0=0, r1=h-1;
    const rowEmpty=y=>{ for(let x=0,i=y*w*4+3;x<w;x+=2,i+=8) if(d[i]>3) return false; return true; };
    while(r0<r1 && rowEmpty(r0)) r0++; while(r1>r0 && rowEmpty(r1)) r1--;
    r0=Math.max(0,r0-1); r1=Math.min(h-1,r1+1); if(r0===0 && r1===h-1) return Ly;
    const n=canvas(w,r1-r0+1); n.getContext('2d').drawImage(c,0,-r0); Ly.c=n; Ly.y+=r0/Ly.k; Ly.h=n.height/Ly.k; return Ly;
  }
  // ---------- build ----------
  const L={}; let ready=false;
  function build(){
    if(ready) return; ready=true;
    L.skyN=layer(X0,SKY_TOP,W,GROUND+40-SKY_TOP,0.22,g=>paintSky(g,PN));
    L.skyR=layer(X0,SKY_TOP,W,GROUND+40-SKY_TOP,0.22,g=>paintSky(g,PR));
    L.cloudN=[]; L.cloudR=[];
    for(const D of CLOUD_DEF){
      for(const [arr,P] of [[L.cloudN,PN],[L.cloudR,PR]]){ const Ly=trim(layer(-TM,D.y0,D.tw+2*TM,D.y1-D.y0,D.k,g=>paintClouds(g,D,P))); Ly.tw=D.tw; arr.push(Ly); }
    }
    L.cityN=layer(X0,GROUND-620,W,690,0.8,g=>paintCity(g,PN));
    L.cityR=layer(X0,GROUND-620,W,690,0.8,g=>paintCity(g,PR));
    L.gndN=layer(X0,GROUND,W,GB-GROUND,0.7,g=>paintGround(g,PN));
    L.gndR=layer(X0,GROUND,W,GB-GROUND,0.7,g=>paintGround(g,PR));
    for(const [key,col] of [['fogN',[150,158,192]],['fogR',[160,46,38]]]){ const Ly=trim(layer(-TM,0,1500+2*TM,300,0.35,g=>paintFog(g,1500,0,300,col))); Ly.tw=1500; L[key]=Ly; }
    L.moon=layer(40-30,180-30,60,60,5,g=>{
      const r=26, gr=g.createRadialGradient(32,172,2,40,180,r); gr.addColorStop(0,'#fdfcff'); gr.addColorStop(0.7,'#e2e4f4'); gr.addColorStop(1,'#a7abc8');
      g.fillStyle=gr; g.beginPath(); g.arc(40,180,r,0,PI2); g.fill(); g.save(); g.clip(); const R=rng(5);
      for(let i=0;i<8;i++) soft(g,26+R()*28,166+R()*28,4+R()*8,3+R()*7,[118,122,152],0.4,0.6);
      for(let i=0;i<16;i++){ const cx=16+R()*48, cy=156+R()*48, cr=0.7+R()*2.3; g.fillStyle='rgba(105,108,138,0.35)'; g.beginPath(); g.arc(cx,cy,cr,0,PI2); g.fill(); g.fillStyle='rgba(255,255,255,0.3)'; g.beginPath(); g.arc(cx-cr*0.3,cy-cr*0.3,cr*0.55,0,PI2); g.fill(); }
      const sh=g.createLinearGradient(14,154,66,206); sh.addColorStop(0.45,'rgba(20,20,55,0)'); sh.addColorStop(1,'rgba(20,20,55,0.45)'); g.fillStyle=sh; g.fillRect(10,150,60,60); g.restore(); });
    L.halo=layer(40-300,180-300,600,600,0.45,g=>{ soft(g,40,180,300,300,[160,172,235],0.42,0.16); soft(g,40,180,70,70,[225,230,255],0.55,0.45); });
    L.flashN=spriteGlow(64,[200,212,255],1,0.4); L.flashR=spriteGlow(64,[255,70,45],1,0.4);
    L.fire=spriteGlow(48,[255,130,50],1,0.3); L.fireCore=spriteGlow(24,[255,220,140],1,0.4);
    L.ember=spriteGlow(12,[255,160,70],1,0.25); L.spore=spriteGlow(12,[255,60,40],1,0.25);
    L.smokeN=spriteSmoke([66,56,70],9); L.smokeR=spriteSmoke([22,3,5],9);
  }

  // ---------- per-frame helpers ----------
  function view(g){ const m=g.getTransform(), cw=g.canvas.width, ch=g.canvas.height;
    const xa=-m.e/m.a, xb=(cw-m.e)/m.a, ya=-m.f/m.d, yb=(ch-m.f)/m.d;
    return {x0:Math.min(xa,xb), x1:Math.max(xa,xb), y0:Math.min(ya,yb), y1:Math.max(ya,yb), z:Math.abs(m.a), a:m.a, e:m.e}; }
  function blit(g,Ly,V){
    const lw=Ly.w, lh=Ly.h, ix0=Math.max(Ly.x,V.x0-2), ix1=Math.min(Ly.x+lw,V.x1+2), iy0=Math.max(Ly.y,V.y0-2), iy1=Math.min(Ly.y+lh,V.y1+2);
    if(ix1<=ix0||iy1<=iy0) return;
    g.drawImage(Ly.c,(ix0-Ly.x)*Ly.k,(iy0-Ly.y)*Ly.k,(ix1-ix0)*Ly.k,(iy1-iy0)*Ly.k,ix0,iy0,ix1-ix0,iy1-iy0);
  }
  function pair(g,A,B,V,red){ if(red<1){ g.globalAlpha=1; blit(g,A,V); } if(red>0){ g.globalAlpha=red; blit(g,B,V); } g.globalAlpha=1; }
  // horizontally tiled layer: canvas holds one period (tw) plus a TM margin of wrapped content on each side.
  // Tile n starts at world x = off + n*tw; placed at y0w with vertical scale sy. Tiles overlap by ~1 screen px to hide seams.
  function tiled(g,Ly,V,off,y0w,sy,alpha){
    if(alpha<=0.003) return; y0w+=(Ly.y-Ly.y00)*sy; const k=Ly.k, tw=Ly.tw, y1w=y0w+Ly.h*sy, iy0=Math.max(y0w,V.y0), iy1=Math.min(y1w,V.y1); if(iy1<=iy0) return;
    const sy0=(iy0-y0w)/sy*k, sh=(iy1-iy0)/sy*k, o=((off%tw)+tw)%tw;
    const snap=x=>(Math.round(V.a*x+V.e)-V.e)/V.a;          // tile joints on whole device pixels -> no AA seam
    g.globalAlpha=alpha;
    for(let n=Math.floor((V.x0-o)/tw); n<=Math.floor((V.x1-o)/tw); n++){
      const tx=o+n*tw, ix0=Math.max(snap(tx),V.x0), ix1=Math.min(snap(tx+tw),V.x1); if(ix1<=ix0) continue;
      g.drawImage(Ly.c,(TM+ix0-tx)*k,sy0,(ix1-ix0)*k,sh,ix0,iy0,ix1-ix0,iy1-iy0);
    }
  }
  function cloudLayer(g,i,V,t,red,camX){
    const D=CLOUD_DEF[i], off=t*D.spd+camX*D.par*api.parallax;
    if(red<1) tiled(g,L.cloudN[i],V,off,D.y0,1,1);
    if(red>0) tiled(g,L.cloudR[i],V,off,D.y0,1,red);
    g.globalAlpha=1;
  }
  function lightning(g,V,t,red){
    const P=3.3, idx=Math.floor(t/P), h1=hash(idx,17,3); if(h1>0.7) return;
    const lt=t-idx*P-hash(idx,5,9)*1.6; if(lt<0||lt>0.75) return;
    const k=(lt<0.08?lt/0.08:Math.exp(-(lt-0.08)*7))*(0.6+0.4*Math.abs(Math.sin(lt*55)));
    const x=lerp(V.x0,V.x1,0.1+0.8*hash(idx,7,1)), y=-250+hash(idx,3,8)*560, rx=260+hash(idx,9,2)*260;
    g.globalCompositeOperation='lighter';
    if(red<1){ g.globalAlpha=0.55*k*(1-red); g.drawImage(L.flashN,x-rx,y-rx*0.45,rx*2,rx*0.9); }
    if(red>0){ g.globalAlpha=0.7*k*red; g.drawImage(L.flashR,x-rx,y-rx*0.45,rx*2,rx*0.9); }
    g.globalCompositeOperation='source-over'; g.globalAlpha=1;
  }
  function stars(g,V,t,a){
    g.fillStyle='#dfe6ff';
    for(const s of STARS){ if(s.x<V.x0||s.x>V.x1||s.y<V.y0||s.y>V.y1) continue;
      g.globalAlpha=a*s.a*(0.65+0.35*Math.sin(t*s.f+s.p)); g.fillRect(s.x-s.r/2,s.y-s.r/2,s.r,s.r); }
    g.globalAlpha=1;
  }
  function smoke(g,V,t,red){
    for(const c of SMOKES){
      if(c.x<V.x0-500||c.x>V.x1+150||c.y-c.h>V.y1||c.y<V.y0-50) continue;
      for(let i=0;i<22;i++){ const l=frac(t*c.rate+i/22+c.ph), px=c.x+Math.pow(l,1.5)*240+Math.sin(t*0.5+i*1.7)*8*l, py=c.y-l*c.h, r=24+l*c.w;
        const a=Math.min(1,l*5)*Math.pow(1-l,1.3)*0.6; if(a<=0.01) continue;
        if(red<1){ g.globalAlpha=a; g.drawImage(L.smokeN,px-r,py-r,r*2,r*2); }
        if(red>0){ g.globalAlpha=a*red; g.drawImage(L.smokeR,px-r,py-r,r*2,r*2); }
        if(l<0.3){ g.globalCompositeOperation='lighter'; g.globalAlpha=a*(1-l/0.3)*0.35; g.drawImage(L.fire,px-r,py-r*0.8,r*2,r*1.6); g.globalCompositeOperation='source-over'; } }
    }
    g.globalAlpha=1;
  }
  function fires(g,V,t,red){
    g.globalCompositeOperation='lighter';
    for(const f of FIRES){ if(f.x<V.x0-120||f.x>V.x1+120||f.y<V.y0-120||f.y>V.y1+120) continue;
      const fl=0.82+0.12*Math.sin(t*9+f.ph)+0.08*Math.sin(t*23+f.ph*2), s=f.s*fl;
      g.globalAlpha=(0.6-0.15*red)*fl; g.drawImage(L.fire,f.x-80*s,f.y-62*s,160*s,100*s);
      // flame tongues
      g.globalAlpha=1;
      for(let j=0;j<3;j++){ const ox=f.x+(j-1)*6*f.s, hh=(14+7*Math.sin(t*(6+j*1.7)+f.ph+j*2))*f.s*(j===1?1.3:0.85), ww=5*f.s, sw=Math.sin(t*4.3+j+f.ph)*3*f.s;
        for(const [c,k] of [[red>0.5?'rgba(255,50,20,0.7)':'rgba(255,105,30,0.7)',1],['rgba(255,215,120,0.75)',0.5]]){ const w2=ww*k, h2=hh*(k<1?0.55:1);
          g.fillStyle=c; g.beginPath(); g.moveTo(ox-w2,f.y); g.bezierCurveTo(ox-w2,f.y-h2*0.5,ox+sw-w2*0.2,f.y-h2*0.7,ox+sw,f.y-h2); g.bezierCurveTo(ox+sw+w2*0.2,f.y-h2*0.7,ox+w2,f.y-h2*0.5,ox+w2,f.y); g.fill(); } }
      g.globalAlpha=0.6*fl; g.drawImage(L.fireCore,f.x-14*s,f.y-14*s,28*s,22*s);
    }
    g.globalCompositeOperation='source-over'; g.globalAlpha=1;
  }
  // deterministic particle field in world cells (no state, works at any camera position)
  function field(g,V,t,cell,n,seed,ymin,ymax,fn){
    const cx0=Math.floor((V.x0-60)/cell), cx1=Math.floor((V.x1+20)/cell), cy0=Math.floor(Math.max(V.y0,ymin)/cell), cy1=Math.floor(Math.min(V.y1,ymax)/cell);
    for(let cy=cy0;cy<=cy1;cy++) for(let cx=cx0;cx<=cx1;cx++) for(let i=0;i<n;i++) fn(cx*cell,cy*cell,hash(cx,cy,i*4+seed),hash(cx,cy,i*4+seed+1),hash(cx,cy,i*4+seed+2),hash(cx,cy,i*4+seed+3));
  }

  const api={
    parallax:1,
    prepare: build,
    draw(g,t,red){
      build(); red=clamp01(+red||0); t=+t||0;
      const V=view(g), camX=(V.x0+V.x1)/2; api._V=V;
      g.save(); g.globalAlpha=1; g.globalCompositeOperation='source-over';
      if(V.y0<SKY_TOP){ g.fillStyle=red>0.5?'#040001':'#03040a'; g.fillRect(V.x0,V.y0,V.x1-V.x0,SKY_TOP-V.y0+2); }
      if(V.y1>GB){ g.fillStyle=red>0.5?'#090203':'#09080c'; g.fillRect(V.x0,GB-2,V.x1-V.x0,V.y1-GB+2); }
      if(V.y0<GROUND+40) pair(g,L.skyN,L.skyR,V,red);
      if(V.y0<GROUND){
        if(red<1) stars(g,V,t,1-red);
        cloudLayer(g,0,V,t,red,camX); lightning(g,V,t,red); cloudLayer(g,1,V,t,red,camX);
        if(red<1){ g.globalAlpha=1-red; blit(g,L.halo,V); blit(g,L.moon,V); g.globalAlpha=1; }
        cloudLayer(g,2,V,t,red,camX); }
      if(V.y1>GROUND) pair(g,L.gndN,L.gndR,V,red);
      pair(g,L.cityN,L.cityR,V,red);
      smoke(g,V,t,red); fires(g,V,t,red);
      // drifting mist over the horizon
      const fogA=0.3; if(red<1) tiled(g,L.fogN,V,t*7+camX*0.05,GROUND-95,0.55,fogA*(1-red)); if(red>0) tiled(g,L.fogR,V,t*7+camX*0.05,GROUND-95,0.55,fogA*red);
      g.globalAlpha=1;
      // far spores drifting upward (Upside Down)
      if(red>0.02){ g.fillStyle='#e8b4a8';
        field(g,V,t,420,8,101,-1400,1400,(bx,by,h1,h2,h3,h4)=>{ const l=frac(h2+t*(0.02+h3*0.03)), x=bx+h1*420+Math.sin(t*(0.4+h4)+h1*9)*14+l*40, y=by+420*(1-l), s=0.7+h3*1.1;
          g.globalAlpha=red*0.5*Math.sin(Math.PI*l)*(0.4+h4*0.6); g.fillRect(x,y,s,s); }); }
      g.restore();
    },
    drawFront(g,t,red){
      build(); red=clamp01(+red||0); t=+t||0;
      const V=view(g);
      g.save(); g.globalCompositeOperation='source-over';
      // low fog (y ≈ 780–1000)
      if(red<1){ tiled(g,L.fogN,V,t*10,720,1,0.4*(1-red)); tiled(g,L.fogN,V,-t*6+640,800,0.7,0.3*(1-red)); }
      if(red>0){ tiled(g,L.fogR,V,t*10,720,1,0.42*red); tiled(g,L.fogR,V,-t*6+640,800,0.7,0.32*red); }
      g.globalAlpha=1;
      // embers (night) / spores (red), additive
      g.globalCompositeOperation='lighter';
      field(g,V,t,520,6,7,-1400,1400,(bx,by,h1,h2,h3,h4)=>{ const l=frac(h2+t*(0.05+h3*0.07)), x=bx+h1*520+Math.sin(t*(1+h4*2)+h1*20)*(8+h3*14)+l*70, y=by+520*(1-l), s=2.2+h4*3.2;
        const a=Math.sin(Math.PI*l)*(0.55+0.45*Math.sin(t*(6+h3*9)+h4*30));
        if(red<1){ g.globalAlpha=a*(1-red)*0.9; g.drawImage(L.ember,x-s,y-s,s*2,s*2); }
        if(red>0 && h1<0.6){ g.globalAlpha=a*red*0.85; g.drawImage(L.spore,x-s,y-s,s*2,s*2); } });
      g.globalCompositeOperation='source-over';
      // pale ash flakes floating up (Upside Down)
      if(red>0.02){ g.fillStyle='#f0d6cf';
        field(g,V,t,480,12,33,-1400,1400,(bx,by,h1,h2,h3,h4)=>{ const l=frac(h2+t*(0.025+h3*0.035)), x=bx+h1*480+Math.sin(t*(0.5+h4)+h1*12)*(14+h3*20)+l*50, y=by+480*(1-l), s=1+h3*1.8;
          g.globalAlpha=red*0.7*Math.sin(Math.PI*l)*(0.35+h4*0.65); g.fillRect(x,y,s,s*0.8); }); }
      g.restore();
    },
  };
  window._cineBG=api;
})();
