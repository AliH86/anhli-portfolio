import {readFileSync} from 'node:fs';import vm from 'node:vm';import test from 'node:test';import assert from 'node:assert/strict';
const source=readFileSync(new URL('../dist/garden-ambient.js',import.meta.url),'utf8').replaceAll('export ','');
function fixture(preference=null,{storageBlocked=false}={}){
 const events={},attributes={},saved=new Map(preference===null?[]:[['garden-ambience',preference]]),calls={contexts:0,resumes:0,starts:0,stops:0,fetches:0};
 const target=id=>({addEventListener(k,fn){events[id+':'+k]=fn;},removeEventListener(){},setAttribute(k,v){attributes[k]=v;}});
 const body={dataset:{}},button=target('button'),document={...target('document'),body,hidden:false,querySelector:s=>s==='#ambience-toggle'?button:s==='#video-stage iframe'?null:{}};
 const buffer={length:8,sampleRate:1,numberOfChannels:1,getChannelData:()=>new Float32Array(8)};
 class Context{
  constructor(){calls.contexts++;this.state='suspended';this.currentTime=0;this.destination={};}
  addEventListener(){}removeEventListener(){}
  resume(){calls.resumes++;this.state='running';return Promise.resolve();}suspend(){this.state='suspended';return Promise.resolve();}close(){}
  createBuffer(){return buffer;}decodeAudioData(){return Promise.resolve(buffer);}
  createGain(){return {connect(){},disconnect(){},gain:{value:0,setTargetAtTime(){},setValueAtTime(){},linearRampToValueAtTime(){}}};}
  createBufferSource(){return {connect(){},disconnect(){},start(){calls.starts++;},stop(){calls.stops++;}};}
 }
 const sandbox=vm.createContext({document,window:{...target('window'),AudioContext:Context},localStorage:{getItem:k=>{if(storageBlocked)throw Error('storage');return saved.get(k)??null;},setItem:(k,v)=>{if(storageBlocked)throw Error('storage');saved.set(k,v);}},fetch:async()=>{calls.fetches++;return {ok:true,arrayBuffer:async()=>new ArrayBuffer(8)};},MutationObserver:class{observe(){}disconnect(){}},Map,Set,Math});
 vm.runInContext(source,sandbox);const life=sandbox.initGardenAmbience({audio:{...target('audio'),paused:true},notice(){}});
 return {life,events,body,attributes,calls,saved};
}
const flush=()=>new Promise(setImmediate);
test('default ambience is silent before entry and resumes its context inside the entrance gesture',async()=>{
 const f=fixture();f.life.setPhase('night');assert.equal(f.calls.contexts,0);assert.equal(f.calls.fetches,0);
 f.events['document:garden-entering']();assert.equal(f.calls.contexts,1);assert.equal(f.calls.resumes,1);
 await flush();assert.equal(f.calls.starts,1);assert.equal(f.body.dataset.ambientSound,'field-crickets');f.life.destroy();
});
test('saved mute survives entry; explicit unmute starts sound and mute stops every voice',async()=>{
 const f=fixture('false');f.events['document:garden-entering']();assert.equal(f.calls.contexts,0);
 f.events['button:click']();await flush();assert.equal(f.calls.starts,1);assert.equal(f.saved.get('garden-ambience'),'true');
 f.events['button:click']();assert.equal(f.calls.stops,1);assert.equal(f.saved.get('garden-ambience'),'false');assert.equal(f.attributes['aria-pressed'],'false');f.life.destroy();
});
test('private storage and a mute during decoding do not break entry or start a stale ambient voice',async()=>{
 const f=fixture(null,{storageBlocked:true});f.events['document:garden-entering']();f.events['button:click']();await flush();assert.equal(f.calls.starts,0);assert.equal(f.body.dataset.ambientEnabled,'false');f.life.destroy();
});
