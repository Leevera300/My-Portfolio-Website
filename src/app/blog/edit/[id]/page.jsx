"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { supabase } from "../../../../../lib/supabaseClient";

export default function EditPostPage({ params }) {
  const [title, setTitle] = useState({ en: "", ko: "" });
  const [excerpt, setExcerpt] = useState({ en: "", ko: "" });
  const [content, setContent] = useState({ en: "", ko: "" });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const { isLoggedIn, checkAuth, user } = useAuth();
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    // Check if user is authenticated
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
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        if (!data) {
          setError("Post not found");
          return;
        }

        // Check if the user is the owner of the post
        if (data.user_id !== user.id) {
          setError("You don't have permission to edit this post");
          return;
        }

        setTitle({
          en: data.title_en || "",
          ko: data.title_ko || "",
        });
        setExcerpt({
          en: data.excerpt_en || "",
          ko: data.excerpt_ko || "",
        });
        setContent({
          en: data.content_en || "",
          ko: data.content_ko || "",
        });
        setCurrentImage(data.image);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Failed to load post. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, checkAuth, router, user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
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
      setSaving(true);
      setError(null);

      let imageUrl = currentImage;
      if (image) {
        // Upload image to Supabase Storage
        const fileExt = image.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        // Fix the path to avoid the double blog-images prefix
        const filePath = fileName;

        console.log("Uploading image to:", filePath);

        const { error: uploadError, data } = await supabase.storage
          .from("blog-images")
          .upload(filePath, image);

        if (uploadError) {
          console.error("Image upload error:", uploadError);
          throw uploadError;
        }

        // Get the public URL of the uploaded image
        const {
          data: { publicUrl },
        } = supabase.storage.from("blog-images").getPublicUrl(filePath);

        imageUrl = publicUrl;
        console.log("Image uploaded successfully:", imageUrl);
      }

      // Update the blog post
      const { data: post, error: updateError } = await supabase
        .from("blog_posts")
        .update({
          title_en: title.en,
          title_ko: title.ko,
          excerpt_en: excerpt.en,
          excerpt_ko: excerpt.ko,
          content_en: content.en,
          content_ko: content.ko,
          image: imageUrl,
          slug: title.en.toLowerCase().replace(/\s+/g, "-"),
          user_id: user.id, // Ensure user_id is included
        })
        .eq("id", id)
        .select();

      if (updateError) {
        console.error("Error updating post:", updateError);
        throw updateError;
      }

      console.log("Post updated successfully:", post);

      // Redirect to the blog page
      router.push("/blog");
    } catch (error) {
      console.error("Error updating post:", error);
      setError("Failed to update post. Please try again.");
    } finally {
      setSaving(false);
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
            value={title.en}
            onChange={(e) => setTitle({ ...title, en: e.target.value })}
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
            value={title.ko}
            onChange={(e) => setTitle({ ...title, ko: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt (English)
          </label>
          <textarea
            value={excerpt.en}
            onChange={(e) => setExcerpt({ ...excerpt, en: e.target.value })}
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
            value={excerpt.ko}
            onChange={(e) => setExcerpt({ ...excerpt, ko: e.target.value })}
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
            value={content.en}
            onChange={(e) => setContent({ ...content, en: e.target.value })}
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
            value={content.ko}
            onChange={(e) => setContent({ ...content, ko: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="10"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Image
          </label>
          {currentImage && !imagePreview && (
            <div className="mt-2 mb-4">
              <img
                src={currentImage}
                alt="Current"
                className="max-w-xs h-auto"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-xs h-auto"
              />
            </div>
          )}
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
            disabled={saving}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {saving ? "Saving..." : "Update Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
