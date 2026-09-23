import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
const require=createRequire('/Users/alihuynh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const sharp=require('sharp');
const input=fileURLToPath(new URL('../source-art/host-sprites.png',import.meta.url));
const {data,info}=await sharp(input).ensureAlpha().raw().toBuffer({resolveWithObject:true});
const cw=info.width/4;let l=cw,t=info.height,r=0,b=0;
for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++){if(data[(y*info.width+x)*4+3]>20){const u=x%cw;l=Math.min(l,u);r=Math.max(r,u);t=Math.min(t,y);b=Math.max(b,y);}}
l=Math.max(0,l-3);t=Math.max(0,t-3);r=Math.min(cw-1,r+3);b=Math.min(info.height-1,b+3);
const w=r-l+1,h=b-t+1;const frames=[];
for(let i=0;i<4;i++)frames.push({input:await sharp(input).extract({left:i*cw+l,top:t,width:w,height:h}).png().toBuffer(),left:i*w,top:0});
const atlas=await sharp({create:{width:w*4,height:h,channels:4,background:'#00000000'}}).composite(frames).png().toBuffer();
await sharp(atlas).resize({height:360}).webp({quality:90}).toFile(fileURLToPath(new URL('../dist/assets/host-idle-v2.webp',import.meta.url)));
console.log({frameWidth:w,frameHeight:h});
