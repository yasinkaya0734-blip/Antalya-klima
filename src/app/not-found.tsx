import Link from 'next/link';
import { headers } from 'next/headers';
import { copy, isLocale } from './i18n';
import { information } from './site-content';

export default async function NotFound() {
  const raw = (await headers()).get('x-site-locale') ?? 'tr';
  const locale = isLocale(raw) ? raw : 'tr';
  return <main id="main-content" className="article"><div className="wrap"><p>404</p><h1>{information[locale].notFound}</h1><p>{information[locale].notFoundText}</p><Link className="btn primary" href={`/${locale}`}>{copy[locale].home}</Link><div className="actions"><a className="btn" href="tel:+902423440507">{copy[locale].call}: 0242 344 05 07</a><a className="btn" href="https://wa.me/905382310734" target="_blank" rel="noopener noreferrer">{copy[locale].whatsapp}</a></div></div></main>;
}
