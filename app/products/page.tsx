"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ImageCarousel from "@/components/ImageCarousel";
import ImageLightbox from "@/components/ImageLightbox";
import { motion } from "framer-motion";

type Product = {
  id: number;
  title: string;
  description: string;
  price: string;
  cover_image_url: string;
  gumroad_url: string;
  image_urls: string[];
  subcategory: string;
  created_at: string;
};

const FILTERS = [
  "All",
  "New Arrivals",
  "Digitals",
  "Shop All Things Beauty",
  "Shop Kitchen Must Have",
  "Home Accessories",
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxProduct, setLightboxProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", "My Products")
        .order("created_at", { ascending: false });

      if (!error) {
        setProducts(data || []);
        setFiltered(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;

    // Filter
    if (activeFilter === "New Arrivals") {
      const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      result = result.filter(
        (p) => new Date(p.created_at).getTime() > sevenDaysAgo
      );
    } else if (activeFilter !== "All") {
      result = result.filter((p) => p.subcategory === activeFilter);
    }

    // Search
    const q = search.toLowerCase().trim();
    if (q) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    setFiltered(result);
  }, [search, products, activeFilter]);

  const isNew = (date: string) => {
    const created = new Date(date).getTime();
    const now = Date.now();
    const diffDays = (now - created) / (1000 * 60 * 60 * 24);
    return diffDays < 7;
  };

  const toggleExpanded = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <main className="min-h-screen text-gray-900 pt-32 pb-20 px-6 relative bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/shop-bg.jpg')" }}>
  
  {/* Background Overlay */}
  <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px]"></div>

  <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 tracking-tight">
            Shop Products
          </h1>
          <p className="text-gray-500 text-lg">Discover our premium collection</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              🔍
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-full text-gray-900 placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition-all shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2 md:gap-3 mb-10 flex-wrap">
          {FILTERS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${
                activeFilter === cat
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {search && (
          <p className="text-center text-gray-500 text-sm mb-6">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} found
          </p>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
             <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500 text-center py-20 text-lg">
            {search
              ? "No products found for your search."
              : "No products in this category yet."}
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 items-start">
            {filtered.map((product) => {
              const isExpanded = expandedIds.includes(product.id);
              const desc = product.description || "";
              const isLong = desc.length > 80;

              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={product.id}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                >
                  {/* NEW Badge */}
                  {isNew(product.created_at) && (
                    <div className="absolute top-3 left-3 z-30 px-3 py-1 bg-black text-white rounded-full text-[10px] font-bold tracking-wider uppercase shadow-md">
                      New
                    </div>
                  )}

                  {/* Image (Clickable for Lightbox) */}
                  <div
                    onClick={() => {
                      setLightboxProduct(product);
                      setLightboxOpen(true);
                    }}
                    className="cursor-zoom-in relative bg-gray-50 p-4"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden bg-white">
                      <ImageCarousel
                        images={product.image_urls || []}
                        fallback={product.cover_image_url || "🛍️"}
                        alt={product.title}
                        aspectClass="aspect-square"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">
                      {product.subcategory || "Shop All"}
                    </p>
                    <h3 className="text-sm md:text-base font-bold text-gray-900 mb-2 leading-snug">
                      {product.title}
                    </h3>

                    {/* Description with See More */}
                    <div className="mb-4 flex-1">
                      <p className={`text-xs text-gray-500 leading-relaxed ${!isExpanded && isLong ? "line-clamp-2" : ""}`}>
                        {desc}
                      </p>
                      {isLong && (
                        <button
                          onClick={() => toggleExpanded(product.id)}
                          className="text-[11px] text-black hover:underline font-semibold mt-1 transition-colors"
                        >
                          {isExpanded ? "See Less" : "See More"}
                        </button>
                      )}
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between gap-2 mb-3 mt-auto">
                      <span className="text-lg md:text-xl font-extrabold text-gray-900">
                        {product.price || "Free"}
                      </span>
                    </div>

                    {/* Buy Button */}
                    <a
                      href={product.gumroad_url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center px-4 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-md"
                    >
                      Buy Now
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxProduct && (
        <ImageLightbox
          images={lightboxProduct.image_urls || []}
          alt={lightboxProduct.title}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </main>
  );
}