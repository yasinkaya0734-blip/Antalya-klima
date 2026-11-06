import Link from 'next/link';
import { Footer, Header } from '../components';
import PageLeadImage from '../components/PageLeadImage';
import { brands, slugify } from '../site-data';

export const metadata = { title: 'Klima Markaları | Bakım Onarım Hizmeti', description: 'Servis talebi değerlendirilen klima markaları.' };

export default function BrandsPage() {
  return <><Header/><main className="article"><div className="wrap"><p className="crumb"><Link href="/">Ana Sayfa</Link> / Markalar</p><h1>Servis verilen klima markaları</h1><PageLeadImage src="/klima-ariza-tamir.webp" alt="Klima arıza tespiti ve tamiri için iç ünite kontrolü"/><p className="lead">Marka ve model bilgisi, uygun servis sürecinin belirlenmesine yardımcı olur. Bu sayfalar bağımsız teknik servis hizmetini anlatır; üretici veya marka temsilciliği iddiası taşımaz.</p><div className="grid">{brands.map(brand => <Link className="card" href={`/markalar/${slugify(brand)}`} key={brand}><h3>{brand} Klima Servisi</h3><p>Arıza, bakım, montaj ve cihaz kontrolü için talep oluşturun.</p></Link>)}</div></div></main><Footer/></>;
}
