// Encoding-only conversion of approved RGB + grayscale matte to a native alpha channel.
// This avoids runtime CSS luminance masks on older iOS Safari; no artwork is generated.
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const require=createRequire('/Users/alihuynh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const sharp=require('sharp'),root=new URL('../dist/assets/layers/',import.meta.url);
const color=await sharp(fileURLToPath(new URL('canopy-color.webp',root))).removeAlpha().raw().toBuffer({resolveWithObject:true});
const matte=await sharp(fileURLToPath(new URL('canopy-matte.webp',root))).greyscale().raw().toBuffer({resolveWithObject:true});
if(color.info.width!==matte.info.width||color.info.height!==matte.info.height)throw Error('Matte size mismatch');
await sharp(color.data,{raw:color.info}).joinChannel(matte.data,{raw:matte.info}).webp({lossless:true}).toFile(fileURLToPath(new URL('canopy-alpha.webp',root)));
console.log('Baked native alpha',color.info.width,color.info.height);
