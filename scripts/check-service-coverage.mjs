import assert from 'node:assert/strict';
import fs from 'node:fs';
const origin = process.argv[2] || 'http://127.0.0.1:3107';
const canonical = 'https://www.antalyaklimaservisi.tr';
const groups = {
  muratpasa: 'guzeloba fener caglayan sirinyali meltem meydankavagi yesilbahce muratpasa konuksever kiziltoprak memurevleri ermenek',
  kepez: 'varsak-karsiyaka varsak-esentepe gunes sutculer kultur ahatli yeni-emek duaci demirel yeni',
  konyaalti: 'hurma liman uncali altinkum gursu arapsuyu sarisu uluc',
  dosemealti: 'yesilbayir bahceyaka altinkale yenikoy ciplakli',
  aksu: 'altintas pinarli kundu kemeragzi guzelyurt',
};
const brandSlugs = 'arcelik beko altus bosch siemens vestel regal seg baymak demirdokum daikin mitsubishi-electric lg samsung tcl gree rubenis sigma vaillant cartel airfel alarko copa toshiba'.split(' ');
const districts = 'akseki aksu alanya demre dosemealti elmali finike gazipasa gundogmus ibradi kas kemer kepez konyaalti korkuteli kumluca manavgat muratpasa serik'.split(' ');
const areas = Object.entries(groups).flatMap(([district, values]) => values.split(' ').map(slug => `/tr/antalya/${district}/${slug}`));
assert.equal(areas.length, 40);
const paths = [...districts.map(s => `/tr/ilceler/${s}`), ...brandSlugs.map(s => `/tr/markalar/${s}`), ...areas];
const fetchPage = async path => {
  const response = await fetch(origin + path, {signal: AbortSignal.timeout(45000)});
  assert.equal(response.status, 200, path);
  return response.text();
};
const sitemap = await fetchPage('/sitemap.xml');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.equal(new Set(sitemapUrls).size,sitemapUrls.length,'Duplicate sitemap URLs');
const titles = new Set(), descriptions = new Set(), failures = [], links = new Set();
for (const path of paths) {
  try {
    const html = await fetchPage(path);
    const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
    const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
    assert.ok(title && description, path+' missing metadata');
    assert.ok(!titles.has(title), path+' repeated title'); titles.add(title);
    assert.ok(!descriptions.has(description), path+' repeated description'); descriptions.add(description);
    assert.equal((html.match(/<h1[ >]/g)||[]).length,1,path+' H1');
    assert.ok(html.includes(`rel="canonical" href="${canonical}${path}"`), path+' canonical');
    assert.ok(!/<meta name="robots" content="[^"]*noindex/.test(html), path+' noindex');
    assert.ok(sitemapUrls.includes(canonical+path),path+' missing from sitemap');
    const graph=[...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].flatMap(m=>JSON.parse(m[1])['@graph']||[]);
    assert.ok(graph.some(item=>item['@type']==='Service' && item.provider?.['@id']),path+' service schema');
    if(areas.includes(path)) {
      assert.ok(html.includes('Servis ziyaretinde hangi işlemler değerlendirilir?'),path+' local content');
      for(const brand of brandSlugs) assert.ok(html.includes(`href="/tr/markalar/${brand}"`),path+' brand '+brand);
    }
    if(path.includes('/markalar/')) assert.ok(html.includes('klima için mahalleye göre servis'),path+' neighborhood directory');
    for(const m of html.matchAll(/href="(\/tr[^"#?]*)/g)) links.add(m[1].replace(/&amp;/g,'&'));
  } catch(error) { failures.push({path,error:error.message}); }
}
const queue=[...links];
await Promise.all(Array.from({length:4},async()=>{while(queue.length){const path=queue.shift();try{await fetchPage(path);}catch(error){failures.push({path,error:error.message});}}}));
for(const path of ['/tr/klima-ariza-kodlari','/tr/klima-ariza-kodlari/arcelik']) {
  const html=await fetchPage(path);
  assert.ok(!html.includes('Kaynak:'),path+' source label');
  assert.ok(!html.includes('https://www.arcelik.com.tr/blog/klima-hata-kodlari'),path+' source URL');
}
const combination = await fetchPage('/tr/antalya/muratpasa/fener/arcelik-klima-servisi');
assert.ok(/<meta name="robots" content="noindex/.test(combination),'Thin combinations must remain noindex');
const invalid = await fetch(origin+'/tr/antalya/aksu/olmayan-mahalle');
assert.equal(invalid.status,404,'Invalid neighborhood');
const alias = await fetch(origin+'/tr/antalya/kepez/yeni-mahalle', {redirect:'manual'});
assert.equal(alias.status,308,'Neighborhood alias permanent redirect');
assert.equal(new URL(alias.headers.get('location'),origin).pathname,'/tr/antalya/kepez/yeni');
assert.ok(!sitemapUrls.some(url=>url.includes('/kepez/yeni-mahalle')),'Alias in sitemap');
const report={origin,districts:19,brands:24,featuredNeighborhoods:40,pages:paths.length,internalLinks:links.size,sitemapUrls:sitemapUrls.length,failures,checkedAt:new Date().toISOString()};
fs.mkdirSync('qa-output',{recursive:true});
fs.writeFileSync('qa-output/service-coverage.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
process.exitCode=failures.length?1:0;
