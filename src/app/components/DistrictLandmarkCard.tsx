import Image from 'next/image';
import Link from 'next/link';
import landmarks from '../../data/district-landmarks.json';
import { areaTitle, copy, type Locale } from '../i18n';

const labels = {
 tr: { map: 'Fotoğraftaki yerin konumu', source: 'Fotoğraf kaynağı', intro: 'İlçelerimizi tanıtan yerleri keşfedin. Fotoğraflardaki yerlerin harita bağlantıları servis şubesi konumu değildir. Hizmet bilgileri için ilçe adına dokunun.', modified: 'Web için boyutlandırıldı ve WebP biçimine dönüştürüldü; kartta kadrajlanabilir.' },
 en: { map: 'Location shown in the photo', source: 'Photo credit', intro: 'Discover places that represent our districts. The map links locate the photographed places, not service branches. Select a district name for service information.', modified: 'Resized and converted to WebP for the web; may be cropped within the card.' },
 de: { map: 'Standort des Fotomotivs', source: 'Bildnachweis', intro: 'Entdecken Sie Orte, die unsere Bezirke vorstellen. Die Kartenlinks zeigen die abgebildeten Orte, keine Serviceniederlassungen. Wählen Sie einen Bezirksnamen für Serviceinformationen.', modified: 'Für das Web verkleinert und in WebP umgewandelt; im Kartenformat gegebenenfalls beschnitten.' },
 ru: { map: 'Место на фотографии', source: 'Источник фотографии', intro: 'Познакомьтесь с местами наших районов. Ссылки на карту указывают места на фотографиях, а не филиалы сервиса. Выберите название района для информации об обслуживании.', modified: 'Размер изменён, формат преобразован в WebP; при показе в карточке возможна обрезка.' },
};
export function LandmarkIntro({ locale }: { locale: Locale }) {
 return <p className="lead landmark-intro">{labels[locale].intro}</p>;
}
export default function DistrictLandmarkCard({ locale, district }: { locale: Locale; district: { slug: string; name: string } }) {
 const photo = landmarks[district.slug as keyof typeof landmarks];
 const t = labels[locale];
 return <article className="card landmark-card" data-district={district.slug}>
  <Link className="landmark-service-link" href={`/${locale}/ilceler/${district.slug}`}>
   <Image src={photo.image} alt={`${photo.name[locale]} — ${district.name}, Antalya`} width={photo.width} height={photo.height} sizes="(max-width: 760px) calc(100vw - 32px), (max-width: 1152px) 30vw, 360px" loading="lazy"/>
   <h3>{areaTitle(locale, `Antalya ${district.name}`)}</h3>
  </Link>
  <div className="landmark-body">
   <p className="landmark-name">{photo.name[locale]}</p>
   <p>{copy[locale].areaIntro}</p>
   <a className="landmark-map" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(photo.mapQuery)}`} target="_blank" rel="noopener noreferrer">{t.map} ↗</a>
   <details className="landmark-credit"><summary>{t.source}</summary><p>{photo.author} · <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer">{photo.license}</a></p><p><a href={photo.source} target="_blank" rel="noopener noreferrer">{photo.sourceTitle.replace(/^File:/, '')} — Wikimedia Commons</a></p><p>{t.modified}</p></details>
  </div>
 </article>;
}
