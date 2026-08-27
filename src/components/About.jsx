import { useEffect, useRef, useState } from "react";
import "./About.css";
import { getTechnologies } from "../services/technologyApi";
import { getAbout } from "../services/aboutApi";
import { localizeAbout, useLanguage } from "../i18n";

const fallbackAbout = { eyebrow:"ABOUT", titleLineOne:"I work across the stack,", titleLineTwo:"but feel most at home", titleHighlight:"behind the interface.", bioLabel:"A LITTLE ABOUT ME", firstParagraph:"I'm Oğuz, a Full-Stack Developer and Computer Engineering graduate based in Istanbul. I have hands-on experience with Java, Spring Boot, .NET/C#, React and PostgreSQL.", secondParagraph:"Through internships at Related Digital (Doğuş Teknoloji), Dividesoft and Flalingo, I worked on REST APIs and full-stack applications. I'm particularly interested in backend development and building reliable, scalable software solutions.", ctaText:"LET'S WORK TOGETHER", ctaUrl:"#contact" };

function About({ technologyYear = "2026", settings }) {
  const { locale, t } = useLanguage();
  const sectionRef = useRef(null);
  const [technologies, setTechnologies] = useState([]);
  const [aboutContent, setAboutContent] = useState(fallbackAbout);

  useEffect(() => {
    getTechnologies(true).then(setTechnologies).catch(() => setTechnologies([]));
    getAbout().then((value) => setAboutContent({ ...fallbackAbout, ...value })).catch(() => {});
  }, []);

  /* SCROLL-REVEAL: görünürlük React state'inde tutulur
     (classList ile el ile eklersek React yeniden render'da siler) */
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
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* Simple Icons renk verilmediğinde her teknolojinin kendi marka rengini kullanır. */
  const iconUrl = (slug) => `https://cdn.simpleicons.org/${slug}`;

  const content = localizeAbout(aboutContent, locale);
  return (
    <section className="about" id="about" ref={sectionRef}>
      <svg
        className="about__wave"
        viewBox="0 0 1440 280"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 0H1440V58C1320 118 1192 42 1050 96C885 159 765 66 610 137C438 216 260 86 0 174Z" />
      </svg>
      <div className="about__container">
        {/* HEADER */}
        <div
          className={`about__header ${
            visibleIds.has("header") ? "is-visible" : ""
          }`}
          data-reveal="header"
        >
          <span className="about__eyebrow">
            <span className="about__dot"></span>
            {content.eyebrow}
          </span>
        </div>

        {/* INTRO */}
        <div
          className={`about__intro ${
            visibleIds.has("intro") ? "is-visible" : ""
          }`}
          data-reveal="intro"
        >
          <h2 className="about__title">
            {content.titleLineOne}
            <br />
            {content.titleLineTwo}
            <br />
            <em>{content.titleHighlight}</em>
          </h2>

          <div className="about__bio">
            <span className="about__label">{content.bioLabel}</span>

            <p>
              {content.firstParagraph}
            </p>

            <p>
              {content.secondParagraph}
            </p>

            <a href={content.ctaUrl} className="about__link">
              {content.ctaText}
              <span className="about__link-arrow">↗</span>
            </a>
          </div>
        </div>

        {/* TECH STACK */}
        <div
          className={`stack ${visibleIds.has("stack") ? "is-visible" : ""}`}
          data-reveal="stack"
        >
          <div className="stack__heading">
            <span>{locale === "tr" ? t.techLeft : settings.technologyHeading}</span>
            <span>{locale === "tr" ? t.techRight : settings.technologyLabel} / {technologyYear}</span>
          </div>

          <div className="tech-marquee" aria-label="Technologies I work with">
            <svg
              className="tech-marquee__wave"
              viewBox="0 0 1440 360"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
                <path d="M0 82C176 4 344 128 548 58C746-10 902 120 1094 50C1250-8 1368 18 1440 76L1440 286C1262 332 1104 248 916 306C724 364 552 250 360 314C202 366 92 322 0 292Z" />
            </svg>
            <div className="tech-marquee__track">
              {[0, 1].map((copy) => (
                <div className="tech-marquee__group" aria-hidden={copy === 1} key={copy}>
                  {technologies.map((technology) => (
                    <div className="tech-marquee__item" tabIndex={copy === 0 ? 0 : -1} key={`${copy}-${technology.name}`}>
                      <img
                        src={technology.iconUrl || iconUrl(technology.slug)}
                        alt=""
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                      <span>{technology.name}</span>
                      <i aria-hidden="true" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>        </div>
      </div>
    </section>
  );
}

export default About;
