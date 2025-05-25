import { useLang } from "../../context/LangContext";
import { useEffect, useRef, useState } from "react";
import ScrambleText from "../effects/ScrambleText";

// Custom hook for intersection observer
function useInView(threshold = 0.15) {
  const ref = useRef();
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView];
}

// Animated row component with stable animation state and hover highlight effect for title
function AnimatedRow({ title, desc }) {
  const [ref, isInView] = useInView(0.15);
  return (
    <div
      ref={ref}
      className={`group flex flex-col md:flex-row justify-between items-start py-8 px-6 md:px-12 transition-all duration-700 ease-out
        ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <span
        className={`
          text-6xl md:text-4xl font-bold text-gray-600 text-left
          transition-all duration-300
          group-hover:text-white
          group-hover:text-7xl group-hover:md:text-5xl
          group-hover:underline group-hover:underline-offset-8
        `}
        style={{
          WebkitTextStroke: "1px #222",
        }}
      >
        {title}
      </span>
      <span className="flex-1 text-2xl text-gray-500 mt-4 md:mt-0 md:text-right whitespace-nowrap">
        {desc}
      </span>
    </div>
  );
}

export default function MySkills() {
  const { lang } = useLang();

  const rows = [
    {
      id: "frontend",
      title: lang === "en" ? "Frontend" : "프론트엔드",
      desc: "React, JavaScript(ES6), Next.js, HTML/CSS, Tailwind CSS, JSX",
    },
    {
      id: "backend",
      title: lang === "en" ? "Backend" : "백엔드",
      desc: "Node.js, RESTful API, JWT, MySQL, Supabase, Java, Python",
    },
    {
      id: "devops",
      title: lang === "en" ? "DevOps" : "데브옵스",
      desc: "AWS EC2, GitHub, Postman, Apache",
    },
    {
      id: "tools",
      title: lang === "en" ? "Other Tools" : "기타 도구",
      desc: "Figma, VSCode, Git",
    },
  ];

  return (
    <section className="relative text-gray-700 min-h-screen px-6 py-20 bg-white flex flex-col items-center justify-center">
      <h1 className="text-8xl font-bold text-gray-600 mb-12 flex items-center justify-center">
        {lang === "en" ? <>My Skills</> : <>기술 스택</>}
      </h1>
      <div className="w-full divide-y-2 divide-gray-400">
        {rows.map((row) => (
          <AnimatedRow key={row.id} title={row.title} desc={row.desc} />
        ))}
      </div>
    </section>
  );
}
