"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ImageCarousel from "@/components/ImageCarousel";

type Product = {
  id: number;
  title: string;
  description: string;
  price: string;
  cover_image_url: string;
  gumroad_url: string;
  image_urls: string[];
};

export default function StoryBooksPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", "Story Books")
        .order("created_at", { ascending: false });

      if (!error) setProducts(data || []);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600 rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px] opacity-20"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <Link href="/books" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          ← Back to Books
        </Link>

        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Story Books
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Fiction, adventures, aur imaginative stories</p>
        </div>

        {loading ? (
          <p className="text-gray-400 text-center py-20">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-400 text-center py-20">No story books yet. Coming soon!</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((book) => (
              <div
                key={book.id}
                className="group p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-105"
              >
                <ImageCarousel
                  images={book.image_urls || []}
                  fallback={book.cover_image_url || "📖"}
                  alt={book.title}
                  aspectClass="aspect-[3/4]"
                />

                <h3 className="text-xl font-bold mb-2 text-white">{book.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{book.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 font-semibold">{book.price || "Free"}</span>
                  <a
                    href={book.gumroad_url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full text-sm font-semibold hover:scale-105 transition-transform"
                  >
                    Buy Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}