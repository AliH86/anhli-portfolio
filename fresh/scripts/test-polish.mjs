// Deterministic regression checks for the real async handlers. No browser mocking
// is used as evidence of visual quality, real playback, or device performance.
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';

const source=readFileSync(new URL('../dist/app.js',import.meta.url),'utf8');
const section=(start,end)=>source.slice(source.indexOf(start),source.indexOf(end,source.indexOf(start)));
function mediaFixture(){
  let resolve,reject;
  const pending=new Promise((a,b)=>{resolve=a;reject=b;});
  const calls=[];
  const context=vm.createContext({
    state:{room:'gallery',media:'photos',mediaToken:0,viewToken:1,videos:null},
    room:{open:true},stopVideo(){},getData:()=>pending,
    renderGallery(){calls.push('render');},notice(){calls.push('notice');},
    $:()=>({focus(){calls.push('focus');}})
  });
  vm.runInContext(section('async function switchMedia(', 'function openVideo('),context);
  return {context,calls,resolve,reject};
}
test('late video success cannot repaint another tray',async()=>{
  const f=mediaFixture(),p=f.context.switchMedia('videos');
  f.context.state.room='music';f.context.state.viewToken++;
  f.resolve([{title:'Video'}]);await p;
  assert.deepEqual(f.calls,[]);
  assert.equal(f.context.state.videos.length,1);
});
test('late video failure cannot repaint or announce over another tray',async()=>{
  const f=mediaFixture(),p=f.context.switchMedia('videos');
  f.context.state.room='profile';f.context.state.viewToken++;
  f.reject(Error('offline'));await p;
  assert.deepEqual(f.calls,[]);
});
test('photos win over an earlier video request',async()=>{
  const f=mediaFixture(),p=f.context.switchMedia('videos');
  await f.context.switchMedia('photos');f.resolve([]);await p;
  assert.equal(f.context.state.media,'photos');
  assert.deepEqual(f.calls,['render','focus']);
});
test('current video failure returns to usable photos with feedback',async()=>{
  const f=mediaFixture(),p=f.context.switchMedia('videos');
  f.reject(Error('offline'));await p;
  assert.equal(f.context.state.media,'photos');
  assert.deepEqual(f.calls,['notice','render','focus']);
});
test('tapping the current album preserves playback; a different album resets once',()=>{
  const albums=[{id:'a',tracks:[{url:'one'}]},{id:'b',tracks:[{}, {url:'two'}]}];
  const calls=[];
  const context=vm.createContext({state:{catalog:albums,album:albums[0]},gardenLife:{introduceAlbum(){}},
    resetAudio(){calls.push('reset');},$$:()=>[],renderSelection(){},syncPlayback(){},syncQueue(){},centerAlbum(){},content:{scrollTop:0},$:()=>({scrollTop:0}),animateCover(){}});
  vm.runInContext(section('function selectAlbum(', 'function selectTrack('),context);
  context.selectAlbum('a');assert.deepEqual(calls,[]);
  context.selectAlbum('b');assert.deepEqual(calls,['reset']);
  assert.equal(context.state.trackIndex,1);
});
test('closing gallery restores idle or listening pose and invalidates pending views',()=>{
  for(const wanted of [false,true]){
    let pose,focused=false;
    const context=vm.createContext({state:{room:'gallery',wanted,viewToken:1,mediaToken:1,lastFocus:{focus(){focused=true;}}},
      room:{dataset:{queueOpen:'true'}},$:()=>({inert:true}),document:{body:{dataset:{}}},shelfCleanup(){},worldController:{update(){}},stopVideo(){},setHostPose(p){pose=p;},placeWorld(){},$$:()=>[],cancelFlight(){}});
    vm.runInContext(section('function cleanupRoom(', 'function closeRoom('),context);
    context.cleanupRoom();assert.equal(pose,wanted?'seated':'idle');assert.equal(context.room.dataset.queueOpen,'false');assert.equal(context.state.queueOpen,false);
    assert.equal(context.state.viewToken,2);assert.equal(context.state.mediaToken,2);assert.equal(focused,true);
  }
});
test('motion off cancels an in-flight cover animation',()=>{
  let cancelled=0,removed=0;
  const context=vm.createContext({state:{still:true},flight:{cancel(){cancelled++;}},flightEl:{remove(){removed++;}},
    document:{body:{dataset:{}}},$$:()=>[{setAttribute(){}}]});
  vm.runInContext(section('function cancelFlight(', 'function animateCover('),context);
  vm.runInContext(section('function setMotion(', '\nsetMotion();'),context);
  context.setMotion();assert.equal(cancelled,1);assert.equal(removed,1);
  assert.equal(context.document.body.dataset.still,'true');
});

function sessionFixture(){
  const handlers={},calls=[];
  const context=vm.createContext({navigator:{audioSession:{type:'auto'},mediaSession:{
    setActionHandler(name,fn){handlers[name]=fn;},setPositionState(p){calls.push(p);}
  }},audio:{duration:120,currentTime:30,playbackRate:1},
  state:{playing:true,wanted:true,album:{id:'album',name:'Album',cover:'assets/cover.webp',tracks:[{url:'one'},{},{url:'three'}]},trackIndex:0},
  mediaMetadataKey:'',document:{baseURI:'https://garden.example/'},URL,
  MediaMetadata:class{constructor(data){Object.assign(this,data);}},
  currentTrack:()=>({name:'Song'}),playTrack(){calls.push('play');},pauseTrack(){calls.push('pause');},
  nextTrack(){calls.push('next');},selectTrack(i,{play}){calls.push({index:i,play});},syncTime(){calls.push('time');}});
  vm.runInContext(section('function requestPlaybackSession()', 'function fmt('),context);
  return {context,handlers,calls};
}
test('native media controls use the existing player and clamp seek positions',()=>{
  const f=sessionFixture();
  f.handlers.play();f.handlers.pause();f.handlers.nexttrack();
  assert.deepEqual(f.calls.slice(0,3),['play','pause','next']);
  f.handlers.seekto({seekTime:1000});assert.equal(f.context.audio.currentTime,120);
  f.handlers.seekbackward({seekOffset:1000});assert.equal(f.context.audio.currentTime,0);
  f.handlers.previoustrack();assert.deepEqual(f.calls.at(-1),{index:2,play:true});
});
test('lock-screen metadata and playback position describe the selected track',()=>{
  const f=sessionFixture();f.context.syncMediaSession();f.context.syncMediaPosition();
  assert.equal(f.context.navigator.mediaSession.metadata.title,'Song');
  assert.equal(f.context.navigator.mediaSession.metadata.artwork[0].src,'https://garden.example/assets/cover.webp');
  assert.equal(f.context.navigator.mediaSession.playbackState,'playing');
  assert.equal(f.calls.at(-1).position,30);
  f.context.requestPlaybackSession();assert.equal(f.context.navigator.audioSession.type,'playback');
});
test('browsers without Media Session keep the native player path usable',()=>{
  const f=sessionFixture();f.context.navigator={};
  assert.doesNotThrow(()=>{f.context.installMediaSession();f.context.syncMediaSession();f.context.syncMediaPosition();f.context.requestPlaybackSession();});
});
test('a background visibility change only pauses decoration',()=>{
  let visibility;
  const context=vm.createContext({document:{hidden:true,body:{dataset:{}},
    addEventListener(name,fn){visibility=fn;}},audio:{paused:false,currentTime:37}});
  const line=source.split('\n').find(line=>line.startsWith("document.addEventListener('visibilitychange'"));
  vm.runInContext(line,context);visibility();
  assert.equal(context.document.body.dataset.pageHidden,'true');
  assert.equal(context.audio.paused,false);assert.equal(context.audio.currentTime,37);
});

test('close returns to the garden rather than reopening a previous room',()=>{
 const calls=[];const context=vm.createContext({lightbox:{open:false},room:{open:true,close(){calls.push('closed');}},location:{pathname:'/garden/',search:'?preview=1'},history:{state:{gardenRoom:true},replaceState(a,b,url){calls.push(url);},back(){throw Error('must not reopen previous room');}}});
 vm.runInContext(section('function closeRoom(', "room.addEventListener('close'"),context);context.closeRoom();assert.deepEqual(calls,['closed','/garden/?preview=1']);
});
