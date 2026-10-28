// Shallow rainwater collects in the low dirt patches of the existing painting.
const POOLS = [
  {x:770,y:876,rx:37,ry:9}, {x:588,y:999,rx:34,ry:8},
  {x:328,y:758,rx:25,ry:7}, {x:1023,y:838,rx:21,ry:6},
  {x:780,y:1258,rx:35,ry:8},
];
export function makePuddles(){return {wet:0,rings:[],contacts:new Map(),pools:POOLS};}
export function stepPuddles(w,dt,rain,actors,t){
  w.wet=Math.max(0,Math.min(1,w.wet+dt*(rain>.25?rain/16:-1/180)));
  w.rings=w.rings.filter(r=>(r.age+=dt)<1.1);
  if(w.wet<.08)return;
  POOLS.forEach((p,i)=>{
    if(rain>.25&&Math.random()<dt*rain*3)w.rings.push({x:p.x+(Math.random()-.5)*p.rx,y:p.y+(Math.random()-.5)*p.ry,age:0});
    for(const [j,a] of actors.entries())if(!a.hidden&&!a.perch&&a.state!=='climb'&&((a.x-p.x)/p.rx)**2+((a.y-p.y)/p.ry)**2<1){
      const key=i+':'+j;if(t-(w.contacts.get(key)||-99)>.5){w.contacts.set(key,t);w.rings.push({x:a.x,y:a.y,age:0});}
    }
  });
}
export function drawPuddles(ctx,w,view,t){
  if(w.wet<.03)return;
  ctx.save();
  POOLS.forEach((p,i)=>{
    const k=.35+.65*w.wet,x=Math.round(p.x-view.x),y=Math.round(p.y-view.y),rx=Math.round(p.rx*k),ry=Math.round(p.ry*k);
    // Pixel-stepped margins follow the muddy depressions, without a floating oval edge.
    ctx.globalAlpha=w.wet*.72;ctx.fillStyle='#536f62';
    for(let row=-ry;row<=ry;row+=2){const half=Math.round(rx*Math.sqrt(Math.max(0,1-(row/ry)**2))*(.9+.07*Math.sin(row*2+i)));ctx.fillRect(x-half,y+row,half*2,2);}
    ctx.globalAlpha=w.wet*.5;ctx.fillStyle='#c8dbc0';
    ctx.fillRect(x-Math.round(rx*.6),y-2,Math.round(rx*.75),1);
    ctx.fillRect(x+Math.round(rx*.2),y+3,Math.round(rx*.35),1);
  });
  for(const r of w.rings){const k=r.age/1.1,rx=Math.round(2+9*k),ry=Math.max(1,Math.round(rx*.3));ctx.globalAlpha=(1-k)*w.wet*.6;ctx.strokeStyle='#d3e2c5';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(Math.round(r.x-view.x),Math.round(r.y-view.y),rx,ry,0,0,Math.PI*2);ctx.stroke();}
  ctx.restore();
}
