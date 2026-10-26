// The garden's soundscape. Two recorded beds (morning birds, night crickets) and a
// set of synthesised layers on top: bird calls of several kinds, leaves rustling in
// gusts, wind, rain with drops and far thunder, the pond trickling, the fire
// crackling, frogs and an owl at night. Everything ducks under the music.

const rnd = (a, b) => a + Math.random() * (b - a);
const S = { on: false, ctx: null };

function noiseBuffer(ctx, sec = 3) {
  const b = ctx.createBuffer(1, ctx.sampleRate * sec, ctx.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return b;
}
function bed(ctx, out, src) {
  const el = new Audio(src); el.loop = true; el.crossOrigin = 'anonymous';
  const g = ctx.createGain(); g.gain.value = 0; ctx.createMediaElementSource(el).connect(g).connect(out); el.play().catch(() => {});
  return g;
}
function noiseLayer(ctx, out, buf, type, f, q) {
  const s = ctx.createBufferSource(); s.buffer = buf; s.loop = true;
  const fl = ctx.createBiquadFilter(); fl.type = type; fl.frequency.value = f; fl.Q.value = q;
  const g = ctx.createGain(); g.gain.value = 0; s.connect(fl).connect(g).connect(out); s.start(rnd(0, 2));
  return { g, fl };
}

export function initAmbient(base) {
  const ctx = new AudioContext();
  const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -18; comp.ratio.value = 3;
  const master = ctx.createGain(); master.gain.value = 0;
  const duck = ctx.createGain(); duck.gain.value = 1;
  duck.connect(master).connect(comp).connect(ctx.destination);
  const buf = noiseBuffer(ctx);
  Object.assign(S, {
    ctx, master, duck, buf,
    birds: bed(ctx, duck, `${base}sound/garden-birds.mp3`),
    crickets: bed(ctx, duck, `${base}sound/night-crickets.mp3`),
    wind: noiseLayer(ctx, duck, buf, 'lowpass', 380, 0.6),
    rustle: noiseLayer(ctx, duck, buf, 'bandpass', 3200, 0.9),
    rain: noiseLayer(ctx, duck, buf, 'highpass', 1300, 0.4),
    rainLow: noiseLayer(ctx, duck, buf, 'lowpass', 500, 0.5),
    water: noiseLayer(ctx, duck, buf, 'bandpass', 1800, 2.5),
    next: { bird: 0, drop: 0, frog: 0, owl: 0, crackle: 0, leaf: 0, thunder: 0 },
  });
}

// ---------- one-shot voices ----------
function voice(freqs, { type = 'sine', dur = 0.12, gain = 0.05, pan = 0, at = 0 } = {}) {
  const { ctx, duck } = S, t0 = ctx.currentTime + at;
  const o = ctx.createOscillator(); o.type = type;
  const g = ctx.createGain(), p = ctx.createStereoPanner(); p.pan.value = pan;
  o.frequency.setValueAtTime(freqs[0], t0);
  freqs.slice(1).forEach((f, i) => o.frequency.exponentialRampToValueAtTime(f, t0 + dur * (i + 1) / (freqs.length - 1)));
  g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(gain, t0 + Math.min(0.02, dur * 0.2)); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g).connect(p).connect(duck); o.start(t0); o.stop(t0 + dur + 0.05);
}
function burst({ f = 3000, q = 1, dur = 0.05, gain = 0.05, pan = 0, at = 0 } = {}) {
  const { ctx, duck, buf } = S, t0 = ctx.currentTime + at;
  const s = ctx.createBufferSource(); s.buffer = buf;
  const fl = ctx.createBiquadFilter(); fl.type = 'bandpass'; fl.frequency.value = f; fl.Q.value = q;
  const g = ctx.createGain(), p = ctx.createStereoPanner(); p.pan.value = pan;
  g.gain.setValueAtTime(gain, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  s.connect(fl).connect(g).connect(p).connect(duck); s.start(t0, rnd(0, 2), dur + 0.05);
}
const BIRDS = [
  () => { const p = rnd(-0.8, 0.8), f = rnd(3200, 4600); for (let i = 0; i < 3; i++) voice([f, f * 0.7], { dur: 0.09, gain: 0.035, pan: p, at: i * 0.13 }); },    // tweet tweet
  () => { const p = rnd(-0.8, 0.8); for (let i = 0; i < 7; i++) voice([5200, 4300], { dur: 0.045, gain: 0.022, pan: p, at: i * 0.06 }); },                     // trill
  () => { const p = rnd(-0.7, 0.7), f = rnd(1800, 2600); voice([f, f * 1.5, f * 1.1], { dur: 0.32, gain: 0.03, pan: p }); voice([f * 1.2, f * 0.8], { dur: 0.25, gain: 0.025, pan: p, at: 0.4 }); },   // chào mào whistle
  () => { const p = rnd(-0.6, 0.6); voice([520, 470], { dur: 0.35, gain: 0.03, pan: p }); voice([560, 480], { dur: 0.5, gain: 0.03, pan: p, at: 0.45 }); voice([500, 440], { dur: 0.35, gain: 0.025, pan: p, at: 1.05 }); },   // cu gáy
  () => { const p = rnd(-0.8, 0.8), f = rnd(2600, 3400); voice([f, f * 1.6], { dur: 0.15, gain: 0.03, pan: p }); voice([f * 1.6, f * 0.9], { dur: 0.2, gain: 0.03, pan: p, at: 0.18 }); voice([f * 1.1, f * 1.4, f], { dur: 0.3, gain: 0.025, pan: p, at: 0.42 }); },   // chích chòe phrase
];

export function toggleAmbient(base) {
  if (!S.ctx) initAmbient(base);
  S.on = !S.on;
  S.master.gain.setTargetAtTime(S.on ? 0.9 : 0, S.ctx.currentTime, 0.5);
  if (S.on) S.ctx.resume();
  try { localStorage.setItem('li-garden-sound', S.on ? 'on' : 'off'); } catch { /* private mode */ }
  return S.on;
}
export const ambientOn = () => S.on;
export const wantsSound = () => { try { return localStorage.getItem('li-garden-sound') !== 'off'; } catch { return true; } };

// state: hour, night (0..1), wind (0..2), gust (0..1), rain (0..1), music, nearPond (0..1), fire (0..1)
export function updateAmbient(st, t) {
  if (!S.on) return;
  const { ctx } = S, n = ctx.currentTime, ease = (p, v, k = 0.8) => p.setTargetAtTime(v, n, k);
  const day = st.hour > 5.3 && st.hour < 18.6 ? 1 : 0, dawn = st.hour > 5 && st.hour < 8.5 ? 1 : 0;
  ease(S.duck.gain, st.music ? 0.32 : 1, 1.2);
  ease(S.birds.gain, day * (1 - st.rain * 0.85) * 0.38);
  ease(S.crickets.gain, st.night * (1 - st.rain * 0.7) * 0.42);
  const gustAmt = (0.4 + st.wind * 0.7) * st.gust;
  ease(S.wind.g.gain, Math.min(0.24, 0.025 + gustAmt * 0.08), 1.5);
  S.wind.fl.frequency.setTargetAtTime(260 + gustAmt * 420, n, 1.5);
  ease(S.rustle.g.gain, Math.min(0.09, gustAmt * 0.05), 0.6);
  ease(S.rain.g.gain, st.rain * 0.2, 1.5);
  ease(S.rainLow.g.gain, st.rain * 0.12, 1.5);
  ease(S.water.g.gain, 0.012 + st.nearPond * 0.05, 1);
  S.water.fl.frequency.setTargetAtTime(1500 + Math.sin(t * 7) * 400 + Math.sin(t * 13) * 200, n, 0.05);
  const nx = S.next;
  // Bird calls: thick at dawn, steady by day, none in rain or at night.
  if (day && st.rain < 0.5 && t > nx.bird) { BIRDS[(Math.random() * BIRDS.length) | 0](); nx.bird = t + (dawn ? rnd(0.8, 2.5) : rnd(2.5, 7)); }
  // Leaves crackling in gusts.
  if (gustAmt > 0.35 && t > nx.leaf) { for (let i = 0; i < 4; i++) burst({ f: rnd(2500, 6000), q: 2, dur: 0.03, gain: 0.02 * gustAmt, pan: rnd(-1, 1), at: i * rnd(0.02, 0.08) }); nx.leaf = t + rnd(0.2, 0.9); }
  // Raindrops on leaves and the pond; a far roll of thunder now and then in heavy rain.
  if (st.rain > 0.1 && t > nx.drop) { voice([rnd(1800, 3200), 900], { dur: 0.04, gain: 0.02 * st.rain, pan: rnd(-1, 1) }); nx.drop = t + rnd(0.03, 0.2) / st.rain; }
  if (st.rain > 0.75 && t > nx.thunder) { if (nx.thunder) { burst({ f: 90, q: 0.6, dur: 3.5, gain: 0.25 }); burst({ f: 160, q: 0.7, dur: 2.2, gain: 0.12, at: 0.4 }); } nx.thunder = t + rnd(25, 60); }
  // Fire crackle.
  if (st.fire > 0.3 && t > nx.crackle) { burst({ f: rnd(1500, 4000), q: 3, dur: 0.02, gain: 0.05 * st.fire, pan: rnd(-0.3, 0.3) }); nx.crackle = t + rnd(0.05, 0.5); }
  // Night: frogs by the pond, an owl now and then.
  if (st.night > 0.5 && st.rain < 0.6 && t > nx.frog) { const p = rnd(-0.6, 0.6), f = rnd(180, 260); for (let i = 0; i < 3; i++) voice([f, f * 1.3, f], { type: 'triangle', dur: 0.09, gain: 0.05, pan: p, at: i * 0.14 }); nx.frog = t + rnd(1.5, 5); }
  if (st.night > 0.6 && t > nx.owl) { if (nx.owl) { voice([420, 380], { dur: 0.5, gain: 0.04, pan: 0.5 }); voice([440, 390], { dur: 0.7, gain: 0.04, pan: 0.5, at: 0.7 }); } nx.owl = t + rnd(18, 40); }
}
