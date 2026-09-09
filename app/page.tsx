import { CollectionWall } from './home/CollectionWall';
import { HomeHero } from './home/HomeHero';
import { KeptBoxes } from './home/KeptBoxes';
import { LivingWorlds } from './home/LivingWorlds';
import { SiteFooter } from './home/SiteFooter';

// This file only composes the homepage. Edit visible copy in the clearly named
// section files in app/home/. Each game’s page writeup is in games.ts.
export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Unopened Worlds, home">
          <span>&gt;</span> Unopened Worlds<i>_</i>
        </a>
        <div className="header-right">
          <a className="header-live-link" href="#living-worlds">
            <span /> 2 worlds online
          </a>
          <div className="collection-tally" aria-label="Collection status">
            <span>
              <strong>31</strong> sealed
            </span>
            <b />
            <span>
              <strong>1</strong> unsealed
            </span>
          </div>
        </div>
      </header>
      <HomeHero />
      <LivingWorlds />
      <CollectionWall />
      <KeptBoxes />
      <SiteFooter />
    </main>
  );
}
