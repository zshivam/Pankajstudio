'use client';

import { useState } from 'react';
import GalleryLightbox from './GalleryLightbox';

export default function GalleryView({ images = [], videos = [] }) {
  const [activeTab, setActiveTab] = useState('photos'); // 'photos' | 'videos'

  return (
    <div>
      {/* 🌟 TAB SWITCHER BUTTONS 🌟 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 50, flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('photos')}
          style={{
            padding: '12px 28px',
            borderRadius: 30,
            border: activeTab === 'photos' ? '1px solid #d4af37' : '1px solid rgba(255,255,255,0.15)',
            background: activeTab === 'photos' ? '#d4af37' : 'rgba(255,255,255,0.05)',
            color: activeTab === 'photos' ? '#000000' : '#ffffff',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: activeTab === 'photos' ? '0 4px 20px rgba(212,175,55,0.35)' : 'none'
          }}
        >
          📷 Photo Gallery ({images.length})
        </button>

        <button
          onClick={() => setActiveTab('videos')}
          style={{
            padding: '12px 28px',
            borderRadius: 30,
            border: activeTab === 'videos' ? '1px solid #d4af37' : '1px solid rgba(255,255,255,0.15)',
            background: activeTab === 'videos' ? '#d4af37' : 'rgba(255,255,255,0.05)',
            color: activeTab === 'videos' ? '#000000' : '#ffffff',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: activeTab === 'videos' ? '0 4px 20px rgba(212,175,55,0.35)' : 'none'
          }}
        >
          🎬 Video Gallery ({videos.length})
        </button>
      </div>

      {/* 📷 PHOTOS TAB CONTENT */}
      {activeTab === 'photos' && (
        <div>
          {images.length > 0 ? (
            <GalleryLightbox images={images} title="Pankaj Studio Gallery" />
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 20px', background: '#111', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono, monospace)', fontSize: 12 }}>
                No photo frames available in gallery.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 🎬 VIDEOS TAB CONTENT */}
      {activeTab === 'videos' && (
        <div>
          {videos.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 28 }}>
              {videos.map((v) => (
                <div key={v.id} style={{ background: '#111', borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                  {/* YouTube Player */}
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, background: '#000' }}>
                    <iframe
                      src={v.embedUrl}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={v.title}
                    />
                  </div>
                  {/* Info Bar */}
                  <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: 4 }}>
                        {v.category?.replace(/-/g, ' ')}
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-display, serif)', fontSize: 18, fontStyle: 'italic', fontWeight: 300, color: '#fff' }}>
                        {v.title}
                      </h3>
                    </div>
                    {v.is4K && (
                      <span style={{ background: 'linear-gradient(135deg,#e8d5a3,#d4af37)', color: '#000', fontSize: 8, fontWeight: 'bold', padding: '3px 8px', borderRadius: 2, fontFamily: 'var(--font-mono, monospace)' }}>
                        4K ULTRA HD
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 20px', background: '#111', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono, monospace)', fontSize: 12 }}>
                No video films available in gallery.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}