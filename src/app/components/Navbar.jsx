"use client";
import { useEffect, useState } from "react";
import { useLang } from "../context/LangContext";

export default function Navbar() {
  const { lang, toggleLang } = useLang();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow flex items-center justify-between px-6 py-4">
      <a href="/" className="text-4xl font-bold text-gray-900 hover:underline">
        {lang === "en" ? "My Portfolio" : "내 포트폴리오"}
      </a>

      <div className="flex gap-8 items-center">
        <a href="#about" className="text-xl text-gray-800 hover:underline">
          {lang === "en" ? "About" : "소개"}
        </a>
        <a href="#projects" className="text-xl text-gray-800 hover:underline">
          {lang === "en" ? "Projects" : "프로젝트"}
        </a>
        <a href="#contact" className="text-xl text-gray-800 hover:underline">
          {lang === "en" ? "Contact" : "연락처"}
        </a>
        <button
          onClick={toggleLang}
          className="bg-gray-300 text-xl px-2 py-1 rounded "
        >
          {lang === "en" ? "KOR 🇰🇷" : "ENG 🇺🇸"}
        </button>
      </div>
    </nav>
  );
}
