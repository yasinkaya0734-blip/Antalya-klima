import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

// Test the rendered production response, including metadata and article text.
const origin = process.argv[2] ?? 'http://localhost:3100';
function data(file) {
  const source = fs.readFileSync(new URL(`../src/app/${file}`, import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const context = { exports: {} };
  vm.runInNewContext(compiled, context);
  return context.exports;
}
const { copy, locales } = data('i18n.ts');
const { guides } = data('guide-data.ts');
const { business } = data('business.ts');
const { allDistricts, brands, services, slugify } = data('site-data.ts');
const decode = value => value.replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16))).replace(/&#(\d+);/g, (_, number) => String.fromCodePoint(Number(number))).replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const visible = html => decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' '));
const paths = ['', '/hizmetler', '/ilceler', '/markalar', '/rehber', '/iletisim', '/hakkimizda', '/kvkk', '/gizlilik-politikasi', '/kullanim-kosullari',
  ...services.map(value => `/hizmetler/${value.slug}`),
  ...allDistricts.map(value => `/ilceler/${value.slug}`),
  ...brands.map(value => `/markalar/${slugify(value)}`),
  ...guides.map(value => `/rehber/${value.slug}`),
  '/antalya/muratpasa/lara', '/antalya/muratpasa/lara/daikin-klima-servisi',
  '/antalya/hizmetler/klima-ariza-servisi', '/antalya/muratpasa/hizmetler/klima-bakim-servisi',
  '/antalya/muratpasa/lara/hizmetler/klima-montaj-servisi', '/markalar/daikin/hizmetler/klima-tamir-servisi'];
const jobs = locales.flatMap(locale => paths.map(path => ({ locale, path })));
let checked = 0;
const errors = [];
async function check({ locale, path }) {
  const url = `${origin}/${locale}${path}`;
  const response = await fetch(url, { signal: AbortSignal.timeout(45000) });
  assert.equal(response.status, 200, `${url}: status`);
  const html = await response.text();
  const text = visible(html);
  assert.match(html, new RegExp(`<html[^>]+lang="${locale}"`), `${url}: html language`);
  assert.ok(html.includes(`rel="canonical" href="https://www.antalyaklimaservisi.tr/${locale}${path}"`), `${url}: canonical`);
  for (const language of locales) {
    assert.ok(html.includes(`hrefLang="${language}" href="https://www.antalyaklimaservisi.tr/${language}${path}"`), `${url}: alternate ${language}`);
    assert.ok(html.includes(`href="/${language}${path}"`), `${url}: switch ${language}`);
  }
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${url}: one heading`);
  const combination = (path.startsWith('/antalya/') && path.split('/').length > 4) || path.includes('/hizmetler/klima-') && !path.startsWith('/hizmetler/');
  assert.equal(/name="robots" content="[^"]*noindex/.test(html), combination, `${url}: index policy`);
  assert.ok(text.includes(copy[locale].request), `${url}: translated CTA`);
  const article = guides.find(value => path === `/rehber/${value.slug}`)?.[locale];
  if (article) for (const line of [article.title, article.intro, ...article.points]) assert.ok(text.includes(line), `${url}: article text ${line}`);
  if (locale !== 'tr') assert.ok(!/Hemen Ara|Mobil Ara|Mahallesi|hizmet seçenekleri|Sık sorulan|Cihazın|talebiniz|yakında burada|Klima Servisi|bağımsız teknik/.test(text.replaceAll(business.displayAddress, '').replaceAll(business.streetAddress, '')), `${url}: Turkish leakage`);
  checked++;
}
async function worker() {
  while (jobs.length) {
    const job = jobs.shift();
    try { await check(job); } catch (error) { errors.push({ ...job, message: error.message }); }
  }
}
await Promise.all(Array.from({ length: 4 }, worker));
for (const path of ['/fr', '/en/rehber/not-a-guide', '/ru/hizmetler/unknown', '/de/ilceler/unknown']) {
  const response = await fetch(`${origin}${path}`);
  if (response.status !== 404) errors.push({ path, message: `Invalid route returned ${response.status}` });
}
const report = { checked, errors, at: new Date().toISOString() };
console.log(JSON.stringify(report, null, 2));
process.exitCode = errors.length ? 1 : 0;
