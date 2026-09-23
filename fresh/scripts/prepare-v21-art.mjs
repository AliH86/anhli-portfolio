import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
const require=createRequire('/Users/alihuynh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const sharp=require('sharp');
import {copyFile,mkdir,writeFile,stat} from 'node:fs/promises';
const root=new URL('../',import.meta.url),src=new URL('source-art/v2.1/',root),out=new URL('dist/assets/v2.1/',root);
const generated='/Users/alihuynh/.codex/generated_images/01a0af1a-75e1-79f0-8321-51673590c977/';
const files={owl:['exec-a8000c1b-46d8-4a6d-b48b-4da6503126a2.png','exec-5cc44e58-adb3-4d31-b5f7-3da35b577ba8.png'],foliage:['exec-760e1ea5-38ff-4dc3-a677-fff54a6ae172.png','exec-56b828b9-e130-4032-af1e-234c04795908.png']};
await mkdir(out,{recursive:true});const receipt=[];
for(const [name,paths] of Object.entries(files)){
 for(let i=0;i<2;i++)await copyFile(generated+paths[i],new URL(`${name}-${i?'matte':'color'}.png`,src));
 const color=await sharp(generated+paths[0]).removeAlpha().raw().toBuffer();
 const mask=await sharp(generated+paths[1]).resize(1536,1024).greyscale().raw().toBuffer();
 const composites=[];
 for(let cell=0;cell<6;cell++){
  const rgba=Buffer.alloc(512*512*4),ox=(cell%3)*512,oy=Math.floor(cell/3)*512;
  let xmin=512,ymin=512,xmax=0,ymax=0;
  for(let y=0;y<512;y++)for(let x=0;x<512;x++){
   const source=(oy+y)*1536+ox+x,target=(y*512+x)*4;
   let a=Math.max(0,Math.min(255,(mask[source]-100)*255/120));
   // Generated reference has a painted blue-grey checker, not a real alpha channel.
   // Remove its low-chroma bright pixels where the generated matte overran the contour.
   const r=color[source*3],g=color[source*3+1],b=color[source*3+2];
   if(name==='owl'&&Math.min(r,g,b)>75&&b>=r-5&&Math.max(r,g,b)-Math.min(r,g,b)<38)a=0;
   rgba[target]=color[source*3];rgba[target+1]=color[source*3+1];rgba[target+2]=color[source*3+2];rgba[target+3]=a;
   if(a>128){xmin=Math.min(xmin,x);xmax=Math.max(xmax,x);ymin=Math.min(ymin,y);ymax=Math.max(ymax,y);}
  }
  const width=xmax-xmin+1,height=ymax-ymin+1;
  let sprite=sharp(rgba,{raw:{width:512,height:512,channels:4}}).extract({left:xmin,top:ymin,width,height});
  if(name==='owl'){
   const w=Math.round(width*.27),h=Math.round(height*.27),data=await sprite.resize(w,h).png().toBuffer();
   composites.push({input:data,left:(cell%3)*192+Math.round((192-w)/2),top:Math.floor(cell/3)*192+161-h});
   receipt.push({name:`owl-${cell}`,sourceBounds:[xmin,ymin,xmax,ymax],runtimeCell:192,feetAnchor:161,bodyScale:.27});
  }else{
   const scale=Math.min(218/width,204/height),w=Math.round(width*scale),h=Math.round(height*scale),data=await sprite.resize(w,h).png().toBuffer();
   const target=new URL(`foliage-${cell}.webp`,out);
   await sharp({create:{width:256,height:256,channels:4,background:'#00000000'}}).composite([{input:data,left:Math.round((256-w)/2),top:218-h}]).webp({quality:85,alphaQuality:100}).toFile(fileURLToPath(target));
   receipt.push({name:`foliage-${cell}`,sourceBounds:[xmin,ymin,xmax,ymax],file:fileURLToPath(target),bytes:(await stat(target)).size});
  }
 }
 if(name==='owl'){const target=new URL('owl-states.webp',out);await sharp({create:{width:576,height:384,channels:4,background:'#00000000'}}).composite(composites).webp({quality:86,alphaQuality:100}).toFile(fileURLToPath(target));receipt.push({name:'owl-atlas',bytes:(await stat(target)).size});}
}
await writeFile(new URL('qa/v2.1/art-receipt.json',root),JSON.stringify(receipt,null,2));console.log(JSON.stringify(receipt));
