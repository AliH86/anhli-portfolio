import { PET_SCALE } from './pets.js?v=69';
// The bottom menu: a strip of lawn with the garden's places as buttons, and the
// garden's animals living on it. They stroll, peck and hop; hover a button and the
// nearest one trots over and bounces; pick one and they all jump.
// The pets canvas is drawn in art pixels and scaled 2x by CSS, so they keep the
// same pixel density as the garden itself.

const rnd = (a, b) => a + Math.random() * (b - a);
const SCALE = 1;   // shared species ratios; nearest-neighbor pixels
// Small, coherent line illustrations for the site's navigation.
const ICONS = {
  stall:'<circle cx="11" cy="12" r="7.5"/><circle cx="11" cy="12" r="2"/><path d="M18 3v6.5a2.5 2.5 0 1 1-1.5-2.3V4l4-1"/>',
  house:'<path d="M3 10.5 12 3l9 7.5M5.5 9.5v10h13v-10M10 19.5v-6h4v6"/><path d="M16 4.5V3h2v3"/>',
  garden:'<path d="M12 21v-9M12 15c-5 0-7.5-2.5-7.5-6.5C9 8.5 12 10 12 15ZM12 12c0-4.3 2.8-7 7.5-7 0 4.5-2.5 7-7.5 7Z"/><path d="M7 21h10"/>',
  pond:'<path d="M3 16c2-1.3 4-1.3 6 0s4 1.3 6 0 4-1.3 6 0M4 19c2 1.2 4 1.2 6 0s4-1.2 6 0 3 1 4 0"/><path d="M7 12c1.5-2 3.2-2.2 5 0 1.8-2.2 3.5-2 5 0-1 2-2.7 2.5-5 2.5S8 14 7 12ZM12 11.5V6M9.5 8.5 12 6l2.5 2.5"/>',
  hammock:'<path d="M3 6v14M21 6v14M3 8c3 0 4 1 5 3 1.2 2.4 2.3 4 4 4s2.8-1.6 4-4c1-2 2-3 5-3"/><path d="M5 10c2.4 5.3 4.4 7 7 7s4.6-1.7 7-7M2 20h3M19 20h3"/>',
  cine:'<path d="M4 5h16v11H4zM8 20h8M12 16v4"/><path d="m10 8 5 2.5-5 2.5z"/>',
  aulinh:'<path d="M7 20V10a5 5 0 0 1 10 0v10M5 20h14M9 20v-9a3 3 0 0 1 6 0v9"/><path d="M19 4v3M17.5 5.5h3M4 3v3M2.5 4.5h3"/>'
};

export function initMenu({ items, sprites, pets: petSprites = {}, onPick }) {
  const nav = document.getElementById('menu'), row = nav.querySelector('.menu-row');
  const cv = document.getElementById('menu-pets'), g = cv.getContext('2d');
  row.replaceChildren(...items.map((it) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'mbtn'; b.dataset.id = it.id; b.title = it.hint || it.label;
    b.innerHTML = `<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[it.id] || ''}</svg><span></span>`;
    b.querySelector('span').textContent = it.label;
    b.addEventListener('click', () => { for (const p of pets) hop(p, 1 + Math.random()); onPick(it); });
    b.addEventListener('pointerenter', () => callOver(b));
    b.addEventListener('focus', () => callOver(b));
    return b;
  }));

  const W = () => Math.ceil(innerWidth / SCALE), GROUND = 142, CH = 158;   // feet line in art px
  // Ali's pets take turns on the strip, a few at a time, plus a hen and a sparrow.
  const names = Object.keys(petSprites).sort(() => Math.random() - 0.5);
  let nextIn = 0;
  const onStrip = () => Math.min(names.length, innerWidth < 760 ? 3 : 5);
  const pets = [
    { kind: 'sparrow', x: 300, dir: -1, speed: 0, state: 'peck', wait: 1 },
    ...names.slice(0, onStrip()).map((n, i) => ({ kind: 'pet', name: n, x: 40 + i * 80, dir: i % 2 ? -1 : 1, speed: 14 + Math.random() * 8, state: 'walk', wait: 0, stay: rnd(25, 50) })),
  ].map((p) => ({ lift: 0, vy: 0, t: rnd(0, 2), target: null, joy: 0, ...p }));
  nextIn = onStrip();
  const fly = { x: 100, y: 8, ph: 0 };

  function hop(p, k = 1) { if (p.lift <= 0.01) p.vy = 70 + 30 * k; }
  function callOver(b) {
    const r = b.getBoundingClientRect(), x = (r.left + r.width / 2) / SCALE;
    const p = pets.reduce((a, q) => (Math.abs(q.x - x) < Math.abs(a.x - x) ? q : a));
    p.target = x; p.joy = 2;
  }

  function frame(t, dt) {
    if (!document.body.classList.contains('at-stall') && !document.body.classList.contains('in-room')) return;
    const w = W();
    if (cv.width !== w) { cv.width = w; cv.height = CH; cv.style.width = `${w * SCALE}px`; cv.style.height = `${CH * SCALE}px`; }
    g.imageSmoothingEnabled=false;
    g.clearRect(0, 0, cv.width, cv.height);
    for (const p of pets) {
      p.t += dt;
      // Gravity for hops.
      if (p.vy || p.lift > 0) { p.lift += p.vy * dt; p.vy -= 320 * dt; if (p.lift <= 0) { p.lift = 0; p.vy = 0; if (p.joy > 0) { p.joy--; hop(p, 0.4); } } }
      if (p.target != null) {                                  // trot over to the hovered button
        const dx = p.target - p.x;
        if (Math.abs(dx) < 3) { p.target = null; hop(p, 1); p.state = p.kind === 'hen' ? 'peck' : 'walk'; p.wait = rnd(2, 4); }
        else { p.dir = Math.sign(dx); p.x += p.dir * Math.max(p.speed, 22) * 1.8 * dt; p.state = 'walk'; }
      } else if (p.kind === 'sparrow') {                       // sparrows only hop
        p.wait -= dt;
        if (p.wait <= 0) { p.dir = Math.random() < 0.5 ? -1 : 1; p.x += p.dir * rnd(6, 14); hop(p, 0.2); p.wait = rnd(0.6, 2.2); }
      } else {
        p.wait -= dt;
        if (p.state === 'walk') { p.x += p.dir * p.speed * dt; if (!p.leaving && p.wait < -rnd(3, 6)) { p.state = p.kind === 'hen' ? 'peck' : 'sit'; p.wait = rnd(1.5, 4); } }
        else if (p.wait <= 0) { p.state = 'walk'; p.wait = 0; if (Math.random() < 0.4) p.dir *= -1; if (Math.random() < 0.25) hop(p, 0.3); }
      }
      // Shift change: a pet that has stayed long enough walks off one edge, the next one comes in.
      if (p.kind === 'pet' && names.length > onStrip()) {
        p.stay -= dt;
        if (p.stay < 0 && p.target == null) { p.leaving = true; p.state = 'walk'; p.dir = p.x < w / 2 ? -1 : 1; }
        if (p.leaving && (p.x < -30 || p.x > w + 30)) {
          const n = names[nextIn++ % names.length];
          Object.assign(p, { name: n, leaving: false, stay: rnd(25, 50), x: p.dir < 0 ? w + 25 : -25, dir: -p.dir, state: 'walk', wait: 0 });
        }
      }
      if (!p.leaving) { if (p.x < 62) { p.x = 62; p.dir = 1; } else if (p.x > w - 62) { p.x = w - 62; p.dir = -1; } }
      // Draw: sprites face right; mirror for left.
      const s = sprites[p.kind] || {};
      let img = s.still, pivot=null;
      if (p.kind === 'cat') img = p.state === 'walk' || p.target != null ? s.walk[Math.floor(p.t * 10) % s.walk.length] : s.still;
      else if (p.kind === 'hen') img = p.state === 'walk' || p.target != null ? s.walk[Math.floor(p.t * 9) % s.walk.length] : s.peck[Math.floor((p.t + (p.phase || 0)) * 7) % s.peck.length];
      else if (p.kind === 'sparrow') img = p.lift > 0 ? s.flap[Math.floor(p.t * 16) % s.flap.length] : s.peck[Math.floor(p.t * 8) % s.peck.length];
      else { const q=petSprites[p.name],clip=p.state!=='walk'&&p.target==null&&q.clips?.play; if(clip){img=clip.frames[Math.floor(p.t*clip.fps)%clip.frames.length];pivot=clip;}else img=p.state==='walk'||p.target!=null?q.walk[Math.floor(p.t*10)%q.walk.length]:(q.sit||q.still); }
      const scale=p.kind==='pet'?(PET_SCALE[p.name]||1):1,iw=Math.round(img.width*scale),ih=Math.round(img.height*scale);
      const x = Math.round(p.x - (pivot?.ax??img.width/2)*scale), y = Math.round(GROUND - (pivot?.ay??img.height)*scale - p.lift);
      g.fillStyle = 'rgba(20, 40, 20, .25)'; g.fillRect(Math.round(p.x - img.width * 0.28), GROUND - 1, Math.round(img.width * 0.56), 2);
      if (p.dir < 0) { g.save(); g.scale(-1, 1); g.drawImage(img, -x - iw, y,iw,ih); g.restore(); } else g.drawImage(img, x, y,iw,ih);
    }
    // A butterfly wandering above them.
    fly.ph += dt; fly.x = (w / 2) + Math.sin(fly.ph * 0.31) * w * 0.42; fly.y = 8 + Math.sin(fly.ph * 1.7) * 4;
    const fx = Math.round(fly.x), fy = Math.round(fly.y), open = Math.sin(fly.ph * 18) > 0;
    g.fillStyle = '#3a2a22'; g.fillRect(fx, fy - 1, 1, 3);
    g.fillStyle = '#f6d24a';
    if (open) { g.fillRect(fx - 3, fy - 2, 3, 3); g.fillRect(fx + 1, fy - 2, 3, 3); } else { g.fillRect(fx - 1, fy - 3, 1, 3); g.fillRect(fx + 1, fy - 3, 1, 3); }
  }
  return { frame };
}
