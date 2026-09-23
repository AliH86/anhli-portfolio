// ============================================================
// music-data.js — live loader + hero quote polish for Anh Li portfolio
// 2026-07-01: keeps the full playlist dataset in music-data-base.js,
// then applies only a small visual polish to the first screen quote.
// ============================================================
// One asynchronous readiness contract, including an explicit fallback.
window.portfolioMusicReady = new Promise(function(resolve){
  var script=document.createElement('script');
  script.src='music-data-base.js?v=2026-09-11';
  script.async=true;
  function finish(){
    window.PORTFOLIO_MUSIC=window.PORTFOLIO_MUSIC || {version:'inline-fallback',albums:[]};
    resolve(window.PORTFOLIO_MUSIC);
  }
  script.onload=finish;
  script.onerror=function(){ console.warn('[Portfolio] music base unavailable; using inline catalog.'); finish(); };
  document.head.appendChild(script);
});

(function polishHeroQuoteOnly(){
  function ready(fn){
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, { once:true });
    else fn();
  }

  ready(function(){
    if (document.getElementById('anhli-hero-quote-polish')) return;
    var style = document.createElement('style');
    style.id = 'anhli-hero-quote-polish';
    style.textContent = `
      .poster-hero .hero-bottom{
        align-items:flex-end;
        gap:1.45rem;
      }
      .poster-hero .hero-quote{
        position:relative;
        max-width:min(390px, 84vw);
        padding:1.05rem 1.22rem 1.08rem 1.34rem;
        border-left:2px solid rgba(81,106,57,.68);
        border-top:1px solid rgba(255,250,226,.38);
        border-right:1px solid rgba(81,106,57,.12);
        border-bottom:1px solid rgba(81,106,57,.12);
        border-radius:0 18px 18px 0;
        background:linear-gradient(105deg, rgba(255,250,226,.55), rgba(255,250,226,.22));
        color:rgba(17,38,27,.96);
        font-size:clamp(1.08rem, 1.45vw, 1.26rem);
        line-height:1.58;
        letter-spacing:.005em;
        text-shadow:0 1px 0 rgba(255,255,255,.38);
        box-shadow:0 18px 48px rgba(17,38,27,.10);
        backdrop-filter:blur(8px);
        -webkit-backdrop-filter:blur(8px);
      }
      .poster-hero .hero-quote::before{
        content:'“';
        position:absolute;
        left:.55rem;
        top:-.42rem;
        font-family:'Cormorant Garamond', serif;
        font-size:3.4rem;
        line-height:1;
        color:rgba(81,106,57,.18);
        pointer-events:none;
      }
      .poster-hero .hero-quote::after{
        content:'✦ Anh Li';
        display:block;
        margin-top:.72rem;
        font-family:'Instrument Sans', sans-serif;
        font-size:.62rem;
        line-height:1;
        letter-spacing:.22em;
        text-transform:uppercase;
        color:rgba(81,106,57,.62);
        font-style:normal;
      }
      .poster-hero .hero-counter{
        transform:translateY(-.08rem);
      }
      @media(max-width:900px){
        .poster-hero .hero-bottom{
          gap:.95rem;
          align-items:flex-start;
        }
        .poster-hero .hero-quote{
          max-width:100%;
          padding:.9rem 1rem .95rem 1.08rem;
          font-size:1rem;
          line-height:1.55;
          background:linear-gradient(105deg, rgba(255,250,226,.62), rgba(255,250,226,.30));
        }
      }
    `;
    document.head.appendChild(style);
  });
})();
