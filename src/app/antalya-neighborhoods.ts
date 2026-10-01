import snapshot from '../data/antalya-neighborhoods.json';
import { neighborhoods as legacyAreas } from './site-data';

export type AntalyaNeighborhood = { district: string; slug: string; name: string };
// A reviewed local snapshot keeps routes, search and sitemap identical during outages.
const directory: AntalyaNeighborhood[] = [...snapshot.neighborhoods];
const known = new Set(directory.map(item => `${item.district}/${item.slug}`));
for (const area of legacyAreas) {
  // Yeni Mahalle is an alias of the directory's Yeni entry, not another area.
  if (area.district === 'kepez' && area.slug === 'yeni-mahalle') continue;
  if (!known.has(`${area.district}/${area.slug}`)) directory.push(area);
}
directory.sort((a, b) => a.district.localeCompare(b.district, 'tr') || a.name.localeCompare(b.name, 'tr'));
export function getAntalyaNeighborhoods(): AntalyaNeighborhood[] { return directory; }
