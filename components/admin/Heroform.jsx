'use client';
import { useState, useEffect } from 'react';

export default function HeroForm() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  // 1. Existing Carousel images load karo
  useEffect(() => {
    fetch('/api/admin/hero') 
      .then(res => res.json())
      .then(data => setImages(data.images || []));
  }, []);

  // 2. Add New Image
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/admin/hero', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, imageUrl: url, isActive: true })
    });
    
    if (res.ok) {
      alert("Banner Added!");
      window.location.reload();
    }
  };

  // 3. Delete function
  const handleDelete = async (id) => {
    if(!confirm("Sure delete this banner?")) return;
    await fetch(`/api/admin/hero?id=${id}`, { method: 'DELETE' });
    setImages(images.filter(img => img._id !== id));
  };

  return (
    <div style={{ color: '#fff' }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: 40, display: 'flex', gap: 10 }}>
        <input placeholder="Image Title" onChange={(e) => setTitle(e.target.value)} style={{ padding: 10, background: '#333', border: 'none', color: '#fff' }} />
        <input placeholder="Image URL" onChange={(e) => setUrl(e.target.value)} style={{ padding: 10, background: '#333', border: 'none', color: '#fff', flex: 1 }} />
        <button type="submit" style={{ padding: '10px 20px', background: '#d4af37', border: 'none', cursor: 'pointer' }}>Add</button>
      </form>

      <div style={{ display: 'grid', gap: 10 }}>
        {images.map(img => (
          <div key={img._id} style={{ display: 'flex', justifyContent: 'space-between', padding: 15, background: '#222', borderRadius: 4 }}>
            <span>{img.title}</span>
            <button onClick={() => handleDelete(img._id)} style={{ background: '#dc3545', border: 'none', color: '#fff', padding: '5px 10px', cursor: 'pointer' }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}