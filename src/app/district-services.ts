export const districtServiceSlugs = ['klima-ariza-servisi', 'klima-bakim-servisi'] as const;
export type DistrictServiceSlug = typeof districtServiceSlugs[number];
type DistrictCopy = { name: string; areas: string[]; repair: string; maintenance: string; planning: string };
export const districtServiceCopy: Record<string, DistrictCopy> = {
  muratpasa: {
    name: 'Muratpaşa', areas: ['Fener', 'Çağlayan', 'Güzeloba', 'Şirinyalı'],
    repair: 'Muratpaşa’da ev, ofis veya iş yerindeki klimanızın soğutmaması, iç üniteden su damlaması ya da hata kodu göstermesi için servis kaydı oluşturabilirsiniz. Lara çevresindeki dairelerde dış ünitenin balkon içinde mi, bina cephesinde mi bulunduğunu belirtmeniz erişim planını doğru kurmamıza yardımcı olur. Belirtiyi yalnızca gaz eksikliği olarak değerlendirmeden hava akışı, drenaj ve cihazın çalışma koşulları birlikte incelenir.',
    maintenance: 'Muratpaşa’da düzenli kullanılan konut ve iş yeri klimaları için bakım talebinizi cihaz sayısıyla birlikte iletebilirsiniz. Fener, Çağlayan, Güzeloba ve Şirinyalı’daki adreslerde iç ünite temizliğine ek olarak yoğuşma suyunun tahliye hattı ve dış ünitenin hava geçişi değerlendirilir. Mobilya veya çalışma masasının üzerinde bulunan ünitelerde işlem öncesi çevrenin korunması planlanır.',
    planning: 'Randevu için mahalle, bina katı, otopark veya bina giriş koşulları ve dış ünite konumunu paylaşın. İşletme adresimiz Muratpaşa Mahallesi, 583 Sokak No: 3/A’dır; servis saati adres ve ekip uygunluğu teyit edilerek belirlenir.',
  },
  kepez: {
    name: 'Kepez', areas: ['Varsak', 'Güneş', 'Yeni Mahalle', 'Sütçüler'],
    repair: 'Kepez klima arıza servisinde cihazın hiç açılmaması ile çalışıp yeterince soğutmaması ayrı şikâyetler olarak değerlendirilir. Varsak, Güneş, Yeni Mahalle veya Sütçüler’deki adresiniz için talep oluştururken sorunun hangi modda başladığını ve ekranda görülen kodu bildirin. Dükkân ya da atölyede kullanılan cihazlarda kapının açık kalması, cihazın çalışma süresi ve hava girişindeki engeller de tespit sırasında dikkate alınır.',
    maintenance: 'Kepez’de ev, dükkân ve ofis klimaları için bakım kapsamı kullanım yoğunluğu ve cihazın bulunduğu ortama göre belirlenir. Hava akışının zayıfladığı bir cihazda yalnızca görünen filtrenin temizlenmesi yeterli olmayabilir; fan, eşanjör yüzeyleri ve drenaj hattı da değerlendirilir. Toz yükünün yüksek olduğu çalışma alanlarında sonraki bakım tarihi cihazın durumuna göre planlanır.',
    planning: 'Varsak ve çevresi dâhil Kepez randevularında mahalle adını, cihaz adedini ve dış ünitenin erişim durumunu belirtin. İş yeri için açılış saatini paylaşmanız çalışma sırasında gerekli alanın hazırlanmasına yardımcı olur.',
  },
  konyaalti: {
    name: 'Konyaaltı', areas: ['Hurma', 'Liman', 'Uncalı', 'Altınkum'],
    repair: 'Konyaaltı’nda su akıtan, sesli çalışan veya istenen sıcaklığa ulaşamayan klimalar için arıza tespiti talep edebilirsiniz. Hurma ve Liman çevresindeki site dairelerinde dış üniteye erişim ile site yönetiminin çalışma koşulları randevu öncesinde netleştirilir. Sahile yakın bir adreste dış ünitede görülen yüzey bozulması tek başına arıza nedeni sayılmaz; bağlantılar ve çalışma değerleri yerinde değerlendirilir.',
    maintenance: 'Konyaaltı klima bakım servisinde iç ünite filtresi, eşanjör, fan ve su tahliye hattının durumu birlikte ele alınır. Liman, Hurma, Uncalı ve Altınkum’daki konutlarda uzun süre kapalı kalmış cihazlar için ilk çalıştırma öncesi kontrol istenebilir. Dış ünitenin balkonda kapatılmış bir alanda bulunması hâlinde hava dolaşımı da bakım değerlendirmesine dâhil edilir.',
    planning: 'Site adı, blok, kat ve varsa teknik alana giriş koşullarını randevu sırasında iletin. Dış ünitenin cephede veya yüksekte bulunması farklı erişim ekipmanı gerektirebilir; erişim yöntemi ve bedeli işlem öncesi konuşulur.',
  },
  dosemealti: {
    name: 'Döşemealtı', areas: ['Yeşilbayır', 'Bahçeyaka', 'Altınkale'],
    repair: 'Döşemealtı’nda birden fazla odada kullanılan klimalarda şikâyetin tek cihazda mı, tüm cihazlarda mı görüldüğünü belirtmeniz önemlidir. Yeşilbayır, Bahçeyaka ve Altınkale’deki konutlarda soğutma veya ısıtma sorunu için cihazın modeli, dış ünite konumu ve hata koduyla servis kaydı alınır. Multi split sistemlerde iç ünitelerin çalışma modları ve ortak dış ünite bağlantısı ayrı değerlendirilir.',
    maintenance: 'Döşemealtı klima bakım randevularında cihaz sayısı ve iç/dış ünite konumları önceden belirlenir. Bahçeli veya çok katlı konutlarda farklı noktalardaki cihazların temizliği, drenaj kontrolü ve çalışma testi ayrı ayrı planlanır. Uzun süre kullanılmayan bir odanın klimasında koku veya hava akışı şikâyeti varsa bu bilgi bakım talebine eklenir.',
    planning: 'Mahalle, açık adres, cihazların bulunduğu katlar ve dış ünitelere erişim bilgisi paylaşın. Birden fazla cihaz için bakım süresi ve toplam hizmet kapsamı randevu öncesinde görüşülür; cihaz sayısına bakmadan sabit bir süre verilmez.',
  },
  aksu: {
    name: 'Aksu', areas: ['Kundu', 'Altıntaş', 'Pınarlı'],
    repair: 'Aksu klima arıza servisinde konut, ofis veya konaklama alanındaki cihazın kullanım biçimi servis kaydına eklenir. Kundu, Altıntaş ve Pınarlı çevresinde çalışırken duran, soğutmayan veya hata kodu gösteren cihazlarda arızanın başlama zamanı ve tekrar sıklığı not edilir. Birden fazla cihazın bulunduğu işletmelerde sorunlu ünitenin model etiketi ve oda bilgisi doğru cihazın kontrol edilmesini sağlar.',
    maintenance: 'Aksu’da sezonluk kullanılan evler ile yoğun çalışan işletmelerin bakım ihtiyacı aynı olmayabilir. Kundu, Altıntaş ve Pınarlı’daki adreslerde filtre ve iç ünite temizliği, su tahliyesi ve dış ünite hava geçişi cihaz bazında değerlendirilir. Bir süredir kapalı olan cihazlarda bakım sonrasında çalışma testi yapılarak hava akışı ve su tahliyesi gözlenir.',
    planning: 'Randevu için mahalle, cihaz sayısı ve kullanım alanını bildirin. Konaklama veya iş yerlerinde uygun çalışma saatleri önceden netleştirilir; giriş izni ve dış üniteye erişim koşulları varsa servis kaydına eklenir.',
  },
};
export function districtServicePath(district: string, service: DistrictServiceSlug) {
  return `/antalya/${district}/hizmetler/${service}`;
}
export function getDistrictService(locale: string, slug: string[]) {
  if (locale !== 'tr' || slug.length !== 4 || slug[0] !== 'antalya' || slug[2] !== 'hizmetler') return undefined;
  const district = districtServiceCopy[slug[1]];
  const service = districtServiceSlugs.find(value => value === slug[3]);
  if (!district || !service) return undefined;
  const maintenance = service === 'klima-bakim-servisi';
  const title = `${district.name} Klima ${maintenance ? 'Bakım' : 'Arıza'} Servisi`;
  const description = maintenance
    ? `${district.name} klima bakım servisi: filtre, iç ünite ve drenaj kontrolü. ${district.areas.slice(0, 2).join(' ve ')} çevresinde randevu: 0242 344 05 07.`
    : `${district.name} klima arıza servisi: soğutmama, su akıtma ve hata kodları için tespit ve onarım. Kapsam ve randevu için Kaya Teknik: 0242 344 05 07.`;
  return { ...district, districtSlug: slug[1], service, maintenance, title, description, intro: maintenance ? district.maintenance : district.repair };
}
export type DistrictService = NonNullable<ReturnType<typeof getDistrictService>>;
