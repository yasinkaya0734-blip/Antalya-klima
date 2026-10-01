import Image from 'next/image';
import Link from 'next/link';
import landmarks from '../../data/district-landmarks.json';
import { areaTitle, copy, type Locale } from '../i18n';

const labels = {
 tr: { map: 'Fotoğraftaki yerin konumu', source: 'Fotoğraf kaynağı', intro: 'İlçelerimizi tanıtan yerleri keşfedin. Fotoğraflarda gösterilen yerler servis şubesi değildir. Hizmet bilgileri için ilçe adına dokunun.', modified: 'Web için boyutlandırıldı ve WebP biçimine dönüştürüldü; kartta kadrajlanabilir.' },
 en: { map: 'Location shown in the photo', source: 'Photo credit', intro: 'Discover places that represent our districts. The photographed places are local landmarks, not service branches. Select a district name for service information.', modified: 'Resized and converted to WebP for the web; may be cropped within the card.' },
 de: { map: 'Standort des Fotomotivs', source: 'Bildnachweis', intro: 'Entdecken Sie Orte, die unsere Bezirke vorstellen. Die abgebildeten Orte sind Sehenswürdigkeiten, keine Serviceniederlassungen. Wählen Sie einen Bezirksnamen für Serviceinformationen.', modified: 'Für das Web verkleinert und in WebP umgewandelt; im Kartenformat gegebenenfalls beschnitten.' },
 ru: { map: 'Место на фотографии', source: 'Источник фотографии', intro: 'Познакомьтесь с местами наших районов. На фотографиях показаны местные достопримечательности, а не филиалы сервиса. Выберите название района для информации об обслуживании.', modified: 'Размер изменён, формат преобразован в WebP; при показе в карточке возможна обрезка.' },
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
   <p className="landmark-location">{t.map}: {photo.mapQuery}</p>
   <details className="landmark-credit"><summary>{t.source}</summary><p>{photo.author} · {photo.license}</p><p>{photo.sourceTitle.replace(/^File:/, '')} — Wikimedia Commons</p><p>{photo.source}</p><p>{photo.licenseUrl}</p><p>{t.modified}</p></details>
  </div>
 </article>;
}
