"use client";
import { useState, useEffect } from 'react';

export default function ManageHero() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/admin/hero');
      const data = await res.json();
      if (data.success) setImages(data.images);
    } catch (error) {
      console.error("Failed to fetch images", error);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/admin/hero', {
        method: 'POST',
        body: formData,
      });
      
      if (res.ok) {
        fetchImages();
        e.target.value = null;
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      console.error("Upload error", error);
    }
    setUploading(false);
  };

  // 🌟 NAYA FUNCTION: Photo delete karne ke liye
  const handleDelete = async (id, imageUrl) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this photo?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/admin/hero?id=${id}&imageUrl=${imageUrl}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        // Delete hote hi screen se photo turant hata do
        setImages(images.filter((img) => img._id !== id));
      } else {
        alert("Failed to delete the image.");
      }
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Welcome Carousel</h1>
      <h2>This is the carousel part that show at the very first after opening of website</h2>
      {/* <h3>yaha pe sbse pehle transiton image dikhne wale photos upload honge</h3> */}
      
      {/* Upload Box */}
      <div className="mb-10 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Upload New Carousel Image (HD recommended)</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleUpload} 
          disabled={uploading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-neutral-900 file:text-white hover:file:bg-neutral-800 transition-colors cursor-pointer"
        />
        {uploading && <p className="text-sm text-green-600 mt-3 font-medium animate-pulse">Uploading image... Please wait.</p>}
      </div>

      {/* Gallery View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img._id} className="relative h-64 rounded-xl overflow-hidden shadow-md group bg-gray-100">
            <img src={img.imageUrl} alt="Hero image" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
               <span className="text-white font-medium bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">Active in Carousel</span>
               
               {/* 🌟DELETE BUTTON */}
               <button 
                 onClick={() => handleDelete(img._id, img.imageUrl)}
                 className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-2 px-4 rounded shadow-lg transition-colors"
               >
                 🗑️ Delete Image
               </button>
            </div>
          </div>
        ))}
        {images.length === 0 && !uploading && (
          <p className="text-gray-500 col-span-full text-center py-10">No images uploaded yet. Upload your first masterpiece!</p>
        )}
      </div>
    </div>
  );
}