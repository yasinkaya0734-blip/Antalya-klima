# Antalya Klima Servisi çalışma kuralları

- 12 Eylül 2026 kullanıcı talimatı: Çalışmaya devam et; canlıya almadan önce kullanıcı onayı al.
- Yerel geliştirme ve kontroller yapılabilir. Değişiklikleri önizleme ve kısa değişiklik özetiyle kullanıcıya sunmadan canlıya yayınlama.
- Önceki yayın izinlerini yeni değişiklikler için izin sayma. Otomatik yayını tetikleyebilecek push işlemlerini de onay gelene kadar yapma.
- copaservisi.com kaynaklarını bu sitenin çalışması sırasında değiştirme.
- Güncel kaynak bu klasördür. Antalyaklimaservisi.tr/antalyaklimaservisi_tr_baslangic eski başlangıç paketidir.
- Kullanıcının yedekleme talimatı: Mevcut çalışmayı yedekle; tüm işler tamamlandığında son hâlin tarihli yedeğini yeniden oluştur ve arşivin okunabildiğini doğrula. Yedekleme yayın onayı anlamına gelmez.
- 16 Ekim 2026 kullanıcı talimatı: Her güncelleme/yayın öncesi yedek otomatik alınmalı. `npm run deploy:production` üretim yayınından önce yedek alır; yerel Git push'ları `.githooks/pre-push` ile yedek alır. Yedekleme başarısız olursa güncellemeyi/yayını durdur. Yeni checkout'ta `npm run backup:hook` çalıştır.

## Kalıcı dış bağlantı kuralı — 1 Ekim 2026

- Sitede başka sitelere açılan tıklanabilir bağlantı veya yönlendirme bulunmayacak. Yalnızca bu sitenin iç sayfaları, `tel:` telefon bağlantıları ve işletmenin WhatsApp bağlantıları istisnadır.
- Google Maps, fotoğraf kaynağı, lisans, marka üreticisi ve copaservisi.com dahil diğer sitelerin bağlantılarını ekleme. Antalya görsellerini, yazar/kaynak/lisans bilgilerini ve gerektiğinde adreslerini düz metin olarak koru; bunları bağlantıya dönüştürme.
- Menü, kart, düğme ve JavaScript ile açılan adreslerde de aynı kural geçerlidir. Schema.org tür tanımları gibi tıklanabilir gezinme oluşturmayan teknik tanımlayıcılar dış bağlantı sayılmaz.
- Yayın öncesi `scripts/audit-technical-seo.mjs` ile dış bağlantı kontrolünü çalıştır. Yeni sayfa üretme veya mevcut sayfaları kaldırma talimatını ayrıca kullanıcıdan al.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
