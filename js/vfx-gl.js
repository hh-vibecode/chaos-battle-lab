// ===================== ✨ VFX-GL — hiệu ứng SINH BẰNG SHADER (WebGL), không dùng ảnh VFX vẽ sẵn =====================
// Dùng chung cho phim (cine-kit) và game. 1 canvas WebGL ẩn dùng chung: vẽ hiệu ứng vào đó rồi drawImage ngay lên canvas 2D.
//
// VfxGL.aura(img2d, opts) → canvas: hào quang LỬA bám theo dáng nhân vật. Lửa = nhiễu fbm bị bóp méo (domain warp) cuộn lên liên tục,
//   lấy hình từ bóng nhân vật làm mờ → lưỡi lửa mọc ra từ viền người, không lặp, không cứng. Tham số → vô số biến thể:
//   preset ('ssj' vàng Super Saiyan · 'ki' trắng xanh · 'haki' đen viền đỏ · 'cursed' tím đen · 'fire' lửa cam · 'holy' trắng vàng · 'toxic' xanh lá)
//   hoặc tự chỉnh: c0 (lõi) c1 (giữa) c2 (viền) · speed (tốc cuộn) · scale (độ mịn nhiễu) · warp (độ quằn) · rise (lửa vươn cao) · gain (độ đậm)
//   · dark (1 = lửa TỐI vẽ đè thường, 0 = lửa SÁNG cộng sáng) · tongues (độ dài lưỡi lửa).
// VfxGL.post(srcCanvas, fx) → canvas: hậu kỳ cả khung — fx.shocks:[{x,y,r,w,str}] sóng xung kích bóp méo không gian (toạ độ px của src),
//   fx.zoom:{x,y,k} zoom blur toả tâm, fx.chroma: tách màu RGB theo tâm, fx.heat: {k,t} không khí nóng gợn sóng toàn khung.
(function(){
  if(window.VfxGL) return;
  let gl=null, cv=null, ok=null; const progs={}; let quad=null; const texs={};
  function init(){ if(ok!==null) return ok;
    try{ cv=document.createElement('canvas'); cv.width=cv.height=4; gl=cv.getContext('webgl',{premultipliedAlpha:true,preserveDrawingBuffer:true,alpha:true}); }catch(e){ gl=null; }
    ok=!!gl; if(!ok) return false;
    quad=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,quad); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
    return true; }
  const VS='attribute vec2 p; varying vec2 uv; void main(){ uv=p*0.5+0.5; gl_Position=vec4(p,0.,1.); }';
  const NOISE=`
    float h21(vec2 p){ vec3 p3=fract(vec3(p.xyx)*.1031); p3+=dot(p3,p3.yzx+33.33); return fract((p3.x+p3.y)*p3.z); }   // hash12 (Dave Hoskins) — không vỡ ô trên GPU thật
    float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
      return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y); }
    float fbm(vec2 p){ float s=0., a=.5; for(int i=0;i<5;i++){ s+=a*vn(p); p=p*2.03+vec2(17.1,9.2); a*=.5; } return s; }`;
  function prog(name,fs){ if(progs[name]) return progs[name];
    const sh=(t,src)=>{ const s=gl.createShader(t); gl.shaderSource(s,src); gl.compileShader(s); if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)) throw new Error(name+': '+gl.getShaderInfoLog(s)); return s; };
    const p=gl.createProgram(); gl.attachShader(p,sh(gl.VERTEX_SHADER,VS)); gl.attachShader(p,sh(gl.FRAGMENT_SHADER,'precision highp float; varying vec2 uv;'+fs)); gl.linkProgram(p);
    const u={}; return progs[name]={p,u,loc:k=>u[k]!==undefined?u[k]:(u[k]=gl.getUniformLocation(p,k))}; }
  // mặt nạ: tải lên GPU 1 lần, lần sau chỉ gắn lại
  function bindMask(M){ gl.bindTexture(gl.TEXTURE_2D,M.tex); if(M.up) return; gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true); gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true); gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,M.c); M.up=true; }
  function tex(key,src){ let t=texs[key]; if(!t){ t=texs[key]=gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D,t);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE); }
    gl.bindTexture(gl.TEXTURE_2D,t); gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true); gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true);
    if(src) gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,src); return t; }
  function run(P,w,h){ if(cv.width!==w||cv.height!==h){ cv.width=w; cv.height=h; } gl.viewport(0,0,w,h); gl.useProgram(P.p);
    gl.bindBuffer(gl.ARRAY_BUFFER,quad); const a=gl.getAttribLocation(P.p,'p'); gl.enableVertexAttribArray(a); gl.vertexAttribPointer(a,2,gl.FLOAT,false,0,0);
    gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT); gl.drawArrays(gl.TRIANGLE_STRIP,0,4); return cv; }
  const hex=c=>{ if(Array.isArray(c)) return c.map(v=>v>1?v/255:v); const n=parseInt(c.replace('#',''),16); return [(n>>16&255)/255,(n>>8&255)/255,(n&255)/255]; };

  // ───────── 🔥 AURA ─────────
  const AURA_FS=NOISE+`
    uniform sampler2D mask; uniform float t,speed,scale,warp,rise,gain,dark,tongues,seed; uniform vec3 c0,c1,c2; uniform vec2 asp;
    void main(){ vec2 q=uv; vec2 P=vec2(q.x*asp.x,q.y*asp.y);
      // nhiễu thô (bóp méo ngang) → nhiễu chính kéo DỌC (tần số dọc thấp = lưỡi lửa dài), cuộn lên theo thời gian
      float n1=fbm(P*scale*.6+vec2(seed,-t*speed*.5));
      vec2 w=vec2(P.x*scale*1.4+(n1-.5)*warp*5., P.y*scale*.45/tongues-t*speed);
      float n=fbm(w+vec2(seed*1.3,0.))*.7+fbm(w*2.6+vec2(4.1,-t*speed*.9))*.3;
      n=smoothstep(.22,.78,n);                                            // tăng tương phản → có chỗ lửa vươn xa, có chỗ trống
      vec2 off=vec2((n1-.5)*warp*.12, -rise*(.03+1.15*n*n));             // lấy mẫu PHÍA DƯỚI → lửa vươn lên; nhiễu thấp gần như không nâng → chỉ viền mỏng quanh người, nhiễu cao mới thành lưỡi dài
      float d=texture2D(mask,q+off).a;                                    // "trường khoảng cách": 1 trong người, giảm dần ra ngoài
      float thr=.08+.62*(1.-n);                                           // ngưỡng theo nhiễu: nhiễu cao → ngưỡng thấp → lưỡi lửa với xa
      float fl=smoothstep(thr,thr+.2,d);
      float heat=clamp((d-thr)*1.5+.1,0.,1.)*fl;                         // càng sát người càng nóng (lõi sáng)
      float a=fl*gain*mix(1.,.62,smoothstep(.45,1.,heat)*(1.-dark));       // lửa sáng: viền đậm, lòng trong hơn (kiểu aura anime)
      vec3 col=mix(c2,c1,smoothstep(.08,.45,heat)); col=mix(col,c0,smoothstep(.6,1.,heat));
      gl_FragColor=vec4(col*a,a); }`;
  const PRE={ ssj:{c0:'#fffbe0',c1:'#ffd84a',c2:'#ff9a1a',speed:1.25,scale:3.2,warp:.35,rise:.22,gain:1,dark:0,tongues:1.6},
    ki:{c0:'#f4fbff',c1:'#7cc4ff',c2:'#2a6cff',speed:1.1,scale:3.0,warp:.3,rise:.14,gain:.95,dark:0,tongues:1.4},
    haki:{c0:'#3a0008',c1:'#12000a',c2:'#b3001b',speed:1.4,scale:3.4,warp:.42,rise:.15,gain:1,dark:1,tongues:1.8},
    cursed:{c0:'#e8c8ff',c1:'#7a2cff',c2:'#1a0030',speed:1.0,scale:3.6,warp:.5,rise:.15,gain:1,dark:1,tongues:1.5},
    fire:{c0:'#fff3c0',c1:'#ff8a1a',c2:'#c41a00',speed:1.6,scale:3.4,warp:.45,rise:.2,gain:1,dark:0,tongues:2.0},
    holy:{c0:'#ffffff',c1:'#fff1a8',c2:'#ffc94a',speed:.7,scale:2.4,warp:.2,rise:.12,gain:.85,dark:0,tongues:1.2},
    toxic:{c0:'#eaffc0',c1:'#6dff3a',c2:'#0f7a2a',speed:1.0,scale:3.6,warp:.55,rise:.13,gain:.95,dark:1,tongues:1.3} };
  // mặt nạ bóng người làm mờ (đệm rộng xung quanh để lửa có chỗ bốc) — cache theo ảnh + cỡ
  const MASKS=new Map();
  function maskOf(img,sx,sy,sw,sh,res){ const key=(img._vfxId||(img._vfxId=Math.random().toString(36).slice(2)))+'|'+sx+'|'+sy+'|'+res;
    let m=MASKS.get(key); if(m) return m; const PADX=.38, PADT=.62, PADB=.08;
    const k=res/Math.max(sw,sh), w=Math.round(sw*k*(1+2*PADX)), h=Math.round(sh*k*(1+PADT+PADB));
    const c=document.createElement('canvas'); c.width=w; c.height=h; const x=c.getContext('2d');
    x.filter=`blur(${Math.max(3,res*0.07)}px)`; x.drawImage(img,sx,sy,sw,sh,sw*k*PADX,sh*k*PADT,sw*k,sh*k); x.drawImage(img,sx,sy,sw,sh,sw*k*PADX,sh*k*PADT,sw*k,sh*k); x.filter='none';
    m={c,w,h,PADX,PADT,PADB}; if(MASKS.size>120){ const k0=MASKS.keys().next().value, m0=MASKS.get(k0); if(m0&&m0.tex&&gl) gl.deleteTexture(m0.tex); MASKS.delete(k0); } MASKS.set(key,m); return m; }
  // trả {canvas, dx,dy,dw,dh} theo khung nhân vật (x,y = điểm giữa CHÂN, w,h = cỡ vẽ ảnh) — dark: vẽ source-over, sáng: vẽ 'lighter'
  function aura(img,o){ if(!init()) return null; const P=Object.assign({},PRE[o.preset||'ssj']||PRE.ssj,o);
    const sx=o.sx||0, sy=o.sy||0, sw=o.sw||img.width, sh=o.sh||img.height, res=o.res||400, M=maskOf(img,sx,sy,sw,sh,res);
    const pr=prog('aura',AURA_FS); gl.useProgram(pr.p);
    gl.activeTexture(gl.TEXTURE0); if(!M.tex){ M.tex=gl.createTexture(); M.up=false; } bindMask(M);
    gl.uniform1i(pr.loc('mask'),0);
    gl.uniform1f(pr.loc('t'),o.t||0); for(const k of ['speed','scale','warp','rise','gain','dark','tongues']) gl.uniform1f(pr.loc(k),P[k]*(k==='gain'?(o.k==null?1:o.k):1));
    gl.uniform1f(pr.loc('seed'),o.seed||0); gl.uniform2f(pr.loc('asp'),M.w/Math.max(M.w,M.h),M.h/Math.max(M.w,M.h));
    gl.uniform3fv(pr.loc('c0'),hex(P.c0)); gl.uniform3fv(pr.loc('c1'),hex(P.c1)); gl.uniform3fv(pr.loc('c2'),hex(P.c2));
    run(pr,M.w,M.h);
    const W=o.w, H=o.h; return {canvas:cv, dx:o.x-W/2-W*M.PADX, dy:o.y-H-H*M.PADT, dw:W*(1+2*M.PADX), dh:H*(1+M.PADT+M.PADB), dark:P.dark>0.5}; }
  // vẽ thẳng lên ctx 2D (tiện dùng): flip = lật ngang theo hướng nhân vật
  function drawAura(ctx,img,o){ const r=aura(img,o); if(!r) return false; ctx.save(); ctx.globalCompositeOperation=r.dark?'source-over':'lighter';
    if(o.flip){ ctx.translate(o.x,0); ctx.scale(-1,1); ctx.translate(-o.x,0); } ctx.drawImage(r.canvas,r.dx,r.dy,r.dw,r.dh); ctx.restore(); return true; }

  // ───────── 🌊 HẬU KỲ CẢ KHUNG ─────────
  const POST_FS=NOISE+`
    uniform sampler2D src; uniform vec2 res; uniform vec4 sh[4]; uniform float shs[4]; uniform vec3 zm; uniform float chroma; uniform vec2 heat;
    void main(){ vec2 px=uv*res; vec2 d=vec2(0.);
      for(int i=0;i<4;i++){ vec4 s=sh[i]; if(s.z<=0.) continue; vec2 v=px-s.xy; float L=length(v)+1e-4; float k=(L-s.z)/s.w; float g=exp(-k*k)*shs[i];
        d+=v/L*g; }                                                            // vành sóng: đẩy điểm ảnh ra/vào theo bán kính
      if(heat.x>0.){ d+=vec2(fbm(px*.012+vec2(0.,heat.y*1.5))-.5, fbm(px*.012+vec2(9.,heat.y*1.2))-.5)*heat.x; }
      vec2 q=(px-d)/res;
      vec4 c;
      if(zm.z>0.){ vec2 zc=zm.xy/res; vec4 acc=vec4(0.); for(int i=0;i<14;i++){ float f=1.-zm.z*float(i)/14.; acc+=texture2D(src,zc+(q-zc)*f); } c=acc/14.; }
      else c=texture2D(src,q);
      if(chroma>0.){ vec2 dir=(q-.5)*chroma*.02; c.r=texture2D(src,q+dir).r; c.b=texture2D(src,q-dir).b; }
      gl_FragColor=c; }`;
  function post(src,fx){ if(!init()) return null; const w=src.width, h=src.height, pr=prog('post',POST_FS); gl.useProgram(pr.p);
    gl.activeTexture(gl.TEXTURE0); tex('post',src); gl.uniform1i(pr.loc('src'),0); gl.uniform2f(pr.loc('res'),w,h);
    const S=(fx.shocks||[]).slice(0,4), A=new Float32Array(16), B=new Float32Array(4);
    S.forEach((s,i)=>{ A.set([s.x,h-s.y,s.r,Math.max(1,s.w)],i*4); B[i]=s.str; });
    gl.uniform4fv(pr.loc('sh'),A); gl.uniform1fv(pr.loc('shs'),B);
    const z=fx.zoom; gl.uniform3f(pr.loc('zm'),z?z.x:0,z?h-z.y:0,z?z.k:0); gl.uniform1f(pr.loc('chroma'),fx.chroma||0);
    gl.uniform2f(pr.loc('heat'),fx.heat?fx.heat.k:0,fx.heat?fx.heat.t:0);
    return run(pr,w,h); }
  // ───────── 💧 MẶT NƯỚC (anh dặn 31/10: Drooling Cat "giống nước nhất có thể") ─────────
  // VfxGL.water(src, mask, o) → canvas cùng cỡ src. src = ảnh chụp mặt sàn NGAY DƯỚI vũng (px thiết bị), mask = hình vũng (trắng, mép làm MỜ → càng vào giữa càng "sâu").
  //   khúc xạ: mặt sàn nhìn xuyên qua bị gợn méo theo sóng (nhiễu fbm 2 lớp trôi ngược chiều) · hấp thụ: mép trong, giữa xanh sâu
  //   · vân sáng đáy hồ (caustics) chuyển động · lấp lánh phản chiếu theo pháp tuyến sóng · ánh trời ở mép (fresnel) · vạch sáng mép nước
  //   o: {t giây, k (px thiết bị / 1 đơn vị thế giới), deep:'#hex', shallow:'#hex', refr (độ méo, mặc định 1), alpha}
  const WATER_FS=NOISE+`
    uniform sampler2D src, msk; uniform vec2 res; uniform float t, k, refr, alpha; uniform vec3 deep, shallow;
    float hgt(vec2 p){ return fbm(p*.045+vec2(t*.22,t*.13))*.65+fbm(p*.09-vec2(t*.17,-t*.24))*.35; }
    float caus(vec2 p){ vec2 q=p*.07; float v=0.; for(int i=0;i<3;i++){ q+=vec2(sin(q.y*1.7+t*.9),cos(q.x*1.5-t*.7))*.45; v+=pow(1.-abs(sin(q.x)+sin(q.y))*.5,6.); q*=1.6; } return v/3.; }
    void main(){ vec2 px=uv*res; vec2 w=px/k;                                  // toạ độ thế giới → sóng cùng cỡ ở mọi độ phân giải
      float m=texture2D(msk,uv).a; if(m<.004){ gl_FragColor=vec4(0.); return; }
      float e=2.6, h=hgt(w), hx=hgt(w+vec2(e,0.))-h, hy=hgt(w+vec2(0.,e))-h; vec2 n=vec2(hx,hy)/e;   // pháp tuyến sóng (bước rộng → mịn, không lấm tấm)
      float d=smoothstep(.0,.9,m);                                              // độ sâu (mép nông, giữa sâu)
      vec2 off=n*refr*(6.+10.*d)*k/res; vec3 base=texture2D(src,uv-off).rgb;   // khúc xạ: lệch theo sóng, càng sâu càng méo
      vec3 col=mix(base*mix(vec3(1.),shallow,.45)*1.08, deep, .12+.42*d);       // nước hấp thụ: TRONG ở mép (thấy rõ sàn), xanh dần vào giữa
      col+=vec3(.75,.95,1.)*caus(w+n*30.)*.28*(1.-.45*d)*smoothstep(.05,.3,m);  // vân sáng đáy hồ
      vec3 N=normalize(vec3(-n*22.,1.)); float sp=pow(max(dot(N,normalize(vec3(-.35,.55,.76))),0.),60.);   // lấp lánh theo hướng sáng chéo trên-trái
      col+=vec3(1.)*sp*1.0;
      col+=vec3(.55,.75,.95)*(1.-uv.y)*.06;                                     // phía xa (trên) hắt ánh trời sáng hơn chút
      float fr=pow(1.-d,3.)*.22; col=mix(col,vec3(.72,.9,1.),fr);               // ánh trời phản chiếu ở mép
      float rim=smoothstep(.03,.055,m)*(1.-smoothstep(.055,.09,m)); col+=vec3(.85,.97,1.)*rim*.3;   // vạch MẢNH sáng ở mép nước (mặt khum)
      float a=smoothstep(.02,.06,m)*alpha; gl_FragColor=vec4(col*a,a); }`;
  function water(src,mask,o){ if(!init()) return null; o=o||{}; const w=src.width, h=src.height, pr=prog('water',WATER_FS); gl.useProgram(pr.p);
    gl.activeTexture(gl.TEXTURE0); tex('wsrc',src); gl.uniform1i(pr.loc('src'),0);
    gl.activeTexture(gl.TEXTURE1); tex('wmsk',mask); gl.uniform1i(pr.loc('msk'),1); gl.activeTexture(gl.TEXTURE0);
    gl.uniform2f(pr.loc('res'),w,h); gl.uniform1f(pr.loc('t'),o.t||0); gl.uniform1f(pr.loc('k'),o.k||1); gl.uniform1f(pr.loc('refr'),o.refr==null?1:o.refr); gl.uniform1f(pr.loc('alpha'),o.alpha==null?1:o.alpha);
    gl.uniform3fv(pr.loc('deep'),hex(o.deep||'#0d4f86')); gl.uniform3fv(pr.loc('shallow'),hex(o.shallow||'#7fd3f0'));
    return run(pr,w,h); }
  // ───────── ⚡ SÉT MANGA / ANIME (canvas 2D, không cần WebGL) ─────────
  // Dải sét GÃY GÓC gắt, ít khúc, thon nhọn 2 đầu (mẫu anh gửi: sét haki One Piece). Mặc định lõi ĐEN viền ĐỎ + quầng đỏ (haki);
  // đổi o.core / o.rim / o.glow cho sét khác (vd sét xanh: core '#e8f6ff', rim '#3aa0ff', glow 'rgba(80,170,255,0.3)').
  // bolt(ctx,x,y,góc,dài,dày,seed,o) → trả các khớp gãy · boltSet = 1 tia chính + 2–4 tia nhỏ bám vào khớp (o.branches=false để tắt)
  // seed đổi mỗi 3–4 khung → sét "giật" hình kiểu anime; cùng seed = cùng hình (tua lại y hệt)
  function boltShape(x0,y0,ang,len,wmax,seed,small){ const H=n=>{ const v=Math.sin(seed*91.7+n*12.9898)*43758.5453; return v-Math.floor(v); };
    const n=small?2:3, pts=[[x0,y0]]; let x=x0, y=y0;
    for(let i=0;i<n;i++){ const a=ang+(i%2?1:-1)*(small?0.12+0.2*H(i+2):0.18+0.22*H(i+2)), L=len/n*(0.75+0.5*H(i+9)); x+=Math.cos(a)*L; y+=Math.sin(a)*L; pts.push([x,y]); }
    const N=pts.length, Lf=[], Rt=[];
    for(let i=0;i<N;i++){ const p=pts[i], q=pts[Math.min(N-1,i+1)], o=pts[Math.max(0,i-1)], dx=q[0]-o[0], dy=q[1]-o[1], dl=Math.hypot(dx,dy)||1, u=i/(N-1);
      const w=wmax*Math.min(1,u*5)*Math.pow(1-u,0.85)*(0.7+0.6*H(i+20)); Lf.push([p[0]-dy/dl*w,p[1]+dx/dl*w]); Rt.push([p[0]+dy/dl*w,p[1]-dx/dl*w]); }
    return {pts,H,path:c=>{ c.beginPath(); c.moveTo(pts[0][0],pts[0][1]); Lf.forEach(p=>c.lineTo(p[0],p[1])); c.lineTo(pts[N-1][0],pts[N-1][1]); for(let i=N-1;i>=0;i--) c.lineTo(Rt[i][0],Rt[i][1]); c.closePath(); }}; }
  function bolt(c,x0,y0,ang,len,wmax,seed,o){ o=o||{}; const B=boltShape(x0,y0,ang,len,wmax,seed,o.small);
    c.save(); c.lineJoin='round';
    if(o.glow!==false){ c.strokeStyle=o.glow||'rgba(255,20,40,0.28)'; c.lineWidth=wmax*1.6+2.5; B.path(c); c.stroke(); }
    if(o.rim!==false){ c.strokeStyle=o.rim||'#e8102c'; c.lineWidth=wmax*0.7+1.2; B.path(c); c.stroke(); }
    c.fillStyle=o.core||'#07060a'; B.path(c); c.fill(); c.restore(); return B; }
  function boltSet(c,x0,y0,ang,len,wmax,seed,o){ o=o||{}; const B=bolt(c,x0,y0,ang,len,wmax,seed,o), P=B.pts; if(o.branches===false) return B;
    for(let i=1;i<P.length-1;i++){ const sd=seed*3+i, so=Object.assign({},o,{small:true});
      bolt(c,P[i][0],P[i][1],ang+(B.H(i+90)<0.5?1:-1)*(0.5+0.45*B.H(i+95)),len*(0.32+0.16*B.H(i+99)),wmax*0.45,sd,so);
      if(B.H(i+70)<0.6) bolt(c,P[i][0],P[i][1],ang+(B.H(i+90)<0.5?-1:1)*(0.4+0.3*B.H(i+75)),len*(0.22+0.1*B.H(i+77)),wmax*0.35,sd+7,so); }
    return B; }
  // ☁️ cụm khói / hơi nước / bụi mềm (gradient tròn không viền) — col 'r,g,b'. Hơi nước Gear 2: '255,240,242' → '255,226,230'; khói đen: '14,10,22'
  function puff(c,x,y,r,a,col){ if(a<=0.01||r<=0.5) return; const g=c.createRadialGradient(x,y,0,x,y,r); g.addColorStop(0,`rgba(${col},${a})`); g.addColorStop(0.6,`rgba(${col},${a*0.45})`); g.addColorStop(1,`rgba(${col},0)`);
    c.fillStyle=g; c.beginPath(); c.arc(x,y,r,0,Math.PI*2); c.fill(); }
  // ───────── 🧩 PIXI-FILTERS (MIT, js/vendor/pixi-filters/glsl.js) chạy bằng WebGL2 riêng — 37 bộ lọc GLSL của cộng đồng PixiJS ─────────
  // VfxGL.filter(canvasNguồn, 'tên', {uniform…}, {define…}) → canvas kết quả (vẽ ngay bằng drawImage). Toạ độ px: gốc TRÊN-TRÁI như canvas 2D.
  // Tự cấp: uInputSize, uInputClamp, uOutputFrame, uOutputTexture, uDimensions, uTime(0). Uniform là ảnh/canvas → tự gắn texture.
  // Lệnh gọn cho hay dùng: VfxGL.fx.glow / godray / shockwave / zoomBlur / radialBlur / motionBlur / rgbSplit / bulge / twist / crt / oldFilm / outline / bloom / glitch / adjust / pixelate
  let gl2=null, cv2=null, q2=null; const P2={}, T2=new Map();
  function init2(){ if(gl2!==null) return !!gl2; try{ cv2=document.createElement('canvas'); cv2.width=cv2.height=4; gl2=cv2.getContext('webgl2',{premultipliedAlpha:true,preserveDrawingBuffer:true,alpha:true})||false; }catch(e){ gl2=false; }
    if(!gl2) return false; q2=gl2.createBuffer(); gl2.bindBuffer(gl2.ARRAY_BUFFER,q2); gl2.bufferData(gl2.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl2.STATIC_DRAW); return true; }
  const VS2='#version 300 es\nin vec2 aPos; out vec2 vTextureCoord; void main(){ vTextureCoord=vec2(aPos.x*0.5+0.5,0.5-aPos.y*0.5); gl_Position=vec4(aPos,0.,1.); }';
  const PF_DEF={ '${ANGLE_STEP}':'0.0628318', '${MAX_KERNEL_SIZE}':'32.0', '__DIST__':'10.0', '__ANGLE_STEP_SIZE__':'0.31415', '${MAX_COLORS}':'4', 'MAX_STOPS':'8' };
  function pfSource(name,defs){ const G=window.PIXI_FILTERS_GLSL||{}, [nm,file]=name.split('/'), F=G[nm]; if(!F) throw new Error('pixi-filters: không có '+name);   // 'tên' hoặc 'tên/file' (vd 'advanced-bloom/extract-brightness')
    let src=file?F[file]:Object.values(F).find(s=>/void main/.test(s)); const D=Object.assign({},PF_DEF,defs||{}); if(G.godray&&G.godray.perlin) D['${PERLIN}']=G.godray.perlin;
    for(const [k,v] of Object.entries(D)) src=src.split(k).join(String(v));
    // vá tương thích WebGL2: shader kiểu GLSL cũ (gl_FragColor/texture2D/varying) và biến trùng từ khoá mới ('sample')
    if(/gl_FragColor/.test(src)){ if(!/out\s+vec4\s+finalColor/.test(src)) src=src.replace(/(precision[^;]*;)/,'$1\nout vec4 finalColor;'); src=src.replace(/gl_FragColor/g,'finalColor'); if(!/out\s+vec4\s+finalColor/.test(src)) src='out vec4 finalColor;\n'+src; }
    src=src.replace(/\btexture2D\b/g,'texture').replace(/\bvarying\b/g,'in').replace(/\bsample\b/g,'smp_');
    return '#version 300 es\nprecision highp float;\nprecision highp int;\n'+src.replace(/^\s*#version[^\n]*\n/,''); }   // vài shader không khai precision (WebGL2 bắt buộc) → tự thêm
  function prog2(name,defs){ const key=name+'|'+JSON.stringify(defs||{}); if(P2[key]) return P2[key]; const g=gl2;
    const sh=(t,s)=>{ const o=g.createShader(t); g.shaderSource(o,s); g.compileShader(o); if(!g.getShaderParameter(o,g.COMPILE_STATUS)) throw new Error(name+': '+g.getShaderInfoLog(o)); return o; };
    const p=g.createProgram(); g.attachShader(p,sh(g.VERTEX_SHADER,VS2)); g.attachShader(p,sh(g.FRAGMENT_SHADER,pfSource(name,defs))); g.bindAttribLocation(p,0,'aPos'); g.linkProgram(p);
    if(!g.getProgramParameter(p,g.LINK_STATUS)) throw new Error(name+': '+g.getProgramInfoLog(p));
    const U={}; const n=g.getProgramParameter(p,g.ACTIVE_UNIFORMS); for(let i=0;i<n;i++){ const a=g.getActiveUniform(p,i); U[a.name.replace(/\[0\]$/,'')]={loc:g.getUniformLocation(p,a.name),type:a.type,size:a.size}; }
    return P2[key]={p,U}; }
  function tex2(src,slot){ const g=gl2; g.activeTexture(g.TEXTURE0+slot); let t=T2.get(slot); if(!t){   /* ⚠️ chọn khe TRƯỚC khi tạo/gắn texture mới (không thì đè lên khe 0 = ảnh gốc) */ t=g.createTexture(); T2.set(slot,t); g.bindTexture(g.TEXTURE_2D,t);
      g.texParameteri(g.TEXTURE_2D,g.TEXTURE_MIN_FILTER,g.LINEAR); g.texParameteri(g.TEXTURE_2D,g.TEXTURE_MAG_FILTER,g.LINEAR); g.texParameteri(g.TEXTURE_2D,g.TEXTURE_WRAP_S,g.CLAMP_TO_EDGE); g.texParameteri(g.TEXTURE_2D,g.TEXTURE_WRAP_T,g.CLAMP_TO_EDGE); }
    g.activeTexture(g.TEXTURE0+slot); g.bindTexture(g.TEXTURE_2D,t); g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL,false); g.pixelStorei(g.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true); g.texImage2D(g.TEXTURE_2D,0,g.RGBA,g.RGBA,g.UNSIGNED_BYTE,src); return t; }
  function filter(src,name,uni,defs,outW,outH){ if(!init2()) return null; const g=gl2, w=outW||src.width, h=outH||src.height, P=prog2(name,defs);
    if(cv2.width!==w||cv2.height!==h){ cv2.width=w; cv2.height=h; } g.viewport(0,0,w,h); g.useProgram(P.p);
    const auto={ uInputSize:[w,h,1/w,1/h], uInputClamp:[0.5/w,0.5/h,1-0.5/w,1-0.5/h], uOutputFrame:[0,0,w,h], uOutputTexture:[w,h,1/w,1/h], uDimensions:[w,h], uTime:0 };
    const all=Object.assign(auto,uni||{}); let slot=0; tex2(src,slot); if(P.U.uTexture) g.uniform1i(P.U.uTexture.loc,slot); slot++;
    for(const [k,u] of Object.entries(P.U)){ if(k==='uTexture') continue; let v=all[k]; if(v===undefined) continue;
      const T=u.type;
      if(T===g.SAMPLER_2D){ tex2(v,slot); g.uniform1i(u.loc,slot); slot++; continue; }
      if(typeof v==='boolean') v=v?1:0; const arr=Array.isArray(v)?v.flat():[v];
      if(T===g.FLOAT) g.uniform1fv(u.loc,arr); else if(T===g.FLOAT_VEC2) g.uniform2fv(u.loc,arr); else if(T===g.FLOAT_VEC3) g.uniform3fv(u.loc,arr); else if(T===g.FLOAT_VEC4) g.uniform4fv(u.loc,arr);
      else if(T===g.INT||T===g.BOOL) g.uniform1iv(u.loc,arr.map(x=>Math.round(x))); else if(T===g.FLOAT_MAT3) g.uniformMatrix3fv(u.loc,false,arr); }
    g.bindBuffer(g.ARRAY_BUFFER,q2); g.enableVertexAttribArray(0); g.vertexAttribPointer(0,2,g.FLOAT,false,0,0);
    g.clearColor(0,0,0,0); g.clear(g.COLOR_BUFFER_BIT); g.drawArrays(g.TRIANGLE_STRIP,0,4); return cv2; }
  // chạy nhiều lượt liên tiếp (kết quả lượt trước = nguồn lượt sau) — chép sang canvas đệm vì cv2 bị ghi đè
  const _buf=[]; function snap(c,i){ let b=_buf[i]; if(!b){ b=_buf[i]=document.createElement('canvas'); } if(b.width!==c.width||b.height!==c.height){ b.width=c.width; b.height=c.height; } const x=b.getContext('2d'); x.clearRect(0,0,b.width,b.height); x.drawImage(c,0,0); return b; }
  const col3=c=>hex(c||'#ffffff');
  let _gmap=null; function glitchMap(seed,slices){ if(!_gmap){ _gmap=document.createElement('canvas'); _gmap.width=1; _gmap.height=256; } const x=_gmap.getContext('2d'); let s=seed||1, y=0; const r=()=>{ s=(s*16807)%2147483647; return s/2147483647; };
    while(y<256){ const hh=Math.max(2,Math.round(r()*256/(slices||8))); const v=Math.round((r()*2-1)*255), on=r()<0.6; x.fillStyle=on?(v>=0?`rgb(${v},0,0)`:`rgb(0,${-v},0)`):'rgb(0,0,0)'; x.fillRect(0,y,1,hh); y+=hh; } return _gmap; }   // lệch = đỏ − xanh lá: lát đỏ lệch phải, lát xanh lệch trái, đen = đứng yên
  const fx={
    glow:(c,o={})=>filter(c,'glow',{uStrength:[o.inner||0,o.outer==null?4:o.outer],uColor:col3(o.color),uKnockout:o.knockout?1:0,uAlpha:o.alpha==null?1:o.alpha},{'__DIST__':(o.dist||10).toFixed(1),'__ANGLE_STEP_SIZE__':(Math.PI*2/(o.quality||20)).toFixed(5)}),
    godray:(c,o={})=>filter(c,'godray',{uLight:o.parallel===false?[o.x||0,o.y||0]:[Math.cos((o.angle==null?30:o.angle)*Math.PI/180),Math.sin((o.angle==null?30:o.angle)*Math.PI/180)],uParallel:o.parallel===false?0:1,uAspect:c.height/c.width,uTime:o.time||0,uRay:[o.gain==null?0.5:o.gain,o.lacunarity==null?2.5:o.lacunarity,o.alpha==null?1:o.alpha]}),
    shockwave:(c,o={})=>filter(c,'shockwave',{uCenter:[o.x||c.width/2,o.y||c.height/2],uTime:o.time||0,uSpeed:o.speed||500,uWave:[o.amplitude||30,o.wavelength||160,o.brightness||1,o.radius==null?-1:o.radius]}),
    zoomBlur:(c,o={})=>filter(c,'zoom-blur',{uStrength:o.strength==null?0.1:o.strength,uCenter:[o.x||c.width/2,o.y||c.height/2],uRadii:[o.inner||0,o.outer==null?-1:o.outer]}),
    radialBlur:(c,o={})=>filter(c,'radial-blur',{uRadian:(o.angle==null?20:o.angle)*Math.PI/180,uCenter:[o.x||c.width/2,o.y||c.height/2],uRadius:o.radius==null?-1:o.radius,uKernelSize:o.kernel||15}),
    motionBlur:(c,o={})=>filter(c,'motion-blur',{uVelocity:[o.vx||20,o.vy||0],uKernelSize:o.kernel||15,uOffset:o.offset||0}),
    rgbSplit:(c,o={})=>filter(c,'rgb-split',{uRed:o.red||[-6,0],uGreen:o.green||[0,4],uBlue:o.blue||[4,0]}),
    bulge:(c,o={})=>filter(c,'bulge-pinch',{uCenter:[(o.x==null?c.width/2:o.x)/c.width,(o.y==null?c.height/2:o.y)/c.height],uRadius:o.radius||100,uStrength:o.strength==null?1:o.strength}),
    twist:(c,o={})=>filter(c,'twist',{uTwist:[o.radius||200,o.angle==null?4:o.angle],uOffset:[o.x||c.width/2,o.y||c.height/2]}),
    crt:(c,o={})=>filter(c,'crt',{uLine:[o.curvature||1,o.lineWidth||1,o.lineContrast||0.25,o.vertical?1:0],uNoise:[o.noise==null?0.3:o.noise,o.noiseSize||1],uVignette:[o.vignetting==null?0.3:o.vignetting,o.vignettingAlpha==null?1:o.vignettingAlpha,o.vignettingBlur==null?0.3:o.vignettingBlur],uSeed:o.seed||Math.random(),uTime:o.time||0}),
    oldFilm:(c,o={})=>filter(c,'old-film',{uSepia:o.sepia==null?0.3:o.sepia,uNoise:[o.noise==null?0.3:o.noise,o.noiseSize||1],uScratch:[o.scratch==null?0.5:o.scratch,o.scratchDensity==null?0.3:o.scratchDensity,o.scratchWidth||1],uVignetting:[o.vignetting==null?0.3:o.vignetting,o.vignettingAlpha==null?1:o.vignettingAlpha,o.vignettingBlur==null?0.3:o.vignettingBlur],uSeed:o.seed||Math.random()}),
    outline:(c,o={})=>filter(c,'outline',{uThickness:[(o.thickness||2)/c.width,(o.thickness||2)/c.height],uColor:col3(o.color),uAlpha:o.alpha==null?1:o.alpha,uKnockout:o.knockout?1:0},{'${ANGLE_STEP}':(Math.PI*2/Math.max(8,Math.round((o.quality||0.5)*100))).toFixed(7)}),
    adjust:(c,o={})=>filter(c,'adjustment',{uGamma:o.gamma||1,uContrast:o.contrast||1,uSaturation:o.saturation==null?1:o.saturation,uBrightness:o.brightness||1,uColor:[o.red||1,o.green||1,o.blue||1,o.alpha==null?1:o.alpha]}),
    pixelate:(c,o={})=>filter(c,'pixelate',{uSize:[o.size||8,o.size||8]}),
    glitch:(c,o={})=>filter(c,'glitch',{uDisplacementMap:glitchMap(o.seed||Math.floor(Math.random()*1e6),o.slices||8),uSeed:o.seed?((o.seed%1000)/1000):Math.random(),uDimensions:[c.width,c.height],uAspect:c.height/c.width,uFillMode:o.fillMode||0,uOffset:o.offset==null?30:o.offset,uDirection:(o.direction||0)*Math.PI/180,uRed:o.red||[2,0],uGreen:o.green||[-2,0],uBlue:o.blue||[0,0]}),
  };
  fx.bloom=(c,o={})=>{ if(!init2()) return null; let b=snap(filter(c,'advanced-bloom/extract-brightness',{uThreshold:o.threshold==null?0.72:o.threshold},null),1);   // bloom nhiều lượt: tách vùng sáng → mờ Kawase vài lượt → cộng lại
    const K=o.kernels||[4,5,7,9]; K.forEach((k,i)=>{ b=snap(filter(b,'kawase-blur/kawase-blur',{uOffset:[(k+0.5)/c.width,(k+0.5)/c.height]}),2+(i%2)); });
    const out=snap(c,4), x=out.getContext('2d'); x.save(); x.globalCompositeOperation='lighter'; x.globalAlpha=Math.min(1,o.scale==null?0.7:o.scale); x.drawImage(b,0,0);   // cộng lớp sáng đã làm mờ lên ảnh gốc
    if((o.scale||1)>1){ x.globalAlpha=Math.min(1,(o.scale||1)-1); x.drawImage(b,0,0); } x.restore(); return out; };
  // ───────── 🎆 HẠT (Proton — MIT, js/vendor/proton/proton.min.js) ─────────
  // VfxGL.parts.spawn('fire'|'smoke'|'sparks'|'dust'|'steam'|'embers'|'magic'|'snow', x, y, {dur (giây phát, 0 = 1 phát nổ), scale, color:[đầu,cuối], angle (độ, hướng phun), spread, rate})
  //   → emitter (đổi emitter.p.x/.p.y để bám theo nhân vật; emitter.stopEmit() để tắt)
  // VfxGL.parts.step(dt giây) — gọi theo NHỊP GAME (đứng hình thì không gọi → hạt cũng đứng) · VfxGL.parts.draw(ctx) · VfxGL.parts.clear()
  const PARTS=(()=>{ let P=null; const sprites={};
    const PR={ fire:{r:[0.8,1.4],life:[0.5,0.9],v:[1.2,2.4],ang:0,spr:22,rate:[6,9],col:['#fff1a0','#ff3a00'],sc:[1.2,0.1],grav:-2,alpha:[1,0],add:true},
      smoke:{r:[1.2,2.2],life:[1.2,2.0],v:[0.6,1.2],ang:0,spr:30,rate:[3,4],col:['#9a9a9a','#3a3a3a'],sc:[0.6,2.2],grav:-0.6,alpha:[0.55,0]},
      sparks:{r:[0.25,0.45],life:[0.25,0.6],v:[5,9],ang:0,spr:180,rate:[30,40],col:['#ffffff','#ffb020'],sc:[1,0.2],grav:6,alpha:[1,0],add:true,burst:true},
      dust:{r:[0.8,1.6],life:[0.6,1.1],v:[1.5,3],ang:0,spr:80,rate:[14,20],col:['#d8c8a8','#a89878'],sc:[0.5,1.8],grav:-0.2,alpha:[0.6,0],burst:true},
      steam:{r:[1.0,1.8],life:[1.0,1.6],v:[0.8,1.6],ang:0,spr:40,rate:[4,5],col:['#ffffff','#ffe2e8'],sc:[0.6,2.4],grav:-1.2,alpha:[0.45,0]},
      embers:{r:[0.2,0.35],life:[1.0,2.0],v:[0.6,1.4],ang:0,spr:50,rate:[3,4],col:['#ffd27a','#ff4a10'],sc:[1,0.3],grav:-0.8,alpha:[1,0],add:true,drift:true},
      magic:{r:[0.3,0.6],life:[0.6,1.2],v:[0.5,1.5],ang:0,spr:180,rate:[3,4],col:['#ffffff','#b070ff'],sc:[1,0],grav:-0.5,alpha:[1,0],add:true,drift:true},
      snow:{r:[0.3,0.6],life:[2,3.5],v:[0.4,0.9],ang:180,spr:30,rate:[1,2],col:['#ffffff','#dff2ff'],sc:[1,1],grav:0.5,alpha:[0.9,0],drift:true} };
    function sprite(col,add){ const k=col+(add?'+':''); if(sprites[k]) return sprites[k]; const c=document.createElement('canvas'); c.width=c.height=64; const x=c.getContext('2d');
      const g=x.createRadialGradient(32,32,0,32,32,32); g.addColorStop(0,`rgba(${col},1)`); g.addColorStop(add?0.25:0.5,`rgba(${col},${add?0.8:0.6})`); g.addColorStop(1,`rgba(${col},0)`); x.fillStyle=g; x.fillRect(0,0,64,64); return sprites[k]=c; }
    function ensure(){ if(P) return P; if(!window.Proton) return null; const C=window.Proton.default||window.Proton; P=new C(); return P; }   // bản UMD: window.Proton = namespace, lớp chính ở .default
    function spawn(kind,x,y,o){ o=o||{}; const Pn=ensure(); if(!Pn) return null; const PX=window.Proton; const D=PR[kind]||PR.fire, S=o.scale||10, e=new PX.Emitter();
      const rate=o.rate||D.rate; e.rate=new PX.Rate(new PX.Span(rate[0],rate[1]), D.burst&&!o.dur?new PX.Span(0.01):new PX.Span(0.03,0.06));
      e.addInitialize(new PX.Mass(1)); e.addInitialize(new PX.Radius(D.r[0]*S,D.r[1]*S)); e.addInitialize(new PX.Life(D.life[0],D.life[1]));
      e.addInitialize(new PX.Velocity(new PX.Span(D.v[0]*S*0.3,D.v[1]*S*0.3),new PX.Span(o.angle==null?D.ang:o.angle,o.spread==null?D.spr:o.spread,true),'polar'));
      e.addBehaviour(new PX.Alpha(D.alpha[0],D.alpha[1])); e.addBehaviour(new PX.Scale(D.sc[0],D.sc[1])); e.addBehaviour(new PX.Color(...(o.color||D.col)));
      if(D.grav) e.addBehaviour(new PX.Gravity(D.grav*S*0.06)); if(D.drift) e.addBehaviour(new PX.RandomDrift(S*1.5,S*0.6,0.05));
      e.p.x=x; e.p.y=y; e._add=o.add==null?!!D.add:o.add; if(D.burst&&!o.dur) e.emit('once'); else e.emit(o.dur||1, true); Pn.addEmitter(e); return e; }
    function step(dt){ if(P) P.emittersUpdate(dt); }
    function draw(c){ if(!P) return; for(const e of P.emitters){ c.save(); if(e._add) c.globalCompositeOperation='lighter';
        for(const p of e.particles){ if(p.dead) continue; const rgb=p.rgb||{r:255,g:255,b:255}, q=v=>Math.round(v/16)*16, col=`${q(rgb.r)},${q(rgb.g)},${q(rgb.b)}`, r=(p.radius||4)*(p.scale==null?1:p.scale);
          if(r<0.3||p.alpha<=0.01) continue; c.globalAlpha=Math.max(0,Math.min(1,p.alpha)); c.drawImage(sprite(col,e._add),p.p.x-r,p.p.y-r,r*2,r*2); }
        c.restore(); } }
    function clear(){ if(P){ P.destroy(); P=null; } }
    return {spawn,step,draw,clear,PRESETS:PR}; })();
  window.VfxGL={ init, aura, drawAura, post, water, bolt, boltSet, puff, filter, fx, parts:PARTS, PRESETS:PRE };
})();
