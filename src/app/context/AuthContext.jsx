"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        // Check if there's a user in localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsLoggedIn(true);
          console.log("User authenticated from localStorage:", parsedUser);
        } else {
          console.log("No user found in localStorage");
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const ensureUserExists = async (userData) => {
    try {
      // Check if user exists in the admin_users table
      const { data: existingUser, error: fetchError } = await supabase
        .from("admin_users")
        .select("id")
        .eq("id", userData.id)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        // PGRST116 is "no rows returned"
        throw fetchError;
      }

      // If user doesn't exist, create them
      if (!existingUser) {
        const { error: insertError } = await supabase
          .from("admin_users")
          .insert([
            {
              id: userData.id,
              email: userData.email,
              created_at: new Date().toISOString(),
            },
          ]);

        if (insertError) {
          throw insertError;
        }
      }
    } catch (error) {
      console.error("Error ensuring user exists:", error);
      throw error;
    }
  };

  const login = async (userData) => {
    try {
      await ensureUserExists(userData);
      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("User logged in:", userData);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = () => {
    try {
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem("user");
      console.log("User logged out");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const checkAuth = () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        // Don't update state here, just return the authentication status
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error checking auth:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        loading,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
