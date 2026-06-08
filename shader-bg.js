/* shader-bg.js — Interactive WebGL nebula wallpaper for the hero.
   Domain-warped fbm fog in midnight→amber, reacts to mouse + click ripples.
   Self-contained: creates its own <canvas>, mounts into #shaderHost.
   Pauses when the hero is offscreen or the tab is hidden (perf-friendly). */
(function () {
  const host = document.getElementById('shaderHost');
  if (!host) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'shaderCanvas';
  Object.assign(canvas.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', display: 'block' });
  host.appendChild(canvas);

  const gl = canvas.getContext('webgl', { antialias: false, alpha: true, premultipliedAlpha: false });
  if (!gl) { host.classList.add('shader-unsupported'); return; }

  const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.0,1.0); }`;

  const FRAG = `
  precision highp float;
  uniform vec2  u_res;
  uniform float u_time;
  uniform vec2  u_mouse;     // 0..1, y up
  uniform float u_mDown;     // 0..1 eased click pulse
  uniform vec3  u_cBase;     // midnight
  uniform vec3  u_cMid;      // warm taupe
  uniform vec3  u_cHot;      // amber accent
  uniform float u_intensity;

  // hash / noise / fbm ---------------------------------------------------
  float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    float a = hash(i), b = hash(i+vec2(1.,0.)), c = hash(i+vec2(0.,1.)), d = hash(i+vec2(1.,1.));
    vec2 u = f*f*(3.-2.*f);
    return mix(a,b,u.x) + (c-a)*u.y*(1.-u.x) + (d-b)*u.x*u.y;
  }
  float fbm(vec2 p){
    float v = 0.0, amp = 0.55; mat2 m = mat2(1.6,1.2,-1.2,1.6);
    for(int i=0;i<6;i++){ v += amp*noise(p); p = m*p; amp *= 0.5; }
    return v;
  }

  void main(){
    vec2 uv = gl_FragCoord.xy / u_res.xy;
    vec2 p = (gl_FragCoord.xy - 0.5*u_res.xy) / u_res.y; // aspect-correct, centered
    vec2 m = (u_mouse - 0.5) * vec2(u_res.x/u_res.y, 1.0);

    float t = u_time * 0.045;

    // domain warp, gently pulled toward the cursor
    vec2 drift = (m - p) * 0.25;
    vec2 q = vec2(fbm(p*1.4 + vec2(0.0, t) + drift), fbm(p*1.4 + vec2(5.2,-t)));
    vec2 r = vec2(fbm(p*1.8 + 1.8*q + vec2(1.7, 9.2) - drift*0.6),
                  fbm(p*1.8 + 1.8*q + vec2(8.3, 2.8)));
    float f = fbm(p*1.6 + 2.2*r + t);

    // base gradient + fog (luminous, on-brand)
    vec3 lift = u_cMid * 1.35 + 0.02;
    vec3 col = mix(u_cBase, lift, smoothstep(-0.25, 1.05, f*1.3));
    col += lift * 0.5 * smoothstep(0.15, 0.95, f);                        // ambient structure
    col = mix(col, u_cHot, smoothstep(0.42, 1.05, f + 0.45*length(r)) * 1.0); // amber veins
    col += u_cHot * pow(max(f-0.15,0.0), 1.7) * 0.5 * u_intensity;        // warm bloom

    // cursor halo
    float md = length(p - m);
    float halo = exp(-md*md*1.8);
    col += u_cHot * halo * (0.22 + 0.34*u_mDown) * u_intensity;
    col += lift * exp(-md*md*0.7) * 0.5 * u_intensity;                   // soft aura

    // click ripple
    float ring = sin(md*20.0 - u_time*3.2) * exp(-md*2.2);
    col += u_cHot * max(ring,0.0) * u_mDown * 0.3;

    // vignette + faint grain to seat it in the page
    col *= 1.0 - 0.5*pow(length((uv-0.5)*vec2(1.1,1.25)), 2.2);
    col += (hash(gl_FragCoord.xy + u_time) - 0.5) * 0.015;

    gl_FragColor = vec4(col, 1.0);
  }`;

  function compile(type, src) {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); }
    return s;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog); gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const U = {
    res: gl.getUniformLocation(prog, 'u_res'),
    time: gl.getUniformLocation(prog, 'u_time'),
    mouse: gl.getUniformLocation(prog, 'u_mouse'),
    mDown: gl.getUniformLocation(prog, 'u_mDown'),
    cBase: gl.getUniformLocation(prog, 'u_cBase'),
    cMid: gl.getUniformLocation(prog, 'u_cMid'),
    cHot: gl.getUniformLocation(prog, 'u_cHot'),
    intensity: gl.getUniformLocation(prog, 'u_intensity'),
  };

  // palette (reads from CSS so Tweaks can recolor) ----------------------
  function hex(v, fb) {
    v = (v || '').trim();
    const m = v.match(/^#?([0-9a-f]{6})$/i);
    if (!m) return fb;
    const n = parseInt(m[1], 16);
    return [(n>>16&255)/255, (n>>8&255)/255, (n&255)/255];
  }
  let pal = { base:[0.035,0.031,0.055], mid:[0.18,0.16,0.22], hot:[0.8,0.62,0.29] };
  function refreshPalette() {
    const cs = getComputedStyle(document.documentElement);
    pal.base = hex(cs.getPropertyValue('--ink'),  pal.base);
    pal.mid  = hex(cs.getPropertyValue('--ink4'), pal.mid);
    pal.hot  = hex(cs.getPropertyValue('--amber'),pal.hot);
  }
  refreshPalette();
  window.shaderRefreshPalette = refreshPalette;

  // state ---------------------------------------------------------------
  let DPR = Math.min(window.devicePixelRatio || 1, 1.6);
  let W = 0, H = 0;
  const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
  let mDown = 0, mDownTarget = 0;
  let intensity = 0.7;
  window.shaderSetIntensity = v => { intensity = v; };

  function resize() {
    const r = host.getBoundingClientRect();
    W = Math.max(1, Math.floor(r.width * DPR));
    H = Math.max(1, Math.floor(r.height * DPR));
    canvas.width = W; canvas.height = H;
    gl.viewport(0, 0, W, H);
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('pointermove', e => {
    const r = host.getBoundingClientRect();
    mouse.tx = (e.clientX - r.left) / r.width;
    mouse.ty = 1 - (e.clientY - r.top) / r.height;
  }, { passive: true });
  window.addEventListener('pointerdown', () => { mDownTarget = 1; });
  window.addEventListener('pointerup',   () => { mDownTarget = 0; });

  // pause when hero offscreen / tab hidden
  let visible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) loop(); },
      { threshold: 0.01 }).observe(host);
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden && visible) loop(); });

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let running = false, start = performance.now();
  function frame(now) {
    if (!visible || document.hidden) { running = false; return; }
    running = true;
    mouse.x += (mouse.tx - mouse.x) * 0.06;
    mouse.y += (mouse.ty - mouse.y) * 0.06;
    mDown += (mDownTarget - mDown) * 0.08;
    const t = reduce ? 0 : (now - start) / 1000;
    gl.uniform2f(U.res, W, H);
    gl.uniform1f(U.time, t);
    gl.uniform2f(U.mouse, mouse.x, mouse.y);
    gl.uniform1f(U.mDown, mDown);
    gl.uniform3fv(U.cBase, pal.base);
    gl.uniform3fv(U.cMid, pal.mid);
    gl.uniform3fv(U.cHot, pal.hot);
    gl.uniform1f(U.intensity, intensity);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    host.classList.add('ready');
    if (reduce) { running = false; return; } // single frame when reduced motion
    requestAnimationFrame(frame);
  }
  function loop() { if (!running) requestAnimationFrame(frame); }
  loop();
})();
