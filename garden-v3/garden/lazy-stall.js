import { loadImage } from './network.js?v=3507';
// One player instance survives room navigation; an abandoned load never reopens it.
// Waits briefly for the wooden frame; after that the CSS fallback carries the page.
// The disc sits on the counter painted into the frame, so it waits for that art.
const frameReady=()=>Promise.race([loadImage('./art-v34/ui/frame-lite.webp',true).then(img=>{if(img)document.getElementById('stall')?.classList.add('frame-on');}),new Promise(r=>setTimeout(r,4000))]);
export function lazyStall(options) {
  let player, loading, wanted=false;
  const status=document.createElement('div');status.className='feature-status';status.hidden=true;
  status.setAttribute('role','status');document.body.append(status);
  function dismiss(){wanted=false;status.hidden=true;player?.close();}
  async function open(){
    wanted=true;
    if(player){player.open();return;}
    status.replaceChildren();status.append('Li đang xếp đĩa nhạc…');status.hidden=false;
    const close=document.createElement('button');close.textContent='Để sau';close.onclick=dismiss;status.append(close);
    try {
      loading ||= import('./stall.js?v=3507').then(m=>m.initStall(options)).then(p=>player=p).catch(e=>{loading=null;throw e;});
      await Promise.all([loading,frameReady()]);status.hidden=true;if(wanted)player.open();
    }catch(error){
      if(!wanted)return;
      status.replaceChildren();status.append('Sạp nhạc chưa tải được. ');
      const retry=document.createElement('button');retry.textContent='Thử lại';retry.onclick=open;status.append(retry,close);
    }
  }
  addEventListener('keydown',e=>{if(e.key==='Escape'&&!status.hidden)dismiss();});
  return {open,close:dismiss,pause:()=>player?.pause(),get playing(){return player?.playing||false;},get isOpen(){return player?player.isOpen:wanted;},bubble:()=>player?.bubble()||''};
}
