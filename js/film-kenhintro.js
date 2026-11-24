// 📺 INTRO KÊNH 3s "MEMES IN THE MULTIVERSE" (anh 24/11) — dùng lại cho mọi video YouTube (đầu tiên: MEME LORE 2, giữa cú va Gojo vs Pain và cảnh phố).
//   Ý tưởng theo TÊN KÊNH (anh 24/11 cho tự do sáng tạo): ĐA VŨ TRỤ MEME — vũ trụ đầy sao, các KHE NỨT KHÔNG GIAN mở khắp màn (mỗi khe 1 màu = 1 vũ trụ),
//   meme của game (ảnh gốc) lao vụt ra từ các khe về phía máy quay, chữ tên kênh cũng bay ra từ trong khe (vài chữ lao từ sau máy quay) rồi khớp
//   0.00 trắng (nối từ cú va) → vũ trụ + sao lao về máy · 0.06 các khe mở · 0.18 meme lao ra · 0.10 chữ bay ra từ khe
//   0.85 khớp đủ → ĐẬP (âm bản + loé + rung + loé ống kính ngang) · chữ kim loại có khối
//   1.35 chữ dạt xuống, CÁC KHE SẬP về tâm → 1.60 BÙM: huy hiệu Doge (avatar kênh) nổ ra giữa màn
//   1.80 kính pixel "deal with it" trượt xuống mặt Doge → 2.05 khớp + loé
//   2.60 vút + loé trắng ra (cảnh sau mở bằng trắng)
//   Ảnh: assets/img/kenh/KENH_DOGE.jpg (avatar kênh, GPT phóng nét trung thành + gỡ kính — kính vẽ lại bằng CODE theo lưới pixel cho nét ở 4K).
//   Mọi hiệu ứng bằng code; không vòng sóng tròn (anh chê 20/11). Xuất: render-cine.js kenhintro … --wide --4k --no-audio. Tiếng gắn ở CapCut (tools/x/capcut-fin1yt.py).
(function(){
  if(!window.CineKit || (CineKit.films && CineKit.films.kenhintro)) return;
  const K=CineKit, {seg,hash}=K, E=K.EASE, TAU=Math.PI*2, VW=960, VH=540, DUR=3.0, CX=VW/2, CY=VH/2;
  const SANS='Montserrat, "Segoe UI", sans-serif';
  const LAND=0.85, MOVE=1.35, BOOM=1.6, GL0=1.8, GL1=2.05, OUT=2.6;
  const BLUE='120,200,255', PURP='190,110,255';
  const v=window.GAME_VERSION?'?v='+GAME_VERSION.build:'';
  let SC=1, IM={};
  // ── hạt dựng sẵn (băm cố định, không Math.random) ──
  const mkSparks=(n,seed,t0)=>{ const L=[]; for(let i=0;i<n;i++){ const a=hash(i*3.1+seed)*TAU; L.push({a,v:260+hash(i*7.7+seed)*700,life:0.45+hash(i*1.9+seed)*0.8,w:0.8+hash(i*5.3+seed)*1.8,col:Math.cos(a)<0?BLUE:PURP,d:t0+hash(i*9.1+seed)*0.06}); } return L; };
  const SP1=mkSparks(110,0,0), SP2=mkSparks(70,40,LAND), SP3=mkSparks(150,80,BOOM);
  const RAYS=[]; for(let i=0;i<64;i++) RAYS.push({a:hash(i*5.7+3)*TAU,len:0.4+hash(i*2.2)*0.6,w:0.6+hash(i*8.8)*2.2});
  // ── nền: vũ trụ (tinh vân trôi chậm + sao lao về máy) ──
  const STARS=[]; for(let i=0;i<240;i++) STARS.push({a:hash(i*1.31)*TAU,r0:hash(i*2.71),sp:0.35+hash(i*3.17)*0.9,w:0.5+hash(i*4.9)*1.4,c:i%5===0?PURP:i%7===0?BLUE:'255,255,255'});
  const NEB=[[230,170,260,'90,120,255',0.22],[760,140,240,'210,80,220',0.2],[520,420,300,'120,60,220',0.18],[120,440,200,'40,180,255',0.14],[880,450,220,'255,90,160',0.12]];
  function bg(g,t){ const b=t>=BOOM?Math.max(0,1-(t-BOOM)/0.6):0;
    const r=g.createRadialGradient(CX,CY,10,CX,CY,VW*0.75); r.addColorStop(0,`rgb(${22+50*b|0},${14+40*b|0},${44+60*b|0})`); r.addColorStop(0.5,'#070512'); r.addColorStop(1,'#010104'); g.fillStyle=r; g.fillRect(0,0,VW,VH);
    g.save(); g.globalCompositeOperation='lighter';
    for(const [x,y,R,col,al] of NEB){ const dx=Math.sin(t*0.7+x)*14, G=g.createRadialGradient(x+dx,y,0,x+dx,y,R); G.addColorStop(0,`rgba(${col},${al})`); G.addColorStop(1,`rgba(${col},0)`); g.fillStyle=G; g.fillRect(x+dx-R,y-R,R*2,R*2); }
    g.restore(); }
  function stars(g,t){ const warp=0.45+1.2*Math.max(t<0.5?1-t/0.5:0, t>=BOOM&&t<BOOM+0.5?1-(t-BOOM)/0.5:0, seg(t,OUT,DUR)); g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round';
    for(const s of STARS){ const q=(s.r0+t*s.sp*0.55)%1, d=Math.pow(q,2.2)*VW*0.75+6, x=CX+Math.cos(s.a)*d, y=CY+Math.sin(s.a)*d*0.62, tl=4+warp*q*40, al=Math.min(1,q*2.2)*(0.5+0.5*q);
      g.strokeStyle=`rgba(${s.c},${al})`; g.lineWidth=s.w*(0.6+q); g.beginPath(); g.moveTo(x,y); g.lineTo(x-Math.cos(s.a)*tl,y-Math.sin(s.a)*tl*0.62); g.stroke(); }
    g.restore(); }
  // ── KHE NỨT KHÔNG GIAN: mỗi khe 1 vũ trụ (màu riêng) — mở ra, rồi sập về tâm huy hiệu ──
  const RIFT=[[150,150,1.25,'80,220,255'],[812,140,-1.22,'255,80,190'],[96,404,1.9,'110,255,140'],[868,404,1.3,'255,170,50'],[470,74,1.5,'175,120,255']];   // gần dọc: vết nứt như tia sét
  const riftK=(t,i)=>E.eout3(seg(t,0.06+i*0.04,0.36+i*0.04))*(1-E.ein(seg(t,MOVE,BOOM)));
  const riftP=(t,i)=>{ const c=E.ein(seg(t,MOVE,BOOM)); return [RIFT[i][0]+(BX-RIFT[i][0])*c, RIFT[i][1]+(BY-RIFT[i][1])*c]; };
  function riftPath(g,i,L,W){ g.beginPath(); const n=9;
    const zz=j=>(hash(i*7+j)-0.5)*W*2.6;   // đường giữa gãy khúc (zigzag) — 2 mép bám theo → vết nứt sắc
    for(let j=0;j<=n;j++){ const u=j/n, x=(u-0.5)*L, y=zz(j)-Math.pow(Math.sin(u*Math.PI),1.6)*W*(0.5+0.5*hash(i*11+j)); j?g.lineTo(x,y):g.moveTo(x,y); }
    for(let j=n;j>=0;j--){ const u=j/n, x=(u-0.5)*L, y=zz(j)+Math.pow(Math.sin(u*Math.PI),1.6)*W*(0.5+0.5*hash(i*13+j)); g.lineTo(x,y); }
    g.closePath(); }
  function rifts(g,t){ for(let i=0;i<RIFT.length;i++){ const k=riftK(t,i); if(k<=0.01) continue; const [x,y]=riftP(t,i), col=RIFT[i][3], fl=1+0.12*Math.sin(t*40+i*2);
      g.save(); g.translate(x,y); g.rotate(RIFT[i][2]); g.globalCompositeOperation='lighter';
      const L=200*(0.4+0.6*k), W=11*k*fl;
      for(const [sx,sy,al] of [[1.25,3.2,0.16],[1.1,1.9,0.3]]){ g.save(); g.scale(sx,sy); riftPath(g,i,L,W); g.fillStyle=`rgba(${col},${al})`; g.fill(); g.restore(); }   // quầng (không shadowBlur)
      g.globalCompositeOperation='source-over'; riftPath(g,i,L,W);
      const G=g.createLinearGradient(0,-W,0,W); G.addColorStop(0,`rgb(${col})`); G.addColorStop(0.5,'#05020c'); G.addColorStop(1,`rgb(${col})`); g.fillStyle=G; g.fill();   // lòng khe: tối, mép màu vũ trụ
      g.globalCompositeOperation='lighter'; g.lineWidth=1.6; g.strokeStyle='rgba(255,255,255,0.9)'; g.stroke();
      g.restore(); } }
  // ── meme lao ra từ khe về phía máy quay (ảnh gốc của game) ──
  const MEMES=['cheems','nyancat','popcat','mewingcat','bananacat','sans','gigachad','capybara'];
  const FLY=MEMES.map((key,i)=>{ const r=i%RIFT.length, out=Math.atan2(CY-RIFT[r][1],CX-RIFT[r][0])+(hash(i*3.3)-0.5)*0.9; return {key,r,t0:0.1+i*0.045,d:0.5,out,spin:(hash(i*6.1)-0.5)*1.2}; });   // bay VÀO giữa màn + lớn dần = lao về máy
  function fliers(g,t){ for(const f of FLY){ const q=(t-f.t0)/f.d; if(q<=0||q>=1) continue; const im=IM[f.key]; if(!im||!im.complete||!im.naturalWidth) continue;
      const [rx,ry]=riftP(t,f.r), h0=118;
      for(let gh=2;gh>=0;gh--){ const qq=Math.max(0,q-gh*0.05), e=Math.pow(qq,1.5), s=0.25+qq*qq*2.6, x=rx+Math.cos(f.out)*e*330, y=ry+Math.sin(f.out)*e*230, h=h0*s, w=h*im.naturalWidth/im.naturalHeight;
        const al=(gh?0.25*(1-gh/3):1)*Math.min(1,qq*6)*(1-seg(qq,0.68,0.95));   // bay qua hết trước cú đập chữ (0.85s)
        if(al<=0.01) continue; g.save(); g.globalAlpha=al; g.translate(x,y); g.rotate(f.spin*e); g.drawImage(im,-w/2,-h/2,w,h); g.restore(); } } }
  function sparks(g,t,L,ox,oy){ g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round';
    for(const p of L){ const tt=t-p.d; if(tt<=0||tt>p.life) continue; const q=tt/p.life, dist=p.v*E.eout(Math.min(1,tt*1.4))*0.9, x=ox+Math.cos(p.a)*dist, y=oy+Math.sin(p.a)*dist*0.7, tl=26*(1-q)+4;
      g.strokeStyle=`rgba(${p.col},${(1-q)*0.95})`; g.lineWidth=p.w*(1-q*0.6); g.beginPath(); g.moveTo(x,y); g.lineTo(x-Math.cos(p.a)*tl,y-Math.sin(p.a)*tl*0.7); g.stroke(); }
    g.restore(); }
  function flare(g,x,y,k,w,col){ if(k<=0.01) return; g.save(); g.globalCompositeOperation='lighter';   // loé ống kính anamorphic: vệt ngang mảnh + lõi tròn
    const L=g.createLinearGradient(x-w,0,x+w,0); L.addColorStop(0,`rgba(${col},0)`); L.addColorStop(0.5,`rgba(${col},${0.9*k})`); L.addColorStop(1,`rgba(${col},0)`); g.fillStyle=L; g.fillRect(x-w,y-1.6,w*2,3.2);
    const R=g.createRadialGradient(x,y,0,x,y,60); R.addColorStop(0,`rgba(255,255,255,${k})`); R.addColorStop(0.22,`rgba(${col},${0.5*k})`); R.addColorStop(1,`rgba(${col},0)`); g.fillStyle=R; g.fillRect(x-60,y-60,120,120); g.restore(); }
  // ── chữ: 2 dòng, từng mảnh bay tới ──
  const L1='MEMES IN THE', L2='MULTIVERSE', LS1=18, LS2=12;
  const TOK=[]; ['MEMES','IN','THE'].forEach((w,i)=>TOK.push({line:1,s:w,i})); L2.split('').forEach((c,i)=>TOK.push({line:2,s:c,i:i+3}));
  TOK.forEach((k,j)=>{ const h=hash(j*4.4+1);   // mode 0: lao từ SAU MÁY QUAY ra (to → nhỏ) · mode 1: bay ra từ TRONG 1 KHE NỨT (nhỏ → to, xoay)
    k.mode=j%4===1?0:1; k.rift=(j*3)%5; k.dx0=(h-0.5)*140; k.dy0=(hash(j*8.2)-0.5)*120;
    k.s0=k.mode===0?3.6+h*2.4:0.18; k.rot=(hash(j*5.5)-0.5)*2.2; k.t0=0.12+hash(j*7.3+2)*0.42; k.t1=k.t0+0.3; });
  const fonts=(g)=>{ g.font=`900 104px ${SANS}`; g.letterSpacing=LS2+'px'; const k2=Math.min(1,760/g.measureText(L2).width);
    g.font=`800 34px ${SANS}`; g.letterSpacing=LS1+'px'; const k1=Math.min(1,560/g.measureText(L1).width); return {F1:`800 ${34*k1|0}px ${SANS}`,F2:`900 ${104*k2|0}px ${SANS}`}; };
  function chrome(g){ const CH=g.createLinearGradient(0,-80,0,66); CH.addColorStop(0,'#ffffff'); CH.addColorStop(0.38,'#f1f3ff'); CH.addColorStop(0.5,'#a8b4e6'); CH.addColorStop(0.56,'#7d84c4'); CH.addColorStop(0.8,'#e4e6fb'); CH.addColorStop(1,'#9aa2d8'); return CH; }
  function title(g,t){ if(t<0.1) return;
    const {F1,F2}=fonts(g), y1=-50, y2=22, mv=E.eio(seg(t,MOVE,BOOM)), outK=E.ein(seg(t,OUT,DUR));
    const gs=(1-0.42*mv)*(1+0.03*seg(t,LAND,MOVE)), gy=CY-6+mv*172, sx=gs*(1+outK*1.8), sy=gs*(1-outK*0.55);
    g.save(); g.translate(CX,gy); g.scale(sx,sy); g.textBaseline='middle';
    // vị trí cuối từng mảnh (canh trái, đo bằng chiều rộng phần chữ đứng trước)
    const pos=[]; g.font=F1; g.letterSpacing=LS1+'px'; const w1=g.measureText(L1).width;
    let pre=''; for(const w of ['MEMES','IN','THE']){ const x=-w1/2+LS1/2+g.measureText(pre).width, ww=g.measureText(w).width-LS1; pos.push({x:x+ww/2,y:y1,f:F1,ls:LS1}); pre+=w+' '; }
    g.font=F2; g.letterSpacing=LS2+'px'; const w2=g.measureText(L2).width;
    for(let i=0;i<L2.length;i++){ const x=-w2/2+LS2/2+g.measureText(L2.slice(0,i)).width, ww=g.measureText(L2[i]).width-LS2; pos.push({x:x+ww/2,y:y2,f:F2,ls:LS2}); }
    const CH=chrome(g);
    if(t<LAND){   // ── đang bay: từng mảnh, có vệt bóng mờ phía sau (không shadowBlur trong vòng lặp) ──
      g.textAlign='center'; g.lineJoin='round';
      for(let j=0;j<TOK.length;j++){ const k=TOK[j], P=pos[j]; g.font=P.f; g.letterSpacing=P.ls+'px';   // giãn chữ y như lúc khớp → không nhảy
        for(let gh=3;gh>=0;gh--){ const tt=t-gh*0.022; if(tt<k.t0) continue; const e=E.eout3(seg(tt,k.t0,k.t1)), s=k.s0+(1-k.s0)*e, a=gh?0.22*(1-gh/4)*(1-e):Math.min(1,seg(tt,k.t0,k.t0+0.06)*1.5);
          if(a<=0.01) continue; const R0=RIFT[k.rift], dx=k.mode?R0[0]-CX-P.x:k.dx0, dy=k.mode?R0[1]-(CY-6)-P.y:k.dy0;
          g.save(); g.globalAlpha=a; g.translate(P.x+dx*(1-e),P.y+dy*(1-e)); g.rotate(k.rot*(1-e)); g.scale(s,s);
          if(gh){ g.globalCompositeOperation='lighter'; g.fillStyle=`rgba(${RIFT[k.rift][3]},1)`; g.fillText(k.s,P.ls/2,0); }
          else { g.lineWidth=5; g.strokeStyle='#0a0818'; g.strokeText(k.s,P.ls/2,0); g.fillStyle=CH; g.fillText(k.s,P.ls/2,0); }
          g.restore(); } }
    } else {      // ── đã khớp: vẽ cả dòng (khối + viền + kim loại + toả sáng) ──
      const draw=fn=>{ g.font=F1; g.letterSpacing=LS1+'px'; fn(L1,y1,LS1/2); g.font=F2; g.letterSpacing=LS2+'px'; fn(L2,y2,LS2/2); };
      g.textAlign='center'; const rgb=10*Math.max(0,1-(t-LAND)/0.35)+outK*14;
      g.globalCompositeOperation='lighter'; draw((s,y,o)=>{ g.fillStyle=`rgba(${BLUE},0.8)`; g.fillText(s,o-rgb,y); g.fillStyle=`rgba(${PURP},0.8)`; g.fillText(s,o+rgb,y); }); g.globalCompositeOperation='source-over';
      for(let i=7;i>=1;i--){ g.fillStyle=`rgb(${16+i*4},${14+i*3},${36+i*6})`; draw((s,y,o)=>g.fillText(s,o,y+i*1.5)); }
      g.lineJoin='round'; g.lineWidth=6; g.strokeStyle='#0a0818'; draw((s,y,o)=>g.strokeText(s,o,y));
      g.shadowColor='rgba(170,150,255,0.9)'; g.shadowBlur=26*SC; g.fillStyle=CH; draw((s,y,o)=>g.fillText(s,o,y)); g.shadowBlur=0; draw((s,y,o)=>g.fillText(s,o,y));
      g.globalCompositeOperation='lighter';
      const fl=1-seg(t,LAND,LAND+0.2); if(fl>0){ g.fillStyle=`rgba(255,255,255,${fl})`; draw((s,y,o)=>g.fillText(s,o,y)); }
      const sw=seg(t,1.0,1.4); if(sw>0&&sw<1){ const x=-460+920*E.eio(sw), L=g.createLinearGradient(x-60,0,x+60,0); L.addColorStop(0,'rgba(150,215,255,0)'); L.addColorStop(0.5,'rgba(170,225,255,0.9)'); L.addColorStop(1,'rgba(150,215,255,0)'); g.fillStyle=L; draw((s,y,o)=>g.fillText(s,o,y)); }
      // vạch dưới chữ kéo ra từ tâm
      const lk=E.eout(seg(t,LAND,LAND+0.4))*(1-outK); if(lk>0){ const hw=330*lk; g.lineCap='round';
        for(const [side,col] of [[-1,BLUE],[1,PURP]]){ const L=g.createLinearGradient(0,0,side*hw,0); L.addColorStop(0,'rgba(255,255,255,0.95)'); L.addColorStop(0.6,`rgba(${col},0.9)`); L.addColorStop(1,`rgba(${col},0)`);
          g.strokeStyle=L; g.lineWidth=2.2; g.beginPath(); g.moveTo(0,84); g.lineTo(side*hw,84); g.stroke(); } }
    }
    g.restore();
    flare(g,CX,gy+8,t>=LAND?(1-seg(t,LAND,LAND+0.7))*(1-outK):0,620,'150,180,255');
    const sw2=seg(t,1.0,1.4); if(sw2>0&&sw2<1) flare(g,CX-430+860*E.eio(sw2),gy-30,Math.sin(sw2*Math.PI)*0.9,320,'170,215,255'); }
  // ── huy hiệu Doge ──
  const BX=CX, BY=CY-58, BR=112;
  // kính "deal with it": lưới pixel (# đen, W trắng). 2 tròng 14 ô, cầu 3 ô, gọng phải 5 ô. Tâm 2 tròng = tâm 2 mắt đo trên ảnh (0.242,0.34) & (0.487,0.392)
  const LENS=['#W#W##########','##W#W#########','.############.','..##########..','....######....'], GLS=['#'.repeat(36),'#'.repeat(31)+'.....'].concat(LENS.map(l=>l+'...'+l+'.....'));
  const EYE1=[0.242,0.34], EYE2=[0.487,0.392];
  function glasses(g,t,D,ox,oy){ if(t<GL0-0.02) return; const e=E.eout(seg(t,GL0,GL1)), drop=(1-e)*D*0.95;
    const ex1=ox+(EYE1[0]-0.5)*D, ey1=oy+(EYE1[1]-0.5)*D, ex2=ox+(EYE2[0]-0.5)*D, ey2=oy+(EYE2[1]-0.5)*D, ang=Math.atan2(ey2-ey1,ex2-ex1), u=Math.hypot(ex2-ex1,ey2-ey1)/17*1.4;   // ×1.4: kính to như avatar gốc (tròng vẫn trùm 2 mắt)
    g.save(); g.translate((ex1+ex2)/2,(ey1+ey2)/2-drop); g.rotate(ang); g.translate(-15.5*u,-3.2*u);
    for(let r=0;r<GLS.length;r++) for(let c=0;c<GLS[r].length;c++){ const ch=GLS[r][c]; if(ch==='.') continue; g.fillStyle=ch==='W'?'#f4f4f4':'#000'; g.fillRect(c*u-0.25,r*u-0.25,u+0.5,u+0.5); }
    g.restore(); }
  function badge(g,t){ if(t<BOOM) return; const p=t-BOOM, s=p<0.16?1.25*E.eout3(p/0.16):1.25-0.25*E.eio(Math.min(1,(p-0.16)/0.22)), outK=E.ein(seg(t,OUT,DUR)), sc=s*(1+outK*0.6);
    const im=IM.doge && IM.doge.complete && IM.doge.naturalWidth ? IM.doge : null;
    g.save(); g.translate(BX,BY); g.scale(sc,sc);
    for(let i=6;i>=1;i--){ g.fillStyle=`rgb(${14+i*4},${12+i*3},${34+i*6})`; g.beginPath(); g.arc(0,i*1.8,BR+12,0,TAU); g.fill(); }   // khối huy hiệu (chiều sâu)
    g.shadowColor='rgba(160,140,255,0.9)'; g.shadowBlur=34*SC; const RG=g.createLinearGradient(0,-BR-12,0,BR+12); RG.addColorStop(0,'#ffffff'); RG.addColorStop(0.45,'#c9d0f2'); RG.addColorStop(0.52,'#7b82c2'); RG.addColorStop(1,'#d8dcf7');
    g.fillStyle=RG; g.beginPath(); g.arc(0,0,BR+12,0,TAU); g.fill(); g.shadowBlur=0;                                                   // vành kim loại
    g.fillStyle='#0a0818'; g.beginPath(); g.arc(0,0,BR+2,0,TAU); g.fill();
    g.save(); g.beginPath(); g.arc(0,0,BR,0,TAU); g.clip(); if(im) g.drawImage(im,-BR*1.08,-BR*1.08,BR*2.16,BR*2.16);
    const vg=g.createRadialGradient(0,0,BR*0.55,0,0,BR); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(20,10,50,0.45)'); g.fillStyle=vg; g.fillRect(-BR,-BR,BR*2,BR*2);
    g.restore();
    glasses(g,t,BR*2.16,0,0);                                                                                                         // kính trượt xuống (lòi ra ngoài vành = nổi khối)
    // 2 cung năng lượng xanh / tím chạy quanh vành
    g.globalCompositeOperation='lighter'; g.lineCap='round'; const rot=p*5;
    for(const [off,col] of [[0,BLUE],[Math.PI,PURP]]){ g.strokeStyle=`rgba(${col},0.9)`; g.lineWidth=3; g.beginPath(); g.arc(0,0,BR+18,rot+off,rot+off+1.1); g.stroke(); g.strokeStyle=`rgba(${col},0.35)`; g.lineWidth=8; g.beginPath(); g.arc(0,0,BR+18,rot+off,rot+off+1.1); g.stroke(); }
    const sw=seg(t,2.15,2.55); if(sw>0&&sw<1){ const x=-BR-30+(BR*2+60)*E.eio(sw), L=g.createLinearGradient(x-30,-BR,x+30,BR); L.addColorStop(0,'rgba(255,255,255,0)'); L.addColorStop(0.5,'rgba(255,255,255,0.5)'); L.addColorStop(1,'rgba(255,255,255,0)');
      g.fillStyle=L; g.beginPath(); g.arc(0,0,BR+12,0,TAU); g.fill(); }
    g.restore();
    if(t>=GL1&&t<GL1+0.35){ const k=1-(t-GL1)/0.35, gx=BX+((EYE2[0]-0.5)*BR*2.16+18)*sc, gy=BY+((EYE2[1]-0.5)*BR*2.16-10)*sc;   // loé trên tròng kính lúc khớp
      g.save(); g.globalCompositeOperation='lighter'; g.fillStyle=`rgba(255,255,255,${k})`; for(const [w,h] of [[26,2.4],[2.4,26]]) g.fillRect(gx-w*k/2,gy-h*k/2,w*k,h*k); g.restore(); } }
  function boom(g,t){ if(t<BOOM-0.02||t>BOOM+0.55) return; const p=Math.max(0,t-BOOM), k=1-p/0.55;   // tia toả thẳng từ tâm (không vòng tròn)
    g.save(); g.globalCompositeOperation='lighter'; g.lineCap='round';
    for(const r of RAYS){ const r0=40+p*900*r.len, r1=r0+160*r.len*k; g.strokeStyle=`rgba(${Math.cos(r.a)<0?BLUE:PURP},${0.8*k})`; g.lineWidth=r.w; g.beginPath(); g.moveTo(BX+Math.cos(r.a)*r0,BY+Math.sin(r.a)*r0); g.lineTo(BX+Math.cos(r.a)*r1,BY+Math.sin(r.a)*r1); g.stroke(); }
    const R=g.createRadialGradient(BX,BY,0,BX,BY,260); R.addColorStop(0,`rgba(255,255,255,${k})`); R.addColorStop(0.3,`rgba(200,180,255,${0.6*k})`); R.addColorStop(1,'rgba(120,100,255,0)'); g.fillStyle=R; g.fillRect(BX-260,BY-260,520,520);
    g.restore(); }
  K.film({ id:'kenhintro', title:'Intro kênh 3s · Memes in the Multiverse', VW, VH, DUR, cast:[], imgs:Object.assign({doge:'assets/img/kenh/KENH_DOGE.jpg'+v},Object.fromEntries(MEMES.map(k=>[k,'assets/avatars/'+k+'/avatarUrl.webp'+v]))), fadeIn:false, fadeOut:false, sfx:[], mus:[],
    shots:[{t0:0,t1:DUR,a:{}}],
    impact:t=>((t>=LAND && t<LAND+0.05)||(t>=BOOM && t<BOOM+0.04))?'inv':0,
    shake:t=>Math.max(t<LAND?0:7*Math.max(0,1-(t-LAND)/0.32), t<BOOM?0:10*Math.max(0,1-(t-BOOM)/0.4), t<GL1?0:3*Math.max(0,1-(t-GL1)/0.15)),
    world(F,t){ SC=F.SC; IM=F.I; const g=F.g; bg(g,t); stars(g,t); rifts(g,t); fliers(g,t); sparks(g,t,SP1,CX,CY); sparks(g,t,SP2,CX,CY); sparks(g,t,SP3,BX,BY); boom(g,t); title(g,t); badge(g,t);
      if(t>=BOOM) flare(g,BX,BY,1-seg(t,BOOM,BOOM+0.8),700,'170,150,255'); },
    screen(F,t){ SC=F.SC; const g=F.g;
      if(t<0.14) K.flash(F,1-E.eout(t/0.14)*0.92,'#fff');                       // nối từ trắng của cú va
      if(t>=LAND && t<LAND+0.09) K.flash(F,0.75*(1-(t-LAND)/0.09),'#fff');       // loé lúc chữ khớp
      if(t>=BOOM && t<BOOM+0.12) K.flash(F,0.9*(1-(t-BOOM)/0.12),'#fff');        // BÙM
      const vg=g.createRadialGradient(CX,CY,VH*0.3,CX,CY,VW*0.62); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(0,0,0,0.6)'); g.fillStyle=vg; g.fillRect(0,0,VW,VH);
      if(t>OUT) K.flash(F,seg(t,OUT+0.1,DUR)**1.6,'#fff'); } });
})();
