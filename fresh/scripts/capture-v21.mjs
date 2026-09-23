import {chromium} from '/Users/alihuynh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {fileURLToPath} from 'node:url';import {writeFile} from 'node:fs/promises';
const output=fileURLToPath(new URL('../qa/v2.1-review-2026-09-18/',import.meta.url)),browser=await chromium.launch({headless:true,channel:'chrome'}),receipt=[];
try{
for(const [name,width,height] of [['desktop',1440,900],['tablet',834,1112],['mobile',390,844]]){
 const context=await browser.newContext({viewport:{width,height},isMobile:name==='mobile',hasTouch:name!=='desktop'}),p=await context.newPage(),errors=[],failed=[];
 p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400&&r.url().includes('127.0.0.1'))failed.push(r.url());});
 await p.goto('http://127.0.0.1:8791/');await p.waitForFunction(()=>document.querySelector('#entrance').dataset.state==='ready',{timeout:20000});
 await p.screenshot({path:output+name+'-gate.png'});await p.locator('#entrance-bell').click();await p.waitForFunction(()=>document.body.dataset.entered==='true');
 await p.locator('#daylight-day').click();await p.waitForTimeout(1900);await p.screenshot({path:output+name+'-garden-day.png'});
 await p.locator('.top-nav [data-open=music]').click();await p.locator('[data-album]').first().waitFor();await p.locator('[data-album]').first().click();await p.waitForTimeout(800);
 await p.screenshot({path:output+name+'-browse.png'});
 await p.locator('#main-play').click();try{await p.waitForFunction(()=>!document.querySelector('#audio').paused&&document.querySelector('#audio').currentTime>1,{timeout:22000});}catch{}
 await p.waitForTimeout(700);await p.screenshot({path:output+name+'-listen.png'});
 receipt.push({name,errors,failed,...await p.evaluate(()=>({entered:document.body.dataset.entered,audioCount:document.querySelectorAll('audio').length,time:document.querySelector('#audio').currentTime,paused:document.querySelector('#audio').paused,overflow:document.documentElement.scrollWidth>innerWidth,bodyHeight:document.body.scrollHeight,viewport:innerHeight,listening:document.querySelector('#room-dialog').dataset.listening}))});
 await p.locator('.close-room').click();await p.waitForTimeout(300);await p.locator('#daylight-night').click();await p.waitForTimeout(2200);await p.screenshot({path:output+name+'-garden-night.png'});
 await p.evaluate(()=>document.querySelector('#audio').pause());await context.close();
}
}finally{await writeFile(output+'initial-browser-receipt.json',JSON.stringify(receipt,null,2));console.log(JSON.stringify(receipt));await browser.close();}
