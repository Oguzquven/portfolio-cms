import "./Hero.css";
import oguz from "../assets/oguz.png";
import { useEffect, useState } from "react";
import { getHero } from "../services/heroApi";
import { localizeHero, useLanguage } from "../i18n";

const fallbackHero = {
  eyebrow: "FULL-STACK DEVELOPER", titlePrefix: "I build scalable",
  titleHighlight: "systems", titleSuffix: "and clean interfaces.",
  description: "I build full-stack applications and REST APIs with Java, Spring Boot, .NET/C#, React and PostgreSQL, with a particular focus on reliable and scalable backend systems.",
  primaryText: "VIEW MY WORK", primaryUrl: "#work",
  secondaryText: "ABOUT ME", secondaryUrl: "#about",
  location: "İstanbul, Türkiye", availabilityLabel: "AVAILABLE FOR",
  availabilityText: "New opportunities", photoUrl: "",
  stat1Value: "3", stat1Label: "Internships Completed",
  stat2Value: "Full-Stack", stat2Label: "Developer",
  stat3Value: "2", stat3Label: "Featured Projects",
  stat4Value: "B.Sc.", stat4Label: "Computer Engineering",
};

function Hero() {
  const { locale, t } = useLanguage();
  const [hero, setHero] = useState(fallbackHero);

  useEffect(() => {
    getHero().then((value) => setHero({ ...fallbackHero, ...value })).catch(() => {});
  }, []);

  const content = localizeHero(hero, locale);
  return (
    <section className="hero">
      {/* ===== SOL TARAF ===== */}
      <div className="hero__content">
        <span className="hero__eyebrow">
          <span className="hero__eyebrow-dot"></span>
          {content.eyebrow}
        </span>

        <h1 className="hero__title">
          {content.titlePrefix} <em>{content.titleHighlight}</em> {content.titleSuffix}
        </h1>

        <p className="hero__description">
          {content.description}
        </p>

        <div className="hero__actions">
          <a href={content.primaryUrl} className="hero__primary">
            {content.primaryText}
          </a>
          <a href={content.secondaryUrl} className="hero__secondary">
            {content.secondaryText}
          </a>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />
            </svg>
            <span className="hero__stat-value">{content.stat1Value}</span>
            <span className="hero__stat-label">{content.stat1Label}</span>
          </div>

          <div className="hero__stat">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5" />
            </svg>
            <span className="hero__stat-value">{content.stat2Value}</span>
            <span className="hero__stat-label">{content.stat2Label}</span>
          </div>

          <div className="hero__stat">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <ellipse cx="12" cy="5" rx="8" ry="3" />
              <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
            </svg>
            <span className="hero__stat-value">{content.stat3Value}</span>
            <span className="hero__stat-label">{content.stat3Label}</span>
          </div>

          <div className="hero__stat">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
            </svg>
            <span className="hero__stat-value">{content.stat4Value}</span>
            <span className="hero__stat-label">{content.stat4Label}</span>
          </div>
        </div>
      </div>

      {/* ===== SAĞ TARAF ===== */}
      {/* Çerçeve, nokta deseni ve arka plan lekeleri tamamen CSS'ten geliyor,
          burada ekstra div YOK */}
      <div className="hero__media">
        <img src={content.photoUrl || oguz} alt="Oğuz Güven" className="hero__photo" />

        <div className="hero__card">
          <div className="hero__card-row">
            <span className="hero__card-label">
              <span className="hero__card-dot hero__card-dot--blue"></span>
              {t.basedIn}
            </span>
            <span className="hero__card-value">
              {content.location}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 21s-7-5.5-7-11a7 7 0 1114 0c0 5.5-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </span>
          </div>
          <div className="hero__card-divider"></div>
          <div className="hero__card-row">
            <span className="hero__card-label">{content.availabilityLabel}</span>
            <span className="hero__card-value">
              {content.availabilityText}
              <span className="hero__card-dot hero__card-dot--green"></span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
