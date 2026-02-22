"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {

  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    images: "",
    stock: "",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await fetch(`/api/products/${id}`);
    const data = await res.json();

    setForm({
      title: data.title || "",
      description: data.description || "",
      price: data.price || "",
      images: data.images?.join(",") || "",
      stock: data.stock || "",
    });
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
  e.preventDefault();

  console.log("UI Update ID:", id);

  const res = await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: form.title,
      description: form.description,
      price: Number(form.price),
      images: form.images.split(",").map((img) => img.trim()),
      stock: Number(form.stock),
    }),
  });

  if (res.ok) {
    alert("Updated");
    router.push("/admin/products");
  } else {
    alert("Update failed");
  }
};

  return (
    <div className="p-10 bg-[#faf8f3] min-h-screen text-[#5a4a3a]">

      <h1 className="text-3xl font-serif mb-6">
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl bg-white p-6 rounded shadow space-y-4"
      >

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-3 border rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 border rounded"
        />

        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-3 border rounded"
        />

        <input
          name="images"
          value={form.images}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-3 border rounded"
          />

          {form.images && (
            <div className="grid grid-cols-3 gap-3 mt-4">
              {form.images.split(",").map((img, index) => (
                <Image
                  key={index}
                  src={img.trim() || "/placeholder.png"}
                  alt="preview"
                  width={320}
                  height={180}
                  className="h-28 w-full object-cover rounded border"
                />
              ))}
            </div>
          )}

        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full p-3 border rounded"
        />

        <button
          className="w-full bg-[#8b7355] text-white py-3 rounded"
        >
          Save Changes
        </button>

      </form>

    </div>
  );
}