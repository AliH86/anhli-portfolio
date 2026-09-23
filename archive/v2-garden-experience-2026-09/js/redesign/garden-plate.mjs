import {gardenPlate} from './view.mjs';
import {mountGardenMotion} from './garden-motion.mjs';

// Shares the route shell and player. One optional image-effect canvas; no second audio.
export function mountGardenPlate(app,{disabled=false}={}){
  // Preserve the earlier isolated QA document and its own layout/controller.
  if(document.querySelector('script[src*="garden-ui-2026-09-14/proof.mjs"]'))return;
  const world=document.getElementById('dgWorld'),label=app.querySelector('.dg-review-label');
  let picture=world.querySelector('.dg-garden-plate'),image,state='loading';
  const motion=mountGardenMotion(app);
  const isGarden=()=>app.dataset.route==='garden'&&!disabled;
  function sync(){
    const garden=isGarden();
    app.classList.toggle('dg-garden-scene',garden);
    if(garden&&!picture){world.insertAdjacentHTML('afterbegin',gardenPlate());picture=world.querySelector('.dg-garden-plate');attach();}
    if(picture)picture.hidden=!garden||state==='error';
    app.dataset.gardenImage=state;
    motion.update({scene:picture,enabled:garden&&state==='ready'});
    if(!disabled)label.textContent=garden?(state==='error'?'CẢNH CHƯA TẢI ĐƯỢC · BẠN VẪN CÓ THỂ ĐI TIẾP':''):'UI PREVIEW · WORLD ĐANG DỰNG';
  }
  function attach(){
    image=picture.querySelector('img');
    image.addEventListener('load',()=>{state='ready';sync();});
    image.addEventListener('error',()=>{state='error';sync();});
    if(image.complete)state=image.naturalWidth?'ready':'error';
  }
  if(picture)attach();
  app.addEventListener('dandelion:route',sync);
  window.addEventListener('pageshow',sync);
  sync();
  window.dandelionGardenDiagnostics=()=>({mode:'layered-2.5d',active:isGarden(),state,source:image?.currentSrc||null,pictures:world.querySelectorAll('.dg-garden-plate').length,canvases:world.querySelectorAll('canvas').length,motion:motion.inspect()});
}
