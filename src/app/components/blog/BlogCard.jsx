"use client";

import { useState } from "react";
import { useLang } from "../../context/LangContext";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../../../lib/supabaseClient";

export default function BlogCard({ post, onDelete }) {
  const { lang } = useLang();
  const { isLoggedIn } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        lang === "en"
          ? "Are you sure you want to delete this post?"
          : "이 게시물을 삭제하시겠습니까?"
      )
    ) {
      return;
    }

    try {
      setIsDeleting(true);

      // Delete the post from Supabase
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", post.id);

      if (error) {
        throw error;
      }

      // Call the onDelete callback to update the parent component's state
      onDelete(post.id);
    } catch (error) {
      console.error("Error deleting post:", error);
      alert(lang === "en" ? "Failed to delete post" : "게시물 삭제 실패");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="bg-[#1a1f2b] rounded-xl shadow-lg overflow-hidden"
    >
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={
              post.image ||
              "https://via.placeholder.com/600x400/1a1f2b/ffffff?text=Blog+Post"
            }
            alt={post.title[lang] || "Blog post image"}
          />
        </div>
        <div className="p-6 w-full">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">
                {post.title[lang]}
              </h2>
            </div>
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
        </div>
      </div>
    </Link>
  );
}
