"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/hooks/useUser";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { cart } = useCart();
  const { user, isLoading } = useUser();
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsProfileOpen(false);
    if (user?.source === "nextauth") {
      await signOut({ callbackUrl: "/" });
    } else {
      await fetch("/api/auth/logout");
      router.push("/");
      router.refresh();
    }
  };

  // Avatar initials fallback
  const initials = (user?.username || user?.email || "U")
    .charAt(0)
    .toUpperCase();

  return (
    <nav className="bg-gradient-to-r from-[#faf8f3] to-[#f5f0e8] text-[#5a4a3a] shadow-lg sticky top-0 z-50 border-b-2 border-[#d4c5a9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="shrink-0">
            <Link
              href="/"
              className="text-2xl font-serif tracking-wider text-[#8b7355] hover:text-[#6b5a45] transition-colors duration-300"
            >
              NERD_STORE<span className="text-[#5a4a3a] font-light">.io</span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-baseline space-x-2">
            {[
              { href: "/", label: "Home" },
              { href: "/products", label: "Products" },

            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:text-[#8b7355] group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8b7355] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full bg-white/60 text-[#5a4a3a] placeholder-[#a89d8f] rounded-full py-2 px-5 pl-10 focus:outline-none focus:ring-2 focus:ring-[#8b7355]/50 border-2 border-[#e8dcc4] text-sm shadow-sm transition-all duration-300 focus:bg-white"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#a89d8f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative hover:text-[#8b7355] transition-colors duration-300 flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-[#f5f0e8]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm font-medium">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8b7355] text-[#faf8f3] text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Admin */}
            {user?.isAdmin && (
              <Link
                href="/admin"
                className="text-[#5a4a3a] hover:text-[#8b7355] px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-[#f5f0e8]"
              >
                Admin
              </Link>
            )}

            {/* ── AUTH AREA ── */}
            {isLoading ? (
              <div className="w-10 h-10 rounded-full bg-[#e8dcc4] animate-pulse" />
            ) : user ? (
              /* Profile Dropdown */
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen((o) => !o)}
                  className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-[#f5f0e8] transition-colors"
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt="profile"
                      width={36}
                      height={36}
                      className="rounded-full border-2 border-[#d4c5a9]"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8b7355] to-[#6b5a45] flex items-center justify-center text-white font-bold text-sm border-2 border-[#d4c5a9]">
                      {initials}
                    </div>
                  )}
                  <span className="text-sm font-medium max-w-[80px] truncate">
                    {user.username || user.email?.split("@")[0]}
                  </span>
                  <svg
                    className={`w-4 h-4 text-[#8b7355] transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-[#e8dcc4] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {/* User info header */}
                    <div className="px-4 py-3 border-b border-[#f5f0e8]">
                      <p className="text-xs text-[#8b7355] font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-[#5a4a3a] truncate">{user.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/orders"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#5a4a3a] hover:bg-[#f5f0e8] transition-colors"
                      >
                        <svg className="w-4 h-4 text-[#8b7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        My Orders
                      </Link>

                      <Link
                        href="/cart"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#5a4a3a] hover:bg-[#f5f0e8] transition-colors"
                      >
                        <svg className="w-4 h-4 text-[#8b7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Cart
                        {cartCount > 0 && (
                          <span className="ml-auto bg-[#8b7355] text-white text-xs px-2 py-0.5 rounded-full">
                            {cartCount}
                          </span>
                        )}
                      </Link>
                    </div>

                    <div className="border-t border-[#f5f0e8] py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Sign Up Button */
              <Link
                href="/auth"
                className="bg-gradient-to-r from-[#8b7355] to-[#6b5a45] hover:from-[#6b5a45] hover:to-[#5a4a3a] text-[#faf8f3] px-5 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Sign Up
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#8b7355] hover:text-[#5a4a3a] hover:bg-[#f5f0e8] focus:outline-none transition-colors duration-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#f5f0e8] border-t border-[#e8dcc4]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {[
              { href: "/", label: "Home" },
              { href: "/products", label: "Products" },

            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#5a4a3a] hover:bg-[#e8dcc4] hover:text-[#8b7355] block px-4 py-3 rounded-md text-base font-medium transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/cart"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex justify-between items-center text-[#5a4a3a] hover:bg-[#e8dcc4] hover:text-[#8b7355] px-4 py-3 rounded-md text-base font-medium transition-all duration-300"
            >
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="bg-[#8b7355] text-[#faf8f3] text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {user?.isAdmin && (
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#5a4a3a] hover:bg-[#e8dcc4] hover:text-[#8b7355] block px-4 py-3 rounded-md text-base font-medium transition-all duration-300"
              >
                Admin
              </Link>
            )}

            {user ? (
              <>
                <div className="px-4 py-3 text-sm font-medium text-[#8b7355] border-t border-[#e8dcc4]">
                  👤 {user.username || user.email}
                </div>
                <Link href="/orders" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-sm text-[#5a4a3a] hover:bg-[#e8dcc4] rounded-md">
                  My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 rounded-md font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-gradient-to-r from-[#8b7355] to-[#6b5a45] text-[#faf8f3] block px-4 py-3 rounded-md text-base font-medium transition-all duration-300 text-center shadow-md"
              >
                Sign Up / Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}