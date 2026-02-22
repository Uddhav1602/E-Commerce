"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProductDetailsPage() {

  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await fetch(`/api/products/${id}`);
    const data = await res.json();
    setProduct(data);
  };

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  if (!product) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] p-10 text-[#5a4a3a]">

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* IMAGE CAROUSEL */}
        <div className="relative">

          <img
            src={product.images[currentImage]}
            className="w-full h-96 object-cover rounded-xl border"
            alt={product.title}
          />

          {/* LEFT BUTTON */}
          <button
            onClick={prevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 text-white w-10 h-10 rounded-full"
          >
            ‹
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 text-white w-10 h-10 rounded-full"
          >
            ›
          </button>

        </div>

        {/* PRODUCT INFO */}
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