"use client";
import { useLang } from "./context/LangContext";
import ProjectsSection from "./components/project/ProjectsSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Introduction from "./components/Introduction";
import Hero from "./components/Hero";

export default function Home() {
  const { lang } = useLang();

  return (
    <div>
      <Hero />
    </div>
  );
}
