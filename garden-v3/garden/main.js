import { makeNavigator } from './navigation.js?v=69';
import { initInterface } from './interface.js?v=69';
import { reducedMotion, announce } from './motion.js?v=69';
import * as S from './scene.js?v=69';
import * as live from '../map/living.js?v=69';
import * as A from './alive.js?v=69';
import * as Z from './animals.js?v=69';
import { initStall } from './stall.js?v=69';
import { initMenu } from './menu.js?v=69';
import { initRooms, initGate, ROOMS } from './rooms.js?v=69';
import * as AM from './ambient.js?v=69';
import * as N from './night.js?v=69';
import * as P from './pets.js?v=69';
import * as WET from './puddles.js?v=69';
import { createDailyReader } from './daily.js?v=69';
import { createDialogueDeck, gardenQuotes, nightQuotes, dailyAside } from './dialogue.js?v=69';

const SOUND = '../web/assets/';
const loadImg = (src) => new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = src; });
const ground = await loadImg('../world/garden_day.png');
// Repair the repeated flower strips on a runtime copy of the original painting.
const flowerSource=await loadImg('../world/flower-repair-v64.png');
const flowerLayer=document.createElement('canvas'); flowerLayer.width=120; flowerLayer.height=260;
const fg=flowerLayer.getContext('2d'); fg.imageSmoothingEnabled=false;
fg.drawImage(flowerSource,100*flowerSource.width/288,20*flowerSource.height/288,120*flowerSource.width/288,260*flowerSource.height/288,0,0,120,260);
fg.globalCompositeOperation='destination-in';
for(const axis of ['x','y']){
  const size=axis==='x'?120:260, gradient=axis==='x'?fg.createLinearGradient(0,0,120,0):fg.createLinearGradient(0,0,0,260);
  gradient.addColorStop(0,'transparent'); gradient.addColorStop(12/size,'black'); gradient.addColorStop(1-12/size,'black'); gradient.addColorStop(1,'transparent');
  fg.fillStyle=gradient; fg.fillRect(0,0,120,260);
}
const sceneGround=document.createElement('canvas'); sceneGround.width=ground.width; sceneGround.height=ground.height;
const sg=sceneGround.getContext('2d'); sg.imageSmoothingEnabled=false; sg.drawImage(ground,0,0); sg.drawImage(flowerLayer,1000,220);
// Replacement is a separate, reviewable layer; the original painting is untouched.
const cinemaSource = await loadImg('../world/cinema-corner-v58.png');
const cinemaX=1040, cinemaY=830, cinemaSize=288;
const cinemaLayer=document.createElement('canvas'); cinemaLayer.width=cinemaLayer.height=cinemaSize;
const cinemaCtx=cinemaLayer.getContext('2d'); cinemaCtx.imageSmoothingEnabled=false;
cinemaCtx.drawImage(cinemaSource,0,0,cinemaSize,cinemaSize);
cinemaCtx.globalCompositeOperation='destination-in';
for(const axis of ['x','y']){
  const gradient=axis==='x'?cinemaCtx.createLinearGradient(0,0,cinemaSize,0):cinemaCtx.createLinearGradient(0,0,0,cinemaSize);
  gradient.addColorStop(0,'transparent'); gradient.addColorStop(14/cinemaSize,'black'); gradient.addColorStop(1-14/cinemaSize,'black'); gradient.addColorStop(1,'transparent');
  cinemaCtx.fillStyle=gradient; cinemaCtx.fillRect(0,0,cinemaSize,cinemaSize);
}
cinemaCtx.globalCompositeOperation='destination-out';
// Keep the original campfire and logs, whose animation and collision use those positions.
cinemaCtx.fillStyle='#000'; cinemaCtx.fillRect(180,205,108,83);
cinemaCtx.globalCompositeOperation='source-over';
await A.buildWind(sceneGround);
const pond = A.buildPond(sceneGround, S.BLOCK_ELLIPSES);
const fire = A.makeFire(S.FIRE[0], S.FIRE[1]);
const butterflies = A.makeButterflies(S.BUTTERFLIES);
let bits = [];
const puddles = WET.makePuddles();
const frontMeta = await (await fetch('../world/front/front.json', { cache: 'no-cache' })).json();
const front = await Promise.all(Object.entries(frontMeta).map(async ([name, m]) => ({ name, ...m, img: await loadImg(`../world/front/${name}.png?v=69`) })));
const cinemaShrub=front.find(f=>f.name==='shrub_cine');
if(cinemaShrub){
  // Reuse the original plant's transparency, but sample the newly painted view.
  const c=document.createElement('canvas'); c.width=cinemaShrub.w; c.height=cinemaShrub.h;
  const g=c.getContext('2d'); g.imageSmoothingEnabled=false;
  g.drawImage(sceneGround,cinemaShrub.x,cinemaShrub.y,cinemaShrub.w,cinemaShrub.h,0,0,cinemaShrub.w,cinemaShrub.h);
  g.drawImage(cinemaLayer,cinemaX-cinemaShrub.x,cinemaY-cinemaShrub.y);
  g.globalCompositeOperation='destination-in'; g.drawImage(cinemaShrub.img,0,0);
  cinemaShrub.img=c;
}
const zoo = await Z.loadAnimals('../animals/');
const animals = Z.makeAnimals();
const petSprites = await P.loadPets('../pets/');
const pets = P.makeGardenPets(petSprites);
const luckyImg = await loadImg('../world/lucky.png');
const liSay = { text: '', until: 0 };
const smallSprites = await P.loadSmall('../pets/');
const small = P.makeSmall();
const nightSprites = await N.loadNight('../pets/_night/');
const night_ = N.makeNight();
const stall = await initStall({ onOpenChange: (on) => {
  document.body.classList.toggle('at-stall', on);
  if (!on) return;
  if (rooms.current) rooms.close();
  tag.classList.remove('on'); li.dir = 'south'; li.hidden = false; li.userUntil = performance.now() / 1000 + 600;
  if (Math.hypot(li.x - S.STALL_HOST[0], li.y - S.STALL_HOST[1]) > 40) walkTo(...S.STALL_HOST);   // Li comes over to host
} });
const bubbleEl = document.getElementById('bubble');
const bubbleWords = document.getElementById('bubble-words');
const dailyInvite = document.getElementById('daily-invite');
const dailyDialog = document.getElementById('daily-dialog');
const readDaily = createDailyReader();
const nextQuote = createDialogueDeck(gardenQuotes), nextNightQuote = createDialogueDeck(nightQuotes);
let nextTalk = Infinity, dailyUntil = 0, talkCount = 0, readingDaily = false;
async function openDaily() {
  try {
    const message = await readDaily();
    const img = document.getElementById('daily-image');
    img.src = message.image; img.alt = message.name; img.classList.toggle('is-closed', message.closed);
    document.getElementById('daily-date').textContent = `Thông điệp ngày ${message.dateKey.split('-').reverse().join('/')}`;
    document.getElementById('daily-name').textContent = message.name;
    document.getElementById('daily-title').textContent = message.title;
    document.getElementById('daily-text').textContent = message.message;
    if (!dailyDialog.open) dailyDialog.showModal();
  } catch { announce('Chưa tải được thông điệp. Mình thử lại nhé.'); }
}
document.getElementById('daily-close').addEventListener('click', () => dailyDialog.close());
dailyInvite.addEventListener('click', e => { e.stopPropagation(); openDaily(); });
const rooms = await initRooms({
  onOpenChange: (id) => {
    document.body.classList.toggle('in-room', !!id);
    if (!id) return;
    if (stall.isOpen) stall.close();
    tag.classList.remove('on'); li.hidden = false; li.userUntil = performance.now() / 1000 + 600;
    const R = ROOMS[id]; if (Math.hypot(li.x - R.host[0], li.y - R.host[1]) > 40) walkTo(...R.host);
  },
  onPlayVideo: () => stall.pause(),
});
const AU_LINH = 'https://au-linh-ky-thu.netlify.app/';
const menu = initMenu({
  sprites: zoo,
  pets: petSprites,
  items: [
    { id: 'stall', label: 'Sạp nhạc', icon: 'ui/menu/stall.png' },
    { id: 'house', label: 'Nhà Li', icon: 'ui/menu/house.png' },
    { id: 'garden', label: 'Vườn rau', icon: 'ui/menu/garden.png' },
    { id: 'pond', label: 'Ao sen', icon: 'ui/menu/pond.png' },
    { id: 'hammock', label: 'Góc võng', icon: 'ui/menu/hammock.png' },
    { id: 'cine', label: 'Rạp phim', icon: 'ui/menu/cine.png' },
    { id: 'aulinh', label: 'Ấu Linh ↗', icon: 'ui/menu/aulinh.png', hint: 'Cổng sang game Ấu Linh (mở tab mới)' },
  ],
  onPick: (it) => {
    if (it.id === 'aulinh') { window.open(AU_LINH, '_blank', 'noopener'); return; }
    visit(it.id);
  },
});
function visit(id) {
  document.querySelectorAll('.mbtn').forEach(b => b.setAttribute('aria-current', b.dataset.id === id ? 'location' : 'false'));
  if (rooms.current) rooms.close(); if (stall.isOpen) stall.close();
  pendingOpen = null;
  if (!id) return;
  const z = S.ZONES.find(q => q.id === id); if (!z) return;
  li.userUntil = performance.now() / 1000 + 60; li.hidden = false; cam.wide = false;
  if (id === 'stall') stall.open();
  else if (ROOMS[id]) rooms.open(id);
  else { walkTo(...z.go); if(id==='garden')li.waterUntil=performance.now()/1000+90; announce(id === 'pond' ? 'Ra cầu ngắm sen một chút.' : 'Ghé luống rau, tưới cây cùng Li.'); }
}
let pendingOpen = null;      // a zone to open once Li gets there
let notes = [];              // music notes floating up from the stall

const tag = document.getElementById('tag');

// ---------- Li: two outfits, idle + walk in 8 directions ----------
const DIRS8 = ['east', 'north-east', 'north', 'north-west', 'west', 'south-west', 'south', 'south-east'];
const liM = await (await fetch('../li2/manifest.json', { cache: 'no-cache' })).json();
const FPS = { idle: 4, walk: 10 };
const outfits = {};
for (const [name, counts] of Object.entries(liM.outfits)) {
  outfits[name] = {};
  for (const [anim, n] of Object.entries(counts)) {
    outfits[name][anim] = {};
    await Promise.all(DIRS8.map(async (d) => { outfits[name][anim][d] = await Promise.all([...Array(n).keys()].map((i) => loadImg(`../li2/${name}/${anim}/${d}/${i}.png`))); }));
  }
}
const LI_SCALE = .70; // display only; all source pixels stay unchanged
const idleClean = Object.fromEntries(await Promise.all(DIRS8.map(async d => [d, await loadImg(`../li2/corrected/rotation-${d}.png`)])));
const northIdle = await Promise.all([0,1,2,3].map(i => loadImg(`../li2/corrected/north-${i}.png`)));
const wateringFrames=await Promise.all(Array.from({length:9},(_,i)=>loadImg(`../li2/watering/${i}.png`)));
const OUTFITS = Object.keys(outfits).filter((k) => k !== 'rain');
const poseImg = Object.fromEntries(await Promise.all(Object.entries(S.POSES).map(async ([k, p]) => [k, await loadImg(p.img)])));
const poseMasks = await (await fetch('../li2/pose/masks.json')).json();
// Extract only the approved character pixels. Existing painted furniture remains the support.
for (const [name, source] of Object.entries(poseImg)) {
  const cv = document.createElement('canvas'); cv.width=source.width; cv.height=source.height;
  const g=cv.getContext('2d'); g.drawImage(source,0,0); const data=g.getImageData(0,0,cv.width,cv.height), poly=poseMasks[name].polygon;
  for(let y=0;y<cv.height;y++) for(let x=0;x<cv.width;x++) {
    let inside=false;
    for(let i=0,j=poly.length-1;i<poly.length;j=i++) { const a=poly[i],b=poly[j]; if((a[1]>y+.5)!==(b[1]>y+.5) && x+.5<(b[0]-a[0])*(y+.5-a[1])/(b[1]-a[1])+a[0]) inside=!inside; }
    if(!inside)data.data[(y*cv.width+x)*4+3]=0;
  }
  g.putImageData(data,0,0); poseImg[name]=cv;
}
const li = { x: S.START[0], y: S.START[1], dir: 'south', anim: 'idle', t: 0, target: null, path: [], outfit: OUTFITS[0] };
// Names are attached to the living actors, not painted into the artwork.
const petLabels=document.createElement('div'); petLabels.className='pet-labels'; document.body.append(petLabels);
const nameItems=[...pets.map(p=>({actor:p,name:P.PET_NAMES[p.name],kind:'pet'})),{actor:animals.cat,name:'Jo',kind:'cat'}];
for(const item of nameItems){
 const b=document.createElement('button');b.type='button';b.className='pet-name';b.textContent=item.name;b.setAttribute('aria-label',`Gọi ${item.name} lại chơi cùng Ba ba`);b.hidden=true;
 b.addEventListener('click',()=>callChild(item.actor,item.kind));petLabels.append(b);item.node=b;
}

// ---------- where Li can walk ----------
const inRect = (x, y, r) => x > r[0] && x < r[2] && y > r[1] && y < r[3];
const inEll = (x, y, e) => ((x - e[0]) / e[2]) ** 2 + ((y - e[1]) / e[3]) ** 2 < 1;
function walkable(x, y) {
  if(x<0||y<0||x>=S.W||y>=S.H)return false;
  if (S.WALK_RECTS.some((r) => inRect(x, y, r))) return true;
  return !S.BLOCK_RECTS.some((r) => inRect(x, y, r)) && !S.BLOCK_ELLIPSES.some((e) => inEll(x, y, e));
}
// Li has a body: test a small footprint, not a single point.
const FOOT = [[0, 0], [-12, 0], [12, 0], [0, -6]];
const fits = (x, y) => FOOT.every(([dx, dy]) => walkable(x + dx, y + dy));

const { nav } = makeNavigator({width:S.W,height:S.H,fits});
// Pets reach the tiled veranda through the stairs; walls, pots and pond remain solid.
const petWalkable = (x,y) => {
  const porch = x > 594 && x < 945 && y > 609 && y < 650;
  const stairs = x > 626 && x < 744 && y >= 642 && y < 720;
  if (porch || stairs) {
    return ![[788,575,865,627],[851,573,904,615],[904,550,973,615]].some(r=>inRect(x,y,r));
  }
  if (x > 455 && x < 1030 && y >= 650 && y < 704) return false;
  return walkable(x,y);
};
const petRoutes=new Map();
for(const radius of [10,14,18,20]) {
 const fits=(x,y)=>[[-radius,0],[radius,0],[0,-6]].every(([dx,dy])=>petWalkable(x+dx,y+dy));
 petRoutes.set(radius,{fits,...makeNavigator({width:S.W,height:S.H,fits,grid:8})});
}
const petFits=(x,y,p={name:'muc'})=>petRoutes.get(P.petRadius(p)).fits(x,y);
const petNav=(sx,sy,tx,ty,p={name:'muc'},avoid=[])=>{
 const route=petRoutes.get(P.petRadius(p));
 if(!avoid.length)return route.nav(sx,sy,tx,ty);
 const barriers=avoid.map(q=>({x:q.x,y:q.y,r:(P.petRadius(p)+P.petRadius(q))*(p.home&&q.home?.47:1.4)+1,d:Math.hypot(sx-q.x,(sy-q.y)*1.7)}));
 const left=Math.max(0,Math.min(sx,tx)-128),top=Math.max(0,Math.min(sy,ty)-128),right=Math.min(S.W,Math.max(sx,tx)+128),bottom=Math.min(S.H,Math.max(sy,ty)+128);
 const dynamicFits=(x,y)=>route.fits(x,y)&&barriers.every(q=>{const d=Math.hypot(x-q.x,(y-q.y)*1.7);return d>q.r||(Math.hypot(x-sx,y-sy)<8&&d>=q.d-.01);});
 return makeNavigator({width:right-left,height:bottom-top,grid:4,fits:(x,y)=>dynamicFits(x+left,y+top)}).nav(sx-left,sy-top,tx-left,ty-top).map(([x,y])=>[x+left,y+top]);
};
for(const p of pets)if(!petFits(p.x,p.y,p)){const q=petRoutes.get(P.petRadius(p)).nearest(p.x,p.y);if(q)[p.x,p.y]=q;}
function walkTo(x,y) { li.path=nav(li.x,li.y,x,y); li.target=li.path.shift()||null; }

// ---------- output ----------
const art = document.createElement('canvas');
const ctx = art.getContext('2d');
document.body.prepend(art);
let K = 2, VW = 640, VH = 360;
function resize() {
  const dpr = window.devicePixelRatio || 1, dw = innerWidth * dpr, dh = innerHeight * dpr;
  K = Math.max(1, Math.round(dh / 600));                  // whole-pixel scale, ~600 picture px tall
  VW = Math.ceil(dw / K); VH = Math.ceil(dh / K);
  // Preserve source detail when the screen has enough physical pixels: actors
  // scaled within a 1x world buffer otherwise lose pixels before enlargement.
  const renderScale = Math.min(2, K);
  art.width = VW * renderScale; art.height = VH * renderScale;
  art.style.width = `${VW * K / dpr}px`; art.style.height = `${VH * K / dpr}px`;
  ctx.setTransform(renderScale, 0, 0, renderScale, 0, 0);
  ctx.imageSmoothingEnabled = false;
}
addEventListener('resize', resize);
resize();
const cam = { x: li.x - VW / 2, y: li.y - VH / 2, wide: false };

// ---------- input ----------
const toWorld = (ev) => {
  const r = art.getBoundingClientRect(), sx = (ev.clientX - r.left) / r.width * VW, sy = (ev.clientY - r.top) / r.height * VH;
  if (cam.wide) { const k = Math.min(VW / S.W, VH / S.H); return [(sx - (VW - S.W * k) / 2) / k, (sy - (VH - S.H * k) / 2) / k]; }
  return [cam.x + sx, cam.y + sy];
};
const zoneAt = (x, y) => S.ZONES.find((z) => inRect(x, y, z.r));
function callChild(child,kind='pet'){
 li.userUntil=performance.now()/1000+60;li.hidden=false;
 if(kind==='cat')Z.callGardenCat(child,li,nav);else P.callPets([child],li,petNav);
 liSay.text=(kind==='cat'||child.cat)?'Con muốn ngồi cạnh Ba ba không?':'Con ơi, lại đây chơi với Ba ba nào.';liSay.until=performance.now()/1000+5;
}
addEventListener('pointermove', (ev) => {
  if(ev.target!==art || stall.isOpen || rooms.current || document.querySelector('.gate')) { tag.classList.remove('on'); art.style.cursor='default'; return; }
  const z = zoneAt(...toWorld(ev));
  if (z) { tag.innerHTML = `${z.label[0]}<small>${z.label[1]}</small>`; tag.style.left = `${ev.clientX}px`; tag.style.top = `${ev.clientY - 12}px`; tag.classList.add('on'); art.style.cursor = 'pointer'; }
  else { tag.classList.remove('on'); art.style.cursor = 'crosshair'; }
});
art.addEventListener('pointerdown', (ev) => {
  const [x, y] = toWorld(ev), z = zoneAt(x, y);
  const child=P.petAt(pets,petSprites,x,y);
  if(child){callChild(child);return;}

  if (z && (z.id === 'stall' || z.id === 'garden' || ROOMS[z.id])) { visit(z.id); return; }
  li.userUntil = performance.now() / 1000 + 60;            // the visitor leads for a minute
  li.hidden = false;
  if (cam.wide) cam.wide = false;
  if (stall.isOpen && z?.id !== 'stall') stall.close();     // walking off closes the stall
  walkTo(...(z ? z.go : [x, y]));
  pendingOpen = z && (z.id === 'stall' || z.id === 'lucky' || ROOMS[z.id]) ? z.id : null;
  if (rooms.current && z?.id !== rooms.current) rooms.close();
});
// Keys (WASD / arrows) and, on touch screens, a thumb stick steer Li directly.
const keys = new Set(), stickV = { x: 0, y: 0 };
const KEYMAP = { KeyW: [0, -1], ArrowUp: [0, -1], KeyS: [0, 1], ArrowDown: [0, 1], KeyA: [-1, 0], ArrowLeft: [-1, 0], KeyD: [1, 0], ArrowRight: [1, 0] };
addEventListener('keydown', (e) => { if (KEYMAP[e.code] && !stall.isOpen && !rooms.current && !document.querySelector('.gate') && !e.target.closest('button,a,input,select,[role=dialog]')) { keys.add(e.code); e.preventDefault(); } });
addEventListener('keyup', (e) => keys.delete(e.code));
addEventListener('blur', () => keys.clear());
const stickEl = document.getElementById('stick'), knob = stickEl.querySelector('i');
if (matchMedia('(pointer: coarse)').matches) stickEl.hidden = false;
stickEl.addEventListener('pointerdown', (e) => { stickEl.setPointerCapture(e.pointerId); stickEl.dataset.on = '1'; moveStick(e); });
stickEl.addEventListener('pointermove', (e) => { if (stickEl.dataset.on) moveStick(e); });
for (const ev of ['pointerup', 'pointercancel']) stickEl.addEventListener(ev, () => { delete stickEl.dataset.on; stickV.x = stickV.y = 0; knob.style.transform = ''; });
function moveStick(e) {
  const r = stickEl.getBoundingClientRect(), R = r.width / 2;
  let dx = e.clientX - r.left - R, dy = e.clientY - r.top - R; const d = Math.hypot(dx, dy);
  if (d > R) { dx *= R / d; dy *= R / d; }
  knob.style.transform = `translate(${dx}px, ${dy}px)`;
  const k = d < R * 0.18 ? 0 : 1 / R; stickV.x = dx * k; stickV.y = dy * k;
}
// ---------- chill: after a quiet while the UI fades away and the camera drifts ----------
// through the garden like a music screensaver; any touch, key or mouse move brings it back.
const CHILL_AFTER = 20, CHILL_MUSIC = 8;   // the garden drifts on its own; sooner while music plays
let lastInput = performance.now() / 1000, chill = false;
const TOUR = [[700, 640], [1250, 700], [1200, 1060], [760, 1080], [300, 700], [880, 860]];
const wake = () => { lastInput = performance.now() / 1000; if (chill) { chill = false; document.body.classList.remove('chill'); } };
for (const ev of ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart']) addEventListener(ev, wake, { passive: true });
const chillCap = document.getElementById('chill-cap');
{ const ld = document.getElementById('loading'); ld.classList.add('done'); setTimeout(() => ld.remove(), 700); }
initGate({ onEnter: () => { lastInput = performance.now() / 1000; nextTalk = lastInput + 12; document.querySelector('.mbtn')?.focus({preventScroll:true}); } });
initInterface({ visit, live, openDaily, callPets:()=>{li.hidden=false;P.callPets(pets,li,petNav);liSay.text='Các con ơi, lại đây với Ba ba nào.';liSay.until=performance.now()/1000+5;li.userUntil=performance.now()/1000+60;}, resetLi: () => { li.userUntil = 0; }, setWide: () => { cam.wide = !cam.wide; } });
const clockEl = document.getElementById('clock');
const sBtn = document.getElementById('sound');
const showSound = (on) => { sBtn.setAttribute('aria-pressed', String(on)); sBtn.title = on ? 'Tắt âm thanh' : 'Bật âm thanh'; sBtn.setAttribute('aria-label',sBtn.title); };
sBtn.addEventListener('click', (e) => { e.stopPropagation(); showSound(AM.toggleAmbient(SOUND)); });
// The garden's sound comes on with the first touch, unless the visitor turned it off before.
const firstTouch = () => { removeEventListener('pointerdown', firstTouch, true); removeEventListener('keydown', firstTouch, true); if (AM.wantsSound() && !AM.ambientOn()) showSound(AM.toggleAmbient(SOUND)); };
addEventListener('pointerdown', firstTouch, true); addEventListener('keydown', firstTouch, true);
if (OUTFITS.length < 2) document.getElementById('outfit').style.display = 'none';   // one look for now
document.getElementById('outfit').addEventListener('click', () => { li.outfit = OUTFITS[(OUTFITS.indexOf(li.outfit) + 1) % OUTFITS.length]; });
document.getElementById('wide').addEventListener('click', () => { cam.wide = !cam.wide; });

// ---------- loop ----------
let last = performance.now();
function tick(now) {
  const dt = Math.max(0, Math.min(0.05, (now - last) / 1000)); last = Math.max(last, now);
  const t = last / 1000;
  menu.frame(t, dt);
  const date = live.now(), hour = live.hourOf(date), grade = live.gradeAt(hour);
  live.stepWeather(date, dt, !live.wx.started); live.wx.started = true;
  const night = grade.night > 0.6;
  // Leave room for visitor actions and keep Li's occasional words unhurried.
  if (t >= nextTalk && !readingDaily && !document.hidden && !li.hidden && !rooms.current && !stall.isOpen && !dailyDialog.open && document.getElementById('garden-settings').hidden && !cam.wide && !chill && t >= liSay.until) {
    nextTalk = t + 75 + Math.random() * 35;
    if (talkCount++ % 3 === 0) {
      readingDaily = true;
      readDaily().then(message => {
        if (!rooms.current && !stall.isOpen && !dailyDialog.open && !li.hidden && performance.now()/1000 >= liSay.until) {
          liSay.text = dailyAside(message); liSay.until = performance.now()/1000 + 15; dailyUntil = liSay.until;
        }
      }).catch(() => {}).finally(() => { readingDaily = false; });
    } else { liSay.text = night ? nextNightQuote() : nextQuote(); liSay.until = t + 12; dailyUntil = 0; }
  }
  document.body.classList.toggle('night', night);
  clockEl.textContent = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} · ${live.wx.name === 'clear' && night ? 'trời quang' : live.WEATHER[live.wx.name].label}`;

  // Li follows his day unless the visitor is leading.
  if (!(li.userUntil > t)) {
    let slot = S.SCHEDULE.find((q) => hour >= q.from && hour < q.to) || S.SCHEDULE[0];
    if (stall.playing && !stall.isOpen && !rooms.current && !slot.sleep) slot = { at: S.POSES.sit.at, face: 'south', open: true, pose: 'sit' };   // music on: sit and listen
    if (slot.open && live.wx.rain > 0.5) slot = { ...slot, at: S.SHELTER, pose: null };
    li.wantPose = slot.pose || null;
    li.hidden = !!slot.sleep;
    if (slot.at && (li.goal?.[0] !== slot.at[0] || li.goal?.[1] !== slot.at[1])) {
      li.goal = slot.at;
      if (!li.placed) { [li.x, li.y] = slot.at; li.placed = true; } else walkTo(...slot.at);
    }
    if (slot.at && !li.target) li.dir = slot.face;
  }
  if (li.hidden && Math.random() < dt * 0.7) live.spawn({ kind: 'zzz', x: 700, y: 470, life: 3 });

  let moving = false;
  let ix = stickV.x, iy = stickV.y;
  for (const k of keys) { ix += KEYMAP[k][0]; iy += KEYMAP[k][1]; }
  const im = Math.hypot(ix, iy);
  if (im > 0.05) {                       // steering: slide along walls one axis at a time
    li.target = null; li.path = []; pendingOpen = null; li.hidden = false;
    li.userUntil = t + 60;
    const sp = 120 * dt * Math.min(1, im) / im, nx = li.x + ix * sp, ny = li.y + iy * sp;
    if (fits(nx, ny)) { li.x = nx; li.y = ny; moving = true; }
    else if (fits(nx, li.y)) { li.x = nx; moving = true; }
    else if (fits(li.x, ny)) { li.y = ny; moving = true; }
    li.dir = DIRS8[(Math.round(Math.atan2(-iy, ix) / (Math.PI / 4)) + 8) % 8];
  } else if (li.target) {
    const [gx, gy] = li.target, dx = gx - li.x, dy = gy - li.y, d = Math.hypot(dx, dy);
    if (d < 2) li.target = li.path.shift() || null;
    else {
      const st = Math.min(d, 120 * dt), nx = li.x + dx / d * st, ny = li.y + dy / d * st;
      if (fits(nx, ny) || !fits(li.x, li.y)) { li.x = nx; li.y = ny; moving = true; li.stuck = 0; }   // stuck inside an edge: step out
      else if (fits(nx, li.y)) { li.x = nx; moving = true; }                          // slide along the obstacle
      else if (fits(li.x, ny)) { li.y = ny; moving = true; }
      else if (!li.stuck) { li.stuck = 1; const end = li.path.length ? li.path[li.path.length - 1] : li.target; walkTo(...end); }   // try a fresh path once
      else { li.target = null; li.path = []; li.stuck = 0; }
      li.dir = DIRS8[(Math.round(Math.atan2(-dy, dx) / (Math.PI / 4)) + 8) % 8];
    }
  }
  if (pendingOpen && ROOMS[pendingOpen] && !li.target) { rooms.open(pendingOpen); pendingOpen = null; }
  if (rooms.current && !li.target && !moving) li.dir = ROOMS[rooms.current].face;
  if (pendingOpen === 'lucky' && !li.target) { li.dir = 'west'; liSay.text = 'Con ơi, Ba ba ghé thăm con nè.'; liSay.until = t + 5; pendingOpen = null; }
  if (pendingOpen && !li.target) { if (Math.hypot(li.x - S.STALL_HOST[0], li.y - S.STALL_HOST[1]) < 60) { li.dir = 'south'; stall.open(); } pendingOpen = null; }
  if (stall.isOpen && !li.target && !moving) li.dir = 'south';
  // Settle into a pose once he has arrived where it happens; any step breaks it.
  { const want = rooms.current === 'hammock' ? 'hammock' : li.userUntil > t ? null : li.wantPose, P0 = want && S.POSES[want];
    li.pose = !moving && !li.target && P0 && Math.hypot(li.x - P0.at[0], li.y - P0.at[1]) < 40 ? want : null; }
  const anim = moving ? 'walk' : 'idle';
  if (anim !== li.anim) { li.anim = anim; li.t = 0; }
  li.t += dt;
  li.watering=!moving&&!li.target&&!li.pose&&!li.hidden&&live.wx.rain<.25&&Math.hypot(li.x-S.WATER_AT[0],li.y-S.WATER_AT[1])<10&&((li.waterUntil||0)>t||(!(li.userUntil>t)&&hour>=7&&hour<10&&t%35<20));
  if(li.watering)li.dir='north-west';
  WET.stepPuddles(puddles,dt,live.wx.rain,[li,...pets],t);

  // Camera eases after Li, clamped to the picture.
  // At the stall the camera frames the stall with Li beside it, between the signs and the player.
  if (rooms.current || stall.isOpen || document.querySelector('.gate') || !document.getElementById('garden-settings').hidden) lastInput = t;   // a room is being read: stay put
  if (!chill && t - lastInput > (stall.playing ? CHILL_MUSIC : CHILL_AFTER) && !cam.wide) { chill = true; document.body.classList.add('chill'); li.userUntil = 0; }   // left alone, Li goes back to his day (or sits down with the music)
  let fx = rooms.current ? (VW < 420 ? ROOMS[rooms.current].host[0] : ROOMS[rooms.current].cam[0]) : stall.isOpen ? (VW < 420 ? 1330 : 1250) : li.x, fy = rooms.current ? (VW < 420 ? ROOMS[rooms.current].host[1] + VH * 0.12 : ROOMS[rooms.current].cam[1]) : stall.isOpen ? (VW < 420 ? 730 : 580) : li.y - 90;
  if (chill && !reducedMotion()) {                                   // drift slowly from one view to the next, ~40 s each
    const k = (t / 40) % TOUR.length, i = Math.floor(k), f = k - i, e = f * f * (3 - 2 * f);
    const a = TOUR[i], b = TOUR[(i + 1) % TOUR.length];
    fx = a[0] + (b[0] - a[0]) * e; fy = a[1] + (b[1] - a[1]) * e;
    chillCap.querySelector('b').textContent = stall.playing && document.getElementById('np-title').textContent ? `♪ ${document.getElementById('np-title').textContent}` : 'vườn của Li';
    chillCap.querySelector('small').textContent = clockEl.textContent;
  }
  const tx = Math.min(Math.max(fx - VW / 2, 0), Math.max(0, S.W - VW)), ty = Math.min(Math.max(fy - VH / 2, 0), Math.max(0, S.H - VH));
  { const ease = reducedMotion() ? 100 : chill ? 0.6 : 3; cam.x += (tx - cam.x) * Math.min(1, dt * ease); cam.y += (ty - cam.y) * Math.min(1, dt * ease); }
  cam.x=Math.max(0,Math.min(cam.x,Math.max(0,S.W-VW)));cam.y=Math.max(0,Math.min(cam.y,Math.max(0,S.H-VH)));
  document.body.classList.toggle('wide-view', cam.wide);
  const wideLabel = cam.wide ? 'Về gần' : 'Ngắm toàn vườn';
  const wideButton = document.getElementById('return-garden');
  if (wideButton.textContent !== wideLabel) wideButton.textContent = wideLabel;
  const cx = cam.wide ? 0 : Math.round(cam.x), cy = cam.wide ? 0 : Math.round(cam.y), view = { x: cx, y: cy, w: cam.wide ? S.W : VW, h: cam.wide ? S.H : VH };

  if (night && Math.random() < dt * 6) live.spawn({ kind: 'firefly', x: 120 + Math.random() * 1300, y: 700 + Math.random() * 500, life: 5, seed: Math.random() * 9 });
  if (live.wx.wind > 1 && Math.random() < dt * 4) live.spawn({ kind: 'leaf', x: cx - 10, y: cy + Math.random() * VH, life: 8, seed: Math.random() * 9 });
  if (Math.random() < dt * (0.6 + live.wx.rain * 6)) { const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()); live.spawn({ kind: 'ripple', x: S.POND.x + Math.cos(a) * r * S.POND.rx, y: S.POND.y + Math.sin(a) * r * S.POND.ry, life: 1.4 }); }
  live.stepParticles(dt, t, view);
  Z.stepAnimals(animals, dt, hour, live.wx.rain, li, nav, fits);
  P.stepGardenPets(pets, dt, hour, live.wx.rain, li, petNav, petFits);
  P.stepSmall(small, dt, hour, live.wx.rain);
  {
    const r=art.getBoundingClientRect(), k=cam.wide?Math.min(VW/S.W,VH/S.H):1;
    const ox=cam.wide?(VW-S.W*k)/2:0,oy=cam.wide?(VH-S.H*k)/2:0,placed=[];
    const show=!cam.wide&&!stall.isOpen&&!rooms.current&&!document.querySelector('.gate')&&!chill;
    for(const item of nameItems){
      const p=item.actor,catImg=p.state==='sleep'?zoo.cat.sleep:zoo.cat.still,h=item.kind==='pet'?P.petLabelHeight(p,petSprites[p.name]):P.spriteHeadOffset(catImg,catImg.height)+(p.lift||0);
      const x=r.left+(ox+(p.x-cx)*k)/VW*r.width;
      let y=r.top+(oy+(p.y-h-cy)*k)/VH*r.height-7;
      const width=Math.max(38,Math.min(115,18+item.name.length*7));
      for(let n=0;n<4&&placed.some(a=>Math.abs(a.x-x)<(a.w+width)/2+4&&Math.abs(a.y-y)<23);n++)y-=23;
      const visible=show&&x>width/2&&x<innerWidth-width/2&&y>22&&y<innerHeight-20;
      item.node.hidden=!visible;
      if(visible){item.node.style.left=`${Math.round(x)}px`;item.node.style.top=`${Math.round(y)}px`;placed.push({x,y,w:width});}
    }
  }
  const fireLit = live.inHours(hour, [[18.5, 23]]) && live.wx.rain < 0.5;
  A.stepFire(fire, dt, fireLit, live.wx.wind);
  A.fireBits((b) => bits.push(b), fire, dt, live.wx.wind);
  bits = A.stepBits(bits, dt);

  if (stall.playing && Math.random() < dt * 1.6) notes.push({ x: 1395 + Math.random() * 40, y: 600, age: 0, life: 3.2, ph: Math.random() * 6 });
  for (const n of notes) { n.age += dt; n.y -= 16 * dt; }
  notes = notes.filter((n) => n.age < n.life);
  for (const L of S.LIGHTS) L.on = L.lucky ? live.inHours(hour, [[18, 6]]) : L.window ? live.inHours(hour, [[18, 22.5]]) : L.fire ? live.inHours(hour, [[18.5, 23]]) && live.wx.rain < 0.5 : true;
  const gust = Math.max(0, Math.min(1, (0.55 + 0.45 * Math.sin(t * 0.37) * Math.sin(t * 0.11 + 1) - 0.1) / 0.9));
  const nearPond = Math.max(0, 1 - Math.hypot(cx + VW / 2 - S.POND.x, cy + VH / 2 - S.POND.y) / 600);
  const nearFire = Math.max(0, 1 - Math.hypot(cx + VW / 2 - S.FIRE[0], cy + VH / 2 - S.FIRE[1]) / 500) * fire.lit;
  AM.updateAmbient({ hour, night: grade.night, wind: live.wx.wind, gust, rain: live.wx.rain, music: stall.playing, nearPond, fire: nearFire }, t);
  N.stepNight(night_, dt, t, grade.night, S.LIGHTS, live.spawn);

  ctx.fillStyle = '#20301c'; ctx.fillRect(0, 0, VW, VH);
  if (cam.wide) {
    const k = Math.min(VW / S.W, VH / S.H), ox = (VW - S.W * k) / 2, oy = (VH - S.H * k) / 2;
    ctx.save(); ctx.translate(ox, oy); ctx.scale(k, k);
    ctx.drawImage(sceneGround, 0, 0);
  } else ctx.drawImage(sceneGround, cx, cy, VW, VH, 0, 0, VW, VH);
  A.windAt(t, live.wx.wind);
  A.drawWind(ctx, view, t);
  ctx.drawImage(cinemaLayer,cinemaX-cx,cinemaY-cy);
  A.drawPond(ctx, pond, view, t, dt, grade.night < 0.5);
  WET.drawPuddles(ctx,puddles,view,t);
  // Li and the animals, nearest feet drawn last.
  const draws = [{ y: S.LUCKY[1], draw: () => luckyImg && ctx.drawImage(luckyImg, Math.round(S.LUCKY[0] - luckyImg.width*S.LUCKY_SCALE/2 - cx), Math.round(S.LUCKY[1] - luckyImg.height*S.LUCKY_SCALE - cy), Math.round(luckyImg.width*S.LUCKY_SCALE), Math.round(luckyImg.height*S.LUCKY_SCALE)) },...Z.animalDraws(animals, zoo, ctx, view, t), ...P.petDraws(pets, petSprites, ctx, view, t), ...P.smallDraws(small, smallSprites, ctx, view, t), ...N.nightDraws(night_, nightSprites, ctx, view, t)];
  const showLi=!li.hidden&&rooms.current!=='cine'; // Cinema panel otherwise exposes only his legs under the frame.
  if (showLi && li.pose) { const p=poseMasks[li.pose],im=poseImg[li.pose]; draws.push({ y:p.sort, draw:()=>{
    ctx.save();
    if(p.localAnchor) { ctx.translate(p.worldAnchor[0]-cx,p.worldAnchor[1]-cy); ctx.rotate(p.rotation); ctx.scale(p.scale,p.scale); ctx.drawImage(im,-p.localAnchor[0],-p.localAnchor[1]); }
    else ctx.drawImage(im,p.x-cx,p.y-cy,Math.round(im.width*p.scale),Math.round(im.height*p.scale));
    ctx.restore();
  }}); }
  else if (showLi) draws.push({ y: li.y, draw: () => {
    // In the rain he carries his umbrella (its own PixelLab state), except under the eaves.
    const look = outfits.rain && live.wx.rain > 0.45 && !(li.y < 735 && li.x > 560 && li.x < 900) ? 'rain' : li.outfit;
    const fr = outfits[look][li.anim][li.dir];
    let img = fr[Math.floor(li.t * FPS[li.anim]) % fr.length];
    let ax = liM.ax, ay = liM.ay, breath = 0;
    if (look === 'v3' && li.anim === 'idle') {
      // Old template mixed north with a front-facing frame. Use verified identity rotations.
      if (li.dir === 'north') { img = northIdle[reducedMotion() ? 0 : Math.floor(li.t * 2) % 4]; ax = 127; ay = 242; }
      else { img = idleClean[li.dir]; ax = 64; ay = li.dir.includes('north') ? 243 : 244; breath = reducedMotion() ? 0 : Math.round((Math.sin(li.t * 1.5) + 1) / 2); }
    }
    if(li.watering){img=wateringFrames[Math.floor(li.t*6)%wateringFrames.length];ax=128;ay=242;breath=0;}
    ctx.fillStyle = 'rgba(20,40,20,0.28)';
    ctx.beginPath(); ctx.ellipse(Math.round(li.x - cx), Math.round(li.y - 2 - cy), 20, 5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.drawImage(img, Math.round(li.x - ax * LI_SCALE - cx), Math.round(li.y - ay * LI_SCALE - cy - breath), Math.round(img.width * LI_SCALE), Math.round(img.height * LI_SCALE + breath));
  } });
  // A tall cut-out is redrawn only while someone stands behind it and overlaps it,
  // so its leaves keep swaying in the painted layer the rest of the time.
  const actors = [...(!showLi || li.pose ? [] : [{ x: li.x, y: li.y, w: 54, h: 166 }]), ...Z.actorBoxes(animals), ...P.petBoxes(pets, petSprites)];
  for (const f of front) {
    // The cinema is replaced by the new layer; its old cutouts no longer match.
    if(f.name==='screen') continue;
    const behind = actors.some((a) => a.y < f.base && a.x + a.w / 2 > f.x && a.x - a.w / 2 < f.x + f.w && a.y > f.y && a.y - a.h < f.y + f.h);
    if (behind) draws.push({ y: f.base, draw: () => {
      ctx.drawImage(f.name==='shrub_cine'?f.img:A.warpSprite(f,t),f.x-cx,f.y-cy);
    } });
  }
  if(actors.some(a=>a.y<1062 && a.x+a.w/2>1068 && a.x-a.w/2<1290 && a.y>885 && a.y-a.h<1062)) draws.push({y:1062,draw:()=>{
    ctx.save(); ctx.translate(cinemaX-cx,cinemaY-cy); ctx.beginPath();
    for(const poly of [[[60,88],[84,88],[84,230],[60,230]],[[70,100],[201,55],[214,55],[214,165],[72,202]],[[190,54],[215,54],[215,168],[190,168]],[[28,216],[65,95],[75,100],[36,226]],[[203,55],[213,55],[249,145],[240,151]]]){
      ctx.moveTo(...poly[0]); for(const point of poly.slice(1))ctx.lineTo(...point); ctx.closePath();
    }
    ctx.clip(); ctx.drawImage(cinemaLayer,0,0); ctx.restore();
  }});
  draws.sort((a, b) => a.y - b.y).forEach((d) => d.draw());
  // Foliage is now a complete object in the depth sort; never crop green shadows over an actor's legs.
  if (hour > 7 && hour < 17.5 && live.wx.rain < 0.3) A.drawButterflies(ctx, butterflies, view, t);
  for (const n of notes) {        // tiny pixel quavers
    const a = Math.min(1, n.age * 2, (n.life - n.age) * 1.5), x = Math.round(n.x + Math.sin(n.age * 2 + n.ph) * 6 - cx), y = Math.round(n.y - cy);
    ctx.fillStyle = `rgba(43,33,24,${a})`; ctx.fillRect(x, y, 3, 2); ctx.fillRect(x + 2, y - 6, 1, 7); ctx.fillRect(x + 3, y - 6, 2, 1); ctx.fillRect(x + 5, y - 5, 1, 2);
    ctx.fillStyle = `rgba(255,195,90,${a})`; ctx.fillRect(x + 1, y, 1, 1);
  }
  live.drawParticles(ctx, cx, cy);
  live.drawOverlay(ctx, view, t, grade, S.LIGHTS);
  // Li's speech bubble rides above his head while he hosts the stall or plays music.
  const say = li.hidden ? '' : (stall.bubble() || rooms.bubble() || (t < liSay.until ? liSay.text : ''));
  bubbleEl.hidden = !say || cam.wide;
  if (say) {
    if (bubbleWords.textContent !== say) bubbleWords.textContent = say;
    dailyInvite.hidden = !(t < dailyUntil && say === liSay.text && !stall.isOpen && !rooms.current);
    const r = art.getBoundingClientRect();
    const bw = bubbleEl.offsetWidth / 2 + 8;   // keep the whole bubble on screen
    bubbleEl.style.left = `${Math.min(innerWidth - bw, Math.max(bw, r.left + (li.x - cx) / VW * r.width))}px`;
    bubbleEl.style.top = `${r.top + (li.y - 180 - cy) / VH * r.height}px`;
  }
  A.drawBits(ctx, bits, view);
  N.drawNightGlow(night_, ctx, view, t);
  A.drawFire(ctx, fire, view);              // fire makes its own light: drawn after the night grade
  if (cam.wide) ctx.restore();
}
function loop(now) { tick(now); requestAnimationFrame(loop); }
requestAnimationFrame(loop);
window.__debug = { li, cam, live, animals, pets, walkTo, fits, petFits, petNav, petSprites, puddles, visit, callPets:()=>P.callPets(pets,li,petNav), setHour: live.setHour, setWeather: (w) => { live.wx.override = w; }, wake, advance: (s, fps = 30) => { for (let i = 0; i < s * fps; i++) tick(last + 1000 / fps); last=performance.now(); wake(); } };
