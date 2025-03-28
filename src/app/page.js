"use client";
import { useLang } from "./context/LangContext";
import ProjectsSection from "./components/project/ProjectsSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Introduction from "./components/Introduction";

export default function Home() {
  const { lang } = useLang();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
  {/* Sidebar */}
  <div className="lg:w-1/3 w-full bg-gray-100 dark:bg-gray-800">
    <div className="lg:sticky top-0 h-screen flex items-start justify-center px-6 py-10">
      <Introduction />
    </div>
  </div>

  {/* Main Content */}
  <div className="lg:w-2/3 w-full px-6 overflow-y-auto">
    <AboutSection />
    <ProjectsSection />
    <ContactSection />
  </div>
</div>


  );
}

