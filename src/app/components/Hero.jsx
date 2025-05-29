"use client";

import { useLang } from "../context/LangContext";
import BriefIntro from "./myInfo/BriefIntro";
import MySkills from "./myInfo/mySkills";
import ProfessionalJourney from "./myInfo/professionalJourney";
import ProjectsPreview from "./myInfo/projectsPreview";
import Contact from "./myInfo/Contact";

export default function Hero() {
  const { lang } = useLang();

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="relative text-white flex items-center justify-center bg-black"
      >
        <BriefIntro />
      </section>

      {/* Skills Section */}
      <MySkills />

      {/* Projects Preview Section */}
      <ProjectsPreview />

      {/* Experience Section */}
      <ProfessionalJourney />

      {/* Contact Section */}
      <Contact />
    </>
  );
}
