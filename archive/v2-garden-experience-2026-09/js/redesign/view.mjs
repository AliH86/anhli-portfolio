import {site,destinations,routes,services,method,chapters,fragments} from './content.mjs';
import {musicPlate} from './music-view.mjs';
import {aboutPage,resume} from './about-view.mjs';
export const esc = v => String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const routeLink = (id,text,cls='',extra='') => `<a class="${cls}" href="${routes.find(r=>r.id===id)?.path || './'}" data-dg-route="${id}" ${extra}>${text}</a>`;
const eyebrow = t => `<p class="dg-eyebrow">${t}</p>`;
const back = () => routeLink('garden','← VỀ GARDEN','dg-back','data-explore');
const contact = (cls='dg-text-link') => `<a class="${cls}" href="mailto:${site.email}">LIÊN HỆ <span aria-hidden="true">↗</span></a>`;
export function trackRows(album){
  return (album?.tracks||[]).map((t,i)=>`<li><button type="button" class="dg-track" data-track="${esc(t.id)}" data-track-index="${i}" aria-label="Phát ${esc(t.name)}"><span class="dg-track-no">${String(i+1).padStart(2,'0')}</span><span>${esc(t.name)}</span><time>${esc(t.dur||'')}</time></button></li>`).join('');
}
export function musicPanel(albums=[],selected){
  const album=albums.find(a=>a.id===selected)||albums.find(a=>a.id==='f5fc153c-51b8-4583-bfe9-1fcc872aab85')||albums[0];
  return `<div class="dg-music-panel dg-paper">
    <label class="dg-eyebrow" for="dgAlbumSelect">CHỌN MỘT CHIẾC ĐĨA</label>
    <select id="dgAlbumSelect" aria-label="Chọn album">${albums.map(a=>`<option value="${esc(a.id)}" ${a.id===album?.id?'selected':''}>${esc(a.name)}</option>`).join('')}</select>
    <div class="dg-record-head"><img id="dgAlbumCover" src="${esc(album?.cover||'assets/garden/v1/mot-tan-so-khac.webp')}" alt="Bìa ${esc(album?.name||'album')}" width="88" height="88"><div>${eyebrow('CÁI SẠP · ANH LI')}<h2 id="dgAlbumTitle">${esc(album?.name||'Cái Sạp nhạc')}</h2><p id="dgTrackTitle">Chọn một bài để nghe</p></div></div>
    <div class="dg-transport"><button type="button" data-action="previous" aria-label="Bài trước">⇤</button><button type="button" class="dg-play" data-action="play" aria-label="Phát nhạc">▶</button><button type="button" data-action="next" aria-label="Bài tiếp theo">⇥</button><button type="button" data-action="mute" aria-label="Tắt tiếng" aria-pressed="false">Âm thanh</button></div>
    <label class="dg-sr" for="dgSeek">Vị trí phát</label><input id="dgSeek" type="range" min="0" max="100" value="0" step="1" disabled><div class="dg-times"><time id="dgCurrentTime">0:00</time><time id="dgDuration">0:00</time></div>
    <p id="dgAudioMessage" class="dg-audio-message" role="status"></p>
    <ol class="dg-tracks" id="dgTracks">${trackRows(album)}</ol>
    <p class="dg-music-foot">Nhạc đi cùng bạn qua từng góc vườn.</p>
    <details class="dg-disclosure"><summary>Về âm nhạc ở Cái Sạp</summary><p>${site.musicNote}</p></details>
  </div>`;
}
export function pageContent(id,{albums=[],albumId=null,explore=false}={}){
  if(id==='garden') return explore ? `<article class="dg-explore" aria-label="Chọn một góc vườn"><h1 class="dg-sr" tabindex="-1">Đi một vòng khu vườn</h1><div class="dg-hotspots">${destinations.slice(1).map((d,i)=>routeLink(d.id,`<span class="dg-ring" aria-hidden="true"></span><span class="dg-hotspot-label">${d.label}</span><span class="dg-hand">${d.place} — ${d.text}</span>`,'dg-hotspot',`style="--spot:${i}"`)).join('')}</div><div class="dg-explore-foot">${eyebrow('GARDEN · BẠN ĐANG Ở ĐÂY')}<span class="dg-hand">Một khu vườn. Nhiều điều để ghé lại.</span></div></article>` :
    `<article class="dg-arrival"><div class="dg-arrival-copy"><p class="dg-hand dg-motto">Some things grow.<br>Some things become.</p><h1 tabindex="-1">${site.headline}</h1><p class="dg-intro">${site.intro}<br>Vào vườn, đi tới chỗ nào bạn muốn xem.</p><div class="dg-arrival-actions">${routeLink('garden','BƯỚC VÀO VƯỜN <span aria-hidden="true">→</span>','dg-primary','data-explore')}${routeLink('flat','hoặc đọc bản chữ','dg-quiet-link')}</div></div><p class="dg-hand dg-arrival-note">Âm nhạc. Công việc.<br>Gia đình. Và những ngày đẹp.</p><button class="dg-scroll-cue" data-action="explore" type="button">SCROLL / CLICK ĐỂ VÀO <span aria-hidden="true">↓</span></button></article>`;
  if(id==='music') return `<article class="dg-music dg-page"><div class="dg-state-copy">${eyebrow('MUSIC · CÁI SẠP')}<h1 tabindex="-1">Nghe, lưu giữ,<br>và chia sẻ.</h1><p>Sạp nhạc của em. Bài em viết, bài em thương, và những bản mix để dành cho một buổi chiều rảnh.</p>${back()}</div><div id="dgMusicPanel">${musicPanel(albums,albumId)}</div></article>`;
  if(id==='about') return aboutPage();
  if(id==='flat') return `<article class="dg-flat dg-reading"><div><h1 tabindex="-1">Anh Lập — producer, show director, người viết nhạc, ba của ba đứa con gái.</h1><p>${site.about}</p><h2>Résumé</h2>${resume()}<p class="dg-hand">${site.philosophy}</p></div><aside><div class="dg-paper">${eyebrow('NGHE')}<p>Cái Sạp — nhạc em viết và những bản mix để dành.</p>${routeLink('music','MUSIC →','dg-text-link')}</div><div class="dg-paper">${eyebrow('VỀ MÌNH')}<p>Giới thiệu, kinh nghiệm, hình và video.</p>${routeLink('about','ABOUT →','dg-text-link')}</div><div class="dg-paper">${contact()}<p>${site.email}</p></div></aside></article>`;
  if(id==='sky') return `<article class="dg-sky dg-reading">${routeLink('about','← ABOUT','dg-back')}${eyebrow('INNER WORLD · OPTIONAL')}<h1 tabindex="-1">Một khoảng trời riêng.</h1><p>Jyotiṣa, những nhịp ngày, và một chút thời gian để nhìn vào bên trong.</p><div id="dgSkySlot"></div><p class="dg-sky-note">${routeLink('garden','Về khu vườn →','dg-text-link','data-explore')}</p></article>`;
  return '';
}
export function gardenPlate(){
 const base='./assets/garden/production/stills/2026-09-14-art/',portrait='(max-width:700px), (max-width:1000px) and (orientation:portrait)';
 const wind='./assets/garden/production/stills/2026-09-14-wind/';
 const backdrop=`<source media="${portrait}" srcset="${base}garden-mobile.png"><img src="${base}garden-arrival.png" alt="" decoding="async" fetchpriority="high" width="1672" height="941">`;
 const plants=[[4,260,-36,0,9.3,-3],[15,195,-22,1,7.8,-6],[25,160,-30,2,10.7,-1],[59,205,-24,3,8.6,-4],[71,188,-12,2,11.4,-8],[86,258,-35,0,9.8,-5],[98,285,-18,3,8.1,-2],[63,100,165,1,10.2,-7],[91,115,140,2,12.1,-4],[9,92,190,3,9.7,-1]];
 return `<div class="dg-garden-plate"><picture class="dg-garden-backdrop">${backdrop}</picture><picture class="dg-garden-host" data-height-m="1.7"><source media="${portrait}" srcset="${wind}mobile-host-170.png"><img src="${wind}arrival-host-170.png" alt="" decoding="async" width="2560" height="1440"></picture><div class="dg-wind-layer" aria-hidden="true">${plants.map(([left,height,bottom,sprite,duration,delay],i)=>`<span class="dg-wind-plant dg-wind-plant-${i}" style="--plant-left:${left}%;--plant-height:${height}px;--plant-bottom:${bottom}px;--plant-sprite:${sprite*100/3}%;--plant-duration:${duration}s;--plant-delay:${delay}s"></span>`).join('')}</div></div>`;
}
export function shell(id='garden',options={}){
 const active=routes.find(r=>r.id===id)?.parent||id;
 return `<div id="dgApp" class="dg-root${id==='garden'?' dg-garden-scene':id==='music'?' dg-music-scene':''}" data-route="${id}" data-view="${id==='garden'?'arrival':id}">
  <a class="dg-skip" href="#dgMain">Đi tới nội dung</a>
  <div id="dgWorld" class="dg-world" aria-hidden="true">${id==='garden'?gardenPlate():id==='music'?musicPlate():''}<div class="dg-hill dg-hill-far"></div><div class="dg-hill dg-hill-near"></div><div class="dg-world-shade"></div></div>
  <header class="dg-header">${routeLink('garden',`<strong>${site.name}</strong><span>${site.tagline}</span>`,'dg-brand')}<nav class="dg-nav" aria-label="Đi trong khu vườn">${destinations.map(d=>routeLink(d.id,d.label,'',`${d.id===active?'aria-current="page"':''} ${d.id==='garden'?'data-explore':''}`)).join('')}</nav><button type="button" class="dg-map-button" data-action="map" aria-haspopup="dialog" aria-controls="dgMap">MAP <span aria-hidden="true">●</span></button></header>
  <main id="dgMain" tabindex="-1">${pageContent(id,options)}</main>
  <div id="dgMini" class="dg-mini" hidden><button type="button" data-action="play" aria-label="Phát nhạc">▶</button>${routeLink('music','<span id="dgMiniTitle">Cái Sạp nhạc</span><small>VỀ MUSIC ↗</small>','dg-mini-title')}<button type="button" data-action="mute" aria-label="Tắt tiếng" aria-pressed="false">Âm</button></div>
  <p class="dg-review-label">UI PREVIEW <span>·</span> WORLD ĐANG DỰNG</p>
  <dialog id="dgMap" class="dg-dialog dg-map" aria-labelledby="dgMapTitle"><div class="dg-dialog-head"><span class="dg-brand"><strong>ANH LI</strong></span><button type="button" data-close="dgMap" aria-label="Đóng bản đồ">ĐÓNG MAP ✕</button></div>${eyebrow('WORLD MAP · 3 CHỖ, 1 KHU VƯỜN')}<h2 id="dgMapTitle">Bạn muốn đi đâu?</h2><nav aria-label="Bản đồ khu vườn">${destinations.map((d,i)=>routeLink(d.id,`<span class="dg-map-dot">${String(i+1).padStart(2,'0')}</span><strong>${d.label}</strong><span>${d.place}</span><small>${d.text}</small>`,'dg-map-destination',`${d.id===active?'aria-current="page"':''} ${d.id==='garden'?'data-explore':''}`)).join('')}</nav><div class="dg-map-links">${routeLink('flat','BẢN CHỮ / FLAT')}${routeLink('music','/ SAP')}${routeLink('sky','/ SKY')}${contact()}</div><p class="dg-small">ESC để đóng · trở về đúng nơi bạn đang đứng.</p></dialog>
  <dialog id="dgLightbox" class="dg-dialog dg-lightbox" aria-labelledby="dgLightboxTitle"><div class="dg-dialog-head"><h2 id="dgLightboxTitle">Artwork</h2><button type="button" data-close="dgLightbox" aria-label="Đóng hình">ĐÓNG ✕</button></div><div id="dgLightboxMedia"></div><p id="dgLightboxCaption"></p></dialog>
 </div>`;
}
