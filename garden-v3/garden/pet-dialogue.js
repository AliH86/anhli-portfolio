// Original garden banter: playful fiction, not fetched social-media quotes.
const SOLO={
 le:['Tình yêu có thể lỡ, bữa tối thì đừng.','Em không hóng chuyện. Em kiểm định tin đồn.','Người ta thích hướng ngoại. Em thích hướng đồ ăn.','Ba ba gọi một tiếng, em diễn nguyên phim.'],
 husky:['Em không cãi. Em đang thuyết trình bằng cảm xúc.','Trông em lạnh lùng vậy thôi, chứ thiếu ôm là lỗi hệ thống.','Gió đưa cành trúc la đà. Ai chưa ôm em thì ra đây mà!','Nói em drama? Em gọi đó là âm thanh vòm.'],
 muc:['Nhỏ xíu nhưng quan điểm không nhỏ nha.','Lùn là chiều cao, không phải vị thế.','Ba ba ơi, bế em lên. Em cần góc nhìn chiến lược.','Em không giận. Em chỉ đang tiết kiệm sự dễ thương.'],
 mun_tabby:['Tôi không chảnh. Tôi có lịch tiếp khách.','Bình yên là khi chó chưa phát hiện ra mình.','Đừng gọi tôi là bé. Gọi tôi là chủ nhà cũng được.','Tình đầu như lá me bay. Tình sau nhớ mở hộp pate này.'],
 tux:['Tôi mặc tuxedo mỗi ngày mà vẫn bị sai đi ngủ.','Thanh lịch là không giành ăn. Là ăn trước khi họ tới.','Một chút kiêu sa, nhiều chút cá.','Ngoài lạnh trong ấm. Trong bụng thì trống.'],
 corgi:['Chân hơi ngắn nhưng hành trình hóng chuyện rất dài.','Đường xa không ngại, chỉ ngại hết snack.','Em đi chậm để mọi người kịp ngắm.','Hạnh phúc đôi khi là một miếng nữa.'],
 poodle:['Tóc em xoăn, chuyện tình em thẳng: yêu Ba ba.','Em không làm nũng. Em chăm sóc khách hàng thân thiết.','Nhìn vậy thôi chứ em cũng biết buồn… khi hết đồ ăn.','Cưng thì cưng cho trót, cho thêm chút sốt.'],
 bo:['Cà phê có đắng, Ca cao có em.','Hôm nay em chọn chữa lành. Bằng cách nằm.','Không nhận xét ngoại hình. Chỉ nhận thêm khẩu phần.','Ai cần bờ vai? Em có hai cái tai.'],
 vang:['Nắng đã có mây, còn em đã có Ba ba.','Mình sống tích cực, ăn cũng phải tích cực.','Em không đi lạc. Em đang mở rộng vùng được cưng.','Đừng hứa trăm năm. Hứa chiều nay có bánh đi.'],
 spaniel:['Nghe nói ai ngoan được thưởng. Em đang nghe rất ngoan.','Em không mê chuyện. Chuyện tự tìm tới em.','Một lần chạm mắt, cả đời… xin ăn.','Ba ba ơi, em báo cáo: em nhớ Ba ba.'],
 Jo:['Tôi nằm đây trông vườn. Ngủ chỉ là tác dụng phụ.','Yêu em đừng hứa xa xôi. Mở hộp cá trước rồi ngồi cạnh em.','Vườn này có luật: ai dễ thương thì được nằm. Tôi nằm.']
};
const PAIRS=[
 ['Tui nghe nói bà mê Ba ba lắm?','Tin đúng. Nguồn chính chủ.'],
 ['Bà ăn phần của tui hả?','Không. Tui đang bảo quản trong bụng.'],
 ['Người ta gọi tui là nàng thơ.','Ừ, thơm mùi đồ ăn.'],
 ['Tui cần một tình yêu trưởng thành.','Trưởng thành rồi thì chia snack đi.'],
 ['Bà có thấy tui hôm nay khác không?','Có. Hôm nay bà hỏi sớm hơn.'],
 ['Tui không có tính hơn thua.','Rồi sao bà hơn tui một miếng?'],
 ['Tui quyết định sống low-key.','Bà vừa thông báo cho cả vườn.'],
 ['Từ nay tui sẽ bớt nói.','Câu này bà nói tập bốn rồi.'],
 ['Ba ba cưng tui nhất nha.','Ba ba có hai tay. Bà bình tĩnh.'],
 ['Tui đang ở kỷ nguyên độc thân.','Bà đang ở khu vực bát ăn của tui.'],
 ['Đừng nhìn tui bằng ánh mắt đó.','Tui nhìn miếng bánh sau lưng bà.'],
 ['Tình yêu không phân biệt chiều cao.','Đúng. Bế tui lên để tui kiểm chứng.']
];
PAIRS.push(
 ['Tui thấy mình đẹp quá. ✨','Lại tự hấp thụ aura bá khí hả má? 💅','Không. Đây là năng lượng tái tạo. 😌'],
 ['Tui có dự án mở kho bánh riêng. 📈','Vốn đâu? 👀','Ba ba chưa biết mình là nhà đầu tư. 🤫','Dự án ma rồi má. 🫠'],
 ['Bánh bò không có bò. Bánh ú thì nhỏ xíu. 🤨','Rồi sao nữa bà? 👀','Tui cần họp báo. Mọi vật đang lừa dối tui. 🎤','Họp xong đưa bánh đây. Tui chịu bị lừa. 🍪'],
 ['Tui mới phát hiện xoài cát không có cát. 🥭','Nhớ ghi vô CV nha bà. 💅','Bà cười đi. Rồi nhà khoa học sẽ nhớ mặt bà. 🧐'],
 ['Gan bà lớn dữ ha? 😏','Cỡ làm mười hộp pate? 🤨','Tui hỏi tinh thần, bà mở xưởng luôn rồi. 🫠'],
 ['Tui sẽ sống bí ẩn từ hôm nay. 🕶️','Bà vừa đăng thông cáo cho cả vườn. 📣','Đó là teaser. Nội dung chính còn bí ẩn. 😌'],
 ['Có biến! Có biến! 👀','Biến gì? Kể nhanh. 🍿','Cái bát từ có đồ ăn biến thành không. 🥲','Nghi phạm đang tự tường thuật luôn kìa. 🤨'],
 ['Tui đến trước nha. 🌳','Gỗ xà cừ dữ ha. 💅','Ừ, cây cao bóng mát. Bà đứng ké đi. 😌'],
 ['Tui vừa thiền xong, lòng thanh tịnh lắm. 🪷','Ba ba cưng tui trước. 😚','Chan đê! …À khoan, lòng vẫn thanh tịnh nha. 😤'],
 ['Tui tốt tới mức vào chùa không biết lạy ai. 😇','Chùa này xây trên TikTok hả má? 🤨','Bà đừng phá concept của tui. 😭'],
 ['Sao hôm nay tui xui quá vậy trời. 🥲','Kiếp trước tặng máy sấy tóc cho chùa hả? 👀','Ít ra tui cũng có tinh thần tài trợ. 😤'],
 ['Tui xin phép phản biện rất nghiêm túc. 🧐','Rồi, nói đi. 🎤','Từ chuyển qua dầu gội này tóc mượt hẳn. ✨','Bà nhận booking lúc nào vậy? 🫠'],
 ['Ai vừa nói xấu tui sau lưng? 🤨','Tụi tui nói trước mặt, bà quay lưng thôi. 💅','Cái lý lẽ này… bá khí thiệt. 😭'],
 ['Tui nghe nói Ba ba thương tui nhất. 😌','Nguồn ở đâu? 👀','Nguồn: tui cảm nhận. ✨','Uy tín ngang dự án ma. 🫠'],
 ['Tui có thể giữ bí mật. 🤫','Bà vừa kể cho ba người. 😑','Họ là ban cố vấn, không tính. 📋'],
 ['Tui không hóng drama. Tui nghiên cứu xã hội. 🧐','Rồi cái tô bắp rang kia? 🍿','Dụng cụ nghiên cứu. 😌'],
 ['Tui đang ở trạng thái không cần ai. 🕶️','Ba ba đi đâu kìa. 👀','BA BA ƠI CHỜ TUI! 🥺','Aura rớt dưới đất kìa má. 💅'],
 ['Tình yêu là cho đi, đúng không? 🌷','Đúng. Cho tui miếng bánh đi. 🍪','Câu chuyện vừa chuyển sang tài chính. 🥲'],
 ['Tui không làm gì mà vẫn mệt. 🫠','Mệt vì tự hấp thụ aura bá khí đó. ✨','Vậy mai tui nghỉ hấp thụ. 😌'],
 ['Bà có tin tình yêu sét đánh không? ⚡','Tin. Nhưng tui thích tình yêu có đồ ăn. 🍪','Thực tế đến mức lãng mạn xin nghỉ phép. 🥲'],
 ['Tui định giảm cân từ thứ Hai. 📆','Hôm nay thứ Hai. 👀','Tui có nói thứ Hai nào đâu. 😌'],
 ['Tin nóng: có người trong vườn thích Ba ba. 🔥','Bà vừa mô tả toàn bộ dân số. 😑','Bài này tương tác cao mà. 📣'],
 ['Tui vừa có một suy nghĩ rất sâu. 🧠','Sâu cỡ nào? 🐛','Nếu ngủ trưa lúc sáng thì còn là ngủ trưa không? 🤨','Mong Tôn Hoa Sen thấy cảnh này. 🫠'],
 ['Tui muốn yêu một người trưởng thành. 🌹','Vậy đừng giành cái lá nữa. 🍃','Đó là tài sản cảm xúc của tui! 😤']
);
PAIRS.push(
 ['Pate này cực kì yarsssssssssssssssssssssh! 😋','Bà kéo chữ dài để giấu tiếng nhai hả? 👀','Không. Đó là đánh giá chuyên môn. 🧑‍🍳'],
 ['Tui vừa chấm bánh vô pate. 😌','Bạn thì tày rồi. 🫠','Ẩm thực dung hợp. Bà chưa hiểu thôi. 💅'],
 ['Tụi tui cùng nhau ăn hết bánh rồi. 🥰','Đẹp mặt hai đứa bây chưa. 🙃','Đẹp. Còn no nữa. 😌'],
 ['Tui sẽ điều hành cả khu vườn. 👑','Bạn ấy đã nói như vậy thì ok đi. 🫡','Đầu tiên: tăng khẩu phần. 🍪'],
 ['Tui đang đếm lá trên cây. 🍃','Đi làm công ty không, tui xin cho. 🫠','Có bao ăn không? 👀'],
 ['Tui vừa tỏ tình với cái bát. 🥰','Yêu cầu Ba ba rút Wi-Fi. 📵','Tình yêu này chạy offline nha. 😌'],
 ['Ba ba bảo không được ăn vụng. 🥲','Nhiệm vụ hệ thống ngày càng khó. 🎮','Có nút bỏ qua hướng dẫn không? 👀'],
 ['Tui vừa nhường bà miếng bánh cuối. 😇','Giành chùa với Phật luôn rồi. 🙏','Khoan, cho tui ngửi lần cuối. 🥺'],
 ['Cá không đi học sao vẫn biết bơi? 🐟','Hài hước tưởng mình vô duyên. 🫠','Cảm ơn, tui luyện lâu lắm. 😌'],
 ['Tui nghe đĩa than để thấy đời bớt than. 💿','Cổ điển, tôn trọng. 🫡','Rồi bà có bánh chưa? 🍪']
);
// Affectionate fictional banter about Li's music and creative work.
PAIRS.push(
 ['Ba ba nói sửa chút xíu thôi.','Tui ngủ dậy, ổng vẫn đang sửa.','Chút xíu phiên bản mở rộng.'],
 ['Ba ba hỏi thiết kế này ổn chưa.','Bà trả lời sao?','Ổn. Giờ tới giờ ăn của tụi con.'],
 ['Tui nghe nhạc Ba ba cả buổi.','Rồi thấy sao?','Buồn đẹp. Nhưng đói thì vẫn đói.'],
 ['Một Tần Số Khác hả?','Ừ. Tần số mở bánh tui bắt nhanh lắm.'],
 ['Chuyện Của Trăng nghe thơ ghê.','Chuyện của tui: ai giấu hộp pate?'],
 ['Ba ba viết nhạc tình cảm dữ.','Ở nhà ổng gọi tụi mình ăn cũng dịu.'],
 ['Bài này nghe lần đầu hơi lạ.','Lần thứ mười bà thuộc luôn rồi kìa.'],
 ['Tui không mê nhạc Ba ba đâu.','Vậy ai vừa bấm nghe lại?','Chân tự bấm. Tui vô can.'],
 ['Tui là giám đốc duyệt nhạc.','Tiêu chí là gì?','Nghe xong được thưởng thì duyệt.'],
 ['Thiết kế này có chiều sâu nha.','Sâu bằng giấc ngủ của bà không?'],
 ['Ba ba đang tìm cảm hứng.','Tui ngồi đây đẹp từ sáng giờ.'],
 ['Ba ba bảo cần thêm khoảng thở.','Thế chừa chỗ cho tui nằm với.'],
 ['Bà có hiểu concept này không?','Có. Ba ba thương nó lắm.'],
 ['Màu này đẹp hay màu kia đẹp?','Màu nào cũng đẹp. Xin đi ngủ đi ba.'],
 ['Ba ba vừa đặt tên file là final.','Tui tin. Tui chọn tin.','Rồi có final mới nữa kìa.'],
 ['Tui góp ý thiết kế rất có tâm.','Bằng cách nằm lên bàn phím hả?','Đó là dấu chân chuyên môn.'],
 ['Nhạc ổng hợp nghe lúc chiều.','Nhạc ổng hợp lúc nào có đồ ăn.'],
 ['Bài này làm tui muốn yêu.','Yêu ai?','Người đang cầm túi bánh kia.'],
 ['Ba ba hát buồn quá trời.','Ra đây tụi con ôm cái coi.'],
 ['Tui muốn lên bìa album mới.','Bà chịu đứng yên được ba giây không?'],
 ['Bìa album đẹp ha.','Có mặt tui là đẹp thêm chút nữa.'],
 ['Ba ba ơi, bài này cuốn nha.','Bà khen thiệt hay xin bánh?','Hai việc này đâu có mâu thuẫn.'],
 ['Tui làm cố vấn sáng tạo miễn phí.','Bà ăn hết thù lao bằng snack rồi.'],
 ['Tui thích đoạn nhạc này.','Suỵt. Tới khúc hay của ổng rồi.'],
 ['Ba ba làm sân khấu hoành tráng ghê.','Ở nhà khán giả toàn nằm coi.'],
 ['Tui vừa duyệt layout bằng chân.','Rồi ổng có cảm ơn không?','Ổng bấm hoàn tác.'],
 ['Ba ba lại zoom thêm chút nữa.','Cái pixel đó sắp biết tên ổng rồi.'],
 ['Tui chấm bài này chín điểm.','Thiếu một điểm ở đâu?','Chưa có tiếng tui góp giọng.'],
 ['Thiết kế đẹp, nhạc cũng hay.','Đừng nói lớn. Ba ba ngại đó.'],
 ['Tui chê cho ổng tiến bộ thôi.','Ừ. Ai chê ổng là bà giận đầu tiên.'],
 ['Ba ba đang nghe lại bản mix.','Tụi mình nghe ké thành fan cứng.'],
 ['Vườn này có gu ghê.','Có tụi mình mà. Ba ba cũng góp chút.']
);
const WEATHER_CHAT={
 rain:[['Mưa rồi. Tóc tui vừa chải xong. 🌧️','Trời đang tài trợ dầu xả đó má. 🫠','Cực kì yarssss… thôi lạnh, vô hiên! 🥶'],['Tui thích tình yêu như mưa. 🌧️','Rồi giờ sao trốn vô hiên? 👀','Lãng mạn có mái che vẫn được mà. 😌']],
 windy:[['Gió đưa cành trúc la đà. 🍃','Đưa luôn drama tới nhà tui nghe. 👀','Bạn thì tày rồi. 🫠']],
 mist:[['Ai bật chế độ hấp vườn vậy? 🌫️','Sương sớm đó má. 😑','Tui tưởng bánh bao sắp ra lò. 🥟']],
 clear:[['Nắng này tui sắp thành bánh nướng. ☀️','Bánh có nhân drama hả? 👀','Nhân phẩm. Bà đọc cho đúng. 😌']],
 cloudy:[['Mây che nắng, ai che chở tui? ☁️','Ba ba. Nhưng xếp hàng nha. 🥺','Tui lấy số từ kiếp trước rồi. 🎫']],
 night:[['Đom đóm bật đèn, tui bật chế độ nhớ Ba ba. ✨','Bà nhớ hộp pate phải không? 👀','Đừng bóc phốt dưới ánh trăng. 🌙']]
};
const NONSENSE=[
 'Nếu nằm là lười, vậy nằm nghiêng là siêng một nửa hả? 🤔',
 'Trời có mây. Cây có lá. {self} có đói. Báo cáo hết. 🫡',
 'Bánh tráng có biết ngại không mà cứ phải tráng? 🤨',
 'Nước mắt là nước. Vậy khóc có được tính là tưới cây không? 🪴',
 'Đường về nhà thì nhớ. Đường giảm ăn thì quên. 🫠',
 'Tình yêu như sóng Wi-Fi. Gần Ba ba là tự kết nối. 📶',
 'Ai đặt tên bánh ít? {self} thấy ăn mười cái vẫn ít. 🥲',
 '{self} không vô tri. {self} đang để trí tuệ sạc dự phòng. 🔋',
 'Nếu cá không nói, sao người ta biết nó cáu? 🐟',
 'Ba ba bảo đứng yên. {self} đứng yên mà thời gian vẫn chạy. ⏰',
 'Hôm nay {self} ăn chay. Chay lại chỗ có bánh. 🍪',
 '{self} vừa mở lòng. Mong có người mở hộp pate. 🥺',
 'Mây của trời. Trời của mây. Bánh của ai? Của {self}. 😌',
 'Đừng hỏi sao {self} độc thân. Một mình đã đủ ồn rồi. 📣',
 '{self} không ăn vụng. {self} kiểm thử chất lượng. 🧑‍🍳',
 'Sống có mục tiêu: bát bên trái, bát bên phải. 🎯',
 'Ba ba ơi, {self} bị thiếu ôm. Chẩn đoán do {self} tự đưa ra. 🥺',
 'Tự nhiên thấy mình bá khí. Chắc đứng gần quạt. 🌬️',
 '{self} có hai tâm trạng: đói và sắp đói. 😌',
 '{self} đang im lặng rất lớn. Ai nghe thấy thì đưa bánh. 🤫'
];
SOLO.mun_tabby=['Bông trắng như mây, mà hóng chuyện thì không bay màu. ☁️','Bông không xù lông. Bông bật chế độ bá khí. ✨','Ba ba ơi, Bông cần được ôm để hết dự án ma trong đầu. 🥺'];
const CUDDLES=['Ba ba gọi em hả? Cho em một cái ôm rồi tính.','Có mặt! Có bánh! …Ủa, chưa có bánh hả?','Em chạy tới rồi. Ba ba chịu trách nhiệm cưng em nha.','Con không có hư. Con chỉ có nhu cầu được thương hơi cao.'];
// One shared history for the whole garden, including queued replies and cuddles.
// Normalize emoji/punctuation so decorative variants cannot bypass the cooldown.
export function createDialogueMemory(cooldown = 600) {
 const heard = new Map();
 const key = text => text.normalize('NFC').toLocaleLowerCase('vi').replace(/[^\p{L}\p{N}\s{}]/gu, '').replace(/\s+/g, ' ').trim();
 return {
  available(lines,t) { return lines.every(text => !heard.has(key(text)) || t-heard.get(key(text))>=cooldown); },
  remember(lines,t) { for(const [k,at] of heard)if(t-at>=cooldown)heard.delete(k);for(const text of lines)heard.set(key(text),t); },
  choose(pool,t,random=Math.random) { const choices=pool.filter(lines=>this.available(Array.isArray(lines)?lines:[lines],t));return choices.length?choices[Math.floor(random()*choices.length)]:null; }
 };
}
export function createPetBanter(items){
 const bubble=document.createElement('div');bubble.className='pet-quote';bubble.hidden=true;bubble.setAttribute('aria-live','off');document.body.append(bubble);
 let active=null,until=0,next=performance.now()/1000+5,queue=[],lastSpeaker=null,lastCuddle=-Infinity;
 const memory=createDialogueMemory();
 // Short lines remain complete, rather than clipping a joke halfway through.
 const compact=text=>text.replaceAll('{self}','Tui').length<=76;
 const pairs=PAIRS.filter(lines=>lines.every(compact));
 function say(item,text,t){
  active=item;lastSpeaker=item;until=t+4.2;
  const own=text.replaceAll('{self}',item.name);
  bubble.textContent=own;bubble.dataset.speaker=item.name;bubble.hidden=false;
  memory.remember([text],t);
 }
 function position(){
  if(!active)return;
  const w=Math.min(228,innerWidth-28),x=Math.max(w/2+12,Math.min(innerWidth-w/2-12,active.screenX));
  bubble.style.width=w+'px';bubble.style.left=Math.round(x)+'px';
  bubble.style.top=Math.max(110,active.screenY-14)+'px';bubble.hidden=false;
 }
 return {
  cuddle(actor,t){
   const item=items.find(i=>i.actor===actor);if(!item||t-lastCuddle<2)return;
   const line=memory.choose([...CUDDLES,...(SOLO[actor.name]||[])].filter(compact),t);
   if(!line)return;lastCuddle=t;queue=[];say(item,line,t);position();next=t+7;
  },
  update(t,enabled,weather="clear",night=false){
   if(!enabled){bubble.hidden=true;active=null;queue=[];next=Math.max(next,t+3);return;}
   if(active&&(t>=until||!active.onScreen)){active=null;bubble.hidden=true;}
   if(!active&&queue.length){const q=queue.shift();if(q.item.onScreen&&q.item.actor.state!=='sleep')say(q.item,q.text,t);}
   if(!active&&t>next){
    const visible=items.filter(i=>i.onScreen&&i.actor.state!=='sleep');
    const speakers=visible.filter(i=>i!==lastSpeaker),pool=speakers.length?speakers:visible;
    if(pool.length){
     const a=pool[Math.floor(Math.random()*pool.length)];
     const neighbours=visible.filter(i=>i!==a&&Math.hypot(i.actor.x-a.actor.x,i.actor.y-a.actor.y)<250);
     const b=neighbours[Math.floor(Math.random()*neighbours.length)];
     const topical=(WEATHER_CHAT[night?'night':weather]||[]).filter(lines=>lines.every(compact));
     const lines=b&&Math.random()<.82?(Math.random()<.22?memory.choose(topical,t):null)||memory.choose(pairs,t):null;
     if(lines){
      // Reserve the complete exchange now, preventing another pet/click from borrowing a reply.
      memory.remember(lines,t);say(a,lines[0],t);
      queue=lines.slice(1).map((text,i)=>({item:i%2===0?b:a,text}));next=t+lines.length*4.2+3+Math.random()*3;
     }else{
      const line=memory.choose([...(SOLO[a.actor.name]||SOLO[a.name]||[]),...NONSENSE].filter(compact),t);
      if(line)say(a,line,t);next=t+7+Math.random()*3;
     }
    }else next=t+3;
   }
   position();
  }
 };
}
