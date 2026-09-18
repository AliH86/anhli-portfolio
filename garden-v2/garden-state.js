// Scene, feature and content are independent. New zones register their gateway;
// feature rendering never depends on a fixed position in the garden photograph.
export const locations={home:{id:'garden.home'},music:{id:'garden.musicStall',character:'musicBrowse'},profile:{id:'garden.story',character:'story'},gallery:{id:'garden.memories',character:'gallery'}};
export function registerLocation(name,definition){if(!/^[a-zA-Z]+$/.test(name)||!definition.id)throw Error('Invalid garden location');locations[name]={...definition};}
export function timePhase(date=new Date()){const h=date.getHours()+date.getMinutes()/60;return h<5?'night':h<7?'dawn':h<11?'morning':h<14?'noon':h<17?'afternoon':h<18.5?'sunset':'night';}
export function characterState({room='',playing=false}={}){return room==='profile'?'story':room==='gallery'?'gallery':playing?'listening':room==='music'?'musicBrowse':'idle';}
export function musicState({album,queueOpen,playing,loading}={}){return queueOpen?'tracklist':loading?'loading':playing?'playing':album?'album':'browse';}
export function initWorld(){
 const world={timePhase:timePhase(),weather:'clear',wind:'breeze',weatherSource:'fallback',location:'garden.home',character:'idle'};
 const paint=()=>{for(const key of ['timePhase','weather','wind','location','character'])document.body.dataset[key]=world[key];const label=document.querySelector('#world-time');if(label)label.textContent=({dawn:'Sớm mai',morning:'Buổi sáng',noon:'Giữa trưa',afternoon:'Chiều dịu',sunset:'Hoàng hôn',night:'Đêm yên'})[world.timePhase];};
 function update(feature){world.location=locations[feature.room]?.id||locations.home.id;world.character=characterState(feature);paint();}
 function clock(){if(!document.hidden){world.timePhase=timePhase();paint();}}
 const timer=setInterval(clock,60000);document.addEventListener('visibilitychange',clock);paint();
 return {world,update,setWeather(input={}){world.weather=['clear','cloudy','rain','storm','mist'].includes(input.weather)?input.weather:'clear';world.wind=['calm','breeze','windy'].includes(input.wind)?input.wind:'breeze';world.weatherSource=input.source||'fallback';paint();},destroy(){clearInterval(timer);document.removeEventListener('visibilitychange',clock);}};
}

export const sceneGateways={portrait:[[25,50,355,540],[386,365,397,475],[850,530,195,395]],landscape:[[12,40,430,500],[740,110,500,430],[1340,300,215,330]]};
