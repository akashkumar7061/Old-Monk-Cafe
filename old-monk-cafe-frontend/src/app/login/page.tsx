"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Coffee, Mail, Lock, User as UserIcon, Phone, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const { login, register, isAuthenticated, isLoading } = useAuth();
  
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // Redirect if already authenticated
  const [redirectTo, setRedirectTo] = useState("/");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const r = params.get("redirect");
      if (r) setRedirectTo(r);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, redirectTo, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLoginMode) {
        await login(formData.email, formData.password);
        router.push(redirectTo);
      } else {
        await register(formData.name, formData.email, formData.phone, formData.password);
        router.push(redirectTo);
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4 py-32">
        <div className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-2xl border border-secondary/15 shadow-md bg-white space-y-6">
          {/* Logo & Slogan */}
          <div className="text-center space-y-2">
            <Coffee className="w-12 h-12 text-secondary mx-auto" />
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              {isLoginMode ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-xs text-foreground/50 uppercase tracking-widest font-bold">
              {isLoginMode ? "Sign in to your café profile" : "Join the Old Monk Inner Circle"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 font-sans">
            {!isLoginMode && (
              <>
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/35" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Akash Kumar"
                      className="w-full bg-[#FAF9F6] border border-secondary/20 rounded-lg pl-10 pr-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-secondary"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/35" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 9296935757"
                      className="w-full bg-[#FAF9F6] border border-secondary/20 rounded-lg pl-10 pr-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-secondary"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/35" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. akash@gmail.com"
                  className="w-full bg-[#FAF9F6] border border-secondary/20 rounded-lg pl-10 pr-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-secondary"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold">Password</label>
                {isLoginMode && (
                  <button
                    type="button"
                    onClick={() => alert("Please contact the administrator to reset your password.")}
                    className="text-[10px] uppercase text-secondary hover:underline font-bold"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/35" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-[#FAF9F6] border border-secondary/20 rounded-lg pl-10 pr-10 py-2.5 text-sm text-foreground focus:outline-none focus:border-secondary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/35 hover:text-secondary cursor-pointer focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 text-red-700 border border-red-200 text-xs font-semibold rounded font-sans">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-secondary hover:bg-secondary-dark text-white font-bold uppercase tracking-wider rounded-lg text-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
            >
              <span>{loading ? "Processing..." : isLoginMode ? "Sign In" : "Register"}</span>
            </button>
          </form>

          {/* Toggle Modes */}
          <div className="text-center pt-2 text-xs text-foreground/60">
            {isLoginMode ? (
              <p>
                Don't have an account?{" "}
                <button
                  onClick={() => setIsLoginMode(false)}
                  className="text-secondary font-bold hover:underline"
                >
                  Create one here
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => setIsLoginMode(true)}
                  className="text-secondary font-bold hover:underline"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
