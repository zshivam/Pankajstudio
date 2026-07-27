import mongoose from 'mongoose';

const carouselImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// 🌟 Yeh rahi humari default export line
const CarouselImage = mongoose.models.CarouselImage || mongoose.model('CarouselImage', carouselImageSchema);

export default CarouselImage;