'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Camera, ChevronLeft, ChevronRight, Maximize2, PackageOpen, Search, X } from 'lucide-react';
import { games } from './games';
import { collectionBadges, collectionPhotography, galleryPages, type Photograph } from './collection';
import { BadgeMarks } from './BadgeMarks';
import { ZorkExhibit } from './ZorkExhibit';

export function GameExhibit({ slug }: { slug: string }) {
  const index = games.findIndex((game) => game.slug === slug);
  const game = games[index];
  const photography = collectionPhotography[slug];
  const badges = collectionBadges[slug] ?? [];
  const photos = photography?.photos ?? [];

  // Front and back are the sealed copy. Everything else the game has—other
  // editions, feelies, books—lives behind "Other" as a gallery, so the plate
  // stays legible however much material arrives.
  const front = photos.find(({ id }) => id === 'front');
  const back = photos.find(({ id }) => id === 'back');
  const others = photos.filter(({ id, role }) => id !== 'front' && id !== 'back' && !role);
  const ownMap = photos.find(({ role }) => role === 'map');
  const ownManual = photos.find(({ role }) => role === 'manual');
  const ownFeelies = photos.find(({ role }) => role === 'feelies');

  const [view, setView] = useState<'front' | 'back' | 'other'>('front');
  const [zoomed, setZoomed] = useState<Photograph | null>(null);
  // Opens whole, so a map or an opened manual is legible at a glance; one click
  // goes to actual pixels, which is where the shrink-wrap and the print live.
  const [actualSize, setActualSize] = useState(false);
  const zoomSet = zoomed?.role ? photos.filter(({ role }) => role === zoomed.role) : [];
  const zoomAt = zoomSet.findIndex(({ id }) => id === zoomed?.id);
  const stepZoom = (by: number) => { setActualSize(false); setZoomed(zoomSet[(zoomAt + by + zoomSet.length) % zoomSet.length]); };
  const active = view === 'back' ? back ?? front : front ?? photos[0];
  const caption = view === 'other'
    ? `${others.length} more ${others.length === 1 ? 'photograph' : 'photographs'} of this world`
    : active?.caption ?? photography?.edition;

  const previous = games[(index - 1 + games.length) % games.length];
  const next = games[(index + 1) % games.length];
  const isLivingWorld = slug === 'zork-i' || slug === 'planetfall';

  return (
    <main className="exhibit-page">
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Unopened Worlds, home">
          <span>&gt;</span> Unopened Worlds<i>_</i>
        </a>
        <a className="exhibit-back" href="/#collection"><ArrowLeft size={13} /> Back to the wall</a>
      </header>

      <article className="exhibit-layout">
        <div className="exhibit-plate">
          {photos.length > 0 && active ? (
            <>
              {view === 'other' ? (
                <div className="photo-gallery">
                  {others.map((photo) => (
                    <button
                      type="button"
                      key={photo.id}
                      className="photo-gallery-item"
                      onClick={() => { setActualSize(false); setZoomed(photo); }}
                      aria-label={`Look closely at ${photo.label} of ${game.title}`}
                    >
                      <span className="photo-gallery-frame">
                        <img src={photo.src} alt={photo.caption ?? `${photo.label} of ${game.title}`} loading="lazy" decoding="async" />
                      </span>
                      <span className="photo-gallery-label">{photo.label}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  type="button"
                  className="collection-photo-frame collection-photo-frame--zoomable"
                  onClick={() => { setActualSize(false); setZoomed(active); }}
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
              )}
              <div className="collection-photo-controls">
                <p><Camera size={15} /><span>{caption}</span></p>
                <div role="group" aria-label={`Choose what to look at for ${game.title}`}>
                  {front && <button type="button" aria-pressed={view === 'front'} onClick={() => setView('front')}>Front</button>}
                  {back && <button type="button" aria-pressed={view === 'back'} onClick={() => setView('back')}>Back</button>}
                  {others.length > 0 && <button type="button" aria-pressed={view === 'other'} onClick={() => setView('other')}>Other</button>}
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
              {photography?.archivePage
                ? <a href={photography.archivePage} target="_blank" rel="noreferrer"><PackageOpen size={15} /> Open archival scans <ArrowUpRight size={13} /></a>
                : !photography && <a href={`https://gallery.guetech.org/${galleryPages[slug]}`} target="_blank" rel="noreferrer"><PackageOpen size={15} /> Open archival scans <ArrowUpRight size={13} /></a>}
              {photography ? <>
                {ownFeelies
                  ? <button type="button" onClick={() => { setActualSize(false); setZoomed(ownFeelies); }}>Feelies <Maximize2 size={13} /></button>
                  : photography.feelies && <a href={photography.feelies} target="_blank" rel="noreferrer">Feelies <ArrowUpRight size={13} /></a>}
                {ownMap
                  ? <button type="button" onClick={() => { setActualSize(false); setZoomed(ownMap); }}>Map <Maximize2 size={13} /></button>
                  : photography.map && <a href={photography.map} target="_blank" rel="noreferrer">Map <ArrowUpRight size={13} /></a>}
                {ownManual
                  ? <button type="button" onClick={() => { setActualSize(false); setZoomed(ownManual); }}>Manual <Maximize2 size={13} /></button>
                  : photography.manual && <a href={photography.manual} target="_blank" rel="noreferrer">Manual <ArrowUpRight size={13} /></a>}
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
              </div>
            </article>
          )}
        </section>
      )}

      <nav className="exhibit-nav" aria-label="Move along the wall">
        <a href={`/${previous.slug}`}><ArrowLeft size={14} /><span><i>Previous on the wall</i><strong>{previous.shortTitle ?? previous.title}</strong></span></a>
        <a href="/#collection">All thirty-two</a>
        <a href={`/${next.slug}`}><span><i>Next on the wall</i><strong>{next.shortTitle ?? next.title}</strong></span><ArrowRight size={14} /></a>
      </nav>

      {zoomed && (
        <div className="photo-zoom" role="dialog" aria-modal="true" aria-label={`${zoomed.label} of ${game.title}, full size`}>
          <div className={`photo-zoom-scroll ${actualSize ? 'photo-zoom-scroll--actual' : ''}`}>
            <img
              src={zoomed.src}
              alt={`${zoomed.label} of ${photography.edition}, full size`}
              onClick={() => setActualSize((on) => !on)}
              role="presentation"
            />
          </div>
          <button type="button" className="photo-zoom-size" onClick={() => setActualSize((on) => !on)}>
            {actualSize ? 'Fit to screen' : 'Actual size'}
          </button>
          {zoomSet.length > 1 && (
            <>
              <button type="button" className="photo-zoom-nav photo-zoom-nav--previous" onClick={() => stepZoom(-1)} aria-label="Previous page"><ChevronLeft aria-hidden="true" /></button>
              <button type="button" className="photo-zoom-nav photo-zoom-nav--next" onClick={() => stepZoom(1)} aria-label="Next page"><ChevronRight aria-hidden="true" /></button>
              <div className="photo-zoom-pager" aria-label={`Page ${zoomAt + 1} of ${zoomSet.length}`}>
                <span>{zoomAt + 1} / {zoomSet.length}</span>
              </div>
            </>
          )}
          <button type="button" className="photo-zoom-close" onClick={() => setZoomed(null)} aria-label="Close the full-size photograph">
            <X size={16} />
          </button>
          <p className="photo-zoom-caption">{zoomed.caption ?? photography.edition} · {zoomed.label}</p>
        </div>
      )}
    </main>
  );
}
