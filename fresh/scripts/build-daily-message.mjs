// Copy approved Oracle content for the self-contained Fresh runtime; never rewrite originals.
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
const root=new URL('../../',import.meta.url),context=vm.createContext({window:{}}),sources={};
for(const name of ['garden-oracle-data.js','garden-oracle-profiles.js','garden-oracle-identities.js']){
 const text=await fs.readFile(new URL(name,root),'utf8');sources[name]=createHash('sha256').update(text).digest('hex');vm.runInContext(text,context);
}
const cards=context.window.GARDEN_ORACLE_CARDS.map(c=>({id:c.id,name:context.window.GARDEN_ORACLE_IDENTITIES[c.id].cardName,open:{title:c.gardenOpen,message:c.bloom},closed:{title:c.gardenClosed,message:c.closed},image:`./assets/oracle/seed-${String(c.id).padStart(2,'0')}.webp`}));
if(cards.length!==78)throw Error('Expected all 78 approved cards');
await fs.mkdir(new URL('fresh/dist/assets/oracle/',root),{recursive:true});
for(const c of cards)await fs.copyFile(new URL(`images/oracle/cards/seed-${String(c.id).padStart(2,'0')}.webp`,root),new URL(`fresh/dist/assets/oracle/seed-${String(c.id).padStart(2,'0')}.webp`,root));
await fs.writeFile(new URL('fresh/dist/data/daily-messages.json',root),JSON.stringify({sources,cards},null,2)+'\n');
console.log(`Exported ${cards.length} approved cards and their existing artwork.`);
