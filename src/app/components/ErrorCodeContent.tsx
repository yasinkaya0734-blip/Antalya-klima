import Link from 'next/link';
import { errorCodeBrands, errorCodeReviewDate, type BrandCodes } from '../error-code-data';
import ErrorCodeExplorer from './ErrorCodeExplorer';
import { DistrictServiceLinks } from './DistrictServiceContent';

export default function ErrorCodeContent({ brand }: { brand?: BrandCodes }) {
  return <>
    <p className="lead">Ekrandaki kodu, klimanızın markası ve tam model numarasıyla birlikte kontrol edin. Bu rehberde arıza, koruma ve bilgi göstergeleri ayrı belirtilir.</p>
    <p className="review-date">Kaynak kontrolü: <time dateTime={errorCodeReviewDate}>28 Eylül 2026</time> · Hazırlayan: Kaya Teknik</p>
    <div className="code-intro"><h2>Önce model eşleşmesini kontrol edin</h2><p>Tablolardaki açıklamalar yalnızca başlarında belirtilen seri veya üretici destek kapsamı için geçerlidir. Aynı kod farklı modellerde farklı anlam taşıyabilir. Bu sayfa tüm modellerin eksiksiz servis kılavuzu değildir; doğrulanmış kayıtlar ve model kılavuzu gereken markalar birlikte gösterilir.</p><ol><li>İç ve dış ünitenin etiketindeki model numarasını not edin.</li><li>Kodu harfleri ve rakamlarıyla kaydedin; yanıp sönen ışık varsa videosunu çekin.</li><li>Tablodaki model/seri kapsamını etiketle karşılaştırın. Eşleşmiyorsa kodu o cihaza uygulamayın.</li></ol></div>
    <p className="notice">Kod tek başına kesin parça teşhisi değildir. Elektrik bağlantıları, soğutucu akışkan ve cihaz içi onarımlar teknisyen değerlendirmesi gerektirir. Yanık kokusu, duman veya tekrarlayan sigorta atması varsa kullanımı durdurun ve teknik destek alın.</p>
    {brand && <p><Link href="/tr/klima-ariza-kodlari">← Tüm markaların arıza kodlarına dön</Link></p>}
    {!brand && <nav className="code-brand-nav" aria-label="Marka kod sayfaları">{errorCodeBrands.map(entry => <Link key={entry.slug} href={`/tr/klima-ariza-kodlari/${entry.slug}`}>{entry.brand}</Link>)}</nav>}
    <ErrorCodeExplorer entries={brand ? [brand] : errorCodeBrands} initialBrand={brand?.slug}/>
    <section className="faq"><h2>Arıza kodları hakkında sık sorulan sorular</h2>
      <details><summary>Her E1 kodu aynı arızayı mı gösterir?</summary><p>Hayır. Marka, model ve kontrol sistemi farklı olduğunda anlam değişir. Önce kendi cihazınızın model kılavuzunu kontrol edin.</p></details>
      <details><summary>Tabloda kod yoksa ne yapmalıyım?</summary><p>Kodun bulunmaması arıza olmadığını göstermez. Tam model numarasını, kodu ve belirtinin ne zaman başladığını servisle paylaşın.</p></details>
      <details><summary>Koruma veya bilgi kodu arıza mıdır?</summary><p>Her zaman değil. Bazı göstergeler buz çözme, filtre hatırlatma veya temizleme işlevini bildirir. Beklenen süre ve davranış model kılavuzundan kontrol edilmelidir.</p></details>
    </section><h2>Antalya’da ilçe bazlı servis</h2><DistrictServiceLinks/>
  </>;
}
