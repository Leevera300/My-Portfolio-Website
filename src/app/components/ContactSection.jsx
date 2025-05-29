"use client";
import { useState } from "react";
import { useLang } from "../context/LangContext";

export default function ContactSection() {
  const { lang } = useLang();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
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

  return (
    <section id="contact" className="px-6 py-20 max-w-3xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-8">
        {lang === "en" ? "Get in Touch" : "연락하기"}
      </h2>

      {isSubmitted ? (
        <p className="text-green-400 text-lg">
          {lang === "en"
            ? "Thank you for your message! I'll get back to you soon."
            : "메시지를 보내주셔서 감사합니다! 곧 답변 드리겠습니다."}
        </p>
      ) : (
        <>
          <p className="text-lg text-gray-200 mb-6">
            {lang === "en"
              ? "Have a question or want to work together? Feel free to reach out!"
              : "궁금한 점이 있거나 함께 일하고 싶으신가요? 언제든지 연락해주세요!"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={lang === "en" ? "Your Name" : "이름"}
                className="w-full px-4 py-3 rounded border border-gray-600 bg-[#1a1f2b] text-white"
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
                className="w-full px-4 py-3 rounded border border-gray-600 bg-[#1a1f2b] text-white"
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
                rows="5"
                className="w-full px-4 py-3 rounded border border-gray-600 bg-[#1a1f2b] text-white"
                required
                disabled={isLoading}
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading
                ? lang === "en"
                  ? "Sending..."
                  : "전송 중..."
                : lang === "en"
                ? "Send Message"
                : "메시지 보내기"}
            </button>
          </form>

          {error && <p className="text-red-400 mt-4">{error}</p>}
        </>
      )}
    </section>
  );
}
