import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300','400','500','600'], style: ['normal','italic'], variable: '--font-display', display: 'swap' });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300','400','500'], style: ['normal','italic'], variable: '--font-sans', display: 'swap' });
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['300','400'], variable: '--font-mono', display: 'swap' });

const siteName = process.env.NEXT_PUBLIC_STUDIO_NAME || 'Pankaj Studio';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pankajstudio.online';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${siteName} — Premium Photography & Cinema`, template: `%s | ${siteName}` },
  description: "Premium photography and 4K cinema for weddings, pre-weddings, maternity, and life's most significant milestones. Based in Lucknow. Available across India.",
  keywords: ['wedding photography', 'maternity photography', 'pre-wedding shoot', '4K wedding film', 'Lucknow photographer'],
  openGraph: { type: 'website', siteName, locale: 'en_IN' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="suppressHydrationWarning" className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
