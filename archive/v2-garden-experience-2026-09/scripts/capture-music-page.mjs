import {chromium} from '/Users/alihuynh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {fileURLToPath} from 'node:url';import {writeFile} from 'node:fs/promises';
const out=fileURLToPath(new URL('../docs/qa/music-2026-09-14/',import.meta.url)),browser=await chromium.launch({headless:true,channel:'chrome'}),receipt=[];
for(const [name,width,height] of [['desktop',1440,900],['mobile',390,844]]){
 const context=await browser.newContext({viewport:{width,height},isMobile:name==='mobile',hasTouch:name==='mobile'}),p=await context.newPage(),errors=[];
 p.on('pageerror',e=>errors.push(e.message));await p.goto('http://127.0.0.1:8784/sap/');await p.waitForFunction(()=>window.dandelionMusicSceneDiagnostics?.().state==='ready'&&window.dandelionDiagnostics?.().ready);await p.locator('.dg-music-host img').evaluate(i=>i.decode());await p.evaluate(()=>document.fonts.ready);
 await p.screenshot({path:out+name+'.png'});await p.screenshot({path:out+name+'-full.png',fullPage:true});
 receipt.push({name,errors,...await p.evaluate(()=>({scene:window.dandelionMusicSceneDiagnostics(),audio:document.querySelectorAll('audio').length,paused:document.querySelector('audio').paused,overflow:document.documentElement.scrollWidth>innerWidth,albums:document.querySelectorAll('#dgAlbumSelect option').length}))});await context.close();
}
await writeFile(out+'initial-receipt.json',JSON.stringify(receipt,null,2));console.log(JSON.stringify(receipt,null,2));await browser.close();
