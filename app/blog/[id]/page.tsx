"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Blog = {
  id: number;
  title: string;
  content: string;
  cover_image_url: string;
  author: string;
  created_at: string;
};

export default function SingleBlogPage() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", params.id)
        .single();

      if (!error && data) setBlog(data);
      setLoading(false);
    };
    if (params.id) fetchBlog();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-800 border-t-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
        <button onClick={() => router.push("/blog")} className="px-6 py-2 bg-purple-600 rounded-full hover:bg-purple-700 transition">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      {/* Hero Image */}
      <div className="w-full h-[40vh] md:h-[60vh] relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={blog.cover_image_url} alt={blog.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      </div>

      <article className="max-w-3xl mx-auto px-6 -mt-20 relative z-10">
        <Link href="/blog" className="text-sm text-purple-400 hover:text-purple-300 font-semibold mb-6 inline-block">
          ← Back to Blogs
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
          {blog.title}
        </h1>
        
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-10 pb-6 border-b border-white/10">
          <span className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xs">
              {blog.author.charAt(0)}
            </div>
            {blog.author}
          </span>
          <span>•</span>
          <span>{new Date(blog.created_at).toLocaleDateString()}</span>
        </div>

        {/* Content (whitespace-pre-wrap ensures paragraphs break properly) */}
        <div className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
          {blog.content}
        </div>
      </article>
    </main>
  );
}