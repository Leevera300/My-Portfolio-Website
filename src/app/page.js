"use client";
import { useLang } from "./context/LangContext";
import { useEffect, useState } from "react";
import Hero from "./components/Hero";

export default function Home() {
  const { lang } = useLang();
  // TESTING: Set this to true to force show loading screen
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // TESTING: Comment out this block to force show loading screen
    const lastVisit = localStorage.getItem("lastVisit");
    const currentTime = new Date().getTime();
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

    if (!lastVisit || currentTime - parseInt(lastVisit) > oneHour) {
      setShowLoading(true);
      localStorage.setItem("lastVisit", currentTime.toString());

      const timer = setTimeout(() => setShowLoading(false), 1000);
      return () => clearTimeout(timer);
    }

    // TESTING: Uncomment these lines to force show loading screen
    // setShowLoading(true);
    // const timer = setTimeout(() => setShowLoading(false), 1000);
    // return () => clearTimeout(timer);
  }, []);

  if (showLoading) {
    const message =
      lang === "en"
        ? "Welcome to my portfolio"
        : "포트폴리오에 오신 걸 환영합니다";

    return (
      <div className="fixed inset-0 bg-[#0d1117] flex items-center justify-center z-50">
        <h1 className="flex flex-wrap justify-center text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#000000] drop-shadow-[3px_3px_1px_#ffffff]">
          {message.split("").map((char, i) => (
            <span
              key={i}
              className="opacity-0 animate-slide-fade-in text-[#000000]"
              style={{
                animationDelay: `${i * 0.05}s`,
                animationFillMode: "forwards",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      </div>
    );
  }

  return (
    <div>
      <Hero />
    </div>
  );
}
