import type { Metadata } from 'next';
import { Cormorant_Garamond, IBM_Plex_Mono, Inter } from 'next/font/google';
import './globals.css';

const display = Cormorant_Garamond({ variable: '--font-display', subsets: ['latin'], weight: ['400', '500', '600'], style: ['normal', 'italic'] });
const sans = Inter({ variable: '--font-sans-custom', subsets: ['latin'] });
const mono = IBM_Plex_Mono({ variable: '--font-mono-custom', subsets: ['latin'], weight: ['400', '500'] });

export const metadata: Metadata = {
  title: 'Unopened Worlds — An Infocom Collection',
  description: 'Thirty-two Infocom worlds, preserved unopened and brought to life.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${display.variable} ${sans.variable} ${mono.variable}`}>{children}</body></html>;
}
