import { useEffect, useRef, useState } from "react";
import "./Experience.css";
import dividesoftLogo from "../assets/dividesoft.png";
import dogusTeknolojiLogo from "../assets/dogus-teknoloji.svg";
import flalingoLogo from "../assets/flalingo-logo.png";
import { getExperiences } from "../services/experienceApi";
import { localizeExperience, useLanguage } from "../i18n";

const builtInLogos = { dogus: dogusTeknolojiLogo, dividesoft: dividesoftLogo, flalingo: flalingoLogo };

function formatMonth(value, locale) {
  const [year, month] = value.split("-").map(Number);
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", { month: "short", year: "numeric" }).format(new Date(year, month - 1));
}

function Experience({ settings }) {
  const { locale, t } = useLanguage();
  const sectionRef = useRef(null);
  const [experiences, setExperiences] = useState([]);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    getExperiences(true).then(setExperiences).catch((error) => setLoadError(error.message));
  }, []);

  /* AKORDEON: tek seferde bir öğe açık; varsayılan = en güncel (ilk) görev */
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  /* SCROLL-REVEAL: hangi öğelerin göründüğü React state'inde tutulur.
     (classList ile el ile eklersek React yeniden render'da siler —
      sınıf her zaman JSX'ten gelmeli) */
  const [visibleIds, setVisibleIds] = useState(() => new Set());

  useEffect(() => {
    const targets = sectionRef.current.querySelectorAll("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.dataset.reveal;
            setVisibleIds((prev) => {
              if (prev.has(key)) return prev;
              const next = new Set(prev);
              next.add(key);
              return next;
            });
            observer.unobserve(entry.target); // bir kere belir, hep kalsın
          }
        });
      },
      { threshold: 0.15 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [experiences]);

  return (
    <section className="experience" id="experience" ref={sectionRef}>
      <div className="experience__container">
        <div
          className={`experience__header ${
            visibleIds.has("header") ? "is-visible" : ""
          }`}
          data-reveal="header"
        >
          <div className="experience__heading">
            <p className="experience__eyebrow">
              <span className="experience__dot"></span>
              {locale === "tr" ? t.experienceEyebrow : settings.experienceEyebrow}
            </p>
            <h2 className="experience__title">
              {locale === "tr" ? t.experienceTitle : settings.experienceTitle} <em>{locale === "tr" ? t.experienceHighlight : settings.experienceHighlight}</em>
            </h2>
          </div>
        </div>

        <div
          className={`experience__list ${
            visibleIds.has("list") ? "is-visible" : ""
          }`}
          data-reveal="list"
        >
          {loadError && <p>{loadError}</p>}
          {experiences.map((rawExperience) => {
            const experience = localizeExperience(rawExperience, locale);
            return (
            <article
              className={`experience__item ${
                visibleIds.has(experience.id) ? "is-visible" : ""
              } ${openId === experience.id ? "experience__item--open" : ""}`}
              key={experience.id}
              data-reveal={experience.id}
              data-period={`${formatMonth(experience.startDate, locale)} — ${formatMonth(experience.endDate, locale)}`}
            >
              {/* Görünmez tetik: tüm satırı tıklanabilir yapar,
                  başlıklar HTML kurallarına uygun kalır */}
              <button
                type="button"
                className="experience__trigger"
                onClick={() => toggle(experience.id)}
                aria-expanded={openId === experience.id}
                aria-controls={`experience-details-${experience.id}`}
                aria-label={`${experience.company} detaylarını aç/kapat`}
              />

              <div className="experience__meta">
                <span className="experience__period">{formatMonth(experience.startDate, locale)} — {formatMonth(experience.endDate, locale)}</span>
                <span className="experience__number">{String(experience.displayOrder).padStart(2, "0")}</span>

                {/* Logo şirket isminin yanında: şimdilik Google favicon
                    servisinden, gerçek logolar assets'e gelince src değişir */}
                <div className="experience__company-row">
                  <h3 className="experience__company experience__wordmark">
                    <button
                      type="button"
                      className="experience__logo-trigger"
                      onClick={() => toggle(experience.id)}
                      aria-expanded={openId === experience.id}
                      aria-controls={`experience-details-${experience.id}`}
                      aria-label={`${experience.company} detaylarını ${openId === experience.id ? "kapat" : "aç"}`}
                      title={`${experience.company} detaylarını ${openId === experience.id ? "kapat" : "aç"}`}
                    >
                      <img src={builtInLogos[experience.logoUrl] || experience.logoUrl} alt={experience.company} />
                    </button>
                  </h3>
                </div>
              </div>

              <div className="experience__body">
                <div className="experience__role-row">
                  <h4 className="experience__role">{experience.role}</h4>
                </div>

                {/* AKORDEON GÖVDESİ: grid-rows 0fr → 1fr numarasıyla
                    yükseklik ölçmeden yumuşak açılır */}
                <div className="experience__details" id={`experience-details-${experience.id}`}>
                  <div className="experience__details-inner">
                    <p className="experience__description">
                      {experience.description}
                    </p>

                    <div className="experience__technologies">
                      {experience.technologies.map((technology) => (
                        <span className="experience__tag" key={technology}>
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="experience__role-side">
                  <span className="experience__year">{experience.endDate.slice(0, 4)}</span>
                  <span className="experience__chevron" aria-hidden="true">
                    <span>{openId === experience.id ? t.hideDetails : t.viewDetails}</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </div>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Experience;
