import assert from 'node:assert/strict';
import fs from 'node:fs';

const origin = process.argv[2] ?? 'http://localhost:3100';
const canonicalOrigin = 'https://www.antalyaklimaservisi.tr';
const failures = [];
const request = (path, options = {}) => fetch(origin + path, { signal: AbortSignal.timeout(45000), ...options });
const xmlResponse = await request('/sitemap.xml');
assert.equal(xmlResponse.status, 200);
const xml = await xmlResponse.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap URLs');
assert.ok(urls.length > 3500 && urls.length < 5000, 'Expected focused directory sitemap');
assert.ok(!xml.includes('<lastmod>'), 'Do not fabricate modification dates');
assert.ok(!urls.some(url => /\/[^/]+-klima-servisi$/.test(url)), 'Combination routes must not be submitted');
const directory = await (await request('/api/neighborhoods')).json();
assert.equal(new Set(directory.data.map(item => item.district)).size, 19);
assert.ok(directory.data.length >= 913);
assert.equal(new Set(directory.data.map(item => item.district + '/' + item.slug)).size, directory.data.length);
const robots = await (await request('/robots.txt')).text();
assert.ok(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));
assert.ok(!/Disallow:\s*\/\s*$/m.test(robots));

let checked = 0;
const queue = [...urls];
async function worker() {
  while (queue.length) {
    const url = queue.shift();
    try {
      assert.ok(url.startsWith(canonicalOrigin + '/'));
      const path = new URL(url).pathname;
      const response = await request(path);
      assert.equal(response.status, 200, 'HTTP status');
      assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
      const html = await response.text();
      const locale = path.split('/')[1];
      assert.ok(html.includes(`<html lang="${locale}"`), 'HTML language');
      assert.ok(html.includes(`rel="canonical" href="${url}"`), 'Canonical mismatch');
      assert.ok(!/name="robots" content="[^"]*noindex/.test(html), 'Noindex in sitemap');
      assert.equal((html.match(/<h1\b/g) ?? []).length, 1, 'One H1');
      const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
      assert.ok(scripts.length > 0, 'Structured data missing');
      const graph = scripts.flatMap(match => JSON.parse(match[1])['@graph'] ?? []);
      const company = graph.find(item => item['@type'] === 'HVACBusiness');
      assert.ok(company?.name && company?.address?.streetAddress && company?.telephone, 'Incomplete business');
      assert.equal(company.address.streetAddress, 'Muratpaşa Mahallesi, 583 Sokak No: 3/A');
      const breadcrumbs = graph.find(item => item['@type'] === 'BreadcrumbList');
      if (breadcrumbs) {
        assert.equal(breadcrumbs.itemListElement.length, new Set(breadcrumbs.itemListElement.map(item => item.item)).size, 'Repeated breadcrumbs');
        breadcrumbs.itemListElement.forEach((item, index) => assert.equal(item.position, index + 1));
      }
      assert.ok(!/<img\b(?![^>]*\balt=)/.test(html), 'Image alt missing');
      checked++;
      if (checked % 500 === 0) console.log(`Checked ${checked}/${urls.length}`);
    } catch (error) { failures.push({ url, message: error.message }); }
  }
}
await Promise.all(Array.from({ length: 8 }, worker));
for (const path of ['/en/constructor', '/tr/__proto__', '/de/hizmetler/unknown', '/ru/antalya/unknown/unknown', '/fr']) {
  const response = await request(path);
  if (response.status !== 404) failures.push({ path, message: `Expected 404, got ${response.status}` });
}
for (const [path, location] of [['/hizmetler', '/tr/hizmetler'], ['/rehber', '/tr/rehber'], ['/ilceler/muratpasa', '/tr/ilceler/muratpasa']]) {
  const response = await request(path, { redirect: 'manual' });
  if (response.status !== 308 || new URL(response.headers.get('location'), origin).pathname !== location) failures.push({ path, message: 'Legacy redirect incorrect' });
}
const imageResponse = await request('/_next/image?url=%2Fklima-bakim.png&w=384&q=75', { headers: { Accept: 'image/webp' } });
const imageBytes = (await imageResponse.arrayBuffer()).byteLength;
if (imageResponse.status !== 200 || imageBytes >= 150000) failures.push({ message: `Image optimization failed: ${imageResponse.status}, ${imageBytes} bytes` });
const report = { checked, sitemapUrls: urls.length, neighborhoods: directory.data.length, districts: 19, optimizedImageBytes: imageBytes, failures, completedAt: new Date().toISOString() };
fs.writeFileSync(new URL('../backups/seo-check-result.json', import.meta.url), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
process.exitCode = failures.length ? 1 : 0;
