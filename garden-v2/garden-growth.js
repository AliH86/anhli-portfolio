// A short illustrated growth cycle: established base -> extending shoot ->
// alternating nodes -> leaves unfolding at their petioles. Daisy stalks are
// separate plants in the corner bouquet, not flowers growing from ivy nodes.
const shoot='M36 204 C23 166 42 150 32 123 C24 91 22 62 43 42 C61 24 111 38 140 32 C173 27 220 35 254 18';
const leaves=[
  [33,166,-68,1.10,.72],[31,139,49,1.29,.9],
  [29,108,-72,1.48,.84],[30,78,52,1.72,1],
  [48,39,-45,2.02,.86],[83,33,138,2.27,.72],
  [120,34,-24,2.56,.78],[158,31,146,2.84,.7],
  [196,30,-32,3.12,.65],[232,25,135,3.37,.54]
];
function leaf([x,y,angle,delay,size]){
  return `<g transform="translate(${x} ${y}) rotate(${angle}) scale(${size})"><g class="vine-leaf" style="--delay:${delay}s"><path d="M0 0 C-13-8-17-26 0-38 C16-26 13-8 0 0Z"/><path class="leaf-light" d="M0-36C-8-25-5-10 0-2C0-15 5-28 0-36Z"/><path class="leaf-vein" d="M0-2L0-34M0-13L-7-21M0-20L6-27"/></g></g>`;
}
function daisy(x,y,delay){
  const petals=Array.from({length:10},(_,i)=>`<g transform="rotate(${i*36})"><path class="vine-petal" style="--delay:${delay+i*.035}s" d="M0 0C-5-4-6-16 0-18C6-16 5-4 0 0Z"/></g>`).join('');
  return `<g transform="translate(${x} ${y})"><g class="vine-bud" style="--delay:${delay-.5}s"><circle r="4.6" fill="#75823b"/>${petals}<circle class="flower-heart" r="4.5"/><circle cx="-1" cy="-1.2" r="1.8" fill="#edcc65"/></g></g>`;
}
export function frameGrowthMarkup(trailing=false){
  return `<svg class="frame-growth${trailing?' trailing':''}" viewBox="0 0 280 245" aria-hidden="true" focusable="false">
    <path class="growth-stem" pathLength="1" d="${shoot}"/>
    <path class="growth-stem highlight" pathLength="1" d="${shoot}"/>
    ${leaves.map(leaf).join('')}
    <path class="growth-stem" style="--delay:1.8s;--duration:1.4s;stroke-width:1.8" pathLength="1" d="M33 104Q12 69 12 43"/>
    <path class="growth-stem" style="--delay:2s;--duration:1.5s;stroke-width:1.8" pathLength="1" d="M34 105Q12 72 48 65"/>
    ${daisy(12,43,3.65)}${daisy(48,65,3.95)}
  </svg>`;
}
export function mountFrameGrowth(room,name){
  room.querySelectorAll('.frame-growth').forEach(e=>e.remove());
  if(name==='profile'||name==='gallery')room.insertAdjacentHTML('beforeend',frameGrowthMarkup()+frameGrowthMarkup(true));
}
