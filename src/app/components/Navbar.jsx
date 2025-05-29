"use client";
import { useEffect, useState } from "react";
import { useLang } from "../context/LangContext";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Navbar() {
  const { lang, toggleLang } = useLang();
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if we should scroll to contact section
    if (searchParams.get("section") === "contact") {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [searchParams]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleContactClick = (e) => {
    e.preventDefault();

    // If we're already on the home page, use hash navigation
    if (pathname === "/") {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If we're on another page, navigate to home with query parameter
      router.push("/?section=contact");
    }
  };

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
        <Link
          href={pathname === "/" ? "#contact" : "/?section=contact"}
          onClick={handleContactClick}
          className="text-xl text-gray-300 hover:underline"
        >
          {lang === "en" ? "Contact" : "연락처"}
        </Link>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="text-xl text-gray-300 hover:underline"
          >
            {lang === "en" ? "Sign Out" : "로그아웃"}
          </button>
        )}
        <button
          onClick={toggleLang}
          className="bg-[#38bdf8] text-xl px-2 py-1 rounded"
        >
          {lang === "en" ? "KOR 🇰🇷" : "ENG 🇺🇸"}
        </button>
      </div>
    </nav>
  );
}
