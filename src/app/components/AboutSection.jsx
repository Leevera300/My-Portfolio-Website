"use client";

import { useLang } from "../context/LangContext"; // ✅ Named import

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
              Hey! I’m Michael — a half Korean 🇰🇷, a quarter American 🇺🇸, and a
              quarter Puerto Rican 🇵🇷 creative living in Korea.
            </p>
            <p>
              I’m a developer, educator, and content creator with a background
              in English education and cybersecurity. I enjoy building clean web
              apps, sharing culture, and making people laugh through trilingual
              memes and videos.
            </p>
            <p>
              When I’m not coding or creating content, you’ll probably find me
              playing basketball 🏀, geeking out over personal projects, or
              running community events with KLAPS.
            </p>
            <p>Thanks for stopping by — let’s connect!</p>
          </>
        ) : (
          <>
            <p>
              안녕하세요! 저는 한국인 🇰🇷, 미국인 🇺🇸, 푸에르토리코인 🇵🇷 혼혈의
              마이클입니다. 현재 한국에 거주 중이에요.
            </p>
            <p>
              영어 교육과 사이버 보안 배경을 가진 개발자이자, 교육자이며 콘텐츠
              크리에이터입니다. 웹 앱을 만들고 문화를 공유하며, 삼개국어 밈과
              영상으로 사람들에게 웃음을 주는 걸 좋아해요.
            </p>
            <p>
              코딩하거나 콘텐츠를 만들지 않을 땐 농구를 하거나 🏀, 개인
              프로젝트를 파고들거나, KLAPS 커뮤니티 이벤트를 운영하고 있을
              거예요.
            </p>
            <p>방문해 주셔서 감사합니다. 언제든지 연락 주세요!</p>
          </>
        )}
      </div>
    </section>
  );
}
