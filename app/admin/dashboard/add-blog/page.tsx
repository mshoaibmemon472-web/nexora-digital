"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AddBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    cover_image_url: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("blogs").insert([
      {
        title: formData.title,
        content: formData.content,
        cover_image_url: formData.cover_image_url || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop", // Default image agar khali ho
        author: "M. Shoaib Memon",
      },
    ]);

    if (error) {
      setMessage(`❌ Error: ${error.message}`);
      setLoading(false);
    } else {
      setMessage("✅ Blog published successfully!");
      setTimeout(() => {
        router.push("/admin/dashboard"); // Dashboard pe wapas bhej dega
      }, 1500);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[120px] opacity-20"></div>
      
      <div className="relative z-10 max-w-3xl mx-auto">
        <Link href="/admin/dashboard" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          ← Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Write a New Blog
            </span>
          </h1>
          <p className="text-gray-400 text-sm">Share your thoughts with the world</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
          
          {/* Title */}
          <div className="mb-5">
            <label className="block text-sm text-gray-400 mb-2">Blog Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:border-purple-500/50 focus:outline-none text-lg font-semibold"
              placeholder="e.g., How to start with AI in 2026"
            />
          </div>

          {/* Cover Image URL */}
          <div className="mb-5">
            <label className="block text-sm text-gray-400 mb-2">Cover Image URL (Optional)</label>
            <input
              type="text"
              name="cover_image_url"
              value={formData.cover_image_url}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:border-purple-500/50 focus:outline-none text-sm"
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-gray-500 mt-1">Agar khali chhoda, toh ek default image lag jayegi.</p>
          </div>

          {/* Content */}
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Blog Content *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={10}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:border-purple-500/50 focus:outline-none resize-y"
              placeholder="Write your article here..."
            />
          </div>

          {message && (
            <div className="mb-4 p-3 bg-white/5 border border-white/10 rounded-lg">
              <p className="text-sm">{message}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-bold text-white hover:scale-[1.02] transition-transform disabled:opacity-50 text-lg"
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </main>
  );
}