// ===================== 📦 SERVICE WORKER — GIỮ TÀI NGUYÊN GAME TRONG MÁY =====================
// Lần đầu vào game, bộ nạp (js/boot.js) tải ĐỦ mọi file trong assets-manifest.json vào bộ nhớ đệm "cbl-assets".
// Từ lần sau, mọi ảnh / tiếng / font / code đều lấy THẲNG từ máy → vào game là chơi ngay, không tải lại.
// Bản mới: boot.js so mã băm từng file với danh sách mới → chỉ xoá + tải lại đúng file nào đã đổi.
// index.html và *.json (danh sách file, save mặc định) luôn lấy từ mạng để biết có bản mới hay không.
const CACHE = 'cbl-assets';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET') return;
  const u = new URL(req.url);
  if(u.origin !== location.origin) return;
  const scope = new URL(self.registration.scope).pathname, p = u.pathname.slice(scope.length);
  if(!(p.startsWith('assets/') || /^(js|css)\/.+\.(js|css)$/.test(p))) return;   // chỉ giữ tài nguyên + code
  e.respondWith(serve(req));
});
async function serve(req){
  const cache = await caches.open(CACHE);
  let res = await cache.match(req.url, { ignoreVary:true });
  if(!res){
    try{ res = await fetch(req.url, { credentials:'same-origin' }); }catch(err){ return fetch(req); }
    if(res.ok && res.status === 200) await cache.put(req.url, res.clone());
  }
  // 🔊 thẻ <audio> xin từng khúc (Range) → cắt đúng khúc từ bản đầy đủ trong bộ nhớ đệm, trả 206
  const range = req.headers.get('range');
  if(range && res.status === 200){
    const buf = await res.arrayBuffer(), m = /bytes=(\d*)-(\d*)/.exec(range), size = buf.byteLength;
    let start = m && m[1] ? +m[1] : 0, end = m && m[2] ? +m[2] : size - 1;
    if(m && !m[1] && m[2]){ start = Math.max(0, size - +m[2]); end = size - 1; }
    end = Math.min(end, size - 1);
    return new Response(buf.slice(start, end + 1), { status:206, statusText:'Partial Content', headers:{
      'Content-Type': res.headers.get('Content-Type') || 'audio/mpeg', 'Content-Range': `bytes ${start}-${end}/${size}`,
      'Content-Length': String(end - start + 1), 'Accept-Ranges': 'bytes' } });
  }
  return res;
}
