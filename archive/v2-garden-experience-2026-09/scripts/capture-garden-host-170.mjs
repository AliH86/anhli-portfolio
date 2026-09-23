import {fileURLToPath} from 'node:url';
import {writeFile,mkdir} from 'node:fs/promises';
import {chromium} from '/Users/alihuynh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
const base=fileURLToPath(new URL('../',import.meta.url)),out=base+'assets/garden/production/stills/2026-09-14-wind/';await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,channel:'chrome'}),page=await browser.newPage({viewport:{width:1480,height:1100}}),receipt=[];
await page.goto('http://127.0.0.1:8784/docs/qa/garden-finish-2026-09-14/');await page.waitForFunction(()=>window.gardenScenic?.ready,{},{timeout:45000});
for(const view of ['arrival','mobile']){
 await page.locator('[data-view='+view+']').click();await page.waitForTimeout(150);
 const result=await page.evaluate(async(view)=>{
  const x=window.scenicInspect(),T=await import('../../../js/vendor/three/three.module.js');
  const mask=x.figure.material.alphaMap.image,c=document.createElement('canvas');c.width=mask.width;c.height=mask.height;const ctx=c.getContext('2d');ctx.drawImage(mask,0,0);const pixels=ctx.getImageData(0,0,c.width,c.height).data;
  let top=c.height,bottom=0;for(let y=0;y<c.height;y++){let count=0;for(let i=0;i<c.width;i++)if(pixels[(y*c.width+i)*4+1]>=133)count++;if(count>2){top=Math.min(top,y);bottom=y;}}
  const visibleFraction=(bottom-top+1)/c.height,planeHeight=1.7/visibleFraction;
  const host=x.host.clone(true),figure=host.getObjectByName('host_illustration');
  figure.geometry=new T.PlaneGeometry(planeHeight*c.width/c.height,planeHeight);figure.geometry.translate(0,planeHeight/2-planeHeight*(c.height-bottom-1)/c.height,0);
  const hostX=9.4,hostZ=16.2,ray=new T.Raycaster(new T.Vector3(hostX,30,hostZ),new T.Vector3(0,-1,0));
  const ground=ray.intersectObject(x.assets['landscape-finish'],true).find(h=>/Meadow_base/.test(h.object.name));if(!ground)throw Error('No host ground');
  host.position.set(hostX,ground.point.y+.012,hostZ);host.rotation.y=Math.atan2(x.camera.position.x-hostX,x.camera.position.z-hostZ);
  const contact=x.contact.clone();contact.position.set(hostX,ground.point.y+.018,hostZ);contact.rotation.z=-host.rotation.y;
  const scene=new T.Scene();scene.add(host,contact);scene.updateMatrixWorld(true);
  const r=new T.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});r.setSize(...(view==='arrival'?[2560,1440]:[1080,1920]));r.outputColorSpace=x.renderer.outputColorSpace;r.toneMapping=x.renderer.toneMapping;r.toneMappingExposure=x.renderer.toneMappingExposure;r.setClearColor(0,0);r.render(scene,x.camera);
  const project=v=>{const p=v.project(x.camera);return [(p.x+1)/2,(1-p.y)/2];};
  const foot=project(host.position.clone()),head=project(host.position.clone().add(new T.Vector3(0,1.7,0)));
  const data={view,targetVisibleHeightM:1.7,sourceMask:{width:c.width,height:c.height,top,bottom,visibleFraction},previousVisibleHeightM:1.94*visibleFraction,fullPlaneHeightM:planeHeight,worldPosition:host.position.toArray(),previousWorldPosition:x.host.position.toArray(),previousDistanceM:x.camera.position.distanceTo(x.host.position),distanceM:x.camera.position.distanceTo(host.position),foot,head,projectedHeightFraction:foot[1]-head[1],pixelSize:[r.domElement.width,r.domElement.height],projection:'Original authored camera; photographic plate remains an approximate visual reference, not surveyed geometry.'};
  const layer=r.domElement.toDataURL('image/png');r.dispose();return {data,layer};
 },view);
 await writeFile(out+view+'-host-170.png',Buffer.from(result.layer.split(',')[1],'base64'));receipt.push(result.data);
}
await writeFile(out+'host-scale-receipt.json',JSON.stringify(receipt,null,2));console.log(JSON.stringify(receipt,null,2));await browser.close();
