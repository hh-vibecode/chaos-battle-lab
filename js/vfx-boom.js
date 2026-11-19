// 💥 VfxBoom — hoạt hoạ VFX kiểu anime cho cine-kit (18/11/2026, học từ video anh gửi — skill `hoat-hoa-vfx`):
//   • explosion(F,t,o) — vụ nổ lớn BẮT ĐẦU TỪ TÂM LAN RA (video aVvT_--q7Ow 21–26s): chấm vòm lõi sáng nhỏ → lớn chậm → vòng bụi dẹt toé trên đất
//       + đá bị nhấc → nứt đất toả ra → BỨC TƯỜNG BỤI cuộn lan ra (qua máy) → trắng xoá. Màu PHẲNG (cel 3 tông, mép sắc), vẽ trong thế giới 3D (đúng phối cảnh).
//   • strobe(seq) / impactOverlay — TRÀNG IMPACT FRAME (video -nOC-UgaLLw + 3 video 17/11): nhân vật tô đen đặc trên trắng (cine-kit impact {fg,bg}) + VẠCH TỐC ĐỘ toả từ điểm chạm + khung đảo màu.
//   • step(t,fps) — "vẽ trên 2" (giữ hình vài khung) cho VFX dạng vẽ tay; ease giữ spacing đều (video MYMWRdhF0l4: mượt = khoảng cách giữa khung, không phải số khung).
(function(){
  if(window.VfxBoom) return;
  const K=window.CineKit, {seg,lerp,clamp,hash}=K, E=K.EASE, eout=E.eout, ein=E.ein, eio=E.eio, TAU=Math.PI*2;
  const step=(t,fps)=>fps?Math.floor(t*fps)/fps:t;   // vẽ trên 2 (12fps) / trên 3 (8fps): VFX giật theo nét vẽ tay, chuyển động máy vẫn mượt
  // bảng màu (lõi → giữa → viền) — mặc định xanh–hồng như video mẫu; có thể đổi theo chiêu
  const PAL={ cyan:['#ffffff','#8ff6ff','#29d0ff','#ff3fd6'], fire:['#fffbe0','#ffd23a','#ff7a1a','#c21a10'], purple:['#ffffff','#e2b6ff','#a24bff','#4a1a9a'], gold:['#ffffff','#fff2a8','#ffc02a','#ff7a10'] };
  // ── 1 cụm bụi CEL (3 tông mép sắc, không mờ) ──
  function celPuff(g,x,y,r,cols,seed,rot){ const n=9; g.save(); g.translate(x,y); g.rotate(rot||0);
    for(let L=0;L<cols.length;L++){ const rr=r*(1-L*0.22); g.fillStyle=cols[L]; g.beginPath();
      for(let i=0;i<=n;i++){ const a=i/n*TAU, w=rr*(0.78+0.3*hash(seed*13+i*7+L)); i?g.lineTo(Math.cos(a)*w,Math.sin(a)*w*0.82-L*rr*0.12):g.moveTo(Math.cos(a)*w,Math.sin(a)*w*0.82-L*rr*0.12); }
      g.closePath(); g.fill(); } g.restore(); }
  // ── VỤ NỔ ── o: {t0, x,z (tâm trên đất), R (bán kính cuối của vòm, đv thế giới), wall (bán kính tường bụi lan tới), pal, fps}
  //   mốc (giây kể từ t0): 0 chấm sáng · 0–1.1 vòm lớn chậm · 1.1 vòng bụi dẹt toé + đá nhấc · 1.3→ nứt đất · 1.6→3.2 tường bụi lan ra · ≥ 3.0 trắng xoá (do phim lo)
  function explosion(F,t,o){ const u=t-o.t0; if(u<0) return; const g0=o.fps==null?12:o.fps, us=step(u,g0), C=PAL[o.pal||'cyan'], R=o.R||600, W=o.wall||9000, x=o.x||0, z=o.z||0, B=F.B;
    const P=K.proj(B,x,0,z); if(!P) return;
    // ① vòm: chấm nhỏ → lớn chậm (eout), mép rung theo nét vẽ (seed theo khung giữ)
    const dk=us<1.1?0.06+0.5*eout(us/1.1):0.56+0.44*eout(clamp((us-1.1)/0.6,0,1)), dr=R*dk, fr=Math.floor(us*g0);
    F.list.push({d:P.d-1, fn:()=>{ const g=F.g, rs=dr*P.s; if(rs<0.5) return; g.save(); g.beginPath(); g.rect(-9999,-9999,19998,9999+P.y+rs*0.02); g.clip();   // chỉ nửa trên mặt đất
      for(let L=0;L<4;L++){ const rr=rs*[1,0.86,0.68,0.42][L]; g.fillStyle=C[3-L]; g.beginPath();
        for(let i=0;i<=24;i++){ const a=Math.PI+i/24*Math.PI, w=rr*(1+0.05*(hash(fr*31+i+L*5)-0.5)); i?g.lineTo(P.x+Math.cos(a)*w,P.y+Math.sin(a)*w*1.05):g.moveTo(P.x+Math.cos(a)*w,P.y+Math.sin(a)*w*1.05); }
        g.closePath(); g.fill(); }
      g.restore(); }});
    // ② vòng bụi dẹt toé trên đất (nhanh) — hình đĩa phẳng nằm trên mặt đất, mép răng cưa
    if(us>=1.1){ const k=eout(clamp((us-1.1)/0.5,0,1)), r1=R*(0.9+1.5*k);
      F.under.push(()=>{ const g=F.g, pts=[]; for(let i=0;i<=40;i++){ const a=i/40*TAU, w=r1*(0.85+0.3*hash(i*7+fr%3)), p=K.proj(B,x+Math.cos(a)*w,1,z+Math.sin(a)*w); if(!p) return; pts.push(p); }
        g.save(); g.globalAlpha=0.7*(1-0.7*clamp((us-1.6)/1.0,0,1)); g.fillStyle='#b9c3cc'; g.beginPath(); pts.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y)); g.closePath(); g.fill();
        g.strokeStyle='#eaf6ff'; g.lineWidth=2; g.stroke(); g.restore(); }); }
    // ③ nứt đất toả ra từ tâm (về mọi phía, kể cả phía máy) — vạch tối dài dần
    if(us>=1.3){ const k=eout(clamp((us-1.3)/1.2,0,1));
      F.under.push(()=>{ const g=F.g; g.save(); g.strokeStyle='rgba(20,22,26,0.85)'; g.lineCap='round';
        for(let i=0;i<22;i++){ const a=i/22*TAU+(hash(i+70)-0.5)*0.25, L=(R*1.2+W*0.55*hash(i+71))*k; let px=x, pz=z; g.lineWidth=1+2.5*hash(i+72); g.beginPath(); const p0=K.proj(B,px,1,pz); if(!p0) continue; g.moveTo(p0.x,p0.y);
          for(let j=1;j<=7;j++){ const f=j/7; px=x+Math.cos(a+(hash(i*9+j)-0.5)*0.4)*L*f; pz=z+Math.sin(a+(hash(i*9+j)-0.5)*0.4)*L*f; const p=K.proj(B,px,1,pz); if(p) g.lineTo(p.x,p.y); } g.stroke(); }
        g.restore(); }); }
    // ④ đá bị nhấc lên quanh vòm rồi văng ra ngoài
    if(us>=1.1&&us<3.4){ for(let i=0;i<26;i++){ const a=hash(i+100)*TAU, d0=R*(1+1.5*hash(i+101)), k=clamp((us-1.1-0.1*hash(i+102))/1.6,0,1), d=d0+W*0.4*k*k, y=R*0.5*(Math.sin(Math.PI*Math.min(1,k*1.4)))*(0.4+hash(i+103)), s=R*(0.05+0.09*hash(i+104));
        const q=K.proj(B,x+Math.cos(a)*d,y,z+Math.sin(a)*d); if(!q) continue; F.list.push({d:q.d, fn:()=>{ const g=F.g, r=s*q.s; if(r<0.6) return; g.save(); g.translate(q.x,q.y); g.rotate(us*3*(hash(i+105)-0.5)+i);
          g.fillStyle='#4d5258'; g.beginPath(); g.moveTo(-r,-r*0.5); g.lineTo(r*0.7,-r); g.lineTo(r,r*0.4); g.lineTo(-r*0.5,r); g.closePath(); g.fill(); g.fillStyle='#8a9299'; g.beginPath(); g.moveTo(-r,-r*0.5); g.lineTo(r*0.7,-r); g.lineTo(r*0.1,-r*0.2); g.closePath(); g.fill(); g.restore(); }}); } }
    // ⑤ BỨC TƯỜNG BỤI cuộn lan ra: vòng cụm bụi cel (đỉnh viền màu lõi), bán kính lớn dần tới W (qua cả máy)
    if(us>=1.6){ const k=ein(clamp((us-1.6)/1.6,0,1)), rw=R*1.6+(W-R*1.6)*k, n=54;
      for(let i=0;i<n*2;i++){ const a=(i%n)/n*TAU+(i>=n?0.06:0), row=i>=n?1:0, w=rw*(0.94+0.12*hash(i+200))-row*R*0.5, wx=x+Math.cos(a)*w, wz=z+Math.sin(a)*w, h=R*(0.5+0.6*hash(i+201))*(0.6+1.1*k)*(row?1.45:1);   // 2 lớp: lớp sau CAO hơn (mây cuộn chồng)
        const q=K.proj(B,wx,h*0.45,wz); if(!q) continue; F.list.push({d:q.d, fn:()=>{ const g=F.g, r=h*q.s; if(r<1) return; celPuff(g,q.x,q.y,r,['#6f7a84','#9aa6b0','#c9d4dc'],i+fr%2,(hash(i+202)-0.5)*0.4);
          g.save(); g.fillStyle=C[2]; g.globalAlpha=0.85; g.beginPath(); g.ellipse(q.x,q.y-r*0.62,r*0.62,r*0.12,0,0,TAU); g.fill(); g.restore(); }}); } }   // viền đỉnh hắt màu lõi nổ
  }
  // tường bụi đã tới máy chưa (0–1): phim dùng để phủ kín màn rồi trắng xoá
  function wallAtCam(F,t,o){ const u=t-o.t0; if(u<1.6) return 0; const R=o.R||600, W=o.wall||9000, k=ein(clamp((u-1.6)/1.6,0,1)), rw=R*1.6+(W-R*1.6)*k, cam=F.B.pos, d=Math.hypot(cam[0]-(o.x||0),cam[2]-(o.z||0)); return clamp((rw-d+R*1.2)/(R*1.5),0,1); }
  // ── TRÀNG IMPACT ── seq: chuỗi chữ mỗi khung 1 hình: bw (đen trên trắng) · wb (trắng trên đen) · w (trắng tinh) · k (đen + sao 4 cánh) · c (màu: hồng–đen)
  const FR=1/30;
  function strobe(t,list){ for(const [t0,seq,px,py] of list){ const L=seq.split(' '), i=Math.floor((t-t0)/FR); if(i>=0&&i<L.length) return {kind:L[i],i,px:px==null?0.5:px,py:py==null?0.5:py}; } return null; }
  const IMPC={bw:{fg:'#000000',bg:'#ffffff'}, wb:{fg:'#ffffff',bg:'#000000'}, c:{fg:'#14000c',bg:'#ff5ab8'}};
  const IMPD={bw:{fg:'#ffffff',bg:'#000000'}, wb:{fg:'#000000',bg:'#ffffff'}, c:{fg:'#ff5ab8',bg:'#14000c'}};   // cảnh tối: nền tối hơn nhân vật → đảo để 'bw' vẫn là bóng ĐEN trên TRẮNG
  const impactOf=(s,dark)=>s?((dark?IMPD:IMPC)[s.kind]||0):0;
  const gradeOf=s=>s?(s.kind==='w'?{white:1}:s.kind==='k'?{bright:0.02}:null):null;
  // vạch tốc độ toả từ điểm chạm (vẽ trong screen, sau ảnh impact) — màu ngược nền của khung
  function impactOverlay(F,s){ if(!s) return; const g=F.g, VW=F.VW, VH=F.VH, cx=s.px*VW, cy=s.py*VH, Rm=Math.hypot(VW,VH);
    if(s.kind==='w') return; const ink=s.kind==='wb'||s.kind==='k'?'#ffffff':'#000000';
    g.save(); g.fillStyle=ink; for(let i=0;i<70;i++){ const a=hash(i*1.3+s.i*7)*TAU, r0=Rm*(0.16+0.3*hash(i*2.1+s.i)), w=0.004+0.014*hash(i*3.7+s.i);
      g.beginPath(); g.moveTo(cx+Math.cos(a-w)*r0,cy+Math.sin(a-w)*r0); g.lineTo(cx+Math.cos(a)*Rm,cy+Math.sin(a)*Rm); g.lineTo(cx+Math.cos(a+w)*r0,cy+Math.sin(a+w)*r0); g.closePath(); g.fill(); }
    if(s.kind==='k'){ const L=VW*0.12, Wd=VH*0.008; g.globalCompositeOperation='lighter'; g.fillStyle='rgba(255,255,255,0.95)';
      for(let i=0;i<4;i++){ const an=i*Math.PI/2, len=i%2?L*0.6:L, c=Math.cos(an), sn=Math.sin(an); g.beginPath(); g.moveTo(cx-sn*Wd,cy+c*Wd); g.lineTo(cx+c*len,cy+sn*len); g.lineTo(cx+sn*Wd,cy-c*Wd); g.closePath(); g.fill(); } }
    g.restore(); }
  // ── EASE / SPACING theo 12 nguyên tắc hoạt hoạ (u 0→1 → 0→1; cine-kit đã có lin/eio/eout/ein/eout3/ein3/holdSnap/overshoot/brake) ──
  const ease={
    anticip:(u,a)=>{ a=a==null?0.12:a; const p=0.28; return u<p?-a*Math.sin(Math.PI*u/p*0.5):-a+(1+a)*E.eout3((u-p)/(1-p)); },   // LẤY ĐÀ: lùi ngược a rồi lao tới
    settle:(u,amp,n)=>{ amp=amp==null?0.12:amp; n=n||2.5; if(u<0.55) return E.eout3(u/0.55)*(1+amp); const v=(u-0.55)/0.45; return 1+amp*Math.cos(v*Math.PI*n)*Math.pow(1-v,2); },   // THEO ĐÀ: vượt rồi dao động tắt dần
    slowInOut:(u,k)=>{ k=k||2.2; const a=Math.pow(u,k), b=Math.pow(1-u,k); return a/(a+b); },   // CHẬM VÀO – CHẬM RA (k lớn = giữ lâu 2 đầu)
    hitStop:(u,at,hold)=>{ at=at==null?0.5:at; hold=hold==null?0.15:hold; const A=1/(1-hold); return u<at?u*A:u<at+hold?at*A:(u-hold)*A; }   // KHỰNG: tới khung chạm `at` đứng yên `hold` rồi đi tiếp (tổng vẫn 0→1)
  };
  // nội suy qua các TƯ THẾ CHÍNH: list=[[giây,giá trị (số hoặc mảng),ease tên/hàm],…] — ease của điểm SAU quyết định đoạn trước nó
  function keys(t,list){ if(t<=list[0][0]) return list[0][1]; for(let i=1;i<list.length;i++){ const [t1,v1,e]=list[i], [t0,v0]=list[i-1]; if(t<=t1){ let u=seg(t,t0,t1); const f=typeof e==='function'?e:(ease[e]||E[e]||E.eio); u=f(u);
        return Array.isArray(v0)?v0.map((x,j)=>x+(v1[j]-x)*u):v0+(v1-v0)*u; } } return list[list.length-1][1]; }
  // SOÁT SPACING: fn(t) → số hoặc [x,y,(z)]; báo các khung tốc độ nhảy > ratio lần so với khung trước (giật), bỏ qua khi gần đứng yên
  function spacingCheck(fn,t0,t1,fps,ratio){ fps=fps||30; ratio=ratio||3; const d=[], jumps=[]; let prev=fn(t0);
    for(let t=t0+1/fps;t<=t1+1e-9;t+=1/fps){ const v=fn(t), dv=Array.isArray(v)?Math.hypot(...v.map((x,i)=>x-prev[i])):Math.abs(v-prev); d.push([t,dv]); prev=v; }
    const mx=Math.max(1e-6,...d.map(x=>x[1])); let maxRatio=1;
    for(let i=1;i<d.length;i++){ const a=d[i-1][1], b=d[i][1]; if(Math.max(a,b)<mx*0.05) continue; const r=Math.max(a,b)/Math.max(1e-6,Math.min(a,b)); if(r>maxRatio) maxRatio=r; if(r>ratio) jumps.push(+d[i][0].toFixed(3)); }
    return {maxRatio:+maxRatio.toFixed(2), jumps}; }
  Object.assign(E,{anticip:ease.anticip, settle:ease.settle});   // dùng ease:'anticip' / 'settle' trong shot / track của cine-kit
  // ── VỤ NỔ MÔ PHỎNG THẬT (Blender Mantaflow, tools/blender/boom_sim.py) — sheet cel đã tô sẵn, dựng như 1 tấm đứng trong thế giới ──
  //   o = {t0, key (ảnh sheet trong imgs), meta (json đi kèm), x, z, size (bề ngang 1 ô, đv thế giới), twos (vẽ trên 2), hold (giữ khung cuối), alpha, dz}
  function simSprite(F,t,o){ const u=t-o.t0, M=o.meta, im=F.I[o.key]; if(u<0||!M||!im||!im.naturalWidth) return; const fps=M.fps||30;
    let fi=Math.floor((o.twos?step(u,fps/2):u)*fps+1e-6), ex=0; if(fi>=M.frames){ if(!o.hold) return; ex=(o.twos?step(u,fps/2):u)-M.frames/fps; fi=M.frames-1; }   // hết mô phỏng: khói vẫn bốc chậm + nở nhẹ (không đứng hình)
    const q=K.proj(F.B,o.x||0,0,o.z||0); if(!q) return; const ph=M.ph||M.px, sz=o.size*q.s, sh=sz*ph/M.px, c=fi%M.cols, r=Math.floor(fi/M.cols), gx=M.ground[0], gy=M.ground[1];
    F.list.push({d:q.d-(o.dz||0), fn:()=>{ const g=F.g; g.save(); if(o.alpha!=null) g.globalAlpha=o.alpha; const gr=1+0.05*ex, up=sh*0.035*ex; g.drawImage(im,c*M.px,r*ph,M.px,ph,q.x-gx*sz*gr,q.y-gy*sh*gr-up,sz*gr,sh*gr); g.restore(); }}); }
  // ── CHẤN ĐỘNG MẶT ĐẤT đi kèm vụ nổ (vật lý thật, không mô phỏng): gọi trong world cùng simSprite ──
  //   Mặt sóng chấn: r(u) = K·u^0.4 (Sedov–Taylor: phóng rất nhanh rồi CHẬM dần) — vòng sáng dẹt trên đất + bụi bốc thấp ngay mép sóng.
  //   Nứt đất: mỗi vết dài tới mép sóng (không vượt), dừng ở độ dài riêng. Hố cháy xém dưới tâm.
  //   Đá: bị hất lên ĐÚNG LÚC mặt sóng đi qua chỗ nó, bay parabol trọng lực g, chạm đất nảy 1 lần (mất 70% đà) rồi NẰM YÊN.
  //   o = {t0, x, z, K (đv thế giới / s^0.4), crack (dài nứt tối đa), crater (bán kính hố), rocks (số đá), g (trọng lực đv/s²), seed}
  //   shockAt(o, d) = giây (kể từ t0) mặt sóng tới khoảng cách d → dùng đặt RUNG MÁY / tiếng ầm đúng lúc sóng tới máy.
  const shockR=(o,u)=>u<=0?0:(o.K||7700)*Math.pow(u,0.4);
  function shockAt(o,d){ return Math.pow(d/(o.K||7700),2.5); }
  function groundShock(F,t,o){ const u=t-o.t0; if(u<0) return; const B=F.B, x=o.x||0, z=o.z||0, sd=o.seed||7, r=shockR(o,u), g=o.g||3000, CR=o.crater||900, CL=o.crack||4200;
    const ring=(rad,y,jit,fr)=>{ const pts=[]; for(let i=0;i<=64;i++){ const a=i/64*TAU, w=rad*(1+jit*(hash(i*13+fr+sd)-0.5)), p=K.proj(B,x+Math.cos(a)*w,y,z+Math.sin(a)*w); if(!p) return null; pts.push(p); } return pts; };
    const path=(gc,pts)=>{ gc.beginPath(); pts.forEach((p,i)=>i?gc.lineTo(p.x,p.y):gc.moveTo(p.x,p.y)); gc.closePath(); };
    // hố cháy xém (hiện ngay, đất bị nén lõm)
    F.under.push(()=>{ const gc=F.g, pts=ring(CR*(0.55+0.45*eout(clamp(u/0.25,0,1))),1,0.18,0); if(!pts) return; gc.save(); gc.fillStyle='rgba(24,18,16,0.82)'; path(gc,pts); gc.fill();
      const p2=ring(CR*0.6*(0.55+0.45*eout(clamp(u/0.25,0,1))),1,0.25,3); if(p2){ gc.fillStyle='rgba(255,120,40,'+(0.55*(1-clamp(u/1.6,0,1)))+')'; path(gc,p2); gc.fill(); } gc.restore(); });
    // nứt đất toả ra theo mặt sóng
    F.under.push(()=>{ const gc=F.g; gc.save(); gc.strokeStyle='rgba(16,12,12,0.9)'; gc.lineCap='round'; gc.lineJoin='round';
      for(let i=0;i<26;i++){ const a=i/26*TAU+(hash(i+sd*31)-0.5)*0.22, Lmax=CR*0.8+CL*(0.35+0.65*hash(i+sd*37)), L=Math.min(r,Lmax); if(L<CR*0.8) continue;
        gc.lineWidth=Math.max(1,(1.2+2.6*hash(i+sd*41))*(1-0.4*L/Lmax)); gc.beginPath(); let st=true;
        for(let j=0;j<=10;j++){ const d=CR*0.8+(L-CR*0.8)*j/10, aa=a+(hash(i*17+j+sd)-0.5)*0.16, p=K.proj(B,x+Math.cos(aa)*d,1,z+Math.sin(aa)*d); if(!p) continue; st?gc.moveTo(p.x,p.y):gc.lineTo(p.x,p.y); st=false; }
        gc.stroke(); } gc.restore(); });
    // vòng sóng chấn dẹt sáng trên đất (mờ dần khi đi xa) (mép răng cưa; bụi cuộn sát đất do mô phỏng Blender lo)
    if(u<1.2){ const k=1-u/1.2; F.under.push(()=>{ const gc=F.g, o1=ring(r,2,0.06,Math.floor(u*15)), i1=ring(r*0.9,2,0.1,Math.floor(u*15)+5); if(!o1||!i1) return; gc.save();
        gc.fillStyle='rgba(255,246,226,'+(0.75*k)+')'; gc.beginPath(); o1.forEach((p,i)=>i?gc.lineTo(p.x,p.y):gc.moveTo(p.x,p.y)); gc.closePath(); i1.slice().reverse().forEach((p,i)=>i?gc.lineTo(p.x,p.y):gc.moveTo(p.x,p.y)); gc.closePath(); gc.fill('evenodd'); gc.restore(); });
    }
    // SÀN BẬT LÊN LẦN LƯỢT (anh 19/11: "sàn bật lên lần lượt từ tâm lan tới hết màn, theo sau ngay sóng âm"): cả mặt sàn chia Ô (o.tile đv), ô nào mặt sóng vừa đi qua
    //   thì bật lên NGAY SAU sóng (trễ 0.03s), mép ngoài bị đội cao hơn (sóng đẩy từ tâm ra), rơi xuống nằm lệch (sàn vỡ) — để lại HỐ tối dưới chỗ ô bay lên.
    if(o.tile){ const TS=o.tile, TR=o.tileR||7000, n=Math.ceil(TR/TS), cam=B.pos;
      for(let i=-n;i<=n;i++) for(let j=-n;j<=n;j++){ const cx=x+i*TS, cz=z+j*TS, d=Math.hypot(i*TS,j*TS); if(d>TR||d<CR*0.7) continue;
        const tau=u-shockAt(o,d)-0.03; if(tau<0) continue; const sd2=(i*131+j*197+sd*7)|0, fall=Math.pow(1-0.8*d/TR,1.6), Hs=TS*(0.3+0.35*hash(sd2))*fall, T1=0.42;
        const up=tau<T1?Math.sin(Math.PI*tau/T1)*Hs:0, tl=TS*(tau<T1?(0.25+0.35*hash(sd2+1))*Math.sin(Math.PI*Math.min(1,tau/T1*1.3)):0.015+0.035*hash(sd2+2))*fall;
        const ux=(cx-x)/(d||1), uz=(cz-z)/(d||1), h=TS*0.47, P=(a,b,y)=>K.proj(B,cx+ux*a-uz*b,y,cz+uz*a+ux*b);
        const q=[P(-h,-h,up),P(-h,h,up),P(h,h,up+tl),P(h,-h,up+tl)], c=K.proj(B,cx,up,cz); if(q.some(p=>!p)||!c) continue; const hole=[P(-h,-h,1),P(-h,h,1),P(h,h,1),P(h,-h,1)];
        if(up>2&&!hole.some(p=>!p)) F.under.push(()=>{ const gc=F.g; gc.save(); gc.fillStyle='#0b0808'; gc.beginPath(); hole.forEach((p,k)=>k?gc.lineTo(p.x,p.y):gc.moveTo(p.x,p.y)); gc.closePath(); gc.fill(); gc.restore(); });
        const s0=P(h,h,0), s1=P(h,-h,0), lit=0.85+0.3*hash(sd2+3), L=clamp((1-d/TR)*1.4,0,1)*(1-0.6*seg(u,0.4,2.5))*(o.light==null?1:o.light), LC=o.lightCol||[255,160,80];   // mặt trên HẮT ÁNH VỤ NỔ (như mẫu: mảng đất sáng màu lõi nổ) — gần tâm sáng hơn, tắt dần
        const top='rgb('+((58*lit*(1-L)+LC[0]*L*0.9)|0)+','+((53*lit*(1-L)+LC[1]*L*0.9)|0)+','+((56*lit*(1-L)+LC[2]*L*0.9)|0)+')';
        F.list.push({d:c.d, fn:()=>{ const gc=F.g; gc.save(); gc.lineJoin='round'; gc.strokeStyle='#0d0909'; gc.lineWidth=Math.max(1.2,TS*c.s*0.03);
          if(s0&&s1&&(up+tl)>2){ gc.fillStyle='#3a3133'; gc.beginPath(); gc.moveTo(q[3].x,q[3].y); gc.lineTo(q[2].x,q[2].y); gc.lineTo(s0.x,s0.y); gc.lineTo(s1.x,s1.y); gc.closePath(); gc.fill(); gc.stroke(); }   // mặt cắt ô sàn
          gc.fillStyle=top; gc.beginPath(); q.forEach((p,k)=>k?gc.lineTo(p.x,p.y):gc.moveTo(p.x,p.y)); gc.closePath(); gc.fill(); gc.stroke();
          gc.strokeStyle='rgba(140,128,130,0.5)'; gc.lineWidth=Math.max(1,TS*c.s*0.012); gc.beginPath(); gc.moveTo(q[0].x,q[0].y); gc.lineTo(q[1].x,q[1].y); gc.stroke(); gc.restore(); }}); } }
    // MẢNG ĐẤT bị sóng chấn hất bật: lúc mặt sóng đi qua, tấm đất nhảy lên (sin) + mép ngoài bị đội lên, rơi xuống vẫn CHỔNG NGHIÊNG (mặt đường vỡ)
    const NP=o.plates==null?(o.tile?0:22):o.plates;
    for(let i=0;i<NP;i++){ const a=hash(i+sd*111)*TAU, d=CR*1.05+CL*0.5*Math.pow(hash(i+sd*113),0.9), tau=u-shockAt(o,d); if(tau<0) continue;
      const fall=1-0.55*d/(CR+CL), w=(110+200*hash(i+sd*117))*fall, Hs=w*(0.6+0.8*hash(i+sd*119))*fall, up=tau<0.45?Math.sin(Math.PI*tau/0.45)*Hs:0, tl=(0.25+0.45*hash(i+sd*121))*clamp(tau/0.2,0,1)*w;
      const ca=Math.cos(a), sa=Math.sin(a), P=(rr,tt,y)=>K.proj(B,x+ca*rr-sa*tt,y,z+sa*rr+ca*tt), dn=d-w/2, df=d+w/2;
      const q=[P(dn,-w/2,up),P(dn,w/2,up),P(df,w/2,up+tl),P(df,-w/2,up+tl)], qs=[P(df,w/2,0),P(df,-w/2,0)], c=K.proj(B,x+ca*d,up,z+sa*d); if(q.some(p=>!p)||qs.some(p=>!p)||!c) continue;
      F.list.push({d:c.d, fn:()=>{ const gc=F.g; gc.save(); gc.lineJoin='round'; gc.strokeStyle='#120c0b'; gc.lineWidth=Math.max(1,w*c.s*0.03);
        gc.fillStyle='#231c19'; gc.beginPath(); gc.moveTo(q[3].x,q[3].y); gc.lineTo(q[2].x,q[2].y); gc.lineTo(qs[0].x,qs[0].y); gc.lineTo(qs[1].x,qs[1].y); gc.closePath(); gc.fill(); gc.stroke();   // mặt cắt đất lộ ra
        gc.fillStyle='#5b524b'; gc.beginPath(); q.forEach((p,j)=>j?gc.lineTo(p.x,p.y):gc.moveTo(p.x,p.y)); gc.closePath(); gc.fill(); gc.stroke();
        gc.fillStyle='#857a70'; gc.beginPath(); gc.moveTo(q[0].x,q[0].y); gc.lineTo(q[1].x,q[1].y); gc.lineTo((q[1].x+q[2].x)/2,(q[1].y+q[2].y)/2); gc.lineTo((q[0].x+q[3].x)/2,(q[0].y+q[3].y)/2); gc.closePath(); gc.fill(); gc.restore(); }}); }
    // MÀN BỤI dựng lên NGAY MÉP SÓNG (đất bị cày tung) — chạy theo mép sóng, thấp dần + mờ dần khi đi xa; cel 2 tông + viền mực, mỗi đoạn xếp lớp theo độ sâu
    if(u<1.4&&r<CL*1.5){ const k=(1-u/1.4)*(1-clamp(r/(CL*1.5),0,1)), NS=96, Hd=(o.dust||260)*k*(0.5+0.5*clamp(u/0.12,0,1)), fr=Math.floor(u*15);   // THẤP, mờ dần theo khoảng cách (không thành bức tường che vụ nổ / đè máy)
      for(let j=0;j<NS;j++){ const a0=j/NS*TAU, a1=(j+1)/NS*TAU, am=(a0+a1)/2, h0=Hd*(0.2+1.0*Math.pow(hash(j*7+fr+sd),2)), h1=Hd*(0.2+1.0*Math.pow(hash(((j+1)%NS)*7+fr+sd),2)), hm=Hd*(0.3+1.4*Math.pow(hash(j*7+fr+sd+3),2));   // đỉnh lởm chởm KHÔNG đều
        const pa=K.proj(B,x+Math.cos(a0)*r,0,z+Math.sin(a0)*r), pb=K.proj(B,x+Math.cos(a1)*r,0,z+Math.sin(a1)*r), ta=K.proj(B,x+Math.cos(a0)*r*0.985,h0,z+Math.sin(a0)*r*0.985), tb=K.proj(B,x+Math.cos(a1)*r*0.985,h1,z+Math.sin(a1)*r*0.985), tm=K.proj(B,x+Math.cos(am)*r*0.98,hm,z+Math.sin(am)*r*0.98);
        if(!pa||!pb||!ta||!tb||!tm) continue;
        F.list.push({d:(pa.d+pb.d)/2, fn:()=>{ const gc=F.g; gc.save(); gc.globalAlpha=0.35+0.55*k;
          gc.fillStyle='#6d6057'; gc.beginPath(); gc.moveTo(pa.x,pa.y); gc.lineTo(ta.x,ta.y); gc.lineTo(tm.x,tm.y); gc.lineTo(tb.x,tb.y); gc.lineTo(pb.x,pb.y); gc.closePath(); gc.fill();
          gc.fillStyle='#b9a894'; gc.beginPath(); gc.moveTo(ta.x,ta.y); gc.lineTo(tm.x,tm.y); gc.lineTo(tb.x,tb.y); gc.lineTo(tb.x+(pb.x-tb.x)*0.35,tb.y+(pb.y-tb.y)*0.35); gc.lineTo(ta.x+(pa.x-ta.x)*0.3,ta.y+(pa.y-ta.y)*0.3); gc.closePath(); gc.fill();
          gc.strokeStyle='#140e0c'; gc.lineWidth=Math.max(1,ta.s*14); gc.beginPath(); gc.moveTo(ta.x,ta.y); gc.lineTo(tm.x,tm.y); gc.lineTo(tb.x,tb.y); gc.stroke(); gc.restore(); }}); } }
    // đá bị hất: phóng lúc sóng tới, parabol, nảy 1 lần, nằm yên
    const n=o.rocks==null?30:o.rocks;
    for(let i=0;i<n;i++){ const a=hash(i+sd*71)*TAU, d0=CR*(0.7+2.6*hash(i+sd*73)), tl=shockAt(o,d0), tau=u-tl; if(tau<0) continue;
      const v0=1-clamp(d0/(CR*3.5),0,0.8), vr=(500+900*hash(i+sd*79))*v0, vy=(900+1500*hash(i+sd*83))*v0, s=(80+170*hash(i+sd*89))*(0.6+0.6*v0);
      const T1=2*vy/g; let d, y, rot, tt=tau;
      if(tt<T1){ d=d0+vr*tt; y=vy*tt-0.5*g*tt*tt; rot=tt*(6*(hash(i+sd*97)-0.5)); }
      else { tt-=T1; const vy2=vy*0.3, vr2=vr*0.3, T2=2*vy2/g, ts=Math.min(tt,T2); d=d0+vr*T1+vr2*ts; y=tt<T2?vy2*ts-0.5*g*ts*ts:0; rot=T1*(6*(hash(i+sd*97)-0.5))+ts*2*(hash(i+sd*97)-0.5); }
      const q=K.proj(B,x+Math.cos(a)*d,y+s*0.5,z+Math.sin(a)*d); if(!q) continue;
      F.list.push({d:q.d, fn:()=>{ const gc=F.g, rr=s*q.s; if(rr<0.6) return; gc.save(); gc.translate(q.x,q.y); gc.rotate(rot+i);
        gc.fillStyle='#3e3631'; gc.beginPath(); gc.moveTo(-rr,-rr*0.5); gc.lineTo(rr*0.7,-rr); gc.lineTo(rr,rr*0.4); gc.lineTo(-rr*0.5,rr); gc.closePath(); gc.fill();
        gc.fillStyle='#7d7068'; gc.beginPath(); gc.moveTo(-rr,-rr*0.5); gc.lineTo(rr*0.7,-rr); gc.lineTo(rr*0.1,-rr*0.2); gc.closePath(); gc.fill();
        gc.strokeStyle='#140e0c'; gc.lineWidth=Math.max(1,rr*0.12); gc.beginPath(); gc.moveTo(-rr,-rr*0.5); gc.lineTo(rr*0.7,-rr); gc.lineTo(rr,rr*0.4); gc.lineTo(-rr*0.5,rr); gc.closePath(); gc.stroke(); gc.restore(); }}); }
  }
  // ── TÍCH TỤ trước nổ (anh 19/11: "phải tích tụ trước => nổ"): lõi sáng ở tâm lớn dần + co giật, tia năng lượng + bụi đất bị HÚT vào tâm (nhanh dần), mặt đất quanh tâm ửng sáng.
  //   o = {t0, t1 (= lúc nổ), x, y (cao lõi), z, R (bán kính lõi tối đa), col:'r,g,b'}
  function charge(F,t,o){ if(t<o.t0||t>=o.t1) return; const B=F.B, u=seg(t,o.t0,o.t1), x=o.x||0, z=o.z||0, y=o.y||120, R=o.R||200, col=o.col||'255,210,140', fr=Math.floor(t*15);
    const P=K.proj(B,x,y,z); if(!P) return;
    F.under.push(()=>{ const gc=F.g, g0=K.proj(B,x,1,z); if(!g0) return; const rr=R*4*(0.3+0.7*u)*g0.s; gc.save(); gc.globalCompositeOperation='lighter'; const gr=gc.createRadialGradient(g0.x,g0.y,0,g0.x,g0.y,rr); gr.addColorStop(0,'rgba('+col+','+(0.35*u)+')'); gr.addColorStop(1,'rgba('+col+',0)'); gc.fillStyle=gr; gc.save(); gc.translate(g0.x,g0.y); gc.scale(1,0.25); gc.beginPath(); gc.arc(0,0,rr,0,TAU); gc.fill(); gc.restore(); gc.restore(); });   // đất quanh tâm ửng sáng
    for(let i=0;i<46;i++){ const ph=(hash(i+500)+t*(0.7+1.6*u))%1, k=ph*ph, a=hash(i+501)*TAU, el=(hash(i+502)-0.3)*1.2, D=R*(9-8*k)*(0.6+0.6*hash(i+503));   // tia bị hút vào: càng gần tâm càng nhanh
      const sx=x+Math.cos(a)*Math.cos(el)*D, sy=y+Math.sin(el)*D*0.6, sz=z+Math.sin(a)*Math.cos(el)*D, ex=x+(sx-x)*0.82, ey=y+(sy-y)*0.82, ez=z+(sz-z)*0.82, p0=K.proj(B,sx,Math.max(5,sy),sz), p1=K.proj(B,ex,Math.max(5,ey),ez); if(!p0||!p1) continue;
      F.list.push({d:p0.d, fn:()=>{ const gc=F.g; gc.save(); gc.globalCompositeOperation='lighter'; gc.strokeStyle='rgba('+col+','+(0.25+0.6*u)*(0.4+0.6*k)+')'; gc.lineWidth=Math.max(1,R*0.05*p0.s); gc.lineCap='round'; gc.beginPath(); gc.moveTo(p0.x,p0.y); gc.lineTo(p1.x,p1.y); gc.stroke(); gc.restore(); }}); }
    for(let i=0;i<24;i++){ const ph=(hash(i+600)+t*(0.4+0.9*u))%1, a=hash(i+601)*TAU, D=R*10*(1-ph*ph), q=K.proj(B,x+Math.cos(a)*D,30,z+Math.sin(a)*D); if(!q) continue;   // bụi đất bò về tâm
      F.list.push({d:q.d, fn:()=>{ const r=(40+50*hash(i+602))*q.s*(0.5+u); if(r<0.8) return; celPuff(F.g,q.x,q.y,r,['#4d4441','#6f6560','#9a8f86'],i+fr,0); }}); }
    F.list.push({d:P.d-2, fn:()=>{ const gc=F.g, r=Math.max(2,R*(0.12+0.88*eio(u))*P.s)*(1+0.12*Math.sin(t*(30+40*u))); gc.save(); gc.globalCompositeOperation='lighter';   // LÕI: lớn dần, co giật nhanh dần
      let gr=gc.createRadialGradient(P.x,P.y,0,P.x,P.y,r*3.2); gr.addColorStop(0,'rgba('+col+',0.55)'); gr.addColorStop(1,'rgba('+col+',0)'); gc.fillStyle=gr; gc.fillRect(P.x-r*3.2,P.y-r*3.2,r*6.4,r*6.4);
      gc.globalCompositeOperation='source-over'; gc.fillStyle='rgba('+col+',1)'; gc.beginPath(); gc.arc(P.x,P.y,r,0,TAU); gc.fill(); gc.fillStyle='#fff'; gc.beginPath(); gc.arc(P.x,P.y,r*0.62,0,TAU); gc.fill(); gc.restore(); }}); }
  // ── SÀN MÔ PHỎNG BLENDER (cùng môi trường vật lý với vụ nổ — tools/blender/boom_sim.py --tiles): dựng lại TỪNG Ô SÀN đúng vị trí + góc xoay Blender giải ra mỗi khung ──
  //   o = {t0, data (JSON _tiles), x, z (tâm nổ trong phim), unit (đv / m, mặc định 300), light (0–1 ánh vụ nổ hắt lên mặt ô), lightCol:[r,g,b]}
  //   Ô CHƯA bị sóng chạm → không vẽ (sàn thành phố hiện như cũ, không lộ đường nối) · ô đã rời chỗ → hộp 3D + HỐ tối ở chỗ cũ.
  function simTiles(F,t,o){ const D=o.data; if(!D||!D.anim) return; const u=t-o.t0; if(u<0) return; const B=F.B, U=o.unit||300, X0=o.x||0, Z0=o.z||0, fi=Math.floor(u*D.fps+1e-6);
    const [tw,td,th]=D.tile, hw=tw/2, hd=td/2, hh=th/2, LC=o.lightCol||[255,160,80];
    const P=(X,Y,Z)=>K.proj(B,X0+X*U,(Z-th-0.002)*U,Z0+Y*U);   // Blender (X phải, Y sâu, Z lên) → phim (x, y lên, z sâu); mặt ô lúc nằm yên = mặt đất phim
    const CORN=[[-hw,-hd,-hh],[hw,-hd,-hh],[hw,hd,-hh],[-hw,hd,-hh],[-hw,-hd,hh],[hw,-hd,hh],[hw,hd,hh],[-hw,hd,hh]], FACES=[[4,5,6,7,'top'],[0,1,5,4,'s'],[1,2,6,5,'s'],[2,3,7,6,'s'],[3,0,4,7,'s']];
    for(let k=0;k<D.anim.length;k++){ const A=D.anim[k], a=A[Math.min(fi,A.length-1)], [rx,ry]=D.rest[k];
      const a0=A[0]; if(Math.hypot(a[0]-a0[0],a[1]-a0[1])+Math.abs(a[2]-a0[2])+Math.abs(Math.abs(a[3])-Math.abs(a0[3]))*4+Math.abs(a[4]-a0[4])+Math.abs(a[5]-a0[5])<0.03) continue;   // chưa động (so với khung ĐẦU: bỏ qua lún vài mm lúc bắt đầu mô phỏng)
      const [qw,qx,qy,qz]=[a[3],a[4],a[5],a[6]], cz=a[2]+hh+0.002, rot=([x,y,z])=>{ const ix=qw*x+qy*z-qz*y, iy=qw*y+qz*x-qx*z, iz=qw*z+qx*y-qy*x, iw=-qx*x-qy*y-qz*z;
        return [ix*qw+iw*-qx+iy*-qz-iz*-qy, iy*qw+iw*-qy+iz*-qx-ix*-qz, iz*qw+iw*-qz+ix*-qy-iy*-qx]; };
      const pts=CORN.map(c=>{ const r=rot(c); return P(a[0]+r[0],a[1]+r[1],cz+r[2]); }); if(pts.some(p=>!p)) continue;
      const hole=[[-hw,-hd],[hw,-hd],[hw,hd],[-hw,hd]].map(([x,y])=>P(rx+x,ry+y,th+0.003)); const c=P(a[0],a[1],cz); if(!c) continue;
      if(!hole.some(p=>!p)) F.under.push(()=>{ const gc=F.g; gc.save(); gc.fillStyle='#0b0808'; gc.beginPath(); hole.forEach((p,i)=>i?gc.lineTo(p.x,p.y):gc.moveTo(p.x,p.y)); gc.closePath(); gc.fill(); gc.restore(); });
      const d=Math.hypot(rx,ry), L=clamp((1-d/18)*1.1,0,1)*(1-0.7*seg(u,0.5,2.5))*(o.light==null?0.6:o.light), sh=0.85+0.3*hash(k*13+7);
      const top='rgb('+((60*sh*(1-L)+LC[0]*L*0.9)|0)+','+((55*sh*(1-L)+LC[1]*L*0.9)|0)+','+((58*sh*(1-L)+LC[2]*L*0.9)|0)+')';
      const fs=FACES.map(f=>({f, dz:(pts[f[0]].d+pts[f[1]].d+pts[f[2]].d+pts[f[3]].d)/4})).sort((p,q)=>q.dz-p.dz);   // vẽ mặt xa trước (hộp lồi)
      F.list.push({d:c.d, fn:()=>{ const gc=F.g; gc.save(); gc.lineJoin='round'; gc.strokeStyle='#0d0909'; gc.lineWidth=Math.max(1.2,tw*U*c.s*0.025);
        for(const {f} of fs){ gc.fillStyle=f[4]==='top'?top:'#3a3133'; gc.beginPath(); for(let i=0;i<4;i++){ const p=pts[f[i]]; i?gc.lineTo(p.x,p.y):gc.moveTo(p.x,p.y); } gc.closePath(); gc.fill(); gc.stroke(); }
        gc.restore(); }}); } }
  window.VfxBoom={ simTiles, charge, groundShock, shockAt, simSprite, step, PAL, celPuff, explosion, wallAtCam, strobe, impactOf, gradeOf, impactOverlay, ease, keys, spacingCheck };
})();
