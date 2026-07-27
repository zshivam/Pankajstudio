import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MediaProject from '@/models/MediaProject';
import { getAdminSession } from '@/lib/auth';
import { deleteUploadedImage } from '@/lib/upload';

export const dynamic = 'force-dynamic';

// 🌟 HELPER: Slug ko hamesha 'lowercase-hyphen-separated' format me convert karne ke liye
const generateValidSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       // Spaces ko hyphens se replace karta hai
    .replace(/[^\w-]+/g, '')    // Special characters ko remove karta hai
    .replace(/--+/g, '-');      // Ek se zyada hyphens ko single hyphen banata hai
};

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

    // 🌟 THE FIX: Agar admin space wala slug bhejta hai, toh use sahi format me auto-correct karo
    if (body.slug) {
      body.slug = generateValidSlug(body.slug);
    } else if (body.title) {
      body.slug = generateValidSlug(body.title); // Agar title change ho raha hai toh naya slug banao
    }

    const project = await MediaProject.findByIdAndUpdate(
      id,
      { $set: body },
      { returnDocument: 'after', runValidators: true } // 🌟 FIXED: 'new: true' warning removed
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