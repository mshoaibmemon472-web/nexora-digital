"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// ===== Realistic Smoke Background =====
function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-screen"
        style={{
          backgroundImage: "url('/smoke-bg.jpg')",
          backgroundPosition: "bottom center",
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-purple-900/30 mix-blend-color" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      <motion.div
        className="absolute -top-20 right-10 w-[300px] md:w-[500px] h-[800px] origin-top"
        style={{
          background: "linear-gradient(180deg, rgba(168,85,247,0.3) 0%, transparent 80%)",
          clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0% 100%)",
          transform: "rotate(-15deg)",
          filter: "blur(20px)",
        }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[300px]"
        style={{
          background: "radial-gradient(ellipse at bottom, rgba(168,85,247,0.25) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden relative">
      
      {/* ===== 1. HERO SECTION ===== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <HeroBackground />

        <div className="relative z-20 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 px-5 py-2 border border-purple-500/50 rounded-full bg-purple-500/10 backdrop-blur-md inline-flex items-center gap-2"
          >
            <motion.span
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_purple]"
            />
            <p className="text-sm text-purple-300 font-medium">Books, Products & More</p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-6xl md:text-8xl font-bold mb-6 tracking-tight drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]"
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Nexora Digital
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-xl md:text-2xl text-gray-400 mb-2 font-medium"
          >
            Premium Products by
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-2xl md:text-3xl font-bold text-white mb-12 tracking-wide drop-shadow-lg"
          >
            M. Shoaib Memon
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/products"
                className="block px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full font-semibold text-white shadow-lg shadow-pink-500/50 hover:shadow-pink-500/80 transition-all duration-300"
              >
                🛍️ Shop Now
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/books"
                className="block px-8 py-4 border border-white/20 rounded-full font-semibold text-white bg-black/40 backdrop-blur-md hover:bg-white/10 transition-all duration-300"
              >
                📖 Explore Books
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.a
          href="#categories-section"
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

      {/* ===== 2. CATEGORY BUTTONS SECTION (Naya Design) ===== */}
      <section id="categories-section" className="relative z-20 py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-10">
          
          {/* Books Landscape Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/books"
              className="group relative flex flex-col items-center justify-center w-full h-64 md:h-72 rounded-[3rem] overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-500"
            >
              {/* Background Image + Gradient */}
              <div className="absolute inset-0 bg-[url('/smoke-bg.jpg')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-purple-900/70 to-black/90 opacity-80" />
              
              {/* Content */}
              <div className="relative z-10 text-center px-6">
                <div className="text-5xl mb-4">📚</div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  My Published Books
                </h2>
                <p className="text-gray-300 text-lg mb-6">AI Education & Story Books</p>
                <span className="inline-block px-8 py-3 bg-white text-black font-bold rounded-full group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  Explore Books →
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Products Landscape Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/products"
              className="group relative flex flex-col items-center justify-center w-full h-64 md:h-72 rounded-[3rem] overflow-hidden border border-white/10 hover:border-pink-500/50 transition-all duration-500"
            >
              {/* Background Image + Gradient */}
              <div className="absolute inset-0 bg-[url('/shop-bg.jpg')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-pink-900/70 to-black/90 opacity-80" />
              
              {/* Content */}
              <div className="relative z-10 text-center px-6">
                <div className="text-5xl mb-4">🛍️</div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 group-hover:text-pink-300 transition-colors">
                  Shop Products
                </h2>
                <p className="text-gray-300 text-lg mb-6">Digital Tools, Beauty, Kitchen & Home</p>
                <span className="inline-block px-8 py-3 bg-white text-black font-bold rounded-full group-hover:bg-pink-500 group-hover:text-white transition-colors">
                  Shop Collection →
                </span>
              </div>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ===== 4. ABOUT SECTION ===== */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-20 py-24 px-6 bg-black"
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
        className="relative z-20 py-24 px-6 bg-gradient-to-b from-black to-purple-900/20"
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