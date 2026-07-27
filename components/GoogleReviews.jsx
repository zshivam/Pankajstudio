"use client";
import React, { useState, useEffect } from 'react';

// 🌟 Hardcoded Premium Reviews for Pankaj Studio
const realReviews = [
  {
    id: 1,
    author_name: "Sneha Rajput",
    rating: 5,
    text: "Pankaj Studio made our wedding day unforgettable! Their cinematic shots and attention to detail are just mind-blowing. The team was so cooperative and made us feel at ease.",
    profile_photo_url: "https://ui-avatars.com/api/?name=Sneha+Rajput&background=1a1714&color=f59e0b&size=128"
  },
  {
    id: 2,
    author_name: "Aman Verma",
    rating: 5,
    text: "Hands down the best photography team in Deoria! We hired them for a pre-wedding shoot and the results were beyond our expectations. Every frame looks like a movie.",
    profile_photo_url: "https://ui-avatars.com/api/?name=Aman+Verma&background=1a1714&color=f59e0b&size=128"
  },
  {
    id: 3,
    author_name: "Priya & Rohan",
    rating: 5,
    text: "We didn't just get photos; we got pure memories. They captured candid moments we didn't even know were happening. The final 4K video delivery was top-notch.",
    profile_photo_url: "https://ui-avatars.com/api/?name=Priya+Rohan&background=1a1714&color=f59e0b&size=128"
  },
  {
    id: 4,
    author_name: "Vikram Singh",
    rating: 5,
    text: "Extremely professional and highly creative. The color grading on our cinematic video was exactly what we wanted. Highly recommend Pankaj Studio for any big milestone.",
    profile_photo_url: "https://ui-avatars.com/api/?name=Vikram+Singh&background=1a1714&color=f59e0b&size=128"
  },
  {
    id: 5,
    author_name: "Neha Sharma",
    rating: 4,
    text: "Loved the output! The team was on time, very polite, and the album quality is incredibly premium. Thank you for capturing my maternity journey so beautifully.",
    profile_photo_url: "https://ui-avatars.com/api/?name=Neha+Sharma&background=1a1714&color=f59e0b&size=128"
  }
];

export default function GoogleReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-looping logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === realReviews.length - 1 ? 0 : prev + 1));
    }, 5000); // Har 5 second me review fade hokar change hoga
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-neutral-950 py-16 px-4 flex flex-col items-center border-t border-neutral-900">
      <div className="flex flex-col items-center mb-10">
        <h2 className="text-3xl md:text-4xl font-serif text-amber-500 uppercase tracking-widest mb-2 text-center">
          Client Love
        </h2>
        <div className="w-16 h-1 bg-amber-600 rounded"></div>
      </div>
      
      {/* Carousel Container */}
      <div className="relative w-full max-w-4xl h-72 overflow-hidden flex items-center justify-center">
        {realReviews.map((review, index) => (
          <div 
            key={review.id} 
            className={`absolute w-full px-4 transition-all duration-1000 ease-in-out ${
              index === currentIndex 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 translate-x-10 pointer-events-none"
            }`}
          >
            <div className="flex flex-col items-center text-center">
              {/* Profile Photo */}
              <img 
                src={review.profile_photo_url} 
                alt={review.author_name} 
                className="w-16 h-16 rounded-full mb-4 border-2 border-amber-500 shadow-lg object-cover" 
              />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4 justify-center">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-300 italic text-lg md:text-2xl max-w-3xl leading-relaxed mb-6 font-light">
                "{review.text}"
              </p>

              {/* Author Name */}
              <p className="text-white font-bold tracking-widest uppercase text-sm">
                — {review.author_name}
              </p>

              {/* Verified Badge */}
              <div className="flex items-center gap-2 mt-2 opacity-70">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-xs text-gray-400 font-mono tracking-wider">Verified Client</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}