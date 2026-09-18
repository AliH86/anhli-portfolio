import {initGardenAmbience} from './garden-ambient.js?v=22';
import {initWildlife} from './garden-wildlife.js?v=21';
import {albumIntroduction,chooseDifferent,gardenTips} from './garden-dialogue.js?v=3';
import {createDailyReader,localDay} from './garden-daily.js?v=1';
// Native music stays independent from the optional garden AudioContext.
export function phaseForHour(hour,minute=0){const m=hour*60+minute;return m>=330&&m<1050?'day':'night';}
export function initGardenLife({audio,notice}){
  const $=s=>document.querySelector(s),body=document.body,world=$('.scene-world');
  const talk=$('#host-talk'),words=$('#host-words'),tarot=$('#tarot-draw');
  let mode='auto',phase='',offscreen=false;
  let talkTimer,lastLine='',album=null,pendingAlbum=false,albumUntil=0,hostMoment=null,momentBackup=null,invited=false,speechVersion=0,dailyMessage=null;
  const readDaily=createDailyReader(),dailyDialog=$('#daily-dialog');
  const listeners=[];
  const on=(target,event,fn)=>{target.addEventListener(event,fn);listeners.push(()=>target.removeEventListener(event,fn));};
  function say(text,kind='quote',invite=false){
    speechVersion++;
    words.textContent=text;talk.dataset.kind=kind;talk.setAttribute('aria-label',`Li nói: ${text}`);
    $('#talk-kicker').textContent=kind==='album'?'Li kể về album':kind==='tarot'?'Li gửi bạn một lời':kind==='tip'?'Li chỉ bạn nè':'Li nói nhỏ';
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
    if(document.hidden||body.dataset.entered!=='true'||body.dataset.room||dailyDialog.open||hostMoment){scheduleTalk(10000);return;}
    if(pendingAlbum&&album){pendingAlbum=false;albumUntil=Date.now()+35000;say(albumIntroduction(album),'album');scheduleTalk(40000);return;}
    if(Date.now()<albumUntil){scheduleTalk(30000);return;}
    const roll=Math.random();
    if(!invited||roll<.4){invited=true;say('Li gửi bạn một thông điệp để mang theo trong hôm nay nha.','tarot',true);tarot.textContent='Đọc thông điệp hôm nay';showDaily();}
    else if(roll<.67)say(chooseDifferent(gardenTips,lastLine),'tip');
    else if(album&&roll<.83)say(albumIntroduction(album),'album');
    else say(chooseDifferent(phase==='night'?[...softLines,'Tối rồi, để những điều vội vã ngủ ngoài cổng nhé.']:softLines,lastLine));
    scheduleTalk(22000+Math.random()*16000);
  }
  function scheduleTalk(delay=15000){clearTimeout(talkTimer);talkTimer=setTimeout(randomTalk,delay);}
  const wildlife=initWildlife({world});
  const ambience=initGardenAmbience({audio,notice});
  function updateClock(){
    const now=new Date(),next=mode==='auto'?phaseForHour(now.getHours(),now.getMinutes()):mode;
    if(dailyMessage&&dailyMessage.dateKey!==localDay(now)){dailyMessage=null;if(dailyDialog.open)showDaily(true);else if(talk.dataset.kind==='tarot')showDaily();}
    const changed=next!==phase;phase=next;body.dataset.dayPhase=phase;body.dataset.dayMode=mode;
    for(const m of ['day','night','auto'])$(`#daylight-${m}`).setAttribute('aria-pressed',String(m===mode));
    $('#daylight-auto').title=`Tự động · 05:30–17:30 ban ngày · Giờ thiết bị ${now.toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'})}`;
    if(changed){wildlife.setPhase(phase);ambience.setPhase(phase);}
  }
  for(const m of ['day','night','auto'])on($(`#daylight-${m}`),'click',()=>{mode=m;updateClock();});
  function syncScene(){
    wildlife.setBlocked(offscreen||document.hidden||body.dataset.entered!=='true'||(!!body.dataset.room&&(body.dataset.room!=='music'||body.dataset.touch==='true'))||dailyDialog.open||body.dataset.still==='true');
    if(!body.dataset.room&&pendingAlbum&&album){pendingAlbum=false;albumUntil=Date.now()+35000;say(albumIntroduction(album),'album');}
  }
  const visibility=new IntersectionObserver(([entry])=>{offscreen=!entry.isIntersecting;body.dataset.worldOffscreen=String(offscreen);syncScene();});visibility.observe(world);
  const observer=new MutationObserver(syncScene);observer.observe(body,{attributes:true,attributeFilter:['data-room','data-still','data-entered','data-touch']});
  on(document,'visibilitychange',()=>{
    if(document.hidden){clearTimeout(talkTimer);}else{updateClock();scheduleTalk();}syncScene();
  });
  on(window,'pagehide',()=>{clearTimeout(talkTimer);wildlife.setBlocked(true);});
  on(window,'pageshow',()=>{updateClock();syncScene();scheduleTalk();});
  function setHostMoment(moment){
    const key=moment?`${moment.time}:${moment.text}`:'';
    if(key===(hostMoment?.key||''))return;
    if(moment){
      if(!hostMoment)momentBackup={text:words.textContent,kind:talk.dataset.kind,invite:!tarot.hidden};
      hostMoment={...moment,key};body.dataset.hostMoment=moment.pose;say(moment.text,'song');$('#talk-kicker').textContent='Li hát khe khẽ';
    }else{
      hostMoment=null;delete body.dataset.hostMoment;
      if(momentBackup){say(momentBackup.text,momentBackup.kind,momentBackup.invite);momentBackup=null;}
    }
  }
  on(document,'garden-entered',()=>{
    if(body.dataset.touch==='true')say('Muốn điện thoại nhẹ hơn, chạm ngôi sao ✦ để nghỉ chuyển động nha. Nhạc vẫn nghe bình thường.','tip');
    scheduleTalk(body.dataset.touch==='true'?16000:9000);syncScene();
  });

  updateClock();syncScene();say(softLines[0]);scheduleTalk();
  const clockTimer=setInterval(()=>{if(!document.hidden)updateClock();},15000);
  return {introduceAlbum,setHostMoment,destroy(){observer.disconnect();visibility.disconnect();listeners.forEach(remove=>remove());clearInterval(clockTimer);clearTimeout(talkTimer);wildlife.destroy();ambience.destroy();}};
}
