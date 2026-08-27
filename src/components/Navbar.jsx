import { useEffect, useState } from "react";
import ogLogo from "../assets/logo.png";
import "./Navbar.css";
import { useLanguage } from "../i18n";

function Navbar({ settings }) {
  const { locale, setLocale, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Tarayıcının küçük scroll geri yüklemeleri üstte gereksiz beyaz şerit
     oluşturmasın; cam efektini ancak kullanıcı belirgin biçimde kaydırınca aç. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 96);
    onScroll(); // sayfa yenilendiğinde mevcut konumu hemen uygula
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`navbar${scrolled ? " navbar--scrolled" : ""}${
        menuOpen ? " navbar--menu-open" : ""
      }`}
    >
      <div className="navbar__inner">
        <a href="#top" className="navbar__logo" onClick={closeMenu}>
          <img src={ogLogo} alt={`${settings.siteName} logo`} />
          <span className="logo-name">{settings.siteName}</span>
        </a>

        <nav className={`navbar__menu${menuOpen ? " is-open" : ""}`}>
          <a href="#work" onClick={closeMenu}>
            {locale === "tr" ? t.navWork : settings.navWorkLabel}
          </a>
          <a href="#about" onClick={closeMenu}>
            {locale === "tr" ? t.navAbout : settings.navAboutLabel}
          </a>
          <a href="#experience" onClick={closeMenu}>
            {locale === "tr" ? t.navExperience : settings.navExperienceLabel}
          </a>
          <a href="#contact" className="navbar__contact" onClick={closeMenu}>
            {locale === "tr" ? t.navContact : settings.navContactLabel}
          </a>
          <button
            type="button"
            className={`navbar__language navbar__language--${locale}`}
            onClick={() => setLocale(locale === "en" ? "tr" : "en")}
            aria-label={`${t.languageLabel}: ${locale === "en" ? "English. Türkçe'ye geç" : "Türkçe. Switch to English"}`}
            title={locale === "en" ? "Türkçe'ye geç" : "Switch to English"}
          >
            <span className="navbar__language-indicator" aria-hidden="true" />
            <span className={locale === "en" ? "is-active" : ""}>EN</span>
            <span className={locale === "tr" ? "is-active" : ""}>TR</span>
          </button>
        </nav>

        <button
          type="button"
          className={`navbar__toggle${menuOpen ? " is-open" : ""}`}
          aria-label={t.menuToggle}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
