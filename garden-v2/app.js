import {esc,icon,playable,albumBadge,unavailableReason,categories,matchesCategory,albumFrame,transport,bindShelf} from './garden-ui.js';
import {initWorld,musicState,sceneGateways} from './garden-state.js';
import {loadingMarkup,sendLoadingGust} from './garden-loading.js?v=1';
import { initGardenLife } from './garden-life.js?v=24';
import {albumIntroduction} from './garden-dialogue.js?v=4';
import {initEntrance,waitForImage} from './garden-entrance.js?v=25';
import {initLyrics} from './garden-lyrics.js?v=23';
import {mountFrameGrowth} from './garden-growth.js?v=1';
import {initGardenWind} from './garden-wind.js?v=23';
const $ = (s,root=document) => root.querySelector(s);
const $$ = (s,root=document) => [...root.querySelectorAll(s)];
function fillIcons(root=document){$$('[data-icon]',root).forEach(e=>e.innerHTML=icon(e.dataset.icon));}
fillIcons();
const room=$('#room-dialog'),content=$('#room-content'),lightbox=$('#lightbox'),audio=$('#audio');
const roomNav=$('.top-nav').cloneNode(true);roomNav.classList.add('room-nav');room.prepend(roomNav);
const motion=matchMedia('(prefers-reduced-motion: reduce)');
const touchDevice=matchMedia('(hover: none) and (pointer: coarse)');
document.body.dataset.touch=String(touchDevice.matches);
touchDevice.addEventListener('change',()=>{document.body.dataset.touch=String(touchDevice.matches);});
let savedMotion=null;try{savedMotion=localStorage.getItem('garden-still');}catch{}
const state={room:'',catalog:null,album:null,trackIndex:0,wanted:false,playing:false,loading:false,error:'',token:0,viewToken:0,gallery:null,shown:24,photoIndex:0,media:'photos',videos:null,mediaToken:0,videoIndex:null,playerLayout:'cover',hostPose:'idle',still:motion.matches,lastFocus:null,entered:false,listening:false,queueOpen:false,search:''};
if(savedMotion!==null)state.still=savedMotion==='true';
let lyricController=null,shelfCleanup=()=>{};
const worldController=initWorld();
const favoriteAlbums=new Set();try{JSON.parse(localStorage.getItem('garden-favorite-albums')||'[]').forEach(id=>favoriteAlbums.add(id));}catch{}
state.category='all';state.sheetTab='tracks';
const loads={};
async function getData(name){
  if(!loads[name])loads[name]=fetch(`./data/${name}.json?v=20260918-v22`,{cache:'no-cache',signal:AbortSignal.timeout(15000)}).then(r=>{if(!r.ok)throw Error('Không tải được dữ liệu.');return r.json();}).catch(e=>{delete loads[name];throw e;});
  return loads[name];
}
let noticeTimer,flight,flightEl,mediaMetadataKey='';
function notice(message){const n=$('#notice');n.textContent=message;n.classList.add('is-visible');clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>n.classList.remove('is-visible'),3200);}
function setMotion(){if(state.still)cancelFlight();document.body.dataset.still=String(state.still);$$('[data-motion-toggle]').forEach(button=>{button.setAttribute('aria-pressed',String(state.still));button.setAttribute('aria-label',state.still?'Bật chuyển động':'Giảm chuyển động để máy nhẹ hơn');button.title=state.still?'Bật chuyển động':'Giảm chuyển động để máy nhẹ hơn';});}
setMotion();motion.addEventListener('change',()=>{state.still=motion.matches;setMotion();});
$$('[data-motion-toggle]').forEach(button=>button.addEventListener('click',()=>{state.still=!state.still;try{localStorage.setItem('garden-still',String(state.still));}catch{}setMotion();notice(state.still?'Đã tắt chuyển động. Nhạc vẫn nghe bình thường.':'Đã bật chuyển động nhẹ.');}));
// Visibility only quiets decoration. Never pause/recreate audio on app or tab switches.
document.addEventListener('visibilitychange',()=>{document.body.dataset.pageHidden=String(document.hidden);});
window.addEventListener('pageshow',()=>{document.body.dataset.pageHidden=String(document.hidden);fitViewport();state.playing=!audio.paused;state.wanted=!audio.paused;syncPlayback();});
// This hides a browser download affordance only; it is not access control or DRM.
audio.addEventListener('contextmenu',e=>e.preventDefault());
$('#scenery img').addEventListener('error',()=>{document.body.classList.add('scene-failed');notice('Cảnh vườn chưa tải được. Bạn vẫn có thể nghe nhạc và xem ảnh.');});

document.addEventListener('click',e=>{const button=e.target.closest('[data-loading-gust]');if(button)sendLoadingGust(button,state.still);});

const titles={music:['MỖI BÀI HÁT LÀ MỘT LẦN TRỞ VỀ','Sạp nhạc'],profile:['NGƯỜI TRÔNG VƯỜN','Chuyện của Li.'],gallery:['HÌNH ẢNH & NHỮNG THƯỚC PHIM','Những điều để dành.']};
async function openRoom(name,{historyChange=true}={}){
  if(!titles[name]||!state.entered)return;
  const wasOpen=room.open;
  if(!wasOpen)state.lastFocus=document.activeElement;
  $('.garden-settings').open=false;
  state.queueOpen=false;room.dataset.queueOpen='false';$('.room-header').inert=false;
  const token=++state.viewToken;state.room=name;worldController.update(state);document.body.dataset.room=name;room.dataset.room=name;fitViewport();
  // Establish the destination's geometry before WebKit promotes it to the top layer.
  if(!wasOpen)room.showModal();
  mountFrameGrowth(room,name);
  setHostPose(name==='gallery'?'gallery':state.wanted?'seated':'idle');placeWorld();
  $('#room-kicker').textContent=titles[name][0];$('#room-title').textContent=titles[name][1];
  $$('.top-nav button').forEach(b=>b.classList.toggle('is-active',b.dataset.open===name));
  if(historyChange&&location.hash!==`#${name}`)history[wasOpen?'replaceState':'pushState']({gardenRoom:true},'',`${location.pathname}${location.search}#${name}`);
  shelfCleanup();content.innerHTML=loadingMarkup();
  try{
    if(name==='music'){state.catalog=await getData('catalog');if(token!==state.viewToken)return;renderMusic();}
    else if(name==='profile'){const profile=await getData('profile');if(token!==state.viewToken)return;renderProfile(profile);}
    else {[state.gallery,state.videos]=await Promise.all([getData('gallery'),getData('videos').catch(()=>[])]);if(token!==state.viewToken)return;renderGallery();}
    content.scrollTop=0;
    room.dataset.contentReady=String(token);
  }catch(e){if(token===state.viewToken)content.innerHTML=`<div class="empty-state" role="status">Chưa mở được góc này. Bạn thử lại nhé.<button class="retry" data-retry="${name}">Thử lại</button></div>`;}
}
function cleanupRoom(){shelfCleanup();state.queueOpen=false;room.dataset.queueOpen='false';$('.room-header').inert=false;stopVideo();state.room='';worldController.update(state);state.viewToken++;state.mediaToken++;setHostPose(state.wanted?'seated':'idle');document.body.dataset.room='';placeWorld();$$('.top-nav button').forEach(b=>b.classList.remove('is-active'));cancelFlight();state.lastFocus?.focus?.();}
function closeRoom(){if(lightbox.open){lightbox.close();return;}if(room.open)room.close();history.replaceState(null,'',location.pathname+location.search);}
room.addEventListener('close',cleanupRoom);
room.addEventListener('cancel',e=>{e.preventDefault();if(state.room==='music'&&state.queueOpen){state.queueOpen=false;syncQueue();$('.queue-more')?.focus({preventScroll:true});}else closeRoom();});
room.addEventListener('click',e=>{if(e.target===room){const r=room.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeRoom();}});
$('.close-room').addEventListener('click',closeRoom);
window.addEventListener('popstate',()=>{if(lightbox.open)lightbox.close();const name=location.hash.slice(1);if(titles[name])openRoom(name,{historyChange:false});else if(room.open)room.close();});
document.addEventListener('click',e=>{const b=e.target.closest('[data-open]');if(b)openRoom(b.dataset.open);});
$('.wordmark').addEventListener('click',e=>{e.preventDefault();if(room.open)closeRoom();});

function renderMusic(){
  content.innerHTML=`<section class="music-room" aria-label="Sạp đĩa của Li"><div class="shelf-block music-shelf"><div class="shelf-toolbar"><div class="category-chips" role="group" aria-label="Góc nhạc">${categories.map(([id,label])=>`<button class="garden-button paper-button" data-category="${id}" aria-pressed="${state.category===id}">${label}</button>`).join('')}</div><button class="garden-button paper-button picker-toggle" data-picker aria-label="Tìm và chọn nhanh album" aria-expanded="false" aria-controls="album-picker">${icon('search')}<span>Tìm đĩa</span></button></div><div id="album-picker" class="album-picker paper-panel" hidden><label for="album-search">Tìm một chiếc đĩa</label><input id="album-search" type="search" placeholder="Tên album hoặc bài hát…" autocomplete="off" value="${esc(state.search)}"><label class="sr-only" for="album-jump">Đến album</label><select id="album-jump"><option value="">Chọn nhanh · ${state.catalog.length} album</option>${state.catalog.map(a=>`<option value="${esc(a.id)}">${esc(a.name)}</option>`).join('')}</select></div><div class="shelf-display"><button class="round-button shelf-prev" data-shelf="-1" aria-label="Xem các album trước">${icon('left')}</button><div class="album-shelf" aria-label="Chọn album, vuốt ngang hoặc dùng phím mũi tên">${state.catalog.map((a,i)=>albumFrame(a,i,a.id===state.album?.id)).join('')}</div><button class="round-button shelf-next" data-shelf="1" aria-label="Xem thêm album">${icon('right')}</button></div><div class="shelf-foot"><span id="shelf-position">${state.catalog.length} chiếc đĩa</span><span>Chọn một chiếc đĩa, ngồi lại một chút.</span></div><p class="shelf-no-results paper-panel" hidden>Chưa thấy chiếc đĩa này. Thử một tên khác nha.</p></div><div id="album-selection" class="wood-panel music-console"></div><aside id="track-queue" class="playlist-drawer wood-panel" role="region" aria-label="Sổ bài hát" hidden></aside></section>`;
  renderSelection();filterShelf(state.search);
  if(!state.album){const first=state.catalog.find(a=>a.name==='Untamed')||state.catalog[0];state.album=first;state.trackIndex=Math.max(0,first.tracks.findIndex(t=>t.url));renderSelection();$$('[data-album]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.album===first.id)));}
  shelfCleanup=bindShelf(content,{still:()=>state.still,onFocus:(id,index,total)=>{const caption=$('#shelf-position');if(caption)caption.textContent=`${String(index+1).padStart(2,'0')} / ${total} chiếc đĩa`;}});
  if(state.album)centerAlbum(state.album.id,'instant');
}
function centerAlbum(id,behavior=state.still?'instant':'smooth'){
 const button=$(`[data-album="${CSS.escape(id)}"]`);if(button&&!button.hidden)button.scrollIntoView({inline:'center',block:'nearest',behavior});
}
function filterShelf(query){
 const normalize=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase();const needle=normalize(query.trim());let count=0;
 for(const button of $$('[data-album]')){const album=state.catalog.find(a=>a.id===button.dataset.album);button.hidden=!matchesCategory(album,state.category,favoriteAlbums)||!normalize([album.name,...album.tracks.map(t=>t.name)].join(' ')).includes(needle);if(!button.hidden)count++;}
 const empty=$('.shelf-no-results');if(empty){empty.hidden=Boolean(count);empty.textContent=state.category==='favorites'&&!needle?'Chưa có chiếc đĩa yêu thích. Chạm trái tim bên tên bài để giữ lại nha.':'Chưa thấy chiếc đĩa này. Thử một tên khác nha.';}
 const selected=$('[data-album][aria-pressed=true]:not([hidden])')||$('[data-album]:not([hidden])');if(selected)centerAlbum(selected.dataset.album,'instant');
 const caption=$('#shelf-position');if(caption)caption.textContent=`${count} chiếc đĩa`;
}
function renderSelection(){
 const target=$('#album-selection'),queue=$('#track-queue');if(!target||!queue)return;
 if(!state.album){target.innerHTML=`<div class="console-inset paper-panel selection-empty"><p><strong>Mỗi chiếc đĩa, một câu chuyện.</strong><span>Chọn bìa nhạc trên kệ. Li ngồi nghe cùng bạn.</span></p></div>`;room.dataset.musicState='browse';queue.hidden=true;return;}
 const a=state.album,t=currentTrack();state.sheetTab='tracks';
 target.innerHTML=`<section class="console-inset paper-panel" aria-label="Đĩa nhạc trên máy"><div class="console-record"><img class="console-cover" src="${esc(a.cover)}" alt="Bìa ${esc(a.name)}" width="70" height="70"><div class="console-copy"><p class="eyebrow" id="listening-kicker">ĐĨA NHẠC TRÊN MÁY</p><h2 id="now-title">${esc(t?.name||a.name)}</h2><p class="album-byline">${esc(a.name)}</p></div><button class="favorite-album round-button" data-favorite aria-label="${favoriteAlbums.has(a.id)?'Bỏ yêu thích':'Yêu thích'} album" aria-pressed="${favoriteAlbums.has(a.id)}">${icon('heart')}</button></div>${transport()}<div class="console-actions"><button class="garden-button paper-button queue-more" data-queue aria-expanded="${state.queueOpen}" aria-controls="track-queue">${icon('list')}<span>Danh sách</span></button><div class="volume-control"><button class="round-button" id="mute" aria-label="${audio.muted?'Bật âm thanh':'Tắt âm thanh'}">${icon(audio.muted?'muted':'volume')}</button><input id="volume" aria-label="Âm lượng" type="range" min="0" max="1" step="0.05" value="${audio.volume}"></div></div><p id="play-status" class="play-status" role="status"></p><div class="audio-error" id="audio-error" hidden></div></section>`;
 queue.innerHTML=`<div class="ledger-inset paper-panel"><div class="sheet-handle" data-sheet-handle aria-hidden="true"></div><header class="ledger-header"><div><small>SỔ BÀI HÁT</small><h2>${esc(a.name)}</h2><p id="queue-current">${esc(t?.name||'')}</p></div><button class="round-button" data-close-queue aria-label="Đóng danh sách">${icon('close')}</button></header><div class="ledger-tabs" role="tablist" aria-label="Trong sổ nhạc"><button id="tab-tracks" role="tab" data-sheet-tab="tracks" aria-controls="queue-tracks" aria-selected="true">Danh sách <small>${a.tracks.length}</small></button><button id="tab-lyrics" role="tab" data-sheet-tab="lyrics" aria-controls="queue-lyrics" aria-selected="false" tabindex="-1">Lời bài hát</button></div><div id="queue-tracks" class="queue-page" role="tabpanel" aria-labelledby="tab-tracks"><ol id="track-list" class="track-list" aria-label="Bài hát trong album">${a.tracks.map((track,i)=>`<li><button class="track-button" data-track="${i}" aria-label="Nghe ${esc(track.name)}${track.url?'':'. Bài này chưa có file nhạc.'}" aria-pressed="${i===state.trackIndex}" ${track.url?'':'disabled aria-describedby="queue-unavailable"'}><span class="track-index">${String(i+1).padStart(2,'0')}</span><span class="track-name">${esc(track.name)}</span><span class="track-duration">${track.url?esc(track.duration):'Đang cập nhật'}</span></button></li>`).join('')}</ol>${a.tracks.some(t=>!t.url)?'<p id="queue-unavailable" class="unavailable-note">Một vài bài chưa có file nhạc. Li sẽ bổ sung sau nha.</p>':''}</div><div id="queue-lyrics" class="queue-page lyrics-page" role="tabpanel" aria-labelledby="tab-lyrics" hidden><div id="lyrics-field" class="lyrics-field" hidden></div><p class="lyrics-empty">Li chưa để lời bài hát này vào sổ.<br>Mình nghe nhạc trước nha.</p></div><footer class="sheet-transport">${transport({suffix:'-sheet',compact:true})}</footer></div>`;
 syncQueue();syncPlayback();lyricController?.update();
}
function syncQueue({focus=false}={}){
 const queue=$('#track-queue');if(!queue)return;
 queue.hidden=!state.album||!state.queueOpen;const sheet=matchMedia('(max-width:700px), (max-width:1000px) and (max-height:530px)').matches&&state.queueOpen;for(const n of [$('.music-shelf'),$('#album-selection'),$('.room-header')])if(n)n.inert=sheet;room.dataset.queueOpen=String(state.queueOpen);room.dataset.musicState=musicState(state);
 $$('[data-queue]').forEach(button=>button.setAttribute('aria-expanded',String(state.queueOpen)));
 if(state.queueOpen&&focus){$('[data-close-queue]')?.focus({preventScroll:true});$('#track-list')?.scrollTo({top:0});}
}
function syncListening(){
 room.dataset.listening=String(state.listening);room.dataset.musicState=musicState(state);worldController.update(state);
 const title=$('#now-title');if(title)title.textContent=currentTrack()?.name||state.album?.name||'';
 const current=$('#queue-current');if(current)current.textContent=currentTrack()?.name||'';
 const kicker=$('#listening-kicker');if(kicker)kicker.textContent=state.playing?'ĐANG NGHE CÙNG LI':'ĐĨA NHẠC TRÊN MÁY';
 if(state.room==='music'){$('#room-title').textContent='Sạp nhạc';$('#room-kicker').textContent='MỖI BÀI HÁT LÀ MỘT LẦN TRỞ VỀ';}
 lyricController?.update();
}
function currentTrack(){return state.album?.tracks[state.trackIndex];}
function cancelFlight(){flight?.cancel();flightEl?.remove();flight=null;flightEl=null;}
function animateCover(source){
  cancelFlight();if(state.still||motion.matches||!source)return;
  const start=source.getBoundingClientRect();const dest=$('#scene-record')?.getBoundingClientRect();if(!dest)return;
  flightEl=document.createElement('img');flightEl.src=source.src;flightEl.alt='';flightEl.className='flying-cover';
  Object.assign(flightEl.style,{left:`${start.left}px`,top:`${start.top}px`,width:`${start.width}px`,height:`${start.height}px`});
  // Keep animation in the dialog top layer; a body child would be underneath it.
  room.appendChild(flightEl);
  flight=flightEl.animate([{transform:'translate(0,0) rotate(-3deg) scale(1)',opacity:1},{transform:`translate(${dest.left-start.left}px,${dest.top-start.top-8}px) rotate(2deg) scale(${dest.width/start.width})`,offset:.8,opacity:1},{transform:`translate(${dest.left-start.left}px,${dest.top-start.top}px) rotate(0deg) scale(${dest.width/start.width})`,opacity:0}],{duration:480,easing:'cubic-bezier(.22,.7,.2,1)'});
  flight.onfinish=cancelFlight;
}
function resetAudio(){
  state.token++;state.wanted=false;state.playing=false;state.loading=false;state.error='';audio.pause();audio.removeAttribute('src');audio.load();
}
function selectAlbum(id,source){const a=state.catalog?.find(a=>a.id===id);if(!a)return;if(state.album?.id===id){centerAlbum(id);return;}resetAudio();state.listening=false;state.queueOpen=false;state.album=a;state.trackIndex=Math.max(0,a.tracks.findIndex(t=>t.url));$$('[data-album]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.album===id)));renderSelection();syncPlayback();centerAlbum(id);gardenLife.introduceAlbum(a);}
function selectTrack(index,{play=false}={}){const t=state.album?.tracks[index];if(!t?.url)return;resetAudio();state.trackIndex=index;syncPlayback();if(play)playTrack();}
async function playTrack(){
  const track=currentTrack();if(!track?.url)return;
  requestPlaybackSession();
  const token=++state.token;state.wanted=true;state.loading=true;state.error='';
  if(audio.getAttribute('src')!==track.url){audio.src=track.url;audio.load();}
  syncPlayback();
  try{await audio.play();if(token!==state.token){if(!state.wanted)audio.pause();return;}state.loading=false;syncPlayback();}
  catch(error){if(token!==state.token)return;state.wanted=false;state.loading=false;state.playing=false;state.error=error.name==='NotAllowedError'?'Trình duyệt chưa cho phát âm thanh. Bấm Play để thử lại.':'Bài này chưa tải được. Bạn thử lại hoặc chọn bài khác nhé.';syncPlayback();}
}
function pauseTrack(){state.token++;state.wanted=false;state.loading=false;audio.pause();state.playing=false;syncPlayback();}
function togglePlay(){if(state.wanted||state.playing)pauseTrack();else playTrack();}
function nextTrack(){if(!state.album)return;const wasPlaying=state.wanted||state.playing;const n=state.album.tracks.length;for(let delta=1;delta<=n;delta++){const i=(state.trackIndex+delta)%n;if(state.album.tracks[i].url){selectTrack(i,{play:wasPlaying});return;}}}
function requestPlaybackSession(){
  // A hint on supporting Safari versions; native <audio> remains the fallback.
  try{if(navigator.audioSession)navigator.audioSession.type='playback';}catch{}
}
function seekTo(seconds){
  if(!Number.isFinite(seconds)||!Number.isFinite(audio.duration)||audio.duration<=0)return;
  audio.currentTime=Math.max(0,Math.min(audio.duration,seconds));syncTime();
}
function previousTrack(){
  if(audio.currentTime>3){seekTo(0);return;}
  if(!state.album)return;
  const n=state.album.tracks.length,play=state.wanted||state.playing;
  for(let delta=1;delta<=n;delta++){
    const index=(state.trackIndex-delta+n)%n;
    if(state.album.tracks[index].url){selectTrack(index,{play});return;}
  }
}
function syncMediaSession(){
  if(!navigator.mediaSession)return;
  const t=currentTrack(),a=state.album,key=a?`${a.id}:${state.trackIndex}`:'';
  try{
    if(key!==mediaMetadataKey&&typeof MediaMetadata!=='undefined'){
      navigator.mediaSession.metadata=a&&t?new MediaMetadata({title:t.name,artist:'Li',album:a.name,
        artwork:[{src:new URL(a.cover,document.baseURI).href,sizes:'480x480',type:'image/webp'}]}):null;
      mediaMetadataKey=key;
    }
    navigator.mediaSession.playbackState=state.playing?'playing':a?'paused':'none';
  }catch{}
}
function syncMediaPosition(){
  if(!navigator.mediaSession?.setPositionState)return;
  try{
    if(Number.isFinite(audio.duration)&&audio.duration>0){
      navigator.mediaSession.setPositionState({duration:audio.duration,playbackRate:audio.playbackRate,
        position:Math.max(0,Math.min(audio.currentTime,audio.duration))});
    }else navigator.mediaSession.setPositionState();
  }catch{}
}
function installMediaSession(){
  if(!navigator.mediaSession)return;
  const actions={play:()=>playTrack(),pause:pauseTrack,stop:()=>{pauseTrack();seekTo(0);},
    nexttrack:nextTrack,previoustrack:previousTrack,seekto:e=>seekTo(e.seekTime),
    seekbackward:e=>seekTo(audio.currentTime-(e.seekOffset||10)),
    seekforward:e=>seekTo(audio.currentTime+(e.seekOffset||10))};
  for(const [name,handler] of Object.entries(actions)){
    try{navigator.mediaSession.setActionHandler(name,handler);}catch{/* Browser supports a subset. */}
  }
}
installMediaSession();
function fmt(seconds){if(!Number.isFinite(seconds)||seconds<0)return '0:00';return `${Math.floor(seconds/60)}:${String(Math.floor(seconds%60)).padStart(2,'0')}`;}
function syncTime(){syncMediaPosition();const valid=Number.isFinite(audio.duration)&&audio.duration>0;for(const suffix of ['','-sheet']){const seek=$(`#seek${suffix}`),elapsed=$(`#elapsed${suffix}`),duration=$(`#duration${suffix}`);if(seek){seek.disabled=!valid;seek.value=valid?String(audio.currentTime/audio.duration*1000):'0';seek.setAttribute('aria-valuetext',`${fmt(audio.currentTime)} trên ${valid?fmt(audio.duration):currentTrack()?.duration||'0:00'}`);}if(elapsed)elapsed.textContent=fmt(audio.currentTime);if(duration)duration.textContent=valid?fmt(audio.duration):currentTrack()?.duration||'0:00';}}
function syncPlayback(){
  const t=currentTrack(),a=state.album;setHostPose(state.room==='gallery'?'gallery':state.wanted?'seated':'idle');document.body.dataset.playing=String(state.playing);document.body.dataset.audioState=state.error?'error':state.loading?'loading':state.playing?'playing':a?'paused':'empty';
  $('#mini-player').hidden=!a;
  const disabled=!t?.url;$('#mini-play').disabled=disabled;$('#mini-next').disabled=disabled;
  $('#mini-play').innerHTML=icon(state.wanted?'pause':'play');$('#mini-play').setAttribute('aria-label',disabled?unavailableReason(a):state.wanted?'Tạm dừng nhạc':'Phát nhạc');
  if(a){$('#mini-cover').src=a.cover;$('#mini-cover').hidden=false;$('#mini-title').textContent=t?.name||a.name;$('#mini-subtitle').textContent=a.name;$('#mini-kicker').textContent=state.loading?'ĐANG TẢI BÀI…':state.playing?'ĐANG NGHE':state.error?'CHƯA PHÁT ĐƯỢC':'ĐĨA NHẠC TRÊN MÁY';const record=$('#scene-record');record.hidden=false;$('img',record).src=a.cover;}
  for(const main of $$('#main-play,[data-sheet-play]')){main.disabled=disabled;main.innerHTML=`${icon(state.wanted?'pause':'play')}<span>${state.wanted?'Tạm dừng':'Phát nhạc'}</span>`;main.setAttribute('aria-label',disabled?unavailableReason(a):state.wanted?'Tạm dừng nhạc':'Phát nhạc');}
  for(const b of $$('[data-previous],[data-next]')){b.disabled=disabled;b.title=disabled?unavailableReason(a):'';}
  const status=$('#play-status');if(status)status.textContent=state.loading?'Đang lấy bài từ kho nhạc…':state.playing?`Đang nghe · ${t.name}`:disabled?unavailableReason(a):state.error?'Chưa phát được.':'Nhấn phát khi bạn muốn nghe.';
  const error=$('#audio-error');if(error){error.hidden=!state.error;error.innerHTML=state.error?`${esc(state.error)} <button data-audio-retry>Thử lại</button>`:'';}
  $$('[data-track]').forEach(b=>{const active=Number(b.dataset.track)===state.trackIndex;b.setAttribute('aria-pressed',String(active));$('.track-index',b).textContent=String(Number(b.dataset.track)+1).padStart(2,'0');});
  syncMediaSession();syncTime();syncListening();
}
audio.addEventListener('play',()=>{if(audio.getAttribute('src')===currentTrack()?.url)state.wanted=true;});
audio.addEventListener('playing',()=>{if(!state.wanted){audio.pause();return;}state.playing=true;state.loading=false;state.error='';state.listening=true;syncPlayback();});
audio.addEventListener('pause',()=>{
  if(!audio.paused)return; // Ignore an old queued pause after a newer Play.
  state.playing=false;
  if(!audio.ended){state.wanted=false;state.loading=false;state.token++;}
  syncPlayback();
});
audio.addEventListener('waiting',()=>{if(state.wanted){state.loading=true;state.playing=false;syncPlayback();}});
audio.addEventListener('ended',()=>{state.playing=false;state.wanted=true;nextTrack();});
audio.addEventListener('error',()=>{if(!audio.getAttribute('src'))return;state.token++;state.playing=false;state.wanted=false;state.loading=false;state.error='Bài này chưa tải được. Bạn có thể thử lại hoặc chọn bài khác.';syncPlayback();});
audio.addEventListener('ratechange',syncMediaPosition);audio.addEventListener('timeupdate',syncTime);audio.addEventListener('loadedmetadata',syncTime);
$('#mini-play').addEventListener('click',togglePlay);$('#mini-next').addEventListener('click',nextTrack);

function renderProfile(p){
  content.innerHTML=`<article class="profile-room letter-panel"><p class="letter-salutation">Gửi bạn ghé vườn,</p><div class="profile-lead"><div class="profile-portrait" aria-hidden="true"></div><div><p class="eyebrow">HUỲNH CHÍ LẬP · LI</p><p class="profile-intro">Làm những điều mình thích.<br>Giữ lại những điều mình thương.</p><p class="profile-role">${esc(p.role)}</p><p class="profile-copy">${esc(p.intro)}</p><a class="contact-link" href="mailto:${esc(p.email)}">${icon('mail')} Viết cho Li</a></div></div><details class="resume-fold"><summary>Công việc & những chặng đường <span>+</span></summary><div class="profile-capabilities">${(p.capabilities||[]).map(c=>`<section><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></section>`).join('')}</div><ol class="resume-list">${p.resume.map(r=>`<li><small>${esc(r.period)}</small><h3>${esc(r.role)}</h3><p>${esc(r.company)}</p>${r.detail?`<p class="resume-detail">${esc(r.detail)}</p>`:''}</li>`).join('')}</ol><ul class="profile-background">${(p.background||[]).map(t=>`<li>${esc(t)}</li>`).join('')}</ul></details><p class="letter-signature">Thân thương,<br><em>Li.</em></p></article>`;
}

const photoLikes=new Set();
try{const saved=JSON.parse(localStorage.getItem('anhli_garden_photo_likes')||'[]');if(Array.isArray(saved))saved.filter(x=>typeof x==='string').forEach(x=>photoLikes.add(x));}catch{}
function heartButton(g){return `<button class="pin-heart" data-like="${esc(g.id)}" aria-label="${photoLikes.has(g.id)?'Bỏ tim':'Thả tim'} ảnh ${esc(g.id)}" aria-pressed="${photoLikes.has(g.id)}">${icon('heart')}</button>`;}
function togglePhotoLike(id){
  if(!state.gallery?.some(g=>g.id===id))return;
  photoLikes.has(id)?photoLikes.delete(id):photoLikes.add(id);
  try{localStorage.setItem('anhli_garden_photo_likes',JSON.stringify([...photoLikes]));}catch{}
  $$('[data-like]').filter(e=>e.dataset.like===id).forEach(e=>{e.setAttribute('aria-pressed',String(photoLikes.has(id)));e.setAttribute('aria-label',`${photoLikes.has(id)?'Bỏ tim':'Thả tim'} ảnh ${id}`);});
  syncPhotoHeart();
}
function syncPhotoHeart(){
  const g=state.gallery?.[state.photoIndex];if(!g)return;
  const liked=photoLikes.has(g.id),button=$('#lightbox-heart');button.setAttribute('aria-pressed',String(liked));button.setAttribute('aria-label',liked?'Bỏ tim ảnh này':'Thả tim ảnh này');$('.heart-label',button).textContent=liked?'Đã thả tim':'Thả tim';
}
$('#lightbox-heart').addEventListener('click',()=>{const g=state.gallery?.[state.photoIndex];if(g)togglePhotoLike(g.id);});
function renderGallery(){
  const items=state.gallery.slice(0,state.shown);
  content.innerHTML=`<section class="gallery-room"><div class="media-heading"><div class="media-tabs" role="group" aria-label="Loại nội dung"><button data-media="photos" aria-pressed="${state.media==='photos'}">Ảnh <small>${state.gallery.length}</small></button><button data-media="videos" aria-pressed="${state.media==='videos'}">${icon('play')} Video <small>${state.videos?.length||0}</small></button></div><p>${state.media==='photos'?'Bấm xem lớn. Thả tim điều bạn thích.':'Những thước phim Li đã góp một phần.'}</p></div>${state.media==='photos'?`<div class="gallery-grid">${items.map((g,i)=>`<article class="gallery-pin"><button class="gallery-item" data-photo="${i}" aria-label="Mở ảnh ${i+1}, ${esc(g.tag)}"><img src="${esc(g.thumb)}" alt="${esc(g.title)}" width="${g.width}" height="${g.height}" loading="lazy" decoding="async"></button>${heartButton(g)}<small>${esc(g.tag)}</small></article>`).join('')}</div>${state.shown<state.gallery.length?'<button class="gallery-more" data-more>Xem thêm ảnh</button>':''}<p class="gallery-count">${items.length} / ${state.gallery.length} hình ảnh</p>`:`<div id="video-stage"></div><div class="video-grid">${(state.videos||[]).map((v,i)=>`<button class="video-card" data-video="${i}" aria-label="Xem ${esc(v.title)}"><span class="video-thumb">${v.thumb?`<img src="${esc(v.thumb)}" alt="" loading="lazy">`:`<span class="video-number">${String(i+1).padStart(2,'0')}</span>`}<span class="video-play">${icon('play')}</span><small>${esc(v.provider)}</small></span><strong>${esc(v.title)}</strong><span>${esc(v.meta)}</span></button>`).join('')}</div>`}</section>`;
}
function stopVideo({restoreFocus=false}={}){
  const index=state.videoIndex,stage=$('#video-stage');
  if(stage)stage.replaceChildren();state.videoIndex=null;
  if(restoreFocus&&index!==null)$(`[data-video="${index}"]`)?.focus({preventScroll:true});
}
async function switchMedia(name){
  if(!['photos','videos'].includes(name))return;
  stopVideo();state.media=name;
  const token=++state.mediaToken,viewToken=state.viewToken;
  const isCurrent=()=>token===state.mediaToken&&viewToken===state.viewToken&&state.room==='gallery'&&room.open;
  if(name==='videos'&&!state.videos){
    try{state.videos=await getData('videos');}
    catch(e){if(!isCurrent())return;notice('Chưa lấy được danh sách video. Bạn thử lại nhé.');state.media='photos';}
  }
  if(!isCurrent())return;
  renderGallery();$(`[data-media="${state.media}"]`)?.focus({preventScroll:true});
}
function openVideo(index){
  const v=state.videos?.[index];if(!v)return;pauseTrack();state.videoIndex=index;
  const stage=$('#video-stage');
  stage.innerHTML=`<div class="video-stage-header"><h2>${esc(v.title)}</h2><button class="round-button" data-close-video aria-label="Đóng video">${icon('close')}</button></div><p class="video-source-link"><a href="${esc(v.url)}" target="_blank" rel="noopener noreferrer">Xem trên ${esc(v.provider)} ↗</a></p>${v.embed?`<iframe src="${esc(v.embed)}" title="${esc(v.title)}" allow="fullscreen; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`:'<p>Video này được xem trên trang Facebook gốc.</p>'}<div class="video-caption"><details><summary>Thông tin & vai trò</summary><p>${esc(v.credits||v.meta)}</p></details><a href="${esc(v.url)}" target="_blank" rel="noopener noreferrer">Mở trên ${esc(v.provider)} ↗</a></div><p class="video-help">Trình phát cần kết nối với ${esc(v.provider)}. Nếu chưa hiện, bạn có thể mở video tại nguồn.</p>`;
  $('[data-close-video]',stage)?.focus({preventScroll:true});
  stage.scrollIntoView({behavior:state.still?'instant':'smooth',block:'start'});
}
function openPhoto(index){if(!state.gallery?.[index])return;state.photoIndex=index;const g=state.gallery[index];const image=$('#lightbox-image');image.alt=`${g.title} · Ảnh ${index+1}`;image.src=g.src;$('#lightbox-caption').textContent=g.title;$('#lightbox-detail').textContent=`${g.tag} · ${index+1} / ${state.gallery.length}`;syncPhotoHeart();if(!lightbox.open)lightbox.showModal();}
$('.lightbox-close').addEventListener('click',()=>lightbox.close());
$('.lightbox-prev').addEventListener('click',()=>openPhoto((state.photoIndex-1+state.gallery.length)%state.gallery.length));
$('.lightbox-next').addEventListener('click',()=>openPhoto((state.photoIndex+1)%state.gallery.length));
lightbox.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();$('.lightbox-prev').click();}if(e.key==='ArrowRight'){e.preventDefault();$('.lightbox-next').click();}});
document.addEventListener('error',e=>{if(e.target.matches?.('.video-thumb img'))e.target.hidden=true;},true);
$('#lightbox-image').addEventListener('error',()=>{$('#lightbox-caption').textContent='Ảnh chưa tải được. Bạn có thể chuyển sang ảnh kế tiếp.';});
content.addEventListener('click',e=>{
  if(e.target.closest('[data-close-queue]')){state.queueOpen=false;syncQueue();$('.queue-more')?.focus({preventScroll:true});return;}
  const category=e.target.closest('[data-category]');if(category){state.category=category.dataset.category;$$('[data-category]').forEach(b=>b.setAttribute('aria-pressed',String(b===category)));filterShelf(state.search);return;}
  const picker=e.target.closest('[data-picker]');if(picker){const pane=$('#album-picker');pane.hidden=!pane.hidden;picker.setAttribute('aria-expanded',String(!pane.hidden));if(!pane.hidden)$('#album-search').focus();return;}
  if(e.target.closest('[data-favorite]')){const id=state.album.id;favoriteAlbums.has(id)?favoriteAlbums.delete(id):favoriteAlbums.add(id);try{localStorage.setItem('garden-favorite-albums',JSON.stringify([...favoriteAlbums]));}catch{}const b=$('[data-favorite]');b.setAttribute('aria-pressed',String(favoriteAlbums.has(id)));b.setAttribute('aria-label',`${favoriteAlbums.has(id)?'Bỏ yêu thích':'Yêu thích'} album`);if(state.category==='favorites')filterShelf(state.search);return;}
  const sheetTab=e.target.closest('[data-sheet-tab]');if(sheetTab){state.sheetTab=sheetTab.dataset.sheetTab;$$('[data-sheet-tab]').forEach(b=>{const selected=b===sheetTab;b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1;});$('#queue-tracks').hidden=state.sheetTab!=='tracks';$('#queue-lyrics').hidden=state.sheetTab!=='lyrics';return;}
  if(e.target.closest('[data-previous]')){previousTrack();return;}
  if(e.target.closest('[data-next]')){nextTrack();return;}
  if(e.target.closest('[data-browse]')){state.listening=!state.listening;syncListening();if(!state.listening)$('.shelf-block').scrollIntoView({block:'nearest',behavior:state.still?'instant':'smooth'});return;}
  const queue=e.target.closest('[data-queue]');if(queue){state.queueOpen=!state.queueOpen;syncQueue();if(state.queueOpen)syncQueue({focus:true});return;}
  const like=e.target.closest('[data-like]');if(like){togglePhotoLike(like.dataset.like);return;}
  const layout=e.target.closest('button[data-player-layout]');if(layout){state.playerLayout=layout.dataset.playerLayout;room.dataset.playerLayout=state.playerLayout;$$('button[data-player-layout]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.playerLayout===state.playerLayout)));return;}
  const album=e.target.closest('[data-album]');if(album){selectAlbum(album.dataset.album,$('img',album));return;}
  const track=e.target.closest('[data-track]');if(track){selectTrack(Number(track.dataset.track),{play:true});syncQueue();return;}
  const shelf=e.target.closest('[data-shelf]');if(shelf){const list=$$('[data-album]:not([hidden])'),focused=list.findIndex(b=>b.dataset.focus==='true');const next=list[Math.max(0,Math.min(list.length-1,focused+Number(shelf.dataset.shelf)))];if(next)centerAlbum(next.dataset.album);return;}
  const media=e.target.closest('[data-media]');if(media){switchMedia(media.dataset.media);return;}
  const video=e.target.closest('[data-video]');if(video){openVideo(Number(video.dataset.video));return;}
  if(e.target.closest('[data-close-video]')){stopVideo({restoreFocus:true});return;}
  const photo=e.target.closest('[data-photo]');if(photo){openPhoto(Number(photo.dataset.photo));return;}
  if(e.target.closest('[data-more]')){const y=content.scrollTop,firstNew=state.shown;state.shown+=24;renderGallery();content.scrollTop=y;$(`[data-photo="${firstNew}"]`)?.focus({preventScroll:true});return;}
  const retry=e.target.closest('[data-retry]');if(retry){openRoom(retry.dataset.retry,{historyChange:false});return;}
  if(e.target.closest('#main-play,[data-sheet-play]')||e.target.closest('[data-audio-retry]')){togglePlay();return;}
  if(e.target.closest('#mute')){audio.muted=!audio.muted;$('#mute').innerHTML=icon(audio.muted?'muted':'volume');$('#mute').setAttribute('aria-label',audio.muted?'Bật âm thanh':'Tắt âm thanh');}
});
content.addEventListener('keydown',e=>{
  if(e.target.closest('[data-queue]')&&e.key==='ArrowDown'){e.preventDefault();state.queueOpen=true;syncQueue();$('[data-track][aria-pressed=true]:not(:disabled)')?.focus({preventScroll:true});return;}
  const button=e.target.closest('[data-track]');if(!button||!['ArrowUp','ArrowDown','Home','End'].includes(e.key))return;
  const buttons=$$('[data-track]:not(:disabled)'),index=buttons.indexOf(button);
  const next=e.key==='Home'?0:e.key==='End'?buttons.length-1:Math.max(0,Math.min(buttons.length-1,index+(e.key==='ArrowDown'?1:-1)));
  e.preventDefault();buttons[next]?.focus({preventScroll:true});buttons[next]?.scrollIntoView({block:'nearest',inline:'nearest',behavior:state.still?'instant':'smooth'});
});

content.addEventListener('input',e=>{if(e.target.id==='volume'){audio.volume=Number(e.target.value);audio.muted=false;}if(e.target.id==='album-search'){state.search=e.target.value;filterShelf(state.search);}if(e.target.matches('[data-seek]')&&Number.isFinite(audio.duration)){audio.currentTime=Number(e.target.value)/1000*audio.duration;syncTime();}});

content.addEventListener('change',e=>{if(e.target.id==='album-jump'&&e.target.value){state.category='all';state.search='';$$('[data-category]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.category==='all')));$('#album-search').value='';filterShelf('');selectAlbum(e.target.value);$('#album-picker').hidden=true;$('[data-picker]').setAttribute('aria-expanded','false');$(`[data-album="${CSS.escape(e.target.value)}"]`)?.focus({preventScroll:true});}});
content.addEventListener('keydown',e=>{if(e.target.matches('[data-sheet-tab]')&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();const next=e.target.dataset.sheetTab==='tracks'?'lyrics':'tracks';const tab=$(`[data-sheet-tab="${next}"]`);tab.click();tab.focus();}});
let sheetDrag=null;content.addEventListener('pointerdown',e=>{if(e.target.closest('[data-sheet-handle]')){sheetDrag=e.clientY;e.target.setPointerCapture(e.pointerId);}});content.addEventListener('pointerup',e=>{if(sheetDrag!==null&&e.clientY-sheetDrag>65){state.queueOpen=false;syncQueue();$('.queue-more')?.focus({preventScroll:true});}sheetDrag=null;});
const viewport=window.visualViewport;function fitViewport(){
 const height=viewport?.height||innerHeight,top=viewport?.offsetTop||0;
 document.documentElement.style.setProperty('--visual-height',`${height}px`);
 document.documentElement.style.setProperty('--visual-top',`${top}px`);
 if(state.room==='music')syncQueue();
}
viewport?.addEventListener('resize',fitViewport);viewport?.addEventListener('scroll',fitViewport);window.addEventListener('resize',fitViewport);fitViewport();
// The small note is the story gateway too; it keeps the same paper material.
$('#host-talk').addEventListener('dblclick',()=>openRoom('profile'));
// Scene-native coordinates: scale artwork, character and record in one space.
const narrow=matchMedia('(max-aspect-ratio:4/3)');
const poseReady=new Set(['idle']),poseImages=new Map();
function applyHostPose(pose){
  const host=$('#host');if(host.dataset.pose===pose)return;host.dataset.pose=pose;
  host.classList.remove('pose-arrive');void host.offsetWidth;host.classList.add('pose-arrive');placeWorld();
}
function setHostPose(pose){
  state.hostPose=pose;
  if(pose!=='idle'&&!poseImages.has(pose)){
    const picture=new Image();poseImages.set(pose,picture);
    picture.onload=()=>{poseReady.add(pose);if(state.hostPose===pose)applyHostPose(pose);};
    picture.onerror=()=>{};picture.src=`./assets/host-${pose}.webp`;
  }
  applyHostPose(poseReady.has(pose)?pose:'idle');
}
function placeWorld(){
  const world=$('.scene-world'),r={width:world.clientWidth,height:world.clientHeight,left:world.offsetLeft,top:world.offsetTop},mobile=narrow.matches;
  const iw=mobile?1086:1672,ih=mobile?1448:941,scale=Math.max(r.width/iw,r.height/ih),ox=(r.width-iw*scale)/2,oy=(r.height-ih*scale)/2;
  const zones=sceneGateways[mobile?'portrait':'landscape'];
  ['.place-profile','.place-music','.place-gallery'].forEach((selector,i)=>{const e=$(selector),[x,y,w,h]=zones[i];Object.assign(e.style,{left:`${ox+x*scale}px`,top:`${oy+y*scale}px`,width:`${w*scale}px`,height:`${h*scale}px`});});
  // Paint the same soft warmth around the stall and host in artwork coordinates.
  const atmosphere=$('.hero-atmosphere');
  const light=mobile?[260,300,650,870]:[615,140,730,640];
  const [lx,ly,lw,lh]=light;
  Object.assign(atmosphere.style,{left:`${ox+lx*scale}px`,top:`${oy+ly*scale}px`,width:`${lw*scale}px`,height:`${lh*scale}px`});
  const disc=$('#scene-record'),cx=mobile?599:1005,cy=mobile?558:363;
  Object.assign(disc.style,{left:`${ox+cx*scale}px`,top:`${oy+cy*scale}px`,width:`${(mobile?108:70)*scale}px`});
  disc.style.setProperty('--disc-tilt',mobile?'.43':'.24');
  const pond=$('.pond-glint'),water=mobile?[938,364,125,90]:[1368,105,150,44];
  const [wx,wy,ww,wh]=water;Object.assign(pond.style,{left:`${ox+wx*scale}px`,top:`${oy+wy*scale}px`,width:`${ww*scale}px`,height:`${wh*scale}px`,backgroundSize:`${iw*scale}px ${ih*scale}px`,backgroundPosition:`${-wx*scale}px ${-wy*scale}px`});
  pond.style.setProperty('--pond-day',`url('./assets/garden-${mobile?'mobile':'desktop'}.webp')`);pond.style.setProperty('--pond-night',`url('./assets/garden-${mobile?'mobile':'desktop'}-night.webp')`);
  const pose=$('#host').dataset.pose||'idle';const placements=mobile?{idle:[.33,.545,465],seated:[.69,.62,260],gallery:[.80,.58,270]}:{idle:[.18,.65,282],seated:[.70,.67,220],gallery:[.75,.70,253]};
  if(state.room==='music'){const portraitY=r.width>1000?.395:.34;placements.idle=mobile?[.22,portraitY,240]:[.18,.65,282];placements.seated=mobile?[.22,portraitY,180]:[.18,.65,235];}
  const [x,y,h]=placements[pose]||placements.idle;const host=$('#host');
  Object.assign(host.style,{left:`${ox+x*iw*scale}px`,top:`${oy+y*ih*scale}px`,height:`${h*scale}px`,width:`${h*scale*(pose==='idle'?.3415:pose==='seated'?.65682:.53409)}px`});
  const talk=$('#host-talk'),hw=h*scale*(pose==='idle'?.3415:pose==='seated'?.65682:.53409),hx=ox+x*iw*scale,hy=oy+y*ih*scale-h*scale;
  const tw=r.width<701?Math.min(220,r.width*.56):280,spaceRight=r.width-(hx+hw/2+12),side=spaceRight>=tw?'right':'left';
  talk.dataset.side=side;
  const talkLeft=r.left+Math.max(8,Math.min(r.width-tw-8,side==='right'?hx+hw/2+12:hx-hw/2-tw-12));
  talk.style.width=`${tw}px`;
  const tools=$('.garden-tools').getBoundingClientRect(),mini=$('#mini-player').getBoundingClientRect();
  document.documentElement.style.setProperty('--mini-player-height',`${mini.height}px`);
  const logo=$('.wordmark').getBoundingClientRect();
  const minTop=Math.max(logo.bottom+10,$('.garden-settings').open&&talkLeft<tools.right&&talkLeft+tw>tools.left?tools.bottom+9:10);
  const bottom=Math.min(innerHeight-12,mini.top>0?mini.top-12:innerHeight-100);
  talk.style.setProperty('--talk-width',`${tw}px`);talk.style.setProperty('--talk-left',`${talkLeft}px`);
  // The artwork is flipped vertically so its tail can follow Li's face below the header.
  const talkTop=Math.max(minTop,Math.min(r.top+hy+h*scale*.20-talk.offsetHeight*.22,bottom-talk.offsetHeight));
  talk.style.setProperty('--talk-top',`${talkTop}px`);Object.assign(talk.style,{left:`${talkLeft}px`,top:`${talkTop}px`});
  Object.assign($('.music-notes').style,{left:`${hx+hw*.30}px`,top:`${hy+h*scale*.2}px`});
  const lampPoints=mobile?[[133,495],[711,501]]:[[287,178],[1117,344]];
  ['.lantern-house','.lantern-stall'].forEach((sel,i)=>{const [a,b]=lampPoints[i];Object.assign($(sel).style,{left:`${ox+a*scale}px`,top:`${oy+b*scale}px`,width:`${150*scale}px`,height:`${180*scale}px`});});
  const sprigs=mobile?[[340,950,110,130],[800,865,100,125],[180,1260,100,160]]:[[500,498,105,140],[1260,550,100,140],[690,475,90,115]];
  ['.sprig-house','.sprig-stall','.sprig-path'].forEach((sel,i)=>{const [sx,sy,sw,sh]=sprigs[i];Object.assign($(sel).style,{left:`${ox+(sx-sw/2)*scale}px`,top:`${oy+(sy-sh)*scale}px`,width:`${sw*scale}px`,height:`${sh*scale}px`,zIndex:sy>y*ih?'3':'1'});});


}
new ResizeObserver(placeWorld).observe($('.scene-world'));
new ResizeObserver(placeWorld).observe($('#host-talk'));new ResizeObserver(placeWorld).observe($('#mini-player'));narrow.addEventListener('change',placeWorld);$('.garden-settings').addEventListener('toggle',placeWorld);placeWorld();syncPlayback();
// Hash destinations open only after the explicit entrance gesture.

const gardenLife=initGardenLife({audio,notice});
lyricController=initLyrics({audio,getTrack:currentTrack,getRoom:()=>state.room,getPlaying:()=>state.playing,onMoment:moment=>gardenLife.setHostMoment(moment)});
initGardenWind();
initEntrance({prepare:async retry=>{
  const portrait=narrow.matches,phase=document.body.dataset.dayPhase;
  const scene=phase==='night'?$('.night-scene img'):$('#scenery img');
  if(retry&&scene.complete&&!scene.naturalWidth){const picture=scene.closest('picture');const asset=`./assets/garden-${portrait?'mobile':'desktop'}${phase==='night'?'-night':''}.webp?retry=${Date.now()}`;picture.querySelector('source')?.setAttribute('srcset',asset);scene.src=asset;}
  const host=new Image();host.src='./assets/host-idle-v2.webp';
  [state.catalog]=await Promise.all([getData('catalog').then(v=>{document.querySelector('#entrance').dataset.catalogReady='true';return v;}),waitForImage(scene).then(()=>{document.querySelector('#entrance').dataset.sceneReady='true';}),waitForImage(host).then(()=>{document.querySelector('#entrance').dataset.hostReady='true';})]);
},onEnter:()=>{
  state.entered=true;placeWorld();
  if(titles[location.hash.slice(1)])openRoom(location.hash.slice(1),{historyChange:false});
}});
