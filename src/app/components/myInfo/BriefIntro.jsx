import { useLang } from "@/app/context/LangContext";
import Link from "next/link";
export default function BriefIntro() {
  const { lang } = useLang();

  return (
    <div className="md:w-1/2 text-center md:text-left space-y-6">
      <h1 className="leading-tight">
        {lang === "en" ? (
          <>
            <span className="text-[#38bdf8] text-4xl md:text-5xl font-bold mb-4">
              Hi, I'm Michael 👋
            </span>
            <span className="text-[#38bdf8] text-2xl block mt-8">
              A responsible full-stack developer who never stops learning and
              puts skills into real-world practice.
            </span>
          </>
        ) : (
          <>
            <span className="text-[#38bdf8] text-4xl md:text-5xl font-bold mb-4 ">
              안녕하세요, 마이클입니다 👋
            </span>
            <span className="text-[#38bdf8] text-2xl block mt-8">
              끊임없이 배우고 실전에 적용하는, 책임감 있는 풀스택 개발자
            </span>
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
  );
}
