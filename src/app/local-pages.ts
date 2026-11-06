import { allDistricts, brands, slugify } from './site-data';
import { copy, type Locale } from './i18n';
import { brandDistrictPlanningNote } from './turkish-editorial';

const localeCopy = {
  tr: {
    service: 'Klima Servisi', repair: 'arıza tespiti ve tamir', care: 'bakım ve temizlik', install: 'montaj ve demontaj', gas: 'gaz dolumu değerlendirmesi',
    request: 'Cihazın marka ve modelini, görülen belirtiyi ve bulunduğunuz mahalleyi paylaşın. İşlem kapsamı ile ziyaret uygunluğu teyit edilerek randevu planlanır.',
    independent: 'Kaya Teknik bağımsız özel servis hizmeti sunar; üretici veya marka temsilciliği iddiasında bulunmaz.',
    codeHub: 'Klima arıza kodu rehberi | Marka ve model açıklamaları',
  },
  en: {
    service: 'Air Conditioning Service', repair: 'fault diagnosis and repair', care: 'maintenance and cleaning', install: 'installation and removal', gas: 'refrigerant system assessment',
    request: 'Share the unit’s brand, model, symptoms and neighbourhood. We confirm the work scope and visit availability before arranging an appointment.',
    independent: 'Kaya Teknik provides independent service and does not claim to represent the manufacturer or brand.',
    codeHub: 'Air Conditioner Error Codes | Brand and Model Guide',
  },
  de: {
    service: 'Klimaservice', repair: 'Fehlerdiagnose und Reparatur', care: 'Wartung und Reinigung', install: 'Montage und Demontage', gas: 'Prüfung des Kältemittelkreislaufs',
    request: 'Teilen Sie Marke, Modell, Symptome und Stadtviertel mit. Leistungsumfang und Terminverfügbarkeit werden vor der Vereinbarung bestätigt.',
    independent: 'Kaya Teknik bietet unabhängigen Service an und beansprucht keine Vertretung des Herstellers oder der Marke.',
    codeHub: 'Klimaanlagen-Fehlercodes | Ratgeber nach Marke und Modell',
  },
  ru: {
    service: 'Сервис кондиционеров', repair: 'диагностика и ремонт', care: 'обслуживание и чистка', install: 'монтаж и демонтаж', gas: 'проверка холодильного контура',
    request: 'Укажите марку и модель устройства, симптомы и микрорайон. Объём работ и возможность выезда подтверждаются до согласования времени.',
    independent: 'Kaya Teknik оказывает независимые услуги и не заявляет о представительстве производителя или марки.',
    codeHub: 'Коды ошибок кондиционеров | Руководство по маркам и моделям',
  },
} satisfies Record<Locale, Record<string, string>>;

const localizedDistrictNotes: Record<Locale, Record<string, string>> = {
  tr: Object.fromEntries(allDistricts.map(d => [d.slug, brandDistrictPlanningNote(d.slug)])),
  en: {
    akseki: 'For Akseki visits, confirm the neighbourhood, full address and access details. For installation or multi-unit work, share the floor and safe access to the outdoor unit.', aksu: 'Homes, workplaces and accommodation in Aksu can have different usage patterns. Identify the room and unit affected, and list each device when requesting maintenance.', alanya: 'For an Alanya request, include the neighbourhood, building area and frequency of use. Mention long periods without operation, odours or first-start symptoms.', demre: 'In Demre, note whether a symptom is constant or intermittent and the operating mode. For maintenance or installation, provide unit locations and access details.', dosemealti: 'At Döşemealtı addresses, access to indoor and outdoor units can vary. Include the floor, outdoor-unit position and the number of indoor units.', elmali: 'If a unit in Elmalı is used for heating, state the selected mode and outdoor conditions when the symptom occurs. Include the last maintenance date.', finike: 'For Finike, mention whether the outdoor unit is in an open or enclosed area. Airflow, filters and unit condition are assessed before refrigerant work is considered.', gazipasa: 'For Gazipaşa, list each device, its model and location, especially at multi-unit sites. Installation requests benefit from details of existing pipework.', gundogmus: 'For Gündoğmuş, provide a complete address and directions. Appointment time is confirmed after access and visit availability are checked.', ibradi: 'In İbradı, confirm address and visit availability in advance. Include the operating history, displayed code and access to the outdoor unit.', kas: 'For seasonal homes in Kaş, describe symptoms after long periods without use, including odour or drainage changes. Note the last maintenance date.', kemer: 'In Kemer, identify the room or business area and suitable working hours. For shared technical areas, confirm any access requirements.', kepez: 'For Kepez apartments and shops, share the floor and unit location. Describe whether cooling, drainage or noise changed first.', konyaalti: 'For Konyaaltı sites, provide building entry and outdoor-unit access details. Airflow and drainage are assessed along with operating settings.', korkuteli: 'If heating is used in Korkuteli, describe the mode, outdoor conditions and whether the unit reaches its target temperature.', kumluca: 'For Kumluca, note daily operating hours and whether symptoms occur under heavy use. List affected units separately.', manavgat: 'For Manavgat businesses with several units, identify each room, floor and affected device. Maintenance requests benefit from a unit list and working hours.', muratpasa: 'For Muratpaşa apartments and commercial spaces, share the floor, outdoor-unit position and building access conditions.', serik: 'For Serik homes and businesses, state the number of units, operating hours and whether other devices at the address show the same symptom.',
  },
  de: {
    akseki: 'Für Einsätze in Akseki bitte Stadtviertel, vollständige Adresse und Zugang nennen. Bei Montage oder mehreren Geräten sind Etage und sicherer Zugang zum Außengerät hilfreich.', aksu: 'Wohnungen, Betriebe und Unterkünfte in Aksu werden unterschiedlich genutzt. Nennen Sie den betroffenen Raum und jedes Gerät bei Wartungsanfragen.', alanya: 'Für Alanya bitte Stadtviertel, Gebäudebereich und Nutzungsintensität angeben. Erwähnen Sie längere Stillstandzeiten, Gerüche oder Auffälligkeiten beim ersten Start.', demre: 'In Demre bitte angeben, ob ein Symptom dauerhaft oder gelegentlich auftritt und welcher Betriebsmodus aktiv ist. Bei Montage sind Standort und Zugang wichtig.', dosemealti: 'In Döşemealtı unterscheiden sich die Zugangsbedingungen zu Innen- und Außengeräten. Teilen Sie Etage, Position des Außengeräts und Geräteanzahl mit.', elmali: 'Wird das Gerät in Elmalı zum Heizen genutzt, nennen Sie Betriebsmodus und Außenbedingungen beim Auftreten des Symptoms sowie den letzten Wartungstermin.', finike: 'Für Finike bitte mitteilen, ob das Außengerät offen oder in einem geschlossenen Bereich steht. Luftstrom, Filter und Gerätezustand werden vor Kältemittelarbeiten geprüft.', gazipasa: 'Für Gazipaşa bitte jedes Gerät mit Modell und Standort aufführen, besonders bei mehreren Einheiten. Bei Montage helfen Angaben zu vorhandenen Leitungen.', gundogmus: 'Für Gündoğmuş bitte vollständige Adresse und Wegbeschreibung angeben. Der Termin wird nach Prüfung von Zugang und Verfügbarkeit bestätigt.', ibradi: 'In İbradı sollten Adresse und Besuchsmöglichkeit vorab bestätigt werden. Teilen Sie Betriebsverlauf, angezeigten Code und Zugang zum Außengerät mit.', kas: 'Für saisonal genutzte Wohnungen in Kaş bitte Symptome nach längerer Stilllegung beschreiben, etwa Geruch oder veränderten Wasserablauf.', kemer: 'In Kemer bitte Raum oder Geschäftsbereich und geeignete Arbeitszeiten nennen. Für gemeinschaftliche Technikräume sind Zugangsvorgaben wichtig.', kepez: 'Für Wohnungen und Geschäfte in Kepez bitte Etage und Gerätestandort nennen. Beschreiben Sie, ob Kühlung, Ablauf oder Geräusch zuerst auffällig wurde.', konyaalti: 'Für Anlagen in Konyaaltı bitte Gebäudezugang und Zugang zum Außengerät mitteilen. Luftstrom und Ablauf werden zusammen mit den Einstellungen geprüft.', korkuteli: 'Wird in Korkuteli geheizt, nennen Sie Modus, Außenbedingungen und ob die Zieltemperatur erreicht wird.', kumluca: 'Für Kumluca bitte tägliche Betriebsdauer und Symptome bei hoher Nutzung nennen. Betroffene Geräte getrennt aufführen.', manavgat: 'Für Betriebe mit mehreren Geräten in Manavgat bitte Raum, Etage und betroffenes Gerät benennen. Eine Geräteliste erleichtert Wartungsplanung.', muratpasa: 'Für Wohnungen und Gewerbe in Muratpaşa bitte Etage, Position des Außengeräts und Zugang zum Gebäude angeben.', serik: 'Für Serik bitte Geräteanzahl, Betriebszeiten und Symptome anderer Geräte an derselben Adresse nennen.',
  },
  ru: {
    akseki: 'Для выезда в Аксеки укажите микрорайон, полный адрес и особенности доступа. Для монтажа или нескольких устройств сообщите этаж и условия доступа к наружному блоку.', aksu: 'Жильё, офисы и гостиничные помещения в Аксу используются по-разному. Укажите комнату и устройство; при обслуживании перечислите все блоки.', alanya: 'Для заявки в Аланье укажите микрорайон, часть здания и интенсивность использования. Сообщите о длительном простое, запахе или симптомах при запуске.', demre: 'В Демре уточните, постоянный ли симптом или периодический, и в каком режиме он возникает. Для монтажа сообщите расположение блоков и доступ.', dosemealti: 'В Дёшемеалты условия доступа к внутреннему и наружному блокам различаются. Укажите этаж, место наружного блока и количество внутренних блоков.', elmali: 'Если кондиционер в Эльмалы используется для обогрева, укажите режим и наружные условия при появлении симптома, а также дату обслуживания.', finike: 'Для Финике сообщите, находится ли наружный блок на открытом месте. До работ с хладагентом проверяются воздушный поток, фильтры и состояние устройства.', gazipasa: 'Для Газипаши перечислите устройства, модели и места установки, особенно если блоков несколько. Для монтажа полезны сведения о существующих трубах.', gundogmus: 'Для Гюндогмуша укажите полный адрес и ориентиры. Время визита подтверждается после проверки доступности и условий доступа.', ibradi: 'В Ибрады заранее уточните адрес и возможность выезда. Сообщите историю работы, код на дисплее и доступ к наружному блоку.', kas: 'Для сезонного жилья в Каше опишите симптомы после долгого простоя, включая запах или изменение отвода воды. Укажите дату последнего обслуживания.', kemer: 'В Кемере укажите комнату или рабочую зону и удобное время. Для общих технических помещений сообщите правила доступа.', kepez: 'Для квартир и магазинов в Кепезе укажите этаж и место установки. Опишите, что проявилось сначала: слабое охлаждение, протечка или шум.', konyaalti: 'Для комплексов в Коньяалты сообщите условия входа в здание и доступа к наружному блоку. Поток воздуха и дренаж оцениваются вместе с настройками.', korkuteli: 'Если в Коркутели кондиционер работает на обогрев, укажите режим, наружные условия и достигает ли устройство заданной температуры.', kumluca: 'Для Кумлуджи сообщите продолжительность ежедневной работы и появляются ли симптомы при высокой нагрузке. Перечислите устройства отдельно.', manavgat: 'Для объектов с несколькими блоками в Манавгате укажите помещение, этаж и неисправное устройство. Список блоков помогает спланировать обслуживание.', muratpasa: 'Для квартир и коммерческих помещений в Муратпаше укажите этаж, положение наружного блока и условия доступа в здание.', serik: 'Для Серика сообщите количество устройств, график работы и проявляются ли симптомы у других блоков по тому же адресу.',
  },
};

export type LocalPage = { kind: 'overview' | 'brand-service' | 'service-landing'; locale: Locale; place?: string; districtSlug?: string; brand?: string; serviceIndex?: number; title: string; description: string; paragraphs: string[] };

export function resolveLocalPage(locale: Locale, slug: string[]): LocalPage | undefined {
  const serviceIndex = slug.at(-1) === 'klima-bakim-servisi' ? 1 : slug.at(-1) === 'klima-montaj-servisi' ? 2 : -1;
  const serviceDistrict = slug.length >= 3 ? allDistricts.find(value => value.slug === slug[1]) : undefined;
  const serviceCityBrand = slug.length === 3 ? brands.find(value => slugify(value) === slug[1]) : undefined;
  const serviceDistrictBrand = slug.length === 4 && serviceDistrict ? brands.find(value => slugify(value) === slug[2]) : undefined;
  const serviceRoute = slug[0] === 'antalya' && serviceIndex >= 0 && (
    slug.length === 2 ||
    (slug.length === 3 && Boolean(serviceDistrict || serviceCityBrand)) ||
    (slug.length === 4 && Boolean(serviceDistrictBrand))
  );
  if (serviceRoute) {
    const district = (slug.length === 3 && serviceDistrict) || (slug.length === 4 && serviceDistrict) ? serviceDistrict : undefined;
    const brand = serviceCityBrand ?? serviceDistrictBrand;
    const t = copy[locale];
    const place = district ? `${district.name}, Antalya` : 'Antalya';
    const serviceName = t.serviceTitles[serviceIndex];
    const description = `${place}: ${brand ? `${brand} ` : ''}${t.serviceTexts[serviceIndex]} ${t.availability}`;
    const title = locale === 'tr'
      ? `Antalya ${district ? `${district.name} ` : ''}${brand ? `${brand} ` : ''}${serviceName} | Aynı Gün Klima Servis Hizmeti`
      : `${brand ? `${brand} ` : ''}${serviceName} | ${place} | Kaya Teknik`;
    return {
      kind: 'service-landing', locale, place, ...(district ? { districtSlug: district.slug } : {}), ...(brand ? { brand } : {}), serviceIndex, title, description,
      paragraphs: [description, brand ? `${brand}: ${t.evaluationText}` : t.evaluationText, t.requestText, ...(locale === 'tr' ? ['7/24 mobil servis hattından talep bırakabilirsiniz. Aynı gün ziyaret, adres ve ekip uygunluğu doğrulanınca planlanır.', 'Kullanılacak parçalar ile işçilik kapsamı ve varsa garanti koşulları işlem başlamadan önce yazılı olarak paylaşılır.'] : []), t.independent],
    };
  }

  // Brand service URL families; retain the existing URLs and add Antalya and
  // district scoped variants such as /antalya/kepez/bosch/klima-servisi.
  const suffixBrandSlug = slug.length === 1
    ? slug[0].endsWith('-klima-servisi') ? slug[0].slice(0, -'-klima-servisi'.length)
      : slug[0].endsWith('-servisi') ? slug[0].slice(0, -'-servisi'.length)
        : undefined
    : undefined;
  const suffixedBrandRoute = Boolean(suffixBrandSlug);
  const bareBrandRoute = slug.length === 1 && !suffixedBrandRoute && slug[0] !== 'antalya';
  const shortBrandRoute = slug.length === 2 && (slug[1] === 'klima-servisi' || slug[1] === 'servisi');
  const antalyaBrandRoute = slug[0] === 'antalya' && slug.at(-1) === 'klima-servisi' && (slug.length === 3 || slug.length === 4);
  const districtSuffixedBrandRoute = slug[0] === 'antalya' && slug.length === 3 && slug[2].endsWith('-klima-servisi');
  const districtBareBrandRoute = slug[0] === 'antalya' && slug.length === 3 && allDistricts.some(value => value.slug === slug[1]) && brands.some(value => slugify(value) === slug[2]);
  const districtSlashServiceRoute = slug[0] === 'antalya' && slug.length === 4 && slug[3] === 'servisi' && brands.some(value => slugify(value) === slug[2]);
  const districtKlimaRoute = slug[0] === 'antalya' && slug.length === 4 && slug[3] === 'klima' && allDistricts.some(value => value.slug === slug[1]) && brands.some(value => slugify(value) === slug[2]);
  const routeDistrict = (districtKlimaRoute || districtSlashServiceRoute || districtSuffixedBrandRoute || districtBareBrandRoute || antalyaBrandRoute && slug.length === 4) ? allDistricts.find(value => value.slug === slug[1]) : undefined;
  const shortRouteBrandSlug = suffixedBrandRoute ? suffixBrandSlug : bareBrandRoute ? slug[0] : shortBrandRoute ? slug[0] : districtKlimaRoute ? slug[2] : districtSlashServiceRoute ? slug[2] : districtBareBrandRoute ? slug[2] : districtSuffixedBrandRoute ? slug[2].slice(0, -'-klima-servisi'.length) : antalyaBrandRoute ? slug.length === 3 ? slug[1] : slug[2] : undefined;
  if (suffixedBrandRoute || bareBrandRoute || shortBrandRoute || districtBareBrandRoute || districtSlashServiceRoute || districtKlimaRoute || districtSuffixedBrandRoute || antalyaBrandRoute) {
    if ((districtBareBrandRoute || districtSlashServiceRoute || districtKlimaRoute || districtSuffixedBrandRoute || antalyaBrandRoute && slug.length === 4) && !routeDistrict) return undefined;
    const brand = brands.find(value => slugify(value) === shortRouteBrandSlug);
    if (!brand) return undefined;
    const area = routeDistrict ? `${routeDistrict.name}, Antalya` : 'Antalya';
    const content: Record<Locale, { title: string; description: string; paragraphs: string[] }> = {
      tr: {
        title: `${routeDistrict ? `Antalya ${routeDistrict.name}` : 'Antalya'} ${brand} Klima Servisi | 7/24 Klima Servis`,
        description: `${area} ${brand} klima servisi: arıza tespiti, bakım, temizlik ve montaj talepleri. Model ve belirti bilgisiyle hizmet kapsamı ile randevu uygunluğunu öğrenin.`,
        paragraphs: [`${routeDistrict ? `Antalya ${routeDistrict.name} ilçesinde` : 'Antalya genelinde'} ${brand} klimanız için arıza tespiti, bakım, temizlik ve montaj taleplerinizi iletebilirsiniz. Yapılacak işlem; cihazın tam modeli, belirtiler ve teknik kontrol sonrasında netleştirilir.`, `${brand} klima arızasında model etiketi, ekranda görülen kod ve sorunun ne zaman başladığı doğru değerlendirmeye yardımcı olur. Hata kodları seri ve modele göre değişebildiğinden yalnızca koda bakılarak parça veya onarım kararı verilmez.`, routeDistrict ? localizedDistrictNotes[locale][routeDistrict.slug] : 'Talep oluştururken bulunduğunuz ilçe ve mahalleyi, cihaz sayısını, iç ve dış ünite modellerini ve dış üniteye erişim koşullarını paylaşın. Ziyaret ve randevu uygunluğu başvuru sırasında teyit edilir.', '7/24 mobil servis hattından talep bırakabilirsiniz. Aynı gün ziyaret, adres ve ekip uygunluğu doğrulanınca planlanır. Kullanılacak parçalar ile işçilik kapsamı ve varsa garanti koşulları işlem başlamadan önce yazılı olarak paylaşılır.', `Kaya Teknik bağımsız özel servistir; ${brand} üreticisinin yetkili servisi veya resmi temsilcisi değildir. Garanti kapsamındaki cihazlarda üreticinin garanti koşullarını ve yetkili servis kanalını değerlendirin.`],
      },
      en: {
        title: `${brand} Air Conditioner Service in ${area} | Kaya Teknik`,
        description: `${brand} air conditioner service in ${area} for fault diagnosis, maintenance, cleaning and installation. Share the model and symptoms to discuss scope and availability.`,
        paragraphs: [`Request fault diagnosis, maintenance, cleaning or installation for your ${brand} air conditioner in ${area}. The work is determined after the exact model, symptoms and technical condition are reviewed.`, `The model label, any displayed code and when the issue began help with assessment. Error codes can vary by series and model, so a code alone does not determine a part or repair.`, routeDistrict ? localizedDistrictNotes[locale][routeDistrict.slug] : 'When enquiring, share your district and neighbourhood, number of units, indoor and outdoor model numbers, and access conditions for the outdoor unit. Visit and appointment availability are confirmed when you enquire.', `Kaya Teknik is an independent service provider and is not an authorised ${brand} service centre or official representative. For units under warranty, check the manufacturer's warranty terms and authorised service channel.`],
      },
      de: {
        title: `${brand} Klimaservice in ${area} | Kaya Teknik`,
        description: `${brand} Klimaservice in ${area} für Fehlerdiagnose, Wartung, Reinigung und Montage. Teilen Sie Modell und Symptome zur Klärung des Umfangs und Termins mit.`,
        paragraphs: [`Für Ihre ${brand} Klimaanlage in ${area} können Sie Fehlerdiagnose, Wartung, Reinigung oder Montage anfragen. Der Leistungsumfang wird nach Prüfung von genauem Modell, Symptomen und Gerätezustand festgelegt.`, `Typenschild, angezeigter Fehlercode und Beginn des Problems helfen bei der Beurteilung. Fehlercodes können sich je nach Serie und Modell unterscheiden; ein Code allein bestimmt weder Ersatzteil noch Reparatur.`, routeDistrict ? localizedDistrictNotes[locale][routeDistrict.slug] : 'Nennen Sie bei der Anfrage Bezirk und Stadtviertel, Anzahl der Geräte, Modellnummern von Innen- und Außengerät sowie die Zugangsmöglichkeiten zum Außengerät. Einsatz und Termin werden bei der Anfrage bestätigt.', `Kaya Teknik ist ein unabhängiger Servicebetrieb und weder autorisierter ${brand} Kundendienst noch offizielle Vertretung. Bei Geräten in der Garantiezeit prüfen Sie bitte die Garantiebedingungen des Herstellers und den autorisierten Kundendienst.`],
      },
      ru: {
        title: `Сервис кондиционеров ${brand}: ${area} | Kaya Teknik`,
        description: `Сервис кондиционеров ${brand} в регионе ${area}: диагностика, обслуживание, чистка и монтаж. Сообщите модель и симптомы, чтобы уточнить объём работ и возможность выезда.`,
        paragraphs: [`В регионе ${area} можно оставить заявку на диагностику, обслуживание, чистку или монтаж кондиционера ${brand}. Объём работ определяется после проверки точной модели, симптомов и состояния устройства.`, `Для оценки полезны данные с шильдика, код на дисплее и информация о том, когда возникла проблема. Значение кода зависит от серии и модели, поэтому по одному коду нельзя выбрать деталь или ремонт.`, routeDistrict ? localizedDistrictNotes[locale][routeDistrict.slug] : 'При обращении укажите район и микрорайон, количество устройств, модели внутреннего и наружного блоков и условия доступа к наружному блоку. Возможность и время выезда подтверждаются при обращении.', `Kaya Teknik — независимый сервис, не являющийся авторизованным сервисным центром или официальным представителем ${brand}. Для устройств на гарантии уточните условия производителя и обратитесь в авторизованный сервис.`],
      },
    };
    return { kind: 'brand-service', locale, place: area, ...(routeDistrict ? { districtSlug: routeDistrict.slug } : {}), brand, ...content[locale] };
  }

  if (slug[0] !== 'antalya') return undefined;
  const district = allDistricts.find(value => value.slug === slug[1]);
  if (slug.length === 1 || (slug.length === 2 && district)) {
    const place = district?.name ?? 'Antalya';
    const placeLabel = district ? `${place}, Antalya` : 'Antalya';
    const titles: Record<Locale, string> = { tr: `${district ? `Antalya ${place}` : place} Klima Servis Bölgeleri | Kaya Teknik`, en: `Air Conditioning Service Areas in ${placeLabel} | Kaya Teknik`, de: district ? `Klimaservicegebiete in ${placeLabel} | Kaya Teknik` : 'Klimaservice Antalya: Bezirke und Orte | Kaya Teknik', ru: `Зоны обслуживания кондиционеров: ${placeLabel} | Kaya Teknik` };
    const descriptions: Record<Locale, string> = {
      tr: `${district ? `Antalya ${place}` : place} klima servisi için arıza, bakım, temizlik ve montaj taleplerini inceleyin. Marka, model ve mahalle bilgisiyle ziyaret uygunluğunu teyit edin.`,
      en: `Explore air conditioning repair, maintenance, cleaning and installation in ${placeLabel}. Share your model and neighbourhood to confirm visit availability.`,
      de: `Informationen zu Reparatur, Wartung, Reinigung und Montage von Klimaanlagen in ${placeLabel}. Modell und Stadtviertel zur Terminprüfung mitteilen.`,
      ru: `Ремонт, обслуживание, чистка и монтаж кондиционеров в зоне ${placeLabel}. Укажите модель и микрорайон, чтобы уточнить возможность выезда.`,
    };
    return { kind: 'overview', locale, place, ...(district ? { districtSlug: district.slug } : {}), title: titles[locale], description: descriptions[locale], paragraphs: [descriptions[locale], localeCopy[locale].independent] };
  }
  const serviceTail = slug.at(-1);
  const brandRoute = slug.length === (district ? 5 : 4) && slug.at(-2) === 'klima' && (serviceTail === 'servis' || (Boolean(district) && serviceTail === 'servisi'));
  if (!brandRoute) return undefined;
  const brandSlug = district ? slug[2] : slug[1];
  const brand = brands.find(value => slugify(value) === slugify(brandSlug));
  if (!brand) return undefined;
  const place = district?.name ?? 'Antalya';
  const placeLabel = district ? `${place}, Antalya` : 'Antalya';
  const titles: Record<Locale, string> = {
    tr: `${district ? `Antalya ${place}` : place} ${brand} Klima Servisi | 7/24 Klima Servis`,
    en: `${brand} Air Conditioner Repair Service in ${placeLabel} | Kaya Teknik`,
    de: `${brand} Klimareparatur und Service in ${placeLabel} | Kaya Teknik`,
    ru: `${brand}: ремонт и сервис кондиционеров — ${placeLabel} | Kaya Teknik`,
  };
  const descriptions: Record<Locale, string> = {
    tr: `${district ? `Antalya ${place}` : place} ${brand} klima servisi: arıza tespiti, bakım, temizlik ve montaj. Model ve mahalle bilgisiyle hizmet kapsamı ve randevu uygunluğunu öğrenin.`,
    en: `${brand} air conditioner service in ${placeLabel}: fault diagnosis, maintenance, cleaning and installation. Share the model and neighbourhood to discuss scope and appointments.`,
    de: `${brand} Klimaservice in ${placeLabel}: Fehlerdiagnose, Wartung, Reinigung und Montage. Mit Modell und Stadtviertel Leistungsumfang und Termin klären.`,
    ru: `Сервис кондиционеров ${brand} в регионе ${placeLabel}: диагностика, обслуживание, чистка и монтаж. Сообщите модель и микрорайон для уточнения работ и времени.`,
  };
  const cityNotes: Record<Locale, string> = {
    tr: `Antalya genelinde adres, mahalle, cihaz adedi ve dış üniteye erişim koşulları servis ziyaretinin planlanmasına yardımcı olur. İlçe ve randevu uygunluğu talep sırasında teyit edilir.`,
    en: 'Across Antalya, the address, neighbourhood, number of units and access to the outdoor unit help determine visit planning. District coverage and appointment availability are confirmed when you enquire.',
    de: 'In Antalya helfen Adresse, Stadtviertel, Geräteanzahl und Zugang zum Außengerät bei der Einsatzplanung. Bezirk und Terminverfügbarkeit werden bei der Anfrage bestätigt.',
    ru: 'В Анталье для планирования выезда важны адрес, микрорайон, количество устройств и доступ к наружному блоку. Район обслуживания и время подтверждаются при обращении.',
  };
  const localNote = district ? localizedDistrictNotes[locale][district.slug] : cityNotes[locale];
  const paragraphs: string[] = locale === 'tr'
    ? [`Antalya ${place} ilçesinde ${brand} klima için ${localeCopy[locale].repair}, ${localeCopy[locale].care}, ${localeCopy[locale].install} ve soğutucu devre değerlendirmesi talep edebilirsiniz. Hizmet, cihazın tam modeli ve mevcut durumu incelendikten sonra kapsamlandırılır.`, `${brand} cihazlarda ekranda görülen kodu, model etiketindeki bilgiyi ve belirtinin ne zaman başladığını birlikte iletin. Kodun anlamı seri ve modele göre değişebileceğinden, doğrulanmamış kod bilgisiyle parça veya işlem kararı verilmez.`, localNote, localeCopy[locale].request, localeCopy[locale].independent]
    : [`${brand} air conditioners in ${place} can be assessed for ${localeCopy[locale].repair}, ${localeCopy[locale].care}, ${localeCopy[locale].install} and refrigerant-circuit concerns. The service scope is set after the exact model and current condition are reviewed.`, `When reporting a ${brand} display code, include the full model label and when the symptom began. Code meanings can vary by series; an unverified code alone does not determine a part or repair.`, localNote, localeCopy[locale].request, localeCopy[locale].independent];
  return { kind: 'brand-service', locale, place, ...(district ? { districtSlug: district.slug } : {}), brand, title: titles[locale], description: descriptions[locale], paragraphs };
}

export function localBrandPaths() {
  return allDistricts.flatMap(district => brands.map(brand => `/antalya/${district.slug}/${slugify(brand)}/klima/servis`))
    .concat(brands.map(brand => `/antalya/${slugify(brand)}/klima/servis`))
    .concat(brands.map(brand => `/${slugify(brand)}/klima-servisi`))
    .concat(brands.map(brand => `/${slugify(brand)}/servisi`))
    .concat(brands.map(brand => `/${slugify(brand)}`))
    .concat(brands.map(brand => `/${slugify(brand)}-servisi`))
    .concat(brands.map(brand => `/${slugify(brand)}-klima-servisi`))
    .concat(brands.flatMap(brand => allDistricts.map(district => `/antalya/${district.slug}/${slugify(brand)}-klima-servisi`)))
    .concat(allDistricts.flatMap(district => brands.map(brand => `/antalya/${district.slug}/${slugify(brand)}`)))
    .concat(allDistricts.flatMap(district => brands.map(brand => `/antalya/${district.slug}/${slugify(brand)}/servisi`)))
    .concat(brands.flatMap(brand => allDistricts.map(district => `/antalya/${district.slug}/${slugify(brand)}/klima-servisi`)))
    .concat(allDistricts.flatMap(district => brands.map(brand => `/antalya/${district.slug}/${slugify(brand)}/klima/servisi`)))
    .concat(allDistricts.flatMap(district => brands.map(brand => `/antalya/${district.slug}/${slugify(brand)}/klima`)))
    .concat(brands.map(brand => `/antalya/${slugify(brand)}/klima-servisi`));
}

export function localOverviewPaths() { return ['/antalya', ...allDistricts.map(district => `/antalya/${district.slug}`)]; }

export function localServicePaths() {
  const serviceSlugs = ['klima-bakim-servisi', 'klima-montaj-servisi'];
  return serviceSlugs.flatMap(service => [
    `/antalya/${service}`,
    ...allDistricts.map(district => `/antalya/${district.slug}/${service}`),
    ...brands.map(brand => `/antalya/${slugify(brand)}/${service}`),
    ...allDistricts.flatMap(district => brands.map(brand => `/antalya/${district.slug}/${slugify(brand)}/${service}`)),
  ]);
}
