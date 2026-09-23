import {chromium} from '/Users/alihuynh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {readFile,writeFile,mkdir} from 'node:fs/promises';import {fileURLToPath} from 'node:url';import assert from 'node:assert/strict';
const out=fileURLToPath(new URL('../qa/v2.1-review-2026-09-18/',import.meta.url));await mkdir(out,{recursive:true});
const catalog=JSON.parse(await readFile(new URL('../dist/data/catalog.json',import.meta.url))),longest=[...catalog].sort((a,b)=>b.description.length-a.description.length)[0];
const browser=await chromium.launch({headless:true,channel:'chrome'}),receipt={quotes:[],wind:[],ambience:process.env.REVIEW_ONLY==='ui'?JSON.parse(await readFile(out+'review-tests.json')).ambience:{}};
async function enter(p){await p.goto('http://127.0.0.1:8791/');await p.locator('#entrance-bell').click();await p.waitForFunction(()=>document.body.dataset.entered==='true');await p.locator('#daylight-day').click();}
try{
 for(const [name,width,height] of [['desktop',1440,900],['tablet',834,1112],['mobile',390,844],['small-mobile',320,568],['landscape',844,390]]){
  const context=await browser.newContext({viewport:{width,height}}),p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.addInitScript(()=>Math.random=()=>0);await enter(p);
  const wind=await p.locator('.canopy-frond').evaluate(async e=>{await new Promise(r=>setTimeout(r,3100));const active=e.getAnimations().find(a=>a.playState==='running');return {transform:getComputedStyle(e).transform,active:!!active,tipTravel:active?2*e.offsetWidth*Math.sin(2.4*.85*Math.PI/360):0};});
  assert.ok(wind.active);assert.notEqual(wind.transform,'none');assert.ok(wind.tipTravel>7);receipt.wind.push({name,...wind});
  await p.locator('.top-nav [data-open=music]').click();await p.locator(`[data-album="${longest.id}"]`).click();
  const words=await p.locator('.album-li-words').textContent();assert.equal(words,`“${longest.name}” nè. ${longest.description}`);
  const intro=await p.locator('.album-li-words').evaluate(e=>({fullHeight:e.scrollHeight<=e.clientHeight+1,lineClamp:getComputedStyle(e).webkitLineClamp,textOverflow:getComputedStyle(e).textOverflow}));assert.ok(intro.fullHeight);assert.equal(intro.lineClamp,'none');
  if(name==='desktop'){
   const alignment=await p.evaluate(()=>{const a=document.querySelector('#album-art').getBoundingClientRect(),b=document.querySelector('.music-console').getBoundingClientRect();return {a:a.y,b:b.y,right:b.left>=a.right};});assert.equal(alignment.a,alignment.b);assert.ok(alignment.right);
  }
  await p.locator('.album-li-words').scrollIntoViewIfNeeded();await p.screenshot({path:out+name+'-full-album-intro.png'});
  await p.locator('.close-room').click();await p.waitForTimeout(300);
  const quote=await p.locator('#host-talk').evaluate(e=>{const r=e.getBoundingClientRect();return {text:document.querySelector('#host-words').textContent,x:r.x,y:r.y,bottom:r.bottom,right:r.right,width:innerWidth,height:innerHeight,scrollHeight:e.scrollHeight,clientHeight:e.clientHeight};});
  assert.equal(quote.text,words);assert.ok(quote.x>=0&&quote.y>=0&&quote.right<=width&&quote.bottom<=height-50,JSON.stringify(quote));assert.ok(quote.scrollHeight<=quote.clientHeight+1);
  const tools=await p.locator('.garden-tools').boundingBox();assert.ok(quote.right<=tools.x||quote.x>=tools.x+tools.width||quote.y>=tools.y+tools.height, 'full quote must clear garden controls');
  await p.screenshot({path:out+name+'-full-host-quote.png'});assert.deepEqual(errors,[]);receipt.quotes.push({name,chars:words.length,...intro,...quote});await context.close();console.log('PASS full text and visible breeze: '+name);
 }
 if(process.env.REVIEW_ONLY!=='ui'){
 const p=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(()=>{
  window.__ambienceSources=[];window.__ambienceContexts=[];
  const Native=window.AudioContext;
  window.AudioContext=class extends Native{constructor(...args){super(...args);window.__ambienceContexts.push(this);const original=this.createBufferSource.bind(this);this.createBufferSource=()=>{const source=original(),record={source,start:null,stop:null,ended:false};window.__ambienceSources.push(record);const start=source.start.bind(source),stop=source.stop.bind(source);source.start=(...args)=>{record.start=args;record.startedAt=this.currentTime;return start(...args);};source.stop=(...args)=>{record.stop=args;return stop(...args);};source.addEventListener('ended',()=>record.ended=true);return source;};}};
 });
 await enter(p);assert.equal(await p.evaluate(()=>window.__ambienceContexts.length),0);
 await p.locator('#ambience-toggle').click();await p.waitForFunction(()=>document.body.dataset.ambientSound==='field-birds');
 const samples=await p.evaluate(()=>{const r=window.__ambienceSources[0],b=r.source.buffer,d=b.getChannelData(0),rms=[];for(let i=0;i<d.length;i+=b.sampleRate/10){let power=0,n=0;for(let j=i;j<Math.min(d.length,i+b.sampleRate/10);j++){power+=d[j]*d[j];n++;}rms.push(Math.sqrt(power/n));}return {duration:b.duration,loop:r.source.loop,startArguments:r.start.length,seamJump:Math.abs(d[0]-d.at(-1)),quietest100ms:Math.min(...rms),contextTime:window.__ambienceContexts[0].currentTime};});
 assert.ok(samples.loop);assert.equal(samples.startArguments,1);assert.ok(samples.quietest100ms>1e-6);receipt.ambience.initial=samples;
 // Two full cycles on the real audio clock; no accelerated timers or synthetic sound.
 await p.waitForTimeout((samples.duration*2+1)*1000);
 receipt.ambience.twoCycles=await p.evaluate(()=>({sources:window.__ambienceSources.length,ended:window.__ambienceSources[0].ended,contextTime:window.__ambienceContexts[0].currentTime,sound:document.body.dataset.ambientSound}));
 assert.equal(receipt.ambience.twoCycles.sources,1);assert.equal(receipt.ambience.twoCycles.ended,false);assert.ok(receipt.ambience.twoCycles.contextTime>samples.duration*2);console.log('PASS continuous ambience across two native loops');
 let release;const held=new Promise(r=>release=r);await p.route('**/night-crickets.mp3',async r=>{await held;await r.continue();});await p.locator('#daylight-night').click();await p.waitForTimeout(350);
 assert.equal(await p.evaluate(()=>window.__ambienceSources[0].stop),null);assert.equal(await p.locator('body').getAttribute('data-ambient-sound'),'field-birds');release();await p.waitForFunction(()=>document.body.dataset.ambientSound==='field-crickets');
 receipt.ambience.transition=await p.evaluate(()=>window.__ambienceSources.map(r=>({loop:r.source.loop,start:r.start,stop:r.stop,ended:r.ended})));assert.ok(receipt.ambience.transition[0].stop[0]>receipt.ambience.transition[1].start[0]);
 await p.waitForTimeout(2300);assert.equal(await p.evaluate(()=>window.__ambienceSources.filter(r=>!r.ended).length),1);
 await p.locator('#ambience-toggle').click();assert.equal(await p.locator('body').getAttribute('data-ambient-enabled'),'false');await p.waitForTimeout(100);assert.equal(await p.evaluate(()=>window.__ambienceContexts[0].state),'suspended');
 assert.deepEqual(errors,[]);console.log('PASS delayed phase handoff and clean stop');
 }
}finally{await writeFile(out+'review-tests.json',JSON.stringify(receipt,null,2));await browser.close();}
