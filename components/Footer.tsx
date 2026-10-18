import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8 px-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[150px] opacity-10"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Nexora Digital
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium digital products, AI resources, and stories by M. Shoaib Memon.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">Home</Link>
              <Link href="/books" className="text-gray-400 hover:text-white text-sm transition-colors">Books</Link>
              <Link href="/products" className="text-gray-400 hover:text-white text-sm transition-colors">My Products</Link>
              <Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://wa.me/923142325733"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 text-sm transition-colors"
              >
                💬 WhatsApp
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-shoaib-memon-b3070740a"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
              >
                💼 LinkedIn
              </a>
              <a
                href="https://instagram.com/nexoradigital890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 text-sm transition-colors"
              >
                📷 Instagram
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 Nexora Digital. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Made with 💜 by M. Shoaib Memon
          </p>
        </div>

      </div>
    </footer>
  );
}