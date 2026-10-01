# Dil düzenlemesi — 8 Eylül 2026

Antalyaklimaservisi.tr projesinin Türkçe, İngilizce, Almanca ve Rusça içerikleri ortak dil sözlüğüne bağlandı.

- Ana sayfa, hizmetler, parça/aksesuar açıklamaları ve SSS alanları çevrildi.
- İlçe, mahalle, marka ve özel hizmet sayfaları dört dilde içerik sunuyor.
- Mevcut beş rehberin dört dilde başlık, giriş ve bütün maddeleri kontrol edildi. Rehber listesindeki “yakında” metni kaldırıldı.
- Arama penceresi, WhatsApp asistanı, hazır mesajlar, görsel açıklamaları ve iletişim düğmeleri seçilen dili kullanıyor.
- Dil seçimi aynı sayfanın diğer dildeki sürümünü açıyor. Arama sonucu seçilen dilde kalıyor.
- HTML dil bilgisi ilk yüklemede ve dil değişiminde güncelleniyor. Başlık, açıklama, canonical, hreflang ve sosyal paylaşım dili sayfayla eşleşiyor.
- Site haritasına dil alternatifleri eklendi. Mevcut URL yolları korundu.
- Türkçe bölge/marka notları `src/app/turkish-editorial.ts` içinde korundu. Yer ve marka adları özel ad olarak bırakıldı.
- Mobilde uzun çeviriler için satır kırılması, tek sütun kartlar ve kompakt hızlı erişim düğmeleri düzenlendi.

## Doğrulama

Üretim derlemesi ve TypeScript kontrolü başarılı. Dil taraması 260 sayfada hatasız tamamlandı: her dilde ana bölümler, 19 ilçe, 24 marka, 5 hizmet, 5 rehber ve örnek mahalle/özel hizmet yolları. Dört geçersiz yolun 404 yanıtı da kontrol edildi.

Tekrarlama: Yerel sunucu açıkken `node scripts/check-languages.mjs http://localhost:3100`.

Tarayıcıda İngilizce → Rusça → Almanca makale geçişi, Almanca ilçe/mahalle/marka araması ve WhatsApp konu penceresi kontrol edildi. Statik analizde hata yok; mevcut standart görsel kullanımına ilişkin performans önerileri bulunuyor.

Daha sonraki SEO çalışmasında mahalle verisi kalıcı hâle getirildi ve son sürüm canlıya alındı. Güncel test ve yayın durumu SEO_REVIEW.md dosyasındadır.
