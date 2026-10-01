import { brands, slugify } from './site-data';

export type ErrorRow = { code: string; meaning: string; kind?: 'Bilgi' | 'Koruma' };
export type CodeGroup = { scope: string; rows: ErrorRow[] };
export type BrandCodes = { brand: string; slug: string; groups: CodeGroup[]; note: string };
const rows = (data: string): ErrorRow[] => data.split('\n').filter(Boolean).map(line => {
  const [code, meaning, kind] = line.split('|');
  return { code, meaning, ...(kind ? { kind: kind as 'Bilgi' | 'Koruma' } : {}) };
});
// Every group has explicit model applicability.
// Similar codes are never inherited across brands or unrelated model families.
const chRows = rows(`CH01|Oda sensöründe sorun
CH02|Giriş borusu sensöründe sorun
CH03|Kablolu kumandada sorun
CH04|Şamandıra anahtarında sorun
CH05|Üniteler arası haberleşme sorunu
CH06|Çıkış borusu sensöründe sorun
CH09|EEPROM belleğinde sorun
CH10|İç fanın kilitlenmesi
CH12|Orta boru sensöründe sorun
CH21|IPM/düşük DC akım bildirimi
CH22|CT2 akım sınırı bildirimi
CH23|DC bağlantıda düşük gerilim
CH26|Kompresör konumunda sorun
CH27|PSC arızası bildirimi
CH29|Kompresör fazı/aşırı akım sorunu
CH32|Basma hattında aşırı sıcaklık
CH34|Yüksek basınç sınırı
CH35|Düşük basınç sınırı
CH36, CH38|Akışkan kaçağı bildirimi
CH37|Sıkıştırma oranı sınırı
CH40|Akım sensöründe sorun
CH41|Basma sensöründe sorun
CH42|Alçak basınç sensöründe sorun
CH43|Yüksek basınç sensöründe sorun
CH44|Dış hava sensöründe sorun
CH45|Kondenser orta sensöründe sorun
CH46|Emme sensöründe sorun
CH51|Ünite kapasitesi eşleşmiyor
CH53|Üniteler arası iletişim sorunu
CH61|Kondenserde yüksek sıcaklık
CH62|Kart soğutucusunda yüksek sıcaklık
CH67|BLDC motor kilitlenmesi
CH72|Dört yollu vana konumu
CH93|Giriş/çıkış iletişim sorunu`);
const catalog: Record<string, CodeGroup[]> = {
  arcelik: [{ scope: 'Üreticinin CH kodları destek listesi; model özelinde kılavuzla eşleştirilmelidir.', rows: chRows }],
  beko: [{ scope: 'Üreticinin CH kodları destek listesi; tüm Beko modellerinin ortak tablosu değildir.', rows: chRows }, { scope: '18321 ve 31821, Nisan 2017 üretimi: F1–F5. Auto Clean donanımlı modeller: CO.', rows: rows('F1–F5|Belirtilen modellerde fan kademesi göstergesi; arıza değildir.|Bilgi\nCO|Auto Clean temizleme işlemi göstergesi.|Bilgi') }],
  samsung: [{ scope: 'Samsung Türkiye destek sayfasındaki ekran kodları; tam model numarasıyla kullanım kılavuzunu kontrol edin.', rows: rows(`CF|Filtre temizliği hatırlatıcısı.|Bilgi
C1|Otomatik temizleme çalışıyor.|Bilgi
DF|Buz çözme çalışıyor.|Bilgi
E101, E102, E202|Üniteler arasında iletişim kurulamıyor.
E121|İç ortam sensörü sorunu.
E122|İç boru sensörü sorunu.
E154|İç fan devri uygun değil.
E162|EEPROM belleğinde sorun.
E186|MPI geri bildirimi sorunu.
E203|Dış kart/inverter haberleşmesi sorunu.
E221, E237|Dış ortam sensörü sorunu.
E251|Tahliye sıcaklığı sensörü sorunu.
E416|Gaz tahliye sıcaklığı yüksek.
E458|Dış fan sorunu.
E461|Kompresör başlatılamıyor.
E462|PFC aşırı akım bildirimi.
E464|IPM aşırı akım bildirimi.
E465|Kompresör gerilim sınırı.
E467|Kompresör dönüşü sorunu.
E468|Akım sensörü sorunu.
E469|DC gerilim sensörü sorunu.
E471|OTP bildirimi.
E472|AC gerilim sinyali sorunu.
E554|Akışkan kaçağı bildirimi.
E556|Kapasite karşılaştırması yapılamıyor.`) }],
  lg: [{ scope: 'LG’nin 21.08.2026 tarihli destek rehberindeki kod grupları; kesin tanı ve model eşleştirmesi gerekir.', rows: rows('CH05, CH53, E0|İç ve dış ünite haberleşmesinde sorun.\nCH32, CH33, CH36, CH38, F4|Soğutucu devre veya kompresörle ilgili bildirim; tek başına gaz dolumu kararı verdirmez.\nCH66, CH90, CH91, CH92, CH93|Kurulum, test çalışması veya akış koşullarıyla ilgili bildirim.') }],
  vestel: [{ scope: 'Vestel Plazma Inverter Wi-Fi kullanıcı kılavuzu, s.38; farklı serilere genellenmez.', rows: rows('dF|Dış ünitede buz çözme işlemi sürüyor.|Bilgi\nHL|Besleme geriliminde dalgalanma bildirimi.|Koruma\nER11, ER13|Aşırı akıma karşı koruma bildirimi.|Koruma\nSr|Cihaz bazı arızalara rağmen çalışmayı sürdürüyor; servis incelemesi gerekir.\nRE|Elektrik tesisatı kontrolü gerektiren bildirim; kontrolü uzman yapmalıdır.\nER + numara|Arıza bildirimi. Bu kullanıcı kılavuzu her numara için parça tanısı vermiyor; servis desteği gerekir.') }],
  gree: [{ scope: 'All Match R32 Floor/Ceiling 9k–24k, 230V A kılavuzu Tablo 6; başka serilerde aynı kod farklı olabilir.', rows: rows(`E1|Yüksek basınca karşı koruma.|Koruma
E2|İç eşanjörde donma koruması.|Koruma
E3|Düşük basınç/akışkan eksikliği koruması veya toplama modu.|Koruma
E4|Yüksek basma sıcaklığı koruması.|Koruma
E5|AC aşırı akım koruması.|Koruma
E6|Haberleşme sorunu.
E7|Çalışma modları çakışıyor.
E8|Yüksek sıcaklık koruması.|Koruma
F1|İç ortam sensör devresi sorunu.
F2|İç eşanjör sensör devresi sorunu.
F3|Dış ortam sensör devresi sorunu.
F4|Dış eşanjör sensör devresi sorunu.
F5|Basma sıcaklığı sensör devresi sorunu.
C5|Köprüleme parçası bildirimi.
EA|Soğutucu akışkan kaçak alarmı.
EE|EEPROM yükleme sorunu.`) }],
  alarko: [{ scope: 'Flair Multi kaset FLR-BM0901CAI / 1201CAI / 1801CAI / 2401CAI, Tablo 8; duvar tipi serilere genellenmez.', rows: rows(`E1|Kompresörde yüksek basınç koruması.|Koruma
E2|İç ünitede donma koruması.|Koruma
E3|Düşük basınç, akışkan eksikliği koruması veya toplama modu.|Koruma
E4|Basma sıcaklığı koruması.|Koruma
E5|Besleme aşırı akım koruması.|Koruma
E6|Haberleşme sorunu.
E7|Mod uyuşmazlığı.
E8|Yüksek sıcaklığa karşı koruma.|Koruma
E9|Su seviyesi koruması.|Koruma
F1|İç ortam sensörü açık/kısa devresi.
F2|İç eşanjör sensörü açık/kısa devresi.
F3|Dış ortam sensörü açık/kısa devresi.
F4|Dış eşanjör sensörü açık/kısa devresi.
F5|Basma sensörü açık/kısa devresi.
C5|Köprüleme parçası koruması.
EE|EEPROM yükleme sorunu.`) }],
  airfel: [{ scope: 'Kaset tipi kılavuz, yalnız inverter klima Tablo 8-1a. Sabit hızlı kaset ve duvar tipi için kullanmayın.', rows: rows(`E0|Mod uyuşmazlığı bildirimi.
E1|İç/dış ünite haberleşme sorunu.
E2|Oda sıcaklığı sensör hattı sorunu.
E3|T2 boru sensör hattı sorunu.
E4|T2B boru sensör hattı sorunu.
E7|EEPROM bellek sorunu.
E8|İç fanın durması/kilitlenmesi.
Ed|Dış ünite arızası bildirimi.
EE|Su seviyesi alarmı.
F0|Kaldırılabilir panel haberleşme sorunu.
F1|Kaldırılabilir panel mekanizması sorunu.
F2|Kaldırılabilir panel kapalı değil.
F3|Ana/bağımlı iç ünite iletişim sorunu.
F4|Ana/bağımlı ünitede diğer sorun.
EC|Soğutucu akışkan kaçak bildirimi.`) }],
  'mitsubishi-electric': [{ scope: 'OCH832B servis dokümanındaki kontrol tablosu; iç/dış ünite modelinin bu doküman kapsamında olması gerekir.', rows: rows(`P1|Emiş havası sensöründe sorun.
P2|TH2 boru sensöründe sorun.
P9|TH5 boru sensöründe sorun.
E6, E7|Üniteler arası iletişim sorunu.
P4|Drenaj sensörü/şamandıra bağlantısı sorunu.
P5|Drenaj pompasında sorun.
PA|Su kaçağı bildirimiyle kompresör durdurulmuş.
P6|Donma/aşırı sıcaklık koruması.|Koruma
EE|İç/dış ünite kombinasyonu uyuşmuyor.
P8|Boru sıcaklığı bildirimi.
E4, E5|Kumanda sinyali alınamıyor.
Pb|İç fan motorunda sorun.
Fb|İç kontrol sistemi/bellek sorunu.
PL|Soğutucu devrede anormallik.
E0, E3|Kumanda iletiminde sorun.
E1, E2|Kumanda kartında sorun.
E9|Dış üniteden haberleşme iletim sorunu.
UP|Kompresörde aşırı akım.
U3, U4|Dış sensör devresinde sorun.
UF|Kilitli kompresörde aşırı akım.
U2|Yüksek basma sıcaklığı/akışkan yetersizliği.
U1, Ud|Basınç veya sıcaklık koruması.|Koruma
U5|Soğutucu blokta sıcaklık sorunu.
U8|Dış fan korumayla durmuş.|Koruma
U6|Kompresör akımı/güç modülü sorunu.
U7|Düşük basma sıcaklığına bağlı anormallik.
U9, UH|Gerilim, senkronizasyon veya akım sensörü sorunu.`) }],
  tcl: [{ scope: 'Advantage Series dış ünite montaj kılavuzu, s.31. Elite ve diğer serilerin kodları ayrı doğrulanmalıdır.', rows: rows(`E0|Üniteler arası iletişim sorunu.
E1|İç ortam sensörü sorunu.
E2|İç eşanjör sensörü sorunu.
E3|Dış eşanjör sensörü sorunu.
E4|Düşük akışkan/sistem anormalliği.
E5|Model yapılandırması hatalı.
E6|İç fan sorunu.
E7|Dış ortam sensörü sorunu.
E8|Basma sıcaklığı sensörü sorunu.
E9|IPM/kompresör sürücüsü sorunu.
EA|Dış akım sensörü sorunu.
Eb|Ana kart/ekran iletişim sorunu.
EC|Dış modül iletişim sorunu.
EE|Dış EEPROM sorunu.
EF|Dış DC fan sorunu.
EH|Dış emiş sensörü sorunu.
EP|Kompresör gövdesi üstü bildirimi.
EU|Dış gerilim sensörü sorunu.
Ej|Dış orta eşanjör sensörü sorunu.
En|Dış gaz borusu sensörü sorunu.
Ey|Dış sıvı borusu sensörü sorunu.
P0|IPM koruması.|Koruma
P1|Gerilim koruması.|Koruma
P2|Aşırı akım koruması.|Koruma
P3|Diğer korumalar.|Koruma
P4|Basma sıcaklığı koruması.|Koruma
P5|Donma koruması.|Koruma
P6|Soğutmada aşırı sıcaklık koruması.|Koruma
P7|Isıtmada aşırı sıcaklık koruması.|Koruma
P8|Dış sıcaklık koruması.|Koruma
P9|Sürücü yük koruması.|Koruma
PA|Üst kanat iletişimi/mod çatışması.
H1|Yüksek basınç anahtarı sorunu.
H2|Düşük basınç anahtarı sorunu.
H3|Yüksek basınç sensörü sorunu.
H4|Düşük basınç sensörü sorunu.
Hd|İç ünite kaçak koruması.|Koruma`) }],
};
const notes: Record<string, string> = {
  altus: 'Altus’un genel destek sayfası model bazlı kod–anlam tablosu sunmuyor. Arçelik/Beko kodları Altus’a otomatik olarak aktarılmaz; cihazın model kılavuzu gerekir.',
  bosch: 'Bosch klimanın E-Nr ürün numarası gerekir. Kombi ve beyaz eşya hata kodları klima için kullanılmaz; Servis Asistanı’nda tam ürün numarasıyla ilerleyin.',
  siemens: 'Siemens klimanın E-Nr numarasıyla model kılavuzu eşleştirilmelidir. Genel ev aleti hata listesi klima kod tablosu yerine geçmez.',
  regal: 'Regal serisinin model kılavuzu gereklidir. Vestel ile aynı üretici grubunda olması tüm hata kodlarının ortak olduğunu göstermez.',
  seg: 'SEG cihazın model ve üretim serisiyle eşleşen kılavuz gerekir. Başka markadaki E/ER kodlarını bu cihaza uygulamayın.',
  baymak: 'Elegant Plus, Elegant Prime ve salon tipi modellerin kılavuzları ayrı değerlendirilmelidir. Tüm modeller için doğrulanmış ortak bir kod listesi bulunmadığından model bilgisi gereklidir.',
  demirdokum: 'DemirDöküm klima için tam seri/model gereklidir. Nitron ve benzeri kombi kodları klima arızası olarak kullanılamaz.',
  daikin: 'Daikin’in resmî kod sorgulamasında ürün grubunu seçin. Split, Sky Air ve VRV kod kapsamları farklı olabilir; cihaz modeliyle eşleştirin.',
  rubenis: 'Rubenis için modelle eşleşen üretici servis dokümanı henüz doğrulanamadı. İnternetteki birbiriyle çelişen genel kod listeleri burada kullanılmıyor.',
  sigma: 'Sigma Comfort, Plus ve diğer serilerde üretim platformu değişebilir. Tam model numarası ve ilgili servis dokümanı olmadan kod anlamı kesinleştirilemez.',
  vaillant: 'climaVAIR serisi ve model numarası gerekir. Ürün kılavuzları revizyona göre değişir; kombi F kodlarını klimalara uygulamayın.',
  cartel: 'Cartel için tam modelle eşleşen üretici kod tablosu doğrulanamadı. Cihaz etiketini ve ekrandaki kodu servis değerlendirmesi için paylaşın.',
  copa: 'Copa Naya Line, Viva Line ve salon tipi cihazlar ayrı kılavuzlara sahiptir. Bir serinin kod tablosu diğer seriler için kullanılmaz.',
  toshiba: 'Toshiba RAS, RAV ve VRF sistemlerinin kontrol kodları farklıdır. Tam model numarası ve kumanda tipiyle üretici dokümanını eşleştirin.',
};
export const errorCodeBrands: BrandCodes[] = brands.map(brand => {
  const slug = slugify(brand);
  return { brand, slug, groups: catalog[slug] ?? [], note: notes[slug] ?? 'Aşağıdaki açıklamalar yalnızca belirtilen kaynak ve seri kapsamındadır. Model eşleşmesi olmadan parça veya onarım kararı vermeyin.' };
});
export const errorCodeReviewDate = '2026-09-28';
export const errorCodeTitle = 'Klima Arıza Kodları — Marka ve Model Rehberi';
export const errorCodeDescription = '24 klima markası için arıza kodu rehberi. Model kapsamı, bilgi ve koruma göstergeleri; doğrulanamayan seriler için kılavuz yönlendirmesi.';
export function resolveErrorPage(locale: string, slug: string[]) {
  if (locale !== 'tr' || slug[0] !== 'klima-ariza-kodlari' || slug.length > 2) return undefined;
  if (slug.length === 1) return { title: errorCodeTitle, description: errorCodeDescription, brand: undefined, indexable: true };
  const brand = errorCodeBrands.find(value => value.slug === slug[1]);
  if (!brand) return undefined;
  return { title: `${brand.brand} Klima Arıza Kodları`, description: `${brand.brand} klima arıza kodlarını model ve seri kapsamıyla inceleyin. ${brand.groups.length ? 'Üretici kaynaklı açıklamalar ve güvenli servis yönlendirmesi.' : 'Doğru kılavuz eşleştirmesi için gerekli model bilgileri.'}`, brand, indexable: brand.groups.length > 0 };
}
