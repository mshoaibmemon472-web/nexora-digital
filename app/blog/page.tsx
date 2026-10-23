"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

type Blog = {
  id: number;
  title: string;
  content: string;
  cover_image_url: string;
  created_at: string;
};

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setBlogs(data || []);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  // Search Filter Logic
  const filteredBlogs = blogs.filter((blog) => {
    const searchTerm = search.toLowerCase();
    return (
      blog.title.toLowerCase().includes(searchTerm) ||
      blog.content.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 relative">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Our Blog
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Insights, stories & AI knowledge</p>
        </div>

        {/* 🔍 Search Bar */}
        <div className="max-w-2xl mx-auto mb-16 relative">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles by title or keyword..."
            className="w-full pl-14 pr-12 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none backdrop-blur-sm transition-colors text-lg"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-gray-800 border-t-purple-500 rounded-full animate-spin"></div>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl mb-4">
              {search ? "No blogs found matching your search." : "No blogs published yet."}
            </p>
            {search && (
              <button 
                onClick={() => setSearch("")} 
                className="text-purple-400 hover:text-purple-300 underline"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, i) => (
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={blog.id}
                className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300"
              >
                <Link href={`/blog/${blog.id}`} className="block aspect-video overflow-hidden relative cursor-pointer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={blog.cover_image_url}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </Link>
                
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs text-purple-400 font-semibold mb-2">
                    {new Date(blog.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                  
                  <Link href={`/blog/${blog.id}`}>
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                  </Link>
                  
                  <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                    {blog.content}
                  </p>
                  
                  <Link 
                    href={`/blog/${blog.id}`}
                    className="mt-auto text-sm font-bold text-white group-hover:text-purple-400 transition-colors flex items-center gap-1"
                  >
                    Read Article <span>→</span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}