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

const districtBrandEditorial: Record<string, string> = {
  akseki: 'Akseki adreslerinde servis planı yapılırken mahalle ile birlikte açık adres ve ulaşım bilgisi teyit edilir. Özellikle bakım ve montaj taleplerinde cihaz sayısını, iç ünitenin bulunduğu katı ve dış üniteye güvenli erişim koşullarını önceden bildirmek, ziyaret kapsamının doğru belirlenmesine yardımcı olur.',
  aksu: 'Aksu’da konut, iş yeri ve konaklama alanlarının kullanım biçimi cihazın çalışma yoğunluğunu değiştirebilir. Arıza talebinde sorunun hangi alanda ve ne zaman başladığını; birden fazla cihaz varsa ilgili ünitenin bulunduğu oda veya bölümü belirtin. Bakım talebinde cihaz sayısı ile uygun çalışma saatlerini paylaşın.',
  alanya: 'Alanya için servis kaydında adresin bulunduğu mahalle, bina veya tesis içindeki konum ve cihazın kullanım sıklığı birlikte değerlendirilir. Sezonluk kullanılan alanlarda uzun süre kapalı kalma, koku veya ilk çalıştırmada görülen belirtiyi açıklayın. Birden çok cihaz varsa her birinin konumunu ayrı bildirin.',
  demre: 'Demre’de servis talebinizi oluştururken arıza belirtisinin sürekli mi aralıklı mı görüldüğünü ve cihazın hangi çalışma modunda olduğunu ekleyin. Bakım ya da montaj için iç ve dış ünitelerin yerini, bina katını ve erişim durumunu bildirmek iş kapsamının önceden konuşulmasını sağlar.',
  dosemealti: 'Döşemealtı’ndaki müstakil veya çok katlı adreslerde iç ünite ve dış üniteye erişim koşulları farklı olabilir. Talepte kat bilgisini, dış ünitenin konumunu ve varsa birden fazla iç üniteyi belirtin. Böylece arıza incelemesi, bakım süresi veya montaj gereksinimleri randevudan önce değerlendirilebilir.',
  elmali: 'Elmalı’da klima ısıtma amacıyla kullanılıyorsa şikâyetin ısıtma modunda mı, soğutmada mı görüldüğünü bildirin. Düşük dış hava sıcaklığında çalışma koşulları cihazın davranışını etkileyebilir; bu nedenle ayar, hata kodu ve sorunun başlama zamanı birlikte değerlendirilir. Bakımda kullanım dönemi ve son bakım tarihi de yararlıdır.',
  finike: 'Finike adreslerinde dış ünitenin açık alanda mı, kapalı bir balkonda mı bulunduğunu randevu kaydına ekleyin. Performans şikâyetinde yalnızca gaz eksikliği varsayılmaz; hava dolaşımı, filtre ve ünite durumu incelenir. Montaj taleplerinde boru güzergâhı ve drenaj çıkışının yeri önceden konuşulur.',
  gazipasa: 'Gazipaşa’da tek cihazlı konut talebi ile birden fazla ünitenin bulunduğu iş yeri talebinin planı farklı olabilir. Her cihazın marka ve modelini, bulunduğu alanı ve görülen belirtiyi ayrı yazın. Montaj veya yer değişiminde iç-dış ünite mesafesi ile mevcut tesisat bilgisi ilk değerlendirmeye yardımcı olur.',
  gundogmus: 'Gündoğmuş için randevu oluştururken açık adres, mahalle ve ulaşım tarifi bilgilerini eksiksiz paylaşın. Ziyaret uygunluğu teyit edilmeden servis saati kesinleşmiş sayılmaz. Cihaz arızasında hata kodunu ve çalışırken duyulan sesi; bakım veya montajda ise cihaz adedini ve erişim koşullarını bildirin.',
  ibradi: 'İbradı’daki taleplerde adres ve ziyaret uygunluğunu önceden teyit etmek, özellikle birden fazla cihaz veya kapsamlı montaj işi için önemlidir. Arıza kaydına cihazın ne zaman çalıştığını, hangi modda durduğunu ve ekrandaki uyarıyı ekleyin. Dış üniteye erişim ve çalışma alanı koşullarını da paylaşın.',
  kas: 'Kaş’ta sezonluk kullanılan konutlarda uzun süre kapalı kalma sonrasında görülen koku, su tahliyesi veya ilk çalışma davranışını randevu talebinde açıklayın. Cihaz kullanılmayan bir odadaysa bunu ve son bakım zamanını bildirin. Montajda iç ve dış ünite yerleri ile tesisat güzergâhı ayrıca değerlendirilir.',
  kemer: 'Kemer’de konut veya konaklama alanında kullanılan cihaz için talep oluştururken ünitenin oda ya da bölüm bilgisini ve çalışma saatlerini paylaşın. Çoklu cihaz bakımında her ünitenin ayrı ayrı listelenmesi işlem kapsamını netleştirir. Dış ünite ortak teknik alandaysa erişim izni gerekip gerekmediğini önceden belirtin.',
  kepez: 'Kepez’de apartman dairesi, dükkân ve ofis taleplerinde servis planı cihazın bulunduğu kat ve kullanım alanına göre hazırlanır. Soğutmama, su akıtma veya çalışma sesi gibi belirtilerden hangisinin önce başladığını açıklayın. Bakım için cihaz sayısı ve çalışma alanının hazırlanma koşullarını iletin.',
  konyaalti: 'Konyaaltı’ndaki site veya apartman adreslerinde bina giriş, teknik alan ve dış ünite erişim koşullarını randevu öncesinde paylaşın. Cihazın yeterince soğutmaması hâlinde filtre durumu ve hava akışının yanı sıra çalışma ayarları da değerlendirilir. Bakımda drenaj hattı ile dış ünitenin hava geçişi gözden geçirilir.',
  korkuteli: 'Korkuteli’nde klima ısıtma için de kullanılıyorsa dış hava koşulunu, seçilen modu ve cihazın hedef sıcaklığa ulaşıp ulaşmadığını belirtin. Isıtma ve soğutma belirtileri farklı kontrol adımları gerektirebilir. Bakım ya da montaj talebinde cihazın bulunduğu katı ve dış ünite erişimini de kayda ekleyin.',
  kumluca: 'Kumluca’da konut ve iş yeri taleplerinde cihazın gün içindeki çalışma süresi ile arızanın yoğun kullanımda mı ortaya çıktığı bilgisini ekleyin. Birden fazla ünitede sorun varsa hepsinin aynı belirtiyi verip vermediğini belirtin. Montajda boru hattı, drenaj ve dış ünite için uygun konum birlikte planlanır.',
  manavgat: 'Manavgat’ta işletme veya konaklama alanlarında birden fazla klima bulunabilir; talepte sorunlu cihazın oda, bölüm ya da kat bilgisini belirtin. Planlı bakım için ünitelerin listesi ve çalışma saatleri ziyaret kapsamını oluşturmayı kolaylaştırır. Arızada aynı anda etkilenen cihazları ve hata kodlarını ayrı ayrı bildirin.',
  muratpasa: 'Muratpaşa’da apartman, ofis ve ticari alan taleplerinde cihazın bulunduğu kat, dış ünite konumu ve bina erişim koşulları randevu planını etkiler. İşletme çalışma saatleri içinde yapılacak ziyaretler için uygun zaman aralığını bildirin. Arıza kaydında cihazın çalışma modu ve belirtinin başlama zamanı yer alsın.',
  serik: 'Serik’te konut ve ticari kullanım için servis planlarken cihaz sayısı, kullanım saatleri ve ünitelerin bulunduğu alanı paylaşın. Birden fazla cihazda bakım isteniyorsa her birinin erişim koşullarını belirtin. Arıza talebinde belirtilerin tek ünitede mi yoksa aynı adresteki diğer cihazlarda da mı görüldüğünü açıklayın.',
};

export function brandDistrictDescription(brand: string, district?: string) {
  return district
    ? `Antalya ${district} ${brand} klima servisi: arıza tespiti, bakım, montaj ve tamir. Kaya Teknik’ten kapsam ve randevu bilgisi alın.`
    : `Antalya ${brand} klima servisi: arıza tespiti, bakım ve montaj için bağımsız servis. Kaya Teknik’ten randevu bilgisi alın.`;
}

export function brandDistrictPlanningNote(slug: string) {
  return districtBrandEditorial[slug] ?? `${slug} adresindeki klima servis talebinde açık adres, cihazın marka ve model bilgisi ile görülen belirti paylaşılmalıdır. Ziyaret uygunluğu ve işlem kapsamı talep alındıktan sonra teyit edilir.`;
}

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
