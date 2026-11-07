Warning: truncated output (original token count: 10402)
Total output lines: 272

import type { Metadata } from 'next';
import { getDistrictService } from '../../district-services';
import { resolveErrorPage } from '../../error-code-data';
import DistrictServiceContent, { DistrictServiceLinks } from '../../components/DistrictServiceContent';
import ErrorCodeContent from '../../components/ErrorCodeContent';
import { locationSeo } from '../../location-seo';
import Link from 'next/link';
import Image from 'next/image';
import { legalTitles, legalPaths, legalParagraphs } from '../../legal-content';
import { information } from '../../site-content';
import { business, businessSchema } from '../../business';
import { notFound } from 'next/navigation';
import { allDistricts, brands, priorityDistricts, services, slugify } from '../../site-data';
import { getAntalyaNeighborhoods } from '../../antalya-neighborhoods';
import { guides } from '../../guide-data';
import { areaTitle, copy, isLocale, locales, type Locale } from '../../i18n';
import DistrictLandmarkCard, { DistrictLandmarkFeature, LandmarkIntro } from '../../components/DistrictLandmarkCard';
import MobileCallNotice from '../../components/MobileCallNotice';
import OpeningHours from '../../components/OpeningHours';
import RequestPlanner from '../../components/RequestPlanner';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import LegalFooter from '../../components/LegalFooter';
import { brandDistrictDescription, brandDistrictPlanningNote, pageEditorial, brandNeighborhoodNote } from '../../turkish-editorial';
import { featuredNeighborhood, neighborhoodSeo } from '../../featured-neighborhoods';
import { BrandServiceContent, FeaturedAreaLinks, NeighborhoodServiceContent } from '../../components/LocalServiceContent';
import { resolveLocalPage } from '../../local-pages';

const base = 'https://www.antalyaklimaservisi.tr';
const landingSlugs = ['klima-ariza-servisi', 'klima-bakim-servisi', 'klima-montaj-servisi', 'klima-tamir-servisi'];
const images = ['/klima-ariza-tamir.webp', '/klima-bakim.webp', '/klima-montaj.webp', '/klima-gaz-dolumu.webp', '/klima-parcalari-aksesuarlari.webp'];
function normalizeTurkishTitle(title: string, brand?: string) {
  let main = title.split('|')[0].trim();
  if (brand) main = main.replace(new RegExp(`\\b${brand}\\s+Klima\\s+Servisi\\b`, 'gi'), `${brand} Servisi`);
  const suffix = /gaz\s*dolum/i.test(title) ? 'Klima Gaz Dolumu'
    : /montaj|demontaj/i.test(title) ? 'Klima Montaj Hizmeti'
      : /bakım|tamir|onarım|arıza/i.test(title) ? 'Aynı Gün Klima Servis Hizmeti'
        : '7/24 Klima Servis';
  return `${main} | ${suffix}`;
}
type Props = { params: Promise<{ locale: string; slug?: string[] }>; searchParams: Promise<{ mahalle?: string; marka?: string }> };

// Keep existing URLs; headings and content are translated independently of slugs.
async function resolvePage(locale: Locale, slug: string[]) {
  const t = copy[locale];
  const localPage = resolveLocalPage(locale, slug);
  if (localPage) return { localPage, districtService: undefined, errorPage: undefined, section: 'antalya', item: slug[1], neighborhoods: [], brand: localPage.brand, district: allDistricts.find(value => value.slug === localPage.districtSlug), neighborhood: undefined, districtBrandRoute: false, serviceIndex: localPage.serviceIndex ?? -1, guide: undefined, landingIndex: -1, isLanding: false, place: localPage.place ?? 'Antalya', title: locale === 'tr' ? normalizeTurkishTitle(localPage.title, localPage.brand) : localPage.title, description: localPage.description };
  const districtService = getDistrictService(locale, slug);
  const errorPage = resolveErrorPage(locale, slug);
  const [section, item] = slug;
  const neighborhoods = section === 'antalya' || section === 'ilceler' ? await getAntalyaNeighborhoods() : [];
  const brandRoute = section === 'markalar' ? brands.find(value => slugify(value) === item) : undefined;
  const districtBrandRoute = section === 'antalya' && slug.length === 4 && slug[2] === 'marka';
  const districtBrand = districtBrandRoute ? brands.find(value => slugify(value) === slug[3]) : undefined;
  const brandDistrict = brandRoute && slug.length === 3 ? allDistricts.find(value => value.slug === slug[2]) : undefined;
  if ((section === 'markalar' && slug.length === 3 && (!brandRoute || !brandDistrict || locale !== 'tr')) || (districtBrandRoute && (!districtBrand || locale !== 'tr'))) notFound();
  const district = allDistricts.find(value => value.slug === item) ?? brandDistrict;
  const neighborhood = neighborhoods.find(value => value.district === item && value.slug === slug[2]);
  const brand = districtBrand ?? brandRoute ?? brands.find(value => slugify(value) === slug[3]?.replace(/-klima-servisi$/, ''));
  const serviceIndex = services.findIndex(value => value.slug === item);
  const guide = guides.find(value => value.slug === item);
  const landingIndex = landingSlugs.indexOf(slug.at(-1) ?? '');
  const cityLanding = section === 'antalya' && slug.length === 3 && item === 'hizmetler';
  const districtLanding = section === 'antalya' && slug.length === 4 && slug[2] === 'hizmetler' && district;
  const neighborhoodLanding = section === 'antalya' && slug.length === 5 && slug[3] === 'hizmetler' && district && neighborhood;
  const brandLanding = section === 'markalar' && slug.length === 4 && slug[2] === 'hizmetler' && brand;
  const isLanding = landingIndex >= 0 && Boolean(cityLanding || districtLanding || neighborhoodLanding || brandLanding);
  const place = ['Antalya', district?.name, neighborhood?.name, brand].filter(Boolean).join(' ');
  const sectionTitles: Record<string, string> = { hizmetler: t.services, ilceler: t.allAreas, markalar: t.allBrands, rehber: t.guides, iletisim: t.contact, hakkimizda: information[locale].about, gizlilik: information[locale].privacy, ...Object.fromEntries(legalPaths.map((path, index) => [path, legalTitles[locale][index]])) };
  let title: string;
  let description = t.intro;
  if (districtService) { title = districtService.title; description = districtService.description; }
  else if (errorPage) { title = errorPage.title; description = errorPage.description; }
  else if (!section) title = t.sub;
  else if (isLanding) { title = locale === 'tr' ? `${place} | ${t.landingTitles[landingIndex]}` : `${t.landingTitles[landingIndex]} | ${place}`; description = t.serviceTexts[landingIndex === 3 ? 0 : landingIndex]; }
  else if (slug.length === 1 && Object.hasOwn(sectionTitles, section)) {
    title = locale === 'tr' && section === 'ilceler' ? sectionTitles[section] : locale === 'tr' && ['hizmetler', 'markalar'].includes(section) ? `Antalya | ${sectionTitles[section]}` : sectionTitles[section];
    if (locale === 'tr' && section === 'hizmetler') title = 'Antalya Klima Hizmetleri';
    if (locale === 'tr' && section === 'markalar') title = 'Antalya Klima Markaları';
    if (section === 'hizmetler') description = ({ tr: 'Antalya klima arıza, bakım, temizlik, montaj ve gaz hizmetleri. İşlem kapsamını cihazınıza ve talep türüne göre Kaya Teknik ile görüşün.', en: 'Air conditioner repair, maintenance, cleaning, installation and refrigerant services in Antalya. Discuss the work needed for your unit with Kaya Teknik.', de: 'Reparatur, Wartung, Reinigung, Montage und Kältemittelservice für Klimaanlagen in Antalya. Klären Sie den passenden Umfang mit Kaya Teknik.', ru: 'Ремонт, обслуживание, чистка, монтаж и работы с хладагентом в Анталье. Уточните подходящий объём услуг для вашего устройства у Kaya Teknik.' })[locale];
    if (section === 'ilceler') description = ({ tr: 'Antalya’nın 19 ilçesindeki klima servis bölgelerini inceleyin. İlçe ve mahalle seçerek hizmet kapsamı ile randevu uygunluğunu öğrenin.', en: 'Explore air conditioner service areas across Antalya’s 19 districts. Choose a district and neighbourhood to check service and appointment availability.', de: 'Entdecken Sie Klimaservicegebiete in allen 19 Bezirken Antalyas. Wählen Sie Bezirk und Stadtviertel, um Leistungen und Termine zu prüfen.', ru: 'Районы обслуживания кондиционеров во всех 19 районах Антальи. Выберите район и микрорайон, чтобы уточнить услуги и время визита.' })[locale];
    if (section === 'markalar') description = ({ tr: 'Sitede listelenen klima markalarında arıza, bakım ve montaj bilgileri. Marka ve model bilgisiyle cihazınıza uygun servis kapsamını öğrenin.', en: 'Find repair, maintenance and installation information for the air conditioner brands listed here. Share your model to discuss suitable service.', de: 'Informationen zu Reparatur, Wartung und Montage der hier aufgeführten Klimaanlagenmarken. Teilen Sie Ihr Modell für eine passende Einschätzung mit.', ru: 'Информация о ремо…5902 tokens truncated…ad">{t.intro}</p><LandmarkIntro locale={locale}/><h2>{t.priority}</h2><DistrictCards locale={locale} priority withLandmarks/><h2>{t.moreAreas}</h2><DistrictCards locale={locale} other withLandmarks/></>;
  } else if (section === 'markalar') {
    content = brand ? <>{district ? <BrandDistrictServiceContent brand={brand} district={district}/> : <><p className="lead">{brand}: {t.brandIntro}</p>{locale === 'tr' && <BrandServiceContent brand={brand}/>}<h2>{t.evaluation}</h2><p>{t.evaluationText}</p>{errorNote}{locale === 'tr' && <><h2>İlçeye göre {brand} klima servisi</h2><div className="grid">{allDistricts.map(value => <Link className="card" href={`/tr/antalya/${value.slug}/marka/${slugify(brand)}`} key={value.slug}><h3>{value.name} {brand} Klima Servisi</h3><p>{value.name} ilçesinde {brand} klima bakım, arıza tespiti, montaj ve tamir talebi.</p></Link>)}</div></>}<h2>{t.related}</h2><ServiceCards locale={locale}/></>}</> : <><p className="lead">{t.independent}</p>{brandCards()}</>;
  } else if (districtBrandRoute && district && brand) {
    content = <BrandDistrictServiceContent brand={brand} district={district}/>;
  } else if (section === 'antalya' && district && neighborhood) {
    content = <>{locale === 'tr' && !brand && <NeighborhoodServiceContent district={district.slug} slug={neighborhood.slug}/>}<p className="lead">{page.place}: {t.areaIntro}</p><h2>{t.evaluation}</h2><p>{t.evaluationText}</p><h2>{t.scope}</h2><p>{t.serviceTexts[0]}</p><p>{t.serviceTexts[1]}</p><p>{t.serviceTexts[3]}</p>{brand ? <>{process}{errorNote}<h2>{t.related}</h2><ServiceCards locale={locale}/></> : <><h2>{t.related}</h2><ServiceCards locale={locale}/><h2>{t.guides}</h2><div className="grid">{guides.map(value => <Link className="card" href={`/${locale}/rehber/${value.slug}`} key={value.slug}><h3>{value[locale].title}</h3><p>{value[locale].intro}</p></Link>)}</div><h2>{t.allBrands}</h2><p>{t.brandIntro}</p>{brandCards()}</>}</>;
  } else if (section === 'rehber') {
    content = guide ? <><p className="lead">{guide[locale].intro}</p><p className="review-date">{information[locale].review}: <time dateTime="2026-09-08">{new Date('2026-09-08T12:00:00Z').toLocaleDateString(locale)}</time></p><h2>{t.guidePoints}</h2><ul className="list">{guide[locale].points.map(point => <li key={point}>{point}</li>)}</ul><h2>{t.process}</h2><p>{t.requestText}</p></> : <><p className="lead">{t.guideIntro}</p><div className="grid">{guides.map(value => <Link className="card" href={`/${locale}/rehber/${value.slug}`} key={value.slug}><h3>{value[locale].title}</h3><p>{value[locale].intro}</p></Link>)}</div></>;
  } else if (legalPaths.includes(section)) {
    content = <>{legalParagraphs(locale, section).map(paragraph => <p key={paragraph}>{paragraph}</p>)}<address>{business.name}<br/>{business.displayAddress}</address><p><a href="tel:+902423440507">0242 344 05 07</a> · <a href="tel:+905382310734">0538 231 07 34</a></p></>;
  } else if (section === 'hakkimizda' || section === 'gizlilik') {
    content = <>{(section === 'hakkimizda' ? information[locale].aboutText : information[locale].privacyText).map(paragraph => <p key={paragraph}>{paragraph}</p>)}<address>{business.name}<br/>{business.displayAddress}</address></>;
  } else content = <><p className="lead">{information[locale].contactText}</p><h2>{business.name}</h2><address>{business.displayAddress}</address><p><a href="tel:+902423440507">0242 344 05 07</a> · <a href="tel:+905382310734">0538 231 07 34</a></p></>;
  if (locale === 'tr' && (section === 'hizmetler' || section === 'rehber')) content = <>{content}{section === 'hizmetler' && <><h2>İlçenize göre servis</h2><DistrictServiceLinks/></>}<p><Link className="btn" href="/tr/klima-ariza-kodlari">Markaya göre klima arıza kodları</Link></p></>;
  const url = base + '/' + locale + '/' + slug.join('/');
  const crumbs = [{ name: t.home, url: base + '/' + locale }];
  if (district) {
    crumbs.push({ name: t.areas, url: base + '/' + locale + '/ilceler' });
    if (section !== 'ilceler') crumbs.push({ name: district.name, url: base + '/' + locale + '/ilceler/' + district.slug });
  }
  if (section === 'markalar' && brand) crumbs.push({ name: t.brands, url: base + '/' + locale + '/markalar' });
  else if (districtBrandRoute && brand) crumbs.push({ name: brand, url: base + '/' + locale + '/markalar/' + slugify(brand) });
  if (section === 'hizmetler' && item) crumbs.push({ name: t.services, url: base + '/' + locale + '/hizmetler' });
  else if (guide) crumbs.push({ name: t.guides, url: base + '/' + locale + '/rehber' });
  else if (page.errorPage?.brand) crumbs.push({ name: 'Klima Arıza Kodları', url: base + '/tr/klima-ariza-kodlari' });
  crumbs.push({ name: page.title, url });
  const breadcrumbItems = crumbs.map((crumb, index) => ({ '@type': 'ListItem', position: index + 1, name: crumb.name, item: crumb.url }));
  const graph: Record<string, unknown>[] = [businessSchema, { '@type': 'BreadcrumbList', itemListElement: breadcrumbItems }];
  if (page.errorPage) graph.push({ '@type': 'CollectionPage', name: page.title, description: page.description, url, inLanguage: locale, dateModified: '2026-09-28', publisher: { '@id': base + '/#business' } });
  if (guide) graph.push({ '@type': 'Article', headline: guide[locale].title, description: guide[locale].intro, inLanguage: locale, mainEntityOfPage: url, author: { '@type': 'Organization', name: business.name, url: base + '/' + locale + '/hakkimizda' }, publisher: { '@id': base + '/#business' }, image: base + guideImage, dateModified: '2026-09-08' });
  if (serviceIndex >= 0 || isLanding || neighborhood || page.localPage?.kind === 'brand-service' || (section === 'antalya' && page.localPage?.kind === 'overview') || (section === 'ilceler' && district) || (section === 'markalar' && brand) || districtBrandRoute) graph.push({ '@type': 'Service', name: page.title, description: section === 'ilceler' && district ? locationSeo(locale, district).description : page.description, url, ...(district ? { areaServed: { '@type': 'AdministrativeArea', name: neighborhood ? `${neighborhood.name}, ${district.name}` : district.name, containedInPlace: { '@type': 'AdministrativeArea', name: 'Antalya' } } } : {}), provider: { '@id': base + '/#business' } });
  const structured = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  return <Layout locale={locale}><main id="main-content" className="article"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structured }}/><div className="wrap"><nav className="crumb" aria-label={{ tr: 'Sayfa yolu', en: 'Breadcrumb', de: 'Seitenpfad', ru: 'Навигационная цепочка' }[locale]}>{crumbs.map((crumb, index) => <span key={crumb.url}>{index > 0 && ' / '}{index === crumbs.length - 1 ? <span aria-current="page">{crumb.name}</span> : <Link href={crumb.url.replace(base, '')}>{crumb.name}</Link>}</span>)}</nav><h1>{page.title}</h1>{pageImage && pageImageAlt && <Image className="page-lead-image" src={pageImage} alt={pageImageAlt} width={1120} height={630} sizes="(max-width: 760px) calc(100vw - 32px), 1120px" loading="eager"/>}{!pageImage && overviewImage && overviewImageAlt && <Image className="page-lead-image" src={overviewImage} alt={overviewImageAlt} width={1120} height={630} sizes="(max-width: 760px) calc(100vw - 32px), 1120px" loading="eager"/>}{district && <DistrictLandmarkFeature locale={locale} district={district} />}{locale === 'tr' && !page.districtService && (district || brand || isLanding) && !(section === 'markalar' && brand) && !districtBrandRoute && !(district && neighborhood && !brand && featuredNeighborhood(district.slug, neighborhood.slug)) && <p>{pageEditorial({ brand, district: district?.name, neighborhood: neighborhood?.slug, neighborhoodName: neighborhood?.name })}</p>}{locale === 'tr' && brand && district && neighborhood && <p>{brandNeighborhoodNote(brand, district.name, neighborhood.name)}</p>}{content}{locale === 'tr' && section === 'markalar' && brand === 'Copa' && <p className="notice">Bu site ve copaservisi.com, Kaya Teknik tarafından işletilmektedir. Copa cihazlara yönelik hizmetlerimiz için Antalya Copa Servisi (copaservisi.com/tr/bolge/antalya/copa) sayfamızda bilgi bulunmaktadır.</p>}{(section === 'iletisim' || section === 'hakkimizda') && <OpeningHours locale={locale}/>} {(section === 'iletisim' || district || (section === 'markalar' && brand)) && <RequestPlanner key={[locale, ...slug, selectedNeighborhood?.name, selectedBrand].join('/')} locale={locale} initialDistrict={district?.name} initialNeighborhood={neighborhood?.name ?? selectedNeighborhood?.name} initialBrand={brand ?? selectedBrand}/>} {section !== 'gizlilik' && !legalPaths.includes(section) && <section className="pricing-note"><h2>{information[locale].pricing}</h2><p>{information[locale].pricingText}</p></section>}<p className="notice">{t.independent}</p><Cta locale={locale}/></div></main></Layout>;
}

