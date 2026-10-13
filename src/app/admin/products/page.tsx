"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

export default function AdminProductsPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) {
        setProducts([]);
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch {
      setProducts([]);
    }
  }, []);

  // Only fetch products once user is confirmed as admin
  useEffect(() => {
    if (!isLoading && user?.isAdmin) {
      fetchProducts();
    }
  }, [isLoading, user, fetchProducts]);

  const deleteProduct = async (id: string) => {
    const confirmDelete = confirm("Delete this product?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Product deleted");
      fetchProducts();
    } else {
      alert("Delete failed");
    }
  };

  // Auth guard — redirect non-admins
  // Auth guard — redirect non-admins
  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      router.push("/");
    }
  }, [isLoading, user, router]);

  if (isLoading || !user || !user.isAdmin) {
    return (
      <div className="min-h-screen bg-[#faf8f3] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#8b7355] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#8b7355] font-medium">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 bg-[#faf8f3] min-h-screen text-[#5a4a3a]">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold">
            Manage Products
          </h1>
          <p className="text-[#8b7355] text-sm mt-1">Review, edit, and manage catalog items</p>
        </div>

        <div className="flex gap-2.5 flex-wrap">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium border border-[#e8dcc4] text-[#5a4a3a] hover:bg-[#e8dcc4] transition-all bg-white shadow-xs"
          >
            Home Page
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium border border-[#e8dcc4] text-[#5a4a3a] hover:bg-[#e8dcc4] transition-all bg-white shadow-xs"
          >
            My Profile
          </Link>
          <Link
            href="/admin"
            className="bg-[#8b7355] hover:bg-[#6b5a45] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-xs"
          >
            + Add Product
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border">

        <table className="w-full text-left">
          <thead className="bg-[#f5f0e8]">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p: any) => (
              <tr key={p._id} className="border-t">

                <td className="p-3">{p.title}</td>
                <td className="p-3">₹{p.price}</td>
                <td className="p-3">{p.stock}</td>

                <td className="p-3 space-x-3">

                  <Link
                    href={`/admin/products/${p._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}