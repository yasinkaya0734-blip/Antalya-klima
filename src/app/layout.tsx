import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { isLocale } from './i18n';
import './globals.css';
import './enhanced.css';
import './service-guides.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.antalyaklimaservisi.tr'),
  title: { default: 'Kaya Teknik | Antalya Klima Servisi', template: '%s | Kaya Teknik' },
  description: 'Antalya’da klima arıza, bakım, montaj ve gaz dolumu hizmetleri. Kaya Teknik’e telefon veya WhatsApp ile ulaşın.',
  alternates: { canonical: '/' },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const value = (await headers()).get('x-site-locale') ?? 'tr';
  const locale = isLocale(value) ? value : 'tr';
  return <html lang={locale}><body>{children}</body></html>;
}
