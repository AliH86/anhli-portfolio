import {loadingMarkup,watchScenery,sendLoadingGust} from './garden-loading.js?v=1';
import { initGardenLife } from './garden-life.js?v=final1';
const $ = (s,root=document) => root.querySelector(s);
const $$ = (s,root=document) => [...root.querySelectorAll(s)];
const paths={heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',music:'<path d="M9 18V5l11-2v13M9 8l11-2"/><ellipse cx="6" cy="18" rx="3" ry="2.5"/><ellipse cx="17" cy="16" rx="3" ry="2.5"/>',user:'<circle cx="12" cy="8" r="3.5"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/>',image:'<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.4"/><path d="m3 17 5-5 4 4 4-6 5 7"/>',play:'<path data-fill="1" d="m8 5 11 7-11 7z"/>',pause:'<path d="M8 5v14M16 5v14" stroke-width="3"/>',next:'<path d="m5 5 10 7-10 7zM19 5v14"/>',previous:'<path d="m19 5-10 7 10 7zM5 5v14"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',left:'<path d="m15 5-7 7 7 7"/>',right:'<path d="m9 5 7 7-7 7"/>',volume:'<path d="M3 9h4l5-4v14l-5-4H3zM16 8a6 6 0 0 1 0 8M19 5a10 10 0 0 1 0 14"/>',muted:'<path d="M3 9h4l5-4v14l-5-4H3zM16 9l5 6M21 9l-5 6"/>',sparkle:'<path d="m12 3 2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6z"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>'};
const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name]||paths.music}</svg>`;
const esc = v => String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function fillIcons(root=document){$$('[data-icon]',root).forEach(e=>e.innerHTML=icon(e.dataset.icon));}
fillIcons();
const room=$('#room-dialog'),content=$('#room-content'),lightbox=$('#lightbox'),audio=$('#audio');
const motion=matchMedia('(prefers-reduced-motion: reduce)');
const state={room:'',catalog:null,album:null,trackIndex:0,wanted:false,playing:false,loading:false,error:'',token:0,viewToken:0,gallery:null,shown:24,photoIndex:0,media:'photos',videos:null,mediaToken:0,videoIndex:null,playerLayout:'cover',hostPose:'idle',still:motion.matches,lastFocus:null};
const loads={};
async function getData(name){
  if(!loads[name])loads[name]=fetch(`./data/${name}.json`).then(r=>{if(!r.ok)throw Error('Không tải được dữ liệu.');return r.json();}).catch(e=>{delete loads[name];throw e;});
  return loads[name];
}
let noticeTimer,flight,flightEl,mediaMetadataKey='';
function notice(message){const n=$('#notice');n.textContent=message;n.classList.add('is-visible');clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>n.classList.remove('is-visible'),3200);}
function setMotion(){if(state.still)cancelFlight();document.body.dataset.still=String(state.still);$('#motion-toggle').setAttribute('aria-pressed',String(state.still));$('#motion-toggle').setAttribute('aria-label',state.still?'Bật chuyển động':'Tắt chuyển động');$('#motion-toggle').title=state.still?'Bật chuyển động':'Tắt chuyển động';}
setMotion();motion.addEventListener('change',()=>{state.still=motion.matches;setMotion();});
$('#motion-toggle').addEventListener('click',()=>{state.still=!state.still;setMotion();notice(state.still?'Đã tắt chuyển động. Nhạc vẫn nghe bình thường.':'Đã bật chuyển động nhẹ.');});
// Visibility only quiets decoration. Never pause/recreate audio on app or tab switches.
document.addEventListener('visibilitychange',()=>{document.body.dataset.pageHidden=String(document.hidden);});
window.addEventListener('pageshow',()=>{state.playing=!audio.paused;state.wanted=!audio.paused;syncPlayback();});
// This hides a browser download affordance only; it is not access control or DRM.
audio.addEventListener('contextmenu',e=>e.preventDefault());
$('#scenery img').addEventListener('error',()=>{document.body.classList.add('scene-failed');notice('Cảnh vườn chưa tải được. Bạn vẫn có thể nghe nhạc và xem ảnh.');});

const welcomeLoading=$('#welcome-loading');welcomeLoading.innerHTML=loadingMarkup('Khu vườn đang thức giấc…');watchScenery($('#scenery img'),welcomeLoading);
document.addEventListener('click',e=>{const button=e.target.closest('[data-loading-gust]');if(button)sendLoadingGust(button,state.still);});

const titles={music:['CÁI SẠP NHẠC','Chọn một album nhạc.'],profile:['NGƯỜI TRÔNG VƯỜN','Chuyện của Li.'],gallery:['HÌNH ẢNH & NHỮNG THƯỚC PHIM','Những điều để dành.']};
async function openRoom(name,{historyChange=true}={}){
  if(!titles[name])return;
  if(!room.open){state.lastFocus=document.activeElement;room.showModal();}
  const token=++state.viewToken;state.room=name;document.body.dataset.room=name;room.dataset.room=name;setHostPose(name==='gallery'?'gallery':state.wanted?'seated':'idle');
  $('#room-kicker').textContent=titles[name][0];$('#room-title').textContent=titles[name][1];
  $$('.top-nav button').forEach(b=>b.classList.toggle('is-active',b.dataset.open===name));
  if(historyChange&&location.hash!==`#${name}`)history.pushState({gardenRoom:true},'',`${location.pathname}${location.search}#${name}`);
  content.innerHTML=loadingMarkup();
  try{
    if(name==='music'){state.catalog=await getData('catalog');if(token!==state.viewToken)return;renderMusic();}
    else if(name==='profile'){const profile=await getData('profile');if(token!==state.viewToken)return;renderProfile(profile);}
    else {[state.gallery,state.videos]=await Promise.all([getData('gallery'),getData('videos').catch(()=>[])]);if(token!==state.viewToken)return;renderGallery();}
    content.scrollTop=0;
  }catch(e){if(token===state.viewToken)content.innerHTML=`<div class="empty-state" role="status">Chưa mở được góc này. Bạn thử lại nhé.<button class="retry" data-retry="${name}">Thử lại</button></div>`;}
}
function cleanupRoom(){stopVideo();state.room='';state.viewToken++;state.mediaToken++;setHostPose(state.wanted?'seated':'idle');document.body.dataset.room='';$$('.top-nav button').forEach(b=>b.classList.remove('is-active'));cancelFlight();state.lastFocus?.focus?.();}
function closeRoom(){if(lightbox.open){lightbox.close();return;}if(room.open)room.close();if(history.state?.gardenRoom)history.back();else history.replaceState(null,'',location.pathname+location.search);}
room.addEventListener('close',cleanupRoom);
room.addEventListener('cancel',e=>{e.preventDefault();closeRoom();});
room.addEventListener('click',e=>{if(e.target===room){const r=room.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeRoom();}});
$('.close-room').addEventListener('click',closeRoom);
window.addEventListener('popstate',()=>{if(lightbox.open)lightbox.close();const name=location.hash.slice(1);if(titles[name])openRoom(name,{historyChange:false});else if(room.open)room.close();});
document.addEventListener('click',e=>{const b=e.target.closest('[data-open]');if(b)openRoom(b.dataset.open);});
$('.wordmark').addEventListener('click',e=>{e.preventDefault();if(room.open)closeRoom();});

function renderMusic(){
  room.dataset.playerLayout=state.playerLayout;
  content.innerHTML=`<section class="music-room"><div id="album-selection"></div><div class="shelf-block"><div class="shelf-heading"><h2>Album nhạc trên sạp <small>· ${state.catalog.length}</small></h2><div class="player-views" role="group" aria-label="Cách xem album"><button data-player-layout="cover" aria-pressed="${state.playerLayout==='cover'}">Bìa lớn</button><button data-player-layout="compact" aria-pressed="${state.playerLayout==='compact'}">Gọn</button></div><div class="shelf-arrows"><button class="round-button" data-shelf="-1" aria-label="Xem các album trước">${icon('left')}</button><button class="round-button" data-shelf="1" aria-label="Xem thêm album">${icon('right')}</button></div></div><div class="album-shelf" aria-label="Chọn album">${state.catalog.map((a,i)=>`<button class="album-choice" data-album="${esc(a.id)}" aria-pressed="${a.id===state.album?.id}" aria-label="Chọn album ${esc(a.name)}"><img src="${esc(a.cover)}" alt="" loading="${i<7?'eager':'lazy'}" decoding="async" width="108" height="108"><span>${esc(a.name)}</span></button>`).join('')}</div></div></section>`;
  renderSelection();
}
function renderSelection(){
  const target=$('#album-selection');if(!target)return;
  if(!state.album){target.innerHTML=`<div class="selection-empty"><p class="eyebrow">MỘT CHÚT NHẠC CHO HÔM NAY</p><h2>Bạn muốn nghe album nào?</h2><p>Chạm một chiếc bìa trên sạp.<br>Rồi bấm Play, khi bạn muốn nghe.</p></div>`;return;}
  const a=state.album;
  target.innerHTML=`<section class="selected-album" aria-label="Đĩa nhạc trên máy"><div class="album-feature"><img id="loaded-cover" class="loaded-cover" src="${esc(a.cover)}" alt="Bìa ${esc(a.name)}"><div class="album-text"><p class="eyebrow">ĐĨA NHẠC TRÊN MÁY · ${a.tracks.length} BÀI</p><h2>${esc(a.name)}</h2><p>${esc(a.sub)}</p></div><aside class="album-greeting"><span class="album-li" aria-hidden="true"></span><p class="album-li-words">${esc(a.description)}</p></aside></div><div class="album-controls"><div class="playback"><div class="playback-row"><button class="primary-play" id="main-play">${icon('play')}<span>Play</span></button><span class="play-status" id="play-status" role="status"></span><button class="round-button volume-button" id="mute" aria-label="${audio.muted?'Bật âm thanh':'Tắt âm thanh'}">${icon(audio.muted?'muted':'volume')}</button></div><div class="progress-row"><span id="elapsed">0:00</span><input class="seek" id="seek" type="range" min="0" max="1000" value="0" step="1" aria-label="Vị trí bài hát" disabled><span id="duration">${esc(currentTrack()?.duration||'0:00')}</span></div><div class="audio-error" id="audio-error" hidden></div></div><ol class="track-list">${a.tracks.map((t,i)=>`<li><button class="track-button" data-track="${i}" aria-label="Chọn bài ${esc(t.name)}${t.url?'':', chưa có đường dẫn phát'}" aria-pressed="${i===state.trackIndex}" ${t.url?'':'disabled'}><span class="track-index">${String(i+1).padStart(2,'0')}</span><span class="track-name">${esc(t.name)}</span><span class="track-duration">${t.url?esc(t.duration):'Chưa có link'}</span></button></li>`).join('')}</ol><details class="album-story"><summary>Về album nhạc</summary><p class="album-description">${esc(a.description)}</p></details></div></section>`;
  syncPlayback();
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
function selectAlbum(id,source){const a=state.catalog?.find(a=>a.id===id);if(!a)return;if(state.album?.id===id){gardenLife.introduceAlbum(a);return;}resetAudio();state.album=a;state.trackIndex=Math.max(0,a.tracks.findIndex(t=>t.url));$$('[data-album]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.album===id)));renderSelection();syncPlayback();animateCover(source);gardenLife.introduceAlbum(a);}
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
function syncTime(){syncMediaPosition();const seek=$('#seek'),elapsed=$('#elapsed'),duration=$('#duration');const valid=Number.isFinite(audio.duration)&&audio.duration>0;if(seek){seek.disabled=!valid;seek.value=valid?String(audio.currentTime/audio.duration*1000):'0';seek.setAttribute('aria-valuetext',`${fmt(audio.currentTime)} trên ${valid?fmt(audio.duration):currentTrack()?.duration||'0:00'}`);}if(elapsed)elapsed.textContent=fmt(audio.currentTime);if(duration)duration.textContent=valid?fmt(audio.duration):currentTrack()?.duration||'0:00';}
function syncPlayback(){
  const t=currentTrack(),a=state.album;setHostPose(state.room==='gallery'?'gallery':state.wanted?'seated':'idle');document.body.dataset.playing=String(state.playing);document.body.dataset.audioState=state.error?'error':state.loading?'loading':state.playing?'playing':a?'paused':'empty';
  const disabled=!t?.url;$('#mini-play').disabled=disabled;$('#mini-next').disabled=disabled;
  $('#mini-play').innerHTML=icon(state.wanted?'pause':'play');$('#mini-play').setAttribute('aria-label',state.wanted?'Tạm dừng nhạc':'Phát nhạc');
  if(a){$('#mini-cover').src=a.cover;$('#mini-cover').hidden=false;$('#mini-title').textContent=t?.name||a.name;$('#mini-subtitle').textContent=a.name;$('#mini-kicker').textContent=state.loading?'ĐANG TẢI BÀI…':state.playing?'ĐANG NGHE':state.error?'CHƯA PHÁT ĐƯỢC':'ĐĨA NHẠC TRÊN MÁY';const record=$('#scene-record');record.hidden=false;$('img',record).src=a.cover;}
  const main=$('#main-play');if(main){main.disabled=disabled;main.innerHTML=`${icon(state.wanted?'pause':'play')}<span>${state.wanted?'Pause':'Play'}</span>`;main.setAttribute('aria-label',state.wanted?'Tạm dừng nhạc':'Phát nhạc');}
  const status=$('#play-status');if(status)status.textContent=state.loading?'Đang lấy bài từ kho nhạc…':state.playing?`Đang nghe · ${t.name}`:disabled?'Bài này chưa có đường dẫn phát.':state.error?'Chưa phát được.':'Bấm Play khi bạn muốn nghe.';
  const error=$('#audio-error');if(error){error.hidden=!state.error;error.innerHTML=state.error?`${esc(state.error)} <button data-audio-retry>Thử lại</button>`:'';}
  $$('[data-track]').forEach(b=>{const active=Number(b.dataset.track)===state.trackIndex;b.setAttribute('aria-pressed',String(active));$('.track-index',b).innerHTML=active&&state.playing?'<span class="listening-line" aria-hidden="true"><i></i><i></i><i></i></span>':String(Number(b.dataset.track)+1).padStart(2,'0');});
  syncMediaSession();syncTime();
}
audio.addEventListener('play',()=>{if(audio.getAttribute('src')===currentTrack()?.url)state.wanted=true;});
audio.addEventListener('playing',()=>{if(!state.wanted){audio.pause();return;}state.playing=true;state.loading=false;state.error='';syncPlayback();});
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
  content.innerHTML=`<article class="profile-room"><div class="profile-lead"><div class="profile-portrait" aria-hidden="true"></div><div><p class="eyebrow">HUỲNH CHÍ LẬP · LI</p><p class="profile-intro">Làm những điều mình thích.<br>Giữ lại những điều mình thương.</p><p class="profile-role">${esc(p.role)}</p><p class="profile-copy">${esc(p.intro)}</p><a class="contact-link" href="mailto:${esc(p.email)}">${icon('mail')} Viết cho Li</a></div></div><details class="resume-fold"><summary>Công việc & những chặng đường <span>+</span></summary><div class="profile-capabilities">${(p.capabilities||[]).map(c=>`<section><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></section>`).join('')}</div><ol class="resume-list">${p.resume.map(r=>`<li><small>${esc(r.period)}</small><h3>${esc(r.role)}</h3><p>${esc(r.company)}</p>${r.detail?`<p class="resume-detail">${esc(r.detail)}</p>`:''}</li>`).join('')}</ol><ul class="profile-background">${(p.background||[]).map(t=>`<li>${esc(t)}</li>`).join('')}</ul></details></article>`;
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
  const like=e.target.closest('[data-like]');if(like){togglePhotoLike(like.dataset.like);return;}
  const layout=e.target.closest('button[data-player-layout]');if(layout){state.playerLayout=layout.dataset.playerLayout;room.dataset.playerLayout=state.playerLayout;$$('button[data-player-layout]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.playerLayout===state.playerLayout)));return;}
  const album=e.target.closest('[data-album]');if(album){selectAlbum(album.dataset.album,$('img',album));return;}
  const track=e.target.closest('[data-track]');if(track){selectTrack(Number(track.dataset.track));return;}
  const shelf=e.target.closest('[data-shelf]');if(shelf){$('.album-shelf').scrollBy({left:Number(shelf.dataset.shelf)*310,behavior:state.still?'instant':'smooth'});return;}
  const media=e.target.closest('[data-media]');if(media){switchMedia(media.dataset.media);return;}
  const video=e.target.closest('[data-video]');if(video){openVideo(Number(video.dataset.video));return;}
  if(e.target.closest('[data-close-video]')){stopVideo({restoreFocus:true});return;}
  const photo=e.target.closest('[data-photo]');if(photo){openPhoto(Number(photo.dataset.photo));return;}
  if(e.target.closest('[data-more]')){const y=content.scrollTop,firstNew=state.shown;state.shown+=24;renderGallery();content.scrollTop=y;$(`[data-photo="${firstNew}"]`)?.focus({preventScroll:true});return;}
  const retry=e.target.closest('[data-retry]');if(retry){openRoom(retry.dataset.retry,{historyChange:false});return;}
  if(e.target.closest('#main-play')||e.target.closest('[data-audio-retry]')){togglePlay();return;}
  if(e.target.closest('#mute')){audio.muted=!audio.muted;$('#mute').innerHTML=icon(audio.muted?'muted':'volume');$('#mute').setAttribute('aria-label',audio.muted?'Bật âm thanh':'Tắt âm thanh');}
});
content.addEventListener('input',e=>{if(e.target.id==='seek'&&Number.isFinite(audio.duration)){audio.currentTime=Number(e.target.value)/1000*audio.duration;syncTime();}});

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
  const world=$('.scene-world'),r=world.getBoundingClientRect(),mobile=narrow.matches;
  const iw=mobile?1086:1672,ih=mobile?1448:941,scale=Math.max(r.width/iw,r.height/ih),ox=(r.width-iw*scale)/2,oy=(r.height-ih*scale)/2;
  const zones=mobile?[[25,50,355,540],[386,365,397,475],[850,530,195,395]]:[[12,40,430,500],[740,110,500,430],[1340,300,215,330]];
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
  const pose=$('#host').dataset.pose||'idle';const placements=mobile?{idle:[.33,.545,465],seated:[.69,.62,260],gallery:[.80,.58,270]}:{idle:[.245,.65,282],seated:[.70,.67,220],gallery:[.75,.70,253]};
  const [x,y,h]=placements[pose]||placements.idle;const host=$('#host');
  Object.assign(host.style,{left:`${ox+x*iw*scale}px`,top:`${oy+y*ih*scale}px`,height:`${h*scale}px`,width:`${h*scale*(pose==='idle'?.3415:pose==='seated'?.65682:.53409)}px`});
  const talk=$('#host-talk'),hw=h*scale*(pose==='idle'?.3415:pose==='seated'?.65682:.53409),hx=ox+x*iw*scale,hy=oy+y*ih*scale-h*scale;
  const tw=r.width<701?174:226,spaceRight=r.width-(hx+hw/2+12),side=spaceRight>=tw?'right':'left';
  talk.dataset.side=side;
  Object.assign(talk.style,{width:`${tw}px`,left:`${Math.max(8,Math.min(r.width-tw-8,side==='right'?hx+hw/2+12:hx-hw/2-tw-12))}px`,top:`${Math.max(10,hy+12)}px`});
  Object.assign($('.music-notes').style,{left:`${hx+hw*.30}px`,top:`${hy+h*scale*.2}px`});
  const lampPoints=mobile?[[133,495],[711,501]]:[[287,178],[1117,344]];
  ['.lantern-house','.lantern-stall'].forEach((sel,i)=>{const [a,b]=lampPoints[i];Object.assign($(sel).style,{left:`${ox+a*scale}px`,top:`${oy+b*scale}px`,width:`${150*scale}px`,height:`${180*scale}px`});});
  const sprigs=mobile?[[340,950,110,130],[800,865,100,125],[180,1260,100,160]]:[[500,498,105,140],[1260,550,100,140],[690,475,90,115]];
  ['.sprig-house','.sprig-stall','.sprig-path'].forEach((sel,i)=>{const [sx,sy,sw,sh]=sprigs[i];Object.assign($(sel).style,{left:`${ox+(sx-sw/2)*scale}px`,top:`${oy+(sy-sh)*scale}px`,width:`${sw*scale}px`,height:`${sh*scale}px`,zIndex:sy>y*ih?'3':'1'});});


}
new ResizeObserver(placeWorld).observe($('.scene-world'));narrow.addEventListener('change',placeWorld);placeWorld();syncPlayback();
if(titles[location.hash.slice(1)])openRoom(location.hash.slice(1),{historyChange:false});

const gardenLife=initGardenLife({audio,notice});
