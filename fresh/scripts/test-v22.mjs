import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {timePhase,characterState,musicState,registerLocation,locations} from '../dist/garden-state.js';
import {playable,albumBadge,unavailableReason,matchesCategory} from '../dist/garden-ui.js';
const read=p=>JSON.parse(fs.readFileSync(new URL(p,import.meta.url),'utf8'));
test('all published tracks have reviewed local mapping; retired ghost IDs cannot return',()=>{
 const source=read('../content/catalog.json'),out=read('../dist/data/catalog.json'),policy=read('../content/policy.json');
 assert.equal(out.length,26);assert.equal(out.flatMap(a=>a.tracks).length,213);assert.equal(new Set(out.map(a=>a.id)).size,26);
 for(const a of out){assert.ok(!policy.removedAlbums.some(old=>old.id===a.id));for(const t of a.tracks){const original=source.find(x=>x.id===a.id).tracks.find(x=>x.id===t.id);assert.equal(t.url,original.url);assert.ok(original.sourceFile);assert.match(t.url,/^https:\/\//);assert.equal(t.sourceFile,undefined);}}
});
test('missing audio stays honest and accessible rather than implying a playable album',()=>{
 const unavailable={tracks:[{name:'Pending',url:null}]},partial={tracks:[{url:null},{url:'https://music.example/a.mp3'}]};
 assert.equal(playable(unavailable),false);assert.equal(albumBadge(unavailable),'Đang cập nhật');assert.match(unavailableReason(unavailable),/chưa có file nhạc/);assert.equal(albumBadge(partial),'1 bài');
});
test('time boundaries and future locations stay separate from feature/playback state',()=>{
 const d=(h,m=0)=>new Date(2026,8,18,h,m);assert.equal(timePhase(d(4,59)),'night');assert.equal(timePhase(d(5)),'dawn');assert.equal(timePhase(d(11)),'noon');assert.equal(timePhase(d(17)),'sunset');assert.equal(timePhase(d(18,30)),'night');
 assert.equal(characterState({room:'music',playing:false}),'musicBrowse');assert.equal(characterState({room:'music',playing:true}),'listening');assert.equal(characterState({room:'profile',playing:true}),'story');assert.equal(characterState({room:'gallery'}),'gallery');
 assert.equal(musicState({album:{},queueOpen:true,playing:true}),'tracklist');assert.equal(musicState({album:{},playing:true}),'playing');assert.equal(musicState({}),'browse');
 registerLocation('portal',{id:'garden.gamePortal',character:'idle'});assert.equal(locations.portal.id,'garden.gamePortal');delete locations.portal;
});
test('category filters derive from real metadata, with independent favorite membership',()=>{
 const a={id:'a',sub:'Folk · Acoustic'};assert.equal(matchesCategory(a,'acoustic',new Set()),true);assert.equal(matchesCategory(a,'folk',new Set()),true);assert.equal(matchesCategory(a,'energy',new Set()),false);assert.equal(matchesCategory(a,'favorites',new Set(['a'])),true);
});
test('production lyrics stay empty unless the author provides verified timing',()=>{assert.deepEqual(read('../dist/data/lyrics/index.json').tracks,{});});
