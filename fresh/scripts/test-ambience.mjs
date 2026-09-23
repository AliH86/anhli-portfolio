import {readFileSync} from 'node:fs';import test from 'node:test';import assert from 'node:assert/strict';
const {seamlessAmbience}=await import('data:text/javascript,'+encodeURIComponent(readFileSync(new URL('../dist/garden-ambient.js',import.meta.url),'utf8')));
function buffer(channels,length,sampleRate){const data=Array.from({length:channels},()=>new Float32Array(length));return {numberOfChannels:channels,length,sampleRate,getChannelData:c=>data[c]};}
test('ambient loop joins adjacent original samples and preserves every channel',()=>{
 const input=buffer(2,28000,1000);for(let c=0;c<2;c++)for(let i=0;i<input.length;i++)input.getChannelData(c)[i]=Math.sin(i*.173+c)*.1;
 const result=seamlessAmbience({createBuffer:buffer},input,3);assert.equal(result.length,25000);assert.equal(result.numberOfChannels,2);
 for(let c=0;c<2;c++){const source=input.getChannelData(c),out=result.getChannelData(c);assert.equal(out[0],source[3000]);assert.equal(out.at(-1),source[2999]);assert.equal(out[21999],source[24999]);assert.equal(out[22000],source[25000]);assert.ok(out.every(Number.isFinite));}
});
test('tiny decoded samples cannot introduce NaN at a one-sample crossfade',()=>{const input=buffer(1,5,1000);assert.equal(seamlessAmbience({createBuffer:buffer},input),input);});
