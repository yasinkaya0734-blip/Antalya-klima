import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ContactCta, Footer, Header } from '../../components';
import { services } from '../../site-data';

export function generateStaticParams() { return services.map(service => ({ hizmet: service.slug })); }

export default async function ServiceDetail({ params }: { params: Promise<{ hizmet: string }> }) {
  const { hizmet } = await params;
  const service = services.find(item => item.slug === hizmet);
  if (!service) notFound();
  return <><Header/><main className="article"><div className="wrap"><p className="crumb"><Link href="/">Ana Sayfa</Link> / <Link href="/hizmetler">Hizmetler</Link> / {service.title}</p><h1>{service.title}</h1><p className="lead">{service.text}</p><h2>Hizmet süreci</h2><ol className="list"><li>Cihazın marka/modeli, arıza belirtisi ve bulunduğunuz ilçe öğrenilir.</li><li>Uygunluk bilgisi verilerek randevu planı yapılır.</li><li>Yerinde inceleme sonrasında gerekli işlem ve ücret bilgisi paylaşılır.</li></ol><p className="notice">Uzaktan kesin arıza veya fiyat taahhüdü verilmez. Cihazın durumu yerinde inceleme ile değerlendirilir.</p><ContactCta/></div></main><Footer/></>;
}
