'use client';

import { useState } from 'react';
import Link from 'next/link';
import { copy, type Locale } from '../i18n';
import { allDistricts, brands } from '../site-data';

const text = {
 tr: { title: 'Servis talebinizi hazırlayın', intro: 'Cihaz ve konum bilgilerinizi düzenleyin. Bu alan randevu oluşturmaz; mesajı WhatsApp’ta kontrol edip kendiniz gönderirsiniz.', model: 'Model / ekrandaki kod (isteğe bağlı)', symptom: 'Gözlemlediğiniz sorun (isteğe bağlı)', service: 'İhtiyaç duyduğunuz hizmet', preview: 'Mesaj önizlemesi', open: 'Mesajı WhatsApp’ta aç', privacy: 'Gizlilik Politikası', note: 'Bu bilgiler siteye kaydedilmez. WhatsApp’ı açtığınızda mesaj içeriği o hizmete aktarılır. Kimlik, kart bilgisi veya tam adres yazmanız gerekmez.', optional: 'İsteğe bağlı', availability: 'Randevu uygunluğu ve işlem öncesi ücret hakkında bilgi rica ediyorum.' },
 en: { title: 'Prepare your service request', intro: 'Organise your equipment and location details. This does not book an appointment; review and send the message yourself in WhatsApp.', model: 'Model / display code (optional)', symptom: 'Observed problem (optional)', service: 'Service needed', preview: 'Message preview', open: 'Open message in WhatsApp', privacy: 'Privacy Policy', note: 'These details are not saved to the site. Opening WhatsApp shares the message content with that service. You do not need to enter identity details, card information or a full address.', optional: 'Optional', availability: 'Please let me know appointment availability and the charges before any work.' },
 de: { title: 'Serviceanfrage vorbereiten', intro: 'Tragen Sie Geräte- und Standortangaben zusammen. Dies bucht keinen Termin; prüfen und senden Sie die Nachricht selbst in WhatsApp.', model: 'Modell / angezeigter Code (optional)', symptom: 'Beobachtetes Problem (optional)', service: 'Gewünschter Service', preview: 'Nachrichtenvorschau', open: 'Nachricht in WhatsApp öffnen', privacy: 'Datenschutzerklärung', note: 'Diese Angaben werden nicht auf der Website gespeichert. Beim Öffnen von WhatsApp wird der Nachrichteninhalt an diesen Dienst übergeben. Ausweis-, Kartenangaben oder eine vollständige Adresse sind nicht erforderlich.', optional: 'Optional', availability: 'Bitte informieren Sie mich über verfügbare Termine und die Kosten vor Beginn der Arbeiten.' },
 ru: { title: 'Подготовьте заявку на обслуживание', intro: 'Укажите сведения об устройстве и местонахождении. Это не запись на визит: проверьте и отправьте сообщение самостоятельно в WhatsApp.', model: 'Модель / код на экране (необязательно)', symptom: 'Наблюдаемая проблема (необязательно)', service: 'Нужная услуга', preview: 'Предпросмотр сообщения', open: 'Открыть сообщение в WhatsApp', privacy: 'Политика конфиденциальности', note: 'Эти данные не сохраняются на сайте. При открытии WhatsApp текст передаётся этому сервису. Не нужно указывать паспортные данные, реквизиты карты или полный адрес.', optional: 'Необязательно', availability: 'Прошу сообщить доступное время визита и стоимость до начала работ.' }
};

export default function RequestPlanner({ locale, initialDistrict = '', initialNeighborhood = '', initialBrand = '' }: { locale: Locale; initialDistrict?: string; initialNeighborhood?: string; initialBrand?: string }) {
 const t = copy[locale]; const u = text[locale];
 const [district, setDistrict] = useState(initialDistrict);
 const [neighborhood, setNeighborhood] = useState(initialNeighborhood);
 const [brand, setBrand] = useState(initialBrand);
 const [service, setService] = useState(t.serviceTitles[0]);
 const [model, setModel] = useState(''); const [symptom, setSymptom] = useState('');
 const message = [t.whatsappIntro, `${u.service}: ${service}`, district && `${t.district}: ${district}`, neighborhood.trim() && `${t.neighborhood}: ${neighborhood.trim()}`, brand && `${t.brandLabel}: ${brand}`, model.trim() && `${u.model}: ${model.trim()}`, symptom.trim() && `${u.symptom}: ${symptom.trim()}`, u.availability].filter(Boolean).join('\n');
 return <section className="request-planner" aria-labelledby="request-planner-title">
  <h2 id="request-planner-title">{u.title}</h2><p>{u.intro}</p>
  <div className="request-fields">
   <label>{u.service}<select value={service} onChange={e => setService(e.target.value)}>{t.serviceTitles.map(value => <option key={value}>{value}</option>)}</select></label>
   <label>{t.district}<select value={district} onChange={e => { setDistrict(e.target.value); setNeighborhood(''); }}><option value="">{t.chooseDistrict}</option>{allDistricts.map(value => <option key={value.slug}>{value.name}</option>)}</select></label>
   <label>{t.neighborhood} ({u.optional})<input maxLength={100} value={neighborhood} onChange={e => setNeighborhood(e.target.value)}/></label>
   <label>{t.brandLabel}<select value={brand} onChange={e => setBrand(e.target.value)}><option value="">{t.chooseBrand}</option>{brands.map(value => <option key={value}>{value}</option>)}</select></label>
   <label>{u.model}<input maxLength={120} value={model} onChange={e => setModel(e.target.value)}/></label>
   <label>{u.symptom}<textarea rows={3} maxLength={600} value={symptom} onChange={e => setSymptom(e.target.value)}/></label>
  </div>
  <h3>{u.preview}</h3><pre className="request-preview">{message}</pre>
  <p className="request-privacy">{u.note} <Link href={`/${locale}/gizlilik-politikasi`}>{u.privacy}</Link></p>
  <a className="btn primary" href={`https://wa.me/905382310734?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">{u.open}</a>
 </section>;
}
