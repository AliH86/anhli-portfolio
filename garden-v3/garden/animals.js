// Small animals drawn at the garden's own scale (Li is ~130 px tall): a cat that
// naps by the hour, hens scratching by the vegetable beds, sparrows that take off
// when Li walks close. Sprites face right; facing left is a mirror.

import { loadSprite } from './sprite-loader.js?v=70';
const loadImg = (src) => loadSprite(src, false);
const rnd = (a, b) => a + Math.random() * (b - a);

export async function loadAnimals(base) {
  const man = await (await fetch(`${base}manifest.json`, { cache: 'no-cache' })).json();
  const sp = {};
  for (const [k, def] of Object.entries(man)) {
    sp[k] = { still: await loadImg(`${base}${k}/still.png`) };
    for (const [a, n] of Object.entries(def)) if (a !== 'size') sp[k][a] = await Promise.all([...Array(n).keys()].map((i) => loadImg(`${base}${k}/${a}/${i}.png`)));
  }
  sp.cat.sleep = await loadImg(`${base}cat/sleep.png`);
  return sp;
}

// Where they live, in picture pixels.
const CAT = {
  porch: [905, 643], bench: [1168, 694],
  wander: [[700, 780], [880, 900], [1040, 820], [560, 760], [980, 960], [640, 880]],
};
const HEN_AREA = [95, 715, 470, 880];
const SPARROW_LAWN = [[620, 830], [760, 900], [1000, 880], [900, 760], [540, 940], [1080, 980]];
const PERCHES = [[1200, 430], [220, 250], [1350, 300], [80, 420], [700, 120]];

export function makeAnimals() {
  return {
    cat: { x: CAT.porch[0], y: CAT.porch[1], state: 'sleep', at: 'porch', t: 0, path: [], flip: false, wait: 0 },
    hens: [0, 1].map((i) => ({ x: 270 + i * 130, y: 800 + i * 30, state: 'peck', t: rnd(0, 3), wait: rnd(1, 4), flip: i === 1, phase: i * 0.3 })),
    sparrows: SPARROW_LAWN.slice(0, 4).map(([x, y], i) => ({ x, y, gx: x, gy: y, state: 'peck', t: rnd(0, 2), wait: rnd(2, 6), flip: i % 2 === 1, lift: 0 })),
  };
}

export function callGardenCat(c,li,nav) {
  c.attention=20; c.called=true; c.goNap=null;
  if(c.state!=='sleep'&&c.state!=='hop'){
    c.path=nav(c.x,c.y,li.x+50,li.y+28);c.state='walk';c.called=false;
  }
}
function stepCat(c, dt, hour, nav, rain, li) {
  const benchTaken = li && (li.pose === 'sit' || li.wantPose === 'sit');
  c.attention=Math.max(0,(c.attention||0)-dt);
  const napAt = c.attention>0 ? null : hour < 7 || hour >= 19 || rain > 0.5 || benchTaken ? 'porch' : hour >= 10 && hour < 15 ? 'bench' : null;   // rain: back under the eaves
  c.t += dt;
  if (c.state === 'hop') {                     // a short arc up onto the porch or the bench
    c.k = Math.min(1, c.k + dt * 1.8);
    c.x = c.hx0 + (c.hx1 - c.hx0) * c.k; c.y = c.hy0 + (c.hy1 - c.hy0) * c.k; c.lift = Math.sin(Math.PI * c.k) * 18;
    if (c.k >= 1) { c.lift = 0; c.state = c.hopTo ? 'sleep' : 'sit'; c.at = c.hopTo; c.wait = rnd(2, 5); }
    return;
  }
  if (c.state === 'sleep') {
    if (napAt === c.at) return;
    // Wake: hop down to the lawn in front of the nap spot.
    const [dx, dy] = c.at === 'bench' ? [1168, 760] : [905, 720];
    Object.assign(c, { state: 'hop', k: 0, hx0: c.x, hy0: c.y, hx1: dx, hy1: dy, hopTo: null, flip: false });
    return;
  }
  if (c.state === 'walk') {
    const tgt = c.path[0];
    if (!tgt) {
      if (c.goNap && Math.hypot(c.x-(c.goNap==='bench'?1168:905), c.y-(c.goNap==='bench'?760:720))<12) { const s = CAT[c.goNap]; Object.assign(c, { state: 'hop', k: 0, hx0: c.x, hy0: c.y, hx1: s[0], hy1: s[1], hopTo: c.goNap }); c.goNap = null; }
      else { c.goNap=null; c.state = 'sit'; c.wait = rnd(3, 9); }
      return;
    }
    const dx = tgt[0] - c.x, dy = tgt[1] - c.y, d = Math.hypot(dx, dy);
    if (d < 2) { c.path.shift(); return; }
    const st = Math.min(d, 38 * dt); c.x += dx / d * st; c.y += dy / d * st;
    if (Math.abs(dx) > 1) c.flip = dx < 0;
    return;
  }
  // Sitting: either respond to Ba ba, head for a nap, or stroll somewhere new.
  if(c.called&&c.attention>0){c.called=false;c.path=nav(c.x,c.y,li.x+50,li.y+28);c.state='walk';return;}
  c.wait -= dt;
  if (napAt) { const front = napAt === 'bench' ? [1168, 760] : [905, 720]; c.path = nav(c.x, c.y, ...front); c.goNap = napAt; c.state = 'walk'; return; }
  if (c.wait <= 0) { const w = CAT.wander[(Math.random() * CAT.wander.length) | 0]; c.path = nav(c.x, c.y, w[0], w[1]); c.state = 'walk'; }
}

function stepHen(h, dt, fits) {
  h.t += dt;
  if (h.state === 'walk') {
    const dx = h.gx - h.x, dy = h.gy - h.y, d = Math.hypot(dx, dy);
    if (d < 2) { h.state = 'peck'; h.wait = rnd(2, 6); h.t = 0; return; }
    const st = Math.min(d, 24 * dt), nx = h.x + dx / d * st, ny = h.y + dy / d * st;
    if (!fits(nx, ny)) { h.state = 'peck'; h.wait = rnd(1, 3); return; }
    h.x = nx; h.y = ny; h.flip = dx < 0;
    return;
  }
  h.wait -= dt;
  if (h.wait <= 0) {
    const [x0, y0, x1, y1] = HEN_AREA;
    h.gx = Math.max(x0, Math.min(x1, h.x + rnd(-110, 110))); h.gy = Math.max(y0, Math.min(y1, h.y + rnd(-50, 50)));
    h.state = 'walk'; h.t = 0;
  }
}

function stepSparrow(s, dt, li) {
  s.t += dt;
  if (s.state === 'fly') {
    s.k = Math.min(1, s.k + dt / s.dur);
    const e = s.k * s.k * (3 - 2 * s.k);
    s.x = s.fx0 + (s.fx1 - s.fx0) * e; s.y = s.fy0 + (s.fy1 - s.fy0) * e; s.lift = Math.sin(Math.PI * s.k) * s.arc + (s.toPerch ? 0 : 0);
    if (s.k >= 1) { s.state = s.toPerch ? 'away' : 'peck'; s.wait = s.toPerch ? rnd(8, 16) : rnd(2, 6); s.lift = 0; }
    return;
  }
  if (s.state === 'away') {            // up in a tree, out of the picture's action
    s.wait -= dt;
    if (s.wait <= 0) { const g = SPARROW_LAWN[(Math.random() * SPARROW_LAWN.length) | 0]; takeOff(s, g[0] + rnd(-30, 30), g[1] + rnd(-20, 20), false); }
    return;
  }
  // On the lawn: peck, hop a little, flee when Li comes close.
  if (li && !li.hidden && Math.hypot(li.x - s.x, li.y - s.y) < 110) { const p = PERCHES[(Math.random() * PERCHES.length) | 0]; takeOff(s, p[0], p[1], true); return; }
  s.wait -= dt;
  if (s.wait <= 0) {
    if (Math.random() < 0.25) { const p = PERCHES[(Math.random() * PERCHES.length) | 0]; takeOff(s, p[0], p[1], true); }
    else { s.x += rnd(-14, 14); s.y += rnd(-6, 6); s.flip = Math.random() < 0.5; s.wait = rnd(1.5, 5); }
  }
}
function takeOff(s, x, y, toPerch) {
  const d = Math.hypot(x - s.x, y - s.y);
  Object.assign(s, { state: 'fly', k: 0, fx0: s.x, fy0: s.y, fx1: x, fy1: y, dur: Math.max(0.6, d / 260), arc: toPerch ? 30 : Math.min(60, d * 0.3), toPerch, flip: x < s.x });
}

export function stepAnimals(an, dt, hour, rain, li, nav, fits) {
  stepCat(an.cat, dt, hour, nav, rain, li);
  const day = hour >= 6 && hour < 18.2;
  for (const h of an.hens) { h.hidden = !day || rain > 0.7; if (!h.hidden) stepHen(h, dt, fits); }
  for (const s of an.sparrows) { s.hidden = !day || rain > 0.5; if (!s.hidden) stepSparrow(s, dt, li); }
}

// Returns draw jobs { y, draw } to sort with Li by feet.
export function animalDraws(an, sp, ctx, view, t) {
  const out = [];
  const put = (img, x, y, flip, lift = 0, shadowW = 10) => {
    const px = Math.round(x - img.width / 2 - view.x), py = Math.round(y - img.height - lift - view.y);
    ctx.fillStyle = 'rgba(20,40,20,0.25)';
    ctx.beginPath(); ctx.ellipse(Math.round(x - view.x), Math.round(y - 1 - view.y), shadowW * (lift ? 0.7 : 1), 3, 0, 0, Math.PI * 2); ctx.fill();
    if (flip) { ctx.save(); ctx.scale(-1, 1); ctx.drawImage(img, -px - img.width, py); ctx.restore(); }
    else ctx.drawImage(img, px, py);
  };
  const c = an.cat;
  out.push({ y: c.y, draw: () => {
    if (c.state === 'sleep') {
      const img = sp.cat.sleep, breathe = Math.sin(t * 2.2) > 0.3 ? 1 : 0;   // the back rises by a pixel
      const px = Math.round(c.x - img.width / 2 - view.x), py = Math.round(c.y - img.height - view.y);
      ctx.fillStyle = 'rgba(20,40,20,0.22)'; ctx.beginPath(); ctx.ellipse(Math.round(c.x - view.x), Math.round(c.y - 1 - view.y), 18, 3, 0, 0, Math.PI * 2); ctx.fill();
      const cut = Math.floor(img.height * 0.5);
      ctx.drawImage(img, 0, cut, img.width, img.height - cut, px, py + cut, img.width, img.height - cut);
      ctx.drawImage(img, 0, 0, img.width, cut, px, py - breathe, img.width, cut + breathe);
    } else {
      const fr = c.state === 'walk' ? sp.cat.walk[Math.floor(t * 10) % sp.cat.walk.length] : sp.cat.still;
      put(fr, c.x, c.y, c.flip, c.lift || 0, 14);
    }
  } });
  for (const h of an.hens) if (!h.hidden) out.push({ y: h.y, draw: () => {
    const fr = h.state === 'walk' ? sp.hen.walk[Math.floor(h.t * 9) % sp.hen.walk.length] : sp.hen.peck[Math.floor((h.t + h.phase) * 7) % sp.hen.peck.length];
    put(fr, h.x, h.y, h.flip, 0, 11);
  } });
  for (const s of an.sparrows) if (!s.hidden && s.state !== 'away') out.push({ y: s.y, draw: () => {
    const fr = s.state === 'fly' ? sp.sparrow.flap[Math.floor(t * 16) % sp.sparrow.flap.length] : sp.sparrow.peck[Math.floor(s.t * 8) % sp.sparrow.peck.length];
    put(fr, s.x, s.y, s.flip, s.lift || 0, 5);
  } });
  return out;
}

// Feet boxes of the visible animals, for deciding when a cut-out stands in front.
export function actorBoxes(an) {
  const out = [{ x: an.cat.x, y: an.cat.y - (an.cat.lift || 0), w: 40, h: 30 }];
  for (const h of an.hens) if (!h.hidden) out.push({ x: h.x, y: h.y, w: 34, h: 34 });
  for (const s of an.sparrows) if (!s.hidden && s.state !== 'away') out.push({ x: s.x, y: s.y, w: 16, h: 16 });
  return out;
}
