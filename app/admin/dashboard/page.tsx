"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
      } else {
        setEmail(session.user.email || "");
        setLoading(false);
      }
    };
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[120px] opacity-20"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Admin Dashboard
              </span>
            </h1>
            <p className="text-gray-400 text-sm">Welcome back, {email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/10 transition-all text-sm font-semibold"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/admin/dashboard/add-product"
            className="group p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 hover:scale-105"
          >
            <div className="text-5xl mb-4">➕</div>
            <h2 className="text-2xl font-bold text-white mb-2">Add Product</h2>
            <p className="text-gray-400 text-sm">Add a new product to your website</p>
          </Link>

          <Link
            href="/admin/dashboard/products"
            className="group p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-105"
          >
            <div className="text-5xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-white mb-2">All Products</h2>
            <p className="text-gray-400 text-sm">Manage your products</p>
          </Link>
        </div>
      </div>
    </main>
  );
}