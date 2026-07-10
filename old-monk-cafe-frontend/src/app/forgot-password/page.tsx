"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Coffee, Mail, Lock, Phone, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_BASE_URL } from "@/config/api";

export default function ForgotPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    newPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/reset-password-direct`, {
        email: formData.email,
        phone: formData.phone,
        newPassword: formData.newPassword,
      });

      if (res.data?.success || res.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || "Password reset failed. Please check your credentials.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4 py-32 font-sans">
        <div className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-2xl border border-secondary/15 shadow-md bg-white space-y-6">
          
          {/* Back button */}
          <button
            onClick={() => router.push("/login")}
            className="flex items-center gap-1.5 text-xs text-foreground/50 hover:text-secondary font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Login</span>
          </button>

          {/* Logo & Slogan */}
          <div className="text-center space-y-2">
            <Coffee className="w-12 h-12 text-secondary mx-auto" />
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              Reset Password
            </h1>
            <p className="text-xs text-foreground/50 uppercase tracking-widest font-bold">
              Verify your registered profile to set a new password
            </p>
          </div>

          {success ? (
            <div className="text-center space-y-4 py-4">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto animate-bounce" />
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-foreground">Password Reset Successful!</h3>
                <p className="text-sm text-foreground/60">Your new password has been applied. Redirecting to login...</p>
              </div>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold block">
                  Registered Email Address
                </label>
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

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold block">
                  Registered Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/35" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 9296935757"
                    className="w-full bg-[#FAF9F6] border border-secondary/20 rounded-lg pl-10 pr-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold block">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/35" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    placeholder="Enter new password"
                    className="w-full bg-[#FAF9F6] border border-secondary/20 rounded-lg pl-10 pr-10 py-2.5 text-sm text-foreground focus:outline-none focus:border-secondary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/35 hover:text-secondary cursor-pointer focus:outline-none"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 text-red-700 border border-red-200 text-xs font-semibold rounded">
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
                <span>{loading ? "Verifying..." : "Reset Password"}</span>
              </button>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
