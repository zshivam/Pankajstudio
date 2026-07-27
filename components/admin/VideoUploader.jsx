'use client';
import { useState, useRef } from 'react';

export default function VideoUploader({ onUpload, category = 'video' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Sirf Video Formats Accept Karo
    if (!file.type.startsWith('video/')) {
      setError('Please select a valid video file (MP4, MOV, etc).');
      return;
    }

    // 2. Size Limit 300MB (300 * 1024 * 1024 bytes)
    if (file.size > 300 * 1024 * 1024) {
      setError('File size exceeds the 300MB limit.');
      return;
    }

    setError('');
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);

    try {
      // 🌟 Yahan aapko apna upload wala API route check karna hai.
      // Agar aapka image uploader kisi aur API par bhejta hai, toh isse update kar lena.
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        // Upload hone ke baad URL wapas bhej do
        onUpload({ url: data.url }); 
      } else {
        setError('Upload failed. Check server limits.');
      }
    } catch (err) {
      setError('Network error during upload. File might be too large.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div style={{ flex: 1 }}>
      <input
        type="file"
        accept="video/mp4,video/x-m4v,video/*"
        onChange={handleFileChange}
        disabled={uploading}
        ref={fileInputRef}
        style={{ padding: '10px', background: '#222', color: '#fff', borderRadius: 4, width: '100%', border: '1px dashed #555' }}
      />
      {uploading && <p style={{ color: '#c9a84c', fontSize: 12, marginTop: 8 }}>⏳ Uploading 4K Video... Please wait, this may take a few minutes.</p>}
      {error && <p style={{ color: '#dc3545', fontSize: 12, marginTop: 8 }}>❌ {error}</p>}
    </div>
  );
}