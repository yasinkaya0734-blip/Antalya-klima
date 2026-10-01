import Link from 'next/link';
import { allDistricts, brands, slugify } from '../site-data';
import { featuredNeighborhoods, featuredNeighborhood } from '../featured-neighborhoods';
import { pageEditorial } from '../turkish-editorial';

export function FeaturedAreaLinks({ district, brand }: { district?: string; brand?: string }) {
  const areas = featuredNeighborhoods.filter(item => !district || item.district === district);
  return <section className="local-service-content"><h2>{brand ? `${brand} klima için mahalleye göre servis` : 'Öne çıkan mahallelerde klima servisi'}</h2>
    <p>Mahallenizin bakım, arıza ve montaj bilgilerini inceleyin. Randevu uygunluğu açık adres ve cihaz bilgisine göre görüşülür.</p>
    {allDistricts.filter(item => areas.some(area => area.district === item.slug)).map(item => <div key={item.slug}><h3><Link href={`/tr/ilceler/${item.slug}`}>{item.name}</Link></h3><div className="local-area-links">{areas.filter(area => area.district === item.slug).map(area => <Link key={area.slug} href={`/tr/antalya/${area.district}/${area.slug}${brand ? `?marka=${encodeURIComponent(brand)}` : ''}`}>{area.name} klima servisi</Link>)}</div></div>)}
  </section>;
}

export function NeighborhoodServiceContent({ district, slug }: { district: string; slug: string }) {
  const area = featuredNeighborhood(district, slug);
  if (!area) return null;
  const districtName = allDistricts.find(item => item.slug === district)!.name;
  return <section className="local-service-content" aria-label={`${area.name} servis bilgileri`}>
    <h2>{area.name} Mahallesi’nde klima bakım ve tamiri</h2>
    <p>{districtName} ilçesindeki {area.name} Mahallesi için klima bakım, arıza incelemesi, söküm ve montaj taleplerinizi Kaya Teknik’e iletebilirsiniz. Cihazın marka ve modelini, son bakım zamanını ve şikâyetin ne zaman başladığını paylaşmanız doğru iş planının hazırlanmasına yardımcı olur.</p>
    <h3>{area.focus}</h3><p>{area.advice}</p>
    <h3>Servis ziyaretinde hangi işlemler değerlendirilir?</h3>
    <ul className="list"><li>Bakımda filtre ve ünite temizliği, hava akışı ve drenajın durumu değerlendirilir.</li><li>Onarımda arıza belirtisi ve ölçümler birlikte incelenir; gerekli işlem ve parça uygunluğu açıklanır.</li><li>Montajda ünite konumu, boru bağlantıları, su tahliyesi ve güvenli bakım erişimi gözden geçirilir.</li><li>Gaz işlemi gerekiyorsa cihaz etiketindeki soğutucu bilgisi ve kaçak ihtimali kontrol edilir.</li></ul>
    <h3>{area.name} için servis ücreti ve randevu</h3><p>Tek bir sabit fiyat tüm cihazlar için geçerli değildir. Cihaz sayısı, erişim koşulları ve gereken işlem bedeli etkiler. Ziyaret ve arıza tespit ücreti olup olmadığını randevudan önce; onarım ve parça bedelini ise işleme onay vermeden önce görüşün.</p>
    <h3>{area.name} Mahallesi’nde hangi markalar için talep alınır?</h3><p>Aşağıdaki marka rehberlerinden cihazınıza ilişkin servis bilgisine ulaşabilirsiniz. Model, parça temini ve yapılacak işlem görüşmede netleştirilir. Kaya Teknik bağımsız özel servistir; markaların yetkili servisi olduğunu iddia etmez.</p>
    <div className="local-area-links">{brands.map(brand => <Link href={`/tr/markalar/${slugify(brand)}`} key={brand}>{brand} klima servisi</Link>)}</div>
    <p><Link href={`/tr/ilceler/${district}`}>{districtName} genelindeki diğer mahalleleri inceleyin</Link></p>
  </section>;
}

export function BrandServiceContent({ brand }: { brand: string }) {
  return <section className="local-service-content" aria-label={`${brand} özel servis kapsamı`}>
    <h2>Antalya {brand} klima bakım, tamir ve montaj</h2><p>{pageEditorial({ brand })} Kaya Teknik, Antalya’da bağımsız özel servis olarak talep alır. Marka adı cihazı tanımlamak için kullanılır; üretici adına yetkili servis veya garanti işlemi yapılacağı anlamına gelmez.</p>
    <h3>{brand} klima arızasında model neden önemlidir?</h3><p>Aynı markanın farklı serilerinde elektronik kart, kumanda, sensör ve hata kodları değişebilir. İç ve dış ünite etiketindeki model numaraları birlikte değerlendirilir. İnverter veya farklı sistemlerde parça uyumluluğu yalnızca marka adına bakılarak belirlenmez.</p>
    <h3>Bakım ile arıza onarımı arasındaki fark</h3><p>Bakım talebinde filtreler, ünite temizliği, hava akışı ve su tahliyesi ele alınır. Soğutmama, cihazın açılmaması, tekrarlayan uyarı veya elektriksel sorun ayrıca arıza tespiti gerektirebilir. Yapılması önerilen işlem ve ücret açıklanmadan parça değişimi planlanmaz.</p>
    <h3>Montaj, söküm ve gaz işlemleri</h3><p>{brand} cihazın taşınması veya kurulmasında tesisat ölçüleri, iç ve dış ünite konumları ve üreticinin ilgili modele ait koşulları dikkate alınır. Soğutucu işlemi gerekiyorsa etiket bilgisi ve kaçak kontrolü esas alınır; her performans düşüşü gaz eksikliği olarak değerlendirilmez.</p>
    <h3>Randevu öncesinde hazırlayabileceğiniz bilgiler</h3><ul className="list"><li>İlçe, mahalle ve cihaz sayısı.</li><li>İç ve dış ünite modeli; varsa ekrandaki kodun tamamı.</li><li>Sorunun başlangıcı, çalışma modu ve son yapılan işlem.</li><li>Dış ünitenin konumu ve güvenli erişim koşulları.</li></ul>
    <p>Garanti kapsamı devam eden cihazlarda üreticinin garanti koşullarını ve yetkili servis kanalını önce değerlendirin. Özel servis talebinde ziyaret, işçilik ve parça bedellerini işlem öncesinde görüşebilirsiniz.</p>
    <FeaturedAreaLinks brand={brand}/>
  </section>;
}
