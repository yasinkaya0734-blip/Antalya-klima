import assert from 'node:assert/strict';
const origin = process.argv[2] ?? 'http://localhost:3101';
const labels = { tr: ['İşyeri çalışma saatleri', 'Servis talebinizi hazırlayın'], en: ['Business opening hours', 'Prepare your service request'], de: ['Öffnungszeiten des Betriebs', 'Serviceanfrage vorbereiten'], ru: ['Часы работы офиса', 'Подготовьте заявку на обслуживание'] };
for (const [locale, [hoursTitle, plannerTitle]] of Object.entries(labels)) {
 const response = await fetch(`${origin}/${locale}/iletisim`);
 assert.equal(response.status, 200);
 const html = await response.text();
 assert.ok(html.includes(hoursTitle) && html.includes(plannerTitle), `${locale} translated sections`);
 const graphs = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
 const business = graphs.flatMap(graph => graph['@graph'] ?? [graph]).find(item => item['@type'] === 'HVACBusiness');
 assert.equal(business.openingHoursSpecification.length, 3);
 assert.equal(business.openingHoursSpecification[0].dayOfWeek.length, 5);
 assert.equal(business.openingHoursSpecification[0].opens, '08:30');
 assert.equal(business.openingHoursSpecification[0].closes, '20:30');
 assert.equal(business.openingHoursSpecification[1].opens, '09:00');
 assert.equal(business.openingHoursSpecification[1].closes, '18:30');
 assert.equal(business.openingHoursSpecification[2].opens, '11:00');
 assert.equal(business.openingHoursSpecification[2].closes, '16:30');
 assert.ok(!html.includes('copaservisi.com'));
 const legacy = await fetch(`${origin}/${locale}/gizlilik`, { redirect: 'manual' });
 assert.equal(legacy.status, 308);
 assert.equal(new URL(legacy.headers.get('location'), origin).pathname, `/${locale}/gizlilik-politikasi`);
 console.log(`${locale}: hours, request planner, independent legal links and privacy redirect OK`);
}
for (const path of ['kvkk','gizlilik-politikasi','kullanim-kosullari']) {
 const response = await fetch(`${origin}/${path}`, { redirect: 'manual' });
 assert.equal(response.status,308);
 assert.equal(new URL(response.headers.get('location'),origin).pathname,`/tr/${path}`);
}
const sample = await fetch(`${origin}/tr/antalya/akseki/bademli`);
assert.equal(sample.status,200);
const sampleHtml = await sample.text();
assert.ok(sampleHtml.includes('Bademli bölgesi için cihaz'));
assert.ok(!sampleHtml.includes('bademli Mahallesi için cihaz'));
console.log('Legal root redirects and neighborhood display name OK');
