'use client';

import { useState } from 'react';

export default function AlbumGalleryGrid({ images = [], title = '' }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  if (!images.length) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', background: '#111', borderRadius: 12 }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>No additional album photos uploaded for this event yet.</p>
      </div>
    );
  }

  const openModal = (index) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);
  const prevImage = () => setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  const nextImage = () => setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));

  return (
    <>
      {/* Grid View */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {images.map((img, i) => {
          const imgUrl = typeof img === 'string' ? img : img.url;
          const altText = img.altText || `${title} photo ${i + 1}`;

          return (
            <div
              key={i}
              onClick={() => openModal(i)}
              style={{
                position: 'relative',
                aspectRatio: '4/3',
                background: '#1a1a1a',
                borderRadius: 8,
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'transform 0.2s ease',
              }}
              className="album-photo-card"
            >
              <img
                src={imgUrl}
                alt={altText}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          );
        })}
      </div>

      {/* Full-Screen Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: 32,
              cursor: 'pointer',
            }}
          >
            ✕
          </button>

          {/* Left Arrow */}
          <button
            onClick={prevImage}
            style={{
              position: 'absolute',
              left: 24,
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              padding: '16px 20px',
              borderRadius: '50%',
              fontSize: 20,
              cursor: 'pointer',
            }}
          >
            ◀
          </button>

          {/* Image display */}
          <div style={{ maxWidth: '90vw', maxHeight: '85vh' }}>
            <img
              src={typeof images[selectedIndex] === 'string' ? images[selectedIndex] : images[selectedIndex].url}
              alt="Album View"
              style={{ maxWidth: '100%', maxHeight: '85vh', objectFit: 'contain', borderRadius: 8 }}
            />
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', marginTop: 12, fontFamily: '"DM Mono", monospace', fontSize: 11 }}>
              {selectedIndex + 1} / {images.length}
            </p>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextImage}
            style={{
              position: 'absolute',
              right: 24,
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              padding: '16px 20px',
              borderRadius: '50%',
              fontSize: 20,
              cursor: 'pointer',
            }}
          >
            ▶
          </button>
        </div>
      )}
    </>
  );
}