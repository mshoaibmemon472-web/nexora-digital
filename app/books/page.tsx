import Link from "next/link";

export default function BooksPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 relative overflow-hidden">
      
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[120px] opacity-20"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              My Published Books
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Choose a category to explore</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Education of AI */}
          <Link href="/books/education-of-ai" className="group">
            <div className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 hover:scale-105">
              <div className="text-6xl mb-6">🤖</div>
              <h2 className="text-3xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">
                Education of AI
              </h2>
              <p className="text-gray-400">
                AI prompts, guides, aur development resources
              </p>
            </div>
          </Link>

          {/* Story Books */}
          <Link href="/books/story-books" className="group">
            <div className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-105">
              <div className="text-6xl mb-6">📖</div>
              <h2 className="text-3xl font-bold mb-3 text-white group-hover:text-cyan-300 transition-colors">
                Story Books
              </h2>
              <p className="text-gray-400">
                Fiction, adventures, aur imaginative stories
              </p>
            </div>
          </Link>

        </div>

      </div>
    </main>
  );
}