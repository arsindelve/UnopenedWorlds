import type { Metadata } from 'next';
import { Cormorant_Garamond, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import './globals.css';

const display = Cormorant_Garamond({ variable: '--font-display', subsets: ['latin'], weight: ['400', '500', '600'], style: ['normal', 'italic'] });
const sans = IBM_Plex_Sans({ variable: '--font-sans-custom', subsets: ['latin'], weight: ['300', '400', '500'] });
const mono = IBM_Plex_Mono({ variable: '--font-mono-custom', subsets: ['latin'], weight: ['400', '500'] });

export const metadata: Metadata = {
  title: 'Unopened Worlds — Infocom, Preserved and Reimagined',
  description: 'A personal collection of Infocom’s 32 grey-box text adventures—31 sealed, one sought—and two AI projects bringing their worlds back to life.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${display.variable} ${sans.variable} ${mono.variable}`}>{children}</body></html>;
}
