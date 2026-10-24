import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Nexora Digital | Premium Books, Blogs & Products",
    template: "%s | Nexora Digital"
  },
  description: "Discover premium AI education books, storybooks, and trending e-commerce products. Learn, build, and grow with Nexora Digital by M. Shoaib Memon.",
  keywords: ["Nexora Digital", "AI books", "story books", "e-commerce", "Amazon products", "M Shoaib Memon", "AI prompts"],
  authors: [{ name: "M. Shoaib Memon" }],
  
  verification: {
  google: "a31dzuemgTuHF6GDpr8TlDwqxjlUH_0tMJyuo98czbk"
},

  openGraph: {
    title: "Nexora Digital | Premium Books & Products",
    description: "Discover premium AI education, storybooks, and trending products.",
    url: "https://nexora-digital-8359.vercel.app",
    siteName: "Nexora Digital",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
        <Analytics />
<GoogleAnalytics gaId="G-0CGZ4FHCLN" />
{/* Monetag In-Page Push Ad */}
<Script 
  id="monetag-in-page-push" 
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `(function(s){s.dataset.zone='12111516',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
  }}
/>
{/* Monetag In-Page Push Ad */}
  <Script 
    id="monetag-in-page-push" 
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: `(function(s){s.dataset.zone='12111516',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
    }}
  />

  {/* Monetag Vignette Banner Ad (Naya Add) */}
  <Script 
    id="monetag-vignette" 
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: `(function(s){s.dataset.zone='12111547',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
    }}
  />
  

      </body>
    </html>
  );
}