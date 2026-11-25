// ⏸️ (anh 25/11: "hoàn thiện cmt 1 2 3 thôi, làm 5 con luôn sợ k nổi") — commenter #4 cinarmeydan8407 · #5 Goobythisgoobythatgoobysteak ·
// #6 jamesxyruzsagayno9734 đã CODE XONG nhưng CHƯA chạy thử kỹ → gỡ khỏi game, cất ở đây. Làm tiếp: dán HELPERS vào trước "const FAN_SKILLS = {"
// và SKILLS vào cuối FAN_SKILLS (js/game.js), rồi chạy thử từng con. Ảnh comment + avatar đã có sẵn: assets/fan-comments/<key>.png, assets/avatars/fan/<key>.jpg.
// Cần dùng chung (vẫn nằm trong game.js): fanFx, _fanTps, _fanFoesOf, _fanNearest, _fanRayWall, _fanMinion, _fanMinionAI, _fanWorld.
// Còn nghi: lượt thử 25/11 không thấy gubby nào sống sau 7s (đẻ ra chưa? bị giết ngay?) — dò lại trước.

// ======================= HELPERS =======================
// 💬 #4 cinarmeydan — comment bay, meme được gọi ra giúp, bom của chữ C
const CN_TXT=['first!','W','ratio','L','who asked','bro 💀','skill issue','me next','cringe','💀💀💀'];
function _cnComment(f,t){ const a=Math.atan2(t.y-f.y,t.x-f.x), txt=CN_TXT[Math.floor(Math.random()*CN_TXT.length)];
  fanFx.push({ t:0, owner:f, x:f.x, y:f.y-f.size*0.9, vx:Math.cos(a)*9, vy:Math.sin(a)*9, txt,
    upd(q){ q.x+=q.vx; q.y+=q.vy; if(q.t>140 || q.x<-40||q.x>W+40||q.y<-40||q.y>H+40) return false;
      for(const u of _fanFoesOf(q.owner)) if(Math.hypot(u.x-q.x,u.y-q.y)<(u.size||20)+14){ u.takeDamage(45, q.owner); playSample('sn_pop',0.45); _hitParticles(u.x,u.y,'#ffffff',6,false,true); return false; }
      return true; },
    draw(q){ ctx.font='bold 15px Arial'; const w=ctx.measureText(q.txt).width+16, h=24; ctx.translate(q.x,q.y);
      ctx.fillStyle='#ffffff'; ctx.strokeStyle='#263238'; ctx.lineWidth=2;
      ctx.beginPath(); if(ctx.roundRect) ctx.roundRect(-w/2,-h/2,w,h,8); else ctx.rect(-w/2,-h/2,w,h); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-6,h/2-1); ctx.lineTo(-12,h/2+8); ctx.lineTo(2,h/2-1); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle='#263238'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(q.txt,0,1); } });
}
const _cnImgs={};
function _cnHelper(f){
  if(mspClones.filter(c=>c.owner===f && c.kind==='cn' && !c.dead && c.hp>0).length>=2) return;
  const pool=_fwRosterPool(); if(!pool.length) return;
  const pk=pool[Math.floor(Math.random()*pool.length)].c, url=pk.avatarUrl;
  let img=_cnImgs[url]; if(!img && url){ img=new Image(); img.src=url; _cnImgs[url]=img; }
  _fanMinion(f,{kind:'cn', hp:250, dmg:35, hitCD:Math.round(0.75*_fanTps()), size:f.size*0.8, img});
  spawnParticles(f.x,f.y,'#ffd54f',16,false,true); playSample('ar_clone',0.5);
  floatTexts.push({x:f.x,y:f.y-f.size-34,text:`${_nameParts(pk.name||'Meme').main} joins!`,color:'#ffd54f',life:70,big:true});
}
function _cnBomb(f){
  const foes=fighters.filter(o=>o.team!==f.team && !o.dead); if(!foes.length) return;
  const tg=foes[Math.floor(Math.random()*foes.length)], T=_fanTps();
  fanFx.push({ t:0, holdTeam:f.team, owner:f, tg, cx:f.x, cy:f.y, ph:'run', ex:0, ey:0, bx:tg.x, by:tg.y, fuse:Math.round(3*T), boom:0,
    upd(q){ const g=q.tg, alive=g && !g.dead; if(alive){ q.bx=g.x; q.by=g.y; }
      if(q.ph==='run'){ const dx=q.bx-q.cx, dy=q.by-q.cy, d=Math.hypot(dx,dy); if(d<(g?g.size:20)+10){ q.ph='flee'; playSample('br_tick',0.5);
          const ex=[[q.cx,-60],[q.cx,H+60],[-60,q.cy],[W+60,q.cy]].sort((A,B)=>Math.hypot(A[0]-q.cx,A[1]-q.cy)-Math.hypot(B[0]-q.cx,B[1]-q.cy))[0]; q.ex=ex[0]; q.ey=ex[1]; }
        else { q.cx+=dx/d*9; q.cy+=dy/d*9; } return true; }
      if(q.ph==='flee'){ const dx=q.ex-q.cx, dy=q.ey-q.cy, d=Math.hypot(dx,dy); if(d>6){ q.cx+=dx/d*10; q.cy+=dy/d*10; } }
      if(q.ph!=='run' && q.boom===0){ q.fuse--; if(q.fuse%Math.round(T)===0 && q.fuse>0) playSample('br_tick',0.45);
        if(q.fuse<=0){ q.boom=1; playSample('kn_boom_low',0.7); playSample('kn_explode_crunch',0.5); addShake(12,16);
          if(alive) g.takeDamage(220, q.owner);
          for(const u of _fanFoesOf(q.owner)) if(u!==g && Math.hypot(u.x-q.bx,u.y-q.by)<130) u.takeDamage(90, q.owner);
          spawnParticles(q.bx,q.by,'#ff9100',30,false,true); spawnParticles(q.bx,q.by,'#ffeb3b',20,false,true); } }
      if(q.boom>0){ q.boom++; if(q.boom>30) return false; }
      return true; },
    draw(q){
      if(q.boom>0){ const u=q.boom/30, R=40+150*u; ctx.globalCompositeOperation='lighter'; const gr=ctx.createRadialGradient(q.bx,q.by,0,q.bx,q.by,R);
        gr.addColorStop(0,`rgba(255,250,220,${1-u})`); gr.addColorStop(0.4,`rgba(255,150,40,${0.8*(1-u)})`); gr.addColorStop(1,'rgba(255,80,0,0)'); ctx.fillStyle=gr; ctx.beginPath(); ctx.arc(q.bx,q.by,R,0,Math.PI*2); ctx.fill(); return; }
      if(q.ph!=='run'){ const s=q.tg?q.tg.size:30; ctx.save(); ctx.translate(q.bx,q.by+s*0.15); ctx.font=`${Math.round(s*0.9)}px serif`; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('💣',0,0);   // 💣 buộc trước ngực
        const sec=Math.ceil(q.fuse/_fanTps()); ctx.font='bold 22px Arial'; ctx.lineWidth=4; ctx.strokeStyle='#000'; ctx.fillStyle=(q.fuse%20<10)?'#ff1744':'#ffffff'; ctx.strokeText(String(sec),0,-s*0.9); ctx.fillText(String(sec),0,-s*0.9); ctx.restore(); }
      if(q.ph==='run' || Math.hypot(q.ex-q.cx,q.ey-q.cy)>6){ const run=Math.sin(q.t*0.6)*0.25;   // 🅲 chữ C chạy (nhảy nhót) — đúng chữ C trên ảnh đại diện
        ctx.save(); ctx.translate(q.cx,q.cy-Math.abs(Math.sin(q.t*0.6))*6); ctx.rotate(run);
        ctx.fillStyle='#455a64'; ctx.beginPath(); ctx.arc(0,0,18,0,Math.PI*2); ctx.fill();
        ctx.fillStyle='#ffffff'; ctx.font='bold 24px Arial'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('C',0,1); ctx.restore(); } } });
}

// 🐱 #5 Goobysteak — gubby nổ khi chết · kính pixel ném kiểu boomerang
function _gbBoom(mc){ const R=80, d=mc.evil?190:95;
  for(const u of _fanFoesOf({team:mc.team})) if(Math.hypot(u.x-mc.x,u.y-mc.y)<R+(u.size||20)) u.takeDamage(d, mc.owner||null);
  playSample('kn_boom_low',0.45); addShake(5,8); spawnParticles(mc.x,mc.y,mc.evil?'#ff1744':'#fff59d',18,false,true);
  const x=mc.x, y=mc.y, ev=mc.evil;
  fanFx.push({ t:0, T:22, draw(q){ const u=q.t/q.T; ctx.globalCompositeOperation='lighter'; ctx.strokeStyle=ev?`rgba(255,40,60,${1-u})`:`rgba(255,240,180,${1-u})`; ctx.lineWidth=8*(1-u)+2;
    ctx.beginPath(); ctx.arc(x,y,R*(0.3+0.7*u),0,Math.PI*2); ctx.stroke(); } });
}
const GB_GLASS=['XXXXXXXXXXXXXXXX',' XWWXXX  XWWXXX ',' XXWWXX  XXWWXX ','  XXXX    XXXX  '];
function _gbDrawGlasses(x,y,rot){ const p=3.2, w=16*p, h=4*p; ctx.translate(x,y); ctx.rotate(rot);
  for(let r=0;r<4;r++) for(let c=0;c<16;c++){ const k=GB_GLASS[r][c]; if(k===' ') continue; ctx.fillStyle=k==='W'?'#ffffff':'#000000'; ctx.fillRect(-w/2+c*p,-h/2+r*p,p+0.5,p+0.5); } }
function _gbGlasses(f,t){ f._gbGlassOut=true; playSample('wg_axe_whoosh',0.4);
  const a=Math.atan2(t.y-f.y,t.x-f.x);
  fanFx.push({ t:0, owner:f, x:f.x, y:f.y, vx:Math.cos(a)*11, vy:Math.sin(a)*11, back:false, hit:new Set(), rot:0,
    upd(q){ const o=q.owner; if(!o || o.dead){ return false; } q.rot+=0.45;
      if(!q.back){ q.x+=q.vx; q.y+=q.vy; if(q.t>=34 || q.x<10||q.x>W-10||q.y<10||q.y>H-10){ q.back=true; q.hit.clear(); } }
      else { const dx=o.x-q.x, dy=o.y-q.y, d=Math.hypot(dx,dy); if(d<o.size){ o._gbGlassOut=false; return false; } q.x+=dx/d*13; q.y+=dy/d*13; }
      for(const u of _fanFoesOf(o)){ if(q.hit.has(u)) continue; if(Math.hypot(u.x-q.x,u.y-q.y)<(u.size||20)+14){ q.hit.add(u); u.takeDamage(40, o); playSample('bonk',0.35); _hitParticles(u.x,u.y,'#ffffff',6,false,true); } }
      return true; },
    draw(q){ _gbDrawGlasses(q.x,q.y,q.rot); } });
}


// ======================= SKILLS (dán vào FAN_SKILLS) =======================
  // ————————————————————————————————————————————————————————————————
  // #4 @cinarmeydan8407 (Part 6): "Im like doorbell chud but the bell is the comments once i ring it 6 times i spawn a random meme
  //   to help me if i die my C straps a bomb to someones chest and runs away" (ảnh đại diện = chữ C mặc định của YouTube)
  //  → chuông thông báo bay trên đầu, 2s reng 1 lần bắn 1 comment vào địch gần nhất (45) · reng đủ 6 lần gọi 1 meme ngẫu nhiên
  //    ra giúp (250 máu, chạm 35, tối đa 2) · chết hẳn: chữ C chạy tới buộc bom vào 1 địch rồi chạy mất, 3s sau nổ 220 (+90 quanh đó)
  //    Tiếng chuông: tiếng chime chung (heal_one), KHÔNG dùng tiếng chuông riêng của Doorbell Chud.
  // ————————————————————————————————————————————————————————————————
  cinarmeydan: {
    name: 'cinarmeydan8407', q: 4, avatar: 'assets/avatars/fan/cinarmeydan.jpg', cmt: 'assets/fan-comments/cinarmeydan.png',
    hp: 1000, size: 48, speed: 5,
    desc: "A notification bell floats over its head. Every 2s it rings and fires a comment at the nearest enemy (45). Every 6 rings a random meme joins to help. When it dies, its C straps a bomb to an enemy and runs — 3s later, boom.",
    init(f){ const T=_fanTps(); f._cnCD=Math.round(1*T); f._cnRings=0; f._cnRingT=0; f._cnBombed=false; },
    tick(f, e, dist, cham){
      const T=_fanTps(); if(f._cnRingT>0) f._cnRingT--;
      if(--f._cnCD>0 || f._isHardCC()) return;
      f._cnCD=Math.round(2*T);
      const t=_fanNearest(f,f.x,f.y); if(!t) return;
      f._cnRings++; f._cnRingT=24; playSample('heal_one',0.3);
      _cnComment(f,t);
      if(f._cnRings%6===0) _cnHelper(f);
    },
    onHurt(f, dmg, atk){
      if(!f._cnBombed && f.hp-dmg<=0 && (f._fanLives||1)<=1 && !((f._fanInvLeft||0)>0)){ f._cnBombed=true; _cnBomb(f); }
      return false;
    },
    draw(f, s){   // 🔔 chuông thông báo trên đầu (lắc khi reng) + 6 chấm đếm lượt reng tới lần gọi meme
      const sw=f._cnRingT>0 ? Math.sin(f._cnRingT*0.9)*0.55*(f._cnRingT/24) : 0, by=-s*1.62, r=s*0.36;
      ctx.save(); ctx.translate(0,by); ctx.rotate(sw);
      ctx.fillStyle='#ffd54f'; ctx.strokeStyle='#5d4300'; ctx.lineWidth=Math.max(1.5,r*0.12);
      ctx.beginPath(); ctx.moveTo(-r,r*0.75); ctx.quadraticCurveTo(-r*0.85,-r*0.9,0,-r); ctx.quadraticCurveTo(r*0.85,-r*0.9,r,r*0.75); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(0,r*0.95,r*0.22,0,Math.PI*2); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(0,-r*1.08,r*0.14,0,Math.PI*2); ctx.fill(); ctx.stroke();
      ctx.restore();
      const n=f._cnRings%6;
      for(let i=0;i<6;i++){ ctx.fillStyle=i<n?'#ffd54f':'rgba(255,255,255,0.25)'; ctx.beginPath(); ctx.arc((i-2.5)*s*0.22,by+r*1.55,Math.max(1.8,s*0.06),0,Math.PI*2); ctx.fill(); }
    },
  },

  // ————————————————————————————————————————————————————————————————
  // #5 @Goobythisgoobythatgoobysteak (Part 4): "My ability is to spawn gubbies that explode on death dealing 95 dmg also do 50 damage
  //   per contact, and I also throw my glasses like badass cool guy, and add chances for the gubbies to evolve into evil gubby to deal
  //   twice dmg" (ảnh đại diện: mèo trắng đeo kính pixel "deal with it" → gubby = bản thu nhỏ của chính nó, kính ném = kính pixel)
  //  → 1 gubby / 6s (90 máu, chạm 50, tối đa 3) · chết nổ 95 · 20% là gubby ác (đỏ, dame ×2) · ném kính kiểu boomerang 40 / 3s
  // ————————————————————————————————————————————————————————————————
  goobysteak: {
    name: 'Goobythisgoobythatgoobysteak', q: 5, avatar: 'assets/avatars/fan/goobysteak.jpg', cmt: 'assets/fan-comments/goobysteak.png',
    hp: 1000, size: 48, speed: 5,
    desc: "Spawns a gubby every 6s (90 HP, 50 on touch) that blows up for 95 when it dies — one in five hatches as an evil gubby with double damage. Throws its sunglasses like a boomerang every 3s.",
    init(f){ const T=_fanTps(); f._gbSpawnCD=Math.round(2*T); f._gbGlassCD=Math.round(1.5*T); f._gbGlassOut=false; },
    tick(f, e, dist, cham){
      const T=_fanTps();
      if(--f._gbSpawnCD<=0){ f._gbSpawnCD=Math.round(6*T);
        if(mspClones.filter(c=>c.owner===f && c.kind==='gb' && !c.dead && c.hp>0).length<3){
          const evil=Math.random()<0.2;
          _fanMinion(f,{kind:'gb', hp:90, dmg:evil?100:50, hitCD:Math.round(1.2*T), size:f.size*0.5, evil, spd:1.1, onDeath:_gbBoom});
          playSample('sn_pop',0.5); spawnParticles(f.x,f.y,evil?'#ff1744':'#ffffff',10,false,true); } }
      if(!f._gbGlassOut && --f._gbGlassCD<=0 && !f._isHardCC()){ const t=_fanNearest(f,f.x,f.y); if(t){ f._gbGlassCD=Math.round(3*T); _gbGlasses(f,t); } else f._gbGlassCD=10; }
    },
  },

  // ————————————————————————————————————————————————————————————————
  // #6 @jamesxyruzsagayno9734 (Part 4): "i shoot a beam at the enemy every 3 seconds. It has a 25% chance to miss, but every time
  //   i miss, it increases by 50 damage. Initial damage: 50. Also i gain speed every collision with enemy"
  //  → tia 70 / 3s (nhích từ 50 cho ngang meme thường) · trượt 25% → mọi tia sau +50 · mỗi lần va địch +6% tốc (tối đa 10 lần)
  // ————————————————————————————————————————————————————————————————
  jamesxyruz: {
    name: 'jamesxyruzsagayno9734', q: 6, avatar: 'assets/avatars/fan/jamesxyruz.jpg', cmt: 'assets/fan-comments/jamesxyruz.png',
    hp: 1000, size: 48, speed: 5,
    desc: "Fires a beam at the nearest enemy every 3s (70). One beam in four misses — and every miss makes all its later beams 50 stronger. Each time it bumps into an enemy it gets a little faster.",
    init(f){ const T=_fanTps(); f._jxCD=Math.round(1.5*T); f._jxDmg=70; f._jxBumpCD=0; f._jxSpd=0; },
    tick(f, e, dist, cham){
      const T=_fanTps(); f._jxBumpCD=Math.max(0,f._jxBumpCD-1);
      if(cham && f._jxBumpCD<=0 && f._jxSpd<10){ f._jxSpd++; f.topSpeed*=1.06; f._jxBumpCD=Math.round(0.6*T); spawnParticles(f.x,f.y,'#80d8ff',6,false,true); }
      if(--f._jxCD>0 || f._isHardCC()) return;
      const t=_fanNearest(f,f.x,f.y); if(!t){ f._jxCD=10; return; }
      f._jxCD=Math.round(3*T);
      const miss=Math.random()<0.25, a0=Math.atan2(t.y-f.y,t.x-f.x), a=miss ? a0+(Math.random()<0.5?-1:1)*(0.25+Math.random()*0.15) : a0;
      const L=miss ? _fanRayWall(f.x,f.y,a) : Math.hypot(t.x-f.x,t.y-f.y), w=6+Math.min(16,(f._jxDmg-70)/20);
      if(miss){ f._jxDmg+=50; floatTexts.push({x:f.x,y:f.y-f.size-26,text:'MISS +50',color:'#80d8ff',life:50}); }
      else { t.takeDamage(f._jxDmg, f); _hitParticles(t.x,t.y,'#80d8ff',10,false,true); addShake(3,5); }
      playSample('kn_laser_big',0.3);
      const x0=f.x, y0=f.y;
      fanFx.push({ t:0, T:18, draw(q){ const u=q.t/q.T, al=u<0.25?1:1-(u-0.25)/0.75, x1=x0+Math.cos(a)*L, y1=y0+Math.sin(a)*L;   // ⚡ tia (dày dần theo số lần trượt)
        ctx.globalCompositeOperation='lighter'; ctx.lineCap='round';
        for(const [lw,c] of [[w*2.6,'rgba(64,196,255,0.25)'],[w,'rgba(128,216,255,0.9)'],[w*0.4,'rgba(255,255,255,1)']]){ ctx.globalAlpha=al; ctx.strokeStyle=c; ctx.lineWidth=lw; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x1,y1); ctx.stroke(); } } });
    },
  },

