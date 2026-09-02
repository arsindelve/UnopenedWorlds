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

export default function Home() {
  const [selected, setSelected] = useState<Game | null>(null);

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Unopened Worlds, home">
          <span>&gt;</span> Unopened Worlds<i>_</i>
        </a>
        <div className="header-right">
          <a className="header-live-link" href="#living-archive"><span /> Play a world</a>
          <div className="collection-tally" aria-label="Collection status">
            <span><strong>30</strong> sealed</span><b /><span><strong>2</strong> sought</span>
          </div>
        </div>
      </header>

      <section className="wall-intro" id="top">
        <div>
          <p className="eyebrow">A private Infocom collection · 1980–1988</p>
          <h1>Thirty-two doors.<br /><em>Unopened.</em></h1>
        </div>
        <div className="intro-copy">
          <p>Thirty-two physical portals into the company that taught computers how to tell stories.</p>
          <a href="#collection"><ArrowDown size={15} /> Enter the collection</a>
        </div>
      </section>

      <section className="living-archive" id="living-archive" aria-labelledby="living-title">
        <div className="living-heading">
          <div>
            <p className="room-number">ROOM 00 / THE LIVING ARCHIVE</p>
            <h2 id="living-title">Two worlds are still <em>answering.</em></h2>
          </div>
          <p>The collection preserves what Infocom made. These experiments preserve what playing it felt like.</p>
        </div>

        <div className="live-grid">
          <ZorkExhibit />
          <article className="live-exhibit live-exhibit--planetfall" aria-labelledby="planetfall-exhibit-title">
            <div>
              <p className="live-kicker"><span /> Full experience online</p>
              <p className="planetfall-prompt">&gt; LOOK</p>
              <h3 id="planetfall-exhibit-title">Planetfall,<br />re-awakened.</h3>
              <p className="planetfall-copy">Floyd is waiting. A painstakingly rebuilt world now listens with a more human understanding of what you type.</p>
            </div>
            <a href="https://planetfall.ai/">Enter Planetfall.ai <ArrowUpRight size={15} /></a>
          </article>
        </div>
      </section>

      <section className="gallery-room" id="collection" aria-labelledby="wall-title">
        <div className="room-heading">
          <div><p className="room-number">ROOM 01 / THE WALL</p><h2 id="wall-title">The collector’s wall.</h2></div>
          <p>The real arrangement, lightly curated. Thirty-one text-led worlds and one magnificent exception.</p>
        </div>

        <div className="shadowbox-wall">
          <div className="game-grid">
            {games.map((game, index) => (
              <button
                className={`shadowbox ${game.sealed === false ? 'shadowbox--sought' : ''}`}
                key={game.slug}
                onClick={() => setSelected(game)}
                aria-label={`Examine ${game.title}${game.sealed === false ? ', sealed copy sought' : ''}`}
                style={{ '--index': index } as CSSProperties}
              >
                <span className="frame-lip"><span className="frame-mat">
                  <img src={`/archive/${game.image}`} alt={`${game.title} grey-box cover`} />
                  <span className="glass-sheen" aria-hidden="true" />
                </span></span>
                <span className="object-label"><span>{String(index + 1).padStart(2, '0')} · {game.year}</span><strong>{game.shortTitle ?? game.title}</strong></span>
                {game.sealed === false && <span className="sought-tab"><Search size={10} /> sealed copy sought</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="wall-caption">
          <p><span>i</span> Select any box to bring the world closer.</p>
          <p>Archival scans temporarily stand in for Michael’s collection photography.</p>
        </div>
      </section>

      <footer>
        <p>Built as an act of preservation, gratitude, and unreasonable affection.</p>
        <a href="https://gallery.guetech.org/" target="_blank" rel="noreferrer">Archival imagery: The Infocom Gallery <ArrowUpRight size={14} /></a>
      </footer>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="exhibit-dialog" showCloseButton>
          {selected && <article className="exhibit">
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
