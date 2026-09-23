import {destinations,routes,fragments} from './content.mjs';
import {pageContent,musicPanel,esc} from './view.mjs';
import {mountGardenPlate} from './garden-plate.mjs';
import {mountMusicScene} from './music-scene.mjs';
import {mountAboutMedia} from './about-media.mjs';
const app=document.getElementById('dgApp');
if(document.documentElement.classList.contains('dg-enabled')&&app) start();
function start(){
  const main=document.getElementById('dgMain'),map=document.getElementById('dgMap'),lightbox=document.getElementById('dgLightbox');
  const base=new URL(document.baseURI),music=window.DandelionMusic;
  const worldReview=new URLSearchParams(location.search).get('world')==='blockout';
  mountGardenPlate(app,{disabled:worldReview});
  if(!worldReview)mountMusicScene(app);
  mountAboutMedia(app,music);
  let worldLoading=false;
  async function loadWorld(){
    if(!worldReview||worldLoading||current==='flat'||navigator.connection?.saveData)return;
    worldLoading=true;
    try{
      const {mountBlockout}=await import('./blockout.mjs');
      const world=mountBlockout(document.getElementById('dgWorld'),app);
      window.dandelionWorldDiagnostics=world.diagnostics;
      app.querySelector('.dg-review-label').textContent='WORLD BLOCKOUT · KHUNG CẢNH THỬ';
    }catch(error){
      document.getElementById('dgWorld').dataset.worldError='unavailable';
      app.querySelector('.dg-review-label').textContent='BẢN NHẸ · WORLD CHƯA MỞ ĐƯỢC';
      console.warn('[Garden blockout]',error.message);
    }
  }
  const sky=document.getElementById('vedic'),skyHome=document.createComment('Vedic original home');
  sky.before(skyHome);
  let albums=[],albumId=null,current=app.dataset.route,explore=false,ready=false;
  let contentAnimation,worldAnimation;
  const trim=s=>s.replace(/^\/+|\/+$/g,'').replace(/\/index\.html$/,'').replace(/^index\.html$/,'');
  function urlRoute(url=new URL(location.href)){
    const relative=trim(url.pathname.slice(base.pathname.length));
    return routes.find(r=>trim(r.path)===relative)?.id||'garden';
  }
  function routeURL(id,isExplore=false){
    const url=new URL(routes.find(r=>r.id===id)?.path||'./',base);
    if(isExplore)url.hash='explore';
    if(worldReview)url.searchParams.set('world','blockout');
    if(id==='music'&&albumId)url.searchParams.set('album',albumId);
    return url;
  }
  const slug=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[đĐ]/g,'d').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  function selectedFromURL(){
    const params=new URLSearchParams(location.search),q=params.get('album'),track=params.get('bai');
    return albums.find(a=>a.id===q||slug(a.name)===q||a.tracks.some(t=>t.id===track||slug(t.name)===track))?.id;
  }
  function saveScroll(){history.replaceState({...history.state,dgScroll:scrollY},'',location.href);}
  function render(id,{isExplore=false,focus=false,scroll=0}={}){
    if(sky.parentNode!==skyHome.parentNode)skyHome.after(sky);
    current=id;explore=id==='garden'&&isExplore;
    app.dataset.route=id;app.dataset.view=explore?'explore':id==='garden'?'arrival':id;
    main.innerHTML=pageContent(id,{albums,albumId,explore});
    const active=routes.find(r=>r.id===id)?.parent||id;
    app.querySelectorAll('.dg-nav a,.dg-map-destination').forEach(a=>{
      if(a.dataset.dgRoute===active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
    });
    document.title=`${routes.find(r=>r.id===id)?.label||'GARDEN'} · Anh Li — The Dandelion Garden`;
    if(id==='sky')document.getElementById('dgSkySlot').append(sky);
    if(focus)main.querySelector('h1')?.focus({preventScroll:true});
    window.scrollTo({top:scroll,behavior:'instant'});
    syncPlayer();
    app.dispatchEvent(new CustomEvent('dandelion:route',{detail:{id,explore}}));
    loadWorld();
  }
  function transitionRender(id,options){
    contentAnimation?.cancel();worldAnimation?.cancel();
    render(id,options);
    const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
    if(reduced)return;
    contentAnimation=main.animate([{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'none'}],{duration:420,easing:'cubic-bezier(.2,.7,.2,1)'});
    worldAnimation=document.getElementById('dgWorld').animate([{opacity:.4,transform:'scale(1.018)'},{opacity:1,transform:'none'}],{duration:600,easing:'cubic-bezier(.2,.7,.2,1)'});
  }
  function go(id,isExplore=false,{replace=false}={}){
    if(!routes.some(r=>r.id===id))return;
    saveScroll();
    if(map.open)map.close();if(lightbox.open)lightbox.close();
    const url=routeURL(id,isExplore);
    history[replace?'replaceState':'pushState']({dg:true,dgScroll:0},'',url);
    transitionRender(id,{isExplore,focus:true});
  }
  function fillMusic(){
    const panel=document.getElementById('dgMusicPanel');
    if(panel)panel.innerHTML=musicPanel(albums,albumId);
    if(albumId&&ready)music.select(albumId);
    syncPlayer();
  }
  function syncPlayer(){
    if(!music||!ready)return;
    const state=music.state();
    const mini=document.getElementById('dgMini');
    mini.hidden=current==='music'||(!state.trackId&&!(current==='garden'&&explore));
    document.getElementById('dgMiniTitle').textContent=state.title||'Chưa phát — bấm để nghe';
    const title=document.getElementById('dgTrackTitle');if(title)title.textContent=state.title?`${state.playing?'Đang phát':'Đã tạm dừng'} · ${state.title}`:'Chọn một bài để nghe';
    app.querySelectorAll('[data-action="play"]').forEach(b=>{b.textContent=state.playing?'❚❚':'▶';b.setAttribute('aria-label',state.playing?'Tạm dừng nhạc':'Phát nhạc');});
    app.querySelectorAll('[data-action="mute"]').forEach(b=>{b.textContent=state.muted?'Bật tiếng':'Âm';b.setAttribute('aria-pressed',String(state.muted));b.setAttribute('aria-label',state.muted?'Bật tiếng':'Tắt tiếng');});
    app.querySelectorAll('[data-track]').forEach(b=>{if(b.dataset.track===state.trackId)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current');});
    const seek=document.getElementById('dgSeek');
    if(seek){seek.disabled=!Number.isFinite(state.duration);seek.max=Number.isFinite(state.duration)?state.duration:100;seek.value=state.time||0;seek.setAttribute('aria-valuetext',time(state.time));}
    const cur=document.getElementById('dgCurrentTime'),dur=document.getElementById('dgDuration');
    if(cur)cur.textContent=time(state.time);if(dur)dur.textContent=time(state.duration);
  }
  function time(n){const s=Math.floor(Number.isFinite(n)?n:0);return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;}
  function message(text){const node=document.getElementById('dgAudioMessage');if(node)node.textContent=text;}
  function showMap(){if(!map.open)map.showModal();}
  app.addEventListener('click',e=>{
    const a=e.target.closest('a[data-dg-route]');
    if(a&&!e.metaKey&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&e.button===0){e.preventDefault();go(a.dataset.dgRoute,a.hasAttribute('data-explore'));return;}
    const close=e.target.closest('[data-close]');if(close){document.getElementById(close.dataset.close).close();return;}
    const t=e.target.closest('[data-track]');if(t&&ready){message('');music.play(albumId,Number(t.dataset.trackIndex));syncPlayer();return;}
    const action=e.target.closest('[data-action]')?.dataset.action;
    if(action==='map'){showMap();return;}if(action==='explore'){go('garden',true);return;}
    if(!ready)return;
    if(action==='play'){message('');if(!music.state().trackId)music.play(albumId,0);else music.toggle();}
    if(action==='next')music.next();if(action==='previous')music.previous();
    if(action==='mute')music.media.muted=!music.media.muted;
    syncPlayer();
  });
  app.addEventListener('change',e=>{
    if(e.target.id==='dgAlbumSelect'){
      albumId=e.target.value;fillMusic();history.replaceState({...history.state},'',routeURL('music'));
      document.getElementById('dgAlbumSelect')?.focus({preventScroll:true});
    }
  });
  app.addEventListener('input',e=>{if(e.target.id==='dgSeek'&&ready&&Number.isFinite(music.media.duration))music.media.currentTime=Math.min(music.media.duration,Math.max(0,Number(e.target.value)));});
  app.addEventListener('error',e=>{if(e.target instanceof HTMLImageElement){e.target.classList.add('dg-image-unavailable');e.target.alt=e.target.alt||'Hình chưa tải được';}},true);
  document.addEventListener('keydown',e=>{
    const dialog=map.open?map:lightbox.open?lightbox:null;
    if(dialog&&e.key==='Tab'){
      const focusable=[...dialog.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex="0"],video[controls],iframe')].filter(n=>n.getClientRects().length);
      const first=focusable[0],last=focusable.at(-1);
      if(e.shiftKey&&(document.activeElement===first||!dialog.contains(document.activeElement))){e.preventDefault();last?.focus();}
      else if(!e.shiftKey&&(document.activeElement===last||!dialog.contains(document.activeElement))){e.preventDefault();first?.focus();}
    }
    if(e.target.closest('input,select,textarea,[contenteditable="true"]'))return;
    if(e.key==='Escape'){
      if(map.open||lightbox.open)return;
      const detail=main.querySelector('details[open]');if(detail){detail.open=false;detail.querySelector('summary').focus();return;}
      if(current!=='garden'||!explore){e.preventDefault();go('garden',true);}
    }
    if(e.key.toLowerCase()==='m'&&!e.metaKey&&!e.ctrlKey&&!e.altKey){e.preventDefault();if(map.open)map.close();else showMap();}
    if(current==='story'&&e.target.closest('.dg-chapter')&&['ArrowLeft','ArrowRight'].includes(e.key)){
      const ds=[...main.querySelectorAll('.dg-chapter')],idx=ds.indexOf(e.target.closest('.dg-chapter')),next=ds[(idx+(e.key==='ArrowRight'?1:ds.length-1))%ds.length];
      ds.forEach(d=>d.open=d===next);next.querySelector('summary').focus();e.preventDefault();
    }
  });
  [map,lightbox].forEach(d=>d.addEventListener('click',e=>{if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}));
  window.addEventListener('popstate',()=>{
    if(map.open)map.close();if(lightbox.open)lightbox.close();
    albumId=selectedFromURL()||albumId;
    transitionRender(urlRoute(),{isExplore:location.hash==='#explore',focus:true,scroll:history.state?.dgScroll||0});
    if(ready&&current==='music')music.select(albumId);
  });
  window.addEventListener('wheel',e=>{
    if(current==='garden'&&!explore&&e.deltaY>55&&!map.open&&document.documentElement.scrollHeight<=innerHeight+30)go('garden',true);
  },{passive:true});
  const hashRoutes={'#music':'music','#work':'about','#gallery':'about','#about':'about','#vedic':'sky'};
  const initial=hashRoutes[location.hash]||(new URLSearchParams(location.search).has('bai')||new URLSearchParams(location.search).has('album')?'music':urlRoute());
  // Keep the server-rendered catalog readable while the live engine loads.
  if(initial!==current||location.hash==='#explore'||initial==='sky')render(initial,{isExplore:location.hash==='#explore'});
  if(music){
    for(const event of ['play','playing','pause','ended','timeupdate','loadedmetadata','volumechange','emptied'])music.media.addEventListener(event,syncPlayer);
    music.media.addEventListener('error',()=>message('Bài này chưa tải được. Bạn thử lại hoặc chọn một bài khác nhé.'));
    music.media.addEventListener('playing',()=>message(''));
    music.ready.then(()=>{
      albums=music.albums();ready=true;
      albumId=selectedFromURL()||albums.find(a=>a.id==='f5fc153c-51b8-4583-bfe9-1fcc872aab85')?.id||albums[0]?.id;
      if(albumId)music.select(albumId);
      if(current==='music')fillMusic();
      syncPlayer();
      if(initial!==urlRoute())history.replaceState({dg:true},'',routeURL(initial));
      window.dandelionDiagnostics=()=>({route:current,explore,ready,albums:albums.length,audioElements:document.querySelectorAll('audio').length,player:music.state(),world:'static-ui-preview'});
    }).catch(()=>message('Sạp nhạc chưa tải được. Bạn tải lại trang để thử nhé.'));
  }
  if(['#about-gallery','#resume','#about-videos'].includes(location.hash)&&initial==='about')requestAnimationFrame(()=>document.querySelector(location.hash)?.scrollIntoView());
  history.replaceState({...history.state,dg:true},'',location.href);
  loadWorld();
}
