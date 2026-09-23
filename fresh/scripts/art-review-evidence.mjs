import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const qa=path.resolve(import.meta.dirname,'../qa/v2.2-art');
const ref='/Users/alihuynh/Downloads/ChatGPT Image Sep 18, 2026, 07_57_20 AM (1).png';
const kit='/Users/alihuynh/Downloads/ChatGPT Image Sep 18, 2026, 07_57_21 AM (2).png';
const impl=path.join(qa,'desktop-music.png');
async function pair(name,a,b,w,h){
 const inputs=await Promise.all([a,b].map(async([file,rect])=>{let p=sharp(file);if(rect)p=p.extract(rect);return p.resize(w,h,{fit:'contain',background:'#eee8d9'}).toBuffer();}));
 await sharp({create:{width:w*2,height:h,channels:3,background:'#eee8d9'}}).composite(inputs.map((input,i)=>({input,left:i*w,top:0}))).png().toFile(path.join(qa,name+'.png'));
}
await pair('comparison-reference',[ref],[impl],1672,941);
await pair('comparison-before-after',[path.join(qa,'before-desktop.png')],[impl],1672,941);
await pair('comparison-player',[ref,{left:349,top:702,width:916,height:151}],[impl,{left:328,top:719,width:950,height:150}],1000,200);
await pair('comparison-sign',[ref,{left:681,top:110,width:350,height:135}],[impl,{left:782,top:112,width:357,height:179}],500,255);
await pair('comparison-navigation',[ref,{left:938,top:17,width:719,height:96}],[impl,{left:890,top:18,width:766,height:103}],1000,180);
await pair('comparison-ledger',[ref,{left:1295,top:490,width:353,height:327}],[impl,{left:1305,top:430,width:345,height:410}],430,510);
await pair('comparison-story',[kit,{left:276,top:214,width:411,height:271}],[path.join(qa,'desktop-story.png'),{left:50,top:181,width:853,height:715}],850,720);
await pair('comparison-gallery',[kit,{left:700,top:213,width:394,height:277}],[path.join(qa,'desktop-gallery.png'),{left:540,top:142,width:1080,height:774}],950,690);
await fs.writeFile(path.join(qa,'comparison-notes.json'),JSON.stringify({sourceSide:'left',implementationSide:'right',fullPixels:[1672,941],state:'music, Untamed, first track, playlist open; reference is playing, implementation paused to preserve explicit playback',intentionalDifferences:['Original garden and host preserved','Actual album covers and catalog preserved','User requested brighter translucent paper','Responsive sheets authored; no mobile source mock']},null,2));
console.log('Saved full, before/after, and five focused comparisons.');
