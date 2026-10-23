import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";

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

      </body>
    </html>
  );
}