"use client";

import { useState } from "react";
import { useLang } from "../../context/LangContext";
import Link from "next/link";

export default function BlogCard({ post }) {
  const { lang } = useLang();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-[#1a1f2b] rounded-xl shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={post.image || "/images/blog/default.jpg"}
            alt={post.title[lang]}
          />
        </div>
        <div className="p-6 w-full">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">
                {post.title[lang]}
              </h2>
            </div>
            <button
              onClick={toggleExpand}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              {isExpanded ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </button>
          </div>

          <p className="text-gray-200 mb-4">{post.excerpt[lang]}</p>

          {isExpanded && post.content && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="prose prose-invert max-w-none">
                {post.content[lang].split("\n").map((paragraph, index) => (
                  <p key={index} className="text-gray-200 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4">
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center"
            >
              <span>{lang === "en" ? "Read more" : "더 읽기"}</span>
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
