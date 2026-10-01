# İşletme bilgileri ve yayın kararı — son onay, 9 Eylül 2026

- Kullanıcı 19 ilçenin tamamına fiilen servis verildiğini ve tamamının yayında kalmasını onayladı. Önceki 14 ilçe taslak/yayın belirsizliği kapandı.
- Resmi işletme adı kullanıcı tarafından Kaya Teknik olarak verildi; sayfa metinleri, yasal açıklamalar ve yapılandırılmış işletme bilgileri buna göre güncellendi. İşletme adı diğer dillerde çevrilmiyor.
- Tespit/ulaşım ücretinin bulunduğu ve işçilik/parça garantisi uygulandığı onaylandı. Tutar, tamirden mahsup, garanti süresi ve ayrıntılı koşullar henüz verilmedi. Sabit rakam veya süre uydurulmadı; işlem öncesinde teyit edilecekleri açıklandı.
- Dört dilde 19 ilçe hizmet kapsamı ana sayfa ve hakkımızda metnine işlendi. Randevu zamanının ayrıca belirlenmesi korunuyor.
- Önceki raporda bu başlıklar için geçen “yanıt bekleniyor” kayıtları bu onayla güncellendi. Fotoğraflar, özgün saha içerikleri, gerçek veri işleme süreçlerinin doğrulanması ve yayın sonrası Google takibi ayrı işler olarak devam ediyor.

---
# Son düzenlemeler — 9 Eylül 2026

## Bu çalışmada tamamlananlar

- İşletme sahibinin doğruladığı saatler iletişim ve hakkımızda sayfalarına dört dilde eklendi: pazartesi–cuma 08:30–20:30, cumartesi 09:00–18:30, pazar 11:00–16:30. Aynı kaynak HVACBusiness openingHoursSpecification alanına aktarılıyor.
- İletişim, ilçe, mahalle ve marka detaylarında servis talebi hazırlama alanı eklendi. Konum ve marka sayfadan devralınır; kullanıcı hizmet, model ve belirti ekleyebilir. Mesaj önizlemesi vardır. Site veriyi kaydetmez; WhatsApp açıldığında metin o hizmete aktarılır, gönderimi kullanıcı yapar. Randevu veya ödeme oluşturulmaz.
- Mahalle tanıtımındaki küçük harfli URL kısa adı yerine okunabilir mahalle adı kullanıldı.
- /gizlilik adresleri aynı dilde /gizlilik-politikasi adresine kalıcı yönlendirilir. Eski kopya sitemap'ten çıkarıldı. Dil ön eki olmayan üç yasal adres Türkçe karşılıklarına yönlenir.
- Yasal bağlantılar sitenin kendi alanında kaldı; Copa sitesine karşılıklı bağlantı eklenmedi.
- Ana sayfada servis süreci, mevcut sık sorulan sorular ve beş rehbere doğrudan erişim sağlandı.
- Kod kontrolünde üretilmiş Vercel dosyaları ve yedekler kapsam dışında bırakıldı; gerçek kaynak dosyaları denetlenmeye devam ediyor.

## Kontroller

- Üretim derlemesi ve ESLint: başarılı.
- 3.916 sitemap adresi: 0 hata (saatler ve ana sayfa eklemesinden önceki kapsamlı tarama; adres kümesi değişmedi).
- 276 dil/sayfa kontrolü: 0 hata.
- Son saatler, yasal yönlendirmeler, dört dil talep alanı ve mahalle adı kontrolü: başarılı (scripts/check-completion.mjs).
- Tarayıcıda Türkçe form seçenekleri, mesaj önizlemesi ve Almanca marka ön seçimi doğrulandı. 390 px mobil form yerleşimi incelendi. Deneme mesajı gönderilmedi; geçici mobil boyut ayarı sıfırlandı.

## Henüz tamamlandı denmeyecek işler

- 14 ek ilçenin canlıda kalması mı taslakta tutulması mı gerektiği kullanıcıya soruldu; yanıt bekleniyor. Bu çalışmada mevcut 19 ilçelik yayın politikası değiştirilmedi.
- 19 ilçeye fiili servis kapsamı, tespit/ulaşım ücreti ve garanti şartları henüz işletme sahibi tarafından açıklanmadı. Saatler dışında yeni taahhüt yazılmadı.
- Gerçek ekip, işyeri ve tamamlanmış iş fotoğrafları sağlanmadı. Görseller gerçek saha çalışması kanıtı gibi sunulmadı.
- 913 mahalle ve marka–mahalle birleşimleri için ayrı ayrı özgün saha makaleleri tamamlanmış değildir. Yer adı veya cümle sırası değişikliğini özgün uzman içerik saymıyoruz. Doğrulanmış yerel hizmet örnekleri ve cihaz bilgileriyle geliştirme gerektirir.
- Yasal metinlerde resmi veri sorumlusu unvanı ve gerçek veri işleme süreçlerinin işletme tarafından doğrulanması gerekir; hukuki uygunluk sertifikası verilmedi.
- Google İşletme Profili doğrulanmadı. Search Console ve gerçek kullanıcı hız raporları için yeni veri oluşması beklenmeli. Önceki Google test sonucu yeni bir Google testi gibi raporlanmadı.

İçerik yaklaşımı için resmi kaynak: https://developers.google.com/search/docs/fundamentals/creating-helpful-content

Bu rapor teknik kontrolleri, işletme doğrulamasını ve yayın sonrası takibi ayrı tutar. Teknik test başarısı Google dizinine alınma veya sıralama garantisi değildir.

## Canlı doğrulama

Yayın dpl_BYr3GBx92N51z3ffyRn9UFos9vyR READY durumunda. https://www.antalyaklimaservisi.tr üzerinde son kontrol dört dilde başarılı: çalışma saatleri, talep alanı, iç yasal bağlantılar, eski gizlilik yönlendirmesi, dil ön eksiz yasal adresler ve okunabilir mahalle adı. Canlı iletişim sayfasında saatler tarayıcıda da görüldü.
Son yayın: dpl_DgfqTVofG137aCiean6iTbmv8EkC (READY). Talep alanı dil veya konum değişiminde yeniden hazırlanır. Canlı sitede TR → EN bağlantısıyla geçiş yapılarak İngilizce hizmet seçimi ve İngilizce mesaj önizlemesi doğrulandı.
İşletme onayı sonrası yayın: dpl_7ugJPz5Xnjzep34riEJqR9MXZY2E (READY). Canlı sitede dört dilde 19 ilçe kapsamı, ücret açıklaması, Kaya Teknik adı, legalName/areaServed ve KVKK işletme adı doğrulandı.

## Son ücret ve garanti açıklaması

Kullanıcı parça değişiminde 1 yıl garanti verildiğini doğruladı. Dört dilde hizmet bedeli metni, rakam ve kilometre kuralı belirtmeden güncel hizmet bedeli için iletişime yönlendirecek şekilde değiştirildi. Önceki açık tespit/ulaşım ücreti ve mahsup açıklaması bu yeni kamuya açık metinle değiştirildi. Kullanım koşullarına da aynı garanti ve ücret açıklaması eklendi. 1 yıllık süre yalnızca parça değişimi için belirtildi.

## Mobil çağrı ve aynı gün servis

7/24 mobil çağrı hizmeti 0538 231 07 34 için dört dilde eklendi. Aynı gün servis, “Aynı gün servis için arayın; ziyaret zamanı randevuyla netleştirilir” şeklinde belirtildi. İşyeri çalışma saatleri ve mevcut openingHoursSpecification ayrı tutuldu; işyeri veya saha servisi 24 saat açık gösterilmedi. Açıklama servis çağrısı alanlarında ve çalışma saatleri bölümünde bulunuyor.
