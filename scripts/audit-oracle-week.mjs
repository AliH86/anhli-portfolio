import fs from 'node:fs';
import vm from 'node:vm';

const window={location:{hostname:'localhost'}};
const context=vm.createContext({window,console,Map,Set,Object,Array,Date,String,Math,Error});
for(const file of ['garden-oracle-data.js','garden-oracle-profiles.js','garden-oracle-identities.js','garden-oracle-weekly-data.js','garden-oracle-synthesis.js']){
  vm.runInContext(fs.readFileSync(new URL('../'+file,import.meta.url),'utf8'),context,{filename:file});
}

const deck=window.GARDEN_ORACLE_CARDS;
const engine=window.GARDEN_ORACLE_SYNTHESIS;
if(engine.ASTRO_ACTION_POLICY_COUNT!==28) throw new Error(`Action matrix must contain 28 astrology policies; found ${engine.ASTRO_ACTION_POLICY_COUNT}`);
if(Object.values(engine.ACTION_POLICIES).filter(policies=>policies.none).length!==4) throw new Error('Action matrix must contain 4 no-signal fallbacks');
const registry=window.GARDEN_ORACLE_WEEKLY;
const pack=registry.packs[registry.activeReviewKey]||registry.packs[registry.lastApprovedKey];
const dates=Object.keys(pack.days||{}).sort();
const identities=window.GARDEN_ORACLE_IDENTITIES;
const summaryOnly=process.argv.includes('--summary');
const allowedVerbs=new Set(['amplify','accelerate','clarify','surface','soften','slow','challenge','stabilize']);
const allowedDomains=new Set(['love','work','decision','action','inner']);
if(dates.length!==8) throw new Error(`Weekly pack must contain 8 days; found ${dates.length}`);
let signalCount=0;
for(const date of dates){
  const signals=pack.days[date]?.signals||[];
  if(signals.length>2) throw new Error(`${date}: expected at most 2 signals; found ${signals.length}`);
  const labels=new Set();
  for(const signal of signals){
    signalCount++;
    if(!allowedVerbs.has(signal.verb)) throw new Error(`${date}: invalid interaction verb ${signal.verb}`);
    if(!Array.isArray(signal.domains)||!signal.domains.length||signal.domains.length>2||signal.domains.some(domain=>!allowedDomains.has(domain))) throw new Error(`${date}: invalid domains for ${signal.label||signal.verb}`);
    if(!String(signal.label||'').trim()||!String(signal.wording||'').trim()) throw new Error(`${date}: signal label and wording are required`);
    if(labels.has(signal.label)) throw new Error(`${date}: duplicate signal label ${signal.label}`);
    labels.add(signal.label);
  }
}
const combinations=deck.length*(deck.length-1)*(deck.length-2)/6;
const states=2**3;
const perDay=combinations*states;
const totalExpected=perDay*dates.length;
const forbiddenPatterns=[
  { label:'khung phủ định vòng vo',pattern:/không phải.+mà là/iu },
  { label:'cụm mơ hồ cũ “đủ yên”',pattern:/đủ yên/iu },
  { label:'cụm mơ hồ cũ “mang theo”',pattern:/mang theo/iu },
  { label:'cụm tên cũ tối nghĩa',pattern:/nhận ra mưa mời/iu }
];
const fragmentEnding=/(?:\s|^)(?:và|hoặc|nhưng|để|khi|vì|một|đang|muốn)[.!?]?$/iu;
const startedAt=Date.now();

function freshDay(){
  return { total:0,omitted:0,kinds:{single:0,pair:0,whole:0},verbs:{},policies:{},minWords:Infinity,maxWords:0,outsidePreferred:0,issues:0 };
}

const report={
  pack:registry.activeReviewKey||registry.lastApprovedKey,
  dates,
  formula:{ cards:deck.length,combinations,states,perDay,totalExpected },
  totals:{ evaluated:0,omitted:0,kinds:{single:0,pair:0,whole:0},verbs:{},policies:{},minWords:Infinity,maxWords:0,outsidePreferred:0,issues:0,issueTypes:{} },
  byDate:Object.fromEntries(dates.map(date=>[date,freshDay()])),
  examples:new Map(),
  boundaries:{ shortest:null,longest:null },
  issueExamples:[]
};

function addIssue(date,ids,mask,label,text){
  report.totals.issues++;
  report.totals.issueTypes[label]=(report.totals.issueTypes[label]||0)+1;
  report.byDate[date].issues++;
  if(report.issueExamples.length<20) report.issueExamples.push({date,ids,mask,label,text});
}

function inspectClarity(out,date,ids,mask){
  const full=out.paragraphs.join(' ');
  if(out.richParagraphs.length!==out.paragraphs.length||out.paragraphMentions.length!==out.paragraphs.length) addIssue(date,ids,mask,'cấu trúc rich/plain lệch nhau',full);
  if(out.richParagraphs.map(engine.resolveSeedMentions).join('\n')!==out.paragraphs.join('\n')) addIssue(date,ids,mask,'token Hạt không khớp plain text',full);
  if(out.paragraphMentions.flat().some(id=>!ids.includes(id))) addIssue(date,ids,mask,'token nhắc Hạt ngoài lượt rút',full);
  if(out.meta.wordCount<80||out.meta.wordCount>155) addIssue(date,ids,mask,`vượt biên cứng ${out.meta.wordCount} chữ`,full);
  if(out.meta.wordCount<90||out.meta.wordCount>140){
    report.totals.outsidePreferred++;
    report.byDate[date].outsidePreferred++;
  }
  if(out.paragraphs.length!==(out.meta.astrologyInteraction?4:3)) addIssue(date,ids,mask,'sai cấu trúc 3/4 nhịp',full);
  const closedCount=[0,1,2].reduce((count,index)=>count+Boolean(mask&(1<<index)),0);
  const expectedRhythm=engine.RHYTHM_BY_CLOSED[closedCount];
  const expectedPolicy=`${expectedRhythm}/${out.meta.astrologyInteraction?.verb||'none'}`;
  if(out.meta.actionRhythm!==expectedRhythm||out.meta.actionPolicyKey!==expectedPolicy) addIssue(date,ids,mask,'sai policy hành động',`${out.meta.actionPolicyKey}; expected ${expectedPolicy}`);
  if(expectedRhythm==='pause'&&!/(?:chưa|dừng|hoãn)/iu.test(out.guidance)) addIssue(date,ids,mask,'ba Khép không tạo nhịp dừng',out.guidance);
  for(const rule of forbiddenPatterns) if(rule.pattern.test(full)) addIssue(date,ids,mask,rule.label,full);
  for(const sentence of full.split(/(?<=[.!?])\s+/)){
    const words=sentence.trim().split(/\s+/).filter(Boolean);
    if(words.length>55) addIssue(date,ids,mask,`câu quá dài ${words.length} chữ`,sentence);
    if(fragmentEnding.test(sentence.trim())) addIssue(date,ids,mask,'câu kết ở từ nối',sentence);
  }
  const interaction=out.meta.astrologyInteraction;
  if(!interaction) return;
  if(interaction.targetIds.some(id=>!out.paragraphMentions[1].includes(id))) addIssue(date,ids,mask,'đoạn quan hệ chưa tag đủ Hạt mục tiêu',out.richParagraphs[1]);
  const astro=out.paragraphs[2];
  if(interaction.kind==='whole'&&!/(?:cả ba|bộ ba|nhịp cả ba)/iu.test(astro)) addIssue(date,ids,mask,'whole không gọi nhịp cả ba',astro);
  if(interaction.kind!=='whole'){
    for(const id of interaction.targetIds){
      if(!astro.includes(identities[id].cardName)) addIssue(date,ids,mask,`thiếu tên Hạt mục tiêu ${id}`,astro);
    }
  }
}

for(const date of dates){
  const day=report.byDate[date];
  for(let a=0;a<deck.length-2;a++){
    for(let b=a+1;b<deck.length-1;b++){
      for(let c=b+1;c<deck.length;c++){
        const ids=[a,b,c];
        for(let mask=0;mask<states;mask++){
          const result=ids.map((id,index)=>({n:id,card:deck[id],closed:Boolean(mask&(1<<index))}));
          const out=engine.buildSynthesis(result,date);
          const interaction=out.meta.astrologyInteraction;
          const policy=out.meta.actionPolicyKey;
          day.total++;
          report.totals.evaluated++;
          day.minWords=Math.min(day.minWords,out.meta.wordCount);
          day.maxWords=Math.max(day.maxWords,out.meta.wordCount);
          report.totals.minWords=Math.min(report.totals.minWords,out.meta.wordCount);
          report.totals.maxWords=Math.max(report.totals.maxWords,out.meta.wordCount);
          day.policies[policy]=(day.policies[policy]||0)+1;
          report.totals.policies[policy]=(report.totals.policies[policy]||0)+1;
          if(!report.examples.has(`policy:${policy}`)) report.examples.set(`policy:${policy}`,{date,ids,mask,text:out.paragraphs.join('\n')});
          const boundary={date,ids,mask,words:out.meta.wordCount,text:out.paragraphs.join('\n')};
          if(!report.boundaries.shortest||out.meta.wordCount<report.boundaries.shortest.words) report.boundaries.shortest=boundary;
          if(!report.boundaries.longest||out.meta.wordCount>report.boundaries.longest.words) report.boundaries.longest=boundary;
          if(interaction){
            day.kinds[interaction.kind]++;
            report.totals.kinds[interaction.kind]++;
            day.verbs[interaction.verb]=(day.verbs[interaction.verb]||0)+1;
            report.totals.verbs[interaction.verb]=(report.totals.verbs[interaction.verb]||0)+1;
            const cell=`${interaction.verb}/${interaction.kind}`;
            if(!report.examples.has(cell)) report.examples.set(cell,{date,ids,mask,text:out.paragraphs.join('\n')});
          }else{
            day.omitted++;
            report.totals.omitted++;
            if(!report.examples.has('omitted')) report.examples.set('omitted',{date,ids,mask,text:out.paragraphs.join('\n')});
          }
          inspectClarity(out,date,ids,mask);
        }
      }
    }
  }
}

if(report.totals.evaluated!==totalExpected) throw new Error(`Expected ${totalExpected} cases, evaluated ${report.totals.evaluated}`);

const percent=value=>(value*100/report.totals.evaluated).toFixed(2)+'%';
const activeInteractionCells=[...report.examples.keys()].filter(cell=>cell!=='omitted'&&!cell.startsWith('policy:')).length;
const activeActionPolicies=Object.keys(report.totals.policies).length;
const elapsedSeconds=((Date.now()-startedAt)/1000).toFixed(1);
console.log(`# Garden Oracle — weekly feasibility audit\n`);
console.log(`- Pack: ${report.pack}`);
console.log(`- Forecast: ${signalCount} tín hiệu / ${dates.length} ngày`);
console.log(`- Công thức: C(${deck.length},3) × 2³ × ${dates.length} ngày = ${report.totals.evaluated.toLocaleString('vi-VN')} trường hợp`);
console.log(`- Thời gian quét: ${elapsedSeconds} giây`);
console.log(`- Khoảng chữ: ${report.totals.minWords}–${report.totals.maxWords}`);
console.log(`- Ngoài khoảng ưu tiên 90–140: ${report.totals.outsidePreferred.toLocaleString('vi-VN')} (${percent(report.totals.outsidePreferred)}) — cần đọc mẫu biên, không tự rút câu`);
console.log(`- Bỏ tín hiệu yếu: ${report.totals.omitted.toLocaleString('vi-VN')} (${percent(report.totals.omitted)})`);
console.log(`- Dạng tương tác: single ${report.totals.kinds.single.toLocaleString('vi-VN')} · pair ${report.totals.kinds.pair.toLocaleString('vi-VN')} · whole ${report.totals.kinds.whole.toLocaleString('vi-VN')}`);
console.log(`- Ô động từ/dạng thực sự xuất hiện: ${activeInteractionCells}/24`);
console.log(`- Policy hành động thực sự xuất hiện: ${activeActionPolicies}/32 (28 có chiêm tinh + 4 fallback)`);
console.log(`- Cờ rõ nghĩa kỹ thuật: ${report.totals.issues.toLocaleString('vi-VN')}\n`);
if(report.totals.issues) console.log(`- Phân loại cờ: ${Object.entries(report.totals.issueTypes).sort((a,b)=>b[1]-a[1]).map(([label,count])=>`${label}: ${count.toLocaleString('vi-VN')}`).join(' · ')}\n`);
console.log(`| Ngày | Tổng | Bỏ yếu | Single | Pair | Whole | Chữ | Ngoài 90–140 | Cờ |`);
console.log(`|---|---:|---:|---:|---:|---:|---:|---:|---:|`);
for(const date of dates){
  const day=report.byDate[date];
  console.log(`| ${date} | ${day.total.toLocaleString('vi-VN')} | ${day.omitted.toLocaleString('vi-VN')} | ${day.kinds.single.toLocaleString('vi-VN')} | ${day.kinds.pair.toLocaleString('vi-VN')} | ${day.kinds.whole.toLocaleString('vi-VN')} | ${day.minWords}–${day.maxWords} | ${day.outsidePreferred.toLocaleString('vi-VN')} | ${day.issues} |`);
}
if(!summaryOnly){
  console.log(`\n## Hai mẫu biên bắt buộc đọc\n`);
  for(const [label,example] of Object.entries(report.boundaries)) console.log(`### ${label} — ${example.words} chữ · ${example.date} · ${example.ids.join('/')} · mask ${example.mask}\n\n${example.text}\n`);
  console.log(`\n## Mẫu bắt buộc đọc bằng mắt\n`);
  for(const [cell,example] of [...report.examples].sort(([a],[b])=>a.localeCompare(b))){
    console.log(`### ${cell} — ${example.date} · ${example.ids.join('/')} · mask ${example.mask}\n\n${example.text}\n`);
  }
}
if(report.issueExamples.length){
  console.log(`## Cờ cần sửa trước khi duyệt\n`);
  for(const issue of report.issueExamples) console.log(`- ${issue.date} · ${issue.ids.join('/')} · mask ${issue.mask}: ${issue.label}`);
  process.exitCode=1;
}
