"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminProductsPage() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const deleteProduct = async (id: string) => {
  console.log("UI Delete ID:", id);

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

  return (
    <div className="p-10 bg-[#faf8f3] min-h-screen text-[#5a4a3a]">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold">
          Manage Products
        </h1>

        <Link
          href="/admin"
          className="bg-[#8b7355] text-white px-5 py-2 rounded"
        >
          Add Product
        </Link>
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