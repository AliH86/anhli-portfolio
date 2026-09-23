import fs from 'node:fs';
import vm from 'node:vm';
function literal(s, marker, open, close) {
  const m=s.indexOf(marker); if(m<0)throw Error(`Missing ${marker}`);
  const start=s.indexOf(open,m); let depth=0, quote='',escape=false;
  for(let i=start;i<s.length;i++) { const c=s[i];
    if(quote){if(escape)escape=false;else if(c==='\\')escape=true;else if(c===quote)quote='';continue;}
    if(c==='"'||c==="'"||c==='`'){quote=c;continue;}
    if(c===open)depth++; if(c===close&&--depth===0)return s.slice(start,i+1);
  } throw Error('Unclosed literal');
}
const object = (s,m,o='{',c='}') => vm.runInNewContext(`(${literal(s,m,o,c)})`,{}, {timeout:1000});
const rows=object(fs.readFileSync(new URL('../../index.html',import.meta.url),'utf8'),'const VIDEOS =','[',']');
const videos=rows.map((v,i)=>({id:String(i+1),title:v.title,meta:v.meta||'',credits:v.credits||'',provider:v.vimeo?'Vimeo':v.drive?'Google Drive':v.fb?'Facebook':'YouTube',url:v.fb||(v.vimeo?`https://vimeo.com/${v.vimeo.replace('?h=','/')}`:v.drive?`https://drive.google.com/file/d/${v.drive}/view`:`https://www.youtube.com/watch?v=${v.id}`),embed:v.fb?null:v.vimeo?`https://player.vimeo.com/video/${v.vimeo}`:v.drive?`https://drive.google.com/file/d/${v.drive}/preview`:`https://www.youtube-nocookie.com/embed/${v.id}`,thumb:v.id?`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`:null}));
fs.writeFileSync(new URL('../dist/data/videos.json',import.meta.url),JSON.stringify(videos,null,2)+'\n');
console.log(`${videos.length} real source video links extracted; no legacy runtime.`);
