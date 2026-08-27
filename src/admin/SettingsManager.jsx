import { useEffect, useState } from "react";
import { getSettings, updateSettings } from "../services/settingsApi";
const fallback = {
  siteName: "Oğuz Güven",
  role: "Full-Stack Developer",
  browserTitle: "Oğuz Güven | Full-Stack Developer",
  metaDescription:
    "Oğuz Güven'in full-stack geliştirme projeleri, deneyimleri ve teknoloji portfolyosu.",
  siteLanguage: "en",
  displayYear: "2026",
  projectsYear: "2026",
  technologyYear: "2026",
  cvUrl: "",
  cvFileName: "",
  navWorkLabel: "WORK",
  navAboutLabel: "ABOUT",
  navExperienceLabel: "EXPERIENCE",
  navContactLabel: "CONTACT",
  projectsEyebrow: "SELECTED WORK",
  projectsTitle: "Things I've",
  projectsHighlight: "built",
  experienceEyebrow: "EXPERIENCE",
  experienceTitle: "Where I've",
  experienceHighlight: "worked",
  technologyHeading: "WHAT I WORK WITH",
  technologyLabel: "TECH STACK",
};
export default function SettingsManager() {
  const [settings, setSettings] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    getSettings()
      .then((v) => setSettings({ ...fallback, ...v, cvUrl: "", cvFileName: "" }))
      .catch((e) => setMessage(e.message))
      .finally(() => setLoading(false));
  }, []);
  const change = ({ target }) =>
    setSettings((v) => ({ ...v, [target.name]: target.value }));
  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      setSettings(await updateSettings({ ...settings, cvUrl: "", cvFileName: "" }));
      setMessage("Ayarlar başarıyla kaydedildi.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };
  if (loading)
    return (
      <section className="admin-card admin-content-card">
        <p>Ayarlar yükleniyor...</p>
      </section>
    );
  return (
    <section className="admin-card admin-content-card">
      <div className="admin-card__head">
        <div>
          <span className="admin-kicker">SITE SETTINGS</span>
          <h3>Genel ayarlar</h3>
          <p>Marka, SEO ve yıl bilgilerini tek noktadan yönetin.</p>
        </div>
      </div>
      <form className="admin-settings-form" onSubmit={save}>
        <div className="admin-settings-fields">
          <label>
            Site/marka adı
            <input
              name="siteName"
              value={settings.siteName}
              onChange={change}
            />
          </label>
          <label>
            Unvan
            <input name="role" value={settings.role} onChange={change} />
          </label>
          <label className="wide">
            Tarayıcı başlığı
            <input
              name="browserTitle"
              value={settings.browserTitle}
              onChange={change}
            />
          </label>
          <label className="wide">
            SEO açıklaması
            <textarea
              rows="4"
              name="metaDescription"
              value={settings.metaDescription}
              onChange={change}
            />
            <small>
              Arama motorlarında sayfayı anlatan yaklaşık 150–160 karakterlik
              metin.
            </small>
          </label>
          <label>
            Site dili
            <input
              name="siteLanguage"
              value={settings.siteLanguage}
              onChange={change}
              placeholder="tr"
            />
          </label>
          <label>
            Genel yıl
            <input
              name="displayYear"
              value={settings.displayYear}
              onChange={change}
            />
          </label>
          <label>
            Projects yılı
            <input
              name="projectsYear"
              value={settings.projectsYear}
              onChange={change}
            />
          </label>
          <label>
            Tech Stack yılı
            <input
              name="technologyYear"
              value={settings.technologyYear}
              onChange={change}
            />
          </label>
        </div>
        <aside className="admin-settings-preview">
          <span className="admin-kicker">SEARCH PREVIEW</span>
          <div>
            <small>oguz.dev</small>
            <h3>{settings.browserTitle}</h3>
            <p>{settings.metaDescription}</p>
          </div>
          <dl>
            <dt>Marka</dt>
            <dd>{settings.siteName}</dd>
            <dt>Unvan</dt>
            <dd>{settings.role}</dd>
            <dt>Dil</dt>
            <dd>{settings.siteLanguage}</dd>
          </dl>
        </aside>
        <footer className="admin-hero-footer">
          {message && (
            <p
              className={
                message.includes("başarıyla")
                  ? "admin-success"
                  : "admin-error"
              }
            >
              {message}
            </p>
          )}
          <button className="admin-primary" disabled={saving}>
            {saving ? "Kaydediliyor..." : "Ayarları kaydet"}
          </button>
        </footer>
      </form>
    </section>
  );
}
