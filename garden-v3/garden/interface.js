import { reveal, focusScope, announce, setMotion, getMotion } from './motion.js?v=70';

export function initInterface({ visit, live, callPets, resetLi, setWide, openDaily }) {
  const panel = document.getElementById('garden-settings');
  const clock = document.getElementById('clock');
  const close = () => { reveal(panel, false); focusScope(panel, false); clock.setAttribute('aria-expanded', 'false'); };
  const open = () => { reveal(panel, true); focusScope(panel, true); clock.setAttribute('aria-expanded', 'true'); };
  clock.addEventListener('click', () => panel.hidden || panel.inert ? open() : close());
  document.getElementById('weather').addEventListener('click', open);
  document.getElementById('settings-close').addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) close(); });
  document.addEventListener('pointerdown', e => { if (!panel.hidden && !panel.contains(e.target) && !e.target.closest('#clock,#weather')) close(); });
  document.getElementById('time-mode').addEventListener('change', e => {
    const now = new Date();
    live.setHour(e.target.value === 'real' ? now.getHours() + now.getMinutes() / 60 : Number(e.target.value));
    resetLi(); announce(e.target.selectedOptions[0].textContent);
  });
  document.getElementById('weather-mode').addEventListener('change', e => {
    live.wx.override = e.target.value || null;
    announce(`Thời tiết: ${e.target.selectedOptions[0].textContent}`);
  });
  const motion = document.getElementById('motion-mode'); motion.value = getMotion();
  motion.addEventListener('change', e => setMotion(e.target.value));
  document.getElementById('daily-open').addEventListener('click',()=>{close();openDaily();});
  document.getElementById('call-pets').addEventListener('click',()=>{close();callPets();});
  document.getElementById('water-plants').addEventListener('click',()=>{close();visit('garden');});
  document.getElementById('welcome-music').addEventListener('click', () => visit('stall'));
  document.getElementById('welcome-close').addEventListener('click', () => reveal(document.getElementById('garden-welcome'), false));
  document.getElementById('return-garden').addEventListener('click', () => { visit(null); setWide(); });
  return { closeSettings: close };
}
