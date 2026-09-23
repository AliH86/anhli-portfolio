import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const {chromium}=await import(process.env.GARDEN_PLAYWRIGHT_MODULE||'playwright');
const base=process.env.GARDEN_TEST_URL||'http://127.0.0.1:8772/';
const out=path.join(root,'docs/ui-redesign-2026-09-12/evidence/implementation');
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,channel:'chrome'});
const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage();
const errors=[],requests=[],checks=[];
page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
async function check(name,fn){try{const result=await fn();checks.push({name,pass:true,result});console.log('PASS',name);}catch(e){checks.push({name,pass:false,error:e.message});console.log('FAIL',name,e.message);}}
async function go(suffix='',p=page){const response=await p.goto(base+suffix,{waitUntil:'load'});assert.equal(response.status(),200);await p.waitForFunction(()=>window.dandelionDiagnostics?.().ready);}
async function shot(name,p=page){await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:path.join(out,name+'.png'),fullPage:true});}
await check('eight direct static routes; readable headings; one audio; no world load',async()=>{
  for(const route of ['','sap/','works/','works/how/','visual/','story/','sky/','flat/']){
    await go(route);assert.equal(await page.locator('#dgMain h1').count(),1);assert.equal(await page.locator('#audioEl').count(),1);
    assert(await page.locator('#dgMain h1').isVisible());assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  }
  assert(!requests.some(u=>/scene\.runtime|vendor\/three|\.glb(?:\?|$)/.test(u)));
});
await check('navigation, refresh, back and forward preserve URL and state',async()=>{
  await go();await page.locator('.dg-nav [data-dg-route="shows"]').click();assert.equal(new URL(page.url()).pathname,new URL(base+'works/').pathname);
  await page.locator('.dg-service [data-dg-route="how"]').first().click();assert.match(page.url(),/works\/how\/$/);
  await page.goBack();assert.equal(await page.locator('#dgApp').getAttribute('data-route'),'shows');await page.goForward();assert.equal(await page.locator('#dgApp').getAttribute('data-route'),'how');
  await page.reload();await page.waitForFunction(()=>window.dandelionDiagnostics?.().ready);assert.equal(await page.locator('#dgApp').getAttribute('data-route'),'how');
});
await check('MAP available on all states; dialog focus stays inside and returns',async()=>{
  await go('story/');const button=page.locator('.dg-map-button');await button.click();assert(await page.locator('#dgMap').evaluate(d=>d.open));
  for(let i=0;i<18;i++){await page.keyboard.press('Tab');assert(await page.evaluate(()=>document.activeElement.closest('#dgMap')!==null));}
  await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement.className),'dg-map-button');
  assert.equal(await page.locator('#dgApp').getAttribute('data-route'),'story');
  await page.keyboard.press('m');await page.locator('#dgMap [data-dg-route="music"]').click();assert.equal(await page.locator('#dgApp').getAttribute('data-route'),'music');
  assert.equal(await page.locator('#dgMap').evaluate(d=>d.open),false);
});
await check('catalog contains 26 real albums; selection never autoplays',async()=>{
  await go('sap/');assert.equal(await page.locator('#dgAlbumSelect option').count(),26);await page.selectOption('#dgAlbumSelect','local-vi-muoi-man');
  assert.equal(await page.locator('.dg-track').count(),8);assert(await page.locator('#audioEl').evaluate(a=>a.paused));
  await page.reload();await page.waitForFunction(()=>window.dandelionDiagnostics?.().ready);assert.equal(await page.locator('#dgAlbumSelect').inputValue(),'local-vi-muoi-man');
});
await check('real audio plays; survives every route and MAP; pause, seek and mute work',async()=>{
  await go('sap/');await page.locator('.dg-track').first().click();
  await page.waitForFunction(()=>!document.querySelector('#audioEl').paused&&document.querySelector('#audioEl').currentTime>.3,{},{timeout:30000});
  const src=await page.locator('#audioEl').evaluate(a=>a.currentSrc);
  await page.locator('#dgSeek').focus();await page.keyboard.press('ArrowRight');
  const before=await page.locator('#audioEl').evaluate(a=>a.currentTime);assert(before>=1);
  for(const route of ['shows','visual','story','garden']){await page.locator('.dg-nav [data-dg-route="'+route+'"]').click();assert.equal(await page.locator('#audioEl').evaluate(a=>a.currentSrc),src);assert.equal(await page.locator('#audioEl').evaluate(a=>a.paused),false);}
  await page.locator('.dg-map-button').click();await page.locator('#dgMap [data-dg-route="flat"]').click();assert.equal(await page.locator('#audioEl').evaluate(a=>a.paused),false);
  await page.locator('#dgMini [data-action="mute"]').click();assert(await page.locator('#audioEl').evaluate(a=>a.muted));
  await page.locator('#dgMini [data-action="play"]').click();assert(await page.locator('#audioEl').evaluate(a=>a.paused));
  await page.locator('#dgMini [data-dg-route="music"]').click();assert.equal(await page.locator('#audioEl').evaluate(a=>a.currentSrc),src);
  return {source:src,currentTime:await page.locator('#audioEl').evaluate(a=>a.currentTime)};
});
await check('artwork images load; lightbox and chapter keyboard interactions',async()=>{
  await go('visual/');await page.locator('.dg-fragment img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode())));
  await page.locator('[data-fragment="1"]').click();assert(await page.locator('#dgLightbox').evaluate(d=>d.open));await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement.dataset.fragment),'1');
  await page.locator('.dg-nav [data-dg-route="story"]').click();await page.locator('.dg-chapter summary').first().click();await page.keyboard.press('ArrowRight');assert(await page.locator('.dg-chapter').nth(1).evaluate(d=>d.open));await page.keyboard.press('Escape');assert.equal(await page.locator('.dg-chapter[open]').count(),0);
});
await check('Sky reuses existing Vedic node and loads its engine',async()=>{
  await go('sky/');assert.equal(await page.locator('#dgSkySlot #vedic').count(),1);assert(await page.locator('#vdApp').isVisible());
  await page.waitForFunction(()=>[...document.scripts].some(s=>s.src.includes('vedic-chart.js')));
  await page.locator('.dg-nav [data-dg-route="story"]').click();assert.equal(await page.locator('#portfolioLegacy #vedic').count(),1);
});
for(const size of [{width:390,height:844},{width:768,height:1024},{width:1280,height:800}]) await check('responsive '+size.width,async()=>{
  const c=await browser.newContext({viewport:size,hasTouch:size.width<1000,isMobile:size.width<700});const p=await c.newPage();
  for(const [name,route] of [['arrival',''],['music','sap/'],['shows','works/'],['visual','visual/'],['story','story/'],['flat','flat/']]){
    await go(route,p);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
    const r=await p.locator('.dg-map-button').boundingBox();assert(r.width>=44&&r.height>=44);await shot(name+'-'+size.width,p);
  }
  await p.locator('.dg-map-button').click();await p.locator('#dgMap [data-dg-route="garden"]').click();assert.equal(await p.locator('#dgApp').getAttribute('data-view'),'explore');await shot('explore-'+size.width,p);await c.close();
});
await check('no-JavaScript flat and music are readable with working route anchors',async()=>{
  const c=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}}),p=await c.newPage();
  await p.goto(base+'flat/');assert(await p.locator('#dgMain h1').isVisible());await p.locator('.dg-flat [data-dg-route="music"]').click();assert(await p.locator('.dg-track').count()>0);assert.equal(await p.locator('#portfolioLegacy').isVisible(),false);await c.close();
});
await check('reduced motion stops UI transitions',async()=>{
  await page.emulateMedia({reducedMotion:'reduce'});await go('visual/');assert.equal(await page.locator('.dg-fragment img').first().evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
});
await check('no page JavaScript errors',async()=>assert.deepEqual(errors,[]));
for(const [name,route] of [['arrival',''],['shows','works/'],['how','works/how/'],['music','sap/'],['visual','visual/'],['story','story/'],['flat','flat/']]){await go(route);await shot(name+'-desktop');}
await page.locator('.dg-map-button').click();await shot('map-desktop');
await fs.writeFile(path.join(out,'ui-receipt.json'),JSON.stringify({date:new Date().toISOString(),base,checks,errors},null,2));
await browser.close();if(checks.some(c=>!c.pass))process.exitCode=1;
