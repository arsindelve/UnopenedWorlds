import { Archive, Bot, Check, Copy, Gamepad2, Heart, PackageOpen } from 'lucide-react';

// Shared by the wall and by every game's own page.

export const galleryPages: Record<string, string> = {
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

export type Photograph = {
  id: string;
  label: string;
  src: string;
  // Full scans should retain their native proportions in the exhibit rather
  // than being trimmed to the default 5:6 box frame.
  aspectRatio?: string;
  // Overrides the game's edition line. A game holds more than one object once
  // the folio, the reissues and the feelies arrive, and they are not all "the
  // sealed copy".
  caption?: string;
  // Once Michael has photographed his own map or manual, the archive drawer
  // should open that rather than sending people to someone else's scan.
  role?: 'map' | 'manual' | 'feelies';
};

export type CollectionPhotography = {
  edition: string;
  // Ordered; the first is what opens. Front and back today, and whatever else
  // the copy has—folio, spine, feelies—as they are photographed.
  photos: Photograph[];
  thumbnail: string;
  archivePage?: string;
  feelies?: string;
  map?: string;
  manual?: string;
  note: string;
};

export const collectionPhotography: Record<string, CollectionPhotography> = {
  seastalker: {
    edition: 'Michael’s sealed Apple II copy',
    photos: [
      { id: 'front', label: 'Front', src: '/collection/seastalker-front.jpg', aspectRatio: '4448 / 5314' },
      { id: 'back', label: 'Back', src: '/collection/seastalker-back.jpg', aspectRatio: '4448 / 5314' },
    ],
    thumbnail: '/collection/seastalker-front.jpg',
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
      { id: 'front', label: 'Front', src: '/collection/lurking-horror-front.jpg', aspectRatio: '4448 / 5314' },
      { id: 'back', label: 'Back', src: '/collection/lurking-horror-back.jpg', aspectRatio: '4448 / 5314' },
    ],
    thumbnail: '/collection/lurking-horror-front.jpg',
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
      { id: 'folio-front', label: 'Folio front', src: '/collection/planetfall-folio-front.jpg', caption: 'The 1983 folio edition' },
      { id: 'folio-back', label: 'Folio back', src: '/collection/planetfall-folio-back.jpg', caption: 'The 1983 folio edition' },
      { id: 'solid-gold-front', label: 'Solid Gold front', src: '/collection/planetfall-solid-gold-front.jpg', caption: 'The Solid Gold reissue, Apple II' },
      { id: 'solid-gold-back', label: 'Solid Gold back', src: '/collection/planetfall-solid-gold-back.jpg', caption: 'The Solid Gold reissue, Apple II' },
      { id: 'manual', label: 'Manual', src: '/collection/planetfall-manual.jpg', caption: 'Michael’s Planetfall manual — command guide', role: 'manual' },
      { id: 'manual-cover', label: 'Manual, cover', src: '/collection/planetfall-stellar-patrol.jpg', caption: 'The folio manual — Today’s Stellar Patrol', role: 'manual' },
      { id: 'manual-spread', label: 'Manual, spread', src: '/collection/planetfall-manual-spread.jpg', caption: 'The folio manual, opened — talking to Planetfall', role: 'manual' },
      { id: 'manual-skills', label: 'Manual, skills', src: '/collection/planetfall-manual-skills.jpg', caption: 'The folio manual — learn valuable skills and see the galaxy', role: 'manual' },
      { id: 'manual-command', label: 'Manual, command', src: '/collection/planetfall-manual-command.jpg', caption: 'The folio manual — take command of your tomorrow today', role: 'manual' },
      { id: 'manual-back', label: 'Manual, back', src: '/collection/planetfall-manual-back.jpg', caption: 'The folio manual, closing pages', role: 'manual' },
      { id: 'map', label: 'Map', src: '/collection/planetfall-map.jpg', caption: 'Michael’s Planetfall map — printed guidance for navigating the Galactic Union', role: 'map' },
      { id: 'id-card', label: 'I.D. card', src: '/collection/planetfall-id-card.jpg', caption: 'Special Assignment Task Force I.D. card', role: 'feelies' },
      { id: 'id-card-back', label: 'I.D. card, back', src: '/collection/planetfall-id-card-back.jpg', caption: 'The I.D. card’s reverse — Ensign 7th Class, and a warning that mutilating it is punishable by death', role: 'feelies' },
      { id: 'postcard-nebulon', label: 'Nebulon postcard', src: '/collection/planetfall-postcard-nebulon.jpg', caption: 'Postcard from Nebulon', role: 'feelies' },
      { id: 'postcard-nebulon-back', label: 'Nebulon, back', src: '/collection/planetfall-postcard-nebulon-back.jpg', caption: 'Postcard from Nebulon, reverse', role: 'feelies' },
      { id: 'postcard-accardia', label: 'Accardia postcard', src: '/collection/planetfall-postcard-accardia.jpg', caption: 'Postcard from Accardia', role: 'feelies' },
      { id: 'postcard-accardia-back', label: 'Accardia, back', src: '/collection/planetfall-postcard-accardia-back.jpg', caption: 'Postcard from Accardia, reverse', role: 'feelies' },
      { id: 'postcard-ramos', label: 'Ramos II postcard', src: '/collection/planetfall-postcard-ramos.jpg', caption: 'Postcard from Ramos II', role: 'feelies' },
      { id: 'postcard-ramos-back', label: 'Ramos II, back', src: '/collection/planetfall-postcard-ramos-back.jpg', caption: 'Postcard from Ramos II, reverse', role: 'feelies' },
      { id: 'diary-01', label: 'Diary, page 1', src: '/collection/planetfall-diary-01.jpg', caption: 'Michael’s Stellar Patrol diary — page 1', role: 'feelies' },
      { id: 'diary-02', label: 'Diary, page 2', src: '/collection/planetfall-diary-02.jpg', caption: 'Michael’s Stellar Patrol diary — page 2', role: 'feelies' },
      { id: 'diary-03', label: 'Diary, page 3', src: '/collection/planetfall-diary-03.jpg', caption: 'Michael’s Stellar Patrol diary — page 3', role: 'feelies' },
      { id: 'diary-04', label: 'Diary, page 4', src: '/collection/planetfall-diary-04.jpg', caption: 'Michael’s Stellar Patrol diary — page 4', role: 'feelies' },
      { id: 'diary-05', label: 'Diary, page 5', src: '/collection/planetfall-diary-05.jpg', caption: 'Michael’s Stellar Patrol diary — page 5', role: 'feelies' },
      { id: 'diary-06', label: 'Diary, page 6', src: '/collection/planetfall-diary-06.jpg', caption: 'Michael’s Stellar Patrol diary — page 6', role: 'feelies' },
      { id: 'diary-07', label: 'Diary, page 7', src: '/collection/planetfall-diary-07.jpg', caption: 'Michael’s Stellar Patrol diary — page 7', role: 'feelies' },
    ],
    thumbnail: '/collection/planetfall-thumbnail.jpg',
    note: 'Twenty-eight photographs. The sealed IBM PC grey box front and back; the 1983 folio edition that preceded it; the Solid Gold reissue for the Apple II; the folio manual across six of its pages; Michael’s Planetfall map; and fifteen feelies from Michael’s own package: the Special Assignment Task Force I.D. card, postcards from Nebulon, Accardia, and Ramos II, and Michael’s seven-page Stellar Patrol diary. The grey box shows a heavy shrink-wrap sheen across the poster and, on its back, the 55 Wheeler Street address Infocom used before it moved to CambridgePark Drive.',
  },
  stationfall: {
    edition: 'Michael’s sealed IBM PC copy',
    photos: [
      { id: 'front', label: 'Front', src: '/collection/stationfall-front.jpg' },
      { id: 'back', label: 'Back', src: '/collection/stationfall-back.jpg' },
    ],
    thumbnail: '/collection/stationfall-front.jpg',
    archivePage: 'https://gallery.guetech.org/stationfall/stationfall.html',
    feelies: 'https://gallery.guetech.org/stationfall/stationfall.html',
    map: 'https://www.mocagh.org/infocom/stationfall-map.pdf',
    manual: 'https://www.mocagh.org/infocom/stationfall-manual.pdf',
    note: 'Front and back photographs document Michael’s sealed IBM PC copy—the original Infocom wrap still holding the box closed, with Floyd, the station’s paperwork, and the back-panel photograph of the contents all intact. Stationfall shipped with a blueprint of the Gamma-Delta-Gamma Class deep-space station, three bureaucratic forms, and a Stellar Patrol patch. Historical materials remain with the preservation projects that made them available.',
  },
  starcross: {
    edition: 'Michael’s sealed IBM PC copy',
    photos: [
      { id: 'front', label: 'Front', src: '/collection/starcross-front.jpg', aspectRatio: '4345 / 5324' },
      { id: 'back', label: 'Back', src: '/collection/starcross-back.jpg', aspectRatio: '4345 / 5324' },
    ],
    thumbnail: '/collection/starcross-front.jpg',
    archivePage: 'https://gallery.guetech.org/starcross/starcross.html',
    feelies: 'https://gallery.guetech.org/starcross/starcross.html',
    map: 'https://www.mocagh.org/infocom/starcross-map.pdf',
    manual: 'https://www.mocagh.org/infocom/starcross-manual.pdf',
    note: 'Front photograph of Michael’s sealed IBM PC copy, with its original Babbage’s price label and the bright magenta-striped science-fiction border intact. Historical materials remain with the preservation projects that made them available.',
  },
  'zork-zero': {
    edition: 'Michael’s Amiga copy',
    photos: [
      { id: 'front', label: 'Front', src: '/collection/zork-zero-front.jpg' },
      { id: 'back', label: 'Back', src: '/collection/zork-zero-back.jpg' },
    ],
    thumbnail: '/collection/zork-zero-front.jpg',
    archivePage: 'https://gallery.guetech.org/zork0/zork0.html',
    feelies: 'https://gallery.guetech.org/zork0/zork0.html',
    note: 'Front and back photographs document Michael’s Amiga copy of Zork Zero—the 1988 graphic adventure edition, with its stone-cut title treatment, on-screen hints, and the Infocom Graphic mark on the back panel.',
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

export const collectionBadgeDefinitions = [
  { id: 'played-as-kid', label: 'Owned and played as a kid', Icon: Gamepad2 },
  { id: 'childhood-box', label: 'Still has the childhood box', Icon: Archive },
  { id: 'unsealed-copy', label: 'Has an unsealed intact copy', Icon: PackageOpen },
  { id: 'childhood-favorite', label: 'Favorite as a kid', Icon: Heart },
  { id: 'finished-as-kid', label: 'Finished as a kid', Icon: Check },
  { id: 'ai-recreation', label: 'AI-enhanced recreation', Icon: Bot },
  { id: 'second-sealed-copy', label: 'Second sealed copy — lesser condition', Icon: Copy },
] as const;

export type CollectionBadgeId = (typeof collectionBadgeDefinitions)[number]['id'];

export const collectionBadges: Partial<Record<string, CollectionBadgeId[]>> = {
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
