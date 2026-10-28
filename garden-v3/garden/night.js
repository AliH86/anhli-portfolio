// Night creatures: an owl in the frangipani, frogs croaking on the lily pads, moths
// circling the lamps, bats crossing the sky, more fireflies by the water.
// They come out at dusk and slip away at dawn; owl eyes and moths catch the light.

import { loadSprite } from './sprite-loader.js?v=70';
const loadImg = (src) => loadSprite(src, true);
const rnd = (a, b) => a + Math.random() * (b - a);

export async function loadNight(base) {
  const L = (n) => loadImg(`${base}${n}.png`);
  return { owl: { perch: await L('owl_perch'), turn: await L('owl_turn'), fly: [await L('owl_f0'), await L('owl_f1')] }, frog: { sit: await L('frog_sit'), croak: await L('frog_croak') } };
}

const OWL_PERCH = [[1214, 448], [1150, 418]];
const PADS = [[640, 1096], [770, 1128], [690, 1146]];
export function makeNight() {
  return {
    owl: { x: OWL_PERCH[0][0], y: OWL_PERCH[0][1], at: 0, state: 'perch', wait: rnd(6, 14), turn: 0, lift: 0, flip: false },
    frogs: PADS.map(([x, y], i) => ({ x, y, croak: 0, wait: rnd(1, 6) + i, flip: i === 1 })),
    moths: [], bats: [], k: 0,
  };
}

export function stepNight(n, dt, t, nightK, lights, spawn) {
  n.k = nightK;
  if (nightK < 0.4) return;
  const o = n.owl;
  if (o.state === 'fly') {                       // a slow loop out over the lawn and back
    o.p = Math.min(1, o.p + dt / 6);
    const a = o.p * Math.PI * 2;
    o.x = o.cx + Math.sin(a) * 220; o.y = o.cy - Math.sin(a * 0.5) * 30 + (o.ty - o.cy) * o.p; o.lift = 60 + Math.sin(a) * 20;
    o.flip = Math.cos(a) < 0;
    if (o.p >= 1) { o.state = 'perch'; o.x = OWL_PERCH[o.at][0]; o.y = OWL_PERCH[o.at][1]; o.lift = 0; o.wait = rnd(14, 30); }
  } else {
    o.wait -= dt; o.turn -= dt;
    if (o.turn < -rnd(3, 7)) o.turn = rnd(1, 2.5);          // turn the head now and then
    if (o.wait <= 0) { o.at = 1 - o.at; Object.assign(o, { state: 'fly', p: 0, cx: o.x, cy: o.y, ty: OWL_PERCH[o.at][1] }); }
  }
  for (const f of n.frogs) { f.wait -= dt; if (f.wait <= 0) { f.croak = 0.9; f.wait = rnd(2.5, 8); } f.croak -= dt; }
  // Moths around the lit lamps.
  const lit = lights.filter((L) => L.on !== false && !L.fire);
  if (n.moths.length < lit.length * 2) { const L = lit[(Math.random() * lit.length) | 0]; if (L) n.moths.push({ L, a: rnd(0, 6), r: rnd(6, 16), sp: rnd(2, 4), ph: rnd(0, 6) }); }
  // Bats cross the top of the view every so often.
  if (Math.random() < dt * 0.12) n.bats.push({ x: -20, y: rnd(60, 260), vx: rnd(70, 110), ph: rnd(0, 6), across: true });
  for (const b of n.bats) b.x += b.vx * dt;
  n.bats = n.bats.filter((b) => b.x < 1600);
  // Extra fireflies drifting low over the pond and the hedges.
  if (Math.random() < dt * 8) spawn({ kind: 'firefly', x: rnd(520, 1060), y: rnd(980, 1220), life: 5, seed: Math.random() * 9 });
}

export function nightDraws(n, sp, ctx, view, t) {
  if (n.k < 0.4) return [];
  const out = [], put = (img, x, y, flip, lift = 0) => {
    if (!img) return;
    const px = Math.round(x - img.width / 2 - view.x), py = Math.round(y - img.height - lift - view.y);
    if (flip) { ctx.save(); ctx.scale(-1, 1); ctx.drawImage(img, -px - img.width, py); ctx.restore(); } else ctx.drawImage(img, px, py);
  };
  const o = n.owl;
  out.push({ y: o.state === 'fly' ? 99999 : o.y, draw: () => put(o.state === 'fly' ? sp.owl.fly[Math.floor(t * 6) % 2] : o.turn > 0 ? sp.owl.turn : sp.owl.perch, o.x, o.y, o.flip, o.lift) });
  for (const f of n.frogs) out.push({ y: f.y - 30, draw: () => put(f.croak > 0 && Math.floor(t * 6) % 2 ? sp.frog.croak : sp.frog.sit, f.x, f.y, f.flip) });
  return out;
}

// Drawn after the night grade, so they read as lit.
export function drawNightGlow(n, ctx, view, t) {
  if (n.k < 0.4) return;
  const a = Math.min(1, (n.k - 0.4) / 0.4);
  const o = n.owl;
  if (o.state === 'perch' && Math.sin(t * 0.9) > -0.85) {      // eyes, blinking now and then
    const ex = Math.round(o.x - view.x + (o.turn > 0 ? -3 : 1)), ey = Math.round(o.y - 22 - view.y);
    ctx.fillStyle = `rgba(255, 214, 110, ${0.9 * a})`; ctx.fillRect(ex, ey, 1, 1); ctx.fillRect(ex + 4, ey, 1, 1);
  }
  for (const m of n.moths) {
    m.a += m.sp / 60;
    const x = Math.round(m.L.x + Math.cos(m.a) * m.r - view.x), y = Math.round(m.L.y - 6 + Math.sin(m.a * 1.3 + m.ph) * m.r * 0.6 - view.y);
    ctx.fillStyle = `rgba(255, 244, 214, ${0.85 * a})`; ctx.fillRect(x, y, Math.sin(t * 30 + m.ph) > 0 ? 2 : 1, 1);
  }
  ctx.fillStyle = `rgba(16, 14, 24, ${0.9 * a})`;
  for (const b of n.bats) {
    const x = Math.round(b.x - view.x), y = Math.round(b.y + Math.sin(t * 3 + b.ph) * 10 - view.y * 0.3), up = Math.sin(t * 18 + b.ph) > 0;
    ctx.fillRect(x, y, 2, 2);
    if (up) { ctx.fillRect(x - 3, y - 2, 3, 1); ctx.fillRect(x + 2, y - 2, 3, 1); } else { ctx.fillRect(x - 3, y + 1, 3, 1); ctx.fillRect(x + 2, y + 1, 3, 1); }
  }
}
