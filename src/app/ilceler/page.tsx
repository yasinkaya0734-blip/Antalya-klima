import Link from 'next/link';
import { Footer, Header } from '../components';
import { otherDistricts, priorityDistricts } from '../site-data';

export const metadata = { title: 'Antalya Klima Hizmet Bölgeleri', description: 'Kaya Teknik Antalya klima hizmet bölgeleri.' };

export default function DistrictsPage() {
  return <><Header/><main className="article"><div className="wrap"><p className="crumb"><Link href="/">Ana Sayfa</Link> / Hizmet Bölgeleri</p><h1>Antalya klima hizmet bölgeleri</h1><p className="lead">Öncelikli ilçelerimiz için detaylı hizmet sayfalarımız hazırlanmıştır. Diğer Antalya ilçelerinde randevu uygunluğu talep sırasında teyit edilir.</p><h2>Öncelikli hizmet bölgeleri</h2><div className="grid">{priorityDistricts.map(district => <Link className="card" href={`/ilceler/${district.slug}`} key={district.slug}><h3>{district.name}</h3><p>{district.areas}</p></Link>)}</div><h2 style={{marginTop:36}}>Diğer Antalya ilçeleri</h2><div>{otherDistricts.map(district => <Link className="tag" href={`/ilceler/${district.slug}`} key={district.slug}>{district.name}</Link>)}</div></div></main><Footer/></>;
}
