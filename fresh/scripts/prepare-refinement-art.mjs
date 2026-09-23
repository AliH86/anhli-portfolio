import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
const require=createRequire('/Users/alihuynh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const sharp=require('sharp');
const root=fileURLToPath(new URL('../',import.meta.url));
const [sheet,foliage]=process.argv.slice(2);
if(!sheet||!foliage)throw Error('Pass sprite sheet and foliage PNG paths.');
const {data,info}=await sharp(sheet).ensureAlpha().raw().toBuffer({resolveWithObject:true});
if(!(await sharp(sheet).metadata()).hasAlpha)throw Error('Sprite requires actual alpha.');
const cw=Math.floor(info.width/3),ch=Math.floor(info.height/2),receipt={original:{width:info.width,height:info.height},poses:{}};
for(const [row,name] of ['seated','gallery'].entries()){
  const rowTop=row===0?0:504,rowHeight=row===0?503:info.height-504;
  let l=cw,t=rowHeight,r=0,b=0;const bounds=[];
  for(let col=0;col<3;col++){
    let fl=cw,ft=rowHeight,fr=0,fb=0;
    for(let y=0;y<rowHeight;y++)for(let x=0;x<cw;x++){if(data[((rowTop+y)*info.width+col*cw+x)*4+3]>24){fl=Math.min(fl,x);ft=Math.min(ft,y);fr=Math.max(fr,x);fb=Math.max(fb,y);}}
    bounds.push({left:fl,top:ft,right:fr,bottom:fb});l=Math.min(l,fl);t=Math.min(t,ft);r=Math.max(r,fr);b=Math.max(b,fb);
  }
  l=Math.max(0,l-4);t=Math.max(0,t-4);r=Math.min(cw-1,r+4);b=Math.min(rowHeight-1,b+4);
  const w=r-l+1,h=b-t+1,oh=440,ow=Math.round(w/h*oh),frames=[];
  for(let col=0;col<3;col++)frames.push({input:await sharp(sheet).extract({left:col*cw+l,top:rowTop+t,width:w,height:h}).resize(ow,oh).png().toBuffer(),left:col*ow,top:0});
  const atlas=await sharp({create:{width:ow*3,height:oh,channels:4,background:'#00000000'}}).composite(frames).png().toBuffer();
  await sharp(atlas).webp({quality:89}).toFile(path.join(root,`dist/assets/host-${name}.webp`));
  receipt.poses[name]={bounds,commonCrop:{l,t,w,h},frame:{width:ow,height:oh},ratio:ow/oh};
}
if(!(await sharp(foliage).metadata()).hasAlpha)throw Error('Foliage requires actual alpha.');
await sharp(foliage).resize({width:700,withoutEnlargement:true}).webp({quality:86}).toFile(path.join(root,'dist/assets/garden-foliage.webp'));
fs.copyFileSync(sheet,path.join(root,'source-art/host-poses-v2.png'));fs.copyFileSync(foliage,path.join(root,'source-art/garden-foliage-v2.png'));
fs.writeFileSync(path.join(root,'qa/refinement-art.json'),JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify(receipt,null,2));
