import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300','400','500','600'], style: ['normal','italic'], variable: '--font-display', display: 'swap' });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300','400','500'], style: ['normal','italic'], variable: '--font-sans', display: 'swap' });
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['300','400'], variable: '--font-mono', display: 'swap' });

const siteName = process.env.NEXT_PUBLIC_STUDIO_NAME || 'Pankaj Studio';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pankajstudio.in';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${siteName} — Premium Photography & Cinema`, template: `%s | ${siteName}` },
  description: "Premium photography and 4K cinema for weddings, pre-weddings, maternity, and life's most significant milestones. Based in Deoria. Available across India.",
  keywords: ['wedding photography', 'maternity photography', 'pre-wedding shoot', '4K wedding film', 'Deoria photographer'],
  openGraph: { type: 'website', siteName, locale: 'en_IN' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  verification: {
    google: 'sohjsKLkoLMD54Hsp0GWWZj03JEieCZ3PwMa4t2SIs4',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <head>
        <link rel="icon" href="/pstudiologo.svg" type="image/svg+xml" />
        <meta name="google-site-verification" content="sohjsKLkoLMD54Hsp0GWWZj03JEieCZ3PwMa4t2SIs4" />
      </head>
      <body className="antialiased">
        {children}

        {/* 🌟 Fixed Bottom-Right Floating Book Now Button */}
        <a 
          href="/contact" 
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            display: 'inline-flex',
            alignItems: 'center',  
            gap: '8px',
            background: 'linear-gradient(135deg, #d4af37 0%, #f3e5ab 50%, #d4af37 100%)',
            color: '#000',
            padding: '12px 22px',
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