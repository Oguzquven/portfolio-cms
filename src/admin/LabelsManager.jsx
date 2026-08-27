import { useEffect, useState } from "react";
import { getSettings, updateSettings } from "../services/settingsApi";

const fields = [
  ["navWorkLabel", "Navbar · Work"], ["navAboutLabel", "Navbar · About"],
  ["navExperienceLabel", "Navbar · Experience"], ["navContactLabel", "Navbar · Contact"],
  ["projectsEyebrow", "Projects · Üst etiket"], ["projectsTitle", "Projects · Başlık"],
  ["projectsHighlight", "Projects · Vurgulu kelime"], ["experienceEyebrow", "Experience · Üst etiket"],
  ["experienceTitle", "Experience · Başlık"], ["experienceHighlight", "Experience · Vurgulu kelime"],
  ["technologyHeading", "Teknolojiler · Sol başlık"], ["technologyLabel", "Teknolojiler · Sağ etiket"],
];

export default function LabelsManager() {
  const [settings, setSettings] = useState(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(() => { getSettings().then(setSettings).catch((error) => setMessage(error.message)); }, []);
  if (!settings) return <section className="admin-card admin-content-card"><p>{message || "Metinler yükleniyor..."}</p></section>;
  const save = async (event) => {
    event.preventDefault(); setSaving(true); setMessage("");
    try { setSettings(await updateSettings(settings)); setMessage("Arayüz metinleri başarıyla kaydedildi."); }
    catch (error) { setMessage(error.message); }
    finally { setSaving(false); }
  };
  return <section className="admin-card admin-content-card">
    <div className="admin-card__head"><div><span className="admin-kicker">UI CONTENT</span><h3>Arayüz metinleri</h3><p>Navbar ve ana bölüm başlıklarının İngilizce görünümünü yönetin.</p></div></div>
    <form className="admin-settings-form" onSubmit={save}>
      <div className="admin-settings-fields">
        {fields.map(([name, label]) => <label key={name}>{label}<input name={name} value={settings[name] || ""} onChange={({target}) => setSettings((value) => ({...value,[target.name]:target.value}))}/></label>)}
      </div>
      <aside className="admin-settings-preview"><span className="admin-kicker">CANLI ÖNİZLEME</span><div><small>{settings.projectsEyebrow}</small><h3>{settings.projectsTitle} <em>{settings.projectsHighlight}</em></h3><p>{settings.technologyHeading} · {settings.technologyLabel}</p></div><dl><dt>Work</dt><dd>{settings.navWorkLabel}</dd><dt>About</dt><dd>{settings.navAboutLabel}</dd><dt>Experience</dt><dd>{settings.navExperienceLabel}</dd><dt>Contact</dt><dd>{settings.navContactLabel}</dd></dl></aside>
      <footer className="admin-hero-footer">{message && <p className={message.includes("başarıyla") ? "admin-success" : "admin-error"}>{message}</p>}<button className="admin-primary" disabled={saving}>{saving ? "Kaydediliyor..." : "Metinleri kaydet"}</button></footer>
    </form>
  </section>;
}
