import GalleryManager from '@/components/admin/GalleryManager';

export const metadata = { title: 'Raw Media Gallery — Admin' };

export default function GalleryPage() {
  return (
    <div style={{ maxWidth: 1200 }}>
      <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 36, fontWeight: 300, fontStyle: 'italic', color: '#fff', marginBottom: 24 }}>
        Gallery
      </h1>
      <p style={{ fontSize: 14, color: '#888', marginBottom: 40 }}>Dump your images and 4K videos here to show on the Gallery.</p>
      
      <GalleryManager />
    </div>
  );
}