// Deadline covers the body too: a server sending headers then stalling must settle.
export async function fetchWithDeadline(url, options = {}, timeout = 45000) {
  // A stalled transfer gets one fresh attempt; a real HTTP answer is final.
  const attempt = async (limit) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), limit);
    try {
      const response = await globalThis.fetch(url, {...options, signal:controller.signal});
      if (!response.ok) throw Object.assign(Error(`HTTP ${response.status}: ${url}`), {final:true});
      const body = await response.arrayBuffer();
      return new Response(body, {status:response.status, headers:response.headers});
    } catch (error) {
      if (controller.signal.aborted) throw Error(`Tải quá lâu: ${url}`);
      throw error;
    } finally { clearTimeout(timer); }
  };
  try { return await attempt(timeout * .4); }
  catch (error) { if (error.final) throw error; return attempt(timeout * .6); }
}
// A second request joins if the first stalls or fails; whichever finishes first wins.
export function loadImage(src, optional = false, timeout = 45000, priority = 'auto') {
  return new Promise((resolve,reject) => {
    const tries = []; let timer, backup, settled = false, failed = 0;
    const done = (img, error) => {
      if (settled) return; settled = true;
      clearTimeout(timer); clearTimeout(backup);
      for (const t of tries) { t.onload = t.onerror = null; if (t !== img) t.src = ''; }
      if (error) optional ? resolve(null) : reject(error);
      else resolve(img);
    };
    const start = (url) => {
      const img = new Image(); tries.push(img);
      img.onload = () => done(img);
      img.onerror = () => { if (++failed === 2) done(null, Error(`Không tải được ${src}`)); else if (tries.length === 1) { clearTimeout(backup); retry(); } };
      img.fetchPriority = priority;
      img.src = url;
    };
    const retry = () => start(src + (src.includes('?') ? '&' : '?') + 'retry=1');
    timer = setTimeout(() => done(null, Error(`Tải ảnh quá lâu: ${src}`)), timeout);
    backup = setTimeout(retry, timeout * .3);
    start(src);
  });
}
// Large images continue from the last byte received instead of restarting a stalled download.
export async function fetchResumable(url, {stallMs=8000, tries=6}={}) {
  const parts = []; let received = 0, type = '';
  for (let attempt = 0; attempt < tries; attempt++) {
    const controller = new AbortController();
    let watchdog; const arm = () => { clearTimeout(watchdog); watchdog = setTimeout(() => controller.abort(), stallMs); };
    try {
      arm();
      const response = await globalThis.fetch(url, {signal:controller.signal, headers:received ? {Range:`bytes=${received}-`} : {}});
      if (response.status === 200) { parts.length = 0; received = 0; }
      else if (response.status !== 206) throw Object.assign(Error(`HTTP ${response.status}: ${url}`), {final:true});
      type = response.headers.get('content-type') || type;
      const reader = response.body.getReader();
      for (;;) {
        const {done, value} = await reader.read();
        if (done) return new Blob(parts, {type});
        parts.push(value); received += value.length; arm();
      }
    } catch (error) { if (error.final) throw error; }
    finally { clearTimeout(watchdog); }
  }
  throw Error(`Tải quá lâu: ${url}`);
}
export async function loadLargeImage(src, optional = false, timeout = 45000, priority = 'auto') {
  let blob;
  try { blob = await fetchResumable(src); }
  catch { return loadImage(src, optional, timeout, priority); }
  const url = URL.createObjectURL(blob);
  try { return await loadImage(url, optional, timeout, priority); }
  finally { URL.revokeObjectURL(url); }
}
export function loadingStage(text) {
  const node = document.querySelector('#loading small'); if (node) node.textContent = text;
}
