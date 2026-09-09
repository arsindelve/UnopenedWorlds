# Editing words on Unopened Worlds

There is no CMS or generated content layer. Edit the source file named for the
part of the site you want to change:

- `app/games.ts` — every game page's title, author, year, and long writeup.
  Find the game's `slug`, then change its `tribute`.
- `app/home/HomeHero.tsx` — the opening collection introduction.
- `app/home/LivingWorlds.tsx` — the NewZork and Planetfall.ai section.
- `app/home/CollectionWall.tsx` — the wall heading, labels, collector key, and
  wall caption.
- `app/home/KeptBoxes.tsx` — the four-box footnote and those captions.
- `app/home/SiteFooter.tsx` — the credit line and contact links.
- `app/collection.ts` — copy that belongs to a particular physical box:
  condition notes, photo captions, and packaging notes.

The page components deliberately contain only layout and behavior. Do not add
editorial copy to `app/page.tsx` or `app/GameExhibit.tsx`; use the named source
above so the next change stays easy to find.
