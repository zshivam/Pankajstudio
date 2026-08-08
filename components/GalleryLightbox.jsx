'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

export default function GalleryLightbox({ images = [], title = '' }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Normalize image data
  const normalizedImages = (images || []).map((img) => {
    if (typeof img === 'string') return { url: img, altText: title };
    return {
      url: img?.url || '',
      altText: img?.altText || title,
      width: img?.width || 1200,
      height: img?.height || 800,
      blurDataUrl: img?.blurDataUrl,
    };
  }).filter((img) => Boolean(img.url));

  const closeModal = useCallback(() => setSelectedIndex(null), []);
  const prevImage = useCallback(() => setSelectedIndex((prev) => (prev > 0 ? prev - 1 : normalizedImages.length - 1)), [normalizedImages.length]);
  const nextImage = useCallback(() => setSelectedIndex((prev) => (prev < normalizedImages.length - 1 ? prev + 1 : 0)), [normalizedImages.length]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, closeModal, prevImage, nextImage]);

  if (!normalizedImages.length) return null;

  return (
    <>
      {/* Gallery Count */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
        <span style={{ display: 'block', width: 28, height: 1, background: '#c8c0b7' }} />
        <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 10, letterSpacing: '0.22em', color: '#9a9087', textTransform: 'uppercase' }}>
          Gallery
        </span>
        <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 10, color: '#bbb5ad' }}>
          {normalizedImages.length} frames
        </span>
      </div>

      {/* Grid Layout */}
      <div style={{ columns: 3, columnGap: 12 }} className="gallery-grid">
        {normalizedImages.map((img, i) => (
          <div
            key={i}
            onClick={() => setSelectedIndex(i)}
            style={{
              marginBottom: 12,
              breakInside: 'avoid',
              overflow: 'hidden',
              borderRadius: 2,
              cursor: 'pointer',
              position: 'relative',
            }}
            className="gallery-item-wrap"
          >
            <Image
              src={img.url}
              alt={img.altText || `${title} — frame ${i + 1}`}
              width={img.width}
              height={img.height}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                filter: 'saturate(0.9)',
                transition: 'transform 0.4s ease, filter 0.4s ease',
              }}
              placeholder={img.blurDataUrl ? 'blur' : 'empty'}
              blurDataURL={img.blurDataUrl || undefined}
              loading={i < 6 ? 'eager' : 'lazy'}
              sizes="(max-width:768px) 90vw, 33vw"
            />
            <div className="gallery-item-hover">
              <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 9, letterSpacing: '0.15em', color: '#fff', textTransform: 'uppercase' }}>
                Expand ↗
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(5, 5, 5, 0.95)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={closeModal}
        >
          {/* Top Bar */}
          <div
            style={{
              position: 'absolute',
              top: 24,
              left: 32,
              right: 32,
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center',
              zIndex: 10,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
              {selectedIndex + 1} / {normalizedImages.length}
            </span>
            <button
              onClick={closeModal}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                width: 40,
                height: 40,
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
              }}
              title="Close (Esc)"
            >
              ✕
            </button>
          </div>

          {/* Left Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            style={{
              position: 'absolute',
              left: 24,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff',
              width: 50,
              height: 50,
              borderRadius: '50%',
              fontSize: 18,
              cursor: 'pointer',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Previous"
          >
            ‹
          </button>

          {/* Image */}
          <div
            style={{ position: 'relative', maxWidth: '90vw', maxHeight: '82vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={normalizedImages[selectedIndex].url}
              alt={normalizedImages[selectedIndex].altText}
              style={{
                maxWidth: '90vw',
                maxHeight: '82vh',
                objectFit: 'contain',
                borderRadius: 2,
                boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
              }}
            />
          </div>

          {/* Right Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            style={{
              position: 'absolute',
              right: 24,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff',
              width: 50,
              height: 50,
              borderRadius: '50%',
              fontSize: 18,
              cursor: 'pointer',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Next"
          >
            ›
          </button>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .gallery-item-wrap { position: relative; }
        .gallery-item-wrap:hover img { transform: scale(1.02); filter: saturate(1) !important; }
        .gallery-item-hover {
          position: absolute; inset: 0; background: rgba(0,0,0,0.3); opacity: 0;
          display: flex; align-items: center; justify-content: center; transition: opacity 0.3s ease;
        }
        .gallery-item-wrap:hover .gallery-item-hover { opacity: 1; }
      ` }} />
    </>
  );
}