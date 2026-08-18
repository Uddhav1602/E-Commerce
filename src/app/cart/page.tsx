"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, cartTotal, clearCart } = useCart();
  const router = useRouter();

  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return toast.error("Your cart is empty");

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          address,
          phone,
          items: cart,
          totalAmount: cartTotal,
        }),
      });

      if (res.ok) {
        toast.success("🎉 Order placed successfully!");
        clearCart();
        router.push("/orders");
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed to place order");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#faf8f3] to-[#f5f0e8] text-[#5a4a3a] flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-[#f5f0e8] border-2 border-[#e8dcc4] flex items-center justify-center">
            <svg className="w-14 h-14 text-[#c4b49a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-serif font-bold mb-3">Your Cart is Empty</h1>
          <p className="mb-8 text-[#8b7355]">Looks like you haven't added anything yet. Browse our collection to find something you love!</p>
          <Link
            href="/products"
            className="inline-block bg-gradient-to-r from-[#8b7355] to-[#6b5a45] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:from-[#6b5a45] hover:to-[#5a4a3a] transition-all transform hover:scale-105"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf8f3] to-[#f5f0e8] text-[#5a4a3a]">
      {/* Page Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-6">
        <h1 className="text-4xl font-serif font-bold">Your Cart</h1>
        <p className="text-[#8b7355] mt-1">{cart.reduce((t, i) => t + i.quantity, 0)} item(s)</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── CART ITEMS ── */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.productId}
              className="flex bg-white rounded-2xl shadow-sm border border-[#e8dcc4] items-center gap-4 p-4 sm:p-5 hover:border-[#8b7355] transition-colors"
            >
              {/* Thumbnail */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-xl overflow-hidden border border-[#e8dcc4] bg-[#f5f0e8]">
                {(() => {
                  try {
                    const u = new URL(item.image);
                    if (u.protocol === "http:" || u.protocol === "https:") {
                      return <Image src={item.image} alt={item.title} fill className="object-cover" sizes="96px" />;
                    }
                  } catch {}
                  return (
                    <div className="flex items-center justify-center h-full text-[#c4b49a]">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  );
                })()}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-serif font-bold text-[#5a4a3a] text-base sm:text-lg truncate">{item.title}</h3>
                <p className="text-sm text-[#8b7355] mt-0.5">₹{item.price.toLocaleString()} each</p>
                <p className="text-xs mt-1 text-gray-400">Qty: {item.quantity}</p>
              </div>

              {/* Subtotal + Remove */}
              <div className="text-right flex flex-col items-end gap-2 shrink-0">
                <p className="font-bold text-[#5a4a3a] text-lg">₹{(item.price * item.quantity).toLocaleString()}</p>
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-red-400 hover:text-red-600 text-sm font-medium transition-colors flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a1 1 0 011-1h6a1 1 0 011 1v2" />
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Continue Shopping */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[#8b7355] hover:text-[#5a4a3a] font-medium transition-colors mt-2"
          >
            ← Continue Shopping
          </Link>
        </div>

        {/* ── ORDER SUMMARY + CHECKOUT FORM ── */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-md border border-[#d4c5a9] p-6 sm:p-8 sticky top-24">
            <h2 className="text-2xl font-serif font-bold text-[#5a4a3a] mb-5 pb-4 border-b border-[#e8dcc4]">
              Order Summary
            </h2>

            {/* Price breakdown */}
            <div className="space-y-3 mb-5">
              {cart.map((item) => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <span className="text-[#8b7355] truncate max-w-[60%]">{item.title} × {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center font-bold text-xl py-4 border-t border-[#e8dcc4] mb-6">
              <span>Total</span>
              <span className="text-[#8b7355]">₹{cartTotal.toLocaleString()}</span>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleCheckout} className="space-y-4">
              <p className="text-sm font-semibold text-[#5a4a3a] uppercase tracking-wide">Delivery Details</p>

              <div>
                <label className="block text-xs font-medium text-[#8b7355] mb-1">Full Name *</label>
                <input
                  required
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full border-2 border-[#e8dcc4] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#8b7355] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#8b7355] mb-1">Delivery Address *</label>
                <textarea
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Main St, City, State"
                  rows={3}
                  className="w-full border-2 border-[#e8dcc4] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#8b7355] transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#8b7355] mb-1">Phone Number *</label>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full border-2 border-[#e8dcc4] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#8b7355] transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 bg-gradient-to-r from-[#8b7355] to-[#6b5a45] hover:from-[#6b5a45] hover:to-[#5a4a3a] text-white py-4 rounded-xl font-bold shadow-lg disabled:opacity-50 transition-all transform hover:scale-105 active:scale-95 disabled:transform-none flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Place Order
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
