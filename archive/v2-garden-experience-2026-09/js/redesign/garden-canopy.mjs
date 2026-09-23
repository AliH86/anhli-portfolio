// One image, locally displaced at tree crowns. No duplicate canopy photograph.
// Context failure retains the ordinary responsive picture; no Three.js or GLBs.
export function mountGardenCanopy(scene){
 const picture=scene.querySelector('.dg-garden-backdrop'),image=picture.querySelector('img');
 const canvas=document.createElement('canvas');canvas.className='dg-garden-canopy';canvas.setAttribute('aria-hidden','true');
 const gl=canvas.getContext('webgl',{alpha:false,antialias:false,depth:false,powerPreference:'low-power'});
 if(!gl)return {update(){},inspect:()=>({ready:false,fallback:true})};
 let enabled=false,running=false,ready=false,frame=0,last=0,time=0,previous=0,version=0,lost=false;
 const vertex=`attribute vec2 p;varying vec2 uv;void main(){uv=p*.5+.5;gl_Position=vec4(p,0.,1.);}`;
 const fragment=`precision mediump float;
 varying vec2 uv;uniform sampler2D photo;uniform vec2 viewport;uniform vec2 imageSize;uniform vec2 pointer;uniform float clock;uniform float portrait;
 float oval(vec2 p,vec2 c,vec2 r){return 1.-smoothstep(.45,1.,length((p-c)/r));}
 float rect(vec2 p,vec4 b){return smoothstep(b.x-.012,b.x,p.x)*(1.-smoothstep(b.z,b.z+.012,p.x))*smoothstep(b.y-.01,b.y,p.y)*(1.-smoothstep(b.w,b.w+.01,p.y));}
 void main(){
  vec2 fit=vec2(1.);float a=viewport.x/viewport.y,b=imageSize.x/imageSize.y;if(a>b)fit.y=b/a;else fit.x=a/b;
  vec2 q=(vec2(uv.x,1.-uv.y)-.5)*fit+.5;
  float near=0.,crown=0.,protect=0.;
  if(portrait>.5){
   near=oval(q,vec2(.03,.055),vec2(.43,.19));
   crown=max(oval(q,vec2(.08,.325),vec2(.22,.115)),oval(q,vec2(.70,.382),vec2(.23,.095)));
   crown=max(crown,oval(q,vec2(.985,.36),vec2(.17,.095)));
   protect=max(rect(q,vec4(0.,.39,.48,.575)),rect(q,vec4(.655,.451,.90,.56)));
  }else{
   near=oval(q,vec2(.065,.035),vec2(.32,.245));
   crown=max(oval(q,vec2(.095,.28),vec2(.13,.14)),oval(q,vec2(.282,.302),vec2(.13,.145)));
   crown=max(crown,oval(q,vec2(.423,.355),vec2(.09,.10)));
   crown=max(crown,oval(q,vec2(.635,.324),vec2(.105,.14)));
   crown=max(crown,oval(q,vec2(.86,.30),vec2(.17,.17)));
   protect=max(rect(q,vec4(0.,.34,.31,.68)),rect(q,vec4(.56,.41,.72,.63)));
   protect=max(protect,max(rect(q,vec4(.74,.46,.96,.68)),rect(q,vec4(.38,.44,.50,.62))));
  }
  float mask=max(near,crown)*(1.-protect);
  float gust=sin(clock*.91+q.y*8.)*.68+sin(clock*1.57+q.x*17.)*.32;
  float leaf=sin(clock*2.1+q.x*72.+q.y*29.)*.23;
  vec2 bend=vec2((gust+leaf)*.0028,sin(clock*.73+q.x*11.)*.0011)*mask;
  bend+=vec2(pointer.x*.006,pointer.y*.002)*near;
  vec2 sampleUV=clamp(q+bend,vec2(.001),vec2(.999));
  gl_FragColor=texture2D(photo,vec2(sampleUV.x,1.-sampleUV.y));
 }`;
 function shader(type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;}
 let program;
 try{program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vertex));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));}catch{return {update(){},inspect:()=>({ready:false,fallback:true})};}
 gl.useProgram(program);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
 const location=gl.getAttribLocation(program,'p');gl.enableVertexAttribArray(location);gl.vertexAttribPointer(location,2,gl.FLOAT,false,0,0);
 const uniforms=Object.fromEntries(['viewport','imageSize','pointer','clock','portrait'].map(n=>[n,gl.getUniformLocation(program,n)]));
 const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
 function size(){const r=scene.getBoundingClientRect(),dpr=Math.min(devicePixelRatio,1.25);canvas.width=Math.round(r.width*dpr);canvas.height=Math.round(r.height*dpr);gl.viewport(0,0,canvas.width,canvas.height);gl.uniform2f(uniforms.viewport,canvas.width,canvas.height);draw();}
 function draw(){if(!ready||lost)return;const x=parseFloat(scene.style.getPropertyValue('--garden-x'))||0,y=parseFloat(scene.style.getPropertyValue('--garden-y'))||0;gl.uniform2f(uniforms.pointer,x,y);gl.uniform1f(uniforms.clock,time);gl.drawArrays(gl.TRIANGLES,0,6);}
 function tick(now){frame=0;if(!enabled||!running||!ready||lost){previous=0;return;}if(now-last>=32){if(previous)time+=Math.min((now-previous)/1000,.1);previous=now;last=now;draw();}frame=requestAnimationFrame(tick);}
 function schedule(){if(enabled&&running&&ready&&!frame&&!lost)frame=requestAnimationFrame(tick);}
 async function load(){const request=++version;try{await image.decode();if(request!==version||lost)return;gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);gl.uniform2f(uniforms.imageSize,image.naturalWidth,image.naturalHeight);gl.uniform1f(uniforms.portrait,image.naturalHeight>image.naturalWidth?1:0);ready=true;size();scene.classList.add('dg-canopy-ready');schedule();}catch{ready=false;scene.classList.remove('dg-canopy-ready');}}
 scene.insertBefore(canvas,picture.nextSibling);image.addEventListener('load',load);const observer=new ResizeObserver(size);observer.observe(scene);load();
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();lost=true;ready=false;cancelAnimationFrame(frame);frame=0;scene.classList.remove('dg-canopy-ready');});
 return {update(state){enabled=state.enabled;running=state.running;if(!enabled||!running){cancelAnimationFrame(frame);frame=0;previous=0;if(state.reduced){time=0;scene.classList.remove('dg-canopy-ready');}else if(ready&&!lost)scene.classList.add('dg-canopy-ready');draw();}else{if(ready&&!lost)scene.classList.add('dg-canopy-ready');schedule();}},inspect:()=>({ready,enabled,running,frame:Boolean(frame),time,canvas:true,lost})};
}
