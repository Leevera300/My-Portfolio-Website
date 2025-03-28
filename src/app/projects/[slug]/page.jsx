"use client";
import React from "react";
import Image from "next/image";
import { useLang } from "../../context/LangContext";
import FunctionGrid from "../../components/project/FunctionGrid";
import { projects } from "../../data/projects";
import { notFound } from "next/navigation";
import { functions as horsepowerFunctions } from "../../components/project/horsepower/horsepowerFunctionsData";
import { functions as myPortfolioFunctions } from "../../components/project/myPortfolio/myPortfolioFunctionsData";

export default function ProjectDetail({ params }) {
  const unwrappedParams = React.use(params);
  const { slug } = unwrappedParams;
  const { lang } = useLang();

  const project = projects[slug];

  if (!project) {
    notFound();
  }

  // Get the correct functions based on project slug
  const getProjectFunctions = (projectSlug) => {
    switch (projectSlug) {
      case "horsepower":
        return horsepowerFunctions;
      case "portfolio":
        return myPortfolioFunctions;
      // Add more cases as you create more projects
      // case 'other-project':
      //   return otherProjectFunctions;
      default:
        return [];
    }
  };

  const projectFunctions = getProjectFunctions(slug);

  return (
    <section className="max-w-[80%] mx-auto px-6 py-20">
      {/* Title + Description */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
        <p className="text-gray-600">{project.description[lang]}</p>
      </div>

      {/* Tags / Stack */}
      <div className="flex flex-wrap gap-2 mb-10">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="bg-gray-200 text-sm px-3 py-1 rounded-full text-gray-800"
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
          <p className="text-gray-700">{project.background[lang]}</p>
        </div>

        {/* DB Design */}
        {project.dbDesignImage && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              {lang === "en" ? "🗃️ DB Design" : "🗃️ DB 설계"}
            </h2>
            <div className="flex justify-center">
              <img
                src={project.dbDesignImage}
                alt={`${project.title} DB Design`}
                className="rounded shadow max-w-full h-auto"
              />
            </div>
          </div>
        )}

        {/* Detailed Features */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            {lang === "en" ? "🧩 Detailed Features" : "🧩 주요 기능 설명"}
          </h2>
          <FunctionGrid functions={projectFunctions} />
        </div>

        {/* Links */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            {lang === "en" ? "🔗 Links" : "🔗 관련 링크"}
          </h2>
          <ul className="list-disc list-inside text-blue-600">
            <li>
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                {lang === "en" ? "GitHub Repository" : "깃허브 저장소"}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
