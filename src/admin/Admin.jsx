import { useEffect, useMemo, useState } from "react";
import { Navigate, NavLink, Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ogLogo from "../assets/logo.png";
import ogLogoLight from "../assets/logo-dark.png";
import {
  createProject as createProjectRequest,
  deleteProject as deleteProjectRequest,
  getProjects,
  toggleProjectPublication,
  updateProject as updateProjectRequest,
} from "../services/projectApi";
import "./Admin.css";
import ExperienceManager from "./ExperienceManager";
import TechnologyManager from "./TechnologyManager";
import HeroManager from "./HeroManager";
import AboutManager from "./AboutManager";
import ContactManager from "./ContactManager";
import SettingsManager from "./SettingsManager";
import LabelsManager from "./LabelsManager";
import { getSession, login as loginRequest, logout as logoutRequest } from "../services/authApi";
import MessagesManager from "./MessagesManager";
import { uploadMedia } from "../services/mediaApi";

const icons = {
  dashboard: "⌂", hero: "✦", projects: "▦", about: "◉", technologies: "⌘",
  experience: "◷", contact: "✉", messages: "▤", labels: "Aa", settings: "⚙", logout: "↪",
};

const navigation = [
  ["dashboard", "Dashboard"], ["hero", "Hero"], ["projects", "Projects"],
  ["about", "About"], ["technologies", "Technologies"], ["experience", "Experience"],
  ["contact", "Contact"], ["messages", "Messages"], ["labels", "UI Texts"], ["settings", "Settings"],
];

const initialExperience = [
  { company: "Related Digital (Doğuş Teknoloji)", role: ".NET Backend Developer Intern", period: "Jul 2025 — Dec 2025" },
  { company: "Dividesoft", role: "Full Stack Developer Intern", period: "Mar 2025 — Jun 2025" },
  { company: "Flalingo", role: "Full-Stack Developer Intern", period: "Feb 2025 — Apr 2025" },
];

function Login({ onLogin }) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const submit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!data.get("email") || !data.get("password")) return setError("E-posta ve parola gerekli.");
    setSubmitting(true); setError("");
    try { await onLogin({ email: data.get("email"), password: data.get("password") }); }
    catch (requestError) { setError(requestError.message); }
    finally { setSubmitting(false); }
  };
  return <main className="admin-login">
    <section className="admin-login__brand">
      <a href="/" className="admin-logo"><img src={ogLogoLight} alt="Oğuz Güven logo"/><span>OĞUZ GÜVEN</span></a>
      <div><span className="admin-kicker">PORTFOLIO CMS</span><h1>İçeriğin<br/><em>kontrol altında.</em></h1><p>Portfolyonu tek bir yerden, hızlı ve güvenli biçimde yönet.</p></div>
      <small>© 2026 Oğuz Güven</small>
    </section>
    <section className="admin-login__panel">
      <form onSubmit={submit} className="admin-login__form">
        <span className="admin-login__mark"><img src={ogLogo} alt="Oğuz Güven logo"/></span>
        <div><span className="admin-kicker">ADMIN PANEL</span><h2>Tekrar hoş geldin.</h2><p>Devam etmek için yönetici hesabınla giriş yap.</p></div>
        <label>E-posta<input name="email" type="email" placeholder="admin@portfolio.dev" autoComplete="username" /></label>
        <label>Parola<div className="password-field"><input name="password" type={show ? "text" : "password"} placeholder="••••••••" autoComplete="current-password"/><button type="button" onClick={() => setShow(!show)}>{show ? "Gizle" : "Göster"}</button></div></label>
        {error && <p className="admin-error">{error}</p>}
        <button className="admin-primary" type="submit" disabled={submitting}>{submitting ? "Giriş yapılıyor..." : "Panele giriş yap"} <span>→</span></button>
        <p className="admin-demo">Yönetici hesabınızla güvenli oturum açın.</p>
      </form>
    </section>
  </main>;
}

function Header({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const currentKey = location.pathname.split("/").filter(Boolean)[1] || "dashboard";
  const title = navigation.find(([key]) => key === currentKey)?.[1] || "Dashboard";

  return <header className="admin-header">
    <button className="admin-menu" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Menüyü aç">☰</button>
    <div><span>Portfolio CMS</span><h1>{title}</h1></div>
    <div className="admin-header__actions"><a href="/" target="_blank">Siteyi görüntüle ↗</a><button className="admin-avatar">OG</button></div>
  </header>;
}

function Sidebar({ open, logout, onNavigate }) {
  return <aside className={`admin-sidebar ${open ? "is-open" : ""}`}>
    <a className="admin-sidebar__logo" href="/"><img src={ogLogo} alt="Oğuz Güven logo"/><div>OĞUZ GÜVEN<small>PORTFOLIO CMS</small></div></a>
    <nav>{navigation.map(([key,label]) => <NavLink key={key} end={key === "dashboard"} to={key === "dashboard" ? "/admin" : `/admin/${key}`} onClick={onNavigate} className={({isActive})=>isActive ? "active" : ""}><i>{icons[key]}</i>{label}</NavLink>)}</nav>
    <div className="admin-sidebar__bottom"><div className="admin-user"><span>OG</span><div>Oğuz Güven<small>Administrator</small></div></div><button onClick={logout}><i>{icons.logout}</i>Çıkış yap</button></div>
  </aside>;
}

const Stat = ({ value, label, note, tone }) => <article className={`admin-stat ${tone || ""}`}><div><span>{label}</span><strong>{value}</strong></div><small>{note}</small></article>;

function Dashboard({ projects }) {
  const navigate = useNavigate();
  const publishedCount = projects.filter((project) => project.published).length;

  return <>
    <section className="admin-welcome"><div><span className="admin-kicker">GOOD MORNING, OĞUZ</span><h2>Portfolyon bugün <em>harika</em> görünüyor.</h2><p>İçeriklerini yönet, güncelle ve yayın durumunu buradan takip et.</p></div><button className="admin-primary" onClick={() => navigate("/admin/projects")}>Projeleri yönet <span>→</span></button></section>
    <section className="admin-stats"><Stat label="Toplam proje" value={projects.length} note={`${publishedCount} yayında`} tone="blue"/><Stat label="Deneyim" value="3" note="2024 — 2025"/><Stat label="Teknoloji" value="13" note="Güncel stack" tone="coral"/><Stat label="Son güncelleme" value="Bugün" note="İçerikler güncel"/></section>
    <section className="admin-grid">
      <div className="admin-card"><div className="admin-card__head"><div><span className="admin-kicker">QUICK ACCESS</span><h3>İçerik yönetimi</h3></div></div><div className="quick-grid">{navigation.slice(1,7).map(([key,label]) => <button key={key} onClick={() => navigate(`/admin/${key}`)}><i>{icons[key]}</i><span>{label}<small>Düzenle ve yönet</small></span><b>→</b></button>)}</div></div>
      <div className="admin-card admin-activity"><div className="admin-card__head"><div><span className="admin-kicker">ACTIVITY</span><h3>Son hareketler</h3></div></div>{["Contact bölümü güncellendi","Experience tarihleri düzenlendi","Teknoloji alanı yenilendi"].map((item,i)=><div className="activity-row" key={item}><span>{i===0?"●":"○"}</span><div>{item}<small>{i===0?"Bugün, 06:12":`${i+1} gün önce`}</small></div></div>)}</div>
    </section>
  </>;
}

const emptyProject = {
  title: "",
  type: "Full-Stack Project",
  technologies: [],
  description: "",
  projectUrl: "#",
  mockupType: "commerce",
  coverImage: "",
  coverImageName: "",
  published: false,
  displayOrder: 1,
};

function ProjectEditorModal({ mode, project, onClose, onCreate, onUpdate }) {
  const isCreateMode = mode === "create";
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [draft, setDraft] = useState(() => ({
    ...project,
    technologiesText: project.technologies.join(", "),
  }));

  const changeField = (event) => {
    const { name, value, type, checked } = event.target;
    setDraft((previousDraft) => ({
      ...previousDraft,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const uploadImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true); setSaveError("");
    try {
      const media = await uploadMedia(file);
      setDraft((previousDraft) => ({
        ...previousDraft,
        coverImage: media.url,
        coverImageName: media.originalName,
      }));
    } catch (error) { setSaveError(error.message); }
    finally { setUploading(false); }
  };

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setSaveError("");

    const technologies = draft.technologiesText
      .split(",")
      .map((technology) => technology.trim())
      .filter(Boolean);

    const projectData = {
      title: draft.title.trim(),
      type: draft.type.trim(),
      technologies,
      description: draft.description.trim(),
      projectUrl: draft.projectUrl.trim(),
      mockupType: draft.mockupType,
      coverImage: draft.coverImage,
      coverImageName: draft.coverImageName || "",
      published: draft.published,
    };

    try {
      if (isCreateMode) {
        await onCreate(projectData);
      } else {
        await onUpdate(project.id, projectData);
      }
      onClose();
    } catch (error) {
      setSaveError(error.message);
    } finally {
      setSaving(false);
    }
  };

  return <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event)=>{if(event.target===event.currentTarget) onClose();}}>
    <section className="admin-project-editor" role="dialog" aria-modal="true" aria-labelledby="project-editor-title">
      <header className="admin-project-editor__header">
        <div><span className="admin-kicker">{isCreateMode ? "NEW PROJECT" : "PROJECT EDITOR"}</span><h2 id="project-editor-title">{isCreateMode ? "Yeni proje oluştur" : "Projeyi düzenle"}</h2><p>{isCreateMode ? "Yeni projenin portfolio üzerinde görünecek bilgilerini ekleyin." : "Portfolio Projects bölümünde gösterilecek bütün bilgileri yönetin."}</p></div>
        <button type="button" className="admin-modal-close" onClick={onClose} aria-label="Editörü kapat">×</button>
      </header>

      <form onSubmit={submit} className="admin-project-editor__form">
        <div className="admin-project-editor__fields">
          <label>Proje başlığı<input name="title" value={draft.title} onChange={changeField} required /></label>
          <label>Proje türü<input name="type" value={draft.type} onChange={changeField} placeholder="Full-Stack Project" required /></label>
          <label className="wide">Kullanılan teknolojiler<input name="technologiesText" value={draft.technologiesText} onChange={changeField} placeholder="React, Spring Boot, PostgreSQL"/><small>Teknolojileri virgülle ayırın.</small></label>
          <label className="wide">Açıklama<textarea name="description" value={draft.description} onChange={changeField} rows="5" required /></label>
          <label>Proje bağlantısı<input name="projectUrl" value={draft.projectUrl} onChange={changeField} placeholder="https://..." /></label>
          <label>Mockup türü<select name="mockupType" value={draft.mockupType} onChange={changeField}><option value="commerce">E-Commerce</option><option value="social">Social Media</option><option value="portfolio">Portfolio</option><option value="aynova">Corporate / Studio</option><option value="custom">Özel görsel</option></select></label>

          <label className="admin-image-upload wide">
            <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={uploadImage}/>
            <span className="admin-image-upload__icon">＋</span>
            <span><strong>Proje görseli yükle</strong><small>{uploading ? "Yükleniyor..." : draft.coverImageName || "PNG, JPG, WEBP veya SVG · Kalıcı dosya"}</small></span>
            <b>{uploading ? "Bekleyin" : "Dosya seç"}</b>
          </label>

          <label className="admin-editor-publish wide"><input name="published" type="checkbox" checked={draft.published} onChange={changeField}/><span><i /></span><div><strong>Projeyi yayınla</strong><small>Kapalı olduğunda proje taslak olarak tutulur.</small></div></label>
        </div>

        <aside className="admin-project-preview">
          <span className="admin-kicker">LIVE PREVIEW</span>
          <div className={`admin-project-preview__visual preview--${draft.mockupType}`}>
            {draft.coverImage ? <img src={draft.coverImage} alt="Yüklenen proje önizlemesi"/> : <><span>{isCreateMode ? "NEW" : String(project.displayOrder).padStart(2,"0")}</span><strong>{draft.mockupType.toUpperCase()}</strong></>}
          </div>
          <small>{draft.type || "Proje türü"}</small>
          <h3>{draft.title || "Proje başlığı"}</h3>
          <div className="admin-project-preview__tags">{draft.technologiesText.split(",").filter((item)=>item.trim()).slice(0,4).map((item,index)=><span key={`${item}-${index}`}>{item.trim()}</span>)}</div>
          <p>{draft.description || "Proje açıklaması burada görünecek."}</p>
        </aside>

        <footer className="admin-project-editor__footer">{saveError && <p className="admin-error">{saveError}</p>}<button type="button" onClick={onClose} disabled={saving||uploading}>Vazgeç</button><button type="submit" className="admin-primary" disabled={saving||uploading}>{uploading ? "Görsel yükleniyor..." : saving ? "Kaydediliyor..." : isCreateMode ? "Projeyi oluştur" : "Değişiklikleri kaydet"}</button></footer>
      </form>
    </section>
  </div>;
}

function Projects({ projects, loading, error, onRetry, onAddProject, onUpdateProject, onDeleteProject, onToggleStatus }) {
  const [query, setQuery] = useState("");
  const [editingProject, setEditingProject] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const visibleProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return [...projects]
      .filter((project) =>
        project.title.toLowerCase().includes(normalizedQuery),
      )
      .sort((first, second) => first.displayOrder - second.displayOrder);
  }, [projects, query]);

  const confirmDelete = async (project) => {
    const confirmed = window.confirm(`“${project.title}” projesi silinsin mi?`);
    if (confirmed) await onDeleteProject(project.id);
  };

  return <section className="admin-card admin-content-card admin-projects-card">
    <div className="admin-card__head admin-projects-head">
      <div><span className="admin-kicker">PORTFOLIO CONTENT</span><h3>Projeler</h3><p>Projeleri sırala, düzenle ve yayın durumlarını yönet.</p></div>
      <button className="admin-primary" onClick={()=>setIsCreating(true)}><span>＋</span> Yeni proje</button>
    </div>

    <div className="admin-toolbar admin-projects-toolbar">
      <label className="admin-search">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/></svg>
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Proje ara..."/>
      </label>
      <span><strong>{visibleProjects.length}</strong> proje</span>
    </div>

    <div className="admin-projects-table">
      <div className="admin-projects-columns" aria-hidden="true">
        <span>PROJE</span><span>TÜR</span><span>YAYIN DURUMU</span><span>İŞLEMLER</span>
      </div>

      {loading && <div className="admin-projects-empty"><span>◌</span><strong>Projeler yükleniyor</strong><small>Backend verileri getiriliyor.</small></div>}
      {!loading && error && <div className="admin-projects-empty"><span>!</span><strong>Projeler getirilemedi</strong><small>{error}</small><button type="button" onClick={onRetry}>Tekrar dene</button></div>}
      {!loading && !error && visibleProjects.length === 0 && <div className="admin-projects-empty"><span>⌕</span><strong>Proje bulunamadı</strong><small>Farklı bir arama ifadesi deneyin.</small></div>}

      {!loading && !error && visibleProjects.map((project)=><article className="admin-project-row" key={project.id}>
        <div className="admin-project-main">
          <button className="admin-project-drag" type="button" aria-label={`${project.title} projesini sırala`}>⠿</button>
          <span className={`admin-project-mark admin-project-mark--${project.displayOrder % 3}`} aria-hidden="true">{String(project.displayOrder).padStart(2,"0")}</span>
          <div><strong>{project.title}</strong><small>/{project.id}</small></div>
        </div>

        <span className="admin-project-type">{project.type}</span>

        <button className={`admin-publish-toggle ${project.published ? "is-published" : ""}`} type="button" onClick={()=>onToggleStatus(project.id)} aria-pressed={project.published}>
          <span className="admin-publish-switch"><i /></span>
          <span>{project.published ? "Yayında" : "Taslak"}</span>
        </button>

        <div className="admin-row-actions">
          <button type="button" onClick={()=>setEditingProject(project)} aria-label={`${project.title} projesini düzenle`}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4l11-11-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/></svg><span>Düzenle</span></button>
          <button type="button" className="danger" onClick={()=>confirmDelete(project)} aria-label={`${project.title} projesini sil`}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"/></svg><span>Sil</span></button>
        </div>
      </article>)}
    </div>
    {isCreating && <ProjectEditorModal mode="create" project={emptyProject} onClose={()=>setIsCreating(false)} onCreate={onAddProject} onUpdate={onUpdateProject}/>} 
    {editingProject && <ProjectEditorModal mode="edit" project={editingProject} onClose={()=>setEditingProject(null)} onCreate={onAddProject} onUpdate={onUpdateProject}/>} 
  </section>;
}

const copy = {
  hero: ["Hero", "Ana başlık, açıklama, CTA butonları ve profil görseli."],
  about: ["About", "Hakkımda metni ve iş birliği çağrısı."],
  technologies: ["Technologies", "Teknoloji adları, logoları ve görüntülenme sırası."],
  experience: ["Experience", "Firma, görev, tarih aralığı, logo ve açıklamalar."],
  contact: ["Contact", "İletişim metinleri, sosyal bağlantılar ve form ayarları."],
  labels: ["UI Texts", "Navbar ve bölüm başlıklarını yönetin."],
  settings: ["Settings", "Site başlığı, SEO ve genel yayın ayarları."],
};

function Editor({ type }) {
  const [saved, setSaved] = useState(false);
  const [published, setPublished] = useState(true);
  const [title, description] = copy[type];
  return <section className="admin-card admin-editor"><div className="admin-card__head"><div><span className="admin-kicker">CONTENT EDITOR</span><h3>{title}</h3><p>{description}</p></div><div className="editor-actions"><label className="admin-switch"><input type="checkbox" checked={published} onChange={()=>setPublished(!published)}/><span></span>{published?"Yayında":"Taslak"}</label><button className="admin-primary" onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),1800)}}>{saved?"Kaydedildi ✓":"Değişiklikleri kaydet"}</button></div></div><div className="editor-grid"><label>Başlık<input defaultValue={type === "hero" ? "I build scalable systems and clean interfaces." : title}/></label><label>Üst etiket<input defaultValue={title.toUpperCase()}/></label><label className="wide">Açıklama<textarea defaultValue={description}/></label><label>Buton metni<input defaultValue="View details"/></label><label>Bağlantı<input defaultValue={`#${type}`}/></label><div className="upload wide"><span>＋</span><div><strong>Görsel veya dosya yükle</strong><small>PNG, JPG, SVG veya PDF · Maks. 8 MB</small></div><button>Dosya seç</button></div></div></section>;
}

function ProtectedRoute({ loggedIn }) {
  if (loggedIn === null) return <main className="admin-auth-loading">Oturum doğrulanıyor...</main>;
  return loggedIn ? <Outlet /> : <Navigate to="/admin/login" replace />;
}

function AdminLayout({ sidebarOpen, setSidebarOpen, logout }) {
  return <div className="admin-shell">
    <Sidebar open={sidebarOpen} logout={logout} onNavigate={() => setSidebarOpen(false)} />
    <div className="admin-main">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="admin-page"><Outlet /></main>
    </div>
  </div>;
}

export default function Admin() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectsError, setProjectsError] = useState("");

  const loadProjects = async () => {
    setProjectsLoading(true);
    setProjectsError("");
    try {
      setProjects(await getProjects());
    } catch (error) {
      setProjectsError(error.message);
    } finally {
      setProjectsLoading(false);
    }
  };

  useEffect(() => {
    getSession().then((session)=>setLoggedIn(session.authenticated)).catch(()=>setLoggedIn(false));
  }, []);

  useEffect(() => {
    if (loggedIn === true) loadProjects();
  }, [loggedIn]);

  const addProject = async (projectData) => {
    const nextOrder = projects.length
      ? Math.max(...projects.map((project) => project.displayOrder)) + 1
      : 1;
    const newProject = await createProjectRequest({ ...projectData, displayOrder: nextOrder });
    setProjects((previousProjects) => [...previousProjects, newProject]);
  };

  const updateProject = async (projectId, updatedFields) => {
    const currentProject = projects.find((project) => project.id === projectId);
    const updatedProject = await updateProjectRequest(projectId, {
      ...currentProject,
      ...updatedFields,
    });
    setProjects((previousProjects) =>
      previousProjects.map((project) =>
        project.id === projectId
          ? updatedProject
          : project,
      ),
    );
  };

  const deleteProject = async (projectId) => {
    await deleteProjectRequest(projectId);
    setProjects((previousProjects) =>
      previousProjects.filter((project) => project.id !== projectId),
    );
  };

  const toggleProjectStatus = async (projectId) => {
    const updatedProject = await toggleProjectPublication(projectId);
    setProjects((previousProjects) =>
      previousProjects.map((project) =>
        project.id === projectId
          ? updatedProject
          : project,
      ),
    );
  };

  const login = async (credentials) => {
    await loginRequest(credentials);
    setLoggedIn(true);
    navigate("/admin", { replace: true });
  };

  const logout = async () => {
    try { await logoutRequest(); }
    finally { setLoggedIn(false); setProjects([]); navigate("/admin/login", { replace: true }); }
  };

  return <Routes>
    <Route path="login" element={loggedIn === true ? <Navigate to="/admin" replace /> : <Login onLogin={login} />} />
    <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
      <Route element={<AdminLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} logout={logout} />}>
        <Route index element={<Dashboard projects={projects} />} />
        <Route path="projects" element={<Projects projects={projects} loading={projectsLoading} error={projectsError} onRetry={loadProjects} onAddProject={addProject} onUpdateProject={updateProject} onDeleteProject={deleteProject} onToggleStatus={toggleProjectStatus} />} />
        <Route path="hero" element={<HeroManager />} />
        <Route path="about" element={<AboutManager />} />
        <Route path="technologies" element={<TechnologyManager />} />
        <Route path="experience" element={<ExperienceManager />} />
        <Route path="contact" element={<ContactManager />} />
        <Route path="messages" element={<MessagesManager />} />
        <Route path="labels" element={<LabelsManager />} />
        <Route path="settings" element={<SettingsManager />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Route>
  </Routes>;
}
