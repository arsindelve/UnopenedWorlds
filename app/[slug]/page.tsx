import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { games } from '../games';
import { collectionPhotography } from '../collection';
import { GameExhibit } from '../GameExhibit';

export const dynamicParams = false;

export function generateStaticParams() {
  return games.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find((entry) => entry.slug === slug);
  if (!game) return {};

  const photography = collectionPhotography[slug];
  const title = `${game.title} — Unopened Worlds`;
  const description = `${game.tribute.slice(0, 200)}${game.tribute.length > 200 ? '…' : ''}`;
  // A photographed copy previews as itself; everything else falls back to the wall.
  const image = photography?.thumbnail ?? '/og-image.jpg';

  return {
    title,
    description,
    alternates: { canonical: `/${slug}` },
    openGraph: { type: 'article', url: `/${slug}`, siteName: 'Unopened Worlds', title, description, images: [{ url: image }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!games.some((game) => game.slug === slug)) notFound();
  return <GameExhibit slug={slug} />;
}
