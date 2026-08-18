"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isLoading } = useUser();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    images: "",
    stock: "",
  });
  const [loadingProduct, setLoadingProduct] = useState(true);

  useEffect(() => {
    if (!isLoading && user?.isAdmin) {
      fetchProduct();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, user, id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) {
        setLoadingProduct(false);
        return;
      }
      const data = await res.json();

      setForm({
        title: data.title || "",
        description: data.description || "",
        price: data.price || "",
        images: data.images?.join(",") || "",
        stock: data.stock || "",
      });
    } catch {
      // Silently handle fetch errors
    } finally {
      setLoadingProduct(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        price: Number(form.price),
        images: form.images.split(",").map((img) => img.trim()).filter(Boolean),
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

  // Validate image URLs to prevent crashes
  const previewImages = form.images
    .split(",")
    .map((img) => img.trim())
    .filter((img) => {
      if (!img) return false;
      try {
        const u = new URL(img);
        return u.protocol === "http:" || u.protocol === "https:";
      } catch {
        return false;
      }
    });

  // Auth guard — redirect non-admins
  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      router.push("/");
    }
  }, [isLoading, user, router]);

  if (isLoading || loadingProduct || !user || !user.isAdmin) {
    return (
      <div className="min-h-screen bg-[#faf8f3] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#8b7355] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#8b7355] font-medium">Loading...</p>
        </div>
      </div>
    );
  }

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
          placeholder="Image URLs (comma separated)"
          className="w-full p-3 border rounded"
          />

          {previewImages.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-4">
              {previewImages.map((img, index) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={index}
                  src={img}
                  alt={`preview ${index + 1}`}
                  className="h-28 w-full object-cover rounded border"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
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