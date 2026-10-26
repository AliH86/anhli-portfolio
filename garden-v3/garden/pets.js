// Ali's own pets, drawn from photos (pets/<name>/: still, walk/0..n, optional sit, sleep).
// In the garden they roam the lawn, nap by day, gather round Li now and then, and
// curl up near the porch at night. All sprites face right; facing left is a mirror.

const loadImg = (src) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => ok(null); i.src = src; });
const rnd = (a, b) => a + Math.random() * (b - a);

export async function loadPets(base) {
  const man = await (await fetch(`${base}manifest.json`)).json();
  const entries = await Promise.all(Object.entries(man).map(async ([name, def]) => {
    const [still, sit, sleep, walk] = await Promise.all([
      loadImg(`${base}${name}/still.png`),
      def.sit ? loadImg(`${base}${name}/sit.png`) : null,
      def.sleep ? loadImg(`${base}${name}/sleep.png`) : null,
      Promise.all([...Array(def.walk || 0).keys()].map((i) => loadImg(`${base}${name}/walk/${i}.png`))),
    ]);
    return [name, { name, still, sit: sit || undefined, sleep: sleep || undefined, walk: walk.length ? walk : [still] }];
  }));
  return Object.fromEntries(entries);
}

const LAWN = [[620, 820], [760, 900], [900, 780], [1000, 900], [560, 940], [840, 980], [1080, 960], [700, 760], [980, 800], [480, 860]];
const BEDS = [[560, 726], [620, 736], [740, 728], [800, 734], [880, 730], [960, 728], [520, 760], [1000, 760], [660, 760], [920, 760]];

export function makeGardenPets(sprites) {
  return Object.keys(sprites).map((name, i) => {
    const [x, y] = LAWN[i % LAWN.length];
    return { name, x: x + rnd(-20, 20), y: y + rnd(-10, 10), state: 'rest', wait: rnd(1, 6), path: [], flip: Math.random() < 0.5, t: rnd(0, 2), bed: BEDS[i % BEDS.length], speed: name === 'husky' || name === 'bo' ? 52 : 40 };
  });
}

export function stepGardenPets(list, dt, hour, rain, li, nav) {
  const night = hour < 6.5 || hour >= 21.5, wet = rain > 0.5;
  for (const p of list) {
    p.t += dt;
    const home = night || wet;
    if (p.state === 'walk') {
      const tgt = p.path[0];
      if (!tgt) { p.state = home ? 'sleep' : 'rest'; p.wait = rnd(4, 12); continue; }
      const dx = tgt[0] - p.x, dy = tgt[1] - p.y, d = Math.hypot(dx, dy);
      if (d < 2) { p.path.shift(); continue; }
      const st = Math.min(d, p.speed * dt); p.x += dx / d * st; p.y += dy / d * st;
      if (Math.abs(dx) > 1) p.flip = dx < 0;
      continue;
    }
    if (home && p.state !== 'sleep') { p.path = nav(p.x, p.y, ...p.bed); p.state = 'walk'; continue; }
    if (!home && p.state === 'sleep') { p.state = 'rest'; p.wait = rnd(1, 4); }
    if (p.state === 'sleep') continue;
    p.wait -= dt;
    if (p.wait > 0) continue;
    // Sometimes come and sit by Li; mostly wander the lawn.
    let goal;
    if (p.name === 'spaniel' && Math.random() < 0.35) goal = [700 + rnd(-6, 10), 1012];   // she likes to sit by Lucky
    else if (li && !li.hidden && Math.random() < 0.3) goal = [li.x + rnd(-70, 70), li.y + rnd(10, 40)];
    else { const g = LAWN[(Math.random() * LAWN.length) | 0]; goal = [g[0] + rnd(-40, 40), g[1] + rnd(-20, 20)]; }
    p.path = nav(p.x, p.y, ...goal); p.state = 'walk';
  }
}

export function petDraws(list, sprites, ctx, view, t) {
  return list.map((p) => ({ y: p.y, draw: () => {
    const s = sprites[p.name];
    const img = p.state === 'walk' ? s.walk[Math.floor(p.t * 10) % s.walk.length] : p.state === 'sleep' ? (s.sleep || s.sit || s.still) : (s.sit && Math.sin(p.t * 0.3 + p.x) > 0 ? s.sit : s.still);
    if (!img) return;
    const x = Math.round(p.x - img.width / 2 - view.x), y = Math.round(p.y - img.height - view.y);
    ctx.fillStyle = 'rgba(20,40,20,0.25)';
    ctx.beginPath(); ctx.ellipse(Math.round(p.x - view.x), Math.round(p.y - 1 - view.y), img.width * 0.3, 3, 0, 0, Math.PI * 2); ctx.fill();
    // A little breath when resting: the top half lifts by a pixel.
    const breathe = p.state !== 'walk' && Math.sin(t * 2 + p.x) > 0.6 ? 1 : 0;
    if (p.flip) { ctx.save(); ctx.scale(-1, 1); ctx.drawImage(img, -x - img.width, y - breathe); ctx.restore(); }
    else ctx.drawImage(img, x, y - breathe);
  } }));
}

export function petBoxes(list) { return list.map((p) => ({ x: p.x, y: p.y, w: 44, h: 44 })); }

// ---------- the two canaries and the hamsters ----------
const PERCH = [[1212, 452], [1168, 420], [1262, 470], [905, 360], [640, 520], [1330, 560]];
export async function loadSmall(base) {
  const L = (n) => loadImg(`${base}_small/${n}.png`);
  return {
    canary: { perch: await L('canary_perch'), flap: [await L('canary_f0'), await L('canary_f1'), await L('canary_f2'), await L('canary_f1')] },
    hamster: { eat: await L('hamster_eat'), still: await L('hamster_still'), run: [await L('hamster_r0'), await L('hamster_r1')] },
  };
}
export function makeSmall() {
  return {
    canaries: [0, 1].map((i) => ({ x: PERCH[i][0], y: PERCH[i][1], at: i, state: 'perch', wait: rnd(2, 6), t: rnd(0, 3), flip: i === 1, lift: 0 })),
    hamsters: [0, 1].map((i) => ({ x: 250 + i * 90, y: 742 + i * 14, state: 'eat', wait: rnd(1, 4), t: rnd(0, 2), flip: i === 1, gx: 0, gy: 0 })),
  };
}
export function stepSmall(sm, dt, hour, rain) {
  const day = hour >= 6 && hour < 19 && rain < 0.5;
  for (const c of sm.canaries) {
    c.t += dt; c.hidden = !day;
    if (c.state === 'fly') {
      c.k = Math.min(1, c.k + dt / c.dur); const e = c.k * c.k * (3 - 2 * c.k);
      c.x = c.x0 + (c.x1 - c.x0) * e; c.y = c.y0 + (c.y1 - c.y0) * e; c.lift = Math.sin(Math.PI * c.k) * 40;
      if (c.k >= 1) { c.state = 'perch'; c.wait = rnd(3, 9); c.lift = 0; }
      continue;
    }
    c.wait -= dt;
    if (c.wait <= 0) {
      let n; do n = (Math.random() * PERCH.length) | 0; while (n === c.at);
      const other = sm.canaries.find((q) => q !== c);
      if (Math.random() < 0.5 && other) n = other.at;      // they like to sit together
      c.at = n; Object.assign(c, { state: 'fly', k: 0, x0: c.x, y0: c.y, x1: PERCH[n][0] + rnd(-8, 8), y1: PERCH[n][1], dur: Math.max(0.8, Math.hypot(PERCH[n][0] - c.x, PERCH[n][1] - c.y) / 220), flip: PERCH[n][0] < c.x });
    }
  }
  for (const h of sm.hamsters) {
    h.t += dt; h.hidden = rain > 0.5;
    if (h.state === 'run') {
      const dx = h.gx - h.x, dy = h.gy - h.y, d = Math.hypot(dx, dy);
      if (d < 1.5) { h.state = Math.random() < 0.6 ? 'eat' : 'still'; h.wait = rnd(1.5, 5); continue; }
      const st = Math.min(d, 46 * dt); h.x += dx / d * st; h.y += dy / d * st; h.flip = dx < 0;
      continue;
    }
    h.wait -= dt;
    if (h.wait <= 0) { h.gx = Math.max(222, Math.min(430, h.x + rnd(-60, 60))); h.gy = Math.max(726, Math.min(770, h.y + rnd(-14, 14))); h.state = 'run'; }
  }
}
export function smallDraws(sm, sp, ctx, view, t) {
  const out = [], put = (img, x, y, flip, lift = 0) => {
    if (!img) return;
    const px = Math.round(x - img.width / 2 - view.x), py = Math.round(y - img.height - lift - view.y);
    if (flip) { ctx.save(); ctx.scale(-1, 1); ctx.drawImage(img, -px - img.width, py); ctx.restore(); } else ctx.drawImage(img, px, py);
  };
  for (const c of sm.canaries) if (!c.hidden) out.push({ y: c.state === 'fly' ? 99999 : c.y, draw: () => put(c.state === 'fly' ? sp.canary.flap[Math.floor(t * 14) % 4] : sp.canary.perch, c.x, c.y, c.flip, c.lift) });
  for (const h of sm.hamsters) if (!h.hidden) out.push({ y: h.y, draw: () => {
    ctx.fillStyle = 'rgba(20,40,20,0.22)'; ctx.fillRect(Math.round(h.x - 6 - view.x), Math.round(h.y - 1 - view.y), 12, 2);
    put(h.state === 'run' ? sp.hamster.run[Math.floor(t * 12) % 2] : h.state === 'eat' ? (Math.floor(t * 3) % 2 ? sp.hamster.eat : sp.hamster.still) : sp.hamster.still, h.x, h.y, h.flip);
  } });
  return out;
}
