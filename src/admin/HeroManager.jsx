import { useEffect, useState } from "react";
import oguz from "../assets/oguz.png";
import { getHero, updateHero } from "../services/heroApi";
import { uploadMedia } from "../services/mediaApi";

const fallbackHero = {
  eyebrow: "FULL-STACK DEVELOPER",
  titlePrefix: "I build scalable",
  titleHighlight: "systems",
  titleSuffix: "and clean interfaces.",
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

export default function HeroManager() {
  const [hero, setHero] = useState(fallbackHero);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getHero().then((value) => setHero({ ...fallbackHero, ...value }))
      .catch((error) => setMessage(error.message)).finally(() => setLoading(false));
  }, []);

  const change = ({ target }) => setHero((current) => ({ ...current, [target.name]: target.value }));
  const upload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true); setMessage("");
    try { const media=await uploadMedia(file);setHero((current)=>({...current,photoUrl:media.url})); }
    catch(error){setMessage(error.message);}finally{setUploading(false);}
  };
  const save = async (event) => {
    event.preventDefault(); setSaving(true); setMessage("");
    try { setHero(await updateHero(hero)); setMessage("Hero başarıyla kaydedildi."); }
    catch (error) { setMessage(error.message); }
    finally { setSaving(false); }
  };

  if (loading) return <section className="admin-card admin-content-card"><p>Hero içeriği yükleniyor...</p></section>;

  return <section className="admin-card admin-content-card admin-hero-manager">
    <div className="admin-card__head"><div><span className="admin-kicker">HERO EDITOR</span><h3>Hero içeriği</h3><p>Ana sayfanın ilk ekranındaki bütün metinleri, butonları, istatistikleri ve profil fotoğrafını yönetin.</p></div></div>
    <form onSubmit={save} className="admin-hero-form">
      <div className="admin-hero-fields">
        <label className="wide">Üst etiket<input name="eyebrow" value={hero.eyebrow} onChange={change}/></label>
        <label>Başlık başlangıcı<input name="titlePrefix" value={hero.titlePrefix} onChange={change}/></label>
        <label>Vurgulu kelime<input name="titleHighlight" value={hero.titleHighlight} onChange={change}/></label>
        <label className="wide">Başlık devamı<input name="titleSuffix" value={hero.titleSuffix} onChange={change}/></label>
        <label className="wide">Açıklama<textarea name="description" value={hero.description} onChange={change} rows="4"/></label>
        <label>Birincil buton<input name="primaryText" value={hero.primaryText} onChange={change}/></label>
        <label>Birincil bağlantı<input name="primaryUrl" value={hero.primaryUrl} onChange={change}/></label>
        <label>İkincil buton<input name="secondaryText" value={hero.secondaryText} onChange={change}/></label>
        <label>İkincil bağlantı<input name="secondaryUrl" value={hero.secondaryUrl} onChange={change}/></label>
        <label>Konum<input name="location" value={hero.location} onChange={change}/></label>
        <label>Uygunluk etiketi<input name="availabilityLabel" value={hero.availabilityLabel} onChange={change}/></label>
        <label className="wide">Uygunluk metni<input name="availabilityText" value={hero.availabilityText} onChange={change}/></label>
        {[1,2,3,4].map((number) => <div className="admin-hero-stat" key={number}><strong>İstatistik {number}</strong><input aria-label={`İstatistik ${number} değeri`} name={`stat${number}Value`} value={hero[`stat${number}Value`]} onChange={change}/><input aria-label={`İstatistik ${number} etiketi`} name={`stat${number}Label`} value={hero[`stat${number}Label`]} onChange={change}/></div>)}
        <label className="admin-image-upload wide"><input type="file" accept="image/png,image/jpeg,image/webp" onChange={upload}/><span className="admin-image-upload__icon">＋</span><span><strong>Profil fotoğrafını değiştir</strong><small>{uploading?"Yükleniyor...":"PNG, JPG veya WEBP"}</small></span><b>{uploading?"Bekleyin":"Dosya seç"}</b></label>
      </div>
      <aside className="admin-hero-preview"><span className="admin-kicker">LIVE PREVIEW</span><img src={hero.photoUrl || oguz} alt="Hero profil önizlemesi"/><small>{hero.eyebrow}</small><h3>{hero.titlePrefix} <em>{hero.titleHighlight}</em> {hero.titleSuffix}</h3><p>{hero.description}</p><div><b>{hero.primaryText}</b><span>{hero.secondaryText}</span></div></aside>
      <footer className="admin-hero-footer">{message && <p className={message.includes("başarıyla") ? "admin-success" : "admin-error"}>{message}</p>}<button className="admin-primary" disabled={saving||uploading}>{uploading?"Fotoğraf yükleniyor...":saving ? "Kaydediliyor..." : "Değişiklikleri kaydet"}</button></footer>
    </form>
  </section>;
}
