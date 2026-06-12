import { writeFile, mkdir, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import sharp from 'sharp';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

/**
 * Ensure the uploads directory and category subdirectory exist.
 */
async function ensureDir(category = 'general') {
  const dir = path.join(UPLOAD_DIR, category);
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
  return dir;
}

/**
 * Generate a safe unique filename.
 */
function generateFilename(originalName) {
  const ext = path.extname(originalName).toLowerCase() || '.jpg';
  const base = path
    .basename(originalName, ext)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 40);
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 7);
  return `${base}-${timestamp}-${random}${ext}`;
}

/**
 * Process and save an uploaded image file.
 *
 * @param {File} file         — Web File object from FormData
 * @param {string} category   — subfolder name (e.g. 'weddings', 'covers')
 * @param {object} options    — { maxWidth, maxHeight, quality }
 * @returns {{ url, width, height, size, filename }}
 */
export async function saveUploadedImage(file, category = 'general', options = {}) {
  const { maxWidth = 2400, maxHeight = 1600, quality = 85 } = options;

  // Validate type
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(`Invalid file type: ${file.type}. Allowed: JPEG, PNG, WebP`);
  }

  // Validate size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Max 15MB.`);
  }

  const dir = await ensureDir(category);
  const filename = generateFilename(file.name);
  const filepath = path.join(dir, filename);

  // Read file bytes
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Process with sharp — resize, optimize, convert to webp for web
  const outputFilename = filename.replace(/\.[^.]+$/, '.webp');
  const outputPath = path.join(dir, outputFilename);

  const metadata = await sharp(buffer)
    .rotate() // auto-rotate based on EXIF
    .resize(maxWidth, maxHeight, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality })
    .toFile(outputPath);

  // Public URL path (relative to /public)
  const publicUrl = `/uploads/${category}/${outputFilename}`;

  return {
    url: publicUrl,
    width: metadata.width,
    height: metadata.height,
    size: metadata.size,
    filename: outputFilename,
  };
}

/**
 * Generate a tiny base64 blur placeholder from a local image file.
 * Used for Next.js <Image> blurDataURL.
 */
export async function generateBlurPlaceholder(publicUrl) {
  try {
    const localPath = path.join(process.cwd(), 'public', publicUrl);
    const buffer = await sharp(localPath)
      .resize(10, 10, { fit: 'inside' })
      .webp({ quality: 20 })
      .toBuffer();
    return `data:image/webp;base64,${buffer.toString('base64')}`;
  } catch {
    return '';
  }
}

/**
 * Delete an uploaded file by its public URL.
 */
export async function deleteUploadedImage(publicUrl) {
  try {
    const localPath = path.join(process.cwd(), 'public', publicUrl);
    if (existsSync(localPath)) {
      await unlink(localPath);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
