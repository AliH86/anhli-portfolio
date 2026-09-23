// One editorial source for the world, reading routes and /flat.
// Unverified dates, scale claims and client imagery deliberately remain out.
export const site = {
  name: 'ANH LI', tagline: 'The Dandelion Garden',
  email: 'ali.readytostart@gmail.com',
  headline: 'Một khu vườn của những điều tôi làm, những người tôi gặp, và những thứ ở lại.',
  intro: 'Producer · Show Director · Music Lover · Dad of 3 Daughters.',
  about: 'Từ thiết kế không gian, mình đi qua sản xuất sáng tạo, sân khấu, hình ảnh rồi đến âm nhạc. Mỗi chặng cho mình thêm một cách kể chuyện; sự tò mò là sợi chỉ nối tất cả lại với nhau.',
  philosophy: 'Mình thích dựng nên những khoảnh khắc còn ở lại với người ta sau khi mọi thứ đã khép màn.',
  musicNote: 'AI là một nhạc cụ trong căn phòng này. Trái tim, lựa chọn và trách nhiệm sáng tạo thuộc về con người.',
};
export const destinations = [
  {id:'garden', label:'GARDEN', path:'', place:'Nhà & sân', text:'Nơi mọi thứ bắt đầu, và là đường về.'},
  {id:'music', label:'MUSIC', path:'sap/', place:'Cái Sạp', text:'Nghe, lưu giữ, và chia sẻ.'},
  {id:'about', label:'ABOUT', path:'about/', place:'Về mình', text:'Chân dung, hành trình nghề, hình và video.'},
];
export const routes = [
  ...destinations,
  {id:'flat',label:'Bản chữ',path:'flat/'},
  {id:'sky',label:'Inner World · Jyotiṣa',path:'sky/',parent:'about'},
];
export const services = [
  {label:'SHOW DIRECTION',title:'Dựng một đêm diễn',text:'Concept, flow, cue, casting, và những quyết định trên sàn lúc dựng.'},
  {label:'CREATIVE PRODUCTION',title:'Đi từ brief tới thật',text:'Timeline, đội, ngân sách, vận hành — để ý tưởng không chết ở file trình bày.'},
  {label:'LIVE CONTENT & MUSIC',title:'Phần nghe của cả đêm',text:'Medley, band, chuyển bài, và chỗ nào nên để im lặng.'},
];
export const method = [
  {label:'BRIEF',title:'Hiểu điều cần ở lại.',text:'Việc đầu tiên không phải nghĩ ý tưởng, mà là hiểu khách muốn người ta cảm được gì khi ra về. Cái đó quyết hết phần sau.'},
  {label:'CREATIVE FRAME',title:'Một câu để cả đội nhớ.',text:'Một câu ngắn đủ để cả đội nhớ. Nếu phải giải thích dài thì nó chưa đúng — và trên sàn dựng sẽ không ai làm theo được.'},
  {label:'SPACE',title:'Cho ý tưởng một không gian.',text:'Dựng câu chuyện thành không gian, nhịp diễn và khoảnh khắc khán giả cùng sống trong đó.'},
  {label:'MOMENT',title:'Những gì còn ở lại.',text:site.philosophy},
  {label:'MY ROLE',title:'Show Director · Creative Producer',text:'Đưa ý tưởng từ bản phác đến hiện trường, giữ trọn tinh thần qua từng khâu.'},
];
export const chapters = [
  {id:'beginning',label:'Bắt đầu',title:'Từ không gian đến câu chuyện',text:site.about},
  {id:'craft',label:'Làm nghề',title:'Những khoảnh khắc thật',text:'Dựng câu chuyện thành không gian, nhịp diễn và khoảnh khắc khán giả cùng sống trong đó. Đưa ý tưởng từ bản phác đến hiện trường, giữ trọn tinh thần qua từng khâu.'},
  {id:'today',label:'Bây giờ',title:'Một thế giới của riêng mình',text:'Cái Sạp nhạc — tự viết, tự phối và tự dựng nên cả thế giới. Nhạc sĩ độc lập “tự phong” — làm bằng tự do, đi bằng niềm vui. Đứng lớp tại AIM Academy — chia sẻ những gì nghề đã dạy mình.'},
];
// Public personal album art already present in the portfolio. No client assets.
export const fragments = [
  {src:'uploads/mot-tan-so-khac.jpg',title:'Một Tần Số Khác',kind:'Artwork · Cái Sạp'},
  {src:'uploads/chuyen-cua-trang.jpg',title:'Chuyện Của Trăng',kind:'Artwork · Cái Sạp'},
  {src:'uploads/another-stage.jpg',title:'Another Stage',kind:'Artwork · Cái Sạp'},
  {src:'uploads/khong-co-gi.jpg',title:'Không Có Gì!!?!',kind:'Artwork · Cái Sạp'},
];

export const aliases = [{path:'works/'},{path:'works/how/',hash:'#resume'},{path:'visual/',hash:'#about-gallery'},{path:'story/'}];
