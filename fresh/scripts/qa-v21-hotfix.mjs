import {chromium,webkit} from '/Users/alihuynh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {mkdir,writeFile} from 'node:fs/promises';import {fileURLToPath} from 'node:url';import assert from 'node:assert/strict';
const base=process.env.QA_BASE||'http://127.0.0.1:8791/';
const out=fileURLToPath(new URL('../qa/v2.1-mobile-hotfix-2026-09-18/',import.meta.url));await mkdir(out,{recursive:true});const results=[];
async function scroll(p,selector,delta,cdp,horizontal=false){
 const box=await p.locator(selector).boundingBox();const x=Math.round(box.x+box.width*.55),y=Math.round(Math.min(box.y+box.height-20,p.viewportSize().height-25));
 if(cdp)await cdp.send('Input.synthesizeScrollGesture',{x,y,[horizontal?'xDistance':'yDistance']:-delta,speed:650,gestureSourceType:'touch'});
 else{await p.mouse.move(x,y);await p.mouse.wheel(horizontal?delta:0,horizontal?0:delta);}
 await p.waitForTimeout(350);
}
const scenarios=[['chrome-phone',chromium,390,700,true],['webkit-phone',webkit,390,700,true],['chrome-android',chromium,412,800,true],['webkit-tablet',webkit,820,1180,true],['chrome-tablet',chromium,1024,768,true],['chrome-laptop',chromium,1440,900,false],['webkit-laptop',webkit,1440,900,false]];
if(process.env.QA_ONLY)scenarios.splice(0,scenarios.length,...scenarios.filter(s=>s[0].includes(process.env.QA_ONLY)));
for(const [name,type,width,height,touch] of scenarios){
 const browser=await type.launch({headless:true,...(type===chromium?{channel:'chrome'}:{})});let p;
 try{
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:touch?2:1,isMobile:touch&&type===chromium,hasTouch:touch}),errors=[];p=await context.newPage();p.setDefaultTimeout(15000);p.on('pageerror',e=>errors.push(e.message));
  await p.addInitScript(()=>{window.__bell=[];const Native=window.AudioContext;if(!Native)return;window.AudioContext=class extends Native{constructor(...args){super(...args);window.__bell.push(this);}};});
  await p.goto(base+'?hotfix=23');await p.locator('#entrance-bell').click();await p.waitForFunction(()=>document.body.dataset.entered==='true');
  assert.equal(await p.locator('.wordmark').evaluate(e=>e.matches(':focus-visible')),false);
  await p.waitForTimeout(900);const bell=await p.evaluate(()=>window.__bell.map(c=>c.state));assert.deepEqual(bell,['closed']);
  const balloon=await p.evaluate(()=>{const h=document.querySelector('#host').getBoundingClientRect(),b=document.querySelector('#host-talk').getBoundingClientRect();return {top:b.top,hostTop:h.top,hostHeight:h.height,bottom:b.bottom};});assert.ok(balloon.top>balloon.hostTop+balloon.hostHeight*.12);
  await p.locator('#daylight-night').click();await p.screenshot({path:out+name+'-garden.png'});
  await p.locator('.top-nav [data-open=music]').click();await p.locator('.music-deck').waitFor();
  const cdp=type===chromium&&touch?await context.newCDPSession(p):null;
  const deck=await p.locator('.music-deck').evaluate(e=>({display:getComputedStyle(e).display,y:getComputedStyle(e).overflowY}));
  if(deck.display!=='contents'){assert.equal(deck.y,'auto');await scroll(p,'.music-deck',480,cdp);assert.ok(await p.locator('.music-deck').evaluate(e=>e.scrollTop)>0,'vertical native gesture must scroll deck');}
  else await scroll(p,'.room-content',450,null);
  // Center the shelf via its containing scroll area, then verify a horizontal native gesture.
  await p.locator('.album-shelf').scrollIntoViewIfNeeded();await scroll(p,'.album-shelf',340,cdp,true);assert.ok(await p.locator('.album-shelf').evaluate(e=>e.scrollLeft)>0,'horizontal shelf gesture');
  await p.screenshot({path:out+name+'-shelf.png'});
  await p.locator('[data-album]').filter({hasText:'Những Kẻ DRILL'}).click();
  await p.locator('.queue-more').click();await p.locator('#track-list').scrollIntoViewIfNeeded();assert.equal(await p.locator('#track-list').evaluate(e=>getComputedStyle(e).overflowY),'auto');
  for(let i=0;i<3;i++)await scroll(p,'#track-list',250,cdp);
  const tracks=await p.locator('#track-list').evaluate(e=>({top:e.scrollTop,max:e.scrollHeight-e.clientHeight}));assert.ok(tracks.top>tracks.max-5,'last track is reachable with a gesture');
  await p.screenshot({path:out+name+'-playlist.png'});
  await p.evaluate(()=>window.__player=document.querySelector('#audio'));await p.locator('[data-track]').last().click();await p.waitForFunction(()=>!document.querySelector('#audio').paused&&document.querySelector('#audio').currentTime>.2,null,{timeout:30000});
  const before=await p.locator('#audio').evaluate(e=>e.currentTime);await p.locator('.room-motion').click();await p.waitForTimeout(450);
  const audio=await p.evaluate(()=>({same:window.__player===document.querySelector('#audio'),count:document.querySelectorAll('audio').length,paused:document.querySelector('#audio').paused,time:document.querySelector('#audio').currentTime}));assert.ok(audio.same&&!audio.paused&&audio.time>before);assert.equal(audio.count,1);
  await p.locator('.room-motion').click();await p.waitForTimeout(750);
  const animations=await p.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running'&&a.effect.target?.closest('.scene-world')).map(a=>a.animationName||'WAAPI'));if(touch)assert.deepEqual(animations,[],'no background garden animations under mobile tray');
  if(touch&&width<700){await p.setViewportSize({width:844,height:390});await p.waitForTimeout(500);await p.locator('[data-queue]').first().click();await p.setViewportSize({width,height});await p.waitForTimeout(500);assert.equal(await p.locator('.music-deck').evaluate(e=>getComputedStyle(e).overflowY),'auto');}
  await p.locator('.close-room').click();await p.locator('#motion-toggle').click();await p.reload();await p.locator('#entrance-bell').click();await p.waitForFunction(()=>document.body.dataset.entered==='true');assert.equal(await p.locator('body').getAttribute('data-still'),'true');
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);assert.deepEqual(errors,[]);
  results.push({name,pass:true,base,deck,tracks,audio,balloon,bell,backgroundAnimations:animations,errors});console.log('PASS',name);
 }catch(e){await p?.screenshot({path:out+name+'-FAIL.png'});results.push({name,pass:false,error:e.stack});console.error(name,e.message);}
 finally{await browser.close();await writeFile(out+(process.env.QA_KIND||'local')+'-browser.json',JSON.stringify(results,null,2));}
}
if(results.some(r=>!r.pass))process.exitCode=1;
