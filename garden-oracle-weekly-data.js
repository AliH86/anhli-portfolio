/* Garden Oracle — dữ kiện chiêm tinh chung và wording pack đã biên tập.

   Quy tắc publish:
   - `review`: chỉ được dùng trên localhost để Ali duyệt.
   - `approved`: được phép dùng trên live.
   - nếu tuần hiện tại chưa approved, engine tự rơi về `baseline-approved`.

   Dữ kiện 2026-07-13 → 2026-07-20 được đối chiếu từ:
   - Astrodienst Swiss Ephemeris 2026 (geocentric, 00:00 UT)
     https://wiki.astro.com/swisseph/ahel/2000/ahel2026.pdf
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

  root.GARDEN_ORACLE_WEEKLY={
    activeReviewKey:null,
    lastApprovedKey:'2026-W29-approved-v2',
    packs
  };
})(window);
