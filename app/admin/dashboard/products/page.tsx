"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Product = {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  cover_image_url: string;
  gumroad_url: string;
};

export default function ProductsListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      fetchProducts();
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[120px] opacity-20"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Back Link */}
        <Link href="/admin/dashboard" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          ← Back to Dashboard
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                All Products
              </span>
            </h1>
            <p className="text-gray-400 text-sm">Manage your products</p>
          </div>
          <Link
            href="/admin/dashboard/add-product"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg text-sm font-semibold hover:scale-105 transition-transform text-center"
          >
            ➕ Add New Product
          </Link>
        </div>

        {/* Products */}
        {loading ? (
          <p className="text-gray-400 text-center py-20">Loading products...</p>
        ) : products.length === 0 ? (
          <div className="text-center py-20 border border-white/10 rounded-2xl bg-white/5">
            <p className="text-gray-400 mb-4">No products yet.</p>
            <Link
              href="/admin/dashboard/add-product"
              className="text-purple-400 hover:text-purple-300"
            >
              Add your first product →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm flex flex-col md:flex-row md:items-center gap-6"
              >
                {/* Emoji Cover */}
                <div className="w-20 h-20 flex items-center justify-center text-5xl bg-gradient-to-br from-purple-900/50 to-cyan-900/50 rounded-xl flex-shrink-0">
                  {product.cover_image_url || "📘"}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{product.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{product.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/30">
                      {product.category}
                    </span>
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-full border border-cyan-500/30">
                      {product.price || "No price"}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-4 md:mt-0">
                  <Link
                    href={`/admin/dashboard/edit-product/${product.id}`}
                    className="px-4 py-2 border border-cyan-500/30 rounded-lg text-cyan-400 hover:bg-cyan-500/10 transition-all text-sm font-semibold"
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-4 py-2 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/10 transition-all text-sm font-semibold"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}