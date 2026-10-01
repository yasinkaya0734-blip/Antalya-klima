import Link from 'next/link';
import { phone, whatsapp } from './site-data';

export function Header() {
  return <><div className="top"><div className="wrap"><span>Kaya Teknik · Antalya Klima Hizmetleri</span><span>☎ {phone}</span></div></div><header className="header"><div className="wrap"><Link className="brand" href="/">KAYA TEKNİK<small>Antalya Klima Servisi</small></Link><nav className="nav"><Link href="/hizmetler">Hizmetler</Link><Link href="/ilceler">Hizmet Bölgeleri</Link><Link href="/markalar">Markalar</Link><Link href="/iletisim">İletişim</Link></nav></div></header></>;
}

export function ContactCta() {
  return <section className="cta"><h2>Klima servis talebiniz mi var?</h2><p>Arızayı, cihaz markasını ve bulunduğunuz ilçeyi paylaşın; uygun hizmet süreci için size dönüş yapalım.</p><div className="actions"><a className="btn primary" href={`tel:${phone.replace(/\s/g, '')}`}>Hemen Ara: {phone}</a><a className="btn" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp’tan Yaz</a></div></section>;
}

export function Footer() {
  return <footer className="footer"><div className="wrap"><strong>Kaya Teknik</strong><p>Antalya klima arıza, bakım, montaj ve servis hizmetleri.</p><p>☎ {phone} · WhatsApp: 0538 231 07 34</p><p>Hizmet kapsamı, randevu uygunluğu ve işlem detayları cihaz bilgisine göre teyit edilir.</p></div></footer>;
}
