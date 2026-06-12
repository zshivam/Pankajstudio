import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MediaProject from '@/models/MediaProject';
import { getAdminSession } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });

    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const skip = (page - 1) * limit;

    const query = {};
    if (category && category !== 'all') query.category = category;

    const [projects, total] = await Promise.all([
      MediaProject.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('title slug category coverImage isPublished featured is4K eventDate createdAt')
        .lean(),
      MediaProject.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: projects,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('Admin GET /api/admin/projects error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch projects.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });

    await connectDB();
    const body = await request.json();

    // Auto-generate slug from title if not provided
    if (!body.slug && body.title) {
      body.slug = slugify(body.title);
    }

    // Validate required fields
    if (!body.title) return NextResponse.json({ success: false, error: 'Title is required.' }, { status: 400 });
    if (!body.category) return NextResponse.json({ success: false, error: 'Category is required.' }, { status: 400 });
    if (!body.coverImage?.url) return NextResponse.json({ success: false, error: 'Cover image is required.' }, { status: 400 });

    const project = await MediaProject.create(body);
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: 'A project with this slug already exists.' }, { status: 409 });
    }
    console.error('Admin POST /api/admin/projects error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create project.' }, { status: 500 });
  }
}
