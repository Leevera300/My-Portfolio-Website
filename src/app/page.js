"use client";
import { useLang } from "./context/LangContext";
import ProjectsSection from "./components/ProjectsSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  const { lang } = useLang();

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="flex flex-col items-center justify-center text-center space-y-6 py-20"
      >
        <h1 className="text-4xl md:text-6xl font-bold">
          {lang === "en" ? "Hi, I’m Michael 👋" : "안녕하세요, 마이클입니다 👋"}
        </h1>

        <p className="text-lg md:text-xl max-w-xl text-gray-600 dark:text-gray-300">
          {lang === "en"
            ? "I’m a developer, English teacher, and content creator. I build things for the web and help people grow through language."
            : "저는 개발자이자 영어 선생님, 그리고 콘텐츠 크리에이터입니다. 웹을 통해 무언가를 만들고, 언어를 통해 사람들의 성장을 돕습니다."}
        </p>

        <a
          href="#projects"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {lang === "en" ? "See My Projects" : "프로젝트 보기"}
        </a>
      </section>

      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
