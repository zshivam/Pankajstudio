import { format, parseISO } from 'date-fns';
import SlugifyLib from 'slugify';

export function formatCardDate(date) {
  if (!date) return '';
  try {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, 'MMM yyyy');
  } catch { return ''; }
}

export function formatFullDate(date) {
  if (!date) return '';
  try {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, 'd MMMM yyyy');
  } catch { return ''; }
}

export function slugify(title) {
  return SlugifyLib(title, { lower: true, strict: true, trim: true });
}

const CATEGORY_LABELS = {
  wedding: 'Wedding',
  'pre-wedding': 'Pre-Wedding',
  maternity: 'Maternity',
  baby: 'Baby Shoot',
  birthday: 'Birthday',
  corporate: 'Corporate',
  'cinema-4k': 'Cinema Film',
};

export function getCategoryLabel(category) {
  return CATEGORY_LABELS[category] || category;
}

export function getCategoryOptions() {
  return Object.entries(CATEGORY_LABELS).map(([id, label]) => ({ id, label }));
}

export function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([^?&"'>\s]+)/);
  return match ? match[1] : null;
}

export function getYouTubeThumbnail(videoUrl, quality = 'maxresdefault') {
  const id = getYouTubeId(videoUrl);
  return id ? `https://img.youtube.com/vi/${id}/${quality}.jpg` : null;
}

export function toYouTubeEmbed(url, autoplay = false) {
  const id = getYouTubeId(url);
  if (!id) return url;
  const params = new URLSearchParams({ rel: '0', modestbranding: '1', ...(autoplay ? { autoplay: '1', mute: '1' } : {}) });
  return `https://www.youtube.com/embed/${id}?${params}`;
}

export function truncate(str, max = 120) {
  if (!str || str.length <= max) return str;
  return str.slice(0, max).trimEnd() + '\u2026';
}

export function buildProjectMeta(project) {
  const siteName = process.env.NEXT_PUBLIC_STUDIO_NAME || 'Pankaj Studio';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pankajstudio.in';
  return {
    title: `${project.metaTitle || project.title} | ${siteName}`,
    description: project.metaDescription || project.storyHighlight || `${getCategoryLabel(project.category)} by ${siteName}`,
    openGraph: {
      title: project.metaTitle || project.title,
      description: project.metaDescription || project.storyHighlight || '',
      url: `${siteUrl}/work/${project.slug}`,
      siteName,
      images: project.coverImage?.url ? [{ url: `${siteUrl}${project.coverImage.url}`, width: project.coverImage.width || 1920, height: project.coverImage.height || 1080, alt: project.coverImage.altText || project.title }] : [],
      type: 'article',
    },
  };
}
