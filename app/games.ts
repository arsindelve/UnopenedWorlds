export type Game = {
  slug: string;
  title: string;
  shortTitle?: string;
  year: number;
  author: string;
  image: string;
  tribute: string;
  sealed?: boolean;
};

// A lightly curated version of the collector's physical wall: two pairwise
// swaps make the lower rows read as science fiction and mystery/adventure.
export const games: Game[] = [
  { slug: 'enchanter', title: 'Enchanter', year: 1983, author: 'Marc Blank & Dave Lebling', image: 'enchanter.jpg', tribute: 'Magic became language: verbs memorized, spells invoked, and words made wonderfully literal.' },
  { slug: 'sorcerer', title: 'Sorcerer', year: 1984, author: 'Steve Meretzky', image: 'sorcerer.jpg', tribute: 'Dream logic, demonology, and the unforgettable danger of a hellhound in the night.' },
  { slug: 'spellbreaker', title: 'Spellbreaker', year: 1985, author: 'Dave Lebling', image: 'spellbreaker.jpg', tribute: 'The Enchanter trilogy closes by asking what happens when magic itself begins to fail.' },
  { slug: 'wishbringer', title: 'Wishbringer', year: 1985, author: 'Brian Moriarty', image: 'wishbringer.jpg', tribute: 'A small-town fairy tale with several solutions and an enormous generosity of spirit.' },
  { slug: 'ballyhoo', title: 'Ballyhoo', year: 1986, author: 'Jeff O’Neill', image: 'ballyhoo.jpg', tribute: 'Behind the big top: greasepaint, desperation, and a circus far stranger after closing time.' },
  { slug: 'nord-and-bert', title: 'Nord and Bert Couldn’t Make Head or Tail of It', shortTitle: 'Nord and Bert', year: 1987, author: 'Jeff O’Neill', image: 'nordbert.jpg', tribute: 'Eight stories in which language is not merely the interface—it is the entire playground.' },
  { slug: 'bureaucracy', title: 'Bureaucracy', year: 1987, author: 'Douglas Adams & Infocom', image: 'bureaucracy.jpg', tribute: 'Forms, queues, missing mail, and the heroic struggle to make anyone accept your new address.' },
  { slug: 'border-zone', title: 'Border Zone', year: 1987, author: 'Marc Blank', image: 'borderzone.jpg', tribute: 'Three Cold War perspectives unfold in real time—even while you hesitate at the prompt.' },

  { slug: 'zork-zero', title: 'Zork Zero', year: 1988, author: 'Steve Meretzky', image: 'zork0.jpg', tribute: 'The magnificent aberration: illustrated, excessive, funny, and impossible to leave outside the wall.' },
  { slug: 'zork-i', title: 'Zork I', year: 1980, author: 'Marc Blank & Dave Lebling', image: 'zork1.jpg', tribute: 'The white house, the brass lantern, and the grammar of an entirely new kind of world.' },
  { slug: 'zork-ii', title: 'Zork II', year: 1981, author: 'Dave Lebling & Marc Blank', image: 'zork2.jpg', tribute: 'A capricious wizard and an empire growing stranger, funnier, and more confidently itself.' },
  { slug: 'zork-iii', title: 'Zork III', year: 1982, author: 'Dave Lebling', image: 'zork3.jpg', tribute: 'The Great Underground Empire turns melancholy, severe, and unexpectedly reflective.' },
  { slug: 'beyond-zork', title: 'Beyond Zork', year: 1987, author: 'Brian Moriarty', image: 'beyond.jpg', tribute: 'Parser fiction meets role-playing game, complete with statistics, combat, and a living map.' },
  { slug: 'suspended', title: 'Suspended', year: 1983, author: 'Michael Berlyn', image: 'suspended.jpg', sealed: false, tribute: 'Six robots, six kinds of perception, and one of interactive fiction’s most audacious physical packages.' },
  { slug: 'infidel', title: 'Infidel', year: 1983, author: 'Michael Berlyn', image: 'infidel.jpg', tribute: 'An archaeological adventure unafraid to make its player character the sharpest trap of all.' },
  { slug: 'hollywood-hijinx', title: 'Hollywood Hijinx', year: 1987, author: 'Dave Anderson', image: 'hollywood.jpg', tribute: 'One eccentric estate, ten hidden treasures, and old Hollywood rebuilt as a puzzle box.' },

  { slug: 'lurking-horror', title: 'The Lurking Horror', year: 1987, author: 'Dave Lebling', image: 'lurking.jpg', tribute: 'A blizzard, a university network, and something ancient moving beneath the machine room.' },
  { slug: 'leather-goddesses', title: 'Leather Goddesses of Phobos', shortTitle: 'Leather Goddesses', year: 1986, author: 'Steve Meretzky', image: 'leather.jpg', tribute: 'Pulp science fiction with three naughtiness settings and absolutely no shortage of nerve. Should Michael have owned this as a kid? Probably not. But he didn’t get the jokes anyway.' },
  { slug: 'planetfall', title: 'Planetfall', year: 1983, author: 'Steve Meretzky', image: 'planetfall.jpg', tribute: 'A mop, a doomed planet, and Floyd—the moment a parser made thousands of players feel loss.' },
  { slug: 'stationfall', title: 'Stationfall', year: 1987, author: 'Steve Meretzky', image: 'stationfall.jpg', tribute: 'Floyd returns to a station full of paperwork, peril, and one deeply suspicious ostrich.' },
  { slug: 'amfv', title: 'A Mind Forever Voyaging', shortTitle: 'A Mind Forever Voyaging', year: 1985, author: 'Steve Meretzky', image: 'amfv.jpg', tribute: 'Interactive fiction grew up, looked decades ahead, and returned with a warning.' },
  { slug: 'hitchhiker', title: 'The Hitchhiker’s Guide to the Galaxy', shortTitle: 'Hitchhiker’s Guide', year: 1984, author: 'Douglas Adams & Steve Meretzky', image: 'hitchhiker.jpg', tribute: 'A collaboration so gleefully unfair that even its packaging became part of the joke.' },
  { slug: 'trinity', title: 'Trinity', year: 1986, author: 'Brian Moriarty', image: 'trinity.jpg', tribute: 'Beautiful, horrifying, formally precise—a meditation on the instant the world changed.' },
  { slug: 'starcross', title: 'Starcross', year: 1982, author: 'Dave Lebling', image: 'starcross.jpg', tribute: 'First contact aboard an alien ship, engineered with the clean confidence of hard science fiction.' },

  { slug: 'seastalker', title: 'Seastalker', year: 1984, author: 'Stu Galley & Jim Lawrence', image: 'seastalker.jpg', tribute: 'Junior-level fiction treated young players as inventors, explorers, and genuine heroes.' },
  { slug: 'moonmist', title: 'Moonmist', year: 1986, author: 'Stu Galley', image: 'moonmist.jpg', tribute: 'A Cornish castle mystery that reshuffles its culprit, motive, clues, and color every time.' },
  { slug: 'the-witness', title: 'The Witness', year: 1983, author: 'Stu Galley', image: 'witness.jpg', tribute: 'A hard-boiled Los Angeles murder compressed into twelve tense hours.' },
  { slug: 'sherlock', title: 'Sherlock: The Riddle of the Crown Jewels', shortTitle: 'Sherlock', year: 1988, author: 'Bob Bates', image: 'sherlock.jpg', tribute: 'Victorian London becomes a clockwork stage for Holmes, Watson, and one audacious theft.' },
  { slug: 'deadline', title: 'Deadline', year: 1981, author: 'Marc Blank', image: 'deadline.jpg', tribute: 'A living country-house mystery whose evidence existed both on screen and in your hands.' },
  { slug: 'cutthroats', title: 'Cutthroats', year: 1984, author: 'Michael Berlyn & Jerry Wolper', image: 'cutthroats.jpg', tribute: 'Diving tables, shipwrecks, and a salt-stained conspiracy built to spill beyond the screen.' },
  { slug: 'plundered-hearts', title: 'Plundered Hearts', year: 1987, author: 'Amy Briggs', image: 'plundered.jpg', tribute: 'Romance, piracy, and a heroine whose story widened the imagined audience for the form.' },
  { slug: 'suspect', title: 'Suspect', year: 1984, author: 'Dave Lebling', image: 'suspect.jpg', tribute: 'At the costume ball, everyone is watching—and the murderer already has a plan for you.' },
];
