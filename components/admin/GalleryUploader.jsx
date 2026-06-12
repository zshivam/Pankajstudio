'use client';

import { useState, useRef, useCallback } from 'react';

/**
 * GalleryUploader
 * Props:
 *   images          — current array of image objects
 *   onChange(imgs)  — called when the gallery changes
 *   category        — upload subfolder
 */
export default function GalleryUploader({ images = [], onChange, category = 'general' }) {
  const [uploading, setUploading] = useState(false);
  const [uploadQueue, setUploadQueue] = useState(0);
  const [errors, setErrors] = useState([]);
  const inputRef = useRef(null);

  const uploadFile = useCallback(async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    formData.append('type', 'gallery');

    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Upload failed');
    return data.image;
  }, [category]);

  async function handleFiles(files) {
    const fileArray = Array.from(files).filter((f) =>
      ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(f.type)
    );

    if (!fileArray.length) return;
    if (images.length + fileArray.length > 60) {
      setErrors(['Maximum 60 gallery images allowed.']);
      return;
    }

    setErrors([]);
    setUploading(true);
    setUploadQueue(fileArray.length);

    const newImages = [...images];
    const errs = [];

    for (const file of fileArray) {
      try {
        const img = await uploadFile(file);
        newImages.push(img);
        setUploadQueue((q) => q - 1);
      } catch (e) {
        errs.push(`${file.name}: ${e.message}`);
        setUploadQueue((q) => q - 1);
      }
    }

    setUploading(false);
    setErrors(errs);
    onChange(newImages);
  }

  function removeImage(index) {
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  }

  function moveImage(from, to) {
    if (to < 0 || to >= images.length) return;
    const updated = [...images];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    onChange(updated);
  }

  function updateAltText(index, altText) {
    const updated = images.map((img, i) => i === index ? { ...img, altText } : img);
    onChange(updated);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label style={labelStyle}>Gallery Images ({images.length}/60)</label>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading || images.length >= 60}
          style={{
            padding: '7px 16px', background: 'transparent',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.7)', fontFamily: '"DM Mono", monospace',
            fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
        >
          {uploading ? `Uploading ${uploadQueue} left...` : '+ Add Photos'}
        </button>
      </div>

      {errors.length > 0 && (
        <div style={{ background: 'rgba(255,100,100,0.1)', border: '1px solid rgba(255,100,100,0.2)', padding: '12px 16px' }}>
          {errors.map((e, i) => (
            <p key={i} style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, color: '#ff8080', marginBottom: 4 }}>{e}</p>
          ))}
        </div>
      )}

      {/* Gallery grid */}
      {images.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
          {images.map((img, i) => (
            <div key={i} style={{ position: 'relative', background: '#111', border: '1px solid rgba(255,255,255,0.07)' }}>
              {/* Image */}
              <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                <img src={img.url} alt={img.altText || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>

              {/* Controls overlay */}
              <div style={{ padding: '8px 8px 6px', background: '#0a0a0a' }}>
                {/* Alt text */}
                <input
                  type="text"
                  value={img.altText || ''}
                  onChange={(e) => updateAltText(i, e.target.value)}
                  placeholder="Alt text..."
                  style={{
                    width: '100%', background: 'transparent', border: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.6)', fontFamily: '"DM Sans", sans-serif',
                    fontSize: 10, padding: '4px 0', marginBottom: 6,
                    boxSizing: 'border-box',
                  }}
                />
                {/* Action buttons */}
                <div style={{ display: 'flex', gap: 4 }}>
                  <button type="button" onClick={() => moveImage(i, i - 1)} disabled={i === 0}
                    style={smallBtnStyle} title="Move left">◀</button>
                  <button type="button" onClick={() => moveImage(i, i + 1)} disabled={i === images.length - 1}
                    style={smallBtnStyle} title="Move right">▶</button>
                  <button type="button" onClick={() => removeImage(i)}
                    style={{ ...smallBtnStyle, marginLeft: 'auto', color: '#ff8080' }} title="Remove">✕</button>
                </div>
              </div>

              {/* Position badge */}
              <span style={{
                position: 'absolute', top: 6, left: 6, background: 'rgba(0,0,0,0.7)',
                fontFamily: '"DM Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.6)',
                padding: '2px 6px',
              }}>
                {i + 1}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          style={{
            border: '1px dashed rgba(255,255,255,0.12)', padding: '40px 20px',
            textAlign: 'center', cursor: 'pointer', background: '#111',
          }}
        >
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 6 }}>
            No gallery images yet
          </p>
          <p style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Click to add photos
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        multiple
        onChange={(e) => handleFiles(e.target.files)}
        style={{ display: 'none' }}
      />
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

const smallBtnStyle = {
  padding: '3px 7px', background: 'transparent',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'rgba(255,255,255,0.4)', fontSize: 9,
  cursor: 'pointer', lineHeight: 1,
};
