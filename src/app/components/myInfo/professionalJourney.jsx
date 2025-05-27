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
      icon: "👨‍✈️",
      color: "bg-yellow-400",
    },
    {
      year: "2021.08–2022.06",
      title: {
        ko: "연구 조교",
        en: "Research Assistant",
      },
      description: {
        ko: [
          "• 실험 설계 및 데이터 분석 수행",
          "• 연구 프로젝트 목표 달성을 위한 데이터 기록 및 정리",
        ],
        en: [
          "• Conducted experimental design and data analysis",
          "• Recorded and organized data to achieve research project objectives",
        ],
      },
      icon: "🔬",
      color: "bg-indigo-400",
    },
    {
      year: "2022",
      title: {
        ko: "응급 구조사 (EMT)",
        en: "EMT",
      },
      description: {
        ko: [
          "• 앰뷸런스 탑승 환자 응급처치 및 이송",
          "• EMT 실습생 멘토링 및 현장 운영 지원",
        ],
        en: [
          "• Provided emergency care and transport for ambulance patients",
          "• Mentored EMT trainees and supported field operations",
        ],
      },
      icon: "🚑",
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
      icon: "🔒",
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
      icon: "💻",
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
      icon: "K",
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
      icon: "🌐",
      color: "bg-green-400",
    },
  ];

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-[80vh] w-full py-16 px-4">
      <h2 className="text-4xl font-bold text-white text-center mb-16 tracking-wide">
        {lang === "en" ? "Professional Journey" : "경력 타임라인"}
      </h2>
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          {/* Main Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-700"></div>

          {timelineData.map((item, idx) => (
            <div
              key={idx}
              className="relative mb-24 last:mb-0"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              {/* Timeline Node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div
                  className={`w-8 h-8 rounded-full ${item.color} border-4 border-gray-800`}
                ></div>
              </div>

              {/* Content Card */}
              <div
                className={`relative w-[calc(50%-2rem)] ${
                  idx % 2 === 0 ? "ml-auto" : "mr-auto"
                }`}
              >
                <div
                  className={`p-6 rounded-lg shadow-lg ${
                    idx % 2 === 0 ? "ml-8" : "mr-8"
                  }`}
                  style={{
                    backgroundColor: "rgba(17, 24, 39, 0.8)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {/* Year Badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-sm font-semibold bg-gray-800 text-white">
                      {item.year[lang] ? item.year[lang] : item.year}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-2xl`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-xl font-bold text-white mb-3 cursor-pointer hover:text-gray-300 transition-colors"
                        onMouseEnter={() => setHoverIdx(idx)}
                        onMouseLeave={() => setHoverIdx(null)}
                        onClick={() =>
                          setActiveIdx(activeIdx === idx ? null : idx)
                        }
                      >
                        {item.title[lang]}
                      </h3>
                      {(activeIdx === idx || hoverIdx === idx) && (
                        <div className="text-gray-300 space-y-2">
                          {item.description[lang].map((line, i) => (
                            <p key={i} className="text-sm">
                              {line}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Connecting Line */}
                {idx < timelineData.length - 1 && (
                  <div
                    className={`absolute ${
                      idx % 2 === 0 ? "left-0" : "right-0"
                    } top-1/2 w-8 h-0.5 ${item.color}`}
                  ></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
