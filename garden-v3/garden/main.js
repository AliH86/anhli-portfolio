import * as S from './scene.js?v=29';
import * as live from '../map/living.js?v=29';
import * as A from './alive.js?v=29';
import * as Z from './animals.js?v=29';
import { initStall } from './stall.js?v=29';
import { initMenu } from './menu.js?v=29';
import { initRooms, initGate, ROOMS } from './rooms.js?v=29';
import * as AM from './ambient.js?v=29';
import * as N from './night.js?v=29';
import * as P from './pets.js?v=29';

const SOUND = '../web/assets/';
const loadImg = (src) => new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = src; });
const ground = await loadImg('../world/garden_day.png');
await A.buildWind(ground);
const pond = A.buildPond(ground, S.BLOCK_ELLIPSES);
const fire = A.makeFire(S.FIRE[0], S.FIRE[1]);
const butterflies = A.makeButterflies(S.BUTTERFLIES);
let bits = [];
const frontMeta = await (await fetch('../world/front/front.json')).json();
const front = await Promise.all(Object.entries(frontMeta).map(async ([name, m]) => ({ name, ...m, img: await loadImg(`../world/front/${name}.png`) })));
const zoo = await Z.loadAnimals('../animals/');
const animals = Z.makeAnimals();
const petSprites = await P.loadPets('../pets/');
const pets = P.makeGardenPets(petSprites);
const luckyImg = await loadImg('../world/lucky.png');
const liSay = { text: '', until: 0 };
const smallSprites = await P.loadSmall('../pets/');
const small = P.makeSmall();
const nightSprites = await N.loadNight('../pets/_night/');
const night_ = N.makeNight();
const stall = await initStall({ onOpenChange: (on) => {
  document.body.classList.toggle('at-stall', on);
  if (!on) return;
  tag.classList.remove('on'); li.dir = 'south'; li.hidden = false; li.userUntil = performance.now() / 1000 + 600;
  if (Math.hypot(li.x - S.STALL_HOST[0], li.y - S.STALL_HOST[1]) > 40) walkTo(...S.STALL_HOST);   // Li comes over to host
} });
const bubbleEl = document.getElementById('bubble');
const rooms = await initRooms({
  onOpenChange: (id) => {
    document.body.classList.toggle('in-room', !!id);
    if (!id) return;
    if (stall.isOpen) stall.close();
    tag.classList.remove('on'); li.hidden = false; li.userUntil = performance.now() / 1000 + 600;
    const R = ROOMS[id]; if (Math.hypot(li.x - R.host[0], li.y - R.host[1]) > 40) walkTo(...R.host);
  },
  onPlayVideo: () => stall.pause(),
});
const AU_LINH = 'https://au-linh-ky-thu.netlify.app/';
const menu = initMenu({
  sprites: zoo,
  pets: petSprites,
  items: [
    { id: 'stall', label: 'Sạp nhạc', icon: 'ui/menu/stall.png' },
    { id: 'house', label: 'Nhà Li', icon: 'ui/menu/house.png' },
    { id: 'garden', label: 'Vườn rau', icon: 'ui/menu/garden.png' },
    { id: 'pond', label: 'Ao sen', icon: 'ui/menu/pond.png' },
    { id: 'hammock', label: 'Góc võng', icon: 'ui/menu/hammock.png' },
    { id: 'cine', label: 'Rạp phim', icon: 'ui/menu/cine.png' },
    { id: 'aulinh', label: 'Ấu Linh ↗', icon: 'ui/menu/aulinh.png', hint: 'Cổng sang game Ấu Linh (mở tab mới)' },
  ],
  onPick: (it) => {
    if (it.id === 'aulinh') { window.open(AU_LINH, '_blank', 'noopener'); return; }
    const z = S.ZONES.find((q) => q.id === it.id); if (!z) return;
    li.userUntil = performance.now() / 1000 + 60; li.hidden = false; cam.wide = false;
    if (rooms.current) rooms.close(); if (stall.isOpen) stall.close();
    walkTo(...(ROOMS[it.id] ? ROOMS[it.id].host : z.go)); pendingOpen = it.id === 'stall' || ROOMS[it.id] ? it.id : null;
  },
});
let pendingOpen = null;      // a zone to open once Li gets there
let notes = [];              // music notes floating up from the stall

const tag = document.getElementById('tag');

// ---------- Li: two outfits, idle + walk in 8 directions ----------
const DIRS8 = ['east', 'north-east', 'north', 'north-west', 'west', 'south-west', 'south', 'south-east'];
const liM = await (await fetch('../li2/manifest.json')).json();
const FPS = { idle: 4, walk: 10 };
const outfits = {};
for (const [name, counts] of Object.entries(liM.outfits)) {
  outfits[name] = {};
  for (const [anim, n] of Object.entries(counts)) {
    outfits[name][anim] = {};
    await Promise.all(DIRS8.map(async (d) => { outfits[name][anim][d] = await Promise.all([...Array(n).keys()].map((i) => loadImg(`../li2/${name}/${anim}/${d}/${i}.png`))); }));
  }
}
const OUTFITS = Object.keys(outfits);
const li = { x: S.START[0], y: S.START[1], dir: 'south', anim: 'idle', t: 0, target: null, path: [], outfit: OUTFITS[0] };

// ---------- where Li can walk ----------
const inRect = (x, y, r) => x > r[0] && x < r[2] && y > r[1] && y < r[3];
const inEll = (x, y, e) => ((x - e[0]) / e[2]) ** 2 + ((y - e[1]) / e[3]) ** 2 < 1;
function walkable(x, y) {
  if (S.WALK_RECTS.some((r) => inRect(x, y, r))) return true;
  return !S.BLOCK_RECTS.some((r) => inRect(x, y, r)) && !S.BLOCK_ELLIPSES.some((e) => inEll(x, y, e));
}
// Li has a body: test a small footprint, not a single point.
const FOOT = [[0, 0], [-12, 0], [12, 0], [0, -6]];
const fits = (x, y) => FOOT.every(([dx, dy]) => walkable(x + dx, y + dy));

const G = 16, GW = Math.ceil(S.W / G), GH = Math.ceil(S.H / G);
const free = new Uint8Array(GW * GH);
for (let gy = 0; gy < GH; gy++) for (let gx = 0; gx < GW; gx++) free[gy * GW + gx] = fits((gx + 0.5) * G, (gy + 0.5) * G) ? 1 : 0;
function nearestFree(x, y) {
  let gx = Math.floor(x / G), gy = Math.floor(y / G);
  for (let r = 0; r < 40; r++) for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
    const nx = gx + dx, ny = gy + dy;
    if (nx >= 0 && ny >= 0 && nx < GW && ny < GH && free[ny * GW + nx]) return [nx, ny];
  }
  return [gx, gy];
}
function findPath(sx, sy, tx, ty) {
  const s = nearestFree(sx, sy), e = nearestFree(tx, ty);
  const key = (x, y) => y * GW + x, open = [[0, s[0], s[1]]], came = new Map(), cost = new Map([[key(...s), 0]]);
  while (open.length) {
    open.sort((a, b) => a[0] - b[0]);
    const [, x, y] = open.shift();
    if (x === e[0] && y === e[1]) {
      const path = []; let k = key(x, y);
      while (came.has(k)) { path.unshift([(k % GW + 0.5) * G, (Math.floor(k / GW) + 0.5) * G]); k = came.get(k); }
      if (fits(tx, ty)) path.push([tx, ty]);
      return path;
    }
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= GW || ny >= GH || !free[key(nx, ny)]) continue;
      if (dx && dy && (!free[key(x + dx, y)] || !free[key(x, y + dy)])) continue;   // no corner cutting
      const c = cost.get(key(x, y)) + (dx && dy ? 1.42 : 1), k = key(nx, ny);
      if (c < (cost.get(k) ?? 1e9)) { cost.set(k, c); came.set(k, key(x, y)); open.push([c + Math.hypot(e[0] - nx, e[1] - ny), nx, ny]); }
    }
    if (cost.size > 12000) break;
  }
  return [];
}
// Straighten the grid path: skip points while the straight line stays walkable.
function smooth(path, from = [li.x, li.y]) {
  const out = [];
  for (let i = 0; i < path.length; i++) {
    let j = i;
    while (j + 1 < path.length && lineFree(from, path[j + 1])) j++;
    out.push(path[j]); from = path[j]; i = j;
  }
  return out;
}
function lineFree(a, b) {
  const n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 6);
  for (let i = 1; i <= n; i++) if (!fits(a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n)) return false;
  return true;
}
const nav = (sx, sy, tx, ty) => smooth(findPath(sx, sy, tx, ty), [sx, sy]);
function walkTo(x, y) { li.path = smooth(findPath(li.x, li.y, x, y)); li.target = li.path.shift() || null; }

// ---------- output ----------
const art = document.createElement('canvas');
const ctx = art.getContext('2d');
document.body.prepend(art);
let K = 2, VW = 640, VH = 360;
function resize() {
  const dpr = window.devicePixelRatio || 1, dw = innerWidth * dpr, dh = innerHeight * dpr;
  K = Math.max(1, Math.round(dh / 600));                  // whole-pixel scale, ~600 picture px tall
  VW = Math.ceil(dw / K); VH = Math.ceil(dh / K);
  art.width = VW; art.height = VH;
  art.style.width = `${VW * K / dpr}px`; art.style.height = `${VH * K / dpr}px`;
  ctx.imageSmoothingEnabled = false;
}
addEventListener('resize', resize);
resize();
const cam = { x: li.x - VW / 2, y: li.y - VH / 2, wide: false };

// ---------- input ----------
const toWorld = (ev) => {
  const r = art.getBoundingClientRect(), sx = (ev.clientX - r.left) / r.width * VW, sy = (ev.clientY - r.top) / r.height * VH;
  if (cam.wide) { const k = Math.min(VW / S.W, VH / S.H); return [(sx - (VW - S.W * k) / 2) / k, (sy - (VH - S.H * k) / 2) / k]; }
  return [cam.x + sx, cam.y + sy];
};
const zoneAt = (x, y) => S.ZONES.find((z) => inRect(x, y, z.r));
addEventListener('pointermove', (ev) => {
  const z = zoneAt(...toWorld(ev));
  if (z) { tag.innerHTML = `${z.label[0]}<small>${z.label[1]}</small>`; tag.style.left = `${ev.clientX}px`; tag.style.top = `${ev.clientY - 12}px`; tag.classList.add('on'); art.style.cursor = 'pointer'; }
  else { tag.classList.remove('on'); art.style.cursor = 'crosshair'; }
});
art.addEventListener('pointerdown', (ev) => {
  const [x, y] = toWorld(ev), z = zoneAt(x, y);
  li.userUntil = performance.now() / 1000 + 60;            // the visitor leads for a minute
  li.hidden = false;
  if (cam.wide) cam.wide = false;
  if (stall.isOpen && z?.id !== 'stall') stall.close();     // walking off closes the stall
  walkTo(...(z ? z.go : [x, y]));
  pendingOpen = z && (z.id === 'stall' || z.id === 'lucky' || ROOMS[z.id]) ? z.id : null;
  if (rooms.current && z?.id !== rooms.current) rooms.close();
});
// Keys (WASD / arrows) and, on touch screens, a thumb stick steer Li directly.
const keys = new Set(), stickV = { x: 0, y: 0 };
const KEYMAP = { KeyW: [0, -1], ArrowUp: [0, -1], KeyS: [0, 1], ArrowDown: [0, 1], KeyA: [-1, 0], ArrowLeft: [-1, 0], KeyD: [1, 0], ArrowRight: [1, 0] };
addEventListener('keydown', (e) => { if (KEYMAP[e.code] && !stall.isOpen && !(e.target instanceof HTMLInputElement)) { keys.add(e.code); e.preventDefault(); } });
addEventListener('keyup', (e) => keys.delete(e.code));
addEventListener('blur', () => keys.clear());
const stickEl = document.getElementById('stick'), knob = stickEl.querySelector('i');
if (matchMedia('(pointer: coarse)').matches) stickEl.hidden = false;
stickEl.addEventListener('pointerdown', (e) => { stickEl.setPointerCapture(e.pointerId); stickEl.dataset.on = '1'; moveStick(e); });
stickEl.addEventListener('pointermove', (e) => { if (stickEl.dataset.on) moveStick(e); });
for (const ev of ['pointerup', 'pointercancel']) stickEl.addEventListener(ev, () => { delete stickEl.dataset.on; stickV.x = stickV.y = 0; knob.style.transform = ''; });
function moveStick(e) {
  const r = stickEl.getBoundingClientRect(), R = r.width / 2;
  let dx = e.clientX - r.left - R, dy = e.clientY - r.top - R; const d = Math.hypot(dx, dy);
  if (d > R) { dx *= R / d; dy *= R / d; }
  knob.style.transform = `translate(${dx}px, ${dy}px)`;
  const k = d < R * 0.18 ? 0 : 1 / R; stickV.x = dx * k; stickV.y = dy * k;
}
// ---------- chill: after a quiet while the UI fades away and the camera drifts ----------
// through the garden like a music screensaver; any touch, key or mouse move brings it back.
const CHILL_AFTER = 20, CHILL_MUSIC = 8;   // the garden drifts on its own; sooner while music plays
let lastInput = performance.now() / 1000, chill = false;
const TOUR = [[700, 640], [1250, 700], [1200, 1060], [760, 1080], [300, 700], [880, 860]];
const wake = () => { lastInput = performance.now() / 1000; if (chill) { chill = false; document.body.classList.remove('chill'); } };
for (const ev of ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart']) addEventListener(ev, wake, { passive: true });
const chillCap = document.getElementById('chill-cap');
{ const ld = document.getElementById('loading'); ld.classList.add('done'); setTimeout(() => ld.remove(), 700); }
initGate({ onEnter: () => { lastInput = performance.now() / 1000; } });
const clockEl = document.getElementById('clock');
const PREVIEW = [7.5, 12, 17.8, 20.5, 23]; let pi = -1;
clockEl.addEventListener('click', () => { pi = (pi + 1) % (PREVIEW.length + 1); if (pi === PREVIEW.length) live.setHour(new Date().getHours() + new Date().getMinutes() / 60); else live.setHour(PREVIEW[pi]); li.userUntil = 0; });
const wBtn = document.getElementById('weather');
wBtn.addEventListener('click', () => { const i = (live.WEATHER_CYCLE.indexOf(live.wx.override) + 1) % live.WEATHER_CYCLE.length; live.wx.override = live.WEATHER_CYCLE[i]; wBtn.title = `Thời tiết: ${live.wx.override ? live.WEATHER[live.wx.override].label : 'tự động'}`; });
const sBtn = document.getElementById('sound');
const showSound = (on) => { sBtn.setAttribute('aria-pressed', String(on)); sBtn.title = on ? 'Tắt âm thanh' : 'Bật âm thanh'; };
sBtn.addEventListener('click', (e) => { e.stopPropagation(); showSound(AM.toggleAmbient(SOUND)); });
// The garden's sound comes on with the first touch, unless the visitor turned it off before.
const firstTouch = () => { removeEventListener('pointerdown', firstTouch, true); removeEventListener('keydown', firstTouch, true); if (AM.wantsSound() && !AM.ambientOn()) showSound(AM.toggleAmbient(SOUND)); };
addEventListener('pointerdown', firstTouch, true); addEventListener('keydown', firstTouch, true);
document.getElementById('outfit').addEventListener('click', () => { li.outfit = OUTFITS[(OUTFITS.indexOf(li.outfit) + 1) % OUTFITS.length]; });
document.getElementById('wide').addEventListener('click', () => { cam.wide = !cam.wide; });

// ---------- loop ----------
let last = performance.now();
function tick(now) {
  const dt = Math.max(0, Math.min(0.05, (now - last) / 1000)); last = Math.max(last, now);
  const t = last / 1000;
  menu.frame(t, dt);
  const date = live.now(), hour = live.hourOf(date), grade = live.gradeAt(hour);
  live.stepWeather(date, dt, !live.wx.started); live.wx.started = true;
  const night = grade.night > 0.6;
  document.body.classList.toggle('night', night);
  clockEl.textContent = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} · ${live.wx.name === 'clear' && night ? 'trời quang' : live.WEATHER[live.wx.name].label}`;

  // Li follows his day unless the visitor is leading.
  if (!(li.userUntil > t)) {
    let slot = S.SCHEDULE.find((q) => hour >= q.from && hour < q.to) || S.SCHEDULE[0];
    if (slot.open && live.wx.rain > 0.5) slot = { ...slot, at: S.SHELTER };
    li.hidden = !!slot.sleep;
    if (slot.at && (li.goal?.[0] !== slot.at[0] || li.goal?.[1] !== slot.at[1])) {
      li.goal = slot.at;
      if (!li.placed) { [li.x, li.y] = slot.at; li.placed = true; } else walkTo(...slot.at);
    }
    if (slot.at && !li.target) li.dir = slot.face;
  }
  if (li.hidden && Math.random() < dt * 0.7) live.spawn({ kind: 'zzz', x: 700, y: 470, life: 3 });

  let moving = false;
  let ix = stickV.x, iy = stickV.y;
  for (const k of keys) { ix += KEYMAP[k][0]; iy += KEYMAP[k][1]; }
  const im = Math.hypot(ix, iy);
  if (im > 0.05) {                       // steering: slide along walls one axis at a time
    li.target = null; li.path = []; pendingOpen = null; li.hidden = false;
    li.userUntil = t + 60;
    const sp = 120 * dt * Math.min(1, im) / im, nx = li.x + ix * sp, ny = li.y + iy * sp;
    if (fits(nx, ny)) { li.x = nx; li.y = ny; moving = true; }
    else if (fits(nx, li.y)) { li.x = nx; moving = true; }
    else if (fits(li.x, ny)) { li.y = ny; moving = true; }
    li.dir = DIRS8[(Math.round(Math.atan2(-iy, ix) / (Math.PI / 4)) + 8) % 8];
  } else if (li.target) {
    const [gx, gy] = li.target, dx = gx - li.x, dy = gy - li.y, d = Math.hypot(dx, dy);
    if (d < 2) li.target = li.path.shift() || null;
    else {
      const st = Math.min(d, 120 * dt), nx = li.x + dx / d * st, ny = li.y + dy / d * st;
      if (fits(nx, ny) || !fits(li.x, li.y)) { li.x = nx; li.y = ny; moving = true; li.stuck = 0; }   // stuck inside an edge: step out
      else if (fits(nx, li.y)) { li.x = nx; moving = true; }                          // slide along the obstacle
      else if (fits(li.x, ny)) { li.y = ny; moving = true; }
      else if (!li.stuck) { li.stuck = 1; const end = li.path.length ? li.path[li.path.length - 1] : li.target; walkTo(...end); }   // try a fresh path once
      else { li.target = null; li.path = []; li.stuck = 0; }
      li.dir = DIRS8[(Math.round(Math.atan2(-dy, dx) / (Math.PI / 4)) + 8) % 8];
    }
  }
  if (pendingOpen && ROOMS[pendingOpen] && !li.target) { rooms.open(pendingOpen); pendingOpen = null; }
  if (rooms.current && !li.target && !moving) li.dir = ROOMS[rooms.current].face;
  if (pendingOpen === 'lucky' && !li.target) { li.dir = 'west'; liSay.text = 'Lucky ơi, Li ghé thăm nè.'; liSay.until = t + 5; pendingOpen = null; }
  if (pendingOpen && !li.target) { if (Math.hypot(li.x - S.STALL_HOST[0], li.y - S.STALL_HOST[1]) < 60) { li.dir = 'south'; stall.open(); } pendingOpen = null; }
  if (stall.isOpen && !li.target && !moving) li.dir = 'south';
  const anim = moving ? 'walk' : 'idle';
  if (anim !== li.anim) { li.anim = anim; li.t = 0; }
  li.t += dt;

  // Camera eases after Li, clamped to the picture.
  // At the stall the camera frames the stall with Li beside it, between the signs and the player.
  if (rooms.current) lastInput = t;   // a room is being read: stay put
  if (!chill && t - lastInput > (stall.playing ? CHILL_MUSIC : CHILL_AFTER) && !cam.wide) { chill = true; document.body.classList.add('chill'); }
  let fx = rooms.current ? (VW < 420 ? ROOMS[rooms.current].host[0] : ROOMS[rooms.current].cam[0]) : stall.isOpen ? (VW < 420 ? 1330 : 1250) : li.x, fy = rooms.current ? (VW < 420 ? ROOMS[rooms.current].host[1] + VH * 0.12 : ROOMS[rooms.current].cam[1]) : stall.isOpen ? (VW < 420 ? 760 : 690) : li.y - 40;
  if (chill) {                                   // drift slowly from one view to the next, ~40 s each
    const k = (t / 40) % TOUR.length, i = Math.floor(k), f = k - i, e = f * f * (3 - 2 * f);
    const a = TOUR[i], b = TOUR[(i + 1) % TOUR.length];
    fx = a[0] + (b[0] - a[0]) * e; fy = a[1] + (b[1] - a[1]) * e;
    chillCap.querySelector('b').textContent = stall.playing && document.getElementById('np-title').textContent ? `♪ ${document.getElementById('np-title').textContent}` : 'vườn của Li';
    chillCap.querySelector('small').textContent = clockEl.textContent;
  }
  const tx = Math.min(Math.max(fx - VW / 2, 0), Math.max(0, S.W - VW)), ty = Math.min(Math.max(fy - VH / 2, 0), Math.max(0, S.H - VH));
  { const ease = chill ? 0.6 : 3; cam.x += (tx - cam.x) * Math.min(1, dt * ease); cam.y += (ty - cam.y) * Math.min(1, dt * ease); }
  const cx = Math.round(cam.x), cy = Math.round(cam.y), view = { x: cx, y: cy, w: VW, h: VH };

  if (night && Math.random() < dt * 6) live.spawn({ kind: 'firefly', x: 120 + Math.random() * 1300, y: 700 + Math.random() * 500, life: 5, seed: Math.random() * 9 });
  if (live.wx.wind > 1 && Math.random() < dt * 4) live.spawn({ kind: 'leaf', x: cx - 10, y: cy + Math.random() * VH, life: 8, seed: Math.random() * 9 });
  if (Math.random() < dt * (0.6 + live.wx.rain * 6)) { const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()); live.spawn({ kind: 'ripple', x: S.POND.x + Math.cos(a) * r * S.POND.rx, y: S.POND.y + Math.sin(a) * r * S.POND.ry, life: 1.4 }); }
  live.stepParticles(dt, t, view);
  Z.stepAnimals(animals, dt, hour, live.wx.rain, li, nav, fits);
  P.stepGardenPets(pets, dt, hour, live.wx.rain, li, nav);
  P.stepSmall(small, dt, hour, live.wx.rain);
  const fireLit = live.inHours(hour, [[18.5, 23]]) && live.wx.rain < 0.5;
  A.stepFire(fire, dt, fireLit, live.wx.wind);
  A.fireBits((b) => bits.push(b), fire, dt, live.wx.wind);
  bits = A.stepBits(bits, dt);

  if (stall.playing && Math.random() < dt * 1.6) notes.push({ x: 1395 + Math.random() * 40, y: 600, age: 0, life: 3.2, ph: Math.random() * 6 });
  for (const n of notes) { n.age += dt; n.y -= 16 * dt; }
  notes = notes.filter((n) => n.age < n.life);
  for (const L of S.LIGHTS) L.on = L.lucky ? live.inHours(hour, [[18, 6]]) : L.window ? live.inHours(hour, [[18, 22.5]]) : L.fire ? live.inHours(hour, [[18.5, 23]]) && live.wx.rain < 0.5 : true;
  const gust = Math.max(0, Math.min(1, (0.55 + 0.45 * Math.sin(t * 0.37) * Math.sin(t * 0.11 + 1) - 0.1) / 0.9));
  const nearPond = Math.max(0, 1 - Math.hypot(cx + VW / 2 - S.POND.x, cy + VH / 2 - S.POND.y) / 600);
  const nearFire = Math.max(0, 1 - Math.hypot(cx + VW / 2 - S.FIRE[0], cy + VH / 2 - S.FIRE[1]) / 500) * fire.lit;
  AM.updateAmbient({ hour, night: grade.night, wind: live.wx.wind, gust, rain: live.wx.rain, music: stall.playing, nearPond, fire: nearFire }, t);
  N.stepNight(night_, dt, t, grade.night, S.LIGHTS, live.spawn);

  ctx.fillStyle = '#20301c'; ctx.fillRect(0, 0, VW, VH);
  if (cam.wide) {
    const k = Math.min(VW / S.W, VH / S.H), ox = (VW - S.W * k) / 2, oy = (VH - S.H * k) / 2;
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(ground, ox, oy, S.W * k, S.H * k);
    ctx.imageSmoothingEnabled = false;
    live.drawOverlay(ctx, { x: -ox / k, y: -oy / k, w: VW, h: VH }, t, grade, []);
    return;
  }
  ctx.drawImage(ground, cx, cy, VW, VH, 0, 0, VW, VH);
  A.windAt(t, live.wx.wind);
  A.drawWind(ctx, view, t);
  A.drawPond(ctx, pond, view, t, dt, grade.night < 0.5);
  // Li and the animals, nearest feet drawn last.
  const draws = [{ y: S.LUCKY[1], draw: () => luckyImg && ctx.drawImage(luckyImg, Math.round(S.LUCKY[0] - luckyImg.width / 2 - cx), Math.round(S.LUCKY[1] - luckyImg.height - cy)) },...Z.animalDraws(animals, zoo, ctx, view, t), ...P.petDraws(pets, petSprites, ctx, view, t), ...P.smallDraws(small, smallSprites, ctx, view, t), ...N.nightDraws(night_, nightSprites, ctx, view, t)];
  if (!li.hidden) draws.push({ y: li.y, draw: () => {
    const fr = outfits[li.outfit][li.anim][li.dir];
    const img = fr[Math.floor(li.t * FPS[li.anim]) % fr.length];
    ctx.fillStyle = 'rgba(20,40,20,0.28)';
    ctx.beginPath(); ctx.ellipse(Math.round(li.x - cx), Math.round(li.y - 2 - cy), 22, 6, 0, 0, Math.PI * 2); ctx.fill();
    ctx.drawImage(img, Math.round(li.x - liM.ax - cx), Math.round(li.y - liM.ay - cy));
  } });
  // A tall cut-out is redrawn only while someone stands behind it and overlaps it,
  // so its leaves keep swaying in the painted layer the rest of the time.
  const actors = [...(li.hidden ? [] : [{ x: li.x, y: li.y, w: 50, h: 130 }]), ...Z.actorBoxes(animals), ...P.petBoxes(pets)];
  for (const f of front) {
    const behind = actors.some((a) => a.y < f.base && a.x + a.w / 2 > f.x && a.x - a.w / 2 < f.x + f.w && a.y > f.y && a.y - a.h < f.y + f.h);
    if (behind) draws.push({ y: f.base, draw: () => ctx.drawImage(A.warpSprite(f, t), f.x - cx, f.y - cy) });
  }
  draws.sort((a, b) => a.y - b.y).forEach((d) => d.draw());
  if (hour > 7 && hour < 17.5 && live.wx.rain < 0.3) A.drawButterflies(ctx, butterflies, view, t);
  for (const n of notes) {        // tiny pixel quavers
    const a = Math.min(1, n.age * 2, (n.life - n.age) * 1.5), x = Math.round(n.x + Math.sin(n.age * 2 + n.ph) * 6 - cx), y = Math.round(n.y - cy);
    ctx.fillStyle = `rgba(43,33,24,${a})`; ctx.fillRect(x, y, 3, 2); ctx.fillRect(x + 2, y - 6, 1, 7); ctx.fillRect(x + 3, y - 6, 2, 1); ctx.fillRect(x + 5, y - 5, 1, 2);
    ctx.fillStyle = `rgba(255,195,90,${a})`; ctx.fillRect(x + 1, y, 1, 1);
  }
  live.drawParticles(ctx, cx, cy);
  live.drawOverlay(ctx, view, t, grade, S.LIGHTS);
  // Li's speech bubble rides above his head while he hosts the stall or plays music.
  const say = li.hidden ? '' : (stall.bubble() || rooms.bubble() || (t < liSay.until ? liSay.text : ''));
  bubbleEl.hidden = !say || cam.wide;
  if (say) {
    if (bubbleEl.textContent !== say) bubbleEl.textContent = say;
    const r = art.getBoundingClientRect();
    const bw = bubbleEl.offsetWidth / 2 + 8;   // keep the whole bubble on screen
    bubbleEl.style.left = `${Math.min(innerWidth - bw, Math.max(bw, r.left + (li.x - cx) / VW * r.width))}px`;
    bubbleEl.style.top = `${r.top + (li.y - 150 - cy) / VH * r.height}px`;
  }
  A.drawBits(ctx, bits, view);
  N.drawNightGlow(night_, ctx, view, t);
  A.drawFire(ctx, fire, view);              // fire makes its own light: drawn after the night grade
}
function loop(now) { tick(now); requestAnimationFrame(loop); }
requestAnimationFrame(loop);
window.__debug = { li, cam, live, animals, pets, walkTo, fits, setHour: live.setHour, setWeather: (w) => { live.wx.override = w; }, advance: (s, fps = 30) => { for (let i = 0; i < s * fps; i++) tick(last + 1000 / fps); } };
