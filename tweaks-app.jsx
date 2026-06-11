// tweaks-app.jsx — Tweaks panel for Anh Li portfolio.
// Applies values to the (vanilla) page via CSS variables + body classes.

(function loadPortfolioUpgrade(){
  if (document.getElementById('portfolio-upgrade-css')) return;
  const link = document.createElement('link');
  link.id = 'portfolio-upgrade-css';
  link.rel = 'stylesheet';
  link.href = 'portfolio-upgrade.css?v=20260611';
  document.head.appendChild(link);
})();

(function loadExternalMusicData(){
  const DATA_VERSION = '20260611-2';
  const TRACK_PAGE = 10;
  let albums = [];
  let curAlbum = -1;
  let curTracks = [];
  let activeIdx = -1;
  let shuffleOn = false;

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
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

  function updateAlbumLabel(){
    const label = $$('.albums-label').find((el) => /Albums|playlist/i.test(el.textContent || ''));
    if (label) label.textContent = `Albums · ${albums.length} playlist · dữ liệu tách riêng từ music-data.js`;
  }

  function renderAlbumGrid(){
    const grid = document.getElementById('albumGrid');
    if (!grid || !albums.length) return;
    const card = (a, i) => {
      const likeN = parseInt(localStorage.getItem('album_likes_' + a.id) || '0', 10);
      const count = (a.tracks && a.tracks.length) || a.count || 0;
      return `<div class="album" data-aidx="${i}" onclick="selectAlbum(${i})">
        <div class="album-cover">
          <img src="${esc(cover(a.cover))}" alt="${esc(a.name)}" loading="lazy" oncontextmenu="return false" onerror="this.outerHTML='<div class=album-cover-blank>♪</div>'"/>
          <div class="album-play">⌄</div>
          <span class="album-badge">${count} bài</span>
          <button class="album-like${likeN > 0 ? ' liked' : ''}" data-aidx="${i}" onclick="likeAlbum(${i},event)" aria-label="Thích">♥<span class="like-n">${likeN > 0 ? ' ' + likeN : ''}</span></button>
        </div>
        <div class="album-name">${esc(a.name)}</div>
        <div class="album-sub">${esc(a.sub || '')}</div>
      </div>`;
    };
    const seq = albums.map(card).join('');
    grid.innerHTML = seq + seq;
  }

  function markPlaying(idx){
    $$('.trow').forEach((r) => r.classList.toggle('playing', Number(r.dataset.idx) === idx));
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
      w.innerHTML = '';
    }
  }

  function renderDrawer(a, tracks, showAll){
    const drawer = document.getElementById('albumDrawer');
    if (!drawer) return;
    const idx = albums.indexOf(a);
    const likeN = parseInt(localStorage.getItem('album_likes_' + a.id) || '0', 10);
    const list = showAll ? tracks : (tracks || []).slice(0, TRACK_PAGE);
    const rows = list.map((t, j) => `<div class="trow" data-idx="${j}" onclick="playAt(${j})">
        <div class="trow-num"><span class="num-d">${String(j + 1).padStart(2, '0')}</span><span class="num-eq"><i></i><i></i><i></i></span></div>
        <img class="trow-art" src="${art(t.id)}" alt="" loading="lazy" oncontextmenu="return false" onerror="this.style.visibility='hidden'"/>
        <div class="trow-info"><div class="trow-name">${esc(t.name)}</div></div>
        <div class="trow-dur">${esc(t.dur || '')}</div>
      </div>`).join('');
    const more = (!showAll && tracks && tracks.length > TRACK_PAGE)
      ? `<div class="drawer-more"><a href="javascript:void(0)" onclick="showAllTracks(${idx})">+ ${tracks.length - TRACK_PAGE} bài nữa</a></div>`
      : '';
    const descHtml = a.desc ? `<div class="drawer-desc">${esc(a.desc)}</div>` : '';
    const openSuno = a.playlistUrl
      ? `<a href="${esc(a.playlistUrl)}" target="_blank" rel="noopener" class="drawer-suno">Mở playlist Suno →</a>`
      : '';
    drawer.innerHTML = `<div class="drawer-inner">
      <div class="vinyl-bg" aria-hidden="true"><div class="vinyl-disc" style="background-image:url('${esc(cover(a.cover))}')"><div class="vinyl-center"></div></div></div>
      <div class="drawer-z">
        <div class="drawer-head">
          <div style="min-width:0;flex:1">
            <div class="drawer-title">${esc(a.name)}<span>${(tracks && tracks.length) || a.count || 0} bài</span></div>
            ${descHtml}
          </div>
          <div class="drawer-actions">
            ${openSuno}
            <button class="drawer-like${likeN > 0 ? ' liked' : ''}" onclick="likeAlbum(${idx},event)">♡<span class="like-n">${likeN > 0 ? ' ' + likeN : ''}</span></button>
            <button class="drawer-playall" onclick="playAt(0)">▶ Phát từ đầu</button>
          </div>
        </div>
        <div class="tlist">${rows}</div>${more}
      </div>
    </div>`;
    if (curAlbum === idx && activeIdx >= 0) markPlaying(activeIdx);
  }

  window.selectAlbum = function selectAlbum(i, silent){
    const drawer = document.getElementById('albumDrawer');
    const carousel = document.getElementById('albumCarousel');
    if (!drawer || !albums[i]) return;
    if (curAlbum === i && drawer.classList.contains('open') && !silent) {
      drawer.classList.remove('open');
      if (carousel) carousel.classList.remove('paused');
      $$('.album[data-aidx]').forEach((a) => a.classList.remove('selected'));
      curAlbum = -1;
      curTracks = [];
      return;
    }
    curAlbum = i;
    curTracks = albums[i].tracks || [];
    $$('.album[data-aidx]').forEach((a) => a.classList.toggle('selected', Number(a.dataset.aidx) === i));
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
    $$(`.album-like[data-aidx="${i}"]`).forEach((btn) => {
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
    if (coverEl) coverEl.innerHTML = `<img src="${art(t.id)}" alt="" oncontextmenu="return false" onerror="this.parentElement.innerHTML='<span class=player-cover-ph>♪</span>'"/>`;
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

  window.prevTrack = function prevTrack(){
    window.playAt(activeIdx < 0 ? 0 : activeIdx - 1);
  };

  window.togglePlay = function togglePlay(){
    const audio = document.getElementById('audioEl');
    if (!audio) return;
    if (activeIdx < 0) {
      window.playAt(0);
      return;
    }
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
    if (!data || !Array.isArray(data.albums) || !data.albums.length) return;
    albums = data.albums;
    window.PORTFOLIO_ALBUMS = albums;
    updateAlbumLabel();
    renderAlbumGrid();
    bindPlayerControls();
  };

  if (!document.getElementById('portfolio-music-data')) {
    const script = document.createElement('script');
    script.id = 'portfolio-music-data';
    script.src = 'music-data.js?v=' + DATA_VERSION;
    script.onload = () => window.applyPortfolioMusicData(window.PORTFOLIO_MUSIC);
    script.onerror = () => console.warn('[Anh Li Portfolio] music-data.js could not load; using inline fallback.');
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

  // recolor + drive the WebGL shader
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
