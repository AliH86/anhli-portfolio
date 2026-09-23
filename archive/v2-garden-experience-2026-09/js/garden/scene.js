import * as THREE from '../vendor/three/three.module.js';
import { GLTFLoader } from '../vendor/three/GLTFLoader.js';
import { mergeGeometries } from '../vendor/three/BufferGeometryUtils.js';
import { SLEEVES } from './sleeves.js';
const asset=name=>new URL('../../assets/garden/v1/'+name,import.meta.url).href;

// One owner for GPU resources, subscriptions and RAF. Source geometry remains in Blender.
export async function createGarden({host,hotspots,adapter,reduced=false,onError,signal}) {
  let disposed=false,running=false,raf=0,last=0,progress=0,playing=false,dusk=false,frames=0;
  const samples=[], textures=new Set(), geometries=new Set(), materials=new Set(), buttons=[];
  let unsubscribe=()=>{},resizeObserver;
  const scene=new THREE.Scene();
  const camera=new THREE.OrthographicCamera(-5,5,3,-3,.1,50);
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.25));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;
  renderer.setClearColor(0,0);host.append(renderer.domElement);
  const lost=e=>{e.preventDefault();if(!disposed)onError();};
  renderer.domElement.addEventListener('webglcontextlost',lost);
  const ambient=new THREE.HemisphereLight(0xfff5da,0x6b7954,1.8);scene.add(ambient);
  const sun=new THREE.DirectionalLight(0xffdfb0,2.3);sun.position.set(-3,7,6);scene.add(sun);
  let platter,tonearm,root,plantButton,blinkUntil=0,blinkCount=0; const leaves=[],sleeves=[],eyes=[];
  const ownMat=m=>{materials.add(m);return m;};
  const ownGeo=g=>{geometries.add(g);return g;};
  async function texture(name,{flipY=false,optional=false}={}) {
    try {
      const response=await fetch(asset(name),{signal});if(!response.ok)throw Error('Asset '+name+': '+response.status);
      const bitmap=await createImageBitmap(await response.blob(),{imageOrientation:flipY?'flipY':'none'});
      if(disposed||signal?.aborted){bitmap.close();throw new DOMException('Canceled','AbortError');}
      const tex=new THREE.Texture(bitmap);tex.colorSpace=THREE.SRGBColorSpace;tex.needsUpdate=true;tex.flipY=false;
      tex.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());textures.add(tex);return tex;
    }catch(e){if(optional&&!signal?.aborted)return null;throw e;}
  }
  function releaseTexture(t){t.dispose();t.image?.close?.();}
  function dispose(){
    if(disposed)return;disposed=true;running=false;cancelAnimationFrame(raf);raf=0;
    unsubscribe();resizeObserver?.disconnect();signal?.removeEventListener('abort',dispose);
    buttons.forEach(b=>b.remove());
    renderer.domElement.removeEventListener('webglcontextlost',lost);
    scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>materials.add(m));});
    geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(releaseTexture);
    renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();
  }
  signal?.addEventListener('abort',dispose,{once:true});
  function shadow(x,z,sx,sz,opacity=.25){
    const canvas=document.createElement('canvas');canvas.width=canvas.height=128;
    const c=canvas.getContext('2d'),g=c.createRadialGradient(64,64,4,64,64,64);
    g.addColorStop(0,`rgba(46,38,20,${opacity})`);g.addColorStop(1,'rgba(46,38,20,0)');c.fillStyle=g;c.fillRect(0,0,128,128);
    const tex=new THREE.CanvasTexture(canvas);textures.add(tex);
    const mesh=new THREE.Mesh(ownGeo(new THREE.PlaneGeometry(sx,sz)),ownMat(new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false})));
    mesh.rotation.x=-Math.PI/2;mesh.position.set(x,.008,z);scene.add(mesh);
  }
  function makeButton(label,node,activate){
    const b=document.createElement('button');b.type='button';b.className='garden-hotspot';b.setAttribute('aria-label',label);
    b.append(document.createTextNode('+'));const text=document.createElement('span');text.textContent=label;b.append(text);
    b.addEventListener('click',()=>activate(b));hotspots.append(b);buttons.push(b);return b;
  }
  const projectVector=new THREE.Vector3();
  function positionButtons(){
    if(plantButton){
      projectVector.set(.03,.40,1.05).project(camera);
      plantButton.style.left=((projectVector.x+1)*.5*host.clientWidth)+'px';plantButton.style.top=((-projectVector.y+1)*.5*host.clientHeight)+'px';
    }
    scene.updateMatrixWorld(true);
    for(const s of sleeves){
      s.mesh.getWorldPosition(projectVector);projectVector.y-=.26;projectVector.project(camera);
      s.button.style.left=((projectVector.x+1)*.5*host.clientWidth)+'px';s.button.style.top=((-projectVector.y+1)*.5*host.clientHeight)+'px';
      s.button.hidden=projectVector.x<-.93||projectVector.x>.95||projectVector.y<-.83||projectVector.y>.86;
    }
  }
  function layout(){
    if(disposed)return;
    const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;
    renderer.setSize(w,h,false);
    // No free orbit: the flat illustrated host and distant photograph stay believable.
    const p=reduced?(progress>.48?1:0):THREE.MathUtils.smoothstep(progress,0,1);
    const view=6.1-p*.50;camera.left=-view*w/h/2;camera.right=view*w/h/2;camera.top=view/2;camera.bottom=-view/2;
    camera.position.set(.40+p*.50,3.4,10);camera.lookAt(.40+p*.50,1.68,0);camera.updateProjectionMatrix();
    positionButtons();renderOnce();
  }
  function renderOnce(){if(!disposed){renderer.render(scene,camera);frames++;}}
  function tick(now){
    raf=0;if(disposed||!running||reduced)return;
    eyes.forEach(e=>e.visible=now<blinkUntil);
    const dt=last?Math.min((now-last)/1000,.05):0; if(last&&samples.length<600)samples.push(now-last);last=now;
    if(playing&&platter)platter.rotation.y-=dt*3.49;
    leaves.forEach((leaf,i)=>leaf.rotation.z=Math.sin(now*.001+i)*(now<blinkUntil+500?.10:.035));
    sleeves.forEach(s=>{const target=s.hover?.10:0;s.mesh.position.z+=(s.z+target-s.mesh.position.z)*Math.min(1,dt*12);});
    positionButtons();renderOnce();raf=requestAnimationFrame(tick);
  }
  function schedule(){cancelAnimationFrame(raf);raf=0;last=0;if(running&&!reduced&&!disposed)raf=requestAnimationFrame(tick);else renderOnce();}
  try {
    const response=await fetch(asset('garden-models-v1.glb'),{signal});if(!response.ok)throw Error('Garden model '+response.status);
    const gltf=await new GLTFLoader().parseAsync(await response.arrayBuffer(),asset(''));
    root=gltf.scene;scene.add(root);
    if(disposed||signal?.aborted){root.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});throw new DOMException('Canceled','AbortError');}
    root.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)materials.add(o.material);});
    root.getObjectByName('ground_near').visible=false;
    platter=root.getObjectByName('platter_pivot');tonearm=root.getObjectByName('tonearm_pivot');
    for(let i=1;i<=5;i++)leaves.push(root.getObjectByName('leaf_'+String(i).padStart(2,'0')));
    const catalog=new Map(adapter.albums().map(a=>[a.id,a]));
    const loaded=await Promise.allSettled([texture('anhli-gardener-web-v1.webp',{flipY:true}),...SLEEVES.map(s=>texture(s.file,{optional:true}))]);
    if(disposed||signal?.aborted)throw new DOMException('Canceled','AbortError');
    if(loaded[0].status!=='fulfilled')throw loaded[0].reason;
    const li=new THREE.Mesh(ownGeo(new THREE.PlaneGeometry(2.49,2.99)),ownMat(new THREE.MeshBasicMaterial({map:loaded[0].value,transparent:true,alphaTest:.08,depthWrite:true,side:THREE.DoubleSide,toneMapped:false})));
    li.name='Li_static_illustration';li.position.set(-1.23,1.52,.30);scene.add(li);
    // Two aligned eyelid layers. All body/head/hand pixels remain the approved master.
    const eyeSpecs=[{file:'eye-near-closed-v1.png',rect:[480,154,39,24]},{file:'eye-far-closed-v1.png',rect:[536,164,12,17]}];
    const eyeLoads=await Promise.allSettled(eyeSpecs.map(e=>texture(e.file,{flipY:true,optional:true})));
    if(disposed||signal?.aborted)throw new DOMException('Canceled','AbortError');
    eyeSpecs.forEach((spec,i)=>{
      const tex=eyeLoads[i].value;if(!tex)return;
      const [x,y,w,h]=spec.rect;
      const eye=new THREE.Mesh(ownGeo(new THREE.PlaneGeometry(w/853*2.49,h/1024*2.99)),ownMat(new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,toneMapped:false})));
      eye.position.set(li.position.x+((x+w/2)/853-.5)*2.49,li.position.y+(.5-(y+h/2)/1024)*2.99,.304);eye.visible=false;eye.renderOrder=2;scene.add(eye);eyes.push(eye);
    });
    function greet(){if(reduced||matchMedia('(prefers-reduced-motion:reduce)').matches||document.body.classList.contains('no-motion')||disposed)return;blinkUntil=performance.now()+140;blinkCount++;eyes.forEach(e=>e.visible=true);renderOnce();}
    plantButton=makeButton('Chạm nhẹ vào cây, chào Li',null,greet);plantButton.className='garden-plant-button';plantButton.firstChild.textContent='✳';
    plantButton.addEventListener('focus',greet);

    SLEEVES.forEach((s,i)=>{
      const album=catalog.get(s.id);const mesh=root.getObjectByName('sleeve_'+String(i+1).padStart(2,'0'));
      if(!album)throw Error('Missing album ID: '+s.id);
      mesh.material=ownMat(new THREE.MeshBasicMaterial({map:loaded[i+1].value||null,color:loaded[i+1].value?0xffffff:0xd4bd91,side:THREE.DoubleSide,toneMapped:false}));
      const button=makeButton('Mở album '+album.name,mesh,b=>adapter.openAlbum(album.id,b));
      const sleeve={mesh,button,z:mesh.position.z,hover:false};sleeves.push(sleeve);
      const hover=value=>{sleeve.hover=value;if(reduced){mesh.position.z=sleeve.z;renderOnce();}};
      button.addEventListener('pointerenter',()=>hover(true));button.addEventListener('pointerleave',()=>hover(false));
      button.addEventListener('focus',()=>hover(true));button.addEventListener('blur',()=>hover(false));
    });
    shadow(-1.2,.5,2.6,1.5,.32);shadow(2.7,.15,4.5,2.3,.4);shadow(.03,1.0,1.2,.85,.28);
    // Merge only static opaque geometry by material. Animated named nodes remain separate.
    root.updateMatrixWorld(true);const buckets=new Map(),staticMeshes=[];
    root.traverse(o=>{
      if(!o.isMesh||!o.visible)return;
      let animated=false;for(let n=o;n&&n!==root;n=n.parent)if(/^(sleeve_|platter_pivot|tonearm_pivot|leaf_)/.test(n.name))animated=true;
      if(animated)return;
      const g=o.geometry.clone();g.applyMatrix4(o.matrixWorld);ownGeo(g);
      if(!buckets.has(o.material))buckets.set(o.material,[]);buckets.get(o.material).push(g);staticMeshes.push(o);
    });
    for(const [material,parts] of buckets){const combined=mergeGeometries(parts);if(combined)scene.add(new THREE.Mesh(ownGeo(combined),material));}
    staticMeshes.forEach(o=>o.visible=false);
    unsubscribe=adapter.subscribePlayer(state=>{playing=state.playing;if(tonearm)tonearm.rotation.y=playing?-.22:0;renderOnce();});
    resizeObserver=new ResizeObserver(layout);resizeObserver.observe(host);layout();
    return {
      setProgress(v){if(v===progress)return;progress=v;layout();},
      setDusk(v){dusk=v;ambient.color.set(v?0xf3d1ba:0xfff5da);sun.color.set(v?0xffb075:0xffdfb0);sun.intensity=v?1.6:2.3;renderOnce();},
      setReduced(v){if(reduced===v)return;reduced=v;if(v){blinkUntil=0;eyes.forEach(e=>e.visible=false);}layout();schedule();},
      setRunning(v){if(running===v)return;running=v;schedule();},
      dispose,
      diagnostics(){const sorted=[...samples].sort((a,b)=>a-b);return {renderer:'Three.js '+THREE.REVISION,blinkCount,eyeLayers:eyes.length,frames,running,rafScheduled:!!raf,playing,dusk,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,textures:renderer.info.memory.textures,geometries:renderer.info.memory.geometries,textureBytesEstimated:[...textures].reduce((n,t)=>n+(t.image?.width||0)*(t.image?.height||0)*4*4/3,0),dpr:renderer.getPixelRatio(),frameTimeP50:sorted[Math.floor(sorted.length*.5)]||null,frameTimeP95:sorted[Math.floor(sorted.length*.95)]||null,sampleFrames:sorted.length,vinylAngle:platter?.rotation.y,albumIds:SLEEVES.map(s=>s.id)};}
    };
  }catch(error){dispose();throw error;}
}
