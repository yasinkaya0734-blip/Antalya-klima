const brandEditorial: Record<string, string> = {
  'Arçelik': 'Arçelik klima talebinde, iç ünitedeki belirti ile kumanda ekranındaki uyarının birlikte not edilmesi model bazlı değerlendirmeyi kolaylaştırır.',
  'Beko': 'Beko klima için çalışma modu, soğutma performansı ve su akıtma gibi belirtilerin ne zaman başladığı paylaşılırsa süreç daha sağlıklı planlanır.',
  'Altus': 'Altus klima cihazlarında talep oluştururken cihazın kapasitesi, modeli ve kullanım sürecinde fark edilen ses veya koku gibi değişiklikler belirtilmelidir.',
  'Bosch': 'Bosch klima ekranındaki kod, kumanda uyarısı ve cihazın çalışma davranışı birlikte değerlendirilir; yalnızca kod üzerinden işlem önerilmez.',
  'Siemens': 'Siemens klima için bakım veya tamir talebinde filtre durumu, iç ünite hava akışı ve dış ünitenin çalışma sesi hakkında bilgi yararlıdır.',
  'Vestel': 'Vestel klima cihazında soğutmama, sıcaklık dengesizliği veya drenaj sorunu varsa marka–model bilgisiyle birlikte talep iletilmelidir.',
  'Regal': 'Regal klima bakımında kullanım yoğunluğu, filtre temizliği geçmişi ve cihazın bulunduğu ortam koşulları göz önünde bulundurulur.',
  'Seg': 'Seg klima talebinde montaj tarihi, tesisatın görünür durumu ve cihazın verdiği tepki; hizmet türünün belirlenmesine yardımcı olur.',
  'Baymak': 'Baymak klima cihazında arıza belirtisi tarif edilirken iç ve dış ünitenin çalışıp çalışmadığı ile kumanda ayarları birlikte paylaşılmalıdır.',
  'Demirdöküm': 'Demirdöküm klima için bakım, montaj veya tamir ihtiyacında cihazın modeli ve mevcut tesisat koşulları ayrı ayrı değerlendirilir.',
  'Daikin': 'Daikin klima talebinde görülen uyarı, soğutma değişimi ve periyodik bakım geçmişi; teknik incelemenin kapsamını belirlemeye yardımcı olur.',
  'Mitsubishi Electric': 'Mitsubishi Electric klima için seri ve model bilgisi, ekrandaki uyarı ile birlikte paylaşıldığında uyumlu teknik değerlendirme yapılabilir.',
  'LG': 'LG klima cihazında hava üfleme, ses veya koku değişikliği varsa cihazın çalışma modu ve kullanım koşullarıyla birlikte bildirilmelidir.',
  'Samsung': 'Samsung klima için talep oluştururken cihazın ne zaman ve hangi modda sorun verdiği ile varsa ekran uyarısı not edilmelidir.',
  'TCL': 'TCL klima bakım veya arıza talebinde cihazın iç ünite temizliği, drenaj belirtisi ve performans değişimi göz önünde bulundurulur.',
  'Gree': 'Gree klima için montaj, bakım veya tamir ihtiyacı değerlendirilirken cihazın model bilgisi ile tesisatın durumu birlikte incelenir.',
  'Rubenis': 'Rubenis klima cihazında düzensiz çalışma, ses veya soğutma değişimi için belirtilerin süresi ve kullanım şekli açıklanmalıdır.',
  'Sigma': 'Sigma klima talebinde arıza kodu varsa kodun tamamı, cihazın modeli ve eşlik eden belirti birlikte paylaşılmalıdır.',
  'Vaillant': 'Vaillant klima için bakım planlamasında filtre, hava akışı ve kullanım yoğunluğu; işlem ihtiyacını belirleyen temel bilgilerdendir.',
  'Cartel': 'Cartel klima cihazında tamir talebi öncesinde cihazın açılıp açılmadığı, üfleme durumu ve görülen belirti değerlendirilir.',
  'Airfel': 'Airfel klima için gaz veya performans şikâyetinde önce kaçak ihtimali ve cihazın genel çalışma durumu gözden geçirilir.',
  'Alarko': 'Alarko klima talebinde marka–model bilgisi, montaj konumu ve kullanım sırasında fark edilen değişiklikler bildirilmelidir.',
  'Copa': 'Copa klima için cihazın bakım geçmişi, mevcut çalışma sorunu ve talep edilen hizmet türü birlikte paylaşılmalıdır.',
  'Toshiba': 'Toshiba klima cihazında model bilgisi, ekran uyarısı ve soğutma performansındaki değişim; doğru yönlendirme için önemlidir.',
};

const districtEditorial: Record<string, string> = {
  'Muratpaşa': 'Muratpaşa içinde talep planlanırken mahalle, bina tipi ve cihazın bulunduğu alan bilgisi; uygun randevu sürecinin değerlendirilmesine yardımcı olur.',
  'Konyaaltı': 'Konyaaltı için klima talebinde cihazın kullanım yoğunluğu, bakım geçmişi ve görülen belirti birlikte aktarılmalıdır.',
  'Kepez': 'Kepez ilçesinde arıza, bakım veya montaj ihtiyacında açık mahalle bilgisi ile klima marka–modelinin paylaşılması süreç için önemlidir.',
  'Aksu': 'Aksu genelindeki talep değerlendirmesinde cihazın konumu, mevcut çalışma durumu ve istenen hizmet türü ayrı ayrı dikkate alınır.',
  'Döşemealtı': 'Döşemealtı için servis talebinde cihazın kapasitesi, tesisat durumu ve kullanım sırasında gözlenen değişiklikler aktarılmalıdır.',
};

const neighborhoodEditorial: Record<string, string> = {
  'lara': 'Lara bölgesi için talepte cihazın bulunduğu alan ve hava akışındaki değişim belirtilmelidir.', 'fener': 'Fener Mahallesi için bakım veya tamir ihtiyacında model bilgisi ve görülen belirti birlikte değerlendirilir.', 'caglayan': 'Çağlayan Mahallesi için montaj talebinde iç ve dış ünite konumu hakkında bilgi yararlıdır.', 'guzeloba': 'Güzeloba Mahallesi için klima arızasında çalışma modu ile sorun başlangıç zamanı not edilmelidir.', 'sirinyali': 'Şirinyalı Mahallesi için cihazın soğutma performansı ve drenaj belirtisi talep sırasında paylaşılmalıdır.',
  'hurma': 'Hurma Mahallesi için klima bakımında filtre durumu ve kullanım sıklığı değerlendirilir.', 'liman': 'Liman Mahallesi için tamir talebinde ses, koku veya su akıtma gibi belirtiler ayrıntılandırılmalıdır.', 'uncali': 'Uncalı Mahallesi için montaj veya yer değişimi talebinde mevcut tesisat koşulları dikkate alınır.', 'altinkum': 'Altınkum Mahallesi için klima arıza sürecinde cihazın marka–model bilgisi ilk değerlendirmeyi kolaylaştırır.',
  'varsak': 'Varsak bölgesi için talep oluştururken cihazın kapasitesi ve mevcut çalışma sorunu paylaşılmalıdır.', 'gunes': 'Güneş Mahallesi için bakım ihtiyacında filtre, iç ünite ve hava akışıyla ilgili bilgiler yararlıdır.', 'yeni-mahalle': 'Yeni Mahalle için klima tamiri talebinde görülen uyarı ile cihazın çalışma davranışı birlikte aktarılmalıdır.', 'sutculer': 'Sütçüler Mahallesi için montaj talebinde cihaz konumu ve tesisat ihtiyacı değerlendirilir.',
  'kundu': 'Kundu Mahallesi için klima servis talebinde kullanım yoğunluğu ve performans değişimi belirtilmelidir.', 'altintas': 'Altıntaş Mahallesi için cihazın modeli, çalışma modu ve arıza belirtisi randevu planlamasına yardımcı olur.', 'pinarli': 'Pınarlı Mahallesi için bakım veya montaj talebinde klima tipi ve konum bilgisi paylaşılmalıdır.',
  'yesilbayir': 'Yeşilbayır Mahallesi için arıza talebinde cihazın açılıp açılmadığı ve üfleme durumu belirtilmelidir.', 'bahceyaka': 'Bahçeyaka Mahallesi için klima bakımı değerlendirilirken cihazın kullanım geçmişi dikkate alınır.', 'altinkale': 'Altınkale Mahallesi için montaj ya da tamir ihtiyacında marka, model ve tesisat bilgisi gereklidir.',
};

export function pageEditorial({ brand, district, neighborhood, neighborhoodName }: { brand?: string; district?: string; neighborhood?: string; neighborhoodName?: string }) {
  if (brand) return brandEditorial[brand] ?? brandServiceNote(brand);
  if (neighborhood) return neighborhoodEditorial[neighborhood] ?? `${neighborhoodName ?? neighborhood} bölgesi için cihaz bilgisi ve talep türü birlikte değerlendirilir.`;
  if (district) return districtEditorial[district] ?? districtServiceNote(district);
  return 'Antalya genelinde klima hizmeti talebinde cihazın marka, model ve mevcut belirtisinin paylaşılması doğru değerlendirmeye yardımcı olur.';
}

function brandServiceNote(brand: string) {
  const notes = [
    'Cihazın çalışma modu, filtre durumu, iç ve dış ünitenin gözle görülen belirtileri birlikte değerlendirilir.',
    'Soğutma performansı, ses, koku, su damlatma ve kumanda uyarıları talep öncesinde paylaşılmalıdır.',
    'Bakım, montaj ve gaz işlemlerinde cihazın modeli ile mevcut tesisatın durumu birlikte kontrol edilir.',
    'Ekrandaki arıza kodu tek başına yeterli olmayabilir; kod, model numarası ve belirtiler beraber not edilmelidir.',
  ];
  const index = [...brand].reduce((total, character) => total + character.charCodeAt(0), 0) % notes.length;
  return notes[index];
}

function districtServiceNote(district: string) {
  return `${district} için hizmet talebinde bulunduğunuz mahalleyi, klima markasını ve cihazdaki belirtiyi paylaşmanız randevu uygunluğunun daha doğru değerlendirilmesine yardımcı olur.`;
}

export function brandNeighborhoodNote(brand: string, district: string, neighborhood: string) {
  const notes = [
    `${brand} klima için ${district} ${neighborhood} Mahallesi talebinde, cihazın çalışma modu ile soğutma performansındaki değişimin birlikte belirtilmesi ilk değerlendirmeyi kolaylaştırır.`,
    `${neighborhood} Mahallesi'nde ${brand} klima bakım veya tamir ihtiyacında, filtre durumu, hava akışı ve varsa kumanda ekranındaki uyarı not edilmelidir.`,
    `${district} ${neighborhood} bölgesinde ${brand} klima için montaj, demontaj ya da yer değişimi talebinde iç ünite, dış ünite ve tesisat konumu ayrı ayrı değerlendirilir.`,
    `${brand} klima cihazında su akıtma, ses, koku veya düzensiz çalışma görüldüğünde ${neighborhood} Mahallesi bilgisiyle birlikte sorunun başlangıç zamanı paylaşılmalıdır.`,
    `${district} ${neighborhood} Mahallesi'ndeki ${brand} klima talebinde model bilgisi ve arıza kodu varsa kodun tamamı; hizmet sürecinin daha doğru planlanmasına yardımcı olur.`,
    `${neighborhood} Mahallesi için ${brand} klima gaz veya performans şikâyetinde, işlem önerilmeden önce cihazın genel çalışma durumu ve kaçak ihtimali değerlendirilir.`,
  ];
  const key = `${brand}-${district}-${neighborhood}`;
  const index = [...key].reduce((total, character) => total + character.charCodeAt(0), 0) % notes.length;
  return notes[index];
}
