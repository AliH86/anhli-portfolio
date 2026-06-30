// tweaks-app.jsx — Tweaks panel + external music data layer for Anh Li portfolio.
// Hero update: The Anhli Muse's Dandelion Garden highlights the current featured album from music-data.js.

(function loadPortfolioUpgrade(){
  if (document.getElementById('portfolio-upgrade-css')) return;
  const link = document.createElement('link');
  link.id = 'portfolio-upgrade-css';
  link.rel = 'stylesheet';
  link.href = 'portfolio-upgrade.css?v=20260630-hero-chuyen-tinh';
  document.head.appendChild(link);
})();

(function loadExternalMusicData(){
  const DATA_VERSION = '20260630-hero-chuyen-tinh-1';
  const HERO_HIGHLIGHT_ID = 'debb379c-7814-426c-8409-abe0f0a43215';
  const TRACK_PAGE = 10;
  let albums = [];
  let curAlbum = -1;
  let curTracks = [];
  let activeIdx = -1;
  let shuffleOn = false;

  const esc = (v) => String(v == null ? '' : v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
  const cover = (url) => url || '';
  const art = (id) => id ? `https://cdn2.suno.ai/image_${id}.jpeg` : '';
  const stream = (id) => id ? `https://cdn1.suno.ai/${id}.mp3` : '';
  const embed = (id) => id ? `https://suno.com/embed/${id}` : '';
  const fmt = (s) => {
    s = Math.floor(s || 0);
    return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  };
  const all = (sel) => Array.from(document.querySelectorAll(sel));

  function normalizeMusicData(data){
    if (!data || !Array.isArray(data.albums)) return data;
    const list = data.albums;
    const byId = new Map(list.map((a) => [a.id, a]));

    const hero = byId.get(HERO_HIGHLIGHT_ID);
    if (hero) {
      hero.name = 'Chuyện Tình Này...Nó Lạ...';
      hero.playlistUrl = 'https://suno.com/playlist/debb379c-7814-426c-8409-abe0f0a43215';
      hero.sub = "Folk-soul Noir · Retro Pop · Anh Li & D'Li";
      hero.cover = 'uploads/chuyen-tinh-nay-no-la.jpg';
      hero.desc = "Một góc tình ca kỳ lạ của Anh Li & D'Li — tối, lạ, quyến rũ vừa đủ; nơi những câu chuyện yêu không cần đi theo đường thẳng.";
      if (Array.isArray(hero.tracks)) hero.count = hero.tracks.length;
    }

    const caBien = byId.get('35ce4803-2ec5-405a-abdb-4a4a2cbf64a1');
    if (caBien) {
      caBien.name = 'Cả Biển Trời Trong Mắt';
      caBien.playlistUrl = 'https://suno.com/playlist/35ce4803-2ec5-405a-abdb-4a4a2cbf64a1';
      caBien.sub = 'Ballad Collection · Anh Li · Healing Pop';
      caBien.cover = 'uploads/ca-bien-troi-trong-mat.jpg';
    }

    const unpluggedVol1 = byId.get('2818d6f0-318d-4aad-94ac-027ccc756ec4');
    if (unpluggedVol1) {
      unpluggedVol1.name = 'Unplugged Vol.1';
      unpluggedVol1.playlistUrl = 'https://suno.com/playlist/2818d6f0-318d-4aad-94ac-027ccc756ec4';
    }
    const unpluggedVol2 = byId.get('15c4b5fa-3d24-4a7c-b1bf-6ca2420d81c7');
    if (unpluggedVol2) {
      unpluggedVol2.name = 'Unplugged Vol.2';
      unpluggedVol2.playlistUrl = 'https://suno.com/playlist/15c4b5fa-3d24-4a7c-b1bf-6ca2420d81c7';
      if (Array.isArray(unpluggedVol2.tracks)) unpluggedVol2.count = unpluggedVol2.tracks.length;
    }
    const myVi = byId.get('b1021057-56bd-49e8-a1fb-5af4d69c2c0e');
    if (myVi) {
      myVi.name = 'Mỹ Vị Nhân Sinh';
      myVi.playlistUrl = 'https://suno.com/playlist/b1021057-56bd-49e8-a1fb-5af4d69c2c0e';
      myVi.sub = 'Alt-Indie Folk · Anh Li';
      if (Array.isArray(myVi.tracks)) myVi.count = myVi.tracks.length;
    }

    const newAlbumId = '8f2c17b4-cb70-46e1-9f2e-464ccadaf1ab';
    if (!byId.has(newAlbumId)) {
      const newAlbum = {
        id: newAlbumId,
        playlistUrl: 'https://suno.com/playlist/8f2c17b4-cb70-46e1-9f2e-464ccadaf1ab',
        name: 'Đi Khắp Một Dãy Non Sông',
        sub: 'Vietnam Travel · Folk Pop · Anh Li',
        cover: 'uploads/di-khap-mot-day-non-song.jpg',
        desc: 'Một hành trình âm nhạc đi qua những miền non sông Việt Nam — gom phong cảnh, ký ức và tình quê thành một dải thanh âm.',
        count: 0,
        tracks: [],
      };
      const vnIndex = list.findIndex((a) => a.id === 'df0c36ec-4afd-4760-9aa3-3b05350a1b87');
      if (vnIndex >= 0) list.splice(vnIndex + 1, 0, newAlbum);
      else list.push(newAlbum);
    }

    const heroIndex = list.findIndex((a) => a.id === HERO_HIGHLIGHT_ID);
    if (heroIndex > 0) list.unshift(list.splice(heroIndex, 1)[0]);

    data.version = '2026-06-30-hero-chuyen-tinh-1';
    data.heroHighlight = HERO_HIGHLIGHT_ID;
    return data;
  }

  function injectHeroCSS(){
    if (document.getElementById('anhli-hero-highlight-css')) return;
    const style = document.createElement('style');
    style.id = 'anhli-hero-highlight-css';
    style.textContent = `
      .poster-hero .hero-roles{height:auto;min-height:1.4rem;margin-bottom:2.35rem;}
      .poster-hero .hero-roles #typewriter,.poster-hero .hero-roles #typewriter-cursor{display:none!important;}
      .poster-hero .hero-roles::before{content:"THE ANHLI MUSE'S DANDELION GARDEN";font-size:.72rem;letter-spacing:.28em;text-transform:uppercase;color:rgba(35,58,42,.74);}
      .hero-feature-jewel{position:absolute;right:clamp(2.4rem,7vw,8rem);top:clamp(7.5rem,18vh,12rem);width:clamp(250px,27vw,500px);z-index:5;pointer-events:auto;transform:perspective(1200px) rotateY(-10deg) rotateX(2deg);filter:drop-shadow(0 28px 48px rgba(19,33,18,.28));}
      .hero-feature-case{position:relative;aspect-ratio:1;border:1px solid rgba(255,255,255,.55);border-radius:10px;background:linear-gradient(135deg,rgba(255,255,255,.26),rgba(255,255,255,.08) 45%,rgba(255,255,255,.22));box-shadow:inset 0 0 0 2px rgba(255,255,255,.16),inset 18px 0 34px rgba(255,255,255,.16),0 0 0 1px rgba(58,80,45,.16);overflow:hidden;backdrop-filter:blur(2px);}
      .hero-feature-case::before{content:"";position:absolute;left:6.4%;top:0;bottom:0;width:5.4%;border-right:1px solid rgba(255,255,255,.34);border-left:1px solid rgba(255,255,255,.2);background:linear-gradient(90deg,rgba(255,255,255,.24),rgba(80,92,76,.06));z-index:3;}
      .hero-feature-case::after{content:"";position:absolute;inset:0;background:linear-gradient(128deg,rgba(255,255,255,.52) 0 10%,transparent 24% 70%,rgba(255,250,226,.24));mix-blend-mode:screen;opacity:.9;z-index:4;pointer-events:none;}
      .hero-feature-cover{position:absolute;inset:8% 8% 8% 13%;border-radius:50%;object-fit:cover;box-shadow:0 0 0 1px rgba(255,255,255,.22),0 18px 40px rgba(0,0,0,.2);}
      .hero-feature-hole{position:absolute;left:50%;top:50%;width:16%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;z-index:5;background:radial-gradient(circle,#0e120e 0 28%,rgba(255,255,255,.68) 31% 42%,rgba(24,29,22,.52) 45% 100%);box-shadow:0 0 0 1px rgba(255,255,255,.42),0 0 18px rgba(255,255,255,.18);}
      .hero-feature-copy{position:absolute;left:11%;right:8%;bottom:8%;z-index:6;padding:.7rem .8rem;border-radius:14px;background:linear-gradient(90deg,rgba(11,20,10,.74),rgba(11,20,10,.18));border:1px solid rgba(255,250,226,.14);color:#fff8df;backdrop-filter:blur(6px);text-shadow:0 2px 14px rgba(0,0,0,.42);}
      .hero-feature-copy span{display:block;font-size:.52rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,248,214,.72);margin-bottom:.22rem;}
      .hero-feature-copy strong{display:block;font-family:'Cormorant Garamond',serif;font-size:clamp(1.1rem,2vw,1.9rem);font-weight:400;line-height:.95;}
      .hero-feature-copy em{display:block;margin-top:.35rem;font-style:normal;font-size:.62rem;letter-spacing:.08em;color:rgba(255,248,214,.76);}
      .hero-album-garden .gc-feature{left:52vw;top:46vh;--s:clamp(120px,9vw,210px);--rot:-10deg;--rx:14deg;--ry:-16deg;opacity:.84;}
      .hero-album-garden .gc-dli{left:39vw;top:57vh;--s:clamp(130px,10vw,220px);--rot:8deg;--rx:12deg;--ry:18deg;opacity:.76;}
      .hero-album-garden .gc-soft{right:8vw;bottom:10vh;--s:clamp(150px,16vw,340px);--rot:-8deg;--rx:14deg;--ry:-18deg;--blur:8px;opacity:.28;}
      .hero-album-garden .gd-sky{right:14vw;top:24vh;--s:clamp(82px,6vw,150px);--rot:14deg;--rx:60deg;--ry:-14deg;opacity:.52;}
      .hero-album-garden .gd-noir{left:48vw;top:18vh;--s:clamp(92px,7vw,170px);--rot:-18deg;--rx:58deg;--ry:22deg;opacity:.48;}
      @media (max-width:900px){.hero-feature-jewel{right:-24vw;top:16svh;width:72vw;opacity:.38;pointer-events:none}.hero-feature-copy{display:none}.hero-album-garden .gc-feature,.hero-album-garden .gc-dli,.hero-album-garden .gd-sky,.hero-album-garden .gd-noir{display:none!important}}
      @media (max-width:620px){.poster-hero .hero-roles::before{font-size:.58rem;letter-spacing:.2em}.hero-feature-jewel{right:-32vw;top:13svh;width:84vw;opacity:.24}}
    `;
    document.head.appendChild(style);
  }

  function makeImg(src, alt, className){
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt || '';
    if (className) img.className = className;
    img.draggable = false;
    return img;
  }

  function makeGardenCard(album, className){
    if (!album) return null;
    const span = document.createElement('span');
    span.className = `garden-piece garden-card ${className}`;
    span.appendChild(makeImg(cover(album.cover), '', ''));
    return span;
  }

  function makeGardenDisc(album, className){
    if (!album) return null;
    const span = document.createElement('span');
    span.className = `garden-piece garden-disc ${className}`;
    span.style.setProperty('--cover', `url('${cover(album.cover)}')`);
    return span;
  }

  function syncDandelionHero(data){
    injectHeroCSS();
    const list = data && Array.isArray(data.albums) ? data.albums : albums;
    if (!list || !list.length) return;
    const byId = new Map(list.map((a) => [a.id, a]));
    const hero = byId.get(HERO_HIGHLIGHT_ID) || list[0];
    const caBien = byId.get('35ce4803-2ec5-405a-abdb-4a4a2cbf64a1') || list.find((a) => /Biển Trời/i.test(a.name || ''));
    const toiHat = byId.get('bd830721-0b26-40ea-b7d5-508e5d6612a2') || list.find((a) => /Bốn Mùa/i.test(a.name || ''));
    const khoang = byId.get('c6672b33-6803-4fa3-8c9d-900d15dfaf2d') || list.find((a) => /Khoảng/i.test(a.name || ''));
    const drill = byId.get('560a4089-5871-4536-8375-785f7a2f8dca') || list.find((a) => /DRILL/i.test(a.name || ''));
    window.ANHLI_HERO_HIGHLIGHT = hero;

    const garden = document.querySelector('.hero-album-garden');
    if (garden && hero) {
      garden.replaceChildren();
      const link = document.createElement('a');
      link.className = 'hero-feature-jewel';
      link.href = hero.playlistUrl || '#music';
      if (hero.playlistUrl) {
        link.target = '_blank';
        link.rel = 'noopener';
      }
      link.setAttribute('aria-label', `Album nổi bật: ${hero.name}`);
      const shell = document.createElement('div');
      shell.className = 'hero-feature-case';
      shell.appendChild(makeImg(cover(hero.cover), hero.name, 'hero-feature-cover'));
      const hole = document.createElement('span');
      hole.className = 'hero-feature-hole';
      hole.setAttribute('aria-hidden', 'true');
      shell.appendChild(hole);
      const copy = document.createElement('div');
      copy.className = 'hero-feature-copy';
      copy.innerHTML = `<span>Album nổi bật</span><strong>${esc(hero.name)}</strong><em>${esc(hero.sub || '')}</em>`;
      shell.appendChild(copy);
      link.appendChild(shell);
      garden.appendChild(link);
      [
        makeGardenCard(hero, 'gc-feature'),
        makeGardenCard(toiHat, 'gc-dli'),
        makeGardenCard(caBien, 'gc-soft'),
        makeGardenDisc(caBien, 'gd-sky'),
        makeGardenDisc(drill || khoang, 'gd-noir'),
      ].forEach((node) => { if (node) garden.appendChild(node); });
    }

    const quote = document.querySelector('.hero-quote');
    if (quote) quote.innerHTML = '"Tử tế. Tinh tế.<br/>Tạo giá trị thật.<br/>Đó là cách Anh Li làm nghệ."';
    const manifesto = document.querySelector('.hero-manifesto');
    if (manifesto && hero) manifesto.textContent = `Đợt này khu vườn đang mở bằng ${hero.name} — một lát tình ca noir-pop kỳ lạ của Anh Li & D'Li.`;
    const side = document.querySelector('.hero-side');
    if (side) side.textContent = "The Anhli Muse's Dandelion Garden · Anh Li & D'Li";
  }

  function updateAlbumLabel(){
    const label = all('.albums-label').find((el) => /Albums|playlist/i.test(el.textContent || ''));
    if (label) label.textContent = `Albums · ${albums.length} playlist · dữ liệu tách riêng từ music-data.js`;
  }

  function renderAlbumGrid(){
    const grid = document.getElementById('albumGrid');
    if (!grid || !albums.length) return;
    const frag = document.createDocumentFragment();
    const build = (a, i) => {
      const card = document.createElement('div');
      card.className = 'album';
      card.dataset.aidx = String(i);
      const count = (a.tracks && a.tracks.length) || a.count || 0;
      const likeN = parseInt(localStorage.getItem('album_likes_' + a.id) || '0', 10);
      card.innerHTML = `<div class="album-cover"><img src="${esc(cover(a.cover))}" alt="${esc(a.name)}" loading="lazy"/><div class="album-play">⌄</div><span class="album-badge">${count} bài</span><button class="album-like${likeN > 0 ? ' liked' : ''}" type="button" data-aidx="${i}" aria-label="Thích">♥<span class="like-n">${likeN > 0 ? ' ' + likeN : ''}</span></button></div><div class="album-name">${esc(a.name)}</div><div class="album-sub">${esc(a.sub || '')}</div>`;
      return card;
    };
    albums.forEach((a, i) => frag.appendChild(build(a, i)));
    albums.forEach((a, i) => frag.appendChild(build(a, i)));
    grid.replaceChildren(frag);
    if (typeof window.initCoverflow === 'function') window.initCoverflow();
  }

  function markPlaying(idx){
    all('.trow').forEach((r) => r.classList.toggle('playing', Number(r.dataset.idx) === idx));
  }

  function showEmbed(id){
    const w = document.getElementById('trackEmbed');
    if (!w || !id) return;
    w.innerHTML = `<iframe src="${embed(id)}" allow="autoplay" loading="lazy"></iframe>`;
    w.classList.add('open');
  }

  function hideEmbed(){
    const w = document.getElementById('trackEmbed');
    if (w) {
      w.classList.remove('open');
      w.replaceChildren();
    }
  }

  function renderDrawer(a, tracks, showAll){
    const drawer = document.getElementById('albumDrawer');
    if (!drawer) return;
    const idx = albums.indexOf(a);
    const likeN = parseInt(localStorage.getItem('album_likes_' + a.id) || '0', 10);
    const list = showAll ? tracks : (tracks || []).slice(0, TRACK_PAGE);
    const rows = list.map((t, j) => `<div class="trow" data-idx="${j}"><div class="trow-num"><span class="num-d">${String(j + 1).padStart(2, '0')}</span><span class="num-eq"><i></i><i></i><i></i></span></div><img class="trow-art" src="${art(t.id)}" alt="" loading="lazy"/><div class="trow-info"><div class="trow-name">${esc(t.name)}</div></div><div class="trow-dur">${esc(t.dur || '')}</div></div>`).join('');
    const more = (!showAll && tracks && tracks.length > TRACK_PAGE) ? `<div class="drawer-more"><button type="button" class="drawer-more-btn" data-show-all="${idx}">+ ${tracks.length - TRACK_PAGE} bài nữa</button></div>` : '';
    const descHtml = a.desc ? `<div class="drawer-desc">${esc(a.desc)}</div>` : '';
    const openSuno = a.playlistUrl ? `<a href="${esc(a.playlistUrl)}" target="_blank" rel="noopener" class="drawer-suno">Mở playlist Suno →</a>` : '';
    const emptyHtml = (!tracks || !tracks.length) ? `<div class="drawer-more" style="padding:1rem 0 0">Album đã được thêm. Danh sách bài sẽ phát trên web khi có song ID từ Suno.</div>` : '';
    drawer.innerHTML = `<div class="drawer-inner"><div class="vinyl-bg" aria-hidden="true"><div class="vinyl-disc" style="background-image:url('${esc(cover(a.cover))}')"><div class="vinyl-center"></div></div></div><div class="drawer-z"><div class="drawer-head"><div style="min-width:0;flex:1"><div class="drawer-title">${esc(a.name)}<span>${(tracks && tracks.length) || a.count || 0} bài</span></div>${descHtml}</div><div class="drawer-actions">${openSuno}<button class="drawer-like${likeN > 0 ? ' liked' : ''}" type="button" data-drawer-like="${idx}">♡<span class="like-n">${likeN > 0 ? ' ' + likeN : ''}</span></button><button class="drawer-playall" type="button" data-play-track="0"${(!tracks || !tracks.length) ? ' disabled style="opacity:0.4;cursor:default"' : ''}>▶ Phát từ đầu</button></div></div><div class="tlist">${rows}</div>${more}${emptyHtml}</div></div>`;
    if (curAlbum === idx && activeIdx >= 0) markPlaying(activeIdx);
  }

  window.selectAlbum = function selectAlbum(i, silent){
    const drawer = document.getElementById('albumDrawer');
    const carousel = document.getElementById('albumCarousel');
    if (!drawer || !albums[i]) return;
    if (curAlbum === i && drawer.classList.contains('open') && !silent) {
      drawer.classList.remove('open');
      if (carousel) carousel.classList.remove('paused');
      all('.album[data-aidx]').forEach((a) => a.classList.remove('selected'));
      curAlbum = -1;
      curTracks = [];
      return;
    }
    curAlbum = i;
    curTracks = albums[i].tracks || [];
    all('.album[data-aidx]').forEach((a) => a.classList.toggle('selected', Number(a.dataset.aidx) === i));
    renderDrawer(albums[i], curTracks);
    drawer.classList.add('open');
    if (carousel) carousel.classList.add('paused');
  };

  window.showAllTracks = function showAllTracks(i){
    if (curAlbum === i && albums[i]) renderDrawer(albums[i], curTracks, true);
  };

  window.likeAlbum = function likeAlbum(i, e){
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (!albums[i]) return;
    const key = 'album_likes_' + albums[i].id;
    const n = parseInt(localStorage.getItem(key) || '0', 10) + 1;
    localStorage.setItem(key, n);
    all(`.album-like[data-aidx="${i}"]`).forEach((btn) => {
      btn.classList.add('liked');
      const nEl = btn.querySelector('.like-n');
      if (nEl) nEl.textContent = ' ' + n;
    });
    const dl = document.querySelector('.drawer-like');
    if (dl) {
      dl.classList.add('liked');
      const nEl = dl.querySelector('.like-n');
      if (nEl) nEl.textContent = ' ' + n;
    }
  };

  window.playAt = function playAt(j){
    const audio = document.getElementById('audioEl');
    if (!audio || !curTracks.length) return;
    if (j < 0) j = curTracks.length - 1;
    if (j >= curTracks.length) j = 0;
    if (j === activeIdx) {
      if (audio.paused) audio.play().catch(() => {});
      else audio.pause();
      return;
    }
    activeIdx = j;
    const t = curTracks[j];
    markPlaying(j);
    hideEmbed();
    const coverEl = document.getElementById('playerCover');
    if (coverEl) coverEl.innerHTML = `<img src="${art(t.id)}" alt=""/>`;
    const title = document.getElementById('playerTitle');
    const sub = document.getElementById('playerSub');
    const dur = document.getElementById('pcDur');
    const cur = document.getElementById('pcCur');
    const fill = document.getElementById('pcFill');
    if (title) title.textContent = t.name;
    if (sub) sub.textContent = (albums[curAlbum] ? albums[curAlbum].name : 'Cái Sạp nhạc') + ' · Cái Sạp nhạc';
    if (dur) dur.textContent = t.dur || '0:00';
    if (cur) cur.textContent = '0:00';
    if (fill) fill.style.width = '0%';
    if (!t.id) return;
    audio.src = stream(t.id);
    audio.play().catch(() => {});
  };

  window.nextTrack = function nextTrack(){
    if (!curTracks.length) return;
    if (shuffleOn) {
      let r;
      do { r = Math.floor(Math.random() * curTracks.length); }
      while (curTracks.length > 1 && r === activeIdx);
      window.playAt(r);
    } else {
      window.playAt(activeIdx < 0 ? 0 : activeIdx + 1);
    }
  };

  window.prevTrack = function prevTrack(){ window.playAt(activeIdx < 0 ? 0 : activeIdx - 1); };
  window.togglePlay = function togglePlay(){
    const audio = document.getElementById('audioEl');
    if (!audio) return;
    if (activeIdx < 0) { window.playAt(0); return; }
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  };
  window.toggleShuffle = function toggleShuffle(){
    shuffleOn = !shuffleOn;
    const btn = document.getElementById('pcShuffle');
    if (btn) {
      btn.style.color = shuffleOn ? 'var(--amber)' : '';
      btn.style.opacity = shuffleOn ? '1' : '0.5';
    }
  };

  function bindPlayerControls(){
    if (window.__portfolioMusicControlsBound) return;
    window.__portfolioMusicControlsBound = true;
    document.getElementById('pcPrev')?.addEventListener('click', () => window.prevTrack());
    document.getElementById('pcNext')?.addEventListener('click', () => window.nextTrack());
    document.getElementById('pcPlay')?.addEventListener('click', () => window.togglePlay());
    document.getElementById('pcShuffle')?.addEventListener('click', () => window.toggleShuffle());
    document.getElementById('albumGrid')?.addEventListener('click', (e) => {
      const like = e.target.closest('.album-like');
      if (like) return window.likeAlbum(Number(like.dataset.aidx), e);
      const card = e.target.closest('.album[data-aidx]');
      if (card) window.selectAlbum(Number(card.dataset.aidx));
    });
    document.getElementById('albumDrawer')?.addEventListener('click', (e) => {
      const row = e.target.closest('.trow[data-idx]');
      if (row) return window.playAt(Number(row.dataset.idx));
      const more = e.target.closest('[data-show-all]');
      if (more) return window.showAllTracks(Number(more.dataset.showAll));
      const like = e.target.closest('[data-drawer-like]');
      if (like) return window.likeAlbum(Number(like.dataset.drawerLike), e);
      const play = e.target.closest('[data-play-track]');
      if (play) return window.playAt(Number(play.dataset.playTrack));
    });
    const audio = document.getElementById('audioEl');
    if (audio) {
      audio.addEventListener('ended', () => window.nextTrack());
      audio.addEventListener('timeupdate', () => {
        const d = audio.duration || 0;
        const fill = document.getElementById('pcFill');
        const cur = document.getElementById('pcCur');
        if (fill) fill.style.width = (d ? audio.currentTime / d * 100 : 0) + '%';
        if (cur) cur.textContent = fmt(audio.currentTime);
      });
      audio.addEventListener('loadedmetadata', () => {
        const dur = document.getElementById('pcDur');
        if (dur && audio.duration) dur.textContent = fmt(audio.duration);
      });
      audio.addEventListener('error', () => {
        if (activeIdx >= 0 && curTracks[activeIdx]) showEmbed(curTracks[activeIdx].id);
      });
    }
  }

  window.applyPortfolioMusicData = function applyPortfolioMusicData(data){
    data = normalizeMusicData(data);
    if (!data || !Array.isArray(data.albums) || !data.albums.length) return;
    albums = data.albums;
    window.PORTFOLIO_ALBUMS = albums;
    updateAlbumLabel();
    renderAlbumGrid();
    bindPlayerControls();
    syncDandelionHero(data);
  };

  if (!document.getElementById('portfolio-music-data')) {
    const script = document.createElement('script');
    script.id = 'portfolio-music-data';
    script.src = 'music-data.js?v=' + DATA_VERSION;
    script.addEventListener('load', () => window.applyPortfolioMusicData(window.PORTFOLIO_MUSIC));
    script.addEventListener('error', () => console.warn('[Anh Li Portfolio] music-data.js could not load; using inline fallback.'));
    document.head.appendChild(script);
  }
})();

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#CC9F4A",
  "bg": "Midnight",
  "heroScale": 100,
  "speed": "Vừa",
  "shader": true,
  "shaderIntensity": 70,
  "grain": true,
  "watermark": true,
  "motion": true
}/*EDITMODE-END*/;

const BG_MOODS = {
  'Midnight': ['#09080E', '#13111C', '#1E1B28', '#2A2636'],
  'Đen':      ['#050507', '#0C0C10', '#16161C', '#222228'],
  'Than ấm':  ['#0E0B09', '#181310', '#241C17', '#322620'],
};
const SPEEDS = { 'Chậm': ['48s', '108s'], 'Vừa': ['30s', '70s'], 'Nhanh': ['18s', '42s'] };

function applyTweaks(t) {
  const r = document.documentElement, b = document.body;
  const a = t.accent || '#CC9F4A';
  r.style.setProperty('--amber', a);
  r.style.setProperty('--amber2', `color-mix(in srgb, ${a} 70%, white)`);
  r.style.setProperty('--amber3', `color-mix(in srgb, ${a} 45%, white)`);
  r.style.setProperty('--border2', `color-mix(in srgb, ${a} 24%, transparent)`);
  r.style.setProperty('--glow', `color-mix(in srgb, ${a} 9%, transparent)`);

  const bg = BG_MOODS[t.bg] || BG_MOODS['Midnight'];
  r.style.setProperty('--ink', bg[0]);
  r.style.setProperty('--ink2', bg[1]);
  r.style.setProperty('--ink3', bg[2]);
  r.style.setProperty('--ink4', bg[3]);

  r.style.setProperty('--hero-scale', (t.heroScale || 100) / 100);
  const sp = SPEEDS[t.speed] || SPEEDS['Vừa'];
  r.style.setProperty('--marquee-dur', sp[0]);
  r.style.setProperty('--album-dur', sp[1]);

  b.classList.toggle('no-grain', !t.grain);
  b.classList.toggle('no-wm', !t.watermark);
  b.classList.toggle('no-motion', !t.motion);
  b.classList.toggle('no-shader', !t.shader);

  if (window.shaderRefreshPalette) window.shaderRefreshPalette();
  if (window.shaderSetIntensity) window.shaderSetIntensity((t.shaderIntensity ?? 100) / 100);
}

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => { applyTweaks(t); }, [t]);
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Giao diện" />
      <TweakColor label="Màu nhấn" value={t.accent}
        options={['#CC9F4A', '#C97A6D', '#5B8DEF', '#5BA88C']}
        onChange={(v) => setTweak('accent', v)} />
      <TweakRadio label="Nền" value={t.bg}
        options={['Midnight', 'Đen', 'Than ấm']}
        onChange={(v) => setTweak('bg', v)} />

      <TweakSection label="Hero & chữ chạy" />
      <TweakSlider label="Cỡ tên hero" value={t.heroScale} min={80} max={130} step={2} unit="%"
        onChange={(v) => setTweak('heroScale', v)} />
      <TweakRadio label="Tốc độ chữ chạy" value={t.speed}
        options={['Chậm', 'Vừa', 'Nhanh']}
        onChange={(v) => setTweak('speed', v)} />

      <TweakSection label="Nền tương tác" />
      <TweakToggle label="Shader nền (WebGL)" value={t.shader} onChange={(v) => setTweak('shader', v)} />
      <TweakSlider label="Cường độ shader" value={t.shaderIntensity} min={30} max={160} step={5} unit="%"
        onChange={(v) => setTweak('shaderIntensity', v)} />

      <TweakSection label="Hiệu ứng" />
      <TweakToggle label="Hạt phim (grain)" value={t.grain} onChange={(v) => setTweak('grain', v)} />
      <TweakToggle label="Chữ chạy nền (watermark)" value={t.watermark} onChange={(v) => setTweak('watermark', v)} />
      <TweakToggle label="Chuyển động nền" value={t.motion} onChange={(v) => setTweak('motion', v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<TweaksApp />);
