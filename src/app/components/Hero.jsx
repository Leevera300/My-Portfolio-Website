"use client";

import { useLang } from "../context/LangContext";
import BriefIntro from "./myInfo/BriefIntro";
import ProfileImage from "./myInfo/profileImage";
import MySkills from "./myInfo/mySkills";
import ProfessionalJourney from "./myInfo/professionalJourney";
export default function Hero() {
  const { lang } = useLang();

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="relative text-white min-h-screen flex items-center justify-center px-6 py-20 bg-black"
      >
        <div className="max-w-7xl w-full flex flex-col-reverse md:flex-row items-center gap-12">
          <BriefIntro />
          <ProfileImage />
        </div>
      </section>

      {/* Skills Section */}
      <MySkills />

      {/* Projects Preview Section */}
      <section className="relative text-white min-h-screen flex items-center justify-center px-6 py-20 bg-black">
        <div className="max-w-7xl w-full text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            {lang === "en" ? "Featured Projects" : "주요 프로젝트"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Add your featured projects here */}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <ProfessionalJourney />

      {/* Contact Section */}
      <section className="relative text-white min-h-screen flex items-center justify-center px-6 py-20 bg-black">
        <div className="max-w-7xl w-full text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            {lang === "en" ? "Let's Connect" : "연락하기"}
          </h2>
          <div className="max-w-2xl mx-auto">
            {/* Add your contact form or content here */}
          </div>
        </div>
      </section>
    </>
  );
}
