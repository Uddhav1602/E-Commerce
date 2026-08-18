"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) {
        setProducts([]);
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = products.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-b from-[#faf8f3] to-[#f5f0e8] min-h-screen text-[#5a4a3a]">
      {/* ── HEADER ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-10">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-3">Our Collection</h1>
        <div className="w-24 h-1 bg-[#8b7355] mb-5" />
        <p className="text-[#8b7355] max-w-2xl font-light text-lg">
          Thoughtfully curated tools crafted for professionals who appreciate timeless design and exceptional performance.
        </p>

        {/* Search bar */}
        <div className="mt-8 max-w-md relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a89d8f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#e8dcc4] bg-white focus:outline-none focus:border-[#8b7355] text-sm transition-colors shadow-sm"
          />
        </div>
      </div>

      {/* ── PRODUCTS GRID ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-4 border-[#8b7355] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#8b7355]">Loading products...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <p className="text-2xl font-serif text-[#8b7355]">
              {search ? `No products found for "${search}"` : "No products available yet."}
            </p>
            {search && (
              <button onClick={() => setSearch("")} className="text-[#8b7355] underline text-sm">
                Clear search
              </button>
            )}
          </div>
        ) : (
          <>
            <p className="text-sm text-[#8b7355] mb-6">{filtered.length} product{filtered.length !== 1 ? "s" : ""} found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product: any) => (
                <Link key={product._id} href={`/products/${product._id}`} className="block">
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}