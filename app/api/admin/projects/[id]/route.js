import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MediaProject from '@/models/MediaProject';
import { getAdminSession } from '@/lib/auth';
import { deleteUploadedImage } from '@/lib/upload';
import { slugify } from '@/lib/utils';

export const dynamic = 'force-dynamic';

// Helper: Sanitize slug to match Mongoose Regex (/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
const generateValidSlug = (text) => {
  if (!text || typeof text !== 'string') return 'project';
  const raw = slugify ? slugify(text) : text;
  return raw
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// 1. GET: Fetch a single project by ID
export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }

    await connectDB();
    const project = await MediaProject.findById(id).lean();
    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: project, project });
  } catch (error) {
    console.error('Admin GET /api/admin/projects/[id] error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch project.' }, { status: 500 });
  }
}

// 2. UPDATE: Handles both PUT and PATCH requests
async function updateProjectHandler(request, { params }) {
  const { id } = await params;
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();

    // Sanitize slug if provided or generated from title
    if (body.slug) {
      body.slug = generateValidSlug(body.slug);
    } else if (body.title) {
      body.slug = generateValidSlug(body.title);
    }

    // Convert empty eventDate string ("") to null to prevent CastError
    if (body.eventDate !== undefined) {
      body.eventDate = body.eventDate ? new Date(body.eventDate) : null;
    }

    // Format tags if passed as comma-separated string
    if (typeof body.tags === 'string') {
      body.tags = body.tags.split(',').map((t) => t.trim()).filter(Boolean);
    }

    const project = await MediaProject.findByIdAndUpdate(
      id,
      { $set: body },
      { returnDocument: 'after', runValidators: true }
    ).lean();

    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: project, project });
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: 'A project with this slug already exists.' }, { status: 409 });
    }
    console.error('Admin UPDATE project error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to update project.' }, { status: 500 });
  }
}

export const PUT = updateProjectHandler;
export const PATCH = updateProjectHandler;

// 3. DELETE: Remove project and associated media files
export async function DELETE(request, { params }) {
  const { id } = await params;
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }

    await connectDB();
    const project = await MediaProject.findByIdAndDelete(id).lean();
    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found.' }, { status: 404 });
    }

    // Clean up uploaded cover image and gallery images safely
    try {
      if (project.coverImage?.url && typeof deleteUploadedImage === 'function') {
        await deleteUploadedImage(project.coverImage.url);
      }
      if (Array.isArray(project.galleryImages) && typeof deleteUploadedImage === 'function') {
        for (const img of project.galleryImages) {
          if (img?.url) await deleteUploadedImage(img.url);
        }
      }
    } catch (imgErr) {
      console.warn('Image cleanup warning:', imgErr);
    }

    return NextResponse.json({ success: true, message: 'Project deleted successfully.' });
  } catch (error) {
    console.error('Admin DELETE project error:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete project.' }, { status: 500 });
  }
}