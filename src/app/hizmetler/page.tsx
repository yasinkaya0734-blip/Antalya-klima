import Link from 'next/link';
import { Footer, Header } from '../components';
import { services } from '../site-data';

export const metadata = { title: 'Klima Hizmetleri', description: 'Antalya klima arıza, bakım, montaj ve gaz dolumu hizmetleri.' };

export default function ServicesPage() {
  return <><Header/><main className="article"><div className="wrap"><p className="crumb"><Link href="/">Ana Sayfa</Link> / Hizmetler</p><h1>Antalya klima hizmetleri</h1><p className="lead">İşlem öncesinde cihazın marka/modeli ve mevcut sorunu değerlendirilir. Yapılacak işlem, şartlar ve fiyatlandırma hizmet öncesinde netleştirilir.</p><div className="grid">{services.map(service => <Link className="card" href={`/hizmetler/${service.slug}`} key={service.slug}><h3>{service.title}</h3><p>{service.text}</p></Link>)}</div></div></main><Footer/></>;
}
