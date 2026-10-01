'use client';
import { useState } from 'react';
import Link from 'next/link';
import { type BrandCodes } from '../error-code-data';

function searchable(value: string) { return value.toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i').replace(/\s+/g, ''); }

export default function ErrorCodeExplorer({ entries, initialBrand = '' }: { entries: BrandCodes[]; initialBrand?: string }) {
  const [selected, setSelected] = useState(initialBrand);
  const [query, setQuery] = useState('');
  const matches = entries.filter(entry => !selected || entry.slug === selected).map(entry => ({ ...entry, groups: entry.groups.map(group => ({ ...group, rows: group.rows.filter(row => !query.trim() || searchable(`${row.code} ${row.meaning}`).includes(searchable(query))) })).filter(group => group.rows.length > 0) }));
  const rowCount = matches.reduce((sum, entry) => sum + entry.groups.reduce((count, group) => count + group.rows.length, 0), 0);
  return <section className="code-explorer" aria-label="Marka ve hata kodu rehberi">
    <div className="code-filters">
      <label htmlFor="code-brand">Klima markası<select id="code-brand" value={selected} onChange={event => setSelected(event.target.value)}><option value="">Tüm markalar</option>{entries.map(entry => <option key={entry.slug} value={entry.slug}>{entry.brand}</option>)}</select></label>
      <label htmlFor="code-search">Kod veya açıklama ara<input id="code-search" type="search" placeholder="Örn. CH05, E1, sensör" value={query} onChange={event => setQuery(event.target.value)}/></label>
      <button className="btn" type="button" onClick={() => { setSelected(initialBrand); setQuery(''); }}>Filtreleri temizle</button>
    </div>
    <p role="status" aria-live="polite">{rowCount} kod kaydı gösteriliyor. Kod grupları birden fazla gösterge içerebilir.</p>
    {query.trim() && rowCount === 0 && <p className="notice">Bu arama için doğrulanmış kayıt bulunamadı. Bu, kodun olmadığı veya cihazın arızasız olduğu anlamına gelmez. Marka, tam model ve kod fotoğrafıyla teknik destek alın.</p>}
    {matches.map(entry => <article className="code-brand-section" key={entry.slug} id={`marka-${entry.slug}`}>
      <div className="code-section-heading"><h2>{entry.brand} klima arıza kodları</h2><span className={`code-badge ${entry.groups.length ? '' : 'pending'}`}>{entries.find(value => value.slug === entry.slug)?.groups.length ? 'Kod rehberi' : 'Model kılavuzu gerekli'}</span></div>
      <p>{entry.note}</p>
      {entry.groups.map(group => <section key={group.scope} className="code-group"><h3>Geçerli kapsam</h3><p className="code-scope">{group.scope}</p>
        <div className="code-table-wrap" role="region" aria-label={`${entry.brand} kod tablosu`} tabIndex={0}><table className="code-table"><caption>{entry.brand} — belirtilen kapsam için kod açıklamaları</caption><thead><tr><th scope="col">Kod</th><th scope="col">Açıklama</th><th scope="col">Tür</th></tr></thead><tbody>{group.rows.map(row => <tr key={row.code}><th scope="row"><code>{row.code}</code></th><td>{row.meaning}</td><td>{row.kind ?? 'Arıza bildirimi'}</td></tr>)}</tbody></table></div>
      </section>)}
      <div className="actions">{!initialBrand && <Link href={`/tr/klima-ariza-kodlari/${entry.slug}`}>{entry.brand} kod ve model rehberi</Link>}<Link href={`/tr/markalar/${entry.slug}`}>{entry.brand} klima servisi</Link></div>
    </article>)}
  </section>;
}
