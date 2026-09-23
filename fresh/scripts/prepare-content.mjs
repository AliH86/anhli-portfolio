// Deterministic Fresh content build. npm ci in fresh/ installs project dependencies.
// No Git/legacy HTML merge: content/ is the explicit, reviewed publishing source.
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import sharp from 'sharp';
const fresh=path.resolve(import.meta.dirname,'..');
const source=path.join(fresh,'content');
const out=process.env.CONTENT_OUT?path.resolve(process.env.CONTENT_OUT):path.join(fresh,'dist');
const read=async name=>JSON.parse(await fs.readFile(path.join(source,`${name}.json`),'utf8'));
const [policy,catalog,gallery,profile,videos]=await Promise.all(['policy','catalog','gallery','profile','videos'].map(read));
const tracks=catalog.flatMap(a=>a.tracks),ids=new Set(),mapping=new Map();
if(catalog.length!==policy.expectedAlbums||tracks.length!==policy.expectedTracks)throw Error(`Catalog count changed: ${catalog.length} albums / ${tracks.length} tracks; review content/policy.json before publishing.`);
const library=process.env.MUSIC_LIBRARY||path.join(os.homedir(),policy.libraryPathFromHome);
const verify=process.argv.includes('--verify-library');
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
for(const a of catalog){
 if(policy.removedAlbums.some(old=>old.id===a.id))throw Error(`Retired album cannot be published: ${a.name}`);
 if(ids.has(a.id))throw Error(`Duplicate album ${a.id}`);ids.add(a.id);
 const cover=path.join(fresh,'dist',a.cover);const meta=await sharp(cover).metadata();if(!meta.width)throw Error(`Invalid cover: ${a.cover}`);
 for(const t of a.tracks){
  if(t.url&&!/^https:\/\//.test(t.url))throw Error(`Invalid audio URL ${t.id}`);
  if(mapping.has(t.id)&&mapping.get(t.id)!==t.url)throw Error(`Conflicting track mapping ${t.id}`);mapping.set(t.id,t.url);
  if(verify){
   if(!t.sourceFile||path.isAbsolute(t.sourceFile)||t.sourceFile.split(/[\\/]/).includes('..'))throw Error(`Invalid source path ${t.id}`);
   const stat=await fs.stat(path.join(library,t.sourceFile));if(stat.size===0)throw Error(`Empty audio ${t.sourceFile}`);
   const title=path.basename(t.sourceFile).replace(/\.[^.]+$/,'').replace(/^\d{1,2}\s*-\s*/,'');
   if(normalize(title)!==normalize(t.name))throw Error(`Source title mismatch ${t.name}`);
  }
 }
}
// Validate every local reference before writing any generated JSON.
for(const g of gallery)for(const key of ['thumb','src'])await fs.access(path.join(fresh,'dist',g[key]));
const publicCatalog=catalog.map(a=>({...a,tracks:a.tracks.map(({sourceFile,...t})=>t)}));
await fs.mkdir(path.join(out,'data'),{recursive:true});
for(const [name,data]of Object.entries({catalog:publicCatalog,gallery,profile,videos})){
 const dest=path.join(out,'data',`${name}.json`),temp=`${dest}.next`;
 await fs.writeFile(temp,JSON.stringify(data,null,2)+'\n');await fs.rename(temp,dest);
}
const receipt={at:new Date().toISOString(),source:'fresh/content',legacyImports:0,albums:catalog.length,tracks:tracks.length,playable:tracks.filter(t=>t.url).length,unmapped:tracks.filter(t=>!t.url).map(t=>t.id),gallery:gallery.length,videos:videos.length,verifiedLocalFiles:verify?tracks.length:null,removedStaleAlbums:policy.removedAlbums};
await fs.mkdir(path.join(fresh,'qa/v2.2'),{recursive:true});await fs.writeFile(path.join(fresh,'qa/v2.2/content-build.json'),JSON.stringify(receipt,null,2)+'\n');
console.log(JSON.stringify(receipt,null,2));
