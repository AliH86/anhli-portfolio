// Decorative 2.5D only. Text, navigation and the shared audio player never move.
import {mountGardenCanopy} from './garden-canopy.mjs';
export function mountGardenMotion(app){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),pointer=matchMedia('(hover:hover) and (pointer:fine)');
 let scene,canopy,enabled=false,paused=false,button,frame=0,x=0,y=0,tx=0,ty=0;
 try{paused=localStorage.getItem('dg-garden-motion-paused')==='true';}catch{}
 const running=()=>enabled&&!paused&&!reduced.matches&&!document.hidden;
 function write(){if(scene){scene.style.setProperty('--garden-x',x.toFixed(4));scene.style.setProperty('--garden-y',y.toFixed(4));}}
 function reset(){cancelAnimationFrame(frame);frame=0;x=y=tx=ty=0;write();}
 function tick(){
  frame=0;if(!running()){reset();return;}
  x+=(tx-x)*.075;y+=(ty-y)*.075;write();
  if(Math.abs(tx-x)+Math.abs(ty-y)>.002)frame=requestAnimationFrame(tick);
 }
 function aim(a,b){tx=a;ty=b;if(!frame&&running())frame=requestAnimationFrame(tick);}
 function refresh(){
  app.dataset.gardenMotion=running()?'running':'still';
  if(!running())reset();
  canopy?.update({enabled,running:running(),reduced:reduced.matches});
  if(button){button.hidden=!enabled||reduced.matches;button.setAttribute('aria-pressed',String(paused));button.textContent=paused?'Bật chuyển động':'Dừng chuyển động';}
 }
 function update(options){
  scene=options.scene;enabled=options.enabled;
  if(enabled&&scene&&!canopy)canopy=mountGardenCanopy(scene);
  if(enabled&&!button){
   button=document.createElement('button');button.type='button';button.className='dg-motion-toggle';
   button.addEventListener('click',()=>{paused=!paused;try{localStorage.setItem('dg-garden-motion-paused',String(paused));}catch{}refresh();});
   app.append(button);
  }
  refresh();
 }
 app.addEventListener('pointermove',e=>{
  if(!running()||!pointer.matches||e.pointerType==='touch')return;
  if(document.querySelector('dialog[open]')){aim(0,0);return;}
  aim(Math.max(-1,Math.min(1,e.clientX/innerWidth*2-1)),Math.max(-1,Math.min(1,e.clientY/innerHeight*2-1)));
 },{passive:true});
 app.addEventListener('pointerleave',()=>aim(0,0));
 window.addEventListener('blur',()=>aim(0,0));
 window.addEventListener('resize',reset,{passive:true});
 document.addEventListener('visibilitychange',refresh);
 window.addEventListener('pagehide',()=>{enabled=false;refresh();});
 reduced.addEventListener('change',refresh);
 pointer.addEventListener('change',()=>{reset();refresh();});
 return {update,inspect:()=>({enabled,running:running(),paused,reduced:reduced.matches,pointer:pointer.matches,x,y,pendingFrame:Boolean(frame),canopy:canopy?.inspect()||null})};
}
