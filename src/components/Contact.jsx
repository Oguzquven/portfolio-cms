import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo-dark.png";
import "./Contact.css";
import { getContact } from "../services/contactApi";
import { sendMessage } from "../services/messageApi";
import { localizeContact, useLanguage } from "../i18n";

const fallbackContact={eyebrow:"CONTACT",kicker:"HAVE SOMETHING IN MIND?",titlePrefix:"Let's build something",titleHighlight:"great.",description:"I'm always interested in new projects, collaborations and opportunities to build meaningful digital products.",githubUrl:"https://github.com/Oguzquven",githubLabel:"github.com/Oguzquven",linkedinUrl:"https://www.linkedin.com/in/oguzquven",linkedinLabel:"linkedin.com/in/oguzquven",email:"oguzquven70@gmail.com",emailLabel:"Say hello",formSubject:"Portfolio — Yeni mesaj",namePlaceholder:"Your name",emailPlaceholder:"you@example.com",messagePlaceholder:"Tell me about your idea...",submitText:"SEND MESSAGE",successMessage:"Message sent! I'll get back to you soon.",errorMessage:"Something went wrong — please try again or use the email link.",footerName:"OĞUZ GÜVEN",footerRole:"FULL-STACK DEVELOPER",footerLocation:"ISTANBUL, TR",footerCopyright:"© 2026"};

function Contact() {
  const { locale, t } = useLanguage();
  const sectionRef = useRef(null);
  const [contactContent,setContactContent]=useState(fallbackContact);

  useEffect(()=>{getContact().then(value=>setContactContent({...fallbackContact,...value})).catch(()=>{});},[]);

  /* SCROLL-REVEAL: görünürlük React state'inde (diğer bölümlerle aynı desen) */
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

  /* ---------- FORM: mesajı kendi Spring Boot API'mize kaydeder ---------- */
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      /* KENDİ MAİL ADRESİNLE DEĞİŞTİR */
      await sendMessage(form);

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const content = localizeContact(contactContent, locale);
  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <svg
        className="contact__wave"
        viewBox="0 0 1440 240"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="#ffffff"
          d="M0 0H1440V54C1228 174 1076 24 824 126C574 228 356 58 0 176Z"
        />
      </svg>
      <div className="contact__container">
        {/* HEADER */}
        <div
          className={`contact__header ${
            visibleIds.has("header") ? "is-visible" : ""
          }`}
          data-reveal="header"
        >
          <span className="contact__eyebrow">
            <span className="contact__dot"></span>
            {content.eyebrow}
          </span>
        </div>

        {/* İÇERİK: solda çağrı + linkler, sağda form */}
        <div
          className={`contact__content ${
            visibleIds.has("content") ? "is-visible" : ""
          }`}
          data-reveal="content"
        >
          {/* SOL KOLON */}
          <div className="contact__intro">
            <p className="contact__small">{content.kicker}</p>

            <h2 className="contact__title">
              {content.titlePrefix} <em>{content.titleHighlight}</em>
            </h2>

            <p className="contact__text">
              {content.description}
            </p>

            {/* LİNK KARTLARI */}
            <div className="contact__links">
              {/* KENDİ LİNKLERİNLE DEĞİŞTİR */}
              <a
                href={content.githubUrl}
                className="contact__link"
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact__link-icon contact__link-icon--github" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.82a9.6 9.6 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.77c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>
                </span>

                <div className="contact__link-body">
                  <small>{content.githubLabel}</small>
                  <strong>GitHub</strong>
                </div>

              </a>

              <a
                href={content.linkedinUrl}
                className="contact__link"
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact__link-icon contact__link-icon--linkedin" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M6.5 8.25H3V21h3.5V8.25ZM4.75 3A2.04 2.04 0 1 0 4.75 7.08 2.04 2.04 0 0 0 4.75 3ZM21 13.69c0-3.84-2.05-5.63-4.79-5.63-2.2 0-3.19 1.21-3.74 2.06V8.25H9V21h3.47v-6.31c0-1.66.32-3.27 2.38-3.27 2.03 0 2.05 1.9 2.05 3.38V21H21v-7.31Z"/></svg>
                </span>

                <div className="contact__link-body">
                  <small>{content.linkedinLabel}</small>
                  <strong>LinkedIn</strong>
                </div>

              </a>

              <a href={`mailto:${content.email}`} className="contact__link">
                <span className="contact__link-icon contact__link-icon--mail" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm9 7.1L20.2 7H3.8L12 12.1Zm0 2.35L3 8.85V17h18V8.85l-9 5.6Z"/></svg>
                </span>

                <div className="contact__link-body">
                  <small>{content.email}</small>
                  <strong>{content.emailLabel}</strong>
                </div>

              </a>
            </div>
          </div>

          {/* SAĞ KOLON: FORM */}
          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__field">
              <label htmlFor="contact-name">{t.name}</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder={content.namePlaceholder}
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact__field">
              <label htmlFor="contact-email">{t.email}</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder={content.emailPlaceholder}
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact__field">
              <label htmlFor="contact-message">{t.message}</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                placeholder={content.messagePlaceholder}
                value={form.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="contact__submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? t.sending : content.submitText}
            </button>

            {/* Durum mesajları */}
            {status === "success" && (
              <p className="contact__note contact__note--success">
                ✓ {content.successMessage}
              </p>
            )}
            {status === "error" && (
              <p className="contact__note contact__note--error">
                ✕ {content.errorMessage}
              </p>
            )}
          </form>
        </div>

        {/* FOOTER */}
        <footer
          className={`contact__footer ${
            visibleIds.has("footer") ? "is-visible" : ""
          }`}
          data-reveal="footer"
        >
          <div className="contact__footer-brand">
            <img src={logo} alt="Oğuz Güven" className="contact__footer-logo" />

            <div className="contact__footer-name">
              <strong>{content.footerName}</strong>
              <span>{content.footerRole}</span>
            </div>
          </div>

          <div className="contact__footer-meta">
            <span>{content.footerLocation}</span>
            <span>{content.footerCopyright}</span>
          </div>

          <a href="#" className="contact__top">
            {t.backToTop}
            <span className="contact__top-arrow">↑</span>
          </a>
        </footer>
      </div>
    </section>
  );
}

export default Contact;
