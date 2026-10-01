import MobileCallNotice from './MobileCallNotice';
import { openingHours } from '../business';
import type { Locale } from '../i18n';

const labels = {
 tr: { title: 'İşyeri çalışma saatleri', days: ['Pazartesi – Cuma', 'Cumartesi', 'Pazar'], note: 'Saatler Antalya yerel saatidir. Servis ziyaretinin günü ve saati randevu sırasında ayrıca teyit edilir.' },
 en: { title: 'Business opening hours', days: ['Monday – Friday', 'Saturday', 'Sunday'], note: 'Times are local to Antalya. The service visit date and time are confirmed separately when arranging an appointment.' },
 de: { title: 'Öffnungszeiten des Betriebs', days: ['Montag – Freitag', 'Samstag', 'Sonntag'], note: 'Es gilt die Ortszeit in Antalya. Tag und Uhrzeit des Servicebesuchs werden bei der Terminvereinbarung gesondert bestätigt.' },
 ru: { title: 'Часы работы офиса', days: ['Понедельник – пятница', 'Суббота', 'Воскресенье'], note: 'Указано местное время Антальи. Дата и время выезда отдельно подтверждаются при записи.' },
};

export default function OpeningHours({ locale }: { locale: Locale }) {
 const t = labels[locale];
 return <section className="opening-hours"><h2>{t.title}</h2><dl>{openingHours.map((hours, index) => <div key={hours.opens}><dt>{t.days[index]}</dt><dd><time>{hours.opens}</time> – <time>{hours.closes}</time></dd></div>)}</dl><p>{t.note}</p><MobileCallNotice locale={locale}/></section>;
}
