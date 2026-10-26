// The garden's other places, built like the music stall: the camera frames the spot,
// Li steps over to host, and wood, paper and polaroids sit over the living scene.
//   house   — Chuyện của Li: a letter, the profile, the road so far
//   hammock — Góc võng: the photo album
//   cine    — Rạp phim: the videos, shown on a cloth screen
// Content is the live V2.2 data (data/profile.json, gallery.json, videos.json).

const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ICON_X = '<svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="3.2" aria-hidden="true"><path d="M4 4l10 10M14 4L4 14"/></svg>';
const ARROW = (d) => `<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="${d === 'l' ? 'M11 2v12L3 8z' : 'M5 2v12l8-6z'}"/></svg>`;

export const ROOMS = {
  house: { title: 'Chuyện của Li', host: [678, 718], face: 'south', cam: [700, 600], greet: ['Vào nhà ngồi chơi nha.', 'Li có viết cho bạn một lá thư.'] },
  hammock: { title: 'Góc võng', host: [196, 1100], face: 'west', cam: [330, 980], greet: ['Ngồi xuống đây, Li cho xem ảnh.', 'Mấy khoảnh khắc Li để dành nè.'] },
  cine: { title: 'Rạp phim', host: [1170, 1112], face: 'east', cam: [1290, 1010], greet: ['Tối nay chiếu gì ta?', 'Lấy ghế ngồi đi, phim sắp chiếu.'] },
};

export async function initRooms({ onOpenChange, onPlayVideo }) {
  const [profile, gallery, videos] = await Promise.all(['profile', 'gallery', 'videos'].map((n) => fetch(`./data/${n}.json`).then((r) => r.json())));
  const root = el('div', 'room'); root.hidden = true; document.body.append(root);
  const st = { id: null, sayText: '', sayUntil: 0 };
  const say = (text, sec = 4) => { st.sayText = text; st.sayUntil = performance.now() / 1000 + sec; };

  function frame(title, pills, onPill) {
    root.replaceChildren();
    root.append(el('div', 'st-shade'));
    const head = el('div', 'st-head');
    head.append(el('div', 'st-sign', `<h2>${esc(title)}</h2>`));
    const nav = el('nav', 'st-pills');
    for (const [id, label] of pills) {
      const b = el('button', 'pill', esc(label)); b.type = 'button'; b.dataset.id = id;
      b.addEventListener('click', () => { for (const o of nav.children) o.setAttribute('aria-pressed', String(o === b)); onPill(id); });
      nav.append(b);
    }
    head.append(nav);
    const close = el('button', 'logbtn st-close', ICON_X); close.setAttribute('aria-label', 'Rời khỏi đây'); close.addEventListener('click', () => setOpen(null));
    head.append(close); root.append(head);
    const body = el('div', 'room-body'); root.append(body);
    nav.firstChild?.setAttribute('aria-pressed', 'true');
    return body;
  }

  // ---------- Chuyện của Li ----------
  function openHouse() {
    let body;
    const show = (tab) => {
      body.replaceChildren();
      if (tab === 'letter') {
        const env = el('div', 'letter paper');
        env.innerHTML = `<p class="hello">Gửi bạn ghé vườn,</p><p>${esc(profile.intro)}</p><p class="sign">— ${esc(profile.nickname)}<small>${esc(profile.name)}</small></p>`;
        body.append(env);
      } else if (tab === 'road') {
        const road = el('div', 'road');
        for (const r of profile.resume) road.append(el('div', 'stop paper', `<i>${esc(r.period)}</i><b>${esc(r.role)}</b><small>${esc(r.company)}</small>${r.detail ? `<p>${esc(r.detail)}</p>` : ''}`));
        body.append(road);
      } else if (tab === 'craft') {
        const g = el('div', 'craft');
        for (const c of profile.capabilities) g.append(el('div', 'card-note paper', `<b>${esc(c.title)}</b><p>${esc(c.text)}</p>`));
        g.append(el('div', 'card-note paper', `<b>Nền tảng</b><ul>${profile.background.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>`));
        body.append(g);
      }
      const id = el('div', 'idcard paper', `<b>${esc(profile.name)}</b><small>${esc(profile.role)}</small><a class="pill" href="mailto:${esc(profile.email)}">Gửi thư cho Li ✉</a>`);
      body.append(id);
    };
    body = frame('Chuyện của Li', [['letter', 'Thư ngỏ'], ['road', 'Chặng đường'], ['craft', 'Li làm gì']], show);
    body.classList.add('house');
    show('letter');
  }

  // ---------- Góc võng: the photo album ----------
  function openHammock() {
    let body, list = gallery, page = 0;
    const PER = () => (innerWidth < 760 ? 3 : 12);
    const render = () => {
      body.replaceChildren();
      const book = el('div', 'album');
      const pages = Math.max(1, Math.ceil(list.length / PER()));
      page = Math.min(page, pages - 1);
      list.slice(page * PER(), (page + 1) * PER()).forEach((g, i) => {
        const b = el('button', 'photo', `<i class="pin" aria-hidden="true"></i><img alt="${esc(g.title)}" loading="lazy" src="./data/${esc(g.thumb.replace('assets/gallery/', 'gallery/'))}">`);
        b.type = 'button'; b.style.setProperty('--r', `${((i * 37) % 7) - 3}deg`);
        b.addEventListener('click', () => lightbox(list.indexOf(g)));
        book.append(b);
      });
      body.append(book);
      const nav = el('div', 'pager');
      const prev = el('button', 'logbtn', ARROW('l')), next = el('button', 'logbtn', ARROW('r'));
      prev.setAttribute('aria-label', 'Trang trước'); next.setAttribute('aria-label', 'Trang sau');
      prev.disabled = page === 0; next.disabled = page >= pages - 1;
      prev.addEventListener('click', () => { page--; render(); }); next.addEventListener('click', () => { page++; render(); });
      nav.append(prev, el('span', null, `${page + 1} / ${pages}`), next);
      body.append(nav);
    };
    const lightbox = (i) => {
      const g = list[i], box = el('div', 'lightbox');
      box.innerHTML = `<figure class="polaroid"><img alt="${esc(g.title)}" src="./data/${esc(g.src.replace('assets/gallery/', 'gallery/'))}"><figcaption>${esc(g.tag)}</figcaption></figure>`;
      const prev = el('button', 'logbtn lb-prev', ARROW('l')), next = el('button', 'logbtn lb-next', ARROW('r')), x = el('button', 'logbtn lb-x', ICON_X);
      prev.addEventListener('click', (e) => { e.stopPropagation(); box.remove(); lightbox((i - 1 + list.length) % list.length); });
      next.addEventListener('click', (e) => { e.stopPropagation(); box.remove(); lightbox((i + 1) % list.length); });
      x.addEventListener('click', () => box.remove()); box.addEventListener('click', (e) => { if (e.target === box) box.remove(); });
      box.append(prev, next, x); root.append(box);
    };
    body = frame('Góc võng', [['all', 'Tất cả'], ['Khoảnh khắc', 'Khoảnh khắc'], ['Thiết kế', 'Thiết kế']], (tag) => { list = tag === 'all' ? gallery : gallery.filter((g) => g.tag === tag); page = 0; render(); });
    body.classList.add('hammock');
    render();
  }

  // ---------- Rạp phim ----------
  function openCine() {
    let body;
    const play = (v) => {
      const scr = body.querySelector('.screen');
      scr.replaceChildren();
      if (v.embed) {
        const f = el('iframe'); f.src = v.embed + (v.embed.includes('?') ? '&' : '?') + 'autoplay=1';
        f.allow = 'autoplay; fullscreen; picture-in-picture'; f.allowFullscreen = true; f.title = v.title;
        scr.append(f); onPlayVideo?.();
      } else scr.append(el('a', 'pill', 'Mở video ở tab mới ↗')).href = v.url;
      if (!v.embed) scr.querySelector('a').target = '_blank';
      body.querySelector('.now-film').innerHTML = `<b>${esc(v.title)}</b><small>${esc(v.meta)}</small>${v.credits ? `<p>${esc(v.credits).replace(/\n/g, '<br>')}</p>` : ''}`;
      for (const t of body.querySelectorAll('.ticket')) t.classList.toggle('on', t.videoRef === v);
      say(`Chiếu “${v.title}” nha.`, 3.5);
    };
    const render = (list) => {
      body.replaceChildren();
      const scr = el('div', 'screen'); scr.append(el('p', 'idle', 'Chọn một tấm vé bên dưới để chiếu.'));
      const info = el('div', 'now-film paper', '<b>Rạp phim của Li</b><small>Sân khấu, sự kiện và MV</small>');
      const strip = el('div', 'tickets');
      for (const v of list) {
        const t = el('button', 'ticket', `${v.thumb ? `<img alt="" loading="lazy" src="${esc(v.thumb)}">` : '<span class="reel" aria-hidden="true"></span>'}<b>${esc(v.title)}</b><small>${esc(v.provider)}</small>`);
        t.type = 'button'; t.videoRef = v; t.addEventListener('click', () => play(v)); strip.append(t);
      }
      body.append(scr, info, strip);
    };
    const kinds = { all: () => true, mv: (v) => /music video|mv/i.test(v.title + v.meta), event: (v) => !/music video/i.test(v.title) };
    body = frame('Rạp phim', [['all', 'Tất cả'], ['event', 'Sân khấu & sự kiện'], ['mv', 'Music video']], (k) => render(videos.filter(kinds[k])));
    body.classList.add('cine');
    render(videos);
  }

  function setOpen(id) {
    if (id === st.id) return;
    st.id = id; root.hidden = !id; root.className = `room ${id || ''}`;
    if (id === 'house') openHouse(); else if (id === 'hammock') openHammock(); else if (id === 'cine') openCine(); else root.replaceChildren();
    if (id) { const g = ROOMS[id].greet; say(g[(Math.random() * g.length) | 0], 4); }
    onOpenChange?.(id);
  }
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && st.id) { const lb = root.querySelector('.lightbox'); if (lb) lb.remove(); else setOpen(null); } });
  return {
    open: setOpen, close: () => setOpen(null), get current() { return st.id; },
    bubble: () => (performance.now() / 1000 < st.sayUntil ? st.sayText : ''),
  };
}

// ---------- the gate: the first screen ----------
export async function initGate({ onEnter }) {
  const quotes = await fetch('./data/entrance-quotes.json').then((r) => r.json()).catch(() => []);
  const h = new Date().getHours(), phase = h >= 18 || h < 6 ? 'night' : 'day';
  const pool = quotes.filter((q) => q.phase === 'both' || q.phase === phase);
  const q = pool[(Math.random() * pool.length) | 0]?.text || 'Có nhạc. Có cây. Có chỗ ngồi.';
  const gate = el('div', 'gate');
  gate.innerHTML = `<div class="gate-card"><div class="st-sign"><h2>vườn của Li</h2></div><p class="gate-q">${esc(q)}</p><button class="gate-go" type="button">Mở cổng vườn</button><small>Nhạc · ảnh · chuyện · và vài em thú nhỏ</small></div>`;
  document.body.append(gate);
  gate.querySelector('.gate-go').focus({ preventScroll: true });
  gate.querySelector('.gate-go').addEventListener('click', () => { gate.classList.add('open'); setTimeout(() => gate.remove(), 900); onEnter?.(); });
}
