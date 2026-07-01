// ============================================================
// music-data.js — live loader + quick UX patch for Anh Li portfolio
// 2026-07-01: keeps the full playlist dataset in music-data-base.js,
// then applies small UI polish without touching the large index.html.
// ============================================================
(function loadPortfolioMusicBase(){
  try {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'music-data-base.js?v=' + Date.now(), false);
    xhr.send(null);
    if (xhr.status >= 200 && xhr.status < 300 && xhr.responseText) {
      (0, eval)(xhr.responseText);
    } else {
      console.warn('[Anh Li Portfolio] music-data-base.js could not load; using inline fallback data.');
    }
  } catch (err) {
    console.warn('[Anh Li Portfolio] music data loader skipped:', err);
  }

  window.PORTFOLIO_MUSIC = window.PORTFOLIO_MUSIC || {
    version: '2026-07-01-ux-patch-fallback',
    source: 'Inline fallback data',
    albums: []
  };
})();

(function applyQuickUXPatch(){
  function ready(fn){
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, { once:true });
    else fn();
  }

  ready(function(){
    if (!document.getElementById('anhli-quick-ux-patch')) {
      var style = document.createElement('style');
      style.id = 'anhli-quick-ux-patch';
      style.textContent = `
        .hero-actions{
          display:flex; flex-wrap:wrap; align-items:center; gap:.75rem;
          margin:-1.65rem 0 2.45rem;
          animation:riseIn 1s .72s both;
        }
        .hero-cta{
          display:inline-flex; align-items:center; justify-content:center; gap:.45rem;
          min-height:42px; padding:.78rem 1.18rem;
          border-radius:999px; border:1px solid rgba(204,159,74,.32);
          background:rgba(9,8,14,.22); color:var(--amber2);
          font:500 .72rem/1 'Instrument Sans', sans-serif;
          letter-spacing:.08em; text-transform:uppercase; text-decoration:none;
          cursor:pointer; backdrop-filter:blur(10px);
          transition:transform .25s ease, border-color .25s ease, background .25s ease, color .25s ease;
        }
        .hero-cta-primary{
          background:linear-gradient(135deg, rgba(204,159,74,.96), rgba(245,223,160,.86));
          color:#173223; border-color:rgba(255,255,255,.38);
          box-shadow:0 14px 40px rgba(204,159,74,.18);
        }
        .hero-cta:hover{ transform:translateY(-2px); border-color:rgba(204,159,74,.62); background:rgba(204,159,74,.14); }
        .hero-cta-primary:hover{ background:linear-gradient(135deg, rgba(245,223,160,.98), rgba(204,159,74,.92)); color:#11261b; }
        .poster-hero .hero-actions{ margin-top:-1.25rem; }
        .poster-hero .hero-cta{ border-color:rgba(81,106,57,.35); color:#183126; background:rgba(255,250,226,.34); }
        .poster-hero .hero-cta-primary{ background:linear-gradient(135deg, rgba(255,247,218,.96), rgba(232,200,112,.84)); color:#173223; }
        .counter-label{ display:block; margin-top:.22rem; line-height:1.35; }
        .hero-counter.counter-soft .counter-num{ font-size:1.18rem; letter-spacing:.06em; }
        .mg-soft-note{
          margin-top:1rem; font-size:.82rem; line-height:1.55; color:rgba(237,230,220,.72);
          opacity:0; transform:translateY(6px); transition:opacity .28s ease, transform .28s ease;
        }
        .mg-soft-note.show{ opacity:1; transform:translateY(0); }
        .f-secret{ cursor:pointer; opacity:.62; transition:opacity .25s ease, color .25s ease; }
        .f-secret:hover{ opacity:1; color:var(--amber2); }
        @media(max-width:760px){
          .hero-actions{ margin:-.9rem 0 1.8rem; gap:.55rem; }
          .hero-cta{ min-height:38px; padding:.68rem .92rem; font-size:.64rem; letter-spacing:.06em; }
        }
      `;
      document.head.appendChild(style);
    }

    var heroRoles = document.querySelector('.hero-roles');
    if (heroRoles && !document.querySelector('.hero-actions')) {
      var actions = document.createElement('div');
      actions.className = 'hero-actions';
      actions.innerHTML = '<a class="hero-cta hero-cta-primary" href="#music" data-hero-listen>Xuống khu nghe nhạc</a><button class="hero-cta" type="button" data-hero-pick>Để Li bốc bài ✨</button>';
      heroRoles.insertAdjacentElement('afterend', actions);
    }

    function scrollToMusic(){
      var music = document.getElementById('music');
      if (music) music.scrollIntoView({ behavior:'smooth', block:'start' });
    }
    function nudgeGate(){
      var gate = document.getElementById('gateZone');
      if (!gate || !gate.classList.contains('gated')) return;
      gate.classList.remove('nudged');
      void gate.offsetWidth;
      gate.classList.add('nudged');
    }
    function showGateHint(kind){
      var skip = document.getElementById('mgSkip');
      var actions = skip ? skip.closest('.mg-actions') : null;
      if (!actions) return;
      var box = document.querySelector('.mg-soft-note');
      if (!box) {
        box = document.createElement('div');
        box.className = 'mg-soft-note';
        actions.insertAdjacentElement('afterend', box);
      }
      box.textContent = kind === 'pick'
        ? 'Li bốc được, nhưng trước hết người nghe cần tự mở cửa disclaimer AI nha ✦'
        : 'Khu nhạc ở ngay dưới đây. Muốn nghe thì tự bấm “Tôi đã sẵn sàng nghe” nha ✦';
      box.classList.remove('show');
      void box.offsetWidth;
      box.classList.add('show');
    }

    var listen = document.querySelector('[data-hero-listen]');
    if (listen && !listen.dataset.bound) {
      listen.dataset.bound = '1';
      listen.addEventListener('click', function(e){
        e.preventDefault();
        scrollToMusic();
        setTimeout(function(){ nudgeGate(); showGateHint('listen'); }, 420);
      });
    }

    var pick = document.querySelector('[data-hero-pick]');
    if (pick && !pick.dataset.bound) {
      pick.dataset.bound = '1';
      pick.addEventListener('click', function(){
        scrollToMusic();
        setTimeout(function(){ nudgeGate(); showGateHint('pick'); }, 420);
      });
    }

    var counter = document.querySelector('.hero-counter');
    var counterNum = document.getElementById('visit-count');
    if (counter && counterNum && !counter.querySelector('.counter-label')) {
      Array.prototype.slice.call(counter.childNodes).forEach(function(node){
        if (node.nodeType === 3 && node.textContent.trim()) node.remove();
      });
      var label = document.createElement('span');
      label.className = 'counter-label';
      label.textContent = 'lượt ghé thăm khu vườn';
      counter.appendChild(label);
      setTimeout(function(){
        if (/^[—–-]$/.test(counterNum.textContent.trim())) {
          counterNum.textContent = 'đang mở';
          counter.classList.add('counter-soft');
          label.textContent = 'đang đếm dấu chân ghé sạp';
        }
      }, 2800);
    }

    var secret = document.querySelector('.f-secret');
    if (secret) {
      secret.textContent = '✦ chạm logo 3 lần để mở Mặt B';
      secret.title = 'Easter egg: chạm logo ANH LI ba lần';
    }

    var skip = document.getElementById('mgSkip');
    if (skip && !skip.dataset.bound) {
      skip.dataset.bound = '1';
      var lines = [
        'Không sao, Li đợi. Khi nào muốn nghe một bài nhẹ thôi thì bấm nút vàng nha ✦',
        'Chưa sẵn sàng cũng được. Cái Sạp vẫn mở hé cửa cho người tò mò.',
        'Không ép nghe đâu. Nhưng biết đâu một bài nhỏ sẽ dẫn anh/chị vào đúng mood.'
      ];
      skip.addEventListener('click', function(){
        var box = document.querySelector('.mg-soft-note');
        if (!box) {
          box = document.createElement('div');
          box.className = 'mg-soft-note';
          var actions = skip.closest('.mg-actions');
          if (actions) actions.insertAdjacentElement('afterend', box);
        }
        box.textContent = lines[Math.floor(Math.random() * lines.length)];
        box.classList.remove('show');
        void box.offsetWidth;
        box.classList.add('show');
      });
    }
  });
})();
