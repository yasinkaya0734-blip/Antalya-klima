import type { Locale } from '../i18n';

const messages = {
 tr: { title: '7/24 klima servis hattı', text: 'Tamir, bakım, montaj ve gaz dolumu taleplerinizi telefonla veya WhatsApp bilgi asistanından iletin. Aynı gün ziyaret, adres ve ekip uygunluğuna göre planlanır. Parça ve işçilik garanti koşulları işlem öncesinde yazılı olarak teyit edilir.' },
 en: { title: '24/7 mobile service line', text: 'Request same-day service. Visits are scheduled after confirming the address and team availability. Parts and labour warranty terms are confirmed in writing before work begins.' },
 de: { title: '24/7 mobile Service-Hotline', text: 'Fragen Sie einen Service am selben Tag an. Der Besuch wird nach Bestätigung von Adresse und Teamverfügbarkeit geplant. Garantiebedingungen für Teile und Arbeit werden vor Beginn schriftlich bestätigt.' },
 ru: { title: 'Мобильная линия сервиса 24/7', text: 'Оставьте заявку на обслуживание в тот же день. Выезд планируется после подтверждения адреса и доступности команды. Условия гарантии на детали и работы подтверждаются письменно до начала работ.' },
};
export default function MobileCallNotice({ locale }: { locale: Locale }) {
 const t = messages[locale];
 return <div className="mobile-call-notice"><p><strong>{t.title}</strong> · <a href="tel:+905382310734">0538 231 07 34</a></p><p>{t.text}</p></div>;
}
