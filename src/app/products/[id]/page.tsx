"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await fetch(`/api/products/${id}`);
    const data = await res.json();
    setProduct(data);
  };

  if (!product) {
    return (
      <div className="p-10 text-center">
        Loading product...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] p-10 text-[#5a4a3a]">

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Images */}
        <div>
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="w-full h-96 object-cover rounded-xl border"
          />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-4xl font-serif font-bold mb-4">
            {product.title}
          </h1>

          <p className="text-[#8b7355] mb-4">
            {product.description}
          </p>

          <p className="text-3xl font-bold mb-4">
            ₹{product.price}
          </p>

          <p className="mb-6">
            Stock: {product.stock}
          </p>

          <button
            className="px-6 py-3 bg-[#8b7355] text-white rounded hover:bg-[#6b5a45]"
          >
            Add To Cart
          </button>
        </div>

      </div>

    </div>
  );
}