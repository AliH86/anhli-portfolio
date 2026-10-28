import { arrive, reveal, focusScope, reducedMotion } from './motion.js?v=70';
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
  const root = el('div', 'room'); root.hidden = true; root.setAttribute('role','dialog'); root.setAttribute('aria-modal','true'); document.body.append(root);
  const st = { id: null, sayText: '', sayUntil: 0 };
  let resizeRoom=null;
  addEventListener('resize',()=>resizeRoom?.());
  const say = (text, sec = 4) => { st.sayText = text; st.sayUntil = performance.now() / 1000 + sec; };

  function frame(title, pills, onPill) {
    root.replaceChildren(); root.setAttribute('aria-label',title);
    root.append(el('div', 'st-shade'));
    const head = el('div', 'st-head');
    head.append(el('div', 'st-sign', `<h2>${esc(title)}</h2>`));
    const nav = el('nav', 'st-pills');
    for (const [id, label] of pills) {
      const b = el('button', 'pill', esc(label)); b.type = 'button'; b.dataset.id = id;
      b.addEventListener('click', () => { for (const o of nav.children) o.setAttribute('aria-pressed', String(o === b)); onPill(id); arrive(root.querySelector('.room-body')); });
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
      body.append(id); arrive(body);
    };
    body = frame('Chuyện của Li', [['letter', 'Thư ngỏ'], ['road', 'Chặng đường'], ['craft', 'Li làm gì']], show);
    body.classList.add('house');
    show('letter');
  }

  // ---------- Góc võng: the photo album ----------
  function openHammock() {
    let body, list = gallery, page = 0;
    // An open book: two facing pages of photos with corner tabs (one page on a phone).
    const ONE = () => innerWidth < 760, PER = () => (ONE() ? 4 : 6);
    const render = (turn) => {
      const previousBook=body.querySelector('.book');
      const oldBook=turn&&previousBook?{node:previousBook.cloneNode(true),rect:previousBook.getBoundingClientRect()}:null;
      body.replaceChildren();
      const per = PER(), spread = ONE() ? per : per * 2;
      const pages = Math.max(1, Math.ceil(list.length / spread));
      page = Math.min(page, pages - 1);
      const book = el('div', `album book${ONE() ? ' one' : ''}`);
      const items = list.slice(page * spread, (page + 1) * spread);
      for (let side = 0; side < (ONE() ? 1 : 2); side++) {
        const leaf = el('div', `leaf ${side ? 'r' : 'l'}`);
        items.slice(side * per, (side + 1) * per).forEach((g, i) => {
          const b = el('button', `photo${i===0?' featured':''}`,  `<img alt="${esc(g.title)}" loading="lazy" src="./data/${esc(g.src.replace('assets/gallery/', 'gallery/'))}"><small>${esc(g.tag)} · ${esc(g.id)}</small>`);
          b.dataset.ratio=String(g.width/g.height);
          b.type = 'button'; b.style.setProperty('--r', `${(((page * spread + side * per + i) * 37) % 5) - 2}deg`);
          b.addEventListener('click', () => lightbox(list.indexOf(g)));
          leaf.append(b);
        });
        leaf.append(el('span', 'folio', String(page * (ONE() ? 1 : 2) + side + 1)));
        book.append(leaf);
      }
      const back = el('button', 'corner l', ''), fwd = el('button', 'corner r', '');
      back.setAttribute('aria-label', 'Lật trang trước'); fwd.setAttribute('aria-label', 'Lật trang sau');
      back.hidden = page === 0; fwd.hidden = page >= pages - 1;
      back.addEventListener('click', () => { page--; render('back'); }); fwd.addEventListener('click', () => { page++; render('fwd'); });
      book.append(back, fwd);
      body.append(book);
      const nav = el('div', 'pager');
      const prev = el('button', 'logbtn', ARROW('l')), next = el('button', 'logbtn', ARROW('r'));
      prev.setAttribute('aria-label', 'Trang trước'); next.setAttribute('aria-label', 'Trang sau');
      prev.disabled = page === 0; next.disabled = page >= pages - 1;
      prev.addEventListener('click', () => { page--; render('back'); }); next.addEventListener('click', () => { page++; render('fwd'); });
      nav.append(prev, el('span', null, `${page + 1} / ${pages}`), next);
      body.append(nav);
      layoutAlbum(body);if(turn)turnAlbum(oldBook,book,turn);
      if(turn)(turn==='back'?(prev.disabled?next:prev):(next.disabled?prev:next)).focus({preventScroll:true});
    };
    const lightbox = (i, origin = document.activeElement) => {
      const previous=origin;
      const g = list[i], box = el('div', 'lightbox'); box.setAttribute('role','dialog'); box.setAttribute('aria-label','Ảnh phóng lớn');
      box.innerHTML = `<figure class="polaroid"><img alt="${esc(g.title)}" src="./data/${esc(g.src.replace('assets/gallery/', 'gallery/'))}"><figcaption>${esc(g.tag)}</figcaption></figure>`;
      const prev = el('button', 'logbtn lb-prev', ARROW('l')), next = el('button', 'logbtn lb-next', ARROW('r')), x = el('button', 'logbtn lb-x', ICON_X);
      prev.setAttribute('aria-label','Ảnh trước'); next.setAttribute('aria-label','Ảnh sau'); x.setAttribute('aria-label','Đóng ảnh');
      prev.addEventListener('click', (e) => { e.stopPropagation(); box.remove(); lightbox((i - 1 + list.length) % list.length, previous); });
      next.addEventListener('click', (e) => { e.stopPropagation(); box.remove(); lightbox((i + 1) % list.length, previous); });
      const dismiss=()=>{box.remove();if(previous?.isConnected)previous.focus({preventScroll:true});};
      box.dismiss=dismiss; x.addEventListener('click', dismiss); box.addEventListener('click', (e) => { if (e.target === box) dismiss(); });
      box.append(prev, next, x); root.append(box); arrive(box); x.focus({preventScroll:true});
      box.addEventListener('keydown', e => { if (e.key === 'ArrowRight') next.click(); if (e.key === 'ArrowLeft') prev.click(); });
    };
    body = frame('Góc võng', [['all', 'Tất cả'], ['Khoảnh khắc', 'Khoảnh khắc'], ['Thiết kế', 'Thiết kế']], (tag) => { list = tag === 'all' ? gallery : gallery.filter((g) => g.tag === tag); page = 0; render(); });
    body.classList.add('hammock');
    let narrow=ONE(); resizeRoom=()=>{if(narrow!==ONE()){const anchor=page*(narrow?4:12);narrow=ONE();page=Math.floor(anchor/(narrow?4:12));render();}else layoutAlbum(body);};
    render();
  }

  function layoutAlbum(body){
    const book=body.querySelector('.book');if(!book)return;
    const mobile=book.classList.contains('one'),gap=10,caption=24;
    const leafPad=mobile?38:46,bookPad=24;
    const available=Math.min(mobile?430:560,Math.max(230,body.clientHeight-(body.querySelector('.pager')?.offsetHeight||56)-32-bookPad-leafPad));
    let tallest=0;
    for(const leaf of book.querySelectorAll('.leaf')){
      const photos=[...leaf.querySelectorAll('.photo')],folio=leaf.querySelector('.folio');
      const w=leaf.clientWidth-(mobile?20:32),ratios=photos.map(p=>+p.dataset.ratio||1);
      let best=null;
      function partition(at,rows,total){
        if(at===photos.length){
          // Filling the entire page alone can squeeze a portrait into a tiny
          // strip beside four panoramas. Prefer balanced, legible rows.
          const fixed=rows.length*caption+Math.max(0,rows.length-1)*gap;
          const scale=Math.min(1,(available-fixed)/rows.reduce((n,r)=>n+r.h,0));
          if(scale<.65)return;
          const fitted=rows.map(r=>({...r,h:r.h*scale})),heights=fitted.map(r=>r.h);
          const minWidth=Math.min(...fitted.flatMap(r=>ratios.slice(r.at,r.at+r.n).map(a=>a*r.h)));
          if(Math.min(...heights)<48||minWidth<48)return;
          const used=fixed+heights.reduce((a,b)=>a+b,0);
          const score=used-1.5*(Math.max(...heights)-Math.min(...heights))-8*Math.max(0,(mobile?90:110)-minWidth);
          if(!best||score>best.score)best={rows:fitted,total:used,score};return;
        }
        for(let n=1;n<=Math.min(4,photos.length-at);n++){
          const sum=ratios.slice(at,at+n).reduce((a,b)=>a+b,0),h=(w-gap*(n-1)-8*n)/sum;
          if(h<48||ratios.slice(at,at+n).some(r=>r*h<48))continue;
          const next=total+h+caption+(rows.length?gap:0);
          if(next<=available*1.55)partition(at+n,[...rows,{at,n,h}],next);
        }
      }
      partition(0,[],0);
      if(!best){const h=(w-gap*(photos.length-1)-8*photos.length)/ratios.reduce((a,b)=>a+b,0);best={rows:[{at:0,n:photos.length,h:Math.max(40,h)}],total:Math.max(40,h)+caption};}
      leaf.replaceChildren();
      for(const row of best.rows){const line=el('div','mosaic-row');for(let i=row.at;i<row.at+row.n;i++){const b=photos[i];b.style.width=`${ratios[i]*row.h+8}px`;b.style.height=`${row.h+caption}px`;b.querySelector('img').style.height=`${row.h}px`;line.append(b);}leaf.append(line);}
      if(folio)leaf.append(folio);tallest=Math.max(tallest,best.total);
    }
    // Keep the spread's footprint stable as its contents change between pages.
    book.style.height=`${Math.ceil(available+leafPad+bookPad)}px`;
  }
  function turnAlbum(previous,book,direction){
    if(!previous||reducedMotion())return;
    const old=previous.node;
    document.querySelectorAll('.album-turn-overlay').forEach(n=>n.remove());
    const rect=previous.rect,newRect=book.getBoundingClientRect();
    Object.assign(old.style,{position:'fixed',left:rect.left+'px',top:rect.top+'px',width:rect.width+'px',height:rect.height+'px',margin:'0',zIndex:'210',pointerEvents:'none'});
    old.classList.add('album-turn-overlay');old.inert=true;old.setAttribute('aria-hidden','true');document.body.append(old);
    old.querySelectorAll('.corner').forEach(n=>n.remove());
    const leaves=[...old.querySelectorAll('.leaf')],turning=old.classList.contains('one')?leaves[0]:leaves[direction==='back'?0:1];
    const sign=direction==='back'?1:-1;
    for(const leaf of leaves)if(leaf!==turning)leaf.animate([{opacity:1},{opacity:0}],{duration:240,fill:'forwards',easing:'ease-out'});
    turning.style.transformOrigin=sign<0?'left center':'right center';turning.style.backfaceVisibility='hidden';
    const a=turning.animate([{transform:'perspective(2200px) rotateY(0deg)',filter:'brightness(1)',opacity:1},{transform:`perspective(2200px) rotateY(${sign*64}deg)`,filter:'brightness(.84)',opacity:.98,offset:.65},{transform:`perspective(2200px) rotateY(${sign*108}deg)`,filter:'brightness(.72)',opacity:0}],{duration:750,easing:'cubic-bezier(.22,.68,.15,1)',fill:'forwards'});
    old.animate([{backgroundColor:'#6b3f24',boxShadow:'none'},{backgroundColor:'transparent',boxShadow:'none'}],{duration:180,fill:'forwards'});
    a.finished.catch(()=>{}).finally(()=>old.remove());
  }

  // ---------- Rạp phim ----------
  function openCine() {
    let body;
    const setTheater = (open) => {
      root.classList.toggle('theater-mode',open);
      const stage=root.querySelector('.theater-backdrop'); if(stage)stage.hidden=!open;
      if(open) root.querySelector('.theater-exit')?.focus({preventScroll:true});
      else body.querySelector('.theater-open')?.focus({preventScroll:true});
    };
    const play = (v) => {
      const scr = body.querySelector('.screen');
      scr.replaceChildren();
      if (v.embed) {
        const f = el('iframe'); f.src = v.embed + (v.embed.includes('?') ? '&' : '?') + 'autoplay=1';
        f.allow = 'autoplay; fullscreen; picture-in-picture'; f.referrerPolicy = 'strict-origin-when-cross-origin'; f.allowFullscreen = true; f.title = v.title;
        scr.append(f); onPlayVideo?.();
      } else scr.append(el('a', 'pill', 'Mở video ở tab mới ↗')).href = v.url;
      if (!v.embed) { scr.querySelector('a').target = '_blank'; scr.querySelector('a').rel = 'noopener noreferrer'; }
      body.querySelector('.now-film').innerHTML = `<b>${esc(v.title)}</b><small>${esc(v.meta)}</small><a class="film-external" href="${esc(v.url)}" target="_blank" rel="noopener noreferrer">Không xem được? Mở trên ${esc(v.provider || 'trang gốc')}</a>${v.credits ? `<p>${esc(v.credits).replace(/\n/g, '<br>')}</p>` : ''}`;
      if(v.embed){const expand=el('button','theater-open','Xem cùng Ba ba và các con');expand.type='button';expand.addEventListener('click',()=>setTheater(true));body.querySelector('.now-film').prepend(expand);}
      for (const t of body.querySelectorAll('.ticket')) t.classList.toggle('on', t.videoRef === v);
      say(`Chiếu “${v.title}” nha.`, 3.5);
    };
    const render = (list) => {
      body.replaceChildren();
      const scr = el('div', 'screen'); scr.append(el('p', 'idle', 'Chọn một tấm vé bên dưới để chiếu.'));
      const info = el('div', 'now-film paper', '<b>Rạp phim của Li</b><small>Sân khấu, sự kiện và MV</small>');
      const strip = el('div', 'tickets');
      for (const v of list) {
        const t = el('button', 'ticket', `<img alt="" loading="lazy" src="${esc(v.thumb || './ui/cinema-placeholder-v1.png')}"><b>${esc(v.title)}</b><small>${esc(v.provider)}</small>`);
        t.type = 'button'; t.videoRef = v; t.addEventListener('click', () => play(v)); strip.append(t);
      }
      body.append(scr, info, strip);
    };
    const kinds = { all: () => true, mv: (v) => /music video|mv/i.test(v.title + v.meta), event: (v) => !/music video/i.test(v.title) };
    body = frame('Rạp phim', [['all', 'Tất cả'], ['event', 'Sân khấu & sự kiện'], ['mv', 'Music video']], (k) => render(videos.filter(kinds[k])));
    body.classList.add('cine');
    const stage=el('div','theater-backdrop');stage.hidden=true;
    stage.innerHTML=`<div class="theater-art"><img class="theater-scene" src="./ui/cinema-placeholder-v1.png" alt=""><div class="theater-audience" aria-hidden="true"><img class="audience-husky" src="../pets/husky/sit.png" alt=""><img class="audience-corgi" src="../pets/corgi/sit.png" alt=""><img class="audience-tabby" src="../pets/mun_tabby/sit.png" alt=""><img class="audience-li" src="../li2/pose/cinema-north.png" alt=""><img class="audience-tux" src="../pets/tux/sit.png" alt=""><img class="audience-spaniel" src="../pets/spaniel/sit.png" alt=""></div></div><button class="theater-exit" type="button">← Trở lại rạp</button>`;
    stage.querySelector('.theater-exit').addEventListener('click',()=>setTheater(false));root.append(stage);
    render(videos);
  }

  function setOpen(id) {
    if (id === st.id) return;
    resizeRoom=null; st.id = id; root.className = `room ${id || ''}`; reveal(root, !!id);
    if (id === 'house') openHouse(); else if (id === 'hammock') openHammock(); else if (id === 'cine') openCine(); else { root.querySelectorAll('iframe').forEach(f=>f.remove()); }
    if (id) { const g = ROOMS[id].greet; say(g[(Math.random() * g.length) | 0], 4); }
    onOpenChange?.(id); focusScope(root, !!id);
  }
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && st.id) { if(root.classList.contains('theater-mode')){root.querySelector('.theater-exit')?.click();return;} const lb = root.querySelector('.lightbox'); if (lb) lb.dismiss(); else setOpen(null); } });
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
  const gate = el('div', 'gate'); gate.setAttribute('role','dialog'); gate.setAttribute('aria-modal','true'); gate.setAttribute('aria-label','Chào bạn ghé vườn');
  gate.innerHTML = `<div class="gate-card"><div class="st-sign"><h2>vườn của Li</h2></div><span class="eyebrow">Một góc nhỏ của Anh Li</span><h1>Ngoài kia vội,<br>ở đây cứ chậm.</h1><p class="gate-q">${esc(q)}</p><button class="gate-go" type="button">Mở cổng vườn</button><small>Nhạc · ảnh · chuyện · và vài em thú nhỏ</small></div>`;
  document.body.append(gate);
  focusScope(gate, true);
  gate.querySelector('.gate-go').focus({ preventScroll: true });
  gate.querySelector('.gate-go').addEventListener('click', () => { document.body.classList.remove('at-gate'); gate.classList.add('open'); gate.inert = true; focusScope(gate, false); setTimeout(() => gate.remove(), 900); onEnter?.(); });
}
