"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

const inputClass =
  "w-full px-4 py-3 border-2 border-[#e8dcc4] rounded-xl text-sm text-[#5a4a3a] placeholder-[#a89d8f] focus:outline-none focus:border-[#8b7355] focus:ring-2 focus:ring-[#8b7355]/20 transition-all bg-[#faf8f3]";

export default function AdminPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    images: "",
    category: "",
    stock: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    // Live image preview on URL change
    if (e.target.name === "images") {
      setPreview(
        e.target.value
          .split(/\r?\n/)
          .map((s) => s.trim())
          .filter(Boolean)
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const imageArray = form.images.split(/\r?\n/).map((img) => img.trim()).filter(Boolean);

    if (imageArray.length === 0) {
      return toast.error("Please add at least one image URL.");
    }
    if (imageArray.length > 4) {
      return toast.error("You can only add up to 4 images.");
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          price: Number(form.price),
          images: imageArray,
          category: form.category,
          stock: Number(form.stock),
        }),
      });

      if (res.ok) {
        toast.success("Product added successfully! 🎉");
        setForm({ title: "", description: "", price: "", images: "", category: "", stock: "" });
        setPreview([]);
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to add product");
      }
    } catch (e) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f3] to-[#f5f0e8] text-[#5a4a3a] p-6 lg:p-12">
      <div className="max-w-5xl mx-auto">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-serif font-bold">Admin Dashboard</h1>
            <p className="text-[#8b7355] mt-1">Manage your store products</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/products"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border-2 border-[#8b7355] text-[#8b7355] hover:bg-[#8b7355] hover:text-white transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Manage Products
            </Link>
            <Link
              href="/orders"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-[#8b7355] to-[#6b5a45] text-white hover:from-[#6b5a45] hover:to-[#5a4a3a] transition-all shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              View Orders
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── ADD PRODUCT FORM ── */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-md border border-[#e8dcc4] p-8">
              <h2 className="text-2xl font-serif font-bold mb-6 pb-4 border-b border-[#f5f0e8]">
                Add New Product
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-[#8b7355] uppercase tracking-wide mb-1.5">Product Title *</label>
                  <input name="title" required value={form.title} onChange={handleChange} placeholder="e.g. Keychron K2 Mechanical Keyboard" className={inputClass} />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#8b7355] uppercase tracking-wide mb-1.5">Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe the product..."
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#8b7355] uppercase tracking-wide mb-1.5">Price (₹) *</label>
                    <input name="price" required type="number" min="0" value={form.price} onChange={handleChange} placeholder="e.g. 4999" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#8b7355] uppercase tracking-wide mb-1.5">Stock *</label>
                    <input name="stock" required type="number" min="0" value={form.stock} onChange={handleChange} placeholder="e.g. 50" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#8b7355] uppercase tracking-wide mb-1.5">Category</label>
                  <input name="category" value={form.category} onChange={handleChange} placeholder="e.g. Keyboards, Monitors, Accessories" className={inputClass} />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#8b7355] uppercase tracking-wide mb-1.5">Image URLs <span className="normal-case font-normal text-[#a89d8f]">(one per line, up to 4) *</span></label>
                  <textarea
                    name="images"
                    required
                    value={form.images}
                    onChange={handleChange}
                    placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                    rows={4}
                    className={`${inputClass} resize-none font-mono text-xs whitespace-pre`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-[#8b7355] to-[#6b5a45] hover:from-[#6b5a45] hover:to-[#5a4a3a] text-white rounded-xl font-bold shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Adding Product...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Product
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* ── IMAGE PREVIEW PANEL ── */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-md border border-[#e8dcc4] p-6">
              <h3 className="font-serif font-bold text-lg mb-4 pb-3 border-b border-[#f5f0e8]">Image Preview</h3>
              {preview.length === 0 ? (
                <div className="aspect-square rounded-xl bg-[#f5f0e8] border-2 border-dashed border-[#d4c5a9] flex flex-col items-center justify-center gap-3 text-[#a89d8f]">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-center px-4">Enter image URLs above to see a live preview</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {preview.slice(0, 4).map((url, idx) => (
                    <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-[#e8dcc4] bg-[#f5f0e8]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%23a89d8f' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'/%3E%3C/svg%3E"; }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-md border border-[#e8dcc4] p-6">
              <h3 className="font-serif font-bold text-lg mb-4 pb-3 border-b border-[#f5f0e8]">Quick Tips</h3>
              <ul className="space-y-3 text-sm text-[#8b7355]">
                {[
                  "Add up to 4 image URLs, placing each on a new line",
                  "Images must be public HTTPS URLs",
                  "Stock of 0 marks product as 'Out of Stock'",
                  "Use the Manage Products page to edit or delete",
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#f5f0e8] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-[#8b7355]">{i + 1}</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}