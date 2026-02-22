"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    images: "",
    category: "",
    stock: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        price: Number(form.price),
        images: form.images.split(",").map((img) => img.trim()),
        category: form.category,
        stock: Number(form.stock),
        rating: 4.5,
      }),
    });

    if (res.ok) {
      alert("Product Added Successfully 🎉");
      setForm({
        title: "",
        description: "",
        price: "",
        images: "",
        category: "",
        stock: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f3] p-10 text-[#5a4a3a]">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg border-2 border-[#e8dcc4]">

        {/* Header Section with Manage Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-serif font-bold">
            Add New Product
          </h1>

          <Link
            href="/admin/products"
            className="px-5 py-2 rounded-md text-sm font-medium bg-[#8b7355] text-[#faf8f3] hover:bg-[#6b5a45] transition shadow-md"
          >
            Manage Products
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 border border-[#d4c5a9] rounded focus:outline-none focus:border-[#8b7355]"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 border border-[#d4c5a9] rounded focus:outline-none focus:border-[#8b7355]"
          />

          <input
            name="price"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className="w-full p-3 border border-[#d4c5a9] rounded focus:outline-none focus:border-[#8b7355]"
          />

          <input
            name="images"
            placeholder="Image URLs (comma separated)"
            value={form.images}
            onChange={handleChange}
            className="w-full p-3 border border-[#d4c5a9] rounded focus:outline-none focus:border-[#8b7355]"
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 border border-[#d4c5a9] rounded focus:outline-none focus:border-[#8b7355]"
          />

          <input
            name="stock"
            placeholder="Stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            className="w-full p-3 border border-[#d4c5a9] rounded focus:outline-none focus:border-[#8b7355]"
          />

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#8b7355] to-[#6b5a45] text-[#faf8f3] rounded-md hover:from-[#6b5a45] hover:to-[#5a4a3a] transition shadow-md"
          >
            Add Product
          </button>

        </form>
      </div>
    </div>
  );
}