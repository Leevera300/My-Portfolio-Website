"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLang } from "./context/LangContext";

function NotFoundContent() {
  const searchParams = useSearchParams();
  const { lang } = useLang();
  const message = searchParams.get("message");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-8">
          {message || "Page not found"}
        </p>
        <Link
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="text-center">
            <p className="text-xl text-gray-300">Loading...</p>
          </div>
        </div>
      }
    >
      <NotFoundContent />
    </Suspense>
  );
}
