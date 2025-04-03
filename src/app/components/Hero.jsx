"use client";

import Image from "next/image";
import { useLang } from "../context/LangContext";
import Link from "next/link";
export default function Hero() {
  const { lang } = useLang();

  return (
    <section
      id="home"
      className="relative text-white min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-7xl w-full flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Left: Text */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {lang === "en" ? (
              <>
                Hi, I'm Michael 👋
                <br />
                <span className="text-[#38bdf8]">
                  I build things for the web
                </span>
              </>
            ) : (
              <>
                안녕하세요, 마이클입니다 👋
                <br />
                <span className="text-[#38bdf8]">웹을 만드는 개발자예요</span>
              </>
            )}
          </h1>

          <p className="text-gray-300 text-lg max-w-md mx-auto md:mx-0">
            {lang === "en"
              ? "Half Korean 🇰🇷. Quarter Boricua 🇵🇷. Quarter American 🇺🇸. Developer with a passion for clean code and helping people grow."
              : "한국인 🇰🇷, 푸에르토리코 🇵🇷, 미국인 🇺🇸 혼혈. 깔끔한 코드를 좋아하고 사람들과 함께 성장하는 개발자입니다."}
          </p>

          <div className="flex justify-center md:justify-start gap-4">
            <Link
              href="/projects"
              className="bg-[#38bdf8] text-black px-6 py-3 rounded-md font-medium hover:bg-[#0ea5e9] transition"
            >
              {lang === "en" ? "See My Work" : "작업물 보기"}
            </Link>
            <Link
              href="/contact"
              className="border border-gray-500 text-white px-6 py-3 rounded-md font-medium hover:border-white transition"
            >
              {lang === "en" ? "Get in Touch" : "연락하기"}
            </Link>
          </div>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/2 flex justify-center relative">
          <div className="rounded-full overflow-hidden border-4 border-[#38bdf8] shadow-lg w-64 h-64">
            <Image
              src="/images/profile-img.jpg"
              alt="Michael's portrait"
              width={300}
              height={300}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
