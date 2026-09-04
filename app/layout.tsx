import type { Metadata } from 'next';
import { Cormorant_Garamond, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import './globals.css';

const display = Cormorant_Garamond({ variable: '--font-display', subsets: ['latin'], weight: ['400', '500', '600'], style: ['normal', 'italic'] });
const sans = IBM_Plex_Sans({ variable: '--font-sans-custom', subsets: ['latin'], weight: ['300', '400', '500'] });
const mono = IBM_Plex_Mono({ variable: '--font-mono-custom', subsets: ['latin'], weight: ['400', '500'] });

const title = 'Unopened Worlds — Infocom, Preserved and Reimagined';
const description = 'All thirty-two of Infocom’s grey-box adventures on one wall—thirty-one still sealed, one still sought—photographed copy by copy, with two of their worlds brought back to life by AI.';
const siteUrl = 'https://unopenedworlds.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Unopened Worlds',
    title,
    description,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'The thirty-two Infocom grey boxes arranged on a collector’s wall' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${display.variable} ${sans.variable} ${mono.variable}`}>{children}</body></html>;
}
