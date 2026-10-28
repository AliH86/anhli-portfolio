import { reveal, focusScope, arrive, reducedMotion, announce } from './motion.js?v=69';
// Li's music stall: a shelf of records, a player (vinyl or cassette), and timed
// lyrics for the songs that have them. Data is the live V2.2 catalog; lyrics use
// the V2.2 contract (data/lyrics/index.json -> per-track file). No lyric is ever
// guessed: a song without a registered file simply says so.

const $ = (s, r = document) => r.querySelector(s);
const fmt = (s) => (Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}` : '0:00');
const loadImg = (src) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => ok(null); i.src = src; });

// ---------- lyrics (same rules as garden-v2/garden-lyrics.js) ----------
const SECTIONS = new Set(['intro', 'verse', 'pre', 'chorus', 'bridge', 'outro']);
function validate(data, id) {
  if (!data || data.trackId !== id || data.featured !== true || !Array.isArray(data.lines)) throw Error('bad lyrics');
  let end = -1;
  return data.lines.map((l) => {
    if (!Number.isFinite(l.start) || !Number.isFinite(l.end) || l.start < end || l.end <= l.start || typeof l.text !== 'string' || !l.text.trim()) throw Error('bad timing');
    end = l.end;
    return { start: l.start, end: l.end, text: l.text, sub: typeof l.sub === 'string' ? l.sub : '', section: SECTIONS.has(l.section) ? l.section : '' };
  });
}
let lyricIndex = null; const lyricCache = new Map();
async function lyricsFor(id) {
  try {
    lyricIndex ||= fetch('./data/lyrics/index.json').then((r) => r.json());
    const path = (await lyricIndex).tracks?.[id];
    if (typeof path !== 'string' || !/^[a-zA-Z0-9_-]+\.json$/.test(path)) return null;
    if (!lyricCache.has(id)) lyricCache.set(id, fetch(`./data/lyrics/${path}`).then((r) => r.json()).then((d) => validate(d, id)).catch(() => null));
    return await lyricCache.get(id);
  } catch { lyricIndex = null; return null; }
}

// ---------- the player: painted skins, animated where it matters ----------
// Each skin is a front/3/4 pixel painting (ui/skins/*.png); the canvas redraws it
// and animates its parts: the record turns with the album as its label, reels
// spin, speaker cones breathe, level lights dance, the horn sends out sound.
const PW = 168, PH = 112;
export const SKINS = [
  { id: 'suitcase', label: 'Máy vali', src: 'ui/skins/suitcase.png', dx: 0, disc: { x: 81, y: 69, rx: 25, ry: 11, lr: 7 } },
  { id: 'boombox', label: 'Boombox', src: 'ui/skins/boombox.png', dx: 0, reels: [[74, 75], [95, 75]], cones: [[37, 77, 15], [131, 77, 15]], meters: [[40, 45, 16], [115, 45, 14]] },
  { id: 'gramophone', label: 'Loa kèn', src: 'ui/skins/gramophone.png', dx: 42, disc: { x: 58, y: 69, rx: 18, ry: 6, lr: 5 }, horn: [33, 34] },
];
function makeDeck(canvas) {
  canvas.width = PW; canvas.height = PH;
  const g = canvas.getContext('2d'); g.imageSmoothingEnabled = false;
  const label = document.createElement('canvas'); label.width = label.height = 32;
  const lg = label.getContext('2d'); lg.imageSmoothingEnabled = false;
  const art = {}; for (const k of SKINS) loadImg(k.src).then((im) => { art[k.id] = im; });
  let angle = 0, vu = 0, beat = 0, waves = [];
  function bakeLabel(cover) {
    lg.clearRect(0, 0, 32, 32);
    lg.save(); lg.beginPath(); lg.arc(16, 16, 16, 0, Math.PI * 2); lg.clip();
    if (cover) lg.drawImage(cover, 0, 0, 32, 32); else { lg.fillStyle = '#f2b632'; lg.fillRect(0, 0, 32, 32); }
    lg.restore();
    lg.fillStyle = '#17141a'; lg.fillRect(15, 15, 2, 2);
  }
  bakeLabel(null);
  function disc(k, playing) {
    const d = k.disc, cx = k.dx + d.x, cy = d.y, sq = d.ry / d.rx;
    // Light sliding round the grooves shows the record turning.
    g.save(); g.translate(cx, cy); g.scale(1, sq);
    g.strokeStyle = 'rgba(190, 190, 205, .55)'; g.lineWidth = 1;
    for (const [r, off] of [[d.rx * 0.82, 0], [d.rx * 0.62, Math.PI]]) { g.beginPath(); g.arc(0, 0, r, angle + off, angle + off + 0.7); g.stroke(); }
    // The album itself as the centre label, turning.
    g.rotate(angle); g.drawImage(label, -d.lr, -d.lr, d.lr * 2, d.lr * 2);
    g.restore();
  }
  function boombox(k, playing, progress) {
    for (const [i, [x, y]] of k.reels.entries()) {     // reel spokes
      const r = 3.2, q = angle * 2.4 * (i ? 1 : 1.25);
      g.strokeStyle = '#2b2118'; g.lineWidth = 1;
      for (let s = 0; s < 3; s++) { const a = q + s * 2.094; g.beginPath(); g.moveTo(x + 0.5, y + 0.5); g.lineTo(x + 0.5 + Math.cos(a) * r, y + 0.5 + Math.sin(a) * r); g.stroke(); }
    }
    for (const [x, y, r] of k.cones) {                   // cones push out on the beat
      const p = beat * (playing ? 1 : 0);
      g.fillStyle = `rgba(255, 236, 200, ${0.10 + p * 0.22})`; g.beginPath(); g.arc(x, y, r * (0.35 + p * 0.25), 0, Math.PI * 2); g.fill();
      g.strokeStyle = `rgba(43, 33, 24, ${0.25 + p * 0.35})`; g.beginPath(); g.arc(x, y, r * (0.62 + p * 0.06), 0, Math.PI * 2); g.stroke();
    }
    for (const [x, y, w] of k.meters) {                  // level lights
      const n = Math.round(w / 2);
      for (let i = 0; i < n; i++) { g.fillStyle = i / n < vu ? (i / n > 0.75 ? '#f0563c' : i / n > 0.5 ? '#ffc35a' : '#7fe07a') : '#3a3138'; g.fillRect(x + i * 2, y, 1, 3); }
    }
    g.fillStyle = '#c9483a'; g.fillRect(84, 88, 1, 1);  // the tape moving past the head
    if (playing && Math.floor(angle * 3) % 2) g.fillRect(85, 88, 1, 1);
  }
  function horn(k, dt, playing) {
    if (playing && Math.random() < dt * (2 + vu * 4)) waves.push({ r: 4, a: 1 });
    const [hx, hy] = [k.dx + k.horn[0], k.horn[1]];
    for (const w of waves) {
      w.r += dt * 22; w.a -= dt * 0.7;
      g.strokeStyle = `rgba(255, 228, 150, ${Math.max(0, w.a) * 0.9})`; g.lineWidth = 1;
      g.beginPath(); g.arc(hx, hy, w.r, Math.PI * 0.62, Math.PI * 1.38); g.stroke();
    }
    waves = waves.filter((w) => w.a > 0);
  }
  return {
    async setCover(src) { bakeLabel(src ? await loadImg(src) : null); },
    frame(dt, playing, progress, skinId) {
      const k = SKINS.find((x) => x.id === skinId) || SKINS[0];
      if (playing) angle += dt * Math.PI * 2 * 0.55;
      vu += ((playing ? 0.3 + Math.random() * 0.6 : 0) - vu) * Math.min(1, dt * 10);
      beat = playing ? Math.max(0, Math.sin(performance.now() / 1000 * Math.PI * 2 * 1.6)) ** 3 : 0;
      g.clearRect(0, 0, PW, PH);
      if (art[k.id]) g.drawImage(art[k.id], k.dx, 0);
      if (k.disc) disc(k, playing);
      if (k.reels) boombox(k, playing, progress);
      if (k.horn) horn(k, dt, playing);
    },
  };
}

// ---------- LED marquee on the stall's sign ----------
// Every canvas pixel is one bulb: text is rasterised small, then lit bulbs are amber.
function makeMarquee(canvas) {
  const W = 300, H = 13; canvas.width = W; canvas.height = H;
  const g = canvas.getContext('2d'), txt = document.createElement('canvas'), tg = txt.getContext('2d', { willReadFrequently: true });
  let tw = 1, x = 0, lit = null;
  const FONT = '700 10px "Be Vietnam Pro", sans-serif';
  function set(t) {
    tg.font = FONT; tw = Math.ceil(tg.measureText(t).width) + 30; txt.width = tw; txt.height = H;
    tg.font = FONT; tg.textBaseline = 'alphabetic'; tg.fillStyle = '#fff'; tg.fillText(t, 0, 10);
    const d = tg.getImageData(0, 0, tw, H).data; lit = new Uint8Array(tw * H);
    for (let i = 0; i < tw * H; i++) lit[i] = d[i * 4 + 3] > 110 ? 1 : 0;
  }
  return {
    set,
    frame(dt) {
      if (!lit) return;
      x = (x + dt * 22) % tw;
      const img = g.createImageData(W, H), o = img.data, ox = Math.floor(x);
      for (let yy = 0; yy < H; yy++) for (let xx = 0; xx < W; xx++) {
        const on = lit[yy * tw + (xx + ox) % tw], i = (yy * W + xx) * 4;
        if (on) { o[i] = 255; o[i + 1] = 196; o[i + 2] = 90; } else { o[i] = 52; o[i + 1] = 38; o[i + 2] = 26; }
        o[i + 3] = 255;
      }
      g.putImageData(img, 0, 0);
    },
  };
}

// ---------- the stall ----------
// The stall opens in the garden itself: the camera frames the stall with Li beside
// it, and wooden signs, paper tags, a crate of records and a plank player sit over
// the living scene. Li's speech bubble carries the greeting, the song, or its lyric.
const TAGS = [
  ['all', 'Tất cả', () => true],
  ['new', '✦ Mới về', null],
  ['pick', 'Li gợi ý', null],
  ['hot', 'Nghe nhiều', null],
  ['acoustic', 'Mộc & Acoustic', (a) => /acoustic|unplugged|mộc|bossa/i.test(a.sub)],
  ['folk', 'Folk & Quê hương', (a) => /folk|dân ca|ru ca|heritage|thơ/i.test(a.sub)],
  ['pop', 'Pop & R&B', (a) => /pop|r&b|ballad|cantopop|soul/i.test(a.sub)],
  ['night', 'Lo-fi & Đêm', (a) => /lo-fi|noir|dream|đêm|ambient|jazz/i.test(a.sub)],
  ['energy', 'Nhiều năng lượng', (a) => /trap|drill|funk|jersey|rap|remix|dark/i.test(a.sub)],
  ['fav', '♥ Yêu thích', null],
];
const GREETINGS = ['Ghé sạp nghe chút nha.', 'Chọn một đĩa đi, Li mở cho.', 'Hôm nay nghe gì đây ta?'];
const FAV_KEY = 'li-garden-fav';
const loadFav = () => { try { return new Set(JSON.parse(localStorage.getItem(FAV_KEY) || '[]')); } catch { return new Set(); } };
const saveFav = (f) => { try { localStorage.setItem(FAV_KEY, JSON.stringify([...f])); } catch { /* private mode */ } };

export async function initStall({ onOpenChange, onPlayChange }) {
  const albums = await (await fetch('./data/catalog.json', { cache: 'no-cache' })).json();
  const coverOf = (a) => `./data/${a.cover.replace('assets/covers/', 'covers/')}`;
  const root = $('#stall'), crate = $('#crate', root), tracksEl = $('#tracks', root), tagsEl = $('#tags', root);
  const deck = makeDeck($('#deck', root)), marquee = makeMarquee($('#marquee', root));
  const audio = new Audio(); audio.preload = 'none'; audio.id = 'garden-audio'; document.body.append(audio);
  const status = $('#playback-state');
  const showStatus = (text) => { status.textContent = text; status.hidden = !text; };
  const normalize = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase();
  const search = $('#music-search');
  const st = { sayText: '', sayUntil: 0, album: null, track: null, trackAlbum: null, skin: (() => { try { return localStorage.getItem('li-garden-skin') || 'suitcase'; } catch { return 'suitcase'; } })(), lines: null, open: false, tag: 'all', greet: GREETINGS[0] };
  const fav = loadFav();
  // Shelves Ali curates in data/shelves.json; "Nghe nhiều" also learns from what this visitor plays.
  const shelves = await fetch('./data/shelves.json', { cache: 'no-cache' }).then((r) => r.json()).catch(() => ({}));
  const byName = (n) => albums.find((a) => a.name === n);
  const plays = (() => { try { return JSON.parse(localStorage.getItem('li-garden-plays') || '{}'); } catch { return {}; } })();
  const hero = byName(shelves.hero?.album);
  if (hero) {
    $('#now-title', root).textContent = `Li gợi ý: ${hero.name}`;
    $('#now-cover',root).src=coverOf(hero); $('#featured-cover',root).src=coverOf(hero);
    $('#featured-label',root).textContent=shelves.hero?.label||'Li gợi ý';
    $('#featured-name',root).textContent=hero.name;
    $('#featured-description',root).textContent=shelves.hero?.blurb||hero.sub;
    const featured=$('#featured-album',root); featured.hidden=false;
    featured.addEventListener('click',()=>{pickAlbum(hero);listOpen(true);});
  }
  const shelfList = (id) => {
    if (id === 'new') return (shelves.new || []).map(byName).filter(Boolean);
    if (id === 'pick') return (shelves.picks || []).map(byName).filter(Boolean);
    if (id === 'hot') {
      const mine = Object.entries(plays).sort((a, b) => b[1] - a[1]).map(([n]) => byName(n)).filter(Boolean);
      return [...new Set([...mine, ...(shelves.hot || []).map(byName).filter(Boolean)])].slice(0, 8);
    }
    return null;
  };

  // Pills filter the records.
  tagsEl.replaceChildren(...TAGS.map(([id, label]) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'pill'; b.dataset.tag = id; b.textContent = label;
    b.addEventListener('click', () => { st.tag = id; fillCrate(); });
    return b;
  }));

  // Records hang as polaroids on a clothesline across the top; it sags, they sway,
  // and it can be dragged, wheeled or stepped with the arrows.
  const lineEl = $('#line', root), ropeCv = $('#rope-line', root), rg = ropeCv.getContext('2d');
  const line = { off: 0, vel: 0, drag: null, moved: 0, hover: null };
  let cards = [];
  function fillCrate() {
    const shelf = shelfList(st.tag);
    let list = shelf || albums.filter(TAGS.find((t) => t[0] === st.tag)[2] || ((a) => a.tracks.some((t) => fav.has(t.id))));
    if (st.tag === 'all' && hero) list = [hero, ...list.filter((a) => a !== hero)];   // the month's hero leads the line
    for (const b of tagsEl.children) b.setAttribute('aria-pressed', String(b.dataset.tag === st.tag));
    const query = normalize(search.value.trim());
    if (query) list = list.filter(a => normalize(a.name+' '+a.sub+' '+a.tracks.map(t=>t.name).join(' ')).includes(query));
    cards = list.map((a, i) => {
      const b = document.createElement('button');
      b.className = 'card'; b.type = 'button'; b.title = `${a.name} · ${a.tracks.length} bài`;
      b.innerHTML = '<i class="pin" aria-hidden="true"></i><img alt="" loading="lazy"><span class="name"></span>';
      b.querySelector('img').src = coverOf(a); b.querySelector('.name').textContent = a.name;
      b.albumRef = a; b.phase = i * 1.37;
      if (a === hero && (st.tag === 'all' || st.tag === 'new')) { b.classList.add('hero'); b.insertAdjacentHTML('beforeend', `<em class="badge">${shelves.hero.label || 'Hero tháng'}</em>`); }
      else if ((shelves.new || []).includes(a.name) && st.tag !== 'new') b.insertAdjacentHTML('beforeend', '<em class="badge new">Mới</em>');
      b.addEventListener('click', (e) => { if (line.moved > 6) { e.preventDefault(); return; } pickAlbum(a); listOpen(true); });
      b.addEventListener('pointerenter', () => { line.hover = b; });
      b.addEventListener('pointerleave', () => { if (line.hover === b) line.hover = null; });
      b.addEventListener('focus', () => { line.hover = b; scrollToCard(b); });
      return b;
    });
    $('#crate', root).replaceChildren(...cards);
    if (!list.length) { const p = document.createElement('p'); p.className = 'empty'; p.textContent = query ? 'Không có bài phù hợp. Thử một tên khác nha.' : st.tag === 'fav' ? 'Chưa có bài nào được thả tim.' : 'Chưa có đĩa nào ở ngăn này.'; $('#crate', root).append(p); }
    line.off = 0; markCrate();
  }
  search.addEventListener('input', () => { fillCrate(); });
  function markCrate() { for (const b of cards) b.classList.toggle('on', b.albumRef === st.album); }
  const gap = () => (innerWidth < 760 ? 100 : 144);
  const edge = () => innerWidth < 760 ? 16 : 62;
  const maxOff = () => Math.max(0, (cards.length - 1) * gap() + edge() * 2 + gap() * .1 + (innerWidth < 760 ? 90 : 128) - lineEl.clientWidth);
  function scrollToCard(b) { const i = cards.indexOf(b), x = edge() + gap() * .1 + i * gap() - line.off, width = b.offsetWidth; if (x < edge() || x + width > lineEl.clientWidth - edge()) line.off = Math.min(maxOff(), Math.max(0, edge() + gap() * .1 + i * gap() + width / 2 - lineEl.clientWidth / 2)); }
  lineEl.addEventListener('pointerdown', (e) => { line.drag = { x: e.clientX, off: line.off, t: performance.now() }; line.moved = 0; line.vel = 0; });
  addEventListener('pointermove', (e) => {
    if (!line.drag) return;
    const dx = e.clientX - line.drag.x; line.moved = Math.max(line.moved, Math.abs(dx));
    const prev = line.off; line.off = Math.min(maxOff(), Math.max(0, line.drag.off - dx));
    line.vel = (line.off - prev) / Math.max(1, (performance.now() - line.drag.t)) * 16; line.drag.t = performance.now();
  });
  addEventListener('pointerup', () => { line.drag = null; });
  lineEl.addEventListener('wheel', (e) => { line.off = Math.min(maxOff(), Math.max(0, line.off + (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY))); e.preventDefault(); }, { passive: false });
  $('#crate-prev', root).addEventListener('click', () => { line.vel = -gap() * 0.22; });
  $('#crate-next', root).addEventListener('click', () => { line.vel = gap() * 0.22; });
  function layoutLine(t, dt) {
    if (!line.drag && Math.abs(line.vel) > 0.1) { line.off = Math.min(maxOff(), Math.max(0, line.off + line.vel)); line.vel *= Math.pow(0.9, dt * 60); }
    const W = lineEl.clientWidth, top = 6, sag = innerWidth < 760 ? 18 : 34, ropeY = (x) => top + sag * (1 - ((x - W / 2) / (W / 2)) ** 2);
    if (ropeCv.width !== Math.round(W / 2)) { ropeCv.width = Math.round(W / 2); ropeCv.height = 40; }
    rg.clearRect(0, 0, ropeCv.width, ropeCv.height);          // the rope, drawn in 2px pixels
    for (let x = 0; x < ropeCv.width; x++) { const y = Math.round(ropeY(x * 2) / 2); rg.fillStyle = '#5a3f28'; rg.fillRect(x, y, 1, 1); rg.fillStyle = x % 3 ? '#c9a06a' : '#9a7448'; rg.fillRect(x, y - 1, 1, 1); }
    const g = gap(), pad = g * 0.5 + edge();
    for (const [i, b] of cards.entries()) {
      const cx = pad + i * g - line.off, y = ropeY(Math.min(W, Math.max(0, cx)));
      const slope = (ropeY(cx + 4) - ropeY(cx - 4)) / 8, hov = line.hover === b ? 1 : 0, on = b.albumRef === st.album ? 1 : 0;
      const sway = (reducedMotion() ? 0 : Math.sin(t * 1.3 + b.phase)) * (1.6 + hov * 2.2) + slope * 24;
      b.style.transform = `translate(${Math.round(cx - g * 0.4)}px, ${Math.round(y + hov * 10 + on * 6)}px) rotate(${sway.toFixed(2)}deg)`;
      b.style.visibility = cx < -g || cx > W + g ? 'hidden' : 'visible';
    }
  }

  function pickAlbum(a) {
    st.album = a; markCrate();
    $('#album-name', root).textContent = a.name;
    $('#album-sub', root).textContent = a.sub || '';
    $('#album-about', root).textContent = a.description || '';
    tracksEl.replaceChildren(...a.tracks.map((t, i) => {
      const li = document.createElement('li'), b = document.createElement('button');
      b.type = 'button'; b.innerHTML = `<i>${String(i + 1).padStart(2, '0')}</i><b></b><em>${t.duration || ''}</em>`;
      b.querySelector('b').textContent = t.name;
      b.addEventListener('click', () => play(a, t));
      li.append(b); return li;
    }));
    markTracks();
    if (!st.track) deck.setCover(coverOf(a));
  }
  function markTracks() { for (const [i, li] of [...tracksEl.children].entries()) li.classList.toggle('on', st.album?.tracks[i] === st.track); }
  const listEl = $('#tracklist', root);
  function listOpen(on) { reveal(listEl,on); root.classList.toggle('list-open',on); $('#list-btn', root).setAttribute('aria-expanded', String(on)); }

  async function play(a, t) {
    if (st.track !== t) {
      plays[a.name] = (plays[a.name] || 0) + 1; try { localStorage.setItem('li-garden-plays', JSON.stringify(plays)); } catch { /* private mode */ }
      st.track = t; st.trackAlbum = a; audio.src = t.url; st.lines = null; st.changedAt = performance.now();
      deck.setCover(coverOf(a));
      $('#now-cover',root).src=coverOf(a);
      $('#now-title', root).textContent = t.name;
      $('#now-album', root).textContent = a.name;
      $('#fav', root).setAttribute('aria-pressed', String(fav.has(t.id)));
      marquee.set(`ĐANG PHÁT  ·  ${t.name}  —  ${a.name}   ·   SẠP NHẠC CỦA LI   ·   `);
      if ('mediaSession' in navigator) navigator.mediaSession.metadata = new MediaMetadata({ title: t.name, artist: 'Anh Li', album: a.name, artwork: [{ src: coverOf(a), sizes: '480x480', type: 'image/webp' }] });
      const id = t.id; lyricsFor(id).then((lines) => { if (st.track?.id === id) st.lines = lines; });
      say(`Mở bài “${t.name}” nha.`, 3.5);
    }
    markTracks();
    showStatus('Đang mở bài…');
    try { await audio.play(); showStatus(''); } catch { showStatus('Chưa mở được bài. Bấm Phát để thử lại.'); }
  }
  const step = (d) => {
    const a = st.trackAlbum || st.album; if (!a) return;
    let i = a.tracks.indexOf(st.track) + d, ai = albums.indexOf(a);
    if (i >= a.tracks.length) { ai = (ai + 1) % albums.length; i = 0; } else if (i < 0) { ai = (ai - 1 + albums.length) % albums.length; i = albums[ai].tracks.length - 1; }
    const na = albums[ai];
    if (na !== st.album) pickAlbum(na);
    play(na, na.tracks[i]);
  };
  audio.addEventListener('waiting', () => showStatus('Đang tải thêm nhạc…'));
  audio.addEventListener('playing', () => showStatus(''));
  audio.addEventListener('error', () => showStatus('Bài này chưa tải được. Thử lại hoặc chọn bài khác nha.'));
  audio.addEventListener('ended', () => step(1));
  audio.addEventListener('pause', () => { if (!audio.ended && performance.now() - (st.changedAt || 0) > 800) say('Tạm dừng chút nha.', 2.5); });
  for (const ev of ['play', 'pause']) audio.addEventListener(ev, () => { root.classList.toggle('playing', !audio.paused); $('#np').hidden = !st.track; $('#np').classList.toggle('playing', !audio.paused); onPlayChange?.(!audio.paused); $('#play').setAttribute('aria-label',audio.paused?'Phát nhạc':'Tạm dừng nhạc'); $('#mini-toggle').textContent=audio.paused?'Phát':'Dừng'; $('#mini-open small').textContent=audio.paused?'ĐANG TẠM DỪNG':'ĐANG NGHE TRONG VƯỜN'; $('#mini-toggle').setAttribute('aria-label',audio.paused?'Phát nhạc':'Tạm dừng nhạc'); $('#mini-player').hidden=!st.track; document.body.classList.toggle('has-music',!!st.track); $('.kick span').textContent=audio.paused?'ĐANG TẠM DỪNG':'ĐANG PHÁT'; });
  if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('play', () => audio.play().catch(()=>showStatus('Bấm Phát để thử lại.')));
    navigator.mediaSession.setActionHandler('pause', () => audio.pause());
    navigator.mediaSession.setActionHandler('seekto', ({seekTime}) => { if(Number.isFinite(seekTime)) audio.currentTime=seekTime; });
    navigator.mediaSession.setActionHandler('nexttrack', () => step(1));
    navigator.mediaSession.setActionHandler('previoustrack', () => step(-1));
  }

  // Controls.
  $('#play', root).addEventListener('click', () => { if (!st.track) { const a = st.album || albums[0]; pickAlbum(a); play(a, a.tracks[0]); } else if (audio.paused) audio.play().catch(()=>showStatus('Chưa mở được bài. Thử lại nha.')); else audio.pause(); });
  $('#mini-toggle').addEventListener('click', () => $('#play').click());
  $('#mini-open').addEventListener('click', () => setOpen(true));
  $('#prev', root).addEventListener('click', () => step(-1));
  $('#next', root).addEventListener('click', () => step(1));
  $('#fav', root).addEventListener('click', () => {
    if (!st.track) return;
    if (fav.has(st.track.id)) fav.delete(st.track.id); else fav.add(st.track.id);
    saveFav(fav); $('#fav', root).setAttribute('aria-pressed', String(fav.has(st.track.id)));
    if (st.tag === 'fav') fillCrate();
  });
  $('#list-btn', root).addEventListener('click', () => listOpen(listEl.hidden));
  $('#list-close', root).addEventListener('click', () => listOpen(false));
  const seek = $('#seek', root);
  seek.addEventListener('input', () => { if (Number.isFinite(audio.duration)) audio.currentTime = seek.value / 1000 * audio.duration; });
  const skinBtn = $('#skin', root);
  const showSkin = () => { const i = SKINS.findIndex((k) => k.id === st.skin); skinBtn.textContent = `Máy: ${SKINS[Math.max(0, i)].label} ›`; };
  skinBtn.addEventListener('click', () => {
    const i = SKINS.findIndex((k) => k.id === st.skin);
    st.skin = SKINS[(i + 1) % SKINS.length].id; showSkin();
    try { localStorage.setItem('li-garden-skin', st.skin); } catch { /* private mode */ }
  });
  showSkin();
  $('#stall-close', root).addEventListener('click', () => setOpen(false));
  $('#np').addEventListener('click', () => setOpen(true));
  addEventListener('keydown', (e) => {
    if (!st.open) return;
    if (e.target instanceof HTMLInputElement && e.key !== 'Escape') return;
    if (e.key === 'Escape') { if (!listEl.hidden) listOpen(false); else setOpen(false); }
    if (e.key === ' ' && e.target === document.body) { e.preventDefault(); $('#play', root).click(); }
  });

  function setOpen(on) {
    if (on === st.open) return;
    st.open = on; reveal(root,on); onOpenChange?.(on); focusScope(root,on);
    if (on) {
      say(GREETINGS[(Math.random() * GREETINGS.length) | 0], 4);
      if (!st.album) pickAlbum(hero || albums[0]);
      $('.kick span').textContent = st.track ? (audio.paused?'ĐANG TẠM DỪNG':'ĐANG PHÁT') : 'LI GỢI Ý HÔM NAY';
    } else listOpen(false);
  }
  fillCrate();
  marquee.set('Sạp nhạc của Li   ·   26 album · 213 bài   ·   mỗi bài hát là một lần trở về   ·   ');

  // Li only speaks now and then: a greeting, a new song, a pause, or the lyric line
  // being sung. Otherwise the bubble stays away.
  function say(text, sec) { st.sayText = text; st.sayUntil = performance.now() / 1000 + sec; }
  function bubble() {
    if (st.lines && !audio.paused) { const l = st.lines.find((x) => audio.currentTime >= x.start && audio.currentTime < x.end); if (l) return `♪ ${l.text}`; }
    return performance.now() / 1000 < st.sayUntil ? st.sayText : '';
  }

  let last = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    const p = Number.isFinite(audio.duration) && audio.duration ? audio.currentTime / audio.duration : 0;
    if (st.open) {
      layoutLine(now / 1000, dt);
      deck.frame(reducedMotion()?0:dt, !audio.paused, p, st.skin);
      marquee.frame(reducedMotion()?0:dt);
      if (document.activeElement !== seek) seek.value = String(Math.round(p * 1000));
      seek.style.setProperty('--p', `${p * 100}%`);
      $('#time', root).textContent = `${fmt(audio.currentTime)} / ${fmt(audio.duration)}`;
    }
    $('#np-title').textContent = st.track ? st.track.name : '';
    $('#mini-title').textContent = st.track ? st.track.name : '';
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  return { open: () => setOpen(true), close: () => setOpen(false), pause: () => audio.pause(), get playing() { return !audio.paused; }, get isOpen() { return st.open; }, bubble };
}
