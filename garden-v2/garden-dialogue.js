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
  'Nút nốt nhạc bật tiếng gió, chim và những vị khách nhỏ trong vườn đó.',
  'Mặt trời, mặt trăng để đổi sáng tối; nút đồng hồ trả vườn về giờ trên máy bạn.',
  'Chạm “Điều để dành” để xem những hình ảnh và thước phim Li giữ lại nha.',
  'Muốn khu vườn đứng yên một chút, bạn chạm nút lấp lánh ở góc trên nhé.'
];
