import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import connectDB from '@/lib/mongodb';
import CarouselImage from '@/models/CarouselImage';

// Cloudinary connection setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET: Frontend ko saari hero images bhejne ke liye
export async function GET() {
  try {
    await connectDB();
    const images = await CarouselImage.find({ isActive: true }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, images });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch images' }, { status: 500 });
  }
}

// POST: Admin panel se aayi nayi photo Cloudinary + DB me save karne ke liye
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.formData();
    
    // Frontend se image nikalna (Pichle code mein aapne 'image' naam diya tha)
    const file = data.get('image') || data.get('file');

    if (!file) return NextResponse.json({ success: false, error: 'No file found' }, { status: 400 });

    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);

    // Direct Cloudinary par upload karna (bina local save kiye)
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'pankaj_studio_hero' }, 
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    // Cloudinary ka live link MongoDB me save karna (Aapke model me 'imageUrl' hai)
    const newImage = await CarouselImage.create({ 
      imageUrl: uploadResult.secure_url, 
      isActive: true 
    });

    return NextResponse.json({ success: true, image: newImage });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
  }
}

// DELETE: Photo delete karne ke liye
export async function DELETE(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const imageUrl = searchParams.get('imageUrl');

    if (!id) return NextResponse.json({ success: false, error: 'ID not provided' }, { status: 400 });

    // 1. Database se image delete karo
    await CarouselImage.findByIdAndDelete(id);

    // 2. Cloudinary se original file delete karo (Optional but good for storage)
    if (imageUrl && imageUrl.includes('cloudinary')) {
      const urlParts = imageUrl.split('/');
      const filename = urlParts[urlParts.length - 1];
      const publicId = 'pankaj_studio_hero/' + filename.split('.')[0];
      
      await cloudinary.uploader.destroy(publicId);
    }

    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ success: false, error: 'Delete failed' }, { status: 500 });
  }
}