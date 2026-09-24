"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const STATUS_CONFIG: Record<string, { bg: string; text: string; dot: string; icon: string }> = {
  Pending:    { bg: "bg-amber-50",   text: "text-amber-700",  dot: "bg-amber-400", icon: "🕐" },
  Processing: { bg: "bg-blue-50",    text: "text-blue-700",   dot: "bg-blue-400",  icon: "⚙️" },
  Shipped:    { bg: "bg-indigo-50",  text: "text-indigo-700", dot: "bg-indigo-400", icon: "🚚" },
  Delivered:  { bg: "bg-green-50",   text: "text-green-700",  dot: "bg-green-400", icon: "✅" },
};

type TabType = "orders" | "settings";

export default function ProfilePage() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("orders");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth");
    }
  }, [isLoading, user, router]);

  // Fetch orders
  useEffect(() => {
    if (user) {
      fetch("/api/orders")
        .then((r) => (r.ok ? r.json() : []))
        .then((data) => {
          if (Array.isArray(data)) setOrders(data);
        })
        .catch(() => setOrders([]))
        .finally(() => setOrdersLoading(false));
    }
  }, [user]);

  const handleLogout = async () => {
    if (user?.source === "nextauth") {
      await signOut({ callbackUrl: "/" });
    } else {
      await fetch("/api/user/logout");
      router.push("/");
      router.refresh();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#faf8f3] to-[#f5f0e8] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-[#8b7355] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#8b7355] font-medium text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const initials = (user.username || user.email || "U").charAt(0).toUpperCase();
  const memberSince = "Member";
  const totalSpent = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const deliveredCount = orders.filter((o) => o.status === "Delivered").length;

  const tabs: { key: TabType; label: string; icon: React.ReactNode }[] = [
    {
      key: "orders",
      label: "Order History",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      key: "settings",
      label: "Account Settings",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf8f3] to-[#f5f0e8] text-[#5a4a3a]">
      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b7355] via-[#6b5a45] to-[#5a4a3a]" />
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-24">
          <Link
            href="/home"
            className="inline-flex items-center gap-2 text-[#e8dcc4] hover:text-white transition-colors text-sm mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Store
          </Link>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">My Profile</h1>
          <p className="text-[#d4c5a9] mt-2 text-lg">Manage your account and view order history</p>
        </div>
      </div>

      {/* ── Profile Card (overlapping banner) ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-[#e8dcc4] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            {user.image ? (
              <Image
                src={user.image}
                alt="profile"
                width={88}
                height={88}
                className="rounded-full border-4 border-[#e8dcc4] shadow-lg"
              />
            ) : (
              <div className="w-22 h-22 w-[88px] h-[88px] rounded-full bg-gradient-to-br from-[#8b7355] to-[#5a4a3a] flex items-center justify-center text-white text-3xl font-bold border-4 border-[#e8dcc4] shadow-lg shrink-0">
                {initials}
              </div>
            )}

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-serif font-bold text-[#5a4a3a]">
                {user.username || user.email?.split("@")[0]}
              </h2>
              <p className="text-[#8b7355] mt-1">{user.email}</p>
              <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#f5f0e8] text-[#8b7355] border border-[#e8dcc4]">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {memberSince}
                </span>
                {user.isAdmin && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Admin
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#f5f0e8] text-[#8b7355] border border-[#e8dcc4]">
                  {user.source === "nextauth" ? "Google Account" : "Email Account"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="shrink-0 flex gap-2">
              {user.isAdmin && (
                <Link
                  href="/admin"
                  className="px-4 py-2.5 rounded-xl text-sm font-medium bg-[#f5f0e8] text-[#8b7355] hover:bg-[#e8dcc4] transition-colors border border-[#e8dcc4]"
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 rounded-xl text-sm font-medium bg-red-50 text-red-500 hover:bg-red-100 transition-colors border border-red-100"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* ── Stats Row ── */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#f5f0e8]">
            <div className="text-center p-4 rounded-xl bg-[#faf8f3] border border-[#f5f0e8]">
              <p className="text-3xl font-bold text-[#8b7355]">{orders.length}</p>
              <p className="text-xs text-[#a89d8f] mt-1 font-medium uppercase tracking-wide">Total Orders</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-[#faf8f3] border border-[#f5f0e8]">
              <p className="text-3xl font-bold text-[#8b7355]">₹{totalSpent.toLocaleString()}</p>
              <p className="text-xs text-[#a89d8f] mt-1 font-medium uppercase tracking-wide">Total Spent</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-[#faf8f3] border border-[#f5f0e8]">
              <p className="text-3xl font-bold text-[#8b7355]">{deliveredCount}</p>
              <p className="text-xs text-[#a89d8f] mt-1 font-medium uppercase tracking-wide">Delivered</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8">
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm border border-[#e8dcc4] w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-gradient-to-r from-[#8b7355] to-[#6b5a45] text-white shadow-md"
                  : "text-[#8b7355] hover:bg-[#f5f0e8]"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab Content ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-6 pb-20">
        {activeTab === "orders" && (
          <div>
            {ordersLoading ? (
              <div className="bg-white rounded-2xl shadow-sm border border-[#e8dcc4] p-16 text-center">
                <div className="w-12 h-12 mx-auto border-4 border-[#8b7355] border-t-transparent rounded-full animate-spin" />
                <p className="text-[#8b7355] mt-4 font-medium">Loading orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-[#e8dcc4] p-16 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#f5f0e8] flex items-center justify-center">
                  <svg className="w-10 h-10 text-[#c4b49a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-bold mb-2">No Orders Yet</h3>
                <p className="text-[#8b7355] mb-6 max-w-sm mx-auto">
                  Your order history will appear here once you make your first purchase.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8b7355] to-[#6b5a45] text-white px-8 py-3 rounded-xl font-bold shadow-md hover:from-[#6b5a45] hover:to-[#5a4a3a] transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const statusCfg = STATUS_CONFIG[order.status] || {
                    bg: "bg-gray-50", text: "text-gray-700", dot: "bg-gray-400", icon: "📦",
                  };
                  const isExpanded = expandedOrder === order._id;

                  return (
                    <div
                      key={order._id}
                      className="bg-white rounded-2xl shadow-sm border border-[#e8dcc4] overflow-hidden hover:border-[#c4b49a] transition-all duration-200"
                    >
                      {/* Order Summary */}
                      <button
                        className="w-full text-left"
                        onClick={() => setExpandedOrder(isExpanded ? null : order._id)}
                      >
                        <div className="p-5 sm:p-6 flex flex-wrap gap-5 items-center justify-between">
                          <div className="flex flex-wrap gap-6 items-center">
                            {/* Status Icon */}
                            <div className={`w-12 h-12 rounded-xl ${statusCfg.bg} flex items-center justify-center text-xl shrink-0`}>
                              {statusCfg.icon}
                            </div>
                            <div>
                              <p className="text-xs uppercase tracking-widest text-[#a89d8f] font-semibold mb-1">
                                Order Placed
                              </p>
                              <p className="font-medium text-sm">
                                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                  day: "numeric", month: "short", year: "numeric",
                                })}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs uppercase tracking-widest text-[#a89d8f] font-semibold mb-1">Total</p>
                              <p className="font-bold text-[#5a4a3a]">₹{order.totalAmount?.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs uppercase tracking-widest text-[#a89d8f] font-semibold mb-1">
                                Items
                              </p>
                              <p className="font-medium text-sm">{order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? "s" : ""}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${statusCfg.bg} ${statusCfg.text}`}>
                              <span className={`w-2 h-2 rounded-full ${statusCfg.dot}`} />
                              {order.status}
                            </span>
                            <svg
                              className={`w-5 h-5 text-[#a89d8f] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                              fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </button>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <div className="border-t border-[#f5f0e8] animate-in slide-in-from-top-1 duration-150">
                          {/* Shipping Info */}
                          <div className="px-6 py-4 bg-[#faf8f3] border-b border-[#f5f0e8]">
                            <div className="flex flex-wrap gap-8 text-sm">
                              <div>
                                <p className="text-xs font-semibold text-[#a89d8f] uppercase mb-1">Customer</p>
                                <p className="text-[#5a4a3a] font-medium">{order.customerName}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-[#a89d8f] uppercase mb-1">Delivery Address</p>
                                <p className="text-[#5a4a3a]">{order.address}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-[#a89d8f] uppercase mb-1">Phone</p>
                                <p className="text-[#5a4a3a]">{order.phone}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-[#a89d8f] uppercase mb-1">Order ID</p>
                                <p className="font-mono text-xs text-[#a89d8f]">{order._id}</p>
                              </div>
                            </div>
                          </div>

                          {/* Items */}
                          <div className="p-6 space-y-3">
                            {order.items.map((item: any, idx: number) => (
                              <div key={idx} className="flex items-center gap-4 py-3 border-b last:border-0 border-[#f5f0e8]">
                                <div className="relative w-16 h-16 rounded-xl border border-[#e8dcc4] bg-[#f5f0e8] overflow-hidden shrink-0">
                                  {(() => {
                                    try {
                                      const u = new URL(item.image);
                                      if (u.protocol === "http:" || u.protocol === "https:") {
                                        return <Image src={item.image} alt={item.title} fill className="object-cover" sizes="64px" />;
                                      }
                                    } catch {}
                                    return (
                                      <div className="flex items-center justify-center h-full text-[#c4b49a]">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                      </div>
                                    );
                                  })()}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-[#5a4a3a] truncate">{item.title}</p>
                                  <p className="text-sm text-[#8b7355]">Qty: {item.quantity}</p>
                                </div>
                                <div className="text-right shrink-0">
                                  <p className="font-bold text-[#5a4a3a]">₹{(item.price * item.quantity).toLocaleString()}</p>
                                  <p className="text-xs text-[#a89d8f]">₹{item.price?.toLocaleString()} each</p>
                                </div>
                              </div>
                            ))}

                            <div className="flex justify-between items-center pt-4 font-bold text-lg border-t-2 border-[#e8dcc4]">
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
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            {/* Account Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#e8dcc4] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#f5f0e8] bg-[#faf8f3]">
                <h3 className="font-serif font-bold text-lg text-[#5a4a3a]">Account Information</h3>
              </div>
              <div className="p-6 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                  <label className="text-sm font-semibold text-[#a89d8f] uppercase tracking-wide w-32 shrink-0">
                    Username
                  </label>
                  <div className="flex-1 px-4 py-3 bg-[#faf8f3] rounded-xl border border-[#f5f0e8] text-[#5a4a3a] font-medium">
                    {user.username || "—"}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                  <label className="text-sm font-semibold text-[#a89d8f] uppercase tracking-wide w-32 shrink-0">
                    Email
                  </label>
                  <div className="flex-1 px-4 py-3 bg-[#faf8f3] rounded-xl border border-[#f5f0e8] text-[#5a4a3a] font-medium">
                    {user.email || "—"}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                  <label className="text-sm font-semibold text-[#a89d8f] uppercase tracking-wide w-32 shrink-0">
                    Auth Method
                  </label>
                  <div className="flex-1 px-4 py-3 bg-[#faf8f3] rounded-xl border border-[#f5f0e8] text-[#5a4a3a] font-medium">
                    {user.source === "nextauth" ? "Google Sign-In" : "Email & Password"}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                  <label className="text-sm font-semibold text-[#a89d8f] uppercase tracking-wide w-32 shrink-0">
                    Role
                  </label>
                  <div className="flex-1 px-4 py-3 bg-[#faf8f3] rounded-xl border border-[#f5f0e8] text-[#5a4a3a] font-medium">
                    {user.isAdmin ? "Administrator" : "Customer"}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#e8dcc4] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#f5f0e8] bg-[#faf8f3]">
                <h3 className="font-serif font-bold text-lg text-[#5a4a3a]">Quick Actions</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link
                    href="/products"
                    className="flex items-center gap-3 px-5 py-4 rounded-xl border border-[#e8dcc4] hover:border-[#8b7355] hover:bg-[#faf8f3] transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#f5f0e8] flex items-center justify-center group-hover:bg-[#e8dcc4] transition-colors">
                      <svg className="w-5 h-5 text-[#8b7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-[#5a4a3a]">Browse Products</p>
                      <p className="text-xs text-[#a89d8f]">Explore our collection</p>
                    </div>
                  </Link>

                  <Link
                    href="/cart"
                    className="flex items-center gap-3 px-5 py-4 rounded-xl border border-[#e8dcc4] hover:border-[#8b7355] hover:bg-[#faf8f3] transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#f5f0e8] flex items-center justify-center group-hover:bg-[#e8dcc4] transition-colors">
                      <svg className="w-5 h-5 text-[#8b7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-[#5a4a3a]">View Cart</p>
                      <p className="text-xs text-[#a89d8f]">Check your cart items</p>
                    </div>
                  </Link>

                  <button
                    onClick={() => setActiveTab("orders")}
                    className="flex items-center gap-3 px-5 py-4 rounded-xl border border-[#e8dcc4] hover:border-[#8b7355] hover:bg-[#faf8f3] transition-all group text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#f5f0e8] flex items-center justify-center group-hover:bg-[#e8dcc4] transition-colors">
                      <svg className="w-5 h-5 text-[#8b7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-[#5a4a3a]">Order History</p>
                      <p className="text-xs text-[#a89d8f]">View all your orders</p>
                    </div>
                  </button>

                  {user.isAdmin && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-3 px-5 py-4 rounded-xl border border-amber-200 hover:border-amber-400 bg-amber-50/50 hover:bg-amber-50 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                        <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-amber-800">Admin Dashboard</p>
                        <p className="text-xs text-amber-600">Manage products & orders</p>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-red-50 bg-red-50/50">
                <h3 className="font-serif font-bold text-lg text-red-600">Danger Zone</h3>
              </div>
              <div className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-[#5a4a3a]">Sign out of your account</p>
                    <p className="text-sm text-[#a89d8f]">You will be redirected to the home page</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2.5 rounded-xl text-sm font-bold bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
