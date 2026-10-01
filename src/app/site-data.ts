export const phone = '0242 344 05 07';
export const mobile = '0538 231 07 34';
export const whatsapp = 'https://wa.me/905382310734?text=Merhaba%2C+klima+servisi+talebim+var.';

export const priorityDistricts = [
  { slug: 'muratpasa', name: 'Muratpaşa', areas: 'Lara, Fener, Çağlayan, Güzeloba, Şirinyalı ve çevre mahalleler' },
  { slug: 'konyaalti', name: 'Konyaaltı', areas: 'Hurma, Liman, Uncalı, Altınkum ve çevre mahalleler' },
  { slug: 'kepez', name: 'Kepez', areas: 'Varsak, Güneş, Yeni Mahalle, Sütçüler ve çevre mahalleler' },
  { slug: 'aksu', name: 'Aksu', areas: 'Kundu, Altıntaş, Pınarlı ve çevre mahalleler' },
  { slug: 'dosemealti', name: 'Döşemealtı', areas: 'Yeşilbayır, Bahçeyaka, Altınkale ve çevre mahalleler' },
];

export const allDistricts = [
  { slug: 'akseki', name: 'Akseki' }, { slug: 'aksu', name: 'Aksu' }, { slug: 'alanya', name: 'Alanya' }, { slug: 'demre', name: 'Demre' }, { slug: 'dosemealti', name: 'Döşemealtı' }, { slug: 'elmali', name: 'Elmalı' }, { slug: 'finike', name: 'Finike' }, { slug: 'gazipasa', name: 'Gazipaşa' }, { slug: 'gundogmus', name: 'Gündoğmuş' }, { slug: 'ibradi', name: 'İbradı' }, { slug: 'kas', name: 'Kaş' }, { slug: 'kemer', name: 'Kemer' }, { slug: 'kepez', name: 'Kepez' }, { slug: 'konyaalti', name: 'Konyaaltı' }, { slug: 'korkuteli', name: 'Korkuteli' }, { slug: 'kumluca', name: 'Kumluca' }, { slug: 'manavgat', name: 'Manavgat' }, { slug: 'muratpasa', name: 'Muratpaşa' }, { slug: 'serik', name: 'Serik' },
];

export const neighborhoods = [
  { district: 'muratpasa', slug: 'lara', name: 'Lara' }, { district: 'muratpasa', slug: 'fener', name: 'Fener' }, { district: 'muratpasa', slug: 'caglayan', name: 'Çağlayan' }, { district: 'muratpasa', slug: 'guzeloba', name: 'Güzeloba' }, { district: 'muratpasa', slug: 'sirinyali', name: 'Şirinyalı' },
  { district: 'konyaalti', slug: 'hurma', name: 'Hurma' }, { district: 'konyaalti', slug: 'liman', name: 'Liman' }, { district: 'konyaalti', slug: 'uncali', name: 'Uncalı' }, { district: 'konyaalti', slug: 'altinkum', name: 'Altınkum' },
  { district: 'kepez', slug: 'varsak', name: 'Varsak' }, { district: 'kepez', slug: 'gunes', name: 'Güneş' }, { district: 'kepez', slug: 'yeni-mahalle', name: 'Yeni Mahalle' }, { district: 'kepez', slug: 'sutculer', name: 'Sütçüler' },
  { district: 'aksu', slug: 'kundu', name: 'Kundu' }, { district: 'aksu', slug: 'altintas', name: 'Altıntaş' }, { district: 'aksu', slug: 'pinarli', name: 'Pınarlı' },
  { district: 'dosemealti', slug: 'yesilbayir', name: 'Yeşilbayır' }, { district: 'dosemealti', slug: 'bahceyaka', name: 'Bahçeyaka' }, { district: 'dosemealti', slug: 'altinkale', name: 'Altınkale' },
];

export const otherDistricts = allDistricts.filter(district => !priorityDistricts.some(priority => priority.slug === district.slug));

export const brands = ['Arçelik', 'Beko', 'Altus', 'Bosch', 'Siemens', 'Vestel', 'Regal', 'Seg', 'Baymak', 'Demirdöküm', 'Daikin', 'Mitsubishi Electric', 'LG', 'Samsung', 'TCL', 'Gree', 'Rubenis', 'Sigma', 'Vaillant', 'Cartel', 'Airfel', 'Alarko', 'Copa', 'Toshiba'];

export const services = [
  { slug: 'klima-ariza-tamiri', title: 'Klima Arıza ve Tamiri', text: 'Soğutmama, su akıtma, ses, koku ve çalışma sorunları için arıza tespiti ve onarım.' },
  { slug: 'klima-bakim-temizlik', title: 'Klima Bakım ve Temizlik', text: 'Filtre, iç ünite ve dış ünite bakımıyla verimli ve hijyenik kullanım.' },
  { slug: 'klima-montaj-demontaj', title: 'Klima Montaj ve Demontaj', text: 'Yeni montaj, taşıma ve söküm işlemleri için keşif odaklı hizmet.' },
  { slug: 'klima-gaz-dolumu', title: 'Klima Gaz Dolumu', text: 'Kaçak kontrolü sonrasında cihazın ihtiyacına uygun işlem.' },
  { slug: 'klima-parcalari-aksesuarlari', title: 'Klima Parçaları ve Aksesuarları', text: 'Filtre, drenaj hortumu, boru izolasyonu, montaj aparatı ve klima bağlantı ekipmanları hakkında bilgi.' },
];

export function slugify(value: string) {
  return value.toLocaleLowerCase('tr-TR').replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
