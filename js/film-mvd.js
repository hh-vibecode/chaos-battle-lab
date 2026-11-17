// ===================== 🎬 ANIME LAB · MEWING CAT vs DEPRESSED CAT (~23s, 9:16) =====================
// Anh yêu cầu 3/11/2026: trận "cực cháy", chuyển cảnh kiểu anime, tung chiêu + đối kháng liên tục, kết bằng 2 chiêu cuối va nhau hất
// 2 con lùi lại — NGANG TÀI NGANG SỨC. Bản dựng lại (anh chê "bó vào khung giữa", "chi tiết chậm chậm", "skill tung ra chậm"):
// cắt cảnh dày, khung LỆCH (nhân vật 1/3 khung), máy bám theo đòn, CHIA KHUNG CHÉO (biến hình đồng thời + 2 con trượt lùi mỗi con nửa khung)
// rồi mở ra toàn cảnh rộng. Chiêu bám đúng game:
//   Mewing: tư thế mewing → tượng đá Moai lao tới · dạng Gojo · HOLLOW PURPLE (cầu xanh + đỏ → tím)
//   Depressed: mây đen, mưa, sét · dạng PAIN (áo Akatsuki, mắt Rinnegan; mưa đứng hình) · SHINRA TENSEI (bức tường đẩy)
// Mẹo combat (skill dung-phim): lấy đà · nhoè lúc nhanh nhất · hit-stop · đà sau đòn · nhịp không đều.
(function(){
  if(!window.CineKit || CineKit.films.mvd) return;
  const K=CineKit, {seg,lerp,clamp,eio,eout,ein,hash}=K;
  const T={ c1:1.6, c2:2.25, a:2.9, b:3.9, c:4.9, d:5.9, d2:7.0, tf:8.2, mel:10.0, ult:13.0, ult2:13.6, fireG:14.25, fireP:14.5, race:14.7, hit:15.2, kb:15.4, open:16.6, s15:18.2, DUR:23.0 };
  const MX=-190, DX=190, H=120, SLIDE=330;
  const dusk={ sky:['#231a3a','#7a4a6e','#e39a6c'], sun:{x:-150,y:0.05,r:30,col:'rgba(255,190,140,A)'}, mount:['#4a3352','#2c2036'],
               ground:['126,112,118','112,100,108','44,36,44'], fog:'150,112,122', tile:110, R:2400 };
  const storm={ sky:['#07080f','#1d2033','#3b3f57'], mount:['#22243a','#15162a'], ground:['92,90,104','80,78,92','30,30,40'], fog:'52,54,70', tile:110, R:3000 };
  const STATUES=[{t0:3.25,img:'st1',z:-115,end:4.2},{t0:3.55,img:'st2',z:105,end:4.5},{t0:4.95,img:'st3',z:0,end:5.55,hit:true}];
  const BOLTS=[[4.2,0],[4.5,1],[6.3,-1],[6.9,-1],[7.5,-1]];   // [giây, tượng bị bổ (-1 = đánh xuống chỗ Mewing)]
  const KB0=T.hit+0.16, KB1=T.hit+1.4;
  const shots=[
    {t0:0,      t1:T.c1,  a:{tx:0,ty:60,tz:0,dist:900,yaw:-45,pitch:44,fov:44,ox:0.08}, b:{tx:0,ty:60,tz:0,dist:780,yaw:-18,pitch:38,fov:44,ox:0.08}},
    {t0:T.c1,   t1:T.c2,  a:{tx:MX,ty:72,tz:0,dist:205,yaw:20,pitch:2,fov:40,ox:-0.14}, b:{tx:MX,ty:72,tz:0,dist:180,yaw:12,pitch:2,fov:40,ox:-0.14}, ease:'eout'},
    {t0:T.c2,   t1:T.a,   a:{tx:DX,ty:72,tz:0,dist:205,yaw:-20,pitch:2,roll:5,fov:40,ox:0.14}, b:{tx:DX,ty:72,tz:0,dist:180,yaw:-12,pitch:2,roll:7,fov:40,ox:0.14}, ease:'eout'},
    {t0:T.a,    t1:T.b,   a:{tx:-60,ty:75,tz:0,dist:420,yaw:62,pitch:8,fov:48,ox:-0.1}, b:{tx:20,ty:80,tz:0,dist:380,yaw:50,pitch:6,fov:48,ox:-0.1}},
    {t0:T.b,    t1:T.c,   a:{tx:110,ty:110,tz:0,dist:380,yaw:-30,pitch:-20,roll:-8,fov:52}, b:{tx:110,ty:115,tz:0,dist:350,yaw:-36,pitch:-22,roll:-10,fov:52}},
    {t0:T.c,    t1:T.d,   a:{tx:60,ty:60,tz:0,dist:520,yaw:-80,pitch:16,fov:48}, b:{tx:150,ty:60,tz:0,dist:430,yaw:20,pitch:12,fov:48}, ease:'eio'},
    {t0:T.d,    t1:T.d2,  a:{tx:-110,ty:30,tz:0,dist:680,yaw:-30,pitch:60,fov:46,ox:0.12}, b:{tx:-130,ty:30,tz:0,dist:620,yaw:-14,pitch:56,fov:46,ox:0.12}},
    {t0:T.d2,   t1:T.tf,  a:{tx:-150,ty:70,tz:0,dist:340,yaw:40,pitch:-10,roll:6,fov:50}, b:{tx:-170,ty:70,tz:0,dist:320,yaw:28,pitch:-12,roll:8,fov:50}},
    {t0:T.tf,   t1:T.mel, a:{tx:0,ty:70,tz:0,dist:600,yaw:0,pitch:5,fov:42}},   // chia khung (panels)
    // ── tay đôi: máy đổi góc theo từng đòn ──
    {t0:10.0,  t1:10.45, a:{tx:0,ty:70,tz:0,dist:880,yaw:0,pitch:8,fov:48,oy:0.05}, b:{tx:0,ty:70,tz:0,dist:820,yaw:4,pitch:8,fov:48,oy:0.05}},
    {t0:10.45, t1:11.05, a:{tx:0,ty:75,tz:0,dist:430,yaw:14,pitch:2,roll:-5,fov:48}, b:{tx:0,ty:75,tz:0,dist:400,yaw:20,pitch:2,roll:-6,fov:48}},
    {t0:11.05, t1:11.6,  a:{tx:-90,ty:60,tz:0,dist:420,yaw:35,pitch:-10,roll:5,fov:50}, b:{tx:-90,ty:60,tz:0,dist:400,yaw:45,pitch:-10,roll:6,fov:50}},
    {t0:11.6,  t1:12.05, a:{tx:-90,ty:72,tz:0,dist:330,yaw:-30,pitch:4,roll:7,fov:48}, b:{tx:-90,ty:72,tz:0,dist:300,yaw:-36,pitch:4,roll:8,fov:48}},
    {t0:12.05, t1:12.5,  a:{tx:-100,ty:72,tz:0,dist:320,yaw:30,pitch:2,roll:-7,fov:48}, b:{tx:-120,ty:72,tz:0,dist:300,yaw:36,pitch:2,roll:-8,fov:48}},
    {t0:12.5,  t1:T.ult, a:{tx:-30,ty:70,tz:0,dist:520,yaw:10,pitch:6,fov:48}, b:{tx:0,ty:70,tz:0,dist:900,yaw:0,pitch:8,fov:48}, ease:'eout'},
    // ── 2 chiêu cuối: cắt xen nhanh ──
    {t0:T.ult,   t1:T.ult2,  a:{tx:-140,ty:72,tz:0,dist:300,yaw:20,pitch:4,roll:4,fov:46,ox:-0.08}, b:{tx:-140,ty:74,tz:0,dist:280,yaw:26,pitch:4,roll:5,fov:46,ox:-0.08}},
    {t0:T.ult2,  t1:T.fireG, a:{tx:140,ty:72,tz:0,dist:300,yaw:-20,pitch:4,roll:-4,fov:46,ox:0.08}, b:{tx:140,ty:74,tz:0,dist:280,yaw:-26,pitch:4,roll:-5,fov:46,ox:0.08}},
    {t0:T.fireG, t1:T.fireP, a:{tx:-115,ty:80,tz:0,dist:190,yaw:35,pitch:0,roll:10,fov:46}, b:{tx:-100,ty:80,tz:0,dist:160,yaw:40,pitch:0,roll:12,fov:46}},
    {t0:T.fireP, t1:T.race,  a:{tx:115,ty:80,tz:0,dist:190,yaw:-35,pitch:0,roll:-10,fov:46}, b:{tx:100,ty:80,tz:0,dist:160,yaw:-40,pitch:0,roll:-12,fov:46}},
    {t0:T.race,  t1:T.hit,   a:{tx:0,ty:70,tz:0,dist:700,yaw:0,pitch:5,fov:48}, b:{tx:0,ty:75,tz:0,dist:560,yaw:0,pitch:4,fov:48}, ease:'ein'},
    {t0:T.hit,   t1:T.kb,    a:{tx:0,ty:80,tz:0,dist:520,yaw:0,pitch:4,fov:50}},
    {t0:T.kb,    t1:T.open,  a:{tx:0,ty:60,tz:0,dist:700,yaw:0,pitch:6,fov:44}},   // chia khung: mỗi con nửa khung trượt lùi
    {t0:T.open,  t1:T.s15,   a:{tx:0,ty:60,tz:0,dist:1500,yaw:4,pitch:16,fov:46}, b:{tx:0,ty:60,tz:0,dist:1580,yaw:8,pitch:18,fov:46}, ease:'eout'},
    {t0:T.s15,   t1:T.DUR,   a:{tx:0,ty:70,tz:0,dist:1520,yaw:0,pitch:9,fov:46,oy:0.08}, b:{tx:0,ty:70,tz:0,dist:880,yaw:0,pitch:8,fov:46,oy:0.08}},
  ];
  const faceFlip=(F,x,ox)=>{ const a=K.proj(F.B,x,0,0), b=K.proj(F.B,ox,0,0); return a&&b ? b.x>a.x : x<ox; };
  // ⏸️ HIT-STOP: trúng đòn là nhân vật + tượng ĐỨNG HÌNH vài khung (hiệu ứng, máy, rung vẫn chạy)
  const HSTOP=[[5.55,0.1],[10.6,0.1],[11.8,0.12],[12.25,0.12],[T.hit,0.16]];
  const hs=t=>{ for(const [a,d] of HSTOP) if(t>=a && t<a+d) return a; return t; };
  const backOut=k=>{ const c=1.9, u=k-1; return 1+(c+1)*u*u*u+c*u*u; };   // vượt quá đích rồi lùi về (đà sau đòn)
  // 🥊 TAY ĐÔI 10–13s: va ngang → Pain lao, Gojo CÚI NÉ → Gojo phản đòn → Pain trả đòn → tách ra. key = [giây, x, tư thế, kiểu chuyển, nhoè]
  const TRK={ m:[[10.0,MX,'G1'],[10.2,MX,'G1'],[10.35,MX-18,'G2','eout'],[10.6,-58,'G3','ein',1],[10.95,-150,'G1','back'],[11.3,-150,'G1'],[11.42,-162,'G5','eout'],[11.6,-162,'G5'],
      [11.66,-175,'G2','eout'],[11.8,-120,'G3','ein',1],[12.05,-130,'G1','eout'],[12.25,-130,'G1'],[12.5,-205,'G4','back'],[12.75,MX,'G1','eout'],[13.0,MX,'G1']],
    d:[[10.0,DX,'P1'],[10.2,DX,'P1'],[10.35,DX+18,'P2','eout'],[10.6,58,'P3','ein',1],[10.95,150,'P1','back'],[11.1,150,'P1'],[11.25,168,'P2','eout'],[11.45,-40,'P3','ein',1],
      [11.6,-45,'P3','eout'],[11.8,-45,'P3'],[12.0,40,'P4','back'],[12.1,55,'P2','eout'],[12.25,-55,'P3','ein',1],[12.6,150,'P1','back'],[12.9,DX,'P1','eout'],[13.0,DX,'P1']] };
  const HTP={G1:140,G2:136,G3:127,G4:143,G5:87,P1:140,P2:132,P3:121,P4:137,P5:65};
  function track(K0,tq){ for(let i=1;i<K0.length;i++){ const A=K0[i-1], B=K0[i]; if(tq<B[0]){ const k=seg(tq,A[0],B[0]), e=B[3]==='ein'?ein(k):B[3]==='eout'?eout(k):B[3]==='back'?backOut(k):k;
        return {x:lerp(A[1],B[1],e), im:B[2], fast:!!B[4] && k>0.3, dir:Math.sign(B[1]-A[1])}; } } const L=K0[K0.length-1]; return {x:L[1], im:L[2], fast:false, dir:0}; }
  // bị hất văng: bay lùi xa (±SLIDE) — đứng dậy rồi bước lại đối mặt ±128
  function knock(t,tq,s,o){ const k=eout(seg(tq,KB0,KB1)); let x=lerp(s*(-o),s*SLIDE,k), y=t<KB1?26*Math.sin(Math.PI*Math.min(1,seg(t,KB0,KB1)*1.15)):0;
    if(t>=T.s15) x=lerp(s*SLIDE,s*128,eio(seg(tq,T.s15,T.s15+1.6))); return {x,y,sm:k<0.9?{dx:s*560,dy:0,dz:0,n:6}:null}; }
  function mew(t){ const tq=K.twos(t); let x=MX, z=0, y=0, lean=0, sm=null, im='mN';
    if(t>=T.a && t<T.b) im=['mS1','mS2','mS3'][Math.floor((t-T.a)/0.33)%3];
    else if(t>=T.b && t<T.tf) im=(Math.floor(t*2.5)%3===0)?'mS2':'mN';
    if(t>=T.d && t<T.tf){ const D=[[T.d,MX,0],[6.15,MX+70,-60],[6.75,MX-60,40],[7.35,MX+40,90],[8.0,MX,0]];   // lướt né sét
      for(let i=0;i<D.length-1;i++){ const [a,x0,z0]=D[i], [b,x1,z1]=D[i+1]; if(t>=a && t<b){ const k=eout(seg(tq,a,a+0.16)); x=lerp(x0,x1,k); z=lerp(z0,z1,k); if(k<0.95) sm={dx:(x1-x0)*6,dy:0,dz:(z1-z0)*6,n:5}; } } }
    if(t>=T.tf+0.5) im='mG';
    if(t>=T.mel && t<T.ult){ const P=track(TRK.m,tq); x=P.x; im=P.im; if(P.fast) sm={dx:700*P.dir,dy:0,dz:0,n:6}; }
    if(t>=T.ult && t<KB0) im='mB'; if(t>=KB0 && t<KB1+0.4) im='mK';
    if(t>=KB0){ const q=knock(t,tq,-1,MX); x=q.x; y=q.y; sm=q.sm; lean=t<KB1+0.4?0:-12*(1-seg(t,T.s15+0.2,T.s15+1.0)); }
    return {x,z,y,lean,sm,im}; }
  function dep(t){ const tq=K.twos(t); let x=DX, z=0, y=0, lean=0, sm=null, im='dN';
    if(t>=5.55 && t<T.d+0.6){ const k=eout(seg(tq,5.55,5.85)), b=seg(tq,5.95,6.35); x=lerp(DX,DX+70,k)-70*eio(b); lean=10*(1-b)*k; }   // bị tượng húc
    if(t>=T.tf+0.8) im='dP';
    if(t>=T.mel && t<T.ult){ const P=track(TRK.d,tq); x=P.x; im=P.im; if(P.fast) sm={dx:700*P.dir,dy:0,dz:0,n:6}; }
    if(t>=T.ult2-0.05 && t<KB0) im='dB'; if(t>=KB0 && t<KB1+0.4) im='dK';
    if(t>=KB0){ const q=knock(t,tq,1,-DX); x=q.x; y=q.y; sm=q.sm; lean=t<KB1+0.4?0:12*(1-seg(t,T.s15+0.3,T.s15+1.1)); }
    return {x,z,y,lean,sm,im}; }
  // tượng đá: bay NHANH (1.1s) · tượng 3 lấy đà rồi húc (0.6s)
  function statue(S,t){ t=hs(t); const u=t-S.t0; if(u<0 || t>=S.end+0.02) return null; const fly=S.hit?0.6:1.1, k0=seg(t,S.t0,S.t0+fly), k=S.hit?(k0<0.3?-0.06*eout(k0/0.3):-0.06+1.06*ein((k0-0.3)/0.7)):eio(k0);
    return {x:lerp(MX+40,DX-55,k)-(S.hit?0:lerp(0,95,k)), z:S.z*(1-(S.hit?k:0)), y:30+18*Math.sin(u*3)+(1-seg(u,0,0.25))*-30, k}; }
  function orb(F,x,y,z,r,col,a){ if(a<=0.01) return; const P=K.proj(F.B,x,y,z); if(!P) return; const R=r*P.s;
    F.list.push({d:P.d-40, fn:()=>{ const g=F.g; g.save(); g.globalCompositeOperation='lighter';
      let gr=g.createRadialGradient(P.x,P.y,0,P.x,P.y,R*2.6); gr.addColorStop(0,`rgba(${col},${0.55*a})`); gr.addColorStop(1,`rgba(${col},0)`); g.fillStyle=gr; g.fillRect(P.x-R*2.6,P.y-R*2.6,R*5.2,R*5.2);
      gr=g.createRadialGradient(P.x,P.y,0,P.x,P.y,R); gr.addColorStop(0,`rgba(255,255,255,${a})`); gr.addColorStop(0.45,`rgba(${col},${a})`); gr.addColorStop(1,`rgba(${col},0)`); g.fillStyle=gr; g.beginPath(); g.arc(P.x,P.y,R,0,Math.PI*2); g.fill();
      g.strokeStyle=`rgba(255,255,255,${0.5*a})`; g.lineWidth=Math.max(1,R*0.06); g.beginPath(); g.arc(P.x,P.y,R*(0.7+0.15*Math.sin(F.t*40)),F.t*9,F.t*9+4.2); g.stroke(); g.restore(); }}); }
  function strike(F,x,y,z,t0,seed){ const u=F.t-t0; if(u<0||u>0.35) return; const P=K.proj(F.B,x,y,z); if(!P) return;
    F.list.push({d:P.d-60, fn:()=>{ const g=F.g, top=-40, len=P.y-top, a=u<0.05?1:1-seg(u,0.05,0.35); g.save(); g.globalAlpha=a;
      VfxGL.boltSet(g,P.x+(hash(seed)-0.5)*60,top,Math.PI/2+(hash(seed+1)-0.5)*0.25,len,Math.min(9,Math.max(4,len*0.02)),seed*7+Math.floor(F.t*14),{core:'#f4fbff',rim:'#7ab8ff',glow:'rgba(120,170,255,0.4)'});
      g.globalCompositeOperation='lighter'; const gr=g.createRadialGradient(P.x,P.y,0,P.x,P.y,90); gr.addColorStop(0,`rgba(200,225,255,${0.8*a})`); gr.addColorStop(1,'rgba(120,170,255,0)'); g.fillStyle=gr; g.fillRect(P.x-90,P.y-90,180,180); g.restore(); }}); }
  // 🌍 MÔI TRƯỜNG CHỊU ẢNH HƯỞNG (anh dặn 3/11: chưởng phải có lực, môi trường phải bị ảnh hưởng) — KHÔNG vẽ vết nứt đất (luật cũ), dùng:
  //   ánh chưởng hắt màu xuống nền · vết cháy xém tối trên sàn (tồn tại lâu) · tảng đá sàn bật tung · mưa bị sóng thổi bạt / bị đẩy / bị hút · mây bị thổi tung · bụi bị hút vào lúc gồng
  function gEll(F,x,z,r){ const P=K.proj(F.B,x,0,z), Q=K.proj(F.B,x+r,0,z), U=K.proj(F.B,x,0,z+r); if(!P||!Q||!U) return null; return {x:P.x,y:P.y,rx:Math.max(2,Math.abs(Q.x-P.x)),ry:Math.max(1,Math.abs(U.y-P.y)),d:P.d}; }
  function glow(F,x,z,r,col,a){ if(a<=0.01) return; const E=gEll(F,x,z,r); if(!E) return;
    F.under.push(()=>{ const g=F.g; g.save(); g.globalCompositeOperation='lighter'; g.translate(E.x,E.y); g.scale(1,E.ry/E.rx); const gr=g.createRadialGradient(0,0,0,0,0,E.rx);
      gr.addColorStop(0,`rgba(${col},${0.75*a})`); gr.addColorStop(0.5,`rgba(${col},${0.28*a})`); gr.addColorStop(1,`rgba(${col},0)`); g.fillStyle=gr; g.beginPath(); g.arc(0,0,E.rx,0,Math.PI*2); g.fill(); g.restore(); }); }
  function scorch(F,x,z,r,a,seed){ if(a<=0.01) return; const E=gEll(F,x,z,r); if(!E) return;
    F.under.push(()=>{ const g=F.g; g.save(); g.translate(E.x,E.y); g.scale(1,E.ry/E.rx); g.globalAlpha=a; const gr=g.createRadialGradient(0,0,E.rx*0.1,0,0,E.rx);
      gr.addColorStop(0,'rgba(12,8,16,0.85)'); gr.addColorStop(0.55,'rgba(20,14,24,0.55)'); gr.addColorStop(1,'rgba(20,14,24,0)'); g.fillStyle=gr; g.beginPath();
      for(let i=0;i<=24;i++){ const th=i/24*Math.PI*2, rr=E.rx*(0.8+0.3*hash(seed*7+i)); i?g.lineTo(Math.cos(th)*rr,Math.sin(th)*rr):g.moveTo(Math.cos(th)*rr,Math.sin(th)*rr); } g.closePath(); g.fill(); g.restore(); }); }
  function slabs(F,x,z,t0,n,sp,sz,seed){ K.debris(F,{x,z,t0,n,speed:sp,life:1.7,size:sz,seed,col:'#5f5c6c'}); K.debris(F,{x,z,t0,n:Math.round(n*0.6),speed:sp*0.6,life:1.4,size:sz*0.5,seed:seed+50,col:'#3f3c4a'}); }
  // bụi / hạt sáng bị HÚT vào 1 điểm (gồng chiêu)
  function suck(F,cx,cy,cz,t0,t1,col,seed){ const t=F.t; if(t<t0||t>t1) return;
    for(let i=0;i<26;i++){ const ph=((t-t0)*1.6+hash(seed+i))%1, a=hash(seed+i*3)*Math.PI*2, r=180*(1-ein(ph)), P=K.proj(F.B,cx+Math.cos(a)*r,cy+Math.sin(a)*r*0.6,cz+Math.sin(a*1.3)*r*0.5); if(!P) continue;
      F.list.push({d:P.d-20, fn:()=>{ const g=F.g; g.save(); g.globalCompositeOperation='lighter'; g.fillStyle=`rgba(${col},${0.9*ph})`; const rr=Math.max(1,2.2*P.s*(1+ph)); g.beginPath(); g.arc(P.x,P.y,rr,0,Math.PI*2); g.fill(); g.restore(); }}); } }
  // sóng xung kích (giây, x, sức) → mưa bị thổi bạt ra ngoài trên màn hình
  const BLASTS=[[4.2,-30,0.5],[4.5,10,0.5],[5.55,DX-30,0.7],[10.6,0,0.8],[11.8,-82,0.9],[12.25,-92,0.9],[T.fireG,-110,0.6],[T.fireP,112,0.6],[T.hit,0,2.2]];
  // 🎞️ chia khung chéo: biến hình ĐỒNG THỜI (Gojo trên / Pain dưới) · bị hất văng (mỗi con nửa khung, máy bám theo)
  const SPLIT_A=[[[0,0],[1,0],[1,0.44],[0,0.56]],[[0,0.56],[1,0.44],[1,1],[0,1]]], SPLIT_B=[[[0,0],[1,0],[1,0.56],[0,0.44]],[[0,0.44],[1,0.56],[1,1],[0,1]]];
  function panels(t){
    if(t>=T.tf && t<T.mel){ const k=eout(seg(t,T.tf,T.mel));
      return [{cam:{tx:MX,ty:72,tz:0,dist:lerp(430,380,k),yaw:lerp(22,14,k),pitch:-6,roll:4,fov:42,ox:0.1},clip:SPLIT_A[0]},
              {cam:{tx:DX,ty:72,tz:0,dist:lerp(430,380,k),yaw:lerp(-22,-14,k),pitch:-6,roll:-4,fov:42,ox:-0.1},clip:SPLIT_A[1]}]; }
    if(t>=T.kb && t<T.open){ const m=mew(hs(t)), d=dep(hs(t));
      return [{cam:{tx:m.x-30,ty:58,tz:0,dist:520,yaw:28,pitch:6,roll:6,fov:44,ox:0},clip:SPLIT_B[0]},
              {cam:{tx:d.x+30,ty:58,tz:0,dist:520,yaw:-28,pitch:6,roll:-6,fov:44,ox:0},clip:SPLIT_B[1]}]; }
    return null; }
  function splitLine(F,y0,y1,a){ const g=F.g, VW=F.VW, VH=F.VH; g.save(); g.globalAlpha=a; g.lineCap='butt';
    g.strokeStyle='#000'; g.lineWidth=9; g.beginPath(); g.moveTo(-10,y0*VH); g.lineTo(VW+10,y1*VH); g.stroke();
    g.strokeStyle='#fff'; g.lineWidth=3; g.stroke(); g.restore(); }

  CineKit.film({ id:'mvd', title:'Anime Lab · Mewing Cat vs Depressed Cat', DUR:T.DUR,
    imgs:{ mN:'assets/avatars/mewingcat/avatarUrl.webp', mS1:'assets/avatars/mewingcat/skill1AvatarUrl.webp', mS2:'assets/avatars/mewingcat/skill2AvatarUrl.webp', mS3:'assets/avatars/mewingcat/skill3AvatarUrl.webp',
      mG:'assets/img/mewingcat/MEW_GOJO_IMG.webp', dN:'assets/avatars/depressedcat/avatarUrl.webp', dP:'assets/img/depressedcat/DP_PAIN_IMG.webp',
      mB:'assets/img/cine/MVD_GOJO_BLAST.png', G1:'assets/img/cine/MVD_G1.png', G2:'assets/img/cine/MVD_G2.png', G3:'assets/img/cine/MVD_G3.png', G4:'assets/img/cine/MVD_G4.png', G5:'assets/img/cine/MVD_G5.png',
      P1:'assets/img/cine/MVD_P1.png', P2:'assets/img/cine/MVD_P2.png', P3:'assets/img/cine/MVD_P3.png', P4:'assets/img/cine/MVD_P4.png', P5:'assets/img/cine/MVD_P5.png', dB:'assets/img/cine/MVD_PAIN_PUSH.png', mK:'assets/img/cine/MVD_GOJO_KB.png', dK:'assets/img/cine/MVD_PAIN_KB.png',
      st1:'assets/img/mewingcat/MEWING_STONE_1_IMG.webp', st2:'assets/img/mewingcat/MEWING_STONE_2_IMG.webp', st3:'assets/img/mewingcat/MEWING_STONE_3_IMG.webp',
      cA:'assets/img/depressedcat/DP_CLOUD_A.webp', cB:'assets/img/depressedcat/DP_CLOUD_B.webp' },
    sfx:[[0.2,'l2p_rumble',0.5],[T.c1,'sm_schwing',0.7],[T.c2,'l2p_whoosh',0.6],[T.a,'mewing_song',0.5,1.0],[3.25,'ar_stone_on',0.8],[3.55,'ar_stone_on',0.8],
      [T.b,'dp_rain',0.5,9.1],[4.2,'thunder_big',0.9],[4.2,'mewing_statue_break',0.9],[4.5,'holy_thunder',0.8],[4.5,'ar_stone_break',0.9],
      [4.95,'fr_dash',0.8],[5.55,'cine_strongpunch',1],[5.55,'mewing_statue_break',0.8],
      [6.15,'l2p_whoosh',0.6],[6.3,'thunder_big',0.7],[6.75,'l2p_whoosh',0.6],[6.9,'holy_thunder',0.7],[7.35,'l2p_whoosh',0.6],[7.5,'thunder_big',0.8],
      [T.tf+0.45,'ep3_charge',0.9],[T.tf+0.5,'sm_schwing',0.8],[T.tf+0.75,'dp_akatsuki',0.9],[T.tf+0.8,'dp_cloak',0.7],
      [10.36,'fr_dash',0.8],[10.6,'cine_haki_hit',1],[11.26,'fr_dash',0.8],[11.34,'l2p_whoosh',0.7],[11.67,'fr_dash',0.7],[11.8,'cine_strongpunch',1],[12.11,'fr_dash',0.7],[12.25,'cine_haki_hit',1],[12.27,'lightsaber_clash_06',0.6],
      [T.ult,'mw_gojo',1],[T.ult2+0.05,'ps_shinra',1],[T.race,'l2p_riser',0.7],
      [T.hit,'ep3_explode',1],[T.hit,'cine_deep_impact',1],[T.hit,'l2p_explode',0.9],[KB1-0.1,'cine_impact',0.8],[KB1,'ep3_quake',0.6],[T.s15+1.4,'cine_drop',0.5]],
    mus:[{src:'assets/audio/cine_horns.mp3',ra:0,rb:T.DUR,vol:0.32,fi:1,fo:1.5}],
    theme:t=>t<T.b?dusk:storm, shots, panels,
    impact:t=>(t>=4.2&&t<4.27)||(t>=4.5&&t<4.56)?'bw':(t>=5.55&&t<5.61)?'inv':(t>=10.6&&t<10.66)?'bw':(t>=11.8&&t<11.86)?'inv':(t>=12.25&&t<12.31)?'bw':(t>=T.hit&&t<T.hit+0.07)?'red':(t>=T.hit+0.07&&t<T.hit+0.14)?'inv':(t>=T.hit+0.14&&t<T.hit+0.2)?'bw':0,
    shake:t=>{ let s=0; const h=(a,amp,d)=>{ if(t>=a&&t<a+d) s=Math.max(s,amp*(1-(t-a)/d)); };
      h(4.2,7,0.4); h(4.5,7,0.4); h(5.55,12,0.5); for(const b of [6.3,6.9,7.5]) h(b,5,0.3); h(10.6,10,0.4); h(11.8,12,0.5); h(12.25,11,0.45); h(T.hit,30,1.2); h(T.fireG,9,0.35); h(T.fireP,9,0.35); h(KB1,6,0.4);
      if(t>=T.ult&&t<T.hit) s=Math.max(s,1.2+2.8*seg(t,T.ult,T.hit)); if(t>=T.tf+0.5&&t<T.mel) s=Math.max(s,1.5); return s; },
    world(F,t){ const I=F.I, m=mew(hs(t)), d=dep(hs(t));
      const HT={...HTP, mG:H*1.18,dP:H*1.12,mB:H*1.15,dB:H*1.15,mK:H*0.95,dK:H*0.95}, mh=HT[m.im]||H, dh=HT[d.im]||H;
      const mAura=(t>=T.tf+0.35)?{preset:'ki',k:t<T.tf+0.7?seg(t,T.tf+0.35,T.tf+0.7):(t>=T.ult&&t<T.hit?1:0.7),seed:3}:null;
      const dAura=(t>=T.tf+0.65)?{preset:'cursed',k:t<T.tf+1.0?seg(t,T.tf+0.65,T.tf+1.0):(t>=T.ult2&&t<T.hit?1:0.7),seed:9}:null;
      const flashM=(t>=T.tf+0.5&&t<T.tf+0.62)?1:0, flashD=(t>=T.tf+0.8&&t<T.tf+0.92)?1:0;
      K.sprite(F,{img:I[m.im],x:m.x,z:m.z,y:m.y,h:mh,lean:m.lean,smear:m.sm,aura:mAura,white:flashM||(t>=T.hit&&t<T.hit+0.12?1:0)});
      K.sprite(F,{img:I[d.im],x:d.x,z:d.z,y:d.y,h:dh,lean:d.lean,smear:d.sm,aura:dAura,flip:d.im==='dN'?faceFlip(F,d.x,m.x):false,white:flashD||(t>=5.55&&t<5.63?1:0)||(t>=T.hit&&t<T.hit+0.12?1:0)});
      K.smoke(F,{x:0,z:60,t0:-0.3,n:12,spread:560,rise:18,life:2.0,size:30,seed:1,swirl:0.25,a:0.3,tint:'170,130,140'});
      // tượng đá Moai
      for(const [i,S] of STATUES.entries()){ const p=statue(S,t); if(!p) continue;
        K.sprite(F,{img:I[S.img],x:p.x,z:p.z,y:p.y,h:100,flip:true,smear:p.k<0.97&&p.k>0?{dx:620,dy:0,dz:0,n:5}:null,aura:{col:'200,190,170',k:0.25},shadow:true});
        if(t-S.t0<0.35) K.smoke(F,{x:MX+40,z:S.z,t0:S.t0,n:8,spread:60,rise:40,life:0.7,size:30,seed:30+i,a:0.6}); }
      for(const [i,S] of STATUES.entries()){ if(t<S.end) continue; const p=statue(S,S.end-0.001); if(!p) continue;
        K.debris(F,{x:p.x,y:p.y,z:p.z,t0:S.end,n:16,speed:420,life:1.2,size:12,seed:50+i,col:'#7c776f'}); K.smoke(F,{x:p.x,z:p.z,t0:S.end,n:10,spread:100,rise:50,life:1.1,size:30,seed:60+i,a:0.45});
        K.sparks(F,{x:p.x,y:p.y+30,z:p.z,t0:S.end,n:18,speed:460,life:0.45,seed:70+i,col:'200,225,255'}); }
      // sét bổ
      for(const [i,[bt,si]] of BOLTS.entries()){ let x, z;
        if(si>=0){ const p=statue(STATUES[si],bt-0.001); if(!p) continue; x=p.x; z=p.z; } else { const mm=mew(bt-0.15); x=mm.x+((i%2)?40:-40); z=mm.z; }
        strike(F,x,0,z,bt,i+1); if(t>=bt){ const u=seg(t,bt,bt+0.45); K.ring(F,x,z,20+200*eout(u),10,(1-u)*0.9,'150,190,255'); if(si<0) K.smoke(F,{x,z,t0:bt,n:10,spread:80,rise:50,life:1.0,size:36,seed:80+i,a:0.6,tint:'120,130,170'}); } }
      if(t>=5.55){ const u=seg(t,5.55,6.0); K.ring(F,DX-30,0,30+300*eout(u),14,1-u,'230,220,200'); }   // tượng 3 húc trúng
      // biến hình: bùng khí
      for(const [tt,x,col,sd] of [[T.tf+0.5,MX,'120,190,255',91],[T.tf+0.8,DX,'170,90,255',92]]) if(t>=tt){ const u=seg(t,tt,tt+0.6);
        K.ring(F,x,0,20+260*eout(u),12,1-u,col); K.smoke(F,{x,z:0,t0:tt,n:14,spread:180,rise:70,life:1.2,size:46,seed:sd,swirl:2,a:0.55}); }
      // tay đôi: hiệu ứng đúng điểm chạm
      for(const [tt,sd,cx] of [[10.6,101,0],[11.8,102,-82],[12.25,103,-92]]) if(t>=tt){ const u=seg(t,tt,tt+0.45);
        K.ring(F,cx,0,30+360*eout(u),14,1-u,'220,200,255'); K.sparks(F,{x:cx,y:75,z:0,t0:tt,n:26,speed:560,life:0.55,seed:sd,col:'200,170,255'}); K.smoke(F,{x:cx,z:0,t0:tt,n:12,spread:200,rise:40,life:1.1,size:44,seed:sd,a:0.6}); }
      if(t>=11.3&&t<11.75){ const u=seg(t,11.3,11.75); K.smoke(F,{x:-150,z:0,t0:11.32,n:6,spread:60,rise:10,life:0.5,size:26,seed:115,a:0.45*(1-u)}); }   // bụi lúc Gojo cúi né
      // HOLLOW PURPLE: cầu xanh + đỏ dồn NHANH vào đệm chân → cầu tím phồng → bắn
      const _mbc=K.prep(I.mB), _mbw=_mbc?H*1.15*_mbc.sw/_mbc.sh:100, HP0=T.ult+0.02, HPm=T.ult+0.42;
      if(t>=HP0 && t<T.hit){ const k=eio(seg(t,HP0,HPm)), cx=MX+(0.951-0.5)*_mbw+12, cy=H*1.15*0.6, sp=1-k;
        if(k<1){ orb(F,cx-65*sp,cy+25*sp,-40*sp,16+4*Math.sin(t*30),'90,170,255',1); orb(F,cx+65*sp,cy+25*sp,40*sp,16+4*Math.sin(t*33),'255,70,80',1); }
        if(t>=HPm){ const g=seg(t,HPm,T.fireG), fly=seg(t,T.fireG,T.hit), x=lerp(cx,0,ein(fly)); orb(F,x,cy-10*fly,0,(22+26*g+18*fly)*(1+0.08*Math.sin(t*50)),'170,80,255',1); if(fly>0) for(let j=1;j<=6;j++) orb(F,lerp(cx,0,ein(Math.max(0,fly-j*0.04))),cy-10*fly,0,(20+14*g)*(1-j/7),'150,70,240',0.35*(1-j/7));   // vệt đuôi tím
          if(fly>0) K.smoke(F,{x:x-40,z:0,t0:T.fireG,n:6,spread:30,rise:10,life:0.5,size:20,seed:120,a:0.35,tint:'150,90,220'}); } }
      // SHINRA TENSEI: vòng dồn lực co NHANH quanh Pain, rồi bức tường đẩy lao sang trái
      if(t>=T.ult2 && t<T.fireP){ for(let i=0;i<3;i++){ const ph=((t-T.ult2)*2.6+i/3)%1; K.ring(F,d.x-40,0,300*(1-ph)+20,8,ph*0.85,'235,225,255'); } }
      if(t>=T.fireP && t<T.hit+0.05){ const fly=ein(seg(t,T.fireP,T.hit)), _dbc=K.prep(I.dB), _dbw=_dbc?H*1.15*_dbc.sw/_dbc.sh:100, xw=lerp(DX+(0.039-0.5)*_dbw-10,0,fly), P=K.proj(F.B,xw,H*1.15*0.661,0);
        if(P) F.list.push({d:P.d-40, fn:()=>{ const g=F.g, ry=210*P.s, rx=60*P.s; g.save(); g.globalCompositeOperation='lighter';
          const gr=g.createRadialGradient(P.x,P.y,0,P.x,P.y,ry); gr.addColorStop(0,'rgba(255,255,255,0)'); gr.addColorStop(0.7,'rgba(220,215,255,0.18)'); gr.addColorStop(0.92,'rgba(255,255,255,0.7)'); gr.addColorStop(1,'rgba(255,255,255,0)');
          g.translate(P.x,P.y); g.scale(rx/ry,1); g.translate(-P.x,-P.y); g.fillStyle=gr; g.beginPath(); g.arc(P.x,P.y,ry,0,Math.PI*2); g.fill(); g.restore(); }});
        K.ring(F,xw,0,30,10,0.6,'235,230,255'); }
      // VA NHAU
      if(t>=T.hit){ const u=seg(t,T.hit,T.hit+0.9); orb(F,0,80,0,40+380*eout(u),'190,120,255',(1-u)*1.2); orb(F,0,80,0,20+160*eout(u),'255,255,255',(1-u)*0.9);
        K.ring(F,0,0,40+1100*eout(seg(t,T.hit+0.08,T.hit+1.3)),26,1-seg(t,T.hit+0.08,T.hit+1.3),'255,240,255');
        K.ring(F,0,0,40+700*eout(seg(t,T.hit,T.hit+1)),20,1-seg(t,T.hit,T.hit+1),'210,170,255');
        K.smoke(F,{x:0,z:0,t0:T.hit,n:16,spread:420,rise:90,life:1.8,size:55,seed:130,a:0.5,tint:'150,120,190'});
        K.debris(F,{x:0,z:0,t0:T.hit,n:24,speed:620,life:1.8,size:13,seed:131,col:'#5d5568'}); K.sparks(F,{x:0,y:80,z:0,t0:T.hit,n:40,speed:800,life:0.8,seed:132,col:'220,190,255'});
        // vệt bụi dài theo đường trượt của 2 con
        for(let i=0;i<8;i++){ const tt=KB0+i*0.15; if(t<tt) continue; const kk=eout(seg(tt,KB0,KB1));
          K.smoke(F,{x:lerp(-190,-SLIDE,kk),z:0,t0:tt,n:3,spread:30,rise:22,life:1.0,size:24,seed:140+i,a:0.45}); K.smoke(F,{x:lerp(190,SLIDE,kk),z:0,t0:tt,n:3,spread:30,rise:22,life:1.0,size:24,seed:150+i,a:0.45}); } }
      if(t>=T.s15) K.smoke(F,{x:0,z:40,t0:T.s15,n:16,spread:800,rise:20,life:3,size:60,seed:160,a:0.3});
      // 🌍 môi trường
      for(const [i,[bt,si]] of BOLTS.entries()) if(t>=bt){ let x,z; if(si>=0){ const p=statue(STATUES[si],bt-0.001); if(!p) continue; x=p.x; z=p.z; } else { const mm=mew(bt-0.15); x=mm.x+((i%2)?40:-40); z=mm.z; }
        glow(F,x,z,170,'150,190,255',1-seg(t,bt,bt+0.35)); scorch(F,x,z,46,0.8*(1-seg(t,bt+2,bt+6)),i+3); if(t<bt+1.6) slabs(F,x,z,bt,6,320,14,200+i); }
      if(t>=5.55){ glow(F,DX-30,0,200,'255,230,200',1-seg(t,5.55,5.9)); slabs(F,DX-40,0,5.55,8,380,16,210); }
      for(const [tt,cx,sd] of [[10.6,0,220],[11.8,-82,221],[12.25,-92,222]]) if(t>=tt){ glow(F,cx,0,230,'210,170,255',1-seg(t,tt,tt+0.4)); scorch(F,cx,0,55,0.7*(1-seg(t,tt+3,tt+7)),sd); if(t<tt+1.8) slabs(F,cx,0,tt,8,420,15,sd); }
      if(t>=T.tf+0.5 && t<T.mel){ glow(F,MX,0,220,'110,180,255',0.6+0.2*Math.sin(t*14)); } if(t>=T.tf+0.8 && t<T.mel){ glow(F,DX,0,220,'150,80,255',0.6+0.2*Math.sin(t*13)); }
      // gồng Hollow Purple: hạt sáng + bụi bị hút vào chân trước, nền dưới hắt tím · Shinra: bụi bị ĐẨY bật ra quanh Pain, nền hắt trắng
      { const cxp=MX+(0.951-0.5)*_mbw+12, cyp=H*1.15*0.6; suck(F,cxp,cyp,0,T.ult,T.fireG,'200,160,255',300); if(t>=T.ult&&t<T.hit) glow(F,cxp,0,160+60*seg(t,T.ult,T.fireG),'170,90,255',0.8);
        if(t>=T.ult+0.1&&t<T.fireG) K.smoke(F,{x:cxp,z:0,t0:T.ult+0.1,n:10,spread:-120,rise:5,life:0.8,size:24,seed:301,swirl:3,a:0.4}); }
      if(t>=T.ult2&&t<T.fireP){ glow(F,DX-40,0,200,'230,225,255',0.7); K.smoke(F,{x:DX-40,z:0,t0:T.ult2,n:14,spread:260,rise:8,life:0.7,size:30,seed:302,a:0.45}); }
      // đường bay: cầu tím cày cháy sàn, bức tường Shinra hất bụi dọc đường
      if(t>=T.fireG){ const x0=MX+(0.951-0.5)*_mbw+12, x1=lerp(x0,0,ein(seg(Math.min(t,T.hit),T.fireG,T.hit))); for(let x=x0;x<x1;x+=26) scorch(F,x,0,22,0.55*(1-seg(t,T.hit+3,T.hit+8)),Math.round(x)); if(t<T.hit) glow(F,x1,0,140,'170,90,255',1); }
      if(t>=T.fireP && t<T.hit){ const xw=lerp(112,0,ein(seg(t,T.fireP,T.hit))); K.smoke(F,{x:xw,z:0,t0:t-0.05,n:4,spread:90,rise:30,life:0.5,size:30,seed:Math.floor(t*30),a:0.5}); glow(F,xw,0,150,'235,230,255',0.8); }
      // VA NHAU CUỐI: hố cháy xém lớn, tảng sàn bật tung, vòng bụi dâng như mái vòm, nền loé tím trắng
      if(t>=T.hit){ glow(F,0,0,620,'220,180,255',1.4*(1-seg(t,T.hit,T.hit+0.7))); scorch(F,0,0,210,0.9,400);
        if(t<T.hit+2.2){ slabs(F,0,0,T.hit,18,760,34,401); slabs(F,0,0,T.hit+0.05,14,520,22,402); }
        K.smoke(F,{x:0,z:0,t0:T.hit+0.05,n:28,spread:780,rise:120,life:2.4,size:90,seed:403,a:0.55,tint:'150,130,180'}); } },
    post(F,t){ const fx={shocks:[]}; if(F.panels){ if(t<T.mel) fx.heat={k:2.2,t}; return fx; }   // đang chia khung: chỉ hậu kỳ toàn khung
      const sh=(a,x,y,rm,d,str)=>{ if(t>=a&&t<a+d){ const u=(t-a)/d; fx.shocks.push({x,y,z:0,r:20+rm*eout(u),w:26,str:str*(1-u)}); fx.chroma=Math.max(fx.chroma||0,2*(1-u)); } };
      sh(5.55,DX-30,60,320,0.45,20); sh(10.6,0,70,340,0.45,22); sh(11.8,-82,70,380,0.5,26); sh(12.25,-92,70,360,0.45,24); sh(T.hit,0,80,820,1.1,48); sh(T.hit+0.15,0,80,520,0.8,30); sh(T.fireG,-110,83,300,0.4,18); sh(T.fireP,112,80,300,0.4,18);
      if(t>=T.ult+0.42&&t<T.ult2){ fx.shocks.push({x:-110,y:83,z:0,r:60+20*Math.sin(t*20),w:30,str:10}); fx.chroma=Math.max(fx.chroma||0,1); }
      for(const [a,b,cx] of [[10.4,10.6,0],[11.3,11.45,-60],[11.68,11.8,-82],[12.13,12.25,-92]]) if(t>=a&&t<b) fx.zoom={x:cx,y:80,z:0,k:0.08};
      if(t>=T.race&&t<T.hit){ fx.zoom={x:0,y:80,z:0,k:0.12*seg(t,T.race,T.hit)}; fx.chroma=Math.max(fx.chroma||0,1.6*seg(t,T.race,T.hit)); }
      return fx; },
    screen(F,t){ const g=F.g, VW=F.VW, VH=F.VH;
      if(!F.panels){ F._bp={}; for(const [bt,bx] of BLASTS){ const P=K.proj(F.B,bx,70,0); if(P) F._bp[bt]=P; } const Q=K.proj(F.B,DX-40,70,0); F._pp=Q; }
      const blow=seg(t,T.hit,T.hit+1.2), cl=t<T.b?0:Math.min(1,(t-T.b)/0.5)*(t>=T.hit?1-0.75*eout(blow):1);   // mây bị vụ nổ thổi tung, trăng lộ ra
      if(cl>0){ g.save(); const gr=g.createLinearGradient(0,0,0,VH*0.45); gr.addColorStop(0,`rgba(8,8,18,${0.75*cl})`); gr.addColorStop(1,'rgba(8,8,18,0)'); g.fillStyle=gr; g.fillRect(0,0,VW,VH*0.45);
        for(let i=0;i<4;i++){ const im=F.I[i%2?'cB':'cA'], c=K.prep(im); if(!c) continue; const w=VW*0.9, h=w*c.sh/c.sw, x=((i*0.37+t*0.015*(i%2?1:-1))%1.4-0.2)*VW-w/2+VW*0.3+(i%2?1:-1)*VW*0.9*eout(blow), y=-h*0.35+i*12-VH*0.1*eout(blow);
          g.globalAlpha=0.55*cl; g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,x,y,w,h); } g.restore(); }
      if(t>=T.hit+0.3){ const a=seg(t,T.hit+0.3,T.hit+1.8)*(t>=T.s15?0.8:1); g.save(); g.globalCompositeOperation='lighter'; const gr=g.createRadialGradient(VW*0.5,VH*0.08,0,VW*0.5,VH*0.08,VW*0.8); gr.addColorStop(0,`rgba(200,190,255,${0.35*a})`); gr.addColorStop(1,'rgba(200,190,255,0)'); g.fillStyle=gr; g.fillRect(0,0,VW,VH*0.6); g.restore(); }   // trời quang ra sau vụ nổ
      const rainK=t<T.b?0:t<T.d?0.55:t<T.tf?1:t<T.mel?0.9:t<T.hit?0.7:0.7-0.55*seg(t,T.hit,T.hit+1.5);
      if(rainK>0){ const frozen=t>=T.tf+0.8&&t<T.mel, tr=frozen?T.tf+0.8:t; g.save(); g.strokeStyle=frozen?'rgba(210,190,255,0.55)':'rgba(190,205,235,0.45)'; g.lineWidth=frozen?1.4:1.1;
        for(let i=0,n=Math.round(170*rainK);i<n;i++){ const x=((hash(i)*VW*1.2+tr*90)%(VW*1.2))-VW*0.1, y=((hash(i+0.5)*VH+tr*(900+300*hash(i+0.7)))%(VH+60))-30, L=frozen?6:16+14*hash(i+0.9);
          let px=x, py=y, lx=-L*0.18, ly=L;
          for(const [bt,bx,bs] of BLASTS){ const u=t-bt; if(u<0||u>0.9) continue; const P=F._bp&&F._bp[bt]; if(!P) continue; const dx=x-P.x, dy=y-P.y, dd=Math.hypot(dx,dy)||1, wave=u*VH*1.6*bs, f=bs*60*Math.exp(-Math.pow((dd-wave)/(80+60*bs),2))*(1-u/0.9);
            px+=dx/dd*f; py+=dy/dd*f; lx+=dx/dd*f*0.4; ly+=dy/dd*f*0.4; }   // sóng xung kích thổi bạt mưa
          if(t>=T.ult2&&t<T.fireP&&F._pp){ const dx=x-F._pp.x, dy=y-F._pp.y, dd=Math.hypot(dx,dy)||1; if(dd<VW*0.45){ const f=(VW*0.45-dd)*0.5; px+=dx/dd*f; py+=dy/dd*f; } }   // Shinra: mưa bị đẩy bật khỏi Pain
          g.beginPath(); g.moveTo(px,py); g.lineTo(px+lx,py+ly); g.stroke(); } g.restore(); }
      // tia tập trung / vệt gió
      if(t>=T.c1&&t<T.a) K.speedLines(F,{k:0.7,n:70,r0:0.38,cx:t<T.c2?VW*0.36:VW*0.64});
      if(t>=T.tf+0.4&&t<T.mel) K.speedLines(F,{k:0.45,n:60,r0:0.42});
      if(t>=T.ult&&t<T.race) K.speedLines(F,{k:0.5+0.4*seg(t,T.ult,T.race),n:80,r0:0.34,col:t<T.ult2?'rgba(200,170,255,0.8)':'rgba(255,255,255,0.8)'});
      if((t>=4.95&&t<5.55)||(t>=10.4&&t<10.6)||(t>=11.3&&t<11.45)||(t>=11.68&&t<11.8)||(t>=12.13&&t<12.25)||(t>=T.race&&t<T.hit)) K.panLines(F,{k:0.9,ang:0,n:30});
      if(t>=T.kb&&t<T.open) K.panLines(F,{k:1-0.6*seg(t,T.kb,T.open),ang:0,n:34});
      // đường chia khung chéo
      if(t>=T.tf&&t<T.mel) splitLine(F,0.56,0.44,Math.min(1,(t-T.tf)/0.08));
      if(t>=T.kb&&t<T.open) splitLine(F,0.44,0.56,1);
      // chữ
      K.sfxText(F,'BONK!',VW*0.62,VH*0.33,{t0:5.55,life:0.6,px:80,rot:-10});
      K.sfxText(F,'DON!',VW*0.5,VH*0.3,{t0:10.6,life:0.5,px:84,rot:-8});
      K.sfxText(F,'BAM!',VW*0.4,VH*0.3,{t0:11.8,life:0.45,px:84,rot:8,col:'#9fd0ff'});
      K.sfxText(F,'DOOON!!',VW*0.45,VH*0.3,{t0:12.25,life:0.55,px:84,rot:-6,col:'#c9a7ff'});
      K.sfxText(F,'HOLLOW PURPLE',VW*0.5,VH*0.2,{t0:T.ult+0.12,life:0.6,px:44,rot:-4,col:'#c9a7ff'});
      K.sfxText(F,'SHINRA TENSEI',VW*0.5,VH*0.2,{t0:T.ult2+0.1,life:0.6,px:44,rot:4,col:'#ffffff'});
      if(t>=T.hit&&t<T.hit+0.06) K.flash(F,0.9,'#fff'); if((t>=T.fireG&&t<T.fireG+0.05)||(t>=T.fireP&&t<T.fireP+0.05)) K.flash(F,0.55,t<T.fireP?'#d6b8ff':'#ffffff'); if(t>=T.hit+0.2&&t<T.kb) K.flash(F,0.5*(1-seg(t,T.hit+0.2,T.kb)),'#e9dcff');
      for(const b of [4.2,4.5,6.3,6.9,7.5]) if(t>=b&&t<b+0.05) K.flash(F,0.55,'#dfe9ff');
      if((t>=T.tf+0.5&&t<T.tf+0.56)||(t>=T.tf+0.8&&t<T.tf+0.86)) K.flash(F,0.5,'#fff');
      K.letterbox(F,t<T.c1?1-seg(t,1.0,T.c1):t>=T.s15?seg(t,T.s15,T.s15+0.5):0);
      K.vignette(F,0.5);
      if(t>=20.0){ const a=seg(t,20.0,20.5); g.save(); g.globalAlpha=a; g.textAlign='center'; g.lineJoin='round';
        g.font='900 42px "Arial Black",Impact,sans-serif'; g.lineWidth=10; g.strokeStyle='#000'; g.strokeText('MEWING CAT',VW/2,VH*0.2); g.fillStyle='#9fd0ff'; g.fillText('MEWING CAT',VW/2,VH*0.2);
        g.font='900 26px "Arial Black",Impact,sans-serif'; g.lineWidth=7; g.strokeText('vs',VW/2,VH*0.2+38); g.fillStyle='#fff'; g.fillText('vs',VW/2,VH*0.2+38);
        g.font='900 40px "Arial Black",Impact,sans-serif'; g.lineWidth=10; g.strokeText('DEPRESSED CAT',VW/2,VH*0.2+82); g.fillStyle='#c9a7ff'; g.fillText('DEPRESSED CAT',VW/2,VH*0.2+82); g.restore(); } }
  });
})();
