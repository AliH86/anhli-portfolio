import {createRequire} from 'node:module';
const sharp=createRequire(import.meta.url)(process.env.GARDEN_SHARP_MODULE||'sharp');
import fs from 'node:fs/promises';
const src='source/garden/v1/anhli-eyes-closed-generated-v1.png';
// Only crop/normalize the two accepted inner-eye regions, never substitute the generated face/body.
const aligned=await sharp(src).resize(853,1024).png().toBuffer();
for(const [name,r] of [['near',{left:480,top:156,width:39,height:24}],['far',{left:536,top:168,width:12,height:17}]])await sharp(aligned).extract(r).png().toFile(`assets/garden/v1/eye-${name}-closed-v1.png`);
const rig={canvas:[853,1024],source:src,sourceStatus:'Full generated frame not accepted as a replacement: alignment drift and baked checkerboard. Only inner eye patches are used.',layers:[{name:'eye_near',file:'eye-near-closed-v1.png',sourceRect:[480,156,39,24],targetRect:[480,154,39,24]},{name:'eye_far',file:'eye-far-closed-v1.png',sourceRect:[536,168,12,17],targetRect:[536,164,12,17]}],reaction:'Single 140 ms blink on plant click/focus; disabled with reduced motion.',static:['body','head silhouette','hands','chair'],units:'pixels from top-left'};
await fs.writeFile('source/garden/v1/eye-rig-v1.json',JSON.stringify(rig,null,2));
