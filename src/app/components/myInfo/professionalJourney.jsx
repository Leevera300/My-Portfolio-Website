import { useLang } from "../../context/LangContext";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ProfessionalJourney() {
  const { lang } = useLang();
  const [activeIdx, setActiveIdx] = useState(null);
  const [hoverIdx, setHoverIdx] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const timelineData = [
    {
      year: "2014–2020",
      title: {
        ko: "미국 육군 – 정보보안 및 법무 담당",
        en: "U.S. Army – Information Security & Legal Affairs",
      },
      description: {
        ko: [
          "• 군 통신망 보안 및 정보보호 정책 관리",
          "• 보안 위험 분석 및 사이버보안 교육 진행",
          "• 비인가 접근 50% 감소 등 실질적인 보안 성과 달성",
        ],
        en: [
          "• Managed military network security and information protection policies",
          "• Conducted risk analysis and cybersecurity training",
          "• Achieved tangible results such as 50% reduction in unauthorized access",
        ],
      },
      icon: "📍",
      color: "bg-yellow-400",
    },
    {
      year: "2021–2022",
      title: {
        ko: "연구 보조 & 응급 구조사 (EMT)",
        en: "Research Assistant & EMT",
      },
      description: {
        ko: [
          "• 심리 연구 실험 진행 및 데이터 정리",
          "• 앰뷸런스 탑승 환자 응급처치 및 이송",
          "• EMT 실습생 멘토링 및 현장 운영 지원",
        ],
        en: [
          "• Conducted psychological research experiments and organized data",
          "• Provided emergency care and transport for ambulance patients",
          "• Mentored EMT trainees and supported field operations",
        ],
      },
      icon: "📍",
      color: "bg-cyan-400",
    },
    {
      year: "2023",
      title: {
        ko: "Google 사이버보안 자격증",
        en: "Google Cybersecurity Certificate",
      },
      description: {
        ko: [
          "• 위협 분석, 데이터 보호, 정책 준수 등 보안 실무 전반에 대한 교육 수료",
        ],
        en: [
          "• Completed training in threat analysis, data protection, and policy compliance",
        ],
      },
      icon: "📍",
      color: "bg-red-400",
    },
    {
      year: "2023–2024",
      title: {
        ko: "메가스터디 백엔드 자바 과정",
        en: "Megastudy Backend Java Course",
      },
      description: {
        ko: [
          "• Java, Spring Boot, MySQL 기반 백엔드 개발 역량 습득",
          "• JWT 인증을 적용한 풀스택 쇼핑몰 개발",
          "• AWS EC2 서버 배포 및 운영 경험",
        ],
        en: [
          "• Acquired backend development skills with Java, Spring Boot, and MySQL",
          "• Developed a full-stack shopping mall with JWT authentication",
          "• Experience deploying and operating servers on AWS EC2",
        ],
      },
      icon: "📍",
      color: "bg-purple-400",
    },
    {
      year: "2024–2025",
      title: {
        ko: "KLAPS – 백엔드 개발자",
        en: "KLAPS – Backend Developer",
      },
      description: {
        ko: [
          "• Node.js, MySQL, AWS를 활용한 이벤트 플랫폼 구축 및 운영",
          "• 로그인 및 인증 시스템 개발, DB 최적화",
          "• Next.js와 Tailwind CSS로 프론트엔드 협업",
          "• 개발 아키텍처 관련 내부 워크숍 리드",
        ],
        en: [
          "• Built and operated an event platform using Node.js, MySQL, and AWS",
          "• Developed login/auth systems and optimized databases",
          "• Collaborated on frontend with Next.js and Tailwind CSS",
          "• Led internal workshops on development architecture",
        ],
      },
      icon: "📍",
      color: "bg-blue-400",
    },
    {
      year: { ko: "현재", en: "Present" },
      title: {
        ko: "다국어 포트폴리오 개발 중",
        en: "Developing Multilingual Portfolio",
      },
      description: {
        ko: [
          "• React, Next.js, Supabase 기반 다국어 포트폴리오 사이트 개발 중",
          "• 보안성과 효율성을 고려한 실용적인 웹서비스 개발자로 성장 중",
        ],
        en: [
          "• Developing a multilingual portfolio site with React, Next.js, and Supabase",
          "• Growing as a practical web developer focused on security and efficiency",
        ],
      },
      icon: "🧭",
      color: "bg-green-400",
    },
  ];

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-[80vh] w-full py-16 px-0 overflow-x-auto">
      <h2 className="text-4xl font-bold text-white text-center mb-12 tracking-wide">
        {lang === "en" ? "Work Experience Timeline" : "경력 타임라인"}
      </h2>
      <div className="w-full overflow-x-auto">
        <div className="flex items-center gap-0 w-max px-10 mx-auto">
          {timelineData.map((item, idx) => {
            const isEven = idx % 2 === 0;
            const isActive = activeIdx === idx;
            const isHovered = hoverIdx === idx;
            return (
              <>
                <div
                  key={idx}
                  className={`relative flex flex-col items-center min-w-[260px] mx-0 ${
                    isEven ? "mb-32" : "mt-32"
                  }`}
                >
                  {/* Up or Down Card */}
                  <div
                    className={
                      isEven
                        ? "flex flex-col items-center mb-6"
                        : "flex flex-col-reverse items-center mt-6"
                    }
                  >
                    <div
                      className={`w-14 h-14 rounded-full ${item.color} flex items-center justify-center text-3xl mb-2 shadow-lg border-4 border-white/30`}
                    >
                      {item.icon}
                    </div>
                    <div className="bg-gray-900/90 text-white p-4 rounded shadow text-center min-w-[200px] max-w-[220px]">
                      <div
                        className="font-bold text-2xl cursor-pointer relative"
                        onMouseEnter={() => setHoverIdx(idx)}
                        onMouseLeave={() => setHoverIdx(null)}
                        onClick={() => setActiveIdx(isActive ? null : idx)}
                      >
                        {item.title[lang]}
                        {/* Tooltip on hover */}
                        {isHovered && !isActive && (
                          <div className="absolute left-1/2 top-full z-30 w-max min-w-[180px] -translate-x-1/2 mt-2 bg-gray-800 text-gray-100 text-xs rounded shadow-lg px-4 py-2 pointer-events-none">
                            {item.description[lang].map((line, i) => (
                              <div key={i}>{line}</div>
                            ))}
                          </div>
                        )}
                      </div>
                      {/* Description below on click */}
                      {isActive && (
                        <div className="mt-3 text-lg text-gray-300 transition-all duration-300">
                          {item.description[lang].map((line, i) => (
                            <div key={i}>{line}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Arrow Segment with Year */}
                  <div className="relative flex items-center w-40 h-10">
                    {/* Arrow body */}
                    <div className={`w-full h-3 ${item.color} relative z-10`}>
                      {/* Arrow head */}
                      <div
                        className={`absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-6 border-b-6 border-l-8 border-t-transparent border-b-transparent ${
                          item.color
                        } border-l-[${item.color.replace("bg-", "")}]`}
                      ></div>
                    </div>
                    {/* Year */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-lg z-20 drop-shadow-lg">
                      {item.year[lang] ? item.year[lang] : item.year}
                    </div>
                  </div>
                </div>
                {/* Arrow between elements, except after the last */}
                {idx < timelineData.length - 1 && (
                  <svg
                    className={`mx-2 w-32 h-40 overflow-visible ${item.color} ${
                      isEven ? "self-end" : "self-start"
                    }`}
                    style={{ alignSelf: isEven ? "flex-end" : "flex-start" }}
                    viewBox="0 0 128 160"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline
                      points={
                        isEven
                          ? "8,136 48,96 88,136 120,40"
                          : "8,24 48,64 88,24 120,120"
                      }
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      strokeLinejoin="miter"
                      markerEnd={`url(#arrowhead-${idx})`}
                    />
                    <defs>
                      <marker
                        id={`arrowhead-${idx}`}
                        markerWidth="16"
                        markerHeight="16"
                        refX="8"
                        refY="8"
                        orient="auto"
                        markerUnits="strokeWidth"
                      >
                        <polygon points="0 0, 16 8, 0 16" fill="currentColor" />
                      </marker>
                    </defs>
                  </svg>
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
