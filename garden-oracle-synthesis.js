/* Ba hạt từ khu vườn — synthesis engine (tổng hợp 3 hạt).
   Tách riêng khỏi garden-oracle-data.js (giống music-data.js) vì đây là phần
   "quy ước chung" muốn được cập nhật/mở rộng theo nhịp riêng (hàng tuần/tháng)
   mà không cần đụng vào tên hạt hay đoạn diễn giải từng lá — những phần đó coi
   như đã "chốt".

   TRIẾT LÝ (đã thống nhất với Ali): đây KHÔNG phải diễn giải tarot thật theo
   tổ hợp cụ thể — site tĩnh, không gọi AI lúc runtime, nên không thể "hiểu"
   ý nghĩa riêng của từng tổ hợp 3 lá như một reader thật. Việc của phần này
   chỉ là nêu MỘT QUY ƯỚC/XU HƯỚNG CHUNG dựa trên 2 tín hiệu đo được:
     1) bao nhiêu hạt đang Nở/Khép (0–3)
     2) ba hạt có cùng dồn về một "vùng đời sống" hay trải đều ra nhiều vùng
   Việc "áp vào tình huống cá nhân" là của người đọc, không phải của hệ thống.
   Khi ai cần đọc sâu hơn theo đúng tổ hợp của họ, đã có link @guidetheheart
   (người đọc thật) ở cuối — hệ thống tự động không cần gánh vai trò đó.

   CẬP NHẬT: mở rộng GARDEN_ORACLE_SYNTH_BANK (thêm biến thể câu vào mỗi mảng)
   bất cứ lúc nào — không cần sửa index.html. Biến thể được chọn theo TUẦN
   (deterministic theo số thứ tự tuần trong năm), nên cùng một kịch bản
   Nở/Khép + vùng vẫn đổi giọng theo từng tuần, không lặp mãi một câu. */
(function(root){
  'use strict';

  // Vùng đời sống mặc định theo suit (Minor Arcana).
  const SUIT_DOMAIN = { Wands:'action', Cups:'love', Swords:'decision', Pentacles:'work' };

  // Vùng đời sống gắn tay cho từng lá Major Arcana (không có suit để suy ra).
  const MAJOR_DOMAIN = {
    'The Fool':'action', 'The Magician':'action', 'The High Priestess':'inner',
    'The Empress':'love', 'The Emperor':'work', 'The Hierophant':'inner',
    'The Lovers':'love', 'The Chariot':'action', 'Strength':'inner',
    'The Hermit':'inner', 'Wheel of Fortune':'action', 'Justice':'decision',
    'The Hanged Man':'inner', 'Death':'action', 'Temperance':'inner',
    'The Devil':'inner', 'The Tower':'action', 'The Star':'inner',
    'The Moon':'inner', 'The Sun':'inner', 'Judgement':'action', 'The World':'action'
  };

  const DOMAIN_VI = {
    love:'tình cảm và các mối quan hệ',
    work:'công việc và đời sống thực tế',
    decision:'một quyết định hoặc điều cần nhìn thẳng vào',
    action:'hành động và những thay đổi đang diễn ra',
    inner:'nội tâm và cách bạn đang nhìn về chính mình'
  };

  function domainOf(card){
    if(!card) return 'inner';
    return card.arcana==='major' ? (MAJOR_DOMAIN[card.tarot]||'inner') : (SUIT_DOMAIN[card.suit]||'inner');
  }

  // pattern: 'cluster' (2-3 hạt cùng vùng) hay 'spread' (cả 3 khác vùng nhau).
  // closedCount: 0–3.
  // Mỗi bucket là MẢNG các biến thể — thêm câu vào đây bất cứ lúc nào để làm mới.
  const SYNTH_BANK = {
    'cluster-0':[
      'Cả ba hạt hôm nay đều đang mở, và cùng dồn về {domain} — năng lượng đã sẵn sàng, chỉ cần chọn một việc cụ thể trong vùng đó và bắt đầu thử.',
      'Hôm nay năng lượng đang tụ nhiều nhất ở {domain}, và cả ba hạt đều đang mở — đây là lúc thuận để hành động ở đó, đừng chỉ nghĩ về nó.'
    ],
    'cluster-1':[
      'Phần lớn năng lượng hôm nay đang mở, chỉ một phần còn khép lại — và cả ba hạt đều chỉ về {domain}. Đừng để phần chưa sẵn sàng cản bạn khỏi phần đã sẵn sàng trong vùng đó.',
      'Cả ba hạt hôm nay đều đang nói về {domain}, phần lớn đã sẵn sàng, chỉ một góc còn ngập ngừng — cứ bắt đầu từ phần dễ trước.'
    ],
    'cluster-2':[
      'Phần lớn năng lượng hôm nay đang khép lại, chỉ một phần đang mở — và cả ba hạt đều chỉ về {domain}. Trước khi làm thêm điều gì mới ở đó, hãy thành thật nhìn vào phần đang bị giữ lại.',
      'Cả ba hạt hôm nay đang dồn về {domain}, nhưng phần lớn vẫn đang khép — có lẽ vùng này cần được lắng nghe trước khi được hành động.'
    ],
    'cluster-3':[
      'Cả ba hạt hôm nay đều đang khép lại, và cùng chỉ về {domain} — có thể đây không phải lúc để cố thêm ở vùng đó, mà là lúc dừng lại và thành thật nhìn vào nó.',
      '{domain} đang là nơi năng lượng bị giữ lại nhiều nhất hôm nay, và cả ba hạt đều đang khép — cho vùng đó một khoảng lặng trước khi cố làm gì thêm.'
    ],
    'spread-0':[
      'Cả ba hạt hôm nay đều đang mở, và mỗi hạt lại chỉ về một vùng khác nhau trong cuộc sống bạn — năng lượng đang tốt ở nhiều phía cùng lúc, chọn vùng nào đang gọi bạn nhất và bắt đầu từ đó.',
      'Hôm nay thuận cho nhiều phía khác nhau cùng lúc — không cần dồn hết vào một chuyện, cứ để mỗi vùng tiến một chút.'
    ],
    'spread-1':[
      'Phần lớn hôm nay đang mở, chỉ một phần khép lại, trải đều trên nhiều vùng khác nhau trong cuộc sống bạn — đừng để một góc chưa sẵn sàng làm bạn quên những góc đã ổn.',
      'Ba hạt hôm nay chạm vào ba vùng khác nhau, phần lớn đã sẵn sàng — chỉ một vùng cần thêm chút thời gian.'
    ],
    'spread-2':[
      'Phần lớn hôm nay đang khép, chỉ một phần mở, trải đều trên nhiều vùng khác nhau — chọn đúng phần đang mở để bắt đầu, phần còn lại có thể chờ.',
      'Ba hạt hôm nay chạm vào ba vùng khác nhau, phần lớn đang cần được để yên — chỉ một vùng đang thật sự sẵn sàng cho bạn lúc này.'
    ],
    'spread-3':[
      'Cả ba hạt hôm nay đều đang khép, và mỗi hạt lại nói về một vùng khác nhau — có thể hôm nay là ngày cần chậm lại ở nhiều phía cùng lúc, không chỉ một chuyện.',
      'Ba vùng khác nhau trong cuộc sống bạn đều đang cần được để yên hôm nay — không phải ngày để ép mình tiến thêm ở đâu cả.'
    ]
  };

  function weekIndex(dateKey){
    // dateKey dạng 'YYYY-MM-DD' (đồng bộ với seed ngày của reading()).
    const d = new Date(dateKey+'T00:00:00');
    const start = new Date(d.getFullYear(),0,1);
    const dayOfYear = Math.floor((d-start)/86400000);
    return Math.floor(dayOfYear/7);
  }

  // result: mảng 3 phần tử {card, closed} (giống format trong reading() của index.html).
  // dateKey: 'YYYY-MM-DD' của ngày đang xem, để chọn biến thể theo tuần.
  function buildSynthesisLine(result, dateKey){
    const domains = result.map(x=>domainOf(x.card));
    const closedCount = result.filter(x=>x.closed).length;
    const uniq = [...new Set(domains)];
    const dominant = uniq.find(d=>domains.filter(x=>x===d).length>1);
    const pattern = dominant ? 'cluster' : 'spread';
    const bucket = SYNTH_BANK[pattern+'-'+closedCount] || SYNTH_BANK['spread-1'];
    const idx = weekIndex(dateKey) % bucket.length;
    const template = bucket[idx];
    const domainLabel = DOMAIN_VI[dominant || domains[0]] || 'điều bạn đang bận tâm nhất';
    return template.split('{domain}').join(domainLabel);
  }

  root.GARDEN_ORACLE_SYNTHESIS = { domainOf, buildSynthesisLine, DOMAIN_VI, SYNTH_BANK };
})(window);
