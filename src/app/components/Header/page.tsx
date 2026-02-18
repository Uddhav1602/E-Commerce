"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-linear-to-r from-[#faf8f3] to-[#f5f0e8] text-[#5a4a3a] shadow-lg sticky top-0 z-50 border-b-2 border-[#d4c5a9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="text-2xl font-serif tracking-wider text-[#8b7355] hover:text-[#6b5a45] transition-colors duration-300">
              NERD_STORE<span className="text-[#5a4a3a] font-light">.io</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              <Link 
                href="/" 
                className="relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:text-[#8b7355] group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8b7355] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/products" 
                className="relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:text-[#8b7355] group"
              >
                Products
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8b7355] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/about" 
                className="relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:text-[#8b7355] group"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8b7355] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>

          {/* Search Bar (Hidden on small screens) */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for mechanical keyboards..."
                className="w-full bg-white/60 text-[#5a4a3a] placeholder-[#a89d8f] rounded-full py-2 px-5 pl-10 focus:outline-none focus:ring-2 focus:ring-[#8b7355]/50 border-2 border-[#e8dcc4] text-sm shadow-sm transition-all duration-300 focus:bg-white"
              />
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#a89d8f]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Right Side Buttons */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link 
                href="/cart" 
                className="relative hover:text-[#8b7355] transition-colors duration-300 flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-[#f5f0e8]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-sm font-medium">Cart</span>
                <span className="absolute -top-1 -right-1 bg-[#8b7355] text-[#faf8f3] text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-md">0</span>
              </Link>
              
              <Link 
                href="/auth" 
                className="text-[#5a4a3a] hover:text-[#8b7355] px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-[#f5f0e8]"
              >
                Login
              </Link>
              
              <Link 
                href="/auth" 
                className="bg-linear-to-r from-[#8b7355] to-[#6b5a45] hover:from-[#6b5a45] hover:to-[#5a4a3a] text-[#faf8f3] px-5 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#8b7355] hover:text-[#5a4a3a] hover:bg-[#f5f0e8] focus:outline-none transition-colors duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger Icon */}
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#f5f0e8] border-t border-[#e8dcc4]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/" 
              className="text-[#5a4a3a] hover:bg-[#e8dcc4] hover:text-[#8b7355] block px-4 py-3 rounded-md text-base font-medium transition-all duration-300"
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className="text-[#5a4a3a] hover:bg-[#e8dcc4] hover:text-[#8b7355] block px-4 py-3 rounded-md text-base font-medium transition-all duration-300"
            >
              Products
            </Link>
            <Link 
              href="/about" 
              className="text-[#5a4a3a] hover:bg-[#e8dcc4] hover:text-[#8b7355] block px-4 py-3 rounded-md text-base font-medium transition-all duration-300"
            >
              About
            </Link>
            <Link 
              href="/cart" 
              className="text-[#5a4a3a] hover:bg-[#e8dcc4] hover:text-[#8b7355] block px-4 py-3 rounded-md text-base font-medium transition-all duration-300 items-center justify-between"
            >
              <span>Cart</span>
              <span className="bg-[#8b7355] text-[#faf8f3] text-xs rounded-full h-6 w-6 flex items-center justify-center">0</span>
            </Link>
            <Link 
              href="/login" 
              className="text-[#5a4a3a] hover:bg-[#e8dcc4] hover:text-[#8b7355] block px-4 py-3 rounded-md text-base font-medium transition-all duration-300"
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="bg-linear-to-r from-[#8b7355] to-[#6b5a45] text-[#faf8f3] block px-4 py-3 rounded-md text-base font-medium transition-all duration-300 text-center shadow-md"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}