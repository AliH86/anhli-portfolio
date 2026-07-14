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

  root.GARDEN_ORACLE_WEEKLY={
    activeReviewKey:null,
    lastApprovedKey:'2026-W30-approved',
    packs
  };
})(window);
