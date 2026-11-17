// ===================== 🎬 MEME LORE 2 · EP 0 "THE TRUTH" (anh duyệt 31/10) =====================
// Sự thật đằng sau cảnh cửa sổ của Ep 1 — KHÔNG thoại:
//  ① hẻm tối: Scared Hamster chạy thục mạng, 2 bàn tay bóng tối bò đuổi sát sau → 1 tay vươn lên VẢ văng nó vào góc tường
//  ② nó co rúm sợ hãi, 2 tay xoè ngón áp tới → Chill Guy từ đâu ĐÁ BAY gãy 1 tay (vỡ vụn) → ôm Hamster chạy; tay còn lại CÀO trúng lưng
//  ③ thềm nhà (căn nhà của Ep 1): Chill Guy ngất, lưng rách 3 vết cào sâu; mèo trắng (vợ Depressed Cat) đi làm về, khựng lại
//  ④ trong phòng: cả 2 đã băng bó; Chill Guy cúi sát ngó Hamster trên tay cô → ngoài cửa sổ 2 cái bóng CHỒNG lên nhau (y khung Ep 1)
//  ⑤ dưới phố: Depressed Cat ôm hoa ngước lên, hiểu lầm, khóc, vứt hoa bỏ đi → đi ngang cột điện, trong góc tối NỤ CƯỜI Friend hiện lên.
// Dựng trên engine phim Ep 1 (js/cine-dpwindow.js: phố, nhà, cửa sổ, bó hoa, mặt bầm chép sang) + chế độ xuất offline kiểu Ep 3.
// Mọi chuyển động / hạt tính thẳng theo t (không lưu trạng thái) → tua tới lui, xuất offline khớp từng khung.
(function(){
  if(window._cineL2E0) return;
  const VW=540, VH=960, GROUND=800;
  const A=p=>{ const im=new Image(); im.src=p; return im; };
  const H_=n=>A('assets/img/scaredhamster/'+n+'.webp');
  const IMG={ run:Array.from({length:10},(_,i)=>H_('HM_RUN'+i)), scared:H_('HM_SCARED'),
    crawlA:H_('HAND_crawlA'), crawlB:H_('HAND_crawlB'), lunge:H_('HAND_lunge'), slap:H_('HAND_slap'), closing:H_('HAND_closing'), grip:H_('HAND_grip'), retreat:H_('HAND_retreat'),
    kick:A('assets/img/cine/EP0_KICK.webp'), cgRun:A('assets/img/cine/EP0_RUN.webp'), cgDown:A('assets/img/cine/EP0_DOWN.webp'), cgBand:A('assets/img/cine/EP0_BANDAGE.webp'),
    wifeWalk:A('assets/img/cine/EP0_WIFE_WALK.webp'), wifeHold:A('assets/img/cine/EP0_WIFE_HOLD.webp'),
    chill:A('assets/img/chillguy/CHILLGUY_AVATAR_IMG.webp'), wife:A('assets/img/misc/CAT_DREAM_IMG.webp'),
    dp:Object.assign(A('assets/avatars/depressedcat/avatarUrl.webp'),{_feather:0.12}), grin:A('assets/img/friend/FR_GRIN_IMG.webp') };
  // (anh dặn 31/10) đá xong → TAY MỌC KHẮP NƠI (sprout) → Chill Guy GIẬT MÌNH (startle) → chộp Hamster → mới chạy
  const T={ slap:3.0, hit:3.35, corner:3.7, loom:4.4, grabTry:5.6, kick:6.0, kHit:6.35, land:6.7, sprout:6.85, startle:7.45, pick:7.85, run:8.05, claw:8.65, fade1:9.4,
            s2:10.0, wifeIn:10.4, wifeStop:12.1, gasp:12.2, fade2:13.1, winOn:13.8, s3:14.4, lean:16.0, pull:17.4, s4:18.3, look:19.1, pov:20.4,
            s5:22.3, grin:22.45, fadeEnd:24.4 };   // (anh dặn 31/10) cuối: zoom Depressed Cat ngước lên → góc nhìn QUA VAI nó lên cửa sổ → cắt thẳng sang mặt Friend ở góc phố — gọn, không dài
  const DUR=25.0;
  // 🔊 kế hoạch tiếng: [giây, key, âm lượng, độ dài (null = hết file)] — phát trực tiếp lẫn lúc xuất offline (render-cine trộn từ bảng này)
  const SFX_PLAN=[[0.15,'hm_musicbox',0.55,8.6],[0.35,'hm_crawl',0.85,2.6],[T.slap+0.25,'hm_claw1',1.0,null],[T.corner-0.05,'hit_heavy',0.8,null],[T.corner+0.15,'hm_scared',1.0,null],
    [T.loom,'hm_crawl',0.7,1.5],[T.kHit-0.05,'chillguy_kick',1.0,null],[T.kHit,'death_break',1.0,null],[T.claw-0.05,'hm_claw2',1.0,null],
    [T.gasp,'vine_boom',0.5,null],[T.look-0.3,'violin_sad',0.7,T.s5-T.look+0.3],[T.s5,'ep3_dark',0.9,null],[T.grin,'fr_song',0.45,DUR-T.grin]];
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)), seg=(t,a,b)=>clamp((t-a)/(b-a),0,1), eio=x=>x*x*(3-2*x), eout=x=>1-(1-x)*(1-x), lerp=(a,b,k)=>a+(b-a)*k;
  const hash=n=>{ const s=Math.sin(n*127.1+311.7)*43758.5453; return s-Math.floor(s); };
  let cv, g, W2, w2, SC, raf=null, t0=0, paused=false, pauseT=0, played={}, markOnly=false, panel=null, overlay=null, ready=false, OFF=null;
  // ảnh cắt sát nội dung (giống Ep 1)
  const prep=(im,crop)=>{ const key=crop?'_cpc':'_cp'; if(im[key]) return im[key]; if(!im.complete || !im.naturalWidth) return null;
    let sx=0,sy=0,sw=im.naturalWidth,sh=im.naturalHeight; if(crop){ [sx,sy,sw,sh]=crop; }
    try{ const c=document.createElement('canvas'); c.width=sw; c.height=sh; const x=c.getContext('2d'); x.drawImage(im,sx,sy,sw,sh,0,0,sw,sh);
      const d=x.getImageData(0,0,sw,sh).data; let x0=sw,y0=sh,x1=0,y1=0;
      for(let yy=0;yy<sh;yy+=2) for(let xx=0;xx<sw;xx+=2) if(d[(yy*sw+xx)*4+3]>40){ if(xx<x0)x0=xx; if(xx>x1)x1=xx; if(yy<y0)y0=yy; if(yy>y1)y1=yy; }
      if(x1<x0) return null;
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
  function glow(x,y,r,a,c){ if(a<=0.01||r<=0) return; const gr=g.createRadialGradient(x,y,0,x,y,r); gr.addColorStop(0,`rgba(${c},${a})`); gr.addColorStop(0.5,`rgba(${c},${a*0.4})`); gr.addColorStop(1,`rgba(${c},0)`);
    g.fillStyle=gr; g.beginPath(); g.arc(x,y,r,0,Math.PI*2); g.fill(); }
  const shadow=(x,w,a)=>{ g.save(); g.globalAlpha=a==null?0.4:a; g.fillStyle='#000'; g.beginPath(); g.ellipse(x,GROUND+4,w,w*0.18,0,0,Math.PI*2); g.fill(); g.restore(); };

  // ───────────────────── 🌃 PHỐ + NHÀ (chép nguyên từ Ep 1 để cảnh cửa sổ khớp từng nét) ─────────────────────
  const BX0=-900, BX1=660, BY0=-140, BY1=VH+40, BS=2.2;
  const HX=250, HY=GROUND-38, HW=270, WIN={x:HX+112, y:HY-420, w:146, h:122};
  const LAMPS=[-640,-330,40];
  function house(x0,w,h,o){ const yb=GROUND-38, yt=yb-h;
    g.fillStyle=o.wall; g.fillRect(x0,yt,w,h);
    g.strokeStyle='rgba(0,0,0,0.22)'; g.lineWidth=1; for(let y=yt+9;y<yb;y+=9){ g.beginPath(); g.moveTo(x0,y); g.lineTo(x0+w,y); g.stroke(); }
    g.strokeStyle='rgba(255,255,255,0.05)'; for(let y=yt+10;y<yb;y+=9){ g.beginPath(); g.moveTo(x0,y); g.lineTo(x0+w,y); g.stroke(); }
    g.fillStyle='rgba(255,255,255,0.06)'; g.fillRect(x0,yt,5,h); g.fillRect(x0+w-5,yt,5,h);
    if(o.chim){ g.fillStyle='#1b1a26'; g.fillRect(x0+w*0.72,yt-o.roof-10,22,o.roof*0.8); g.fillStyle='#2a2836'; g.fillRect(x0+w*0.72-3,yt-o.roof-14,28,6); }
    g.fillStyle=o.roofC; g.beginPath(); g.moveTo(x0-16,yt+2); g.lineTo(x0+w/2,yt-o.roof); g.lineTo(x0+w+16,yt+2); g.closePath(); g.fill();
    g.save(); g.clip(); g.strokeStyle='rgba(0,0,0,0.3)'; g.lineWidth=1.2;
    for(let y=yt-o.roof;y<yt+4;y+=8){ g.beginPath(); g.moveTo(x0-20,y); g.lineTo(x0+w+20,y); g.stroke();
      for(let x=x0-20+((y/8)%2)*7;x<x0+w+20;x+=14){ g.beginPath(); g.moveTo(x,y); g.lineTo(x,y+8); g.stroke(); } }
    g.restore();
    g.fillStyle='rgba(0,0,0,0.35)'; g.fillRect(x0-16,yt+2,w+32,5);
    for(const [wx,wy,ww,wh,lit] of o.wins) win(x0+wx,yt+wy,ww,wh,lit);
    if(o.door){ const dx=x0+o.door, dy=yb-150; g.fillStyle='#3a2a20'; g.fillRect(dx-4,dy-4,64,154); g.fillStyle='#2a1c14'; g.fillRect(dx,dy,56,150);
      g.strokeStyle='rgba(0,0,0,0.45)'; g.strokeRect(dx+8,dy+10,40,55); g.strokeRect(dx+8,dy+78,40,60); g.fillStyle='#c9a24a'; g.beginPath(); g.arc(dx+46,dy+80,3,0,Math.PI*2); g.fill();
      g.fillStyle='#3b3c4a'; g.fillRect(dx-12,yb-6,80,8); }
    for(let i=0;i<Math.floor(w/34);i++){ const bx=x0+12+i*34+hash(x0+i)*8, r=14+hash(x0*3+i)*8;
      g.fillStyle='#14281f'; g.beginPath(); g.arc(bx,yb-4,r,Math.PI,0); g.fill(); g.fillStyle='rgba(80,140,100,0.18)'; g.beginPath(); g.arc(bx-4,yb-r*0.6,r*0.45,0,Math.PI*2); g.fill(); } }
  function apt(x0,w,nf,o){ const fh=92, yb=GROUND-38, yt=yb-nf*fh;
    g.fillStyle=o.wall; g.fillRect(x0,yt,w,nf*fh);
    g.fillStyle='rgba(255,255,255,0.06)'; g.fillRect(x0,yt,5,nf*fh); g.fillRect(x0+w-5,yt,5,nf*fh);
    g.fillStyle=o.roofC; g.fillRect(x0-7,yt-14,w+14,16);
    g.fillStyle='rgba(0,0,0,0.3)'; for(let f=1;f<nf;f++) g.fillRect(x0,yb-f*fh-3,w,5);
    const n=Math.max(2,Math.floor((w-20)/64)), gap=(w-n*46)/(n+1);
    for(let f=0;f<nf;f++){ const ty=yb-(f+1)*fh;
      for(let i=0;i<n;i++){ if(f===0 && i===Math.floor(n/2)) continue; win(x0+gap+i*(46+gap), ty+20, 46, 52, hash(x0*0.37+f*13.1+i*5.3)<0.78); } }
    const dx=x0+gap+Math.floor(n/2)*(46+gap); g.fillStyle='#2a1c14'; g.fillRect(dx,yb-74,46,74); g.fillStyle='#3b3c4a'; g.fillRect(dx-8,yb-6,62,8); }
  function win(x,y,w,h,lit){ g.fillStyle='#d9d3c4'; g.fillRect(x-5,y-5,w+10,h+10);
    if(lit){ const gr=g.createLinearGradient(0,y,0,y+h); gr.addColorStop(0,'#ffdca0'); gr.addColorStop(1,'#eaa452'); g.fillStyle=gr; g.fillRect(x,y,w,h);
      g.fillStyle='rgba(180,70,60,0.55)'; g.fillRect(x,y,w*0.22,h); g.fillRect(x+w*0.78,y,w*0.22,h); }
    else { const gr=g.createLinearGradient(x,y,x+w,y+h); gr.addColorStop(0,'#2b3456'); gr.addColorStop(1,'#151a30'); g.fillStyle=gr; g.fillRect(x,y,w,h);
      g.fillStyle='rgba(255,255,255,0.07)'; g.beginPath(); g.moveTo(x+w*0.15,y); g.lineTo(x+w*0.45,y); g.lineTo(x+w*0.1,y+h*0.6); g.lineTo(x,y+h*0.6); g.closePath(); g.fill(); }
    g.strokeStyle='#d9d3c4'; g.lineWidth=3; g.beginPath(); g.moveTo(x+w/2,y); g.lineTo(x+w/2,y+h); g.moveTo(x,y+h/2); g.lineTo(x+w,y+h/2); g.stroke();
    g.fillStyle='#bfb8a8'; g.fillRect(x-9,y+h+5,w+18,6); }
  function tree(x,s){ const yb=GROUND-38; g.fillStyle='#1a1410'; g.fillRect(x-6*s,yb-110*s,12*s,110*s);
    for(const [dx,dy,r,c] of [[0,-150,62,'#0f1f1a'],[-40,-120,48,'#10231c'],[42,-118,50,'#0e1d18'],[-14,-190,46,'#132820'],[26,-170,44,'#11241d']]){ g.fillStyle=c; g.beginPath(); g.arc(x+dx*s,yb+dy*s,r*s,0,Math.PI*2); g.fill(); }
    g.fillStyle='rgba(150,170,220,0.10)'; for(const [dx,dy,r] of [[-20,-205,24],[30,-185,20],[-50,-140,18]]){ g.beginPath(); g.arc(x+dx*s,yb+dy*s,r*s,0,Math.PI*2); g.fill(); } }
  function fence(x0,x1){ const yb=GROUND-34; g.fillStyle='#cfc9bb';
    for(let x=x0;x<x1;x+=14){ g.beginPath(); g.moveTo(x,yb); g.lineTo(x,yb-40); g.lineTo(x+5,yb-47); g.lineTo(x+10,yb-40); g.lineTo(x+10,yb); g.closePath(); g.fill(); }
    g.fillRect(x0,yb-32,x1-x0,5); g.fillRect(x0,yb-14,x1-x0,5); g.fillStyle='rgba(0,0,0,0.25)'; for(let x=x0;x<x1;x+=14) g.fillRect(x+7,yb-40,3,40); }
  const paint=(x0,y0,x1,y1,sc,fn)=>{ const c=document.createElement('canvas'); c.width=Math.round((x1-x0)*sc); c.height=Math.round((y1-y0)*sc);
    const prev=g; g=c.getContext('2d'); g.setTransform(sc,0,0,sc,-x0*sc,-y0*sc); fn(); g=prev; return {c,x0,y0,w:x1-x0,h:y1-y0}; };
  const blit=B=>g.drawImage(B.c,B.x0,B.y0,B.w,B.h);
  function paintStreet(){ return paint(BX0,BY0,BX1,BY1,BS,()=>{
    let gr=g.createLinearGradient(0,BY0,0,GROUND); gr.addColorStop(0,'#050817'); gr.addColorStop(0.55,'#121637'); gr.addColorStop(1,'#2d2752'); g.fillStyle=gr; g.fillRect(BX0,BY0,BX1-BX0,BY1-BY0);
    for(let i=0;i<260;i++){ const x=BX0+hash(i)*(BX1-BX0), y=BY0+hash(i+500)*560, r=0.4+hash(i+900)*1.1; g.fillStyle=`rgba(255,255,255,${0.25+hash(i+77)*0.6})`; g.beginPath(); g.arc(x,y,r,0,Math.PI*2); g.fill(); }
    for(let i=0;i<9;i++){ const x=BX0+hash(i+40)*(BX1-BX0), y=40+hash(i+60)*300; g.fillStyle='rgba(120,130,190,0.06)'; for(let k=0;k<5;k++){ g.beginPath(); g.ellipse(x+k*40,y+hash(i*7+k)*12,70,18,0,0,Math.PI*2); g.fill(); } }
    glow(80,110,120,0.3,'190,200,255'); g.fillStyle='#eef0ff'; g.beginPath(); g.arc(80,110,34,0,Math.PI*2); g.fill();
    g.fillStyle='rgba(150,155,190,0.35)'; for(const [dx,dy,r] of [[-10,-8,7],[9,6,5],[-4,12,4],[12,-12,3]]){ g.beginPath(); g.arc(80+dx,110+dy,r,0,Math.PI*2); g.fill(); }
    for(let x=BX0;x<BX1;x+=46){ const h=120+hash(x)*170; g.fillStyle='#0d1027'; g.fillRect(x,GROUND-60-h,40,h+20);
      for(let yy=GROUND-50-h;yy<GROUND-70;yy+=14) for(let xx=x+5;xx<x+36;xx+=9) if(hash(xx*3.1+yy)<0.18){ g.fillStyle='rgba(255,210,130,0.55)'; g.fillRect(xx,yy,4,6); } }
    g.fillStyle='#0b0e21'; for(let x=BX0;x<BX1;x+=30){ g.beginPath(); g.arc(x,GROUND-60,26+hash(x+3)*14,Math.PI,0); g.fill(); }
    tree(-850,1.1); apt(-805,195,3,{wall:'#2b3150',roofC:'#1a1d33'}); fence(-600,-560); apt(-520,205,4,{wall:'#33304a',roofC:'#211d32'});
    house(-270,200,290,{wall:'#283a4a',roofC:'#18232f',roof:78,chim:true,door:24,wins:[[110,40,60,66,0],[110,165,60,66,1]]});
    fence(-62,-10); tree(-30,1.15);
    house(HX,HW,470,{wall:'#3a3552',roofC:'#231f36',roof:120,chim:true,door:26,wins:[[22,58,74,96,0],[150,330,90,82,0]]});
    g.fillStyle='#bfb8a8'; g.fillRect(HX,HY-250,HW,7);
    { const bx=WIN.x-9, by=WIN.y+WIN.h+11; g.fillStyle='#5a3a24'; g.fillRect(bx,by,WIN.w+18,14); for(let i=0;i<9;i++){ g.fillStyle=['#e53950','#ffd54f','#ff7aa8'][i%3]; g.beginPath(); g.arc(bx+8+i*14,by-2+hash(i)*4,4,0,Math.PI*2); g.fill(); } }
    glow(HX+56,HY-190,30,0.6,'255,210,140'); g.fillStyle='#ffe0a0'; g.fillRect(HX+52,HY-196,8,10);
    fence(HX+100,HX+HW+40); fence(BX0,BX0+90);
    g.fillStyle='#3d4a6a'; g.fillRect(HX+92,GROUND-100,6,62); g.fillStyle='#2a6f9a'; g.fillRect(HX+80,GROUND-118,30,22); g.fillStyle='#d23b3b'; g.fillRect(HX+106,GROUND-118,4,12);
    g.fillStyle='#262a3c'; g.fillRect(BX0,GROUND-38,BX1-BX0,58);
    g.strokeStyle='rgba(0,0,0,0.35)'; g.lineWidth=1; for(let x=BX0;x<BX1;x+=48){ g.beginPath(); g.moveTo(x,GROUND-38); g.lineTo(x-10,GROUND+20); g.stroke(); }
    g.beginPath(); g.moveTo(BX0,GROUND-10); g.lineTo(BX1,GROUND-10); g.stroke();
    g.fillStyle='#3a3f55'; g.fillRect(BX0,GROUND+20,BX1-BX0,8); g.fillStyle='#14161f'; g.fillRect(BX0,GROUND+28,BX1-BX0,BY1-GROUND);
    g.fillStyle='rgba(230,200,90,0.35)'; for(let x=BX0;x<BX1;x+=70) g.fillRect(x,GROUND+92,38,5);
    g.strokeStyle='rgba(10,10,18,0.9)'; g.lineWidth=1.2;
    for(let i=0;i<LAMPS.length-1;i++){ const a=LAMPS[i], b=LAMPS[i+1]; for(const dy of [0,8]){ g.beginPath(); g.moveTo(a,GROUND-400+dy); g.quadraticCurveTo((a+b)/2,GROUND-340+dy,b,GROUND-400+dy); g.stroke(); } }
    for(const lx of LAMPS){ g.fillStyle='#22242f'; g.fillRect(lx-4,GROUND-400,8,368); g.fillRect(lx-4,GROUND-400,26,5); g.fillStyle='#2e3140'; g.fillRect(lx+14,GROUND-398,14,8); g.fillRect(lx-8,GROUND-40,16,8); }
  }); }
  function streetLive(t,lampSkip){
    for(let i=0;i<40;i++){ const x=BX0+hash(i+1200)*(BX1-BX0), y=BY0+hash(i+1300)*520, a=Math.max(0,Math.sin(t*2+i*1.7))*0.8;
      if(a>0.05){ g.fillStyle=`rgba(255,255,255,${a})`; g.fillRect(x-0.6,y-2.5,1.2,5); g.fillRect(x-2.5,y-0.6,5,1.2); } }
    for(const lx of LAMPS){ if(lx===lampSkip) continue; const fl=0.9+0.1*Math.sin(t*13+lx);
      glow(lx+21,GROUND-390,70,0.5*fl,'255,215,140');
      g.save(); g.globalAlpha=0.16*fl; const gr=g.createLinearGradient(0,GROUND-390,0,GROUND); gr.addColorStop(0,'rgba(255,220,150,1)'); gr.addColorStop(1,'rgba(255,220,150,0)');
      g.fillStyle=gr; g.beginPath(); g.moveTo(lx+16,GROUND-390); g.lineTo(lx-70,GROUND+16); g.lineTo(lx+112,GROUND+16); g.closePath(); g.fill(); g.restore();
      g.save(); g.globalAlpha=0.22*fl; g.fillStyle='#ffd99a'; g.beginPath(); g.ellipse(lx+21,GROUND-8,80,14,0,0,Math.PI*2); g.fill(); g.restore(); } }
  // 💡 cửa sổ tầng 2: on = sáng đèn · shadows = 2 cái bóng chụm đầu đúng y Ep 1
  function window2(t,on,shadows){ const W0=WIN;
    if(on<=0.01){ g.fillStyle='#0c0e18'; g.fillRect(W0.x-6,W0.y-6,W0.w+12,W0.h+12); g.fillStyle='#d9d3c4'; g.fillRect(W0.x-10,W0.y+W0.h+5,W0.w+20,6); return; }
    glow(W0.x+W0.w/2,W0.y+W0.h/2,180,0.34*on,'255,200,110');
    g.fillStyle='#d9d3c4'; g.fillRect(W0.x-6,W0.y-6,W0.w+12,W0.h+12);
    g.fillStyle='#0c0e18'; g.fillRect(W0.x,W0.y,W0.w,W0.h);
    g.save(); g.globalAlpha=on; let gr=g.createLinearGradient(0,W0.y,0,W0.y+W0.h); gr.addColorStop(0,'#ffe2ad'); gr.addColorStop(1,'#f1aa58'); g.fillStyle=gr; g.fillRect(W0.x,W0.y,W0.w,W0.h); g.restore();
    g.save(); g.beginPath(); g.rect(W0.x,W0.y,W0.w,W0.h); g.clip();
    g.fillStyle=`rgba(255,240,210,${0.35*on})`; for(let x=W0.x+6;x<W0.x+W0.w;x+=10) g.fillRect(x,W0.y,3,W0.h);
    if(shadows>0){ const sw=Math.sin(t*1.7)*0.035;
      actor(silhouette(IMG.wife,[170,0,270,300]), W0.x+W0.w*0.34, W0.y+W0.h+2, W0.h*0.6, {a:0.9*shadows, rot:0.12+sw, flip:true});
      actor(silhouette(IMG.chill,[0,0,213,250]), W0.x+W0.w*0.68, W0.y+W0.h+3, W0.h*0.74, {a:0.9*shadows, rot:-0.1-sw}); }
    g.fillStyle=`rgba(170,60,55,${0.85*on})`;
    g.beginPath(); g.moveTo(W0.x,W0.y); g.lineTo(W0.x+W0.w*0.13,W0.y); g.quadraticCurveTo(W0.x+W0.w*0.03,W0.y+W0.h*0.55,W0.x+W0.w*0.09,W0.y+W0.h); g.lineTo(W0.x,W0.y+W0.h); g.closePath(); g.fill();
    g.beginPath(); g.moveTo(W0.x+W0.w,W0.y); g.lineTo(W0.x+W0.w*0.87,W0.y); g.quadraticCurveTo(W0.x+W0.w*0.97,W0.y+W0.h*0.55,W0.x+W0.w*0.91,W0.y+W0.h); g.lineTo(W0.x+W0.w,W0.y+W0.h); g.closePath(); g.fill();
    g.restore();
    g.strokeStyle='#d9d3c4'; g.lineWidth=3; g.beginPath(); g.moveTo(W0.x+W0.w/2,W0.y); g.lineTo(W0.x+W0.w/2,W0.y+W0.h); g.stroke();
    g.fillStyle='#bfb8a8'; g.fillRect(W0.x-10,W0.y+W0.h+5,W0.w+20,6); }
  // 💐 bó hoa + 🤕 mặt bầm của Depressed Cat (chép nguyên Ep 1)
  function bouquet(x,y,sc,dir,rot){
    g.save(); g.translate(x,y); g.scale(dir*sc,sc); g.rotate(rot==null?-0.25:rot);
    g.fillStyle='#3f8f3a'; for(const a of [-0.7,-0.2,0.35,0.8]){ g.save(); g.rotate(a); g.beginPath(); g.ellipse(0,-30,5,14,0,0,Math.PI*2); g.fill(); g.restore(); }
    for(const [fx,fy,r,c] of [[-10,-30,8,'#e53950'],[6,-36,8,'#ff7aa8'],[14,-24,7,'#e53950'],[-2,-20,7,'#ffd54f'],[-14,-18,6,'#ff7aa8'],[2,-44,6,'#ffd54f']]){
      g.fillStyle=c; for(let k=0;k<5;k++){ const a=k*1.2566; g.beginPath(); g.arc(fx+Math.cos(a)*r*0.55,fy+Math.sin(a)*r*0.55,r*0.55,0,Math.PI*2); g.fill(); }
      g.fillStyle='rgba(120,20,40,0.6)'; g.beginPath(); g.arc(fx,fy,r*0.3,0,Math.PI*2); g.fill(); }
    g.fillStyle='#f6a8c8'; g.beginPath(); g.moveTo(-24,-18); g.lineTo(24,-18); g.lineTo(3,30); g.lineTo(-3,30); g.closePath(); g.fill();
    g.fillStyle='rgba(255,255,255,0.35)'; g.beginPath(); g.moveTo(-24,-18); g.lineTo(-4,-18); g.lineTo(-1,30); g.closePath(); g.fill();
    g.fillStyle='#d81b60'; g.fillRect(-6,6,12,6); g.restore(); }
  const HURT_DP={ex:0.323,ey:0.405,r:0.09,bx:0.77,by:0.5,bl:0.24,bw:0.085};
  const CRY_EYE_OFF=[[0,0],[-1,-1],[-1,-3],[-1,-3],[-1,-5],[-1,-4],[-3,-4],[-4,-3],[-5,-3],[-6,-3],[-7,-2],[-7,-2],[-6,-2],[-4,-2],[-3,-1],[-2,-2],[-2,-2],[-3,-2],[-3,-2],[-3,-2],[-3,-2],[-3,-2],[-2,-3],[-2,-3],[-2,-3],[-2,-2],[-2,-2],[5,2],[6,0],[7,-2],[8,-3],[8,-3],[7,-3],[6,-3],[6,-4],[4,-4],[3,-5],[1,-5],[-1,-6],[-4,-6],[-4,-5],[-5,-5],[-5,-4],[-3,-5],[-1,-5],[0,-4]];
  function hurtCry(k){ const [dx,dy]=CRY_EYE_OFF[k]||[0,0]; return {ex:(62+dx)/210, ey:(133+dy)/340, r:0.102, bx:(164+dx)/210, by:(172+dy)/340, bl:0.27, bw:0.097}; }
  function hurt(w,h,E){ E=E||HURT_DP;
    const P=(fx,fy)=>[-w/2+fx*w, -h+fy*h], [ex,ey]=P(E.ex,E.ey), r=w*E.r;
    const blob=(x,y,rx,ry,rot,stops)=>{ const gr=g.createRadialGradient(x,y,0,x,y,Math.max(rx,ry)); for(const [k,c] of stops) gr.addColorStop(k,c);
      g.save(); g.translate(x,y); g.rotate(rot); g.scale(rx/Math.max(rx,ry),ry/Math.max(rx,ry)); g.translate(-x,-y); g.fillStyle=gr; g.beginPath(); g.arc(x,y,Math.max(rx,ry),0,Math.PI*2); g.fill(); g.restore(); };
    g.save(); g.globalCompositeOperation='multiply';
    blob(ex+r*0.1,ey+r*0.35,r*2.1,r*1.6,0.3,[[0,'rgba(190,50,70,0.8)'],[0.55,'rgba(205,80,95,0.5)'],[1,'rgba(220,110,110,0)']]);
    blob(ex,ey+r*0.15,r*1.45,r*1.2,0.2,[[0,'rgba(110,60,130,0.2)'],[0.4,'rgba(70,20,90,0.7)'],[0.75,'rgba(110,40,120,0.45)'],[1,'rgba(120,50,130,0)']]);
    g.strokeStyle='rgba(170,25,35,0.7)'; g.lineCap='round';
    for(let k=0;k<5;k++){ const sx=ex-r*1.55+k*r*0.16, sy=ey+r*0.55+k*r*0.12; g.lineWidth=r*(0.07+0.03*(k%2)); g.beginPath(); g.moveTo(sx,sy); g.lineTo(sx+r*0.55,sy+r*0.5); g.stroke(); }
    g.restore();
    blob(ex-r*0.1,ey-r*0.68,r*0.8,r*0.28,0.25,[[0,'rgba(255,220,235,0.22)'],[1,'rgba(255,220,235,0)']]);
    blob(ex+r*0.05,ey+r*0.78,r*0.75,r*0.26,0.2,[[0,'rgba(255,220,235,0.16)'],[1,'rgba(255,220,235,0)']]);
    g.save(); g.strokeStyle='rgba(50,10,40,0.45)'; g.lineWidth=r*0.08; g.beginPath(); g.ellipse(ex+r*0.05,ey+r*0.5,r*0.75,r*0.35,0.2,0.15*Math.PI,0.85*Math.PI); g.stroke(); g.restore();
    const [bx,by]=P(E.bx,E.by), bl=w*E.bl, bw=w*E.bw;
    g.save(); g.translate(bx,by); g.rotate(0.28);
    const pill=(x,y,ww,hh,rr)=>{ g.beginPath(); g.moveTo(x+rr,y); g.lineTo(x+ww-rr,y); g.arcTo(x+ww,y,x+ww,y+rr,rr); g.lineTo(x+ww,y+hh-rr); g.arcTo(x+ww,y+hh,x+ww-rr,y+hh,rr); g.lineTo(x+rr,y+hh); g.arcTo(x,y+hh,x,y+hh-rr,rr); g.lineTo(x,y+rr); g.arcTo(x,y,x+rr,y,rr); g.closePath(); };
    g.fillStyle='rgba(0,0,0,0.2)'; pill(-bw/2+1.2,-bl/2+1.8,bw,bl,bw/2); g.fill();
    g.fillStyle='#e8c4a0'; pill(-bw/2,-bl/2,bw,bl,bw/2); g.fill(); g.strokeStyle='rgba(120,80,50,0.55)'; g.lineWidth=0.9; g.stroke();
    g.fillStyle='#f6e6d2'; g.fillRect(-bw*0.36,-bl*0.17,bw*0.72,bl*0.34); g.strokeRect(-bw*0.36,-bl*0.17,bw*0.72,bl*0.34);
    g.restore(); }

  // ───────────────────── 🧱 HẺM TỐI (cảnh 1–2) ─────────────────────
  const AX0=-900, AX1=600, CORNER=470;
  function paintAlley(){ return paint(AX0,BY0,AX1,BY1,BS,()=>{
    let gr=g.createLinearGradient(0,BY0,0,GROUND); gr.addColorStop(0,'#04050c'); gr.addColorStop(1,'#141428'); g.fillStyle=gr; g.fillRect(AX0,BY0,AX1-AX0,BY1-BY0);
    // tường gạch hẻm (sau lưng) — từng hàng gạch lệch nhau, gạch sẫm màu khác nhau chút
    const yTop=GROUND-520; g.fillStyle='#1d1820'; g.fillRect(AX0,yTop,AX1-AX0,GROUND-38-yTop);
    for(let y=yTop, r=0;y<GROUND-38;y+=18, r++) for(let x=AX0-(r%2)*22;x<AX1;x+=44){ const k=hash(x*0.13+y*0.7);
      g.fillStyle=`rgb(${30+18*k|0},${22+12*k|0},${28+12*k|0})`; g.fillRect(x+1,y+1,42,16); }
    g.fillStyle='rgba(0,0,0,0.35)'; for(let y=yTop;y<GROUND-38;y+=18) g.fillRect(AX0,y,AX1-AX0,2);
    // ống nước, cửa sắt, thùng rác
    g.fillStyle='#2a2a35'; g.fillRect(-420,yTop,10,GROUND-38-yTop); g.fillRect(-424,GROUND-120,18,8); g.fillRect(140,yTop,10,GROUND-38-yTop);
    g.fillStyle='#22242c'; g.fillRect(-690,GROUND-210,92,172); g.strokeStyle='rgba(255,255,255,0.06)'; for(let y=GROUND-200;y<GROUND-40;y+=12){ g.beginPath(); g.moveTo(-686,y); g.lineTo(-602,y); g.stroke(); }
    g.fillStyle='#1f3a2e'; g.fillRect(-230,GROUND-110,120,72); g.fillStyle='#16291f'; g.fillRect(-236,GROUND-120,132,14); g.fillStyle='rgba(255,255,255,0.05)'; g.fillRect(-226,GROUND-104,4,60);
    // 🧱 GÓC TƯỜNG cuối hẻm: mảng tường vuông góc nhô ra (sáng hơn chút) + bóng đổ góc
    g.fillStyle='#2b232c'; g.beginPath(); g.moveTo(CORNER,yTop-30); g.lineTo(AX1,yTop-70); g.lineTo(AX1,GROUND+30); g.lineTo(CORNER,GROUND-38); g.closePath(); g.fill();
    for(let y=yTop;y<GROUND-38;y+=18){ g.strokeStyle='rgba(0,0,0,0.3)'; g.beginPath(); g.moveTo(CORNER,y); g.lineTo(AX1,y-40*(1-(y-yTop)/(GROUND-yTop))); g.stroke(); }
    gr=g.createLinearGradient(CORNER-80,0,CORNER,0); gr.addColorStop(0,'rgba(0,0,0,0)'); gr.addColorStop(1,'rgba(0,0,0,0.55)'); g.fillStyle=gr; g.fillRect(CORNER-80,yTop,80,GROUND-38-yTop);
    // nền hẻm: nhựa đường loang + vũng nước phản chiếu
    g.fillStyle='#17161f'; g.fillRect(AX0,GROUND-38,AX1-AX0,BY1-GROUND+38);
    for(let i=0;i<16;i++){ const x=AX0+hash(i+50)*(AX1-AX0), w=40+hash(i+51)*90; g.fillStyle=`rgba(90,100,140,${0.08+0.08*hash(i+52)})`; g.beginPath(); g.ellipse(x,GROUND+10+hash(i+53)*60,w,w*0.12,0,0,Math.PI*2); g.fill(); }
    // đèn tường duy nhất (yếu, vàng bệnh)
    g.fillStyle='#2e2e38'; g.fillRect(36,GROUND-330,30,8); g.fillStyle='#d8c27a'; g.fillRect(52,GROUND-322,12,8);
  }); }
  function alleyLive(t){ const fl=0.75+0.25*Math.sin(t*31)*Math.sin(t*7.3);   // đèn tường chập chờn
    glow(58,GROUND-312,160,0.32*fl,'230,200,120');
    g.save(); g.globalAlpha=0.12*fl; g.fillStyle='#e8d090'; g.beginPath(); g.moveTo(52,GROUND-316); g.lineTo(-140,GROUND+10); g.lineTo(250,GROUND+10); g.closePath(); g.fill(); g.restore(); }
  // 🌑 bóng tối dày đặc ở mép trái (nơi mấy cánh tay bò ra)
  function darkness(x1,a){ const gr=g.createLinearGradient(x1-260,0,x1,0); gr.addColorStop(0,`rgba(2,1,6,${a})`); gr.addColorStop(1,'rgba(2,1,6,0)'); g.fillStyle=gr; g.fillRect(x1-260,BY0,260,BY1-BY0); g.fillStyle=`rgba(2,1,6,${a})`; g.fillRect(AX0-200,BY0,x1-260-AX0+200,BY1-BY0); }

  // ───────────────────── 🖐️ BÀN TAY BÓNG TỐI ─────────────────────
  // ảnh tay: ngón chĩa sang PHẢI, cổ tay bên TRÁI → vẽ cổ tay tại (x,y), xoay rot · cánh tay = dải đen cong nối từ trong bóng tối tới cổ tay
  function arm(x0,y0,x1,y1,w,sag){ g.save(); g.strokeStyle='#050308'; g.lineCap='round'; g.shadowColor='rgba(120,40,160,0.45)'; g.shadowBlur=14;
    g.lineWidth=w; g.beginPath(); g.moveTo(x0,y0); g.quadraticCurveTo((x0+x1)/2,Math.max(y0,y1)+(sag||40),x1,y1); g.stroke(); g.restore(); }
  function hand(im,x,y,L,rot,a){ const c=prep(im); if(!c) return; const Hh=L*c.sh/c.sw;
    g.save(); g.globalAlpha=a==null?1:a; g.translate(x,y); g.rotate(rot||0); g.shadowColor='rgba(150,60,200,0.5)'; g.shadowBlur=10; g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,-L*0.06,-Hh/2,L,Hh); g.restore(); }
  // 💥 tay bị đá gãy: cắt ảnh tay thành 4×3 mảnh văng ra + khói đen
  function handShatter(im,x,y,L,rot,u){ const c=prep(im); if(!c) return; const Hh=L*c.sh/c.sw, N=4, M=3;
    for(let a=0;a<N;a++) for(let b=0;b<M;b++){ const q=a*M+b, ang=-0.6+hash(q+40)*1.9, sp=160+260*hash(q+41), px=x+((a+0.5)/N-0.06)*L*Math.cos(rot), py=y+((a+0.5)/N)*L*Math.sin(rot)+((b+0.5)/M-0.5)*Hh;
      const dx=Math.cos(ang)*sp*u, dy=Math.sin(ang)*sp*u-120*u+480*u*u, fa=1-seg(u,0.45,1); if(fa<=0) continue;
      g.save(); g.globalAlpha=fa; g.translate(px+dx,py+dy); g.rotate(rot+(hash(q+42)-0.5)*9*u); g.drawImage(c.src,c.sx+a*c.sw/N,c.sy+b*c.sh/M,c.sw/N,c.sh/M,-L/N/2,-Hh/M/2,L/N,Hh/M); g.restore(); }
    for(let k=0;k<9;k++){ const ang=hash(k+60)*Math.PI*2, d=(30+60*hash(k+61))*eout(u), r=(18+22*hash(k+62))*(0.6+u); g.save(); g.globalAlpha=0.55*(1-u); g.fillStyle='#08040c';
      g.beginPath(); g.arc(x+L*0.4+Math.cos(ang)*d,y+Math.sin(ang)*d*0.7,r,0,Math.PI*2); g.fill(); g.restore(); } }
  // ✴️ khung va chạm: chớp + tia tốc độ quanh điểm
  function burst(x,y,t,ts,dur,col,R){ const u=(t-ts)/dur; if(u<0||u>=1) return;   // chỉ vẽ ĐÚNG khoảng [ts, ts+dur) g.save(); g.globalCompositeOperation='lighter'; glow(x,y,(R||90)*(0.5+u),0.9*(1-u),col||'255,255,255');
    g.strokeStyle=`rgba(255,255,255,${1-u})`; g.lineCap='round'; for(let i=0;i<12;i++){ const a=i/12*Math.PI*2+0.2, r0=(R||90)*0.3*(1+u), r1=r0+(R||90)*0.7*(1-u*0.5); g.lineWidth=3*(1-u)+0.5; g.beginPath(); g.moveTo(x+Math.cos(a)*r0,y+Math.sin(a)*r0); g.lineTo(x+Math.cos(a)*r1,y+Math.sin(a)*r1); g.stroke(); } g.restore(); }
  // 🩸 3 vết rạch móng vuốt: mảnh, THON 2 đầu (lưỡi liềm hẹp), lõi đỏ tươi viền đỏ sẫm, vài giọt máu rỉ xuống — (x,y) = tâm vết, ang = hướng rạch
  function clawMarks(x,y,s,a,ang){ if(a<=0.01) return; const an=ang==null?1.05:ang; g.save(); g.globalAlpha=a; g.translate(x,y); g.rotate(an);
    const L=30*s, W=2.6*s;
    for(let i=0;i<3;i++){ const oy=(i-1)*7*s, ox=(i-1)*2*s, l=L*(i===1?1:0.86);
      const sliver=(w)=>{ g.beginPath(); g.moveTo(ox-l/2,oy); g.quadraticCurveTo(ox,oy-w,ox+l/2,oy); g.quadraticCurveTo(ox,oy+w*0.6,ox-l/2,oy); g.closePath(); };
      g.fillStyle='rgba(60,0,4,0.85)'; sliver(W*1.6); g.fill(); g.fillStyle='#c4141e'; sliver(W); g.fill(); g.fillStyle='rgba(255,120,120,0.55)'; sliver(W*0.35); g.fill();
      for(let d=0;d<2;d++){ const dx=ox-l*0.15+d*l*0.3, dl=(3+4*hash(i*3+d))*s; g.save(); g.translate(dx,oy+W*0.3); g.rotate(-an); g.strokeStyle='#a00c14'; g.lineWidth=1.1*s; g.lineCap='round'; g.beginPath(); g.moveTo(0,0); g.lineTo(0,dl); g.stroke(); g.restore(); } }   // giọt máu rỉ THẲNG xuống
    g.restore(); }

  // ───────────────────── 🛋️ TRONG PHÒNG (cảnh 4) ─────────────────────
  const RX0=-60, RX1=600;
  function paintRoom(){ return paint(RX0,BY0,RX1,BY1,BS,()=>{
    let gr=g.createLinearGradient(0,BY0,0,GROUND); gr.addColorStop(0,'#3a2420'); gr.addColorStop(1,'#6b4232'); g.fillStyle=gr; g.fillRect(RX0,BY0,RX1-RX0,GROUND-BY0);
    g.fillStyle='rgba(255,220,180,0.05)'; for(let x=RX0;x<RX1;x+=26) g.fillRect(x,BY0,10,GROUND-BY0);   // giấy dán tường sọc
    g.fillStyle='#4a2c1e'; g.fillRect(RX0,GROUND-70,RX1-RX0,14);   // len chân tường
    // cửa sổ trong phòng (sau lưng 2 người): đêm ngoài trời + rèm đỏ (đúng rèm Ep 1)
    const wx=170, wy=250, ww=230, wh=210; g.fillStyle='#d9d3c4'; g.fillRect(wx-10,wy-10,ww+20,wh+20);
    gr=g.createLinearGradient(0,wy,0,wy+wh); gr.addColorStop(0,'#0b1030'); gr.addColorStop(1,'#232552'); g.fillStyle=gr; g.fillRect(wx,wy,ww,wh);
    for(let i=0;i<30;i++){ g.fillStyle=`rgba(255,255,255,${0.3+0.5*hash(i+300)})`; g.fillRect(wx+hash(i+301)*ww,wy+hash(i+302)*wh*0.7,1.4,1.4); }
    glow(wx+ww*0.78,wy+46,40,0.35,'200,210,255'); g.fillStyle='#eef0ff'; g.beginPath(); g.arc(wx+ww*0.78,wy+46,15,0,Math.PI*2); g.fill();
    g.strokeStyle='#d9d3c4'; g.lineWidth=5; g.beginPath(); g.moveTo(wx+ww/2,wy); g.lineTo(wx+ww/2,wy+wh); g.moveTo(wx,wy+wh/2); g.lineTo(wx+ww,wy+wh/2); g.stroke();
    g.fillStyle='#a8382f'; g.beginPath(); g.moveTo(wx-30,wy-30); g.lineTo(wx+40,wy-30); g.quadraticCurveTo(wx+8,wy+wh*0.6,wx+26,wy+wh+40); g.lineTo(wx-30,wy+wh+40); g.closePath(); g.fill();
    g.beginPath(); g.moveTo(wx+ww+30,wy-30); g.lineTo(wx+ww-40,wy-30); g.quadraticCurveTo(wx+ww-8,wy+wh*0.6,wx+ww-26,wy+wh+40); g.lineTo(wx+ww+30,wy+wh+40); g.closePath(); g.fill();
    g.fillStyle='#6a1e1a'; g.fillRect(wx-40,wy-40,ww+80,12);
    // tranh treo tường + đèn cây
    g.fillStyle='#7a5a2a'; g.fillRect(-20,330,110,80); g.fillStyle='#c7b48a'; g.fillRect(-12,338,94,64); g.fillStyle='rgba(80,110,150,0.6)'; g.beginPath(); g.moveTo(-12,402); g.lineTo(30,360); g.lineTo(82,402); g.fill();
    g.fillStyle='#2a1c14'; g.fillRect(500,GROUND-330,8,300); g.fillStyle='#e8c28a'; g.beginPath(); g.moveTo(470,GROUND-330); g.lineTo(538,GROUND-330); g.lineTo(524,GROUND-390); g.lineTo(484,GROUND-390); g.closePath(); g.fill();
    // sàn gỗ
    g.fillStyle='#4a2e1e'; g.fillRect(RX0,GROUND-56,RX1-RX0,BY1-GROUND+56);
    g.strokeStyle='rgba(0,0,0,0.3)'; for(let y=GROUND-56;y<BY1;y+=22){ g.beginPath(); g.moveTo(RX0,y); g.lineTo(RX1,y); g.stroke(); }
    g.fillStyle='rgba(160,40,40,0.55)'; g.beginPath(); g.ellipse(270,GROUND+16,250,46,0,0,Math.PI*2); g.fill();   // thảm
  }); }

  // ───────────────────── 🐹 / 😎 / 🐱 trạng thái nhân vật theo t ─────────────────────
  const HM_H=56;   // chuột NHỎ (anh dặn) — Chill Guy cao ~175
  function hamX(t){ if(t<T.slap) return lerp(-560,300,eout(seg(t,0,T.slap))*0.98); if(t<T.hit) return 300; return lerp(300,CORNER-38,eout(seg(t,T.hit,T.corner))); }
  function scene1(t){
    blit(ALLEY); alleyLive(t);
    const hx=hamX(t), dk=0.94;
    // 🖐️ 2 tay: bò đuổi (luân phiên 2 khung bò, 8 hình/giây) → vươn lên vả → bò tới góc → xoè ngón áp sát
    const crawl=Math.floor(t*8)%2?IMG.crawlA:IMG.crawlB, L=240;   // tay TO gấp đôi (anh: bé quá không đủ lực)
    let h1x=hx-L-40, h2x=hx-L-190; if(t>=T.slap){ h1x=300-L*0.75; h2x=300-L*1.4; }
    if(t>=T.hit){ const u=seg(t,T.corner,T.grabTry); h1x=lerp(300-L*0.75,CORNER-L-40,eio(u)); h2x=lerp(300-L*1.4,CORNER-L+10,eio(u)); }
    const yb=GROUND-12;
    darkness(Math.min(hx-280,-250)+(t>=T.hit?200:0),dk);
    // tay 2 (sau) — bị đá gãy lúc T.kHit
    if(t<T.kHit){ const rise=seg(t,T.grabTry,T.kick), im=t<T.grabTry?crawl:(t<T.kick-0.2?IMG.closing:IMG.grip), y=yb-rise*120, r=-rise*0.9;
      arm(h2x-420,yb+40,h2x,y,58,40); hand(im,h2x,y,L*(1+0.3*rise),r); }
    else if(t<T.kHit+1.2) handShatter(IMG.grip,CORNER-L+10,yb-120,L*1.3,-0.9,seg(t,T.kHit,T.kHit+1.2));
    // tay 1 (trước): vả lúc T.slap · đuổi theo Chill Guy cào lưng lúc T.claw rồi rút về
    { let im=crawl, x=h1x, y=yb, r=0, s=1;
      if(t>=T.slap-0.3 && t<T.hit+0.25){ const u=seg(t,T.slap-0.3,T.hit); im=u<0.6?IMG.lunge:IMG.slap; y=yb-200*Math.sin(Math.min(1,u*1.3)*Math.PI*0.5)+(u>0.75?160*(u-0.75)*4:0); r=u<0.6?-1.0:-0.2+u*0.4; s=1.15; }
      if(t>=T.grabTry && t<T.run){ const rise=seg(t,T.grabTry,T.kick); im=t<T.kick-0.2?IMG.closing:IMG.grip; y=yb-rise*150; r=-rise*0.7; s=1+0.35*rise; }
      if(t>=T.run){ const cx=cgX(t), u=seg(t,T.run,T.claw); im=t<T.claw?IMG.lunge:(t<T.claw+0.15?IMG.slap:IMG.retreat); x=t<T.claw+0.15?lerp(CORNER-60,cx+L*0.85,eio(u)):lerp(cx+L*0.85,CORNER+200,seg(t,T.claw+0.15,T.claw+0.9));
        y=yb-120-50*Math.sin(u*Math.PI); r=t<T.claw+0.15?Math.PI+0.45:-0.3; s=1.0; }
      if(!(t>=T.claw+0.9)){ arm(t>=T.run?CORNER+380:x-420,yb+40,x,y,58,40); hand(im,x,y,L*s,r); } }
    // 🐹 Hamster: chạy → bị vả bay → co rúm ở góc (run run, vết cào)
    if(t>=T.sprout) sprout(t);   // 🖐️🖐️🖐️ tay mọc khắp nơi
    if(t<T.pick){ shadow(hx,24,0.35);
      if(t<T.hit){ const k=Math.floor(t*14)%10; actor(prep(IMG.run[k]),hx,GROUND+2-Math.abs(Math.sin(t*22))*6,HM_H*0.82,{}); }
      else if(t<T.corner){ const u=seg(t,T.hit,T.corner); actor(prep(IMG.scared),hx,GROUND+2-Math.sin(u*Math.PI)*70,HM_H,{rot:u*5}); }
      else { const tr=Math.sin(t*60)*1.6; actor(prep(IMG.scared),CORNER-38+tr,GROUND+2,HM_H,{after:(w,h)=>clawMarks(w*0.3,-h*0.66,0.26,0.85,1.2)}); } }   // vết cào nhỏ mảnh trên vai
    burst(300,GROUND-40,t,T.hit,0.25,'200,160,255',70);
    burst(CORNER-30,GROUND-30,t,T.corner,0.2,'255,255,255',60);
    // 😎 Chill Guy: đá bay từ trên trái xuống → đáp → nhặt Hamster → ôm chạy sang trái (bị cào lưng)
    if(t>=T.kick){ const kx=lerp(120,CORNER-170,eio(seg(t,T.kick,T.kHit))), ky=lerp(GROUND-420,GROUND-60,eio(seg(t,T.kick,T.kHit)));
      if(t<T.land){ actor(prep(IMG.kick),kx,ky+90,150,{rot:-0.15}); }
      else if(t<T.run){ const jump=t>=T.startle?Math.sin(Math.min(1,(t-T.startle)/0.3)*Math.PI)*34:0, jit=t>=T.startle&&t<T.startle+0.35?Math.sin(t*90)*3:0;   // 😳 giật mình nhảy dựng
        if(t<T.pick) actor(prep(IMG.chill),CORNER-150+jit,GROUND+2-jump,170,{sx:t>=T.startle&&t<T.startle+0.12?0.94:1, sy:t>=T.startle&&t<T.startle+0.12?1.08:1});
        else { shadow(CORNER-150,40,0.35); actor(prep(IMG.cgRun),CORNER-150,GROUND+2,172,{flip:true}); }
        if(t>=T.startle && t<T.pick+0.1){ const u=seg(t,T.startle,T.startle+0.2), bx=CORNER-140, by=GROUND-215-jump; g.save(); g.translate(bx,by); g.scale(eout(u),eout(u));
          g.fillStyle='#fff'; g.strokeStyle='#111'; g.lineWidth=3; g.beginPath(); g.arc(0,0,22,0,Math.PI*2); g.fill(); g.stroke(); g.fillStyle='#e53935'; g.font='900 26px "Arial Black",Impact,sans-serif'; g.textAlign='center'; g.textBaseline='middle'; g.fillText('!!',0,2); g.restore(); } }
      else { const cx=cgX(t), bob=Math.abs(Math.sin(t*16))*6, hit=t>=T.claw; shadow(cx,40,0.35);
        actor(prep(IMG.cgRun),cx,GROUND+2-bob,172,{flip:true, rot:hit&&t<T.claw+0.2?0.12:0.04, after:(w,h)=>clawMarks(-w*0.23,-h*0.62,1.0,hit?1:0,1.0)}); } }   // ảnh LẬT: lưng = x ÂM cục bộ
    burst(CORNER-120,GROUND-150,t,T.kHit,0.3,'255,240,200',120);
    if(t>=T.claw && t<T.claw+0.3){ const cx=cgX(t); burst(cx+30,GROUND-110,t,T.claw,0.3,'255,60,60',80); }
  }
  function cgX(t){ return lerp(CORNER-150,-620,eio(seg(t,T.run,T.fade1+0.5))); }
  // 🖐️ TAY MỌC KHẮP NƠI (sau cú đá): trồi lên từ vũng tối dưới đất, thò ra từ bóng tối bên trái, rủ xuống từ trên cao — lắc lư; Chill Guy chạy thì rút dần
  const SPROUT=[[-40,'g','grip'],[90,'g','closing'],[220,'g','lunge'],[330,'g','grip'],[0,'l','crawlA'],[0,'l2','slap'],[40,'t','closing'],[180,'t','grip'],[300,'t','lunge'],[420,'g','closing']];
  function sprout(t){ const yb=GROUND+6;
    SPROUT.forEach(([x,kind,ik],i)=>{ const im=IMG[ik], d=T.sprout+i*0.07, u=eout(seg(t,d,d+0.45)); if(u<=0) return; const back=t>=T.run?seg(t,T.run+0.3+i*0.04,T.run+0.9+i*0.04):0, k=u*(1-back); if(k<=0.01) return;
      const sw=Math.sin(t*5+i*1.7)*0.12, L=180+40*hash(i+90);
      if(kind==='g'){ g.save(); g.fillStyle='rgba(2,1,6,0.9)'; g.beginPath(); g.ellipse(x,yb,60*u,10*u,0,0,Math.PI*2); g.fill(); g.restore();   // vũng tối
        const y=yb-L*0.8*k; arm(x+20,yb+10,x,y+L*0.1,48*k,-20); hand(im,x,y,L*k,-Math.PI/2+sw-0.2,k); }
      else if(kind==='t'){ const y=BY0+40+L*0.9*k; arm(x-10,BY0-40,x,y-L*0.15,46*k,0); hand(im,x,y,L*k,Math.PI/2+sw,k); }
      else { const xx=AX0+240+(kind==='l2'?60:0)+L*0.6*k, y=GROUND-(kind==='l2'?300:170); arm(AX0+40,y+30,xx,y,50*k,20); hand(im,xx,y,L*k,sw+(kind==='l2'?-0.3:0.15),k); } }); }
  function scene2(t){   // 🏠 thềm nhà (Ep 1): Chill Guy ngất, mèo trắng đi làm về
    blit(STREET); streetLive(t); window2(t,0,0);
    const cx=HX+40; shadow(cx,62,0.28);
    actor(prep(IMG.cgDown),cx,GROUND+4,62,{});   // nằm HẲN xuống đất trước thềm (anh: đừng lơ lửng) — lưng rách 3 vết cào (sẵn trong ảnh) · không vẽ chuột
    const wx=lerp(-240,cx-120,eout(seg(t,T.wifeIn,T.wifeStop))), walk=t<T.wifeStop, bob=walk?Math.abs(Math.sin(t*6.5))*4:0;
    shadow(wx,36,0.35); actor(prep(IMG.wifeWalk),wx,GROUND+2-bob-(t>=T.gasp?14*Math.exp(-(t-T.gasp)*6)*Math.sin(Math.min(1,(t-T.gasp)*8)*Math.PI):0),205,{rot:walk?Math.sin(t*6.5)*0.03:0});
    if(t>=T.gasp){ const u=seg(t,T.gasp,T.gasp+0.25), y=GROUND-250; g.save(); g.translate(wx+8,y); g.scale(eout(u)*1.1,eout(u)*1.1);
      g.fillStyle='#fff'; g.strokeStyle='#111'; g.lineWidth=3; g.beginPath(); g.arc(0,0,22,0,Math.PI*2); g.fill(); g.stroke();
      g.fillStyle='#e53935'; g.font='900 30px "Arial Black",Impact,sans-serif'; g.textAlign='center'; g.textBaseline='middle'; g.fillText('!',0,2); g.restore(); }
  }
  function scene2b(t){ blit(STREET); streetLive(t); window2(t,seg(t,T.winOn,T.winOn+0.15),0); }   // đèn cửa sổ tầng 2 bật sáng
  function scene3(t){   // 🛋️ trong phòng: cả 2 đã băng bó; Chill Guy cúi sát ngó Hamster trên tay mèo trắng
    blit(ROOM);
    glow(504,GROUND-372,170,0.35,'255,210,150');
    const lean=eio(seg(t,T.lean,T.lean+1.0)), br=Math.sin(t*2.2);
    actor(prep(IMG.wifeHold),215,GROUND+4,212,{flip:true, sy:1+0.008*br});
    actor(prep(IMG.cgBand),372-8*lean,GROUND+4+4*lean,214,{rot:-0.14*lean, sy:(1+0.01*br)*(1-0.05*lean)});   // cúi THẤP ngó chuột (anh: đừng sát quá)
  }
  // 😿 dưới phố: đứng nhìn lên → khóc → vứt hoa → quay lưng bỏ đi (sang trái)
  const DPX=170;
  // 😿 dưới phố: ôm hoa đứng NGƯỚC nhìn lên cửa sổ (đầu ngửa nhẹ, run run)
  function drawDP(t){ const H=180, tilt=-0.07*eio(seg(t,T.look,T.look+0.6)), tr=Math.sin(t*23)*0.6*seg(t,T.look+0.6,T.pov); shadow(DPX,48,0.4);
    actor(prep(IMG.dp), DPX+tr, GROUND+2, H, {flip:true, rot:tilt, after:hurt});
    bouquet(DPX+48, GROUND-34, 1.0, 1, 0.55); }
  function scene4(t){ blit(STREET); streetLive(t); window2(t,1,1); drawDP(t); }
  // 😈 góc tối cạnh cột điện: Depressed Cat đi ngang qua → khuất → nụ cười Friend hiện ra trong bóng tối
  const GX=-566, GY=GROUND-96;   // khe hẻm TỐI giữa 2 dãy chung cư (x −610…−520), cao hơn hàng rào
  function scene5(t){ blit(STREET); streetLive(t,-640);
    { const gr=g.createLinearGradient(0,GROUND-330,0,GROUND-38); gr.addColorStop(0,'rgba(1,1,4,0)'); gr.addColorStop(0.25,'rgba(1,1,4,0.97)'); gr.addColorStop(1,'rgba(1,1,4,0.97)'); g.fillStyle=gr; g.fillRect(-609,GROUND-330,88,292); }   // 🌑 khe hẻm đen kịt
    g.save(); const gr=g.createRadialGradient(GX,GY-40,20,GX,GY-40,330); gr.addColorStop(0,'rgba(0,0,4,0.92)'); gr.addColorStop(1,'rgba(0,0,4,0)'); g.fillStyle=gr; g.fillRect(GX-340,GY-380,680,560); g.restore();
    const c=prep(IMG.grin); if(c && t>=T.grin){ const u=seg(t,T.grin,T.grin+0.6), blink=(t>T.grin+1.2 && t<T.grin+1.32)?0.15:1, h=78*(1+0.08*eio(seg(t,T.grin,DUR)));
      g.save(); g.globalCompositeOperation='lighter'; glow(GX,GY-h*0.55,h*1.2,0.2*u,'255,200,120'); g.restore();
      actor(c,GX,GY,h,{a:eio(u), sy:blink}); } }
  // 👀 góc nhìn QUA VAI Depressed Cat: nửa đầu + vai nó (tối, nhoè, sát máy) ở góc dưới trái, nhìn ngước lên cửa sổ có 2 cái bóng
  function povShoulder(t){ const c=prep(IMG.dp); if(!c) return; const u=seg(t,T.pov,T.s5), h=VH*1.05, w=h*c.sw/c.sh;
    g.save(); g.filter='blur(3px) brightness(0.28)'; g.translate(VW*0.08-12*u,VH*1.32); g.rotate(-0.08); g.scale(-1,1); g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,-w/2,-h,w,h); g.restore(); g.filter='none';
    const gr=g.createLinearGradient(0,VH*0.55,0,VH); gr.addColorStop(0,'rgba(0,0,0,0)'); gr.addColorStop(1,'rgba(0,0,0,0.5)'); g.fillStyle=gr; g.fillRect(0,VH*0.55,VW,VH*0.45); }
  // ───────────────────── 🎥 MÁY QUAY ─────────────────────
  function cam(t){
    if(t<T.s2){ const hx=hamX(t);
      if(t<T.slap-0.4) return [clamp(hx+40,AX0+230,AX1-230),GROUND-220,1.25];
      if(t<T.corner) { const u=eio(seg(t,T.slap-0.4,T.slap)); return [lerp(clamp(hx+40,AX0+230,AX1-230),320,u),lerp(GROUND-220,GROUND-150,u),lerp(1.25,1.9,u)]; }
      if(t<T.kick) return [lerp(320,CORNER-90,eio(seg(t,T.corner,T.corner+0.4))),GROUND-160,lerp(1.9,1.7,seg(t,T.corner,T.kick))];
      if(t<T.run){ const ws=eio(seg(t,T.sprout,T.startle));   // tay mọc khắp nơi → lùi máy ra cho thấy cả bầy tay
        return [lerp(lerp(CORNER-90,CORNER-160,eio(seg(t,T.kick,T.kHit))),CORNER-230,ws),lerp(lerp(GROUND-160,GROUND-210,seg(t,T.kick,T.kHit)),GROUND-260,ws),lerp(lerp(1.7,1.4,seg(t,T.kick,T.kHit)),1.08,ws)]; }
      const cx=cgX(t); return [clamp(cx+30,AX0+230,AX1-200),GROUND-180,1.4]; }
    if(t<T.fade2) return [lerp(HX-40,HX+20,seg(t,T.s2,T.fade2)),GROUND-170,1.55];   // thềm nhà: thấy trọn Chill Guy nằm + mèo trắng đi tới
    if(t<T.s3) return [WIN.x+WIN.w/2,WIN.y+140,lerp(1.5,1.9,seg(t,T.fade2,T.s3))];
    if(t<T.s4) return [lerp(290,280,seg(t,T.s3,T.pull)),lerp(GROUND-200,GROUND-215,seg(t,T.s3,T.pull)),lerp(1.15,1.45,eio(seg(t,T.lean-0.2,T.pull)))];
    if(t<T.look) return [WIN.x+WIN.w/2,WIN.y+WIN.h/2+10,lerp(2.7,2.5,seg(t,T.s4,T.look))];
    if(t<T.pov){ const u=eio(seg(t,T.look,T.look+0.7)); return [lerp(WIN.x+WIN.w/2,DPX+6,u),lerp(WIN.y+WIN.h/2+10,GROUND-128,u),lerp(2.5,2.9,u)+0.2*seg(t,T.look+0.7,T.pov)]; }   // zoom vào mặt nó đang ngước lên
    if(t<T.s5){ const u=seg(t,T.pov,T.s5); return [WIN.x+WIN.w/2-10,WIN.y+WIN.h/2+150-20*u,lerp(1.9,2.15,eio(u))]; }   // qua vai nhìn lên cửa sổ (đẩy máy chậm)
    return [GX,GY-46,lerp(2.6,2.95,eio(seg(t,T.s5,DUR)))];   // cắt thẳng: mặt Friend trong góc phố tối
  }
  let ALLEY=null, STREET=null, ROOM=null;
  function build(){ ALLEY=paintAlley(); STREET=paintStreet(); ROOM=paintRoom(); for(const k in IMG){ const v=IMG[k]; if(Array.isArray(v)) v.forEach(i=>prep(i)); else prep(v); } }
  function shake(t){ let s=0; for(const [ts,a] of [[T.hit,7],[T.corner,9],[T.kHit,12],[T.startle,5],[T.claw,6]]){ const d=t-ts; if(d>=0 && d<0.3) s+=a*(1-d/0.3); } return s; }
  function renderAt(t){
    const [cx,cy,z]=cam(t), sk=shake(t), jx=(hash(Math.floor(t*60))-0.5)*2*sk, jy=(hash(Math.floor(t*60)+7)-0.5)*2*sk;
    w2.setTransform(1,0,0,1,0,0); w2.fillStyle='#000'; w2.fillRect(0,0,W2.width,W2.height);
    w2.setTransform(SC*z,0,0,SC*z,SC*(VW/2-cx*z+jx),SC*(VH/2-cy*z+jy)); g=w2;
    if(t<T.s2) scene1(t); else if(t<T.fade2) scene2(t); else if(t<T.s3) scene2b(t); else if(t<T.s4) scene3(t); else if(t<T.s5) scene4(t); else scene5(t);
    g=cv.getContext('2d'); g.setTransform(1,0,0,1,0,0); g.drawImage(W2,0,0); g.setTransform(SC,0,0,SC,0,0);
    if(t>=T.pov && t<T.s5) povShoulder(t);
    // ⚡ khung impact trắng đen 2 khung lúc cú vả / cú đá trúng
    for(const ts of [T.hit,T.kHit]) if(t>=ts && t<ts+2/30){ g.save(); g.globalCompositeOperation='difference'; g.fillStyle='#fff'; g.fillRect(0,0,VW,VH); g.restore(); }
    const vig=g.createRadialGradient(VW/2,VH/2,VH*0.3,VW/2,VH/2,VH*0.75); vig.addColorStop(0,'rgba(0,0,0,0)'); vig.addColorStop(1,'rgba(0,0,0,0.55)'); g.fillStyle=vig; g.fillRect(0,0,VW,VH);
    const fades=[[0,0,0.6],[T.fade1,T.s2,0.4],[T.fade2,T.fade2+0.3,0.3],[T.s3-0.25,T.s3,0.25],[T.s4-0.4,T.s4,0.3],[T.s5-0.08,T.s5,0.12]];   // sang Friend: cắt gần như thẳng
    for(const [a,b,o] of fades){ let al=0; if(a===0) al=1-seg(t,0,o); else if(t>=a-0.001 && t<b) al=seg(t,a,b); else if(t>=b && t<b+o) al=1-seg(t,b,b+o); if(al>0){ g.fillStyle=`rgba(0,0,0,${al})`; g.fillRect(0,0,VW,VH); } }
    if(t>T.fadeEnd){ g.fillStyle=`rgba(0,0,0,${seg(t,T.fadeEnd,DUR)})`; g.fillRect(0,0,VW,VH); }
  }
  function frame(now){ raf=requestAnimationFrame(frame); if(!ready) return;
    const t=paused?pauseT:(now-t0)/1000;
    SFX_PLAN.forEach(([ts,k,v,d],i)=>{ if(t>=ts && !played[i]){ played[i]=1; if(!markOnly && t<ts+0.4){ try{ playSample(k,v,d); }catch(e){} } } });
    renderAt(Math.min(t,DUR)); markOnly=false; if(panel) panel.update(); }
  const curT=()=>paused?pauseT:(performance.now()-t0)/1000;
  function seek(sec){ sec=clamp(sec,0,DUR); try{ stopAllLongSfx(); }catch(e){} played={}; markOnly=true; if(paused) pauseT=sec; else t0=performance.now()-sec*1000; }
  function toggle(){ if(paused){ if(pauseT>=DUR-0.05) pauseT=0; t0=performance.now()-pauseT*1000; paused=false; } else { pauseT=curT(); paused=true; } }
  function stop(){ if(raf) cancelAnimationFrame(raf); raf=null; try{ stopAllLongSfx(); }catch(e){} if(window._cinePanelRemove) _cinePanelRemove(); panel=null; if(overlay) overlay.remove(); overlay=null; }
  window._cineL2E0=function(opts){
    if(overlay) return;
    const SCALE=(opts&&opts.scale)||1;
    overlay=document.createElement('div'); overlay.style.cssText='position:fixed;inset:0;z-index:99999;background:#000;display:flex;align-items:center;justify-content:center;';
    cv=document.createElement('canvas'); cv.width=Math.round(1080*SCALE); cv.height=Math.round(1920*SCALE); SC=cv.width/VW;
    cv.style.cssText='height:100vh;max-width:100vw;aspect-ratio:9/16;object-fit:contain;';
    W2=document.createElement('canvas'); W2.width=cv.width; W2.height=cv.height; w2=W2.getContext('2d');
    overlay.appendChild(cv); document.body.appendChild(overlay);
    if(opts&&opts.offline) OFF={};
    if(window._cinePanelMake && !OFF) panel=_cinePanelMake(overlay,{ title:'Meme Lore 2 · Ep 0 · The Truth', dur:()=>DUR, t:()=>ready?Math.min(curT(),DUR):0, playing:()=>ready && !paused && curT()<DUR,
      toggle:()=>{ if(!ready) return; if(!paused && curT()>=DUR) seek(0); else toggle(); }, seek:s=>{ if(ready) seek(s); }, replay:()=>{ if(!ready) return; paused=false; seek(0); markOnly=false; }, close:()=>{ stop(); if(window.openCinema) openCinema('__lore2'); } });
    try{ stopAllBattleMusic(); }catch(e){}
    const all=[]; for(const k in IMG){ const v=IMG[k]; if(Array.isArray(v)) all.push(...v); else all.push(v); }
    if(typeof DEPRESSED_CRY_IMG!=='undefined') all.push(DEPRESSED_CRY_IMG);
    Promise.all(all.map(im=>im.decode?im.decode().catch(()=>{}):Promise.resolve())).then(()=>{ if(!ready){ build(); ready=true; } paused=false; played={}; t0=performance.now(); });
    paused=false; played={}; t0=performance.now(); if(!OFF) raf=requestAnimationFrame(frame);
  };
  window._cineL2E0Ready=()=>ready;
  window._cineL2E0Step=R=>{ if(OFF && ready) renderAt(clamp(R,0,DUR)); };   // render-cine có bước ở t hơi ÂM (R − 1/60) → kẹp về 0
  window._cineL2E0Info=()=>({dur:DUR, sfx:SFX_PLAN.map(([a,k,v,d])=>[a,k,v,d]), mus:[]});
  window._cineL2E0Stop=stop;
  window._cineL2E0Canvas=()=>cv;
})();
