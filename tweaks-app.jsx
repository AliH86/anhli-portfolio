// tweaks-app.jsx — Tweaks panel for Anh Li portfolio.
// Applies values to the (vanilla) page via CSS variables + body classes.

(function loadPortfolioUpgrade(){
  if (document.getElementById('portfolio-upgrade-css')) return;
  const link = document.createElement('link');
  link.id = 'portfolio-upgrade-css';
  link.rel = 'stylesheet';
  link.href = 'portfolio-upgrade.css?v=20260611';
  document.head.appendChild(link);
})();

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#CC9F4A",
  "bg": "Midnight",
  "heroScale": 100,
  "speed": "Vừa",
  "shader": true,
  "shaderIntensity": 70,
  "grain": true,
  "watermark": true,
  "motion": true
}/*EDITMODE-END*/;

const BG_MOODS = {
  'Midnight': ['#09080E', '#13111C', '#1E1B28', '#2A2636'],
  'Đen':      ['#050507', '#0C0C10', '#16161C', '#222228'],
  'Than ấm':  ['#0E0B09', '#181310', '#241C17', '#322620'],
};
const SPEEDS = { 'Chậm': ['48s', '108s'], 'Vừa': ['30s', '70s'], 'Nhanh': ['18s', '42s'] };

function applyTweaks(t) {
  const r = document.documentElement, b = document.body;
  const a = t.accent || '#CC9F4A';
  r.style.setProperty('--amber', a);
  r.style.setProperty('--amber2', `color-mix(in srgb, ${a} 70%, white)`);
  r.style.setProperty('--amber3', `color-mix(in srgb, ${a} 45%, white)`);
  r.style.setProperty('--border2', `color-mix(in srgb, ${a} 24%, transparent)`);
  r.style.setProperty('--glow', `color-mix(in srgb, ${a} 9%, transparent)`);

  const bg = BG_MOODS[t.bg] || BG_MOODS['Midnight'];
  r.style.setProperty('--ink', bg[0]);
  r.style.setProperty('--ink2', bg[1]);
  r.style.setProperty('--ink3', bg[2]);
  r.style.setProperty('--ink4', bg[3]);

  r.style.setProperty('--hero-scale', (t.heroScale || 100) / 100);

  const sp = SPEEDS[t.speed] || SPEEDS['Vừa'];
  r.style.setProperty('--marquee-dur', sp[0]);
  r.style.setProperty('--album-dur', sp[1]);

  b.classList.toggle('no-grain', !t.grain);
  b.classList.toggle('no-wm', !t.watermark);
  b.classList.toggle('no-motion', !t.motion);
  b.classList.toggle('no-shader', !t.shader);

  // recolor + drive the WebGL shader
  if (window.shaderRefreshPalette) window.shaderRefreshPalette();
  if (window.shaderSetIntensity) window.shaderSetIntensity((t.shaderIntensity ?? 100) / 100);
}

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => { applyTweaks(t); }, [t]);
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Giao diện" />
      <TweakColor label="Màu nhấn" value={t.accent}
        options={['#CC9F4A', '#C97A6D', '#5B8DEF', '#5BA88C']}
        onChange={(v) => setTweak('accent', v)} />
      <TweakRadio label="Nền" value={t.bg}
        options={['Midnight', 'Đen', 'Than ấm']}
        onChange={(v) => setTweak('bg', v)} />

      <TweakSection label="Hero & chữ chạy" />
      <TweakSlider label="Cỡ tên hero" value={t.heroScale} min={80} max={130} step={2} unit="%"
        onChange={(v) => setTweak('heroScale', v)} />
      <TweakRadio label="Tốc độ chữ chạy" value={t.speed}
        options={['Chậm', 'Vừa', 'Nhanh']}
        onChange={(v) => setTweak('speed', v)} />

      <TweakSection label="Nền tương tác" />
      <TweakToggle label="Shader nền (WebGL)" value={t.shader} onChange={(v) => setTweak('shader', v)} />
      <TweakSlider label="Cường độ shader" value={t.shaderIntensity} min={30} max={160} step={5} unit="%"
        onChange={(v) => setTweak('shaderIntensity', v)} />

      <TweakSection label="Hiệu ứng" />
      <TweakToggle label="Hạt phim (grain)" value={t.grain} onChange={(v) => setTweak('grain', v)} />
      <TweakToggle label="Chữ chạy nền (watermark)" value={t.watermark} onChange={(v) => setTweak('watermark', v)} />
      <TweakToggle label="Chuyển động nền" value={t.motion} onChange={(v) => setTweak('motion', v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<TweaksApp />);