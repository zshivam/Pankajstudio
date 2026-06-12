import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MediaProject from '@/models/MediaProject';
import { getAdminSession } from '@/lib/auth';
import { deleteUploadedImage } from '@/lib/upload';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });

    await connectDB();
    const project = await MediaProject.findById(id).lean();
    if (!project) return NextResponse.json({ success: false, error: 'Project not found.' }, { status: 404 });

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch project.' }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });

    await connectDB();
    const body = await request.json();

    const project = await MediaProject.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    ).lean();

    if (!project) return NextResponse.json({ success: false, error: 'Project not found.' }, { status: 404 });
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error('Admin PATCH project error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update project.' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });

    await connectDB();
    const project = await MediaProject.findByIdAndDelete(id).lean();
    if (!project) return NextResponse.json({ success: false, error: 'Project not found.' }, { status: 404 });

    // Delete associated local images
    if (project.coverImage?.url) {
      await deleteUploadedImage(project.coverImage.url);
    }
    for (const img of project.galleryImages || []) {
      if (img.url) await deleteUploadedImage(img.url);
    }

    return NextResponse.json({ success: true, message: 'Project deleted.' });
  } catch (error) {
    console.error('Admin DELETE project error:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete project.' }, { status: 500 });
  }
}
