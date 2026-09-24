import { Cormorant_Garamond, DM_Sans, DM_Mono, Great_Vibes, Montserrat, Playfair_Display } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300','400','500','600'], style: ['normal','italic'], variable: '--font-display', display: 'swap' });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300','400','500'], style: ['normal','italic'], variable: '--font-sans', display: 'swap' });
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['300','400'], variable: '--font-mono', display: 'swap' });
const greatVibes = Great_Vibes({ subsets: ['latin'], weight: ['400'], variable: '--font-script', display: 'swap' });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-montserrat', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '600'], style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });

const siteName = process.env.NEXT_PUBLIC_STUDIO_NAME || 'Pankaj Studio';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pankajstudio.in';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${siteName} — Premium Photography & Cinema`, template: `%s | ${siteName}` },
  description: "Premium photography and 4K cinema for weddings, pre-weddings, maternity, and life's most significant milestones. Based in Deoria. Available across India.",
  keywords: ['wedding photography', 'maternity photography', 'pre-wedding shoot', '4K wedding film', 'Deoria photographer', 'Pankaj Studio'],
  authors: [{ name: siteName }],
  creator: siteName,
  openGraph: {
    type: 'website',
    siteName,
    locale: 'en_IN',
    url: siteUrl,
    title: `${siteName} — Premium Photography & Cinema`,
    description: "Premium photography and 4K cinema for weddings, pre-weddings, maternity, and life's most significant milestones. Based in Deoria. Available across India.",
    images: [{ url: '/pstudiologo.png', width: 384, height: 384, alt: siteName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} — Premium Photography & Cinema`,
    description: "Premium photography and 4K cinema for weddings, pre-weddings, maternity, and life's most significant milestones.",
    images: ['/pstudiologo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/pstudiologo.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
  verification: {
    google: 'sohjsKLkoLMD54Hsp0GWWZj03JEieCZ3PwMa4t2SIs4',
  },
};

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable} ${greatVibes.variable} ${montserrat.variable} ${playfair.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/pstudiologo.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <meta name="theme-color" content="#050505" />
      </head>
      <body className="antialiased">
        {children}

        {/* 🌟 Fixed Bottom-Right Floating Book Now Button with Touch Target 44px+ */}
        <a 
          href="/contact" 
          aria-label="Book your photography session"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            display: 'inline-flex',
            alignItems: 'center',  
            justifyContent: 'center',
            minHeight: '44px',
            minWidth: '44px',
            gap: '8px',
            background: 'linear-gradient(135deg, #d4af37 0%, #f3e5ab 50%, #d4af37 100%)',
            color: '#000',
            padding: '12px 24px',
            borderRadius: '50px',
            fontFamily: 'var(--font-sans), sans-serif',
            fontSize: '12px',
            fontWeight: '700',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            transition: 'all 0.3s ease',
          }}
        >
          Book Now
        </a>
      </body>
    </html>
  );
}