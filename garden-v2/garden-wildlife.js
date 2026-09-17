// Species-specific habitats, one visiting group at a time, no parade of all animals.
export const speciesForPhase=phase=>phase==='night'?['owl','bat','cricket','firefly']:['sparrow','hummingbird','butterfly','dragonfly'];
export const habitats={
  // Coordinates are on the original 1672×941 / 900×1200 paintings.
  sparrow:{row:0,size:48,land:[[622,196],[662,199],[695,202]],portrait:[[648,196],[690,196],[669,213]],kind:'perch',sound:'birds'},
  hummingbird:{row:1,size:41,land:[[1212,352]],portrait:[[700,362]],kind:'hover'},
  butterfly:{row:2,size:35,land:[[389,653]],portrait:[[157,623]],kind:'flutter'},
  dragonfly:{row:3,size:42,land:[[1550,575]],portrait:[[786,318]],kind:'hover'},
  owl:{row:0,size:68,land:[[1314,262]],portrait:[[690,196]],kind:'perch',sound:'owl'},
  bat:{row:1,size:43,land:[[1310,153]],portrait:[[740,143]],kind:'pass'},
  cricket:{row:2,size:29,land:[[1237,562]],portrait:[[614,715]],kind:'ground',sound:'crickets'},
  firefly:{row:3,size:16,land:[[1400,581],[1470,620],[1310,604]],portrait:[[767,341],[828,364],[721,386]],kind:'glow'}
};
export function chooseVisit(phase,previous,random=Math.random){
  const choices=phase==='night'?['owl','owl','owl','bat','bat']:['sparrow','sparrow','sparrow','hummingbird','butterfly','dragonfly'];
  const repeat=choices.indexOf(previous);if(repeat!==-1)choices.splice(repeat,1);
  return choices[Math.floor(random()*choices.length)];
}
export function initWildlife({world,onEncounter}){
  const visitors=new Map(),timers=new Set();let phase='',blocked=false,generation=0,destroyed=false,previous='';
  const random=(a,b)=>a+Math.random()*(b-a);
  const later=(fn,delay)=>{const token=generation,id=setTimeout(()=>{timers.delete(id);if(token===generation&&!blocked&&!destroyed)fn();},delay);timers.add(id);return id;};
  function position(spec,index=0){
    const r=world.getBoundingClientRect(),portrait=matchMedia('(max-aspect-ratio:4/3)').matches;
    const iw=portrait?900:1672,ih=portrait?1200:941,scale=Math.max(r.width/iw,r.height/ih);
    const anchors=portrait?spec.portrait:spec.land,[x,y]=anchors[index%anchors.length];
    return {x:(r.width-iw*scale)/2+x*scale,y:(r.height-ih*scale)/2+y*scale,w:r.width,h:r.height,size:Math.max(spec.kind==='glow'?7:15,Math.min(80,spec.size*scale))};
  }
  function create(name,index){
    const key=`${name}${index}`;if(visitors.has(key))return visitors.get(key);
    const element=document.createElement('div'),sprite=document.createElement('span'),spec=habitats[name];
    element.className=`wildlife wildlife-${name}`;element.setAttribute('aria-hidden','true');element.dataset.species=name;element.hidden=true;
    sprite.className='creature-sprite';sprite.style.setProperty('--sprite-row',`${spec.row*100/3}%`);element.append(sprite);world.append(element);
    const visitor={name,index,spec,element,animation:null};visitors.set(key,visitor);return visitor;
  }
  function animate(v,frames,duration,done){
    v.animation?.cancel();v.animation=v.element.animate(frames,{duration,easing:v.spec.kind==='pass'?'linear':'ease-in-out',fill:'forwards'});
    const token=generation;v.animation.onfinish=()=>{if(!destroyed&&!blocked&&token===generation)done();};
  }
  function visit(name,index,restTime,onArrive,onDone){
    const v=create(name,index),{spec,element}=v,p=position(spec,index),night=phase==='night';
    const fromRight=['owl','bat','dragonfly','hummingbird','cricket'].includes(name)||name==='firefly',side=fromRight?p.w+70:-70;
    element.style.width=`${p.size}px`;element.style.height=`${p.size}px`;element.hidden=false;element.dataset.state='arriving';
    element.style.setProperty('--sprite-color',`url('./assets/wildlife/${night?'night':'day'}-color.webp')`);element.style.setProperty('--sprite-mask',`url('./assets/wildlife/${night?'night':'day'}-matte.webp')`);element.style.setProperty('--facing',fromRight?'-1':'1');
    const t=(x,y)=>`translate(${x-p.size/2}px,${y-p.size*.92}px)`;
    const finish=()=>{element.hidden=true;onDone();};
    if(spec.kind==='pass'){
      element.dataset.state='flying';animate(v,[{transform:t(p.w+70,p.h*.11),opacity:1},{transform:t(p.w*.68,p.h*.16),opacity:1,offset:.3},{transform:t(p.w*.37,p.h*.1),opacity:1,offset:.7},{transform:t(-70,p.h*.15),opacity:1}],11000,finish);return;
    }
    const depart=()=>{
      element.dataset.state='departing';element.style.setProperty('--facing',fromRight?'1':'-1');
      const ground=spec.kind==='ground';
      const frames=ground?[{transform:t(p.x,p.y)},{transform:t(p.x+(side-p.x)*.55,p.y+4),offset:.5},{transform:t(side,p.y+12)}]:[{transform:t(p.x,p.y)},{transform:t(p.x+(side-p.x)*.3,p.y-45),offset:.35},{transform:t(side,Math.max(20,p.y-(spec.kind==='glow'?25:90)))}];
      animate(v,frames,ground?14000:spec.kind==='glow'?9000:5300,finish);
    };
    const arrive=()=>{
      element.dataset.state=spec.kind==='perch'?'perched':spec.kind==='ground'?'chirping':'hovering';
      if(name==='sparrow'&&index%2)element.style.setProperty('--facing','-1');
      onArrive();
      if(['hover','flutter','glow'].includes(spec.kind)){
        const dx=spec.kind==='flutter'?24:spec.kind==='glow'?random(12,27):5,dy=spec.kind==='flutter'?15:spec.kind==='glow'?random(7,16):7;
        animate(v,[{transform:t(p.x,p.y),opacity:1},{transform:t(p.x+dx,p.y-dy),opacity:1},{transform:t(p.x-dx*.5,p.y+dy*.4),opacity:1},{transform:t(p.x,p.y),opacity:1}],restTime,depart);
      }else later(depart,restTime);
    };
    const ground=spec.kind==='ground';
    animate(v,ground?[{transform:t(side,p.y+12)},{transform:t(p.x+(side-p.x)*.4,p.y+4),offset:.6},{transform:t(p.x,p.y)}]:[{transform:t(side,Math.max(25,p.y-(spec.kind==='glow'?15:70)))},{transform:t(p.x+(side-p.x)*.25,p.y-25),offset:.7},{transform:t(p.x,p.y)}],ground?14000:spec.kind==='glow'?10000:random(4300,6200),arrive);
  }
  function visitingGroup(){
    const name=chooseVisit(phase,previous);previous=name;
    const count=name==='sparrow'?(Math.random()<.18?3:2):1,rest=name==='sparrow'?random(26000,44000):name==='owl'?random(34000,62000):random(6000,14000);
    let arrived=0,finished=0;
    for(let i=0;i<count;i++)later(()=>visit(name,i,rest+i*900,()=>{arrived++;if(arrived===count&&habitats[name].sound)onEncounter(habitats[name].sound);},()=>{if(++finished===count)later(visitingGroup,random(27000,60000));}),i*random(450,950));
  }
  function nightGround(){
    visit('cricket',0,random(26000,50000),()=>onEncounter('crickets'),()=>later(nightGround,random(85000,150000)));
  }
  function nightLights(){
    let finished=0;const count=Math.random()<.5?2:3;
    for(let i=0;i<count;i++)later(()=>visit('firefly',i,random(22000,42000),()=>{},()=>{if(++finished===count)later(nightLights,random(35000,85000));}),i*random(1800,3500));
  }
  function stop(){generation++;for(const id of timers)clearTimeout(id);timers.clear();for(const v of visitors.values()){v.animation?.cancel();v.element.hidden=true;}}
  function restart(){
    stop();if(blocked||destroyed)return;
    later(visitingGroup,random(3500,9000));
    if(phase==='night'){later(nightLights,random(9000,22000));later(nightGround,random(26000,50000));}
  }
  const resize=new ResizeObserver(()=>{if(phase)restart();});resize.observe(world);
  return {setPhase(next){if(phase!==next){phase=next;previous='';restart();}},setBlocked(next){if(blocked!==next){blocked=next;restart();}},destroy(){destroyed=true;stop();resize.disconnect();for(const v of visitors.values())v.element.remove();}};
}
