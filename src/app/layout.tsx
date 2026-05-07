import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ✅ ADD THIS
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nerd Store | E-Commerce",
  description: "The best gear for developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ Wrap everything with Providers */}
        <Providers>
          <div className="flex flex-col min-h-screen">
            
            {/* Header */}
            <Header />

            {/* Main content */}
            <main className="grow">

              {children}
            </main>

            {/* Footer */}
            <Footer />

          </div>
        </Providers>
      </body>
    </html>
  );
}