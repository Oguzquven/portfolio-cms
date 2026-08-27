import {render,screen} from "@testing-library/react";
import {describe,expect,it} from "vitest";
import Navbar from "./Navbar";
import {LanguageProvider} from "../i18n";

const settings={siteName:"Oğuz Güven",cvUrl:"",cvFileName:"",navWorkLabel:"WORK",navAboutLabel:"ABOUT",navExperienceLabel:"EXPERIENCE",navContactLabel:"CONTACT"};
const renderNavbar=(value)=>render(<LanguageProvider><Navbar settings={value}/></LanguageProvider>);

describe("Navbar CV gizliliği",()=>{
 it("CV yüklenmemişse menüde bağlantı göstermez",()=>{
  renderNavbar(settings);
  expect(screen.queryByRole("link",{name:/dosyasını/i})).not.toBeInTheDocument();
 });

 it("ayar kaydında CV bulunsa bile herkese açık menüde göstermez",()=>{
  renderNavbar({...settings,cvUrl:"/uploads/cv.pdf",cvFileName:"oguz-guven-cv.pdf"});
  expect(screen.queryByText("CV")).not.toBeInTheDocument();
  const contact=screen.getByRole("link",{name:"CONTACT"});
  expect(contact).not.toHaveClass("navbar__cta");
  expect(contact).toHaveClass("navbar__contact");
 });
});
