import {readFileSync} from 'node:fs';import vm from 'node:vm';import test from 'node:test';import assert from 'node:assert/strict';
const source=readFileSync(new URL('../dist/garden-life.js',import.meta.url),'utf8').replace(/^import .*$/gm,'').replaceAll('export ','');
const dialogue=readFileSync(new URL('../dist/garden-dialogue.js',import.meta.url),'utf8').replaceAll('export ','');
function fixture(){
 const elements=new Map(),events={},timers=new Map();let timerId=0;
 const el=()=>({dataset:{},textContent:'',attributes:{},listeners:{},classList:{add(){},remove(){}},setAttribute(k,v){this.attributes[k]=v;},addEventListener(k,fn){this.listeners[k]=fn;},removeEventListener(){}});
 const body=el();body.dataset.entered='true';
 const document={body,hidden:false,querySelectorAll(){return [];},removeEventListener(){},querySelector(s){if(!elements.has(s))elements.set(s,el());return elements.get(s);},addEventListener(k,fn){events[k]=fn;}};
 const wildlife={blocked:false,setPhase(){},setBlocked(value){this.blocked=value;},destroy(){}};let visibilityCallback;
 const sandbox=vm.createContext({createDailyReader:()=>async()=>({dateKey:'2026-09-17',title:'Thông điệp gốc',message:'Nội dung của ngày'}),localDay:()=> '2026-09-17',initWildlife:()=>wildlife,initGardenAmbience:()=>({setPhase(){},destroy(){}}),document,window:{removeEventListener(){},addEventListener(k,fn){events[k]=fn;}},MutationObserver:class{observe(){}disconnect(){}},IntersectionObserver:class{constructor(fn){visibilityCallback=fn;}observe(){}disconnect(){}},Date,Math,Set,setTimeout(fn,delay){const id=++timerId;timers.set(id,{fn,delay});return id;},clearTimeout(id){timers.delete(id);},setInterval(){return ++timerId;},clearInterval(){}});
 vm.runInContext(dialogue+source,sandbox);const life=sandbox.initGardenLife({audio:{paused:false},notice(){}});
 return {sandbox,life,body,document,events,timers,elements,wildlife,setVisible:visible=>visibilityCallback([{isIntersecting:visible}]),click:s=>elements.get(s).listeners.click()};
}
test('automatic day is 05:30 inclusive to 17:30 exclusive',()=>{const f=fixture();for(const [h,m,p] of [[0,0,'night'],[5,29,'night'],[5,30,'day'],[17,29,'day'],[17,30,'night']])assert.equal(f.sandbox.phaseForHour(h,m),p);f.life.destroy();});
test('daylight selection cycles day/night/device time without touching music',()=>{const f=fixture();for(const mode of ['day','night','auto']){f.click(`#daylight-${mode}`);assert.equal(f.body.dataset.dayMode,mode);if(mode!=='auto')assert.equal(f.body.dataset.dayPhase,mode);}f.life.destroy();});
test('album introduction uses selected metadata and host moments restore the prior note',()=>{
 const f=fixture();f.life.introduceAlbum({name:'Chuyện Của Trăng',description:'Những câu chuyện lấy trăng làm trọng tâm.'});const original=f.elements.get('#host-words').textContent;assert.match(original,/Chuyện Của Trăng/);
 f.life.setHostMoment({time:5,duration:3,pose:'hum',text:'QA metadata'});assert.equal(f.elements.get('#host-words').textContent,'QA metadata');assert.equal(f.body.dataset.hostMoment,'hum');f.life.setHostMoment(null);assert.equal(f.elements.get('#host-words').textContent,original);assert.equal(f.body.dataset.hostMoment,undefined);f.life.destroy();
});
test('first daily invitation starts nine seconds after entrance, and no quote repeats immediately',()=>{const f=fixture();f.events['garden-entered']();assert.ok([...f.timers.values()].some(t=>t.delay===9000));assert.equal(f.sandbox.chooseDifferent(['one','two'],'one',()=>0),'two');f.life.destroy();assert.equal(f.timers.size,0);});

test('album introduction keeps the complete source paragraph, including its ending',()=>{
 const f=fixture(),description='Một câu chuyện cần được kể đủ. '.repeat(10)+'Hết lời nhắn của Li.';
 assert.equal(f.sandbox.albumIntroduction({name:'Một album',description}),'“Một album” nè. '+description);
 f.life.destroy();
});

test('offscreen wildlife stops and resumes without controlling music',()=>{const f=fixture();f.setVisible(false);assert.equal(f.wildlife.blocked,true);assert.equal(f.body.dataset.worldOffscreen,'true');f.setVisible(true);assert.equal(f.wildlife.blocked,false);f.life.destroy();});

test('dialogue deck visits every unique line before repeating and avoids a repeat at the boundary',()=>{
 const f=fixture(),next=f.sandbox.createDialogueDeck(['A','B','C','A'],()=>.5);
 const rounds=Array.from({length:5},()=>Array.from({length:3},next));
 for(const round of rounds)assert.equal(new Set(round).size,3);
 for(let i=1;i<rounds.length;i++)assert.notEqual(rounds[i-1][2],rounds[i][0]);
 f.life.destroy();
});
test('short quotes rotate within 14–20 seconds, while complete long copy gets reading time',()=>{
 const f=fixture(),delay=f.sandbox.dialogueDelay;
 assert.equal(delay('Một câu ngắn.',()=>0),14000);assert.equal(delay('Một câu ngắn.',()=>1),20000);
 assert.ok(delay('chữ '.repeat(200),()=>0)>=77500);f.life.destroy();
});
test('spoken daily aside respects open/closed state without changing the source reading',()=>{
 const f=fixture(),message=Object.freeze({id:76,closed:false,title:'Chăm Sóc Thiết Thực',message:'Nội dung gốc'});
 assert.match(f.sandbox.dailyAside(message),/chăm sóc/);
 assert.notEqual(f.sandbox.dailyAside(message),f.sandbox.dailyAside({...message,closed:true}));
 assert.equal(message.message,'Nội dung gốc');assert.match(f.sandbox.dailyAside({id:999,title:'Gốc'}),/Gốc/);f.life.destroy();
});
test('hovering a long balloon holds its text rather than interrupting reading',()=>{
 const f=fixture(),talk=f.elements.get('#host-talk'),words=f.elements.get('#host-words'),before=words.textContent;
 talk.listeners.pointerenter();[...f.timers.values()][0].fn();assert.equal(words.textContent,before);
 talk.listeners.pointerleave();f.life.destroy();
});
