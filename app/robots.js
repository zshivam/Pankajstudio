export default function robots() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pankajstudio.in';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/admin/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
