'use client';
import { useState, useEffect } from 'react';

const REVIEWS = [
  { text: "Pankaj Studio didn't just take pictures; they captured the soul of our wedding. Every emotion looks so cinematic.", author: "Shubham & Rama" },
  { text: "Professional, unobtrusive, and incredibly talented. The 4K video made my entire family feel like movie stars.", author: "Amit & Priya" },
  { text: "From the pre-wedding shoot to the final album delivery, the entire experience was pure luxury. Highly recommended!", author: "Sneha Jaiswal" }
];

export default function ClientLove() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{ padding: '100px var(--page-gutter)', background: '#0a0a0a', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
        
        <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '80px', color: 'rgba(212, 175, 55, 0.2)', lineHeight: 0.5, marginBottom: '20px' }}>
          "
        </div>

        <div style={{ minHeight: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p key={current} className="review-text">
            {REVIEWS[current].text}
          </p>
          <span key={`author-${current}`} className="review-author">
            — {REVIEWS[current].author}
          </span>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 30 }}>
          {REVIEWS.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrent(i)}
              style={{ width: 8, height: 8, borderRadius: '50%', border: 'none', background: current === i ? '#d4af37' : 'rgba(255,255,255,0.2)', cursor: 'pointer', padding: 0, transition: 'background 0.3s' }}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>

      </div>

      <style>{`
        .review-text {
          font-family: "Playfair Display", serif;
          font-size: clamp(20px, 3vw, 28px);
          font-style: italic;
          color: #fff;
          line-height: 1.6;
          margin-bottom: 24px;
          animation: fadeIn 1s ease forwards;
        }
        .review-author {
          font-family: var(--font-sans);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #d4af37;
          animation: fadeIn 1s ease forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}