import {chromium} from '/Users/alihuynh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {readFile,writeFile,mkdir} from 'node:fs/promises';import {fileURLToPath} from 'node:url';import assert from 'node:assert/strict';
const base='http://127.0.0.1:8791/',out=fileURLToPath(new URL('../qa/v2.1-review-2026-09-18/',import.meta.url));
await mkdir(out,{recursive:true});
const catalog=JSON.parse(await readFile(new URL('../dist/data/catalog.json',import.meta.url)));
const wav=Buffer.alloc(44+8000*2*70);wav.write('RIFF');wav.writeUInt32LE(wav.length-8,4);wav.write('WAVEfmt ',8);wav.writeUInt32LE(16,16);wav.writeUInt16LE(1,20);wav.writeUInt16LE(1,22);wav.writeUInt32LE(8000,24);wav.writeUInt32LE(16000,28);wav.writeUInt16LE(2,32);wav.writeUInt16LE(16,34);wav.write('data',36);wav.writeUInt32LE(wav.length-44,40);
const browser=await chromium.launch({headless:true,channel:'chrome'}),results=[];let current;
async function setup(viewport={width:1440,height:900},phase='day',options={}){
 const context=await browser.newContext({viewport,timezoneId:'Asia/Ho_Chi_Minh',...options}),p=await context.newPage();current=p;p.setDefaultTimeout(10000);
 const errors=[],failed=[],requests=[];p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400&&r.url().startsWith(base))failed.push(r.url());});p.on('request',r=>requests.push(r.url()));
 await p.clock.setFixedTime(new Date(`2026-09-17T${phase==='day'?'10':'21'}:00:00+07:00`));
 await p.addInitScript(()=>{window.__qaLongTasks=[];new PerformanceObserver(list=>window.__qaLongTasks.push(...list.getEntries().map(e=>({start:e.startTime,duration:e.duration})))).observe({type:'longtask',buffered:true});});
 await p.route(new RegExp('^'+new URL(catalog[0].tracks[0].url).origin.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'/'),route=>route.fulfill({status:200,contentType:'audio/wav',body:wav}));
 return {context,p,errors,failed,requests};
}
async function enter(p){await p.goto(base);await p.waitForFunction(()=>document.querySelector('#entrance').dataset.state==='ready');assert.equal(await p.locator('#entrance').isVisible(),true);await p.locator('#entrance-bell').click();await p.waitForFunction(()=>document.body.dataset.entered==='true');}
async function open(p,name){await p.locator(`.top-nav [data-open=${name}]`).click();await p.waitForFunction(n=>document.body.dataset.room===n,name);}
async function close(p){await p.locator('.close-room').click();await p.waitForFunction(()=>!document.querySelector('#room-dialog').open);await p.waitForTimeout(100);}
async function hostClear(p,label){
 const overlaps=await p.evaluate(()=>{
  const h=document.querySelector('#host').getBoundingClientRect(),d=document.querySelector('.music-deck'),clip=d&&getComputedStyle(d).display!=='contents'?d.getBoundingClientRect():{left:0,top:0,right:innerWidth,bottom:innerHeight};
  return [...document.querySelectorAll('.album-controls,.music-object,.track-queue,.shelf-block,.album-greeting')].filter(e=>!e.hidden&&getComputedStyle(e).display!=='none').map(e=>{
   const r=e.getBoundingClientRect(),c=e.closest('.music-deck')?clip:{left:0,top:0,right:innerWidth,bottom:innerHeight};
   return {name:e.className,w:Math.min(r.right,h.right,c.right)-Math.max(r.left,h.left,c.left),h:Math.min(r.bottom,h.bottom,c.bottom)-Math.max(r.top,h.top,c.top)};
  }).filter(x=>x.w>1&&x.h>1);
 });assert.deepEqual(overlaps,[],label+' must leave host clear');
}
async function test(name,run){try{const detail=await run();results.push({name,pass:true,...detail});console.log('PASS '+name);}catch(e){results.push({name,pass:false,error:e.message});if(current)await current.screenshot({path:out+'FAIL-'+name.replace(/[^a-z0-9]/gi,'-')+'.png'}).catch(()=>{});console.log('FAIL '+name+' '+e.message);throw e;}finally{await writeFile(out+'browser-tests.json',JSON.stringify(results,null,2));}}
try{
for(const [name,width,height] of [['desktop',1440,900],['tablet',834,1112],['mobile',390,844]])for(const phase of ['day','night'])await test(`${name} ${phase} interaction matrix`,async()=>{
 const f=await setup({width,height},phase,{isMobile:name==='mobile',hasTouch:name!=='desktop'}),{p}=f;
 await p.goto(base);await p.waitForFunction(()=>document.querySelector('#entrance').dataset.state==='ready');assert.equal(await p.locator('body').getAttribute('data-day-phase'),phase);
 await p.keyboard.press('Tab');assert.equal(await p.locator('#entrance-bell').evaluate(e=>e===document.activeElement),true);
 assert.equal(f.requests.some(u=>u.includes('/assets/ambience/')),false);assert.equal(await p.locator('#audio').evaluate(e=>e.hasAttribute('src')),false);
 await p.screenshot({path:out+`${name}-${phase}-gate.png`});
 const start=Date.now();await p.locator('#entrance-bell').click();await p.waitForFunction(()=>document.body.dataset.entered==='true');const revealMs=Date.now()-start;assert.ok(revealMs<1000,`reveal ${revealMs}ms`);
 assert.equal(await p.locator('#audio').evaluate(e=>e.paused),true);await p.screenshot({path:out+`${name}-${phase}-world.png`});
 await open(p,'music');await p.locator('[data-album]').first().click();await p.waitForTimeout(520);await hostClear(p,'browse');assert.equal(await p.locator('#audio').evaluate(e=>e.hasAttribute('src')),false);
 const trackGeometry=await p.locator('.track-button').evaluateAll(es=>es.slice(0,2).map(e=>({x:e.getBoundingClientRect().x,y:e.getBoundingClientRect().y})));assert.equal(trackGeometry[0].x,trackGeometry[1].x);assert.ok(trackGeometry[1].y>trackGeometry[0].y);
 if(name==='desktop'){const gap=await p.evaluate(()=>document.querySelector('#album-introduction').getBoundingClientRect().top-document.querySelector('#album-art').getBoundingClientRect().bottom);assert.ok(gap>=0&&gap<=20,'Li introduction should sit immediately below album: '+gap);}
 await p.screenshot({path:out+`${name}-${phase}-track-hud.png`});
 await p.locator('[data-track="0"]').focus();await p.keyboard.press('ArrowDown');assert.equal(await p.locator('[data-track="1"]').evaluate(e=>e===document.activeElement),true);
 await p.locator('[data-track="1"]').click();await p.waitForFunction(()=>!document.querySelector('#audio').paused&&document.querySelector('#audio').currentTime>.15);await p.waitForTimeout(180);await hostClear(p,'listening');
 assert.equal(await p.locator('#lyrics-field').isVisible(),false);await p.evaluate(()=>window.__qaAudio=document.querySelector('#audio'));
 await p.screenshot({path:out+`${name}-${phase}-listening-hud.png`});
 await p.locator('#main-play').click();assert.equal(await p.locator('#audio').evaluate(e=>e.paused),true);await p.locator('#main-play').click();await p.waitForFunction(()=>!document.querySelector('#audio').paused);
 await p.locator('[data-next]').click();await p.waitForFunction(()=>document.querySelector('[data-track="2"]').getAttribute('aria-pressed')==='true'&&!document.querySelector('#audio').paused);
 await p.locator('[data-queue]').first().click();assert.equal(await p.locator('#track-list').isVisible(),true);await p.keyboard.press('Escape');assert.equal(await p.locator('#track-list').isVisible(),false);assert.equal(await p.locator('#room-dialog').evaluate(e=>e.open),true);await p.locator('[data-queue]').first().click();await hostClear(p,'expanded');
 await p.locator('.music-deck').evaluate(e=>e.scrollTop=e.scrollHeight);await hostClear(p,'scrolled');
 const before=await p.locator('#audio').evaluate(e=>e.currentTime);await close(p);await p.waitForTimeout(400);assert.ok(await p.locator('#audio').evaluate(e=>e.currentTime)>before);
 await p.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));});
 const hiddenTime=await p.locator('#audio').evaluate(e=>e.currentTime);await p.waitForTimeout(300);assert.ok(await p.locator('#audio').evaluate(e=>e.currentTime)>hiddenTime);assert.equal(await p.locator('body').getAttribute('data-page-hidden'),'true');
 await p.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});await open(p,'music');assert.equal(await p.evaluate(()=>window.__qaAudio===document.querySelector('#audio')),true);assert.equal(await p.locator('audio').count(),1);
 await p.locator('[data-browse]').click();await p.locator('#album-search').fill('chuyen cua trang');assert.equal(await p.locator('[data-album]:visible').count(),1);await p.locator('[data-album]:visible').click();assert.equal(await p.locator('#audio').evaluate(e=>e.paused&&!e.hasAttribute('src')),true);
 await close(p);await open(p,'profile');await p.locator('.profile-room').waitFor();await p.locator('.profile-room summary').click();assert.equal(await p.locator('.profile-room details').evaluate(e=>e.open),true);await p.screenshot({path:out+`${name}-${phase}-profile.png`});await p.keyboard.press('Escape');await p.waitForFunction(()=>!document.querySelector('#room-dialog').open);
 await open(p,'gallery');await p.locator('[data-photo]').first().waitFor();await p.locator('[data-like]').first().click();assert.equal(await p.locator('[data-like]').first().getAttribute('aria-pressed'),'true');await p.screenshot({path:out+`${name}-${phase}-gallery.png`});
 await p.locator('[data-photo]').first().click();await p.keyboard.press('ArrowRight');assert.match(await p.locator('#lightbox-detail').textContent(),/2 \/ 171/);await p.keyboard.press('Escape');assert.equal(await p.locator('#room-dialog').evaluate(e=>e.open),true);await p.keyboard.press('Escape');await p.waitForFunction(()=>!document.querySelector('#room-dialog').open);
 const metrics=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth||document.body.scrollHeight>innerHeight,audioCount:document.querySelectorAll('audio').length}));assert.equal(metrics.overflow,false);assert.deepEqual(f.errors,[]);assert.deepEqual(f.failed,[]);
 await f.context.close();return {revealMs,errors:f.errors,failed:f.failed,...metrics,audio:'synthetic WAV transport fixture; real R2 playback separately verified'};
});
await test('entrance holds slow critical data then permits immediate entry',async()=>{
 const {p,context}=await setup();let release;const held=new Promise(r=>release=r);await p.route('**/data/catalog.json',async route=>{await held;await route.continue();});await p.goto(base);await p.waitForTimeout(300);assert.equal(await p.locator('#entrance-bell').isDisabled(),true);assert.equal(await p.locator('body').getAttribute('data-entered'),'false');const before=Date.now();release();await p.waitForFunction(()=>document.querySelector('#entrance').dataset.state==='ready');const readinessMs=Date.now()-before;assert.ok(readinessMs<1000);await context.close();return {readinessMs};
});
await test('entrance recovers failed critical catalog on explicit retry',async()=>{const {p,context}=await setup();let attempt=0;await p.route('**/data/catalog.json',r=>++attempt===1?r.fulfill({status:503,body:'unavailable'}):r.continue());await p.goto(base);await p.waitForFunction(()=>document.querySelector('#entrance').dataset.state==='error');assert.equal(await p.locator('body').getAttribute('data-entered'),'false');await p.locator('#entrance-bell').click();await p.waitForFunction(()=>document.querySelector('#entrance').dataset.state==='ready');assert.equal(attempt,2);await context.close();});
await test('featured lyrics seek, gaps, subtitle, and metadata host moment',async()=>{
 const {p,context,errors}=await setup({width:390,height:844});const id=catalog[0].tracks[0].id;
 const fixture={trackId:id,featured:true,lines:[{start:1,end:5,text:'QA line A',section:'verse'},{start:5,end:10,text:'QA line B',sub:'QA subtitle',section:'chorus'},{start:15,end:20,text:'QA line C'},{start:20,end:30,text:'QA line D'},{start:30,end:40,text:'QA line E'}],hostMoments:[{time:5,duration:5,pose:'hum',text:'QA supplied moment'}]};
 await p.route('**/data/lyrics/index.json',r=>r.fulfill({json:{tracks:{[id]:'qa-only.json'}}}));await p.route('**/data/lyrics/qa-only.json',r=>r.fulfill({json:fixture}));await enter(p);await open(p,'music');await p.locator('[data-album]').first().click();await p.locator('[data-track="0"]').click();await p.waitForFunction(()=>document.querySelector('#audio').readyState>=2);
 await p.locator('#audio').evaluate(e=>e.currentTime=6);await p.waitForFunction(()=>document.querySelector('#lyrics-field [aria-current]')?.textContent==='QA line BQA subtitle');assert.equal(await p.locator('body').getAttribute('data-host-moment'),null);assert.equal(await p.locator('#room-dialog').getAttribute('data-lyric-section'),'chorus');await hostClear(p,'lyrics');await p.locator('.music-deck').evaluate(e=>e.scrollTop=180);await p.screenshot({path:out+'mobile-lyrics-QA-fixture.png'});
 await close(p);await p.waitForFunction(()=>document.body.dataset.hostMoment==='hum');assert.equal(await p.locator('#host-words').textContent(),'QA supplied moment');await p.locator('#audio').evaluate(e=>e.currentTime=11);await p.waitForFunction(()=>!document.body.dataset.hostMoment);await open(p,'music');assert.equal(await p.locator('#lyrics-field').getAttribute('data-instrumental'),'true');await p.locator('#audio').evaluate(e=>e.currentTime=3);await p.waitForFunction(()=>document.querySelector('#lyrics-field [aria-current]')?.textContent==='QA line A');await p.locator('[data-next]').click();await p.waitForFunction(()=>document.querySelector('#lyrics-field').hidden);assert.deepEqual(errors,[]);await context.close();return {fixtureOnly:true,productionLyricsAdded:0};
});
await test('reduced motion suppresses decoration and transparency preference applies',async()=>{
 const {p,context}=await setup({width:390,height:844},'night',{reducedMotion:'reduce'});const cdp=await context.newCDPSession(p);await cdp.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'},{name:'prefers-reduced-transparency',value:'reduce'}]});await enter(p);assert.equal(await p.locator('body').getAttribute('data-still'),'true');await p.waitForTimeout(600);assert.equal(await p.locator('.wildlife:not([hidden])').count(),0);await open(p,'music');await p.locator('[data-album]').first().click();assert.equal(await p.locator('.album-controls').evaluate(e=>getComputedStyle(e).backdropFilter),'none');await p.screenshot({path:out+'mobile-reduced-preferences.png'});await context.close();
});
await test('ambient opt-in, one field sample, hidden stop and music remains playing',async()=>{
 const {p,context,errors,requests}=await setup();await enter(p);assert.equal(requests.some(u=>u.includes('/assets/ambience/')),false);await p.locator('#ambience-toggle').click();await p.waitForFunction(()=>document.body.dataset.ambientSound==='field-birds');await open(p,'music');await p.locator('[data-album]').first().click();await p.locator('[data-track="0"]').click();await p.waitForFunction(()=>!document.querySelector('#audio').paused);await close(p);
 await p.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));});await p.waitForFunction(()=>document.body.dataset.ambientSound==='quiet');assert.equal(await p.locator('#audio').evaluate(e=>e.paused),false);
 await p.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});await p.locator('#ambience-toggle').click();assert.equal(await p.locator('body').getAttribute('data-ambient-enabled'),'false');assert.equal(await p.locator('#audio').evaluate(e=>e.paused),false);assert.equal(requests.filter(u=>u.includes('/assets/ambience/')).length,1);assert.deepEqual(errors,[]);await context.close();
});
await test('night habitat and earlier daily gift stay bounded in the browser',async()=>{
 const {p,context,errors}=await setup({width:1440,height:900},'night');await enter(p);await p.waitForTimeout(4500);assert.equal(await p.locator('.habitat-firefly').count(),16);const lightSamples=[];for(let i=0;i<7;i++){await p.waitForTimeout(1000);lightSamples.push(await p.locator('.habitat-firefly').evaluateAll(es=>es.filter(e=>parseFloat(getComputedStyle(e).opacity)>.1).length));}const lit=Math.max(...lightSamples);assert.ok(lit>=4&&lit<=8,JSON.stringify(lightSamples));await p.locator('#tarot-draw').click();await p.waitForFunction(()=>document.querySelector('#daily-dialog').open);await p.screenshot({path:out+'desktop-daily-gift.png'});await p.keyboard.press('Escape');assert.equal(await p.locator('#tarot-draw').evaluate(e=>e===document.activeElement),true);assert.deepEqual(errors,[]);await context.close();return {candidates:16,visibleAtSample:lit};
});
}finally{await browser.close();}
