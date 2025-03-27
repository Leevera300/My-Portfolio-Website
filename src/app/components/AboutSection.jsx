"use client";

import { useLang } from "../context/LangContext";

export default function AboutSection() {
  const { lang } = useLang();

  return (
    <section id="about" className="px-6 py-20 max-w-3xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6 text-center">
        {lang === "en" ? "About Me" : "소개"}
      </h1>

      <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300 mt-5">
        {lang === "en" ? (
          <>
            <p>
              Hey! I’m Michael — part Korean, part Puerto Rican-American, and
              currently living in Korea.
            </p>
            <p>
              Over the years, I’ve worn a few hats: soldier, paralegal, EMT,
              English teacher, and now, software developer. What ties it all
              together is a love for solving problems and helping people —
              whether through teaching, building tools, or creating something
              that just works.
            </p>
            <p>
              I’m the type to get lost in a side project just because it feels
              fun and meaningful. I like clean code, simple interfaces, and work
              that’s actually useful.
            </p>
            <p>
              Outside of work, you’ll usually find me playing basketball 🏀,
              diving into new ideas, or organizing language exchange events with
              KLAPS — a community I help run here in Korea.
            </p>
            <p>If that sounds like someone you’d want to work with or get to know, let’s connect.</p>
          </>
        ) : (
          <>
            <p>
              안녕하세요! 저는 한국과 푸에르토리코-미국 혼혈인 마이클입니다. 지금은 한국에서 거주 중이에요.
            </p>
            <p>
              그동안 다양한 일을 해왔어요: 군 복무, 군 법무병(Paralegal), 응급구조사(EMT), 영어 교사, 그리고 지금은 소프트웨어 개발자로 일하고 있습니다. 공통점은 문제를 해결하고 사람들을 돕는 걸 좋아한다는 점이에요 — 가르치든, 무언가를 만들든, 실용적인 도구를 만드는 것이 저를 움직입니다.
            </p>
            <p>
              재미있고 의미 있는 프로젝트라면 밤새 몰입하기도 해요. 저는 깔끔한 코드, 단순한 UI, 그리고 실제로 도움이 되는 작업을 선호합니다.
            </p>
            <p>
              업무 외 시간에는 보통 농구를 하거나 🏀, 새로운 아이디어를 탐구하거나, 제가 운영하는 KLAPS라는 언어 교류 커뮤니티 활동을 하고 있어요.
            </p>
            <p>
              저와 함께 일하거나 더 알고 싶으시다면, 언제든지 편하게 연락 주세요!
            </p>
          </>
        )}
      </div>
    </section>
  );
}

