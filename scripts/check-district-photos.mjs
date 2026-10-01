import assert from 'node:assert/strict';
import fs from 'node:fs';
const origin = process.argv[2] ?? 'http://localhost:3101';
const photos = JSON.parse(fs.readFileSync(new URL('../src/data/district-landmarks.json', import.meta.url),'utf8'));
assert.equal(Object.keys(photos).length,19);
for(const locale of ['tr','en','de','ru']){
 const response=await fetch(`${origin}/${locale}/ilceler`);assert.equal(response.status,200);const html=await response.text();
 assert.equal((html.match(/data-district=/g)||[]).length,19);
 for(const [slug,photo] of Object.entries(photos)){
  assert.ok(html.includes(`data-district="${slug}"`));
  assert.ok(html.includes(photo.name[locale].replaceAll('&','&amp;')));
  assert.ok(html.includes(encodeURIComponent(photo.mapQuery)));
  assert.ok(html.includes(photo.licenseUrl));
  assert.ok(html.includes(`href="/${locale}/ilceler/${slug}"`));
 }
 console.log(locale+': 19 photos, district links, map queries, localized names and licenses OK');
}
let bytes=0;
for(const photo of Object.values(photos)){
 assert.ok(fs.existsSync(new URL('../public'+photo.image,import.meta.url)));
 const r=await fetch(`${origin}/_next/image?url=${encodeURIComponent(photo.image)}&w=384&q=75`,{headers:{Accept:'image/webp'}});
 assert.equal(r.status,200);assert.ok(r.headers.get('content-type')?.startsWith('image/'));
 const length=(await r.arrayBuffer()).byteLength;bytes+=length;assert.ok(length<150000,photo.image+' too large '+length);
}
console.log('19 optimized 384px images total bytes:',bytes);
