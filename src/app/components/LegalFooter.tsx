import type { Locale } from '../i18n';

const content = {
  tr: { title: 'Yasal', links: ['KVKK Aydınlatma Metni', 'Gizlilik Politikası', 'Kullanım Koşulları'], label: 'YASAL UYARI:', text: 'Web sitemizde adı geçen marka ve logolar ilgili hak sahiplerine aittir. Firmamız, ilgili üretici firmalardan tamamen bağımsız, özel teknik servis kuruluşu olarak hizmet vermektedir.' },
  en: { title: 'Legal', links: ['Personal Data Protection Notice (KVKK)', 'Privacy Policy', 'Terms of Use'], label: 'LEGAL NOTICE:', text: 'The brands and logos mentioned on our website belong to their respective rights holders. Our company operates as a private technical service provider, entirely independent of the respective manufacturers.' },
  de: { title: 'Rechtliches', links: ['Datenschutzhinweise (KVKK)', 'Datenschutzerklärung', 'Nutzungsbedingungen'], label: 'RECHTLICHER HINWEIS:', text: 'Die auf unserer Website genannten Marken und Logos gehören den jeweiligen Rechteinhabern. Unser Unternehmen ist ein privater technischer Dienstleister und von den jeweiligen Herstellern vollständig unabhängig.' },
  ru: { title: 'Правовая информация', links: ['Уведомление о защите персональных данных (KVKK)', 'Политика конфиденциальности', 'Условия использования'], label: 'ПРАВОВОЕ УВЕДОМЛЕНИЕ:', text: 'Марки и логотипы, упомянутые на нашем сайте, принадлежат соответствующим правообладателям. Наша компания оказывает услуги частного технического сервиса и полностью независима от соответствующих производителей.' },
};
const paths = ['kvkk', 'gizlilik-politikasi', 'kullanim-kosullari'];

export default function LegalFooter({ locale }: { locale: Locale }) {
  const t = content[locale];
  return <section className="footer-legal" aria-labelledby="footer-legal-title">
    <h2 id="footer-legal-title">{t.title}</h2>
    <nav aria-label={t.title}><ul>{paths.map((path, index) => <li key={path}><a href={`/${locale}/${path}`} hrefLang={locale}>{t.links[index]}</a></li>)}</ul></nav>
    <p className="footer-legal-notice"><strong>{t.label}</strong> {t.text}</p>
  </section>;
}
