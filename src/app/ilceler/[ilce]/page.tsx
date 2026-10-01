import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ContactCta, Footer, Header } from '../../components';
import { allDistricts, priorityDistricts } from '../../site-data';

export function generateStaticParams() { return allDistricts.map(district => ({ ilce: district.slug })); }

export default async function DistrictDetail({ params }: { params: Promise<{ ilce: string }> }) {
  const { ilce } = await params;
  const district = allDistricts.find(item => item.slug === ilce);
  if (!district) notFound();
  const priority = priorityDistricts.find(item => item.slug === ilce);
  return <><Header/><main className="article"><div className="wrap"><p className="crumb"><Link href="/">Ana Sayfa</Link> / <Link href="/ilceler">Hizmet Bölgeleri</Link> / {district.name}</p><h1>{district.name} klima servisi</h1><p className="lead">Kaya Teknik, {district.name} için klima arıza, bakım, montaj ve gaz dolumu taleplerini randevu uygunluğuna göre değerlendirir.</p><h2>Mahalle kapsamı</h2><p>{priority ? priority.areas : `${district.name} içindeki mahalleler için ekip uygunluğu, cihaz bilgisi ve talebin niteliği görüşme sırasında teyit edilir.`}</p><h2>Talep oluştururken paylaşın</h2><ul className="list"><li>Klima marka ve modeli</li><li>Arıza veya hizmet ihtiyacınız</li><li>{district.name} içindeki mahalle ve açık adres bilgisi</li></ul><ContactCta/></div></main><Footer/></>;
}
