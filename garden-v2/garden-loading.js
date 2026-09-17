const seed='<svg viewBox="0 0 34 44" aria-hidden="true"><path d="M17 14l-3 27M17 14L4 7m13 7L7 2m10 12L16 1m1 13L25 2m-8 12L32 8m-15 6L2 15m15-1l16 3"/></svg>';
export function loadingMarkup(label='Li đang mở góc nhỏ này…'){
  return `<div class="garden-loading"><button class="loading-flower" data-loading-gust aria-label="Gửi một làn gió">${[0,1,2,3,4].map(i=>`<span style="--i:${i}">${seed}</span>`).join('')}</button><p role="status">${label}</p><small>Chạm bồ công anh, gửi một làn gió.</small></div>`;
}
// Loading is informative, never a gate. Finish immediately on load/error or bounded timeout.
export function watchScenery(image,container,{timeout=8000,setTimer=setTimeout,clearTimer=clearTimeout}={}){
  let timer,done=false;
  const finish=()=>{if(done)return;done=true;container.hidden=true;clearTimer(timer);image.removeEventListener('load',finish);image.removeEventListener('error',finish);};
  if(image.complete){container.hidden=true;return finish;}
  container.hidden=false;image.addEventListener('load',finish);image.addEventListener('error',finish);timer=setTimer(finish,timeout);
  return finish;
}
export function sendLoadingGust(button,reduced=false){
  if(reduced)return;
  button.querySelectorAll('span').forEach((s,i)=>{
    s.getAnimations().forEach(a=>a.cancel());
    s.animate([{transform:'translate(0,0) rotate(0deg)',opacity:1},{transform:`translate(${45+i*16}px,${-24-i*12}px) rotate(${20+i*8}deg)`,opacity:0}],{duration:900+i*140,easing:'ease-out'});
  });
}
