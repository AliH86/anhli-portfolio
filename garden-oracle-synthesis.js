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
    love:'tình cảm',
    work:'công việc',
    decision:'một lựa chọn',
    action:'hành động',
    inner:'đời sống nội tâm'
  };

  const profiles=root.GARDEN_ORACLE_PROFILES||{};
  const allProfiles=[...(profiles.majors||[])];
  Object.values(profiles.suits||{}).forEach(cards=>allProfiles.push(...cards));
  const PROFILE_BY_ID=new Map(allProfiles.map(card=>[card.id,card]));

  const STATE_LINES={
    0:'Cả ba hạt đều Nở, tạo một nhịp sẵn sàng thử.',
    1:'Hai hạt Nở tạo đà; một hạt Khép giữ lại giới hạn.',
    2:'Một hạt Nở làm điểm tựa; hai hạt Khép cần thêm rõ ràng.',
    3:'Cả ba hạt đều Khép, đưa nhịp hôm nay về quan sát.'
  };

  const MOVEMENT_GROUPS=[
    { values:['arriving','calling','crossing','opening','lifting','racing','steering','turning','dawning'], open:'mở đường và đưa điều đã rõ thành chuyển động', closed:'vội tìm lối ra trước khi biết mình thật sự muốn đi đâu' },
    { values:['listening','noticing','reflecting','remembering','watching','scanning','seeking'], open:'nhìn kỹ để nhận ra tín hiệu quan trọng', closed:'quan sát quá lâu đến mức mắc lại trong nghi ngờ' },
    { values:['balancing','integrating','juggling','holding','resting','suspending'], open:'giữ nhiều nhu cầu trong một nhịp có thể sống được', closed:'giữ mọi thứ lơ lửng để tránh phải chọn' },
    { values:['carrying','gathering','sharing','tending','savoring','flourishing','radiating'], open:'nuôi dưỡng điều đang có bằng sự hiện diện thực tế', closed:'cho đi hoặc ôm giữ đến mức quên phần năng lượng của mình' },
    { values:['choosing','cutting','judging','pruning','defending','confessing','concealing'], open:'phân định điều cần giữ, nói rõ hoặc buông bớt', closed:'dùng phòng vệ hay phán xét để né phần sự thật khó chịu' },
    { values:['guiding','practicing','plodding','carrying'], open:'đi đều bằng kỹ năng, trách nhiệm và nhịp bền', closed:'bám vào khuôn quen đến mức mất kết nối với mục đích' },
    { values:['colliding','entangling','releasing'], open:'nhận ra điểm mắc và tạo chỗ cho một thay đổi thật', closed:'tiếp tục giằng co với điều đã cho thấy giới hạn' }
  ];

  const ELEMENT_LINES={
    'Air+Fire':'Khí và Lửa nối sự sáng rõ với động lực; ý tưởng cần thành một bước làm được.',
    'Earth+Water':'Đất và Nước nối cảm xúc với sự chăm sóc thực tế; điều được nuôi cũng cần cấu trúc.',
    'Fire+Water':'Lửa và Nước tạo hai nhịp giữa muốn tiến nhanh và cần cảm nhận kỹ.',
    'Air+Earth':'Khí và Đất đặt ý tưởng cạnh nguồn lực cùng giới hạn thực tế.',
    'Air+Water':'Khí và Nước đặt suy nghĩ cạnh cảm xúc để cả hai được gọi tên.',
    'Earth+Fire':'Đất và Lửa nối sức bật với độ bền để khởi đầu không sớm cạn.'
  };

  function profileOf(resultItem){ return PROFILE_BY_ID.get(resultItem.n ?? resultItem.card?.id); }
  function domainOf(resultItem){ return profileOf(resultItem)?.profile?.domain||'inner'; }
  function unique(items){ return [...new Set(items)]; }
  function joinVi(items){
    if(items.length<2) return items[0]||'điều đang cần được chú ý';
    return items.slice(0,-1).join(', ')+' và '+items[items.length-1];
  }
  function trimPeriod(text){ return String(text||'').trim().replace(/[.!?]+$/,''); }
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
      return { dominant, text:`Trọng tâm của ba hạt hôm nay nằm ở ${DOMAIN_VI[dominant]}.` };
    }
    const labels=unique(domains).map(d=>DOMAIN_VI[d]);
    return { dominant:null, text:`Ba hạt chạm vào ${joinVi(labels)}; chúng liên quan nhưng chưa cần xử lý cùng lúc.` };
  }

  function semanticBridge(result){
    const phrases=unique(result.map(movementPhrase));
    if(phrases.length===1) return `Chuyển động được lặp lại là ${phrases[0]}.`;
    return `Hai chuyển động gặp nhau ở đây: ${phrases[0]}; đồng thời ${phrases[1]}.`;
  }

  function elementLine(result){
    const elements=unique(result.map(x=>profileOf(x)?.element||x.card?.element).filter(Boolean));
    if(elements.length===1) return `Cả ba cùng mang chất ${elements[0]}, khuếch đại xu hướng này và đòi hỏi một nhịp nghỉ cân bằng.`;
    for(const [key,line] of Object.entries(ELEMENT_LINES)){
      const pair=key.split('+');
      if(pair.every(e=>elements.includes(e))) return line;
    }
    return 'Các nguyên tố khác nhịp giúp kiểm tra chéo cảm xúc, suy nghĩ và khả năng thực hiện.';
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

  function actionLine(result,dominant){
    const candidates=result.map(x=>({item:x,profile:profileOf(x)})).filter(x=>x.profile);
    const anchor=candidates.find(x=>!x.item.closed&&(!dominant||x.profile.profile.domain===dominant))
      ||candidates.find(x=>!x.item.closed)
      ||candidates.find(x=>!dominant||x.profile.profile.domain===dominant)
      ||candidates[0];
    const action=trimPeriod(anchor?.profile?.profile?.action||'chọn một việc vừa sức cho hôm nay').split(/[,;—]/)[0];
    return `Việc vừa sức hôm nay: ${action}.`;
  }

  function buildSynthesis(result,dateKey){
    if(!Array.isArray(result)||result.length!==3) throw new Error('Garden Oracle synthesis requires exactly three seeds.');
    const missing=result.filter(x=>!profileOf(x));
    if(missing.length) throw new Error('Missing semantic profile for seed id: '+missing.map(x=>x.n).join(','));
    const opening=domainOpening(result);
    const state=STATE_LINES[result.filter(x=>x.closed).length];
    const meaning=semanticBridge(result);
    const elements=elementLine(result);
    const astro=astrologyLine(result,dateKey);
    const guidance=actionLine(result,opening.dominant);
    const paragraphs=[opening.text,`${state} ${meaning}`,`${elements} ${astro.text}`,guidance];
    const fullText=paragraphs.join(' ');
    return {
      paragraphs,
      guidance,
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
