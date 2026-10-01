# Antalya Klima Servisi çalışma kuralları

- 12 Eylül 2026 kullanıcı talimatı: Çalışmaya devam et; canlıya almadan önce kullanıcı onayı al.
- Yerel geliştirme ve kontroller yapılabilir. Değişiklikleri önizleme ve kısa değişiklik özetiyle kullanıcıya sunmadan canlıya yayınlama.
- Önceki yayın izinlerini yeni değişiklikler için izin sayma. Otomatik yayını tetikleyebilecek push işlemlerini de onay gelene kadar yapma.
- copaservisi.com kaynaklarını bu sitenin çalışması sırasında değiştirme.
- Güncel kaynak bu klasördür. Antalyaklimaservisi.tr/antalyaklimaservisi_tr_baslangic eski başlangıç paketidir.
- Kullanıcının yedekleme talimatı: Mevcut çalışmayı yedekle; tüm işler tamamlandığında son hâlin tarihli yedeğini yeniden oluştur ve arşivin okunabildiğini doğrula. Yedekleme yayın onayı anlamına gelmez.

## Kalıcı dış bağlantı kuralı — 1 Ekim 2026

- Sitede başka sitelere açılan tıklanabilir bağlantı veya yönlendirme bulunmayacak. Yalnızca bu sitenin iç sayfaları, `tel:` telefon bağlantıları ve işletmenin WhatsApp bağlantıları istisnadır.
- Google Maps, fotoğraf kaynağı, lisans, marka üreticisi ve copaservisi.com dahil diğer sitelerin bağlantılarını ekleme. Antalya görsellerini, yazar/kaynak/lisans bilgilerini ve gerektiğinde adreslerini düz metin olarak koru; bunları bağlantıya dönüştürme.
- Menü, kart, düğme ve JavaScript ile açılan adreslerde de aynı kural geçerlidir. Schema.org tür tanımları gibi tıklanabilir gezinme oluşturmayan teknik tanımlayıcılar dış bağlantı sayılmaz.
- Yayın öncesi `scripts/audit-technical-seo.mjs` ile dış bağlantı kontrolünü çalıştır. Yeni sayfa üretme veya mevcut sayfaları kaldırma talimatını ayrıca kullanıcıdan al.
