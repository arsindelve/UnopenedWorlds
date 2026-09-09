import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BadgeMarks } from '../BadgeMarks';
import {
  collectionBadgeDefinitions,
  collectionBadges,
  collectionPhotography,
} from '../collection';
import { games } from '../games';

// HOMEPAGE COPY: Edit the wall's labels, caption, and collector-key text here.
export function CollectionWall() {
  return (
    <section
      className="gallery-room"
      id="collection"
      aria-labelledby="wall-title"
    >
      <div className="room-heading">
        <div>
          <p className="room-number">ROOM 01 / THE WALL</p>
          <h2 id="wall-title">The collector’s wall.</h2>
          <a
            className="actual-wall-link"
            href="/collection/actual-wall.jpg"
            target="_blank"
            rel="noreferrer"
          >
            See the actual wall <ArrowUpRight size={13} />
          </a>
        </div>
        <p>
          The real arrangement, lightly curated. Two boxes carry a signal: their
          worlds can be entered.
        </p>
      </div>
      <div className="shadowbox-wall">
        <div className="game-grid">
          {games.map((game, index) => {
            const isLivingWorld =
              game.slug === 'zork-i' || game.slug === 'planetfall';
            const photography = collectionPhotography[game.slug];
            const hasCollectionPhotos = Boolean(photography);
            const badges = collectionBadges[game.slug] ?? [];
            return (
              <a
                id={isLivingWorld ? `game-${game.slug}` : undefined}
                href={`/${game.slug}`}
                className={`shadowbox ${game.unsealed ? 'shadowbox--unsealed' : ''} ${isLivingWorld ? 'shadowbox--living' : ''} ${hasCollectionPhotos ? 'shadowbox--photographed' : ''}`}
                key={game.slug}
                aria-label={`${isLivingWorld ? 'Enter the living exhibit for' : 'Examine'} ${game.title}${game.unsealed ? ', unsealed copy' : ''}${hasCollectionPhotos ? ', collection photographs available' : ''}`}
                style={{ '--index': index } as CSSProperties}
              >
                <span className="frame-lip">
                  <span className="frame-mat">
                    <img
                      src={photography?.thumbnail ?? `/archive/${game.image}`}
                      alt={`${game.title} grey-box cover`}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="glass-sheen" aria-hidden="true" />
                  </span>
                </span>
                <span className="object-label">
                  <span className="object-label-meta">
                    <span>
                      {String(index + 1).padStart(2, '0')} · {game.year}
                    </span>
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
          <span>Each mark records Michael’s history.</span>
        </div>
        <div className="badge-key-items">
          {collectionBadgeDefinitions.map(({ id }) => (
            <BadgeMarks badges={[id]} expanded key={id} />
          ))}
        </div>
      </div>
      <div className="wall-caption">
        <p>
          <span>i</span> Select any box to bring the world closer. Follow the
          green signal to enter one.
        </p>
      </div>
    </section>
  );
}
