"use client";
import { useLang } from "../context/LangContext";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  const { lang } = useLang();

  return (
    <section id="projects" className="py-20 px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-10">
        {lang === "en" ? "Projects" : "프로젝트"}
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <ProjectCard
          title={lang === "en" ? "My Portfolio" : "마이 포트폴리오"}
          description={
            lang === "en"
              ? "A sleek portfolio website built with Next.js and Tailwind CSS."
              : "Next.js와 Tailwind CSS로 만든 세련된 포트폴리오 웹사이트입니다."
          }
          image="/images/portfolio-thumbnail.jpg"
          tags={["Next.js", "Tailwind", "Responsive"]}
          link="https://yourportfolio.com"
          github="https://github.com/yourusername/portfolio"
        />

        <ProjectCard
          title={lang === "en" ? "KLAPS Platform" : "KLAPS 플랫폼"}
          description={
            lang === "en"
              ? "Web app for language exchange events, built with Node.js."
              : "Node.js로 개발된 언어교환 이벤트 플랫폼입니다."
          }
          image="/images/klaps.jpg"
          tags={["Node.js", "MongoDB", "React"]}
          link="https://klaps.kr"
          github="https://github.com/yourusername/klaps"
        />
      </div>
    </section>
  );
}
