"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/home");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 bg-gradient-to-br from-[#f5f5dc] via-[#e8dcc4] to-[#d4c5a9]">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
      
      {/* Main Card */}
      <div className="relative w-full max-w-md">
        {/* Ornamental top border */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#8b7355] to-transparent"></div>
        
        <div className="bg-[#faf8f3] rounded-lg shadow-2xl border-2 border-[#d4c5a9] p-10 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block mb-2">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#d4c5a9] to-[#b8a788] flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-[#5a4a3a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-serif text-[#5a4a3a] mb-2 tracking-wide">
              {loading ? "Processing..." : "Welcome Back"}
            </h1>
            <p className="text-sm text-[#8b7355] font-light">Sign in to your account</p>
            <div className="w-24 h-0.5 bg-[#b8a788] mx-auto mt-3"></div>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-[#5a4a3a] tracking-wide uppercase text-xs">
                Email Address
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-[#d4c5a9] rounded-md bg-white/50 backdrop-blur-sm focus:outline-none focus:border-[#8b7355] focus:ring-2 focus:ring-[#8b7355]/20 text-[#3a3a3a] placeholder-[#a89d8f] transition-all duration-300 font-light"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-[#5a4a3a] tracking-wide uppercase text-xs">
                  Password
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-xs text-[#8b7355] hover:text-[#6b5a45] transition-colors duration-300"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                className="w-full px-4 py-3 border-2 border-[#d4c5a9] rounded-md bg-white/50 backdrop-blur-sm focus:outline-none focus:border-[#8b7355] focus:ring-2 focus:ring-[#8b7355]/20 text-[#3a3a3a] placeholder-[#a89d8f] transition-all duration-300 font-light"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Enter your password"
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-[#d4c5a9] text-[#8b7355] focus:ring-[#8b7355] focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-[#5a4a3a] cursor-pointer">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              onClick={onLogin}
              disabled={buttonDisabled}
              className={`w-full py-3.5 px-6 rounded-md font-medium tracking-wide transition-all duration-300 mt-6 shadow-lg ${
                buttonDisabled
                  ? "bg-[#e8dcc4] text-[#a89d8f] cursor-not-allowed border-2 border-[#d4c5a9]"
                  : "bg-gradient-to-r from-[#8b7355] to-[#6b5a45] text-[#faf8f3] hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] border-2 border-[#6b5a45]"
              }`}
            >
              {buttonDisabled ? "Please Complete All Fields" : loading ? "Signing In..." : "Sign In"}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#d4c5a9]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#faf8f3] text-[#8b7355] font-light">New to NERD_STORE?</span>
            </div>
          </div>

          {/* Signup Link */}
          <Link 
            href="/signup"
            className="block text-center py-2.5 px-6 rounded-md border-2 border-[#8b7355] text-[#6b5a45] hover:bg-[#8b7355] hover:text-[#faf8f3] transition-all duration-300 font-medium tracking-wide"
          >
            Create New Account
          </Link>
        </div>

        {/* Ornamental bottom border */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#8b7355] to-transparent"></div>
      </div>

      {/* Footer text */}
      <p className="mt-8 text-sm text-[#8b7355] font-light">
        © 2024 All rights reserved
      </p>
    </div>
  );
}