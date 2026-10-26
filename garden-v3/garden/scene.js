// Li's garden as one painted picture (world/garden_day.png, 1536x1280, same pixel
// density as Li). Everything here is in picture pixels; feet positions for Li.

export const W = 1536, H = 1280;

// Where Li cannot stand: rectangles [x0, y0, x1, y1] and ellipses [cx, cy, rx, ry].
export const BLOCK_RECTS = [
  [0, 0, 465, 535],            // mango grove and the bamboo fence
  [455, 0, 1030, 652],         // the house (porch is raised; Li stops at the steps)
  [455, 600, 540, 668],        // brick column at the porch corner
  [1030, 0, 1536, 600],        // trees and the wooden fence behind the side yard
  [110, 530, 215, 572],        // tool rack
  [212, 540, 278, 682], [288, 540, 392, 620],   // raised vegetable beds
  [330, 600, 415, 706],        // the well
  [194, 772, 214, 792],        // papaya trunk
  [0, 880, 300, 1060],         // under the hammock trees
  [495, 640, 605, 708],        // pots left of the steps
  [970, 630, 1030, 705],       // pots and fern right of the porch
  [1022, 640, 1080, 702],      // brick planter
  [1222, 646, 1262, 672],      // frangipani trunk foot
  [1108, 660, 1232, 745],      // bench
  [1298, 560, 1520, 785],      // music stall
  [1098, 1040, 1140, 1066], [1140, 1028, 1180, 1054], [1180, 1014, 1222, 1042], [1222, 996, 1264, 1030],   // along the foot of the cinema screen
  [1252, 1060, 1352, 1122],    // campfire pit
  [25, 1040, 70, 1095],        // left hammock tree trunk
  [646, 978, 694, 1002],      // Lucky's statue
  [0, 1250, W, H], [0, 0, 10, H], [W - 10, 0, W, H],
];
export const BLOCK_ELLIPSES = [
  [705, 1110, 152, 86],        // lotus pond
  [955, 1042, 72, 40],         // the little pond on the right
];
export const WALK_RECTS = [[748, 1018, 935, 1118]];   // the plank bridge crosses the water

// Tall things that stand in front of whoever walks behind them are cut out of the
// picture as sprites by tools/cutout.py (world/front/front.json): papaya, frangipani,
// bench, cinema screen. Each is sorted with Li and the animals by its `base`.

// Hover labels; a click walks Li to `go`.
export const LUCKY = [670, 1000];   // Lucky, Li's first dog: her statue by the pond
export const ZONES = [
  { id: 'lucky', r: [630, 920, 710, 1004], go: [724, 1004], label: ['Lucky', 'bé đầu tiên · 12 năm bên Li'] },
  { id: 'house', r: [455, 245, 1030, 700], go: [678, 718], label: ['Nhà của Li', 'hiên nhà · tối Li ngủ ở đây'] },
  { id: 'stall', r: [1298, 520, 1520, 790], go: [1268, 806], label: ['Sạp nhạc', '26 album · 213 bài'] },
  { id: 'cine', r: [1095, 880, 1460, 1180], go: [1165, 1112], label: ['Rạp ngoài trời', 'tối có lửa trại'] },
  { id: 'pond', r: [550, 1000, 1030, 1200], go: [840, 1066], label: ['Ao sen', 'chiều Li ra cầu ngồi'] },
  { id: 'garden', r: [110, 520, 410, 710], go: [300, 735], label: ['Vườn rau', 'sáng Li tưới cây'] },
  { id: 'hammock', r: [0, 885, 300, 1120], go: [120, 1130], label: ['Góc võng', 'đọc sách, uống trà'] },
];

export const SCHEDULE = [
  { from: 0, to: 6, sleep: true },
  { from: 6, to: 7, at: [678, 718], face: 'south' },
  { from: 7, to: 10, at: [300, 740], face: 'north', open: true },
  { from: 10, to: 12, at: [1170, 775], face: 'south', open: true },
  { from: 12, to: 17, at: [1405, 815], face: 'north' },
  { from: 17, to: 19, at: [840, 1066], face: 'south', open: true },
  { from: 19, to: 22, at: [1165, 1112], face: 'east' },
  { from: 22, to: 24, sleep: true },
];
export const STALL_HOST = [1268, 806];   // where Li stands to host the stall, beside it, facing out
export const SHELTER = [678, 718];
export const START = [880, 860];

export const LIGHTS = [
  { x: 690, y: 606, r: 96, rgb: '255,214,150', window: true },   // open doors: light spills onto the porch
  { x: 663, y: 338, r: 34, rgb: '255,214,150', window: true },   // dormer
  { x: 1410, y: 610, r: 60, flicker: true },                     // stall string lights
  { x: 1380, y: 960, r: 70, flicker: true },                     // cinema string lights
  { x: 1300, y: 1088, r: 90, rgb: '255,170,90', flicker: true, fire: true },   // campfire
  { x: 670, y: 990, r: 40, rgb: '255,226,170', lucky: true },                  // a small lamp at Lucky's statue
];
export const FIRE = [1302, 1100];
export const BUTTERFLIES = [[300, 760], [1280, 860], [560, 980], [880, 700]];
export const POND = { x: 705, y: 1110, rx: 120, ry: 60 };
