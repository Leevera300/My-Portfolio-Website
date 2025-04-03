"use client";

import { useLang } from "../context/LangContext";

export default function Introduction() {
  const { lang } = useLang();

  return (
    <section className="flex flex-col items-center justify-center text-center space-y-6 py-20">
      <h1 className="text-4xl md:text-4xl font-bold">
        {lang === "en" ? "Hi, I’m Michael 👋" : "안녕하세요, 마이클입니다 👋"}
      </h1>

      <p className="text-lg md:text-xl max-w-xl text-gray-600 dark:text-gray-300">
        {lang === "en"
          ? "I build clean, reliable web apps that are easy to use and easy to maintain. I focus on solving real problems with simple, effective code."
          : "저는 깔끔하고 안정적인 웹 앱을 만들며, 누구나 쉽게 사용할 수 있고 관리하기 쉬운 코드를 지향합니다. 복잡하지 않고 실용적인 방식으로 진짜 문제를 해결하는 데 집중합니다."}
      </p>

      <a
        href="#projects"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        {lang === "en" ? "See My Projects" : "프로젝트 보기"}
      </a>
    </section>
  );
}
