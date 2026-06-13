/* ============================================================
   experience.js — Lớp trải nghiệm cho Cái Sạp nhạc
   · intro kim chạm dĩa than (1 lần/phiên, biến tấu mỗi lượt)
   · depth parallax + tilt 3D (con trỏ desktop / gyro mobile)
   · album cover 3D tilt khi hover
   · equalizer chạy theo NHẠC THẬT (Web Audio, có fallback)
   · vinyl dock — trình phát dính đáy với dĩa than đang quay
   · gallery: thả tim + double-tap + lightbox
   · Mặt B — secret khi chạm logo 3 lần
   Chạy SAU script chính của index.html (chung global scope).
============================================================ */
(function(){
'use strict';
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const MOBILE  = matchMedia('(max-width: 900px)').matches;
const HOVER   = matchMedia('(hover: hover)').matches;
const $ = s => document.querySelector(s);
function el(h){ const t=document.createElement('template'); t.innerHTML=h.trim(); return t.content.firstElementChild; }
const store = {
  get(k,d){ try{ const v=localStorage.getItem(k); return v===null?d:v; }catch(e){ return d; } },
  set(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
};

/* ── toast ──────────────────────────────────────────────── */
let toastEl=null, toastT=null;
function toast(msg){
  if(!toastEl){ toastEl=el('<div class="ali-toast"></div>'); document.body.appendChild(toastEl); }
  toastEl.innerHTML=msg;
  requestAnimationFrame(()=>toastEl.classList.add('show'));
  clearTimeout(toastT);
  toastT=setTimeout(()=>toastEl.classList.remove('show'), 4200);
}

/* ── 1 · INTRO — kim chạm dĩa than ──────────────────────── */
(function intro(){
  if(REDUCED) return;
  let seen=false; try{ seen=sessionStorage.getItem('ali_intro')==='1'; }catch(e){}
  if(seen) return;
  try{ sessionStorage.setItem('ali_intro','1'); }catch(e){}
  const subs=['Gửi đến những giá trị nguyên bản','Tử tế · Tinh tế · Tạo giá trị thật','Từ quê hương đến trái tim','Cái Sạp nhạc · Saigon'];
  const ov=el(`<div class="ali-intro">
      <div class="ai-stage">
        <div class="ai-vinyl"><div class="ai-label">✦</div></div>
        <div class="ai-arm"><i></i></div>
      </div>
      <div class="ai-name">ANH&nbsp;LI</div>
      <div class="ai-sub">${subs[Math.floor(Math.random()*subs.length)]}</div>
      <div class="ai-skip">chạm để vào ✦</div>
    </div>`);
  document.body.appendChild(ov);
  document.documentElement.classList.add('intro-lock');
  let gone=false;
  const out=()=>{
    if(gone) return; gone=true;
    ov.classList.add('out');
    document.documentElement.classList.remove('intro-lock');
    setTimeout(()=>ov.remove(), 950);
  };
  ov.addEventListener('click', out);
  setTimeout(out, 3400);
})();

/* ── 2 · HERO QUOTE — đổi mỗi lần ghé ───────────────────── */
(function vary(){
  const q=document.querySelector('.hero-quote');
  if(!q) return;
  const pool=[
    '"Tử tế. Tinh tế.<br/>Tạo giá trị thật.<br/>Đó là cách Anh Li làm nghề."',
    '"Mình không làm sự kiện.<br/>Mình dựng những khoảnh khắc<br/>người ta mang về nhà."',
    '"Gửi đến những giá trị nguyên bản —<br/>từ quê hương<br/>đến trái tim."',
    '"Chạm được cảm xúc thật<br/>của khán giả —<br/>mới gọi là làm nghề."',
  ];
  q.innerHTML=pool[Math.floor(Math.random()*pool.length)];
})();

/* ── 3 · PARALLAX + TILT (một vòng rAF duy nhất) ───────── */
const fx={ nx:0, ny:0, dirty:true };
const heroContent=$('.hero-content'), heroPhoto=$('#heroBg'), heroSec=$('.hero');
const heroLine1=$('.hero-name .line1'), heroLine2=$('.hero-name .line2');
const pxTargets=[];
if(!REDUCED){
  document.querySelectorAll('.section-wm').forEach(e=>pxTargets.push({e, s:36}));
  const cw=$('.contact-wm'); if(cw) pxTargets.push({e:cw, s:28});
  const af=$('.about-figure'); if(af) pxTargets.push({e:af, s:-14});
}
if(HOVER && !REDUCED){
  addEventListener('pointermove', e=>{
    fx.nx=e.clientX/innerWidth-0.5;
    fx.ny=e.clientY/innerHeight-0.5;
    fx.dirty=true;
  }, {passive:true});
}
addEventListener('scroll', ()=>{ fx.dirty=true; }, {passive:true});

/* gyro — nghiêng máy trên mobile */
function startGyro(){
  addEventListener('deviceorientation', e=>{
    const g=Math.max(-28, Math.min(28, e.gamma||0));
    const b=Math.max(-28, Math.min(28, (e.beta??45)-45));
    fx.nx=g/56; fx.ny=b/56; fx.dirty=true;
  }, {passive:true});
}
if(MOBILE && !REDUCED && typeof DeviceOrientationEvent!=='undefined'){
  if(typeof DeviceOrientationEvent.requestPermission==='function'){
    const ask=()=>{ DeviceOrientationEvent.requestPermission().then(s=>{ if(s==='granted') startGyro(); }).catch(()=>{}); };
    addEventListener('touchend', ask, {once:true, passive:true});
  } else { startGyro(); }
}

function applyFx(){
  fx.dirty=false;
  const vh=innerHeight;
  if(heroSec && scrollY < vh*1.15){
    const s=Math.min(scrollY, vh);
    if(heroContent){
      heroContent.style.transform=`perspective(1100px) rotateX(${(-fx.ny*1.8).toFixed(2)}deg) rotateY(${(fx.nx*2.4).toFixed(2)}deg)`;
      heroContent.style.opacity=Math.max(0, 1-(s/vh)*1.1).toFixed(3);
    }
    /* parallax ảnh hero theo cả con trỏ lẫn cuộn (thuộc tính translate — không bị animation đè) */
    if(heroPhoto) heroPhoto.style.translate=`${(-fx.nx*16).toFixed(1)}px ${((-fx.ny*10)+s*0.16).toFixed(1)}px`;
    /* kinetic typography — hai dòng tên trượt ngược chiều khi cuộn */
    if(heroLine1) heroLine1.style.transform=`translateX(${(-s*0.16).toFixed(1)}px)`;
    if(heroLine2) heroLine2.style.transform=`translateX(${(s*0.22).toFixed(1)}px)`;
  }
  for(const t of pxTargets){
    const r=t.e.getBoundingClientRect();
    if(r.bottom<-100 || r.top>vh+100) continue;
    const p=((r.top+r.height/2)-vh/2)/vh;
    t.e.style.translate=`0 ${(p*t.s).toFixed(1)}px`;
  }
}

/* ── 4 · ALBUM COVER 3D TILT ────────────────────────────── */
if(HOVER && !REDUCED){
  let tEl=null;
  document.addEventListener('pointerover', e=>{
    const c=e.target.closest ? e.target.closest('.album-cover') : null;
    if(c) tEl=c;
  });
  document.addEventListener('pointermove', e=>{
    if(!tEl) return;
    const r=tEl.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-0.5, y=(e.clientY-r.top)/r.height-0.5;
    // magnetic zoom: bìa phóng to & trượt nhẹ về phía con trỏ
    tEl.style.transform=`perspective(680px) rotateX(${(-y*8).toFixed(2)}deg) rotateY(${(x*10).toFixed(2)}deg) translate3d(${(x*14).toFixed(1)}px, ${(y*11).toFixed(1)}px, 30px) scale(1.08)`;
  }, {passive:true});
  document.addEventListener('pointerout', e=>{
    const c=e.target.closest ? e.target.closest('.album-cover') : null;
    if(c && c===tEl && !(e.relatedTarget && c.contains(e.relatedTarget))){
      c.style.transform=''; tEl=null;
    }
  });
}

/* ── 5 · NOW PLAYING — trạng thái + dĩa than nền ────────── */
const np=$('#nowplaying'), npState=$('#npState'), npVinyl=$('#npVinyl'), sw=$('#soundwave');
function setPlayingUI(on){
  document.body.classList.toggle('playing', on);
  if(np) np.classList.toggle('playing', on);
  if(npState) npState.textContent = on ? '● đang phát' : (activeIdx>=0 ? 'tạm dừng' : 'chọn một bài trong sạp để bắt đầu');
}
function syncTrackUI(){
  const img=$('#playerCover img');
  const art=img ? img.src : '';
  if(npVinyl && art) npVinyl.style.backgroundImage=`url('${art}')`;
  const t=$('#playerTitle'), s=$('#playerSub');
  const vt=$('#vdTitle'), vs=$('#vdSub'), va=$('#vdArt');
  if(vt && t) vt.textContent=t.textContent;
  if(vs && s) vs.textContent=s.textContent;
  if(va && art) va.src=art;
}
if(sw) sw.addEventListener('click', ()=>{ try{ togglePlay(); }catch(e){} });

/* ── 6 · VINYL DOCK — trình phát dính đáy ──────────────── */
const dock=el(`<div class="vinyl-dock" role="region" aria-label="Đang phát">
    <button class="vd-disc" id="vdDisc" aria-label="Phát / dừng"><img id="vdArt" alt=""/><i class="vd-hole"></i></button>
    <div class="vd-info" id="vdInfo" title="Về khu nghe nhạc">
      <div class="vd-title" id="vdTitle">—</div>
      <div class="vd-sub" id="vdSub">Cái Sạp nhạc</div>
    </div>
    <div class="vd-ctrl">
      <button class="vd-btn" id="vdPrev" aria-label="Bài trước">⏮</button>
      <button class="vd-btn vd-play" id="vdPlay" aria-label="Phát / dừng">▶</button>
      <button class="vd-btn" id="vdNext" aria-label="Bài sau">⏭</button>
    </div>
    <div class="vd-bar" id="vdBar"><i id="vdFill"></i></div>
  </div>`);
document.body.appendChild(dock);
$('#vdPrev').addEventListener('click', ()=>prevTrack());
$('#vdNext').addEventListener('click', ()=>nextTrack());
$('#vdPlay').addEventListener('click', ()=>togglePlay());
$('#vdDisc').addEventListener('click', ()=>togglePlay());
$('#vdInfo').addEventListener('click', ()=>{
  if(!np) return;
  const y=np.getBoundingClientRect().top + scrollY - 110;
  scrollTo({top:y, behavior:'smooth'});
});
$('#vdBar').addEventListener('click', e=>{
  const r=e.currentTarget.getBoundingClientRect();
  if(audio.duration) audio.currentTime=((e.clientX-r.left)/r.width)*audio.duration;
});
let npInView=true;
if(np){
  new IntersectionObserver(es=>{ npInView=es[0].isIntersecting; updateDock(); }, {threshold:0.05}).observe(np);
}
function updateDock(){
  document.body.classList.toggle('docked', activeIdx>=0 && !npInView);
}

/* audio events — đồng bộ mọi nơi */
audio.addEventListener('play',  ()=>{ setPlayingUI(true); syncTrackUI(); updateDock(); const b=$('#vdPlay'); if(b) b.textContent='❚❚'; });
audio.addEventListener('pause', ()=>{ setPlayingUI(false); const b=$('#vdPlay'); if(b) b.textContent='▶'; flattenBars(); });
audio.addEventListener('loadstart', ()=>{ syncTrackUI(); updateDock(); });
audio.addEventListener('timeupdate', ()=>{
  const d=audio.duration||0;
  const f=$('#vdFill'); if(f) f.style.width=(d ? audio.currentTime/d*100 : 0)+'%';
});
setPlayingUI(false);

/* ── 7 · EQUALIZER THEO NHẠC THẬT (Web Audio + fallback) ── */
let analyser=null, freq=null, eqLive=false, ctxMade=false, loadedWithCors=false, bars=null, aliCtx=null;
const PROBE='https://cdn1.suno.ai/3e1f52a5-b6df-4723-bab3-9b6bc154809e.mp3';
if(!REDUCED && window.fetch){
  // HEAD = simple request, không preflight — kiểm tra CDN có cho phép CORS không
  fetch(PROBE, {method:'HEAD', mode:'cors'})
    .then(r=>{ if(r.ok) audio.crossOrigin='anonymous'; })
    .catch(()=>{ /* không CORS — giữ equalizer mô phỏng, vẫn đẹp */ });
}
audio.addEventListener('loadstart', ()=>{ loadedWithCors = audio.crossOrigin==='anonymous'; });
audio.addEventListener('playing', ()=>{
  if(!ctxMade && loadedWithCors && audio.crossOrigin==='anonymous'){
    try{
      const AC=window.AudioContext||window.webkitAudioContext;
      aliCtx=new AC();
      const srcN=aliCtx.createMediaElementSource(audio);
      analyser=aliCtx.createAnalyser();
      analyser.fftSize=256;
      analyser.smoothingTimeConstant=0.82;
      srcN.connect(analyser);
      analyser.connect(aliCtx.destination);
      freq=new Uint8Array(analyser.frequencyBinCount);
      ctxMade=true; eqLive=true;
      if(sw){ sw.classList.add('live'); bars=Array.from(sw.children); }
    }catch(e){ eqLive=false; }
  }
  if(aliCtx && aliCtx.state==='suspended') aliCtx.resume().catch(()=>{});
});
function flattenBars(){
  if(eqLive && bars) bars.forEach(b=>{ b.style.transform='scaleY(0.12)'; });
}
function drawEQ(){
  if(!eqLive || !analyser || audio.paused) return;
  if(!bars || !bars.length){ if(sw) bars=Array.from(sw.children); if(!bars||!bars.length) return; }
  analyser.getByteFrequencyData(freq);
  const N=bars.length, half=(N-1)/2, maxBin=92;
  for(let i=0;i<N;i++){
    const m=Math.abs(i-half)/half;                       // 0 giữa → 1 mép
    const bin=Math.min(maxBin, Math.floor(Math.pow(m,1.45)*maxBin));
    const v=freq[bin]/255;
    bars[i].style.transform=`scaleY(${(0.1+v*1.05).toFixed(3)})`;
  }
}

/* vòng rAF chung — EQ mỗi frame khi phát, parallax/tilt khi có thay đổi */
(function loop(){
  requestAnimationFrame(loop);
  drawEQ();
  if(fx.dirty && !REDUCED) applyFx();
})();

/* ── 8 · GALLERY — thả tim + double-tap + lightbox ──────── */
(function gallery(){
  const items=[...document.querySelectorAll('.g-item')];
  if(!items.length) return;
  const imgs=[]; let burstAt=0;

  function setBtn(btn, src){
    const liked=store.get('gal_like_'+src,'')==='1';
    const n=parseInt(store.get('gal_n_'+src,'0'))||0;
    btn.classList.toggle('liked', liked);
    btn.innerHTML='♥<span>'+(n>0?' '+n:'')+'</span>';
  }
  function toggleLike(src){
    const liked=store.get('gal_like_'+src,'')==='1';
    let n=parseInt(store.get('gal_n_'+src,'0'))||0;
    n=Math.max(0, n+(liked?-1:1));
    store.set('gal_like_'+src, liked?'0':'1');
    store.set('gal_n_'+src, String(n));
  }
  function burst(item){
    burstAt=Date.now();
    const h=el('<span class="g-burst">♥</span>');
    item.appendChild(h);
    setTimeout(()=>h.remove(), 900);
  }

  items.forEach((it,idx)=>{
    const img=it.querySelector('.g-frame img');
    const vid=it.querySelector('.g-frame video');
    const src=img ? img.getAttribute('src') : (vid ? (vid.dataset.src||'v'+idx) : 'g'+idx);
    const btn=el('<button class="g-like" aria-label="Thả tim"></button>');
    setBtn(btn, src);
    it.appendChild(btn);
    btn.addEventListener('click', e=>{
      e.stopPropagation();
      toggleLike(src);
      setBtn(btn, src);
      if(btn.classList.contains('liked')) burst(it);
      syncLb();
    });
    // double-tap / double-click = tim
    let lastTap=0;
    it.addEventListener('pointerdown', ()=>{
      const now=Date.now();
      if(now-lastTap<320){
        if(store.get('gal_like_'+src,'')!=='1'){ toggleLike(src); setBtn(btn, src); }
        burst(it);
      }
      lastTap=now;
    });
    if(img){
      const rec={src, img, btn};
      imgs.push(rec);
      it.addEventListener('click', e=>{
        if(e.target.closest('.g-like')) return;
        if(Date.now()-burstAt<420) return;       // vừa double-tap → đừng mở lightbox
        openLb(imgs.indexOf(rec));
      });
    }
  });

  /* lightbox */
  const lb=el(`<div class="ali-lb" aria-modal="true" role="dialog">
      <button class="lb-x" aria-label="Đóng">✕</button>
      <button class="lb-nav lb-prev" aria-label="Ảnh trước">←</button>
      <img class="lb-img" id="lbImg" alt="" oncontextmenu="return false"/>
      <button class="lb-nav lb-next" aria-label="Ảnh sau">→</button>
      <button class="lb-like" id="lbLike"></button>
    </div>`);
  document.body.appendChild(lb);
  let cur=-1;
  function openLb(i){ if(i<0) return; cur=i; lb.classList.add('open'); renderLb(); }
  function closeLb(){ lb.classList.remove('open'); }
  function step(d){ if(cur<0) return; cur=(cur+d+imgs.length)%imgs.length; renderLb(); }
  function renderLb(){
    const o=imgs[cur]; if(!o) return;
    $('#lbImg').src=o.img.currentSrc||o.src;
    syncLb();
  }
  function syncLb(){
    if(cur<0) return;
    const o=imgs[cur]; if(!o) return;
    const liked=store.get('gal_like_'+o.src,'')==='1';
    const n=parseInt(store.get('gal_n_'+o.src,'0'))||0;
    const b=$('#lbLike');
    b.classList.toggle('liked', liked);
    b.innerHTML='♥ <span>'+(n>0?n:'thả tim')+'</span>';
  }
  lb.querySelector('.lb-x').addEventListener('click', closeLb);
  lb.querySelector('.lb-prev').addEventListener('click', e=>{ e.stopPropagation(); step(-1); });
  lb.querySelector('.lb-next').addEventListener('click', e=>{ e.stopPropagation(); step(1); });
  $('#lbLike').addEventListener('click', e=>{
    e.stopPropagation();
    const o=imgs[cur]; if(!o) return;
    (function(){ const liked=store.get('gal_like_'+o.src,'')==='1';
      let n=parseInt(store.get('gal_n_'+o.src,'0'))||0;
      n=Math.max(0, n+(liked?-1:1));
      store.set('gal_like_'+o.src, liked?'0':'1');
      store.set('gal_n_'+o.src, String(n));
    })();
    setBtn(o.btn, o.src);
    syncLb();
  });
  lb.addEventListener('click', e=>{ if(e.target===lb) closeLb(); });
  document.addEventListener('keydown', e=>{
    if(!lb.classList.contains('open')) return;
    if(e.key==='Escape') closeLb();
    if(e.key==='ArrowLeft') step(-1);
    if(e.key==='ArrowRight') step(1);
  });
})();

/* ── 9 · MẶT B — secret: chạm logo 3 lần ────────────────── */
(function secret(){
  const logo=document.querySelector('.nav-logo');
  if(!logo) return;
  let clicks=0, timer=null;
  logo.addEventListener('click', e=>{
    e.preventDefault();
    clicks++;
    clearTimeout(timer);
    if(clicks>=3){ clicks=0; unlock(); return; }
    timer=setTimeout(()=>{
      if(clicks===1) scrollTo({top:0, behavior:'smooth'});
      clicks=0;
    }, 480);
  });
  function unlock(){
    try{
      const a=Math.floor(Math.random()*ALBUMS.length);
      const tr=ALBUMS[a].tracks||[];
      if(!tr.length) return;
      const j=Math.floor(Math.random()*tr.length);
      selectAlbum(a, true);
      playAt(j);
      const first=store.get('ali_sideB','')!=='1';
      store.set('ali_sideB','1');
      toast(first
        ? '✦ Bạn vừa lật được <b>Mặt B</b> — một bản giấu trong sạp đang quay…'
        : '✦ <b>Mặt B</b> quay tiếp — một bản ngẫu nhiên khác cho người tò mò.');
    }catch(e){}
  }
})();

/* ── 10 · PERF — bớt lớp trang trí trên mobile ──────────── */
/* ── 11 · HERO KINETIC — tên tách ký tự, bay vào + nam châm ── */
(function heroKinetic(){
  const name=$('.hero-name');
  if(!name || REDUCED) return;
  name.classList.add('split');
  const letters=[];
  [heroLine1, heroLine2].forEach(line=>{
    if(!line) return;
    const txt=line.textContent;
    line.textContent='';
    [...txt].forEach(c=>{
      if(/\s/.test(c)){ line.appendChild(document.createTextNode(c)); return; }
      const sp=el(`<span class="hl">${c}</span>`);
      line.appendChild(sp);
      letters.push(sp);
    });
  });
  letters.forEach((sp,i)=>{
    sp.style.setProperty('--i', i);
    /* sau khi bay vào xong, gỡ animation để hiệu ứng nam châm dùng được transform */
    sp.addEventListener('animationend', ()=>{ sp.style.animation='none'; sp.dataset.free='1'; }, {once:true});
  });
  if(HOVER && heroSec){
    const R=150, K=20;
    heroSec.addEventListener('pointermove', e=>{
      if(document.body.classList.contains('no-motion')) return;
      for(const sp of letters){
        if(!sp.dataset.free) continue;
        const r=sp.getBoundingClientRect();
        const dx=(r.left+r.width/2)-e.clientX, dy=(r.top+r.height/2)-e.clientY;
        const d=Math.hypot(dx,dy);
        if(d<R && d>1){
          const f=(1-d/R)*K;
          sp.style.transform=`translate(${(dx/d*f).toFixed(1)}px, ${(dy/d*f).toFixed(1)}px) rotate(${(dx/d*f*0.3).toFixed(2)}deg)`;
        } else if(sp.style.transform) sp.style.transform='';
      }
    }, {passive:true});
    heroSec.addEventListener('pointerleave', ()=>{ letters.forEach(sp=>{ sp.style.transform=''; }); });
  }
})();

/* ── 12 · TIÊU ĐỀ SECTION — ký tự bay vào khi cuộn tới ── */
(function kineticHeadings(){
  if(REDUCED) return;
  document.querySelectorAll('.sec-h').forEach(h=>{
    let i=0;
    (function walk(node){
      [...node.childNodes].forEach(n=>{
        if(n.nodeType===3){
          const frag=document.createDocumentFragment();
          [...n.textContent].forEach(c=>{
            if(/\s/.test(c)){ frag.appendChild(document.createTextNode(c)); return; }
            const sp=document.createElement('span');
            sp.className='ch'; sp.textContent=c; sp.style.setProperty('--i', i++);
            frag.appendChild(sp);
          });
          n.replaceWith(frag);
        } else if(n.nodeType===1) walk(n);
      });
    })(h);
    h.classList.add('chsplit');
  });
})();

/* ── 13 · ABOUT — câu dẫn sáng dần theo cuộn (scrollytelling) ── */
(function leadReveal(){
  const lead=document.getElementById('aboutLead');
  if(!lead) return;
  const words=lead.textContent.trim().split(/\s+/);
  lead.innerHTML=words.map(w=>`<span class="aw">${w}</span>`).join(' ');
  const spans=[...lead.querySelectorAll('.aw')];
  let lit=-1;
  function update(){
    const r=lead.getBoundingClientRect();
    const vh=innerHeight;
    const p=Math.max(0, Math.min(1, (vh*0.88 - r.top)/(vh*0.5)));
    const n=Math.round(p*spans.length);
    if(n===lit) return;
    lit=n;
    spans.forEach((s,i)=>s.classList.toggle('on', i<n));
  }
  if(REDUCED){ spans.forEach(s=>s.classList.add('on')); return; }
  addEventListener('scroll', update, {passive:true});
  addEventListener('resize', update, {passive:true});
  update();
})();

/* ── 14 · ABOUT — stats đếm số (dữ liệu thật từ sạp nhạc) ── */
(function stats(){
  const wrap=document.getElementById('aboutStats');
  if(!wrap) return;
  function compute(){
    try{
      const ids=new Set();
      ALBUMS.forEach(a=>(a.tracks||[]).forEach(t=>ids.add(t.id)));
      const songs=document.getElementById('astSongs');
      const albs=document.getElementById('astAlbums');
      if(songs && ids.size) songs.dataset.n=String(ids.size);
      if(albs) albs.dataset.n=String(ALBUMS.length);
    }catch(e){}
  }
  let ran=false;
  function setFinal(){
    wrap.querySelectorAll('.ast-n').forEach(n=>{ n.textContent=(n.dataset.n||'0')+(n.dataset.suf||''); });
  }
  function runCount(){
    if(ran) return; ran=true;
    if(REDUCED){ setFinal(); return; }
    wrap.querySelectorAll('.ast-n').forEach(elN=>{
      const target=parseInt(elN.dataset.n||'0',10);
      const suf=elN.dataset.suf||'';
      const t0=performance.now(), dur=1400;
      (function tick(now){
        const p=Math.min(1,(now-t0)/dur);
        const e2=1-Math.pow(1-p,3);
        elN.textContent=Math.round(target*e2)+(p>=1?suf:'');
        if(p<1) requestAnimationFrame(tick);
      })(t0);
    });
  }
  window.refreshAboutStats=function(){ compute(); if(ran) setFinal(); };
  compute();
  new IntersectionObserver((es,o)=>{ if(es[0].isIntersecting){ runCount(); o.disconnect(); } },{threshold:0.35}).observe(wrap);
})();

/* ── 15 · ABOUT — chồng ảnh lật được (chạm để đổi chân dung) ── */
(function photoStack(){
  const fig=document.getElementById('photoStack');
  if(!fig) return;
  const cards=[...fig.querySelectorAll('.ps-card')];
  if(cards.length<2) return;
  let busy=false;
  fig.addEventListener('click', ()=>{
    if(busy) return; busy=true;
    const front=cards.find(c=>c.dataset.pos==='0');
    if(!front){ busy=false; return; }
    front.classList.add('ps-out');
    setTimeout(()=>{
      cards.forEach(c=>{
        const p=parseInt(c.dataset.pos,10);
        c.dataset.pos=String(p===0 ? cards.length-1 : p-1);
      });
      front.classList.remove('ps-out');
      setTimeout(()=>{ busy=false; }, 250);
    }, 360);
  });
})();

/* ── 16 · MARQUEE — nghiêng theo đà cuộn ── */
if(!REDUCED){
  const mWraps=[...document.querySelectorAll('.marquee-wrap')];
  let lastY=scrollY, lastT=performance.now();
  addEventListener('scroll', ()=>{
    if(document.body.classList.contains('no-motion')) return;
    const now=performance.now();
    const dy=scrollY-lastY, dt=Math.max(16, now-lastT);
    lastY=scrollY; lastT=now;
    const sk=Math.max(-2.6, Math.min(2.6, dy/dt*2.4));
    mWraps.forEach(w=>{
      w.style.transform=`skewY(${sk.toFixed(2)}deg)`;
      clearTimeout(w._skT);
      w._skT=setTimeout(()=>{ w.style.transform='skewY(0deg)'; }, 110);
    });
  }, {passive:true});
}

if(MOBILE){
  document.querySelectorAll('.md-row').forEach((r,i)=>{ if(i>7) r.remove(); });
}
})();
