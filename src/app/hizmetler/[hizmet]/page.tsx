import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ContactCta, Footer, Header } from '../../components';
import PageLeadImage from '../../components/PageLeadImage';
import { services } from '../../site-data';
import { information } from '../../site-content';

export function generateStaticParams() { return services.map(service => ({ hizmet: service.slug })); }

export default async function ServiceDetail({ params }: { params: Promise<{ hizmet: string }> }) {
  const { hizmet } = await params;
  const service = services.find(item => item.slug === hizmet);
  if (!service) notFound();
  const image = ['/klima-ariza-tamir.webp', '/klima-bakim.webp', '/klima-montaj.webp', '/klima-gaz-dolumu.webp', '/klima-parcalari-aksesuarlari.webp'][services.indexOf(service)];
  const details = information.tr.serviceDetails[services.indexOf(service)];
  return <><Header/><main className="article"><div className="wrap"><p className="crumb"><Link href="/">Ana Sayfa</Link> / <Link href="/hizmetler">Hizmetler</Link> / {service.title}</p><h1>{service.title}</h1><PageLeadImage src={image} alt={service.title}/><p className="lead">{service.text}</p>{details.map((paragraph, index) => <div key={paragraph}>{services.indexOf(service) === 3 && index === 2 && <h2>Klima gazı nasıl doldurulur? Vakumlama neden şart?</h2>}<p>{paragraph}</p></div>)}<h2>Hizmet süreci</h2><ol className="list"><li>Cihazın marka/modeli, arıza belirtisi ve bulunduğunuz ilçe öğrenilir.</li><li>Uygunluk bilgisi verilerek randevu planı yapılır.</li><li>Yerinde inceleme sonrasında gerekli işlem ve ücret bilgisi paylaşılır.</li></ol><p className="notice">Uzaktan kesin arıza veya fiyat taahhüdü verilmez. Cihazın durumu yerinde inceleme ile değerlendirilir.</p><ContactCta/></div></main><Footer/></>;
}
