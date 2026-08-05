/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // YouTube thumbnails for video embeds
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**',
      },
      // Vimeo thumbnails
      {
        protocol: 'https',
        hostname: 'i.vimeocdn.com',
        pathname: '/**',
      },
      // 🌟 NAYA: Cloudinary (Cloud Storage) ki images allow karne ke liye
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
    // ❌ localPatterns (uploads folder) ko yahan se hata diya gaya hai kyunki Vercel par wo kaam nahi karta
  },
  serverExternalPackages: ['mongoose', 'sharp'],
  // Allow large image uploads
  experimental: {
    serverActions: {
      bodySizeLimit: '400mb',
    },
  },
};

export default nextConfig;