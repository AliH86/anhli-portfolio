import {chromium} from '/Users/alihuynh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {writeFile} from 'node:fs/promises';import {fileURLToPath} from 'node:url';
const base=fileURLToPath(new URL('../assets/garden/music/v1/',import.meta.url));
const browser=await chromium.launch({headless:true,channel:'chrome'}),page=await browser.newPage();
await page.goto('http://127.0.0.1:8784/docs/qa/garden-finish-2026-09-14/');await page.waitForFunction(()=>window.gardenScenic?.ready,{},{timeout:45000});
const receipt=[];
for(const [name,w,h,screenX,foot,fraction] of [['desktop',2560,1440,.48,.80,.37],['mobile',1080,1920,.30,.81,.31]]){
 const result=await page.evaluate(async({w,h,screenX,foot,fraction})=>{
  const T=await import('../../../js/vendor/three/three.module.js'),x=window.scenicInspect();
  const visibleFraction=1288/1402,planeHeight=1.7/visibleFraction,viewHeight=1.7/fraction,distance=viewHeight/(2*Math.tan(21*Math.PI/180)),eyeY=(foot-.5)*viewHeight;
  const camera=new T.PerspectiveCamera(42,w/h,.1,100);camera.position.set(0,eyeY,distance);camera.lookAt(0,eyeY,0);camera.updateMatrixWorld();
  const host=x.host.clone(true);host.position.set((screenX-.5)*viewHeight*w/h,.012,0);host.rotation.set(0,0,0);
  const figure=host.getObjectByName('host_illustration');figure.geometry=new T.PlaneGeometry(planeHeight*1122/1402,planeHeight);figure.geometry.translate(0,planeHeight/2-planeHeight*51/1402,0);figure.material=figure.material.clone();figure.material.color.set('#e6ddc9');
  const contact=x.contact.clone();contact.position.set(host.position.x,.018,0);contact.rotation.set(-Math.PI/2,0,0);contact.scale.set(.8,.85,1);
  const scene=new T.Scene();scene.add(host,contact);const renderer=new T.WebGLRenderer({alpha:true,antialias:true,preserveDrawingBuffer:true});renderer.setSize(w,h);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.02;renderer.setClearColor(0,0);renderer.render(scene,camera);
  const image=renderer.domElement.toDataURL('image/png');renderer.dispose();return {image,metrics:{visibleHeightM:planeHeight*visibleFraction,planeHeightM:planeHeight,cameraPosition:camera.position.toArray(),worldPosition:host.position.toArray(),fov:42,frame:[w,h],footY:foot,projectedHeightFraction:fraction,source:'Unchanged approved host RGB+mask; native material tint and contact shadow only',scaleCaveat:'Calibrated placement camera; photographic stall is a visual scale reference, not surveyed geometry'}};
 },{w,h,screenX,foot,fraction});
 await writeFile(base+'host-'+name+'.png',Buffer.from(result.image.split(',')[1],'base64'));receipt.push({name,...result.metrics});
}
await writeFile(base+'host-placement.json',JSON.stringify(receipt,null,2));await browser.close();console.log('Saved unchanged-source host placements at1.70m');
