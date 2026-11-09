// ===================== 🎥 CINE-CAM — góc máy + nhịp chuyển động + hiệu ứng màn hình LÀM SẴN cho cine-kit =====================
// Gắn vào CineKit.cam (file riêng để không đụng js/cine-kit.js). playCineKit tự tải sau cine-kit, trước film-<id>.js.
// Số liệu lấy từ clip anime đã học ở repo meme-anime-lab (playbook/luat.md · cong-thuc.md · nhip.md) — mỗi hàm ghi nguồn.
//
// A. GÓC MÁY — mỗi hàm trả MẢNG shot cho def.shots ({t0,t1,a,b,ease}); ghép nhiều đoạn: shots: C.seq(C.wormHold(0,{…}), C.pushIn(2,{…}))
//    Toạ độ như cine-kit: tx,ty,tz = điểm nhìn; dist, yaw, pitch (+ = nhìn từ trên), roll, fov, ox, oy. Thiếu tham số → dùng mặc định trong hàm.
//    Phim 2D (fin1…) không dùng def.shots vẫn lấy số được: K.camAt(C.pushIn(0,{…}), t) → {dist, …} rồi tự đổi ra zoom.
// B. NHỊP CHUYỂN ĐỘNG — hàm u(0–1) → 0–1, đăng ký luôn vào K.EASE nên dùng được ease:'holdSnap' trong shot; tự gọi C.ease.overshoot(u) cho sprite.
// C. HIỆU ỨNG MÀN HÌNH — gọi trong def.screen(F,t) (canvas 2D, toạ độ logic F.VW × F.VH); trả true khi đang chạy.
//    def.impact: C.negFrames([...giây]) → 'inv' đúng 1 khung vẽ.
(function(){
  function attach(K){
    if(K.cam) return;
    const { clamp, seg, lerp, EASE, hash } = K, TAU = Math.PI * 2;
    const C = {};
    const pick = (o, keys) => { const r = {}; for (const k of keys) if (o[k] != null) r[k] = o[k]; return r; };
    const CAMK = ['tx','ty','tz','dist','yaw','pitch','roll','fov','ox','oy'];
    const shot = (t0, d, a, b, ease) => { const s = { t0, t1: t0 + d, a: pick(a, CAMK) }; if (b) s.b = pick(b, CAMK); if (ease) s.ease = ease; return s; };

    // ───────── B. NHỊP CHUYỂN ĐỘNG ─────────
    // holdSnap: GIỮ gần yên (trôi 6%) rồi BẬT về đích — gồng chiêu rồi tung đòn, máy khựng rồi giật (fight-1 A4→A11, G combo).
    // overshoot: VƯỢT quá đích ~10% rồi bật lại — lao vào mặt, chữ / ảnh bật vào khung.
    // brake: lao gần đều rồi HÃM GẤP ở 15% cuối — máy lao theo đòn rồi khựng (fight-1 C1, G 1:56.6).
    C.ease = {
      holdSnapK: (h = 0.7) => u => u < h ? 0.06 * (u / h) : 0.06 + 0.94 * EASE.eout3((u - h) / (1 - h)),
      overshootK: (s = 1.70158) => u => { const v = u - 1; return 1 + (s + 1) * v * v * v + s * v * v; },
      brakeK: (b = 0.85) => u => u < b ? 0.96 * (u / b) : 0.96 + 0.04 * EASE.eout3((u - b) / (1 - b)),
    };
    C.ease.holdSnap = C.ease.holdSnapK(0.7); C.ease.overshoot = C.ease.overshootK(); C.ease.brake = C.ease.brakeK(0.85);
    Object.assign(EASE, { holdSnap: C.ease.holdSnap, overshoot: C.ease.overshoot, brake: C.ease.brake });

    // ───────── A. GÓC MÁY ─────────
    // ghép nhiều mảng shot, sắp theo t0
    C.seq = (...arrs) => [].concat(...arrs).sort((x, y) => x.t0 - y.t0);
    // soát nhanh: trả mảng lỗi (rỗng = ổn)
    C.check = shots => { const e = []; shots.forEach((s, i) => { if (!(s.t1 > s.t0)) e.push(i + ': t1 <= t0'); if (!s.a) e.push(i + ': thiếu a');
      if (s.ease && !EASE[s.ease]) e.push(i + ': ease lạ ' + s.ease); for (const v of [s.a, s.b]) if (v) for (const k in v) if (!isFinite(v[k])) e.push(i + ': ' + k + ' không phải số'); }); return e; };

    // LƯỚT DỌC THÂN quái khổng lồ: cực cận, ngước chéo, máy trượt dọc thân theo đà (ty0 → ty1). kaiju-a #1: 2.75s, quái che ~70% khung.
    C.slideAlong = (t0, o = {}) => { const d = o.d || 2.75, a = Object.assign({ tx: 0, ty: 300, tz: 0, dist: 160, pitch: -25, roll: -8, yaw: 0 }, o);
      return [shot(t0, d, a, { ty: o.ty1 != null ? o.ty1 : a.ty + 400, tx: o.tx1 != null ? o.tx1 : a.tx }, 'lin')]; };

    // XOAY QUANH 2 người lúc combo. fight-1 G 1:57.4–1:58.4: 1.0s quay ~120°. cut = đổi góc kiểu CẮT mỗi `cut` giây (0.1–0.2s) thay vì quay mượt.
    C.orbit = (t0, o = {}) => { const d = o.d || 1.0, y0 = o.yaw0 != null ? o.yaw0 : -60, y1 = o.yaw1 != null ? o.yaw1 : 60, base = Object.assign({ tx: 0, ty: 90, tz: 0, dist: 320, pitch: 8 }, o);
      if (!o.cut) return [shot(t0, d, Object.assign({}, base, { yaw: y0 }), { yaw: y1 }, 'lin')];
      const n = Math.max(1, Math.round(d / o.cut)), r = [];
      for (let i = 0; i < n; i++) { const ya = lerp(y0, y1, i / n), yb = lerp(y0, y1, (i + 0.6) / n); r.push(shot(t0 + i * d / n, d / n, Object.assign({}, base, { yaw: ya, roll: (hash(i + 3) - 0.5) * 10 }), { yaw: yb }, 'eout')); }
      return r; };

    // GÓC GIUN ĐỨNG YÊN để đọc tỉ lệ: máy thấp sát đất nhìn lên, 2 toà nhà kẹp 2 mép, quái nhỏ trên trời. kaiju-a #2: 2.0s, KHÔNG chuyển động.
    C.wormHold = (t0, o = {}) => [shot(t0, o.d || 2.0, Object.assign({ tx: 0, ty: 40, tz: -900, dist: 200, pitch: -38, fov: 62 }, o))];

    // NỔ LỚN: góc CHIM nhìn xuống (thấy diện rộng) → góc GIUN nhìn lên khói (thấy độ cao). fight-1 A24–A25: mỗi shot ~0.9s, trôi rất nhẹ.
    C.birdToWorm = (t0, o = {}) => { const d = o.d || 0.9, p = Object.assign({ tx: 0, ty: 0, tz: 0 }, o);
      return [shot(t0, d, Object.assign({}, p, { dist: o.birdDist || 700, pitch: o.birdPitch || 72, yaw: o.yaw || 0 }), { dist: (o.birdDist || 700) * 0.93 }, 'eout'),
              shot(t0 + d, d, Object.assign({}, p, { ty: (p.ty || 0) + 60, dist: o.wormDist || 260, pitch: o.wormPitch || -40, yaw: (o.yaw || 0) + 15, fov: 62 }), { pitch: (o.wormPitch || -40) - 4 }, 'lin')]; };

    // ĐẨY RẤT CHẬM vào mặt (đối mặt, giới thiệu). fight-1 B5: 1.6s, dist giảm ~15%; kaiju-b #2: 2.9s.
    C.pushIn = (t0, o = {}) => { const d = o.d || 1.6, a = Object.assign({ tx: 0, ty: 150, tz: 0, dist: 140, pitch: 0 }, o);
      return [shot(t0, d, a, { dist: o.dist1 != null ? o.dist1 : a.dist * 0.85 }, 'lin')]; };

    // LIA GIẬT (whip pan): quay yaw rất nhanh giữa 2 hướng, nhoè ở giữa — kèm C.whipFx trong screen. 0.15–0.3s.
    C.whip = (t0, o = {}) => { const d = o.d || 0.25, a = Object.assign({ tx: 0, ty: 100, tz: 0, dist: 300, pitch: 5, yaw: 0 }, o.from || o);
      const b = Object.assign({}, a, { yaw: a.yaw + (o.dyaw != null ? o.dyaw : 80) }, o.to || {}); return [shot(t0, d, a, b, 'eio')]; };

    // DOLLY ZOOM (Vertigo): lùi máy + mở fov (hoặc ngược lại) — nhân vật giữ nguyên cỡ, nền giãn/co. dist1 tính để cỡ nhân vật không đổi ở 2 đầu.
    C.dollyZoom = (t0, o = {}) => { const d = o.d || 1.2, f0 = o.fov0 || 40, f1 = o.fov1 || 80, a = Object.assign({ tx: 0, ty: 100, tz: 0, dist: 300, pitch: 0 }, o, { fov: f0 });
      const dist1 = a.dist * Math.tan(f0 * Math.PI / 360) / Math.tan(f1 * Math.PI / 360); return [shot(t0, d, a, { dist: dist1, fov: f1 }, 'eio')]; };

    // LAO THEO ĐÒN + KHỰNG: máy bám điểm from → to (nhịp brake), rồi đứng khựng `hold` giây, dí sát 4%. fight-1 C1 (0.8s), G 1:56.6 (0.3s).
    C.chargeFollow = (t0, o = {}) => { const d = o.d || 0.5, h = o.hold != null ? o.hold : 0.25, cam = Object.assign({ dist: 220, pitch: 5, yaw: 25 }, o.cam || {});
      const A = Object.assign({}, cam, o.from || { tx: -200, ty: 90, tz: 0 }), B = Object.assign({}, cam, o.to || { tx: 200, ty: 90, tz: 0 });
      const r = [shot(t0, d, A, B, 'brake')]; if (h > 0) r.push(shot(t0 + d, h, B, { dist: B.dist * 0.96 }, 'eout')); return r; };

    // TỈ LỆ NHẢY CỰC ĐOAN cho combo tay đôi: rất xa (nhân vật bé, nền trống) ↔ cực cận (nắm đấm che khung, fov rộng méo) ↔ xoay quanh.
    // fight-1 G 1:55.2–1:58.4: xa 0.2 → cận mặt 0.2 → rất xa 0.8 → nắm đấm 0.3 → cận đá 0.2 → xoay 1.0. steps = [[loại, giây, {ghi đè}]…]
    C.scaleJump = (t0, o = {}) => { const tg = Object.assign({ tx: 0, ty: 90, tz: 0 }, pick(o, ['tx','ty','tz']));
      const L = { far: { dist: 1400, pitch: 8 }, vfar: { dist: 1800, pitch: 4 }, face: { dist: 110, ty: tg.ty + 60, yaw: 20 }, fist: { dist: 70, fov: 70, yaw: -15 }, close: { dist: 150, yaw: 35, pitch: 10 } };
      const steps = o.steps || [['far', 0.2], ['face', 0.2], ['vfar', 0.8], ['fist', 0.3], ['close', 0.2], ['orbit', 1.0]];
      let t = t0; const r = [];
      for (const [k, d, ov] of steps) { if (k === 'orbit') r.push(...C.orbit(t, Object.assign({ d, cut: 0.15 }, tg, ov || {})));
        else { const a = Object.assign({}, tg, L[k] || {}, ov || {}); r.push(shot(t, d, a, k === 'fist' ? { dist: a.dist * 0.6 } : { dist: a.dist * 0.97 }, k === 'fist' ? 'ein' : 'lin')); }
        t += d; }
      return r; };

    // 2 SHOT ĐỐI XỨNG cho 2 phe (kết ấn / ra chiêu "soi gương"): cùng máy, chỉ đổi điểm nhìn A → B. fight-1 F2/F4: mỗi shot 0.7s, giữa có wipe 0.2s (gap).
    // flip:true → shot B lật ox / yaw (2 người nhìn vào nhau).
    C.mirror = (t0, o = {}) => { const d = o.d || 0.7, gap = o.gap != null ? o.gap : 0.2, cam = Object.assign({ dist: 260, pitch: 5, ox: -0.12, yaw: 0 }, o.cam || {});
      const A = Object.assign({}, cam, o.A || { tx: -150, ty: 80, tz: 0 }), B = Object.assign({}, cam, o.B || { tx: 150, ty: 80, tz: 0 });
      if (o.flip) { B.ox = -(cam.ox || 0); B.yaw = -(cam.yaw || 0); }
      return [shot(t0, d + gap, A, { dist: A.dist * 0.88 }, 'lin'), shot(t0 + d + gap, d, B, { dist: B.dist * 0.88 }, 'lin')]; };

    // ───────── C. HIỆU ỨNG MÀN HÌNH ─────────
    const leaf = (g, x, y, len, wid, rot) => { g.save(); g.translate(x, y); g.rotate(rot); g.beginPath(); g.moveTo(-len / 2, 0);
      g.quadraticCurveTo(0, -wid, len / 2, 0); g.quadraticCurveTo(0, wid, -len / 2, 0); g.fill(); g.restore(); };

    // KHUNG ÂM BẢN 1 khung vẽ ở mỗi va chạm / chuyển đoạn. fight-1: ~12 lần / 60s (1:07.9, 1:08.9, 1:11.3 …), mỗi lần 1 khung ≈ 0.07s.
    // impact: C.negFrames([T.hit1, T.hit2]) · kind 'bw' / 'red' cho đòn mạnh nhất · big = danh sách đòn mạnh → 'red' rồi 'inv' liền sau.
    C.negFrames = (list, d = 0.07, kind = 'inv', big = []) => t => { for (const a of big) { if (t >= a && t < a + d) return 'red'; if (t >= a + d && t < a + 2 * d) return 'inv'; }
      for (const a of list) if (t >= a && t < a + d) return kind; return 0; };

    // CO LẠI RỒI BÙNG: nền ĐEN + 1 chấm trắng co nhỏ dần + vài tia mảnh tách ra, trong o.d (0.3s = 3 khung) TRƯỚC vụ nổ.
    // fight-1 A23 (1:13.7–1:14.0) → sau đó 1 khung âm bản (impact: C.negFrames([t0+0.3])) → nổ toàn cảnh (C.birdToWorm).
    C.implode = (F, t, t0, o = {}) => { const d = o.d || 0.3; if (t < t0 || t >= t0 + d) return false; const g = F.g, u = seg(t, t0, t0 + d), cx = o.cx != null ? o.cx : F.VW / 2, cy = o.cy != null ? o.cy : F.VH / 2;
      K.flash(F, 1, '#000'); const R = Math.min(F.VW, F.VH), r = lerp(R * 0.09, R * 0.008, EASE.ein(u));
      const gl = g.createRadialGradient(cx, cy, 0, cx, cy, r * 3); gl.addColorStop(0, 'rgba(255,255,255,0.9)'); gl.addColorStop(1, 'rgba(255,255,255,0)');
      g.save(); g.fillStyle = gl; g.fillRect(cx - r * 3, cy - r * 3, r * 6, r * 6); g.fillStyle = o.col || '#fff'; g.beginPath(); g.arc(cx, cy, r, 0, TAU); g.fill();
      g.strokeStyle = 'rgba(255,255,255,0.85)'; const fr = Math.floor(t * 12);
      for (let i = 0; i < 9; i++) { const s = fr * 31 + i, th = hash(s) * TAU, a0 = r * 1.4, a1 = r * 1.4 + R * (0.15 + 0.35 * hash(s + 1)) * (0.4 + u);
        g.lineWidth = 1 + 2 * hash(s + 2); g.beginPath(); g.moveTo(cx + Math.cos(th) * a0, cy + Math.sin(th) * a0); g.lineTo(cx + Math.cos(th) * a1, cy + Math.sin(th) * a1); g.stroke(); }
      g.restore(); return true; };

    // WIPE MÀU: 1 vết loang lớn tràn từ góc dưới-trái, che KÍN khung ở giữa (t = a + d/2 → đặt cắt máy đúng lúc đó), rồi rút về góc trên-phải.
    // fight-1 A6 (1:04.5): tím phủ kín 0.2s.
    C.wipeBlob = (F, t, a, d = 0.2, col = '#c018ff') => { const u = seg(t, a, a + d); if (t < a || t >= a + d) return false; const g = F.g, R = Math.hypot(F.VW, F.VH) * 1.08;
      const k = u < 0.5 ? EASE.eout(u * 2) : 1 - EASE.ein((u - 0.5) * 2), cx = u < 0.5 ? 0 : F.VW, cy = u < 0.5 ? F.VH : 0;
      g.save(); g.fillStyle = col; g.beginPath();
      for (let i = 0; i <= 32; i++) { const th = i / 32 * TAU, r = R * k * (0.9 + 0.1 * Math.sin(th * 5 + t * 20)); i ? g.lineTo(cx + Math.cos(th) * r, cy + Math.sin(th) * r) : g.moveTo(cx + Math.cos(th) * r, cy + Math.sin(th) * r); }
      g.closePath(); g.fill(); g.restore(); return true; };

    // WIPE BÓNG LÁ: dải bóng lá tối quét chéo trái → phải, che KÍN khung ở giữa (a + d/2 = chỗ cắt máy). fight-1 F1/F3 (1:43.4, 1:44.3): 0.2s, cùng hướng.
    // Cũng dùng cho thân quái / đuôi lướt che khung (kaiju-b #12, 1.0s): đổi col + d.
    C.wipeLeaves = (F, t, a, d = 0.2, o = {}) => { if (t < a || t >= a + d) return false; const u = seg(t, a, a + d), g = F.g, VW = F.VW, VH = F.VH, dir = o.dir || 1;
      const cx = dir > 0 ? lerp(-1.25 * VW, 2.25 * VW, u) : lerp(2.25 * VW, -1.25 * VW, u), W = VW * 1.35, sk = VH * 0.35;
      g.save(); g.fillStyle = o.col || '#160e08';
      g.beginPath(); g.moveTo(cx - W / 2 + sk, -10); g.lineTo(cx + W / 2 + sk, -10); g.lineTo(cx + W / 2 - sk, VH + 10); g.lineTo(cx - W / 2 - sk, VH + 10); g.closePath(); g.fill();
      for (let i = 0; i < 26; i++) { const s = (o.seed || 5) * 41 + i, side = i % 2 ? 1 : -1, yy = VH * hash(s), edge = cx + side * (W / 2) + sk * (1 - 2 * yy / VH);
        leaf(g, edge + side * VW * 0.06 * hash(s + 1), yy, VW * (0.12 + 0.12 * hash(s + 2)), VH * (0.04 + 0.05 * hash(s + 3)), (hash(s + 4) - 0.5) * 1.6 + side * 0.3); }
      g.restore(); return true; };

    // ĐƯỜNG HẦM TỐC ĐỘ khi bị đánh văng xa: nền tối, tia toả tâm dày dần, chấm sáng giữa nở ra, TRẮNG dần → cắt sang toàn cảnh ở a + d.
    // fight-1 C9 (1:28.8–1:29.6): 0.8s. Kèm post zoom nếu muốn: {zoom:{sx:F.VW/2, sy:F.VH/2, k:1+0.4u}}.
    C.speedTunnel = (F, t, a, d = 0.8, o = {}) => { if (t < a || t >= a + d) return false; const u = seg(t, a, a + d), g = F.g, cx = F.VW / 2, cy = F.VH / 2, R = Math.min(F.VW, F.VH);
      K.flash(F, 1, o.bg || '#05060a');
      const rr = R * lerp(0.03, 0.45, EASE.ein(u)), gl = g.createRadialGradient(cx, cy, 0, cx, cy, rr * 2); gl.addColorStop(0, 'rgba(255,255,255,1)'); gl.addColorStop(0.35, 'rgba(220,235,255,0.7)'); gl.addColorStop(1, 'rgba(200,220,255,0)');
      g.save(); g.fillStyle = gl; g.fillRect(cx - rr * 2, cy - rr * 2, rr * 4, rr * 4); g.restore();
      K.speedLines(F, { k: 0.6 + 0.4 * u, n: 90, r0: lerp(0.35, 0.06, u), col: o.col || 'rgba(255,255,255,0.9)' });
      K.flash(F, EASE.ein3(u), '#fff'); return true; };

    // KHOẢNG THỞ sau vụ nổ lớn: nền nâu trầm + bóng lá đung đưa chậm + viền tối. fight-1 B1 (1:15.9, 1.4s), D8 (1:38.2, 1.5s).
    // Không nhân vật rõ mặt → reset mắt người xem; đoạn sau mở bằng shot đứng yên.
    C.restBeat = (F, t, a, d = 1.5, o = {}) => { if (t < a || t >= a + d) return false; const g = F.g, VW = F.VW, VH = F.VH, tt = t - a;
      K.flash(F, 1, o.bg || '#3a2a1e');
      g.save(); g.fillStyle = o.leaf || 'rgba(14,9,5,0.78)';
      for (let i = 0; i < 9; i++) { const s = (o.seed || 13) * 17 + i, bx = VW * (hash(s) * 1.2 - 0.1), by = VH * (hash(s + 1) * 1.2 - 0.1), sw = Math.sin(tt * (0.9 + 0.6 * hash(s + 2)) + i) * VW * 0.02;
        for (let j = 0; j < 5; j++) leaf(g, bx + sw + (hash(s + 10 + j) - 0.5) * VW * 0.16, by + (hash(s + 20 + j) - 0.5) * VH * 0.2, VW * (0.1 + 0.08 * hash(s + 30 + j)), VH * (0.03 + 0.03 * hash(s + 40 + j)), hash(s + 50 + j) * TAU + sw * 0.002); }
      g.restore(); K.vignette(F, 0.7);
      if (tt < 0.15) K.flash(F, 1 - tt / 0.15, '#000'); return true; };

    // LIA GIẬT: vệt gió ngang mạnh nhất giữa shot whip. Gọi trong screen: C.whipFx(F,t,t0,d).
    C.whipFx = (F, t, a, d = 0.25, o = {}) => { if (t < a || t >= a + d) return false; const u = seg(t, a, a + d); K.panLines(F, { k: Math.sin(u * Math.PI), ang: o.ang || 0, n: 40 }); return true; };

    // MẶT CHIA ĐÔI: 2 ô dọc, mỗi ô 1 máy nhìn 1 nhân vật → def.panels: t => C.splitFace(t, T.split, 1.0, camA, camB). fight-1 B7 (1:24.0): 1.0s.
    C.splitFace = (t, a, d = 1.0, camA = {}, camB = {}) => (t >= a && t < a + d) ? [{ cam: camA, clip: [[0, 0], [0.5, 0], [0.5, 1], [0, 1]] }, { cam: camB, clip: [[0.5, 0], [1, 0], [1, 1], [0.5, 1]] }] : null;
    // phủ màu 2 nửa (phe A trái, phe B phải) + vạch dọc giữa — gọi trong screen cùng lúc splitFace
    C.splitTint = (F, t, a, d = 1.0, colA = 'rgba(255,60,50,0.35)', colB = 'rgba(60,140,255,0.35)') => { if (t < a || t >= a + d) return false; const g = F.g;
      g.save(); g.globalCompositeOperation = 'multiply'; g.fillStyle = colA; g.fillRect(0, 0, F.VW / 2, F.VH); g.fillStyle = colB; g.fillRect(F.VW / 2, 0, F.VW / 2, F.VH);
      g.globalCompositeOperation = 'source-over'; g.fillStyle = '#000'; g.fillRect(F.VW / 2 - 2, 0, 4, F.VH); g.restore(); return true; };

    C.list = Object.keys(C).filter(k => typeof C[k] === 'function');
    K.cam = C;
  }
  if (window.CineKit) attach(window.CineKit);
  else { let n = 0; const iv = setInterval(() => { if (window.CineKit) { clearInterval(iv); attach(window.CineKit); } else if (++n > 500) clearInterval(iv); }, 20); }
})();
