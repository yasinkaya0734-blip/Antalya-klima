import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const host = 'www.antalyaklimaservisi.tr';
const origin = `https://${host}`;
const publicDir = path.join(root, 'public');
const keyFiles = (await fs.readdir(publicDir)).filter(name => /^[a-f0-9]{32}\.txt$/i.test(name));

if (keyFiles.length !== 1) throw new Error(`Expected exactly one IndexNow key file, found ${keyFiles.length}.`);

const keyFile = keyFiles[0];
const key = (await fs.readFile(path.join(publicDir, keyFile), 'utf8')).trim();
if (key !== keyFile.slice(0, -4)) throw new Error('IndexNow key file name and contents do not match.');

const sitemapResponse = await fetch(`${origin}/sitemap.xml`, { signal: AbortSignal.timeout(30000) });
if (!sitemapResponse.ok) throw new Error(`Sitemap request failed: ${sitemapResponse.status}`);
const xml = await sitemapResponse.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1].trim());
if (!urls.length || new Set(urls).size !== urls.length) throw new Error('Sitemap is empty or contains duplicate URLs.');
for (const value of urls) {
  const parsed = new URL(value);
  if (parsed.origin !== origin) throw new Error(`Sitemap contains a non-canonical host URL: ${value}`);
}

const keyLocation = `${origin}/${keyFile}`;
const keyResponse = await fetch(keyLocation, { signal: AbortSignal.timeout(15000) });
if (!keyResponse.ok || (await keyResponse.text()).trim() !== key) {
  throw new Error(`IndexNow verification key is not publicly readable: ${keyLocation}`);
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation, urlList: urls }),
  signal: AbortSignal.timeout(30000),
});
if (response.status !== 200 && response.status !== 202) {
  const detail = (await response.text()).slice(0, 500);
  throw new Error(`IndexNow submission failed: HTTP ${response.status} ${detail}`);
}

console.log(`IndexNow accepted ${urls.length} sitemap URLs (HTTP ${response.status}).`);
