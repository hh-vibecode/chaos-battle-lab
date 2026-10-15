// ===================== 🎬 PHIM NGẮN "DEPRESSED CAT COMES HOME" =====================
// Đêm, Depressed Cat ôm bó hoa đi bộ dọc phố về nhà → ngước lên cửa sổ tầng 2 sáng đèn: in bóng VỢ nó (cô mèo trắng
// trong giấc mơ của Snooze Cat) chụm đầu bên CHILL GUY → nó đứng khóc meow meow (GIF kêu than + tiếng) → VỨT bó hoa,
// quay lưng bỏ đi → khung hình DỪNG LẠI, ngả xám; sau lưng nó trời nổi sét, 2 con mắt RINNEGAN khổng lồ hiện trên nền
// trời + chữ mực "This world / shall know / pain." · Vứt hoa xong chuyển cảnh: nó đi trên phố dưới mưa tầm tã, ngang qua Mosquito Violin
// đang lơ lửng kéo bài buồn (nhạc buồn bắt đầu lúc chuyển cảnh), đi qua rồi mới dừng hình.
// Chạy trên lớp phủ riêng (canvas 1080×1920, khung dọc Shorts) giống phim Memes Assemble; mở từ Meme Cinema.
// Nền tĩnh (trời, phố, nhà, cây, hàng rào...) vẽ SẴN 1 lần ra ảnh phụ độ phân giải cao; phần động vẽ mỗi khung.
(function(){
  if(window._cineDW) return;
  const VW=540, VH=960, GROUND=800, DUR=22.9;
  const A=p=>{ const im=new Image(); im.src=p; return im; };
  const IMG={ dp:Object.assign(A('assets/avatars/depressedcat/avatarUrl.webp'),{_feather:0.12}), wife:A('assets/img/misc/CAT_DREAM_IMG.webp'), chill:A('assets/img/chillguy/CHILLGUY_AVATAR_IMG.webp'),
    mq:['avatarUrl','attackAvatarUrl','skill1AvatarUrl','skill2AvatarUrl','skill3AvatarUrl'].map(n=>A('assets/avatars/mosquitoviolin/'+n+'.webp')) };
  const T={ walkEnd:4.1, win:4.2, winEnd:5.7, cry:5.8, cryEnd:8.85, throw:9.0, turn:9.5, cut:10.4, stop:14.4, strike1:14.6, out:14.75, outEnd:15.85, toss:16.0, coatOn:16.8, tp:17.1, tpGo:17.3, s2:17.45, look:17.9, strike2:18.7, freeze:19.4, eyes:19.7, l1:20.4, l2:20.9, l3:21.4 };
  // ⛈️ hết phố mưa: dừng lại → sét lần 1 chỉ làm TRỜI sáng → MẤT ĐIỆN lan từng khu, từng tầng trong ~1s → tối đen, chỉ còn BÓNG nó
  //    tung áo lên khoác vào → loé trắng dịch chuyển (kiểu Clapping Cat) → CẢNH MỚI: hiện ra ở ban công 1 toà nhà lớn (vẫn mất điện),
  //    ngước nhìn trời → sét lần 2 rọi sáng rõ mọi thứ: nó khoác áo Akatsuki → dừng hình, This world shall know pain
  // 🌧️ cut→freeze: CẢNH PHỐ MƯA 5s — nó lủi thủi đi dưới mưa tầm tã (chớp + sấm), nhạc buồn bắt đầu đúng lúc chuyển cảnh;
  //    đi được ~2.5s thì ngang qua Mosquito Violin đang lơ lửng kéo bài buồn trên hộp đàn, đi qua rồi mới dừng hình
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
    g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,-w/2,o.center?-h/2:-h,w,h); if(o.after) o.after(w,h); g.restore(); }
  // 🎭 tô 1 màu theo đúng hình (bóng đen / viền sáng / loé trắng dịch chuyển)
  const mask=(c,col)=>{ if(!c) return null; const k='_m'+col; if(c[k]) return c[k];
    const m=document.createElement('canvas'); m.width=c.sw; m.height=c.sh; const x=m.getContext('2d');
    x.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,0,0,c.sw,c.sh); x.globalCompositeOperation='source-in'; x.fillStyle=col; x.fillRect(0,0,c.sw,c.sh);
    return c[k]={src:m,sx:0,sy:0,sw:c.sw,sh:c.sh}; };
  function sil(c,x,y,h,o,rim){ if(!c) return; o=o||{};   // bóng đen + viền sáng mảnh do trời chớp hắt từ sau lưng
    if(rim>0.01) for(const [dx,dy] of [[-2,0],[2,0],[0,-2],[-1.5,-1.5],[1.5,-1.5]]) actor(mask(c,'#d8d0ff'),x+dx,y+dy,h,Object.assign({},o,{a:rim}));
    actor(mask(c,'#06050b'),x,y,h,o); }
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
  function apt(x0,w,nf,o){   // chung cư: mỗi tầng 2–3 cửa sổ, phần lớn sáng đèn; tầng trệt có cửa ra vào
    const fh=92, yb=GROUND-38, yt=yb-nf*fh;
    g.fillStyle=o.wall; g.fillRect(x0,yt,w,nf*fh);
    g.fillStyle='rgba(255,255,255,0.06)'; g.fillRect(x0,yt,5,nf*fh); g.fillRect(x0+w-5,yt,5,nf*fh);
    g.fillStyle=o.roofC; g.fillRect(x0-7,yt-14,w+14,16);   // lan can mái bằng
    g.fillStyle='rgba(0,0,0,0.3)'; for(let f=1;f<nf;f++) g.fillRect(x0,yb-f*fh-3,w,5);   // gờ sàn từng tầng
    const n=Math.max(2,Math.floor((w-20)/64)), gap=(w-n*46)/(n+1);
    for(let f=0;f<nf;f++){ const ty=yb-(f+1)*fh;
      for(let i=0;i<n;i++){ if(f===0 && i===Math.floor(n/2)) continue; win(x0+gap+i*(46+gap), ty+20, 46, 52, hash(x0*0.37+f*13.1+i*5.3)<0.78); } }
    const dx=x0+gap+Math.floor(n/2)*(46+gap); g.fillStyle='#2a1c14'; g.fillRect(dx,yb-74,46,74); g.fillStyle='#3b3c4a'; g.fillRect(dx-8,yb-6,62,8);   // cửa ra vào
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
  function buildBG(part){   // part 'sky' = trời (sao, mây, trăng) · 'fg' = mọi thứ còn lại trên nền trong suốt (để tắt điện từng khu)
    const c=document.createElement('canvas'); c.width=Math.round((BX1-BX0)*BS); c.height=Math.round((BY1-BY0)*BS);
    const prev=g; g=c.getContext('2d'); g.setTransform(BS,0,0,BS,-BX0*BS,-BY0*BS);
    if(part==='sky'){ let gr=g.createLinearGradient(0,BY0,0,GROUND); gr.addColorStop(0,'#050817'); gr.addColorStop(0.55,'#121637'); gr.addColorStop(1,'#2d2752');
    g.fillStyle=gr; g.fillRect(BX0,BY0,BX1-BX0,BY1-BY0);
    for(let i=0;i<260;i++){ const x=BX0+hash(i)*(BX1-BX0), y=BY0+hash(i+500)*560, r=0.4+hash(i+900)*1.1; g.fillStyle=`rgba(255,255,255,${0.25+hash(i+77)*0.6})`; g.beginPath(); g.arc(x,y,r,0,Math.PI*2); g.fill(); }
    for(let i=0;i<9;i++){ const x=BX0+hash(i+40)*(BX1-BX0), y=40+hash(i+60)*300; g.fillStyle='rgba(120,130,190,0.06)'; for(let k=0;k<5;k++){ g.beginPath(); g.ellipse(x+k*40,y+hash(i*7+k)*12,70,18,0,0,Math.PI*2); g.fill(); } }   // mây mỏng
    glow(80,110,120,0.3,'190,200,255'); g.fillStyle='#eef0ff'; g.beginPath(); g.arc(80,110,34,0,Math.PI*2); g.fill();   // 🌕 trăng + miệng hố
    g.fillStyle='rgba(150,155,190,0.35)'; for(const [dx,dy,r] of [[-10,-8,7],[9,6,5],[-4,12,4],[12,-12,3]]){ g.beginPath(); g.arc(80+dx,110+dy,r,0,Math.PI*2); g.fill(); }
      g=prev; return c; }
    // phố xa: dãy nhà cao tầng mờ + đèn cửa sổ lấm tấm
    for(let x=BX0;x<BX1;x+=46){ const h=120+hash(x)*170; g.fillStyle='#0d1027'; g.fillRect(x,GROUND-60-h,40,h+20);
      for(let yy=GROUND-50-h;yy<GROUND-70;yy+=14) for(let xx=x+5;xx<x+36;xx+=9) if(hash(xx*3.1+yy)<0.18){ g.fillStyle='rgba(255,210,130,0.55)'; g.fillRect(xx,yy,4,6); } }
    g.fillStyle='#0b0e21'; for(let x=BX0;x<BX1;x+=30){ g.beginPath(); g.arc(x,GROUND-60,26+hash(x+3)*14,Math.PI,0); g.fill(); }
    // dãy nhà hàng xóm dọc phố
    tree(-850,1.1);
    apt(-805,195,3,{wall:'#2b3150',roofC:'#1a1d33'});   // 🏢 2 dãy chung cư nhiều tầng, đèn sáng gần hết → mất điện thấy tắt từng tầng
    fence(-600,-560);
    apt(-520,205,4,{wall:'#33304a',roofC:'#211d32'});
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
  // ⚡🔌 MẤT ĐIỆN: chia phố thành từng khu (theo x) × từng tầng (theo y); sét lần 1 xong thì tắt dần — khu gần nó trước,
  //    trong mỗi khu tắt từ tầng trên xuống, mỗi ô chập chờn 2 nháy rồi tối hẳn; cả phố tắt hết trong ~1s
  const SECS=[[BX0,-610,0.34],[-610,-300,0],[-300,-60,0.55],[-60,BX1,0.72]], BAND=95, DK=0.085;
  function litAt(x,y,t){
    if(t<T.out) return 1;
    const sc=SECS.find(q=>x>=q[0]&&x<q[1])||SECS[3], ot=T.out+sc[2]+Math.max(0,Math.floor((y-300)/BAND))*0.055;
    if(t>=ot) return 0; if(t>=ot-0.1) return Math.floor(t*45)%2?1:0.2; return 1; }
  let BGS=null, BGF=null, BGFD=null;
  function drawFG(t){
    if(!BGF){ BGF=buildBG('fg'); BGFD=document.createElement('canvas'); BGFD.width=BGF.width; BGFD.height=BGF.height;
      const x=BGFD.getContext('2d'); x.filter=`brightness(${DK}) saturate(0.5)`; x.drawImage(BGF,0,0); }
    if(t<T.out){ g.drawImage(BGF, BX0, BY0, BX1-BX0, BY1-BY0); return; }
    if(t>=T.outEnd+0.1){ g.drawImage(BGFD, BX0, BY0, BX1-BX0, BY1-BY0); return; }
    for(const [x0,x1] of SECS) for(let y0=BY0;y0<BY1;y0+=BAND){ const y1=Math.min(BY1,y0+BAND), src=litAt((x0+x1)/2,y0+1,t)>0.5?BGF:BGFD;
      g.drawImage(src,(x0-BX0)*BS,(y0-BY0)*BS,(x1-x0)*BS,(y1-y0)*BS,x0,y0,x1-x0,y1-y0); } }
  // ⚡ sét lần 1: chỉ TRỜI loé sáng (nhiều nhịp), sau đó trời còn ánh tím mờ để thấy bóng nó in lên nền trời
  const SKY1=()=>[[T.strike1,1],[T.strike1+0.14,0.8],[T.strike1+0.34,0.6],[T.toss+0.12,0.4],[T.coatOn-0.12,0.38]];
  function skyL(t,pulses,base){ let L=0; for(const [ts,a] of pulses){ const d=t-ts; if(d>=0) L+=a*Math.exp(-d/0.2); } return Math.min(1,L+(base||0)); }
  function skyBolt(x0,y0,y1,seed,a){ if(a<=0.02) return; const P=[[x0,y0]]; let x=x0; for(let y=y0;y<y1;y+=16+hash(seed*7+y)*14){ x+=(hash(seed*13+y)-0.5)*40; P.push([x,y]); }
    g.save(); g.globalCompositeOperation='lighter'; g.lineJoin='round'; g.lineCap='round';
    for(const [lw,c] of [[16,`rgba(160,120,255,${0.28*a})`],[6,`rgba(210,190,255,${0.75*a})`],[2.2,`rgba(255,255,255,${a})`]]){ g.lineWidth=lw; g.strokeStyle=c; g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); }
    g.restore(); }
  function skyFlash(L,x0,y0,w,y1){ if(L<=0.01) return; const gr=g.createLinearGradient(0,y0,0,y1); gr.addColorStop(0,`rgba(205,195,255,${0.8*L})`); gr.addColorStop(1,'rgba(205,195,255,0)');
    g.save(); g.globalCompositeOperation='lighter'; g.fillStyle=gr; g.fillRect(x0,y0,w,y1-y0); g.restore(); }
  function sceneLive(t){
    if(!BGS) BGS=buildBG('sky');
    g.drawImage(BGS, BX0, BY0, BX1-BX0, BY1-BY0);
    if(t>=T.strike1){ const L=skyL(t,SKY1(),0.14); skyFlash(L,BX0,BY0,BX1-BX0,GROUND-60);
      const ba=t<T.strike1+0.5?skyL(t,SKY1().slice(0,3)):0; skyBolt(-760,BY0,300,3,ba); skyBolt(-470,BY0,220,8,ba*0.6); }
    drawFG(t);
    for(let i=0;i<40;i++){ const x=BX0+hash(i+1200)*(BX1-BX0), y=BY0+hash(i+1300)*520, a=Math.max(0,Math.sin(t*2+i*1.7))*0.8;   // sao lấp lánh
      if(a>0.05){ g.fillStyle=`rgba(255,255,255,${a})`; g.fillRect(x-0.6,y-2.5,1.2,5); g.fillRect(x-2.5,y-0.6,5,1.2); } }
    for(const lx of LAMPS){ const fl=(0.9+0.1*Math.sin(t*13+lx))*litAt(lx,GROUND-150,t); if(fl<=0.01) continue;   // 💡 đèn đường + vùng sáng hắt xuống vỉa hè (mất điện thì tắt theo khu)
      glow(lx+21,GROUND-390,70,0.5*fl,'255,215,140');
      g.save(); g.globalAlpha=0.16*fl; const gr=g.createLinearGradient(0,GROUND-390,0,GROUND); gr.addColorStop(0,'rgba(255,220,150,1)'); gr.addColorStop(1,'rgba(255,220,150,0)');
      g.fillStyle=gr; g.beginPath(); g.moveTo(lx+16,GROUND-390); g.lineTo(lx-70,GROUND+16); g.lineTo(lx+112,GROUND+16); g.closePath(); g.fill(); g.restore();
      g.save(); g.globalAlpha=0.22*fl; g.fillStyle='#ffd99a'; g.beginPath(); g.ellipse(lx+21,GROUND-8,80,14,0,0,Math.PI*2); g.fill(); g.restore(); }
    // 💡 cửa sổ tầng 2 sáng đèn: rèm vén 2 bên + 2 cái bóng chụm đầu in lên rèm trong
    const W0=WIN; if(litAt(W0.x,W0.y,t)<0.5){ g.fillStyle='#0c0e18'; g.fillRect(W0.x-6,W0.y-6,W0.w+12,W0.h+12); return; }
    glow(W0.x+W0.w/2,W0.y+W0.h/2,180,0.34,'255,200,110');
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
    if(t<T.cut){ const u=seg(t,T.turn,T.cut); return {x:lerp(170,110,u), flip:false, walk:true}; }
    const u=seg(t,T.cut,T.stop); return {x:lerp(ST_X0,ST_X1,u<0.9?u/0.9*0.95:0.95+0.05*eio((u-0.9)/0.1)), flip:false, walk:t<T.stop, street:true};   // 🌧️ phố mưa: đi về bên trái rồi dừng, ngước lên trời
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
  const ST_X0=-80, ST_X1=-600, MQX2=-340;   // phố mưa: nó đi từ ST_X0 → ST_X1, ngang qua muỗi ở MQX2 khoảng giây thứ 2.5
  function drawMosquito(t){
    if(t<T.cut || litAt(MQX2,GROUND-60,t)<0.5) return;
    violinCase(MQX2,GROUND-2);   // 💰 hộp đàn để riêng trên vỉa hè, muỗi lơ lửng PHÍA TRÊN — không che mất hộp
    const fr=IMG.mq[1+Math.floor((t-T.cut)/0.17)%4], fy=GROUND-58+Math.sin(t*2.4)*6;   // kéo đàn suốt cảnh
    g.save(); g.globalAlpha=0.28; g.fillStyle='#000'; g.beginPath(); g.ellipse(MQX2,GROUND+3,22,4,0,0,Math.PI*2); g.fill(); g.restore();
    actor(prep(fr), MQX2, fy, 82, {flip:false, rot:Math.sin(t*3)*0.05});   // nhỏ còn 1/2, bay lơ lửng
  }
  // 🩹 cả phim: trông như vừa bị ăn đòn — mắt phải (của nó) sưng tím bầm + băng cá nhân dán má bên kia (vẽ theo khung ảnh mèo)
  //    E = vị trí theo tỉ lệ khung ảnh: mắt (ex,ey,r) + băng (bx,by,bl,bw); mặc định cho ảnh đứng, GIF khóc có bảng lệch theo từng khung
  const HURT_DP={ex:0.323,ey:0.405,r:0.09,bx:0.77,by:0.5,bl:0.24,bw:0.085};
  const CRY_EYE_OFF=[[0,0],[-1,-1],[-1,-3],[-1,-3],[-1,-5],[-1,-4],[-3,-4],[-4,-3],[-5,-3],[-6,-3],[-7,-2],[-7,-2],[-6,-2],[-4,-2],[-3,-1],[-2,-2],[-2,-2],[-3,-2],[-3,-2],[-3,-2],[-3,-2],[-3,-2],[-2,-3],[-2,-3],[-2,-3],[-2,-2],[-2,-2],[5,2],[6,0],[7,-2],[8,-3],[8,-3],[7,-3],[6,-3],[6,-4],[4,-4],[3,-5],[1,-5],[-1,-6],[-4,-6],[-4,-5],[-5,-5],[-5,-4],[-3,-5],[-1,-5],[0,-4]];   // lệch mắt (px khung 210×340) từng khung GIF khóc
  function hurtCry(k){ const [dx,dy]=CRY_EYE_OFF[k]||[0,0]; return {ex:(62+dx)/210, ey:(133+dy)/340, r:0.102, bx:(164+dx)/210, by:(172+dy)/340, bl:0.27, bw:0.097}; }
  function hurt(w,h,E){ E=E||HURT_DP;
    const P=(fx,fy)=>[-w/2+fx*w, -h+fy*h], [ex,ey]=P(E.ex,E.ey), r=w*E.r;
    const blob=(x,y,rx,ry,rot,stops)=>{ const gr=g.createRadialGradient(x,y,0,x,y,Math.max(rx,ry)); for(const [k,c] of stops) gr.addColorStop(k,c);
      g.save(); g.translate(x,y); g.rotate(rot); g.scale(rx/Math.max(rx,ry),ry/Math.max(rx,ry)); g.translate(-x,-y); g.fillStyle=gr; g.beginPath(); g.arc(x,y,Math.max(rx,ry),0,Math.PI*2); g.fill(); g.restore(); };
    g.save(); g.globalCompositeOperation='multiply';
    blob(ex+r*0.1,ey+r*0.35,r*2.1,r*1.6,0.3,[[0,'rgba(190,50,70,0.8)'],[0.55,'rgba(205,80,95,0.5)'],[1,'rgba(220,110,110,0)']]);   // quầng đỏ bầm lan ra má
    blob(ex,ey+r*0.15,r*1.45,r*1.2,0.2,[[0,'rgba(110,60,130,0.2)'],[0.4,'rgba(70,20,90,0.7)'],[0.75,'rgba(110,40,120,0.45)'],[1,'rgba(120,50,130,0)']]);   // hốc mắt tím đen
    g.strokeStyle='rgba(170,25,35,0.7)'; g.lineCap='round';
    for(let k=0;k<5;k++){ const sx=ex-r*1.55+k*r*0.16, sy=ey+r*0.55+k*r*0.12; g.lineWidth=r*(0.07+0.03*(k%2)); g.beginPath(); g.moveTo(sx,sy); g.lineTo(sx+r*0.55,sy+r*0.5); g.stroke(); }   // vết trầy xước
    g.restore();
    blob(ex-r*0.1,ey-r*0.68,r*0.8,r*0.28,0.25,[[0,'rgba(255,220,235,0.22)'],[1,'rgba(255,220,235,0)']]);   // mí sưng phồng căng bóng
    blob(ex+r*0.05,ey+r*0.78,r*0.75,r*0.26,0.2,[[0,'rgba(255,220,235,0.16)'],[1,'rgba(255,220,235,0)']]);
    g.save(); g.strokeStyle='rgba(50,10,40,0.45)'; g.lineWidth=r*0.08; g.beginPath(); g.ellipse(ex+r*0.05,ey+r*0.5,r*0.75,r*0.35,0.2,0.15*Math.PI,0.85*Math.PI); g.stroke(); g.restore();   // nếp sưng dưới mắt
    // 🩹 băng cá nhân dán dọc má bên kia (cạnh mắt trái của nó)
    const [bx,by]=P(E.bx,E.by), bl=w*E.bl, bw=w*E.bw;
    g.save(); g.translate(bx,by); g.rotate(0.28);
    const pill=(x,y,ww,hh,rr)=>{ g.beginPath(); g.moveTo(x+rr,y); g.lineTo(x+ww-rr,y); g.arcTo(x+ww,y,x+ww,y+rr,rr); g.lineTo(x+ww,y+hh-rr); g.arcTo(x+ww,y+hh,x+ww-rr,y+hh,rr); g.lineTo(x+rr,y+hh); g.arcTo(x,y+hh,x,y+hh-rr,rr); g.lineTo(x,y+rr); g.arcTo(x,y,x+rr,y,rr); g.closePath(); };
    g.fillStyle='rgba(0,0,0,0.2)'; pill(-bw/2+1.2,-bl/2+1.8,bw,bl,bw/2); g.fill();
    g.fillStyle='#e8c4a0'; pill(-bw/2,-bl/2,bw,bl,bw/2); g.fill();
    g.strokeStyle='rgba(120,80,50,0.55)'; g.lineWidth=0.9; g.stroke();
    g.fillStyle='#f6e6d2'; g.fillRect(-bw*0.36,-bl*0.17,bw*0.72,bl*0.34); g.strokeRect(-bw*0.36,-bl*0.17,bw*0.72,bl*0.34);   // miếng gạc giữa
    g.fillStyle='rgba(120,80,50,0.45)'; for(const yy of [-0.36,-0.28,0.28,0.36]) for(const xx of [-0.18,0.18]){ g.beginPath(); g.arc(bw*xx,bl*yy,0.8,0,Math.PI*2); g.fill(); }   // lỗ thoáng
    g.restore(); }
  function drawCat(t){
    const s=catState(t), H=180, bob=s.walk?Math.abs(Math.sin(t*7))*5:0;
    if(s.street && litAt(s.x,GROUND-100,t)<0.5){ drawCatDark(t); return; }   // 🌑 mất điện: chỉ còn bóng
    g.save(); g.globalAlpha=0.4; g.fillStyle='#000'; g.beginPath(); g.ellipse(s.x,GROUND+4,48,9,0,0,Math.PI*2); g.fill(); g.restore();
    // 💐 vứt bó hoa: bay vòng cung xuống đất, rơi vài cánh, nằm lại trên vỉa hè
    const hx0=170+48, hy0=GROUND-34, lx=330, ly=GROUND-4;   // 💐 rơi xuống vỉa hè trước nhà
    if(t>=T.throw && t<T.cut){ const u=seg(t,T.throw,T.throw+0.5), x=lerp(hx0,lx,u), y=lerp(hy0,ly,u)-Math.sin(Math.PI*u)*90;
      bouquet(x,y,1.0,1,0.55+u*1.6);
      for(let i=0;i<7;i++){ const pu=seg(t,T.throw+0.45,T.throw+1.25); if(pu<=0) break; const a=-0.4-hash(i)*2.4, d=pu*(18+hash(i+9)*26);
        g.fillStyle=['#e53950','#ff7aa8','#ffd54f'][i%3]; g.beginPath(); g.ellipse(lx+Math.cos(a)*d, ly+2-Math.sin(a)*d*0.35, 3,1.6,a,0,Math.PI*2); g.fill(); } }
    const cry=(typeof DEPRESSED_CRY_IMG!=='undefined') && DEPRESSED_CRY_IMG.naturalWidth && t>=T.cry && t<T.cryEnd;
    if(cry){ const I=DEPRESSED_CRY_IMG, fw=I.naturalWidth/I._cols, fh=I.naturalHeight/I._rows, k=Math.min(I._frames-1, Math.floor((t-T.cry)/(T.cryEnd-T.cry)*I._frames));
      const h=H*1.05, w=h*fw/fh; g.save(); g.translate(s.x,GROUND+2); g.scale(s.flip?-1:1,1);
      g.drawImage(I,(k%I._cols)*fw,Math.floor(k/I._cols)*fh,fw,fh,-w/2,-h,w,h); hurt(w,h,hurtCry(k)); g.restore(); }
    else actor(prep(IMG.dp), s.x, GROUND+2-bob, H, {flip:s.flip, rot:s.walk?Math.sin(t*7)*0.03:0, after:hurt});
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
  // 🌧️ mưa tầm tã (toạ độ màn hình, vẽ lên lớp thế giới nên dừng hình cũng ngả xám theo) + trời tối ướt + chớp sáng trên trời
  const RAIN_FL=[0.7,2.6].map(d=>T.cut+d);
  function rainFx(t,dark){
    g.save(); g.setTransform(SC,0,0,SC,0,0);
    if(dark) g.globalAlpha=0.55; else { g.fillStyle='rgba(8,12,30,0.32)'; g.fillRect(0,0,VW,VH); }   // trời mưa tối + ướt
    let fl=0; for(const ts of RAIN_FL){ const u=(t-ts)/0.32; if(u>=0&&u<=1) fl=Math.max(fl,(1-u)*(u<0.25||u>0.45?1:0.35)); }   // chớp 2 nhịp
    if(fl>0){ const gr=g.createLinearGradient(0,0,0,VH*0.7); gr.addColorStop(0,`rgba(215,225,255,${0.55*fl})`); gr.addColorStop(1,'rgba(215,225,255,0)'); g.fillStyle=gr; g.fillRect(0,0,VW,VH); }
    g.strokeStyle='rgba(190,205,235,0.42)'; g.lineWidth=1.2; g.lineCap='round';
    for(let i=0;i<170;i++){ const sp=900+hash(i+3)*500, L=16+hash(i+7)*16, x=(hash(i)*(VW+120)-60+t*-90)%(VW+120), xx=x<-60?x+VW+120:x, y=((hash(i+11)*VH+t*sp)%(VH+40))-20;
      g.beginPath(); g.moveTo(xx,y); g.lineTo(xx-L*0.18,y+L); g.stroke(); }
    g.strokeStyle='rgba(200,215,240,0.35)'; g.lineWidth=1;   // tia nước bắn lên trên vỉa hè
    for(let i=0;i<26;i++){ const ph=(t*2.2+hash(i+40))%1, x=hash(i+60)*VW, y=VH*0.86+hash(i+80)*VH*0.1, r=2+ph*7; g.globalAlpha=1-ph; g.beginPath(); g.ellipse(x,y,r,r*0.3,0,0,Math.PI*2); g.stroke(); }
    g.restore();
  }
  // 🌑 bóng nó trong lúc mất điện: tung áo Akatsuki lên trời → áo xoay vòng rơi xuống khoác vào người → loé trắng → dịch chuyển đi
  const PAIN_H=180*1.12;
  function speedLines(x,yTop,yBot,w,u,dir,seed,n){ g.save(); g.strokeStyle='#fff'; g.lineCap='round';
    for(let i=0;i<n;i++){ const lx=x+(hash(seed+i)-0.5)*w, L=40+hash(seed+i*3)*110, y=lerp(yTop,yBot,hash(seed+i*7))+dir*u*240;
      g.globalAlpha=(1-u)*(0.5+0.5*hash(seed+i*11)); g.lineWidth=1.2+hash(seed+i*5)*2.2; g.beginPath(); g.moveTo(lx,y); g.lineTo(lx,y+dir*L); g.stroke(); }
    g.restore(); }
  function drawCatDark(t){
    const s=catState(t), x=s.x, rim=0.25+0.75*skyL(t,SKY1(),0.14);
    if(t>=T.tpGo){ const u=seg(t,T.tpGo,T.tpGo+0.18); if(u>=1) return;   // 🌀 biến mất: thân nhoè vút lên + vạch tốc độ
      const c=prep(DP_PAIN_IMG); actor(mask(c,'#ffffff'), x, GROUND+2-u*170, PAIN_H*(1+u*1.6), {sx:1-0.7*u, a:1-u});
      speedLines(x,GROUND-PAIN_H,GROUND,PAIN_H*0.7,u,-1,31,16); return; }
    const hop=Math.sin(Math.PI*seg(t,T.toss,T.toss+0.3))*14, on=t>=T.coatOn;
    const c=on?prep(DP_PAIN_IMG):prep(IMG.dp), h=on?PAIN_H:180, sq=on?1+0.06*Math.sin(Math.PI*seg(t,T.coatOn,T.coatOn+0.2)):1;
    sil(c, x, GROUND+2-hop, h, {sy:2-sq}, rim);
    if(t>=T.toss && t<T.coatOn){ const u=seg(t,T.toss,T.coatOn), px=x+26*Math.sin(Math.PI*u), py=GROUND-110-Math.sin(Math.PI*u)*290+u*20;   // 🧥 áo bay vòng lên rồi chụp xuống
      sil(prep(DP_PAIN_IMG,[0,330,640,625]), px, py, 118*(0.9+0.2*Math.sin(Math.PI*u)), {rot:u*Math.PI*3, center:true}, rim); }
    if(t>=T.tp){ const k=eio(seg(t,T.tp,T.tpGo)); actor(mask(c,'#ffffff'), x, GROUND+2, h, {a:k}); glow(x,GROUND-h*0.5,h*0.8,0.5*k,'230,225,255'); }   // ✨ loé trắng dần như Clapping Cat
  }
  // 🏢 CẢNH MỚI: ban công 1 toà chung cư lớn (toạ độ = màn hình), vẫn mất điện → sét lần 2 rọi sáng rõ hết
  const B2={x:270, y:562}, BS2=2;
  let BG2=null, BG2D=null;
  function buildBG2(){
    const c=document.createElement('canvas'); c.width=VW*BS2; c.height=VH*BS2;
    const prev=g; g=c.getContext('2d'); g.setTransform(BS2,0,0,BS2,0,0);
    const bld=(x0,x1,top,wall,cols,wy0)=>{ g.fillStyle=wall; g.fillRect(x0,top,x1-x0,VH-top); g.fillStyle='rgba(0,0,0,0.3)'; g.fillRect(x0-6,top-10,x1-x0+12,12);
      for(let y=wy0;y<VH;y+=110) for(const cx of cols) win(cx-18,y,36,50,0); };
    bld(-20,95,190,'#20233a',[22,66],230); bld(462,580,150,'#1d2036',[500,545],190);   // 2 toà bên cạnh lùi phía sau
    g.fillStyle='#3a3e5c'; g.fillRect(55,280,430,VH-280);   // 🏢 toà chính
    g.fillStyle='rgba(255,255,255,0.07)'; g.fillRect(55,280,14,VH-280); g.fillRect(471,280,14,VH-280);
    g.fillStyle='#262942'; g.fillRect(45,262,450,20);   // lan can mái
    g.strokeStyle='rgba(0,0,0,0.2)'; g.lineWidth=1; for(let y=290;y<VH;y+=12){ g.beginPath(); g.moveTo(69,y); g.lineTo(471,y); g.stroke(); }
    for(const fy of [420,700,840]){ g.fillStyle='rgba(0,0,0,0.3)'; g.fillRect(55,fy-3,430,6); }
    for(const ft of [280,420,560,700,840]) for(const cx of [130,270,410]){ if(ft===420 && cx===270) continue; win(cx-36,ft+26,72,86,0); }
    g.fillStyle='#d9d3c4'; g.fillRect(208,432,124,130); const gr=g.createLinearGradient(214,438,326,562); gr.addColorStop(0,'#2b3456'); gr.addColorStop(1,'#121628');
    g.fillStyle=gr; g.fillRect(214,438,112,124); g.fillStyle='#d9d3c4'; g.fillRect(268,438,4,124);   // cửa kính ra ban công
    g.fillStyle='#4a4e66'; g.fillRect(124,562,292,14); g.fillStyle='rgba(0,0,0,0.38)'; g.fillRect(124,576,292,12);   // sàn ban công + bóng đổ dưới
    g=prev; return c; }
  function railing(lit){ g.save(); g.fillStyle=lit?'#2c2f44':'#05050a';
    g.fillRect(128,516,284,7); g.fillRect(128,552,284,4); for(let x=132;x<412;x+=14) g.fillRect(x,520,3,40);
    if(lit){ g.fillStyle='rgba(220,215,255,0.35)'; g.fillRect(128,516,284,2); } g.restore(); }
  const SKY2=()=>[[T.strike2,1],[T.strike2+0.2,0.95],[T.strike2+0.42,0.8]];   // ⚡ sét lần 2: chớp nhoáng 3 lần — chỉ trong các nháy đó mới thấy rõ nó khoác áo Akatsuki, xong lại tối
  const flashOn=t=>SKY2().some(([ts],i)=>t>=ts && t<ts+(i?0.08:0.12));
  function scene2(t){
    if(!BG2){ BG2=buildBG2(); BG2D=document.createElement('canvas'); BG2D.width=BG2.width; BG2D.height=BG2.height; const x=BG2D.getContext('2d'); x.filter=`brightness(${DK}) saturate(0.5)`; x.drawImage(BG2,0,0); }
    if(!BGS) BGS=buildBG('sky');
    g.drawImage(BGS,0,0,540*BS,960*BS,-20,-20,VW+40,VH+40);   // trời (đoạn không có trăng)
    const lit=flashOn(t), L=skyL(t,SKY2(),0.14);
    skyFlash(L,-20,-20,VW+40,330); skyBolt(120,-20,268,17,t<T.strike2+0.5?skyL(t,SKY2()):0); skyBolt(430,-20,150,23,t<T.strike2+0.4?skyL(t,SKY2())*0.6:0);
    g.drawImage(lit?BG2:BG2D,0,0,VW,VH);
    const c=prep(DP_PAIN_IMG), look=eio(seg(t,T.look,T.look+0.6)), o={rot:look*0.07};
    if(lit) actor(c,B2.x,B2.y+2-look*3,PAIN_H*1.05,o);
    else { sil(c,B2.x,B2.y+2-look*3,PAIN_H*1.05,o,0.25+0.75*L);
      const u=seg(t,T.s2,T.s2+0.3); if(u<1){ actor(mask(c,'#ffffff'),B2.x,B2.y+2,PAIN_H*1.05*(1+(1-u)*0.25),{sx:1-(1-u)*0.4,a:1-u}); speedLines(B2.x,B2.y-PAIN_H,B2.y,PAIN_H*0.8,u,1,57,14); } }   // 🌀 hiện ra: loé trắng tắt dần + vạch tốc độ
    railing(lit);
    if(lit){ g.save(); g.globalCompositeOperation='lighter'; g.fillStyle='rgba(150,150,220,0.16)'; g.fillRect(-20,-20,VW+40,VH+40); g.restore(); }   // ánh sét hắt
  }
  // 🎥 máy quay: đi theo nó dọc phố → toàn cảnh nhà → ngước lên cửa sổ tầng 2 → cận mặt lúc khóc → lùi ra toàn cảnh (trời phía sau)
  function cam(t){
    if(t<T.walkEnd-0.6){ const s=catState(t); return [Math.min(VW/2,s.x+60), VH/2+40, 1.12]; }
    const K=[[T.walkEnd-0.6,Math.min(VW/2,catState(T.walkEnd-0.6).x+60),VH/2+40,1.12],[T.walkEnd,VW/2,VH/2,1],
      [T.win+0.45,WIN.x+WIN.w/2,WIN.y+WIN.h/2+10,2.5],[T.winEnd,WIN.x+WIN.w/2,WIN.y+WIN.h/2+10,2.7],
      [T.cry+0.25,175,GROUND-95,2.1],[T.cryEnd,175,GROUND-95,2.2],[T.throw+0.35,240,GROUND-140,1.55],[T.cut,170,GROUND-140,1.55]];
    if(t>=T.s2) return [VW/2, VH/2, lerp(1.0,1.06,eio(seg(t,T.s2,T.freeze)))];   // 🏢 cảnh ban công
    if(t>=T.cut){ const s=catState(t), e=eio(seg(t,T.stop-0.4,T.strike1+0.5));   // 🌧️ phố mưa: máy quay đi theo nó; dừng lại thì lùi ra cho thấy trời + dãy nhà
      const z=lerp(1.5,1.2,e), hw=VW/2/z+6;   // không cho khung hình vượt mép trái nền vẽ sẵn (lòi vùng trống)
      return [clamp(s.x-40+e*20,BX0+hw,BX1-hw), lerp(GROUND-175,GROUND-255,e), z]; }
    if(t>=K[K.length-1][0]) return K[K.length-1].slice(1);   // (giữ khung cuối tới lúc chuyển cảnh)
    for(let i=1;i<K.length;i++) if(t<K[i][0]){ const a=K[i-1], b=K[i], u=eio(seg(t,a[0],b[0])); return [lerp(a[1],b[1],u),lerp(a[2],b[2],u),lerp(a[3],b[3],u)]; }
    return K[0].slice(1);
  }
  function frame(now){
    raf=requestAnimationFrame(frame);
    const t=paused?pauseT:(now-t0)/1000, tf=Math.min(t,T.freeze);
    if(t>=0.3 && t<T.walkEnd) sfx('happy1','dp_happy',0.9);   // 😸 happy happy happy — vừa ôm hoa vừa đi trên phố (lặp lại, tắt đúng lúc tới nhà)
    if(t>=2.84 && t<T.walkEnd) sfx('happy2','dp_happy',0.9,Math.max(0.1,T.walkEnd-2.84));
    if(t>=T.cut && t<T.freeze) sfx('violin','violin_sad',0.75,Math.max(0.1,T.freeze-Math.max(t,T.cut)));   // 🎻 nhạc buồn bắt đầu ĐÚNG lúc chuyển sang phố mưa, tắt cụt lúc dừng hình
    if(t>=T.strike1) sfx('strike1','thunder_big',1.0);   // ⚡ sét lần 1
    if(t>=T.tpGo && t<T.s2+0.4) sfx('tele','clap_tele',1.0);   // 🌀 tiếng dịch chuyển y như Clapping Cat
    if(t>=T.strike2) sfx('strike2','thunder_big',1.0);   // ⚡ sét lần 2
    if(t>=T.cut && t<T.freeze) sfx('rain','dp_rain',0.8,Math.max(0.1,T.freeze-Math.max(t,T.cut)));   // 🌧️ tiếng mưa
    for(const [k,ts] of RAIN_FL.entries()) if(t>=ts+0.25 && t<T.freeze) sfx('rth'+k,'thunder_big',0.55);   // ⛈️ sấm sau mỗi lần chớp
    if(t>=T.cry) sfx('cry','sad_cat_cry',1.0,3000);
    if(t>=T.freeze) sfx('freeze','vine_boom',0.9);
    if(t>=T.eyes) sfx('eyes','ultimate_charge_2',0.6);
    // ── thế giới (dừng hẳn ở T.freeze) vẽ ra lớp phụ, rồi ghép lên khung chính: ngả xám + tối dần sau khi dừng hình ──
    const [cx,cy,z]=cam(tf);
    w2.setTransform(1,0,0,1,0,0); w2.clearRect(0,0,W2.width,W2.height);
    w2.setTransform(SC*z,0,0,SC*z,SC*(VW/2-cx*z),SC*(VH/2-cy*z));
    g=w2;
    if(tf<T.s2){ sceneLive(tf); drawMosquito(tf); drawCat(tf); if(tf>=T.cut) rainFx(tf, tf>=T.outEnd); }
    else { scene2(tf); rainFx(tf, !flashOn(tf)); }
    g=cv.getContext('2d'); g.setTransform(1,0,0,1,0,0);
    const fz=seg(t,T.freeze,T.freeze+0.5);
    g.filter=fz>0?`grayscale(${fz}) brightness(${1-0.45*fz}) contrast(${1+0.2*fz})`:'none';
    g.drawImage(W2,0,0); g.filter='none';
    g.setTransform(SC,0,0,SC,0,0);
    if(t>=T.freeze && t<T.freeze+0.18){ g.fillStyle=`rgba(255,255,255,${0.7*(1-(t-T.freeze)/0.18)})`; g.fillRect(0,0,VW,VH); }   // chớp nhẹ lúc dừng hình
    if(t<0.5){ g.fillStyle=`rgba(0,0,0,${1-t/0.5})`; g.fillRect(0,0,VW,VH); }
    if(t>=T.strike2 && t<T.strike2+0.05){ g.fillStyle='rgba(240,235,255,0.45)'; g.fillRect(0,0,VW,VH); }   // ⚡ loé trắng sét lần 2
    { const d=Math.abs(t-T.cut); if(d<0.35){ g.fillStyle=`rgba(0,0,0,${1-d/0.35})`; g.fillRect(0,0,VW,VH); } }   // chuyển cảnh: tối sập rồi mở ra phố mưa
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
