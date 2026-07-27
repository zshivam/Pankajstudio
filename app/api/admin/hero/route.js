import { NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises'; // 🌟 unlink import kiya
import path from 'path';
import connectDB from '@/lib/mongodb';
import CarouselImage from '@/models/CarouselImage';

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

// POST: Admin panel se aayi nayi photo save karne ke liye
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.formData();
    const file = data.get('image');

    if (!file) return NextResponse.json({ success: false, error: 'No file found' }, { status: 400 });

    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);
    
    const filename = `hero-${Date.now()}-${file.name.replaceAll(' ', '_')}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'hero');
    
    try { await mkdir(uploadDir, { recursive: true }); } catch (e) {}

    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/hero/${filename}`;
    const newImage = await CarouselImage.create({ imageUrl, isActive: true });

    return NextResponse.json({ success: true, image: newImage });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
  }
}

// 🌟Photo delete karne ke liye
export async function DELETE(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const imageUrl = searchParams.get('imageUrl');

    if (!id) return NextResponse.json({ success: false, error: 'ID not provided' }, { status: 400 });

    // 1. Database se image delete karo
    await CarouselImage.findByIdAndDelete(id);

    // 2. Folder (public/uploads/hero) se original file delete karo
    if (imageUrl) {
      const filename = imageUrl.split('/').pop(); // URL se file ka naam nikala
      const filePath = path.join(process.cwd(), 'public', 'uploads', 'hero', filename);
      try {
        await unlink(filePath); 
      } catch (err) {
        console.log("File folder me nahi mili, par DB se delete ho gayi.");
      }
    }

    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ success: false, error: 'Delete failed' }, { status: 500 });
  }
}