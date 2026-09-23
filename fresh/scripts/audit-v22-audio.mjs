import fs from 'node:fs/promises';
const c=JSON.parse(await fs.readFile(new URL('../dist/data/catalog.json',import.meta.url),'utf8'));
const tracks=c.flatMap(a=>a.tracks.map(t=>({...t,album:a.name})));let next=0;const results=[];
await Promise.all(Array.from({length:8},async()=>{while(next<tracks.length){const t=tracks[next++];try{
 const r=await fetch(t.url,{headers:{Range:'bytes=0-31'},signal:AbortSignal.timeout(20000)});const data=new Uint8Array(await r.arrayBuffer());
 const row={id:t.id,album:t.album,name:t.name,url:t.url,status:r.status,type:r.headers.get('content-type'),range:r.headers.get('content-range'),bytes:data.length};row.ok=r.status===206&&data.length===32&&/^audio\//.test(row.type||'');results.push(row);
 }catch(e){results.push({id:t.id,name:t.name,ok:false,error:e.message});}}}));
const receipt={at:new Date().toISOString(),checked:results.length,passed:results.filter(t=>t.ok).length,method:'32-byte ranged GET for every canonical published URL; not full auditory review',results};await fs.writeFile(new URL('../qa/v2.2/audio-network.json',import.meta.url),JSON.stringify(receipt,null,2));console.log(JSON.stringify({checked:receipt.checked,passed:receipt.passed,failed:results.filter(t=>!t.ok)},null,2));if(receipt.passed!==tracks.length)process.exitCode=1;
