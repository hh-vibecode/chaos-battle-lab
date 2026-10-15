// ===================== 🎬 PHIM NGẮN "DEPRESSED CAT COMES HOME" =====================
// Đêm, Depressed Cat ôm bó hoa đi bộ dọc phố về nhà → ngước lên cửa sổ tầng 2 sáng đèn: in bóng VỢ nó (cô mèo trắng
// trong giấc mơ của Snooze Cat) chụm đầu bên CHILL GUY → nó đứng khóc meow meow (GIF kêu than + tiếng) → VỨT bó hoa,
// quay lưng bỏ đi → khung hình DỪNG LẠI, ngả xám; sau lưng nó trời nổi sét, 2 con mắt RINNEGAN khổng lồ hiện trên nền
// trời + chữ mực "This world / shall know / pain." · Mosquito Violin đứng dưới nhà diễn rong, kéo bài buồn đúng lúc nó nhìn thấy.
// Chạy trên lớp phủ riêng (canvas 1080×1920, khung dọc Shorts) giống phim Memes Assemble; mở từ Meme Cinema.
// Nền tĩnh (trời, phố, nhà, cây, hàng rào...) vẽ SẴN 1 lần ra ảnh phụ độ phân giải cao; phần động vẽ mỗi khung.
(function(){
  if(window._cineDW) return;
  const VW=540, VH=960, GROUND=800, DUR=14.4;
  const A=p=>{ const im=new Image(); im.src=p; return im; };
  const IMG={ dp:Object.assign(A('assets/avatars/depressedcat/avatarUrl.webp'),{_feather:0.12}), wife:A('assets/img/misc/CAT_DREAM_IMG.webp'), chill:A('assets/img/chillguy/CHILLGUY_AVATAR_IMG.webp'),
    mq:['avatarUrl','attackAvatarUrl','skill1AvatarUrl','skill2AvatarUrl','skill3AvatarUrl'].map(n=>A('assets/avatars/mosquitoviolin/'+n+'.webp')) };
  const T={ walkEnd:4.1, win:4.2, winEnd:5.7, cry:5.8, cryEnd:8.85, throw:9.0, turn:9.5, freeze:10.9, eyes:11.2, l1:11.9, l2:12.4, l3:12.9 };
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)), seg=(t,a,b)=>clamp((t-a)/(b-a),0,1), eio=x=>x*x*(3-2*x), lerp=(a,b,k)=>a+(b-a)*k;
  let cv, g, W2, w2, SC, raf=null, t0=0, paused=false, pauseT=0, played={}, markOnly=false, panel=null, overlay=null, BG=null;
  const sfx=(id,k,v,dur)=>{ if(played[id]) return; played[id]=1; if(markOnly) return; try{ playSample(k,v==null?1:v,dur||null); }catch(e){} };
  const hash=n=>{ const s=Math.sin(n*127.1+311.7)*43758.5453; return s-Math.floor(s); };
  // ảnh cắt sát nội dung (bỏ viền trong suốt); _feather: làm mờ mép dưới bị cắt thẳng
  const prep=(im,crop)=>{ const key=crop?'_cpc':'_cp'; if(im[key]) return im[key]; if(!im.complete || !im.naturalWidth) return null;   // ảnh chưa giải mã xong → chưa cắt (không lưu bản trống)
    let sx=0,sy=0,sw=im.naturalWidth,sh=im.naturalHeight; if(crop){ [sx,sy,sw,sh]=crop; }
    try{ const c=document.createElement('canvas'); c.width=sw; c.height=sh; const x=c.getContext('2d'); x.drawImage(im,sx,sy,sw,sh,0,0,sw,sh);
      const d=x.getImageData(0,0,sw,sh).data; let x0=sw,y0=sh,x1=0,y1=0;
      for(let yy=0;yy<sh;yy+=2) for(let xx=0;xx<sw;xx+=2) if(d[(yy*sw+xx)*4+3]>40){ if(xx<x0)x0=xx; if(xx>x1)x1=xx; if(yy<y0)y0=yy; if(yy>y1)y1=yy; }
      if(x1<x0) return null;   // chưa có điểm ảnh nào (đang giải mã) → lần sau thử lại
      if(im._feather){ const id=x.getImageData(0,0,sw,sh), px=id.data, F=Math.round((y1-y0)*im._feather);
        for(let yy=y1-F;yy<=y1;yy++){ const k=(y1-yy)/F; for(let xx=x0;xx<=x1;xx++){ const i=(yy*sw+xx)*4+3; px[i]=px[i]*k; } } x.putImageData(id,0,0); }
      im[key]={src:c, sx:x0, sy:y0, sw:x1-x0+1, sh:y1-y0+1}; }catch(e){ im[key]={src:im,sx,sy,sw,sh}; }
    return im[key]; };
  const silhouette=(im,crop)=>{ const key=crop?'_silc':'_sil'; if(im[key]) return im[key]; const c=prep(im,crop); if(!c) return null;
    const s=document.createElement('canvas'); s.width=c.sw; s.height=c.sh; const x=s.getContext('2d');
    x.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,0,0,c.sw,c.sh); x.globalCompositeOperation='source-in'; x.fillStyle='#24140a'; x.fillRect(0,0,c.sw,c.sh);
    return im[key]={src:s,sx:0,sy:0,sw:c.sw,sh:c.sh}; };
  function actor(c,x,y,h,o){ o=o||{}; if(!c) return; const w=h*c.sw/c.sh;
    g.save(); g.globalAlpha*=(o.a==null?1:o.a); g.translate(x,y); if(o.rot) g.rotate(o.rot); g.scale((o.flip?-1:1)*(o.sx||1),o.sy||1);
    g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,-w/2,-h,w,h); g.restore(); }
  function glow(x,y,r,a,c){ if(a<=0.01||r<=0) return; const gr=g.createRadialGradient(x,y,0,x,y,r); gr.addColorStop(0,`rgba(${c},${a})`); gr.addColorStop(0.5,`rgba(${c},${a*0.4})`); gr.addColorStop(1,`rgba(${c},0)`);
    g.fillStyle=gr; g.beginPath(); g.arc(x,y,r,0,Math.PI*2); g.fill(); }

  // ───────────────────── 🎨 NỀN VẼ SẴN ─────────────────────
  const BX0=-900, BX1=660, BY0=-140, BY1=VH+40, BS=2.2;   // vùng thế giới + độ phân giải ảnh nền
  const HX=250, HY=GROUND-38, HW=270, WIN={x:HX+112, y:HY-420, w:146, h:122};
  const LAMPS=[-640,-330,40];
  function house(x0,w,h,o){   // nhà gỗ ốp ván: tường, ván ngang, mái lợp ngói, ống khói, cửa sổ có khung, cửa ra vào, bụi cây
    const yb=GROUND-38, yt=yb-h;
    g.fillStyle=o.wall; g.fillRect(x0,yt,w,h);
    g.strokeStyle='rgba(0,0,0,0.22)'; g.lineWidth=1; for(let y=yt+9;y<yb;y+=9){ g.beginPath(); g.moveTo(x0,y); g.lineTo(x0+w,y); g.stroke(); }   // ván ốp
    g.strokeStyle='rgba(255,255,255,0.05)'; for(let y=yt+10;y<yb;y+=9){ g.beginPath(); g.moveTo(x0,y); g.lineTo(x0+w,y); g.stroke(); }
    g.fillStyle='rgba(255,255,255,0.06)'; g.fillRect(x0,yt,5,h); g.fillRect(x0+w-5,yt,5,h);   // nẹp góc
    if(o.chim){ g.fillStyle='#1b1a26'; g.fillRect(x0+w*0.72,yt-o.roof-10,22,o.roof*0.8); g.fillStyle='#2a2836'; g.fillRect(x0+w*0.72-3,yt-o.roof-14,28,6); }
    g.fillStyle=o.roofC; g.beginPath(); g.moveTo(x0-16,yt+2); g.lineTo(x0+w/2,yt-o.roof); g.lineTo(x0+w+16,yt+2); g.closePath(); g.fill();   // mái
    g.save(); g.clip(); g.strokeStyle='rgba(0,0,0,0.3)'; g.lineWidth=1.2;
    for(let y=yt-o.roof;y<yt+4;y+=8){ g.beginPath(); g.moveTo(x0-20,y); g.lineTo(x0+w+20,y); g.stroke();
      for(let x=x0-20+((y/8)%2)*7;x<x0+w+20;x+=14){ g.beginPath(); g.moveTo(x,y); g.lineTo(x,y+8); g.stroke(); } }   // hàng ngói
    g.restore();
    g.fillStyle='rgba(0,0,0,0.35)'; g.fillRect(x0-16,yt+2,w+32,5);
    for(const [wx,wy,ww,wh,lit] of o.wins) win(x0+wx,yt+wy,ww,wh,lit);
    if(o.door){ const dx=x0+o.door, dy=yb-150; g.fillStyle='#3a2a20'; g.fillRect(dx-4,dy-4,64,154); g.fillStyle='#2a1c14'; g.fillRect(dx,dy,56,150);
      g.strokeStyle='rgba(0,0,0,0.45)'; g.strokeRect(dx+8,dy+10,40,55); g.strokeRect(dx+8,dy+78,40,60); g.fillStyle='#c9a24a'; g.beginPath(); g.arc(dx+46,dy+80,3,0,Math.PI*2); g.fill();
      g.fillStyle='#3b3c4a'; g.fillRect(dx-12,yb-6,80,8); }
    for(let i=0;i<Math.floor(w/34);i++){ const bx=x0+12+i*34+hash(x0+i)*8, r=14+hash(x0*3+i)*8;   // bụi cây sát chân tường
      g.fillStyle='#14281f'; g.beginPath(); g.arc(bx,yb-4,r,Math.PI,0); g.fill(); g.fillStyle='rgba(80,140,100,0.18)'; g.beginPath(); g.arc(bx-4,yb-r*0.6,r*0.45,0,Math.PI*2); g.fill(); }
  }
  function win(x,y,w,h,lit){   // cửa sổ: khung sáng, kính tối / sáng đèn có rèm, bậu cửa
    g.fillStyle='#d9d3c4'; g.fillRect(x-5,y-5,w+10,h+10);
    if(lit){ const gr=g.createLinearGradient(0,y,0,y+h); gr.addColorStop(0,'#ffdca0'); gr.addColorStop(1,'#eaa452'); g.fillStyle=gr; g.fillRect(x,y,w,h);
      g.fillStyle='rgba(180,70,60,0.55)'; g.fillRect(x,y,w*0.22,h); g.fillRect(x+w*0.78,y,w*0.22,h); }
    else { const gr=g.createLinearGradient(x,y,x+w,y+h); gr.addColorStop(0,'#2b3456'); gr.addColorStop(1,'#151a30'); g.fillStyle=gr; g.fillRect(x,y,w,h);
      g.fillStyle='rgba(255,255,255,0.07)'; g.beginPath(); g.moveTo(x+w*0.15,y); g.lineTo(x+w*0.45,y); g.lineTo(x+w*0.1,y+h*0.6); g.lineTo(x,y+h*0.6); g.closePath(); g.fill(); }
    g.strokeStyle='#d9d3c4'; g.lineWidth=3; g.beginPath(); g.moveTo(x+w/2,y); g.lineTo(x+w/2,y+h); g.moveTo(x,y+h/2); g.lineTo(x+w,y+h/2); g.stroke();
    g.fillStyle='#bfb8a8'; g.fillRect(x-9,y+h+5,w+18,6); }
  function tree(x,s){   // cây tán tròn nhiều lớp, ánh trăng viền nhẹ
    const yb=GROUND-38; g.fillStyle='#1a1410'; g.fillRect(x-6*s,yb-110*s,12*s,110*s);
    for(const [dx,dy,r,c] of [[0,-150,62,'#0f1f1a'],[-40,-120,48,'#10231c'],[42,-118,50,'#0e1d18'],[-14,-190,46,'#132820'],[26,-170,44,'#11241d']]){
      g.fillStyle=c; g.beginPath(); g.arc(x+dx*s,yb+dy*s,r*s,0,Math.PI*2); g.fill(); }
    g.fillStyle='rgba(150,170,220,0.10)'; for(const [dx,dy,r] of [[-20,-205,24],[30,-185,20],[-50,-140,18]]){ g.beginPath(); g.arc(x+dx*s,yb+dy*s,r*s,0,Math.PI*2); g.fill(); } }
  function fence(x0,x1){ const yb=GROUND-34; g.fillStyle='#cfc9bb';
    for(let x=x0;x<x1;x+=14){ g.beginPath(); g.moveTo(x,yb); g.lineTo(x,yb-40); g.lineTo(x+5,yb-47); g.lineTo(x+10,yb-40); g.lineTo(x+10,yb); g.closePath(); g.fill(); }
    g.fillRect(x0,yb-32,x1-x0,5); g.fillRect(x0,yb-14,x1-x0,5); g.fillStyle='rgba(0,0,0,0.25)'; for(let x=x0;x<x1;x+=14) g.fillRect(x+7,yb-40,3,40); }
  function buildBG(){
    const c=document.createElement('canvas'); c.width=Math.round((BX1-BX0)*BS); c.height=Math.round((BY1-BY0)*BS);
    const prev=g; g=c.getContext('2d'); g.setTransform(BS,0,0,BS,-BX0*BS,-BY0*BS);
    let gr=g.createLinearGradient(0,BY0,0,GROUND); gr.addColorStop(0,'#050817'); gr.addColorStop(0.55,'#121637'); gr.addColorStop(1,'#2d2752');
    g.fillStyle=gr; g.fillRect(BX0,BY0,BX1-BX0,BY1-BY0);
    for(let i=0;i<260;i++){ const x=BX0+hash(i)*(BX1-BX0), y=BY0+hash(i+500)*560, r=0.4+hash(i+900)*1.1; g.fillStyle=`rgba(255,255,255,${0.25+hash(i+77)*0.6})`; g.beginPath(); g.arc(x,y,r,0,Math.PI*2); g.fill(); }
    for(let i=0;i<9;i++){ const x=BX0+hash(i+40)*(BX1-BX0), y=40+hash(i+60)*300; g.fillStyle='rgba(120,130,190,0.06)'; for(let k=0;k<5;k++){ g.beginPath(); g.ellipse(x+k*40,y+hash(i*7+k)*12,70,18,0,0,Math.PI*2); g.fill(); } }   // mây mỏng
    glow(80,110,120,0.3,'190,200,255'); g.fillStyle='#eef0ff'; g.beginPath(); g.arc(80,110,34,0,Math.PI*2); g.fill();   // 🌕 trăng + miệng hố
    g.fillStyle='rgba(150,155,190,0.35)'; for(const [dx,dy,r] of [[-10,-8,7],[9,6,5],[-4,12,4],[12,-12,3]]){ g.beginPath(); g.arc(80+dx,110+dy,r,0,Math.PI*2); g.fill(); }
    // phố xa: dãy nhà cao tầng mờ + đèn cửa sổ lấm tấm
    for(let x=BX0;x<BX1;x+=46){ const h=120+hash(x)*170; g.fillStyle='#0d1027'; g.fillRect(x,GROUND-60-h,40,h+20);
      for(let yy=GROUND-50-h;yy<GROUND-70;yy+=14) for(let xx=x+5;xx<x+36;xx+=9) if(hash(xx*3.1+yy)<0.18){ g.fillStyle='rgba(255,210,130,0.55)'; g.fillRect(xx,yy,4,6); } }
    g.fillStyle='#0b0e21'; for(let x=BX0;x<BX1;x+=30){ g.beginPath(); g.arc(x,GROUND-60,26+hash(x+3)*14,Math.PI,0); g.fill(); }
    // dãy nhà hàng xóm dọc phố
    tree(-850,1.1);
    house(-800,190,300,{wall:'#2b3150',roofC:'#1a1d33',roof:70,chim:true,door:20,wins:[[100,40,56,66,1],[100,170,56,66,0]]});
    fence(-600,-560); tree(-520,0.95);
    house(-560+80,170,360,{wall:'#33304a',roofC:'#211d32',roof:64,door:96,wins:[[22,40,52,62,0],[100,40,52,62,1],[22,170,52,62,0]]});
    house(-270,200,290,{wall:'#283a4a',roofC:'#18232f',roof:78,chim:true,door:24,wins:[[110,40,60,66,0],[110,165,60,66,1]]});
    fence(-62,-10); tree(-30,1.15);
    // 🏠 NHÀ MÌNH (2 tầng, cửa sổ tầng 2 vẽ riêng mỗi khung)
    house(HX,HW,470,{wall:'#3a3552',roofC:'#231f36',roof:120,chim:true,door:26,wins:[[22,58,74,96,0],[150,330,90,82,0]]});
    g.fillStyle='#bfb8a8'; g.fillRect(HX,HY-250,HW,7);   // gờ giữa 2 tầng
    { const bx=WIN.x-9, by=WIN.y+WIN.h+11; g.fillStyle='#5a3a24'; g.fillRect(bx,by,WIN.w+18,14);   // bồn hoa dưới cửa sổ
      for(let i=0;i<9;i++){ g.fillStyle=['#e53950','#ffd54f','#ff7aa8'][i%3]; g.beginPath(); g.arc(bx+8+i*14,by-2+hash(i)*4,4,0,Math.PI*2); g.fill(); } }
    glow(HX+56,HY-190,30,0.6,'255,210,140'); g.fillStyle='#ffe0a0'; g.fillRect(HX+52,HY-196,8,10);   // đèn hiên
    fence(HX+100,HX+HW+40); fence(BX0,BX0+90);
    g.fillStyle='#3d4a6a'; g.fillRect(HX+92,GROUND-100,6,62); g.fillStyle='#2a6f9a'; g.fillRect(HX+80,GROUND-118,30,22); g.fillStyle='#d23b3b'; g.fillRect(HX+106,GROUND-118,4,12);   // hòm thư
    // vỉa hè + lề + đường
    g.fillStyle='#262a3c'; g.fillRect(BX0,GROUND-38,BX1-BX0,58);
    g.strokeStyle='rgba(0,0,0,0.35)'; g.lineWidth=1; for(let x=BX0;x<BX1;x+=48){ g.beginPath(); g.moveTo(x,GROUND-38); g.lineTo(x-10,GROUND+20); g.stroke(); }
    g.beginPath(); g.moveTo(BX0,GROUND-10); g.lineTo(BX1,GROUND-10); g.stroke();
    g.fillStyle='#3a3f55'; g.fillRect(BX0,GROUND+20,BX1-BX0,8);   // lề đường
    g.fillStyle='#14161f'; g.fillRect(BX0,GROUND+28,BX1-BX0,BY1-GROUND);
    g.fillStyle='rgba(230,200,90,0.35)'; for(let x=BX0;x<BX1;x+=70) g.fillRect(x,GROUND+92,38,5);   // vạch kẻ đường
    // dây điện võng giữa các cột đèn
    g.strokeStyle='rgba(10,10,18,0.9)'; g.lineWidth=1.2;
    for(let i=0;i<LAMPS.length-1;i++){ const a=LAMPS[i], b=LAMPS[i+1]; for(const dy of [0,8]){ g.beginPath(); g.moveTo(a,GROUND-400+dy); g.quadraticCurveTo((a+b)/2,GROUND-340+dy,b,GROUND-400+dy); g.stroke(); } }
    for(const lx of LAMPS){ g.fillStyle='#22242f'; g.fillRect(lx-4,GROUND-400,8,368); g.fillRect(lx-4,GROUND-400,26,5); g.fillStyle='#2e3140'; g.fillRect(lx+14,GROUND-398,14,8); g.fillRect(lx-8,GROUND-40,16,8); }
    g=prev; return c;
  }
  // ───────────────────── phần ĐỘNG ─────────────────────
  function sceneLive(t){
    if(!BG) BG=buildBG();
    g.drawImage(BG, BX0, BY0, BX1-BX0, BY1-BY0);
    for(let i=0;i<40;i++){ const x=BX0+hash(i+1200)*(BX1-BX0), y=BY0+hash(i+1300)*520, a=Math.max(0,Math.sin(t*2+i*1.7))*0.8;   // sao lấp lánh
      if(a>0.05){ g.fillStyle=`rgba(255,255,255,${a})`; g.fillRect(x-0.6,y-2.5,1.2,5); g.fillRect(x-2.5,y-0.6,5,1.2); } }
    for(const lx of LAMPS){ const fl=0.9+0.1*Math.sin(t*13+lx);   // 💡 đèn đường + vùng sáng hắt xuống vỉa hè
      glow(lx+21,GROUND-390,70,0.5*fl,'255,215,140');
      g.save(); g.globalAlpha=0.16*fl; const gr=g.createLinearGradient(0,GROUND-390,0,GROUND); gr.addColorStop(0,'rgba(255,220,150,1)'); gr.addColorStop(1,'rgba(255,220,150,0)');
      g.fillStyle=gr; g.beginPath(); g.moveTo(lx+16,GROUND-390); g.lineTo(lx-70,GROUND+16); g.lineTo(lx+112,GROUND+16); g.closePath(); g.fill(); g.restore();
      g.save(); g.globalAlpha=0.22*fl; g.fillStyle='#ffd99a'; g.beginPath(); g.ellipse(lx+21,GROUND-8,80,14,0,0,Math.PI*2); g.fill(); g.restore(); }
    // 💡 cửa sổ tầng 2 sáng đèn: rèm vén 2 bên + 2 cái bóng chụm đầu in lên rèm trong
    const W0=WIN; glow(W0.x+W0.w/2,W0.y+W0.h/2,180,0.34,'255,200,110');
    g.fillStyle='#d9d3c4'; g.fillRect(W0.x-6,W0.y-6,W0.w+12,W0.h+12);
    let gr=g.createLinearGradient(0,W0.y,0,W0.y+W0.h); gr.addColorStop(0,'#ffe2ad'); gr.addColorStop(1,'#f1aa58'); g.fillStyle=gr; g.fillRect(W0.x,W0.y,W0.w,W0.h);
    g.save(); g.beginPath(); g.rect(W0.x,W0.y,W0.w,W0.h); g.clip();
    g.fillStyle='rgba(255,240,210,0.35)'; for(let x=W0.x+6;x<W0.x+W0.w;x+=10) g.fillRect(x,W0.y,3,W0.h);   // nếp rèm voan
    const sw=Math.sin(t*1.7)*0.035;
    actor(silhouette(IMG.wife,[170,0,270,300]), W0.x+W0.w*0.34, W0.y+W0.h+2, W0.h*0.6, {a:0.9, rot:0.12+sw, flip:true});   // 👩 cô vợ (quay sang phải)
    actor(silhouette(IMG.chill,[0,0,213,250]), W0.x+W0.w*0.68, W0.y+W0.h+3, W0.h*0.74, {a:0.9, rot:-0.1-sw});              // 😎 Chill Guy (quay sang trái, chụm vào)
    g.fillStyle='rgba(170,60,55,0.85)';   // rèm nhung đỏ vén 2 bên
    g.beginPath(); g.moveTo(W0.x,W0.y); g.lineTo(W0.x+W0.w*0.13,W0.y); g.quadraticCurveTo(W0.x+W0.w*0.03,W0.y+W0.h*0.55,W0.x+W0.w*0.09,W0.y+W0.h); g.lineTo(W0.x,W0.y+W0.h); g.closePath(); g.fill();
    g.beginPath(); g.moveTo(W0.x+W0.w,W0.y); g.lineTo(W0.x+W0.w*0.87,W0.y); g.quadraticCurveTo(W0.x+W0.w*0.97,W0.y+W0.h*0.55,W0.x+W0.w*0.91,W0.y+W0.h); g.lineTo(W0.x+W0.w,W0.y+W0.h); g.closePath(); g.fill();
    g.restore();
    g.strokeStyle='#d9d3c4'; g.lineWidth=3; g.beginPath(); g.moveTo(W0.x+W0.w/2,W0.y); g.lineTo(W0.x+W0.w/2,W0.y+W0.h); g.stroke();
    g.fillStyle='#bfb8a8'; g.fillRect(W0.x-10,W0.y+W0.h+5,W0.w+20,6);
  }
  // vị trí + hướng của Depressed Cat (ảnh gốc quay mặt TRÁI → flip = quay PHẢI, nhìn về phía nhà)
  function catState(t){
    if(t<T.walkEnd){ const u=t/T.walkEnd; return {x:lerp(-700,170,u<0.85?u/0.85*0.92:0.92+0.08*eio((u-0.85)/0.15)), flip:true, walk:true}; }
    if(t<T.turn) return {x:170, flip:true, walk:false};
    const u=seg(t,T.turn,T.freeze); return {x:lerp(170,95,u), flip:false, walk:true};
  }
  // 💐 bó hoa (giấy gói hồng + bông đỏ/hồng/vàng + lá)
  function bouquet(x,y,sc,dir,rot){
    g.save(); g.translate(x,y); g.scale(dir*sc,sc); g.rotate(rot==null?-0.25:rot);
    g.fillStyle='#3f8f3a'; for(const a of [-0.7,-0.2,0.35,0.8]){ g.save(); g.rotate(a); g.beginPath(); g.ellipse(0,-30,5,14,0,0,Math.PI*2); g.fill(); g.restore(); }
    for(const [fx,fy,r,c] of [[-10,-30,8,'#e53950'],[6,-36,8,'#ff7aa8'],[14,-24,7,'#e53950'],[-2,-20,7,'#ffd54f'],[-14,-18,6,'#ff7aa8'],[2,-44,6,'#ffd54f']]){
      g.fillStyle=c; for(let k=0;k<5;k++){ const a=k*1.2566; g.beginPath(); g.arc(fx+Math.cos(a)*r*0.55,fy+Math.sin(a)*r*0.55,r*0.55,0,Math.PI*2); g.fill(); }
      g.fillStyle='rgba(120,20,40,0.6)'; g.beginPath(); g.arc(fx,fy,r*0.3,0,Math.PI*2); g.fill(); }
    g.fillStyle='#f6a8c8'; g.beginPath(); g.moveTo(-24,-18); g.lineTo(24,-18); g.lineTo(3,30); g.lineTo(-3,30); g.closePath(); g.fill();
    g.fillStyle='rgba(255,255,255,0.35)'; g.beginPath(); g.moveTo(-24,-18); g.lineTo(-4,-18); g.lineTo(-1,30); g.closePath(); g.fill();
    g.fillStyle='#d81b60'; g.fillRect(-6,6,12,6);
    g.restore(); }
  // 🦟🎻 Mosquito Violin đứng dưới nhà diễn rong kiếm tiền: hộp đàn mở trước mặt có xu + tiền giấy. Thấy cảnh trong cửa sổ
  //    là lúc nó bắt đầu kéo bài buồn (4 khung kéo đàn lật vòng), dừng hình thì đứng im luôn.
  const MQX=455;
  function violinCase(x,y){
    g.save(); g.translate(x,y);
    g.fillStyle='rgba(0,0,0,0.35)'; g.beginPath(); g.ellipse(0,4,46,8,0,0,Math.PI*2); g.fill();
    const body=()=>{ g.beginPath(); g.moveTo(-42,0); g.quadraticCurveTo(-44,-14,-26,-15); g.quadraticCurveTo(-12,-11,-2,-12); g.quadraticCurveTo(14,-18,30,-13); g.quadraticCurveTo(44,-8,42,0); g.closePath(); };
    g.fillStyle='#3a2416'; body(); g.fill();
    g.save(); g.scale(0.86,0.72); g.translate(0,-1); g.fillStyle='#9b1c2c'; body(); g.fill(); g.restore();   // lót nhung đỏ
    g.fillStyle='#4a2e1c'; g.beginPath(); g.moveTo(-42,-13); g.lineTo(42,-11); g.lineTo(40,-34); g.quadraticCurveTo(0,-40,-40,-34); g.closePath(); g.fill();   // nắp mở dựng lên
    g.strokeStyle='#2a180d'; g.lineWidth=1.5; g.stroke();
    g.fillStyle='#6bbf59'; for(const [bx,by,ba] of [[-16,-8,0.3],[6,-7,-0.25]]){ g.save(); g.translate(bx,by); g.rotate(ba); g.fillRect(-9,-4,18,8); g.fillStyle='#4f9c42'; g.fillRect(-3,-2,6,4); g.fillStyle='#6bbf59'; g.restore(); }   // tiền giấy
    for(const [cx,cy] of [[-26,-6],[-4,-4],[18,-6],[26,-3],[-30,-3],[10,-3]]){ g.fillStyle='#f4c542'; g.beginPath(); g.ellipse(cx,cy,4,2.6,0,0,Math.PI*2); g.fill(); g.fillStyle='#c9952a'; g.fillRect(cx-1.5,cy-0.6,3,1.2); }   // xu
    g.restore(); }
  function drawMosquito(t){
    violinCase(MQX-58,GROUND-2);
    const P0=T.winEnd-0.2, play=t>=P0, fr=play ? IMG.mq[1+Math.floor((t-P0)/0.17)%4] : IMG.mq[0];   // thấy 2 cái bóng xong mới bắt đầu kéo
    g.save(); g.globalAlpha=0.35; g.fillStyle='#000'; g.beginPath(); g.ellipse(MQX,GROUND+2,40,7,0,0,Math.PI*2); g.fill(); g.restore();
    actor(prep(fr), MQX, GROUND+4+(play?Math.sin(t*6)*1.5:0), 165, {flip:true, rot:play?Math.sin(t*3)*0.04:0});
  }
  function drawCat(t){
    const s=catState(t), H=180, bob=s.walk?Math.abs(Math.sin(t*7))*5:0;
    g.save(); g.globalAlpha=0.4; g.fillStyle='#000'; g.beginPath(); g.ellipse(s.x,GROUND+4,48,9,0,0,Math.PI*2); g.fill(); g.restore();
    // 💐 vứt bó hoa: bay vòng cung xuống đất, rơi vài cánh, nằm lại trên vỉa hè
    const hx0=170+48, hy0=GROUND-34, lx=MQX-110, ly=GROUND-4;   // 💐 rơi ngay cạnh hộp đàn của muỗi
    if(t>=T.throw){ const u=seg(t,T.throw,T.throw+0.5), x=lerp(hx0,lx,u), y=lerp(hy0,ly,u)-Math.sin(Math.PI*u)*90;
      bouquet(x,y,1.0,1,0.55+u*1.6);
      for(let i=0;i<7;i++){ const pu=seg(t,T.throw+0.45,T.throw+1.25); if(pu<=0) break; const a=-0.4-hash(i)*2.4, d=pu*(18+hash(i+9)*26);
        g.fillStyle=['#e53950','#ff7aa8','#ffd54f'][i%3]; g.beginPath(); g.ellipse(lx+Math.cos(a)*d, ly+2-Math.sin(a)*d*0.35, 3,1.6,a,0,Math.PI*2); g.fill(); } }
    const cry=(typeof DEPRESSED_CRY_IMG!=='undefined') && DEPRESSED_CRY_IMG.naturalWidth && t>=T.cry && t<T.cryEnd;
    if(cry){ const I=DEPRESSED_CRY_IMG, fw=I.naturalWidth/I._cols, fh=I.naturalHeight/I._rows, k=Math.min(I._frames-1, Math.floor((t-T.cry)/(T.cryEnd-T.cry)*I._frames));
      const h=H*1.05, w=h*fw/fh; g.save(); g.translate(s.x,GROUND+2); g.scale(s.flip?-1:1,1);
      g.drawImage(I,(k%I._cols)*fw,Math.floor(k/I._cols)*fh,fw,fh,-w/2,-h,w,h); g.restore(); }
    else actor(prep(IMG.dp), s.x, GROUND+2-bob, H, {flip:s.flip, rot:s.walk?Math.sin(t*7)*0.03:0});
    if(t<T.throw){ const dir=s.flip?1:-1; bouquet(s.x+dir*48, GROUND-34-bob+(cry?6:0), 1.0, dir, 0.55); }   // tay ôm bó hoa — chìa chéo ra phía trước, không che mặt
  }
  // 👁️ mắt Rinnegan khổng lồ trên nền trời (toạ độ màn hình)
  function rinne(x,y,r,a,slant){
    g.save(); g.globalAlpha=a; g.translate(x,y); g.rotate(slant);
    glow(0,0,r*2.2,0.55,'170,110,255');
    g.beginPath(); g.moveTo(-r*1.6,0); g.quadraticCurveTo(0,-r*1.05,r*1.6,0); g.quadraticCurveTo(0,r*0.95,-r*1.6,0); g.closePath();
    g.save(); g.clip();
    const gr=g.createRadialGradient(0,0,0,0,0,r*1.2); gr.addColorStop(0,'#efe6ff'); gr.addColorStop(0.55,'#c5a8f5'); gr.addColorStop(1,'#7d58c8');
    g.fillStyle=gr; g.fillRect(-r*1.7,-r*1.1,r*3.4,r*2.2);
    g.strokeStyle='rgba(50,20,100,0.85)'; g.lineWidth=r*0.05; for(const k of [0.25,0.45,0.65,0.85,1.05]){ g.beginPath(); g.arc(0,0,r*k,0,Math.PI*2); g.stroke(); }
    g.fillStyle='#24104a'; g.beginPath(); g.arc(0,0,r*0.1,0,Math.PI*2); g.fill();
    g.restore();
    g.strokeStyle='#0c0618'; g.lineWidth=r*0.12; g.beginPath(); g.moveTo(-r*1.7,-r*0.05); g.quadraticCurveTo(0,-r*1.12,r*1.7,-r*0.22); g.stroke();
    g.restore(); }
  // ⚡ sét trên nền trời sau khi dừng hình (mỗi tia có hình dạng cố định theo số thứ tự → tua lại vẫn y vậy)
  const BOLT_DT=0.62, BOLT_LIFE=0.4;
  function boltsSky(t){
    if(t<T.freeze+0.1) return 0;
    let flash=0; const n0=Math.floor((t-T.freeze-0.1)/BOLT_DT);
    for(let n=Math.max(0,n0-1);n<=Math.min(n0,0);n++){ const ts=T.freeze+0.1+n*BOLT_DT+hash(n)*0.2, u=(t-ts)/BOLT_LIFE; if(u<0||u>1) continue;   // ⚡ đúng 1 tia sét
      sfx('th'+n,'thunder_big',0.8);
      const a=Math.pow(1-u,1.4)*(u<0.15?1:(0.6+0.4*Math.sin(u*40))), x0=40+hash(n+3)*460, y1=260+hash(n+5)*200;
      const pts=[[x0,-10]]; let x=x0; for(let y=-10;y<y1;y+=18+hash(n*9+y)*16){ x+=(hash(n*13+y)-0.5)*42; pts.push([x,y]); }
      const br=[]; for(let k=0;k<3;k++){ const s=pts[2+Math.floor(hash(n*5+k)*(pts.length-4))]; if(!s) continue; let bx=s[0], by=s[1]; const B=[[bx,by]], d=hash(n+k*7)<0.5?-1:1;
        for(let q=0;q<4;q++){ bx+=d*(8+hash(n*31+k*3+q)*14); by+=12+hash(n*17+q)*14; B.push([bx,by]); } br.push(B); }
      g.save(); g.globalCompositeOperation='lighter'; g.lineJoin='round'; g.lineCap='round';
      const line=P=>{ g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); };
      for(const [lw,c] of [[10,`rgba(170,120,255,${0.25*a})`],[4,`rgba(210,190,255,${0.7*a})`],[1.6,`rgba(255,255,255,${a})`]]){ g.lineWidth=lw; g.strokeStyle=c; line(pts); for(const B of br) line(B); }
      g.restore(); flash=Math.max(flash, u<0.2?1-u/0.2:0); }
    return flash;
  }
  // chữ mực quét cọ (dùng chung khối chữ "This world / shall know / pain." của cảnh Shinra Tensei)
  const WT=[0,0.3,0.6,0.9,1.25].map(d=>T.l1+d);   // 5 chữ hiện lần lượt
  function ink(t){
    try{ _psDrawWords(g, VW/2, VH-315, 200, WT.map(x=>x*1000), t*1000); }catch(e){}
    WT.forEach((w,i)=>{ if(t>=w && !played['w'+i]){ played['w'+i]=1; if(!markOnly) try{ playPrioritySample('vine_boom',1.3,1,0.35); }catch(e){} } });   // 💥 mỗi chữ 1 tiếng vine boom TO, át hết tiếng khác
  }
  // 🎥 máy quay: đi theo nó dọc phố → toàn cảnh nhà → ngước lên cửa sổ tầng 2 → cận mặt lúc khóc → lùi ra toàn cảnh (trời phía sau)
  function cam(t){
    if(t<T.walkEnd-0.6){ const s=catState(t); return [Math.min(VW/2,s.x+60), VH/2+40, 1.12]; }
    const K=[[T.walkEnd-0.6,Math.min(VW/2,catState(T.walkEnd-0.6).x+60),VH/2+40,1.12],[T.walkEnd,VW/2,VH/2,1],
      [T.win+0.45,WIN.x+WIN.w/2,WIN.y+WIN.h/2+10,2.5],[T.winEnd,WIN.x+WIN.w/2,WIN.y+WIN.h/2+10,2.7],
      [T.cry+0.25,175,GROUND-95,2.1],[T.cryEnd,175,GROUND-95,2.2],[T.throw+0.35,300,GROUND-150,1.28],[T.turn+0.4,300,GROUND-150,1.28],[T.freeze,VW/2,VH/2,1]];   // vứt hoa: khung ôm cả nó + muỗi đang kéo đàn
    if(t>=K[K.length-1][0]) return K[K.length-1].slice(1);
    for(let i=1;i<K.length;i++) if(t<K[i][0]){ const a=K[i-1], b=K[i], u=eio(seg(t,a[0],b[0])); return [lerp(a[1],b[1],u),lerp(a[2],b[2],u),lerp(a[3],b[3],u)]; }
    return K[0].slice(1);
  }
  function frame(now){
    raf=requestAnimationFrame(frame);
    const t=paused?pauseT:(now-t0)/1000, tf=Math.min(t,T.freeze);
    if(t>=0.3 && t<T.walkEnd) sfx('happy1','dp_happy',0.9);   // 😸 happy happy happy — vừa ôm hoa vừa đi trên phố (lặp lại, tắt đúng lúc tới nhà)
    if(t>=2.84 && t<T.walkEnd) sfx('happy2','dp_happy',0.9,Math.max(0.1,T.walkEnd-2.84));
    if(t>=T.winEnd-0.2 && t<T.freeze) sfx('violin','violin_sad',0.75,Math.max(0.1,T.freeze-Math.max(t,T.winEnd-0.2)));   // 🎻 bài buồn có sẵn của muỗi — nó thấy 2 cái bóng xong mới kéo, tắt cụt lúc dừng hình
    if(t>=T.cry) sfx('cry','sad_cat_cry',1.0,3000);
    if(t>=T.freeze) sfx('freeze','vine_boom',0.9);
    if(t>=T.eyes) sfx('eyes','ultimate_charge_2',0.6);
    // ── thế giới (dừng hẳn ở T.freeze) vẽ ra lớp phụ, rồi ghép lên khung chính: ngả xám + tối dần sau khi dừng hình ──
    const [cx,cy,z]=cam(tf);
    w2.setTransform(1,0,0,1,0,0); w2.clearRect(0,0,W2.width,W2.height);
    w2.setTransform(SC*z,0,0,SC*z,SC*(VW/2-cx*z),SC*(VH/2-cy*z));
    g=w2; sceneLive(tf); drawMosquito(tf); drawCat(tf);
    g=cv.getContext('2d'); g.setTransform(1,0,0,1,0,0);
    const fz=seg(t,T.freeze,T.freeze+0.5);
    g.filter=fz>0?`grayscale(${fz}) brightness(${1-0.45*fz}) contrast(${1+0.2*fz})`:'none';
    g.drawImage(W2,0,0); g.filter='none';
    g.setTransform(SC,0,0,SC,0,0);
    if(t>=T.freeze && t<T.freeze+0.18){ g.fillStyle=`rgba(255,255,255,${0.7*(1-(t-T.freeze)/0.18)})`; g.fillRect(0,0,VW,VH); }   // chớp nhẹ lúc dừng hình
    if(t<0.5){ g.fillStyle=`rgba(0,0,0,${1-t/0.5})`; g.fillRect(0,0,VW,VH); }
    // 👁️⚡ sau lưng nó: trời tím tối, sét giật, 2 mắt Rinnegan + chữ
    const ea=eio(seg(t,T.eyes,T.eyes+1.0)), sk=seg(t,T.freeze,T.freeze+0.6);
    if(sk>0){ const gr=g.createLinearGradient(0,0,0,VH*0.6); gr.addColorStop(0,`rgba(40,10,70,${0.6*sk})`); gr.addColorStop(1,'rgba(40,10,70,0)'); g.fillStyle=gr; g.fillRect(0,0,VW,VH*0.6); }
    const fl=boltsSky(t);
    if(fl>0){ g.fillStyle=`rgba(200,180,255,${0.25*fl})`; g.fillRect(0,0,VW,VH); }
    if(ea>0){ const br=1+0.04*Math.sin(t*2.2); rinne(150,190,62*br,ea,0.12); rinne(390,190,62*br,ea,-0.12); }
    ink(t);
    if(t>DUR-0.6){ g.fillStyle=`rgba(0,0,0,${seg(t,DUR-0.6,DUR)})`; g.fillRect(0,0,VW,VH); }
    markOnly=false;
    if(panel) panel.update();
  }
  const curT=()=>paused?pauseT:(performance.now()-t0)/1000;
  function seek(sec){ sec=clamp(sec,0,DUR); try{ stopAllLongSfx(); }catch(e){} played={}; markOnly=true; if(paused) pauseT=sec; else t0=performance.now()-sec*1000; }
  function toggle(){ if(paused){ if(pauseT>=DUR-0.05) pauseT=0; t0=performance.now()-pauseT*1000; paused=false; } else { pauseT=curT(); paused=true; } }
  function stop(){ if(raf) cancelAnimationFrame(raf); raf=null; try{ stopAllLongSfx(); }catch(e){} if(window._cinePanelRemove) _cinePanelRemove(); panel=null; if(overlay) overlay.remove(); overlay=null; }
  window._cineDW=function(){
    if(overlay) return;
    overlay=document.createElement('div');
    overlay.style.cssText='position:fixed;inset:0;z-index:99999;background:#000;display:flex;align-items:center;justify-content:center;';
    cv=document.createElement('canvas'); cv.width=1080; cv.height=1920; SC=cv.width/VW;
    cv.style.cssText='height:100vh;max-width:100vw;aspect-ratio:9/16;object-fit:contain;';
    W2=document.createElement('canvas'); W2.width=cv.width; W2.height=cv.height; w2=W2.getContext('2d');
    overlay.appendChild(cv); document.body.appendChild(overlay);
    if(window._cinePanelMake) panel=_cinePanelMake(overlay,{ title:'Depressed Cat Comes Home', dur:()=>DUR, t:()=>Math.min(curT(),DUR), playing:()=>!paused && curT()<DUR,
      toggle:()=>{ if(!paused && curT()>=DUR) seek(0); else toggle(); }, seek, replay:()=>{ paused=false; seek(0); markOnly=false; }, close:()=>{ stop(); if(window.openCinema) openCinema(); } });
    try{ stopAllBattleMusic(); }catch(e){}
    paused=false; played={}; t0=performance.now(); raf=requestAnimationFrame(frame);
  };
  window._cineDWStop=stop;
  window._cineDWSeek=t=>{ t0=performance.now()-t*1000; played={}; };
  window._cineDWCanvas=()=>cv;
})();
