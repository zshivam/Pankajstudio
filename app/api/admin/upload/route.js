import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import MediaProject from '@/models/MediaProject';
import { saveUploadedImage, generateBlurPlaceholder } from '@/lib/upload';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    // Auth check
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const category = formData.get('category') || 'general';
    const type = formData.get('type') || 'cover'; // 'cover' or 'gallery'

    if (!file || typeof file === 'string') {
      return NextResponse.json({ success: false, error: 'No file provided.' }, { status: 400 });
    }

    // Save image (compressed + resized via sharp)
    const options = type === 'cover'
      ? { maxWidth: 1920, maxHeight: 1280, quality: 85 }
      : { maxWidth: 2400, maxHeight: 1600, quality: 82 };

    const result = await saveUploadedImage(file, category, options);

    // Generate blur placeholder for Next.js Image
    const blurDataUrl = await generateBlurPlaceholder(result.url);

    return NextResponse.json({
      success: true,
      image: {
        url: result.url,
        width: result.width,
        height: result.height,
        blurDataUrl,
        filename: result.filename,
        altText: '',
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Upload failed.' }, { status: 500 });
  }
}
