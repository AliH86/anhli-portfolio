import {legacy} from './legacy-about.mjs';
import {site} from './content.mjs';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const gallery=legacy.GALLERY.map((g,i)=>({...g,id:i,title:g.title||`${g.tag} · ${String(i+1).padStart(2,'0')}`}));
export function videoURL(v){
  if(v.fb)return v.fb;
  if(v.drive)return `https://drive.google.com/file/d/${v.drive}/view`;
  if(v.vimeo)return `https://vimeo.com/${v.vimeo.split('?')[0]}${v.vimeo.includes('?h=')?'/'+v.vimeo.split('?h=')[1]:''}`;
  return `https://www.youtube.com/watch?v=${v.id}`;
}
export function videoEmbed(v){
  if(v.fb)return null;
  if(v.drive)return `https://drive.google.com/file/d/${v.drive}/preview`;
  if(v.vimeo)return `https://player.vimeo.com/video/${v.vimeo}`;
  return `https://www.youtube-nocookie.com/embed/${v.id}`;
}
export function galleryItems(items){return items.map(g=>`<a class="dg-gallery-item" href="${esc(g.src)}" data-media="${g.id}" aria-label="${g.type==='video'?'Xem video':'Xem hình'} ${esc(g.title)}"><span class="dg-gallery-frame"><img src="${esc(g.poster||g.src)}" alt="${esc(g.title)}" loading="lazy" decoding="async">${g.type==='video'?'<span class="dg-media-play" aria-hidden="true">▶</span>':''}</span><span>${esc(g.tag)} <small>${g.type==='video'?'MOTION':'PHOTO / ART'}</small></span></a>`).join('');}
export function resume(){return `<ol class="dg-resume">${legacy.WORK.map(w=>`<li><span class="dg-eyebrow">${esc(w.yr)}</span><div><h3>${esc(w.role)}</h3><p>${esc(w.co)}</p></div></li>`).join('')}</ol>`;}
export function aboutPage(){return `<article class="dg-about">
  <header class="dg-about-hero"><div><a class="dg-back" href="./" data-dg-route="garden" data-explore>← VỀ GARDEN</a><p class="dg-eyebrow">ABOUT · HUỲNH CHÍ LẬP</p><h1 tabindex="-1">Mình là Lập.<br>Hay gọi là Li.</h1><p class="dg-about-intro">${site.intro}</p><p>${site.about}</p><nav class="dg-about-jumps" aria-label="Trong About"><a href="about/#resume">Résumé ↓</a><a href="about/#about-gallery">Hình & motion ↓</a><a href="about/#about-videos">Video ↓</a></nav></div><figure><img src="images/portraits/about-bw.jpg" alt="Chân dung Anh Li" width="720" height="900"><figcaption>Một người. Nhiều điều để dành.</figcaption></figure></header>
  <section class="dg-about-personal"><p class="dg-hand">“${site.philosophy}”</p><div><p>Cái Sạp nhạc — tự viết, tự phối và tự dựng nên cả thế giới. Làm bằng tự do, đi bằng niềm vui.</p><p>Đứng lớp tại AIM Academy — chia sẻ những gì nghề đã dạy mình.</p><a href="sky/" data-dg-route="sky">Inner World · Một khoảng trời riêng ↗</a></div></section>
  <section id="resume" class="dg-about-section"><div class="dg-about-section-head"><div><p class="dg-eyebrow">RÉSUMÉ</p><h2>Những chặng làm nghề.</h2></div><a href="mailto:${site.email}">Liên hệ ↗</a></div>${resume()}<a class="dg-about-aim" href="https://aimacademy.vn/giang-vien/huynh-chi-lap/" target="_blank" rel="noopener noreferrer">Giảng viên · Event & Activation Management · AIM Academy ↗</a></section>
  <section id="about-gallery" class="dg-about-section"><div class="dg-about-section-head"><div><p class="dg-eyebrow">GALLERY</p><h2>Những hình ảnh ở lại.</h2><p>Thiết kế, thử nghiệm và những khoảnh khắc trong cuộc sống.</p></div><span id="dgGalleryCount" aria-live="polite">18 / ${gallery.length}</span></div><div class="dg-gallery-filters" role="group" aria-label="Lọc gallery">${['Tất cả',...new Set(gallery.map(g=>g.tag))].map((tag,i)=>`<button type="button" data-gallery-filter="${esc(tag)}" aria-pressed="${i===0}">${esc(tag)}</button>`).join('')}</div><div id="dgAboutGallery" class="dg-about-gallery">${galleryItems(gallery.slice(0,18))}</div><button class="dg-gallery-more" type="button" data-gallery-more>Xem thêm hình ↓</button><noscript><p><a href="?classic#gallery">Xem toàn bộ gallery trong bản cũ →</a></p></noscript></section>
  <section id="about-videos" class="dg-about-section"><div class="dg-about-section-head"><div><p class="dg-eyebrow">VIDEO</p><h2>Một vài đoạn chuyển động.</h2></div><a href="https://www.youtube.com/@caisapamnhaccuaLine" target="_blank" rel="noopener noreferrer">Cái Sạp trên YouTube ↗</a></div><div class="dg-about-videos">${legacy.VIDEOS.map((v,i)=>`<a href="${esc(videoURL(v))}" data-about-video="${i}" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">▶</span><span>${esc(v.title)}<small>${v.fb?'Facebook':v.drive?'Google Drive':v.vimeo?'Vimeo':'YouTube'}</small></span><span aria-hidden="true">↗</span></a>`).join('')}</div></section>
  <footer class="dg-about-footer"><p class="dg-hand">Some things grow. Some things become.</p><a href="mailto:${site.email}">${site.email}</a><a href="./" data-dg-route="garden" data-explore>Về khu vườn →</a></footer>
</article>`;}
