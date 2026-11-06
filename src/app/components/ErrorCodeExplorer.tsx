'use client';
import { useState } from 'react';
import Link from 'next/link';
import { type BrandCodes } from '../error-code-data';
import type { Locale } from '../i18n';

function searchable(value: string) { return value.toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i').replace(/\s+/g, ''); }

const labels: Record<Locale, string[]> = {
  tr: ['Marka ve hata kodu rehberi', 'Klima markası', 'Tüm markalar', 'Kod veya açıklama ara', 'Örn. CH05, E1, sensör', 'Filtreleri temizle', 'kod kaydı gösteriliyor. Kod grupları birden fazla gösterge içerebilir.', 'Bu arama için doğrulanmış kayıt bulunamadı. Bu, kodun olmadığı veya cihazın arızasız olduğu anlamına gelmez. Marka, tam model ve kod fotoğrafıyla teknik destek alın.', 'klima arıza kodları', 'Kod rehberi', 'Model kılavuzu gerekli', 'Geçerli kapsam', 'Kod', 'Açıklama', 'Tür', 'Arıza bildirimi'],
  en: ['Brand and error code guide', 'Air conditioner brand', 'All brands', 'Search code or description', 'e.g. CH05, E1, sensor', 'Clear filters', 'code entries shown. A code group can contain multiple indicators.', 'No verified entry was found. This does not mean the code is absent or the unit has no fault. Contact a technician with the brand, exact model and a photo of the code.', 'air conditioner error codes', 'Code guide', 'Model manual required', 'Applicable scope', 'Code', 'Description', 'Type', 'Fault indicator'],
  de: ['Marken- und Fehlercode-Ratgeber', 'Klimaanlagenmarke', 'Alle Marken', 'Code oder Beschreibung suchen', 'z. B. CH05, E1, Sensor', 'Filter löschen', 'Code-Einträge werden angezeigt. Eine Codegruppe kann mehrere Anzeigen enthalten.', 'Kein bestätigter Eintrag gefunden. Das bedeutet nicht, dass der Code fehlt oder das Gerät fehlerfrei ist. Wenden Sie sich mit Marke, genauem Modell und einem Foto des Codes an den Service.', 'Klimaanlagen-Fehlercodes', 'Code-Ratgeber', 'Modellhandbuch erforderlich', 'Gültiger Umfang', 'Code', 'Beschreibung', 'Typ', 'Fehleranzeige'],
  ru: ['Справочник марок и кодов ошибок', 'Марка кондиционера', 'Все марки', 'Поиск кода или описания', 'например CH05, E1, датчик', 'Сбросить фильтры', 'записей кодов показано. Группа может содержать несколько индикаторов.', 'Подтверждённая запись не найдена. Это не означает, что кода нет или устройство исправно. Обратитесь в сервис, указав марку, точную модель и приложив фото кода.', 'коды ошибок кондиционеров', 'Справочник кодов', 'Нужно руководство модели', 'Область применимости', 'Код', 'Описание', 'Тип', 'Индикация неисправности'],
};

export default function ErrorCodeExplorer({ entries, initialBrand = '', locale = 'tr' }: { entries: BrandCodes[]; initialBrand?: string; locale?: Locale }) {
  const [aria, brandLabel, allBrandsLabel, searchLabel, placeholder, clearLabel, countLabel, noMatch, codeTitle, guide, manual, scope, code, description, kind, fault] = labels[locale];
  const [selected, setSelected] = useState(initialBrand);
  const [query, setQuery] = useState('');
  const matches = entries.filter(entry => !selected || entry.slug === selected).map(entry => ({ ...entry, groups: entry.groups.map(group => ({ ...group, rows: group.rows.filter(row => !query.trim() || searchable(`${row.code} ${row.meaning}`).includes(searchable(query))) })).filter(group => group.rows.length > 0) }));
  const rowCount = matches.reduce((sum, entry) => sum + entry.groups.reduce((count, group) => count + group.rows.length, 0), 0);
  return <section className="code-explorer" aria-label={aria}>
    <div className="code-filters">
      <label htmlFor="code-brand">{brandLabel}<select id="code-brand" value={selected} onChange={event => setSelected(event.target.value)}><option value="">{allBrandsLabel}</option>{entries.map(entry => <option key={entry.slug} value={entry.slug}>{entry.brand}</option>)}</select></label>
      <label htmlFor="code-search">{searchLabel}<input id="code-search" type="search" placeholder={placeholder} value={query} onChange={event => setQuery(event.target.value)}/></label>
      <button className="btn" type="button" onClick={() => { setSelected(initialBrand); setQuery(''); }}>{clearLabel}</button>
    </div>
    <p role="status" aria-live="polite">{rowCount} {countLabel}</p>
    {query.trim() && rowCount === 0 && <p className="notice">{noMatch}</p>}
    {matches.map(entry => <article className="code-brand-section" key={entry.slug} id={`marka-${entry.slug}`}>
      <div className="code-section-heading"><h2>{entry.brand} {codeTitle}</h2><span className={`code-badge ${entry.groups.length ? '' : 'pending'}`}>{entries.find(value => value.slug === entry.slug)?.groups.length ? guide : manual}</span></div>
      <p lang="tr">{entry.note}</p>
      {entry.groups.map(group => <section key={group.scope} className="code-group"><h3>{scope}</h3><p className="code-scope" lang="tr">{group.scope}</p>
        <div className="code-table-wrap" role="region" aria-label={`${entry.brand} ${codeTitle}`} tabIndex={0}><table className="code-table"><caption>{entry.brand} — {description}</caption><thead><tr><th scope="col">{code}</th><th scope="col">{description}</th><th scope="col">{kind}</th></tr></thead><tbody>{group.rows.map(row => <tr key={row.code}><th scope="row"><code>{row.code}</code></th><td lang="tr">{row.meaning}</td><td>{row.kind === 'Bilgi' ? (locale === 'en' ? 'Information' : locale === 'de' ? 'Information' : locale === 'ru' ? 'Информация' : 'Bilgi') : row.kind === 'Koruma' ? (locale === 'en' ? 'Protection' : locale === 'de' ? 'Schutz' : locale === 'ru' ? 'Защита' : 'Koruma') : fault}</td></tr>)}</tbody></table></div>
      </section>)}
      <div className="actions">{!initialBrand && <Link href={`/${locale}/klima-ariza-kodlari/${entry.slug}`}>{entry.brand} {codeTitle}</Link>}<Link href={`/${locale}/markalar/${entry.slug}`}>{entry.brand} {locale === 'en' ? 'air conditioner service' : locale === 'de' ? 'Klimaservice' : locale === 'ru' ? 'сервис кондиционеров' : 'klima servisi'}</Link></div>
    </article>)}
  </section>;
}
