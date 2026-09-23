import {chromium} from '/Users/alihuynh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
const b=await chromium.launch({channel:'chrome'});
for(const [name,w,h]of[['desktop',1440,900],['tablet',834,1112],['mobile',390,844]]){
 const p=await b.newPage({viewport:{width:w,height:h}});await p.goto('http://127.0.0.1:8791');await p.locator('#entrance-bell:not(:disabled)').click();await p.waitForFunction(()=>document.body.dataset.entered==='true');await p.locator('.top-nav [data-open=music]').click();await p.locator('[data-album]').first().click();await p.locator('#main-play').click();await p.waitForTimeout(1600);
 console.log(name,await p.evaluate(()=>Object.fromEntries(['.scene-world','#host','.music-object','.album-controls','#room-dialog','.album-feature','.room-header'].map(s=>{const r=document.querySelector(s).getBoundingClientRect();return[s,{x:r.x,y:r.y,w:r.width,h:r.height}]}))));await p.close();
}await b.close();
