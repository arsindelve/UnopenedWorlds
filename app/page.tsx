'use client';

import type { CSSProperties } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { games } from './games';
import { collectionBadgeDefinitions, collectionBadges, collectionPhotography } from './collection';
import { BadgeMarks } from './BadgeMarks';

const keptBoxes = [
  { title: 'Journey: The Quest Begins', label: 'Role-Play Chronicles', image: '/kept-boxes/journey.jpg' },
  { title: 'ZorkQuest II: The Crystal of Doom', label: 'Infocomics / No. 2', image: '/kept-boxes/zorkquest-2.jpg' },
  { title: 'The Lost Treasures of Infocom', label: 'Classic anthology / 20 games', image: '/kept-boxes/lost-treasures-1.jpg' },
  { title: 'The Lost Treasures of Infocom II', label: 'Classic anthology / 11 games', image: '/kept-boxes/lost-treasures-2.jpg' },
] as const;

export default function Home() {

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
          <p className="intro-orientation">In the 1980s, Infocom shipped worlds with no pictures in them. You typed a sentence in plain English, and the machine wrote back—in prose so good the pictures arrived anyway, assembled behind your eyes out of nothing but nouns, verbs, and nerve.</p>
          <p className="intro-collection">Between the ages of ten and twelve I had an Apple IIc, and I did not play these games so much as live in them. The drive would chatter, the screen would put me in an open field west of a white house, and the evening was gone.</p>
          <p className="intro-collection">Thirty-two grey boxes came out of that company. Every one of them is on this wall—thirty-one still sealed, one still out there.</p>
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
              const badges = collectionBadges[game.slug] ?? [];
              return (
              <a
                id={isLivingWorld ? `game-${game.slug}` : undefined}
                href={`/${game.slug}`}
                className={`shadowbox ${game.sealed === false ? 'shadowbox--sought' : ''} ${isLivingWorld ? 'shadowbox--living' : ''} ${hasCollectionPhotos ? 'shadowbox--photographed' : ''}`}
                key={game.slug}
                aria-label={`${isLivingWorld ? 'Enter the living exhibit for' : 'Examine'} ${game.title}${game.sealed === false ? ', sealed copy sought' : ''}${hasCollectionPhotos ? ', collection photographs available' : ''}`}
                style={{ '--index': index } as CSSProperties}
              >
                <span className="frame-lip"><span className="frame-mat">
                  <img src={photography?.thumbnail ?? `/archive/${game.image}`} alt={`${game.title} grey-box cover`} loading="lazy" decoding="async" />
                  <span className="glass-sheen" aria-hidden="true" />
                </span></span>
                <span className="object-label">
                  <span className="object-label-meta">
                    <span>{String(index + 1).padStart(2, '0')} · {game.year}</span>
                    {badges.length > 0 && <BadgeMarks badges={badges} />}
                  </span>
                  <strong>{game.shortTitle ?? game.title}</strong>
                </span>
              </a>
              );
            })}
          </div>
        </div>

        <div className="badge-key" aria-label="Collector badge key">
          <div className="badge-key-heading">
            <p>THE COLLECTOR’S KEY / PERSONAL HISTORY</p>
            <span>Each mark records Michael’s history without touching the cover art.</span>
          </div>
          <div className="badge-key-items">
            {collectionBadgeDefinitions.map(({ id }) => <BadgeMarks badges={[id]} expanded key={id} />)}
          </div>
        </div>

        <div className="wall-caption">
          <p><span>i</span> Select any box to bring the world closer. Follow the green signal to enter one.</p>
          <p>Archival scans stand in while Michael’s collection photography is added, box by box.</p>
        </div>
      </section>

      <section className="survivors-note" aria-labelledby="survivors-heading">
        <div className="survivors-note-inner">
          <div>
            <p className="room-number">A PERSONAL FOOTNOTE / OUTSIDE THE GREY BOXES</p>
            <h2 id="survivors-heading">Four boxes that never left.</h2>
          </div>
          <p>
            Beyond the thirty-two worlds on the wall, I still have the original boxes of <em>Journey: The Quest Begins</em>, <em>ZorkQuest II: The Crystal of Doom</em>, and both <em>Lost Treasures of Infocom</em> anthologies—four more survivors from my Infocom years.
          </p>
        </div>
        <div className="kept-box-grid" aria-label="Other original Infocom boxes Michael still has">
          {keptBoxes.map((box) => (
            <figure className="kept-box-card" key={box.title}>
              <div className="kept-box-photo"><img src={box.image} alt={box.title} loading="lazy" decoding="async" /></div>
              <figcaption>
                <span>{box.label}</span>
                <strong>{box.title}</strong>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <footer>
        <p>Collected, preserved, and reimagined by Michael Lane—with gratitude and unreasonable affection.</p>
        <a href="https://gallery.guetech.org/" target="_blank" rel="noreferrer">Archival imagery: The Infocom Gallery <ArrowUpRight size={14} /></a>
      </footer>

    </main>
  );
}
