'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { copy, locales, type Locale } from '../i18n';

export default function LanguageSwitcher({ locale, fallbackPath }: { locale: Locale; fallbackPath?: string }) {
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
  const path = usePathname().replace(/^\/(tr|en|de|ru)(?=\/|$)/, '');
  const brandDistrict = path.match(/^\/antalya\/[^/]+\/marka\/([^/]+)$/);
  const translationPath = fallbackPath ?? (brandDistrict ? `/markalar/${brandDistrict[1]}` : undefined);
  const pathForLanguage = (language: Locale) => language === 'tr'
    ? path
    : translationPath ?? (path.startsWith('/klima-ariza-kodlari') ? '/rehber/klima-ariza-kodlari-nasil-kontrol-edilir' : path);
  return <nav className="language-bar" aria-label={copy[locale].language}><div className="wrap">{locales.map(language => <Link key={language} href={`/${language}${pathForLanguage(language)}`} hrefLang={language} lang={language} aria-current={language === locale ? 'page' : undefined}>{language.toUpperCase()}</Link>)}</div></nav>;
}
