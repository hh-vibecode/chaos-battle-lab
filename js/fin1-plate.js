// 🎞️ Fin1Plate — bộ vẽ 2D THEO LỚP dùng chung cho các cảnh Final (16/11/2026): nền vẽ tay + meme ẢNH GỐC + vật rời phông xanh + VFX code.
// Mỗi phim: const P=Fin1Plate(); rồi P.bg / P.spr / P.streak / … trong hàm vẽ của từng shot (toạ độ logic 960×540). Mẫu đầy đủ: js/film-fin1f1.js (bản gốc các hàm này).
(function(){
  if(window.Fin1Plate) return;
  window.Fin1Plate=function(){ const K=CineKit, {seg,lerp,clamp,hash}=K, EA=K.EASE, eout=EA.eout, ein=EA.ein, eio=EA.eio, TAU=Math.PI*2, VW=960, VH=540;
    function cover(g,im,zm,cx,cy){ if(!im||!im.naturalWidth) return; const sc=Math.max(VW/im.naturalWidth,VH/im.naturalHeight)*zm*1.03, w=im.naturalWidth*sc, h=im.naturalHeight*sc; g.drawImage(im,VW*0.5-w*cx,VH*0.5-h*cy,w,h); }
    function bg(F,key,zm,cx,cy,o){ const g=F.g; o=o||{}; g.save(); if(o.alpha!=null) g.globalAlpha=o.alpha; if(o.blur) g.filter='blur('+o.blur+'px)'; cover(g,F.I[key],zm,cx==null?0.5:cx,cy==null?0.5:cy); g.restore(); }
    // ảnh meme: chân đặt ở (x,y), cao h · o: flip, rot, sx, sy, alpha, shadow, glow, glowA, tint, tintA, ghost:[dx,dy,n], dark
    function spr(F,key,x,y,h,o){ const c=K.prep(F.I[key]); if(!c) return null; const g=F.g, w=h*c.sw/c.sh; o=o||{}; const al=o.alpha==null?1:o.alpha;
      if(o.shadow!==false){ g.save(); g.globalAlpha=0.45*al*(o.shadowK==null?1:o.shadowK); g.fillStyle='#000'; g.beginPath(); g.ellipse(x,o.gy==null?y:o.gy,w*0.4,Math.max(2,h*0.045),0,0,TAU); g.fill(); g.restore(); }
      const draw=(src,a,dx,dy,comp)=>{ g.save(); g.globalAlpha=a; if(comp) g.globalCompositeOperation=comp; if(o.pixel) g.imageSmoothingEnabled=false; g.translate(x+(dx||0),y+(dy||0)); if(o.rot) g.rotate(o.rot); g.scale((o.flip?-1:1)*(o.sx||1),o.sy||1);
        if(src===c) g.drawImage(c.src,c.sx,c.sy,c.sw,c.sh,-w/2,-h,w,h); else g.drawImage(src,-w/2,-h,w,h); g.restore(); };
      if(o.ghost){ const [gx,gy,n]=o.ghost; for(let k=n;k>=1;k--) draw(c,al*0.22*(n+1-k)/n,-gx*k,-gy*k); }
      if(o.glow){ const tg=K.tinted(c,o.glow), a=(o.glowA==null?0.6:o.glowA)*al; for(const [dx,dy] of [[-3,0],[3,0],[0,-3],[0,3]]) draw(tg,a,dx,dy,'lighter'); }
      draw(c,al); if(o.tint) draw(K.tinted(c,o.tint),(o.tintA==null?0.4:o.tintA)*al,0,0,'lighter'); if(o.dark) draw(K.tinted(c,'#05040a'),o.dark*al);
      return {w,h,c}; }
    // vật rời trong 1 tấm atlas (phông xanh đã tách): bb=[x,y,w,h], tâm ở (x,y), cao h, xoay rot
    function obj(F,key,bb,x,y,h,rot,o){ const im=F.I[key]; if(!im||!im.naturalWidth) return; const g=F.g, w=h*bb[2]/bb[3]; o=o||{}; g.save(); if(o.alpha!=null) g.globalAlpha=o.alpha; g.translate(x,y); g.rotate(rot||0); if(o.flip) g.scale(-1,1); g.drawImage(im,bb[0],bb[1],bb[2],bb[3],-w/2,-h/2,w,h); g.restore(); }
    function puff(g,x,y,r,a,col){ if(a<=0.01||r<=0.5) return; const gr=g.createRadialGradient(x,y,0,x,y,r); gr.addColorStop(0,'rgba('+col+','+a+')'); gr.addColorStop(0.6,'rgba('+col+','+(a*0.45)+')'); gr.addColorStop(1,'rgba('+col+',0)'); g.fillStyle=gr; g.fillRect(x-r,y-r,2*r,2*r); }
    function dust(g,x,y,u,R,col,seed){ if(u<0||u>1) return; for(let i=0;i<10;i++){ const an=Math.PI*(hash(seed+i))+Math.PI, d=R*(0.3+0.7*eout(u))*(0.6+0.6*hash(seed+i+20)); puff(g,x+Math.cos(an)*d*1.6,y+Math.sin(an)*d*0.35-u*R*0.15,R*(0.18+0.16*hash(seed+i+40))*(0.7+u),0.35*(1-u),col||'150,130,120'); } }
    function ring(g,x,y,r,a,col,lw){ if(a<=0.01) return; g.save(); g.strokeStyle='rgba('+(col||'255,230,160')+','+a+')'; g.lineWidth=lw||3; g.beginPath(); g.ellipse(x,y,r,r*0.22,0,0,TAU); g.stroke(); g.restore(); }
    function streak(g,x0,y0,x1,y1,w,col,core,fade){ fade=fade==null?1:fade; if(fade<=0.01) return; const an=Math.atan2(y1-y0,x1-x0), nx=-Math.sin(an), ny=Math.cos(an);
      g.save(); g.globalCompositeOperation='lighter'; for(const [k,a,cc] of [[2.4,0.3,col],[1.2,0.75,col],[0.45,1,core||'255,255,240']]){ const ww=w*k, tw=ww*0.35; g.fillStyle='rgba('+cc+','+(a*fade)+')'; g.beginPath(); g.moveTo(x0-nx*tw/2,y0-ny*tw/2); g.lineTo(x1-nx*ww/2,y1-ny*ww/2); g.arc(x1,y1,ww/2,an-Math.PI/2,an+Math.PI/2,false); g.lineTo(x0+nx*tw/2,y0+ny*tw/2); g.closePath(); g.fill(); } g.restore(); }
    function zap(g,x,y,ang,len,wd,seed,col){ const H=n=>hash(seed*31+n), path=(x0,y0,a,L,n,o)=>{ const P=[[x0,y0]]; let px=x0, py=y0; for(let i=1;i<=n;i++){ const j=(H(o+i)-0.5)*L*0.34; px+=Math.cos(a)*L/n-Math.sin(a)*j; py+=Math.sin(a)*L/n+Math.cos(a)*j; P.push([px,py]); } return P; };
      const M=path(x,y,ang,len,8,0), B=[M]; for(let k=0;k<2;k++){ const q=M[3+((H(50+k)*4)|0)]; B.push(path(q[0],q[1],ang+(H(60+k)<0.5?-1:1)*(0.5+0.5*H(70+k)),len*(0.25+0.2*H(80+k)),6,100+k*20)); }
      const cs=col==='red'?[[3.5,'rgba(255,30,30,0.22)'],[1.3,'rgba(255,60,50,0.85)'],[0.5,'rgba(255,230,230,1)']]:col==='purple'?[[3.5,'rgba(170,60,255,0.22)'],[1.3,'rgba(200,120,255,0.85)'],[0.5,'rgba(245,230,255,1)']]:[[3.5,'rgba(255,160,20,0.2)'],[1.3,'rgba(255,205,70,0.8)'],[0.5,'rgba(255,252,235,1)']];
      g.save(); g.lineCap='round'; g.lineJoin='round'; g.globalCompositeOperation='lighter'; for(const [lw,cc] of cs) B.forEach((P,bi)=>{ g.strokeStyle=cc; g.lineWidth=wd*lw*(bi?0.55:1); g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); }); g.restore(); }
    function sparks(g,x,y,t0,t,n,sp,col,seed){ const u=(t-t0)/0.45; if(u<0||u>1) return; g.save(); g.globalCompositeOperation='lighter'; g.strokeStyle='rgba('+(col||'255,200,90')+','+(1-u)+')'; g.lineWidth=2;
      for(let i=0;i<n;i++){ const an=hash(seed+i)*TAU, d=sp*u*(0.5+hash(seed+i+50)), px=x+Math.cos(an)*d, py=y+Math.sin(an)*d+u*u*40; g.beginPath(); g.moveTo(px,py); g.lineTo(px-Math.cos(an)*10,py-Math.sin(an)*10); g.stroke(); } g.restore(); }
    // sao 4 cánh nhọn (loé) — anh sửa 16/11: cánh tam giác thon, ngang dài hơn dọc
    function star4(g,x,y,L,W,a){ if(a<=0.01||L<1) return; const sp=(an,len,w)=>{ const c=Math.cos(an), s=Math.sin(an); g.beginPath(); g.moveTo(x-s*w,y+c*w); g.lineTo(x+c*len,y+s*len); g.lineTo(x+s*w,y-c*w); g.closePath(); g.fill(); };
      g.save(); g.globalCompositeOperation='lighter'; for(const [k,al] of [[2.6,0.22],[1,1]]){ g.fillStyle='rgba(255,252,240,'+(al*a)+')'; for(let i=0;i<4;i++) sp(i*Math.PI/2,(i%2?L*0.62:L)*(k>1?1.08:1),W*k); }
      g.fillStyle='rgba(255,250,235,'+(0.5*a)+')'; for(let i=0;i<4;i++) sp(Math.PI/4+i*Math.PI/2,L*0.22,W*0.35); puff(g,x,y,W*7,0.9*a,'255,250,240'); g.restore(); }
    // 3 khung impact vẽ tay (Howard Wimshurst): nền trắng + nét đen thẳng toả từ (px,py), i=0 dày ở rìa → 2 gần trắng
    function impact3(g,px,py,i){ g.save(); g.fillStyle=i===2?'#fffaf0':'#ffffff'; g.fillRect(0,0,VW,VH); g.fillStyle='#000'; const R0=[0.1,0.26,0.42][i], Rm=Math.hypot(VW,VH);
      for(let k=0;k<90;k++){ const an=hash(k*1.7+i*0.3+40)*TAU, r0=Rm*(R0+0.25*hash(k*2.3+i)), w=0.006+0.022*hash(k*3.1+i*0.7); g.beginPath(); g.moveTo(px+Math.cos(an-w)*r0,py+Math.sin(an-w)*r0); g.lineTo(px+Math.cos(an-w*1.6)*Rm,py+Math.sin(an-w*1.6)*Rm); g.lineTo(px+Math.cos(an+w*1.6)*Rm,py+Math.sin(an+w*1.6)*Rm); g.lineTo(px+Math.cos(an+w)*r0,py+Math.sin(an+w)*r0); g.closePath(); g.fill(); } g.restore(); }
    function embers(g,t,n,col){ g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<n;i++){ const x=(hash(i+900)*VW+t*30*(0.5+hash(i+905)))%VW, y=VH-((t*40*(0.5+hash(i+910))+hash(i+915)*VH)%VH), a=0.4+0.5*Math.sin(t*4+i); puff(g,x,y,2.5+3*hash(i+920),a,col||'255,150,70'); } g.restore(); }
    // đặt ảnh lên khung (shot): S(t0,t1,fn) + plates(F,t) vẽ shot hiện tại trong world (vẫn ăn rung / grade / impact frame)
    function runner(SHOTS){ const cam={tx:0,ty:100,tz:0,dist:600,yaw:0,pitch:0,fov:50};
      return { shots:SHOTS.map(s=>({t0:s[0],t1:s[1],a:cam,ease:'lin'})),
        world:(F,t)=>{ const s=SHOTS.find(q=>t>=q[0]&&t<q[1])||SHOTS[SHOTS.length-1]; F.list.push({d:-1e9, fn:()=>{ const g=F.g; g.save(); g.fillStyle='#000'; g.fillRect(-60,-60,VW+120,VH+120); s[2](F,t,seg(t,s[0],s[1])); g.restore(); }}); } }; }
    return {K,seg,lerp,clamp,hash,eout,ein,eio,TAU,VW,VH,cover,bg,spr,obj,puff,dust,ring,streak,zap,sparks,star4,impact3,embers,runner}; };
})();
