'use client';

import { useState, type CSSProperties } from 'react';
import { ArrowDown, ArrowUpRight, Camera, PackageOpen, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { games, type Game } from './games';
import { ZorkExhibit } from './ZorkExhibit';

const galleryPages: Record<string, string> = {
  enchanter: 'enchanter/enchanter.html', sorcerer: 'sorcerer/sorcerer.html', spellbreaker: 'spellbreaker/spellbreaker.html',
  wishbringer: 'wishbringer/wishbringer.html', ballyhoo: 'ballyhoo/ballyhoo.html', 'nord-and-bert': 'nordbert/nordbert.html',
  deadline: 'deadline_grey/deadline.html', 'border-zone': 'borderzone/borderzone.html', 'zork-zero': 'zork0/zork0.html',
  'zork-i': 'zork1/zork1.html', 'zork-ii': 'zork2/zork2.html', 'zork-iii': 'zork3/zork3.html',
  'beyond-zork': 'beyond/beyond.html', suspended: 'suspended/suspended.html', infidel: 'infidel/infidel.html',
  'hollywood-hijinx': 'hollywood/hollywood.html', 'lurking-horror': 'lurking/lurking.html',
  'leather-goddesses': 'leather/leather.html', planetfall: 'planetfall/planetfall.html', stationfall: 'stationfall/stationfall.html',
  amfv: 'amfv/amfv.html', hitchhiker: 'hhgttg/hhgttg.html', trinity: 'trinity/trinity.html', starcross: 'starcross/starcross.html',
  seastalker: 'seastalker/seastalker.html', moonmist: 'moonmist/moonmist.html', 'the-witness': 'witness/witness.html',
  sherlock: 'sherlock/sherlock.html', bureaucracy: 'bureaucracy/bureaucracy.html', cutthroats: 'cutthroats/cutthroats.html',
  'plundered-hearts': 'plundered/plundered.html', suspect: 'suspect/suspect.html',
};

type CollectionPhotography = {
  edition: string;
  front: string;
  back: string;
  thumbnail: string;
  archivePage: string;
  feelies: string;
  map: string;
  manual: string;
  note: string;
};

const collectionPhotography: Record<string, CollectionPhotography> = {
  seastalker: {
    edition: 'Michael’s sealed Apple II copy',
    front: '/collection/seastalker-front.jpg',
    back: '/collection/seastalker-back.jpg',
    thumbnail: '/collection/seastalker-thumbnail.jpg',
    archivePage: 'https://gallery.guetech.org/seastalker/seastalker.html',
    feelies: 'https://gallery.guetech.org/seastalker/seastalker.html',
    map: 'https://gallery.guetech.org/seastalker/nautical-chart.jpg',
    manual: 'https://infodoc.plover.net/manuals/temp/seastalk.pdf',
    note: 'Front and back photographs document Michael’s sealed Apple II copy—including its original store sticker and the beautifully imperfect shrink-wrap that kept this world unopened. Historical materials remain with the preservation projects that made them available.',
  },
};

export default function Home() {
  const [selected, setSelected] = useState<Game | null>(null);
  const [photoSide, setPhotoSide] = useState<'front' | 'back'>('front');
  const selectedPhotography = selected ? collectionPhotography[selected.slug] : undefined;

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Unopened Worlds, home">
          <span>&gt;</span> Unopened Worlds<i>_</i>
        </a>
        <div className="header-right">
          <a className="header-live-link" href="#living-worlds"><span /> 2 worlds online</a>
          <div className="collection-tally" aria-label="Collection status">
            <span><strong>31</strong> sealed</span><b /><span><strong>1</strong> sought</span>
          </div>
        </div>
      </header>

      <section className="wall-intro" id="top">
        <div>
          <p className="eyebrow">Infocom · The Grey-Box Collection · 1980–1988</p>
          <h1>
            <span className="hero-type">
              <span className="hero-type-text">Thirty Two Worlds</span>
              <span className="hero-type-cursor" aria-hidden="true" />
            </span>
            <br />
            <em className="hero-unopened">Unopened.</em>
          </h1>
        </div>
        <div className="intro-copy">
          <p className="intro-orientation">In the 1980s, Infocom created some of the most literate and imaginative computer games ever made: text adventures that turned words into explorable worlds.</p>
          <p className="intro-collection">This is my collection of all 32 releases in the company’s iconic grey-box format: 31 still sealed, one left to find.</p>
          <p className="intro-live-note"><span /> Two of those original worlds are being brought back to life with AI.</p>
          <a href="#collection"><ArrowDown size={15} /> Enter the collection</a>
        </div>
      </section>

      <section className="work-room" id="living-worlds" aria-labelledby="work-title">
        <div className="work-heading">
          <div>
            <p className="room-number">THE WORK / PRESERVATION IN MOTION</p>
            <h2 id="work-title">The boxes stay closed.<br /><em>The worlds do not.</em></h2>
          </div>
          <p>Collecting preserves the things Infocom made. NewZork and Planetfall.ai are my attempt to preserve something harder: the feeling that a world on the other side of a prompt is listening.</p>
        </div>

        <div className="work-grid">
          <article className="work-card work-card--zork">
            <div>
              <p className="work-number">EXPERIMENT 01 / NEWZORK.AI</p>
              <h3>The world that<br /><em>started it all.</em></h3>
              <p className="work-copy">Zork I opened Infocom’s first door. Its authored rooms, objects, puzzles, and consequences remain intact while an intelligent narrator understands your intent, describes what happens, and keeps the world alive around you.</p>
            </div>
            <div className="work-invitation">
              <p>Preserve the astonishing feeling—not only the source.</p>
              <a href="#game-zork-i">Find Zork I on the wall <ArrowDown size={14} /></a>
            </div>
          </article>

          <article className="work-card work-card--planetfall">
            <div>
              <p className="work-number">EXPERIMENT 02 / PLANETFALL.AI</p>
              <h3>A beloved world<br /><em>waiting to meet you again.</em></h3>
              <p className="work-copy">Planetfall has been rebuilt room by room and object by object. Its intelligent narrator gives the completed world a voice—and lets you meet Floyd, Blather, and the Ambassador as characters who feel present, responsive, and alive.</p>
            </div>
            <div className="work-invitation">
              <p>Because Floyd deserves more than preservation.</p>
              <a href="#game-planetfall">Find Planetfall on the wall <ArrowDown size={14} /></a>
            </div>
          </article>
        </div>
      </section>

      <section className="gallery-room" id="collection" aria-labelledby="wall-title">
        <div className="room-heading">
          <div><p className="room-number">ROOM 01 / THE WALL</p><h2 id="wall-title">The collector’s wall.</h2></div>
          <p>The real arrangement, lightly curated. Two boxes carry a signal: their worlds can be entered.</p>
        </div>

        <div className="shadowbox-wall">
          <div className="game-grid">
            {games.map((game, index) => {
              const isLivingWorld = game.slug === 'zork-i' || game.slug === 'planetfall';
              const photography = collectionPhotography[game.slug];
              const hasCollectionPhotos = Boolean(photography);
              return (
              <button
                id={isLivingWorld ? `game-${game.slug}` : undefined}
                className={`shadowbox ${game.sealed === false ? 'shadowbox--sought' : ''} ${isLivingWorld ? 'shadowbox--living' : ''} ${hasCollectionPhotos ? 'shadowbox--photographed' : ''}`}
                key={game.slug}
                onClick={() => { setPhotoSide('front'); setSelected(game); }}
                aria-label={`${isLivingWorld ? 'Enter the living exhibit for' : 'Examine'} ${game.title}${game.sealed === false ? ', sealed copy sought' : ''}${hasCollectionPhotos ? ', collection photographs available' : ''}`}
                style={{ '--index': index } as CSSProperties}
              >
                <span className="frame-lip"><span className="frame-mat">
                  <img src={photography?.thumbnail ?? `/archive/${game.image}`} alt={`${game.title} grey-box cover`} />
                  <span className="glass-sheen" aria-hidden="true" />
                </span></span>
                <span className="object-label"><span>{String(index + 1).padStart(2, '0')} · {game.year}</span><strong>{game.shortTitle ?? game.title}</strong></span>
                {game.sealed === false && <span className="sought-tab"><Search size={10} /> sealed copy sought</span>}
                {isLivingWorld && <span className="living-tab"><i /> world online</span>}
                {hasCollectionPhotos && <span className="photo-tab"><Camera size={9} /> collection photos</span>}
              </button>
              );
            })}
          </div>
        </div>

        <div className="wall-caption">
          <p><span>i</span> Select any box to bring the world closer. Follow the green signal to enter one.</p>
          <p>Archival scans stand in while Michael’s collection photography is added, box by box.</p>
        </div>
      </section>

      <footer>
        <p>Collected, preserved, and reimagined by Michael Lane—with gratitude and unreasonable affection.</p>
        <a href="https://gallery.guetech.org/" target="_blank" rel="noreferrer">Archival imagery: The Infocom Gallery <ArrowUpRight size={14} /></a>
      </footer>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className={`exhibit-dialog ${selected?.slug === 'zork-i' ? 'living-dialog living-dialog--zork' : ''} ${selected?.slug === 'planetfall' ? 'living-dialog living-dialog--planetfall' : ''} ${selectedPhotography ? 'photographed-dialog' : ''}`} showCloseButton>
          {selected?.slug === 'zork-i' ? <>
            <DialogTitle className="sr-only">Playable Zork I exhibit</DialogTitle>
            <DialogDescription className="sr-only">Learn about NewZork and open a playable Zork I session.</DialogDescription>
            <ZorkExhibit />
          </> : selected?.slug === 'planetfall' ? <>
            <DialogTitle className="sr-only">Planetfall living exhibit</DialogTitle>
            <DialogDescription className="sr-only">Learn about the Planetfall AI project and enter the full experience.</DialogDescription>
            <article className="planetfall-gateway">
              <a className="gateway-cover" href="https://planetfall.ai/" aria-label="Enter Planetfall AI">
                <span className="gateway-frame"><img src={`/archive/${selected.image}`} alt={`${selected.title} grey-box cover`} /></span>
                <span><i /> World online</span>
              </a>
              <div className="gateway-story">
                <p className="live-kicker"><span /> A living Infocom experiment</p>
                <p className="gateway-command">&gt; EXAMINE PLANETFALL</p>
                <h2>Preserved worlds should still feel <em>alive.</em></h2>
                <p className="gateway-lede">Planetfall.ai is a complete room-by-room, object-by-object reconstruction of the original world, performed by an intelligent narrator that understands your intent and brings Floyd, Blather, and the Ambassador to life.</p>
                <div className="gateway-principle">
                  <span>THE POINT</span>
                  <p>The AI does not replace Steve Meretzky’s world. It inhabits the role of narrator—interpreting your intent, voicing the world, and making its characters responsive while preserving the authored game beneath it.</p>
                </div>
                <blockquote>Because Floyd deserves more than preservation. He deserves to be met again.</blockquote>
                <a className="gateway-launch" href="https://planetfall.ai/">Enter Planetfall.ai <ArrowUpRight size={15} /></a>
              </div>
            </article>
          </> : selected && selectedPhotography ? <article className="photographed-exhibit">
            <div className="collection-photo-panel">
              <div className="collection-photo-frame">
                <img
                  className={`collection-photo collection-photo--${selected.slug} collection-photo--${photoSide}`}
                  src={selectedPhotography[photoSide]}
                  alt={`${photoSide === 'front' ? 'Front' : 'Back'} of ${selectedPhotography.edition}`}
                />
              </div>
              <div className="collection-photo-controls">
                <p><Camera size={15} /><span>{selectedPhotography.edition}</span></p>
                <div role="group" aria-label={`Choose a side of the ${selected.title} box`}>
                  <button type="button" aria-pressed={photoSide === 'front'} onClick={() => setPhotoSide('front')}>Front</button>
                  <button type="button" aria-pressed={photoSide === 'back'} onClick={() => setPhotoSide('back')}>Back</button>
                </div>
              </div>
            </div>
            <div className="exhibit-story photographed-story">
              <p className="terminal-line">&gt; EXAMINE {selected.title.toUpperCase()}</p>
              <p className="exhibit-year">INFOCOM · {selected.year}</p>
              <DialogTitle className="exhibit-title">{selected.title}</DialogTitle>
              <DialogDescription className="sr-only">Front and back photographs of {selectedPhotography.edition}.</DialogDescription>
              <p className="byline">A work by {selected.author}</p>
              <p className="tribute">{selected.tribute}</p>
              <div className="exhibit-divider" />
              <div className="archive-drawer">
                <div><p className="drawer-label">THE ARCHIVE DRAWER</p><h3>The world beyond the box.</h3></div>
                <div className="archive-items">
                  <a href={selectedPhotography.archivePage} target="_blank" rel="noreferrer"><PackageOpen size={15} /> Open archival scans <ArrowUpRight size={13} /></a>
                  <a href={selectedPhotography.feelies} target="_blank" rel="noreferrer">Feelies <ArrowUpRight size={13} /></a>
                  <a href={selectedPhotography.map} target="_blank" rel="noreferrer">Map <ArrowUpRight size={13} /></a>
                  <a href={selectedPhotography.manual} target="_blank" rel="noreferrer">Manual <ArrowUpRight size={13} /></a>
                </div>
                <p className="drawer-note">{selectedPhotography.note}</p>
              </div>
            </div>
          </article> : selected && <article className="exhibit">
            <div className="exhibit-visual">
              <div className="exhibit-cover"><img src={`/archive/${selected.image}`} alt={`${selected.title} box cover`} /></div>
              <div className="photo-status"><Camera size={16} /><span>Your collection photograph will replace this archival scan.</span></div>
            </div>
            <div className="exhibit-story">
              <p className="terminal-line">&gt; EXAMINE {selected.title.toUpperCase()}</p>
              <p className="exhibit-year">INFOCOM · {selected.year}</p>
              <DialogTitle className="exhibit-title">{selected.title}</DialogTitle>
              <DialogDescription className="sr-only">Collection exhibit for {selected.title}</DialogDescription>
              <p className="byline">A work by {selected.author}</p>
              <p className="tribute">{selected.tribute}</p>
              <div className="exhibit-divider" />
              <div className="archive-drawer">
                <div><p className="drawer-label">THE ARCHIVE DRAWER</p><h3>The world beyond the box.</h3></div>
                <div className="archive-items">
                  <a href={`https://gallery.guetech.org/${galleryPages[selected.slug]}`} target="_blank" rel="noreferrer"><PackageOpen size={15} /> Open archival scans <ArrowUpRight size={13} /></a>
                  <span>Feelies</span><span>Map</span><span>Manual</span>
                </div>
                <p className="drawer-note">This first exhibit links to the preserved maps, artifacts, and packaging. Your detailed collection photographs will become the foreground as we add them.</p>
              </div>
              {selected.sealed === false && <p className="hunt-note"><Search size={14} /> The wall has this title. The hunt is for a sealed copy.</p>}
            </div>
          </article>}
        </DialogContent>
      </Dialog>
    </main>
  );
}
