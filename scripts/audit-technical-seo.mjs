import fs from 'node:fs';
import { createHash } from 'node:crypto';
const origin=process.argv[2] || 'https://www.antalyaklimaservisi.tr';
const canonicalOrigin='https://www.antalyaklimaservisi.tr';
const failures=[], networkRetries=[], internalLinks=new Set(), seen=new Set();
const inventory=[];
const directory=JSON.parse(fs.readFileSync(new URL('../src/data/antalya-neighborhoods.json',import.meta.url),'utf8')).neighborhoods;
const districtSource=fs.readFileSync(new URL('../src/app/site-data.ts',import.meta.url),'utf8').split('export const allDistricts =')[1].split('export const neighborhoods =')[0];
const districtNames=new Map([...districtSource.matchAll(/slug: '([^']+)', name: '([^']+)'/g)].map(m=>[m[1],m[2]]));
const strip=html=>html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
async function request(path, options={}) {
  for(let attempt=0;attempt<3;attempt++) {
    try {return await fetch(origin+path,{redirect:'manual',signal:AbortSignal.timeout(20000),...options});}
    catch(error) {if(attempt===2)throw error;networkRetries.push({path,attempt:attempt+1});}
  }
}
const robotResponse=await request('/robots.txt');
const robots=await robotResponse.text();
if(robotResponse.status!==200 || !robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`) || /Disallow:\s*\/\s*$/m.test(robots)) failures.push({path:'/robots.txt',error:'Invalid robots configuration'});
const xmlResponse=await request('/sitemap.xml');
if(xmlResponse.status!==200)throw Error('Sitemap status '+xmlResponse.status);
const xml=await xmlResponse.text();
const urls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
if(new Set(urls).size!==urls.length)failures.push({path:'/sitemap.xml',error:'Duplicate URLs'});
let checked=0;
const queue=urls.map(url=>new URL(url).pathname);
async function worker() {
  while(queue.length) {
    const path=queue.shift();seen.add(path);
    try {
      const r=await request(path), html=await r.text();
      const canonicals=[...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/g)].map(m=>m[1]);
      if(r.status!==200) failures.push({path,status:r.status,location:r.headers.get('location')});
      if(canonicals.length!==1 || canonicals[0]!==canonicalOrigin+path)failures.push({path,error:'Canonical mismatch',canonicals});
      if(/<meta name="robots" content="[^"]*noindex/.test(html))failures.push({path,error:'Noindex URL in sitemap'});
      for(const anchor of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
        const href=anchor[1].replaceAll('&amp;','&');
        const destination=new URL(href,canonicalOrigin);
        const allowed=destination.protocol==='tel:' || (destination.protocol==='https:' && (['www.antalyaklimaservisi.tr','antalyaklimaservisi.tr'].includes(destination.hostname) || (destination.hostname==='wa.me' && destination.pathname==='/905382310734')));
        if(!allowed)failures.push({path,error:'Forbidden external navigation link',href});
      }
      for(const credit of html.matchAll(/<details class="landmark-credit">(.*?)<\/details>/gs))if(/<a\b/.test(credit[1]))failures.push({path,error:'Clickable external source credit remains'});
      if(path.includes('/klima-ariza-kodlari'))for(const link of html.matchAll(/href="(https?:\/\/[^\"]+)"/g)){const host=new URL(link[1].replaceAll('&amp;','&')).hostname;if(!['www.antalyaklimaservisi.tr','antalyaklimaservisi.tr','wa.me'].includes(host))failures.push({path,error:'Unexpected external link on error-code page',host});}
      const title=html.match(/<title>(.*?)<\/title>/s)?.[1];
      const description=html.match(/<meta name="description" content="([^"]*)"/)?.[1];
      const headings=[...html.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gs)].map(m=>strip(m[1]));
      if(!title || !description || headings.length!==1)failures.push({path,error:'Missing metadata or invalid H1 count'});
      const scripts=[...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
      const graph=scripts.flatMap(m=>JSON.parse(m[1])['@graph']||[]);
      const company=graph.find(item=>item['@type']==='HVACBusiness');
      if(!company || company.telephone!=='+902423440507' || company.address?.streetAddress!=='Muratpaşa Mahallesi, 583 Sokak No: 3/A')failures.push({path,error:'Business schema inconsistent'});
      for(const item of graph.filter(item=>item['@type']==='Service'))if(item.url!==canonicalOrigin+path || item.provider?.['@id']!==canonicalOrigin+'/#business')failures.push({path,error:'Service schema inconsistent'});
      const breadcrumbs=graph.find(item=>item['@type']==='BreadcrumbList')?.itemListElement;
      if(breadcrumbs && (new Set(breadcrumbs.map(item=>item.item)).size!==breadcrumbs.length || breadcrumbs.some((item,i)=>item.position!==i+1) || breadcrumbs.at(-1).item!==canonicalOrigin+path))failures.push({path,error:'Breadcrumb schema inconsistent'});
      const phones=[...html.matchAll(/href="(tel:[^"]+)"/g)].map(m=>m[1]);
      const whatsapp=[...html.matchAll(/href="(https:\/\/wa\.me\/[^\"]+)"/g)].map(m=>m[1]);
      if(!phones.includes('tel:+902423440507') || !phones.includes('tel:+905382310734') || phones.some(v=>!['tel:+902423440507','tel:+905382310734'].includes(v)) || !whatsapp.length || whatsapp.some(v=>new URL(v.replaceAll('&amp;','&')).pathname!=='/905382310734'))failures.push({path,error:'Contact link mismatch'});
      const segments=path.split('/');
      const area=segments[2]==='antalya'?directory.find(item=>item.district===segments[3]&&item.slug===segments[4]):undefined;
      let content=strip((html.match(/<main\b[\s\S]*?<\/main>/)?.[0]||'').split('<section class="request-planner"')[0]).toLocaleLowerCase('tr-TR');
      if(area) for(const value of [area.name,districtNames.get(area.district)||area.district,area.district])content=content.split(value.toLocaleLowerCase('tr-TR')).join('{place}');
      inventory.push({path,title,description,h1:headings[0],hasEditorial:html.includes('servis bilgileri'),contentHash:createHash('sha256').update(content).digest('hex'),schemaTypes:graph.map(item=>item['@type']),phoneLinks:phones.length,whatsappLinks:whatsapp.length});
      for(const m of html.matchAll(/href="(\/(?:tr|en|de|ru)(?:\/[^"?#]*)?)(?:[?#][^"]*)?"/g)) internalLinks.add(m[1]);
    }catch(e){failures.push({path,error:e.message});}
    checked++;if(checked%250===0)console.log(`Checked ${checked}/${urls.length}; findings ${failures.length}`);
  }
}
await Promise.all(Array.from({length:10},worker));
const extra=[...internalLinks].filter(path=>!seen.has(path));
await Promise.all(Array.from({length:6},async()=>{while(extra.length){const path=extra.shift();try{const r=await request(path);if(r.status!==200)failures.push({path,status:r.status,location:r.headers.get('location'),error:'Linked URL not direct 200'});}catch(e){failures.push({path,error:e.message});}}}));
const redirectChecks=[];
for(const [path,target] of [['/','/tr'],['/hizmetler','/tr/hizmetler'],['/ilceler/muratpasa','/tr/ilceler/muratpasa'],['/markalar/arcelik','/tr/markalar/arcelik'],['/gizlilik','/tr/gizlilik-politikasi'],['/tr/gizlilik','/tr/gizlilik-politikasi'],['/tr/antalya/kepez/yeni-mahalle','/tr/antalya/kepez/yeni']]) {
  const r=await request(path);const location=r.headers.get('location');
  const passed=r.status===308 && new URL(location,origin).pathname===target;
  redirectChecks.push({path,status:r.status,target:location,passed});if(!passed)failures.push({path,error:'Incorrect redirect'});
}
const missingChecks=[];
for(const path of ['/tr/olmayan-sayfa','/tr/ilceler/olmayan-ilce','/tr/antalya/aksu/olmayan-mahalle','/fr','/tr/__proto__','/en/constructor']) {
  const r=await request(path);const html=await r.text();const canonical=html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  missingChecks.push({path,status:r.status,canonical,noindex:/name="robots" content="[^"]*noindex/.test(html)});
  if(r.status!==404)failures.push({path,error:'Expected real 404',status:r.status});
  if(canonical)failures.push({path,error:'404 must not inherit homepage canonical',canonical});
}
const duplicates=field=>{const groups=new Map();for(const item of inventory){const key=item[field];if(!groups.has(key))groups.set(key,[]);groups.get(key).push(item.path);}return [...groups].filter(([,paths])=>paths.length>1).map(([value,paths])=>({value,paths}));};
const report={origin,sitemapUrls:urls.length,checked,internalLinks:internalLinks.size,robots,redirectChecks,missingChecks,networkRetryCount:networkRetries.length,duplicateTitles:duplicates('title'),duplicateDescriptions:duplicates('description'),normalizedContentGroups:duplicates('contentHash'),failures,completedAt:new Date().toISOString()};
fs.mkdirSync('qa-output',{recursive:true});const out=`qa-output/technical-seo-${origin.includes('127.0.0.1')?'local':'live'}.json`;fs.writeFileSync(out,JSON.stringify(report,null,2));
fs.writeFileSync(out.replace('.json','-inventory.json'),JSON.stringify(inventory,null,2));
console.log(JSON.stringify({...report,normalizedContentGroups:report.normalizedContentGroups.map(g=>({count:g.paths.length,examples:g.paths.slice(0,3)}))},null,2));process.exitCode=failures.length?1:0;
