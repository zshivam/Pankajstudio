'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CinemaForm() {
  const router = useRouter();
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  // 1. Database se Cinema Lounge ki videos laao
  useEffect(() => {
    fetch('/api/admin/cinema-lounge')
      .then(res => res.json())
      .then(data => setVideos(data.videos || []));
  }, []);

  // 2. Nayi video add karo
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/admin/cinema-lounge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, videoUrl: url })
    });
    
    if (res.ok) {
      alert("Cinema Video Added!");
      setTitle('');
      setUrl('');
      
      // 🌟 FIX: Yahan galti se purana URL tha, ab ye Dashboard par hi rahega
      router.push('/admin/dashboard?tab=cinema');
      router.refresh(); 
      window.location.reload(); // List turant update karne ke liye
    }
  };

  // 3. Delete function
  const handleDelete = async (id) => {
    if(!confirm("Are you sure you want to delete this Cinema video?")) return;
    await fetch(`/api/admin/cinema-lounge?id=${id}`, { method: 'DELETE' });
    setVideos(videos.filter(v => v._id !== id));
  };

  return (
    <div style={{ color: '#fff' }}>
      <p style={{ color: '#888', marginBottom: 20 }}>Manage your main website Cinema Lounge highlights here.</p>
      
      {/* ADD FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 40, display: 'flex', gap: 10 }}>
        <input 
          placeholder="Video Title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
          style={{ padding: 10, background: '#333', border: 'none', color: '#fff', borderRadius: 4 }} 
        />
        <input 
          placeholder="YouTube/Vimeo Embed URL" 
          value={url}
          onChange={(e) => setUrl(e.target.value)} 
          style={{ padding: 10, background: '#333', border: 'none', color: '#fff', flex: 1, borderRadius: 4 }} 
        />
        <button type="submit" style={{ padding: '10px 20px', background: '#d4af37', border: 'none', cursor: 'pointer', borderRadius: 4, fontWeight: 'bold' }}>
          Add to Cinema Lounge
        </button>
      </form>

      {/* VIDEO LIST */}
      <div style={{ display: 'grid', gap: 10 }}>
        {videos.length > 0 ? videos.map(v => (
          <div key={v._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 15, background: '#222', borderRadius: 4 }}>
            <div>
              <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{v.title}</p>
              <p style={{ margin: 0, fontSize: 11, color: '#888' }}>{v.videoUrl}</p>
            </div>
            <button onClick={() => handleDelete(v._id)} style={{ background: '#dc3545', border: 'none', color: '#fff', padding: '5px 15px', cursor: 'pointer', borderRadius: 4 }}>
              Delete
            </button>
          </div>
        )) : (
          <p style={{ color: '#666' }}>No Cinema videos found.</p>
        )}
      </div>
    </div>
  );
}