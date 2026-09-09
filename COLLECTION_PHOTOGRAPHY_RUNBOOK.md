# Collection Photography Runbook

This is the repeatable process for replacing an archival stand-in on the
collector's wall with photographs of Michael's actual sealed copy. Starcross is
the reference implementation.

## Current scope

For now, each game needs two source photographs:

1. Front
2. Back

Side, top, and bottom photography is a later phase. Do not expand the viewer for
those angles until that design has been reviewed using Starcross.

## What Michael provides

- The game title.
- The original front and back photographs, usually from `Downloads`.
- HEIC or high-quality JPEG is acceptable.

Every supplied photograph replaces the corresponding collection image. It is
not merely an extra gallery attachment.

Identify front and back from the visible packaging, not from upload order or
filename numbering. Never move, rename, or overwrite Michael's originals.

## Source fidelity

Copy supplied JPEG scans into `public/collection` unchanged. Do not crop,
rotate, straighten, recolor, sharpen, resize, or otherwise retouch them. Their
native framing, including package edges, labels, wrap, and visible wear, is the
record of the individual copy. If a supplied file cannot safely display in the
browser, stop and ask before making a derivative.

## Files added to the site

Use the game's existing slug from `app/games.ts`:

```text
public/collection/<slug>-front.jpg
public/collection/<slug>-back.jpg
```

The front and back files are the full-size exhibit photographs. They are never
modified. The site also requires two display-only derivatives for each source:

```text
public/collection/exhibits/<slug>-front.webp
public/collection/thumbnails/<slug>-front.webp
```

The exhibit derivative is a proportion-preserving display copy; the thumbnail
is the compact wall copy. Neither replaces the supplied scan, and both must
show the complete box.

## Documentary-image rules

These photographs document physical artifacts. Fidelity is more important than
cosmetic perfection.

- Preserve the complete box, including every corner and shrink-wrap edge.
- Preserve store stickers, fading, dents, tears, glare, seams, and other evidence
  of the individual copy.
- Never repair, rewrite, sharpen, or regenerate packaging artwork or typography.
- Reject any image-editing result that changes text, logos, colors, labels, or
  physical details.
- Do not crop, rotate, straighten, resize, or otherwise alter a supplied scan.
- Never stretch the image to force an aspect ratio.

## Starcross exhibit treatment

1. Preserve the supplied front and back scans at their native proportions.
2. Record each source's native `aspectRatio` in `collectionPhotography`.
3. Use the native-frame display treatment (`object-fit: contain`) so the browser
   never crops a box edge.
4. Keep the shared paper-and-brass front treatment; it frames the artifact
   without modifying it.
5. Inspect the full box at desktop and narrow viewport widths.

## Wall thumbnail treatment

The wall thumbnail is part of the replacement, not a follow-up task.

- Start with the supplied front scan.
- Use it directly when its natural proportions fit the wall frame cleanly.
- When a dedicated wall derivative is necessary, it must preserve the complete
  visible box and match the frame's proportion; it never replaces the front
  exhibit scan.
- Confirm that the wall image is crisp, centered, complete, and neither enlarged
  nor clipped at the actual grid size.

## Site integration

Add one entry to `collectionPhotography` in `app/collection.ts`. Supply:

- edition label;
- front, back, and thumbnail paths;
- attributed archive, feelies, and manual links, plus `map` when the game
  actually shipped one; and
- the game-specific exhibit note.

Not every grey box had a map. Hollywood Hijinx shipped TinselWorld, Aunt
Hildegarde's will, an autographed photo, and a swizzle stick, and no map at all,
so `map` is optional and the Map link renders only when present. Never fill the
slot with an unrelated document to keep the row of links even.

Record both supplied images with their native aspect ratio. For the wall, verify
the actual grid tile and select the front or a dedicated, proportion-matched
thumbnail as appropriate.

Verify every link with a real request before committing it. Guessed URLs are
usually wrong: mocagh's slug for Hollywood Hijinx is `hhijinx`, not
`hollywoodhijinx`, and the real filenames are only discoverable from
`https://www.mocagh.org/loadpage.php?getgame=<slug>`.

```bash
curl -s -o /dev/null -w '%{http_code}' -L "<url>"
```

That single entry activates the collection-photo badge, wall thumbnail,
front/back controls, photographic exhibit, and archive drawer. Do not add
another game-specific dialog branch.

Archival scans and manuals remain on their original preservation sites unless
their licenses explicitly permit redistribution. Link and attribute them; do not
mirror them into this repository or the site's S3 bucket merely because they are
downloadable.

## Verification checklist

- The correct game and edition are identified.
- Front and back are not reversed.
- Supplied front and back files are preserved unchanged.
- No box edge is clipped in the exhibit or the browser.
- Each image has its native aspect ratio recorded and uses the native exhibit
  treatment.
- The wall thumbnail is visually checked at the actual grid size.
- `pnpm validate:collection-assets` passes. It verifies every configured source,
  thumbnail, and exhibit derivative before the production build can deploy.
- Packaging text and artwork match the source photograph.
- Every archive link returns 200.
- Front/back controls work with keyboard and pointer input.
- The exhibit remains usable on desktop and mobile.
- The production build succeeds.
- Only the intended game photography and integration changes are included.

## Publication

After visual verification and a successful build:

1. Commit the new photographs, thumbnail, configuration entry, and any narrowly
   required crop styles.
2. Push the commit to `main` on the existing GitHub repository.
3. Deploy the static export to the existing S3 website bucket only when Michael
   explicitly requests deployment.
4. Invalidate the CloudFront paths needed to expose the new build.
5. Verify the public site's collection wall and the new game's front/back viewer.

Never treat a GitHub push as an instruction to deploy AWS. Deployment requires
an explicit request.
