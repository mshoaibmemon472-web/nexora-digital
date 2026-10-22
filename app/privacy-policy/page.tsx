import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 relative">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          ← Back to Home
        </Link>

        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Privacy Policy
            </span>
          </h1>
          <p className="text-gray-400 text-sm">Last updated: October 2026</p>
        </div>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-3">1. Introduction</h2>
            <p>
              Welcome to <strong>Nexora Digital</strong> ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">2. Information We Collect</h2>
            <p>
              We do not directly collect any personal data from you when you browse our website. However, we may use third-party services (such as Google Analytics and Google AdSense) that collect information such as your IP address, browser type, and pages visited to improve your experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">3. Cookies and Web Beacons</h2>
            <p>
              Like any other website, Nexora Digital uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">4. Google AdSense and DoubleClick Cookie</h2>
            <p>
              Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">https://policies.google.com/technologies/ads</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">5. Amazon Affiliate Disclosure</h2>
            <p>
              Nexora Digital is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com, Amazon.ae, or other Amazon properties. As an Amazon Associate, we earn from qualifying purchases. This means we may earn a small commission if you buy through links on our site, at no extra cost to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">6. Third-Party Privacy Policies</h2>
            <p>
              Nexora Digital's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">7. Consent</h2>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, you can contact us via:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Email: <a href="mailto:mshoaibmemon472@gmail.com" className="text-cyan-400 hover:underline">mshoaibmemon472@gmail.com</a></li>
              <li>WhatsApp: <a href="https://wa.me/923142325733" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">+92 314 2325733</a></li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}