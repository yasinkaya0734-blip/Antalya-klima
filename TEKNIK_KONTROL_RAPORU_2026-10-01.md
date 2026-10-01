# Teknik kontrol ve dış bağlantı temizliği — 1 Ekim 2026

Mevcut sayfalar korundu; yeni sayfa oluşturulmadı. Teknik değişiklikler Vercel üzerinden canlıya alındı.

## Kaldırılan bağlantılar
- 19 ilçe fotoğraf kartındaki fotoğraf kaynağı ve lisans bağlantıları dört dilde düz metne çevrildi.
- Aynı kartlardaki dış harita bağlantıları kaldırıldı; konum bilgisi metin olarak korundu.
- İletişim sayfalarının Google Maps bağlantıları kaldırıldı.
- Copa sitesine giden bağlantı düz metne çevrildi.
- Arıza kodu sayfalarında tıklanabilir dış kaynak bağlantısı zaten bulunmuyordu.
- Antalya görselleri, açıklamalar, kaynak/yazar/lisans bilgileri korundu. İç bağlantılar, telefon ve işletmenin WhatsApp bağlantısı korundu.
- Kalıcı kural AGENTS.md dosyasına eklendi; teknik tarama betiği izin verilmeyen dış bağlantıları hata olarak raporlar.

## Teknik düzeltmeler
1. Bulunmayan sayfalardan ana sayfaya ait yanlış canonical kaldırıldı. Gerçek 404 yanıtı korundu.
2. Site haritasındaki 10 ilçe hizmet sayfasından ilgisiz arıza kodu inceleme tarihi kaldırıldı. URL listesi değiştirilmedi.
3. Görünür sayfa yolu ve yapılandırılmış veri sırası eşitlendi; ana sayfaya tüm ilçeler bağlantısı eklendi.
4. Mahalle araması seçilen mahalleye yönlendirildi. Mahalle listesi yalnızca arama açılınca yükleniyor.
5. Hata sayfasına telefon ve WhatsApp bağlantıları eklendi.
6. Sekiz görselin WebP sürümleri oluşturuldu; toplam kaynak boyutu yaklaşık %95 azaldı. Eski görsel adresleri korundu. Ana görsel ve logo için ek görüntü dönüştürme gecikmesi kaldırıldı.
7. Yerel ortam ve erişim anahtarı dosyaları yedekleme dışında tutuldu.

## İçerik incelemesi
875 Türkçe mahalle/bölge kaydı ortak şablon nedeniyle sonraki içerik çalışması için işaretlendi: qa-output/mahalle-icerik-inceleme.csv. Bunlar silinmedi veya topluca yeniden yazılmadı. Öne çıkan 40 mahallenin özel servis bölümleri bulunuyor; ortak bölümler de mevcut.

## Mobil ve yayın kontrolleri
- Canlı sitede 10 sayfa türü mobil boyutta kontrol edildi; taşma, JavaScript hatası ve iletişim hedefi hatası bulunmadı. Telefon/WhatsApp hedefleri gerçek arama veya mesaj gönderilmeden test edildi.
- İlçe → mahalle → marka araması doğru mahalle ve form bilgilerine ulaştı.
- Son Lighthouse mobil laboratuvar ölçümü: performans 64/100, LCP 3,2 saniye, toplam engelleme süresi 1.000 ms. Araç bilgisayarın beklenenden yavaş olduğunu bildirdi. Bu sonuç saha ölçümü değildir; performans iyileştirmesi için alan kalıyor.
- Vercel üretim yayını başarılı. Alan adları doğrulanmış; mevcut ana alan adı yönlendirmeleri korundu. Uygulama ek ortam değişkeni gerektirmiyor.
- GitHub yüklemesi tamamlanmadı: önceki denemelerde yazma izni reddedildi; son iki denemede GitHub adresi çözümlenemedi. Bu son hata anahtarın yazma izninin düzeldiğini doğrulamıyor. Kod yerel Git kayıtlarında korunuyor.

Tam taramanın sayısal sonucu yanındaki teknik tarama raporunda bulunur.
## Tam canlı tarama sonucu
- 3.933 site haritası URL'si kontrol edildi: tümü 200, indexlenebilir ve doğru canonical'a sahip.
- 3.977 farklı iç bağlantı hedefi doğrulandı; hata bulunmadı.
- Yedi yönlendirme beklenen kalıcı yönlendirmeyi, altı geçersiz adres gerçek 404 yanıtını verdi.
- Yasaklı tıklanabilir dış bağlantı, eksik başlık/H1, iletişim hedefi hatası veya denetlenen yapısal veri tutarsızlığı bulunmadı.
- Yinelenen sayfa başlığı yok. Her dilde hizmetler, markalar ve ilçeler liste sayfaları aynı meta açıklamayı paylaşıyor: dört tekrar grubu. Sonraki içerik adımı için işaretlendi.
- Normalleştirilmiş içerik karşılaştırmasında yedi benzerlik grubu bulundu; benzerlik değerlendirmesi editoryal incelemenin yerine geçmez.
- Ayrıntılar: qa-output/technical-seo-live.json ve qa-output/technical-seo-live-inventory.json.