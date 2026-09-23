from pathlib import Path
p=Path(__file__).resolve().parents[1]/'dist'
f=p/'index.html';s=f.read_text();s=s.replace('<script type="module" src="./app.js?v=20260917-release2"></script>','<link rel="stylesheet" href="./garden-v21.css?v=21">\n  <script type="module" src="./app.js?v=21"></script>')
s=s.replace('<body>','''<body data-entered="false">
  <section id="entrance" class="entrance" role="dialog" aria-modal="true" aria-labelledby="entrance-title" tabindex="-1" data-state="loading">
    <div class="entrance-air" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
    <div class="entrance-note">
      <span class="entrance-eyebrow">MỘT GÓC NHỎ · MỘT CHÚT NHẠC</span>
      <h1 id="entrance-title">Ghé vườn<br>nhà <em>Li.</em></h1>
      <p id="entrance-quote">Ngoài kia vội quá thì ghé đây một chút.</p>
      <button id="entrance-bell" class="entrance-bell" disabled><span class="bell-object" aria-hidden="true"><svg viewBox="0 0 64 72"><path class="bell-handle" d="M32 5v10M26 7q6-6 12 0"/><path class="bell-body" d="M16 43V31c0-22 32-22 32 0v12l6 8q2 4-4 4H14q-6 0-4-4Z"/><path class="bell-rim" d="M13 52h38"/><path class="bell-clapper" d="M26 57q6 11 12 0"/></svg></span><span id="entrance-action">Vườn đang thức giấc…</span><span class="bell-arrow" aria-hidden="true">↗</span></button>
      <p id="entrance-status" role="status">Li đang mở cửa sổ, kê lại chiếc ghế.</p>
    </div>
    <span class="entrance-signature">ÂM NHẠC & NHỮNG ĐIỀU ĐỂ DÀNH</span>
  </section>''')
s=s.replace('<main id="garden" class="garden">','<main id="garden" class="garden" inert>')
f.write_text(s)
f=p/'app.js';s=f.read_text();s=s.replace("import { initGardenLife } from './garden-life.js?v=final1';", "import { initGardenLife } from './garden-life.js?v=21';\nimport {initEntrance,waitForImage} from './garden-entrance.js';\nimport {initLyrics} from './garden-lyrics.js';\nimport {initGardenWind} from './garden-wind.js';")
s=s.replace("lastFocus:null};", "lastFocus:null,entered:false,listening:false,search:''};\nlet lyricController=null;")
s=s.replace("  if(!titles[name])return;", "  if(!titles[name]||!state.entered)return;")
s=s.replace("const welcomeLoading=$('#welcome-loading');welcomeLoading.innerHTML=loadingMarkup('Khu vườn đang thức giấc…');watchScenery($('#scenery img'),welcomeLoading);", "const welcomeLoading=$('#welcome-loading'); // Entrance owns real critical readiness in V2.1.")
start=s.index('function renderMusic(){');end=s.index('function currentTrack()',start)
s=s[:start]+'''function renderMusic(){
  content.innerHTML=`<section class="music-room"><div id="album-selection"></div><div class="shelf-block"><div class="shelf-heading"><h2>Trên sạp hôm nay <small>· ${state.catalog.length} album</small></h2><label class="album-search"><span class="sr-only">Tìm album hoặc bài hát</span><input id="album-search" type="search" placeholder="Tìm một chiếc đĩa…" autocomplete="off" value="${esc(state.search)}"></label><div class="shelf-arrows"><button class="round-button" data-shelf="-1" aria-label="Xem các album trước">${icon('left')}</button><button class="round-button" data-shelf="1" aria-label="Xem thêm album">${icon('right')}</button></div></div><div class="album-shelf" aria-label="Chọn album">${state.catalog.map((a,i)=>`<button class="album-choice" data-album="${esc(a.id)}" aria-pressed="${a.id===state.album?.id}" aria-label="Chọn album ${esc(a.name)}"><img src="${esc(a.cover)}" alt="" loading="${i<7?'eager':'lazy'}" decoding="async" width="108" height="108"><span>${esc(a.name)}</span></button>`).join('')}</div><p class="shelf-no-results" hidden>Chưa thấy chiếc đĩa này. Thử một tên khác nha.</p></div></section>`;
  renderSelection();filterShelf(state.search);
}
function filterShelf(query){
  const normalize=value=>value.normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').replace(/đ/gi,'d').toLowerCase();
  const needle=normalize(query.trim());let count=0;
  for(const button of $$('[data-album]')){const album=state.catalog.find(a=>a.id===button.dataset.album);button.hidden=!normalize([album.name,...album.tracks.map(t=>t.name)].join(' ')).includes(needle);if(!button.hidden)count++;}
  const empty=$('.shelf-no-results');if(empty)empty.hidden=Boolean(count);
}
function renderSelection(){
  const target=$('#album-selection');if(!target)return;
  if(!state.album){target.innerHTML=`<div class="selection-empty"><span class="empty-record" aria-hidden="true"><i>Li.</i></span><div><p class="eyebrow">MỘT CHÚT NHẠC CHO HÔM NAY</p><h2>Chọn một chiếc đĩa.<br>Ngồi lại một chút.</h2><p>Những bài hát Li giữ ở đây,<br>chờ một người muốn nghe.</p></div></div>`;room.dataset.listening='false';return;}
  const a=state.album;
  target.innerHTML=`<section class="selected-album" aria-label="Đĩa nhạc trên máy"><div class="album-feature"><div class="music-object"><div class="listening-vinyl" aria-hidden="true"><img src="${esc(a.cover)}" alt=""><i></i></div><img id="loaded-cover" class="loaded-cover" src="${esc(a.cover)}" alt="Bìa ${esc(a.name)}"><span class="sleeve-stamp" aria-hidden="true">LI · SIDE A</span></div><div class="album-object-caption"><span>ÂM NHẠC CỦA LI</span><span>${String(state.catalog.indexOf(a)+1).padStart(2,'0')} / ${state.catalog.length}</span></div></div><div class="album-controls"><div class="album-text"><p class="eyebrow" id="listening-kicker">ĐĨA NHẠC TRÊN MÁY</p><h2 id="now-title">${esc(currentTrack()?.name||a.name)}</h2><p class="album-byline">${esc(a.name)} <span>· ${esc(a.sub)}</span></p></div><div id="lyrics-field" class="lyrics-field" aria-label="Lời bài hát đồng bộ" hidden></div><p class="listening-note">${esc(a.description)}</p><div class="transport-dock"><div class="playback"><div class="playback-row"><button class="round-button" data-previous aria-label="Bài trước">${icon('previous')}</button><button class="primary-play" id="main-play">${icon('play')}<span>Play</span></button><button class="round-button" data-next aria-label="Bài tiếp theo">${icon('next')}</button><button class="round-button volume-button" id="mute" aria-label="${audio.muted?'Bật âm thanh':'Tắt âm thanh'}">${icon(audio.muted?'muted':'volume')}</button></div><div class="progress-row"><span id="elapsed">0:00</span><input class="seek" id="seek" type="range" min="0" max="1000" value="0" step="1" aria-label="Vị trí bài hát" disabled><span id="duration">${esc(currentTrack()?.duration||'0:00')}</span></div><span class="play-status" id="play-status" role="status"></span><div class="audio-error" id="audio-error" hidden></div></div><div class="listening-actions"><button data-browse aria-expanded="${!state.listening}">Đổi album</button><button data-queue aria-expanded="false">${a.tracks.length} bài trên đĩa <span aria-hidden="true">↗</span></button></div><div id="track-queue" class="track-queue" hidden><ol class="track-list">${a.tracks.map((t,i)=>`<li><button class="track-button" data-track="${i}" aria-label="Chọn bài ${esc(t.name)}${t.url?'':', chưa có đường dẫn phát'}" aria-pressed="${i===state.trackIndex}" ${t.url?'':'disabled'}><span class="track-index">${String(i+1).padStart(2,'0')}</span><span class="track-name">${esc(t.name)}</span><span class="track-duration">${t.url?esc(t.duration):'Chưa có link'}</span></button></li>`).join('')}</ol></div></div></div></section>`;
  syncPlayback();lyricController?.update();
}
function syncListening(){
  room.dataset.listening=String(state.listening);
  const toggle=$('[data-browse]');if(toggle){toggle.setAttribute('aria-expanded',String(!state.listening));toggle.textContent=state.listening?'Đổi album':'Thu gọn sạp';}
  const title=$('#now-title');if(title)title.textContent=currentTrack()?.name||state.album?.name||'';
  const kicker=$('#listening-kicker');if(kicker)kicker.textContent=state.playing?'ĐANG NGHE CÙNG LI':state.listening?'MỘT KHOẢNG NGHỈ':'ĐĨA NHẠC TRÊN MÁY';
  if(state.room==='music'){$('#room-title').textContent=state.listening?'Ngồi nghe cùng Li.':'Chọn một chiếc đĩa.';$('#room-kicker').textContent=state.listening?'CÁI SẠP NHẠC · ĐANG NGHE':'CÁI SẠP NHẠC';}
  lyricController?.update();
}
''' +s[end:]
s=s.replace('resetAudio();state.album=a;', 'resetAudio();state.listening=false;state.album=a;')
s=s.replace('syncMediaSession();syncTime();\n}', 'syncMediaSession();syncTime();syncListening();\n}')
s=s.replace("state.playing=true;state.loading=false;state.error='';syncPlayback();", "state.playing=true;state.loading=false;state.error='';state.listening=true;syncPlayback();")
s=s.replace("  const like=e.target.closest('[data-like]');", """  if(e.target.closest('[data-previous]')){previousTrack();return;}
  if(e.target.closest('[data-next]')){nextTrack();return;}
  if(e.target.closest('[data-browse]')){state.listening=!state.listening;syncListening();return;}
  const queue=e.target.closest('[data-queue]');if(queue){const list=$('#track-queue');list.hidden=!list.hidden;queue.setAttribute('aria-expanded',String(!list.hidden));return;}
  const like=e.target.closest('[data-like]');""")
s=s.replace("content.addEventListener('input',e=>{if(e.target.id==='seek'", "content.addEventListener('input',e=>{if(e.target.id==='album-search'){state.search=e.target.value;filterShelf(state.search);}if(e.target.id==='seek'")
s=s.replace("if(titles[location.hash.slice(1)])openRoom(location.hash.slice(1),{historyChange:false});", "// Hash destinations open only after the explicit entrance gesture.")
s=s.replace("const gardenLife=initGardenLife({audio,notice});", """const gardenLife=initGardenLife({audio,notice});
lyricController=initLyrics({audio,getTrack:currentTrack,getRoom:()=>state.room,getPlaying:()=>state.playing,onMoment:moment=>gardenLife.setHostMoment(moment)});
initGardenWind();
initEntrance({prepare:async retry=>{
  const portrait=narrow.matches,phase=document.body.dataset.dayPhase;
  const scene=phase==='night'?$('.night-scene img'):$('#scenery img');
  if(retry&&scene.complete&&!scene.naturalWidth){const picture=scene.closest('picture');const asset=`./assets/garden-${portrait?'mobile':'desktop'}${phase==='night'?'-night':''}.webp?retry=${Date.now()}`;picture.querySelector('source')?.setAttribute('srcset',asset);scene.src=asset;}
  const host=new Image();host.src='./assets/host-idle-v2.webp';
  [state.catalog]=await Promise.all([getData('catalog'),waitForImage(scene),waitForImage(host)]);
},onEnter:()=>{
  state.entered=true;
  if(titles[location.hash.slice(1)])openRoom(location.hash.slice(1),{historyChange:false});
}});""")
f.write_text(s)
