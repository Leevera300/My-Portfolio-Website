"use client";
import { useLang } from "../../context/LangContext";
import ProjectCard from "./ProjectCard";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsSection() {
  const { lang } = useLang();

  return (
    <section id="projects" className="py-20 px-6 text-center">
      <h2 className="text-4xl md:text-4xl font-bold mb-10">
        {lang === "en" ? "Projects" : "프로젝트"}
      </h2>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        <ProjectCard
          title={lang === "en" ? "My Portfolio" : "마이 포트폴리오"}
          description={
            lang === "en"
              ? "A sleek portfolio website built with Next.js and Tailwind CSS."
              : "Next.js와 Tailwind CSS로 만든 세련된 포트폴리오 웹사이트입니다."
          }
          image={
            lang === "en"
              ? "/images/My-portfolio-en.png"
              : "/images/My-portfolio-kor.png"
          }
          tags={["Next.js", "Tailwind", "Responsive", "React", "PostgreSQL"]}
          link="/projects/portfolio"
          github="https://github.com/Leevera300/My-Portfolio-Website"
        />

        <ProjectCard
          title={
            lang === "en"
              ? "HorsePower (Sports Wear)"
              : "HorsePower (스포트 웨어)"
          }
          description={
            lang === "en"
              ? "An e-commerce website for sports wear built with Java, javascript, and MySQL."
              : "Java, javascript, MySQL로 만든 스포츠 웨어 전자상거래 웹사이트입니다."
          }
          image="/images/horsepower/horsepower-home.png"
          tags={[
            "Java",
            "JavaScript",
            "MySQL",
            "HTML/CSS",
            "Apache Tomcat 9.0",
          ]}
          link="/projects/horsepower"
          github="https://github.com/Leevera300/HorsePower-Sportswear#"
        />

        <ProjectCard
          title={lang === "en" ? "React" : "리액트"}
          description={
            lang === "en"
              ? "Bunch of projects built with React."
              : "리액트로 만든 여러 프로젝트입니다."
          }
          image="/images/react.png"
          tags={["React"]}
          link="/projects/react"
          github="https://github.com/Leevera300/React_practice"
        />
      </div>
    </section>
  );
}
