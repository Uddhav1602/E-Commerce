"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => {
        if (!r.ok) throw new Error("API error");
        return r.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setFeaturedProducts(data.slice(0, 4));
      })
      .catch(() => {})
      .finally(() => setLoadingProducts(false));
  }, []);

  return (
    <div className="bg-[#faf8f3] text-[#5a4a3a]">

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-[#8b7355] via-[#6b5a45] to-[#5a4a3a] text-[#faf8f3] py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6">
            Elevate Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4c5a9] to-[#e8dcc4]">
              Workspace
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-[#e8dcc4] mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Curated mechanical keyboards, premium monitors, and refined gear crafted for the discerning developer.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/products"
              className="bg-gradient-to-r from-[#d4c5a9] to-[#b8a788] hover:from-[#b8a788] hover:to-[#a89d8f] text-[#5a4a3a] font-bold py-4 px-10 rounded-lg shadow-xl transition-all transform hover:scale-105 active:scale-95"
            >
              Explore Collection
            </Link>
            <Link
              href="/auth"
              className="bg-transparent hover:bg-[#faf8f3]/10 text-[#faf8f3] font-bold py-4 px-10 rounded-lg shadow-lg border-2 border-[#faf8f3] transition-all hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              Join Our Circle
            </Link>
          </div>
        </div>
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#d4c5a9] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#b8a788] rounded-full blur-3xl" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4c5a9] to-transparent" />
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 bg-gradient-to-b from-[#faf8f3] to-[#f5f0e8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-[#5a4a3a] mb-3">Why Distinguished Developers Choose Us</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#8b7355] to-transparent mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🚀", title: "Exceptional Performance", desc: "Equipment meticulously tested for optimal efficiency in compiling and seamless typing experiences." },
              { icon: "🛡️", title: "Built to Endure", desc: "Engineered to withstand intensive use and crafted with materials of the finest quality." },
              { icon: "🤖", title: "Intelligent Curation", desc: "Personalized recommendations tailored to your technology stack and professional requirements." },
            ].map((f) => (
              <div key={f.title} className="group p-10 bg-white border-2 border-[#e8dcc4] rounded-xl shadow-sm hover:shadow-xl hover:border-[#8b7355] transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-[#d4c5a9] to-[#b8a788] flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform duration-300">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold mb-3 text-[#5a4a3a]">{f.title}</h3>
                <p className="text-[#8b7355] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS (live from DB) ── */}
      <section className="py-20 bg-gradient-to-b from-[#f5f0e8] to-[#e8dcc4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-serif font-bold text-[#5a4a3a] mb-2">Featured This Season</h2>
              <div className="w-24 h-1 bg-[#8b7355]" />
            </div>
            <Link href="/products" className="hidden md:flex items-center gap-1 text-[#8b7355] font-medium hover:text-[#6b5a45] transition-colors duration-300 group">
              View Complete Collection
              <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {loadingProducts ? (
            /* Skeleton grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-[#e8dcc4] shadow-md" style={{ animationDelay: `${i * 80}ms`, animation: "fadeSlideUp 0.5s ease both" }}>
                  <div className="h-64 bg-gradient-to-r from-[#f5f0e8] via-[#ede8df] to-[#f5f0e8] animate-shimmer bg-[length:200%_100%]" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 rounded-lg bg-[#f0ebe2] animate-shimmer bg-[length:200%_100%]" />
                    <div className="h-4 w-2/3 rounded-lg bg-[#f0ebe2] animate-shimmer bg-[length:200%_100%]" />
                    <div className="h-6 w-1/3 rounded-lg bg-[#f0ebe2] animate-shimmer bg-[length:200%_100%]" />
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <Link key={product._id} href={`/products/${product._id}`} className="block">
                  <ProductCard product={product} index={index} />
                </Link>
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="bg-white rounded-2xl p-16 text-center border border-[#e8dcc4]">
              <p className="text-xl text-[#8b7355] mb-4">No products available yet.</p>
              <Link href="/admin" className="inline-block bg-[#8b7355] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#6b5a45] transition-colors">
                Add Products via Admin →
              </Link>
            </div>
          )}

          <div className="text-center mt-12 md:hidden">
            <Link href="/products" className="inline-block text-[#8b7355] font-semibold hover:text-[#6b5a45] transition-colors group">
              View Complete Collection <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRUST / STATS ── */}
      <section className="py-20 bg-gradient-to-br from-[#8b7355] to-[#6b5a45] text-[#faf8f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-3">Trusted by Professionals</h2>
            <div className="w-32 h-1 bg-[#d4c5a9] mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { stat: "50K+", label: "Satisfied Developers" },
              { stat: "98%",  label: "Customer Satisfaction" },
              { stat: "24/7", label: "Premium Support" },
            ].map((item) => (
              <div key={item.label} className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-[#faf8f3]/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-5xl font-serif font-bold mb-2 text-[#d4c5a9]">{item.stat}</div>
                <div className="text-lg text-[#e8dcc4] font-light">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-20 bg-[#faf8f3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-[#5a4a3a] mb-4">Stay Informed</h2>
          <p className="text-[#8b7355] mb-8 text-lg font-light">
            Subscribe to receive exclusive updates on new arrivals and special offerings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 border-2 border-[#d4c5a9] rounded-lg bg-white focus:outline-none focus:border-[#8b7355] focus:ring-2 focus:ring-[#8b7355]/20 text-[#5a4a3a] placeholder-[#a89d8f] transition-all"
            />
            <button className="bg-gradient-to-r from-[#8b7355] to-[#6b5a45] hover:from-[#6b5a45] hover:to-[#5a4a3a] text-[#faf8f3] font-medium px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}