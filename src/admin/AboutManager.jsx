import { useEffect, useState } from "react";
import { getAbout, updateAbout } from "../services/aboutApi";

const fallback = { eyebrow:"ABOUT", titleLineOne:"I work across the stack,", titleLineTwo:"but feel most at home", titleHighlight:"behind the interface.", bioLabel:"A LITTLE ABOUT ME", firstParagraph:"I'm Oğuz, a Full-Stack Developer and Computer Engineering graduate based in Istanbul. I have hands-on experience with Java, Spring Boot, .NET/C#, React and PostgreSQL.", secondParagraph:"Through internships at Related Digital (Doğuş Teknoloji), Dividesoft and Flalingo, I worked on REST APIs and full-stack applications. I'm particularly interested in backend development and building reliable, scalable software solutions.", ctaText:"LET'S WORK TOGETHER", ctaUrl:"#contact" };

export default function AboutManager() {
  const [about,setAbout]=useState(fallback); const [loading,setLoading]=useState(true); const [saving,setSaving]=useState(false); const [message,setMessage]=useState("");
  useEffect(()=>{getAbout().then(value=>setAbout({...fallback,...value})).catch(error=>setMessage(error.message)).finally(()=>setLoading(false));},[]);
  const change=({target})=>setAbout(current=>({...current,[target.name]:target.value}));
  const save=async(event)=>{event.preventDefault();setSaving(true);setMessage("");try{setAbout(await updateAbout(about));setMessage("About başarıyla kaydedildi.");}catch(error){setMessage(error.message);}finally{setSaving(false);}};
  if(loading)return <section className="admin-card admin-content-card"><p>About içeriği yükleniyor...</p></section>;
  return <section className="admin-card admin-content-card admin-about-manager">
    <div className="admin-card__head"><div><span className="admin-kicker">ABOUT EDITOR</span><h3>Hakkımda içeriği</h3><p>Başlık, biyografi ve iletişim çağrısını tek ekrandan yönetin.</p></div></div>
    <form className="admin-about-form" onSubmit={save}>
      <div className="admin-about-fields">
        <label className="wide">Üst etiket<input name="eyebrow" value={about.eyebrow} onChange={change}/></label>
        <label>Başlık — 1. satır<input name="titleLineOne" value={about.titleLineOne} onChange={change}/></label>
        <label>Başlık — 2. satır<input name="titleLineTwo" value={about.titleLineTwo} onChange={change}/></label>
        <label className="wide">Vurgulu başlık<input name="titleHighlight" value={about.titleHighlight} onChange={change}/></label>
        <label className="wide">Biyografi etiketi<input name="bioLabel" value={about.bioLabel} onChange={change}/></label>
        <label className="wide">Birinci paragraf<textarea name="firstParagraph" rows="4" value={about.firstParagraph} onChange={change}/></label>
        <label className="wide">İkinci paragraf<textarea name="secondParagraph" rows="4" value={about.secondParagraph} onChange={change}/></label>
        <label>Buton metni<input name="ctaText" value={about.ctaText} onChange={change}/></label>
        <label>Buton bağlantısı<input name="ctaUrl" value={about.ctaUrl} onChange={change}/></label>
      </div>
      <aside className="admin-about-preview"><span className="admin-kicker">LIVE PREVIEW</span><small>{about.eyebrow}</small><h3>{about.titleLineOne}<br/>{about.titleLineTwo}<br/><em>{about.titleHighlight}</em></h3><b>{about.bioLabel}</b><p>{about.firstParagraph}</p><p>{about.secondParagraph}</p><span className="admin-about-preview__cta">{about.ctaText}</span></aside>
      <footer className="admin-hero-footer">{message&&<p className={message.includes("başarıyla")?"admin-success":"admin-error"}>{message}</p>}<button className="admin-primary" disabled={saving}>{saving?"Kaydediliyor...":"Değişiklikleri kaydet"}</button></footer>
    </form>
  </section>;
}
