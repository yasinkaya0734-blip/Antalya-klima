import type { MetadataRoute } from 'next';
import { allDistricts, brands, services, slugify } from './site-data';
import { guides } from './guide-data';
import { locales } from './i18n';
import { getAntalyaNeighborhoods } from './antalya-neighborhoods';
import { districtServiceCopy, districtServicePath, districtServiceSlugs } from './district-services';
import { errorCodeBrands, errorCodeReviewDate } from './error-code-data';

const base = 'https://www.antalyaklimaservisi.tr';
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/hizmetler', '/ilceler', '/markalar', '/rehber', '/iletisim', '/hakkimizda', '/kvkk', '/gizlilik-politikasi', '/kullanim-kosullari',
    ...services.map(item => `/hizmetler/${item.slug}`),
    ...allDistricts.map(item => `/ilceler/${item.slug}`),
    ...getAntalyaNeighborhoods()
      .filter(item => allDistricts.some(district => district.slug === item.district))
      .map(item => `/antalya/${item.district}/${item.slug}`),
    ...brands.map(item => `/markalar/${slugify(item)}`),
    ...guides.map(item => `/rehber/${item.slug}`)];
  // The localized catch-all serves indexable neighborhood pages from this
  // same directory. Brand/service combinations remain excluded (noindex).
  const existing = locales.flatMap(locale => [...new Set(paths)].map(path => ({
    url: `${base}/${locale}${path}`,
    alternates: { languages: Object.fromEntries([...locales.map(language => [language, `${base}/${language}${path}`]), ['x-default', `${base}/tr${path}`]]) },
  })));
  const editorialPaths = [
    ...Object.keys(districtServiceCopy).flatMap(district => districtServiceSlugs.map(service => districtServicePath(district, service))),
    '/klima-ariza-kodlari',
    ...errorCodeBrands.filter(brand => brand.groups.length > 0).map(brand => `/klima-ariza-kodlari/${brand.slug}`),
  ];
  return [...existing, ...editorialPaths.map(path => ({
    url: `${base}/tr${path}`,
    lastModified: errorCodeReviewDate,
    alternates: { languages: { tr: `${base}/tr${path}`, 'x-default': `${base}/tr${path}` } },
  }))];
}
