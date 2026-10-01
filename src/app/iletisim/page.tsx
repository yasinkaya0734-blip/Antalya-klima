import { Footer, Header } from '../components';
import { mobile, phone, whatsapp } from '../site-data';

export const metadata = { title: 'İletişim', description: 'Kaya Teknik iletişim bilgileri.' };

export default function ContactPage() {
  return <><Header/><main className="article"><div className="wrap"><p className="crumb">Ana Sayfa / İletişim</p><h1>Kaya Teknik iletişim</h1><p className="lead">Klima servis talebiniz için cihaz markasını, arıza/hizmet ihtiyacını ve bulunduğunuz ilçeyi iletin.</p><div className="grid"><a className="card" href="tel:02423440507"><h3>Sabit hat</h3><p>{phone}</p></a><a className="card" href="tel:05382310734"><h3>Mobil</h3><p>{mobile}</p></a><a className="card" href={whatsapp} target="_blank" rel="noreferrer"><h3>WhatsApp</h3><p>Hızlı bilgi ve talep oluşturma</p></a></div><p className="notice" style={{marginTop:26}}>Hizmet saati, ekip uygunluğu ve işlem kapsamı talep sırasında teyit edilir.</p></div></main><Footer/></>;
}
