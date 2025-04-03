"use client";
import { useEffect, useState } from "react";
import { useLang } from "../context/LangContext";
import Link from "next/link";

export default function Navbar() {
  const { lang, toggleLang } = useLang();

  return (
    <nav className="sticky top-0 z-50 bg-[#0d1117] text-white shadow flex items-center justify-between px-6 py-4">
      <Link
        href="/"
        className="text-4xl font-bold text-[#38bdf8] hover:underline"
      >
        {lang === "en" ? "My Portfolio" : "내 포트폴리오"}
      </Link>

      <div className="flex gap-8 items-center">
        <Link href="/about" className="text-xl text-gray-300 hover:underline">
          {lang === "en" ? "About" : "소개"}
        </Link>
        <Link
          href="/projects"
          className="text-xl text-gray-300 hover:underline"
        >
          {lang === "en" ? "Projects" : "프로젝트"}
        </Link>
        <Link href="/blog" className="text-xl text-gray-300 hover:underline">
          {lang === "en" ? "Blog" : "블로그"}
        </Link>
        <Link href="/contact" className="text-xl text-gray-300 hover:underline">
          {lang === "en" ? "Contact" : "연락처"}
        </Link>
        <button
          onClick={toggleLang}
          className="bg-[#38bdf8]  text-xl px-2 py-1 rounded "
        >
          {lang === "en" ? "KOR 🇰🇷" : "ENG 🇺🇸"}
        </button>
      </div>
    </nav>
  );
}
