/* Garden Oracle — synthesis engine.

   Nguồn đầu vào độc lập:
   1) kết quả 3 hạt + Nở/Khép từ garden-oracle-data.js;
   2) semantic profile 78 hạt từ garden-oracle-profiles.js;
   3) wording/chiêm tinh chung đã kiểm duyệt từ garden-oracle-weekly-data.js.

   Engine không copy lời bloom/closed đang hiển thị, không đọc dữ liệu cá nhân
   và không tự biến một pack `review` thành nội dung live. */
(function(root){
  'use strict';

  const DOMAIN_VI={
    love:'chuyện tình cảm',
    work:'công việc',
    decision:'một điều còn chưa ngã ngũ',
    action:'bước đi kế tiếp',
    inner:'những xao động bên trong'
  };
  const DOMAIN_SHORT={ love:'tình cảm',work:'công việc',decision:'một lựa chọn',action:'hành động',inner:'nội tâm' };
  const DOMAIN_ORDER=['love','work','decision','action','inner'];

  const profiles=root.GARDEN_ORACLE_PROFILES||{};
  const allProfiles=[...(profiles.majors||[])];
  Object.values(profiles.suits||{}).forEach(cards=>allProfiles.push(...cards));
  const PROFILE_BY_ID=new Map(allProfiles.map(card=>[card.id,card]));
  const identities=root.GARDEN_ORACLE_IDENTITIES||[];
  const IDENTITY_BY_ID=new Map(identities.map(identity=>[identity.id,identity]));

  const STATE_LINES={
    0:'Cả ba đều Nở, tạo một nhịp thuận để bắt đầu.',
    1:'Hai hạt Nở tạo đà; hạt Khép giữ lại một giới hạn.',
    2:'Hạt Nở cho thấy phần có thể làm; hai hạt Khép cần được nhìn lại.',
    3:'Cả ba đều Khép, nghiêng về quan sát trước khi hành động.'
  };

  const MOVEMENT_GROUPS=[
    { values:['arriving','calling','crossing','opening','lifting','racing','steering','turning','dawning'], open:'biến điều đã rõ thành một bước đi cụ thể', closed:'đang vội tìm lối ra khi chưa biết mình thật sự muốn gì' },
    { values:['listening','noticing','reflecting','remembering','watching','scanning','seeking'], open:'nhìn kỹ để nhận ra điều quan trọng', closed:'đang suy nghĩ quá lâu và mắc lại trong nghi ngờ' },
    { values:['balancing','integrating','juggling','holding','resting','suspending'], open:'sắp xếp nhiều nhu cầu mà vẫn giữ được nhịp sống', closed:'đang để mọi chuyện lơ lửng vì chưa muốn chọn' },
    { values:['carrying','gathering','sharing','tending','savoring','flourishing','radiating'], open:'chăm điều mình đang có bằng những việc cụ thể', closed:'đang cho đi hoặc ôm giữ đến mức quên chăm mình' },
    { values:['choosing','cutting','judging','pruning','defending','confessing','concealing'], open:'phân rõ điều nên giữ, điều cần nói và điều phải buông', closed:'đang dùng sự phòng vệ để che một sự thật khó thừa nhận' },
    { values:['guiding','practicing','plodding','carrying'], open:'tiếp tục đi đều và chắc', closed:'đang theo lối quen đến quên mục đích ban đầu' },
    { values:['colliding','entangling','releasing'], open:'nhận ra chỗ mắc để thay đổi', closed:'đang giằng co với điều đã lộ rõ giới hạn' }
  ];

  const ELEMENT_RELATIONS={
    'Air+Fire':'ý nghĩ và động lực cần gặp nhau ở một việc cụ thể',
    'Earth+Water':'cảm xúc cần một hành động có thể nhìn thấy',
    'Fire+Water':'động lực và cảm nhận cần hai tốc độ khác nhau',
    'Air+Earth':'ý tưởng cần gặp nguồn lực thật',
    'Air+Water':'cảm xúc cần được gọi tên trước khi quyết định',
    'Earth+Fire':'động lực cần một nhịp đủ bền'
  };

  const VERB_AFFINITY={
    amplify:{ open:2, movements:[] },
    accelerate:{ open:2, movements:['arriving','calling','crossing','opening','lifting','racing','steering','turning','dawning'] },
    clarify:{ open:1, movements:['choosing','cutting','judging','reflecting','scanning','watching'] },
    surface:{ closed:2, movements:['listening','noticing','reflecting','remembering','concealing','confessing'] },
    soften:{ closed:1, movements:['colliding','entangling','defending','cutting'] },
    slow:{ closed:1, movements:['arriving','calling','crossing','opening','lifting','racing','steering','turning'] },
    challenge:{ closed:2, movements:['colliding','entangling','defending','cutting','judging'] },
    stabilize:{ open:1, movements:['balancing','integrating','juggling','holding','resting','tending','guiding','practicing','plodding'] }
  };

  const RHYTHM_BY_CLOSED=['go','guarded','review','pause'];
  const ACTION_POLICIES={
    go:{
      none:{ lead:'Nhịp đang mở; có thể hành động từ điều đã rõ. Bước cụ thể:' },
      amplify:{ lead:'Đà Nở đang mạnh hơn. Bước cụ thể:' },
      accelerate:{ lead:'Phần sẵn sàng có thể đi nhanh hơn. Bước cụ thể:' },
      clarify:{ lead:'Hướng đi đã rõ hơn. Bước cụ thể:' },
      slow:{ lead:'Vẫn có thể tiến, nhưng chậm lại. Bước cụ thể:' },
      challenge:{ lead:'Đi tiếp sau khi đặt giới hạn rõ. Bước cụ thể:' },
      stabilize:{ lead:'Giữ nhịp Nở bằng một việc thực tế:' }
    },
    guarded:{
      none:{ lead:'Đi từ phần Nở, trong giới hạn đã thấy rõ:' },
      amplify:{ lead:'Phần Nở mạnh hơn; vẫn giữ giới hạn:' },
      accelerate:{ lead:'Chỉ phần Nở được tăng tốc, trong giới hạn:' },
      clarify:{ lead:'Tách rõ phần được đi và giới hạn phải giữ:' },
      surface:{ lead:'Gọi tên điều Hạt Khép giữ trước khi đi:' },
      soften:{ lead:'Làm dịu sức căng, chưa xóa giới hạn:' },
      slow:{ lead:'Giảm tốc ở giới hạn vừa hiện rồi mới đi:' },
      challenge:{ lead:'Đặt giới hạn tại điểm ma sát rồi mới đi:' },
      stabilize:{ lead:'Chỉ đưa phần Nở vào một bước nhỏ:' }
    },
    review:{
      none:{ lead:'Chỉ thử nhỏ từ phần Nở, chưa chốt:' },
      amplify:{ lead:'Dùng đà Nở làm điểm thử, chưa lấn hai giới hạn:' },
      accelerate:{ lead:'Chỉ thử nhanh ở quy mô nhỏ, có thể dừng:' },
      clarify:{ lead:'Dùng điều đã rõ để xem lại, chưa chốt:' },
      surface:{ lead:'Gọi tên hai điều Khép trước khi thử:' },
      soften:{ lead:'Làm dịu sức căng, chưa giải quyết toàn bộ:' },
      slow:{ lead:'Giảm tốc; chỉ thử một bước có thể rút lại:' },
      challenge:{ lead:'Hai giới hạn nặng hơn đà Nở. Chỉ xem lại:' },
      stabilize:{ lead:'Chỉ giữ một việc nền nhỏ, chưa mở hướng mới:' }
    },
    pause:{
      none:{ text:'Hôm nay chưa cần giải quyết ngay. Hãy thở một nhịp, gọi tên điều cả ba đang cùng giữ, rồi dừng ở việc quan sát.' },
      clarify:{ text:'Hôm nay chưa cần quyết định. Hãy gọi tên điểm chung của cả ba, rồi để lựa chọn sang một nhịp khác.' },
      surface:{ text:'Hôm nay chưa nên đẩy việc này đi tiếp. Hãy thở một nhịp, đặt ba điều đang vướng cạnh nhau, rồi nhìn lại điểm chung.' },
      soften:{ text:'Hôm nay chưa cần xử lý toàn bộ. Hãy giảm sức căng trước, cho mình một khoảng nghỉ rồi mới nhìn lại.' },
      slow:{ text:'Hôm nay nên dừng ở việc quan sát. Hãy hoãn quyết định và nhìn lại cả ba nhu cầu trước khi tiếp tục.' },
      challenge:{ text:'Hôm nay chưa nên đi xuyên qua điểm ma sát. Hãy gọi tên nơi cả ba đang va vào nhau mà chưa cần xử lý ngay.' },
      stabilize:{ text:'Hôm nay chỉ nên giữ một việc nền rất nhỏ. Chưa mở thêm hướng mới cho tới khi ba điều đang Khép được nhìn rõ.' }
    }
  };
  const ASTRO_ACTION_POLICY_COUNT=Object.values(ACTION_POLICIES).reduce((sum,policies)=>sum+Object.keys(policies).filter(key=>key!=='none').length,0);
  if(ASTRO_ACTION_POLICY_COUNT!==28) throw new Error(`Garden Oracle action matrix must contain 28 astrology policies; found ${ASTRO_ACTION_POLICY_COUNT}.`);

  function profileOf(resultItem){ return PROFILE_BY_ID.get(resultItem.n ?? resultItem.card?.id); }
  function idOf(resultItem){ return profileOf(resultItem)?.id ?? resultItem.n ?? resultItem.card?.id; }
  function nameOf(resultItem){ return IDENTITY_BY_ID.get(idOf(resultItem))?.cardName||`Hạt số ${String(idOf(resultItem)).padStart(2,'0')}`; }
  function mentionOf(resultItem){ return `[[seed:${String(idOf(resultItem)).padStart(2,'0')}]]`; }
  function resolveSeedMentions(text){
    return String(text||'').replace(/\[\[seed:(\d{1,2})\]\]/g,(_,rawId)=>nameOf({n:Number(rawId)}));
  }
  function seedMentionIds(text){
    return [...String(text||'').matchAll(/\[\[seed:(\d{1,2})\]\]/g)].map(match=>Number(match[1]));
  }
  function domainOf(resultItem){ return profileOf(resultItem)?.profile?.domain||'inner'; }
  function unique(items){ return [...new Set(items)]; }
  function joinVi(items){
    if(items.length<2) return items[0]||'điều đang cần được chú ý';
    return items.slice(0,-1).join(', ')+' và '+items[items.length-1];
  }
  function trimPeriod(text){ return String(text||'').trim().replace(/[.!?]+$/,''); }
  function capitalize(text){ return text ? text.charAt(0).toUpperCase()+text.slice(1) : ''; }
  function wordCount(text){ return String(text||'').trim().split(/\s+/).filter(Boolean).length; }
  function movementPhrase(item){
    const movement=profileOf(item)?.profile?.movement;
    const group=MOVEMENT_GROUPS.find(x=>x.values.includes(movement));
    return group ? (item.closed?group.closed:group.open) : (item.closed?'chậm lại để hiểu điều đang giữ mình':'đưa điều đã rõ thành một bước vừa sức');
  }

  function stateEvidence(item){
    const semantic=profileOf(item)?.profile;
    return trimPeriod(item.closed?semantic?.risk:semantic?.gift)||movementPhrase(item);
  }

  function compactEvidence(item){
    const movement=profileOf(item)?.profile?.movement;
    const group=MOVEMENT_GROUPS.find(x=>x.values.includes(movement));
    const compact=[
      ['arriving','calling','crossing','opening','lifting','racing','steering','turning','dawning'],
      ['listening','noticing','reflecting','remembering','watching','scanning','seeking'],
      ['balancing','integrating','juggling','holding','resting','suspending'],
      ['carrying','gathering','sharing','tending','savoring','flourishing','radiating'],
      ['choosing','cutting','judging','pruning','defending','confessing','concealing'],
      ['guiding','practicing','plodding'],
      ['colliding','entangling','releasing']
    ].findIndex(values=>values.includes(movement));
    const lines=[
      ['muốn đi thành một bước cụ thể','đang vội tìm lối ra'],
      ['muốn nhìn kỹ điều quan trọng','đang mắc lại trong nghi ngờ'],
      ['muốn giữ nhiều nhu cầu cùng nhịp','đang để mọi chuyện lơ lửng'],
      ['muốn chăm điều đang có','đang ôm giữ đến quên mình'],
      ['muốn phân rõ điều giữ và buông','đang phòng vệ trước một sự thật'],
      ['muốn tiếp tục đều và chắc','đang theo lối quen quên mục đích'],
      ['muốn đổi chỗ đang mắc','đang giằng co với giới hạn đã rõ']
    ];
    return compact>-1?lines[compact][item.closed?1:0]:(group?movementPhrase(item):stateEvidence(item));
  }

  function elementRelation(a,b){
    const elements=[profileOf(a)?.element,profileOf(b)?.element].filter(Boolean).sort();
    if(elements.length===2&&elements[0]===elements[1]) return 'hai Hạt đang nhấn cùng một hướng';
    return ELEMENT_RELATIONS[elements.join('+')]||'hai nhu cầu cần được đặt cạnh nhau trước khi chọn bước tiếp theo';
  }

  function strongestSeedPair(result,preferredIds=[]){
    const pairs=[[0,1],[0,2],[1,2]].map(([a,b])=>{
      const ordered=[result[a],result[b]].sort((x,y)=>idOf(x)-idOf(y));
      const [first,second]=ordered;
      const sameDomain=domainOf(first)===domainOf(second);
      const sameMovement=profileOf(first)?.profile?.movement===profileOf(second)?.profile?.movement;
      const pairIds=[idOf(first),idOf(second)];
      const preferredScore=preferredIds.length===2&&preferredIds.every(id=>pairIds.includes(id))?100:preferredIds.length===1&&pairIds.includes(preferredIds[0])?50:0;
      return { first,second,score:preferredScore+(first.closed!==second.closed?4:0)+(sameDomain?2:0)+(sameMovement?1:0),key:idOf(first)*100+idOf(second) };
    });
    return pairs.sort((a,b)=>b.score-a.score||a.key-b.key)[0];
  }

  function relationshipLine(result,interaction){
    if(interaction?.kind==='whole'){
      const ordered=[...result].sort((a,b)=>idOf(a)-idOf(b));
      return `Trong nhịp chung này, ${mentionOf(ordered[0])} ${compactEvidence(ordered[0])}; ${mentionOf(ordered[1])} ${compactEvidence(ordered[1])}; còn ${mentionOf(ordered[2])} ${compactEvidence(ordered[2])}.`;
    }
    const preferredIds=interaction?.kind==='pair'?interaction.targetIds:interaction?.kind==='single'?interaction.targetIds.slice(0,1):[];
    const {first,second}=strongestSeedPair(result,preferredIds);
    const firstState=first.closed?'Khép':'Nở';
    const secondState=second.closed?'Khép':'Nở';
    const relation=elementRelation(first,second);
    return `${mentionOf(first)} đang ${firstState}: ${compactEvidence(first)}. ${mentionOf(second)} đang ${secondState}: ${compactEvidence(second)}. Khi đặt cạnh nhau, ${relation}.`;
  }

  function domainOpening(result){
    const domains=result.map(domainOf);
    const counts=domains.reduce((acc,d)=>(acc[d]=(acc[d]||0)+1,acc),{});
    const dominant=Object.keys(counts).find(d=>counts[d]>1);
    if(dominant){
      return { dominant, text:`Lượt đọc hôm nay tập trung vào ${DOMAIN_VI[dominant]}.` };
    }
    const labels=unique(domains).sort((a,b)=>DOMAIN_ORDER.indexOf(a)-DOMAIN_ORDER.indexOf(b)).map(d=>DOMAIN_SHORT[d]);
    return { dominant:null, text:`Lượt đọc hôm nay chạm tới ${joinVi(labels)}.` };
  }

  function selectPack(dateKey){
    const registry=root.GARDEN_ORACLE_WEEKLY||{};
    const allowReview=['localhost','127.0.0.1'].includes(root.location?.hostname);
    const review=registry.packs?.[registry.activeReviewKey];
    if(allowReview&&review?.status==='review'&&review.days?.[dateKey]) return { key:registry.activeReviewKey, pack:review };
    const latest=registry.packs?.[registry.lastApprovedKey];
    if(latest?.status==='approved'&&latest.days?.[dateKey]) return { key:registry.lastApprovedKey, pack:latest };
    const dated=Object.entries(registry.packs||{}).reverse().find(([,pack])=>pack?.status==='approved'&&pack.days?.[dateKey]);
    if(dated) return { key:dated[0],pack:dated[1] };
    return latest?.status==='approved' ? { key:registry.lastApprovedKey,pack:latest } : null;
  }

  function itemAffinity(item,verb){
    const affinity=VERB_AFFINITY[verb]||{};
    const movement=profileOf(item)?.profile?.movement;
    return (item.closed?(affinity.closed||0):(affinity.open||0))+(affinity.movements?.includes(movement)?1:0);
  }

  function verbCompatible(item,verb){
    if(['amplify','accelerate'].includes(verb)) return !item.closed;
    if(['surface','soften'].includes(verb)) return item.closed;
    if(verb==='slow') return VERB_AFFINITY.slow.movements.includes(profileOf(item)?.profile?.movement);
    return true;
  }

  function interactionText(signal,kind,targets,result){
    const names=targets.map(mentionOf);
    const stateCount=result.filter(item=>item.closed).length;
    const wholeRhythm=stateCount===0?'cùng mở về phía hành động':stateCount===3?'cùng xin một khoảng dừng':'có đà đi tới nhưng vẫn giữ một giới hạn';
    const single={
      amplify:`khuếch đại điều ${names[0]} đang mở ra`,
      accelerate:`thúc đẩy điều ${names[0]} đang mở ra đi nhanh hơn`,
      clarify:`làm rõ điều ${names[0]} đang cần phân định`,
      surface:`làm nổi lên điều ${names[0]} đang Khép giữ bên dưới`,
      soften:`làm dịu sức căng mà ${names[0]} đang Khép giữ`,
      slow:`làm chậm chuyển động quanh ${names[0]} để điều hạt này nêu ra được nhìn kỹ hơn`,
      challenge:`gây ma sát với điều ${names[0]} đang nêu ra, khiến điều ấy khó bị bỏ qua`,
      stabilize:`giúp điều ${names[0]} đang nêu ra thành một bước thực tế`
    };
    const pair={
      amplify:`khuếch đại hướng chung giữa ${names[0]} và ${names[1]}`,
      accelerate:`thúc đẩy hướng chung của ${names[0]} và ${names[1]}`,
      clarify:`làm rõ điểm gặp nhau giữa ${names[0]} và ${names[1]}`,
      surface:`làm nổi lên điều ${names[0]} và ${names[1]} cùng Khép giữ`,
      soften:`làm dịu độ căng giữa ${names[0]} và ${names[1]}`,
      slow:`làm chậm nhịp giữa ${names[0]} và ${names[1]} để hai nhu cầu không lấn át nhau`,
      challenge:`gây ma sát giữa ${names[0]} và ${names[1]}`,
      stabilize:`giúp ${names[0]} và ${names[1]} đưa nhịp chung vào một việc thực tế`
    };
    const whole={
      amplify:`khuếch đại nhịp chung khi cả ba đang ${wholeRhythm}`,
      accelerate:`thúc đẩy nhịp chung khi cả ba đang ${wholeRhythm}`,
      clarify:`làm rõ nhịp chung: cả ba đang ${wholeRhythm}`,
      surface:`làm nổi lên điều cả ba cùng giữ: chúng đang ${wholeRhythm}`,
      soften:`làm dịu nhịp chung khi cả ba đang ${wholeRhythm}`,
      slow:`điều chỉnh tốc độ khi cả ba đang ${wholeRhythm}`,
      challenge:`gây ma sát với nhịp chung khi cả ba đang ${wholeRhythm}`,
      stabilize:`giúp nhịp chung của cả ba thành một bước thực tế: ${wholeRhythm}`
    };
    const clause=(kind==='whole'?whole:kind==='pair'?pair:single)[signal.verb]||single.clarify;
    return `${trimPeriod(signal.wording)}. Trong lượt này, tín hiệu đó ${clause}.`;
  }

  function astrologyLine(result,dateKey){
    const selected=selectPack(dateKey);
    const day=selected?.pack?.days?.[dateKey]||selected?.pack?.fallback;
    const signals=day?.signals||[];
    if(!signals.length) return { text:'',labels:[],packKey:selected?.key||null,interaction:null };
    const ranked=signals.map((signal,index)=>{
      const matched=result.filter(item=>signal.domains.includes(domainOf(item))&&verbCompatible(item,signal.verb));
      const targetScores=matched.map(item=>({item,score:4+itemAffinity(item,signal.verb)})).sort((a,b)=>b.score-a.score||idOf(a.item)-idOf(b.item));
      const score=targetScores.reduce((sum,target)=>sum+target.score,0);
      return { signal,index,matched,targetScores,score };
    }).filter(candidate=>candidate.matched.length).sort((a,b)=>b.score-a.score||a.index-b.index);
    const chosen=ranked[0];
    if(!chosen) return { text:'',labels:[],packKey:selected?.key||null,interaction:null };
    const sameDomain=unique(chosen.matched.map(domainOf)).length===1;
    const sameDirection=unique(chosen.matched.map(item=>item.closed)).length===1;
    const kind=chosen.matched.length===3&&(sameDomain||sameDirection)?'whole':chosen.matched.length>1?'pair':'single';
    const targets=kind==='whole'?result:chosen.targetScores.slice(0,kind==='pair'?2:1).map(target=>target.item);
    const interaction={
      kind,
      verb:chosen.signal.verb,
      signalLabel:chosen.signal.label,
      targetIds:targets.map(idOf),
      score:chosen.score,
      evidence:targets.map(item=>({ id:idOf(item),domain:domainOf(item),state:item.closed?'closed':'open',movement:profileOf(item)?.profile?.movement }))
    };
    return {
      text:interactionText(chosen.signal,kind,targets,result),
      labels:[chosen.signal.label],
      packKey:selected.key,
      interaction
    };
  }

  function weekContext(dateKey){
    const selected=selectPack(dateKey);
    if(!selected?.pack?.days?.[dateKey]||!selected.pack.week) return null;
    return { ...selected.pack.week, packKey:selected.key };
  }

  function rhythmOf(result){
    return RHYTHM_BY_CLOSED[result.filter(item=>item.closed).length];
  }

  function actionLine(result,dominant,interaction){
    const rhythm=rhythmOf(result);
    const verb=interaction?.verb||'none';
    const policy=ACTION_POLICIES[rhythm]?.[verb];
    if(!policy) throw new Error(`Invalid Garden Oracle action policy: ${rhythm}/${verb}.`);
    const policyKey=`${rhythm}/${verb}`;
    if(policy.text) return { text:policy.text,rhythm,policyKey };
    const candidates=result.map(x=>({item:x,profile:profileOf(x)})).filter(x=>x.profile).sort((a,b)=>a.profile.id-b.profile.id);
    const targetIds=interaction?.targetIds||[];
    const anchor=candidates.find(x=>targetIds.includes(x.profile.id)&&!x.item.closed)
      ||candidates.find(x=>targetIds.includes(x.profile.id))
      ||candidates.find(x=>!x.item.closed&&(!dominant||x.profile.profile.domain===dominant))
      ||candidates.find(x=>!x.item.closed)
      ||candidates.find(x=>!dominant||x.profile.profile.domain===dominant)
      ||candidates[0];
    const action=trimPeriod(anchor?.profile?.profile?.action||'chọn một việc vừa sức cho hôm nay');
    return { text:`${policy.lead} ${capitalize(action)}.`,rhythm,policyKey };
  }

  function buildSynthesis(result,dateKey){
    if(!Array.isArray(result)||result.length!==3) throw new Error('Garden Oracle synthesis requires exactly three seeds.');
    const missing=result.filter(x=>!profileOf(x));
    if(missing.length) throw new Error('Missing semantic profile for seed id: '+missing.map(x=>x.n).join(','));
    const opening=domainOpening(result);
    const state=STATE_LINES[result.filter(x=>x.closed).length];
    const astro=astrologyLine(result,dateKey);
    const relation=relationshipLine(result,astro.interaction);
    const week=weekContext(dateKey);
    const action=actionLine(result,opening.dominant,astro.interaction);
    const guidance=action.text;
    const richParagraphs=[`${opening.text} ${state}`,relation];
    if(astro.text) richParagraphs.push(astro.text);
    richParagraphs.push(guidance);
    const paragraphs=richParagraphs.map(resolveSeedMentions);
    const fullText=paragraphs.join(' ');
    return {
      paragraphs,
      richParagraphs,
      paragraphMentions:richParagraphs.map(seedMentionIds),
      guidance,
      week,
      meta:{
        wordCount:wordCount(fullText),
        domains:result.map(domainOf),
        astrologySignals:astro.labels,
        astrologyInteraction:astro.interaction,
        actionRhythm:action.rhythm,
        actionPolicyKey:action.policyKey,
        packKey:astro.packKey,
        sourceProfileIds:result.map(x=>profileOf(x).id)
      }
    };
  }

  root.GARDEN_ORACLE_SYNTHESIS={
    buildSynthesis,domainOf,resolveSeedMentions,PROFILE_BY_ID,IDENTITY_BY_ID,DOMAIN_VI,
    RHYTHM_BY_CLOSED,ACTION_POLICIES,ASTRO_ACTION_POLICY_COUNT
  };
})(window);
