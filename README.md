# Unopened Worlds

**A modern, living tribute to Infocom.**

Thirty-two original Infocom adventures are displayed together as a private
collection: thirty sealed, with sealed copies of *Suspended* and *Sherlock*
still being sought. Each box is treated as a doorway into the game, its physical
artifacts, and the people who created it.

Unopened Worlds is also the home of two experiments in making classic
interactive fiction feel alive for a new generation:

- [NewZork.ai](https://newzork.ai/) preserves Zork's world and puzzles while
  adding a more capable parser and responsive AI narrator.
- [Planetfall.ai](https://planetfall.ai/) explores the same idea through a new
  interactive-fiction engine built around *Planetfall*.

> The collection preserves what Infocom made. The AI projects preserve what
> playing an Infocom game felt like.

## The collection wall

The centerpiece is a four-row by eight-column recreation of the collector's
real shadow-box display. Selecting a game brings its box forward as a
museum-style exhibit, with room for original collection photography, maps,
feelies, manuals, advertisements, history, and credits.

The current wall is based on the physical arrangement with only a handful of
deliberate moves, keeping the display personal while giving the science-fiction
and mystery/adventure rows a clearer rhythm.

## Project status

This repository contains the first interactive design: the complete collection
wall, responsive layouts, individual game exhibits, collection status, and
links to preserved archival material. It also contains a playable Zork I exhibit
powered by the NewZork engine. Visitors can carry the same live session—location,
inventory, score, and transcript—into the complete experience at NewZork.ai.
Detailed photography of the actual copies and deeper game-by-game exhibits will
replace the temporary reference imagery.

The repeatable ingestion and presentation process is documented in the
[Collection Photography Runbook](COLLECTION_PHOTOGRAPHY_RUNBOOK.md).

## Architecture

The site is deliberately static:

- React and TypeScript
- Vinext/Vite
- CSS and small client-side interactions
- Static export suitable for S3 and CloudFront
- No application backend; the playable exhibit talks directly to the existing
  NewZork API

## Local development

Requirements: Node.js 22 or later and pnpm.

```bash
pnpm install
pnpm dev
```

Create a production export with:

```bash
pnpm build
```

## Archival material and attribution

Temporary box-art reference scans are credited to
[The Infocom Gallery](https://gallery.guetech.org/). Copyrights and trademarks
belong to their respective owners; the archival images are not offered under
the same terms as this site's source code.

This is an independent, noncommercial homage and is not affiliated with or
endorsed by Infocom, Activision, or Microsoft.
