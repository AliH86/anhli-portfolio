// Ali's own pets, drawn from photos (pets/<name>/: still, walk/0..n, optional sit, sleep).
// In the garden they roam the lawn, nap by day, gather round Li now and then, and
// curl up near the porch at night. All sprites face right; facing left is a mirror.

import { loadSprite } from './sprite-loader.js?v=70';
const loadImg = (src) => loadSprite(src, true);
const rnd = (a, b) => a + Math.random() * (b - a);

export async function loadPets(base) {
  const man = await (await fetch(`${base}manifest.json`, { cache: 'no-cache' })).json();
  const POSES = ['sit', 'lie', 'sleep', 'play', 'roll'];
  const entries = await Promise.all(Object.entries(man).map(async ([name, def]) => {
    const [still, walk, ...poses] = await Promise.all([
      loadImg(`${base}${name}/still.png`),
      Promise.all([...Array(def.walk || 0).keys()].map((i) => loadImg(`${base}${name}/walk/${i}.png`))),
      ...POSES.map((k) => (def[k] ? loadImg(`${base}${name}/${k}.png`) : null)),
    ]);
    const sp = { name, still: name === 'mun_tabby' ? walk[0] || still : still, walk: walk.filter(Boolean).length ? walk.filter(Boolean) : [still] };
    POSES.forEach((k, i) => { if (poses[i]) sp[k] = poses[i]; });
    // These two tabby files contain disconnected tail fragments. Use the
    // intact sitting pose until clean, identity-matched resting frames exist.
    if (name === 'mun_tabby') { delete sp.lie; delete sp.sleep; }
    return [name, sp];
  }));
  const sprites=Object.fromEntries(entries);
  const motions=await fetch(`${base}animated/manifest.json`).then(r=>r.ok?r.json():{}).catch(()=>({}));
  for(const [name,clips] of Object.entries(motions)) for(const [key,m] of Object.entries(clips)) {
    const frames=await Promise.all(Array.from({length:m.frames},(_,i)=>loadImg(`${base}animated/${name}/${i}.png`)));
    if(frames.every(Boolean)) { sprites[name].clips ||= {}; sprites[name].clips[key]={...m,frames}; }
  }
  return sprites;
}


export const PET_SCALE={bo:1.55,vang:1.4,muc:1.4,mun_tabby:1.4,socola:1.45,tux:1.4,corgi:1.65,husky:1.45,poodle:1.4,spaniel:1.5};
export const PET_NAMES={bo:'Ca cao',vang:'Mina',muc:'Lùn',mun_tabby:'Bông',tux:'Jun',corgi:'Sable',husky:'Ly Ly',poodle:'Mít',spaniel:'Lắc ki chim'};
export const petRadius=p=>p.name==='husky'?20:p.name==='corgi'?18:['bo','spaniel'].includes(p.name)?14:10;
const CATS=new Set(['mun_tabby','tux']);
const LAWN=[[620,820],[760,900],[900,780],[1000,900],[560,940],[840,980],[1080,960],[700,760],[980,800],[480,860],[1150,800],[380,900]];
export const PORCH=[[612,622],[654,622],[696,622],[739,622],[782,634],[826,634],[876,634],[924,632],[620,642],[680,641]];
const PERCHES=[
 {id:'branch',approach:[1190,630],at:[1208,576],sort:670},
 {id:'bench',approach:[1268,760],at:[1207,711],sort:747},
];
export function makeGardenPets(sprites){
 // The two dark Chihuahua sprite sets depict the same child, Lùn. Keep one
 // garden actor; both source sets remain available for later visual review.
 const roster=Object.keys(sprites);
 const list=roster.filter(name=>name!=='socola').map(name=>{const i=roster.indexOf(name),[x,y]=LAWN[i%LAWN.length];return{name,cat:CATS.has(name),x:x+rnd(-15,15),y:y+rnd(-8,8),state:'stand',wait:rnd(1,6),path:[],flip:Math.random()<.5,t:rnd(0,2),bed:PORCH[i%PORCH.length],speed:name==='husky'?59:name==='corgi'?48:43,home:false,social:rnd(3,10),lift:0};});
 list.spr=sprites;return list;
}
function rest(p,state,a,b){p.state=state;p.wait=rnd(a,b);p.t=0;p.path=[];p.progress=null;}
function go(p,nav,x,y,state='walk'){p.path=nav(p.x,p.y,x,y,p);p.state=state;p.goal=[x,y];p.detouring=false;p.t=0;}
function startHop(p,to,landing){Object.assign(p,{state:'climb',hopFrom:[p.x,p.y],hopTo:to,hopK:0,landing,lift:0});p.path=[];}
function down(p){if(p.perch){startHop(p,p.perch.approach,null);p.descending=true;}}
function choosePerch(p,list,li){return PERCHES.find(q=>!(q.id==='bench'&&(li?.pose==='sit'||li?.wantPose==='sit'))&&!list.some(o=>o!==p&&(o.perch===q||o.goPerch===q)));}
function toPerch(p,list,li,nav){const q=choosePerch(p,list,li);if(!q)return false;go(p,nav,...q.approach);if(!p.path.length)return false;p.goPerch=q;return true;}
export function callPets(list,li,nav){
 for(const [i,p]of list.entries()) {p.attention=12;p.prey=null;p.goPerch=null;if(p.perch){down(p);continue;}if(p.state==='climb')continue;const a=i/list.length*Math.PI*2;go(p,nav,li.x+Math.cos(a)*(80+petRadius(p)),li.y+28+Math.sin(a)*42);}
}
export function petAt(list,sprites,x,y){return [...list].reverse().find(p=>{const f=petFrame(p,sprites[p.name]),s=PET_SCALE[p.name]||1;return x>p.x-f.ax*s&&x<p.x+(f.img.width-f.ax)*s&&y>p.y-f.ay*s-p.lift&&y<p.y+4-p.lift;});}
export function stepGardenPets(list,dt,hour,rain,li,nav,fits=()=>true){
 const night=hour<6.5||hour>=21.5,home=night||rain>.4;
 for(const [index,p] of list.entries()){
  p.t+=dt;p.social-=dt;p.attention=Math.max(0,(p.attention||0)-dt);
  if(p.state==='climb'){
   p.hopK=Math.min(1,p.hopK+dt/0.85);const k=p.hopK,e=k*k*(3-2*k);
   p.x=p.hopFrom[0]+(p.hopTo[0]-p.hopFrom[0])*e;p.y=p.hopFrom[1]+(p.hopTo[1]-p.hopFrom[1])*e;p.lift=Math.sin(Math.PI*k)*18;
   if(k===1){p.lift=0;p.perch=p.landing;p.descending=false;if(p.perch)rest(p,'perch',8,20);else{p.home=!home;rest(p,'stand',.2,.5);}}
   continue;
  }
  if(p.perch){
   p.wait-=dt;
   const blocked=p.perch.id==='bench'&&(li?.pose==='sit'||li?.wantPose==='sit');
   if(home||p.attention||blocked||p.wait<=0)down(p);
   continue;
  }
  if(home!==p.home){
   p.home=home;p.prey=null;p.goPerch=null;
   // The porch has one narrow staircase. Let the pets with the farthest beds
   // enter first so a settled neighbour does not block the passage.
   if(home){const rank=list.filter(q=>q.bed[0]>p.bed[0]).length;rest(p,'stand',rank*1.5,rank*1.5+.4);}
   else go(p,nav,...LAWN[(Math.random()*LAWN.length)|0]);
  }
  if(['walk','run','flee','playrun'].includes(p.state)){
   if(!p.progress||Math.hypot(p.x-p.progress.x,p.y-p.progress.y)>8)p.progress={x:p.x,y:p.y,time:0};
   else p.progress.time+=dt;
   if(p.progress.time>3){
    const target=p.home?p.bed:p.goal;p.progress=null;
    const route=target?nav(p.x,p.y,...target,p,list.filter(q=>q!==p&&!q.perch&&q.state!=='climb')):[];
    if(route.length){p.path=route;p.detouring=false;}else{p.prey=null;rest(p,'stand',.5,1.2);}
    continue;
   }
   if(p.state==='run'&&p.prey){
    const q=p.prey;p.chase-=dt;p.repath=(p.repath||0)-dt;
    if(p.chase<=0||q.perch||q.state==='climb'||Math.hypot(q.x-p.x,q.y-p.y)<55){p.prey=null;rest(p,'play',2,4);continue;}
    if(p.repath<=0){p.path=nav(p.x,p.y,q.x,q.y,p);p.repath=.5;}
   }
   const tgt=p.path[0];
   if(!tgt){
    if(p.detouring&&p.goal){p.detouring=false;p.path=nav(p.x,p.y,...p.goal,p,list.filter(q=>q!==p&&!q.perch&&q.state!=='climb'));if(p.path.length)continue;}
    if(p.goPerch){const q=p.goPerch;p.goPerch=null;if(Math.hypot(p.x-q.approach[0],p.y-q.approach[1])<9){startHop(p,q.at,q);continue;}}
    if(p.home){rest(p,Math.hypot(p.x-p.bed[0],p.y-p.bed[1])<5?(night?'sleep':'lie'):'stand',1,4);continue;}
    rest(p,p.attention||p.state==='playrun'?'play':'stand',2,5);continue;
   }
   const dx=tgt[0]-p.x,dy=tgt[1]-p.y,d=Math.hypot(dx,dy);if(d<2){p.path.shift();continue;}
   const speed=p.state==='walk'?p.speed:p.speed*1.8,step=Math.min(d,speed*dt);let nx=p.x+dx/d*step,ny=p.y+dy/d*step;
   if(!fits(nx,ny,p)){
    // A continuous step can graze a corner between navigation samples. Slide safely past it.
    if(fits(nx,p.y,p))ny=p.y;else if(fits(p.x,ny,p))nx=p.x;else{p.path=[];p.prey=null;rest(p,'stand',.5,1);continue;}
   }
   // Yield at close ground contact; never let a chase merge two bodies.
   const other=list.find(q=>q!==p&&!q.perch&&q.state!=='climb'&&Math.hypot(nx-q.x,(ny-q.y)*1.7)<(petRadius(p)+petRadius(q))*(p.home&&q.home?.45:1.4)&&Math.hypot(nx-q.x,(ny-q.y)*1.7)<Math.hypot(p.x-q.x,(p.y-q.y)*1.7));
   if(other){p.blocked=(p.blocked||0)+dt;if(p.blocked>1+index*.1){p.blocked=0;const end=p.home?p.bed:p.goal||tgt;const route=nav(p.x,p.y,...end,p,list.filter(q=>q!==p&&!q.perch&&q.state!=='climb'));if(route.length){p.path=route;p.detouring=false;}else {const a=Math.atan2(p.y-other.y,p.x-other.x);p.path=nav(p.x,p.y,p.x+Math.cos(a)*28,p.y+Math.sin(a)*20,p);p.detouring=p.path.length>0;if(!p.path.length)rest(p,'stand',.3,.8);}}continue;}
   p.blocked=0;p.x=nx;p.y=ny;if(Math.abs(dx)>.4)p.flip=dx<0;continue;
  }
  p.wait-=dt;if(p.wait>0)continue;
  if(p.home){if(Math.hypot(p.x-p.bed[0],p.y-p.bed[1])>5)go(p,nav,...p.bed);else rest(p,night?'sleep':'lie',15,30);continue;}
  if(p.attention){rest(p,'play',2,4);continue;}
  const r=Math.random();
  if(p.cat&&r<.24&&toPerch(p,list,li,nav))continue;
  const cat=!p.cat&&p.social<=0&&list.find(q=>q.cat&&!q.home&&!q.perch&&q.state!=='climb'&&Math.hypot(q.x-p.x,q.y-p.y)<210);
  if(cat&&r<.10){
   p.social=rnd(25,45);cat.social=20;
   if(!toPerch(cat,list,li,nav)){const a=Math.atan2(cat.y-p.y,cat.x-p.x);go(cat,nav,cat.x+Math.cos(a)*160,cat.y+Math.sin(a)*100,'flee');}
   p.prey=cat;p.chase=rnd(2,3.5);go(p,nav,cat.x,cat.y,'run');continue;
  }
  const buddy=!p.cat&&list.find(q=>q!==p&&!q.cat&&!q.home&&Math.hypot(q.x-p.x,q.y-p.y)<250);
  if(buddy&&r<.30){const a=Math.atan2(p.y-buddy.y,p.x-buddy.x)+.8;go(p,nav,buddy.x+Math.cos(a)*90,buddy.y+Math.sin(a)*55,'playrun');continue;}
  if(r<.55){const q=LAWN[(Math.random()*LAWN.length)|0];go(p,nav,q[0]+rnd(-40,40),q[1]+rnd(-20,20));}
  else if(r<.64&&li&&!li.hidden)go(p,nav,li.x+rnd(-90,90),li.y+rnd(25,55));
  else if(r<.82)rest(p,'play',3,6);
  else if(r<.90)rest(p,'sit',4,8);
  else rest(p,Math.random()<.5?'lie':'sleep',7,15);
 }
}
function petFrame(p,s){
 const moving=['walk','run','flee','playrun'].includes(p.state),clip=(p.state==='play'||p.state==='perch')&&s.clips?.play;
 if(clip)return{img:clip.frames[Math.floor(p.t*clip.fps)%clip.frames.length],ax:clip.ax,ay:clip.ay};
 const pose={perch:s.sit,lie:s.lie||s.sleep||s.sit,sleep:s.sleep||s.lie||s.sit,play:s.play||s.sit,roll:s.roll||s.lie||s.sit,climb:s.still}[p.state]||s[p.state]||s.still;
 const img=moving?s.walk[Math.floor(p.t*(p.state==='walk'?10:15))%s.walk.length]:pose;
 return{img,ax:img.width/2,ay:img.height};
}
const labelTops=new WeakMap();
export function spriteHeadOffset(img,anchor,scale=1){
 let top=labelTops.get(img);
 if(top===undefined){
  const c=document.createElement('canvas');c.width=img.width;c.height=img.height;
  const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(img,0,0);const a=g.getImageData(0,0,c.width,c.height).data;
  top=0;outer:for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++)if(a[(y*c.width+x)*4+3]>24){top=y;break outer;}
  labelTops.set(img,top);
 }
 return Math.max(0,anchor-top)*scale;
}
export function petLabelHeight(p,s){const f=petFrame(p,s);return spriteHeadOffset(f.img,f.ay,PET_SCALE[p.name]||1)+(p.lift||0);}
export function petDraws(list,sprites,ctx,view,t){return list.map(p=>({y:p.perch?.sort||(p.state==='climb'?Math.max(p.hopFrom[1],p.hopTo[1])+1:p.y),draw:()=>{
 const {img,ax,ay}=petFrame(p,sprites[p.name]),s=PET_SCALE[p.name]||1,w=Math.round(img.width*s),h=Math.round(img.height*s),x=Math.round(p.x-ax*s-view.x),y=Math.round(p.y-ay*s-(p.lift||0)-view.y);
 ctx.fillStyle='rgba(20,40,20,.24)';ctx.beginPath();ctx.ellipse(Math.round(p.x-view.x),Math.round(p.y-view.y),petRadius(p)*(p.lift ? .7 : 1),3,0,0,Math.PI*2);ctx.fill();
 if(p.flip){ctx.save();ctx.translate(Math.round(p.x-view.x),0);ctx.scale(-1,1);ctx.drawImage(img,Math.round(-ax*s),y,w,h);ctx.restore();}else ctx.drawImage(img,x,y,w,h);
 if(p.state==='sleep'&&Math.floor(t*.7+p.x)%3===0){ctx.fillStyle='#fff9e9';ctx.font='bold 9px sans-serif';ctx.fillText('z',x+w-5,y-3-t*4%6);}
}}));}
export function petBoxes(list,sprites){return list.filter(p=>!p.perch&&p.state!=='climb').map(p=>{const f=petFrame(p,sprites[p.name]),s=PET_SCALE[p.name]||1;return{x:p.x,y:p.y,w:f.img.width*s,h:f.ay*s};});}
// ---------- the two canaries and the hamsters ----------
const PERCH = [[1212, 452], [1168, 420], [1262, 470], [905, 360], [640, 520], [1330, 560]];
export async function loadSmall(base) {
  const L = (n) => loadImg(`${base}_small/${n}.png`);
  return {
    canary: { perch: await L('canary_perch'), flap: [await L('canary_f0'), await L('canary_f1'), await L('canary_f2'), await L('canary_f1')] },
    hamster: { eat: await L('hamster_eat'), still: await L('hamster_still'), run: [await L('hamster_r0'), await L('hamster_r1')] },
  };
}
export function makeSmall() {
  return {
    canaries: [0, 1].map((i) => ({ x: PERCH[i][0], y: PERCH[i][1], at: i, state: 'perch', wait: rnd(2, 6), t: rnd(0, 3), flip: i === 1, lift: 0 })),
    hamsters: [0, 1].map((i) => ({ x: 250 + i * 90, y: 742 + i * 14, state: 'eat', wait: rnd(1, 4), t: rnd(0, 2), flip: i === 1, gx: 0, gy: 0 })),
  };
}
export function stepSmall(sm, dt, hour, rain) {
  const day = hour >= 6 && hour < 19 && rain < 0.5;
  for (const c of sm.canaries) {
    c.t += dt; c.hidden = !day;
    if (c.state === 'fly') {
      c.k = Math.min(1, c.k + dt / c.dur); const e = c.k * c.k * (3 - 2 * c.k);
      c.x = c.x0 + (c.x1 - c.x0) * e; c.y = c.y0 + (c.y1 - c.y0) * e; c.lift = Math.sin(Math.PI * c.k) * 40;
      if (c.k >= 1) { c.state = 'perch'; c.wait = rnd(3, 9); c.lift = 0; }
      continue;
    }
    c.wait -= dt;
    if (c.wait <= 0) {
      let n; do n = (Math.random() * PERCH.length) | 0; while (n === c.at);
      const other = sm.canaries.find((q) => q !== c);
      if (Math.random() < 0.5 && other) n = other.at;      // they like to sit together
      c.at = n; Object.assign(c, { state: 'fly', k: 0, x0: c.x, y0: c.y, x1: PERCH[n][0] + rnd(-8, 8), y1: PERCH[n][1], dur: Math.max(0.8, Math.hypot(PERCH[n][0] - c.x, PERCH[n][1] - c.y) / 220), flip: PERCH[n][0] < c.x });
    }
  }
  for (const h of sm.hamsters) {
    h.t += dt; h.hidden = rain > 0.5;
    if (h.state === 'run') {
      const dx = h.gx - h.x, dy = h.gy - h.y, d = Math.hypot(dx, dy);
      if (d < 1.5) { h.state = Math.random() < 0.6 ? 'eat' : 'still'; h.wait = rnd(1.5, 5); continue; }
      const st = Math.min(d, 46 * dt); h.x += dx / d * st; h.y += dy / d * st; h.flip = dx < 0;
      continue;
    }
    h.wait -= dt;
    if (h.wait <= 0) { h.gx = Math.max(222, Math.min(430, h.x + rnd(-60, 60))); h.gy = Math.max(726, Math.min(770, h.y + rnd(-14, 14))); h.state = 'run'; }
  }
}
export function smallDraws(sm, sp, ctx, view, t) {
  const out = [], put = (img, x, y, flip, lift = 0) => {
    if (!img) return;
    const px = Math.round(x - img.width / 2 - view.x), py = Math.round(y - img.height - lift - view.y);
    if (flip) { ctx.save(); ctx.scale(-1, 1); ctx.drawImage(img, -px - img.width, py); ctx.restore(); } else ctx.drawImage(img, px, py);
  };
  for (const c of sm.canaries) if (!c.hidden) out.push({ y: c.state === 'fly' ? 99999 : c.y, draw: () => put(c.state === 'fly' ? sp.canary.flap[Math.floor(t * 14) % 4] : sp.canary.perch, c.x, c.y, c.flip, c.lift) });
  for (const h of sm.hamsters) if (!h.hidden) out.push({ y: h.y, draw: () => {
    ctx.fillStyle = 'rgba(20,40,20,0.22)'; ctx.fillRect(Math.round(h.x - 6 - view.x), Math.round(h.y - 1 - view.y), 12, 2);
    put(h.state === 'run' ? sp.hamster.run[Math.floor(t * 12) % 2] : h.state === 'eat' ? (Math.floor(t * 3) % 2 ? sp.hamster.eat : sp.hamster.still) : sp.hamster.still, h.x, h.y, h.flip);
  } });
  return out;
}
