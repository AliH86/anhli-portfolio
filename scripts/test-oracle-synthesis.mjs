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
const configuredReviewKey=window.GARDEN_ORACLE_WEEKLY.activeReviewKey;
const latestApprovedKey=window.GARDEN_ORACLE_WEEKLY.lastApprovedKey;
window.GARDEN_ORACLE_WEEKLY.activeReviewKey=null;
const expectedRhythms=['go','guarded','review','pause'];
if(engine.RHYTHM_BY_CLOSED.join(',')!==expectedRhythms.join(',')) throw new Error('Action rhythm registry is out of sync');
if(engine.ASTRO_ACTION_POLICY_COUNT!==28) throw new Error(`Expected 28 astrology action policies; found ${engine.ASTRO_ACTION_POLICY_COUNT}`);
if(Object.values(engine.ACTION_POLICIES).filter(policies=>policies.none).length!==4) throw new Error('Expected one no-signal fallback for each action rhythm');
if(engine.ACTION_POLICIES.go.surface||engine.ACTION_POLICIES.go.soften) throw new Error('All-open rhythm cannot use closed-only verbs');
if(engine.ACTION_POLICIES.pause.amplify||engine.ACTION_POLICIES.pause.accelerate) throw new Error('All-closed rhythm cannot use open-only verbs');
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
const dates=['2026-07-13','2026-07-14','2026-07-15','2026-07-16','2026-07-17','2026-07-18','2026-07-19','2026-07-20'];
let checked=0;
const interactionKinds=new Set();
let omittedWeakSignals=0;
let outsidePreferredLength=0;
for(const dateKey of dates){
  const expectedPackKey=dateKey<'2026-07-20'?'2026-W29-approved-v2':'2026-W30-approved';
  for(const ids of cases){
    for(let mask=0;mask<8;mask++){
      const result=ids.map((id,index)=>({n:id,card:deck[id],closed:Boolean(mask&(1<<index))}));
      const out=engine.buildSynthesis(result,dateKey);
      const full=out.paragraphs.join(' ');
      if(out.richParagraphs.length!==out.paragraphs.length||out.paragraphMentions.length!==out.paragraphs.length) throw new Error(`${ids}/${mask}: rich paragraph structure mismatch`);
      if(out.paragraphs.some(paragraph=>paragraph.includes('[[seed:'))) throw new Error(`${ids}/${mask}: unresolved seed token leaked into plain text`);
      if(out.richParagraphs.map(engine.resolveSeedMentions).join('\n')!==out.paragraphs.join('\n')) throw new Error(`${ids}/${mask}: rich/plain paragraph mismatch`);
      if(out.paragraphMentions.flat().some(id=>!ids.includes(id))) throw new Error(`${ids}/${mask}: rich paragraph mentions a seed outside draw`);
      const permutations=[
        [result[0],result[2],result[1]],[result[1],result[0],result[2]],
        [result[1],result[2],result[0]],[result[2],result[0],result[1]],[result[2],result[1],result[0]]
      ];
      for(const permuted of permutations){
        const permutedOut=engine.buildSynthesis(permuted,dateKey);
        if(permutedOut.paragraphs.join('\n')!==out.paragraphs.join('\n')) throw new Error(`${ids}/${mask}: synthesis changes when draw order changes`);
      }
      if(!out.week||out.week.packKey!==expectedPackKey||!out.week.body||!out.week.carry) throw new Error(`${ids}/${mask}: approved weekly context missing locally`);
      if(out.meta.wordCount<80||out.meta.wordCount>155) throw new Error(`${ids}/${mask}: hard length limit ${out.meta.wordCount} words`);
      if(out.meta.wordCount<90||out.meta.wordCount>140) outsidePreferredLength++;
      if(out.meta.astrologySignals.length>2) throw new Error(`${ids}/${mask}: too many astrology signals`);
      const interaction=out.meta.astrologyInteraction;
      const expectedRhythm=expectedRhythms[result.filter(item=>item.closed).length];
      const expectedPolicyKey=`${expectedRhythm}/${interaction?.verb||'none'}`;
      if(out.meta.actionRhythm!==expectedRhythm||out.meta.actionPolicyKey!==expectedPolicyKey) throw new Error(`${ids}/${mask}: action policy mismatch ${out.meta.actionPolicyKey}, expected ${expectedPolicyKey}`);
      if(expectedRhythm==='pause'&&!/(?:chưa|dừng|hoãn)/iu.test(out.guidance)) throw new Error(`${ids}/${mask}: all-closed guidance does not clearly pause`);
      if(out.meta.astrologySignals.length){
        if(!interaction||!['single','pair','whole'].includes(interaction.kind)) throw new Error(`${ids}/${mask}: astrology interaction missing`);
        interactionKinds.add(interaction.kind);
        if(interaction.targetIds.some(id=>!ids.includes(id))) throw new Error(`${ids}/${mask}: astrology target is outside draw`);
        if(interaction.evidence.length!==interaction.targetIds.length) throw new Error(`${ids}/${mask}: interaction evidence mismatch`);
        if(interaction.targetIds.some(id=>!out.paragraphMentions[1].includes(id))) throw new Error(`${ids}/${mask}: relationship paragraph does not establish the astrology target`);
        if(['amplify','accelerate'].includes(interaction.verb)&&interaction.evidence.some(item=>item.state!=='open')) throw new Error(`${ids}/${mask}: ${interaction.verb} targeted a closed seed`);
        if(['surface','soften'].includes(interaction.verb)&&interaction.evidence.some(item=>item.state!=='closed')) throw new Error(`${ids}/${mask}: ${interaction.verb} targeted an open seed`);
      }else{
        if(interaction) throw new Error(`${ids}/${mask}: interaction exists without a selected signal`);
        omittedWeakSignals++;
      }
      for(const item of result){
        const shown=item.closed?item.card.closed:item.card.bloom;
        const first=shown.split(/(?<=[.?!])\s+/)[0];
        if(first.length>20&&full.includes(first)) throw new Error(`${ids}/${mask}: copied card wording`);
      }
      if(out.meta.sourceProfileIds.join(',')!==ids.join(',')) throw new Error(`${ids}/${mask}: traceability mismatch`);
      window.location.hostname='alih86.github.io';
      const liveOut=engine.buildSynthesis(result,dateKey);
      if(liveOut.meta.packKey!==expectedPackKey||liveOut.meta.astrologySignals.length>2) throw new Error(`${ids}/${mask}: approved weekly pack missing on live`);
      if(Boolean(liveOut.meta.astrologyInteraction)!==Boolean(interaction)) throw new Error(`${ids}/${mask}: local/live interaction mismatch`);
      if(!liveOut.week||liveOut.week.packKey!==expectedPackKey) throw new Error(`${ids}/${mask}: approved weekly context missing on live`);
      if(liveOut.meta.wordCount<80||liveOut.meta.wordCount>155) throw new Error(`${ids}/${mask}: live hard length limit ${liveOut.meta.wordCount} words`);
      window.location.hostname='localhost';
      checked++;
    }
  }
}
if([...interactionKinds].sort().join(',')!=='pair,single,whole') throw new Error(`Missing interaction modes: ${[...interactionKinds].join(',')}`);
if(!omittedWeakSignals) throw new Error('Expected at least one weak astrology signal to be omitted');

const actionIds=[...profiles.values()].filter(card=>card.profile.domain==='action').map(card=>card.id);
const nonActionIds=[...profiles.values()].filter(card=>card.profile.domain!=='action').map(card=>card.id);
window.GARDEN_ORACLE_WEEKLY.packs['test-accelerate']={
  status:'review',days:{'2099-01-01':{signals:[{verb:'accelerate',domains:['action'],label:'Tín hiệu kiểm thử accelerate',wording:'Nhịp thử nghiệm thúc đẩy một chuyển động đã sẵn sàng'}]}}
};
window.GARDEN_ORACLE_WEEKLY.activeReviewKey='test-accelerate';
const accelerateCases={
  single:[actionIds[0],nonActionIds[0],nonActionIds[1]],
  pair:[actionIds[0],actionIds[1],nonActionIds[0]],
  whole:[actionIds[0],actionIds[1],actionIds[2]]
};
for(const [expectedKind,ids] of Object.entries(accelerateCases)){
  const result=ids.map(id=>({n:id,card:deck[id],closed:false}));
  const out=engine.buildSynthesis(result,'2099-01-01');
  if(out.meta.astrologyInteraction?.verb!=='accelerate'||out.meta.astrologyInteraction.kind!==expectedKind) throw new Error(`Accelerate ${expectedKind} template is not reachable`);
}
window.GARDEN_ORACLE_WEEKLY.activeReviewKey=null;
delete window.GARDEN_ORACLE_WEEKLY.packs['test-accelerate'];

const latestApproved=window.GARDEN_ORACLE_WEEKLY.packs[latestApprovedKey];
if(latestApprovedKey!=='2026-W30-approved'||latestApproved?.status!=='approved'||Object.keys(latestApproved.days||{}).length!==8) throw new Error('Latest approved pack must be W30 with 8 days');

if(configuredReviewKey){
  const reviewPack=window.GARDEN_ORACLE_WEEKLY.packs[configuredReviewKey];
  const reviewDates=Object.keys(reviewPack?.days||{}).sort();
  if(reviewPack?.status!=='review'||reviewDates.length!==8) throw new Error(`Configured review pack ${configuredReviewKey} must contain 8 review days`);
  window.GARDEN_ORACLE_WEEKLY.activeReviewKey=configuredReviewKey;
  for(const dateKey of reviewDates){
    const result=[2,3,5].map((id,index)=>({n:id,card:deck[id],closed:Boolean(index===0)}));
    const out=engine.buildSynthesis(result,dateKey);
    if(out.meta.packKey!==configuredReviewKey||!out.week?.body||!out.week?.carry) throw new Error(`${dateKey}: review pack is not selected on localhost`);
    if(out.meta.wordCount<80||out.meta.wordCount>155) throw new Error(`${dateKey}: review sample hard length limit ${out.meta.wordCount} words`);
  }
}

console.log(`Oracle synthesis matrix passed: ${checked} combinations × local/live modes; 28 astrology action policies + 4 no-signal fallbacks locked; all 24 verb/kind templates reachable; ${omittedWeakSignals} weak-signal combinations omitted; ${outsidePreferredLength} outside preferred 90–140-word band.`);
