import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'docs/qa/garden-architecture-2026-09-13');
const {chromium}=await import('/Users/alihuynh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs');
const browser=await chromium.launch({headless:true,channel:'chrome'});
const page=await browser.newPage({viewport:{width:1440,height:1080}}),errors=[],failed=[],checks=[],frames={};
page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push({url:r.url(),status:r.status()});});
async function check(name,fn){try{const result=await fn();checks.push({name,pass:true,result});console.log('PASS',name);}catch(e){checks.push({name,pass:false,error:e.message});console.log('FAIL',name,e.message);}}
await page.goto('http://127.0.0.1:8784/docs/qa/garden-architecture-2026-09-13/');
await page.waitForFunction(()=>window.gardenArchitecture?.ready||window.gardenArchitectureError);
assert.equal(await page.evaluate(()=>window.gardenArchitectureError),undefined);
for(const view of ['a1','a2','a3','mobile','stall','greenhouse','house']){
 await page.locator(`[data-view="${view}"]`).click();await page.waitForFunction(v=>window.gardenArchitecture.view===v,view);await page.waitForTimeout(150);
 frames[view]=await page.evaluate(()=>window.gardenArchitecture);
 await page.locator('#viewport').screenshot({path:path.join(out,view+'.png')});
}
await check('all assets load and roots retain locked x/z',()=>{assert.deepEqual(frames.a1.worldXZ,{house:[-14,-6],stall:[16.5,-4],greenhouse:[8,-13]});assert.equal(frames.a1.loaded.length,4);return frames.a1.worldXZ;});
await check('turntable pivots and six sleeve nodes survive export',()=>{assert(frames.stall.handles.every(h=>h.found));return frames.stall.handles;});
await check('six real catalog covers load',()=>{assert.equal(frames.stall.coverBindings.length,6);assert(frames.stall.coverBindings.every(c=>c.id&&c.cover&&!c.error));return frames.stall.coverBindings;});
await check('A1/A2/portrait contain house, stall and greenhouse',()=>{for(const v of ['a1','a2','mobile'])for(const [name,b] of Object.entries(frames[v].bounds)){assert(b[0]>=0&&b[1]>=0&&b[2]<=1&&b[3]<=1,`${v} ${name} ${b}`);}return Object.fromEntries(['a1','a2','mobile'].map(v=>[v,frames[v].bounds]));});
await check('A3 retains home as orientation cue',()=>{const b=frames.a3.bounds.house;assert(b[2]>0&&b[0]<.35&&b[1]>=0&&b[3]<=1,JSON.stringify(b));return b;});
await check('one canvas; demand rendering; no audio',async()=>{assert.equal(await page.locator('canvas').count(),1);assert.equal(await page.locator('audio').count(),0);const n=await page.evaluate(()=>window.gardenArchitecture.renderCount);await page.waitForTimeout(300);assert.equal(await page.evaluate(()=>window.gardenArchitecture.renderCount),n);});
await check('390px review and 44px controls',async()=>{await page.setViewportSize({width:390,height:844});await page.locator('[data-view="mobile"]').click();await page.waitForTimeout(150);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);for(const b of await page.locator('button').all())assert((await b.boundingBox()).height>=44);await page.screenshot({path:path.join(out,'review-390.png'),fullPage:true});});
await check('reduced motion does not introduce render loop',async()=>{await page.emulateMedia({reducedMotion:'reduce'});const n=await page.evaluate(()=>window.gardenArchitecture.renderCount);await page.waitForTimeout(300);assert.equal(await page.evaluate(()=>window.gardenArchitecture.renderCount),n);});
await check('no preview JavaScript or HTTP asset errors',()=>{assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);});
await check('existing portfolio keeps one audio, real catalog, no autoplay or new asset requests',async()=>{const p=await browser.newPage(),requests=[];p.on('request',r=>requests.push(r.url()));await p.goto('http://127.0.0.1:8784/');await p.waitForFunction(()=>window.dandelionDiagnostics?.().ready);const d=await p.evaluate(()=>window.dandelionDiagnostics());assert.equal(d.audioElements,1);assert(d.albums>=26);assert.equal(d.player.playing,false);assert(!requests.some(u=>/garden-(stall|greenhouse)\.glb/.test(u)));await p.close();return {albums:d.albums,audio:d.audioElements,playing:d.player.playing};});
await check('context loss exposes static fallback',async()=>{await page.locator('canvas').evaluate(c=>c.dispatchEvent(new Event('webglcontextlost',{cancelable:true})));assert(await page.locator('#fallback').isVisible());});
await fs.writeFile(path.join(out,'browser-receipt.json'),JSON.stringify({date:new Date().toISOString(),status:'Architecture milestone checks; not final scenic approval, GPU FPS benchmark or production integration',checks,errors,failed,frames},null,2)+'\n');
await browser.close();if(checks.some(c=>!c.pass))process.exitCode=1;
