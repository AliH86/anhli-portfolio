// What makes the painted garden breathe: foliage that sways, a real campfire,
// a pond that glints and ripples, koi, butterflies. All drawn in picture pixels.

const off = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };

// ---------- wind: the painting bends, it never tears ----------
// Each region has a weight map (tools/sway.py): how far each pixel may move. Every few
// frames the region is re-sampled backwards: dst(x, y) = src(x - d, y) with
// d = round(amp * weight * wave(y, t)). Weights are smooth, so neighbours differ by
// at most a pixel: leaves lean and bounce back, roots, walls and pots stay put.
const imgData = (img) => { const c = off(img.width, img.height), g = c.getContext('2d', { willReadFrequently: true }); g.drawImage(img, 0, 0); return g.getImageData(0, 0, img.width, img.height); };
const loadImg = (src) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => ok(null); i.src = src; });
let SRC = null, REGIONS = [];
export async function buildWind(ground, base = '../world/sway/') {
  SRC = imgData(ground);
  const meta = await (await fetch(`${base}sway.json`, { cache: 'no-cache' })).json();
  REGIONS = await Promise.all(Object.entries(meta).map(async ([name, m]) => {
    const wimg = await loadImg(`${base}${name}.png?v=70`); const wd = imgData(wimg).data;
    const idx = [], wt = [];
    for (let y = 0; y < m.h; y++) for (let x = 0; x < m.w; x++) { const v = wd[(y * m.w + x) * 4]; if (v > 6) { idx.push(y * m.w + x); wt.push(v / 255); } }
    const c = off(m.w, m.h), g = c.getContext('2d');
    return { ...m, name, idx: Uint32Array.from(idx), wt: Float32Array.from(wt), c, g, img: g.createImageData(m.w, m.h), last: -1, phase: (m.x * 0.013 + m.y * 0.007) % 6.28 };
  }));
  return REGIONS;
}
// Horizontal offset of a world pixel at time t (shared by the ground and the front cut-outs).
function wave(r, y, t, strength) {
  const k = t * r.speed + r.phase + y * 0.012;
  return strength * (Math.sin(k) * 0.75 + Math.sin(k * 2.3 + 1.7) * 0.25);
}
let windStrength = 1;
export function windAt(t, wind) {
  const gust = 0.55 + 0.45 * Math.sin(t * 0.37) * Math.sin(t * 0.11 + 1);
  windStrength = (0.55 + wind * 0.8) * gust;
  return windStrength;
}
function warp(r, t) {
  const W = r.w, src = SRC.data, SW = SRC.width, out = r.img.data;
  // Start from the untouched painting, then move the weighted pixels.
  out.fill(0); // Unchanged pixels must not erase the preceding region's wind.
  const rows = new Float32Array(r.h);
  for (let y = 0; y < r.h; y++) rows[y] = r.amp * wave(r, r.y + y, t, windStrength);
  for (let i = 0; i < r.idx.length; i++) {
    const p = r.idx[i], y = (p / W) | 0, x = p - y * W, d = Math.round(rows[y] * r.wt[i]);
    if (!d) continue;
    const sx = r.x + x - d; if (sx < 0 || sx >= SW) continue;
    const so = ((r.y + y) * SW + sx) * 4, o = p * 4;
    out[o] = src[so]; out[o + 1] = src[so + 1]; out[o + 2] = src[so + 2]; out[o + 3] = 255;
  }
  r.g.putImageData(r.img, 0, 0);

}
export function drawWind(ctx, view, t) {
  const step = Math.floor(t * 20);                  // 20 updates a second is plenty for wind
  for (const r of REGIONS) {
    if (r.x + r.w < view.x || r.x > view.x + view.w || r.y + r.h < view.y || r.y > view.y + view.h) continue;
    if (r.last !== step) { warp(r, t); r.last = step; }
    ctx.drawImage(r.c, r.x - view.x, r.y - view.y);
  }
}
// The same bend for a cut-out sprite drawn over the ground (papaya, frangipani...).
export function warpSprite(f, t) {
  const r = REGIONS.find((q) => q.name === f.name);
  if (!r) return f.img;
  if (!f.data) { f.data = imgData(f.img); f.c = off(f.w, f.h); f.g = f.c.getContext('2d'); f.out = f.g.createImageData(f.w, f.h); f.wmap = new Float32Array(f.w * f.h); f.region = r;
    const lookup = new Float32Array(r.w * r.h); for (let i = 0; i < r.idx.length; i++) lookup[r.idx[i]] = r.wt[i];
    for (let y = 0; y < f.h; y++) for (let x = 0; x < f.w; x++) { const rx = f.x + x - r.x, ry = f.y + y - r.y; if (rx >= 0 && ry >= 0 && rx < r.w && ry < r.h) f.wmap[y * f.w + x] = lookup[ry * r.w + rx]; } }
  const step = Math.floor(t * 20); if (f.last === step) return f.c; f.last = step;
  const src = f.data.data, out = f.out.data; out.fill(0);
  for (let y = 0; y < f.h; y++) {
    const row = r.amp * wave(r, f.y + y, t, windStrength);
    for (let x = 0; x < f.w; x++) {
      const p = y * f.w + x, d = Math.round(row * f.wmap[p]), sx = x - d;
      if (sx < 0 || sx >= f.w) continue;
      const so = (y * f.w + sx) * 4, o = p * 4; out[o] = src[so]; out[o + 1] = src[so + 1]; out[o + 2] = src[so + 2]; out[o + 3] = src[so + 3];
    }
  }
  f.g.putImageData(f.out, 0, 0); return f.c;
}

// ---------- campfire: a classic fire automaton at one-pixel resolution ----------
const FW = 44, FH = 58, HOT = 11;
const FIRE_PAL = [[0, 0, 0, 0], [90, 24, 20, 200], [160, 40, 22, 235], [214, 78, 26, 255], [242, 128, 34, 255], [252, 186, 58, 255], [255, 228, 120, 255], [255, 250, 210, 255]];
export function makeFire(x, y) {
  const heat = new Float32Array(FW * FH), c = off(FW, FH), g = c.getContext('2d'), img = g.createImageData(FW, FH);
  return { x, y, heat, c, g, img, acc: 0, lit: 0 };
}
export function stepFire(f, dt, lit, wind) {
  f.lit += ((lit ? 1 : 0) - f.lit) * Math.min(1, dt * 0.8);
  f.acc += dt;
  if (f.acc < 1 / 18) return;
  f.acc = 0;
  const { heat } = f, top = FIRE_PAL.length - 1;
  // Fuel row: the logs glow hottest in the middle, flickering.
  for (let x = 0; x < FW; x++) {
    const m = 1 - Math.abs(x - FW / 2) / (FW * 0.3);
    heat[(FH - 1) * FW + x] = m > 0 ? HOT * f.lit * (0.75 + 0.45 * Math.random()) * Math.min(1, m * 1.6) : 0;
  }
  const drift = wind > 1 ? 1 : 0;
  for (let y = 0; y < FH - 1; y++) for (let x = 0; x < FW; x++) {
    const below = heat[(y + 1) * FW + x], r = Math.random();
    const nx = Math.min(FW - 1, Math.max(0, x + Math.round(r * 2 - 1 + drift * (r > 0.6 ? 1 : 0))));
    heat[y * FW + nx] = Math.max(0, below - r * 0.36 - (y < FH * 0.2 ? 0.2 : 0));
  }
  const d = f.img.data;
  for (let i = 0; i < FW * FH; i++) {
    const p = FIRE_PAL[Math.min(top, Math.floor(heat[i] * top / HOT))];
    d[i * 4] = p[0]; d[i * 4 + 1] = p[1]; d[i * 4 + 2] = p[2]; d[i * 4 + 3] = p[3];
  }
  f.g.putImageData(f.img, 0, 0);
}
export function drawFire(ctx, f, view) {
  if (f.lit < 0.03) return;
  ctx.drawImage(f.c, Math.round(f.x - FW / 2 - view.x), Math.round(f.y - FH - view.y));
}

// ---------- pond: glints, drifting light, koi under the surface ----------
export function buildPond(ground, ellipses) {
  const [cx0, cy0] = [Math.min(...ellipses.map((e) => e[0] - e[2])), Math.min(...ellipses.map((e) => e[1] - e[3]))];
  const cx1 = Math.max(...ellipses.map((e) => e[0] + e[2])), cy1 = Math.max(...ellipses.map((e) => e[1] + e[3]));
  const w = Math.ceil(cx1 - cx0), h = Math.ceil(cy1 - cy0);
  const g = off(w, h).getContext('2d'); g.drawImage(ground, -cx0, -cy0);
  const d = g.getImageData(0, 0, w, h).data, water = [], mask = off(w, h), mg = mask.getContext('2d'), md = mg.createImageData(w, h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const X = x + cx0, Y = y + cy0;
    if (!ellipses.some((e) => ((X - e[0]) / e[2]) ** 2 + ((Y - e[1]) / e[3]) ** 2 < 0.92)) continue;
    const i = (y * w + x) * 4, r = d[i], gg = d[i + 1], b = d[i + 2];
    if (b >= r && gg >= r - 6 && r + gg + b < 330) { water.push([X, Y]); md.data[i + 3] = 255; }
  }
  mg.putImageData(md, 0, 0);
  const layer = off(w, h);
  const koi = [0, 1, 2].map((k) => ({ k, colors: k === 1 ? ['#f4f1ea', '#e0522a'] : k === 2 ? ['#f08a2c', '#f4f1ea'] : ['#e8642a', '#e8642a'] }));
  return { x: cx0, y: cy0, w, h, water, mask, layer, lg: layer.getContext('2d'), glints: [], koi, e: ellipses[0] };
}
export function drawPond(ctx, p, view, t, dt, day) {
  if (p.x + p.w < view.x || p.x > view.x + view.w || p.y + p.h < view.y || p.y > view.y + view.h) return;
  const g = p.lg;
  g.clearRect(0, 0, p.w, p.h);
  // Koi: three fish gliding under the surface, half seen.
  for (const f of p.koi) {
    const a = t * (0.16 + f.k * 0.04) + f.k * 2.1, [ex, ey, rx, ry] = p.e;
    const fx = ex + Math.cos(a) * rx * (0.55 + 0.1 * f.k) - p.x, fy = ey + Math.sin(a * 1.3) * ry * 0.5 - p.y;
    const dir = Math.atan2(Math.cos(a * 1.3) * 1.3 * ry * 0.5, -Math.sin(a) * rx * 0.6);
    const ux = Math.cos(dir), uy = Math.sin(dir);
    g.globalAlpha = 0.78;
    for (let s = -5; s <= 5; s++) {          // body: a tapered run of pixels along the heading
      const wdt = s > 3 ? 0 : s < -3 ? 0 : 1, wag = s < -2 ? Math.round(Math.sin(t * 8 + f.k) * (s + 2) * -0.4) : 0;
      const px = Math.round(fx + ux * s - uy * wag), py = Math.round(fy + uy * s + ux * wag);
      g.fillStyle = (s % 3 === 0) ? f.colors[1] : f.colors[0];
      g.fillRect(px - wdt, py - wdt, 1 + wdt * 2, 1 + wdt);
    }
  }
  // A school of neon tetras (from Ali's planted tank) darting together, and cherry shrimp
  // pottering along the bottom.
  const [ex, ey, rx, ry] = p.e, sa = t * 0.35, sx = ex + Math.cos(sa) * rx * 0.35 - p.x, sy = ey + Math.sin(sa * 1.7) * ry * 0.3 - p.y;
  const sdx = -Math.sin(sa) >= 0 ? 1 : -1;
  for (let i = 0; i < 9; i++) {
    const fx = Math.round(sx + Math.cos(i * 2.4) * 7 + Math.sin(t * 3 + i) * 1.5), fy = Math.round(sy + Math.sin(i * 1.7) * 4);
    g.globalAlpha = 0.9;
    g.fillStyle = '#4fd6ff'; g.fillRect(fx, fy, 3, 1);
    g.fillStyle = '#ff4a5a'; g.fillRect(fx + (sdx > 0 ? -1 : 2), fy + 1, 2, 1);
  }
  p.shrimp ||= [0, 1, 2, 3].map((k) => ({ a: k * 1.6, sp: 0.04 + k * 0.012 }));
  for (const q of p.shrimp) {
    q.a += dt * q.sp * (Math.sin(t * 0.7 + q.a) > -0.2 ? 1 : 0);
    const qx = Math.round(ex + Math.cos(q.a) * rx * 0.78 - p.x), qy = Math.round(ey + Math.sin(q.a) * ry * 0.7 - p.y);
    g.globalAlpha = 0.95; g.fillStyle = '#e0362f'; g.fillRect(qx, qy, 3, 1); g.fillStyle = '#ff8a72'; g.fillRect(qx + 1, qy - 1, 1, 1);
    if (Math.floor(t * 4 + q.a) % 2) { g.fillStyle = '#e0362f'; g.fillRect(qx + 3, qy - 1, 1, 1); }
  }
  g.globalAlpha = 1;
  // Light drifting across the water and pinpoint glints (sun by day, moon by night).
  g.fillStyle = day ? 'rgba(220,245,240,0.35)' : 'rgba(190,210,255,0.25)';
  for (let i = 0; i < 7; i++) {
    const lx = ((i * 53 + t * (6 + i)) % (p.w + 40)) - 20, ly = (i * 37) % p.h;
    g.fillRect(Math.round(lx), ly, 3 + (i % 3) * 2, 1);
  }
  if (Math.random() < dt * (day ? 22 : 8)) { const w = p.water[(Math.random() * p.water.length) | 0]; p.glints.push({ x: w[0] - p.x, y: w[1] - p.y, age: 0 }); }
  for (const s of p.glints) {
    s.age += dt;
    const k = 1 - Math.abs(s.age / 0.6 - 0.5) * 2;
    g.fillStyle = `rgba(255,255,255,${Math.max(0, k) * (day ? 0.9 : 0.6)})`;
    g.fillRect(Math.round(s.x), Math.round(s.y), 1, 1);
    if (k > 0.6) { g.fillRect(Math.round(s.x) - 1, Math.round(s.y), 3, 1); }
  }
  p.glints = p.glints.filter((s) => s.age < 0.6);
  // Keep it all on the water only.
  g.globalCompositeOperation = 'destination-in';
  g.drawImage(p.mask, 0, 0);
  g.globalCompositeOperation = 'source-over';
  ctx.drawImage(p.layer, p.x - view.x, p.y - view.y);
}

// ---------- butterflies: two-frame pixel wings over the flowers ----------
const BFLY = ['#f6d24a', '#f4f1ea', '#e98ab0'];
export function makeButterflies(spots) { return spots.map(([x, y], i) => ({ bx: x, by: y, ph: i * 1.7, c: BFLY[i % BFLY.length] })); }
export function drawButterflies(ctx, list, view, t) {
  for (const b of list) {
    const x = Math.round(b.bx + Math.sin(t * 0.5 + b.ph) * 60 + Math.sin(t * 1.3 + b.ph) * 14 - view.x);
    const y = Math.round(b.by + Math.sin(t * 0.7 + b.ph) * 26 - 18 - Math.abs(Math.sin(t * 2.2 + b.ph)) * 8 - view.y);
    const open = Math.sin(t * 18 + b.ph) > 0;
    ctx.fillStyle = 'rgba(20,40,20,0.18)'; ctx.fillRect(x - 2, y + 22, 4, 1);
    ctx.fillStyle = '#3a2a22'; ctx.fillRect(x, y - 1, 1, 4);
    ctx.fillStyle = b.c;
    if (open) { ctx.fillRect(x - 3, y - 2, 3, 3); ctx.fillRect(x + 1, y - 2, 3, 3); ctx.fillRect(x - 2, y + 1, 2, 2); ctx.fillRect(x + 1, y + 1, 2, 2); }
    else { ctx.fillRect(x - 1, y - 3, 1, 4); ctx.fillRect(x + 1, y - 3, 1, 4); }
  }
}

// ---------- smoke and embers above the fire ----------
export function fireBits(spawn, f, dt, wind) {
  if (f.lit < 0.3) return;
  if (Math.random() < dt * 9) spawn({ kind: 'ember', x: f.x + (Math.random() - 0.5) * 16, y: f.y - 20, vx: (Math.random() - 0.5) * 10 + wind * 6, vy: -30 - Math.random() * 25, life: 1 + Math.random() });
  if (Math.random() < dt * 3) spawn({ kind: 'smoke', x: f.x + (Math.random() - 0.5) * 8, y: f.y - 46, vx: 4 + wind * 10, vy: -14, life: 4 });
}
export function drawBits(ctx, bits, view) {
  for (const b of bits) {
    const k = b.age / b.life, x = Math.round(b.x - view.x), y = Math.round(b.y - view.y);
    if (b.kind === 'ember') { ctx.fillStyle = `rgba(255,${180 - k * 120 | 0},60,${1 - k})`; ctx.fillRect(x, y, 1, 1); }
    else { const r = 3 + k * 9 | 0; ctx.fillStyle = `rgba(200,200,205,${0.22 * (1 - k)})`; ctx.fillRect(x - r, y - (r >> 1), r * 2, r); }
  }
}
export function stepBits(bits, dt) {
  for (const b of bits) { b.age = (b.age || 0) + dt; b.x += b.vx * dt; b.y += b.vy * dt; b.vx *= 0.99; }
  return bits.filter((b) => b.age < b.life);
}
