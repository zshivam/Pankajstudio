'use client';

import { useState, useEffect } from 'react';
import GalleryUploader from './GalleryUploader';

export default function GalleryManager() {
  const [media, setMedia] = useState([]);
  const [subTab, setSubTab] = useState('images');
  
  // Bulk Image States
  const [newImages, setNewImages] = useState([]);
  const [savingImages, setSavingImages] = useState(false);

  // Video States
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [is4K, setIs4K] = useState(false);

  // 1. Fetch Existing Media
  useEffect(() => {
    fetch('/api/admin/gallery')
      .then(res => res.json())
      .then(data => setMedia(data.media || []))
      .catch(err => console.error('Error fetching gallery:', err));
  }, []);

  // 2. Delete Item
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMedia(prev => prev.filter(m => m._id !== id));
      } else {
        alert('Failed to delete item.');
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  // 3. Bulk Images Submit
  const handleBulkImageSubmit = async () => {
    if (newImages.length === 0) return;
    setSavingImages(true);
    
    const payload = newImages.map(img => ({ type: 'image', url: img.url }));

    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        const addedItems = Array.isArray(data.newMedia) ? data.newMedia : [data.newMedia].filter(Boolean);
        
        setMedia(prev => [...addedItems, ...prev]);
        setNewImages([]); 
        alert('Photos successfully dumped!');
      } else {
        alert('Failed to save photos.');
      }
    } catch (err) {
      console.error('Bulk image submit error:', err);
    } finally {
      setSavingImages(false);
    }
  };

  // 🌟 ENHANCED HELPER: Auto-convert YouTube Watch, Shorts & YouTu.be links
  const formatYouTubeUrl = (url) => {
    if (!url || typeof url !== 'string') return '';
    
    try {
      // 1. Standard YouTube Watch URL (youtube.com/watch?v=ID)
      if (url.includes('youtube.com/watch')) {
        const urlObj = new URL(url);
        const videoId = urlObj.searchParams.get('v');
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
      } 
      // 2. YouTube Shorts URL (youtube.com/shorts/ID)
      else if (url.includes('youtube.com/shorts/')) {
        const videoId = url.split('youtube.com/shorts/')[1]?.split('?')[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
      }
      // 3. Shortened YouTube URL (youtu.be/ID)
      else if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1]?.split('?')[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
      }
    } catch (e) {
      console.error('Error formatting URL:', e);
    }
    return url;
  };

  // 4. Single Video Submit
  const handleVideoSubmit = async (e) => {
    e.preventDefault();

    const finalEmbedUrl = formatYouTubeUrl(videoUrl);

    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'video', url: finalEmbedUrl, title: videoTitle, is4K })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.newMedia) {
          setMedia(prev => [data.newMedia, ...prev]);
        }
        setVideoUrl(''); 
        setVideoTitle(''); 
        setIs4K(false);
      } else {
        alert('Failed to add video.');
      }
    } catch (err) {
      console.error('Video submit error:', err);
    }
  };

  // 🌟 SAFE EMBED CHECK (Prevents undefined.includes crash)
  const isEmbed = (url) => {
    if (!url || typeof url !== 'string') return false;
    return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com');
  };

  const images = media.filter(m => m.type === 'image');
  const videos = media.filter(m => m.type === 'video');

  return (
    <div>
      {/* Sub Tabs */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 30 }}>
        <button 
          onClick={() => setSubTab('images')} 
          style={{ 
            padding: '10px 20px', 
            background: subTab === 'images' ? '#fff' : '#333', 
            color: subTab === 'images' ? '#000' : '#fff', 
            border: 'none', 
            borderRadius: 4, 
            cursor: 'pointer',
            fontWeight: subTab === 'images' ? 'bold' : 'normal'
          }}
        >
          🖼️ Photo Dump
        </button>
        <button 
          onClick={() => setSubTab('videos')} 
          style={{ 
            padding: '10px 20px', 
            background: subTab === 'videos' ? '#fff' : '#333', 
            color: subTab === 'videos' ? '#000' : '#fff', 
            border: 'none', 
            borderRadius: 4, 
            cursor: 'pointer',
            fontWeight: subTab === 'videos' ? 'bold' : 'normal'
          }}
        >
          🎬 4K Videos
        </button>
      </div>

      {/* 🟢 IMAGES TAB */}
      {subTab === 'images' && (
        <div>
          <div style={{ background: '#1a1a1a', padding: 24, borderRadius: 8, marginBottom: 30 }}>
            <p style={{ color: '#888', marginBottom: 15, fontSize: 13 }}>
              Select multiple photos and click "Save All to Gallery" below.
            </p>
            
            <GalleryUploader images={newImages} onChange={setNewImages} category="raw-dump" />
            
            {newImages.length > 0 && (
              <button 
                onClick={handleBulkImageSubmit} 
                disabled={savingImages}
                style={{ 
                  marginTop: 20, 
                  padding: '12px 24px', 
                  background: savingImages ? '#555' : '#d4af37', 
                  color: '#000', 
                  border: 'none', 
                  cursor: savingImages ? 'wait' : 'pointer', 
                  fontWeight: 'bold', 
                  borderRadius: 4 
                }}
              >
                {savingImages ? 'Saving to Database...' : `Save ${newImages.length} Photos to Gallery`}
              </button>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {images.map(img => (
              <div key={img._id} style={{ position: 'relative', height: 200, background: '#222', borderRadius: 8, overflow: 'hidden' }}>
                <img src={img.url} alt="Gallery" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button 
                  onClick={() => handleDelete(img._id)} 
                  style={{ 
                    position: 'absolute', 
                    top: 10, 
                    right: 10, 
                    background: '#dc3545', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '50%', 
                    width: 30, 
                    height: 30, 
                    cursor: 'pointer', 
                    fontSize: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Delete Image"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🟢 VIDEOS TAB */}
      {subTab === 'videos' && (
        <div>
          <div style={{ background: '#1a1a1a', padding: 24, borderRadius: 8, marginBottom: 30 }}>
            <p style={{ color: '#888', marginBottom: 15, fontSize: 13 }}>
              Paste any YouTube link here. We will auto-convert it to embed format.
            </p>

            <form onSubmit={handleVideoSubmit} style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <input 
                placeholder="Video Title" 
                value={videoTitle} 
                onChange={e => setVideoTitle(e.target.value)} 
                required 
                style={{ flex: 1, minWidth: '200px', padding: 12, background: '#333', border: 'none', color: '#fff', borderRadius: 4 }} 
              />
              
              <input 
                placeholder="Paste YouTube Link (e.g. https://youtu.be/...)" 
                value={videoUrl} 
                onChange={e => setVideoUrl(e.target.value)} 
                required 
                style={{ flex: 2, minWidth: '300px', padding: 12, background: '#333', border: 'none', color: '#fff', borderRadius: 4 }} 
              />

              <label style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap', cursor: 'pointer' }}>
                <input type="checkbox" checked={is4K} onChange={e => setIs4K(e.target.checked)} /> 4K Quality
              </label>

              <button type="submit" style={{ padding: '12px 24px', background: '#d4af37', color: '#000', border: 'none', cursor: 'pointer', borderRadius: 4, fontWeight: 'bold' }}>
                Add Video
              </button>
            </form>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 24 }}>
            {videos.map(vid => (
              <div key={vid._id} style={{ background: '#1a1a1a', padding: 20, borderRadius: 8, position: 'relative' }}>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, marginBottom: 16, background: '#000', borderRadius: 4, overflow: 'hidden' }}>
                  
                  {isEmbed(vid.url) ? (
                    <iframe 
                      src={vid.url} 
                      frameBorder="0" 
                      allow="autoplay; encrypted-media" 
                      allowFullScreen 
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
                    />
                  ) : (
                    <video 
                      src={vid.url} 
                      controls 
                      preload="metadata" 
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  )}
                  
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ color: '#fff', margin: '0 0 5px 0' }}>
                      {vid.title} {vid.is4K && <span style={{ color: '#d4af37', fontSize: 10 }}>[4K]</span>}
                    </h4>
                    <p style={{ color: '#888', fontSize: 11, margin: 0 }}>
                      {isEmbed(vid.url) ? 'YouTube Embed' : 'Direct Video'}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleDelete(vid._id)} 
                    style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}