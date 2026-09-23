import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'docs/qa/garden-host-2026-09-13');
const {chromium}=await import('/Users/alihuynh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs');
const browser=await chromium.launch({headless:true,channel:'chrome'});
const page=await browser.newPage({viewport:{width:1440,height:1060}}),errors=[],failed=[],checks=[];
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)failed.push({url:r.url(),status:r.status()});});
async function check(name,fn){try{const result=await fn();checks.push({name,pass:true,result});console.log('PASS',name);}catch(e){checks.push({name,pass:false,error:e.message});console.log('FAIL',name,e.message);}}
await page.goto('http://127.0.0.1:8784/docs/qa/garden-host-2026-09-13/');
await page.waitForFunction(()=>window.gardenScenic?.ready||window.gardenScenicError,{},{timeout:45000});
await check('four assets load with fixed landmark coordinates',async()=>{
 assert.equal(await page.evaluate(()=>window.gardenScenicError),undefined);
 assert.deepEqual(await page.evaluate(()=>window.gardenScenic.worldXZ),{'house-scenic':[-14,-6],stall:[16.5,-4],greenhouse:[8,-13]});
 assert.equal(await page.evaluate(()=>Object.keys(window.scenicInspect().assets).length),4);
});
await check('exported geometry has water 0.65m below finished veranda',async()=>{
 const result=await page.evaluate(async()=>{const T=await import('/js/vendor/three/three.module.js');const {assets,layout}=window.scenicInspect();let water;assets['landscape-scenic'].traverse(o=>{if(o.isMesh&&/water/i.test(o.material?.name))water=o;});const box=new T.Box3().setFromObject(water,true);return {waterMin:box.min.y,waterMax:box.max.y,porch:layout.porchFinishedLevel};});
 assert(Math.abs(result.waterMax-result.waterMin)<.001);assert(Math.abs(result.porch-result.waterMax-.65)<.001);return result;
});
await check('seated veranda ray reaches lake without garden obstruction',async()=>{
 const result=await page.evaluate(async()=>{const T=await import('/js/vendor/three/three.module.js');const {assets,layout}=window.scenicInspect();const from=new T.Vector3(...layout.verandaViewpoint),to=new T.Vector3(-26,layout.waterLevel,19);const ray=new T.Raycaster(from,to.clone().sub(from).normalize(),.05,from.distanceTo(to)+1);return ray.intersectObjects(Object.values(assets),true).slice(0,3).map(h=>({name:h.object.name,material:h.object.material.name,distance:h.distance}));});
 assert(result.length>0);assert(/water/i.test(result[0].material),JSON.stringify(result));return result;
});
await check('yard has no tree or shrub trunks; water marker lies within lake',async()=>{
 const d=JSON.parse(await fs.readFile(path.join(out,'landscape-layout.json'),'utf8'));
 for(const [x,z] of [...d.trees,...d.shrubs])assert(!(x>=-6&&x<=8&&z>=2&&z<=12));
 const [x,z]=d.waterXZ;let inside=false;for(let i=0,j=d.lakePolygon.length-1;i<d.lakePolygon.length;j=i++){const [a,b]=d.lakePolygon[i],[c,e]=d.lakePolygon[j];if((b>z)!==(e>z)&&x<(c-a)*(z-b)/(e-b)+a)inside=!inside;}
 assert(inside);return {trees:d.trees.length,shrubs:d.shrubs.length,grassClumps:d.grassClumps};
});
await check('host visible at arrival, close view and portrait with grounded feet',async()=>{
 const results={};for(const v of ['arrival','host','mobile']){await page.locator('[data-view='+v+']').click();await page.waitForTimeout(130);const d=await page.evaluate(()=>window.gardenScenic);assert(d.host.visible);const b=d.host.bounds;assert(b[0]>=0&&b[1]>=0&&b[2]<=1&&b[3]<=1);assert(b[3]-b[1]>.12);assert(Math.abs(d.host.position[1]-d.host.ground-.012)<.0001);results[v]=d.host;}
 return results;
});
await check('one canvas, six real covers, no audio and no idle rendering',async()=>{
 assert.equal(await page.locator('canvas').count(),1);assert.equal(await page.locator('audio').count(),0);assert.equal(await page.evaluate(()=>window.gardenScenic.covers.length),6);
 await page.waitForTimeout(100);const n=await page.evaluate(()=>window.gardenScenic.renderCount);await page.waitForTimeout(350);assert.equal(await page.evaluate(()=>window.gardenScenic.renderCount),n);
});
await check('390px review fits; controls support touch and reduced motion',async()=>{
 await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(200);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);for(const b of await page.locator('button').all())assert((await b.boundingBox()).height>=44);
 const n=await page.evaluate(()=>window.gardenScenic.renderCount);await page.waitForTimeout(300);assert.equal(await page.evaluate(()=>window.gardenScenic.renderCount),n);await page.screenshot({path:path.join(out,'review-390.png'),fullPage:true});
});
await check('review has no JavaScript, shader or HTTP errors',()=>{assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);});
await check('portfolio retains actual catalog, one stopped player and no scenic asset loads',async()=>{
 const p=await browser.newPage(),requests=[];p.on('request',r=>requests.push(r.url()));await p.goto('http://127.0.0.1:8784/');await p.waitForFunction(()=>window.dandelionDiagnostics?.().ready);const d=await p.evaluate(()=>window.dandelionDiagnostics());assert.equal(d.audioElements,1);assert(d.albums>=26);assert.equal(d.player.playing,false);assert(!requests.some(u=>/garden-(house-scenic|landscape-scenic)\.glb/.test(u)));await p.close();return {albums:d.albums,audio:d.audioElements,playing:d.player.playing};
});
await check('context loss exposes working static image fallback',async()=>{
 await page.locator('canvas').evaluate(c=>c.dispatchEvent(new Event('webglcontextlost',{cancelable:true})));assert(await page.locator('#fallback').isVisible());for(const a of await page.locator('#fallback a').all()){const response=await page.request.get(new URL(await a.getAttribute('href'),page.url()).href);assert(response.ok());}
});
await check('unavailable WebGL exposes fallback without unhandled exception',async()=>{
 const p=await browser.newPage();await p.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return /webgl/.test(type)?null:original.call(this,type,...args);};});await p.goto('http://127.0.0.1:8784/docs/qa/garden-host-2026-09-13/');await p.waitForFunction(()=>window.gardenScenicError);assert(await p.locator('#fallback').isVisible());await p.screenshot({path:path.join(out,'no-webgl.png')});await p.close();
});
await fs.writeFile(path.join(out,'browser-receipt.json'),JSON.stringify({date:new Date().toISOString(),status:'Scenic development QA; not final visual approval or actual-device GPU benchmark',checks,errors,failed},null,2)+'\n');
await browser.close();if(checks.some(c=>!c.pass))process.exitCode=1;
