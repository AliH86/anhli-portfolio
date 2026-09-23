// Build comparison sheets and verify baseline preservation for the local review.
import fs from 'node:fs/promises';import path from 'node:path';import crypto from 'node:crypto';import sharp from 'sharp';
const fresh=path.resolve(import.meta.dirname,'..'),qa=path.join(fresh,'qa/v2.2'),dist=path.join(fresh,'dist');
const ref='/Users/alihuynh/Downloads/ChatGPT Image Sep 18, 2026, 07_57_20 AM (1).png';
const kit='/Users/alihuynh/Downloads/ChatGPT Image Sep 18, 2026, 07_57_21 AM (2).png';
const impl=path.join(qa,'desktop-music-final.png');
await sharp({create:{width:3344,height:941,channels:3,background:'#eee8d9'}}).composite([{input:await sharp(ref).resize(1672,941).toBuffer(),left:0,top:0},{input:await sharp(impl).resize(1672,941).toBuffer(),left:1672,top:0}]).png().toFile(path.join(qa,'comparison-full.png'));
const pairs=[['nav',{left:938,top:17,width:719,height:96},{left:1000,top:10,width:665,height:110}],['console',{left:349,top:702,width:916,height:151},{left:360,top:696,width:1073,height:170}],['ledger',{left:1295,top:490,width:353,height:327},{left:1320,top:337,width:334,height:386}]];
for(const [name,a,b]of pairs){const h=420,w=1000;const left=await sharp(ref).extract(a).resize(w,h,{fit:'contain',background:'#eee8d9'}).toBuffer(),right=await sharp(impl).extract(b).resize(w,h,{fit:'contain',background:'#eee8d9'}).toBuffer();await sharp({create:{width:w*2,height:h,channels:3,background:'#eee8d9'}}).composite([{input:left,left:0,top:0},{input:right,left:w,top:0}]).png().toFile(path.join(qa,`comparison-${name}.png`));}
const baseline=JSON.parse(await fs.readFile(path.join(fresh,'checkpoints/2026-09-18-v2.2-before/hashes.json'),'utf8'));
const hash=buffer=>crypto.createHash('sha256').update(buffer).digest('hex');const changed=[],missing=[],unchanged=[];
for(const [p,old]of Object.entries(baseline)){try{const now=hash(await fs.readFile(path.join(dist,p)));(now===old?unchanged:changed).push(p);}catch{missing.push(p);}}
const preservation={at:new Date().toISOString(),baselineFiles:Object.keys(baseline).length,unchanged:unchanged.length,changed,removedFromRuntime:missing,preservedData:['data/gallery.json','data/profile.json','data/videos.json'].map(p=>({path:p,identical:unchanged.includes(p)})),sceneArtwork:unchanged.filter(p=>/scene|scenery|host-|garden-/i.test(p)&&/\.(webp|png|avif)$/.test(p))};
await fs.writeFile(path.join(qa,'baseline-preservation.json'),JSON.stringify(preservation,null,2)+'\n');
console.log(JSON.stringify({unchanged:unchanged.length,changed,removed:missing,preservedData:preservation.preservedData},null,2));
