"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLang } from "../../context/LangContext";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import { supabase } from "../../../../lib/supabaseClient";

export default function BlogPostPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { lang } = useLang();
  const { isLoggedIn } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        // First, get all posts
        const { data: posts, error: postsError } = await supabase
          .from("blog_posts")
          .select("*");

        if (postsError) {
          throw postsError;
        }

        // Find the post with matching slug
        const foundPost = posts.find(
          (p) =>
            p.title_en
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]+/g, "") === slug
        );

        if (foundPost) {
          // Transform the data to match the expected format
          const transformedPost = {
            id: foundPost.id,
            title: {
              en: foundPost.title_en || "",
              ko: foundPost.title_ko || "",
            },
            excerpt: {
              en: foundPost.excerpt_en || "",
              ko: foundPost.excerpt_ko || "",
            },
            content: {
              en: foundPost.content_en || "",
              ko: foundPost.content_ko || "",
            },
            image: foundPost.image || "",
            slug: slug,
          };
          setPost(transformedPost);
        } else {
          setError(
            lang === "en" ? "Post not found" : "게시물을 찾을 수 없습니다"
          );
        }
      } catch (error) {
        console.error("Error loading post:", error);
        setError(
          lang === "en"
            ? "Error loading post"
            : "게시물 로딩 중 오류가 발생했습니다"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, lang]);

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

      // If the post has an image, delete it from storage first
      if (post.image) {
        // Extract the file path from the URL
        const imagePath = post.image.split("/").pop();
        const { error: storageError } = await supabase.storage
          .from("blog-images")
          .remove([imagePath]);

        if (storageError) {
          console.error("Error deleting image:", storageError);
          // Continue with post deletion even if image deletion fails
        }
      }

      // Delete the post from Supabase
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", post.id);

      if (error) {
        throw error;
      }

      // Redirect to the blog page after successful deletion
      router.push("/blog");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert(lang === "en" ? "Failed to delete post" : "게시물 삭제 실패");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">
            {lang === "en" ? "Loading..." : "로딩 중..."}
          </p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">
            {error ||
              (lang === "en" ? "Post not found" : "게시물을 찾을 수 없습니다")}
          </h1>
          <Link
            href="/blog"
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
            <span>{lang === "en" ? "Back to Blog" : "블로그로 돌아가기"}</span>
          </Link>
        </div>
      </div>
    );
  }

  // Ensure content exists and is properly structured
  const postContent = post?.content?.[lang] || "";
  const paragraphs = postContent ? postContent.split("\n") : [];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/blog"
            className="text-blue-400 hover:text-blue-300 transition-colors flex items-center text-2xl"
          >
            <svg
              className="w-5 h-5 mr-2"
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
            {lang === "en" ? "Back to Blog" : "블로그로 돌아가기"}
          </Link>

          {isLoggedIn && (
            <div className="flex space-x-4">
              <Link
                href={`/blog/edit/${post.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                {lang === "en" ? "Edit" : "수정"}
              </Link>

              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
              >
                {isDeleting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {lang === "en" ? "Deleting..." : "삭제 중..."}
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    {lang === "en" ? "Delete" : "삭제"}
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        <article className="bg-[#1a1f2b] rounded-xl shadow-lg overflow-hidden">
          {post.image && (
            <div className="w-full h-64 md:h-96 relative">
              <img
                src={post.image}
                alt={post.title[lang] || ""}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {post.title[lang] || ""}
            </h1>

            <div className="prose prose-invert max-w-none">
              {paragraphs.length > 0 ? (
                paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-gray-200 mb-4 text-xl">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-gray-200">
                  {lang === "en"
                    ? "No content available for this post."
                    : "이 게시물에 대한 내용이 없습니다."}
                </p>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
