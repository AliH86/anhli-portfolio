import { loadImage } from './network.js?v=3506';
export async function loadPond(ground) {
 const {createPond}=await import('./pond-three.js?v=3506');
 const waterBox={x:550,y:1002,w:520,h:218}, {x,y,w,h}=waterBox;
 const c=document.createElement('canvas');c.width=w;c.height=h;const q=c.getContext('2d');q.drawImage(ground,-x,-y);
 const src=q.getImageData(0,0,w,h).data,waterMask=new Uint8Array(w*h);
 for(let Y=0;Y<h;Y++)for(let X=0;X<w;X++){
  const i=(Y*w+X)*4,r=src[i],g=src[i+1],b=src[i+2];
  if([[705,1120,163,96],[955,1047,103,49]].some(e=>((x+X-e[0])/e[2])**2+((y+Y-e[1])/e[3])**2<1)&&b>=r+6&&g>=r+4&&g+b>r*2+8)waterMask[Y*w+X]=1;
 }
 return createPond({load:path=>loadImage(path.replace('assets/','./art-v34/')),waterMask,waterBox});
}
