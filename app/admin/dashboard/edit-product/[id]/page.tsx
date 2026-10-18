"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const SUBCATEGORIES = [
  "Books",
  "Digitals",
  "Shop All Things Beauty",
  "Shop Kitchen Must Have",
  "Home Accessories",
];

const MAIN_CATEGORIES = ["My Products", "Education of AI", "Story Books"];

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "My Products",
    subcategory: "Books",
    cover_image_url: "🛍️",
    gumroad_url: "#",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (error || !data) {
        setMessage("❌ Product not found");
      } else {
        setFormData({
          title: data.title || "",
          description: data.description || "",
          price: data.price || "",
          category: data.category || "My Products",
          subcategory: data.subcategory || "Books",
          cover_image_url: data.cover_image_url || "🛍️",
          gumroad_url: data.gumroad_url || "#",
        });
        setExistingImages(data.image_urls || []);
      }
      setLoading(false);
    };

    if (productId) fetchProduct();
  }, [productId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setNewImages(files);
      setNewPreviews(files.map((file) => URL.createObjectURL(file)));
    }
  };

  const handleRemoveExistingImage = (url: string) => {
    setExistingImages(existingImages.filter((u) => u !== url));
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImages(newImages.filter((_, i) => i !== index));
    setNewPreviews(newPreviews.filter((_, i) => i !== index));
  };

  const uploadNewImages = async () => {
    if (newImages.length === 0) return [];
    const urls: string[] = [];

    for (const file of newImages) {
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
    setSaving(true);
    setMessage("");

    try {
      setUploading(true);
      const uploadedUrls = await uploadNewImages();
      setUploading(false);

      const allImages = [...existingImages, ...uploadedUrls];

      const { error } = await supabase
        .from("products")
        .update({
          ...formData,
          image_urls: allImages,
        })
        .eq("id", productId);

      if (error) {
        setMessage(`❌ Error: ${error.message}`);
        setSaving(false);
      } else {
        setMessage("✅ Product updated successfully!");
        setTimeout(() => {
          router.push("/admin/dashboard/products");
        }, 1500);
      }
    } catch (err: any) {
      setMessage(`❌ Error: ${err.message}`);
      setSaving(false);
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Loading product...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[120px] opacity-20"></div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <Link href="/admin/dashboard/products" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          ← Back to Products
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Edit Product
            </span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
          
          <div className="mb-5">
            <label className="block text-sm text-gray-400 mb-2">Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:border-purple-500/50 focus:outline-none" />
          </div>

          <div className="mb-5">
            <label className="block text-sm text-gray-400 mb-2">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={3}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:border-purple-500/50 focus:outline-none resize-none" />
          </div>

          {/* MAIN CATEGORY */}
          <div className="mb-5">
            <label className="block text-sm text-gray-400 mb-2">Main Category (Website Section) *</label>
            <select name="category" value={formData.category} onChange={handleChange}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:border-purple-500/50 focus:outline-none">
              {MAIN_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* SUB CATEGORY */}
          <div className="mb-5">
            <label className="block text-sm text-gray-400 mb-2">Shop Category (Filter) *</label>
            <select name="subcategory" value={formData.subcategory} onChange={handleChange}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:border-purple-500/50 focus:outline-none">
              {SUBCATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label className="block text-sm text-gray-400 mb-2">Price</label>
            <input type="text" name="price" value={formData.price} onChange={handleChange}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:border-purple-500/50 focus:outline-none" />
          </div>

          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div className="mb-5">
              <label className="block text-sm text-gray-400 mb-2">Current Images ({existingImages.length})</label>
              <div className="flex gap-3 flex-wrap">
                {existingImages.map((url, i) => (
                  <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/20 group">
                    <img src={url} alt={`Image ${i + 1}`} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => handleRemoveExistingImage(url)}
                      className="absolute top-0 right-0 w-6 h-6 bg-red-500/80 text-white text-xs rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add New Images */}
          <div className="mb-5">
            <label className="block text-sm text-gray-400 mb-2">Add More Images</label>
            <input type="file" accept="image/*" multiple onChange={handleImageSelect}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:border-purple-500/50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700" />
            
            {newPreviews.length > 0 && (
              <div className="flex gap-3 mt-4 flex-wrap">
                {newPreviews.map((src, i) => (
                  <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-purple-500/50 group">
                    <img src={src} alt={`New ${i + 1}`} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => handleRemoveNewImage(i)}
                      className="absolute top-0 right-0 w-6 h-6 bg-red-500/80 text-white text-xs rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-5">
            <label className="block text-sm text-gray-400 mb-2">Cover Emoji</label>
            <input type="text" name="cover_image_url" value={formData.cover_image_url} onChange={handleChange}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:border-purple-500/50 focus:outline-none" />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Buy Link</label>
            <input type="text" name="gumroad_url" value={formData.gumroad_url} onChange={handleChange}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:border-purple-500/50 focus:outline-none" />
          </div>

          {message && (
            <div className="mb-4 p-3 bg-white/5 border border-white/10 rounded-lg">
              <p className="text-sm">{message}</p>
            </div>
          )}

          <button type="submit" disabled={saving}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-semibold text-white hover:scale-105 transition-transform disabled:opacity-50">
            {uploading ? "Uploading images..." : saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </main>
  );
}