import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary connection setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file'); // Ensure frontend sends the image as 'file'

    if (!file) {
      return NextResponse.json({ success: false, error: 'File nahi mili' }, { status: 400 });
    }

    // File ko direct memory (buffer) mein read karna
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Direct Cloudinary par upload karna (bina local save kiye)
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'pankaj_studio_gallery' }, // Cloudinary mein is naam ka folder ban jayega
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer); // Buffer ko stream mein daal diya
    });

    // uploadResult.secure_url hi hamari photo ka asli live link hai
    return NextResponse.json({ success: true, url: uploadResult.secure_url }, { status: 200 });

  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ success: false, error: 'Cloudinary upload fail ho gaya' }, { status: 500 });
  }
}