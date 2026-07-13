import fs from 'node:fs';
import vm from 'node:vm';

const window={location:{hostname:'localhost'}};
const context=vm.createContext({window,console,Map,Set,Object,Array,Date,String,Math,Error});
for(const file of ['garden-oracle-data.js','garden-oracle-profiles.js','garden-oracle-weekly-data.js','garden-oracle-synthesis.js']){
  vm.runInContext(fs.readFileSync(new URL('../'+file,import.meta.url),'utf8'),context,{filename:file});
}

const deck=window.GARDEN_ORACLE_CARDS;
const engine=window.GARDEN_ORACLE_SYNTHESIS;
const profiles=engine.PROFILE_BY_ID;
if(deck.length!==78||profiles.size!==78) throw new Error(`Expected 78 cards/profiles; got ${deck.length}/${profiles.size}`);

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
    if(liveOut.meta.packKey!=='2026-W29-approved'||liveOut.meta.astrologySignals.length<1||liveOut.meta.astrologySignals.length>2) throw new Error(`${ids}/${mask}: approved weekly pack missing on live`);
    if(liveOut.meta.wordCount<90||liveOut.meta.wordCount>140) throw new Error(`${ids}/${mask}: live fallback ${liveOut.meta.wordCount} words`);
    window.location.hostname='localhost';
    checked++;
  }
}
console.log(`Oracle synthesis matrix passed: ${checked} combinations × local/live modes; 78 semantic profiles and approved weekly pack loaded.`);
