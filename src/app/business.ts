export const business = {
  name: 'Kaya Teknik',
  url: 'https://www.antalyaklimaservisi.tr',
  telephone: '+902423440507',
  mobile: '+905382310734',
  streetAddress: 'Muratpaşa Mahallesi, 583 Sokak No: 3/A',
  addressLocality: 'Muratpaşa',
  addressRegion: 'Antalya',
  addressCountry: 'TR',
  postalCode: '07010', // PTT: Antalya > Muratpaşa > Muratpaşa Mah. > 583 Sokak.
  displayAddress: 'Muratpaşa Mahallesi, 583 Sokak No: 3/A, 07010 Muratpaşa / Antalya',
};

// Hours confirmed by the business owner on 2026-09-09, in Antalya local time.
export const openingHours = [
  { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:30', closes: '20:30' },
  { days: ['Saturday'], opens: '09:00', closes: '18:30' },
  { days: ['Sunday'], opens: '11:00', closes: '16:30' },
];
// Do not add ratings, coordinates or guarantees without verified facts.
export const businessSchema = {
  '@type': 'HVACBusiness', '@id': `${business.url}/#business`,
  name: business.name, legalName: business.name, url: business.url, telephone: business.telephone,
  areaServed: { '@type': 'AdministrativeArea', name: 'Antalya', containedInPlace: { '@type': 'Country', name: 'Türkiye' } },
  openingHoursSpecification: openingHours.map(hours => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: hours.days.map(day => `https://schema.org/${day}`), opens: hours.opens, closes: hours.closes })),
  image: `${business.url}/klima-salon-hero.webp`, logo: `${business.url}/antalyaklimaservisi-logo.webp`,
  address: { '@type': 'PostalAddress', streetAddress: business.streetAddress, addressLocality: business.addressLocality, addressRegion: business.addressRegion, addressCountry: business.addressCountry, postalCode: business.postalCode },
};
