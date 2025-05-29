import { useLang } from "@/app/context/LangContext";
import ProfileImage from "./ProfileImage";

export default function BriefIntro() {
  const { lang } = useLang();

  return (
    <section
      className="w-full min-h-[65vh] flex flex-col md:flex-row items-center justify-between px-16 md:px-24"
      style={{ background: "#38bdf8" }}
    >
      {/* Left: Text Content */}
      <div className="flex-1 flex flex-col justify-center items-center w-full h-full py-12 md:py-0">
        <div className="flex flex-col items-start w-1/2">
          <span className="uppercase tracking-widest text-white/80 text-base mb-6 font-semibold text-left">
            MICHAEL RIVERA
          </span>
        </div>

        <h1 className="text-white text-6xl md:text-8xl font-bold leading-[1.05] mb-10">
          {lang === "en" ? (
            <>
              I'm Full-Stack
              <span className="block">Developer</span>
            </>
          ) : (
            <>
              저는 풀스택
              <span className="block">개발자입니다</span>
            </>
          )}
        </h1>
        {/* Stat Card */}
        <div className="bg-white/20 rounded-2xl px-10 py-5 flex items-start shadow-lg mb-8">
          <div className="text-4xl md:text-5xl font-bold text-white mb-1 mr-8">
            4
          </div>
          <div className="uppercase text-sm font-semibold text-white/90 tracking-wider">
            ONE-PERSON
            <br />
            DEVELOPMENT PROJECT
          </div>
        </div>
      </div>
      {/* Right: Photo */}
      <div className="flex-1 flex justify-center items-center mt-12 md:mt-0">
        <ProfileImage />
      </div>
    </section>
  );
}
