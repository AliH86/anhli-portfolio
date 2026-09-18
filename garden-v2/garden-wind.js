// Short traveling gusts separated by irregular rests, no animation frame loop.
export const gustPlan = (strength = 1) => [
  {selector:'.sprig-path',delay:0,duration:5400,angle:5.8*strength,drift:2.2},
  {selector:'.habitat-reeds',delay:260,duration:6100,angle:4.6*strength,drift:2.5},
  {selector:'.sprig-house',delay:550,duration:6600,angle:3.8*strength,drift:1.6},
  {selector:'.sprig-stall',delay:980,duration:7000,angle:4.2*strength,drift:1.8},
  {selector:'.canopy-frond',delay:1450,duration:7900,angle:2.4*strength,drift:2.4}
];
export function initGardenWind() {
  const body=document.body,world=document.querySelector('.scene-world');
  const reeds=document.createElement('div');reeds.className='habitat-reeds';reeds.setAttribute('aria-hidden','true');world.append(reeds);
  let timer,blocked=true,offscreen=false;const running=new Set();
  function place(){
    const r={width:world.clientWidth,height:world.clientHeight},portrait=matchMedia('(max-aspect-ratio:4/3)').matches;
    const [iw,ih,x,y,w,h]=portrait?[900,1200,690,338,70,95]:[1672,941,1478,551,92,115];
    const s=Math.max(r.width/iw,r.height/ih),ox=(r.width-iw*s)/2,oy=(r.height-ih*s)/2;
    Object.assign(reeds.style,{left:`${ox+(x-w/2)*s}px`,top:`${oy+(y-h*.85)*s}px`,width:`${w*s}px`,height:`${h*s}px`});
  }
  function gust(){
    if(blocked)return;
    for(const plan of gustPlan((.85+Math.random()*.3)*({calm:.35,breeze:1,windy:1.45}[body.dataset.wind]||1))){
      const node=document.querySelector(plan.selector);if(!node)continue;
      const a=plan.angle,animation=node.animate([
        {transform:'rotate(0deg)',offset:0},{transform:`rotate(${a*.55}deg)`,offset:.2},
        {transform:`rotate(${a}deg) translateX(${plan.drift}px)`,offset:.37},{transform:`rotate(${a*.32}deg)`,offset:.61},
        {transform:`rotate(${-a*.09}deg)`,offset:.82},{transform:'rotate(0deg)',offset:1}
      ],{duration:plan.duration,delay:plan.delay,easing:'cubic-bezier(.4,0,.3,1)'});
      running.add(animation);animation.onfinish=()=>running.delete(animation);
    }
    timer=setTimeout(gust,10500+Math.random()*5500);
  }
  function sync(){
    const next=offscreen||document.hidden||body.dataset.still==='true'||body.dataset.entered!=='true'||Boolean(body.dataset.room&&(body.dataset.room!=='music'||body.dataset.touch==='true'));
    if(next===blocked)return;blocked=next;clearTimeout(timer);
    if(blocked){for(const animation of running)animation.cancel();running.clear();}
    else timer=setTimeout(gust,450+Math.random()*650);
  }
  new MutationObserver(sync).observe(body,{attributes:true,attributeFilter:['data-room','data-still','data-entered','data-touch','data-wind']});
  document.addEventListener('visibilitychange',sync);
  new IntersectionObserver(([entry])=>{offscreen=!entry.isIntersecting;sync();}).observe(world);
  new ResizeObserver(place).observe(world);place();sync();
}
