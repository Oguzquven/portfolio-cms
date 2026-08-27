import { useEffect, useMemo, useState } from "react";
import {
  createExperience,
  deleteExperience,
  getExperiences,
  toggleExperiencePublication,
  updateExperience,
} from "../services/experienceApi";
import { uploadMedia } from "../services/mediaApi";

const emptyExperience = {
  company: "", role: "", startDate: "2025-01", endDate: "2025-01",
  description: "", technologies: [], logoUrl: "", published: true, displayOrder: 1,
};

function ExperienceModal({ value, mode, onClose, onSave }) {
  const [draft, setDraft] = useState({ ...value, technologiesText: value.technologies.join(", ") });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const change = (event) => {
    const { name, value: nextValue, checked, type } = event.target;
    setDraft((previous) => ({ ...previous, [name]: type === "checkbox" ? checked : nextValue }));
  };
  const upload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);setError("");try{const media=await uploadMedia(file);setDraft((previous)=>({...previous,logoUrl:media.url}));}catch(requestError){setError(requestError.message);}finally{setUploading(false);}
  };
  const submit = async (event) => {
    event.preventDefault(); setSaving(true); setError("");
    try {
      await onSave({ ...draft, technologies: draft.technologiesText.split(",").map((item) => item.trim()).filter(Boolean) });
      onClose();
    } catch (requestError) { setError(requestError.message); } finally { setSaving(false); }
  };
  return <div className="admin-modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="admin-project-editor admin-experience-modal" role="dialog" aria-modal="true">
      <header className="admin-project-editor__header"><div><span className="admin-kicker">EXPERIENCE EDITOR</span><h2>{mode === "create" ? "Deneyim ekle" : "Deneyimi düzenle"}</h2><p>Timeline üzerinde gösterilecek firma ve görev bilgilerini yönetin.</p></div><button className="admin-modal-close" onClick={onClose}>×</button></header>
      <form className="admin-project-editor__form" onSubmit={submit}>
        <div className="admin-project-editor__fields">
          <label>Firma adı<input name="company" value={draft.company} onChange={change} required /></label>
          <label>Görev<input name="role" value={draft.role} onChange={change} required /></label>
          <label>Başlangıç tarihi<input name="startDate" type="month" value={draft.startDate} onChange={change} required /></label>
          <label>Bitiş tarihi<input name="endDate" type="month" value={draft.endDate} onChange={change} required /></label>
          <label className="wide">Teknolojiler<input name="technologiesText" value={draft.technologiesText} onChange={change} required /><small>Virgülle ayırın.</small></label>
          <label className="wide">Açıklama<textarea name="description" rows="5" value={draft.description} onChange={change} required /></label>
          <label className="admin-image-upload wide"><input type="file" accept="image/*,.svg" onChange={upload}/><span className="admin-image-upload__icon">＋</span><span><strong>Firma logosunu yükle</strong><small>{uploading?"Yükleniyor...":"PNG, JPG, WEBP veya SVG"}</small></span><b>{uploading?"Bekleyin":"Dosya seç"}</b></label>
          <label className="admin-editor-publish wide"><input name="published" type="checkbox" checked={draft.published} onChange={change}/><span><i /></span><div><strong>Deneyimi yayınla</strong><small>Kapalı olduğunda timeline üzerinde görünmez.</small></div></label>
        </div>
        <aside className="admin-project-preview"><span className="admin-kicker">LIVE PREVIEW</span><div className="admin-experience-preview__logo">{draft.logoUrl ? <img src={draft.logoUrl} alt=""/> : <strong>{draft.company || "Firma"}</strong>}</div><small>{draft.startDate} — {draft.endDate}</small><h3>{draft.company || "Firma adı"}</h3><p><strong>{draft.role || "Görev"}</strong></p><p>{draft.description || "Deneyim açıklaması"}</p></aside>
        <footer className="admin-project-editor__footer">{error && <p className="admin-error">{error}</p>}<button type="button" onClick={onClose} disabled={uploading}>Vazgeç</button><button className="admin-primary" disabled={saving||uploading}>{uploading?"Logo yükleniyor...":saving ? "Kaydediliyor..." : "Kaydet"}</button></footer>
      </form>
    </section>
  </div>;
}

export default function ExperienceManager() {
  const [items, setItems] = useState([]); const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); const [editing, setEditing] = useState(null); const [creating, setCreating] = useState(false);
  const ordered = useMemo(() => [...items].sort((a,b) => a.displayOrder-b.displayOrder), [items]);
  const load = () => { setLoading(true); setError(""); getExperiences().then(setItems).catch((e)=>setError(e.message)).finally(()=>setLoading(false)); };
  useEffect(load, []);
  const add = async (value) => { const displayOrder = items.length ? Math.max(...items.map((item)=>item.displayOrder))+1 : 1; const saved=await createExperience({...value,displayOrder}); setItems((old)=>[...old,saved]); };
  const update = async (value) => { const saved=await updateExperience(editing.id,{...editing,...value}); setItems((old)=>old.map((item)=>item.id===saved.id?saved:item)); };
  const remove = async (item) => { if (!window.confirm(`“${item.company}” deneyimi silinsin mi?`)) return; await deleteExperience(item.id); setItems((old)=>old.filter((value)=>value.id!==item.id)); };
  const toggle = async (item) => { const saved=await toggleExperiencePublication(item.id); setItems((old)=>old.map((value)=>value.id===saved.id?saved:value)); };
  return <section className="admin-card admin-content-card admin-projects-card">
    <div className="admin-card__head admin-projects-head"><div><span className="admin-kicker">CAREER CONTENT</span><h3>Experience</h3><p>Firma, görev, tarih, logo ve timeline görünürlüğünü yönetin.</p></div><button className="admin-primary" onClick={()=>setCreating(true)}>＋ Deneyim ekle</button></div>
    <div className="admin-projects-table"><div className="admin-projects-columns"><span>FİRMA / GÖREV</span><span>TARİH</span><span>YAYIN DURUMU</span><span>İŞLEMLER</span></div>
      {loading && <div className="admin-projects-empty"><strong>Deneyimler yükleniyor...</strong></div>}
      {error && <div className="admin-projects-empty"><strong>Veriler getirilemedi</strong><small>{error}</small><button onClick={load}>Tekrar dene</button></div>}
      {!loading && !error && ordered.map((item)=><article className="admin-project-row" key={item.id}>
        <div className="admin-project-main"><span className="admin-project-mark">{String(item.displayOrder).padStart(2,"0")}</span><div><strong>{item.company}</strong><small>{item.role}</small></div></div>
        <span className="admin-project-type">{item.startDate} — {item.endDate}</span>
        <button className={`admin-publish-toggle ${item.published?"is-published":""}`} onClick={()=>toggle(item)}><span className="admin-publish-switch"><i/></span><span>{item.published?"Yayında":"Taslak"}</span></button>
        <div className="admin-row-actions"><button onClick={()=>setEditing(item)}>Düzenle</button><button className="danger" onClick={()=>remove(item)}>Sil</button></div>
      </article>)}
    </div>
    {creating && <ExperienceModal mode="create" value={emptyExperience} onClose={()=>setCreating(false)} onSave={add}/>} 
    {editing && <ExperienceModal mode="edit" value={editing} onClose={()=>setEditing(null)} onSave={update}/>} 
  </section>;
}
