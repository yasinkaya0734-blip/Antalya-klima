# Antalya Klima Servisi — teknik ve içerik kontrolü

Kontrol tarihi: 8 Eylül 2026.

## Tamamlananlar

- Kullanıcının verdiği işletme adresi iletişim, alt bilgi ve HVACBusiness yapılandırılmış verisinde aynı biçimde kullanıldı: Muratpaşa Mahallesi, 583 Sokak No: 3/A, Muratpaşa / Antalya.
- Çalışma saatleri, koordinatlar, müşteri puanları, sabit fiyatlar ve yetkili servis iddiaları uydurulmadı. Diğer ilçeler için randevu uygunluğunun ayrıca teyit edilmesi açıklanıyor.
- Dört dilde hakkımızda, gizlilik/iletişim açıklamaları ve hizmetlere özel ayrıntılar eklendi. İşlem öncesinde ücret ve kapsamın teyit edilmesi anlatılıyor.
- Yerel mahalle kaynağı oluşturuldu: API'den 913 mahalle kaydı, mevcut adreslerin bozulmaması için 3 ek bölge adı; toplam 916 kayıt, 19 ilçe. Arama ve sayfalar aynı kaynağı kullanıyor. Sayfa yüklemesinde üçüncü taraf mahalle API'sine bağımlılık kaldırıldı.
- Site haritası 3.908 canonical adresten oluşuyor ve her adres için dört dil alternatifi mevcut. Gerçeği yansıtmayan sürekli değişen lastmod tarihleri kaldırıldı.
- Benzer mahalle–marka ve özel hizmet kombinasyonları ziyaretçiler için açık tutuldu; arama sonuçlarında tekrarı azaltmak için noindex/follow uygulandı ve site haritasından çıkarıldı. Bu bilinçli hariç tutma, bir sunucu hatası değildir.
- Sayfalara işletme, gezinme yolu; uygun sayfalara makale ve hizmet yapılandırılmış verileri eklendi. Sahte değerlendirme veya puan eklenmedi.
- Görseller Next.js Image ile boyuta uygun WebP/AVIF sunulacak şekilde düzenlendi. Boyut bilgileri ve yükleme öncelikleri tanımlandı. Ana görselin büyük PNG olarak doğrudan yüklenmesi kaldırıldı.
- Eski adres yönlendirmeleri, özel 404 sayfası, site simgesi, güvenlik başlıkları, ana içeriğe geç bağlantısı ve klavye ile kullanılabilir arama/yardım pencereleri eklendi veya düzeltildi.
- Telefon bağlantıları +90 ile uluslararası biçime getirildi. Harita bağlantısı doğrulanmış adresi kullanıyor.
- Next.js ve ilgili paketler güncellendi; npm audit fix sonucu 0 güvenlik açığı bildirildi.

## Kontrol sonuçları

- Üretim derlemesi: başarılı (Next.js 16.3.4).
- Statik kod kontrolü: hata ve uyarı yok.
- Site haritasındaki 3.908 sayfanın tamamı: HTTP 200, doğru canonical/dil, tek H1, geçerli JSON-LD ve işletme adresi; hata yok.
- Dört dilde 268 ek içerik/bağlantı kontrolü: hata yok.
- Geçersiz yollar: 404; eski yollar: kalıcı yönlendirme.
- Denenen 384 piksel bakım görseli: 9.586 bayt; kaynak PNG: 2.356.598 bayt. Bu bir görsel örneğidir, tüm sayfa için hız puanı değildir.
- Tarayıcı kontrolü: ana görsel, işletme iletişimi, Akseki'nin 51 mahalle seçeneği, Escape ile pencere kapatma ve odağın açan düğmeye dönmesi doğrulandı.

Testler: `scripts/check-site.mjs`, `scripts/check-languages.mjs`. Sayısal test çıktısı: `backups/seo-check-result.json`.

## Google tarafındaki sınırlar

Search Console alan adı mülküne erişildi. Güncel site haritası başarıyla yeniden gönderildi. Dizin raporu hâlen veri işliyor; Önemli Web Verileri raporunda yeterli veri yok. Yerel/HTTP test başarısı, Google'ın dizine alacağı veya sıralama vereceği anlamına gelmez. Canlı sürümün yeniden taranması gerekir; eski bildirimler anında silinmez. Çalışma saatleri ve fiilen hizmet verilen ek ilçeler kullanıcı tarafından ayrıca teyit edilmelidir.

## Başvurulan resmî kaynaklar

- [Google: Site haritası oluşturma](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: Çok dilli sayfalar](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google: LocalBusiness yapılandırılmış verisi](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Google: Spam politikaları ve benzer sayfalar](https://developers.google.com/search/docs/essentials/spam-policies)
- [Next.js: Proxy](https://nextjs.org/docs/app/getting-started/proxy)

Mahalle veri kaynağı ve indirme tarihi `src/data/antalya-neighborhoods.json` içinde kayıtlıdır; kaynak TürkiyeAPI'dir, resmî idari kayıt sertifikası değildir.

## Canlı Google testi

Google Zengin Sonuçlar Testi ana sayfada 2 geçerli öğe algıladı; kritik hata yok. Yerel işletme için isteğe bağlı priceRange eksikliği bildirildi; gerçek fiyat aralığı verilmediği için uydurulmadı. Kuruluş için önerilen posta kodu PTT resmi sorgusunda Muratpaşa Mahallesi 583 Sokak için 07010 olarak doğrulandı ve eklendi.

[PTT doğrulama kaynağı](https://www.ptt.gov.tr/posta-kodu). İlk Google test sonucu: https://search.google.com/test/rich-results/result?id=z1aI_wjxTbYnprDdliMxjA

## Tamamlanan yayın ve son sonuç

Site canlıya alındı: https://www.antalyaklimaservisi.tr/tr
Son yayın: dpl_4dC36L2FEcAdFbHVFKFs5K6iU2gt (READY).
Google son testi (8 Eylül 2026 23:21): 2 geçerli öğe, kritik hata yok. Kuruluş öğesinde posta kodu uyarısı giderildi; yerel işletme öğesinde yalnızca isteğe bağlı priceRange önerisi kaldı.
https://search.google.com/test/rich-results/result?id=PQROss8wo_X-fdXkjWTbWg

Search Console manuel işlemler ve güvenlik sorunları raporları: “Hiçbir sorun algılanmadı”. Güncel site haritasının yeniden gönderimi: “Site haritası başarıyla gönderildi”. Google henüz dizin verilerini işliyor; 3.908 yerel test başarısı 3.908 sayfanın indekslendiği anlamına gelmez.
