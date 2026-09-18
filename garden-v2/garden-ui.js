// Shared V2.2 object primitives. The artwork is reusable; copy stays real HTML.
export const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const icon=name=>`<img class="ui-icon" src="./assets/icons/${name}.svg" alt="" aria-hidden="true" width="24" height="24">`;
export const playable=album=>album?.tracks.some(t=>Boolean(t.url));
export const albumBadge=album=>playable(album)?`${album.tracks.filter(t=>t.url).length} bài`:'Đang cập nhật';
export const unavailableReason=album=>!album?'Chọn một chiếc đĩa để nghe.':!playable(album)?'Album này chưa có file nhạc.':'Bài này chưa có file nhạc.';
export const categories=[['all','Tất cả'],['acoustic','Mộc & Acoustic'],['pop','Pop & Indie'],['folk','Quê hương'],['energy','Nhiều năng lượng'],['favorites','Yêu thích']];
export function matchesCategory(album,category,favorites){
 const sub=album.sub.toLowerCase();
 return category==='all'||category==='favorites'&&favorites.has(album.id)||category==='acoustic'&&/acoustic|unplugged|ballad/.test(sub)||category==='pop'&&/pop|indie|r&b|soul/.test(sub)||category==='folk'&&/folk|heritage|ethnic|world|vietnam|traditional/.test(sub)||category==='energy'&&/rock|rap|drill|edm|hip|funk/.test(sub);
}
export function albumFrame(album,index,selected){return `<button class="album-choice album-frame" data-album="${esc(album.id)}" data-playable="${playable(album)}" aria-pressed="${selected}" aria-label="Chọn album ${esc(album.name)}${playable(album)?'':', đang cập nhật'}"><span class="album-image"><img src="${esc(album.cover)}" alt="" loading="${index<6?'eager':'lazy'}" decoding="async" width="220" height="220"></span><span class="album-label">${esc(album.name)}</span><small class="garden-tag">${albumBadge(album)}</small></button>`;}
export function transport({suffix='',compact=false}={}){return `<div class="playback${compact?' playback-compact':''}"><div class="playback-row"><button class="round-button" data-previous aria-label="Bài trước">${icon('previous')}</button><button class="primary-play" ${suffix?'data-sheet-play':'id="main-play"'} aria-label="Phát nhạc">${icon('play')}<span>Phát nhạc</span></button><button class="round-button" data-next aria-label="Bài tiếp theo">${icon('next')}</button></div><div class="progress-row"><span id="elapsed${suffix}">0:00</span><input class="seek" id="seek${suffix}" data-seek type="range" min="0" max="1000" value="0" step="1" aria-label="Vị trí bài hát${suffix?' trong danh sách':''}" disabled><span id="duration${suffix}">0:00</span></div></div>`;}
// Native scrolling gives touch inertia, CSS snaps to an album's centre. Scrolling
// only changes browsing focus; it must never interrupt the playing record.
export function bindShelf(root,{still,onFocus}){
 const shelf=root.querySelector('.album-shelf');if(!shelf)return ()=>{};
 const abort=new AbortController(),opts={signal:abort.signal};let settle,drag=null,suppress=false;
 const items=()=>[...shelf.querySelectorAll('[data-album]:not([hidden])')];
 function focus(){const list=items(),center=shelf.scrollLeft+shelf.clientWidth/2;const active=list.reduce((best,n)=>Math.abs(n.offsetLeft+n.offsetWidth/2-center)<Math.abs((best?.offsetLeft||0)+(best?.offsetWidth||0)/2-center)?n:best,null)||list[0];for(const n of list)n.dataset.focus=String(n===active);if(active)onFocus(active.dataset.album,list.indexOf(active),list.length);}
 shelf.addEventListener('scroll',()=>{clearTimeout(settle);settle=setTimeout(focus,90);},opts);
 shelf.addEventListener('wheel',e=>{if(Math.abs(e.deltaY)>Math.abs(e.deltaX)&&shelf.scrollWidth>shelf.clientWidth){e.preventDefault();shelf.scrollBy({left:e.deltaY,behavior:'instant'});}},{...opts,passive:false});
 shelf.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;drag={x:e.clientX,scroll:shelf.scrollLeft,id:e.pointerId};suppress=false;},opts);
 shelf.addEventListener('pointermove',e=>{if(!drag)return;if(Math.abs(e.clientX-drag.x)>7){suppress=true;shelf.setPointerCapture(e.pointerId);shelf.classList.add('dragging');shelf.scrollLeft=drag.scroll-(e.clientX-drag.x);}},opts);
 function release(){drag=null;shelf.classList.remove('dragging');clearTimeout(settle);settle=setTimeout(focus,100);}
 shelf.addEventListener('pointerup',release,opts);shelf.addEventListener('pointercancel',release,opts);
 shelf.addEventListener('click',e=>{if(suppress){e.preventDefault();e.stopImmediatePropagation();suppress=false;}},{...opts,capture:true});
 shelf.addEventListener('dragstart',e=>e.preventDefault(),opts);
 shelf.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;const list=items(),i=list.indexOf(e.target.closest('[data-album]'));const j=e.key==='Home'?0:e.key==='End'?list.length-1:Math.max(0,Math.min(list.length-1,i+(e.key==='ArrowRight'?1:-1)));e.preventDefault();list[j]?.focus({preventScroll:true});list[j]?.scrollIntoView({block:'nearest',inline:'center',behavior:still()?'instant':'smooth'});},opts);
 requestAnimationFrame(focus);return ()=>{abort.abort();clearTimeout(settle);};
}
