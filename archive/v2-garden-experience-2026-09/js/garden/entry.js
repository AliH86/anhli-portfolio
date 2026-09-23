/* Owns mode, focus and the bridge into the existing catalog/player. */
(function gardenEntry(){
  'use strict';
  // New UI owns navigation; the original slice remains available via ?classic.
  if(document.documentElement.classList.contains('dg-enabled')) return;
  // First two stops passed local runtime QA; load only after explicit desktop entry.
  const SCENE_READY=true;
  const $=id=>document.getElementById(id);
  const entrance=$('gardenEntrance'), walk=$('gardenWalk'), enter=$('gardenEnter');
  const dialog=$('gardenAlbumDialog'), drawer=$('albumDrawer'), player=$('player');
  const drawerHome=document.createComment('garden drawer return point');
  const playerHome=document.createComment('garden player return point');
  drawer.before(drawerHome); player.before(playerHome);
  const media=$('audioEl');
  const seek=$('pcBar');
  seek.tabIndex=0;seek.setAttribute('role','slider');seek.setAttribute('aria-label','Vị trí phát');seek.setAttribute('aria-valuemin','0');
  function syncSeek(){seek.setAttribute('aria-valuemax',String(Math.floor(media.duration||0)));seek.setAttribute('aria-valuenow',String(Math.floor(media.currentTime||0)));}
  media.addEventListener('timeupdate',syncSeek);media.addEventListener('loadedmetadata',syncSeek);syncSeek();
  seek.addEventListener('keydown',e=>{if(!Number.isFinite(media.duration))return;const next=e.key==='ArrowRight'?media.currentTime+5:e.key==='ArrowLeft'?media.currentTime-5:e.key==='Home'?0:e.key==='End'?media.duration:null;if(next!==null){e.preventDefault();media.currentTime=Math.max(0,Math.min(media.duration,next));syncSeek();}});
  let aborter=null;
  let scene=null, generation=0, active=false, returnFocus=null, loading=false;
  let progress=0, dusk=false, chapter=-1, closedByMode=false;
  const storage={get(k){try{return localStorage.getItem(k);}catch{return null;}},set(k,v){try{localStorage.setItem(k,v);}catch{}}};
  const mobile=matchMedia('(max-width:900px), (hover:none)');
  const reduce=matchMedia('(prefers-reduced-motion:reduce)');
  function constrained(){return mobile.matches || navigator.connection?.saveData || (navigator.deviceMemory && navigator.deviceMemory<4);}
  function reduced(){return reduce.matches || document.body.classList.contains('no-motion');}
  function setStatus(s){$('gardenStatus').textContent=s;}
  function saveMode(mode){storage.set('anhli-experience',mode);}
  const ready=Promise.resolve(window.portfolioCatalogReady);
  function albums(){return ALBUMS.map(a=>({id:a.id,name:a.name,cover:coverUrl(a.cover),tracks:(a.tracks||[]).map(t=>({id:t.id,name:t.name}))}));}
  function findAlbum(id){return ALBUMS.findIndex(a=>a.id===id);}
  const adapter={
    ready, albums,
    openAlbum(id,source){
      const i=findAlbum(id); if(i<0) return;
      returnFocus=source || $('gardenStory');
      window.unlockMusicWorld?.({scroll:false,animate:false});
      selectAlbum(i,true);
      $('gardenAlbumHeading').textContent=ALBUMS[i].name;
      $('gardenAlbumContent').append(drawer);
      $('gardenAlbumPlayer').append(player);
      // The existing track actions keep their real catalog indices/player.
      drawer.querySelectorAll('.trow').forEach(row=>{
        row.tabIndex=0; row.setAttribute('role','button');
        row.setAttribute('aria-label','Nghe '+row.querySelector('.trow-name').textContent);
      });
      document.body.classList.add('garden-panel');
      dialog.showModal(); $('gardenAlbumClose').focus(); syncRunning();
    },
    openSection(id){
      if(!['home','gardenEntrance','about','work','contact','music','gallery','videos','gardenCalendar','vedic'].includes(id)) return;
      leave(false);
      if(id==='music') window.unlockMusicWorld?.({scroll:false,animate:false});
      const section=$(id==='home'?'gardenEntrance':id); if(!section) return;
      section.tabIndex=-1;
      section.scrollIntoView({behavior:reduced()?'instant':'smooth',block:'start'});
      section.focus({preventScroll:true});
      history.replaceState(null,'','#'+id);
    },
    subscribePlayer(fn){
      const report=()=>fn({playing:!media.paused && !media.ended,albumId:ALBUMS[activeAlbum]?.id||null,trackId:ALBUMS[activeAlbum]?.tracks?.[activeIdx]?.id||null});
      const events=['play','playing','pause','ended','emptied','loadedmetadata'];
      events.forEach(e=>media.addEventListener(e,report)); report();
      return ()=>events.forEach(e=>media.removeEventListener(e,report));
    }
  };
  window.PortfolioExperience=adapter;
  function restoreDialog(){
    drawerHome.after(drawer);
    if(active) $('gardenPlayerDock').append(player); else playerHome.after(player);
    document.body.classList.remove('garden-panel');
    syncRunning();
    if(!closedByMode && returnFocus?.isConnected) returnFocus.focus({preventScroll:true});
    closedByMode=false;
  }
  dialog.addEventListener('close',restoreDialog);
  $('gardenAlbumClose').addEventListener('click',()=>dialog.close());
  $('gardenAlbumContent').addEventListener('keydown',e=>{
    if((e.key==='Enter'||e.key===' ') && e.target.classList.contains('trow')){e.preventDefault();e.target.click();}
  });
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  media.addEventListener('error',()=>{$('gardenAudioStatus').textContent='Bài này chưa tải được. Bạn thử lại hoặc chọn bài khác nhé.';});
  media.addEventListener('playing',()=>{$('gardenAudioStatus').textContent='';});
  // Newly expanded track rows need the same keyboard affordance.
  new MutationObserver(()=>drawer.querySelectorAll('.trow:not([tabindex])').forEach(row=>{row.tabIndex=0;row.setAttribute('role','button');row.setAttribute('aria-label','Nghe '+row.querySelector('.trow-name').textContent);})).observe(drawer,{childList:true,subtree:true});
  const returnButton=document.createElement('button');
  returnButton.type='button';returnButton.className='garden-return';returnButton.textContent='Dạo vườn ↗';
  $('nav').insertBefore(returnButton,$('navBurger'));
  returnButton.addEventListener('click',()=>start());
  function showEligibility(){
    if(!SCENE_READY || constrained()){
      enter.textContent='Ghé sạp nhạc ↗';returnButton.hidden=true;
      setStatus(SCENE_READY?'Bản nhẹ: vẫn đủ nhạc, hình ảnh và những câu chuyện của Li.':'Ghé nghe nhạc, xem hình và những câu chuyện của Li.');
    }else{enter.innerHTML='Dạo vườn <span aria-hidden="true">↗</span>';returnButton.hidden=false;}
  }
  showEligibility();
  async function start(){
    if(!SCENE_READY || constrained()){adapter.openSection('music');return;}
    if(active){walk.scrollIntoView({behavior:'instant'});return;}
    if(loading)return;
    const token=++generation; aborter=new AbortController(); loading=true;enter.disabled=true;enter.textContent='Đang mở cổng…';
    setStatus('Mở khu vườn, bạn vẫn có thể xem portfolio ngay.');
    let mounted=null;
    try{
      await ready;
      if(token!==generation)return;
      const {createGarden}=await import('./scene.runtime.js?v=2026-09-11');
      if(token!==generation)return;
      walk.hidden=false; entrance.hidden=true;
      document.body.classList.add('garden-active');
      window.applyAnhLiTheme?.('dandelion',{persist:true});
      mounted=await createGarden({host:$('gardenCanvas'),hotspots:$('gardenHotspots'),adapter,reduced:reduced(),signal:aborter.signal,onError:()=>leave(true,'Khu vườn tạm nghỉ. Bạn vẫn có thể xem và nghe ở bản nhẹ.')});
      if(token!==generation){mounted.dispose();return;}
      scene=mounted; active=true;loading=false;enter.disabled=false;
      $('gardenPlayerDock').append(player);
      dusk=storage.get('anhli-garden-light')==='dusk'; applyLight();
      window.scrollTo({top:walk.offsetTop+progress*(walk.offsetHeight-innerHeight),behavior:'instant'});
      updateScroll();syncRunning();
      saveMode('garden'); setStatus('Cuộn để dạo. Chạm để khám phá.');
      $('gardenExit').focus({preventScroll:true});
    }catch(error){
      mounted?.dispose();
      if(token===generation){console.warn('[Garden] fall back to portfolio:',error);leave(true,'Khu vườn chưa mở được. Bạn vẫn có thể xem và nghe ở bản nhẹ.');}
    }finally{if(token===generation){loading=false;enter.disabled=false;showEligibility();}}
  }
  function leave(toEntrance=true,message){
    ++generation;aborter?.abort();aborter=null;loading=false;enter.disabled=false;
    active=false;
    if(dialog.open){closedByMode=true;dialog.close();}
    drawerHome.after(drawer);playerHome.after(player);
    scene?.dispose();scene=null;
    document.body.classList.remove('garden-active','garden-panel','garden-dusk');
    walk.hidden=true;entrance.hidden=false;chapter=-1;
    saveMode('classic');showEligibility();
    if(message)setStatus(message);
    if(toEntrance){window.scrollTo({top:0,behavior:'instant'});enter.focus({preventScroll:true});}
  }
  function applyLight(){
    scene?.setDusk(dusk);document.body.classList.toggle('garden-dusk',active&&dusk);
    $('gardenLight').textContent=dusk?'☾ Chiều muộn':'☀ Nắng trong vườn';
    $('gardenLight').setAttribute('aria-pressed',String(dusk));storage.set('anhli-garden-light',dusk?'dusk':'day');
  }
  function updateScroll(){
    if(!active || !scene)return;
    const r=walk.getBoundingClientRect();
    progress=Math.max(0,Math.min(1,-r.top/(walk.offsetHeight-innerHeight)));
    scene.setProgress(progress);
    const next=progress>.48?1:0;
    if(next!==chapter){
      chapter=next;
      walk.dataset.chapter=String(next);
      $('gardenChapter').textContent=next?'02 / Sạp nhạc':'01 / Góc chăm cây';
      $('gardenSceneTitle').innerHTML=next?'Chọn một bìa.<br><em>Nghe một chuyện.</em>':'Có người<br><em>ở trong vườn.</em>';
      $('gardenSceneText').textContent=next?'Có những điều Li kể bằng một bài hát. Chạm dấu + trên bìa để mở album nhé.':'Mình là Li. Những điều mình làm bắt đầu từ những điều mình để ý.';
      $('gardenStory').textContent=next?'Ghé toàn bộ sạp nhạc ↗':'Chuyện của Li ↗';
      $('gardenScrollHint').textContent=next?'Cuộn ngược để về góc chăm cây ↑':'Cuộn tiếp để ghé sạp nhạc ↓';
      document.querySelectorAll('[data-garden-stop]').forEach(b=>{if(+b.dataset.gardenStop===next)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
    }
    syncRunning();
  }
  function syncRunning(){
    if(!scene)return;
    const r=walk.getBoundingClientRect();
    scene.setReduced(reduced());
    scene.setRunning(active && !document.hidden && !dialog.open && !document.body.classList.contains('oracle-open') && r.bottom>innerHeight*.2 && r.top<innerHeight);
  }
  $('gardenLight').addEventListener('click',()=>{dusk=!dusk;applyLight();});
  enter.addEventListener('click',start);
  $('gardenExit').addEventListener('click',()=>leave());
  $('gardenStory').addEventListener('click',()=>adapter.openSection(chapter===1?'music':'about'));
  $('gardenAllMusic').addEventListener('click',e=>{e.preventDefault();adapter.openSection('music');});
  document.querySelectorAll('[data-garden-stop]').forEach(b=>b.addEventListener('click',()=>{
    const top=walk.offsetTop+(+b.dataset.gardenStop)*(walk.offsetHeight-innerHeight)*.95;
    window.scrollTo({top,behavior:reduced()?'instant':'smooth'});
  }));
  // Ordinary navigation remains available from any point; no scroll trapping.
  $('navLinks').addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(a&&(active||loading)){e.preventDefault();adapter.openSection(a.hash.slice(1));}});
  document.querySelector('.garden-entry-actions a').addEventListener('click',()=>{if(loading)leave(false);});
  addEventListener('scroll',updateScroll,{passive:true});
  addEventListener('resize',()=>{if(constrained()&&(active||loading))leave();showEligibility();updateScroll();});
  document.addEventListener('visibilitychange',syncRunning);
  reduce.addEventListener('change',syncRunning);
  new MutationObserver(syncRunning).observe(document.body,{attributes:true,attributeFilter:['class']});
  addEventListener('anhli-theme-change',e=>{if(e.detail.key!=='dandelion'&&(active||loading))leave();});
  addEventListener('pagehide',()=>leave(false));
  addEventListener('pageshow',()=>{showEligibility();});
  function followLocation(){
    if(active||loading)leave(false);
    if(location.hash){const target=$(location.hash.slice(1));if(target)target.scrollIntoView({behavior:'instant'});}
    else if(new URLSearchParams(location.search).has('album')||new URLSearchParams(location.search).has('bai')) ready.then(()=>{aliDeepDone=false;window.unlockMusicWorld?.({scroll:false,animate:false});applyDeepLink();});
  }
  addEventListener('popstate',followLocation);
  addEventListener('hashchange',followLocation);
  const deep=location.hash || new URLSearchParams(location.search).has('album') || new URLSearchParams(location.search).has('bai');
  // Explicit entry on every visit; saved mode never forces a GPU download.
  if(deep)ready.then(followLocation);
  // Tiny read-only receipt for QA, not product UI.
  window.gardenDiagnostics=()=>({active,loading,progress,reduced:reduced(),dusk,...scene?.diagnostics()});
})();
