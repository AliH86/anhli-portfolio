import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const {chromium}=await import(process.env.GARDEN_PLAYWRIGHT_MODULE||'/Users/alihuynh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs');
const base=process.env.GARDEN_TEST_URL||'http://127.0.0.1:8784/';
const out=path.join(root,'docs/qa/garden-proof');
const numeric=JSON.parse(await fs.readFile(path.join(out,'projection-receipt.json')));
const browser=await chromium.launch({headless:true,channel:'chrome'});
const page=await browser.newPage({viewport:{width:1440,height:1100}});
const errors=[],checks=[],frames={};page.on('pageerror',e=>errors.push(e.message));
async function check(name,fn){try{const result=await fn();checks.push({name,pass:true,result});console.log('PASS',name);}catch(e){checks.push({name,pass:false,error:e.message});console.log('FAIL',name,e.message);}}
await page.goto(base+'docs/qa/garden-proof/');await page.waitForFunction(()=>window.gardenStudy);
for(const mode of ['a1','locked-mobile','retreat-mobile','wide-mobile']){
  await page.locator(`[data-mode="${mode}"]`).click();
  await page.waitForFunction(m=>window.gardenStudy.mode===m,mode);
  frames[mode]=await page.evaluate(()=>window.gardenStudy);
  await page.locator('#viewport').screenshot({path:path.join(out,'study-'+mode+'.png')});
}
await check('Blender GLB projections agree with independent NumPy A1 calculation',async()=>{
  const deviations={};
  for(const [name,item] of Object.entries(numeric.envelopes)){
    deviations[name]=Math.max(...item.projectedRect.map((n,i)=>Math.abs(n-frames.a1.bounds[name][i])));
    assert(deviations[name]<1e-5,`${name}: ${deviations[name]}`);
  }return deviations;
});
await check('mobile 52-degree unchanged-pose failure reproduced in actual GLB',async()=>{
  const b=frames['locked-mobile'].bounds;assert(b.house[0]+b.house[2]<0,'house expected wholly beyond left edge');assert(b.stall[0]>1,'stall expected wholly beyond right edge');return b;
});
await check('diagnostic mobile alternatives contain house and stall',async()=>{
  for(const mode of ['retreat-mobile','wide-mobile'])for(const name of ['house','stall']){const [x,y,w,h]=frames[mode].bounds[name];assert(x>=0&&x+w<=1&&y>=0&&y+h<=1,mode+' '+name);}
});
await check('study uses one canvas and no idle render loop',async()=>{
  assert.equal(await page.locator('canvas').count(),1);const before=await page.evaluate(()=>window.gardenStudy.renderCount);
  await page.waitForTimeout(250);assert.equal(await page.evaluate(()=>window.gardenStudy.renderCount),before);
});
await check('review page fits 390px and controls meet 44px target height',async()=>{
  await page.setViewportSize({width:390,height:844});await page.locator('[data-mode="locked-mobile"]').click();
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  for(const button of await page.locator('button').all())assert((await button.boundingBox()).height>=44);
  await page.screenshot({path:path.join(out,'review-390.png'),fullPage:true});
});
await check('no JavaScript errors in study',async()=>assert.deepEqual(errors,[]));
await page.setViewportSize({width:1440,height:1100});await page.locator('[data-mode="a1"]').click();await page.screenshot({path:path.join(out,'review-desktop.png'),fullPage:true});
await check('existing portfolio still exposes one player and real catalog without study GLB loading',async()=>{
 const p=await browser.newPage(),requests=[];p.on('request',r=>requests.push(r.url()));await p.goto(base);await p.waitForFunction(()=>window.dandelionDiagnostics?.().ready);
 const d=await p.evaluate(()=>window.dandelionDiagnostics());assert.equal(d.audioElements,1);assert(d.albums>=26);assert.equal(d.player.playing,false);assert(!requests.some(u=>u.includes('garden-space-study')));
 await p.close();return {albums:d.albums,audioElements:d.audioElements,playing:d.player.playing};
});
const receipt={date:new Date().toISOString(),status:'Diagnostic QA only; expected composition failure is reproduced, not accepted',checks,errors,frames};
await fs.writeFile(path.join(out,'browser-receipt.json'),JSON.stringify(receipt,null,2)+'\n');await browser.close();
if(checks.some(c=>!c.pass))process.exitCode=1;
