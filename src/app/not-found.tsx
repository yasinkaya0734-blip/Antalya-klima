import Link from 'next/link';
import { headers } from 'next/headers';
import { copy, isLocale } from './i18n';
import { information } from './site-content';

export default async function NotFound() {
  const raw = (await headers()).get('x-site-locale') ?? 'tr';
  const locale = isLocale(raw) ? raw : 'tr';
  return <main id="main-content" className="article"><div className="wrap"><p>404</p><h1>{information[locale].notFound}</h1><p>{information[locale].notFoundText}</p><Link className="btn primary" href={`/${locale}`}>{copy[locale].home}</Link></div></main>;
}
