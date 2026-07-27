import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import CinemaVideo from '@/models/CinemaVideo';
import { getAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const videos = await CinemaVideo.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: videos });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch videos' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const body = await request.json();

    if (!body.title || !body.videoUrl) {
      return NextResponse.json({ success: false, error: 'Title and Video URL are required' }, { status: 400 });
    }

    const video = await CinemaVideo.create(body);
    return NextResponse.json({ success: true, data: video }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to add video' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ success: false, error: 'Video ID required' }, { status: 400 });

    await CinemaVideo.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete video' }, { status: 500 });
  }
}