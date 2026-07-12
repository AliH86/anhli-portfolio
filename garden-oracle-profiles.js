/* Garden Oracle — core-story & semantic-profile data.

   TRẠNG THÁI THEO KHỐI (đúng trình tự "22 + 14 + 14 + 14 + 14" của
   ORACLE-CONTENT-SYSTEM.md §7 bước 5, mỗi khối một commit riêng để review):
     - majors (22 Major)              → ĐỦ 22/22, khối này đã hoàn tất.
     - suits.Wands  (Lửa, 14)          → ĐỦ 14/14, khối này đã hoàn tất.
     - suits.Cups   (Nước, 14)         → ĐỦ 14/14, khối này đã hoàn tất.
     - suits.Swords (Khí, 14)          → ĐỦ 14/14, khối này đã hoàn tất.
     - suits.Pentacles (Đất, 14)       → ĐỦ 14/14, khối này đã hoàn tất.
   Toàn bộ 78/78 hạt (22 Major + 56 Minor) đã có đủ coreStory + hồ sơ nghĩa,
   mỗi khối được viết và commit riêng theo đúng nguyên tắc "không gộp toàn bộ
   Oracle vào một phiên hoặc một commit lớn".

   File này KHÔNG được nạp vào index.html ở bước này và không đụng tới
   garden-oracle-data.js hay garden-oracle-synthesis.js. `domain` của 22 Major
   tái dùng CHÍNH XÁC mapping đã khoá trong garden-oracle-synthesis.js
   (MAJOR_DOMAIN) — không tự suy diễn lại.

   ------------------------------------------------------------------------
   SCHEMA — mỗi bản ghi hạt gồm:

   id           — number, khớp id trong GARDEN_ORACLE_CARDS (garden-oracle-data.js).
   tarot        — tên Tarot nội bộ, chỉ để đối chiếu khi review; KHÔNG phải
                  field mới của schema, KHÔNG bao giờ hiển thị UI (garden-oracle-data.js
                  vẫn là nguồn sự thật cho field `tarot`).
   openName     — tên Nở, tham chiếu ý nghĩa; KHÔNG render vào ảnh.
   closedName   — tên Khép, tham chiếu ý nghĩa; KHÔNG render vào ảnh.
   element      — 'Fire' | 'Water' | 'Air' | 'Earth'.
   family       — 'Major' | 'Wands' | 'Cups' | 'Swords' | 'Pentacles'.

   coreStory    — 1 đoạn ~45–70 chữ, hiểu được không cần biết Tarot. Nêu MỘT
                  chuyển động đời thường cụ thể mà cả Nở và Khép đều là hai
                  lối ra của cùng một tình huống đó. Ẩn dụ vườn/hạt/gió chỉ là
                  lớp hình ảnh nhẹ. Không copy nguyên văn `bloom`/`closed` đã
                  có trong garden-oracle-data.js — coreStory là lớp kể chuyện
                  sâu hơn, được viết lại thành một mạch mới.

   visualMotif  — 1 chi tiết hình ảnh độc bản cho artwork, dùng trực tiếp cho
                  biến {VISUAL_MOTIF} trong ORACLE-ASSET-PROMPT.md khi tới
                  lượt sinh ảnh cho từng khối.

   profile      — hồ sơ nghĩa có cấu trúc để engine tổng hợp 3 hạt đọc quan hệ
                  mà không cần NLP hay copy câu chữ. Field:

     domain     — 'love' | 'work' | 'decision' | 'action' | 'inner'. 22 Major
                  lấy nguyên mapping MAJOR_DOMAIN đã khoá trong
                  garden-oracle-synthesis.js; Minor sẽ lấy theo SUIT_DOMAIN
                  (Wands→action, Cups→love, Swords→decision, Pentacles→work).

     movement   — kiểu chuyển động, dùng chung cho cả Nở lẫn Khép (hai trạng
                  thái là hai kết quả của cùng một chuyển động). Vocabulary
                  gốc (5 mẫu ban đầu): opening, scanning, releasing, crossing,
                  holding, tending, colliding, arriving, resting, defending,
                  integrating, calling. Mở rộng khi làm 22 Major (ưu tiên tái
                  dùng danh sách trên trước, chỉ thêm khi thật sự cần một sắc
                  thái mới): listening, choosing, steering, turning,
                  balancing, suspending, entangling. Mở rộng thêm khi làm 14
                  Lửa: lifting, racing, carrying, radiating, guiding. Mở rộng
                  thêm khi làm 14 Nước: sharing, gathering, noticing,
                  remembering, savoring. Mở rộng thêm khi làm 14 Khí: cutting,
                  reflecting, concealing, confessing, dawning, watching,
                  pruning, judging. Mở rộng thêm khi làm 14 Đất: juggling,
                  seeking, practicing, flourishing, plodding.

     storyStage — vị trí trong một vòng cung tự sự. Với 56 hạt Minor, suy từ
                  rank để nhất quán: Ace→'spark', 2→'choice', 3→'connection',
                  4→'foundation', 5→'friction', 6→'recovery', 7→'patience',
                  8→'momentum', 9→'threshold', 10→'culmination',
                  Page→'curiosity', Knight→'pursuit', Queen→'nurture',
                  King→'mastery'. Với 22 Major, KHÔNG có rank để suy — gán tay
                  theo vị trí riêng của từng lá trong hành trình Fool's
                  Journey truyền thống (xem bảng bên dưới); hai đầu hành trình
                  cố tình tái dùng 'spark' (lá 0, mở đầu) và 'culmination'
                  (lá 21, khép hành trình) để nối liền ẩn dụ với vòng cung
                  Minor, 20 lá còn lại dùng nhãn riêng của Major:
                  activation, intuition, growth, structure, tradition, choice,
                  drive, composure, withdrawal, turning, reckoning,
                  suspension, ending, balance, entanglement, collapse, hope,
                  uncertainty, joy, awakening.

     need       — 1 cụm ngắn: nhu cầu con người thật đứng sau câu chuyện,
                  viết trung tính, không phán xét.
     gift       — 1 cụm ngắn: điều tốt khi hạt Nở (rút gọn ý `bloom`, không
                  copy nguyên câu).
     risk       — 1 cụm ngắn: điều cần chú ý khi hạt Khép (rút gọn ý `closed`,
                  không copy nguyên câu).
     action     — 1 gợi ý nhỏ, cụ thể, vừa sức — nguyên liệu cho bước 5 của
                  engine tổng hợp.
   ------------------------------------------------------------------------ */
(function(root){
  'use strict';

  const majors = [
    {
      id: 0, tarot: 'The Fool', openName: 'Hạt gieo vào gió', closedName: 'Hạt bay vô hướng',
      element: 'Air', family: 'Major',
      coreStory: 'Trước mọi khởi đầu có một khoảnh khắc hạt đã rời cành nhưng gió chưa định hướng đi. Bạn đang ở đó — trước một công việc, một mối quan hệ, một quyết định — chưa biết điểm đến, chỉ biết mình đã buông tay khỏi chỗ cũ. Cú buông thật lòng hướng tới điều mới là một khởi đầu đáng tin; cú buông chỉ để né tránh điều đang ở lại phía sau lại thành một chuyến bay không phương hướng.',
      visualMotif: 'Giọt sương vàng ánh kim đọng ở lõi hạt, ngay nơi thân vừa tách khỏi vỏ quả khô; hạt nghiêng là là như vừa rời cành, chưa ngả hẳn theo một hướng gió, đuôi tơ phía sau vẫn xoè ngược như dấu vết của cú buông vừa xảy ra.',
      profile: { domain: 'action', movement: 'opening', storyStage: 'spark',
        need: 'cần được phép bắt đầu mà không cần biết trước kết quả',
        gift: 'dám bước đi dù chưa chắc điểm đến',
        risk: 'lao vào cái mới chỉ để né tránh một điều ở hiện tại',
        action: 'chọn một bước nhỏ đầu tiên và thật sự làm, thay vì chờ chắc chắn hơn' } },
    {
      id: 1, tarot: 'The Magician', openName: 'Người thổi gọi gió', closedName: 'Bàn tay giữ gió trong tay',
      element: 'Air', family: 'Major',
      coreStory: 'Người này đã có đủ trong tay — thời gian, kỹ năng, hoặc điều kiện — để biến một ý định thành việc thật: một dự án, một cuộc trò chuyện cần có từ lâu, một thứ vẫn định làm mà chưa làm. Khi bàn tay thả gió ra đúng lúc, ý định trở thành hành động cụ thể ngay hôm nay. Khi bàn tay cứ giữ chặt lấy gió — vì ngại bắt đầu hoặc muốn kiểm soát mọi chi tiết trước — khả năng đó chỉ nằm yên, không biến thành gì cả.',
      visualMotif: 'Một quầng xoáy gió nhỏ phát sáng dịu ngay trong lòng thân hạt, như đang được nén giữ có chủ đích thay vì trôi tự do; các sợi tơ phía trước đã hơi tách ra như sắp được thả, sợi phía sau vẫn cuộn chặt quanh một điểm sáng trung tâm.',
      profile: { domain: 'action', movement: 'calling', storyStage: 'activation',
        need: 'cần đủ tin tưởng để dùng khả năng mình đang có ngay bây giờ, không chờ thêm dấu hiệu',
        gift: 'đủ điều kiện để biến ý định thành việc thật ngay lúc này',
        risk: 'giữ khả năng lại vì ngại bắt đầu hoặc muốn kiểm soát mọi chi tiết trước',
        action: 'chọn phần nhỏ nhất của việc định làm và bắt tay vào ngay hôm nay' } },
    {
      id: 2, tarot: 'The High Priestess', openName: 'Hạt nghe ra điều gió giấu', closedName: 'Hạt tự bịt tai trước gió',
      element: 'Water', family: 'Major',
      coreStory: 'Hạt này nghe được những điều gió mang theo mà chưa ai nói thành lời — một linh cảm về một người, một tình huống, một quyết định, đã có từ trước dù chưa giải thích được bằng lý lẽ. Khi hạt lắng tai và tin vào điều mình nghe thấy, nó không cần chứng minh gì cả. Khi hạt tự bịt tai vì sợ linh cảm đó không đủ hợp lý, nó bỏ lỡ một điều mình đã biết rất rõ từ bên trong.',
      visualMotif: 'Vài sợi tơ ở giữa tán hạt cong nhẹ về phía trong như đang lắng nghe một luồng gió rất khẽ chỉ nó mới cảm được; một quầng sáng bạc mờ ẩn hiện quanh lõi hạt, dịu hơn hẳn quầng vàng ấm ở các hạt khác.',
      profile: { domain: 'inner', movement: 'listening', storyStage: 'intuition',
        need: 'cần tin vào một cảm giác đúng dù chưa giải thích được bằng lời',
        gift: 'nghe ra được điều đang thật sự diễn ra trước khi có bằng chứng rõ ràng',
        risk: 'tự nghi ngờ và bịt tai trước linh cảm của chính mình vì thấy nó chưa đủ hợp lý',
        action: 'ghi lại cảm giác đó ra giấy, không cần hành động ngay, chỉ cần không phủ nhận nó' } },
    {
      id: 3, tarot: 'The Empress', openName: 'Vườn ươm đầy hạt', closedName: 'Vườn cạn vì cho hết',
      element: 'Earth', family: 'Major',
      coreStory: 'Đây là một khu vườn đang được chăm sóc tốt — một người, một dự định, một điều bạn đang nuôi lớn bằng thời gian và sự quan tâm của mình, và nó đang lớn lên đúng hướng. Khi vườn còn đủ để tưới cho cả người khác lẫn chính mình, sự chăm sóc đó là món quà thật sự. Khi bạn đã cho đi đến mức đất trong vườn cạn khô, kiệt sức không còn gì để tự nuôi, thì cần dừng lại chăm cho chính mảnh đất đó trước.',
      visualMotif: 'Hạt được bao quanh bởi một quầng phấn hoa mịn như sương ấm áp toả ra từ chính nó, vài mầm cây rất nhỏ mọc quanh chân hạt như đang được nuôi dưỡng trực tiếp từ nó; đất quanh chân hạt tươi ẩm, ngụ ý sự cho đi đang diễn ra.',
      profile: { domain: 'love', movement: 'tending', storyStage: 'growth',
        need: 'cần cảm thấy điều mình chăm sóc đang lớn lên đúng hướng',
        gift: 'khả năng nuôi dưỡng người khác hoặc một dự định đang phát huy đúng lúc',
        risk: 'cho đi đến mức kiệt sức, không còn gì để tự nuôi chính mình',
        action: 'dành một phần nhỏ thời gian hôm nay để chăm lại cho chính mình trước khi chăm tiếp cho người khác' } },
    {
      id: 4, tarot: 'The Emperor', openName: 'Thân cây giữ chiều gió', closedName: 'Cành cứng chặn đường bay',
      element: 'Fire', family: 'Major',
      coreStory: 'Một thân cây vững đang giữ đúng chiều cho luồng gió đi qua nó — hình ảnh của những quy tắc hay giới hạn rõ ràng bạn đang đặt ra trong công việc hay một mối quan hệ. Khi thân cây đủ chắc mà vẫn để gió lách qua, sự ổn định đó là thật, giúp mọi thứ đi đúng hướng. Khi cành cây cứng đến mức chặn hết đường bay của mọi luồng gió khác, quy tắc đó không còn phục vụ ai, chỉ còn vì bạn đã quen kiểm soát như vậy.',
      visualMotif: 'Một thân/cọng cây thẳng, chắc, có vân gỗ rõ nét chạy dọc như những đường luật lệ được khắc sẵn; hạt tựa vào đó ở một góc ổn định, vài luồng gió mảnh lách qua khe giữa các cành thay vì bị chặn đứng hoàn toàn.',
      profile: { domain: 'work', movement: 'defending', storyStage: 'structure',
        need: 'cần một cấu trúc hay giới hạn rõ ràng để mọi thứ ổn định',
        gift: 'đặt ra quy tắc giúp công việc hoặc mối quan hệ đi đúng hướng',
        risk: 'kiểm soát quá chặt đến mức không ai còn thấy thoải mái',
        action: 'xem lại một quy tắc mình đang giữ và hỏi nó còn thật sự cần thiết không' } },
    {
      id: 5, tarot: 'The Hierophant', openName: 'Mùa xưa gieo lại', closedName: 'Khuôn cũ giữ chân',
      element: 'Earth', family: 'Major',
      coreStory: 'Mùa cũ đang gieo lại vào mùa này — hình ảnh của một lời khuyên từ người đi trước, một cách làm quen thuộc, hay một truyền thống gia đình đang chỉ ra một hướng đi. Khi bạn thật sự chọn lại điều đó cho chính mình, nó trở thành nền tảng đáng tin. Khi bạn chỉ đang làm theo vì khuôn cũ giữ chân, không phải vì tin nó đúng với mình, thì đó không còn là lựa chọn, chỉ còn là thói quen.',
      visualMotif: 'Hạt tựa nhẹ lên một cụm hạt giống cũ hơn, sẫm màu và có vân nứt như đã qua một mùa, đang nảy ra vài sợi tơ mới nối tiếp từ đó; đường viền quanh hạt lặp lại hoa văn cổ điển hơn so với các hạt khác trong bộ.',
      profile: { domain: 'inner', movement: 'integrating', storyStage: 'tradition',
        need: 'cần một điểm tựa hay lời khuyên đáng tin từ điều đã được kiểm chứng trước',
        gift: 'biết chọn lọc một cách làm quen thuộc thật sự phù hợp với hoàn cảnh của mình',
        risk: 'làm theo một khuôn mẫu chỉ vì mọi người xung quanh vẫn làm vậy',
        action: 'hỏi thẳng mình: đây là điều mình tự chọn, hay chỉ vì đã quen làm vậy' } },
    {
      id: 6, tarot: 'The Lovers', openName: 'Đôi hạt cùng bay', closedName: 'Hai hạt lạc chiều',
      element: 'Air', family: 'Major',
      coreStory: 'Hai hạt đang bay cùng một hướng, hoặc lạc mất nhau giữa chừng — hình ảnh của một lựa chọn quan trọng liên quan tới một người, một công việc, hay một giá trị sống của bạn. Khi bạn chọn theo điều mình thật sự tin, dù khó hơn, hai hạt vẫn cùng bay đúng hướng. Khi bạn để người khác quyết định thay mình, hoặc cứ phân vân mãi không dám chốt, hai hướng bay lệch nhau dần — và điều khó nhất không phải là chọn sai, mà là không dám chọn.',
      visualMotif: 'Hai hạt bồ công anh bay gần nhau trong cùng một khung hình, quỹ đạo của chúng gần như song song nhưng có một khoảng lệch nhỏ dần hiện rõ ở nửa dưới khung, như đang trên bờ tách hướng.',
      profile: { domain: 'love', movement: 'choosing', storyStage: 'choice',
        need: 'cần đủ can đảm để chọn theo điều mình thật sự tin, không phải điều dễ hơn',
        gift: 'chọn đúng hướng dù khó, giữ được sự đồng hành thật sự với người kia',
        risk: 'để người khác quyết định thay mình hoặc cứ phân vân mãi không dám chốt',
        action: 'chọn một điều cụ thể hôm nay, dù nhỏ, thay vì tiếp tục cân nhắc' } },
    {
      id: 7, tarot: 'The Chariot', openName: 'Hạt cưỡi luồng gió', closedName: 'Hạt bị gió kéo đi',
      element: 'Water', family: 'Major',
      coreStory: 'Hạt này đang cưỡi trên một luồng gió mạnh, cố giữ vững một hướng đi dù nhiều thứ khác — công việc, cảm xúc, người xung quanh — đang kéo nó lệch hướng. Khi hạt thật sự đang lái, nó tự quyết định tốc độ và điểm đến của mình. Khi hạt chỉ đang bị gió kéo đi, lao rất nhanh mà không chắc mình đang tiến tới đâu, nó cần chậm lại và hỏi: đây có phải hướng mình chọn, hay chỉ là đang chạy trốn một cảm giác nào đó?',
      visualMotif: 'Hạt nghiêng mình rõ rệt theo một trục chuyển động mạnh, các sợi tơ ép sát về phía sau như đang chịu lực gió lớn; hai luồng ánh sáng mảnh chạy song song hai bên thân hạt như hai vệt kéo vô hình.',
      profile: { domain: 'action', movement: 'steering', storyStage: 'drive',
        need: 'cần giữ vững hướng đi của mình dù nhiều thứ đang kéo mình lệch hướng',
        gift: 'vẫn hoàn thành được mục tiêu dù có nhiều lực cản khác nhau',
        risk: 'lao đi rất nhanh theo một kế hoạch mà không chắc mình đang đi đúng hướng',
        action: 'chậm lại một nhịp và tự hỏi mình đang tiến tới, hay đang chạy trốn điều gì' } },
    {
      id: 8, tarot: 'Strength', openName: 'Hạt mềm qua được gió dữ', closedName: 'Hạt gồng mình chống gió dữ',
      element: 'Fire', family: 'Major',
      coreStory: 'Hạt này đi qua một cơn gió dữ mà không gãy, nhờ mềm dẻo chứ không phải nhờ cứng lại — hình ảnh của việc đối mặt một người hay một tình huống khó khăn bằng sự bình tĩnh và kiên nhẫn thay vì phản ứng gay gắt. Khi hạt thật sự mềm, nó uốn theo gió mà vẫn nguyên vẹn. Khi nó gồng mình chống lại để tỏ ra mạnh mẽ trước mặt người khác, bên trong lại đang rất căng thẳng — và không sao nếu cho phép mình yếu đuối một chút với người mình tin tưởng.',
      visualMotif: 'Thân hạt uốn cong mềm mại theo một luồng gió mạnh thấy rõ qua các vệt chuyển động, nhưng toàn bộ tán tơ vẫn nguyên vẹn không rối; một sợi tơ duy nhất run nhẹ khác biệt với phần còn lại, gợi ý một chút căng thẳng ẩn bên trong sự bình tĩnh.',
      profile: { domain: 'inner', movement: 'holding', storyStage: 'composure',
        need: 'cần đối mặt với khó khăn bằng bình tĩnh thay vì phải tỏ ra mạnh mẽ',
        gift: 'giữ được sự mềm dẻo, kiên nhẫn ngay giữa một tình huống dữ dội',
        risk: 'gồng mình tỏ ra ổn trong khi bên trong đang rất căng thẳng hoặc sợ hãi',
        action: 'cho phép mình yếu đuối một chút với chính mình hoặc một người mình tin tưởng' } },
    {
      id: 9, tarot: 'The Hermit', openName: 'Ngọn đèn gọi từ xa', closedName: 'Cô tĩnh không lối ra',
      element: 'Earth', family: 'Major',
      coreStory: 'Một ngọn đèn nhỏ đang gọi từ xa trong đêm tĩnh — hình ảnh của việc cần một khoảng thời gian ở một mình để suy nghĩ rõ ràng hơn về một quyết định. Khi khoảng lặng đó có giới hạn và mục đích, nó là điều nên làm, không phải trốn tránh. Khi bạn đã tự cô lập mình quá lâu đến mức khoảng tĩnh đó không còn lối ra, sự yên tĩnh biến thành cô đơn — lúc đó chỉ cần nhắn một câu ngắn cho người mình tin tưởng.',
      visualMotif: 'Một đốm sáng nhỏ, ấm, đơn độc lơ lửng cách xa hạt trong không gian tối, như một ngọn đèn ở cuối một hành lang gió dài; hạt đứng yên gần như bất động, tán tơ khép nhẹ lại thay vì xoè rộng như các hạt khác.',
      profile: { domain: 'inner', movement: 'resting', storyStage: 'withdrawal',
        need: 'cần một khoảng thời gian ở một mình để suy nghĩ rõ ràng hơn',
        gift: 'biết dùng sự tĩnh lặng để nhìn rõ một quyết định, không phải để trốn tránh',
        risk: 'tự cô lập mình quá lâu đến mức thấy cô đơn thay vì yên tĩnh',
        action: 'nhắn một câu ngắn cho một người mình tin tưởng, dù chỉ để biết mình không một mình' } },
    {
      id: 10, tarot: 'Wheel of Fortune', openName: 'Vòng gió cuốn hạt sang mùa', closedName: 'Mùa cũ giữ hạt lại',
      element: 'Fire', family: 'Major',
      coreStory: 'Một vòng gió lớn đang cuốn hạt sang một mùa khác — hình ảnh của một điều đang thay đổi trong công việc, một mối quan hệ, hay hoàn cảnh sống của bạn, mà không cần hiểu hết lý do mới có thể chấp nhận nó. Khi hạt để vòng gió cuốn mình đi, nó bước sang mùa mới đúng nhịp tự nhiên. Khi nó cố bám lại mùa cũ vì quen thuộc dù đã không còn phù hợp, cần tự hỏi: đang sợ thay đổi, hay đang thật sự tiếc cái cũ?',
      visualMotif: 'Hạt nằm giữa một vòng xoáy gió lớn hình tròn mờ ảo bao quanh toàn khung hình, một nửa vòng xoáy mang màu ấm của mùa mới, nửa còn lại vẫn vương chút màu úa của mùa cũ đang dần mờ đi.',
      profile: { domain: 'action', movement: 'turning', storyStage: 'turning',
        need: 'cần chấp nhận một sự thay đổi đang diễn ra mà không cần hiểu hết lý do',
        gift: 'đón nhận sự thay đổi đúng nhịp, không cưỡng lại vòng xoay tự nhiên của hoàn cảnh',
        risk: 'cố giữ mọi thứ y như cũ dù nó không còn phù hợp, chỉ vì quen thuộc',
        action: 'tự hỏi mình đang sợ thay đổi, hay đang thật sự tiếc điều cũ — rồi chọn một hướng' } },
    {
      id: 11, tarot: 'Justice', openName: 'Hạt về đúng phần đất của mình', closedName: 'Hạt đứng trên cán cân nghiêng',
      element: 'Air', family: 'Major',
      coreStory: 'Hạt này đang về đúng phần đất của mình — hình ảnh của một kết quả công bằng đang đến từ một quyết định hay một việc bạn đã làm trước đó, không phải hình phạt, chỉ là hệ quả tự nhiên. Khi hạt đứng vững trên cán cân đã cân bằng, nó chấp nhận kết quả một cách rõ ràng. Khi cán cân nghiêng vì bạn quá khắt khe với bản thân về một lỗi đã qua, hoặc đang né tránh trách nhiệm, cần nhìn lại thật công bằng, đừng quá nặng nề với chính mình.',
      visualMotif: 'Hạt đứng cân bằng trên một cọng thân mảnh ngang như đòn cân, hai bên tán tơ xoè đối xứng gần như tuyệt đối; một vệt sáng mảnh chạy ngang qua chính giữa khung hình như đường thăng bằng.',
      profile: { domain: 'decision', movement: 'balancing', storyStage: 'reckoning',
        need: 'cần một cái nhìn công bằng, không quá khắt khe cũng không né tránh trách nhiệm',
        gift: 'chấp nhận một kết quả tự nhiên đến từ chính quyết định của mình, rõ ràng và bình thản',
        risk: 'quá khắt khe với bản thân về một lỗi đã qua hoặc né tránh trách nhiệm',
        action: 'nhìn lại một việc đã qua một cách công bằng, không thêm cũng không bớt' } },
    {
      id: 12, tarot: 'The Hanged Man', openName: 'Cành giữ hạt lơ lửng', closedName: 'Cành níu mãi không buông',
      element: 'Water', family: 'Major',
      coreStory: 'Một cành cây đang giữ hạt lơ lửng, không rơi cũng không bay đi — hình ảnh của việc tạm dừng lại một quyết định hay một kế hoạch, và khoảng dừng đó giúp bạn nhìn mọi thứ theo một cách mới. Khi khoảng lơ lửng này có chủ đích và có hạn, nó là một góc nhìn quý giá. Khi cành cứ níu mãi không buông, bạn đang chịu đựng một tình huống — một công việc, một mối quan hệ — lâu hơn cần thiết, trong khi thật ra có thể thay đổi nó bất cứ lúc nào.',
      visualMotif: 'Hạt treo lơ lửng ngược đầu xuống dưới một cành cong nhẹ, tán tơ xoè ngược xuống phía dưới thay vì lên trên như các hạt khác; một giọt sương duy nhất sắp rơi nhưng vẫn còn treo nguyên ở đầu tán tơ.',
      profile: { domain: 'inner', movement: 'suspending', storyStage: 'suspension',
        need: 'cần một khoảng dừng có chủ đích để nhìn tình huống theo cách khác',
        gift: 'biết tạm dừng lại đúng lúc để thấy rõ hơn trước khi quyết định tiếp',
        risk: 'chịu đựng một tình huống lâu hơn cần thiết dù có thể thay đổi nó bất cứ lúc nào',
        action: 'đặt một giới hạn thời gian cụ thể cho khoảng dừng này, thay vì để nó kéo dài vô hạn' } },
    {
      id: 13, tarot: 'Death', openName: 'Bông cũ buông hạt', closedName: 'Mùa tàn giữ xác',
      element: 'Water', family: 'Major',
      coreStory: 'Một bông hoa cũ đang buông hạt của mình ra — hình ảnh của một giai đoạn, một công việc, hay một mối quan hệ trong cuộc sống bạn đang thật sự kết thúc, điều cần thiết để một điều mới có thể bắt đầu. Khi bông hoa buông hạt trọn vẹn, sự kết thúc đó mở đường cho mùa sau. Khi nó cố giữ lại phần đã tàn, chỉ thay đổi bề ngoài mà không thật sự buông bỏ, cần cho phép mình buồn về điều đã mất trước khi cố thay thế bằng thứ khác.',
      visualMotif: 'Hạt vừa tách khỏi một bông hoa đã khô sẫm màu phía sau nó, đường tách rời hiện rõ như một vết cắt nhẹ nhàng chứ không phải đứt gãy dữ dội; phía sau hạt, cánh hoa cũ đang rơi rụng nhẹ nhàng theo một hướng khác với hạt.',
      profile: { domain: 'action', movement: 'releasing', storyStage: 'ending',
        need: 'cần chấp nhận một giai đoạn đã thật sự kết thúc để điều mới có chỗ bắt đầu',
        gift: 'để một điều không còn phù hợp kết thúc trọn vẹn, mở đường cho mùa sau',
        risk: 'cố giữ lại một điều đã không còn nữa, chỉ thay đổi bề ngoài mà không buông bỏ thật sự',
        action: 'cho phép mình buồn về điều đã mất, trước khi cố thay thế nó bằng thứ khác' } },
    {
      id: 14, tarot: 'Temperance', openName: 'Hai luồng gió hòa nhau', closedName: 'Gió chọi gió, hạt chênh chao',
      element: 'Fire', family: 'Major',
      coreStory: 'Hai luồng gió đang hoà vào nhau quanh hạt này — hình ảnh của việc cân bằng tốt giữa hai điều khác nhau trong cuộc sống: công việc và nghỉ ngơi, hai người, hai lựa chọn. Khi hai luồng gió thật sự hoà nhau, đó là một kỹ năng, không phải sự thỏa hiệp yếu đuối. Khi hai luồng gió chọi nhau khiến hạt chênh chao, có hai điều hoặc hai người đang không ăn khớp và chưa ai chịu nhường — lúc này đừng vội thêm bất cứ cam kết mới nào.',
      visualMotif: 'Hai luồng ánh sáng mảnh, một ấm một mát, uốn quanh hạt và hoà vào nhau ngay tại lõi hạt thành một màu trung tính duy nhất; tán tơ hai bên hạt xoè đối xứng như đang giữ nhịp cho cả hai luồng.',
      profile: { domain: 'inner', movement: 'balancing', storyStage: 'balance',
        need: 'cần giữ nhịp cân bằng giữa hai điều khác nhau mà không phải hy sinh cái nào',
        gift: 'biết dung hoà hai điều khác biệt thành một nhịp sống ổn định',
        risk: 'để hai điều hoặc hai người không ăn khớp kéo mình chênh chao mà chưa ai chịu nhường',
        action: 'tạm ngưng thêm cam kết mới cho tới khi hai luồng đang chọi nhau tìm được nhịp chung' } },
    {
      id: 15, tarot: 'The Devil', openName: 'Hạt nhìn thấy rễ trói', closedName: 'Hạt tự buộc vào đất tối',
      element: 'Earth', family: 'Major',
      coreStory: 'Hạt này nhìn thấy chính những sợi rễ đang trói mình lại — hình ảnh của một thói quen, một mối quan hệ, hay một nỗi sợ đang giữ chân bạn. Nhìn thấy nó rõ ràng đã là bước đầu để thay đổi. Nhưng khi hạt coi những sợi rễ đó là số phận, tự buộc mình chặt hơn vào vùng đất tối để khỏi phải cố thay đổi, nó quên mất rằng vẫn có thể chọn khác — chỉ cần bắt đầu bằng một bước rất nhỏ.',
      visualMotif: 'Vài sợi rễ mảnh, sẫm màu quấn quanh phần thân dưới của hạt như dây trói, nhưng một đầu rễ đã lỏng ra và có thể tháo được; ánh sáng ấm vẫn chiếu rõ vào lõi hạt dù phần chân đang bị quấn.',
      profile: { domain: 'inner', movement: 'entangling', storyStage: 'entanglement',
        need: 'cần nhìn thẳng vào một thói quen hay nỗi sợ đang trói buộc mình để thấy nó rõ ràng',
        gift: 'nhận ra rõ điều gì đang giữ chân mình — bước đầu tiên để thật sự thay đổi',
        risk: 'coi một tình huống không lành mạnh là số phận để khỏi phải cố thay đổi nó',
        action: 'chọn một bước rất nhỏ để nới lỏng sợi rễ đang trói mình, thay vì chấp nhận nó là mãi mãi' } },
    {
      id: 16, tarot: 'The Tower', openName: 'Tháp gãy tung hạt bay', closedName: 'Tường nứt giữ hạt lại',
      element: 'Fire', family: 'Major',
      coreStory: 'Một tòa tháp gãy tung, hất hạt bay ra khỏi nơi nó từng đứng — hình ảnh của một điều bạn từng nghĩ là chắc chắn, một kế hoạch, một mối quan hệ, một niềm tin, đang sụp đổ rất nhanh. Khi cú sụp đổ diễn ra trọn vẹn, hạt được giải thoát khỏi thứ vốn dĩ không còn vững từ trước, dù đau. Khi bức tường chỉ nứt mà cứ được cố che giấu, giữ hạt lại bên trong, bạn đang sống trong lo sợ chờ nó sụp — điều đó thường nặng nề hơn để nó sụp hẳn.',
      visualMotif: 'Hạt bị hất văng khỏi một cấu trúc dạng tháp/cành gãy vụn phía sau, các mảnh vỡ nhỏ lấp lánh bay theo cùng hướng; tán tơ hạt xoè bung mạnh bất đối xứng như vừa trải qua một cú va chạm dữ dội.',
      profile: { domain: 'action', movement: 'colliding', storyStage: 'collapse',
        need: 'cần để một điều không còn vững thật sự sụp đổ thay vì cố giữ nó',
        gift: 'được giải thoát khỏi một kế hoạch, mối quan hệ hay niềm tin vốn dĩ đã không còn chắc',
        risk: 'cố che giấu một điều đã rạn nứt từ lâu, sống trong lo sợ chờ nó sụp',
        action: 'ngừng cố cứu vãn một điều đã rạn nứt rõ ràng và để nó kết thúc theo cách của nó' } },
    {
      id: 17, tarot: 'The Star', openName: 'Hạt bay theo ánh sao', closedName: 'Hạt quên đường sao chỉ',
      element: 'Air', family: 'Major',
      coreStory: 'Hạt này bay theo ánh sáng của một vì sao xa — hình ảnh của một niềm hy vọng thật sự về tương lai, không viển vông, miễn là bạn thành thật với điều mình thật sự mong muốn. Khi hạt còn nhìn thấy ánh sao và bay theo nó, hy vọng đó dẫn đường rõ ràng. Khi hạt quên mất đường sao từng chỉ, có thể vì đã thất vọng quá nhiều lần, nó cần chọn một điều nhỏ, thật, để bắt đầu tin trở lại.',
      visualMotif: 'Một điểm sáng nhỏ, lấp lánh như sao, nằm ở góc xa của khung hình, nối với lõi hạt bằng một vệt sáng mảnh gần như vô hình; tán tơ hạt nghiêng nhẹ về phía điểm sáng đó như đang được dẫn đường.',
      profile: { domain: 'inner', movement: 'opening', storyStage: 'hope',
        need: 'cần giữ được một niềm hy vọng thật, không viển vông, về điều mình thật sự mong muốn',
        gift: 'có một niềm tin rõ ràng về tương lai đang dẫn đường cho mình',
        risk: 'thất vọng nhiều lần đến mức không còn dám mơ hay hy vọng nữa',
        action: 'chọn một điều nhỏ, thật, để bắt đầu tin trở lại' } },
    {
      id: 18, tarot: 'The Moon', openName: 'Hạt qua miền sương trăng', closedName: 'Hạt lạc trong trăng giả',
      element: 'Water', family: 'Major',
      coreStory: 'Hạt này đang đi qua một miền sương dưới ánh trăng — hình ảnh của một giai đoạn mọi thứ chưa rõ ràng: một mối quan hệ, một quyết định, mà bạn không cần hiểu hết mới có thể tiếp tục đi qua. Khi hạt cứ đi dù sương còn dày, nó vẫn đang tiến đúng hướng. Khi nó lạc trong ánh trăng giả — những hình dạng mơ hồ do sương tạo ra — nỗi lo lắng đang khiến nó nhìn tình huống tệ hơn thực tế, và cần tự hỏi: điều mình đang sợ có thật sự đúng, hay chỉ do lo lắng?',
      visualMotif: 'Hạt bay giữa một lớp sương mờ ảo bao phủ gần hết khung hình, chỉ lõi hạt và một phần tán tơ gần đó còn rõ nét; một vài hình dạng mờ ảo phía xa gợi bóng dáng không rõ ràng, có thể là ảo giác của sương chứ không phải vật thể thật.',
      profile: { domain: 'inner', movement: 'crossing', storyStage: 'uncertainty',
        need: 'cần được phép tiếp tục đi qua một giai đoạn mơ hồ mà không cần hiểu hết mọi thứ',
        gift: 'vẫn tiến đúng hướng dù mọi thứ quanh mình chưa rõ ràng',
        risk: 'để lo lắng khiến mình nhìn một tình huống tệ hơn thực tế nó đang có',
        action: 'tự hỏi điều mình đang sợ có thật sự đúng, hay chỉ là do lo lắng đang phóng đại nó' } },
    {
      id: 19, tarot: 'The Sun', openName: 'Nắng mới đánh thức hạt sáng', closedName: 'Nắng gắt ép hạt khép lại',
      element: 'Fire', family: 'Major',
      coreStory: 'Một tia nắng mới đánh thức hạt, khiến nó sáng lên rõ rệt — hình ảnh của một giai đoạn vui vẻ, rõ ràng, tích cực trong cuộc sống bạn, mà bạn được phép tận hưởng trọn vẹn không cần giấu bớt. Khi hạt đón trọn ánh nắng, niềm vui đó là thật và không cần biện minh. Khi nắng bị coi là quá gắt khiến hạt tự khép lại, có thể bạn đang cố tỏ ra ổn hơn thực tế, ngại để người khác thấy mình thật sự vui — trong khi cứ vui thật vẫn ổn hơn phải diễn.',
      visualMotif: 'Toàn bộ hạt được bao phủ bởi ánh sáng vàng ấm rực rỡ hơn hẳn các hạt khác trong bộ, tán tơ xoè rộng hết cỡ đón ánh sáng; một vài giọt sương lấp lánh như đang phản chiếu ánh nắng trực tiếp, khác với dewdrop mờ hơn ở các hạt khác.',
      profile: { domain: 'inner', movement: 'arriving', storyStage: 'joy',
        need: 'cần được phép tận hưởng một niềm vui thật mà không cần giấu bớt hay biện minh',
        gift: 'sống trọn một giai đoạn vui vẻ, rõ ràng, tích cực mà không cần diễn cho ai xem',
        risk: 'cố tỏ ra ổn hơn thực tế, ngại để người khác thấy mình thật sự vui',
        action: 'cho phép mình vui thật trước mặt người khác, không cần giảm bớt hay che giấu' } },
    {
      id: 20, tarot: 'Judgement', openName: 'Tiếng gọi đánh thức', closedName: 'Hồi chuông ngủ quên',
      element: 'Fire', family: 'Major',
      coreStory: 'Một tiếng gọi đang đánh thức hạt này — hình ảnh của một điều bạn biết mình cần làm hoặc cần đối diện: một cuộc nói chuyện, một quyết định đã trì hoãn quá lâu. Khi hạt nghe và đáp lại tiếng gọi, đây là lúc để hành động, dù nó đến trễ hơn bạn mong. Khi hồi chuông đó bị bỏ ngủ quên, bạn đang tránh né một điều mình biết rõ cần giải quyết, hoặc đang tự trách bản thân quá lâu vì một lỗi đã qua — trong khi tha thứ cho mình không có nghĩa là quên, chỉ là ngừng tự dằn vặt.',
      visualMotif: 'Một vòng sóng ánh sáng lan toả từ một điểm phía trên hạt như tiếng chuông vừa vang lên, hạt nghiêng ngẩng lên đón lấy vòng sóng đó; vài sợi tơ đã rung nhẹ như vừa được đánh thức, khác biệt với phần còn lại vẫn tĩnh.',
      profile: { domain: 'action', movement: 'calling', storyStage: 'awakening',
        need: 'cần đáp lại một điều mình biết rõ cần làm hoặc cần đối diện, dù đã trì hoãn lâu',
        gift: 'sẵn sàng hành động đúng lúc khi nghe ra tiếng gọi của chính mình',
        risk: 'tránh né một điều cần giải quyết hoặc tự trách bản thân quá lâu vì lỗi đã qua',
        action: 'chọn đối diện với điều mình vẫn tránh né, và ngừng tự dằn vặt về lỗi đã qua' } },
    {
      id: 21, tarot: 'The World', openName: 'Vườn nở lại quanh hạt', closedName: 'Mùa mới đứng ngoài cửa',
      element: 'Earth', family: 'Major',
      coreStory: 'Cả khu vườn nở lại quanh hạt này — hình ảnh của việc hoàn thành trọn vẹn một giai đoạn hay một dự định quan trọng, lúc để tự hào về điều đó. Khi hạt thật sự bước vào giữa khu vườn đã nở, nó trọn vẹn đón nhận thành quả của mình. Khi nó cứ đứng ngoài cửa một mùa mới dù việc cũ đã gần xong, có thể đang trì hoãn vì một điều còn thiếu chưa chắc đã thật sự quan trọng — chỉ là lý do để chưa phải bước vào.',
      visualMotif: 'Hạt đứng giữa một vòng tròn hoa nhỏ đang nở rộ bao quanh toàn khung hình, đối xứng đều cả bốn phía như một khu vườn trọn vẹn; ánh sáng ấm bao trùm đều khắp, không còn vùng tối lệch về một phía như các hạt khác.',
      profile: { domain: 'action', movement: 'integrating', storyStage: 'culmination',
        need: 'cần cho phép mình tự hào về một giai đoạn đã hoàn thành trọn vẹn',
        gift: 'hoàn tất một dự định quan trọng và trọn vẹn đón nhận thành quả của nó',
        risk: 'đứng ngoài một khởi đầu mới vì cảm thấy việc cũ chưa thật sự xong',
        action: 'hỏi điều mình cho là còn thiếu có thật sự quan trọng, hay chỉ là lý do để trì hoãn' } }
  ];

  if (majors.length !== 22) throw new Error('Garden Oracle majors batch must contain exactly 22 seeds.');

  // Khối Lửa (Wands) — ĐỦ 14/14, đã hoàn tất theo trình tự rank Ace→King.
  const suits = {
    Wands: [
      {
        id: 22, tarot: 'Ace of Wands', openName: 'Hạt bén lửa đầu mùa', closedName: 'Hạt tắt lửa chưa kịp cháy',
        element: 'Fire', family: 'Wands',
        coreStory: 'Một đốm lửa nhỏ vừa bén lên trong hạt này — hình ảnh của một ý tưởng hay hứng thú mới vừa xuất hiện trong bạn: về công việc, một sở thích, một dự định, còn non nhưng có thật. Khi đốm lửa được để yên cho cháy lên, ý tưởng đó có cơ hội trở thành điều thật. Khi nó bị dập tắt quá sớm vì sốt ruột muốn thấy kết quả ngay, ý tưởng chưa kịp có cơ hội chứng minh gì cả.',
        visualMotif: 'Một đốm lửa nhỏ, ấm, vừa bén sáng ngay tại lõi hạt như tia lửa đầu tiên của một que diêm, ánh sáng còn mỏng manh và hơi chập chờn; vài sợi tơ gần lõi hơi cong lại gần đốm lửa đó như đang được nó sưởi ấm.',
        profile: { domain: 'action', movement: 'opening', storyStage: 'spark',
          need: 'cần được phép để một ý tưởng còn non tồn tại mà không phải chứng minh ngay',
          gift: 'có một ý tưởng hay hứng thú mới thật sự đáng để thử',
          risk: 'dập tắt một ý tưởng mới quá nhanh vì sốt ruột muốn thấy kết quả ngay',
          action: 'cho ý tưởng đó thêm một khoảng thời gian cụ thể trước khi quyết định bỏ hay giữ' } },
      {
        id: 23, tarot: 'Two of Wands', openName: 'Hạt nhìn về chân trời lạ', closedName: 'Hạt ngại bước khỏi cành quen',
        element: 'Fire', family: 'Wands',
        coreStory: 'Hạt này đứng ở mép cành quen, nhìn ra một chân trời lạ chưa từng tới — hình ảnh của việc cân nhắc một hướng đi mới: đổi việc, chuyển chỗ ở, bắt đầu điều gì đó khác. Khi hạt bình tĩnh nhìn xa trước khi quyết định, đó là chuẩn bị đàng hoàng. Khi nó chỉ đứng mãi ở mép cành vì sợ điều mới lạ hơn là vì thật sự thích chỗ cũ, một kế hoạch chỉ trở thành thật khi có hành động thật, không chỉ dừng ở việc nhìn.',
        visualMotif: 'Hạt đứng chông chênh ngay tại đầu một cành quen thuộc, một bên tán tơ đã hơi nhấc khỏi điểm tựa; phía xa trước mặt là một vùng chân trời mới với ánh sáng khác hẳn màu ánh sáng quen thuộc phía sau nó.',
        profile: { domain: 'action', movement: 'choosing', storyStage: 'choice',
          need: 'cần thời gian nhìn xa và cân nhắc trước khi rời một chỗ quen thuộc',
          gift: 'bình tĩnh nhìn rõ một hướng đi mới trước khi quyết định',
          risk: 'đứng mãi ở mép cành quen vì sợ điều mới hơn là vì thật sự thích chỗ cũ',
          action: 'làm một hành động cụ thể, dù nhỏ, để biến kế hoạch từ ý nghĩ thành thật' } },
      {
        id: 24, tarot: 'Three of Wands', openName: 'Hạt thấy gió mang tin về', closedName: 'Hạt đợi tin mà quên nhìn xa',
        element: 'Fire', family: 'Wands',
        coreStory: 'Hạt này đứng trên một cành cao, nhìn ra vùng trời rộng nơi những luồng gió đang mang tin từ xa về — kết quả của một điều bạn đã bỏ công gieo trồng từ lâu: một dự án, một mối quan hệ, một kế hoạch dài hơi. Khi tầm nhìn còn mở, bạn thấy được cả tin đang tới lẫn những cơ hội khác đang hình thành quanh mình. Khi tầm nhìn hẹp lại chỉ còn một điểm chờ, bạn dễ bỏ lỡ mọi thứ khác đang mở ra ngay bên cạnh.',
        visualMotif: 'Hạt đậu ở đầu một cọng thân cao mảnh, nghiêng hẳn ra một vùng chân trời có các luồng ánh sáng vàng nhạt và hạt bụi phấn trôi xa như tín hiệu đang tới; nửa tán tơ phía trước xoè rộng như đang quét tầm nhìn, nửa phía sau khép gọn hơn.',
        profile: { domain: 'action', movement: 'scanning', storyStage: 'connection',
          need: 'cần nhìn xa hơn một kết quả cụ thể đang chờ',
          gift: 'thấy được cả tín hiệu xa và cơ hội gần cùng lúc',
          risk: 'chăm chăm một kết quả mà bỏ lỡ cơ hội khác đang mở quanh mình',
          action: 'ngẩng lên nhìn quanh và ghi ra một cơ hội khác đang có mà chưa để ý tới' } },
      {
        id: 25, tarot: 'Four of Wands', openName: 'Hạt về dưới cổng hoa mừng', closedName: 'Hạt đứng ngoài ngày vui chung',
        element: 'Fire', family: 'Wands',
        coreStory: 'Hạt này bay về ngay dưới một cổng hoa đang mừng lễ — hình ảnh của một dịp vui, một cột mốc đáng ăn mừng đang đến với bạn và những người xung quanh. Khi hạt bay thẳng vào giữa cổng hoa, nó cho phép mình tận hưởng trọn vẹn niềm vui đó. Khi nó cứ đứng mãi bên ngoài dù cổng đã mở, có một mâu thuẫn nhỏ trong gia đình hay nhóm bạn đang khiến niềm vui bị hoãn lại — cần nói ra điều đang vướng, đừng đợi nó tự qua.',
        visualMotif: 'Hạt bay ngang qua một vòm hoa nhỏ kết bằng những cành hoa dại sáng màu, đối xứng hai bên như một cổng chào; ánh sáng ấm tụ lại ngay dưới vòm cổng trong khi hạt còn cách vòm một khoảng ngắn, như vừa chuẩn bị bay vào.',
        profile: { domain: 'action', movement: 'arriving', storyStage: 'foundation',
          need: 'cần cho phép mình tận hưởng trọn vẹn một dịp vui đang đến',
          gift: 'đón nhận một cột mốc đáng ăn mừng cùng những người xung quanh',
          risk: 'để một mâu thuẫn nhỏ chưa nói ra làm hoãn lại niềm vui chung',
          action: 'nói ra điều đang vướng với người trong nhóm, đừng đợi nó tự qua' } },
      {
        id: 26, tarot: 'Five of Wands', openName: 'Hạt cọ mình giữa nhiều hạt khác', closedName: 'Hạt va nhau chẳng vì lý do',
        element: 'Fire', family: 'Wands',
        coreStory: 'Nhiều hạt đang cọ vào nhau trong cùng một luồng gió chật — hình ảnh của sự cạnh tranh hay bất đồng ý kiến đang xảy ra ở nơi làm việc hay trong nhóm. Khi những va chạm đó giúp mọi người nói rõ ý mình hơn, chúng không xấu, chỉ là một phần của việc cùng nhau tìm ra hướng đi. Khi các hạt cứ va vào nhau chẳng vì lý do rõ ràng, có thể ai đó — kể cả bạn — đang né một cuộc nói chuyện quan trọng hơn; cần chọn đúng việc đáng để tranh luận, bỏ qua phần còn lại.',
        visualMotif: 'Nhiều hạt bồ công anh cùng bay chen chúc trong một khoảng không gian hẹp, các tán tơ chạm và cọ vào nhau tạo thành những tia sáng nhỏ li ti tại điểm tiếp xúc; không hạt nào bị rối hay gãy, chỉ đang cọ sát qua nhau.',
        profile: { domain: 'action', movement: 'colliding', storyStage: 'friction',
          need: 'cần một không gian an toàn để bất đồng ý kiến được nói ra rõ ràng',
          gift: 'cạnh tranh hay tranh luận lành mạnh giúp mọi người rõ ràng hơn',
          risk: 'va chạm chẳng vì lý do rõ ràng vì đang né một cuộc nói chuyện quan trọng hơn',
          action: 'chọn đúng một việc đáng để tranh luận ngay bây giờ, để phần còn lại qua sau' } },
      {
        id: 27, tarot: 'Six of Wands', openName: 'Hạt được gió tung lên cao', closedName: 'Hạt cao mà lòng vẫn thấp',
        element: 'Fire', family: 'Wands',
        coreStory: 'Một luồng gió mạnh tung hạt này lên rất cao, như một sự công nhận đến đúng lúc — hình ảnh của một thành tích hay lời khen bạn xứng đáng nhận. Khi hạt để mình bay cao mà không cần giảm nhẹ niềm tự hào đó, sự công nhận trở thành trọn vẹn. Khi hạt bay cao mà lòng vẫn thấp, luôn cần thêm lời khen mới thấy mình đủ tốt, thành tích đó dù đạt được cũng chỉ để lại cảm giác trống trải — cần học cách tin vào chính mình trước, không chỉ chờ tán thưởng từ người khác.',
        visualMotif: 'Hạt được nâng lên rất cao trong khung hình, cao hơn hẳn vị trí thông thường của các hạt khác, một luồng gió sáng rõ đẩy nó từ phía dưới; nhưng ngay dưới lõi hạt có một vùng bóng mờ nhỏ, hơi lệch tông so với phần sáng rực phía trên.',
        profile: { domain: 'action', movement: 'lifting', storyStage: 'recovery',
          need: 'cần cho phép mình tự hào về một thành tích mà không giảm nhẹ nó',
          gift: 'được công nhận đúng lúc và xứng đáng cho công sức của mình',
          risk: 'luôn cần lời khen từ người khác mới thấy mình đủ tốt, dù đã đạt được thành tích',
          action: 'tự nói với chính mình một câu công nhận thành tích, không chờ ai nói trước' } },
      {
        id: 28, tarot: 'Seven of Wands', openName: 'Hạt đứng vững giữa hàng gió công', closedName: 'Hạt gồng mình chống mọi ngọn gió',
        element: 'Fire', family: 'Wands',
        coreStory: 'Hạt này đứng vững một mình giữa nhiều luồng gió công dồn tới từ mọi phía — hình ảnh của việc bảo vệ một quan điểm, một quyết định, hay một ranh giới quan trọng. Khi hạt chỉ giữ vững đúng vị trí cần giữ, điều đó là đúng, không phải cứng đầu. Khi nó gồng mình chống lại mọi ngọn gió, kể cả những góp ý không thật sự đe dọa gì, nó đang lãng phí sức vào những trận không đáng — cần chọn đúng trận nào thật sự đáng giữ, còn lại có thể bỏ qua.',
        visualMotif: 'Hạt đứng ở một vị trí cao hơn hẳn so với nhiều luồng gió nhỏ đang thổi dồn từ các hướng phía dưới, thân hạt nghiêng chống lại nhưng không gãy; một vài luồng gió ở rìa ngoài khung hình chỉ lướt nhẹ qua mà không thật sự chạm tới hạt.',
        profile: { domain: 'action', movement: 'defending', storyStage: 'patience',
          need: 'cần bảo vệ một ranh giới hay quan điểm quan trọng của mình',
          gift: 'giữ vững đúng vị trí cần giữ trước áp lực từ nhiều phía',
          risk: 'gồng mình chống lại cả những góp ý không thật sự đe dọa gì',
          action: 'chọn đúng một điều thật sự đáng giữ vững lúc này, bỏ qua phần còn lại' } },
      {
        id: 29, tarot: 'Eight of Wands', openName: 'Hạt lao theo chiều gió thuận', closedName: 'Hạt vướng lại giữa đường gió',
        element: 'Fire', family: 'Wands',
        coreStory: 'Hạt này đang lao rất nhanh theo một chiều gió thuận, gần như không chạm cản gì — hình ảnh của việc mọi thứ đang tiến triển nhanh và thuận lợi: một tin nhắn, một quyết định, một kế hoạch đang chuyển động tốt. Khi hạt để mình lao theo đà đó, mọi việc tới đích nhanh chóng. Khi nó vướng lại giữa đường gió, bị trì hoãn hơn mong đợi hoặc đang cố làm quá nhiều việc cùng lúc, cần chọn một việc để tiến trước, phần còn lại có thể chờ.',
        visualMotif: 'Hạt lao theo một đường chéo dài xuyên suốt gần hết khung hình với vệt sáng mảnh kéo dài phía sau như một tia lửa tốc độ; không có gì cản trên đường bay, tán tơ ép sát gọn theo hướng chuyển động.',
        profile: { domain: 'action', movement: 'racing', storyStage: 'momentum',
          need: 'cần để mọi việc đang thuận lợi tiếp tục chuyển động mà không cản nó lại',
          gift: 'mọi việc đang tiến triển nhanh và thuận lợi đúng lúc',
          risk: 'bị trì hoãn hơn mong đợi vì đang cố làm quá nhiều việc cùng lúc',
          action: 'chọn một việc để ưu tiên hoàn thành trước, để phần còn lại chờ' } },
      {
        id: 30, tarot: 'Nine of Wands', openName: 'Hạt đứng gác sau trận gió tan', closedName: 'Hạt thủ mình dù gió đã ngưng',
        element: 'Fire', family: 'Wands',
        coreStory: 'Hạt này vẫn đứng gác cẩn trọng dù trận gió dữ vừa qua đã tan hẳn — hình ảnh của việc đã trải qua nhiều khó khăn và vẫn đang cố gắng, gần tới đích. Khi sự cảnh giác đó phản ánh đúng kinh nghiệm đã có, nó là một phần hợp lý của hành trình. Khi hạt vẫn phòng thủ như thể trận gió còn ở đó dù nó đã ngưng từ lâu, cần cho phép mình thả lỏng một chút, xem thử có thật cần cảnh giác vậy không.',
        visualMotif: 'Hạt đứng nghiêng cảnh giác, một vài sợi tơ mang vết xước nhẹ như dấu tích còn lại từ những cơn gió đã qua; không khí xung quanh đã hoàn toàn tĩnh lặng, không còn vệt gió động nào, nhưng tư thế hạt vẫn như đang phòng bị.',
        profile: { domain: 'action', movement: 'defending', storyStage: 'threshold',
          need: 'cần được công nhận rằng mình đã cố gắng qua nhiều khó khăn và gần tới đích',
          gift: 'sự cảnh giác lúc này đến từ kinh nghiệm thật, không phải vô cớ',
          risk: 'vẫn phòng thủ như thể khó khăn còn ở đó dù nó đã qua từ lâu',
          action: 'thử thả lỏng một chút và xem có thật cần cảnh giác nhiều như vậy không' } },
      {
        id: 31, tarot: 'Ten of Wands', openName: 'Hạt mang trọn mùa về đích', closedName: 'Hạt gánh hết mà không chịu buông',
        element: 'Fire', family: 'Wands',
        coreStory: 'Hạt này đang mang trọn cả một mùa nặng trĩu về gần tới đích — hình ảnh của việc gần hoàn tất một trách nhiệm lớn: công việc, một dự án, một cam kết. Khi hạt biết sức nặng này có ý nghĩa và sắp về tới nơi, gánh nặng đó xứng đáng. Khi nó ôm quá nhiều việc một mình, biến khả năng của mình thành gánh nặng cho chính mình, thì nhờ ai đó giúp không phải là thất bại.',
        visualMotif: 'Hạt gập nhẹ dưới sức nặng của nhiều bó nhỏ vật liệu thực vật buộc quanh thân, tư thế hơi khom về phía trước như đang gắng bước những bước cuối; đích đến hiện lờ mờ phía xa dưới dạng một quầng sáng ấm nhỏ.',
        profile: { domain: 'action', movement: 'carrying', storyStage: 'culmination',
          need: 'cần biết rằng sức nặng mình đang mang có ý nghĩa và sắp về tới đích',
          gift: 'gần hoàn tất một trách nhiệm lớn bằng chính sức của mình',
          risk: 'ôm quá nhiều việc một mình, biến khả năng của mình thành gánh nặng cho chính mình',
          action: 'nhờ một người cụ thể giúp một phần việc, thay vì tự ôm hết' } },
      {
        id: 32, tarot: 'Page of Wands', openName: 'Người đưa tin mang lửa mới', closedName: 'Người cầm lửa mà chưa dám châm',
        element: 'Fire', family: 'Wands',
        coreStory: 'Người này mang theo một ngọn lửa mới, còn chưa biết nó sẽ cháy thành gì — hình ảnh của một sự tò mò, một ý tưởng mới, hay một phiên bản khác của bạn đang muốn được thử. Khi người đó để ngọn lửa bắt đầu, không cần biết trước nó dẫn tới đâu, sự tò mò ấy được sống trọn. Khi họ cứ cầm lửa mà chưa dám châm, ngại vì sợ mình chưa đủ giỏi hay chưa đủ sẵn sàng, cần nhớ rằng không ai từng sẵn sàng trước khi bắt đầu cả.',
        visualMotif: 'Một hạt nhỏ hơn, trẻ hơn về hình dáng, cầm theo một đốm lửa nhỏ lơ lửng ngay phía trước mình như một ngọn đuốc chưa châm hẳn; tư thế nghiêng người tò mò về phía trước, một nhánh tơ đưa ra như đang chuẩn bị đưa lửa đi xa hơn.',
        profile: { domain: 'action', movement: 'calling', storyStage: 'curiosity',
          need: 'cần được phép tò mò và thử một ý tưởng mới mà không cần biết trước kết quả',
          gift: 'một sự tò mò hay ý tưởng mới đang muốn được sống thử',
          risk: 'cầm lửa mà chưa dám châm vì sợ mình chưa đủ giỏi hay chưa đủ sẵn sàng',
          action: 'bắt đầu thử phần nhỏ nhất của ý tưởng đó ngay hôm nay, dù chưa thấy chắc chắn' } },
      {
        id: 33, tarot: 'Knight of Wands', openName: 'Kỵ sĩ phi qua đồng gió', closedName: 'Kỵ sĩ đốt đường mà chưa tới đâu',
        element: 'Fire', family: 'Wands',
        coreStory: 'Một kỵ sĩ phi rất nhanh qua một cánh đồng gió lớn — hình ảnh của lúc cần hành động nhanh và dứt khoát, không nghĩ quá lâu trước khi bước vì cơ hội này cần tốc độ. Khi tốc độ đó thật sự đưa người kỵ sĩ tới một đích cụ thể, hành động dứt khoát là đúng lúc. Khi họ dồn rất nhiều năng lượng vào một việc mà chưa thật sự đi tới đâu, cần chậm một nhịp để chắc mình đang tiến tới, không phải đang chạy trốn.',
        visualMotif: 'Một hình dáng hạt bồ công anh được nhân hoá — đầu tơ xù cùng hai nhánh tơ mảnh như tay chân, không có ngựa hay vật cưỡi riêng biệt — nghiêng mình lao nhanh về phía trước trong một sải bước phi nhanh, để lại một vệt lửa mảnh phía sau như bụi đường cháy; phía trước mặt, đường chân trời vẫn còn mờ, chưa rõ điểm đến.',
        profile: { domain: 'action', movement: 'racing', storyStage: 'pursuit',
          need: 'cần hành động nhanh và dứt khoát khi cơ hội thật sự cần tốc độ',
          gift: 'đủ quyết đoán để hành động ngay khi cơ hội xuất hiện',
          risk: 'dồn rất nhiều năng lượng vào một việc mà chưa thật sự đi tới đâu',
          action: 'chậm một nhịp để chắc mình đang tiến tới, không phải đang chạy trốn điều gì' } },
      {
        id: 34, tarot: 'Queen of Wands', openName: 'Người giữ lửa ấm cả khu vườn', closedName: 'Người tỏa sáng mà tự cạn mình',
        element: 'Fire', family: 'Wands',
        coreStory: 'Người này giữ một ngọn lửa đủ ấm để sưởi cho cả khu vườn xung quanh — hình ảnh của một sự tự tin thật, có sức hút tự nhiên với người khác. Khi ngọn lửa đó được nuôi đều, người này tỏa sáng mà không cần thu nhỏ lại để ai thấy dễ chịu hơn. Khi họ phải luôn tỏ ra rực rỡ, ổn định trước mặt người khác đến mức tự kiệt sức, cần cho phép mình có một ngày không cần tỏa sáng cũng không sao.',
        visualMotif: 'Hạt trung tâm toả ra một quầng lửa ấm bao phủ nhẹ cả một vùng thực vật xung quanh trong khung hình, ánh sáng lan đều ra ngoài; nhưng ngay tại lõi phát sáng có một điểm nhỏ hơi mờ đi so với phần toả sáng xung quanh, như đang cạn dần từ bên trong.',
        profile: { domain: 'action', movement: 'radiating', storyStage: 'nurture',
          need: 'cần được là chính mình rực rỡ mà không phải thu nhỏ lại vì người khác',
          gift: 'sự tự tin thật có sức hút tự nhiên, sưởi ấm cho cả những người xung quanh',
          risk: 'phải luôn tỏ ra rực rỡ, ổn định trước mặt người khác đến mức tự kiệt sức',
          action: 'cho phép mình có một ngày không cần tỏa sáng, chỉ cần là mình' } },
      {
        id: 35, tarot: 'King of Wands', openName: 'Người cầm đuốc dẫn đường gió', closedName: 'Người giữ đuốc mà chắn lối người',
        element: 'Fire', family: 'Wands',
        coreStory: 'Người này cầm một ngọn đuốc đủ sáng để dẫn đường cho cả luồng gió phía sau — hình ảnh của một tầm nhìn đủ rõ để dẫn dắt người khác, dám chịu trách nhiệm cho điều mình tin là đúng. Khi ngọn đuốc soi đường mà vẫn để người khác tự bước, đó là lãnh đạo thật. Khi họ giữ đuốc theo cách chắn luôn lối đi của người khác, áp đặt cách nghĩ của mình hoặc hứa nhiều hơn có thể giữ, cần nhớ rằng lãnh đạo thật không cần phải độc đoán.',
        visualMotif: 'Một hình dáng cầm một ngọn đuốc lớn giơ cao phía trước, ánh sáng từ đuốc chiếu thành một vệt đường rõ ràng phía trước mặt; phía sau, nhiều luồng gió nhỏ khác đang theo sau vệt sáng đó ở một khoảng cách vừa đủ, không bị che khuất.',
        profile: { domain: 'action', movement: 'guiding', storyStage: 'mastery',
          need: 'cần dám chịu trách nhiệm dẫn dắt người khác theo điều mình tin là đúng',
          gift: 'tầm nhìn đủ rõ để soi đường mà vẫn để người khác tự bước đi',
          risk: 'áp đặt cách nghĩ của mình lên người khác hoặc hứa nhiều hơn mình có thể giữ',
          action: 'soi đường bằng ví dụ cụ thể của mình, thay vì áp đặt cách nghĩ lên người khác' } }
    ]
  };

  // Khối Nước (Cups) — ĐỦ 14/14, đã hoàn tất theo trình tự rank Ace→King.
  suits.Cups = [
    {
      id: 36, tarot: 'Ace of Cups', openName: 'Hạt hứng giọt sương đầu tiên', closedName: 'Hạt khô vì tự chối giọt sương',
      element: 'Water', family: 'Cups',
      coreStory: 'Hạt này vừa hứng được giọt sương đầu tiên rơi xuống lõi mình — hình ảnh của việc trái tim đang mở ra với một tình cảm, một mối quan hệ, hay một cảm xúc mới. Khi hạt để mình nhận giọt sương đó, nó cho phép cảm xúc chảy vào, không chỉ chảy ra. Khi nó tự khô đi vì chối từ giọt sương đang rơi xuống, cho đi nhiều mà không dám nhận lại gì, cần nhớ rằng nhận một điều tốt không làm mình yếu đi.',
      visualMotif: 'Một giọt sương lớn, trong suốt, vừa chạm và đọng lại ngay tại lõi hạt, gợn sóng nhẹ như vừa rơi xuống; phần tán tơ phía trên hơi cúi xuống đón giọt sương thay vì xoè ngang như các hạt khác.',
      profile: { domain: 'love', movement: 'opening', storyStage: 'spark',
        need: 'cần cho phép mình nhận một tình cảm hay cảm xúc mới, không chỉ cho đi',
        gift: 'trái tim đang mở ra với một cảm xúc hay mối quan hệ mới, thật và tự nhiên',
        risk: 'tự chặn cảm xúc của chính mình, cho đi nhiều mà không dám nhận lại gì',
        action: 'nhận một điều tốt ai đó đang trao cho mình hôm nay, đừng vội từ chối' } },
    {
      id: 37, tarot: 'Two of Cups', openName: 'Hai hạt chung một giọt sương', closedName: 'Hai hạt lệch nhịp rơi',
      element: 'Water', family: 'Cups',
      coreStory: 'Hai hạt đang cùng chia một giọt sương duy nhất, nhịp rơi gần như khớp nhau — hình ảnh của một sự kết nối chân thành, ngang hàng đang diễn ra giữa bạn và một người khác. Khi cả hai cùng giữ đúng nhịp tự nhiên của mình, kết nối đó cứ thế mà tiếp tục. Khi nhịp giữa hai bên lệch nhau, có thể một người đang nhường nhịn quá nhiều để giữ mối quan hệ, cần nhớ rằng kết nối thật không cần một người phải nhỏ lại.',
      visualMotif: 'Hai hạt bay sát nhau, cùng chung một giọt sương lớn treo giữa hai lõi hạt như một cầu nối trong suốt; nhịp rung của hai tán tơ gần như đồng bộ, chỉ lệch nhau một khoảnh khắc rất nhỏ.',
      profile: { domain: 'love', movement: 'sharing', storyStage: 'choice',
        need: 'cần một kết nối ngang hàng, nơi cả hai bên đều giữ đúng nhịp của mình',
        gift: 'một sự kết nối chân thành, ngang hàng đang diễn ra tự nhiên',
        risk: 'nhường nhịn quá nhiều để giữ một mối quan hệ, khiến nhịp hai bên lệch nhau',
        action: 'nói thật với người kia về một điều mình đang nhường quá nhiều' } },
    {
      id: 38, tarot: 'Three of Cups', openName: 'Hạt cùng hạt mừng dưới mưa', closedName: 'Hạt vui mà vẫn lạc giữa đàn',
      element: 'Water', family: 'Cups',
      coreStory: 'Nhiều hạt đang cùng nhau mừng dưới một cơn mưa nhẹ — hình ảnh của việc dành thời gian cho bạn bè, ăn mừng cùng nhau, để niềm vui từ những người xung quanh thật sự nâng đỡ mình. Khi hạt hoà vào giữa những người bạn thật, niềm vui đó chạm được tới nó. Khi nó vẫn thấy lạc lõng giữa một nhóm đông vui, hoặc mải chú ý những điều không quan trọng thay vì kết nối thật, cần tìm lại đúng người mình thật sự muốn ở cạnh.',
      visualMotif: 'Nhiều hạt cùng bay quây quần trong một khoảng không gian nhỏ dưới những giọt mưa lấp lánh rơi đều, tạo thành một vòng tròn không chính thức; một hạt trong nhóm hơi lệch ra ngoài vòng, khoảng cách nhỏ nhưng rõ.',
      profile: { domain: 'love', movement: 'gathering', storyStage: 'connection',
        need: 'cần dành thời gian thật với những người mang lại niềm vui thật cho mình',
        gift: 'niềm vui từ bạn bè xung quanh đang thật sự nâng đỡ mình',
        risk: 'thấy lạc lõng giữa một nhóm đông vui vì đang chú ý những điều không quan trọng',
        action: 'tìm và nhắn cho đúng người mình thật sự muốn ở cạnh lúc này' } },
    {
      id: 39, tarot: 'Four of Cups', openName: 'Hạt nhận ra giọt mưa đang mời', closedName: 'Hạt ngoảnh mặt trước giọt mưa mời',
      element: 'Water', family: 'Cups',
      coreStory: 'Có một giọt mưa mới đang mời gọi ngay trước mặt hạt này, dù trước đây nó từng lướt qua không để ý — hình ảnh của một cơ hội hay lời mời bạn từng bỏ qua. Khi hạt bắt đầu để ý và cho giọt mưa đó một cơ hội nhìn lại, cánh cửa mở ra. Khi nó ngoảnh mặt trước giọt mưa đang mời vì nó không đến đúng như mong đợi, cần nhớ rằng một cơ hội tốt không cần đến đúng hình dạng mới đáng nhận.',
      visualMotif: 'Một giọt mưa mới, sáng và trong, đang lơ lửng ngay trước mặt hạt, gần đến mức gần chạm vào tán tơ; nhưng hạt hơi nghiêng đầu ra một chút, chưa hoàn toàn quay về phía giọt mưa đó.',
      profile: { domain: 'love', movement: 'noticing', storyStage: 'foundation',
        need: 'cần để ý một cơ hội hay lời mời đang thật sự ở ngay trước mặt mình',
        gift: 'bắt đầu nhận ra và cho một cơ hội từng bỏ qua một cái nhìn mới',
        risk: 'thờ ơ với một điều tốt đang thật sự chờ vì nó không đến đúng như mong đợi',
        action: 'quay lại nhìn kỹ một lời mời hay cơ hội mình vừa bỏ qua gần đây' } },
    {
      id: 40, tarot: 'Five of Cups', openName: 'Hạt khóc thật với giọt đã mất', closedName: 'Hạt mãi nhìn giọt đã rơi',
      element: 'Water', family: 'Cups',
      coreStory: 'Hạt này đang khóc thật với một giọt sương đã rơi mất, không cố che giấu nỗi buồn — hình ảnh của việc cho phép mình buồn thật với một điều đã mất: một mối quan hệ, một cơ hội. Khi hạt thành thật với nỗi buồn đó, đó là bước đầu để vượt qua nó. Khi nó cứ mãi nhìn về giọt đã rơi mà quên ngẩng lên, mắc kẹt trong tiếc nuối, cần nhớ rằng phần còn lại của khu vườn vẫn ở đó.',
      visualMotif: 'Hạt cúi đầu nhìn xuống một vệt nước đã khô loang trên mặt đất bên dưới, nơi từng có một giọt sương lớn; phía sau hạt, một vài giọt sương khác vẫn còn nguyên và sáng, nhưng nằm ngoài tầm nhìn hiện tại của nó.',
      profile: { domain: 'love', movement: 'releasing', storyStage: 'friction',
        need: 'cần được phép buồn thật với một điều đã mất, không phải vội vượt qua ngay',
        gift: 'thành thật với nỗi buồn là bước đầu để thật sự vượt qua nó',
        risk: 'mắc kẹt trong tiếc nuối về điều đã mất, quên nhìn những gì mình vẫn còn',
        action: 'ngẩng lên nhìn một điều mình vẫn còn, dù chỉ trong chốc lát' } },
    {
      id: 41, tarot: 'Six of Cups', openName: 'Hạt nhớ về cơn mưa đầu đời', closedName: 'Hạt mắc lại trong cơn mưa cũ',
      element: 'Water', family: 'Cups',
      coreStory: 'Hạt này nhớ về cơn mưa đầu đời của mình, một kỷ niệm đẹp đang quay lại đúng lúc cần — hình ảnh của một người quen cũ hay ký ức đẹp trở lại. Khi hạt đón nhận kỷ niệm đó nhẹ nhàng rồi tiếp tục bay, nó được sưởi ấm mà không mắc kẹt. Khi nó cứ mắc lại trong cơn mưa cũ, sống trong ký ức nhiều hơn sống với hiện tại, cần nhớ rằng kỷ niệm đẹp không cần phải thay thế cho cuộc sống bây giờ.',
      visualMotif: 'Hạt bay giữa những giọt mưa có ánh sáng ấm hoài cổ khác hẳn tông lạnh của mưa hiện tại xung quanh, như một vệt ký ức chồng lên khung cảnh thật; một phần tán tơ vẫn hướng về phía sau, về phía vệt sáng ấm đó.',
      profile: { domain: 'love', movement: 'remembering', storyStage: 'recovery',
        need: 'cần được ôm lấy một kỷ niệm đẹp mà không phải sống mãi trong đó',
        gift: 'một kỷ niệm đẹp hay người quen cũ quay lại đúng lúc mình cần',
        risk: 'sống trong ký ức về một thời đã qua nhiều hơn là sống với hiện tại',
        action: 'đón nhận kỷ niệm đó, rồi quay mặt về phía hiện tại đang chờ' } },
    {
      id: 42, tarot: 'Seven of Cups', openName: 'Hạt mơ giữa trăm giọt mây', closedName: 'Hạt lạc giữa quá nhiều giọt mơ',
      element: 'Water', family: 'Cups',
      coreStory: 'Hạt này đang mơ giữa hàng trăm giọt mây, mỗi giọt là một khả năng khác nhau đang mở ra — hình ảnh của việc có nhiều lựa chọn trước mắt. Khi hạt cho mình thời gian tưởng tượng rồi chọn một giọt cụ thể để bay tới, những khả năng đó trở thành thật. Khi nó cứ lạc giữa quá nhiều giọt mơ, thích tưởng tượng hơn là bắt tay làm thật, cần chọn một điều, thử nó thật, thay vì cân nhắc mãi.',
      visualMotif: 'Hạt lơ lửng giữa vô số giọt mây mờ ảo trôi nổi khắp khung hình, mỗi giọt phản chiếu một màu ánh sáng hơi khác nhau như từng khả năng riêng; hạt chưa nghiêng hẳn về phía giọt nào, vẫn đang lơ lửng giữa tất cả.',
      profile: { domain: 'love', movement: 'choosing', storyStage: 'patience',
        need: 'cần thời gian tưởng tượng nhưng cũng cần chọn một điều cụ thể để thử',
        gift: 'nhiều lựa chọn và khả năng đang mở ra trước mắt để cân nhắc',
        risk: 'lạc giữa quá nhiều giọt mơ, thích tưởng tượng hơn là bắt tay làm thật',
        action: 'chọn một khả năng cụ thể trong số đó và thử nó thật, dù nhỏ' } },
    {
      id: 43, tarot: 'Eight of Cups', openName: 'Hạt rời vũng nước đã cạn nghĩa', closedName: 'Hạt quay lại vũng nước đã cạn',
      element: 'Water', family: 'Cups',
      coreStory: 'Hạt này đứng ở mép một vũng nước đã cạn nghĩa — nơi từng đủ để nuôi nó nhưng giờ không còn đủ, dù nhìn ngoài vẫn còn nước. Đó là hình ảnh của một công việc, một mối quan hệ, hay một thói quen bạn biết đã hết vừa với mình. Khi hạt thật sự quay lưng bước đi dù chưa hiểu hết mọi lý do, đó là can đảm chứ không phải bỏ cuộc. Khi nó cứ quay đầu lại chỗ cũ vì sợ chỗ mới, nó mắc kẹt ở một nơi đã không còn đủ từ lâu.',
      visualMotif: 'Hạt ở mép một vũng nước nhỏ tối màu phản chiếu ánh sáng yếu, viền đất quanh vũng đã khô nứt nhẹ; thân hạt nghiêng giữa chừng một cú quay người, một bên tán tơ còn nặng ẩm hướng về vũng nước, bên còn lại đã xoè khô nhẹ như vừa bắt được gió mới.',
      profile: { domain: 'love', movement: 'releasing', storyStage: 'momentum',
        need: 'cần được phép rời đi dù chưa hiểu hết mọi lý do',
        gift: 'đủ can đảm bước đi trước khi có sự chắc chắn tuyệt đối',
        risk: 'quay lại điều cũ vì sợ cái chưa biết, dù biết nó không còn đủ',
        action: 'gọi tên một điều cụ thể đã không còn phù hợp và định ngày để bắt đầu buông' } },
    {
      id: 44, tarot: 'Nine of Cups', openName: 'Hạt đủ đầy sau cơn mưa dài', closedName: 'Hạt uống mãi mà không thấy no',
      element: 'Water', family: 'Cups',
      coreStory: 'Hạt này đã đủ đầy sau một cơn mưa dài, gần chạm tới một điều mình từng mong ước — hình ảnh của việc ở gần một điều mình mong muốn. Khi hạt cho phép mình cảm thấy đủ mà không cần thêm nữa mới hài lòng, sự đủ đầy đó là thật. Khi nó cứ uống mãi mà không thấy no, liên tục tìm thêm để lấp một khoảng trống cảm xúc mà không thứ nào lấp được, khoảng trống đó có thể đang cần một điều khác, không phải thêm nữa.',
      visualMotif: 'Hạt được bao quanh bởi nhiều giọt sương lấp lánh no đầy bám quanh tán tơ, ánh sáng ấm phản chiếu qua từng giọt; nhưng có một giọt cuối cùng vẫn đang được hạt cố vươn tới thêm, dù xung quanh đã đủ đầy.',
      profile: { domain: 'love', movement: 'savoring', storyStage: 'momentum',
        need: 'cần cho phép mình cảm thấy đủ, không cần thêm nữa mới hài lòng',
        gift: 'đang ở gần một điều mình từng mong ước, đủ đầy và thật',
        risk: 'liên tục tìm thêm để lấp một khoảng trống cảm xúc mà không thứ nào lấp được',
        action: 'dừng lại và gọi tên điều mình đang thật sự cần, thay vì tìm thêm nữa' } },
    {
      id: 45, tarot: 'Ten of Cups', openName: 'Hạt thấy cầu vồng trên cả khu vườn', closedName: 'Hạt giấu vết nứt dưới cầu vồng',
      element: 'Water', family: 'Cups',
      coreStory: 'Hạt này thấy một cầu vồng trải trên cả khu vườn, một sự hoà hợp thật sự với gia đình hay người thân xung quanh — hình ảnh của niềm vui có thật, không cần nghi ngờ. Khi hạt để mình tin vào cầu vồng đó, niềm vui trở nên trọn vẹn. Khi nó giấu một vết nứt dưới cầu vồng, cố giữ hình ảnh hoàn hảo trước mặt người khác trong khi vấn đề thật vẫn còn đó, cần nhớ rằng hạnh phúc không cần giống nhau giữa mọi người mới là thật.',
      visualMotif: 'Một dải cầu vồng mảnh, nhẹ, trải cong phía trên toàn bộ khu vườn trong khung hình, ánh sáng ấm áp bao trùm; nhưng ngay dưới lớp đất gần chân hạt, có một đường nứt rất nhỏ, gần như bị che khuất bởi ánh sáng cầu vồng phía trên.',
      profile: { domain: 'love', movement: 'integrating', storyStage: 'threshold',
        need: 'cần tin vào một sự hoà hợp thật đang có với gia đình hay người thân',
        gift: 'một niềm vui và sự hoà hợp thật sự đang ở quanh mình, không cần nghi ngờ',
        risk: 'giữ hình ảnh một gia đình hoàn hảo trong khi vấn đề thật vẫn còn đó',
        action: 'nói thật về một vết nứt nhỏ đang bị giấu dưới lớp hình ảnh hoàn hảo' } },
    {
      id: 46, tarot: 'Page of Cups', openName: 'Người nghe được tiếng nước thì thầm', closedName: 'Người sợ nói ra điều nước thầm',
      element: 'Water', family: 'Cups',
      coreStory: 'Người này nghe được tiếng nước thì thầm điều gì đó về cảm xúc của chính mình hoặc người khác — còn non nhưng đúng. Khi họ tin vào điều mình nghe thấy dù chưa giải thích được bằng lời, cảm nhận đó được sống. Khi họ sợ nói ra điều nước thầm vì ngại nó chưa đủ chín chắn hay hợp lý, cần nhớ rằng nói ra không cần phải hoàn hảo trước.',
      visualMotif: 'Một hình dáng nhỏ, trẻ hơn, nghiêng tai lại gần một dòng nước mảnh đang chảy quanh chân mình, như đang cố nghe rõ một điều thì thầm; miệng hơi hé mở như chuẩn bị nói ra điều vừa nghe được.',
      profile: { domain: 'love', movement: 'listening', storyStage: 'curiosity',
        need: 'cần tin vào một cảm nhận về cảm xúc dù chưa giải thích được bằng lời',
        gift: 'cảm nhận được điều gì đó thật về cảm xúc của mình hay người khác, còn non nhưng đúng',
        risk: 'ngại nói ra một cảm nhận vì sợ nó chưa đủ chín chắn hay hợp lý',
        action: 'nói ra điều mình đang cảm nhận, dù chưa chắc nó đã đủ rõ ràng' } },
    {
      id: 47, tarot: 'Knight of Cups', openName: 'Kỵ sĩ mang mưa đến hẹn', closedName: 'Kỵ sĩ hứa mưa mà trời vẫn hạn',
      element: 'Water', family: 'Cups',
      coreStory: 'Một kỵ sĩ mang theo cơn mưa đến đúng buổi hẹn — hình ảnh của một lời mời chân thành, một cơ hội tình cảm đang đến. Khi cơn mưa họ mang tới thật sự rơi xuống, lời mời đó đáng để theo. Khi họ hứa mưa mà trời vẫn hạn, đưa ra lời hứa bằng cảm xúc nhiều hơn hành động thật, cần nhìn vào điều người đó đã làm, không chỉ điều họ đã nói.',
      visualMotif: 'Một hình dáng hạt bồ công anh được nhân hoá — đầu tơ xù cùng hai nhánh tơ mảnh như tay chân, không có ngựa hay vật cưỡi riêng biệt — bước đi với nhịp điềm tĩnh, chủ động, mang theo một vệt mưa nhẹ phía trên đầu như một chiếc lọng nước di động; phía trước mặt, mặt đất vẫn còn khô, chưa chạm được giọt mưa nào từ vệt đó.',
      profile: { domain: 'love', movement: 'arriving', storyStage: 'pursuit',
        need: 'cần một lời mời hay cơ hội tình cảm đi kèm hành động thật, không chỉ lời nói',
        gift: 'một lời mời chân thành, một cơ hội tình cảm đang đến đúng lúc',
        risk: 'đưa ra lời hứa bằng cảm xúc nhiều hơn là bằng hành động thật sự',
        action: 'nhìn vào điều người đó đã thật sự làm, không chỉ điều họ đã nói' } },
    {
      id: 48, tarot: 'Queen of Cups', openName: 'Người giữ hồ nước cho cả khu vườn', closedName: 'Người để hồ mình tràn vì nước người',
      element: 'Water', family: 'Cups',
      coreStory: 'Người này giữ một hồ nước đủ sâu để chứa cho cả khu vườn — hình ảnh của khả năng thấu hiểu cảm xúc đang giúp ích rất nhiều cho người xung quanh. Khi hồ nước đó có bờ vững, người này chứa được cảm xúc của người khác mà không mất mình. Khi hồ để tràn vì nước của người khác, ngập trong cảm xúc hay vấn đề của người khác đến mức quên mất ranh giới bản thân, cần nhớ rằng quan tâm người khác không có nghĩa là gánh hết nỗi buồn của họ.',
      visualMotif: 'Hạt trung tâm đứng cạnh một mặt hồ nhỏ phẳng lặng phản chiếu cả khu vườn xung quanh, bờ hồ được viền rõ và vững; nhưng ở một góc, mực nước hồ đang dâng cao gần sát bờ, như sắp tràn ra ngoài.',
      profile: { domain: 'love', movement: 'tending', storyStage: 'nurture',
        need: 'cần đủ vững để chứa được cảm xúc của người khác mà không mất chính mình',
        gift: 'khả năng thấu hiểu cảm xúc đang giúp ích rất nhiều cho người xung quanh',
        risk: 'ngập trong cảm xúc hay vấn đề của người khác đến mức quên mất ranh giới bản thân',
        action: 'đặt lại một ranh giới cụ thể trước khi tiếp tục chứa đựng cảm xúc của người khác' } },
    {
      id: 49, tarot: 'King of Cups', openName: 'Người ngồi yên giữa cơn mưa lớn', closedName: 'Người khoá cơn mưa trong lòng mình',
      element: 'Water', family: 'Cups',
      coreStory: 'Người này ngồi yên giữa một cơn mưa lớn mà không hề nao núng — hình ảnh của việc giữ được bình tĩnh về cảm xúc ngay giữa hoàn cảnh khó khăn. Khi họ quan tâm người khác mà vẫn giữ ranh giới riêng, đó là sức mạnh thật. Khi họ khoá cơn mưa trong lòng mình, nén cảm xúc lại và giữ khoảng cách bằng vẻ ngoài điềm tĩnh thay vì thật sự gần gũi, cần nhớ rằng cảm xúc bị giấu đi vẫn còn đó, chỉ là không ai thấy được.',
      visualMotif: 'Hạt trung tâm ngồi vững giữa một trận mưa dày đặc đổ quanh khắp khung hình mà không hề lung lay, tư thế điềm tĩnh rõ rệt; nhưng ngay bên trong lõi hạt có một lớp ánh sáng bị nén chặt lại, không toả ra ngoài như các hạt khác.',
      profile: { domain: 'love', movement: 'holding', storyStage: 'mastery',
        need: 'cần giữ bình tĩnh về cảm xúc ngay giữa một hoàn cảnh khó khăn',
        gift: 'biết quan tâm người khác mà vẫn giữ ranh giới riêng của mình, đó là sức mạnh thật',
        risk: 'nén cảm xúc của mình lại, giữ khoảng cách bằng vẻ ngoài điềm tĩnh thay vì thật sự gần gũi',
        action: 'chia sẻ một cảm xúc thật của mình với một người thân cận, thay vì giữ kín' } }
  ];

  // Khối Khí (Swords) — ĐỦ 14/14, đã hoàn tất theo trình tự rank Ace→King.
  suits.Swords = [
    {
      id: 50, tarot: 'Ace of Swords', openName: 'Hạt được gió cắt rõ đường bay', closedName: 'Hạt đau vì lưỡi gió quá sắc',
      element: 'Air', family: 'Swords',
      coreStory: 'Một luồng gió sắc vừa cắt qua, làm rõ hẳn đường bay của hạt này — hình ảnh của một sự thật hay một quyết định đang trở nên rõ ràng với bạn. Khi hạt để luồng gió đó cắt qua và tin vào điều mình vừa nhận ra, dù hơi khó nghe, sự rõ ràng ấy là món quà. Khi lưỡi gió sắc kia gây đau nhiều hơn cần thiết — một lời nói làm ai đó tổn thương, hoặc một điều bạn biết rõ nhưng chưa dám nói ra — cần nhớ rằng sự thật không cần phải nói theo cách gây tổn thương.',
      visualMotif: 'Một luồng ánh sáng mảnh, sắc như lưỡi dao, cắt ngang qua chính giữa khung hình ngay phía trên lõi hạt, để lại một đường viền sáng rõ nét hiếm thấy ở các hạt khác; tán tơ phía sau đường cắt đó rõ nét và gọn gàng hơn hẳn phần chưa được cắt qua.',
      profile: { domain: 'decision', movement: 'cutting', storyStage: 'spark',
        need: 'cần tin vào một sự thật hay nhận thức mới vừa trở nên rõ ràng',
        gift: 'một sự thật hay quyết định đang trở nên rõ ràng, đáng để tin',
        risk: 'nói ra sự thật theo cách gây tổn thương nhiều hơn cần thiết',
        action: 'nói ra điều mình biết rõ, nhưng chọn cách nói không làm ai tổn thương thêm' } },
    {
      id: 51, tarot: 'Two of Swords', openName: 'Hạt lặng giữa hai luồng gió', closedName: 'Hạt bịt mắt giữa hai luồng gió',
      element: 'Air', family: 'Swords',
      coreStory: 'Hạt này đứng lặng giữa hai luồng gió ngược chiều, chưa nghiêng hẳn về bên nào — hình ảnh của việc tạm chưa quyết định giữa hai lựa chọn, và điều đó ổn. Khi hạt cho phép mình tĩnh lại một khoảng trước khi chọn, đó là chuẩn bị cần thiết. Khi nó bịt mắt giữa hai luồng gió, né tránh nhìn thẳng vào thông tin thật vì sợ phải quyết định, cần nhớ rằng sự bế tắc thường vì thiếu thông tin, không phải vì thiếu can đảm.',
      visualMotif: 'Hạt lơ lửng đứng yên chính giữa hai luồng gió ánh sáng đối xứng thổi từ hai phía ngược nhau, cả hai luồng đều mờ nhạt như nhau; tán tơ hạt khép gọn lại, không nghiêng về bên nào.',
      profile: { domain: 'decision', movement: 'holding', storyStage: 'choice',
        need: 'cần một khoảng lặng để tĩnh lại trước khi chọn giữa hai điều',
        gift: 'biết tạm dừng quyết định khi chưa đủ rõ ràng, thay vì vội chọn',
        risk: 'né tránh nhìn thẳng vào thông tin thật vì sợ phải quyết định',
        action: 'tìm thêm một thông tin cụ thể còn thiếu trước khi chọn tiếp' } },
    {
      id: 52, tarot: 'Three of Swords', openName: 'Hạt để gió xuyên qua nỗi đau thật', closedName: 'Hạt giữ mãi vết gió đã cắt',
      element: 'Air', family: 'Swords',
      coreStory: 'Hạt này để một luồng gió xuyên thẳng qua mình, chạm đúng vào nỗi đau thật — hình ảnh của việc cho phép mình cảm nhận trọn vẹn một nỗi đau: một chia tay, một lời nói làm tổn thương. Khi hạt để gió xuyên qua và cảm nhận trọn vẹn, đó là bước đầu để lành lại. Khi nó giữ mãi vết gió đã cắt, chưa từng gọi tên vết thương cũ ra để thật sự bắt đầu chữa lành, cần nói nó ra, dù chỉ với chính mình.',
      visualMotif: 'Một luồng gió mảnh, sắc, xuyên thẳng qua chính giữa lõi hạt để lại một vệt sáng mờ chạy dọc thân, không phá vỡ cấu trúc hạt nhưng để lại dấu vết rõ; vài giọt sương nhỏ đọng ngay tại điểm gió xuyên qua như giọt nước mắt.',
      profile: { domain: 'decision', movement: 'releasing', storyStage: 'connection',
        need: 'cần được phép cảm nhận trọn vẹn một nỗi đau thật, không né tránh nó',
        gift: 'cho phép mình cảm nhận nỗi đau trọn vẹn là bước đầu để lành lại',
        risk: 'giữ một vết thương cũ mà chưa từng gọi tên nó ra để thật sự chữa lành',
        action: 'nói ra vết thương đó, dù chỉ với chính mình, thành lời cụ thể' } },
    {
      id: 53, tarot: 'Four of Swords', openName: 'Hạt nằm yên chờ gió lặng', closedName: 'Hạt không yên dù gió đã ngưng',
      element: 'Air', family: 'Swords',
      coreStory: 'Hạt này nằm yên, chờ cho một cơn gió lớn lặng hẳn — hình ảnh của việc cần nghỉ ngơi sau một giai đoạn căng thẳng, và nghỉ ngơi lúc này không phải là yếu đuối. Khi hạt cho phép mình thật sự nằm yên, sức lực dần được phục hồi. Khi nó không yên dù gió đã ngưng từ lâu, kiệt sức nhưng vẫn tự trách bản thân ngay cả lúc dừng lại, cần nhớ rằng nghỉ ngơi không cần phải "xứng đáng" mới được phép.',
      visualMotif: 'Hạt nằm ngang, bất động, giữa một khoảng không hoàn toàn tĩnh lặng không còn vệt gió nào; tán tơ khép nhẹ và đều, tư thế thư giãn rõ rệt khác hẳn dáng đứng thẳng thường thấy của các hạt khác.',
      profile: { domain: 'decision', movement: 'resting', storyStage: 'foundation',
        need: 'cần nghỉ ngơi thật sự sau một giai đoạn căng thẳng, không phải yếu đuối',
        gift: 'cho phép mình nghỉ ngơi trọn vẹn để phục hồi sức lực',
        risk: 'kiệt sức nhưng không cho phép mình thật sự nghỉ, vẫn tự trách bản thân',
        action: 'cho phép mình nghỉ ngơi hôm nay mà không cần cảm thấy phải xứng đáng mới được nghỉ' } },
    {
      id: 54, tarot: 'Five of Swords', openName: 'Hạt nhìn lại trận gió vừa qua', closedName: 'Hạt thắng gió mà mất bạn đồng hành',
      element: 'Air', family: 'Swords',
      coreStory: 'Hạt này nhìn lại một trận gió tranh chấp vừa qua — hình ảnh của một cuộc tranh cãi hay xung đột đã kết thúc, đáng để nhìn lại xem thắng thua lúc đó có còn quan trọng như từng nghĩ. Khi hạt thật sự nhìn lại và buông bớt phần không còn quan trọng, nó nhẹ nhõm hơn. Khi nó thắng gió mà mất bạn đồng hành, giữ oán giận và lặp lại cùng một cách phản ứng mỗi lần có xung đột, cần nhớ có những trận thắng không đáng cái giá phải trả.',
      visualMotif: 'Hạt quay đầu nhìn lại phía sau, nơi một vài sợi tơ khác đã rời xa dần theo một hướng khác; vệt gió của trận tranh chấp cũ vẫn còn lưu lại mờ nhạt phía xa, không còn động nhưng vẫn nhìn thấy được.',
      profile: { domain: 'decision', movement: 'reflecting', storyStage: 'friction',
        need: 'cần nhìn lại một xung đột đã qua để thấy rõ nó còn quan trọng đến đâu',
        gift: 'biết buông bớt phần không còn quan trọng sau một cuộc tranh cãi đã qua',
        risk: 'giữ oán giận từ một cuộc cãi vã cũ, lặp lại cùng một cách phản ứng mỗi lần xung đột',
        action: 'tự hỏi trận thắng đó có đáng với cái giá đã mất hay không' } },
    {
      id: 55, tarot: 'Six of Swords', openName: 'Hạt theo gió sang bờ yên hơn', closedName: 'Hạt mang gió cũ sang bờ mới',
      element: 'Air', family: 'Swords',
      coreStory: 'Hạt này đang băng qua một khoảng gió động để sang một bờ yên hơn — hình ảnh của việc chuyển sang một giai đoạn mới: công việc mới, chỗ ở mới, một nhịp sống ổn định hơn. Chuyến đi chậm nhưng chắc, không có gì kịch tính. Khi hạt bay nhẹ, chỉ mang đúng phần cần thiết, nó thật sự đang tới bờ mới. Khi nó còn vướng những sợi tơ cũ — tổn thương hay thói quen chưa buông — nó chỉ đang mang gió cũ sang một chỗ mới mà chưa thật sự rời khỏi chỗ cũ.',
      visualMotif: 'Hạt bay là là ngang một mặt nước tối phẳng lặng như gương, quỹ đạo phía trước êm với các vệt gió mảnh song song; vài sợi tơ phía sau vướng nhẹ một lớp sợi tối màu mảnh như đang bị kéo lê theo, tương phản với phần tán phía trước gọn và sạch.',
      profile: { domain: 'decision', movement: 'crossing', storyStage: 'recovery',
        need: 'cần được phép chuyển sang giai đoạn yên ổn hơn mà không phải dứt khoát ngay lập tức',
        gift: 'đang chuyển động đúng hướng, chậm nhưng chắc, về phía yên ổn hơn',
        risk: 'mang tổn thương hay thói quen cũ sang hoàn cảnh mới mà chưa thật sự để lại phía sau',
        action: 'chọn một thói quen hay cảm xúc cụ thể để chủ động để lại trước khi bước tiếp' } },
    {
      id: 56, tarot: 'Seven of Swords', openName: 'Hạt lặng lẽ tìm đường riêng', closedName: 'Hạt giấu đường mà tự lạc',
      element: 'Air', family: 'Swords',
      coreStory: 'Hạt này lặng lẽ tìm một đường bay riêng, kín đáo tách khỏi nhóm — hình ảnh của việc cần tự xoay xở một mình để giải quyết một việc, điều đó hợp lý lúc này, không phải trốn tránh. Khi hạt thật sự cần một mình để giải quyết việc riêng, con đường kín đáo đó là hợp lý. Khi nó giấu đường mà tự lạc, giấu diếm điều gì đó kể cả với chính mình, có nguy cơ sớm bị lộ ra, cần nhớ rằng nói thật sớm còn dễ hơn để nó vỡ ra sau.',
      visualMotif: 'Hạt tách khỏi một nhóm hạt mờ phía xa, bay theo một đường vòng khuất sau vài đám lá cây, cố tình tránh một vùng ánh sáng rõ; một vài sợi tơ khẽ vướng vào lá như dấu vết còn sót lại của đường đi.',
      profile: { domain: 'decision', movement: 'concealing', storyStage: 'patience',
        need: 'cần một khoảng riêng tư để tự xoay xở một việc, không phải để trốn tránh',
        gift: 'biết khi nào cần kín đáo tự giải quyết một việc một mình',
        risk: 'giấu diếm điều gì đó, kể cả với chính mình, có nguy cơ sớm bị lộ ra',
        action: 'nói thật về điều đang giấu, trước khi nó tự lộ ra theo cách khó kiểm soát hơn' } },
    {
      id: 57, tarot: 'Eight of Swords', openName: 'Hạt thấy dây gió từng trói mình', closedName: 'Hạt tin mình mãi không gỡ được',
      element: 'Air', family: 'Swords',
      coreStory: 'Hạt này bắt đầu nhìn thấy chính những sợi dây gió từng trói mình lại — hình ảnh của việc nhận ra rõ điều gì thật sự đang giới hạn mình. Nhìn thấy nó là bước đầu để thoát ra. Khi hạt tin rằng mình mãi không gỡ được, coi giới hạn đó là vĩnh viễn dù phần lớn không còn chặt như tưởng, cần thử một bước nhỏ để kiểm tra xem điều đó có còn đúng không.',
      visualMotif: 'Vài sợi dây mảnh trong suốt quấn lỏng quanh phần thân hạt, một vài đầu dây đã rơi rời ra mà hạt dường như chưa nhận ra; ánh sáng vẫn chiếu xuyên qua những sợi dây đó dễ dàng, cho thấy chúng không còn chắc như vẻ ngoài.',
      profile: { domain: 'decision', movement: 'entangling', storyStage: 'momentum',
        need: 'cần nhìn rõ điều gì thật sự đang giới hạn mình để bắt đầu thoát ra',
        gift: 'nhận ra rõ giới hạn của mình — bước đầu tiên để thật sự thoát khỏi nó',
        risk: 'tin rằng mình mãi không gỡ được một giới hạn, dù nó không còn chặt như tưởng',
        action: 'thử một bước nhỏ để kiểm tra xem giới hạn đó có còn đúng như mình nghĩ không' } },
    {
      id: 58, tarot: 'Nine of Swords', openName: 'Hạt gọi tên nỗi sợ trong đêm gió', closedName: 'Hạt thức trắng cùng nỗi sợ câm',
      element: 'Air', family: 'Swords',
      coreStory: 'Hạt này gọi tên nỗi sợ của mình giữa một đêm gió dài không ngủ được — hình ảnh của việc gọi tên nỗi lo đang khiến mình mất ngủ, nói nó ra với ai đó để nó bớt lớn hơn thực tế. Khi hạt thật sự gọi tên nỗi sợ, nó bớt nặng nề hơn. Khi nó thức trắng cùng nỗi sợ câm, giữ một mình trong xấu hổ không dám chia sẻ, cần nhớ rằng không ai cần phải một mình với điều này.',
      visualMotif: 'Hạt đứng giữa một khoảng tối dày đặc hơn hẳn nền chung của bộ bài, vài sợi tơ run nhẹ liên tục như đang thức trắng; một vệt sáng rất mảnh, yếu ớt cố len vào từ một góc xa như dấu hiệu của bình minh sắp tới.',
      profile: { domain: 'decision', movement: 'confessing', storyStage: 'threshold',
        need: 'cần gọi tên một nỗi sợ đang khiến mình mất ngủ, thay vì giữ một mình',
        gift: 'nói ra nỗi lo với ai đó khiến nó bớt lớn hơn thực tế nó đang có',
        risk: 'giữ một nỗi sợ hay lo lắng một mình, xấu hổ không dám chia sẻ với ai',
        action: 'nói nỗi sợ đó ra với một người cụ thể, ngay cả khi chỉ bằng một câu ngắn' } },
    {
      id: 59, tarot: 'Ten of Swords', openName: 'Hạt chạm đáy, thấy bình minh sau gió', closedName: 'Hạt nằm mãi dưới trận gió đã tan',
      element: 'Air', family: 'Swords',
      coreStory: 'Hạt này chạm đáy của một trận gió dữ, nhưng đã bắt đầu thấy một vệt bình minh phía xa — hình ảnh của điểm thấp nhất trong một giai đoạn khó khăn đã kết thúc, và sau điểm thấp nhất chỉ còn đường đi lên. Khi hạt để mình thấy vệt sáng đó và đứng dậy, giai đoạn khó đã thật sự qua. Khi nó nằm mãi dưới trận gió đã tan, giữ vai "người bị tổn thương" lâu hơn cần thiết, cần nhớ rằng bạn được phép đứng dậy bất cứ lúc nào.',
      visualMotif: 'Hạt nằm thấp nhất trong khung hình, gần sát viền dưới, giữa những vệt gió đã lắng hẳn; ngay phía trên nó, một vệt sáng ấm mỏng bắt đầu ló ra từ đường chân trời như tia bình minh đầu tiên.',
      profile: { domain: 'decision', movement: 'dawning', storyStage: 'culmination',
        need: 'cần được công nhận rằng giai đoạn khó khăn nhất đã thật sự qua',
        gift: 'nhìn thấy tia sáng đầu tiên sau điểm thấp nhất của một giai đoạn khó khăn',
        risk: 'giữ vai người bị tổn thương lâu hơn cần thiết, chưa cho phép mình đứng dậy',
        action: 'cho phép mình đứng dậy hôm nay, dù chỉ bằng một bước rất nhỏ' } },
    {
      id: 60, tarot: 'Page of Swords', openName: 'Người canh từng cơn gió đổi chiều', closedName: 'Người nói trước khi gió kịp đổi',
      element: 'Air', family: 'Swords',
      coreStory: 'Người này canh từng cơn gió đổi chiều bằng một sự tò mò sắc bén — hình ảnh của khả năng quan sát nhạy bén, quan sát kỹ trước khi hành động. Khi người đó thật sự chờ quan sát đủ rồi mới lên tiếng, điểm mạnh ấy phát huy tốt. Khi họ nói trước khi gió kịp đổi, đưa ra kết luận hay phán xét trước khi thật sự hiểu hết câu chuyện, cần chờ thêm một chút thông tin trước khi lên tiếng.',
      visualMotif: 'Một hình dáng nhỏ hơn, trẻ hơn, đứng nghiêng đầu quan sát một vùng không khí đang khẽ chuyển động phía trước, đầu hướng thẳng về phía luồng gió sắp đổi chiều; tư thế cảnh giác nhưng chưa hành động.',
      profile: { domain: 'decision', movement: 'watching', storyStage: 'curiosity',
        need: 'cần quan sát kỹ trước khi hành động hay lên tiếng',
        gift: 'sự tò mò và óc quan sát nhạy bén đang là điểm mạnh lúc này',
        risk: 'đưa ra kết luận hoặc phán xét trước khi thật sự hiểu hết câu chuyện',
        action: 'chờ thêm một thông tin cụ thể trước khi lên tiếng về việc này' } },
    {
      id: 61, tarot: 'Knight of Swords', openName: 'Kỵ sĩ xé mây tìm sự thật', closedName: 'Kỵ sĩ xé mây mà chẳng kịp nhìn',
      element: 'Air', family: 'Swords',
      coreStory: 'Một kỵ sĩ xé toang một đám mây để tìm sự thật phía sau nó — hình ảnh của việc quyết liệt bảo vệ một điều mình tin là đúng, sự dứt khoát cần thiết lúc này. Khi hành động dứt khoát đó thật sự vì sự thật, nó có sức mạnh. Khi kỵ sĩ xé mây mà chẳng kịp nhìn, hành động quá vội, đúng về lý lẽ nhưng thiếu tử tế trong cách nói ra, cần nhớ rằng đúng và tử tế không loại trừ nhau.',
      visualMotif: 'Một hình dáng hạt bồ công anh được nhân hoá — đầu tơ xù cùng hai nhánh tơ mảnh như tay chân, không có ngựa hay vật cưỡi riêng biệt — nghiêng mình lao nhanh xé băng qua một lớp mây mỏng, để lại một đường rách rõ nét phía sau như vết cắt giữa không trung; tốc độ chuyển động thể hiện rõ qua các vệt mờ dài phía sau.',
      profile: { domain: 'decision', movement: 'racing', storyStage: 'pursuit',
        need: 'cần dứt khoát bảo vệ một điều mình tin là đúng',
        gift: 'sự dứt khoát và quyết liệt đúng lúc để bảo vệ một sự thật',
        risk: 'hành động quá vội, đúng về lý lẽ nhưng thiếu tử tế trong cách nói ra',
        action: 'nói điều mình tin là đúng, nhưng chọn cách nói tử tế hơn' } },
    {
      id: 62, tarot: 'Queen of Swords', openName: 'Người cắt gọn cành che khuất nắng', closedName: 'Người cắt cả cành đang cần nắng',
      element: 'Air', family: 'Swords',
      coreStory: 'Người này cắt gọn một cành cây đang che khuất ánh nắng — hình ảnh của việc đặt ra một ranh giới rõ ràng bằng lời nói thẳng thắn, sự độc lập và sáng suốt là sức mạnh của bạn. Khi nhát cắt đó chỉ gọn đúng phần cần cắt, ánh nắng chiếu vào trở lại cho mọi người. Khi họ cắt cả cành đang cần nắng, dùng sự sắc bén trong lời nói để giữ khoảng cách, tránh phải gần gũi thật sự, cần nhớ rằng ranh giới vững không cần phải lạnh lùng mới hiệu quả.',
      visualMotif: 'Một hình dáng đứng cạnh một nhánh cây vừa được cắt gọn gàng, đường cắt sắc và sạch; nhưng một nhánh nhỏ khác gần đó, vẫn còn xanh và cần ánh sáng, cũng đã bị cắt đi cùng lúc, nằm lìa cành bên cạnh.',
      profile: { domain: 'decision', movement: 'pruning', storyStage: 'nurture',
        need: 'cần đặt ra một ranh giới rõ ràng bằng lời nói thẳng thắn',
        gift: 'sự độc lập và sáng suốt trong cách đặt ranh giới là sức mạnh thật sự',
        risk: 'dùng sự sắc bén trong lời nói để giữ khoảng cách, tránh phải gần gũi thật sự',
        action: 'xem lại một ranh giới mình vừa đặt ra có đang cắt nhầm phần cần giữ lại không' } },
    {
      id: 63, tarot: 'King of Swords', openName: 'Người giữ luật công bằng cho gió', closedName: 'Người dùng luật để thay lòng mình',
      element: 'Air', family: 'Swords',
      coreStory: 'Người này giữ một luật công bằng cho cả luồng gió đi qua khu vườn — hình ảnh của việc đưa ra một quyết định công bằng, dựa trên sự thật hơn là cảm xúc nhất thời. Khi lý trí dẫn đường mà vẫn giữ được sự công tâm, quyết định đó đáng tin. Khi họ dùng luật để thay lòng mình, dùng lý lẽ để tránh phải thật sự cảm nhận, phán xét người khác thay vì cố hiểu họ, cần nhớ rằng đầu và tim không cần tách rời để đưa ra một quyết định đúng.',
      visualMotif: 'Một hình dáng đứng vững giữa khu vườn, nhánh tơ giơ ra như đang cầm một cán cân vô hình cho cả luồng gió đi qua; ánh sáng chiếu đều hai bên, không thiên lệch.',
      profile: { domain: 'decision', movement: 'judging', storyStage: 'mastery',
        need: 'cần đưa ra một quyết định công bằng, dựa trên sự thật hơn là cảm xúc nhất thời',
        gift: 'lý trí dẫn đường mà vẫn giữ được sự công tâm trong quyết định',
        risk: 'dùng lý lẽ để tránh phải thật sự cảm nhận, phán xét người khác thay vì cố hiểu họ',
        action: 'trước khi phán xét ai đó, thử hiểu góc nhìn của họ trước' } }
  ];

  // Khối Đất (Pentacles) — ĐỦ 14/14, đã hoàn tất theo trình tự rank Ace→King.
  suits.Pentacles = [
    {
      id: 64, tarot: 'Ace of Pentacles', openName: 'Hạt chạm đất tốt lần đầu', closedName: 'Hạt bỏ lỡ mảnh đất đang chờ',
      element: 'Earth', family: 'Pentacles',
      coreStory: 'Hạt này vừa chạm vào một mảnh đất tốt lần đầu tiên — hình ảnh của một cơ hội cụ thể, hữu hình đang ở ngay trước mắt: một công việc, một khoản đầu tư, một khởi đầu mới. Khi hạt thật sự chạm đất và bắt tay vào, cơ hội đó trở thành thật. Khi nó chỉ mơ về một kết quả tốt đẹp mà chưa thật sự hành động, bỏ lỡ mảnh đất đang chờ, cần nhớ rằng một bước nhỏ thật sự đáng hơn một kế hoạch hoàn hảo trên giấy.',
      visualMotif: 'Hạt vừa chạm chân xuống một mảnh đất màu mỡ, sẫm và ẩm, khác hẳn không gian bay lơ lửng của các hạt khác; một quầng sáng ấm nhỏ toả ra ngay điểm tiếp xúc giữa hạt và đất như dấu hiệu của một khởi đầu cụ thể.',
      profile: { domain: 'work', movement: 'arriving', storyStage: 'spark',
        need: 'cần nắm lấy một cơ hội cụ thể, hữu hình đang ở ngay trước mắt',
        gift: 'một cơ hội đủ tốt và cụ thể để bắt tay vào thật ngay bây giờ',
        risk: 'mơ về một kết quả tốt đẹp mà chưa thật sự hành động để đạt được nó',
        action: 'làm một bước nhỏ thật sự ngay hôm nay, thay vì hoàn thiện kế hoạch thêm nữa' } },
    {
      id: 65, tarot: 'Two of Pentacles', openName: 'Hạt lăn nhịp nhàng theo hai luống đất', closedName: 'Hạt chao đảo giữa hai luống đất',
      element: 'Earth', family: 'Pentacles',
      coreStory: 'Hạt này lăn nhịp nhàng qua lại giữa hai luống đất cùng lúc — hình ảnh của việc cân đối tốt giữa nhiều việc cùng lúc: công việc, gia đình, tài chính. Khi hạt giữ được nhịp lăn đều, sự linh hoạt đó là một kỹ năng thật sự. Khi nó chao đảo giữa hai luống đất, quá tải vì cố ôm đồm mọi việc cùng lúc mà mất kiểm soát, có thể đã đến lúc chọn bớt việc, thay vì cố làm hết tất cả.',
      visualMotif: 'Hạt lăn theo một đường cong hình số 8 mềm mại giữa hai luống đất song song, chuyển động uyển chuyển và cân bằng; một vệt bụi đất nhỏ bay lên ở một bên luống, gợi ý một chút mất cân bằng thoáng qua.',
      profile: { domain: 'work', movement: 'juggling', storyStage: 'choice',
        need: 'cần cân đối tốt giữa nhiều việc cùng lúc mà không mất kiểm soát',
        gift: 'sự linh hoạt khi cân đối nhiều việc cùng lúc là một kỹ năng thật sự',
        risk: 'quá tải vì cố ôm đồm mọi việc cùng lúc mà mất kiểm soát',
        action: 'chọn bớt một việc để tạm gác lại, thay vì cố làm hết tất cả cùng lúc' } },
    {
      id: 66, tarot: 'Three of Pentacles', openName: 'Hạt cùng nhiều tay vun một luống', closedName: 'Hạt tự vun luống một mình',
      element: 'Earth', family: 'Pentacles',
      coreStory: 'Nhiều bàn tay cùng vun một luống đất quanh hạt này — hình ảnh của sự hợp tác giữa bạn và người khác đang tạo ra một kết quả chất lượng. Khi hạt để nhiều tay cùng vun luống, khả năng của nó được nhìn thấy và công nhận rõ hơn. Khi nó tự vun luống một mình, cố làm một việc lẽ ra cần nhiều người hơn, kết quả thiếu sự phối hợp, cần nhớ rằng mời thêm người vào không làm giảm giá trị phần mình đóng góp.',
      visualMotif: 'Hạt nằm giữa một luống đất đang được vun bởi nhiều dấu tay/rễ nhỏ khác nhau hội tụ về cùng một điểm, mỗi dấu vết mang một sắc độ ánh sáng hơi khác nhau; kết cấu đất ở đó tơi xốp và đều hơn hẳn phần đất xung quanh.',
      profile: { domain: 'work', movement: 'tending', storyStage: 'connection',
        need: 'cần sự hợp tác từ người khác để tạo ra một kết quả chất lượng hơn',
        gift: 'khả năng của mình đang được nhìn thấy và công nhận qua sự hợp tác',
        risk: 'cố làm một mình một việc lẽ ra cần nhiều người hơn, khiến kết quả thiếu phối hợp',
        action: 'mời cụ thể một người vào giúp phần việc mình đang tự ôm một mình' } },
    {
      id: 67, tarot: 'Four of Pentacles', openName: 'Hạt giữ chặt phần đất của mình', closedName: 'Hạt siết đất đến cằn cỗi',
      element: 'Earth', family: 'Pentacles',
      coreStory: 'Hạt này giữ chặt lấy phần đất của mình, không để một hạt bụi nào trôi đi — hình ảnh của việc giữ tiền bạc, thời gian, hay nguồn lực một cách hợp lý. Khi hạt giữ vừa đủ để đảm bảo an toàn, sự thận trọng đó là cần thiết. Khi nó siết đất đến cằn cỗi, bám giữ vì sợ thiếu đến mức không còn tận hưởng được gì, cần buông bớt một chút mới có chỗ cho điều mới vào.',
      visualMotif: 'Hạt ôm sát một khoảnh đất nhỏ ngay dưới chân mình, rễ/tơ quấn chặt quanh khoảnh đất đó hơn mức cần thiết; đất trong khoảnh đó có dấu hiệu hơi khô cứng do bị giữ quá chặt, khác với đất tơi xốp xung quanh.',
      profile: { domain: 'work', movement: 'holding', storyStage: 'foundation',
        need: 'cần giữ nguồn lực của mình một cách hợp lý để cảm thấy an toàn',
        gift: 'sự thận trọng khi giữ tiền bạc, thời gian hay nguồn lực đúng lúc là cần thiết',
        risk: 'bám giữ vì sợ thiếu đến mức không còn tận hưởng được gì',
        action: 'buông bớt một phần nhỏ nguồn lực mình đang giữ quá chặt để có chỗ cho điều mới' } },
    {
      id: 68, tarot: 'Five of Pentacles', openName: 'Hạt tìm thấy khe đất còn ấm', closedName: 'Hạt run ngoài luống đất lạnh',
      element: 'Earth', family: 'Pentacles',
      coreStory: 'Hạt này tìm thấy một khe đất còn ấm giữa một vùng đất lạnh — hình ảnh của việc dù đang khó khăn về tài chính hay sức khỏe, vẫn có một nguồn hỗ trợ gần hơn bạn nghĩ. Khi hạt để mình tìm và nhận khe đất ấm đó, nó không phải chịu lạnh một mình. Khi nó cứ run ngoài luống đất lạnh, tự cô lập trong khó khăn dù đã có người sẵn sàng giúp, cần nhớ rằng nhận sự giúp đỡ không phải là thất bại.',
      visualMotif: 'Hạt run nhẹ giữa một vùng đất lạnh, sương giá phủ mờ xung quanh; nhưng ngay gần đó, cách một khoảng ngắn, có một khe đất nhỏ phát ra ánh sáng ấm mà hạt vẫn chưa hoàn toàn hướng về.',
      profile: { domain: 'work', movement: 'seeking', storyStage: 'friction',
        need: 'cần tìm và nhận một nguồn hỗ trợ đang ở gần hơn mình nghĩ',
        gift: 'tìm ra được một nguồn hỗ trợ gần mình ngay giữa lúc khó khăn',
        risk: 'tự cô lập trong khó khăn một mình, dù đã có người sẵn sàng giúp',
        action: 'nhận một sự giúp đỡ cụ thể đang có sẵn, thay vì cố tự xoay xở một mình' } },
    {
      id: 69, tarot: 'Six of Pentacles', openName: 'Hạt chia đất công bằng cho hạt khác', closedName: 'Hạt cho đất mà giữ lại quyền',
      element: 'Earth', family: 'Pentacles',
      coreStory: 'Hạt này chia đất công bằng cho một hạt khác đang cần — hình ảnh của sự cho và nhận cân bằng: chia sẻ tiền bạc, thời gian, hay sự giúp đỡ một cách đúng đắn và tự nhiên. Khi việc cho đi đó không kèm điều kiện, nó là một sự cân bằng thật sự. Khi hạt cho đất mà giữ lại quyền, cho đi để giữ quyền kiểm soát hơn là để giúp thật lòng, cần xem lại động cơ thật sự phía sau việc cho.',
      visualMotif: 'Hạt chia một phần đất tơi xốp của mình sang một khoảnh bên cạnh nơi một hạt khác nhỏ hơn đang cần, đường ranh giữa hai khoảnh đất mờ dần tự nhiên; nhưng có một sợi rễ mảnh vẫn nối ngược lại phía hạt cho, như một dây kiểm soát ngầm.',
      profile: { domain: 'work', movement: 'sharing', storyStage: 'recovery',
        need: 'cần cho và nhận một cách cân bằng, không kèm điều kiện ẩn',
        gift: 'sự cho và nhận cân bằng, đúng đắn và tự nhiên đang diễn ra',
        risk: 'cho đi để giữ quyền kiểm soát hơn là để giúp thật lòng',
        action: 'xem lại động cơ thật sự của mình trước khi cho đi một điều gì đó' } },
    {
      id: 70, tarot: 'Seven of Pentacles', openName: 'Hạt kiên nhẫn chờ luống đất chín', closedName: 'Hạt sốt ruột đào lại luống chưa chín',
      element: 'Earth', family: 'Pentacles',
      coreStory: 'Hạt này nằm im trong một luống đất mà nó đã tự tay vun trồng, chờ đúng thời điểm để lớn lên — hình ảnh của một việc cần thời gian dài mới ra quả: một công việc, một kỹ năng, một mối quan hệ đang xây dần. Khi hạt đủ kiên nhẫn ở yên, rễ vẫn đang âm thầm lớn dù mắt thường chưa thấy gì. Khi nó sốt ruột tự đào luống đất lên để kiểm tra, nó chỉ đang phá vỡ chính quá trình mình cần chờ, khiến mọi thứ phải bắt đầu lại.',
      visualMotif: 'Hạt lún một nửa vào lớp đất sẫm màu giàu mùn, vài sợi tơ mảnh trong suốt hướng ngược xuống dưới như rễ non thay vì xoè lên trên; một quầng sáng vàng nhạt phát nhẹ ngay dưới bề mặt đất gợi ý sự lớn lên chưa thấy được, lấm tấm rêu và khoáng chất li ti quanh đó.',
      profile: { domain: 'work', movement: 'tending', storyStage: 'patience',
        need: 'cần tin rằng công sức âm thầm vẫn đang tích luỹ dù chưa thấy kết quả',
        gift: 'đủ kiên nhẫn để công sức dài hạn có thời gian ra quả',
        risk: 'sốt ruột đào xới lại một việc chưa kịp chín, khiến nó phải bắt đầu lại',
        action: 'chọn tiếp tục thêm một mốc thời gian cụ thể trước khi đánh giá lại có nên đổi hướng' } },
    {
      id: 71, tarot: 'Eight of Pentacles', openName: 'Hạt luyện rễ sâu mỗi ngày', closedName: 'Hạt đòi rễ hoàn hảo ngay từ đầu',
      element: 'Earth', family: 'Pentacles',
      coreStory: 'Hạt này luyện cho rễ mình cắm sâu hơn một chút mỗi ngày — hình ảnh của việc rèn luyện một kỹ năng qua từng ngày lặp lại, tiến bộ chậm mà chắc đang thật sự xảy ra. Khi hạt chấp nhận mỗi ngày một chút tiến bộ nhỏ, kỹ năng đó lớn lên bền vững. Khi nó đòi rễ hoàn hảo ngay từ đầu, cầu toàn đến mức mất hết hứng thú hoặc ngại bắt đầu vì sợ chưa đủ giỏi, cần cho phép mình làm chưa hoàn hảo trong lúc học hỏi.',
      visualMotif: 'Hạt lún nhẹ vào đất, vài sợi rễ mảnh vươn xuống với độ dài hơi khác nhau như đang được luyện tập từng đợt, một số đã hoàn thiện hơn số khác; xung quanh có dấu vết những rễ tập trước đó, ngắn hơn và sẫm màu hơn.',
      profile: { domain: 'work', movement: 'practicing', storyStage: 'momentum',
        need: 'cần rèn luyện một kỹ năng qua từng ngày lặp lại, không đòi hỏi hoàn hảo ngay',
        gift: 'tiến bộ chậm mà chắc đang thật sự xảy ra qua từng ngày luyện tập',
        risk: 'cầu toàn đến mức mất hết hứng thú hoặc ngại bắt đầu vì sợ chưa đủ giỏi',
        action: 'cho phép mình làm chưa hoàn hảo hôm nay, miễn là vẫn đang luyện tập' } },
    {
      id: 72, tarot: 'Nine of Pentacles', openName: 'Hạt nở một mình giữa vườn riêng', closedName: 'Hạt đủ đầy mà vẫn thấy lẻ loi',
      element: 'Earth', family: 'Pentacles',
      coreStory: 'Hạt này nở một mình giữa một khu vườn riêng do chính nó gây dựng — hình ảnh của việc tận hưởng thành quả do chính mình tạo ra, sự độc lập là một niềm vui thật sự không cần ai công nhận mới trọn vẹn. Khi hạt thật sự tận hưởng khu vườn riêng đó, sự đủ đầy là thật. Khi nó đủ đầy mà vẫn thấy lẻ loi, chú trọng hình thức hơn kết nối thật với người khác, cần nhớ rằng đủ đầy vật chất không tự động lấp được khoảng trống đó.',
      visualMotif: 'Hạt đứng giữa một khu vườn nhỏ riêng biệt do chính nó tạo ra, hoa và lá xung quanh phong phú và chăm chút; nhưng khung hình xung quanh khu vườn đó hoàn toàn vắng, không một hạt hay sinh vật nào khác xuất hiện.',
      profile: { domain: 'work', movement: 'flourishing', storyStage: 'threshold',
        need: 'cần tận hưởng thành quả do chính mình gây dựng mà không cần ai công nhận',
        gift: 'sự độc lập và thành quả do chính mình tạo ra là một niềm vui thật sự',
        risk: 'đủ đầy về vật chất nhưng vẫn cảm thấy cô đơn vì thiếu kết nối thật',
        action: 'chủ động kết nối với một người cụ thể, thay vì chỉ tận hưởng thành quả một mình' } },
    {
      id: 73, tarot: 'Ten of Pentacles', openName: 'Hạt nối vào cả một hàng cây tổ', closedName: 'Hạt gánh cả khu vườn của người trước',
      element: 'Earth', family: 'Pentacles',
      coreStory: 'Hạt này nối liền vào cả một hàng cây tổ tiên trải dài phía sau — hình ảnh của việc là một phần của điều gì đó lớn hơn và bền vững hơn chính mình: một gia đình, một truyền thống. Khi hạt để mình được nâng đỡ bởi cả hàng cây đó, nó vững vàng hơn. Khi nó gánh cả khu vườn của người trước, gánh kỳ vọng của cả gia đình hoặc coi tiền bạc là thước đo duy nhất cho giá trị bản thân, cần nhớ rằng một di sản không cần phải là gánh nặng mới có ý nghĩa.',
      visualMotif: 'Hạt nối vào một hàng cây lớn trải dài từ gần đến xa trong khung hình, mỗi cây mang một sắc thái tuổi tác khác nhau như nhiều thế hệ; rễ của hạt hoà lẫn vào hệ rễ chung của cả hàng cây đó.',
      profile: { domain: 'work', movement: 'integrating', storyStage: 'culmination',
        need: 'cần cảm thấy mình là một phần của điều gì đó lớn hơn và bền vững hơn chính mình',
        gift: 'được nâng đỡ bởi một gia đình hay truyền thống lớn hơn chính mình',
        risk: 'gánh kỳ vọng của cả gia đình hoặc coi tiền bạc là thước đo duy nhất cho giá trị bản thân',
        action: 'chọn giữ lại phần di sản có ý nghĩa với mình, và đặt xuống phần chỉ là gánh nặng' } },
    {
      id: 74, tarot: 'Page of Pentacles', openName: 'Người tập nâng từng đồng hạt', closedName: 'Người muốn quả mà chưa chịu gieo',
      element: 'Earth', family: 'Pentacles',
      coreStory: 'Người này đang tập nâng từng đồng hạt một, từng bước học một kỹ năng thực tế — hình ảnh của việc cam kết với một mục tiêu nhỏ sẽ dẫn bạn đi xa hơn bạn nghĩ. Khi người đó kiên trì tập từng bước, nền tảng vững chắc dần hình thành. Khi họ muốn quả mà chưa chịu gieo, muốn có kết quả ngay mà chưa thật sự bỏ công sức xây nền tảng, cần nhớ rằng kỹ năng nào cũng cần thời gian trước khi ra thành quả.',
      visualMotif: 'Một hình dáng nhỏ hơn, trẻ hơn, đang cố nâng một hạt giống tròn nhỏ bằng cả hai nhánh tơ, tư thế tập trung và cẩn trọng; phía trước có vài hạt giống khác đã được xếp gọn thành một hàng nhỏ như thành quả tích luỹ dần.',
      profile: { domain: 'work', movement: 'practicing', storyStage: 'curiosity',
        need: 'cần cam kết với một mục tiêu nhỏ và học từng bước một cách thực tế',
        gift: 'cam kết với một mục tiêu nhỏ đang dẫn mình đi xa hơn mình nghĩ',
        risk: 'muốn có kết quả ngay mà chưa thật sự bỏ công sức xây nền tảng',
        action: 'chọn một bước thực hành nhỏ hôm nay để xây nền tảng, thay vì chờ kết quả ngay' } },
    {
      id: 75, tarot: 'Knight of Pentacles', openName: 'Kỵ sĩ đi chậm mà chắc qua ruộng', closedName: 'Kỵ sĩ dừng lại giữa ruộng quen',
      element: 'Earth', family: 'Pentacles',
      coreStory: 'Một kỵ sĩ đi chậm mà chắc qua một cánh đồng quen thuộc — hình ảnh của sự đều đặn và đáng tin, chậm mà chắc vẫn đang đưa bạn tới đích. Khi kỵ sĩ giữ đúng nhịp đều đặn đó, hành trình chắc chắn tới nơi. Khi họ dừng lại giữa ruộng quen, bám vào thói quen đến mức trì trệ, sống như đang chạy theo một danh sách việc phải làm hơn là thật sự sống, cần thử phá vỡ lịch trình một chút để thấy mình còn năng lượng.',
      visualMotif: 'Một hình dáng hạt bồ công anh được nhân hoá — đầu tơ xù cùng hai nhánh tơ mảnh như tay chân, không có ngựa hay vật cưỡi riêng biệt — bước đi chậm rãi, đều đặn qua một cánh đồng rộng với các luống đất song song trải dài; dấu vết bước đi phía sau đều tăm tắp, không có khoảng dừng nào bất thường — ngoại trừ một điểm gần cuối nơi bước chân hơi khựng lại.',
      profile: { domain: 'work', movement: 'plodding', storyStage: 'pursuit',
        need: 'cần sự đều đặn và đáng tin để tới đích một cách chắc chắn',
        gift: 'sự đều đặn, chậm mà chắc của mình đang đưa mình tới đích',
        risk: 'bám vào thói quen đến mức trì trệ, sống theo một danh sách việc phải làm hơn là thật sự sống',
        action: 'thử phá vỡ lịch trình quen thuộc một chút để thấy mình còn bao nhiêu năng lượng' } },
    {
      id: 76, tarot: 'Queen of Pentacles', openName: 'Người ủ ấm đất cho cả khu vườn', closedName: 'Người ủ ấm đất mà quên ủ mình',
      element: 'Earth', family: 'Pentacles',
      coreStory: 'Người này ủ ấm đất cho cả một khu vườn xung quanh — hình ảnh của sự chăm sóc thiết thực, ấm áp đang nuôi dưỡng những người xung quanh, một món quà thật sự có giá trị. Khi người đó ủ ấm cho cả vườn lẫn chính mình, sự chăm sóc đó bền vững. Khi họ ủ ấm đất mà quên ủ mình, chăm sóc mọi người và mọi việc trừ chính bản thân, gắn giá trị bản thân với việc mình làm được bao nhiêu, cần nhớ rằng bản thân cũng cần được chăm sóc, không chỉ là người chăm sóc.',
      visualMotif: 'Hạt trung tâm toả một quầng ấm dịu xuống lớp đất bên dưới, làm ấm cả một vùng rộng quanh nó với nhiều mầm cây nhỏ đang được sưởi; nhưng ngay dưới chân hạt, phần đất riêng của chính nó lại có vẻ hơi lạnh hơn phần nó đang sưởi cho xung quanh.',
      profile: { domain: 'work', movement: 'tending', storyStage: 'nurture',
        need: 'cần chăm sóc người khác mà không quên chăm sóc chính mình',
        gift: 'sự chăm sóc thiết thực, ấm áp của mình đang nuôi dưỡng những người xung quanh',
        risk: 'chăm sóc mọi người và mọi việc trừ chính mình, gắn giá trị bản thân với việc làm được bao nhiêu',
        action: 'dành một phần sự chăm sóc đó cho chính mình hôm nay, như đã làm cho người khác' } },
    {
      id: 77, tarot: 'King of Pentacles', openName: 'Người giữ vườn vững qua nhiều mùa', closedName: 'Người giữ vườn mà khoá cả cổng',
      element: 'Earth', family: 'Pentacles',
      coreStory: 'Người này giữ khu vườn vững vàng qua nhiều mùa liên tiếp — hình ảnh của sự vững vàng và khả năng quản lý tiền bạc, công việc đang tạo ra thành quả bền vững, kết quả của thời gian và kỷ luật. Khi họ giữ vườn mà vẫn mở cổng cho người khác bước vào, sự vững vàng đó trở thành nơi nương tựa chung. Khi họ giữ vườn mà khoá cả cổng, kiểm soát chặt đến mức không ai tiếp cận được, dùng vật chất để chứng minh giá trị thay vì lòng tin, cần nhớ rằng thành công thật sự không cần phải đóng kín mới an toàn.',
      visualMotif: 'Hạt trung tâm đứng vững giữa một khu vườn trù phú, nhiều lớp mùa nối tiếp nhau hiện diện cùng lúc quanh nó như bằng chứng của thời gian; nhưng ngay ở rìa khu vườn, có một cánh cổng nhỏ bằng cành cây đan lại, đang khép chặt.',
      profile: { domain: 'work', movement: 'defending', storyStage: 'mastery',
        need: 'cần sự vững vàng và kỷ luật để tạo ra thành quả bền vững',
        gift: 'sự vững vàng và khả năng quản lý của mình đang tạo ra thành quả bền vững qua thời gian',
        risk: 'kiểm soát chặt đến mức không ai tiếp cận được, dùng vật chất để chứng minh giá trị',
        action: 'mở một phần nhỏ cánh cổng đang khoá chặt, để ai đó thật sự có thể bước vào' } }
  ];

  root.GARDEN_ORACLE_PROFILES = { majors, suits };
})(window);
