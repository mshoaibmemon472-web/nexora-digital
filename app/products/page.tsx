"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ImageCarousel from "@/components/ImageCarousel";
import TiltCard from "@/components/TiltCard";
import ImageLightbox from "@/components/ImageLightbox";

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
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600 rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px] opacity-20"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Shop
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Premium products & digital tools</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-6">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
              🔍
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:border-pink-500/50 focus:outline-none backdrop-blur-sm transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {FILTERS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeFilter === cat
                  ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/30"
                  : "border border-white/10 text-gray-400 hover:border-pink-500/50 hover:text-white"
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
          <p className="text-gray-400 text-center py-20">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400 text-center py-20">
            {search
              ? "No products found."
              : "No products in this category yet."}
          </p>
        ) : (
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6 items-start"
            style={{ perspective: "1500px" }}
          >
            {filtered.map((product) => {
              const isExpanded = expandedIds.includes(product.id);
              const desc = product.description || "";
              const isLong = desc.length > 80;

              return (
                <TiltCard key={product.id}>
                  <div className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-pink-500/50 transition-all duration-300 flex flex-col">
                    
                    {/* NEW Badge */}
                    {isNew(product.created_at) && (
                      <div className="absolute top-3 left-3 z-30 px-3 py-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full text-[10px] font-bold text-white tracking-wider uppercase shadow-lg">
                        New
                      </div>
                    )}

                    {/* Wishlist Icon */}
                    <button className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-pink-400 hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100">
                      ♡
                    </button>

                    {/* Image with Lightbox */}
                    <div
                      onClick={() => {
                        setLightboxProduct(product);
                        setLightboxOpen(true);
                      }}
                      className="cursor-zoom-in"
                    >
                      <ImageCarousel
                        images={product.image_urls || []}
                        fallback={product.cover_image_url || "🛍️"}
                        alt={product.title}
                        aspectClass="aspect-square"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-1">
                      
                      {/* Subcategory Label */}
                      <p className="text-[10px] uppercase tracking-wider text-pink-400 font-bold mb-2">
                        {product.subcategory || "Shop All"}
                      </p>

                      {/* Title */}
                      <h3 className="text-sm md:text-base font-bold text-white mb-2 leading-snug">
                        {product.title}
                      </h3>

                      {/* Description with See More */}
                      <div className="mb-3 flex-1">
                        <p
                          className={`text-xs text-gray-500 leading-relaxed ${
                            !isExpanded && isLong ? "line-clamp-2" : ""
                          }`}
                        >
                          {desc}
                        </p>
                        {isLong && (
                          <button
                            onClick={() => toggleExpanded(product.id)}
                            className="text-[11px] text-pink-400 hover:text-pink-300 font-semibold mt-1 transition-colors"
                          >
                            {isExpanded ? "See Less ▲" : "See More ▼"}
                          </button>
                        )}
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-lg md:text-xl font-extrabold text-white">
                          {product.price || "Free"}
                        </span>
                      </div>

                      {/* Buy Button */}
                      <a
                        href={product.gumroad_url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center px-4 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-xl text-sm font-bold text-white transition-all shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-95"
                      >
                        🛒 Buy Now
                      </a>
                    </div>
                  </div>
                </TiltCard>
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