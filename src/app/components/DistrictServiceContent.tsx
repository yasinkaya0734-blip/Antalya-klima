import Link from 'next/link';
import Image from 'next/image';
import { districtServiceCopy, districtServicePath, districtServiceSlugs, type DistrictService } from '../district-services';

export function DistrictServiceLinks({ district }: { district?: string }) {
  return <div className="grid district-service-links">{Object.entries(districtServiceCopy).filter(([slug]) => !district || slug === district).flatMap(([slug, value]) => districtServiceSlugs.map(service => <Link className="card" key={`${slug}-${service}`} href={`/tr${districtServicePath(slug, service)}`}><h3>{value.name} Klima {service === 'klima-bakim-servisi' ? 'Bakım' : 'Arıza'} Servisi</h3><p>{service === 'klima-bakim-servisi' ? 'Temizlik kapsamı, drenaj kontrolü ve bakım randevusu.' : 'Belirti ve model bilgisiyle arıza tespiti ve onarım süreci.'}</p></Link>))}</div>;
}

export default function DistrictServiceContent({ page }: { page: DistrictService }) {
  const tasks = page.maintenance ? [
    'Cihaz modeli, kullanım yoğunluğu ve mevcut şikâyetler alınır; bakım kapsamı açıklanır.',
    'Çalışma alanı korunur, cihaz güvenli biçimde durdurulur; filtre ve erişilebilir yüzeylerin durumu incelenir.',
    'Modele uygun yöntemle filtre, iç ünite eşanjörü ve fan temizliği planlanan kapsamda yapılır.',
    'Yoğuşma tavası ve drenaj hattı kontrol edilir; dış ünitenin hava geçişini etkileyen kir ve engeller değerlendirilir.',
    'Bakım sonunda cihaz çalıştırılır; hava akışı, su tahliyesi ve çalışma davranışı kontrol edilerek sonuç paylaşılır.',
  ] : [
    'Marka, model, hata kodu ve arızanın hangi koşulda ortaya çıktığı kaydedilir.',
    'Hava akışı, tahliye hattı ve çalışma modu incelenir; elektrik ve soğutucu devre kontrolleri teknisyen tarafından yapılır.',
    'Tespit edilen neden, gerekli işlem ve varsa parça ihtiyacı açıklanır; bedel onayınız alınmadan onarıma geçilmez.',
    'Onaylanan işlemden sonra cihaz çalışma testine alınır; tekrarlayan belirti veya ek işlem ihtiyacı bildirilir.',
  ];
  return <>
    <p className="lead">{page.description}</p><p>{page.intro}</p>
    <Image className="guide-feature-image" src={page.maintenance ? '/klima-bakim.png' : '/klima-ariza-tamir.png'} alt={`${page.name} için ${page.maintenance ? 'klima bakım ve temizlik' : 'klima arıza tespit'} hizmeti`} width={920} height={518} sizes="(max-width: 760px) 100vw, 920px"/>
    <h2>{page.maintenance ? 'Bakımda hangi işlemler değerlendirilir?' : 'Arıza tespiti ve onarım nasıl ilerler?'}</h2>
    <ol className="service-checklist">{tasks.map(task => <li key={task}>{task}</li>)}</ol>
    <h2>{page.name} servis bölgesi ve randevu hazırlığı</h2><p>{page.areas.join(', ')} ve ilçedeki diğer mahalleler için adresinizi paylaşarak servis uygunluğunu öğrenebilirsiniz.</p><p>{page.planning}</p>
    <h2>{page.maintenance ? 'Bakım, gaz dolumu ve onarım aynı işlem midir?' : 'Soğutmayan klimaya doğrudan gaz eklenir mi?'}</h2>
    <p>{page.maintenance ? 'Bakım; temizlik, kontrol ve çalışma testini kapsar. Parça değişimi, kaçak onarımı veya soğutucu akışkan işlemi gerekirse ayrıca değerlendirilir ve bedeli önceden bildirilir. Temizlik her elektronik veya mekanik arızayı gidermez.' : 'Soğutmama tek başına gaz eksikliği anlamına gelmez. Filtre, fan, sensör, elektrik beslemesi veya kullanım koşulları benzer şikâyet oluşturabilir. Soğutucu akışkan işlemi gerekiyorsa kaçak ve cihaz özellikleri kontrol edilir; işlem ölçüme ve modele göre belirlenir.'}</p>
    <h2>Hata kodu görüyorsanız</h2><p>Kodu ekranda göründüğü biçimiyle, cihazın model etiketiyle birlikte not edin. Aynı kod farklı markalarda ve serilerde farklı anlam taşır; tek başına değişecek parçayı göstermez.</p><Link className="btn" href="/tr/klima-ariza-kodlari">Markaya göre klima arıza kodları</Link>
    <section className="faq"><h2>Sık sorulan sorular</h2>
      <details><summary>{page.name} için aynı gün randevu alabilir miyim?</summary><p>Randevu günü ve saati adres, işlem kapsamı ve ekip uygunluğuna göre teyit edilir. Kesin saat için 0242 344 05 07 numarasından bilgi alabilirsiniz.</p></details>
      <details><summary>Servis ücreti nasıl belirlenir?</summary><p>Cihaz sayısı, model, erişim koşulları ve gereken işlem değerlendirilir. Güncel servis, işçilik ve parça bedelleri işlem öncesinde açıklanır.</p></details>
      <details><summary>{page.maintenance ? 'Bakım ne sıklıkta yapılmalı?' : 'Arıza kodunu silmek sorunu çözer mi?'}</summary><p>{page.maintenance ? 'Üreticinin kılavuzundaki bakım aralığı esas alınır. Yoğun kullanım, ortamın toz durumu ve cihazın mevcut kirlenmesi daha sık kontrol gerektirebilir.' : 'Kodun kaybolması arızanın giderildiğini kanıtlamaz. Tekrarlayan kodlarda modeli ve belirtiyi kayıt altına alıp teknik değerlendirme isteyin; cihazı peş peşe yeniden başlatmayın.'}</p></details>
    </section><h2>{page.name} için diğer hizmet</h2><DistrictServiceLinks district={page.districtSlug}/>
    <p><Link href={`/tr/ilceler/${page.districtSlug}`}>{page.name} mahalleleri ve tüm klima hizmetleri</Link></p>
  </>;
}
