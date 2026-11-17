// 👁️ ===== FRIEND RAID (event Friend, 5/11/2026) — khối RF_* / _rf* =====
// 4 meme anh chọn (team 0) đánh boss FRIEND khổng lồ (team 1) trên 1 TẢNG ĐÁ XÁM TRÒN lơ lửng giữa thung lũng khói lửa, trời trăng máu.
// Khung dọc 9:16 — mượn nguyên khung 4 người của 2vs2 (duoCtx, gắn cờ .raid), mọi phần riêng của raid nằm trong file này.
//  • Phase 1: Friend BÁM GÓC trên-phải tảng đá, BẤT TỬ. 2 tay bóng tối (trái / phải, mỗi tay 2000 máu) đánh meme lại gần:
//    tích lực 2s (vòng cảnh báo bám theo con mồi rồi khoá) → NỆN xuống, nổ vùng cỡ nắm tay 200 dame. Nện đủ 2 lần → tay
//    ĐỔ XUỐNG SÀN nằm 5s — CHỈ lúc nằm mới bị đánh (đang bay trên không thì miễn nhiễm, không nhắm được) — rồi lặp lại.
//  • Phase 2 (2 tay chết): Friend GẦM, rời góc ra giữa sân, 10 cánh tay mọc sau lưng đâm thẳng lên trời. 5000 máu.
//    Skill 1: mỗi 3s cảnh báo 3 vùng 2s → tay từ trời nện xuống, 100 dame. Skill 2: há mồm hút chậm meme 1.5s, con nào
//    sát miệng bị NUỐT: nhai 5s, 50 dame/s, rồi nhổ ra.
//  • Chiêu giết ngay / khống chế (Troll Face nuốt, Sus Cat đẩy ra vũ trụ, Joninn chém chết, Marmot ghim tường, Hollow Purple
//    xoá sổ, Big Bang…) KHÔNG tác động lên Friend / 2 tay — đổi thẳng ra dame (anh dặn): xem _rfGuard.
//  • HUD kiểu rogue-lite / Deltarune (thanh boss trên cùng, 4 ô đồng đội dưới đáy). Nhạc: phase 1 The World Revolving
//    (Deltarune), phase 2 nhạc Friend. Tiếng các meme khác nhỏ lại, nhạc theme của meme khác tắt hẳn.
const RF={ HAND_HP:2000, SLAM_DMG:200, CHARGE_T:120, LOCK_T:36, SLAM_T:9, RECOVER_T:34, IDLE_T:40, DOWN_T:300, RISE_T:40,
  P2_HP:5000, ROAR_T:110, MOVE_T:110, ARMS_T:50, Z_EVERY:180, Z_WARN:120, Z_N:3, Z_DMG:100, Z_FALL:10,
  SUCK_FIRST:420, SUCK_EVERY:600, SUCK_T:90, EAT_T:300, EAT_DPS:50, MEME_HP:2000, KILL_PCT:0.1, SFX_MUL:0.45 };
const RF_IMG={};
for(const [k,src] of [['idle','assets/avatars/friend/avatarUrl.webp'],['m1','assets/avatars/friend/skill1AvatarUrl.webp'],
  ['m2','assets/avatars/friend/skill2AvatarUrl.webp'],['m3','assets/avatars/friend/skill3AvatarUrl.webp'],
  ['mouth','assets/img/friend/RF_MOUTH.png'],['chew1','assets/img/friend/RF_CHEW1.png'],['chew2','assets/img/friend/RF_CHEW2.png']]){
  const im=new Image(); im.onerror=()=>{ im._missing=true; }; im.src=src; RF_IMG[k]=im; }   // mouth/chew: ảnh anh vẽ (chưa có thì dùng tạm khung cười)
const RF_OWN_SND=new Set(['rf_world_revolving','fr_song','fr_titan_roar','fr_bite','fr_chew','cine_deep_impact','l2p_rumble','l2p_riser','ep3_blip','death_break','l2p_crack']);
let rfHands=[], rfFx=[], rf=null;   // rf = trạng thái trận raid (null = không trong raid)
const _rfOn=()=>!!(typeof duoCtx!=='undefined' && duoCtx && duoCtx.raid);
const _rfU=()=>W/480;
const _rfArena=()=>({cx:W/2, cy:H/2, R:Math.min(W,H)*0.47});
const _rfImgOk=im=>im && im.complete && im.naturalWidth && !im._missing;
const _rfH=(a,b)=>{ const s=Math.sin(a*127.1+b*311.7)*43758.5453; return s-Math.floor(s); };   // băm (không đụng Math.random của trận)

// ───────── DỰNG TRẬN ─────────
function openRaidPicker(){
  _rfPicking=true; openDuoPicker();
  const ov=document.getElementById('duoPickerOverlay'); if(!ov) return;
  const t2=ov.querySelector('.rt-title-2'); if(t2){ t2.dataset.old=t2.dataset.old||t2.innerHTML; t2.innerHTML='<span class="rt-title-trophy">👁️</span>Friend Raid<span class="rt-title-trophy">👁️</span>'; }
  const labs=ov.querySelectorAll('.duo-pick-group-label'); labs.forEach((l,i)=>{ l.dataset.old=l.dataset.old||l.textContent; l.textContent=i?'RAID PARTY · 3–4':'RAID PARTY · 1–2'; l.dataset.oc=l.dataset.oc||l.style.color; l.style.color='#ffcf5a'; });
  const b=document.getElementById('duoStartBtn'); if(b){ b.setAttribute('onclick','raidStart()'); b.textContent='▶ START RAID'; }
  _duoRenderGrid();
}
let _rfPicking=false;
function _rfPickerRestore(){   // về lại picker 2vs2 nguyên bản
  _rfPicking=false; const ov=document.getElementById('duoPickerOverlay'); if(!ov) return;
  const t2=ov.querySelector('.rt-title-2'); if(t2 && t2.dataset.old) t2.innerHTML=t2.dataset.old;
  ov.querySelectorAll('.duo-pick-group-label').forEach(l=>{ if(l.dataset.old) l.textContent=l.dataset.old; if(l.dataset.oc!==undefined) l.style.color=l.dataset.oc; });
  const b=document.getElementById('duoStartBtn'); if(b){ b.setAttribute('onclick','duoStart()'); b.textContent='▶ START BATTLE'; }
}
function raidStart(){
  if(_duoPickedIdxs.some(x=>x==null)) return;
  const fi=roster.findIndex(c=>c.charKey==='friend'); if(fi<0) return;
  duoStart();                                     // dựng khung dọc 4 người y hệt 2vs2…
  duoCtx.raid=true;                               // …rồi bật raid
  picks=_duoPickedIdxs.slice().concat([fi]);      // slot 4 = Friend (boss)
  _rfPickerRestore();
  _floorCache=null; _rfSkyC=null; _rfFloorC=null;
  loadAvatars(()=>{ showVsWaitScreen(); });
}
// bấm ▶ START: dàn 4 meme quanh nửa dưới tảng đá + Friend (Fighter team 1, do raid điều khiển hoàn toàn)
function raidActuallyStart(){
  if(animId) cancelAnimationFrame(animId);
  animId=null; isPaused=false; _gameTickAccum=0;
  stopAllBattleMusic(); _ffa3ClearArrays(); _rfReset();
  loop._duoDone=false;
  const A=_rfArena(), pos=[[-0.55,0.35],[-0.18,0.6],[0.18,0.6],[0.55,0.35]];
  for(let i=0;i<4;i++){ const f=new Fighter(i,0,A.cx+pos[i][0]*A.R,A.cy+pos[i][1]*A.R); f._entryTimer=0; f.size*=0.92;
    f.hp=RF.MEME_HP; f.maxHp=RF.MEME_HP; f._duoDealt=0; f._duoTaken=0; fighters.push(f); }
  const P=_rfPerch(), B=new Fighter(4,1,P.x,P.y);
  B.type='frraid'; B._entryTimer=0; B.hp=RF.P2_HP; B.maxHp=RF.P2_HP; B.size=W*0.2; B._raidHide=true; B._rfHp=B.hp;
  // mọi dame HỢP LỆ đi qua đây → ghi lại máu thật (_rfHp); phase 1 bất tử thì bỏ qua hẳn. Đổi máu ngoài luồng này = chiêu giết ngay → _rfGuard
  B.takeDamage=function(...a){ if(this._raidHide || !rf) return; const r=Fighter.prototype.takeDamage.apply(this,a); this._rfHp=this.hp; return r; };
  fighters.push(B);
  rf={ boss:B, phase:1, t:0, phT:0, music:null, musKey:null, zoneCD:90, suckCD:RF.SUCK_FIRST, suck:null, zones:[], eaten:[], arms:[], shake:0, flash:0, roar:0 };
  for(const side of [0,1]) rfHands.push(_rfMakeHand(side));
  _rfMusic('rf_world_revolving');
  loop();
}
function _rfReset(){ rfHands=[]; rfFx=[]; _rfHudLag={}; if(rf && rf.music){ try{ rf.music.pause(); }catch(e){} } rf=null; }
function _rfMakeHand(side){
  const A=_rfArena(), u=_rfU();
  const home=side ? {x:A.cx+A.R*0.42, y:A.cy+A.R*0.30} : {x:A.cx-A.R*0.45, y:A.cy-A.R*0.25};
  return { team:1, rfHand:true, side, x:home.x, y:home.y, hx:home.x, hy:home.y, size:28*u, hp:RF.HAND_HP, maxHp:RF.HAND_HP, _rfHp:RF.HAND_HP,
    dead:false, flash:0, stun:0, vx:0, vy:0, st:'idle', t:RF.IDLE_T*(side?1.6:1), z:40*u, slams:0, tx:home.x, ty:home.y, seed:side*3.7+1.3, _untarget:true,
    takeDamage(dmg,attacker,isHuh,isBurn,dotIcon,hitFx){ if(this._untarget || this.dead || !rf) return; _summonTakeDamage(this, dmg, attacker, isHuh, isBurn, dotIcon, hitFx); this._rfHp=this.hp; } };
}
// chỗ Friend bám (phase 1): góc trên-phải, ngoài vòng tròn tảng đá
function _rfPerch(){ return {x:W*0.93, y:H*0.02}; }

// ───────── NHẠC / TIẾNG ─────────
function _rfMusic(key){
  if(!rf || rf.musKey===key) return;
  if(rf.music){ const o=rf.music; try{ o.pause(); }catch(e){} try{ _longSfx.delete(o); }catch(e){} }
  rf.musKey=key; const a=AUDIO_SAMPLES[key]?.cloneNode(); rf.music=a||null; if(!a) return;
  a.loop=true; a.volume=0.9; a._sndKey=key;
  try{ if(AC.state==='suspended') AC.resume(); _mixRoute(a); }catch(e){}
  try{ _longSfx.add(a); }catch(e){}
  a.play().catch(()=>{});
}
// playSample() gọi vào đây: trong raid nhạc theme meme khác TẮT, tiếng meme khác NHỎ LẠI, tiếng Friend / boss giữ nguyên
function _rfSndVol(key, vol){
  if(!_rfOn() || RF_OWN_SND.has(key)) return vol;
  if(SND_MUSIC.has(key)) return 0;
  return vol*RF.SFX_MUL;
}

// ───────── CHẶN CHIÊU GIẾT NGAY / KHỐNG CHẾ → ĐỔI RA DAME ─────────
function _rfImmune(u){ return !!(_rfOn() && rf && u && (u===rf.boss || u.rfHand)); }
function _rfKillDmg(u){ return Math.round((u.maxHp||1000)*RF.KILL_PCT); }
// gọi mỗi tick: mọi đường giết thẳng / xoá sổ / nuốt / ghim (kể cả gán hp=0 / dead=true trực tiếp) đều bị hoàn lại rồi đổi thành dame
function _rfGuard(u){
  if(!u || !rf) return;
  const legitDead = (u._rfHp||0)<=0;
  const cc = u._tfSwallowed || u._mmHeld || (u._dawaeExecT>0) || u._mwErased || u._bcGone || u._dpGone || u._bcSuckK;
  const hacked = (u.dead && !legitDead) || (u.hp!==u._rfHp && !legitDead);
  if(!cc && !hacked) return;
  const src=(u._tfSwallowed&&u._tfSwallowed.takeDamage)?u._tfSwallowed:null;
  if(u._tfSwallowed){ const T=u._tfSwallowed; if(T._tfVictim===u){ T._tfVictim=null; T._tfSwallowT=0; if(T._tfChewSfx){ try{ _stopLoopAudio(T._tfChewSfx); }catch(e){} T._tfChewSfx=null; } } }
  u._tfSwallowed=null; u._mmHeld=null; u._dawaeExecT=0; u._mwErased=false; u._bcGone=false; u._dpGone=false; u._bcSuckK=0;
  if(typeof mmFly!=='undefined') mmFly=mmFly.filter(q=>q.v!==u && q.e!==u && q.t!==u);
  u.dead=false; u.hp=Math.max(1,u._rfHp||1); u._deathTick=undefined;
  const d=_rfKillDmg(u);
  if(!u.rfHand && rf.phase!==2){ u._rfHp=u.hp; return; }   // phase 1 / đang chuyển phase: Friend BẤT TỬ → chỉ hoàn lại, không mất máu
  if(u.rfHand){ const was=u._untarget; u._untarget=false; u.takeDamage(d, src); u._untarget=was; }
  else { u._raidHide=false; u.takeDamage(d, src); if(rf.phase===1) u._raidHide=true; }
  u._rfHp=u.hp;
}

// ───────── VÒNG TICK ─────────
function _rfWorldTick(){
  if(!rf || !_rfOn()) return;
  rf.t++; rf.phT++; rf.flash=Math.max(0,rf.flash-1);
  const B=rf.boss;
  _rfGuard(B); for(const h of rfHands) _rfGuard(h);
  for(const h of rfHands) if(h.hp<=0 && !h.dead){ h.dead=true; _rfHandDie(h); }
  if(rf.phase===1) _rfPhase1();
  else if(rf.phase===1.5) _rfTransition();
  else _rfPhase2();
  for(let i=rfFx.length-1;i>=0;i--){ const q=rfFx[i]; q.t++; if(q.t>=q.T) rfFx.splice(i,1); }
  // meme bị văng ra khỏi tảng đá tròn → kéo về trong (vòng tròn = tường)
  for(const f of fighters) if(f!==B && !f.dead) _rfCircleWall(f);
}
const _rfMemes=()=>fighters.filter(f=>f.team===0 && !f.dead && !f._rfEaten);
function _rfCircleWall(f){
  const A=_rfArena(), dx=f.x-A.cx, dy=f.y-A.cy, d=Math.hypot(dx,dy)||1, lim=A.R-(f.size||20)*0.85;
  if(d<=lim) return;
  const nx=dx/d, ny=dy/d; f.x=A.cx+nx*lim; f.y=A.cy+ny*lim;
  const vn=(f.vx||0)*nx+(f.vy||0)*ny; if(vn>0){ f.vx-=2*vn*nx*0.8; f.vy-=2*vn*ny*0.8; }
}

// ── PHASE 1: 2 tay ──
function _rfPhase1(){
  const B=rf.boss, P=_rfPerch(); B.x=P.x; B.y=P.y; B.vx=B.vy=0;
  const u=_rfU(), memes=_rfMemes();
  for(const h of rfHands){ if(h.dead) continue; h.flash=Math.max(0,h.flash-1); h.t--;
    const pick=()=>{ let best=null, bd=1e9; for(const m of memes){ const sideOk=h.side?m.x>W*0.4:m.x<W*0.6, d=Math.hypot(m.x-h.hx,m.y-h.hy)*(sideOk?1:1.8); if(d<bd){ bd=d; best=m; } } return best; };
    if(h.st==='idle'){ h._untarget=true; h.z+=(40*u-h.z)*0.1; h.x+=(h.hx-h.x)*0.06; h.y+=(h.hy-h.y)*0.06;
      if(h.t<=0){ const m=pick(); if(m){ h.st='charge'; h.t=RF.CHARGE_T; h.tgt=m; h.tx=m.x; h.ty=m.y; playSample('l2p_rumble',0.5,1.6); } else h.t=20; } }
    else if(h.st==='charge'){ h._untarget=true; const k=1-h.t/RF.CHARGE_T;
      if(h.t>RF.LOCK_T && h.tgt && !h.tgt.dead){ h.tx+=(h.tgt.x-h.tx)*0.12; h.ty+=(h.tgt.y-h.ty)*0.12; }   // bám theo con mồi, 0.6s cuối khoá → còn kịp né
      h.x+=(h.tx-h.x)*0.14; h.y+=(h.ty-h.y)*0.14; h.z=40*u+k*90*u;   // nhấc cao dần (tích lực)
      if(h.t<=0){ h.st='slam'; h.t=RF.SLAM_T; h.z0=h.z; } }
    else if(h.st==='slam'){ h._untarget=true; h.z=h.z0*(h.t/RF.SLAM_T); h.x+=(h.tx-h.x)*0.5; h.y+=(h.ty-h.y)*0.5;
      if(h.t<=0){ h.z=0; _rfImpact(h.tx,h.ty,_rfFistR(),RF.SLAM_DMG,B,1); h.slams++;
        if(h.slams>=2){ h.st='down'; h.t=RF.DOWN_T; h.slams=0; h._untarget=false; rfFx.push({k:'downfx',h,t:0,T:30}); }
        else { h.st='recover'; h.t=RF.RECOVER_T; } } }
    else if(h.st==='recover'){ h._untarget=true; h.z+=(40*u-h.z)*0.12; if(h.t<=0){ h.st='idle'; h.t=RF.IDLE_T; } }
    else if(h.st==='down'){ h._untarget=false; h.z=0; if(h.t<=0){ h.st='rise'; h.t=RF.RISE_T; h._untarget=true; } }
    else if(h.st==='rise'){ h._untarget=true; h.z+=(40*u-h.z)*0.1; h.x+=(h.hx-h.x)*0.05; h.y+=(h.hy-h.y)*0.05; if(h.t<=0){ h.st='idle'; h.t=RF.IDLE_T; } }
  }
  if(rfHands.length && rfHands.every(h=>h.dead) && !rfFx.some(q=>q.k==='handdie')){ rf.phase=1.5; rf.phT=0; rf.roar=0; playSample('fr_titan_roar',1.0); addShake(14,40); rf.flash=26; }
}
const _rfFistR=()=>34*_rfU();
// nện xuống: nổ vùng tròn bán kính r lên mọi meme (+ quân triệu hồi có máu của phe meme)
function _rfImpact(x,y,r,dmg,src,big){
  for(const m of _rfMemes()) if(Math.hypot(m.x-x,m.y-y)<r+(m.size||20)*0.7){ m.takeDamage(dmg,src); const a=Math.atan2(m.y-y,m.x-x); m.vx=(m.vx||0)+Math.cos(a)*6; m.vy=(m.vy||0)+Math.sin(a)*6; }
  _hitSummonsArea(1,x,y,r,dmg,src);
  rfFx.push({k:'slam',x,y,r,t:0,T:big?34:26,big});
  addShake(big?9:6,big?14:10); playSample('cine_deep_impact',big?0.75:0.5);
  if(typeof spawnParticles==='function') spawnParticles(x,y,'#7a7a80',big?14:9,false,false);
}
function _rfHandDie(h){
  rfFx.push({k:'handdie',x:h.x,y:h.y,h,t:0,T:60}); playSample('death_break',0.9); addShake(10,18);
  if(typeof spawnParticles==='function') spawnParticles(h.x,h.y,'#120016',22,false,true);
}

// ── CHUYỂN PHASE: gầm → rời góc ra giữa sân → 10 cánh tay mọc lên trời ──
function _rfTransition(){
  const B=rf.boss, P=_rfPerch(), A=_rfArena(), t=rf.phT;
  if(t===1){ _rfMusic(null); }
  if(t<RF.ROAR_T){ B.x=P.x; B.y=P.y; if(t%6===0) addShake(6,8); return; }
  const k=Math.min(1,(t-RF.ROAR_T)/RF.MOVE_T), e=k<0.5?2*k*k:1-Math.pow(-2*k+2,2)/2;
  B.x=P.x+(A.cx-P.x)*e; B.y=P.y+(A.cy-A.R*0.1-P.y)*e;
  if(t===RF.ROAR_T+RF.MOVE_T){ playSample('l2p_crack',0.9); addShake(10,16); rf.flash=12; _rfMusic('fr_song'); }
  if(t>=RF.ROAR_T+RF.MOVE_T+RF.ARMS_T){ rf.phase=2; rf.phT=0; B._raidHide=false; B.hp=B._rfHp=RF.P2_HP; }
}
// ── PHASE 2 ──
function _rfPhase2(){
  const B=rf.boss, A=_rfArena(), u=_rfU();
  if(B.dead){ rf.zones=[]; rf.suck=null; for(const m of rf.eaten) m._rfEaten=null; rf.eaten=[]; return; }   // Friend gục: dọn vùng cảnh báo, nhả meme đang nhai
  B.x=A.cx; B.y=A.cy-A.R*0.1; B.vx=B.vy=0; B._rfHp=B.hp;
  // skill 2: há mồm hút
  if(rf.suck){ const S=rf.suck; S.t++;
    const mx=B.x, my=B.y+B.size*0.1;
    if(S.t<=RF.SUCK_T){ for(const m of _rfMemes()){ const dx=mx-m.x, dy=my-m.y, d=Math.hypot(dx,dy)||1, sp=Math.min(d,(0.9+1.6*(S.t/RF.SUCK_T))*u); m.x+=dx/d*sp; m.y+=dy/d*sp; } }
    if(S.t===RF.SUCK_T){
      for(const m of _rfMemes()) if(Math.hypot(m.x-mx,m.y-my)<B.size*0.95+(m.size||20)){ m._rfEaten={t:0}; rf.eaten.push(m); }
      if(rf.eaten.length){ playSample('fr_bite',1.0); addShake(8,12); }
    }
    if(S.t>=RF.SUCK_T+12) rf.suck=null;
  }
  // đang nhai: 50 dame/s, hết 5s nhổ ra
  for(let i=rf.eaten.length-1;i>=0;i--){ const m=rf.eaten[i], E=m._rfEaten; if(!E){ rf.eaten.splice(i,1); continue; }
    E.t++; m.x=B.x; m.y=B.y+B.size*0.1; m.vx=m.vy=0;
    if(E.t%60===0 && !m.dead){ m.takeDamage(RF.EAT_DPS,B,false,false,'',null,true); }
    if(E.t%42===1) playSample('fr_chew',0.7);
    if(m.dead || E.t>=RF.EAT_T){ m._rfEaten=null; rf.eaten.splice(i,1);
      if(!m.dead){ const a=Math.PI*0.5+(Math.random()-0.5)*1.6; m.x=B.x+Math.cos(a)*B.size*1.2; m.y=B.y+Math.sin(a)*B.size*1.2; m.vx=Math.cos(a)*12; m.vy=Math.sin(a)*12; } } }
  if(!rf.suck && !rf.eaten.length && --rf.suckCD<=0){ rf.suck={t:0}; rf.suckCD=RF.SUCK_EVERY; playSample('l2p_riser',0.9); }
  // skill 1: 3 vùng cảnh báo → tay từ trời nện xuống (nghỉ trong lúc đang hút / nhai)
  if(!rf.suck && --rf.zoneCD<=0){ rf.zoneCD=RF.Z_EVERY;
    const ms=_rfMemes(); for(let k=0;k<RF.Z_N;k++){ let x,y; const m=ms.length?ms[(k+(rf.t>>3))%ms.length]:null;
      if(m && k<ms.length){ x=m.x; y=m.y; } else { const a=_rfH(rf.t,k)*Math.PI*2, r=A.R*(0.25+0.6*_rfH(k,rf.t)); x=A.cx+Math.cos(a)*r; y=A.cy+Math.sin(a)*r; }
      rf.zones.push({x,y,r:40*u,t:0,arm:k%10}); }
    playSample('ep3_blip',0.8); }
  for(let i=rf.zones.length-1;i>=0;i--){ const z=rf.zones[i]; z.t++;
    if(z.t===RF.Z_WARN+RF.Z_FALL) _rfImpact(z.x,z.y,z.r,RF.Z_DMG,B,0);
    if(z.t>=RF.Z_WARN+RF.Z_FALL+24) rf.zones.splice(i,1); }
}

// ───────── VẼ ─────────
let _rfSkyC=null, _rfFloorC=null;
// nền: nửa trên trời đỏ + TRĂNG MÁU, nửa dưới thung lũng khói lửa + vực sâu (toạ độ MÀN HÌNH, đã setTransform(_ARENA_SS))
function _rfSky(vw,vh){
  if(!_rfSkyC || _rfSkyC.w!==vw || _rfSkyC.h!==vh){
    const c=document.createElement('canvas'), S=_ARENA_SS; c.width=Math.ceil(vw*S); c.height=Math.ceil(vh*S); const g=c.getContext('2d'); g.scale(S,S);
    const hz=vh*0.5;
    let gr=g.createLinearGradient(0,0,0,hz); gr.addColorStop(0,'#1a0204'); gr.addColorStop(0.45,'#4a0807'); gr.addColorStop(0.85,'#8e1a0c'); gr.addColorStop(1,'#c4471a');
    g.fillStyle=gr; g.fillRect(0,0,vw,hz+2);
    // trăng máu (trên-trái, Friend bám góc phải)
    const mx=vw*0.24, my=vh*0.235, mr=vw*0.12;
    gr=g.createRadialGradient(mx,my,mr*0.6,mx,my,mr*3.2); gr.addColorStop(0,'rgba(255,60,30,0.55)'); gr.addColorStop(0.4,'rgba(200,20,10,0.18)'); gr.addColorStop(1,'rgba(120,0,0,0)');
    g.fillStyle=gr; g.fillRect(0,0,vw,hz);
    gr=g.createRadialGradient(mx-mr*0.3,my-mr*0.35,mr*0.1,mx,my,mr); gr.addColorStop(0,'#ff8a5c'); gr.addColorStop(0.55,'#d92a14'); gr.addColorStop(1,'#7a0a06');
    g.fillStyle=gr; g.beginPath(); g.arc(mx,my,mr,0,Math.PI*2); g.fill();
    for(let i=0;i<9;i++){ const a=_rfH(i,1)*6.28, r=mr*0.75*Math.sqrt(_rfH(i,2)), cr=mr*(0.07+0.12*_rfH(i,3));   // miệng hố
      g.fillStyle='rgba(90,5,5,0.35)'; g.beginPath(); g.arc(mx+Math.cos(a)*r,my+Math.sin(a)*r,cr,0,Math.PI*2); g.fill(); }
    // mây khói vắt ngang trời
    for(let i=0;i<7;i++){ const y=vh*(0.08+0.06*i), x=vw*_rfH(i,5), w=vw*(0.5+0.4*_rfH(i,6)), h=vh*0.03;
      gr=g.createRadialGradient(x,y,0,x,y,w*0.5); gr.addColorStop(0,'rgba(30,4,6,0.55)'); gr.addColorStop(1,'rgba(30,4,6,0)');
      g.save(); g.translate(x,y); g.scale(1,h/(w*0.5)); g.translate(-x,-y); g.fillStyle=gr; g.beginPath(); g.arc(x,y,w*0.5,0,Math.PI*2); g.fill(); g.restore(); }
    // nửa dưới: thung lũng — 2 vách núi lởm chởm + vực sâu đen ở giữa, lửa rực ở mép vực
    gr=g.createLinearGradient(0,hz,0,vh); gr.addColorStop(0,'#3a0a06'); gr.addColorStop(0.5,'#160304'); gr.addColorStop(1,'#050102');
    g.fillStyle=gr; g.fillRect(0,hz,vw,vh-hz);
    const ridge=(side,base,amp,col,seed)=>{ g.fillStyle=col; g.beginPath(); g.moveTo(side?vw:0,vh); g.lineTo(side?vw:0,hz+base);
      for(let i=0;i<=14;i++){ const t=i/14, x=side?vw-t*vw*0.62:t*vw*0.62, y=hz+base+t*t*vh*0.32+(_rfH(i,seed)-0.5)*amp; g.lineTo(x,y); }
      g.lineTo(side?vw*0.38:vw*0.62,vh); g.closePath(); g.fill(); };
    ridge(0,vh*0.02,vh*0.05,'#240607',11); ridge(1,vh*0.035,vh*0.05,'#240607',17);
    ridge(0,vh*0.12,vh*0.04,'#120304',23); ridge(1,vh*0.14,vh*0.04,'#120304',29);
    gr=g.createRadialGradient(vw*0.5,vh*0.98,vw*0.05,vw*0.5,vh*0.98,vw*0.7); gr.addColorStop(0,'rgba(255,120,30,0.55)'); gr.addColorStop(0.3,'rgba(220,60,10,0.25)'); gr.addColorStop(1,'rgba(150,20,0,0)');
    g.globalCompositeOperation='lighter'; g.fillStyle=gr; g.fillRect(0,hz,vw,vh-hz); g.globalCompositeOperation='source-over';
    gr=g.createLinearGradient(0,hz-vh*0.04,0,hz+vh*0.06); gr.addColorStop(0,'rgba(255,110,40,0)'); gr.addColorStop(0.5,'rgba(255,90,30,0.35)'); gr.addColorStop(1,'rgba(255,90,30,0)');
    g.fillStyle=gr; g.fillRect(0,hz-vh*0.04,vw,vh*0.1);   // đường chân trời rực lửa
    _rfSkyC={c,w:vw,h:vh};
  }
  ctx.drawImage(_rfSkyC.c,0,0,vw,vh);
  // động: khói cuộn bốc từ vực + tàn lửa bay lên (băm theo tick, không dùng Math.random)
  const t=tick||0; ctx.save();
  for(let i=0;i<9;i++){ const ph=((t*0.0012*(0.6+_rfH(i,7)))+_rfH(i,8))%1, x=vw*(0.15+0.7*_rfH(i,9))+Math.sin(t*0.01+i)*vw*0.04, y=vh*(1.02-ph*0.55), r=vw*(0.12+0.1*_rfH(i,10))*(0.6+ph);
    const gr=ctx.createRadialGradient(x,y,0,x,y,r); gr.addColorStop(0,`rgba(40,12,10,${0.45*Math.sin(ph*Math.PI)})`); gr.addColorStop(1,'rgba(40,12,10,0)');
    ctx.fillStyle=gr; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill(); }
  ctx.globalCompositeOperation='lighter';
  for(let i=0;i<46;i++){ const ph=((t*0.003*(0.5+_rfH(i,11)))+_rfH(i,12))%1, x=vw*_rfH(i,13)+Math.sin(t*0.02+i*1.7)*12, y=vh*(1.0-ph*0.9), a=Math.sin(ph*Math.PI)*(0.5+0.5*Math.sin(t*0.12+i));
    ctx.globalAlpha=a*0.85; ctx.fillStyle=i%3?'#ff8a2a':'#ffd06a'; ctx.fillRect(x,y,2.2,2.2); }
  ctx.restore();
}
// sàn: TẢNG ĐÁ XÁM khổng lồ lơ lửng, mặt trên tròn, mặt dưới lởm chởm low-poly, hắt ánh lửa cam từ dưới (toạ độ WORLD)
function _rfFloor(){
  const A=_rfArena(), u=_rfU();
  if(!_rfFloorC || _rfFloorC.W!==W){
    const M=Math.ceil(A.R*0.35), Hd=Math.ceil(A.R*1.75), S=_ARENA_SS, c=document.createElement('canvas');
    c.width=Math.ceil((W+M*2)*S); c.height=Math.ceil((H+M+Hd)*S); const g=c.getContext('2d'); g.scale(S,S); g.translate(M,M);
    const cx=A.cx, cy=A.cy, R=A.R;
    // mặt dưới tảng đá: vòm lởm chởm thắt dần xuống 1 mũi nhọn
    const N=22, pts=[], DROP=1.75;
    for(let i=0;i<=N;i++){ const t=i/N, a=Math.PI*(1-t), x=cx+Math.cos(a)*R*(1.0-0.04*_rfH(i,3)), drop=Math.pow(Math.sin(Math.PI*t),1.25)*R*DROP*(0.85+0.25*_rfH(i,4)); pts.push([x, cy+Math.sin(Math.PI*t)*R*0.05+drop+ (i===0||i===N?0:(_rfH(i,5)-0.5)*R*0.08)]); }
    const tri=(a,b,c2,sh)=>{ const v=Math.max(0,Math.min(1,sh)), col=`rgb(${Math.round(40+70*v)},${Math.round(40+68*v)},${Math.round(44+70*v)})`; g.fillStyle=col; g.strokeStyle=col; g.lineWidth=0.8*u; g.beginPath(); g.moveTo(...a); g.lineTo(...b); g.lineTo(...c2); g.closePath(); g.fill(); g.stroke(); };
    for(let i=0;i<N;i++){ const top0=[pts[i][0],cy], top1=[pts[i+1][0],cy], mid0=[(pts[i][0]+cx)/2*0+pts[i][0]*1, cy+(pts[i][1]-cy)*0.45], mid1=[pts[i+1][0], cy+(pts[i+1][1]-cy)*0.45];
      const s=0.75-0.5*(i/N)+(_rfH(i,6)-0.5)*0.14;   // sáng bên trái, tối dần sang phải
      tri(top0,top1,mid1,s); tri(top0,mid1,mid0,s-0.05); tri(mid0,mid1,pts[i+1],s-0.25); tri(mid0,pts[i+1],pts[i],s-0.3); }
    // ánh lửa hắt từ vực lên đáy đá
    let gr=g.createLinearGradient(0,cy+R*0.4,0,cy+R*1.2); gr.addColorStop(0,'rgba(255,90,20,0)'); gr.addColorStop(1,'rgba(255,100,30,0.45)');
    g.globalCompositeOperation='source-atop'; g.fillStyle=gr; g.fillRect(cx-R*1.2,cy,R*2.4,R*1.3); g.globalCompositeOperation='source-over';
    // gờ đá dày quanh mặt trên
    g.fillStyle='#3d3e43'; g.beginPath(); g.ellipse(cx,cy+R*0.035,R*1.015,R*1.015,0,0,Math.PI*2); g.fill();
    // mặt trên: đá xám, phiến đá ghép theo vòng + nứt mờ
    gr=g.createRadialGradient(cx-R*0.25,cy-R*0.3,R*0.1,cx,cy,R); gr.addColorStop(0,'#8a8c91'); gr.addColorStop(0.7,'#6b6d72'); gr.addColorStop(1,'#55575c');
    g.fillStyle=gr; g.beginPath(); g.arc(cx,cy,R,0,Math.PI*2); g.fill();
    g.save(); g.beginPath(); g.arc(cx,cy,R,0,Math.PI*2); g.clip();
    g.strokeStyle='rgba(30,30,34,0.22)'; g.lineWidth=1.1*u;
    for(const rr of [0.33,0.62,0.86]){ g.beginPath(); g.arc(cx,cy,R*rr,0,Math.PI*2); g.stroke(); }
    for(const [rr0,rr1,n,off] of [[0,0.33,5,0.3],[0.33,0.62,9,0.1],[0.62,0.86,13,0.5],[0.86,1,17,0.2]]) for(let i=0;i<n;i++){ const a=(i+off)/n*Math.PI*2+_rfH(i,n)*0.2;
      g.beginPath(); g.moveTo(cx+Math.cos(a)*R*rr0,cy+Math.sin(a)*R*rr0); g.lineTo(cx+Math.cos(a)*R*rr1,cy+Math.sin(a)*R*rr1); g.stroke(); }
    for(let i=0;i<60;i++){ const a=_rfH(i,31)*6.28, r=R*Math.sqrt(_rfH(i,32)), s=(1+3*_rfH(i,33))*u; g.fillStyle=_rfH(i,34)<0.5?'rgba(20,20,24,0.18)':'rgba(255,255,255,0.08)'; g.fillRect(cx+Math.cos(a)*r,cy+Math.sin(a)*r,s,s); }   // lốm đốm đá
    gr=g.createRadialGradient(cx,cy,R*0.55,cx,cy,R); gr.addColorStop(0,'rgba(0,0,0,0)'); gr.addColorStop(1,'rgba(0,0,0,0.28)'); g.fillStyle=gr; g.fillRect(cx-R,cy-R,R*2,R*2);   // tối dần ra mép
    g.restore();
    g.strokeStyle='rgba(205,205,212,0.55)'; g.lineWidth=1.6*u; g.beginPath(); g.arc(cx,cy,R-1*u,Math.PI*1.05,Math.PI*1.9); g.stroke();   // vệt sáng mép trên-trái
    g.strokeStyle='#1d1e22'; g.lineWidth=2*u; g.beginPath(); g.arc(cx,cy,R,0,Math.PI*2); g.stroke();
    _rfFloorC={c,M,Hd,W};
  }
  const F=_rfFloorC; ctx.drawImage(F.c,-F.M,-F.M,W+F.M*2,H+F.M+F.Hd);
}
// Friend (phase 1 bám góc / chuyển phase / phase 2 giữa sân) — vẽ SAU sàn, TRƯỚC meme
function _rfDrawBoss(){
  if(!rf) return; const B=rf.boss, u=_rfU(), A=_rfArena(); if(!B) return;
  const ph=rf.phase, t=rf.t;
  let im=RF_IMG.idle, sz;
  if(ph===1 || (ph===1.5 && rf.phT<RF.ROAR_T)) sz=W*0.58;
  else if(ph===1.5){ const k=Math.min(1,(rf.phT-RF.ROAR_T)/RF.MOVE_T); sz=W*(0.58-0.08*k); }
  else sz=W*0.5;
  if(ph===1.5 && rf.phT<RF.ROAR_T) im=_rfImgOk(RF_IMG.mouth)?RF_IMG.mouth:RF_IMG.m2;
  if(ph===2 && rf.suck) im=_rfImgOk(RF_IMG.mouth)?RF_IMG.mouth:RF_IMG.m2;
  if(ph===2 && rf.eaten.length){ const c1=_rfImgOk(RF_IMG.chew1)?RF_IMG.chew1:RF_IMG.m1, c2=_rfImgOk(RF_IMG.chew2)?RF_IMG.chew2:RF_IMG.m3; im=((t>>3)&1)?c1:c2; }
  if(B.dead){ const k=Math.min(1,(rf.deadT=(rf.deadT||0)+1)/60); if(k>=1) return; ctx.save(); ctx.globalAlpha=1-k; }
  // phase 2: 10 cánh tay sau lưng đâm thẳng lên trời (vẽ TRƯỚC thân → thân che gốc tay)
  if(ph===2 || (ph===1.5 && rf.phT>=RF.ROAR_T+RF.MOVE_T)){ const grow=ph===2?1:Math.min(1,(rf.phT-RF.ROAR_T-RF.MOVE_T)/RF.ARMS_T);
    for(let i=0;i<10;i++){ const zoneArm=rf.zones.find(z=>z.arm===i && z.t>=RF.Z_WARN); if(zoneArm) continue;   // tay đang nện xuống thì vẽ ở chỗ vùng
      const sp=(i-4.5)/4.5, rx=B.x+sp*sz*0.32, ry=B.y-sz*0.05, L=(A.R*0.95+_rfH(i,41)*A.R*0.35)*grow, sw=Math.sin(t*0.035+i*1.3)*0.18;
      const a=-Math.PI/2+sp*0.55+sw*0.5, hx=rx+Math.cos(a)*L, hy=ry+Math.sin(a)*L;
      _rfArm(rx,ry,hx,hy,a,'closing',0.26*u,i*2.3+1,-1+2*(i%2)); } }
  if(_rfImgOk(im)){ const asp=im.naturalWidth/im.naturalHeight, dw=sz, dh=sz/asp;
    let ox=0, oy=0, rot=0;
    if(ph===1 || (ph===1.5 && rf.phT<RF.ROAR_T)){ rot=-0.32; oy=Math.sin(t*0.03)*3*u; if(ph===1.5){ ox=(_rfH(t,1)-0.5)*7*u; oy+=(_rfH(t,2)-0.5)*7*u; } }   // gầm: rung bần bật
    else oy=Math.sin(t*0.04)*4*u;
    if(ph===2 && B.flash>0 && B.flash%4<2) ctx.filter='brightness(2.4)';
    ctx.save(); const smooth=ctx.imageSmoothingEnabled; ctx.imageSmoothingEnabled=false;   // Friend pixel-art: giữ nét điểm ảnh
    ctx.translate(B.x+ox,B.y+oy); ctx.rotate(rot); ctx.drawImage(im,-dw/2,-dh*0.55,dw,dh); ctx.imageSmoothingEnabled=smooth; ctx.restore(); ctx.filter='none'; }
  // há mồm hút: vệt khí xoáy dồn vào miệng
  if(ph===2 && rf.suck && rf.suck.t<=RF.SUCK_T){ const mx=B.x, my=B.y+B.size*0.1, k=rf.suck.t/RF.SUCK_T; ctx.save(); ctx.globalCompositeOperation='lighter';
    for(let i=0;i<26;i++){ const a=_rfH(i,51)*6.28+t*0.02, p=((t*0.03+_rfH(i,52))%1), r0=A.R*1.1*(1-p), r1=r0*0.82;
      ctx.strokeStyle=`rgba(170,90,255,${0.35*(1-p)*Math.min(1,k*3)})`; ctx.lineWidth=2*u; ctx.beginPath(); ctx.moveTo(mx+Math.cos(a)*r0,my+Math.sin(a)*r0); ctx.lineTo(mx+Math.cos(a+0.25)*r1,my+Math.sin(a+0.25)*r1); ctx.stroke(); }
    const gr=ctx.createRadialGradient(mx,my,0,mx,my,B.size*1.3); gr.addColorStop(0,`rgba(120,40,200,${0.35*k})`); gr.addColorStop(1,'rgba(60,0,90,0)'); ctx.fillStyle=gr; ctx.beginPath(); ctx.arc(mx,my,B.size*1.3,0,Math.PI*2); ctx.fill(); ctx.restore(); }
  if(B.dead) ctx.restore();
}
// cánh tay bóng tối + bàn tay: dùng ĐÚNG nét vẽ tay của Scared Hamster (_hmArmSprite + ảnh HAND_*) → cổ tay khớp bề ngang ảnh, gốc tay chìm khói
function _rfArm(rx,ry,hx,hy,ang,pose,k,seed,mir,alpha){
  const m=HM_HAND_META[pose], img=HM_HAND_IMG[pose]; if(!m) return;
  const off=(m.fo??m.w*0.35)*k, W0={x:hx-Math.cos(ang)*off, y:hy-Math.sin(ang)*off, a:ang};
  const mid={x:(rx+W0.x)/2+Math.cos(ang+Math.PI/2)*20*_rfU()*Math.sin(seed), y:(ry+W0.y)/2+Math.sin(ang+Math.PI/2)*20*_rfU()*Math.sin(seed)};
  const h={ax:rx, ay:ry, trail:[{x:rx,y:ry}, mid], cph:(tick||0)*0.05+seed};
  _hmArmSprite(h,W0,m.ww*k*0.97,alpha??1,seed);
  _hmBlit(img,m,W0.x,W0.y,W0.a,k,alpha??1,mir);
}
// gốc cánh tay phase 1 = thân Friend ở góc
function _rfShoulder(h){ const P=_rfPerch(), u=_rfU(); return h.side ? {x:P.x-10*u, y:P.y+60*u} : {x:P.x-80*u, y:P.y+10*u}; }
// DƯỚI meme: bóng tay trên sàn + vòng cảnh báo + tay đang nằm (bị đánh được)
function _rfDrawUnder(){
  if(!rf) return; const u=_rfU();
  for(const h of rfHands){ if(h.dead) continue;
    if(h.st==='charge' || h.st==='slam'){ const k=h.st==='slam'?1:1-h.t/RF.CHARGE_T, lock=h.st==='slam'||h.t<=RF.LOCK_T, R=_rfFistR();
      ctx.save(); ctx.globalAlpha=0.25+0.35*k; ctx.fillStyle=lock?'#ff2a2a':'#ff6a3a'; ctx.beginPath(); ctx.arc(h.tx,h.ty,R*k,0,Math.PI*2); ctx.fill();
      ctx.globalAlpha=0.9; ctx.lineWidth=2.2*u; ctx.strokeStyle=lock?'#ff3b3b':'#ffb36a'; ctx.setLineDash(lock?[]:[6*u,4*u]); ctx.beginPath(); ctx.arc(h.tx,h.ty,R,0,Math.PI*2); ctx.stroke(); ctx.restore(); }
    // bóng bàn tay trên sàn (thu nhỏ khi tay hạ thấp)
    if(h.st!=='down'){ const s=Math.max(0.35,1-h.z/(160*u)); ctx.save(); ctx.globalAlpha=0.35; ctx.fillStyle='#000'; ctx.beginPath(); ctx.ellipse(h.x,h.y,_rfFistR()*1.2*s,_rfFistR()*0.55*s,0,0,Math.PI*2); ctx.fill(); ctx.restore(); }
    if(h.st==='down') _rfDrawHand(h);
  }
  for(const z of rf.zones){ const k=Math.min(1,z.t/RF.Z_WARN), lock=z.t>=RF.Z_WARN;
    ctx.save(); ctx.globalAlpha=0.2+0.35*k; ctx.fillStyle='#b01818'; ctx.beginPath(); ctx.arc(z.x,z.y,z.r*k,0,Math.PI*2); ctx.fill();
    ctx.globalAlpha=0.9; ctx.lineWidth=2*u; ctx.strokeStyle=lock?'#ff3030':'#ff8a5a'; ctx.beginPath(); ctx.arc(z.x,z.y,z.r,0,Math.PI*2); ctx.stroke(); ctx.restore(); }
}
function _rfDrawHand(h){
  const u=_rfU(), S=_rfShoulder(h), k=0.4*u*(1+h.z/(220*u));
  const pose=h.st==='down'?'slap':(h.st==='charge'||h.st==='slam'?'fist':'closing');
  const hx=h.x, hy=h.y-h.z*0.55, ang=Math.atan2(hy-S.y,hx-S.x);
  if(h.st==='down'){   // đang nằm: viền tím nhấp nháy = ĐÁNH ĐƯỢC
    ctx.save(); ctx.globalAlpha=0.35+0.25*Math.sin((tick||0)*0.2); const gr=ctx.createRadialGradient(hx,hy,0,hx,hy,60*u); gr.addColorStop(0,'rgba(190,90,255,0.6)'); gr.addColorStop(1,'rgba(120,40,200,0)');
    ctx.fillStyle=gr; ctx.beginPath(); ctx.arc(hx,hy,60*u,0,Math.PI*2); ctx.fill(); ctx.restore(); }
  if(h.flash>0 && h.flash%4<2) ctx.filter='brightness(2.6)';
  _rfArm(S.x,S.y,hx,hy,ang,pose,k,h.seed,h.side?1:-1);
  ctx.filter='none';
}
// TRÊN meme: tay đang bay / tích lực / nện + tay phase 2 từ trời nện xuống + hiệu ứng nổ
function _rfDrawOver(){
  if(!rf) return; const u=_rfU(), B=rf.boss;
  for(const h of rfHands) if(!h.dead && h.st!=='down') _rfDrawHand(h);
  for(const z of rf.zones){ if(z.t<RF.Z_WARN-20 || z.t>RF.Z_WARN+RF.Z_FALL+18) continue;
    const k=Math.min(1,Math.max(0,(z.t-(RF.Z_WARN-20))/(20+RF.Z_FALL))), hy=z.y-(1-k*k)*H*0.8, rx=B.x+((z.arm-4.5)/4.5)*W*0.12, ry=B.y-W*0.02;
    _rfArm(rx,ry,z.x,hy,Math.atan2(hy-ry,z.x-rx),'fist',0.34*u,z.arm*2.3+1,1); }
  ctx.save(); ctx.globalCompositeOperation='lighter';
  for(const q of rfFx){ const p=q.t/q.T;
    if(q.k==='slam'){ ctx.globalAlpha=(1-p)*0.9; ctx.strokeStyle='#ffb070'; ctx.lineWidth=(q.big?5:3)*u*(1-p); ctx.beginPath(); ctx.arc(q.x,q.y,q.r*(0.6+p*1.6),0,Math.PI*2); ctx.stroke();
      ctx.globalAlpha=(1-p)*0.5; ctx.fillStyle='#ff6a2a'; ctx.beginPath(); ctx.arc(q.x,q.y,q.r*(0.8-0.5*p),0,Math.PI*2); ctx.fill(); }
    else if(q.k==='handdie'){ ctx.globalCompositeOperation='source-over'; ctx.globalAlpha=(1-p)*0.8;
      for(let i=0;i<12;i++){ const a=_rfH(i,61)*6.28, r=(20+70*p)*u*(0.5+_rfH(i,62)); const gr=ctx.createRadialGradient(q.x+Math.cos(a)*r,q.y+Math.sin(a)*r,0,q.x+Math.cos(a)*r,q.y+Math.sin(a)*r,22*u);
        gr.addColorStop(0,'rgba(10,0,16,0.8)'); gr.addColorStop(1,'rgba(10,0,16,0)'); ctx.fillStyle=gr; ctx.beginPath(); ctx.arc(q.x+Math.cos(a)*r,q.y+Math.sin(a)*r,22*u,0,Math.PI*2); ctx.fill(); }
      ctx.globalCompositeOperation='lighter'; }
  }
  ctx.restore();
  if(rf.flash>0){ ctx.save(); ctx.globalAlpha=rf.flash/30*0.5; ctx.fillStyle='#ff1a1a'; ctx.fillRect(-W,-H,W*3,H*3); ctx.restore(); }   // chớp đỏ lúc gầm / chuyển phase
}

// ───────── HUD kiểu rogue-lite / Deltarune ─────────
const RF_PARTY_COL=['#3fa9ff','#c85cff','#3fe08a','#ffcf3a'];
let _rfHudLag={};   // thanh máu "trễ" (vệt trắng tụt dần) kiểu rogue-lite
function _rfLag(key,pct){ const v=_rfHudLag[key]; if(v===undefined || pct>v) _rfHudLag[key]=pct; else _rfHudLag[key]=Math.max(pct,v-0.006); return _rfHudLag[key]; }
function _rfBox(x,y,w,h,col){ ctx.fillStyle='rgba(0,0,0,0.86)'; ctx.fillRect(x,y,w,h); ctx.lineWidth=Math.max(2,W*0.006); ctx.strokeStyle='#fff'; ctx.strokeRect(x,y,w,h);
  if(col){ ctx.fillStyle=col; ctx.fillRect(x,y,w,Math.max(3,W*0.008)); } }
function _rfBar(x,y,w,h,pct,lag,col,bg){ ctx.fillStyle=bg||'#3a0a0a'; ctx.fillRect(x,y,w,h); ctx.fillStyle='#ffffff'; ctx.fillRect(x,y,w*lag,h); ctx.fillStyle=col; ctx.fillRect(x,y,w*pct,h); }
function _rfText(t,x,y,sz,col,al){ ctx.font=`bold ${Math.round(sz)}px "Press Start 2P",monospace`; ctx.textAlign=al||'left'; ctx.textBaseline='middle';
  ctx.lineWidth=Math.max(2,sz*0.3); ctx.strokeStyle='#000'; ctx.strokeText(t,x,y); ctx.fillStyle=col; ctx.fillText(t,x,y); }
// vẽ trong toạ độ WORLD (gọi từ _camDrawWorldUI) — vùng trên sàn (y<0) cho boss, dưới sàn (y>H) cho đồng đội
function _rfHud(){
  const u=_rfU(), w=W*0.94, x0=(W-w)/2;
  ctx.save();
  // ── thanh BOSS
  const y0=-W*0.43, bh=W*0.13; _rfBox(x0,y0,w,bh,'#a020ff');
  const ph=rf?rf.phase:1, B=rf&&rf.boss;
  _rfText('FRIEND',x0+W*0.025,y0+bh*0.32,W*0.036,'#ff4a6a');
  _rfText(ph<2?'PHASE 1 · IMMORTAL':(B&&B.dead?'DEFEATED':'PHASE 2 · TRUE FORM'),x0+w-W*0.025,y0+bh*0.32,W*0.022,ph<2?'#ffcf5a':'#ff6a6a','right');
  if(ph<2){ const hw=(w-W*0.075)/2;
    for(const s of [0,1]){ const hd=rfHands.find(h=>h.side===s), pct=hd?Math.max(0,hd.hp/hd.maxHp):1, bx=x0+W*0.025+s*(hw+W*0.025), by=y0+bh*0.62;
      _rfText(s?'RIGHT HAND':'LEFT HAND',bx,by-W*0.012,W*0.016,hd&&hd.st==='down'?'#e0a0ff':'#bbbbbb');
      _rfBar(bx,by+W*0.008,hw,W*0.022,pct,_rfLag('h'+s,pct),hd&&hd.dead?'#555':'#b04aff');
      _rfText(`${Math.max(0,Math.ceil(hd?hd.hp:RF.HAND_HP))}/${RF.HAND_HP}`,bx+hw,by-W*0.012,W*0.014,'#ffffff','right'); } }
  else { const pct=B?Math.max(0,B.hp/B.maxHp):1, bx=x0+W*0.025, bw=w-W*0.05, by=y0+bh*0.6;
    _rfBar(bx,by,bw,W*0.032,pct,_rfLag('boss',pct),'#d0203a');
    _rfText(`${Math.max(0,Math.ceil(B?B.hp:RF.P2_HP))} / ${RF.P2_HP}`,bx+bw/2,by+W*0.016,W*0.017,'#ffffff','center'); }
  // ── 4 ô đồng đội (kiểu bảng party Deltarune)
  const py=H+W*0.075, pw=(w-W*0.03)/4, phh=W*0.18;
  for(let i=0;i<4;i++){ const f=fighters.find(q=>q.slotIdx===i && q.team===0), ch=getSlotChar(i)||{}, px=x0+i*(pw+W*0.01), col=RF_PARTY_COL[i];
    const dead=!!(f&&f.dead), eaten=!!(f&&f._rfEaten);
    _rfBox(px,py,pw,phh,dead?'#555':col);
    const av=avatarImgs[i], as=pw*0.42;
    if(av && av.complete && av.naturalWidth){ const cr=av._crop, sx=cr?cr.sx:0, sy=cr?cr.sy:0, sw=cr?cr.sw:av.naturalWidth, sh=cr?cr.sh:av.naturalHeight, a=sw/sh;
      const dw=a>=1?as:as*a, dh=a>=1?as/a:as; ctx.save(); if(dead) ctx.globalAlpha=0.35; ctx.drawImage(av,sx,sy,sw,sh,px+pw*0.06+(as-dw)/2,py+W*0.022+(as-dh)/2,dw,dh); ctx.restore(); }
    const nm=_nameParts(ch.name||'').main.toUpperCase(); let ns=W*0.017; ctx.font=`bold ${Math.round(ns)}px "Press Start 2P",monospace`; while(ns>5 && ctx.measureText(nm).width>pw*0.88){ ns-=0.5; ctx.font=`bold ${Math.round(ns)}px "Press Start 2P",monospace`; }
    _rfText(nm,px+pw/2,py+phh*0.64,ns,dead?'#777':col,'center');
    const pct=f?Math.max(0,f.hp/f.maxHp):1, bx=px+pw*0.08, bw2=pw*0.84, by=py+phh*0.78;
    _rfBar(bx,by,bw2,W*0.018,pct,_rfLag('p'+i,pct),dead?'#555':col,'#2a0808');
    _rfText(dead?'DOWN':(eaten?'EATEN!':`HP ${Math.max(0,Math.ceil(f?f.hp:RF.MEME_HP))}`),px+pw*0.94,py+W*0.035,W*0.013,dead?'#ff4a4a':(eaten?'#ff6af0':'#ffffff'),'right');
  }
  if(koWinner){ for(const [k,tx] of [[0,'❤️ Like and Subscribe'],[1,'to support your meme-bros']]){ ctx.font=`900 ${Math.round(W*0.036)}px "Montserrat",Arial,sans-serif`; ctx.textAlign='center'; ctx.lineWidth=W*0.01; ctx.strokeStyle='#000';
    const yy=H+W*0.31+k*W*0.055; ctx.strokeText(tx,W/2,yy); ctx.fillStyle='#fff'; ctx.fillText(tx,W/2,yy); } }   // 📢 CTA chỉ khi hết trận có người thắng
  ctx.restore();
}
