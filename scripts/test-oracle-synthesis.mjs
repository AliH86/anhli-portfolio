import fs from 'node:fs';
import vm from 'node:vm';

const window={location:{hostname:'localhost'}};
const context=vm.createContext({window,console,Map,Set,Object,Array,Date,String,Math,Error});
for(const file of ['garden-oracle-data.js','garden-oracle-profiles.js','garden-oracle-identities.js','garden-oracle-weekly-data.js','garden-oracle-synthesis.js']){
  vm.runInContext(fs.readFileSync(new URL('../'+file,import.meta.url),'utf8'),context,{filename:file});
}

const deck=window.GARDEN_ORACLE_CARDS;
const engine=window.GARDEN_ORACLE_SYNTHESIS;
const profiles=engine.PROFILE_BY_ID;
if(deck.length!==78||profiles.size!==78) throw new Error(`Expected 78 cards/profiles; got ${deck.length}/${profiles.size}`);
if(window.GARDEN_ORACLE_STATE_TITLES?.length!==78||window.GARDEN_ORACLE_CLEAR_NAMES!==window.GARDEN_ORACLE_STATE_TITLES) throw new Error('State-title registry or compatibility alias missing');
const identities=window.GARDEN_ORACLE_IDENTITIES;
if(!Array.isArray(identities)||identities.length!==78) throw new Error('Expected all 78 canonical identities');
const identityIds=new Set();
for(const identity of identities){
  if(identityIds.has(identity.id)||!deck[identity.id]) throw new Error(`Invalid identity id: ${identity.id}`);
  identityIds.add(identity.id);
  if(!identity.cardName||!identity.essence||identity.keywords.core.length<4) throw new Error(`Incomplete identity: ${identity.id}`);
  for(const state of ['open','closed']){
    const reading=identity.states[state];
    if(!reading?.title||!reading.meaning||!reading.invitation||identity.keywords[state].length<3) throw new Error(`Incomplete ${state} identity state: ${identity.id}`);
  }
}
for(let id=0;id<22;id++) if(!identityIds.has(id)) throw new Error(`Missing Journey identity: ${id}`);
for(let id=22;id<36;id++) if(!identityIds.has(id)) throw new Error(`Missing Sun identity: ${id}`);
for(let id=36;id<50;id++) if(!identityIds.has(id)) throw new Error(`Missing Dew identity: ${id}`);
for(let id=50;id<64;id++) if(!identityIds.has(id)) throw new Error(`Missing Wind identity: ${id}`);
for(let id=64;id<78;id++) if(!identityIds.has(id)) throw new Error(`Missing Earth identity: ${id}`);
const familyNames=Object.values(window.GARDEN_ORACLE_FAMILIES).map(family=>family.publicName);
if(familyNames.join(',')!=='Hành Trình,Nắng,Sương,Gió,Đất') throw new Error('Reader-facing family language is out of sync');

const cases=[
  [0,8,17],[22,24,33],[36,47,49],[50,55,62],[64,70,77],
  [6,23,69],[9,43,58],[14,37,71],[3,52,75],[18,45,66]
];
let checked=0;
for(const ids of cases){
  for(let mask=0;mask<8;mask++){
    const result=ids.map((id,index)=>({n:id,card:deck[id],closed:Boolean(mask&(1<<index))}));
    const out=engine.buildSynthesis(result,'2026-07-13');
    const full=out.paragraphs.join(' ');
    if(!out.week||out.week.packKey!=='2026-W29-approved-v2'||!out.week.body||!out.week.carry) throw new Error(`${ids}/${mask}: approved weekly context missing locally`);
    if(out.meta.wordCount<90||out.meta.wordCount>140) throw new Error(`${ids}/${mask}: ${out.meta.wordCount} words`);
    if(out.meta.astrologySignals.length>2) throw new Error(`${ids}/${mask}: too many astrology signals`);
    for(const item of result){
      const shown=item.closed?item.card.closed:item.card.bloom;
      const first=shown.split(/(?<=[.?!])\s+/)[0];
      if(first.length>20&&full.includes(first)) throw new Error(`${ids}/${mask}: copied card wording`);
    }
    if(out.meta.sourceProfileIds.join(',')!==ids.join(',')) throw new Error(`${ids}/${mask}: traceability mismatch`);
    window.location.hostname='alih86.github.io';
    const liveOut=engine.buildSynthesis(result,'2026-07-13');
    if(liveOut.meta.packKey!=='2026-W29-approved-v2'||liveOut.meta.astrologySignals.length<1||liveOut.meta.astrologySignals.length>2) throw new Error(`${ids}/${mask}: approved weekly pack missing on live`);
    if(!liveOut.week||liveOut.week.packKey!=='2026-W29-approved-v2') throw new Error(`${ids}/${mask}: approved weekly context missing on live`);
    if(liveOut.meta.wordCount<90||liveOut.meta.wordCount>140) throw new Error(`${ids}/${mask}: live fallback ${liveOut.meta.wordCount} words`);
    window.location.hostname='localhost';
    checked++;
  }
}
console.log(`Oracle synthesis matrix passed: ${checked} combinations × local/live modes; 78 semantic profiles and approved weekly pack loaded.`);
