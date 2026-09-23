import {chromium} from '/Users/alihuynh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {writeFile,mkdir} from 'node:fs/promises';import {fileURLToPath} from 'node:url';import assert from 'node:assert/strict';
const base=process.env.QA_BASE||'http://127.0.0.1:8794/anhli-portfolio/',kind=process.env.QA_KIND||'preflight';
const out=process.env.QA_OUT||fileURLToPath(new URL('../../../website-releases/2026-09-18-v2.1/',import.meta.url));await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,channel:'chrome'}),results=[];
try{
 for(const [name,width,height] of [['desktop',1440,900],['mobile',390,844]]){
  const context=await browser.newContext({viewport:{width,height},isMobile:name==='mobile',hasTouch:name==='mobile'}),p=await context.newPage(),errors=[],failed=[];p.setDefaultTimeout(25000);
  p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text());});p.on('response',r=>{if(r.status()>=400&&r.url().startsWith(base))failed.push({url:r.url(),status:r.status()});});
  await p.goto(base+'?release=v2.1');await p.locator('#entrance-bell').click();await p.waitForFunction(()=>document.body.dataset.entered==='true');
  assert.equal(await p.locator('#audio').evaluate(e=>e.paused&&!e.hasAttribute('src')),true);await p.locator('#daylight-day').click();await p.locator('#ambience-toggle').click();await p.waitForFunction(()=>document.body.dataset.ambientSound==='field-birds');
  await p.locator('.top-nav [data-open=music]').click();assert.equal(await p.locator('[data-album]').count(),28);await p.locator('[data-album]').first().click();assert.equal(await p.locator('#audio').evaluate(e=>e.paused&&!e.hasAttribute('src')),true);
  assert.equal(await p.locator('.album-li').count(),1);assert.ok((await p.locator('.album-li-words').textContent()).length>115);await p.waitForTimeout(650);await p.screenshot({path:out+kind+'-'+name+'-music.png'});
  await p.locator('#main-play').click();await p.waitForFunction(()=>!document.querySelector('#audio').paused&&document.querySelector('#audio').currentTime>1,null,{timeout:30000});assert.equal(await p.locator('#lyrics-field').isVisible(),false);assert.equal(await p.locator('audio').count(),1);
  const elapsed=await p.locator('#audio').evaluate(e=>e.currentTime);await p.evaluate(()=>window.__releaseAudio=document.querySelector('#audio'));await p.locator('.close-room').click();await p.waitForTimeout(750);const after=await p.locator('#audio').evaluate(e=>e.currentTime);assert.ok(after>elapsed);
  await p.locator('#daylight-night').click();await p.waitForFunction(()=>document.body.dataset.ambientSound==='field-crickets');await p.waitForTimeout(350);await p.screenshot({path:out+kind+'-'+name+'-night.png'});
  await p.locator('.top-nav [data-open=profile]').click();await p.locator('.profile-room').waitFor();await p.locator('.profile-room summary').click();assert.equal(await p.locator('.profile-room details').evaluate(e=>e.open),true);await p.locator('.close-room').click();
  await p.locator('.top-nav [data-open=gallery]').click();await p.locator('[data-photo]').first().waitFor();await p.locator('[data-photo]').first().click();await p.keyboard.press('Escape');await p.locator('.close-room').click();
  const details=await p.evaluate(()=>({audioCount:document.querySelectorAll('audio').length,samePlayer:window.__releaseAudio===document.querySelector('#audio'),stillPlaying:!document.querySelector('#audio').paused,lyricsHidden:!document.querySelector('#lyrics-field')||document.querySelector('#lyrics-field').hidden,brokenLoadedImages:[...document.images].filter(i=>i.complete&&i.currentSrc&&!i.naturalWidth).map(i=>i.currentSrc),overflow:document.documentElement.scrollWidth>innerWidth}));
  assert.ok(details.samePlayer&&details.stillPlaying);assert.deepEqual(details.brokenLoadedImages,[]);assert.equal(details.overflow,false);assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
  await p.locator('#ambience-toggle').click();await p.locator('#audio').evaluate(e=>e.pause());results.push({name,base,pass:true,elapsedBeforeClose:elapsed,elapsedAfterClose:after,...details,errors,failed});console.log('PASS '+kind+' '+name);await context.close();
 }
 const p=await browser.newPage();await p.goto(base+'garden-v2/');await p.locator('#entrance-bell').click();await p.waitForFunction(()=>document.body.dataset.entered==='true');results.push({name:'nested garden-v2 path',pass:true});
}finally{await writeFile(out+kind+'-browser-receipt.json',JSON.stringify(results,null,2));await browser.close();}
