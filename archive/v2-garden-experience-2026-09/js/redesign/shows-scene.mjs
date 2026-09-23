import {showsPlate} from './shows-view.mjs';

// Static scenery first. No decorative clock or host on SHOWS.
export function mountShowsScene(app){
  const world=document.getElementById('dgWorld');
  let scene=world.querySelector('.dg-shows-plate'),image,state='idle';
  function attach(){
    image=scene.querySelector('img');state='loading';
    image.addEventListener('load',()=>{state='ready';sync();});
    image.addEventListener('error',()=>{state='error';sync();});
    if(image.complete)state=image.naturalWidth?'ready':'error';
  }
  function sync(){
    const active=app.dataset.route==='shows';
    app.classList.toggle('dg-shows-scene',active);
    if(active&&!scene){
      world.insertAdjacentHTML('beforeend',showsPlate());
      scene=world.querySelector('.dg-shows-plate');attach();
    }
    if(scene)scene.hidden=!active||state==='error';
    app.dataset.showsImage=state;
    if(active)app.querySelector('.dg-review-label').textContent='';
  }
  if(scene)attach();
  app.addEventListener('dandelion:route',sync);
  window.addEventListener('pageshow',sync);sync();
  window.dandelionShowsSceneDiagnostics=()=>({
    active:app.dataset.route==='shows',state,source:image?.currentSrc||null,
    scenes:world.querySelectorAll('.dg-shows-plate').length,
    mode:'static-scenic-plate',host:false,animationLoop:false
  });
}
