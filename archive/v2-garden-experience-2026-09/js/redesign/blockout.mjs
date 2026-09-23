import * as THREE from '../vendor/three/three.module.js';
import {geography,cameras} from './world-layout.mjs';
// Explicit review query only. It is not the final art/asset pack.
export function mountBlockout(host,app){
  let disposed=false,frame=0,mode='garden';
  const scene=new THREE.Scene();scene.background=new THREE.Color('#bfcec9');scene.fog=new THREE.Fog('#bfcec9',45,155);
  const camera=new THREE.PerspectiveCamera(43,innerWidth/innerHeight,.15,240);
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
  renderer.domElement.setAttribute('aria-hidden','true');host.append(renderer.domElement);
  Object.assign(renderer.domElement.style,{position:'absolute',inset:'0',width:'100%',height:'100%'});
  const ambient=new THREE.HemisphereLight('#fff5de','#5c6d4d',2.1);scene.add(ambient);
  const sun=new THREE.DirectionalLight('#ffdfb3',2.2);sun.position.set(14,20,8);scene.add(sun);
  const mats=new Map(),geometries=new Set();
  function mat(color){if(!mats.has(color))mats.set(color,new THREE.MeshStandardMaterial({color,roughness:1,metalness:0}));return mats.get(color);}
  function mesh(geo,color,x,y,z,parent=scene){geometries.add(geo);const m=new THREE.Mesh(geo,mat(color));m.position.set(x,y,z);parent.add(m);return m;}
  const box=(w,h,d,c,x,y,z,parent)=>mesh(new THREE.BoxGeometry(w,h,d),c,x,y,z,parent);
  const cylinder=(r,h,c,x,y,z,parent,n=12)=>mesh(new THREE.CylinderGeometry(r,r,h,n),c,x,y,z,parent);
  function group(name,position){const g=new THREE.Group();g.name=name;g.position.fromArray(position);scene.add(g);return g;}
  function roof(w,h,d,c,y,parent){const shape=new THREE.Shape();shape.moveTo(-w/2,0);shape.lineTo(w/2,0);shape.lineTo(0,h);shape.closePath();const geometry=new THREE.ExtrudeGeometry(shape,{depth:d,bevelEnabled:false});geometry.translate(0,0,-d/2);return mesh(geometry,c,0,y,0,parent);}
  mesh(new THREE.PlaneGeometry(250,250),'#879367',0,-.03,-40).rotation.x=-Math.PI/2;
  const yard=group('courtyard',geography.courtyard.position);cylinder(7,.04,'#b3ad87',0,0,0,yard,64);
  const house=group('house',geography.house.position);
  box(9,3.2,7,'#d4c7a4',0,1.6,0,house);roof(10,2,8,'#5d6858',3.2,house);
  box(1.5,2.4,.08,'#6b654f',0,1.2,3.55,house);
  [-2.8,2.8].forEach(x=>{box(1.5,1.35,.1,'#8aabac',x,1.85,3.56,house);box(.08,1.4,.13,'#e8dfc5',x,1.85,3.62,house);});
  box(10,.18,2,'#b8aa8c',0,.06,4,house);
  const stall=group('music',geography.music.position);
  box(3.4,.17,3,'#8d7a5b',0,.08,0,stall);
  for(const x of [-1.55,1.55])for(const z of [-1.35,1.35])box(.12,2.3,.12,'#7d6a4c',x,1.2,z,stall);
  roof(3.7,.4,3.25,'#647456',2.2,stall);box(2.8,.7,.7,'#ab8b60',0,.6,.4,stall);
  box(.7,.12,.5,'#514f40',.6,1.03,.4,stall);cylinder(.2,.035,'#232c28',.6,1.11,.4,stall,32);
  for(let i=0;i<5;i++){const sleeve=box(.32,.4,.04,['#a77a54','#b8b89b','#647e80','#c8b681','#747c57'][i],-1+i*.38,1.2,.12,stall);sleeve.rotation.x=-.2;}
  const desk=group('desk',geography.desk.position);box(1.8,.08,.8,'#ad916b',0,.8,0,desk);
  for(const x of [-.75,.75])for(const z of [-.3,.3])box(.07,.8,.07,'#6c674b',x,.4,z,desk);
  box(.4,.02,.28,'#eee4c9',.1,.86,0,desk);
  const glasshouse=group('greenhouse',geography.greenhouse.position);
  box(6,.22,4,'#a8ac8b',0,.1,0,glasshouse);
  const glass=new THREE.MeshStandardMaterial({color:'#b9d3c5',transparent:true,opacity:.23,roughness:.45,depthWrite:false});mats.set('glass',glass);
  const walls=box(6,2.4,4,'#9bb59c',0,1.35,0,glasshouse);walls.material=glass;
  const top=roof(6,.65,4,'#b9d3c5',2.45,glasshouse);top.material=glass;
  for(const x of [-3,-1,1,3])for(const z of [-2,2])box(.075,2.5,.075,'#dde0c5',x,1.3,z,glasshouse);
  for(const z of [-2,2]){box(6,.07,.07,'#dde0c5',0,2.5,z,glasshouse);const edge=box(3.1,.07,.07,'#dde0c5',-1.5,2.78,z,glasshouse);edge.rotation.z=.21;const other=edge.clone();other.position.x=1.5;other.rotation.z=-.21;glasshouse.add(other);}
  box(.08,.08,4,'#dde0c5',0,3.1,0,glasshouse);box(3.8,.08,.8,'#a99573',0,.85,0,glasshouse);
  const stage=group('stage-layer',[0,0,0]);box(9,.3,5,'#635f50',0,.15,-1,stage);
  for(const x of [-4.6,4.6]){box(.15,4,.15,'#464e49',x,2,-2.6,stage);box(.15,4,.15,'#464e49',x,2,1.8,stage);}
  box(9.3,.15,.15,'#464e49',0,4,-2.6,stage);box(9.3,.15,.15,'#464e49',0,4,1.8,stage);
  box(6,2.4,.12,'#c3b390',0,2.1,-2.5,stage);
  for(let row=0;row<3;row++)for(let col=0;col<6;col++){box(.5,.08,.5,'#b7b19a',-2.1+col*.85,.6,3.4+row*.9,stage);box(.5,.45,.06,'#b7b19a',-2.1+col*.85,.9,3.65+row*.9,stage);}
  const bench=group('story-bench',[-15,0,-48]);box(2.6,.15,.65,'#997f59',0,.5,0,bench);box(2.6,.6,.09,'#997f59',0,.9,-.28,bench);for(const x of [-1,1])box(.12,.6,.5,'#605e48',x,.25,0,bench);
  // Hill silhouettes keep their world positions through every camera change.
  for(let i=0;i<9;i++){const hill=mesh(new THREE.SphereGeometry(1,16,8),'#91a18e',-110+i*28,0,-138-(i%3)*14);hill.scale.set(29,12+(i%3)*4,24);}
  function tree(x,z,scale=1){const t=group('tree',[x,0,z]);cylinder(.15,3,'#6f7052',0,1.5,0,t,6);const crown=mesh(new THREE.IcosahedronGeometry(2,1),'#697f59',0,3.6,0,t);crown.scale.set(1,.85,1);t.scale.setScalar(scale);}
  [[-24,-6,1.5],[-9,13,1.2],[23,-18,1.1],[4,-20,1.4],[-26,-52,1.4],[2,16,.8],[-35,-18,1.3],[31,-5,1.2]].forEach(t=>tree(...t));
  // Seeded instancing: deterministic view comparisons, small geometry budget.
  const stemGeo=new THREE.CylinderGeometry(.012,.018,.38,4);geometries.add(stemGeo);
  const flowerGeo=new THREE.IcosahedronGeometry(.07,0);geometries.add(flowerGeo);
  const stems=new THREE.InstancedMesh(stemGeo,mat('#637347'),180),flowers=new THREE.InstancedMesh(flowerGeo,mat('#ece6c8'),180);scene.add(stems,flowers);
  const dummy=new THREE.Object3D();let seed=712;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
  for(let i=0;i<180;i++){let x=random()*66-33,z=random()*75-55;if(Math.hypot(x,z)<8)z+=13;dummy.position.set(x,.2,z);dummy.updateMatrix();stems.setMatrixAt(i,dummy.matrix);dummy.position.y=.42;dummy.updateMatrix();flowers.setMatrixAt(i,dummy.matrix);}
  const target=new THREE.Vector3();
  function draw(){
    if(disposed)return;renderer.render(scene,camera);
    // In the review world, attach each label to its actual fixed landmark.
    if(app.dataset.view==='explore'&&innerWidth>700){
      const points={music:[11,3,5],shows:[0,.2,0],visual:[17,3.1,-12],story:[-15,1,-48]};
      app.querySelectorAll('.dg-hotspot').forEach(link=>{
        const p=new THREE.Vector3().fromArray(points[link.dataset.dgRoute]).project(camera);
        Object.assign(link.style,{position:'fixed',left:`${(p.x+1)*innerWidth/2}px`,top:`${(1-p.y)*innerHeight/2}px`,transform:'translate(-50%,-50%)',width:'180px',minHeight:'0',gap:'8px'});
      });
    }else app.querySelectorAll('.dg-hotspot').forEach(link=>link.removeAttribute('style'));
  }
  function setRoute(id){
    mode=id==='how'?'shows':cameras[id]?id:'garden';stage.visible=mode==='shows';
    renderer.domElement.hidden=id==='flat';if(id==='flat'){cancelAnimationFrame(frame);frame=0;return;}
    const c=cameras[mode],portrait=innerWidth<700,pos=new THREE.Vector3().fromArray(c.position),to=new THREE.Vector3().fromArray(c.target);
    if(portrait)pos.sub(to).multiplyScalar(1.35).add(to);
    camera.fov=c.fov+(portrait?9:0);camera.updateProjectionMatrix();
    const night=mode==='shows'||mode==='sky';scene.background.set(night?'#536566':mode==='story'?'#b9a084':'#bfcec9');scene.fog.color.copy(scene.background);sun.intensity=night?1:2.2;ambient.intensity=night?1.5:2.1;
    cancelAnimationFrame(frame);frame=0;
    // Blockout cuts between cameras; travel collision paths are a later asset pass.
    camera.position.copy(pos);target.copy(to);camera.lookAt(target);draw();
  }
  function resize(){renderer.setSize(innerWidth,innerHeight,false);camera.aspect=innerWidth/innerHeight;setRoute(app.dataset.route,true);}
  function onRoute(e){setRoute(e.detail.id);}
  function visibility(){if(document.hidden){cancelAnimationFrame(frame);frame=0;}else draw();}
  function lost(e){e.preventDefault();dispose();host.dataset.worldError='context-lost';app.querySelector('.dg-review-label').textContent='BẢN NHẸ · WORLD TẠM NGHỈ';app.querySelectorAll('.dg-hotspot').forEach(link=>link.removeAttribute('style'));}
  function dispose(){if(disposed)return;disposed=true;cancelAnimationFrame(frame);app.removeEventListener('dandelion:route',onRoute);removeEventListener('resize',resize);document.removeEventListener('visibilitychange',visibility);renderer.domElement.removeEventListener('webglcontextlost',lost);geometries.forEach(g=>g.dispose());mats.forEach(m=>m.dispose());renderer.dispose();renderer.domElement.remove();}
  app.addEventListener('dandelion:route',onRoute);addEventListener('resize',resize);document.addEventListener('visibilitychange',visibility);renderer.domElement.addEventListener('webglcontextlost',lost);
  resize();
  return {dispose,setRoute,diagnostics:()=>({mode,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,geography,camera:{position:camera.position.toArray(),target:target.toArray()},stageVisible:stage.visible,rafScheduled:!!frame,disposed})};
}
