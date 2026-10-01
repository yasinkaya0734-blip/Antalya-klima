import assert from 'node:assert/strict';
const origin = process.argv[2] ?? 'http://127.0.0.1:3107';
const districts = ['akseki','aksu','alanya','demre','dosemealti','elmali','finike','gazipasa','gundogmus','ibradi','kas','kemer','kepez','konyaalti','korkuteli','kumluca','manavgat','muratpasa','serik'];
for (const locale of ['tr','en','de','ru']) {
  const titles = new Set(), descriptions = new Set();
  for (const suffix of ['', ...districts.map(slug => `/ilceler/${slug}`)]) {
    const path = `/${locale}${suffix}`;
    const response = await fetch(origin + path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
    const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
    assert.ok(title && description, path + ' metadata missing');
    assert.ok(!titles.has(title), path + ' duplicate title');
    assert.ok(!descriptions.has(description), path + ' duplicate description');
    titles.add(title); descriptions.add(description);
    assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, path + ' H1');
    assert.ok(html.includes(`href="https://www.antalyaklimaservisi.tr${path}"`), path + ' canonical');
    assert.ok(!html.includes('content="noindex'), path + ' indexability');
    const graphs = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].flatMap(match => JSON.parse(match[1])['@graph'] ?? []);
    if (suffix) assert.ok(graphs.some(item => item['@type'] === 'Service' && item.areaServed?.name && item.provider?.['@id']), path + ' local service schema');
  }
  console.log(`${locale}: 20 unique titles/descriptions, H1, canonical, indexing and district Service schema OK`);
}
