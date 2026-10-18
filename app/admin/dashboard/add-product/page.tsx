"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const SUBCATEGORIES = [
  "Digitals",
  "Shop All Things Beauty",
  "Shop Kitchen Must Have",
  "Home Accessories",
];

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "My Products",
    subcategory: "Digitals",
    cover_image_url: "🛍️",
    gumroad_url: "#",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setImages(files);
      setPreviews(files.map((file) => URL.createObjectURL(file)));
    }
  };

  const uploadImages = async () => {
    if (images.length === 0) return [];
    const urls: string[] = [];

    for (const file of images) {
      const fileName = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;
      const { data, error } = await supabase.storage
        .from("product-images")
        .upload(fileName, file);

      if (!error && data) {
        const { data: urlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(data.path);
        urls.push(urlData.publicUrl);
      }
    }
    return urls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      setUploading(true);
      const imageUrls = await uploadImages();
      setUploading(false);

      const { error } = await supabase.from("products").insert([
        {
          ...formData,
          image_urls: imageUrls,
        },
      ]);

      if (error) {
        setMessage(`❌ Error: ${error.message}`);
        setLoading(false);
      } else {
        setMessage("✅ Product added successfully!");
        setTimeout(() => {
          router.push("/admin/dashboard/products");
        }, 1500);
      }
    } catch (err: any) {
      setMessage(`❌ Error: ${err.message}`);
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[120px] opacity-20"></div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <Link href="/admin/dashboard" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          ← Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Add New Product
            </span>
          </h1>
          <p className="text-gray-400 text-sm">Fill in the details below</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
          
          {/* Title */}
          <div className="mb-5">
            <label className="block text-sm text-gray-400 mb-2">Title *</label>
            <input
              type="text" name="title" value={formData.title} onChange={handleChange} required
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:border-purple-500/50 focus:outline-none"
              placeholder="Product title"
            />
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="block text-sm text-gray-400 mb-2">Description</label>
            <textarea
              name="description" value={formData.description} onChange={handleChange} rows={3}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:border-purple-500/50 focus:outline-none resize-none"
              placeholder="Short description..."
            />
          </div>

          {/* Subcategory */}
          <div className="mb-5">
            <label className="block text-sm text-gray-400 mb-2">Shop Category *</label>
            <select
              name="subcategory" value={formData.subcategory} onChange={handleChange}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:border-purple-500/50 focus:outline-none"
            >
              {SUBCATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="mb-5">
            <label className="block text-sm text-gray-400 mb-2">Price</label>
            <input
              type="text" name="price" value={formData.price} onChange={handleChange}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:border-purple-500/50 focus:outline-none"
              placeholder="e.g., Rs. 500"
            />
          </div>

          {/* Images */}
          <div className="mb-5">
            <label className="block text-sm text-gray-400 mb-2">Product Images (Max 5)</label>
            <input
              type="file" accept="image/*" multiple onChange={handleImageSelect}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:border-purple-500/50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
            />
            
            {previews.length > 0 && (
              <div className="flex gap-3 mt-4 flex-wrap">
                {previews.map((src, i) => (
                  <div key={i} className="w-20 h-20 rounded-lg overflow-hidden border border-white/20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cover Emoji */}
          <div className="mb-5">
            <label className="block text-sm text-gray-400 mb-2">Cover Emoji</label>
            <input
              type="text" name="cover_image_url" value={formData.cover_image_url} onChange={handleChange}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:border-purple-500/50 focus:outline-none"
              placeholder="🛍️"
            />
          </div>

          {/* Gumroad URL */}
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Buy Link</label>
            <input
              type="text" name="gumroad_url" value={formData.gumroad_url} onChange={handleChange}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:border-purple-500/50 focus:outline-none"
              placeholder="https://..."
            />
          </div>

          {message && (
            <div className="mb-4 p-3 bg-white/5 border border-white/10 rounded-lg">
              <p className="text-sm">{message}</p>
            </div>
          )}

          <button
            type="submit" disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-semibold text-white hover:scale-105 transition-transform disabled:opacity-50"
          >
            {uploading ? "Uploading images..." : loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </main>
  );
}