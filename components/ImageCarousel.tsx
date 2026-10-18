"use client";

import { useState } from "react";

type Props = {
  images: string[];
  fallback: string;
  alt: string;
  aspectClass?: string;
};

export default function ImageCarousel({
  images,
  fallback,
  alt,
  aspectClass = "aspect-square",
}: Props) {
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div
        className={`${aspectClass} bg-gradient-to-br from-purple-900/50 to-cyan-900/50 rounded-xl flex items-center justify-center text-8xl mb-6`}
      >
        <span>{fallback}</span>
      </div>
    );
  }

  return (
    <div className="w-full mb-6">
      {/* 🖼️ Main Image Stage */}
      <div
        className={`relative ${aspectClass} w-full rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900/90 to-black border border-white/10 shadow-2xl group/main`}
      >
        {/* 3D Glow Behind Image */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 blur-2xl opacity-40 group-hover/main:opacity-100 transition-opacity duration-700"></div>
        
        {/* Main Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[current]}
          alt={alt}
          className="relative z-10 w-full h-full object-contain p-4 drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)] transition-transform duration-500 ease-out group-hover/main:scale-105"
        />
      </div>

      {/* 🎞️ Thumbnails (Sirf tab dikhao jab 1 se zyada images hon) */}
      {images.length > 1 && (
        <div className="flex justify-center gap-3 mt-4 flex-wrap">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrent(i);
              }}
              className={`relative w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden transition-all duration-300 ${
                i === current
                  ? "border-2 border-purple-500 scale-110 shadow-lg shadow-purple-500/50 z-10"
                  : "border border-white/10 opacity-60 hover:opacity-100 hover:scale-105 grayscale hover:grayscale-0"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt={`Thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}