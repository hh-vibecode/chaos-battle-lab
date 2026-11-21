// 🧪 Anime Lab · MẪU VỤ NỔ + IMPACT 5s (18/11/2026, anh: "làm mẫu vụ nổ impact 5s t xem thử") — dựng bằng js/vfx-boom.js (skill hoat-hoa-vfx)
//   0–0.75 Gojo + Pain hoá 2 vệt lao vào nhau · 0.75 CHẠM → tràng impact 10 khung (đen/trắng, vạch toả, sao 4 cánh) · 1.1 CẮT toàn cảnh chân trời, LẶNG giữ ·
//   (19/11 anh: "phải tích tụ trước => nổ => sóng âm đi trước => sàn bật lên lần lượt từ tâm lan tới hết màn theo sau ngay sóng âm => nổ to")
//   1.2 TÍCH TỤ (lõi sáng lớn dần, tia + bụi bị hút vào) · 2.0 LẶNG · 2.2 NỔ = chớp · sóng âm lan ra trước, SÀN BẬT LÊN từng ô ngay sau sóng tới hết màn · 2.55 NỔ TO (mô phỏng Blender)
//   (cũ) 1.4 NỔ (mô phỏng thật Blender, tools/blender/boom_sim.py): chớp tức thì → cầu lửa phồng nhanh rồi chậm lại → lửa nguội trắng→vàng→cam→khói → khí nóng bốc lên → sóng chấn r∝t^0.4 tới máy thì rung
(function(){
  if(!window.CineKit || CineKit.films.vfxboom) return;
  const BASE=((document.currentScript&&document.currentScript.src)||'js/film-vfxboom.js').replace(/film-[^\/]*$/,''), V=window.GAME_VERSION?'?v='+GAME_VERSION.build:'';
  for(const [gl,f] of [['PIXI_FILTERS_GLSL','vendor/pixi-filters/glsl.js'],['Fin1City','fin1-city.js'],['Fin1Fight','fin1-fight.js'],['VfxBoom','vfx-boom.js']]) if(!window[gl]){ try{ const x=new XMLHttpRequest(); x.open('GET',BASE+f+V,false); x.send(); (0,eval)(x.responseText); }catch(e){} }
  const JX=p=>{ try{ const x=new XMLHttpRequest(); x.open('GET',BASE+p+V,false); x.send(); return JSON.parse(x.responseText); }catch(e){ return null; } };
  const SIMJ=(JX('../assets/img/cine/VFX_BOOM_SIM_FIRE.json')||{frames:45,cols:6,px:768,ph:549,fps:15,ground:[0.5,1.0]});
  const K=CineKit, {seg,lerp,clamp,hash}=K, EA=K.EASE, eout=EA.eout, ein=EA.ein, W=window.Fin1Fight, B=window.VfxBoom, VW=960, VH=540, H=120;
  const T={ dash:0.35, hit:0.75, wide:1.1, charge:1.2, hush:2.0, boom:2.2, big:2.2+10/30, DUR:7.0 };   // big = cầu lửa bùng sau sóng 10 khung (đúng --fire-delay 10 trong mô phỏng)
  const T0={ boom:2.2 };
  const CITY=Fin1City({seed:3, x0:-14000, x1:14000, rows:1, near:13000, collapse:[{x:0,z:3200,t:T0.boom+0.2,r:40000,v:5200}]});   // nhà đổ ĐÚNG LÚC sóng chấn tới (tốc độ TB mặt sóng ~5200 đv/s), toà gần đổ trước
  const IMG={ ...window.FIN1_CITY_IMGS, GOJO:'assets/img/mewingcat/MEW_GOJO_IMG.webp', PAIN:'assets/img/depressedcat/DP_PAIN_IMG.webp', SIM:'assets/img/cine/VFX_BOOM_SIM_FIRE.png' };
  const BOOM={t0:T.boom, x:0, z:3200};
  // vụ nổ MÔ PHỎNG THẬT (Blender Mantaflow → tô cel, tools/blender/boom_sim.py): cầu lửa phồng nhanh → nguội → khí nóng bốc thành nấm → khói tan
  const SIM={t0:T.boom, key:'SIM', meta:SIMJ, x:BOOM.x, z:BOOM.z, size:8400, hold:true}   // sheet đã 'vẽ trên 2' (15 hình/giây), ô 768px;   // 28 m mô phỏng = 8400 đv (300 đv/m; meme ~120)
  // chấn động mặt đất (code, vật lý): sóng chấn r=K·u^0.4, nứt đất theo mép sóng, hố cháy, đá văng parabol nảy 1 lần rồi nằm yên
  const GS={t0:T.boom, x:BOOM.x, z:BOOM.z, K:7700, crack:4200, crater:900, rocks:0, plates:0, seed:7, dust:200};   // vòng sóng âm + nứt + hố (code, CÙNG K với mô phỏng) · sàn + mảnh = Blender
  // SÀN BẬT THEO SÓNG — mô phỏng CHUNG môi trường vật lý với vụ nổ (Blender: sóng chấn r = 25.67 m·t^0.4 = 7700 đv·t^0.4 đội đất hất từng ô sàn, ô bay / va / rơi / nảy / nằm lại)
  const TILES={t0:T.boom, data:JX('../assets/img/cine/VFX_BOOM_SIM_TILES.json'), x:BOOM.x, z:BOOM.z, unit:300};
  const T_CAM=T.boom+B.shockAt(GS,5600);   // máy toàn cảnh cách tâm ~5600 đv → sóng chấn tới máy lúc này (rung + tiếng ầm)
  const FADE={};
  function faded(F,key){ if(FADE[key]) return FADE[key]; const im=F.I[key]; if(!im||!im.complete||!im.naturalWidth) return null; const c=document.createElement('canvas'); c.width=im.naturalWidth; c.height=im.naturalHeight; const x=c.getContext('2d'); x.drawImage(im,0,0);
    x.globalCompositeOperation='destination-out'; const gr=x.createLinearGradient(0,c.height*0.62,0,c.height); gr.addColorStop(0,'rgba(0,0,0,0)'); gr.addColorStop(1,'rgba(0,0,0,1)'); x.fillStyle=gr; x.fillRect(0,0,c.width,c.height); c.complete=true; c.naturalWidth=c.width; c.naturalHeight=c.height; F.I[key+'_F']=c; return FADE[key]=c; }
  const leader=(F,key,x,t,aura)=>{ if(!faded(F,key)) return; W.actor(F,{key:key+'_F',dir:0,x,z:0,y:H*0.5+Math.sin(t*2+(x>0?1:0))*6,h:H*1.3,shadow:false,aura}); };
  const S=(t0,t1,a)=>({t0,t1,a,ease:'lin'});
  const shots=[S(0,T.wide,{tx:0,ty:130,tz:0,dist:900,yaw:0,pitch:-2,fov:50}),          // trung ngang: 2 con lao vào nhau → chạm
               {...S(T.wide,T.DUR,{tx:0,ty:260,tz:1800,dist:4200,yaw:0,pitch:2,fov:56}), b:{tx:0,ty:330,tz:1800,dist:3900,yaw:0,pitch:3,fov:56}}]   // máy đẩy vào RẤT chậm (không đứng hình); // toàn cảnh chân trời: vụ nổ lan từ tâm
  function world(F,t){ F.t=t; CITY.draw(F,t,CITY.TH_NIGHT);
    if(t<T.wide){ const k=ein(seg(t,T.dash,T.hit)), gx=lerp(-520,-70,k), px=lerp(520,70,k);
      if(t<T.dash||t>=T.hit){ leader(F,'GOJO',t<T.hit?-520:-70,t,{preset:'ki',k:0.8,seed:3}); leader(F,'PAIN',t<T.hit?520:70,t,{preset:'cursed',k:0.8,seed:9}); }
      else { W.dash(F,t,T.dash,T.hit,[-520,H,0],[-70,H,0],{w:34,col:'130,200,255',core:'255,255,255'}); W.dash(F,t,T.dash,T.hit,[520,H,0],[70,H,0],{w:34,col:'190,120,255',core:'255,255,255'}); } }   // pha lao = 2 VỆT (không vẽ người)
    else { B.charge(F,t,{t0:T.charge,t1:T.boom,x:BOOM.x,y:160,z:BOOM.z,R:420}); B.groundShock(F,t,GS); B.simTiles(F,t,TILES); B.simSprite(F,t,SIM); } }
  const STROBE=[[T.hit,'bw wb bw k w wb bw w c w',0.5,0.45]];
  CineKit.film({ id:'vfxboom', title:'Anime Lab · Mẫu vụ nổ + impact', DUR:T.DUR, VW, VH, fadeIn:false, fadeOut:false, imgs:IMG, theme:t=>CITY.TH_NIGHT, shots, world,
    // 🔊 không nhạc · mỗi tiếng ĐÚNG lúc hình, hết hình thì NGẮT (tham số giây thứ 4)
    sfx:[[T.dash,'se_machdash',0.8,T.hit-T.dash,'2 con hoá 2 vệt lao vào nhau'],[T.hit,'se_impact_stop',1,0.5,'CHẠM: tràng impact frame'],[T.hit+0.01,'ed_hit5',0.6,0.35,'+ lớp edit: impact bùng (lớp của cú chạm)'],
      [T.charge,'ep3_charge',0.7,T.hush-T.charge,'TÍCH TỤ: lõi sáng lớn dần, năng lượng bị hút vào tâm'],[T.charge+0.3,'l2p_riser',0.45,T.hush-T.charge-0.3,'+ dâng lên (lớp của tích tụ)'],
      [T.boom,'ep3_explode',1,0.7,'NỔ: chớp trắng, sóng âm bung ra'],[T_CAM-0.12,'se_rock_break',0.7,0.6,'sàn bật lên từng ô ngay sau sóng, tới sát máy'],[T_CAM,'se_tremor',0.6,1.4,'+ sóng tới máy: rung đất (lớp của sàn bật)'],
      [T.big,'l2p_explode',1,2.6,'NỔ TO: cầu lửa bùng lên'],[T.big+0.02,'kn_boom_low',0.8,2.0,'+ lớp trầm của nổ to']],
    impact:t=>B.impactOf(B.strobe(t,STROBE),true),
    grade:t=>{ const s=B.strobe(t,STROBE); return B.gradeOf(s)||(t>=T.wide&&t<T.boom?{sat:0.75-0.25*seg(t,T.charge,T.boom),bright:0.92-0.2*seg(t,T.charge,T.boom)}:null); },   // tích tụ: trời tối dần, nhạt màu (lõi sáng nổi bật)
    shake:t=>{ let s=0; const h=(a,amp,d)=>{ if(t>=a&&t<a+d) s=Math.max(s,amp*(1-(t-a)/d)); }; h(T.hit,14,0.35); if(t>=T.charge&&t<T.hush) s=Math.max(s,0.5+3*seg(t,T.charge,T.hush)); h(T_CAM,24,0.5); h(T_CAM+0.1,12,1.4); h(T.big,10,0.8); if(t>=T_CAM+0.5) s=Math.max(s,3*(1-seg(t,T_CAM+0.5,T.DUR))); return s; },   // tích tụ run dần → LẶNG (không rung) → sóng tới máy rung mạnh → nổ to   // rung khi SÓNG CHẤN tới máy (sau chớp), không phải lúc chớp
    post(F,t){ const fx={shocks:[]}, u=t-T.boom; if(u>=0&&u<0.7) fx.shocks.push({x:BOOM.x,y:120,z:BOOM.z,r:200+GS.K*Math.pow(u,0.4),w:160,str:44*(1-u/0.7)}); const v=t-T.big; if(v>=0&&v<0.5) fx.shocks.push({x:BOOM.x,y:300,z:BOOM.z,r:300+3000*eout(v/0.5),w:200,str:22*(1-v/0.5)}); return fx; },   // sóng bóp méo đi CÙNG mặt sóng chấn r=K·u^0.4 (nhanh rồi chậm)
    screen(F,t){ const g=F.g; B.impactOverlay(F,B.strobe(t,STROBE));
      const fl=t>=T.big?0.55*(1-seg(t,T.big,T.big+0.18)):t>=T.boom?1-seg(t,T.boom,T.boom+0.16):0;   // chớp nổ (trắng) · chớp nhẹ lúc nổ to if(fl>0){ g.save(); g.fillStyle='rgba(255,250,235,'+(fl*fl)+')'; g.fillRect(0,0,VW,VH); g.restore(); }   // CHỚP: tức thì, tắt nhanh
      if(!B.strobe(t,STROBE)){ K.letterbox(F,0.5); K.vignette(F,0.5); } } });
})();
