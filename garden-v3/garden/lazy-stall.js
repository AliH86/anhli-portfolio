// One player instance survives room navigation; an abandoned load never reopens it.
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
      loading ||= import('./stall.js?v=3504').then(m=>m.initStall(options)).then(p=>player=p).catch(e=>{loading=null;throw e;});
      await loading;status.hidden=true;if(wanted)player.open();
    }catch(error){
      if(!wanted)return;
      status.replaceChildren();status.append('Sạp nhạc chưa tải được. ');
      const retry=document.createElement('button');retry.textContent='Thử lại';retry.onclick=open;status.append(retry,close);
    }
  }
  addEventListener('keydown',e=>{if(e.key==='Escape'&&!status.hidden)dismiss();});
  return {open,close:dismiss,pause:()=>player?.pause(),get playing(){return player?.playing||false;},get isOpen(){return player?player.isOpen:wanted;},bubble:()=>player?.bubble()||''};
}
