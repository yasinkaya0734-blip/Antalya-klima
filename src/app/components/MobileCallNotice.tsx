import type { Locale } from '../i18n';

const messages = {
 tr: { title: '7/24 mobil çağrı hizmeti', text: 'Aynı gün servis için arayın; ziyaret zamanı randevuyla netleştirilir.' },
 en: { title: '24/7 mobile phone support', text: 'Call for same-day service; the visit time is confirmed when booking.' },
 de: { title: 'Mobiltelefonischer Kontakt rund um die Uhr', text: 'Rufen Sie für einen Service am selben Tag an; die Besuchszeit wird bei der Terminvereinbarung bestätigt.' },
 ru: { title: 'Круглосуточная мобильная линия', text: 'Позвоните для обслуживания в тот же день; время выезда подтверждается при записи.' },
};
export default function MobileCallNotice({ locale }: { locale: Locale }) {
 const t = messages[locale];
 return <div className="mobile-call-notice"><p><strong>{t.title}</strong> · <a href="tel:+905382310734">0538 231 07 34</a></p><p>{t.text}</p></div>;
}
