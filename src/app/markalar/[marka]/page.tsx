import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactCta, Footer, Header } from '../../components';
import PageLeadImage from '../../components/PageLeadImage';
import { brands, slugify } from '../../site-data';

export function generateStaticParams() { return brands.map(brand => ({ marka: slugify(brand) })); }

export async function generateMetadata({ params }: { params: Promise<{ marka: string }> }): Promise<Metadata> {
  const { marka } = await params;
  const brand = brands.find(item => slugify(item) === marka);
  if (!brand) notFound();
  return { title: { absolute: `${brand} Servisi | 7/24 Klima Servis` }, description: `${brand} klima servisi için arıza, bakım ve montaj bilgileri.` };
}

export default async function BrandDetail({ params }: { params: Promise<{ marka: string }> }) {
  const { marka } = await params;
  const brand = brands.find(item => slugify(item) === marka);
  if (!brand) notFound();
  return <><Header/><main className="article"><div className="wrap"><p className="crumb"><Link href="/">Ana Sayfa</Link> / <Link href="/markalar">Markalar</Link> / {brand}</p><h1>{brand} klima servisi</h1><PageLeadImage src="/klima-ariza-tamir.webp" alt="Klima arıza tespiti için dış üniteyi kontrol eden teknisyen"/><p className="lead">{brand} klima cihazınız için arıza, bakım, montaj veya gaz dolumu talebinizi cihaz modeli ve arıza bilgisiyle iletebilirsiniz.</p><h2>Doğru değerlendirme için</h2><ul className="list"><li>İç ve dış ünite üzerindeki model bilgisi</li><li>Cihazın gösterdiği hata, ses, koku veya performans sorunu</li><li>Hizmet talep edilen Antalya ilçesi</li></ul><p className="notice">Kaya Teknik bağımsız teknik servis hizmeti sunar. Marka adına üretici, distribütör veya temsilcilik iddiasında bulunmaz.</p><ContactCta/></div></main><Footer/></>;
}
