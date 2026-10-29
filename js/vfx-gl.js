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
  window.VfxGL={ init, aura, drawAura, post, PRESETS:PRE };
})();
