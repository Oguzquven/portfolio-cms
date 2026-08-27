import { useEffect, useRef, useState } from "react";
import { getProjects } from "../services/projectApi";
import "./Projects.css";
import { localizeProject, useLanguage } from "../i18n";

function ProjectMockup({ type }) {
  return (
    <div className={`mockup mockup--${type}`} aria-hidden="true">
      <div className="mockup__browser"><span></span><span></span><span></span><div className="mockup__address">oguz.dev/{type}</div></div>
      {type === "commerce" && <div className="mockup__commerce"><div className="mockup__shop-nav"><b>NOVA</b><span>SHOP&nbsp;&nbsp; NEW&nbsp;&nbsp; CART · 03</span></div><div className="mockup__shop-head"><small>NEW COLLECTION</small><strong>Built for everyday.</strong></div><div className="mockup__products">{["01", "02", "03"].map((item) => <div className="mockup__product" key={item}><i /><b>Product {item}</b><span>₺{item === "01" ? "899" : item === "02" ? "649" : "1.299"}</span></div>)}</div></div>}
      {type === "social" && <div className="mockup__social"><aside><b>●</b><span>⌂ Home</span><span>⌕ Explore</span><span>♡ Activity</span><span>◎ Profile</span></aside><main><div className="mockup__compose"><i />What’s happening?<button>POST</button></div>{[1, 2].map((post) => <div className="mockup__post" key={post}><i /><div><b>{post === 1 ? "frontend_notes" : "java_journey"}</b><span>{post === 1 ? "Building reusable components today." : "Clean architecture, one layer at a time."}</span><small>♡ {post * 8 + 4}&nbsp;&nbsp; ↻ {post * 2}</small></div></div>)}</main><section><b>Trends</b><span>#React</span><span>#Java</span><span>#BuildInPublic</span></section></div>}
      {type === "portfolio" && <div className="mockup__portfolio"><nav><b>OG</b><span>WORK&nbsp;&nbsp; ABOUT&nbsp;&nbsp; EXPERIENCE&nbsp;&nbsp; CONTACT</span></nav><div className="mockup__portfolio-copy"><small>FULL-STACK DEVELOPER</small><strong>I build scalable <em>systems</em><br />and clean interfaces.</strong><p>Reliable full-stack products with a focus on backend systems.</p><button>VIEW MY WORK</button></div><div className="mockup__portfolio-shape" /><div className="mockup__portfolio-photo"><i /><i /></div></div>}
      {type === "aynova" && <div className="mockup__aynova"><div className="mockup__aynova-nav"><b>AYNOVA.</b><span>Services&nbsp;&nbsp; About&nbsp;&nbsp; Contact</span></div><div className="mockup__aynova-hero"><small>DIGITAL PRODUCT STUDIO</small><strong>Ideas into<br /><em>working products.</em></strong><button>START A PROJECT ↗</button></div><div className="mockup__services"><div><b>01</b><span>Web Development</span></div><div><b>02</b><span>Backend Systems</span></div><div><b>03</b><span>Product Design</span></div></div></div>}
    </div>
  );
}

function ProjectImageMockup({ src, title, type }) {
  return (
    <div className={`mockup mockup--image mockup--${type}`}>
      <div className="mockup__browser" aria-hidden="true"><span></span><span></span><span></span><div className="mockup__address">oguz.dev/{type}</div></div>
      <div className="mockup__screenshot"><img src={src} alt={`${title} project screenshot`} /></div>
    </div>
  );
}
function Projects({ year = "2026", settings }) {
  const { locale, t } = useLanguage();
  const sectionRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getProjects({ publishedOnly: true })
      .then((data) => {
        if (active) setProjects(data);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  /* SCROLL-REVEAL: satırlar görüş alanına girince "is-visible" basılır,
     animasyon tamamen CSS transition ile oynar */
  useEffect(() => {
    const targets = sectionRef.current.querySelectorAll(
      ".projects__header, .project",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // bir kere belir, hep kalsın
          }
        });
      },
      { threshold: 0.15 }, // satırın %15'i görününce tetikle
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [projects]);

  return (
    <section className="projects" id="work" ref={sectionRef}>
      <div className="projects__container">
        <div className="projects__header">
          <div className="projects__heading">
            <p className="projects__eyebrow">
              <span className="projects__eyebrow-dot"></span>
              {locale === "tr" ? t.projectsEyebrow : settings.projectsEyebrow}
            </p>
            <h2 className="projects__title">
              {locale === "tr" ? t.projectsTitle : settings.projectsTitle} <em>{locale === "tr" ? t.projectsHighlight : settings.projectsHighlight}</em>
            </h2>
          </div>
          <span className="projects__year">{year}</span>
        </div>

        <div className="projects__list">
          {loading && <p className="projects__status">{t.projectsLoading}</p>}
          {!loading && error && <p className="projects__status projects__status--error">{t.projectsError}: {error}</p>}
          {projects.map((rawProject, index) => {
            const project = localizeProject(rawProject, locale);
            return (
            <article
              className={`project ${index % 2 !== 0 ? "project--reverse" : ""}`}
              key={project.id}
            >
              <a
                className={`project__visual ${project.coverImage ? `project__visual--${project.mockupType}-image` : ""}`}
                href={project.projectUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.title} project`}
              >
                {project.coverImage ? <ProjectImageMockup src={project.coverImage} title={project.title} type={project.mockupType} /> : <ProjectMockup type={project.mockupType} />}
              </a>

              <div className="project__content">
                <div className="project__top">
                  <span className="project__number">{String(project.displayOrder).padStart(2, "0")}</span>
                  <span className="project__category">{project.type}</span>
                </div>

                <h3 className="project__title">
                  <a
                    className="project__title-link"
                    href={project.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{project.title}</span>
                  </a>
                </h3>

                <div className="project__tags">
                  {project.technologies.map((tag) => (
                    <span className="project__tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="project__description">{project.description}</p>

                <a
                  href={project.projectUrl}
                  className="project__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.viewProject}
                  <span className="project__link-arrow">↗</span>
                </a>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Projects;
