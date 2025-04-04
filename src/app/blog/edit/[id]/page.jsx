"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "../../../context/LangContext";
import { useAuth } from "../../../context/AuthContext";
import { supabase } from "../../../../../lib/supabaseClient";
import React from "react";

export default function EditBlogPostPage({ params }) {
  const router = useRouter();
  const { lang } = useLang();
  const { isLoggedIn, checkAuth, user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Get the post ID using React.use()
  const postId = React.use(params).id;

  useEffect(() => {
    // Check authentication
    if (!checkAuth()) {
      router.push("/login");
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("id", postId)
          .single();

        if (error) {
          throw error;
        }

        if (!data) {
          throw new Error("Post not found");
        }

        setPost({
          id: data.id,
          title: {
            en: data.title_en,
            ko: data.title_ko,
          },
          excerpt: {
            en: data.excerpt_en,
            ko: data.excerpt_ko,
          },
          content: {
            en: data.content_en,
            ko: data.content_ko,
          },
          image: data.image,
        });
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Failed to load post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, checkAuth, router]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPost({ ...post, image: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is still authenticated
    if (!checkAuth()) {
      router.push("/login");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      // Update the blog post
      const { data: updatedPost, error: updateError } = await supabase
        .from("blog_posts")
        .update({
          title_en: post.title.en,
          title_ko: post.title.ko,
          excerpt_en: post.excerpt.en,
          excerpt_ko: post.excerpt.ko,
          content_en: post.content.en,
          content_ko: post.content.ko,
          image: post.image,
          user_id: user.id, // Ensure user_id is included
        })
        .eq("id", postId)
        .select();

      if (updateError) {
        console.error("Error updating post:", updateError);
        throw updateError;
      }

      console.log("Post updated successfully:", updatedPost);

      // Redirect to the blog page
      router.push("/blog");
    } catch (error) {
      console.error("Error updating post:", error);
      setError("Failed to update post. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isLoggedIn) {
    return null; // Don't render anything if not logged in
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <button
          onClick={() => router.push("/blog")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Blog Post</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title (English)
          </label>
          <input
            type="text"
            value={post.title.en}
            onChange={(e) =>
              setPost({ ...post, title: { ...post.title, en: e.target.value } })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title (Korean)
          </label>
          <input
            type="text"
            value={post.title.ko}
            onChange={(e) =>
              setPost({ ...post, title: { ...post.title, ko: e.target.value } })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt (English)
          </label>
          <textarea
            value={post.excerpt.en}
            onChange={(e) =>
              setPost({
                ...post,
                excerpt: { ...post.excerpt, en: e.target.value },
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="3"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt (Korean)
          </label>
          <textarea
            value={post.excerpt.ko}
            onChange={(e) =>
              setPost({
                ...post,
                excerpt: { ...post.excerpt, ko: e.target.value },
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="3"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content (English)
          </label>
          <textarea
            value={post.content.en}
            onChange={(e) =>
              setPost({
                ...post,
                content: { ...post.content, en: e.target.value },
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="10"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content (Korean)
          </label>
          <textarea
            value={post.content.ko}
            onChange={(e) =>
              setPost({
                ...post,
                content: { ...post.content, ko: e.target.value },
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="10"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Image
          </label>
          {post.image && (
            <div className="mt-2 mb-4">
              <img src={post.image} alt="Current" className="max-w-xs h-auto" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push("/blog")}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Update Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
