/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Keep YouTube thumbnails for video embeds
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.vimeocdn.com',
        pathname: '/**',
      },
    ],
    // Allow local uploaded images served from /uploads
    localPatterns: [
      {
        pathname: '/uploads/**',
      },
    ],
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
