'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { copy, locales, type Locale } from '../i18n';

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
  const path = usePathname().replace(/^\/(tr|en|de|ru)(?=\/|$)/, '');
  return <nav className="language-bar" aria-label={copy[locale].language}><div className="wrap">{locales.map(language => <Link key={language} href={`/${language}${path.startsWith('/klima-ariza-kodlari') && language !== 'tr' ? '/rehber/klima-ariza-kodlari-nasil-kontrol-edilir' : path}`} hrefLang={language} lang={language} aria-current={language === locale ? 'page' : undefined}>{language.toUpperCase()}</Link>)}</div></nav>;
}
