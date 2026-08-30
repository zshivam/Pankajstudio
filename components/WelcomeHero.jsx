"use client";
import React, { useState, useEffect } from 'react';
import { optimizeImageUrl } from '@/lib/utils';

export default function WelcomeHero({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    // 🌟 flex-col on mobile, regular on desktop. pt-20 ensures mobile navbar doesn't hide the image.
    <div className="relative w-full h-[100svh] bg-neutral-950 flex flex-col md:items-center md:justify-center overflow-hidden pt-20 md:pt-0">
      
      {/* 🖼️ IMAGE CONTAINER (Mobile: Top Half Uncropped | Desktop: Full Screen Cover) */}
      <div className="relative w-full h-[45svh] md:h-full md:absolute md:inset-0 flex-shrink-0">
        {images.length > 0 && images.map((img, index) => {
          const rawUrl = img.url || img.imageUrl || img;
          const optimizedSrc = optimizeImageUrl(rawUrl, { width: 1920, quality: 'auto' });
          const isFirst = index === 0;

          return (
            <div 
              key={img._id || index} 
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
            >
              <img 
                src={optimizedSrc} 
                alt="Pankaj Studio Carousel" 
                loading={isFirst ? "eager" : "lazy"}
                fetchPriority={isFirst ? "high" : "low"}
                decoding={isFirst ? "sync" : "async"}
                // 🌟 object-contain on mobile (no cropping), object-cover on desktop (full screen)
                // 🌟 opacity is brighter on mobile since text is below it, darker on desktop for text readability
                className="w-full h-full object-contain md:object-cover md:object-center opacity-90 md:opacity-40" 
              />
            </div>
          );
        })}
        {/* Desktop Gradient Overlay (Hidden on mobile) */}
        <div className="hidden md:block absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
      </div>

      {/* 📝 TEXT & LOGO CONTAINER (Mobile: Bottom Half | Desktop: Centered over image) */}
      <div className="relative z-20 flex flex-col items-center justify-center flex-1 px-6 md:px-4 text-center bg-neutral-950 md:bg-transparent w-full">
        
        {/* LOGO */}
        <div className="mb-4 relative w-32 h-32 md:w-48 md:h-48 drop-shadow-2xl">
          <img 
            src="/pstudiologo.png" 
            alt="Pankaj Studio Logo" 
            width={192}
            height={192}
            className="w-full h-full object-contain"
            fetchPriority="high"
          />
        </div>

        <p className="text-base md:text-3xl font-light tracking-wider text-stone-300 italic max-w-2xl drop-shadow-lg">
          &ldquo;Capturing the beauty of your moments, weaving them into eternity.&rdquo;
        </p>
      </div>

      {/* 👇 SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center opacity-80 z-20 pointer-events-none">
        <span className="text-white text-[10px] md:text-xs uppercase tracking-widest mb-1 font-mono">Scroll to Explore</span>
        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
      
    </div>
  );
}