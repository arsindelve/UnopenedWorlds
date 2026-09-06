'use client';

import { useSyncExternalStore, useState, type CSSProperties } from 'react';
import { Archive, ArrowDown, ArrowUpRight, Bot, Camera, Check, Copy, Gamepad2, Heart, PackageOpen, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { games } from './games';
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

type Photograph = {
  id: string;
  label: string;
  src: string;
};

type CollectionPhotography = {
  edition: string;
  // Ordered; the first is what opens. Front and back today, and whatever else
  // the copy has—folio, spine, feelies—as they are photographed.
  photos: Photograph[];
  thumbnail: string;
  archivePage: string;
  feelies: string;
  map?: string;
  manual: string;
  note: string;
};

const collectionPhotography: Record<string, CollectionPhotography> = {
  seastalker: {
    edition: 'Michael’s sealed Apple II copy',
    photos: [
      { id: 'front', label: 'Front', src: '/collection/seastalker-front.jpg' },
      { id: 'back', label: 'Back', src: '/collection/seastalker-back.jpg' },
    ],
    thumbnail: '/collection/seastalker-thumbnail.jpg',
    archivePage: 'https://gallery.guetech.org/seastalker/seastalker.html',
    feelies: 'https://gallery.guetech.org/seastalker/seastalker.html',
    map: 'https://gallery.guetech.org/seastalker/nautical-chart.jpg',
    manual: 'https://infodoc.plover.net/manuals/temp/seastalk.pdf',
    note: 'Front and back photographs document Michael’s sealed Apple II copy—including its original store sticker and the beautifully imperfect shrink-wrap that kept this world unopened. Historical materials remain with the preservation projects that made them available.',
  },
  moonmist: {
    edition: 'Michael’s sealed IBM PC copy',
    photos: [
      { id: 'front', label: 'Front', src: '/collection/moonmist-front.jpg' },
      { id: 'back', label: 'Back', src: '/collection/moonmist-back.jpg' },
    ],
    thumbnail: '/collection/moonmist-thumbnail.jpg',
    archivePage: 'https://gallery.guetech.org/moonmist/moonmist.html',
    feelies: 'https://gallery.guetech.org/moonmist/moonmist.html',
    map: 'https://www.mocagh.org/infocom/moonmist-map.pdf',
    manual: 'https://www.mocagh.org/infocom/moonmist-manual.pdf',
    note: 'Front and back photographs document Michael’s sealed IBM PC copy—including two layers of original store pricing and the creases, glare, and shrink-wrap seams that make this particular unopened world unmistakably its own. Historical materials remain with the preservation projects that made them available.',
  },
  'lurking-horror': {
    edition: 'Michael’s sealed Commodore 64/128 copy',
    photos: [
      { id: 'front', label: 'Front', src: '/collection/lurking-horror-front.jpg' },
      { id: 'back', label: 'Back', src: '/collection/lurking-horror-back.jpg' },
    ],
    thumbnail: '/collection/lurking-horror-thumbnail.jpg',
    archivePage: 'https://gallery.guetech.org/lurking/lurking.html',
    feelies: 'https://gallery.guetech.org/lurking/lurking.html',
    map: 'https://www.mocagh.org/infocom/lurkinghorror-map.pdf',
    manual: 'https://www.mocagh.org/infocom/lurkinghorror-manual.pdf',
    note: 'Front and back photographs document Michael’s sealed Commodore 64/128 copy—including its visible shrink-wrap seams and original ISBN label. Historical materials remain with the preservation projects that made them available.',
  },
  bureaucracy: {
    edition: 'Michael’s sealed Commodore 128 copy',
    photos: [
      { id: 'front', label: 'Front', src: '/collection/bureaucracy-front.jpg' },
      { id: 'back', label: 'Back', src: '/collection/bureaucracy-back.jpg' },
    ],
    thumbnail: '/collection/bureaucracy-thumbnail.jpg',
    archivePage: 'https://gallery.guetech.org/bureaucracy/bureaucracy.html',
    feelies: 'https://gallery.guetech.org/bureaucracy/bureaucracy.html',
    map: 'https://www.mocagh.org/infocom/bureaucracy-map.pdf',
    manual: 'https://www.mocagh.org/infocom/bureaucracy-manual.pdf',
    note: 'Front and back photographs document Michael’s sealed Commodore 128 copy—including the taut shrink-wrap and its glare across Douglas Adams’s name, the platform banner naming the 1541/1571 disk and 80-column monitor, and the intact ISBN panel on the back. Historical materials remain with the preservation projects that made them available.',
  },
  trinity: {
    edition: 'Michael’s sealed IBM PC copy',
    photos: [
      { id: 'front', label: 'Front', src: '/collection/trinity-front.jpg' },
      { id: 'back', label: 'Back', src: '/collection/trinity-back.jpg' },
    ],
    thumbnail: '/collection/trinity-thumbnail.jpg',
    archivePage: 'https://gallery.guetech.org/trinity/trinity.html',
    feelies: 'https://gallery.guetech.org/trinity/trinity.html',
    map: 'https://www.mocagh.org/infocom/trinity-map-front.pdf',
    manual: 'https://www.mocagh.org/infocom/trinity-manual.pdf',
    note: 'Front and back photographs document Michael’s sealed IBM PC copy—including the original $23.00 store sticker still riding the corner of the title, the shrink-wrap seams along the spine, and the intact ISBN panel on the back. Trinity shipped with a map of the test site, The Illustrated Story of the Atom Bomb, a decorated sundial, and instructions for folding a paper crane. Historical materials remain with the preservation projects that made them available.',
  },
  hitchhiker: {
    edition: 'Michael’s sealed Apple II copy',
    photos: [
      { id: 'front', label: 'Front', src: '/collection/hitchhiker-front.jpg' },
      { id: 'back', label: 'Back', src: '/collection/hitchhiker-back.jpg' },
    ],
    thumbnail: '/collection/hitchhiker-thumbnail.jpg',
    archivePage: 'https://gallery.guetech.org/hhgttg/hhgttg.html',
    feelies: 'https://gallery.guetech.org/hhgttg/hhgttg.html',
    manual: 'https://www.mocagh.org/infocom/hhgtg-manual.pdf',
    note: 'Front and back photographs document Michael’s sealed Apple II copy—including the Software Publishers Association platinum seal, the bonus-checks sticker that expired in March 1988, and the later Mediagenic distribution label applied to the back. The package shipped with a Don’t Panic! button, authentic fluff, peril-sensitive sunglasses, a microscopic space fleet, and no tea; it needed no map. Historical materials remain with the preservation projects that made them available.',
  },
  amfv: {
    edition: 'Michael’s sealed Amiga copy',
    photos: [
      { id: 'front', label: 'Front', src: '/collection/amfv-front.jpg' },
      { id: 'back', label: 'Back', src: '/collection/amfv-back.jpg' },
    ],
    thumbnail: '/collection/amfv-thumbnail.jpg',
    archivePage: 'https://gallery.guetech.org/amfv/amfv.html',
    feelies: 'https://gallery.guetech.org/amfv/amfv.html',
    map: 'https://www.mocagh.org/infocom/amfv-map.pdf',
    manual: 'https://www.mocagh.org/infocom/amfv-manual.pdf',
    note: 'Front and back photographs document Michael’s sealed Amiga copy—including the shrink-wrap sheen drawn across Perry Simm’s face and the intact ISBN panel on the back. The package shipped with the latest hardcopy issue of Dakota Online, a full-colour map of Rockvil, South Dakota, a 21st-century plastic pen, and a Class One Security Mode Access Decoder. Historical materials remain with the preservation projects that made them available.',
  },
  planetfall: {
    edition: 'Michael’s sealed IBM PC copy',
    photos: [
      { id: 'front', label: 'Front', src: '/collection/planetfall-front.jpg' },
      { id: 'back', label: 'Back', src: '/collection/planetfall-back.jpg' },
    ],
    thumbnail: '/collection/planetfall-thumbnail.jpg',
    archivePage: 'https://gallery.guetech.org/planetfall/planetfall.html',
    feelies: 'https://gallery.guetech.org/planetfall/planetfall.html',
    map: 'https://www.mocagh.org/infocom/planetfall-map-front.pdf',
    manual: 'https://www.mocagh.org/infocom/planetfall-manual.pdf',
    note: 'Front and back photographs document Michael’s sealed IBM PC copy—including the heavy shrink-wrap sheen across the Stellar Patrol recruitment poster and, on the back, the 55 Wheeler Street address Infocom used before it moved to CambridgePark Drive. The package shipped with a Stellar Patrol recruitment brochure, a Special Assignment Task Force I.D. card, a personal diary, and three postcards from the Universe’s swankiest tourist traps. Historical materials remain with the preservation projects that made them available.',
  },
  'hollywood-hijinx': {
    edition: 'Michael’s sealed Atari ST copy',
    photos: [
      { id: 'front', label: 'Front', src: '/collection/hollywood-hijinx-front.jpg' },
      { id: 'back', label: 'Back', src: '/collection/hollywood-hijinx-back.jpg' },
    ],
    thumbnail: '/collection/hollywood-hijinx-thumbnail.jpg',
    archivePage: 'https://gallery.guetech.org/hollywood/hollywood.html',
    feelies: 'https://gallery.guetech.org/hollywood/hollywood.html',
    manual: 'https://www.mocagh.org/infocom/hhijinx-manual.pdf',
    note: 'Front and back photographs document Michael’s sealed Atari ST copy—including the taut shrink-wrap and its glare across the cover, the platform banner naming the 3½-inch Atari ST release, and the intact ISBN panel on the back. Hollywood Hijinx shipped without a map; its feelies were a copy of TinselWorld, Aunt Hildegarde’s will, an autographed photo of Uncle Buddy, and a lucky palm tree swizzle stick. Historical materials remain with the preservation projects that made them available.',
  },
  'leather-goddesses': {
    edition: 'Michael’s Amiga copy',
    photos: [
      { id: 'front', label: 'Front', src: '/collection/leather-goddesses-front.jpg' },
      { id: 'back', label: 'Back', src: '/collection/leather-goddesses-back.jpg' },
    ],
    thumbnail: '/collection/leather-goddesses-thumbnail.jpg',
    archivePage: 'https://gallery.guetech.org/leather/leather.html',
    feelies: 'https://gallery.guetech.org/leather/leather.html',
    map: 'https://www.mocagh.org/infocom/lgop-map.pdf',
    manual: 'https://www.mocagh.org/infocom/lgop-manual.pdf',
    note: 'Front and back photographs document Michael’s Amiga copy—with its fluorescent-striped border, original shrink-wrap, and exuberant promise of three playing modes. Historical materials remain with the preservation projects that made them available.',
  },
};

const keptBoxes = [
  { title: 'Journey: The Quest Begins', label: 'Role-Play Chronicles', image: '/kept-boxes/journey.jpg' },
  { title: 'ZorkQuest II: The Crystal of Doom', label: 'Infocomics / No. 2', image: '/kept-boxes/zorkquest-2.jpg' },
  { title: 'The Lost Treasures of Infocom', label: 'Classic anthology / 20 games', image: '/kept-boxes/lost-treasures-1.jpg' },
  { title: 'The Lost Treasures of Infocom II', label: 'Classic anthology / 11 games', image: '/kept-boxes/lost-treasures-2.jpg' },
] as const;

const collectionBadgeDefinitions = [
  { id: 'played-as-kid', label: 'Owned and played as a kid', Icon: Gamepad2 },
  { id: 'childhood-box', label: 'Still has the childhood box', Icon: Archive },
  { id: 'unsealed-copy', label: 'Has an unsealed intact copy', Icon: PackageOpen },
  { id: 'childhood-favorite', label: 'Favorite as a kid', Icon: Heart },
  { id: 'finished-as-kid', label: 'Finished as a kid', Icon: Check },
  { id: 'ai-recreation', label: 'AI-enhanced recreation', Icon: Bot },
  { id: 'second-sealed-copy', label: 'Second sealed copy — lesser condition', Icon: Copy },
] as const;

type CollectionBadgeId = (typeof collectionBadgeDefinitions)[number]['id'];

const collectionBadges: Partial<Record<string, CollectionBadgeId[]>> = {
  enchanter: ['unsealed-copy'],
  sorcerer: ['unsealed-copy'],
  wishbringer: ['played-as-kid'],
  ballyhoo: ['childhood-box', 'finished-as-kid'],
  bureaucracy: ['played-as-kid'],
  'zork-zero': ['played-as-kid'],
  'zork-i': ['played-as-kid', 'finished-as-kid', 'ai-recreation'],
  'beyond-zork': ['played-as-kid', 'unsealed-copy', 'finished-as-kid'],
  'lurking-horror': ['played-as-kid', 'unsealed-copy', 'childhood-favorite', 'finished-as-kid'],
  'leather-goddesses': ['played-as-kid', 'unsealed-copy', 'finished-as-kid'],
  planetfall: ['played-as-kid', 'childhood-box', 'unsealed-copy', 'childhood-favorite', 'ai-recreation'],
  stationfall: ['unsealed-copy'],
  amfv: ['unsealed-copy', 'childhood-favorite', 'finished-as-kid', 'second-sealed-copy'],
  hitchhiker: ['played-as-kid', 'finished-as-kid'],
  trinity: ['played-as-kid', 'unsealed-copy', 'childhood-favorite', 'finished-as-kid', 'second-sealed-copy'],
  starcross: ['second-sealed-copy'],
  seastalker: [],
  moonmist: ['played-as-kid', 'childhood-box', 'finished-as-kid'],
  'the-witness': ['unsealed-copy'],
  sherlock: ['unsealed-copy'],
  'plundered-hearts': ['played-as-kid', 'finished-as-kid'],
};

function BadgeMarks({ badges, expanded = false }: { badges: CollectionBadgeId[]; expanded?: boolean }) {
  const definitions = collectionBadgeDefinitions.filter(({ id }) => badges.includes(id));
  return (
    <span className={`badge-marks ${expanded ? 'badge-marks--expanded' : ''}`} aria-label={definitions.map(({ label }) => label).join(', ')}>
      {definitions.map(({ id, label, Icon }) => (
        <span className={`collection-badge collection-badge--${id}`} title={label} key={id}>
          <Icon size={expanded ? 13 : 8} aria-hidden="true" />
          {expanded && <span>{label}</span>}
        </span>
      ))}
    </span>
  );
}

// Which exhibit is open lives in the URL, so any box can be linked to directly
// and the browser's Back button closes the one you opened.
const GAME_PARAM = 'game';
const urlListeners = new Set<() => void>();

function subscribeToUrl(onChange: () => void) {
  urlListeners.add(onChange);
  window.addEventListener('popstate', onChange);
  return () => { urlListeners.delete(onChange); window.removeEventListener('popstate', onChange); };
}

function navigate(search: string) {
  window.history.pushState(null, '', search || window.location.pathname);
  urlListeners.forEach((notify) => notify());
}

export default function Home() {
  const search = useSyncExternalStore(subscribeToUrl, () => window.location.search, () => '');
  const selected = games.find((game) => game.slug === new URLSearchParams(search).get(GAME_PARAM)) ?? null;

  // Keyed by slug so moving between exhibits always opens on the first photograph.
  const [photo, setPhoto] = useState<{ slug: string; id: string }>({ slug: '', id: '' });

  const selectedPhotography = selected ? collectionPhotography[selected.slug] : undefined;
  const photos = selectedPhotography?.photos ?? [];
  const activePhoto = (selected && photo.slug === selected.slug
    ? photos.find(({ id }) => id === photo.id)
    : undefined) ?? photos[0];
  const showPhoto = (id: string) => setPhoto({ slug: selected?.slug ?? '', id });
  const selectedBadges = selected ? collectionBadges[selected.slug] ?? [] : [];

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
              <button
                id={isLivingWorld ? `game-${game.slug}` : undefined}
                className={`shadowbox ${game.sealed === false ? 'shadowbox--sought' : ''} ${isLivingWorld ? 'shadowbox--living' : ''} ${hasCollectionPhotos ? 'shadowbox--photographed' : ''}`}
                key={game.slug}
                onClick={() => navigate(`?${GAME_PARAM}=${game.slug}`)}
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
              </button>
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

      <Dialog open={selected !== null} onOpenChange={(open) => !open && navigate('')}>
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
                <span className="gateway-frame"><img src={selectedPhotography?.thumbnail ?? `/archive/${selected.image}`} alt={`${selected.title} grey-box cover`} decoding="async" /></span>
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
                  className={`collection-photo collection-photo--${selected.slug} collection-photo--${activePhoto.id}`}
                  src={activePhoto.src}
                  alt={`${activePhoto.label} of ${selectedPhotography.edition}`}
                  decoding="async"
                />
              </div>
              <div className="collection-photo-controls">
                <p><Camera size={15} /><span>{selectedPhotography.edition}</span></p>
                <div role="group" aria-label={`Choose a photograph of ${selected.title}`}>
                  {photos.map(({ id, label }) => (
                    <button type="button" key={id} aria-pressed={id === activePhoto.id} onClick={() => showPhoto(id)}>{label}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="exhibit-story photographed-story">
              <p className="terminal-line">&gt; EXAMINE {selected.title.toUpperCase()}</p>
              <p className="exhibit-year">INFOCOM · {selected.year}</p>
              <DialogTitle className="exhibit-title">{selected.title}</DialogTitle>
              <DialogDescription className="sr-only">Front and back photographs of {selectedPhotography.edition}.</DialogDescription>
              <p className="byline">A work by {selected.author}</p>
              {selectedBadges.length > 0 && <div className="personal-history">
                <p>MICHAEL’S HISTORY WITH THIS WORLD</p>
                <BadgeMarks badges={selectedBadges} expanded />
              </div>}
              <p className={`tribute ${selected.tribute.length > 240 ? 'tribute--long' : ''}`}>{selected.tribute}</p>
              <div className="exhibit-divider" />
              <div className="archive-drawer">
                <div><p className="drawer-label">THE ARCHIVE DRAWER</p><h3>The world beyond the box.</h3></div>
                <div className="archive-items">
                  <a href={selectedPhotography.archivePage} target="_blank" rel="noreferrer"><PackageOpen size={15} /> Open archival scans <ArrowUpRight size={13} /></a>
                  <a href={selectedPhotography.feelies} target="_blank" rel="noreferrer">Feelies <ArrowUpRight size={13} /></a>
                  {selectedPhotography.map && <a href={selectedPhotography.map} target="_blank" rel="noreferrer">Map <ArrowUpRight size={13} /></a>}
                  <a href={selectedPhotography.manual} target="_blank" rel="noreferrer">Manual <ArrowUpRight size={13} /></a>
                </div>
                <p className="drawer-note">{selectedPhotography.note}</p>
              </div>
            </div>
          </article> : selected && <article className="exhibit">
            <div className="exhibit-visual">
              <div className="exhibit-cover"><img src={`/archive/${selected.image}`} alt={`${selected.title} box cover`} decoding="async" /></div>
              <div className="photo-status"><Camera size={16} /><span>Your collection photograph will replace this archival scan.</span></div>
            </div>
            <div className="exhibit-story">
              <p className="terminal-line">&gt; EXAMINE {selected.title.toUpperCase()}</p>
              <p className="exhibit-year">INFOCOM · {selected.year}</p>
              <DialogTitle className="exhibit-title">{selected.title}</DialogTitle>
              <DialogDescription className="sr-only">Collection exhibit for {selected.title}</DialogDescription>
              <p className="byline">A work by {selected.author}</p>
              {selectedBadges.length > 0 && <div className="personal-history">
                <p>MICHAEL’S HISTORY WITH THIS WORLD</p>
                <BadgeMarks badges={selectedBadges} expanded />
              </div>}
              <p className={`tribute ${selected.tribute.length > 240 ? 'tribute--long' : ''}`}>{selected.tribute}</p>
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
