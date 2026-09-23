import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';
const source=fs.readFileSync(new URL('../dist/garden-loading.js',import.meta.url),'utf8').replaceAll('export ','');
const context=vm.createContext({setTimeout,clearTimeout});vm.runInContext(source,context);
function fixture(complete=false){const events=new Map(),timers=new Map();const image={complete,addEventListener:(k,v)=>events.set(k,v),removeEventListener:k=>events.delete(k)};const container={hidden:true};context.watchScenery(image,container,{setTimer:(fn,delay)=>{timers.set(1,{fn,delay});return 1;},clearTimer:id=>timers.delete(id)});return {image,container,events,timers};}
test('cached scenery introduces no loading delay or timer',()=>{const f=fixture(true);assert.equal(f.container.hidden,true);assert.equal(f.timers.size,0);});
for(const event of ['load','error'])test(`scenery ${event} immediately clears its nonblocking loading notice`,()=>{const f=fixture();assert.equal(f.container.hidden,false);f.events.get(event)();assert.equal(f.container.hidden,true);assert.equal(f.timers.size,0);assert.equal(f.events.size,0);});
test('stalled image has a bounded notice with no navigation or audio gate',()=>{const f=fixture();const timer=f.timers.get(1);assert.equal(timer.delay,8000);timer.fn();assert.equal(f.container.hidden,true);assert.equal(f.events.size,0);});
test('reduced motion never animates the loading interaction',()=>{context.sendLoadingGust({querySelectorAll(){throw Error('Animation must not run');}},true);});
