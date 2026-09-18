// Album copy comes from the selected real catalog entry, never a guessed biography.
export function albumIntroduction(album){
  if(!album)return '';
  const description=String(album.description||album.sub||'Mình nghe cùng Li một chút nha.').replace(/\s+/g,' ').trim();
  return `“${album.name}” nè. ${description}`;
}
export function chooseDifferent(items,previous,random=Math.random){
  const choices=items.filter(x=>x!==previous);return choices[Math.floor(random()*choices.length)]||items[0];
}
export const gardenTips=[
  'Chạm vào sạp, chọn một album nhạc rồi bấm Play. Li chờ bạn nghe cùng nè.',
  'Mở bánh răng rồi chạm nốt nhạc để nghe tiếng gió và chim trong vườn nha.',
  'Mặt trời, mặt trăng để đổi sáng tối; nút đồng hồ trả vườn về giờ trên máy bạn.',
  'Chạm “Điều để dành” để xem những hình ảnh và thước phim Li giữ lại nha.',
  'Muốn khu vườn đứng yên một chút, bạn chạm nút lấp lánh ở góc trên nhé.'
];

// A shuffled bag makes every line get a turn before any is repeated.
export function createDialogueDeck(items,random=Math.random){
  const source=[...new Set(items)];let bag=[],last='';
  return ()=>{
    if(!bag.length){
      bag=[...source];
      for(let i=bag.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]];}
      if(bag.length>1&&bag[bag.length-1]===last)[bag[0],bag[bag.length-1]]=[bag[bag.length-1],bag[0]];
    }
    return last=bag.pop()||'';
  };
}
export function dialogueDelay(text,random=Math.random){
  const words=String(text).trim().split(/\s+/).length;
  return Math.max(14000+random()*6000,3500+words*370);
}
export const gardenQuotes=[
  'Ghé vườn nhà Li chơi chút nha. Nghe vài bài hát Li sáng tác.',
  'Ở đây chỉ có chill, không có chấm công.',
  'Tâm trạng đang loading hả? Li để nhạc chờ nha.',
  'Không cần tỏa sáng liên tục đâu. Đèn vườn còn có giờ nghỉ mà.',
  'Deadline đứng ngoài cổng nhé. Trong này đang tới đoạn hay.',
  'Có những chuyện chưa biết giải quyết sao. Mình nghe hết bài này đã.',
  'Vườn nhỏ thôi, nhưng luôn có chỗ cho bạn.',
  'Hôm nay làm người lớn mệt chưa? Vào đây làm khách của Li một lát.',
  'Nếu hôm nay chỉ đủ pin để nghe nhạc, vậy cũng được mà.',
  'Một chút nhạc, một chút bình yên. Không cần thêm topping đâu.',
  'Cây trong vườn không hỏi lương, không hỏi cưới. Bạn cứ yên tâm ngồi.',
  'Mình chưa giải quyết được cả thế giới. Nhưng chọn một bài nhạc thì được nè.',
  'Đừng so hậu trường của mình với sân khấu của người ta nha.',
  'Có ngày nở hoa, có ngày tưới cây. Đâu phải ngày nào cũng ra mắt album.',
  'Não mở nhiều tab quá thì đóng bớt. Chừa tab nhạc này cũng được.',
  'Hôm nay chưa năng suất lắm? Cây cũng đâu ra quả mỗi thứ Hai.',
  'Li đang tập sống chậm. Mạng lag không tính nha.',
  'Thả một chiếc vai xuống nào. Ừ, cái vai đang gồng đó.',
  'Một bài hát hay đôi khi giống người hiểu mình mà chưa cần hỏi gì.',
  'Vườn không có nút tua nhanh cuộc đời. May ghê.',
  'Bạn không cần có chuyện vui mới được ghé. Chuyện buồn cũng có ghế ngồi.',
  'Việc khó để từ từ gỡ. Dây tai nghe còn gỡ được mà.',
  'Đã tới đây rồi thì thở ra một cái. Không thu phí đâu.',
  'Bình yên không cần hoành tráng. Có khi chỉ là một đoạn điệp khúc.',
  'Hôm nay mình thử dịu với bản thân như dịu với mèo nhé.',
  'Đừng ép lòng mình phải đẹp trời suốt. Vườn có chỗ trú mưa mà.',
  'Nhạc này không chữa được deadline, nhưng có thể ngồi cùng bạn một lúc.',
  'Chuyện chưa tới đừng mở họp trong đầu vội nha.',
  'Có những ngày chiến thắng là ăn đủ bữa, ngủ đủ giấc. Vẫn tính điểm.',
  'Bạn cứ nghe. Li ở đây, cây cũng ở đây, chẳng ai giục đâu.',
  'Được nghỉ một chút không cần mã giảm giá hay thành tích kèm theo.',
  'Nếu lòng đang hơi rối, mình gỡ từng nút. Không cần giật cả cuộn.'
];
export const nightQuotes=[
  'Tối rồi, để những điều vội vã ngủ ngoài cổng nhé.',
  'Hết giờ họp với overthinking rồi. Mời các suy nghĩ ra về.',
  'Trăng lên ca rồi. Bạn có thể tan ca được chưa?',
  'Một bài nữa thôi nha. Câu này Li cũng tự nhắc mình hoài.',
  'Hôm nay tới đây là được. Mai mình mở cửa vườn tiếp.',
  'Đêm không đòi bạn phải sáng chói. Một đốm đèn nhỏ cũng xinh.'
];

// Optional spoken paraphrases only. The daily dialog always shows the locked
// source title/message, and the seeded draw is unchanged.
const dailyAsides={
  0:['Chưa có hết bản đồ cũng được. Mình đi bước nhỏ trước, khỏi đặt tour cả cuộc đời.','Muốn bắt đầu lại hả? Chậm một nhịp xem mình đang đi tới hay đang chạy trốn nha.'],
  1:['Bạn có đồ nghề rồi đó. Bắt tay làm thôi, đừng đợi vũ trụ gửi thêm biên bản.','Không cần điều khiển cả vũ trụ. Làm một việc nhỏ trước đã nha.'],
  2:['Trực giác đang nhắn tin đó. Mình yên một chút để đọc nha.','Chưa chắc thì ghi cảm giác xuống đã. Không phải tin nhắn nào cũng cần trả lời ngay.'],
  3:['Bạn chăm điều mình thương khéo ghê. Nhớ tưới luôn chiếc cây tên là mình nha.','Chăm cả vườn mà quên tưới mình thì hơi căng nha. Mình nghỉ chút đã.'],
  4:['Ranh giới rõ một chút, lòng đỡ chạy vòng vòng. Cổng vườn cũng cần bản lề mà.','Cầm lái vừa thôi nha. Nắm chặt quá thì tay mỏi trước khi tới nơi đó.'],
  7:['Giữ hướng mình chọn nha. Không phải xe nào bấm còi cũng cần mình rẽ theo.','Đạp ga hoài mà chưa rõ đi đâu thì mình tấp vào xem lại bản đồ nhé.'],
  8:['Mềm một chút vẫn là mạnh. Cây tre đâu cần tập gồng cả ngày.','Mạnh mẽ cũng có nút nghỉ. Thử nói với người mình tin: hôm nay mình hơi mệt.'],
  9:['Ở một mình một chút để nghe mình rõ hơn. Chế độ im lặng cũng có ích mà.','Ở ẩn hơi lâu rồi hả? Gửi một lời chào cho người mình quý thử nha.'],
  12:['Tạm dừng cũng là một việc. Đôi khi đổi góc nhìn là thấy lối đi.','Nghỉ đủ rồi thì thử một bước nhỏ nha. Ghế vườn êm nhưng mình còn đường để đi.'],
  14:['Mỗi thứ vừa một chút. Đời đâu phải ly trà cứ thêm topping là ngon.','Lịch hơi đầy rồi đó. Mình bớt một món để còn chỗ thở nha.'],
  19:['Vui thì cho mình vui nha. Nụ cười không cần viết đề xuất xin duyệt.','Đừng giảm sáng mình chỉ vì sợ nổi bật. Nắng đâu xin lỗi vì trời đẹp.'],
  53:['Nghỉ một nhịp nha. Pin yếu thì sạc, đâu ai mắng điện thoại lười.','Đang nghỉ mà tự mắng mình thì não vẫn tăng ca đó. Thử cho nó tan làm nha.'],
  65:['Cân vài việc cùng lúc cũng được. Nhớ chừa một tay để cầm ly nước nha.','Lịch kín quá rồi. Bớt một việc không làm bạn bớt đáng quý đâu.'],
  68:['Cần giúp thì cứ gọi nha. Vườn này có nhiều hơn một cái xẻng.','Ôm một mình nặng lắm. Thử nhờ một người đáng tin chia bớt nha.'],
  70:['Cây đang lớn dưới đất đó. Chưa thấy hoa không có nghĩa là công chăm vô ích.','Đừng nhổ cây lên mỗi ngày để kiểm tra rễ. Cho điều mình làm thêm chút thời gian nha.'],
  71:['Một chút mỗi ngày cũng thành cả vườn. Không cần mọc rừng qua đêm đâu.','Chưa hoàn hảo vẫn được tính là có làm. Bản nháp cũng là một bước tiến mà.'],
  76:['Sự chăm sóc của bạn ấm ghê. Kiểu ấm có cơm ngon, nước đủ và người được nhớ tới.','Bạn cũng ở trong danh sách cần chăm nha. Đừng phục vụ cả vườn rồi quên bữa mình.']
};
export function dailyAside(message){
  return dailyAsides[message.id]?.[message.closed?1:0]||`“${message.title}” — nghe như tên một bài hát ha. Mở ra đọc cùng Li nha.`;
}
