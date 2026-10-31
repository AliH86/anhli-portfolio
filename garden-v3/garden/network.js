// Deadline covers the body too: a server sending headers then stalling must settle.
export async function fetchWithDeadline(url, options = {}, timeout = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await globalThis.fetch(url, {...options, signal:controller.signal});
    if (!response.ok) throw Error(`HTTP ${response.status}: ${url}`);
    const body = await response.arrayBuffer();
    return new Response(body, {status:response.status, headers:response.headers});
  } catch (error) {
    if (controller.signal.aborted) throw Error(`Tải quá lâu: ${url}`);
    throw error;
  } finally { clearTimeout(timer); }
}
export function loadImage(src, optional = false, timeout = 45000, priority = 'auto') {
  return new Promise((resolve,reject) => {
    const img = new Image(); let timer;
    const done = (error) => {
      clearTimeout(timer); img.onload = img.onerror = null;
      if (error) { img.src = ''; optional ? resolve(null) : reject(error); }
      else resolve(img);
    };
    img.onload = () => done(); img.onerror = () => done(Error(`Không tải được ${src}`));
    timer = setTimeout(() => done(Error(`Tải ảnh quá lâu: ${src}`)), timeout);
    img.fetchPriority = priority;
    img.src = src;
  });
}
export function loadingStage(text) {
  const node = document.querySelector('#loading small'); if (node) node.textContent = text;
}
