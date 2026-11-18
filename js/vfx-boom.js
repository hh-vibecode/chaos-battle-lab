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
  window.VfxBoom={ step, PAL, celPuff, explosion, wallAtCam, strobe, impactOf, gradeOf, impactOverlay };
})();
