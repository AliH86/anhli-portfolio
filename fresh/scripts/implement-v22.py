from pathlib import Path
p=Path('fresh/dist/app.js');s=p.read_text();start=s.index('const paths=');end=s.index('function fillIcons',start)
s=s[:start]+s[end:]
s="import {esc,icon,playable,albumBadge,unavailableReason,categories,matchesCategory,albumFrame,transport,bindShelf} from './garden-ui.js';\nimport {initWorld,musicState} from './garden-state.js';\n"+s
s=s.replace("let lyricController=null;","let lyricController=null,shelfCleanup=()=>{};\nconst worldController=initWorld();\nconst favoriteAlbums=new Set();try{JSON.parse(localStorage.getItem('garden-favorite-albums')||'[]').forEach(id=>favoriteAlbums.add(id));}catch{}\nstate.category='all';state.sheetTab='tracks';")
s=s.replace("function cleanupRoom(){stopVideo();","function cleanupRoom(){shelfCleanup();state.queueOpen=false;stopVideo();")
s=s.replace("state.room='';state.viewToken++","state.room='';worldController.update(state);state.viewToken++")
s=s.replace("const token=++state.viewToken;state.room=name;","const token=++state.viewToken;state.room=name;worldController.update(state);")
s=s.replace("  content.innerHTML=loadingMarkup();","  shelfCleanup();content.innerHTML=loadingMarkup();")
start=s.index('function renderMusic(){');end=s.index('function currentTrack(){',start)
s=s[:start]+'''function renderMusic(){
  content.innerHTML=`<section class="music-room" aria-label="Sạp đĩa của Li"><div class="shelf-block music-shelf"><div class="shelf-toolbar"><div class="category-chips" role="group" aria-label="Góc nhạc">${categories.map(([id,label])=>`<button class="garden-button paper-button" data-category="${id}" aria-pressed="${state.category===id}">${label}</button>`).join('')}</div><button class="garden-button paper-button picker-toggle" data-picker aria-expanded="false" aria-controls="album-picker">${icon('search')}<span>Tìm đĩa</span></button></div><div id="album-picker" class="album-picker paper-panel" hidden><label for="album-search">Tìm một chiếc đĩa</label><input id="album-search" type="search" placeholder="Tên album hoặc bài hát…" autocomplete="off" value="${esc(state.search)}"><label class="sr-only" for="album-jump">Đến album</label><select id="album-jump"><option value="">Chọn nhanh · ${state.catalog.length} album</option>${state.catalog.map(a=>`<option value="${esc(a.id)}">${esc(a.name)}</option>`).join('')}</select></div><div class="shelf-display"><button class="round-button shelf-prev" data-shelf="-1" aria-label="Xem các album trước">${icon('left')}</button><div class="album-shelf" aria-label="Chọn album, vuốt ngang hoặc dùng phím mũi tên">${state.catalog.map((a,i)=>albumFrame(a,i,a.id===state.album?.id)).join('')}</div><button class="round-button shelf-next" data-shelf="1" aria-label="Xem thêm album">${icon('right')}</button></div><div class="shelf-foot"><span id="shelf-position">${state.catalog.length} chiếc đĩa</span><span>Chọn một chiếc đĩa, ngồi lại một chút.</span></div><p class="shelf-no-results paper-panel" hidden>Chưa thấy chiếc đĩa này. Thử một tên khác nha.</p></div><div id="album-selection" class="wood-panel music-console"></div><aside id="track-queue" class="playlist-drawer wood-panel" role="region" aria-label="Sổ bài hát" hidden></aside></section>`;
  renderSelection();filterShelf(state.search);
  shelfCleanup=bindShelf(content,{still:()=>state.still,onFocus:(id,index,total)=>{const caption=$('#shelf-position');if(caption)caption.textContent=`${String(index+1).padStart(2,'0')} / ${total} chiếc đĩa`;}});
  if(state.album)centerAlbum(state.album.id,'instant');
}
function centerAlbum(id,behavior=state.still?'instant':'smooth'){
 const button=$(`[data-album="${CSS.escape(id)}"]`);if(button&&!button.hidden)button.scrollIntoView({inline:'center',block:'nearest',behavior});
}
function filterShelf(query){
 const normalize=value=>value.normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').replace(/đ/gi,'d').toLowerCase();const needle=normalize(query.trim());let count=0;
 for(const button of $$('[data-album]')){const album=state.catalog.find(a=>a.id===button.dataset.album);button.hidden=!matchesCategory(album,state.category,favoriteAlbums)||!normalize([album.name,...album.tracks.map(t=>t.name)].join(' ')).includes(needle);if(!button.hidden)count++;}
 const empty=$('.shelf-no-results');if(empty)empty.hidden=Boolean(count);
 const selected=$('[data-album][aria-pressed=true]:not([hidden])')||$('[data-album]:not([hidden])');if(selected)centerAlbum(selected.dataset.album,'instant');
 const caption=$('#shelf-position');if(caption)caption.textContent=`${count} chiếc đĩa`;
}
function renderSelection(){
 const target=$('#album-selection'),queue=$('#track-queue');if(!target||!queue)return;
 if(!state.album){target.innerHTML=`<div class="console-inset paper-panel selection-empty"><p><strong>Mỗi chiếc đĩa, một câu chuyện.</strong><span>Chọn bìa nhạc trên kệ. Li ngồi nghe cùng bạn.</span></p></div>`;room.dataset.musicState='browse';queue.hidden=true;return;}
 const a=state.album,t=currentTrack();
 target.innerHTML=`<section class="console-inset paper-panel" aria-label="Đĩa nhạc trên máy"><div class="console-record"><img class="console-cover" src="${esc(a.cover)}" alt="Bìa ${esc(a.name)}" width="70" height="70"><div class="console-copy"><p class="eyebrow" id="listening-kicker">ĐĨA NHẠC TRÊN MÁY</p><h2 id="now-title">${esc(t?.name||a.name)}</h2><p class="album-byline">${esc(a.name)}</p></div><button class="favorite-album round-button" data-favorite aria-label="${favoriteAlbums.has(a.id)?'Bỏ yêu thích':'Yêu thích'} album" aria-pressed="${favoriteAlbums.has(a.id)}">${icon('heart')}</button></div>${transport()}<div class="console-actions"><button class="garden-button paper-button queue-more" data-queue aria-expanded="${state.queueOpen}" aria-controls="track-queue">${icon('list')}<span>Danh sách</span></button><div class="volume-control"><button class="round-button" id="mute" aria-label="${audio.muted?'Bật âm thanh':'Tắt âm thanh'}">${icon(audio.muted?'muted':'volume')}</button><input id="volume" aria-label="Âm lượng" type="range" min="0" max="1" step="0.05" value="${audio.volume}"></div></div><p id="play-status" class="play-status" role="status"></p><div class="audio-error" id="audio-error" hidden></div></section>`;
 queue.innerHTML=`<div class="ledger-inset paper-panel"><div class="sheet-handle" data-sheet-handle aria-hidden="true"></div><header class="ledger-header"><div><small>SỔ BÀI HÁT</small><h2>${esc(a.name)}</h2><p id="queue-current">${esc(t?.name||'')}</p></div><button class="round-button" data-close-queue aria-label="Đóng danh sách">${icon('close')}</button></header><div class="ledger-tabs" role="tablist" aria-label="Trong sổ nhạc"><button id="tab-tracks" role="tab" data-sheet-tab="tracks" aria-controls="queue-tracks" aria-selected="true">Danh sách <small>${a.tracks.length}</small></button><button id="tab-lyrics" role="tab" data-sheet-tab="lyrics" aria-controls="queue-lyrics" aria-selected="false" tabindex="-1">Lời bài hát</button></div><div id="queue-tracks" class="queue-page" role="tabpanel" aria-labelledby="tab-tracks"><ol id="track-list" class="track-list" aria-label="Bài hát trong album">${a.tracks.map((track,i)=>`<li><button class="track-button" data-track="${i}" aria-label="Nghe ${esc(track.name)}${track.url?'':'. Bài này chưa có file nhạc.'}" aria-pressed="${i===state.trackIndex}" ${track.url?'':'disabled aria-describedby="queue-unavailable"'}><span class="track-index">${String(i+1).padStart(2,'0')}</span><span class="track-name">${esc(track.name)}</span><span class="track-duration">${track.url?esc(track.duration):'Đang cập nhật'}</span></button></li>`).join('')}</ol>${a.tracks.some(t=>!t.url)?'<p id="queue-unavailable" class="unavailable-note">Một vài bài chưa có file nhạc. Li sẽ bổ sung sau nha.</p>':''}</div><div id="queue-lyrics" class="queue-page lyrics-page" role="tabpanel" aria-labelledby="tab-lyrics" hidden><div id="lyrics-field" class="lyrics-field" hidden></div><p class="lyrics-empty">Li chưa để lời bài hát này vào sổ.<br>Mình nghe nhạc trước nha.</p></div><footer class="sheet-transport">${transport({suffix:'-sheet',compact:true})}</footer></div>`;
 syncQueue();syncPlayback();lyricController?.update();
}
function syncQueue({focus=false}={}){
 const queue=$('#track-queue');if(!queue)return;
 queue.hidden=!state.album||!state.queueOpen;room.dataset.queueOpen=String(state.queueOpen);room.dataset.musicState=musicState(state);
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
''' + s[end:]
start=s.index('function selectAlbum(');end=s.index('function selectTrack(',start)
s=s[:start]+'''function selectAlbum(id,source){const a=state.catalog?.find(a=>a.id===id);if(!a)return;if(state.album?.id===id){centerAlbum(id);return;}resetAudio();state.listening=false;state.queueOpen=false;state.album=a;state.trackIndex=Math.max(0,a.tracks.findIndex(t=>t.url));$$('[data-album]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.album===id)));renderSelection();syncPlayback();centerAlbum(id);gardenLife.introduceAlbum(a);}
''' +s[end:]
start=s.index('function syncTime(){');end=s.index('function syncPlayback(){',start)
s=s[:start]+'''function syncTime(){syncMediaPosition();const valid=Number.isFinite(audio.duration)&&audio.duration>0;for(const suffix of ['','-sheet']){const seek=$(`#seek${suffix}`),elapsed=$(`#elapsed${suffix}`),duration=$(`#duration${suffix}`);if(seek){seek.disabled=!valid;seek.value=valid?String(audio.currentTime/audio.duration*1000):'0';seek.setAttribute('aria-valuetext',`${fmt(audio.currentTime)} trên ${valid?fmt(audio.duration):currentTrack()?.duration||'0:00'}`);}if(elapsed)elapsed.textContent=fmt(audio.currentTime);if(duration)duration.textContent=valid?fmt(audio.duration):currentTrack()?.duration||'0:00';}}
''' +s[end:]
s=s.replace("state.wanted?'Tạm dừng nhạc':'Phát nhạc'","disabled?unavailableReason(a):state.wanted?'Tạm dừng nhạc':'Phát nhạc'")
s=s.replace("const main=$('#main-play');if(main){","for(const main of $$('#main-play,[data-sheet-play]')){")
s=s.replace("${state.wanted?'Pause':'Play'}","${state.wanted?'Tạm dừng':'Phát nhạc'}")
s=s.replace("const status=$('#play-status');if(status)status.textContent=", "for(const b of $$('[data-previous],[data-next]')){b.disabled=disabled;b.title=disabled?unavailableReason(a):'';}\n  const status=$('#play-status');if(status)status.textContent=")
s=s.replace("disabled?'Bài này chưa có đường dẫn phát.'","disabled?unavailableReason(a)")
s=s.replace("'Bấm Play khi bạn muốn nghe.'","'Nhấn phát khi bạn muốn nghe.'")
s=s.replace("$('.track-index',b).textContent=","$('.track-index',b).textContent=")
# The note and letter share origin and material; keep the accepted profile facts.
s=s.replace('content.innerHTML=`<article class="profile-room">','content.innerHTML=`<article class="profile-room letter-panel"><p class="letter-salutation">Gửi bạn ghé vườn,</p>')
s=s.replace('</ul></details></article>`;','</ul></details><p class="letter-signature">Thân thương,<br><em>Li.</em></p></article>`;')
# Replace only music event handlers, leaving photo/video control paths intact.
s=s.replace("if(state.queueOpen){$('.music-deck')?.scrollTo({top:0,behavior:state.still?'instant':'smooth'});}","if(state.queueOpen)syncQueue({focus:true});")
s=s.replace("state.queueOpen=false;syncQueue();$('.queue-more')?.focus({preventScroll:true});return;}\n  const shelf", "syncQueue();return;}\n  const shelf")
s=s.replace("$('.album-shelf').scrollBy({left:Number(shelf.dataset.shelf)*310,behavior:state.still?'instant':'smooth'});", "const list=$$('[data-album]:not([hidden])'),focused=list.findIndex(b=>b.dataset.focus==='true');const next=list[Math.max(0,Math.min(list.length-1,focused+Number(shelf.dataset.shelf)))];if(next)centerAlbum(next.dataset.album);")
s=s.replace("if(e.target.closest('#main-play')||e.target.closest('[data-audio-retry]'))", "if(e.target.closest('#main-play,[data-sheet-play]')||e.target.closest('[data-audio-retry]'))")
s=s.replace("document.addEventListener('click',e=>{if(state.room==='music'&&state.queueOpen&&!e.target.closest('[data-queue],[data-track],[data-album],#track-queue')){state.queueOpen=false;syncQueue();}});",'')
s=s.replace("if(e.target.id==='seek'&&Number.isFinite(audio.duration))", "if(e.target.matches('[data-seek]')&&Number.isFinite(audio.duration))")
s=s.replace("if(e.target.id==='album-search')", "if(e.target.id==='volume'){audio.volume=Number(e.target.value);audio.muted=false;}if(e.target.id==='album-search')")
pos=s.index("  if(e.target.closest('[data-previous]'))")
s=s[:pos]+'''  if(e.target.closest('[data-close-queue]')){state.queueOpen=false;syncQueue();$('.queue-more')?.focus({preventScroll:true});return;}
  const category=e.target.closest('[data-category]');if(category){state.category=category.dataset.category;$$('[data-category]').forEach(b=>b.setAttribute('aria-pressed',String(b===category)));filterShelf(state.search);return;}
  const picker=e.target.closest('[data-picker]');if(picker){const pane=$('#album-picker');pane.hidden=!pane.hidden;picker.setAttribute('aria-expanded',String(!pane.hidden));if(!pane.hidden)$('#album-search').focus();return;}
  if(e.target.closest('[data-favorite]')){const id=state.album.id;favoriteAlbums.has(id)?favoriteAlbums.delete(id):favoriteAlbums.add(id);try{localStorage.setItem('garden-favorite-albums',JSON.stringify([...favoriteAlbums]));}catch{}const b=$('[data-favorite]');b.setAttribute('aria-pressed',String(favoriteAlbums.has(id)));b.setAttribute('aria-label',`${favoriteAlbums.has(id)?'Bỏ yêu thích':'Yêu thích'} album`);if(state.category==='favorites')filterShelf(state.search);return;}
  const sheetTab=e.target.closest('[data-sheet-tab]');if(sheetTab){state.sheetTab=sheetTab.dataset.sheetTab;$$('[data-sheet-tab]').forEach(b=>{const selected=b===sheetTab;b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1;});$('#queue-tracks').hidden=state.sheetTab!=='tracks';$('#queue-lyrics').hidden=state.sheetTab!=='lyrics';return;}
''' +s[pos:]
pos=s.index('// Scene-native coordinates:')
s=s[:pos]+'''content.addEventListener('change',e=>{if(e.target.id==='album-jump'&&e.target.value){state.category='all';state.search='';$$('[data-category]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.category==='all')));$('#album-search').value='';filterShelf('');selectAlbum(e.target.value);$('#album-picker').hidden=true;$('[data-picker]').setAttribute('aria-expanded','false');$(`[data-album="${CSS.escape(e.target.value)}"]`)?.focus({preventScroll:true});}});
content.addEventListener('keydown',e=>{if(e.target.matches('[data-sheet-tab]')&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();const next=e.target.dataset.sheetTab==='tracks'?'lyrics':'tracks';const tab=$(`[data-sheet-tab="${next}"]`);tab.click();tab.focus();}});
let sheetDrag=null;content.addEventListener('pointerdown',e=>{if(e.target.closest('[data-sheet-handle]')){sheetDrag=e.clientY;e.target.setPointerCapture(e.pointerId);}});content.addEventListener('pointerup',e=>{if(sheetDrag!==null&&e.clientY-sheetDrag>65){state.queueOpen=false;syncQueue();$('.queue-more')?.focus({preventScroll:true});}sheetDrag=null;});
const viewport=window.visualViewport;function fitViewport(){document.documentElement.style.setProperty('--visual-height',`${viewport?.height||innerHeight}px`);}viewport?.addEventListener('resize',fitViewport);window.addEventListener('resize',fitViewport);fitViewport();
// The small note is the story gateway too; it keeps the same paper material.
$('#host-talk').addEventListener('dblclick',()=>openRoom('profile'));
''' +s[pos:]
# Stable host positions remain on the cottage side, away from the listening controls.
s=s.replace("if(state.room==='music'){placements.idle=mobile?[.74,.62,340]:[.74,.67,250];if(!mobile)placements.seated=[.73,.67,220];}","if(state.room==='music'){placements.idle=mobile?[.25,.45,310]:[.245,.65,282];placements.seated=mobile?[.25,.45,235]:[.245,.65,235];}")
p.write_text(s)
# Mark exact V2.2 stylesheet/version and put scene tools inside a real settings object.
p=Path('fresh/dist/index.html');s=p.read_text().replace('<script type="module" src="./app.js?v=23"></script>','<link rel="stylesheet" href="./garden-v22.css?v=1">\n  <script type="module" src="./app.js?v=22-review"></script>')
s=s.replace('Âm nhạc & những điều để dành.</span><span>HUỲNH CHÍ LẬP','Vườn của Li · v2.2</span><span>Âm nhạc & những điều để dành.')
s=s.replace('<span>Chuyện của Li</span></button>','<span>Chuyện của Li<small>Những câu chuyện nhỏ</small></span></button>').replace('<span>Sạp nhạc</span></button>','<span>Sạp nhạc<small>Âm nhạc chữa lành</small></span></button>').replace('<span>Điều để dành</span></button>','<span>Điều để dành<small>Những khoảnh khắc đẹp</small></span></button>')
s=s.replace('<div class="garden-tools" role="group" aria-label="Không khí trong vườn">','<details class="garden-settings wood-panel"><summary aria-label="Mở tùy chỉnh khu vườn"><span data-icon="settings"></span></summary><div class="garden-tools paper-panel" role="group" aria-label="Không khí trong vườn"><p class="settings-title">Một chút không khí vườn</p><span id="world-time" class="garden-tag">Buổi sáng</span>')
s=s.replace('    </div>\n    <section id="mini-player"','    </div></details>\n    <section id="mini-player"')
s=s.replace('<button id="tarot-draw" hidden>Rút một lá</button></div>','<button id="tarot-draw" hidden>Rút một lá</button><button class="note-story" data-open="profile">Đọc chuyện của Li <span data-icon="right"></span></button></div>')
p.write_text(s)
