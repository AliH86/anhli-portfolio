import {chromium} from '/Users/alihuynh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {writeFile} from 'node:fs/promises';import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {legacy} from '../js/redesign/legacy-about.mjs';
const base='http://127.0.0.1:8784/',out=new URL('../docs/qa/about-2026-09-14/',import.meta.url);
const browser=await chromium.launch({headless:true,channel:'chrome'}),checks=[],errors=[];
try{
 const ctx=await browser.newContext({viewport:{width:1440,height:900}}),p=await ctx.newPage(),requests=[];
 p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>requests.push(r.url()));
 for(const route of ['','sap/','about/','flat/','sky/']){
  await p.goto(base+route);await p.waitForFunction(()=>window.dandelionDiagnostics?.().ready);
  assert.deepEqual(await p.locator('.dg-nav a').allTextContents(),['GARDEN','MUSIC','ABOUT']);
  assert.equal(await p.locator('audio').count(),1);assert(await p.locator('#dgMain h1').isVisible());
 }
 checks.push('5 direct routes, 3 destinations, one shared player');
 for(const route of ['works/','works/how/','visual/','story/']){await p.goto(base+route);await p.waitForURL('**/about/**');assert(await p.locator('.dg-about h1').isVisible());}
 assert(!requests.some(u=>/shows-scene|shows-view|assets\/garden\/shows/.test(u)));checks.push('Retired routes redirect to About; no Shows art/code downloads');
 await p.goto(base+'about/');await p.waitForFunction(()=>window.dandelionDiagnostics?.().ready);
 assert.equal(await p.locator('.dg-resume li').count(),legacy.WORK.length);assert.equal(await p.locator('[data-about-video]').count(),legacy.VIDEOS.length);
 assert.equal(await p.locator('[data-media]').count(),18);assert.equal(await p.locator('#dgLightboxMedia iframe').count(),0);
 await p.locator('[data-gallery-filter="Khoảnh khắc"]').click();
 while(await p.locator('[data-gallery-more]').isVisible())await p.locator('[data-gallery-more]').click();
 assert.equal(await p.locator('[data-media]').count(),legacy.GALLERY.filter(g=>g.tag==='Khoảnh khắc').length);
 await p.locator('[data-media]').first().click();assert(await p.locator('#dgLightbox').evaluate(d=>d.open));
 await p.keyboard.press('Escape');await p.waitForFunction(()=>!document.querySelector('#dgLightboxMedia').childElementCount);
 assert(await p.evaluate(()=>document.activeElement.hasAttribute('data-media')));
 checks.push('Legacy résumé/videos preserved; gallery filter/load-more and keyboard lightbox work');
 await p.locator('.dg-nav [data-dg-route="music"]').click();await p.locator('.dg-track').first().click();
 await p.waitForFunction(()=>!document.querySelector('audio').paused&&document.querySelector('audio').currentTime>.2);
 const src=await p.locator('audio').evaluate(a=>a.currentSrc);
 await p.locator('.dg-nav [data-dg-route="about"]').click();assert.equal(await p.locator('audio').evaluate(a=>a.currentSrc),src);assert.equal(await p.locator('audio').evaluate(a=>a.paused),false);
 await p.locator('[data-gallery-filter="Motion"]').click();assert.equal(await p.locator('[data-media]').count(),10);
 await p.locator('[data-media]').first().click();const vid=p.locator('#dgLightboxMedia video');assert(await vid.evaluate(v=>v.paused));
 await vid.evaluate(v=>v.play());await p.waitForFunction(()=>document.querySelector('audio').paused);await p.keyboard.press('Escape');
 await p.waitForFunction(()=>!document.querySelector('#dgLightboxMedia video'));checks.push('Music survives navigation; motion video starts only on user action and pauses music; close disposes video');
 await p.route('https://player.vimeo.com/**',r=>r.fulfill({status:200,contentType:'text/html',body:'<p>Embed transport fixture</p>'}));
 await p.locator('[data-about-video="0"]').click();assert.match(await p.locator('#dgLightboxMedia iframe').getAttribute('src'),/player.vimeo.com/);
 await p.keyboard.press('Escape');await p.waitForFunction(()=>!document.querySelector('#dgLightboxMedia iframe'));checks.push('External embed click/cleanup verified with fixture; third-party playback not certified');
 await p.locator('.dg-map-button').click();assert.equal(await p.locator('.dg-map-destination').count(),3);await p.keyboard.press('Escape');
 await p.locator('.dg-about .dg-back').click();assert.equal(await p.locator('.dg-hotspot').count(),2);
 await p.locator('.dg-nav [data-dg-route="about"]').click();await p.goBack();assert.equal(await p.locator('#dgApp').getAttribute('data-route'),'garden');await p.goForward();assert.equal(await p.locator('#dgApp').getAttribute('data-route'),'about');
 checks.push('MAP, two Garden destinations, history and return work');await ctx.close();
 for(const [w,h] of [[390,844],[768,1024],[1440,900]]){
  const c=await browser.newContext({viewport:{width:w,height:h},hasTouch:w<1000,isMobile:w<700}),page=await c.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'about/');await page.waitForFunction(()=>window.dandelionDiagnostics?.().ready);await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  await page.screenshot({path:fileURLToPath(new URL(`about-${w}.png`,out))});
  await page.locator('#about-gallery').scrollIntoViewIfNeeded();await page.locator('.dg-gallery-frame img').first().evaluate(i=>i.decode());
  await page.screenshot({path:fileURLToPath(new URL(`gallery-${w}.png`,out))});checks.push(`About and gallery layout ${w}×${h}`);await c.close();
 }
 const c=await browser.newContext({javaScriptEnabled:false}),n=await c.newPage();await n.goto(base+'about/');assert.equal(await n.locator('.dg-resume li').count(),5);assert.equal(await n.locator('[data-about-video]').count(),18);checks.push('About résumé and video links available without JavaScript');await c.close();
 assert.deepEqual(errors,[]);await writeFile(new URL('receipt.json',out),JSON.stringify({checks,errors,media:{gallery:legacy.GALLERY.length,videos:legacy.VIDEOS.length},scope:'Chrome emulation, external embeds tested with fixture; no physical device or all-provider playback certification'},null,2));console.log(JSON.stringify({passed:checks.length,errors}));
}finally{await browser.close();}
