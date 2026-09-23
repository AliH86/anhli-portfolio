// Static route pages share one UI/content module and the existing portfolio engine.
// Run from any cwd. A base URL relative to each route also supports GitHub project paths.
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

import {routes,aliases} from '../js/redesign/content.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
let index=await fs.readFile(path.join(root,'index.html'),'utf8');
const context=vm.createContext({window:{}});
const legacy={};
for(const key of ['GALLERY','WORK','VIDEOS']){
  const match=index.match(new RegExp('const '+key+' = (\\[[\\s\\S]*?\\n\\]);'));
  if(!match)throw Error('Missing legacy '+key);
  legacy[key]=vm.runInContext(match[1],vm.createContext({}));
}
for(const item of legacy.GALLERY){
  for(const file of [item.src,item.poster].filter(Boolean))if(!/^https?:/.test(file))await fs.access(path.join(root,file));
}
await fs.writeFile(path.join(root,'js/redesign/legacy-about.mjs'),'// Generated from index.html GALLERY / WORK / VIDEOS. Edit the original source.\nexport const legacy = '+JSON.stringify(legacy,null,2)+';\n');
const {shell}=await import('../js/redesign/view.mjs');
const inline=index.match(/const ALBUMS = (\[[\s\S]*?\n\]);/);
if(!inline)throw Error('Inline catalog not found; refusing to overwrite pages.');
const albums=vm.runInContext(inline[1],context);
vm.runInContext(await fs.readFile(path.join(root,'music-data-base.js'),'utf8'),context);
vm.runInContext(await fs.readFile(path.join(root,'audio-map.js'),'utf8'),context);
for(const source of context.window.PORTFOLIO_MUSIC.albums){
  const existing=albums.find(a=>a.id===source.id);
  if(existing)Object.assign(existing,source);else albums.push(source);
}
const catalog=albums.filter(a=>!a.hidden).map(a=>({...a,tracks:(a.tracks||[]).filter(t=>context.window.AUDIO_MAP[t.id])})).filter(a=>a.tracks.length);
const start='<!-- DG SHELL START -->',end='<!-- DG SHELL END -->';
if(!index.includes(start)||!index.includes(end))throw Error('Shell markers missing.');
const written=[];
for(const route of routes){
  const depth=route.path.split('/').filter(Boolean).length;
  const base=depth?'../'.repeat(depth):'./';
  let page=index.replace(/<base[^>]*data-dg-base[^>]*>/,`<base data-dg-base href="${base}">`);
  page=page.replace(/<!-- DG SHELL START -->[\s\S]*?<!-- DG SHELL END -->/,`${start}\n${shell(route.id,{albums:catalog})}\n${end}`);
  page=page.replace(/<title>[\s\S]*?<\/title>/,`<title>${route.label} · Anh Li — The Dandelion Garden</title>`);
  const filename=path.join(root,route.path,'index.html');
  await fs.mkdir(path.dirname(filename),{recursive:true});await fs.writeFile(filename,page);written.push(path.relative(root,filename));
}
for(const alias of aliases){
  const depth=alias.path.split('/').filter(Boolean).length;
  const href='../'.repeat(depth)+'about/'+(alias.hash||'');
  const filename=path.join(root,alias.path,'index.html');
  await fs.mkdir(path.dirname(filename),{recursive:true});
  await fs.writeFile(filename,`<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>About · Anh Li</title><meta http-equiv="refresh" content="0;url=${href}"><a href="${href}">Về About · Anh Li</a></html>`);
}
await fs.writeFile(path.join(root,'source/ui-redesign/route-build.json'),JSON.stringify({routes:written,albums:catalog.length,tracks:catalog.reduce((n,a)=>n+a.tracks.length,0),source:'index.html engine + js/redesign/content.mjs + view.mjs; generated route HTML'},null,2)+'\n');
console.log(`Built ${written.length} routes; ${catalog.length} albums. ${written.join(', ')}`);
