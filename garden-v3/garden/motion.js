// Shared motion and keyboard behavior. The native audio player lives elsewhere.
const media = matchMedia('(prefers-reduced-motion: reduce)');
let preference = 'system';
try { preference = localStorage.getItem('li-garden-motion') || 'system'; } catch {}
export const reducedMotion = () => preference === 'reduce' || (preference === 'system' && media.matches);
function sync() { document.body.classList.toggle('reduce-motion', reducedMotion()); }
media.addEventListener('change', sync); sync();
export function setMotion(value) { preference = value; try { localStorage.setItem('li-garden-motion', value); } catch {} sync(); }
export const getMotion = () => preference;
export function arrive(node) {
  if (!node || reducedMotion()) return;
  node.animate([{ opacity: 0, translate: '0 16px' }, { opacity: 1, translate: '0 0' }], { duration: 360, easing: 'cubic-bezier(.2,.8,.2,1)' });
}
const pending = new WeakMap();
export function reveal(node, on) {
  pending.get(node)?.cancel(); pending.delete(node);
  node.inert = !on;
  if (on) { node.hidden = false; arrive(node); }
  else if (!node.hidden && !reducedMotion()) {
    const a = node.animate([{ opacity: 1 }, { opacity: 0, translate: '0 10px' }], { duration: 160, easing: 'ease-in' });
    pending.set(node, a);
    a.onfinish = () => { if (pending.get(node) === a) { node.hidden = true; pending.delete(node); } };
  } else node.hidden = true;
}
const focusable = (root) => [...root.querySelectorAll('button,a[href],input,select,[tabindex="0"]')].filter(n => !n.disabled && !n.closest('[inert]') && n.getClientRects().length);
let activeScope = null;
export function focusScope(root, on) {
  if (on) {
    root._returnFocus = document.activeElement;
    activeScope = root;
    queueMicrotask(() => focusable(root)[0]?.focus({ preventScroll: true }));
  } else if (activeScope === root) {
    activeScope = null;
    const target = root._returnFocus;
    if (target?.isConnected && target.getClientRects().length) target.focus({ preventScroll: true });
    else document.querySelector('.mbtn')?.focus({ preventScroll: true });
  }
}
document.addEventListener('keydown', e => {
  if (e.key !== 'Tab' || !activeScope || activeScope.hidden || activeScope.inert) return;
  const scope = activeScope.querySelector('.lightbox') || activeScope;
  const nodes = focusable(scope); if (!nodes.length) return;
  const first = nodes[0], last = nodes.at(-1);
  if (e.shiftKey && (document.activeElement === first || !scope.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && (document.activeElement === last || !scope.contains(document.activeElement))) { e.preventDefault(); first.focus(); }
});
let timer;
export function announce(message) {
  const toast = document.getElementById('notice');
  toast.textContent = message; toast.hidden = false; arrive(toast);
  clearTimeout(timer); timer = setTimeout(() => { toast.hidden = true; }, 3600);
}
