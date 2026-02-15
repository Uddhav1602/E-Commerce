import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. Import your new components

import { Toaster } from "react-hot-toast";
import Header from "./components/Header/page";
import Footer from "./components/Footer/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nerd Store | E-Commerce", // I updated this for you
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
        {/* 2. Create the Flex column wrapper so Footer pushes to bottom */}
        <div className="flex flex-col min-h-screen">
          {/* Header stays at the top */}
          <Header />
            
          {/* Main content grows to fill space */}
          <main className="grow">
            <Toaster position="top-center" />
            {children}
          </main>

          {/* Footer stays at the bottom */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
