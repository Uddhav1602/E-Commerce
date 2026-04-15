"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const STATUS_CONFIG: Record<string, { bg: string; text: string; dot: string }> = {
  Pending:    { bg: "bg-amber-100",  text: "text-amber-800",  dot: "bg-amber-400" },
  Processing: { bg: "bg-blue-100",   text: "text-blue-800",   dot: "bg-blue-400" },
  Shipped:    { bg: "bg-indigo-100", text: "text-indigo-800", dot: "bg-indigo-400" },
  Delivered:  { bg: "bg-green-100",  text: "text-green-800",  dot: "bg-green-400" },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (Array.isArray(data)) setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#faf8f3] to-[#f5f0e8] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#8b7355] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#8b7355] font-medium">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf8f3] to-[#f5f0e8] text-[#5a4a3a]">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-4xl font-serif font-bold">Order History</h1>
            <p className="text-[#8b7355] mt-1">
              {orders.length} order{orders.length !== 1 ? "s" : ""} placed
            </p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#8b7355] to-[#6b5a45] text-white rounded-xl text-sm font-medium shadow-md hover:from-[#6b5a45] hover:to-[#5a4a3a] transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* Orders */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-[#e8dcc4] p-16 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#f5f0e8] flex items-center justify-center">
              <svg className="w-10 h-10 text-[#c4b49a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-2xl font-serif font-bold mb-2">No Orders Yet</h2>
            <p className="text-[#8b7355] mb-6">You haven't placed any orders. Start shopping to see them here!</p>
            <Link href="/products" className="inline-block bg-gradient-to-r from-[#8b7355] to-[#6b5a45] text-white px-8 py-3 rounded-xl font-bold shadow-md hover:from-[#6b5a45] hover:to-[#5a4a3a] transition-all">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => {
              const statusCfg = STATUS_CONFIG[order.status] || { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-400" };
              const isExpanded = expandedOrder === order._id;

              return (
                <div
                  key={order._id}
                  className="bg-white rounded-2xl shadow-sm border border-[#e8dcc4] overflow-hidden hover:border-[#8b7355] transition-colors"
                >
                  {/* Order Summary Bar — always visible */}
                  <button
                    className="w-full text-left"
                    onClick={() => setExpandedOrder(isExpanded ? null : order._id)}
                  >
                    <div className="p-5 sm:p-6 flex flex-wrap gap-5 items-center justify-between">
                      {/* Left: order info */}
                      <div className="flex flex-wrap gap-6">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-[#8b7355] font-semibold mb-1">Order Placed</p>
                          <p className="font-medium text-sm">{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-widest text-[#8b7355] font-semibold mb-1">Total</p>
                          <p className="font-bold text-[#5a4a3a]">₹{order.totalAmount?.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-widest text-[#8b7355] font-semibold mb-1">Ship To</p>
                          <p className="font-medium text-sm">{order.customerName}</p>
                        </div>
                      </div>

                      {/* Right: status + expand */}
                      <div className="flex items-center gap-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${statusCfg.bg} ${statusCfg.text}`}>
                          <span className={`w-2 h-2 rounded-full ${statusCfg.dot}`} />
                          {order.status}
                        </span>
                        <svg
                          className={`w-5 h-5 text-[#8b7355] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Expand section */}
                  {isExpanded && (
                    <div className="border-t border-[#f5f0e8]">
                      {/* Shipping info */}
                      <div className="px-6 py-4 bg-[#faf8f3] border-b border-[#f5f0e8] flex flex-wrap gap-8 text-sm">
                        <div>
                          <p className="text-xs font-semibold text-[#8b7355] uppercase mb-1">Delivery Address</p>
                          <p className="text-[#5a4a3a]">{order.address}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#8b7355] uppercase mb-1">Phone</p>
                          <p className="text-[#5a4a3a]">{order.phone}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#8b7355] uppercase mb-1">Order ID</p>
                          <p className="font-mono text-xs text-[#8b7355]">{order._id}</p>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="p-6 space-y-4">
                        {order.items.map((item: any, idx: number) => (
                          <div key={idx} className="flex items-center gap-4 py-3 border-b last:border-0 border-[#f5f0e8]">
                            <div className="relative w-16 h-16 rounded-xl border border-[#e8dcc4] bg-[#f5f0e8] overflow-hidden shrink-0">
                              <Image src={item.image} alt={item.title} fill className="object-cover" sizes="64px" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-[#5a4a3a] truncate">{item.title}</p>
                              <p className="text-sm text-[#8b7355]">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="font-bold text-[#5a4a3a]">₹{(item.price * item.quantity).toLocaleString()}</p>
                              <p className="text-xs text-[#8b7355]">₹{item.price?.toLocaleString()} each</p>
                            </div>
                          </div>
                        ))}

                        {/* Order total */}
                        <div className="flex justify-between items-center pt-3 font-bold text-lg border-t-2 border-[#e8dcc4]">
                          <span>Total Paid</span>
                          <span className="text-[#8b7355]">₹{order.totalAmount?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
