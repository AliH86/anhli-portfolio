import spriteIndex from '../sprite-bundle/index-v34.json' with {type:'json'};
import { fetchWithDeadline, loadImage } from './network.js?v=3506';
let indexPromise;
const parts = new Map(), images = new Map();
export function warmSpriteBundle() {
  return indexPromise ||= Promise.resolve(spriteIndex);
}
function part(name) {
  if (!parts.has(name)) parts.set(name, fetchWithDeadline(`../sprite-bundle/${name}?v=3506`,{},45000).then(r=>r.arrayBuffer()).catch(()=>null));
  return parts.get(name);
}
async function decode(src, optional) {
  const index = await warmSpriteBundle();
  const ROOT = new URL('../',document.baseURI).href, absolute = new URL(src,document.baseURI).href;
  const key = absolute.startsWith(ROOT) ? absolute.slice(ROOT.length).split('?')[0] : '';
  const entry = index?.[key], data = entry && await part(entry[2] || 'frames.bin');
  if (!data || entry[0]+entry[1]>data.byteLength) return loadImage(src,optional);
  const url = URL.createObjectURL(new Blob([data.slice(entry[0],entry[0]+entry[1])],{type:'image/png'}));
  try { return await loadImage(url); }
  catch { return loadImage(src,optional); }
  finally { URL.revokeObjectURL(url); }
}
export function loadSprite(src, optional=false) {
  const key = `${src}|${optional}`;
  if (!images.has(key)) images.set(key,decode(src,optional).catch(error=>{images.delete(key);throw error;}));
  return images.get(key);
}
