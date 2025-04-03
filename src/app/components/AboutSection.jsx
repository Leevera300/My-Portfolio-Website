"use client";

import { useLang } from "../context/LangContext";

export default function AboutSection() {
  const { lang } = useLang();

  return (
    <section id="about" className="px-6 py-20 max-w-3xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6 text-center">
        {lang === "en" ? "About Me" : "소개"}
      </h1>

      <div className="space-y-4 text-lg text-white mt-5">
        {lang === "en" ? (
          <>
            <p>
              Hey, I’m Michael. I’m a developer who’s equally curious about
              front-end and back-end — my interest in coding started with a
              simple question: <em>how do websites actually work?</em>
            </p>
            <p>
              I enjoy building clean, intuitive applications that are actually
              useful — not just flashy. I care about performance, accessibility,
              and writing code that makes sense to others (and to my future
              self). I’m the kind of person who asks “does this really help the
              user?” before adding a feature.
            </p>
            <p>
              When I’m not coding, I’m usually diving into personal projects,
              journaling ideas, playing basketball 🏀, or learning something new
              — whether it’s a tech concept or a random trivia rabbit hole. I
              like building, reflecting, and growing one step at a time.
            </p>
          </>
        ) : (
          <>
            <p>
              안녕하세요, 마이클입니다. 프론트엔드와 백엔드 모두에 관심이 많은
              개발자로, 웹사이트가 어떻게 작동하는지에 대한 단순한 호기심이
              코딩을 시작하게 된 계기였습니다.
            </p>
            <p>
              화려함보다는 실용적인, 깔끔하고 직관적인 웹 애플리케이션을 만드는
              것을 지향하며, 성능과 접근성은 물론 코드의 가독성과 유지보수성도
              중요하게 생각합니다. 기능을 추가하기 전 항상 “이게 사용자에게 진짜
              도움이 될까?”를 먼저 고민합니다.
            </p>
            <p>
              코딩을 하지 않을 땐 개인 프로젝트에 몰두하거나, 새로운 아이디어를
              정리하거나, 농구를 하거나 🏀, 흥미로운 주제를 찾아 끝없이 파고드는
              편입니다. 조금씩 꾸준히 배우고 성장하는 것을 좋아합니다.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
