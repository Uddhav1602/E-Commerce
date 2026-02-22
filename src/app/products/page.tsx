"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/app/components/ProductCard/page";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  return (
    <div className="bg-gradient-to-b from-[#faf8f3] to-[#f5f0e8] min-h-screen text-[#5a4a3a]">

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <h1 className="text-5xl font-serif font-bold mb-3">
          Our Collection
        </h1>
        <div className="w-24 h-1 bg-[#8b7355] mb-6"></div>
        <p className="text-[#8b7355] max-w-2xl font-light">
          Thoughtfully curated tools crafted for professionals who appreciate
          timeless design and exceptional performance.
        </p>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

    </div>
  );
}