import { fetchWithDeadline as fetch } from './network.js?v=3506';
import { arrive, reveal, focusScope, reducedMotion } from './motion.js?v=3506';
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
  let profile, gallery, videos, request = 0;
  const data = new Map();
  const read = name => { if(!data.has(name)) data.set(name, fetch(`./data/${name}.json`,{},45000).then(r=>r.json()).catch(e=>{data.delete(name);throw e;})); return data.get(name); }; 
  const root = el('div', 'room'); root.hidden = true; root.setAttribute('role','dialog'); root.setAttribute('aria-modal','false'); document.body.append(root);
  const st = { id: null, sayText: '', sayUntil: 0 };
  let resizeRoom=null;
  addEventListener('resize',()=>resizeRoom?.());
  const say = (text, sec = 4) => { st.sayText = text; st.sayUntil = performance.now() / 1000 + sec; };

  function frame(title, pills, onPill) {
    root.replaceChildren(); root.setAttribute('aria-label',title);
    root.append(el('div', 'st-shade'));
    const head = el('div', 'st-head');
    const kickers={'Chuyện của Li':'NGƯỜI GIỮ KHU VƯỜN','Góc võng':'ẢNH & NHỮNG NGÀY THONG THẢ','Rạp phim':'MỜI BẠN NGỒI XUỐNG'};
    head.append(el('div', 'st-sign', `<small>${kickers[title]||''}</small><h2>${esc(title)}</h2>`));
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
    const icons=[
      '<path d="M9 18h6m-5 3h4M8 14a7 7 0 1 1 8 0l-1 3H9zM12 1v2M2 7l2 1m16 0 2-1"/>',
      '<path d="M3 4h18v16H3zM3 8h18M7 8v7l-4 3m14-10v7l4 3M8 20v-3h8v3"/>',
      '<path d="M9 17V5l11-2v12M9 8l11-2"/><ellipse cx="6" cy="18" rx="3" ry="2"/><ellipse cx="17" cy="16" rx="3" ry="2"/>'
    ];
    const skillIcon=i=>`<span class="skill-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${icons[i]}</svg></span>`;
    const skills=()=>profile.capabilities.map((c,i)=>`<article class="profile-skill">${skillIcon(i)}<h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></article>`).join('');
    const show=tab=>{
      body.replaceChildren();
      const identity=el('aside','profile-identity',`<div class="profile-portrait"><img src="./art-v34/ui/li-host-transparent.webp" alt="Li — chủ khu vườn"><span>NGƯỜI GIỮ KHU VƯỜN</span></div><small>CỨ GỌI MÌNH LÀ LI</small><h3>${esc(profile.name)}</h3><p>${esc(profile.role)}</p><a href="mailto:${esc(profile.email)}">Gửi thư cho Li <span aria-hidden="true">↗</span></a>`);
      const content=el('section','profile-content');
      if(tab==='letter'){
        content.innerHTML=`<header class="profile-section"><small>MỘT LÁ THƯ TỪ LI</small><h3>Từ ý tưởng đến<br><em>những khoảnh khắc thật.</em></h3></header><div class="profile-letter"><p class="hello">Gửi bạn ghé vườn,</p><p>${esc(profile.intro)}</p><span class="profile-signature">— Li</span></div><div class="profile-skills">${skills()}</div>`;
      }else if(tab==='road'){
        content.innerHTML='<header class="profile-section"><small>2010 → HÔM NAY</small><h3>Chặng đường hành nghề</h3><p>Mỗi chặng, một cách làm sáng tạo.</p></header>';
        const road=el('ol','career-timeline');
        profile.resume.forEach((r,i)=>road.append(el('li','career-stop',`<div class="career-period"><span>${esc(r.period)}</span><small>${String(profile.resume.length-i).padStart(2,'0')}</small></div><h4>${esc(r.role)}</h4><b>${esc(r.company)}</b>${r.detail?`<p>${esc(r.detail)}</p>`:''}`)));
        content.append(road);
      }else{
        content.innerHTML=`<header class="profile-section"><small>LI CÓ THỂ ĐỒNG HÀNH</small><h3>Một ý tưởng, nhiều cách kể.</h3></header><div class="profile-skills">${skills()}</div><section class="profile-background"><h4>Nền tảng & chia sẻ</h4><ul>${profile.background.map(b=>`<li>${esc(b)}</li>`).join('')}</ul></section>`;
      }
      body.append(identity,content);body.scrollTop=0;arrive(content);
    };
    body=frame('Chuyện của Li',[['letter','Thư ngỏ'],['road','Chặng đường'],['craft','Li làm gì']],show);
    body.classList.add('house');show('letter');
  }

  // ---------- Góc võng: the photo album ----------
  function openHammock() {
    let body, list = gallery, page = 0;
    const columnCount=()=>innerWidth<=760?2:innerWidth<=1100?4:5;let columns=columnCount();
    const render = () => {
      body.replaceChildren();
      body.append(el('div','album-intro',`<div><small>NHỮNG ĐIỀU LI GIỮ LẠI</small><h3>Ảnh & những ngày thong thả</h3></div><span>${list.length} tấm ảnh</span>`));
      const grid=el('div','memory-grid');
      const lanes=Array.from({length:columns},()=>el('div','memory-column')),heights=lanes.map(()=>0);grid.append(...lanes);
      list.forEach((g,i)=>{
        const b=el('button','memory-photo',`<img alt="${esc(g.title)}" loading="lazy" decoding="async" width="${g.width}" height="${g.height}" src="./data/${esc(g.src.replace('assets/gallery/','gallery/'))}"><span>${esc(g.tag)}<small>${String(i+1).padStart(2,'0')}</small></span>`);
        b.type='button';b.addEventListener('click',()=>lightbox(i));const lane=heights.indexOf(Math.min(...heights));lanes[lane].append(b);heights[lane]+=g.height/g.width+.18;
      });
      body.append(grid);body.scrollTop=0;
    };
    const lightbox = (i, origin = document.activeElement) => {
      const previous=origin;
      const g = list[i], box = el('div', 'lightbox'); box.setAttribute('role','dialog');box.setAttribute('aria-modal','true'); box.setAttribute('aria-label','Ảnh phóng lớn');
      box.innerHTML = `<figure class="polaroid"><img alt="${esc(g.title)}" src="./data/${esc(g.src.replace('assets/gallery/', 'gallery/'))}"><figcaption>${esc(g.tag)} <span>${i + 1} / ${list.length}</span></figcaption></figure>`;
      const prev = el('button', 'logbtn lb-prev', ARROW('l')), next = el('button', 'logbtn lb-next', ARROW('r')), x = el('button', 'logbtn lb-x', ICON_X);
      prev.setAttribute('aria-label','Ảnh trước'); next.setAttribute('aria-label','Ảnh sau'); x.setAttribute('aria-label','Đóng ảnh');
      prev.addEventListener('click', (e) => { e.stopPropagation(); box.remove(); lightbox((i - 1 + list.length) % list.length, previous); });
      next.addEventListener('click', (e) => { e.stopPropagation(); box.remove(); lightbox((i + 1) % list.length, previous); });
      const dismiss=()=>{focusScope(box,false);box.remove();if(previous?.isConnected)previous.focus({preventScroll:true});};
      box.dismiss=dismiss; x.addEventListener('click', dismiss); box.addEventListener('click', (e) => { if (e.target === box) dismiss(); });
      box.append(prev, next, x); root.append(box);focusScope(box,true); arrive(box); x.focus({preventScroll:true});
      box.addEventListener('keydown', e => { if (e.key === 'ArrowRight') next.click(); if (e.key === 'ArrowLeft') prev.click(); });
    };
    body = frame('Góc võng', [['all', 'Tất cả'], ['Khoảnh khắc', 'Khoảnh khắc'], ['Thiết kế', 'Thiết kế']], (tag) => { list = tag === 'all' ? gallery : gallery.filter((g) => g.tag === tag); page = 0; render(); });
    body.classList.add('hammock');
    resizeRoom=()=>{if(columns!==columnCount()){const ratio=body.scrollTop/Math.max(1,body.scrollHeight);columns=columnCount();render();body.scrollTop=ratio*body.scrollHeight;}};
    render();
  }

  // ---------- Rạp phim ----------
  function openCine() {
    let body, selected = videos[0];
    const kinds = { all: () => true, mv: (v) => /music video|\bmv\b/i.test(v.title + ' ' + v.meta), event: (v) => !/music video|\bmv\b/i.test(v.title + ' ' + v.meta) };
    const setTheater = (open) => {
      root.classList.toggle('theater-mode',open);
      const exit=root.querySelector('.theater-exit'); exit.hidden=!open;
      (open?exit:body.querySelector('.theater-open'))?.focus({preventScroll:true});
    };
    const showInfo = v => {
      const info=body.querySelector('.now-film');
      info.innerHTML=`<small class="film-kicker">SUẤT CHIẾU CỦA LI</small><h3>${esc(v.title)}</h3><p class="film-meta">${esc(v.meta)}</p><div class="film-actions"><button type="button" class="theater-open">⛶ Tắt đèn, xem phim</button><a class="film-external" href="${esc(v.url)}" target="_blank" rel="noopener noreferrer">Mở trên ${esc(v.provider || 'trang gốc')} ↗</a></div>${v.credits?`<details><summary>Ekip thực hiện</summary><p>${esc(v.credits).replace(/\n/g,'<br>')}</p></details>`:''}`;
      info.querySelector('.theater-open').addEventListener('click',()=>setTheater(true));
      for(const t of body.querySelectorAll('.ticket')) { const on=t.videoRef===v;t.classList.toggle('on',on);t.setAttribute('aria-pressed',String(on)); }
    };
    const play = v => {
      selected=v;const scr=body.querySelector('.screen');scr.replaceChildren();
      if(v.embed){
        const f=el('iframe');f.src=v.embed+(v.embed.includes('?')?'&':'?')+'autoplay=1';
        f.allow='autoplay; fullscreen; picture-in-picture';f.referrerPolicy='strict-origin-when-cross-origin';f.allowFullscreen=true;f.title=v.title;scr.append(f);onPlayVideo?.();
      }else{
        const card=el('div','film-offsite',`<small>PHIM ĐƯỢC CHIẾU TRÊN ${esc(v.provider).toUpperCase()}</small><b>${esc(v.title)}</b><a href="${esc(v.url)}" target="_blank" rel="noopener noreferrer">Mở phim ↗</a>`);scr.append(card);
      }
      showInfo(v);say(`Chiếu “${v.title}” nha.`,3.5);
    };
    const renderTickets = list => {
      const strip=body.querySelector('.tickets');strip.replaceChildren();
      body.querySelector('.ticket-count').textContent=`${list.length} thước phim`;
      for(const v of list){
        const number=String(videos.indexOf(v)+1).padStart(2,'0');
        const thumb=v.thumb?`<img alt="" loading="lazy" src="${esc(v.thumb)}">`:`<span class="ticket-reel" aria-hidden="true"><img src="./art-v34/ui/icon-5.webp" alt=""></span>`;
        const t=el('button','ticket',`${thumb}<span class="ticket-copy"><small>VÉ ${number} · ${esc(v.provider)}</small><b>${esc(v.title)}</b><em>${esc(v.meta)}</em></span><span class="ticket-play" aria-hidden="true">▶</span>`);
        t.type='button';t.videoRef=v;t.classList.toggle('on',v===selected);t.setAttribute('aria-pressed',String(v===selected));t.addEventListener('click',()=>play(v));strip.append(t);
      }
    };
    body=frame('Rạp phim', [['all','Tất cả'],['event','Sân khấu & sự kiện'],['mv','Music video']], k=>renderTickets(videos.filter(kinds[k])));
    body.classList.add('cine');
    const projection=el('div','projection');
    const scr=el('div','screen');
    const start=el('button','film-start',`<span aria-hidden="true">▶</span><small>MỜI BẠN NGỒI XUỐNG</small><b>${esc(selected.title)}</b><em>Bắt đầu suất chiếu</em>`);
    start.type='button';start.addEventListener('click',()=>play(selected));scr.append(start);projection.append(scr);
    const info=el('div','now-film');const shelf=el('aside','ticket-shelf','<header><b>Chọn một tấm vé</b><small class="ticket-count"></small></header>');
    const strip=el('div','tickets');shelf.append(strip);body.append(projection,info,shelf);
    const exit=el('button','theater-exit','← Bật đèn · Trở lại rạp');exit.type='button';exit.hidden=true;exit.addEventListener('click',()=>setTheater(false));root.append(exit);
    renderTickets(videos);showInfo(selected);
  }

  async function setOpen(id, retry=false) {
    if (id === st.id && !retry) return;
    const token=++request;
    resizeRoom=null; st.id=id; root.className=`room ${id || ''}`;
    root.querySelectorAll('iframe').forEach(f=>f.remove());
    reveal(root,!!id); onOpenChange?.(id);
    if(!id){focusScope(root,false);return;}
    const body=frame(ROOMS[id].title,[],()=>{});
    body.innerHTML='<div class="room-status" role="status">Li đang mở góc này…</div>';
    focusScope(root,true);
    try {
      const result=await read({house:'profile',hammock:'gallery',cine:'videos'}[id]);
      if(token!==request)return;
      if(id==='house'){profile=result;openHouse();}
      if(id==='hammock'){gallery=result;openHammock();}
      if(id==='cine'){videos=result;openCine();}
      const g=ROOMS[id].greet;say(g[(Math.random()*g.length)|0],4);
      root.querySelector('.st-close')?.focus({preventScroll:true});
    } catch(error) {
      if(token!==request)return;
      body.replaceChildren(el('div','room-status','<p>Góc này chưa tải được. Vườn vẫn mở, mình thử lại nhé.</p>'));
      const retryButton=el('button','primary','Thử lại');retryButton.onclick=()=>setOpen(id,true);body.firstChild.append(retryButton);
    }
  }
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && st.id) { if(root.classList.contains('theater-mode')){root.querySelector('.theater-exit')?.click();return;} const lb = root.querySelector('.lightbox'); if (lb) lb.dismiss(); else setOpen(null); } });
  return {
    open: setOpen, close: () => setOpen(null), get current() { return st.id; },
    bubble: () => (performance.now() / 1000 < st.sayUntil ? st.sayText : ''),
  };
}

// ---------- the gate: the first screen ----------
export async function initGate({ onEnter }) {
  const quotes = []; // Greeting data is enhancement; never blocks the entrance.
  const h = new Date().getHours(), phase = h >= 18 || h < 6 ? 'night' : 'day';
  const pool = quotes.filter((q) => q.phase === 'both' || q.phase === phase);
  const q = pool[(Math.random() * pool.length) | 0]?.text || 'Có nhạc. Có cây. Có chỗ ngồi.';
  const gate = el('div', 'gate'); gate.setAttribute('role','dialog'); gate.setAttribute('aria-modal','true'); gate.setAttribute('aria-label','Chào bạn ghé vườn');
  gate.innerHTML = `<div class="gate-card"><div class="st-sign"><h2>vườn của Li</h2></div><span class="eyebrow">Một góc nhỏ của Anh Li</span><h1>Ngoài kia vội,<br>ở đây cứ chậm.</h1><p class="gate-q">${esc(q)}</p><button class="gate-go" type="button">Mở cổng vườn</button><small>Nhạc · ảnh · chuyện · và vài em thú nhỏ</small></div>`;
  document.body.append(gate);
  fetch('./data/entrance-quotes.json',{},4000).then(r=>r.json()).then(quotes=>{const pool=quotes.filter(q=>q.phase==='both'||q.phase===phase);if(gate.isConnected&&pool.length)gate.querySelector('.gate-q').textContent=pool[(Math.random()*pool.length)|0].text;}).catch(()=>{});
  focusScope(gate, true);
  gate.querySelector('.gate-go').focus({ preventScroll: true });
  gate.querySelector('.gate-go').addEventListener('click', () => { document.body.classList.remove('at-gate'); gate.classList.add('open'); gate.inert = true; focusScope(gate, false); setTimeout(() => gate.remove(), 900); onEnter?.(); });
}
