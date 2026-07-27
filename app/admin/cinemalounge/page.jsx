'use client';
import { useState, useEffect } from 'react';

export default function CinemaLoungeAdmin() {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState({ title: '', videoUrl: '', caption: '' });
  const [loading, setLoading] = useState(false);

  // Load Videos on Page Load
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    // 🌟 Ye wahi safe API hai jahan se main website data utha rahi hai
    const res = await fetch('/api/admin/cinemalounge');
    const json = await res.json();
    if (json.success) setVideos(json.data);
  };

  // Add New Video
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/admin/cinemalounge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const json = await res.json();
    setLoading(false);
    
    if (json.success) {
      setForm({ title: '', videoUrl: '', caption: '' }); 
      fetchVideos(); 
      alert('Video Added Successfully!');
    } else {
      alert(json.error || 'Something went wrong');
    }
  };

  // Delete Video
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this video?')) return;
    
    const res = await fetch(`/api/admin/cinemalounge?id=${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) {
      fetchVideos(); 
    } else {
      alert('Failed to delete video');
    }
  };

  return (
    <div style={{ maxWidth: 800 }}>
      <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 36, marginBottom: 24, fontStyle: 'italic', fontWeight: 300, color: '#fff' }}>
        🎬 Manage Cinema Lounge
      </h1>
      
      {/* ADD VIDEO FORM */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, background: '#1a1a1a', padding: 24, borderRadius: 8, marginBottom: 40, border: '1px solid rgba(255,255,255,0.07)' }}>
        <h2 style={{ fontSize: 18, marginBottom: 8, fontWeight: 500, color: '#fff' }}>Add New Video</h2>
        <input 
          type="text" placeholder="Video Title (e.g., Royal Wedding)" 
          value={form.title} onChange={e => setForm({...form, title: e.target.value})}
          style={{ padding: 12, borderRadius: 4, background: '#333', border: 'none', color: '#fff', outline: 'none' }} required
        />
        <input 
          type="url" placeholder="YouTube Embed URL (e.g., https://www.youtube.com/embed/XYZ)" 
          value={form.videoUrl} onChange={e => setForm({...form, videoUrl: e.target.value})}
          style={{ padding: 12, borderRadius: 4, background: '#333', border: 'none', color: '#fff', outline: 'none' }} required
        />
        <button type="submit" disabled={loading} style={{ padding: 12, background: '#d4af37', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: 4, cursor: loading ? 'wait' : 'pointer' }}>
          {loading ? 'Adding...' : '+ Add Video to Lounge'}
        </button>
      </form>

      {/* UPLOADED VIDEOS LIST */}
      <div>
        <h2 style={{ fontSize: 20, marginBottom: 16, fontWeight: 500, color: '#fff' }}>Live Videos on Website ({videos.length})</h2>
        {videos.length === 0 ? <p style={{ color: '#666' }}>No videos uploaded yet.</p> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {videos.map(v => (
              <div key={v._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8 }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4, color: '#fff' }}>{v.title}</h3>
                  <p style={{ color: '#888', fontSize: 12, margin: 0 }}>{v.videoUrl}</p>
                </div>
                <button onClick={() => handleDelete(v._id)} style={{ padding: '8px 16px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}