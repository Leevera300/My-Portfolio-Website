"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LangContext";
import { supabase } from "../../../lib/supabaseClient";
import bcrypt from "bcryptjs";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  const { lang } = useLang();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simple validation
    if (!username || !password) {
      setError(
        lang === "en"
          ? "Please enter both username and password"
          : "사용자 이름과 비밀번호를 모두 입력하세요"
      );
      setIsLoading(false);
      return;
    }

    try {
      // Query the admin_users table to find the user
      const { data: users, error: queryError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("username", username)
        .limit(1);

      if (queryError) {
        throw queryError;
      }

      if (!users || users.length === 0) {
        throw new Error(
          lang === "en"
            ? "Invalid username or password"
            : "잘못된 사용자 이름 또는 비밀번호입니다"
        );
      }

      const user = users[0];

      // Verify the password
      const isPasswordValid = await bcrypt.compare(
        password,
        user.password_hash
      );

      if (!isPasswordValid) {
        throw new Error(
          lang === "en"
            ? "Invalid username or password"
            : "잘못된 사용자 이름 또는 비밀번호입니다"
        );
      }

      // Update the auth context with the user data
      login({
        id: user.id,
        name: user.name || user.username,
        email: user.username, // Using username as email for compatibility
      });

      // Store the session in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: user.id,
          name: user.name || user.username,
          email: user.username, // Using username as email for compatibility
        })
      );

      // Redirect to blog page
      router.push("/blog");
    } catch (error) {
      console.error("Login error:", error);
      setError(
        lang === "en"
          ? error.message || "Failed to login. Please check your credentials."
          : error.message || "로그인에 실패했습니다. 자격 증명을 확인하세요."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-[#1a1f2b] rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          {lang === "en" ? "Login" : "로그인"}
        </h1>

        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-300 mb-2 text-sm font-medium"
            >
              {lang === "en" ? "Username" : "사용자 이름"}
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              placeholder={
                lang === "en"
                  ? "Enter your username"
                  : "사용자 이름을 입력하세요"
              }
              disabled={isLoading}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-300 mb-2 text-sm font-medium"
            >
              {lang === "en" ? "Password" : "비밀번호"}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              placeholder={
                lang === "en" ? "Enter your password" : "비밀번호를 입력하세요"
              }
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                <span>{lang === "en" ? "Logging in..." : "로그인 중..."}</span>
              </>
            ) : (
              <span>{lang === "en" ? "Login" : "로그인"}</span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p>
            {lang === "en"
              ? "Please use your admin credentials"
              : "관리자 자격 증명을 사용하세요"}
          </p>
        </div>
      </div>
    </div>
  );
}
