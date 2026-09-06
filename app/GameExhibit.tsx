'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Camera, Maximize2, PackageOpen, Search, X } from 'lucide-react';
import Link from 'next/link';
import { games } from './games';
import { collectionBadges, collectionPhotography, galleryPages } from './collection';
import { BadgeMarks } from './BadgeMarks';
import { ZorkExhibit } from './ZorkExhibit';

export function GameExhibit({ slug }: { slug: string }) {
  const index = games.findIndex((game) => game.slug === slug);
  const game = games[index];
  const photography = collectionPhotography[slug];
  const badges = collectionBadges[slug] ?? [];
  const photos = photography?.photos ?? [];

  const [activeId, setActiveId] = useState(photos[0]?.id ?? '');
  const [zoomed, setZoomed] = useState(false);
  const active = photos.find(({ id }) => id === activeId) ?? photos[0];

  const previous = games[(index - 1 + games.length) % games.length];
  const next = games[(index + 1) % games.length];
  const isLivingWorld = slug === 'zork-i' || slug === 'planetfall';

  return (
    <main className="exhibit-page">
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="Unopened Worlds, home">
          <span>&gt;</span> Unopened Worlds<i>_</i>
        </Link>
        <Link className="exhibit-back" href="/#collection"><ArrowLeft size={13} /> Back to the wall</Link>
      </header>

      <article className="exhibit-layout">
        <div className="exhibit-plate">
          {active ? (
            <>
              <button
                type="button"
                className="collection-photo-frame collection-photo-frame--zoomable"
                onClick={() => setZoomed(true)}
                aria-label={`Look closely at the ${active.label.toLowerCase()} of ${game.title}`}
              >
                <img
                  className={`collection-photo collection-photo--${slug} collection-photo--${active.id}`}
                  src={active.src}
                  alt={`${active.label} of ${photography.edition}`}
                  decoding="async"
                />
                <span className="zoom-hint"><Maximize2 size={13} /> Look closer</span>
              </button>
              <div className="collection-photo-controls">
                <p><Camera size={15} /><span>{active.caption ?? photography.edition}</span></p>
                <div role="group" aria-label={`Choose a photograph of ${game.title}`}>
                  {photos.map(({ id, label }) => (
                    <button type="button" key={id} aria-pressed={id === activeId} onClick={() => setActiveId(id)}>{label}</button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="exhibit-visual">
              <div className="exhibit-cover"><img src={`/archive/${game.image}`} alt={`${game.title} box cover`} decoding="async" /></div>
              <div className="photo-status"><Camera size={16} /><span>Michael&rsquo;s photographs of this copy will replace this archival scan.</span></div>
            </div>
          )}
        </div>

        <div className="exhibit-story exhibit-story--page">
          <p className="terminal-line">&gt; EXAMINE {game.title.toUpperCase()}</p>
          <p className="exhibit-year">INFOCOM · {game.year}</p>
          <h1 className="exhibit-title">{game.title}</h1>
          <p className="byline">A work by {game.author}</p>

          {badges.length > 0 && (
            <div className="personal-history">
              <p>MICHAEL&rsquo;S HISTORY WITH THIS WORLD</p>
              <BadgeMarks badges={badges} expanded />
            </div>
          )}

          <p className={`tribute ${game.tribute.length > 240 ? 'tribute--long' : ''}`}>{game.tribute}</p>

          {game.sealed === false && <p className="hunt-note"><Search size={14} /> The wall has this title. The hunt is for a sealed copy.</p>}

          <div className="exhibit-divider" />

          <div className="archive-drawer">
            <div><p className="drawer-label">THE ARCHIVE DRAWER</p><h2>The world beyond the box.</h2></div>
            <div className="archive-items">
              <a href={photography?.archivePage ?? `https://gallery.guetech.org/${galleryPages[slug]}`} target="_blank" rel="noreferrer">
                <PackageOpen size={15} /> Open archival scans <ArrowUpRight size={13} />
              </a>
              {photography ? <>
                <a href={photography.feelies} target="_blank" rel="noreferrer">Feelies <ArrowUpRight size={13} /></a>
                {photography.map && <a href={photography.map} target="_blank" rel="noreferrer">Map <ArrowUpRight size={13} /></a>}
                <a href={photography.manual} target="_blank" rel="noreferrer">Manual <ArrowUpRight size={13} /></a>
              </> : <><span>Feelies</span><span>Map</span><span>Manual</span></>}
            </div>
            <p className="drawer-note">
              {photography?.note ?? 'This exhibit links to the preserved maps, artifacts, and packaging. Michael’s photographs of his own copy will become the foreground as they are added.'}
            </p>
          </div>
        </div>
      </article>

      {isLivingWorld && (
        <section className="exhibit-living" aria-labelledby="living-title">
          <div className="room-heading">
            <div>
              <p className="room-number">STILL RUNNING / A LIVING INFOCOM EXPERIMENT</p>
              <h2 id="living-title">The box stays closed.<br /><em>This world does not.</em></h2>
            </div>
          </div>
          {slug === 'zork-i' ? <ZorkExhibit /> : (
            <article className="planetfall-gateway planetfall-gateway--page">
              <div className="gateway-story">
                <p className="live-kicker"><span /> A living Infocom experiment</p>
                <h3>Preserved worlds should still feel <em>alive.</em></h3>
                <p className="gateway-lede">Planetfall.ai is a complete room-by-room, object-by-object reconstruction of the original world, performed by an intelligent narrator that understands your intent and brings Floyd, Blather, and the Ambassador to life.</p>
                <div className="gateway-principle">
                  <span>THE POINT</span>
                  <p>The AI does not replace Steve Meretzky&rsquo;s world. It inhabits the role of narrator&mdash;interpreting your intent, voicing the world, and making its characters responsive while preserving the authored game beneath it.</p>
                </div>
                <blockquote>Because Floyd deserves more than preservation. He deserves to be met again.</blockquote>
                <a className="gateway-launch" href="https://planetfall.ai/">Enter Planetfall.ai <ArrowUpRight size={15} /></a>
              </div>
            </article>
          )}
        </section>
      )}

      <nav className="exhibit-nav" aria-label="Move along the wall">
        <Link href={`/${previous.slug}`}><ArrowLeft size={14} /><span><i>Previous on the wall</i><strong>{previous.shortTitle ?? previous.title}</strong></span></Link>
        <Link href="/#collection">All thirty-two</Link>
        <Link href={`/${next.slug}`}><span><i>Next on the wall</i><strong>{next.shortTitle ?? next.title}</strong></span><ArrowRight size={14} /></Link>
      </nav>

      {zoomed && active && (
        <div className="photo-zoom" role="dialog" aria-modal="true" aria-label={`${active.label} of ${game.title}, full size`}>
          <div className="photo-zoom-scroll">
            <img src={active.src} alt={`${active.label} of ${photography.edition}, full size`} />
          </div>
          <button type="button" className="photo-zoom-close" onClick={() => setZoomed(false)} aria-label="Close the full-size photograph">
            <X size={16} />
          </button>
          <p className="photo-zoom-caption">{active.caption ?? photography.edition} · {active.label}</p>
        </div>
      )}
    </main>
  );
}
