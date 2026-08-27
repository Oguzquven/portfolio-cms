import { createContext, useContext, useMemo, useState } from "react";

const dictionaries = {
  en: {
    navWork: "WORK", navAbout: "ABOUT", navExperience: "EXPERIENCE", navContact: "CONTACT",
    projectsEyebrow: "SELECTED WORK", projectsTitle: "Things I've", projectsHighlight: "built",
    projectsLoading: "Projects are loading...", projectsError: "Projects could not be loaded", viewProject: "VIEW PROJECT",
    techLeft: "WHAT I WORK WITH", techRight: "TECH STACK", experienceEyebrow: "EXPERIENCE",
    experienceTitle: "Where I've", experienceHighlight: "worked", viewDetails: "View details", hideDetails: "Hide details",
    basedIn: "BASED IN", name: "NAME", email: "EMAIL", message: "MESSAGE", sending: "SENDING...",
    backToTop: "BACK TO TOP", menuToggle: "Open/close menu", languageLabel: "Language",
  },
  tr: {
    navWork: "PROJELER", navAbout: "HAKKIMDA", navExperience: "DENEYİM", navContact: "İLETİŞİM",
    projectsEyebrow: "SEÇİLMİŞ PROJELER", projectsTitle: "Ürettiklerim ve", projectsHighlight: "geliştirdiklerim",
    projectsLoading: "Projeler yükleniyor...", projectsError: "Projeler yüklenemedi", viewProject: "PROJEYİ GÖR",
    techLeft: "KULLANDIĞIM TEKNOLOJİLER", techRight: "TEKNOLOJİ YIĞINI", experienceEyebrow: "DENEYİM",
    experienceTitle: "Çalıştığım", experienceHighlight: "yerler", viewDetails: "Detayları gör", hideDetails: "Detayları gizle",
    basedIn: "KONUM", name: "İSİM", email: "E-POSTA", message: "MESAJ", sending: "GÖNDERİLİYOR...",
    backToTop: "YUKARI DÖN", menuToggle: "Menüyü aç/kapat", languageLabel: "Dil",
  },
};

const heroTr = {
  eyebrow: "FULL-STACK GELİŞTİRİCİ", titlePrefix: "Ölçeklenebilir", titleHighlight: "sistemler", titleSuffix: "ve yalın arayüzler geliştiriyorum.",
  description: "Fikirleri; büyümeye, yüksek performansa ve uzun ömürlü kullanıma hazır güvenilir dijital ürünlere dönüştürüyorum.",
  primaryText: "PROJELERİMİ GÖR", secondaryText: "HAKKIMDA", location: "İstanbul, Türkiye", availabilityLabel: "UYGUNLUK", availabilityText: "Yeni fırsatlara açık",
  stat1Label: "Tamamlanan Staj", stat2Label: "Geliştirici", stat3Label: "Öne Çıkan Proje", stat4Label: "Bilgisayar Mühendisliği",
};

const aboutTr = {
  eyebrow: "HAKKIMDA", titleLineOne: "Yazılımın her katmanında çalışıyorum,", titleLineTwo: "ama kendimi en çok", titleHighlight: "arayüzün arkasında hissediyorum.",
  bioLabel: "KISACA BEN", firstParagraph: "Ben Oğuz. Karmaşık fikirleri güvenilir ve kullanımı kolay yazılımlara dönüştürmekten keyif alan bir Bilgisayar Mühendisiyim. Full-stack çalışıyorum; ancak en çok arayüzün arkasındaki mimari ve kararlarla ilgileniyorum.",
  secondParagraph: "Related Digital (Doğuş Teknoloji), Dividesoft ve Flalingo'daki üç stajım boyunca gerçek geliştirme ekiplerinde REST API'lere ve full-stack ürünlere katkı sağladım. Bu deneyimler bugün yazılım geliştirirken benimsediğim açıklık, sürdürülebilirlik ve ölçeklenebilirlik yaklaşımını şekillendirdi.",
  ctaText: "BİRLİKTE ÇALIŞALIM",
};

const contactTr = {
  eyebrow: "İLETİŞİM", kicker: "AKLINIZDA BİR FİKİR Mİ VAR?", titlePrefix: "Birlikte harika bir şey", titleHighlight: "geliştirelim.",
  description: "Yeni projeler, iş birlikleri ve anlamlı dijital ürünler geliştirebileceğimiz fırsatlarla her zaman ilgileniyorum.", emailLabel: "Merhaba de",
  namePlaceholder: "Adınız", emailPlaceholder: "siz@ornek.com", messagePlaceholder: "Fikrinizden bahsedin...", submitText: "MESAJ GÖNDER",
  successMessage: "Mesajınız gönderildi! En kısa sürede size dönüş yapacağım.", errorMessage: "Bir sorun oluştu. Lütfen tekrar deneyin veya e-posta bağlantısını kullanın.", footerRole: "FULL-STACK GELİŞTİRİCİ", footerLocation: "İSTANBUL, TR",
};

const projectTr = {
  "E-Commerce Platform": { title: "E-Ticaret Platformu", type: "Full-Stack Proje", description: "Ürün listeleme, sepet ve sipariş yönetimi özelliklerine sahip full-stack e-ticaret uygulaması. Ön yüz React.js; arka uç Java, Spring Boot ve PostgreSQL ile geliştirildi." },
  "Twitter Clone": { title: "Twitter Klonu", type: "Full-Stack Proje", description: "Kullanıcı girişi, gönderi oluşturma, yorum, beğeni, beğenmeme ve yeniden paylaşma özelliklerine sahip Twitter esintili sosyal medya uygulaması. React.js, Java, Spring Boot, PostgreSQL ve REST API teknolojileriyle geliştirildi." },
  "Portfolio Website & CMS": { title: "Portfolyo Sitesi ve CMS", type: "Full-Stack Proje", description: "Duyarlı React arayüzü ve projeleri, hero içeriğini, teknolojileri, deneyimleri, iletişim bilgilerini ve medya yüklemelerini yönetmeye yarayan yetkilendirilmiş admin paneline sahip full-stack portfolyo ve içerik yönetim sistemi." },
};

const experienceTr = {
  "Doğuş Teknoloji": { role: ".NET Backend Geliştirici Stajyeri", description: "Kurumsal bir yazılım geliştirme ortamında .NET tabanlı backend süreçlerine katkı sağladım; ekip çalışması, sürdürülebilir kod ve kurumsal geliştirme pratikleri konusunda deneyim kazandım." },
  Dividesoft: { role: "Full-Stack Geliştirici Stajyeri", description: "Full-stack uygulama geliştirme süreçlerinde görev aldım; arayüz ile backend arasındaki veri akışı ve ürün geliştirme yaşam döngüsü üzerine çalıştım." },
  Flalingo: { role: "Full-Stack Geliştirici Stajyeri", description: "Canlı bir dijital ürün üzerinde frontend ve backend geliştirmelerine katkı sağladım; hata çözümü, yeni özellik geliştirme ve ekip içi iş birliği deneyimi edindim." },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(() => localStorage.getItem("portfolio-language") || "en");
  const setLocale = (value) => { localStorage.setItem("portfolio-language", value); setLocaleState(value); };
  const value = useMemo(() => ({ locale, setLocale, t: dictionaries[locale] }), [locale]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
export const localizeHero = (value, locale) => locale === "tr" ? { ...value, ...heroTr } : value;
export const localizeAbout = (value, locale) => locale === "tr" ? { ...value, ...aboutTr } : value;
export const localizeContact = (value, locale) => locale === "tr" ? { ...value, ...contactTr } : value;
export const localizeProject = (value, locale) => locale === "tr" ? { ...value, ...(projectTr[value.title] || {}) } : value;
export const localizeExperience = (value, locale) => locale === "tr" ? { ...value, ...(experienceTr[value.company] || {}) } : value;
