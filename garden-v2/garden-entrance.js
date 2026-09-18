// The entrance is an invitation, not a timed loading screen.
async function decodeLoadedImage(image, timeout) {
  if (!image.decode) return;
  // A cached, detached host image may leave decode() pending after a resize.
  // Its successful load is sufficient; decoding is only a paint optimization.
  let timer;
  try {
    await Promise.race([
      image.decode().catch(() => {}),
      new Promise(resolve => { timer = setTimeout(resolve, Math.min(timeout, 750)); })
    ]);
  } finally { clearTimeout(timer); }
}
export async function waitForImage(image, {timeout = 15000} = {}) {
  if (image.complete && image.naturalWidth) { await decodeLoadedImage(image, timeout); return; }
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
  await decodeLoadedImage(image, timeout);
}

// A short doorbell starts inside the click gesture and releases its audio graph.
export function ringDoorbell() {
  try {
    const Context=window.AudioContext||window.webkitAudioContext;
    if(!Context)return;
    const context=new Context();context.resume().catch(()=>context.close());
    const start=context.currentTime+.015;
    [784,1176,1568].forEach((frequency,index)=>{
      const tone=context.createOscillator(),gain=context.createGain();
      tone.type='sine';tone.frequency.value=frequency;
      gain.gain.setValueAtTime(0,start);
      gain.gain.linearRampToValueAtTime(.075/(index+1),start+.007);
      gain.gain.exponentialRampToValueAtTime(.0001,start+1.2);
      tone.connect(gain);gain.connect(context.destination);tone.start(start);tone.stop(start+1.25);
      tone.onended=()=>{tone.disconnect();gain.disconnect();if(index===2)context.close().catch(()=>{});};
    });
  } catch { /* Entry stays available when sound is unavailable. */ }
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
    ringDoorbell();
    entering = true; button.disabled = true; gate.dataset.state = 'entering';
    document.body.dataset.entered = 'entering';
    const finish = () => {
      gate.hidden = true; garden.inert = false; document.body.dataset.entered = 'true';
      garden.setAttribute('tabindex','-1');garden.focus({preventScroll:true});
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
