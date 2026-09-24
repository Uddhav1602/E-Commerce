"use client";

import Link from "next/link";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";

export default function CirclePage() {
  const { user, isLoading } = useUser();
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>("yearly");
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeSubscription, setActiveSubscription] = useState<string | null>(null);

  const copyPromoCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success(`Promo code "${code}" copied to clipboard! 🎉`);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubscribe = (planId: string, planName: string, price: string) => {
    if (!user) {
      toast.error("Please sign in or create an account to activate your membership.");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setActiveSubscription(planId);
      toast.success(`Welcome to The Circle! Your ${planName} (${price}) is now active! 🎊`, {
        duration: 5000,
      });
    }, 1200);
  };

  const perks = [
    {
      icon: "🎟️",
      title: "Exclusive Member Discounts",
      desc: "Save up to 15% on every purchase across custom keyboards, keycaps, and premium desk gear.",
      tag: "All Plans",
    },
    {
      icon: "⚡",
      title: "Priority Drop Access",
      desc: "Get 24 to 48 hours early access to limited-edition drops and artisanal accessories before public release.",
      tag: "Early Access",
    },
    {
      icon: "🚚",
      title: "Free Express Shipping",
      desc: "Enjoy zero shipping charges with priority tracked express delivery on all your orders.",
      tag: "Priority Dispatch",
    },
    {
      icon: "🎁",
      title: "Annual Gift & Swag",
      desc: "Receive collectible artisan keycaps, premium desk mats, and surprise merchandise gifts.",
      tag: "Member Gift",
    },
  ];

  const plans = [
    {
      id: "monthly",
      name: "1 Month Pass",
      duration: "1 Month",
      price: "₹199",
      period: "/ month",
      savings: null,
      badge: "Flexible Starter",
      popular: false,
      accent: "border-[#d4c5a9] bg-white",
      badgeColor: "bg-[#f5f0e8] text-[#8b7355]",
      btnColor: "bg-[#8b7355] text-white hover:bg-[#6b5a45]",
      discountCode: "NERDCIRCLE10",
      features: [
        "10% Member discount on all products",
        "24-hour early access to product drops",
        "Free express shipping on orders over ₹499",
        "Digital membership badge on profile",
        "Cancel or renew anytime",
      ],
    },
    {
      id: "quarterly",
      name: "3 Months Builder",
      duration: "3 Months",
      price: "₹499",
      period: "/ 3 months",
      savings: "Save 16%",
      badge: "Most Popular",
      popular: true,
      accent: "border-[#8b7355] bg-gradient-to-b from-[#faf8f3] to-[#f5f0e8] ring-2 ring-[#8b7355]/40 shadow-xl",
      badgeColor: "bg-gradient-to-r from-[#8b7355] to-[#6b5a45] text-white shadow-sm",
      btnColor: "bg-gradient-to-r from-[#8b7355] to-[#6b5a45] text-white hover:from-[#6b5a45] hover:to-[#5a4a3a]",
      discountCode: "NERDCIRCLE12",
      features: [
        "12% Recurring discount on all products",
        "24-hour priority access to limited drops",
        "100% Free Express Shipping (no minimum)",
        "Seasonal artisan sticker & keychain pack",
        "Priority customer support resolution",
      ],
    },
    {
      id: "yearly",
      name: "1 Year VIP Circle",
      duration: "12 Months",
      price: "₹1,499",
      period: "/ year",
      savings: "Best Value · Save 37%",
      badge: "VIP Choice",
      popular: false,
      accent: "border-[#5a4a3a] bg-gradient-to-b from-[#f5f0e8] to-[#e8dcc4] shadow-2xl ring-2 ring-[#5a4a3a]/30",
      badgeColor: "bg-[#5a4a3a] text-white shadow-sm",
      btnColor: "bg-gradient-to-r from-[#5a4a3a] to-[#3a2f24] text-white hover:from-[#3a2f24] hover:to-[#2a2016]",
      discountCode: "NERDCIRCLE15",
      features: [
        "15% Exclusive VIP discount on everything",
        "48-hour ultra-early drop reservation",
        "Unlimited Free Express Priority Shipping",
        "Complimentary leather desk mat or artisan keycap",
        "VIP concierge & setup curation support",
      ],
    },
  ];

  const faqs = [
    {
      q: "How does the membership discount work?",
      a: "As an active member, you receive a dedicated promo code corresponding to your plan (up to 15% off) that you can apply at checkout on any purchase.",
    },
    {
      q: "Can I choose between 1 Month, 3 Months, and 1 Year?",
      a: "Yes! The 1 Month pass is ₹199, 3 Months is ₹499 (Save 16%), and the 1 Year VIP pass is ₹1,499 (Save 37% with maximum benefits and complimentary merchandise).",
    },
    {
      q: "Does early drop access apply to limited keyboards and keycaps?",
      a: "Absolutely. When limited-edition mechanical keyboards or custom artisan keycaps launch, active Circle members receive private early access 24 to 48 hours before public release.",
    },
    {
      q: "How do I manage or renew my membership?",
      a: "You can view your active membership status, perks, and promo codes directly on your Profile page at any time.",
    },
  ];

  return (
    <div className="bg-[#faf8f3] text-[#5a4a3a] min-h-screen">
      {/* ── HERO BANNER ── */}
      <section className="relative bg-gradient-to-br from-[#8b7355] via-[#6b5a45] to-[#5a4a3a] text-[#faf8f3] py-24 sm:py-32 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#faf8f3]/15 text-[#e8dcc4] border border-[#faf8f3]/25 backdrop-blur-md mb-6 uppercase tracking-widest">
            ✨ Exclusive Membership
          </span>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight mb-6">
            Join The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4c5a9] via-[#f5f0e8] to-[#e8dcc4]">
              Circle
            </span>
          </h1>

          <p className="text-lg sm:text-2xl text-[#e8dcc4] mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            An exclusive membership for our valued users — unlocking special discounts, priority drops, free express shipping, and tier-based rewards with every purchase.
          </p>

          {/* Member Status / Quick Action Box */}
          <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
            {isLoading ? (
              <div className="flex items-center justify-center py-4 gap-3">
                <div className="w-6 h-6 border-2 border-[#d4c5a9] border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-[#e8dcc4]">Checking membership status...</span>
              </div>
            ) : user ? (
              <div>
                <div className="flex items-center justify-center gap-2 text-sm font-semibold text-emerald-300 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  {activeSubscription ? "Active Circle Member" : "Logged in as " + (user.username || user.email?.split("@")[0])}
                </div>
                <p className="text-lg font-serif font-bold text-white mb-4">
                  {activeSubscription ? "Membership Activated 🎉" : "Choose your membership plan below to unlock VIP perks"}
                </p>

                <div className="bg-[#faf8f3] text-[#5a4a3a] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
                  <div className="text-left">
                    <p className="text-xs text-[#8b7355] font-semibold uppercase tracking-wider">Active Member Voucher</p>
                    <p className="font-mono font-bold text-xl text-[#5a4a3a]">
                      {activeSubscription === "yearly"
                        ? "NERDCIRCLE15 (15% OFF)"
                        : activeSubscription === "quarterly"
                        ? "NERDCIRCLE12 (12% OFF)"
                        : "NERDCIRCLE10 (10% OFF)"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        copyPromoCode(
                          activeSubscription === "yearly"
                            ? "NERDCIRCLE15"
                            : activeSubscription === "quarterly"
                            ? "NERDCIRCLE12"
                            : "NERDCIRCLE10"
                        )
                      }
                      className="px-4 py-2 bg-[#8b7355] hover:bg-[#6b5a45] text-white text-xs font-bold rounded-lg transition-all shadow"
                    >
                      {copied ? "Copied! ✓" : "Copy Code"}
                    </button>
                    <Link
                      href="/products"
                      className="px-4 py-2 bg-gradient-to-r from-[#5a4a3a] to-[#3a2f24] hover:bg-[#3a2f24] text-white text-xs font-bold rounded-lg transition-all shadow"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm text-[#e8dcc4] mb-4 font-light">
                  Sign in or create an account to choose your membership plan and claim exclusive member perks.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <Link
                    href="/auth"
                    className="bg-gradient-to-r from-[#d4c5a9] to-[#b8a788] hover:from-[#b8a788] hover:to-[#a89d8f] text-[#5a4a3a] font-bold py-3 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95 text-sm"
                  >
                    Sign In to Join
                  </Link>
                  <a
                    href="#plans"
                    className="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-xl border border-white/30 transition-all text-sm"
                  >
                    View Membership Plans ↓
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#d4c5a9] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#b8a788] rounded-full blur-3xl" />
        </div>
      </section>

      {/* ── PERKS GRID ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8b7355] mb-2 block">
            Membership Privileges
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5a4a3a] mb-3">
            Why It Pays to Be in The Circle
          </h2>
          <div className="w-24 h-1 bg-[#8b7355] mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((p, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl border-2 border-[#e8dcc4] hover:border-[#8b7355] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#faf8f3] border border-[#e8dcc4] flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-sm">
                    {p.icon}
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#f5f0e8] text-[#8b7355] border border-[#e8dcc4]">
                    {p.tag}
                  </span>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#5a4a3a] mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-[#8b7355] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MEMBERSHIP PLANS (1 Month, 3 Months, 1 Year) ── */}
      <section id="plans" className="py-20 bg-gradient-to-b from-[#f5f0e8] to-[#e8dcc4] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8b7355] mb-2 block">
              Membership Plans
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5a4a3a] mb-3">
              Select Your Membership
            </h2>
            <p className="text-[#8b7355] max-w-xl mx-auto text-sm">
              Unlock instant discounts, priority express shipping, and exclusive drop access today.
            </p>
            <div className="w-24 h-1 bg-[#8b7355] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              const isCurrentActive = activeSubscription === plan.id;

              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`rounded-2xl p-8 border-2 flex flex-col justify-between transition-all duration-300 cursor-pointer relative ${
                    plan.accent
                  } ${isSelected ? "scale-[1.02] shadow-2xl" : "hover:scale-[1.01]"}`}
                >
                  {/* Top Badge */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full inline-block mb-2 ${plan.badgeColor}`}>
                        {plan.badge}
                      </span>
                      <h3 className="text-2xl font-serif font-bold text-[#5a4a3a]">{plan.name}</h3>
                    </div>

                    {plan.savings && (
                      <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-300">
                        {plan.savings}
                      </span>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-serif font-bold text-[#5a4a3a]">{plan.price}</span>
                      <span className="text-[#8b7355] text-sm font-medium">{plan.period}</span>
                    </div>
                    <p className="text-xs text-[#8b7355] mt-1 font-medium">
                      Includes code: <span className="font-mono font-bold text-[#5a4a3a]">{plan.discountCode}</span>
                    </p>
                  </div>

                  <div className="w-full h-px bg-[#e8dcc4] mb-6" />

                  {/* Feature Checklist */}
                  <ul className="space-y-3.5 mb-8 flex-1">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm text-[#5a4a3a]">
                        <svg className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Button */}
                  <div>
                    {user ? (
                      <button
                        disabled={isProcessing}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSubscribe(plan.id, plan.name, plan.price);
                        }}
                        className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 shadow-md transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 ${
                          isCurrentActive
                            ? "bg-emerald-600 text-white shadow-emerald-200"
                            : plan.btnColor
                        }`}
                      >
                        {isProcessing && selectedPlan === plan.id ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Activating...
                          </span>
                        ) : isCurrentActive ? (
                          "✓ Current Active Plan"
                        ) : (
                          `Activate ${plan.name} (${plan.price})`
                        )}
                      </button>
                    ) : (
                      <Link
                        href="/auth"
                        className={`w-full block text-center py-4 rounded-xl font-bold text-sm transition-all duration-300 shadow-md transform hover:scale-[1.02] active:scale-[0.98] ${plan.btnColor}`}
                      >
                        Sign In to Join ({plan.price})
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-[#5a4a3a] mb-2">Frequently Asked Questions</h2>
          <div className="w-20 h-1 bg-[#8b7355] mx-auto" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border-2 border-[#e8dcc4] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 hover:bg-[#faf8f3] transition-colors"
                >
                  <span className="font-serif font-bold text-lg text-[#5a4a3a]">{faq.q}</span>
                  <span className={`text-2xl text-[#8b7355] transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-[#8b7355] leading-relaxed border-t border-[#f5f0e8] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FINAL CTA BANNER ── */}
      <section className="py-20 bg-gradient-to-br from-[#8b7355] via-[#6b5a45] to-[#5a4a3a] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-5xl font-serif font-bold mb-4">
            Ready to Upgrade Your Workspace?
          </h2>
          <p className="text-[#e8dcc4] max-w-xl mx-auto mb-8 text-base sm:text-lg font-light">
            Choose your membership plan today and join thousands of developers crafting their dream setup.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="#plans"
              className="bg-gradient-to-r from-[#d4c5a9] to-[#b8a788] hover:from-[#b8a788] hover:to-[#a89d8f] text-[#5a4a3a] font-bold py-4 px-10 rounded-xl shadow-xl transition-all transform hover:scale-105 active:scale-95"
            >
              Choose a Membership Plan
            </a>
            <Link
              href="/products"
              className="bg-transparent hover:bg-white/10 text-white font-bold py-4 px-10 rounded-xl border-2 border-white transition-all hover:scale-105 active:scale-95"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
