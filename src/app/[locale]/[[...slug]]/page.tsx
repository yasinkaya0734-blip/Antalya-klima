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
import DistrictLandmarkCard, { LandmarkIntro } from '../../components/DistrictLandmarkCard';
import MobileCallNotice from '../../components/MobileCallNotice';
import OpeningHours from '../../components/OpeningHours';
import RequestPlanner from '../../components/RequestPlanner';
import QuickTools from '../../components/QuickTools';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import LegalFooter from '../../components/LegalFooter';
import { pageEditorial, brandNeighborhoodNote } from '../../turkish-editorial';
import { featuredNeighborhood, neighborhoodSeo } from '../../featured-neighborhoods';
import { BrandServiceContent, FeaturedAreaLinks, NeighborhoodServiceContent } from '../../components/LocalServiceContent';

const base = 'https://www.antalyaklimaservisi.tr';
const landingSlugs = ['klima-ariza-servisi', 'klima-bakim-servisi', 'klima-montaj-servisi', 'klima-tamir-servisi'];
const images = ['/klima-ariza-tamir.png', '/klima-bakim.png', '/klima-montaj.png', '/klima-gaz-dolumu.png', '/klima-parcalari-aksesuarlari.png'];
type Props = { params: Promise<{ locale: string; slug?: string[] }>; searchParams: Promise<{ mahalle?: string; marka?: string }> };

// Keep existing URLs; headings and content are translated independently of slugs.
async function resolvePage(locale: Locale, slug: string[]) {
  const t = copy[locale];
  const districtService = getDistrictService(locale, slug);
  const errorPage = resolveErrorPage(locale, slug);
  const [section, item] = slug;
  const neighborhoods = section === 'antalya' || section === 'ilceler' ? await getAntalyaNeighborhoods() : [];
  const district = allDistricts.find(value => value.slug === item);
  const neighborhood = neighborhoods.find(value => value.district === item && value.slug === slug[2]);
  const brand = brands.find(value => slugify(value) === (section === 'markalar' ? item : slug[3]?.replace(/-klima-servisi$/, '')));
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
  else if (isLanding) { title = `${t.landingTitles[landingIndex]} — ${place}`; description = t.serviceTexts[landingIndex === 3 ? 0 : landingIndex]; }
  else if (slug.length === 1 && Object.hasOwn(sectionTitles, section)) { title = sectionTitles[section]; if (legalPaths.includes(section)) description = legalParagraphs(locale, section)[0]; if (section === 'rehber') description = t.guideIntro; if (section === 'hakkimizda') description = information[locale].aboutText[0]; if (section === 'gizlilik') description = information[locale].privacyText[0]; if (section === 'iletisim') description = business.displayAddress + '. ' + information[locale].contactText; }
  else if (section === 'hizmetler' && slug.length === 2 && serviceIndex >= 0) { title = `${t.serviceTitles[serviceIndex]} — Antalya`; description = t.serviceTexts[serviceIndex]; }
  else if (section === 'ilceler' && slug.length === 2 && district) { title = areaTitle(locale, place); description = `${district.name}: ${t.areaIntro}`; }
  else if (section === 'markalar' && slug.length === 2 && brand) { title = areaTitle(locale, place); description = `${brand}: ${t.brandIntro}`; }
  else if (section === 'rehber' && slug.length === 2 && guide) { title = guide[locale].title; description = guide[locale].intro; }
  else if (section === 'antalya' && district && neighborhood && (slug.length === 3 || (slug.length === 4 && brand && slug[3].endsWith('-klima-servisi')))) { title = areaTitle(locale, place); description = `${place}: ${t.areaIntro}`; }
  else notFound();
  if (locale === 'tr' && section === 'markalar' && brand && !isLanding) {
    title = `Antalya ${brand} Klima Servisi`;
    description = `Antalya ${brand} klima bakım, tamir ve montajı için bağımsız özel servis Kaya Teknik. ${pageEditorial({ brand })}`;
  }
  if (locale === 'tr' && district && neighborhood && !brand && !isLanding) {
    const seo = neighborhoodSeo(district.slug, neighborhood.slug);
    if (seo) { title = `${neighborhood.name} Klima Servisi — ${district.name}`; description = seo.description; }
  }
  return { districtService, errorPage, section, item, neighborhoods, district, neighborhood, brand, serviceIndex, guide, landingIndex, isLanding, place, title, description };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug = [] } = await params;
  if (!isLocale(locale)) notFound();
  const page = await resolvePage(locale, slug);
  const path = slug.length ? `/${slug.join('/')}` : '';
  const isCombination = (page.isLanding && !page.districtService) || (page.section === 'antalya' && Boolean(page.brand)) || (page.errorPage && !page.errorPage.indexable);
  const languages = page.errorPage || page.districtService ? { tr: `/tr${path}`, 'x-default': `/tr${path}` } : Object.fromEntries([...locales.map(language => [language, `/${language}${path}`]), ['x-default', `/tr${path}`]]);
  const location = !page.section || (page.section === 'ilceler' && page.district) ? locationSeo(locale, page.district) : locale === 'tr' && page.district && page.neighborhood && !page.brand && !page.isLanding ? neighborhoodSeo(page.district.slug, page.neighborhood.slug) : undefined;
  const ogLocales = { tr: 'tr_TR', en: 'en_GB', de: 'de_DE', ru: 'ru_RU' };
  return {
    title: { absolute: location?.title ?? `${page.title} | ${copy[locale].brand}` }, description: location?.description ?? page.description,
    robots: isCombination ? { index: false, follow: true } : { index: true, follow: true, googleBot: { 'max-image-preview': 'large' } },
    alternates: { canonical: `/${locale}${path}`, languages },
    openGraph: { title: location?.title ?? page.title, description: location?.description ?? page.description, url: `/${locale}${path}`, images: [{ url: '/klima-salon-hero.png', alt: copy[locale].sub }], locale: ogLocales[locale], alternateLocale: page.errorPage || page.districtService ? [] : locales.filter(value => value !== locale).map(value => ogLocales[value]) },
  };
}

function Cta({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return <section className="cta"><h2>{t.request}</h2><MobileCallNotice locale={locale}/><p>{t.requestText}</p><div className="actions"><a className="btn primary" href="tel:+902423440507">{t.call}: 0242 344 05 07</a><a className="btn" href="tel:+905382310734">{t.mobile}: +90 538 231 07 34</a><a className="btn" href={`https://wa.me/905382310734?text=${encodeURIComponent(`${t.whatsappIntro} ${t.sub}`)}`} target="_blank" rel="noreferrer">{t.whatsapp}</a></div></section>;
}

function Layout({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = copy[locale];
  return <><a className="skip-link" href="#main-content">{information[locale].skip}</a><div className="top"><div className="wrap"><span>{t.sub}</span><span>☎ 0242 344 05 07</span></div></div><header className="header"><LanguageSwitcher locale={locale}/><div className="wrap"><Link className="brand brand-logo" href={`/${locale}`} aria-label={t.sub}><span className="brand-mark"><Image src="/antalyaklimaservisi-logo.png" alt="Kaya Teknik" width={112} height={112} sizes="112px"/></span><span className="brand-site-name">{t.sub}</span></Link><nav className="nav">{[['hizmetler', t.services], ['ilceler', t.areas], ['markalar', t.brands], ['rehber', t.guides], ...(locale === 'tr' ? [['klima-ariza-kodlari', 'Arıza Kodları']] : []), ['iletisim', t.contact]].map(([path, label]) => <Link href={`/${locale}/${path}`} key={path}>{label}</Link>)}</nav></div></header>{children}<QuickTools locale={locale}/><footer className="footer"><div className="wrap"><strong>{t.brand}</strong><p>{t.sub}</p><p>☎ 0242 344 05 07 · WhatsApp: +90 538 231 07 34</p><p>{t.independent}</p><address>{business.displayAddress}</address><nav className="footer-links"><Link href={`/${locale}/hakkimizda`}>{information[locale].about}</Link><Link href={`/${locale}/gizlilik-politikasi`}>{information[locale].privacy}</Link><Link href={`/${locale}/iletisim`}>{t.contact}</Link></nav><LegalFooter locale={locale}/></div></footer></>;
}

function ServiceCards({ locale, withImages = false }: { locale: Locale; withImages?: boolean }) {
  const t = copy[locale];
  return <div className="grid">{services.map((service, index) => <Link className={`card${withImages ? ' image-card' : ''}`} href={`/${locale}/hizmetler/${service.slug}`} key={service.slug}>{withImages && <Image src={images[index]} alt={t.serviceTitles[index]} width={768} height={432} sizes="(max-width: 760px) 100vw, 360px"/>}<h3>{t.serviceTitles[index]}</h3><p>{t.serviceTexts[index]}</p></Link>)}</div>;
}

function DistrictCards({ locale, priority = false, withLandmarks = false, other = false }: { locale: Locale; priority?: boolean; withLandmarks?: boolean; other?: boolean }) {
  const t = copy[locale];
  return <div className="grid">{(priority ? priorityDistricts : other ? allDistricts.filter(district => !priorityDistricts.some(value => value.slug === district.slug)) : allDistricts).map(district => withLandmarks ? <DistrictLandmarkCard key={district.slug} locale={locale} district={district}/> : <Link className="card" href={`/${locale}/ilceler/${district.slug}`} key={district.slug}><h3>{areaTitle(locale, `Antalya ${district.name}`)}</h3><p>{t.areaIntro}</p></Link>)}</div>;
}

function Faq({ locale, parts = false }: { locale: Locale; parts?: boolean }) {
  const t = copy[locale];
  return <section className="faq"><h2>{t.faq}</h2>{(parts ? t.partsFaq : t.faqItems).map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>;
}

export default async function LocalizedPage({ params, searchParams }: Props) {
  const { locale, slug = [] } = await params;
  if (!isLocale(locale)) notFound();
  const t = copy[locale];
  const page = await resolvePage(locale, slug);
  const { section, item, district, neighborhood, brand, serviceIndex, guide, isLanding, landingIndex } = page;
  const guideImage = guide ? ['/klima-bakim.png', '/klima-ariza-tamir.png', '/klima-ariza-tamir.png', '/klima-montaj.png', '/klima-ariza-kodlari-rehberi.png'][guides.findIndex(value => value.slug === guide.slug)] : undefined;
  const query = await searchParams;
  const selectedNeighborhood = page.neighborhoods.find(value => value.district === district?.slug && value.name === query.mahalle);
  const selectedBrand = brands.includes(query.marka ?? '') ? query.marka : undefined;
  if (!section) {
    const structuredData = { '@context': 'https://schema.org', '@graph': [{ '@type': 'WebSite', name: t.brand, url: `${base}/${locale}`, inLanguage: locale }, businessSchema] };
    return <Layout locale={locale}><main id="main-content"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}/><section className="hero hero-image"><Image className="hero-photo" src="/klima-salon-hero.png" alt="" fill sizes="100vw" preload/><div className="wrap"><div className="eyebrow">{t.brand}</div><h1>{t.hero}</h1><p>{t.intro}</p><div className="actions"><a className="btn primary" href="tel:+902423440507">{t.call}: 0242 344 05 07</a><a className="btn" href={`https://wa.me/905382310734?text=${encodeURIComponent(`${t.whatsappIntro} ${t.sub}`)}`} target="_blank" rel="noreferrer">{t.whatsapp}</a></div></div></section><section className="section"><div className="wrap"><h2>{t.services}</h2><ServiceCards locale={locale} withImages/></div></section><section className="section tint"><div className="wrap"><h2>{t.priority}</h2><DistrictCards locale={locale} priority/>{locale === 'tr' && <><h2>İlçenize özel arıza ve bakım servisi</h2><DistrictServiceLinks/></>}</div></section><section className="section"><div className="wrap"><h2>{t.process}</h2><ol className="service-checklist">{t.steps.map(step => <li key={step}>{step}</li>)}</ol><p>{t.availability}</p><Link className="btn" href={`/${locale}/hakkimizda`}>{information[locale].about}</Link><Faq locale={locale}/></div></section><section className="section tint"><div className="wrap"><h2>{t.guides}</h2><p className="lead">{t.guideIntro}</p><div className="grid">{guides.map(value => <Link className="card" href={`/${locale}/rehber/${value.slug}`} key={value.slug}><h3>{value[locale].title}</h3><p>{value[locale].intro}</p></Link>)}</div></div></section><section className="section"><div className="wrap"><Cta locale={locale}/></div></section></main></Layout>;
  }

  // Link to indexable brand hubs rather than multiplying noindex neighborhood/brand URLs.
  // Existing combination pages remain available to direct visitors and the request tools.
  const brandCards = () => <div className="grid brand-service-grid">{brands.map(value => <Link className="card" href={`/${locale}/markalar/${slugify(value)}`} key={value}><h3>{areaTitle(locale, `${value} Antalya`)}</h3><p>{t.brandIntro}</p></Link>)}</div>;
  const errorNote = <><h2>{t.errorHeading}</h2><p>{t.errorNote}</p><p><Link className="btn" href={locale === 'tr' ? `/tr/klima-ariza-kodlari${brand ? '/' + slugify(brand) : ''}` : `/${locale}/rehber/klima-ariza-kodlari-nasil-kontrol-edilir`}>{locale === 'tr' ? `${brand ? brand + ' ' : ''}Klima arıza kodları` : t.errorGuide}</Link></p></>;
  const process = <><h2>{t.process}</h2><ol className="list">{t.steps.map(step => <li key={step}>{step}</li>)}</ol><p>{t.availability}</p></>;
  let content: React.ReactNode;
  if (page.districtService) {
    content = <DistrictServiceContent page={page.districtService}/>;
  } else if (page.errorPage) {
    content = <ErrorCodeContent brand={page.errorPage.brand}/>;
  } else if (isLanding) {
    const relatedIndex = landingIndex === 3 ? 0 : landingIndex;
    const related = neighborhood ? brands.slice(0, 8).map(value => ({ name: value, path: `markalar/${slugify(value)}` })) : district ? page.neighborhoods.filter(value => value.district === district.slug).map(value => ({ name: `${district.name} ${value.name}`, path: `antalya/${district.slug}/${value.slug}` })) : priorityDistricts.map(value => ({ name: value.name, path: `antalya/${value.slug}` }));
    content = <><p className="lead">{page.place}: {t.serviceTexts[relatedIndex]}</p><h2>{t.scope}</h2><p>{t.evaluationText}</p>{process}<h2>{t.areas}</h2><div className="grid">{related.map(value => <Link className="card" href={`/${locale}/${value.path}/hizmetler/${landingSlugs[landingIndex]}`} key={value.path}><h3>{t.landingTitles[landingIndex]} — {value.name}</h3><p>{t.serviceTexts[relatedIndex]}</p></Link>)}</div><Faq locale={locale}/></>;
  } else if (section === 'hizmetler') {
    const parts = serviceIndex === 4;
    content = item ? <><p className="lead">{t.serviceTexts[serviceIndex]}</p>{information[locale].serviceDetails[serviceIndex].map(paragraph => <p key={paragraph}>{paragraph}</p>)}{parts ? <><Image className="guide-feature-image" src={images[4]} alt={t.serviceTitles[4]} width={920} height={518} sizes="(max-width: 760px) 100vw, 920px"/><h2>{t.partsHeading}</h2><p>{t.partsText}</p><h2>{t.retailHeading}</h2><p>{t.retailText}</p><p className="notice">{t.partsNotice}</p></> : <><h2>{t.scope}</h2><p>{t.evaluationText}</p>{errorNote}</>}{process}<Faq locale={locale} parts={parts}/></> : <><p className="lead">{t.intro}</p><ServiceCards locale={locale}/><h2>{t.allBrands}</h2>{brandCards()}</>;
  } else if (section === 'ilceler') {
    content = district ? <><p className="lead">{locationSeo(locale, district).description}</p>{(selectedNeighborhood || selectedBrand) && <p>{[selectedNeighborhood?.name, selectedBrand].filter(Boolean).join(' · ')}</p>}<h2>{t.evaluation}</h2><p>{t.evaluationText}</p><h2>{t.services}</h2>{locale === 'tr' && <DistrictServiceLinks district={district.slug}/>}<ServiceCards locale={locale}/>{locale === 'tr' && <FeaturedAreaLinks district={district.slug}/>}<h2>{t.neighborhoodHeading}</h2><p>{t.neighborhoodIntro}</p><div className="grid">{page.neighborhoods.filter(value => value.district === district.slug).map(value => <Link className="card" href={`/${locale}/antalya/${district.slug}/${value.slug}`} key={value.slug}><h3>{areaTitle(locale, `${district.name} ${value.name}`)}</h3><p>{t.areaIntro}</p></Link>)}</div>{errorNote}</> : <><p className="lead">{t.intro}</p><LandmarkIntro locale={locale}/><h2>{t.priority}</h2><DistrictCards locale={locale} priority withLandmarks/><h2>{t.moreAreas}</h2><DistrictCards locale={locale} other withLandmarks/></>;
  } else if (section === 'markalar') {
    content = brand ? <><p className="lead">{brand}: {t.brandIntro}</p>{locale === 'tr' && <BrandServiceContent brand={brand}/>}<h2>{t.evaluation}</h2><p>{t.evaluationText}</p>{errorNote}<h2>{t.priority}</h2><DistrictCards locale={locale} priority/><h2>{t.related}</h2><ServiceCards locale={locale}/></> : <><p className="lead">{t.independent}</p>{brandCards()}</>;
  } else if (section === 'antalya' && district && neighborhood) {
    content = <>{locale === 'tr' && !brand && <NeighborhoodServiceContent district={district.slug} slug={neighborhood.slug}/>}<p className="lead">{page.place}: {t.areaIntro}</p><h2>{t.evaluation}</h2><p>{t.evaluationText}</p><h2>{t.scope}</h2><p>{t.serviceTexts[0]}</p><p>{t.serviceTexts[1]}</p><p>{t.serviceTexts[3]}</p>{brand ? <>{process}{errorNote}<h2>{t.related}</h2><ServiceCards locale={locale}/></> : <><h2>{t.related}</h2><ServiceCards locale={locale}/><h2>{t.guides}</h2><div className="grid">{guides.map(value => <Link className="card" href={`/${locale}/rehber/${value.slug}`} key={value.slug}><h3>{value[locale].title}</h3><p>{value[locale].intro}</p></Link>)}</div><h2>{t.allBrands}</h2><p>{t.brandIntro}</p>{brandCards()}</>}</>;
  } else if (section === 'rehber') {
    content = guide ? <><p className="lead">{guide[locale].intro}</p>{guideImage && <Image className="guide-feature-image" src={guideImage} alt={guide[locale].title} width={920} height={518} sizes="(max-width: 760px) 100vw, 920px"/>}<p className="review-date">{information[locale].review}: <time dateTime="2026-09-08">{new Date('2026-09-08T12:00:00Z').toLocaleDateString(locale)}</time></p><h2>{t.guidePoints}</h2><ul className="list">{guide[locale].points.map(point => <li key={point}>{point}</li>)}</ul><h2>{t.process}</h2><p>{t.requestText}</p></> : <><p className="lead">{t.guideIntro}</p><div className="grid">{guides.map(value => <Link className="card" href={`/${locale}/rehber/${value.slug}`} key={value.slug}><h3>{value[locale].title}</h3><p>{value[locale].intro}</p></Link>)}</div></>;
  } else if (legalPaths.includes(section)) {
    content = <>{legalParagraphs(locale, section).map(paragraph => <p key={paragraph}>{paragraph}</p>)}<address>{business.name}<br/>{business.displayAddress}</address><p><a href="tel:+902423440507">0242 344 05 07</a> · <a href="tel:+905382310734">0538 231 07 34</a></p></>;
  } else if (section === 'hakkimizda' || section === 'gizlilik') {
    content = <>{(section === 'hakkimizda' ? information[locale].aboutText : information[locale].privacyText).map(paragraph => <p key={paragraph}>{paragraph}</p>)}<address>{business.name}<br/>{business.displayAddress}</address></>;
  } else content = <><p className="lead">{information[locale].contactText}</p><h2>{business.name}</h2><address>{business.displayAddress}</address><p><a className="btn primary" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.displayAddress)}`} target="_blank" rel="noopener noreferrer">{{tr: 'Haritada göster', en: 'View on map', de: 'Auf der Karte anzeigen', ru: 'Показать на карте'}[locale]}</a></p><p><a href="tel:+902423440507">0242 344 05 07</a> · <a href="tel:+905382310734">0538 231 07 34</a></p></>;
  if (locale === 'tr' && (section === 'hizmetler' || section === 'rehber')) content = <>{content}{section === 'hizmetler' && <><h2>İlçenize göre servis</h2><DistrictServiceLinks/></>}<p><Link className="btn" href="/tr/klima-ariza-kodlari">Markaya göre klima arıza kodları</Link></p></>;
  const url = base + '/' + locale + '/' + slug.join('/');
  const breadcrumbItems = [{ '@type': 'ListItem', position: 1, name: t.home, item: base + '/' + locale }, ...(district && section !== 'ilceler' ? [{ '@type': 'ListItem', position: 2, name: district.name, item: base + '/' + locale + '/ilceler/' + district.slug }] : []), { '@type': 'ListItem', position: district && section !== 'ilceler' ? 3 : 2, name: page.title, item: url }];
  const graph: Record<string, unknown>[] = [businessSchema, { '@type': 'BreadcrumbList', itemListElement: breadcrumbItems }];
  if (page.errorPage) graph.push({ '@type': 'CollectionPage', name: page.title, description: page.description, url, inLanguage: 'tr', dateModified: '2026-09-28', publisher: { '@id': base + '/#business' } });
  if (guide) graph.push({ '@type': 'Article', headline: guide[locale].title, description: guide[locale].intro, inLanguage: locale, mainEntityOfPage: url, author: { '@type': 'Organization', name: business.name, url: base + '/' + locale + '/hakkimizda' }, publisher: { '@id': base + '/#business' }, image: base + guideImage, dateModified: '2026-09-08' });
  if (serviceIndex >= 0 || isLanding || neighborhood || (section === 'ilceler' && district) || (section === 'markalar' && brand)) graph.push({ '@type': 'Service', name: page.title, description: section === 'ilceler' && district ? locationSeo(locale, district).description : page.description, url, ...(district ? { areaServed: { '@type': 'AdministrativeArea', name: neighborhood ? `${neighborhood.name}, ${district.name}` : district.name, containedInPlace: { '@type': 'AdministrativeArea', name: 'Antalya' } } } : {}), provider: { '@id': base + '/#business' } });
  const structured = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  return <Layout locale={locale}><main id="main-content" className="article"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structured }}/><div className="wrap"><p className="crumb"><Link href={`/${locale}`}>{t.home}</Link> / {district && section !== 'ilceler' && <><Link href={`/${locale}/ilceler/${district.slug}`}>{district.name}</Link> / </>}{page.title}</p><h1>{page.title}</h1>{locale === 'tr' && !page.districtService && (district || brand || isLanding) && !(section === 'markalar' && brand) && !(district && neighborhood && !brand && featuredNeighborhood(district.slug, neighborhood.slug)) && <p>{pageEditorial({ brand, district: district?.name, neighborhood: neighborhood?.slug, neighborhoodName: neighborhood?.name })}</p>}{locale === 'tr' && brand && district && neighborhood && <p>{brandNeighborhoodNote(brand, district.name, neighborhood.name)}</p>}{content}{locale === 'tr' && section === 'markalar' && brand === 'Copa' && <p className="notice">Bu site ve copaservisi.com, Kaya Teknik tarafından işletilmektedir. Copa cihazlara yönelik hizmetlerimiz için <a href="https://copaservisi.com/tr/bolge/antalya/copa" style={{ textDecoration: 'underline' }}>Antalya Copa Servisi</a> sayfamızı inceleyebilirsiniz.</p>}{(section === 'iletisim' || section === 'hakkimizda') && <OpeningHours locale={locale}/>} {(section === 'iletisim' || district || (section === 'markalar' && brand)) && <RequestPlanner key={[locale, ...slug, selectedNeighborhood?.name, selectedBrand].join('/')} locale={locale} initialDistrict={district?.name} initialNeighborhood={neighborhood?.name ?? selectedNeighborhood?.name} initialBrand={brand ?? selectedBrand}/>} {section !== 'gizlilik' && !legalPaths.includes(section) && <section className="pricing-note"><h2>{information[locale].pricing}</h2><p>{information[locale].pricingText}</p></section>}<p className="notice">{t.independent}</p><Cta locale={locale}/></div></main></Layout>;
}
