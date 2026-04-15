"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

type Props = {
  product: any;
  index?: number;
};

export default function ProductCard({ product, index = 0 }: Props) {
  const { addToCart } = useCart();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Strictly validate — only allow absolute http(s) URLs to prevent next/image crashes
  const isValidUrl = (s: string) => {
    try {
      const u = new URL(s);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  };
  const validImages: string[] = (product.images ?? []).filter(isValidUrl);

  const isInStock = product.stock > 0;


  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isInStock || isAdding) return;
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 800);
  };

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group border border-[#e8dcc4] hover:border-[#8b7355] hover:-translate-y-2 flex flex-col"
      style={{
        animationDelay: `${index * 80}ms`,
        animation: "fadeSlideUp 0.5s ease both",
      }}
    >
      {/* ── IMAGE AREA ── */}
      <div className="relative h-64 bg-gradient-to-br from-[#f5f0e8] to-[#e8dcc4] overflow-hidden">

        {/* Skeleton shimmer while loading */}
        {!imgLoaded && validImages.length > 0 && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#f5f0e8] via-[#ede8df] to-[#f5f0e8] animate-shimmer bg-[length:200%_100%]" />
        )}

        {validImages.length > 0 ? (
          <Image
            src={validImages[0]}
            alt={product.title}
            fill
            className={`object-cover transition-all duration-700 group-hover:scale-110 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onLoad={() => setImgLoaded(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-[#c4b49a]">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs font-medium">No Image</span>
          </div>
        )}

        {/* Gradient overlay on hover to improve readability of buttons */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Stock Badge */}
        {!isInStock && (
          <div className="absolute top-3 left-3 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            Out of Stock
          </div>
        )}

        {/* Multiple images indicator */}
        {validImages.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
            +{validImages.length - 1} photos
          </div>
        )}

        {/* Quick Add Button */}
        {isInStock && (
          <button
            onClick={handleAddToCart}
            className={`absolute bottom-3 right-3 h-11 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center overflow-hidden
              ${isAdding
                ? "w-11 bg-green-500 scale-110"
                : "w-11 bg-gradient-to-br from-[#8b7355] to-[#6b5a45] opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
              }`}
            title="Quick add to cart"
          >
            {isAdding ? (
              <svg className="w-5 h-5 text-white animate-[pop_0.3s_ease]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* ── CONTENT ── */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif font-bold text-lg text-[#5a4a3a] mb-1 line-clamp-2 leading-snug group-hover:text-[#8b7355] transition-colors duration-200">
          {product.title}
        </h3>

        {product.description && (
          <p className="text-xs text-[#a89d8f] mb-3 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#f5f0e8]">
          <div>
            <span className="font-serif font-bold text-xl text-[#8b7355]">
              ₹{product.price?.toLocaleString()}
            </span>
            {product.stock > 0 && product.stock <= 10 && (
              <p className="text-xs text-orange-500 font-medium mt-0.5">Only {product.stock} left!</p>
            )}
          </div>

          <div className="flex text-[#d4c5a9]">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
