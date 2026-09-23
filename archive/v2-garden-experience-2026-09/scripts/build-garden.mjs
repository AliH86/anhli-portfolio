// Build the isolated optional scene only; no framework or catalog migration.
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const {build}=await import(process.env.GARDEN_ESBUILD_MODULE||'esbuild');
const result=await build({entryPoints:[path.join(root,'js/garden/scene.js')],outfile:path.join(root,'js/garden/scene.runtime.js'),bundle:true,minify:true,format:'esm',target:'es2022',legalComments:'eof',metafile:true});
await fs.writeFile(path.join(root,'source/garden/v1/bundle-build.json'),JSON.stringify({bundler:'esbuild',...result.metafile},null,2));
console.log('Built optional Garden scene:',result.metafile.outputs);
