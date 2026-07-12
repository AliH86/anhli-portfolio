/* Garden Oracle — core-story & semantic-profile SCHEMA DRAFT (5-seed sample).

   TRẠNG THÁI: DRAFT — chờ Ali duyệt trước khi mở rộng lên 78 hạt theo đợt
   22 Major + 14 Lửa + 14 Nước + 14 Khí + 14 Đất (ORACLE-CONTENT-SYSTEM.md §7,
   bước 2: "Chốt schema mới bằng 3–5 hạt mẫu; chưa viết cả 78 ngay").

   File này KHÔNG được nạp vào index.html ở bước này và không đụng tới
   garden-oracle-data.js hay garden-oracle-synthesis.js — đúng ranh giới ba
   lớp file đã chốt trong AGENT-RULES.md §7 / ORACLE-CONTENT-SYSTEM.md §6.

   Phạm vi 5 mẫu: 1 Major + 1 hạt mỗi nguyên tố Lửa/Nước/Khí/Đất. Cố tình
   không chọn toàn lá Ace để test schema trên nhiều rank khác nhau (Ace, 3, 6,
   7, 8) — xem rationale trong recap-anhli-portfolio.md, mục Oracle hôm nay.

   ------------------------------------------------------------------------
   SCHEMA — mỗi bản ghi hạt gồm:

   id           — number, khớp id trong GARDEN_ORACLE_CARDS (garden-oracle-data.js).
   openName     — tên Nở, tham chiếu ý nghĩa; KHÔNG render vào ảnh.
   closedName   — tên Khép, tham chiếu ý nghĩa; KHÔNG render vào ảnh.
   element      — 'Fire' | 'Water' | 'Air' | 'Earth'.
   family       — 'Major' | 'Wands' | 'Cups' | 'Swords' | 'Pentacles'.

   coreStory    — 1 đoạn ~45–70 chữ, hiểu được không cần biết Tarot. Nêu MỘT
                  chuyển động đời thường cụ thể mà cả Nở và Khép đều là hai
                  lối ra của cùng một tình huống đó (không phải hai câu chuyện
                  tách rời). Ẩn dụ vườn/hạt/gió chỉ là lớp hình ảnh nhẹ, không
                  phải nội dung chính. Không copy nguyên văn trường `bloom`/
                  `closed` đã có trong garden-oracle-data.js — coreStory là
                  lớp kể chuyện SÂU hơn, bloom/closed vẫn là lời ritual gọn
                  hiển thị mặc định.

   visualMotif  — 1 chi tiết hình ảnh độc bản cho artwork (dáng hạt, cử động,
                  chi tiết kể chuyện). Dùng trực tiếp cho biến {VISUAL_MOTIF}
                  trong ORACLE-ASSET-PROMPT.md — xem bản điền sẵn cho 5 hạt
                  này ở ORACLE-ASSET-SAMPLES.md.

   profile      — hồ sơ nghĩa có cấu trúc, để engine tổng hợp 3 hạt đọc được
                  QUAN HỆ giữa các hạt mà không cần hiểu tiếng Việt tự nhiên
                  hay copy/paste câu chữ của từng hạt. Field:

     domain     — vùng đời sống: 'love' | 'work' | 'decision' | 'action' |
                  'inner'. Giữ đúng 5 giá trị đã dùng trong
                  garden-oracle-synthesis.js (SUIT_DOMAIN/MAJOR_DOMAIN) để
                  không phải viết lại engine hiện có khi nối dữ liệu này vào
                  sau; suit Wands/Cups/Swords/Pentacles mặc định
                  action/love/decision/work, 22 Major gán tay từng lá.

     movement   — kiểu chuyển động của câu chuyện, DÙNG CHUNG cho cả Nở lẫn
                  Khép (hai trạng thái là hai kết quả của cùng một chuyển
                  động, không phải hai chuyển động khác nhau). Vocabulary đề
                  xuất — ưu tiên tái dùng trước khi thêm giá trị mới khi viết
                  73 hạt còn lại:
                    opening, scanning, releasing, crossing, holding, tending,
                    colliding, arriving, resting, defending, integrating,
                    calling.

     storyStage — vị trí trong một vòng cung tự sự chung, suy chủ yếu từ rank
                  (để nhất quán khi viết tiếp 56 hạt Minor theo cùng quy tắc):
                    Ace→'spark', 2→'choice', 3→'connection', 4→'foundation',
                    5→'friction', 6→'recovery', 7→'patience', 8→'momentum',
                    9→'threshold', 10→'culmination', Page→'curiosity',
                    Knight→'pursuit', Queen→'nurture', King→'mastery'.
                  22 hạt Major gán tay theo vị trí riêng của từng lá — hạt số
                  0 "Hạt gieo vào gió" = 'spark' vì đây là điểm mở đầu của
                  toàn bộ hành trình 78 hạt, không suy từ rank vì Major không
                  có rank theo nghĩa đó.

     need       — 1 cụm ngắn: nhu cầu con người thật đứng sau câu chuyện,
                  viết trung tính, không phán xét.

     gift       — 1 cụm ngắn: điều tốt đang có khi hạt Nở — rút gọn ý chính
                  từ trường `bloom` hiện có, không copy nguyên câu.

     risk       — 1 cụm ngắn: điều cần chú ý khi hạt Khép — rút gọn ý chính
                  từ trường `closed` hiện có, không copy nguyên câu.

     action     — 1 gợi ý nhỏ, cụ thể, vừa sức — nguyên liệu cho bước 5 của
                  engine tổng hợp ("một gợi ý nhỏ, cụ thể và vừa sức").

   Mục đích tách domain/movement/storyStage riêng: engine so sánh QUAN HỆ giữa
   3 hạt (trùng domain, chuỗi storyStage, quan hệ nguyên tố...) bằng field có
   cấu trúc, không cần đọc lại coreStory bằng NLP. need/gift/risk/action là
   nguyên liệu ngôn ngữ NGẮN — không phải câu hoàn chỉnh — để tránh lặp
   nguyên văn khi ghép vào lời tổng hợp cuối cùng.
   ------------------------------------------------------------------------ */
(function(root){
  'use strict';

  const GARDEN_ORACLE_PROFILES_SAMPLE = [
    {
      id: 0,
      openName: 'Hạt gieo vào gió',
      closedName: 'Hạt bay vô hướng',
      element: 'Air',
      family: 'Major',
      coreStory: 'Trước mọi khởi đầu có một khoảnh khắc hạt đã rời cành nhưng gió chưa định hướng đi. Bạn đang ở đó — trước một công việc, một mối quan hệ, một quyết định — chưa biết điểm đến, chỉ biết mình đã buông tay khỏi chỗ cũ. Cú buông thật lòng hướng tới điều mới là một khởi đầu đáng tin; cú buông chỉ để né tránh điều đang ở lại phía sau lại thành một chuyến bay không phương hướng.',
      visualMotif: 'Giọt sương vàng ánh kim đọng ở lõi hạt, ngay nơi thân vừa tách khỏi vỏ quả khô; hạt nghiêng là là như vừa rời cành, chưa ngả hẳn theo một hướng gió, đuôi tơ phía sau vẫn xoè ngược như dấu vết của cú buông vừa xảy ra.',
      profile: {
        domain: 'action',
        movement: 'opening',
        storyStage: 'spark',
        need: 'cần được phép bắt đầu mà không cần biết trước kết quả',
        gift: 'dám bước đi dù chưa chắc điểm đến',
        risk: 'lao vào cái mới chỉ để né tránh một điều ở hiện tại',
        action: 'chọn một bước nhỏ đầu tiên và thật sự làm, thay vì chờ chắc chắn hơn'
      }
    },
    {
      id: 24,
      openName: 'Hạt thấy gió mang tin về',
      closedName: 'Hạt đợi tin mà quên nhìn xa',
      element: 'Fire',
      family: 'Wands',
      coreStory: 'Hạt này đứng trên một cành cao, nhìn ra vùng trời rộng nơi những luồng gió đang mang tin từ xa về — kết quả của một điều bạn đã bỏ công gieo trồng từ lâu: một dự án, một mối quan hệ, một kế hoạch dài hơi. Khi tầm nhìn còn mở, bạn thấy được cả tin đang tới lẫn những cơ hội khác đang hình thành quanh mình. Khi tầm nhìn hẹp lại chỉ còn một điểm chờ, bạn dễ bỏ lỡ mọi thứ khác đang mở ra ngay bên cạnh.',
      visualMotif: 'Hạt đậu ở đầu một cọng thân cao mảnh, nghiêng hẳn ra một vùng chân trời có các luồng ánh sáng vàng nhạt và hạt bụi phấn trôi xa như tín hiệu đang tới; nửa tán tơ phía trước xoè rộng như đang quét tầm nhìn, nửa phía sau khép gọn hơn.',
      profile: {
        domain: 'action',
        movement: 'scanning',
        storyStage: 'connection',
        need: 'cần nhìn xa hơn một kết quả cụ thể đang chờ',
        gift: 'thấy được cả tín hiệu xa và cơ hội gần cùng lúc',
        risk: 'chăm chăm một kết quả mà bỏ lỡ cơ hội khác đang mở quanh mình',
        action: 'ngẩng lên nhìn quanh và ghi ra một cơ hội khác đang có mà chưa để ý tới'
      }
    },
    {
      id: 43,
      openName: 'Hạt rời vũng nước đã cạn nghĩa',
      closedName: 'Hạt quay lại vũng nước đã cạn',
      element: 'Water',
      family: 'Cups',
      coreStory: 'Hạt này đứng ở mép một vũng nước đã cạn nghĩa — nơi từng đủ để nuôi nó nhưng giờ không còn đủ, dù nhìn ngoài vẫn còn nước. Đó là hình ảnh của một công việc, một mối quan hệ, hay một thói quen bạn biết đã hết vừa với mình. Khi hạt thật sự quay lưng bước đi dù chưa hiểu hết mọi lý do, đó là can đảm chứ không phải bỏ cuộc. Khi nó cứ quay đầu lại chỗ cũ vì sợ chỗ mới, nó mắc kẹt ở một nơi đã không còn đủ từ lâu.',
      visualMotif: 'Hạt ở mép một vũng nước nhỏ tối màu phản chiếu ánh sáng yếu, viền đất quanh vũng đã khô nứt nhẹ; thân hạt nghiêng giữa chừng một cú quay người, một bên tán tơ còn nặng ẩm hướng về vũng nước, bên còn lại đã xoè khô nhẹ như vừa bắt được gió mới.',
      profile: {
        domain: 'love',
        movement: 'releasing',
        storyStage: 'momentum',
        need: 'cần được phép rời đi dù chưa hiểu hết mọi lý do',
        gift: 'đủ can đảm bước đi trước khi có sự chắc chắn tuyệt đối',
        risk: 'quay lại điều cũ vì sợ cái chưa biết, dù biết nó không còn đủ',
        action: 'gọi tên một điều cụ thể đã không còn phù hợp và định ngày để bắt đầu buông'
      }
    },
    {
      id: 55,
      openName: 'Hạt theo gió sang bờ yên hơn',
      closedName: 'Hạt mang gió cũ sang bờ mới',
      element: 'Air',
      family: 'Swords',
      coreStory: 'Hạt này đang băng qua một khoảng gió động để sang một bờ yên hơn — hình ảnh của việc chuyển sang một giai đoạn mới: công việc mới, chỗ ở mới, một nhịp sống ổn định hơn. Chuyến đi chậm nhưng chắc, không có gì kịch tính. Khi hạt bay nhẹ, chỉ mang đúng phần cần thiết, nó thật sự đang tới bờ mới. Khi nó còn vướng những sợi tơ cũ — tổn thương hay thói quen chưa buông — nó chỉ đang mang gió cũ sang một chỗ mới mà chưa thật sự rời khỏi chỗ cũ.',
      visualMotif: 'Hạt bay là là ngang một mặt nước tối phẳng lặng như gương, quỹ đạo phía trước êm với các vệt gió mảnh song song; vài sợi tơ phía sau vướng nhẹ một lớp sợi tối màu mảnh như đang bị kéo lê theo, tương phản với phần tán phía trước gọn và sạch.',
      profile: {
        domain: 'decision',
        movement: 'crossing',
        storyStage: 'recovery',
        need: 'cần được phép chuyển sang giai đoạn yên ổn hơn mà không phải dứt khoát ngay lập tức',
        gift: 'đang chuyển động đúng hướng, chậm nhưng chắc, về phía yên ổn hơn',
        risk: 'mang tổn thương hay thói quen cũ sang hoàn cảnh mới mà chưa thật sự để lại phía sau',
        action: 'chọn một thói quen hay cảm xúc cụ thể để chủ động để lại trước khi bước tiếp'
      }
    },
    {
      id: 70,
      openName: 'Hạt kiên nhẫn chờ luống đất chín',
      closedName: 'Hạt sốt ruột đào lại luống chưa chín',
      element: 'Earth',
      family: 'Pentacles',
      coreStory: 'Hạt này nằm im trong một luống đất mà nó đã tự tay vun trồng, chờ đúng thời điểm để lớn lên — hình ảnh của một việc cần thời gian dài mới ra quả: một công việc, một kỹ năng, một mối quan hệ đang xây dần. Khi hạt đủ kiên nhẫn ở yên, rễ vẫn đang âm thầm lớn dù mắt thường chưa thấy gì. Khi nó sốt ruột tự đào luống đất lên để kiểm tra, nó chỉ đang phá vỡ chính quá trình mình cần chờ, khiến mọi thứ phải bắt đầu lại.',
      visualMotif: 'Hạt lún một nửa vào lớp đất sẫm màu giàu mùn, vài sợi tơ mảnh trong suốt hướng ngược xuống dưới như rễ non thay vì xoè lên trên; một quầng sáng vàng nhạt phát nhẹ ngay dưới bề mặt đất gợi ý sự lớn lên chưa thấy được, lấm tấm rêu và khoáng chất li ti quanh đó.',
      profile: {
        domain: 'work',
        movement: 'tending',
        storyStage: 'patience',
        need: 'cần tin rằng công sức âm thầm vẫn đang tích luỹ dù chưa thấy kết quả',
        gift: 'đủ kiên nhẫn để công sức dài hạn có thời gian ra quả',
        risk: 'sốt ruột đào xới lại một việc chưa kịp chín, khiến nó phải bắt đầu lại',
        action: 'chọn tiếp tục thêm một mốc thời gian cụ thể trước khi đánh giá lại có nên đổi hướng'
      }
    }
  ];

  root.GARDEN_ORACLE_PROFILES_SAMPLE = GARDEN_ORACLE_PROFILES_SAMPLE;
})(window);
