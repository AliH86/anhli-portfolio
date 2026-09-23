import {chromium} from '/Users/alihuynh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true,channel:'chrome'}),results=[];
try{
  for(const slow of ['garden-oracle-data.js','garden-oracle-profiles.js']){
    const context=await browser.newContext(),page=await context.newPage(),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.route('**/'+slow,async route=>{await new Promise(resolve=>setTimeout(resolve,800));await route.continue();});
    await page.goto('http://127.0.0.1:8784/works/');
    const identities=await page.evaluate(()=>window.GARDEN_ORACLE_IDENTITIES?.length||0);
    results.push({delayed:slow,identities,errors});await context.close();
  }
  await writeFile(new URL('../docs/qa/shows-2026-09-14/'+(process.env.ORACLE_BASELINE?'oracle-before.json':'oracle-startup.json'),import.meta.url),JSON.stringify(results,null,2));
  console.log(JSON.stringify(results));
  if(!process.env.ORACLE_BASELINE)for(const result of results){assert.equal(result.identities,78);assert.deepEqual(result.errors,[]);}
}finally{await browser.close();}
