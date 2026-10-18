"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import ImageCarousel from "@/components/ImageCarousel";
import TiltCard from "@/components/TiltCard";

type Product = {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  subcategory: string;
  cover_image_url: string;
  gumroad_url: string;
  image_urls: string[];
};

// ===== Diagonal Light Beams (Fast & Premium) =====
const beamsData = [
  { left: "5%", width: 180, rotate: 18, color: "rgba(168,85,247,0.18)", delay: 0 },
  { left: "20%", width: 120, rotate: 22, color: "rgba(6,182,212,0.15)", delay: 1.5 },
  { left: "35%", width: 200, rotate: 15, color: "rgba(236,72,153,0.12)", delay: 0.8 },
  { left: "50%", width: 150, rotate: 20, color: "rgba(168,85,247,0.2)", delay: 2 },
  { left: "65%", width: 220, rotate: 17, color: "rgba(6,182,212,0.15)", delay: 1 },
  { left: "80%", width: 140, rotate: 25, color: "rgba(236,72,153,0.13)", delay: 2.5 },
  { left: "92%", width: 160, rotate: 20, color: "rgba(168,85,247,0.16)", delay: 0.5 },
];

function LightBeams() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      
      {/* Top Light Source Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px]"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(168,85,247,0.25) 0%, rgba(6,182,212,0.15) 30%, transparent 70%)",
        }}
      />

      {/* Diagonal Beams */}
      {beamsData.map((beam, i) => (
        <motion.div
          key={i}
          className="absolute -top-[20%] h-[140%]"
          style={{
            left: beam.left,
            width: beam.width,
            transform: `rotate(${beam.rotate}deg)`,
            transformOrigin: "top center",
            background: `linear-gradient(180deg, ${beam.color} 0%, transparent 80%)`,
            willChange: "opacity",
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: beam.delay,
          }}
        />
      ))}

      {/* Subtle Noise Texture on Top */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

export default function Home() {
  const [books, setBooks] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: booksData } = await supabase
        .from("products")
        .select("*")
        .in("category", ["Education of AI", "Story Books"])
        .order("created_at", { ascending: false })
        .limit(3);

      const { data: productsData } = await supabase
        .from("products")
        .select("*")
        .eq("category", "My Products")
        .order("created_at", { ascending: false })
        .limit(4);

      if (booksData) setBooks(booksData);
      if (productsData) setProducts(productsData);
    };
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden relative">
      
      {/* ===== 1. HERO SECTION ===== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        
        {/* Light Beams Background */}
        <LightBeams />

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 px-5 py-2 border border-purple-500/50 rounded-full bg-purple-500/10 backdrop-blur-sm inline-flex items-center gap-2"
          >
            <motion.span
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-purple-400 rounded-full"
            />
            <p className="text-sm text-purple-300 font-medium">
              Books, Products & More
            </p>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Nexora Digital
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-xl md:text-2xl text-gray-400 mb-2"
          >
            Premium Products by
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-2xl md:text-3xl font-semibold text-white mb-12"
          >
            M. Shoaib Memon
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/products"
                className="block px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full font-semibold text-white shadow-lg shadow-pink-500/50 hover:shadow-pink-500/80 transition-shadow duration-300"
              >
                🛍️ Shop Now
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/books"
                className="block px-8 py-4 border border-white/20 rounded-full font-semibold text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                📖 Explore Books
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.a
          href="#books-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer group"
        >
          <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-purple-400 transition-colors">
            <p className="text-xs tracking-widest uppercase">Scroll</p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-current rounded-full flex justify-center pt-2"
            >
              <motion.div
                animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 bg-current rounded-full"
              />
            </motion.div>
          </div>
        </motion.a>
      </section>

      {/* ===== 2. BOOKS SECTION ===== */}
      <motion.section
        id="books-section"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 py-24 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                My Published Books
              </span>
            </h2>
            <p className="text-gray-400">AI education aur stories</p>
          </div>

          {books.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1200px" }}>
              {books.map((book) => (
                <TiltCard key={book.id}>
                  <div className="group p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300">
                    <ImageCarousel
                      images={book.image_urls || []}
                      fallback={book.cover_image_url || "📘"}
                      alt={book.title}
                      aspectClass="aspect-[3/4]"
                    />
                    <h3 className="text-xl font-bold mb-2 text-white">{book.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{book.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-400 font-semibold">{book.price || "Free"}</span>
                      <a href={book.gumroad_url || "#"} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-sm font-semibold hover:scale-105 transition-transform">
                        Buy Now
                      </a>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">Books coming soon...</p>
          )}

          <div className="text-center mt-12">
            <Link href="/books" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
              View All Books →
            </Link>
          </div>
        </div>
      </motion.section>

      {/* ===== 3. PRODUCTS SECTION ===== */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 py-24 px-6 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Shop Products
              </span>
            </h2>
            <p className="text-gray-400">Digital tools, beauty, kitchen & home essentials</p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6 items-start" style={{ perspective: "1500px" }}>
              {products.map((product) => (
                <TiltCard key={product.id}>
                  <div className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-pink-500/50 transition-all duration-300 flex flex-col">
                    <div className="cursor-zoom-in">
                      <ImageCarousel
                        images={product.image_urls || []}
                        fallback={product.cover_image_url || "🛍️"}
                        alt={product.title}
                        aspectClass="aspect-square"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <p className="text-[10px] uppercase tracking-wider text-pink-400 font-bold mb-2">
                        {product.subcategory || "Shop All"}
                      </p>
                      <h3 className="text-sm md:text-base font-bold text-white mb-2 line-clamp-2 leading-snug">
                        {product.title}
                      </h3>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex-1">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-lg md:text-xl font-extrabold text-white">
                          {product.price || "Free"}
                        </span>
                      </div>
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
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">Products coming soon...</p>
          )}

          <div className="text-center mt-12">
            <Link href="/products" className="inline-block px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full text-white font-semibold hover:scale-105 transition-transform shadow-lg shadow-pink-500/30">
              Shop All Products →
            </Link>
          </div>
        </div>
      </motion.section>

      {/* ===== 4. ABOUT SECTION ===== */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 py-24 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          
          <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-6 border-4 border-purple-500/30 shadow-xl shadow-purple-500/20 relative">
             <Image 
               src="/profile.jpg" 
               alt="H.M. Shoaib Memon" 
               fill
               sizes="160px"
               className="object-cover"
             />
          </div>

          <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Hi! I&apos;m <strong className="text-white">Shoaib</strong> — a student and creator with a deep passion for 
            AI and storytelling. I started Nexora Digital to share AI resources and inspire beginners.
          </p>
          
          <Link href="/about" className="inline-block px-8 py-3 border border-cyan-500/30 rounded-full text-cyan-400 hover:bg-cyan-500/10 transition-all">
            Read My Full Story →
          </Link>
        </div>
      </motion.section>

      {/* ===== 5. CONTACT SECTION ===== */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 py-24 px-6 bg-gradient-to-b from-transparent to-purple-900/10"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h2>
          <p className="text-gray-400 mb-10">Have a question? Let&apos;s connect.</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/923142325733" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-green-500/30 rounded-full text-green-400 hover:bg-green-500/10 transition-all">
              💬 WhatsApp
            </a>
            <a href="https://www.linkedin.com/in/muhammad-shoaib-memon-b3070740a" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-blue-500/30 rounded-full text-blue-400 hover:bg-blue-500/10 transition-all">
              💼 LinkedIn
            </a>
            <a href="https://instagram.com/nexoradigital890" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-pink-500/30 rounded-full text-pink-400 hover:bg-pink-500/10 transition-all">
              📷 Instagram
            </a>
          </div>
        </div>
      </motion.section>

    </main>
  );
}