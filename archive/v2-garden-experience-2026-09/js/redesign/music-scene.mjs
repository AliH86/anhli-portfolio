import {musicPlate} from './music-view.mjs';
export function mountMusicScene(app){
 const world=document.getElementById('dgWorld');let scene=world.querySelector('.dg-music-plate'),image,state='loading';
 function attach(){image=scene.querySelector('img');image.addEventListener('load',()=>{state='ready';sync();});image.addEventListener('error',()=>{state='error';sync();});if(image.complete)state=image.naturalWidth?'ready':'error';}
 function sync(){const active=app.dataset.route==='music';app.classList.toggle('dg-music-scene',active);if(active&&!scene){world.insertAdjacentHTML('beforeend',musicPlate());scene=world.querySelector('.dg-music-plate');attach();}if(scene)scene.hidden=!active||state==='error';app.dataset.musicImage=state;if(active)app.querySelector('.dg-review-label').textContent='';}
 if(scene)attach();app.addEventListener('dandelion:route',sync);window.addEventListener('pageshow',sync);sync();
 window.dandelionMusicSceneDiagnostics=()=>({active:app.dataset.route==='music',state,source:image?.currentSrc||null,scenes:world.querySelectorAll('.dg-music-plate').length,hostHeightM:1.7,mode:'static-layered-2.5d'});
}
