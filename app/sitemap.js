export default function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pankajstudio.in';
  const routes = ['', '/work', '/service', '/about', '/about/team', '/contact', '/gallery'].map(
    (route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: route === '' ? 'daily' : 'weekly',
      priority: route === '' ? 1.0 : 0.8,
    })
  );

  return routes;
}
