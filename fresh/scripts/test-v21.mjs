import {readFileSync} from 'node:fs';
import test from 'node:test';import assert from 'node:assert/strict';
const moduleFrom=async file=>import('data:text/javascript,'+encodeURIComponent(readFileSync(new URL('../dist/'+file,import.meta.url),'utf8')));
const {validateLyrics,lyricFrame,createLyricLoader}=await moduleFrom('garden-lyrics.js');
const {waitForImage}=await moduleFrom('garden-entrance.js');
const {gustPlan}=await moduleFrom('garden-wind.js');
const fixture={trackId:'qa-track',featured:true,lines:[{start:2,end:5,text:'QA A',section:'verse'},{start:5,end:8,text:'QA B',sub:'QA subtitle',section:'chorus'},{start:10,end:15,text:'QA C'}],hostMoments:[{time:5,duration:2,pose:'hum',text:'QA moment'}]};
test('timed lyrics handle exact boundaries, instrumental gaps and backward seeks',()=>{
 const data=validateLyrics(fixture,'qa-track');assert.equal(lyricFrame(data,1).index,-1);assert.equal(lyricFrame(data,5).index,1);assert.equal(lyricFrame(data,7).moment,null);assert.equal(lyricFrame(data,9).lines.length,0);assert.equal(lyricFrame(data,3).index,0);assert.equal(lyricFrame(data,6).section,'chorus');assert.equal(lyricFrame(data,6).lines[1].offset,0);
});
test('malformed and overlapping lyrics are rejected; unsupported metadata stays quiet',()=>{
 for(const change of [{trackId:'other'},{featured:false},{lines:[{start:3,end:3,text:'X'}]},{lines:[{start:0,end:5,text:'A'},{start:4,end:7,text:'B'}]},{hostMoments:[{time:1,duration:13,pose:'hum',text:'X'}]}])assert.throws(()=>validateLyrics({...fixture,...change},'qa-track'));
 const d=validateLyrics({...fixture,lines:[{start:0,end:1,text:'<b>plain text</b>',section:'unknown'}]},'qa-track');assert.equal(d.lines[0].section,'');assert.equal(d.lines[0].text,'<b>plain text</b>');
});
test('lyrics load only mapped tracks, cache requests, reject paths and recover from failure',async()=>{
 const requests=[];let fail=true;
 const load=createLyricLoader(async url=>{requests.push(url);if(url.endsWith('index.json'))return {ok:true,json:async()=>({tracks:{'qa-track':'qa-track.json',bad:'../catalog.json'}})};if(fail){fail=false;return {ok:false};}return {ok:true,json:async()=>fixture};});
 assert.equal(await load('unfeatured'),null);assert.equal(requests.length,1);assert.equal(await load('bad'),null);assert.equal(requests.length,1);assert.equal(await load('qa-track'),null);assert.equal((await load('qa-track')).trackId,'qa-track');await load('qa-track');assert.equal(requests.length,3);
});
test('critical images are ready immediately when decoded; failures and timeouts reject',async()=>{
 const loaded=Object.assign(new EventTarget(),{complete:true,naturalWidth:100,decode:async()=>{}});await waitForImage(loaded);
 const stalledDecode=Object.assign(new EventTarget(),{complete:true,naturalWidth:100,decode:()=>new Promise(()=>{})});
 await waitForImage(stalledDecode,{timeout:5});
 const pending=Object.assign(new EventTarget(),{complete:false,naturalWidth:0});const promise=waitForImage(pending);pending.complete=true;pending.naturalWidth=100;pending.dispatchEvent(new Event('load'));await promise;
 await assert.rejects(waitForImage(Object.assign(new EventTarget(),{complete:true,naturalWidth:0})));
 await assert.rejects(waitForImage(Object.assign(new EventTarget(),{complete:false,naturalWidth:0}),{timeout:5}));
});
test('a gust reaches small foliage before the canopy and settles within the rest interval',()=>{
 const plan=gustPlan();assert.deepEqual(plan.map(p=>p.delay),[0,260,550,980,1450]);assert.ok(plan.every(p=>p.duration+p.delay<14000));assert.ok(plan.every(p=>p.angle>=2&&p.angle<=6));assert.ok(plan.every(p=>p.drift>1&&p.drift<3));
});
