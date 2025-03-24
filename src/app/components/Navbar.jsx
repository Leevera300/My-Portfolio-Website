"use client";
import { useEffect, useState } from "react";
import { useLang } from "../context/LangContext";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const { lang, toggleLang, setLang } = useLang();
  // ✅ Correct usage

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow flex items-center justify-between px-6 py-4">
      <a
        href="#home"
        className="text-xl font-bold text-gray-900 dark:text-white hover:underline"
      >
        {lang === "en" ? "My Portfolio" : "내 포트폴리오"}
      </a>

      <div className="flex gap-4 items-center">
        <a
          href="#about"
          className="text-gray-800 dark:text-white hover:underline"
        >
          {lang === "en" ? "About" : "소개"}
        </a>
        <a
          href="#projects"
          className="text-gray-800 dark:text-white hover:underline"
        >
          {lang === "en" ? "Projects" : "프로젝트"}
        </a>
        <a
          href="#contact"
          className="text-gray-800 dark:text-white hover:underline"
        >
          {lang === "en" ? "Contact" : "연락처"}
        </a>
        <button
          onClick={toggleLang}
          className="bg-gray-300 dark:bg-gray-700 text-sm px-2 py-1 rounded"
        >
          {lang === "en" ? "KOR 🇰🇷" : "ENG 🇺🇸"}
        </button>
        <button
          onClick={toggleDarkMode}
          className="bg-gray-300 dark:bg-gray-700 text-sm px-2 py-1 rounded"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}
