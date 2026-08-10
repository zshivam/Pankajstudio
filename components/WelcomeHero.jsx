"use client";
import React, { useState, useEffect } from 'react';

export default function WelcomeHero({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    // 🌟 h-screen ki jagah h-[100svh] use kiya hai taaki mobile browser bar issue na kare
    <div className="relative w-full h-[100svh] overflow-hidden bg-neutral-950 flex flex-col items-center justify-center">
      
      {/* Background Images */}
      {images.length > 0 && images.map((img, index) => (
        <div key={img._id || index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"}`}>
          <img 
            // 🌟 page.jsx me humne data normalize karke url banaya tha, isliye img.url include kiya hai
            src={img.url || img.imageUrl || img} 
            alt="Pankaj Studio Carousel" 
            // 🌟 object-cover object-center ensure karega ki shape na bigde aur center focus rahe
            className="w-full h-full object-cover object-center opacity-40" 
          />
        </div>
      ))}

      {/* Overlay: Logo and Slogan */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        
        {/* NAYA LOGO */}
        <div className="mb-2 relative w-36 h-36 md:w-48 md:h-48 drop-shadow-2xl animate-fade-in-up">
          <img 
            src="/pstudiologo.png" 
            alt="Pankaj Studio Logo" 
            className="w-full h-full object-contain"
          />
        </div>

        <p className="text-lg md:text-3xl font-light tracking-wider text-stone-300 italic max-w-2xl drop-shadow-lg">
          "Capturing the beauty of your moments, weaving them into eternity."
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 animate-bounce flex flex-col items-center opacity-80">
        <span className="text-white text-xs uppercase tracking-widest mb-1 font-mono">Scroll to Explore</span>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}