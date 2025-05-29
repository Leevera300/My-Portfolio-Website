"use client";
import React from "react";
import Image from "next/image";
import { useLang } from "../../context/LangContext";
import FunctionGrid from "../../components/project/FunctionGrid";
import { projects } from "../../data/projects";
import { notFound } from "next/navigation";
import { functions as horsepowerFunctions } from "../../components/project/horsepower/horsepowerFunctionsData";
import { functions as myPortfolioFunctions } from "../../components/project/myPortfolio/myPortfolioFunctionsData";
import { functions as reactFunctions } from "../../components/project/react/reactFunctionsData";

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
      case "react":
        return reactFunctions;
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
        <h1 className="text-6xl font-bold mb-2">{project.title[lang]}</h1>
        <p className="text-gray-600">{project.description[lang]}</p>
      </div>

      {/* Tags / Stack */}
      <div className="flex flex-wrap gap-2 mb-10">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="bg-gray-200 text-md px-3 py-1 rounded-full text-gray-800"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Content Sections */}
      <div className="space-y-8">
        {/* Background */}
        <div>
          <h2 className="text-4xl font-semibold mb-2">
            {lang === "en" ? "🔍 Background" : "🔍 프로젝트 개요"}
          </h2>
          <p className="text-xl text-gray-200">{project.background[lang]}</p>
        </div>

        {/* DB Design */}
        {project.dbDesignImage && (
          <div>
            <h2 className="text-4xl font-semibold mb-2">
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
          <h2 className="text-4xl font-semibold mb-2">
            {lang === "en" ? "🧩 Detailed Features" : "🧩 주요 기능 설명"}
          </h2>
          <FunctionGrid functions={projectFunctions} />
        </div>

        {/* Links */}
        <div>
          <h2 className="text-4xl font-semibold mb-2">
            {lang === "en" ? "🔗 Links" : "🔗 관련 링크"}
          </h2>
          <ul className="list-disc list-inside text-blue-600">
            <li>
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gray-800 text-white px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-1.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                {lang === "en" ? "GitHub" : "깃허브"}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
