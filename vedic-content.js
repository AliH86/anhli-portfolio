/*
  vedic-content.js — NỘI DUNG luận giải cho Bản Đồ Sao Vệ Đà.
  Tách khỏi vedic-chart.js (phần TÍNH TOÁN) theo đúng nếp của repo này:
  music-data.js tách khỏi index.html, garden-oracle-data.js tách khỏi logic
  Oracle. Sửa chữ nghĩa ở đây KHÔNG cần đụng tới code tính toán.

  2026-07-25. Ali: "làm sao ít nhất cũng có 1 góc nhìn tổng quan nhất của 1
  người, tức là mỗi phần đều có, mức chia sẻ đủ dài." Nên file này phải đủ
  để dựng một chân dung có đầu có cuối: 12 cung, 12 nhà, 27 Nakshatra,
  9 hành tinh, bảng vượng/hãm, và 9 chủ vận Dasha.

  GIỌNG: ấm, mời gọi, không phán. Luôn viết ở thể "có thể", "thường được
  xem là", "truyền thống nói" — đây là một hệ biểu tượng để soi lại mình,
  không phải một bản án. Đừng bao giờ viết câu khẳng định về sức khoẻ, tiền
  bạc, tuổi thọ hay chuyện sinh tử.

  window.VEDIC_CONTENT được vedic-chart.js đọc; nếu file này thiếu, phần
  luận giải tự lùi về bản ngắn chứ không làm sập cả công cụ.
*/
(function () {
  'use strict';

  var C = {};

  /* ── 12 CUNG (Rāśi) ───────────────────────────────────────────────────
     lord: id hành tinh chủ cung, dùng để tìm "chủ tinh Lagna nằm ở đâu". */
  C.signs = [
    { vi: 'Bạch Dương', lord: 'mars', element: 'Lửa', mode: 'Chuyển động',
      keys: 'khởi đầu, xung lực, gan dạ',
      body: 'Cung của phát pháo đầu tiên. Năng lượng ở đây thích mở đường hơn giữ đường, thích làm rồi sửa hơn cân đo mãi rồi thôi. Điểm sáng là dám; điểm cần trông là sự nóng — việc bắt đầu nhiều mà kết thúc ít.' },
    { vi: 'Kim Ngưu', lord: 'venus', element: 'Đất', mode: 'Cố định',
      keys: 'bền, giác quan, tích luỹ',
      body: 'Cung của cái gì chạm được: mùi, vị, chất liệu, chỗ ngồi quen. Thường đi cùng sự kiên nhẫn dài hơi và một khiếu thẩm mỹ rất riêng. Mặt kia của sự bền là khó rời — cả với đồ vật, thói quen, lẫn con người.' },
    { vi: 'Song Tử', lord: 'mercury', element: 'Khí', mode: 'Hai chiều',
      keys: 'chữ nghĩa, hiếu kỳ, linh hoạt',
      body: 'Cung của người truyền tin. Học nhanh, nối được những chuyện chẳng liên quan, kể lại cho người khác nghe được. Cái giá thường phải trả là bề sâu: nhiều cửa mở cùng lúc thì khó có cửa nào đi tới cùng.' },
    { vi: 'Cự Giải', lord: 'moon', element: 'Nước', mode: 'Chuyển động',
      keys: 'chở, nhớ, nhà',
      body: 'Cung của cái mái che. Ký ức ở đây sống rất lâu, và lòng thương thường đi trước lý lẽ. Sức mạnh là biết chăm; chỗ dễ mòn là chăm người khác nhiều hơn chăm mình, rồi giữ lại những chuyện đã nên thả.' },
    { vi: 'Sư Tử', lord: 'sun', element: 'Lửa', mode: 'Cố định',
      keys: 'toả, làm chủ, hào phóng',
      body: 'Cung của sân khấu và ánh đèn. Có nhu cầu thật lòng được thấy, và cũng có sức làm người khác muốn nhìn theo. Đẹp nhất khi hào phóng; khó nhất khi cái được-thấy trở thành điều kiện để thấy mình có giá.' },
    { vi: 'Xử Nữ', lord: 'mercury', element: 'Đất', mode: 'Hai chiều',
      keys: 'tinh, sửa, phục vụ',
      body: 'Cung của người dọn dẹp cho mọi thứ chạy được. Nhìn ra chi tiết lệch trước cả khi người khác thấy có gì lệch, và thường vui khi được giúp việc cụ thể. Mặt tối là chuẩn tự đặt quá cao, rồi mang chính mình ra đo.' },
    { vi: 'Thiên Bình', lord: 'venus', element: 'Khí', mode: 'Chuyển động',
      keys: 'cân, đôi, đẹp',
      body: 'Cung của cái cân và của người đối diện. Rất giỏi thấy phía bên kia, giỏi làm không khí dịu lại, và có gu. Chỗ khó là quyết: khi lúc nào cũng thấy cả hai bên đều có lý thì dễ trì hoãn chính ý mình.' },
    { vi: 'Thiên Yết', lord: 'mars', element: 'Nước', mode: 'Cố định',
      keys: 'sâu, bền gan, chuyển hoá',
      body: 'Cung của cái nằm dưới mặt nước. Sức chịu đựng lớn, đi tới đáy vấn đề, và thường bước qua vài lần đổi đời khá dứt khoát. Chỗ cần trông là sự nắm chặt — nghi, giữ, và không dễ nói ra điều đang thật đau.' },
    { vi: 'Nhân Mã', lord: 'jupiter', element: 'Lửa', mode: 'Hai chiều',
      keys: 'đường xa, nghĩa lý, dạy',
      body: 'Cung của người lên đường để tìm một cái nghĩa. Hào sảng, tin vào điều lớn hơn mình, hay ở vị trí truyền lại cho người sau. Chỗ dễ hụt là chi tiết và sự ở lại: cái nhìn rộng mà chân hay muốn đi tiếp.' },
    { vi: 'Ma Kết', lord: 'saturn', element: 'Đất', mode: 'Chuyển động',
      keys: 'trụ, kỷ luật, đường dài',
      body: 'Cung của người xây móng. Chịu được việc lâu ra kết quả, tự đặt lên vai mình phần trách nhiệm nặng nhất, và thường chín muộn hơn nhưng chắc hơn. Cái giá là khô: dễ quy mọi chuyện về hữu ích hay vô ích.' },
    { vi: 'Bảo Bình', lord: 'saturn', element: 'Khí', mode: 'Cố định',
      keys: 'khác, cộng đồng, xa mà thương',
      body: 'Cung của người đứng hơi lệch ra để thấy được cả nhóm. Nghĩ theo hệ thống, quan tâm chuyện chung, ít bị lung lay bởi việc ai đang nghĩ gì. Chỗ khó là gần: thương cả một tập thể dễ hơn thương một người ngay trước mặt.' },
    { vi: 'Song Ngư', lord: 'jupiter', element: 'Nước', mode: 'Hai chiều',
      keys: 'thấm, mơ, thả',
      body: 'Cung của đường biên mờ. Cảm được không khí trong phòng trước khi ai nói gì, và hay tìm đường về nghệ thuật, tín ngưỡng hoặc một thứ dịu dàng nào đó. Chỗ cần giữ là ranh: dễ ngấm cả chuyện không phải của mình.' }
  ];

  /* ── 12 NHÀ (Bhāva) ─────────────────────────────────────────────────── */
  C.houses = [
    { vi: 'Bản thân', sk: 'Tanu', keys: 'thân, dáng vẻ, cách bước vào phòng',
      body: 'Nhà nói về chính bạn ở tầng dễ thấy nhất: sức sống, cái người ta gặp trước khi kịp hiểu bạn, và hướng mà cả lá số nghiêng theo.' },
    { vi: 'Của cải & lời nói', sk: 'Dhana', keys: 'tài sản, gia đình gốc, giọng',
      body: 'Nhà của những gì bạn giữ được — của cải, nhưng cũng là lời nói, cách ăn, và mạch gia đình đã nuôi bạn lớn.' },
    { vi: 'Anh chị em & can đảm', sk: 'Sahaja', keys: 'giao tiếp, tay nghề, gan',
      body: 'Nhà của những chuyến đi gần, của bạn bè thời nhỏ và anh chị em, của cái can đảm rất thường ngày: mở lời, thử tay, làm lại.' },
    { vi: 'Nhà & lòng', sk: 'Bandhu', keys: 'mẹ, gốc, bình yên bên trong',
      body: 'Nhà của cái nền: nơi bạn về, người đã che cho bạn, và mức bình yên bạn có được khi không còn ai nhìn.' },
    { vi: 'Sáng tạo & con', sk: 'Putra', keys: 'con cái, tác phẩm, học cao, tình cảm',
      body: 'Nhà của những gì bạn sinh ra: con, tác phẩm, cuộc chơi, chuyện yêu. Cũng là nhà của phúc tự nhiên và của việc học xa hơn.' },
    { vi: 'Việc thường ngày & trở lực', sk: 'Roga', keys: 'kỷ luật, phục vụ, chuyện phải vượt',
      body: 'Nhà của cái phải làm mỗi ngày và cái phải vượt. Truyền thống xếp đây là nhà khó, nhưng cũng chính là nơi tay nghề được mài.' },
    { vi: 'Bạn đời & đối tác', sk: 'Yuvati', keys: 'hôn nhân, hợp tác, người đối diện',
      body: 'Nhà của người đứng đối diện bạn: bạn đời, cộng sự, cả người thương lượng với bạn. Nhà này hay kể chuyện bạn chọn ai để cân mình lại.' },
    { vi: 'Chuyển hoá & điều ẩn', sk: 'Randhra', keys: 'bí mật, thừa kế, những lần đổi đời',
      body: 'Nhà của những gì không nói ra: khủng hoảng và cửa hẹp, nhưng cũng là nghiên cứu sâu, huyền học, và của cải đến từ người khác.' },
    { vi: 'Phúc & đường xa', sk: 'Dharma', keys: 'may, thầy, tín ngưỡng, đi xa',
      body: 'Nhà của cái nâng bạn lên: thầy, niềm tin, đường dài, và cái nghĩa bạn chọn sống theo. Trong Jyotiṣa đây là một trong những nhà lành nhất.' },
    { vi: 'Nghề & danh', sk: 'Karma', keys: 'sự nghiệp, vị trí, việc để lại',
      body: 'Nhà của việc bạn làm trước mặt thiên hạ: nghề, chức phận, cái tên người ta nhắc khi bạn không có ở đó.' },
    { vi: 'Thu hoạch & bạn hữu', sk: 'Labha', keys: 'lợi, mạng lưới, mong muốn',
      body: 'Nhà của cái về tay: thu nhập, bạn bè, cộng đồng, và những mong muốn lớn mà bạn vẫn đang nuôi.' },
    { vi: 'Thả & xứ xa', sk: 'Vyaya', keys: 'chi ra, ngủ, giải thoát, nước ngoài',
      body: 'Nhà của cái đi ra khỏi tay: chi phí, buông bỏ, giấc ngủ, cõi trong, và duyên với đất khác.' }
  ];

  /* ── 9 HÀNH TINH (Graha) ──────────────────────────────────────────────
     karaka = "cai quản chuyện gì"; body = một nhịp mô tả tính chất. */
  C.planets = {
    sun:     { karaka: 'cái tôi, người cha, xương sống, chức phận',
               body: 'Mặt Trời là trục. Nó nói về cái bạn không chịu bẻ, về người cha (hoặc chỗ trống người cha để lại), và về việc bạn tự thấy mình đáng ở đâu.' },
    moon:    { karaka: 'tâm trí, người mẹ, cảm xúc, sự chở',
               body: 'Mặt Trăng là mực nước trong người. Vệ Đà coi đây là trọng tâm của lá số: nó nói bạn dịu lại bằng gì, và bạn cần gì để thấy an toàn.' },
    mars:    { karaka: 'sức, gan, tranh, anh em, tay nghề',
               body: 'Sao Hỏa là lửa để làm. Nó cho sức đẩy và ý chí; khi bị dồn thì thành nóng hoặc thành ganh, khi có việc đúng thì thành người làm được.' },
    mercury: { karaka: 'lời, tính toán, học, buôn bán',
               body: 'Sao Thủy là cái miệng và cái đầu nhanh. Nó lo phần diễn đạt, chữ nghĩa, số liệu, thương lượng — và cả cái hài hước.' },
    jupiter: { karaka: 'nghĩa lý, thầy, phúc, mở rộng',
               body: 'Sao Mộc là người mở rộng. Nó cho niềm tin, người dẫn đường và sự bao dung; quá tay thì thành phóng và thành hứa nhiều.' },
    venus:   { karaka: 'yêu, cái đẹp, nghệ thuật, tiện nghi',
               body: 'Sao Kim là khẩu vị. Nó lo chuyện yêu, chuyện đẹp, chuyện dễ chịu — và cũng cho biết bạn dễ mềm lòng trước cái gì.' },
    saturn:  { karaka: 'thời gian, giới hạn, bền, cô',
               body: 'Sao Thổ là ông thầy chậm. Nó lấy trước rồi trả sau: siết vào chỗ mình còn non, và trả lại sự vững cho ai chịu ngồi đủ lâu.' },
    rahu:    { karaka: 'khát, cái mới, ra ngoài lề',
               body: 'Rahu là cơn khát không đáy. Nó phóng đại chuyện của nhà nó đứng, đẩy bạn ra khỏi vùng quen, và thường cho nhiều nhưng cho muộn.' },
    ketu:    { karaka: 'thả, nghiệp cũ, cái đã đủ',
               body: 'Ketu là chỗ đã quá quen nên không còn hấp dẫn. Nó cho khả năng bẩm sinh mà lại kèm sự lơ là; đây là nơi truyền thống nói: buông tay ra.' }
  };

  /* ── VƯỢNG / HÃM / VỀ NHÀ MÌNH ────────────────────────────────────────
     Số là index cung (0 = Bạch Dương). Đây là dữ liệu kinh điển, không phải
     em nghĩ ra: exalt = vượng, debil = hãm, own = nhà mình, mool = moolatrikona.
     Rahu/Ketu vượng-hãm tuỳ phái nên KHÔNG đưa vào — thà thiếu hơn nói bừa. */
  C.dignity = {
    sun:     { exalt: 0,  debil: 6,  own: [4],    mool: [4] },
    moon:    { exalt: 1,  debil: 7,  own: [3],    mool: [1] },
    mars:    { exalt: 9,  debil: 3,  own: [0, 7], mool: [0] },
    mercury: { exalt: 5,  debil: 11, own: [2, 5], mool: [5] },
    jupiter: { exalt: 3,  debil: 9,  own: [8, 11], mool: [8] },
    venus:   { exalt: 11, debil: 5,  own: [1, 6], mool: [6] },
    saturn:  { exalt: 6,  debil: 0,  own: [9, 10], mool: [10] }
  };

  /* ── 27 NAKSHATRA ─────────────────────────────────────────────────────
     lord trùng thứ tự NAK_LORDS trong vedic-chart.js (Ketu, Kim, Trời,
     Trăng, Hỏa, Rahu, Mộc, Thổ, Thủy — lặp 3 vòng). */
  C.nakshatras = [
    { symbol: 'đầu ngựa', deity: 'Aśvin', body: 'Nhịp của người đi sớm nhất. Nhanh, muốn chữa lành, muốn tới trước — và hay bắt đầu lại từ đầu mà không thấy nặng.' },
    { symbol: 'âm hộ / cái nôi', deity: 'Yama', body: 'Nhịp của sức chịu và của ham muốn rất thật. Có khả năng mang một việc tới lúc chín, kèm sức nóng cần chỗ để đi ra.' },
    { symbol: 'lưỡi dao, con dao cạo', deity: 'Agni', body: 'Nhịp của lửa cắt. Nhìn ra chỗ dở rất nhanh, nói thẳng, và có thể thiêu sạch cái cũ để phần thật lộ ra.' },
    { symbol: 'xe bò, cây đa', deity: 'Brahmā', body: 'Nhịp của sự nuôi lớn. Dịu, ưa cái đẹp, có duyên làm người khác muốn ở lại — và biết cách để một thứ mọc lên chậm mà tốt.' },
    { symbol: 'đầu con nai', deity: 'Soma', body: 'Nhịp của người đi tìm. Hiếu kỳ, tai nhạy, dễ mềm; đi lang thang giữa các mối quan tâm cho tới khi gặp thứ đủ dịu dàng.' },
    { symbol: 'giọt nước mắt', deity: 'Rudra', body: 'Nhịp của cơn bão rồi trời trong. Cảm xúc lớn, đặt được câu hỏi khó, và thường lớn lên qua những lần vỡ.' },
    { symbol: 'ống đựng mũi tên', deity: 'Aditi', body: 'Nhịp của sự trở về. Hồi phục giỏi, rộng lòng, cho được người khác cơ hội thứ hai — kể cả cho chính mình.' },
    { symbol: 'bầu sữa, bông sen', deity: 'Bṛhaspati', body: 'Nhịp của người nuôi. Được xem là một trong những nhịp lành nhất: bền, biết chăm, hay là chỗ dựa cho người quanh mình.' },
    { symbol: 'con rắn cuộn', deity: 'Nāga', body: 'Nhịp của cái quấn. Trực giác mạnh, nhìn thấu động cơ người khác, và học được nhiều nếu không dùng cái thấy đó để siết.' },
    { symbol: 'ngai vàng', deity: 'Pitṛ', body: 'Nhịp của dòng dõi. Có gì đó rất "gốc" — người đi trước, tổ tiên, phẩm giá; và một nhu cầu được ngồi đúng chỗ của mình.' },
    { symbol: 'chiếc võng', deity: 'Bhaga', body: 'Nhịp của nghỉ và của chơi. Ấm, thích hội, giỏi làm người khác dễ chịu, và cần được yêu một cách rõ ràng.' },
    { symbol: 'chiếc giường', deity: 'Aryaman', body: 'Nhịp của lời hứa giữ được. Đằm, có ơn nghĩa, làm bạn lâu; hay là người đứng ra lo cho cả nhóm.' },
    { symbol: 'bàn tay', deity: 'Savitṛ', body: 'Nhịp của tay nghề. Làm được bằng tay, chữa được, sửa được; giỏi biến ý thành vật thật.' },
    { symbol: 'ngọc, viên minh châu', deity: 'Tvaṣṭṛ', body: 'Nhịp của người thợ khéo. Thẩm mỹ cao, muốn cái mình làm phải sáng lên — và ưa được người khác nhìn thấy cái sáng đó.' },
    { symbol: 'cây non trong gió', deity: 'Vāyu', body: 'Nhịp của gió. Tự lập, mềm mà không dễ gãy, đi được đường vòng; đổi hướng không phải vì yếu mà vì biết gió.' },
    { symbol: 'khải hoàn môn', deity: 'Indra–Agni', body: 'Nhịp của người có đích. Bền chí một cách âm thầm, chịu được chờ, và thường tới đích muộn hơn nhưng chắc hơn.' },
    { symbol: 'khải môn, bông sen', deity: 'Mitra', body: 'Nhịp của tình bạn giữ được lâu. Hoà, biết hợp tác, đi xa được cùng người khác mà không cần thắng ai.' },
    { symbol: 'chiếc khiên, bùa hộ', deity: 'Indra', body: 'Nhịp của người cầm trách nhiệm. Có uy, gánh nặng sớm, và học chuyện gánh bằng cách gánh thật.' },
    { symbol: 'chùm rễ', deity: 'Nirṛti', body: 'Nhịp của đào tới rễ. Muốn biết gốc của mọi chuyện, không bằng lòng với câu trả lời đẹp — và có thể bứng cả gốc lên để trồng lại.' },
    { symbol: 'nan quạt, chiếc rế', deity: 'Āpas', body: 'Nhịp của sức mở đường. Không sợ việc lớn, dám bước vào chỗ chưa ai đi, thắng bằng sự không lùi.' },
    { symbol: 'ngà voi', deity: 'Viśvedeva', body: 'Nhịp của thắng mà không cần ồn. Chính trực, được tin cậy, và hay ở vị trí kết thúc giùm việc người khác bỏ giữa đường.' },
    { symbol: 'cái tai, ba dấu chân', deity: 'Viṣṇu', body: 'Nhịp của người biết nghe. Học bằng tai, nhớ chuyện được kể, và hay trở thành nơi người khác tới nói.' },
    { symbol: 'chiếc trống', deity: 'Vasu', body: 'Nhịp của tiếng vang. Có nhạc trong người, giỏi giữ nhịp cho tập thể, và muốn để lại một âm nào đó.' },
    { symbol: 'vòng tròn trống', deity: 'Varuṇa', body: 'Nhịp của người đứng ngoài rồi chữa lành. Nghĩ khác, đi trước thời mình một chút, và hay tìm thuốc cho cái người khác chưa gọi được tên.' },
    { symbol: 'chân giường trước', deity: 'Aja Ekapāda', body: 'Nhịp của lửa lặng. Nội lực, chịu được cô, và có thể bùng lên rất mạnh khi tin vào một điều.' },
    { symbol: 'chân giường sau', deity: 'Ahir Budhnya', body: 'Nhịp của chiều sâu êm. Đằm, có tâm linh, cho được người khác cảm giác được che — kể cả khi mình cũng đang cần.' },
    { symbol: 'con cá, cái trống nhỏ', deity: 'Pūṣan', body: 'Nhịp cuối vòng: đưa người về. Dịu, nuôi dưỡng, thương cả những gì đã hết — và bắt đầu vòng mới bằng lòng biết ơn.' }
  ];

  /* ── 9 CHỦ VẬN (Vimśottarī Daśā) ──────────────────────────────────────
     Mô tả "khí" của một giai đoạn — không hứa hẹn kết quả cụ thể. */
  C.dashaLords = {
    ketu:    { years: 7,  body: 'Giai đoạn của việc thả. Thường có gỡ ra, rời đi, hoặc thấy điều từng quan trọng nay nhạt; đổi lại là chiều trong sâu hơn.' },
    venus:   { years: 20, body: 'Giai đoạn dài của cái đẹp và quan hệ. Thường đậm chuyện yêu, gu, nghệ thuật, tiện nghi — và cả việc học cách chọn.' },
    sun:     { years: 6,  body: 'Giai đoạn ngắn mà rõ. Chuyện danh phận, người cha, vai trò, và câu hỏi mình đứng ở đâu thường lên bàn.' },
    moon:    { years: 10, body: 'Giai đoạn của lòng và của nhà. Cảm xúc lên xuống rõ hơn, chuyện mẹ, chuyện chỗ ở, chuyện chăm nhau thành trung tâm.' },
    mars:    { years: 7,  body: 'Giai đoạn của sức và của việc phải tranh. Làm được nhiều, cũng dễ va; tốt cho ai có một việc cụ thể để dồn lửa vào.' },
    rahu:    { years: 18, body: 'Giai đoạn dài của khát và của lạ. Hay có đi xa, bước vào môi trường mới, mở rộng nhanh — kèm cảm giác chưa bao giờ đủ.' },
    jupiter: { years: 16, body: 'Giai đoạn của mở rộng và của nghĩa lý. Thầy, học, niềm tin, và những cửa mở ra rộng hơn mình tưởng.' },
    saturn:  { years: 19, body: 'Giai đoạn dài nhất và nghiêm nhất. Chậm, phải bền, phải làm thật; cái xây trong đoạn này thường là cái ở lại lâu.' },
    mercury: { years: 17, body: 'Giai đoạn của chữ nghĩa và giao dịch. Nói, viết, tính, kết nối; nhiều việc cùng lúc và nhiều người cùng lúc.' }
  };

  /* ── VÀI TỔ HỢP KINH ĐIỂN (yoga) tính được an toàn từ dữ liệu đang có ── */
  C.yogas = [
    { id: 'budha-aditya', name: 'Budha–Āditya', body: 'Mặt Trời và Sao Thủy cùng một cung — truyền thống gắn với đầu óc sáng, khéo diễn đạt, làm được nghề dùng trí.' },
    { id: 'chandra-mangala', name: 'Chandra–Maṅgala', body: 'Mặt Trăng và Sao Hỏa cùng một cung — nhiệt trong cảm xúc, giỏi việc phải xoay, thường gắn với chuyện làm ra của.' },
    { id: 'gajakesari', name: 'Gajakeśarī', body: 'Sao Mộc ở nhà góc (1/4/7/10) tính từ Mặt Trăng — được xem là dấu của sự nâng đỡ, có thầy, có tiếng.' },
    { id: 'kemadruma', name: 'Kemadruma', body: 'Không hành tinh nào ở hai cung kề Mặt Trăng — truyền thống đọc là phải tự đứng nhiều hơn, ít chỗ dựa sẵn; nhiều phái nói nó dễ được giải nếu có hành tinh ở nhà góc từ Lagna.' },
    { id: 'guru-mangala', name: 'Guru–Maṅgala', body: 'Sao Mộc và Sao Hỏa cùng một cung — ý chí đi cùng nghĩa lý, hợp với việc phải vừa dám vừa có nguyên tắc.' }
  ];

  window.VEDIC_CONTENT = C;
})();
