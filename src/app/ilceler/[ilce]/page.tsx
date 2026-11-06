import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactCta, Footer, Header } from '../../components';
import PageLeadImage from '../../components/PageLeadImage';
import { allDistricts, priorityDistricts } from '../../site-data';

export function generateStaticParams() { return allDistricts.map(district => ({ ilce: district.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ ilce: string }> }): Promise<Metadata> {
  const { ilce } = await params;
  const district = allDistricts.find(item => item.slug === ilce);
  if (!district) notFound();
  return { title: { absolute: `Klima Servisi ${district.name} | Size En Yakın Servis` }, description: `${district.name} klima servisi için arıza, bakım ve montaj bilgileri.` };
}

export default async function DistrictDetail({ params }: { params: Promise<{ ilce: string }> }) {
  const { ilce } = await params;
  const district = allDistricts.find(item => item.slug === ilce);
  if (!district) notFound();
  const priority = priorityDistricts.find(item => item.slug === ilce);
  return <><Header/><main className="article"><div className="wrap"><p className="crumb"><Link href="/">Ana Sayfa</Link> / <Link href="/ilceler">Hizmet Bölgeleri</Link> / {district.name}</p><h1>{district.name} klima servisi</h1><PageLeadImage src="/klima-salon-hero.webp" alt="Yaşam alanındaki duvar tipi klima iç ünitesi"/><p className="lead">Kaya Teknik, {district.name} için klima arıza, bakım, montaj ve gaz dolumu taleplerini randevu uygunluğuna göre değerlendirir.</p><h2>Mahalle kapsamı</h2><p>{priority ? priority.areas : `${district.name} içindeki mahalleler için ekip uygunluğu, cihaz bilgisi ve talebin niteliği görüşme sırasında teyit edilir.`}</p><h2>Talep oluştururken paylaşın</h2><ul className="list"><li>Klima marka ve modeli</li><li>Arıza veya hizmet ihtiyacınız</li><li>{district.name} içindeki mahalle ve açık adres bilgisi</li></ul><ContactCta/></div></main><Footer/></>;
}
