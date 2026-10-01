import type { Locale } from './i18n';

// Editorial descriptions describe offered services, not invented local jobs or branches.
const descriptions: Record<string, string> = {
  akseki: 'Akseki klima servisi: bakım, arıza tespiti ve montaj talepleriniz için Kaya Teknik. Mahallenizi ve cihaz modelini paylaşın, ziyaret zamanını birlikte belirleyelim.',
  aksu: 'Aksu klima servisi için Kaya Teknik: soğutmama, su akıtma, bakım ve montaj ihtiyaçlarınızı iletin. Adres ve cihaz bilgisine göre servis randevusu planlayın.',
  alanya: 'Alanya klima bakım, tamir ve montaj hizmetleri. Kaya Teknik ile cihazın belirtisini ve bulunduğunuz mahalleyi paylaşarak servis uygunluğunu öğrenin.',
  demre: 'Demre klima servisi: filtre ve ünite bakımı, arıza incelemesi ve montaj talepleri. Kaya Teknik ile işlem kapsamını ve randevu zamanını görüşün.',
  dosemealti: 'Döşemealtı klima servisi: bakım, tamir, söküm ve yeniden montaj için Kaya Teknik. Cihaz modeli ve tesisat bilgisiyle servis talebinizi hazırlayın.',
  elmali: 'Elmalı klima bakım ve tamir servisi. Isıtma veya soğutma sorununuzu Kaya Teknik ile paylaşın; cihazınıza uygun inceleme ve ziyaret planını görüşün.',
  finike: 'Finike klima servisi için bakım, su akıtma ve performans sorunlarında teknik inceleme. Kaya Teknik’ten güncel hizmet bedeli ve randevu bilgisi alın.',
  gazipasa: 'Gazipaşa klima tamiri, bakım ve montaj talepleri için Kaya Teknik. Marka, model ve arıza belirtisini ileterek servis ziyaretinizi planlayın.',
  gundogmus: 'Gündoğmuş klima servisi: cihaz bakımı, arıza tespiti ve montaj hizmetleri. Kaya Teknik ile mahalle ve adres bilgisine göre randevu uygunluğunu görüşün.',
  ibradi: 'İbradı klima bakım, onarım ve kurulum talepleriniz için Kaya Teknik. Cihazın çalışma sorununu bildirin, yapılacak işlem ve ziyaret zamanını netleştirin.',
  kas: 'Kaş klima servisi: soğutma sorunu, bakım, tamir ve yer değişimi talepleri. Kaya Teknik ile cihaz ve konum bilgilerinizi paylaşarak randevu oluşturun.',
  kemer: 'Kemer klima bakımı, arıza tespiti ve montaj hizmetleri. Kaya Teknik ile filtre, hava akışı veya su akıtma şikâyetinizi paylaşın; servis planını görüşün.',
  kepez: 'Kepez klima servisi: soğutmama, ses ve su akıtma sorunları, bakım ve montaj için Kaya Teknik. Mahalle ve model bilgisiyle servis talebinizi iletin.',
  konyaalti: 'Konyaaltı klima servisi için bakım, tamir ve montaj desteği. Kaya Teknik ile cihazın performansını, bakım geçmişini ve randevu uygunluğunu görüşün.',
  korkuteli: 'Korkuteli klima servisi: ısıtma ve soğutma sorunlarının incelenmesi, bakım ve kurulum. Kaya Teknik’ten işlem kapsamı ve servis randevusu bilgisi alın.',
  kumluca: 'Kumluca klima bakım, tamir ve montaj taleplerinizi Kaya Teknik’e iletin. Arıza kodu, cihaz modeli ve mahalle bilgisiyle ziyaretinizi planlayın.',
  manavgat: 'Manavgat klima servisi: periyodik bakım, arıza tespiti, söküm ve montaj. Kaya Teknik ile cihaz sayısını ve talebinizi paylaşın, servis zamanını görüşün.',
  muratpasa: 'Muratpaşa klima servisi: bakım, tamir ve montaj için Kaya Teknik. Muratpaşa Mahallesi’ndeki işletmemize ulaşın, mahalleniz için servis randevusu alın.',
  serik: 'Serik klima servisi için bakım, onarım ve montaj talepleri. Kaya Teknik ile marka, model ve adres bilgilerini paylaşın; güncel bedel ve randevuyu öğrenin.',
};

export function locationSeo(locale: Locale, district?: { slug: string; name: string }) {
  const place = district?.name ?? 'Antalya';
  const titles: Record<Locale, string> = {
    tr: `${place} Klima Servisi | Bakım, Tamir ve Montaj`,
    en: `${place} Air Conditioning Service | Repair & Maintenance`,
    de: `${place} Klimaservice | Wartung und Reparatur`,
    ru: `Сервис кондиционеров ${place} | Ремонт и обслуживание`,
  };
  const text: Record<Locale, string> = {
    tr: district ? descriptions[district.slug] : 'Antalya klima servisi: 19 ilçede bakım, tamir ve montaj için Kaya Teknik. Mahallenizi seçin; güncel hizmet bedeli ve randevu için 0242 344 05 07’yi arayın.',
    en: `Air conditioning repair, maintenance and installation in ${place}. Contact Kaya Teknik with your location and model for current charges and appointment availability.`,
    de: `Klimaanlagen in ${place}: Wartung, Reparatur und Montage durch Kaya Teknik. Teilen Sie Standort und Modell mit, um Kosten und Terminmöglichkeiten zu klären.`,
    ru: `Ремонт, обслуживание и монтаж кондиционеров: ${place}. Сообщите Kaya Teknik адрес и модель, чтобы уточнить стоимость работ и время выезда.`,
  };
  return { title: titles[locale], description: text[locale] };
}
