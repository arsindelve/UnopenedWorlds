export type Game = {
  slug: string;
  title: string;
  shortTitle?: string;
  year: number;
  author: string;
  image: string;
  tribute: string;
  unsealed?: boolean;
};

// GAME PAGE COPY LIVES HERE.
//
// Each record is one box on the wall. To change a game page, find its `slug`
// and edit `tribute`; title, author, year, and cover filename sit directly
// above it. This is deliberately a readable source file, not a CMS.
//
// A lightly curated version of the collector's physical wall: two pairwise
// swaps make the lower rows read as science fiction and mystery/adventure.
export const games: Game[] = [
  {
    slug: 'enchanter',
    title: 'Enchanter',
    year: 1983,
    author: 'Marc Blank & Dave Lebling',
    image: 'enchanter.jpg',
    tribute:
      'Enchanter begins with a beautifully unfair job assignment: the Circle’s accomplished magicians cannot enter Krill’s realm without being recognized, so they send the least imposing apprentice they can find. You know a handful of spells, you are outclassed by everyone who matters, and the warlock has already defeated every serious attempt to stop him. Marc Blank and Dave Lebling made magic feel less like ammunition than grammar. Spells are learned, memorized, and applied with the care of a new verb; a word that opens a door may also undo an enchantment, expose a hidden path, or make a joke land with sudden force. The castle is dangerous, funny, and remarkably physical. Enchanter proved that a fantasy game could make language itself feel like power—and make a novice’s ignorance the one thing that saves the world.',
  },
  {
    slug: 'sorcerer',
    title: 'Sorcerer',
    year: 1984,
    author: 'Steve Meretzky',
    image: 'sorcerer.jpg',
    tribute:
      'Sorcerer is what happens after the apprentice comes home from saving the world and discovers that being trusted is much more frightening. You have earned a place in the Circle of Enchanters, studying beside Belboz the Necromancer—your mentor, friend, and perhaps the most powerful magician alive. Then Belboz grows distant, strange voices come from his chambers, and he disappears. Steve Meretzky takes the spellbook of Enchanter into darker territory: hellhounds, waking dreams, one-use potions, and a world where the next command may be an act of magic or an invitation to disaster. It is full of Meretzky’s absurdist sparkle, but the emotional engine is unusually intimate. This is not a kingdom asking an unknown hero for help. It is a student going after the person who taught them how to be brave.',
  },
  {
    slug: 'spellbreaker',
    title: 'Spellbreaker',
    year: 1985,
    author: 'Dave Lebling',
    image: 'spellbreaker.jpg',
    tribute:
      'Spellbreaker begins after the triumphs. You have defeated Krill, saved Belboz, risen from apprentice to head of the Circle of Enchanters—and now the thing on which the whole kingdom depends has started to fail. Ordinary spells sputter, powerful ones go wrong, and a convocation of the land’s greatest magicians is reduced to toads and newts before it can decide what to do. Dave Lebling turns the Enchanter trilogy inside out: magic is still your language, but it is no longer a dependable tool. Every incantation carries a little doubt; every cube, spell, and strange new landscape becomes evidence of a deeper fracture. It is an expert game in the best sense—demanding not merely cleverness, but faith in a world whose rules have begun to betray you.',
  },
  {
    slug: 'wishbringer',
    title: 'Wishbringer',
    year: 1985,
    author: 'Brian Moriarty',
    image: 'wishbringer.jpg',
    tribute:
      'Wishbringer begins with the kind of errand nobody remembers: a postal clerk in Festeron has an envelope to deliver to Ye Olde Magick Shoppe. Then there is a kidnapped cat, an old woman who needs help, and a quiet seaside town that suddenly has trolls, goons, towers, and an alarming interest in a magical stone. Brian Moriarty made a beginner’s adventure without making it a lesser one. Wishbringer can grant seven wishes, each an inviting shortcut—but nearly every obstacle also yields to patience, observation, and the sort of sideways thinking Infocom games teach best. The result is a fairy tale with real consequence and a wonderfully generous design: a game that offers a hand when you need one, then quietly dares you to see how far your own wits can carry you.',
  },
  {
    slug: 'ballyhoo',
    title: 'Ballyhoo',
    year: 1986,
    author: 'Jeff O’Neill',
    image: 'ballyhoo.jpg',
    tribute:
      'Ballyhoo begins with the small, excellent impulse to stay behind after the circus for a free look at what happens when the audience goes home. What you find is not glamour but cramped wagons, exhausted performers, exotic animals, and a conversation about the kidnapping of the owner’s daughter. Jeff O’Neill makes the traveling show feel like a defensive little town that happens to pack up overnight: everyone has a role, everyone is tired, and none of them particularly wants an outsider asking questions. The rescue is a mystery, but the real pleasure is backstage access to a place designed to look magical from the bleachers and complicated, seedy, and dangerous from within.',
  },
  {
    slug: 'nord-and-bert',
    title: 'Nord and Bert Couldn’t Make Head or Tail of It',
    shortTitle: 'Nord and Bert',
    year: 1987,
    author: 'Jeff O’Neill',
    image: 'nordbert.jpg',
    tribute:
      'Nord and Bert takes the parser’s oldest promise—that words can change the world—and makes it literal. Jeff O’Neill sends you to Punster for eight short scenarios in which cliches, spoonerisms, homonyms, and puns are not decorations around the puzzle; they are the puzzle. Make a mountain out of a molehill and the ground obeys. Turn a bow into a beau and the grammar becomes the machinery. The first seven tales can be tackled in any order, each with its own verbal game; their answers unlock the eighth. It is less an adventure than a cabinet of linguistic toys, delivered with the rare confidence to make the player meet it halfway. No other Infocom game is so delighted by the fact that English is strange.',
  },
  {
    slug: 'bureaucracy',
    title: 'Bureaucracy',
    year: 1987,
    author: 'Douglas Adams & Infocom',
    image: 'bureaucracy.jpg',
    tribute:
      'Douglas Adams replaced the score with a blood pressure gauge, and that one decision explains the whole game: it is not measuring your progress, it is measuring your anger, and it will kill you with a burst artery if you let it win. You have moved house, the bank will not acknowledge your new address, and Paris is waiting. Everything standing between the two is a form, a queue, or a person following a rule that stopped making sense years ago. It opens by asking you to fill in a questionnaire, then quietly gets your answers wrong for the rest of your life. Michael played this one as a kid. There is no badge above for finishing it, and there is no shame in that.',
  },
  {
    slug: 'border-zone',
    title: 'Border Zone',
    year: 1987,
    author: 'Marc Blank',
    image: 'borderzone.jpg',
    tribute:
      'Border Zone is Marc Blank’s coldest experiment: a three-part spy story in which the clock keeps running while you think. An American businessman, a Western agent, and an Eastern agent approach the Frobnia–Litzenburg border from different sides of the same crisis; each knows only the piece of the plot their role permits. That structure turns the usual parser pleasure of stopping to consider every command into a liability. Trains depart, guards move, contacts lose patience, and the world makes decisions without you. The map, railway schedule, phrasebook, and matchbook were all part of the pressure. Border Zone understands that espionage is not chiefly about clever plans. It is about being late, being watched, and having to act before you know enough.',
  },

  {
    slug: 'zork-zero',
    title: 'Zork Zero',
    year: 1988,
    author: 'Steve Meretzky',
    image: 'zork0.jpg',
    tribute:
      'Steve Meretzky took the oldest kingdom in interactive fiction and gave it a lavish origin story, a court full of people who should not be trusted, and the most elaborate game of Double Fanucci ever committed to a computer screen. You are a lowly apprentice in the Great Underground Empire before it became a ruin, which means the castle is still occupied, the royal family is still making demands, and the Jester is still somehow the person most likely to explain the rules. Zork Zero uses graphics not as decoration but as another way to make the world unruly: maps, documents, card games, and contraptions all expect you to look closely. It is a prequel with the confidence to be grander, stranger, and funnier than the legend it is introducing.',
  },
  {
    slug: 'zork-i',
    title: 'Zork I',
    year: 1980,
    author: 'Marc Blank & Dave Lebling',
    image: 'zork1.jpg',
    tribute:
      'Zork I begins at a white house so ordinary that it is almost an insult. Then there is a mailbox, a trapdoor, a brass lantern, and beneath them an entire lost empire waiting in the dark. Marc Blank and Dave Lebling made a world that feels discovered rather than explained: every room has its own private logic, every object seems worth trying, and the jokes arrive with the confidence of a place that has been there longer than you have. The thief, the maze, the trophy case—these are not merely famous puzzles. They are the grammar of interactive fiction, learned one dangerous command at a time.',
  },
  {
    slug: 'zork-ii',
    title: 'Zork II',
    year: 1981,
    author: 'Dave Lebling & Marc Blank',
    image: 'zork2.jpg',
    tribute:
      'Zork II is where the Great Underground Empire learns how funny it can be. The kingdom is getting stranger, but it is no less sure of itself: an abandoned complex still supplies its own bureaucrats, its own impossible machinery, and one wizard who treats your expedition as an opportunity for light entertainment. Dave Lebling and Marc Blank turn sequel-building into escalation, giving the world more personality without making it feel less dangerous. The effect is a rare kind of confidence—an adventure that can put you in mortal trouble, then make you laugh at the note it leaves behind.',
  },
  {
    slug: 'zork-iii',
    title: 'Zork III',
    year: 1982,
    author: 'Dave Lebling',
    image: 'zork3.jpg',
    tribute:
      'Zork III strips the series down to its deepest rooms. The landscape is smaller, colder, and more deliberate; there are fewer treasures to collect and more reasons to wonder what a career in adventure has actually amounted to. Dave Lebling makes the Great Underground Empire feel old here—not simply ruined, but exhausted by its own legends. Its puzzles are severe, its encounters unexpectedly intimate, and its ending asks for something the earlier games did not: not just ingenuity, but judgment. It is a final chapter with the nerve to become quiet, and that quiet is what makes it linger.',
  },
  {
    slug: 'beyond-zork',
    title: 'Beyond Zork',
    year: 1987,
    author: 'Brian Moriarty',
    image: 'beyond.jpg',
    tribute:
      'Brian Moriarty took the familiar pleasures of Zork—an ancient kingdom, a dangerous wilderness, a ridiculous inventory—and set them loose inside a role-playing game. You are not merely a visitor in the Great Underground Empire’s distant aftermath: you have attributes, equipment, spells, fights you can lose, and a sprawling landscape that refuses to wait politely around the next compass direction. The prose has Zork’s old wit, but Beyond Zork is fascinated by systems: strange creatures trade rumors, objects change the odds, and the map becomes a genuine place rather than a sequence of rooms. It is Infocom trying to make parser fiction bigger, riskier, and more alive—and somehow still remembering that the best thing in a dungeon may be a joke.',
  },
  {
    slug: 'trinity',
    title: 'Trinity',
    year: 1986,
    author: 'Brian Moriarty',
    image: 'trinity.jpg',
    tribute:
      'It opens in Kensington Gardens on the last ordinary afternoon in history and ends in the New Mexico desert at 5:29 in the morning on 16 July 1945, with you as the reason the gadget works. Brian Moriarty laid a fantasy of toadstools and sundials and paper cranes over the top of the twentieth century’s actual arithmetic, then closed the trap: the puzzle you have been solving all along turns out to be the one that cannot be un-solved. Its ending is neither a victory nor a death but a fact you are made complicit in—and it is the only game that has ever made an origami crane feel like an accusation.',
  },
  {
    slug: 'infidel',
    title: 'Infidel',
    year: 1983,
    author: 'Michael Berlyn',
    image: 'infidel.jpg',
    tribute:
      'Infidel begins with an unusually honest adventure-game premise: you are alone in the Egyptian desert because you treated everyone around you badly, and they finally left. You are a small-time explorer after a lost pyramid, your supplies are thin, the promised navigation equipment is late, and the only thing stronger than your panic is your conviction that the treasure ought to be yours. Michael Berlyn made the tomb a test of language as much as nerve—its hieroglyphics, chambers, and mechanisms ask you to learn the place on its own terms. It is archaeology without romance: hot, solitary, ingenious, and haunted by the fact that its protagonist may be the worst thing ever to enter the ruin.',
  },
  {
    slug: 'plundered-hearts',
    title: 'Plundered Hearts',
    year: 1987,
    author: 'Amy Briggs',
    image: 'plundered.jpg',
    tribute:
      'Amy Briggs did not bolt a heroine onto a pirate adventure; she built the whole adventure around the fact that you are one. A letter says your father is ill in the West Indies, a voyage becomes an abduction, and suddenly Lady Dimsford has a hostile island, a dangerous governor, a pirate captain, and no reason to wait politely for rescue. Plundered Hearts is Infocom’s only romance, but its real innovation is agency: its heroine reads people, takes risks, and makes the plot happen. Briggs brought the sweep of historical romance to the parser without surrendering the pleasures of a puzzle box. The result is witty, swashbuckling, and much sharper than the category its title invited people to dismiss.',
  },

  {
    slug: 'lurking-horror',
    title: 'The Lurking Horror',
    year: 1987,
    author: 'Dave Lebling',
    image: 'lurking.jpg',
    tribute:
      'Dave Lebling set his only horror story somewhere he knew exactly: a technical institute in a blizzard, nearly empty, where the warmest room is the one with the mainframe in it. You are a student with a paper due, and the terrible thing is not in a castle—it is under the steam tunnels, reachable from the machine room, and it has been patient. It is the Infocom game that understood that for a certain kind of kid the computer lab at two in the morning was already the haunted house, and that the horror would land harder typed into the same kind of terminal you were sitting at.',
  },
  {
    slug: 'leather-goddesses',
    title: 'Leather Goddesses of Phobos',
    shortTitle: 'Leather Goddesses',
    year: 1986,
    author: 'Steve Meretzky',
    image: 'leather.jpg',
    tribute:
      'You choose your gender by picking a door in Joe’s Bar in Upper Sandusky, Ohio, in 1936, and roughly ninety seconds later you are on Phobos, assembling a machine out of parts the plot has scattered across the solar system. Steve Meretzky wrote it in three naughtiness settings, shipped it with a 3-D comic and a scratch-and-sniff card the game itself tells you when to scratch, and made the funniest thing Infocom ever put in a grey box. Should Michael have owned this as a kid? Probably not. But he didn’t get the jokes anyway.',
  },
  {
    slug: 'planetfall',
    title: 'Planetfall',
    year: 1983,
    author: 'Steve Meretzky',
    image: 'planetfall.jpg',
    tribute:
      'You begin as Ensign Seventh Class aboard the S.P.S. Feinstein, enduring the petty tyranny of Blather and wondering whether five generations of family service have brought you to this: polishing Deck Nine. Then the ship comes apart, the job stops being a joke, and a deserted planet asks everything of you. Steve Meretzky makes Resida funny, lonely, and increasingly desperate, but its great invention is Floyd: not a mechanism that assists the hero, but a companion who changes what being the hero means. This is the game that proved a parser could make a friendship feel real. For Michael, it is not merely an Infocom classic; it is one of the worlds that made this whole wall necessary.',
  },
  {
    slug: 'stationfall',
    title: 'Stationfall',
    year: 1987,
    author: 'Steve Meretzky',
    image: 'stationfall.jpg',
    tribute:
      'Steve Meretzky did not try to repeat Planetfall’s loneliness. He gave you Floyd again, then put you aboard an enormous space station whose systems, staff, and life forms seem designed to make an ensign regret coming aboard. The station is a comic machine for escalating inconvenience: the smallest task requires trespass, paperwork, or precisely the right kind of nonsense, and somewhere behind the service corridors there is a crisis large enough to end the day for everybody. Floyd is older, stranger, and still the emotional center of the whole ridiculous apparatus. It is a sequel that knows a beloved character is not enough; it has to give him a new way to save you.',
  },
  {
    slug: 'amfv',
    title: 'A Mind Forever Voyaging',
    shortTitle: 'A Mind Forever Voyaging',
    year: 1985,
    author: 'Steve Meretzky',
    image: 'amfv.jpg',
    tribute:
      'An AI raised rather than programmed: PRISM spent a simulated childhood as a boy named Perry Simm so that it would grow a self worth asking. Then its makers sent it into the future their policy would build — 2041, 2051, 2071 — and told it to report what it found. Steve Meretzky wrote that in 1985, and it reads now less like science fiction than like minutes from a meeting we are currently in: what we owe a mind we made, and whether the people who commissioned it will believe it when it tells them the truth. Of all thirty-two boxes on this wall, this is the one that got to Michael.',
  },
  {
    slug: 'hitchhiker',
    title: 'The Hitchhiker’s Guide to the Galaxy',
    shortTitle: 'Hitchhiker’s Guide',
    year: 1984,
    author: 'Douglas Adams & Steve Meretzky',
    image: 'hitchhiker.jpg',
    tribute:
      'Douglas Adams and Steve Meretzky built a game that lies to you, withholds from you, and occasionally kills you for being reasonable—then shipped it with a Don’t Panic! button, sunglasses that go black at the first sign of danger, a microscopic space fleet, and a quantity of no tea. The babel fish puzzle alone converted a generation of children into people who take notes. It is the one parser game where the correct posture toward the parser is suspicion, and the joke is that the packaging told you so: the fluff was authentic, the peril was real, and the tea was never coming.',
  },
  {
    slug: 'suspended',
    title: 'Suspended',
    year: 1983,
    author: 'Michael Berlyn',
    image: 'suspended.jpg',
    unsealed: true,
    tribute:
      'Michael Berlyn took a familiar premise—wake up alone to find an automated city failing—and made its central constraint physical: you cannot move. Instead, you inhabit six robots, each perceptually incomplete, each giving you a different way to understand a world coming apart. One sees, one hears, one feels; one can reach somewhere another cannot. The city is a damaged system whose controls nobody left you a manual for, and its strange plastic face package told you before you typed a word that this was going to be a game about cognition. Suspended feels less like commanding a crew than waking up with your senses distributed across the room.',
  },
  {
    slug: 'starcross',
    title: 'Starcross',
    year: 1982,
    author: 'Dave Lebling',
    image: 'starcross.jpg',
    tribute:
      'Dave Lebling sends you into the far future with a lightship, a grappling line, and the very bad judgment required to board an abandoned alien starship. The vessel is immense, sterile, and full of evidence that its makers had no interest in human scale: unfamiliar machinery, living specimens, and puzzles that keep asking whether you understand the same thing the ship understands. Starcross belongs to Infocom’s first, purest run of science-fiction worlds—no comic lens, no fantasy exit—just a strange object drifting in the dark and a player forced to make contact with it. The package promised an expert-level challenge. It was not bluffing.',
  },

  {
    slug: 'seastalker',
    title: 'Seastalker',
    year: 1984,
    author: 'Stu Galley & Jim Lawrence',
    image: 'seastalker.jpg',
    tribute:
      'It asks your name before anything else happens, and then the crew of the Scimitar spends the rest of the game using it. That is the whole trick, and in 1984 it was enormous: you were not steering a character, you were the young inventor being radioed for help by an underwater laboratory with something outside its windows. Galley and Lawrence wrote Infocom’s junior-level story without softening the machinery underneath—there is a saboteur among the crew, and the sonar puzzle simply expects the paper chart to be lying on the desk beside you.',
  },
  {
    slug: 'moonmist',
    title: 'Moonmist',
    year: 1986,
    author: 'Stu Galley',
    image: 'moonmist.jpg',
    tribute:
      'It asks your favourite colour, and on that answer quietly deals you one of four entirely different mysteries—four culprits, four motives, four hidden treasures, four sets of clues, all inside the same Cornish castle over the same weekend. Stu Galley built it as Infocom’s introductory mystery, the one meant to be somebody’s first, and then made it the one you could not finish off in a single sitting. The white lady drifting through Tresyllian is the ghost story. The real unease is that the friend who invited you is genuinely in danger, and the game will not tell you twice which danger it is this time.',
  },
  {
    slug: 'the-witness',
    title: 'The Witness',
    year: 1983,
    author: 'Stu Galley',
    image: 'witness.jpg',
    tribute:
      'The Witness gives you the kind of case that ought to be simple: a frightened millionaire has asked for protection on a stormy night near Los Angeles. Then someone dies anyway. Stu Galley turns that failure into a twelve-hour clock, a house full of alibis, and a detective story that cares less about naming a culprit than proving you can put one away. You question suspects, test their stories, decide when the evidence is enough, and work beside Sergeant Duffy while the case keeps moving. It has the clipped glamour of 1938 hard-boiled fiction, but its real pleasure is procedural: motive, means, opportunity, and the terrible possibility that an arrest is not the same thing as justice.',
  },
  {
    slug: 'sherlock',
    title: 'Sherlock: The Riddle of the Crown Jewels',
    shortTitle: 'Sherlock',
    year: 1988,
    author: 'Bob Bates',
    image: 'sherlock.jpg',
    tribute:
      'Victorian London is preparing for Queen Victoria’s Golden Jubilee when the Crown Jewels vanish from the Tower and the whole celebration threatens to become an international humiliation. Bob Bates makes the inspired choice to cast you as Watson, not Holmes: close enough to the great detective to hear the deductions, but still responsible for getting through the fog, asking the right questions, and understanding the riddle the thief has left behind. Baker Street, the familiar faces, the clatter of the city—they are all here, but this is not merely a Doyle costume party. It is an Infocom mystery built around the pleasure of standing beside an impossibly clever friend and discovering you may have been paying attention after all.',
  },
  {
    slug: 'deadline',
    title: 'Deadline',
    year: 1981,
    author: 'Marc Blank',
    image: 'deadline.jpg',
    tribute:
      'Deadline begins with a death that has already been explained. Marshall Robner locked himself in his library, took a fatal dose of antidepressants, and left behind a story that every witness agrees is suicide. Marc Blank makes that neatness feel suspicious. As the Chief of Detectives, you have twelve hours at the Robner estate to test alibis, search the house, send evidence to the lab, and decide whether the attorney who hired you is right to want the whole business put to rest. The residents keep their own schedules; clues can appear, disappear, or be ruined while you are elsewhere. Its police dossier was not decoration—it was part of the case. Deadline is where Infocom first made the player a detective in the fullest sense: not a person who finds the answer, but one who has to earn a conviction.',
  },
  {
    slug: 'cutthroats',
    title: 'Cutthroats',
    year: 1984,
    author: 'Michael Berlyn & Jerry Wolper',
    image: 'cutthroats.jpg',
    tribute:
      'Cutthroats has the texture of a good bad idea: a washed-up diver on Hardscrabble Island, a set of newly marked wreck locations, and a crew whose interest in fair division of treasure is not especially convincing. Michael Berlyn and Jerry Wolper turn the salvage job into an investigation above water and a calculated risk below it. The book of shipwrecks, map, outfitter’s price list, and tide table were not just handsome box material; they were working tools for choosing how to dive and what to bring. Each new run can send you after a different wreck, but the essential problem remains the same: the sea is dangerous, the prize is real, and the people helping you may be worse than either.',
  },
  {
    slug: 'hollywood-hijinx',
    title: 'Hollywood Hijinx',
    year: 1986,
    author: 'Dave Anderson',
    image: 'hollywood.jpg',
    tribute:
      'Your uncle produced Vampire Penguins, A Corpse Line and Meltdown on Elm Street, and he has left you his Malibu estate on one condition: find the ten treasures he hid in it, in a single night, or lose the lot. Dave Anderson took the oldest structure in the form—a house, a list, a deadline—and filled it with the props of an imaginary filmography and the booby traps of a man who considered practical jokes a personality. It is the Infocom game least interested in saying anything, and it is a pleasure for exactly that reason: a whole mansion built to be rummaged through.',
  },
  {
    slug: 'suspect',
    title: 'Suspect',
    year: 1984,
    author: 'Dave Lebling',
    image: 'suspect.jpg',
    tribute:
      'Suspect gives the old country-house mystery an excellent complication: you are not the detective. You are the reporter who came to Ashcroft Farm’s Halloween costume ball hoping for a story and ended up wearing a cowboy outfit whose lariat and bullet make a very persuasive case against you. When your friend Veronica Ashcroft-Wellman is murdered, the champagne, masks, and polite society harden into a trap. Dave Lebling lets the party proceed around you—guests keep appointments, have private meetings, disappear upstairs, and notice what you are doing—while you scramble to find the evidence nobody wants you to have. It is an investigation powered by social panic rather than professional authority. Every question risks making you look guiltier; every minute brings the police closer. In Suspect, innocence is not a condition. It is something you must construct, clue by clue, before the night runs out.',
  },
];
