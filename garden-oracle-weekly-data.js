/* Garden Oracle — dữ kiện chiêm tinh chung và wording pack đã biên tập.

   Quy tắc publish:
   - `review`: chỉ được dùng trên localhost để Ali duyệt.
   - `approved`: được phép dùng trên live.
   - nếu tuần hiện tại chưa approved, engine tự rơi về `baseline-approved`.

   Dữ kiện 2026-07-13 → 2026-07-20 được đối chiếu từ:
   - Astrodienst Swiss Ephemeris 2026 (geocentric, 00:00 UT)
     https://www.astro.com/swisseph/ae/2000/ae_2026.pdf
   - NASA Moon Phases / SKYCAL
     https://science.nasa.gov/moon/moon-phases/

   Dữ kiện 2026-08-05 → 2026-08-20 (pack W32 + W33) được tính lại bằng
   Swiss Ephemeris qua pyswisseph (geocentric, tropical, giờ ghi trong nhãn
   đã quy về giờ Việt Nam UTC+7): vị trí 9 hành tinh 00:00 UT mỗi ngày, thời
   điểm chính xác của các góc chính, ingress cung và các pha Trăng.
   Nhật thực toàn phần 12/8/2026 — pha một phần bắt đầu 15:34 UT, toàn phần
   16:58–18:34 UT, cực đại 17:46 UT (00:46 ngày 13/8 giờ VN); dải toàn phần
   qua Bắc Cực, Greenland, Iceland, Tây Ban Nha — KHÔNG quan sát được từ
   Việt Nam. Trăng non đúng 17:36 UT ngày 12/8. Mưa sao băng Anh Tiên đạt
   đỉnh đêm 12 rạng 13/8 trong điều kiện không trăng.
   Đối chiếu: timeanddate.com/eclipse/solar/2026-august-12,
   amsmeteors.org meteor shower calendar 2026-2027.

   Đây là thời tiết chung, không dùng giờ sinh, vị trí, nhà hay cung Mọc. */
(function(root){
  'use strict';

  const packs={
    'baseline-approved':{
      status:'approved',
      label:'Bản nền đã duyệt — không gắn chiêm tinh',
      days:{},
      fallback:{ signals:[] }
    },
    '2026-W29-approved':{
      status:'approved',
      label:'13–20/7/2026 · Ali duyệt cùng local QA',
      sourceCheckedAt:'2026-07-13',
      days:{
        '2026-07-13':{ signals:[
          { verb:'clarify', domains:['decision','inner'], label:'Mặt Trời gặp Sao Thuỷ nghịch hành ở Cự Giải', wording:'Hôm nay hợp để nghe lại điều mình đang nghĩ và nói, rồi gọi đúng tên nhu cầu trước khi quyết định.' },
          { verb:'slow', domains:['inner','love'], label:'Trăng tàn trước kỳ Trăng non', wording:'Nhịp Trăng cuối chu kỳ khuyến khích khép bớt việc cũ và dành khoảng trống cho điều sắp bắt đầu.' }
        ]},
        '2026-07-14':{ signals:[
          { verb:'surface', domains:['inner','love'], label:'Trăng non ở Cự Giải', wording:'Trăng non làm rõ nhu cầu được an toàn, được thuộc về và chăm sóc cẩn thận một khởi đầu mới.' },
          { verb:'challenge', domains:['love','work'], label:'Sao Kim tạo góc vuông với Sao Thiên Vương', wording:'Một thay đổi bất ngờ trong giá trị, quan hệ hoặc nhịp sinh hoạt có thể buộc mình nhìn lại điều thật sự phù hợp.' }
        ]},
        '2026-07-15':{ signals:[
          { verb:'surface', domains:['action','inner'], label:'Trăng lưỡi liềm đầu chu kỳ', wording:'Năng lượng đầu chu kỳ làm rõ một mong muốn mới, nhưng nó cần được thử ở quy mô nhỏ trước khi thành cam kết.' },
          { verb:'challenge', domains:['love','work'], label:'Sao Kim và Sao Thiên Vương còn trong vùng ảnh hưởng', wording:'Sự linh hoạt có ích hơn việc cố giữ mọi quan hệ hoặc kế hoạch y nguyên như trước.' }
        ]},
        '2026-07-16':{ signals:[
          { verb:'amplify', domains:['action','inner'], label:'Mặt Trăng đi qua Sư Tử', wording:'Bối cảnh hôm nay khuếch đại nhu cầu biểu đạt và được nhìn thấy; điều đáng giữ là sự chân thành phía sau cách mình xuất hiện.' },
          { verb:'clarify', domains:['decision'], label:'Sao Thuỷ tiếp tục nghịch hành ở Cự Giải', wording:'Một quyết định cũ có thể cần được đọc lại bằng cảm xúc hiện tại, thay vì phản ứng theo quán tính.' }
        ]},
        '2026-07-17':{ signals:[
          { verb:'stabilize', domains:['work','inner'], label:'Mặt Trăng chuyển vào Xử Nữ', wording:'Nhịp ngày hỗ trợ việc sắp xếp, chăm sóc chi tiết và biến một ý định thành bước thực tế vừa sức.' },
          { verb:'soften', domains:['love','work'], label:'Mặt Trăng tiến gần Sao Kim ở Xử Nữ', wording:'Sự quan tâm dễ được cảm nhận rõ hơn qua một hành động thiết thực thay vì một lời hứa lớn.' }
        ]},
        '2026-07-18':{ signals:[
          { verb:'stabilize', domains:['work','decision'], label:'Mặt Trăng ở Xử Nữ', wording:'Hôm nay thuận cho việc phân loại điều cần làm, điều có thể chờ và điều nên được bỏ khỏi danh sách.' },
          { verb:'clarify', domains:['inner'], label:'Sao Thuỷ nghịch hành', wording:'Việc rà lại một cuộc trò chuyện hoặc kế hoạch cũ có thể làm lộ ra chi tiết từng bị bỏ qua.' }
        ]},
        '2026-07-19':{ signals:[
          { verb:'soften', domains:['love','decision'], label:'Mặt Trăng chuyển qua Thiên Bình', wording:'Bối cảnh làm nổi bật nhu cầu cân bằng giữa tiếng nói của mình và điều người khác đang thật sự cần.' },
          { verb:'slow', domains:['decision'], label:'Sao Thuỷ vẫn trong chu kỳ xem lại', wording:'Một cuộc trao đổi quan trọng sẽ có lợi khi mỗi bên có thêm thời gian sửa cách diễn đạt.' }
        ]},
        '2026-07-20':{ signals:[
          { verb:'clarify', domains:['love','decision'], label:'Mặt Trăng ở Thiên Bình', wording:'Hôm nay hợp để nhìn một lựa chọn từ hai phía và gọi tên điểm cân bằng vừa sức.' },
          { verb:'stabilize', domains:['work','action'], label:'Trăng non đang lớn dần', wording:'Một khởi đầu nhỏ có thể được giữ lại bằng nhịp đều và giới hạn rõ, thay vì mở rộng quá nhanh.' }
        ]}
      }
    }
  };

  packs['2026-W29-approved-v2']={
    ...packs['2026-W29-approved'],
    status:'approved',
    label:'13–20/7/2026 · nhịp tuần được Ali duyệt',
    week:{
      eyebrow:'Bối cảnh chung · 13–19/7',
      title:'Chậm lại để bắt đầu cho đúng',
      body:'Trăng non ngày 14/7 mở đầu một chu kỳ mới. Cùng lúc, Sao Thuỷ nghịch hành ở Cự Giải khiến việc giao tiếp và ra quyết định dễ bị ảnh hưởng bởi cảm xúc cũ. Tuần này phù hợp để xác định điều mình thật sự cần, nói lại cho rõ một chuyện còn dang dở và thử khởi đầu ở quy mô nhỏ.',
      carry:'Việc có thể làm trong tuần: dành một buổi tối để nghỉ cho lại sức; nói rõ một câu mình từng diễn đạt chưa trọn; và chọn một việc nhỏ để làm đều trong bảy ngày.'
    }
  };

  packs['2026-W30-approved']={
    status:'approved',
    label:'20–27/7/2026 · Ali duyệt',
    sourceCheckedAt:'2026-07-14',
    week:{
      eyebrow:'Bối cảnh chung · 20–26/7',
      title:'Mở rộng nhưng vẫn giữ đúng nhịp',
      body:'Trăng thượng huyền ngày 21/7 đưa những khởi đầu gần đây vào giai đoạn cần làm thật và điều chỉnh thật. Các góc hợp của Sao Mộc mở rộng tầm nhìn, trong khi Mặt Trời chuyển vào Sư Tử làm nhu cầu thể hiện rõ hơn. Tuần này phù hợp để thử một hướng mới, nhưng cần phân biệt sự tự tin với việc ép mọi thứ tiến nhanh.',
      carry:'Việc có thể làm trong tuần: chọn một ý tưởng để thử ở quy mô nhỏ; nói rõ giới hạn trước khi nhận thêm việc; và dành một lần xem lại động cơ của mình trước một quyết định lớn.'
    },
    days:{
      '2026-07-20':{ signals:[
        { verb:'amplify', domains:['action','inner'], label:'Sao Mộc tam hợp Sao Hải Vương', wording:'Một tầm nhìn rộng hơn có thể làm mạnh nhu cầu sáng tạo hoặc theo đuổi điều mình thật sự tin tưởng.' },
        { verb:'challenge', domains:['work','decision'], label:'Sao Mộc đối đỉnh Sao Diêm Vương', wording:'Mong muốn mở rộng có thể va vào vấn đề quyền kiểm soát, nguồn lực hoặc cái giá phải trả cho một lựa chọn lớn.' }
      ]},
      '2026-07-21':{ signals:[
        { verb:'stabilize', domains:['action','work'], label:'Trăng thượng huyền', wording:'Nửa đầu chu kỳ Mặt Trăng đưa một ý định tới lúc cần được thử bằng việc làm đều và có thể đo được.' },
        { verb:'accelerate', domains:['action','decision'], label:'Sao Mộc lục hợp Sao Thiên Vương', wording:'Một cách làm mới có thể tạo đà nhanh, nhất là khi thử nghiệm đủ nhỏ để còn điều chỉnh.' }
      ]},
      '2026-07-22':{ signals:[
        { verb:'amplify', domains:['inner','action'], label:'Mặt Trời chuyển vào Sư Tử', wording:'Nhu cầu thể hiện, sáng tạo và đứng ra nhận phần việc của mình trở nên nổi bật hơn.' }
      ]},
      '2026-07-23':{ signals:[
        { verb:'slow', domains:['love','work'], label:'Sao Kim tạo góc điều chỉnh với Sao Thổ', wording:'Sự quan tâm và trách nhiệm đang cần một nhịp thực tế hơn để không biến chăm sóc thành gánh nặng.' },
        { verb:'challenge', domains:['inner','action'], label:'Mặt Trời vuông góc Chiron', wording:'Một điểm thiếu tự tin có thể hiện rõ khi mình muốn bước ra, thể hiện hoặc bảo vệ điều quan trọng.' }
      ]},
      '2026-07-24':{ signals:[
        { verb:'soften', domains:['love','decision'], label:'Sao Thuỷ lục hợp Sao Kim', wording:'Một cuộc trao đổi dễ bớt căng hơn khi cảm xúc được nói bằng từ ngữ cụ thể và có chỗ cho cả hai phía.' }
      ]},
      '2026-07-25':{ signals:[
        { verb:'stabilize', domains:['inner','work'], label:'Sao Hải Vương lục hợp Sao Diêm Vương', wording:'Một thay đổi sâu và chậm có thể được giữ lại bằng thói quen nhỏ, thay vì chỉ tồn tại như một ý tưởng lớn.' }
      ]},
      '2026-07-26':{ signals:[
        { verb:'challenge', domains:['action','decision'], label:'Sao Hoả tạo góc căng với Sao Diêm Vương', wording:'Áp lực muốn thắng hoặc đẩy nhanh kết quả có thể làm lộ nơi mình đang dùng quá nhiều sức cho một hướng.' }
      ]},
      '2026-07-27':{ signals:[
        { verb:'challenge', domains:['action','work'], label:'Mặt Trời đối đỉnh Sao Diêm Vương', wording:'Nhu cầu được công nhận có thể va vào quyền kiểm soát hoặc một cấu trúc không còn cho mình đủ khoảng thở.' },
        { verb:'slow', domains:['work','decision'], label:'Sao Thổ bắt đầu nghịch hành', wording:'Một cam kết, giới hạn hoặc kế hoạch dài hạn cần được xem lại trước khi tiếp tục tăng thêm trách nhiệm.' }
      ]}
    }
  };

  /* Dữ kiện 2026-07-28 → 2026-08-04 đối chiếu từ:
     - Moon phase & sign ingress: Cafe Astrology Moon Calendar 2026
       https://cafeastrology.com/calendars/moon-calendar-2026.html
     - Full Moon (29/7, 14:36 UTC, Bảo Bình): Star Walk
       https://starwalk.space/en/news/full-moon-july
     - Aspect exact dates (Mặt Trời/Sao Diêm Vương/Sao Hải Vương/Sao Thiên
       Vương/Sao Mộc/Sao Kim/Sao Hoả): Cafe Astrology 2026 Aspects
       https://cafeastrology.com/2026-astrological-aspects.html
     - Sao Thuỷ trực hành 23/7 lúc 16°19' Cự Giải: Astrocalcs Mercury
       Retrograde Dates https://astrocalcs.com/mercury-retrograde-dates/
     Giờ ingress gốc theo Eastern Time, đã quy đổi tương đối sang giờ Việt Nam
     (ICT = ET + 11h mùa hè) để chọn ngày lịch cho đúng; đây vẫn là thời tiết
     chung, không dùng giờ sinh/vị trí/nhà/cung Mọc. */
  packs['2026-W31-approved']={
    status:'approved',
    label:'28/7–4/8/2026 · Ali duyệt',
    sourceCheckedAt:'2026-07-23',
    week:{
      eyebrow:'Bối cảnh chung · 28/7–3/8',
      title:'Toả sáng mà không đánh mất mình',
      body:'Trăng tròn ngày 29/7 ở Bảo Bình đối diện Mặt Trời đang hội hợp Sao Mộc ở Sư Tử, đẩy nhu cầu được thể hiện và nhu cầu thuộc về một điều lớn hơn bản thân lên cao điểm cùng lúc. Sao Kim tạo góc căng với Sao Hoả khiến cách mình muốn chăm sóc và cách người khác muốn được thúc đẩy dễ lệch nhịp. Nửa sau tuần, Mặt Trăng lần lượt đi qua Song Ngư rồi Bạch Dương, đưa nhịp ngày từ buông lỏng và lắng nghe trực giác sang một khởi đầu thẳng và nhanh hơn.',
      carry:'Việc có thể làm trong tuần: chọn một cách cụ thể để được nhìn thấy mà không cần gồng; nói rõ một chỗ đang lệch nhịp trong một mối quan tâm gần đây; và dành riêng một buổi chỉ để nghỉ, trước khi bắt đầu việc mới vào cuối tuần.'
    },
    days:{
      '2026-07-28':{ signals:[
        { verb:'stabilize', domains:['decision','inner'], label:'Sao Thuỷ tiếp tục đi thuận ở Cự Giải', wording:'Một quyết định từng bị hoãn có thể được nối lại, miễn là đi từng bước rõ ràng.' },
        { verb:'slow', domains:['inner','work'], label:'Trăng khuyết gần tròn ở Ma Kết', wording:'Nhịp ngày thiên về chuẩn bị có trật tự; dồn sức cho một việc cụ thể trước.' }
      ]},
      '2026-07-29':{ signals:[
        { verb:'surface', domains:['inner','love'], label:'Trăng tròn ở Bảo Bình, đối diện Mặt Trời ở Sư Tử', wording:'Trăng tròn làm rõ khoảng cách giữa nhu cầu được là chính mình và nhu cầu thuộc về một nhóm hay cộng đồng lớn hơn.' },
        { verb:'amplify', domains:['action','work'], label:'Mặt Trời hội hợp Sao Mộc ở Sư Tử', wording:'Một cơ hội thể hiện hoặc mở rộng có thể nổi rõ hơn ngày thường; điều đáng giữ lại là làm thật, không chỉ phô diễn.' }
      ]},
      '2026-07-30':{ signals:[
        { verb:'soften', domains:['inner','love'], label:'Trăng khuyết đầu tiên sau kỳ Trăng tròn, vẫn ở Bảo Bình', wording:'Sau cao điểm hôm qua, hôm nay hợp để lùi lại một bước và để cảm xúc lắng xuống trước khi phản hồi ai đó.' },
        { verb:'challenge', domains:['love','work'], label:'Sao Kim và Sao Hoả còn trong góc căng (Xử Nữ – Song Tử)', wording:'Cách mình muốn chăm sóc và cách người khác muốn được thúc đẩy có thể không khớp nhau; đừng ép cả hai giống nhau.' }
      ]},
      '2026-07-31':{ signals:[
        { verb:'surface', domains:['inner','love'], label:'Mặt Trăng chuyển vào Song Ngư', wording:'Ranh giới cảm xúc giữa mình và người khác mờ hơn; đây là lúc hợp để lắng nghe bằng trực giác.' }
      ]},
      '2026-08-01':{ signals:[
        { verb:'surface', domains:['inner','decision'], label:'Mặt Trăng ở Song Ngư', wording:'Một linh cảm hoặc hình ảnh còn mơ hồ có thể đang gợi ý điều lý trí chưa gọi tên được; đáng ghi lại thay vì bỏ qua.' }
      ]},
      '2026-08-02':{ signals:[
        { verb:'slow', domains:['inner','work'], label:'Trăng cuối chu kỳ Song Ngư, chuẩn bị bước sang Bạch Dương', wording:'Nhịp ngày còn thiên về nghỉ và buông; giữ việc quan trọng lại cho lúc năng lượng rõ ràng hơn.' }
      ]},
      '2026-08-03':{ signals:[
        { verb:'accelerate', domains:['action','inner'], label:'Mặt Trăng chuyển vào Bạch Dương', wording:'Một luồng năng lượng thẳng và nhanh quay lại; phù hợp để bắt đầu, miễn là chọn đúng một việc thay vì lao vào tất cả cùng lúc.' }
      ]},
      '2026-08-04':{ signals:[
        { verb:'stabilize', domains:['action','decision'], label:'Mặt Trăng tiếp tục ở Bạch Dương', wording:'Sau cú hích ban đầu, hôm nay hợp để chọn một hướng cụ thể để giữ đà, thay vì mở rộng thêm việc mới.' }
      ]}
    }
  };

  packs['2026-W32-approved']={
    status:'approved',
    label:'5–12/8/2026 · Ali duyệt',
    sourceCheckedAt:'2026-08-03',
    week:{
      eyebrow:'Bối cảnh chung · 5–12/8',
      title:'Dọn chỗ trước một khởi đầu',
      body:'Nửa đầu tuần, Mặt Trăng đi qua Kim Ngưu và tới kỳ Hạ huyền ngày 6/8, kéo nhịp về những việc chạm được và về câu hỏi điều gì còn được giữ chỉ vì quen tay. Ngày 7/8, Sao Kim bước vào Thiên Bình còn Mặt Trời hợp góc với Sao Thổ, thuận cho việc biến một mong muốn thành cam kết có giới hạn rõ. Tuần khép lại bằng đêm 12/8: kỳ Trăng non ở Sư Tử trùng một kỳ nhật thực toàn phần, mở một chu kỳ mới từ chỗ khuất.',
      carry:'Việc có thể làm trong tuần: làm xong một việc còn dở thay vì mở thêm việc mới; nói rõ một giới hạn trong cam kết mình vừa nhận; và để dành đêm 12 rạng 13/8 cho một khoảng nghỉ thật. Ghi chú quan sát: dải toàn phần của nhật thực đi qua vùng Bắc Cực, Iceland và Tây Ban Nha, ở Việt Nam lúc đó là nửa đêm nên không nhìn thấy được; thứ xem được ở đây là mưa sao băng Anh Tiên rạng sáng 13/8, dưới bầu trời không trăng.'
    },
    days:{
      '2026-08-05':{ signals:[
        { verb:'stabilize', domains:['work','inner'], label:'Mặt Trăng chuyển vào Kim Ngưu', wording:'Nhịp ngày chậm lại và nghiêng về những việc chạm được: dọn một góc, làm xong một phần nhỏ, ăn ngủ cho đủ.' },
        { verb:'slow', domains:['inner','decision'], label:'Trăng khuyết giảm dần trước kỳ Hạ huyền', wording:'Chu kỳ Trăng đang đi xuống, hợp để rà lại điều gì còn được giữ chỉ vì quen tay.' }
      ]},
      '2026-08-06':{ signals:[
        { verb:'clarify', domains:['decision','inner'], label:'Trăng Hạ huyền ở Kim Ngưu (sáng 6/8)', wording:'Kỳ Hạ huyền đặt lại câu hỏi: trong nửa chu kỳ vừa qua, điều gì đáng giữ và điều gì có thể buông.' },
        { verb:'stabilize', domains:['work','action'], label:'Mặt Trăng ở Kim Ngưu', wording:'Nhịp ngày chắc và hơi nặng; một việc được làm cho xong có ích hơn ba việc mở dở dang.' }
      ]},
      '2026-08-07':{ signals:[
        { verb:'stabilize', domains:['work','decision'], label:'Mặt Trời tam hợp Sao Thổ (sáng 7/8)', wording:'Góc hoà giữa Mặt Trời và Sao Thổ hỗ trợ việc biến một mong muốn thành cam kết có giới hạn rõ.' },
        { verb:'soften', domains:['love','inner'], label:'Sao Kim bước vào Thiên Bình', wording:'Sao Kim về đúng cung của mình làm nhu cầu hoà thuận và cân bằng nổi rõ hơn trong cách mình đối đãi với người khác.' }
      ]},
      '2026-08-08':{ signals:[
        { verb:'clarify', domains:['decision','work'], label:'Mặt Trăng ở Song Tử', wording:'Nhiều luồng thông tin cùng đến; việc tách đâu là dữ kiện, đâu là phỏng đoán sẽ tiết kiệm thời gian về sau.' },
        { verb:'accelerate', domains:['action','work'], label:'Sao Hoả đi những độ cuối Song Tử', wording:'Sao Hoả sắp khép một chặng dài ở Song Tử, thúc nốt những việc cần nói và cần gửi đi.' }
      ]},
      '2026-08-09':{ signals:[
        { verb:'soften', domains:['inner','love'], label:'Mặt Trăng chuyển vào Cự Giải', wording:'Nhu cầu được ở gần người quen thuộc và được chăm sóc trở nên rõ hơn ngày thường.' },
        { verb:'slow', domains:['inner','decision'], label:'Trăng gần cuối chu kỳ', wording:'Còn ba ngày nữa mới tới kỳ Trăng non; quãng này hợp để nghỉ và thu dọn hơn là chốt việc lớn.' }
      ]},
      '2026-08-10':{ signals:[
        { verb:'amplify', domains:['action','work'], label:'Sao Thuỷ bước vào Sư Tử', wording:'Cách mình nói và trình bày trở nên ấm và có màu hơn; đây là lúc dễ được nghe nếu chịu nói thẳng điều mình cần.' },
        { verb:'slow', domains:['inner'], label:'Mặt Trăng ở Cự Giải, cuối chu kỳ', wording:'Cảm xúc dâng nhanh hơn thường lệ; để một phản ứng đi qua một đêm rồi hãy trả lời là vừa.' }
      ]},
      '2026-08-11':{ signals:[
        { verb:'challenge', domains:['love','decision'], label:'Sao Kim đối đỉnh Hải Vương (rạng sáng 11/8)', wording:'Hình dung đẹp về một mối quan tâm dễ lệch khỏi thực tế; hỏi một câu cụ thể đỡ hơn đoán.' },
        { verb:'soften', domains:['action','inner'], label:'Sao Hoả chuyển vào Cự Giải', wording:'Sức đẩy chuyển từ lời nói sang việc giữ gìn điều mình thương; động lực đến từ cảm xúc hơn lý lẽ.' }
      ]},
      '2026-08-12':{ signals:[
        { verb:'surface', domains:['inner','action'], label:'Nhật thực toàn phần trùng kỳ Trăng non ở Sư Tử', wording:'Kỳ Trăng non bị che khuất mở một chu kỳ mới từ chỗ tối: điều mình muốn được nhìn thấy có thể cần được nói lại từ đầu.' },
        { verb:'clarify', domains:['decision','inner'], label:'Sao Thuỷ tam hợp Hải Vương', wording:'Linh cảm và lời nói dễ gặp nhau hôm nay; một điều mơ hồ đã lâu có thể gọi được thành câu.' }
      ]}
    }
  };

  packs['2026-W33-approved']={
    status:'approved',
    label:'13–20/8/2026 · Ali duyệt',
    sourceCheckedAt:'2026-08-03',
    week:{
      eyebrow:'Bối cảnh chung · 13–20/8',
      title:'Bắt đầu nhỏ sau một đêm tối trời',
      body:'Tuần này đi ra từ kỳ nhật thực đêm 12/8. Chu kỳ Trăng mới lớn dần qua Xử Nữ, Thiên Bình rồi Bọ Cạp, đưa nhịp từ sắp xếp chi tiết sang cân bằng quan hệ rồi xuống chiều sâu. Sao Thuỷ hội hợp Sao Mộc ngày 15/8 làm ý tưởng và lời nói nở ra lớn hơn kích thước thật, còn Sao Hoả góc vuông Hải Vương ngày 17/8 dễ làm sức lực tản đi mà không rõ vì đâu. Kỳ Thượng huyền ngày 20/8 là chỗ để chọn tiếp hoặc để lại điều đã bắt đầu.',
      carry:'Việc có thể làm trong tuần: chọn một việc nhỏ từ điều đã nhen lên quanh ngày 12/8 và làm nó đều trong bảy ngày; nói rõ phần trách nhiệm của mình trong một thoả thuận; và giữ lại một buổi trống cho ngày 17/8. Ghi chú quan sát: rạng sáng 13/8 là đêm mưa sao băng Anh Tiên đẹp nhất nhiều năm nhờ trời không trăng.'
    },
    days:{
      '2026-08-13':{ signals:[
        { verb:'clarify', domains:['decision','action'], label:'Sao Thuỷ lục hợp Thiên Vương (rạng sáng 13/8)', wording:'Một cách làm khác với thường lệ có thể chợt hiện ra; ghi lại ngay trước khi nó trôi mất.' },
        { verb:'stabilize', domains:['work','inner'], label:'Mặt Trăng chuyển vào Xử Nữ (chiều 13/8)', wording:'Nhịp chiều tối nghiêng về sắp xếp: chia điều vừa nghĩ ra thành một bước làm được trong tuần.' }
      ]},
      '2026-08-14':{ signals:[
        { verb:'stabilize', domains:['work','action'], label:'Trăng lưỡi liềm đầu chu kỳ ở Xử Nữ', wording:'Chu kỳ mới còn non; một thử nghiệm nhỏ và có thể rút lại hợp hơn một tuyên bố lớn.' },
        { verb:'clarify', domains:['inner','decision'], label:'Mặt Trăng ở Xử Nữ', wording:'Hôm nay dễ nhìn ra chi tiết đang vướng; gọi đúng tên nó thay vì trách mình vì chưa xong.' }
      ]},
      '2026-08-15':{ signals:[
        { verb:'amplify', domains:['work','decision'], label:'Sao Thuỷ hội hợp Sao Mộc ở Sư Tử', wording:'Một ý tưởng hoặc lời đề nghị dễ nở ra lớn hơn kích thước thật của nó; giữ lại phần làm được và bớt phần chỉ để nghe cho hay.' },
        { verb:'stabilize', domains:['work','inner'], label:'Mặt Trăng cuối chặng Xử Nữ', wording:'Rà soát một lần cuối trước khi gửi đi sẽ tiết kiệm cả một vòng sửa về sau.' }
      ]},
      '2026-08-16':{ signals:[
        { verb:'soften', domains:['love','decision'], label:'Mặt Trăng ở Thiên Bình', wording:'Nhịp ngày kéo về phía cân bằng: nghe cho hết ý người kia rồi hãy đặt lại ý mình.' },
        { verb:'amplify', domains:['work','action'], label:'Sao Thuỷ và Sao Mộc còn trong vùng ảnh hưởng', wording:'Điều nói ra những ngày này dễ đi xa hơn dự tính; chọn chỗ để nói cũng quan trọng như chọn điều để nói.' }
      ]},
      '2026-08-17':{ signals:[
        { verb:'challenge', domains:['action','inner'], label:'Sao Hoả góc vuông Hải Vương', wording:'Sức lực dễ tản vào việc không rõ đích; thấy mệt mà không rõ vì đâu thì nên dừng, đừng ép thêm.' },
        { verb:'stabilize', domains:['decision','work'], label:'Sao Thuỷ tam hợp Sao Thổ', wording:'Một cuộc trao đổi hôm nay có thể chốt thành thoả thuận cụ thể, nếu mỗi bên nói rõ phần việc của mình.' }
      ]},
      '2026-08-18':{ signals:[
        { verb:'amplify', domains:['love','work'], label:'Sao Kim lục hợp Sao Mộc', wording:'Thiện chí và sự rộng lượng dễ được đáp lại; đây là lúc hợp để mở lời trước.' },
        { verb:'surface', domains:['inner','love'], label:'Mặt Trăng chuyển vào Bọ Cạp (rạng sáng 18/8)', wording:'Điều được giữ dưới bề mặt dễ nổi lên hơn; nói một nửa sự thật hôm nay khó hơn nói cả.' }
      ]},
      '2026-08-19':{ signals:[
        { verb:'surface', domains:['inner','decision'], label:'Mặt Trăng ở Bọ Cạp', wording:'Động cơ thật phía sau một lựa chọn gần đây có thể lộ ra; nhìn thẳng vào nó đỡ tốn sức hơn là né.' },
        { verb:'slow', domains:['work','inner'], label:'Trăng lớn dần về kỳ Thượng huyền', wording:'Chu kỳ sắp tới điểm căng đầu tiên; giữ lại một phần sức cho ngày mai thay vì dồn hết hôm nay.' }
      ]},
      '2026-08-20':{ signals:[
        { verb:'clarify', domains:['decision','action'], label:'Trăng Thượng huyền (sáng 20/8)', wording:'Kỳ Thượng huyền đòi một quyết định giữa đường: điều bắt đầu quanh đêm nhật thực cần được chọn tiếp hay để lại.' },
        { verb:'accelerate', domains:['action','work'], label:'Mặt Trăng chuyển vào Nhân Mã (chiều 20/8)', wording:'Nhịp cuối tuần mở ra rộng hơn; một bước đi chệch khỏi thói quen có thể có ích lúc này.' }
      ]}
    }
  };

  /* Dữ kiện 2026-08-21 → 2026-08-28 (pack W34) đối chiếu từ:
     - Moon phase & sign ingress: Cafe Astrology Moon Calendar 2026
       https://cafeastrology.com/calendars/moon-calendar-2026.html
       (2nd Quarter 19/8 22:46 ET đã ghi trong W33; 3rd Quarter 28/8 00:18 ET;
       Moon → Capricorn 22/8 16:59 ET; → Aquarius 25/8 05:01 ET;
       → Pisces 27/8 15:03 ET)
     - Aspect exact dates: Cafe Astrology 2026 Aspects
       https://cafeastrology.com/2026-astrological-aspects.html
       (Venus opposition Saturn 21/8; Sun trine Chiron 23/8; Mercury trine
       Chiron 25/8; Sun conjunction Mercury 27/8 tại 4° Xử Nữ; Sun square
       Uranus + Mercury square Uranus 28/8 tại 5° Xử Nữ/Song Tử)
     - Sun enters Virgo: Cafe Astrology event page
       https://cafeastrology.com/events/sun-enters-virgo-2026/ — 23/8 02:20 UT
     Giờ nguồn ghi theo Eastern Time (EDT = UTC-4 vào tháng 8); quy đổi sang
     giờ Việt Nam bằng ET+11h (hoặc UT+7h) chỉ để chọn đúng ngày lịch — đây
     vẫn là thời tiết chung, không dùng giờ sinh/vị trí/nhà/cung Mọc. Trăng
     Hạ huyền 28/8 rơi đúng ngày cuối pack, khép chu kỳ mở từ kỳ nhật thực
     12/8 đã ghi trong W32/W33. */
  packs['2026-W34-approved']={
    status:'approved',
    label:'21–28/8/2026 · Ali duyệt',
    sourceCheckedAt:'2026-08-21',
    week:{
      eyebrow:'Bối cảnh chung · 21–28/8',
      title:'Gọn lại trước khi đổi mùa',
      body:'Đầu tuần, Sao Kim đối đỉnh Sao Thổ (21/8) đặt một mối quan tâm gần đây trước một sự thật thực tế hơn là dễ chịu. Ngày 23/8, Mặt Trời rời Sư Tử bước vào Xử Nữ đúng lúc tam hợp Chiron, đưa nhịp chung từ phô diễn sang sắp xếp. Mặt Trăng đi qua Ma Kết rồi Bảo Bình, giữ giữa tuần nghiêng về kỷ luật và nhìn việc như chuyện chung hơn là chuyện riêng. Ngày 27/8, Mặt Trời hội hợp Sao Thuỷ làm lời nói và suy nghĩ khớp nhau hơn — nhưng hôm sau cả hai cùng vuông góc Sao Thiên Vương, nên một kế hoạch vừa gọn lại có thể bị xáo bởi một thay đổi bất ngờ. Tuần khép bằng Trăng Hạ huyền ở Song Ngư (28/8), điểm cuối của chu kỳ mở từ kỳ nhật thực 12/8.',
      carry:'Việc có thể làm trong tuần: nhìn một mối quan tâm dưới ánh sáng thực tế thay vì ánh sáng dễ chịu; gọn lại một việc đang dở trước khi mùa Xử Nữ bắt đầu; và giữ phần cốt lõi của một kế hoạch trong khi để phần còn lại linh hoạt trước biến động cuối tuần.'
    },
    days:{
      '2026-08-21':{ signals:[
        { verb:'challenge', domains:['love','decision'], label:'Sao Kim đối đỉnh Sao Thổ (đỉnh 21/8)', wording:'Sao Kim đối đỉnh Sao Thổ đưa một mối quan tâm ra khỏi vùng dễ chịu.' },
        { verb:'amplify', domains:['action','inner'], label:'Mặt Trăng ở Nhân Mã', wording:'Mặt Trăng ở Nhân Mã giữ nhịp ngày rộng và thẳng thắn hơn thường lệ.' }
      ]},
      '2026-08-22':{ signals:[
        { verb:'slow', domains:['love','decision'], label:'Sao Kim và Sao Thổ còn trong vùng ảnh hưởng', wording:'Dư âm Sao Kim và Sao Thổ vẫn còn; một quyết định tình cảm hay tiền bạc nên chờ thêm.' },
        { verb:'stabilize', domains:['work','action'], label:'Mặt Trăng cuối chặng Nhân Mã', wording:'Hôm nay hợp để khép một việc đang dở trước khi nhịp ngày đổi hướng.' }
      ]},
      '2026-08-23':{ signals:[
        { verb:'stabilize', domains:['work','decision'], label:'Mặt Trời bước vào Xử Nữ (9:20 sáng)', wording:'Mặt Trời bước vào Xử Nữ đưa nhịp chung từ phô diễn sang sắp xếp.' },
        { verb:'soften', domains:['inner','love'], label:'Mặt Trời tam hợp Chiron', wording:'Mặt Trời tam hợp Chiron làm một vết cũ dễ được nhìn bao dung hơn.' }
      ]},
      '2026-08-24':{ signals:[
        { verb:'stabilize', domains:['work','action'], label:'Mặt Trăng ở Ma Kết', wording:'Mặt Trăng ở Ma Kết giữ nhịp ngày chắc và có kỷ luật.' }
      ]},
      '2026-08-25':{ signals:[
        { verb:'clarify', domains:['inner','decision'], label:'Sao Thuỷ tam hợp Chiron', wording:'Sao Thuỷ tam hợp Chiron giúp một điều khó nói tìm được từ ngữ nhẹ hơn.' },
        { verb:'surface', domains:['inner','action'], label:'Mặt Trăng chuyển vào Bảo Bình (chiều 25/8)', wording:'Mặt Trăng chuyển vào Bảo Bình về chiều, muốn lùi lại để nhìn xa hơn.' }
      ]},
      '2026-08-26':{ signals:[
        { verb:'clarify', domains:['decision','work'], label:'Mặt Trăng ở Bảo Bình', wording:'Mặt Trăng ở Bảo Bình hợp để nhìn một vấn đề như chuyện chung.' }
      ]},
      '2026-08-27':{ signals:[
        { verb:'clarify', domains:['decision','work'], label:'Mặt Trời hội hợp Sao Thuỷ ở Xử Nữ', wording:'Mặt Trời hội hợp Sao Thuỷ ở Xử Nữ làm lời nói và suy nghĩ khớp nhau hơn.' },
        { verb:'slow', domains:['inner','love'], label:'Mặt Trăng cuối chặng Bảo Bình', wording:'Trước khi nhịp đổi sang Song Ngư, hôm nay hợp để giữ khoảng cách vừa đủ.' }
      ]},
      '2026-08-28':{ signals:[
        { verb:'challenge', domains:['work','action'], label:'Mặt Trời và Sao Thuỷ cùng vuông góc Sao Thiên Vương', wording:'Mặt Trời và Sao Thuỷ cùng vuông góc Sao Thiên Vương dễ làm kế hoạch gọn bị xáo bất ngờ.' },
        { verb:'clarify', domains:['inner','decision'], label:'Trăng Hạ huyền ở Song Ngư (11:18 sáng)', wording:'Trăng Hạ huyền ở Song Ngư khép chu kỳ mở từ kỳ nhật thực 12/8.' }
      ]}
    }
  };

  /* Dữ kiện 2026-08-29 → 2026-09-05 (pack W35) tính bằng astronomy-engine
     (Don Cross, geocentric true-equinox-of-date, cùng thư viện đã dùng cho
     hero) — vị trí 10 thiên thể 00:00 UT mỗi ngày, thời điểm chính xác các
     góc chính và các pha Trăng; giờ trong nhãn đã quy về giờ Việt Nam UTC+7.
     Các mốc chính:
     - Trăng tròn 28/8 11:19 (5° Song Ngư) — ngay trước pack; Trăng khuyết
       dần suốt tuần tới Trăng Hạ huyền 4/9 14:51 (~12° Song Tử).
     - Mặt Trời vuông góc Sao Thiên Vương đỉnh 29/8 05:18 (Mercury vuông
       Uranus 28/8 14:24, còn trong quỹ ngày 29–30/8).
     - Sao Mộc tam hợp Sao Thổ đỉnh 1/9 05:05 (13° Sư Tử / 13° Bạch Dương).
     - Sao Hoả vuông góc Sao Thổ đỉnh 1/9 16:53 (13° Cự Giải / 13° Bạch Dương).
     - Sao Thuỷ lục hợp Sao Hoả đỉnh 1/9 20:21.
     - Mặt Trăng đổi cung (giờ VN): → Bạch Dương 30/8 09:37; → Kim Ngưu
       1/9 15:01; → Song Tử 3/9 18:47; → Cự Giải 5/9 21:30.
     - Sao Thiên Vương gần như đứng yên ở 5–6° Song Tử (sắp nghịch hành ~10/9).
     - Cả tuần: Mặt Trời & Sao Thuỷ ở Xử Nữ, Sao Kim ở Thiên Bình (đều cung
       mạnh); Sao Hoả ở Cự Giải; Sao Thổ, Hải Vương nghịch hành ở Bạch Dương,
       Diêm Vương nghịch hành ở Bảo Bình.
     Không có nhật thực hay mưa sao băng đáng chú ý quan sát từ Việt Nam trong
     tuần. Đây vẫn là thời tiết chung, không dùng giờ sinh/vị trí/nhà/cung Mọc. */
  packs['2026-W35-approved']={
    status:'approved',
    label:'29/8–5/9/2026 · Ali duyệt',
    sourceCheckedAt:'2026-08-31',
    week:{
      eyebrow:'Bối cảnh chung · 29/8–5/9',
      title:'Sức bền hơn sức mạnh',
      body:'Tuần mở bằng một cú xóc: rạng sáng 29/8 Mặt Trời vuông góc Sao Thiên Vương, dễ có tin bất ngờ hoặc một thay đổi kế hoạch sát giờ. Giữa tuần dồn vào ngày 1/9 với hai góc trái chiều cùng lúc — Sao Hoả vuông góc Sao Thổ làm mọi cách đẩy mạnh đều vấp, còn Sao Mộc tam hợp Sao Thổ lại cho một kế hoạch có nền được chống lưng thật sự. Bài học chung của tuần là dựng cấu trúc thay vì tăng lực. Mặt Trăng khuyết dần sau kỳ Trăng tròn 28/8, đi qua Bạch Dương, Kim Ngưu rồi Song Tử, tới Trăng Hạ huyền ở Song Tử chiều 4/9 — điểm giữa chu kỳ để cắt bớt việc và soát lại. Cả tuần trong mùa Xử Nữ, với Sao Kim ở Thiên Bình và Sao Thuỷ ở Xử Nữ đều đang ở cung mạnh, thuận cho việc sửa cho gọn và cư xử cho công bằng.',
      carry:'Việc có thể làm trong tuần: đón một thay đổi sát giờ đầu tuần mà chưa đập lại ngay; ngày 1/9 chọn xếp lại thứ tự việc thay vì cố đẩy cho nhanh; và dùng quãng Trăng Hạ huyền cuối tuần để cắt bớt một việc đang gánh dở.'
    },
    days:{
      '2026-08-29':{ signals:[
        { verb:'challenge', domains:['decision','work'], label:'Mặt Trời vuông góc Sao Thiên Vương (đỉnh rạng sáng 29/8)', wording:'Một tin bất ngờ hoặc một thay đổi sát giờ có thể làm xáo kế hoạch; chưa vội chốt phản ứng trong ngày đầu.' },
        { verb:'slow', domains:['inner','love'], label:'Mặt Trăng cuối chặng Song Ngư', wording:'Nhịp ngày mềm và dễ thấm; hợp để nghỉ và thu dọn hơn là quyết một việc lớn.' }
      ]},
      '2026-08-30':{ signals:[
        { verb:'surface', domains:['action','inner'], label:'Mặt Trăng chuyển vào Bạch Dương (sáng 30/8)', wording:'Một việc mình muốn bắt tay ngay trở nên rõ hơn; thử ở quy mô nhỏ trước khi biến nó thành cam kết.' }
      ]},
      '2026-08-31':{ signals:[
        { verb:'clarify', domains:['work','decision'], label:'Sao Mộc tiến tới tam hợp Sao Thổ (đỉnh rạng sáng 1/9)', wording:'Dễ nhìn ra phần kế hoạch nào có nền đủ chắc để đi tiếp và phần nào mới chỉ là ý thích.' },
        { verb:'challenge', domains:['action','inner'], label:'Mặt Trăng vuông góc Sao Hoả', wording:'Một va chạm nhỏ dễ bị đẩy thành lớn; hạ giọng trước rồi hãy nói tiếp.' }
      ]},
      '2026-09-01':{ signals:[
        { verb:'challenge', domains:['action','work'], label:'Sao Hoả vuông góc Sao Thổ (đỉnh chiều 1/9)', wording:'Mọi cách đẩy mạnh hôm nay đều dễ vấp; đổi sang xếp lại thứ tự việc thay vì tăng lực.' },
        { verb:'stabilize', domains:['work','decision'], label:'Sao Mộc tam hợp Sao Thổ đúng ngày', wording:'Phần kế hoạch đã có cấu trúc rõ có thể tiến thêm một bước chắc, kể cả khi phần còn lại phải chờ.' }
      ]},
      '2026-09-02':{ signals:[
        { verb:'clarify', domains:['decision','work'], label:'Sao Thuỷ lục hợp Sao Hoả (đỉnh tối 1/9, còn hiệu lực)', wording:'Nói thẳng một điều khó lúc này ít thành va chạm hơn thường lệ; cũng dễ ra quyết định gọn.' },
        { verb:'stabilize', domains:['work','inner'], label:'Mặt Trăng ở Kim Ngưu', wording:'Nhịp ngày kéo về việc chạm được: làm xong một phần nhỏ, ăn ngủ cho đủ.' }
      ]},
      '2026-09-03':{ signals:[
        { verb:'stabilize', domains:['work','action'], label:'Mặt Trăng cuối chặng Kim Ngưu', wording:'Trước khi nhịp đổi sang Song Tử, hôm nay hợp để khép cho xong một việc đang dở.' }
      ]},
      '2026-09-04':{ signals:[
        { verb:'clarify', domains:['inner','decision'], label:'Trăng Hạ huyền ở Song Tử (chiều 4/9)', wording:'Điểm giữa chu kỳ: soát lại điều gì đáng giữ từ nửa tháng qua và điều gì có thể buông.' },
        { verb:'slow', domains:['work','inner'], label:'Mặt Trăng ở Song Tử', wording:'Nhịp Song Tử dễ tản; chọn một hai việc làm cho xong thay vì mở thêm đầu việc mới.' }
      ]},
      '2026-09-05':{ signals:[
        { verb:'slow', domains:['inner','love'], label:'Mặt Trăng chuyển vào Cự Giải (tối 5/9)', wording:'Nhu cầu được ở gần người quen thuộc lên rõ hơn; để một phản ứng qua đêm rồi hãy trả lời.' }
      ]}
    }
  };

  root.GARDEN_ORACLE_WEEKLY={
    activeReviewKey:'',
    lastApprovedKey:'2026-W35-approved',
    packs
  };
})(window);
