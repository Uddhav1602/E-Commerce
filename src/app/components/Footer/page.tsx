import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-auto border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">NERD_STORE<span className="text-blue-500">.io</span></h2>
            <p className="text-sm text-gray-400 mb-4">
              Equipping developers with the best hardware, peripherals, and software tools since 2026.
              Built by nerds, for nerds.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-blue-400 transition">Laptops</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">Keyboards</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">Monitors</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">Accessories</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider">Support</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-blue-400 transition">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">FAQs</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">Shipping & Returns</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">Terms of Service</Link></li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Nerd Store Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}