// Opt-in field recordings; sample-accurate native loops, independent of music.
// Overlap the tail/head with an equal-power fade, then join adjacent source samples.
export function seamlessAmbience(context,input,seconds=3){
  const fade=Math.min(Math.round(seconds*input.sampleRate),Math.floor(input.length/4));
  if(fade<2)return input;
  const length=input.length-fade,output=context.createBuffer(input.numberOfChannels,length,input.sampleRate);
  for(let channel=0;channel<input.numberOfChannels;channel++){
    const source=input.getChannelData(channel),target=output.getChannelData(channel);
    target.set(source.subarray(fade));
    for(let i=0;i<fade;i++){
      const angle=i/(fade-1)*Math.PI/2;
      target[length-fade+i]=source[input.length-fade+i]*Math.cos(angle)+source[i]*Math.sin(angle);
    }
  }
  return output;
}
export function initGardenAmbience({audio,notice}) {
  const button=document.querySelector('#ambience-toggle'),body=document.body;
  let enabled=false,blocked=document.hidden,phase='day',context,master,active,version=0;
  const buffers=new Map(),voices=new Set(),listeners=[];
  const on=(target,event,fn)=>{target.addEventListener(event,fn);listeners.push(()=>target.removeEventListener(event,fn));};
  function ui(){
    body.dataset.ambientEnabled=String(enabled);button.setAttribute('aria-pressed',String(enabled));
    button.setAttribute('aria-label',enabled?'Tắt tiếng vườn':'Bật tiếng vườn');button.title=enabled?'Tắt tiếng vườn':'Nghe tiếng chim và đêm trong vườn';
  }
  function stop(){
    version++;active=null;body.dataset.ambientSound='quiet';
    for(const voice of voices){voice.source.onended=null;try{voice.source.stop();}catch{}voice.source.disconnect();voice.gain.disconnect();}
    voices.clear();if(context?.state==='running')context.suspend().catch(()=>{});
  }
  function volume(){
    if(master&&context)master.gain.setTargetAtTime(document.querySelector('#video-stage iframe')?0:audio.paused?.65:.16,context.currentTime,.6);
  }
  async function bufferFor(current){
    if(!buffers.has(current))buffers.set(current,fetch(`./assets/ambience/${current==='day'?'garden-birds':'night-crickets'}.mp3`)
      .then(r=>{if(!r.ok)throw Error('ambient load');return r.arrayBuffer();})
      .then(data=>context.decodeAudioData(data)).then(buffer=>seamlessAmbience(context,buffer))
      .catch(error=>{buffers.delete(current);throw error;}));
    return buffers.get(current);
  }
  function retire(voice,time){
    const gain=voice.gain.gain;
    if(gain.cancelAndHoldAtTime)gain.cancelAndHoldAtTime(time);
    else{gain.cancelScheduledValues(time);gain.setValueAtTime(Math.min(1,(time-voice.started)/2),time);}
    gain.linearRampToValueAtTime(0,time+2);voice.source.stop(time+2.05);
  }
  async function play(){
    const token=++version,current=phase;
    if(!enabled||blocked||active?.phase===current)return;
    try{
      await context.resume();const buffer=await bufferFor(current);
      if(token!==version||!enabled||blocked||phase!==current)return;
      const source=context.createBufferSource(),gain=context.createGain(),time=context.currentTime;
      source.buffer=buffer;source.loop=true;source.connect(gain);gain.connect(master);volume();
      // Keep the previous phase audible until its replacement is decoded and ready.
      if(active)retire(active,time);
      const voice={source,gain,phase:current,started:time};active=voice;voices.add(voice);
      gain.gain.setValueAtTime(0,time);gain.gain.linearRampToValueAtTime(1,time+2);
      source.onended=()=>{voices.delete(voice);source.disconnect();gain.disconnect();};
      source.start(time);body.dataset.ambientSound=current==='day'?'field-birds':'field-crickets';
    }catch{
      if(token!==version||!enabled||blocked)return;
      stop();enabled=false;ui();notice('Tiếng vườn chưa tải được. Bạn có thể thử bật lại.');
    }
  }
  on(button,'click',()=>{
    if(enabled){enabled=false;stop();ui();return;}
    const Ctx=window.AudioContext||window.webkitAudioContext;
    if(!Ctx){notice('Trình duyệt chưa hỗ trợ tiếng vườn. Bạn vẫn nghe nhạc được nhé.');return;}
    if(!context){context=new Ctx();master=context.createGain();master.gain.value=.65;master.connect(context.destination);on(context,'statechange',()=>body.dataset.ambientContext=context.state);}
    enabled=true;ui();play();
  });
  for(const event of ['playing','pause'])on(audio,event,volume);
  on(document,'visibilitychange',()=>setBlocked(document.hidden));
  on(window,'pagehide',()=>setBlocked(true));on(window,'pageshow',()=>setBlocked(document.hidden));
  // A video owns the foreground sound while its iframe is mounted.
  const videoObserver=new MutationObserver(volume);videoObserver.observe(document.querySelector('#room-content'),{childList:true,subtree:true});
  function setBlocked(next){if(next===blocked)return;blocked=next;if(blocked)stop();else play();}
  ui();body.dataset.ambientSound='quiet';
  return {setPhase(next){if(next!==phase){phase=next;play();}},destroy(){enabled=false;stop();videoObserver.disconnect();listeners.forEach(remove=>remove());context?.close();}};
}
