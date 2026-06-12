import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MediaProject from '@/models/MediaProject';

export async function GET(request, { params }) {
  const { slug } = await params;
  try {
    await connectDB();
    const project = await MediaProject.findOne({ slug, isPublished: true }).lean();
    if (!project) return NextResponse.json({ success: false, error: 'Not found.' }, { status: 404 });
    return NextResponse.json({ success: true, data: project });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch project.' }, { status: 500 });
  }
}
