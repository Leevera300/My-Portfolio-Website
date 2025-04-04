"use client";

import { useState, useEffect } from "react";
import { useLang } from "../context/LangContext";
import { useAuth } from "../context/AuthContext";
import BlogCard from "../components/blog/BlogCard";
import SearchBar from "../components/blog/SearchBar";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BlogPage() {
  const { lang } = useLang();
  const { isLoggedIn, checkAuth } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Fetch posts from Supabase
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        // Transform the data to match the expected format
        const transformedPosts = data.map((post) => ({
          id: post.id,
          title: {
            en: post.title_en,
            ko: post.title_ko,
          },
          excerpt: {
            en: post.excerpt_en,
            ko: post.excerpt_ko,
          },
          content: {
            en: post.content_en,
            ko: post.content_ko,
          },
          image: post.image,
          slug: post.title_en
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, ""),
        }));

        setPosts(transformedPosts);
        setFilteredPosts(transformedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) =>
        post.title[lang].toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchQuery, lang, posts]);

  const handleAddPost = () => {
    // Check if user is authenticated before redirecting
    if (checkAuth()) {
      router.push("/blog/new");
    } else {
      // If not authenticated, redirect to login page
      router.push("/login");
    }
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
    setFilteredPosts(filteredPosts.filter((post) => post.id !== postId));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">
          {lang === "en" ? "Blog" : "블로그"}
        </h1>

        {isLoggedIn && (
          <button
            onClick={handleAddPost}
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>{lang === "en" ? "Add Post" : "게시물 추가"}</span>
          </button>
        )}
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder={lang === "en" ? "Search blogs..." : "블로그 검색..."}
        />
      </div>

      <div className="max-w-4xl mx-auto">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-300">
              {lang === "en"
                ? "No blogs found matching your search."
                : "검색과 일치하는 블로그가 없습니다."}
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} onDelete={handleDeletePost} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
