import actorMetadata from './art-v34/manifest.json' with {type:'json'};
import { fetchWithDeadline, loadLargeImage } from './network.js?v=3508';
export const actorHeights={li:168,le:51,lun:45,lyly:73,bo:58,vang:44,mun_tabby:48,tux:50,corgi:52,poodle:43,spaniel:57,jo:52};
const actors={};
export async function loadActors(){
 const man=actorMetadata;
 const sheets=new Map();
 await Promise.all(Object.entries(man.actors).map(async([id,actor])=>{
  if(!sheets.has(actor.sheet))sheets.set(actor.sheet,loadLargeImage('./art-v34/'+actor.sheet,false,45000,'high'));
  const sheet=await sheets.get(actor.sheet), frames={};
  for(const [key,[x,y,w,h]] of Object.entries(actor.rects)){
   const c=document.createElement('canvas');c.width=w;c.height=h;
   c.getContext('2d').drawImage(sheet,x,y,w,h,0,0,w,h);frames[key]=c;
  }
  actors[id]={};for(const [name,clip] of Object.entries(actor.clips))actors[id][name]={...clip,images:clip.frames.map(f=>frames[f])};
 }));return actors;
}
export function actorFrame(id,action,dir,time=0,height=actorHeights[id]) {
 const clips=actors[id], clip=clips[`${action}/${dir}`]||clips[`${action}/reference`]||clips[`idle/${dir}`]||clips['idle/reference'];
 let n=Math.floor(time*clip.fps)%clip.images.length;
 if(clip.durations){let t=time*1000%clip.durations.reduce((a,b)=>a+b,0);n=0;while(t>=clip.durations[n])t-=clip.durations[n++];}
 return {img:clip.images[n],ax:clip.anchor[0],ay:clip.anchor[1],scale:height/clip.bodyHeight,hq:true,flip:!!clip.facing&&((dir.includes('west')&&clip.facing==='east')||(dir.includes('east')&&clip.facing==='west'))};
}
export function paintActor(ctx,id,action,dir,t,x,y) {
 const f=actorFrame(id,action,dir,t);ctx.save();ctx.imageSmoothingEnabled=false;
 if(f.flip){ctx.translate(x,0);ctx.scale(-1,1);x=0;}
 ctx.drawImage(f.img,Math.round(x-f.ax*f.scale),Math.round(y-f.ay*f.scale),Math.round(f.img.width*f.scale),Math.round(f.img.height*f.scale));ctx.restore();
}
