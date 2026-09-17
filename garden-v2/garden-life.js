import {initWildlife} from './garden-wildlife.js?v=4';
import {albumIntroduction,chooseDifferent,gardenTips} from './garden-dialogue.js?v=2';
import {createDailyReader,localDay} from './garden-daily.js?v=1';
// Native music stays independent from the optional garden AudioContext.
export function phaseForHour(hour,minute=0){const m=hour*60+minute;return m>=330&&m<1050?'day':'night';}
export const ambienceDelay=(random=Math.random)=>90000+Math.floor(random()*100000);
export function initGardenLife({audio,notice}){
  const $=s=>document.querySelector(s),body=document.body,world=$('.scene-world');
  const talk=$('#host-talk'),words=$('#host-words'),tarot=$('#tarot-draw'),ambientButton=$('#ambience-toggle');
  let mode='auto',phase='',enabled=false,context,master,noiseBuffer,activation=0;
  let soundTimer,quietTimer,talkTimer,lastSound=-Infinity,lastSoundKind='',lastLine='',album=null,pendingAlbum=false,albumUntil=0,invited=false,speechVersion=0,dailyMessage=null;
  const readDaily=createDailyReader(),dailyDialog=$('#daily-dialog');
  const activeNodes=new Set(),listeners=[];
  const on=(target,event,fn)=>{target.addEventListener(event,fn);listeners.push(()=>target.removeEventListener(event,fn));};
  function say(text,kind='quote',invite=false){
    speechVersion++;
    words.textContent=text;talk.dataset.kind=kind;talk.setAttribute('aria-label',`Li nói: ${text}`);
    $('#talk-kicker').textContent=kind==='album'?'Li kể về album':kind==='tarot'?'Thông điệp ngẫu nhiên hôm nay cho bạn':kind==='tip'?'Li chỉ bạn nè':'Li nói nhỏ';
    tarot.hidden=!invite;lastLine=text;
  }
  function introduceAlbum(next){
    album=next;pendingAlbum=true;albumUntil=Date.now()+45000;
    say(albumIntroduction(album),'album');
    document.querySelectorAll('.album-li-words').forEach(e=>e.textContent=albumIntroduction(album));
  }
  async function showDaily(open=false){
    const version=speechVersion;
    try{
      const message=await readDaily();if(open&&(version!==speechVersion||body.dataset.room))return;dailyMessage=message;
      if(open){
        $('#daily-name').textContent=message.name;$('#daily-title').textContent=message.title;
        $('#daily-text').textContent=message.message;$('#daily-date').textContent=`${message.dateKey.split('-').reverse().join('/')} · ${message.closed?'Khép':'Nở'}`;
        const art=$('#daily-image');art.src=message.image;art.alt=message.name;art.classList.toggle('is-closed',message.closed);
        dailyDialog.dataset.day=message.dateKey;if(!dailyDialog.open)dailyDialog.showModal();syncScene();
      }
      if(version===speechVersion&&!body.dataset.room){say(message.title,'tarot',true);tarot.textContent='Đọc thông điệp hôm nay';albumUntil=Date.now()+28000;scheduleTalk(45000);}
    }catch{if(open)notice('Thông điệp chưa tải được. Bạn thử lại chút nhé.');}
  }
  on(tarot,'click',()=>showDaily(true));
  on($('#daily-close'),'click',()=>dailyDialog.close());
  on(dailyDialog,'close',()=>{syncScene();tarot.focus();});
  const softLines=['Ghé vườn nhà Li chơi chút nha. Nghe vài bài hát Li sáng tác.','Không cần vội đâu. Mình ngồi đây một chút nha.','Vườn nhỏ thôi, nhưng luôn có chỗ cho bạn.','Một chút nhạc, một chút bình yên. Vậy là đủ ha.'];
  function randomTalk(){
    if(document.hidden||body.dataset.room||dailyDialog.open){scheduleTalk(20000);return;}
    if(pendingAlbum&&album){pendingAlbum=false;albumUntil=Date.now()+35000;say(albumIntroduction(album),'album');scheduleTalk(40000);return;}
    if(Date.now()<albumUntil){scheduleTalk(30000);return;}
    const roll=Math.random();
    if(!invited||roll<.4){invited=true;say('Li gửi bạn một thông điệp để mang theo trong hôm nay nha.','tarot',true);tarot.textContent='Đọc thông điệp hôm nay';showDaily();}
    else if(roll<.67)say(chooseDifferent(gardenTips,lastLine),'tip');
    else if(album&&roll<.83)say(albumIntroduction(album),'album');
    else say(chooseDifferent(phase==='night'?[...softLines,'Tối rồi, để những điều vội vã ngủ ngoài cổng nhé.']:softLines,lastLine));
    scheduleTalk(38000+Math.random()*27000);
  }
  function scheduleTalk(delay=35000){clearTimeout(talkTimer);talkTimer=setTimeout(randomTalk,delay);}
  const wildlife=initWildlife({world,body,onEncounter:kind=>{if(enabled)playEpisode(kind);}});
  function updateClock(){
    const now=new Date(),next=mode==='auto'?phaseForHour(now.getHours(),now.getMinutes()):mode;
    if(dailyMessage&&dailyMessage.dateKey!==localDay(now)){dailyMessage=null;if(dailyDialog.open)showDaily(true);else if(talk.dataset.kind==='tarot')showDaily();}
    const changed=next!==phase;phase=next;body.dataset.dayPhase=phase;body.dataset.dayMode=mode;
    for(const m of ['day','night','auto'])$(`#daylight-${m}`).setAttribute('aria-pressed',String(m===mode));
    $('#daylight-auto').title=`Tự động · 05:30–17:30 ban ngày · Giờ thiết bị ${now.toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'})}`;
    if(changed){activation++;silence();wildlife.setPhase(phase);if(enabled)scheduleSound();}
  }
  for(const m of ['day','night','auto'])on($(`#daylight-${m}`),'click',()=>{mode=m;updateClock();});
  function syncScene(){
    wildlife.setBlocked(document.hidden||!!body.dataset.room||dailyDialog.open||body.dataset.still==='true');
    if(!body.dataset.room&&pendingAlbum&&album){pendingAlbum=false;albumUntil=Date.now()+35000;say(albumIntroduction(album),'album');}
  }
  const observer=new MutationObserver(syncScene);observer.observe(body,{attributes:true,attributeFilter:['data-room','data-still']});
  function markSound(kind){body.dataset.ambientSound=kind;}
  function setAmbientUI(){body.dataset.ambientEnabled=String(enabled);ambientButton.setAttribute('aria-pressed',String(enabled));ambientButton.setAttribute('aria-label',enabled?'Tắt tiếng vườn':'Bật tiếng vườn');ambientButton.title=enabled?'Tắt tiếng vườn':'Bật tiếng gió và những vị khách trong vườn';}
  function trackNode(node){activeNodes.add(node);node.onended=()=>{activeNodes.delete(node);node.disconnect();};return node;}
  function tone({at=0,hz=1000,endHz=hz,duration=.2,gain=.08,type='sine'}){
    const t=context.currentTime+at,osc=trackNode(context.createOscillator()),amp=context.createGain();
    osc.type=type;osc.frequency.setValueAtTime(hz,t);osc.frequency.exponentialRampToValueAtTime(endHz,t+duration);
    amp.gain.setValueAtTime(0,t);amp.gain.linearRampToValueAtTime(gain,t+Math.min(.035,duration/4));amp.gain.exponentialRampToValueAtTime(.0001,t+duration);
    osc.connect(amp);amp.connect(master);osc.onended=()=>{activeNodes.delete(osc);osc.disconnect();amp.disconnect();};osc.start(t);osc.stop(t+duration+.03);
  }
  function wind(){
    if(!noiseBuffer){noiseBuffer=context.createBuffer(1,context.sampleRate*6,context.sampleRate);const a=noiseBuffer.getChannelData(0);let last=0;for(let i=0;i<a.length;i++){last=(last+.018*(Math.random()*2-1))/1.018;a[i]=last*3.2;}}
    const source=trackNode(context.createBufferSource()),filter=context.createBiquadFilter(),gain=context.createGain(),t=context.currentTime;
    source.buffer=noiseBuffer;filter.type='lowpass';filter.frequency.value=900;gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(.23,t+2.3);gain.gain.linearRampToValueAtTime(0,t+6);
    source.connect(filter);filter.connect(gain);gain.connect(master);source.onended=()=>{activeNodes.delete(source);source.disconnect();filter.disconnect();gain.disconnect();};source.start();source.stop(t+6);
  }
  function chirps(){
    // Two nearby sparrows: quick syllables, little trills, and uneven call/response gaps.
    const phrases=[0,.53,1.12,1.58,2.37,3.05,3.51,4.34];
    phrases.forEach((start,voice)=>{
      const base=(voice%2?3100:2450)+Math.random()*450,count=3+Math.floor(Math.random()*3);
      let at=start+Math.random()*.1;
      for(let i=0;i<count;i++){
        const hz=base+Math.sin(i*1.9)*420,duration=.055+Math.random()*.07;
        tone({at,hz,endHz:hz*(i%2?.77:1.24),duration,gain:.11+Math.random()*.045});
        tone({at,hz:hz*1.7,endHz:hz*1.5,duration:duration*.8,gain:.007});
        at+=duration*.75+.025+Math.random()*.04;
      }
    });
  }
  function crickets(){for(let group=0;group<5;group++)for(let i=0;i<3;i++)tone({at:group*.8+i*.13,hz:5100,endHz:5300,duration:.08,gain:.018});}
  function owl(){for(const [at,duration] of [[0,.30],[.5,.75],[2.1,.30],[2.6,.70]]){tone({at,hz:420,endHz:330,duration,gain:.10});tone({at,hz:840,endHz:660,duration,gain:.012});}}
  function silence(){
    clearTimeout(soundTimer);clearTimeout(quietTimer);markSound('quiet');
    for(const node of activeNodes){try{node.stop();}catch{}}activeNodes.clear();
    if(context?.state==='running')context.suspend().catch(()=>{});
  }
  function scheduleSound(delay=ambienceDelay()){
    clearTimeout(soundTimer);if(enabled&&!document.hidden)soundTimer=setTimeout(()=>{playEpisode(phase==='night'?'crickets':'wind');scheduleSound();},delay);
  }
  async function playEpisode(kind='wind',force=false){
    if(!enabled||document.hidden||(!force&&Date.now()-lastSound<(lastSoundKind===kind?22000:4000))||document.querySelector('#video-stage iframe'))return;
    // Ignore late encounters after a day/night change.
    if(phase==='day'&&['owl','crickets'].includes(kind)||phase==='night'&&kind==='birds')return;
    const token=activation;
    try{await context.resume();}catch{return;}
    if(!enabled||document.hidden){context.suspend().catch(()=>{});return;}if(token!==activation)return;
    if(context.state!=='running')return;
    body.dataset.ambientContext=context.state;lastSound=Date.now();lastSoundKind=kind;
    master.gain.setValueAtTime(audio.paused?.24:.13,context.currentTime);
    markSound(kind);({birds:chirps,wind,crickets,owl})[kind]();
    clearTimeout(quietTimer);quietTimer=setTimeout(()=>{markSound('quiet');context.suspend().catch(()=>{});},6500);
  }
  on(ambientButton,'click',async()=>{
    if(enabled){enabled=false;activation++;silence();setAmbientUI();return;}
    const Ctx=window.AudioContext||window.webkitAudioContext;
    if(!Ctx){notice('Trình duyệt này chưa hỗ trợ tiếng vườn. Nhạc vẫn nghe bình thường nhé.');return;}
    const token=++activation;enabled=true;setAmbientUI();
    try{
      if(!context){context=new Ctx();master=context.createGain();master.gain.value=.2;master.connect(context.destination);on(context,'statechange',()=>{body.dataset.ambientContext=context.state;});}
      await context.resume();if(!enabled||document.hidden){context.suspend().catch(()=>{});return;}if(token!==activation)return;
      await playEpisode(phase==='night'?'crickets':'wind',true);scheduleSound();
    }catch{if(token===activation){enabled=false;silence();setAmbientUI();notice('Tiếng vườn chưa bật được. Bạn thử lại nhé.');}}
  });
  on(document,'visibilitychange',()=>{
    if(document.hidden){activation++;silence();clearTimeout(talkTimer);}else{updateClock();scheduleSound();scheduleTalk();}syncScene();
  });
  on(window,'pagehide',()=>{activation++;silence();clearTimeout(talkTimer);wildlife.setBlocked(true);});
  on(window,'pageshow',()=>{updateClock();syncScene();if(enabled)scheduleSound();scheduleTalk();});
  updateClock();syncScene();setAmbientUI();markSound('quiet');say(softLines[0]);scheduleTalk();
  const clockTimer=setInterval(()=>{if(!document.hidden)updateClock();},15000);
  return {introduceAlbum,destroy(){observer.disconnect();listeners.forEach(remove=>remove());clearInterval(clockTimer);clearTimeout(talkTimer);wildlife.destroy();enabled=false;activation++;silence();context?.close();}};
}
