// ===================== 🎬 MEME LORE 2 · TẬP 2 — "INTO THE DARK" =====================
// Hang đá tối om. Một CỔNG BÓNG TỐI xé toạc giữa không trung, Evil Gary rơi lộn nhào xuống, đập đất nằm ngửa.
// Tỉnh dậy, lắc đầu, ngó trái ngó phải → đuốc lửa tím bừng lên từng cặp, máy quay ngước dần lên: TƯỢNG FRIEND đá
// khổng lồ trên bệ 3 tầng, 2 BÀN TAY BÓNG TỐI khổng lồ dựng đứng 2 bên bị cùm sắt + xích khoá vào vách/sàn.
// Trên đầu ngón mỗi bàn tay hiện ra 2 thành viên dạng HÌNH CHIẾU mờ ảo (không thấy rõ là ai) → nhạc Akatsuki.
// Máy quay đẩy lên đỉnh đầu tượng: 1 thành viên đứng đó rõ hơn — BÓNG Depressed Cat; sét loé qua lỗ trần hắt viền,
// thấy hoạ tiết mây đỏ trên áo, rồi 2 mắt RINNEGAN sáng lên trong bóng tối.
// Khung dọc 1080×1920 (Shorts) giống tập 1 (js/cine-dpwindow.js). Nền / tượng / tay vẽ SẴN 1 lần ra ảnh phụ, phần động vẽ mỗi khung.
// Ánh sáng: cả thế giới vẽ sáng rồi phủ 1 lớp TỐI, các nguồn sáng (cổng, đuốc, sét) khoét lỗ trên lớp tối đó.
(function(){
  if(window._cineL2E2) return;
  const VW=540, VH=960, GROUND=860, GY=972, DUR=24.6;   // GROUND: chân vách / bệ tượng · GY: chỗ Gary đứng (sàn phía trước)
  const T={ open:1.1, opened:2.4, out:3.0, land:3.9, close:4.5, closed:5.0, wake:6.0, up:6.8, shake:6.9, lookL:7.7, lookR:8.5, lookC:9.3, lookUp:9.6,
            ignite:9.8, wide:13.4, holo:14.6, music:15.0, push:16.8, flash:18.6, eyes:19.4, fade:23.6 };
  const A=p=>{ const im=new Image(); im.src=p; return im; };
  const IMG={ gary:A('assets/avatars/evilgary/avatarUrl.webp'), friend:A('assets/avatars/friend/avatarUrl.webp'), hand:A('assets/img/scaredhamster/HAND_slap.webp'),
    pain:A('assets/img/depressedcat/DP_PAIN_IMG.webp'), mem:['catvader','samuraicheems','vampirecat','gigachad'].map(n=>A('assets/avatars/'+n+'/avatarUrl.webp')) };
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)), seg=(t,a,b)=>clamp((t-a)/(b-a),0,1), eio=x=>x*x*(3-2*x), lerp=(a,b,k)=>a+(b-a)*k;
  const eout=x=>1-(1-x)*(1-x), ein=x=>x*x;
  const hash=n=>{ const s=Math.sin(n*127.1+311.7)*43758.5453; return s-Math.floor(s); };
  const h2=(a,b,s)=>{ const v=Math.sin(a*127.1+b*311.7+s*74.7)*43758.5453; return v-Math.floor(v); };
  function vnoise(x,y,s){ const xi=Math.floor(x), yi=Math.floor(y), xf=x-xi, yf=y-yi, u=xf*xf*(3-2*xf), v=yf*yf*(3-2*yf);
    return lerp(lerp(h2(xi,yi,s),h2(xi+1,yi,s),u), lerp(h2(xi,yi+1,s),h2(xi+1,yi+1,s),u), v); }
  let cv, g, W2, w2, D, dctx, SC, raf=null, t0=0, paused=false, pauseT=0, played={}, markOnly=false, panel=null, overlay=null, ready=false;
  const sfx=(id,k,v,dur)=>{ if(played[id]) return; played[id]=1; if(markOnly) return; try{ playSample(k,v==null?1:v,dur||null); }catch(e){} };
  const mk=(w,h)=>{ const c=document.createElement('canvas'); c.width=Math.max(1,Math.round(w)); c.height=Math.max(1,Math.round(h)); return c; };
  // ảnh cắt sát nội dung (bỏ viền trong suốt)
  const prep=im=>{ if(im._cp) return im._cp; if(!im.complete || !im.naturalWidth) return null;
    const sw=im.naturalWidth, sh=im.naturalHeight, c=mk(sw,sh), x=c.getContext('2d'); x.drawImage(im,0,0);
    const d=x.getImageData(0,0,sw,sh).data; let x0=sw,y0=sh,x1=0,y1=0;
    for(let yy=0;yy<sh;yy+=2) for(let xx=0;xx<sw;xx+=2) if(d[(yy*sw+xx)*4+3]>40){ if(xx<x0)x0=xx; if(xx>x1)x1=xx; if(yy<y0)y0=yy; if(yy>y1)y1=yy; }
    if(x1<x0) return null; return im._cp={src:c, sx:x0, sy:y0, sw:x1-x0+1, sh:y1-y0+1}; };
  function actor(c,x,y,h,o){ o=o||{}; if(!c) return; const w=h*c.sw/c.sh;
    g.save(); g.globalAlpha*=(o.a==null?1:o.a); g.translate(x,y); if(o.rot) g.rotate(o.rot); g.scale((o.flip?-1:1)*(o.sx||1),o.sy||1);
    g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,-w/2,o.center?-h/2:-h,w,h); g.restore(); }
  function glow(x,y,r,a,c){ if(a<=0.01||r<=0) return; const gr=g.createRadialGradient(x,y,0,x,y,r); gr.addColorStop(0,`rgba(${c},${a})`); gr.addColorStop(0.45,`rgba(${c},${a*0.4})`); gr.addColorStop(1,`rgba(${c},0)`);
    g.fillStyle=gr; g.beginPath(); g.arc(x,y,r,0,Math.PI*2); g.fill(); }
  // viền sáng 1 phía: hình gốc trừ đi chính nó dịch lệch (dx,dy) → còn lại đúng mép phía ánh sáng chiếu tới
  function rimOf(src,dx,dy,col){ const c=mk(src.width,src.height), x=c.getContext('2d');
    x.drawImage(src,0,0); x.globalCompositeOperation='source-in'; x.fillStyle=col; x.fillRect(0,0,c.width,c.height);
    x.globalCompositeOperation='destination-out'; x.drawImage(src,dx,dy); return c; }

  // ───────────────────── 🎨 HANG ĐÁ (vẽ sẵn) ─────────────────────
  const BX0=-380, BX1=920, BY0=-720, BY1=1330, BS=1.6;
  const STX=270, PED=GROUND-70, SH=820;   // tượng: tâm x · mặt trên bệ · chiều cao
  const BRZ=[[-170,GY+40,1,9.8],[710,GY+40,1,9.8],[30,PED,0.75,10.3],[510,PED,0.75,10.3],[-205,190,0.8,10.8],[745,190,0.8,10.8],[-170,-160,0.7,11.3],[710,-160,0.7,11.3]];   // đuốc: x, y miệng chậu, cỡ, lúc bùng cháy
  function rockBlob(x,y,r,seed,c0,c1){
    const n=10, P=[]; for(let i=0;i<n;i++){ const a=i/n*Math.PI*2, rr=r*(0.7+0.45*h2(i,seed,3)); P.push([x+Math.cos(a)*rr, y+Math.sin(a)*rr*0.8]); }
    const path=()=>{ g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.closePath(); };
    const gr=g.createLinearGradient(x-r*0.6,y-r*0.7,x+r*0.5,y+r*0.8); gr.addColorStop(0,c1); gr.addColorStop(1,c0); g.fillStyle=gr; path(); g.fill();
    g.save(); path(); g.clip(); g.fillStyle='rgba(0,0,0,0.35)'; g.beginPath(); g.ellipse(x+r*0.35,y+r*0.45,r*0.9,r*0.55,0,0,Math.PI*2); g.fill(); g.restore(); }
  function paintCave(){
    const c=mk((BX1-BX0)*BS,(BY1-BY0)*BS), prev=g; g=c.getContext('2d'); g.setTransform(BS,0,0,BS,-BX0*BS,-BY0*BS);
    let gr=g.createLinearGradient(0,BY0,0,GROUND); gr.addColorStop(0,'#08070d'); gr.addColorStop(0.6,'#141120'); gr.addColorStop(1,'#1c1828'); g.fillStyle=gr; g.fillRect(BX0,BY0,BX1-BX0,GROUND-BY0+10);
    // vách hang sau lưng: lớp đá chồng lớp, xa nhạt, gần đậm
    for(let layer=0;layer<3;layer++){ const N=[90,70,46][layer], R0=[70,95,130][layer];
      const c0=['#14111c','#110e18','#0d0b13'][layer], c1=['#2c2738','#262133','#1f1b2a'][layer];
      for(let i=0;i<N;i++){ const x=BX0+h2(i,layer,1)*(BX1-BX0), y=BY0+80+h2(i,layer,2)*(GROUND-BY0-60), r=R0*(0.6+0.8*h2(i,layer,5));
        if(layer===2 && x>-170 && x<710) continue;   // lớp gần nhất chỉ ở 2 bên → giữa hang sâu hun hút
        rockBlob(x,y,r,i*7+layer,c0,c1); } }
    // sống đá dựng đứng (cột tự nhiên) làm hang có chiều sâu
    for(let i=0;i<14;i++){ const x=BX0+30+i*92+h2(i,9,1)*40, w=26+h2(i,9,2)*30; gr=g.createLinearGradient(x-w,0,x+w,0);
      gr.addColorStop(0,'rgba(0,0,0,0)'); gr.addColorStop(0.45,'rgba(60,52,78,0.18)'); gr.addColorStop(0.55,'rgba(0,0,0,0.25)'); gr.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=gr; g.fillRect(x-w,BY0,w*2,GROUND-BY0); }
    // vách 2 bên sát máy quay: khối đá to sẫm, mép trong có viền sáng mảnh
    for(const side of [-1,1]){ const xe=side<0?BX0:BX1;
      g.fillStyle='#0a0910'; g.beginPath(); g.moveTo(xe,BY0); for(let y=BY0;y<=GROUND+40;y+=40){ const x=(side<0?-250:790)+side*(-40+h2(y,side,4)*90)+Math.sin(y*0.004)*40*side; g.lineTo(x,y); } g.lineTo(xe,GROUND+40); g.closePath(); g.fill();
      g.strokeStyle='rgba(120,100,160,0.18)'; g.lineWidth=2; g.beginPath(); for(let y=BY0;y<=GROUND+40;y+=40){ const x=(side<0?-250:790)+side*(-40+h2(y,side,4)*90)+Math.sin(y*0.004)*40*side; y===BY0?g.moveTo(x,y):g.lineTo(x,y); } g.stroke(); }
    // trần hang: thạch nhũ rủ xuống
    g.fillStyle='#07060b'; g.fillRect(BX0,BY0,BX1-BX0,110);
    for(let i=0;i<70;i++){ const x=BX0+h2(i,11,1)*(BX1-BX0), L=60+h2(i,11,2)*300*(Math.abs(x-STX)<160?0.4:1), w=10+h2(i,11,3)*34, y0=BY0+90+h2(i,11,4)*40;
      gr=g.createLinearGradient(x-w,0,x+w,0); gr.addColorStop(0,'#0b0a10'); gr.addColorStop(0.4,'#2a2536'); gr.addColorStop(1,'#08070c'); g.fillStyle=gr;
      g.beginPath(); g.moveTo(x-w,y0); g.quadraticCurveTo(x-w*0.3,y0+L*0.6,x+(h2(i,11,6)-0.5)*8,y0+L); g.quadraticCurveTo(x+w*0.3,y0+L*0.6,x+w,y0); g.closePath(); g.fill(); }
    // lỗ thủng trên trần (ánh trăng lọt xuống đỉnh đầu tượng)
    glow(STX,BY0+70,120,0.35,'150,170,220'); g.fillStyle='#1d2436'; g.beginPath(); g.ellipse(STX,BY0+60,60,22,0,0,Math.PI*2); g.fill();
    // sàn đá
    gr=g.createLinearGradient(0,GROUND-30,0,BY1); gr.addColorStop(0,'#211c2c'); gr.addColorStop(0.25,'#17131f'); gr.addColorStop(1,'#09080d'); g.fillStyle=gr; g.fillRect(BX0,GROUND-30,BX1-BX0,BY1-GROUND+30);
    g.fillStyle='rgba(0,0,0,0.4)'; g.fillRect(BX0,GROUND-30,BX1-BX0,8);
    for(let i=0;i<26;i++){ const y=GROUND-10+Math.pow(i/26,1.6)*(BY1-GROUND); g.strokeStyle=`rgba(255,255,255,${0.025+0.02*h2(i,3,3)})`; g.lineWidth=1; g.beginPath(); g.moveTo(BX0,y); for(let x=BX0;x<=BX1;x+=60) g.lineTo(x,y+(h2(x,i,7)-0.5)*6); g.stroke(); }
    for(let i=0;i<120;i++){ const x=BX0+h2(i,21,1)*(BX1-BX0), y=GROUND+h2(i,21,2)*(BY1-GROUND), s=(0.4+0.6*(y-GROUND)/(BY1-GROUND))*(4+h2(i,21,3)*16);   // đá cuội rải rác, càng gần càng to
      g.fillStyle='rgba(0,0,0,0.35)'; g.beginPath(); g.ellipse(x+s*0.2,y+s*0.25,s,s*0.35,0,0,Math.PI*2); g.fill();
      g.fillStyle=['#2b2536','#251f30','#2f293b'][i%3]; g.beginPath(); g.ellipse(x,y,s,s*0.4,0,0,Math.PI*2); g.fill();
      g.fillStyle='rgba(200,190,230,0.06)'; g.beginPath(); g.ellipse(x-s*0.3,y-s*0.12,s*0.45,s*0.15,0,0,Math.PI*2); g.fill(); }
    // măng đá mọc từ sàn, sát 2 vách
    for(let i=0;i<16;i++){ const left=i<8, x=left?BX0+40+h2(i,31,1)*170:BX1-40-h2(i,31,1)*170, L=70+h2(i,31,2)*220, w=14+h2(i,31,3)*26, yb=GROUND+10+h2(i,31,4)*60;
      gr=g.createLinearGradient(x-w,0,x+w,0); gr.addColorStop(0,'#0c0a11'); gr.addColorStop(0.45,'#2d283a'); gr.addColorStop(1,'#09080d'); g.fillStyle=gr;
      g.beginPath(); g.moveTo(x-w,yb); g.quadraticCurveTo(x-w*0.25,yb-L*0.6,x,yb-L); g.quadraticCurveTo(x+w*0.25,yb-L*0.6,x+w,yb); g.closePath(); g.fill(); }
    // 🔯 bệ đá 3 tầng dưới chân tượng
    for(const [hw,y0,y1] of [[340,GROUND-22,GROUND+12],[285,GROUND-46,GROUND-22],[235,PED,GROUND-46]]){
      gr=g.createLinearGradient(0,y0,0,y1); gr.addColorStop(0,'#3d3749'); gr.addColorStop(0.18,'#2b2636'); gr.addColorStop(1,'#16131d'); g.fillStyle=gr; g.fillRect(STX-hw,y0,hw*2,y1-y0);
      g.fillStyle='rgba(220,210,255,0.10)'; g.fillRect(STX-hw,y0,hw*2,2);
      g.strokeStyle='rgba(0,0,0,0.35)'; g.lineWidth=1; for(let x=STX-hw+46;x<STX+hw;x+=46){ g.beginPath(); g.moveTo(x,y0+3); g.lineTo(x,y1); g.stroke(); }   // ghép khối đá
      g.fillStyle='rgba(0,0,0,0.4)'; g.fillRect(STX-hw-6,y1,hw*2+12,6); }
    // 🔯 vòng phong ấn khắc trên sàn trước bệ (nét khắc tối; lúc đuốc cháy có lớp phát sáng riêng vẽ đè)
    sealLines(g,'rgba(0,0,0,0.45)',3.2); sealLines(g,'rgba(150,130,190,0.12)',1.2);
    // chậu đuốc đá (lửa vẽ mỗi khung)
    for(const [x,y,s] of BRZ) brazier(x,y,s);
    g=prev; return c; }
  function sealLines(x,col,lw){ x.save(); x.strokeStyle=col; x.lineWidth=lw; const cx=STX, cy=GY+10, rx=330, ry=74;
    for(const k of [1,0.86,0.5]){ x.beginPath(); x.ellipse(cx,cy,rx*k,ry*k,0,0,Math.PI*2); x.stroke(); }
    for(let i=0;i<12;i++){ const a=i/12*Math.PI*2; x.beginPath(); x.moveTo(cx+Math.cos(a)*rx*0.5,cy+Math.sin(a)*ry*0.5); x.lineTo(cx+Math.cos(a)*rx*0.86,cy+Math.sin(a)*ry*0.86); x.stroke(); }   // nan hoa
    for(let i=0;i<9;i++){ const a=-Math.PI/2+i/9*Math.PI*2, b=a+4/9*Math.PI*2; x.beginPath(); x.moveTo(cx+Math.cos(a)*rx*0.5,cy+Math.sin(a)*ry*0.5); x.lineTo(cx+Math.cos(b)*rx*0.5,cy+Math.sin(b)*ry*0.5); x.stroke(); }   // ngôi sao 9 cánh (9 vĩ thú)
    for(let i=0;i<36;i++){ const a=i/36*Math.PI*2, r1=0.88, r2=0.97; x.beginPath(); x.moveTo(cx+Math.cos(a)*rx*r1,cy+Math.sin(a)*ry*r1); x.lineTo(cx+Math.cos(a+0.06)*rx*r2,cy+Math.sin(a+0.06)*ry*r2); x.stroke(); }   // ký tự vòng ngoài
    x.restore(); }
  function brazier(x,y,s){
    g.save(); g.translate(x,y); g.scale(s,s);
    let gr=g.createLinearGradient(-30,0,30,0); gr.addColorStop(0,'#15121c'); gr.addColorStop(0.4,'#3b3548'); gr.addColorStop(1,'#110f17');
    g.fillStyle='rgba(0,0,0,0.45)'; g.beginPath(); g.ellipse(0,74,40,9,0,0,Math.PI*2); g.fill();
    g.fillStyle=gr; g.beginPath(); g.moveTo(-14,72); g.lineTo(-9,14); g.lineTo(9,14); g.lineTo(14,72); g.closePath(); g.fill();   // chân
    g.fillRect(-22,66,44,8);
    g.beginPath(); g.moveTo(-34,0); g.quadraticCurveTo(-30,22,0,22); g.quadraticCurveTo(30,22,34,0); g.closePath(); g.fill();   // chậu
    g.fillStyle='#4a4358'; g.beginPath(); g.ellipse(0,0,34,7,0,0,Math.PI*2); g.fill(); g.fillStyle='#120f17'; g.beginPath(); g.ellipse(0,0,28,5,0,0,Math.PI*2); g.fill();
    g.restore(); }

  // ───────────────────── 🗿 TƯỢNG FRIEND (đá) · ✋ TAY BÓNG TỐI · 👤 HÌNH CHIẾU · 😿 PAIN ─────────────────────
  let BG=null, SEAL=null, ST=null, HAND=null, MEM=null, PAIN=null;
  function buildStatue(){
    const c=prep(IMG.friend), k=1.8, SW=SH*c.sw/c.sh, cw=Math.round(SW*k), ch=Math.round(SH*k), cvs=mk(cw,ch), x=cvs.getContext('2d');
    x.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,0,0,cw,ch);
    const id=x.getImageData(0,0,cw,ch), p=id.data;
    for(let yy=0;yy<ch;yy++){ const vy=yy/ch, top=1.12-0.42*vy;
      for(let xx=0;xx<cw;xx++){ const i=(yy*cw+xx)*4; if(p[i+3]<8) continue;
        const lum=(p[i]+p[i+1]+p[i+2])/765, n=0.55*vnoise(xx/90,yy/90,1)+0.3*vnoise(xx/22,yy/22,2)+0.15*vnoise(xx/6,yy/6,3);
        const strata=0.06*Math.sin(yy*0.045+n*5), streak=0.12*Math.max(0,vnoise(xx/14,yy/260,4)-0.55);   // vân đá + vệt nước chảy dọc
        const base=(0.62+0.5*n+strata-streak)*top*(lum>0.25?1.35+0.4*lum:1);   // mắt, răng = khối đá khắc nổi sáng hơn
        p[i]=clamp(70*base,0,255); p[i+1]=clamp(66*base,0,255); p[i+2]=clamp(80*base,0,255); } }
    x.putImageData(id,0,0);
    // đỉnh đầu (chỗ Pain đứng): điểm đặc cao nhất trong 10% giữa thân
    const top=[]; for(let xx=0;xx<cw;xx++){ let t=ch; for(let yy=0;yy<ch;yy++) if(p[(yy*cw+xx)*4+3]>120){ t=yy; break; } top.push(t); }
    let e1=0; top.forEach((v,i)=>{ if(v<top[e1]) e1=i; }); let e2=-1; top.forEach((v,i)=>{ if(Math.abs(i-e1)>cw*0.15 && Math.abs(i-e1)<cw*0.6 && (e2<0||v<top[e2])) e2=i; });   // 2 đỉnh tai
    const hx=Math.round((e1+e2)/2);   // giữa 2 tai = đỉnh đầu
    const X0=STX-SW/2, Y0=PED-SH;
    return { c:cvs, x:X0, y:Y0, w:SW, h:SH, k, headX:X0+hx/k, headY:Y0+top[hx]/k, rimL:rimOf(cvs,14,10,'rgb(190,140,255)'), rimR:rimOf(cvs,-14,10,'rgb(190,140,255)'), rimT:rimOf(cvs,0,16,'rgb(190,215,255)') };
  }
  const HH=520;   // bàn tay: cao (dựng đứng, ngón chĩa lên trời)
  function buildHand(){
    const c=prep(IMG.hand), k=2.2, hw=HH*c.sh/c.sw, cw=Math.round(hw*k), ch=Math.round(HH*k), cvs=mk(cw,ch), x=cvs.getContext('2d');
    x.translate(cw/2,ch/2); x.rotate(-Math.PI/2); x.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,-ch/2,-cw/2,ch,cw);
    // 2 đầu ngón cao nhất (2 thành viên đứng trên đó), cách nhau ≥ 1/3 bề ngang
    const d=x.getImageData(0,0,cw,ch).data, top=[]; for(let xx=0;xx<cw;xx++){ let t=ch; for(let yy=0;yy<ch;yy++) if(d[(yy*cw+xx)*4+3]>120){ t=yy; break; } top.push(t); }
    let a=0; top.forEach((v,i)=>{ if(v<top[a]) a=i; }); let b=-1; top.forEach((v,i)=>{ if(Math.abs(i-a)>cw/3 && (b<0||v<top[b])) b=i; });
    const tips=[[a,top[a]],[b,top[b]]].sort((p,q)=>p[0]-q[0]).map(([px,py])=>[px/k-hw/2, py/k-HH]);   // so với (tâm, đáy cổ tay)
    return { c:cvs, w:hw, k, tips, rimOut:rimOf(cvs,12,6,'rgb(180,130,255)'), rimIn:rimOf(cvs,-12,6,'rgb(180,130,255)') };
  }
  const HANDS=[{x:-88,flip:false},{x:628,flip:true}], HB=GROUND+10;   // tâm x 2 bàn tay · đáy cổ tay
  const MH=94;   // cỡ 1 thành viên (≈ 1 meme)
  function buildHolo(im){ const c=prep(im); if(!c) return null; const h=MH*3, w=h*c.sw/c.sh, pad=24, cvs=mk(w+pad*2,h+pad*2), x=cvs.getContext('2d');
    const m=mk(w,h), mx=m.getContext('2d'); mx.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,0,0,w,h); mx.globalCompositeOperation='source-in'; mx.fillStyle='#fff'; mx.fillRect(0,0,w,h);
    x.filter='blur(7px)'; x.globalAlpha=1; for(let i=0;i<3;i++) x.drawImage(m,pad,pad);   // quầng viền phát sáng
    x.filter='none'; x.globalCompositeOperation='source-in'; x.fillStyle='#c2adff'; x.fillRect(0,0,cvs.width,cvs.height);
    x.globalCompositeOperation='destination-out'; x.filter='blur(2px)'; x.drawImage(m,pad+4,pad+4,w-8,h-8); x.filter='none';
    x.globalCompositeOperation='source-over'; const inner=mk(w,h), ix=inner.getContext('2d'); ix.drawImage(m,0,0); ix.globalCompositeOperation='source-in';
    const gr=ix.createLinearGradient(0,0,0,h); gr.addColorStop(0,'rgba(95,70,170,0.6)'); gr.addColorStop(1,'rgba(40,25,90,0.45)'); ix.fillStyle=gr; ix.fillRect(0,0,w,h);
    ix.fillStyle='rgba(200,180,255,0.18)'; for(let y=0;y<h;y+=5) ix.fillRect(0,y,w,1.6);   // vạch quét ngang
    x.filter='blur(2.5px)'; x.drawImage(inner,pad,pad); x.filter='none';   // nhoè → không nhìn rõ mặt
    return { c:cvs, w:(w+pad*2)/3, h:(h+pad*2)/3, pad:pad/3 }; }
  function buildPain(){ const c=prep(IMG.pain), k=2.4, h=110, w=h*c.sw/c.sh, cw=Math.round(w*k), ch=Math.round(h*k), cvs=mk(cw,ch), x=cvs.getContext('2d');
    x.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,0,0,cw,ch);
    const id=x.getImageData(0,0,cw,ch), p=id.data;
    for(let i=0;i<p.length;i+=4){ if(p[i+3]<8) continue; const r=p[i],gg=p[i+1],b=p[i+2], red=r>110 && r>gg*1.9 && r>b*1.7;   // mây đỏ trên áo giữ lại mờ mờ, còn lại chìm vào bóng tối
      const f=red?0.42:0.05; p[i]=r*f; p[i+1]=gg*f; p[i+2]=b*f+(red?0:3); }
    x.putImageData(id,0,0);
    const EYES=[[297,275],[452,250]].map(([ex,ey])=>[(ex-c.sx)/c.sw*w-w/2,(ey-c.sy)/c.sh*h-h, 34/c.sw*w]);   // toạ độ mắt so với (tâm, chân)
    return { c:cvs, w, h, k, eyes:EYES, eyeSrc:c, rim:rimOf(cvs,0,10,'rgb(205,220,255)'), rimS:rimOf(cvs,8,4,'rgb(205,220,255)') };
  }
  function build(){ BG=paintCave(); ST=buildStatue(); HAND=buildHand(); MEM=IMG.mem.map(buildHolo); PAIN=buildPain();
    SEAL=mk(760*2,240*2); const sx=SEAL.getContext('2d'); sx.setTransform(2,0,0,2,-(STX-380)*2,-(GY+10-120)*2); sealLines(sx,'rgb(170,120,255)',2.2); }
  const sealDraw=a=>{ if(a<=0.01) return; g.save(); g.globalCompositeOperation='lighter'; g.globalAlpha=a; g.drawImage(SEAL,STX-380,GY+10-120,760,240); g.restore(); };
  // vị trí 4 thành viên (đầu 2 ngón cao nhất của mỗi tay) + Pain (đỉnh đầu tượng)
  const memPos=()=>{ const out=[]; for(const H of HANDS) for(const [tx,ty] of HAND.tips) out.push([H.x+(H.flip?-tx:tx), HB+ty+4]); return out; };

  // ───────────────────── 🌀 CỔNG BÓNG TỐI ─────────────────────
  const PX=STX, PY=690, PR=118;
  const portalR=t=>t<T.open?0:t<T.close?PR*eout(seg(t,T.open,T.opened))*(1+0.03*Math.sin(t*9)):PR*(1-ein(seg(t,T.close,T.closed)));
  function portal(t){ const R=portalR(t); if(R<=0.5) return; const open=seg(t,T.open,T.open+0.35), rx=R*Math.min(1,0.08+open), ry=R*1.06;
    g.save(); g.globalCompositeOperation='lighter';
    glow(PX,PY,R*3.4,0.5,'120,60,220'); glow(PX,PY,R*1.9,0.55,'170,110,255');
    for(let i=0;i<14;i++){ const a=i/14*Math.PI*2+t*0.25, L=R*(2.2+1.2*hash(i)), w=0.05+0.04*hash(i+3);   // tia sáng toả ra
      g.fillStyle=`rgba(180,140,255,${0.08+0.06*Math.sin(t*5+i)})`; g.beginPath(); g.moveTo(PX,PY); g.lineTo(PX+Math.cos(a-w)*L,PY+Math.sin(a-w)*L); g.lineTo(PX+Math.cos(a+w)*L,PY+Math.sin(a+w)*L); g.closePath(); g.fill(); }
    g.restore();
    g.save(); g.translate(PX,PY); g.scale(rx/R,ry/R);
    for(let k=0;k<26;k++){ const r0=R*(1.35-k*0.035), a0=t*(3.2+k*0.12)+k*0.9;   // xoáy tụ: cung tím quay dần vào tâm
      g.strokeStyle=k%2?`rgba(30,0,60,0.85)`:`rgba(150,90,255,${0.25+0.3*(1-k/26)})`; g.lineWidth=R*0.06;
      g.beginPath(); g.arc(0,0,r0,a0,a0+1.6+0.8*hash(k)); g.stroke(); }
    const core=g.createRadialGradient(0,0,0,0,0,R*0.95); core.addColorStop(0,'#000'); core.addColorStop(0.7,'#06000f'); core.addColorStop(0.92,'#2a0a55'); core.addColorStop(1,'rgba(60,20,120,0)');
    g.fillStyle=core; g.beginPath(); g.arc(0,0,R*0.95,0,Math.PI*2); g.fill();
    g.globalCompositeOperation='lighter'; g.lineWidth=R*0.05;   // viền răng cưa sáng rực
    for(const [col,dr] of [['rgba(190,150,255,0.9)',0],['rgba(255,255,255,0.7)',-0.02]]){ g.strokeStyle=col; g.beginPath();
      for(let i=0;i<=60;i++){ const a=i/60*Math.PI*2, rr=R*(0.95+dr+0.04*Math.sin(a*7+t*8)+0.03*Math.sin(a*13-t*11)); i?g.lineTo(Math.cos(a)*rr,Math.sin(a)*rr):g.moveTo(Math.cos(a)*rr,Math.sin(a)*rr); } g.closePath(); g.stroke(); }
    g.restore();
    // ⚡ điện tím lách tách quanh miệng cổng (đổi hình mỗi 0.06s)
    const sd=Math.floor(t/0.06); g.save(); g.globalCompositeOperation='lighter'; g.lineJoin='round';
    for(let k=0;k<4;k++){ if(hash(sd*7+k)<0.35) continue; const a0=hash(sd*3+k)*Math.PI*2; let x=PX+Math.cos(a0)*rx*0.95, y=PY+Math.sin(a0)*ry*0.95; const P=[[x,y]];
      for(let q=0;q<6;q++){ const a=a0+(hash(sd*11+k*5+q)-0.5)*1.4; x+=Math.cos(a)*R*0.16; y+=Math.sin(a)*R*0.16; P.push([x,y]); }
      for(const [lw,c] of [[6,'rgba(160,110,255,0.35)'],[2,'rgba(240,225,255,0.95)']]){ g.lineWidth=lw; g.strokeStyle=c; g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); } }
    // hạt bụi bị hút xoáy vào tâm
    for(let i=0;i<46;i++){ const ph=(t*0.7+hash(i))%1, a=hash(i+9)*Math.PI*2+ph*4, d=R*(2.6-2.2*ph);
      g.fillStyle=`rgba(210,180,255,${Math.sin(ph*Math.PI)*0.9})`; g.beginPath(); g.arc(PX+Math.cos(a)*d,PY+Math.sin(a)*d*0.9,1.2+1.4*hash(i+4),0,Math.PI*2); g.fill(); }
    g.restore();
    if(t>=T.close && t<T.closed+0.15){ const u=seg(t,T.closed-0.1,T.closed+0.15); if(u>0){ g.save(); g.globalCompositeOperation='lighter'; glow(PX,PY,PR*1.6*(1-u)+20,0.9*(1-u),'230,210,255'); g.restore(); } }   // đóng lại: loé 1 cái rồi tắt
  }

  // ───────────────────── 😼 EVIL GARY ─────────────────────
  const GH=62;
  function garyState(t){
    if(t<T.out) return null;
    if(t<T.land){ const u=seg(t,T.out,T.land); return { x:PX+Math.sin(u*2.2)*14, y:lerp(PY,GY-GH*0.4,ein(u)), rot:u*(Math.PI*4+Math.PI), sc:0.35+0.65*eout(seg(t,T.out,T.out+0.3)), center:true, fall:u }; }
    if(t<T.wake){ const u=seg(t,T.land,T.land+0.5), b=Math.sin(Math.PI*seg(t,T.land+0.05,T.land+0.38))*16, sq=1-0.3*Math.exp(-((t-T.land)/0.08));   // đập đất: bẹp → nảy nhẹ → nằm ngửa thở
      return { x:PX, y:GY-b, rot:Math.PI, sy:sq*(1+0.025*Math.sin(t*3.2)), sx:2-sq, flip:true, back:true }; }
    if(t<T.up){ const u=eio(seg(t,T.wake,T.up)); return { x:PX, y:GY-Math.sin(Math.PI*u)*22, rot:lerp(Math.PI,Math.PI*2,u), flip:true, back:u<0.5 }; }   // lăn người lật dậy
    const sh=seg(t,T.shake,T.shake+0.5), shake=sh>0&&sh<1?0.16*Math.sin(sh*Math.PI*9)*(1-sh):0;   // lắc đầu cho tỉnh
    const flip=t<T.lookL?true:t<T.lookR?false:true, turn=[T.lookL,T.lookR].some(ts=>t>=ts&&t<ts+0.12), up=eio(seg(t,T.lookUp,T.lookUp+0.5));
    return { x:PX, y:GY, rot:shake-up*0.2, flip, sx:turn?0.86:1 }; }
  function drawGary(t){ const s=garyState(t); if(!s) return; const c=prep(IMG.gary); if(!c) return;
    if(s.fall!=null){ g.save(); g.strokeStyle='rgba(220,200,255,0.5)'; g.lineCap='round';   // vạch tốc độ khi rơi
      for(let i=0;i<9;i++){ const lx=s.x+(hash(i)-0.5)*GH*1.6, L=30+hash(i+3)*70; g.globalAlpha=0.5*hash(i+5); g.lineWidth=1+hash(i+7)*2; g.beginPath(); g.moveTo(lx,s.y-GH*0.6-L); g.lineTo(lx,s.y-GH*0.6); g.stroke(); } g.restore(); }
    else { g.save(); g.globalAlpha=0.45; g.fillStyle='#000'; g.beginPath(); g.ellipse(s.x,GY+3,GH*0.75,GH*0.13,0,0,Math.PI*2); g.fill(); g.restore(); }
    if(s.center) actor(c,s.x,s.y,GH*s.sc,{center:true,rot:s.rot,flip:true});
    else { g.save(); g.translate(s.x,s.y-GH*0.42); g.rotate(s.rot||0); g.translate(0,GH*0.42); actor(c,0,0,GH,{flip:s.flip,sx:s.sx,sy:s.sy}); g.restore(); } }
  // 💨 bụi tung lên lúc đập đất (không nứt đất)
  function dust(t){ const u=(t-T.land)/1.6; if(u<0||u>1) return;
    for(let i=0;i<22;i++){ const a=(i/22)*Math.PI+(hash(i)-0.5)*0.3, sp=40+hash(i+3)*110, d=sp*eout(Math.min(1,u*1.6)), r=10+hash(i+5)*18+u*26;
      g.fillStyle=`rgba(120,105,140,${0.32*(1-u)})`; g.beginPath(); g.ellipse(PX+Math.cos(a)*d*1.6*(i%2?1:-1),GY-4-Math.sin(a)*d*0.35-u*14,r,r*0.6,0,0,Math.PI*2); g.fill(); }
    if(u<0.25){ g.strokeStyle=`rgba(200,180,240,${0.5*(1-u/0.25)})`; g.lineWidth=3; g.beginPath(); g.ellipse(PX,GY,40+u*600,8+u*90,0,0,Math.PI*2); g.stroke(); } }

  // ───────────────────── 🔥 ĐUỐC LỬA TÍM ─────────────────────
  const brzOn=(b,t)=>seg(t,b[3],b[3]+0.35);
  function flame(x,y,s,a,t,seed){ if(a<=0.01) return; g.save(); g.globalCompositeOperation='lighter';
    glow(x,y-20*s,90*s,0.45*a,'150,90,255');
    for(const [k,col] of [[1,`rgba(110,40,230,${0.55*a})`],[0.72,`rgba(170,110,255,${0.6*a})`],[0.42,`rgba(240,225,255,${0.75*a})`]]){ g.fillStyle=col;
      for(let i=0;i<5;i++){ const ox=(i-2)*7*s*k, h=(46+18*Math.sin(t*9+i*2.1+seed)*Math.sin(t*5.3+i))*s*k*(1-Math.abs(i-2)*0.16), w=9*s*k, sw=Math.sin(t*6+i+seed)*5*s;
        g.beginPath(); g.moveTo(x+ox-w,y); g.quadraticCurveTo(x+ox-w*0.4+sw*0.5,y-h*0.6,x+ox+sw,y-h); g.quadraticCurveTo(x+ox+w*0.4+sw*0.5,y-h*0.6,x+ox+w,y); g.closePath(); g.fill(); } }
    for(let i=0;i<6;i++){ const ph=(t*0.9+hash(i+seed))%1; g.fillStyle=`rgba(220,190,255,${(1-ph)*a})`;   // tàn lửa bay lên
      g.beginPath(); g.arc(x+Math.sin(t*2+i*1.7+seed)*14*s,y-20*s-ph*110*s,1.6*(1-ph)+0.5,0,Math.PI*2); g.fill(); }
    if(a<1){ g.fillStyle=`rgba(255,255,255,${(1-a)*0.8})`; g.beginPath(); g.arc(x,y-10*s,30*s*(1-a)+6,0,Math.PI*2); g.fill(); }   // phụt bùng lên
    g.restore(); }

  // ───────────────────── ⛓️ CÙM + XÍCH ─────────────────────
  function chain(x0,y0,x1,y1,sag){ const n=Math.max(4,Math.round(Math.hypot(x1-x0,y1-y0)/13));
    for(let i=0;i<n;i++){ const u=(i+0.5)/n, x=lerp(x0,x1,u), y=lerp(y0,y1,u)+sag*4*u*(1-u), dx=(x1-x0)/n, dy=(y1-y0)/n+sag*4*(1-2*u)/n, a=Math.atan2(dy,dx);
      g.save(); g.translate(x,y); g.rotate(a); g.lineWidth=4; g.strokeStyle=i%2?'#2a2833':'#4a4758'; g.beginPath(); g.ellipse(0,0,9,i%2?2.5:5.5,0,0,Math.PI*2); g.stroke();
      g.strokeStyle='rgba(220,210,255,0.18)'; g.lineWidth=1; g.beginPath(); g.ellipse(0,-1,8,i%2?1.5:4.5,0,Math.PI,Math.PI*2); g.stroke(); g.restore(); } }
  function cuffs(t,lit){ for(const H of HANDS){ const cx=H.x, cy=HB-HH*0.13, w=HAND.w*0.86, hgt=50, dir=H.flip?1:-1;
      chain(cx+dir*w*0.45,cy,dir<0?BX0+10:BX1-10,cy-220,90);   // xích lên vách hang
      chain(cx-dir*w*0.2,cy+hgt*0.4,cx-dir*w*0.2+dir*-150,GY+60,40);   // xích xuống mỏ neo dưới sàn
      g.fillStyle='#1e1c25'; g.beginPath(); g.ellipse(cx-dir*w*0.2+dir*-150,GY+62,22,7,0,0,Math.PI*2); g.fill(); g.strokeStyle='#45424f'; g.lineWidth=4; g.beginPath(); g.ellipse(cx-dir*w*0.2+dir*-150,GY+56,12,6,0,Math.PI,Math.PI*2); g.stroke();
      const gr=g.createLinearGradient(0,cy-hgt/2,0,cy+hgt/2); gr.addColorStop(0,'#5a5668'); gr.addColorStop(0.3,'#34313f'); gr.addColorStop(1,'#17151d');
      g.fillStyle=gr; g.beginPath(); g.roundRect(cx-w/2,cy-hgt/2,w,hgt,8); g.fill(); g.strokeStyle='#0d0c11'; g.lineWidth=2; g.stroke();
      g.fillStyle='rgba(230,220,255,0.16)'; g.fillRect(cx-w/2+4,cy-hgt/2+3,w-8,3);
      g.fillStyle='#6b6779'; for(let i=0;i<6;i++){ const rx=cx-w/2+10+i*(w-20)/5; for(const ry of [cy-hgt/2+9,cy+hgt/2-9]){ g.beginPath(); g.arc(rx,ry,2.6,0,Math.PI*2); g.fill(); } }   // đinh tán
      // 📜 bùa phong ấn treo dưới cùm
      for(const [ox,len] of [[-w*0.22,70],[w*0.2,58]]){ const sw=Math.sin(t*1.3+ox)*0.06; g.save(); g.translate(cx+ox,cy+hgt/2-2); g.rotate(sw);
        g.fillStyle='#d6cca8'; g.fillRect(-9,0,18,len); g.fillStyle='rgba(0,0,0,0.25)'; g.fillRect(5,0,4,len);
        g.strokeStyle='#9c1d1d'; g.lineWidth=1.6; g.beginPath(); for(let q=0;q<4;q++){ g.moveTo(-5,10+q*13); g.lineTo(5,13+q*13); g.moveTo(0,8+q*13); g.lineTo(0,18+q*13); } g.stroke(); g.restore(); }
      // 封 khắc giữa cùm — lúc đuốc cháy thì phát sáng tím
      g.save(); g.font='900 30px "Hiragino Mincho ProN","Yu Mincho","Noto Serif JP",serif'; g.textAlign='center'; g.textBaseline='middle';
      g.fillStyle='#0f0d14'; g.fillText('封',cx,cy+1);
      if(lit>0.01){ g.globalCompositeOperation='lighter'; g.shadowColor='#b388ff'; g.shadowBlur=18; g.fillStyle=`rgba(200,160,255,${0.9*lit*(0.8+0.2*Math.sin(t*3))})`; g.fillText('封',cx,cy+1); }
      g.restore(); } }

  // ───────────────────── 💡 ÁNH SÁNG ─────────────────────
  const Lv=t=>eio(seg(t,T.ignite,T.ignite+2.4));   // mức sáng chung của hang
  const flashK=t=>{ let L=0; for(const [ts,a] of [[T.flash,1],[T.flash+0.18,0.75],[T.flash+0.42,0.55]]){ const d=t-ts; if(d>=0) L+=a*Math.exp(-d/0.12); } return Math.min(1,L); };
  function lights(t){ const L=[], R=portalR(t);
    if(R>0) L.push([PX,PY,R*4.2,Math.min(1,R/PR)*0.95,'150,90,255']);
    if(t>=T.land){ const a=t<T.closed?seg(t,T.land,T.closed):1; L.push([PX,GY-30,190,0.55*a*(1-0.5*Lv(t)),'140,90,230']); }   // dư ảnh năng lượng cổng còn vương quanh Gary
    for(const b of BRZ){ const a=brzOn(b,t); if(a>0) L.push([b[0],b[1]-30*b[2],340*b[2],a*(0.85+0.15*Math.sin(t*11+b[0])),'160,100,255']); }
    const beam=t>=T.ignite?0.35*Lv(t):0, fl=flashK(t); if(beam+fl>0.01) L.push([ST.headX,ST.headY-60,260+200*fl,Math.min(1,beam+fl),'190,210,255']);
    return L; }
  function darkness(t,cx,cy,z,Ls){ const fl=flashK(t), a=clamp(lerp(0.965,0.62,Lv(t))-0.35*fl,0,1);
    dctx.setTransform(1,0,0,1,0,0); dctx.globalCompositeOperation='source-over'; dctx.clearRect(0,0,D.width,D.height);
    dctx.fillStyle=`rgba(3,2,8,${a})`; dctx.fillRect(0,0,D.width,D.height);
    dctx.setTransform(SC*z,0,0,SC*z,SC*(VW/2-cx*z),SC*(VH/2-cy*z)); dctx.globalCompositeOperation='destination-out';
    for(const [x,y,r,I] of Ls){ const gr=dctx.createRadialGradient(x,y,0,x,y,r); gr.addColorStop(0,`rgba(0,0,0,${I})`); gr.addColorStop(0.5,`rgba(0,0,0,${I*0.55})`); gr.addColorStop(1,'rgba(0,0,0,0)'); dctx.fillStyle=gr; dctx.beginPath(); dctx.arc(x,y,r,0,Math.PI*2); dctx.fill(); }
    g.save(); g.setTransform(1,0,0,1,0,0); g.drawImage(D,0,0); g.restore();
    g.save(); g.globalCompositeOperation='lighter'; for(const [x,y,r,I,c] of Ls) glow(x,y,r*0.8,0.14*I,c); g.restore(); }

  // ───────────────────── 👤 HÌNH CHIẾU 4 THÀNH VIÊN · 😿 PAIN ─────────────────────
  function holos(t){ const P=memPos();
    MEM.forEach((M,i)=>{ if(!M) return; const ts=T.holo+[0,0.5,0.25,0.75][i], u=seg(t,ts,ts+0.6); if(u<=0) return;
      const [x,y]=P[i], fl=(Math.floor(t*24+i*7)%17===0?0.45:1)*(0.82+0.12*Math.sin(t*7+i*2))*(u<1?(Math.floor(t*30)%2?1:0.55):1);
      const top=y-M.h+M.pad, wipe=lerp(y+M.pad,top,eout(u));   // hiện dần từ chân lên đầu, có vạch quét sáng
      g.save(); g.beginPath(); g.rect(x-M.w,wipe,M.w*2,y+M.pad-wipe+2); g.clip(); g.globalAlpha=fl; g.globalCompositeOperation='lighter';
      const sd=Math.floor(t*12+i*5), gl=hash(sd)<0.12?(hash(sd+1)-0.5)*8:0;   // giật nhiễu ngang thỉnh thoảng
      g.drawImage(M.c,x-M.w/2+gl,y-M.h+M.pad,M.w,M.h); g.restore();
      if(u<1){ g.save(); g.globalCompositeOperation='lighter'; g.fillStyle='rgba(200,180,255,0.8)'; g.fillRect(x-M.w*0.5,wipe-1,M.w,2.5); glow(x,wipe,M.w*0.6,0.3,'170,130,255'); g.restore(); }
      g.save(); g.globalCompositeOperation='lighter'; g.globalAlpha=0.5*fl*eout(u); const gr=g.createRadialGradient(x,y+2,0,x,y+2,M.w*0.55); gr.addColorStop(0,'rgba(170,130,255,0.6)'); gr.addColorStop(1,'rgba(170,130,255,0)');
      g.fillStyle=gr; g.beginPath(); g.ellipse(x,y+2,M.w*0.55,M.w*0.14,0,0,Math.PI*2); g.fill(); g.restore(); }); }   // vòng sáng dưới chân hình chiếu
  function drawPain(t){ const x=ST.headX, y=ST.headY+3, P=PAIN, w=P.w, h=P.h, fl=flashK(t), beam=t>=T.ignite?Lv(t):0;
    g.drawImage(P.c,x-w/2,y-h,w,h);
    g.save(); g.globalCompositeOperation='lighter'; g.globalAlpha=Math.min(1,0.12*beam+0.9*fl); g.drawImage(P.rim,x-w/2,y-h,w,h); g.globalAlpha=Math.min(1,0.08*beam+0.7*fl); g.drawImage(P.rimS,x-w/2,y-h,w,h); g.restore();
    const ea=eio(seg(t,T.eyes,T.eyes+0.9)); if(ea<=0) return;   // 👁️ Rinnegan sáng lên trong bóng tối
    const c=P.eyeSrc;
    for(const [ex,ey,er] of P.eyes){ const X=x+ex, Y=y+ey;
      g.save(); g.beginPath(); g.arc(X,Y,er*1.05,0,Math.PI*2); g.clip(); g.globalAlpha=ea; g.filter='brightness(1.6) saturate(1.3)';
      g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,x-w/2,y-h,w,h); g.filter='none'; g.restore();
      g.save(); g.globalCompositeOperation='lighter'; glow(X,Y,er*4.5,0.55*ea*(0.85+0.15*Math.sin(t*3)),'175,120,255'); glow(X,Y,er*1.6,0.5*ea,'230,210,255');
      g.strokeStyle=`rgba(225,205,255,${0.5*ea})`; g.lineWidth=0.8; g.beginPath(); g.moveTo(X-er*5,Y); g.lineTo(X+er*5,Y); g.stroke(); g.restore(); } }   // vệt loé ngang

  // ───────────────────── 🌫️ SƯƠNG · BỤI LƠ LỬNG · CỘT SÁNG TRẦN ─────────────────────
  function fog(t,a){ if(a<=0.01) return; for(let i=0;i<12;i++){ const x=BX0+((hash(i)*(BX1-BX0)+t*(10+hash(i+3)*14))%(BX1-BX0)), y=GROUND+10+hash(i+5)*160, r=160+hash(i+7)*140;
      g.fillStyle=`rgba(120,95,170,${0.05*a})`; g.beginPath(); g.ellipse(x,y,r,r*0.22,0,0,Math.PI*2); g.fill(); } }
  function motes(t,a){ if(a<=0.01) return; g.fillStyle='#d9ccff';
    for(let i=0;i<70;i++){ const x=BX0+150+hash(i)*(BX1-BX0-300)+Math.sin(t*0.4+i)*12, y=BY0+300+((hash(i+50)*1500-t*(6+hash(i+9)*8))%1500+1500)%1500;
      g.globalAlpha=a*(0.15+0.35*hash(i+20))*(0.6+0.4*Math.sin(t*1.5+i)); g.beginPath(); g.arc(x,y,0.8+hash(i+30)*1.3,0,Math.PI*2); g.fill(); } g.globalAlpha=1; }
  function beam(t){ const a=(t>=T.ignite?0.12*Lv(t):0)+0.55*flashK(t); if(a<=0.01) return; const y1=ST.headY+10;
    g.save(); g.globalCompositeOperation='lighter'; const gr=g.createLinearGradient(0,BY0+60,0,y1); gr.addColorStop(0,`rgba(190,210,255,${a})`); gr.addColorStop(1,`rgba(190,210,255,${a*0.25})`);
    g.fillStyle=gr; g.beginPath(); g.moveTo(STX-52,BY0+60); g.lineTo(STX+52,BY0+60); g.lineTo(ST.headX+120,y1); g.lineTo(ST.headX-120,y1); g.closePath(); g.fill(); g.restore(); }

  // ───────────────────── 🎥 MÁY QUAY ─────────────────────
  const CAMK=[[0,PX,PY+30,1.5],[T.out,PX,PY+40,1.42],[T.land,PX,GY-120,1.9],[T.closed,PX,GY-80,2.1],[T.wake,PX,GY-60,2.75],[T.lookUp,PX,GY-60,2.55],
    [T.wide,STX,400,0.55],[T.push,STX,390,0.58],[T.flash,STX,null,1.7],[T.fade,STX,null,3.1],[DUR,STX,null,3.2]];
  function cam(t){ const head=ST.headY-PAIN.h*0.62, K=CAMK.map(k=>[k[0],k[2]==null?ST.headX:k[1],k[2]==null?(k[3]>2?head:head+40):k[2],k[3]]);
    let r=K[K.length-1].slice(1);
    for(let i=1;i<K.length;i++) if(t<K[i][0]){ const a=K[i-1], b=K[i], e=eio(seg(t,a[0],b[0])); r=[lerp(a[1],b[1],e),lerp(a[2],b[2],e),Math.exp(lerp(Math.log(a[3]),Math.log(b[3]),e))]; break; }
    const sh=Math.exp(-Math.max(0,t-T.land)/0.12)*(t>=T.land?12:0)+(t>=T.flash?3*flashK(t):0);   // rung khi đập đất / sét
    if(sh>0.2){ r[0]+=(hash(Math.floor(t*60))-0.5)*sh/r[2]; r[1]+=(hash(Math.floor(t*60)+7)-0.5)*sh/r[2]; }
    return r; }

  function frame(now){
    raf=requestAnimationFrame(frame);
    if(!ready) return;
    const t=paused?pauseT:(now-t0)/1000;
    if(t>=T.open) sfx('portal','blackhole',0.9,3.6);
    if(t>=T.out) sfx('drop','cine_drop',0.9);
    if(t>=T.land) sfx('land','cine_impact',1.0);
    if(t>=T.shake) sfx('meow','gp_meow',0.9);
    if(t>=T.ignite) sfx('reveal','hm_stalker',0.9);
    if(t>=T.music && t<DUR) sfx('aka','dp_akatsuki',0.95,Math.max(0.1,DUR-Math.max(t,T.music)));
    if(t>=T.flash) sfx('thunder','thunder_big',0.9);
    if(t>=T.eyes) sfx('eyes','ultimate_charge_2',0.7);
    const [cx,cy,z]=cam(t);
    w2.setTransform(1,0,0,1,0,0); w2.fillStyle='#000'; w2.fillRect(0,0,W2.width,W2.height);
    w2.setTransform(SC*z,0,0,SC*z,SC*(VW/2-cx*z),SC*(VH/2-cy*z)); g=w2;
    g.drawImage(BG,BX0,BY0,BX1-BX0,BY1-BY0);
    beam(t);
    g.drawImage(ST.c,ST.x,ST.y,ST.w,ST.h);
    const lit=Lv(t); g.save(); g.globalCompositeOperation='lighter';
    g.globalAlpha=0.55*Math.max(brzOn(BRZ[4],t),brzOn(BRZ[2],t)); g.drawImage(ST.rimL,ST.x,ST.y,ST.w,ST.h);
    g.globalAlpha=0.55*Math.max(brzOn(BRZ[5],t),brzOn(BRZ[3],t)); g.drawImage(ST.rimR,ST.x,ST.y,ST.w,ST.h);
    g.globalAlpha=Math.min(1,0.35*lit+1.2*flashK(t)); g.drawImage(ST.rimT,ST.x,ST.y,ST.w,ST.h); g.restore();
    for(const H of HANDS){ g.save(); g.translate(H.x,HB); if(H.flip) g.scale(-1,1); g.drawImage(HAND.c,-HAND.w/2,-HH,HAND.w,HH);
      g.globalCompositeOperation='lighter'; g.globalAlpha=0.6*lit; g.drawImage(HAND.rimOut,-HAND.w/2,-HH,HAND.w,HH); g.globalAlpha=0.35*lit; g.drawImage(HAND.rimIn,-HAND.w/2,-HH,HAND.w,HH); g.restore();
      if(lit>0.01){ g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<5;i++){ const ph=(t*0.35+hash(i+H.x))%1;   // khói bóng tối bốc lên từ tay
        g.fillStyle=`rgba(90,50,150,${0.12*lit*Math.sin(ph*Math.PI)})`; g.beginPath(); g.ellipse(H.x+(hash(i+H.x*2)-0.5)*HAND.w,HB-HH*0.3-ph*HH*0.8,30+ph*30,40+ph*40,0,0,Math.PI*2); g.fill(); } g.restore(); } }
    cuffs(t,lit);
    drawGary(t); dust(t);
    darkness(t,cx,cy,z,lights(t));
    sealDraw(0.55*lit*(0.85+0.15*Math.sin(t*2)));
    for(const b of BRZ) flame(b[0],b[1],b[2],brzOn(b,t),t,b[0]*0.01);
    portal(t);
    holos(t); drawPain(t);
    fog(t,0.4+0.6*lit); motes(t,0.25+0.75*lit);
    g=cv.getContext('2d'); g.setTransform(1,0,0,1,0,0); g.drawImage(W2,0,0); g.setTransform(SC,0,0,SC,0,0);
    { const vg=g.createRadialGradient(VW/2,VH/2,VH*0.25,VW/2,VH/2,VH*0.75); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(0,0,0,0.55)'); g.fillStyle=vg; g.fillRect(0,0,VW,VH); }   // tối 4 góc
    if(t>=T.land && t<T.land+0.12){ g.fillStyle=`rgba(255,255,255,${0.35*(1-(t-T.land)/0.12)})`; g.fillRect(0,0,VW,VH); }
    if(t<0.6){ g.fillStyle=`rgba(0,0,0,${1-t/0.6})`; g.fillRect(0,0,VW,VH); }
    if(t>T.fade){ g.fillStyle=`rgba(0,0,0,${seg(t,T.fade,DUR)})`; g.fillRect(0,0,VW,VH); }
    markOnly=false;
    if(panel) panel.update();
  }
  const curT=()=>paused?pauseT:(performance.now()-t0)/1000;
  function seek(sec){ sec=clamp(sec,0,DUR); try{ stopAllLongSfx(); }catch(e){} played={}; markOnly=true; if(paused) pauseT=sec; else t0=performance.now()-sec*1000; }
  function toggle(){ if(paused){ if(pauseT>=DUR-0.05) pauseT=0; t0=performance.now()-pauseT*1000; paused=false; } else { pauseT=curT(); paused=true; } }
  function stop(){ if(raf) cancelAnimationFrame(raf); raf=null; try{ stopAllLongSfx(); }catch(e){} if(window._cinePanelRemove) _cinePanelRemove(); panel=null; if(overlay) overlay.remove(); overlay=null; }
  window._cineL2E2=function(){
    if(overlay) return;
    overlay=document.createElement('div');
    overlay.style.cssText='position:fixed;inset:0;z-index:99999;background:#000;display:flex;align-items:center;justify-content:center;';
    cv=document.createElement('canvas'); cv.width=1080; cv.height=1920; SC=cv.width/VW;
    cv.style.cssText='height:100vh;max-width:100vw;aspect-ratio:9/16;object-fit:contain;';
    W2=mk(cv.width,cv.height); w2=W2.getContext('2d'); D=mk(cv.width,cv.height); dctx=D.getContext('2d');
    overlay.appendChild(cv); document.body.appendChild(overlay);
    { const x=cv.getContext('2d'); x.fillStyle='#000'; x.fillRect(0,0,cv.width,cv.height); x.fillStyle='rgba(255,255,255,0.5)'; x.font='40px system-ui'; x.textAlign='center'; x.fillText('Loading…',cv.width/2,cv.height/2); }
    if(window._cinePanelMake) panel=_cinePanelMake(overlay,{ title:'Meme Lore 2 · Ep 2 · Into the Dark', dur:()=>DUR, t:()=>ready?Math.min(curT(),DUR):0, playing:()=>ready && !paused && curT()<DUR,
      toggle:()=>{ if(!ready) return; if(!paused && curT()>=DUR) seek(0); else toggle(); }, seek:s=>{ if(ready) seek(s); }, replay:()=>{ if(!ready) return; paused=false; seek(0); markOnly=false; }, close:()=>{ stop(); if(window.openCinema) openCinema('__lore2'); } });
    try{ stopAllBattleMusic(); }catch(e){}
    const all=[IMG.gary,IMG.friend,IMG.hand,IMG.pain,...IMG.mem];
    Promise.all(all.map(im=>im.decode?im.decode().catch(()=>{}):Promise.resolve())).then(()=>{ if(!overlay) return;
      if(!ready){ build(); ready=true; } paused=false; played={}; t0=performance.now(); });
    ready=!!BG; paused=false; played={}; t0=performance.now(); raf=requestAnimationFrame(frame);
  };
  window._cineL2E2Stop=stop;
  window._cineL2E2Seek=t=>{ t0=performance.now()-t*1000; played={}; markOnly=true; };
  window._cineL2E2Canvas=()=>cv;
})();
