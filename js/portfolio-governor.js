/*
 * Portfolio governor
 * - freezes the decorative WebGL hero after its first paint
 * - pauses media when off-screen / tab-hidden
 * - adapts to low-memory, coarse-pointer and long-task devices
 * - injects Dandelion Oracle as a contextual portal + quiet side quest
 *
 * This file intentionally does not own core portfolio content. It can be
 * removed without affecting the egg game, music player, Vedic chart or Oracle.
 */
(function initPortfolioGovernor(root) {
  'use strict';
  if (!root.document || root.__ANHLI_PORTFOLIO_GOVERNOR__) return;
  root.__ANHLI_PORTFOLIO_GOVERNOR__ = true;

  var doc = root.document;
  var body = doc.body;
  if (!body) return;

  var ORACLE_URL = 'https://alih86.github.io/dandelion-oracle/';
  var coarse = root.matchMedia && root.matchMedia('(pointer:coarse)').matches;
  var noHover = root.matchMedia && root.matchMedia('(hover:none)').matches;
  var compact = root.matchMedia && root.matchMedia('(max-width:700px)').matches;
  var lowMemory = typeof root.navigator.deviceMemory === 'number' && root.navigator.deviceMemory <= 4;
  var saveData = !!(root.navigator.connection && root.navigator.connection.saveData);
  var constrained = compact || (coarse && noHover) || lowMemory || saveData;
  var heroVideoObserver = null;
  var heroVideoKiller = null;

  body.classList.add('perf-balanced');
  body.classList.add('no-grain');
  if (constrained) body.classList.add('perf-lite');

  function freezeShader() {
    try {
      if (typeof root.shaderSetIntensity === 'function') {
        root.shaderSetIntensity(body.classList.contains('perf-lite') ? 0.24 : 0.4);
      }
      if (typeof root.shaderSetPaused === 'function') root.shaderSetPaused(true);
    } catch (e) {}
  }

  function lockShaderPause() {
    var current = root.shaderSetPaused;
    if (typeof current !== 'function' || current.__portfolioGovernorWrapped) {
      freezeShader();
      return;
    }
    function wrappedShaderSetPaused(value) {
      if (body.classList.contains('perf-balanced')) return current.call(root, true);
      return current.call(root, value);
    }
    wrappedShaderSetPaused.__portfolioGovernorWrapped = true;
    wrappedShaderSetPaused.__portfolioGovernorOriginal = current;
    root.shaderSetPaused = wrappedShaderSetPaused;
    freezeShader();
  }

  function disableHeroVideo(video) {
    if (!video) return;
    try { video.pause(); } catch (e) {}
    if (video.getAttribute('src')) {
      video.removeAttribute('src');
      try { video.load(); } catch (e) {}
    }
    body.classList.add('hero-video-budgeted');
  }

  function installHeroVideoBudget() {
    var video = doc.getElementById('heroVideo');
    if (!video) return;

    if (body.classList.contains('perf-lite')) {
      disableHeroVideo(video);
      if ('MutationObserver' in root) {
        heroVideoKiller = new MutationObserver(function preventLateVideoSource() {
          if (body.classList.contains('perf-lite') && video.getAttribute('src')) disableHeroVideo(video);
        });
        heroVideoKiller.observe(video, { attributes:true, attributeFilter:['src'] });
      }
      return;
    }

    var wasPlaying = false;
    video.addEventListener('play', function rememberPlaybackIntent() {
      wasPlaying = true;
    });
    video.addEventListener('pause', function rememberPauseIntent() {
      if (!doc.hidden && video.getBoundingClientRect().bottom > 0) wasPlaying = false;
    });

    if ('IntersectionObserver' in root) {
      heroVideoObserver = new IntersectionObserver(function onHeroVideoVisibility(entries) {
        var visible = entries[0] && entries[0].isIntersecting;
        if (!visible) {
          var playing = !video.paused && !video.ended;
          if (playing) wasPlaying = true;
          try { video.pause(); } catch (e) {}
          return;
        }
        if (wasPlaying && !doc.hidden && !body.classList.contains('no-motion')) {
          var p = video.play();
          if (p && typeof p.catch === 'function') p.catch(function () {});
        }
      }, { threshold:0.02 });
      heroVideoObserver.observe(video);
    }

    doc.addEventListener('visibilitychange', function pauseHeroVideoWhenHidden() {
      if (doc.hidden) {
        if (!video.paused && !video.ended) wasPlaying = true;
        try { video.pause(); } catch (e) {}
      } else if (wasPlaying && video.getBoundingClientRect().bottom > 0 && !body.classList.contains('no-motion')) {
        var p = video.play();
        if (p && typeof p.catch === 'function') p.catch(function () {});
      }
    });
  }

  function applyLiteMode(reason) {
    if (body.classList.contains('perf-lite')) return;
    body.classList.add('perf-lite');
    body.dataset.perfReason = reason || 'adaptive';
    freezeShader();
    var video = doc.getElementById('heroVideo');
    if (video) disableHeroVideo(video);
  }

  function installAdaptiveLongTaskGuard() {
    if (constrained || !('PerformanceObserver' in root) || !root.performance) return;
    var score = 0;
    var stopped = false;
    var observer;
    try {
      observer = new PerformanceObserver(function countLongTasks(list) {
        list.getEntries().forEach(function (entry) {
          if (entry.duration >= 80) score += 1;
          if (entry.duration >= 160) score += 1;
        });
        if (score >= 5 && !stopped) {
          stopped = true;
          applyLiteMode('long-task');
          observer.disconnect();
        }
      });
      observer.observe({ type:'longtask', buffered:true });
      root.setTimeout(function stopLongTaskSampling() {
        if (!stopped) {
          stopped = true;
          observer.disconnect();
        }
      }, 12000);
    } catch (e) {}
  }

  function makePortalLink(className, label, title) {
    var link = doc.createElement('a');
    link.className = className;
    link.href = ORACLE_URL;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', title + ' — mở trong tab mới');
    link.innerHTML = '<span class="go-oracle-portal-copy">'
      + '<span class="go-oracle-portal-kicker">' + label + '</span>'
      + '<span class="go-oracle-portal-title">' + title + '</span>'
      + '</span><span class="go-oracle-portal-arrow" aria-hidden="true">↗</span>';
    return link;
  }

  function injectOraclePortal() {
    var oracle = doc.querySelector('.garden-oracle');
    if (oracle && !oracle.querySelector('.go-oracle-portal')) {
      var letter = oracle.querySelector('.go-letter');
      if (letter) {
        var link = makePortalLink('go-oracle-portal', 'Bước sâu hơn vào khu vườn', 'Dandelion Oracle · rút một trải bài đầy đủ');
        var footer = letter.querySelector('footer');
        if (footer) footer.parentNode.insertBefore(link, footer);
        else letter.appendChild(link);
      }
    }

    var contact = doc.getElementById('contact');
    if (contact && !doc.getElementById('oracle-side-quest')) {
      var section = doc.createElement('section');
      section.id = 'oracle-side-quest';
      section.className = 'oracle-side-quest';
      section.setAttribute('aria-labelledby', 'oracle-side-quest-title');
      section.innerHTML = ''
        + '<div class="oracle-side-quest-inner">'
        + '  <div>'
        + '    <div class="oracle-side-quest-kicker">SIDE QUEST · FROM THE GARDEN</div>'
        + '    <h2 id="oracle-side-quest-title">Dandelion Oracle</h2>'
        + '    <p>Một bộ bài trực tuyến được làm từ những hạt Bồ Công Anh — dành cho những lúc cần một góc nhìn khác, nhẹ hơn và chậm hơn một nhịp.</p>'
        + '  </div>'
        + '  <a class="oracle-side-quest-link" href="' + ORACLE_URL + '" target="_blank" rel="noopener noreferrer">Rút một hạt cho hôm nay <span aria-hidden="true">↗</span></a>'
        + '</div>'
        + '<div class="oracle-side-quest-mark" aria-hidden="true">✦</div>';
      contact.parentNode.insertBefore(section, contact);
    }
  }

  function keepShaderFrozenAfterLateInit() {
    var tries = 0;
    var timer = root.setInterval(function () {
      tries += 1;
      lockShaderPause();
      if ((typeof root.shaderSetPaused === 'function' && root.shaderSetPaused.__portfolioGovernorWrapped) || tries >= 12) {
        root.clearInterval(timer);
      }
    }, 250);
  }

  function boot() {
    injectOraclePortal();
    installHeroVideoBudget();
    installAdaptiveLongTaskGuard();
    keepShaderFrozenAfterLateInit();

    /* One more pass after async UI/data renderers have had time to mount. */
    root.setTimeout(injectOraclePortal, 900);
    root.setTimeout(freezeShader, 600);
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot, { once:true });
  else boot();
})(typeof window !== 'undefined' ? window : globalThis);
