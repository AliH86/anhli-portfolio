// Residents of authored habitats. Sound is scheduled independently.
export const speciesForPhase=phase=>phase==='night'?['owl','bat','cricket']:['sparrow','hummingbird','butterfly','dragonfly'];
export const habitats={
  sparrow:{row:0,size:43,land:[[622,196],[662,199]],portrait:[[648,196],[690,196]],kind:'perch'},
  hummingbird:{row:1,size:30,land:[[1197,355]],portrait:[[704,368]],kind:'hover'},
  butterfly:{row:2,size:28,land:[[394,627],[461,593],[1184,510]],portrait:[[155,624],[220,582]],kind:'flutter'},
  dragonfly:{row:3,size:29,land:[[1516,557]],portrait:[[784,317]],kind:'hover'},
  owl:{row:0,size:65,land:[[663,107]],portrait:[[458,187]],kind:'perch'},
  bat:{row:1,size:30,land:[[1380,155]],portrait:[[696,123]],kind:'pass'},
  cricket:{row:2,size:20,land:[[1237,562]],portrait:[[614,715]],kind:'ground'}
};
export function chooseVisit(phase,previous,random=Math.random){
  const bag=phase==='night'?['owl','owl','bat']:['sparrow','sparrow','sparrow','butterfly','butterfly','hummingbird','dragonfly'];
  const choices=bag.filter(name=>name!==previous);return choices[Math.floor(random()*choices.length)];
}
export function initWildlife({world}){
  const residents=new Map(),timers=new Set(),motions=new Set();
  let phase='',blocked=true,generation=0,previous='',destroyed=false;
  const rand=(a,b)=>a+Math.random()*(b-a);
  const later=(fn,delay)=>{const version=generation,id=setTimeout(()=>{timers.delete(id);if(version===generation&&!blocked&&!destroyed)fn();},delay);timers.add(id);return id;};
  function geometry(x,y,size){
    const r=world.getBoundingClientRect(),portrait=matchMedia('(max-aspect-ratio:4/3)').matches;
    const iw=portrait?900:1672,ih=portrait?1200:941,scale=Math.max(r.width/iw,r.height/ih);
    return{x:(r.width-iw*scale)/2+x*scale,y:(r.height-ih*scale)/2+y*scale,size:Math.max(12,Math.min(78,size*scale)),scale};
  }
  function position(spec,index=0){const portrait=matchMedia('(max-aspect-ratio:4/3)').matches,anchors=portrait?spec.portrait:spec.land;return geometry(...anchors[index%anchors.length],spec.size);}
  function animate(node,frames,duration,done=()=>{}){
    const animation=node.animate(frames,{duration,easing:'ease-in-out',fill:'forwards'}),version=generation;
    motions.add(animation);animation.onfinish=()=>{motions.delete(animation);try{animation.commitStyles();}catch{}animation.cancel();if(version===generation&&!blocked&&!destroyed)done();};return animation;
  }
  function resident(name,index=0){
    const key=`${name}-${index}`;if(residents.has(key))return residents.get(key);
    const element=document.createElement('div'),sprite=document.createElement('span');
    element.className=`wildlife wildlife-${name}`;element.dataset.species=name;element.setAttribute('aria-hidden','true');element.hidden=true;
    sprite.className='creature-sprite';sprite.style.setProperty('--sprite-row',`${habitats[name].row*100/3}%`);
    element.append(sprite);world.append(element);residents.set(key,{element,sprite});return residents.get(key);
  }
  function visit(name,index,finished){
    const {element}=resident(name,index),spec=habitats[name],p=position(spec,index);
    const foot=name==='owl'?.84:.92,t=(x,y)=>`translate(${x-p.size/2}px,${y-p.size*foot}px)`;
    element.hidden=false;Object.assign(element.style,{width:`${p.size}px`,height:`${p.size}px`});
    element.style.setProperty('--sprite-color',`url('./assets/wildlife/${phase==='night'?'night':'day'}-color.webp')`);
    element.style.setProperty('--sprite-mask',`url('./assets/wildlife/${phase==='night'?'night':'day'}-matte.webp')`);
    element.style.setProperty('--facing',index%2?'-1':'1');
    let x=p.x,y=p.y,turn=0,departing=false;
    function depart(){
      departing=true;element.dataset.state=name==='owl'?'prepare':'look';
      later(()=>{
        element.dataset.state=spec.kind==='ground'?'rest':'flying';
        // Short flight into the neighboring tree/flower habitat, not across the screen.
        const dx=(name==='owl'?100:55)*p.scale,dy=(name==='owl'?-65:-18)*p.scale;
        animate(element,[{transform:t(x,y),opacity:1},{transform:t(x+dx*.75,y+dy),opacity:1,offset:.75},{transform:t(x+dx,y+dy),opacity:0}],name==='owl'?2200:2800,()=>{element.hidden=true;finished();});
      },name==='owl'?650:500);
    }
    function idle(){
      if(departing)return;
      if(spec.kind==='perch'){
        const choice=Math.random();element.dataset.state=choice<.25?'blink':choice<.6?'look':name==='owl'&&choice>.85?'settle':'perched';
        if(name==='sparrow'&&choice>.72&&turn++<3){const dx=rand(-9,12)*p.scale;animate(element,[{transform:t(x,y)},{transform:t(x+dx*.5,y-5*p.scale),offset:.48},{transform:t(x+dx,y)}],360);x+=dx;}
        later(()=>{if(departing)return;element.dataset.state='perched';later(idle,rand(3800,9200));},element.dataset.state==='blink'?190:1700);
      }else{
        element.dataset.state='flutter';const dx=rand(-17,20)*p.scale,dy=rand(-12,-4)*p.scale;
        animate(element,[{transform:t(p.x,p.y),opacity:1},{transform:t(p.x+dx,p.y+dy),offset:.4},{transform:t(p.x+dx*.4,p.y+4*p.scale)}],rand(1700,3000),()=>{if(departing)return;x=p.x+dx*.4;y=p.y+4*p.scale;element.dataset.state='rest';later(idle,rand(3000,6000));});
      }
    }
    if(spec.kind==='pass'){
      element.dataset.state='flying';animate(element,[{transform:t(p.x+80*p.scale,p.y-30*p.scale),opacity:0},{transform:t(p.x+30*p.scale,p.y),opacity:1,offset:.15},{transform:t(p.x-90*p.scale,p.y-12*p.scale),opacity:1,offset:.75},{transform:t(p.x-150*p.scale,p.y-25*p.scale),opacity:0}],7200,()=>{element.hidden=true;finished();});return;
    }
    element.dataset.state=spec.kind==='perch'?'perched':'rest';
    animate(element,[{transform:t(x,y),opacity:0},{transform:t(x,y),opacity:1}],1200,idle);
    later(depart,name==='owl'?rand(80000,130000):name==='sparrow'?rand(26000,52000):rand(10000,17000));
  }
  function group(){
    const name=chooseVisit(phase,previous);previous=name;
    const count=name==='sparrow'&&Math.random()<.38?2:1;let complete=0;
    for(let i=0;i<count;i++)later(()=>visit(name,i,()=>{if(++complete===count)later(group,phase==='night'?rand(50000,95000):rand(23000,48000));}),i*1400);
  }
  const lights=document.createElement('div');lights.className='firefly-habitat';lights.setAttribute('aria-hidden','true');world.append(lights);
  let particles=[];const illuminated=new Set();
  function prepareLights(){
    lights.replaceChildren();particles=[];illuminated.clear();
    const portrait=matchMedia('(max-aspect-ratio:4/3)').matches,count=portrait?12:16;
    const clusters=portrait?[[686,344],[668,719],[215,850]]:[[1470,573],[1218,588],[482,612]];
    for(let i=0;i<count;i++){
      const [x,y]=clusters[i%clusters.length],p=geometry(x+rand(-45,45),y+rand(-28,28),3),dot=document.createElement('i');
      dot.className='habitat-firefly';Object.assign(dot.style,{left:`${p.x}px`,top:`${p.y}px`});lights.append(dot);particles.push(dot);
    }
    lights.hidden=false;
    for(let i=0;i<(portrait?6:8);i++)later(pulse,300+i*850);
  }
  function pulse(){
    const choices=particles.filter(p=>!illuminated.has(p));if(!choices.length)return;
    const dot=choices[Math.floor(Math.random()*choices.length)];illuminated.add(dot);
    const dx=rand(-22,22),dy=-rand(8,24),duration=rand(6200,10500);
    animate(dot,[{opacity:0,transform:'translate(0,0)'},{opacity:rand(.45,.85),transform:`translate(${dx*.25}px,${dy*.25}px)`,offset:.18},{opacity:.23,offset:.42},{opacity:rand(.45,.8),offset:.61},{opacity:0,transform:`translate(${dx}px,${dy}px)`}],duration,()=>{illuminated.delete(dot);later(pulse,rand(500,1700));});
  }
  function stop(){generation++;for(const id of timers)clearTimeout(id);timers.clear();for(const a of motions)a.cancel();motions.clear();for(const {element} of residents.values())element.hidden=true;lights.hidden=true;illuminated.clear();}
  function restart(){stop();if(blocked||destroyed||!phase)return;later(group,phase==='night'?rand(9000,18000):rand(3800,7500));if(phase==='night')prepareLights();}
  const resize=new ResizeObserver(()=>{if(phase)restart();});resize.observe(world);
  return{setPhase(next){if(phase!==next){phase=next;previous='';restart();}},setBlocked(next){if(blocked!==next){blocked=next;restart();}},destroy(){destroyed=true;stop();resize.disconnect();for(const {element} of residents.values())element.remove();lights.remove();}};
}
