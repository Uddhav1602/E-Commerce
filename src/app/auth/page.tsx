"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function AuthPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);

  // Login States
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  // Signup States
  const [signupUser, setSignupUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [loginButtonDisabled, setLoginButtonDisabled] = useState(false);
  const [signupButtonDisabled, setSignupButtonDisabled] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const onLogin = async () => {
    try {
      setLoginLoading(true);
      const response = await axios.post("/api/auth/login", loginUser);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/home");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.response?.data?.error || "Login failed");
    } finally {
      setLoginLoading(false);
    }
  };

  const onSignup = async () => {
    try {
      setSignupLoading(true);
      const response = await axios.post("/api/auth/signup", signupUser);
      console.log("Signup success", response.data);
      toast.success("Account created! Please login.");
      // Switch to login view with animation
      setIsSignUp(false);
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.response?.data?.error || "Signup failed");
    } finally {
      setSignupLoading(false);
    }
  };

  useEffect(() => {
    if (loginUser.email.length > 0 && loginUser.password.length > 0) {
      setLoginButtonDisabled(false);
    } else {
      setLoginButtonDisabled(true);
    }
  }, [loginUser]);

  useEffect(() => {
    if (signupUser.email.length > 0 && signupUser.password.length > 0 && signupUser.username.length > 0) {
      setSignupButtonDisabled(false);
    } else {
      setSignupButtonDisabled(true);
    }
  }, [signupUser]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#f5f5dc] via-[#e8dcc4] to-[#d4c5a9] py-8 px-4">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>

      <div className="relative z-10 overflow-hidden w-[900px] max-w-full min-h-[600px] bg-[#faf8f3] rounded-2xl shadow-2xl border-2 border-[#d4c5a9]">

        {/* ============ SIGN UP FORM ============ */}
        <div
          className={`absolute top-0 h-full w-1/2 left-0 transition-all duration-700 ease-in-out ${
            isSignUp ? "translate-x-full opacity-100 z-50" : "opacity-0 z-0"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full px-12 text-center">
            {/* Icon */}
            <div className="w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-[#d4c5a9] to-[#b8a788] flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-[#5a4a3a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>

            <h1 className="text-3xl font-serif font-bold mb-2 text-[#5a4a3a]">
              {signupLoading ? "Processing..." : "Create Account"}
            </h1>
            <div className="w-24 h-0.5 bg-[#b8a788] mb-8"></div>

            <input
              className="w-full px-4 py-3 mb-4 border-2 border-[#d4c5a9] rounded-md bg-white/50 backdrop-blur-sm focus:outline-none focus:border-[#8b7355] focus:ring-2 focus:ring-[#8b7355]/20 text-[#3a3a3a] placeholder-[#a89d8f] transition-all duration-300 font-light"
              placeholder="Username"
              value={signupUser.username}
              onChange={(e) => setSignupUser({ ...signupUser, username: e.target.value })}
            />

            <input
              className="w-full px-4 py-3 mb-4 border-2 border-[#d4c5a9] rounded-md bg-white/50 backdrop-blur-sm focus:outline-none focus:border-[#8b7355] focus:ring-2 focus:ring-[#8b7355]/20 text-[#3a3a3a] placeholder-[#a89d8f] transition-all duration-300 font-light"
              placeholder="Email"
              type="email"
              value={signupUser.email}
              onChange={(e) => setSignupUser({ ...signupUser, email: e.target.value })}
            />

            <input
              type="password"
              className="w-full px-4 py-3 mb-4 border-2 border-[#d4c5a9] rounded-md bg-white/50 backdrop-blur-sm focus:outline-none focus:border-[#8b7355] focus:ring-2 focus:ring-[#8b7355]/20 text-[#3a3a3a] placeholder-[#a89d8f] transition-all duration-300 font-light"
              placeholder="Password"
              value={signupUser.password}
              onChange={(e) => setSignupUser({ ...signupUser, password: e.target.value })}
            />

            <button
              onClick={onSignup}
              disabled={signupButtonDisabled}
              className={`w-full py-3.5 px-6 mt-4 rounded-md font-medium tracking-wide transition-all duration-300 shadow-lg ${
                signupButtonDisabled
                  ? "bg-[#e8dcc4] text-[#a89d8f] cursor-not-allowed border-2 border-[#d4c5a9]"
                  : "bg-gradient-to-r from-[#8b7355] to-[#6b5a45] text-[#faf8f3] hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] border-2 border-[#6b5a45]"
              }`}
            >
              {signupButtonDisabled ? "Complete All Fields" : signupLoading ? "Creating..." : "Sign Up"}
            </button>
          </div>
        </div>

        {/* ============ SIGN IN FORM ============ */}
        <div
          className={`absolute top-0 h-full w-1/2 left-0 transition-all duration-700 ease-in-out ${
            isSignUp ? "translate-x-full opacity-0" : "opacity-100 z-20"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full px-12 text-center">
            {/* Icon */}
            <div className="w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-[#d4c5a9] to-[#b8a788] flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-[#5a4a3a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>

            <h1 className="text-3xl font-serif font-bold mb-2 text-[#5a4a3a]">
              {loginLoading ? "Processing..." : "Welcome Back"}
            </h1>
            <div className="w-24 h-0.5 bg-[#b8a788] mb-8"></div>

            <input
              className="w-full px-4 py-3 mb-4 border-2 border-[#d4c5a9] rounded-md bg-white/50 backdrop-blur-sm focus:outline-none focus:border-[#8b7355] focus:ring-2 focus:ring-[#8b7355]/20 text-[#3a3a3a] placeholder-[#a89d8f] transition-all duration-300 font-light"
              placeholder="Email"
              type="email"
              value={loginUser.email}
              onChange={(e) => setLoginUser({ ...loginUser, email: e.target.value })}
            />

            <input
              type="password"
              className="w-full px-4 py-3 mb-3 border-2 border-[#d4c5a9] rounded-md bg-white/50 backdrop-blur-sm focus:outline-none focus:border-[#8b7355] focus:ring-2 focus:ring-[#8b7355]/20 text-[#3a3a3a] placeholder-[#a89d8f] transition-all duration-300 font-light"
              placeholder="Password"
              value={loginUser.password}
              onChange={(e) => setLoginUser({ ...loginUser, password: e.target.value })}
            />

            <div className="w-full flex items-center justify-between mb-2">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-[#d4c5a9] text-[#8b7355] focus:ring-[#8b7355] cursor-pointer"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-[#5a4a3a] cursor-pointer">
                  Remember me
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm text-[#8b7355] hover:text-[#6b5a45] transition-colors">
                Forgot?
              </Link>
            </div>

            <button
              onClick={onLogin}
              disabled={loginButtonDisabled}
              className={`w-full py-3.5 px-6 mt-4 rounded-md font-medium tracking-wide transition-all duration-300 shadow-lg ${
                loginButtonDisabled
                  ? "bg-[#e8dcc4] text-[#a89d8f] cursor-not-allowed border-2 border-[#d4c5a9]"
                  : "bg-gradient-to-r from-[#8b7355] to-[#6b5a45] text-[#faf8f3] hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] border-2 border-[#6b5a45]"
              }`}
            >
              {loginButtonDisabled ? "Complete All Fields" : loginLoading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </div>

        {/* ============ OVERLAY CONTAINER ============ */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-[100] ${
            isSignUp ? "-translate-x-full" : ""
          }`}
        >
          <div
            className={`bg-gradient-to-br from-[#8b7355] via-[#6b5a45] to-[#5a4a3a] text-[#faf8f3] h-full w-[200%] relative -left-full transition-transform duration-700 ease-in-out ${
              isSignUp ? "translate-x-1/2" : ""
            }`}
          >
            {/* OVERLAY LEFT (Shown when Sign Up is Active) */}
            <div className="absolute top-0 w-1/2 h-full flex flex-col items-center justify-center px-12 text-center transform translate-x-0 transition-transform duration-700">
              <div className="w-24 h-24 mb-6 rounded-full bg-[#faf8f3]/10 backdrop-blur-sm flex items-center justify-center border-2 border-[#faf8f3]/30">
                <svg className="w-12 h-12 text-[#faf8f3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </div>
              <h1 className="text-3xl font-serif font-bold mb-4">Welcome Back!</h1>
              <p className="mb-8 text-[#e8dcc4] leading-relaxed max-w-xs">
                To continue your journey with us, please sign in with your account credentials.
              </p>
              <button
                onClick={() => setIsSignUp(false)}
                className="bg-transparent border-2 border-[#faf8f3] text-[#faf8f3] px-10 py-3 rounded-md font-medium tracking-wide uppercase transition-all duration-300 hover:bg-[#faf8f3] hover:text-[#5a4a3a] active:scale-95 shadow-lg"
              >
                Sign In
              </button>
            </div>

            {/* OVERLAY RIGHT (Shown when Sign In is Active) */}
            <div className="absolute top-0 right-0 w-1/2 h-full flex flex-col items-center justify-center px-12 text-center transform translate-x-0 transition-transform duration-700">
              <div className="w-24 h-24 mb-6 rounded-full bg-[#faf8f3]/10 backdrop-blur-sm flex items-center justify-center border-2 border-[#faf8f3]/30">
                <svg className="w-12 h-12 text-[#faf8f3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h1 className="text-3xl font-serif font-bold mb-4">Join Us Today!</h1>
              <p className="mb-8 text-[#e8dcc4] leading-relaxed max-w-xs">
                Create your account and embark on an exceptional experience with NERD_STORE.
              </p>
              <button
                onClick={() => setIsSignUp(true)}
                className="bg-transparent border-2 border-[#faf8f3] text-[#faf8f3] px-10 py-3 rounded-md font-medium tracking-wide uppercase transition-all duration-300 hover:bg-[#faf8f3] hover:text-[#5a4a3a] active:scale-95 shadow-lg"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="absolute bottom-6 text-sm text-[#8b7355] font-light z-0">
        © 2024 NERD_STORE. All rights reserved.
      </p>
    </div>
  );
}

