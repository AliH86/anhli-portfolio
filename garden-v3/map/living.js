// The living layer of the map: real-time clock, day/night grade, weather, night
// lights, animals, particles and ambient sound. main.js feeds it the world and
// calls update / sprites / overlay each frame.

const params = new URLSearchParams(location.search);

// ---------- clock ----------
let offset = 0;
export function setHour(h) { const n = new Date(); offset = (h - n.getHours() - n.getMinutes() / 60) * 3600e3; }
if (params.get('t')) { const [h, m] = params.get('t').split(':').map(Number); setHour(h + (m || 0) / 60); }
export const now = () => new Date(Date.now() + offset);
export const hourOf = (d) => d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600;
export const inHours = (hour, spans) => spans.some(([f, to]) => (f < to ? hour >= f && hour < to : hour >= f || hour < to));

// ---------- day / night grade ----------
const KEYS = [ // hour, multiply rgb (0..1.1), add rgb, night
  [0, [0.36, 0.42, 0.66], [0, 0.01, 0.05], 1],
  [5, [0.4, 0.46, 0.7], [0, 0.01, 0.05], 1],
  [6.1, [0.92, 0.82, 0.84], [0.05, 0.02, 0.03], 0.3],
  [7.3, [1, 1, 1], [0, 0, 0], 0],
  [15.8, [1, 1, 1], [0, 0, 0], 0],
  [17.6, [1.07, 0.92, 0.78], [0.05, 0.02, 0], 0.05],
  [18.7, [0.72, 0.58, 0.7], [0.03, 0, 0.03], 0.5],
  [19.8, [0.38, 0.45, 0.68], [0, 0.01, 0.05], 1],
  [24, [0.36, 0.42, 0.66], [0, 0.01, 0.05], 1],
];
export function gradeAt(hour) {
  let i = 0; while (KEYS[i + 1][0] <= hour) i++;
  const a = KEYS[i], b = KEYS[i + 1], k = (hour - a[0]) / (b[0] - a[0]);
  const l = (p, q) => p.map((v, j) => v + (q[j] - v) * k);
  return { mul: l(a[1], b[1]), add: l(a[2], b[2]), night: a[3] + (b[3] - a[3]) * k };
}

// ---------- weather (one per day, same for every visitor) ----------
export const WEATHER = {
  clear: { label: 'nắng', cloud: 0.25, rain: 0, fog: 0, wind: 0.5, gray: 0 },
  cloudy: { label: 'nhiều mây', cloud: 0.85, rain: 0, fog: 0, wind: 0.65, gray: 0.12 },
  windy: { label: 'gió lộng', cloud: 0.55, rain: 0, fog: 0, wind: 1.35, gray: 0.04 },
  rain: { label: 'mưa', cloud: 1, rain: 1, fog: 0.15, wind: 0.9, gray: 0.3 },
  mist: { label: 'sương sớm', cloud: 0.4, rain: 0, fog: 0.8, wind: 0.2, gray: 0.08 },
};
export const WEATHER_CYCLE = [null, 'clear', 'cloudy', 'windy', 'rain', 'mist'];
export const wx = { name: 'clear', override: params.get('w') || null, cloud: 0.3, rain: 0, fog: 0, wind: 0.5, gray: 0 };
function dailyWeather(d) {
  const key = d.getFullYear() * 400 + d.getMonth() * 32 + d.getDate();
  const r = ((Math.imul(key, 2654435761) >>> 0) % 1000) / 1000, h = hourOf(d);
  if (r < 0.25 && h >= 5 && h < 8.5) return 'mist';
  return r < 0.5 ? 'clear' : r < 0.68 ? 'cloudy' : r < 0.84 ? 'windy' : r < 0.95 ? 'rain' : 'clear';
}
export function stepWeather(d, dt, snap) {
  wx.name = (WEATHER[wx.override] && wx.override) || dailyWeather(d);
  const tg = WEATHER[wx.name], k = snap ? 1 : Math.min(1, dt * 0.35);
  for (const key of ['cloud', 'rain', 'fog', 'wind', 'gray']) wx[key] += (tg[key] - wx[key]) * k;
}

// ---------- particles ----------
const parts = [];
export function spawn(p) { if (parts.length < 900) parts.push({ age: 0, life: 3, vx: 0, vy: 0, ...p }); }
export function stepParticles(dt, t, view) {
  // Rain across the visible view, splashing where it lands.
  const n = Math.floor(wx.rain * 520 * dt * (view.w / 600) + Math.random());
  for (let i = 0; i < n; i++) spawn({ kind: 'rain', x: view.x + Math.random() * (view.w + 60) - 30, y: view.y - 8, vx: 30 + wx.wind * 40, vy: 420, life: 2, land: view.y + Math.random() * view.h });
  for (let k = parts.length - 1; k >= 0; k--) {
    const p = parts[k];
    p.age += dt;
    if (p.kind === 'rain') {
      p.x += p.vx * dt; p.y += p.vy * dt;
      if (p.y >= p.land) { parts.splice(k, 1); spawn({ kind: 'splash', x: p.x, y: p.land, life: 0.22 }); continue; }
    } else if (p.kind === 'firefly') {
      p.x += Math.sin(t * 1.3 + p.seed) * 6 * dt; p.y += Math.cos(t * 1.1 + p.seed) * 4 * dt;
    } else if (p.kind === 'zzz') { p.x += 4 * dt; p.y -= 8 * dt; }
    else if (p.kind === 'leaf') { p.x += (60 + wx.wind * 60) * dt; p.y += Math.sin(t * 3 + p.seed) * 14 * dt; }
    else if (p.kind === 'ripple') { /* stays */ }
    if (p.age > p.life) parts.splice(k, 1);
  }
}
const Z = ['.......', '.#####.', '....#..', '...#...', '..#....', '.#####.', '.......'];
export function drawParticles(ctx, cx, cy) {
  for (const p of parts) {
    const x = Math.round(p.x - cx), y = Math.round(p.y - cy), fade = Math.min(1, p.age / 0.4, (p.life - p.age) / 0.8);
    if (p.kind === 'rain') { ctx.fillStyle = 'rgba(200,220,245,0.75)'; ctx.fillRect(x, y, 1, 5); }
    else if (p.kind === 'splash') { ctx.fillStyle = 'rgba(220,235,255,0.8)'; ctx.fillRect(x - 1, y, 1, 1); ctx.fillRect(x + 1, y, 1, 1); ctx.fillRect(x, y - 1, 1, 1); }
    else if (p.kind === 'firefly') {
      const b = (0.5 + 0.5 * Math.sin(p.age * 3 + p.seed)) * fade;
      ctx.fillStyle = `rgba(255,220,90,${b * 0.3})`; ctx.fillRect(x - 1, y - 1, 3, 3);
      ctx.fillStyle = `rgba(255,245,160,${b})`; ctx.fillRect(x, y, 1, 1);
    } else if (p.kind === 'zzz') {
      ctx.fillStyle = `rgba(235,240,255,${fade})`;
      Z.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '#') ctx.fillRect(x + i, y + j, 1, 1); }));
    } else if (p.kind === 'leaf') { ctx.fillStyle = `rgba(110,170,70,${fade})`; ctx.fillRect(x, y, 2, 1); }
    else if (p.kind === 'ripple') {
      const r = Math.round(1 + p.age * 6);
      ctx.strokeStyle = `rgba(230,245,255,${0.6 * (1 - p.age / p.life)})`; ctx.lineWidth = 1;
      ctx.strokeRect(x - r, y - Math.round(r / 2), r * 2, r);
    }
  }
}

// ---------- overlay: cloud shadows, grade, lights, mist ----------
export function drawOverlay(ctx, view, t, grade, lights) {
  const { w, h } = view;
  // Soft cloud shadows drifting with the wind (stronger on cloudy days, gone at night).
  const sh = (0.07 + wx.cloud * 0.12) * (1 - grade.night);
  if (sh > 0.01) {
    // Soft, wide patches that fade to nothing at their edges and drift slowly with the wind.
    for (let i = 0; i < 3; i++) {
      const R = 360 + i * 90, span = 2000;
      const sx = (((i * 677 + t * (5 + wx.wind * 6)) % span) + span) % span - 400 - view.x * 0.15;
      const sy = ((i * 331) % 700) - 150 - view.y * 0.15;
      const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, R);
      g.addColorStop(0, `rgba(30,50,70,${sh * 0.55})`); g.addColorStop(0.55, `rgba(30,50,70,${sh * 0.3})`); g.addColorStop(1, 'rgba(30,50,70,0)');
      ctx.save(); ctx.translate(sx, sy); ctx.scale(1, 0.55); ctx.translate(-sx, -sy);
      ctx.fillStyle = g; ctx.fillRect(sx - R, sy - R, R * 2, R * 2); ctx.restore();
    }
  }
  // Day/night grade, flattened and cooled by grey weather.
  const avg = (grade.mul[0] + grade.mul[1] + grade.mul[2]) / 3;
  const mul = grade.mul.map((v, j) => (v + (avg - v) * wx.gray * (j === 2 ? 0.6 : 1)) * (1 - wx.gray * 0.35));
  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = `rgb(${mul.map((v) => Math.min(255, v * 255) | 0).join(',')})`;
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = 'lighter';
  const warm = mul.map((v, j) => Math.max(0, v - 1) * 90 + grade.add[j] * 255);
  if (warm.some((v) => v > 0.5)) { ctx.fillStyle = `rgb(${warm.map((v) => v | 0).join(',')})`; ctx.fillRect(0, 0, w, h); }
  // Night lights: stepped glows, flickering.
  if (grade.night > 0.1 || wx.rain > 0.5) {
    const k = Math.max(grade.night, wx.rain * 0.4);
    for (const L of lights) {
      if (L.on === false) continue;
      const x = Math.round(L.x - view.x), y = Math.round(L.y - view.y);
      if (x < -60 || y < -60 || x > w + 60 || y > h + 60) continue;
      const fl = L.flicker ? 0.85 + 0.15 * Math.sin(t * 8 + L.x) * Math.sin(t * 3.1) : 1;
      // A soft radial glow: bright core easing out to nothing, no hard rings.
      const c = L.rgb || '255,200,120', a = k * fl, R = L.r * 1.25;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, R);
      grad.addColorStop(0, `rgba(${c},${0.55 * a})`);
      grad.addColorStop(0.18, `rgba(${c},${0.32 * a})`);
      grad.addColorStop(0.45, `rgba(${c},${0.12 * a})`);
      grad.addColorStop(0.75, `rgba(${c},${0.04 * a})`);
      grad.addColorStop(1, `rgba(${c},0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(x - R, y - R, R * 2, R * 2);
    }
  }
  ctx.globalCompositeOperation = 'source-over';
  // Mist: a veil thickest toward the top of the view (the far side of the island).
  if (wx.fog > 0.02) {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    const c = grade.night > 0.5 ? '120,135,170' : '232,238,242';
    g.addColorStop(0, `rgba(${c},${0.75 * wx.fog})`); g.addColorStop(0.6, `rgba(${c},${0.35 * wx.fog})`); g.addColorStop(1, `rgba(${c},${0.12 * wx.fog})`);
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  }
  // Rain darkens the whole scene a touch more.
  if (wx.rain > 0.05) { ctx.fillStyle = `rgba(40,55,75,${0.12 * wx.rain})`; ctx.fillRect(0, 0, w, h); }
}

// ---------- sound ----------
export const sound = { on: false, ctx: null, fireLevel: 0 };
export function toggleSound(base) {
  if (!sound.ctx) {
    const ctx = new AudioContext(), master = ctx.createGain(); master.connect(ctx.destination);
    const file = (src) => { const el = new Audio(src); el.loop = true; const g = ctx.createGain(); g.gain.value = 0; ctx.createMediaElementSource(el).connect(g).connect(master); el.play().catch(() => {}); return g; };
    const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const noise = (type, f, q) => { const s = ctx.createBufferSource(); s.buffer = buf; s.loop = true; const fl = ctx.createBiquadFilter(); fl.type = type; fl.frequency.value = f; fl.Q.value = q; const g = ctx.createGain(); g.gain.value = 0; s.connect(fl).connect(g).connect(master); s.start(); return { g, fl }; };
    Object.assign(sound, { ctx, master, birds: file(`${base}sound/garden-birds.mp3`), crickets: file(`${base}sound/night-crickets.mp3`), wind: noise('lowpass', 420, 0.7), rain: noise('highpass', 1400, 0.4), waves: noise('lowpass', 600, 0.5) });
  }
  sound.on = !sound.on;
  sound.master.gain.setTargetAtTime(sound.on ? 0.7 : 0, sound.ctx.currentTime, 0.3);
  if (sound.on) sound.ctx.resume();
  return sound.on;
}
export function updateSound(hour, grade, t, nearSea) {
  if (!sound.on) return;
  const n = sound.ctx.currentTime, ease = (p, v) => p.setTargetAtTime(v, n, 0.8);
  ease(sound.birds.gain, (hour > 5.5 && hour < 18.5 ? 1 : 0) * (1 - wx.rain) * 0.45);
  ease(sound.crickets.gain, grade.night * (1 - wx.rain * 0.7) * 0.4);
  ease(sound.wind.g.gain, Math.min(0.22, 0.03 + wx.wind * 0.08));
  ease(sound.rain.g.gain, wx.rain * 0.22);
  // Waves swell and fall, louder when the view is near the beach.
  ease(sound.waves.g.gain, (0.04 + 0.05 * Math.max(0, Math.sin(t * 0.55))) * (0.4 + 0.6 * nearSea));
}
