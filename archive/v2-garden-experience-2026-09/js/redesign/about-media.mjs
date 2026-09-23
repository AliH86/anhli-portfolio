import {gallery,galleryItems,videoURL,videoEmbed} from './about-view.mjs';
import {legacy} from './legacy-about.mjs';
export function mountAboutMedia(app,music){
  const dialog=document.getElementById('dgLightbox'),slot=document.getElementById('dgLightboxMedia');
  let filter='Tất cả',shown=18,opener;
  function clear(){slot.querySelectorAll('video').forEach(v=>v.pause());slot.replaceChildren();}
  dialog.addEventListener('close',()=>{clear();opener?.focus({preventScroll:true});});
  app.addEventListener('dandelion:route',()=>{clear();if(dialog.open)dialog.close();filter='Tất cả';shown=18;});
  function open(title,element,trigger){
    clear();opener=trigger;document.getElementById('dgLightboxTitle').textContent=title;
    document.getElementById('dgLightboxCaption').textContent='';slot.append(element);dialog.showModal();
  }
  function draw(){
    const items=gallery.filter(g=>filter==='Tất cả'||g.tag===filter);
    const grid=document.getElementById('dgAboutGallery');
    grid.innerHTML=galleryItems(items.slice(0,shown));
    document.getElementById('dgGalleryCount').textContent=`${Math.min(shown,items.length)} / ${items.length}`;
    app.querySelector('[data-gallery-more]').hidden=shown>=items.length;
    app.querySelectorAll('[data-gallery-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.galleryFilter===filter)));
  }
  app.addEventListener('click',e=>{
    if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0)return;
    const filterButton=e.target.closest('[data-gallery-filter]');
    if(filterButton){filter=filterButton.dataset.galleryFilter;shown=18;draw();return;}
    if(e.target.closest('[data-gallery-more]')){shown+=18;draw();return;}
    const link=e.target.closest('[data-media]');
    if(link){
      e.preventDefault();const g=gallery[Number(link.dataset.media)];if(!g)return;
      const el=document.createElement(g.type==='video'?'video':'img');el.src=g.src;
      if(g.type==='video'){
        el.controls=true;el.playsInline=true;el.preload='metadata';if(g.poster)el.poster=g.poster;
        el.addEventListener('play',()=>music?.media.pause());
      }else el.alt=g.title;
      open(g.title,el,link);return;
    }
    const video=e.target.closest('[data-about-video]');
    if(video){
      const v=legacy.VIDEOS[Number(video.dataset.aboutVideo)],src=videoEmbed(v);if(!src)return;
      e.preventDefault();music?.media.pause();
      const wrap=document.createElement('div'),frame=document.createElement('iframe'),fallback=document.createElement('a');
      frame.src=src;frame.title=v.title;frame.allow='fullscreen; picture-in-picture';frame.allowFullscreen=true;
      fallback.href=videoURL(v);fallback.textContent='Mở video ở trang gốc ↗';fallback.target='_blank';fallback.rel='noopener noreferrer';
      wrap.append(frame,fallback);open(v.title,wrap,video);
    }
  });
}
