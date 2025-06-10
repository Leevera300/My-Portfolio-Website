"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLang } from "./context/LangContext";

function NotFoundContent() {
  const searchParams = useSearchParams();
  const { lang } = useLang();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-red-400 mb-4">
          {lang === "en" ? "Page Not Found" : "페이지를 찾을 수 없습니다"}
        </h1>
        <p className="text-gray-300 mb-8">
          {lang === "en"
            ? "The page you're looking for doesn't exist or has been moved."
            : "찾으시는 페이지가 존재하지 않거나 이동되었습니다."}
        </p>
        <Link
          href="/"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>{lang === "en" ? "Back to Home" : "홈으로 돌아가기"}</span>
        </Link>
      </div>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      }
    >
      <NotFoundContent />
    </Suspense>
  );
}
