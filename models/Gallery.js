import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  type: { type: String, enum: ['image', 'video'], required: true },
  url: { type: String, required: true },
  title: { type: String, default: '' },
  is4K: { type: Boolean, default: false }
}, { timestamps: true });

const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);

// Ye line sabse zaroori hai error hatane ke liye 👇
export default Gallery;