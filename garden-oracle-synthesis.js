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

  const profiles=root.GARDEN_ORACLE_PROFILES||{};
  const allProfiles=[...(profiles.majors||[])];
  Object.values(profiles.suits||{}).forEach(cards=>allProfiles.push(...cards));
  const PROFILE_BY_ID=new Map(allProfiles.map(card=>[card.id,card]));

  const STATE_LINES={
    0:'Cả ba hạt đều Nở, thuận để bắt đầu một việc mới.',
    1:'Hai hạt Nở cho thấy phần đang thuận; hạt Khép chỉ ra một giới hạn cần giữ.',
    2:'Một hạt Nở cho thấy việc có thể làm; hai hạt Khép chỉ ra điều cần xem lại.',
    3:'Cả ba hạt đều Khép; nên quan sát hoặc tìm thêm thông tin trước khi làm.'
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

  const ELEMENT_LINES={
    'Air+Fire':'Bộ ba này có cả suy nghĩ lẫn động lực. Điều còn thiếu là chọn một việc cụ thể và làm.',
    'Earth+Water':'Cảm xúc cần được chăm bằng một hành động cụ thể, thay vì chỉ giữ trong đầu.',
    'Fire+Water':'Một phần muốn tiến nhanh, một phần cần thời gian cảm nhận. Đừng ép cả hai theo cùng một tốc độ.',
    'Air+Earth':'Hãy đặt ý tưởng cạnh thời gian, tiền bạc và sức lực mình đang thật sự có.',
    'Air+Water':'Hãy gọi đúng tên điều mình đang cảm thấy trước khi quyết định.',
    'Earth+Fire':'Bạn có động lực để bắt đầu; hãy chọn nhịp đủ bền để không sớm kiệt sức.'
  };

  function profileOf(resultItem){ return PROFILE_BY_ID.get(resultItem.n ?? resultItem.card?.id); }
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

  function domainOpening(result){
    const domains=result.map(domainOf);
    const counts=domains.reduce((acc,d)=>(acc[d]=(acc[d]||0)+1,acc),{});
    const dominant=Object.keys(counts).find(d=>counts[d]>1);
    if(dominant){
      return { dominant, text:`Ba hạt tập trung vào ${DOMAIN_VI[dominant]}.` };
    }
    const labels=unique(domains).map(d=>DOMAIN_VI[d]);
    return { dominant:null, text:`Ba hạt nói về ${joinVi(labels)}. Chúng liên quan nhưng không cần giải quyết cùng lúc.` };
  }

  function semanticBridge(result){
    const phrases=unique(result.map(movementPhrase));
    if(phrases.length===1) return `Điểm chung của ba hạt là ${phrases[0]}.`;
    return `Hai điều cùng hiện lên: ${phrases[0]}; và ${phrases[1]}.`;
  }

  function elementLine(result){
    const elements=unique(result.map(x=>profileOf(x)?.element||x.card?.element).filter(Boolean));
    if(elements.length===1) return 'Cả ba hạt cùng nhấn mạnh một hướng, nên thông điệp này đáng được ưu tiên trước.';
    for(const [key,line] of Object.entries(ELEMENT_LINES)){
      const pair=key.split('+');
      if(pair.every(e=>elements.includes(e))) return line;
    }
    return 'Ba hạt kéo về nhiều hướng. Hãy kiểm tra lại điều mình đang nghĩ, điều mình đang cảm và điều mình thật sự có thể làm.';
  }

  function selectPack(dateKey){
    const registry=root.GARDEN_ORACLE_WEEKLY||{};
    const allowReview=['localhost','127.0.0.1'].includes(root.location?.hostname);
    const review=registry.packs?.[registry.activeReviewKey];
    if(allowReview&&review?.status==='review'&&review.days?.[dateKey]) return { key:registry.activeReviewKey, pack:review };
    const approved=registry.packs?.[registry.lastApprovedKey];
    return approved ? { key:registry.lastApprovedKey, pack:approved } : null;
  }

  function astrologyLine(result,dateKey){
    const selected=selectPack(dateKey);
    const day=selected?.pack?.days?.[dateKey]||selected?.pack?.fallback;
    const signals=day?.signals||[];
    if(!signals.length) return { text:'Bản live hiện không có tín hiệu chiêm tinh đã duyệt cho ngày này, nên lời tổng hợp chỉ dựa trên ba hạt và không tự thêm diễn giải.', labels:[], packKey:selected?.key||null };
    const domains=result.map(domainOf);
    const ranked=signals.map((signal,index)=>({signal,index,score:signal.domains.filter(d=>domains.includes(d)).length})).sort((a,b)=>b.score-a.score||a.index-b.index);
    const chosen=ranked.slice(0,1).map(x=>x.signal);
    return {
      text:chosen.map(x=>x.wording).join(' '),
      labels:chosen.map(x=>x.label),
      packKey:selected.key
    };
  }

  function weekContext(dateKey){
    const selected=selectPack(dateKey);
    if(!selected?.pack?.days?.[dateKey]||!selected.pack.week) return null;
    return { ...selected.pack.week, packKey:selected.key };
  }

  function actionLine(result,dominant){
    const candidates=result.map(x=>({item:x,profile:profileOf(x)})).filter(x=>x.profile);
    const anchor=candidates.find(x=>!x.item.closed&&(!dominant||x.profile.profile.domain===dominant))
      ||candidates.find(x=>!x.item.closed)
      ||candidates.find(x=>!dominant||x.profile.profile.domain===dominant)
      ||candidates[0];
    const action=trimPeriod(anchor?.profile?.profile?.action||'chọn một việc vừa sức cho hôm nay');
    return `Gợi ý cụ thể, có thể làm ngay hôm nay: ${capitalize(action)}.`;
  }

  function buildSynthesis(result,dateKey){
    if(!Array.isArray(result)||result.length!==3) throw new Error('Garden Oracle synthesis requires exactly three seeds.');
    const missing=result.filter(x=>!profileOf(x));
    if(missing.length) throw new Error('Missing semantic profile for seed id: '+missing.map(x=>x.n).join(','));
    const opening=domainOpening(result);
    const state=STATE_LINES[result.filter(x=>x.closed).length];
    const meaning=semanticBridge(result);
    const astro=astrologyLine(result,dateKey);
    const week=weekContext(dateKey);
    const guidance=actionLine(result,opening.dominant);
    const paragraphs=[`${opening.text} ${state}`,`${meaning} ${astro.text}`,guidance];
    const fullText=paragraphs.join(' ');
    return {
      paragraphs,
      guidance,
      week,
      meta:{
        wordCount:wordCount(fullText),
        domains:result.map(domainOf),
        astrologySignals:astro.labels,
        packKey:astro.packKey,
        sourceProfileIds:result.map(x=>profileOf(x).id)
      }
    };
  }

  root.GARDEN_ORACLE_SYNTHESIS={buildSynthesis,domainOf,PROFILE_BY_ID,DOMAIN_VI};
})(window);
