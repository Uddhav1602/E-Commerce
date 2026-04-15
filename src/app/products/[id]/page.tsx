"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () =>
    setCurrentImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  const prevImage = () =>
    setCurrentImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f3] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#8b7355] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#8b7355] font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product || product.message) {
    return (
      <div className="min-h-screen bg-[#faf8f3] flex flex-col items-center justify-center gap-4">
        <p className="text-2xl font-serif text-[#5a4a3a]">Product not found</p>
        <Link href="/products" className="text-[#8b7355] hover:underline">← Back to Products</Link>
      </div>
    );
  }

  // Strictly validate — only allow absolute http(s) URLs to prevent next/image crashes
  const isValidUrl = (s: string) => {
    try {
      const u = new URL(s);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch { return false; }
  };
  const validImages: string[] = (product.images ?? []).filter(isValidUrl);
  const isInStock = product.stock > 0;


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf8f3] to-[#f5f0e8] text-[#5a4a3a]">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <nav className="flex items-center gap-2 text-sm text-[#8b7355]">
          <Link href="/" className="hover:text-[#5a4a3a] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#5a4a3a] transition-colors">Products</Link>
          <span>/</span>
          <span className="text-[#5a4a3a] font-medium truncate max-w-[150px]">{product.title}</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── IMAGE GALLERY ── */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-[#e8dcc4] shadow-xl bg-[#f5f0e8]">
              {validImages.length > 0 ? (
                <Image
                  key={currentImage}
                  src={validImages[currentImage] ?? validImages[0]}
                  alt={product.title}
                  fill
                  className="object-cover transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-[#c4b49a]">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="font-serif text-lg">No Image Available</p>
                </div>
              )}

              {/* Nav arrows — only show if multiple images */}
              {validImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm text-[#5a4a3a] w-10 h-10 rounded-full shadow-md flex items-center justify-center hover:bg-white transition-all text-xl"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm text-[#5a4a3a] w-10 h-10 rounded-full shadow-md flex items-center justify-center hover:bg-white transition-all text-xl"
                  >
                    ›
                  </button>
                </>
              )}

              {/* Stock badge */}
              {!isInStock && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Out of Stock
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {validImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {validImages.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`relative shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      currentImage === idx
                        ? "border-[#8b7355] shadow-md scale-105"
                        : "border-[#e8dcc4] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`${product.title} ${idx + 1}`} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── PRODUCT INFO ── */}
          <div className="space-y-6 lg:pt-4">
            {/* Title & Price */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#5a4a3a] mb-3 leading-tight">
                {product.title}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-4xl font-serif font-bold text-[#8b7355]">₹{product.price.toLocaleString()}</span>
                <div className="flex text-[#d4c5a9]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#e8dcc4]" />

            {/* Description */}
            {product.description && (
              <p className="text-[#8b7355] leading-relaxed text-base">{product.description}</p>
            )}

            {/* Stock status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isInStock ? "bg-green-500" : "bg-red-400"}`} />
              <p className="text-sm font-medium">
                {isInStock ? (
                  <span className="text-green-700">{product.stock} in Stock</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </p>
            </div>

            {/* Quantity Selector */}
            {isInStock && (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-[#8b7355]">Quantity:</span>
                <div className="flex items-center border-2 border-[#d4c5a9] rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-xl font-bold hover:bg-[#f5f0e8] transition-colors text-[#5a4a3a]"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-semibold text-[#5a4a3a]">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="w-10 h-10 flex items-center justify-center text-xl font-bold hover:bg-[#f5f0e8] transition-colors text-[#5a4a3a]"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                disabled={!isInStock}
                onClick={() => addToCart(product, quantity)}
                className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#8b7355] to-[#6b5a45] text-white rounded-xl font-bold shadow-lg hover:from-[#6b5a45] hover:to-[#5a4a3a] hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                {isInStock ? "Add to Cart" : "Out of Stock"}
              </button>

              <Link
                href="/cart"
                className="flex-1 flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#8b7355] text-[#8b7355] rounded-xl font-bold hover:bg-[#8b7355] hover:text-white transition-all duration-300"
              >
                View Cart
              </Link>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: "🚚", text: "Free Shipping" },
                { icon: "🔒", text: "Secure Payment" },
                { icon: "↩️", text: "Easy Returns" },
              ].map((b) => (
                <div key={b.text} className="flex flex-col items-center gap-1 bg-white rounded-xl p-3 border border-[#e8dcc4] text-center">
                  <span className="text-xl">{b.icon}</span>
                  <span className="text-xs text-[#8b7355] font-medium">{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
