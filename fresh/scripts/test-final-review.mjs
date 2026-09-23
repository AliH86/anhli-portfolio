import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';
const path=new URL('../dist/',import.meta.url);
const source=fs.readFileSync(new URL('garden-daily.js',path),'utf8').replaceAll('export ','');
const sandbox=vm.createContext({Date,Math,Uint32Array});vm.runInContext(source,sandbox);
const {cards}=JSON.parse(fs.readFileSync(new URL('data/daily-messages.json',path)));
function legacyFirst(day,id){
 let h=2166136261;const key='anhli-garden-'+day+'-'+id;for(let i=0;i<key.length;i++){h^=key.charCodeAt(i);h=Math.imul(h,16777619);}let seed=h>>>0;
 const rng=()=>{seed+=0x6D2B79F5;let t=seed;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};
 const ns=[];while(ns.length<3){const n=Math.floor(rng()*78);if(!ns.includes(n))ns.push(n);}return {id:ns[0],closed:rng()<.32};
}
test('daily message preserves all 78 original messages and first draw of legacy Oracle',()=>{
 const ctx=vm.createContext({window:{}});vm.runInContext(fs.readFileSync(new URL('../../garden-oracle-data.js',import.meta.url),'utf8'),ctx);
 assert.equal(cards.length,78);
 for(const c of cards){assert.equal(c.open.message,ctx.window.GARDEN_ORACLE_CARDS[c.id].bloom);assert.equal(c.closed.message,ctx.window.GARDEN_ORACLE_CARDS[c.id].closed);assert.ok(fs.existsSync(new URL(c.image,path)));}
 for(let i=0;i<300;i++){const day='2026-09-'+String(i%30+1).padStart(2,'0'),id='fixture-'+i,r=sandbox.dailySelection(day,id,cards),legacy=legacyFirst(day,id);assert.equal(r.id,legacy.id);assert.equal(r.closed,legacy.closed);}
});
test('same local day/device locks message across reload, next day uses fresh draw',async()=>{
 const map=new Map(),storage={getItem:k=>map.get(k),setItem:(k,v)=>map.set(k,v)};
 let today=new Date(2026,8,17,23,59),requests=0;
 const options={storage,fetcher:async()=>{requests++;return {ok:true,json:async()=>({cards})};},now:()=>today,makeId:()=> 'stable-device'};
 const read=sandbox.createDailyReader(options),first=await read();assert.equal(first.dateKey,'2026-09-17');assert.deepEqual(await read(),first);
 assert.deepEqual(await sandbox.createDailyReader(options)(),first);assert.equal(map.get('anhli_garden_device'),'stable-device');assert.equal(requests,2);
 today=new Date(2026,8,18,0,0);const next=await read();assert.equal(next.dateKey,'2026-09-18');assert.equal(next.id,legacyFirst('2026-09-18','stable-device').id);assert.equal(requests,2);
});
test('blocked storage retains stable daily result in the current page; failed data request can retry',async()=>{
 let tries=0;const read=sandbox.createDailyReader({storage:{getItem(){throw Error();},setItem(){throw Error();}},makeId:()=> 'memory-device',now:()=>new Date(2026,8,17),fetcher:async()=>({ok:++tries>1,json:async()=>({cards})})});
 await assert.rejects(read());assert.deepEqual(await read(),await read());assert.equal(tries,2);
});
