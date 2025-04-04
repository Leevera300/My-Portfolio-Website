"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../../../lib/supabaseClient";

export default function NewPostPage() {
  const [title, setTitle] = useState({ en: "", ko: "" });
  const [excerpt, setExcerpt] = useState({ en: "", ko: "" });
  const [content, setContent] = useState({ en: "", ko: "" });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isLoggedIn, checkAuth, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    if (!checkAuth()) {
      router.push("/login");
    }
  }, [checkAuth, router]);

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
      setLoading(true);
      setError(null);

      // Get the current user from our auth context
      const currentUser = user;
      if (!currentUser) {
        throw new Error("User not found. Please log in again.");
      }

      console.log("Current user:", currentUser);

      let imageUrl = null;
      if (image) {
        try {
          // Upload image to Supabase Storage
          const fileExt = image.name.split(".").pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = fileName;

          console.log("Uploading image to:", filePath);
          console.log("Image file:", image);
          console.log("Storage bucket: blog-images");

          // Try to upload the file with a simpler approach
          const { data, error: uploadError } = await supabase.storage
            .from("blog-images")
            .upload(filePath, image);

          if (uploadError) {
            console.error("Image upload error:", uploadError);
            throw new Error(`Image upload failed: ${uploadError.message}`);
          }

          // Get the public URL of the uploaded image
          const {
            data: { publicUrl },
          } = supabase.storage.from("blog-images").getPublicUrl(filePath);

          imageUrl = publicUrl;
          console.log("Image uploaded successfully:", imageUrl);
        } catch (error) {
          console.error("Detailed upload error:", error);
          throw new Error(
            `Image upload failed: ${error.message || "Unknown error"}`
          );
        }
      }

      // Create the blog post with user_id
      try {
        console.log("Creating blog post with data:", {
          title_en: title.en,
          title_ko: title.ko,
          excerpt_en: excerpt.en,
          excerpt_ko: excerpt.ko,
          content_en: content.en,
          content_ko: content.ko,
          image: imageUrl,
          user_id: currentUser.id,
        });

        // First, verify the user exists in admin_users
        const { data: adminUser, error: adminError } = await supabase
          .from("admin_users")
          .select("id")
          .eq("id", currentUser.id)
          .single();

        if (adminError) {
          console.error("Error verifying admin user:", adminError);
          throw new Error("Failed to verify admin user");
        }

        if (!adminUser) {
          throw new Error("Admin user not found");
        }

        // Now create the blog post
        const { data: post, error: insertError } = await supabase
          .from("blog_posts")
          .insert([
            {
              title_en: title.en,
              title_ko: title.ko,
              excerpt_en: excerpt.en,
              excerpt_ko: excerpt.ko,
              content_en: content.en,
              content_ko: content.ko,
              image: imageUrl,
              user_id: currentUser.id,
            },
          ])
          .select();

        if (insertError) {
          console.error("Error inserting post:", insertError);
          throw new Error(`Failed to create post: ${insertError.message}`);
        }

        console.log("Post created successfully:", post);

        // Redirect to the blog page
        router.push("/blog");
      } catch (error) {
        console.error("Error creating post:", error);
        throw new Error(`Failed to create post: ${error.message}`);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setError(error.message || "Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return null; // Don't render anything if not logged in
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Blog Post</h1>

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

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
