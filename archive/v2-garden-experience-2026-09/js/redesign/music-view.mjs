export function musicPlate(){
 const root='./assets/garden/music/v1/',portrait='(max-width:700px), (max-width:1000px) and (orientation:portrait)';
 return `<div class="dg-music-plate"><picture class="dg-music-background"><source media="${portrait}" srcset="${root}music-mobile.png"><img src="${root}music-desktop.png" width="1672" height="941" alt="" decoding="async" fetchpriority="high"></picture><picture class="dg-music-host" data-height-m="1.7"><source media="${portrait}" srcset="${root}host-mobile.png"><img src="${root}host-desktop.png" width="2560" height="1440" alt="" decoding="async"></picture></div>`;
}
