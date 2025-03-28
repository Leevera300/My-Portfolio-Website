"use client";
import Image from "next/image";
import { useLang } from "../../context/LangContext";
import FunctionGrid from "../../components/project/FunctionGrid";

export default function HorsePowerDetail() {
    const { lang } = useLang();
  
    return (
      <section className="max-w-3xl mx-auto px-6 py-20">
        {/* Title + Description */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">
            HorsePower
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {lang === "en"
              ? "A smart project that helps users track productivity using game-like progress tracking."
              : "게임처럼 진행 상황을 시각적으로 추적할 수 있는 생산성 도구입니다."}
          </p>
        </div>
  
        {/* Tags / Stack */}
        <div className="flex flex-wrap gap-2 mb-10">
          {["Java", "HTML/CSS", "Javascript", "Node.js", "Apache Tomcat 9.0", "MySQL"].map((tech) => (
            <span
              key={tech}
              className="bg-gray-200 dark:bg-gray-700 text-sm px-3 py-1 rounded-full text-gray-800 dark:text-white"
            >
              {tech}
            </span>
          ))}
        </div>
  
        {/* Content Sections */}
        <div className="space-y-8">
          {/* Background */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              {lang === "en" ? "🔍 Background" : "🔍 프로젝트 개요"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {lang === "en"
                ? "I wanted a project that would let me apply everything I learned from bootcamp in one place, and building an online store felt like the perfect fit. I combined that idea with my personal interest in fitness and created an e-commerce site for athletic wear, inspired by Gymshark."
                : "부트캠프에서 배운 기술들을 한 프로젝트에 모두 적용해보고 싶었고, 쇼핑몰이 딱 맞는 선택이라고 생각했습니다. 운동에 대한 개인적인 관심을 더해 운동복 쇼핑몰을 만들었고, 영감을 준 사이트는 Gymshark라는 브랜드였습니다."}
            </p>
          </div>
  
          {/* DB Desgin */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              {lang === "en" ? "🗃️ DB Design" : "🗃️ DB 설계"}
            </h2>
           <img src="/images/horsepower/horsepower-db-design.png" alt="HorsePower DB Design" className="rounded shadow" />
          </div>
  
          {/* Detailed Features */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
                {lang === "en" ? "🧩 Detailed Features" : "🧩 주요 기능 설명"}
            </h2>
            <FunctionGrid />
          </div>
  
          {/* Links */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              {lang === "en" ? "🔗 Links" : "🔗 관련 링크"}
            </h2>
            <ul className="list-disc list-inside text-blue-600 dark:text-blue-400">
              <li>
                <a
                  href="https://github.com/yourusername/horsepower"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {lang === "en" ? "GitHub Repository" : "깃허브 저장소"}
                </a>
              </li>
              <li>
                <a
                  href="https://horsepower.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {lang === "en" ? "Live Demo" : "라이브 데모"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
  

