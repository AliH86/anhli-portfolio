import { actorFrame } from './actors-v34.js?v=3507';
import { PET_SCALE } from './pets.js?v=3507';
// The bottom menu: a strip of lawn with the garden's places as buttons, and the
// garden's animals living on it. They stroll, peck and hop; hover a button and the
// nearest one trots over and bounces; pick one and they all jump.
// The pets canvas is drawn in art pixels and scaled 2x by CSS, so they keep the
// same pixel density as the garden itself.

const rnd = (a, b) => a + Math.random() * (b - a);
const SCALE = 1;   // shared species ratios; nearest-neighbor pixels
export function initMenu({ items, sprites, pets: petSprites = {}, onPick }) {
  const nav = document.getElementById('menu'), row = nav.querySelector('.menu-row');
  const cv = document.getElementById('menu-pets'), g = cv.getContext('2d');
  const descriptions={stall:'Nhạc Li chọn',house:'Chuyện & công việc',garden:'Một chút xanh',pond:'Ngồi nghe gió',hammock:'Ảnh & ký ức',cine:'Những thước phim',aulinh:'Thế giới bên kia'};
  row.replaceChildren(...items.map((it,index) => {
    const b = document.createElement('button');
    b.style.setProperty('--i',index); b.type = 'button'; b.className = 'mbtn'; b.dataset.id = it.id; b.title = it.hint || it.label;
    b.innerHTML = `<img class="menu-icon" src="./art-v34/ui/icon-${index}.webp" alt=""><span></span><small>${descriptions[it.id]}</small>`;
    b.querySelector('span').textContent = it.label;
    b.addEventListener('click', () => { for (const p of pets) hop(p, 1 + Math.random()); onPick(it);collapse(); });
    b.addEventListener('pointerenter', () => callOver(b));
    b.addEventListener('focus', () => callOver(b));
    return b;
  }));

  const toggle=document.getElementById('garden-menu-toggle');
  const collapse=()=>{nav.dataset.expanded='false';nav.inert=true;toggle.setAttribute('aria-expanded','false');};
  collapse();
  toggle.onclick=()=>{const expanded=nav.dataset.expanded!=='true';nav.dataset.expanded=String(expanded);nav.inert=!expanded;toggle.setAttribute('aria-expanded',String(expanded));};
  document.addEventListener('pointerdown',e=>{if(!nav.contains(e.target)&&!toggle.contains(e.target))collapse();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.dataset.expanded==='true'){collapse();toggle.focus();e.stopImmediatePropagation();}});
  const stripRect=()=>({left:Math.max(12,(innerWidth-Math.min(800,innerWidth-24))/2),width:Math.min(800,innerWidth-24),top:innerHeight-12});
  const W = () => Math.ceil(stripRect().width / SCALE), GROUND = 90, CH = 100;   // feet line in art px
  // Ali's pets take turns on the strip, a few at a time, plus a hen and a sparrow.
  const names = Object.keys(petSprites).filter(n=>n!=='socola').sort(() => Math.random() - 0.5);
  let nextIn = 0;
  const onStrip = () => Math.min(names.length, innerWidth < 760 ? 3 : 5);
  const pets = [
    { kind: 'sparrow', x: 300, dir: -1, speed: 0, state: 'peck', wait: 1 },
    ...names.slice(0, onStrip()).map((n, i) => ({ kind: 'pet', name: n, x: 40 + i * 80, dir: i % 2 ? -1 : 1, speed: 14 + Math.random() * 8, state: 'walk', wait: 0, stay: rnd(25, 50) })),
  ].map((p) => ({ lift: 0, vy: 0, t: rnd(0, 2), target: null, joy: 0, ...p }));
  nextIn = onStrip();
  const fly = { x: 100, y: 8, ph: 0 };

  function hop(p, k = 1) { if (p.lift <= 0.01) p.vy = 70 + 30 * k; }
  function callOver(b) {
    const r = b.getBoundingClientRect(), strip=stripRect(), x = Math.max(62,Math.min(strip.width-62,(r.left+r.width/2-strip.left)/SCALE));
    const p = pets.reduce((a, q) => (Math.abs(q.x - x) < Math.abs(a.x - x) ? q : a));
    p.target = x; p.joy = 2;
  }

  function frame(t, dt) {
    if (!document.body.classList.contains('at-stall') && !document.body.classList.contains('in-room')) return;
    const w = W(),nr=stripRect();cv.style.left=nr.left+'px';cv.style.bottom=(innerHeight-nr.top-10)+'px';
    if (cv.width !== w) { cv.width = w; cv.height = CH; cv.style.width = `${w * SCALE}px`; cv.style.height = `${CH * SCALE}px`; }
    g.imageSmoothingEnabled=false;
    g.clearRect(0, 0, cv.width, cv.height);
    // Keep individual silhouettes legible on the foreground strip.
    for(let i=0;i<pets.length;i++)for(let j=i+1;j<pets.length;j++){
      const a=pets[i],b=pets[j];if(a.kind!=='pet'||b.kind!=='pet'||a.leaving||b.leaving)continue;
      const dx=b.x-a.x,gap=58;if(Math.abs(dx)<gap){const push=Math.min((gap-Math.abs(dx))*.5,dt*24),sign=dx>=0?1:-1;a.x-=push*sign;b.x+=push*sign;}
    }
    for (const p of pets) {
      p.t += dt;
      // Gravity for hops.
      if (p.vy || p.lift > 0) { p.lift += p.vy * dt; p.vy -= 320 * dt; if (p.lift <= 0) { p.lift = 0; p.vy = 0; if (p.joy > 0) { p.joy--; hop(p, 0.4); } } }
      if (p.target != null) {                                  // trot over to the hovered button
        const dx = p.target - p.x;
        if (Math.abs(dx) < 3) { p.target = null; hop(p, 1); p.state = p.kind === 'hen' ? 'peck' : 'walk'; p.wait = rnd(2, 4); }
        else { p.dir = Math.sign(dx); p.x += p.dir * Math.max(p.speed, 22) * 1.8 * dt; p.state = 'walk'; }
      } else if (p.kind === 'sparrow') {                       // sparrows only hop
        p.wait -= dt;
        if (p.wait <= 0) { p.dir = Math.random() < 0.5 ? -1 : 1; p.x += p.dir * rnd(6, 14); hop(p, 0.2); p.wait = rnd(0.6, 2.2); }
      } else {
        p.wait -= dt;
        if (p.state === 'walk') { p.x += p.dir * p.speed * dt; if (!p.leaving && p.wait < -rnd(3, 6)) { p.state = p.kind === 'hen' ? 'peck' : 'sit'; p.wait = rnd(1.5, 4); } }
        else if (p.wait <= 0) { p.state = 'walk'; p.wait = 0; if (Math.random() < 0.4) p.dir *= -1; if (Math.random() < 0.25) hop(p, 0.3); }
      }
      // Shift change: a pet that has stayed long enough walks off one edge, the next one comes in.
      if (p.kind === 'pet' && names.length > onStrip()) {
        p.stay -= dt;
        if (p.stay < 0 && p.target == null) { p.leaving = true; p.state = 'walk'; p.dir = p.x < w / 2 ? -1 : 1; }
        if (p.leaving && (p.x < -30 || p.x > w + 30)) {
          const n = names[nextIn++ % names.length];
          Object.assign(p, { name: n, leaving: false, stay: rnd(25, 50), x: p.dir < 0 ? w + 25 : -25, dir: -p.dir, state: 'walk', wait: 0 });
        }
      }
      if (!p.leaving) { if (p.x < 62) { p.x = 62; p.dir = 1; } else if (p.x > w - 62) { p.x = w - 62; p.dir = -1; } }
      // Draw: sprites face right; mirror for left.
      const s = sprites[p.kind] || {};
      let img = s.still, pivot=null;
      if (p.kind === 'cat') img = p.state === 'walk' || p.target != null ? s.walk[Math.floor(p.t * 10) % s.walk.length] : s.still;
      else if (p.kind === 'hen') img = p.state === 'walk' || p.target != null ? s.walk[Math.floor(p.t * 9) % s.walk.length] : s.peck[Math.floor((p.t + (p.phase || 0)) * 7) % s.peck.length];
      else if (p.kind === 'sparrow') img = p.lift > 0 ? s.flap[Math.floor(p.t * 16) % s.flap.length] : s.peck[Math.floor(p.t * 8) % s.peck.length];
      else { const q=petSprites[p.name],clip=p.state!=='walk'&&p.target==null&&q.clips?.play; if(clip){img=clip.frames[Math.floor(p.t*clip.fps)%clip.frames.length];pivot=clip;}else img=p.state==='walk'||p.target!=null?q.walk[Math.floor(p.t*10)%q.walk.length]:(q.sit||q.still); }
      let hq=null;if(p.kind==='cat'&&sprites.cat.hq){hq=actorFrame('jo',p.state==='walk'||p.target!=null?'walk':'idle',p.dir<0?'west':'east',p.t);img=hq.img;pivot=hq;}if(p.kind==='pet'&&petSprites[p.name].hq){hq=actorFrame(petSprites[p.name].hq,p.state==='walk'||p.target!=null?'walk':'idle',p.dir<0?'west':'east',p.t);img=hq.img;pivot=hq;}
      const scale=hq?hq.scale*.95:p.kind==='pet'?(PET_SCALE[p.name]||1)*.6:.75,iw=Math.round(img.width*scale),ih=Math.round(img.height*scale);
      const x = Math.round(p.x - (pivot?.ax??img.width/2)*scale), y = Math.round(GROUND - (pivot?.ay??img.height)*scale - p.lift);
      g.fillStyle = 'rgba(20, 40, 20, .25)'; g.fillRect(Math.round(p.x - iw * 0.22), GROUND - 1, Math.round(iw * 0.44), 2);
      if (hq ? hq.flip : p.dir < 0) { g.save(); g.scale(-1, 1); g.drawImage(img, -x - iw, y,iw,ih); g.restore(); } else g.drawImage(img, x, y,iw,ih);
    }
    // A butterfly wandering above them.
    fly.ph += dt; fly.x = (w / 2) + Math.sin(fly.ph * 0.31) * w * 0.42; fly.y = 8 + Math.sin(fly.ph * 1.7) * 4;
    const fx = Math.round(fly.x), fy = Math.round(fly.y), open = Math.sin(fly.ph * 18) > 0;
    g.fillStyle = '#3a2a22'; g.fillRect(fx, fy - 1, 1, 3);
    g.fillStyle = '#f6d24a';
    if (open) { g.fillRect(fx - 3, fy - 2, 3, 3); g.fillRect(fx + 1, fy - 2, 3, 3); } else { g.fillRect(fx - 1, fy - 3, 1, 3); g.fillRect(fx + 1, fy - 3, 1, 3); }
  }
  return { frame };
}
