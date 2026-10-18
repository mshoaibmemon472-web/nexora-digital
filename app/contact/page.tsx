export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[120px] opacity-20"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Have a question? Let&apos;s talk.</p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          
          {/* WhatsApp */}
          <a
            href="https://wa.me/923142325733"
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-300 hover:scale-105 block"
          >
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
            <p className="text-gray-400 text-sm group-hover:text-green-300 transition-colors mb-3">
              0314 2325733
            </p>
            <span className="text-green-400 text-sm font-semibold inline-block">
              Chat Now →
            </span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/muhammad-shoaib-memon-b3070740a"
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 hover:scale-105 block"
          >
            <div className="text-5xl mb-4">💼</div>
            <h3 className="text-xl font-bold text-white mb-2">LinkedIn</h3>
            <p className="text-gray-400 text-sm group-hover:text-blue-300 transition-colors mb-3">
              Shoaib Memon
            </p>
            <span className="text-blue-400 text-sm font-semibold inline-block">
              Visit Profile →
            </span>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/nexoradigital890"
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-300 hover:scale-105 block"
          >
            <div className="text-5xl mb-4">📷</div>
            <h3 className="text-xl font-bold text-white mb-2">Instagram</h3>
            <p className="text-gray-400 text-sm group-hover:text-pink-300 transition-colors mb-3">
              @nexoradigital890
            </p>
            <span className="text-pink-400 text-sm font-semibold inline-block">
              Visit Profile →
            </span>
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="text-center">
          <p className="text-gray-400 mb-6">Connect with Nexora Digital</p>
          <div className="flex justify-center gap-4">
            <a
              href="https://wa.me/923142325733"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-2xl hover:border-green-500/50 hover:bg-green-500/10 transition-all"
            >
              💬
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-shoaib-memon-b3070740a"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-2xl hover:border-blue-500/50 hover:bg-blue-500/10 transition-all"
            >
              💼
            </a>
            <a
              href="https://instagram.com/nexoradigital890"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-2xl hover:border-pink-500/50 hover:bg-pink-500/10 transition-all"
            >
              📷
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}