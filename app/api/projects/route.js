import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MediaProject from '@/models/MediaProject';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'all';
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 60);
    const skip = parseInt(searchParams.get('skip') || '0');

    const query = { isPublished: true };
    if (category !== 'all') query.category = category;

    const [projects, total] = await Promise.all([
      MediaProject.find(query).sort({ featured: -1, sortOrder: -1, eventDate: -1 }).skip(skip).limit(limit)
        .select('title slug category storyHighlight coverImage location eventDate is4K featured videoDuration').lean(),
      MediaProject.countDocuments(query),
    ]);

    return NextResponse.json({ success: true, data: projects, pagination: { total, limit, skip, hasMore: skip + limit < total } });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch projects.' }, { status: 500 });
  }
}
