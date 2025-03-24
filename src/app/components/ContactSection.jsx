"use client";
import { useState } from "react";
import { useLang } from "../context/LangContext";

export default function ContactSection() {
  const [status, setStatus] = useState("idle");
  const { lang } = useLang(); // ✅ Get current language

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mqapbbpv", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        form.reset();
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="px-6 py-20 max-w-3xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-8">
        {lang === "en" ? "Contact Me" : "연락하기"}
      </h2>

      {status === "success" ? (
        <p className="text-green-600 dark:text-green-400 text-lg">
          {lang === "en"
            ? "✅ Message sent! I’ll get back to you soon."
            : "✅ 메시지가 전송되었습니다! 곧 연락드릴게요."}
        </p>
      ) : (
        <>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            {lang === "en"
              ? "Have a question or want to connect? I’d love to hear from you!"
              : "질문이 있거나 연락하고 싶으신가요? 언제든지 환영입니다!"}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              placeholder={lang === "en" ? "Your Name" : "이름"}
              required
              className="px-4 py-3 rounded border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <input
              type="email"
              name="email"
              placeholder={lang === "en" ? "Your Email" : "이메일"}
              required
              className="px-4 py-3 rounded border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <textarea
              name="message"
              rows="5"
              placeholder={lang === "en" ? "Your Message" : "메시지"}
              required
              className="px-4 py-3 rounded border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              {status === "sending"
                ? lang === "en"
                  ? "Sending..."
                  : "보내는 중..."
                : lang === "en"
                ? "Send Message"
                : "메시지 보내기"}
            </button>
          </form>

          {status === "error" && (
            <p className="text-red-600 dark:text-red-400 mt-4">
              {lang === "en"
                ? "❌ Something went wrong. Please try again later."
                : "❌ 문제가 발생했습니다. 잠시 후 다시 시도해주세요."}
            </p>
          )}
        </>
      )}
    </section>
  );
}
