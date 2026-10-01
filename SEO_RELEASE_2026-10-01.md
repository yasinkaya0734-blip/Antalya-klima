# Antalya klima — 1 Ekim 2026 yayın kapsamı

Kullanıcı bu çalışma için kontrol, GitHub aktarımı ve Vercel canlı yayını açıkça istedi.

## Sayfa kapsamı

- Mevcut 24 marka ve 19 ilçe sayfası korunup kontrol edildi.
- 40 mahalle sayfasına konuya özel servis açıklaması, kapsam, ücret/randevu bilgisi ve 24 markaya bağlantı eklendi.
- Marka sayfalarına bakım, onarım, montaj, model uyumluluğu ve 40 mahalleye erişim eklendi. Mahalle bağlantısı seçilen markayı talep formuna taşır; canonical URL sorgu parametresi içermez.
- Marka sayfalarına Service yapılandırılmış verisi eklendi. Seçili mahallelerde benzersiz başlık ve açıklama kullanılır; Service alanı mahalle ve ilçeyi belirtir.
- Kepez Yeni Mahalle takma adresi Yeni sayfasına 308 ile yönlendirilir; mükerrer URL site haritasından çıkarılır.
- Lara ve Varsak genel bölge adları olarak ifade edilir.
- Arıza kodlarındaki marka kaynak bağlantılarının önceki temizliği yayına dahildir.

| İlçe | Seçili mahalle sayısı |
|---|---:|
| Muratpaşa | 12 |
| Kepez | 10 |
| Konyaaltı | 8 |
| Döşemealtı | 5 |
| Aksu | 5 |

Tam seçim: `src/app/featured-neighborhoods.ts`. Bu seçim nüfus yoğunluğuna göre resmî sıralama değildir. Mevcut kapsamlı mahalle dizini korunur.

## SEO yaklaşımı

Gerçek işletme bilgisi ve bağımsız özel servis açıklaması kullanılır. Sahte şube, müşteri yorumu, yetki, fiyat veya sıra garantisi eklenmez. İsim değiştirmekten ibaret mahalle×marka birleşim URL'leri mevcut noindex durumunda tutulur; kaliteli marka ve mahalle ana sayfaları site haritasındadır. Google'da indekslenme veya sıralama sonucu garanti edilmez.

## İncelenen kaynaklar

- [Muratpaşa muhtarlıkları](https://muratpasa-bld.gov.tr/muhtarliklar)
- [Muratpaşa nüfus bilgileri](https://muratpasa-bld.gov.tr/icerik/nufus-bilgileri)
- [Kepez Varsak Karşıyaka](https://kepez-bld.gov.tr/news_10991_varsak-karsiyaka-da-yuzler-guluyor)
- [Konyaaltı belediyesi mahalle kayıtları](https://www.konyaalti.bel.tr/meclis-gundemleri)
- [Döşemealtı planları](https://www.dosemealti.bel.tr/tr/m/imar-planlari/yenikoy-bahceyaka-ve-tornalar-mahalleleri-ile-ciplakli-mahallesinin-bir-kisminda-gecerli-olan-1-1000-olcekli-uygulama-imar-planlari.html)
- [Aksu mahalle bilgileri](https://www.aksu.bel.tr/haberler/baskan-yildirim-mandirlar-guzelyurt-hacialiler-ve-karacallida-yetki-aksu-belediyesine-gecti)
- [Google arama spam politikaları](https://developers.google.com/search/docs/essentials/spam-policies)

## Doğrulama

`scripts/check-service-coverage.mjs` 83 kapsam sayfasında başlık/açıklama benzersizliği, H1, canonical, indexlenebilirlik, Service verisi, site haritası üyeliği, marka bağlantıları ve tüm iç bağlantıların HTTP yanıtını doğrular. Arıza kaynağı temizliği, geçersiz mahalle 404 yanıtı ve Yeni Mahalle yönlendirmesi de kontrol edilir.

Masaüstü ve 390 px mobil tarayıcı kontrolü: görünür içerik, tek H1, yatay taşma ve hata denetimi. Arçelik → Varsak Karşıyaka akışında form Kepez / Varsak Karşıyaka / Arçelik değerleriyle doğrulandı; WhatsApp mesajı gönderilmedi.
