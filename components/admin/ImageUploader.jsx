'use client';

import { useState, useRef, useCallback } from 'react';

/**
 * ImageUploader
 * Props:
 *   onUpload(imageObj)  — called with { url, width, height, blurDataUrl, filename, altText }
 *   category            — subfolder in /uploads/ (e.g. "weddings")
 *   type                — "cover" | "gallery"
 *   label               — display label
 *   currentImage        — existing image object to preview
 */
export default function ImageUploader({ onUpload, category = 'general', type = 'cover', label = 'Upload Image', currentImage = null }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage?.url || null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleFile = useCallback(async (file) => {
    if (!file) return;

    // Client-side validation
    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Only JPEG, PNG, and WebP files allowed.');
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setError('File too large. Max 15MB.');
      return;
    }

    setError('');
    setUploading(true);
    setProgress(10);

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setProgress(30);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    formData.append('type', type);

    try {
      setProgress(50);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      setProgress(80);
      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Upload failed.');
        setPreview(currentImage?.url || null);
        setUploading(false);
        setProgress(0);
        return;
      }

      setPreview(data.image.url);
      setProgress(100);
      onUpload(data.image);
      URL.revokeObjectURL(localUrl);
    } catch {
      setError('Upload failed. Please try again.');
      setPreview(currentImage?.url || null);
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 800);
    }
  }, [category, type, onUpload, currentImage]);

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleChange(e) {
    const file = e.target.files[0];
    if (file) handleFile(file);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={labelStyle}>{label}</label>

      {/* Drop zone */}
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        style={{
          position: 'relative',
          border: `1px dashed ${dragOver ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.15)'}`,
          background: dragOver ? 'rgba(255,255,255,0.04)' : '#111',
          cursor: uploading ? 'wait' : 'pointer',
          transition: 'all 0.2s',
          overflow: 'hidden',
          minHeight: preview ? 'auto' : 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Preview */}
        {preview ? (
          <div style={{ position: 'relative', width: '100%' }}>
            <img
              src={preview}
              alt="Preview"
              style={{ width: '100%', maxHeight: 280, objectFit: 'cover', display: 'block' }}
            />
            {!uploading && (
              <div style={{
                position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: 0, transition: 'all 0.2s',
              }} className="img-overlay">
                <span style={{ fontSize: 11, color: '#fff', fontFamily: '"DM Mono", monospace', letterSpacing: '0.12em', textTransform: 'uppercase', background: 'rgba(0,0,0,0.7)', padding: '8px 16px' }}>
                  Click to replace
                </span>
              </div>
            )}
          </div>
        ) : (
          <div style={{ padding: 32, textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 12, opacity: 0.4 }}>📷</div>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>
              Drag & drop or click to upload
            </p>
            <p style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              JPEG · PNG · WebP · Max 15MB
            </p>
          </div>
        )}

        {/* Progress bar */}
        {uploading && progress > 0 && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.1)' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: '#fff', transition: 'width 0.3s ease' }} />
          </div>
        )}

        {/* Uploading overlay */}
        {uploading && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, color: '#fff', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Uploading...
            </p>
          </div>
        )}
      </div>

      {error && (
        <p style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, color: '#ff6b6b', letterSpacing: '0.05em' }}>
          {error}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleChange}
        style={{ display: 'none' }}
      />

      <style>{`.img-overlay:hover { opacity: 1 !important; background: rgba(0,0,0,0.45) !important; }`}</style>
    </div>
  );
}

const labelStyle = {
  fontFamily: '"DM Mono", monospace',
  fontSize: 9,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.4)',
};
