export function showsPlate(){
  const root='./assets/garden/shows/v1/';
  return `<div class="dg-shows-plate"><picture><source media="(max-width:700px), (max-width:1000px) and (orientation:portrait)" srcset="${root}shows-mobile.png"><img src="${root}shows-desktop.png" width="1672" height="941" alt="" decoding="async" fetchpriority="high"></picture></div>`;
}
