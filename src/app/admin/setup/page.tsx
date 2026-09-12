"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function AdminSetupPage() {
  const router = useRouter();
  const [adminKey, setAdminKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!adminKey.trim()) {
      toast.error("Please enter the admin secret key");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/auth/promote-admin", {
        adminKey: adminKey.trim(),
      });
      console.log("Admin promotion success:", response.data);
      toast.success("You are now an admin! 🎉");
      setSuccess(true);
      // Redirect to admin dashboard after a brief moment
      setTimeout(() => {
        router.push("/admin");
      }, 2000);
    } catch (error: any) {
      console.error("Admin promotion failed:", error.response?.data);
      toast.error(error.response?.data?.error || "Failed to verify admin key");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#f5f5dc] via-[#e8dcc4] to-[#d4c5a9] py-8 px-4">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Main Card */}
        <div className="bg-[#faf8f3] rounded-2xl shadow-2xl border-2 border-[#d4c5a9] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#8b7355] via-[#6b5a45] to-[#5a4a3a] px-8 py-10 text-center">
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-[#faf8f3]/10 backdrop-blur-sm flex items-center justify-center border-2 border-[#faf8f3]/30">
              <svg
                className="w-10 h-10 text-[#faf8f3]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#faf8f3] mb-2">
              Admin Verification
            </h1>
            <p className="text-[#e8dcc4] text-sm font-light leading-relaxed">
              Enter the admin secret key to gain administrator privileges
            </p>
          </div>

          {/* Body */}
          <div className="px-8 py-8">
            {success ? (
              /* Success State */
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-serif font-bold text-[#5a4a3a] mb-2">
                  Admin Access Granted!
                </h2>
                <p className="text-[#8b7355] text-sm mb-6">
                  Redirecting you to the admin dashboard...
                </p>
                <div className="w-8 h-8 mx-auto border-4 border-[#8b7355] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              /* Form State */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-[#8b7355] uppercase tracking-wide mb-2">
                    Admin Secret Key
                  </label>
                  <div className="relative">
                    <input
                      type={showKey ? "text" : "password"}
                      value={adminKey}
                      onChange={(e) => setAdminKey(e.target.value)}
                      placeholder="Enter your admin secret key"
                      className="w-full px-4 py-3.5 pr-12 border-2 border-[#d4c5a9] rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:border-[#8b7355] focus:ring-2 focus:ring-[#8b7355]/20 text-[#3a3a3a] placeholder-[#a89d8f] transition-all duration-300 font-light"
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a89d8f] hover:text-[#5a4a3a] transition-colors"
                    >
                      {showKey ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Info box */}
                <div className="bg-[#f5f0e8] rounded-xl p-4 border border-[#e8dcc4]">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-[#8b7355] mt-0.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-xs text-[#8b7355] leading-relaxed">
                      The admin secret key is set by the system administrator. If you don&apos;t
                      have it, please contact the project owner.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !adminKey.trim()}
                  className={`w-full py-3.5 px-6 rounded-xl font-medium tracking-wide transition-all duration-300 shadow-lg ${
                    isSubmitting || !adminKey.trim()
                      ? "bg-[#e8dcc4] text-[#a89d8f] cursor-not-allowed border-2 border-[#d4c5a9]"
                      : "bg-gradient-to-r from-[#8b7355] to-[#6b5a45] text-[#faf8f3] hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] border-2 border-[#6b5a45]"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Verifying...
                    </span>
                  ) : (
                    "Verify & Activate Admin"
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 pb-6">
            <Link
              href="/home"
              className="flex items-center justify-center gap-2 text-sm text-[#8b7355] hover:text-[#5a4a3a] transition-colors font-light"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
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
