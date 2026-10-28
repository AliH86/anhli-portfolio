// One bundled transfer for the original PNG frames; individual files remain a fallback.
let bundle;
export function warmSpriteBundle() {
  if (!bundle) bundle = Promise.all([
    fetch('../sprite-bundle/index.json?v=70').then(r => { if (!r.ok) throw Error('sprite index'); return r.json(); }),
    fetch('../sprite-bundle/frames.bin?v=70').then(r => { if (!r.ok) throw Error('sprite bundle'); return r.arrayBuffer(); }),
  ]).catch(() => null);
  return bundle;
}
function loadImage(src, optional) {
  return new Promise((resolve, reject) => {
    const image = new Image(); image.onload = () => resolve(image);
    image.onerror = () => optional ? resolve(null) : reject(Error(`Không tải được ${src}`)); image.src = src;
  });
}
export async function loadSprite(src, optional = false) {
  const data = await warmSpriteBundle();
  const ROOT = new URL('../', document.baseURI).href;
  const absolute = new URL(src, document.baseURI).href;
  const key = absolute.startsWith(ROOT) ? absolute.slice(ROOT.length).split('?')[0] : '';
  const entry = data?.[0]?.[key];
  if (!entry) return loadImage(src, optional);
  const url = URL.createObjectURL(new Blob([data[1].slice(entry[0], entry[0] + entry[1])], {type:'image/png'}));
  try { return await loadImage(url, false); }
  catch { return loadImage(src, optional); }
  finally { URL.revokeObjectURL(url); }
}
