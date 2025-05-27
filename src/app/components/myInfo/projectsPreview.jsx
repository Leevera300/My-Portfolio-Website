import { useLang } from "../../context/LangContext";
import { useState } from "react";
import ProjectCard from "../project/ProjectCard";

export default function ProjectsPreview() {
  const { lang } = useLang();
  const [activeIdx, setActiveIdx] = useState(null);
  const [hoverIdx, setHoverIdx] = useState(null);

  const projects = [
    {
      title: {
        ko: "메가스터디 - 쇼핑몰",
        en: "Megastudy - Shopping Mall",
      },
      description: {
        ko: [
          "• Java, Spring Boot, MySQL 기반 백엔드 개발 역량 습득",
          "• JWT 인증을 적용한 풀스택 쇼핑몰 개발",
          "• AWS EC2 서버 배포 및 운영 경험",
        ],
        en: [
          "• Acquired backend development skills with Java, Spring Boot, and MySQL",
          "• Developed a full-stack shopping mall with JWT authentication",
          "• Experience deploying and operating servers on AWS EC2",
        ],
      },
      tech: ["Java", "Spring Boot", "MySQL", "JWT", "AWS EC2"],
      icon: "💻",
      color: "bg-purple-400",
      link: "#",
    },
    {
      title: {
        ko: "다국어 포트폴리오",
        en: "Multilingual Portfolio",
      },
      description: {
        ko: [
          "• React, Next.js, Supabase 기반 다국어 포트폴리오 사이트 개발 중",
          "• 보안성과 효율성을 고려한 실용적인 웹서비스 개발자로 성장 중",
        ],
        en: [
          "• Developing a multilingual portfolio site with React, Next.js, and Supabase",
          "• Growing as a practical web developer focused on security and efficiency",
        ],
      },
      tech: ["React", "Next.js", "Supabase", "Tailwind CSS"],
      icon: "🌐",
      color: "bg-green-400",
      link: "#",
    },
  ];

  return (
    <section className="relative text-white min-h-screen flex items-center justify-center px-6 py-20 bg-black">
      <div className="max-w-7xl w-full flex justify-end">
        {/* Left Container - Projects Grid */}
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">
            {lang === "en" ? "Featured Projects" : "주요 프로젝트"}
          </h2>
          <ProjectCard
            title={lang === "en" ? "My Portfolio" : "마이 포트폴리오"}
            description={
              lang === "en"
                ? "A sleek portfolio website built with Next.js and Tailwind CSS."
                : "Next.js와 Tailwind CSS로 만든 세련된 포트폴리오 웹사이트입니다."
            }
            image={""}
            tags={["Next.js", "Tailwind", "Responsive", "React", "PostgreSQL"]}
            link="/projects/portfolio"
            github="https://github.com/Leevera300/My-Portfolio-Website"
            className="bg-gray-900 rounded-xl shadow hover:shadow-xl transition-shadow overflow-hidden [&_h3]:text-white [&_p]:text-gray-300 [&_span]:bg-gray-800"
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
            image={""}
            tags={[
              "Java",
              "JavaScript",
              "MySQL",
              "HTML/CSS",
              "Apache Tomcat 9.0",
            ]}
            link="/projects/horsepower"
            github="https://github.com/Leevera300/HorsePower-Sportswear#"
            className="bg-gray-900 rounded-xl shadow hover:shadow-xl transition-shadow overflow-hidden [&_h3]:text-white [&_p]:text-gray-300 [&_span]:bg-gray-800"
          />
        </div>

        {/* Right Container - See All Projects Button */}
        <div className="w-1/2 flex items-center justify-center">
          <a
            href="/projects"
            className="px-16 py-6 rounded-lg bg-white/10 text-white text-xl font-semibold hover:bg-white/20 transition-colors"
          >
            {lang === "en" ? "See All Projects" : "전체 프로젝트 보기"}
          </a>
        </div>
      </div>
    </section>
  );
}
