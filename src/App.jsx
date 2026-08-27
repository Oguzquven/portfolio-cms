import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Admin from "./admin/Admin";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSettings } from "./services/settingsApi";
import { LanguageProvider, useLanguage } from "./i18n";
import "./App.css";
import "./ExperienceV3.css";
import "./ExperienceFinal.css";
import "./ExperienceLogos.css";
import "./ContactTheme.css";
import "./ContactBlue.css";
import "./NavbarOverride.css";
import "./ProjectsOverride.css";
import "./AboutOverride.css";
import "./ExperienceColorOverride.css";
import "./ProductionVisuals.css";

function Portfolio() {
  const { locale } = useLanguage();
  const [settings,setSettings]=useState({siteName:"Oğuz Güven",role:"Full-Stack Developer",browserTitle:"Oğuz Güven | Full-Stack Developer",metaDescription:"Oğuz Güven'in full-stack geliştirme projeleri, deneyimleri ve teknoloji portfolyosu.",siteLanguage:"en",projectsYear:"2026",technologyYear:"2026",cvUrl:"",cvFileName:"",navWorkLabel:"WORK",navAboutLabel:"ABOUT",navExperienceLabel:"EXPERIENCE",navContactLabel:"CONTACT",projectsEyebrow:"SELECTED WORK",projectsTitle:"Things I've",projectsHighlight:"built",experienceEyebrow:"EXPERIENCE",experienceTitle:"Where I've",experienceHighlight:"worked",technologyHeading:"WHAT I WORK WITH",technologyLabel:"TECH STACK"});
  useEffect(()=>{getSettings().then(value=>{setSettings(current=>({...current,...value}));document.title=value.browserTitle;let meta=document.querySelector('meta[name="description"]');if(!meta){meta=document.createElement("meta");meta.name="description";document.head.appendChild(meta);}meta.content=value.metaDescription;}).catch(()=>{});},[]);
  useEffect(()=>{document.documentElement.lang=locale;},[locale]);
  return (
    <>
      {/* Sabit sulu boya katmanı — tüm bölümlerin arkasında */}
      <div className="app__bg"></div>

      <Navbar settings={settings} />
      <div className="hero-projects">
        <svg
          className="hero-projects__wave"
          viewBox="0 0 1440 3200"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M1218 0H1440V3200H0V1110C128 1040 268 1082 368 986C458 900 420 842 590 780C752 721 714 633 882 566C1041 503 960 408 1105 334C1235 268 1144 150 1218 0Z" />
        </svg>
        <Hero />
        <Projects year={settings.projectsYear} settings={settings} />
      </div>
      <About technologyYear={settings.technologyYear} settings={settings} />
      <Experience settings={settings} />
      <Contact />
    </>
  );
}

function NotFound() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "2rem", textAlign: "center" }}>
      <div>
        <p style={{ color: "#2188e8", fontWeight: 700, letterSpacing: ".15em" }}>404</p>
        <h1>Sayfa bulunamadı.</h1>
        <a href="/" style={{ color: "#2188e8" }}>Portfolioya dön</a>
      </div>
    </main>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;
