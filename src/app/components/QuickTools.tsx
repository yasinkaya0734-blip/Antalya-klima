'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { allDistricts, brands, neighborhoods, slugify } from '../site-data';
import { copy, type Locale } from '../i18n';

const whatsappBase = 'https://wa.me/905382310734?text=';

export default function QuickTools({ locale = 'tr' }: { locale?: Locale }) {
  const t = copy[locale];
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [district, setDistrict] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [brand, setBrand] = useState('');
  const [allNeighborhoods, setAllNeighborhoods] = useState(neighborhoods);
  const availableNeighborhoods = useMemo(() => allNeighborhoods.filter(item => item.district === district), [allNeighborhoods, district]);

  useEffect(() => {
    fetch('/api/neighborhoods')
      .then(response => response.ok ? response.json() : Promise.reject(new Error('Mahalle listesi alınamadı.')))
      .then(result => {
        const values = Array.isArray(result.data) ? result.data : [];
        const normalized = values
          .map((item: { name?: string; district?: string }) => item.name && item.district ? { name: item.name, district: slugify(item.district), slug: slugify(item.name) } : undefined)
          .filter((item: { name: string; district: string; slug: string } | undefined): item is { name: string; district: string; slug: string } => Boolean(item));
        if (normalized.length) setAllNeighborhoods(normalized);
      })
      .catch(() => setAllNeighborhoods(neighborhoods));
  }, []);

  useEffect(() => {
    if (!searchOpen && !assistantOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    const elements = () => Array.from(dialog?.querySelectorAll<HTMLElement>('button:not(:disabled), select:not(:disabled), a[href]') ?? []);
    elements()[0]?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setSearchOpen(false); setAssistantOpen(false); }
      if (event.key === 'Tab') {
        const nodes = elements();
        const first = nodes[0]; const last = nodes.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = previousOverflow; previous?.focus(); };
  }, [searchOpen, assistantOpen]);

  const goToResult = () => {
    if (!district) return;
    const selectedNeighborhood = availableNeighborhoods.find(item => item.slug === neighborhood)?.name;
    const query = new URLSearchParams();
    if (selectedNeighborhood) query.set('mahalle', selectedNeighborhood);
    if (brand) query.set('marka', brand);
    const path = `/${locale}/ilceler/${district}${query.size ? `?${query.toString()}` : ''}`;
    setSearchOpen(false);
    router.push(path);
  };

  const askWhatsApp = (service: string) => {
    const place = [district && allDistricts.find(item => item.slug === district)?.name, neighborhood && availableNeighborhoods.find(item => item.slug === neighborhood)?.name].filter(Boolean).join(' / ');
    const message = `${t.whatsappIntro} ${service}.${brand ? ` ${t.brandLabel}: ${brand}.` : ''}${place ? ` ${t.location}: ${place}.` : ''}`;
    window.open(`${whatsappBase}${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return <>
    <div className="quick-tools" aria-label={t.quick}>
      <a className="quick-tool call-tool" href="tel:+902423440507" aria-label={t.call}>☎ <span>{t.call}: 0242 344 05 07</span></a>
      <a className="quick-tool mobile-call-tool" href="tel:+905382310734" aria-label={t.mobile}>☎ <span>{t.mobile}: +90 538 231 07 34</span></a>
      <button className="quick-tool search-tool" onClick={() => setSearchOpen(true)} aria-label={t.search}>⌕ <span>{t.search}</span></button>
      <button className="quick-tool assistant-tool" onClick={() => setAssistantOpen(true)} aria-label={t.assistantLabel}>💬 <span>{t.assistant}</span></button>
      <a className="quick-tool whatsapp-tool" href={whatsappBase + encodeURIComponent(t.whatsappIntro + ' ' + t.sub)} target="_blank" rel="noreferrer" aria-label={t.whatsapp}>◔ <span>WhatsApp: +90 538 231 07 34</span></a>
    </div>
    {searchOpen && <div className="tool-dialog" role="dialog" aria-modal="true" aria-label={t.search}><div className="tool-panel" ref={dialogRef}><button className="dialog-close" onClick={() => setSearchOpen(false)} aria-label={t.close}>×</button><p className="eyebrow">{t.search}</p><h2>{t.selectHeading}</h2><p>{t.selectIntro}</p><label>{t.district}<select value={district} onChange={event => { setDistrict(event.target.value); setNeighborhood(''); setBrand(''); }}><option value="">{t.chooseDistrict}</option>{allDistricts.map(item => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label><label>{t.neighborhood}<select value={neighborhood} onChange={event => { setNeighborhood(event.target.value); setBrand(''); }} disabled={!district}><option value="">{t.chooseNeighborhood}</option>{availableNeighborhoods.map(item => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label><label>{t.brandLabel}<select value={brand} onChange={event => setBrand(event.target.value)} disabled={!neighborhood}><option value="">{t.chooseBrand}</option>{brands.map(item => <option key={item} value={item}>{item}</option>)}</select></label><button className="btn primary" disabled={!district} onClick={goToResult}>{t.openPage}</button></div></div>}
    {assistantOpen && <div className="tool-dialog" role="dialog" aria-modal="true" aria-label={t.assistantLabel}><div className="tool-panel" ref={dialogRef}><button className="dialog-close" onClick={() => setAssistantOpen(false)} aria-label={t.close}>×</button><p className="eyebrow">{t.assistantLabel}</p><h2>{t.help}</h2><p>{t.helpText}</p><div className="assistant-choices">{[...t.serviceTitles.slice(0, 4), t.errorHeading].map(service => <button key={service} onClick={() => askWhatsApp(service)}>{service}</button>)}</div></div></div>}
  </>;
}
