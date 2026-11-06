import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const legacyRoots = ['/klima-ariza-kodlari', '/hizmetler', '/ilceler', '/markalar', '/iletisim', '/rehber', '/hakkimizda', '/gizlilik', '/kvkk', '/gizlilik-politikasi', '/kullanim-kosullari'];

function canonicalSlug(value: string) {
  return decodeURIComponent(value).toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u')
    .replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c');
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get('host')?.split(':')[0];
  let targetPath = pathname;
  if (pathname === '/') targetPath = '/tr';
  else if (legacyRoots.some(root => pathname === root || pathname.startsWith(root + '/'))) targetPath = '/tr' + pathname;
  targetPath = targetPath.replace(/^\/(tr|en|de|ru)\/gizlilik\/?$/, '/$1/gizlilik-politikasi');
  targetPath = targetPath.replace(/^(\/(?:tr|en|de|ru)\/antalya\/kepez\/)yeni-mahalle(?=\/|$)/, '$1yeni');
  targetPath = targetPath.replace(/^\/tr\/markalar\/([^/]+)\/([^/]+)$/, '/tr/antalya/$2/marka/$1');
  const districtPath = targetPath.match(/^(\/(?:tr|en|de|ru)\/antalya\/)([^/]+)(.*)$/i);
  if (districtPath) {
    try {
      const normalizedDistrict = canonicalSlug(districtPath[2]);
      if (normalizedDistrict !== districtPath[2]) targetPath = `${districtPath[1]}${normalizedDistrict}${districtPath[3]}`;
    } catch {
      // Leave malformed percent-encoded paths for Next.js to reject normally.
    }
  }
  if (host === 'antalyaklimaservisi.tr' || targetPath !== pathname) {
    const url = request.nextUrl.clone();
    if (host === 'antalyaklimaservisi.tr') {
      url.protocol = 'https:';
      url.hostname = 'www.antalyaklimaservisi.tr';
    }
    url.pathname = targetPath;
    return NextResponse.redirect(url, 308);
  }
  const requestHeaders = new Headers(request.headers);
  const language = pathname.split('/')[1];
  requestHeaders.set('x-site-locale', ['tr', 'en', 'de', 'ru'].includes(language) ? language : 'tr');
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = { matcher: ['/((?!_next/static|_next/image).*)'] };
