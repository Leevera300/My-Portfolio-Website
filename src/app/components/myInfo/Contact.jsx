"use client";
import { useState } from "react";
import { useLang } from "../../context/LangContext";
import Image from "next/image";

export default function Contact() {
  const { lang } = useLang();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      setError(
        lang === "en"
          ? "Failed to send message. Please try again."
          : "메시지 전송에 실패했습니다. 다시 시도해주세요."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleBackClick = (e) => {
    // Check if the click was on a form element or its child
    const isFormElement =
      e.target.closest("form") ||
      e.target.tagName === "INPUT" ||
      e.target.tagName === "TEXTAREA" ||
      e.target.tagName === "BUTTON";

    if (!isFormElement) {
      toggleFlip();
    }
  };

  return (
    <section id="contact" className="px-6 py-20 max-w-3xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#38bdf8] to-[#00ffc3] bg-clip-text text-transparent">
        {lang === "en" ? "Get in Touch" : "연락하기"}
      </h2>

      <div className="perspective-1000 w-[600px] h-[340px] mx-auto">
        <div
          className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front of card */}
          <div
            className={`absolute w-full h-full backface-hidden bg-gradient-to-br from-[#0d1117] via-[#1a1f2b] to-[#0d1117] rounded-xl shadow-2xl p-8 cursor-pointer
              hover:shadow-[#38bdf8]/20 transition-all duration-300 border border-[#38bdf8]/20`}
            onClick={toggleFlip}
          >
            <div className="text-[#e5e7eb] h-full flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#e5e7eb] to-[#38bdf8] bg-clip-text text-transparent">
                Michael Lee Rivera
              </h3>
              <p className="text-xl mb-2 text-[#38bdf8]">
                Full Stack Developer
              </p>
              <p className="text-lg mb-4 text-[#9ca3af] flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                michaelrivera0206@gmail.com
              </p>
              <div className="flex justify-center items-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#38bdf8] rounded-full blur-md opacity-30 animate-pulse"></div>
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={80}
                    height={80}
                    className="rounded-full relative z-10 border-2 border-[#38bdf8]/30"
                  />
                </div>
              </div>
              <p className="text-sm italic text-[#9ca3af]">
                {lang === "en" ? "Click to contact" : "연락하기를 클릭하세요"}
              </p>
            </div>
          </div>

          {/* Back of card */}
          <div
            className={`absolute w-full h-full backface-hidden bg-gradient-to-br from-[#0d1117] via-[#1a1f2b] to-[#0d1117] rounded-xl shadow-2xl p-6 rotate-y-180 overflow-y-auto cursor-pointer
              hover:shadow-[#38bdf8]/20 transition-all duration-300 border border-[#38bdf8]/20`}
            onClick={handleBackClick}
          >
            {isSubmitted ? (
              <div className="text-[#e5e7eb] h-full flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-12 h-12 text-[#10b981] mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-lg">
                    {lang === "en"
                      ? "Thank you for your message! I'll get back to you soon."
                      : "메시지를 보내주셔서 감사합니다! 곧 답변 드리겠습니다."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-[#e5e7eb]">
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={lang === "en" ? "Your Name" : "이름"}
                      className="w-full px-3 py-2 rounded-lg border border-[#38bdf8]/30 bg-[#1a1f2b] text-[#e5e7eb] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00ffc3]/50 focus:border-transparent transition-all"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={lang === "en" ? "Your Email" : "이메일"}
                      className="w-full px-3 py-2 rounded-lg border border-[#38bdf8]/30 bg-[#1a1f2b] text-[#e5e7eb] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00ffc3]/50 focus:border-transparent transition-all"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={lang === "en" ? "Your Message" : "메시지"}
                      rows="4"
                      className="w-full px-3 py-2 rounded-lg border border-[#38bdf8]/30 bg-[#1a1f2b] text-[#e5e7eb] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00ffc3]/50 focus:border-transparent transition-all"
                      required
                      disabled={isLoading}
                    ></textarea>
                  </div>
                  <div className="flex gap-2 justify-center pt-2">
                    <button
                      type="submit"
                      className="bg-[#38bdf8] text-[#0d1117] px-4 py-2 rounded-lg text-sm hover:bg-[#00ffc3] transition-all duration-300 flex-1 max-w-[120px] shadow-lg hover:shadow-[#38bdf8]/20 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoading}
                    >
                      {isLoading
                        ? lang === "en"
                          ? "Sending..."
                          : "전송 중..."
                        : lang === "en"
                        ? "Send"
                        : "보내기"}
                    </button>
                  </div>
                </form>
                {error && (
                  <p className="text-[#ef4444] mt-2 text-sm flex items-center justify-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {error}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
