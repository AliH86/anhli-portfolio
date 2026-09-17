// The entrance is an invitation, not a timed loading screen.
export async function waitForImage(image, {timeout = 15000} = {}) {
  if (image.complete && image.naturalWidth) { await image.decode?.().catch(() => {}); return; }
  await new Promise((resolve, reject) => {
    const finish = (error) => {
      clearTimeout(timer); image.removeEventListener('load', loaded); image.removeEventListener('error', failed);
      error ? reject(error) : resolve();
    };
    const loaded = () => finish();
    const failed = () => finish(new Error('scene-load'));
    const timer = setTimeout(failed, timeout);
    image.addEventListener('load', loaded, {once:true}); image.addEventListener('error', failed, {once:true});
    if (image.complete) image.naturalWidth ? loaded() : failed();
  });
  await image.decode?.().catch(() => {});
}

export function initEntrance({prepare, onEnter}) {
  const gate = document.querySelector('#entrance'), garden = document.querySelector('#garden');
  const button = document.querySelector('#entrance-bell'), label = document.querySelector('#entrance-action');
  const hint = document.querySelector('#entrance-status'), quote = document.querySelector('#entrance-quote');
  let ready = false, entering = false, attempt = 0;
  garden.inert = true;
  document.body.dataset.entered = 'false';
  gate.focus({preventScroll:true});
  fetch('./data/entrance-quotes.json').then(r => r.ok ? r.json() : null).then(data => {
    const phase = document.body.dataset.dayPhase;
    const lines = data?.filter(q => q.phase === 'both' || q.phase === phase);
    if (lines?.length) quote.textContent = lines[Math.floor(Math.random() * lines.length)].text;
  }).catch(() => {});

  async function load() {
    const token = ++attempt; ready = false; button.disabled = true; gate.dataset.state = 'loading';
    label.textContent = 'Vườn đang thức giấc…'; hint.textContent = 'Li đang mở cửa sổ, kê lại chiếc ghế.';
    try {
      await prepare(attempt > 1);
      if (token !== attempt) return;
      ready = true; gate.dataset.state = 'ready'; button.disabled = false;
      label.textContent = 'Nhấn chuông'; hint.textContent = 'Ghé chơi. Nhạc mở khi bạn muốn nghe.';
      if (document.activeElement === gate) button.focus({preventScroll:true});
    } catch {
      if (token !== attempt) return;
      gate.dataset.state = 'error'; button.disabled = false;
      label.textContent = 'Thử mở cửa lại'; hint.textContent = 'Cảnh vườn chưa tải được. Mình thử lại nhé.';
    }
  }
  button.addEventListener('click', () => {
    if (!ready) { if (gate.dataset.state === 'error') load(); return; }
    if (entering) return;
    entering = true; button.disabled = true; gate.dataset.state = 'entering';
    document.body.dataset.entered = 'entering';
    const finish = () => {
      gate.hidden = true; garden.inert = false; document.body.dataset.entered = 'true';
      document.querySelector('.wordmark').focus({preventScroll:true});
      document.dispatchEvent(new Event('garden-entered')); onEnter();
    };
    // Only the reveal has a duration. Readiness has no minimum waiting time.
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) finish(); else setTimeout(finish, 620);
  });
  gate.addEventListener('keydown', event => {
    if (event.key === 'Tab') { event.preventDefault(); (button.disabled ? gate : button).focus(); }
  });
  load();
}
