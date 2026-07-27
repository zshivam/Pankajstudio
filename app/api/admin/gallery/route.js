import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';

export async function GET() {
  await connectDB();
  const media = await Gallery.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, media });
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  // if multiple images (Array)
  if (Array.isArray(body)) {
    const newMedia = await Gallery.insertMany(body);
    return NextResponse.json({ success: true, newMedia: newMedia });
  }

  // If single video (Object)
  const newMedia = await Gallery.create(body);
  return NextResponse.json({ success: true, newMedia });
}

export async function DELETE(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  await Gallery.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}