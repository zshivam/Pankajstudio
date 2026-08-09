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
    const file = data.get('file'); // Image File
    const category = data.get('category') || 'general'; // Folder Category

    if (!file) {
      return NextResponse.json({ success: false, error: 'File nahi mili' }, { status: 400 });
    }

    // File ko buffer me convert karna
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Dynamic folder structure in Cloudinary
    const folderName = `pankaj_studio/${category}`;

    // Cloudinary upload stream
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: folderName },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    // 🌟 Schema Compatible Image Object
    const imageObj = {
      url: uploadResult.secure_url,
      width: uploadResult.width || 0,
      height: uploadResult.height || 0,
      filename: file.name || uploadResult.original_filename || '',
      altText: '',
    };

    // 🌟 Both 'url' and 'image' object returned for 100% compatibility across all components
    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      image: imageObj,
    }, { status: 200 });

  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ success: false, error: 'Cloudinary upload fail ho gaya' }, { status: 500 });
  }
}