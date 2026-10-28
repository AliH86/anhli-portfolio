// Same date/device seed and draw order as the original three-seed Oracle.
export function localDay(date=new Date()){
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}
export function dailySelection(dateKey,device,deck){
  if(deck.length!==78)throw Error('Cần đủ 78 lá gốc.');
  const key=`anhli-garden-${dateKey}-${device}`;let seed=2166136261;
  for(let i=0;i<key.length;i++){seed^=key.charCodeAt(i);seed=Math.imul(seed,16777619);}seed>>>=0;
  const random=()=>{seed+=0x6D2B79F5;let t=seed;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};
  const nums=[];while(nums.length<3){const n=Math.floor(random()*78);if(!nums.includes(n))nums.push(n);}
  const card=deck[nums[0]],closed=random()<.32;
  return {dateKey,id:card.id,name:card.name,image:card.image,closed,...(closed?card.closed:card.open)};
}
export function createDailyReader({storage,fetcher=fetch,now=()=>new Date(),makeId=()=>crypto.getRandomValues(new Uint32Array(3)).join('-')}={}){
  let device='',loading;
  try{storage??=localStorage;device=storage.getItem('anhli_garden_device')||'';}catch{}
  if(!device){device=makeId();try{storage?.setItem('anhli_garden_device',device);}catch{}}
  return async()=>{
    if(!loading)loading=fetcher('./data/daily-messages.json').then(r=>{if(!r.ok)throw Error('Chưa tải được thông điệp.');return r.json();}).then(x=>x.cards).catch(e=>{loading=null;throw e;});
    const cards=await loading;
    return dailySelection(localDay(now()),device,cards);
  };
}
